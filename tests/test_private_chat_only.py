import inspect
import os
import unittest


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


class PrivateChatOnlyTest(unittest.TestCase):
    """Бот живёт в личных диалогах: групповые сообщения не должны заводить
    «пользователя» с id группы (актуально после добавления бота в канал
    мониторинга)."""

    def test_message_handlers_are_private_only(self):
        src = inspect.getsource(bot.run_all)
        for handler in ("on_text", "on_voice", "on_photo"):
            line = next(l for l in src.splitlines() if handler in l and "MessageHandler" in l) \
                if any(handler in l and "MessageHandler" in l for l in src.splitlines()) \
                else next(block for block in src.split("app.add_handler(") if handler in block)
            self.assertIn("ChatType.PRIVATE", line, handler)

    def test_id_command_stays_available_in_groups(self):
        src = inspect.getsource(bot.run_all)
        self.assertIn('cmd == "id"', src)
