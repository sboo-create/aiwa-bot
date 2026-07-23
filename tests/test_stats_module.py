import importlib.util
import json
import os
import sqlite3
import tempfile
import time
import unittest
from datetime import datetime, timezone
from pathlib import Path
from unittest import mock


ROOT = Path(__file__).resolve().parents[1]


def load_stats(db_path):
    old_db = os.environ.get("STATS_DB")
    old_token = os.environ.get("STATS_INGEST_TOKEN")
    os.environ["STATS_DB"] = db_path
    os.environ["STATS_INGEST_TOKEN"] = "test-token"
    spec = importlib.util.spec_from_file_location("stats_server_test", ROOT / "stats" / "server.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    if old_db is None: os.environ.pop("STATS_DB", None)
    else: os.environ["STATS_DB"] = old_db
    if old_token is None: os.environ.pop("STATS_INGEST_TOKEN", None)
    else: os.environ["STATS_INGEST_TOKEN"] = old_token
    return module


class StatsModuleTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.module = load_stats(str(Path(self.tmp.name) / "events.db"))

    def tearDown(self):
        self.module._db.close()
        self.tmp.cleanup()

    def add(self, event_id, user, name, props=None, ts=None, provenance="observed"):
        self.module._db.execute(
            "INSERT INTO events(event_id,ts,device_id,name,properties,ingested_at,provenance,confidence,payload_version) "
            "VALUES(?,?,?,?,?,?,?,?,?)",
            (event_id, ts or time.time(), user, name, json.dumps(props or {}), time.time(),
             provenance, "high" if provenance == "observed" else "medium", 2),
        )
        self.module._db.commit()

    def test_dashboard_separates_requests_attempts_and_legacy_quality(self):
        # Keep the fixture away from UTC midnight: events intentionally span a few
        # minutes and otherwise make the expected number of calendar days flaky.
        now = datetime(2026, 7, 23, 12, 0, tzinfo=timezone.utc).timestamp()
        self.add("start", "u1", "onboarding_started", ts=now - 300)
        self.add("done", "u1", "onboarding_completed", ts=now - 250)
        self.add("msg", "u1", "user_message_sent", ts=now - 200)
        self.add("answer-sent", "u1", "assistant_message_sent", ts=now - 191)
        self.add("answer", "u1", "assistant_response_received", ts=now - 190)
        self.add("feedback-prompt", "u1", "answer_feedback_prompted", {"answer_id": "a1"}, now - 185)
        self.add("feedback", "u1", "answer_feedback_submitted",
                 {"answer_id": "a1", "rating": "helpful"}, now - 180)
        self.add("safety", "u1", "safety_guidance_shown",
                 {"answer_id": "a1", "safety_level": "escalation"}, now - 179)
        self.add("push", "u1", "push_sent",
                 {"campaign_id": "daily_summary:2026-07-23", "campaign_type": "daily_summary"}, now - 175)
        self.add("push-open", "u1", "push_opened",
                 {"campaign_id": "daily_summary:2026-07-23", "campaign_type": "daily_summary"}, now - 170)
        self.add("push-action", "u1", "summary_opened", ts=now - 165)
        self.add("food-start", "u1", "food_flow_started", ts=now - 160)
        self.add("food-done", "u1", "meal_add_completed", ts=now - 150)
        self.add("call1", "u1", "ai_call", {"request_id": "r1", "provider": "a", "model": "m",
                 "status": "error", "retry_index": 0, "reported_cost": 99, "cost_unit": "TOK"}, now - 199)
        self.add("call2", "u1", "ai_call", {"request_id": "r1", "provider": "b", "model": "m",
                 "status": "success", "retry_index": 1, "input_tokens": 100, "output_tokens": 20,
                 "total_tokens": 120, "estimated_cost_usd": .002, "latency_ms": 500}, now - 198)
        self.add("old", "u2", "legacy_button", {"migration_batch": "b1"}, now - 1000, "reconstructed")

        with mock.patch.object(self.module.time, "time", return_value=now):
            data = self.module.compute_dashboard(1)

        self.assertEqual(len(data["primary"]), 6)
        self.assertEqual(data["ai"]["requests"], 1)
        self.assertEqual(data["ai"]["attempts"], 2)
        self.assertEqual(data["ai"]["successful_requests"], 1)
        self.assertEqual(data["ai"]["failed_attempts"], 1)
        self.assertEqual(data["ai"]["cost_usd"], .002)
        self.assertEqual(data["data_quality"]["mode"], "mixed")
        self.assertEqual(data["data_quality"]["reconstructed_events"], 1)
        self.assertEqual([x["value"] for x in data["funnel"]], [1, 1, 1, 1])
        self.assertIn("Proxy ценности", data["funnel"][3]["help"])
        health = {x["label"]: x for x in data["product_health"]}
        self.assertEqual(health["Activation proxy"]["value"], 100.0)
        self.assertEqual(health["Time to value p50"]["value"], 110)
        self.assertEqual(health["Fallback requests"]["value"], 100.0)
        self.assertTrue(all(x.get("help") for x in data["primary"]))
        self.assertEqual(data["answer_quality"]["helpful_rate"], 100.0)
        self.assertEqual(data["answer_quality"]["feedback_response_rate"], 100.0)
        self.assertEqual(data["answer_quality"]["safety"]["escalation"], 1)
        self.assertEqual(data["push_funnel"]["sent"], 1)
        self.assertEqual(data["push_funnel"]["opened"], 1)
        self.assertEqual(data["push_funnel"]["acted"], 1)
        food = next(x for x in data["feature_funnels"] if x["label"] == "Питание")
        self.assertEqual((food["started"], food["completed"], food["rate"]), (1, 1, 100.0))
        chat = next(x for x in data["feature_funnels"] if x["label"] == "Чат с AIWA")
        self.assertEqual((chat["started"], chat["completed"], chat["rate"]), (1, 1, 100.0))

        with mock.patch.object(self.module.time, "time", return_value=now):
            month = self.module.compute_dashboard(30)
        self.assertEqual(month["data_quality"]["available_days"], 1)
        self.assertEqual(month["audience"]["avg_dau"], 2.0)
        self.assertEqual(len(month["series"]), 1)
        self.assertEqual([x["label"] for x in month["primary"]],
                         ["Ever used", "DAU", "WAU", "MAU", "Sessions / DAU", "Tools / DAU"])
        self.assertEqual(month["overview"], data["overview"])
        self.assertEqual(set(month["overview"]), {
            "ever_used", "dau", "wau", "mau", "sessions_per_dau", "tools_per_dau",
        })
        tools = {x["id"]: x for x in data["tool_definitions"]}
        self.assertTrue(tools["ai_provider_attempts"]["selected_for_overview"])
        self.assertEqual(tools["ai_provider_attempts"]["denominator"], 1)
        self.assertEqual(tools["logical_ai_requests"]["value"], 1.0)
        self.assertEqual(tools["value_actions"]["value"], 1.5)
        self.assertEqual(data["overview"]["tools_per_dau"], 2.0)
        self.assertEqual(len(data["diagnostics"]), 10)

    def test_overview_ratios_use_rolling_dau_not_calendar_user_days(self):
        now = datetime(2026, 7, 23, 0, 30, tzinfo=timezone.utc).timestamp()
        self.add("msg-before-midnight", "u1", "user_message_sent", ts=now - 40 * 60)
        self.add("msg-after-midnight", "u1", "user_message_sent", ts=now - 20 * 60)
        self.add("call1", "u1", "ai_call", {"request_id": "r1", "status": "success"}, now - 19 * 60)
        self.add("call2", "u1", "ai_call", {"request_id": "r2", "status": "success"}, now - 18 * 60)

        with mock.patch.object(self.module.time, "time", return_value=now):
            day = self.module.compute_dashboard(1)
            week = self.module.compute_dashboard(7)

        self.assertEqual(day["overview"]["dau"], 1)
        self.assertEqual(day["overview"]["sessions_per_dau"], 1.0)
        self.assertEqual(day["overview"]["tools_per_dau"], 2.0)
        self.assertEqual(day["audience"]["avg_dau"], 1.0)
        self.assertEqual(day["overview"], week["overview"])

    def test_ingest_allow_list_drops_sensitive_properties_and_upgrades_payload(self):
        safe = self.module._safe_properties({"screen": "food", "symptoms": "secret", "cycle_date": "secret"})
        self.assertEqual(safe, {"screen": "food"})

    def test_dashboard_explains_data_sources_without_requiring_technical_terms(self):
        html = (ROOT / "stats" / "index.html").read_text()
        self.assertIn("Вся история", html)
        self.assertIn("Только точные v2", html)
        self.assertIn("могут быть неполными", html)
        self.assertIn("Точно записанные (observed)", html)
        self.assertIn("Восстановленные (reconstructed)", html)
        self.assertIn("Что считать «Tools»?", html)
        self.assertIn("в Overview как Tools / DAU", html)
        self.assertIn("Диагностика продукта и данных", html)

    def test_request_success_is_hidden_when_request_ids_are_missing(self):
        self.add("call", "u1", "ai_call", {"provider": "p", "model": "m", "status": "error"})

        data = self.module.compute_dashboard(1)

        self.assertEqual(data["ai"]["attempts"], 1)
        self.assertEqual(data["ai"]["requests"], 0)
        self.assertEqual(data["ai"]["untraced_attempts"], 1)
        self.assertIsNone(data["ai"]["request_success_rate"])
        tools = {x["id"]: x for x in data["tool_definitions"]}
        self.assertIsNone(tools["ai_provider_attempts"]["value"])
        self.assertIsNone(tools["logical_ai_requests"]["value"])
        self.assertEqual(tools["ai_provider_attempts"]["status"], "no_active_users")
        self.assertNotIn("tools_per_dau", data["overview"])
        self.assertEqual(data["errors"], 0)
        self.assertEqual(data["ai"]["providers"][0]["success"], 0)

    def test_tool_request_card_distinguishes_no_calls_from_missing_request_ids(self):
        data = self.module.compute_dashboard(1)
        tools = {x["id"]: x for x in data["tool_definitions"]}

        self.assertEqual(tools["logical_ai_requests"]["status"], "no_data")
        self.assertIsNone(tools["logical_ai_requests"]["value"])

    def test_push_action_requires_campaign_specific_target(self):
        now = time.time()
        self.add("checkin-sent", "u1", "push_sent",
                 {"campaign_id": "daily_checkin:2026-07-23", "campaign_type": "daily_checkin"}, now - 100)
        self.add("checkin-open", "u1", "push_opened",
                 {"campaign_id": "daily_checkin:2026-07-23", "campaign_type": "daily_checkin"}, now - 90)
        self.add("unrelated-meal", "u1", "meal_add_completed", ts=now - 80)
        self.add("food-sent", "u2", "push_sent",
                 {"campaign_id": "food_reminder:2026-07-23", "campaign_type": "food_reminder"}, now - 100)
        self.add("food-open", "u2", "push_opened",
                 {"campaign_id": "food_reminder:2026-07-23", "campaign_type": "food_reminder"}, now - 90)
        self.add("unrelated-chat", "u2", "assistant_response_received", ts=now - 80)

        before = self.module.compute_dashboard(1)
        self.assertEqual(before["push_funnel"]["acted"], 0)

        self.add("checkin-target", "u1", "checkin_completed", ts=now - 70)
        self.add("food-target", "u2", "meal_add_completed", ts=now - 70)
        after = self.module.compute_dashboard(1)
        self.assertEqual(after["push_funnel"]["acted"], 2)

    def test_activity_series_counts_user_messages_not_ai_messages(self):
        now = time.time()
        rows = [
            {"event_id": "u", "ts": now - 20, "device_id": "u1", "name": "user_message_sent",
             "raw_name": "user_message_sent", "properties": {}, "ingested_at": now,
             "provenance": "observed", "confidence": "high", "payload_version": 2},
            {"event_id": "a1", "ts": now - 15, "device_id": "u1", "name": "assistant_message_sent",
             "raw_name": "assistant_message_sent", "properties": {}, "ingested_at": now,
             "provenance": "observed", "confidence": "high", "payload_version": 2},
            {"event_id": "a2", "ts": now - 10, "device_id": "u1", "name": "assistant_message_sent",
             "raw_name": "assistant_message_sent", "properties": {}, "ingested_at": now,
             "provenance": "observed", "confidence": "high", "payload_version": 2},
        ]
        series = self.module._series(rows, 1, now, now - 30)
        self.assertEqual(sum(point["messages"] for point in series), 1)

    def test_observed_filter_recalculates_metrics_and_openrouter_credits_are_usd(self):
        now = time.time()
        self.add("fresh-user", "u1", "app_opened", ts=now - 30)
        self.add("legacy-user", "u2", "legacy_button", ts=now - 20, provenance="reconstructed")
        self.add("priced-call", "u1", "ai_call", {
            "request_id": "r-cost", "provider": "DeepInfra",
            "model": "openrouter/deepseek/deepseek-v4-flash", "status": "success",
            "reported_cost": 0.003, "cost_unit": "provider_credit",
            "input_tokens": 10, "output_tokens": 2, "total_tokens": 12,
        }, ts=now - 10)

        mixed = self.module.compute_dashboard(1, "mixed")
        exact = self.module.compute_dashboard(1, "observed")

        self.assertEqual(mixed["audience"]["ever_used"], 2)
        self.assertEqual(exact["audience"]["ever_used"], 1)
        self.assertEqual(exact["events"], 2)
        self.assertEqual(exact["data_quality"]["source_mode"], "observed")
        self.assertEqual(exact["data_quality"]["reconstructed_events"], 1)
        self.assertEqual(exact["ai"]["cost_usd"], 0.003)
        self.assertEqual(exact["data_quality"]["cost_coverage"], 100.0)
