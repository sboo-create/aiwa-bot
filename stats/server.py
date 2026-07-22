#!/usr/bin/env python3
"""Disrupt Analytics module for AIWA.

Receives pseudonymous, allow-listed events from the Railway worker and exposes
the canonical Overview contract used by stats.multitool.works.
"""
from __future__ import annotations

import json
import math
import os
import sqlite3
import threading
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path

import uvicorn
from fastapi import FastAPI, Request
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import FileResponse, JSONResponse


HERE = Path(__file__).resolve().parent
PORT = int(os.environ.get("STATS_PORT", "9904"))
DB_PATH = Path(os.environ.get("STATS_DB", HERE / "data" / "events.db"))
INGEST_TOKEN = os.environ.get("STATS_INGEST_TOKEN", "")
ALLOW_OPEN = os.environ.get("STATS_ALLOW_UNAUTHENTICATED_INGEST", "0") == "1"
VERSION_FILE = HERE / "VERSION"
VERSION = VERSION_FILE.read_text().strip() if VERSION_FILE.exists() else "dev"
SAFE_PROPERTIES = {"screen", "channel", "calls", "provider", "model", "purpose", "status"}
INACTIVE_NAMES = {"ai_call", "ai_usage_recorded", "user_deleted", "error", "legacy_error"}

app = FastAPI()
DB_PATH.parent.mkdir(parents=True, exist_ok=True)
_db = sqlite3.connect(DB_PATH, check_same_thread=False, timeout=30)
_db.execute("PRAGMA journal_mode=WAL")
_db.execute(
    "CREATE TABLE IF NOT EXISTS events("
    "event_id TEXT PRIMARY KEY, ts REAL NOT NULL, device_id TEXT NOT NULL, "
    "name TEXT NOT NULL, properties TEXT NOT NULL DEFAULT '{}')"
)
_db.execute("CREATE INDEX IF NOT EXISTS ix_events_ts ON events(ts)")
_db.execute("CREATE INDEX IF NOT EXISTS ix_events_device_ts ON events(device_id,ts)")
_db.execute("CREATE INDEX IF NOT EXISTS ix_events_name_ts ON events(name,ts)")
_db.commit()
DB_LOCK = threading.RLock()


def _no_store(value: object, status: int = 200) -> JSONResponse:
    return JSONResponse(value, status_code=status, headers={"Cache-Control": "no-store"})


def _is_active_name(name: str) -> bool:
    return name not in INACTIVE_NAMES and name not in {"legacy_tokens", "legacy_broadcast", "legacy_error"}


def active_ids(period_days: float) -> set[str]:
    cutoff = time.time() - period_days * 86400.0
    with DB_LOCK:
        return {
            device_id for device_id, name in _db.execute(
                "SELECT device_id,name FROM events WHERE ts>? AND device_id!=''", (cutoff,)
            ) if _is_active_name(name)
        }


def session_count(period_days: float = 1.0) -> int:
    cutoff = time.time() - period_days * 86400.0
    last: dict[str, float] = {}
    sessions = 0
    with DB_LOCK:
        for device_id, ts, name in _db.execute(
                "SELECT device_id,ts,name FROM events WHERE ts>? AND device_id!='' ORDER BY device_id,ts",
                (cutoff,)):
            if not _is_active_name(name):
                continue
            if device_id not in last or ts - last[device_id] > 1800:
                sessions += 1
            last[device_id] = ts
    return sessions


@app.get("/health")
def health() -> dict:
    return {"ok": True, "version": VERSION}


@app.post("/events")
async def ingest(request: Request) -> JSONResponse:
    if not INGEST_TOKEN and not ALLOW_OPEN:
        return _no_store({"error": "ingest is not configured"}, 503)
    if INGEST_TOKEN and request.headers.get("x-ingest-token") != INGEST_TOKEN:
        return _no_store({"error": "bad token"}, 401)
    try:
        body = json.loads(await request.body())
    except (json.JSONDecodeError, UnicodeDecodeError) as exc:
        return _no_store({"error": "bad json: " + str(exc)}, 400)
    events = body.get("events", [body]) if isinstance(body, dict) else body
    if not isinstance(events, list) or len(events) > 500:
        return _no_store({"error": "expected <=500 events"}, 400)
    envelope_device = body.get("device_id") if isinstance(body, dict) else None
    rows = []; deletions = []
    for item in events:
        if not isinstance(item, dict) or not item.get("name"):
            continue
        device_id = str(item.get("device_id") or envelope_device or "")[:80]
        if not device_id:
            continue
        name = str(item["name"])[:120]
        if name == "user_deleted":
            deletions.append(device_id); continue
        raw_props = item.get("properties") if isinstance(item.get("properties"), dict) else {}
        props = {key: raw_props[key] for key in SAFE_PROPERTIES if key in raw_props}
        rows.append((
            str(item.get("event_id") or uuid.uuid4())[:160],
            float(item.get("ts") or time.time()), device_id, name,
            json.dumps(props, ensure_ascii=False, separators=(",", ":")),
        ))

    def _write() -> None:
        with DB_LOCK:
            for device_id in deletions:
                _db.execute("DELETE FROM events WHERE device_id=?", (device_id,))
            _db.executemany("INSERT OR IGNORE INTO events VALUES(?,?,?,?,?)", rows)
            _db.commit()

    await run_in_threadpool(_write)
    return _no_store({"ok": True, "ingested": len(rows), "deleted": len(deletions)})


@app.get("/summary")
def summary(days: float = 1.0) -> JSONResponse:
    window_days = max(0.04, min(float(days), 365.0))
    since = time.time() - window_days * 86400.0
    with DB_LOCK:
        all_active = {
            device_id for device_id, name in _db.execute(
                "SELECT device_id,name FROM events WHERE device_id!=''"
            ) if _is_active_name(name)
        }
        dau_ids = active_ids(1); wau_ids = active_ids(7); mau_ids = active_ids(30)
        selected_ids = active_ids(window_days)
        selected_events = _db.execute("SELECT COUNT(*) FROM events WHERE ts>?", (since,)).fetchone()[0]
        errors = _db.execute(
            "SELECT COUNT(*) FROM events WHERE ts>? AND (name IN ('error','legacy_error') OR "
            "(name='ai_call' AND json_extract(properties,'$.status') NOT IN ('success','ok')))",
            (since,),
        ).fetchone()[0]
        sessions = session_count(1)
        tools = _db.execute("SELECT COUNT(*) FROM events WHERE ts>? AND name='ai_call'",
                            (time.time() - 86400.0,)).fetchone()[0]
    overview = {
        "ever_used": len(all_active), "dau": len(dau_ids), "wau": len(wau_ids), "mau": len(mau_ids),
        "sessions_per_dau": round(sessions / len(dau_ids), 2) if dau_ids else 0,
        "tools_per_dau": round(tools / len(dau_ids), 2) if dau_ids else 0,
    }
    label = "24h" if abs(window_days - 1) < 1e-9 else f"{window_days:g}d"
    return _no_store({
        "updated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "window_days": window_days,
        "installs": len(all_active), "dau": len(selected_ids), "events": selected_events, "errors": errors,
        "overview": overview,
        "metrics": [
            {"label": "Ever used", "value": str(len(all_active))},
            {"label": "Active, " + label, "value": str(len(selected_ids))},
            {"label": "Events, " + label, "value": str(selected_events)},
            {"label": "AI calls, 24h", "value": str(tools)},
            {"label": "Sessions, 24h", "value": str(sessions)},
            {"label": "Errors, " + label, "value": str(errors), "good": errors == 0},
        ],
    })


@app.get("/")
def dashboard() -> FileResponse:
    return FileResponse(HERE / "index.html")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=PORT)
