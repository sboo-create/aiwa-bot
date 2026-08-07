const FORM_FIELDS_BY_ACTION = {
  profile: ["height", "weight", "age", "cycle_len"],
  preferences: ["diet_note", "kcal_goal"],
  summary: ["send_time", "daily_summary_enabled"],
  "daily-summary": ["daily_summary_enabled"],
  proactive: ["proactive_enabled"],
  mode: ["cycle_len"],
};

export const profileSettingsFormFromData = (data = {}) => ({
  height: String(data.profile?.height || ""),
  weight: String(data.profile?.weight || ""),
  age: String(data.profile?.age || ""),
  cycle_len: String(data.cycle_len || ""),
  diet_note: data.profile?.diet_note || data.diet_note || "",
  kcal_goal: String(data.profile?.kcal_goal || data.kcal_goal || ""),
  send_time: data.send_time || "08:00",
  daily_summary_enabled: data.daily_summary_enabled !== false,
  proactive_enabled: data.proactive_enabled !== false,
});

/** Phase 3 data-only bridge response: `{ data, revision }`. */
export const normalizeProfileSettingsSnapshot = (result) => {
  const data = result?.data || result?.snapshot;
  const revision = Number(result?.revision);
  const hasRevision = result?.revision !== null
    && result?.revision !== undefined
    && result?.revision !== "";
  if (!data || typeof data !== "object" || Array.isArray(data) || !hasRevision || !Number.isFinite(revision)) {
    return null;
  }
  return { data, revision };
};

const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);

/** A mode acknowledgement may stand in for a failed /api/data refresh. */
export const isCompleteModeSettingsData = (data) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) return false;
  const required = [
    "mode", "cycle", "last_period", "cycle_len", "periods", "cycles",
    "past_periods", "stats", "preg", "day", "phase", "days_to_next",
    "days_since", "status", "delay_days",
  ];
  if (!required.every((key) => hasOwn(data, key))) return false;
  if (!Array.isArray(data.periods) || !Array.isArray(data.cycles)
    || !Array.isArray(data.past_periods) || !data.stats
    || typeof data.stats !== "object" || Array.isArray(data.stats)) return false;
  if (["cycle", "irregular"].includes(data.mode)
    && !Array.isArray(data.stats.history)) return false;
  if (data.mode === "preg") {
    return Boolean(data.preg && typeof data.preg === "object"
      && !data.cycle && data.periods.length === 0 && data.cycles.length === 0);
  }
  if (["meno", "none", "male", "fit"].includes(data.mode)) {
    return !data.cycle && data.preg === null
      && data.periods.length === 0 && data.cycles.length === 0;
  }
  return ["cycle", "irregular"].includes(data.mode);
};

/**
 * Prefer a full data-only refresh. If that network read fails after the
 * mutation was acknowledged, reconcile the host's canonical in-memory data
 * from the endpoint receipt instead of claiming success against stale D.
 */
export const syncProfileSettingsSnapshot = async (callBridge, actionKey, receipt) => {
  let refreshed = null;
  try {
    refreshed = await callBridge("reloadSettingsData");
  } catch {
    refreshed = null;
  }
  const canonical = normalizeProfileSettingsSnapshot(refreshed);
  if (canonical && (actionKey !== "mode" || isCompleteModeSettingsData(canonical.data))) {
    return canonical;
  }

  let reconciled = null;
  try {
    reconciled = await callBridge("applySettingsMutationReceipt", actionKey, receipt);
  } catch {
    reconciled = null;
  }
  const receiptSnapshot = normalizeProfileSettingsSnapshot(reconciled);
  if (receiptSnapshot && actionKey === "mode"
    && !isCompleteModeSettingsData(receiptSnapshot.data)) return null;
  return receiptSnapshot;
};

export const reconcileProfileSettingsForm = ({
  current,
  data,
  actionKey,
  draftVersion,
  submittedDraftVersion,
}) => {
  if (draftVersion !== submittedDraftVersion) return current;
  const fields = FORM_FIELDS_BY_ACTION[actionKey] || [];
  if (!fields.length) return current;
  const canonical = profileSettingsFormFromData(data);
  return {
    ...current,
    ...Object.fromEntries(fields.map((field) => [field, canonical[field]])),
  };
};
