import os
import unittest
from datetime import timedelta


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


def _ctx(meal_date):
    return {
        "meals": [{"id": 309, "date": meal_date, "ts": meal_date + "T14:00:00",
                   "title": "чай", "grams": 200, "kcal": 2, "slot": "lunch",
                   "items": [], "slot_guessed": False}],
        "workouts": [],
        "last_mutation": {"kind": "food", "record_id": 309,
                          "created_at": meal_date + "T14:00:00"},
    }


class JournalDayGuardTest(unittest.TestCase):
    def setUp(self):
        self.today = bot.dtoday().isoformat()
        self.yesterday = (bot.dtoday() - timedelta(days=1)).isoformat()

    def test_today_record_editable_without_markers(self):
        self.assertTrue(bot._journal_target_day_allowed(
            _ctx(self.today), "meals", 309, "добавь карамель к чаю"))

    def test_yesterday_record_blocked_without_past_marker(self):
        # Инцидент 2026-07-31: утреннее «съел карамельку» дополнило вчерашний чай.
        self.assertFalse(bot._journal_target_day_allowed(
            _ctx(self.yesterday), "meals", 309, "съел карамельку"))

    def test_yesterday_record_allowed_with_explicit_marker(self):
        for raw in ("вчера ещё съел карамельку", "позавчера была карамель",
                    "добавь к чаю за 30.07 карамель"):
            self.assertTrue(bot._journal_target_day_allowed(
                _ctx(self.yesterday), "meals", 309, raw), raw)

    def test_unknown_target_passes_through(self):
        # принадлежность проверяет _semantic_owned_recent_target, не этот guard
        self.assertTrue(bot._journal_target_day_allowed(
            _ctx(self.yesterday), "meals", 999, "съел карамельку"))

    def test_v1_food_update_branch_blocks_stale_target(self):
        ok = bot._semantic_action_matches_source(
            "food_update", "исправь 100 грамм", _ctx(self.yesterday),
            {"target_id": 309}, require_evidence=False)
        self.assertFalse(ok)
        ok_today = bot._semantic_action_matches_source(
            "food_update", "исправь 100 грамм", _ctx(self.today),
            {"target_id": 309}, require_evidence=False)
        self.assertTrue(ok_today)
