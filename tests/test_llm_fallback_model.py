import os, sys, unittest
from unittest import mock
os.environ.setdefault("BOT_TOKEN","1:t"); os.environ.setdefault("AIWA_ANALYTICS_SALT","s")
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import llm as L


class FallbackModelTests(unittest.TestCase):
    """У запасного шлюза свой каталог моделей.

    Инцидент 08.08.2026: журнальный роутер подставлял выбранную модель во все
    маршруты, включая LiteLLM, чей ключ пускает только gigachat. Резерв отвечал
    403, открывал circuit и добивал запрос вместо того, чтобы спасти его.
    """

    def test_fallback_keeps_its_own_model(self):
        cfgs = [
            {"name": "openrouter", "url": "https://main/v1/chat/completions", "model": "main-model", "key": "k"},
            {"name": "litellm_fallback", "url": "https://fb/v1/chat/completions", "model": "gigachat-3-ultra", "key": "k"},
        ]
        seen = []
        def fake_one(cfg, *a, **kw):
            seen.append((cfg["name"], cfg["model"]))
            return None if cfg["name"] == "openrouter" else "ответ"
        with mock.patch.object(L, "_proxy_configs", return_value=cfgs), \
             mock.patch.object(L, "_call_proxy_one", side_effect=fake_one):
            out = L._call_model([{"role":"user","content":"x"}], "openai/gpt-5.6-luna")
        self.assertEqual(out, "ответ")
        self.assertEqual(seen, [("openrouter","openai/gpt-5.6-luna"),
                                ("litellm_fallback","gigachat-3-ultra")])
if __name__ == "__main__":
    unittest.main()
