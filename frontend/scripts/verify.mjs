import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");

const collectSources = (dir) => {
  const base = resolve(root, dir);
  const files = [];
  const walk = (current) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(jsx?|tsx?|css|md)$/.test(entry.name)) files.push(full);
    }
  };
  if (existsSync(base)) walk(base);
  return files;
};

const aiwaFiles = collectSources("src/aiwa");
const reactSource = [
  read("src/deslop-main.jsx"),
  ...aiwaFiles.filter((path) => /\.jsx?$/.test(path)).map((path) => readFileSync(path, "utf8")),
].join("\n");
// Bespoke data-viz primitives legitimately draw inline <svg>; the icon guard
// targets handwritten navigation icons, not charts. Keep this allowlist tight:
// AiwaWebUiChart contains only its empty-state trend, never product icons.
const svgDataVizAllowlist = new Set([
  resolve(root, "src/aiwa/components/AiwaWebUiChart.jsx"),
  resolve(root, "src/aiwa/components/CalorieGauge.jsx"),
]);
const iconScanSource = [
  read("src/deslop-main.jsx"),
  ...aiwaFiles
    .filter((path) => /\.jsx?$/.test(path))
    .filter((path) => !svgDataVizAllowlist.has(path))
    .map((path) => readFileSync(path, "utf8")),
].join("\n");
const compositionCss = read("src/aiwa/styles/composition.css");
// The canonical redesigned host shell lives beside frontend/, not in a copied
// frontend build artifact. Reading it in place keeps verification read-only.
const html = read("../webapp2/index.html");
const packageJson = JSON.parse(read("package.json"));
const failures = [];

const requireText = (label, source, snippets) => {
  for (const snippet of snippets) {
    if (!source.includes(snippet)) failures.push(`${label}: missing ${snippet}`);
  }
};

const forbidText = (label, source, snippets) => {
  for (const snippet of snippets) {
    if (source.includes(snippet)) failures.push(`${label}: forbidden ${snippet}`);
  }
};

const step = (label, check) => {
  process.stdout.write(`\n→ ${label}\n`);
  check();
};

const sha256 = (path) => createHash("sha256").update(readFileSync(resolve(root, path))).digest("hex");

step("AIWA: ui kit package layout", () => {
  const required = [
    "src/aiwa/index.js",
    "src/aiwa/bridge.jsx",
    "src/aiwa/AGENTS.md",
    "src/aiwa/styles/composition.css",
    "src/aiwa/screens/HomeScreen.jsx",
    "src/aiwa/screens/FoodScreen.jsx",
    "src/aiwa/screens/ActivityScreen.jsx",
    "src/aiwa/screens/ChatScreen.jsx",
    "src/aiwa/screens/Navigation.jsx",
    "src/aiwa/components/PaperRow.jsx",
    "src/aiwa/components/Field.jsx",
    "src/aiwa/lib/api.js",
    "src/aiwa/lib/icons.js",
  ];
  for (const path of required) {
    if (!existsSync(resolve(root, path))) failures.push(`Missing kit file: ${path}`);
  }
  requireText("entry", read("src/deslop-main.jsx"), [
    "from \"./aiwa/bridge.jsx\"",
    "installBridge()",
    "@deslop/tma/styles.css",
    "./aiwa/styles/composition.css",
  ]);
});

step("AIWA: embedded application syntax", () => {
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  if (scripts.length !== 1) failures.push("Expected one inline legacy application script");
  for (const script of scripts) {
    try {
      Function(script[1]);
    } catch (error) {
      failures.push(`Embedded JavaScript does not parse: ${error.message}`);
    }
  }
});

step("AIWA: Deslop provenance and reviewed local patches", () => {
  const expected = {
    "vendor/deslop-tma/dist/index.js": "40355df5c73ba60c2e65a1333fe0c150858df3d347f45e39e9e7c400c119ffb5",
    "vendor/deslop-tma/dist/styles.css": "9cd1d35ef506c83b7edce9757b3866c2955d916f97b6ed474110de35a638b296",
  };
  for (const [path, hash] of Object.entries(expected)) {
    if (!existsSync(resolve(root, path))) failures.push(`Missing vendored Deslop file: ${path}`);
    else if (sha256(path) !== hash) failures.push(`Vendored Deslop file was modified: ${path}`);
  }
  requireText("Deslop origin", read("vendor/deslop-tma/ORIGIN.md"), [
    "13b33b82c814d41f83ef224a49f012c81ca5f6c4",
    "AIWA Wheel API patch",
    "design-fixes@e57e84f",
    "RegularButton.className",
  ]);
  if (packageJson.dependencies?.["@deslop/tma"] !== "file:vendor/deslop-tma") {
    failures.push("@deslop/tma must resolve from the vendored repository build");
  }
});

step("AIWA: only public Deslop UI primitives", () => {
  requireText("Deslop imports", reactSource, [
    "from \"@deslop/tma\"",
    "Badge,",
    "Cell,",
    "ImageAvatar,",
    "InitialsAvatar,",
    "ModalView,",
    "PanelHeader,",
    "RegularButton,",
    "SectionList,",
    "TabBar,",
    "Tappable,",
    "TMAProvider,",
    "@deslop/tma/styles.css",
  ]);
  forbidText("React UI", reactSource, ["className=\"home-journal\"", "className=\"tabs\""]);
  forbidText("legacy main replicas", html, [
    "/* === PAPER MAIN / DESLOP TOKENS",
    "function homeCalendarPanel",
    "function homeJournalPanel",
    "var ICONS=",
    "var TABS=",
    "home-legacy-panels",
  ]);
  forbidText("composition CSS", compositionCss, [".tabs{", ".tab{", ".home-journal", ".home-card"]);
});

step("AIWA: Deslop icons, not handwritten navigation SVG", () => {
  const requiredIcons = [
    "home.svg", "calendar.svg", "circle-check.svg", "circle-alert.svg",
    "chat-heart.svg", "cup.svg", "fire.svg",
    "arrow-left.svg", "arrow-right.svg", "cross.svg",
  ];
  for (const icon of requiredIcons) {
    const iconPath = resolve(root, "vendor/deslop-primitives/icons", icon);
    if (!existsSync(iconPath)) failures.push(`Missing Deslop icon: ${icon}`);
  }
  requireText("icon provenance", read("vendor/deslop-primitives/ORIGIN.md"), [
    "13b33b82c814d41f83ef224a49f012c81ca5f6c4",
  ]);
  forbidText("React icons", iconScanSource, ["<svg", "<path"]);
});

step("AIWA: browser integration keeps current product logic", () => {
  requireText("HTML bridge", html, [
    "/assets/deslop/main.css",
    "/assets/deslop/main.js",
    "window.AiwaDeslop.renderHome",
    "window.AiwaDeslop.renderNav",
    "getAiwaCalendarMonth",
    "function aiwaCalendarDateState",
    "predictedPeriod",
    "aiwaCalendarDay",
    "api('/api/today'",
    "api(\"/api/checkin\"",
    "api(\"/api/period\"",
    "function toggleTodayPeriod()",
    "function toggleTodayIntimacy()",
  ]);
  requireText("React actions", reactSource, [
    "window.AiwaDeslop?.openProfile?.()",
    "call(\"openHomePanel\", \"calendar\")",
    "call(\"openHomePanel\", \"journal\")",
    // The journal defers one absolute snapshot to «Сохранить» and requires an
    // explicit host acknowledgement before React confirms or closes the draft.
    "acknowledgedHostWrite(\"aiwaSaveJournal\"",
    "data-aiwa-log-modal=\"true\"",
    "data-aiwa-calendar-modal=\"true\"",
    "function DateCell",
    "aiwa-calendar-months",
    "variant=\"period\"",
    "onClick={() => openBotChat()}",
  ]);
});

// The journal toggle is an AiwaChip variant: the RegularButton variant carries the
// state and the tokens carry the colour, so this pins the contract, not literals.
step("AIWA: selected period cell matches Paper", () => {
  requireText("period toggle composition", reactSource, [
    "className={`aiwa-log-toggle is-${variant}-toggle`}",
    "variant=\"period\"",
  ]);
  requireText("chip composition", reactSource, [
    "<RegularButton variant={active ? \"tinted\" : \"gray\"} label={content} isFill={isFill} />",
  ]);
  requireText("chip styling", compositionCss, [
    ".aiwa-chip[aria-pressed=\"true\"] .aiwa-log-toggle-mark",
    "fill: currentcolor;",
    "--tertiary-fill-background: var(--aiwa-control-bg);",
    "--secondary-button-color: var(--aiwa-accent-soft);",
    "--ui-text-primary: var(--aiwa-accent);",
  ]);
});

// Journal edits are a local draft; only «Сохранить» writes them back.
step("AIWA: the journal saves on its primary button", () => {
  requireText("journal header", reactSource, [
    "title={isPastDay ?",
    "dayIso + \"T00:00:00\"",
    ": \"Занести в журнал\"}",
  ]);
  requireText("journal save button", reactSource, [
    "className=\"aiwa-log-footer\"",
    "<AiwaButton",
    "loading={busy}",
    "{...actionProps(\"Сохранить\", save)}",
  ]);
  requireText("journal atomic write", reactSource, [
    "buildJournalSavePayload({",
    "date: currentDay.current",
    "date: currentIso.current",
    "await acknowledgedHostWrite(\"aiwaSaveJournal\", operation.payload)",
    "result.ok === true",
  ]);
  requireText("journal footer styling", compositionCss, [".aiwa-log-footer {"]);
});

step("AIWA: canonical refresh preserves the mounted screen", () => {
  requireText("stable home root", html, [
    "var homeRoot=el.querySelector('#deslop-home-root')",
    "window.AiwaDeslop.renderHome(homeRoot,payload)",
    "var keepsPaperHome=!!window.AiwaDeslop",
    "if(!keepsPaperHome&&window.AiwaDeslop)window.AiwaDeslop.unmountHome()",
    "var d=await api(\"/api/data\",{name:NAME})",
    "renderCurrentDataScreen(ACTIVE_SCREEN)",
    "return{data:D,revision:SETTINGS_DATA_REVISION}",
  ]);
});

step("AIWA: Paper calendar uses one synchronized day model", () => {
  requireText("calendar data", html, [
    "state=aiwaCalendarDateState(date)",
    "actualPeriod:actualPeriod",
    "predictedPeriod:predictedPeriod",
    "intimacy:!!PA_SET[iso]",
  ]);
  requireText("calendar composition", reactSource, [
    "function DateCell",
    "days={props.week}",
    "Array.from({ length: 20 }",
    "read(\"getAiwaCalendarMonth\", index - 12)",
    "is-actual-period",
    "is-predicted-period",
  ]);
  requireText("calendar styling", compositionCss, [
    "width: 34px;",
    "border: 1.5px dashed var(--aiwa-paper-orange);",
    "width: 6px;",
    "column-gap: 30px;",
    "row-gap: 36px;",
    "var(--safe-top, 56px)",
  ]);
});

step("AIWA: the shared day ruler picks the day Home shows", () => {
  requireText("picker composition", reactSource, [
    "function ScreenDayHeader",
    "selectedIso={props.selectedIso}",
    "selectDay(day.iso)",
    "ariaValueText={dayTitle(previewDay?.iso)}",
    "checkin={props.dayCheckin ?? props.checkin}",
    "dayIso={props.selectedIso}",
    "aria-pressed",
  ]);
  requireText("selected day payload", html, [
    "function aiwaSelectDay",
    "function homeSelectedDayPatch",
    "payload.selectedIso=SELECTED_DAY||todayIso",
    "if(!delayed&&!SELECTED_DAY)api('/api/today'",
  ]);
  requireText("selected day styling", compositionCss, [
    ".aiwa-overview .aiwa-day-wheel",
    ".aiwa-day-wheel[data-indicator=\"label\"]",
    ".aiwa-week .aiwa-date-cell.is-overview.is-selected",
    ".aiwa-week[data-selection=\"true\"]",
  ]);
});

step("AIWA: redesign covers the three-tab product", () => {
  requireText("screen bridge", html, [
    "window.AiwaDeslop.renderFood",
    "window.AiwaDeslop.renderActivity",
    "window.AiwaDeslop.renderChat",
    "var _ok={today:1,food:1,train:1,chat:1}",
    "paperModeHomeConfig",
  ]);
  requireText("redesign screens", reactSource, [
    "function FoodScreen",
    "function ActivityScreen",
    "function AddFoodPanel",
    "function FoodDiaryPanel",
    "function WorkoutPanel",
    "function WorkoutHistoryPanel",
    "function TrainingProfilePanel",
    "function ProfilePanel",
    "function ChatScreen",
    "renderFood(element",
    "renderActivity(element",
    "renderChat(element",
  ]);
  requireText("functional APIs", reactSource, [
    '"/api/diary"',
    '"/api/food_text"',
    '"/api/food_manual"',
    '"/api/workout"',
    '"/api/train_profile"',
    '"/api/chat"',
    '"/api/report"',
    '"/api/partner"',
  ]);
});

step("AIWA: production bundle", () => {
  const bundleDir = resolve(root, "assets/deslop");
  const jsPath = resolve(root, "assets/deslop/main.js");
  const cssPath = resolve(root, "assets/deslop/main.css");
  for (const path of [jsPath, cssPath]) {
    if (!existsSync(path)) failures.push(`Missing production bundle: ${path}`);
  }
  if (existsSync(jsPath)) {
    const jsFiles = readdirSync(bundleDir)
      .filter((file) => file.endsWith(".js"))
      .map((file) => join(bundleDir, file));
    const totalJsSize = jsFiles.reduce((total, file) => total + statSync(file).size, 0);
    const js = jsFiles.map((file) => readFileSync(file, "utf8")).join("\n");
    if (totalJsSize < 300_000) failures.push("Deslop JS bundle is unexpectedly small");
    forbidText("production JS chunks", js, ["process.env.NODE_ENV"]);
  }
  if (existsSync(cssPath)) {
    const css = readFileSync(cssPath, "utf8");
    if (statSync(cssPath).size < 500_000) failures.push("Deslop CSS bundle is unexpectedly small");
    requireText("production CSS", css, ["--ui-font-interface", "--ui-action-primary-background", "@font-face"]);
  }
});

if (failures.length) {
  console.error("\n✗ AIWA Deslop verification failed\n");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("\n✓ AIWA uses the exact Deslop package components");
console.log(`  kit modules: ${aiwaFiles.length}`);
