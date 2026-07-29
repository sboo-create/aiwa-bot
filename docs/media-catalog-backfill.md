# Offline media catalog: 500 food + 200 sport

## Why this is outside the production limit

The runtime food generator remains a one-worker, durable long-tail queue with
`AIWA_FOOD_ASSET_DAILY_MAX`. The catalog backfill is a separate local process:

- it does not import `aiwa_bot`;
- it does not connect to production SQLite;
- it does not use Telegram or interactive LLM worker slots;
- it receives only a parsed short label and aggregate frequency;
- it writes immutable 512×512 WebP files to an operator-owned directory.

`railway run` is used only to inject the already configured provider variables
into the local process. It does not execute the batch inside the production
container.

## Source sets

`scripts/catalog_seed_labels.py` produces:

- 500 food labels: production aggregate missing labels first, then a curated
  taxonomy; labels already present in the static manifest are excluded;
- 200 sport labels from racket, team, combat, water, winter, athletics,
  outdoor, mind/body, gym, dance and exercise categories.

No chat text, profile field or Telegram identifier is exported. Invalid
production labels are expected to fail the semantic gate and are replaced from
the curated reserve.

## Generation

Create deterministic inputs:

```bash
python scripts/catalog_seed_labels.py \
  --production-food-input production-food-labels.json \
  --food-output food-labels-500.json \
  --sport-output sport-labels-200.json
```

Run bounded generators (the combined recommended ceiling is eight workers):

```bash
railway run --project <project> --service <service> \
  --environment production --no-local \
  python scripts/backfill_media_assets.py \
  --generate --kind food --input food-labels-500.json \
  --output food-assets --workers 6 --attempts 3

railway run --project <project> --service <service> \
  --environment production --no-local \
  python scripts/backfill_media_assets.py \
  --generate --kind sport --input sport-labels-200.json \
  --output sport-assets --workers 2 --attempts 3
```

The manifest is atomically checkpointed after every item. Restarting the same
command verifies and skips completed content-addressed WebP files. Failed rows
are retried on restart; approved files cannot be silently overwritten.

## Automatic semantic review and repair

Generation already performs one vision gate. The review pass reads the saved
file again, validates it independently and gives failed/rejected rows up to two
repair generations:

```bash
python scripts/backfill_media_assets.py \
  --review --kind food --input food-assets/backfill-manifest.json \
  --output food-assets/reviewed-manifest.json \
  --workers 6 --repair-attempts 2
```

Use the same command with `--kind sport`. An image is rejected for the wrong
main ingredient/activity, wrong preparation/equipment, visible text or logo,
unsafe/anatomically impossible sport posture, person/face problems, invalid
bytes, excessive size or a semantic score below the configured threshold.

## Select one new, deduplicated catalog

Combine all candidates from the primary and reserve review manifests only after
both automatic review passes have completed:

```bash
python scripts/select_media_catalog.py --kind food --all \
  --manifest food-assets/reviewed-manifest.json \
  --manifest food-reserve-assets/reviewed-manifest.json \
  --output food-selected

python scripts/select_media_catalog.py --kind sport --all \
  --manifest sport-assets/reviewed-manifest.json \
  --manifest sport-reserve-assets/reviewed-manifest.json \
  --output sport-selected
```

The selector verifies every source file and excludes labels already present in
the checked-in static manifest, duplicate labels and duplicate image content.
It keeps all remaining candidates as review reserve in one directory, so
reviewers do not have to reconcile separate batches.

## Complete visual review queue

Automated approval is not enough for catalog promotion:

```bash
python scripts/media_review_queue.py --build \
  --manifest food-selected/selected-manifest.json \
  --output food-selected/review-queue.html
```

The standalone HTML queue supports approve/reject, notes, filters, persistent
local progress and JSON export. Apply the exported decisions:

```bash
python scripts/media_review_queue.py --apply \
  --manifest food-assets/reviewed-manifest.json \
  --decisions visual-decisions.json \
  --output food-assets/visually-reviewed-manifest.json
```

The apply step fails unless every automatically approved image has a decision
with the exact content hash. Rejected images remain in a separate repair queue.

After visual review, select exactly the release target:

```bash
python scripts/select_media_catalog.py --kind food --target 500 \
  --require-visual \
  --manifest food-selected/visually-reviewed-manifest.json \
  --output food-release
```

Use target 200 for sport. The command fails closed if fewer than the requested
number survived visual review.

## Promotion

Only a manifest with both `review_status=complete` and
`visual_review_status=complete` can be promoted:

```bash
python scripts/promote_media_catalog.py --kind food \
  --manifest food-release/selected-manifest.json
python scripts/promote_media_catalog.py --kind sport \
  --manifest sport-release/selected-manifest.json
```

Promotion verifies SHA-256, WebP format and 512×512 dimensions, copies approved
files under an immutable `catalog-v2/` path, preserves existing reviewed
catalog images, and updates the static manifest. The resulting source change
goes through a normal PR, CI and one deep review before deployment.

## Cost and stop conditions

The current production image model is FLUX.2 Klein 4B. OpenRouter lists its
price as `$0.014 / megapixel`; a 512×512 attempt is approximately `$0.00367`.
Track `sum(assets[].attempts)` in each checkpoint manifest. Validation LLM cost
is additional and should be included from provider usage where available.

Stop or reduce worker count if provider 429/5xx errors dominate, validation
latency rises persistently, the local process starts swapping, or production
health shows any event writer failure/drop, section backlog or interactive LLM
queue growth. The offline process can be stopped safely and resumed later.
