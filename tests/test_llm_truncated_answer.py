"""Обрыв до первого слова ответа не должен выглядеть как молчание модели.

Инцидент 08.08.2026: после перехода на gpt-5.6-luna модель расходовала на
внутренние рассуждения весь выданный лимит — при max_tokens=300 в reasoning
уходило ровно 300, ответ приходил пустым с finish_reason=length. Разбор
составных блюд и замена блюда молча переставали работать.

Полагаться на «выданного лимита хватит» нельзя: бюджет рассуждений
расширяется под любой лимит. Поэтому обрыв распознаётся и переспрашивается
с большим бюджетом, а рассуждения ограничиваются явным effort.
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


def _reply(text, finish):
    return {"choices": [{"finish_reason": finish,
                         "message": {"content": text}}], "usage": {}}


class TruncationDetectionTests(unittest.TestCase):
    def test_length_finish_is_recognised_as_truncation(self):
        self.assertTrue(L._answer_was_truncated(_reply("", "length")))
        self.assertFalse(L._answer_was_truncated(_reply("готово", "stop")))
        self.assertFalse(L._answer_was_truncated({}))


class BudgetEscalationTests(unittest.TestCase):
    CFG = {"name": "openrouter", "url": "https://x/v1/chat/completions",
           "model": "m", "key": "k"}

    def _run(self, replies, start=300):
        seen = []

        class FakeResponse:
            def __init__(self, payload):
                self.status_code = 200
                self.headers = {}
                self._payload = payload

            def json(self):
                return self._payload

        def fake_post(url, headers=None, json=None, timeout=None, verify=None):
            seen.append(json["max_tokens"])
            return FakeResponse(replies[len(seen) - 1])

        with mock.patch.object(L._HTTP, "post", side_effect=fake_post), \
             mock.patch.object(L, "_route_available", return_value=True), \
             mock.patch.object(L, "_capture_usage"), \
             mock.patch.object(L, "_route_record_success"), \
             mock.patch.object(L, "_route_record_failure", return_value=False):
            out = L._call_proxy_one(self.CFG, [{"role": "user", "content": "x"}],
                                    start, 0.2, None, attempts=1)
        return out, seen

    def test_truncated_answer_is_retried_with_a_bigger_budget(self):
        out, budgets = self._run([_reply("", "length"), _reply("готово", "stop")])
        self.assertEqual(out, "готово")
        self.assertEqual(budgets, [300, 600])

    def test_escalation_happens_once_and_does_not_loop(self):
        out, budgets = self._run([_reply("", "length")] * 4)
        self.assertIsNone(out)
        self.assertEqual(budgets, [300, 600])

    def test_escalated_pass_gets_a_single_attempt(self):
        """Расширение бюджета не должно запускать второй цикл ретраев."""
        seen = []
        real = L._call_proxy_one

        def spy(cfg, messages, max_tokens, temperature, usage, attempts=4, escalated=False):
            seen.append((max_tokens, attempts, escalated))
            if escalated:
                return "готово"
            return real(cfg, messages, max_tokens, temperature, usage, attempts, escalated)

        class FakeResponse:
            status_code = 200
            headers = {}

            def json(self):
                return _reply("", "length")

        with mock.patch.object(L, "_call_proxy_one", side_effect=spy), \
             mock.patch.object(L._HTTP, "post", return_value=FakeResponse()), \
             mock.patch.object(L, "_route_available", return_value=True), \
             mock.patch.object(L, "_capture_usage"), \
             mock.patch.object(L, "_route_record_failure", return_value=False):
            L._call_proxy_one(self.CFG, [{"role": "user", "content": "x"}],
                              300, 0.2, None, attempts=4)

        self.assertEqual(seen[0], (300, 4, False))
        self.assertEqual(seen[1], (600, 1, True))

    def test_plain_empty_answer_is_not_escalated(self):
        """Пустой ответ без обрыва — это отказ модели, лимит тут ни при чём."""
        out, budgets = self._run([_reply("", "stop")])
        self.assertIsNone(out)
        self.assertEqual(budgets, [300])


class ReasoningPreferenceTests(unittest.TestCase):
    def test_effort_is_sent_only_when_configured(self):
        with mock.patch.dict(os.environ, {"AIWA_LLM_REASONING_EFFORT": "low"}):
            payload = L._proxy_payload([{"role": "user", "content": "x"}], 300, 0.2)
        self.assertEqual(payload["reasoning"], {"effort": "low"})

        with mock.patch.dict(os.environ, {"AIWA_LLM_REASONING_EFFORT": ""}):
            payload = L._proxy_payload([{"role": "user", "content": "x"}], 300, 0.2)
        self.assertNotIn("reasoning", payload)

    def test_garbage_effort_is_ignored_rather_than_sent(self):
        with mock.patch.dict(os.environ, {"AIWA_LLM_REASONING_EFFORT": "очень сильно"}):
            payload = L._proxy_payload([{"role": "user", "content": "x"}], 300, 0.2)
        self.assertNotIn("reasoning", payload)


if __name__ == "__main__":
    unittest.main()
