"""Шаг «ограничения в еде»: ответ разбирается до сравнения со списками.

Живой репорт: на вопрос про ограничения пришло «ytn» — это «нет», набранное в
английской раскладке (н на клавише y, е на t, т на n). Сравнение сырой строки
его не узнало, и промах по раскладке молча уехал в diet_note. Дальше каждый
промпт нёс «Пищевые ограничения: ytn» и мусорил рекомендации.
"""

import asyncio
import os
import tempfile
import types
import unittest
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot
import llm


class DietAnswerKeysTests(unittest.TestCase):
    """Чистая часть: прочтения строки и признак мусора."""

    def test_wrong_layout_denials_read_as_denials(self):
        for typed, meant in (
            ("ytn", "нет"),
            ("ytne", "нету"),
            ("yt", "не"),
            ("ghjgecnbnm", "пропустить"),
            ("juhfybxtybq ytn", "ограничений нет"),
        ):
            with self.subTest(typed=typed):
                self.assertIn(meant, bot.diet_answer_keys(typed))
                self.assertTrue(bot.diet_answer_keys(typed) & bot.DIET_DENIALS)

    def test_denials_typed_correctly_still_match(self):
        for text in bot.DIET_DENIALS:
            with self.subTest(text=text):
                self.assertTrue(bot.diet_answer_keys(text) & bot.DIET_DENIALS)

    def test_case_and_trailing_punctuation_do_not_matter(self):
        for text in ("Нет", "НЕТ!", "нет.", "нет,", "  нет  ", "YTN", "Ytn."):
            with self.subTest(text=text):
                self.assertTrue(bot.diet_answer_keys(text) & bot.DIET_DENIALS)

    def test_real_restrictions_are_not_denials(self):
        for text in ("без свинины, без сахара", "аллергия на орехи", "keto", "не ем мясо"):
            with self.subTest(text=text):
                self.assertFalse(bot.diet_answer_keys(text) & bot.DIET_DENIALS)
                self.assertFalse(bot.diet_answer_keys(text) & bot.DIET_NON_ANSWERS)

    def test_bare_yes_is_a_non_answer_in_both_layouts(self):
        for text in ("да", "lf", "Да!", "ага", "есть"):
            with self.subTest(text=text):
                self.assertTrue(bot.diet_answer_keys(text) & bot.DIET_NON_ANSWERS)

    def test_layout_tables_are_mutual_inverses(self):
        for text in ("нет", "пропустить", "без свинины"):
            with self.subTest(text=text):
                latin = text.translate(bot._LAYOUT_TO_LAT)
                self.assertEqual(latin.translate(bot._LAYOUT_TO_RU), text)

    def test_short_consonant_runs_are_noise(self):
        for text in ("sdfg", "ytr", "5", "qq", "ъь"):
            with self.subTest(text=text):
                self.assertTrue(bot.diet_answer_is_noise(text))

    def test_meaningful_answers_are_not_noise(self):
        # «мясо» латиницей читается как «vzcj» — проверять все раскладки нельзя,
        # поэтому признак считается только по строке как она набрана.
        for text in ("рыба", "keto", "без свинины", "мясо", "нет"):
            with self.subTest(text=text):
                self.assertFalse(bot.diet_answer_is_noise(text))

    def test_denials_are_checked_before_noise(self):
        """«-» — короткая строка без гласных, но это отказ, а не мусор."""
        self.assertTrue(bot.diet_answer_is_noise("-"))
        self.assertIn("-", bot.DIET_DENIALS)

    def test_empty_input_is_safe(self):
        self.assertFalse(bot.diet_answer_is_noise(""))
        self.assertFalse(bot.diet_answer_is_noise(None))
        self.assertEqual(bot.diet_answer_keys(None), {""})


class DietStepBehaviourTests(unittest.TestCase):
    """Поведение шага целиком: что уходит в профиль и что в промпт."""

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "test.db")
        bot._SUM_CACHE.clear()
        bot._MENU_CACHE.clear()
        bot._SECTION_CACHE.clear()
        bot._SECTION_TASKS.clear()

    def tearDown(self):
        bot._SECTION_CACHE.clear()
        bot._SECTION_TASKS.clear()
        bot.DB = self.old_db
        self.tmp.cleanup()

    def answer(self, text, cid=4242, diet=""):
        """Довести пользователя до await_diet и ответить текстом."""
        bot._activate_user(cid)
        bot.upsert(cid, mode="cycle", last_period="2026-05-25", cycle_len=28,
                   height=168, weight=60, age=30, activity=3, diet=diet,
                   state="await_diet")
        message = types.SimpleNamespace(entities=[], reply_text=mock.AsyncMock())
        update = types.SimpleNamespace(
            effective_chat=types.SimpleNamespace(id=cid), message=message)
        context = types.SimpleNamespace(
            application=object(),
            bot=types.SimpleNamespace(send_chat_action=mock.AsyncMock()))

        async def scenario():
            with (
                mock.patch.object(bot, "schedule_daily"),
                mock.patch.object(bot, "push_summary", new=mock.AsyncMock()),
            ):
                await bot.handle_text(update, context, text)

        asyncio.run(scenario())
        return bot.row(cid), message.reply_text

    def test_the_reported_case_ytn_leaves_diet_note_empty(self):
        user, _ = self.answer("ytn")
        self.assertEqual(user["diet_note"], "")
        self.assertIsNone(user["state"])

    def test_dash_is_a_denial_not_a_reask(self):
        user, _ = self.answer("-")
        self.assertEqual(user["diet_note"], "")
        self.assertIsNone(user["state"])

    def test_ytn_never_reaches_the_prompt(self):
        """Смысл всей правки: в промпте нет «Пищевые ограничения: ytn»."""
        user, _ = self.answer("ytn")
        self.assertEqual(llm.diet_restrictions(user), "")

    def test_plain_denial_still_works(self):
        user, _ = self.answer("нет")
        self.assertEqual(user["diet_note"], "")
        self.assertIsNone(user["state"])

    def test_real_restriction_is_saved_verbatim(self):
        user, _ = self.answer("без свинины, аллергия на орехи")
        self.assertEqual(user["diet_note"], "без свинины, аллергия на орехи")
        self.assertIsNone(user["state"])
        self.assertIn("без свинины", llm.diet_restrictions(user))

    def test_noise_is_asked_again_instead_of_saved(self):
        user, reply = self.answer("sdfg")
        self.assertEqual(user["diet_note"], "")
        self.assertEqual(user["state"], "await_diet")
        reply.assert_awaited_once()
        self.assertIn("Не разобрала", reply.await_args.args[0])

    def test_bare_yes_is_asked_again_instead_of_saved(self):
        user, reply = self.answer("да")
        self.assertEqual(user["diet_note"], "")
        self.assertEqual(user["state"], "await_diet")
        reply.assert_awaited_once()
        self.assertIn("какие именно", reply.await_args.args[0])

    def test_reask_keeps_codes_already_ticked_by_buttons(self):
        _, reply = self.answer("да", diet="noglu,nonuts")
        markup = reply.await_args.kwargs["reply_markup"]
        ticked = [b.text for row in markup.inline_keyboard for b in row if b.text.startswith("✓")]
        self.assertEqual(sorted(ticked), ["✓ Без глютена", "✓ Без орехов"])

    def test_repeated_ask_still_accepts_a_real_answer(self):
        """Переспрос не запирает онбординг: следующий ответ проходит."""
        cid = 4343
        bot._activate_user(cid)
        bot.upsert(cid, mode="cycle", last_period="2026-05-25", cycle_len=28,
                   height=168, weight=60, age=30, activity=3, state="await_diet")
        message = types.SimpleNamespace(entities=[], reply_text=mock.AsyncMock())
        update = types.SimpleNamespace(
            effective_chat=types.SimpleNamespace(id=cid), message=message)
        context = types.SimpleNamespace(
            application=object(),
            bot=types.SimpleNamespace(send_chat_action=mock.AsyncMock()))

        async def scenario():
            with (
                mock.patch.object(bot, "schedule_daily"),
                mock.patch.object(bot, "push_summary", new=mock.AsyncMock()),
            ):
                await bot.handle_text(update, context, "ytr")
                self.assertEqual(bot.row(cid)["state"], "await_diet")
                await bot.handle_text(update, context, "без молочки")

        asyncio.run(scenario())
        user = bot.row(cid)
        self.assertEqual(user["diet_note"], "без молочки")
        self.assertIsNone(user["state"])


if __name__ == "__main__":
    unittest.main()
