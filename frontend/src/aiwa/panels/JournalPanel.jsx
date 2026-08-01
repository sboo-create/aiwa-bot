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
import { acknowledgedHostWrite, actionProps, showToast, withHostToastsMuted } from "../lib/api";
import { aiwaTodayIso } from "../lib/dates";

/**
 * Today's journal. Every control edits a local draft; nothing reaches the host
 * until «Сохранить», which replays the diff through the existing bridge calls
 * (they are toggles/setters, so only changed fields are sent).
 */
export function JournalPanel({ isOpen, onClose, checkin, symptomGroups, mode, dayIso }) {
  // Прошлый день, выбранный в полосе на главной: пишем через Day-функции
  // склейки с явной датой (инцидент 31.07: всё падало в «сегодня»).
  const todayIso = aiwaTodayIso();
  const isPastDay = Boolean(dayIso && dayIso !== todayIso);
  const [symptoms, setSymptoms] = useState(checkin.symptoms || []);
  const [energy, setEnergy] = useState(checkin.energy || 0);
  const [mood, setMood] = useState(checkin.mood || 0);
  const [period, setPeriod] = useState(Boolean(checkin.period));
  const [intimacy, setIntimacy] = useState(Boolean(checkin.intimacy));
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);
  const [saveRevision, setSaveRevision] = useState(0);
  const saveLock = useRef(null);
  const saveId = useRef(0);
  const openSession = useRef({ generation: 0, open: false });
  const draftSeed = useRef("");
  const currentDay = useRef(dayIso || todayIso);
  currentDay.current = dayIso || todayIso;

  useLayoutEffect(() => {
    openSession.current = {
      generation: openSession.current.generation + (isOpen ? 1 : 0),
      open: isOpen,
    };
  }, [isOpen]);

  // An in-flight batch owns its draft across close/reopen. Re-seeding it would
  // expose a second submit while the first host toggle sequence is still active.
  useEffect(() => {
    if (!isOpen) return;
    if (saveLock.current) {
      setBusy(true);
      return;
    }
    const seedKey = `${openSession.current.generation}:${dayIso || todayIso}:${saveRevision}`;
    // A host refresh can replace the checkin object while somebody is editing.
    // It supplies the latest value for the next session, but only a new open,
    // selected day, or completed stale save is allowed to replace this draft.
    if (draftSeed.current === seedKey) return;
    draftSeed.current = seedKey;
    setSymptoms(checkin.symptoms || []);
    setEnergy(checkin.energy || 0);
    setMood(checkin.mood || 0);
    setPeriod(Boolean(checkin.period));
    setIntimacy(Boolean(checkin.intimacy));
    setCustom("");
    setBusy(false);
  }, [checkin, dayIso, isOpen, saveRevision, todayIso]);

  const toggleSymptom = (code) => {
    setSymptoms((current) => (current.includes(code) ? current.filter((item) => item !== code) : [...current, code]));
  };
  const groups = symptomGroups?.length ? symptomGroups : JOURNAL_SYMPTOM_GROUPS;

  const save = async () => {
    if (saveLock.current) return;
    const operation = {
      id: ++saveId.current,
      generation: openSession.current.generation,
      dayIso: dayIso || todayIso,
    };
    saveLock.current = operation;
    const savedSymptoms = checkin.symptoms || [];
    const extra = custom.trim();
    setBusy(true);
    try {
      // Один submit принадлежит одной панели: мостовые success-тосты на время
      // пачки приглушены, а ошибки остаются видимыми через scoped bridge.
      await withHostToastsMuted(async () => {
        if (!isPastDay && period !== Boolean(checkin.period)) {
          await acknowledgedHostWrite("toggleTodayPeriod");
        }
        if (energy !== (checkin.energy || 0)) {
          if (isPastDay) await acknowledgedHostWrite("setDayCheckin", dayIso, "energy", energy);
          else await acknowledgedHostWrite("setCheckin", "energy", energy);
        }
        if (mood !== (checkin.mood || 0)) {
          if (isPastDay) await acknowledgedHostWrite("setDayCheckin", dayIso, "mood", mood);
          else await acknowledgedHostWrite("setCheckin", "mood", mood);
        }
        for (const code of symptoms.filter((item) => !savedSymptoms.includes(item))) {
          if (isPastDay) await acknowledgedHostWrite("toggleDaySym", dayIso, code);
          else await acknowledgedHostWrite("toggleSym", code);
        }
        for (const code of savedSymptoms.filter((item) => !symptoms.includes(item))) {
          if (isPastDay) await acknowledgedHostWrite("toggleDaySym", dayIso, code);
          else await acknowledgedHostWrite("toggleSym", code);
        }
        if (intimacy !== Boolean(checkin.intimacy)) {
          if (isPastDay) await acknowledgedHostWrite("markPA", dayIso);
          else await acknowledgedHostWrite("toggleTodayIntimacy");
        }
        if (extra) {
          if (isPastDay) await acknowledgedHostWrite("addDayCustomSym", dayIso, extra);
          else await acknowledgedHostWrite("addCustomSym", extra);
        }
      });
      if (!openSession.current.open
          || openSession.current.generation !== operation.generation
          || currentDay.current !== operation.dayIso) return;
      showToast("Сохранили в журнал", { type: "success" });
      onClose();
    } catch (error) {
      if (!openSession.current.open
          || openSession.current.generation !== operation.generation
          || currentDay.current !== operation.dayIso) return;
      showToast(error?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      if (saveLock.current?.id === operation.id) {
        saveLock.current = null;
        setBusy(false);
        if (openSession.current.open && (
          openSession.current.generation !== operation.generation
          || currentDay.current !== operation.dayIso
        )) {
          // A close/reopen created a new session while this batch owned the
          // previous draft. Seed the reopened sheet only after the lock clears.
          setSaveRevision((value) => value + 1);
        }
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

      <div className="aiwa-log-scroll" aria-busy={busy || undefined}>
        <SectionList className="aiwa-log-sections">
          {mode !== "preg" && mode !== "meno" && mode !== "male" && !isPastDay ? (
            <SectionList.Item>
              <JournalToggle label="Месячные" variant="period" active={period} onChange={setPeriod} />
            </SectionList.Item>
          ) : null}

          <SectionList.Item>
            <JournalChoiceGroup
              label="Энергия"
              options={JOURNAL_ENERGY_OPTIONS}
              value={energy}
              onChange={setEnergy}
            />
          </SectionList.Item>

          <SectionList.Item>
            <JournalChoiceGroup
              label="Настроение"
              options={JOURNAL_MOOD_OPTIONS}
              value={mood}
              onChange={setMood}
            />
          </SectionList.Item>

          {groups.map(([label, options]) => (
            <SectionList.Item key={label}>
              <JournalSymptomGroup label={label} options={options} symptoms={symptoms} onToggle={toggleSymptom} />
            </SectionList.Item>
          ))}

          <SectionList.Item>
            <JournalCustomSymptom value={custom} onChange={setCustom} />
          </SectionList.Item>

          {mode === "male" ? null : (
            <SectionList.Item>
              <JournalToggle label="Близость" active={intimacy} onChange={setIntimacy} />
            </SectionList.Item>
          )}
        </SectionList>
      </div>

      <div className="aiwa-log-footer">
        <AiwaButton
          label="Сохранить"
          loading={busy}
          isFill
          {...actionProps("Сохранить", save)}
        />
      </div>
    </AiwaModalView>
  );
}
