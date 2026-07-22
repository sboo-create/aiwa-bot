import importlib.util
import json
import os
import sqlite3
import tempfile
import time
import unittest
from pathlib import Path


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
        now = time.time()
        self.add("start", "u1", "onboarding_started", ts=now - 300)
        self.add("done", "u1", "onboarding_completed", ts=now - 250)
        self.add("msg", "u1", "assistant_message_sent", ts=now - 200)
        self.add("answer", "u1", "assistant_response_received", ts=now - 190)
        self.add("call1", "u1", "ai_call", {"request_id": "r1", "provider": "a", "model": "m",
                 "status": "error", "retry_index": 0, "reported_cost": 99, "cost_unit": "TOK"}, now - 199)
        self.add("call2", "u1", "ai_call", {"request_id": "r1", "provider": "b", "model": "m",
                 "status": "success", "retry_index": 1, "input_tokens": 100, "output_tokens": 20,
                 "total_tokens": 120, "estimated_cost_usd": .002, "latency_ms": 500}, now - 198)
        self.add("old", "u2", "legacy_button", {"migration_batch": "b1"}, now - 1000, "reconstructed")

        data = self.module.compute_dashboard(1)

        self.assertEqual(len(data["primary"]), 6)
        self.assertEqual(data["ai"]["requests"], 1)
        self.assertEqual(data["ai"]["attempts"], 2)
        self.assertEqual(data["ai"]["successful_requests"], 1)
        self.assertEqual(data["ai"]["failed_attempts"], 1)
        self.assertEqual(data["ai"]["cost_usd"], .002)
        self.assertEqual(data["data_quality"]["mode"], "mixed")
        self.assertEqual(data["data_quality"]["reconstructed_events"], 1)

        month = self.module.compute_dashboard(30)
        self.assertEqual(month["data_quality"]["available_days"], 1)
        self.assertEqual(month["audience"]["avg_dau"], 2.0)
        self.assertEqual(len(month["series"]), 1)
        self.assertEqual(month["primary"][2]["label"], "Avg DAU")

    def test_ingest_allow_list_drops_sensitive_properties_and_upgrades_payload(self):
        safe = self.module._safe_properties({"screen": "food", "symptoms": "secret", "cycle_date": "secret"})
        self.assertEqual(safe, {"screen": "food"})

    def test_request_success_is_hidden_when_request_ids_are_missing(self):
        self.add("call", "u1", "ai_call", {"provider": "p", "model": "m", "status": "error"})

        data = self.module.compute_dashboard(1)

        self.assertEqual(data["ai"]["attempts"], 1)
        self.assertEqual(data["ai"]["requests"], 0)
        self.assertEqual(data["ai"]["untraced_attempts"], 1)
        self.assertIsNone(data["ai"]["request_success_rate"])
        self.assertEqual(data["errors"], 0)
        self.assertEqual(data["ai"]["providers"][0]["success"], 0)
