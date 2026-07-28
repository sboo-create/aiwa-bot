#!/usr/bin/env python3
"""Bounded asyncio load generator for the isolated AIWA staging environment."""

from __future__ import annotations

import argparse
import asyncio
import csv
import gzip
import hashlib
import hmac
import json
import math
import os
import random
import re
import resource
import socket
import statistics
import sys
import time
import uuid
from collections import Counter, defaultdict
from dataclasses import asdict, dataclass
from datetime import date, datetime, timezone
from pathlib import Path
from urllib.parse import urlencode, urljoin, urlsplit

import aiohttp


EXPECTED_HOST = "aiwa-staging-167.158-160-163-167.sslip.io"
EXPECTED_VERSION = "2026-07-28-v160-staging-hotfix"
DEFAULT_USER_ID_BASE = 790_002_000_000


@dataclass(slots=True)
class RequestResult:
    started_at: str
    category: str
    route: str
    method: str
    status: int
    latency_ms: float
    ok: bool
    response_bytes: int
    error: str


class Results:
    def __init__(self) -> None:
        self.rows: list[RequestResult] = []
        self.iterations = 0
        self.completed_users: set[int] = set()
        self.loop_drift_ms: list[float] = []

    def add(self, row: RequestResult) -> None:
        self.rows.append(row)


def percentile(values: list[float], p: float) -> float | None:
    if not values:
        return None
    ordered = sorted(values)
    index = (len(ordered) - 1) * p
    lower = math.floor(index)
    upper = math.ceil(index)
    if lower == upper:
        return round(ordered[lower], 2)
    value = ordered[lower] + (ordered[upper] - ordered[lower]) * (index - lower)
    return round(value, 2)


def stats_for(rows: list[RequestResult]) -> dict:
    latencies = [row.latency_ms for row in rows]
    ok_count = sum(row.ok for row in rows)
    return {
        "requests": len(rows),
        "ok": ok_count,
        "errors": len(rows) - ok_count,
        "success_rate": round(ok_count / len(rows), 6) if rows else None,
        "latency_ms": {
            "p50": percentile(latencies, 0.50),
            "p90": percentile(latencies, 0.90),
            "p95": percentile(latencies, 0.95),
            "p99": percentile(latencies, 0.99),
            "max": round(max(latencies), 2) if latencies else None,
            "mean": round(statistics.fmean(latencies), 2) if latencies else None,
        },
        "statuses": dict(sorted(Counter(str(row.status) for row in rows).items())),
        "errors_by_class": dict(
            sorted(Counter(row.error for row in rows if row.error).items())
        ),
    }


def signed_init_data(token: str, user_id: int, run_id: str) -> str:
    pairs = {
        "auth_date": str(int(time.time())),
        "query_id": f"loadtest-{run_id}-{user_id}",
        "user": json.dumps(
            {"id": user_id, "first_name": "Loadtest"},
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
    parser.add_argument("--expected-version", default=EXPECTED_VERSION)
    token_source = parser.add_mutually_exclusive_group()
    token_source.add_argument(
        "--token-file", type=Path, default=Path(".secrets/bot-token")
    )
    token_source.add_argument(
        "--token-stdin",
        action="store_true",
        help="read the bot token from stdin without persisting it on the generator",
    )
    parser.add_argument(
        "--scenario",
        choices=("smoke", "cold-open", "core", "writes", "integrated", "burst"),
        required=True,
    )
    parser.add_argument("--users", type=int, required=True)
    parser.add_argument("--ramp-seconds", type=float, default=30)
    parser.add_argument("--hold-seconds", type=float, default=180)
    parser.add_argument("--think-min", type=float, default=2)
    parser.add_argument("--think-max", type=float, default=6)
    parser.add_argument("--timeout-seconds", type=float, default=60)
    parser.add_argument("--user-id-base", type=int, default=DEFAULT_USER_ID_BASE)
    parser.add_argument("--asset-limit", type=int, default=30)
    parser.add_argument("--ai-share", type=float, default=0.08)
    parser.add_argument("--ai-concurrency", type=int, default=2)
    parser.add_argument("--max-error-rate", type=float, default=0.02)
    parser.add_argument("--output-root", type=Path, default=Path("results"))
    parser.add_argument("--preflight-only", action="store_true")
    return parser.parse_args()


def validate_args(args: argparse.Namespace) -> None:
    parsed = urlsplit(args.base_url)
    if parsed.scheme != "https":
        raise SystemExit("Refusing a non-HTTPS target")
    if parsed.hostname != args.confirm_staging_host:
        raise SystemExit("Target host does not match --confirm-staging-host")
    if parsed.hostname != EXPECTED_HOST:
        raise SystemExit(f"Refusing unknown host: {parsed.hostname}")
    if not 1 <= args.users <= 1000:
        raise SystemExit("--users must be between 1 and 1000")
    if args.ramp_seconds < 0 or args.hold_seconds <= 0:
        raise SystemExit("Invalid ramp/hold")
    if not 0 <= args.ai_share <= 0.25:
        raise SystemExit("--ai-share must be between 0 and 0.25")
    if not 1 <= args.ai_concurrency <= 20:
        raise SystemExit("--ai-concurrency must be between 1 and 20")
    if args.scenario != "integrated" and args.ai_share != 0.08:
        raise SystemExit("--ai-share applies only to the integrated scenario")
    if not args.token_stdin and not args.token_file.is_file():
        raise SystemExit(f"Token file not found: {args.token_file}")


class LoadRun:
    def __init__(self, args: argparse.Namespace, token: str) -> None:
        self.args = args
        self.token = token
        self.results = Results()
        self.run_id = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
        self.ai_gate = asyncio.Semaphore(args.ai_concurrency)
        self.assets: list[str] = []
        self.stop_monitor = asyncio.Event()

    def init_data(self, user_index: int) -> str:
        return signed_init_data(
            self.token,
            self.args.user_id_base + user_index,
            self.run_id,
        )

    async def request(
        self,
        session: aiohttp.ClientSession,
        method: str,
        route: str,
        *,
        category: str,
        json_body: dict | None = None,
    ) -> tuple[bool, dict | str | None]:
        started_wall = datetime.now(timezone.utc).isoformat()
        started = time.monotonic()
        status = 0
        response_bytes = 0
        error = ""
        body: dict | str | None = None
        ok = False
        try:
            async with session.request(
                method,
                urljoin(self.args.base_url.rstrip("/") + "/", route.lstrip("/")),
                json=json_body,
            ) as response:
                status = response.status
                raw = await response.read()
                response_bytes = len(raw)
                if "application/json" in response.headers.get("Content-Type", ""):
                    try:
                        body = json.loads(raw)
                    except Exception:
                        error = "invalid_json"
                else:
                    body = raw.decode("utf-8", errors="replace")
                ok = 200 <= status < 300
                if isinstance(body, dict) and body.get("error"):
                    ok = False
                    error = "business_" + re.sub(
                        r"[^a-z0-9_]", "", str(body["error"]).lower()
                    )[:40]
                if not ok and not error:
                    error = f"http_{status}"
        except asyncio.TimeoutError:
            error = "timeout"
        except aiohttp.ClientError as exc:
            error = type(exc).__name__
        except Exception as exc:
            error = type(exc).__name__
        elapsed_ms = (time.monotonic() - started) * 1000
        self.results.add(
            RequestResult(
                started_at=started_wall,
                category=category,
                route=route,
                method=method,
                status=status,
                latency_ms=elapsed_ms,
                ok=ok,
                response_bytes=response_bytes,
                error=error,
            )
        )
        return ok, body

    async def preflight(self, session: aiohttp.ClientSession) -> dict:
        ok, health = await self.request(
            session, "GET", "/health", category="preflight"
        )
        if not ok or not isinstance(health, dict):
            raise RuntimeError("Health preflight failed")
        if health.get("version") != self.args.expected_version:
            raise RuntimeError(
                f"Version mismatch: {health.get('version')} != {self.args.expected_version}"
            )
        # Preflight must remain side-effect-light so AI work is not hidden
        # outside the measured experiment. /api/diary verifies auth/onboarding.
        ok, data = await self.request(
            session,
            "POST",
            "/api/diary",
            category="preflight",
            json_body={"initData": self.init_data(0)},
        )
        ok_last, _ = await self.request(
            session,
            "POST",
            "/api/diary",
            category="preflight",
            json_body={"initData": self.init_data(self.args.users - 1)},
        )
        if not ok or not ok_last or not isinstance(data, dict):
            raise RuntimeError(
                "Synthetic users are not seeded/onboarded; refusing to run load"
            )
        ok, index = await self.request(session, "GET", "/", category="preflight")
        if not ok or not isinstance(index, str):
            raise RuntimeError("Index preflight failed")
        candidates = re.findall(
            r"""(?:src|href)=["']([^"'?#]+\.(?:js|css))""", index, flags=re.I
        )
        # Load only staging-owned assets. External Telegram SDK availability is
        # not a property of AIWA and must not distort service latency/errors.
        initial_assets = [
            candidate
            for candidate in dict.fromkeys(candidates)
            if not urlsplit(candidate).scheme and not urlsplit(candidate).netloc
        ]
        self.assets = []
        pending = list(initial_assets)
        seen = set()
        dependency_re = re.compile(
            r"""["']([^"'?#]+\.(?:js|css|woff2?|otf|ttf))["']""",
            flags=re.I,
        )
        css_url_re = re.compile(
            r"""url\(\s*["']?([^)"'?#]+\.(?:woff2?|otf|ttf))["']?\s*\)""",
            flags=re.I,
        )
        while pending and len(self.assets) < self.args.asset_limit:
            candidate = pending.pop(0)
            normalized = urlsplit(
                urljoin("/", candidate)
            ).path
            if (
                normalized in seen
                or not normalized.startswith("/assets/")
            ):
                continue
            seen.add(normalized)
            self.assets.append(normalized)
            if not normalized.lower().endswith((".js", ".css")):
                continue
            asset_ok, asset_body = await self.request(
                session, "GET", normalized, category="preflight"
            )
            if not asset_ok or not isinstance(asset_body, str):
                continue
            dependencies = dependency_re.findall(asset_body)
            if normalized.lower().endswith(".css"):
                dependencies.extend(css_url_re.findall(asset_body))
            for dependency in dependencies:
                resolved = urlsplit(urljoin(normalized, dependency)).path
                if resolved.startswith("/assets/") and resolved not in seen:
                    pending.append(resolved)
        return health

    async def loop_monitor(self) -> None:
        interval = 0.5
        expected = time.monotonic() + interval
        while not self.stop_monitor.is_set():
            await asyncio.sleep(interval)
            now = time.monotonic()
            self.results.loop_drift_ms.append(max(0.0, (now - expected) * 1000))
            expected = now + interval

    async def cold_open(
        self, session: aiohttp.ClientSession, user_index: int
    ) -> None:
        await self.request(session, "GET", "/", category="core")
        if self.assets:
            await asyncio.gather(
                *[
                    self.request(session, "GET", asset, category="static")
                    for asset in self.assets
                ]
            )
        await self.request(
            session,
            "POST",
            "/api/data",
            category="core",
            json_body={"initData": self.init_data(user_index), "name": "Loadtest"},
        )
        # The real Mini App requests the Today tab after its initial data. This
        # call must enqueue the real provider-backed note while returning fast.
        await self.request(
            session,
            "POST",
            "/api/today",
            category="ai_enqueue",
            json_body={"initData": self.init_data(user_index)},
        )

    async def core_action(
        self, session: aiohttp.ClientSession, user_index: int
    ) -> None:
        init_data = self.init_data(user_index)
        pick = random.random()
        # Initial /api/data + /api/today are isolated in cold-open. Repeating
        # them every few seconds would model browser reload abuse.
        if pick < 0.27:
            route, payload = "/api/diary", {"initData": init_data}
        elif pick < 0.45:
            route, payload = "/api/train", {"initData": init_data}
        elif pick < 0.63:
            route, payload = "/api/train_day", {
                "initData": init_data,
                "d": date.today().isoformat(),
            }
        elif pick < 0.81:
            route, payload = "/api/log_history", {"initData": init_data}
        elif pick < 0.90:
            route, payload = "/api/checkin", {
                "initData": init_data,
                "date": date.today().isoformat(),
                "energy": random.randint(1, 3),
            }
        else:
            route, payload = "/api/track", {
                "initData": init_data,
                "screen": random.choice(("today", "food", "train")),
            }
        await self.request(
            session, "POST", route, category="core", json_body=payload
        )

    async def write_action(
        self, session: aiohttp.ClientSession, user_index: int
    ) -> None:
        init_data = self.init_data(user_index)
        pick = random.random()
        if pick < 0.50:
            route, payload = "/api/checkin", {
                "initData": init_data,
                "date": date.today().isoformat(),
                "energy": random.randint(1, 3),
                "mood": random.randint(1, 3),
            }
        elif pick < 0.75:
            route, payload = "/api/track", {
                "initData": init_data,
                "flow": random.choice(("food", "workout")),
            }
        elif pick < 0.90:
            route, payload = "/api/prefs", {
                "initData": init_data,
                "diet_note": f"loadtest-{user_index % 10}",
            }
        else:
            route, payload = "/api/food_manual", {
                "initData": init_data,
                "title": "Loadtest meal",
                "kcal": 300,
                "protein": 20,
                "fat": 10,
                "carbs": 35,
                "grams": 250,
                "slot": "lunch",
            }
        await self.request(
            session, "POST", route, category="core_write", json_body=payload
        )

    async def ai_action(
        self,
        session: aiohttp.ClientSession,
        user_index: int,
        finish_at: float,
    ) -> None:
        remaining = finish_at - time.monotonic()
        if remaining <= 0:
            return
        try:
            await asyncio.wait_for(self.ai_gate.acquire(), timeout=remaining)
        except asyncio.TimeoutError:
            return
        try:
            # A request that already reached the provider may finish after the
            # wall-clock deadline, but a waiter must never start new AI work
            # after the experiment has ended.
            if time.monotonic() >= finish_at:
                return
            await self.request(
                session,
                "POST",
                "/api/chat",
                category="ai_e2e",
                json_body={
                    "initData": self.init_data(user_index),
                    "message": random.choice(
                        (
                            "Кратко назови два безопасных способа снизить стресс сегодня.",
                            "Предложи короткую спокойную тренировку без оборудования.",
                            "Предложи простой сбалансированный перекус.",
                        )
                    ),
                    "request_id": f"lt-{self.run_id}-{uuid.uuid4().hex}",
                },
            )
        finally:
            self.ai_gate.release()

    async def iteration(
        self,
        session: aiohttp.ClientSession,
        user_index: int,
        finish_at: float,
    ) -> None:
        scenario = self.args.scenario
        if scenario in ("smoke", "cold-open", "burst"):
            await self.cold_open(session, user_index)
        elif scenario == "core":
            await self.core_action(session, user_index)
        elif scenario == "writes":
            await self.write_action(session, user_index)
        elif scenario == "integrated":
            if random.random() < self.args.ai_share:
                await self.ai_action(session, user_index, finish_at)
            else:
                await self.core_action(session, user_index)
        self.results.iterations += 1

    async def worker(
        self,
        session: aiohttp.ClientSession,
        user_index: int,
        start_at: float,
        finish_at: float,
    ) -> None:
        ramp_delay = (
            self.args.ramp_seconds * user_index / max(1, self.args.users - 1)
        )
        await asyncio.sleep(max(0, start_at + ramp_delay - time.monotonic()))
        if self.args.scenario in ("smoke", "cold-open", "burst"):
            await self.iteration(session, user_index, finish_at)
            self.results.completed_users.add(user_index)
            return
        while time.monotonic() < finish_at:
            await self.iteration(session, user_index, finish_at)
            await asyncio.sleep(random.uniform(self.args.think_min, self.args.think_max))
        self.results.completed_users.add(user_index)

    async def run(self) -> tuple[dict, float, float]:
        timeout = aiohttp.ClientTimeout(total=self.args.timeout_seconds)
        connector = aiohttp.TCPConnector(
            limit=max(100, self.args.users * 4),
            limit_per_host=max(100, self.args.users * 4),
            ttl_dns_cache=300,
        )
        headers = {
            "User-Agent": "AIWA-LoadTest/1.0",
            "X-AIWA-Loadtest-Run": self.run_id,
        }
        async with aiohttp.ClientSession(
            timeout=timeout, connector=connector, headers=headers
        ) as session:
            health = await self.preflight(session)
            if self.args.preflight_only:
                now = time.monotonic()
                return health, now, now
            monitor = asyncio.create_task(self.loop_monitor())
            started = time.monotonic()
            finish_at = started + self.args.ramp_seconds + self.args.hold_seconds
            workers = [
                asyncio.create_task(
                    self.worker(session, index, started, finish_at)
                )
                for index in range(self.args.users)
            ]
            await asyncio.gather(*workers)
            finished = time.monotonic()
            self.stop_monitor.set()
            await monitor
        return health, started, finished

    def write_report(self, health: dict, duration_seconds: float) -> Path:
        output = self.args.output_root / self.run_id
        output.mkdir(parents=True, exist_ok=False)
        rows = [
            row for row in self.results.rows if row.category != "preflight"
        ]
        by_category = {
            category: stats_for(
                [row for row in rows if row.category == category]
            )
            for category in sorted({row.category for row in rows})
        }
        by_route = {
            route: stats_for([row for row in rows if row.route == route])
            for route in sorted({row.route for row in rows})
        }
        usage = resource.getrusage(resource.RUSAGE_SELF)
        summary = {
            "run_id": self.run_id,
            "target": self.args.base_url,
            "target_version": health.get("version"),
            "scenario": self.args.scenario,
            "users": self.args.users,
            "ramp_seconds": self.args.ramp_seconds,
            "hold_seconds": self.args.hold_seconds,
            "duration_seconds": round(duration_seconds, 3),
            "iterations": self.results.iterations,
            "completed_users": len(self.results.completed_users),
            "achieved_rps": round(len(rows) / duration_seconds, 3),
            "overall": stats_for(rows),
            "by_category": by_category,
            "by_route": by_route,
            "generator": {
                "hostname": socket.gethostname(),
                "python": sys.version.split()[0],
                "loadavg": list(os.getloadavg()),
                "max_rss_kib": usage.ru_maxrss,
                "loop_drift_ms": {
                    "p95": percentile(self.results.loop_drift_ms, 0.95),
                    "p99": percentile(self.results.loop_drift_ms, 0.99),
                    "max": (
                        round(max(self.results.loop_drift_ms), 2)
                        if self.results.loop_drift_ms
                        else None
                    ),
                },
            },
            "ai_controls": {
                "share": self.args.ai_share if self.args.scenario == "integrated" else 0,
                "client_concurrency": (
                    self.args.ai_concurrency
                    if self.args.scenario == "integrated"
                    else 0
                ),
                "provider_metrics_source": "target SQLite llm_calls + LOAD/60s logs",
            },
        }
        (output / "summary.json").write_text(
            json.dumps(summary, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        with gzip.open(output / "requests.csv.gz", "wt", newline="", encoding="utf-8") as fh:
            writer = csv.DictWriter(fh, fieldnames=list(asdict(rows[0]).keys()) if rows else [
                "started_at", "category", "route", "method", "status",
                "latency_ms", "ok", "response_bytes", "error",
            ])
            writer.writeheader()
            for row in rows:
                writer.writerow(asdict(row))
        return output


async def async_main(args: argparse.Namespace) -> int:
    token = (
        sys.stdin.read().strip()
        if args.token_stdin
        else args.token_file.read_text(encoding="utf-8").strip()
    )
    if ":" not in token or len(token) < 20:
        raise SystemExit("Token file does not look like a Telegram bot token")
    run = LoadRun(args, token)
    health, started, finished = await run.run()
    if args.preflight_only:
        print(
            json.dumps(
                {
                    "preflight": "ok",
                    "target": args.base_url,
                    "version": health.get("version"),
                    "discovered_assets": len(run.assets),
                },
                ensure_ascii=False,
            )
        )
        return 0
    output = run.write_report(health, finished - started)
    rows = [row for row in run.results.rows if row.category != "preflight"]
    summary = stats_for(rows)
    print(
        json.dumps(
            {
                "output": str(output),
                "requests": summary["requests"],
                "success_rate": summary["success_rate"],
                "p95_ms": summary["latency_ms"]["p95"],
                "completed_users": len(run.results.completed_users),
            },
            ensure_ascii=False,
        )
    )
    error_rate = 1.0 - (summary["success_rate"] or 0.0)
    return 2 if error_rate > args.max_error_rate else 0


def main() -> None:
    args = parse_args()
    validate_args(args)
    try:
        raise SystemExit(asyncio.run(async_main(args)))
    except KeyboardInterrupt:
        raise SystemExit(130)


if __name__ == "__main__":
    main()
