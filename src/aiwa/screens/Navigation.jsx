import { TMAProvider, TabBar, Tappable } from "../lib/tma";
import { HomeIcon, FoodIcon, TrainIcon } from "../lib/icons";
import { AiwaSequence } from "../components/AiwaSequence";
import { call, openBotChat } from "../lib/api";

/**
 * Bottom navigation — TMA TabBar as in storybook, plus AIWA mascot action on the right.
 * TabBar chrome (glass, icons, active indicator) is left to @deslop/tma.
 */
const TABS = [
  { id: "today", label: "Главная", icon: <HomeIcon /> },
  { id: "food", label: "Питание", icon: <FoodIcon /> },
  { id: "train", label: "Нагрузка", icon: <TrainIcon /> },
];

export function Navigation({ active }) {
  const selected = active === "stats" ? "today" : active;
  const defaultIndex = Math.max(0, TABS.findIndex((tab) => tab.id === selected));

  return (
    <TMAProvider>
      {/* Storybook pattern: fixed bottom host, pointer-events only on controls */}
      <div className="aiwa-nav-root" data-aiwa-nav="true">
        <div className="aiwa-nav-tabbar-layer">
          <TabBar
            tabs={TABS.map(({ label, icon }) => ({ label, icon }))}
            defaultIndex={defaultIndex}
            onChange={(index) => call("go", TABS[index].id)}
          />
        </div>
        <Tappable
          as="button"
          type="button"
          mode="opacity"
          className="aiwa-nav-mascot"
          aria-label="Открыть Айву"
          onClick={() => openBotChat()}
        >
          <AiwaSequence size={67} />
        </Tappable>
      </div>
    </TMAProvider>
  );
}
