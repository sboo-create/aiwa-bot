import { aiwaTodayIso } from "./dates";

let pendingManual = null;
const pendingDeletes = new Map();
const EXPIRED_MANUAL_TARGETS = new Set([
  "date_out_of_range",
  "food_target_expired",
  "target_expired",
]);

const requestId = (prefix) => (
  globalThis.crypto?.randomUUID?.()
  || `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
);

const manualFingerprint = (payload) => JSON.stringify({
  title: String(payload?.title || "").trim(),
  kcal: String(payload?.kcal ?? "").trim(),
  protein: String(payload?.protein ?? "").trim(),
  fat: String(payload?.fat ?? "").trim(),
  carbs: String(payload?.carbs ?? "").trim(),
  grams: String(payload?.grams ?? "").trim(),
  slot: String(payload?.slot || ""),
});

const isoDayNumber = (iso) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(iso || ""))) return null;
  const parsed = Date.parse(`${iso}T00:00:00Z`);
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString().slice(0, 10) !== iso) return null;
  return Math.floor(parsed / 86400000);
};

/** The manual-food API accepts a frozen target for Moscow today or yesterday. */
export const manualFoodTargetIsReplayable = (target, today = aiwaTodayIso()) => {
  const targetDay = isoDayNumber(target);
  const todayDay = isoDayNumber(today);
  if (targetDay === null || todayDay === null) return false;
  const age = todayDay - targetDay;
  return age >= 0 && age <= 1;
};

export const manualFoodResponseExpiresTarget = (result) => (
  EXPIRED_MANUAL_TARGETS.has(result?.error)
);

/** Keep one manual-food gesture stable across failure, close and panel remount. */
export const manualFoodRequestForPayload = (
  payload,
  today = aiwaTodayIso(),
  makeId = () => requestId("food-manual"),
) => {
  const fingerprint = manualFingerprint(payload);
  if (
    !pendingManual
    || pendingManual.fingerprint !== fingerprint
    || !manualFoodTargetIsReplayable(pendingManual.date, today)
  ) {
    pendingManual = { fingerprint, id: makeId(), date: today };
  }
  return pendingManual;
};

export const completeManualFoodRequest = (id) => {
  if (pendingManual?.id === id) pendingManual = null;
};

/** Retire an uncommitted target rejected by the server without touching newer work. */
export const retireManualFoodRequest = (id) => {
  if (pendingManual?.id === id) pendingManual = null;
};

/** Deleting one immutable meal id is one durable gesture until acknowledged. */
export const foodDeleteRequestForMeal = (
  mealId,
  makeId = () => requestId("food-delete"),
) => {
  const key = String(mealId);
  if (!pendingDeletes.has(key)) pendingDeletes.set(key, makeId());
  return pendingDeletes.get(key);
};

export const completeFoodDeleteRequest = (mealId, id) => {
  const key = String(mealId);
  if (pendingDeletes.get(key) === id) pendingDeletes.delete(key);
};

export const resetFoodMutationRequestsForTests = () => {
  pendingManual = null;
  pendingDeletes.clear();
};
