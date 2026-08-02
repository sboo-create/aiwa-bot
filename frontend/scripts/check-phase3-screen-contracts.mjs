import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  createFoodMutationOrder,
  foodDayReadFallback,
  foodDiaryForIso,
  mergeTodayDiaryReceipt,
  pruneStaleFoodDayAssets,
  resolveFoodDayEntry,
  retireStaleFoodDayAssets,
} from "../src/aiwa/lib/foodDayCache.js";
import {
  mergeWorkoutReceipt,
  workoutDayCount,
  workoutDayEntry,
  workoutReceiptEntry,
  workoutHeroForDay,
} from "../src/aiwa/screens/ActivityScreen.jsx";
import { workoutRequestForPayload } from "../src/aiwa/panels/WorkoutPanel.jsx";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = (path) => readFileSync(resolve(root, path), "utf8");
let passed = 0;

const check = async (name, run) => {
  await run();
  passed += 1;
  console.log(`✓ ${name}`);
};

await check("Food retires stale image assets for every explicit day", () => {
  const entries = {
    "2026-07-01": { status: "loaded", assetRevision: 10, diary: { meals: [{ id: 1 }] } },
    "2026-07-02": { status: "loaded", diary: { asset_revision: 11, meals: [{ id: 2 }] } },
    "2026-07-03": { status: "loading", diary: null },
  };
  assert.deepEqual(Object.keys(pruneStaleFoodDayAssets(entries, 11)).sort(), [
    "2026-07-02",
    "2026-07-03",
  ]);
  const retired = retireStaleFoodDayAssets(entries, 12, ["2026-07-04"]);
  assert.deepEqual(retired.stale.sort(), [
    "2026-07-01",
    "2026-07-02",
    "2026-07-04",
  ]);
  const recent = { "2026-07-04": { date: "2026-07-04", meals: [{ id: 4 }] } };
  assert.deepEqual(resolveFoodDayEntry({
    iso: "2026-07-04",
    today: "2026-07-05",
    diary: {},
    recent,
    explicit: retired.entries,
  }), { status: "loading", diary: null });
  const currentDiary = {
    date: "2026-07-05",
    asset_revision: 11,
    meals: [],
    recent: { "2026-07-04": recent["2026-07-04"] },
  };
  const merged = mergeTodayDiaryReceipt(currentDiary, {
    date: "2026-07-05",
    asset_revision: 12,
    meals: [{ id: 5 }],
  });
  assert.equal(merged.asset_revision, 11);
  assert.equal(merged.recent["2026-07-04"].meals[0].id, 4);
  assert.deepEqual(resolveFoodDayEntry({
    iso: "2026-07-04",
    today: "2026-07-05",
    diary: merged,
    recent: merged.recent,
    explicit: {
      "2026-07-04": {
        status: "error",
        diary: null,
        requiredAssetRevision: 12,
        assetRevision: 12,
      },
    },
    diaryAssetRevision: merged.asset_revision,
  }), { status: "error", diary: null });
  const food = source("src/aiwa/screens/FoodScreen.jsx");
  assert.ok(food.includes("invalidateDayAssetCache(revision)"));
  assert.ok(food.includes("invalidateDayAssetCache(canonicalAssetRevision)"));
  assert.ok(food.includes("invalidateDayAssetCache(receiptAssetRevision)"));
  assert.ok(food.includes("invalidateDayAssetCache(observedRevision)"));
  assert.ok(food.includes("mergeTodayDiaryReceipt(data.diary, canonicalReceipt)"));
  assert.ok(food.includes('explicit?.status === "stale-assets"'));
});

await check("Food trusts only a canonical receipt for its declared day", () => {
  const diary = { date: "2026-07-01", meals: [{ id: 9 }] };
  assert.equal(foodDiaryForIso({ ok: true, date: "2026-07-01", diary }, "2026-07-02"), null);
  assert.equal(foodDiaryForIso({ ok: true, date: "2026-07-01", diary }, "2026-07-01"), diary);
  assert.equal(foodDiaryForIso({ ok: true, date: "2026-07-02", diary }, "2026-07-02"), null);
  const food = source("src/aiwa/screens/FoodScreen.jsx");
  assert.ok(food.includes("const canonicalReceipt = receipt && Array.isArray(receipt.meals)"));
  assert.ok(food.includes("const result = await fn(file);"));
});

await check("Food ignores reverse-settled edit/delete receipts when revalidation fails", () => {
  const today = "2026-08-01";
  const past = "2026-07-31";
  const todayOrder = createFoodMutationOrder();
  const oldToday = todayOrder.begin();
  const newToday = todayOrder.begin();
  let visibleToday = {
    date: today,
    asset_revision: 8,
    recent: {},
    meals: [{ id: 1, title: "До" }],
  };
  const latestToday = { date: today, meals: [{ id: 1, title: "После" }] };
  const staleToday = { date: today, meals: [{ id: 1, title: "Старый ответ" }] };
  if (todayOrder.accept(today, newToday)) {
    visibleToday = mergeTodayDiaryReceipt(visibleToday, latestToday);
  }
  if (todayOrder.accept(today, oldToday)) {
    visibleToday = mergeTodayDiaryReceipt(visibleToday, staleToday);
  }
  assert.equal(visibleToday.meals[0].title, "После");

  const pastOrder = createFoodMutationOrder();
  const oldPast = pastOrder.begin();
  const newPast = pastOrder.begin();
  let visiblePast = {
    status: "loaded",
    diary: { date: past, meals: [{ id: 2, title: "Новый receipt" }] },
  };
  assert.equal(pastOrder.accept(past, newPast), true);
  assert.equal(pastOrder.accept(past, oldPast), false);
  visiblePast = foodDayReadFallback(
    visiblePast,
    true,
    { status: "error", diary: null },
  );
  assert.equal(visiblePast.diary.meals[0].title, "Новый receipt");

  const food = source("src/aiwa/screens/FoodScreen.jsx");
  assert.ok(food.includes("const mutationToken = mutationOrder.current.begin()"));
  assert.ok(food.includes("token: mutationOrder.current.begin()"));
  assert.ok(food.includes("const receiptIsCurrent = !orderedMutation"));
  assert.ok(food.includes("preserveSelected = !receiptIsCurrent && receiptIso === selectedIso"));
});

await check("Activity cache misses expose the selected-day loading hero", () => {
  const hero = workoutHeroForDay({
    iso: "2026-07-31",
    today: "2026-08-01",
    status: "loading",
    count: null,
    weekCount: 7,
  });
  assert.equal(hero.value, "…");
  assert.match(hero.label, /Загружаю тренировки/);
  assert.equal(hero.label.includes("на этой неделе"), false);
  assert.deepEqual(workoutHeroForDay({
    iso: "2026-07-31",
    today: "2026-08-01",
    status: "error",
    count: null,
    weekCount: 7,
  }), { value: "—", label: "Данные за этот день недоступны" });
});

await check("Activity keeps the canonical saved workout when refresh fails", () => {
  const old = [{ id: 1, type: "Ходьба" }, { id: 2, type: "Своё" }];
  const canonical = { id: 2, date: "2026-07-31", type: "Сквош" };
  assert.deepEqual(mergeWorkoutReceipt(old, canonical), [old[0], canonical]);
  assert.deepEqual(workoutReceiptEntry({ status: "loading", workouts: [] }, canonical), {
    status: "partial",
    workouts: [canonical],
    message: "Тренировка сохранена, но день загрузился не полностью. Нажми, чтобы обновить.",
  });
  const activity = source("src/aiwa/screens/ActivityScreen.jsx");
  assert.ok(activity.includes("receiptEntry || {"));
  assert.ok(activity.includes("mutation?.workout"));
  assert.ok(activity.includes('selectedDay?.status === "partial"'));
});

await check("Workout retries reuse one durable request id until acknowledgement", () => {
  let sequence = 0;
  const makeId = () => `request-${++sequence}`;
  const payload = {
    date: "2026-07-23",
    type: "Пилатес",
    duration: "45 мин",
    rpe: "Нормально",
    items: [],
  };
  const first = workoutRequestForPayload(null, payload, makeId);
  const retry = workoutRequestForPayload(first, { ...payload }, makeId);
  const changed = workoutRequestForPayload(first, { ...payload, duration: "60+ мин" }, makeId);
  assert.equal(retry.id, first.id);
  assert.notEqual(changed.id, first.id);
  assert.equal(sequence, 2);

  const panel = source("src/aiwa/panels/WorkoutPanel.jsx");
  assert.ok(panel.includes("request_id: requestRef.current.id"));
  assert.ok(panel.includes("requestRef.current = workoutRequestForPayload"));
  assert.ok(panel.includes("setReview({ text: result.review"));
  assert.ok(panel.indexOf("requestRef.current = null;", panel.indexOf("setReview({ text: result.review")) > -1);
});

await check("Activity explicit day cache wins over stale week counters", () => {
  const iso = "2026-07-31";
  const canonicalRows = [
    { id: 1, date: iso, type: "Ходьба" },
    { id: 2, date: iso, type: "Пилатес" },
  ];
  const loaded = { status: "loaded", workouts: canonicalRows };
  const partial = { status: "partial", workouts: canonicalRows, message: "Обнови день" };

  assert.equal(workoutDayEntry({
    iso,
    week: [{ d: iso, count: 0 }],
    explicit: { [iso]: loaded },
  }), loaded);
  assert.equal(workoutDayCount({
    iso,
    week: [{ d: iso, count: 0 }],
    explicit: { [iso]: loaded },
  }), 2);
  assert.equal(workoutDayEntry({
    iso,
    week: [{ d: iso, count: 1 }],
    explicit: { [iso]: partial },
  }), partial);
  assert.equal(workoutDayCount({
    iso,
    week: [{ d: iso, count: 1 }],
    explicit: { [iso]: partial },
  }), 2);

  assert.deepEqual(workoutDayEntry({ iso, week: [{ d: iso, count: 0 }] }), {
    status: "loaded",
    workouts: [],
  });
  assert.equal(workoutDayCount({ iso, week: [{ d: iso, count: 1 }] }), 1);

  const activity = source("src/aiwa/screens/ActivityScreen.jsx");
  assert.ok(activity.includes("workoutDayEntry({ iso, week, explicit: dayWorkouts })"));
  assert.ok(activity.includes("workoutDayCount({ iso, week, explicit: dayWorkouts })"));
});

await check("Storybook past Food and Workout fixtures are deterministic", () => {
  const stories = source("src/storybook/pages.jsx");
  const pastStart = stories.indexOf('isOpen={open === "foodDiaryPast"}');
  const pastEnd = stories.indexOf("/>", pastStart);
  const pastDiary = stories.slice(pastStart, pastEnd);
  assert.equal(pastDiary.includes("onReco"), false);
  const workoutStart = stories.indexOf("<WorkoutPanel", pastEnd);
  const workoutEnd = stories.indexOf("/>", workoutStart);
  const workout = stories.slice(workoutStart, workoutEnd);
  assert.ok(workout.includes('initialDate="2026-07-23"'));
  assert.ok(workout.includes('today="2026-07-23"'));
});

console.log(`\nAIWA Phase 3 screen contracts passed (${passed} focused checks).`);
