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
from collections import Counter, defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

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

SAFE_PROPERTIES = {
    "screen", "channel", "calls", "provider", "model", "purpose", "status",
    "request_id", "retry_index", "fallback_from", "latency_ms", "input_tokens",
    "output_tokens", "cached_tokens", "total_tokens", "reported_cost", "cost_unit",
    "estimated_cost_usd", "feature", "provenance", "confidence", "source_schema",
    "payload_version", "app_version", "migration_batch", "token_precision",
    "answer_id", "rating", "safety_level", "campaign_id", "campaign_type",
    "delivery_status",
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
    "answer_feedback_submitted", "safety_guidance_shown",
}
SUCCESS = {"success", "ok", "completed"}
VALUE_NAMES = {
    "assistant_response_received", "checkin_completed", "meal_add_completed",
    "workout_add_completed", "summary_opened", "feature_value_completed",
}
ENGAGEMENT_NAMES = VALUE_NAMES | {
    "assistant_message_sent", "app_opened", "screen_viewed", "checkin_updated",
}

app = FastAPI()
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


def _no_store(value: object, status: int = 200) -> JSONResponse:
    return JSONResponse(value, status_code=status, headers={"Cache-Control": "no-store"})


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
    return result


def _active_ids(rows: list[dict[str, Any]], cutoff: float) -> set[str]:
    return {r["device_id"] for r in rows if r["ts"] >= cutoff and _is_active(r["name"])}


def _sessions(rows: list[dict[str, Any]], cutoff: float) -> tuple[int, list[float], list[int]]:
    by_user: dict[str, list[float]] = defaultdict(list)
    for row in rows:
        if row["ts"] >= cutoff and _is_active(row["name"]):
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
    if name in {"assistant_message_sent", "assistant_response_received"} or screen == "chat": return "Чат с AIWA"
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
            active_days[row["device_id"]].add(datetime.fromtimestamp(row["ts"], timezone.utc).date().isoformat())
    today = datetime.now(timezone.utc).date()
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
        start = max(now - 24 * 3600, available_start)
        start = math.floor(start / 3600) * 3600
        buckets = max(1, math.ceil((now - start) / 3600))
        for i in range(buckets):
            lo = start + i * 3600; hi = min(now + 1, lo + 3600)
            chunk = [r for r in rows if lo <= r["ts"] < hi]
            result.append({
                "label": datetime.fromtimestamp(lo, timezone.utc).strftime("%H:00"),
                "active": len({r["device_id"] for r in chunk if _is_active(r["name"])}),
                "messages": sum(r["name"] == "assistant_message_sent" for r in chunk),
                "ai_calls": sum(r["name"] == "ai_call" for r in chunk),
            })
        return result
    span = max(1, int(math.ceil(days)))
    today = datetime.fromtimestamp(now, timezone.utc).date()
    first = max(today - timedelta(days=span - 1), datetime.fromtimestamp(available_start, timezone.utc).date())
    day = first
    while day <= today:
        lo = datetime.combine(day, datetime.min.time(), timezone.utc).timestamp(); hi = lo + 86400
        chunk = [r for r in rows if lo <= r["ts"] < hi]
        result.append({
            "label": day.strftime("%d.%m"),
            "active": len({r["device_id"] for r in chunk if _is_active(r["name"])}),
            "messages": sum(r["name"] == "assistant_message_sent" for r in chunk),
            "ai_calls": sum(r["name"] == "ai_call" for r in chunk),
        })
        day += timedelta(days=1)
    return result


def compute_dashboard(days: float = 1.0, source: str = "mixed") -> dict[str, Any]:
    window_days = max(0.04, min(float(days), 365.0)); now = time.time(); since = now - window_days * 86400
    source_mode = "observed" if str(source).lower() == "observed" else "mixed"
    all_rows = _event_rows()
    rows = ([r for r in all_rows if r["provenance"] == "observed"]
            if source_mode == "observed" else all_rows)
    selected = [r for r in rows if r["ts"] >= since]
    data_start = min((r["ts"] for r in rows), default=None)
    available_start = max(since, data_start) if data_start is not None else None
    requested_days = max(1, int(math.ceil(window_days)))
    available_days = (min(requested_days,
                          (datetime.fromtimestamp(now, timezone.utc).date() -
                           datetime.fromtimestamp(available_start, timezone.utc).date()).days + 1)
                      if available_start is not None else 0)
    active_selected = [r for r in selected if _is_active(r["name"])]
    ever_ids = {r["device_id"] for r in rows if _is_active(r["name"])}
    selected_ids = {r["device_id"] for r in active_selected}
    dau_ids = _active_ids(rows, now - 86400); wau_ids = _active_ids(rows, now - 7 * 86400); mau_ids = _active_ids(rows, now - 30 * 86400)

    daily_users: dict[str, set[str]] = defaultdict(set)
    for row in active_selected:
        daily_users[datetime.fromtimestamp(row["ts"], timezone.utc).date().isoformat()].add(row["device_id"])
    active_user_days = sum(len(v) for v in daily_users.values())
    sessions, session_lengths, session_events = _sessions(rows, since)
    messages = sum(r["name"] == "assistant_message_sent" for r in selected)
    responses = sum(r["name"] == "assistant_response_received" for r in selected)

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
    failed_attempts = sum(str(r["properties"].get("status") or "") not in SUCCESS for r in ai_rows)
    explicit_errors = sum(r["name"] in {"error", "legacy_error"} for r in selected)
    pushes = [r for r in selected if r["name"] in {"push_sent", "legacy_broadcast"}]
    checkins = [r for r in selected if r["name"] == "checkin_completed"]

    feature_users: dict[str, set[str]] = defaultdict(set); feature_events = Counter()
    for row in active_selected:
        feature = _feature(row)
        if feature:
            feature_users[feature].add(row["device_id"]); feature_events[feature] += 1
    features = sorted(({"name": name, "users": len(users), "events": feature_events[name],
                        "adoption": _percent(len(users), len(selected_ids))}
                       for name, users in feature_users.items()), key=lambda x: (-x["users"], x["name"]))

    def _feature_funnel(label: str, start_names: set[str], done_names: set[str], help_text: str) -> dict[str, Any]:
        started_at: dict[str, float] = {}
        for item in selected:
            if item["name"] in start_names:
                started_at.setdefault(item["device_id"], item["ts"])
        completed = 0
        for user, start_ts in started_at.items():
            if any(item["device_id"] == user and item["ts"] >= start_ts and item["name"] in done_names
                   for item in selected):
                completed += 1
        return {"label": label, "started": len(started_at), "completed": completed,
                "rate": _percent(completed, len(started_at)) if started_at else None, "help": help_text}

    feature_funnels = [
        _feature_funnel("Чат с AIWA", {"assistant_message_sent"},
                        {"assistant_response_received", "answer_feedback_prompted"},
                        "Из написавших AIWA: получили ответ. Считаются уникальные люди, а не сообщения."),
        _feature_funnel("Ежедневный чек-ин", {"checkin_updated", "checkin_symptom_selected"},
                        {"checkin_completed"},
                        "Из начавших отмечать состояние: дошли до кнопки «Готово»."),
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
    push_campaigns: dict[str, Counter] = defaultdict(Counter)
    push_opened = push_acted = 0
    for key, sent_item in sent_by_key.items():
        user, campaign = key; campaign_type = str(sent_item["properties"].get("campaign_type") or campaign.split(":", 1)[0])
        push_campaigns[campaign_type]["sent"] += 1
        opens = [item for item in opened_by_key.get(key, []) if sent_item["ts"] <= item["ts"] <= sent_item["ts"] + 86400]
        if not opens:
            continue
        push_opened += 1; push_campaigns[campaign_type]["opened"] += 1
        opened_at = min(item["ts"] for item in opens)
        acted = any(item["name"] in VALUE_NAMES and opened_at <= item["ts"] <= opened_at + 86400
                    for item in events_by_user[user])
        if acted:
            push_acted += 1; push_campaigns[campaign_type]["acted"] += 1
    push_failed = sum(item["name"] == "push_failed" for item in selected)
    push_funnel = {
        "sent": len(sent_by_key), "opened": push_opened, "acted": push_acted, "failed": push_failed,
        "open_rate": _percent(push_opened, len(sent_by_key)) if sent_by_key else None,
        "action_rate": _percent(push_acted, len(sent_by_key)) if sent_by_key else None,
        "campaigns": [{"name": name, "sent": values["sent"], "opened": values["opened"],
                       "acted": values["acted"], "open_rate": _percent(values["opened"], values["sent"]),
                       "action_rate": _percent(values["acted"], values["sent"])}
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
        value_rows = [r for r in after if r["ts"] >= completion and r["name"] in VALUE_NAMES]
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
        {"label": "Сделали ключевое действие", "value": valued, "rate": _percent(valued, len(starts)),
         "help": "Proxy ценности, а не оценка ощущений пользователя: получен ответ AIWA, завершён чек-ин, добавлены еда/тренировка или открыта сводка."},
    ]

    active_days_by_user: dict[str, set[str]] = defaultdict(set)
    feature_set_by_user: dict[str, set[str]] = defaultdict(set)
    for row in active_selected:
        active_days_by_user[row["device_id"]].add(
            datetime.fromtimestamp(row["ts"], timezone.utc).date().isoformat())
        feature = _feature(row)
        if feature: feature_set_by_user[row["device_id"]].add(feature)
    returning_users = sum(len(days_set) >= 2 for days_set in active_days_by_user.values())
    multi_feature_users = sum(len(feature_set) >= 2 for feature_set in feature_set_by_user.values())
    checkin_users = {r["device_id"] for r in checkins}
    product_health = [
        {"label": "Activation proxy", "value": _percent(valued, len(starts)) if starts else None,
         "unit": "%", "note": f"{valued} из {len(starts)} начавших",
         "help": "Доля начавших онбординг, которые затем сделали хотя бы одно ключевое действие. Это proxy, пока нет пользовательской оценки пользы."},
        {"label": "Time to value p50", "value": _pct(time_to_value, .5) if time_to_value else None,
         "unit": "duration", "note": "от старта онбординга",
         "help": "Медианное время от начала онбординга до первого ключевого действия. Считается только для активированных пользователей."},
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
                    (["Показан только точный слой v2; восстановленная история исключена из всех расчётов."]
                     if source_mode == "observed" and reconstructed else []) +
                    (["Есть реконструированные события: они расширяют историю, но не входят в точную стоимость."]
                     if source_mode == "mixed" and reconstructed else []),
    }

    avg_dau = active_user_days / max(1, available_days)
    per_active_day = lambda n: round(n / active_user_days, 2) if active_user_days else 0
    overview = {
        "ever_used": len(ever_ids), "dau": len(dau_ids), "wau": len(wau_ids), "mau": len(mau_ids),
        "sessions_per_dau": per_active_day(sessions), "tools_per_dau": per_active_day(len(ai_rows)),
    }
    label = "24h" if abs(window_days - 1) < 0.01 else f"{window_days:g}d"
    primary = [
        {"label": "Ever used", "value": len(ever_ids), "note": "уникальные пользователи · всё время",
         "help": "Уникальные псевдонимные пользователи, у которых было хотя бы одно продуктовое действие за всю доступную историю."},
        {"label": "MAU", "value": len(mau_ids), "note": "активные за последние 30 дней",
         "help": "Уникальные пользователи с продуктовой активностью за последние 30 суток. Системные AI-попытки и push-отправки не считаются активностью."},
        {"label": "Avg DAU", "value": round(avg_dau, 1),
         "note": f"среднее за {available_days} дн. с данными · окно {label}",
         "help": "Среднее число уникальных активных пользователей в день. Дни до начала сбора не входят в знаменатель."},
        {"label": "Daily sessions / user", "value": per_active_day(sessions), "note": "сессии на активного пользователя в день",
         "help": "Среднее число сессий на активного пользователя-день. Новая сессия начинается после 30 минут без продуктовых событий."},
        {"label": "Daily messages / user", "value": per_active_day(messages), "note": "сообщения пользователя в день",
         "help": "Среднее число сообщений пользователя AIWA на активного пользователя-день. Ответы AIWA сюда не входят."},
        {"label": "Daily AI calls / user", "value": per_active_day(len(ai_rows)), "note": "все попытки модели, включая retry",
         "help": "Среднее число технических обращений к AI-провайдерам на активного пользователя-день. Один запрос может создать несколько попыток из-за retry/fallback."},
    ]
    return {
        "updated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"), "window_days": window_days,
        "installs": len(ever_ids), "dau": len(selected_ids), "events": len(selected),
        "errors": (failed_requests if requests else 0) + explicit_errors, "overview": overview,
        "metrics": [{"label": x["label"], "value": str(x["value"]), "good": True} for x in primary],
        "primary": primary,
        "audience": {"ever_used": len(ever_ids), "active": len(selected_ids), "dau": len(dau_ids),
                     "wau": len(wau_ids), "mau": len(mau_ids), "avg_dau": round(avg_dau, 1),
                     "active_user_days": active_user_days},
        "engagement": {"sessions": sessions, "messages": messages, "responses": responses,
                       "sessions_per_active_day": per_active_day(sessions),
                       "messages_per_active_day": per_active_day(messages),
                       "avg_session_min": round(sum(session_lengths) / len(session_lengths) / 60, 1) if session_lengths else 0,
                       "events_per_session": round(sum(session_events) / len(session_events), 1) if session_events else 0,
                       "features": features,
                       "pushes_sent": len(pushes), "checkins_completed": len(checkins)},
        "funnel": funnel, "feature_funnels": feature_funnels,
        "product_health": product_health, "answer_quality": answer_quality,
        "push_funnel": push_funnel, "retention": _retention(rows),
        "series": _series(rows, window_days, now, available_start),
        "ai": {"attempts": len(ai_rows), "requests": len(requests), "untraced_attempts": len(ai_rows) - request_covered,
               "successful_requests": successful_requests,
               "failed_requests": failed_requests,
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
                          for k, v in sorted(models.items(), key=lambda kv: -kv[1]["calls"])]},
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


@app.get("/summary")
def summary(days: float = 1.0, source: str = "mixed") -> JSONResponse:
    return _no_store(compute_dashboard(days, source))


@app.get("/dashboard")
def dashboard_data(days: float = 1.0, source: str = "mixed") -> JSONResponse:
    return _no_store(compute_dashboard(days, source))


@app.get("/")
def dashboard() -> FileResponse:
    return FileResponse(HERE / "index.html")


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=PORT)
