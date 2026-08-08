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


class RepeatMealPlanTests(unittest.TestCase):
    """Повтор — действие модели с target_id, а не список формулировок.

    Раньше это ловилось регулярками, и каждая новая фраза («а теперь снова
    съел это же») падала. Теперь фразу разбирает модель, а код проверяет
    владение записью и её свежесть — как для move_meal_slot и append_meal_item.
    """

    def _context(self, minutes_ago=2):
        return {
            "meals": [{"id": 7, "date": bot.dtoday().isoformat(),
                       "title": "геркулесовая каша",
                       "items": [{"name": "геркулесовая каша"}]}],
            "last_mutation": {"kind": "food", "record_id": 7,
                              "created_at": _stamp(minutes_ago)},
        }

    def _plan(self, payload, context=None):
        return bot._normalize_semantic_journal(
            payload, source_text="а теперь снова съел это же",
            context=context or self._context(), enable_v2=True,
        )

    def _payload(self, **over):
        base = {
            "action": "repeat_meal", "target_id": 7, "confidence": 0.95,
            "subject": "self", "status": "completed", "polarity": "positive",
            "certainty": "certain", "primary_purpose": "journal",
        }
        base.update(over)
        return base

    def test_repeat_plan_carries_only_the_target(self):
        plan = self._plan(self._payload())
        self.assertEqual(plan["intent"], "repeatmeal")
        self.assertEqual(plan["target_id"], 7)
        # Состав берётся из записи, поэтому food_text в плане не нужен.
        self.assertNotIn("food_text", plan)

    def test_repeat_needs_an_owned_target(self):
        self.assertIsNone(self._plan(self._payload(target_id=999)))

    def test_repeat_keeps_the_usual_subject_and_polarity_guards(self):
        for over in (
            {"subject": "other"},
            {"polarity": "negative"},
            {"status": "planned"},
            {"certainty": "unsure"},
            {"confidence": 0.4},
        ):
            with self.subTest(over=over):
                self.assertIsNone(self._plan(self._payload(**over)))


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
