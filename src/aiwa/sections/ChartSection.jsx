import { lazy, Suspense } from "react";
import { SectionList, Text } from "../lib/tma";

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

function ChartLoadingSection({ title }) {
  return (
    <section className="aiwa-chart-loading-section">
      <Text
        as="p"
        className="aiwa-chart-loading-title"
        variant="body"
        weight="semibold"
      >
        {title}
      </Text>
      <ChartLoadingFallback />
    </section>
  );
}

export function ChartSection({
  data,
  series,
  xKey,
  band = null,
  loading = false,
  title = "Динамика цикла",
  emptyText = "Продолжай вести дневник, чтобы увидеть динамику цикла",
}) {
  if (loading) return <ChartLoadingSection title={title} />;

  return (
    <Suspense fallback={<ChartLoadingSection title={title} />}>
      <SectionList.Item header={title}>
        <AiwaWebUiChart
          data={data}
          series={series}
          xKey={xKey}
          band={band}
          ariaLabel={title}
          emptyText={emptyText}
        />
      </SectionList.Item>
    </Suspense>
  );
}
