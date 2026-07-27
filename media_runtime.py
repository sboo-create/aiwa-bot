"""Dedicated Redis Stream consumer for long-running media processing."""
from __future__ import annotations

import asyncio
import json
import logging
import os
import socket

import redis.asyncio as redis

import tracing as TR

log = logging.getLogger("aiwa.media")
STREAM = os.environ.get("AIWA_MEDIA_JOBS_STREAM", "aiwa:media_jobs")
GROUP = os.environ.get("AIWA_MEDIA_JOBS_GROUP", "aiwa-media-workers")
_publisher = None


def _client():
    return redis.from_url(os.environ["REDIS_URL"], decode_responses=True)


def _publisher_client():
    global _publisher
    if _publisher is None:
        _publisher = _client()
    return _publisher


async def close_publisher():
    global _publisher
    client, _publisher = _publisher, None
    if client is not None:
        await client.aclose()


async def _ensure_group(client):
    try:
        await client.xgroup_create(STREAM, GROUP, id="0", mkstream=True)
    except redis.ResponseError as exc:
        if "BUSYGROUP" not in str(exc):
            raise


async def enqueue_food_photo(job_id, chat_id):
    client = _publisher_client()
    envelope = TR.JobEnvelope.create(
        "food_photo", {"job_id": job_id, "chat_id": int(chat_id)}, job_id,
        job_id=job_id,
    )
    await client.xadd(
        STREAM,
        {"envelope": json.dumps(envelope.as_dict(), ensure_ascii=False)},
        maxlen=int(os.environ.get("AIWA_MEDIA_JOBS_MAXLEN", "10000")),
        approximate=True,
    )
    log.info("media job queued type=food_photo job_id=%s", job_id)


async def _consume(client, bot, worker_index):
    consumer = f"{socket.gethostname()}-{os.getpid()}-{worker_index}"
    while True:
        result = await client.xreadgroup(
            GROUP, consumer, {STREAM: ">"}, count=1, block=5000,
        )
        if not result:
            continue
        for message_id, fields in result[0][1]:
            envelope = TR.JobEnvelope.from_dict(json.loads(fields["envelope"]))
            with TR.trace_context(envelope.trace_id):
                try:
                    if envelope.job_type != "food_photo":
                        raise ValueError("unknown media job type: " + envelope.job_type)
                    await bot.process_food_photo_job(envelope.payload["job_id"])
                    await client.xack(STREAM, GROUP, message_id)
                    log.info("media job completed job_id=%s", envelope.job_id)
                except Exception:
                    log.exception("media job crashed job_id=%s", envelope.job_id)
                    await client.xack(STREAM, GROUP, message_id)


async def run_media_worker():
    import aiwa_bot as bot
    import startup

    await startup.wait_for_role("worker")
    client = _client()
    await _ensure_group(client)
    concurrency = max(1, min(16, int(os.environ.get("AIWA_MEDIA_WORKERS", "2"))))
    tasks = [
        asyncio.create_task(_consume(client, bot, worker_index))
        for worker_index in range(concurrency)
    ]
    log.info("media worker ready consumers=%d", concurrency)
    try:
        await asyncio.gather(*tasks)
    finally:
        for task in tasks:
            task.cancel()
        await client.aclose()
        await bot.database_backend.close_async_pool()
