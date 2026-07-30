# Production rollout 2026-07-29

## Scope

- PR: `#51` — load-safety integration before the PostgreSQL/Redis migration
- candidate SHA: `68e645dd17245407e6b16569fc9a9aac5f582f94`
- staging: i167, candidate confirmed deployed before production
- PostgreSQL/Redis branch is not included in this release

## Pre-release production point

- source SHA: `a6299922726140da9e4efea252fa05f64cb55938`
- rollback tag: `prod-rollback-2026-07-29-a629992`
- Railway project: `fc38314f-d9a4-4975-b5ec-e7ecd74a9271`
- environment: `5f7b7620-c859-474f-a8e5-23944f5154f3`
- service: `fea631f4-b270-4850-a89f-8826ce59afd9`
- deployment: `36b36b87-a83e-42e1-b0bb-4f80b1aa7ea0`
- deployment instance: `0d758760-7ab6-40e3-9122-ea381178091a`
- image digest:
  `sha256:2138221ab771c11090683f625cc015c1beb89bb1d334f3f7136a39048b068616`
- database snapshot on Volume:
  `/data/backups/pre-release-a629992-20260729T0200MSK.db`
- database snapshot size: `39575552` bytes
- database snapshot SHA-256:
  `bda831b0f9ebd9bca702ee960daf9998bae40d259e4946d4281c0dfe930c07bc`
- snapshot `pragma integrity_check`: `ok`
- local backup destination:
  `$HOME/Downloads/aiwa-prod-backups/pre-release-a629992-20260729T0200MSK.db`
- retain both copies through at least `2026-07-30 Europe/Moscow`

Aggregate read-only baseline immediately before release:

| Table | Rows |
|---|---:|
| users | 191 |
| events | 32913 |
| events_v2 | 32843 |
| meals | 145 |
| workouts | 60 |
| llm_calls | 7115 |
| traction_outbox | 0 |
| traction_sent | 42905 |
| push_deliveries | 1074 |

No Telegram identifiers, messages, secrets or health data are recorded here.

## Release gates

- [x] candidate deployed on staging
- [x] staging load test completed once for the architecture change
- [x] GitHub CI tests green on candidate
- [x] ordinary Claude review green on candidate
- [x] PR is mergeable and clean against current `main`
- [x] production SQLite snapshot created and integrity-checked
- [x] local snapshot hash matches the Volume snapshot
- [x] rollback tag pushed
- [ ] deployment documentation CI/review green
- [ ] PR merged with exact head protection
- [ ] Railway deployed the resulting `main` SHA
- [ ] `/health` reports ready with a live event writer and no failures/drops
- [ ] Telegram/Mini App smoke-test passed
- [ ] cron/proactive logs show one scheduler/poller
- [ ] post-release aggregates and traction delivery verified

## Rollback decision

Default rollback is a revert PR to the tag above. Database restore is not part
of a normal code rollback; it is allowed only if data corruption is confirmed.
The production Telegram token must never be used by a temporary parallel
stand.

Detailed commands are in `DEPLOY.md`.

## Completion update: 2026-07-30

The load-safety release and its post-release fixes were completed. Production
subsequently advanced through the reviewed media release:

- media PR: `#66`;
- merge commit: `5a9ece0476f260763b19c8f2c252baa0ef1293c2`;
- Railway deployment:
  `6b6775f9-3b56-455d-946f-de3abc9c160b`;
- rollback tag: `prod-rollback-2026-07-30-media-13fe278`;
- pre-media SQLite snapshot:
  `/data/backups/pre-media-13fe278-20260730T0055MSK.db`;
- snapshot integrity: `ok`;
- snapshot SHA-256:
  `82269c29e25e7eb6676b01e3175d15638801727c8f9d96bf0787d26c86e14829`;
- production `/health`: ready, event writer alive, zero writer failures and
  zero dropped events;
- reviewed catalog: 612 food entries and 235 sport entries in total;
- background food generation: enabled, one worker, bounded daily cap;
- production traction outbox: empty;
- AIWA statistics module: healthy with current successful ingest/poll.

The remaining operational follow-up is documented in
`2026-07-30-post-release-operations.md`. The future i167 production migration
is a separate plan and does not include PostgreSQL/Redis.
