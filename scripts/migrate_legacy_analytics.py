#!/usr/bin/env python3
"""Reconstruct a minimal, privacy-safe analytics history from AIWA legacy data.

Dry-run is the default. ``--apply`` creates a SQLite backup before inserting
idempotent reconstructed events. It never copies messages, health fields,
cycle dates, symptoms, photos, audio, or raw Telegram IDs outside the DB.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import sqlite3
import sys
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import analytics_v2 as A2  # noqa: E402


def _iso(value: object) -> str | None:
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc).isoformat()
    except (TypeError, ValueError):
        return None


def _event_id(source: str, row_id: object) -> str:
    return "mig_" + hashlib.sha256(f"{source}:{row_id}".encode()).hexdigest()[:40]


def _legacy_shape(action: object, meta: object, tokens: object, calls: object) -> tuple[str, dict]:
    action_text = str(action or "unknown")
    name, screen = A2._legacy_event_name(action_text, meta)
    props: dict = {}
    confidence = "medium"
    if action_text == "tokens":
        name = "legacy_ai_usage"
        props["total_tokens"] = max(0, int(tokens or 0))
        props["token_precision"] = "total_only"
        confidence = "low"
    if screen:
        props["screen"] = screen
    if meta in {"text", "voice", "webapp", "food_photo", "food_text", "diary_reco"}:
        props["channel"] = meta
    if calls:
        props["calls"] = max(0, int(calls or 0))
    props.update({"provenance": "reconstructed", "confidence": confidence,
                  "source_schema": "legacy_events", "payload_version": 2})
    return name, props


def build_plan(conn: sqlite3.Connection, cutoff_arg: str | None, batch: str) -> dict:
    A2.init_schema(conn)
    cutoff = _iso(cutoff_arg) if cutoff_arg else conn.execute(
        "SELECT MIN(occurred_at) FROM events_v2"
    ).fetchone()[0]
    cutoff = _iso(cutoff)
    if not cutoff:
        raise SystemExit("No reliable v2 cutover found; pass --cutover explicitly")

    rows = conn.execute(
        "SELECT id,chat_id,ts,action,tokens,meta,calls FROM events WHERE ts < ? ORDER BY id", (cutoff,)
    ).fetchall()
    users = conn.execute(
        "SELECT chat_id,created FROM users WHERE created IS NOT NULL AND created < ? ORDER BY chat_id", (cutoff,)
    ).fetchall()
    candidates = []; invalid = 0
    for row_id, chat_id, ts, action, tokens, meta, calls in rows:
        occurred = _iso(ts)
        if not occurred:
            invalid += 1; continue
        name, props = _legacy_shape(action, meta, tokens, calls)
        props["migration_batch"] = batch
        candidates.append({"event_id": _event_id("events", row_id), "occurred_at": occurred,
                           "user_key": A2.user_key(chat_id), "name": name,
                           "source": "legacy_migration", "screen": props.get("screen"), "properties": props})
    for chat_id, created in users:
        occurred = _iso(created)
        if not occurred:
            invalid += 1; continue
        props = {"provenance": "reconstructed", "confidence": "medium",
                 "source_schema": "legacy_users", "payload_version": 2,
                 "migration_batch": batch}
        candidates.append({"event_id": _event_id("users", chat_id), "occurred_at": occurred,
                           "user_key": A2.user_key(chat_id), "name": "onboarding_started",
                           "source": "legacy_migration", "screen": None, "properties": props})

    existing = {r[0] for r in conn.execute(
        "SELECT event_id FROM events_v2 WHERE event_id LIKE 'mig_%'"
    )}
    pending = [x for x in candidates if x["event_id"] not in existing]
    counts = Counter(x["name"] for x in pending)
    return {"batch": batch, "cutover": cutoff, "legacy_rows_scanned": len(rows),
            "legacy_users_scanned": len(users), "invalid_timestamps": invalid,
            "already_migrated": len(candidates) - len(pending), "pending": pending,
            "event_counts": dict(sorted(counts.items())),
            "first_event": min((x["occurred_at"] for x in pending), default=None),
            "last_event": max((x["occurred_at"] for x in pending), default=None)}


def _backup(conn: sqlite3.Connection, db_path: Path, batch: str) -> Path:
    directory = db_path.parent / "backups"
    directory.mkdir(parents=True, exist_ok=True)
    target = directory / f"aiwa-before-analytics-{batch}.db"
    with sqlite3.connect(target) as dst:
        conn.backup(dst)
    return target


def apply_plan(conn: sqlite3.Connection, db_path: Path, plan: dict) -> Path:
    backup = _backup(conn, db_path, plan["batch"])
    with conn:
        for item in plan["pending"]:
            props_json = json.dumps(item["properties"], ensure_ascii=False, separators=(",", ":"))
            conn.execute(
                """INSERT OR IGNORE INTO events_v2(
                     event_id,occurred_at,user_key,event_name,source,screen,status,properties_json,dedupe_key)
                   VALUES(?,?,?,?,?,?,?,?,?)""",
                (item["event_id"], item["occurred_at"], item["user_key"], item["name"], item["source"],
                 item["screen"], "reconstructed", props_json, item["event_id"]),
            )
            A2._queue_traction(conn, item["event_id"], A2._epoch(item["occurred_at"]), item["user_key"],
                               item["name"], item["properties"], 2)
    return backup


def rollback(conn: sqlite3.Connection, batch: str) -> int:
    rows = conn.execute(
        "SELECT event_id FROM events_v2 WHERE json_extract(properties_json,'$.migration_batch')=? "
        "AND json_extract(properties_json,'$.provenance')='reconstructed'", (batch,)
    ).fetchall()
    ids = [r[0] for r in rows]
    with conn:
        conn.executemany("DELETE FROM traction_outbox WHERE event_id=?", [(x,) for x in ids])
        conn.executemany("DELETE FROM traction_sent WHERE event_id=?", [(x,) for x in ids])
        conn.executemany("DELETE FROM events_v2 WHERE event_id=?", [(x,) for x in ids])
    return len(ids)


def rollback_remote(url: str, token: str, batch: str) -> dict:
    endpoint = url.rstrip("/") + "/migration-batches/" + batch
    request = urllib.request.Request(endpoint, method="DELETE", headers={"X-Ingest-Token": token})
    with urllib.request.urlopen(request, timeout=20) as response:  # nosec B310 - operator-provided URL
        return json.loads(response.read())


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--db", default=os.environ.get("AIWA_DB", "/data/aiwa.db"))
    parser.add_argument("--cutover", help="first trustworthy v2 timestamp; auto-detected by default")
    parser.add_argument("--batch", default=datetime.now(timezone.utc).strftime("legacy-%Y%m%dT%H%M%SZ"))
    parser.add_argument("--apply", action="store_true")
    parser.add_argument("--rollback", metavar="BATCH")
    parser.add_argument("--remote-url", help="module base URL, used only with --rollback")
    parser.add_argument("--remote-token-env", default="AIWA_TRACTION_TOKEN")
    args = parser.parse_args()
    db_path = Path(args.db).resolve()
    if not db_path.exists():
        raise SystemExit(f"DB not found: {db_path}")
    conn = sqlite3.connect(db_path, timeout=30)
    try:
        A2.init_schema(conn)
        if args.rollback:
            removed = rollback(conn, args.rollback)
            result = {"mode": "rollback", "batch": args.rollback, "local_removed": removed}
            if args.remote_url:
                token = os.environ.get(args.remote_token_env, "")
                if not token: raise SystemExit(f"Missing {args.remote_token_env}")
                result["remote"] = rollback_remote(args.remote_url, token, args.rollback)
            print(json.dumps(result, ensure_ascii=False, indent=2)); return
        plan = build_plan(conn, args.cutover, args.batch)
        public = {k: v for k, v in plan.items() if k != "pending"}
        public["pending_events"] = len(plan["pending"])
        public["mode"] = "apply" if args.apply else "dry-run"
        if args.apply:
            public["backup"] = str(apply_plan(conn, db_path, plan))
        print(json.dumps(public, ensure_ascii=False, indent=2))
    finally:
        conn.close()


if __name__ == "__main__":
    main()
