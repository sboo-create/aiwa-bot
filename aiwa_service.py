"""Process-role entry point used by Railway services.

The public API and Telegram long poller are separate singleton/scalable roles.
Worker and scheduler entry points are deliberately explicit so every Railway
service can share the same image without duplicating the bot poller.
"""
from __future__ import annotations

import argparse
import asyncio
import logging
import os
import signal

import tracing as TR
import startup


TR.install_log_record_factory()
log = logging.getLogger("aiwa.service")


async def _await_shutdown(role: str, *, heartbeat: bool = False) -> None:
    """Keep an infrastructure role alive while its adapters are rolled out."""
    stop = asyncio.Event()
    loop = asyncio.get_running_loop()
    for sig in (signal.SIGINT, signal.SIGTERM):
        try:
            loop.add_signal_handler(sig, stop.set)
        except NotImplementedError:
            pass
    await startup.wait_for_role(role)
    heartbeat_task = (
        asyncio.create_task(startup.worker_heartbeat(stop)) if heartbeat else None
    )
    log.info("%s role ready", role)
    try:
        await stop.wait()
    finally:
        if heartbeat_task is not None:
            stop.set()
            await heartbeat_task


def run_api() -> None:
    import aiwa_bot

    asyncio.run(aiwa_bot.run_api())


def run_telegram() -> None:
    import aiwa_bot

    asyncio.run(aiwa_bot.run_telegram())


def run_worker() -> None:
    if os.environ.get("AIWA_ENABLE_DISTRIBUTED_ROLES") != "1":
        raise SystemExit(
            "worker role is staged but disabled; set AIWA_ENABLE_DISTRIBUTED_ROLES=1 "
            "only when PostgreSQL and Redis are configured"
        )
    from distributed_runtime import run_worker as worker_main
    asyncio.run(worker_main())


def run_scheduler() -> None:
    if os.environ.get("AIWA_ENABLE_DISTRIBUTED_ROLES") != "1":
        raise SystemExit(
            "scheduler role is staged but disabled; set AIWA_ENABLE_DISTRIBUTED_ROLES=1 "
            "only after persistent schedules are configured"
        )
    from distributed_runtime import run_scheduler as scheduler_main
    asyncio.run(scheduler_main())


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("role", choices=("api", "telegram", "worker", "scheduler"))
    args = parser.parse_args()
    {
        "api": run_api,
        "telegram": run_telegram,
        "worker": run_worker,
        "scheduler": run_scheduler,
    }[args.role]()


if __name__ == "__main__":
    main()
