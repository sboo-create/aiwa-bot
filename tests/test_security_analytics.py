import hashlib
import hmac
import json
import os
import sqlite3
import tempfile
import time
import unittest
from urllib.parse import urlencode


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot
import analytics_v2 as a2
import llm


def signed_init_data(user_id, auth_date=None):
    pairs = {
        "auth_date": str(auth_date if auth_date is not None else int(time.time())),
        "query_id": "test-query",
        "user": json.dumps({"id": user_id}, separators=(",", ":")),
    }
    data_check = "\n".join(f"{key}={pairs[key]}" for key in sorted(pairs))
    secret = hmac.new(b"WebAppData", os.environ["BOT_TOKEN"].encode(), hashlib.sha256).digest()
    pairs["hash"] = hmac.new(secret, data_check.encode(), hashlib.sha256).hexdigest()
    return urlencode(pairs)


class FakeRequest:
    def __init__(self, query=None, headers=None, cookies=None):
        self.query = query or {}
        self.headers = headers or {}
        self.cookies = cookies or {}


class SecurityAnalyticsTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "test.db")

    def tearDown(self):
        bot.DB = self.old_db
        self.tmp.cleanup()

    def test_webapp_url_never_contains_health_data(self):
        old = bot.AIWA_WEBAPP_URL
        bot.AIWA_WEBAPP_URL = "https://example.test/app?source=telegram"
        try:
            url = bot.webapp_url({"last_period": "2026-07-01", "cycle_len": 28, "mode": "cycle"})
            self.assertEqual(url, "https://example.test/app?source=telegram")
            self.assertNotIn("2026-07-01", url)
            self.assertNotIn("cycle_len", url)
        finally:
            bot.AIWA_WEBAPP_URL = old

    def test_telegram_init_data_signature_and_ttl(self):
        self.assertEqual(bot._verify_init(signed_init_data(42)), 42)
        stale = signed_init_data(42, int(time.time()) - 90_000)
        self.assertIsNone(bot._verify_init(stale))
        tampered = signed_init_data(42).replace("%3A42", "%3A43")
        self.assertIsNone(bot._verify_init(tampered))

    def test_legacy_event_dual_writes_without_raw_user_id(self):
        bot.ev(987654321, "button", meta="view_food")
        conn = sqlite3.connect(bot.DB)
        self.assertEqual(conn.execute("SELECT COUNT(*) FROM events").fetchone()[0], 1)
        row = conn.execute("SELECT user_key,event_name,source,screen,properties_json FROM events_v2").fetchone()
        conn.close()
        self.assertEqual(row[1:4], ("screen_viewed", "webapp", "food"))
        self.assertNotIn("987654321", row[0])
        self.assertEqual(json.loads(row[4]), {})

    def test_delete_user_removes_every_user_owned_table_and_memory(self):
        cid = 77
        conn = bot.db()
        conn.execute("INSERT INTO users(chat_id,created) VALUES(?,?)", (cid, "now"))
        conn.execute("INSERT INTO cycles(chat_id,start_date) VALUES(?,?)", (cid, "2026-07-01"))
        conn.execute("INSERT INTO logs(chat_id,log_date,symptoms) VALUES(?,?,?)", (cid, "2026-07-01", "head"))
        conn.execute("INSERT INTO chat_log(chat_id,ts,role,text) VALUES(?,?,?,?)", (cid, "now", "user", "private"))
        conn.execute("INSERT INTO intimacy(chat_id,d) VALUES(?,?)", (cid, "2026-07-01"))
        conn.execute("INSERT INTO sugg(chat_id,q) VALUES(?,?)", (cid, "private"))
        conn.execute("INSERT INTO meals(chat_id,d,ts,title) VALUES(?,?,?,?)", (cid, "2026-07-01", "now", "meal"))
        conn.execute("INSERT INTO workouts(chat_id,d,ts,type) VALUES(?,?,?,?)", (cid, "2026-07-01", "now", "run"))
        conn.execute("INSERT INTO proactive_log(chat_id,ts,signal,text) VALUES(?,?,?,?)", (cid, "now", "x", "private"))
        conn.execute("INSERT INTO proactive_state(chat_id,signal,last_ts) VALUES(?,?,?)", (cid, "x", "now"))
        conn.execute("INSERT INTO memory(chat_id,mkey,mval,updated) VALUES(?,?,?,?)", (cid, "x", "private", "now"))
        conn.execute("INSERT INTO referrals(chat_id,source,ts) VALUES(?,?,?)", (cid, "test", "now"))
        conn.execute("INSERT INTO partners(partner_id,woman_id,created) VALUES(?,?,?)", (88, cid, "now"))
        a2.insert_legacy_event(conn, cid, "manual", meta="text")
        conn.commit(); conn.close()
        bot.CHAT_HIST[cid] = ["private"]

        bot.del_user(cid)

        conn = bot.db()
        for table in ("users", "cycles", "logs", "chat_log", "intimacy", "sugg", "events", "meals",
                      "workouts", "proactive_log", "proactive_state", "memory", "referrals"):
            self.assertEqual(conn.execute(f"SELECT COUNT(*) FROM {table} WHERE chat_id=?", (cid,)).fetchone()[0], 0, table)
        self.assertEqual(conn.execute("SELECT COUNT(*) FROM partners WHERE woman_id=? OR partner_id=?", (cid, cid)).fetchone()[0], 0)
        self.assertEqual(conn.execute("SELECT COUNT(*) FROM events_v2 WHERE user_key=?", (a2.user_key(cid),)).fetchone()[0], 0)
        conn.close()
        self.assertNotIn(cid, bot.CHAT_HIST)

    def test_http_admin_never_falls_back_to_telegram_chat_id(self):
        old_admin = bot.AIWA_ADMIN
        old_key = os.environ.get("AIWA_ADMIN_KEY")
        bot.AIWA_ADMIN = "123"
        os.environ.pop("AIWA_ADMIN_KEY", None)
        try:
            self.assertFalse(bot._admin_key_ok(FakeRequest(query={"key": "123"})))
            os.environ["AIWA_ADMIN_KEY"] = "a" * 48
            self.assertTrue(bot._admin_key_ok(FakeRequest(cookies={bot._ADMIN_COOKIE: "a" * 48})))
            self.assertFalse(bot._admin_key_ok(FakeRequest(query={"key": "a" * 48})))
            self.assertTrue(bot._admin_key_ok(FakeRequest(headers={"X-Admin-Key": "a" * 48})))
        finally:
            bot.AIWA_ADMIN = old_admin
            if old_key is None: os.environ.pop("AIWA_ADMIN_KEY", None)
            else: os.environ["AIWA_ADMIN_KEY"] = old_key

    def test_llm_usage_keeps_legacy_total_and_captures_split(self):
        captured = []
        old_sink = llm._USAGE_SINK
        llm.set_usage_sink(captured.append)
        usage = []
        try:
            with llm.call_context(user_key="u_test", request_id="r_test", purpose="final_answer"):
                llm._capture_usage(usage, {"usage": {"prompt_tokens": 100, "completion_tokens": 25,
                                                      "total_tokens": 125}}, "provider", "model", time.time())
        finally:
            llm.set_usage_sink(old_sink)
        self.assertEqual(sum(usage), 125)
        self.assertEqual(captured[0]["input_tokens"], 100)
        self.assertEqual(captured[0]["output_tokens"], 25)
        self.assertEqual(captured[0]["request_id"], "r_test")


if __name__ == "__main__":
    unittest.main()
