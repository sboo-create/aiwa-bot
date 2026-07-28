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

Preflight without load:

```bash
python3 aiwa_load.py \
  --scenario smoke \
  --users 1 \
  --hold-seconds 1 \
  --preflight-only \
  --confirm-staging-host aiwa-staging-167.158-160-163-167.sslip.io
```

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

## LiteLLM / OpenRouter capacity

`llm_capacity.py` probes the exact staging provider route without exercising
the Mini App or SQLite. Run one concurrency stage at a time and monitor the
shared LiteLLM host between stages:

```bash
python3 llm_capacity.py \
  --profile today-note \
  --concurrency 8 \
  --requests 40 \
  --output-dir results/ai-capacity
```

The provider URL, virtual key and model are read from the existing staging
environment. The probe refuses non-loopback endpoints, an unexpected tunnel
port, and models that are not routed through OpenRouter. Raw results never
contain prompts, responses, or credentials.
