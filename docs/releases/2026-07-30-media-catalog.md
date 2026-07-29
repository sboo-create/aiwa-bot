# Reviewed food and sport catalog release

## Scope

This release adds immutable, visually reviewed media without consuming the
production runtime generation limit:

- 506 food images, raising the static food catalog from 105 to 611 entries;
- 215 sport and exercise images, raising the static training catalog from 20
  to 235 entries;
- cache revisions for both manifests and the Telegram Mini App module graph;
- deterministic resolution for equally good, semantically safe catalog
  subsets such as “омлет с сыром и зеленью”.

All new assets are 512×512 WebP files stored under content-addressed
`catalog-v2/` paths. The production long-tail food worker remains independent
and retains its daily attempt cap.

## Review evidence

The selection pool contained 522 food and 225 sport candidates that had
already passed byte, dimension, content-hash and automated semantic checks.
Every candidate was then visually inspected.

- Food: 506 approved, 16 rejected.
- Sport: 215 approved, 10 rejected.
- Total promoted: 721 approved images.

Food rejections covered visible brands/text, misleading preparation or an
unrelated ingredient. Sport rejections covered visible text, missing required
equipment/environment, unsafe or anatomically wrong exercises and an
incorrect activity. Rejected files were not copied into the application.

The signed-off source manifests and decision ledgers remain in the
operator-owned 2026-07-29 backfill workspace. The checked-in manifests plus
content-addressed assets are the portable release record.

## Verification

Before merge:

1. Run the focused media, resolver and fallback tests.
2. Run the full Python test suite and JavaScript syntax check.
3. Verify that every manifest path exists, every new file is WebP 512×512,
   hashes are unique and no image exceeds the configured asset-size ceiling.
4. Run ordinary PR checks and exactly one deep review.

After deployment:

1. Confirm `/health` reports the merge version with a live event writer and
   no failed/dropped events.
2. Fetch `/assets/food/manifest.json?v=3` and
   `/assets/train/manifest.json?v=2`; expect 611 and 235 entries.
3. Fetch sample new assets and confirm HTTP 200 with `image/webp`.
4. Open food and training screens in Telegram and confirm that the new module
   revision `r25` is loaded.

## Rollback

Revert the catalog release commit and deploy the resulting main revision. This
restores the previous manifests and removes the immutable `catalog-v2/`
assets. No database migration, queue rewrite or destructive data operation is
part of this release.
