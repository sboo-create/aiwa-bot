import { useRef } from "react";
import { Tappable, Text } from "../lib/tma";
import { JOURNAL_SYMPTOM_GROUPS } from "../lib/constants";
import { useWheelPan } from "../lib/useWheelPan";
import { call } from "../lib/api";

const CUSTOM_PREFIX = "custom:";

/**
 * code → label from the mode-specific groups the bridge sends with the payload
 * (cycle / meno / preg all use different codes). Falls back to the cycle set.
 */
function symptomLabels(symptomGroups) {
  const pairs = symptomGroups?.length
    ? symptomGroups.flatMap(([, options]) => options)
    : JOURNAL_SYMPTOM_GROUPS.flatMap(([, rows]) => rows.flat());
  return new Map(pairs);
}

/**
 * Home «Сегодня» block — the symptoms logged for the current day, as a
 * full-bleed horizontal scroller. Renders nothing when nothing is logged.
 * Tapping a chip opens the journal, where the entry can be edited.
 */
export function TodaySection({ title = "Сегодня", checkin, symptomGroups, onSelect }) {
  const codes = checkin?.symptoms ?? [];
  const rowRef = useRef(null);
  useWheelPan(rowRef, codes.length);

  if (!codes.length) return null;

  const labels = symptomLabels(symptomGroups);
  const handleSelect = onSelect ?? (() => call("openHomePanel", "journal"));

  return (
    <div className="aiwa-today">
      <Text className="aiwa-today-title" variant="body" weight="semibold">{title}</Text>
      <div className="aiwa-today-chips" role="group" aria-label={title} ref={rowRef}>
        {codes.map((code) => {
          // A custom symptom can run to 40 characters, so the chip is capped and
          // the label clips — the full text stays available on hover and in the journal.
          const label = code.startsWith(CUSTOM_PREFIX)
            ? code.slice(CUSTOM_PREFIX.length)
            : labels.get(code) ?? code;
          return (
            <Tappable
              as="button"
              type="button"
              mode="opacity"
              className="aiwa-today-chip"
              onClick={() => handleSelect(code)}
              title={label}
              key={code}
            >
              <Text variant="body" weight="regular">{label}</Text>
            </Tappable>
          );
        })}
      </div>
    </div>
  );
}
