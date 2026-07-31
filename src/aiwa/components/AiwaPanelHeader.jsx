import { PanelHeader, Text } from "../lib/tma";

/**
 * Product header preset on top of the Deslop PanelHeader.
 * Keep screen-specific content in props and the shared chrome in composition.css.
 * Spacing and the centred title stay the kit's own — do not restyle them here.
 *
 * `size="large"` is the Telegram large-title opening instead of a navigation
 * bar: the title left-aligned at the content inset in title1, no side actions
 * (those panels are navigated with the native BackButton). The centred bar
 * stays the default for screens that do carry actions.
 */
export function AiwaPanelHeader({ title, size = "regular", ...props }) {
  if (size === "large") {
    return (
      <div className="aiwa-panel-header is-large">
        <Text as="h1" variant="title1" weight="bold">{title}</Text>
      </div>
    );
  }

  return (
    <div className="aiwa-panel-header">
      <PanelHeader {...props}>{title}</PanelHeader>
    </div>
  );
}
