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
import { PlusIcon, ImageIcon, TextIcon } from "../lib/icons";
import { FOOD_SLOTS, MEAL_IMAGE } from "../lib/constants";
import { apiCall, showToast, openBotChat, call } from "../lib/api";
import { useScreenData } from "../lib/screenData";

// Ответы прогреваются на старте, поэтому обычно экран открывается сразу;
// пока данных нет — на их месте скелетон той же раскладки.
const KEYS = ["foodSection", "diary"];

// Placeholder thumbnail for recommendations until per-dish images ship.
const RECOMMENDATION_IMAGE = "/assets/paper-food-placeholder.png";

// Сгенерированные 3d-иконки блюд (gpt-image-2). Манифест "название -> файл"
// пишет scripts/gen_food_icons.py; здесь просто ищем иконку по названию.
const dishImageFrom = (icons, name) => (icons?.[String(name || "").trim()] || null);

/**
 * Food:
 * - HEADER (keep): title, gauge, macros, primary add CTA
 * - BLOCKS (TMA): recommendations list, past meals
 */
export function FoodScreen({ mode, revision = 0 }) {
  const [data, refresh, patch] = useScreenData(KEYS, [mode, revision]);
  const [foodIcons, setFoodIcons] = useState({});
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
  const recommended = (section.menu?.meals || []).slice(0, 2);
  const meals = (diary.meals || []).slice(-3).reverse();
  const kcalTarget = Number(target.kcal || section.kcal || 1841);
  const kcal = Number(totals.kcal || 1240);

  // Пустой дневник: гейдж и так показывает демо-1240 ккал, поэтому макросы
  // добиваем той же долей от нормы — иначе шапка сама себе противоречит.
  const diaryEmpty = !(diary.meals || []).length;
  const demoShare = kcal / Math.max(1, kcalTarget);
  const macroValue = (key) =>
    diaryEmpty ? Math.round(Number(target[key] || 0) * demoShare) : Number(totals[key] || 0);

  const addRecommended = async (meal, index) => {
    const slot = FOOD_SLOTS[Math.min(index, FOOD_SLOTS.length - 1)].value;
    const result = await apiCall("/api/food_text", { text: meal.dish || meal.title, slot }).catch(() => null);
    if (result?.ok) {
      showToast("Добавлено в дневник", { type: "success" });
      await reloadDiary();
    } else showToast(result?.message || "Не получилось добавить", { type: "error" });
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
              onDiscuss={() => call("go", "chat")}
            />
            {recommended.length ? (
              <SectionList.Item header="Рекомендации">
                {recommended.map((meal, index) => (
                  <PaperRow
                    key={meal.dish || index}
                    image={meal.image || dishImageFrom(foodIcons, meal.dish) || RECOMMENDATION_IMAGE}
                    title={meal.dish || "Рекомендация Айвы"}
                    description={meal.note || meal.kcal || "Подходит под твой план на сегодня"}
                    onClick={() => addRecommended(meal, index)}
                  />
                ))}
              </SectionList.Item>
            ) : null}

            <SectionList.Item header="Прошедшие приёмы">
              {uploading ? (
                <PaperRow loading title="Разбираю фото…" description="Айва считает КБЖУ" />
              ) : null}
              {meals.length ? meals.map((meal) => (
                <PaperRow
                  key={meal.id}
                  image={dishImageFrom(foodIcons, meal.title) || MEAL_IMAGE}
                  title={meal.title}
                  description={`${Math.round(meal.kcal || 0)} ккал · Б${Math.round(meal.protein || 0)} · Ж${Math.round(meal.fat || 0)} · У${Math.round(meal.carbs || 0)}`}
                  onClick={() => setPanel("diary")}
                />
              )) : uploading ? null : (
                <PaperRow
                  title="Дневник пока пуст"
                  description="Добавь первый приём — фото, текстом или вручную."
                  onClick={() => setPanel("diary")}
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
