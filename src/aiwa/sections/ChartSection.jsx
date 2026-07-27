import { lazy, Suspense } from "react";
import { SectionList } from "../lib/tma";

const AiwaWebUiChart = lazy(() => import("../components/AiwaWebUiChart.jsx").then((module) => ({
  default: module.AiwaWebUiChart,
})));

function ChartLoadingFallback() {
  return (
    <div className="aiwa-area-chart-state is-loading" role="status" aria-label="График загружается">
      <span className="aiwa-area-chart-skeleton" aria-hidden="true" />
    </div>
  );
}

export function ChartSection({
  data,
  series,
  xKey,
  loading = false,
  title = "Динамика цикла",
  emptyText = "Добавь ещё один завершённый цикл — здесь появится график.",
}) {
  return (
    <SectionList.Item header={title}>
      <Suspense fallback={<ChartLoadingFallback />}>
        <AiwaWebUiChart
          data={data}
          series={series}
          xKey={xKey}
          loading={loading}
          ariaLabel={title}
          emptyText={emptyText}
        />
      </Suspense>
    </SectionList.Item>
  );
}
