import inspect
import os
import unittest


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import llm


PROFILE = {"diet": "nonuts", "diet_note": "не ем мясо и птицу"}


class DietInPromptsTest(unittest.TestCase):
    def test_profile_note_contains_actual_restrictions(self):
        # Баг: чат-промпт сообщал только «есть пищевые ограничения» без сути,
        # и модель предлагала мясо. Теперь ограничения должны попадать в
        # промпт дословно.
        note = llm._ctx_note(None, PROFILE)
        self.assertIn("не ем мясо и птицу", note)
        self.assertIn("без орехов", note)

    def test_no_bare_restrictions_marker_left(self):
        # Строка-заглушка не должна вернуться ни в одном промпт-билдере.
        src = inspect.getsource(llm)
        self.assertNotIn('bits.append("есть пищевые ограничения")', src)

    def test_helper_used_everywhere(self):
        # Копипаста сборки ограничений заменена хелпером во всех местах.
        src = inspect.getsource(llm)
        self.assertEqual(src.count("DIET_RU.get(x, x)"), 1)  # только внутри diet_restrictions
