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
