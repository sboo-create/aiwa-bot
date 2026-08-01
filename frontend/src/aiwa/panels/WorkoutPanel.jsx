import { useEffect, useState } from "react";
import { Text, SectionList } from "../lib/tma";
import { AiwaButton } from "../components/AiwaButton";
import { AiwaCell } from "../components/AiwaCell";
import { AiwaModalView } from "../components/AiwaModalView";
import { Field } from "../components/Field";
import { ChoicePills } from "../components/ChoicePills";
import { WORKOUT_TYPES, WORKOUT_EXERCISES, WORKOUT_GROUPS } from "../lib/constants";
import { PlusIcon } from "../lib/icons";
import { apiCall, showToast, trackFlow, actionProps } from "../lib/api";
import { aiwaTodayIso } from "../lib/dates";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const WORKOUT_BACKDATE_DAYS = 90;

const realIsoDate = (value) => {
  const iso = String(value || "");
  if (!ISO_DATE.test(iso)) return "";
  const parsed = new Date(`${iso}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === iso ? iso : "";
};

export const workoutWritableStart = (today = aiwaTodayIso()) => {
  const current = realIsoDate(today) || aiwaTodayIso();
  const first = new Date(`${current}T00:00:00Z`);
  first.setUTCDate(first.getUTCDate() - WORKOUT_BACKDATE_DAYS);
  return first.toISOString().slice(0, 10);
};

/** Mirrors `_api_workout`: Moscow today through exactly 90 days back, inclusive. */
export const isWorkoutDateWritable = (value, today = aiwaTodayIso()) => {
  const iso = realIsoDate(value);
  const current = realIsoDate(today);
  return Boolean(iso && current && iso >= workoutWritableStart(current) && iso <= current);
};

// The shared day is already Moscow-aware, but panels are also rendered in
// Storybook and may be called directly. Accept only a real ISO day inside the
// writable window; otherwise fall back to the same Moscow today as the payload.
const initialWorkoutDate = (value, today) => {
  const iso = realIsoDate(value);
  return isWorkoutDateWritable(iso, today) ? iso : today;
};

export function WorkoutPanel({ isOpen, onClose, onSaved, suggested, favoriteTypes, initialDate }) {
  // Собственные активности пользовательницы (Сквош и т.п.) — отдельные
  // пилюли перед «Своё»; список отдаёт сервер по последним 60 дням.
  const typeOptions = [
    ...WORKOUT_TYPES.filter((t) => t !== "Своё"),
    ...(favoriteTypes || []).filter((t) => !WORKOUT_TYPES.includes(t)),
    "Своё",
  ];
  const todayIso = aiwaTodayIso();
  const openingDate = initialWorkoutDate(initialDate, todayIso);
  const [date, setDate] = useState(openingDate);
  const [type, setType] = useState("Силовая");
  const [duration, setDuration] = useState("45 мин");
  const [rpe, setRpe] = useState("Нормально");
  const [selected, setSelected] = useState([]);
  // Вес/подходы/повторы по упражнению — как в старом конструкторе; поля
  // показываются для силовой, отправляются только заполненные значения.
  const [details, setDetails] = useState({});
  const [custom, setCustom] = useState("");
  const [customType, setCustomType] = useState("");
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
    const fromPlan = (suggested?.exercises || []).filter((e) => e?.name);
    const nextType = /ход|прогул/i.test(hinted) ? "Ходьба" : (/пилатес/i.test(hinted) ? "Пилатес" : (/йог|мобил|релиз|растяж/i.test(hinted) ? "Йога" : (/кардио|бег|вело/i.test(hinted) ? "Кардио" : (/плав/i.test(hinted) ? "Плавание" : "Силовая"))));
    setType(nextType);
    if (fromPlan.length) {
      // Вариант от Айвы с конкретными упражнениями: отмечаем их и переносим
      // подходы/повторы прямо в форму.
      setSelected(fromPlan.map((e) => e.name));
      setDetails(Object.fromEntries(fromPlan.map((e) => [e.name, { sets: e.sets || "", reps: e.reps || "" }])));
    } else {
      setSelected(hinted ? [hinted] : []);
      setDetails({});
    }
    setCustom("");
    setCustomType("");
    const first = (suggested?.exercises || []).find((e) => e?.name)?.name;
    setOpenGroup(first ? (Object.keys(WORKOUT_GROUPS).find((group) => WORKOUT_GROUPS[group].includes(first)) || "") : "");
    setReview(null);
    setDate(openingDate);
  }, [isOpen, suggested, openingDate]);
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
    if (busy) return;
    if (!isWorkoutDateWritable(date, todayIso)) {
      showToast("Тренировку можно отметить за сегодня или за предыдущие 90 дней.", { type: "error" });
      return;
    }
    const names = [...selected, ...(custom.trim() ? [custom.trim()] : [])];
    setBusy(true);
    try {
      const workout = {
        date,
        type: type === "Своё" ? (customType.trim() || "Своё") : type,
        duration,
        rpe,
        items: names.map((name) => ({
          name,
          weight: strength ? detailNum(name, "w") : null,
          sets: strength ? detailNum(name, "sets") : null,
          reps: strength ? detailNum(name, "reps") : null,
          group: strength ? groupOf(name) : null,
        })),
      };
      const result = await apiCall("/api/workout", workout);
      if (!result?.ok) throw new Error(result?.text || "Не получилось сохранить тренировку");
      await onSaved?.({
        ...result,
        requestedDate: date,
        date: result.date || result.d || date,
      });
      setReview({ text: result.review || "", calories: result.calories || 0 });
    } catch (error) {
      showToast(error.message || "Не получилось сохранить", { type: "error" });
    } finally {
      setBusy(false);
    }
  };
  const exerciseRow = (name) => (
    <div className="aiwa-exercise-item" key={name}>
      <AiwaCell
        as="button"
        type="button"
        aria-pressed={selected.includes(name)}
        onClick={() => toggleExercise(name)}
        end={(
          <span className={selected.includes(name) ? "aiwa-check is-active" : "aiwa-check"}>
            {selected.includes(name) ? "✓" : <PlusIcon />}
          </span>
        )}
      >
        <AiwaCell.Text title={name} />
      </AiwaCell>
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
      <AiwaModalView isOpen={isOpen} onClose={onClose} aria-label="Разбор тренировки">
        <div>
          <div className="aiwa-sheet-scroll aiwa-form-stack">
            <div className="aiwa-sheet-card aiwa-workout-review">
              <Text variant="title2" weight="semibold">Тренировка сохранена</Text>
              <Text variant="body" weight="regular">{`Сожжено примерно ${review.calories} ккал.`}</Text>
              {review.text ? <Text variant="body" weight="regular">{review.text}</Text> : null}
            </div>
            <AiwaButton label="Понятно" isFill {...actionProps("Закрыть разбор", onClose)} />
          </div>
        </div>
      </AiwaModalView>
    );
  }

  return (
    <AiwaModalView isOpen={isOpen} onClose={onClose} aria-label="Отметить тренировку">
      <div>
        <div className="aiwa-sheet-scroll aiwa-form-stack">
          <Field
            label="Когда"
            type="date"
            min={workoutWritableStart(todayIso)}
            max={todayIso}
            value={date}
            onChange={setDate}
          />
          <ChoicePills surface="canvas" label="Что делала" options={typeOptions} value={type} onChange={(value) => { setType(value); setSelected([]); }} />
          {type === "Своё" ? (
            <Field label="Название тренировки" value={customType} onChange={setCustomType} placeholder="Напр. Сквош" />
          ) : null}
          <div className="aiwa-workout-exercises">
            <SectionList>
              <SectionList.Item header="Упражнения">
                {strength ? Object.keys(WORKOUT_GROUPS).map((group) => {
                  const chosen = WORKOUT_GROUPS[group].filter((name) => selected.includes(name)).length;
                  const opened = openGroup === group;
                  const groupEnd = chosen ? (
                    <Text variant="caption1" weight="regular">{`выбрано ${chosen}`}</Text>
                  ) : opened ? (
                    <Text variant="caption1" weight="regular">—</Text>
                  ) : (
                    <span className="aiwa-exercise-add-icon" aria-hidden="true"><PlusIcon /></span>
                  );
                  return (
                    <div className="aiwa-exercise-item" key={group}>
                      <AiwaCell
                        as="button"
                        type="button"
                        data-aiwa-exercise-group="true"
                        aria-expanded={opened}
                        onClick={() => setOpenGroup(opened ? "" : group)}
                        end={groupEnd}
                      >
                        <AiwaCell.Text title={group} bold />
                      </AiwaCell>
                      {opened ? WORKOUT_GROUPS[group].map(exerciseRow) : null}
                    </div>
                  );
                }) : (WORKOUT_EXERCISES[type] || []).map(exerciseRow)}
                <AiwaCell data-aiwa-exercise-custom="true" tappable={false}>
                  <Text variant="caption1" weight="regular">Добавить своё</Text>
                  <AiwaCell.Editable label="Название упражнения" value={custom} onChange={setCustom} />
                </AiwaCell>
              </SectionList.Item>
            </SectionList>
          </div>
          <ChoicePills surface="canvas" label="Длительность" options={["30 мин", "45 мин", "60+ мин"]} value={duration} onChange={setDuration} />
          <ChoicePills surface="canvas" label="Как ощущалось" options={["Легко", "Нормально", "Тяжело"]} value={rpe} onChange={setRpe} />
          <AiwaButton
            label="Сохранить и разобрать"
            loading={busy}
            isFill
            {...actionProps("Сохранить и разобрать", save)}
          />
        </div>
      </div>
    </AiwaModalView>
  );
}
