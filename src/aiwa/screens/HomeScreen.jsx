import { useEffect, useLayoutEffect, useState } from "react";
import { TMAProvider, Page, RegularButton, SectionList } from "../lib/tma";
import { PlusIcon } from "../lib/icons";
import { call, read, actionProps } from "../lib/api";
import { selectDay } from "../lib/selectedDay";
import { ScreenDayHeader } from "../components/ScreenDayHeader";
import { HomeScreenLoading } from "../components/ScreenLoading";
import {
  areAiwaPostersReady,
  preloadAiwaAnimations,
  preloadAiwaPosters,
} from "../lib/sequence";
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
 * - HEADER (paper): PanelHeader + day ruler + countdown + journal CTA
 * - BLOCKS (TMA white cards): AI, delay, stats, chart, history
 */

/**
 * What the counter says for a day, without opening it. The host words every day
 * of the strip the same way it words the one that is open, so the counter can
 * follow the ruler while the finger is still down. Outside the host — the design
 * storybook — the screen passes its own `previewDay` instead.
 */
const readDayHero = (iso) => {
  const patch = read("homeSelectedDayPatch", iso);
  return patch ? { value: patch.heroValue, label: patch.countdownLabel } : null;
};

export function HomeScreen(props) {
  const [postersReady, setPostersReady] = useState(areAiwaPostersReady);

  useLayoutEffect(() => {
    // React is committed behind the static boot skeleton. Swap it for the React
    // skeleton before paint, then keep navigation hidden only until both poster
    // frames are decoded. Full sequences continue loading behind the UI.
    document.querySelector("[data-aiwa-static-boot]")?.remove();
    document.body.classList.remove("aiwa-booting");
    document.body.classList.toggle("aiwa-assets-loading", !postersReady);
    const app = document.getElementById("app");
    if (postersReady) app?.removeAttribute("aria-busy");
    else app?.setAttribute("aria-busy", "true");
  }, [postersReady]);

  useEffect(() => {
    let active = true;
    preloadAiwaPosters().then(() => {
      if (active) setPostersReady(true);
    });
    // Deliberately not awaited: every AiwaSequence stays on its decoded poster
    // and begins playback only after preloadAiwaSequence resolves for it.
    preloadAiwaAnimations();
    return () => {
      active = false;
      document.body.classList.remove("aiwa-assets-loading");
    };
  }, []);

  return (
    <TMAProvider>
      <Page mode="secondary">
        {postersReady ? <div className="aiwa-deslop-home">
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
            checkin={props.checkin}
            symptomGroups={props.symptomGroups}
            mode={props.mode}
            revision={props.panelRevision}
          />
          <ProfilePanel isOpen={props.profileOpen} onClose={props.onProfileClose} />
        </div> : (
          <HomeScreenLoading
            showToday={Boolean((props.dayCheckin ?? props.checkin)?.symptoms?.length)}
            showDelay={Boolean(props.delay)}
          />
        )}
      </Page>
    </TMAProvider>
  );
}
