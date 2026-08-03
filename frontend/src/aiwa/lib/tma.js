/**
 * Public Deslop TMA surface used by AIWA.
 * Prefer these re-exports in product code so the kit stays explicit and greppable.
 *
 * Deliberately not re-exported:
 * - DropdownMenu / TextField / PageSkeleton — AIWA has ActionMenu / Field / ScreenLoading
 * - AppBar / PageTransition / Link — require a wouter router; AppBar also renders null in Telegram
 * - SplitView — iPad two-pane layout, out of scope for the mini app
 * - StoryCard — trading-specific domain card
 * - Cells — alias of Cell
 * - AppearanceProvider / DeviceProvider — already composed by TMAProvider
 *
 * MotionProvider is also exported for the isolated toast root, which needs
 * LazyMotion without running appearance/device effects against document.body.
 */
export {
  Badge,
  Card,
  Cell,
  CellStack,
  Collapsible,
  ErrorBoundary,
  FitText,
  Gallery,
  GlassBorder,
  GlassContainer,
  GradientBackground,
  Image,
  ImageAvatar,
  InitialsAvatar,
  Markdown,
  ModalView,
  Morph,
  MotionProvider,
  MultilineButton,
  Page,
  PanelHeader,
  ParticleEffect,
  Picker,
  Redaction,
  RegularButton,
  SectionHeader,
  SectionList,
  SegmentedControl,
  Skeleton,
  SkeletonBlock,
  Snackbar as SnackbarBase,
  SnackbarHost,
  SnackbarProvider,
  Spinner,
  StartView,
  StreamingText,
  Switch,
  TabBar,
  Table,
  Tabs,
  Tappable,
  Text,
  TMAProvider,
  Tooltip,
  Train,
  Wheel,
  useAppearance,
  useColorScheme,
  useRedactionClassName,
  useSkeletonContext,
  useSkin,
  useSnackbar,
} from "@deslop/tma";

// Prefer these for new screens:
// - Page + SectionList + Cell for content
// - ModalView + PanelHeader for sheets
// - TabBar for bottom navigation (see screens/Navigation.jsx)
// - Skeleton + Spinner for loading states
