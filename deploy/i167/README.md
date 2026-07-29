# AIWA staging on i167

This deployment is intentionally isolated from the existing `/srv/stats/aiwa`
service:

- release: `/srv/aiwa-staging/releases/<git-sha>`;
- current symlink: `/srv/aiwa-staging/current`;
- static assets: `/srv/aiwa-staging/public-releases/<git-sha>` with atomic
  `/srv/aiwa-staging/public-current`; activate only after the full release is
  extracted:
  `sudo /srv/aiwa-staging/releases/<git-sha>/deploy/i167/activate-public-assets.sh <git-sha>`;
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
- SaluteSpeech verifies TLS with
  `/srv/aiwa-staging/config/ca-bundle-russian-trust.pem`. The bundle contains
  the system trust store plus the Russian Trusted Root CA and the current
  `subca_ssl_rsa2024` intermediate published by the certificate authority.
  Do not replace this with `GIGACHAT_SSL_VERIFY=0`.

The OpenRouter tunnel is an independent systemd service with SSH keepalives,
automatic restart and strict CPU/memory/task limits. AIWA only `Wants` the
tunnel: if egress is temporarily unavailable, ordinary screens and `/health`
remain available while durable AI jobs retry.

The service-specific hosts file changes only routing: both clients still open
TLS for the public names `api.telegram.org` and `openrouter.ai`, validate the
public certificate chain and send secrets only after that validation succeeds.
The local TCP listeners do not terminate TLS and possess no provider private
keys, so replacing either listener cannot silently decrypt a bot token,
OpenRouter key or request body. Keep the listeners bound to loopback, the hosts
file read-only inside the service, and certificate verification enabled.

`providers.env` must contain credentials only. In particular it must not
override `OPENROUTER_BASE_URL` or model ids from `config/app.env`.

The service starts with a fresh SQLite database. Never copy production user data
into this environment.

Real AI calls are enabled for the integrated workload. Core HTTP/SQLite results
and provider-dependent results must be reported separately.

Cost is read from OpenRouter JSON `usage.cost` and persisted as
`llm_calls.reported_cost`. Empty HTTP 200 responses also retain usage, cost and
the OpenRouter generation id for reconciliation.

The staging text route uses `google/gemini-3.1-flash-lite` with
`OPENROUTER_PROVIDER_SORT=latency`. A controlled three-request comparison on
2026-07-28 measured 2.12 s p50 and 2.24 s p95 versus 9.35 s p50 and 32.43 s p95
for `deepseek/deepseek-v4-flash`. Keep production unchanged until the staging
quality and load suite passes.
