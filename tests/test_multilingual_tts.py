import asyncio
import os
import types
import unittest
import xml.etree.ElementTree as ET
from unittest import mock

os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot
import llm


class MultilingualTTSTests(unittest.TestCase):
    def test_detects_all_twelve_salutespeech_languages(self):
        samples = {
            "ru": "Сегодня хорошая погода, и мы идём гулять.",
            "uz": "Salom, bu o‘zbek tilidagi oddiy gap.",
            "pt": "Olá, como você está hoje? Muito obrigado.",
            "pl": "Dzień dobry, jak się masz? Dziękuję bardzo.",
            "nl": "Goedemorgen, dit is een Nederlandse zin.",
            "kz": "Бұл қазақ тіліндегі қарапайым сөйлем.",
            "en": "Hello, this is a simple English sentence.",
            "de": "Guten Morgen, das ist ein deutscher Satz.",
            "es": "Hola, buenos días. Esta es una frase española.",
            "fr": "Bonjour, ceci est une phrase française.",
            "it": "Ciao, questa è una semplice frase italiana.",
            "ky": "Бул кыргыз тилиндеги жөнөкөй сүйлөм.",
        }

        detected = {language: llm.detect_tts_language(text)[0] for language, text in samples.items()}

        self.assertEqual(detected, {language: language for language in samples})

    def test_mixed_literary_text_uses_one_voice_and_language_tags(self):
        text = (
            "Князь улыбнулся. "
            "«Bonjour, mon ami. Je suis heureux de vous voir.» "
            "Затем он вышел."
        )

        requests_ = llm.tts_ssml_requests(text, voice="erm")

        self.assertEqual(len(requests_), 1)
        request_ = requests_[0]
        self.assertEqual(request_["languages"], ("ru", "fr"))
        self.assertLessEqual(len(request_["body"]), 4000)
        root = ET.fromstring(request_["body"])
        voices = list(root)
        self.assertEqual([node.attrib["lang"] for node in voices], ["ru", "fr", "ru"])
        self.assertEqual({node.attrib["name"] for node in voices}, {"Erm_24000"})
        self.assertIn("Bonjour, mon ami", request_["body"])

    def test_ssml_escapes_xml_and_long_text_is_complete(self):
        text = " ".join(
            f"Глава {index}: Анна сказала «Bonjour & merci» и продолжила чтение."
            for index in range(1, 180)
        )

        requests_ = llm.tts_ssml_requests(text, limit=900)

        self.assertGreater(len(requests_), 2)
        self.assertTrue(all(len(item["body"]) <= 900 for item in requests_))
        for item in requests_:
            ET.fromstring(item["body"])
        delivered = " ".join(item["text"] for item in requests_)
        self.assertIn("Глава 1:", delivered)
        self.assertIn("Глава 179:", delivered)
        self.assertEqual(delivered.count("Bonjour & merci"), 179)
        self.assertTrue(all("&amp;" in item["body"] for item in requests_))

    def test_unsupported_language_is_not_silently_read_as_russian(self):
        with self.assertRaises(llm.UnsupportedTTSLanguage) as raised:
            llm.tts_ssml_requests("Он увидел: 「こんにちは、元気ですか？」 и остановился.")

        self.assertIn("ja", raised.exception.languages)

    def test_synthesize_posts_ssml_with_selected_voice(self):
        response = types.SimpleNamespace(
            status_code=200,
            content=b"multilingual-audio",
            text="",
            raise_for_status=lambda: None,
        )
        info = {}
        with mock.patch.object(llm, "SALUTE_VOICE", "erm"), \
             mock.patch.object(llm, "_salute_auth", return_value="speech-token"), \
             mock.patch.object(llm._HTTP, "post", return_value=response) as post, \
             mock.patch.object(llm, "_capture_media"):
            audio = llm.synthesize("Он сказал: «Bonjour, mon ami.»", info)

        self.assertEqual(audio, b"multilingual-audio")
        self.assertEqual(post.call_args.kwargs["params"]["voice"], "Erm_24000")
        self.assertEqual(post.call_args.kwargs["headers"]["Content-Type"], "application/ssml")
        body = post.call_args.kwargs["data"].decode("utf-8")
        self.assertIn('lang="ru"', body)
        self.assertIn('lang="fr"', body)
        self.assertEqual(info["languages"], ["ru", "fr"])

    def test_parallel_generation_preserves_telegram_send_order(self):
        requests_ = [
            {
                "body": f"<speak>{index}</speak>",
                "content_type": "application/ssml",
                "characters": 1,
                "languages": ("ru",),
                "text": str(index),
            }
            for index in range(3)
        ]
        active = 0
        max_active = 0

        async def fake_llm(_cid, _purpose, _func, request_, info):
            nonlocal active, max_active
            index = int(request_["text"])
            active += 1
            max_active = max(max_active, active)
            await asyncio.sleep(0.03 * (3 - index))
            active -= 1
            info.update(ms=10, chars=1)
            return f"audio-{index}".encode()

        context = types.SimpleNamespace(
            bot=types.SimpleNamespace(send_voice=mock.AsyncMock(), send_audio=mock.AsyncMock())
        )
        with mock.patch.dict(os.environ, {"AIWA_TTS_PARALLELISM": "3"}), \
             mock.patch.object(bot.L, "tts_ssml_requests", return_value=requests_), \
             mock.patch.object(bot.L, "_tts_provider_concurrency", return_value=3), \
             mock.patch.object(bot, "llm_to_thread", side_effect=fake_llm), \
             mock.patch.object(bot, "ev"):
            asyncio.run(bot._send_voice_reply(context, 77, "text"))

        self.assertGreaterEqual(max_active, 2)
        sent = [call.args[1] for call in context.bot.send_voice.await_args_list]
        self.assertEqual(sent, [b"audio-0", b"audio-1", b"audio-2"])


if __name__ == "__main__":
    unittest.main()
