/**
 * @aiwa/ui — product UI kit on top of @deslop/tma for AIWA Telegram Mini App.
 * Prefer importing named pieces from this entry when composing new screens.
 */
export { bridge, installBridge } from "./bridge.jsx";

// Deslop TMA surface (Telegram Mini App primitives)
export { Badge } from "./lib/tma.js";
export { Card } from "./lib/tma.js";
export { Cell } from "./lib/tma.js";
export { CellStack } from "./lib/tma.js";
export { Collapsible } from "./lib/tma.js";
export { ErrorBoundary } from "./lib/tma.js";
export { FitText } from "./lib/tma.js";
export { Gallery } from "./lib/tma.js";
export { GlassBorder } from "./lib/tma.js";
export { GlassContainer } from "./lib/tma.js";
export { GradientBackground } from "./lib/tma.js";
export { Image } from "./lib/tma.js";
export { ImageAvatar } from "./lib/tma.js";
export { InitialsAvatar } from "./lib/tma.js";
export { Markdown } from "./lib/tma.js";
export { ModalView } from "./lib/tma.js";
export { Morph } from "./lib/tma.js";
export { MultilineButton } from "./lib/tma.js";
export { Page } from "./lib/tma.js";
export { PanelHeader } from "./lib/tma.js";
export { ParticleEffect } from "./lib/tma.js";
export { Picker } from "./lib/tma.js";
export { Redaction } from "./lib/tma.js";
export { RegularButton } from "./lib/tma.js";
export { SectionHeader } from "./lib/tma.js";
export { SectionList } from "./lib/tma.js";
export { SegmentedControl } from "./lib/tma.js";
export { Skeleton } from "./lib/tma.js";
export { SkeletonBlock } from "./lib/tma.js";
export { Spinner } from "./lib/tma.js";
export { StartView } from "./lib/tma.js";
export { StreamingText } from "./lib/tma.js";
export { Switch } from "./lib/tma.js";
export { TabBar } from "./lib/tma.js";
export { Table } from "./lib/tma.js";
export { Tabs } from "./lib/tma.js";
export { Tappable } from "./lib/tma.js";
export { Text } from "./lib/tma.js";
export { TMAProvider } from "./lib/tma.js";
export { Tooltip } from "./lib/tma.js";
export { Train } from "./lib/tma.js";
export { Wheel } from "./lib/tma.js";
export { useAppearance, useColorScheme, useSkin, useSnackbar } from "./lib/tma.js";

// Lib
export { call, read, apiCall, showToast, trackFlow, actionProps, closeMiniApp, openBotChat } from "./lib/api.js";
export {
  AIWA_SEQUENCE_FRAMES,
  AIWA_CARD_SEQUENCE_FRAMES,
  AIWA_SEQUENCE_FRAME_MS,
  AIWA_SEQUENCE_PAUSE_MS,
  sequenceFrames,
  preloadAiwaSequence,
  preloadAiwaPosters,
  areAiwaPostersReady,
  preloadAiwaAnimations,
  areAiwaAnimationsReady,
} from "./lib/sequence.js";
export * from "./lib/constants.js";
export * from "./lib/icons.js";
export { dateCellClassName } from "./lib/dateCellClassName.js";
export { dayStrip, dayTitle, getSelectedDay, selectDay, todayIso, useSelectedDay } from "./lib/selectedDay.js";

// Primitives / building blocks
export { AiwaSequence } from "./components/AiwaSequence.jsx";
export { AiwaWebUiChart } from "./components/AiwaWebUiChart.jsx";
export { DateCell } from "./components/DateCell.jsx";
export { Week } from "./components/Week.jsx";
export { DayWheel } from "./components/DayWheel.jsx";
export { DayOverview } from "./components/DayOverview.jsx";
export { ScreenDayHeader } from "./components/ScreenDayHeader.jsx";
export { StatusIcon } from "./components/StatusIcon.jsx";
export { MetricCell } from "./components/MetricCell.jsx";
export { AiwaChip } from "./components/AiwaChip.jsx";
export { AiwaButton } from "./components/AiwaButton.jsx";
export { AiwaFab } from "./components/AiwaFab.jsx";
export { CalendarMarkBar } from "./components/CalendarMarkBar.jsx";
export { JournalToggle } from "./components/JournalToggle.jsx";
export { JournalGroup } from "./components/JournalGroup.jsx";
export { JournalChoiceGroup } from "./components/JournalChoiceGroup.jsx";
export { JournalSymptomGroup } from "./components/JournalSymptomGroup.jsx";
export { JournalCustomSymptom } from "./components/JournalCustomSymptom.jsx";
export { ScreenLoading } from "./components/ScreenLoading.jsx";
export { HomeScreenLoading } from "./components/ScreenLoading.jsx";
export { Snackbar } from "./components/Snackbar.jsx";
export { ChoicePills } from "./components/ChoicePills.jsx";
export { ActionMenu } from "./components/ActionMenu.jsx";
export { Field } from "./components/Field.jsx";
export { AiwaCardHeading } from "./components/AiwaCardHeading.jsx";
export { AiwaCell } from "./components/AiwaCell.jsx";
export { AiwaModalView } from "./components/AiwaModalView.jsx";
export { AiwaPanelHeader } from "./components/AiwaPanelHeader.jsx";
export { AiwaInsightCard } from "./components/AiwaInsightCard.jsx";
export { PaperRow } from "./components/PaperRow.jsx";
export { FoodEntryForm } from "./components/FoodEntryForm.jsx";
export { MacroCard } from "./components/MacroCard.jsx";
export { CalorieGauge } from "./components/CalorieGauge.jsx";

// Sections
export { TodaySection } from "./sections/TodaySection.jsx";
export { AiSection } from "./sections/AiSection.jsx";
export { DelaySection } from "./sections/DelaySection.jsx";
export { StatsSection } from "./sections/StatsSection.jsx";
export { ChartSection } from "./sections/ChartSection.jsx";
export { HistorySection } from "./sections/HistorySection.jsx";

// Panels
export { JournalPanel } from "./panels/JournalPanel.jsx";
export { CalendarPanel } from "./panels/CalendarPanel.jsx";
export { CalendarDayLogPanel } from "./panels/CalendarDayLogPanel.jsx";
export { HomePanels } from "./panels/HomePanels.jsx";
export { AddFoodPanel } from "./panels/AddFoodPanel.jsx";
export { FoodDiaryPanel } from "./panels/FoodDiaryPanel.jsx";
export { RecipePanel } from "./panels/RecipePanel.jsx";
export { WorkoutPanel } from "./panels/WorkoutPanel.jsx";
export { WorkoutVariantsPanel } from "./panels/WorkoutVariantsPanel.jsx";
export { TrainingProfilePanel } from "./panels/TrainingProfilePanel.jsx";
export { WorkoutHistoryPanel } from "./panels/WorkoutHistoryPanel.jsx";
export { ProfilePanel } from "./panels/ProfilePanel.jsx";

// Screens
export { HomeScreen } from "./screens/HomeScreen.jsx";
export { FoodScreen } from "./screens/FoodScreen.jsx";
export { ActivityScreen } from "./screens/ActivityScreen.jsx";
export { ChatScreen } from "./screens/ChatScreen.jsx";
export { Navigation } from "./screens/Navigation.jsx";
