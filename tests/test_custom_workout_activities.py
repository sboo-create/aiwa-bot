import os
import tempfile
import unittest
from datetime import timedelta


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


class CustomWorkoutTitleTest(unittest.TestCase):
    def test_simple_name_capitalized(self):
        self.assertEqual(bot._custom_workout_title("сквош"), "Сквош")

    def test_whitespace_and_punctuation_stripped(self):
        self.assertEqual(bot._custom_workout_title("  сквош с другом.  "), "Сквош с другом")

    def test_long_text_truncated(self):
        long = "очень длинное описание тренировки которое не влезет"
        out = bot._custom_workout_title(long)
        self.assertLessEqual(len(out), 24)
        self.assertTrue(out.endswith("…"))

    def test_empty_gives_empty(self):
        self.assertEqual(bot._custom_workout_title("   "), "")


class FavoriteActivitiesTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "fav.db")
        self.cid = 702
        bot._activate_user(self.cid)

    def tearDown(self):
        bot.DB = self.old_db
        self.tmp.cleanup()

    def _add(self, wtype, days_ago=1, n=1):
        d = (bot.dtoday() - timedelta(days=days_ago)).isoformat()
        for _ in range(n):
            bot.workout_add(self.cid, {"type": wtype, "items": [], "duration": "30 мин",
                                       "rpe": "нормально", "note": "", "kcal": 100,
                                       "muscles": ""}, d=d)

    def test_custom_types_ranked_standard_excluded(self):
        self._add("Сквош", days_ago=2, n=3)
        self._add("Падел", days_ago=5, n=1)
        self._add("Силовая", days_ago=1, n=5)   # стандартный тип не попадает
        self.assertEqual(bot.favorite_activities(self.cid), [("Сквош", 3), ("Падел", 1)])

    def test_old_activity_fades_out(self):
        self._add("Сквош", days_ago=90, n=4)    # за пределами окна
        self._add("Падел", days_ago=3, n=1)
        self.assertEqual(bot.favorite_activities(self.cid), [("Падел", 1)])

    def test_recent_text_mentions_favorites(self):
        self._add("Сквош", days_ago=2, n=2)
        txt = bot._recent_workouts_text(self.cid)
        self.assertIn("Сквош (2 раз)", txt)
        self.assertIn("собственные активности", txt)
