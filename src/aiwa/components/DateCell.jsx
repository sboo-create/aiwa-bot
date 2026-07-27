import { Tappable, Text } from "../lib/tma";
import { dateCellClassName } from "../lib/dateCellClassName";
import { CheckIcon, HeartIcon } from "../lib/icons";
import { call } from "../lib/api";

export function DateCell({
  day,
  interactive = false,
  monthLabel = "",
  showTodayLabel = false,
  variant = "",
  onSelect = null,
  marking = false,
  checked = false,
  // What the selection glyph is. «Близость» marks a day with the same heart the
  // calendar already uses for it outside marking mode, so the mark you are making
  // looks like the mark you will get; everything else keeps the neutral radio.
  markVariant = "radio",
}) {
  const heartMark = marking && markVariant === "heart";
  const variantClass = [variant ? `is-${variant}` : "", marking ? "is-marking" : ""].filter(Boolean).join(" ");
  // Marking mode turns the cell into a selection row: the cycle decoration (ring,
  // phase dot, heart) steps aside so the radio below the number is the only state
  // on screen, the way a native list looks once it enters «Выбрать». The cycle
  // state classes go with them — `is-actual-period` paints the number white for
  // the ring it no longer has, which would leave white ink on the white page.
  const stateDay = marking ? { iso: day.iso, today: day.today, muted: day.muted } : day;
  const content = (
    <>
      {marking ? null : <span className="aiwa-date-cell-ring" aria-hidden="true" />}
      <Text className="aiwa-date-cell-number" variant="body" weight="regular">{day.date}</Text>
      {marking ? (
        <span
          className={`aiwa-date-cell-radio${heartMark ? " is-heart" : ""}${checked ? " is-checked" : ""}`}
          aria-hidden="true"
        >
          {/* The heart is always drawn — CSS strokes it while «не отмечено» and
              fills it once tapped, so the glyph never jumps between two shapes. */}
          {heartMark ? <HeartIcon /> : (checked ? <CheckIcon /> : null)}
        </span>
      ) : null}
      {!marking && day.phase && !day.actualPeriod && !day.predictedPeriod ? <span className="aiwa-date-cell-dot" aria-hidden="true" /> : null}
      {!marking && day.intimacy ? <span className="aiwa-date-cell-heart" aria-hidden="true">♥</span> : null}
      {/* The «Сегодня» caption hangs above the cell, and marking mode spends that
          space on the radio of the row above. Today keeps the accent number instead. */}
      {showTodayLabel && day.today && !marking ? <Text className="aiwa-date-cell-today" variant="caption1" weight="regular">Сегодня</Text> : null}
    </>
  );

  if (!interactive) {
    return (
      <div className={dateCellClassName(stateDay, variantClass)} data-iso={day.iso} aria-label={`${day.label || "День"}, ${day.date}`}>
        {content}
      </div>
    );
  }

  // A strip spanning several months needs the month spoken out loud, otherwise
  // "26" alone does not identify the day.
  const month = monthLabel || day.monthLabel || "";
  const dateLabel = month ? `${day.date} ${month}` : `${day.label || "День"}, ${day.date}`;
  const stateLabel = marking
    ? (checked ? ", отмечено" : "")
    : `${day.actualPeriod ? ", отмечены месячные" : ""}${day.predictedPeriod ? ", прогноз месячных" : ""}${day.intimacy ? ", отмечена близость" : ""}`;

  return (
    <Tappable
      as="button"
      type="button"
      mode="opacity"
      disabled={day.disabled}
      aria-label={`${dateLabel}${stateLabel}`}
      aria-pressed={marking ? checked : (typeof day.selected === "boolean" ? day.selected : undefined)}
      className={dateCellClassName(stateDay, ["aiwa-calendar-day", variantClass].filter(Boolean).join(" "))}
      data-iso={day.iso}
      onClick={() => (onSelect ? onSelect(day) : call("aiwaCalendarDay", day.iso))}
    >
      {content}
    </Tappable>
  );
}
