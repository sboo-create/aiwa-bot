#!/usr/bin/env python3
"""Emit aggregate LiteLLM spend for the dedicated AIWA reviewer key."""

from __future__ import annotations

import json
import subprocess
from datetime import datetime, timezone


KEY_ALIAS = "github-aiwa-claude-review"
DATABASE = "litellm"


def psql(query: str) -> list[list[str]]:
    result = subprocess.run(
        [
            "sudo",
            "-u",
            "postgres",
            "psql",
            "-d",
            DATABASE,
            "-A",
            "-F",
            "\t",
            "-t",
            "-q",
            "-c",
            query,
        ],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    return [
        line.split("\t")
        for line in result.stdout.splitlines()
        if line.strip()
    ]


def main() -> None:
    budget_rows = psql(
        """
        SELECT
            COALESCE(spend, 0),
            COALESCE(max_budget, 0),
            COALESCE(budget_reset_at::text, '')
        FROM "LiteLLM_VerificationToken"
        WHERE key_alias = 'github-aiwa-claude-review'
        """
    )
    if len(budget_rows) != 1:
        raise RuntimeError(f"expected one reviewer key, got {len(budget_rows)}")

    stats_rows = psql(
        """
        WITH reviewer_key AS (
            SELECT token
            FROM "LiteLLM_VerificationToken"
            WHERE key_alias = 'github-aiwa-claude-review'
        ),
        windows(name, starts_at) AS (
            VALUES
                ('today', date_trunc('day', now())),
                ('7d', now() - interval '7 days'),
                ('30d', now() - interval '30 days')
        )
        SELECT
            windows.name,
            COALESCE(logs.model_group, logs.model, 'unknown'),
            COUNT(logs.request_id),
            COALESCE(SUM(logs.prompt_tokens), 0),
            COALESCE(SUM(logs.completion_tokens), 0),
            COALESCE(SUM(logs.spend), 0)
        FROM windows
        CROSS JOIN reviewer_key
        LEFT JOIN "LiteLLM_SpendLogs" AS logs
          ON logs.api_key = reviewer_key.token
         AND logs."startTime" >= windows.starts_at
        GROUP BY windows.name, COALESCE(logs.model_group, logs.model, 'unknown')
        ORDER BY windows.name, 6 DESC
        """
    )

    daily_rows = psql(
        """
        WITH reviewer_key AS (
            SELECT token
            FROM "LiteLLM_VerificationToken"
            WHERE key_alias = 'github-aiwa-claude-review'
        )
        SELECT
            logs."startTime"::date,
            COUNT(logs.request_id),
            COALESCE(SUM(logs.prompt_tokens), 0),
            COALESCE(SUM(logs.completion_tokens), 0),
            COALESCE(SUM(logs.spend), 0)
        FROM "LiteLLM_SpendLogs" AS logs
        JOIN reviewer_key ON logs.api_key = reviewer_key.token
        WHERE logs."startTime" >= now() - interval '30 days'
        GROUP BY 1
        ORDER BY 1 DESC
        """
    )

    spent, limit, reset_at = budget_rows[0]
    windows: dict[str, dict] = {}
    for name, model, requests, input_tokens, output_tokens, cost in stats_rows:
        if model == "unknown" and int(requests) == 0:
            models = []
        else:
            models = [{
                "model": model,
                "requests": int(requests),
                "input_tokens": int(input_tokens),
                "output_tokens": int(output_tokens),
                "cost": float(cost),
            }]
        window = windows.setdefault(name, {"models": []})
        window["models"].extend(models)

    for window in windows.values():
        window["requests"] = sum(item["requests"] for item in window["models"])
        window["input_tokens"] = sum(
            item["input_tokens"] for item in window["models"]
        )
        window["output_tokens"] = sum(
            item["output_tokens"] for item in window["models"]
        )
        window["cost"] = sum(item["cost"] for item in window["models"])

    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "key_alias": KEY_ALIAS,
        "budget": {
            "spent": float(spent),
            "limit": float(limit),
            "remaining": max(float(limit) - float(spent), 0.0),
            "reset_at": reset_at,
        },
        "windows": windows,
        "daily": [
            {
                "date": date,
                "requests": int(requests),
                "input_tokens": int(input_tokens),
                "output_tokens": int(output_tokens),
                "cost": float(cost),
            }
            for date, requests, input_tokens, output_tokens, cost in daily_rows
        ],
    }
    print(json.dumps(payload, ensure_ascii=False, separators=(",", ":")))


if __name__ == "__main__":
    main()
