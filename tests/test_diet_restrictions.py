import os
import unittest


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import llm


class DietRestrictionsTest(unittest.TestCase):
    def test_empty_without_profile_or_diet(self):
        self.assertEqual(llm.diet_restrictions(None), "")
        self.assertEqual(llm.diet_restrictions({}), "")
        self.assertEqual(llm.diet_restrictions({"diet": "", "diet_note": ""}), "")

    def test_codes_translated(self):
        self.assertEqual(llm.diet_restrictions({"diet": "veg"}), "вегетарианство")
        self.assertEqual(
            llm.diet_restrictions({"diet": "nolac,noglu"}),
            "без лактозы, без глютена",
        )

    def test_free_note_included(self):
        self.assertEqual(
            llm.diet_restrictions({"diet_note": "не ем мясо и птицу"}),
            "не ем мясо и птицу",
        )

    def test_codes_and_note_combined(self):
        self.assertEqual(
            llm.diet_restrictions({"diet": "nonuts", "diet_note": "не ем мясо и птицу"}),
            "без орехов, не ем мясо и птицу",
        )

    def test_unknown_code_passed_through(self):
        self.assertEqual(llm.diet_restrictions({"diet": "keto"}), "keto")
