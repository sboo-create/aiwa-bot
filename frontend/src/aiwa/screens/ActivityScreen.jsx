import { useEffect, useRef, useState } from "react";
import { TMAProvider, Page, SectionList } from "../lib/tma";
import { AiwaButton } from "../components/AiwaButton";
import { ScreenLoading } from "../components/ScreenLoading";
import { AiwaInsightCard } from "../components/AiwaInsightCard";
import { PaperRow } from "../components/PaperRow";
import { ScreenDayHeader } from "../components/ScreenDayHeader";
import { isWorkoutDateWritable, WorkoutPanel } from "../panels/WorkoutPanel";
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
  ["йог", "Йога"], ["растяж", "Растяжка"], ["стретч", "Растяжка"], ["мобил", "Растяжка"], ["пилатес", "Пилатес"],
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
  const [data, refresh, patch, screenErrors] = useScreenData(KEYS, [mode, revision]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [panel, setPanel] = useState("");
  const [suggested, setSuggested] = useState(null);
  const [trainIcons, setTrainIcons] = useState({});
  const selectedIso = useSelectedDay();
  const today = todayIso();
  const writableDay = isWorkoutDateWritable(selectedIso, today);
  // Ключа нет = день ещё не запрашивали. Каждый загружавшийся день хранит
  // явный status, поэтому network/API error никогда не выглядит как empty.
  const [dayWorkouts, setDayWorkouts] = useState({});
  const dayWorkoutsRef = useRef({});
  const dayRequestSequence = useRef(0);
  const activeDayRequests = useRef({});
  const [dayRequestRevision, setDayRequestRevision] = useState(0);
  const lastHero = useRef(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  useEffect(() => {
    fetch("/assets/train/manifest.json?v=2")
      .then((r) => (r.ok ? r.json() : {}))
      .then((icons) => setTrainIcons(icons || {}))
      .catch(() => {});
  }, []);

  // Дни текущей недели приезжают вместе со счётчиками экрана. Нулевой счётчик
  // уже является загруженным пустым днём; остальные дни запрашиваются один раз
  // и остаются в кэше. Ошибка — отдельное состояние с явным retry.
  useEffect(() => {
    if (!data.train || !selectedIso || selectedIso === today) return;
    const inWeek = (data.train?.week || []).find((day) => day.d === selectedIso);
    if (inWeek && Number(inWeek.count || 0) === 0) return undefined;
    if (Object.prototype.hasOwnProperty.call(dayWorkoutsRef.current, selectedIso)) return undefined;

    const requestId = ++dayRequestSequence.current;
    activeDayRequests.current = { ...activeDayRequests.current, [selectedIso]: requestId };
    dayWorkoutsRef.current = {
      ...dayWorkoutsRef.current,
      [selectedIso]: { status: "loading", workouts: [] },
    };
    setDayWorkouts(dayWorkoutsRef.current);

    const settle = (entry) => {
      if (activeDayRequests.current[selectedIso] !== requestId) return;
      dayWorkoutsRef.current = { ...dayWorkoutsRef.current, [selectedIso]: entry };
      if (mounted.current) setDayWorkouts(dayWorkoutsRef.current);
    };

    apiCall("/api/train_day", { d: selectedIso })
      .then((result) => {
        if (!result?.ok || (result.d && result.d !== selectedIso)) {
          settle({
            status: "error",
            workouts: [],
            message: result?.text || "Не получилось загрузить тренировки.",
          });
          return;
        }
        settle({
          status: "loaded",
          workouts: Array.isArray(result.workouts) ? result.workouts : [],
        });
      })
      .catch((error) => settle({
        status: "error",
        workouts: [],
        message: error?.message || "Не получилось загрузить тренировки.",
      }));
  }, [selectedIso, today, data.train, dayRequestRevision]);

  // A confirmed mutation is authoritative even if the following `/api/train`
  // revalidation fails. Patch its canonical week/today payload immediately and
  // keep the past day in an explicit loading/error state until `/api/train_day`
  // returns the canonical saved row.
  const reloadTrain = async (mutation) => {
    const mutationDate = String(mutation?.date || "");
    const hasMutation = Boolean(mutation?.ok && mutationDate);
    if (hasMutation && (Array.isArray(mutation.week) || Array.isArray(mutation.today))) {
      patch("train", {
        ...(data.train || {}),
        ...(Array.isArray(mutation.week) ? { week: mutation.week } : {}),
        ...(Array.isArray(mutation.today) ? { today: mutation.today } : {}),
      });
    }

    // Invalidate a pre-save day request before it can settle stale data over the
    // mutation receipt. The host must return the saved row/id/date in Phase 3;
    // until then we never fabricate a row from the request (notably `Своё`).
    const mutationRequestId = hasMutation && mutationDate !== today
      ? ++dayRequestSequence.current
      : 0;
    if (mutationRequestId) {
      activeDayRequests.current = {
        ...activeDayRequests.current,
        [mutationDate]: mutationRequestId,
      };
      dayWorkoutsRef.current = {
        ...dayWorkoutsRef.current,
        [mutationDate]: { status: "loading", workouts: [] },
      };
      setDayWorkouts(dayWorkoutsRef.current);
    }

    await refresh("train").catch(() => null);

    if (mutationRequestId) {
      const refreshed = await apiCall("/api/train_day", { d: mutationDate }).catch(() => null);
      if (activeDayRequests.current[mutationDate] !== mutationRequestId) return;
      const entry = refreshed?.ok && (!refreshed.d || refreshed.d === mutationDate)
        ? {
          status: "loaded",
          workouts: Array.isArray(refreshed.workouts) ? refreshed.workouts : [],
        }
        : {
          status: "error",
          workouts: [],
          message: refreshed?.text || "Тренировка сохранена, но день не удалось обновить.",
        };
      dayWorkoutsRef.current = { ...dayWorkoutsRef.current, [mutationDate]: entry };
      if (mounted.current) setDayWorkouts(dayWorkoutsRef.current);
    }
  };

  const retryDay = (iso) => {
    if (!iso || iso === today) return;
    const next = { ...dayWorkoutsRef.current };
    delete next[iso];
    delete activeDayRequests.current[iso];
    dayWorkoutsRef.current = next;
    setDayWorkouts(next);
    setDayRequestRevision((value) => value + 1);
  };

  const screenError = screenErrors.trainingSection || screenErrors.train;
  const retryScreen = () => refresh(...KEYS.filter((key) => screenErrors[key]));
  if (!data.trainingSection || !data.train) {
    if (!screenError) return <ScreenLoading title="Нагрузка" variant="activity" />;
    return (
      <TMAProvider>
        <Page mode="secondary">
          <div className="aiwa-paper-screen aiwa-activity-screen">
            <SectionList className="aiwa-tma-blocks">
              <SectionList.Item header="Нагрузка">
                <PaperRow
                  title="Не удалось загрузить данные"
                  description="Нажми, чтобы попробовать ещё раз."
                  onClick={retryScreen}
                />
              </SectionList.Item>
            </SectionList>
          </div>
        </Page>
      </TMAProvider>
    );
  }

  const section = data.trainingSection;
  const trainState = data.train;
  const plan = section.training || {};
  const options = (plan.options || []).slice(0, 4);
  const todayWorkouts = trainState.today || [];
  const week = trainState.week || [];
  const weekRows = week.filter((day) => day.count).slice(-3).reverse();
  const weekWorkouts = week.reduce((total, day) => total + (day.count || 0), 0);
  const openWorkout = (option = null) => {
    if (!writableDay) return false;
    setSuggested(option);
    setPanel("workout");
    return true;
  };
  const viewingPast = selectedIso !== today;
  const knownDay = (iso) => {
    const inWeek = week.find((day) => day.d === iso);
    if (inWeek && Number(inWeek.count || 0) === 0) {
      return { status: "loaded", workouts: [] };
    }
    return Object.prototype.hasOwnProperty.call(dayWorkouts, iso) ? dayWorkouts[iso] : undefined;
  };
  const dayCount = (iso) => {
    const inWeek = week.find((day) => day.d === iso);
    if (inWeek) return Number(inWeek.count || 0);
    const known = knownDay(iso);
    return known?.status === "loaded" ? known.workouts.length : null;
  };
  const weekHero = { value: String(weekWorkouts), label: `${workoutsWord(weekWorkouts)} на этой неделе` };
  const unavailableHero = { value: "—", label: "Данные за этот день недоступны" };
  const dayHero = (iso) => {
    if (iso === today) return weekHero;
    if (knownDay(iso)?.status === "error") return unavailableHero;
    const count = dayCount(iso);
    return count === null ? null : { value: String(count), label: `${workoutsWord(count)} в этот день` };
  };
  const resolvedHero = viewingPast ? dayHero(selectedIso) : weekHero;
  const hero = resolvedHero || lastHero.current || weekHero;
  if (resolvedHero && resolvedHero !== unavailableHero) lastHero.current = resolvedHero;

  const dayLabel = viewingPast ? `Тренировки за ${dayTitle(selectedIso)}` : "Прошедшие тренировки";
  const selectedDay = viewingPast ? knownDay(selectedIso) : null;
  const loadingPast = viewingPast && (!selectedDay || selectedDay.status === "loading");
  const errorPast = viewingPast && selectedDay?.status === "error";
  const shownWorkouts = viewingPast
    ? (selectedDay?.status === "loaded" ? selectedDay.workouts : [])
    : todayWorkouts.slice().reverse();

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
            action={writableDay ? (
              <AiwaButton
                label={<span className="aiwa-btn-icon-label"><PlusIcon /> Отметить тренировку</span>}
                {...actionProps("Отметить тренировку", () => openWorkout())}
              />
            ) : (
              <AiwaButton
                variant="secondaryCanvas"
                label="Этот день доступен только для просмотра"
                disabled
                isFill
              />
            )}
          />

          {/* ── TMA BLOCKS ── */}
          <SectionList className="aiwa-tma-blocks">
            {screenError ? (
              <SectionList.Item>
                <PaperRow
                  title="Не удалось обновить данные"
                  description="Показываем последнюю сохранённую версию. Нажми, чтобы повторить."
                  onClick={retryScreen}
                />
              </SectionList.Item>
            ) : null}
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
                    onClick={writableDay ? () => openWorkout(option) : undefined}
                  />
                ))}
              </SectionList.Item>
            ) : null}

            <SectionList.Item header={dayLabel}>
              {loadingPast ? (
                <PaperRow loading title="Загружаю…" description="Тренировки за выбранный день" />
              ) : null}
              {errorPast ? (
                <PaperRow
                  title="Повторить загрузку тренировок"
                  description={selectedDay.message}
                  onClick={() => retryDay(selectedIso)}
                />
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
                  onClick={viewingPast ? undefined : () => setPanel("history")}
                />
              )) : loadingPast || errorPast ? null : viewingPast ? (
                <PaperRow
                  title="В этот день тренировок нет"
                  description={writableDay
                    ? "Выбери другой день или отметь тренировку."
                    : "Этот день доступен только для просмотра."}
                />
              ) : weekRows.length ? weekRows.map((day) => (
                <PaperRow
                  key={day.d}
                  title={day.type || "Тренировка"}
                  description={`${day.d} · ${day.count} запись`}
                  onClick={writableDay ? () => setPanel("history") : undefined}
                />
              )) : (
                <PaperRow
                  title="История пока пуста"
                  description="Отметь первую тренировку — Айва подготовит разбор."
                  onClick={() => setPanel("history")}
                />
              )}
            </SectionList.Item>

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
          <WorkoutPanel
            isOpen={writableDay && panel === "workout"}
            onClose={() => setPanel("")}
            onSaved={reloadTrain}
            suggested={suggested}
            favoriteTypes={trainState.favorite_types || []}
            initialDate={selectedIso}
          />
          <WorkoutVariantsPanel
            isOpen={writableDay && panel === "variants"}
            onClose={() => setPanel("")}
            options={options}
            onSelect={(option) => openWorkout(option)}
          />
          <WorkoutHistoryPanel
            isOpen={!viewingPast && panel === "history"}
            onClose={() => setPanel("")}
            state={trainState}
            onAdd={() => openWorkout()}
          />
          <TrainingProfilePanel isOpen={panel === "profile"} onClose={() => setPanel("")} profile={trainState.profile} onSaved={reloadTrain} />
        </div>
      </Page>
    </TMAProvider>
  );
}
