import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productRoot = path.join(root, "src", "aiwa");
const gateway = path.join(productRoot, "lib", "tma.js");
const productEntry = path.join(productRoot, "index.js");
const chartComponent = path.join(productRoot, "components", "AiwaWebUiChart.jsx");
const storybookConfig = path.join(root, "src", "storybook", "config.js");
const theme = path.join(productRoot, "styles", "theme.css");

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true })
  .flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });

const failures = [];
const sourceFiles = walk(productRoot)
  .filter((file) => /\.(?:js|jsx)$/.test(file))
  .filter((file) => file !== gateway);

for (const file of sourceFiles) {
  const source = fs.readFileSync(file, "utf8");
  if (/from\s+["']@deslop\/tma["']/.test(source)) {
    failures.push(`${path.relative(root, file)} imports @deslop/tma directly`);
  }
  if (file !== chartComponent && /from\s+["']recharts["']/.test(source)) {
    failures.push(`${path.relative(root, file)} imports recharts outside AiwaWebUiChart`);
  }
}

const gatewaySource = fs.readFileSync(gateway, "utf8");
for (const component of [
  "Badge",
  "Cell",
  "ImageAvatar",
  "InitialsAvatar",
  "ModalView",
  "Page",
  "PanelHeader",
  "RegularButton",
  "SectionList",
  "Skeleton",
  "Spinner",
  "TabBar",
  "Tappable",
  "Text",
  "TMAProvider",
]) {
  if (!new RegExp(`\\b${component}\\b`).test(gatewaySource)) {
    failures.push(`src/aiwa/lib/tma.js does not expose ${component}`);
  }
}

const storybookSource = fs.readFileSync(storybookConfig, "utf8");
for (const route of [
  "/ui-kit/colors",
  "/showcase/button",
  "/showcase/cell",
  "/showcase/panelHeader",
  "/aiwa/insight",
  "/aiwa/charts",
  "/aiwa/week",
  "/compositions/main",
]) {
  if (!storybookSource.includes(route)) {
    failures.push(`Storybook is missing required route ${route}`);
  }
}

const productEntrySource = fs.readFileSync(productEntry, "utf8");
if (!productEntrySource.includes('export { AiwaWebUiChart } from "./components/AiwaWebUiChart.jsx";')) {
  failures.push("src/aiwa/index.js must expose AiwaWebUiChart");
}

const themeSource = fs.readFileSync(theme, "utf8");
if (!themeSource.includes("--aiwa-accent: #ff7c3d;")) {
  failures.push("theme.css must define --aiwa-accent as #FF7C3D");
}

const stripComments = (source, file) => (file.endsWith(".css")
  ? source.replace(/\/\*[\s\S]*?\*\//g, "")
  : source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, ""));

const COLOUR_LITERAL = /(?:^|[^-\w])(#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|color\(display-p3[^)]*\))/g;
const styleFiles = [
  ...walk(path.join(productRoot, "styles")).filter((file) => file.endsWith(".css")),
  ...sourceFiles,
];

for (const file of styleFiles) {
  if (file === theme) continue;
  const relative = path.relative(root, file);
  const source = stripComments(fs.readFileSync(file, "utf8"), file);
  for (const match of source.matchAll(COLOUR_LITERAL)) {
    const line = source.slice(0, match.index).split("\n").length;
    failures.push(`${relative}:${line} hardcodes the colour ${match[1].trim()} — use an --aiwa-* token from theme.css`);
  }
}

const STATIC_INLINE_STYLE = /\b(padding|margin|gap|width|height|color|background|border|borderRadius|fontSize|lineHeight|boxShadow)\s*:\s*(["'`][^"'`]*["'`]|\d+)/g;

for (const file of sourceFiles) {
  const relative = path.relative(root, file);
  const source = stripComments(fs.readFileSync(file, "utf8"), file);
  for (const match of source.matchAll(/style=\{\{([\s\S]*?)\}\}/g)) {
    for (const property of match[1].matchAll(STATIC_INLINE_STYLE)) {
      if (property[2].includes("var(--") || property[2].includes("${")) continue;
      const line = source.slice(0, match.index).split("\n").length;
      failures.push(`${relative}:${line} inline style sets a static ${property[1]} — move it to composition.css`);
    }
  }
}

if (failures.length) {
  console.error("AIWA UI contract failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`AIWA UI contract passed (${sourceFiles.length} product modules checked).`);
