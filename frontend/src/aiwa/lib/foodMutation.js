import { aiwaTodayIso } from "./dates";

let pendingManual = null;
const pendingDeletes = new Map();

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

/** Keep one manual-food gesture stable across failure, close and panel remount. */
export const manualFoodRequestForPayload = (
  payload,
  today = aiwaTodayIso(),
  makeId = () => requestId("food-manual"),
) => {
  const fingerprint = manualFingerprint(payload);
  if (!pendingManual || pendingManual.fingerprint !== fingerprint) {
    pendingManual = { fingerprint, id: makeId(), date: today };
  }
  return pendingManual;
};

export const completeManualFoodRequest = (id) => {
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
