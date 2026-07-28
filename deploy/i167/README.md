# AIWA staging on i167

This deployment is intentionally isolated from the existing `/srv/stats/aiwa`
service:

- release: `/srv/aiwa-staging/releases/<git-sha>`;
- current symlink: `/srv/aiwa-staging/current`;
- SQLite: `/srv/aiwa-staging/data/aiwa.db`;
- configuration: `/srv/aiwa-staging/config/app.env`;
- bot token: systemd credential in `/srv/aiwa-staging/secrets/bot-token`;
- provider credentials: `/srv/aiwa-staging/secrets/providers.env`, copied
  directly from Railway without printing values;
- HTTP bind: `127.0.0.1:9910`;
- public HTTPS: Caddy;
- Telegram: the existing host tunnel on `127.0.0.1:8443`, visible only through
  the service-specific hosts file.
- LLM route: native OpenRouter HTTPS client over a restricted SSH egress
  tunnel (`127.0.0.1:14443 -> openrouter.ai:443`) through i196. The shared
  LiteLLM process is not part of the staging request path and cannot see the
  OpenRouter key or request payload.

The OpenRouter tunnel is an independent systemd service with SSH keepalives,
automatic restart and strict CPU/memory/task limits. AIWA only `Wants` the
tunnel: if egress is temporarily unavailable, ordinary screens and `/health`
remain available while durable AI jobs retry.

`providers.env` must contain credentials only. In particular it must not
override `OPENROUTER_BASE_URL` or model ids from `config/app.env`.

The service starts with a fresh SQLite database. Never copy production user data
into this environment.

Real AI calls are enabled for the integrated workload. Core HTTP/SQLite results
and provider-dependent results must be reported separately.

Cost is read from OpenRouter JSON `usage.cost` and persisted as
`llm_calls.reported_cost`. Empty HTTP 200 responses also retain usage, cost and
the OpenRouter generation id for reconciliation.
