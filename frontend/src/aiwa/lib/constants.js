// [groupLabel, [[code, label], …]] — chips wrap, so groups stay flat lists.
export const JOURNAL_SYMPTOM_GROUPS = [
  ["Боль", [["cramps", "Спазмы"], ["head", "Голова"], ["breast", "Грудь"]]],
  ["Настроение", [["irrit", "Раздражительность"], ["anx", "Тревога"], ["low", "Апатия"]]],
  ["Тело", [["tired", "Усталость"], ["bloat", "Вздутие"], ["sweet", "Тянет на сладкое"]]],
  ["Кожа и сон", [["skin", "Высыпания"], ["insomnia", "Плохой сон"]]],
];

/**
 * What one tap records in the calendar marking mode. The calendar stays read-only
 * until «+» opens the bar, and the selected chip is the only thing that decides
 * the action — so a tap on a day never means two things at once.
 * `checked` reads the day payload from `getAiwaCalendarMonth`.
 */
export const CALENDAR_MARK_MODES = {
  // One line each at the bar width: a wrapped hint pushes the bar over the grid.
  period: { label: "Месячные", hint: "нажми на день, чтобы отметить месячные", checked: (day) => day.actualPeriod },
  symptoms: { label: "Симптомы", hint: "нажми на день, чтобы записать симптомы", checked: (day) => day.logged },
  intimacy: { label: "Близость", hint: "нажми на день, чтобы отметить близость", checked: (day) => day.intimacy },
};

export const calendarMarkOptions = (values) => values.map((value) => ({ value, label: CALENDAR_MARK_MODES[value].label }));

/**
 * Calendar legend — a badge per glyph the grid draws, in that glyph's own colour.
 *
 * The colour is a token name, and it has to reach the Badge through `style`:
 * the vendored tinted Badge derives its wash from `props.style.color` (and reads
 * it unguarded, so dropping the prop throws). The token is the point — the dot in
 * the grid and the badge that names it now resolve one definition.
 */
export const CALENDAR_LEGEND = [
  { label: "Месячные", variant: "tinted", token: "--aiwa-phase-menstrual" },
  { label: "Прогноз", variant: "outlined", token: "--aiwa-phase-menstrual" },
  { label: "Овуляция", variant: "tinted", token: "--aiwa-phase-ovulation" },
  { label: "Фолликулярная", variant: "tinted", token: "--aiwa-phase-follicular" },
  { label: "Лютеиновая", variant: "tinted", token: "--aiwa-phase-luteal" },
  { label: "Близость", variant: "tinted", token: "--aiwa-intimacy" },
];

export const JOURNAL_ENERGY_OPTIONS = [[1, "Низкая"], [2, "Средняя"], [3, "Высокая"]];
export const JOURNAL_MOOD_OPTIONS = [[1, "Плохое"], [2, "Нормальное"], [3, "Хорошее"]];

// Новые залогированные блюда пока без своей 3d-иконки — до генерации показываем
// общую заглушку; у блюд из assets/food/manifest.json остаются их картинки.
export const MEAL_IMAGE = "/assets/food/meal-placeholder.webp";

export const FOOD_SLOTS = [
  { value: "breakfast", label: "Завтрак" },
  { value: "lunch", label: "Обед" },
  { value: "snack", label: "Перекус" },
  { value: "dinner", label: "Ужин" },
];

export const emptyFoodForm = () => ({
  title: "",
  kcal: "",
  grams: "",
  protein: "",
  fat: "",
  carbs: "",
  slot: "snack",
});

export const foodFormFromMeal = (meal) => ({
  title: meal?.title || "",
  kcal: String(meal?.kcal ?? ""),
  grams: String(meal?.grams ?? ""),
  protein: String(meal?.protein ?? ""),
  fat: String(meal?.fat ?? ""),
  carbs: String(meal?.carbs ?? ""),
  slot: meal?.slot || "snack",
});

export const WORKOUT_TYPES = ["Силовая", "Кардио", "Пилатес", "Йога", "Ходьба", "Плавание", "Своё"];

// Списки 1:1 из старого конструктора (TREX в webapp/index.html) — эти же
// названия распознаёт бот в чате, поэтому менять их нельзя.
export const WORKOUT_GROUPS = {
  "Ноги": ["Присед", "Жим ногами", "Выпады", "Болгарские", "Румынская тяга", "Разгибания", "Сгибания", "Икры"],
  "Спина": ["Вертикальная тяга", "Горизонтальная тяга", "Тяга в наклоне", "Становая", "Подтягивания", "Гиперэкстензия"],
  "Грудь": ["Жим лёжа", "Жим гантелей", "Жим в наклоне", "Сведения", "Отжимания"],
  "Плечи": ["Жим стоя", "Махи в стороны", "Махи в наклоне", "Протяжка"],
  "Ягодицы": ["Ягодичный мост", "Отведение бедра", "Мах ногой", "Плие-присед"],
  "Руки": ["Бицепс", "Молоток", "Разгибания трицепс", "Французский жим"],
  "Кор": ["Планка", "Скручивания", "Подъём ног", "Русский твист"],
};

export const WORKOUT_EXERCISES = {
  "Силовая": [],
  "Кардио": ["Бег", "Велотренажёр", "Эллипс", "Гребля", "Скакалка"],
  "Пилатес": ["Мат", "Реформер", "Мобилити", "Кор"],
  "Йога": ["Виньяса", "Хатха", "Растяжка", "Дыхание"],
  "Ходьба": ["Прогулка", "Скандинавская", "Быстрая ходьба"],
  "Плавание": ["Кроль", "Брасс", "На спине"],
  "Своё": [],
};

export const MODE_OPTIONS = [
  { value: "cycle", label: "Регулярный цикл" },
  { value: "irregular", label: "Нерегулярный" },
  { value: "preg", label: "Беременность" },
  { value: "meno", label: "Менопауза" },
  { value: "none", label: "Нет месячных" },
  { value: "male", label: "Мужской режим" },
];
