import { Text } from "../lib/tma";

/**
 * Labelled block of journal chips. Owns the caption typography and the wrapping
 * chip row, so choice groups and symptom groups stay identical.
 */
export function JournalGroup({ label, children }) {
  return (
    <div className="aiwa-log-group">
      <Text className="aiwa-log-label" variant="subheadline1" weight="regular">{label}</Text>
      <div className="aiwa-log-choices" role="group" aria-label={label}>
        {children}
      </div>
    </div>
  );
}
