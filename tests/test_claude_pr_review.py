import importlib.util
import pathlib
import unittest
from decimal import Decimal
from unittest import mock


MODULE_PATH = pathlib.Path(__file__).parents[1] / "scripts" / "claude_pr_review.py"
SPEC = importlib.util.spec_from_file_location("claude_pr_review", MODULE_PATH)
reviewer = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(reviewer)


class ClaudePrReviewTests(unittest.TestCase):
    def test_extract_review_requires_forced_tool_result(self):
        expected = {
            "summary": "Safe",
            "findings": [],
            "test_gaps": [],
            "residual_risks": [],
        }
        response = {
            "content": [
                {"type": "text", "text": "ignored"},
                {"type": "tool_use", "name": reviewer.TOOL_NAME, "input": expected},
            ]
        }
        self.assertEqual(reviewer.extract_review(response), expected)
        with self.assertRaises(RuntimeError):
            reviewer.extract_review({"content": [{"type": "text", "text": "no tool"}]})

    def test_estimated_cost_uses_token_prices(self):
        with mock.patch.object(
            reviewer,
            "openrouter_prices",
            return_value=(Decimal("0.000002"), Decimal("0.000010"), "test"),
        ):
            cost, source = reviewer.estimated_cost(
                "aiwa-review-sonnet-5",
                {"input_tokens": 100_000, "output_tokens": 2_000},
            )
        self.assertEqual(cost, Decimal("0.220000"))
        self.assertEqual(source, "test")

    def test_render_comment_reports_findings_and_usage(self):
        body = reviewer.render_comment(
            "aiwa-review-sonnet-5",
            "a" * 40,
            {
                "summary": "One issue.",
                "findings": [{
                    "severity": "P1",
                    "file": "app.py",
                    "line": 42,
                    "title": "Unsafe write",
                    "scenario": "Two workers race.",
                    "evidence": "The transaction is missing.",
                    "fix": "Use BEGIN IMMEDIATE.",
                    "confidence": "high",
                }],
                "test_gaps": ["Add a concurrency test."],
                "residual_risks": [],
            },
            {"input_tokens": 1000, "output_tokens": 100},
            Decimal("0.0030"),
            "test pricing",
            False,
        )
        self.assertIn("P1 · `app.py:42`", body)
        self.assertIn("Estimated cost: `$0.0030`", body)
        self.assertNotIn("No blocking findings", body)


if __name__ == "__main__":
    unittest.main()
