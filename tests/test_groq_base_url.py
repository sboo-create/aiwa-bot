import os
import unittest
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import llm


class _Resp:
    status_code = 200

    def raise_for_status(self):
        pass

    def json(self):
        return {"text": "привет"}


class GroqBaseUrlTest(unittest.TestCase):
    def _call_and_capture_url(self, env):
        with mock.patch.dict(os.environ, env), \
                mock.patch.object(llm._HTTP, "post", return_value=_Resp()) as post:
            out = llm._transcribe_groq(b"abc", "voice.ogg", "ogg")
        self.assertEqual(out, "привет")
        return post.call_args[0][0]

    def test_default_url(self):
        url = self._call_and_capture_url({"GROQ_API_KEY": "k"})
        self.assertEqual(url, "https://api.groq.com/openai/v1/audio/transcriptions")

    def test_relay_override(self):
        url = self._call_and_capture_url({
            "GROQ_API_KEY": "k",
            "GROQ_BASE_URL": "https://api.groq.com:9443/openai/v1/",
        })
        self.assertEqual(url, "https://api.groq.com:9443/openai/v1/audio/transcriptions")
