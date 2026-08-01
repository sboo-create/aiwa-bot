import { StatusIcon } from "./StatusIcon";
import { AiwaCell } from "./AiwaCell";
import { Tooltip } from "../lib/tma";

const PENDING_TEXT = "Рассчитывается";

// Пока значения нет, прочерк ничего не объясняет, а галка «в пределах нормы»
// врёт: нормой считать нечего. Такая строка говорит словами и показывает часы
// до первого посчитанного значения.
const isPending = (value) => {
  const text = String(value ?? "").trim();
  return !text || text === "—" || text === "–" || text === "-";
};

/** Pure TMA Cell — status icon in end slot */
export function MetricCell({ label, value, ok }) {
  const pending = isPending(value);
  const tooltip = ok
    ? "Значение в пределах нормы"
    : "Значения вышли за пределы нормы";

  return (
    <AiwaCell
      data-aiwa-metric-cell="true"
      tappable={false}
      end={pending ? (
        <StatusIcon pending />
      ) : (
        <Tooltip content={tooltip} placement="auto">
          <span className="aiwa-metric-status-hit">
            <StatusIcon ok={ok} />
          </span>
        </Tooltip>
      )}
    >
      <AiwaCell.Text title={label} description={pending ? PENDING_TEXT : value} />
    </AiwaCell>
  );
}
