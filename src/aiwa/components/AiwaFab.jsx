import { GlassContainer, Tappable } from "../lib/tma";

/**
 * Floating action button — a frosted disc pinned to a screen corner.
 *
 * TMA has no FAB of its own (`RegularButton` is a label-only pill), so this is
 * the closest kit-native composition: the Deslop `GlassContainer` surface for
 * background + shadow + rim, `Tappable` for the press behaviour, and a Deslop
 * primitive icon as the glyph. Positioning belongs to the host screen — the FAB
 * only owns its own shape.
 */
export function AiwaFab({ icon, label, onClick, className = "", ...rest }) {
  return (
    <Tappable
      as="button"
      type="button"
      mode="opacity"
      aria-label={label}
      className={`aiwa-fab${className ? ` ${className}` : ""}`}
      onClick={onClick}
      {...rest}
    >
      <GlassContainer className="aiwa-fab-surface">
        <span className="aiwa-fab-icon" aria-hidden="true">{icon}</span>
      </GlassContainer>
    </Tappable>
  );
}
