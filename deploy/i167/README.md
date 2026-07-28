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
- LiteLLM: restricted SSH tunnel on `127.0.0.1:14000`; the key can only open
  `127.0.0.1:4000` on the LiteLLM host and cannot start a shell.

The service starts with a fresh SQLite database. Never copy production user data
into this environment.

Real AI calls are enabled for the integrated workload. Core HTTP/SQLite results
and provider-dependent results must be reported separately.

Cost is read from LiteLLM's `x-litellm-response-cost` header (or JSON
`usage.cost`) and persisted as `llm_calls.reported_cost`.
