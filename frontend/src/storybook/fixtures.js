export const weekDays = [
  { iso: "2026-07-20", date: "20", label: "Понедельник" },
  { iso: "2026-07-21", date: "21", label: "Вторник" },
  { iso: "2026-07-22", date: "22", label: "Среда" },
  { iso: "2026-07-23", date: "23", label: "Четверг", today: true },
  { iso: "2026-07-24", date: "24", label: "Пятница" },
  { iso: "2026-07-25", date: "25", label: "Суббота" },
  { iso: "2026-07-26", date: "26", label: "Воскресенье" },
];

const MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const WD = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

/**
 * Home date strip as a day picker. The host sends the whole tracked range —
 * first logged day through the end of the current week — so the strip scrolls;
 * days after today hold no data yet and stay out of the picker.
 */
export const pickerWeekDays = (() => {
  const start = new Date("2026-04-06T00:00:00"); // a Monday, ~15 weeks back
  const end = new Date("2026-07-26T00:00:00"); // Sunday of the current week
  const todayIso = "2026-07-23";
  const days = [];
  for (const day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    const iso = day.toISOString().slice(0, 10);
    const ahead = iso > todayIso;
    days.push({
      iso,
      date: String(day.getDate()),
      label: WD[(day.getDay() + 6) % 7],
      monthLabel: MONTHS[day.getMonth()],
      today: iso === todayIso,
      actualPeriod: iso === "2026-07-20" || iso === "2026-07-21",
      disabled: ahead,
      muted: ahead,
    });
  }
  return days;
})();

/**
 * One month of the calendar page, shaped like `getAiwaCalendarMonth` returns it.
 * Carries every state the marking mode reads: месячные, близость и `logged`
 * (в дне есть запись дневника).
 */
export const markingMonth = (() => {
  const todayIso = "2026-07-23";
  const lead = (new Date("2026-07-01T00:00:00").getDay() + 6) % 7;
  const days = Array.from({ length: lead }, (_, index) => ({ empty: true, key: `empty-${index}` }));
  for (let date = 1; date <= 31; date += 1) {
    const iso = `2026-07-${String(date).padStart(2, "0")}`;
    const ahead = iso > todayIso;
    days.push({
      key: iso,
      iso,
      date: String(date),
      today: iso === todayIso,
      disabled: ahead,
      muted: ahead,
      actualPeriod: date >= 6 && date <= 10,
      phase: date >= 16 && date <= 18 ? "ovu" : undefined,
      intimacy: date === 12 || date === 19,
      logged: date === 8 || date === 15 || date === 23,
    });
  }
  return { key: "2026-07", name: "Июль", label: "Июль 2026", days };
})();

/** Activity week strip: days with a logged workout carry the accent pill. */
export const activityWeekDays = weekDays.map((day, index) => ({
  ...day,
  workout: index === 0 || index === 3,
}));

/** What the top of Home shows for each selectable day of the strip. */
export const weekDaySummaries = {
  "2026-07-20": { value: "1-й день", label: "месячных", ai: "Идут месячные, эстроген и прогестерон на минимуме. Энергии меньше, это норма, телу нужны отдых, тепло и железо." },
  "2026-07-21": { value: "2-й день", label: "месячных", ai: "Идут месячные, эстроген и прогестерон на минимуме. Энергии меньше, это норма, телу нужны отдых, тепло и железо." },
  "2026-07-22": { value: "27 дней", label: "до месячных", ai: "Эстроген растёт, энергия и настроение идут вверх. Хорошее окно для нагрузок и сложных задач." },
  "2026-07-23": { value: "~26 дней", label: "до месячных", ai: "Сегодня тело на подъёме: эстроген растёт, сил больше обычного. Хороший день для силовой и плотного белкового завтрака." },
};

/** Shape the bridge sends with the home payload (`checkin` + `symptomGroups`). */
export const todayCheckin = {
  energy: 2,
  mood: 1,
  symptoms: ["cramps", "head", "low", "custom:тянет поясницу"],
  period: true,
  intimacy: false,
};

export const symptomGroups = [
  ["Боль", [["cramps", "Спазмы"], ["head", "Голова"], ["breast", "Грудь"], ["back", "Поясница"]]],
  ["Настроение", [["anx", "Тревожно"], ["irrit", "Раздражительность"], ["low", "Апатия"]]],
  ["Тело", [["tired", "Усталость"], ["bloat", "Вздутие"], ["sweet", "Тянет на сладкое"], ["swell", "Отёки"]]],
  ["Кожа и сон", [["skin", "Высыпания"], ["insomnia", "Плохой сон"]]],
];

export const metrics = [
  { label: "Средняя длина месячных", value: "5 дней", ok: true },
  { label: "Средняя длина цикла", value: "26 дней", ok: true },
  { label: "Разброс начала месячных", value: "17 дней", ok: false },
];

export const history = [
  {
    key: "2026-07-20",
    title: "с 20 июля по 23 июля",
    description: "текущий цикл, месячные 4 дня",
  },
  {
    key: "2026-07-06",
    title: "с 6 июля по 10 июля",
    description: "текущий цикл, месячные 5 дней",
  },
  {
    key: "2026-06-05",
    title: "с 5 июня по 9 июня",
    description: "текущий цикл, месячные 5 дней",
  },
];

/** `/api/section` delay block — the only section Home shows when the cycle is late. */
export const delaySection = {
  title: "Задержка",
  message: "Месячные задерживаются на 4 дня",
  hint: "Один цикл длиннее обычного — это ещё не повод волноваться.",
  canSwitchToPregnancy: true,
};

/** Food diary payload, shaped like the bridge sends it. */
export const foodDiary = {
  totals: { kcal: 1240, protein: 72, fat: 48, carbs: 126 },
  target: { kcal: 1841, protein: 95, fat: 70, carbs: 210 },
  meals: [
    { id: 1, slot: "breakfast", title: "Творог с бананом", kcal: 320 },
    { id: 2, slot: "lunch", title: "Гречка с курицей", kcal: 540 },
    { id: 3, slot: "snack", title: "Яблоко и орехи", kcal: 180 },
    { id: 4, slot: "dinner", title: "Салат с тунцом", kcal: 200 },
  ],
};

export const workoutVariants = [
  { name: "Спокойная силовая", how: "3 подхода по 12, вес — до лёгкой усталости", benefit: "держит тонус без перегруза" },
  { name: "Прогулка 40 минут", how: "ровный темп, без подъёмов", benefit: "снимает отёчность" },
  { name: "Йога на растяжку", how: "20 минут, упор на поясницу", benefit: "мягко разгружает спину" },
];

export const workoutHistory = {
  last_review: "На этой неделе две тренировки — ровный темп для лютеиновой фазы.",
  week: [
    { d: "2026-07-20", dow: "Понедельник", count: 1, type: "Силовая" },
    { d: "2026-07-21", dow: "Вторник", count: 0 },
    { d: "2026-07-22", dow: "Среда", count: 0 },
    { d: "2026-07-23", dow: "Четверг", count: 1, type: "Ходьба" },
    { d: "2026-07-24", dow: "Пятница", count: 0 },
  ],
  today: [
    { id: 1, type: "Ходьба", duration: "40 мин", rpe: "Легко" },
  ],
};

export const trainingProfile = {
  goal: "Держать форму без перегруза",
  level: "Средний",
  limits: "Болит поясница после становой",
};

export const cycleChartData = [
  { label: "май", value: 28 },
  { label: "июн", value: 31 },
  { label: "июл", value: 14 },
];

export const cycleChartSeries = [
  {
    key: "value",
    label: "Длина цикла",
    color: "var(--aiwa-accent)",
  },
];

export const wellbeingChartData = [
  { label: "пн", energy: 2, sleep: 3 },
  { label: "вт", energy: 3, sleep: 4 },
  { label: "ср", energy: 4, sleep: 4 },
  { label: "чт", energy: 3, sleep: 3 },
  { label: "пт", energy: 5, sleep: 4 },
  { label: "сб", energy: 4, sleep: 5 },
  { label: "вс", energy: 4, sleep: 4 },
];

export const wellbeingChartSeries = [
  {
    key: "energy",
    label: "Энергия",
    color: "var(--aiwa-accent)",
  },
  {
    key: "sleep",
    label: "Сон",
    color: "var(--aiwa-chart-secondary)",
    dashed: true,
  },
];
