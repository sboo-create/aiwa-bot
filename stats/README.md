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
