# AIWA component contract

The local Storybook is the visual and behavioral source of truth:

```bash
npm run storybook
```

Open [Colors](http://127.0.0.1:5173/storybook/#/ui-kit/colors) or
[Main Screen Blocks](http://127.0.0.1:5173/storybook/#/compositions/main).
The chart API and its required states are shown on
[Charts](http://127.0.0.1:5173/storybook/#/aiwa/charts).
The complete Paper/Figma mapping is visible on
[Component Registry](http://127.0.0.1:5173/storybook/#/system/components).

Stable Paper/Figma names and their code owners live in
`src/aiwa/design-system/registry.json`. The round-trip workflow is documented
in `DESIGN_SYNC.md`.

## Approved TMA primitives

Import these only from `src/aiwa/lib/tma.js`:

- Structure: `TMAProvider`, `Page`, `SectionList`, `Card`, `SectionHeader`,
  `StartView`, `Train`
- Content: `Text`, `Badge`, `ImageAvatar`, `InitialsAvatar`, `Image`,
  `Markdown`, `StreamingText`, `FitText`, `Morph`
- Lists & data: `CellStack`, `Table`, `Gallery`, `Collapsible`
- Actions: `RegularButton`, `MultilineButton`, `Tappable`, `Switch`,
  `SegmentedControl`, `Tabs`, `Tooltip`, `Picker`, `Wheel`
- Chrome: `PanelHeader`, `TabBar`, `ModalView`
- Surfaces: `GlassContainer`, `GlassBorder`, `GradientBackground`
- Loading & state: `Skeleton`, `SkeletonBlock`, `Redaction`, `Spinner`,
  `ErrorBoundary`, `ParticleEffect`

Deliberately absent from the gateway, with the local component to use instead:
`DropdownMenu` → `ActionMenu`, `TextField` → `Field`,
`PageSkeleton` → `ScreenLoading`. `AppBar`, `PageTransition` and `Link` need a
wouter router; `SplitView` is an iPad layout; `StoryCard` is a trading card.

## Approved AIWA components

- Core: `AiwaButton`, `AiwaCell`, `PaperRow`, `AiwaModalView`, `AiwaPanelHeader`,
  `ScreenDayHeader`
- Cycle: `Week`, `DayOverview`, `DayWheel`, `DateCell`, `MetricCell`, `StatusIcon`
- AI: `AiwaInsightCard`, `AiwaCardHeading`, `AiwaSequence`
- Forms: `Field`, `ChoicePills`, `AiwaChip`, `JournalGroup`, `JournalToggle`,
  `JournalChoiceGroup`, `JournalSymptomGroup`, `JournalCustomSymptom`,
  `FoodEntryForm`
- Food: `MacroCard`, `CalorieGauge`
- Data visualization: `AiwaWebUiChart`, `ChartSection`
- Loading: `ScreenLoading`
- Feedback: `Snackbar` (нотификации/тосты; императивно — `showToast`),
  `ActionMenu`

## Approved AIWA sections and panels

- Sections (blocks of the Home stack): `TodaySection`, `AiSection`,
  `DelaySection`, `StatsSection`, `ChartSection`, `HistorySection` —
  [Sections](http://127.0.0.1:5173/storybook/#/compositions/sections)
- Panels (full-screen pages over the app): `JournalPanel`, `CalendarPanel`,
  `CalendarDayLogPanel`, `AddFoodPanel`, `FoodDiaryPanel`, `WorkoutPanel`,
  `WorkoutVariantsPanel`, `WorkoutHistoryPanel`, `TrainingProfilePanel`,
  `ProfilePanel` —
  [Panels](http://127.0.0.1:5173/storybook/#/compositions/panels)

A panel is dismissed with Telegram's native BackButton, which does not exist in
a browser — the Panels story adds its own Esc/close affordance for that.

## Tokens

Every colour, shadow and separator in the product comes from an `--aiwa-*` token
declared in `src/aiwa/styles/theme.css`, and nowhere else. The live palette,
with the value each token resolves to in the current theme, is on
[Colors](http://127.0.0.1:5173/storybook/#/ui-kit/colors).

- Ink: `--aiwa-ink`, `--aiwa-ink-secondary`, `--aiwa-ink-muted`,
  `--aiwa-ink-subtle`; on the accent — `--aiwa-on-accent`
- Surfaces: `--aiwa-screen-bg`, `--aiwa-surface`, `--aiwa-control-bg`,
  `--aiwa-fill-secondary`, `--aiwa-separator`
- Status: `--aiwa-success`, `--aiwa-warning` (never the brand accent — orange
  means «месячные»)
- Cycle phases: `--aiwa-phase-menstrual|follicular|ovulation|luteal`
- Macros: `--aiwa-macro-protein|fat|carbs`
- Shadows: `--aiwa-shadow-raised|card|gauge|overlay|menu`

Each level is a Deslop role underneath, so the whole scale flips with the kit's
own light/dark pair. A literal hex anywhere but `theme.css` fails
`npm run check:ui`.

## Rules

- New UI must compose this surface before introducing anything new.
- A missing component is added to the gateway and Storybook first.
- Product code uses `AiwaCell`, never raw `Cell`; this keeps cell changes global.
- Brand color comes from `--aiwa-accent`; never hardcode another accent.
- Colours, shadows and separators come from the `--aiwa-*` tokens above. Inline
  `style` is for values only the runtime knows — a percentage, a measured
  position, a custom property, or a token a vendored primitive insists on
  receiving through `style` (the tinted `Badge` reads `props.style.color`).
- Selectable pills are `AiwaChip` (a `RegularButton` in a `Tappable`): the button
  variant carries the state — `gray` idle, `tinted` selected, `filled` for
  `tone="strong"` — so a new chip never hand-rolls colours. Full-width binary
  rows are the same chip with `isFill` (see `JournalToggle`).
- Charts use `AiwaWebUiChart` and its semantic series tokens; do not embed new
  hand-written SVG charts.
- `npm run verify` is required for every UI change. It also validates the
  Paper/Figma registry and component ownership.
- Direct user instructions may override these rules for that request only.
