"""Инструменты чата генерируются из реестра.

Смысл: возможность описана один раз и появляется на всех поверхностях сразу.
Раньше чат умел только читать, а изменить период или время сводки можно было
лишь из меню и мини-аппа — отсюда половина списка багов.
"""

import re
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import dialog


SOURCE = (ROOT / "aiwa_bot.py").read_text(encoding="utf-8")


class RegistryChatToolsTests(unittest.TestCase):
    def test_tool_spec_is_generated_not_hand_written(self):
        self.assertIn("for tool in _registry_chat_tools():", SOURCE)
        self.assertIn("def _registry_chat_tools()", SOURCE)

    def test_menu_and_chat_share_one_handler(self):
        """Обе поверхности обязаны звать один и тот же обработчик."""
        self.assertIn("handler = _ACTION_HANDLERS.get(done.action)", SOURCE)
        self.assertIn("handler = _ACTION_HANDLERS.get(name)", SOURCE)

    def test_chat_arguments_go_through_the_same_parsers(self):
        self.assertIn("values, bad = dialog.coerce(name, args)", SOURCE)

    def test_cycle_actions_are_hidden_from_profiles_without_cycle(self):
        """Гейт закрыт и для мужского профиля, и для женского без трекинга."""
        self.assertIn('mode == "male"', SOURCE)
        handlers = SOURCE[SOURCE.index("def _act_period_date"):]
        self.assertIn("cycle_features_off", handlers[:400])
        self.assertIn('mode in ("male", "fit")', SOURCE)


class CoerceTests(unittest.TestCase):
    def setUp(self):
        # Реестр — глобальный, и его наполняет импорт aiwa_bot. Раньше здесь
        # стояло clear() без восстановления: соседние тесты, которым нужны
        # настоящие действия, падали в общем прогоне и проходили поодиночке.
        self._registry_backup = dict(dialog._REGISTRY)
        dialog._REGISTRY.clear()
        dialog.register(dialog.Action(
            name="settime",
            title="Время сводки",
            params=(dialog.Param(
                name="hhmm",
                prompt="Во сколько?",
                parse=lambda t: t if re.fullmatch(r"\d{2}:\d{2}", t) else None,
                error="Нужно время, например 08:00.",
            ),),
        ))

    def tearDown(self):
        dialog._REGISTRY.clear()
        dialog._REGISTRY.update(self._registry_backup)

    def test_valid_argument_is_parsed(self):
        self.assertEqual(dialog.coerce("settime", {"hhmm": " 08:00 "}), ({"hhmm": "08:00"}, None))

    def test_garbage_from_the_model_is_refused_by_name(self):
        self.assertEqual(dialog.coerce("settime", {"hhmm": "утром"}), (None, "hhmm"))

    def test_missing_argument_is_refused(self):
        self.assertEqual(dialog.coerce("settime", {}), (None, "hhmm"))

    def test_broken_parser_is_refusal_not_crash(self):
        dialog._REGISTRY.clear()
        dialog.register(dialog.Action(
            name="boom", title="Тест",
            params=(dialog.Param(
                name="x", prompt="?",
                parse=lambda _: (_ for _ in ()).throw(RuntimeError()),
                error="нет",
            ),),
        ))
        self.assertEqual(dialog.coerce("boom", {"x": "что-то"}), (None, "x"))


if __name__ == "__main__":
    unittest.main()
