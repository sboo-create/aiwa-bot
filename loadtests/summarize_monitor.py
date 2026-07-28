#!/usr/bin/env python3
"""Summarize host_monitor.py CSV output for a load experiment."""

import argparse
import csv
import json
import math
from datetime import datetime
from pathlib import Path


def percentile(values, p):
    values = sorted(values)
    if not values:
        return None
    position = (len(values) - 1) * p
    low = math.floor(position)
    high = math.ceil(position)
    if low == high:
        return values[low]
    return values[low] + (values[high] - values[low]) * (position - low)


def rounded(value, digits=3):
    return round(value, digits) if value is not None else None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("csv", type=Path)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()

    with args.csv.open(newline="", encoding="utf-8") as fh:
        rows = list(csv.DictReader(fh))
    if not rows:
        raise SystemExit("monitor CSV has no samples")

    def numbers(field):
        return [float(row[field]) for row in rows]

    service_cpu = numbers("service_cpu_usec")
    process_cpu = numbers("process_cpu_ticks")
    try:
        duration = max(
            0.001,
            (
                datetime.fromisoformat(rows[-1]["captured_at"])
                - datetime.fromisoformat(rows[0]["captured_at"])
            ).total_seconds(),
        )
    except Exception:
        duration = max(0.001, (len(rows) - 1) * 2)
    result = {
        "samples": len(rows),
        "duration_estimate_seconds": duration,
        "host": {
            "load1_max": rounded(max(numbers("host_load1"))),
            "load5_max": rounded(max(numbers("host_load5"))),
            "mem_available_min_bytes": int(min(numbers("mem_available_bytes"))),
            "swap_free_min_bytes": int(min(numbers("swap_free_bytes"))),
        },
        "service": {
            "cpu_average_cores": rounded(
                max(0, service_cpu[-1] - service_cpu[0]) / 1_000_000 / duration
            ),
            "memory_max_bytes": int(max(numbers("service_memory_bytes"))),
            "memory_peak_max_bytes": int(max(numbers("service_memory_peak_bytes"))),
            "pids_max": int(max(numbers("service_pids"))),
            "restarts_first": int(numbers("service_restarts")[0]),
            "restarts_last": int(numbers("service_restarts")[-1]),
        },
        "process": {
            "count_min": int(min(numbers("process_count"))),
            "rss_max_bytes": int(max(numbers("process_rss_bytes"))),
            "cpu_ticks_delta": int(max(0, process_cpu[-1] - process_cpu[0])),
        },
        "storage": {
            "db_first_bytes": int(numbers("db_bytes")[0]),
            "db_last_bytes": int(numbers("db_bytes")[-1]),
            "wal_max_bytes": int(max(numbers("wal_bytes"))),
            "shm_max_bytes": int(max(numbers("shm_bytes"))),
        },
        "health": {
            "success": sum(1 for value in numbers("health_status") if value == 200),
            "total": len(rows),
            "latency_ms_p50": rounded(percentile(numbers("health_ms"), 0.50)),
            "latency_ms_p95": rounded(percentile(numbers("health_ms"), 0.95)),
            "latency_ms_p99": rounded(percentile(numbers("health_ms"), 0.99)),
            "latency_ms_max": rounded(max(numbers("health_ms"))),
        },
    }
    payload = json.dumps(result, indent=2) + "\n"
    if args.output:
        args.output.write_text(payload, encoding="utf-8")
    print(payload, end="")


if __name__ == "__main__":
    main()
