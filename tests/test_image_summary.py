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
