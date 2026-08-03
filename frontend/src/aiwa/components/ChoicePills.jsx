import { Tappable, Text } from "../lib/tma";

/**
 * Single-choice pills. The container surface is borderless; `surface="canvas"`
 * reserves an accent edge for the selected pill when the group sits directly
 * on the gray application background.
 */
export function ChoicePills({ label, options, value, onChange, surface = "container" }) {
  return (
    <div className="aiwa-form-group">
      {label ? <Text className="aiwa-form-label" variant="body" weight="semibold">{label}</Text> : null}
      <div className={`aiwa-choice-pills${surface === "canvas" ? " is-on-canvas" : ""}`} role="group" aria-label={label}>
        {options.map((option) => {
          const item = typeof option === "string" ? { value: option, label: option } : option;
          return (
            <Tappable
              as="button"
              type="button"
              mode="opacity"
              className={value === item.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill"}
              aria-pressed={value === item.value}
              onClick={() => onChange(item.value)}
              key={item.value}
            >
              <Text variant="body" weight="regular">{item.label}</Text>
            </Tappable>
          );
        })}
      </div>
    </div>
  );
}
