# Vendored Deslop package

This directory is based on the `@deslop/tma` 0.1.0 library build from
[`mishanaer/deslop`](https://github.com/mishanaer/deslop) at commit
`13b33b82c814d41f83ef224a49f012c81ca5f6c4`.

The package was built with its own `yarn build:lib`. AIWA consumes its public
package exports.

The consumer manifest omits repository-only scripts and dev dependencies,
including the Yarn-only `link:../primitives` entry that npm tries to resolve
even for a prebuilt local package. Runtime dependencies and public exports are
unchanged apart from the additive `Wheel` props documented below.

## AIWA Wheel API patch

`dist/index.js` carries one reviewed source-only patch, integrated from
`design-fixes@e57e84f`: the public `Wheel` export accepts `formatTick`,
`showValue`, `showLimits`, `indicator`, `ariaLabel`, `ariaValueText`, and
`dragAreaRef`. Existing defaults remain compatible with the upstream build.

The same reviewed integration also makes `RegularButton.className` additive
instead of replacing the component's generated base/variant classes. This keeps
AIWA wrappers styled when they add a product class.

`dist/styles.css` remains the existing main snapshot and is not replaced by the
donor build. In particular, no vendor font declarations are introduced. The two
new Wheel presentation rules (`--tick-mark-height` and the `label` indicator)
are scoped to `.aiwa-day-wheel` in `src/aiwa/styles/composition.css`.
