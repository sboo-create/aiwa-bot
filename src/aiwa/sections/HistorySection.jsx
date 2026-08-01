import { useState } from "react";
import { SectionList } from "../lib/tma";
import { AiwaCell } from "../components/AiwaCell";

/** Cycle/notes history: three entries folded, «Показать все» unfolds the rest. */
export function HistorySection({
  history,
  title = "История цикла",
}) {
  const [expanded, setExpanded] = useState(false);
  const rows = history || [];

  if (!rows.length) return null;

  const shown = expanded ? rows : rows.slice(0, 3);
  return (
    <SectionList.Item header={title}>
      {shown.map((row) => (
        <AiwaCell data-aiwa-history-cell="true" key={row.key} tappable={false}>
          <AiwaCell.Text title={row.title} description={row.description} />
        </AiwaCell>
      ))}
      {rows.length > 3 ? (
        <AiwaCell
          as="button"
          type="button"
          data-aiwa-row-variant="compact"
          onClick={() => setExpanded((value) => !value)}
        >
          <AiwaCell.Text type="Accent" title={expanded ? "Свернуть" : "Показать все"} />
        </AiwaCell>
      ) : null}
    </SectionList.Item>
  );
}
