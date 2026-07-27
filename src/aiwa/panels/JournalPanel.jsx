import { useEffect, useState } from "react";
import { RegularButton, SectionList } from "../lib/tma";
import { AiwaModalView } from "../components/AiwaModalView";
import { AiwaPanelHeader } from "../components/AiwaPanelHeader";
import { JournalToggle } from "../components/JournalToggle";
import { JournalChoiceGroup } from "../components/JournalChoiceGroup";
import { JournalSymptomGroup } from "../components/JournalSymptomGroup";
import { JournalCustomSymptom } from "../components/JournalCustomSymptom";
import { JOURNAL_ENERGY_OPTIONS, JOURNAL_MOOD_OPTIONS, JOURNAL_SYMPTOM_GROUPS } from "../lib/constants";
import { actionProps, read, showToast } from "../lib/api";

/**
 * Today's journal. Every control edits a local draft; nothing reaches the host
 * until «Сохранить», which replays the diff through the existing bridge calls
 * (they are toggles/setters, so only changed fields are sent).
 */
export function JournalPanel({ isOpen, onClose, checkin, symptomGroups, mode }) {
  const [symptoms, setSymptoms] = useState(checkin.symptoms || []);
  const [energy, setEnergy] = useState(checkin.energy || 0);
  const [mood, setMood] = useState(checkin.mood || 0);
  const [period, setPeriod] = useState(Boolean(checkin.period));
  const [intimacy, setIntimacy] = useState(Boolean(checkin.intimacy));
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);

  // Seed the draft when the sheet opens; while it is open the draft is the truth.
  useEffect(() => {
    if (!isOpen) return;
    setSymptoms(checkin.symptoms || []);
    setEnergy(checkin.energy || 0);
    setMood(checkin.mood || 0);
    setPeriod(Boolean(checkin.period));
    setIntimacy(Boolean(checkin.intimacy));
    setCustom("");
    setBusy(false);
  }, [isOpen]);

  const toggleSymptom = (code) => {
    setSymptoms((current) => (current.includes(code) ? current.filter((item) => item !== code) : [...current, code]));
  };
  const groups = symptomGroups?.length ? symptomGroups : JOURNAL_SYMPTOM_GROUPS;

  const save = async () => {
    if (busy) return;
    const savedSymptoms = checkin.symptoms || [];
    const extra = custom.trim();
    setBusy(true);
    try {
      // setCheckin / addCustomSym toast on their own; only speak up if neither ran.
      let hostToasted = false;
      if (period !== Boolean(checkin.period)) {
        await read("toggleTodayPeriod");
        hostToasted = true;
      }
      if (energy !== (checkin.energy || 0)) {
        await read("setCheckin", "energy", energy);
        hostToasted = true;
      }
      if (mood !== (checkin.mood || 0)) {
        await read("setCheckin", "mood", mood);
        hostToasted = true;
      }
      for (const code of symptoms.filter((item) => !savedSymptoms.includes(item))) {
        await read("toggleSym", code);
      }
      for (const code of savedSymptoms.filter((item) => !symptoms.includes(item))) {
        await read("toggleSym", code);
      }
      if (intimacy !== Boolean(checkin.intimacy)) await read("toggleTodayIntimacy");
      if (extra) {
        await read("addCustomSym", extra);
        hostToasted = true;
      }
      if (!hostToasted) showToast("Сохранено", { type: "success" });
      onClose();
    } catch (error) {
      showToast(error?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <AiwaModalView
      isOpen={isOpen}
      onClose={onClose}
      data-aiwa-log-modal="true"
    >
      {/* Title only — back is Telegram's native BackButton (see AiwaModalView). */}
      <AiwaPanelHeader size="large" title="Занести в журнал" />

      <div className="aiwa-log-scroll">
        <SectionList className="aiwa-log-sections">
          {mode !== "preg" && mode !== "meno" ? (
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

          <SectionList.Item>
            <JournalToggle label="Близость" active={intimacy} onChange={setIntimacy} />
          </SectionList.Item>
        </SectionList>
      </div>

      <div className="aiwa-log-footer">
        <RegularButton
          variant="filled"
          label={busy ? "Сохраняю…" : "Сохранить"}
          isFill
          {...actionProps("Сохранить", save)}
        />
      </div>
    </AiwaModalView>
  );
}
