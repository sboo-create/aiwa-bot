import { AiwaChip } from "./AiwaChip";
import { CheckIcon } from "../lib/icons";

/**
 * Yes/no journal row (Месячные, Близость). No stock TMA control covers a
 * full-width binary pill, so this is an `AiwaChip` variant: same button base and
 * tokens, stretched with `isFill` and carrying a check mark in the `end` slot.
 * `variant` only tags the row for per-row styling — the selected state is the
 * shared chip ink, so orange stays reserved for the primary Save button.
 */
export function JournalToggle({ label, active, onChange, variant = "default" }) {
  return (
    <AiwaChip
      className={`aiwa-log-toggle is-${variant}-toggle`}
      label={label}
      active={active}
      isFill
      surface="canvas"
      aria-label={`${label}: ${active ? "да" : "нет"}`}
      onClick={() => onChange(!active)}
      end={(
        <span className="aiwa-log-toggle-mark" aria-hidden="true">
          {active ? <CheckIcon /> : null}
        </span>
      )}
    />
  );
}
