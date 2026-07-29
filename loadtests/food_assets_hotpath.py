#!/usr/bin/env python3
"""Offline 1k-user guard for the food asset/section fast path.

No provider, Telegram, staging, or production traffic is used. The script
measures resolver overhead and verifies that a cold section burst is bounded by
AIWA_SECTION_PENDING_MAX.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import sys
import time
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "loadtest-analytics-salt")
os.environ.setdefault("AIWA_FOOD_ASSET_GENERATION", "0")

import aiwa_bot as bot
import food_assets as assets


RECORDS = [
    {"title": "Омлет с сыром и зеленью", "fclass": "белковое"},
    {"title": "Гречка с запеченной куриной грудкой", "fclass": "смешанное"},
    {"title": "Творожная запеканка", "fclass": "молочное"},
    {"title": "Курага", "fclass": "углеводное"},
    {"title": "Неизвестные кукурузные снеки", "fclass": "углеводное"},
    {"title": "Кедровый кофе", "fclass": "напиток"},
]


def percentile(values: list[float], quantile: float) -> float:
    ordered = sorted(values)
    if not ordered:
        return 0.0
    index = min(len(ordered) - 1, int((len(ordered) - 1) * quantile))
    return ordered[index]


def resolve_batch() -> float:
    started = time.perf_counter()
    for record in RECORDS:
        assets.decorate(record)
    return (time.perf_counter() - started) * 1000


async def resolver_burst(users: int) -> dict:
    started = time.perf_counter()
    latencies = await asyncio.gather(*[
        asyncio.to_thread(resolve_batch) for _ in range(users)
    ])
    wall_ms = (time.perf_counter() - started) * 1000
    return {
        "users": users,
        "records": users * len(RECORDS),
        "wall_ms": round(wall_ms, 2),
        "per_user_ms": {
            "p50": round(percentile(latencies, 0.50), 4),
            "p95": round(percentile(latencies, 0.95), 4),
            "p99": round(percentile(latencies, 0.99), 4),
            "max": round(max(latencies), 4),
        },
    }


class Request:
    def __init__(self, cid: int):
        self.cid = cid

    async def json(self):
        return {"initData": str(self.cid), "kind": "food"}


async def section_burst(users: int, wait_seconds: float, pending_limit: int) -> dict:
    gate = asyncio.Event()
    user = {
        "chat_id": 1, "mode": "male", "height": 180, "weight": 80,
        "age": 35, "activity": 3, "modules": ["food"],
    }

    async def slow_model(*_args, **_kwargs):
        await gate.wait()
        return {}

    bot._SECTION_CACHE.clear()
    bot._SECTION_TASKS.clear()
    started = time.perf_counter()
    with (
        mock.patch.object(bot, "_verify_init", side_effect=lambda value: int(value)),
        mock.patch.object(bot, "row", side_effect=lambda cid: dict(user, chat_id=cid)),
        mock.patch.object(
            bot, "status_of",
            side_effect=lambda cid: (dict(user, chat_id=cid), None),
        ),
        mock.patch.object(bot, "is_onboarded", return_value=True),
        mock.patch.object(bot, "profile_of", side_effect=lambda value: value),
        mock.patch.object(bot, "llm_to_thread", side_effect=slow_model),
        mock.patch.object(bot, "ev"),
        mock.patch.object(bot, "_SECTION_FAST_WAIT_SECONDS", wait_seconds),
        mock.patch.object(bot, "_SECTION_PENDING_LIMIT", pending_limit),
    ):
        responses = await asyncio.gather(*[
            bot._api_section(Request(800_000_000_000 + index))
            for index in range(users)
        ])
        peak_pending = len(bot._SECTION_TASKS)
    wall_ms = (time.perf_counter() - started) * 1000
    payloads = [json.loads(response.text) for response in responses]
    for task in list(bot._SECTION_TASKS.values()):
        task.cancel()
    await asyncio.gather(*list(bot._SECTION_TASKS.values()), return_exceptions=True)
    bot._SECTION_TASKS.clear()
    return {
        "users": users,
        "wall_ms": round(wall_ms, 2),
        "peak_pending": peak_pending,
        "pending_limit": pending_limit,
        "capacity_limited": sum(
            bool(payload.get("capacity_limited")) for payload in payloads
        ),
        "refreshing": sum(bool(payload.get("refreshing")) for payload in payloads),
    }


async def main(args) -> int:
    resolver = await resolver_burst(args.users)
    section = await section_burst(
        args.users, args.section_wait_seconds, args.pending_limit
    )
    report = {
        "resolver": resolver,
        "section": section,
        "generation_enabled": assets.generation_enabled(),
        "provider_calls": 0,
    }
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if assets.generation_enabled():
        return 2
    if section["peak_pending"] > args.pending_limit:
        return 3
    if section["capacity_limited"] < args.users - args.pending_limit:
        return 4
    if resolver["per_user_ms"]["p95"] > args.max_resolver_p95_ms:
        return 5
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--users", type=int, default=1000)
    parser.add_argument("--pending-limit", type=int, default=96)
    parser.add_argument("--section-wait-seconds", type=float, default=0.05)
    parser.add_argument("--max-resolver-p95-ms", type=float, default=5.0)
    options = parser.parse_args()
    if not 1 <= options.users <= 5000:
        parser.error("--users must be between 1 and 5000")
    raise SystemExit(asyncio.run(main(options)))
