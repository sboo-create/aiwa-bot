import asyncio
import inspect
import json
import os
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


ROOT = Path(__file__).resolve().parents[1]
FORBIDDEN = ("цикл", "фоллик", "лютеин", "овуляц", "месячн", "менструац", "пмс", "гинеколог")
REPRODUCTIVE_FORBIDDEN = ("фоллик", "лютеин", "овуляц", "месячн", "менструац", "пмс")


class FakeJsonRequest:
    def __init__(self, body):
        self.body = body

    async def json(self):
        return self.body


def assert_male_safe(testcase, value):
    visible = json.dumps(value, ensure_ascii=False).lower()
    for token in FORBIDDEN:
        testcase.assertNotIn(token, visible)


class MaleModeSystemicTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        self.old_app = bot.BOT_APP
        bot.DB = os.path.join(self.tmp.name, "male-systemic.db")
        bot.BOT_APP = None
        self.cid = 5252
        bot._activate_user(self.cid)
        bot.upsert(
            self.cid,
            mode="male",
            height=180,
            weight=80,
            age=40,
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

    def test_all_period_api_actions_fail_closed_without_mutation(self):
        bot.cyc_add(self.cid, "2026-06-01", "2026-06-05")
        before = bot.periods_of(self.cid)

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
            assert_male_safe(self, payload)

        self.assertEqual(bot.periods_of(self.cid), before)
        self.assertFalse(bot.db_mark_period(self.cid, "2026-07-01"))
        self.assertEqual(bot.row(self.cid)["mode"], "male")

    def test_chat_router_blocks_personal_cycle_flows(self):
        for message in (
            "какая у меня сейчас фаза цикла?",
            "сегодня начались месячные, запиши",
            "открой календарь цикла",
        ):
            result = asyncio.run(bot._chat_reply(self.cid, bot.row(self.cid), message))
            self.assertFalse(result.get("mutation"))
            assert_male_safe(self, result)

        self.assertEqual(bot.periods_of(self.cid), [])
        self.assertEqual(bot.row(self.cid)["mode"], "male")

    def test_final_payload_guard_strips_only_period_mutations(self):
        payload = bot.guard_chat_payload(self.cid, {
            "answer": "Готово.",
            "suggestions": ["Какая фаза цикла?", "Что съесть сегодня?"],
            "mutation": {"kind": "period", "date": "2026-07-01"},
            "mutations": [
                {"kind": "period", "date": "2026-07-01"},
                {"kind": "period_end", "date": "2026-07-05"},
                {"kind": "cyclelen", "value": 30},
                {"kind": "food", "record_id": 11},
                {"kind": "workout", "record_id": 12},
                {"kind": "hydration", "record_id": 13},
            ],
        })

        self.assertNotIn("mutation", payload)
        self.assertEqual(
            [item["kind"] for item in payload["mutations"]],
            ["food", "workout", "hydration"],
        )
        self.assertEqual(payload["mutation_blocked"], "male_mode")
        self.assertIn("недоступна", payload["answer"].lower())
        assert_male_safe(self, payload)

        only_blocked = bot.guard_chat_payload(self.cid, {
            "answer": "Готово.",
            "mutations": [{"kind": "period_end", "date": "2026-07-05"}],
        })
        self.assertNotIn("mutations", only_blocked)
        self.assertEqual(only_blocked["mutation_blocked"], "male_mode")
        self.assertEqual(only_blocked["answer"], bot.MALE_PROFILE_FUNCTION_TEXT)

    def test_switching_from_cycle_to_male_clears_state_and_derived_caches(self):
        bot.upsert(
            self.cid,
            mode="cycle",
            last_period="2026-07-01",
            cycle_len=31,
            period_end="2026-07-05",
            period_len=5,
            state="await_period_date",
        )
        bot.CHAT_HIST[self.cid] = bot.deque([
            {"role": "assistant", "content": "Фолликулярная фаза"},
        ], maxlen=6)
        bot._TODAY_CACHE[(self.cid, "2026-07-29", "cycle")] = {"summary": "Фаза"}
        bot.dc_put(self.cid, "today", {"summary": "День цикла"}, "cycle")

        with mock.patch.object(bot, "_verify_init", return_value=self.cid):
            response = asyncio.run(bot._api_mode(FakeJsonRequest({"mode": "male"})))
        payload = json.loads(response.text)
        user = bot.row(self.cid)

        self.assertTrue(payload["ok"])
        self.assertEqual(user["mode"], "male")
        self.assertIsNone(user["last_period"])
        self.assertIsNone(user["cycle_len"])
        self.assertIsNone(user["period_end"])
        self.assertIsNone(user["period_len"])
        self.assertIsNone(user["state"])
        self.assertNotIn(self.cid, bot.CHAT_HIST)
        self.assertFalse(any(key[0] == self.cid for key in bot._TODAY_CACHE))
        self.assertIsNone(bot.dc_get(self.cid, "today", "cycle"))

    def test_male_data_hides_stale_history_and_uses_male_kcal_formula(self):
        bot.cyc_add(self.cid, "2026-06-01", "2026-06-05")
        bot.chatlog_add(self.cid, "user", "Какая у меня сейчас фаза цикла?")
        bot.chatlog_add(self.cid, "ai", "День 12, фолликулярная фаза.")
        bot.chatlog_add(self.cid, "user", "Полезны ли циклы сна для восстановления?")
        bot.chatlog_add(self.cid, "ai", "Сегодня умеренная нагрузка.")

        payload = json.loads(bot._api_data_sync(self.cid, {}).text)
        expected = bot.profile_kcal(bot.profile_of(bot.row(self.cid)))[0]

        self.assertEqual(payload["mode"], "male")
        self.assertFalse(payload["cycle"])
        self.assertIsNone(payload["last_period"])
        self.assertIsNone(payload["cycle_len"])
        self.assertEqual(payload["past_periods"], [])
        self.assertEqual(payload["kcal_base"], expected)
        self.assertEqual(len(payload["chatlog"]), 4)
        self.assertEqual(
            [item["role"] for item in payload["chatlog"]],
            ["user", "ai", "user", "ai"],
        )
        self.assertEqual(
            [item["text"] for item in payload["chatlog"] if item["role"] == "user"],
            [
                "Какая у меня сейчас фаза цикла?",
                "Полезны ли циклы сна для восстановления?",
            ],
        )
        for item in payload["chatlog"]:
            if item["role"] == "user":
                continue
            lowered = item["text"].lower()
            for token in REPRODUCTIVE_FORBIDDEN:
                self.assertNotIn(token, lowered)

    def test_agent_tools_and_cycle_tool_fail_closed(self):
        tool_names = {
            item["function"]["name"]
            for item in bot._agent_tools_spec("male")
        }
        self.assertNotIn("cycle_status", tool_names)
        result = bot._agent_exec(self.cid, "cycle_status", {})
        self.assertFalse(result["available"])
        assert_male_safe(self, result)

    def test_analysis_and_partner_copy_are_male_specific(self):
        bot.workout_add(self.cid, {
            "type": "Силовая",
            "items": [],
            "duration": "40 мин",
            "rpe": "средняя",
            "note": "спина",
        })
        analysis = bot.cycle_text_analysis(self.cid)
        hello = bot.partner_hello_for(bot.row(self.cid))
        caption = bot.report_caption(bot.row(self.cid), "Весь период")

        assert_male_safe(self, analysis)
        assert_male_safe(self, hello)
        assert_male_safe(self, caption)
        self.assertIn("самочувств", analysis.lower())
        self.assertIn("тренировок за последние 14 дней: 1", analysis.lower())
        self.assertIn("его", hello.lower())
        self.assertIn("терапевт", caption.lower())

    def test_male_guard_allows_benign_cycles_and_keeps_medical_escalation(self):
        benign_examples = (
            "Сон состоит из повторяющихся циклов, а нагрузку лучше чередовать.",
            "День тренировочного цикла — восстановление.",
            "Длина цикла сна зависит от режима.",
        )
        with mock.patch.object(bot, "row", wraps=bot.row) as user_lookup:
            for benign in benign_examples:
                self.assertEqual(bot.guard_aiwa_reply(self.cid, benign), benign)
        self.assertEqual(user_lookup.call_count, len(benign_examples))

        guarded = bot.guard_aiwa_reply(
            self.cid,
            "Фолликулярная фаза. При сильной боли и температуре обратись к врачу.",
        )
        lowered = guarded.lower()
        for token in REPRODUCTIVE_FORBIDDEN:
            self.assertNotIn(token, lowered)
        self.assertIn("обратись к врачу", lowered)
        self.assertIn("неотлож", lowered)
        suggestions = bot.guard_aiwa_suggestions(
            self.cid,
            [
                "Как построить тренировочный цикл?",
                "Что сейчас с циклом?",
            ],
        )
        self.assertIn("Как построить тренировочный цикл?", suggestions)
        self.assertNotIn("Что сейчас с циклом?", suggestions)

    def test_male_history_keeps_user_turns_without_blocking_db_read(self):
        bot.CHAT_HIST[self.cid] = bot.deque([
            {"role": "user", "content": "Расскажи про цикл тренировок"},
            {"role": "assistant", "content": "День 12, фолликулярная фаза"},
        ], maxlen=6)

        with mock.patch.object(
            bot,
            "chatlog_get",
            side_effect=AssertionError("cached history must not read the database"),
        ):
            history = bot.hist_get(self.cid, male=True)

        self.assertEqual(history[0]["content"], "Расскажи про цикл тренировок")
        self.assertNotIn("фоллик", history[1]["content"].lower())

        api_history = bot._male_safe_history([
            {"role": "user", "text": "Расскажи про цикл тренировок"},
            {
                "role": "ai",
                "text": (
                    "День 12, фолликулярная фаза. При сильной боли и "
                    "температуре обратись к врачу."
                ),
            },
        ])
        self.assertEqual(api_history[0]["text"], history[0]["content"])
        self.assertNotIn("фоллик", api_history[1]["text"].lower())
        self.assertIn("обратись к врачу", api_history[1]["text"].lower())
        self.assertIn("неотлож", api_history[1]["text"].lower())

    def test_period_end_is_protected_for_male_profile(self):
        bot.upsert(
            self.cid,
            last_period="2026-07-25",
            period_end=None,
            period_len=None,
        )
        bot.cyc_add(self.cid, "2026-07-25")

        result = asyncio.run(
            bot.log_period_end_action(
                self.cid,
                bot.row(self.cid),
                "сегодня закончились месячные",
            )
        )

        self.assertFalse(result["ok"])
        assert_male_safe(self, result)
        self.assertIsNone(bot.row(self.cid)["period_end"])
        self.assertEqual(bot.periods_of(self.cid)[-1]["start"], "2026-07-25")
        self.assertIsNone(bot.periods_of(self.cid)[-1]["end"])

    def test_cycle_onboarding_switches_mode_only_after_valid_inputs(self):
        callback_source = inspect.getsource(bot.on_cb)
        choice_block = callback_source[
            callback_source.index('if data == "onb_cycle"'):
            callback_source.index('if data == "prof_skip"')
        ]
        self.assertNotIn('mode="cycle"', choice_block)

        context = SimpleNamespace(application=object())
        with mock.patch.object(bot, "schedule_daily") as schedule:
            bot.finish_onboarding(context, self.cid, "2026-07-01", 29)

        user = bot.row(self.cid)
        self.assertEqual(user["mode"], "cycle")
        self.assertEqual(user["last_period"], "2026-07-01")
        self.assertEqual(user["cycle_len"], 29)
        schedule.assert_called_once()

    def test_profile_update_uses_same_male_calorie_target_as_data_api(self):
        bot.upsert(self.cid, kcal_goal=2300)
        request = FakeJsonRequest({
            "height": "181",
            "weight": "82",
            "age": "41",
        })

        with mock.patch.object(bot, "_verify_init", return_value=self.cid):
            response = asyncio.run(bot._api_profile(request))

        profile_payload = json.loads(response.text)
        data_payload = json.loads(bot._api_data_sync(self.cid, {}).text)
        self.assertEqual(profile_payload["kcal_base"], 2300)
        self.assertEqual(profile_payload["kcal_base"], data_payload["kcal_base"])

    def test_legacy_and_fallback_ui_have_explicit_male_contract(self):
        for relative in ("webapp/index.html", "webapp2/index.html"):
            source = (ROOT / relative).read_text(encoding="utf-8")
            self.assertIn('mode==="male"', source)
            self.assertIn("Выписка по самочувствию", source)
            self.assertIn("по самочувствию</span>", source)
            self.assertIn('"male"', source[source.find("var modeOpts"):source.find("var modeOpts") + 180])

        bundle = (
            ROOT / "webapp2/assets/deslop/deslop-main-aiwa-v177.js"
        ).read_text(encoding="utf-8")
        self.assertNotIn('label: "Что съела?"', bundle)
        self.assertIn('label: "Что было в приёме пищи?"', bundle)


if __name__ == "__main__":
    unittest.main()
