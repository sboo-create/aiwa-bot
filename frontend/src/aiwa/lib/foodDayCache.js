const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object || {}, key);

/** Reject a different declared day; legacy host fixtures may omit `date`. */
export const foodDiaryForIso = (result, iso) => {
  if (!result || hasOwn(result, "error")) return null;
  const receipt = result.diary && typeof result.diary === "object" ? result.diary : result;
  const envelopeIso = String(result.date ?? "").trim();
  const diaryIso = String(receipt.date ?? "").trim();
  if (envelopeIso && diaryIso && envelopeIso !== diaryIso) return null;
  const responseIso = envelopeIso || diaryIso;
  if (responseIso && responseIso !== iso) return null;
  return responseIso && !receipt.date ? { ...receipt, date: responseIso } : receipt;
};

export const foodDayAssetRevision = (entry) => Number(
  entry?.assetRevision ?? entry?.diary?.asset_revision ?? 0,
);

/**
 * Client mutations can finish out of order even though every receipt contains
 * a complete day snapshot. The token is allocated before the request starts;
 * once a newer token has been accepted for a day, an older late receipt may
 * revalidate that day but must never replace the accepted snapshot.
 */
export const createFoodMutationOrder = () => {
  let sequence = 0;
  const accepted = new Map();
  return {
    begin: () => {
      sequence += 1;
      return sequence;
    },
    accept: (iso, token) => {
      const value = Number(token);
      if (!iso || !Number.isSafeInteger(value) || value <= 0) return true;
      const latest = accepted.get(iso) || 0;
      if (value < latest) return false;
      accepted.set(iso, value);
      return true;
    },
  };
};

/** Preserve an authoritative receipt when its follow-up read is unavailable. */
export const foodDayReadFallback = (preserved, preserveLoadedOnError, terminalError) => (
  preserveLoadedOnError && preserved?.status === "loaded" ? preserved : terminalError
);

/**
 * An asset revision is global, while explicit diaries are cached per day.
 * Retire every older explicit entry so revisiting that day must read its new
 * canonical image_url/asset_state instead of keeping a stale generated image.
 */
export const pruneStaleFoodDayAssets = (entries = {}, revision = 0) => Object.fromEntries(
  Object.entries(entries).filter(([, entry]) => (
    entry?.status !== "loaded" || foodDayAssetRevision(entry) >= Number(revision || 0)
  )),
);

/**
 * Keep an explicit stale marker instead of falling back to an older
 * `diary.recent` snapshot after a global image revision advances. Extra ISO
 * values cover recent days that did not yet need their own direct cache row.
 */
export const retireStaleFoodDayAssets = (entries = {}, revision = 0, extraIsos = []) => {
  const retained = pruneStaleFoodDayAssets(entries, revision);
  const stale = new Set([
    ...Object.keys(entries).filter((iso) => !hasOwn(retained, iso)),
    ...extraIsos,
  ]);
  for (const iso of [...stale]) {
    const current = entries[iso];
    if (current?.status === "loaded" && foodDayAssetRevision(current) >= Number(revision || 0)) {
      stale.delete(iso);
      continue;
    }
    retained[iso] = {
      status: "stale-assets",
      diary: null,
      assetRevision: Number(revision || 0),
      requiredAssetRevision: Number(revision || 0),
    };
  }
  return { entries: retained, stale: [...stale] };
};

/** A one-day receipt cannot certify that the retained `recent` snapshot uses
 * the same global image revision. Keep its proof revision unchanged until a
 * full `/api/diary` read replaces the whole object. */
export const mergeTodayDiaryReceipt = (current = {}, receipt = {}) => {
  const dayReceipt = { ...receipt };
  delete dayReceipt.asset_revision;
  delete dayReceipt.recent;
  return {
    ...current,
    ...dayReceipt,
    asset_revision: current.asset_revision,
    recent: current.recent || {},
  };
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
  diaryAssetRevision = 0,
}) => {
  if (iso === today) return { status: "loaded", diary };
  const cached = hasOwn(explicit, iso) ? explicit[iso] : null;
  const requestedDiary = hasOwn(recent, iso) ? foodDiaryForIso(recent[iso], iso) : null;

  // A newer global asset revision retires the canonical `recent` image URLs
  // too. Preserve that requirement through loading/error; a failed direct read
  // must not revive the stale snapshot. Once the canonical diary snapshot
  // catches up, its recent entry becomes valid again.
  const requiredAssetRevision = Number(cached?.requiredAssetRevision || 0);
  if (requiredAssetRevision > Number(diaryAssetRevision || 0)
      && cached?.status !== "loaded") {
    return {
      status: cached?.status === "stale-assets" ? "loading" : cached?.status,
      diary: null,
    };
  }

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
