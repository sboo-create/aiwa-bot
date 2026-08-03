"""Опечатки в названии блюда.

Репорт владельца: запись «таорог, варенье инжирное» попала в дневник как есть,
и вместо творога показалась заглушка. Исправление обязано быть узким: лучше
оставить опечатку, чем подменить блюдо.
"""

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import food_assets as FA


MANIFEST = {
    "Творог с ягодами": "/assets/food/tvorog.png",
    "Гречневая каша": "/assets/food/grechka.png",
    "Овощной салат": "/assets/food/salat.png",
    "Блины": "/assets/food/bliny.png",
    "Треска на пару": "/assets/food/treska.png",
}


class TypoNormalizerTests(unittest.TestCase):
    def fix(self, text):
        return FA.correct_typos(text, MANIFEST)

    def test_the_reported_case(self):
        self.assertEqual(
            self.fix("таорог, варенье инжирное"),
            "творог, варенье инжирное",
        )

    def test_keeps_capitalisation(self):
        self.assertEqual(self.fix("Таорог с ягодами"), "Творог с ягодами")

    def test_known_words_are_never_touched(self):
        for text in ("творог с ягодами", "Блины", "Треска на пару"):
            self.assertEqual(self.fix(text), text)

    def test_unknown_word_without_a_close_match_stays(self):
        """Незнакомое слово — не повод подставить похожее блюдо."""
        self.assertEqual(self.fix("шаурма с курицей"), "шаурма с курицей")

    def test_short_words_are_left_alone(self):
        # «сок» и «сук» отличаются одной буквой — на коротких словах правка
        # слишком легко меняет смысл.
        self.assertEqual(self.fix("сук"), "сук")

    def test_ambiguous_correction_is_declined(self):
        """Два кандидата на одном расстоянии — оставляем как было."""
        import food_assets
        original = food_assets._ANCHOR_GROUPS
        try:
            food_assets._ANCHOR_GROUPS = ({"творог", "творох"},)
            self.assertEqual(FA.correct_typos("твороГ".lower()[:-1] + "к"), "творок")
        finally:
            food_assets._ANCHOR_GROUPS = original

    def test_transposition_insertion_deletion_on_anchor_words(self):
        self.assertEqual(self.fix("греяка с овощами"), "гречка с овощами")   # замена
        self.assertEqual(self.fix("гречкка с овощами"), "гречка с овощами")  # вставка
        self.assertEqual(self.fix("гречк с овощами"), "гречка с овощами")    # пропуск

    def test_words_outside_the_anchor_vocabulary_are_untouched(self):
        """«варенье» едва не стало «вареными», когда словарь был широким."""
        self.assertEqual(self.fix("творог, варенье инжирное"), "творог, варенье инжирное")
        self.assertEqual(self.fix("каша домашняя"), "каша домашняя")

    def test_empty_and_none_are_safe(self):
        self.assertEqual(FA.correct_typos(None, MANIFEST), "")
        self.assertEqual(FA.correct_typos("", MANIFEST), "")
        self.assertEqual(FA.correct_typos("   ", MANIFEST), "   ")

    def test_corrected_label_now_resolves_to_real_art(self):
        """Смысл всей правки: после исправления находится картинка."""
        resolver = FA.FoodAssetResolver(MANIFEST)
        broken = resolver.resolve("таорог с ягодами")
        fixed = resolver.resolve(FA.correct_typos("таорог с ягодами", MANIFEST))
        self.assertEqual(fixed["image_url"], "/assets/food/tvorog.png")
        self.assertNotEqual(broken["image_url"], fixed["image_url"])


if __name__ == "__main__":
    unittest.main()
