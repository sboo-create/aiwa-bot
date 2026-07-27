import { useState } from "react";
import { SectionList } from "../lib/tma";
import { AiwaCell } from "../components/AiwaCell";

/** Cycle/notes history: three entries folded, «Показать все» unfolds the rest. */
export function HistorySection({
  history,
  title = "История цикла",
  emptyTitle = "История пока пуста",
  emptyDescription = "Она появится после первой сохранённой менструации.",
}) {
  const [expanded, setExpanded] = useState(false);
  const rows = history || [];
  const shown = expanded ? rows : rows.slice(0, 3);
  return (
    <SectionList.Item header={title}>
      {shown.length ? shown.map((row) => (
        <AiwaCell data-aiwa-history-cell="true" key={row.key} tappable={false}>
          <AiwaCell.Text title={row.title} description={row.description} />
        </AiwaCell>
      )) : (
        <AiwaCell data-aiwa-history-cell="true" tappable={false}>
          <AiwaCell.Text title={emptyTitle} description={emptyDescription} />
        </AiwaCell>
      )}
      {rows.length > 3 ? (
        <AiwaCell
          as="button"
          type="button"
          onClick={() => setExpanded((value) => !value)}
          end={<AiwaCell.Part type="Chevron" />}
        >
          <AiwaCell.Text type="Accent" title={expanded ? "Свернуть" : "Показать все"} />
        </AiwaCell>
      ) : null}
    </SectionList.Item>
  );
}
