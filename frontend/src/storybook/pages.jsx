import React, { useEffect, useRef, useState } from "react";
import { ChartAreaGradient } from "../components/web-ui/charts/area";
import designSystem from "../aiwa/design-system/registry.json";
import {
  ActionMenu,
  AddFoodPanel,
  AiSection,
  AiwaButton,
  AiwaCardHeading,
  AiwaCell,
  AiwaChip,
  AiwaFab,
  CALENDAR_MARK_MODES,
  CalendarMarkBar,
  calendarMarkOptions,
  AiwaWebUiChart,
  AiwaModalView,
  AiwaPanelHeader,
  AiwaInsightCard,
  AiwaSequence,
  AIWA_CARD_SEQUENCE_FRAMES,
  Badge,
  CalendarDayLogPanel,
  CalendarPanel,
  CalorieGauge,
  Card,
  Cell,
  CellStack,
  ChartSection,
  ChoicePills,
  Collapsible,
  DateCell,
  DayOverview,
  DayWheel,
  DelaySection,
  ErrorBoundary,
  Field,
  FitText,
  FoodDiaryPanel,
  FoodEntryForm,
  Gallery,
  GlassBorder,
  GlassContainer,
  GradientBackground,
  HistorySection,
  Image,
  ImageAvatar,
  InitialsAvatar,
  JournalChoiceGroup,
  JournalCustomSymptom,
  JournalGroup,
  JournalPanel,
  JournalSymptomGroup,
  JournalToggle,
  MacroCard,
  Markdown,
  MetricCell,
  Morph,
  MultilineButton,
  Page,
  PaperRow,
  PanelHeader,
  ParticleEffect,
  Picker,
  ProfileAvatar,
  ProfilePanel,
  RecipePanel,
  Redaction,
  RegularButton,
  ScreenDayHeader,
  ScreenLoading,
  SectionHeader,
  SectionList,
  SegmentedControl,
  Skeleton,
  SkeletonBlock,
  Snackbar,
  Spinner,
  StartView,
  StatsSection,
  StatusIcon,
  StreamingText,
  Switch,
  TabBar,
  Table,
  Tabs,
  Text,
  TodaySection,
  Tooltip,
  Train,
  TrainingProfilePanel,
  Week,
  Wheel,
  WorkoutHistoryPanel,
  WorkoutPanel,
  WorkoutVariantsPanel,
  showToast,
} from "../aiwa/index.js";
import {
  AlertIcon,
  ChevronLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  ChatIcon,
  CheckIcon,
  SelectionCheckIcon,
  ClockIcon,
  ChevronRightIcon,
  CrossIcon,
  FoodIcon,
  HomeIcon,
  InfoIcon,
  TrainIcon,
  PlusIcon,
  CameraIcon,
  ImageIcon,
  TextIcon,
} from "../aiwa/lib/icons";
import profileImage from "../../../assets/paper-profile.jpg";
import foodImage from "../../../webapp2/assets/food/meal-placeholder.webp";
import {
  cycleChartData,
  cycleChartSeries,
  delaySection,
  foodDiary,
  history,
  markingMonth,
  formatDayTitle,
  homeDaySummary,
  metrics,
  pickerWeekDays,
  symptomGroups,
  todayCheckin,
  trainingProfile,
  weekDaySummaries,
  weekDays,
  wellbeingChartData,
  wellbeingChartSeries,
  workoutHistory,
  workoutVariants,
} from "./fixtures";

/**
 * The product palette, by role. Nothing here carries a hex: the swatch paints
 * itself from the token and the caption reads the resolved value back off the
 * DOM, so the page keeps telling the truth after the theme flips — and a token
 * that resolves to nothing shows up as «не задан» instead of silently blending in.
 */
const palette = [
  {
    header: "Brand",
    description: "Акцент — «месячные». Ничего, кроме них и главного действия, не красится в оранжевый.",
    tokens: [
      ["--aiwa-accent", "Акцент"],
      ["--aiwa-accent-soft", "Акцент · подложка"],
      ["--aiwa-accent-foreground", "На акценте"],
      ["--aiwa-intimacy", "Близость"],
    ],
  },
  {
    header: "Ink",
    description: "Шкала текста. Каждый уровень — роль Deslop, поэтому светлая и тёмная тема идут парой.",
    tokens: [
      ["--aiwa-ink", "Основной"],
      ["--aiwa-ink-secondary", "Вторичный"],
      ["--aiwa-ink-muted", "Приглушённый"],
      ["--aiwa-ink-subtle", "Слабый · цели, «/95 г»"],
    ],
  },
  {
    header: "Surfaces",
    description: "Холст экрана, карточка и заливка контролов. Белая карточка переключает --aiwa-control-bg на холст.",
    tokens: [
      ["--aiwa-screen-bg", "Холст экрана"],
      ["--aiwa-surface", "Карточка"],
      ["--aiwa-control-bg", "Контрол"],
      ["--aiwa-fill-secondary", "Вторичная заливка"],
      ["--aiwa-separator", "Разделитель"],
    ],
  },
  {
    header: "Status",
    description: "Не бренд: метрика «в норме» не может занимать оранжевый, он означает месячные.",
    tokens: [
      ["--aiwa-success", "Норма"],
      ["--aiwa-warning", "Внимание"],
    ],
  },
  {
    header: "Фазы цикла",
    description: "Точка в календаре и бейдж в легенде читают одно определение.",
    tokens: [
      ["--aiwa-phase-menstrual", "Менструальная"],
      ["--aiwa-phase-follicular", "Фолликулярная"],
      ["--aiwa-phase-ovulation", "Овуляция"],
      ["--aiwa-phase-luteal", "Лютеиновая"],
    ],
  },
  {
    header: "Макросы",
    description: "Фиксированные оттенки: три полосы должны различаться с одного взгляда.",
    tokens: [
      ["--aiwa-macro-protein", "Белки"],
      ["--aiwa-macro-fat", "Жиры"],
      ["--aiwa-macro-carbs", "Углеводы"],
    ],
  },
];

const shadows = [
  ["--aiwa-shadow-raised", "Приподнятый · пилюля дня"],
  ["--aiwa-shadow-card", "Карточка"],
  ["--aiwa-shadow-gauge", "Шкала калорий"],
  ["--aiwa-shadow-overlay", "Оверлей · легенда календаря"],
  ["--aiwa-shadow-menu", "Меню действий"],
];

/** Deslop-роли, на которые опирается продукт. Значения приходят из кита. */
const kitRoles = [
  ["--tma-action-primary-background", "Главное действие"],
  ["--tma-background", "Поверхность карточки"],
  ["--tma-background-secondary", "Холст страницы"],
  ["--tma-text-primary", "Основной текст"],
  ["--tma-text-secondary", "Вторичный текст"],
  ["--tma-separator", "Разделитель"],
];

function useTokenValue(token, deps) {
  const [value, setValue] = useState("");
  useEffect(() => {
    const read = () => setValue(getComputedStyle(document.body).getPropertyValue(token).trim());
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-color-scheme"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-color-scheme", "class"] });
    return () => observer.disconnect();
  }, [token, deps]);
  return value;
}

function TokenRow({ token, label, kind = "color" }) {
  const value = useTokenValue(token);
  const swatch = kind === "shadow"
    ? <span className="aiwa-storybook-shadow" style={{ "--storybook-shadow": `var(${token})` }} aria-hidden="true" />
    : <span className="aiwa-storybook-swatch" style={{ "--storybook-swatch": `var(${token})` }} aria-hidden="true" />;

  return (
    <Cell start={swatch} tappable={false}>
      <Cell.Text title={label} description={`${token} · ${value || "не задан"}`} />
    </Cell>
  );
}

const icons = [
  ["Home", HomeIcon],
  ["Calendar", CalendarIcon],
  ["Check", CheckIcon],
  ["Selection Check", SelectionCheckIcon],
  ["Clock", ClockIcon],
  ["Alert", AlertIcon],
  ["Chat", ChatIcon],
  ["Food", FoodIcon],
  ["Train", TrainIcon],
  ["Chevron Left", ChevronLeftIcon],
  ["Arrow Right", ArrowRightIcon],
  ["Cross", CrossIcon],
  ["Info", InfoIcon],
  ["Chevron Right", ChevronRightIcon],
];

const padded = "aiwa-storybook-padded";

export function WebUiAreaChartPage() {
  return <ChartAreaGradient />;
}

export function DesignSystemPage() {
  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Paper/Figma ↔ code">
          {designSystem.components.map((component) => (
            <AiwaCell key={component.id} tappable={false}>
              <AiwaCell.Text
                title={component.designName}
                description={`${component.export} · ${component.layer} · ${component.story}`}
              />
            </AiwaCell>
          ))}
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function ColorsPage() {
  return (
    <Page>
      <SectionList>
        {palette.map((group) => (
          <SectionList.Item header={group.header} description={group.description} key={group.header}>
            {group.tokens.map(([token, label]) => (
              <TokenRow key={token} token={token} label={label} />
            ))}
          </SectionList.Item>
        ))}
        <SectionList.Item
          header="Тени"
          description="Остаются чернильными в обеих темах: светлая тень на тёмном холсте читается как свечение, а не как высота."
        >
          {shadows.map(([token, label]) => (
            <TokenRow key={token} token={token} label={label} kind="shadow" />
          ))}
        </SectionList.Item>
        <SectionList.Item
          header="Роли Deslop"
          description="Витрина опирается на них. Пустое значение здесь означает, что роль не подключена — так же тихо, как это было с --tma-text-primary."
        >
          {kitRoles.map(([token, label]) => (
            <TokenRow key={token} token={token} label={label} />
          ))}
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function IconsPage() {
  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Project Icons">
          {icons.map(([name, Icon]) => (
            <Cell key={name} start={<span className="aiwa-storybook-icon"><Icon /></span>}>
              <Cell.Text title={name} />
            </Cell>
          ))}
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function TypographyPage() {
  const samples = [
    ["Title 1", "title1", "semibold"],
    ["Title 2", "title2", "semibold"],
    ["Title 3", "title3", "semibold"],
    ["Body", "body", "regular"],
    ["Subtitle", "subheadline1", "regular"],
    ["Caption", "caption1", "regular"],
  ];

  return (
    <Page>
      <SectionList>
        <SectionList.Item header="SB Sans Interface">
          {samples.map(([name, variant, weight]) => (
            <Cell key={name}>
              <div className="aiwa-storybook-type-row">
                <Text variant={variant} weight={weight}>Айва заботится о тебе</Text>
                <Text variant="caption1">{name} · {weight}</Text>
              </div>
            </Cell>
          ))}
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function ButtonPage() {
  return (
    <Page mode="secondary">
      <SectionList className="aiwa-tma-blocks">
        <SectionList.Item header="На белом блоке">
          <div className={padded}>
            <AiwaButton variant="primary" label="Занести в журнал" isFill />
            <AiwaButton variant="secondary" label="Обсудить с Айвой" isFill />
            <AiwaButton variant="outlined" label="Отмена" isFill />
            <AiwaButton variant="primary" label="Недоступно" disabled isFill />
            <AiwaButton
              variant="primary"
              label={<span className="aiwa-btn-icon-label"><ClockIcon /> Сохранить</span>}
              loading
              isFill
            />
            <AiwaButton variant="secondary" label="Сохранить" loading isFill />
          </div>
        </SectionList.Item>
        <div className="aiwa-storybook-button-canvas">
          <Text variant="subheadline2" weight="semibold">На теле страницы</Text>
          <AiwaButton variant="secondaryCanvas" label="Сформировать выписку" isFill />
          <AiwaButton variant="secondaryCanvas" label="Недоступно" disabled isFill />
          <AiwaButton variant="secondaryCanvas" label="Сформировать выписку" loading isFill />
        </div>
      </SectionList>
    </Page>
  );
}

export function AiwaComponentsPage() {
  return (
    <Page mode="secondary">
      <SectionList className="aiwa-tma-blocks">
        <SectionList.Item header="AIWA Cell">
          <PaperRow title="История цикла" description="Последняя запись 23 июля" onClick={() => {}} />
          <MetricCell label="Средняя длина цикла" value="26 дней" ok />
          <MetricCell label="Разброс начала месячных" value="17 дней" ok={false} />
          <MetricCell label="Средняя длина сна" value="—" />
        </SectionList.Item>
        <SectionList.Item header="AIWA Cell · Рекомендации">
          <PaperRow
            image={foodImage}
            title="Яичница с томатами и зеленью"
            description="белок"
            onClick={() => {}}
          />
          <PaperRow
            image={foodImage}
            title="Тушёная говядина с фасолью"
            description="железо и белок"
            onClick={() => {}}
          />
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function AvatarPage() {
  const [hostReady, setHostReady] = useState(false);
  useEffect(() => {
    const previous = window.aiwaData;
    window.aiwaData = () => ({ name: "Анна" });
    setHostReady(true);
    return () => {
      if (previous === undefined) delete window.aiwaData;
      else window.aiwaData = previous;
    };
  }, []);

  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Avatar">
          {hostReady ? (
            <Cell start={<ProfileAvatar onClick={() => {}} />}>
              <Cell.Text title="Анна" description="AIWA avatar · доступная кнопка профиля" />
            </Cell>
          ) : null}
          <Cell start={<ImageAvatar src={profileImage} size={40} />}>
            <Cell.Text title="Анна" description="Профиль Айвы" />
          </Cell>
          <Cell start={<InitialsAvatar userId={7} name="Анна" />}>
            <Cell.Text title="Анна" description="Fallback без фотографии" />
          </Cell>
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function LoadingPage() {
  const [active, setActive] = useState(true);
  const [variant, setVariant] = useState("food");
  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Loading States">
          <Cell.Switch value={active} onChange={setActive}>
            <Cell.Text title="Skeleton" />
          </Cell.Switch>
          <Skeleton active={active}>
            <Cell start={<InitialsAvatar userId={7} name="Айва" />}>
              <Cell.Text title="Айва собирает данные…" description="Это займёт несколько секунд" />
            </Cell>
          </Skeleton>
          <Cell tappable={false} start={<Spinner />}>
            <Cell.Text title="Загрузка" />
          </Cell>
        </SectionList.Item>

        <SectionList.Item
          header="Pending row"
          description="Ряд-заглушка на месте будущей записи: фото еды разбирается несколько секунд"
        >
          <PaperRow loading title="Разбираю фото…" description="Айва считает КБЖУ" />
          <PaperRow image={foodImage} title="Яичница с томатами" description="320 ккал · Б18 · Ж22 · У6" />
        </SectionList.Item>

        <SectionList.Item
          header="Screen loading"
          description="Скелетон экрана вместо карточки «Айва собирает данные» — пока не приехали /api/section и дневник"
        >
          <div className={padded}>
            <SegmentedControl
              segments={["Питание", "Нагрузка"]}
              defaultIndex={0}
              onChange={(index) => setVariant(index === 0 ? "food" : "activity")}
            />
          </div>
          <ScreenLoading
            title={variant === "food" ? "Питание" : "Нагрузка"}
            variant={variant}
          />
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function ModalPage() {
  const [open, setOpen] = useState(false);
  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Modal View">
          <div className={padded}>
            <RegularButton variant="filled" label="Открыть шторку" isFill onClick={() => setOpen(true)} />
          </div>
        </SectionList.Item>
      </SectionList>
      <AiwaModalView isOpen={open} onClose={() => setOpen(false)}>
        <div className={padded} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Text variant="body">Полноэкранная страница Айвы. Навигация — нативной кнопкой «Назад» Telegram.</Text>
          <RegularButton variant="filled" label="Закрыть" isFill onClick={() => setOpen(false)} />
        </div>
      </AiwaModalView>
    </Page>
  );
}

export function SnackbarPage() {
  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Варианты">
          <div className={padded} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Snackbar title="Сохранено" />
            <Snackbar type="success" title="Приём добавлен · 420 ккал" />
            <Snackbar type="error" title="Не получилось разобрать фото" />
            <Snackbar type="warning" title="Проверь рост, вес и возраст" />
            <Snackbar
              type="info"
              title="Месячные удалены из календаря"
              action={{ label: "Вернуть" }}
            />
            <Snackbar
              title="Выписка отправлена в чат бота"
              description="Открой бота, чтобы посмотреть."
              link={{ label: "Открыть" }}
            />
          </div>
        </SectionList.Item>
        <SectionList.Item header="Живой тост">
          <div className={padded} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <RegularButton label="Нейтральный" onClick={() => showToast("Сохранено")} />
            <RegularButton
              variant="filled"
              label="Успех"
              onClick={() => showToast("Приём добавлен · 420 ккал", { type: "success" })}
            />
            <RegularButton
              label="Ошибка"
              onClick={() => showToast("Не получилось сохранить", { type: "error" })}
            />
            <RegularButton
              label="С действием"
              onClick={() =>
                showToast("Месячные удалены из календаря", {
                  action: { label: "Вернуть" },
                })
              }
            />
          </div>
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function NavigationPage() {
  const tabs = [
    { label: "Главная", icon: <HomeIcon /> },
    { label: "Питание", icon: <FoodIcon /> },
    { label: "Нагрузка", icon: <TrainIcon /> },
  ];
  return (
    <Page>
      <SectionList>
        <SectionList.Item header="TabBar">
          <div className="aiwa-storybook-tabbar aiwa-nav-tabbar-layer">
            <TabBar tabs={tabs} />
          </div>
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function PanelHeaderPage() {
  return (
    <Page>
      <AiwaPanelHeader
        title="23 июля"
        left={<ImageAvatar src={profileImage} size={36} />}
        onLeft={() => {}}
        leftAriaLabel="Открыть профиль"
        right={<CalendarIcon />}
        onRight={() => {}}
        rightAriaLabel="Открыть календарь"
      />
      <SectionList>
        <SectionList.Item header="Panel Header">
          <PanelHeader left={<ChevronLeftIcon />} onLeft={() => {}} right={<CalendarIcon />} onRight={() => {}}>
            23 июля
          </PanelHeader>
        </SectionList.Item>
        <SectionList.Item
          header="Large title"
          description="Шапка панелей без действий: заголовок слева по контентному отступу, назад — нативная кнопка Telegram."
        >
          <AiwaPanelHeader size="large" title="Занести в журнал" />
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function SectionListPage() {
  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Статистика" description="Секции используют текущую тему Айвы">
          {metrics.map((metric) => <MetricCell key={metric.label} {...metric} />)}
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function FormControlsPage() {
  const [name, setName] = useState("");
  const [slot, setSlot] = useState("breakfast");
  const [canvasChip, setCanvasChip] = useState(true);
  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Fields & Choice Pills">
          <div className={padded}>
            <Field label="Название" value={name} onChange={setName} placeholder="Например, творог и банан" />
            <Field
              label="Комментарий"
              value="Больше белка на завтрак"
              onChange={() => {}}
              multiline
            />
            <ChoicePills
              label="Приём пищи"
              value={slot}
              onChange={setSlot}
              options={[
                { value: "breakfast", label: "Завтрак" },
                { value: "lunch", label: "Обед" },
                { value: "dinner", label: "Ужин" },
              ]}
            />
          </div>
        </SectionList.Item>
        <SectionList.Item
          header="Food entry form"
          description="Ручной ввод приёма: те же Field и ChoicePills, собранные в форму. «Сохранить» уходит в /api/food_manual — без хоста это путь ошибки, он тут и показан."
        >
          <div className={padded}>
            <FoodEntryForm onSaved={async () => {}} onClose={() => {}} />
          </div>
        </SectionList.Item>
      </SectionList>
      <div className="aiwa-storybook-canvas-controls">
        <Text variant="subheadline2" weight="semibold">Контролы прямо на холсте</Text>
        <ChoicePills
          surface="canvas"
          label="Приём пищи"
          value={slot}
          onChange={setSlot}
          options={[
            { value: "breakfast", label: "Завтрак" },
            { value: "lunch", label: "Обед" },
            { value: "dinner", label: "Ужин" },
          ]}
        />
        <AiwaChip
          surface="canvas"
          label="Тянет на сладкое"
          active={canvasChip}
          onClick={() => setCanvasChip((value) => !value)}
        />
      </div>
    </Page>
  );
}

export function ActionMenuPage() {
  const [last, setLast] = useState("—");
  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Action Menu" description={`Последнее действие: ${last}`}>
          <div className={padded} style={{ display: "flex", justifyContent: "center", padding: "48px 16px" }}>
            <ActionMenu
              items={[
                { label: "Фото", icon: <ImageIcon />, onSelect: () => setLast("Фото") },
                { label: "Текстом", icon: <TextIcon />, onSelect: () => setLast("Текстом") },
              ]}
              trigger={
                <RegularButton
                  variant="filled"
                  aria-label="Добавить приём"
                  label={<span className="aiwa-btn-icon-label"><PlusIcon /> Добавить приём</span>}
                />
              }
            />
          </div>
        </SectionList.Item>
        <SectionList.Item
          header="Action Menu — без иконок"
          description="Меню календаря: строки те же, что в марк-баре, а триггер — FAB у правого края."
        >
          <div className={padded} style={{ display: "flex", justifyContent: "flex-end", padding: "16px 16px 48px" }}>
            <ActionMenu
              align="end"
              items={calendarMarkOptions(["period", "symptoms", "intimacy"]).map((option) => ({
                label: option.label,
                onSelect: () => setLast(option.label),
              }))}
              trigger={<AiwaFab icon={<PlusIcon />} label="Отметить день" />}
            />
          </div>
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function AiwaInsightPage() {
  return (
    <Page mode="secondary">
      <SectionList className="aiwa-tma-blocks">
        <AiwaInsightCard
          message="Идут месячные, эстроген и прогестерон на минимуме. Энергии меньше, это норма, телу нужны отдых, тепло и железо."
          onDiscuss={() => {}}
        />
        <SectionList.Item
          header="Из чего собрана карточка"
          description="Заголовок — маскот плюс подпись; сама последовательность живёт отдельно и переиспользуется в шапке чата и в доке навигации."
        >
          <div className={padded}>
            <AiwaCardHeading />
          </div>
          <div className="aiwa-storybook-sequence-row">
            <AiwaSequence size={44} />
            <AiwaSequence size={58} frames={AIWA_CARD_SEQUENCE_FRAMES} pauseMs={0} />
            <AiwaSequence size={67} />
          </div>
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function JournalControlsPage() {
  const [period, setPeriod] = useState(true);
  const [intimacy, setIntimacy] = useState(false);
  const [energy, setEnergy] = useState(3);
  const [symptoms, setSymptoms] = useState(["cramps"]);
  const [chip, setChip] = useState(true);
  const [custom, setCustom] = useState("");
  const toggleSymptom = (code) => setSymptoms((current) => (
    current.includes(code) ? current.filter((item) => item !== code) : [...current, code]
  ));

  return (
    <Page>
      <AiwaPanelHeader size="large" title="Занести в журнал" />
      <div className="aiwa-log-scroll">
        <SectionList className="aiwa-log-sections">
          <SectionList.Item>
            <JournalGroup label="Chip">
              <AiwaChip label="Выбрано" active={chip} onClick={() => setChip(!chip)} />
              <AiwaChip label="Не выбрано" active={!chip} onClick={() => setChip(!chip)} />
            </JournalGroup>
          </SectionList.Item>
          <SectionList.Item>
            <JournalToggle label="Месячные" active={period} onChange={setPeriod} variant="period" />
          </SectionList.Item>
          <SectionList.Item>
            <JournalToggle label="Близость" active={intimacy} onChange={setIntimacy} />
          </SectionList.Item>
          <SectionList.Item>
            <JournalChoiceGroup
              label="Энергия"
              value={energy}
              onChange={setEnergy}
              options={[[1, "Низкая"], [3, "Средняя"], [5, "Высокая"]]}
            />
          </SectionList.Item>
          <SectionList.Item>
            <JournalSymptomGroup
              label="Самочувствие"
              symptoms={symptoms}
              onToggle={toggleSymptom}
              options={[["cramps", "Спазмы"], ["headache", "Головная боль"], ["irrit", "Раздражительность"]]}
            />
          </SectionList.Item>
          <SectionList.Item>
            <JournalCustomSymptom value={custom} onChange={setCustom} />
          </SectionList.Item>
        </SectionList>
        <div className="aiwa-log-footer">
          <RegularButton variant="filled" label="Сохранить" isFill />
        </div>
      </div>
    </Page>
  );
}

export function WeekPage() {
  const detailDays = weekDays.map((day, index) => ({
    ...day,
    actualPeriod: index < 3,
    predictedPeriod: index === 5,
    phase: index === 4 ? "fol" : undefined,
  }));
  const [selectedIso, setSelectedIso] = useState("2026-07-23");
  const summary = weekDaySummaries[selectedIso] ?? weekDaySummaries["2026-07-23"];

  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Week">
          <div className="aiwa-storybook-week">
            <Week days={weekDays} />
          </div>
        </SectionList.Item>
        <SectionList.Item header="Day Picker">
          <div className="aiwa-storybook-week">
            <Week
              days={pickerWeekDays}
              selectedIso={selectedIso}
              onSelect={(day) => setSelectedIso(day.iso)}
            />
            <div className="aiwa-countdown">
              <Text variant="title1" weight="semibold">{summary.value}</Text>
              <Text variant="body" weight="regular">{summary.label}</Text>
            </div>
          </div>
          <AiwaInsightCard message={summary.ai} onDiscuss={() => {}} />
        </SectionList.Item>
        <SectionList.Item header="Date States">
          <div className="aiwa-storybook-date-row">
            {detailDays.map((day) => <DateCell key={day.iso} day={day} />)}
          </div>
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function CalendarMarkingPage() {
  const [markMode, setMarkMode] = useState("period");
  const [pending, setPending] = useState({});
  const active = CALENDAR_MARK_MODES[markMode];
  const isChecked = (day) => {
    const optimistic = pending[`${markMode}:${day.iso}`];
    return typeof optimistic === "boolean" ? optimistic : Boolean(active.checked(day));
  };

  return (
    <Page>
      <SectionList>
        <SectionList.Item header="FAB" description="AiwaFab — GlassContainer + иконка примитивов. На календаре живёт в правом нижнем углу и открывает выбор того, что помечаем.">
          <div className="aiwa-storybook-fab-row">
            <AiwaFab icon={<PlusIcon />} label="Отметить день" onClick={() => {}} />
          </div>
        </SectionList.Item>

        <SectionList.Item header="Аппбар в режиме отметок · нативный путь" description="В Telegram выбор идёт через showPopup (на iOS — системный алерт) один раз, когда включаешь режим. Индикатора режима в аппбаре нет: слева пусто, справа только «Готово».">
          <div className="aiwa-storybook-appbar">
            <span className="aiwa-calendar-done"><Text variant="body" weight="semibold">Готово</Text></span>
          </div>
        </SectionList.Item>

        <SectionList.Item header="Mark bar · фолбэк" description="showPopup есть с Bot API 6.2 и максимум на три кнопки. Где его нет — старые клиенты, локальный стенд — те же варианты остаются на экране чипами, вместе с подсказкой. Заодно это переключалка режимов: выбери «Близость», чтобы увидеть сердечки в календаре ниже.">
          <div className="aiwa-storybook-mark-bar">
            <CalendarMarkBar
              options={calendarMarkOptions(["period", "symptoms", "intimacy"])}
              value={markMode}
              onChange={setMarkMode}
              hint={active.hint}
            />
          </div>
          <div className="aiwa-storybook-mark-bar">
            <CalendarMarkBar
              options={calendarMarkOptions(["symptoms", "intimacy"])}
              value="symptoms"
              onChange={() => {}}
              hint={CALENDAR_MARK_MODES.symptoms.hint}
            />
          </div>
        </SectionList.Item>

        <SectionList.Item header="Календарь в режиме отметок" description="Точки фазы уступают место радиокнопке, номер дня становится подписью над ней. Шаг строки не меняется, поэтому вход в режим не сдвигает календарь. В режиме «Близость» вместо радиокнопки сердечко: контур — не отмечено, заливка акцентом — отмечено.">
          <div className="aiwa-storybook-calendar" data-marking="true">
            <div className="aiwa-calendar-grid">
              {markingMonth.days.map((day) => (
                day.empty
                  ? <span className="aiwa-calendar-empty" aria-hidden="true" key={day.key} />
                  : (
                    <DateCell
                      key={day.key}
                      day={day}
                      interactive
                      marking
                      checked={isChecked(day)}
                      markVariant={markMode === "intimacy" ? "heart" : "radio"}
                      monthLabel={markingMonth.name}
                      showTodayLabel
                      onSelect={(selected) => setPending((current) => ({
                        ...current,
                        [`${markMode}:${selected.iso}`]: !isChecked(selected),
                      }))}
                    />
                  )
              ))}
            </div>
          </div>
        </SectionList.Item>

        <SectionList.Item header="Тот же месяц вне режима" description="Обычный вид: кольцо месячных, точка фазы, сердце близости. Тап ничего не помечает.">
          <div className="aiwa-storybook-calendar">
            <div className="aiwa-calendar-grid">
              {markingMonth.days.map((day) => (
                day.empty
                  ? <span className="aiwa-calendar-empty" aria-hidden="true" key={day.key} />
                  : <DateCell key={day.key} day={day} monthLabel={markingMonth.name} showTodayLabel />
              ))}
            </div>
          </div>
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function ChartsPage() {
  return (
    <Page mode="secondary">
      <SectionList className="aiwa-tma-blocks">
        <SectionList.Item header="Динамика цикла">
          <AiwaWebUiChart
            data={cycleChartData}
            series={cycleChartSeries}
            ariaLabel="Длина трёх последних циклов"
          />
        </SectionList.Item>
        <SectionList.Item header="Сравнение показателей">
          <AiwaWebUiChart
            data={wellbeingChartData}
            series={wellbeingChartSeries}
            ariaLabel="Энергия и качество сна за неделю"
          />
        </SectionList.Item>
        <ChartSection loading title="Загрузка" />
        <SectionList.Item header="Недостаточно данных">
          <AiwaWebUiChart
            data={[
              { label: "июл", value: "—" },
              { label: "авг", value: null },
            ]}
            emptyText="Продолжай вести дневник, чтобы увидеть динамику цикла"
          />
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function DaySelectorPage() {
  const [selectedIso, setSelectedIso] = useState("2026-07-23");
  const directAreaRef = useRef(null);
  const summary = homeDaySummary(selectedIso);
  const select = (day) => {
    setSelectedIso(day.iso);
    return day.iso;
  };

  return (
    <Page mode="secondary">
      <div className="aiwa-storybook-main">
        <Text variant="subheadline2" weight="semibold">Overview с живым счётчиком</Text>
        <div className="aiwa-overview">
          <DayOverview
            days={pickerWeekDays}
            selectedIso={selectedIso}
            heroValue={summary.value}
            heroLabel={summary.label}
            onSelect={select}
            previewDay={homeDaySummary}
          />
        </div>

        <Text variant="subheadline2" weight="semibold">Wheel без hero</Text>
        <div className="aiwa-overview">
          <div className="aiwa-day-overview" ref={directAreaRef}>
            <DayWheel
              days={pickerWeekDays}
              selectedIso={selectedIso}
              onSelect={select}
              dragAreaRef={directAreaRef}
            />
          </div>
        </div>
      </div>
    </Page>
  );
}

export function MainBlocksPage() {
  const [selectedIso, setSelectedIso] = useState("2026-07-23");
  const summary = homeDaySummary(selectedIso);

  return (
    <Page mode="secondary">
      <div className="aiwa-storybook-main">
        <ScreenDayHeader
          title={formatDayTitle(selectedIso)}
          days={pickerWeekDays}
          selectedIso={selectedIso}
          heroValue={summary.value}
          heroLabel={summary.label}
          onSelect={(day) => setSelectedIso(day.iso)}
          previewDay={homeDaySummary}
          onProfile={() => {}}
          onCalendar={() => {}}
          action={<RegularButton variant="filled" label={<span className="aiwa-btn-icon-label"><PlusIcon /> Занести в журнал</span>} />}
        />
        <SectionList className="aiwa-tma-blocks">
          <TodaySection checkin={todayCheckin} symptomGroups={symptomGroups} onSelect={() => {}} />
          <AiwaInsightCard
            message="Идут месячные, эстроген и прогестерон на минимуме. Энергии меньше, это норма, телу нужны отдых, тепло и железо."
            onDiscuss={() => {}}
          />
          <StatsSection metrics={metrics} title="Статистика" />
          <ChartSection
            data={cycleChartData}
            series={cycleChartSeries}
            title="Динамика цикла"
          />
          <HistorySection history={history} title="История цикла" />
        </SectionList>
        <SectionList>
          <SectionList.Item header="Питание">
            <div className="aiwa-storybook-macros">
              <MacroCard label="Белки" value={72} target={95} macro="protein" />
              <MacroCard label="Жиры" value={48} target={70} macro="fat" />
              <MacroCard label="Углеводы" value={126} target={210} macro="carbs" />
            </div>
          </SectionList.Item>
        </SectionList>
      </div>
    </Page>
  );
}

export function ActivityHeaderPage() {
  const [selectedIso, setSelectedIso] = useState("2026-07-23");
  const past = selectedIso !== "2026-07-23";

  return (
    <Page mode="secondary">
      <div className="aiwa-paper-screen aiwa-activity-screen">
        <ScreenDayHeader
          title={formatDayTitle(selectedIso)}
          days={pickerWeekDays}
          selectedIso={selectedIso}
          heroValue={past ? "1" : "2"}
          heroLabel={past ? "тренировка в этот день" : "тренировки на этой неделе"}
          previewDay={() => ({ value: "1", label: "тренировка в этот день" })}
          onSelect={(day) => setSelectedIso(day.iso)}
          onProfile={() => {}}
          onCalendar={() => {}}
          action={<RegularButton variant="filled" label={<span className="aiwa-btn-icon-label"><PlusIcon /> Отметить тренировку</span>} />}
        />
        <SectionList className="aiwa-tma-blocks">
          <AiwaInsightCard
            message="Выбирай нагрузку, после которой станет легче, а не хуже."
            onDiscuss={() => {}}
          />
          <SectionList.Item header="Варианты">
            <PaperRow title="Спокойная силовая" description="держит тонус без перегруза" onClick={() => {}} />
            <PaperRow title="Прогулка 40 минут" description="снимает отёчность" onClick={() => {}} />
          </SectionList.Item>
        </SectionList>
      </div>
    </Page>
  );
}

export function FoodHeaderPage() {
  const [selectedIso, setSelectedIso] = useState("2026-07-23");

  return (
    <Page mode="secondary">
      <div className="aiwa-paper-screen aiwa-food-screen">
        <ScreenDayHeader
          title={formatDayTitle(selectedIso)}
          days={pickerWeekDays}
          selectedIso={selectedIso}
          onSelect={(day) => setSelectedIso(day.iso)}
          onProfile={() => {}}
          onCalendar={() => {}}
          hero={(iso) => (
            <div className="aiwa-day-hero">
              <CalorieGauge kcal={iso === "2026-07-23" ? 720 : 1490} kcalTarget={1841} />
              <div className="aiwa-macro-grid">
                <MacroCard label="Жиры" value={48} target={65} macro="fat" />
                <MacroCard label="Белки" value={48} target={90} macro="protein" />
                <MacroCard label="Углеводы" value={48} target={114} macro="carbs" />
              </div>
            </div>
          )}
          action={<div className="aiwa-screen-cta"><RegularButton variant="filled" label={<span className="aiwa-btn-icon-label"><PlusIcon /> Добавить приём</span>} /></div>}
        />
      </div>
    </Page>
  );
}

export function TmaSurfacesPage() {
  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Card" description="Сырой контейнер под группу ячеек — без скруглений SectionList">
          <div className={padded}>
            <Card>
              <Cell><Cell.Text title="Первая строка" description="Разделитель есть" /></Cell>
              <Cell><Cell.Text title="Последняя строка" description="Разделитель скрыт" /></Cell>
            </Card>
          </div>
        </SectionList.Item>
        <SectionList.Item header="Start view" description="Пустое состояние экрана">
          <StartView title="Дневник пуст" description="Добавь первый приём пищи, и Айва посчитает КБЖУ" />
        </SectionList.Item>
        <SectionList.Item header="Train" description="Инлайн-ряд с разделителями">
          <div className={padded}>
            <Train divider="dot">
              <Text variant="subheadline1">День 14</Text>
              <Text variant="subheadline1">Овуляция</Text>
              <Text variant="subheadline1">28 дней</Text>
            </Train>
            <Train divider="space">
              <Badge>Белки</Badge>
              <Badge>Жиры</Badge>
              <Badge>Углеводы</Badge>
            </Train>
          </div>
        </SectionList.Item>
        <SectionList.Item header="Gradient background & glass" description="GradientBackground рисует фон на canvas, GlassContainer/GlassBorder дают матовый слой">
          <div className={padded}>
            <div style={{ position: "relative", height: 180, borderRadius: 16, overflow: "hidden" }}>
              <GradientBackground
                colors={["#FF7C3D", "#FFB067", "#FF5A8A", "#FFD8A8"]}
                colorsDark={["#B34C1F", "#7A3312", "#8A2E4B", "#5C3A1F"]}
                style={{ position: "absolute", inset: 0 }}
              />
              <GlassContainer style={{ position: "absolute", left: 16, right: 16, bottom: 16, padding: 12, borderRadius: 12 }}>
                <Text variant="subheadline1" weight="semibold">Фаза овуляции</Text>
              </GlassContainer>
            </div>
            <div style={{ position: "relative", padding: 12, borderRadius: 12 }}>
              <GlassBorder />
              <Text variant="caption1">GlassBorder — только тонкий контур</Text>
            </div>
          </div>
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function TmaListsPage() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);

  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Section header">
          <SectionHeader type="Headline" title="Сегодня" value="3 записи" />
          <Cell><Cell.Text title="Завтрак" description="410 ккал" /></Cell>
          <SectionHeader type="Footer" title="Обновлено 5 минут назад" />
        </SectionList.Item>

        <CellStack>
          <CellStack.Morph>
            <Cell end={<Cell.Text title="3" />}>
              <Cell.Text title="Приёмы пищи" bold />
            </Cell>
            <Cell end={<Cell.Text title="410 ккал" />}>
              <Cell.Text title="Завтрак" description="Творог и банан" bold />
            </Cell>
          </CellStack.Morph>
          {[["Обед", "620 ккал"], ["Ужин", "480 ккал"]].map(([title, kcal]) => (
            <Cell key={title} end={<Cell.Text title={kcal} />}>
              <Cell.Text title={title} bold />
            </Cell>
          ))}
        </CellStack>

        <SectionList.Item header="Table">
          <div className={padded}>
            <Table
              head={["Нутриент", "Сегодня", "Цель"]}
              rows={[
                ["Белки", "48 г", "90 г"],
                ["Жиры", "48 г", "65 г"],
                ["Углеводы", "48 г", "114 г"],
              ]}
              align={["left", "right", "right"]}
            />
          </div>
        </SectionList.Item>

        <SectionList.Item header="Collapsible" description={open ? "Раскрыто" : "Свёрнуто"}>
          <Cell as="button" onClick={() => setOpen((value) => !value)}>
            <Cell.Text title="Подробности цикла" />
          </Cell>
          <Collapsible open={open}>
            <Cell><Cell.Text title="Длина цикла" description="28 дней" /></Cell>
            <Cell><Cell.Text title="Длина менструации" description="5 дней" /></Cell>
          </Collapsible>
        </SectionList.Item>

        <SectionList.Item header="Gallery" description={`Страница ${page + 1} из 3`}>
          <Gallery onPageChange={setPage}>
            {["Фаза 1", "Фаза 2", "Фаза 3"].map((label) => (
              <div key={label} style={{ width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Text variant="title2" weight="bold">{label}</Text>
              </div>
            ))}
          </Gallery>
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function TmaControlsPage() {
  const [tab, setTab] = useState(0);
  const [reminders, setReminders] = useState(true);
  const [cycleLength, setCycleLength] = useState(28);
  const [pickedIndex, setPickedIndex] = useState(0);
  const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"];

  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Tabs" description={`Активная вкладка: ${tab + 1}`}>
          <div className={padded}>
            <Tabs tabs={["Неделя", "Месяц", "Год"]} activeTabIndex={tab} onChange={setTab} />
          </div>
        </SectionList.Item>

        <SectionList.Item header="Multiline button">
          <div className={padded} style={{ display: "flex", gap: 12 }}>
            <MultilineButton variant="filled" icon={<CameraIcon />} label="Камера" />
            <MultilineButton variant="plain" icon={<ImageIcon />} label="Фото" />
            <MultilineButton variant="plain" icon={<TextIcon />} label="Текстом" />
          </div>
        </SectionList.Item>

        <SectionList.Item header="Switch">
          <Cell end={<Switch value={reminders} onChange={setReminders} />}>
            <Cell.Text title="Утренние напоминания" />
          </Cell>
          <Cell end={<Switch defaultValue={false} disabled />}>
            <Cell.Text title="Экспорт в Health" description="Недоступно" />
          </Cell>
        </SectionList.Item>

        <SectionList.Item header="Tooltip">
          <div className={padded} style={{ display: "flex", justifyContent: "center", padding: "32px 16px" }}>
            <Tooltip content="Айва считает фазу по длине цикла" badge="NEW" placement="top">
              <span className="aiwa-storybook-icon"><InfoIcon /></span>
            </Tooltip>
          </div>
        </SectionList.Item>

        <SectionList.Item header="Wheel" description={`Длина цикла: ${cycleLength} дней`}>
          <div className={padded}>
            <Wheel value={cycleLength} onChange={setCycleLength} max={40} suffix=" дн." />
          </div>
        </SectionList.Item>

        <SectionList.Item header="Picker" description={`Выбрано: ${months[pickedIndex]}`}>
          <div className={padded} style={{ height: 200 }}>
            <Picker items={months} onPickerIndex={setPickedIndex} />
          </div>
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function TmaTextPage() {
  const [replay, setReplay] = useState(0);
  const [phase, setPhase] = useState(0);
  const phases = ["Менструация", "Фолликулярная", "Овуляция", "Лютеиновая"];

  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Markdown" description="Ответы Айвы приходят в markdown">
          <div className={padded}>
            <Markdown>{`### Что происходит сегодня

Ты в **овуляторной** фазе — энергии больше обычного.

- Силовая тренировка зайдёт лучше всего
- Добавь белка: 90 г за день

| Нутриент | Цель |
| --- | --- |
| Белки | 90 г |
| Жиры | 65 г |`}</Markdown>
          </div>
        </SectionList.Item>

        <SectionList.Item header="Streaming text" description="Появление текста по словам — для ответов ассистента">
          <div className={padded}>
            <StreamingText speed="normal" mode="word" replayKey={replay}>
              Сегодня хороший день для силовой тренировки: организм на пике энергии.
            </StreamingText>
            <RegularButton variant="outlined" label="Повторить" isFill onClick={() => setReplay((value) => value + 1)} />
          </div>
        </SectionList.Item>

        <SectionList.Item header="Morph" description="Плавная замена текста">
          <div className={padded}>
            <Cell as="button" onClick={() => setPhase((value) => (value + 1) % phases.length)}>
              <Text variant="title3" weight="semibold"><Morph>{phases[phase]}</Morph></Text>
            </Cell>
          </div>
        </SectionList.Item>

        <SectionList.Item header="Fit text" description="Масштабирует контент под ширину контейнера">
          <div className={padded}>
            <div style={{ width: 200, height: 56 }}>
              <FitText>
                <Text variant="title1" weight="bold">1841 ккал</Text>
              </FitText>
            </div>
          </div>
        </SectionList.Item>

        <SectionList.Item header="Image" description="img с плавным появлением после загрузки">
          <div className={padded}>
            <Image src={foodImage} alt="Приём пищи" style={{ width: "100%", borderRadius: 12 }} />
          </div>
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

export function TmaStatePage() {
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(true);

  return (
    <Page>
      <SectionList>
        <SectionList.Item header="Skeleton block & Redaction" description="Redaction — для текста, SkeletonBlock — для плашек и медиа">
          <Skeleton active={loading}>
            <Cell start={<SkeletonBlock className="aiwa-storybook-skeleton-avatar" />}>
              <Cell.Text
                title={<Redaction active={loading} width={14}>Завтрак</Redaction>}
                description={<Redaction active={loading} width={10}>410 ккал</Redaction>}
              />
            </Cell>
          </Skeleton>
          <div className={padded}>
            <RegularButton
              variant="outlined"
              label={loading ? "Показать данные" : "Показать загрузку"}
              isFill
              onClick={() => setLoading((value) => !value)}
            />
          </div>
        </SectionList.Item>

        <SectionList.Item header="Particle effect" description="Скрывает значение до тапа">
          <div className={padded} style={{ display: "flex", justifyContent: "center", padding: "24px 16px" }}>
            <ParticleEffect hidden={hidden} onClick={() => setHidden((value) => !value)}>
              <Text variant="title1" weight="bold">1841 ккал</Text>
            </ParticleEffect>
          </div>
        </SectionList.Item>

        <SectionList.Item header="Error boundary" description="Ловит падение поддерева и показывает fallback">
          <ErrorBoundary fallback={<Cell><Cell.Text title="Не удалось показать блок" /></Cell>}>
            <Cell end={<StatusIcon ok />}>
              <Cell.Text title="Блок отрисован без ошибок" />
            </Cell>
          </ErrorBoundary>
        </SectionList.Item>
      </SectionList>
    </Page>
  );
}

/**
 * Home sections in isolation. Each one is the exact block `HomeScreen` renders,
 * fed from fixtures instead of the bridge — the wrapper is the same
 * `.aiwa-tma-blocks` SectionList the screen uses, so spacing and card chrome are
 * the real thing and not a storybook approximation.
 */
export function SectionsPage() {
  return (
    <Page mode="secondary">
      <div className="aiwa-storybook-main">
        <SectionList className="aiwa-tma-blocks">
          <TodaySection checkin={todayCheckin} symptomGroups={symptomGroups} onSelect={() => {}} />
          <AiSection aiText="Идут месячные, эстроген и прогестерон на минимуме. Энергии меньше, это норма, телу нужны отдых, тепло и железо." />
          <DelaySection delay={delaySection} />
          <StatsSection metrics={metrics} title="Статистика" />
          <ChartSection data={cycleChartData} series={cycleChartSeries} title="Динамика цикла" />
          <HistorySection history={history} title="История цикла" />
        </SectionList>
      </div>
    </Page>
  );
}

/**
 * Every full-screen panel, opened for real. They are `AiwaModalView` portals, so
 * they can only be judged open — a static preview would show the sheet chrome
 * but none of the layout it actually gets over the app.
 *
 * Most panels that save go through `apiCall`, which rejects without the host
 * bridge: the storybook is the place to see that error path. The recipe alone
 * gets a deterministic fixture so its complete semantic content can be reviewed.
 */
export function PanelsPage() {
  const [open, setOpen] = useState(null);
  const close = () => setOpen(null);
  const noop = async () => {};

  // In the app a panel is dismissed with Telegram's native BackButton, and
  // `useBackButton` is a no-op outside Telegram — so without this the storybook
  // would open a panel it can never close. Escape plus a floating button, both
  // storybook-only: no product component grows a close affordance for this.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => { if (event.key === "Escape") close(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // CalendarPanel builds its months from `getAiwaCalendarMonth` on the host, and
  // `read` returns null without one — the panel would open on an empty grid.
  // RecipePanel gets one complete response. Every other API remains an error,
  // preserving the real unavailable-host state for saving panels.
  useEffect(() => {
    const previousCalendar = window.getAiwaCalendarMonth;
    const previousApi = window.aiwaApi;
    const previousData = window.aiwaData;
    window.getAiwaCalendarMonth = (offset) => (offset === 0 ? markingMonth : null);
    window.aiwaData = () => ({ name: "Анна", mode: "cycle", daily_summary_enabled: true });
    window.aiwaApi = (path, body) => {
      if (path === "/api/recipe") {
        if (body?.dish === "Загрузка рецепта") return new Promise(() => {});
        if (body?.dish === "Рецепт с ошибкой") return Promise.reject(new Error("Recipe fixture error"));
        return Promise.resolve({
          dish: body?.dish,
          kcal: 420,
          time: "25 минут",
          macros: { protein: "28 г", fat: "16 г", carbs: "42 г" },
          micros: ["Железо — 4 мг", "Клетчатка — 9 г"],
          ingredients: ["Говядина — 140 г", "Красная фасоль — 120 г", "Томаты — 160 г"],
          steps: ["Нарежь мясо и томаты.", "Потуши всё вместе 20 минут.", "Добавь фасоль и прогрей."],
        });
      }
      if (typeof previousApi === "function") return previousApi(path, body);
      return Promise.reject(new Error("API bridge is unavailable"));
    };
    return () => {
      if (previousCalendar === undefined) delete window.getAiwaCalendarMonth;
      else window.getAiwaCalendarMonth = previousCalendar;
      if (previousApi === undefined) delete window.aiwaApi;
      else window.aiwaApi = previousApi;
      if (previousData === undefined) delete window.aiwaData;
      else window.aiwaData = previousData;
    };
  }, []);

  const panels = [
    ["journal", "Журнал", "Занести самочувствие за сегодня"],
    ["journalPast", "Журнал за прошлый день", "Дата маршрутизируется в day-aware host methods"],
    ["calendar", "Календарь", "Месяц целиком, режим отметок и легенда"],
    ["calendarDay", "День в календаре", "Тот же журнал, но за выбранный день"],
    ["addFood", "Добавить приём", "Фото / текстом / вручную"],
    ["foodDiary", "Дневник питания", "Приёмы по слотам и итог за день"],
    ["foodDiaryPast", "Прошлый дневник питания", "Записи редактируются, новые приёмы и совет скрыты"],
    ["recipe", "Рецепт", "Фото, питательность, ингредиенты и шаги"],
    ["recipeLoading", "Рецепт · загрузка", "Долгая генерация с живым status"],
    ["recipeError", "Рецепт · ошибка", "Ответ недоступен, действие остаётся понятным"],
    ["workout", "Отметить тренировку", "Тип, длительность, упражнения"],
    ["workoutVariants", "Варианты тренировки", "Рекомендации на сегодня"],
    ["workoutHistory", "История тренировок", "Неделя и записи за сегодня"],
    ["trainingProfile", "Тренировочный профиль", "Цель, уровень, ограничения"],
    ["profile", "Профиль", "Настройки цикла и режима"],
  ];

  return (
    <Page>
      <SectionList>
        <SectionList.Item
          header="Панели"
          description="Открываются поверх витрины, как поверх приложения. В Telegram закрываются нативной «Назад»; здесь — Esc или кнопка в углу."
        >
          {panels.map(([key, title, description]) => (
            <Cell as="button" type="button" key={key} onClick={() => setOpen(key)} end={<Cell.Part type="Chevron" />}>
              <Cell.Text title={title} description={description} />
            </Cell>
          ))}
        </SectionList.Item>
      </SectionList>

      <JournalPanel
        isOpen={open === "journal"}
        onClose={close}
        checkin={todayCheckin}
        symptomGroups={symptomGroups}
        mode="cycle"
      />
      <JournalPanel
        isOpen={open === "journalPast"}
        onClose={close}
        checkin={{ ...todayCheckin, period: false }}
        symptomGroups={symptomGroups}
        mode="cycle"
        dayIso="2026-07-23"
      />
      <CalendarPanel
        isOpen={open === "calendar"}
        onClose={close}
        mode="cycle"
        revision={0}
        symptomGroups={symptomGroups}
      />
      <CalendarDayLogPanel
        open={open === "calendarDay"}
        onClose={close}
        iso="2026-07-23"
        label="23 июля"
        symptomGroups={symptomGroups}
      />
      <AddFoodPanel isOpen={open === "addFood"} onClose={close} onSaved={noop} />
      <FoodDiaryPanel
        isOpen={open === "foodDiary"}
        onClose={close}
        diary={foodDiary}
        onAdd={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        onReco={() => {}}
      />
      <FoodDiaryPanel
        isOpen={open === "foodDiaryPast"}
        onClose={close}
        diary={foodDiary}
        canAdd={false}
        onAdd={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
      <RecipePanel
        isOpen={open === "recipe"}
        onClose={close}
        meal={{ dish: "Тушёная говядина с фасолью", kcal: 420, note: "железо и белок" }}
        image={foodImage}
        slotLabel="Обед"
        onAdd={close}
      />
      <RecipePanel
        isOpen={open === "recipeLoading"}
        onClose={close}
        meal={{ dish: "Загрузка рецепта", kcal: 360 }}
        image={foodImage}
        slotLabel="Завтрак"
        onAdd={close}
      />
      <RecipePanel
        isOpen={open === "recipeError"}
        onClose={close}
        meal={{ dish: "Рецепт с ошибкой", kcal: 360 }}
        image={foodImage}
        slotLabel="Ужин"
        onAdd={close}
      />
      <WorkoutPanel
        isOpen={open === "workout"}
        onClose={close}
        onSaved={noop}
        suggested={{ name: "Пилатес", exercises: [] }}
        favoriteTypes={["Сквош"]}
        initialDate="2026-07-23"
        today="2026-07-23"
      />
      <WorkoutVariantsPanel
        isOpen={open === "workoutVariants"}
        onClose={close}
        options={workoutVariants}
        onSelect={close}
      />
      <WorkoutHistoryPanel
        isOpen={open === "workoutHistory"}
        onClose={close}
        state={workoutHistory}
        onAdd={() => {}}
      />
      <TrainingProfilePanel
        isOpen={open === "trainingProfile"}
        onClose={close}
        profile={trainingProfile}
        onSaved={noop}
      />
      <ProfilePanel isOpen={open === "profile"} onClose={close} />

      {open ? (
        <button type="button" className="aiwa-storybook-panel-close" onClick={close}>
          Закрыть панель · Esc
        </button>
      ) : null}
    </Page>
  );
}
