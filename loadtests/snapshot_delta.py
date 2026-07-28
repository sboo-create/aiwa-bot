#!/usr/bin/env python3
"""Calculate cost/token/data deltas between two target snapshots."""

import argparse
import json
from pathlib import Path


LLM_FIELDS = (
    "calls",
    "success",
    "input_tokens",
    "output_tokens",
    "cached_tokens",
    "total_tokens",
    "reported_cost_usd",
    "calls_without_cost",
)
TOP_FIELDS = (
    "users",
    "synthetic_users",
    "events",
    "events_v2",
    "meals",
    "workouts",
)


def number(value):
    return value if isinstance(value, (int, float)) else 0


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("before", type=Path)
    parser.add_argument("after", type=Path)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    before = json.loads(args.before.read_text(encoding="utf-8"))
    after = json.loads(args.after.read_text(encoding="utf-8"))
    result = {
        "before_at": before["captured_at"],
        "after_at": after["captured_at"],
        "rows": {
            field: number(after.get(field)) - number(before.get(field))
            for field in TOP_FIELDS
        },
        "llm": {
            field: round(
                number((after.get("llm") or {}).get(field))
                - number((before.get("llm") or {}).get(field)),
                10,
            )
            for field in LLM_FIELDS
        },
        "file_bytes": {
            field: number((after.get("files") or {}).get(field))
            - number((before.get("files") or {}).get(field))
            for field in ("db", "-wal", "-shm")
        },
        "ai_jobs_before": before.get("ai_jobs") or {},
        "ai_jobs_after": after.get("ai_jobs") or {},
        "ai_jobs_delta": {
            field: number((after.get("ai_jobs") or {}).get(field))
            - number((before.get("ai_jobs") or {}).get(field))
            for field in (
                "total", "completed", "failed", "accepted_events",
                "deduped_events", "rejected_events",
            )
        },
    }
    result["cost_complete"] = result["llm"]["calls_without_cost"] == 0
    result["cost_note"] = (
        "reported_cost_usd is complete for this experiment"
        if result["cost_complete"]
        else "some calls did not report cost; do not interpret missing cost as zero"
    )
    rendered = json.dumps(result, ensure_ascii=False, indent=2) + "\n"
    if args.output:
        args.output.write_text(rendered, encoding="utf-8")
    print(rendered, end="")


if __name__ == "__main__":
    main()
