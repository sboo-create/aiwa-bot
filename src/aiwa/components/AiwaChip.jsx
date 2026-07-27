import { RegularButton, Tappable } from "../lib/tma";

/**
 * Selectable pill built on the design-system RegularButton — the single chip
 * used across the journal (energy, mood, symptoms) and, with `isFill`, for the
 * full-width journal toggles.
 *
 * The button variant carries the state so colours come from Deslop tokens:
 * `gray` (idle) → --tertiary-fill-background, `tinted` (selected) →
 * --secondary-button-color. `.aiwa-chip` in composition.css remaps those two
 * vars to the AIWA control surface and to ink-on-white for the selected state;
 * the accent is reserved for the panel's primary Save button.
 */
export function AiwaChip({
  label,
  active = false,
  onClick,
  isFill = false,
  end = null,
  className = "",
  ...rest
}) {
  const content = end ? (
    <span className="aiwa-chip-content">
      <span className="aiwa-chip-label">{label}</span>
      {end}
    </span>
  ) : (
    label
  );

  return (
    <Tappable
      as="button"
      type="button"
      mode="opacity"
      className={`aiwa-chip${isFill ? " is-fill" : ""}${className ? ` ${className}` : ""}`}
      aria-pressed={active}
      onClick={onClick}
      {...rest}
    >
      <RegularButton variant={active ? "tinted" : "gray"} label={content} isFill={isFill} />
    </Tappable>
  );
}
