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
  const [saved, setSaved] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [energy, setEnergy] = useState(0);
  const [mood, setMood] = useState(0);
  const [intimacy, setIntimacy] = useState(false);
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!iso || !open) return;
    const day = read("getAiwaDayCheckin", iso) || {};
    setSaved(day);
    setSymptoms(day.symptoms || []);
    setEnergy(day.energy || 0);
    setMood(day.mood || 0);
    setIntimacy(Boolean(day.intimacy));
    setCustom("");
    setBusy(false);
  }, [iso, open]);

  const toggleSymptom = (code) => {
    setSymptoms((current) => (current.includes(code) ? current.filter((item) => item !== code) : [...current, code]));
  };
  const groups = symptomGroups?.length ? symptomGroups : JOURNAL_SYMPTOM_GROUPS;

  const save = async () => {
    if (busy) return;
    const savedSymptoms = saved.symptoms || [];
    const extra = custom.trim();
    setBusy(true);
    try {
      if (energy !== (saved.energy || 0)) await read("setDayCheckin", iso, "energy", energy);
      if (mood !== (saved.mood || 0)) await read("setDayCheckin", iso, "mood", mood);
      for (const code of symptoms.filter((item) => !savedSymptoms.includes(item))) {
        await read("toggleDaySym", iso, code);
      }
      for (const code of savedSymptoms.filter((item) => !symptoms.includes(item))) {
        await read("toggleDaySym", iso, code);
      }
      if (intimacy !== Boolean(saved.intimacy)) await read("markPA", iso);
      // addDayCustomSym toasts on its own; otherwise this is the only confirmation.
      if (extra) await read("addDayCustomSym", iso, extra);
      else showToast("Сохранено", { type: "success" });
      onClose();
    } catch (error) {
      showToast(error?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <AiwaModalView
      isOpen={open}
      onClose={onClose}
      data-aiwa-day-log-modal="true"
    >
      {/* The day being edited is the useful title here; back is the native BackButton. */}
      <AiwaPanelHeader size="large" title={label || "Занести в журнал"} />

      <div className="aiwa-log-scroll">
        <SectionList className="aiwa-log-sections">
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

          {groups.map(([groupLabel, options]) => (
            <SectionList.Item key={groupLabel}>
              <JournalSymptomGroup label={groupLabel} options={options} symptoms={symptoms} onToggle={toggleSymptom} />
            </SectionList.Item>
          ))}

          <SectionList.Item>
            <JournalCustomSymptom value={custom} onChange={setCustom} />
          </SectionList.Item>

          {showIntimacy ? (
            <SectionList.Item>
              <JournalToggle label="Близость" active={intimacy} onChange={setIntimacy} />
            </SectionList.Item>
          ) : null}
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
