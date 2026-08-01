import { useEffect, useRef, useState } from "react";
import { TMAProvider, Page, RegularButton, SectionList } from "../lib/tma";
import { ScreenLoading } from "../components/ScreenLoading";
import { MacroCard } from "../components/MacroCard";
import { CalorieGauge } from "../components/CalorieGauge";
import { AiwaInsightCard } from "../components/AiwaInsightCard";
import { AiwaButton } from "../components/AiwaButton";
import { PaperRow } from "../components/PaperRow";
import { ActionMenu } from "../components/ActionMenu";
import { ScreenDayHeader } from "../components/ScreenDayHeader";
import { AddFoodPanel } from "../panels/AddFoodPanel";
import { FoodDiaryPanel } from "../panels/FoodDiaryPanel";
import { RecipePanel } from "../panels/RecipePanel";
import { CalendarPanel } from "../panels/CalendarPanel";
import { PlusIcon, ImageIcon, TextIcon } from "../lib/icons";
import { MEAL_IMAGE } from "../lib/constants";
import { apiCall, showToast, openBotChat, fmtKcal, actionProps, read } from "../lib/api";
import { useScreenData } from "../lib/screenData";
import { ProfilePanel } from "../panels/ProfilePanel";
import { dayTitle, todayIso, useSelectedDay } from "../lib/selectedDay";

// Ответы прогреваются на старте, поэтому обычно экран открывается сразу;
// пока данных нет — на их месте скелетон той же раскладки.
const KEYS = ["foodSection", "diary"];

// Сгенерированные 3d-иконки блюд. Манифест "название -> файл" пишет
// scripts/gen_food_icons.py. Названия из дневника и меню свободные, поэтому
// точное совпадение дополняем подбором по началам слов («куриная грудка» →
// «Курица с рисом» не нужен, но «Омлет с зеленью» → «Омлет с овощами» да).
const normDish = (value) => String(value || "").toLowerCase().replace(/ё/g, "е");
const ICON_VERSION = "?v=2";
const ROOT_FOOD_ASSET = /^\/assets\/food\/[^/]+\.(?:png|jpe?g|webp|gif|svg|avif)$/i;
const rootFoodImage = (value) => {
  const path = String(value || "").split(/[?#]/, 1)[0];
  return ROOT_FOOD_ASSET.test(path) ? value : null;
};
const dishWords = (value) => normDish(value).split(/[^а-яa-z0-9]+/).filter((w) => w.length >= 3);
const sameRoot = (a, b) => {
  const len = Math.min(4, a.length, b.length);
  return a.slice(0, len) === b.slice(0, len);
};

/**
 * Иконка по названию блюда. Скоринг двусторонний: считаем, какая ДОЛЯ слов
 * ключа совпала со словами запроса — «Суп куриный с лапшой» выбирает
 * «Куриный суп» (совпали оба слова ключа), а не «Курица с рисом» (одно из двух).
 */
const dishImageFrom = (icons, name) => {
  const n = normDish(name).trim();
  if (!icons || !n) return null;
  const exact = icons[String(name || "").trim()];
  if (exact) return exact + ICON_VERSION;
  const queryWords = dishWords(name);
  if (!queryWords.length) return null;
  let best = null;
  let bestMatched = 0;
  let bestShare = 0;
  for (const [key, file] of Object.entries(icons)) {
    const k = normDish(key);
    if (k === n) return file + ICON_VERSION;
    const keyWords = dishWords(key);
    if (!keyWords.length) continue;
    const matched = keyWords.filter((kw) => queryWords.some((qw) => sameRoot(kw, qw))).length;
    const share = matched / keyWords.length;
    if (matched > 0 && (share > bestShare || (share === bestShare && matched > bestMatched))) {
      bestShare = share;
      bestMatched = matched;
      best = file;
    }
  }
  return bestShare >= 0.5 ? best + ICON_VERSION : null;
};

/**
 * Food:
 * - HEADER: общая шапка дня (аватар, дата, календарь, барабан) + гейдж, макросы и CTA
 * - BLOCKS (TMA): recommendations list, past meals
 */
export function FoodScreen({ mode, revision = 0 }) {
  const [data, refresh, patch] = useScreenData(KEYS, [mode, revision]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [foodIcons, setFoodIcons] = useState({});
  // Выбранный день общий для всех табов; дневник за прошлый день догружается
  // отдельным запросом и складывается сюда, чтобы возврат к нему был мгновенным.
  const selectedIso = useSelectedDay();
  const today = todayIso();
  const [dayDiaries, setDayDiaries] = useState({});
  // Рецепт открытого блюда из рекомендаций.
  const [recipeItem, setRecipeItem] = useState(null);
  const [recipeBusy, setRecipeBusy] = useState(false);
  // Разбор питания за неделю: текст от модели, кэшируется на беке на день.
  const [weekReview, setWeekReview] = useState(null);
  const [weekBusy, setWeekBusy] = useState(false);
  const [panel, setPanel] = useState("");
  const [editingMeal, setEditingMeal] = useState(null);
  const [uploading, setUploading] = useState(false);
  const photoInputRef = useRef(null);
  const lastDiary = useRef(null);
  const failedDays = useRef(new Set());

  // Меню генерится моделью и может приехать позже открытия экрана — пока его
  // нет, перечитываем секцию с бэкофом, чтобы блюда появились сами.
  const menuMissing = Boolean(data.foodSection) && !(data.foodSection.menu?.meals || []).length;
  const menuRetry = useRef(0);
  useEffect(() => {
    if (!menuMissing) { menuRetry.current = 0; return undefined; }
    if (menuRetry.current >= 5) return undefined;
    const delay = [1500, 3000, 5000, 9000, 15000][menuRetry.current];
    const timer = setTimeout(() => {
      menuRetry.current += 1;
      refresh("foodSection");
    }, delay);
    return () => clearTimeout(timer);
  }, [menuMissing, data.foodSection]);

  useEffect(() => {
    fetch("/assets/food/manifest.json?v=2")
      .then((r) => (r.ok ? r.json() : {}))
      .then((icons) => setFoodIcons(Object.fromEntries(
        Object.entries(icons || {}).filter(([, file]) => rootFoodImage(file)),
      )))
      .catch(() => {});
  }, []);

  // Неделя назад приезжает вместе с сегодняшним дневником (`recent`), всё
  // старше — отдельным запросом, один раз на день. Упавший запрос кладёт пустой
  // день, чтобы шапка не осталась в загрузке, и помечается на перезапрос.
  const recent = data.diary?.recent || {};
  useEffect(() => {
    if (!selectedIso || selectedIso === today) return undefined;
    if (recent[selectedIso]) return undefined;
    if (dayDiaries[selectedIso] && !failedDays.current.has(selectedIso)) return undefined;
    let alive = true;
    failedDays.current.delete(selectedIso);
    apiCall("/api/diary", { d: selectedIso })
      .then((result) => {
        if (!alive) return;
        const ok = result && !result.error;
        if (!ok) failedDays.current.add(selectedIso);
        setDayDiaries((current) => ({ ...current, [selectedIso]: ok ? result : { meals: [], totals: {} } }));
      })
      .catch(() => {
        if (!alive) return;
        failedDays.current.add(selectedIso);
        setDayDiaries((current) => ({ ...current, [selectedIso]: { meals: [], totals: {} } }));
      });
    return () => { alive = false; };
  }, [selectedIso, data.diary]);

  // Дневник обновляется после правок сам, меню от Айвы — только по ревизии экрана.
  const reloadDiary = () => refresh("diary");

  if (!data.foodSection || !data.diary) return <ScreenLoading variant="food" />;

  const section = data.foodSection;
  const diary = data.diary;
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
    .filter((item) => item.meal)
    .map((item) => ({
      ...item,
      image: rootFoodImage(item.meal.image) || dishImageFrom(foodIcons, item.meal.dish) || MEAL_IMAGE,
    }));
  /** Дневник за день: сегодняшний живой, прошлые — из недельной пачки или кэша. */
  const dayDiary = (iso) => (iso === today ? diary : (dayDiaries[iso] || recent[iso] || null));
  const viewingPast = selectedIso !== today;
  const selectedDiary = dayDiary(selectedIso);
  // Пока день едет с сервера, в шапке остаются цифры предыдущего — иначе гейдж
  // на каждом обороте барабана мигал бы нулями.
  if (selectedDiary) lastDiary.current = selectedDiary;
  const shownMeals = viewingPast
    ? (selectedDiary?.meals || [])
    : (diary.meals || []).slice().reverse();
  const historyTitle = viewingPast ? `Приёмы за ${dayTitle(selectedIso)}` : "Прошедшие приёмы";
  const historyLoading = uploading || (viewingPast && !selectedDiary);
  const showHistory = shownMeals.length > 0 || historyLoading;

  /* Всё до жёлтой кнопки живёт по выбранному дню: гейдж и макросы перерисовываются
     под пальцем, как счётчик на главной. Цель по КБЖУ дневная, поэтому берётся
     из дня, а если сервер её не прислал — из сегодняшней. */
  const dayHero = (iso) => {
    const day = dayDiary(iso) || lastDiary.current || diary;
    const dayTotals = day.totals || {};
    const dayTarget = day.target || target;
    const macro = (key) => Number(dayTotals[key] || 0);
    return (
      <div className="aiwa-day-hero" data-loading={dayDiary(iso) ? undefined : "true"}>
        <CalorieGauge kcal={Number(dayTotals.kcal || 0)} kcalTarget={Number(dayTarget.kcal || section.kcal || 0)} />
        <div className="aiwa-macro-grid">
          <MacroCard label="Жиры" value={macro("fat")} target={dayTarget.fat} macro="fat" />
          <MacroCard label="Белки" value={macro("protein")} target={dayTarget.protein} macro="protein" />
          <MacroCard label="Углеводы" value={macro("carbs")} target={dayTarget.carbs} macro="carbs" />
        </div>
      </div>
    );
  };

  const requestWeekReview = async () => {
    if (weekBusy) return;
    setWeekBusy(true);
    try {
      const result = await apiCall("/api/week_food_review", {}).catch(() => null);
      if (result?.review?.summary) setWeekReview(result.review);
      else setWeekReview({ summary: result?.text || "Не получилось собрать разбор, попробуй чуть позже.", gaps: [], tips: [] });
    } finally {
      setWeekBusy(false);
    }
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
          <ScreenDayHeader
            hero={dayHero}
            previewDay={dayDiary}
            onProfile={() => setProfileOpen(true)}
            onCalendar={() => setCalendarOpen(true)}
            action={(
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
            )}
          />

          {/* ── TMA BLOCKS ── */}
          <SectionList className="aiwa-tma-blocks">
            <AiwaInsightCard
              message={section.text || "Выбираем простую еду с белком в каждом приёме."}
              onDiscuss={() => openBotChat({ topic: "food" })}
            />
            {menuMissing ? (
              <SectionList.Item header="Меню на сегодня">
                <PaperRow loading title="Айва собирает меню…" description="Завтрак, обед и ужин под фазу" />
              </SectionList.Item>
            ) : null}
            {recommended.length ? (
              <SectionList.Item header="Меню на сегодня">
                {recommended.map((item) => (
                  <PaperRow
                    key={item.value}
                    image={item.image}
                    title={item.meal.dish || "Рекомендация Айвы"}
                    description={[item.label, item.meal.kcal, item.meal.note].filter(Boolean).join(" · ")}
                    onClick={() => setRecipeItem(item)}
                  />
                ))}
              </SectionList.Item>
            ) : null}

            {showHistory ? (
              <SectionList.Item header={historyTitle}>
                {uploading ? (
                  <PaperRow loading title="Разбираю фото…" description="Айва считает КБЖУ" />
                ) : null}
                {viewingPast && !selectedDiary ? (
                  <PaperRow loading title="Загружаю…" description="Дневник за выбранный день" />
                ) : null}
                {shownMeals.map((meal) => (
                  <PaperRow
                    key={meal.id}
                    image={dishImageFrom(foodIcons, meal.title) || MEAL_IMAGE}
                    title={meal.title}
                    description={`${fmtKcal(meal.kcal)} · Б${Math.round(meal.protein || 0)} · Ж${Math.round(meal.fat || 0)} · У${Math.round(meal.carbs || 0)}`}
                    onClick={viewingPast ? undefined : () => setPanel("diary")}
                  />
                ))}
                {weekReview ? (
                  <>
                    <AiwaInsightCard message={weekReview.summary} />
                    {weekReview.gaps?.length ? (
                      <>
                        <PaperRow title="Чего не хватает" description="" />
                        {weekReview.gaps.map((gap) => (
                          <PaperRow key={gap} title={gap} />
                        ))}
                      </>
                    ) : null}
                    {weekReview.tips?.length ? (
                      <>
                        <PaperRow title="Советы на неделю" description="" />
                        {weekReview.tips.map((tip, index) => (
                          <PaperRow key={tip} title={`${index + 1}. ${tip}`} />
                        ))}
                      </>
                    ) : null}
                  </>
                ) : null}
                <div className="aiwa-cell-actions aiwa-week-review-cta">
                  <AiwaButton
                    label="Разобрать питание за неделю"
                    loading={weekBusy}
                    isFill
                    {...actionProps("Разобрать питание за неделю", requestWeekReview)}
                  />
                </div>
              </SectionList.Item>
            ) : null}
          </SectionList>

          <ProfilePanel isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
          <CalendarPanel
            isOpen={calendarOpen}
            onClose={() => setCalendarOpen(false)}
            mode={mode}
            symptomGroups={read("aiwaSymptomGroups")}
          />
          <AddFoodPanel
            isOpen={panel === "add"}
            onClose={() => setPanel("")}
            onSaved={reloadDiary}
            editingMeal={editingMeal}
          />
          <RecipePanel
            isOpen={Boolean(recipeItem)}
            meal={recipeItem?.meal}
            image={recipeItem?.image}
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
