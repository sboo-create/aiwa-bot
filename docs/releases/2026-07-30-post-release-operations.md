# Post-release operations and handoff

## Scope

This release intentionally changes no journal, AI, media generation, database
schema or provider routing.

It contains:

- removal of three stale OTF requests; the shipped WOFF2 bundle remains the
  only custom font source;
- suppression of APScheduler per-job INFO startup noise while preserving
  warnings and errors;
- a separately validated immutable `release_sha` in `/health`;
- the Sber CX Day product options document;
- the i167 production migration and Telegram egress runbook;
- documentation links for operators.

PostgreSQL, Redis and Railway roles are excluded. The branch
`origin/codex/railway-roles-tracing` is unchanged.

## Verification before PR

- Python compile: passed.
- Full unittest suite: `357` passed.
- Food asset hot path: `1000` users, `0` provider calls, pending cap `96`.
- Diff whitespace validation: passed.
- CX Day HTML:
  - one self-contained file;
  - 5 sections;
  - 12 decision cards;
  - all internal anchors resolve;
  - desktop/mobile/print media rules present;
  - inline JavaScript parses successfully.

The in-app browser rejected local `file://` navigation under its URL policy, so
the HTML was not visually tested through that browser. No alternate browser was
used to bypass the restriction.

## Railway staging retirement

Railway `worker-staging` compute was stopped on 2026-07-30:

- environment: `staging` (`0088cb99-218d-4c14-895b-afd677ed127f`);
- service: `worker-staging`
  (`9633f3f3-380a-44f5-97b8-f74b9429f33e`);
- latest deployment `9e8cf587-e496-42b6-b862-30d8763e2ece`: `REMOVED`;
- active deployment, regions and replicas: none.

The 1.14 GB staging volume remains temporarily available for an off-Railway
backup and integrity check. This is intentionally recorded as
`compute-off, storage-on`, not as zero-cost retirement. The exact backup,
deletion and usage verification gates are in
`docs/operations/i167-production-migration-plan.md`.

## Release gates

- [ ] PR opened from `codex/post-release-ops`.
- [ ] CI green on exact head.
- [ ] One ordinary review green.
- [ ] Exactly one deep review completed on exact head.
- [ ] Exact head deployed to i167 staging.
- [ ] Staging `/health` exposes the exact 40-character `release_sha`.
- [ ] Staging root and Mini App serve without OTF requests.
- [ ] Staging logs contain scheduler warnings/errors but not per-job INFO flood.
- [ ] Production rollback tag and SQLite snapshot recorded.
- [ ] PR merged with exact-head protection.
- [ ] Railway deployment successful.
- [ ] Production `/health`, logs, Telegram and Mini App smoke green.
- [ ] Stats delivery and background media generation remain healthy.

## Rollback

Default rollback is code-only:

1. revert the merge through a PR;
2. leave SQLite and generated media intact;
3. deploy one Railway replica;
4. verify `/health`, one Telegram poller and analytics delivery.

Database restore is not justified by these changes because this release has no
schema or data mutation.
