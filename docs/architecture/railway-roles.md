# Railway process roles

AIWA uses one source tree and one immutable image with four independently
deployable process roles:

| Role | Command | Responsibility |
|---|---|---|
| API | `python -m aiwa_service api` | Scalable HTTP and Mini App API; never starts polling |
| Telegram | `python -m aiwa_service telegram` | Exactly one long-polling process until migration to webhooks |
| Worker | `python -m aiwa_service worker` | Queue consumers for media, AI, reports, and notifications |
| Scheduler | `python -m aiwa_service scheduler` | Claim due schedules and publish jobs; never execute slow work |

The worker and scheduler deployment descriptors are staged behind
`AIWA_ENABLE_DISTRIBUTED_ROLES=1`. Do not enable them until the durable queue
and PostgreSQL schedule store are connected. This fail-closed gate prevents an
apparently healthy but idle service from being deployed by mistake.

During the migration, the Telegram role still owns the legacy in-process
scheduled jobs from `on_startup`. Those jobs move to the scheduler/worker roles
before `AIWA_ENABLE_DISTRIBUTED_ROLES` is enabled. API replicas can already be
scaled independently because they never call `getUpdates`.

## Startup gates

With `AIWA_ENABLE_DISTRIBUTED_ROLES=1`, every role waits for PostgreSQL and
Redis. API, Telegram, and Scheduler additionally wait for a live Worker
heartbeat. PostgreSQL readiness uses `SELECT 1`; when
`AIWA_REQUIRED_SCHEMA_VERSION` is set, it also requires that Alembic revision.
Redis readiness uses `PING`. A timeout exits non-zero so Railway can restart
the role cleanly.

## Trace contract

Every ingress receives a `trace_id`:

- HTTP accepts a valid `X-Trace-ID` or generates a new value and returns it in
  the response header.
- Telegram generates a trace before command/message handlers run.
- analytics `request_id` and LLM call context reuse that trace.
- every queued message uses `tracing.JobEnvelope` and carries `trace_id`.
- a worker enters `trace_context(envelope.trace_id)` before doing any work or
  publishing child jobs.

Logs include `trace=<id>`, so one search returns the ingress, all child jobs,
provider calls, retries, and notification delivery.

## Queue decision

For the three-day migration, use Redis Streams with consumer groups rather
than introducing RabbitMQ or Kafka:

- Railway can provision Redis directly and expose a private `REDIS_URL`;
- Streams provide durable messages, consumer groups, acknowledgements, and
  recovery of abandoned pending messages;
- one Redis deployment can also hold rate-limit and short-lived job-status
  data;
- Python asyncio support is mature and operational setup is small.

The trade-off is that retry scheduling, dead-letter handling, and
idempotency must be explicit application code. PostgreSQL remains the source
of truth for job state, delivery deduplication, schedules, and the
transactional outbox. Redis is transport, not the authoritative database.

RabbitMQ becomes preferable if routing rules, delayed delivery, or broker-side
dead-letter policies outgrow this implementation. Kafka is intentionally out
of scope: the workload is a task queue, not a high-volume event log.
