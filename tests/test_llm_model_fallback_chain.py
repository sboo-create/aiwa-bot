"""Порядок резервов: своя модель на том же провайдере, затем чужой шлюз.

08.08.2026 переход на gpt-5.6-luna показал, что путь к модели рвётся не
только когда лежит провайдер: модель может быть недоступна по параметрам,
отвечать пустым или деградировать. Промежуточный резерв — та же площадка,
другая модель — переживает это, не уходя сразу на чужой шлюз с другим
качеством ответов.

Здесь же закреплены грабли того перехода: каждый маршрут ходит в свою
модель, а предохранитель считается отдельно, иначе закрытый маршрут одной
модели гасил бы и резервную.
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


class ModelFallbackChainTests(unittest.TestCase):
    def _configs(self, **env):
        base = {
            "OPENROUTER_FALLBACK_MODEL": "",
            "LITELLM_FALLBACK_KEY": "",
            "LITELLM_FALLBACK_URL": "",
            "AIWA_LLM_FALLBACK_KEY": "",
            "AIWA_LLM_FALLBACK_URL": "",
        }
        base.update(env)
        with mock.patch.dict(os.environ, base), \
             mock.patch.object(L, "PROXY_URL", "https://openrouter.ai/api/v1/chat/completions"), \
             mock.patch.object(L, "PROXY_MODEL", "openai/gpt-5.6-luna"), \
             mock.patch.object(L, "_OPENROUTER_KEY", "key"), \
             mock.patch.object(L, "PROVIDER", "openrouter"):
            return L._proxy_configs()

    def test_model_fallback_sits_between_primary_and_gateway(self):
        cfgs = self._configs(
            OPENROUTER_FALLBACK_MODEL="google/gemini-3.1-flash-lite",
            LITELLM_FALLBACK_KEY="k",
            LITELLM_FALLBACK_URL="http://127.0.0.1:29443/v1/chat/completions",
            LITELLM_FALLBACK_MODEL="gigachat-3-ultra",
        )
        self.assertEqual(
            [(c["name"], c["model"]) for c in cfgs],
            [("openrouter", "openai/gpt-5.6-luna"),
             ("openrouter_model_fallback", "google/gemini-3.1-flash-lite"),
             ("litellm_fallback", "gigachat-3-ultra")],
        )

    def test_absent_variable_keeps_the_old_two_step_chain(self):
        cfgs = self._configs(
            LITELLM_FALLBACK_KEY="k",
            LITELLM_FALLBACK_URL="http://127.0.0.1:29443/v1/chat/completions",
            LITELLM_FALLBACK_MODEL="gigachat-3-ultra",
        )
        self.assertEqual([c["name"] for c in cfgs],
                         ["openrouter", "litellm_fallback"])

    def test_same_model_as_primary_is_not_duplicated(self):
        """Резерв той же моделью — не резерв, а лишний одинаковый запрос."""
        cfgs = self._configs(OPENROUTER_FALLBACK_MODEL="openai/gpt-5.6-luna")
        self.assertEqual([c["name"] for c in cfgs], ["openrouter"])

    def test_privacy_preferences_are_inherited(self):
        """Резерв обязан нести те же ZDR и запрет сбора данных."""
        cfgs = self._configs(OPENROUTER_FALLBACK_MODEL="google/gemini-3.1-flash-lite")
        self.assertEqual(cfgs[1]["provider"], cfgs[0]["provider"])
        self.assertEqual(cfgs[1]["key"], cfgs[0]["key"])

    def test_circuit_state_is_separate_per_model(self):
        """Закрытый маршрут одной модели не должен гасить резервную."""
        primary, sibling = self._configs(
            OPENROUTER_FALLBACK_MODEL="google/gemini-3.1-flash-lite")
        self.assertNotEqual(L._route_key(primary), L._route_key(sibling))

    def test_explicit_model_choice_does_not_overwrite_the_reserve(self):
        """Журнальный роутер выбирает модель — резерв всё равно идёт в свою."""
        cfgs = [
            {"name": "openrouter", "url": "u", "model": "primary", "key": "k"},
            {"name": "openrouter_model_fallback", "url": "u", "model": "google/gemini-3.1-flash-lite", "key": "k"},
        ]
        seen = []

        def fake_one(cfg, *a, **kw):
            seen.append((cfg["name"], cfg["model"]))
            return None if cfg["name"] == "openrouter" else "ответ"

        with mock.patch.object(L, "_proxy_configs", return_value=cfgs), \
             mock.patch.object(L, "_call_proxy_one", side_effect=fake_one):
            out = L._call_model([{"role": "user", "content": "x"}], "openai/gpt-5.6-luna")

        self.assertEqual(out, "ответ")
        self.assertEqual(seen, [("openrouter", "openai/gpt-5.6-luna"),
                                ("openrouter_model_fallback", "google/gemini-3.1-flash-lite")])


if __name__ == "__main__":
    unittest.main()
