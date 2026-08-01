# Vendored Deslop package

This directory contains the `@deslop/tma` 0.1.0 library build from
[`mishanaer/deslop`](https://github.com/mishanaer/deslop) at commit
`13b33b82c814d41f83ef224a49f012c81ca5f6c4`.

The package was built with its own `yarn build:lib`. AIWA consumes the public
package exports and does not copy or reimplement component source.

The consumer manifest omits repository-only scripts and dev dependencies,
including the Yarn-only `link:../primitives` entry that npm tries to resolve
even for a prebuilt local package. Runtime dependencies and public exports are
unchanged.

## Ahead of that commit

`dist` carries one patch on top of `13b33b8`, so the home screen can use `Wheel`
as its day strip. It is the same change made upstream in the Deslop working tree
(`mini-app/components/Wheel`) and is due to land there; once it is released, drop
this section and re-vendor a clean build.

- `Wheel` takes `formatTick` — what a tick says under the drum, so a date ruler
  can label its ticks with the day of month instead of the raw drum value;
- `Wheel` takes `showValue` and `showLimits` — a screen that already spells the
  chosen value out in its own words turns off the built-in value and the Min/Max
  shortcuts;
- `Wheel` takes `indicator="track" | "label"` — `label` shortens the selector to
  the tick label, the way a segmented control pills the chosen segment;
- `Wheel` takes `ariaLabel` — the drum is called «Выбор дня» on home, not the
  built-in «Value selector»;
- `Wheel` takes `dragAreaRef` — an element to be dragged by instead of the strip
  of ticks, so a swipe anywhere in the block the drum heads turns it.

Defaults keep the previous rendering. Rebuilding `13b33b8` without the patch
reproduces the previous `dist/index.js` and `dist/styles.css` byte for byte, so
the diff against the upstream build is only `Wheel`.

## Rebuilding

The package moved out of `tma/` upstream and the library build went with it, so
`dist` is built from the commit it is pinned to:

```sh
git -C <deslop> worktree add /tmp/tma-build 13b33b8
# port the component change into /tmp/tma-build/tma/src/components/...
cd /tmp/tma-build/tma && yarn install && yarn build:lib
cp dist/index.js dist/styles.css <aiwa>/vendor/deslop-tma/dist/
cp dist/assets/*.js <aiwa>/vendor/deslop-tma/dist/assets/
```

Build the pinned commit unpatched first and `cmp` it against the shipped files:
that is what shows the delta is only the change being ported.
