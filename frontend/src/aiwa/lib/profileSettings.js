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
