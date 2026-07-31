import { AiwaChip } from "./AiwaChip";
import { JournalGroup } from "./JournalGroup";

/**
 * Multi-select journal row (symptoms). `options` is a flat list of
 * `[code, label]` pairs; the chips wrap on their own.
 */
export function JournalSymptomGroup({ label, options, symptoms, onToggle }) {
  return (
    <JournalGroup label={label}>
      {options.map(([code, optionLabel]) => (
        <AiwaChip
          key={code}
          label={optionLabel}
          active={symptoms.includes(code)}
          onClick={() => onToggle(code)}
        />
      ))}
    </JournalGroup>
  );
}
