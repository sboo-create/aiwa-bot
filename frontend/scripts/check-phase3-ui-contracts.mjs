import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  ActionMenu,
  actionMenuFocusIndex,
  actionMenuPageFocusCandidate,
  actionMenuRelativeFocusIndex,
  actionMenuRestoresFocusAfterSelect,
} from "../src/aiwa/components/ActionMenu.jsx";
import { AiwaButton } from "../src/aiwa/components/AiwaButton.jsx";
import {
  buildJournalSavePayload,
  isJournalSaveSessionCurrent,
} from "../src/aiwa/lib/journalSave.js";
import {
  getProfileMutationState,
  isProfileMutationSessionCurrent,
  requestProfileMutation,
  subscribeToProfileMutation,
} from "../src/aiwa/lib/profileMutation.js";
import { syncProfileSettingsSnapshot } from "../src/aiwa/lib/profileSettings.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = (path) => readFileSync(resolve(root, path), "utf8");
let passed = 0;

const check = async (name, run) => {
  await run();
  passed += 1;
  console.log(`✓ ${name}`);
};

await check("journal payload is absolute, date-bound, and preserves custom symptoms", () => {
  const payload = buildJournalSavePayload({
    date: "2026-07-23",
    energy: 3,
    mood: 2,
    symptoms: ["head", "custom:тошнота", "head", "custom:тошнота"],
    custom: "  слабость  ",
    intimacy: true,
    period: true,
    includePeriod: true,
  });
  assert.deepEqual(payload, {
    date: "2026-07-23",
    energy: 3,
    mood: 2,
    symptoms: ["head"],
    custom_symptoms: ["тошнота", "слабость"],
    intimacy: true,
    period: true,
  });
  const calendarPayload = buildJournalSavePayload({ date: "2026-07-22" });
  assert.equal("period" in calendarPayload, false);
});

await check("Journal and CalendarDayLog make one atomic call with a frozen target", () => {
  for (const file of ["JournalPanel.jsx", "CalendarDayLogPanel.jsx"]) {
    const panel = source(`src/aiwa/panels/${file}`);
    assert.equal((panel.match(/acknowledgedHostWrite\("aiwaSaveJournal"/g) || []).length, 1, file);
    assert.ok(panel.includes("payload: buildJournalSavePayload({"), file);
    assert.ok(panel.includes('inert={busy ? true : undefined}'), file);
    assert.ok(panel.includes('data-haptic="light"'), file);
    assert.ok(panel.includes("if (saveLock.current) return;"), file);
    assert.ok(panel.includes("const staleSession = openSession.current.open"), file);
    assert.match(panel, /if \(staleSession\) \{[\s\S]*setBusy\(true\);[\s\S]*setSaveRevision/);
    for (const legacyMethod of ["setCheckin", "setDayCheckin", "toggleSym", "toggleDaySym", "addCustomSym", "markPA"]) {
      assert.equal(panel.includes(`acknowledgedHostWrite("${legacyMethod}"`), false, `${file}: ${legacyMethod}`);
    }
  }
  const journal = source("src/aiwa/panels/JournalPanel.jsx");
  const dayLog = source("src/aiwa/panels/CalendarDayLogPanel.jsx");
  assert.ok(journal.includes("dayIso: currentDay.current"));
  assert.ok(journal.includes("currentDate: currentDay.current"));
  assert.ok(journal.includes("targetDate: operation.dayIso"));
  assert.ok(dayLog.includes("iso: currentIso.current"));
  assert.ok(dayLog.includes("currentDate: currentIso.current"));
  assert.ok(dayLog.includes("targetDate: operation.iso"));
});

await check("Journal panels adopt only same-date reopen outcomes", () => {
  assert.equal(isJournalSaveSessionCurrent({
    isOpen: true,
    currentGeneration: 2,
    startedGeneration: 1,
    currentDate: "2026-07-23",
    targetDate: "2026-07-23",
  }), true);
  assert.equal(isJournalSaveSessionCurrent({
    isOpen: true,
    currentGeneration: 2,
    startedGeneration: 1,
    currentDate: "2026-07-24",
    targetDate: "2026-07-23",
  }), false);
  assert.equal(isJournalSaveSessionCurrent({
    isOpen: false,
    currentGeneration: 2,
    startedGeneration: 1,
    currentDate: "2026-07-23",
    targetDate: "2026-07-23",
  }), false);
  for (const [file, target] of [
    ["JournalPanel.jsx", "saveLock.current?.dayIso === selectedDate"],
    ["CalendarDayLogPanel.jsx", "saveLock.current?.iso === iso"],
  ]) {
    const panel = source(`src/aiwa/panels/${file}`);
    assert.ok(panel.includes(target), file);
    assert.ok(panel.includes("const isCurrentSaveSession = () => isJournalSaveSessionCurrent({"), file);
    assert.ok(panel.includes("const staleSession = openSession.current.open && !isCurrentSaveSession();"), file);
  }
});

await check("Profile mutations are single-flight across mounted panels", async () => {
  let finish;
  let calls = 0;
  const states = [];
  const unsubscribe = subscribeToProfileMutation((state) => states.push(state.active?.key || "idle"));
  const first = requestProfileMutation("profile", () => {
    calls += 1;
    return new Promise((resolveMutation) => { finish = resolveMutation; });
  }, { ownerId: "home-profile" });
  const second = requestProfileMutation("preferences", () => {
    calls += 1;
    return Promise.resolve();
  }, { ownerId: "food-profile" });
  assert.equal(first.owner, true);
  assert.equal(second.owner, false);
  assert.equal(first.promise, second.promise);
  assert.equal(calls, 0);
  await Promise.resolve();
  assert.equal(calls, 1);
  assert.equal(getProfileMutationState().active?.key, "profile");
  assert.equal(getProfileMutationState().active?.ownerId, "home-profile");
  finish({ ok: true });
  await first.promise;
  assert.equal(getProfileMutationState().active, null);
  assert.equal(getProfileMutationState().completion?.status, "fulfilled");
  assert.deepEqual(getProfileMutationState().completion?.value, { ok: true });
  unsubscribe();
  assert.deepEqual(states, ["idle", "profile", "idle"]);

  const profile = source("src/aiwa/panels/ProfilePanel.jsx");
  assert.ok(profile.includes("subscribeToProfileMutation(setMutationState)"));
  assert.ok(profile.includes("requestProfileMutation("));
  assert.ok(profile.includes("if (isProfileMutationInFlight()) return null;"));
  assert.ok(profile.includes("result.send_time === sendTime"));
  assert.ok(profile.includes("result.daily_summary_enabled === dailySummaryEnabled"));
  assert.equal(profile.includes("const actionLock = useRef"), false);
});

await check("Profile owner adopts completion feedback after close and reopen", () => {
  assert.equal(isProfileMutationSessionCurrent({
    isOpen: true,
    currentGeneration: 2,
    startedGeneration: 1,
    operationId: 7,
    adoptedOperationId: 7,
    adoptedGeneration: 2,
  }), true);
  assert.equal(isProfileMutationSessionCurrent({
    isOpen: true,
    currentGeneration: 2,
    startedGeneration: 1,
    operationId: 7,
    adoptedOperationId: 8,
    adoptedGeneration: 2,
  }), false);
  assert.equal(isProfileMutationSessionCurrent({
    isOpen: false,
    currentGeneration: 2,
    startedGeneration: 1,
    operationId: 7,
    adoptedOperationId: 7,
    adoptedGeneration: 2,
  }), false);

  const profile = source("src/aiwa/panels/ProfilePanel.jsx");
  assert.ok(profile.includes("adoptedMutation.current = preserveActionView"));
  assert.ok(profile.includes("operation.id = request.operation.id"));
  assert.ok(profile.includes("isProfileMutationSessionCurrent({"));
});

await check("Profile never confirms against stale data after refresh failure", async () => {
  const calls = [];
  const snapshot = await syncProfileSettingsSnapshot(async (name, action, receipt) => {
    calls.push([name, action, receipt]);
    if (name === "reloadSettingsData") throw new Error("network");
    return { data: { send_time: receipt.send_time }, revision: 8 };
  }, "summary", { ok: true, send_time: "09:30" });
  assert.deepEqual(snapshot, { data: { send_time: "09:30" }, revision: 8 });
  assert.deepEqual(calls.map(([name]) => name), [
    "reloadSettingsData",
    "applySettingsMutationReceipt",
  ]);
  assert.equal(await syncProfileSettingsSnapshot(async () => null, "profile", { ok: true }), null);

  const profile = source("src/aiwa/panels/ProfilePanel.jsx");
  assert.ok(profile.includes("const snapshot = await syncSettingsData(actionKey, receipt);"));
  assert.ok(profile.includes("if (!snapshot) {"));
  assert.ok(profile.includes("completion.value?.synced !== true"));
  assert.ok(profile.includes("if (!snapshot) return { synced: false };"));
});

await check("ActionMenu follows the keyboard focus and restore contract", () => {
  assert.equal(actionMenuFocusIndex("ArrowDown", 0, 3), 1);
  assert.equal(actionMenuFocusIndex("ArrowDown", 2, 3), 0);
  assert.equal(actionMenuFocusIndex("ArrowUp", 0, 3), 2);
  assert.equal(actionMenuFocusIndex("ArrowUp", -1, 3), 2);
  assert.equal(actionMenuFocusIndex("Home", 2, 3), 0);
  assert.equal(actionMenuFocusIndex("End", 0, 3), 2);
  assert.equal(actionMenuRelativeFocusIndex(2, 3, 1), 0);
  assert.equal(actionMenuRelativeFocusIndex(0, 3, -1), 2);
  assert.equal(actionMenuRelativeFocusIndex(-1, 3, 1), 0);
  assert.equal(actionMenuRelativeFocusIndex(-1, 3, -1), 2);
  assert.equal(actionMenuRestoresFocusAfterSelect({ label: "Фото" }), true);
  assert.equal(actionMenuRestoresFocusAfterSelect({ label: "Месячные", restoreFocus: false }), false);

  const visible = {
    closest: () => null,
    getAttribute: () => null,
    getClientRects: () => [{ width: 20, height: 20 }],
  };
  assert.equal(actionMenuPageFocusCandidate(visible), true);
  assert.equal(actionMenuPageFocusCandidate({
    ...visible,
    closest: (selector) => selector.includes(".hidden") ? {} : null,
  }), false);
  assert.equal(actionMenuPageFocusCandidate({
    ...visible,
    getClientRects: () => [],
  }), false);
  const previousGetComputedStyle = globalThis.getComputedStyle;
  globalThis.getComputedStyle = () => ({
    display: "none",
    visibility: "visible",
    contentVisibility: "visible",
  });
  assert.equal(actionMenuPageFocusCandidate(visible), false);
  if (previousGetComputedStyle) globalThis.getComputedStyle = previousGetComputedStyle;
  else delete globalThis.getComputedStyle;

  const markup = renderToStaticMarkup(
    React.createElement(ActionMenu, {
      items: [{ label: "Фото", onSelect: () => {} }],
      trigger: React.createElement(AiwaButton, { label: "Добавить" }),
    }),
  );
  assert.equal((markup.match(/role="button"/g) || []).length, 1);
  assert.equal((markup.match(/tabindex="0"/g) || []).length, 1);
  assert.ok(markup.includes('aria-haspopup="menu"'));

  const actionMenu = source("src/aiwa/components/ActionMenu.jsx");
  for (const contract of [
    'role="menu"',
    'role="menuitem"',
    'aria-labelledby={triggerId}',
    'id: triggerId',
    'event.key === "Escape"',
    'close(true)',
    'initialFocus.current === "last"',
    'focus?.({ preventScroll: true })',
    'focusRelativeToTrigger(event.shiftKey ? -1 : 1)',
    'actionMenuPageFocusCandidate(element, menuRef.current)',
    'actionMenuRelativeFocusIndex(index, candidates.length, direction)',
    'const PAGE_FOCUS_SELECTOR',
    'trigger.props.onKeyDown?.(event)',
    'trigger.props.onClick?.(event)',
  ]) assert.ok(actionMenu.includes(contract), contract);
});

await check("Calendar marking transfers focus after its menu trigger unmounts", () => {
  const calendar = source("src/aiwa/panels/CalendarPanel.jsx");
  assert.ok(calendar.includes("restoreFocus: false"));
  assert.ok(calendar.includes('pageRef.current?.querySelector(".aiwa-calendar-done")?.focus({ preventScroll: true })'));
  assert.ok(calendar.includes("if (!isOpen || !marking) return;"));
  assert.ok(calendar.includes("ref={pageRef}"));
  assert.ok(calendar.includes('className="aiwa-calendar-done"'));
});

console.log(`\nAIWA Phase 3 UI contracts passed (${passed} focused checks).`);
