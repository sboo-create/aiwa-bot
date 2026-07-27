import { useEffect, useState } from "react";
import { TMAProvider, Page, Text, RegularButton, SectionList } from "../lib/tma";
import { ScreenLoading } from "../components/ScreenLoading";
import { AiwaInsightCard } from "../components/AiwaInsightCard";
import { AiwaCell } from "../components/AiwaCell";
import { PaperRow } from "../components/PaperRow";
import { Week } from "../components/Week";
import { WorkoutPanel } from "../panels/WorkoutPanel";
import { WorkoutVariantsPanel } from "../panels/WorkoutVariantsPanel";
import { WorkoutHistoryPanel } from "../panels/WorkoutHistoryPanel";
import { TrainingProfilePanel } from "../panels/TrainingProfilePanel";
import { actionProps, call, openBotChat } from "../lib/api";
import { useScreenData } from "../lib/screenData";
import { historyStrip } from "../lib/historyStrip";
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

/**
 * Month-long strip like on Home: Week scrolls it horizontally, backend days
 * with workouts get the accent mark by iso match.
 */
const overviewStrip = (week) => {
  const marked = new Set((week || []).filter((day) => day.count).map((day) => day.d));
  return historyStrip(30).map((day) => ({ ...day, workout: marked.has(day.iso) }));
};

// 3d-иконки инвентаря (assets/train): тип или группа → файл из манифеста.
const trainIcon = (icons, ...keys) => {
  for (const key of keys) {
    const hit = icons?.[String(key || "").trim()];
    if (hit) return hit + "?v=1";
  }
  const text = keys.filter(Boolean).join(" ").toLowerCase();
  for (const [name, file] of Object.entries(icons || {})) {
    if (text.includes(name.toLowerCase())) return file + "?v=1";
  }
  return null;
};

/**
 * Activity:
 * - HEADER (keep): title + week strip + workouts-this-week hero + primary CTA
 * - BLOCKS (TMA): AI intro card, option rows, history, profile link
 */
export function ActivityScreen({ mode, revision = 0 }) {
  const [data, refresh] = useScreenData(KEYS, [mode, revision]);
  const [panel, setPanel] = useState("");
  const [suggested, setSuggested] = useState(null);
  const [trainIcons, setTrainIcons] = useState({});
  useEffect(() => {
    fetch("/assets/train/manifest.json?v=1")
      .then((r) => (r.ok ? r.json() : {}))
      .then((icons) => setTrainIcons(icons || {}))
      .catch(() => {});
  }, []);

  // Отметки и профиль перечитываем сразу, разбор от Айвы — только по ревизии экрана.
  const reloadTrain = () => refresh("train");

  if (!data.trainingSection || !data.train) return <ScreenLoading title="Нагрузка" variant="activity" />;

  const section = data.trainingSection;
  const trainState = data.train;
  const plan = section.training || {};
  const options = (plan.options || []).slice(0, 4);
  const today = trainState.today || [];
  const week = trainState.week || [];
  const weekRows = week.filter((day) => day.count).slice(-3).reverse();
  const weekWorkouts = week.reduce((total, day) => total + (day.count || 0), 0);
  const openWorkout = (option = null) => {
    setSuggested(option);
    setPanel("workout");
  };

  return (
    <TMAProvider>
      <Page mode="secondary">
        <div className="aiwa-paper-screen aiwa-activity-screen">
          {/* ── HEADER ── */}
          <Text className="aiwa-screen-title" variant="title1" weight="semibold">Нагрузка</Text>
          <div className="aiwa-overview">
            <Week days={overviewStrip(week)} />
            <div className="aiwa-countdown">
              <Text variant="title1" weight="semibold">{weekWorkouts}</Text>
              <Text variant="body" weight="regular">{`${workoutsWord(weekWorkouts)} на этой неделе`}</Text>
            </div>
            <RegularButton
              variant="filled"
              label={<span className="aiwa-btn-icon-label"><PlusIcon /> Отметить тренировку</span>}
              {...actionProps("Отметить тренировку", () => openWorkout())}
            />
          </div>

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

            <SectionList.Item header="Прошедшие тренировки">
              {today.length ? today.slice().reverse().map((workout) => (
                <PaperRow
                  key={workout.id}
                  image={trainIcon(trainIcons, workout.type)}
                  title={workout.type || "Тренировка"}
                  description={[
                    "сегодня",
                    workout.duration,
                    workout.kcal ? `${Math.round(workout.kcal)} ккал` : "",
                    String(workout.rpe || "").toLowerCase(),
                  ].filter(Boolean).join(" · ")}
                  onClick={() => setPanel("history")}
                />
              )) : weekRows.length ? weekRows.map((day) => (
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

            <SectionList.Item>
              <AiwaCell
                as="button"
                type="button"
                onClick={() => setPanel("profile")}
                end={<AiwaCell.Part type="Chevron" />}
              >
                <AiwaCell.Text title="Настроить тренировочный профиль" bold />
              </AiwaCell>
            </SectionList.Item>
          </SectionList>

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
