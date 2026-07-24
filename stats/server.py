#!/usr/bin/env python3
"""Privacy-safe product analytics module for AIWA.

The collector stores only a stable HMAC pseudonym, canonical event names and
an explicit allow-list of operational properties. Medical data, Telegram IDs,
messages, images and audio never cross this boundary.
"""
from __future__ import annotations

import json
import math
import os
import sqlite3
import threading
import time
import uuid
from collections import Counter, defaultdict, deque
from contextlib import asynccontextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

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
PRODUCT_TZ = ZoneInfo(os.environ.get("AIWA_TZ", "Europe/Moscow"))

SAFE_PROPERTIES = {
    "screen", "channel", "calls", "provider", "model", "purpose", "status",
    "request_id", "retry_index", "fallback_from", "latency_ms", "input_tokens",
    "output_tokens", "cached_tokens", "total_tokens", "reported_cost", "cost_unit",
    "estimated_cost_usd", "feature", "provenance", "confidence", "source_schema",
    "payload_version", "app_version", "migration_batch", "token_precision",
    "answer_id", "rating", "safety_level", "campaign_id", "campaign_type",
    "delivery_status", "failure_class", "retryable", "platform", "tool_name",
    "outcome_type",
}
NUMERIC_PROPERTIES = {
    "calls", "retry_index", "latency_ms", "input_tokens", "output_tokens",
    "cached_tokens", "total_tokens", "reported_cost", "estimated_cost_usd",
    "payload_version",
}
ALIASES = {
    "legacy_signup": "onboarding_started",
    "legacy_activated": "onboarding_completed",
}
SYSTEM_NAMES = {
    "ai_call", "ai_usage_recorded", "legacy_ai_usage", "user_deleted", "error",
    "legacy_error", "legacy_tokens", "legacy_broadcast", "push_sent", "push_queued", "push_shadowed",
    "push_failed", "push_opened", "answer_feedback_prompted",
    "answer_feedback_submitted", "safety_guidance_shown", "summary_delivered",
    "tool_execution_completed", "tool_outcome_completed",
}
SUCCESS = {"success", "ok", "completed"}
RESPONSE_NAMES = {"assistant_message_sent", "assistant_response_received"}
# Product decision 2026-07-23: value means that AIWA delivered an answer.
# Check-ins, meals, workouts and summary opens remain important product results,
# but do not silently redefine the activation/value KPI.
VALUE_NAMES = RESPONSE_NAMES
PRODUCT_ACTION_NAMES = {
    "user_message_sent", "checkin_updated", "checkin_symptom_selected", "checkin_completed",
    "food_flow_started", "meal_add_completed", "workout_flow_started", "workout_add_completed",
    "summary_opened", "feature_value_completed",
}
ENGAGEMENT_NAMES = VALUE_NAMES | {
    "user_message_sent", "assistant_message_sent", "app_opened", "screen_viewed", "checkin_updated",
}

PUSH_ACTION_TARGETS = {
    "daily_summary": {"summary_opened"},
    "daily_checkin": {"checkin_completed"},
    "food_reminder": {"meal_add_completed"},
    "train_reminder": {"workout_add_completed"},
    "proactive_low_protein": {"meal_add_completed"},
    "proactive_no_move": {"workout_add_completed"},
}


def _push_action_targets(campaign_type: str) -> set[str]:
    """Return only an explicitly defined target; unknown campaigns never claim conversion."""
    return PUSH_ACTION_TARGETS.get(campaign_type, set())

def _push_family(campaign_type: str) -> tuple[str, str]:
    if campaign_type == "daily_summary":
        return "daily_summary", "Утренняя сводка"
    if campaign_type.startswith("proactive_"):
        return "proactive", "Проактивное сообщение"
    return "other", "Прочие / старая логика"

def _push_target_label(targets: set[str]) -> str:
    labels = {
        "summary_opened": "открытие сводки",
        "checkin_completed": "сохранение чек-ина",
        "meal_add_completed": "запись еды",
        "workout_add_completed": "запись тренировки",
    }
    return ", ".join(labels.get(name, name) for name in sorted(targets))

def _push_failure_label(name: str) -> str:
    return {
        "blocked": "Пользователь заблокировал бота",
        "chat_not_found": "Чат не найден",
        "user_deactivated": "Telegram-аккаунт удалён",
        "rate_limit": "Лимит Telegram",
        "timeout": "Таймаут",
        "network": "Сетевая ошибка",
        "bad_request": "Некорректный запрос Telegram",
        "internal_or_unknown": "Внутренняя / неизвестная",
    }.get(name, name or "Не классифицировано")

def _push_failure_action(name: str) -> str:
    return {
        "blocked": "Исключён из фоновых очередей; входящее сообщение восстановит доставку",
        "chat_not_found": "Исключён из фоновых очередей до нового входящего сообщения",
        "user_deactivated": "Исключён из фоновых очередей",
        "rate_limit": "Временная: повторять по retry_after и следить за лимитом",
        "timeout": "Временная: ограниченный retry с backoff",
        "network": "Временная: ограниченный retry с backoff",
        "bad_request": "Проверить payload и формат конкретной кампании",
        "internal_or_unknown": "Проверить логи и добавить точную классификацию",
    }.get(name, "Проверить логи")

def _event_surface(row: dict[str, Any]) -> str:
    """Best available product surface; Telegram does not expose device OS here."""
    props = row["properties"]
    platform = str(props.get("platform") or "").lower()
    channel = str(props.get("channel") or "").lower()
    if platform == "webapp" or channel == "webapp" or props.get("screen"):
        return "mini_app"
    if platform == "bot" or channel in {"text", "voice", "food_photo", "food_text", "diary_reco"}:
        return "telegram_bot"
    # Reconstructed product events predate explicit platform tracking. Their
    # legacy bot handlers are the safest coarse attribution.
    if row["provenance"] != "observed":
        return "telegram_bot"
    return "unattributed"

def _is_delivered_answer(row: dict[str, Any]) -> bool:
    """Prefer the post-send event; reconstructed history may only have the legacy response event."""
    return (row["name"] == "assistant_message_sent" or
            (row["name"] == "assistant_response_received" and row["provenance"] != "observed"))


def _ai_failure_class(status: str) -> str:
    """Collapse transport-specific statuses into stable operator-facing buckets."""
    value = str(status or "unknown").strip().lower()
    if value in {"http_401", "http_403"}:
        return "auth"
    if value == "http_429":
        return "rate_limit"
    if value.startswith("http_5"):
        return "upstream_5xx"
    if value in {"http_400", "http_404", "http_409", "http_422"}:
        return "request_rejected"
    if "timeout" in value or value in {"timed_out", "deadline_exceeded"}:
        return "timeout"
    if value in {"empty_response", "invalid_response", "invalid_json"}:
        return "invalid_response"
    if value in {"error", "network_error", "connection_error"}:
        return "transport_or_unknown"
    return value or "unknown"


def _product_day(ts: float) -> str:
    return datetime.fromtimestamp(ts, PRODUCT_TZ).date().isoformat()


def _period_starts(now: float, days: float) -> tuple[float, dict[str, float]]:
    selected_days = max(1, min(int(math.ceil(float(days))), 365))
    current = datetime.fromtimestamp(now, PRODUCT_TZ)
    day_start = current.replace(hour=0, minute=0, second=0, microsecond=0)
    return float(selected_days), {
        "selected": (day_start - timedelta(days=selected_days - 1)).timestamp(),
        "dau": day_start.timestamp(),
        "wau": (day_start - timedelta(days=day_start.weekday())).timestamp(),
        "mau": day_start.replace(day=1).timestamp(),
    }


@asynccontextmanager
async def _lifespan(_app: FastAPI):
    # Pay the SQLite cold-read cost during service startup, not on the first
    # dashboard opened by a person. The function is resolved when startup runs,
    # after the module has finished defining it.
    try:
        await run_in_threadpool(_cached_dashboard, 1, "mixed")
    except Exception:
        pass
    yield


app = FastAPI(lifespan=_lifespan)
DB_PATH.parent.mkdir(parents=True, exist_ok=True)
_db = sqlite3.connect(DB_PATH, check_same_thread=False, timeout=30)
_db.execute("PRAGMA journal_mode=WAL")
_db.execute(
    "CREATE TABLE IF NOT EXISTS events("
    "event_id TEXT PRIMARY KEY, ts REAL NOT NULL, device_id TEXT NOT NULL, "
    "name TEXT NOT NULL, properties TEXT NOT NULL DEFAULT '{}', "
    "ingested_at REAL NOT NULL DEFAULT 0, provenance TEXT NOT NULL DEFAULT 'observed', "
    "confidence TEXT NOT NULL DEFAULT 'high', payload_version INTEGER NOT NULL DEFAULT 1)"
)
for _column in (
    "ingested_at REAL NOT NULL DEFAULT 0",
    "provenance TEXT NOT NULL DEFAULT 'observed'",
    "confidence TEXT NOT NULL DEFAULT 'high'",
    "payload_version INTEGER NOT NULL DEFAULT 1",
):
    try:
        _db.execute("ALTER TABLE events ADD COLUMN " + _column)
    except sqlite3.OperationalError:
        pass
_db.execute("CREATE INDEX IF NOT EXISTS ix_events_ts ON events(ts)")
_db.execute("CREATE INDEX IF NOT EXISTS ix_events_device_ts ON events(device_id,ts)")
_db.execute("CREATE INDEX IF NOT EXISTS ix_events_name_ts ON events(name,ts)")
_db.commit()
DB_LOCK = threading.RLock()
CACHE_LOCK = threading.RLock()
_EVENT_ROWS_CACHE: dict[str, Any] = {"changes": -1, "rows": None}
_DASHBOARD_CACHE: dict[tuple[int, str], tuple[float, dict[str, Any]]] = {}
DASHBOARD_CACHE_SECONDS = max(1.0, float(os.environ.get("STATS_DASHBOARD_CACHE_SECONDS", "15")))


def _no_store(value: object, status: int = 200, headers: dict[str, str] | None = None) -> JSONResponse:
    response_headers = {"Cache-Control": "no-store"}
    response_headers.update(headers or {})
    return JSONResponse(value, status_code=status, headers=response_headers)


def _canonical(name: str) -> str:
    return ALIASES.get(name, name)


def _is_active(name: str) -> bool:
    return _canonical(name) not in SYSTEM_NAMES


def _percent(n: float, d: float, digits: int = 1) -> float:
    return round(n * 100.0 / d, digits) if d else 0.0


def _pct(values: list[float], q: float) -> int:
    if not values:
        return 0
    values = sorted(values)
    return round(values[min(len(values) - 1, max(0, math.ceil(len(values) * q) - 1))])


def _safe_properties(raw: Any) -> dict[str, Any]:
    if not isinstance(raw, dict):
        return {}
    out: dict[str, Any] = {}
    for key in SAFE_PROPERTIES:
        if key not in raw or raw[key] is None:
            continue
        value = raw[key]
        if key in NUMERIC_PROPERTIES:
            if isinstance(value, (int, float)) and math.isfinite(float(value)):
                out[key] = value
        elif isinstance(value, (str, bool)):
            out[key] = value[:180] if isinstance(value, str) else value
    return out


def _event_rows() -> list[dict[str, Any]]:
    with DB_LOCK:
        changes = _db.total_changes
        with CACHE_LOCK:
            if (_EVENT_ROWS_CACHE["changes"] == changes and
                    _EVENT_ROWS_CACHE["rows"] is not None):
                return _EVENT_ROWS_CACHE["rows"]
        rows = _db.execute(
            "SELECT event_id,ts,device_id,name,properties,ingested_at,provenance,confidence,payload_version "
            "FROM events ORDER BY ts,event_id"
        ).fetchall()
    result = []
    for event_id, ts, device_id, name, props_json, ingested_at, provenance, confidence, version in rows:
        try:
            props = json.loads(props_json or "{}")
        except (TypeError, ValueError):
            props = {}
        result.append({
            "event_id": event_id, "ts": float(ts), "device_id": device_id,
            "name": _canonical(name), "raw_name": name, "properties": props,
            "ingested_at": float(ingested_at or 0),
            "provenance": props.get("provenance") or provenance or "observed",
            "confidence": props.get("confidence") or confidence or "high",
            "payload_version": int(props.get("payload_version") or version or 1),
        })
    with CACHE_LOCK:
        _EVENT_ROWS_CACHE["changes"] = changes
        _EVENT_ROWS_CACHE["rows"] = result
    return result


def _active_ids(rows: list[dict[str, Any]], cutoff: float, until: float) -> set[str]:
    return {
        r["device_id"]
        for r in rows
        if cutoff <= r["ts"] <= until and _is_active(r["name"])
    }


def _sessions(
    rows: list[dict[str, Any]], cutoff: float, until: float
) -> tuple[int, list[float], list[int]]:
    by_user: dict[str, list[float]] = defaultdict(list)
    for row in rows:
        if cutoff <= row["ts"] <= until and _is_active(row["name"]):
            by_user[row["device_id"]].append(row["ts"])
    count = 0; lengths: list[float] = []; events: list[int] = []
    for timestamps in by_user.values():
        timestamps.sort(); start = prev = timestamps[0]; n = 1
        for ts in timestamps[1:]:
            if ts - prev > 1800:
                count += 1; lengths.append(prev - start); events.append(n)
                start = ts; n = 0
            prev = ts; n += 1
        count += 1; lengths.append(prev - start); events.append(n)
    return count, lengths, events


def _feature(row: dict[str, Any]) -> str | None:
    name = row["name"]; props = row["properties"]; screen = props.get("screen")
    if name in {"user_message_sent", "assistant_message_sent", "assistant_response_received"} or screen == "chat": return "Чат с AIWA"
    if name.startswith("checkin_") or screen == "today": return "Сегодня / чек-ин"
    if name == "meal_add_completed" or screen == "food": return "Питание"
    if name == "workout_add_completed" or screen == "train": return "Нагрузка"
    if screen == "stats": return "Статистика цикла"
    if name == "app_opened" or name == "screen_viewed": return "Mini App"
    if props.get("channel") == "voice" or name == "legacy_voice": return "Голос"
    return props.get("feature")


def _retention(rows: list[dict[str, Any]]) -> dict[str, Any]:
    active_days: dict[str, set[str]] = defaultdict(set)
    for row in rows:
        if _is_active(row["name"]):
            active_days[row["device_id"]].add(_product_day(row["ts"]))
    today = datetime.now(PRODUCT_TZ).date()
    out: dict[str, Any] = {}
    for horizon in (1, 7, 30):
        eligible = 0; returned = 0
        for days in active_days.values():
            dates = sorted(datetime.fromisoformat(d).date() for d in days)
            first = dates[0]
            if (today - first).days < horizon:
                continue
            eligible += 1
            if any((d - first).days >= horizon for d in dates[1:]):
                returned += 1
        out[f"d{horizon}"] = {"rate": _percent(returned, eligible), "eligible": eligible, "returned": returned}
    return out


def _series(rows: list[dict[str, Any]], days: float, now: float, available_start: float | None) -> list[dict[str, Any]]:
    result = []
    if available_start is None:
        return result
    if days <= 1.1:
        _, starts = _period_starts(now, 1)
        start = max(starts["dau"], available_start)
        start = math.floor(start / 3600) * 3600
        buckets = max(1, math.ceil((now - start) / 3600))
        for i in range(buckets):
            lo = start + i * 3600; hi = min(now + 1, lo + 3600)
            chunk = [r for r in rows if lo <= r["ts"] < hi]
            result.append({
                "label": datetime.fromtimestamp(lo, PRODUCT_TZ).strftime("%H:00"),
                "active": len({r["device_id"] for r in chunk if _is_active(r["name"])}),
                "messages": sum(r["name"] == "user_message_sent" for r in chunk),
                "ai_calls": sum(r["name"] == "ai_call" for r in chunk),
            })
        return result
    span = max(1, int(math.ceil(days)))
    today = datetime.fromtimestamp(now, PRODUCT_TZ).date()
    first = max(
        today - timedelta(days=span - 1),
        datetime.fromtimestamp(available_start, PRODUCT_TZ).date(),
    )
    day = first
    while day <= today:
        lo = datetime.combine(day, datetime.min.time(), PRODUCT_TZ).timestamp()
        hi = datetime.combine(day + timedelta(days=1), datetime.min.time(), PRODUCT_TZ).timestamp()
        chunk = [r for r in rows if lo <= r["ts"] < hi]
        result.append({
            "label": day.strftime("%d.%m"),
            "active": len({r["device_id"] for r in chunk if _is_active(r["name"])}),
            "messages": sum(r["name"] == "user_message_sent" for r in chunk),
            "ai_calls": sum(r["name"] == "ai_call" for r in chunk),
        })
        day += timedelta(days=1)
    return result


def compute_dashboard(days: float = 1.0, source: str = "mixed") -> dict[str, Any]:
    now = time.time()
    window_days, period_starts = _period_starts(now, days)
    since = period_starts["selected"]
    source_mode = "observed" if str(source).lower() == "observed" else "mixed"
    all_rows = _event_rows()
    rows = ([r for r in all_rows if r["provenance"] == "observed"]
            if source_mode == "observed" else all_rows)
    selected = [r for r in rows if since <= r["ts"] <= now]
    data_start = min((r["ts"] for r in rows), default=None)
    available_start = max(since, data_start) if data_start is not None else None
    requested_days = max(1, int(math.ceil(window_days)))
    available_days = (min(requested_days,
                          (datetime.fromtimestamp(now, PRODUCT_TZ).date() -
                           datetime.fromtimestamp(available_start, PRODUCT_TZ).date()).days + 1)
                      if available_start is not None else 0)
    active_selected = [r for r in selected if _is_active(r["name"])]
    ever_ids = {r["device_id"] for r in rows if _is_active(r["name"])}
    selected_ids = {r["device_id"] for r in active_selected}
    dau_ids = _active_ids(rows, period_starts["dau"], now)
    wau_ids = _active_ids(rows, period_starts["wau"], now)
    mau_ids = _active_ids(rows, period_starts["mau"], now)

    daily_users: dict[str, set[str]] = defaultdict(set)
    for row in active_selected:
        daily_users[_product_day(row["ts"])].add(row["device_id"])
    active_user_days = sum(len(v) for v in daily_users.values())
    sessions, session_lengths, session_events = _sessions(rows, since, now)
    messages = sum(r["name"] == "user_message_sent" for r in selected)
    responses = sum(_is_delivered_answer(r) for r in selected)

    ai_rows = [r for r in selected if r["name"] == "ai_call"]
    requests: dict[str, list[dict[str, Any]]] = defaultdict(list)
    providers: dict[str, Counter] = defaultdict(Counter); models: dict[str, Counter] = defaultdict(Counter)
    latencies: list[float] = []; input_tokens = output_tokens = cached_tokens = total_tokens = 0
    token_covered = request_covered = model_covered = 0; cost_usd = 0.0; cost_covered = 0
    for row in ai_rows:
        p = row["properties"]; request_id = p.get("request_id")
        if request_id:
            requests[str(request_id)].append(row)
        status = str(p.get("status") or "unknown"); provider = str(p.get("provider") or "unknown"); model = str(p.get("model") or "unknown")
        providers[provider]["calls"] += 1; models[model]["calls"] += 1
        if status in SUCCESS:
            providers[provider]["success"] += 1; models[model]["success"] += 1
            latency = float(p.get("latency_ms") or 0)
            if latency > 0: latencies.append(latency)
        if request_id: request_covered += 1
        if p.get("model"): model_covered += 1
        if "input_tokens" in p and "output_tokens" in p:
            token_covered += 1
            input_tokens += int(p.get("input_tokens") or 0); output_tokens += int(p.get("output_tokens") or 0)
            cached_tokens += int(p.get("cached_tokens") or 0); total_tokens += int(p.get("total_tokens") or 0)
        raw_cost = p.get("estimated_cost_usd")
        cost_unit = str(p.get("cost_unit") or "").strip().lower()
        openrouter_credit = (cost_unit == "provider_credit" and
                             str(p.get("model") or "").strip().lower().startswith("openrouter/"))
        if raw_cost is None and (cost_unit in {"usd", "$"} or openrouter_credit):
            raw_cost = p.get("reported_cost")
        if isinstance(raw_cost, (int, float)):
            cost_covered += 1; cost_usd += float(raw_cost)
    successful_requests = sum(any(str(r["properties"].get("status") or "") in SUCCESS for r in rr) for rr in requests.values())
    failed_requests = len(requests) - successful_requests
    fallback_requests = sum(len({str(r["properties"].get("provider") or "") for r in rr}) > 1 or
                            any(int(r["properties"].get("retry_index") or 0) > 0 for r in rr) for rr in requests.values())
    failed_ai_rows = [
        r for r in ai_rows
        if str(r["properties"].get("status") or "") not in SUCCESS
    ]
    failed_attempts = len(failed_ai_rows)
    recovered_requests = sum(
        any(str(r["properties"].get("status") or "") not in SUCCESS for r in rr)
        and any(str(r["properties"].get("status") or "") in SUCCESS for r in rr)
        for rr in requests.values()
    )
    clean_successful_requests = sum(
        all(str(r["properties"].get("status") or "") in SUCCESS for r in rr)
        for rr in requests.values()
    )
    failure_statuses: Counter = Counter()
    failure_classes: Counter = Counter()
    failure_routes: Counter = Counter()
    purpose_attempts: Counter = Counter()
    purpose_failures: Counter = Counter()
    for row in ai_rows:
        props = row["properties"]
        purpose = str(props.get("purpose") or "unknown")
        purpose_attempts[purpose] += 1
    for row in failed_ai_rows:
        props = row["properties"]
        status = str(props.get("status") or "unknown")
        provider = str(props.get("provider") or "unknown")
        model = str(props.get("model") or "unknown")
        purpose = str(props.get("purpose") or "unknown")
        failure_statuses[status] += 1
        failure_classes[_ai_failure_class(status)] += 1
        failure_routes[(provider, model, status)] += 1
        purpose_failures[purpose] += 1
    explicit_errors = sum(r["name"] in {"error", "legacy_error"} for r in selected)
    pushes = [r for r in selected if r["name"] in {"push_sent", "legacy_broadcast"}]
    all_checkins = [r for r in selected if r["name"] == "checkin_completed"]
    exact_checkins = [r for r in all_checkins if r["provenance"] == "observed"]
    reconstructed_checkins = [
        r for r in all_checkins if r["provenance"] != "observed"
    ]

    feature_users: dict[str, set[str]] = defaultdict(set); feature_events = Counter()
    for row in active_selected:
        feature = _feature(row)
        if feature:
            feature_users[feature].add(row["device_id"]); feature_events[feature] += 1
    features = sorted(({"name": name, "users": len(users), "events": feature_events[name],
                        "adoption": _percent(len(users), len(selected_ids))}
                       for name, users in feature_users.items()), key=lambda x: (-x["users"], x["name"]))
    surface_users: dict[str, set[str]] = defaultdict(set)
    surface_user_days: dict[str, set[tuple[str, str]]] = defaultdict(set)
    surface_events: Counter = Counter()
    for item in active_selected:
        surface = _event_surface(item)
        surface_users[surface].add(item["device_id"])
        surface_user_days[surface].add((item["device_id"], _product_day(item["ts"])))
        surface_events[surface] += 1
    surface_labels = {
        "telegram_bot": "Telegram-бот",
        "mini_app": "Mini App",
        "unattributed": "Не определено",
    }
    platform_breakdown = [
        {
            "id": surface,
            "name": surface_labels[surface],
            "users": len(surface_users[surface]),
            "user_days": len(surface_user_days[surface]),
            "events": surface_events[surface],
            "share": _percent(len(surface_users[surface]), len(selected_ids)),
        }
        for surface in ("telegram_bot", "mini_app", "unattributed")
        if surface_events[surface]
    ]

    def _feature_funnel(label: str, start_names: set[str], done_names: set[str], help_text: str,
                        done_predicate=None) -> dict[str, Any]:
        started_at: dict[str, float] = {}
        for item in selected:
            if item["name"] in start_names:
                started_at.setdefault(item["device_id"], item["ts"])
        completed = 0
        for user, start_ts in started_at.items():
            if any(item["device_id"] == user and item["ts"] >= start_ts
                   and ((done_predicate(item) if done_predicate else item["name"] in done_names))
                   for item in selected):
                completed += 1
        return {"label": label, "started": len(started_at), "completed": completed,
                "rate": _percent(completed, len(started_at)) if started_at else None, "help": help_text}

    has_reconstructed_answers = any(
        _is_delivered_answer(item) and item["provenance"] != "observed" for item in selected
    )
    answer_delivery_help = (
        "Из написавших AIWA: получили ответ. В восстановленной истории это приблизительный "
        "legacy-сигнал до отправки; в точном v2-слое — подтверждённая отправка в Telegram."
        if has_reconstructed_answers else
        "Из написавших AIWA: получили подтверждённо отправленный ответ. "
        "Считаются уникальные люди, а не сообщения."
    )
    feature_funnels = [
        _feature_funnel("Чат с AIWA", {"user_message_sent"},
                        {"assistant_message_sent", "assistant_response_received", "answer_feedback_prompted"},
                        answer_delivery_help,
                        lambda item: (_is_delivered_answer(item)
                                      or item["name"] == "answer_feedback_prompted")),
        _feature_funnel("Ежедневный чек-ин", {"checkin_updated", "checkin_symptom_selected"},
                        {"checkin_completed"},
                        "В боте завершение — кнопка «Готово»; в mini app — успешное сохранение любого выбранного поля."),
        _feature_funnel("Питание", {"food_flow_started"}, {"meal_add_completed"},
                        "Из начавших добавление еды: сохранили приём пищи. Событие старта собирается с новой версии."),
        _feature_funnel("Нагрузка", {"workout_flow_started"}, {"workout_add_completed"},
                        "Из начавших добавление тренировки: сохранили тренировку. Событие старта собирается с новой версии."),
    ]

    prompt_rows = [item for item in selected if item["name"] == "answer_feedback_prompted"]
    prompt_ids = {str(item["properties"].get("answer_id") or item["event_id"]) for item in prompt_rows}
    latest_feedback: dict[str, dict[str, Any]] = {}
    for item in selected:
        if item["name"] != "answer_feedback_submitted":
            continue
        answer_id = str(item["properties"].get("answer_id") or "")
        if answer_id and answer_id in prompt_ids:
            latest_feedback[answer_id] = item
    helpful = sum(item["properties"].get("rating") == "helpful" for item in latest_feedback.values())
    unhelpful = sum(item["properties"].get("rating") == "unhelpful" for item in latest_feedback.values())
    rated = helpful + unhelpful
    safety_counts = Counter(str(item["properties"].get("safety_level") or "unknown") for item in selected
                            if item["name"] == "safety_guidance_shown")
    answer_quality = {
        "eligible_answers": len(prompt_ids), "rated_answers": rated,
        "feedback_response_rate": _percent(rated, len(prompt_ids)) if prompt_ids else None,
        "helpful": helpful, "unhelpful": unhelpful,
        "helpful_rate": _percent(helpful, rated) if rated else None,
        "safety": {"total": sum(safety_counts.values()), "disclaimer": safety_counts["disclaimer"],
                   "escalation": safety_counts["escalation"], "emergency": safety_counts["emergency"]},
    }

    sent_by_key: dict[tuple[str, str], dict[str, Any]] = {}
    opened_by_key: dict[tuple[str, str], list[dict[str, Any]]] = defaultdict(list)
    failed_by_key: dict[tuple[str, str], list[dict[str, Any]]] = defaultdict(list)
    events_by_user: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for item in selected:
        events_by_user[item["device_id"]].append(item)
        campaign = str(item["properties"].get("campaign_id") or "")
        if not campaign:
            continue
        key = (item["device_id"], campaign)
        if item["name"] == "push_sent":
            if key not in sent_by_key or item["ts"] < sent_by_key[key]["ts"]:
                sent_by_key[key] = item
        elif item["name"] == "push_opened":
            opened_by_key[key].append(item)
        elif item["name"] == "push_failed":
            failed_by_key[key].append(item)
    push_campaigns: dict[str, Counter] = defaultdict(Counter)
    push_campaign_labels: dict[str, str] = {}
    push_campaign_targets: dict[str, set[str]] = defaultdict(set)
    push_opened = push_open_eligible = push_open_pending = 0
    push_acted = push_action_eligible = push_action_pending = 0
    for key, sent_item in sent_by_key.items():
        user, campaign = key; campaign_type = str(sent_item["properties"].get("campaign_type") or campaign.split(":", 1)[0])
        family, family_label = _push_family(campaign_type)
        targets = _push_action_targets(campaign_type)
        push_campaign_labels[family] = family_label
        push_campaign_targets[family].update(targets)
        push_campaigns[family]["sent"] += 1
        opens = [item for item in opened_by_key.get(key, []) if sent_item["ts"] <= item["ts"] <= sent_item["ts"] + 86400]
        if not opens:
            if sent_item["ts"] + 86400 <= now:
                push_open_eligible += 1
                push_campaigns[family]["open_eligible"] += 1
            else:
                push_open_pending += 1
                push_campaigns[family]["open_pending"] += 1
            if targets:
                if sent_item["ts"] + 86400 <= now:
                    push_action_eligible += 1
                    push_campaigns[family]["action_eligible"] += 1
                else:
                    push_action_pending += 1
                    push_campaigns[family]["action_pending"] += 1
            continue
        push_opened += 1; push_open_eligible += 1
        push_campaigns[family]["opened"] += 1
        push_campaigns[family]["open_eligible"] += 1
        opened_at = min(item["ts"] for item in opens)
        acted = bool(targets) and any(item["name"] in targets and opened_at <= item["ts"] <= opened_at + 86400
                                      for item in events_by_user[user])
        if acted:
            push_acted += 1; push_action_eligible += 1
            push_campaigns[family]["acted"] += 1
            push_campaigns[family]["action_eligible"] += 1
        elif targets and opened_at + 86400 <= now:
            push_action_eligible += 1
            push_campaigns[family]["action_eligible"] += 1
        elif targets:
            push_action_pending += 1
            push_campaigns[family]["action_pending"] += 1
    push_failure_attempts = sum(len(items) for items in failed_by_key.values())
    terminal_failure_keys: set[tuple[str, str]] = set()
    recovered_failure_keys: set[tuple[str, str]] = set()
    failure_attempt_classes: Counter = Counter()
    failure_delivery_classes: Counter = Counter()
    for key, failures in failed_by_key.items():
        latest_failure = max(item["ts"] for item in failures)
        sent_item = sent_by_key.get(key)
        if sent_item and sent_item["ts"] >= latest_failure:
            recovered_failure_keys.add(key)
        else:
            terminal_failure_keys.add(key)
        for item in failures:
            props = item["properties"]
            failure_class = str(props.get("failure_class") or "")
            if not failure_class:
                failure_class = ("blocked" if props.get("delivery_status") == "blocked"
                                 else "internal_or_unknown")
            failure_attempt_classes[failure_class] += 1
        if key in terminal_failure_keys:
            latest = max(failures, key=lambda item: item["ts"])
            props = latest["properties"]
            failure_class = str(props.get("failure_class") or "")
            if not failure_class:
                failure_class = ("blocked" if props.get("delivery_status") == "blocked"
                                 else "internal_or_unknown")
            failure_delivery_classes[failure_class] += 1
            campaign_type = str(
                props.get("campaign_type") or key[1].split(":", 1)[0] or "unknown"
            )
            family, family_label = _push_family(campaign_type)
            push_campaign_labels[family] = family_label
            push_campaigns[family]["failed"] += 1
    failed_recipients = {key[0] for key in terminal_failure_keys}
    push_funnel = {
        "sent": len(sent_by_key), "opened": push_opened, "acted": push_acted,
        "failed": len(terminal_failure_keys),
        "failed_attempts": push_failure_attempts,
        "failed_recipients": len(failed_recipients),
        "recovered": len(recovered_failure_keys),
        "attempts_per_failed_delivery": (
            round(push_failure_attempts / len(failed_by_key), 2) if failed_by_key else 0
        ),
        "failure_classes": [
            {"id": name, "name": _push_failure_label(name),
             "deliveries": failure_delivery_classes[name],
             "attempts": failure_attempt_classes[name],
             "share": _percent(failure_delivery_classes[name], len(terminal_failure_keys)),
             "action": _push_failure_action(name)}
            for name in sorted(
                failure_delivery_classes,
                key=lambda value: (-failure_delivery_classes[value], value),
            )
        ],
        "open_eligible": push_open_eligible, "open_pending": push_open_pending,
        "open_rate": _percent(push_opened, push_open_eligible) if push_open_eligible else None,
        "action_eligible": push_action_eligible, "action_pending": push_action_pending,
        "action_rate": _percent(push_acted, push_action_eligible) if push_action_eligible else None,
        "campaigns": [{"id": name, "name": push_campaign_labels[name],
                       "target": (_push_target_label(push_campaign_targets[name])
                                  if push_campaign_targets[name]
                                  else "только открытие; целевое действие не задано"),
                       "sent": values["sent"], "opened": values["opened"],
                       "acted": values["acted"], "failed": values["failed"],
                       "open_eligible": values["open_eligible"],
                       "open_pending": values["open_pending"],
                       "open_rate": (_percent(values["opened"], values["open_eligible"])
                                     if values["open_eligible"] else None),
                       "action_eligible": values["action_eligible"],
                       "action_pending": values["action_pending"],
                       "action_rate": (_percent(values["acted"], values["action_eligible"])
                                       if values["action_eligible"] else None)}
                      for name, values in sorted(push_campaigns.items(), key=lambda pair: -pair[1]["sent"])],
    }

    starts: dict[str, float] = {}
    for row in selected:
        if row["name"] == "onboarding_started": starts.setdefault(row["device_id"], row["ts"])
    completed = engaged = valued = 0; time_to_value: list[float] = []
    for user, started in starts.items():
        after = [r for r in rows if r["device_id"] == user and r["ts"] >= started]
        completion_times = [r["ts"] for r in after if r["name"] == "onboarding_completed"]
        if not completion_times:
            continue
        completed += 1; completion = min(completion_times)
        engaged_rows = [r for r in after if r["ts"] >= completion and r["name"] in ENGAGEMENT_NAMES]
        value_rows = [r for r in after if r["ts"] >= completion and _is_delivered_answer(r)]
        if engaged_rows: engaged += 1
        if value_rows:
            valued += 1; time_to_value.append(max(0, min(r["ts"] for r in value_rows) - started))
    funnel = [
        {"label": "Начали онбординг", "value": len(starts), "rate": 100.0 if starts else 0.0,
         "help": "Уникальные люди, у которых событие начала онбординга попало в выбранный период."},
        {"label": "Завершили онбординг", "value": completed, "rate": _percent(completed, len(starts)),
         "help": "Из начавших онбординг: дошли до финального шага настройки профиля."},
        {"label": "Сделали первое действие", "value": engaged, "rate": _percent(engaged, len(starts)),
         "help": "После завершения онбординга открыли mini app, написали AIWA или сделали запись в продукте."},
        {"label": "Получили ответ AIWA", "value": valued, "rate": _percent(valued, len(starts)),
         "help": ("Согласованное определение ценности: после онбординга AIWA отправила пользователю "
                  "хотя бы один ответ. В смешанном режиме legacy-часть приблизительна; переключатель "
                  "«Только точные» оставляет лишь подтверждённые post-send события. Retry и внутренние "
                  "вызовы модели не считаются."
                  if has_reconstructed_answers else
                  "Согласованное определение ценности: после онбординга AIWA подтверждённо отправила "
                  "пользователю хотя бы один ответ. Retry и внутренние вызовы модели не считаются.")},
    ]

    immediate_users = {r["device_id"] for r in selected if _is_delivered_answer(r)}
    checkin_started_by_cohort: dict[tuple[str, str], float] = {}
    for item in exact_checkins:
        checkin_day = _product_day(item["ts"])
        cohort = (item["device_id"], checkin_day)
        checkin_started_by_cohort[cohort] = min(
            checkin_started_by_cohort.get(cohort, item["ts"]), item["ts"]
        )
    followup_maturity = 36 * 3600
    checkins_by_user: dict[str, list[tuple[tuple[str, str], float]]] = defaultdict(list)
    summaries_by_user: dict[str, list[dict[str, Any]]] = defaultdict(list)
    summary_opens_by_key: dict[tuple[str, str], list[float]] = defaultdict(list)
    for cohort, checkin_at in checkin_started_by_cohort.items():
        checkins_by_user[cohort[0]].append((cohort, checkin_at))
    for item in rows:
        if (item["provenance"] == "observed" and item["name"] == "push_sent"
                and str(item["properties"].get("campaign_type") or "") == "daily_summary"):
            summaries_by_user[item["device_id"]].append(item)
        elif item["provenance"] == "observed" and item["name"] == "push_opened":
            campaign = str(item["properties"].get("campaign_id") or "")
            if campaign:
                summary_opens_by_key[(item["device_id"], campaign)].append(item["ts"])
    for items in checkins_by_user.values():
        items.sort(key=lambda pair: pair[1])
    for items in summaries_by_user.values():
        items.sort(key=lambda item: item["ts"])
    for timestamps in summary_opens_by_key.values():
        timestamps.sort()

    # One scheduled summary can fulfil at most one preceding check-in user-day.
    paired_summaries: dict[tuple[str, str], dict[str, Any]] = {}
    for user, user_checkins in checkins_by_user.items():
        pending: deque[tuple[tuple[str, str], float]] = deque()
        index = 0
        for summary_item in summaries_by_user.get(user, []):
            sent_at = summary_item["ts"]
            while index < len(user_checkins) and user_checkins[index][1] < sent_at:
                pending.append(user_checkins[index]); index += 1
            while pending and pending[0][1] + followup_maturity < sent_at:
                pending.popleft()
            if pending:
                cohort, _ = pending.popleft()
                paired_summaries[cohort] = summary_item

    delivery_eligible: set[tuple[str, str]] = set()
    delivery_pending: set[tuple[str, str]] = set()
    followup_sent = set(paired_summaries)
    followup_opened: set[tuple[str, str]] = set()
    open_eligible: set[tuple[str, str]] = set()
    open_pending: set[tuple[str, str]] = set()
    for cohort, checkin_at in checkin_started_by_cohort.items():
        summary_item = paired_summaries.get(cohort)
        if summary_item is None:
            (delivery_eligible if checkin_at + followup_maturity <= now
             else delivery_pending).add(cohort)
            continue
        delivery_eligible.add(cohort)
        sent_at = summary_item["ts"]
        campaign = str(summary_item["properties"].get("campaign_id") or "")
        opens = summary_opens_by_key.get((cohort[0], campaign), [])
        was_opened = any(sent_at <= opened_at <= sent_at + 86400 for opened_at in opens)
        if was_opened:
            followup_opened.add(cohort)
            open_eligible.add(cohort)
        elif sent_at + 86400 <= now:
            open_eligible.add(cohort)
        else:
            open_pending.add(cohort)

    value_delivery = {
        "immediate": {
            "users": len(immediate_users),
            "help": ("Уникальные пользователи, для которых есть сигнал ответа AIWA в выбранном периоде. "
                     "В смешанном режиме legacy-часть приблизительна; «Только точные» считает лишь "
                     "подтверждённые отправки."
                     if has_reconstructed_answers else
                     "Уникальные пользователи, которым AIWA подтверждённо отправила хотя бы один ответ "
                     "в выбранном периоде."),
        },
        "delayed_checkin": {
            "checkin_user_days": len(checkin_started_by_cohort),
            "excluded_reconstructed_events": len(reconstructed_checkins),
            "eligible_user_days": len(delivery_eligible),
            "delivery_eligible_user_days": len(delivery_eligible),
            "pending_user_days": len(delivery_pending),
            "delivery_pending_user_days": len(delivery_pending),
            "summary_delivered_user_days": len(followup_sent),
            "open_eligible_user_days": len(open_eligible),
            "open_pending_user_days": len(open_pending),
            "summary_opened_user_days": len(followup_opened),
            "delivery_rate": (_percent(len(followup_sent), len(delivery_eligible))
                              if delivery_eligible else None),
            "open_rate": (_percent(len(followup_opened), len(open_eligible))
                          if open_eligible else None),
            "maturity_hours": 36,
            "help": "Отложенная польза чек-ина считается только по точным v2-событиям: следующая запланированная утренняя сводка отправлена не позднее 36 часов после сохранения, затем открыта по тому же campaign_id в течение 24 часов. Один push относится только к одному чек-ин user-day; день считается по Москве. Восстановленные чек-ины исключены, ручной /today не входит, а незавершённые окна показаны как ожидающие и не занижают конверсию.",
        },
    }

    active_days_by_user: dict[str, set[str]] = defaultdict(set)
    feature_set_by_user: dict[str, set[str]] = defaultdict(set)
    for row in active_selected:
        active_days_by_user[row["device_id"]].add(_product_day(row["ts"]))
        feature = _feature(row)
        if feature: feature_set_by_user[row["device_id"]].add(feature)
    returning_users = sum(len(days_set) >= 2 for days_set in active_days_by_user.values())
    multi_feature_users = sum(len(feature_set) >= 2 for feature_set in feature_set_by_user.values())
    checkin_users = {r["device_id"] for r in all_checkins}
    product_health = [
        {"label": "Answer activation", "value": _percent(valued, len(starts)) if starts else None,
         "unit": "%", "note": f"{valued} из {len(starts)} начавших",
         "help": ("Доля начавших онбординг, для которых затем есть сигнал ответа AIWA. "
                  "В смешанном режиме legacy-часть приблизительна."
                  if has_reconstructed_answers else
                  "Доля начавших онбординг, которым AIWA затем подтверждённо отправила хотя бы один ответ.")},
        {"label": "Time to first answer p50", "value": _pct(time_to_value, .5) if time_to_value else None,
         "unit": "duration", "note": "от старта онбординга",
         "help": ("Медианное время от начала онбординга до первого сигнала ответа AIWA; "
                  "для восстановленной legacy-истории это приблизительный pre-send сигнал."
                  if has_reconstructed_answers else
                  "Медианное время от начала онбординга до первого подтверждённо отправленного ответа AIWA.")},
        {"label": "Returning users", "value": (_percent(returning_users, len(selected_ids))
                                                   if available_days >= 2 and selected_ids else None),
         "unit": "%", "note": f"{returning_users} активны в 2+ дня",
         "help": "Доля активных пользователей, которые были активны минимум в два разных календарных дня выбранного периода."},
        {"label": "Multi-feature users", "value": _percent(multi_feature_users, len(selected_ids)) if selected_ids else None,
         "unit": "%", "note": f"{multi_feature_users} используют 2+ функции",
         "help": "Доля активных пользователей, использовавших минимум две продуктовые зоны: чат, чек-ин, питание, нагрузка, статистика или mini app."},
        {"label": "Check-in adoption", "value": _percent(len(checkin_users), len(selected_ids)) if selected_ids else None,
         "unit": "%", "note": f"{len(checkin_users)} пользователей",
         "help": "Доля активных пользователей, завершивших хотя бы один ежедневный чек-ин в выбранном периоде."},
        {"label": "Fallback requests", "value": _percent(fallback_requests, len(requests)) if requests else None,
         "unit": "%", "note": f"{fallback_requests} из {len(requests)} запросов",
         "help": "Доля AI-запросов, где понадобился retry или переключение провайдера. Чем ниже, тем стабильнее основной маршрут."},
    ]

    observed = [r for r in all_rows if r["provenance"] == "observed"]
    reconstructed = [r for r in all_rows if r["provenance"] != "observed"]
    observed_start = min((r["ts"] for r in observed), default=None)
    coverage_days = (now - observed_start) / 86400 if observed_start else 0
    quality = {
        "mode": ("observed" if source_mode == "observed" or not reconstructed else "mixed"),
        "source_mode": source_mode,
        "observed_start": datetime.fromtimestamp(observed_start, timezone.utc).isoformat(timespec="seconds") if observed_start else None,
        "coverage_days": round(coverage_days, 1),
        "requested_days": requested_days, "available_days": available_days,
        "observed_events": len(observed), "reconstructed_events": len(reconstructed),
        "request_id_coverage": _percent(request_covered, len(ai_rows)),
        "token_split_coverage": _percent(token_covered, len(ai_rows)),
        "model_coverage": _percent(model_covered, len(ai_rows)),
        "cost_coverage": _percent(cost_covered, len(ai_rows)),
        "warnings": (["Точный слой пока короче 7 дней; retention и тренды предварительные."] if coverage_days < 7 else []) +
                    (["Request ID покрывает меньше 80% AI-попыток; успех пользовательских запросов пока не показывается."] if ai_rows and _percent(request_covered, len(ai_rows)) < 80 else []) +
                    ([f"Выбрано {requested_days} дн., но источник содержит только {available_days} дн.; средние и график не включают дни до начала сбора."] if 0 < available_days < requested_days else []) +
                    (["Показаны только события, которые новая аналитика v2 записала напрямую. Восстановленная старая история исключена из расчётов."]
                     if source_mode == "observed" and reconstructed else []) +
                    (["Добавлены события, восстановленные из старой таблицы. Они расширяют историю, но могут быть неполными; стоимость по ним не считается."]
                     if source_mode == "mixed" and reconstructed else []),
    }

    series_data = _series(rows, window_days, now, available_start)
    avg_dau = (len(dau_ids) if window_days <= 1.1 else
               (sum(point["active"] for point in series_data) / len(series_data)
                if series_data else 0))
    avg_dau_note = ("с 00:00 текущей московской даты" if window_days <= 1.1 else
                    f"по {len(series_data)} календарным дням с данными")
    per_active_day = lambda n: round(n / active_user_days, 2) if active_user_days else 0
    per_active_day_or_none = lambda n: round(n / active_user_days, 2) if active_user_days else None
    exact_ai_rows = [r for r in ai_rows if r["provenance"] == "observed"]
    exact_requests: dict[str, list[dict[str, Any]]] = defaultdict(list)
    exact_request_covered = 0
    for row in exact_ai_rows:
        request_id = row["properties"].get("request_id")
        if request_id:
            exact_request_covered += 1
            exact_requests[str(request_id)].append(row)
    exact_untraced_attempts = len(exact_ai_rows) - exact_request_covered
    logical_ai_requests = len(exact_requests) + exact_untraced_attempts
    exact_active_days: dict[str, set[str]] = defaultdict(set)
    for row in active_selected:
        if row["provenance"] == "observed":
            day = _product_day(row["ts"])
            exact_active_days[day].add(row["device_id"])
    exact_active_user_days = sum(len(users) for users in exact_active_days.values())
    per_exact_active_day = lambda n: (round(n / exact_active_user_days, 2)
                                      if exact_active_user_days else None)
    exact_request_coverage = _percent(exact_request_covered, len(exact_ai_rows))
    exact_request_ready = bool(exact_ai_rows) and exact_request_coverage >= 80
    exact_tool_rows = [
        r for r in selected
        if r["provenance"] == "observed" and r["name"] == "tool_execution_completed"
    ]
    successful_tool_rows = [
        r for r in exact_tool_rows
        if str(r["properties"].get("status") or "") in SUCCESS
    ]
    exact_tool_outcomes = [
        r for r in selected
        if r["provenance"] == "observed"
        and r["name"] == "tool_outcome_completed"
        and str(r["properties"].get("status") or "") in SUCCESS
    ]
    tool_counts: dict[str, Counter] = defaultdict(Counter)
    for tool_row in exact_tool_rows:
        tool_name = str(tool_row["properties"].get("tool_name") or "unknown")
        tool_counts[tool_name]["executions"] += 1
        if str(tool_row["properties"].get("status") or "") in SUCCESS:
            tool_counts[tool_name]["successful"] += 1
    product_actions = sum(r["name"] in PRODUCT_ACTION_NAMES for r in selected)
    response_user_days = {
        (r["device_id"], _product_day(r["ts"]))
        for r in selected if _is_delivered_answer(r)
    }
    value_actions = len(response_user_days)
    feature_days: dict[tuple[str, str], set[str]] = defaultdict(set)
    for row in active_selected:
        feature = _feature(row)
        if feature:
            day = _product_day(row["ts"])
            feature_days[(row["device_id"], day)].add(feature)
    distinct_feature_uses = sum(len(feature_set) for feature_set in feature_days.values())

    calendar_day_start = period_starts["dau"]
    day_sessions, _, _ = _sessions(rows, calendar_day_start, now)
    day_ai_attempts = sum(
        r["name"] == "ai_call"
        and calendar_day_start <= r["ts"] <= now
        and r["provenance"] == "observed"
        for r in rows
    )
    day_successful_tool_executions = sum(
        r["name"] == "tool_execution_completed"
        and str(r["properties"].get("status") or "") in SUCCESS
        and calendar_day_start <= r["ts"] <= now
        and r["provenance"] == "observed"
        for r in rows
    )
    per_dau = lambda n: (round(n / len(dau_ids), 2) if dau_ids else (0 if not n else None))
    overview_tools_per_dau = per_dau(day_successful_tool_executions)
    overview_tool_denominator = (
        "DAU текущей московской даты всей доступной истории"
        if source_mode == "mixed"
        else "DAU текущей московской даты точного v2-слоя"
    )
    overview_tool_help = (
        "Успешно завершённые структурированные инструменты модели с 00:00 МСК, "
        "делённые на DAU той же московской даты. Считаются реальные исполнения "
        "cycle_status, recent_symptoms, today_diary, recent_workouts, user_profile, "
        "recall и remember; обращения к AI-провайдеру сюда не входят."
    )

    tool_definitions = [
        {"id": "ai_provider_attempts", "label": "AI provider attempts / DAU",
         "value": per_dau(day_ai_attempts), "numerator": day_ai_attempts,
         "numerator_label": "точных AI-попыток с 00:00 МСК",
         "denominator": len(dau_ids), "denominator_label": overview_tool_denominator,
         "status": ("no_data" if not day_ai_attempts else
                    "no_active_users" if not dau_ids else "ok"),
         "selected_for_overview": False,
         "help": "Отдельные технические обращения к AI endpoint с 00:00 МСК, включая retry и fallback. Эта метрика показывает нагрузку на провайдеров, но больше не называется Tools."},
        {"id": "logical_ai_requests", "label": "Logical AI requests / DAU",
         "value": (per_exact_active_day(logical_ai_requests) if exact_request_ready else None),
         "numerator": (logical_ai_requests if exact_request_ready else None),
         "numerator_label": "AI-запросов",
         "denominator": exact_active_user_days, "denominator_label": "точных v2 user-days",
         "coverage": exact_request_coverage,
         "status": ("no_data" if not exact_ai_rows else
                    "insufficient_coverage" if not exact_request_ready else
                    "no_active_users" if not exact_active_user_days else "ok"),
         "selected_for_overview": False,
         "help": "Логические AI-запросы после объединения retry и fallback по request_id. Попытки без request_id считаются отдельными запросами, поэтому метрика зависит от полноты трассировки."},
        {"id": "actual_tool_executions", "label": "Actual tool executions / DAU",
         "value": per_exact_active_day(len(exact_tool_rows)),
         "numerator": len(exact_tool_rows), "numerator_label": "tool executions",
         "denominator": exact_active_user_days, "denominator_label": "точных v2 user-days",
         "status": ("no_active_users" if not exact_active_user_days else "ok"),
         "selected_for_overview": False,
         "help": "Все фактические исполнения структурированных инструментов модели за выбранный период, включая успешные и завершившиеся ошибкой. Аргументы и результаты инструментов в аналитику не передаются."},
        {"id": "successful_tool_executions", "label": "Successful tool executions / DAU",
         "value": overview_tools_per_dau,
         "numerator": day_successful_tool_executions,
         "numerator_label": "успешных tool executions с 00:00 МСК",
         "denominator": len(dau_ids), "denominator_label": overview_tool_denominator,
         "status": ("no_active_users" if not dau_ids else "ok"),
         "selected_for_overview": True,
         "help": overview_tool_help},
        {"id": "useful_tool_outcomes", "label": "Useful outcomes after tool / DAU",
         "value": per_exact_active_day(len(exact_tool_outcomes)),
         "numerator": len(exact_tool_outcomes),
         "numerator_label": "успешных tool-assisted ответов",
         "denominator": exact_active_user_days, "denominator_label": "точных v2 user-days",
         "status": ("no_active_users" if not exact_active_user_days else "ok"),
         "selected_for_overview": False,
         "help": "Запросы, в которых хотя бы один инструмент успешно вернул данные и AIWA затем сформировала итоговый ответ. Это технически подтверждённый tool-assisted outcome, но не пользовательская оценка «Полезно»."},
    ]

    overview = {
        "ever_used": len(ever_ids), "dau": len(dau_ids), "wau": len(wau_ids), "mau": len(mau_ids),
        "sessions_per_dau": per_dau(day_sessions),
    }
    if overview_tools_per_dau is not None:
        overview["tools_per_dau"] = overview_tools_per_dau
    primary = [
        {"label": "Ever used", "value": len(ever_ids), "note": "уникальные пользователи · всё время",
         "help": "Уникальные псевдонимные пользователи, у которых было хотя бы одно продуктовое действие за всю доступную историю."},
        {"label": "DAU", "value": len(dau_ids), "note": "с 00:00 текущей даты МСК",
         "help": "Уникальные пользователи с продуктовой активностью в текущую московскую календарную дату. Технические AI-попытки и push-отправки не считаются активностью."},
        {"label": "WAU", "value": len(wau_ids), "note": "текущая ISO-неделя МСК",
         "help": "Уникальные пользователи с продуктовой активностью с понедельника 00:00 МСК."},
        {"label": "MAU", "value": len(mau_ids), "note": "текущий месяц МСК",
         "help": "Уникальные пользователи с продуктовой активностью с первого числа текущего московского месяца."},
        {"label": "Sessions / DAU", "value": overview["sessions_per_dau"],
         "note": "сессии сегодня МСК / DAU сегодня",
         "help": "Сессии с 00:00 МСК, делённые на уникальных активных пользователей той же календарной даты. Новая сессия начинается после 30 минут без продуктовых событий."},
        {"label": "Tools / DAU", "value": overview_tools_per_dau,
         "note": f"успешные tool executions сегодня МСК / {'общий' if source_mode == 'mixed' else 'точный'} DAU",
         "help": overview_tool_help},
    ]

    classified_active = sum(_feature(r) is not None for r in active_selected)
    observed_rows = [r for r in all_rows if r["provenance"] == "observed"]
    ingest_lags = [max(0.0, r["ingested_at"] - r["ts"]) for r in selected
                   if r["provenance"] == "observed" and r["ingested_at"] > 0]
    latest_observed_ts = max((r["ts"] for r in observed_rows), default=None)
    diagnostics = [
        {"label": "Avg DAU", "value": round(avg_dau, 1), "unit": "number",
         "note": avg_dau_note,
         "help": "Для окна 1 день это DAU текущей московской даты. Для 7/30 дней — среднее число активных пользователей по доступным московским календарным датам; дни до начала сбора не входят в знаменатель."},
        {"label": "Сессии / user-day", "value": per_active_day_or_none(sessions), "unit": "number",
         "note": f"{sessions} сессий / {active_user_days} user-days",
         "help": "Периодная глубина использования. В отличие от верхнего Sessions / DAU, учитывает каждый активный user-day выбранного окна."},
        {"label": "События / user-day", "value": per_active_day_or_none(len(active_selected)), "unit": "number",
         "note": f"{len(active_selected)} продуктовых событий",
         "help": "Все события, считающиеся продуктовой активностью, на активный пользовательский день. Рост может означать вовлечённость или лишние повторные события — проверяйте вместе с воронками."},
        {"label": "Сообщения / user-day", "value": per_active_day_or_none(messages), "unit": "number",
         "note": f"{messages} сообщений пользователя",
         "help": "Сообщения пользователей AIWA на активный пользовательский день. Ответы ассистента не входят в числитель."},
        {"label": "Ответы / сообщения", "value": (_percent(responses, messages) if messages else None), "unit": "%",
         "note": f"{responses} ответов / {messages} сообщений",
         "help": "Грубая диагностическая сверка объёма ответов и входящих сообщений без связывания по request_id. Не является точной долей успешно отвеченных запросов."},
        {"label": "Размечено по функциям", "value": (_percent(classified_active, len(active_selected))
                                                        if active_selected else None), "unit": "%",
         "note": f"{classified_active} из {len(active_selected)} событий",
         "help": "Доля активных событий, которые удалось отнести к продуктовой зоне. Низкое значение помогает найти новые или неправильно размеченные события; онбординг может оставаться без зоны намеренно."},
        {"label": "Свежесть событий", "value": (max(0.0, now - latest_observed_ts)
                                                   if latest_observed_ts is not None else None),
         "unit": "duration", "note": "с последнего точного события",
         "help": "Сколько времени прошло с последнего события, напрямую записанного аналитикой v2. Большое значение при живом продукте указывает на проблему доставки."},
        {"label": "Ingest lag p50 / p95", "value": (_pct(ingest_lags, .5) if ingest_lags else None),
         "secondary": (_pct(ingest_lags, .95) if ingest_lags else None), "unit": "duration_pair",
         "note": f"{len(ingest_lags)} точных событий",
         "help": "Задержка между временем события и его приёмом модулем аналитики. p95 помогает заметить очереди, сетевые задержки и отложенную доставку."},
        {"label": "Ошибки / 100 user-days", "value": (round(explicit_errors * 100 / active_user_days, 2)
                                                         if active_user_days else None), "unit": "number",
         "note": f"{explicit_errors} явно записанных ошибок",
         "help": "Явно записанные error-события на 100 активных пользовательских дней. Ошибки отдельных AI-попыток вынесены в AI-блок и сюда не добавляются."},
        {"label": "Request ID coverage", "value": _percent(request_covered, len(ai_rows)) if ai_rows else None,
         "unit": "%", "note": f"{request_covered} из {len(ai_rows)} AI-попыток",
         "help": "Доля AI-попыток с request_id. Ниже 80% нельзя надёжно объединять retry/fallback в пользовательские запросы."},
    ]
    return {
        "updated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"), "window_days": window_days,
        "installs": len(ever_ids), "dau": len(selected_ids), "events": len(selected),
        "errors": (failed_requests if requests else 0) + explicit_errors, "overview": overview,
        "metrics": [{"label": x["label"], "value": ("—" if x["value"] is None else str(x["value"])),
                     "good": True} for x in primary],
        "primary": primary,
        "audience": {"ever_used": len(ever_ids), "active": len(selected_ids), "dau": len(dau_ids),
                     "wau": len(wau_ids), "mau": len(mau_ids), "avg_dau": round(avg_dau, 1),
                     "active_user_days": active_user_days},
        "engagement": {"sessions": sessions, "messages": messages, "responses": responses,
                       "sessions_per_active_day": per_active_day(sessions),
                       "tools_per_active_day": per_active_day(len(ai_rows)),
                       "messages_per_active_day": per_active_day(messages),
                       "avg_dau": round(avg_dau, 1),
                       "avg_session_min": round(sum(session_lengths) / len(session_lengths) / 60, 1) if session_lengths else 0,
                       "events_per_session": round(sum(session_events) / len(session_events), 1) if session_events else 0,
                       "features": features,
                       "pushes_sent": len(pushes), "checkins_completed": len(all_checkins)},
        "platforms": {
            "items": platform_breakdown,
            "help": (
                "Разбивка по поверхности продукта: диалог с Telegram-ботом и Mini App внутри "
                "Telegram. Один человек может использовать обе поверхности и попадёт в обе "
                "строки, поэтому доли пользователей не обязаны суммироваться до 100%. "
                "iOS/Android/Desktop надёжно не показываются: Telegram Web App не передаёт "
                "операционную систему в текущую privacy-safe аналитику."
            ),
        },
        "tool_definitions": tool_definitions,
        "diagnostics": diagnostics,
        "funnel": funnel, "value_delivery": value_delivery, "feature_funnels": feature_funnels,
        "product_health": product_health, "answer_quality": answer_quality,
        "push_funnel": push_funnel, "retention": _retention(rows),
        "series": series_data,
        "ai": {"attempts": len(ai_rows), "requests": len(requests), "untraced_attempts": len(ai_rows) - request_covered,
               "successful_requests": successful_requests,
               "failed_requests": failed_requests,
               "recovered_requests": recovered_requests,
               "clean_successful_requests": clean_successful_requests,
               "tool_executions": len(exact_tool_rows),
               "successful_tool_executions": len(successful_tool_rows),
               "tool_execution_success_rate": _percent(len(successful_tool_rows), len(exact_tool_rows)),
               "tool_outcomes": len(exact_tool_outcomes),
               "tools": [
                   {"name": name,
                    "executions": int(counts["executions"]),
                    "successful": int(counts["successful"]),
                    "failed": int(counts["executions"] - counts["successful"])}
                   for name, counts in sorted(
                       tool_counts.items(),
                       key=lambda item: (-item[1]["executions"], item[0]),
                   )[:12]
               ],
               "request_success_rate": (_percent(successful_requests, len(requests))
                                        if requests and _percent(request_covered, len(ai_rows)) >= 80 else None),
               "failed_attempts": failed_attempts, "attempt_error_rate": _percent(failed_attempts, len(ai_rows)),
               "fallback_requests": fallback_requests, "attempts_per_request": round(len(ai_rows) / len(requests), 2) if requests else 0,
               "p50_ms": _pct(latencies, .5), "p95_ms": _pct(latencies, .95),
               "input_tokens": input_tokens, "output_tokens": output_tokens, "cached_tokens": cached_tokens,
               "total_tokens": total_tokens, "cost_usd": round(cost_usd, 6),
               "providers": [{"name": k, "calls": int(v["calls"]), "success": int(v["success"])}
                             for k, v in sorted(providers.items(), key=lambda kv: -kv[1]["calls"])],
               "models": [{"name": k, "calls": int(v["calls"]), "success": int(v["success"])}
                          for k, v in sorted(models.items(), key=lambda kv: -kv[1]["calls"])],
               "failure_classes": [
                   {"name": name, "attempts": int(count),
                    "share": _percent(count, failed_attempts) if failed_attempts else 0}
                   for name, count in failure_classes.most_common()
               ],
               "failure_statuses": [
                   {"name": name, "attempts": int(count),
                    "share": _percent(count, failed_attempts) if failed_attempts else 0}
                   for name, count in failure_statuses.most_common()
               ],
               "failure_routes": [
                   {"provider": provider, "model": model, "status": status,
                    "attempts": int(count)}
                   for (provider, model, status), count in failure_routes.most_common(12)
               ],
               "failure_purposes": [
                   {"purpose": purpose, "failed": int(count),
                    "attempts": int(purpose_attempts[purpose]),
                    "failure_rate": _percent(count, purpose_attempts[purpose])}
                   for purpose, count in purpose_failures.most_common(12)
               ]},
        "data_quality": quality,
    }


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
        props = _safe_properties(item.get("properties"))
        version = max(1, int(item.get("payload_version") or props.get("payload_version") or 1))
        provenance = str(props.get("provenance") or "observed")[:32]
        confidence = str(props.get("confidence") or ("high" if provenance == "observed" else "medium"))[:16]
        rows.append((
            str(item.get("event_id") or uuid.uuid4())[:160], float(item.get("ts") or time.time()),
            device_id, name, json.dumps(props, ensure_ascii=False, separators=(",", ":")),
            time.time(), provenance, confidence, version,
        ))

    def _write() -> None:
        with DB_LOCK:
            for device_id in deletions:
                _db.execute("DELETE FROM events WHERE device_id=?", (device_id,))
            _db.executemany(
                """INSERT INTO events(event_id,ts,device_id,name,properties,ingested_at,provenance,confidence,payload_version)
                   VALUES(?,?,?,?,?,?,?,?,?)
                   ON CONFLICT(event_id) DO UPDATE SET ts=excluded.ts,device_id=excluded.device_id,
                     name=excluded.name,properties=excluded.properties,ingested_at=excluded.ingested_at,
                     provenance=excluded.provenance,confidence=excluded.confidence,
                     payload_version=excluded.payload_version
                   WHERE excluded.payload_version >= events.payload_version""", rows)
            _db.commit()

    await run_in_threadpool(_write)
    return _no_store({"ok": True, "ingested": len(rows), "deleted": len(deletions)})


@app.delete("/migration-batches/{batch_id}")
async def delete_migration_batch(batch_id: str, request: Request) -> JSONResponse:
    """Rollback reconstructed history without touching observed production events."""
    if not INGEST_TOKEN or request.headers.get("x-ingest-token") != INGEST_TOKEN:
        return _no_store({"error": "bad token"}, 401)
    batch_id = batch_id[:80]

    def _delete() -> int:
        with DB_LOCK:
            rows = _db.execute(
                "SELECT event_id,properties,provenance FROM events WHERE provenance!='observed'"
            ).fetchall()
            ids = []
            for event_id, props_json, provenance in rows:
                try: props = json.loads(props_json or "{}")
                except (TypeError, ValueError): props = {}
                if provenance != "observed" and props.get("migration_batch") == batch_id:
                    ids.append(event_id)
            _db.executemany("DELETE FROM events WHERE event_id=?", [(x,) for x in ids])
            _db.commit()
            return len(ids)

    removed = await run_in_threadpool(_delete)
    return _no_store({"ok": True, "batch": batch_id, "removed": removed})


def _cached_dashboard(days: float, source: str) -> tuple[dict[str, Any], str, float]:
    """Keep the live dashboard responsive while bounding staleness to a few seconds."""
    key = (max(1, min(int(math.ceil(float(days))), 365)),
           "observed" if str(source).lower() == "observed" else "mixed")
    started = time.monotonic()
    now_mono = started
    with CACHE_LOCK:
        cached = _DASHBOARD_CACHE.get(key)
        if cached and cached[0] > now_mono:
            return cached[1], "hit", (time.monotonic() - started) * 1000
    value = compute_dashboard(key[0], key[1])
    with CACHE_LOCK:
        _DASHBOARD_CACHE[key] = (time.monotonic() + DASHBOARD_CACHE_SECONDS, value)
    return value, "miss", (time.monotonic() - started) * 1000


def _dashboard_response(days: float, source: str) -> JSONResponse:
    value, cache_status, elapsed_ms = _cached_dashboard(days, source)
    return _no_store(value, headers={
        "Server-Timing": f'dashboard;dur={elapsed_ms:.1f};desc="{cache_status}"',
        "X-Stats-Cache": cache_status,
    })


@app.get("/summary")
def summary(days: float = 1.0, source: str = "mixed") -> JSONResponse:
    return _dashboard_response(days, source)


@app.get("/dashboard")
def dashboard_data(days: float = 1.0, source: str = "mixed") -> JSONResponse:
    return _dashboard_response(days, source)


@app.get("/logo.png")
def dashboard_logo() -> FileResponse:
    return FileResponse(HERE / "logo.png", media_type="image/png")


@app.get("/")
def dashboard() -> FileResponse:
    return FileResponse(HERE / "index.html")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=PORT)
