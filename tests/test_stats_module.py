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
                 "purpose": "answer", "status": "http_429", "retry_index": 0,
                 "reported_cost": 99, "cost_unit": "TOK"}, now - 199)
        self.add("call2", "u1", "ai_call", {"request_id": "r1", "provider": "b", "model": "m",
                 "purpose": "answer", "status": "success", "retry_index": 1,
                 "input_tokens": 100, "output_tokens": 20,
                 "total_tokens": 120, "estimated_cost_usd": .002, "latency_ms": 500}, now - 198)
        self.add("old", "u2", "legacy_button", {"migration_batch": "b1"}, now - 1000, "reconstructed")

        with mock.patch.object(self.module.time, "time", return_value=now):
            data = self.module.compute_dashboard(1)

        self.assertEqual(len(data["primary"]), 6)
        self.assertEqual(data["ai"]["requests"], 1)
        self.assertEqual(data["ai"]["attempts"], 2)
        self.assertEqual(data["ai"]["successful_requests"], 1)
        self.assertEqual(data["ai"]["failed_attempts"], 1)
        self.assertEqual(data["ai"]["recovered_requests"], 1)
        self.assertEqual(data["ai"]["clean_successful_requests"], 0)
        self.assertEqual(data["ai"]["failure_classes"],
                         [{"name": "rate_limit", "attempts": 1, "share": 100.0}])
        self.assertEqual(data["ai"]["failure_routes"][0],
                         {"provider": "a", "model": "m", "status": "http_429", "attempts": 1})
        self.assertEqual(data["ai"]["failure_purposes"][0],
                         {"purpose": "answer", "failed": 1, "attempts": 2, "failure_rate": 50.0})
        self.assertEqual(data["ai"]["cost_usd"], .002)
        self.assertEqual(data["data_quality"]["mode"], "mixed")
        self.assertEqual(data["data_quality"]["reconstructed_events"], 1)
        self.assertEqual([x["value"] for x in data["funnel"]], [1, 1, 1, 1])
        self.assertEqual(data["funnel"][3]["label"], "Получили ответ AIWA")
        self.assertIn("подтверждённо отправила", data["funnel"][3]["help"])
        health = {x["label"]: x for x in data["product_health"]}
        self.assertEqual(health["Answer activation"]["value"], 100.0)
        self.assertEqual(health["Time to first answer p50"]["value"], 109)
        self.assertEqual(health["Fallback requests"]["value"], 100.0)
        self.assertTrue(all(x.get("help") for x in data["primary"]))
        self.assertEqual(data["answer_quality"]["helpful_rate"], 100.0)
        self.assertEqual(data["answer_quality"]["feedback_response_rate"], 100.0)
        self.assertEqual(data["answer_quality"]["safety"]["escalation"], 1)
        self.assertEqual(data["push_funnel"]["sent"], 1)
        self.assertEqual(data["push_funnel"]["opened"], 1)
        self.assertEqual(data["push_funnel"]["acted"], 1)
        self.assertEqual(data["push_funnel"]["action_eligible"], 1)
        self.assertEqual(data["value_delivery"]["immediate"]["users"], 1)
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
        overview_tool = tools["ai_provider_attempts"]
        self.assertTrue(overview_tool["selected_for_overview"])
        self.assertEqual((overview_tool["value"], overview_tool["numerator"],
                          overview_tool["denominator"]), (1.0, 2, 2))
        self.assertEqual(tools["logical_ai_requests"]["value"], 1.0)
        self.assertEqual(len(tools), 5)
        self.assertEqual(tools["actual_tool_executions"]["status"], "not_instrumented")
        self.assertEqual(tools["successful_tool_executions"]["status"], "not_instrumented")
        self.assertEqual(tools["useful_tool_outcomes"]["status"], "not_instrumented")
        self.assertEqual(data["overview"]["tools_per_dau"], 1.0)
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
        self.assertIn("Ошибки AI-маршрута", html)
        self.assertIn("Recovered request", html)
        self.assertIn("Terminal failure", html)
        self.assertIn("Attempt error rate", html)

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
        self.assertEqual(before["push_funnel"]["action_eligible"], 0)
        self.assertEqual(before["push_funnel"]["action_pending"], 2)

        self.add("checkin-target", "u1", "checkin_completed", ts=now - 70)
        self.add("food-target", "u2", "meal_add_completed", ts=now - 70)
        after = self.module.compute_dashboard(1)
        self.assertEqual(after["push_funnel"]["acted"], 2)

    def test_checkin_delayed_value_excludes_pending_and_tracks_next_summary(self):
        now = datetime(2026, 7, 23, 12, 0, tzinfo=timezone.utc).timestamp()
        self.add("mature-checkin", "u1", "checkin_completed", ts=now - 48 * 3600)
        self.add("followup-summary", "u1", "push_sent", {
            "campaign_id": "daily_summary:2026-07-22", "campaign_type": "daily_summary",
        }, now - 36 * 3600)
        self.add("followup-open", "u1", "push_opened", {
            "campaign_id": "daily_summary:2026-07-22", "campaign_type": "daily_summary",
        }, now - 35 * 3600)
        self.add("pending-checkin", "u2", "checkin_completed", ts=now - 2 * 3600)
        self.add("manual-checkin", "u3", "checkin_completed", ts=now - 48 * 3600)
        self.add("manual-summary", "u3", "summary_delivered", ts=now - 36 * 3600)

        with mock.patch.object(self.module.time, "time", return_value=now):
            data = self.module.compute_dashboard(7)

        delayed = data["value_delivery"]["delayed_checkin"]
        self.assertEqual(delayed["checkin_user_days"], 3)
        self.assertEqual(delayed["eligible_user_days"], 2)
        self.assertEqual(delayed["pending_user_days"], 1)
        self.assertEqual(delayed["summary_delivered_user_days"], 1)
        self.assertEqual(delayed["summary_opened_user_days"], 1)
        self.assertEqual(delayed["delivery_rate"], 50.0)
        self.assertEqual(delayed["open_eligible_user_days"], 1)
        self.assertEqual(delayed["open_pending_user_days"], 0)
        self.assertEqual(delayed["open_rate"], 100.0)

    def test_checkin_followup_is_one_to_one_and_uses_moscow_product_day(self):
        now = datetime(2026, 7, 25, 12, 0, tzinfo=timezone.utc).timestamp()
        first = datetime(2026, 7, 22, 22, 30, tzinfo=timezone.utc).timestamp()
        same_moscow_day = datetime(2026, 7, 23, 0, 30, tzinfo=timezone.utc).timestamp()
        next_day = datetime(2026, 7, 23, 22, 30, tzinfo=timezone.utc).timestamp()
        self.add("checkin-a", "u1", "checkin_completed", ts=first)
        self.add("checkin-a-duplicate-day", "u1", "checkin_completed", ts=same_moscow_day)
        self.add("checkin-b", "u1", "checkin_completed", ts=next_day)
        self.add("single-summary", "u1", "push_sent", {
            "campaign_id": "daily_summary:2026-07-24", "campaign_type": "daily_summary",
        }, next_day + 10 * 3600)

        with mock.patch.object(self.module.time, "time", return_value=now):
            delayed = self.module.compute_dashboard(7)["value_delivery"]["delayed_checkin"]

        self.assertEqual(delayed["checkin_user_days"], 2)
        self.assertEqual(delayed["delivery_eligible_user_days"], 2)
        self.assertEqual(delayed["summary_delivered_user_days"], 1)
        self.assertEqual(delayed["delivery_rate"], 50.0)

    def test_checkin_followups_use_fifo_and_campaign_specific_open(self):
        now = datetime(2026, 7, 25, 12, 0, tzinfo=timezone.utc).timestamp()
        checkin_a = datetime(2026, 7, 22, 17, 0, tzinfo=timezone.utc).timestamp()
        checkin_b = datetime(2026, 7, 23, 4, 0, tzinfo=timezone.utc).timestamp()
        summary_a = datetime(2026, 7, 23, 5, 0, tzinfo=timezone.utc).timestamp()
        summary_b = datetime(2026, 7, 24, 7, 0, tzinfo=timezone.utc).timestamp()
        self.add("checkin-a", "u1", "checkin_completed", ts=checkin_a)
        self.add("checkin-b", "u1", "checkin_completed", ts=checkin_b)
        self.add("summary-a", "u1", "push_sent", {
            "campaign_id": "daily_summary:a", "campaign_type": "daily_summary",
        }, summary_a)
        self.add("summary-b", "u1", "push_sent", {
            "campaign_id": "daily_summary:b", "campaign_type": "daily_summary",
        }, summary_b)
        self.add("open-only-b", "u1", "push_opened", {
            "campaign_id": "daily_summary:b", "campaign_type": "daily_summary",
        }, summary_b + 60)

        with mock.patch.object(self.module.time, "time", return_value=now):
            delayed = self.module.compute_dashboard(7)["value_delivery"]["delayed_checkin"]

        self.assertEqual(delayed["summary_delivered_user_days"], 2)
        self.assertEqual(delayed["summary_opened_user_days"], 1)
        self.assertEqual(delayed["delivery_rate"], 100.0)
        self.assertEqual(delayed["open_rate"], 50.0)

    def test_reconstructed_checkins_are_excluded_from_exact_delayed_value(self):
        now = datetime(2026, 7, 25, 12, 0, tzinfo=timezone.utc).timestamp()
        self.add("legacy-checkin", "u1", "checkin_completed", ts=now - 48 * 3600,
                 provenance="reconstructed")
        self.add("legacy-push", "u1", "push_sent", ts=now - 36 * 3600,
                 provenance="reconstructed")

        with mock.patch.object(self.module.time, "time", return_value=now):
            data = self.module.compute_dashboard(7, "mixed")
        delayed = data["value_delivery"]["delayed_checkin"]

        self.assertEqual(delayed["checkin_user_days"], 0)
        self.assertEqual(delayed["excluded_reconstructed_events"], 1)
        self.assertIsNone(delayed["delivery_rate"])
        self.assertEqual(data["engagement"]["checkins_completed"], 1)

    def test_fresh_pushes_remain_pending_until_attribution_window_closes(self):
        now = datetime(2026, 7, 23, 12, 0, tzinfo=timezone.utc).timestamp()
        self.add("fresh", "u1", "push_sent", {
            "campaign_id": "daily_summary:fresh", "campaign_type": "daily_summary",
        }, now - 100)
        self.add("mature", "u2", "push_sent", {
            "campaign_id": "daily_summary:mature", "campaign_type": "daily_summary",
        }, now - 25 * 3600)

        with mock.patch.object(self.module.time, "time", return_value=now):
            push = self.module.compute_dashboard(7)["push_funnel"]

        self.assertEqual(push["open_eligible"], 1)
        self.assertEqual(push["open_pending"], 1)
        self.assertEqual(push["open_rate"], 0.0)
        self.assertEqual(push["action_eligible"], 1)
        self.assertEqual(push["action_pending"], 1)
        self.assertEqual(push["action_rate"], 0.0)

    def test_push_failures_separate_attempts_deliveries_recipients_and_recovery(self):
        now = time.time()
        for index in range(8):
            self.add(f"blocked-{index}", "u1", "push_failed", {
                "campaign_id": "daily_summary:today", "campaign_type": "daily_summary",
                "delivery_status": "blocked",
            }, now - 100 + index)
        self.add("timeout", "u2", "push_failed", {
            "campaign_id": "food_reminder:today", "campaign_type": "food_reminder",
            "delivery_status": "error", "failure_class": "timeout", "retryable": True,
        }, now - 80)
        self.add("recover-fail", "u3", "push_failed", {
            "campaign_id": "daily_summary:retry", "campaign_type": "daily_summary",
            "delivery_status": "error", "failure_class": "network", "retryable": True,
        }, now - 70)
        self.add("recover-sent", "u3", "push_sent", {
            "campaign_id": "daily_summary:retry", "campaign_type": "daily_summary",
        }, now - 60)

        push = self.module.compute_dashboard(1)["push_funnel"]

        self.assertEqual(push["failed_attempts"], 10)
        self.assertEqual(push["failed"], 2)
        self.assertEqual(push["failed_recipients"], 2)
        self.assertEqual(push["recovered"], 1)
        self.assertEqual(push["attempts_per_failed_delivery"], 3.33)
        reasons = {item["id"]: item for item in push["failure_classes"]}
        self.assertEqual((reasons["blocked"]["deliveries"], reasons["blocked"]["attempts"]), (1, 8))
        self.assertEqual((reasons["timeout"]["deliveries"], reasons["timeout"]["attempts"]), (1, 1))

    def test_platform_breakdown_separates_bot_and_mini_app_without_claiming_os(self):
        now = time.time()
        self.add("bot", "u1", "user_message_sent", {"platform": "bot", "channel": "text"}, now - 20)
        self.add("web", "u1", "screen_viewed", {"platform": "webapp", "screen": "food"}, now - 15)
        self.add("web2", "u2", "app_opened", {"platform": "webapp"}, now - 10)

        platforms = self.module.compute_dashboard(1)["platforms"]
        items = {item["id"]: item for item in platforms["items"]}

        self.assertEqual((items["telegram_bot"]["users"], items["telegram_bot"]["events"]), (1, 1))
        self.assertEqual((items["mini_app"]["users"], items["mini_app"]["events"]), (2, 2))
        self.assertIn("iOS/Android/Desktop", platforms["help"])

    def test_proactive_without_product_target_does_not_report_zero_action_rate(self):
        now = time.time()
        self.add("push", "u1", "push_sent", {
            "campaign_id": "proactive_felt_bad:2026-07-23",
            "campaign_type": "proactive_felt_bad",
        }, now - 100)
        self.add("open", "u1", "push_opened", {
            "campaign_id": "proactive_felt_bad:2026-07-23",
            "campaign_type": "proactive_felt_bad",
        }, now - 90)

        data = self.module.compute_dashboard(1)
        campaign = data["push_funnel"]["campaigns"][0]

        self.assertEqual(campaign["id"], "proactive")
        self.assertEqual(campaign["open_rate"], 100.0)
        self.assertEqual(campaign["action_eligible"], 0)
        self.assertIsNone(campaign["action_rate"])
        self.assertIsNone(data["push_funnel"]["action_rate"])

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

        mixed = self.module.compute_dashboard(1, "MIXED")
        exact = self.module.compute_dashboard(1, "observed")

        self.assertEqual(mixed["audience"]["ever_used"], 2)
        self.assertEqual(exact["audience"]["ever_used"], 1)
        self.assertEqual(exact["events"], 2)
        self.assertEqual(exact["data_quality"]["source_mode"], "observed")
        self.assertEqual(exact["data_quality"]["reconstructed_events"], 1)
        self.assertEqual(exact["ai"]["cost_usd"], 0.003)
        self.assertEqual(exact["data_quality"]["cost_coverage"], 100.0)
        mixed_tool = next(x for x in mixed["tool_definitions"] if x["selected_for_overview"])
        exact_tool = next(x for x in exact["tool_definitions"] if x["selected_for_overview"])
        self.assertIn("всей доступной истории", mixed_tool["denominator_label"])
        self.assertIn("включая восстановленных", mixed_tool["help"])
        self.assertIn("точного v2-слоя", exact_tool["denominator_label"])
        self.assertIn("без восстановленных", exact_tool["help"])
