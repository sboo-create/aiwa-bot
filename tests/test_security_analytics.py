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
from pathlib import Path
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


class FakeJsonRequest:
    def __init__(self, body):
        self.body = body

    async def json(self):
        return self.body


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

    def test_campaign_url_contains_only_safe_attribution(self):
        old = bot.AIWA_WEBAPP_URL
        bot.AIWA_WEBAPP_URL = "https://example.test/app"
        try:
            url = bot.campaign_webapp_url({"last_period": "2026-07-01"},
                                          "daily_summary:2026-07-23", "today")
            self.assertEqual(url, "https://example.test/app?campaign=daily_summary:2026-07-23&tab=today")
            self.assertNotIn("2026-07-01", url)
        finally:
            bot.AIWA_WEBAPP_URL = old

    def test_feedback_must_match_prompt_shown_to_same_user(self):
        answer_id = "a1b2c3d4e5f60708"
        bot.ev(101, "feedback_prompt", meta=f"{answer_id}|webapp")
        self.assertTrue(bot._feedback_prompt_exists(101, answer_id))
        self.assertFalse(bot._feedback_prompt_exists(202, answer_id))
        self.assertFalse(bot._feedback_prompt_exists(101, "ffffffffffffffff"))

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
        self.assertEqual(batch[0]["payload_version"], 2)
        self.assertEqual({k: batch[0]["properties"][k] for k in (
            "screen", "provenance", "confidence", "source_schema", "payload_version"
        )}, {"screen": "food", "provenance": "observed", "confidence": "high",
             "source_schema": "events_v2", "payload_version": 2})
        for item in batch:
            self.assertNotEqual(item["device_id"], str(cid))
            self.assertTrue(item["device_id"].startswith("u_"))
            self.assertFalse({"chat_id", "telegram_id", "user_id"} & set(item["properties"]))
        a2.traction_ack(bot.DB, [batch[0]["event_id"]])
        a2.seed_traction_outbox(bot.DB)
        self.assertEqual(a2.traction_batch(bot.DB), [])

    def test_feedback_push_and_safety_events_export_only_safe_dimensions(self):
        cid = 123
        bot.ev(cid, "feedback_prompt", meta="abcdef|webapp")
        bot.ev(cid, "feedback", meta="helpful|abcdef|webapp")
        bot.ev(cid, "safety", meta="escalation|abcdef|webapp")
        bot.ev(cid, "broadcast", meta="sent|daily_summary:2026-07-23")

        batch = a2.traction_batch(bot.DB)
        by_name = {item["name"]: item["properties"] for item in batch}
        self.assertEqual(by_name["answer_feedback_prompted"]["answer_id"], "abcdef")
        self.assertEqual(by_name["answer_feedback_submitted"]["rating"], "helpful")
        self.assertEqual(by_name["safety_guidance_shown"]["safety_level"], "escalation")
        self.assertEqual(by_name["push_sent"]["campaign_type"], "daily_summary")
        for item in batch:
            self.assertNotEqual(item["device_id"], str(cid))
            self.assertTrue(item["device_id"].startswith("u_"))
            self.assertFalse({"chat_id", "telegram_id", "user_id"} & set(item["properties"]))

    def test_traction_payload_upgrade_is_requeued_once(self):
        conn = sqlite3.connect(bot.DB)
        a2.init_schema(conn)
        a2._queue_traction(conn, "evt", time.time(), "u_safe", "app_opened", {}, 1)
        conn.commit(); conn.close()
        a2.traction_ack(bot.DB, ["evt"])

        conn = sqlite3.connect(bot.DB)
        a2.init_schema(conn)
        a2._queue_traction(conn, "evt", time.time(), "u_safe", "app_opened",
                           {"provenance": "observed"}, 2)
        conn.commit(); conn.close()

        batch = a2.traction_batch(bot.DB)
        self.assertEqual([(x["event_id"], x["payload_version"]) for x in batch], [("evt", 2)])
        a2.traction_ack(bot.DB, ["evt"])
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

    def test_delete_tombstone_blocks_late_writes_across_reactivation(self):
        cid = 78
        first_generation = bot._activate_user(cid)
        bot.upsert(cid, mode="irregular")
        bot.del_user(cid)

        self.assertFalse(bot.mem_set(cid, "condition", "sensitive-restored"))
        self.assertFalse(bot.hist_push(cid, "private", "late answer"))
        self.assertFalse(bot.ev(cid, "user_message", meta="text"))
        self.assertIsNone(bot.meal_add(cid, {"title": "late", "kcal": 1, "protein": 0,
                                              "fat": 0, "carbs": 0, "items": []}))

        next_generation = bot._activate_user(cid)
        self.assertGreater(next_generation, first_generation)
        self.assertFalse(bot._user_write_allowed(cid, first_generation))
        self.assertTrue(bot._user_write_allowed(cid, next_generation))

        with mock.patch.object(bot, "llm_to_thread", new=mock.AsyncMock(
                return_value=[{"key": "condition", "value": "old-task-restored"}])):
            asyncio.run(bot._memory_learn(cid, "old", "old", first_generation))

        conn = bot.db()
        self.assertEqual(conn.execute("SELECT COUNT(*) FROM memory WHERE chat_id=?", (cid,)).fetchone()[0], 0)
        conn.close()

    def test_late_llm_usage_is_rejected_after_delete_and_restart(self):
        cid = 79
        old_generation = bot._activate_user(cid)
        record = {
            "call_id": "late-call", "user_key": a2.user_key(cid),
            "user_generation": old_generation, "provider": "test", "model": "test/model",
            "status": "success", "occurred_at": "2026-07-23T00:00:00+00:00",
        }
        bot.del_user(cid)
        a2.persist_llm_call(bot.DB, record)
        new_generation = bot._activate_user(cid)
        a2.persist_llm_call(bot.DB, record)

        conn = bot.db()
        self.assertEqual(conn.execute("SELECT COUNT(*) FROM llm_calls WHERE user_key=?", (a2.user_key(cid),)).fetchone()[0], 0)
        conn.close()

        fresh = dict(record, call_id="fresh-call", user_generation=new_generation)
        a2.persist_llm_call(bot.DB, fresh)
        conn = bot.db()
        self.assertEqual(conn.execute("SELECT COUNT(*) FROM llm_calls WHERE user_key=?", (a2.user_key(cid),)).fetchone()[0], 1)
        conn.close()

    def test_canonical_chat_checkin_and_summary_event_semantics(self):
        cid = 80
        bot.ev(cid, "user_message", meta="text")
        bot.ev(cid, "assistant_message", meta="webapp")
        bot.ev(cid, "voice", meta="voice")
        bot.ev(cid, "suggest", meta="q:legacy")
        bot.ev(cid, "manual", meta="web_checkin")
        bot.ev(cid, "goal", meta="summary")
        bot.ev(cid, "summary_open", meta="daily_summary")

        conn = bot.db()
        names = [row[0] for row in conn.execute(
            "SELECT event_name FROM events_v2 WHERE user_key=? ORDER BY rowid", (a2.user_key(cid),)
        )]
        conn.close()
        self.assertEqual(names, [
            "user_message_sent", "assistant_message_sent", "user_message_sent",
            "legacy_message_interaction", "checkin_updated", "summary_delivered", "summary_opened",
        ])

    def test_track_records_flow_when_form_is_opened(self):
        cid = 81
        bot._activate_user(cid)
        bot.upsert(cid, mode="irregular")
        with mock.patch.object(bot, "_verify_init", return_value=cid):
            asyncio.run(bot._api_track(FakeJsonRequest({"initData": "signed", "flow": "food"})))
            asyncio.run(bot._api_track(FakeJsonRequest({"initData": "signed", "flow": "workout"})))
            asyncio.run(bot._api_track(FakeJsonRequest({"initData": "signed", "flow": "not_allowed"})))

        conn = bot.db()
        names = [row[0] for row in conn.execute(
            "SELECT event_name FROM events_v2 WHERE user_key=? ORDER BY rowid", (a2.user_key(cid),)
        )]
        conn.close()
        self.assertEqual(names, ["food_flow_started", "workout_flow_started"])

    def test_mini_app_checkin_completes_on_each_successful_field_save(self):
        cid = 82
        bot._activate_user(cid)
        bot.upsert(cid, mode="irregular")
        with mock.patch.object(bot, "_verify_init", return_value=cid):
            response = asyncio.run(bot._api_checkin(FakeJsonRequest({
                "initData": "signed", "date": date.today().isoformat(), "energy": 2,
            })))

        self.assertEqual(response.status, 200)
        conn = bot.db()
        names = [row[0] for row in conn.execute(
            "SELECT event_name FROM events_v2 WHERE user_key=? ORDER BY rowid", (a2.user_key(cid),)
        )]
        conn.close()
        self.assertEqual(names, ["checkin_updated", "checkin_completed"])

    def test_user_can_disable_and_reenable_proactive_messages(self):
        cid = 83
        bot._activate_user(cid)
        bot.upsert(cid, mode="irregular")
        old_flag = os.environ.get("AIWA_PROACTIVE")
        os.environ["AIWA_PROACTIVE"] = "1"
        try:
            with mock.patch.object(bot, "_verify_init", return_value=cid):
                disabled = asyncio.run(bot._api_proactive(FakeJsonRequest({
                    "initData": "signed", "enabled": False,
                })))
                self.assertEqual(disabled.status, 200)
                self.assertFalse(bot.row(cid)["proactive_enabled"])
                self.assertFalse(bot._proactive_on(cid))

                enabled = asyncio.run(bot._api_proactive(FakeJsonRequest({
                    "initData": "signed", "enabled": True,
                })))
                self.assertEqual(enabled.status, 200)
                self.assertTrue(bot.row(cid)["proactive_enabled"])
                self.assertTrue(bot._proactive_on(cid))

                rejected = asyncio.run(bot._api_proactive(FakeJsonRequest({
                    "initData": "signed", "enabled": "false",
                })))
                self.assertEqual(rejected.status, 400)
                self.assertTrue(bot.row(cid)["proactive_enabled"])
        finally:
            if old_flag is None:
                os.environ.pop("AIWA_PROACTIVE", None)
            else:
                os.environ["AIWA_PROACTIVE"] = old_flag

        conn = bot.db()
        names = [row[0] for row in conn.execute(
            "SELECT event_name FROM events_v2 WHERE user_key=? ORDER BY rowid", (a2.user_key(cid),)
        )]
        conn.close()
        self.assertEqual(names, ["proactive_disabled", "proactive_enabled"])

        html_source = (Path(__file__).parents[1] / "webapp" / "index.html").read_text("utf-8")
        self.assertIn("Проактивные сообщения", html_source)
        self.assertIn("/api/proactive", html_source)
        self.assertIn("14:00 или 19:30 МСК", html_source)

    def test_disabled_preference_blocks_legacy_optional_reminders(self):
        cid = 84
        bot._activate_user(cid)
        bot.upsert(cid, mode="irregular", proactive_enabled=0)
        context = types.SimpleNamespace(
            bot=types.SimpleNamespace(send_message=mock.AsyncMock())
        )
        old_flag = os.environ.get("AIWA_PROACTIVE")
        os.environ["AIWA_PROACTIVE"] = "0"
        try:
            self.assertFalse(bot._proactive_preference_on(cid))
            asyncio.run(bot.push_food_reminder(context, cid))
            asyncio.run(bot.push_train_reminder(context, cid))
        finally:
            if old_flag is None:
                os.environ.pop("AIWA_PROACTIVE", None)
            else:
                os.environ["AIWA_PROACTIVE"] = old_flag

        context.bot.send_message.assert_not_awaited()

    def _voice_fixture(self, cid):
        bot._activate_user(cid)
        bot.upsert(cid, mode="irregular")
        voice_file = types.SimpleNamespace(
            download_as_bytearray=mock.AsyncMock(return_value=bytearray(b"ogg"))
        )
        telegram_bot = types.SimpleNamespace(
            send_chat_action=mock.AsyncMock(),
            get_file=mock.AsyncMock(return_value=voice_file),
            send_message=mock.AsyncMock(),
            send_voice=mock.AsyncMock(),
            send_audio=mock.AsyncMock(),
        )
        message = types.SimpleNamespace(
            voice=types.SimpleNamespace(file_id="voice-file"),
            reply_text=mock.AsyncMock(),
        )
        update = types.SimpleNamespace(
            effective_chat=types.SimpleNamespace(id=cid),
            message=message,
        )
        return update, types.SimpleNamespace(bot=telegram_bot), telegram_bot, message

    def test_telegram_voice_freeform_returns_text_and_one_voice_copy(self):
        cid = 85
        update, context, telegram_bot, message = self._voice_fixture(cid)

        async def fake_llm(_cid, purpose, _fn, *args, **kwargs):
            info = args[-1] if args and isinstance(args[-1], dict) else {}
            if purpose == "stt":
                info.update(provider="salute", ms=120)
                return "Почему я устала?"
            if purpose == "tts":
                info.update(ms=90, chars=len(str(args[0])))
                return b"voice-answer"
            raise AssertionError(purpose)

        async def fake_handle(_update, proxied_context, text):
            self.assertEqual(text, "Почему я устала?")
            await bot.send_answer(proxied_context, cid, "Короткий текстовый ответ.", None, text)

        with mock.patch.dict(os.environ, {"AIWA_VOICE_REPLY": "1"}), \
             mock.patch.object(bot, "llm_to_thread", side_effect=fake_llm), \
             mock.patch.object(bot, "handle_text", side_effect=fake_handle), \
             mock.patch.object(bot, "sugg_kb", return_value=None), \
             mock.patch.object(bot.L, "split_followups", return_value=("Короткий текстовый ответ.", [])), \
             mock.patch.object(bot.L, "followups", return_value=[]), \
             mock.patch.object(bot, "ev"):
            asyncio.run(bot.on_voice(update, context))

        message.reply_text.assert_awaited_once_with("🎙 Расслышала: «Почему я устала?»")
        telegram_bot.send_message.assert_awaited_once()
        telegram_bot.send_voice.assert_awaited_once_with(cid, b"voice-answer")
        self.assertNotIn(cid, bot._VOICE_TURN)

    def test_telegram_voice_intent_also_gets_spoken_copy_of_direct_reply(self):
        cid = 86
        update, context, telegram_bot, _message = self._voice_fixture(cid)
        spoken = []

        async def fake_llm(_cid, purpose, _fn, *args, **kwargs):
            if purpose == "stt":
                return "Покажи сводку"
            if purpose == "tts":
                spoken.append(args[0])
                return b"summary-audio"
            raise AssertionError(purpose)

        async def fake_handle(_update, proxied_context, _text):
            await proxied_context.bot.send_message(cid, "<b>Сводка готова</b>\nВсё хорошо.")

        with mock.patch.dict(os.environ, {"AIWA_VOICE_REPLY": "1"}), \
             mock.patch.object(bot, "llm_to_thread", side_effect=fake_llm), \
             mock.patch.object(bot, "handle_text", side_effect=fake_handle), \
             mock.patch.object(bot, "ev"):
            asyncio.run(bot.on_voice(update, context))

        self.assertEqual(spoken, ["Сводка готова\nВсё хорошо."])
        telegram_bot.send_voice.assert_awaited_once_with(cid, b"summary-audio")

    def test_telegram_text_never_enables_voice_reply(self):
        update = types.SimpleNamespace(
            effective_chat=types.SimpleNamespace(id=87),
            message=types.SimpleNamespace(text="Обычный текст", reply_text=mock.AsyncMock()),
        )
        context = types.SimpleNamespace()
        with mock.patch.object(bot, "handle_text", new=mock.AsyncMock()), \
             mock.patch.object(bot, "_send_voice_reply", new=mock.AsyncMock()) as voice_reply:
            asyncio.run(bot.on_text(update, context))
        voice_reply.assert_not_awaited()

    def test_joy_voice_uses_erm_24000_for_salutespeech(self):
        response = types.SimpleNamespace(
            status_code=200,
            content=b"joy-audio",
            text="",
            raise_for_status=lambda: None,
        )
        with mock.patch.object(llm, "SALUTE_VOICE", "erm"), \
             mock.patch.object(llm, "_salute_auth", return_value="speech-token"), \
             mock.patch.object(llm._HTTP, "post", return_value=response) as post, \
             mock.patch.object(llm, "_capture_media"):
            audio = llm.synthesize("Привет от Айвы")

        self.assertEqual(audio, b"joy-audio")
        self.assertEqual(post.call_args.kwargs["params"]["voice"], "Erm_24000")

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

    def test_legacy_admin_is_marked_deprecated_and_links_to_new_dashboard(self):
        with mock.patch.object(bot, "_admin_key_ok", return_value=False):
            login = asyncio.run(bot._admin_page(FakeRequest()))
        self.assertIn("Эта админка устарела", login.text)
        self.assertIn("https://stats.multitool.works/#/p/aiwa", login.text)

        with mock.patch.object(bot, "_admin_key_ok", return_value=True):
            dashboard = asyncio.run(bot._admin_page(FakeRequest()))
        self.assertIn("Старая аналитика — только для сверки", dashboard.text)
        self.assertIn("планируем удалить после переходного периода", dashboard.text)
        self.assertIn("rel=\"noopener noreferrer\"", dashboard.text)

    def test_llm_usage_keeps_legacy_total_and_captures_split(self):
        captured = []
        old_sink = llm._USAGE_SINK
        llm.set_usage_sink(captured.append)
        usage = []
        try:
            with llm.call_context(user_key="u_test", request_id="r_test", purpose="final_answer"):
                llm._capture_usage(usage, {"usage": {"prompt_tokens": 100, "completion_tokens": 25,
                                                      "total_tokens": 125, "cost": 0.012}},
                                   "provider", "model", time.time(), cost_unit="usd")
        finally:
            llm.set_usage_sink(old_sink)
        self.assertEqual(sum(usage), 125)
        self.assertEqual(llm.usage_split(usage), (100, 25, "model"))
        self.assertEqual(captured[0]["input_tokens"], 100)
        self.assertEqual(captured[0]["output_tokens"], 25)
        self.assertEqual(captured[0]["request_id"], "r_test")
        self.assertEqual(captured[0]["reported_cost"], 0.012)
        self.assertEqual(captured[0]["cost_unit"], "usd")

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

    def test_litellm_openrouter_model_marks_reported_cost_as_usd(self):
        with mock.patch.dict(os.environ, {"LITELLM_KEY": "test-key"}, clear=False), \
                mock.patch.object(llm, "_OPENROUTER_KEY", None), \
                mock.patch.object(llm, "PROXY_URL", "http://proxy.test/v1"), \
                mock.patch.object(llm, "PROXY_MODEL", "openrouter/deepseek/deepseek-v4-flash"):
            config = llm._proxy_configs()[0]
        self.assertEqual(config["name"], "litellm")
        self.assertEqual(config["cost_unit"], "usd")

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

    def test_chat_answers_follow_current_short_response_contract(self):
        with mock.patch.object(llm, "_call", return_value="Готовый ответ") as call:
            llm.answer_question(None, "Почему?", {})
        self.assertEqual(call.call_args.kwargs["max_tokens"], 1200)
        self.assertIn("ЖЁСТКИЙ предел 1900 знаков", call.call_args.args[0][-1]["content"])

    def test_onboarding_completion_counts_as_traction_activity(self):
        cid = 700
        conn = bot.db()
        conn.execute("INSERT INTO users(chat_id,created,mode) VALUES(?,?,?)",
                     (cid, "2026-07-22T08:00:00", "irregular"))
        conn.commit()
        conn.close()
        bot.ev(cid, "onboarding_completed", meta="irregular")
        conn = sqlite3.connect(bot.DB)
        conn.execute("UPDATE events SET ts='2026-07-22T12:00:00' WHERE chat_id=?", (cid,))
        conn.execute("UPDATE events_v2 SET occurred_at='2026-07-22T12:00:00' WHERE user_key=?", (a2.user_key(cid),))
        conn.commit(); conn.close()

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
