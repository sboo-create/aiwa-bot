#!/usr/bin/env python3
"""Verify that an authenticated but unonboarded user cannot reach app features."""

from __future__ import annotations

import argparse
import asyncio
import hashlib
import hmac
import json
import sys
import time
from urllib.parse import urlencode, urljoin, urlsplit

import aiohttp


EXPECTED_HOST = "aiwa-staging-167.158-160-163-167.sslip.io"


def signed_init_data(token: str, user_id: int) -> str:
    pairs = {
        "auth_date": str(int(time.time())),
        "query_id": f"onboarding-gate-{user_id}",
        "user": json.dumps(
            {"id": user_id, "first_name": "OnboardingGate"},
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
    parser.add_argument("--user-id", type=int, required=True)
    parser.add_argument("--token-stdin", action="store_true", required=True)
    args = parser.parse_args()
    parsed = urlsplit(args.base_url)
    if parsed.scheme != "https" or parsed.hostname != EXPECTED_HOST:
        raise SystemExit("Refusing non-HTTPS or unknown target")
    if parsed.hostname != args.confirm_staging_host:
        raise SystemExit("Target host does not match --confirm-staging-host")
    return args


async def main(args: argparse.Namespace) -> int:
    token = sys.stdin.read().strip()
    if ":" not in token or len(token) < 20:
        raise SystemExit("stdin does not look like a Telegram bot token")
    init_data = signed_init_data(token, args.user_id)
    timeout = aiohttp.ClientTimeout(total=30)
    checks = []
    async with aiohttp.ClientSession(timeout=timeout) as session:
        async with session.get(urljoin(args.base_url, "/health")) as response:
            body = await response.json()
            checks.append(
                {
                    "route": "/health",
                    "status": response.status,
                    "passed": (
                        response.status == 200
                        and body.get("version") == args.expected_version
                    ),
                }
            )

        cases = (
            (
                "/api/data",
                {"initData": init_data, "name": "OnboardingGate"},
                lambda status, body: status == 200
                and body.get("onboarded") is False,
            ),
            (
                "/api/today",
                {"initData": init_data},
                lambda status, body: status == 403
                and body.get("error") == "onboard",
            ),
            (
                "/api/profile",
                {
                    "initData": init_data,
                    "height": 168,
                    "weight": 60,
                    "age": 30,
                },
                lambda status, body: status == 403
                and body.get("error") == "onboard",
            ),
            (
                "/api/chat",
                {"initData": init_data, "message": "test"},
                lambda status, body: status == 403
                and "Сначала настрой" in body.get("answer", ""),
            ),
        )
        for route, payload, expected in cases:
            async with session.post(
                urljoin(args.base_url, route), json=payload
            ) as response:
                body = await response.json()
                checks.append(
                    {
                        "route": route,
                        "status": response.status,
                        "passed": expected(response.status, body),
                    }
                )

    passed = all(check["passed"] for check in checks)
    print(
        json.dumps(
            {
                "scenario": "unonboarded-network-gate",
                "target_version": args.expected_version,
                "user_id": args.user_id,
                "passed": passed,
                "checks": checks,
            },
            ensure_ascii=False,
        )
    )
    return 0 if passed else 2


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main(parse_args())))
