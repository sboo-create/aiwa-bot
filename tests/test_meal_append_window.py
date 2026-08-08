"""Когда еда дополняет прошлый приём, а когда становится новым.

Разбор с Соней 08.08.2026: грибной суп в 11:04, пирожок со шпинатом в 11:51 и
пирожок с клюквой в 12:29 оказались одной записью «обед» на 340 ккал. Причина
не в модели: дополнение записи не имело окна по времени (три часа на «свежесть
правки»), а слот выбирался только по часу — 11:00-16:00 всегда обед.

Правило теперь одно и без исключений: дополнять можно запись не старше десяти
минут — это и есть «ой, забыла добавить». Всё остальное — новый приём, и если
слот по времени уже занят, он идёт перекусом.
"""

import os
import sys
import unittest
from datetime import datetime, timedelta
from pathlib import Path


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import aiwa_bot as bot


def _stamp(minutes_ago):
    return (datetime.now(bot.TZ) - timedelta(minutes=minutes_ago)).isoformat()


class AppendWindowTests(unittest.TestCase):
    def test_fresh_record_is_still_appendable(self):
        for minutes in (0, 3, 9):
            with self.subTest(minutes=minutes):
                self.assertTrue(
                    bot._meal_within_append_window({"ts": _stamp(minutes)})
                )

    def test_record_past_the_window_is_a_new_meal(self):
        """Пирожок через 47 минут после супа — уже не забытая позиция."""
        for minutes in (11, 47, 120):
            with self.subTest(minutes=minutes):
                self.assertFalse(
                    bot._meal_within_append_window({"ts": _stamp(minutes)})
                )

    def test_missing_or_broken_timestamp_is_not_fresh(self):
        """Без метки времени свежесть не доказана — дополнять нельзя."""
        for meal in ({}, {"ts": ""}, {"ts": "не дата"}, None):
            with self.subTest(meal=meal):
                self.assertFalse(bot._meal_within_append_window(meal))

    def test_window_is_ten_minutes(self):
        self.assertEqual(bot.APPEND_WINDOW_MIN, 10)


class RepeatLastMealTests(unittest.TestCase):
    """«Ещё то же самое» повторяет последнее блюдо, а не весь приём."""

    def _context(self, minutes_ago=2):
        return {
            "meals": [{
                "id": 7,
                "title": "грибной суп, пирожок со шпинатом, пирожок с клюквой",
                "items": [
                    {"name": "грибной суп"},
                    {"name": "пирожок со шпинатом"},
                    {"name": "пирожок с клюквой"},
                ],
            }],
            "last_mutation": {
                "kind": "food_append", "record_id": 7,
                "created_at": _stamp(minutes_ago),
            },
        }

    def test_repeat_takes_the_last_item_only(self):
        for text in (
            "я еще то же самое съела",
            "Ещё раз то же самое съела",
            "ещё один такой же съела",
        ):
            with self.subTest(text=text):
                plan = bot._journal_repeat_last_meal(text, self._context())
                self.assertEqual(plan["intent"], "logmeal")
                self.assertEqual(plan["food_text"], "пирожок с клюквой")

    def test_repeat_works_without_the_word_eshe(self):
        """«я то же самое съел» — тот же повтор, слово «ещё» не обязательно."""
        for text in (
            "я то же самое съел",
            "то же самое съела",
            "такой же съел",
        ):
            with self.subTest(text=text):
                plan = bot._journal_repeat_last_meal(text, self._context())
                self.assertIsNotNone(plan)
                self.assertEqual(plan["food_text"], "пирожок с клюквой")

    def test_repeat_is_marked_so_the_duplicate_prompt_is_skipped(self):
        """Повтор — намеренный дубль: кнопка «Записать ещё раз» тут лишняя."""
        plan = bot._journal_repeat_last_meal("я ещё то же самое съела", self._context())
        self.assertEqual(plan["repeat_of"], 7)

    def test_plain_entries_and_negations_are_not_repeats(self):
        for text in (
            "съела творог",
            "я не ещё то же самое съела",
            "я не то же самое съел",
            "подруга ещё то же самое съела",
        ):
            with self.subTest(text=text):
                self.assertIsNone(bot._journal_repeat_last_meal(text, self._context()))

    def test_repeat_needs_a_recent_meal_to_point_at(self):
        """Без свежей записи повторять нечего — гадать не начинаем."""
        self.assertIsNone(
            bot._journal_repeat_last_meal("я еще то же самое съела", self._context(minutes_ago=300))
        )
        self.assertIsNone(bot._journal_repeat_last_meal("я еще то же самое съела", {}))


class FreeSlotTests(unittest.TestCase):
    def setUp(self):
        import tempfile

        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "slots.db")
        self.cid = 8811
        bot._activate_user(self.cid)
        self.today = bot.dtoday().isoformat()

    def tearDown(self):
        bot.DB = self.old_db
        self.tmp.cleanup()

    def _add(self, title, slot=None):
        return bot.meal_add(
            self.cid,
            {"title": title, "kcal": 100, "protein": 5, "fat": 5, "carbs": 10,
             "items": [{"name": title, "kcal": 100}], "source": "text", "slot": slot},
            d=self.today,
        )

    def test_second_meal_in_a_taken_slot_becomes_a_snack(self):
        first = self._add("грибной суп")
        second = self._add("пирожок со шпинатом")

        slot_now = bot.slot_for_now()
        self.assertEqual(bot.meal_get(self.cid, first)["slot"], slot_now)
        if slot_now == "snack":
            self.skipTest("в этот час слот и так перекус")
        self.assertEqual(bot.meal_get(self.cid, second)["slot"], "snack")

    def test_explicit_slot_from_the_model_still_wins(self):
        """Явный слот («это был завтрак») правило не переопределяет."""
        self._add("грибной суп")
        breakfast = self._add("омлет", slot="breakfast")
        self.assertEqual(bot.meal_get(self.cid, breakfast)["slot"], "breakfast")


if __name__ == "__main__":
    unittest.main()
