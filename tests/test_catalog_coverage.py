"""Покрытие каталога на том, что люди реально пишут в дневник.

Замер на записях прода показал 43%: каталог собирался из блюд — белок ×
способ × гарнир, супы, салаты, — а в дневнике сплошь и рядом один продукт
(«мандарин», «голубика»), словоформа («картошка»), сочетание («блины с
творогом и сметаной») или бренд («твикс»). Картинки при этом были: не хватало
не их, а правил сопоставления.

Здесь зафиксированы классы запросов, а не конкретные подписи каталога: набор
перегенерируется целиком, и тест, прибитый к подписям, ловил бы факт
перегенерации вместо просадки покрытия.
"""

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import food_assets as FA


#: Классы того, что встречается в дневнике. Внутри класса — формулировки,
#: которые пользователь пишет сам, а не каталожные названия.
CASES = {
    "одиночный продукт": (
        "Мандарин", "Яблоко", "Банан", "Огурец", "Помидор", "Творог",
    ),
    "словоформа": (
        "мандарины", "яблоки", "жареная картошка", "блинчики", "помидорка",
    ),
    "блюдо с добавками": (
        "Блины с творогом и сметаной", "Гречка с отварной говядиной",
        "Треска с тушёной капустой", "Овсянка с ягодами",
    ),
    "напиток с модификатором": (
        "Латте на кокосовом молоке", "Айс латте", "Чай зелёный",
    ),
    "бренд": (
        "Твикс", "Bombbar Tiramisu", "Corona Extra", "Доктор Пеппер",
    ),
}


class CatalogCoverageTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.resolver = FA.RESOLVER

    def test_every_class_of_diary_entry_gets_real_art(self):
        misses = []
        for group, phrases in CASES.items():
            for phrase in phrases:
                result = self.resolver.resolve(phrase)
                if result["asset_state"] != "ready":
                    misses.append(f"{group}: {phrase}")
        self.assertEqual(
            misses, [],
            "эти записи покажут заглушку вместо картинки:\n  " + "\n  ".join(misses),
        )

    def test_subset_match_prefers_the_most_specific_label(self):
        """Иначе «Салат Цезарь» получил бы картинку простого салата."""
        specific = self.resolver.resolve("Салат Цезарь с курицей")
        self.assertEqual(specific["asset_state"], "ready")
        self.assertIn("цезарь", FA.normalize_label(specific["canonical_label"]))

    def test_unrelated_words_do_not_borrow_someone_elses_art(self):
        """Пустая заглушка честнее красивой, но чужой картинки."""
        for phrase in ("Кот", "Ацидофилин с огурцом и укропом"):
            with self.subTest(phrase=phrase):
                result = self.resolver.resolve(phrase)
                self.assertEqual(result["asset_state"], "missing", phrase)

    def test_brands_resolve_to_a_category_not_to_a_logo(self):
        for phrase, expected in (
            ("Твикс", "батончик"),
            ("Corona Extra", "пиво"),
        ):
            with self.subTest(phrase=phrase):
                label = FA.brand_category(phrase)
                self.assertIsNotNone(label, phrase)
                self.assertIn(expected, FA.normalize_label(label))


if __name__ == "__main__":
    unittest.main()
