"""Сквозной повтор диалога Sonia — того самого, с которого начался разбор.

Каждый ход прогоняется через настоящий `_chat_reply`: маршрут, исполнитель,
транзакция, проверка записи в БД и сборка текста ответа. Подменён только вызов
провайдера (`call_tools`) — то есть решение модели. Всё остальное настоящее.

Диалог как он был:
  1. голосовое про четыре блюда           -> «Записала в обед» (был завтрак), лепёшка потеряна
  2. «Это был мой завтрак а не обед»      -> ничего не произошло
  3. «А ты не записал, что я съела ...?»  -> ничего не произошло
  4. повтор реплики 2                     -> дословно тот же шаблон отказа
"""

import asyncio
import json
import os
import tempfile
import unittest
from datetime import timedelta
from unittest import mock

os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


def tool_plan(*calls):
    return mock.patch.object(bot.L, "call_tools", side_effect=[
        {"content": "", "tool_calls": [
            {"id": f"c{i}", "function": {"name": n, "arguments": json.dumps(a, ensure_ascii=False)}}
            for i, (n, a) in enumerate(calls)]},
        {"content": "", "tool_calls": None},
    ])


VOICE = ("Я съела бутерброд с острочистелой красной рыбой, чуть-чуть голубики, "
         "горсочку ладонь прям. Ещё я съела припешку с сыром и зеленью и скусила "
         "половину. И ещё я съела куриный наггетс. Один. Домашний.")

# То, что вернёт распознаватель еды на новом промпте: четыре позиции и честный
# остаток по фрагменту, который ASR исказил до неузнаваемости.
FOUR_ITEMS = {
    "title": "Завтрак",
    "items": [
        {"name": "Бутерброд с красной рыбой", "grams": 120, "kcal": 300,
         "protein": 15, "fat": 14, "carbs": 28},
        {"name": "Голубика", "grams": 40, "kcal": 23, "protein": 0.3, "fat": 0.1, "carbs": 5},
        {"name": "Куриный наггетс", "grams": 30, "kcal": 90, "protein": 5, "fat": 5, "carbs": 5},
    ],
    "unparsed": ["припешку с сыром и зеленью"],
}
FLATBREAD = {"title": "Лепёшка с сыром и зеленью", "grams": 90, "kcal": 240,
             "protein": 9, "fat": 11, "carbs": 26}


class SoniaDialogTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "sonia.db")
        bot._GUARD_STRIKES.clear(); bot._GUARD_LAST.clear()
        self.cid = 7710
        bot._activate_user(self.cid)
        bot.upsert(self.cid, mode="cycle", cycle_len=28,
                   last_period=(bot.dtoday() - timedelta(days=12)).isoformat(),
                   height=168, weight=60, age=30, activity=2)

    def tearDown(self):
        bot.DB = self.old_db
        self.tmp.cleanup()

    def _reply(self, text, key, *calls, food=None):
        with tool_plan(*calls):
            with mock.patch.object(bot.L, "analyze_food_text",
                                   return_value=(food or FOUR_ITEMS)):
                return asyncio.run(bot._chat_reply(
                    self.cid, bot.row(self.cid), text,
                    mutation_key=bot.chat_mutation_key("telegram", key),
                    require_mutation_key=True,
                ))

    def test_full_dialog_now_resolves(self):
        # --- Ход 1: голосовое. Приём пищи не назван -> честная пометка догадки.
        first = self._reply(VOICE, "sonia-1",
                            ("log_meal", {"food_text": VOICE, "subject_span": "я"}),
                            food=FOUR_ITEMS)
        self.assertEqual(first["mutation"]["kind"], "food")
        meals = bot.meals_of(self.cid)
        self.assertEqual(len(meals), 1)
        meal_id = meals[0]["id"]

        # Четыре блюда больше не схлопываются в одну строку без следа:
        # три распознаны, четвёртое явно вынесено в вопрос.
        self.assertEqual(len(meals[0]["items"]), 3)
        self.assertIn("припешку с сыром и зеленью", first["answer"])
        self.assertIn("Не разобрала", first["answer"])

        # Слот выведен из часов, поэтому помечен как догадка и предлагается к правке.
        self.assertTrue(meals[0]["slot_guessed"])
        self.assertIn("определила по времени", first["answer"])
        kb = bot._journal_reply_kb(bot.row(self.cid), first)
        self.assertTrue(any("mslot:" in b.callback_data for r in kb for b in r))

        # --- Ход 2: «Это был мой завтрак а не обед» -> операция существует.
        second = self._reply("Это был мой завтрак а не обед", "sonia-2",
                             ("move_meal_slot", {"meal_id": meal_id, "slot": "breakfast",
                                                 "subject_span": "мой"}))
        self.assertEqual(second["mutation"]["kind"], "food_update")
        self.assertIn("Перенесла в завтрак", second["answer"])
        moved = bot.meal_get(self.cid, meal_id)
        self.assertEqual(moved["slot"], "breakfast")
        self.assertFalse(moved["slot_guessed"])

        # --- Ход 3: жалоба на пропуск -> блюдо дописывается, агрегат пересчитан кодом.
        before_kcal = moved["kcal"]
        third = self._reply("А ты не записал, что я съела лепешку с сыром и зеленью?", "sonia-3",
                            ("append_meal_item", {"meal_id": meal_id,
                                                  "food_text": "лепёшка с сыром и зеленью",
                                                  "subject_span": "я"}),
                            food=FLATBREAD)
        self.assertEqual(third["mutation"]["kind"], "food_update")
        after = bot.meal_get(self.cid, meal_id)
        self.assertEqual(len(after["items"]), 4)
        self.assertEqual(after["kcal"], before_kcal + FLATBREAD["kcal"])
        self.assertEqual(after["kcal"], sum(i["kcal"] for i in after["items"]))
        self.assertEqual(after["slot"], "breakfast", "дописывание не должно менять приём пищи")

        # --- Ход 4: повтор реплики 2. Запись уже в завтраке — честный ответ без петли.
        fourth = self._reply("Это был мой завтрак а не обед", "sonia-4",
                             ("move_meal_slot", {"meal_id": meal_id, "slot": "breakfast",
                                                 "subject_span": "мой"}))
        self.assertNotEqual(fourth["answer"], second["answer"])
        self.assertIn("и так в разделе", fourth["answer"])
        self.assertEqual(len(bot.meals_of(self.cid)), 1, "повтор не должен плодить записи")

    def test_third_party_variant_of_the_same_dialog_is_refused(self):
        """Тот же ход, но событие чужое — исполнитель отказывает независимо от модели."""
        result = self._reply("Соня съела лепешку с сыром, запиши", "sonia-tp",
                             ("log_meal", {"food_text": "лепёшка с сыром",
                                           "subject_span": "я"}))
        self.assertEqual(bot.meals_of(self.cid), [])
        self.assertNotIn("Записала", result["answer"])
