"""Startup dependency gates shared by all Railway process roles."""
from __future__ import annotations

import asyncio
import logging
import os
import socket
from collections.abc import Awaitable, Callable, Iterable
from contextlib import suppress


log = logging.getLogger("aiwa.startup")
Check = Callable[[], Awaitable[None]]
WORKER_READY_KEY = os.environ.get("AIWA_WORKER_READY_KEY", "aiwa:ready:worker")


def _distributed_enabled() -> bool:
    return os.environ.get("AIWA_ENABLE_DISTRIBUTED_ROLES") == "1"


def _required_url(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value and _distributed_enabled():
        raise RuntimeError(f"{name} is required for distributed roles")
    return value


async def check_postgres() -> None:
    url = _required_url("DATABASE_URL")
    if not url:
        return
    import asyncpg

    connection = await asyncpg.connect(
        url, timeout=float(os.environ.get("AIWA_DEPENDENCY_CONNECT_TIMEOUT", "5"))
    )
    try:
        await connection.execute("SELECT 1")
        required = os.environ.get("AIWA_REQUIRED_SCHEMA_VERSION", "").strip()
        if required:
            versions = await connection.fetch("SELECT version_num FROM alembic_version")
            actual = {str(row["version_num"]) for row in versions}
            if required not in actual:
                raise RuntimeError(
                    f"database schema is not ready: required={required}, actual={sorted(actual)}"
                )
    finally:
        await connection.close()


async def _redis_client():
    url = _required_url("REDIS_URL")
    if not url:
        return None
    import redis.asyncio as redis

    return redis.from_url(
        url,
        socket_connect_timeout=float(
            os.environ.get("AIWA_DEPENDENCY_CONNECT_TIMEOUT", "5")
        ),
        socket_timeout=float(os.environ.get("AIWA_DEPENDENCY_CONNECT_TIMEOUT", "5")),
        decode_responses=True,
    )


async def check_redis() -> None:
    client = await _redis_client()
    if client is None:
        return
    try:
        if not await client.ping():
            raise RuntimeError("Redis PING returned false")
    finally:
        await client.aclose()


async def check_worker() -> None:
    client = await _redis_client()
    if client is None:
        return
    try:
        if not await client.get(WORKER_READY_KEY):
            raise RuntimeError("no worker heartbeat")
    finally:
        await client.aclose()


CHECKS: dict[str, Check] = {
    "postgres": check_postgres,
    "redis": check_redis,
    "worker": check_worker,
}


async def wait_for_dependencies(
    dependencies: Iterable[str],
    *,
    timeout: float | None = None,
    checks: dict[str, Check] | None = None,
) -> None:
    names = tuple(dependencies)
    registry = checks or CHECKS
    unknown = set(names) - set(registry)
    if unknown:
        raise ValueError("unknown dependencies: " + ", ".join(sorted(unknown)))
    deadline = asyncio.get_running_loop().time() + (
        timeout
        if timeout is not None
        else float(os.environ.get("AIWA_STARTUP_TIMEOUT_SECONDS", "180"))
    )
    delay = 0.5
    attempt = 0
    while True:
        attempt += 1
        try:
            for name in names:
                await registry[name]()
            log.info("dependencies ready names=%s attempts=%d", ",".join(names), attempt)
            return
        except Exception as exc:
            remaining = deadline - asyncio.get_running_loop().time()
            if remaining <= 0:
                raise RuntimeError(
                    f"dependencies did not become ready: {','.join(names)}"
                ) from exc
            log.warning(
                "dependencies pending names=%s attempt=%d error=%s",
                ",".join(names),
                attempt,
                type(exc).__name__,
            )
            await asyncio.sleep(min(delay, remaining))
            delay = min(delay * 2, 10)


async def wait_for_role(role: str) -> None:
    dependencies = ["postgres", "redis"]
    if role in {"api", "telegram", "scheduler"} and _distributed_enabled():
        dependencies.append("worker")
    await wait_for_dependencies(dependencies)


async def worker_heartbeat(stop: asyncio.Event) -> None:
    client = await _redis_client()
    if client is None:
        await stop.wait()
        return
    ttl = max(10, int(os.environ.get("AIWA_WORKER_HEARTBEAT_TTL_SECONDS", "30")))
    identity = f"{socket.gethostname()}:{os.getpid()}"
    try:
        while not stop.is_set():
            await client.set(WORKER_READY_KEY, identity, ex=ttl)
            try:
                await asyncio.wait_for(stop.wait(), timeout=max(1, ttl // 3))
            except asyncio.TimeoutError:
                pass
    finally:
        with suppress(Exception):
            current = await client.get(WORKER_READY_KEY)
            if current == identity:
                await client.delete(WORKER_READY_KEY)
        await client.aclose()
