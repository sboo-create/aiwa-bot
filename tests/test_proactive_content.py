import inspect
import os
import unittest


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot
import llm


# Дыхательные практики удалены из продукта; проактивные пуши не должны
# обещать функции, которых в приложении нет.
FORBIDDEN = ("дыхатель", "медитац", "практик")


class ProactiveContentTest(unittest.TestCase):
    def test_signal_topics_do_not_promise_removed_features(self):
        src = inspect.getsource(bot._proactive_signals).lower()
        for word in FORBIDDEN:
            self.assertNotIn(word, src)

    def test_compose_prompt_does_not_promise_removed_features(self):
        src = inspect.getsource(llm.proactive_compose).lower()
        for word in FORBIDDEN:
            # Промпт может ЗАПРЕЩАТЬ упоминание, но не приглашать к практике.
            for line in src.splitlines():
                if word in line and "не упоминай" not in line:
                    self.fail("proactive_compose promises removed feature: %r" % line.strip())
