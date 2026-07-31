import { Cell } from "../lib/tma";

/**
 * Product cell preset over Deslop Cell.
 * AIWA lists are intentionally dividerless; layout and interactions stay Deslop-owned.
 */
function AiwaCellComponent(props) {
  return <Cell {...props} data-aiwa-cell="true" />;
}

export const AiwaCell = Object.assign(AiwaCellComponent, {
  Start: Cell.Start,
  End: Cell.End,
  Part: Cell.Part,
  Text: Cell.Text,
  Editable: Cell.Editable,
  Switch: Cell.Switch,
});
