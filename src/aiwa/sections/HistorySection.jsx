import { SectionList } from "../lib/tma";
import { AiwaCell } from "../components/AiwaCell";

export function HistorySection({
  history,
  title = "История цикла",
  emptyTitle = "История пока пуста",
  emptyDescription = "Она появится после первой сохранённой менструации.",
}) {
  return (
    <SectionList.Item header={title}>
      {history?.length ? history.map((row) => (
        <AiwaCell data-aiwa-history-cell="true" key={row.key} tappable={false}>
          <AiwaCell.Text title={row.title} description={row.description} />
        </AiwaCell>
      )) : (
        <AiwaCell data-aiwa-history-cell="true" tappable={false}>
          <AiwaCell.Text title={emptyTitle} description={emptyDescription} />
        </AiwaCell>
      )}
    </SectionList.Item>
  );
}
