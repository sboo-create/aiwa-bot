import threading
import unittest
from decimal import Decimal
from unittest import mock

from scripts import claude_deep_review as deep


class ClaudeDeepReviewTests(unittest.TestCase):
    def test_deep_schema_bounds_each_agent_output(self):
        properties = deep.deep_review_tool()["input_schema"]["properties"]
        self.assertEqual(properties["findings"]["maxItems"], 5)
        self.assertEqual(properties["test_gaps"]["maxItems"], 4)

    def test_marker_deduplicates_by_revision_and_version(self):
        marker = deep.deep_review_marker("a" * 40)
        with mock.patch.object(
            deep.base,
            "get_json",
            return_value=[{"body": f"deep review\n{marker}"}],
        ):
            self.assertTrue(
                deep.already_deep_reviewed(
                    "owner/repo",
                    "12",
                    "token",
                    "a" * 40,
                )
            )
            self.assertFalse(
                deep.already_deep_reviewed(
                    "owner/repo",
                    "12",
                    "token",
                    "b" * 40,
                )
            )

    def test_marker_search_paginates(self):
        marker = deep.deep_review_marker("a" * 40)
        first_page = [{"body": "old"}] * 100
        second_page = [{"body": marker}]
        with mock.patch.object(
            deep.base,
            "get_json",
            side_effect=[first_page, second_page],
        ) as get_json:
            self.assertTrue(
                deep.already_deep_reviewed(
                    "owner/repo",
                    "12",
                    "token",
                    "a" * 40,
                )
            )
        self.assertEqual(get_json.call_count, 2)

    def test_wait_for_test_success_ignores_skipped_label_check(self):
        responses = [
            {
                "check_runs": [{
                    "name": "test",
                    "status": "completed",
                    "conclusion": "skipped",
                }]
            },
            {
                "check_runs": [{
                    "name": "test",
                    "status": "completed",
                    "conclusion": "success",
                }]
            },
        ]
        with (
            mock.patch.object(deep.base, "get_json", side_effect=responses),
            mock.patch.object(deep.time, "sleep") as sleep,
        ):
            deep.wait_for_test_success(
                "owner/repo",
                "a" * 40,
                "token",
                timeout=10,
                poll_interval=1,
            )
        sleep.assert_called_once_with(1)

    def test_agents_execute_in_parallel(self):
        barrier = threading.Barrier(len(deep.AGENTS))

        def fake_request(_url, payload, **_kwargs):
            barrier.wait(timeout=2)
            title = next(
                agent["title"]
                for agent in deep.AGENTS
                if agent["title"] in payload["system"]
            )
            return {
                "content": [{
                    "type": "tool_use",
                    "name": deep.base.TOOL_NAME,
                    "input": {
                        "summary": title,
                        "findings": [],
                        "test_gaps": [],
                        "residual_risks": [],
                    },
                }],
                "usage": {"input_tokens": 100, "output_tokens": 10},
            }

        with mock.patch.object(deep.base, "request_json", side_effect=fake_request):
            results = deep.run_agents(
                base_url="http://127.0.0.1:14000",
                api_key="secret",
                policy="policy",
                pr_number="1",
                pr_title="title",
                diff="diff",
                truncated=False,
            )

        self.assertEqual(
            [result["agent"]["id"] for result in results],
            [agent["id"] for agent in deep.AGENTS],
        )
        self.assertEqual(
            [result["review"]["summary"] for result in results],
            [agent["title"] for agent in deep.AGENTS],
        )

    def test_one_agent_failure_preserves_partial_results(self):
        barrier = threading.Barrier(len(deep.AGENTS))
        calls = 0
        lock = threading.Lock()

        def fake_request(_url, _payload, **_kwargs):
            nonlocal calls
            barrier.wait(timeout=2)
            with lock:
                calls += 1
                call_number = calls
            if call_number == 1:
                raise RuntimeError("temporary upstream failure")
            return {
                "content": [{
                    "type": "tool_use",
                    "name": deep.base.TOOL_NAME,
                    "input": {
                        "summary": "Safe",
                        "findings": [],
                        "test_gaps": [],
                        "residual_risks": [],
                    },
                }],
                "usage": {"input_tokens": 100, "output_tokens": 10},
            }

        with mock.patch.object(deep.base, "request_json", side_effect=fake_request):
            results = deep.run_agents(
                base_url="http://127.0.0.1:14000",
                api_key="secret",
                policy="policy",
                pr_number="1",
                pr_title="title",
                diff="diff",
                truncated=False,
            )

        self.assertEqual(
            sum(bool(result.get("error")) for result in results),
            1,
        )
        body = deep.render_comment(
            "a" * 40,
            results,
            [Decimal()] * 3,
            "test pricing",
            False,
        )
        self.assertIn("Agent failed", body)
        self.assertIn("Deep review is incomplete", body)
        self.assertNotIn(deep.deep_review_marker("a" * 40), body)
        self.assertNotIn("No blocking findings", body)

    def test_render_comment_combines_agents_and_usage(self):
        results = []
        for index, agent in enumerate(deep.AGENTS):
            findings = []
            if index == 0:
                findings = [{
                    "severity": "P1",
                    "file": "app.py",
                    "line": 42,
                    "title": "Race",
                    "scenario": "Two writes overlap.",
                    "evidence": "No transaction guard.",
                    "fix": "Serialize the write.",
                    "confidence": "high",
                }]
            results.append({
                "agent": agent,
                "review": {
                    "summary": f"{agent['title']} complete.",
                    "findings": findings,
                    "test_gaps": [],
                    "residual_risks": [],
                },
                "usage": {"input_tokens": 1000, "output_tokens": 100},
            })

        body = deep.render_comment(
            "a" * 40,
            results,
            [Decimal("0.0100")] * 3,
            "test pricing",
            False,
        )

        self.assertIn("Three bounded specialist agents", body)
        self.assertIn("P1 · `app.py:42`", body)
        self.assertIn("**`$0.0300`**", body)
        self.assertIn("Requests: `3` in parallel", body)
        self.assertNotIn("No blocking findings", body)

    def test_malformed_finding_suppresses_clean_banner(self):
        results = [{
            "agent": agent,
            "review": {
                "summary": "Done",
                "findings": (
                    [{"severity": "blocker"}]
                    if index == 0 else []
                ),
                "test_gaps": [],
                "residual_risks": [],
            },
            "usage": {},
        } for index, agent in enumerate(deep.AGENTS)]

        body = deep.render_comment(
            "a" * 40,
            results,
            [Decimal()] * 3,
            "test pricing",
            False,
        )

        self.assertIn("malformed finding", body)
        self.assertIn("Deep review is incomplete", body)
        self.assertNotIn("No blocking findings", body)

    def test_comment_post_retries_transient_failure(self):
        with (
            mock.patch.object(
                deep.base,
                "post_github_comment",
                side_effect=[RuntimeError("rate limit"), None],
            ) as post,
            mock.patch.object(deep.time, "sleep") as sleep,
        ):
            deep.post_comment_with_retry(
                "owner/repo",
                "12",
                "token",
                "body",
            )
        self.assertEqual(post.call_count, 2)
        sleep.assert_called_once_with(1)


if __name__ == "__main__":
    unittest.main()
