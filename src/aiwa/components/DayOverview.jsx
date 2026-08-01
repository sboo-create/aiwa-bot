import { useRef, useState } from "react";
import { Calligraph } from "calligraph";
import { Text } from "../lib/tma";
import { DayWheel } from "./DayWheel";

/**
 * Top of every tab: the date ruler and the block it drives.
 *
 * The two live in one component so what the ruler drives can follow the finger.
 * Opening a day goes through the host and rebuilds the whole screen — chart
 * included — so it only happens once the drum stops. Until then `previewDay`
 * answers what the day under the selector holds, and only this block redraws.
 *
 * By default the block is Home's counter, worded by `previewDay`. A screen with
 * its own hero — the calorie gauge on «Питание» — passes `hero`, a function of
 * the day currently on screen; there `previewDay` only has to answer whether
 * that day can be drawn without waiting for the host.
 *
 * The block is also the drum's drag surface: a swipe anywhere between the header
 * and the yellow button turns the ruler.
 */
export function DayOverview({
  days,
  selectedIso = "",
  heroValue,
  heroLabel = "",
  onSelect,
  previewDay,
  hero,
}) {
  const areaRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const todayIso = days.find((day) => day.today)?.iso;
  // Today's counter is the one the host words for itself — «3 день», «5 дней
  // задержки», a pregnancy week. Remember it while it is on screen so scrubbing
  // back to today shows that, and not this component's guess at it.
  const todayHero = useRef(null);
  if (todayIso && selectedIso === todayIso) todayHero.current = { value: heroValue, label: heroLabel };

  const handleTick = (day) => {
    const shown = day.iso === todayIso && todayHero.current
      ? todayHero.current
      : (typeof previewDay === "function" ? previewDay(day.iso) : null);
    if (shown) setPreview({ iso: day.iso, value: shown.value, label: shown.label });
  };

  // Once the host has opened the day, its own wording takes over again.
  const live = preview && preview.iso !== selectedIso ? preview : null;

  return (
    <div className="aiwa-day-overview" ref={areaRef}>
      <DayWheel
        days={days}
        selectedIso={selectedIso}
        onSelect={onSelect}
        onTick={handleTick}
        dragAreaRef={areaRef}
      />
      {typeof hero === "function" ? hero(live ? live.iso : selectedIso) : (
        <div className="aiwa-countdown">
          <Text variant="title1" weight="semibold">
            <Calligraph variant="number" animation="snappy">
              {live ? live.value : heroValue}
            </Calligraph>
          </Text>
          <Text variant="body" weight="regular">
            <Calligraph variant="text" animation="snappy">
              {(live ? live.label : heroLabel) || ""}
            </Calligraph>
          </Text>
        </div>
      )}
    </div>
  );
}
