import { useEffect, useState } from "react";
import { Text, Tappable, RegularButton } from "../lib/tma";
import { AiwaModalView } from "../components/AiwaModalView";
import { Field } from "../components/Field";
import { ChoicePills } from "../components/ChoicePills";
import { WORKOUT_TYPES, WORKOUT_EXERCISES } from "../lib/constants";
import { apiCall, showToast, trackFlow, actionProps } from "../lib/api";

export function WorkoutPanel({ isOpen, onClose, onSaved, suggested }) {
  const todayIso = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(todayIso);
  const [type, setType] = useState("Силовая");
  const [duration, setDuration] = useState("45 мин");
  const [rpe, setRpe] = useState("Нормально");
  const [selected, setSelected] = useState([]);
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!isOpen) return;
    trackFlow("workout");
    const hinted = suggested?.name || "";
    const nextType = /ход/i.test(hinted) ? "Ходьба" : (/йог|мобил|релиз/i.test(hinted) ? "Йога" : (/кардио/i.test(hinted) ? "Кардио" : "Силовая"));
    setType(nextType);
    setSelected(hinted ? [hinted] : []);
    setDate(todayIso);
  }, [isOpen, suggested, todayIso]);
  const toggleExercise = (name) => setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  const save = async () => {
    const names = [...selected, ...(custom.trim() ? [custom.trim()] : [])];
    setBusy(true);
    try {
      const result = await apiCall("/api/workout", {
        date,
        type,
        duration,
        rpe,
        items: names.map((name) => ({ name })),
      });
      if (!result?.ok) throw new Error(result?.text || "Не получилось сохранить тренировку");
      showToast(`Тренировка сохранена · ~${result.calories || 0} ккал`, { type: "success" });
      await onSaved();
      onClose();
    } catch (error) {
      showToast(error.message || "Не получилось сохранить", { type: "error" });
    } finally {
      setBusy(false);
    }
  };
  return (
    <AiwaModalView isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="aiwa-sheet-scroll aiwa-form-stack">
          <Field label="Когда" type="date" value={date} onChange={setDate} />
          <ChoicePills label="Что делала" options={WORKOUT_TYPES} value={type} onChange={(value) => { setType(value); setSelected([]); }} />
          <div className="aiwa-form-group">
            <Text className="aiwa-form-label" variant="body" weight="semibold">Упражнения</Text>
            <div className="aiwa-sheet-card">
              {(WORKOUT_EXERCISES[type] || []).map((name) => (
                <Tappable
                  as="button"
                  type="button"
                  mode="opacity"
                  className="aiwa-exercise-row"
                  aria-pressed={selected.includes(name)}
                  onClick={() => toggleExercise(name)}
                  key={name}
                >
                  <Text variant="body" weight="regular">{name}</Text>
                  <span className={selected.includes(name) ? "aiwa-check is-active" : "aiwa-check"}>{selected.includes(name) ? "✓" : "+"}</span>
                </Tappable>
              ))}
              <Field label="Добавить своё" value={custom} onChange={setCustom} placeholder="Название упражнения" />
            </div>
          </div>
          <ChoicePills label="Длительность" options={["30 мин", "45 мин", "60+ мин"]} value={duration} onChange={setDuration} />
          <ChoicePills label="Как ощущалось" options={["Легко", "Нормально", "Тяжело"]} value={rpe} onChange={setRpe} />
          <RegularButton
            variant="filled"
            label={busy ? "Сохраняю…" : "Сохранить и разобрать"}
            isFill
            disabled={busy}
            {...actionProps("Сохранить и разобрать", save)}
          />
        </div>
      </div>
    </AiwaModalView>
  );
}
