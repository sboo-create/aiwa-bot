# AIWA module for Disrupt Analytics

The module receives privacy-safe events from the Railway worker and serves the
canonical Disrupt Analytics contract at `/p/aiwa/`:

- `GET /health`
- `GET /summary?days=N`
- `POST /events` with `X-Ingest-Token`
- `GET /` dashboard

Only the HMAC-pseudonymous `user_key`, canonical event name and an allow-list
of coarse properties are accepted. Telegram IDs, message text, symptoms,
cycle dates, photos and audio are never sent.

## Overview and tool semantics

The `overview` object intentionally keeps the six-field Disrupt Analytics
contract: `ever_used`, `dau`, `wau`, `mau`, `sessions_per_dau` and
`tools_per_dau`. DAU uses the current `Europe/Moscow` calendar date, WAU the
current Moscow ISO week, and MAU the current Moscow calendar month. Both ratios
use numerators from the same current Moscow date as their DAU denominator,
regardless of the detailed-dashboard period. `tools_per_dau` uses AIWA's
product-defined tool contract: every actual AI-provider invocation since
00:00 Moscow time divided by DAU for the same date. Successful and failed
invocations both count as usage; retries and fallback hops are separate
attempts, matching MultiTool's volume semantics. Attempt quality and terminal
request failures are reported separately.

The detailed dashboard exposes exactly five definitions: provider attempts,
logical AI requests, actual tool executions, successful tool executions and
tool-assisted outcomes. Tool lifecycle events contain only a safe tool name,
status, request id, timing and product surface; arguments, returned profile
data and medical context are never exported. Structured function executions
are a narrower diagnostic and are not added to `tools_per_dau`, because their
model hop is already counted as an AI invocation. A tool-assisted outcome
means a tool succeeded and AIWA subsequently generated the final answer; it
does not replace explicit user feedback.

Dashboard responses are cached in-process for 15 seconds and include
`Server-Timing` plus `X-Stats-Cache` diagnostics. Parsed SQLite rows are reused
until the connection's change counter advances, and the one-day dashboard is
prewarmed at service startup.

## Platform and push delivery

Platform means product surface, not device OS: `Telegram-бот` and `Mini App`.
A user may appear in both rows. Telegram does not expose a trustworthy
iOS/Android/Desktop field to the current privacy-safe analytics layer, so the
dashboard does not infer one.

Push success and failure use the same delivery identity: pseudonymous
`user × campaign_id`. Raw Telegram API failures are reported separately as
attempts. A failed campaign that later succeeds is recovered rather than left
as a terminal failure. Permanent Telegram responses (`blocked`,
`chat_not_found`, `user_deactivated`) suppress future background delivery;
an inbound private update clears suppression and restores the user's schedule.

## Product decisions recorded on 2026-07-23

- Immediate value means a successfully sent AIWA answer. Provider attempts,
  retries, check-ins, meal/workout saves and summary opens do not redefine this
  activation metric.
- Bot check-in completion is the `Готово` action. In the mini app each
  successfully saved field completes the check-in because there is no final
  submit button.
- Delayed check-in value is reported separately: the next scheduled morning
  summary must be delivered within 36 hours and opened within the following
  24 hours. One summary can satisfy only one check-in user-day, and user-days
  follow the Moscow product timezone. Manual `/today` requests do not qualify.
  This metric uses observed v2 events only; reconstructed check-ins have no
  trustworthy campaign attribution and are shown as excluded rather than failures.
  Recent check-ins that have not yet had a chance to receive a summary stay
  pending rather than being counted as failures.
- Daily summaries target a summary open. Proactive messages always report opens;
  an action conversion is shown only for signals with an explicit target.
  Fresh open/action windows remain pending for 24 hours instead of immediately
  lowering conversion.

## Historical migration

Legacy history is intentionally not blended into the exact layer. Run the
migration in dry-run mode first:

```bash
python scripts/migrate_legacy_analytics.py --db /data/aiwa.db
```

After reviewing the cutover, counts and invalid timestamps, repeat with
`--apply`. The command creates `/data/backups/aiwa-before-analytics-<batch>.db`
before writing anything. Imported events are marked `reconstructed` with a
migration batch and can be removed locally with `--rollback <batch>`. Pass
`--remote-url` on rollback to remove the same batch from this module. Exact
input/output tokens, cost, latency and model attribution are never inferred
from legacy totals.

Local run:

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
STATS_ALLOW_UNAUTHENTICATED_INGEST=1 STATS_PORT=9904 .venv/bin/python server.py
```

Production environment:

```text
STATS_PORT=9904
STATS_DB=/srv/stats/aiwa/data/events.db
STATS_INGEST_TOKEN=<write-only random token>
```

The Railway service must receive the matching values:

```text
AIWA_TRACTION_URL=https://stats.multitool.works/p/aiwa/events
AIWA_TRACTION_TOKEN=<same token>
```
