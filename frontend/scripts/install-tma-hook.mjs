import { installHook } from "../vendor/deslop-tma/bin/tma.mjs";

const result = await installHook(process.cwd());
console.log(
  result.installed
    ? `TMA pre-commit check installed: ${result.path}`
    : result.reason,
);
