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
`tools_per_dau`. Both ratios always use trailing-24-hour numerators regardless
of the period selected on the detailed dashboard. For continuity with the
existing Overview, sessions and tools use the selected history layer's rolling
DAU. The tools numerator contains observed v2 AI attempts, so this
legacy-compatible ratio is explicitly marked as potentially diluted by
reconstructed users and is shown next to an observed-only alternative.

For backward compatibility, `tools_per_dau` currently means observed v2 AI
provider attempts, including retry and fallback. If attempts exist without a
rolling DAU denominator, the optional ratio key is omitted rather than
publishing a misleading zero.
The detailed dashboard exposes the
top-level `tool_definitions` candidates with stable IDs, numerators,
denominators and `selected_for_overview`. This makes the current choice
explicit while product can compare logical AI requests, product actions,
feature breadth and completed value proxies before changing the canonical KPI.

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
