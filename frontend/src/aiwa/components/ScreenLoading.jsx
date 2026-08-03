import { TMAProvider, Page, Redaction, SectionList, Skeleton, SkeletonBlock, Text } from "../lib/tma";
import { AiwaCell } from "./AiwaCell";

/**
 * Скелетон экрана: повторяет раскладку «Питания» и «Нагрузки», пока не приехали
 * данные. Shimmer целиком из TMA (Skeleton / SkeletonBlock / Redaction) — своей
 * анимации нет, здесь только геометрия блоков.
 */
const VARIANTS = {
  food: {
    hero: "gauge",
    sections: [
      { header: "Рекомендации", rows: 2, media: true },
      { header: "Прошедшие приёмы", rows: 3, media: true },
    ],
  },
  activity: {
    hero: "week",
    sections: [
      { header: "Варианты", rows: 3 },
      { header: "Прошедшие тренировки", rows: 2 },
    ],
  },
};

const range = (count) => Array.from({ length: count }, (_, index) => index);

function Hero({ kind }) {
  if (kind === "week") {
    return (
      <div className="aiwa-overview">
        <div className="aiwa-week">
          {range(7).map((index) => <SkeletonBlock key={index} className="aiwa-skeleton-day" />)}
        </div>
        <div className="aiwa-countdown">
          <Redaction active width={2} />
          <Redaction active width={18} />
        </div>
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

export function ScreenLoading({ title, variant = "food" }) {
  const { hero, sections } = VARIANTS[variant] || VARIANTS.food;

  return (
    <TMAProvider>
      <Page mode="secondary">
        {/* Скринридеру скелетон читается как пустая страница — озвучиваем
            ожидание. Перенос из ветки design-fixes. */}
        <div
          className={`aiwa-paper-screen aiwa-screen-skeleton aiwa-${variant}-screen`}
          role="status"
          aria-label="Айва загружается"
        >
          {/* Заголовок известен сразу — мигать ему незачем. */}
          <Text className="aiwa-screen-title" variant="title1" weight="semibold">{title}</Text>
          <Skeleton active>
            <Hero kind={hero} />
            <div className="aiwa-screen-cta">
              <SkeletonBlock className="aiwa-skeleton-cta" />
            </div>

            <SectionList className="aiwa-tma-blocks">
              <SectionList.Item className="aiwa-insight-section">
                <AiwaCell tappable={false}>
                  <div className="aiwa-insight-content">
                    <Redaction active width={30} />
                    <Redaction active width={26} />
                    <SkeletonBlock className="aiwa-skeleton-insight-cta" />
                  </div>
                </AiwaCell>
              </SectionList.Item>

              {sections.map((section) => (
                <SectionList.Item key={section.header} header={section.header}>
                  {range(section.rows).map((index) => (
                    <AiwaCell
                      key={index}
                      tappable={false}
                      start={section.media ? <SkeletonBlock className="aiwa-skeleton-thumb" /> : undefined}
                    >
                      <AiwaCell.Text
                        title={<Redaction active width={13} />}
                        description={<Redaction active width={22} />}
                      />
                    </AiwaCell>
                  ))}
                </SectionList.Item>
              ))}
            </SectionList>
          </Skeleton>
        </div>
      </Page>
    </TMAProvider>
  );
}
