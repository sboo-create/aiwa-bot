import asyncio
import json
import os
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

    def test_new_start_records_acquisition_before_identity_row_hides_newness(self):
        update = self._start_update(701)
        context = types.SimpleNamespace(args=[])
        with (
            mock.patch.object(bot, "ev") as event,
            mock.patch.object(bot, "begin_onboard", new=mock.AsyncMock()) as begin,
        ):
            asyncio.run(bot.start(update, context))

        self.assertEqual(bot.row(701)["tg_first_name"], "Новый")
        event.assert_any_call(701, "signup")
        event.assert_any_call(701, "command", meta="start")
        begin.assert_awaited_once()

    def test_existing_start_does_not_duplicate_acquisition(self):
        bot._activate_user(702)
        bot.upsert(702, mode="male", tg_first_name="Денис")
        update = self._start_update(702, "Денис")
        context = types.SimpleNamespace(args=[])
        with mock.patch.object(bot, "ev") as event:
            asyncio.run(bot.start(update, context))

        self.assertFalse(any(
            call.args == (702, "signup") for call in event.call_args_list
        ))

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
        first_event.assert_any_call(706, "signup")

        with (
            mock.patch.object(bot, "ev") as second_event,
            mock.patch.object(bot, "begin_onboard", new=mock.AsyncMock()),
        ):
            asyncio.run(bot.start(update, context))
        self.assertFalse(any(
            call.args == (706, "signup") for call in second_event.call_args_list
        ))

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
