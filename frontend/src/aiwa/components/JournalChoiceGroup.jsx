import { AiwaChip } from "./AiwaChip";
import { JournalGroup } from "./JournalGroup";

/**
 * Single-choice journal row (energy, mood). `options` is a flat list of
 * `[value, label]` pairs; the chips wrap on their own.
 */
export function JournalChoiceGroup({ label, options, value, onChange }) {
  return (
    <JournalGroup label={label}>
      {options.map(([optionValue, optionLabel]) => (
        <AiwaChip
          key={optionValue}
          label={optionLabel}
          active={value === optionValue}
          onClick={() => onChange(optionValue)}
        />
      ))}
    </JournalGroup>
  );
}
