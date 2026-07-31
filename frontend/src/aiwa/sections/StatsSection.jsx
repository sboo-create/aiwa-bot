import { SectionList } from "../lib/tma";
import { MetricCell } from "../components/MetricCell";

/** Content block — pure TMA SectionList (no paper title chrome) */
export function StatsSection({ metrics, title = "Статистика" }) {
  if (!metrics?.length) return null;
  return (
    <SectionList.Item header={title}>
      {metrics.map((metric) => (
        <MetricCell key={metric.label} {...metric} />
      ))}
    </SectionList.Item>
  );
}
