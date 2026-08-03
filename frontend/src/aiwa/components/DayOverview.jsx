import { useEffect, useRef, useState } from "react";
import { Calligraph } from "calligraph";
import { Text } from "../lib/tma";
import { DayWheel } from "./DayWheel";

/** The date ruler and the hero it previews share one continuous drag surface. */
export function DayOverview(props) {
  const {
    days,
    selectedIso = "",
    heroValue,
    heroLabel = "",
    onSelect,
    previewDay,
    hero,
  } = props;
  const areaRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const todayHero = useRef(null);

  const todayIso = (days || []).find((day) => day.today)?.iso;
  if (todayIso && selectedIso === todayIso) {
    todayHero.current = { value: heroValue, label: heroLabel };
  }

  useEffect(() => {
    setPreview(null);
  }, [selectedIso]);

  const handleTick = (day) => {
    if (typeof hero === "function") {
      setPreview({ baseIso: selectedIso, iso: day.iso });
      return;
    }
    const shown = day.iso === todayIso && todayHero.current
      ? todayHero.current
      : (typeof previewDay === "function" ? previewDay(day.iso) : null);
    setPreview(shown ? {
      baseIso: selectedIso,
      iso: day.iso,
      value: shown.value,
      label: shown.label,
    } : null);
  };

  const live = preview?.baseIso === selectedIso && preview.iso !== selectedIso ? preview : null;

  return (
    <div className="aiwa-day-overview" ref={areaRef}>
      <DayWheel
        days={days}
        selectedIso={selectedIso}
        onSelect={onSelect}
        onTick={handleTick}
        onReset={() => setPreview(null)}
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
