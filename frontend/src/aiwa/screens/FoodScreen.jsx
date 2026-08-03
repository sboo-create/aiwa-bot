import { useCallback, useEffect, useRef, useState } from "react";
import { TMAProvider, Page, SectionList, Text } from "../lib/tma";
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
import {
  createFoodMutationOrder,
  foodDayAssetRevision,
  foodDayReadFallback,
  foodDiaryForIso,
  mergeTodayDiaryReceipt,
  retireStaleFoodDayAssets,
  resolveFoodDayEntry,
} from "../lib/foodDayCache";
import {
  completeFoodDeleteRequest,
  foodDeleteRequestForMeal,
} from "../lib/foodMutation";

// Ответы прогреваются на старте, поэтому обычно экран открывается сразу;
// пока данных нет — на их месте скелетон той же раскладки.
const KEYS = ["foodSection", "diary"];

// Placeholder thumbnail for recommendations until per-dish images ship.
const RECOMMENDATION_IMAGE = "/assets/food/meal-placeholder.svg";

// Сгенерированные 3d-иконки блюд. Манифест "название -> файл" пишет
// scripts/gen_food_icons.py. Названия из дневника и меню свободные, но после
// v177 разрешено только точное совпадение исходной или нормализованной строки.
const normDish = (value) => String(value || "").toLowerCase().replace(/ё/g, "е").replace(/\s+/g, " ").trim();
const ICON_VERSION = "?v=2";
/**
 * Иконка блюда: только точное совпадение с манифестом (прямое или по
 * нормализованному ключу). Нечёткий подбор по корням слов убран в v177 —
 * он подставлял чужие картинки; вместо него серверные image_url и
 * осмысленная заглушка (напиток/блюдо).
 */
const dishImageFrom = (icons, name) => {
  const n = normDish(name);
  if (!icons || !n) return null;
  const exact = icons[String(name || "").trim()];
  if (exact) return exact + ICON_VERSION;
  for (const [key, file] of Object.entries(icons)) {
    if (normDish(key) === n) return file + ICON_VERSION;
  }
  return null;
};

/** Заглушка по типу приёма: напиткам — стакан, остальному — общее блюдо. */
const foodFallbackImage = (row) => {
  const text = normDish([
    row?.title,
    ...(Array.isArray(row?.items) ? row.items.map((item) => item?.name) : []),
  ].filter(Boolean).join(" "));
  const drink = normDish(row?.fclass) === "напиток"
    || /(кофе|чай|какао|вода|сок|напит|латте|капуч|морс|компот)/.test(text);
  return drink ? "/assets/food/drink-cup.svg?v=1" : RECOMMENDATION_IMAGE;
};

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
const totalsFromMeals = (meals) => (meals || []).reduce((totals, meal) => ({
  kcal: totals.kcal + Number(meal?.kcal || 0),
  protein: totals.protein + Number(meal?.protein || 0),
  fat: totals.fat + Number(meal?.fat || 0),
  carbs: totals.carbs + Number(meal?.carbs || 0),
}), { kcal: 0, protein: 0, fat: 0, carbs: 0 });
/**
 * Food:
 * - HEADER: shared day selector, gauge, macros, primary add CTA
 * - BLOCKS (TMA): recommendations list, past meals
 */
export function FoodScreen({ mode, revision = 0 }) {
  const [data, refresh, patch, screenErrors] = useScreenData(KEYS, [mode, revision]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [foodIcons, setFoodIcons] = useState({});
  // Выбранный день общий для всех табов. Явный status не смешивает ответ с
  // пустым meals и ещё не загруженный день — оба случая важны для шапки.
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
  const [editingMutation, setEditingMutation] = useState(null);
  const [uploading, setUploading] = useState(false);
  const photoInputRef = useRef(null);
  const lastDiary = useRef(null);
  const dayDiariesRef = useRef({});
  const dayRequests = useRef(new Map());
  const dayRequestSequence = useRef(0);
  const latestDayRequest = useRef(new Map());
  const canonicalDiaryRef = useRef(null);
  const canonicalVersion = useRef(0);
  const mutationOrder = useRef(null);
  if (!mutationOrder.current) mutationOrder.current = createFoodMutationOrder();
  const canonicalAssetRevision = Math.max(
    Number(data.foodSection?.asset_revision || 0),
    Number(data.diary?.asset_revision || 0),
  );
  const diaryAssetRevision = Number(data.diary?.asset_revision || 0);
  const assetRevisionRef = useRef(canonicalAssetRevision);
  assetRevisionRef.current = Math.max(assetRevisionRef.current, canonicalAssetRevision);
  if (data.diary && data.diary !== canonicalDiaryRef.current) {
    canonicalDiaryRef.current = data.diary;
    canonicalVersion.current += 1;
  }

  const commitDayEntry = useCallback((iso, entry) => {
    const next = { ...dayDiariesRef.current, [iso]: entry };
    dayDiariesRef.current = next;
    setDayDiaries(next);
  }, []);

  const replaceDayEntries = useCallback((entries) => {
    dayDiariesRef.current = entries;
    setDayDiaries(entries);
  }, []);

  const invalidateDayAssetCache = useCallback((revision) => {
    const current = dayDiariesRef.current;
    const active = [...dayRequests.current.keys()];
    const staleRecent = Number(revision || 0) > diaryAssetRevision
      ? Object.keys(data.diary?.recent || {})
      : [];
    const retired = retireStaleFoodDayAssets(
      current,
      revision,
      [...active, ...staleRecent],
    );
    if (!retired.stale.length) return retired.stale;

    // A request started against the previous global asset revision must not
    // settle after invalidation. Its replacement gets a fresh request id.
    for (const iso of retired.stale) {
      latestDayRequest.current.set(iso, ++dayRequestSequence.current);
      dayRequests.current.delete(iso);
    }
    replaceDayEntries(retired.entries);
    return retired.stale;
  }, [data.diary?.recent, diaryAssetRevision, replaceDayEntries]);

  const requestDayDiary = useCallback((iso, { force = false, preserveLoadedOnError = false } = {}) => {
    const pending = dayRequests.current.get(iso);
    if (pending && !force) return pending;
    const requestId = ++dayRequestSequence.current;
    latestDayRequest.current.set(iso, requestId);
    const requestCanonicalVersion = canonicalVersion.current;
    const requestAssetRevision = assetRevisionRef.current;
    const preserved = dayDiariesRef.current[iso];
    const requiredAssetRevision = Number(
      preserved?.requiredAssetRevision
      || (preserved?.status === "stale-assets" ? foodDayAssetRevision(preserved) : 0),
    );
    const terminalError = {
      status: "error",
      diary: null,
      ...(requiredAssetRevision > 0
        ? { requiredAssetRevision, assetRevision: requiredAssetRevision }
        : {}),
    };
    if (!(preserveLoadedOnError && preserved?.status === "loaded")) {
      commitDayEntry(iso, {
        status: "loading",
        diary: null,
        ...(requiredAssetRevision > 0
          ? { requiredAssetRevision, assetRevision: requiredAssetRevision }
          : {}),
      });
    }
    const request = apiCall("/api/diary", { d: iso })
      .then((result) => {
        const requestedDiary = foodDiaryForIso(result, iso);
        const responseAssetRevision = Number(requestedDiary?.asset_revision || 0);
        return requestedDiary && (
          requiredAssetRevision <= 0 || responseAssetRevision >= requiredAssetRevision
        )
          ? {
            status: "loaded",
            diary: requestedDiary,
            canonicalVersion: requestCanonicalVersion,
            assetRevision: Math.max(
              responseAssetRevision,
              requestAssetRevision,
            ),
          }
          : foodDayReadFallback(preserved, preserveLoadedOnError, terminalError);
      })
      .catch(() => foodDayReadFallback(preserved, preserveLoadedOnError, terminalError))
      .then((entry) => {
        if (latestDayRequest.current.get(iso) === requestId) {
          commitDayEntry(iso, entry);
          const observedRevision = foodDayAssetRevision(entry);
          if (entry?.status === "loaded" && observedRevision > 0) {
            assetRevisionRef.current = Math.max(
              assetRevisionRef.current,
              observedRevision,
            );
            invalidateDayAssetCache(observedRevision);
          }
        }
        return entry;
      })
      .finally(() => {
        if (dayRequests.current.get(iso) === request) dayRequests.current.delete(iso);
      });
    dayRequests.current.set(iso, request);
    return request;
  }, [commitDayEntry, invalidateDayAssetCache]);

  // Меню генерится моделью и может приехать позже открытия экрана — пока его
  // нет, перечитываем секцию с бэкофом, чтобы блюда появились сами.
  // Ретраим только когда сервер сам сказал «секция обновляется» и вкладка на
  // экране: пустое меню без флага перезапрашивать бессмысленно (прод v177).
  const menuRefreshing = Boolean(data.foodSection?.refreshing);
  const menuRetry = useRef(0);
  useEffect(() => {
    if (!menuRefreshing) { menuRetry.current = 0; return undefined; }
    if (menuRetry.current >= 3) return undefined;
    const delay = Math.max(5000, Number(data.foodSection?.retry_after_ms || 8000))
      + Math.floor(Math.random() * 2500);
    const timer = setTimeout(() => {
      if (document.visibilityState !== "visible") return;
      menuRetry.current += 1;
      refresh("foodSection");
    }, delay);
    return () => clearTimeout(timer);
  }, [menuRefreshing, data.foodSection, refresh]);

  // Часть картинок блюд генерится фоном. Пока в выдаче есть «временные»
  // (asset_state=missing или подстановка из каталога), раз в минуту спрашиваем
  // лёгкую ручку с ревизией и перечитываем экран только когда она сменилась
  // (порт прод-патча v177: раньше был тяжёлый поллинг всей секции).
  const assetPoll = useRef({ revision: null, attempts: 0 });
  const assetRows = [
    ...(data.foodSection?.menu?.meals || []),
    ...(data.diary?.meals || []),
    ...Object.values(data.diary?.recent || {}).flatMap((day) => day?.meals || []),
    ...Object.values(dayDiaries).flatMap((entry) => entry?.diary?.meals || []),
  ];
  const assetRefreshNeeded = assetRows.some((row) => row?.asset_state === "missing"
    || row?.image_source === "catalog_family" || row?.image_source === "catalog_canonical");
  const payloadAssetRevision = Math.max(
    assetRevisionRef.current,
    canonicalAssetRevision,
    ...Object.values(dayDiaries).map(foodDayAssetRevision),
  );
  useEffect(() => {
    if (!assetRefreshNeeded) { assetPoll.current = { revision: null, attempts: 0 }; return undefined; }
    if (assetPoll.current.revision === null) assetPoll.current.revision = payloadAssetRevision;
    let alive = true;
    let timer = null;
    const tick = async () => {
      if (!alive || assetPoll.current.attempts >= 30) return;
      if (document.visibilityState === "visible") {
        const result = await apiCall("/api/food-assets/revision", {}).catch(() => null);
        const revision = Number(result?.revision);
        if (Number.isFinite(revision)) {
          const previous = assetPoll.current.revision;
          assetPoll.current.revision = revision;
          assetRevisionRef.current = Math.max(assetRevisionRef.current, revision);
          if (previous !== null && revision !== previous) {
            invalidateDayAssetCache(revision);
            await refresh("foodSection", "diary");
            if (alive && selectedIso !== today) await requestDayDiary(selectedIso, { force: true });
          }
        }
        assetPoll.current.attempts += 1;
      }
      if (alive && assetPoll.current.attempts < 30) {
        timer = setTimeout(tick, 60000 + Math.floor(Math.random() * 20000));
      }
    };
    timer = setTimeout(tick, 15000 + Math.floor(Math.random() * 20000));
    return () => { alive = false; if (timer) clearTimeout(timer); };
  }, [assetRefreshNeeded, invalidateDayAssetCache, payloadAssetRevision, refresh, requestDayDiary, selectedIso, today]);

  // Host/profile refreshes can advance the same global revision without this
  // screen owning the polling tick. Retire older explicit days immediately;
  // the selected one is re-read now, every other day when it is revisited.
  useEffect(() => {
    if (!canonicalAssetRevision) return;
    const invalidated = invalidateDayAssetCache(canonicalAssetRevision);
    if (selectedIso !== today && invalidated.includes(selectedIso)) {
      void requestDayDiary(selectedIso, { force: true });
    }
  }, [canonicalAssetRevision, invalidateDayAssetCache, requestDayDiary, selectedIso, today]);

  useEffect(() => {
    fetch("/assets/food/manifest.json?v=3")
      .then((r) => (r.ok ? r.json() : {}))
      .then((icons) => setFoodIcons(icons || {}))
      .catch(() => {});
  }, []);

  // Последняя неделя уже приезжает в recent. Более старый выбранный день
  // запрашивается один раз и получает отдельный loaded/error sentinel.
  useEffect(() => {
    if (!data.diary || !selectedIso || selectedIso === today) return;
    const explicit = dayDiaries[selectedIso];
    if (explicit?.status === "stale-assets") {
      void requestDayDiary(selectedIso, { force: true });
      return;
    }
    if (hasOwn(data.diary.recent || {}, selectedIso) || hasOwn(dayDiaries, selectedIso)) return;
    void requestDayDiary(selectedIso);
  }, [data.diary, dayDiaries, requestDayDiary, selectedIso, today]);

  // Любая правка сначала освежает canonical today. Если пользователь смотрит
  // прошлый день, его cache тоже перечитывается, чтобы edit/delete не оставляли
  // в панели старые строки.
  const reloadDiary = async (mutation = null) => {
    const mutationTargetIso = String(mutation?.targetIso || "").trim();
    const receiptIso = String(
      mutation?.result?.date || mutation?.result?.diary?.date
      || ((mutation?.type === "edit" || mutation?.type === "delete")
        ? (mutationTargetIso || selectedIso)
        : today),
    );
    const orderedMutation = mutation?.type === "edit" || mutation?.type === "delete";
    const receiptIsCurrent = !orderedMutation || mutationOrder.current.accept(
      receiptIso,
      mutation?.mutationToken,
    );
    // A late older receipt can still trigger a canonical read. If that read
    // fails, retain the newer receipt already shown for the selected past day.
    let preserveSelected = !receiptIsCurrent && receiptIso === selectedIso;
    const receipt = mutation?.result ? foodDiaryForIso(mutation.result, receiptIso) : null;
    const canonicalReceipt = receipt && Array.isArray(receipt.meals) ? receipt : null;

    if (receiptIsCurrent && canonicalReceipt) {
      const receiptAssetRevision = Number(canonicalReceipt.asset_revision || 0);
      if (receiptAssetRevision > 0) {
        assetRevisionRef.current = Math.max(
          assetRevisionRef.current,
          receiptAssetRevision,
        );
        invalidateDayAssetCache(receiptAssetRevision);
      }
      if (receiptIso === today) {
        patch("diary", mergeTodayDiaryReceipt(data.diary, canonicalReceipt));
      } else {
        commitDayEntry(receiptIso, {
          status: "loaded",
          diary: canonicalReceipt,
          canonicalVersion: canonicalVersion.current + 1,
          assetRevision: Math.max(
            Number(canonicalReceipt.asset_revision || 0),
            assetRevisionRef.current,
          ),
        });
        if (hasOwn(data.diary?.recent || {}, receiptIso)) {
          patch("diary", {
            ...(data.diary || {}),
            recent: { ...(data.diary?.recent || {}), [receiptIso]: canonicalReceipt },
          });
        }
        preserveSelected = receiptIso === selectedIso;
      }
    }

    if (receiptIsCurrent && !canonicalReceipt && receiptIso && receiptIso !== today
        && (mutation?.type === "edit" || mutation?.type === "delete")) {
      const current = resolveFoodDayEntry({
        iso: receiptIso,
        today,
        diary: data.diary,
        recent: data.diary?.recent || {},
        explicit: dayDiariesRef.current,
        canonicalVersion: canonicalVersion.current,
        diaryAssetRevision,
      }).diary;
      if (current) {
        const meals = mutation.type === "delete"
          ? (current.meals || []).filter((meal) => meal.id !== mutation.id)
          : (current.meals || []).map((meal) => (meal.id === mutation.meal?.id ? mutation.meal : meal));
        const updated = { ...current, meals, totals: totalsFromMeals(meals), date: receiptIso };
        commitDayEntry(receiptIso, {
          status: "loaded",
          diary: updated,
          canonicalVersion: canonicalVersion.current + 1,
          assetRevision: assetRevisionRef.current,
        });
        if (hasOwn(data.diary?.recent || {}, receiptIso)) {
          patch("diary", {
            ...(data.diary || {}),
            ...(foodDiaryForIso(mutation.result, today) || {}),
            recent: { ...(data.diary?.recent || {}), [receiptIso]: updated },
          });
        }
        preserveSelected = receiptIso === selectedIso;
      }
    }

    await refresh("diary");
    if (selectedIso && selectedIso !== today) {
      await requestDayDiary(selectedIso, {
        force: true,
        preserveLoadedOnError: preserveSelected,
      });
    }
  };

  const screenError = screenErrors.foodSection || screenErrors.diary;
  const retryScreen = () => refresh(...KEYS.filter((key) => screenErrors[key]));
  if (!data.foodSection || !data.diary) {
    if (!screenError) return <ScreenLoading title="Питание" variant="food" />;
    return (
      <TMAProvider>
        <Page mode="secondary">
          <div className="aiwa-paper-screen aiwa-food-screen">
            <SectionList className="aiwa-tma-blocks">
              <SectionList.Item header="Питание">
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
      // Server artwork is authoritative; the exact manifest match and the
      // meal placeholder are fallbacks only.
      image: item.meal.image_url
        || item.meal.image
        || dishImageFrom(foodIcons, item.meal.dish)
        || RECOMMENDATION_IMAGE,
    }));
  const recent = diary.recent || {};
  const dayEntry = (iso) => resolveFoodDayEntry({
    iso,
    today,
    diary,
    recent,
    explicit: dayDiaries,
    canonicalVersion: canonicalVersion.current,
    diaryAssetRevision,
  });
  const selectedEntry = dayEntry(selectedIso);
  const selectedDiary = selectedEntry.diary;
  const viewingPast = selectedIso !== today;
  if (selectedEntry.status === "loaded" && selectedDiary) lastDiary.current = selectedDiary;
  const shownMeals = viewingPast
    ? (selectedDiary?.meals || [])
    : (diary.meals || []).slice().reverse();
  const historyTitle = viewingPast ? `Приёмы за ${dayTitle(selectedIso)}` : "Прошедшие приёмы";
  const historyLoading = uploading || (viewingPast && selectedEntry.status === "loading");
  const historyError = viewingPast && selectedEntry.status === "error";

  const retrySelectedDiary = () => requestDayDiary(selectedIso, { force: true });

  /* Gauge and macros follow the shared selected day. During a cache miss the
     last complete day remains visible and the surface exposes loading state. */
  const dayHero = (iso) => {
    const entry = dayEntry(iso);
    if (entry.status === "error") {
      return (
        <div className="aiwa-countdown" role="status" aria-label="Данные за выбранный день недоступны">
          <Text variant="title1" weight="semibold">—</Text>
          <Text variant="body" weight="regular">Данные за этот день недоступны</Text>
        </div>
      );
    }
    const day = entry.diary || (entry.status === "loading" ? (lastDiary.current || diary) : diary);
    const totals = day.totals || {};
    const dayTarget = day.target || target;
    const macroValue = (key) => Number(totals[key] || 0);
    return (
      <div className="aiwa-day-hero" data-loading={entry.status === "loading" ? "true" : undefined}>
        <CalorieGauge
          kcal={Number(totals.kcal || 0)}
          kcalTarget={Number(dayTarget.kcal || section.kcal || 0)}
        />
        <div className="aiwa-macro-grid">
          <MacroCard label="Жиры" value={macroValue("fat")} target={dayTarget.fat} macro="fat" />
          <MacroCard label="Белки" value={macroValue("protein")} target={dayTarget.protein} macro="protein" />
          <MacroCard label="Углеводы" value={macroValue("carbs")} target={dayTarget.carbs} macro="carbs" />
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
    if (viewingPast || recipeBusy) return;
    setRecipeBusy(true);
    try {
      const result = await apiCall("/api/food_text", { text: meal.dish || meal.title, slot }).catch(() => null);
      if (result?.ok) {
        showToast("Добавлено в дневник", { type: "success" });
        setRecipeItem(null);
        await reloadDiary({ type: "receipt", result });
      } else showToast(result?.message || "Не получилось добавить", { type: "error" });
    } finally {
      setRecipeBusy(false);
    }
  };

  const deleteMeal = async (id) => {
    const mutationToken = mutationOrder.current.begin();
    const targetIso = selectedIso;
    const requestId = foodDeleteRequestForMeal(id);
    try {
      const result = await apiCall("/api/diary_del", { id, request_id: requestId });
      if (!result || result.error || result.ok === false) {
        throw new Error(result?.message || "Не получилось удалить приём");
      }
      completeFoodDeleteRequest(id, requestId);
      showToast("Приём удалён", { type: "success" });
      await reloadDiary({ type: "delete", id, result, mutationToken, targetIso });
    } catch (error) {
      showToast(error?.message || "Не получилось удалить приём", { type: "error" });
    }
  };

  const openAdd = () => {
    if (viewingPast) return;
    setEditingMutation(null);
    setEditingMeal(null);
    setPanel("add");
  };

  // Распознавание занимает несколько секунд, поэтому на время загрузки в
  // «Прошедших приёмах» стоит ряд со спиннером — иначе кажется, что тап по
  // «Фото» ничего не сделал.
  const uploadPhoto = async (file) => {
    if (viewingPast || !file || uploading) return;
    setUploading(true);
    try {
      const fn = window.aiwaUploadFoodPhoto;
      if (typeof fn !== "function") throw new Error("Загрузка фото недоступна");
      const result = await fn(file);
      await reloadDiary(result && typeof result === "object" ? { type: "receipt", result } : null);
      showToast("Приём добавлен", { type: "success" });
    } catch (error) {
      showToast(error.message || "Не получилось разобрать фото", { type: "error" });
    } finally {
      setUploading(false);
    }
  };

  // "Текстом" hands over to the bot chat, where it has just asked "Что ты скушала?".
  const promptFoodText = async () => {
    if (viewingPast) return;
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
            onProfile={() => setProfileOpen(true)}
            onCalendar={() => setCalendarOpen(true)}
            action={viewingPast ? null : (
              <div className="aiwa-screen-cta">
                <ActionMenu
                  items={addMenuItems}
                  trigger={
                    <AiwaButton
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
              message={section.text || "Выбираем простую еду с белком в каждом приёме."}
              onDiscuss={() => openBotChat({ topic: "food" })}
            />
            {!viewingPast && menuRefreshing ? (
              <SectionList.Item header="Меню на сегодня">
                <PaperRow loading title="Айва собирает меню…" description="Завтрак, обед и ужин под фазу" />
              </SectionList.Item>
            ) : null}
            {!viewingPast && recommended.length ? (
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

            <SectionList.Item header={historyTitle}>
              {uploading ? (
                <PaperRow loading title="Разбираю фото…" description="Айва считает КБЖУ" />
              ) : null}
              {viewingPast && selectedEntry.status === "loading" ? (
                <PaperRow loading title="Загружаю…" description="Дневник за выбранный день" />
              ) : null}
              {historyError ? (
                <PaperRow
                  title="Не удалось загрузить дневник"
                  description="Нажми, чтобы попробовать ещё раз."
                  onClick={retrySelectedDiary}
                />
              ) : null}
              {/* Пустой дневник не заполняем строкой-заглушкой: она читалась как
                  сломанный блок, а добавить приём можно кнопкой выше. */}
              {shownMeals.map((meal) => (
                <PaperRow
                  key={meal.id}
                  image={meal.image_url || dishImageFrom(foodIcons, meal.title) || foodFallbackImage(meal) || MEAL_IMAGE}
                  title={meal.title}
                  description={`${fmtKcal(meal.kcal)} · Б${Math.round(meal.protein || 0)} · Ж${Math.round(meal.fat || 0)} · У${Math.round(meal.carbs || 0)}`}
                  onClick={() => setPanel("diary")}
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
          </SectionList>

          <ProfilePanel isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
          <CalendarPanel
            isOpen={calendarOpen}
            onClose={() => setCalendarOpen(false)}
            mode={mode}
            revision={revision}
            symptomGroups={read("aiwaSymptomGroups")}
          />
          <AddFoodPanel
            isOpen={panel === "add" && (!viewingPast || Boolean(editingMeal))}
            onClose={() => setPanel("")}
            onSaved={(mutation) => reloadDiary(mutation?.type === "edit" ? {
              ...mutation,
              mutationToken: editingMutation?.token,
              targetIso: editingMutation?.targetIso,
            } : mutation)}
            editingMeal={editingMeal}
          />
          <RecipePanel
            isOpen={!viewingPast && Boolean(recipeItem)}
            meal={recipeItem?.meal}
            image={recipeItem?.image}
            slotLabel={recipeItem?.label}
            busy={recipeBusy}
            onClose={() => setRecipeItem(null)}
            onAdd={() => !viewingPast && recipeItem && addRecommended(recipeItem.meal, recipeItem.value)}
          />
          <FoodDiaryPanel
            isOpen={panel === "diary"}
            onClose={() => setPanel("")}
            diary={viewingPast ? (selectedDiary || { meals: [], totals: {}, target }) : diary}
            canAdd={!viewingPast}
            onAdd={openAdd}
            onEdit={(meal) => {
              setEditingMutation({
                token: mutationOrder.current.begin(),
                targetIso: selectedIso,
              });
              setEditingMeal(meal);
              setPanel("add");
            }}
            onDelete={deleteMeal}
            onReco={viewingPast ? undefined : async () => {
              const result = await apiCall("/api/diary_reco", {}).catch(() => null);
              showToast(result?.text || "Не удалось собрать совет");
            }}
          />
        </div>
      </Page>
    </TMAProvider>
  );
}
