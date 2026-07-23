from __future__ import annotations

import json
import os
import tempfile
import unittest
from datetime import datetime, timezone
from pathlib import Path
from unittest.mock import patch

_TEMP = tempfile.TemporaryDirectory()
os.environ["STATS_DB"] = str(Path(_TEMP.name) / "events.db")

import server  # noqa: E402


class CalendarOverviewTests(unittest.TestCase):
    def setUp(self) -> None:
        with server.DB_LOCK:
            server._db.execute("DELETE FROM events")
            server._db.commit()

    def add(self, event_id: str, ts: float, device: str, name: str) -> None:
        with server.DB_LOCK:
            server._db.execute(
                "INSERT INTO events("
                "event_id,ts,device_id,name,properties,ingested_at,"
                "provenance,confidence,payload_version"
                ") VALUES (?,?,?,?,?,?,?,?,?)",
                (
                    event_id,
                    ts,
                    device,
                    name,
                    json.dumps({"status": "success"} if name == "ai_call" else {}),
                    ts,
                    "observed",
                    "high",
                    2,
                ),
            )
            server._db.commit()

    def test_overview_uses_moscow_day_iso_week_and_calendar_month(self) -> None:
        now = datetime(2026, 7, 8, 12, 0, tzinfo=timezone.utc).timestamp()
        self.add(
            "today",
            datetime(2026, 7, 7, 21, 1, tzinfo=timezone.utc).timestamp(),
            "today",
            "app_opened",
        )
        self.add(
            "today-ai",
            datetime(2026, 7, 8, 8, 0, tzinfo=timezone.utc).timestamp(),
            "today",
            "ai_call",
        )
        self.add(
            "week",
            datetime(2026, 7, 6, 8, 0, tzinfo=timezone.utc).timestamp(),
            "week",
            "app_opened",
        )
        self.add(
            "month",
            datetime(2026, 7, 5, 8, 0, tzinfo=timezone.utc).timestamp(),
            "month",
            "app_opened",
        )
        self.add(
            "old",
            datetime(2026, 6, 30, 20, 59, tzinfo=timezone.utc).timestamp(),
            "old",
            "app_opened",
        )

        with patch("server.time.time", return_value=now):
            result = server.compute_dashboard(1)

        self.assertEqual(result["dau"], 1)
        self.assertEqual(result["overview"]["dau"], 1)
        self.assertEqual(result["overview"]["wau"], 2)
        self.assertEqual(result["overview"]["mau"], 3)
        self.assertEqual(result["overview"]["sessions_per_dau"], 1)
        self.assertEqual(result["overview"]["tools_per_dau"], 1)


if __name__ == "__main__":
    unittest.main()
