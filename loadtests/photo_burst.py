#!/usr/bin/env python3
"""Bounded real-photo burst test for the isolated AIWA staging environment."""

from __future__ import annotations

import argparse
import asyncio
import hashlib
import hmac
import json
import math
import statistics
import time
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlsplit

import aiohttp


EXPECTED_HOST = "aiwa-staging-167.158-160-163-167.sslip.io"


def percentile(values: list[float], p: float) -> float | None:
    if not values:
        return None
    ordered = sorted(values)
    index = (len(ordered) - 1) * p
    lower = math.floor(index)
    upper = math.ceil(index)
    if lower == upper:
        return round(ordered[lower], 2)
    return round(
        ordered[lower] + (ordered[upper] - ordered[lower]) * (index - lower),
        2,
    )


def signed_init_data(token: str, user_id: int, run_id: str) -> str:
    pairs = {
        "auth_date": str(int(time.time())),
        "query_id": f"photo-loadtest-{run_id}-{user_id}",
        "user": json.dumps(
            {"id": user_id, "first_name": "PhotoLoadtest"},
            separators=(",", ":"),
        ),
    }
    check = "\n".join(f"{key}={pairs[key]}" for key in sorted(pairs))
    secret = hmac.new(b"WebAppData", token.encode(), hashlib.sha256).digest()
    pairs["hash"] = hmac.new(secret, check.encode(), hashlib.sha256).hexdigest()
    return urlencode(pairs)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", default=f"https://{EXPECTED_HOST}")
    parser.add_argument("--confirm-staging-host", required=True)
    parser.add_argument("--expected-version", required=True)
    parser.add_argument("--token-file", type=Path, default=Path(".secrets/bot-token"))
    parser.add_argument("--photo", type=Path, required=True)
    parser.add_argument("--users", type=int, required=True)
    parser.add_argument("--ramp-seconds", type=float, default=0)
    parser.add_argument("--timeout-seconds", type=float, default=120)
    parser.add_argument("--user-id-base", type=int, required=True)
    parser.add_argument("--output-root", type=Path, default=Path("results/photo-burst"))
    args = parser.parse_args()
    parsed = urlsplit(args.base_url)
    if parsed.scheme != "https" or parsed.hostname != EXPECTED_HOST:
        raise SystemExit("Refusing non-HTTPS or unknown target")
    if parsed.hostname != args.confirm_staging_host:
        raise SystemExit("Target host does not match --confirm-staging-host")
    if not 1 <= args.users <= 200:
        raise SystemExit("--users must be between 1 and 200")
    if not 0 <= args.ramp_seconds <= 60:
        raise SystemExit("--ramp-seconds must be between 0 and 60")
    if not args.photo.is_file():
        raise SystemExit("Photo file not found")
    if not 1 <= args.photo.stat().st_size <= 2 * 1024 * 1024:
        raise SystemExit("Test photo must be between 1 byte and 2 MiB")
    return args


async def main(args: argparse.Namespace) -> int:
    token = args.token_file.read_text(encoding="utf-8").strip()
    if ":" not in token or len(token) < 20:
        raise SystemExit("Token file does not look like a Telegram bot token")
    photo = args.photo.read_bytes()
    run_id = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    started_at = datetime.now(timezone.utc).isoformat()
    timeout = aiohttp.ClientTimeout(total=args.timeout_seconds)
    connector = aiohttp.TCPConnector(
        limit=args.users + 10,
        limit_per_host=args.users + 10,
        ttl_dns_cache=300,
    )
    headers = {
        "User-Agent": "AIWA-Photo-LoadTest/1.0",
        "X-AIWA-Loadtest-Run": run_id,
    }
    rows: list[dict] = []

    async with aiohttp.ClientSession(
        timeout=timeout,
        connector=connector,
        headers=headers,
    ) as session:
        async with session.get(urljoin(args.base_url, "/health")) as response:
            health = await response.json()
            if response.status != 200 or health.get("version") != args.expected_version:
                raise RuntimeError(
                    f"Health/version preflight failed: {response.status} "
                    f"{health.get('version')!r}"
                )

        async def upload(index: int, start: float) -> None:
            due = start + args.ramp_seconds * index / max(1, args.users - 1)
            await asyncio.sleep(max(0, due - time.monotonic()))
            user_id = args.user_id_base + index
            form = aiohttp.FormData()
            form.add_field(
                "initData",
                signed_init_data(token, user_id, run_id),
            )
            form.add_field(
                "photo",
                photo,
                filename=args.photo.name,
                content_type="image/png",
            )
            wall = datetime.now(timezone.utc).isoformat()
            began = time.monotonic()
            status = 0
            error = ""
            business_ok = False
            response_bytes = 0
            try:
                async with session.post(
                    urljoin(args.base_url, "/api/food_photo"),
                    data=form,
                ) as response:
                    status = response.status
                    raw = await response.read()
                    response_bytes = len(raw)
                    try:
                        body = json.loads(raw)
                    except Exception:
                        body = {}
                        error = "invalid_json"
                    business_ok = 200 <= status < 300 and bool(body.get("ok"))
                    if not business_ok and not error:
                        if body.get("error"):
                            error = "business_" + str(body["error"])[:40]
                        elif body.get("message"):
                            error = "business_not_ok"
                        else:
                            error = f"http_{status}"
            except asyncio.TimeoutError:
                error = "timeout"
            except aiohttp.ClientError as exc:
                error = type(exc).__name__
            except Exception as exc:
                error = type(exc).__name__
            rows.append(
                {
                    "started_at": wall,
                    "user_index": index,
                    "status": status,
                    "ok": business_ok,
                    "latency_ms": round((time.monotonic() - began) * 1000, 2),
                    "request_bytes": len(photo),
                    "response_bytes": response_bytes,
                    "error": error,
                }
            )

        started = time.monotonic()
        await asyncio.gather(*(upload(i, started) for i in range(args.users)))
        duration = time.monotonic() - started

    latencies = [row["latency_ms"] for row in rows]
    ok = sum(row["ok"] for row in rows)
    summary = {
        "run_id": run_id,
        "started_at": started_at,
        "finished_at": datetime.now(timezone.utc).isoformat(),
        "target": args.base_url,
        "target_version": args.expected_version,
        "scenario": "photo-burst",
        "users": args.users,
        "ramp_seconds": args.ramp_seconds,
        "photo_bytes": len(photo),
        "duration_seconds": round(duration, 3),
        "successful": ok,
        "failed": len(rows) - ok,
        "success_rate": round(ok / len(rows), 6),
        "latency_ms": {
            "p50": percentile(latencies, 0.50),
            "p90": percentile(latencies, 0.90),
            "p95": percentile(latencies, 0.95),
            "p99": percentile(latencies, 0.99),
            "max": round(max(latencies), 2),
            "mean": round(statistics.fmean(latencies), 2),
        },
        "statuses": dict(sorted(Counter(str(row["status"]) for row in rows).items())),
        "errors": dict(
            sorted(Counter(row["error"] for row in rows if row["error"]).items())
        ),
    }
    output = args.output_root / run_id
    output.mkdir(parents=True, exist_ok=False)
    (output / "summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    (output / "requests.json").write_text(
        json.dumps(rows, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps({"output": str(output), **summary}, ensure_ascii=False))
    return 0 if summary["success_rate"] >= 0.98 else 2


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main(parse_args())))
