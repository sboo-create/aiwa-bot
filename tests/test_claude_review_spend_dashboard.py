import importlib.util
import pathlib
import unittest


MODULE_PATH = (
    pathlib.Path(__file__).parents[1]
    / "scripts"
    / "claude_review_spend_dashboard.py"
)
SPEC = importlib.util.spec_from_file_location(
    "claude_review_spend_dashboard",
    MODULE_PATH,
)
dashboard = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(dashboard)


class ClaudeReviewSpendDashboardTests(unittest.TestCase):
    def test_render_dashboard_aggregates_are_visible(self):
        report = {
            "generated_at": "2026-07-28T12:00:00+00:00",
            "key_alias": "github-aiwa-claude-review",
            "budget": {
                "spent": 0.37975,
                "limit": 25,
                "remaining": 24.62025,
                "reset_at": "2026-08-01 00:00:00",
            },
            "windows": {
                "today": {
                    "requests": 23,
                    "input_tokens": 765127,
                    "output_tokens": 37683,
                    "cost": 0.37975,
                },
                "7d": {
                    "requests": 23,
                    "input_tokens": 765127,
                    "output_tokens": 37683,
                    "cost": 0.37975,
                },
                "30d": {
                    "requests": 23,
                    "input_tokens": 765127,
                    "output_tokens": 37683,
                    "cost": 0.37975,
                    "models": [
                        {
                            "model": "aiwa-review-opus-5",
                            "requests": 3,
                            "input_tokens": 19683,
                            "output_tokens": 4833,
                            "cost": 0.21924,
                        },
                        {
                            "model": "aiwa-review-sonnet-5",
                            "requests": 20,
                            "input_tokens": 745444,
                            "output_tokens": 32850,
                            "cost": 0.16051,
                        },
                    ],
                },
            },
            "daily": [{
                "date": "2026-07-28",
                "requests": 23,
                "input_tokens": 765127,
                "output_tokens": 37683,
                "cost": 0.37975,
            }],
        }

        body = dashboard.render_dashboard(report)

        self.assertIn("$0.3797", body)
        self.assertIn("$24.6202", body)
        self.assertIn("`aiwa-review-opus-5`", body)
        self.assertIn("765 127", body)
        self.assertIn("2026-08-01T00:00:00Z", body)
        self.assertNotIn("messages", body)


if __name__ == "__main__":
    unittest.main()
