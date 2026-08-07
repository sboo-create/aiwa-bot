"""Бережная реакция на крайние значения ИМТ и нижняя граница целевых калорий.

Живой кейс со staging: 166 см / 40 кг / 21 год (ИМТ 14.5) сохранялся молча, а
Айва считала цель 2021 ккал и планировала меню под неё. Здесь зафиксировано,
что профиль по-прежнему сохраняется без блокировок, но пользователь слышит
мягкое предложение обсудить питание с врачом, а цель не опускается ниже
базового обмена.
"""

import asyncio
import json
import os
import tempfile
import unittest
from types import SimpleNamespace
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


# Реплика не должна протаскивать женский род или цикловую лексику в male-режим:
# на это уже жаловались бета-тестеры.
GENDERED = ("набрала", "похудела", "указала", "ты стала", "беременна")
CYCLE_WORDS = ("цикл", "месячн", "менструац", "овуляц", "пмс")


class FakeJsonRequest:
    def __init__(self, body):
        self.body = body

    async def json(self):
        return self.body


class BmiHelpersTests(unittest.TestCase):
    def test_bmi_matches_the_reported_staging_case(self):
        self.assertEqual(bot.bmi_of(166, 40), 14.5)
        self.assertEqual(bot.bmi_of(170, 63), 21.8)
        self.assertIsNone(bot.bmi_of(0, 60))
        self.assertIsNone(bot.bmi_of(None, 60))
        self.assertIsNone(bot.bmi_of("рост", 60))

    def test_note_appears_only_outside_the_usual_range(self):
        self.assertEqual(bot.bmi_note(166, 40, 21, "cycle"), bot.BMI_NOTE_LOW)
        self.assertEqual(bot.bmi_note(160, 110, 35, "cycle"), bot.BMI_NOTE_HIGH)
        self.assertIsNone(bot.bmi_note(168, 60, 30, "cycle"))
        # Ровно на границах молчим: пороги строгие, 16.0 и 40.0 — ещё не повод.
        self.assertIsNone(bot.bmi_note(200, 64, 30, "cycle"))

    def test_pregnancy_never_gets_a_bmi_comment(self):
        """Прибавка веса в беременности ожидаема, взрослые пороги к ней неприменимы."""
        self.assertIsNone(bot.bmi_note(166, 40, 21, "preg"))
        self.assertIsNone(bot.bmi_note(160, 110, 35, "preg"))

    def test_minors_get_no_comment_because_thresholds_do_not_apply(self):
        """До 18 лет ИМТ читается по перцентилям ВОЗ, а не по порогам 16/40."""
        self.assertIsNone(bot.bmi_note(166, 40, 15, "cycle"))
        self.assertIsNone(bot.bmi_note(160, 110, 17, "cycle"))
        self.assertEqual(bot.bmi_note(166, 40, 18, "cycle"), bot.BMI_NOTE_LOW)

    def test_note_wording_is_safe_for_every_mode(self):
        for note in (bot.BMI_NOTE_LOW, bot.BMI_NOTE_HIGH):
            low = note.lower()
            self.assertNotIn("диагноз", low.replace("не диагноз", ""))
            for token in GENDERED + CYCLE_WORDS:
                self.assertNotIn(token, low)
            self.assertIn("врач", low)

    def test_other_modes_still_get_the_note(self):
        for mode in ("cycle", "male", "meno", "irregular", "none", "fit"):
            with self.subTest(mode=mode):
                self.assertEqual(bot.bmi_note(166, 40, 21, mode), bot.BMI_NOTE_LOW)


class KcalFloorTests(unittest.TestCase):
    def test_floor_is_the_common_minimum_at_healthy_weight(self):
        """Обычное похудение не трогаем: дефицит ниже базового обмена — рабочая практика."""
        self.assertEqual(bot.kcal_floor(165, 65, 32), bot.KCAL_FLOOR_FEMALE)
        self.assertEqual(bot.kcal_floor(181, 82, 41, male=True), bot.KCAL_FLOOR_MALE)
        # Цель 1300 при базовом обмене 1360 остаётся как поставила пользовательница.
        self.assertGreater(round(bot.calc_bmr(165, 65, 32)), 1300)
        self.assertEqual(bot.profile_kcal({"height": 165, "weight": 65, "age": 32,
                                           "activity": 3, "kcal_goal": 1300,
                                           "male": False})[0], 1300)

    def test_underweight_floor_rises_to_the_basal_metabolic_rate(self):
        """При недоборе веса дефицит не планируем вовсе."""
        self.assertLess(bot.bmi_of(175, 52), bot.BMI_UNDERWEIGHT)
        self.assertEqual(bot.kcal_floor(175, 52, 25), round(bot.calc_bmr(175, 52, 25)))
        self.assertGreater(bot.kcal_floor(175, 52, 25), bot.KCAL_FLOOR_FEMALE)

    def test_floor_never_drops_below_the_common_minimum(self):
        # Базовый обмен здесь ниже 1200, но опускаться за общий минимум нельзя.
        self.assertEqual(bot.kcal_floor(166, 40, 21), bot.KCAL_FLOOR_FEMALE)
        self.assertEqual(bot.kcal_floor(121, 31, 79), bot.KCAL_FLOOR_FEMALE)
        self.assertEqual(bot.kcal_floor(None, None, None), bot.KCAL_FLOOR_FEMALE)

    def test_manual_starvation_goal_is_lifted_on_read(self):
        """Цели по 800 ккал уже лежат в базе с тех пор, когда это была граница."""
        profile = {"height": 166, "weight": 40, "age": 21, "activity": 4,
                   "kcal_goal": 800, "male": False}
        self.assertEqual(bot.profile_kcal(profile)[0], bot.KCAL_FLOOR_FEMALE)

    def test_reasonable_goal_and_plain_formula_are_untouched(self):
        profile = {"height": 166, "weight": 40, "age": 21, "activity": 4,
                   "kcal_goal": None, "male": False}
        # Ровно та цифра, которую показал живой тест на staging.
        self.assertEqual(bot.profile_kcal(profile)[0], 2021)
        self.assertEqual(bot.profile_kcal(dict(profile, kcal_goal=1800))[0], 1800)

    def test_lifted_goal_recomputes_macros_from_the_lifted_number(self):
        profile = {"height": 166, "weight": 40, "age": 21, "activity": 4,
                   "kcal_goal": 800, "male": False}
        kcal, prot, fat, carbs = bot.profile_kcal(profile)
        self.assertEqual(fat, round(kcal * 0.3 / 9))
        self.assertEqual(carbs, round(max(0, kcal - prot * 4 - fat * 9) / 4))


class _BotCase(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        self.old_app = bot.BOT_APP
        bot.DB = os.path.join(self.tmp.name, "bmi-safety.db")
        bot.BOT_APP = None
        self.cid = 7711
        bot._activate_user(self.cid)
        bot.CHAT_HIST.clear()
        bot._TODAY_CACHE.clear()

    def tearDown(self):
        bot.CHAT_HIST.clear()
        bot._TODAY_CACHE.clear()
        bot.BOT_APP = self.old_app
        bot.DB = self.old_db
        self.tmp.cleanup()

    def _env(self):
        context = SimpleNamespace(bot=SimpleNamespace(send_chat_action=mock.AsyncMock()))
        update = SimpleNamespace(
            update_id=1,
            effective_chat=SimpleNamespace(id=self.cid),
            message=SimpleNamespace(entities=[], reply_text=mock.AsyncMock()),
        )
        return update, context

    def _reply(self, update):
        self.assertTrue(update.message.reply_text.await_count)
        return update.message.reply_text.await_args.args[0]


class OnboardingProfileTests(_BotCase):
    def test_onboarding_says_it_gently_and_still_saves_the_profile(self):
        bot.upsert(self.cid, mode="cycle", last_period=bot.dtoday().isoformat(),
                   cycle_len=28, state="await_profile")
        update, context = self._env()

        asyncio.run(bot.handle_text(update, context, "166 40 21"))

        reply = self._reply(update)
        self.assertIn(bot.BMI_NOTE_LOW, reply)
        # Онбординг не прерывается: следующий шаг по-прежнему спрашивается.
        self.assertIn("уровень физической активности", reply)
        user = bot.row(self.cid)
        self.assertEqual(user["height"], 166)
        self.assertEqual(user["weight"], 40)
        self.assertEqual(user["age"], 21)
        self.assertEqual(user["state"], "await_activity")

    def test_ordinary_profile_gets_no_health_note(self):
        bot.upsert(self.cid, mode="cycle", last_period=bot.dtoday().isoformat(),
                   cycle_len=28, state="await_profile")
        update, context = self._env()

        asyncio.run(bot.handle_text(update, context, "168 60 30"))

        reply = self._reply(update)
        self.assertNotIn("врач", reply)
        self.assertIn("уровень физической активности", reply)

    def test_pregnancy_onboarding_stays_silent_about_bmi(self):
        bot.upsert(self.cid, mode="preg", last_period=bot.dtoday().isoformat(),
                   cycle_len=28, state="await_profile")
        update, context = self._env()

        asyncio.run(bot.handle_text(update, context, "166 40 21"))

        reply = self._reply(update)
        self.assertNotIn(bot.BMI_NOTE_LOW, reply)
        self.assertEqual(bot.row(self.cid)["weight"], 40)


class ProfileEditTests(_BotCase):
    def test_profile_edit_appends_the_note_to_the_confirmation(self):
        bot.upsert(self.cid, mode="cycle", last_period=bot.dtoday().isoformat(),
                   cycle_len=28, height=168, weight=60, age=30,
                   state="await_profile_edit")
        update, context = self._env()

        asyncio.run(bot.handle_text(update, context, "166 40 21"))

        reply = self._reply(update)
        self.assertIn("Обновила: рост 166 см, вес 40 кг, возраст 21", reply)
        self.assertIn(bot.BMI_NOTE_LOW, reply)
        self.assertEqual(bot.row(self.cid)["weight"], 40)
        self.assertIsNone(bot.row(self.cid)["state"])

    def test_minor_editing_profile_hears_nothing_about_bmi(self):
        bot.upsert(self.cid, mode="cycle", last_period=bot.dtoday().isoformat(),
                   cycle_len=28, height=168, weight=60, age=30,
                   state="await_profile_edit")
        update, context = self._env()

        asyncio.run(bot.handle_text(update, context, "166 40 15"))

        reply = self._reply(update)
        self.assertNotIn("врач", reply)
        self.assertEqual(bot.row(self.cid)["age"], 15)


class WebProfileApiTests(_BotCase):
    def _save(self, body):
        with mock.patch.object(bot, "_verify_init", return_value=self.cid):
            response = asyncio.run(bot._api_profile(FakeJsonRequest(body)))
        return response, json.loads(response.text)

    def test_mini_app_receives_the_note_and_still_saves(self):
        bot.upsert(self.cid, mode="cycle", last_period=bot.dtoday().isoformat(),
                   cycle_len=28, height=168, weight=60, age=30)

        response, payload = self._save({"height": "166", "weight": "40", "age": "21"})

        self.assertEqual(response.status, 200)
        self.assertTrue(payload["ok"])
        self.assertEqual(payload["bmi_note"], bot.BMI_NOTE_LOW)
        self.assertEqual(bot.row(self.cid)["weight"], 40)

    def test_ordinary_profile_carries_an_empty_note(self):
        bot.upsert(self.cid, mode="cycle", last_period=bot.dtoday().isoformat(),
                   cycle_len=28, height=168, weight=60, age=30)

        _, payload = self._save({"height": "170", "weight": "63", "age": "32"})

        self.assertIsNone(payload["bmi_note"])

    def test_pregnancy_mini_app_save_is_silent(self):
        bot.upsert(self.cid, mode="preg", last_period=bot.dtoday().isoformat(),
                   height=168, weight=60, age=30)

        _, payload = self._save({"height": "166", "weight": "40", "age": "21"})

        self.assertIsNone(payload["bmi_note"])

    def test_goal_saved_with_the_profile_is_lifted_to_the_floor(self):
        bot.upsert(self.cid, mode="cycle", last_period=bot.dtoday().isoformat(),
                   cycle_len=28, height=168, weight=60, age=30)

        _, payload = self._save({
            "height": "166", "weight": "40", "age": "21", "kcal_goal": 800,
        })

        # Граница считается по числам из этого же запроса, а не по старым.
        self.assertEqual(response_goal := bot.row(self.cid)["kcal_goal"],
                         bot.kcal_floor(166, 40, 21))
        self.assertEqual(response_goal, bot.KCAL_FLOOR_FEMALE)
        self.assertEqual(payload["kcal_base"], response_goal)


class PrefsGoalFloorTests(_BotCase):
    def _prefs(self, body):
        with mock.patch.object(bot, "_verify_init", return_value=self.cid):
            response = asyncio.run(bot._api_prefs(FakeJsonRequest(body)))
        return response, json.loads(response.text)

    def test_starvation_goal_is_lifted_and_explained(self):
        bot.upsert(self.cid, mode="cycle", last_period=bot.dtoday().isoformat(),
                   cycle_len=28, height=166, weight=40, age=21)

        response, payload = self._prefs({"diet_note": "", "kcal_goal": 800})

        self.assertEqual(response.status, 200)
        floor = bot.KCAL_FLOOR_FEMALE
        self.assertEqual(payload["kcal_goal"], floor)
        self.assertEqual(bot.row(self.cid)["kcal_goal"], floor)
        self.assertIn(str(floor), payload["kcal_note"])
        self.assertIn("врач", payload["kcal_note"])

    def test_goal_above_the_floor_is_kept_verbatim(self):
        bot.upsert(self.cid, mode="cycle", last_period=bot.dtoday().isoformat(),
                   cycle_len=28, height=166, weight=40, age=21)

        _, payload = self._prefs({"diet_note": "", "kcal_goal": 1800})

        self.assertEqual(payload["kcal_goal"], 1800)
        self.assertIsNone(payload["kcal_note"])

    def test_clearing_the_goal_still_works(self):
        bot.upsert(self.cid, mode="cycle", last_period=bot.dtoday().isoformat(),
                   cycle_len=28, height=166, weight=40, age=21, kcal_goal=1800)

        _, payload = self._prefs({"diet_note": "", "kcal_goal": ""})

        self.assertIsNone(payload["kcal_goal"])
        self.assertIsNone(bot.row(self.cid)["kcal_goal"])

    def test_garbage_goal_is_still_rejected_without_clearing(self):
        bot.upsert(self.cid, mode="cycle", last_period=bot.dtoday().isoformat(),
                   cycle_len=28, height=166, weight=40, age=21, kcal_goal=1800)

        response, payload = self._prefs({"diet_note": "", "kcal_goal": "много"})

        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "bad_kcal_goal")
        self.assertEqual(bot.row(self.cid)["kcal_goal"], 1800)


if __name__ == "__main__":
    unittest.main()
