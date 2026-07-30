import asyncio
import json
import os
import unittest
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


class CandidateModeTest(unittest.TestCase):
    def test_flag_off_by_default(self):
        with mock.patch.dict(os.environ, {}, clear=False):
            os.environ.pop("AIWA_CANDIDATE", None)
            self.assertFalse(bot._candidate_mode())

    def test_flag_enabled_values(self):
        for value in ("1", "true", "yes", "on"):
            with mock.patch.dict(os.environ, {"AIWA_CANDIDATE": value}):
                self.assertTrue(bot._candidate_mode())
        with mock.patch.dict(os.environ, {"AIWA_CANDIDATE": "0"}):
            self.assertFalse(bot._candidate_mode())

    def test_health_reports_candidate_mode(self):
        with mock.patch.dict(os.environ, {"AIWA_CANDIDATE": "1"}):
            resp = asyncio.run(bot._health(None))
        payload = json.loads(resp.body.decode("utf-8"))
        self.assertTrue(payload["candidate"])

    def test_run_all_gates_polling_on_candidate(self):
        # Кандидат не должен вызывать on_startup/start_polling: проверяем, что
        # ветвление в run_all стоит между initialize и start_polling.
        import inspect

        src = inspect.getsource(bot.run_all)
        gate = src.find("_candidate_mode()")
        poll = src.find("start_polling")
        startup = src.find("on_startup(app)")
        self.assertGreater(gate, -1)
        self.assertGreater(poll, gate)
        self.assertGreater(startup, gate)
