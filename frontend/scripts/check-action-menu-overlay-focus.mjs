import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import react from "@vitejs/plugin-react";
import { build } from "vite";

const frontendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixtureRoot = realpathSync(mkdtempSync(path.join(tmpdir(), "aiwa-action-menu-focus-")));
const chromeCandidates = [
  process.env.CHROME_BIN,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = chromeCandidates.find(existsSync);

assert.ok(chrome, "Chrome/Chromium is required (or set CHROME_BIN)");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectCdp = (url) => new Promise((resolve, reject) => {
  const socket = new WebSocket(url);
  const pending = new Map();
  let nextId = 0;
  socket.addEventListener("open", () => resolve({
    send(method, params = {}) {
      return new Promise((resolveCall, rejectCall) => {
        const id = ++nextId;
        pending.set(id, { resolve: resolveCall, reject: rejectCall });
        socket.send(JSON.stringify({ id, method, params }));
      });
    },
    close() { socket.close(); },
  }));
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(String(event.data));
    const call = pending.get(message.id);
    if (!call) return;
    pending.delete(message.id);
    if (message.error) call.reject(new Error(message.error.message));
    else call.resolve(message.result);
  });
  socket.addEventListener("error", () => reject(new Error("Chrome DevTools connection failed")));
});

async function runChromeFixture(binary, profileDir, fixtureUrl) {
  const child = spawn(binary, [
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-background-networking",
    "--disable-component-update",
    "--no-first-run",
    "--allow-file-access-from-files",
    "--remote-debugging-port=0",
    `--user-data-dir=${profileDir}`,
    "about:blank",
  ], { stdio: ["ignore", "ignore", "pipe"] });
  let stderr = "";
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (chunk) => { stderr += chunk; });
  let cdp = null;
  try {
    const portFile = path.join(profileDir, "DevToolsActivePort");
    let port = "";
    for (let attempt = 0; attempt < 100 && !port; attempt += 1) {
      if (existsSync(portFile)) port = readFileSync(portFile, "utf8").split("\n")[0];
      if (!port) await delay(50);
    }
    assert.ok(port, `Chrome DevTools port was not created\n${stderr}`);
    const targetResponse = await fetch(
      `http://127.0.0.1:${port}/json/new?${encodeURIComponent(fixtureUrl)}`,
      { method: "PUT" },
    );
    assert.ok(targetResponse.ok, `Chrome target creation failed: ${targetResponse.status}`);
    const target = await targetResponse.json();
    cdp = await connectCdp(target.webSocketDebuggerUrl);
    await cdp.send("Runtime.enable");

    let status = "pending";
    let detail = "";
    for (let attempt = 0; attempt < 120 && status === "pending"; attempt += 1) {
      const state = await cdp.send("Runtime.evaluate", {
        expression: `(() => { const node = document.querySelector("#result"); return node ? { status: node.dataset.status, detail: node.textContent } : { status: "pending", detail: "" }; })()`,
        returnByValue: true,
      });
      status = state.result?.value?.status || "pending";
      detail = state.result?.value?.detail || "";
      if (status === "pending") await delay(50);
    }
    return { status, detail };
  } finally {
    cdp?.close();
    child.kill("SIGKILL");
  }
}

const fsImport = (absolutePath) => `/@fs/${absolutePath.replaceAll("\\", "/")}`;
const actionMenuImport = fsImport(path.join(frontendRoot, "src/aiwa/components/ActionMenu.jsx"));
const reactImport = fsImport(path.join(frontendRoot, "node_modules/react/index.js"));
const reactDomImport = fsImport(path.join(frontendRoot, "node_modules/react-dom/client.js"));

writeFileSync(path.join(fixtureRoot, "index.html"), `<!doctype html>
<html lang="ru">
  <body>
    <button id="background-before">Фоновая кнопка до календаря</button>
    <div id="root"></div>
    <button id="background-after">Фоновая кнопка после календаря</button>
    <pre id="result" data-status="pending">pending</pre>
    <script type="module" src="/main.jsx"></script>
  </body>
</html>`);
writeFileSync(path.join(fixtureRoot, "tma-stub.jsx"), `
import React from ${JSON.stringify(reactImport)};
export function Text({ children }) { return <span>{children}</span>; }
`);

writeFileSync(path.join(fixtureRoot, "main.jsx"), `
import React from ${JSON.stringify(reactImport)};
import { createRoot } from ${JSON.stringify(reactDomImport)};
import { ActionMenu } from ${JSON.stringify(actionMenuImport)};

const wait = (ms = 60) => new Promise((resolve) => setTimeout(resolve, ms));
const key = (target, value, init = {}) => target.dispatchEvent(new KeyboardEvent("keydown", {
  key: value,
  bubbles: true,
  cancelable: true,
  ...init,
}));

function Fixture() {
  const items = [
    { label: "Симптомы", onSelect() {} },
    { label: "Близость", onSelect() {} },
  ];
  return <>
    <div id="calendar-overlay" data-aiwa-calendar-modal="true">
      <button id="overlay-first">Первый контрол календаря</button>
      <button id="overlay-previous">Предыдущий контрол календаря</button>
      <ActionMenu items={items} trigger={<button id="overlay-trigger">Меню календаря</button>} />
    </div>
    <section id="plain-page">
      <button id="plain-before">До обычного меню</button>
      <ActionMenu items={items} trigger={<button id="plain-trigger">Обычное меню</button>} />
      <button id="plain-after">После обычного меню</button>
    </section>
  </>;
}

const result = document.querySelector("#result");
const observed = {};
try {
  createRoot(document.querySelector("#root")).render(<Fixture />);
  await wait(120);

  const overlayTrigger = document.querySelector("#overlay-trigger");
  overlayTrigger.focus();
  key(overlayTrigger, "ArrowDown");
  await wait();
  observed.overlayMenuInitial = document.activeElement?.textContent?.trim();
  key(document.activeElement, "Tab");
  await wait();
  observed.overlayForward = document.activeElement?.id;

  overlayTrigger.focus();
  key(overlayTrigger, "ArrowDown");
  await wait();
  key(document.activeElement, "Tab", { shiftKey: true });
  await wait();
  observed.overlayBackward = document.activeElement?.id;

  overlayTrigger.focus();
  key(overlayTrigger, "ArrowDown");
  await wait();
  key(document.activeElement, "Escape");
  await wait();
  observed.overlayEscape = document.activeElement?.id;

  const plainTrigger = document.querySelector("#plain-trigger");
  plainTrigger.focus();
  key(plainTrigger, "ArrowDown");
  await wait();
  key(document.activeElement, "Tab");
  await wait();
  observed.plainForward = document.activeElement?.id;

  if (observed.overlayMenuInitial !== "Симптомы") throw new Error("menu did not take initial focus");
  if (observed.overlayForward !== "overlay-first") throw new Error("forward Tab escaped the overlay instead of wrapping");
  if (observed.overlayBackward !== "overlay-previous") throw new Error("Shift+Tab escaped the overlay");
  if (observed.overlayEscape !== "overlay-trigger") throw new Error("Escape did not restore trigger focus");
  if (observed.plainForward !== "plain-after") throw new Error("non-overlay handoff changed");
  if ([observed.overlayForward, observed.overlayBackward].some((id) => id?.startsWith("background-"))) {
    throw new Error("overlay traversal reached a focusable background control");
  }
  result.dataset.status = "pass";
  result.textContent = JSON.stringify(observed);
} catch (error) {
  result.dataset.status = "fail";
  result.textContent = JSON.stringify({ observed, error: error?.stack || String(error) });
}
`);

try {
  const outputDir = path.join(fixtureRoot, "dist");
  await build({
    root: fixtureRoot,
    configFile: false,
    logLevel: "error",
    base: "./",
    plugins: [{
      name: "action-menu-tma-stub",
      enforce: "pre",
      resolveId(source, importer) {
        if (source === "../lib/tma" && importer?.endsWith("/components/ActionMenu.jsx")) {
          return path.join(fixtureRoot, "tma-stub.jsx");
        }
        return null;
      },
    }, react()],
    resolve: {
      alias: [
        { find: /^react$/, replacement: path.join(frontendRoot, "node_modules/react/index.js") },
        { find: /^react\/jsx-dev-runtime$/, replacement: path.join(frontendRoot, "node_modules/react/jsx-dev-runtime.js") },
        { find: /^react\/jsx-runtime$/, replacement: path.join(frontendRoot, "node_modules/react/jsx-runtime.js") },
        { find: /^react\/compiler-runtime$/, replacement: path.join(frontendRoot, "node_modules/react/compiler-runtime.js") },
        { find: /^react-dom$/, replacement: path.join(frontendRoot, "node_modules/react-dom/index.js") },
        { find: /^react-dom\/client$/, replacement: path.join(frontendRoot, "node_modules/react-dom/client.js") },
      ],
    },
    build: {
      outDir: outputDir,
      emptyOutDir: true,
    },
  });
  const profileDir = path.join(fixtureRoot, "chrome-profile");
  const result = await runChromeFixture(
    chrome,
    profileDir,
    `file://${path.join(outputDir, "index.html")}`,
  );
  assert.equal(result.status, "pass", result.detail || "Browser fixture stayed pending");
  console.log(`ActionMenu overlay focus: pass ${result.detail}`);
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true });
}
