#!/usr/bin/env python3
"""Emit a bounded AIWA staging DB snapshot for experiment deltas."""

import argparse
import json
import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path


def scalar(connection, sql, params=()):
    return connection.execute(sql, params).fetchone()[0]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--db", type=Path, required=True)
    parser.add_argument("--integrity-check", action="store_true")
    args = parser.parse_args()
    db = args.db.resolve()
    if str(db) != "/srv/aiwa-staging/data/aiwa.db":
        raise SystemExit(f"Refusing unexpected database path: {db}")
    connection = sqlite3.connect(f"file:{db}?mode=ro", uri=True, timeout=30)
    connection.row_factory = sqlite3.Row
    try:
        llm = dict(
            connection.execute(
                """SELECT
                       COUNT(*) AS calls,
                       SUM(CASE WHEN status='success' THEN 1 ELSE 0 END) AS success,
                       SUM(input_tokens) AS input_tokens,
                       SUM(output_tokens) AS output_tokens,
                       SUM(cached_tokens) AS cached_tokens,
                       SUM(total_tokens) AS total_tokens,
                       SUM(CASE WHEN cost_unit='usd'
                                THEN COALESCE(reported_cost,0) ELSE 0 END)
                           AS reported_cost_usd,
                       SUM(CASE WHEN reported_cost IS NULL THEN 1 ELSE 0 END)
                           AS calls_without_cost
                   FROM llm_calls"""
            ).fetchone()
        )
        groups = [
            dict(row)
            for row in connection.execute(
                """SELECT provider,model,purpose,status,
                          COUNT(*) AS calls,
                          SUM(input_tokens) AS input_tokens,
                          SUM(output_tokens) AS output_tokens,
                          SUM(cached_tokens) AS cached_tokens,
                          SUM(total_tokens) AS total_tokens,
                          SUM(CASE WHEN cost_unit='usd'
                                   THEN COALESCE(reported_cost,0) ELSE 0 END)
                              AS reported_cost_usd,
                          SUM(CASE WHEN reported_cost IS NULL THEN 1 ELSE 0 END)
                              AS calls_without_cost,
                          ROUND(AVG(latency_ms),2) AS avg_latency_ms,
                          MAX(latency_ms) AS max_latency_ms
                   FROM llm_calls
                   GROUP BY provider,model,purpose,status
                   ORDER BY provider,model,purpose,status"""
            )
        ]
        ai_job_status = {
            row["status"]: row["count"]
            for row in connection.execute(
                """SELECT status,COUNT(*) AS count
                   FROM ai_jobs GROUP BY status ORDER BY status"""
            )
        }
        ai_jobs = {
            "total": scalar(connection, "SELECT COUNT(*) FROM ai_jobs"),
            "active": scalar(
                connection,
                "SELECT COUNT(*) FROM ai_jobs WHERE status IN ('queued','running')",
            ),
            "queued": ai_job_status.get("queued", 0),
            "running": ai_job_status.get("running", 0),
            "completed": ai_job_status.get("completed", 0),
            "failed": ai_job_status.get("failed", 0),
            "rejected_events": scalar(
                connection,
                """SELECT COUNT(*) FROM events_v2
                   WHERE event_name='ai_job_status_changed'
                     AND properties_json LIKE '%"job_status":"rejected"%'""",
            ),
            "accepted_events": scalar(
                connection,
                """SELECT COUNT(*) FROM events_v2
                   WHERE event_name='ai_job_status_changed'
                     AND properties_json LIKE '%"job_status":"accepted"%'""",
            ),
            "deduped_events": scalar(
                connection,
                """SELECT COUNT(*) FROM events_v2
                   WHERE event_name='ai_job_status_changed'
                     AND properties_json LIKE '%"job_status":"deduped"%'""",
            ),
            "oldest_queued_seconds": scalar(
                connection,
                """SELECT COALESCE(MAX(0,(julianday('now')-julianday(MIN(created_at)))*86400),0)
                   FROM ai_jobs WHERE status='queued'""",
            ),
            "completed_last_60s": scalar(
                connection,
                """SELECT COUNT(*) FROM ai_jobs
                   WHERE status='completed'
                     AND julianday(finished_at)>=julianday('now','-60 seconds')""",
            ),
            "completed_last_300s": scalar(
                connection,
                """SELECT COUNT(*) FROM ai_jobs
                   WHERE status='completed'
                     AND julianday(finished_at)>=julianday('now','-300 seconds')""",
            ),
            "by_status": ai_job_status,
        }
        snapshot = {
            "captured_at": datetime.now(timezone.utc).isoformat(),
            "db": str(db),
            "files": {
                suffix or "db": (
                    os.path.getsize(str(db) + suffix)
                    if os.path.exists(str(db) + suffix)
                    else 0
                )
                for suffix in ("", "-wal", "-shm")
            },
            "users": scalar(connection, "SELECT COUNT(*) FROM users"),
            "synthetic_users": scalar(
                connection,
                "SELECT COUNT(*) FROM users WHERE chat_id>=?",
                (790_000_000_000,),
            ),
            "events": scalar(connection, "SELECT COUNT(*) FROM events"),
            "events_v2": scalar(connection, "SELECT COUNT(*) FROM events_v2"),
            "meals": scalar(connection, "SELECT COUNT(*) FROM meals"),
            "workouts": scalar(connection, "SELECT COUNT(*) FROM workouts"),
            "llm": llm,
            "llm_groups": groups,
            "ai_jobs": ai_jobs,
        }
        if args.integrity_check:
            snapshot["integrity_check"] = scalar(
                connection, "PRAGMA integrity_check"
            )
    finally:
        connection.close()
    print(json.dumps(snapshot, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
