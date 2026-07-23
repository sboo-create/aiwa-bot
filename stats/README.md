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
of the period selected on the detailed dashboard. Sessions use the selected
history layer's rolling DAU; the exact AI-attempt ratio uses observed v2
rolling DAU so reconstructed users cannot dilute a numerator whose old calls
are incomplete.

For backward compatibility, `tools_per_dau` currently means observed v2 AI
provider attempts, including retry and fallback. If attempts exist without a
rolling DAU denominator, the ratio is `null` rather than a misleading zero.
The detailed dashboard exposes the
top-level `tool_definitions` candidates with stable IDs, numerators,
denominators and `selected_for_overview`. This makes the current choice
explicit while product can compare logical AI requests, product actions,
feature breadth and completed value proxies before changing the canonical KPI.

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
