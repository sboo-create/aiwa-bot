#!/usr/bin/env python3
"""Bounded capacity probe for the exact AIWA -> LiteLLM -> OpenRouter route.

The probe never writes prompts, responses, or credentials to its result files.
Run one concurrency stage at a time and inspect the shared LiteLLM host between
stages.
"""

from __future__ import annotations

import argparse
import asyncio
import csv
import json
import math
import os
import statistics
import time
from collections import Counter
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

import aiohttp


@dataclass(slots=True)
class CallResult:
    started_at: str
    request_index: int
    status: int
    ok: bool
    latency_ms: float
    error: str
    provider: str
    model: str
    prompt_tokens: int
    completion_tokens: int
    reported_cost_usd: float | None


def percentile(values: list[float], p: float) -> float | None:
    if not values:
        return None
    ordered = sorted(values)
    position = (len(ordered) - 1) * p
    lower = math.floor(position)
    upper = math.ceil(position)
    if lower == upper:
        return round(ordered[lower], 2)
    value = ordered[lower] + (ordered[upper] - ordered[lower]) * (
        position - lower
    )
    return round(value, 2)


def prompt_for(profile: str) -> tuple[list[dict[str, str]], int]:
    if profile == "short":
        return (
            [
                {
                    "role": "system",
                    "content": "Отвечай только одним словом, без пояснений.",
                },
                {"role": "user", "content": "Ответь ровно словом: ГОТОВО"},
            ],
            # DeepSeek may spend the first tokens on internal reasoning. Keep
            # this small, but large enough to produce the requested word.
            96,
        )
    return (
        [
            {
                "role": "system",
                "content": (
                    "Ты ассистент femtech-приложения. Отвечай строго JSON, "
                    "по-русски, без markdown."
                ),
            },
            {
                "role": "user",
                "content": (
                    "День цикла 24 из 29, поздняя лютеиновая фаза, до месячных "
                    "около 5 дней. Возраст 31 год, умеренная активность. Сегодня "
                    "отмечены средняя энергия и два симптома. Напиши короткую "
                    "персональную сводку на сегодня: 2-3 предложения о состоянии, "
                    "энергии и одном практичном действии. Добавь 3 разных коротких "
                    "вопроса про питание, нагрузку, сон или самочувствие. Ответь "
                    'строго JSON: {"summary":"...","suggestions":["...","...","..."]}.'
                ),
            },
        ],
        600,
    )


def safe_text(value: object, limit: int = 100) -> str:
    return str(value or "").strip()[:limit]


async def one_call(
    session: aiohttp.ClientSession,
    gate: asyncio.Semaphore,
    *,
    index: int,
    url: str,
    headers: dict[str, str],
    model: str,
    profile: str,
) -> CallResult:
    messages, max_tokens = prompt_for(profile)
    started_at = ""
    started = 0.0
    status = 0
    ok = False
    error = ""
    provider = ""
    actual_model = ""
    prompt_tokens = 0
    completion_tokens = 0
    reported_cost: float | None = None
    async with gate:
        started_at = datetime.now(timezone.utc).isoformat()
        started = time.monotonic()
        try:
            payload = {
                "model": model,
                "messages": messages,
                "temperature": 0.1 if profile == "short" else 0.55,
                "max_tokens": max_tokens,
            }
            async with session.post(url, headers=headers, json=payload) as response:
                status = response.status
                raw = await response.read()
                try:
                    data = json.loads(raw)
                except Exception:
                    data = {}
                if 200 <= status < 300:
                    choices = data.get("choices") if isinstance(data, dict) else None
                    content = ""
                    if isinstance(choices, list) and choices:
                        content = safe_text(
                            ((choices[0] or {}).get("message") or {}).get("content"),
                            4000,
                        )
                    ok = bool(content)
                    if not ok:
                        error = "empty_response"
                    usage = data.get("usage") or {}
                    prompt_tokens = int(usage.get("prompt_tokens") or 0)
                    completion_tokens = int(usage.get("completion_tokens") or 0)
                    provider = safe_text(data.get("provider"))
                    actual_model = safe_text(data.get("model"))
                else:
                    error = f"http_{status}"
                header_cost = response.headers.get("x-litellm-response-cost")
                json_cost = (
                    (data.get("usage") or {}).get("cost")
                    if isinstance(data, dict)
                    else None
                )
                raw_cost = header_cost if header_cost is not None else json_cost
                if raw_cost is not None:
                    try:
                        reported_cost = float(raw_cost)
                    except (TypeError, ValueError):
                        reported_cost = None
        except asyncio.TimeoutError:
            error = "timeout"
        except aiohttp.ClientError as exc:
            error = type(exc).__name__
        except Exception as exc:
            error = type(exc).__name__
    return CallResult(
        started_at=started_at,
        request_index=index,
        status=status,
        ok=ok,
        latency_ms=round((time.monotonic() - started) * 1000, 2),
        error=error,
        provider=provider,
        model=actual_model,
        prompt_tokens=prompt_tokens,
        completion_tokens=completion_tokens,
        reported_cost_usd=reported_cost,
    )


def summarize(
    rows: list[CallResult],
    *,
    concurrency: int,
    profile: str,
    wall_seconds: float,
    requested_model: str,
) -> dict:
    latencies = [row.latency_ms for row in rows]
    success = [row for row in rows if row.ok]
    success_latencies = [row.latency_ms for row in success]
    costs = [row.reported_cost_usd for row in rows if row.reported_cost_usd is not None]
    return {
        "captured_at": datetime.now(timezone.utc).isoformat(),
        "profile": profile,
        "requested_model": requested_model,
        "concurrency": concurrency,
        "requests": len(rows),
        "success": len(success),
        "errors": len(rows) - len(success),
        "success_rate": round(len(success) / len(rows), 6) if rows else None,
        "wall_seconds": round(wall_seconds, 3),
        "throughput_rps": round(len(success) / wall_seconds, 4)
        if wall_seconds
        else None,
        "latency_ms_all": {
            "mean": round(statistics.fmean(latencies), 2) if latencies else None,
            "p50": percentile(latencies, 0.50),
            "p95": percentile(latencies, 0.95),
            "p99": percentile(latencies, 0.99),
            "max": round(max(latencies), 2) if latencies else None,
        },
        "latency_ms_success": {
            "mean": round(statistics.fmean(success_latencies), 2)
            if success_latencies
            else None,
            "p50": percentile(success_latencies, 0.50),
            "p95": percentile(success_latencies, 0.95),
            "max": round(max(success_latencies), 2)
            if success_latencies
            else None,
        },
        "statuses": dict(Counter(str(row.status) for row in rows)),
        "errors_by_class": dict(Counter(row.error for row in rows if row.error)),
        "providers": dict(Counter(row.provider or "unknown" for row in success)),
        "models": dict(Counter(row.model or "unknown" for row in success)),
        "tokens": {
            "prompt": sum(row.prompt_tokens for row in rows),
            "completion": sum(row.completion_tokens for row in rows),
        },
        "reported_cost_usd": round(sum(costs), 9),
        "calls_with_cost": len(costs),
        "cost_complete": len(costs) == len(rows),
    }


async def run(args: argparse.Namespace) -> tuple[list[CallResult], dict]:
    base = args.base_url.rstrip("/")
    url = base if base.endswith("/chat/completions") else base + "/chat/completions"
    timeout = aiohttp.ClientTimeout(
        total=args.timeout_seconds,
        connect=min(10, args.timeout_seconds),
    )
    connector = aiohttp.TCPConnector(limit=max(args.concurrency * 2, 20))
    headers = {
        "Authorization": f"Bearer {args.api_key}",
        "Content-Type": "application/json",
        "X-AIWA-Load-Test": args.run_id,
    }
    gate = asyncio.Semaphore(args.concurrency)
    async with aiohttp.ClientSession(timeout=timeout, connector=connector) as session:
        started = time.monotonic()
        rows = await asyncio.gather(
            *[
                one_call(
                    session,
                    gate,
                    index=index,
                    url=url,
                    headers=headers,
                    model=args.model,
                    profile=args.profile,
                )
                for index in range(args.requests)
            ]
        )
        wall_seconds = time.monotonic() - started
    return rows, summarize(
        rows,
        concurrency=args.concurrency,
        profile=args.profile,
        wall_seconds=wall_seconds,
        requested_model=args.model,
    )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", default=os.environ.get("OPENROUTER_BASE_URL"))
    parser.add_argument("--api-key", default=os.environ.get("OPENROUTER_API_KEY"))
    parser.add_argument(
        "--model",
        default=os.environ.get("OPENROUTER_TEXT_MODEL"),
    )
    parser.add_argument("--profile", choices=("short", "today-note"), required=True)
    parser.add_argument("--concurrency", type=int, required=True)
    parser.add_argument("--requests", type=int, required=True)
    parser.add_argument("--timeout-seconds", type=float, default=75)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument(
        "--run-id",
        default=datetime.now(timezone.utc).strftime("aiwa-capacity-%Y%m%dT%H%M%SZ"),
    )
    args = parser.parse_args()
    if not args.base_url or not args.api_key or not args.model:
        parser.error("provider URL, key and model must be configured")
    parsed = urlsplit(args.base_url)
    if parsed.scheme != "http" or parsed.hostname not in {"127.0.0.1", "localhost"}:
        parser.error("refusing a non-loopback LiteLLM endpoint")
    if parsed.port != 14000:
        parser.error("refusing an unexpected LiteLLM tunnel port")
    if not str(args.model).startswith("openrouter/"):
        parser.error("refusing a model that is not routed through OpenRouter")
    if not 1 <= args.concurrency <= 64:
        parser.error("concurrency must be between 1 and 64")
    if not args.concurrency <= args.requests <= 256:
        parser.error("requests must be between concurrency and 256")
    return args


def main() -> None:
    args = parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)
    rows, summary = asyncio.run(run(args))
    stem = f"{args.profile}-c{args.concurrency}-n{args.requests}"
    raw_path = args.output_dir / f"{stem}.csv"
    summary_path = args.output_dir / f"{stem}.summary.json"
    with raw_path.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=CallResult.__dataclass_fields__)
        writer.writeheader()
        writer.writerows(asdict(row) for row in rows)
    summary_path.write_text(
        json.dumps(summary, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
