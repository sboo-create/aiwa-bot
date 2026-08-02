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
import { buildJournalSavePayload, isJournalSaveSessionCurrent } from "../lib/journalSave";

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
  const [busy, setBusy] = useState(false);
  const [saveRevision, setSaveRevision] = useState(0);
  const saveLock = useRef(null);
  const saveId = useRef(0);
  const openSession = useRef({ generation: 0, open: false });
  const draftSeed = useRef("");
  const currentIso = useRef(iso);
  currentIso.current = iso;

  useLayoutEffect(() => {
    openSession.current = {
      generation: openSession.current.generation + (open ? 1 : 0),
      open,
    };
  }, [open]);

  useEffect(() => {
    if (!iso || !open) return;
    if (saveLock.current?.iso === iso) {
      setBusy(true);
      return;
    }
    const seedKey = `${openSession.current.generation}:${iso}:${saveRevision}`;
    if (draftSeed.current === seedKey) return;
    draftSeed.current = seedKey;
    const day = read("getAiwaDayCheckin", iso) || {};
    setSymptoms(day.symptoms || []);
    setEnergy(day.energy || 0);
    setMood(day.mood || 0);
    setIntimacy(Boolean(day.intimacy));
    setCustom("");
    setBusy(Boolean(saveLock.current));
  }, [iso, open, saveRevision]);

  const toggleSymptom = (code) => {
    if (saveLock.current) return;
    setSymptoms((current) => (current.includes(code) ? current.filter((item) => item !== code) : [...current, code]));
  };
  const groups = symptomGroups?.length ? symptomGroups : JOURNAL_SYMPTOM_GROUPS;

  const save = async () => {
    if (saveLock.current) return;
    const operation = {
      id: ++saveId.current,
      generation: openSession.current.generation,
      iso: currentIso.current,
      payload: buildJournalSavePayload({
        date: currentIso.current,
        energy,
        mood,
        symptoms,
        custom,
        intimacy,
      }),
    };
    saveLock.current = operation;
    setBusy(true);
    const isCurrentSaveSession = () => isJournalSaveSessionCurrent({
      isOpen: openSession.current.open,
      currentGeneration: openSession.current.generation,
      startedGeneration: operation.generation,
      currentDate: currentIso.current,
      targetDate: operation.iso,
    });
    try {
      await acknowledgedHostWrite("aiwaSaveJournal", operation.payload);
      if (!isCurrentSaveSession()) return;
      showToast("Сохранено", { type: "success" });
      onClose();
    } catch (error) {
      if (!isCurrentSaveSession()) return;
      showToast(error?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      if (saveLock.current?.id === operation.id) {
        const staleSession = openSession.current.open && !isCurrentSaveSession();
        saveLock.current = null;
        if (staleSession) {
          setBusy(true);
          setSaveRevision((value) => value + 1);
        } else setBusy(false);
      }
    }
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
              onChange={(value) => { if (!saveLock.current) setEnergy(value); }}
            />
          </SectionList.Item>

          <SectionList.Item>
            <JournalChoiceGroup
              label="Настроение"
              options={JOURNAL_MOOD_OPTIONS}
              value={mood}
              onChange={(value) => { if (!saveLock.current) setMood(value); }}
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
              onChange={(value) => { if (!saveLock.current) setCustom(value); }}
            />
          </SectionList.Item>

          {showIntimacy ? (
            <SectionList.Item>
              <JournalToggle
                label="Близость"
                active={intimacy}
                onChange={(value) => { if (!saveLock.current) setIntimacy(value); }}
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
