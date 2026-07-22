"""Privacy-safe, append-only analytics storage for AIWA.

The legacy ``events`` table remains the source for the current dashboard while
the application dual-writes to these tables.  This makes the migration
additive and safe to roll back.
"""
import hashlib
import hmac
import json
import logging
import os
import sqlite3
import uuid
from datetime import datetime, timezone


log = logging.getLogger("aiwa.analytics")
_warned_salt = False


SCHEMA = (
    """CREATE TABLE IF NOT EXISTS events_v2(
        event_id TEXT PRIMARY KEY,
        occurred_at TEXT NOT NULL,
        user_key TEXT,
        event_name TEXT NOT NULL,
        source TEXT NOT NULL,
        screen TEXT,
        request_id TEXT,
        session_id TEXT,
        status TEXT,
        latency_ms INTEGER DEFAULT 0,
        properties_json TEXT NOT NULL DEFAULT '{}',
        app_version TEXT,
        dedupe_key TEXT UNIQUE
    )""",
    """CREATE TABLE IF NOT EXISTS llm_calls(
        call_id TEXT PRIMARY KEY,
        occurred_at TEXT NOT NULL,
        user_key TEXT,
        request_id TEXT,
        provider TEXT NOT NULL,
        model TEXT,
        purpose TEXT,
        status TEXT NOT NULL,
        latency_ms INTEGER DEFAULT 0,
        input_tokens INTEGER DEFAULT 0,
        output_tokens INTEGER DEFAULT 0,
        cached_tokens INTEGER DEFAULT 0,
        total_tokens INTEGER DEFAULT 0,
        retry_index INTEGER DEFAULT 0,
        fallback_from TEXT,
        reported_cost REAL,
        cost_unit TEXT,
        estimated_cost_usd REAL,
        meta_json TEXT NOT NULL DEFAULT '{}'
    )""",
    "CREATE INDEX IF NOT EXISTS ix_events_v2_time ON events_v2(occurred_at)",
    "CREATE INDEX IF NOT EXISTS ix_events_v2_user_time ON events_v2(user_key, occurred_at)",
    "CREATE INDEX IF NOT EXISTS ix_events_v2_name_time ON events_v2(event_name, occurred_at)",
    "CREATE INDEX IF NOT EXISTS ix_llm_calls_time ON llm_calls(occurred_at)",
    "CREATE INDEX IF NOT EXISTS ix_llm_calls_request ON llm_calls(request_id)",
    "CREATE INDEX IF NOT EXISTS ix_llm_calls_user_time ON llm_calls(user_key, occurred_at)",
)


def init_schema(conn):
    for statement in SCHEMA:
        conn.execute(statement)
    for column in ("reported_cost REAL", "cost_unit TEXT"):
        try:
            conn.execute("ALTER TABLE llm_calls ADD COLUMN " + column)
        except sqlite3.OperationalError:
            pass


def _analytics_secret():
    global _warned_salt
    value = os.environ.get("AIWA_ANALYTICS_SALT")
    if value:
        return value.encode("utf-8")
    # Stable compatibility fallback. Railway must receive a dedicated salt
    # before production deploy; changing it later starts a new analytics cohort.
    value = os.environ.get("BOT_TOKEN", "local-development-only")
    if not _warned_salt:
        log.warning("AIWA_ANALYTICS_SALT is not set; using compatibility fallback")
        _warned_salt = True
    return value.encode("utf-8")


def user_key(chat_id):
    if chat_id in (None, ""):
        return None
    digest = hmac.new(_analytics_secret(), str(chat_id).encode("utf-8"), hashlib.sha256).hexdigest()
    return "u_" + digest[:32]


def _source_for(action, meta):
    text = str(meta or "")
    if text.startswith("web_") or text.startswith("view_") or text == "app_open":
        return "webapp"
    if action in {"broadcast", "proactive", "reactivation"} or text.startswith("proactive"):
        return "push"
    if action in {"tokens", "error", "load"}:
        return "system"
    return "bot"


def _legacy_event_name(action, meta):
    text = str(meta or "")
    if text.startswith("view_"):
        return "screen_viewed", text[5:]
    if text == "app_open":
        return "app_opened", None
    if text == "food_log":
        return "meal_add_completed", None
    if text == "workout":
        return "workout_add_completed", None
    if text in {"checkin", "web_checkin", "ci:done"}:
        return "checkin_completed", None
    if text.startswith("ci:s:"):
        # The actual symptom is health data and intentionally not copied.
        return "checkin_symptom_selected", None
    if text.startswith("ci:"):
        return "checkin_updated", None
    if action == "answered":
        return "assistant_response_received", None
    if action in {"manual", "voice", "suggest"}:
        return "assistant_message_sent", None
    if action == "tokens":
        return "ai_usage_recorded", None
    return "legacy_" + str(action or "unknown")[:48], None


def insert_legacy_event(conn, chat_id, action, meta=None, latency_ms=0, app_version=None, request_id=None):
    event_name, screen = _legacy_event_name(action, meta)
    props = {}
    # Only coarse, explicitly safe dimensions are copied from legacy metadata.
    if meta in {"text", "voice", "webapp", "food_photo", "food_text", "diary_reco"}:
        props["channel"] = meta
    conn.execute(
        """INSERT INTO events_v2(event_id,occurred_at,user_key,event_name,source,screen,request_id,status,
                                  latency_ms,properties_json,app_version)
           VALUES(?,?,?,?,?,?,?,?,?,?,?)""",
        (str(uuid.uuid4()), datetime.now(timezone.utc).isoformat(), user_key(chat_id), event_name,
         _source_for(action, meta), screen, request_id, "success", int(latency_ms or 0),
         json.dumps(props, ensure_ascii=False, separators=(",", ":")), app_version),
    )


def delete_user(conn, chat_id):
    key = user_key(chat_id)
    conn.execute("DELETE FROM events_v2 WHERE user_key=?", (key,))
    conn.execute("DELETE FROM llm_calls WHERE user_key=?", (key,))


def persist_llm_call(db_path, record):
    """Usage sink registered by llm.py; failures never break a user response."""
    try:
        conn = sqlite3.connect(db_path, timeout=30)
        init_schema(conn)
        conn.execute(
            """INSERT INTO llm_calls(call_id,occurred_at,user_key,request_id,provider,model,purpose,status,
                                      latency_ms,input_tokens,output_tokens,cached_tokens,total_tokens,retry_index,
                                      fallback_from,reported_cost,cost_unit,estimated_cost_usd,meta_json)
               VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
            (record.get("call_id") or str(uuid.uuid4()), record.get("occurred_at") or datetime.now(timezone.utc).isoformat(),
             record.get("user_key"), record.get("request_id"), record.get("provider") or "unknown",
             record.get("model"), record.get("purpose"), record.get("status") or "unknown",
             int(record.get("latency_ms") or 0), int(record.get("input_tokens") or 0),
             int(record.get("output_tokens") or 0), int(record.get("cached_tokens") or 0),
             int(record.get("total_tokens") or 0), int(record.get("retry_index") or 0),
             record.get("fallback_from"), record.get("reported_cost"), record.get("cost_unit"),
             record.get("estimated_cost_usd"),
             json.dumps(record.get("meta") or {}, ensure_ascii=False, separators=(",", ":"))),
        )
        conn.commit()
        conn.close()
    except Exception as exc:
        log.warning("llm call analytics write failed: %s", exc)
