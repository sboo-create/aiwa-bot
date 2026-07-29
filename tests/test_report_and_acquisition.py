import asyncio
import concurrent.futures
import json
import os
import sqlite3
import tempfile
import types
import unittest
from pathlib import Path
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


class _JsonRequest:
    def __init__(self, body):
        self._body = body

    async def json(self):
        return self._body


class ReportAndAcquisitionTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "report.db")

    def tearDown(self):
        bot.DB = self.old_db
        self.tmp.cleanup()

    @staticmethod
    def _start_update(cid, first_name="Новый"):
        return types.SimpleNamespace(
            effective_chat=types.SimpleNamespace(id=cid, type="private"),
            effective_user=types.SimpleNamespace(first_name=first_name),
            message=types.SimpleNamespace(reply_text=mock.AsyncMock()),
        )

    @staticmethod
    def _count_onboarding(cid):
        c = bot.db()
        try:
            key = bot.A2.user_key(cid)
            return c.execute(
                """SELECT COUNT(*) FROM events_v2
                   WHERE user_key=? AND event_name='onboarding_started'""",
                (key,),
            ).fetchone()[0]
        finally:
            c.close()

    @staticmethod
    def _onboarding_marker(cid):
        c = bot.db()
        try:
            found = c.execute(
                "SELECT onboarding_started FROM users WHERE chat_id=?", (cid,)
            ).fetchone()
            return found[0] if found else None
        finally:
            c.close()

    def test_new_start_records_acquisition_before_identity_row_hides_newness(self):
        update = self._start_update(701)
        context = types.SimpleNamespace(args=[])
        with (
            mock.patch.object(bot, "ev") as event,
            mock.patch.object(bot, "begin_onboard", new=mock.AsyncMock()) as begin,
        ):
            asyncio.run(bot.start(update, context))

        self.assertEqual(bot.row(701)["tg_first_name"], "Новый")
        self.assertEqual(self._count_onboarding(701), 1)
        event.assert_any_call(701, "command", meta="start")
        begin.assert_awaited_once()

    def test_existing_start_does_not_duplicate_acquisition(self):
        bot._activate_user(702)
        bot.upsert(702, mode="male", tg_first_name="Денис")
        c = bot.db()
        c.execute(
            "UPDATE users SET onboarding_started=1 WHERE chat_id=?", (702,)
        )
        c.commit()
        c.close()
        update = self._start_update(702, "Денис")
        context = types.SimpleNamespace(args=[])
        with mock.patch.object(bot, "ev") as event:
            asyncio.run(bot.start(update, context))

        self.assertEqual(self._count_onboarding(702), 0)

    def test_existing_incomplete_profile_records_acquisition_exactly_once(self):
        bot._activate_user(706)
        bot.upsert(706, state=None, tg_first_name="Новый")
        update = self._start_update(706)
        context = types.SimpleNamespace(args=[])
        with (
            mock.patch.object(bot, "ev") as first_event,
            mock.patch.object(bot, "begin_onboard", new=mock.AsyncMock()),
        ):
            asyncio.run(bot.start(update, context))
        self.assertEqual(self._count_onboarding(706), 1)

        with (
            mock.patch.object(bot, "ev") as second_event,
            mock.patch.object(bot, "begin_onboard", new=mock.AsyncMock()),
        ):
            asyncio.run(bot.start(update, context))
        self.assertEqual(self._count_onboarding(706), 1)

    def test_legacy_rows_are_backfilled_without_new_acquisition(self):
        legacy_db = os.path.join(self.tmp.name, "legacy.db")
        c = sqlite3.connect(legacy_db)
        c.execute(
            """CREATE TABLE users(
                chat_id INTEGER PRIMARY KEY, last_period TEXT, cycle_len INTEGER,
                send_time TEXT, modules TEXT, state TEXT, pending_date TEXT,
                created TEXT, mode TEXT)"""
        )
        c.execute(
            """INSERT INTO users(
                chat_id,last_period,cycle_len,created,mode
            ) VALUES(?,?,?,?,?)""",
            (708, None, None, "2026-07-01T00:00:00+00:00", "male"),
        )
        c.commit()
        c.close()
        bot.DB = legacy_db

        self.assertEqual(self._onboarding_marker(708), 1)
        self.assertFalse(bot.record_onboarding_started(708))
        self.assertEqual(self._count_onboarding(708), 0)

    def test_stop_then_start_begins_new_privacy_lifecycle(self):
        update = self._start_update(709)
        context = types.SimpleNamespace(args=[])
        with (
            mock.patch.object(bot, "ev"),
            mock.patch.object(bot, "begin_onboard", new=mock.AsyncMock()),
        ):
            asyncio.run(bot.start(update, context))
        self.assertEqual(self._count_onboarding(709), 1)

        bot.del_user(709)
        self.assertIsNone(bot.row(709))
        with (
            mock.patch.object(bot, "ev"),
            mock.patch.object(bot, "begin_onboard", new=mock.AsyncMock()),
        ):
            asyncio.run(bot.start(update, context))
        self.assertEqual(self._count_onboarding(709), 1)

    def test_need_onboard_creates_and_counts_brand_new_user(self):
        message = types.SimpleNamespace(
            chat=types.SimpleNamespace(id=710),
            reply_text=mock.AsyncMock(),
        )
        asyncio.run(bot.need_onboard(message))

        self.assertEqual(self._onboarding_marker(710), 1)
        self.assertEqual(self._count_onboarding(710), 1)
        message.reply_text.assert_awaited_once()

    def test_write_disallowed_does_not_claim_marker(self):
        bot._activate_user(711)
        bot.upsert(711, state=None)
        with mock.patch.object(bot, "_user_write_allowed", return_value=False):
            self.assertFalse(bot.record_onboarding_started(711))

        self.assertEqual(self._onboarding_marker(711), 0)
        self.assertEqual(self._count_onboarding(711), 0)

    def test_stale_lifecycle_cannot_claim_reactivated_user(self):
        stale_generation = bot._activate_user(714)
        bot.upsert(714, user_generation=stale_generation, state=None)
        bot.del_user(714)
        current_generation = bot._activate_user(714)
        bot.upsert(714, user_generation=current_generation, state=None)

        self.assertFalse(bot.record_onboarding_started(714, stale_generation))
        self.assertEqual(self._onboarding_marker(714), 0)
        self.assertEqual(self._count_onboarding(714), 0)
        self.assertTrue(bot.record_onboarding_started(714, current_generation))
        self.assertEqual(self._count_onboarding(714), 1)

    def test_event_failure_rolls_back_marker_for_retry(self):
        bot._activate_user(712)
        bot.upsert(712, state=None)
        with mock.patch.object(bot.A2, "insert_event_v2", return_value=None):
            self.assertFalse(bot.record_onboarding_started(712))

        self.assertEqual(self._onboarding_marker(712), 0)
        self.assertTrue(bot.record_onboarding_started(712))
        self.assertEqual(self._onboarding_marker(712), 1)
        self.assertEqual(self._count_onboarding(712), 1)

    def test_concurrent_acquisition_calls_emit_once(self):
        bot._activate_user(713)
        bot.upsert(713, state=None)
        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
            results = list(pool.map(
                lambda _index: bot.record_onboarding_started(713), range(16)
            ))

        self.assertEqual(sum(bool(result) for result in results), 1)
        self.assertEqual(self._count_onboarding(713), 1)

    def test_send_report_returns_confirmed_delivery_status(self):
        bot._activate_user(703)
        bot.upsert(703, mode="male")
        fake_report = types.SimpleNamespace(
            period_since=lambda _period: (None, "Весь период"),
            build_report=lambda _payload: b"%PDF-test",
        )
        fake_bot = types.SimpleNamespace(
            send_chat_action=mock.AsyncMock(),
            send_document=mock.AsyncMock(),
            send_message=mock.AsyncMock(),
        )
        context = types.SimpleNamespace(bot=fake_bot)
        with (
            mock.patch.object(bot, "RPT", fake_report),
            mock.patch.object(bot, "logs_of", return_value=[]),
            mock.patch.object(bot, "ev"),
        ):
            result = asyncio.run(bot.send_report(context, 703, "all"))

        self.assertEqual(result, {"ok": True, "delivered": True})
        fake_bot.send_document.assert_awaited_once()

    def test_report_api_does_not_return_success_for_failed_delivery(self):
        bot._activate_user(704)
        bot.upsert(704, mode="male")
        old_app, old_report = bot.BOT_APP, bot.RPT
        bot.BOT_APP = types.SimpleNamespace(bot=object())
        bot.RPT = object()
        try:
            with (
                mock.patch.object(bot, "_verify_init", return_value=704),
                mock.patch.object(
                    bot,
                    "send_report",
                    new=mock.AsyncMock(return_value={
                        "ok": False,
                        "delivered": False,
                        "error": "delivery_failed",
                    }),
                ),
                mock.patch.object(bot, "ev"),
            ):
                response = asyncio.run(bot._api_report(
                    _JsonRequest({"initData": "signed", "period": "all"})
                ))
        finally:
            bot.BOT_APP, bot.RPT = old_app, old_report

        payload = json.loads(response.text)
        self.assertEqual(response.status, 502)
        self.assertFalse(payload["delivered"])
        self.assertNotIn("ok", payload)

    def test_report_api_rejects_unknown_period(self):
        bot._activate_user(705)
        bot.upsert(705, mode="male")
        old_app, old_report = bot.BOT_APP, bot.RPT
        bot.BOT_APP = types.SimpleNamespace(bot=object())
        bot.RPT = object()
        try:
            with mock.patch.object(bot, "_verify_init", return_value=705):
                response = asyncio.run(bot._api_report(
                    _JsonRequest({"initData": "signed", "period": "../../all"})
                ))
        finally:
            bot.BOT_APP, bot.RPT = old_app, old_report

        self.assertEqual(response.status, 400)

    def test_report_api_accepts_every_period_offered_by_all_clients(self):
        bot._activate_user(707)
        bot.upsert(707, mode="male")
        old_app, old_report = bot.BOT_APP, bot.RPT
        bot.BOT_APP = types.SimpleNamespace(bot=object())
        bot.RPT = object()
        try:
            for period in bot.REPORT_PERIODS:
                with (
                    self.subTest(period=period),
                    mock.patch.object(bot, "_verify_init", return_value=707),
                    mock.patch.object(
                        bot,
                        "send_report",
                        new=mock.AsyncMock(return_value={
                            "ok": True,
                            "delivered": True,
                        }),
                    ) as send,
                    mock.patch.object(bot, "ev"),
                ):
                    response = asyncio.run(bot._api_report(
                        _JsonRequest({"initData": "signed", "period": period})
                    ))
                    self.assertEqual(response.status, 200)
                    send.assert_awaited_once()
        finally:
            bot.BOT_APP, bot.RPT = old_app, old_report

        root = Path(__file__).resolve().parents[1]
        bundle = (
            root / "webapp2/assets/deslop/deslop-main-aiwa-v177.js"
        ).read_text(encoding="utf-8")
        legacy_sources = [
            (root / "aiwa_webapp.html").read_text(encoding="utf-8"),
            (root / "webapp/index.html").read_text(encoding="utf-8"),
            (root / "webapp2/index.html").read_text(encoding="utf-8"),
        ]
        for period in bot.REPORT_PERIODS:
            self.assertTrue(
                f'value: "{period}"' in bundle
                or f'period: "{period}"' in bundle
            )
            self.assertTrue(all(
                f"doReport('{period}')" in source for source in legacy_sources
            ))

    def test_current_mini_app_confirms_delivery_and_returns_to_chat(self):
        bundle = (
            Path(__file__).resolve().parents[1]
            / "webapp2/assets/deslop/deslop-main-aiwa-v177.js"
        ).read_text(encoding="utf-8")
        self.assertIn('y?.ok && y?.delivered', bundle)
        self.assertIn('A?.ok && A?.delivered', bundle)
        self.assertIn('label: reportBusy ? "Собираю…" : "Собрать выписку"', bundle)
        self.assertIn("window.Telegram?.WebApp?.close?.()", bundle)


if __name__ == "__main__":
    unittest.main()
