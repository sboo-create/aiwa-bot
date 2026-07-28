# AIWA load generator

Target: isolated SQLite staging on i167. Generator: `8gpu-008`.

Safety properties:

- refuses non-HTTPS and unknown hosts;
- requires an explicit staging hostname confirmation;
- refuses to run until `/health` has the expected version;
- refuses to run until synthetic users are onboarded;
- AI concurrency is independently bounded;
- raw request metrics contain no Telegram token, initData, prompts or responses.

The Telegram token is stored only in `.secrets/bot-token` with mode `0600`.
For an external generator, prefer `--token-stdin` and stream the token from the
staging secret store; the token must not be copied to the generator filesystem.

Preflight without load:

```bash
python3 aiwa_load.py \
  --scenario smoke \
  --users 1 \
  --hold-seconds 1 \
  --preflight-only \
  --confirm-staging-host aiwa-staging-167.158-160-163-167.sslip.io
```

The photo burst accepts valid image fixtures up to the application's 12 MiB
boundary. Test small, medium and near-limit files separately before combining
them into a burst; responses above the boundary belong in a rejection test, not
in the success-rate denominator.

`onboarding_gate.py` uses a fresh synthetic user id to verify over the public
staging route that authenticated users who have not completed Telegram
onboarding see `onboarded=false` and cannot call protected app/AI endpoints.
The full happy-path onboarding state machine is covered by the unit suite;
transport-level Telegram onboarding additionally requires an authorized test
user session, not another bot.

Example smoke run:

```bash
python3 aiwa_load.py \
  --scenario smoke \
  --users 10 \
  --ramp-seconds 10 \
  --hold-seconds 30 \
  --confirm-staging-host aiwa-staging-167.158-160-163-167.sslip.io
```

Integrated real-AI calibration:

```bash
python3 aiwa_load.py \
  --scenario integrated \
  --users 10 \
  --ramp-seconds 30 \
  --hold-seconds 180 \
  --ai-share 0.08 \
  --ai-concurrency 2 \
  --confirm-staging-host aiwa-staging-167.158-160-163-167.sslip.io
```

Do not run 50/100/300 until the previous stage is reviewed against the stop/go
criteria. Provider metrics are collected from `llm_calls` and `LOAD/60s` on the
target and reported separately from core HTTP/SQLite metrics.

Scenario boundaries:

- `cold-open` performs one browser/app open per virtual user and then calls
  `/api/today`, which enqueues the real provider-backed `today_note`;
- `core` exercises in-app reads and tracking without repeatedly reopening the
  app, so it does not create hidden LLM work;
- `writes` isolates SQLite writes;
- `integrated` mixes `core` with explicitly concurrency-bounded `/api/chat`.

Every experiment must have target snapshots immediately before and after it:

```bash
python3 target_snapshot.py --db /srv/aiwa-staging/data/aiwa.db > before.json
# run exactly one experiment
python3 target_snapshot.py --db /srv/aiwa-staging/data/aiwa.db > after.json
python3 snapshot_delta.py before.json after.json --output delta.json
```

`delta.json` contains calls, tokens and `reported_cost_usd`. If any provider
call lacks a cost value, `cost_complete` is false; missing cost is never treated
as a confirmed zero.

## Native OpenRouter capacity

`llm_capacity.py` probes the exact native OpenRouter client route without
exercising the Mini App or SQLite. It accepts the staging tunnel port as long as
the HTTPS hostname remains `openrouter.ai`. Run it on i167 so the existing key
never has to be copied to the generator host. Run one concurrency stage at a
time:

```bash
python3 llm_capacity.py \
  --profile today-note \
  --concurrency 8 \
  --requests 40 \
  --output-dir /srv/aiwa-staging/data/loadtests/ai-capacity
```

The provider URL, key and native model id are read from the existing staging
environment. The probe refuses anything except
`https://openrouter.ai[:port]/api/v1`. The output must be under the service
writable data directory when the probe runs in AIWA's hardened mount namespace.
It applies the same ZDR/data-collection rules and provider exclusions as
staging. Raw results never contain prompts, responses, or credentials.

For provider-routing A/B tests without changing the model:

```bash
python3 llm_capacity.py \
  --profile today-note \
  --concurrency 8 \
  --requests 100 \
  --provider-ignore= \
  --provider-only deepinfra,coreweave,akashml,digitalocean,ionstream,morph \
  --provider-sort throughput \
  --output-dir /srv/aiwa-staging/data/loadtests/provider-routing
```

The summary records `ignore`, `only` and `sort`, so results from different
routing profiles cannot be mistaken for the default OpenRouter route.
