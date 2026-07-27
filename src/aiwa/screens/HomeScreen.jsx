import { TMAProvider, Page, ImageAvatar, RegularButton, SectionList, Text } from "../lib/tma";
import { CalendarIcon, PlusIcon } from "../lib/icons";
import { call, actionProps } from "../lib/api";
import { AiwaPanelHeader } from "../components/AiwaPanelHeader";
import { Week } from "../components/Week";
import { TodaySection } from "../sections/TodaySection";
import { AiSection } from "../sections/AiSection";
import { DelaySection } from "../sections/DelaySection";
import { StatsSection } from "../sections/StatsSection";
import { ChartSection } from "../sections/ChartSection";
import { HistorySection } from "../sections/HistorySection";
import { SymptomHistorySection } from "../sections/SymptomHistorySection";
import { PregnancyProgress } from "../sections/PregnancyProgress";
import { HomePanels } from "../panels/HomePanels";
import { ProfilePanel } from "../panels/ProfilePanel";

/**
 * Home:
 * - HEADER (paper): PanelHeader + week + countdown + journal CTA
 * - BLOCKS (TMA white cards): AI, delay, stats, chart, history
 */
/**
 * Аватар пользователя: фото из Telegram, если клиент его отдал, иначе круг
 * с первой буквой имени — дизайнерская фотография-заглушка на проде выглядела
 * как чужой профиль.
 */
function ProfileAvatar() {
  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const photo = tgUser?.photo_url;
  const data = typeof window.aiwaData === "function" ? window.aiwaData() : window.aiwaData;
  const name = (data?.name || tgUser?.first_name || "").trim();
  // Оранжевый круг с инициалом рисуется всегда; фото ложится поверх и просто
  // исчезает, если клиент его не отдал или загрузка упала.
  return (
    <span className="aiwa-avatar-initial" aria-hidden="true">
      {(name[0] || "•").toUpperCase()}
      {photo ? (
        <img
          className="aiwa-avatar-photo"
          src={photo}
          alt=""
          onError={(event) => { event.currentTarget.style.display = "none"; }}
        />
      ) : null}
    </span>
  );
}

export function HomeScreen(props) {
  return (
    <TMAProvider>
      <Page mode="secondary">
        <div className="aiwa-deslop-home">
          {/* ── HEADER only ── */}
          <AiwaPanelHeader
            title={props.dateText}
            left={<ProfileAvatar />}
            onLeft={() => window.AiwaDeslop?.openProfile?.()}
            leftAriaLabel="Открыть профиль"
            right={<CalendarIcon />}
            onRight={() => call("openHomePanel", "calendar")}
            rightAriaLabel="Открыть календарь"
          />

          <div className="aiwa-overview">
            <Week
              days={props.week}
              selectedIso={props.selectedIso}
              onSelect={props.onSelectDay ?? ((day) => call("aiwaSelectDay", day.iso))}
            />
            <div className="aiwa-countdown">
              <Text variant="title1" weight="semibold">
                {props.heroValue || `${props.countdown} дней`}
              </Text>
              <Text variant="body" weight="regular">{props.countdownLabel}</Text>
            </div>
            <RegularButton
              variant="filled"
              label={<span className="aiwa-btn-icon-label"><PlusIcon /> Занести в журнал</span>}
              {...actionProps("Занести в журнал", () => call("openHomePanel", "journal"))}
            />
          </div>

          {/* ── All content cards: white TMA sections ── */}
          <SectionList className="aiwa-tma-blocks">
            <TodaySection title={props.dayTitle} checkin={props.dayCheckin ?? props.checkin} symptomGroups={props.symptomGroups} />
            <AiSection aiText={props.aiText} aiChip={props.aiChip} />
            <DelaySection delay={props.delay} />
            <StatsSection metrics={props.metrics} title={props.statsTitle} />
            {props.pregnancy ? (
              <PregnancyProgress pregnancy={props.pregnancy} />
            ) : (
              <ChartSection
                data={props.chartData}
                series={props.chartSeries}
                title={props.chartTitle}
                band={props.chartBand}
                emptyText={props.chartEmptyText}
              />
            )}
            {props.mode === "meno" || props.mode === "preg" ? null : (
              <HistorySection
                history={props.history}
                title={props.historyTitle}
                emptyTitle={props.historyEmptyTitle}
                emptyDescription={props.historyEmptyDescription}
              />
            )}
            <SymptomHistorySection />
          </SectionList>

          <HomePanels
            panel={props.panel}
            onClose={props.onPanelClose}
            checkin={props.checkin}
            symptomGroups={props.symptomGroups}
            mode={props.mode}
            revision={props.panelRevision}
          />
          <ProfilePanel isOpen={props.profileOpen} onClose={props.onProfileClose} />
        </div>
      </Page>
    </TMAProvider>
  );
}
