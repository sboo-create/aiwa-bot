import asyncio
import os
import tempfile
import unittest
from datetime import timedelta
from pathlib import Path
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot
import llm


class ChatJournalActionTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "chat-actions.db")
        self.cid = 701
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

    def test_intent_requires_explicit_write_for_food_and_workout(self):
        positives = {
            "Я съела творог, запиши": "logmeal",
            "Запиши, я съела 200 г творога": "logmeal",
            "Добавь на завтрак овсянку": "logmeal",
            "Я бегала 30 минут, запиши тренировку": "logworkout",
            "Была на йоге, внеси тренировку": "logworkout",
            "Сегодня начались месячные": "logperiod",
            "Месячные закончились сегодня": "period_end",
        }
        for text, expected in positives.items():
            with self.subTest(text=text):
                self.assertEqual(bot.match_intent(text), expected)

        negatives = [
            "Можно ли есть творог?",
            "Я съела творог",
            "Какая тренировка сегодня?",
            "Не записывай тренировку",
            "Как отметить месячные?",
            "Когда закончатся месячные?",
        ]
        self.assertIsNone(bot.match_intent(negatives[0]))
        self.assertIsNone(bot.match_intent(negatives[1]))
        self.assertEqual(bot.match_intent(negatives[2]), "training")
        self.assertNotEqual(bot.match_intent(negatives[3]), "logworkout")
        self.assertNotEqual(bot.match_intent(negatives[4]), "logperiod")
        self.assertNotEqual(bot.match_intent(negatives[5]), "period_end")

        guarded = [
            "Я не съела творог, запиши",
            "Запиши рецепт: на завтрак овсянка",
            "Запиши мой обед: встреча с Соней",
            "Сегодня начались месячные?",
            "Кажется, сегодня начались месячные",
            "У подруги сегодня начались месячные",
            "Я сказала подруге: «съела творог, запиши»",
            "Не отмечай: месячные начались",
            "Месячные не закончились",
            "Отметь месячные, они не начались",
            "Дочка съела творог, запиши",
            "Подруга бегала 30 минут, запиши тренировку",
            "Моя дочь сегодня начала месячные, запиши",
            "Тренировки не было, запиши",
            "Не было тренировки, запиши",
            "Месячных не было, отметь",
            "Не было месячных, отметь",
            "Если месячные начались, отметь",
            "Если я съела творог, запиши",
            "У Сони начались месячные, запиши",
            "Соня съела творог, запиши",
            "Соня бегала 30 минут, запиши тренировку",
            "Мне сказали: съела творог, запиши",
            "Говорят, месячные начались, отметь",
            "Вчера Соня съела творог, запиши",
            "Сегодня Соня бегала, запиши тренировку",
            "Пожалуйста, Соня съела творог, запиши",
            "А Соня съела творог, запиши",
        ]
        for text in guarded:
            with self.subTest(guarded=text):
                self.assertNotIn(bot.match_intent(text), ("logmeal", "logworkout", "logperiod", "period_end"))

        self.assertEqual(bot.match_intent("Я съела творог после тренировки, запиши"), "logmeal")
        self.assertEqual(bot.match_intent("Как обычно, я съела творог, запиши"), "logmeal")
        self.assertEqual(bot.match_intent("Я скушала творог, запиши"), "logmeal")
        self.assertEqual(bot.match_intent("Можешь записать, я съела творог"), "logmeal")
        self.assertEqual(bot.extract_food_log_text("Можешь записать, я съела творог"), "творог")

    def test_food_phrase_is_cleaned_saved_and_visible_to_app(self):
        parsed = {
            "title": "Творог 5%",
            "grams": 200,
            "kcal": 242,
            "protein": 34,
            "fat": 10,
            "carbs": 4,
            "confidence": "medium",
        }
        with mock.patch.object(bot.L, "analyze_food_text", return_value=parsed) as analyze:
            result = asyncio.run(
                bot.log_food_action(
                    self.cid,
                    bot.row(self.cid),
                    "Я съела 200 г творога 5%, запиши",
                    mutation_key=bot.chat_mutation_key("telegram", "9001"),
                )
            )

        self.assertTrue(result["ok"])
        self.assertEqual(result["mutation"]["kind"], "food")
        self.assertIn("Порция и КБЖУ оценочные", result["text"])
        analyze.assert_called_once()
        self.assertEqual(analyze.call_args.args[0], "200 г творога 5%")
        diary = bot.diary_payload(self.cid)
        self.assertEqual(len(diary["meals"]), 1)
        self.assertEqual(diary["meals"][0]["title"], "Творог 5%")

    def test_food_mutation_key_is_idempotent(self):
        parsed = {"title": "Творог", "grams": 150, "kcal": 180, "protein": 25, "fat": 7, "carbs": 4}
        key = bot.chat_mutation_key("telegram", "same-update")
        with mock.patch.object(bot.L, "analyze_food_text", return_value=parsed) as analyze:
            first = asyncio.run(bot.log_food_action(self.cid, bot.row(self.cid), "съела творог, запиши", mutation_key=key))
            second = asyncio.run(bot.log_food_action(self.cid, bot.row(self.cid), "съела творог, запиши", mutation_key=key))
        self.assertEqual(first["record_id"], second["record_id"])
        self.assertEqual(len(bot.meals_of(self.cid)), 1)
        analyze.assert_called_once()

    def test_mutation_replay_uses_canonical_payload_and_respects_undo(self):
        key = bot.chat_mutation_key("webchat", "same-request")
        first_food = {"title": "Творог", "grams": 150, "kcal": 180, "protein": 25, "fat": 7, "carbs": 4}
        second_food = {"title": "Суп", "grams": 300, "kcal": 200, "protein": 8, "fat": 5, "carbs": 25}
        with mock.patch.object(bot.L, "analyze_food_text", side_effect=[first_food, second_food]):
            first = asyncio.run(bot.log_food_action(self.cid, bot.row(self.cid), "съела творог, запиши", mutation_key=key))
            mismatch = asyncio.run(bot.log_food_action(self.cid, bot.row(self.cid), "съела суп, запиши", mutation_key=key))
        self.assertTrue(first["ok"])
        self.assertFalse(mismatch["ok"])
        self.assertEqual([m["title"] for m in bot.meals_of(self.cid)], ["Творог"])

        bot.meal_del(self.cid, first["record_id"])
        conn = bot.db()
        receipt_json = conn.execute(
            "SELECT result_json FROM chat_mutations WHERE chat_id=? AND mutation_key=?",
            (self.cid, key),
        ).fetchone()[0]
        conn.close()
        self.assertIsNone(receipt_json)
        with mock.patch.object(bot.L, "analyze_food_text", return_value=first_food):
            replay = asyncio.run(bot.log_food_action(self.cid, bot.row(self.cid), "съела творог, запиши", mutation_key=key))
        self.assertFalse(replay["ok"])
        self.assertIn("отменена", replay["text"])
        self.assertEqual(bot.meals_of(self.cid), [])

    def test_workout_is_saved_without_inventing_duration(self):
        parsed = {
            "type": "Йога",
            "duration_minutes": None,
            "rpe": "лёгкая",
            "items": [],
            "note": "",
        }
        with mock.patch.object(bot.L, "analyze_workout_text", return_value=parsed):
            result = asyncio.run(
                bot.log_workout_action(
                    self.cid,
                    bot.row(self.cid),
                    "Была на йоге, запиши тренировку",
                    mutation_key=bot.chat_mutation_key("telegram", "9002"),
                )
            )
        self.assertTrue(result["ok"])
        workout = bot.workouts_of(self.cid)[0]
        self.assertEqual(workout["type"], "Йога")
        self.assertEqual(workout["duration"], "")
        self.assertEqual(workout["kcal"], 0)
        self.assertEqual(result["mutation"]["kind"], "workout")

    def test_workout_falls_back_to_deterministic_parser(self):
        with mock.patch.object(bot.L, "analyze_workout_text", return_value=None):
            result = asyncio.run(
                bot.log_workout_action(self.cid, bot.row(self.cid), "Бегала 30 минут, запиши тренировку")
            )
        self.assertTrue(result["ok"])
        workout = bot.workouts_of(self.cid)[0]
        self.assertEqual(workout["type"], "Кардио")
        self.assertEqual(workout["duration"], "30 мин")
        self.assertGreater(workout["kcal"], 0)

    def test_pool_is_not_misclassified_as_walking(self):
        parsed = bot.basic_workout_from_text("Ходила в бассейн 45 минут")
        self.assertEqual(parsed["type"], "Плавание")
        self.assertLess(
            bot.workout_calories("Растяжка", "30 мин", "средняя", 60),
            bot.workout_calories("Силовая", "30 мин", "средняя", 60),
        )

    def test_stale_async_workout_cannot_write_after_delete_and_reactivate(self):
        old_generation = bot._user_generation(self.cid)

        def recreate_during_analysis(*_args, **_kwargs):
            bot.del_user(self.cid)
            bot._activate_user(self.cid)
            bot.upsert(self.cid, mode="none")
            return {"type": "Кардио", "duration_minutes": 30, "items": []}

        with mock.patch.object(bot.L, "analyze_workout_text", side_effect=recreate_during_analysis):
            result = asyncio.run(
                bot.log_workout_action(
                    self.cid,
                    {"mode": "cycle"},
                    "Бегала 30 минут, запиши тренировку",
                    user_generation=old_generation,
                )
            )
        self.assertFalse(result["ok"])
        self.assertEqual(bot.workouts_of(self.cid), [])

    def test_period_start_updates_shared_calendar_and_resets_old_end(self):
        bot.upsert(self.cid, period_end=bot.dtoday().isoformat(), period_len=5)
        result = asyncio.run(
            bot.log_period_action(self.cid, bot.row(self.cid), "Сегодня начались месячные")
        )
        self.assertTrue(result["ok"])
        current = bot.row(self.cid)
        self.assertEqual(current["last_period"], bot.dtoday().isoformat())
        self.assertIsNone(current["period_end"])
        self.assertIsNone(current["period_len"])
        self.assertIn(bot.dtoday().isoformat(), bot.cycles_of(self.cid))

        repeated = asyncio.run(
            bot.log_period_action(self.cid, bot.row(self.cid), "Сегодня начались месячные")
        )
        self.assertTrue(repeated["ok"])
        self.assertIn("уже отмечено", repeated["text"])
        self.assertEqual(bot.cycles_of(self.cid).count(bot.dtoday().isoformat()), 1)

    def test_period_does_not_silently_leave_pregnancy_mode(self):
        bot.upsert(self.cid, mode="preg")
        result = asyncio.run(
            bot.log_period_action(self.cid, bot.row(self.cid), "Сегодня начались месячные")
        )
        self.assertFalse(result["ok"])
        self.assertEqual(bot.row(self.cid)["mode"], "preg")

    def test_period_rechecks_current_mode_and_rejects_future_date_without_year(self):
        stale_user = bot.row(self.cid)
        bot.upsert(self.cid, mode="preg")
        result = asyncio.run(
            bot.log_period_action(self.cid, stale_user, "Сегодня начались месячные")
        )
        self.assertFalse(result["ok"])
        self.assertEqual(bot.row(self.cid)["mode"], "preg")

        bot.upsert(self.cid, mode="cycle")
        future = bot.dtoday() + timedelta(days=5)
        before = set(bot.cycles_of(self.cid))
        text = f"Месячные начались {future.day} " + (
            "января февраля марта апреля мая июня июля августа сентября октября ноября декабря".split()[future.month - 1]
        ) + ", запиши"
        result = asyncio.run(bot.log_period_action(self.cid, bot.row(self.cid), text))
        self.assertFalse(result["ok"])
        self.assertEqual(set(bot.cycles_of(self.cid)), before)

    def test_period_spacing_is_symmetric(self):
        future_existing = (bot.dtoday() - timedelta(days=4)).isoformat()
        older_candidate = (bot.dtoday() - timedelta(days=9))
        bot.cyc_add(self.cid, future_existing)
        result = asyncio.run(
            bot.log_period_action(
                self.cid,
                bot.row(self.cid),
                f"Месячные начались {older_candidate.strftime('%d.%m.%Y')}, запиши",
            )
        )
        self.assertFalse(result["ok"])
        self.assertNotIn(older_candidate.isoformat(), bot.cycles_of(self.cid))

    def test_period_request_id_is_bound_to_action_and_payload(self):
        key = bot.chat_mutation_key("webchat", "period-request")
        first = asyncio.run(
            bot.log_period_action(
                self.cid, bot.row(self.cid), "Сегодня начались месячные", mutation_key=key,
            )
        )
        self.assertTrue(first["ok"])
        mismatch = asyncio.run(
            bot.log_period_end_action(
                self.cid, bot.row(self.cid), "Месячные закончились сегодня", mutation_key=key,
            )
        )
        self.assertFalse(mismatch["ok"])
        self.assertIn("идентификатор", mismatch["text"])

    def test_period_end_is_shared_with_web_chat(self):
        start = (bot.dtoday() - timedelta(days=4)).isoformat()
        bot.db_mark_period(self.cid, start)
        reply = asyncio.run(
            bot._chat_reply(self.cid, bot.row(self.cid), "Месячные закончились сегодня")
        )
        self.assertEqual(reply["mutation"]["kind"], "period")
        self.assertEqual(bot.row(self.cid)["period_len"], 5)
        self.assertEqual(bot.periods_of(self.cid)[-1]["end"], bot.dtoday().isoformat())

    def test_web_chat_returns_structured_mutation_for_cache_invalidation(self):
        parsed = {"title": "Творог", "grams": 150, "kcal": 180, "protein": 25, "fat": 7, "carbs": 4}
        with mock.patch.object(bot.L, "analyze_food_text", return_value=parsed):
            reply = asyncio.run(
                bot._chat_reply(
                    self.cid,
                    bot.row(self.cid),
                    "Я съела творог, запиши",
                    mutation_key=bot.chat_mutation_key("webchat", "request-1"),
                )
            )
        self.assertEqual(reply["mutation"]["kind"], "food")
        self.assertIn("уже видна", reply["answer"])

    def test_frontend_invalidates_cached_sections_after_chat_mutation(self):
        for path in (Path("webapp/index.html"), Path("aiwa_webapp.html")):
            source = path.read_text(encoding="utf-8")
            with self.subTest(path=path):
                self.assertIn("async function applyChatMutation", source)
                self.assertIn("loadedFood=false;DIARY=null", source)
                self.assertIn("loadedTrain=false", source)
                self.assertIn("request_id:chatRequestId()", source)
                self.assertIn("visibilitychange", source)

    def test_web_mutation_requires_request_id(self):
        parsed = {"title": "Творог", "grams": 150, "kcal": 180, "protein": 25, "fat": 7, "carbs": 4}
        with mock.patch.object(bot.L, "analyze_food_text", return_value=parsed) as analyze:
            reply = asyncio.run(
                bot._chat_reply(
                    self.cid,
                    bot.row(self.cid),
                    "Я съела творог, запиши",
                    require_mutation_key=True,
                )
            )
        self.assertIn("идентификатора", reply["answer"])
        analyze.assert_not_called()
        self.assertEqual(bot.meals_of(self.cid), [])

    def test_food_normalization_bounds_untrusted_model_values(self):
        record = bot.normalize_food({
            "title": "Тест",
            "grams": 999999,
            "kcal": -5,
            "protein": 999999,
            "fat": -10,
            "carbs": 999999,
            "items": [{"name": str(i), "kcal": 1} for i in range(100)],
        })
        self.assertEqual(record["grams"], 5000)
        self.assertEqual(record["kcal"], 0)
        self.assertEqual(record["protein"], 1000)
        self.assertEqual(record["fat"], 0)
        self.assertEqual(record["carbs"], 1000)
        self.assertEqual(len(record["items"]), 24)


class WorkoutParserTests(unittest.TestCase):
    def test_llm_workout_parser_accepts_only_json_object(self):
        payload = '{"type":"Кардио","duration_minutes":30,"rpe":"средняя","items":[],"note":""}'
        with mock.patch.object(llm, "_call", return_value=payload):
            parsed = llm.analyze_workout_text("Бегала 30 минут")
        self.assertEqual(parsed["type"], "Кардио")
        self.assertEqual(parsed["duration_minutes"], 30)

        with mock.patch.object(llm, "_call", return_value="не json"):
            self.assertIsNone(llm.analyze_workout_text("Что-то делала"))
