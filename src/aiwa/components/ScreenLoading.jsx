import { TMAProvider, Page, Redaction, Skeleton, SkeletonBlock } from "../lib/tma";
import { ScreenDayHeader } from "./ScreenDayHeader";

/**
 * Скелетон экрана: повторяет раскладку «Питания» и «Нагрузки», пока не приехали
 * данные. Shimmer целиком из TMA (Skeleton / SkeletonBlock / Redaction) — своей
 * анимации нет, здесь только геометрия блоков.
 */
const VARIANTS = {
  food: {
    hero: "gauge",
    cards: ["insight", "rows-2", "rows-3"],
  },
  activity: {
    hero: "week",
    cards: ["insight", "rows-3", "rows-2"],
  },
};

const range = (count) => Array.from({ length: count }, (_, index) => index);

function Hero({ kind }) {
  if (kind === "week") {
    return (
      <div className="aiwa-countdown">
        <Redaction active width={2} />
        <Redaction active width={18} />
      </div>
    );
  }
  return (
    <>
      <SkeletonBlock className="aiwa-skeleton-gauge" />
      <div className="aiwa-macro-grid">
        {range(3).map((index) => <SkeletonBlock key={index} className="aiwa-skeleton-macro" />)}
      </div>
    </>
  );
}

function LoadingCards({ cards }) {
  return (
    <div className="aiwa-skeleton-card-list" aria-hidden="true">
      {cards.map((card, index) => (
        <SkeletonBlock key={`${card}-${index}`} className={`aiwa-skeleton-card is-${card}`} />
      ))}
    </div>
  );
}

/**
 * The first React frame on Home. Its header geometry is deliberately identical
 * to ScreenDayHeader: 64px panel header, 193px day area, 48px action and the
 * same 32px closing inset. Cards stay as quiet full-surface rectangles.
 */
export function HomeScreenLoading({ showToday = false, showDelay = false }) {
  const cards = [
    ...(showToday ? ["today"] : []),
    "insight",
    ...(showDelay ? ["rows-1"] : []),
    "metrics",
    "chart",
  ];

  return (
    <div className="aiwa-deslop-home aiwa-home-skeleton" role="status" aria-label="Айва загружается">
      <Skeleton active>
        <div className="aiwa-boot-header" aria-hidden="true">
          <span className="aiwa-boot-side"><SkeletonBlock className="aiwa-boot-avatar" /></span>
          <SkeletonBlock className="aiwa-boot-title" />
          <span className="aiwa-boot-side is-trailing"><SkeletonBlock className="aiwa-boot-calendar" /></span>
        </div>
        <div className="aiwa-boot-overview" aria-hidden="true">
          <div className="aiwa-boot-day-overview">
            <SkeletonBlock className="aiwa-boot-wheel" />
            <SkeletonBlock className="aiwa-boot-counter" />
          </div>
          <SkeletonBlock className="aiwa-boot-action" />
        </div>
        <LoadingCards cards={cards} />
      </Skeleton>
    </div>
  );
}

/**
 * Шапка дня не мигает: аватар, дата и барабан известны до данных экрана, они
 * общие для всех табов. Скелетон закрывает только то, что придёт с сервера.
 */
export function ScreenLoading({ variant = "food" }) {
  const { hero, cards } = VARIANTS[variant] || VARIANTS.food;

  return (
    <TMAProvider>
      <Page mode="secondary">
        <div className={`aiwa-paper-screen aiwa-screen-skeleton aiwa-${variant}-screen`}>
          <ScreenDayHeader
            hero={() => <Skeleton active><Hero kind={hero} /></Skeleton>}
            action={<SkeletonBlock className="aiwa-skeleton-cta" />}
          />
          <Skeleton active>
            <LoadingCards cards={cards} />
          </Skeleton>
        </div>
      </Page>
    </TMAProvider>
  );
}
