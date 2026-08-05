import os
import unittest
from urllib.parse import urlsplit


RELAY_PORTS = {"openrouter.ai": {14443, 24443}, "api.telegram.org": {8443, 18443},
               "api.groq.com": {9443, 26443}}


def _env_from_example(path):
    out = {}
    with open(path, encoding="utf-8") as source:
        for line in source:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            out[k] = v
    return out


class ProductionEgressUrlsTest(unittest.TestCase):
    """Все внешние провайдеры на i167 доступны только через relay-порты.

    Хосты провайдеров в service-specific hosts указывают на 127.0.0.1, где
    на :443 стоит wildcard-Caddy: URL без relay-порта молча не уходит наружу
    (инцидент 31.07 — генерация картинок еды встала на переезде).
    """

    def test_example_env_uses_relay_ports_for_all_providers(self):
        env = _env_from_example("deploy/i167/aiwa-production.env.example")
        bad = []
        for key, value in env.items():
            if not value.startswith("http"):
                continue
            parts = urlsplit(value)
            expected = RELAY_PORTS.get(parts.hostname or "")
            if expected and parts.port not in expected:
                bad.append(f"{key}={value} (ожидался порт из {sorted(expected)})")
        self.assertEqual(bad, [], "URL мимо relay:\n" + "\n".join(bad))

    def test_production_example_enables_polling_and_jobs(self):
        env = _env_from_example("deploy/i167/aiwa-production.env.example")
        self.assertNotIn("AIWA_CANDIDATE", env)
