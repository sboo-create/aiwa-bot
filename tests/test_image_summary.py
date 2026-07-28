import io
import unittest
from datetime import date

from PIL import Image

import image


class SummaryImageTests(unittest.TestCase):
    def test_general_summary_card_is_valid_png(self):
        payload = image.render_general_summary("irregular", date(2026, 7, 23))
        rendered = Image.open(io.BytesIO(payload))

        self.assertEqual(rendered.format, "PNG")
        self.assertEqual(rendered.size, (720, 540))

    def test_pregnancy_card_accepts_term_context(self):
        payload = image.render_general_summary(
            "preg",
            date(2026, 7, 23),
            {"week": 18, "trimester": 2},
        )
        rendered = Image.open(io.BytesIO(payload))

        self.assertEqual(rendered.format, "PNG")
        self.assertEqual(rendered.size, (720, 540))

    def test_dynamic_cycle_card_accepts_model_facts_and_trusted_metrics(self):
        payload = image.render_summary_card(
            "cycle",
            date(2026, 7, 23),
            [
                "Сегодня умеренная нагрузка лучше тренировки на максимум.",
                "Белок и сложные углеводы помогут сохранить ровную энергию.",
                "Если есть усталость, добавь больше времени на восстановление.",
            ],
            {"day": 24, "cycle_len": 29, "phase_ru": "Лютеиновая", "days_to_next": 5},
        )
        rendered = Image.open(io.BytesIO(payload))

        self.assertEqual(rendered.format, "PNG")
        self.assertEqual(rendered.size, (720, 1040))

    def test_dynamic_pregnancy_card_accepts_week_and_trimester(self):
        payload = image.render_summary_card(
            "preg",
            date(2026, 7, 23),
            ["Сегодня ориентируйся на самочувствие и не пропускай воду."],
            pregnancy={"week": 18, "trimester": 2, "days_left": 154},
        )
        rendered = Image.open(io.BytesIO(payload))

        self.assertEqual(rendered.format, "PNG")
        self.assertEqual(rendered.size, (720, 1040))

    def test_cycle_and_pregnancy_each_have_three_stable_templates(self):
        facts = [
            "Ориентируйся на сегодняшнее самочувствие",
            "Выбирай привычную нагрузку без работы через боль",
            "Оставь время на сон, еду и восстановление",
        ]
        cycle = {"day": 24, "cycle_len": 29, "phase_ru": "Лютеиновая", "days_to_next": 5}
        pregnancy = {"week": 22, "trimester": 2, "days_left": 126}
        for mode, kwargs in (
            ("cycle", {"cycle": cycle}),
            ("preg", {"pregnancy": pregnancy}),
        ):
            payloads = [
                image.render_summary_card(mode, date(2026, 7, 23), facts, variant=v, **kwargs)
                for v in range(3)
            ]
            self.assertEqual(len(set(payloads)), 3)
            self.assertEqual(
                image.render_summary_card(mode, date(2026, 7, 23), facts, variant=1, **kwargs),
                payloads[1],
            )
