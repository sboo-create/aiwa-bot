import { GlassContainer, Text } from "../lib/tma";
import { AiwaChip } from "./AiwaChip";

/**
 * Bottom bar of the calendar marking mode: one chip per thing a tap can record
 * (месячные / симптомы / близость) plus a line telling what the tap will do.
 *
 * The chips are plain `AiwaChip` toggles rather than a `SegmentedControl`: the
 * options are a short, mode-dependent list (пустой «Месячные» в беременности и
 * менопаузе), and the chip already carries the selected state through Deslop
 * tokens. The bar itself is a `GlassContainer` so the calendar keeps showing
 * through it.
 */
export function CalendarMarkBar({ options, value, onChange, hint }) {
  return (
    <GlassContainer className="aiwa-mark-bar" role="group" aria-label="Что отмечаем">
      <div className="aiwa-mark-bar-chips">
        {options.map((option) => (
          <AiwaChip
            key={option.value}
            label={option.label}
            active={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
      {hint ? (
        <Text className="aiwa-mark-bar-hint" variant="footnote" weight="regular" role="status">
          {hint}
        </Text>
      ) : null}
    </GlassContainer>
  );
}
