"""Режим fit: женский профиль без трекинга цикла.

Фидбек беты (07.08.2026): онбординг сразу спрашивал про месячные, хотя
пользовательница пришла вести питание. Режим fit — это скип трекинга цикла,
а не «нет месячных»: грамматика остаётся женской, а фазы, календарь и записи
месячных выключены до тех пор, пока она сама не включит цикл обратно.

Этот файл держит оба края инварианта: контент без цикла и грамматика без
мужского рода. Прошлый разъезд male-режима случился именно там, где цикл был
веткой по умолчанию, а не opt-in.
"""

import asyncio
import json
import os
import tempfile
import unittest
from pathlib import Path
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot
import analytics_v2 as A2
import llm


ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "webapp2" / "index.html"
CONSTANTS = ROOT / "frontend" / "src" / "aiwa" / "lib" / "constants.js"
PROFILE_SETTINGS = ROOT / "frontend" / "src" / "aiwa" / "lib" / "profileSettings.js"
CALENDAR_PANEL = ROOT / "frontend" / "src" / "aiwa" / "panels" / "CalendarPanel.jsx"
JOURNAL_PANEL = ROOT / "frontend" / "src" / "aiwa" / "panels" / "JournalPanel.jsx"

# Личный прогноз цикла в fit-режиме запрещён. Слово «цикл» само по себе не
# запрещено: она может спросить о цикле, и ответ по общей физиологии допустим.
PERSONAL_CYCLE_FORBIDDEN = ("фоллик", "лютеин", "овуляц", "фаза цикла", "день цикла")
MALE_GRAMMAR = ("мужчин", "мужской род", "мужского профиля", "пользователю")


class FakeJsonRequest:
    def __init__(self, body):
        self.body = body

    async def json(self):
        return self.body


class FitModeSystemicTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        self.old_app = bot.BOT_APP
        bot.DB = os.path.join(self.tmp.name, "fit-systemic.db")
        bot.BOT_APP = None
        self.cid = 7373
        bot._activate_user(self.cid)
        bot.upsert(
            self.cid,
            mode="fit",
            height=168,
            weight=60,
            age=30,
            last_period=None,
            cycle_len=None,
        )
        bot.CHAT_HIST.clear()
        bot._TODAY_CACHE.clear()
        bot._CARD_CACHE.clear()

    def tearDown(self):
        bot.CHAT_HIST.clear()
        bot._TODAY_CACHE.clear()
        bot._CARD_CACHE.clear()
        bot.BOT_APP = self.old_app
        bot.DB = self.old_db
        self.tmp.cleanup()

    # ---------- профиль и режим ----------

    def test_fit_is_onboarded_without_cycle_inputs(self):
        user = bot.row(self.cid)
        self.assertTrue(bot.is_onboarded(user))
        self.assertFalse(bot.is_cycle(user))
        self.assertTrue(bot.cycle_features_off(user))
        self.assertFalse(bot.is_male_profile(user))
        self.assertIn("fit", bot.VALID_MODES)
        self.assertIn("fit", bot.NO_CYCLE_MODES)

    def test_female_grammar_and_female_kcal_formula(self):
        profile = bot.profile_of(bot.row(self.cid))
        self.assertFalse(profile["male"])
        female = bot.profile_kcal(profile)[0]

        bot.upsert(self.cid, mode="male")
        male = bot.profile_kcal(bot.profile_of(bot.row(self.cid)))[0]
        self.assertNotEqual(female, male)

    def test_analytics_variant_is_female(self):
        self.assertEqual(A2.normalize_assistant_variant("fit"), "female")
        self.assertEqual(bot._assistant_variant_from_user(bot.row(self.cid)), "female")

    def test_api_mode_accepts_fit_and_rejects_unknown(self):
        with mock.patch.object(bot, "_verify_init", return_value=self.cid):
            ok = asyncio.run(bot._api_mode(FakeJsonRequest({"mode": "fit"})))
            bad = asyncio.run(bot._api_mode(FakeJsonRequest({"mode": "fitness"})))
        self.assertEqual(ok.status, 200)
        self.assertEqual(bad.status, 400)
        self.assertEqual(json.loads(bad.text)["error"], "bad_mode")
        self.assertEqual(bot.row(self.cid)["mode"], "fit")

    def test_switching_to_cycle_restores_tracking(self):
        bot.upsert(self.cid, mode="fit", last_period="2026-07-01", cycle_len=28)
        user = bot.row(self.cid)
        self.assertFalse(bot.is_cycle(user))
        self.assertIsNone(bot.status_of(self.cid)[1])

        with mock.patch.object(bot, "_verify_init", return_value=self.cid):
            response = asyncio.run(bot._api_mode(FakeJsonRequest({"mode": "cycle"})))

        self.assertEqual(response.status, 200)
        restored = bot.row(self.cid)
        self.assertEqual(restored["mode"], "cycle")
        self.assertEqual(restored["last_period"], "2026-07-01")
        self.assertTrue(bot.is_cycle(restored))

    def test_onboarding_offers_the_skip_and_mode_command_lists_it(self):
        """Экран цели: питание без цикла обязано быть видно сразу, не под «нет цикла»."""
        female = [
            button.callback_data
            for row in bot.FEMALE_ONB_KB.inline_keyboard for button in row
        ]
        self.assertIn("mode:fit", female)
        self.assertLess(female.index("mode:fit"), female.index("no_cycle"))

        modes = [
            button.callback_data
            for row in bot.MODE_KB.inline_keyboard for button in row
        ]
        self.assertIn("mode:fit", modes)

    def test_unknown_mode_callback_is_rejected(self):
        """callback_data приходит от клиента: чужой режим не должен сохраняться."""
        self.assertNotIn("fitness", bot.VALID_MODES)
        for mode in ("fitness", "cycle-x", ""):
            self.assertNotIn(mode, bot.VALID_MODES)
        self.assertEqual(bot.row(self.cid)["mode"], "fit")

    def test_welcome_message_has_no_cycle_leftovers(self):
        """После скипа нельзя звать в /addcycles и календарь цикла."""
        sent = []

        class FakeMessage:
            async def reply_text(self, text, **kwargs):
                sent.append(text)
                return None

        with mock.patch.object(bot, "summary_sent_today", return_value=True):
            asyncio.run(bot.welcome_finish(None, self.cid, FakeMessage()))

        self.assertEqual(len(sent), 1)
        self.assertNotIn("/addcycles", sent[0])
        self.assertNotIn("Календарь", sent[0])
        self.assertIn("пробежала", sent[0])  # женский род сохранён

    def test_chat_router_answers_period_intents_without_cycle(self):
        """Голос и мини-апп идут этим путём: там же был мужской текст."""
        result = asyncio.run(
            bot._chat_reply(self.cid, bot.row(self.cid), "запиши, месячные начались")
        )
        self.assertEqual(result["answer"], bot.FIT_CYCLE_OFF_TEXT)
        joined = " ".join(result.get("suggestions") or []).lower()
        for token in ("цикл", "календар", "месячн"):
            self.assertNotIn(token, joined)
        self.assertNotIn("мужск", result["answer"].lower())
        self.assertEqual(bot.periods_of(self.cid), [])

    def test_reply_never_recommends_disabled_cycle_commands(self):
        """Модель звала в /period, а он в этом режиме отвечает отказом."""
        answer = (
            "🗓 Овуляция — это выход яйцеклетки.\n\n"
            "Для более точного понимания рекомендую начать фиксировать даты "
            "начала менструаций в боте, используя команду /period. "
            "Это позволит точнее прогнозировать твои периоды."
        )
        guarded = bot.guard_aiwa_reply(self.cid, answer)

        self.assertNotIn("/period", guarded)
        self.assertNotIn("/addcycles", guarded)
        self.assertIn("/mode", guarded)
        self.assertIn("Овуляция", guarded)  # сам ответ по теме сохранён

        untouched = "Овуляция происходит примерно в середине цикла."
        self.assertEqual(bot.guard_aiwa_reply(self.cid, untouched), untouched)

    def test_general_answer_prompt_forbids_disabled_commands(self):
        profile = bot.llm_profile_of(bot.row(self.cid))
        _, own = self._capture_prompt(
            lambda: llm.general_answer(profile, "fit", "когда овуляция?")
        )
        self.assertIn("/period", own)   # назван как запрещённый
        self.assertIn("не зови", own)
        self.assertIn("/mode", own)
        # ...но подсказка про /mode — только если она сама спросила.
        self.assertIn("только если она прямо спрашивает", own)

    def test_off_text_promises_only_what_exists(self):
        """Текст обещал «одно касание» там, где кнопки не было."""
        self.assertNotIn("одно касание", bot.FIT_CYCLE_OFF_TEXT)
        self.assertIn("/mode", bot.FIT_CYCLE_OFF_TEXT)

    # ---------- записи цикла закрыты ----------

    def test_period_api_actions_fail_closed(self):
        for action in ("start", "replace", "delete", "end"):
            request = FakeJsonRequest({
                "action": action,
                "date": "2026-07-01",
                "periods": [{"start": "2026-07-01", "end": "2026-07-05"}],
            })
            with mock.patch.object(bot, "_verify_init", return_value=self.cid):
                response = asyncio.run(bot._api_period(request))
            payload = json.loads(response.text)
            self.assertEqual(response.status, 409)
            self.assertEqual(payload["error"], "profile_mode")
            self.assertEqual(payload["text"], bot.FIT_CYCLE_OFF_TEXT)

        self.assertEqual(bot.periods_of(self.cid), [])
        self.assertEqual(bot.row(self.cid)["mode"], "fit")

    def test_journal_rejects_period_flag(self):
        """Отметка месячных из дневника мини-аппа не должна проходить."""
        body = {
            "date": bot.dtoday().isoformat(),
            "energy": 2,
            "mood": 2,
            "symptoms": [],
            "intimacy": False,
            "period": True,
        }
        payload, status = bot._save_journal_atomic(self.cid, body)
        self.assertEqual(status, 409)
        self.assertEqual(payload["error"], "profile_mode")

        # Мини-апп в fit-режиме ключ period не шлёт вовсе (includePeriod),
        # и такой же журнал обязан сохраняться штатно.
        body.pop("period")
        payload, status = bot._save_journal_atomic(self.cid, body)
        self.assertEqual(status, 200)

    def test_chat_period_actions_fail_closed(self):
        started = asyncio.run(
            bot.log_period_action(self.cid, bot.row(self.cid), "начались сегодня")
        )
        ended = asyncio.run(
            bot.log_period_end_action(self.cid, bot.row(self.cid), "закончились сегодня")
        )
        for result in (started, ended):
            self.assertFalse(result["ok"])
            self.assertEqual(result["text"], bot.FIT_CYCLE_OFF_TEXT)
        self.assertEqual(bot.periods_of(self.cid), [])

        for action in ("_act_period_date", "_act_cycle_len"):
            handler = getattr(bot, action)
            values = {"iso": "2026-08-07"} if action == "_act_period_date" else {"days": 30}
            result = handler(self.cid, values)
            self.assertFalse(result["ok"])
            self.assertEqual(result["error"], "unavailable")
            self.assertNotIn("мужск", result["note"].lower())
        self.assertIsNone(bot.row(self.cid)["cycle_len"])

    def test_agent_tools_drop_cycle_surface(self):
        names = {
            tool["function"]["name"] for tool in bot._agent_tools_spec("fit")
        }
        self.assertNotIn("cycle_status", names)
        self.assertNotIn("period_date", names)
        self.assertNotIn("cycle_len", names)
        self.assertIn("today_diary", names)
        self.assertIn("recent_workouts", names)

        status = bot._agent_exec(self.cid, "cycle_status", {})
        self.assertFalse(status["available"])
        self.assertNotIn("мужск", status["note"].lower())

    # ---------- снапшот мини-аппа ----------

    def test_snapshot_matches_the_host_completeness_contract(self):
        bot.cyc_add(self.cid, "2026-06-01", "2026-06-05")
        payload = json.loads(bot._api_data_sync(self.cid, {}).text)

        self.assertEqual(payload["mode"], "fit")
        self.assertFalse(payload["cycle"])
        self.assertIsNone(payload["last_period"])
        self.assertIsNone(payload["cycle_len"])
        self.assertIsNone(payload["preg"])
        self.assertEqual(payload["periods"], [])
        self.assertEqual(payload["cycles"], [])
        # История прошлых месячных сохраняется: fit — это скип трекинга,
        # а не удаление данных, и она вернётся при переключении на цикл.
        self.assertEqual(len(payload["past_periods"]), 1)
        self.assertEqual(
            payload["kcal_base"],
            bot.profile_kcal(bot.profile_of(bot.row(self.cid)))[0],
        )

    # ---------- промпты ----------

    def _capture_prompt(self, call):
        """Возвращает (весь промпт, только режимная часть без общего SYSTEM)."""
        captured = []

        def fake_call(messages, **kwargs):
            captured.append([
                (m.get("role", ""), (m.get("content") or "").lower()) for m in messages
            ])
            return "Ответ."

        with mock.patch.object(llm, "_call", side_effect=fake_call):
            call()
        self.assertTrue(captured)
        messages = captured[0]
        whole = " ".join(content for _, content in messages)
        # SYSTEM — общий текст продукта, он говорит и про мужчин, и про
        # гинекологов; режимные утечки ищем только в том, что собрал вызов.
        own = " ".join(
            content.replace(llm.SYSTEM.lower(), " ") for _, content in messages
        )
        return whole, own

    def test_general_answer_prompt_is_female_and_cycle_free(self):
        profile = bot.llm_profile_of(bot.row(self.cid))
        whole, own = self._capture_prompt(
            lambda: llm.general_answer(profile, "fit", "что съесть после тренировки?")
        )
        self.assertIn("женском роде", whole)
        self.assertIn("не привязывай к ним советы", whole)
        self.assertIn("не упоминай фазы менструального цикла", own)
        self.assertNotIn("используй мужской род", own)

    def test_general_summary_prompt_avoids_cycle_and_menopause_copy(self):
        profile = bot.llm_profile_of(bot.row(self.cid))
        whole, own = self._capture_prompt(
            lambda: llm.general_summary(profile, "fit")
        )
        self.assertIn("женском роде", whole)
        self.assertIn("на «ты»", own)
        # Сводка не должна каждый день напоминать про выключенный цикл:
        # она только что явно выбрала режим без него.
        self.assertIn("не предлагай включить отслеживание цикла", own)
        self.assertIn("сама тему ведения цикла не поднимай", own)
        for token in ("аменорея", "мгт", "перименопауза", "приливы"):
            self.assertNotIn(token, own)

    def test_training_context_names_the_mode_in_russian(self):
        context = llm._train_ctx(None, "fit", {"age": 30})
        self.assertNotIn("режим: fit", context.lower())
        self.assertIn("не отслеживается", context.lower())
        self.assertIn("пользовательница", context.lower())


class FitModeStaticContractTests(unittest.TestCase):
    """Ветка цикла — по умолчанию, поэтому каждый рендерер нужен явно."""

    def setUp(self):
        self.index = INDEX.read_text(encoding="utf-8")

    def test_host_home_screen_has_a_fit_branch(self):
        self.assertIn('if(mode==="fit"){', self.index)
        self.assertIn('countdownLabel:"питание · нагрузка · самочувствие"', self.index)

    def test_host_day_countdown_never_falls_into_cycle_math(self):
        self.assertIn('mode==="meno"||mode==="none"||mode==="fit"', self.index)

    def test_host_mode_picker_and_labels_know_fit(self):
        self.assertIn('fit:"Питание и нагрузка"', self.index)
        self.assertIn('["cycle","fit","irregular","preg","meno","none","male"]', self.index)

    def test_host_journal_and_receipt_contract_include_fit(self):
        self.assertIn("D.mode==='none'||D.mode==='fit'", self.index)
        self.assertIn('snapshot.mode==="male"||snapshot.mode==="fit"', self.index)

    def test_host_chat_greeting_has_no_cycle_for_fit(self):
        self.assertIn('D.mode==="male"||D.mode==="fit"', self.index)

    def test_frontend_sources_know_fit(self):
        self.assertIn('{ value: "fit", label: "Питание и нагрузка" }',
                      CONSTANTS.read_text(encoding="utf-8"))
        self.assertIn('["meno", "none", "male", "fit"]',
                      PROFILE_SETTINGS.read_text(encoding="utf-8"))
        self.assertIn('"male", "none", "fit"',
                      CALENDAR_PANEL.read_text(encoding="utf-8"))
        self.assertIn('"male", "none", "fit"',
                      JOURNAL_PANEL.read_text(encoding="utf-8"))

    def test_built_bundle_is_rebuilt_with_fit(self):
        """Бандл собран из исходников — иначе мини-апп покажет «Не выбран»."""
        bundles = sorted((ROOT / "webapp2" / "assets" / "deslop").glob("deslop-main-*.js"))
        self.assertEqual(len(bundles), 1, bundles)
        self.assertIn("Питание и нагрузка", bundles[0].read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
