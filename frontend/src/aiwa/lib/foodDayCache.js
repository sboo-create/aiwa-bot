const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object || {}, key);

/** Reject a different declared day; legacy host fixtures may omit `date`. */
export const foodDiaryForIso = (result, iso) => {
  if (!result || hasOwn(result, "error")) return null;
  const responseIso = String(result.date ?? "").trim();
  return !responseIso || responseIso === iso ? result : null;
};

/** Build a safe optimistic edit while the canonical meal is revalidated. */
export const optimisticFoodEdit = (meal, form) => {
  const next = { ...(meal || {}), ...(form || {}) };
  const before = String(meal?.title || "").trim().toLocaleLowerCase("ru-RU");
  const after = String(form?.title || "").trim().toLocaleLowerCase("ru-RU");
  if (before === after) return next;
  for (const key of Object.keys(next)) {
    if (key === "image" || key === "fclass" || key === "content_hash" || key === "style_version"
        || key.startsWith("image_") || key.startsWith("asset_") || key.startsWith("canonical_")) {
      delete next[key];
    }
  }
  return next;
};

/**
 * Resolve one Food day without allowing the initial `diary.recent` snapshot to
 * overwrite a later explicit refetch. The latter is authoritative after an
 * edit/delete and may intentionally contain an empty meals array.
 */
export const resolveFoodDayEntry = ({
  iso,
  today,
  diary,
  recent = {},
  explicit = {},
  canonicalVersion = 0,
}) => {
  if (iso === today) return { status: "loaded", diary };
  const cached = hasOwn(explicit, iso) ? explicit[iso] : null;
  const requestedDiary = hasOwn(recent, iso) ? foodDiaryForIso(recent[iso], iso) : null;

  // Only a successful explicit response captured against this canonical
  // snapshot may override `recent`. Loading/error sentinels never blank valid
  // data, and a later canonical snapshot retires an older explicit response.
  if (cached?.status === "loaded"
      && (!requestedDiary || Number(cached.canonicalVersion ?? -1) >= canonicalVersion)) {
    return cached;
  }
  if (requestedDiary) return { status: "loaded", diary: requestedDiary };
  if (hasOwn(recent, iso)) {
    return { status: "error", diary: null };
  }
  if (cached) return cached;
  return { status: "loading", diary: null };
};
