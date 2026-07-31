import asyncio
import os
import types
import unittest
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


def _edited_update(text="исправленный текст"):
    """Правка сообщения: PTB кладёт его в edited_message, message = None."""
    chat = types.SimpleNamespace(id=705)
    edited = types.SimpleNamespace(text=text, reply_text=mock.AsyncMock())
    return types.SimpleNamespace(
        message=None, edited_message=edited, effective_chat=chat,
        effective_message=edited,
    )


class EditedMessageUpdatesTest(unittest.TestCase):
    """Инцидент 31.07: правка сообщения роняла хендлеры AttributeError.

    MessageHandler в PTB получает и правки, а там update.message = None.
    Пользователь видел «Упс, что-то пошло не так», админам летел алерт.
    """

    def test_on_text_ignores_edits_without_calling_handler(self):
        context = types.SimpleNamespace(bot=mock.AsyncMock())
        with mock.patch.object(bot, "handle_text", new=mock.AsyncMock()) as handler:
            asyncio.run(bot.on_text(_edited_update(), context))
        handler.assert_not_awaited()

    def test_on_voice_ignores_edits(self):
        context = types.SimpleNamespace(bot=mock.AsyncMock())
        asyncio.run(bot.on_voice(_edited_update(), context))
        context.bot.send_chat_action.assert_not_awaited()

    def test_on_photo_ignores_edits(self):
        context = types.SimpleNamespace(bot=mock.AsyncMock())
        with mock.patch.object(bot, "row", return_value={}) as row:
            asyncio.run(bot.on_photo(_edited_update(), context))
        row.assert_not_called()
