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
import re
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
    """CREATE TABLE IF NOT EXISTS traction_outbox(
        event_id TEXT PRIMARY KEY,
        occurred_at REAL NOT NULL,
        device_id TEXT NOT NULL,
        name TEXT NOT NULL,
        properties_json TEXT NOT NULL DEFAULT '{}',
        payload_version INTEGER NOT NULL DEFAULT 1
    )""",
    """CREATE TABLE IF NOT EXISTS traction_sent(
        event_id TEXT PRIMARY KEY,
        sent_at REAL NOT NULL,
        payload_version INTEGER NOT NULL DEFAULT 1
    )""",
    "CREATE INDEX IF NOT EXISTS ix_traction_outbox_time ON traction_outbox(occurred_at)",
)


def init_schema(conn):
    for statement in SCHEMA:
        conn.execute(statement)
    for column in ("reported_cost REAL", "cost_unit TEXT"):
        try:
            conn.execute("ALTER TABLE llm_calls ADD COLUMN " + column)
        except sqlite3.OperationalError:
            pass
    for table, column in (("traction_outbox", "payload_version INTEGER NOT NULL DEFAULT 1"),
                          ("traction_sent", "payload_version INTEGER NOT NULL DEFAULT 1")):
        try:
            conn.execute("ALTER TABLE " + table + " ADD COLUMN " + column)
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
    if text.startswith("web_") or text.startswith("view_") or text == "app_open" or text.endswith("|webapp"):
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
    if action == "signup":
        return "onboarding_started", None
    if action in {"activated", "onboarding_completed"}:
        return "onboarding_completed", None
    if action == "answered":
        return "assistant_response_received", None
    if action in {"manual", "voice", "suggest"}:
        return "assistant_message_sent", None
    if action == "tokens":
        return "ai_usage_recorded", None
    if action in {"broadcast", "proactive", "reactivation"}:
        if action == "proactive" and text.startswith("shadow:"):
            return "push_shadowed", None
        status = text.split("|", 1)[0]
        if status == "queued":
            return "push_queued", None
        if status in {"blocked", "error", "failed"} or status.endswith("_error"):
            return "push_failed", None
        return "push_sent", None
    if action == "push_open":
        return "push_opened", None
    if action == "feedback_prompt":
        return "answer_feedback_prompted", None
    if action == "feedback":
        return "answer_feedback_submitted", None
    if action == "safety":
        return "safety_guidance_shown", None
    if action == "flow_start" and text in {"food", "workout"}:
        return text + "_flow_started", None
    if action == "goal" and text == "summary":
        return "summary_opened", None
    if action == "goal" and text == "food_log":
        return "meal_add_completed", None
    if action == "goal" and text == "workout":
        return "workout_add_completed", None
    if action == "error":
        return "error", None
    return "legacy_" + str(action or "unknown")[:48], None


def _queue_traction(conn, event_id, occurred_at, device_id, name, properties=None, payload_version=2):
    if not device_id:
        return
    payload_version = max(1, int(payload_version or 1))
    sent = conn.execute("SELECT payload_version FROM traction_sent WHERE event_id=?", (event_id,)).fetchone()
    if sent and int(sent[0] or 1) >= payload_version:
        return
    conn.execute(
        """INSERT INTO traction_outbox(event_id,occurred_at,device_id,name,properties_json,payload_version)
           VALUES(?,?,?,?,?,?)
           ON CONFLICT(event_id) DO UPDATE SET
             occurred_at=excluded.occurred_at,
             device_id=excluded.device_id,
             name=excluded.name,
             properties_json=excluded.properties_json,
             payload_version=excluded.payload_version
           WHERE excluded.payload_version > traction_outbox.payload_version""",
        (event_id, float(occurred_at), device_id, name,
         json.dumps(properties or {}, ensure_ascii=False, separators=(",", ":")), payload_version),
    )


def _epoch(value):
    if isinstance(value, (int, float)):
        return float(value)
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00")).timestamp()
    except (TypeError, ValueError):
        return datetime.now(timezone.utc).timestamp()


def insert_legacy_event(conn, chat_id, action, meta=None, latency_ms=0, app_version=None,
                        request_id=None, calls=0):
    event_name, screen = _legacy_event_name(action, meta)
    text = str(meta or "")
    props = {}
    # Only coarse, explicitly safe dimensions are copied from legacy metadata.
    if meta in {"text", "voice", "webapp", "food_photo", "food_text", "diary_reco"}:
        props["channel"] = meta
    if calls:
        props["calls"] = max(0, int(calls))
    parts = str(meta or "").split("|")
    safe_id = lambda value, limit=80: re.sub(r"[^a-zA-Z0-9_.:-]", "", str(value or ""))[:limit]
    if action in {"broadcast", "proactive", "reactivation"}:
        status = safe_id(parts[0] if parts else "sent", 24) or "sent"
        campaign = safe_id(parts[1] if len(parts) > 1 else text, 80)
        if campaign:
            props["campaign_id"] = campaign
            props["campaign_type"] = campaign.split(":", 1)[0]
        props["delivery_status"] = status
    elif action == "push_open":
        campaign = safe_id(parts[0] if parts else "", 80)
        if campaign:
            props["campaign_id"] = campaign
            props["campaign_type"] = campaign.split(":", 1)[0]
    elif action == "feedback_prompt":
        answer_id = safe_id(parts[0] if parts else "", 40)
        if answer_id: props["answer_id"] = answer_id
    elif action == "feedback":
        rating = safe_id(parts[0] if parts else "", 12)
        answer_id = safe_id(parts[1] if len(parts) > 1 else "", 40)
        if rating in {"helpful", "unhelpful"}: props["rating"] = rating
        if answer_id: props["answer_id"] = answer_id
    elif action == "safety":
        level = safe_id(parts[0] if parts else "", 20)
        answer_id = safe_id(parts[1] if len(parts) > 1 else "", 40)
        if level in {"disclaimer", "escalation", "emergency"}: props["safety_level"] = level
        if answer_id: props["answer_id"] = answer_id
    event_id = str(uuid.uuid4())
    occurred = datetime.now(timezone.utc)
    key = user_key(chat_id)
    conn.execute(
        """INSERT INTO events_v2(event_id,occurred_at,user_key,event_name,source,screen,request_id,status,
                                  latency_ms,properties_json,app_version)
           VALUES(?,?,?,?,?,?,?,?,?,?,?)""",
        (event_id, occurred.isoformat(), key, event_name,
         _source_for(action, meta), screen, request_id, "success", int(latency_ms or 0),
         json.dumps(props, ensure_ascii=False, separators=(",", ":")), app_version),
    )
    external_props = dict(props)
    if screen: external_props["screen"] = screen
    external_props.update({"provenance": "observed", "confidence": "high",
                           "source_schema": "events_v2", "payload_version": 2})
    if request_id: external_props["request_id"] = request_id
    if latency_ms: external_props["latency_ms"] = int(latency_ms)
    if app_version: external_props["app_version"] = app_version
    _queue_traction(conn, event_id, occurred.timestamp(), key, event_name, external_props, 2)
    return event_id


def delete_user(conn, chat_id):
    key = user_key(chat_id)
    conn.execute("DELETE FROM events_v2 WHERE user_key=?", (key,))
    conn.execute("DELETE FROM llm_calls WHERE user_key=?", (key,))
    conn.execute("DELETE FROM traction_outbox WHERE device_id=?", (key,))
    deletion_id = "delete_" + str(uuid.uuid4())
    _queue_traction(conn, deletion_id, datetime.now(timezone.utc).timestamp(), key, "user_deleted")


def persist_llm_call(db_path, record):
    """Usage sink registered by llm.py; failures never break a user response."""
    conn = None
    try:
        conn = sqlite3.connect(db_path, timeout=30)
        init_schema(conn)
        call_id = record.get("call_id") or str(uuid.uuid4())
        occurred_at = record.get("occurred_at") or datetime.now(timezone.utc).isoformat()
        provider = record.get("provider") or "unknown"
        model = record.get("model")
        purpose = record.get("purpose")
        status = record.get("status") or "unknown"
        conn.execute(
            """INSERT INTO llm_calls(call_id,occurred_at,user_key,request_id,provider,model,purpose,status,
                                      latency_ms,input_tokens,output_tokens,cached_tokens,total_tokens,retry_index,
                                      fallback_from,reported_cost,cost_unit,estimated_cost_usd,meta_json)
               VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
            (call_id, occurred_at,
             record.get("user_key"), record.get("request_id"), provider,
             model, purpose, status,
             int(record.get("latency_ms") or 0), int(record.get("input_tokens") or 0),
             int(record.get("output_tokens") or 0), int(record.get("cached_tokens") or 0),
             int(record.get("total_tokens") or 0), int(record.get("retry_index") or 0),
             record.get("fallback_from"), record.get("reported_cost"), record.get("cost_unit"),
             record.get("estimated_cost_usd"),
             json.dumps(record.get("meta") or {}, ensure_ascii=False, separators=(",", ":"))),
        )
        _queue_traction(conn, "llm_" + call_id, _epoch(occurred_at), record.get("user_key"), "ai_call", {
            "provider": provider, "model": model, "purpose": purpose, "status": status,
            "request_id": record.get("request_id"),
            "latency_ms": int(record.get("latency_ms") or 0),
            "input_tokens": int(record.get("input_tokens") or 0),
            "output_tokens": int(record.get("output_tokens") or 0),
            "cached_tokens": int(record.get("cached_tokens") or 0),
            "total_tokens": int(record.get("total_tokens") or 0),
            "retry_index": int(record.get("retry_index") or 0),
            "fallback_from": record.get("fallback_from"),
            "reported_cost": record.get("reported_cost"),
            "cost_unit": record.get("cost_unit"),
            "estimated_cost_usd": record.get("estimated_cost_usd"),
            "provenance": "observed", "confidence": "high",
            "source_schema": "llm_calls", "payload_version": 2,
        }, 2)
        conn.commit()
    except Exception as exc:
        log.warning("llm call analytics write failed: %s", exc)
    finally:
        if conn is not None:
            conn.close()


def seed_traction_outbox(db_path):
    """Queue existing v2 history once; acknowledged ids are never re-queued."""
    conn = sqlite3.connect(db_path, timeout=30)
    try:
        init_schema(conn)
        for event_id, occurred_at, key, name, screen, props_json in conn.execute(
                "SELECT event_id,occurred_at,user_key,event_name,screen,properties_json FROM events_v2"):
            try: props = json.loads(props_json or "{}")
            except (TypeError, ValueError): props = {}
            if screen: props.setdefault("screen", screen)
            props.setdefault("provenance", "observed")
            props.setdefault("confidence", "high")
            props.setdefault("source_schema", "events_v2")
            props["payload_version"] = 2
            _queue_traction(conn, event_id, _epoch(occurred_at), key, name, props, 2)
        for row in conn.execute(
                """SELECT call_id,occurred_at,user_key,request_id,provider,model,purpose,status,
                          latency_ms,input_tokens,output_tokens,cached_tokens,total_tokens,retry_index,
                          fallback_from,reported_cost,cost_unit,estimated_cost_usd FROM llm_calls"""):
            (call_id, occurred_at, key, request_id, provider, model, purpose, status,
             latency_ms, input_tokens, output_tokens, cached_tokens, total_tokens, retry_index,
             fallback_from, reported_cost, cost_unit, estimated_cost_usd) = row
            _queue_traction(conn, "llm_" + call_id, _epoch(occurred_at), key, "ai_call", {
                "provider": provider, "model": model, "purpose": purpose, "status": status,
                "request_id": request_id, "latency_ms": int(latency_ms or 0),
                "input_tokens": int(input_tokens or 0), "output_tokens": int(output_tokens or 0),
                "cached_tokens": int(cached_tokens or 0), "total_tokens": int(total_tokens or 0),
                "retry_index": int(retry_index or 0), "fallback_from": fallback_from,
                "reported_cost": reported_cost, "cost_unit": cost_unit,
                "estimated_cost_usd": estimated_cost_usd,
                "provenance": "observed", "confidence": "high",
                "source_schema": "llm_calls", "payload_version": 2,
            }, 2)
        conn.commit()
    finally:
        conn.close()


def traction_batch(db_path, limit=200):
    conn = sqlite3.connect(db_path, timeout=30)
    try:
        init_schema(conn)
        rows = conn.execute(
            "SELECT event_id,occurred_at,device_id,name,properties_json,payload_version FROM traction_outbox "
            "ORDER BY occurred_at,event_id LIMIT ?", (max(1, min(int(limit), 500)),)
        ).fetchall()
    finally:
        conn.close()
    out = []
    for event_id, occurred_at, device_id, name, properties_json, payload_version in rows:
        try: properties = json.loads(properties_json or "{}")
        except (TypeError, ValueError): properties = {}
        properties.setdefault("payload_version", int(payload_version or 1))
        out.append({"event_id": event_id, "ts": occurred_at, "device_id": device_id,
                    "name": name, "properties": properties,
                    "payload_version": int(payload_version or 1)})
    return out


def traction_ack(db_path, event_ids):
    ids = [str(x) for x in event_ids if x]
    if not ids: return
    conn = sqlite3.connect(db_path, timeout=30)
    try:
        init_schema(conn); now = datetime.now(timezone.utc).timestamp()
        versions = {}
        for event_id in ids:
            row = conn.execute(
                "SELECT payload_version FROM traction_outbox WHERE event_id=?", (event_id,)
            ).fetchone()
            versions[event_id] = int(row[0] or 1) if row else 1
        conn.executemany(
            """INSERT INTO traction_sent(event_id,sent_at,payload_version) VALUES(?,?,?)
               ON CONFLICT(event_id) DO UPDATE SET sent_at=excluded.sent_at,
                 payload_version=MAX(traction_sent.payload_version,excluded.payload_version)""",
            [(event_id, now, int(versions.get(event_id, 1) or 1)) for event_id in ids])
        conn.executemany("DELETE FROM traction_outbox WHERE event_id=?", [(event_id,) for event_id in ids])
        conn.commit()
    finally:
        conn.close()
