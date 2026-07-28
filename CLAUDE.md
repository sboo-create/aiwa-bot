# AIWA pull-request review policy

Review the current pull request as a read-only reviewer. Inspect the diff and enough
surrounding code to verify each finding, but report only problems introduced or made
materially worse by this pull request.

## Priorities

Pay particular attention to:

- correctness, error handling, retries, and idempotency;
- async/thread interactions, SQLite concurrency, transactions, and data migrations;
- Telegram update and application lifecycle behavior;
- privacy of health data, logging, retention, export, and deletion;
- Mini App authentication, Telegram `initData` validation, CORS, and authorization;
- medical safety: no diagnosis or unsafe prescription, and reliable red-flag escalation;
- LLM routing, TLS, zero-data-retention settings, fallback behavior, and cost bounds;
- missing regression tests for behavior changed by the pull request.

Treat deployment configuration as production-sensitive. A merge to `main` can deploy
immediately, so call out changes that require a staging check, migration rehearsal,
rollback plan, or secret/configuration update before merge.

## Findings

Use only these severities:

- **P0** — immediate security, privacy, safety, or data-loss incident.
- **P1** — likely production breakage, serious regression, or unsafe behavior.
- **P2** — real defect with limited impact or a meaningful missing guard/test.

Every finding must include the exact file and changed line, a concrete failure scenario,
the evidence or reasoning that makes it reproducible, and the smallest practical fix.
Do not report style preferences, speculative concerns, pre-existing defects, or generated
artifact changes when their source was not changed. If confidence is low, investigate
further or omit the finding.

Do not edit files, create commits, or approve/merge the pull request. CI owns executable
checks; the reviewer owns code-risk analysis and GitHub comments.
