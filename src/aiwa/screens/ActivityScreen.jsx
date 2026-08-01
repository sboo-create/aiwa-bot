import { useEffect, useRef, useState } from "react";
import { TMAProvider, Page, RegularButton, SectionList } from "../lib/tma";
import { AiwaButton } from "../components/AiwaButton";
import { ScreenLoading } from "../components/ScreenLoading";
import { AiwaInsightCard } from "../components/AiwaInsightCard";
import { PaperRow } from "../components/PaperRow";
import { ScreenDayHeader } from "../components/ScreenDayHeader";
import { WorkoutPanel } from "../panels/WorkoutPanel";
import { WorkoutVariantsPanel } from "../panels/WorkoutVariantsPanel";
import { WorkoutHistoryPanel } from "../panels/WorkoutHistoryPanel";
import { TrainingProfilePanel } from "../panels/TrainingProfilePanel";
import { CalendarPanel } from "../panels/CalendarPanel";
import { actionProps, apiCall, openBotChat, read } from "../lib/api";
import { useScreenData } from "../lib/screenData";
import { ProfilePanel } from "../panels/ProfilePanel";
import { dayTitle, todayIso, useSelectedDay } from "../lib/selectedDay";
import { PlusIcon } from "../lib/icons";

// Ответы прогреваются на старте, поэтому обычно экран открывается сразу;
// пока данных нет — на их месте скелетон той же раскладки.
const KEYS = ["trainingSection", "train"];

const workoutsWord = (count) => {
  const tens = count % 100;
  const ones = count % 10;
  if (tens >= 11 && tens <= 14) return "тренировок";
  if (ones === 1) return "тренировка";
  if (ones >= 2 && ones <= 4) return "тренировки";
  return "тренировок";
};

// 3d-иконки инвентаря (assets/train): тип или группа → файл из манифеста.
// Названия вариантов свободные («Лёгкая силовая», «Прогулка в парке»), поэтому
// точное совпадение дополняем словарём корней.
const TRAIN_SYNONYMS = [
  ["силов", "Силовая"], ["ходь", "Ходьба"], ["прогул", "Прогулка"], ["шаг", "Ходьба"],
  ["бег", "Бег"], ["кардио", "Кардио"], ["велос", "Велотренажёр"], ["велотрен", "Велотренажёр"],
  ["эллипс", "Эллипс"], ["греб", "Гребля"], ["скакал", "Скакалка"],
  ["йог", "Йога"], ["растяж", "Растяжка"], ["стретч", "Растяжка"], ["мобил", "Растяжка"], ["пилатес", "Йога"],
  ["плава", "Плавание"], ["бассейн", "Плавание"], ["отдых", "Отдых"], ["восстанов", "Отдых"],
];
const trainIcon = (icons, ...keys) => {
  if (!icons) return null;
  for (const key of keys) {
    const hit = icons[String(key || "").trim()];
    if (hit) return hit + "?v=1";
  }
  const text = keys.filter(Boolean).join(" ").toLowerCase();
  for (const [name, file] of Object.entries(icons)) {
    if (text.includes(name.toLowerCase())) return file + "?v=1";
  }
  for (const [root, name] of TRAIN_SYNONYMS) {
    if (text.includes(root) && icons[name]) return icons[name] + "?v=1";
  }
  return icons["Силовая"] && /трениров/.test(text) ? icons["Силовая"] + "?v=1" : null;
};

/**
 * Activity:
 * - HEADER: общая шапка дня (аватар, дата, календарь, барабан) + счётчик и primary CTA
 * - BLOCKS (TMA): AI intro card, option rows, history, profile link
 */
export function ActivityScreen({ mode, revision = 0 }) {
  const [data, refresh] = useScreenData(KEYS, [mode, revision]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [panel, setPanel] = useState("");
  const [suggested, setSuggested] = useState(null);
  const [trainIcons, setTrainIcons] = useState({});
  // Выбранный день общий для всех табов; тренировки за прошлый день грузятся
  // отдельно и остаются в кэше, чтобы возврат к нему был мгновенным.
  const selectedIso = useSelectedDay();
  const today = todayIso();
  const [dayWorkouts, setDayWorkouts] = useState({});
  const lastHero = useRef(null);
  const failedDays = useRef(new Set());
  useEffect(() => {
    fetch("/assets/train/manifest.json?v=1")
      .then((r) => (r.ok ? r.json() : {}))
      .then((icons) => setTrainIcons(icons || {}))
      .catch(() => {});
  }, []);

  // Дни текущей недели приезжают вместе с состоянием экрана, поэтому запрос
  // нужен только за днями старше понедельника — и только один раз на день.
  // Упавший запрос считается пустым днём, но помечается на перезапрос.
  const weekDays = data.train?.week || [];
  const known = (iso) => (weekDays.find((day) => day.d === iso)?.count === 0 ? [] : dayWorkouts[iso]);
  useEffect(() => {
    if (!selectedIso || selectedIso === today) return undefined;
    if (known(selectedIso) && !failedDays.current.has(selectedIso)) return undefined;
    let alive = true;
    failedDays.current.delete(selectedIso);
    const settle = (workouts, ok) => {
      if (!alive) return;
      if (!ok) failedDays.current.add(selectedIso);
      setDayWorkouts((current) => ({ ...current, [selectedIso]: workouts }));
    };
    apiCall("/api/train_day", { d: selectedIso })
      .then((result) => settle(result?.workouts || [], Boolean(result?.ok)))
      .catch(() => settle([], false));
    return () => { alive = false; };
  }, [selectedIso, data.train]);

  // Отметки и профиль перечитываем сразу, разбор от Айвы — только по ревизии экрана.
  const reloadTrain = () => refresh("train");

  if (!data.trainingSection || !data.train) return <ScreenLoading variant="activity" />;

  const section = data.trainingSection;
  const trainState = data.train;
  const plan = section.training || {};
  const options = (plan.options || []).slice(0, 4);
  const todayWorkouts = trainState.today || [];
  const week = trainState.week || [];
  const weekRows = week.filter((day) => day.count).slice(-3).reverse();
  const weekWorkouts = week.reduce((total, day) => total + (day.count || 0), 0);
  const openWorkout = (option = null) => {
    setSuggested(option);
    setPanel("workout");
  };
  const viewingPast = selectedIso !== today;

  /**
   * Сколько тренировок в дне, если это известно без запроса: текущая неделя
   * приходит с числом на каждый день, остальное — из кэша. `null` — «ещё не
   * знаю», барабан на таком дне счётчик не меняет.
   */
  const dayCount = (iso) => {
    const inWeek = week.find((day) => day.d === iso);
    if (inWeek) return inWeek.count || 0;
    const cached = dayWorkouts[iso];
    return cached ? cached.length : null;
  };
  const dayHero = (iso) => {
    const count = dayCount(iso);
    return count === null ? null : { value: String(count), label: `${workoutsWord(count)} в этот день` };
  };
  // Сегодня считается неделей целиком — так экран отвечает на «сколько я уже
  // сделала», а не «сделала ли сегодня».
  const weekHero = { value: String(weekWorkouts), label: `${workoutsWord(weekWorkouts)} на этой неделе` };
  const hero = (viewingPast ? dayHero(selectedIso) : weekHero) || lastHero.current || weekHero;
  lastHero.current = hero;

  const dayLabel = viewingPast ? `Тренировки за ${dayTitle(selectedIso)}` : "Прошедшие тренировки";
  const selectedWorkouts = viewingPast ? known(selectedIso) : todayWorkouts.slice().reverse();
  const shownWorkouts = selectedWorkouts || [];
  const showWorkoutHistory = viewingPast
    ? !selectedWorkouts || shownWorkouts.length > 0
    : todayWorkouts.length > 0 || weekRows.length > 0;

  return (
    <TMAProvider>
      <Page mode="secondary">
        <div className="aiwa-paper-screen aiwa-activity-screen">
          {/* ── HEADER ── */}
          <ScreenDayHeader
            heroValue={hero.value}
            heroLabel={hero.label}
            previewDay={dayHero}
            onProfile={() => setProfileOpen(true)}
            onCalendar={() => setCalendarOpen(true)}
            action={(
              <RegularButton
                variant="filled"
                label={<span className="aiwa-btn-icon-label"><PlusIcon /> Отметить тренировку</span>}
                {...actionProps("Отметить тренировку", () => openWorkout())}
              />
            )}
          />

          {/* ── TMA BLOCKS ── */}
          <SectionList className="aiwa-tma-blocks">
            <AiwaInsightCard
              message={plan.summary || section.text || "Выбирай нагрузку, после которой станет легче, а не хуже."}
              detail={plan.why}
              onDiscuss={() => openBotChat({ topic: "train" })}
            />
            {options.length ? (
              <SectionList.Item header="Варианты">
                {options.map((option, index) => (
                  <PaperRow
                    key={option.name || index}
                    image={trainIcon(trainIcons, option.name)}
                    title={[option.name || `Вариант ${index + 1}`, option.duration].filter(Boolean).join(" · ")}
                    description={[
                      (option.exercises || []).map((e) => [e.name, e.sets && e.reps ? `${e.sets}×${e.reps}` : ""].filter(Boolean).join(" ")).join(", "),
                      option.tip || option.benefit || option.how || option.detail,
                    ].filter(Boolean).join(" — ")}
                    onClick={() => openWorkout(option)}
                  />
                ))}
              </SectionList.Item>
            ) : null}

            {showWorkoutHistory ? (
              <SectionList.Item header={dayLabel}>
                {viewingPast && !selectedWorkouts ? (
                  <PaperRow loading title="Загружаю…" description="Тренировки за выбранный день" />
                ) : null}
                {shownWorkouts.length ? shownWorkouts.map((workout) => (
                  <PaperRow
                    key={workout.id}
                    image={trainIcon(trainIcons, workout.type)}
                    title={workout.type || "Тренировка"}
                    description={[
                      viewingPast ? "" : "сегодня",
                      workout.duration,
                      workout.kcal ? `${Math.round(workout.kcal)} ккал` : "",
                      String(workout.rpe || "").toLowerCase(),
                    ].filter(Boolean).join(" · ")}
                    onClick={() => setPanel("history")}
                  />
                )) : (viewingPast && !selectedWorkouts) ? null : weekRows.length ? weekRows.map((day) => (
                  <PaperRow
                    key={day.d}
                    title={day.type || "Тренировка"}
                    description={`${day.d} · ${day.count} запись`}
                    onClick={() => setPanel("history")}
                  />
                )) : (
                  <PaperRow
                    title="История пока пуста"
                    description="Отметь первую тренировку — Айва подготовит разбор."
                    onClick={() => setPanel("history")}
                  />
                )}
              </SectionList.Item>
            ) : null}

            <div className="aiwa-page-action">
              <AiwaButton
                variant="secondaryCanvas"
                label="Изменить предпочтения"
                isFill
                {...actionProps("Изменить предпочтения", () => setPanel("profile"))}
              />
            </div>
          </SectionList>

          <ProfilePanel isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
          <CalendarPanel
            isOpen={calendarOpen}
            onClose={() => setCalendarOpen(false)}
            mode={mode}
            symptomGroups={read("aiwaSymptomGroups")}
          />
          <WorkoutPanel isOpen={panel === "workout"} onClose={() => setPanel("")} onSaved={reloadTrain} suggested={suggested} />
          <WorkoutVariantsPanel
            isOpen={panel === "variants"}
            onClose={() => setPanel("")}
            options={options}
            onSelect={(option) => openWorkout(option)}
          />
          <WorkoutHistoryPanel isOpen={panel === "history"} onClose={() => setPanel("")} state={trainState} onAdd={() => openWorkout()} />
          <TrainingProfilePanel isOpen={panel === "profile"} onClose={() => setPanel("")} profile={trainState.profile} onSaved={reloadTrain} />
        </div>
      </Page>
    </TMAProvider>
  );
}
