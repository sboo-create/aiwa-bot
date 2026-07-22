import asyncio
import hashlib
import hmac
import html
import json
import os
import sqlite3
import tempfile
import time
import types
import unittest
from datetime import date
from unittest import mock
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

    def test_external_traction_outbox_is_pseudonymous_and_idempotent(self):
        cid = 987654321
        bot.ev(cid, "button", meta="view_food")

        batch = a2.traction_batch(bot.DB)

        self.assertEqual(len(batch), 1)
        self.assertEqual(batch[0]["name"], "screen_viewed")
        self.assertEqual(batch[0]["properties"], {"screen": "food"})
        self.assertNotIn(str(cid), json.dumps(batch))
        a2.traction_ack(bot.DB, [batch[0]["event_id"]])
        a2.seed_traction_outbox(bot.DB)
        self.assertEqual(a2.traction_batch(bot.DB), [])

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

    def test_http_admin_keeps_legacy_key_but_prefers_separate_secret(self):
        old_admin = bot.AIWA_ADMIN
        old_key = os.environ.get("AIWA_ADMIN_KEY")
        bot.AIWA_ADMIN = "123"
        os.environ.pop("AIWA_ADMIN_KEY", None)
        try:
            legacy_session = bot._admin_session_value("123")
            self.assertTrue(bot._admin_key_ok(FakeRequest(cookies={bot._ADMIN_COOKIE: legacy_session})))
            self.assertFalse(bot._admin_key_ok(FakeRequest(cookies={bot._ADMIN_COOKIE: "123"})))
            self.assertFalse(bot._admin_key_ok(FakeRequest(query={"key": "123"})))
            os.environ["AIWA_ADMIN_KEY"] = "a" * 48
            session = bot._admin_session_value("a" * 48)
            self.assertFalse(bot._admin_key_ok(FakeRequest(cookies={bot._ADMIN_COOKIE: legacy_session})))
            self.assertTrue(bot._admin_key_ok(FakeRequest(cookies={bot._ADMIN_COOKIE: session})))
            self.assertFalse(bot._admin_key_ok(FakeRequest(query={"key": "a" * 48})))
            self.assertTrue(bot._admin_key_ok(FakeRequest(headers={"X-Admin-Key": "a" * 48})))
            response = bot.web.Response()
            bot._refresh_admin_session(FakeRequest(cookies={bot._ADMIN_COOKIE: session}), response)
            self.assertEqual(response.cookies[bot._ADMIN_COOKIE]["max-age"], str(7 * 24 * 3600))
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
        self.assertEqual(llm.usage_split(usage), (100, 25, "model"))
        self.assertEqual(captured[0]["input_tokens"], 100)
        self.assertEqual(captured[0]["output_tokens"], 25)
        self.assertEqual(captured[0]["request_id"], "r_test")

    def test_food_photo_uses_separate_openrouter_vision_model(self):
        old_key = llm._OPENROUTER_KEY
        old_model = llm.OPENROUTER_VISION_MODEL
        old_url = llm.PROXY_URL
        llm._OPENROUTER_KEY = "test-openrouter-key"
        llm.OPENROUTER_VISION_MODEL = "google/gemini-3.1-flash-lite"
        llm.PROXY_URL = "https://proxy.example/v1/chat/completions"
        answer = json.dumps({"title": "Салат", "kcal": 250, "protein": 8,
                             "fat": 12, "carbs": 20})
        try:
            with mock.patch.object(llm, "_call_proxy_one", return_value=answer) as vision_call, \
                    mock.patch.object(llm, "_call") as text_call:
                result = llm.analyze_food(b"fake-image", "food.jpg")
            self.assertEqual(result["title"], "Салат")
            self.assertEqual(vision_call.call_args.args[0]["model"], "google/gemini-3.1-flash-lite")
            text_call.assert_not_called()
        finally:
            llm._OPENROUTER_KEY = old_key
            llm.OPENROUTER_VISION_MODEL = old_model
            llm.PROXY_URL = old_url

    def test_openrouter_payload_is_private_by_default(self):
        old_zdr = os.environ.get("OPENROUTER_ZDR")
        old_collection = os.environ.get("OPENROUTER_DATA_COLLECTION")
        os.environ.pop("OPENROUTER_ZDR", None)
        os.environ.pop("OPENROUTER_DATA_COLLECTION", None)
        try:
            prefs = llm._openrouter_provider_preferences()
            payload = llm._proxy_payload([{"role": "user", "content": "private"}], 10, 0.2,
                                         "https://openrouter.ai/api/v1/chat/completions",
                                         "test/model", prefs)
            self.assertEqual(payload["provider"], {"data_collection": "deny", "zdr": True})
        finally:
            if old_zdr is not None: os.environ["OPENROUTER_ZDR"] = old_zdr
            if old_collection is not None: os.environ["OPENROUTER_DATA_COLLECTION"] = old_collection

    def test_openai_base_url_is_normalized(self):
        self.assertEqual(llm._chat_completions_url("https://proxy.example/v1"),
                         "https://proxy.example/v1/chat/completions")
        self.assertEqual(llm._chat_completions_url("https://proxy.example/v1/chat/completions"),
                         "https://proxy.example/v1/chat/completions")

    def test_long_telegram_text_is_split_without_losing_content(self):
        text = (("🌿 Длинный ответ с полезными пояснениями. " * 140) + "\n\n") * 3

        parts = bot.split_tg(text)

        self.assertGreater(len(parts), 1)
        self.assertEqual("".join(parts), text)
        self.assertTrue(all(bot._tg_units(part) <= bot.TG_TEXT_CHUNK for part in parts))

    def test_send_answer_quotes_first_chunk_and_buttons_last(self):
        answer = (("💡 Абзац без потери текста. " * 130) + "\n\n") * 3
        fake_bot = mock.AsyncMock()
        context = types.SimpleNamespace(bot=fake_bot)
        keyboard = object()

        with mock.patch.object(bot.L, "split_followups", return_value=(answer, ["Ещё?", "Почему?"])), \
                mock.patch.object(bot, "sugg_kb", return_value=keyboard), \
                mock.patch.object(bot, "ev"), \
                mock.patch.object(bot, "_voice_reply_on", return_value=False):
            asyncio.run(bot.send_answer(context, 7, answer, None, "q", quote="❓" * 1000))

        calls = fake_bot.send_message.await_args_list
        self.assertGreater(len(calls), 1)
        delivered = []
        for i, call in enumerate(calls):
            body = call.args[1]
            if i == 0:
                self.assertEqual(call.kwargs["parse_mode"], "HTML")
                quoted, first = body.split("</blockquote>\n", 1)
                visible = html.unescape(quoted.split("<blockquote>", 1)[1]) + "\n" + html.unescape(first)
                delivered.append(html.unescape(first))
            else:
                visible = body
                delivered.append(body)
            self.assertLessEqual(bot._tg_units(visible), bot.TG_MESSAGE_LIMIT)
            self.assertIs(call.kwargs.get("reply_markup"), keyboard if i == len(calls) - 1 else None)
        self.assertEqual("".join(delivered), answer)

    def test_chat_answers_target_about_three_thousand_characters(self):
        with mock.patch.object(llm, "_call", return_value="Готовый ответ") as call:
            llm.answer_question(None, "Почему?", {})
        self.assertEqual(call.call_args.kwargs["max_tokens"], 900)
        self.assertIn("НЕ превышай 3000 знаков", call.call_args.args[0][-1]["content"])

    def test_onboarding_completion_counts_as_traction_activity(self):
        cid = 700
        conn = bot.db()
        conn.execute("INSERT INTO users(chat_id,created,mode) VALUES(?,?,?)",
                     (cid, "2026-07-22T08:00:00", "irregular"))
        conn.commit()
        conn.close()
        bot.ev(cid, "onboarding_completed", meta="irregular")

        with mock.patch.object(bot, "dtoday", return_value=date(2026, 7, 22)):
            data = bot.analytics_data(days=1)

        self.assertEqual(data["audience"]["ever_used"], 1)
        self.assertEqual(data["audience"]["dau"], 1)
        self.assertEqual(data["engagement"]["sessions"]["count"], 1)
        conn = sqlite3.connect(bot.DB)
        event_name = conn.execute(
            "SELECT event_name FROM events_v2 WHERE user_key=?", (a2.user_key(cid),)
        ).fetchone()[0]
        conn.close()
        self.assertEqual(event_name, "onboarding_completed")

    def test_traction_metrics_count_people_sessions_and_tools(self):
        conn = bot.db()
        for cid in range(1, 6):
            conn.execute("INSERT INTO users(chat_id,created) VALUES(?,?)", (cid, "2026-01-01T00:00:00"))
        events = [
            (1, "2026-01-02T08:00:00", "command", 0),
            (1, "2026-07-22T09:00:00", "command", 2),
            (1, "2026-07-22T09:05:00", "button", 0),
            (2, "2026-07-22T10:00:00", "command", 3),
            (2, "2026-07-22T11:00:00", "button", 0),
            (3, "2026-07-16T12:00:00", "command", 0),
            (4, "2026-07-02T12:00:00", "command", 0),
        ]
        conn.executemany("INSERT INTO events(chat_id,ts,action,calls) VALUES(?,?,?,?)", events)
        conn.commit()
        conn.close()

        with mock.patch.object(bot, "dtoday", return_value=date(2026, 7, 22)):
            data = bot.analytics_data(days=1)

        self.assertEqual(data["audience"]["ever_used"], 4)
        self.assertEqual(data["audience"]["dau"], 2)
        self.assertEqual(data["audience"]["wau"], 3)
        self.assertEqual(data["audience"]["mau"], 4)
        self.assertEqual(data["engagement"]["sessions_per_dau"], 1.5)
        self.assertEqual(data["engagement"]["tools_per_dau"], 2.5)
        self.assertEqual(data["engagement"]["sessions"]["count"], 3)
        self.assertEqual(data["engagement"]["active_user_days"], 2)


if __name__ == "__main__":
    unittest.main()
