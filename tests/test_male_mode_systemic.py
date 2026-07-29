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


ROOT = Path(__file__).resolve().parents[1]
FORBIDDEN = ("цикл", "фоллик", "лютеин", "овуляц", "месячн", "менструац", "пмс", "гинеколог")


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
                {"kind": "food", "record_id": 11},
                {"kind": "workout", "record_id": 12},
            ],
        })

        self.assertNotIn("mutation", payload)
        self.assertEqual(
            [item["kind"] for item in payload["mutations"]],
            ["food", "workout"],
        )
        assert_male_safe(self, payload)

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
        bot.chatlog_add(self.cid, "ai", "День 12, фолликулярная фаза.")
        bot.chatlog_add(self.cid, "ai", "Сегодня умеренная нагрузка.")

        payload = json.loads(bot._api_data_sync(self.cid, {}).text)
        expected = bot.profile_kcal(bot.profile_of(bot.row(self.cid)))[0]

        self.assertEqual(payload["mode"], "male")
        self.assertFalse(payload["cycle"])
        self.assertIsNone(payload["last_period"])
        self.assertIsNone(payload["cycle_len"])
        self.assertEqual(payload["past_periods"], [])
        self.assertEqual(payload["kcal_base"], expected)
        self.assertEqual(len(payload["chatlog"]), 1)
        assert_male_safe(self, payload)

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
        analysis = bot.cycle_text_analysis(self.cid)
        hello = bot.partner_hello_for(bot.row(self.cid))
        caption = bot.report_caption(bot.row(self.cid), "Весь период")

        assert_male_safe(self, analysis)
        assert_male_safe(self, hello)
        assert_male_safe(self, caption)
        self.assertIn("самочувств", analysis.lower())
        self.assertIn("его", hello.lower())
        self.assertIn("терапевт", caption.lower())

    def test_legacy_and_fallback_ui_have_explicit_male_contract(self):
        for relative in ("webapp/index.html", "webapp2/index.html"):
            source = (ROOT / relative).read_text(encoding="utf-8")
            self.assertIn('mode==="male"', source)
            self.assertIn("Выписка по самочувствию", source)
            self.assertIn("по самочувствию</span>", source)
            self.assertIn('"male"', source[source.find("var modeOpts"):source.find("var modeOpts") + 180])


if __name__ == "__main__":
    unittest.main()
