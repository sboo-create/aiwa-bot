"""Перенос отметки месячных одной фразой.

Снять и поставить заново из чата было можно и раньше, но это две операции, и
между ними календарь остаётся без цикла. Здесь проверяется разбор фразы и то,
что перенос не путается с новой отметкой.
"""

import os
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


class MoveTargetParsingTests(unittest.TestCase):
    def test_two_dates_take_the_last_one(self):
        """«Перенеси с 18 на 20» — целевая дата вторая, так устроена фраза."""
        self.assertEqual(
            bot._parse_move_target("перенеси с 18.07.2026 на 20.07.2026"),
            "2026-07-20",
        )

    def test_single_date_is_the_target(self):
        self.assertEqual(
            bot._parse_move_target("перенеси месячные на 20 июля"), "2026-07-20"
        )

    def test_phrase_without_a_date_is_refused(self):
        self.assertIsNone(bot._parse_move_target("перенеси пожалуйста"))


class MoveIntentTests(unittest.TestCase):
    def test_move_phrases_are_recognised(self):
        for phrase in (
            "перенеси месячные на 20 июля",
            "поправь дату месячных",
            "сдвинь отметку на вчера",
        ):
            with self.subTest(phrase=phrase):
                self.assertEqual(bot.match_intent(phrase), "period_move")

    def test_new_period_is_not_read_as_a_move(self):
        """Иначе «у меня начались месячные» правило бы существующий цикл."""
        for phrase in ("у меня начались месячные", "отметь месячные сегодня"):
            with self.subTest(phrase=phrase):
                self.assertNotEqual(bot.match_intent(phrase), "period_move")


class MoveWiringTests(unittest.TestCase):
    def test_action_is_registered_and_handled(self):
        import dialog

        self.assertIsNotNone(dialog.get("period_move"))
        self.assertIn("period_move", bot._ACTION_HANDLERS)

    def test_male_profile_never_sees_cycle_actions(self):
        names = {
            tool["function"]["name"]
            for tool in bot._agent_tools_spec("male")
        }
        self.assertNotIn("period_move", names)
        self.assertIn("period_move", {
            tool["function"]["name"] for tool in bot._agent_tools_spec("cycle")
        })


if __name__ == "__main__":
    unittest.main()
