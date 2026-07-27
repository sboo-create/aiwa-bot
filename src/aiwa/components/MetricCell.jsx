import { StatusIcon } from "./StatusIcon";
import { AiwaCell } from "./AiwaCell";

/** Pure TMA Cell — status icon in end slot */
export function MetricCell({ label, value, ok }) {
  return (
    <AiwaCell data-aiwa-metric-cell="true" tappable={false} end={<StatusIcon ok={ok} />}>
      <AiwaCell.Text title={label} description={value} />
    </AiwaCell>
  );
}
