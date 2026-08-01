import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function requireFile(relativePath, minimumSize = 1) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`missing ${relativePath}`);
    return null;
  }
  if (fs.statSync(absolutePath).size < minimumSize) {
    failures.push(`${relativePath} is unexpectedly small`);
  }
  return absolutePath;
}

const storybookIndex = requireFile("storybook-static/storybook/index.html", 100);
const buildDirectory = path.join(root, "assets", "deslop");
const buildCss = requireFile("assets/deslop/main.css", 500_000);
const buildEntry = requireFile("assets/deslop/main.js", 20);
const publishedIndex = requireFile("webapp2/index.html", 100_000);
const publishedOverrides = requireFile("webapp2/assets/deslop/aiwa-v163.css", 1_000);
const generatedFiles = [];

function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(target);
    else generatedFiles.push(target);
  }
}

if (fs.existsSync(buildDirectory)) {
  collect(buildDirectory);
  const files = fs.readdirSync(buildDirectory);
  if (files.filter((name) => /^deslop-main-.*\.js$/.test(name)).length !== 1) {
    failures.push("production build must contain exactly one deslop-main chunk");
  }
  if (files.filter((name) => /^AiwaWebUiChart-.*\.js$/.test(name)).length !== 1) {
    failures.push("production build must contain exactly one AiwaWebUiChart chunk");
  }
}

for (const file of [storybookIndex, buildCss, buildEntry, ...generatedFiles].filter(Boolean)) {
  if (!/\.(?:html|css|js)$/.test(file)) continue;
  const source = fs.readFileSync(file, "utf8");
  if (source.includes("process.env.NODE_ENV")) {
    failures.push(`${path.relative(root, file)} leaks process.env.NODE_ENV`);
  }
}

if (publishedIndex) {
  const indexSource = fs.readFileSync(publishedIndex, "utf8");
  const preload = indexSource.match(/<link rel="modulepreload" href="\/assets\/deslop\/(deslop-main-aiwa-v\d+\.js\?v=(r\d+))">/);
  const bootstrap = fs.readFileSync(path.join(root, "webapp2/assets/deslop/main.js"), "utf8");
  if (!indexSource.includes('<body class="apple aiwa-booting">')) {
    failures.push("production HTML must start with the new boot skeleton");
  }
  if (indexSource.includes('<div class="bar">')) {
    failures.push("production HTML must not paint the legacy header shell");
  }
  if (!preload) {
    failures.push("production HTML must modulepreload the versioned React bundle");
  } else if (!bootstrap.includes(`./${preload[1]}`)) {
    failures.push("modulepreload and main.js must reference the same bundle revision");
  }
  if (!indexSource.includes("var AIWA_BOOT_DATA=")) {
    failures.push("production HTML must start loading data in parallel with React");
  }
}

if (publishedOverrides) {
  const overrideSource = fs.readFileSync(publishedOverrides, "utf8");
  const snackbarItemRule = overrideSource.match(/\[class\*="_item_cnxqv"\]\s*\{([^}]*)\}/);
  if (snackbarItemRule && /(?:opacity\s*:\s*1|transform\s*:\s*none)\s*!important/.test(snackbarItemRule[1])) {
    failures.push("legacy CSS must not override Snackbar Motion opacity or transform");
  }
}

if (failures.length) {
  console.error("AIWA frontend verification failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("AIWA frontend verification passed (catalog and production bundle are present).");
