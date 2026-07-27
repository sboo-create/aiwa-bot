import { useEffect, useRef, useState } from "react";
import { TMAProvider, Page, Text, RegularButton, SectionList } from "../lib/tma";
import { ScreenLoading } from "../components/ScreenLoading";
import { MacroCard } from "../components/MacroCard";
import { CalorieGauge } from "../components/CalorieGauge";
import { AiwaInsightCard } from "../components/AiwaInsightCard";
import { PaperRow } from "../components/PaperRow";
import { ActionMenu } from "../components/ActionMenu";
import { AddFoodPanel } from "../panels/AddFoodPanel";
import { FoodDiaryPanel } from "../panels/FoodDiaryPanel";
import { RecipePanel } from "../panels/RecipePanel";
import { PlusIcon, ImageIcon, TextIcon } from "../lib/icons";
import { MEAL_IMAGE } from "../lib/constants";
import { apiCall, showToast, openBotChat, fmtKcal } from "../lib/api";
import { useScreenData } from "../lib/screenData";
import { Week } from "../components/Week";

// Ответы прогреваются на старте, поэтому обычно экран открывается сразу;
// пока данных нет — на их месте скелетон той же раскладки.
const KEYS = ["foodSection", "diary"];

// Placeholder thumbnail for recommendations until per-dish images ship.
const RECOMMENDATION_IMAGE = "/assets/paper-food-placeholder.png";

// Сгенерированные 3d-иконки блюд. Манифест "название -> файл" пишет
// scripts/gen_food_icons.py. Названия из дневника и меню свободные, поэтому
// точное совпадение дополняем подбором по началам слов («куриная грудка» →
// «Курица с рисом» не нужен, но «Омлет с зеленью» → «Омлет с овощами» да).
const normDish = (value) => String(value || "").toLowerCase().replace(/ё/g, "е");
const dishImageFrom = (icons, name) => {
  const n = normDish(name).trim();
  if (!icons || !n) return null;
  const exact = icons[String(name || "").trim()];
  if (exact) return exact;
  let best = null;
  let bestScore = 0;
  for (const [key, file] of Object.entries(icons)) {
    const k = normDish(key);
    if (k === n) return file;
    const words = k.split(/[^а-яa-z0-9]+/).filter((w) => w.length > 3);
    let score = 0;
    for (const w of words) if (n.includes(w.slice(0, 4))) score += w.length > 5 ? 2 : 1;
    if (score > bestScore) { bestScore = score; best = file; }
  }
  return bestScore >= 2 ? best : null;
};

// Последние 7 дней для мини-календаря истории: сегодня справа.
const DOW = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
const historyWeek = () => {
  const days = [];
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({ iso, date: String(d.getDate()), label: DOW[d.getDay()], today: i === 0 });
  }
  return days;
};
const DAY_LABEL = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });

/**
 * Food:
 * - HEADER (keep): title, gauge, macros, primary add CTA
 * - BLOCKS (TMA): recommendations list, past meals
 */
export function FoodScreen({ mode, revision = 0 }) {
  const [data, refresh, patch] = useScreenData(KEYS, [mode, revision]);
  const [foodIcons, setFoodIcons] = useState({});
  // Просмотр прошлого дня: дневник за выбранную дату грузится отдельно,
  // шапка (гейдж и макросы) всегда остаётся про сегодня.
  const [historyIso, setHistoryIso] = useState("");
  const [historyDiary, setHistoryDiary] = useState(null);
  // Рецепт открытого блюда из рекомендаций.
  const [recipeItem, setRecipeItem] = useState(null);
  const [recipeBusy, setRecipeBusy] = useState(false);
  const [panel, setPanel] = useState("");
  const [editingMeal, setEditingMeal] = useState(null);
  const [uploading, setUploading] = useState(false);
  const photoInputRef = useRef(null);

  useEffect(() => {
    fetch("/assets/food/manifest.json")
      .then((r) => (r.ok ? r.json() : {}))
      .then((icons) => setFoodIcons(icons || {}))
      .catch(() => {});
  }, []);

  // Дневник обновляется после правок сам, меню от Айвы — только по ревизии экрана.
  const reloadDiary = () => refresh("diary");

  if (!data.foodSection || !data.diary) return <ScreenLoading title="Питание" variant="food" />;

  const section = data.foodSection;
  const diary = data.diary;
  const totals = diary.totals || {};
  const target = diary.target || {};
  const menuMeals = section.menu?.meals || [];
  // Меню генерится на 4 приёма (завтрак, обед, перекус, ужин) — в рекомендациях
  // показываем три основных, каждый со своим слотом для записи в дневник.
  const RECO_SLOTS = [
    { index: 0, value: "breakfast", label: "Завтрак" },
    { index: 1, value: "lunch", label: "Обед" },
    { index: menuMeals.length >= 4 ? 3 : 2, value: "dinner", label: "Ужин" },
  ];
  const recommended = RECO_SLOTS
    .map((slot) => ({ ...slot, meal: menuMeals[slot.index] }))
    .filter((item) => item.meal);
  const kcalTarget = Number(target.kcal || section.kcal || 0);
  const kcal = Number(totals.kcal || 0);
  const macroValue = (key) => Number(totals[key] || 0);

  const week = historyWeek();
  const todayIso = week[week.length - 1].iso;
  const viewingPast = Boolean(historyIso && historyIso !== todayIso);
  const shownMeals = viewingPast
    ? (historyDiary?.meals || [])
    : (diary.meals || []).slice().reverse();
  let historyTitle = "Прошедшие приёмы";
  if (viewingPast) {
    const parsed = new Date(`${historyIso}T12:00:00`);
    historyTitle = Number.isNaN(parsed.getTime()) ? "Приёмы за день" : `Приёмы за ${DAY_LABEL.format(parsed)}`;
  }

  const pickHistoryDay = async (day) => {
    const iso = typeof day === "string" ? day : day?.iso || "";
    setHistoryIso(iso);
    if (!iso || iso === todayIso) {
      setHistoryDiary(null);
      return;
    }
    setHistoryDiary(null);
    const result = await apiCall("/api/diary", { d: iso }).catch(() => null);
    setHistoryDiary(result || { meals: [] });
  };

  const addRecommended = async (meal, slot) => {
    if (recipeBusy) return;
    setRecipeBusy(true);
    try {
      const result = await apiCall("/api/food_text", { text: meal.dish || meal.title, slot }).catch(() => null);
      if (result?.ok) {
        showToast("Добавлено в дневник", { type: "success" });
        setRecipeItem(null);
        await reloadDiary();
      } else showToast(result?.message || "Не получилось добавить", { type: "error" });
    } finally {
      setRecipeBusy(false);
    }
  };

  const deleteMeal = async (id) => {
    const result = await apiCall("/api/diary_del", { id }).catch(() => null);
    if (result && !result.error) {
      patch("diary", { meals: result.meals || [], totals: result.totals || {}, target: result.target || target });
      showToast("Приём удалён", { type: "success" });
    }
  };

  const openAdd = () => {
    setEditingMeal(null);
    setPanel("add");
  };

  // Распознавание занимает несколько секунд, поэтому на время загрузки в
  // «Прошедших приёмах» стоит ряд со спиннером — иначе кажется, что тап по
  // «Фото» ничего не сделал.
  const uploadPhoto = async (file) => {
    if (!file || uploading) return;
    setUploading(true);
    try {
      const fn = window.aiwaUploadFoodPhoto;
      if (typeof fn !== "function") throw new Error("Загрузка фото недоступна");
      await fn(file);
      await reloadDiary();
    } catch (error) {
      showToast(error.message || "Не получилось разобрать фото", { type: "error" });
    } finally {
      setUploading(false);
    }
  };

  // "Текстом" hands over to the bot chat, where it has just asked "Что ты скушала?".
  const promptFoodText = async () => {
    await apiCall("/api/food_prompt", {}).catch(() => null);
    openBotChat({ nudge: false });
  };

  // One photo entry, not camera + gallery: the file input hands over to the iOS
  // upload panel, which offers the camera, the library and Files itself. Splitting
  // it here only made the user pick a source twice — WebKit has no way to open the
  // library directly, so the panel is unavoidable for anything but `capture`.
  const addMenuItems = [
    { label: "Фото", icon: <ImageIcon />, onSelect: () => photoInputRef.current?.click() },
    { label: "Текстом", icon: <TextIcon />, onSelect: promptFoodText },
  ];

  return (
    <TMAProvider>
      <Page mode="secondary">
        <div className="aiwa-paper-screen aiwa-food-screen">
          {/* ── HEADER ── */}
          <Text className="aiwa-screen-title" variant="title1" weight="semibold">Питание</Text>
          <CalorieGauge kcal={kcal} kcalTarget={kcalTarget} />
          <div className="aiwa-macro-grid">
            <MacroCard label="Жиры" value={macroValue("fat")} target={target.fat} macro="fat" />
            <MacroCard label="Белки" value={macroValue("protein")} target={target.protein} macro="protein" />
            <MacroCard label="Углеводы" value={macroValue("carbs")} target={target.carbs} macro="carbs" />
          </div>
          <div className="aiwa-screen-cta">
            <ActionMenu
              items={addMenuItems}
              trigger={
                <RegularButton
                  variant="filled"
                  aria-label="Добавить приём"
                  label={<span className="aiwa-btn-icon-label"><PlusIcon /> Добавить приём</span>}
                />
              }
            />
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => { uploadPhoto(event.target.files?.[0]); event.target.value = ""; }}
            />
          </div>

          {/* ── TMA BLOCKS ── */}
          <SectionList className="aiwa-tma-blocks">
            <AiwaInsightCard
              message={section.text || "Выбираем простую еду с белком в каждом приёме."}
              onDiscuss={() => openBotChat({ topic: "food" })}
            />
            {recommended.length ? (
              <SectionList.Item header="Меню на сегодня">
                {recommended.map((item) => (
                  <PaperRow
                    key={item.value}
                    image={item.meal.image || dishImageFrom(foodIcons, item.meal.dish) || RECOMMENDATION_IMAGE}
                    title={item.meal.dish || "Рекомендация Айвы"}
                    description={[item.label, item.meal.kcal, item.meal.note].filter(Boolean).join(" · ")}
                    onClick={() => setRecipeItem(item)}
                  />
                ))}
              </SectionList.Item>
            ) : null}

            <SectionList.Item header={historyTitle}>
              <div className="aiwa-food-history-week">
                <Week days={week} selectedIso={historyIso || todayIso} onSelect={pickHistoryDay} />
              </div>
              {uploading ? (
                <PaperRow loading title="Разбираю фото…" description="Айва считает КБЖУ" />
              ) : null}
              {viewingPast && !historyDiary ? (
                <PaperRow loading title="Загружаю…" description="Дневник за выбранный день" />
              ) : null}
              {shownMeals.length ? shownMeals.map((meal) => (
                <PaperRow
                  key={meal.id}
                  image={dishImageFrom(foodIcons, meal.title) || MEAL_IMAGE}
                  title={meal.title}
                  description={`${fmtKcal(meal.kcal)} · Б${Math.round(meal.protein || 0)} · Ж${Math.round(meal.fat || 0)} · У${Math.round(meal.carbs || 0)}`}
                  onClick={viewingPast ? undefined : () => setPanel("diary")}
                />
              )) : (uploading || (viewingPast && !historyDiary)) ? null : (
                <PaperRow
                  title={viewingPast ? "В этот день записей нет" : "Дневник пока пуст"}
                  description={viewingPast ? "Дневник за этот день пуст." : "Добавь первый приём — фото, текстом или вручную."}
                  onClick={viewingPast ? undefined : () => setPanel("diary")}
                />
              )}
            </SectionList.Item>
          </SectionList>

          <AddFoodPanel
            isOpen={panel === "add"}
            onClose={() => setPanel("")}
            onSaved={reloadDiary}
            editingMeal={editingMeal}
          />
          <RecipePanel
            isOpen={Boolean(recipeItem)}
            meal={recipeItem?.meal}
            slotLabel={recipeItem?.label}
            busy={recipeBusy}
            onClose={() => setRecipeItem(null)}
            onAdd={() => recipeItem && addRecommended(recipeItem.meal, recipeItem.value)}
          />
          <FoodDiaryPanel
            isOpen={panel === "diary"}
            onClose={() => setPanel("")}
            diary={diary}
            onAdd={openAdd}
            onEdit={(meal) => {
              setEditingMeal(meal);
              setPanel("add");
            }}
            onDelete={deleteMeal}
            onReco={async () => {
              const result = await apiCall("/api/diary_reco", {}).catch(() => null);
              showToast(result?.text || "Не удалось собрать совет");
            }}
          />
        </div>
      </Page>
    </TMAProvider>
  );
}
