import { useEffect, useState } from "react";
import { Text, Tappable, RegularButton } from "../lib/tma";
import { AiwaModalView } from "../components/AiwaModalView";
import { Field } from "../components/Field";
import { ChoicePills } from "../components/ChoicePills";
import { WORKOUT_TYPES, WORKOUT_EXERCISES, WORKOUT_GROUPS } from "../lib/constants";
import { apiCall, showToast, trackFlow, actionProps } from "../lib/api";

export function WorkoutPanel({ isOpen, onClose, onSaved, suggested }) {
  const todayIso = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(todayIso);
  const [type, setType] = useState("Силовая");
  const [duration, setDuration] = useState("45 мин");
  const [rpe, setRpe] = useState("Нормально");
  const [selected, setSelected] = useState([]);
  // Вес/подходы/повторы по упражнению — как в старом конструкторе; поля
  // показываются для силовой, отправляются только заполненные значения.
  const [details, setDetails] = useState({});
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);
  // Раскрытая группа мышц в силовой; своя группа у каждого выбранного упражнения
  // уезжает на бек в item.group — так разбор от Айвы знает, что качалось.
  const [openGroup, setOpenGroup] = useState("");
  // После сохранения панель показывает разбор и калории вместо формы.
  const [review, setReview] = useState(null);
  useEffect(() => {
    if (!isOpen) return;
    trackFlow("workout");
    const hinted = suggested?.name || "";
    const nextType = /ход/i.test(hinted) ? "Ходьба" : (/йог|мобил|релиз/i.test(hinted) ? "Йога" : (/кардио/i.test(hinted) ? "Кардио" : "Силовая"));
    setType(nextType);
    setSelected(hinted ? [hinted] : []);
    setDetails({});
    setCustom("");
    setOpenGroup("");
    setReview(null);
    setDate(todayIso);
  }, [isOpen, suggested, todayIso]);
  const toggleExercise = (name) => setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  const strength = type === "Силовая";
  const groupOf = (name) => Object.keys(WORKOUT_GROUPS).find((group) => WORKOUT_GROUPS[group].includes(name)) || null;
  const setDetail = (name, key, value) =>
    setDetails((current) => ({ ...current, [name]: { ...current[name], [key]: value } }));
  const detailNum = (name, key) => {
    const raw = String(details[name]?.[key] ?? "").replace(",", ".").trim();
    const num = Number(raw);
    return raw && Number.isFinite(num) && num > 0 ? num : null;
  };
  const save = async () => {
    const names = [...selected, ...(custom.trim() ? [custom.trim()] : [])];
    setBusy(true);
    try {
      const result = await apiCall("/api/workout", {
        date,
        type,
        duration,
        rpe,
        items: names.map((name) => ({
          name,
          weight: strength ? detailNum(name, "w") : null,
          sets: strength ? detailNum(name, "sets") : null,
          reps: strength ? detailNum(name, "reps") : null,
          group: strength ? groupOf(name) : null,
        })),
      });
      if (!result?.ok) throw new Error(result?.text || "Не получилось сохранить тренировку");
      await onSaved();
      setReview({ text: result.review || "", calories: result.calories || 0 });
    } catch (error) {
      showToast(error.message || "Не получилось сохранить", { type: "error" });
    } finally {
      setBusy(false);
    }
  };
  const exerciseRow = (name) => (
    <div key={name}>
      <Tappable
        as="button"
        type="button"
        mode="opacity"
        className="aiwa-exercise-row"
        aria-pressed={selected.includes(name)}
        onClick={() => toggleExercise(name)}
      >
        <Text variant="body" weight="regular">{name}</Text>
        <span className={selected.includes(name) ? "aiwa-check is-active" : "aiwa-check"}>{selected.includes(name) ? "✓" : "+"}</span>
      </Tappable>
      {strength && selected.includes(name) ? (
        <div className="aiwa-exercise-nums">
          <input
            inputMode="decimal"
            placeholder="кг"
            aria-label={`${name}: вес`}
            value={details[name]?.w ?? ""}
            onChange={(event) => setDetail(name, "w", event.target.value)}
          />
          <input
            inputMode="numeric"
            placeholder="подходы"
            aria-label={`${name}: подходы`}
            value={details[name]?.sets ?? ""}
            onChange={(event) => setDetail(name, "sets", event.target.value)}
          />
          <input
            inputMode="numeric"
            placeholder="повторы"
            aria-label={`${name}: повторы`}
            value={details[name]?.reps ?? ""}
            onChange={(event) => setDetail(name, "reps", event.target.value)}
          />
        </div>
      ) : null}
    </div>
  );

  if (review) {
    return (
      <AiwaModalView isOpen={isOpen} onClose={onClose}>
        <div>
          <div className="aiwa-sheet-scroll aiwa-form-stack">
            <div className="aiwa-sheet-card aiwa-workout-review">
              <Text variant="title2" weight="semibold">Тренировка сохранена</Text>
              <Text variant="body" weight="regular">{`Сожжено примерно ${review.calories} ккал.`}</Text>
              {review.text ? <Text variant="body" weight="regular">{review.text}</Text> : null}
            </div>
            <RegularButton variant="filled" label="Понятно" isFill {...actionProps("Закрыть разбор", onClose)} />
          </div>
        </div>
      </AiwaModalView>
    );
  }

  return (
    <AiwaModalView isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="aiwa-sheet-scroll aiwa-form-stack">
          <Field label="Когда" type="date" value={date} onChange={setDate} />
          <ChoicePills label="Что делала" options={WORKOUT_TYPES} value={type} onChange={(value) => { setType(value); setSelected([]); }} />
          <div className="aiwa-form-group">
            <Text className="aiwa-form-label" variant="body" weight="semibold">Упражнения</Text>
            <div className="aiwa-sheet-card">
              {strength ? Object.keys(WORKOUT_GROUPS).map((group) => {
                const chosen = WORKOUT_GROUPS[group].filter((name) => selected.includes(name)).length;
                const opened = openGroup === group;
                return (
                  <div key={group}>
                    <Tappable
                      as="button"
                      type="button"
                      mode="opacity"
                      className="aiwa-exercise-row aiwa-exercise-group"
                      aria-expanded={opened}
                      onClick={() => setOpenGroup(opened ? "" : group)}
                    >
                      <Text variant="body" weight="semibold">{group}</Text>
                      <Text variant="caption1" weight="regular">{chosen ? `выбрано ${chosen}` : (opened ? "—" : "+")}</Text>
                    </Tappable>
                    {opened ? WORKOUT_GROUPS[group].map(exerciseRow) : null}
                  </div>
                );
              }) : (WORKOUT_EXERCISES[type] || []).map(exerciseRow)}
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
