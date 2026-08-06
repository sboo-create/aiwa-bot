import asyncio
import os
import tempfile
import unittest
from datetime import timedelta
from types import SimpleNamespace
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot
import llm


SITUATIONAL_QUESTIONS = [
    "Что есть после анализов?",
    "что есть после сдачи анализов",
    "Что есть чтобы снизить боль?",
    "что есть чтобы уменьшить спазмы",
    "что есть при месячных",
    "что есть при мигрени",
    "что съесть перед тренировкой",
    "что есть от вздутия",
    "чем питаться при анемии",
    "какие продукты при низком гемоглобине",
    "что есть для энергии",
    "что есть на ночь",
    "что есть во время месячных",
    "что приготовить из курицы",
    "болит живот, что поесть",
    "тошнит, что можно есть",
    "что есть натощак",
    "что есть если болит голова",
    "что есть без сахара",
    "что есть чтобы похудеть",
    "что кушать при грудном вскармливании",
    "что есть во время беременности",
]

GENERIC_MENU_REQUESTS = [
    "что мне есть сегодня",
    "что есть",
    "Что есть?",
    "что поесть",
    "покажи меню",
    "меню на сегодня",
    "меню на завтра",
    "составь меню для меня",
    "подбери меню",
    "обнови меню",
    "что на завтрак",
    "что на ужин",
    "что есть на завтрак",
    "что съесть для завтрака",
    "что приготовить для ужина",
    "Что есть в мою фазу?",
    "чем мне питаться",
    "чем питаться сегодня",
    "как мне лучше питаться",
    "рацион",
    "еда на сегодня",
    "что по еде",
    "какое питание сегодня",
    "что поедим",
    "проголодалась",
    "посоветуй что поесть",
]


class FoodQuestionIntentTests(unittest.TestCase):
    """A situational nutrition question must not collapse into the menu card."""

    def test_situational_food_questions_route_to_conversation(self):
        for text in SITUATIONAL_QUESTIONS:
            with self.subTest(text=text):
                self.assertEqual(bot.match_intent(text), "food_question")

    def test_generic_menu_requests_keep_food_section_intent(self):
        for text in GENERIC_MENU_REQUESTS:
            with self.subTest(text=text):
                self.assertEqual(bot.match_intent(text), "food")

    def test_adjacent_intents_are_untouched(self):
        expectations = {
            "Какая тренировка сегодня?": "training",
            "Запиши, я съела творог": "logmeal",
            "Сегодня начались месячные": "logperiod",
            "Какое сегодня число?": "current_date",
            "Сколько калорий я съела сегодня?": "diary",
        }
        for text, expected in expectations.items():
            with self.subTest(text=text):
                self.assertEqual(bot.match_intent(text), expected)
        self.assertIsNone(bot.match_intent("Полезно ли кардио"))

    def test_red_flag_food_questions_reach_the_escalation_capable_path(self):
        # The menu card never sees the message text, so it cannot escalate a
        # red-flag symptom. The conversational prompts can: both answer paths
        # are built on llm.SYSTEM, which instructs the model to refer alarming
        # symptoms to a doctor. Pin the routing and that prompt guarantee.
        for text in (
            "сильное кровотечение, что можно есть?",
            "очень болит живот, что поесть?",
            "что есть при обильных месячных",
        ):
            with self.subTest(text=text):
                self.assertEqual(bot.match_intent(text), "food_question")
        self.assertIn("тревожных симптомах", llm.SYSTEM)
        self.assertIn("обильное кровотечение", llm.SYSTEM)
        self.assertIn("гинеколог", llm.SYSTEM)

    def test_escalation_net_appends_doctor_referral_only_when_missing(self):
        question = "сильное кровотечение, что можно есть?"
        bare = "Гречка и говядина помогут восстановить железо."
        guarded = bot.ensure_red_flag_escalation(question, bare)
        self.assertIn("обратись к врачу", guarded)
        self.assertIn("неотложной помощью", guarded)
        # An answer that already refers to a doctor is left untouched.
        referred = "При таком кровотечении сначала обратись к гинекологу."
        self.assertEqual(
            bot.ensure_red_flag_escalation(question, referred), referred
        )
        # A question without red-flag vocabulary never gets the banner.
        self.assertEqual(
            bot.ensure_red_flag_escalation("что есть при тошноте", bare), bare
        )

    def test_food_question_is_not_a_journal_mutation_intent(self):
        # The journal queue must treat the new intent exactly like "food":
        # a question is conversation, not a diary write.
        self.assertNotIn("food_question", bot._JOURNAL_MUTATION_INTENTS)
        for text in SITUATIONAL_QUESTIONS:
            with self.subTest(text=text):
                queued, known = bot._journal_queue_candidate(
                    9999999, text, bot.match_intent(text)
                )
                self.assertFalse(queued)
                self.assertIsNone(known)


class FoodQuestionHandlerTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "food-question.db")
        self.cid = 88001
        bot._activate_user(self.cid)
        bot.upsert(
            self.cid,
            mode="cycle",
            cycle_len=28,
            last_period=(bot.dtoday() - timedelta(days=12)).isoformat(),
            height=168,
            weight=60,
            age=30,
            activity=2,
        )

    def tearDown(self):
        bot.DB = self.old_db
        self.tmp.cleanup()

    def _telegram_env(self, update_id):
        context = SimpleNamespace(
            bot=SimpleNamespace(send_chat_action=mock.AsyncMock())
        )
        update = SimpleNamespace(
            update_id=update_id,
            effective_chat=SimpleNamespace(id=self.cid),
            message=SimpleNamespace(entities=[], reply_text=mock.AsyncMock()),
        )
        return update, context

    def test_telegram_answers_the_question_instead_of_menu_card(self):
        text = "Что есть после анализов?"
        update, context = self._telegram_env(95001)
        with (
            mock.patch.object(
                bot, "resolve_semantic_journal_action",
                new=mock.AsyncMock(return_value=None),
            ),
            mock.patch.object(
                bot, "dispatch_intent",
                new=mock.AsyncMock(
                    side_effect=AssertionError("question fell into a section card")
                ),
            ),
            mock.patch.object(
                bot, "think_llm",
                new=mock.AsyncMock(return_value="Ответ по существу вопроса."),
            ) as think,
            mock.patch.object(bot, "send_answer", new=mock.AsyncMock()) as sender,
        ):
            asyncio.run(bot.handle_text(update, context, text))
        self.assertEqual(think.await_count, 1)
        # answer_question receives the user's original wording, not a template.
        self.assertEqual(think.await_args.args[4], text)
        self.assertEqual(sender.await_count, 1)

    def test_telegram_keeps_menu_card_for_generic_requests(self):
        text = "покажи меню"
        update, context = self._telegram_env(95002)
        with (
            mock.patch.object(
                bot, "resolve_semantic_journal_action",
                new=mock.AsyncMock(return_value=None),
            ),
            mock.patch.object(
                bot, "dispatch_intent", new=mock.AsyncMock()
            ) as dispatch,
            mock.patch.object(
                bot, "think_llm",
                new=mock.AsyncMock(
                    side_effect=AssertionError("menu request left the section path")
                ),
            ),
        ):
            asyncio.run(bot.handle_text(update, context, text))
        self.assertEqual(dispatch.await_count, 1)
        self.assertEqual(dispatch.await_args.args[4], "food")

    def test_telegram_male_profile_gets_answer_to_the_question(self):
        male_cid = 88002
        bot._activate_user(male_cid)
        bot.upsert(male_cid, mode="male", height=182, weight=80, age=34)
        text = "что есть перед тренировкой"
        context = SimpleNamespace(
            bot=SimpleNamespace(send_chat_action=mock.AsyncMock())
        )
        update = SimpleNamespace(
            update_id=95003,
            effective_chat=SimpleNamespace(id=male_cid),
            message=SimpleNamespace(entities=[], reply_text=mock.AsyncMock()),
        )
        with (
            mock.patch.object(
                bot, "resolve_semantic_journal_action",
                new=mock.AsyncMock(return_value=None),
            ),
            mock.patch.object(
                bot, "dispatch_intent",
                new=mock.AsyncMock(
                    side_effect=AssertionError("question fell into a section card")
                ),
            ),
            mock.patch.object(
                bot, "think_llm",
                new=mock.AsyncMock(return_value="Ответ по существу вопроса."),
            ) as think,
            mock.patch.object(bot, "send_answer", new=mock.AsyncMock()),
        ):
            asyncio.run(bot.handle_text(update, context, text))
        self.assertEqual(think.await_count, 1)
        # general_answer path: the question is the sixth positional argument.
        self.assertEqual(think.await_args.args[5], text)

    def test_journal_resolution_wins_over_food_question_clearing(self):
        # A mixed message can classify as food_question by regex while the
        # semantic router recognises a diary write in it. The journal intent
        # must survive the food_question fallthrough and reach dispatch.
        text = "съела суп, и что есть при тошноте?"
        self.assertEqual(bot.match_intent(text), "food_question")
        update, context = self._telegram_env(95004)
        journal = {"intent": "logmeal", "food_text": "суп"}
        with (
            mock.patch.object(
                bot, "resolve_semantic_journal_action",
                new=mock.AsyncMock(return_value=journal),
            ),
            mock.patch.object(
                bot, "dispatch_intent", new=mock.AsyncMock()
            ) as dispatch,
            mock.patch.object(
                bot, "think_llm",
                new=mock.AsyncMock(
                    side_effect=AssertionError("journal intent lost to QA path")
                ),
            ),
        ):
            asyncio.run(bot.handle_text(update, context, text))
        self.assertEqual(dispatch.await_count, 1)
        self.assertEqual(dispatch.await_args.args[4], "logmeal")
        self.assertIs(dispatch.await_args.kwargs.get("journal"), journal)

    def test_webapp_chat_answers_the_original_wording(self):
        text = "Что есть чтобы снизить боль?"
        with (
            mock.patch.object(
                bot, "_agent_answer", new=mock.AsyncMock(return_value=None)
            ),
            mock.patch.object(
                bot, "resolve_semantic_journal_action",
                new=mock.AsyncMock(return_value=None),
            ),
            mock.patch.object(
                bot, "llm_to_thread",
                new=mock.AsyncMock(return_value="Ответ по существу вопроса."),
            ) as llm,
            mock.patch.object(bot.L, "followups", return_value=[]),
            mock.patch.object(
                bot, "_memory_learn", new=mock.AsyncMock(return_value=None)
            ),
        ):
            result = asyncio.run(
                bot._chat_reply(self.cid, bot.row(self.cid), text)
            )
        self.assertEqual(llm.await_count, 1)
        question = llm.await_args.args[4]
        self.assertIn("снизить боль", question)
        self.assertNotIn("Дай конкретные продукты", question)
        self.assertIn("Ответ по существу вопроса.", result["answer"])

    def test_telegram_reply_carries_escalation_when_model_drops_it(self):
        text = "сильное кровотечение, что можно есть?"
        update, context = self._telegram_env(95005)
        context.bot.send_message = mock.AsyncMock()
        with (
            mock.patch.object(
                bot, "resolve_semantic_journal_action",
                new=mock.AsyncMock(return_value=None),
            ),
            mock.patch.object(
                bot, "think_llm",
                new=mock.AsyncMock(
                    return_value="Гречка и говядина помогут восстановить железо.\n"
                                 "СЛЕДУЮЩИЕ: Что ещё добавить? ;; Как спать лучше?"
                ),
            ),
            mock.patch.object(bot.L, "followups", return_value=[]),
            mock.patch.object(bot, "RICH_OK", False),
        ):
            asyncio.run(bot.handle_text(update, context, text))
        sent = "\n".join(
            str(call.args[1]) for call in context.bot.send_message.await_args_list
        )
        self.assertIn("обратись к", sent)
        self.assertIn("врачу", sent)

    def test_webapp_reply_carries_escalation_when_model_drops_it(self):
        text = "сильное кровотечение, что можно есть?"
        with (
            mock.patch.object(
                bot, "_agent_answer", new=mock.AsyncMock(return_value=None)
            ),
            mock.patch.object(
                bot, "resolve_semantic_journal_action",
                new=mock.AsyncMock(return_value=None),
            ),
            mock.patch.object(
                bot, "llm_to_thread",
                new=mock.AsyncMock(
                    return_value="Гречка и говядина помогут восстановить железо."
                ),
            ),
            mock.patch.object(bot.L, "followups", return_value=[]),
            mock.patch.object(
                bot, "_memory_learn", new=mock.AsyncMock(return_value=None)
            ),
        ):
            result = asyncio.run(
                bot._chat_reply(self.cid, bot.row(self.cid), text)
            )
        self.assertIn("обратись к врачу", result["answer"])

    def test_webapp_reply_keeps_model_referral_without_duplicate_banner(self):
        text = "сильное кровотечение, что можно есть?"
        with (
            mock.patch.object(
                bot, "_agent_answer", new=mock.AsyncMock(return_value=None)
            ),
            mock.patch.object(
                bot, "resolve_semantic_journal_action",
                new=mock.AsyncMock(return_value=None),
            ),
            mock.patch.object(
                bot, "llm_to_thread",
                new=mock.AsyncMock(
                    return_value="При таком кровотечении сначала обратись к гинекологу, "
                                 "еда вторична."
                ),
            ),
            mock.patch.object(bot.L, "followups", return_value=[]),
            mock.patch.object(
                bot, "_memory_learn", new=mock.AsyncMock(return_value=None)
            ),
        ):
            result = asyncio.run(
                bot._chat_reply(self.cid, bot.row(self.cid), text)
            )
        self.assertIn("гинеколог", result["answer"])
        self.assertNotIn("неотложной помощью", result["answer"])

    def test_webapp_chat_keeps_menu_template_for_generic_requests(self):
        text = "что мне есть сегодня"
        with (
            mock.patch.object(
                bot, "_agent_answer", new=mock.AsyncMock(return_value=None)
            ),
            mock.patch.object(
                bot, "resolve_semantic_journal_action",
                new=mock.AsyncMock(return_value=None),
            ),
            mock.patch.object(
                bot, "llm_to_thread",
                new=mock.AsyncMock(return_value="Меню на день."),
            ) as llm,
            mock.patch.object(bot.L, "followups", return_value=[]),
            mock.patch.object(
                bot, "_memory_learn", new=mock.AsyncMock(return_value=None)
            ),
        ):
            asyncio.run(bot._chat_reply(self.cid, bot.row(self.cid), text))
        self.assertEqual(llm.await_count, 1)
        self.assertIn("Дай конкретные продукты", llm.await_args.args[4])


if __name__ == "__main__":
    unittest.main()
