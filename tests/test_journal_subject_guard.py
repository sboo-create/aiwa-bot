"""Кто субъект записи: разбор модели против грубой эвристики.

Инцидент 08.08.2026 (Соня): «Пирожок съела с шпинатом запиши» не записывался.
Модель разбирала фразу верно — в логах отказ шёл с reason=corroboration, то
есть проверки action/confidence/subject/status/polarity/certainty/purpose уже
прошли, и subject был "self". Отклоняла вторая ступень: эвристика «слово с
заглавной + глагол = имя съело». Первое слово фразы всегда с заглавной, и под
неё попадала любая еда в начале сообщения — 8 человек за сутки.

Эвристика остаётся, но только для середины фразы, где заглавная буква
действительно означает имя собственное. Явные маркеры чужого события и вердикт
модели о субъекте — по-прежнему на месте.
"""

import os
import sys
import unittest
from pathlib import Path


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import aiwa_bot as bot


class OwnMealsAreNotReadAsSomeoneElse(unittest.TestCase):
    """Еда в начале фразы — не имя собственное."""

    def test_food_first_word_is_not_a_third_party(self):
        for text in (
            "Пирожок съела с шпинатом запиши",   # исходная жалоба
            "Творог съела",
            "Кофе выпила",
            "Овсянку съела утром",
            "Гречку с курицей съела на обед",
            "Салат съела, запиши",
            "Яблоко съела и кофе выпила",
            "Банан съел на завтрак",
            "Омлет приготовила и съела",
            "Курицу с рисом ела в обед",
        ):
            with self.subTest(text=text):
                self.assertFalse(bot._journal_third_party_source(text))

    def test_workout_and_period_first_word_too(self):
        for text in (
            "Тренировку сделала утром",
            "Пробежка была 5 км сегодня",
            "Месячные начались сегодня",
        ):
            with self.subTest(text=text):
                self.assertFalse(bot._journal_third_party_source(text))

    def test_leading_filler_word_still_counts_as_sentence_start(self):
        """«Кстати Пирожок съела»: вводное слово не делает еду именем."""
        for text in (
            "Кстати Пирожок съела",
            "Ну Творог съела",
            "А Кофе выпила",
            "Сегодня Овсянку съела",
            "Ещё Салат съела на ужин",
        ):
            with self.subTest(text=text):
                self.assertFalse(bot._journal_third_party_source(text))

    def test_verb_first_phrasing_still_works(self):
        """Обходной путь инцидента не должен перестать работать."""
        self.assertFalse(bot._journal_third_party_source("Съела пирожок со шпинатом"))


class ThirdPartyReportsStayBlocked(unittest.TestCase):
    """Всё, что действительно про другого человека, по-прежнему не пишется."""

    def test_name_inside_the_phrase_is_still_a_name(self):
        for text in (
            "В офисе Соня съела творог",
            "Вчера в офисе Соня бегала 30 минут",
        ):
            with self.subTest(text=text):
                self.assertTrue(bot._journal_third_party_source(text))

    def test_name_after_a_real_phrase_start_is_still_blocked(self):
        """Зачин кончается на первом же значимом слове: дальше заглавная = имя."""
        for text in (
            "Вчера в офисе Соня бегала 30 минут",
            "На кухне Соня съела творог",
        ):
            with self.subTest(text=text):
                self.assertTrue(bot._journal_third_party_source(text))

    def test_a_chain_of_filler_words_cannot_hide_a_name(self):
        """Зачин ограничен двумя словами: именем нельзя спрятаться за вводными."""
        self.assertTrue(
            bot._journal_third_party_source("Ну кстати вообще ладно Соня съела творог")
        )

    def test_punctuation_runs_cannot_stretch_the_lead(self):
        """Длинные разделители между вводными не продлевают начало фразы."""
        self.assertTrue(
            bot._journal_third_party_source("Кстати... ... ... вообще Соня съела творог")
        )
        # Обычная пунктуация после вводного слова работать не перестала.
        self.assertFalse(bot._journal_third_party_source("Кстати, Пирожок съела"))

    def test_explicit_markers_are_untouched(self):
        for text in (
            "У Сони сегодня начались месячные",
            "У Анны закончились месячные",
            "У подруги сегодня начались месячные",
            "По словам Анны, месячные начались",
            "Я выпила чай, а дочка съела две шоколадки и печенье",
            "Подруга съела пиццу",
            "Дочь поела кашу",
            "Она съела салат",
        ):
            with self.subTest(text=text):
                self.assertTrue(bot._journal_third_party_source(text))


class RepeatedMealContinuesTheRecord(unittest.TestCase):
    """«Ещё» продолжает запись и когда фраза начинается не с него."""

    def test_lead_words_before_eshe_are_allowed(self):
        for text in (
            "я ещё то же самое съела",     # вторая жалоба Сони
            "Ещё раз то же самое съела",
            "сегодня ещё один такой же съела",
            "потом ещё столько же",
        ):
            with self.subTest(text=text):
                self.assertTrue(bot._JOURNAL_CONTEXT_OPEN_RE.search(text))

    def test_lead_applies_only_to_eshe(self):
        """«я также съела печенье» — новая запись, а не продолжение прошлой."""
        self.assertIsNone(bot._JOURNAL_CONTEXT_OPEN_RE.search("я также съела печенье"))
        self.assertIsNone(bot._JOURNAL_CONTEXT_OPEN_RE.search("сегодня плюс йогурт съела"))
        self.assertTrue(bot._JOURNAL_CONTEXT_OPEN_RE.search("также съела печенье"))

    def test_unrelated_phrases_do_not_open_the_context(self):
        """Зачин ограничен: обычная новая запись продолжением не считается."""
        for text in (
            "съела творог",
            "на обед была гречка с курицей",
            "выпила кофе с молоком",
        ):
            with self.subTest(text=text):
                self.assertIsNone(bot._JOURNAL_CONTEXT_OPEN_RE.search(text))


if __name__ == "__main__":
    unittest.main()
