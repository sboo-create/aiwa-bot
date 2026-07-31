# Vendored Deslop package

This directory contains the unmodified `@deslop/tma` 0.1.0 library build from
[`mishanaer/deslop`](https://github.com/mishanaer/deslop) at commit
`13b33b82c814d41f83ef224a49f012c81ca5f6c4`.

The package was built with its own `yarn build:lib`. AIWA consumes the public
package exports and does not copy or reimplement component source.

The consumer manifest omits repository-only scripts and dev dependencies,
including the Yarn-only `link:../primitives` entry that npm tries to resolve
even for a prebuilt local package. Runtime dependencies and public exports are
unchanged. The shipped `dist` files are byte-for-byte unchanged.
