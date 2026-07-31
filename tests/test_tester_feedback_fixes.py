import os
import tempfile
import unittest
from datetime import timedelta
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


class OngoingPeriodPayloadTest(unittest.TestCase):
    """День 2 идущих месячных должен отмечаться без ежедневного ввода."""

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "period.db")
        self.cid = 703
        bot._activate_user(self.cid)
        yesterday = (bot.dtoday() - timedelta(days=1)).isoformat()
        bot.upsert(self.cid, mode="cycle", cycle_len=29, last_period=yesterday,
                   period_len=5, state=None)
        bot.cyc_add(self.cid, yesterday)

    def tearDown(self):
        bot.DB = self.old_db
        self.tmp.cleanup()

    def _payload(self):
        import asyncio
        import json as _json

        class Req:
            async def json(self):
                return {"initData": "x"}

        with mock.patch.object(bot, "_verify_init", return_value=703):
            resp = asyncio.run(bot._api_data(Req()))
        return _json.loads(resp.body.decode("utf-8"))

    def test_open_period_gets_estimated_end(self):
        out = self._payload()
        cur = [p for p in out["periods"] if p["start"] == out["last_period"]][0]
        self.assertTrue(cur.get("end_estimated"))
        # виртуальный конец не раньше сегодняшнего дня: день 2 попадает в диапазон
        self.assertGreaterEqual(cur["end"], bot.dtoday().isoformat())
        # статистика длин периодов не искажается оценкой
        self.assertIsNone(out["stats"]["avg_period"])

    def test_closed_period_untouched(self):
        end = bot.dtoday().isoformat()
        bot.upsert(self.cid, period_end=end)
        out = self._payload()
        cur = [p for p in out["periods"] if p["start"] == out["last_period"]][0]
        self.assertEqual(cur["end"], end)
        self.assertNotIn("end_estimated", cur)


class EmptyDiaryProteinPushTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "protein.db")
        self.cid = 704
        bot._activate_user(self.cid)
        bot.upsert(self.cid, mode="cycle", cycle_len=28, height=170, weight=60,
                   age=30, activity=2, state=None,
                   last_period=(bot.dtoday() - timedelta(days=10)).isoformat())

    def tearDown(self):
        bot.DB = self.old_db
        self.tmp.cleanup()

    def test_no_protein_push_for_empty_diary(self):
        keys = {s["key"] for s in bot._proactive_signals(self.cid, slot="eve")}
        self.assertNotIn("low_protein", keys)

    def test_protein_push_when_meals_logged_but_low(self):
        bot.meal_add(self.cid, {"title": "салат", "kcal": 120, "protein": 2,
                                "fat": 4, "carbs": 10, "grams": 150,
                                "items": [], "slot": "lunch"})
        keys = {s["key"] for s in bot._proactive_signals(self.cid, slot="eve")}
        self.assertIn("low_protein", keys)
