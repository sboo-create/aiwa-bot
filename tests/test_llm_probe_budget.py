"""Служебные пробы должны переживать reasoning-модели.

Инцидент 08.08.2026: после перехода на gpt-5.6-luna проба здоровья просила
ответ в 16 токенов, модель тратила их целиком на внутренние рассуждения и
возвращала пустой контент (finish_reason=length). Приложение считало путь к
модели деградировавшим и будило дежурного, хотя модель отвечала нормально.
"""

import os
import sys
import unittest
from pathlib import Path
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import llm as L


class ProbeBudgetTests(unittest.TestCase):
    MIN_BUDGET = 64   # хватает на рассуждения luna (16-24 токена) и короткий ответ

    def _budget_of(self, call, target="_call"):
        seen = {}

        def fake_call(messages, max_tokens=None, **kwargs):
            seen["max_tokens"] = max_tokens
            return "работает"

        with mock.patch.object(L, target, side_effect=fake_call):
            call()
        return seen["max_tokens"]

    def test_health_check_leaves_room_for_reasoning(self):
        self.assertGreaterEqual(self._budget_of(L.health_check), self.MIN_BUDGET)

    def test_probe_once_leaves_room_for_reasoning(self):
        # probe_once намеренно идёт мимо семафора и зовёт _call_impl напрямую.
        self.assertGreaterEqual(
            self._budget_of(L.probe_once, target="_call_impl"), self.MIN_BUDGET)

    def test_health_check_reports_the_answer(self):
        with mock.patch.object(L, "_call", return_value="работает"):
            ok, text = L.health_check()
        self.assertTrue(ok)
        self.assertEqual(text, "работает")

    def test_empty_answer_is_still_a_failure(self):
        """Пустой ответ обязан оставаться сбоем: это и есть сигнал деградации."""
        with mock.patch.object(L, "_call", return_value=""):
            ok, _ = L.health_check()
        self.assertFalse(ok)


if __name__ == "__main__":
    unittest.main()
