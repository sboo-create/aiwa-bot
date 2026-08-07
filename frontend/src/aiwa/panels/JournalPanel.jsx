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
import { acknowledgedHostWrite, actionProps, showToast } from "../lib/api";
import { aiwaTodayIso } from "../lib/dates";
import { buildJournalSavePayload, isJournalSaveSessionCurrent } from "../lib/journalSave";

const EMPTY_CHECKIN = Object.freeze({});

/**
 * Today's journal. Every control edits a local draft; «Сохранить» sends one
 * absolute, date-bound snapshot to the atomic host bridge.
 */
export function JournalPanel({ isOpen, onClose, checkin, symptomGroups, mode, dayIso }) {
  const todayIso = aiwaTodayIso();
  const selectedDate = dayIso || todayIso;
  const sourceCheckin = checkin || EMPTY_CHECKIN;
  const isPastDay = selectedDate !== todayIso;
  const canEditPeriod = !isPastDay && !["preg", "meno", "male", "none", "fit"].includes(mode);
  const [symptoms, setSymptoms] = useState(sourceCheckin.symptoms || []);
  const [energy, setEnergy] = useState(sourceCheckin.energy || 0);
  const [mood, setMood] = useState(sourceCheckin.mood || 0);
  const [period, setPeriod] = useState(Boolean(sourceCheckin.period));
  const [intimacy, setIntimacy] = useState(Boolean(sourceCheckin.intimacy));
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);
  const [saveRevision, setSaveRevision] = useState(0);
  const saveLock = useRef(null);
  const saveId = useRef(0);
  const openSession = useRef({ generation: 0, open: false });
  const draftSeed = useRef("");
  const currentDay = useRef(selectedDate);
  currentDay.current = selectedDate;

  useLayoutEffect(() => {
    openSession.current = {
      generation: openSession.current.generation + (isOpen ? 1 : 0),
      open: isOpen,
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (saveLock.current?.dayIso === selectedDate) {
      // The component remains mounted while closed. Keep the submitted draft
      // for same-day failure feedback/retry instead of restoring old host data.
      setBusy(true);
      return;
    }
    const seedKey = `${openSession.current.generation}:${selectedDate}:${saveRevision}`;
    // A host refresh can replace the checkin object while somebody is editing.
    // It supplies the latest value for the next session, but only a new open,
    // selected day, or completed stale save is allowed to replace this draft.
    if (draftSeed.current === seedKey) return;
    draftSeed.current = seedKey;
    setSymptoms(sourceCheckin.symptoms || []);
    setEnergy(sourceCheckin.energy || 0);
    setMood(sourceCheckin.mood || 0);
    setPeriod(Boolean(sourceCheckin.period));
    setIntimacy(Boolean(sourceCheckin.intimacy));
    setCustom("");
    setBusy(Boolean(saveLock.current));
  }, [isOpen, saveRevision, selectedDate, sourceCheckin]);

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
      dayIso: currentDay.current,
      payload: buildJournalSavePayload({
        date: currentDay.current,
        energy,
        mood,
        symptoms,
        custom,
        intimacy,
        period,
        includePeriod: canEditPeriod,
      }),
    };
    saveLock.current = operation;
    setBusy(true);
    const isCurrentSaveSession = () => isJournalSaveSessionCurrent({
      isOpen: openSession.current.open,
      currentGeneration: openSession.current.generation,
      startedGeneration: operation.generation,
      currentDate: currentDay.current,
      targetDate: operation.dayIso,
    });
    try {
      await acknowledgedHostWrite("aiwaSaveJournal", operation.payload);
      if (!isCurrentSaveSession()) return;
      showToast("Сохранили в журнал", { type: "success" });
      onClose();
    } catch (error) {
      if (!isCurrentSaveSession()) return;
      showToast(error?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      if (saveLock.current?.id === operation.id) {
        const staleSession = openSession.current.open && !isCurrentSaveSession();
        saveLock.current = null;
        if (staleSession) {
          // Keep the reopened/switched draft inert until its own canonical seed
          // is applied. Clearing busy here creates a one-paint edit window whose
          // input the reseed effect would immediately clobber.
          setBusy(true);
          // A close/reopen created a new session while this batch owned the
          // previous draft. Seed the reopened sheet only after the lock clears.
          setSaveRevision((value) => value + 1);
        } else setBusy(false);
      }
    }
  };

  return (
    <AiwaModalView
      isOpen={isOpen}
      onClose={onClose}
      data-aiwa-log-modal="true"
      aria-label={isPastDay ? "Журнал за выбранный день" : "Занести в журнал"}
    >
      {/* Title only — back is Telegram's native BackButton (see AiwaModalView). */}
      <AiwaPanelHeader size="large" title={isPastDay ? `Журнал за ${new Date(dayIso + "T00:00:00").toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}` : "Занести в журнал"} />

      <div
        className="aiwa-log-scroll"
        aria-busy={busy || undefined}
        aria-disabled={busy || undefined}
        inert={busy ? true : undefined}
      >
        <SectionList className="aiwa-log-sections">
          {canEditPeriod ? (
            <SectionList.Item>
              <JournalToggle
                label="Месячные"
                variant="period"
                active={period}
                onChange={(value) => { if (!saveLock.current) setPeriod(value); }}
              />
            </SectionList.Item>
          ) : null}

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

          {groups.map(([label, options]) => (
            <SectionList.Item key={label}>
              <JournalSymptomGroup label={label} options={options} symptoms={symptoms} onToggle={toggleSymptom} />
            </SectionList.Item>
          ))}

          <SectionList.Item>
            <JournalCustomSymptom
              value={custom}
              onChange={(value) => { if (!saveLock.current) setCustom(value); }}
            />
          </SectionList.Item>

          {mode === "male" ? null : (
            <SectionList.Item>
              <JournalToggle
                label="Близость"
                active={intimacy}
                onChange={(value) => { if (!saveLock.current) setIntimacy(value); }}
              />
            </SectionList.Item>
          )}
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
