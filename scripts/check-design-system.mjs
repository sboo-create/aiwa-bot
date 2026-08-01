import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productRoot = path.join(root, "src", "aiwa");
const registryPath = path.join(productRoot, "design-system", "registry.json");
const entryPath = path.join(productRoot, "index.js");
const storybookPath = path.join(root, "src", "storybook", "config.js");
const storyPagesPath = path.join(root, "src", "storybook", "pages.jsx");
const failures = [];

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const entry = fs.readFileSync(entryPath, "utf8");
const storybook = fs.readFileSync(storybookPath, "utf8");
const storyPages = fs.readFileSync(storyPagesPath, "utf8");
const seenIds = new Set();
const seenDesignNames = new Set();

if (registry.schemaVersion !== 1) {
  failures.push("registry.json has an unsupported schemaVersion");
}

for (const component of registry.components ?? []) {
  const label = component.id || component.export || "unnamed component";

  if (!component.id || seenIds.has(component.id)) {
    failures.push(`${label}: id must be present and unique`);
  }
  seenIds.add(component.id);

  if (!component.designName?.startsWith("AIWA/") || seenDesignNames.has(component.designName)) {
    failures.push(`${label}: designName must be a unique AIWA/* name`);
  }
  seenDesignNames.add(component.designName);

  if (!["primitive", "pattern", "composition"].includes(component.layer)) {
    failures.push(`${label}: layer must be primitive, pattern, or composition`);
  }

  const sourcePath = path.join(root, component.source ?? "");
  if (!fs.existsSync(sourcePath)) {
    failures.push(`${label}: source does not exist (${component.source})`);
  }

  const exportPattern = new RegExp(`export\\s+\\{\\s*${component.export}\\s*\\}`);
  if (!exportPattern.test(entry)) {
    failures.push(`${label}: ${component.export} is not exported from src/aiwa/index.js`);
  }

  if (!storybook.includes(`path: "${component.story}"`)) {
    failures.push(`${label}: Storybook route is missing (${component.story})`);
  }

  if (!new RegExp(`<${component.export}\\b`).test(storyPages)) {
    failures.push(`${label}: ${component.export} is never rendered in src/storybook/pages.jsx`);
  }
}

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true })
  .flatMap((entryItem) => {
    const target = path.join(directory, entryItem.name);
    return entryItem.isDirectory() ? walk(target) : [target];
  });

const productModules = walk(productRoot).filter((file) => /\.(?:js|jsx)$/.test(file));
const gateway = path.join(productRoot, "lib", "tma.js");
const primitiveOwners = new Map([
  ["Cell", path.join(productRoot, "components", "AiwaCell.jsx")],
  ["ModalView", path.join(productRoot, "components", "AiwaModalView.jsx")],
]);

for (const file of productModules) {
  if (file === gateway || file === entryPath) continue;
  const source = fs.readFileSync(file, "utf8");
  for (const [primitive, owner] of primitiveOwners) {
    const importPattern = new RegExp(
      `import\\s*\\{[^}]*\\b${primitive}\\b[^}]*\\}\\s*from\\s*["'][^"']*lib\\/tma(?:\\.js)?["']`,
    );
    if (file !== owner && importPattern.test(source)) {
      failures.push(`${path.relative(root, file)} bypasses ${path.basename(owner, ".jsx")}`);
    }
  }
}

if (failures.length) {
  console.error("AIWA design-system contract failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`AIWA design-system contract passed (${registry.components.length} registered components).`);
