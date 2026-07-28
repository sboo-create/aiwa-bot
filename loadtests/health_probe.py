#!/usr/bin/env python3
"""External health availability/latency probe."""

import argparse
import asyncio
import csv
import json
import math
import time
from datetime import datetime, timezone
from pathlib import Path

import aiohttp


def percentile(values, p):
    if not values:
        return None
    values = sorted(values)
    index = (len(values) - 1) * p
    low, high = math.floor(index), math.ceil(index)
    value = values[low] if low == high else values[low] + (
        values[high] - values[low]
    ) * (index - low)
    return round(value, 3)


async def main_async(args):
    rows = []
    deadline = time.monotonic() + args.duration
    timeout = aiohttp.ClientTimeout(total=args.timeout)
    async with aiohttp.ClientSession(
        timeout=timeout, headers={"User-Agent": "AIWA-HealthProbe/1.0"}
    ) as session:
        while time.monotonic() < deadline:
            started_wall = datetime.now(timezone.utc).isoformat()
            started = time.monotonic()
            status = 0
            error = ""
            try:
                async with session.get(args.url) as response:
                    status = response.status
                    await response.read()
            except Exception as exc:
                error = type(exc).__name__
            elapsed = (time.monotonic() - started) * 1000
            rows.append((started_wall, status, round(elapsed, 3), error))
            await asyncio.sleep(max(0, args.interval - elapsed / 1000))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.writer(fh)
        writer.writerow(("captured_at", "status", "latency_ms", "error"))
        writer.writerows(rows)
    latencies = [row[2] for row in rows]
    summary = {
        "samples": len(rows),
        "success": sum(1 for row in rows if row[1] == 200),
        "availability": (
            round(sum(1 for row in rows if row[1] == 200) / len(rows), 6)
            if rows
            else None
        ),
        "latency_ms": {
            "p50": percentile(latencies, 0.50),
            "p95": percentile(latencies, 0.95),
            "p99": percentile(latencies, 0.99),
            "max": max(latencies) if latencies else None,
        },
    }
    summary_path = args.output.with_suffix(".summary.json")
    summary_path.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summary))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", required=True)
    parser.add_argument("--duration", type=float, required=True)
    parser.add_argument("--interval", type=float, default=1)
    parser.add_argument("--timeout", type=float, default=3)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    asyncio.run(main_async(args))


if __name__ == "__main__":
    main()
