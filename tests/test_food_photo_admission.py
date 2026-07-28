import os
import unittest


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


class FoodPhotoAdmissionTests(unittest.TestCase):
    def test_photo_placeholders_are_never_saved(self):
        for title in ("нет данных", "Чек", "Не удалось распознать"):
            with self.subTest(title=title):
                self.assertIsNone(bot.normalize_food({
                    "title": title,
                    "total": {"kcal": 0, "protein": 0, "fat": 0, "carbs": 0},
                    "items": [],
                }, "photo"))

    def test_title_only_photo_is_not_evidence_of_food(self):
        self.assertIsNone(bot.normalize_food({
            "title": "Неизвестный объект",
            "total": {"kcal": 0, "protein": 0, "fat": 0, "carbs": 0},
            "items": [],
        }, "photo"))

    def test_low_calorie_food_photo_is_still_valid(self):
        record = bot.normalize_food({
            "title": "Чай",
            "total": {"kcal": 2, "protein": 0, "fat": 0, "carbs": 1},
            "items": [],
        }, "photo")

        self.assertIsNotNone(record)
        self.assertEqual(record["title"], "Чай")
        self.assertEqual(record["kcal"], 2)

    def test_text_flow_keeps_its_existing_admission_contract(self):
        record = bot.normalize_food({"title": "Стакан воды", "items": []}, "text")

        self.assertIsNotNone(record)
        self.assertEqual(record["title"], "Стакан воды")


if __name__ == "__main__":
    unittest.main()
