# Reviewed food and sport catalog release

## Scope

This release adds immutable, visually reviewed media without consuming the
production runtime generation limit:

- 507 food images, raising the static food catalog from 105 to 612 entries;
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

- Food: 507 approved, 16 rejected.
- Sport: 215 approved, 10 rejected.
- Total promoted: 722 approved images.

Food rejections covered visible brands/text, misleading preparation or an
unrelated ingredient. Sport rejections covered visible text, missing required
equipment/environment, unsafe or anatomically wrong exercises and an
incorrect activity. Rejected files were not copied into the application.
The final ordinary review exposed one common exact-label gap, “Омлет с сыром
и зеленью”. A dedicated card showing both visible melted cheese and herbs was
generated, normalized to the same 512×512 content-addressed WebP contract,
visually inspected, and added as the 507th food image. It replaces neither an
existing image nor an ambiguous resolver alias.

The signed-off source manifests and decision ledgers remain in the
operator-owned 2026-07-29 backfill workspace. The checked-in manifests plus
content-addressed assets are the portable release record.

## Verification

Before merge:

1. Run the focused media, resolver and fallback tests.
2. Run the full Python test suite and JavaScript syntax check.
3. Verify that every manifest path exists, every new file is WebP 512×512,
   hashes are unique and no image exceeds the configured asset-size ceiling.
4. Deploy the exact PR head to staging. Fetch both versioned manifests and a
   sample of old and new asset URLs, then open food and training screens in
   Telegram. The staging smoke must prove that manifests and assets are
   published atomically before `main` is merged.
5. Run ordinary PR checks and exactly one deep review. For PRs above GitHub's
   300-file diff limit, the deep-review workflow must use a checked-out
   base/head diff instead of the single REST diff endpoint.

Old manifest entries and their files are preserved. During an edge-cache
transition an old client therefore continues to resolve old URLs, while a new
client receives the cache-busted manifest only from an image that already
contains every referenced `catalog-v2` file. No CDN purge is required.

On i167, Caddy must not read from the application release directory. Build
`/srv/aiwa-staging/public-releases/<sha>` with only `webapp2/assets`, grant the
Caddy group read/traverse access to that public tree, and atomically replace
`/srv/aiwa-staging/public-current` only after the complete tree validates.
This keeps static assets available during application restarts without
granting Caddy access to code, configuration, SQLite or provider credentials.
Activation always builds and validates a fresh candidate directory. A partial
inactive target is quarantined; an active immutable target may only be reused
when its completion marker and full contents match. The validator also refuses
to publish a release that removes an asset URL used by the previous manifests,
so cached older clients keep working.

After deployment:

1. Confirm `/health` reports the merge version with a live event writer and
   no failed/dropped events.
2. Fetch `/assets/food/manifest.json?v=3` and
   `/assets/train/manifest.json?v=2`; expect 612 and 235 entries.
3. Fetch sample new assets and confirm HTTP 200 with `image/webp`.
4. Open food and training screens in Telegram and confirm that the new module
   revision `r25` is loaded.

## Rollback

Revert the catalog release commit and deploy the resulting main revision. This
restores the previous manifests and removes the immutable `catalog-v2/`
assets. No database migration, queue rewrite or destructive data operation is
part of this release.
