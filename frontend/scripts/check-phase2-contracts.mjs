import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ActionMenu } from "../src/aiwa/components/ActionMenu.jsx";
import { AiwaButton } from "../src/aiwa/components/AiwaButton.jsx";
import { PaperRow } from "../src/aiwa/components/PaperRow.jsx";
import { createCacheCoordinator, isSuccessfulCachePayload } from "../src/aiwa/lib/cacheCoordinator.js";
import { isCalendarDaySelectable } from "../src/aiwa/lib/calendarDay.js";
import { acknowledgedHostWrite, call } from "../src/aiwa/lib/api.js";
import { foodDiaryForIso, optimisticFoodEdit, resolveFoodDayEntry } from "../src/aiwa/lib/foodDayCache.js";
import { normalizeProfileSettingsSnapshot, reconcileProfileSettingsForm } from "../src/aiwa/lib/profileSettings.js";
import { requestReportOnce, subscribeToReportRequest } from "../src/aiwa/lib/reportRequest.js";
import { isWorkoutDateWritable, workoutWritableStart } from "../src/aiwa/panels/WorkoutPanel.jsx";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = (path) => readFileSync(resolve(root, path), "utf8");
let passed = 0;

const check = async (name, run) => {
  await run();
  passed += 1;
  console.log(`✓ ${name}`);
};

globalThis.window = {};

await check("Food accepts only the requested response date", () => {
  assert.equal(foodDiaryForIso({ date: "2026-08-01", meals: [] }, "2026-07-31"), null);
  assert.equal(foodDiaryForIso({ error: "net" }, "2026-07-31"), null);
  assert.deepEqual(foodDiaryForIso({ date: "2026-07-31", meals: [] }, "2026-07-31")?.meals, []);
});

await check("Food cache freshness keeps the newest valid day", () => {
  const iso = "2026-07-31";
  const recent = { date: iso, meals: [{ id: "canonical" }] };
  const explicit = { status: "loaded", diary: { date: iso, meals: [] }, canonicalVersion: 2 };
  assert.equal(resolveFoodDayEntry({
    iso,
    today: "2026-08-01",
    diary: {},
    recent: { [iso]: recent },
    explicit: { [iso]: explicit },
    canonicalVersion: 2,
  }).diary, explicit.diary);
  assert.equal(resolveFoodDayEntry({
    iso,
    today: "2026-08-01",
    diary: {},
    recent: { [iso]: recent },
    explicit: { [iso]: explicit },
    canonicalVersion: 3,
  }).diary, recent);
  for (const status of ["loading", "error"]) {
    assert.equal(resolveFoodDayEntry({
      iso,
      today: "2026-08-01",
      diary: {},
      recent: { [iso]: recent },
      explicit: { [iso]: { status, diary: null } },
      canonicalVersion: 3,
    }).diary, recent);
  }
});

await check("Food title edits cannot retain artwork for another dish", () => {
  const edited = optimisticFoodEdit({
    id: 7,
    title: "Каша",
    image_url: "/old.jpg",
    image_source: "generated",
    asset_state: "ready",
    canonical_id: "porridge",
    fclass: "блюдо",
  }, { title: "Чай", kcal: "12" });
  assert.equal(edited.id, 7);
  assert.equal(edited.title, "Чай");
  for (const key of ["image_url", "image_source", "asset_state", "canonical_id", "fclass"]) {
    assert.equal(key in edited, false, `${key} must be cleared`);
  }
});

await check("Food requests capture the canonical clock before starting", () => {
  const food = source("src/aiwa/screens/FoodScreen.jsx");
  const capture = food.indexOf("const requestCanonicalVersion = canonicalVersion.current;");
  const request = food.indexOf('apiCall("/api/diary", { d: iso })', capture);
  assert.ok(capture >= 0 && request > capture);
  assert.ok(food.includes("canonicalVersion: requestCanonicalVersion"));
});

await check("Screen cache rejects late reads, reverse force order, and error payloads", () => {
  const coordinator = createCacheCoordinator();
  const oldRead = coordinator.begin("diary");
  const patch = coordinator.begin("diary");
  assert.equal(coordinator.isCurrent("diary", oldRead), false);
  assert.equal(coordinator.isCurrent("diary", patch), true);

  const firstForce = coordinator.begin("train");
  const secondForce = coordinator.begin("train");
  assert.equal(coordinator.isCurrent("train", firstForce), false);
  assert.equal(coordinator.isCurrent("train", secondForce), true);
  assert.equal(isSuccessfulCachePayload({ error: "net" }), false);
  assert.equal(isSuccessfulCachePayload({ meals: [] }), true);

  const screenData = source("src/aiwa/lib/screenData.js");
  assert.match(screenData, /const generation = coordinator\.begin\(key\);[\s\S]*REQUESTS\[key\]\(\)/);
  assert.ok(screenData.includes("if (coordinator.isCurrent(key, generation))"));
  assert.match(screenData, /const patch = useCallback[\s\S]*coordinator\.begin\(key\);/);
  for (const screen of ["FoodScreen.jsx", "ActivityScreen.jsx"]) {
    assert.ok(source(`src/aiwa/screens/${screen}`).includes("screenErrors"));
  }
});

await check("Workout writes use the selected day inside the 90-day Moscow window", () => {
  assert.equal(workoutWritableStart("2026-08-01"), "2026-05-03");
  assert.equal(isWorkoutDateWritable("2026-05-03", "2026-08-01"), true);
  assert.equal(isWorkoutDateWritable("2026-05-02", "2026-08-01"), false);
  assert.equal(isWorkoutDateWritable("2026-08-02", "2026-08-01"), false);
  const workout = source("src/aiwa/panels/WorkoutPanel.jsx");
  const activity = source("src/aiwa/screens/ActivityScreen.jsx");
  assert.ok(workout.includes("await onSaved?.({"));
  assert.ok(workout.includes("requestedDate: date"));
  assert.ok(activity.includes("initialDate={selectedIso}"));
  assert.ok(activity.includes("activeDayRequests.current[mutationDate]"));
  assert.ok(activity.includes("onClick={viewingPast ? undefined"));
});

await check("Calendar rejects future and disabled days in every marking mode", () => {
  const today = "2026-08-01";
  assert.equal(isCalendarDaySelectable({ iso: today }, today), true);
  assert.equal(isCalendarDaySelectable({ iso: "2026-08-02" }, today), false);
  assert.equal(isCalendarDaySelectable({ iso: today, disabled: true }, today), false);
  const calendar = source("src/aiwa/panels/CalendarPanel.jsx");
  assert.ok(calendar.includes("const todayIso = aiwaTodayIso();"));
  assert.ok(calendar.includes("if (!isCalendarDaySelectable(day, todayIso)) return;"));
  assert.ok(calendar.includes("interactive={isCalendarDaySelectable(day, todayIso)}"));
});

await check("Journal closes only after explicit acknowledgement and current-day completion", async () => {
  window.returnPromise = () => Promise.resolve("host-result");
  assert.equal(await call("returnPromise"), "host-result");
  window.goodWrite = async () => ({ ok: true });
  assert.deepEqual(await acknowledgedHostWrite("goodWrite"), { ok: true });
  window.legacyWrite = async () => undefined;
  await assert.rejects(() => acknowledgedHostWrite("legacyWrite"), /подтвердить сохранение/);
  window.failedWrite = async () => ({ error: "net" });
  await assert.rejects(() => acknowledgedHostWrite("failedWrite"));

  const journal = source("src/aiwa/panels/JournalPanel.jsx");
  const dayLog = source("src/aiwa/panels/CalendarDayLogPanel.jsx");
  for (const panel of [journal, dayLog]) {
    assert.equal((panel.match(/acknowledgedHostWrite\("aiwaSaveJournal"/g) || []).length, 1);
    for (const legacyMethod of ["setCheckin", "setDayCheckin", "toggleSym", "toggleDaySym", "markPA"]) {
      assert.equal(panel.includes(`acknowledgedHostWrite("${legacyMethod}"`), false, legacyMethod);
    }
  }
  assert.ok(journal.includes("[isOpen, saveRevision, selectedDate, sourceCheckin]"));
  assert.ok(journal.includes("currentDate: currentDay.current"));
  assert.ok(journal.includes("targetDate: operation.dayIso"));
  assert.ok(dayLog.includes("currentDate: currentIso.current"));
  assert.ok(dayLog.includes("targetDate: operation.iso"));
});

await check("Reports are single-flight across Profile and History", async () => {
  let finish;
  let requests = 0;
  window.aiwaApi = () => {
    requests += 1;
    return new Promise((resolveRequest) => { finish = resolveRequest; });
  };
  const busy = [];
  const unsubscribe = subscribeToReportRequest((value) => busy.push(value));
  const first = requestReportOnce("3");
  const second = requestReportOnce("all");
  assert.equal(first.owner, true);
  assert.equal(second.owner, false);
  assert.equal(first.promise, second.promise);
  assert.equal(requests, 0, "request starts in the next microtask");
  await Promise.resolve();
  assert.equal(requests, 1);
  finish({ ok: true, delivered: true });
  await first.promise;
  unsubscribe();
  assert.deepEqual(busy, [false, true, false]);
});

await check("Profile settings use forward atomic and non-navigating contracts", () => {
  const profile = source("src/aiwa/panels/ProfilePanel.jsx");
  const settings = source("src/aiwa/lib/profileSettings.js");
  const history = source("src/aiwa/sections/SymptomHistorySection.jsx");
  assert.equal(profile.includes('call("reloadAfterEdit"'), false);
  assert.equal(settings.includes('callBridge("reloadAfterEdit"'), false);
  assert.equal((settings.match(/callBridge\("reloadSettingsData"\)/g) || []).length, 1);
  assert.equal((settings.match(/callBridge\("applySettingsMutationReceipt"/g) || []).length, 1);
  assert.equal((profile.match(/apiCall\("\/api\/settime"/g) || []).length, 1);
  assert.ok(profile.includes("daily_summary_enabled: dailySummaryEnabled"));
  assert.ok(profile.includes("result.daily_summary_enabled === dailySummaryEnabled"));
  assert.equal(profile.includes("Cell.Switch"), false);
  assert.ok(profile.includes('<div role="radiogroup" aria-label="Утренняя сводка">'));
  assert.ok(profile.includes('updateDraft("send_time", value)'));
  assert.ok(profile.includes("disabled={actionLocked}"));
  assert.equal(history.includes('apiCall("/api/report"'), false);
  assert.ok(history.includes("requestReportOnce"));

  const canonical = normalizeProfileSettingsSnapshot({
    data: { send_time: "09:15", daily_summary_enabled: false },
    revision: 4,
  });
  assert.equal(canonical.revision, 4);
  assert.deepEqual(reconcileProfileSettingsForm({
    current: { send_time: "08:00", daily_summary_enabled: true, diet_note: "draft" },
    data: canonical.data,
    actionKey: "summary",
    draftVersion: 7,
    submittedDraftVersion: 7,
  }), { send_time: "09:15", daily_summary_enabled: false, diet_note: "draft" });
  const editedWhileBusy = { send_time: "10:30", daily_summary_enabled: true };
  assert.equal(reconcileProfileSettingsForm({
    current: editedWhileBusy,
    data: canonical.data,
    actionKey: "summary",
    draftVersion: 8,
    submittedDraftVersion: 7,
  }), editedWhileBusy);
});

await check("Touched action rows have one valid keyboard target per action", () => {
  const actionMenu = renderToStaticMarkup(
    React.createElement(ActionMenu, {
      items: [],
      trigger: React.createElement(AiwaButton, { label: "Добавить", onClick: () => {} }),
    }),
  );
  assert.equal((actionMenu.match(/role="button"/g) || []).length, 1);
  assert.equal((actionMenu.match(/tabindex="0"/g) || []).length, 1);
  assert.ok(actionMenu.includes('aria-haspopup="menu"'));

  const mealRow = renderToStaticMarkup(
    React.createElement(PaperRow, {
      title: "Каша",
      description: "320 ккал",
      onClick: () => {},
      separateAction: true,
      actionLabel: "Изменить кашу, 320 ккал",
      trailing: React.createElement("button", { type: "button" }, "Удалить"),
    }),
  );
  const firstClose = mealRow.indexOf("</button>");
  const secondOpen = mealRow.indexOf("<button", mealRow.indexOf("<button") + 1);
  assert.ok(firstClose >= 0 && secondOpen > firstClose, mealRow);
  assert.equal(mealRow.includes("<button><button"), false);
});

await check("Storybook uses canonical lightweight fixtures", () => {
  const stories = source("src/storybook/pages.jsx");
  assert.ok(stories.includes('from "../../../assets/paper-profile.jpg"'));
  assert.ok(stories.includes('from "../../../webapp2/assets/food/meal-placeholder.svg"'));
  for (const scenario of ["recipe", "recipeLoading", "recipeError", "journalPast", "foodDiaryPast"]) {
    assert.ok(stories.includes(`\"${scenario}\"`), scenario);
  }
});

console.log(`\nAIWA Phase 2 contracts passed (${passed} focused checks).`);
