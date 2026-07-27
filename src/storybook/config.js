import {
  ActionMenuPage,
  ActivityHeaderPage,
  AiwaComponentsPage,
  AiwaInsightPage,
  AvatarPage,
  ButtonPage,
  CalendarMarkingPage,
  ChartsPage,
  ColorsPage,
  DesignSystemPage,
  FormControlsPage,
  FoodHeaderPage,
  IconsPage,
  JournalControlsPage,
  LoadingPage,
  MainBlocksPage,
  ModalPage,
  NavigationPage,
  PanelHeaderPage,
  PanelsPage,
  SectionListPage,
  SectionsPage,
  SnackbarPage,
  TmaControlsPage,
  TmaListsPage,
  TmaStatePage,
  TmaSurfacesPage,
  TmaTextPage,
  TypographyPage,
  WeekPage,
  WebUiAreaChartPage,
} from "./pages";

export const storybookConfig = [
  {
    category: "System",
    pages: [
      { title: "Component Registry", path: "/system/components", component: DesignSystemPage, searchTerms: ["Paper Figma registry реестр компоненты sync"] },
    ],
  },
  {
    category: "Primitives",
    pages: [
      { title: "Colors", path: "/ui-kit/colors", component: ColorsPage, searchTerms: ["palette tokens цвета палитра"] },
      { title: "Icons", path: "/ui-kit/icons", component: IconsPage, searchTerms: ["HomeIcon CalendarIcon CheckIcon AlertIcon ChatIcon FoodIcon TrainIcon ChevronLeftIcon ArrowRightIcon CrossIcon InfoIcon ChevronRightIcon иконки"] },
      { title: "Typography", path: "/ui-kit/typography", component: TypographyPage, searchTerms: ["Text font type шрифт текст"] },
    ],
  },
  {
    category: "Components",
    pages: [
      { title: "Action Menu", path: "/showcase/actionMenu", component: ActionMenuPage, searchTerms: ["ActionMenu DropdownMenu меню камера фото текстом add food"] },
      { title: "Button", path: "/showcase/button", component: ButtonPage, searchTerms: ["RegularButton кнопка action"] },
      { title: "Cell", path: "/showcase/cell", component: AiwaComponentsPage, searchTerms: ["AiwaCell PaperRow MetricCell row ячейка"] },
      { title: "Image Avatar", path: "/showcase/avatar", component: AvatarPage, searchTerms: ["ImageAvatar InitialsAvatar аватар"] },
      { title: "Loading", path: "/showcase/loading", component: LoadingPage, searchTerms: ["Skeleton Spinner ScreenLoading загрузка"] },
      { title: "Modal & Sheet", path: "/showcase/modal", component: ModalPage, searchTerms: ["ModalView модалка страница"] },
      { title: "Navigation", path: "/showcase/navigation", component: NavigationPage, searchTerms: ["TabBar tabs навигация"] },
      { title: "Panel Header", path: "/showcase/panelHeader", component: PanelHeaderPage, searchTerms: ["PanelHeader AiwaPanelHeader шапка"] },
      { title: "Section List", path: "/showcase/sectionList", component: SectionListPage, searchTerms: ["SectionList section список"] },
      { title: "Snackbar", path: "/showcase/snackbar", component: SnackbarPage, searchTerms: ["Snackbar toast notification нотификация тост уведомление showToast"] },
    ],
  },
  {
    category: "TMA Kit",
    pages: [
      { title: "Surfaces", path: "/tma/surfaces", component: TmaSurfacesPage, searchTerms: ["Card GlassContainer GlassBorder GradientBackground StartView Train фон стекло градиент пустое состояние"] },
      { title: "Lists & Data", path: "/tma/lists", component: TmaListsPage, searchTerms: ["CellStack SectionHeader Table Gallery Collapsible список таблица галерея аккордеон"] },
      { title: "Controls", path: "/tma/controls", component: TmaControlsPage, searchTerms: ["Tabs MultilineButton Switch Tooltip Picker Wheel вкладки переключатель подсказка колесо"] },
      { title: "Text & Media", path: "/tma/text", component: TmaTextPage, searchTerms: ["Markdown StreamingText FitText Morph Image текст стриминг разметка картинка"] },
      { title: "State & Feedback", path: "/tma/state", component: TmaStatePage, searchTerms: ["Redaction SkeletonBlock ErrorBoundary ParticleEffect скелетон ошибка частицы"] },
    ],
  },
  {
    category: "Web UI",
    pages: [
      { title: "Area Chart — Gradient", path: "/web-ui/charts/area-gradient", component: WebUiAreaChartPage, searchTerms: ["Deslop Web UI ChartAreaGradient area chart график градиент"] },
    ],
  },
  {
    category: "AIWA",
    pages: [
      { title: "Form Controls", path: "/aiwa/formControls", component: FormControlsPage, searchTerms: ["Field ChoicePills FoodEntryForm поля форма выбор"] },
      { title: "AI Insight", path: "/aiwa/insight", component: AiwaInsightPage, searchTerms: ["AiwaInsightCard AiwaCardHeading AiwaSequence AI инсайт"] },
      { title: "Journal Controls", path: "/aiwa/journalControls", component: JournalControlsPage, searchTerms: ["AiwaChip JournalToggle JournalGroup JournalChoiceGroup JournalSymptomGroup JournalCustomSymptom журнал симптомы чипы"] },
      { title: "Charts", path: "/aiwa/charts", component: ChartsPage, searchTerms: ["AiwaWebUiChart ChartSection график диаграмма"] },
      { title: "Week & Date", path: "/aiwa/week", component: WeekPage, searchTerms: ["Week DateCell StatusIcon неделя дата календарь"] },
      { title: "Calendar Marking", path: "/aiwa/calendarMarking", component: CalendarMarkingPage, searchTerms: ["AiwaFab CalendarMarkBar DateCell marking FAB плюс чипы месячные симптомы близость радиокнопка отметки календарь"] },
    ],
  },
  {
    category: "Compositions",
    pages: [
      { title: "Sections", path: "/compositions/sections", component: SectionsPage, searchTerms: ["TodaySection AiSection DelaySection StatsSection ChartSection HistorySection секции блоки главной задержка"] },
      { title: "Panels", path: "/compositions/panels", component: PanelsPage, searchTerms: ["JournalPanel CalendarDayLogPanel AddFoodPanel FoodDiaryPanel WorkoutPanel WorkoutVariantsPanel WorkoutHistoryPanel TrainingProfilePanel ProfilePanel панели шторки модалки журнал дневник тренировка профиль"] },
      { title: "Main Screen Blocks", path: "/compositions/main", component: MainBlocksPage, searchTerms: ["StatsSection HistorySection MacroCard home главная экран блоки"] },
      { title: "Food Header", path: "/compositions/food-header", component: FoodHeaderPage, searchTerms: ["Food gauge MacroCard питание калории КБЖУ"] },
      { title: "Activity Header", path: "/compositions/activity-header", component: ActivityHeaderPage, searchTerms: ["Activity нагрузка тренировки неделя week hero счётчик"] },
    ],
  },
];

export const storybookPages = storybookConfig.flatMap((group) => group.pages);
