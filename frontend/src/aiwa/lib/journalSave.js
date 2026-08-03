const CUSTOM_PREFIX = "custom:";

const uniqueStrings = (values) => [...new Set(
  values
    .map((value) => String(value || "").trim())
    .filter(Boolean),
)];

/**
 * Build the absolute, date-bound journal state accepted by aiwaSaveJournal.
 * Existing custom symptoms live in the canonical symptoms array as
 * `custom:<text>`; the free-text field appends one more value without turning
 * the atomic endpoint back into an incremental "add" operation.
 */
export function buildJournalSavePayload({
  date,
  energy,
  mood,
  symptoms = [],
  custom = "",
  intimacy,
  period,
  includePeriod = false,
}) {
  const symptomCodes = uniqueStrings(symptoms);
  const standardSymptoms = symptomCodes.filter((code) => !code.startsWith(CUSTOM_PREFIX));
  const customSymptoms = symptomCodes
    .filter((code) => code.startsWith(CUSTOM_PREFIX))
    .map((code) => code.slice(CUSTOM_PREFIX.length));
  if (String(custom || "").trim()) customSymptoms.push(String(custom).trim());

  return {
    date,
    energy: Number(energy) || 0,
    mood: Number(mood) || 0,
    symptoms: standardSymptoms,
    custom_symptoms: uniqueStrings(customSymptoms),
    intimacy: Boolean(intimacy),
    ...(includePeriod ? { period: Boolean(period) } : {}),
  };
}

/**
 * Closing and reopening the same date adopts the in-flight absolute save: its
 * target cannot change, and the visible session must receive its outcome. A
 * different selected date never receives another day's success or error.
 */
export function isJournalSaveSessionCurrent({
  isOpen,
  currentGeneration,
  startedGeneration,
  currentDate,
  targetDate,
}) {
  return Boolean(isOpen && currentDate === targetDate && (
    currentGeneration === startedGeneration
    || currentGeneration > startedGeneration
  ));
}
