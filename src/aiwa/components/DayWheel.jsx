import { useEffect, useRef } from "react";
import { Wheel } from "../lib/tma";
import { hapticLight } from "../lib/haptics";

/** How long the drum has to stand still on a day before that day is opened. */
const SETTLE_MS = 140;

/**
 * Date ruler on Home. The drum runs from the oldest tracked day to today —
 * days ahead of today are never on it, they cannot be opened anyway — and the
 * screen below follows the day standing in the middle.
 *
 * Two ways out, because they cost different things. `onTick` fires on every day
 * the selector passes, for whatever can be redrawn under a moving finger.
 * `onSelect` waits for the drum to come to rest: opening a day rebuilds the
 * whole screen through the host, and a swipe across a month would otherwise ask
 * for one rebuild per day on the way.
 */
export function DayWheel({ days, selectedIso = "", onSelect, onTick, dragAreaRef }) {
  const openable = days.filter((day) => !day.disabled);
  const found = openable.findIndex((day) => day.iso === selectedIso);
  // Nothing selected yet — or a day that fell off the strip — opens on today,
  // the day the drum ends on, rather than on the oldest day in the history.
  const value = (found >= 0 ? found : openable.length - 1) + 1;

  // Latest props for the settle timer below: it is armed mid-gesture and must
  // read the strip as it is when it fires, not as it was when it was armed.
  const latest = useRef(null);
  latest.current = { openable, selectedIso, onSelect };
  const pendingValue = useRef(value);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleChange = (next) => {
    if (next !== pendingValue.current) hapticLight();
    pendingValue.current = next;
    const day = openable[next - 1];
    if (day && typeof onTick === "function") onTick(day);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const { openable: current, selectedIso: selected, onSelect: select } = latest.current;
      const settled = current[pendingValue.current - 1];
      if (!settled || settled.iso === selected || typeof select !== "function") return;
      select(settled);
    }, SETTLE_MS);
  };

  if (!openable.length) return null;

  return (
    <Wheel
      className="aiwa-day-wheel"
      value={value}
      max={openable.length}
      onChange={handleChange}
      formatTick={(tick) => openable[tick - 1]?.date}
      showValue={false}
      showLimits={false}
      indicator="label"
      ariaLabel="Выбор дня"
      dragAreaRef={dragAreaRef}
      enableHaptic={false}
    />
  );
}
