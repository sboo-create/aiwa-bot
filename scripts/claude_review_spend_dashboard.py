#!/usr/bin/env python3
"""Publish aggregate Claude reviewer spend to one GitHub issue."""

from __future__ import annotations

import argparse
import json
import os
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path


WINDOW_LABELS = {
    "today": "Сегодня",
    "7d": "7 дней",
    "30d": "30 дней",
}


def money(value: object) -> str:
    return f"${float(value or 0):.4f}"


def integer(value: object) -> str:
    return f"{int(value or 0):,}".replace(",", " ")


def render_dashboard(report: dict) -> str:
    budget = report["budget"]
    windows = report["windows"]
    reset_at = str(budget.get("reset_at") or "—")
    if reset_at != "—":
        reset_at = reset_at.replace(" ", "T", 1) + "Z"

    lines = [
        "# Claude reviewer — расходы",
        "",
        "> Автоматически обновляется из фактических spend logs LiteLLM. "
        "Тексты запросов и ответы модели сюда не попадают.",
        "",
        f"**Текущий период:** {money(budget['spent'])} из "
        f"{money(budget['limit'])} · осталось **{money(budget['remaining'])}** "
        f"· сброс `{reset_at}`",
        "",
        "| Период | Запросы | Input tokens | Output tokens | Расход |",
        "| --- | ---: | ---: | ---: | ---: |",
    ]
    for key in ("today", "7d", "30d"):
        item = windows.get(key) or {}
        lines.append(
            f"| {WINDOW_LABELS[key]} | {integer(item.get('requests'))} | "
            f"{integer(item.get('input_tokens'))} | "
            f"{integer(item.get('output_tokens'))} | "
            f"**{money(item.get('cost'))}** |"
        )

    model_totals: dict[str, dict[str, float]] = {}
    for model in (windows.get("30d") or {}).get("models") or []:
        model_totals[str(model["model"])] = model
    lines.extend([
        "",
        "## Модели за 30 дней",
        "",
        "| Модель | Запросы | Input tokens | Output tokens | Расход |",
        "| --- | ---: | ---: | ---: | ---: |",
    ])
    if model_totals:
        for name, item in sorted(
            model_totals.items(),
            key=lambda pair: float(pair[1].get("cost") or 0),
            reverse=True,
        ):
            lines.append(
                f"| `{name}` | {integer(item.get('requests'))} | "
                f"{integer(item.get('input_tokens'))} | "
                f"{integer(item.get('output_tokens'))} | "
                f"**{money(item.get('cost'))}** |"
            )
    else:
        lines.append("| — | 0 | 0 | 0 | $0.0000 |")

    lines.extend([
        "",
        "## По дням",
        "",
        "| Дата (UTC) | Запросы | Input tokens | Output tokens | Расход |",
        "| --- | ---: | ---: | ---: | ---: |",
    ])
    daily = report.get("daily") or []
    if daily:
        for item in daily:
            lines.append(
                f"| {item['date']} | {integer(item.get('requests'))} | "
                f"{integer(item.get('input_tokens'))} | "
                f"{integer(item.get('output_tokens'))} | "
                f"**{money(item.get('cost'))}** |"
            )
    else:
        lines.append("| — | 0 | 0 | 0 | $0.0000 |")

    generated_at = datetime.fromisoformat(
        str(report["generated_at"]).replace("Z", "+00:00")
    )
    lines.extend([
        "",
        f"_Обновлено: `{generated_at.isoformat(timespec='seconds')}` · "
        f"ключ: `{report['key_alias']}`_",
        "",
        "<!-- aiwa-claude-spend-dashboard -->",
    ])
    return "\n".join(lines)


def update_issue(repo: str, issue: int, token: str, body: str) -> None:
    if not repo or "/" not in repo:
        raise RuntimeError("invalid GITHUB_REPOSITORY")
    url = f"https://api.github.com/repos/{repo}/issues/{issue}"
    parsed = urllib.parse.urlsplit(url)
    if parsed.hostname != "api.github.com":
        raise RuntimeError("unsupported GitHub API host")
    request = urllib.request.Request(
        url,
        data=json.dumps({"body": body}, ensure_ascii=False).encode(),
        headers={
            "accept": "application/vnd.github+json",
            "authorization": f"Bearer {token}",
            "content-type": "application/json",
            "user-agent": "aiwa-claude-spend-dashboard/1",
            "x-github-api-version": "2022-11-28",
        },
        method="PATCH",
    )
    try:
        with urllib.request.urlopen(request, timeout=30):  # nosec B310
            return
    except urllib.error.HTTPError as exc:
        detail = exc.read(1_000).decode(errors="replace")
        raise RuntimeError(
            f"GitHub issue update failed with HTTP {exc.code}: {detail}"
        ) from None


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--issue", type=int, required=True)
    args = parser.parse_args()

    report = json.loads(args.input.read_text())
    body = render_dashboard(report)
    token = os.environ["GITHUB_TOKEN"].strip()
    repo = os.environ["GITHUB_REPOSITORY"].strip()
    if not token:
        raise RuntimeError("GITHUB_TOKEN is empty")
    update_issue(repo, args.issue, token, body)

    summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary, "a", encoding="utf-8") as output:
            output.write(body + "\n")


if __name__ == "__main__":
    main()
