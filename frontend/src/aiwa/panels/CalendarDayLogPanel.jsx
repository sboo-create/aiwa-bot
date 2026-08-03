import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SectionList } from "../lib/tma";
import { AiwaButton } from "../components/AiwaButton";
import { AiwaModalView } from "../components/AiwaModalView";
import { AiwaPanelHeader } from "../components/AiwaPanelHeader";
import { JournalToggle } from "../components/JournalToggle";
import { JournalChoiceGroup } from "../components/JournalChoiceGroup";
import { JournalSymptomGroup } from "../components/JournalSymptomGroup";
import { JournalCustomSymptom } from "../components/JournalCustomSymptom";
import { JOURNAL_ENERGY_OPTIONS, JOURNAL_MOOD_OPTIONS, JOURNAL_SYMPTOM_GROUPS } from "../lib/constants";
import { acknowledgedHostWrite, actionProps, read, showToast } from "../lib/api";
import { buildJournalSavePayload } from "../lib/journalSave";
import {
  consumeCalendarDayLogSaveCompletion,
  getCalendarDayLogSaveState,
  requestCalendarDayLogSave,
  subscribeToCalendarDayLogSave,
} from "../lib/calendarDayLogSave";

/**
 * Day log for an arbitrary calendar day, shown as a @deslop/tma ModalView bottom
 * sheet over the calendar page. Safe as a ModalView because the calendar itself is
 * a plain page, not a ModalView — so only one sheet is ever open. Like the today
 * journal, the fields are a local draft that «Сохранить» flushes to the host.
 *
 * `showIntimacy` is off when the calendar opens the sheet from the «Симптомы»
 * chip: близость has its own chip there, and offering it twice would let the same
 * day be toggled from two places in one gesture.
 */
export function CalendarDayLogPanel({ iso, label, open, onClose, symptomGroups, showIntimacy = true }) {
  const [symptoms, setSymptoms] = useState([]);
  const [energy, setEnergy] = useState(0);
  const [mood, setMood] = useState(0);
  const [intimacy, setIntimacy] = useState(false);
  const [custom, setCustom] = useState("");
  const [saveState, setSaveState] = useState(() => getCalendarDayLogSaveState(iso));
  const draftSeed = useRef("");
  const openGeneration = useRef(0);
  const currentIso = useRef(iso);
  currentIso.current = iso;
  const busy = Boolean(saveState.active || (saveState.completion && !saveState.completion.consumed));

  useEffect(() => subscribeToCalendarDayLogSave(iso, setSaveState), [iso]);

  useLayoutEffect(() => {
    if (open) openGeneration.current += 1;
  }, [open]);

  useEffect(() => {
    if (!iso || !open) return;
    const shared = getCalendarDayLogSaveState(iso);
    const adoptedOperation = shared.active || (
      shared.completion && !shared.completion.consumed ? shared.completion : null
    );
    const seedKey = `${openGeneration.current}:${iso}:${adoptedOperation?.id || "canonical"}`;
    if (draftSeed.current === seedKey) return;
    draftSeed.current = seedKey;
    if (adoptedOperation?.draft) {
      setSymptoms(adoptedOperation.draft.symptoms);
      setEnergy(adoptedOperation.draft.energy);
      setMood(adoptedOperation.draft.mood);
      setIntimacy(adoptedOperation.draft.intimacy);
      setCustom(adoptedOperation.draft.custom);
      return;
    }
    const day = read("getAiwaDayCheckin", iso) || {};
    setSymptoms(day.symptoms || []);
    setEnergy(day.energy || 0);
    setMood(day.mood || 0);
    setIntimacy(Boolean(day.intimacy));
    setCustom("");
  }, [iso, open]);

  useEffect(() => {
    const completion = saveState.completion;
    if (!open || !completion || completion.consumed) return;
    if (!consumeCalendarDayLogSaveCompletion(iso, completion.id)) return;
    if (completion.status === "fulfilled") {
      showToast("Сохранено", { type: "success" });
      onClose();
    } else {
      showToast(completion.error?.message || "Не удалось сохранить", { type: "error" });
    }
  }, [iso, onClose, open, saveState.completion]);

  const hasBlockingSave = () => {
    const shared = getCalendarDayLogSaveState(currentIso.current);
    return Boolean(shared.active || (shared.completion && !shared.completion.consumed));
  };
  const toggleSymptom = (code) => {
    if (hasBlockingSave()) return;
    setSymptoms((current) => (current.includes(code) ? current.filter((item) => item !== code) : [...current, code]));
  };
  const groups = symptomGroups?.length ? symptomGroups : JOURNAL_SYMPTOM_GROUPS;

  const save = () => {
    const targetIso = currentIso.current;
    if (hasBlockingSave()) return;
    const draft = { energy, mood, symptoms, custom, intimacy };
    const payload = buildJournalSavePayload({ date: targetIso, ...draft });
    const request = requestCalendarDayLogSave(
      targetIso,
      payload,
      (frozenPayload) => acknowledgedHostWrite("aiwaSaveJournal", frozenPayload),
      { draft },
    );
    // The shared lane publishes both success and failure to whichever
    // same-date panel is mounted when the write settles.
    void request.promise.catch(() => {});
  };

  return (
    <AiwaModalView
      isOpen={open}
      onClose={onClose}
      data-aiwa-day-log-modal="true"
      aria-label={label || "Журнал за выбранный день"}
    >
      {/* The day being edited is the useful title here; back is the native BackButton. */}
      <AiwaPanelHeader size="large" title={label || "Занести в журнал"} />

      <div
        className="aiwa-log-scroll"
        aria-busy={busy || undefined}
        aria-disabled={busy || undefined}
        inert={busy ? true : undefined}
      >
        <SectionList className="aiwa-log-sections">
          <SectionList.Item>
            <JournalChoiceGroup
              label="Энергия"
              options={JOURNAL_ENERGY_OPTIONS}
              value={energy}
              onChange={(value) => { if (!hasBlockingSave()) setEnergy(value); }}
            />
          </SectionList.Item>

          <SectionList.Item>
            <JournalChoiceGroup
              label="Настроение"
              options={JOURNAL_MOOD_OPTIONS}
              value={mood}
              onChange={(value) => { if (!hasBlockingSave()) setMood(value); }}
            />
          </SectionList.Item>

          {groups.map(([groupLabel, options]) => (
            <SectionList.Item key={groupLabel}>
              <JournalSymptomGroup label={groupLabel} options={options} symptoms={symptoms} onToggle={toggleSymptom} />
            </SectionList.Item>
          ))}

          <SectionList.Item>
            <JournalCustomSymptom
              value={custom}
              onChange={(value) => { if (!hasBlockingSave()) setCustom(value); }}
            />
          </SectionList.Item>

          {showIntimacy ? (
            <SectionList.Item>
              <JournalToggle
                label="Близость"
                active={intimacy}
                onChange={(value) => { if (!hasBlockingSave()) setIntimacy(value); }}
              />
            </SectionList.Item>
          ) : null}
        </SectionList>
      </div>

      <div className="aiwa-log-footer">
        <AiwaButton
          label="Сохранить"
          loading={busy}
          data-haptic="light"
          isFill
          {...actionProps("Сохранить", save)}
        />
      </div>
    </AiwaModalView>
  );
}
