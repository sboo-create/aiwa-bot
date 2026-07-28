import asyncio
import os
import types
import unittest
from unittest import mock

os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot
import llm


class TTSParallelismTests(unittest.TestCase):
    def test_synthesize_posts_plain_text_with_selected_voice(self):
        response = types.SimpleNamespace(
            status_code=200,
            content=b"voice-audio",
            text="",
            raise_for_status=lambda: None,
        )
        info = {}
        with mock.patch.object(llm, "SALUTE_VOICE", "erm"), \
             mock.patch.object(llm, "_salute_auth", return_value="speech-token"), \
             mock.patch.object(llm._HTTP, "post", return_value=response) as post, \
             mock.patch.object(llm, "_capture_media"):
            audio = llm.synthesize("Привет! Это Айва.", info)

        self.assertEqual(audio, b"voice-audio")
        self.assertEqual(post.call_args.kwargs["params"]["voice"], "Erm_24000")
        self.assertEqual(post.call_args.kwargs["headers"]["Content-Type"], "application/text")
        self.assertEqual(post.call_args.kwargs["data"].decode("utf-8"), "Привет! Это Айва.")
        self.assertGreater(info["chars"], 0)

    def test_parallel_generation_preserves_telegram_send_order(self):
        chunks = ["0", "1", "2"]
        active = 0
        max_active = 0

        async def fake_llm(_cid, _purpose, _func, chunk, info):
            nonlocal active, max_active
            index = int(chunk)
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
             mock.patch.object(bot.L, "tts_chunks", return_value=chunks), \
             mock.patch.object(bot.L, "_tts_provider_concurrency", return_value=3), \
             mock.patch.object(bot, "llm_to_thread", side_effect=fake_llm), \
             mock.patch.object(bot, "ev"):
            asyncio.run(bot._send_voice_reply(context, 77, "text"))

        self.assertGreaterEqual(max_active, 2)
        sent = [call.args[1] for call in context.bot.send_voice.await_args_list]
        self.assertEqual(sent, [b"audio-0", b"audio-1", b"audio-2"])

    def test_failed_chunk_is_skipped_and_the_rest_are_sent(self):
        chunks = ["0", "1", "2"]

        async def fake_llm(_cid, _purpose, _func, chunk, info):
            if chunk == "1":
                return None
            info.update(ms=10, chars=1)
            return f"audio-{chunk}".encode()

        context = types.SimpleNamespace(
            bot=types.SimpleNamespace(send_voice=mock.AsyncMock(), send_audio=mock.AsyncMock())
        )
        with mock.patch.dict(os.environ, {"AIWA_TTS_PARALLELISM": "2"}), \
             mock.patch.object(bot.L, "tts_chunks", return_value=chunks), \
             mock.patch.object(bot.L, "_tts_provider_concurrency", return_value=2), \
             mock.patch.object(bot, "llm_to_thread", side_effect=fake_llm), \
             mock.patch.object(bot, "ev"):
            asyncio.run(bot._send_voice_reply(context, 77, "text"))

        sent = [call.args[1] for call in context.bot.send_voice.await_args_list]
        self.assertEqual(sent, [b"audio-0", b"audio-2"])

    def test_parallelism_never_exceeds_provider_concurrency(self):
        with mock.patch.dict(os.environ, {"AIWA_SALUTE_ACCOUNT_TYPE": "personal",
                                          "AIWA_TTS_PROVIDER_CONCURRENCY": "9"}):
            self.assertEqual(llm._tts_provider_concurrency(), 5)
        with mock.patch.dict(os.environ, {"AIWA_SALUTE_ACCOUNT_TYPE": "legal",
                                          "AIWA_TTS_PROVIDER_CONCURRENCY": "9"}):
            self.assertEqual(llm._tts_provider_concurrency(), 9)


if __name__ == "__main__":
    unittest.main()
