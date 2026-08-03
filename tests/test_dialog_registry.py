"""Контракт сбора параметров.

Главный инвариант: непонятный ввод НИКОГДА не роняет сценарий молча. Именно
это и было сломано в четырёх ветках `await_*` — две сбрасывали состояние без
единого слова, и пользователь получал обычный ответ ИИ вместо повторного
вопроса.
"""

import re
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import dialog


def _time(text):
    m = re.fullmatch(r"(\d{1,2})[:. ](\d{2})", text.strip())
    if not m:
        return None
    h, mi = int(m.group(1)), int(m.group(2))
    return f"{h:02d}:{mi:02d}" if 0 <= h <= 23 and 0 <= mi <= 59 else None


class DialogRegistryTests(unittest.TestCase):
    def setUp(self):
        dialog._REGISTRY.clear()
        dialog.register(dialog.Action(
            name="settime",
            title="Время сводки",
            params=(dialog.Param(
                name="hhmm",
                prompt="Во сколько присылать сводку?",
                parse=_time,
                error="Нужно время по Москве, например 08:00.",
            ),),
        ))

    def tearDown(self):
        dialog._REGISTRY.clear()

    def test_collects_the_missing_parameter(self):
        step = dialog.begin("settime")
        self.assertIsInstance(step, dialog.Ask)
        done = dialog.feed(step.state, "8:30")
        self.assertEqual(done, dialog.Done("settime", {"hhmm": "08:30"}))

    def test_known_parameter_skips_the_question(self):
        self.assertEqual(
            dialog.begin("settime", {"hhmm": "07:00"}),
            dialog.Done("settime", {"hhmm": "07:00"}),
        )

    def test_unparsable_input_reasks_and_keeps_the_scenario(self):
        """Это и есть починенный баг: раньше здесь состояние снималось молча."""
        step = dialog.begin("settime")
        again = dialog.feed(step.state, "когда-нибудь утром")
        self.assertIsInstance(again, dialog.Ask)
        self.assertIn("08:00", again.prompt)
        self.assertIsNotNone(dialog.parse_state(again.state))
        # и сценарий продолжается — следующий разумный ответ доводит до конца
        self.assertEqual(
            dialog.feed(again.state, "09:15"),
            dialog.Done("settime", {"hhmm": "09:15"}),
        )

    def test_repeated_failures_end_with_an_explicit_message(self):
        step = dialog.begin("settime")
        result = None
        for _ in range(dialog.MAX_ATTEMPTS):
            result = dialog.feed(step.state, "ерунда")
            if isinstance(result, dialog.Cancelled):
                break
            step = result
        self.assertIsInstance(result, dialog.Cancelled)
        self.assertTrue(result.message.strip(), "выход обязан быть со словами")

    def test_user_can_cancel_at_any_point(self):
        step = dialog.begin("settime")
        result = dialog.feed(step.state, "Отмена")
        self.assertIsInstance(result, dialog.Cancelled)

    def test_legacy_states_are_not_hijacked(self):
        """Старые ветки `await_*` продолжают работать, пока не переедут."""
        self.assertIsNone(dialog.feed("await_time", "08:00"))
        self.assertIsNone(dialog.parse_state("await_period_date"))
        self.assertIsNone(dialog.feed(None, "08:00"))

    def test_broken_parser_is_a_reask_not_a_crash(self):
        dialog._REGISTRY.clear()
        dialog.register(dialog.Action(
            name="boom",
            title="Тест",
            params=(dialog.Param(
                name="x",
                prompt="Ну?",
                parse=lambda _: (_ for _ in ()).throw(RuntimeError("подорвался")),
                error="Не разобрала.",
            ),),
        ))
        step = dialog.begin("boom")
        self.assertIsInstance(dialog.feed(step.state, "что угодно"), dialog.Ask)

    def test_surfaces_drive_exposure(self):
        dialog.register(dialog.Action(
            name="only_menu", title="Только меню", surfaces=frozenset({"menu"}),
        ))
        self.assertIn("settime", [a.name for a in dialog.actions("chat")])
        self.assertNotIn("only_menu", [a.name for a in dialog.actions("chat")])

    def test_duplicate_registration_is_a_developer_error(self):
        with self.assertRaises(dialog.DialogError):
            dialog.register(dialog.Action(name="settime", title="Дубль"))


if __name__ == "__main__":
    unittest.main()
