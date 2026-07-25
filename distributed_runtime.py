"""Redis-backed scheduler and worker runtime for deployed process roles."""
from __future__ import annotations

import asyncio
import json
import logging
import os
import socket
from datetime import datetime, timezone

import redis.asyncio as redis

import tracing as TR

log = logging.getLogger("aiwa.distributed")
STREAM = os.environ.get("AIWA_JOBS_STREAM", "aiwa:jobs")
GROUP = os.environ.get("AIWA_JOBS_GROUP", "aiwa-workers")
DONE_PREFIX = "aiwa:jobs:done:"
SCHEDULED_PREFIX = "aiwa:jobs:scheduled:"


def _client():
    return redis.from_url(os.environ["REDIS_URL"], decode_responses=True)


async def _ensure_group(client):
    try:
        await client.xgroup_create(STREAM, GROUP, id="0", mkstream=True)
    except redis.ResponseError as exc:
        if "BUSYGROUP" not in str(exc):
            raise


async def enqueue(client, job_type, payload, idempotency_key, ttl=172800):
    """Atomically deduplicate a scheduled occurrence before publishing it."""
    marker = SCHEDULED_PREFIX + idempotency_key
    if not await client.set(marker, "1", ex=ttl, nx=True):
        return False
    envelope = TR.JobEnvelope.create(job_type, payload, idempotency_key)
    try:
        await client.xadd(
            STREAM,
            {"envelope": json.dumps(envelope.as_dict(), ensure_ascii=False)},
            maxlen=int(os.environ.get("AIWA_JOBS_MAXLEN", "100000")),
            approximate=True,
        )
    except Exception:
        await client.delete(marker)
        raise
    log.info("job queued type=%s job_id=%s key=%s", job_type, envelope.job_id, idempotency_key)
    return True


async def enqueue_one(job_type, payload, idempotency_key, ttl=172800):
    client = _client()
    try:
        return await enqueue(client, job_type, payload, idempotency_key, ttl)
    finally:
        await client.aclose()


def _hhmm(name, default):
    value = os.environ.get(name, default)
    hour, minute = map(int, value.split(":"))
    return f"{hour:02d}:{minute:02d}"


async def _schedule_tick(client, *, catchup=False):
    import aiwa_bot as bot

    now = datetime.now(bot.TZ)
    day = now.date().isoformat()
    minute = now.strftime("%H:%M")
    queued = 0
    for cid in await asyncio.to_thread(bot.all_users):
        user = await asyncio.to_thread(bot.row, cid) or {}
        requested = user.get("send_time") or "08:00"
        actual, _, _ = bot.scheduled_hhmm(cid, requested)
        due = actual == minute or (catchup and bot.should_catchup_broadcast(cid, requested))
        if due:
            queued += await enqueue(
                client, "daily_summary", {"chat_id": cid},
                f"daily_summary:{day}:{cid}",
            )

    proactive = bot._proactive_enabled()
    if not proactive and minute == _hhmm("AIWA_FOOD_PUSH_TIME", "14:00"):
        for cid in await asyncio.to_thread(bot.all_users):
            queued += await enqueue(client, "food_reminder", {"chat_id": cid}, f"food:{day}:{cid}")
    if not proactive and minute == _hhmm("AIWA_TRAIN_PUSH_TIME", "19:00"):
        for cid in await asyncio.to_thread(bot.all_users):
            queued += await enqueue(client, "train_reminder", {"chat_id": cid}, f"train:{day}:{cid}")
    globals_due = []
    if proactive:
        globals_due = [
            ("proactive_mid", "14:00"),
            ("proactive_eve", "19:30"),
        ]
    else:
        globals_due = [
            ("phase_transition", _hhmm("AIWA_PHASE_PUSH_TIME", "11:30")),
            ("reactivation", _hhmm("AIWA_REACT_TIME", "18:30")),
        ]
    for job_type, due_at in globals_due:
        if minute == due_at:
            queued += await enqueue(client, job_type, {}, f"{job_type}:{day}")
    log.info("scheduler tick minute=%s queued=%d users=%d", minute, queued, len(bot.all_users()))


async def run_scheduler():
    await __import__("startup").wait_for_role("scheduler")
    client = _client()
    try:
        # Only one scheduler publishes a given minute; per-job keys are a second guard.
        first = True
        while True:
            now = datetime.now()
            lock_key = "aiwa:scheduler:tick:" + now.strftime("%Y%m%d%H%M")
            if await client.set(lock_key, socket.gethostname(), ex=120, nx=True):
                await _schedule_tick(client, catchup=first)
            first = False
            await asyncio.sleep(max(1, 60 - datetime.now().second))
    finally:
        await client.aclose()


async def _dispatch(bot, app, envelope):
    ctx = bot._BCtx(app)
    kind = envelope.job_type
    cid = envelope.payload.get("chat_id")
    if kind == "daily_summary":
        await bot.push_summary(ctx, cid, campaign=bot.campaign_id("daily_summary"))
        await bot.push_partner(ctx, cid)
        await bot.push_checkin(ctx, cid, campaign=bot.campaign_id("daily_checkin"))
    elif kind == "food_reminder":
        await bot.push_food_reminder(ctx, cid)
    elif kind == "train_reminder":
        await bot.push_train_reminder(ctx, cid)
    elif kind == "phase_transition":
        await bot.phase_transition_job(ctx)
    elif kind == "reactivation":
        await bot.reactivation_job(ctx)
    elif kind == "proactive_mid":
        await bot.proactive_job(ctx, "mid")
    elif kind == "proactive_eve":
        await bot.proactive_job(ctx, "eve")
    else:
        raise ValueError("unknown job type: " + kind)


async def _handle_message(client, bot, app, message_id, fields):
    envelope = TR.JobEnvelope.from_dict(json.loads(fields["envelope"]))
    done_key = DONE_PREFIX + envelope.idempotency_key
    with TR.trace_context(envelope.trace_id):
        if await client.exists(done_key):
            await client.xack(STREAM, GROUP, message_id)
            return
        log.info("job started type=%s job_id=%s attempt=%d", envelope.job_type, envelope.job_id, envelope.attempt)
        await _dispatch(bot, app, envelope)
        # Mark completion before ACK: a crash between these operations remains idempotent.
        await client.set(done_key, envelope.job_id, ex=int(os.environ.get("AIWA_JOB_DONE_TTL", "604800")))
        await client.xack(STREAM, GROUP, message_id)
        log.info("job completed type=%s job_id=%s", envelope.job_type, envelope.job_id)


async def _handle_failure(client, message_id, fields, exc):
    failures_key = f"aiwa:jobs:failures:{message_id}"
    failures = await client.incr(failures_key)
    await client.expire(failures_key, 604800)
    maximum = max(1, int(os.environ.get("AIWA_JOB_MAX_ATTEMPTS", "5")))
    if failures < maximum:
        return
    await client.xadd(
        STREAM + ":dead",
        {
            **fields,
            "failed_message_id": message_id,
            "error": f"{type(exc).__name__}: {str(exc)[:500]}",
            "failed_at": datetime.now(timezone.utc).isoformat(),
        },
        maxlen=10000,
        approximate=True,
    )
    await client.xack(STREAM, GROUP, message_id)
    log.error("job moved to dead letter message_id=%s attempts=%d", message_id, failures)


async def _consumer(client, bot, app, consumer):
    claim_idle = int(os.environ.get("AIWA_JOB_CLAIM_IDLE_MS", "60000"))
    while True:
        messages = []
        try:
            claimed = await client.xautoclaim(STREAM, GROUP, consumer, claim_idle, "0-0", count=10)
            if len(claimed) >= 2:
                messages.extend(claimed[1])
        except redis.ResponseError:
            pass
        if not messages:
            result = await client.xreadgroup(GROUP, consumer, {STREAM: ">"}, count=10, block=5000)
            if result:
                messages.extend(result[0][1])
        for message_id, fields in messages:
            try:
                await _handle_message(client, bot, app, message_id, fields)
            except Exception as exc:
                # Leave pending. XAUTOCLAIM retries it after the visibility timeout.
                log.exception("job failed message_id=%s", message_id)
                await _handle_failure(client, message_id, fields, exc)


async def run_worker():
    import aiwa_bot as bot
    import startup

    await startup.wait_for_role("worker")
    client = _client()
    await _ensure_group(client)
    stop = asyncio.Event()
    app = bot.build_telegram_application()
    await app.initialize()
    heartbeat = asyncio.create_task(startup.worker_heartbeat(stop))
    workers = max(1, min(32, int(os.environ.get("AIWA_JOBS_WORKERS", "6"))))
    tasks = [
        asyncio.create_task(_consumer(client, bot, app, f"{socket.gethostname()}-{os.getpid()}-{index}"))
        for index in range(workers)
    ]
    tasks.append(asyncio.create_task(bot.traction_worker()))
    tasks.append(asyncio.create_task(bot.load_logger(app)))
    tasks.append(asyncio.create_task(bot.model_probe(app)))
    log.info("worker ready consumers=%d", workers)
    try:
        await asyncio.gather(*tasks)
    finally:
        stop.set()
        for task in tasks:
            task.cancel()
        await heartbeat
        await app.shutdown()
        await client.aclose()
