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

import os
import sys
import tempfile
import unittest
from unittest import mock
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
    # Множественное число приводится по словарю каталога, а не по выписанному
    # руками списку: «мандарины» я когда-то добавил, а «нектарины» забыл —
    # ровно тот несистемный подход, из-за которого покрытие и было дырявым.
    "множественное число": (
        "нектарины", "персики", "абрикосы", "сливы", "огурцы", "помидоры",
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


class HeadFromParseTests(unittest.TestCase):
    """Главную позицию знает разбор приёма пищи, а не порядок слов."""

    def test_side_ingredient_does_not_steal_the_picture(self):
        """Репорт: «вареники с вишней, сливочное масло» показывали масло."""
        result = FA.RESOLVER.resolve(
            "Вареники с вишней, сливочное масло",
            items=[
                {"name": "Вареники с вишней", "kcal": 700},
                {"name": "Сливочное масло", "kcal": 195},
            ],
        )
        self.assertEqual(result["asset_state"], "ready")
        self.assertIn("вареники", FA.normalize_label(result["canonical_label"]))

    def test_without_a_parse_ambiguity_is_refused_not_guessed(self):
        """Две непересекающиеся подписи — не гадаем, а показываем заглушку."""
        result = FA.RESOLVER.resolve("Вареники с вишней, сливочное масло")
        self.assertEqual(result["asset_state"], "missing")

    def test_thin_coverage_is_marked_for_regeneration(self):
        """«Кефир» на «мюсли, кефир, бутерброд» — повод сгенерить своё."""
        result = FA.RESOLVER.resolve("мюсли, кефир, бутерброд")
        self.assertEqual(result["match_quality"], "approximate")

    def test_good_coverage_stays_close(self):
        result = FA.RESOLVER.resolve("Блины с творогом и сметаной")
        self.assertEqual(result["match_quality"], "close")


class CompositionTests(unittest.TestCase):
    """Приём из нескольких продуктов показывается композицией, а не одним из них."""

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        patcher = mock.patch.dict(
            os.environ, {"AIWA_FOOD_ASSET_DIR": self.tmp.name}, clear=False
        )
        patcher.start()
        self.addCleanup(patcher.stop)

    def test_two_products_give_a_composition_not_a_choice(self):
        result = FA.RESOLVER.resolve(
            "Творог и банан",
            items=[{"name": "Творог", "kcal": 200}, {"name": "Банан", "kcal": 90}],
        )
        self.assertEqual(result["image_source"], "composition")
        self.assertEqual(result["asset_state"], "ready")

    def test_same_set_gives_the_same_file(self):
        """Имя считается от состава, поэтому кэш работает сам собой."""
        items = [{"name": "Творог", "kcal": 200}, {"name": "Банан", "kcal": 90}]
        first = FA.RESOLVER.resolve("Творог и банан", items=items)
        second = FA.RESOLVER.resolve("банан и творог", items=list(reversed(items)))
        self.assertEqual(first["image_url"], second["image_url"])

    def test_single_product_is_not_composed(self):
        result = FA.RESOLVER.resolve("Творог", items=[{"name": "Творог", "kcal": 200}])
        self.assertNotEqual(result["image_source"], "composition")

    def test_approximate_items_are_not_glued_together(self):
        """Коллаж из «похожих на что-то» — выдумка, а не честная картинка."""
        result = FA.RESOLVER.resolve(
            "Вителло тонато и калитка",
            items=[{"name": "Вителло тонато", "kcal": 300},
                   {"name": "Калитка с клубникой", "kcal": 200}],
        )
        self.assertNotEqual(result["image_source"], "composition")
