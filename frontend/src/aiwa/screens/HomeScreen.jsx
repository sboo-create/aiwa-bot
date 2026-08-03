import { TMAProvider, Page, RegularButton, SectionList } from "../lib/tma";
import { PlusIcon } from "../lib/icons";
import { call, read, actionProps } from "../lib/api";
import { selectDay } from "../lib/selectedDay";
import { ScreenDayHeader } from "../components/ScreenDayHeader";
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
 * - HEADER (paper): shared day ruler + countdown + journal CTA
 * - BLOCKS (TMA white cards): AI, delay, stats, chart, history
 */
const readDayHero = (iso) => {
  const patch = read("homeSelectedDayPatch", iso);
  return patch ? { value: patch.heroValue, label: patch.countdownLabel } : null;
};

export function HomeScreen(props) {
  return (
    <TMAProvider>
      <Page mode="secondary">
        <div className="aiwa-deslop-home">
          {/* ── HEADER only ── */}
          <ScreenDayHeader
            title={props.dateText}
            days={props.week}
            selectedIso={props.selectedIso}
            heroValue={props.heroValue || `${props.countdown} дней`}
            heroLabel={props.countdownLabel}
            onSelect={props.onSelectDay ?? ((day) => selectDay(day.iso))}
            previewDay={props.previewDay ?? readDayHero}
            onProfile={() => window.AiwaDeslop?.openProfile?.()}
            onCalendar={() => call("openHomePanel", "calendar")}
            action={(
              <RegularButton
                variant="filled"
                label={<span className="aiwa-btn-icon-label"><PlusIcon /> Занести в журнал</span>}
                {...actionProps("Занести в журнал", () => call("openHomePanel", "journal"))}
              />
            )}
          />

          {/* ── All content cards: white TMA sections ── */}
          <SectionList className="aiwa-tma-blocks">
            <TodaySection title={props.dayTitle} checkin={props.dayCheckin ?? props.checkin} symptomGroups={props.symptomGroups} />
            <AiSection aiText={props.aiText} />
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
            checkin={props.dayCheckin ?? props.checkin}
            dayIso={props.selectedIso}
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
