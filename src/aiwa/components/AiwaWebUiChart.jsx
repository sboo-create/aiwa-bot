import { useEffect, useId, useRef } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  ReferenceArea,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../vendor/deslop-web-ui/src/components/ui/chart.tsx";

const DEFAULT_SERIES = [
  {
    key: "value",
    label: "Значение",
    color: "var(--aiwa-accent)",
  },
];

export function AiwaWebUiChart({
  data = [],
  series = DEFAULT_SERIES,
  xKey = "label",
  ariaLabel = "График динамики",
  emptyText = "Пока недостаточно данных для графика.",
  loading = false,
  showLegend = series.length > 1,
  band = null,
}) {
  const gradientPrefix = useId().replaceAll(":", "");
  // Длинная история скроллится по горизонтали; открывается на свежих циклах.
  const scrollRef = useRef(null);
  useEffect(() => {
    const box = scrollRef.current;
    if (box) box.scrollLeft = box.scrollWidth;
  }, [data.length]);
  const availableSeries = series.filter((item) => (
    item?.key && data.some((point) => point?.[item.key] != null)
  ));
  const config = Object.fromEntries(availableSeries.map((item) => [
    item.key,
    {
      label: item.label || item.key,
      color: item.color || "var(--aiwa-accent)",
    },
  ]));
  const values = data.flatMap((point) => (
    availableSeries
      .map((item) => Number(point?.[item.key]))
      .filter(Number.isFinite)
  ));
  const valueMin = values.length ? Math.min(...values) : 0;
  const valueMax = values.length ? Math.max(...values) : 1;
  const valueSpan = valueMax - valueMin;
  const domainPadding = Math.max(1, valueSpan * 0.35, Math.abs(valueMax) * 0.04);
  const yDomain = [
    Math.min(band ? band[0] - 1 : Infinity, valueMin >= 0 ? Math.max(0, Math.floor(valueMin - domainPadding)) : Math.floor(valueMin - domainPadding)),
    Math.max(band ? band[1] + 1 : -Infinity, Math.ceil(valueMax + domainPadding)),
  ];

  if (loading) {
    return (
      <div className="aiwa-area-chart-state is-loading" role="status" aria-label="График загружается">
        <span className="aiwa-area-chart-skeleton" aria-hidden="true" />
      </div>
    );
  }

  if (!data.length || !availableSeries.length) {
    return (
      <div className="aiwa-area-chart-state" role="status">
        {emptyText}
      </div>
    );
  }

  const minWidth = Math.max(data.length * 56, 320);
  return (
    <div className="aiwa-chart-scroll" data-band={band ? band.join("-") : "none"} ref={scrollRef}>
      <div style={{ minWidth: `${minWidth}px` }}>
        <ChartContainer
          config={config}
          className="h-64 w-full"
          role="img"
          aria-label={ariaLabel}
        >
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{ top: 20, left: 4, right: 12 }}
      >
        <defs>
          {availableSeries.map((item, index) => (
            <linearGradient
              id={`${gradientPrefix}-${item.key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              key={item.key}
            >
              <stop
                offset="5%"
                stopColor={`var(--color-${item.key})`}
                stopOpacity={index === 0 ? 0.35 : 0.28}
              />
              <stop
                offset="95%"
                stopColor={`var(--color-${item.key})`}
                stopOpacity={index === 0 ? 0.06 : 0.04}
              />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} />
        {band ? (
          <ReferenceArea
            y1={band[0]}
            y2={band[1]}
            ifOverflow="extendDomain"
            fill="var(--aiwa-hint-color, #8e8e93)"
            fillOpacity={0.12}
            stroke="none"
          />
        ) : null}
        <XAxis
          dataKey={xKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          padding={{ left: 22, right: 22 }}
          interval={0}
        />
        <YAxis hide domain={yDomain} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        {showLegend ? <ChartLegend content={<ChartLegendContent />} /> : null}
        {availableSeries.map((item, index) => (
          <Area
            key={item.key}
            dataKey={item.key}
            type="natural"
            fill={`url(#${gradientPrefix}-${item.key})`}
            fillOpacity={1}
            stroke={`var(--color-${item.key})`}
            strokeOpacity={0.55}
            stackId={item.stacked ? "values" : undefined}
            strokeDasharray={item.dashed ? "5 5" : undefined}
            dot={{
              r: 4,
              fill: `var(--color-${item.key})`,
              stroke: "var(--aiwa-surface)",
              strokeWidth: 3,
            }}
            activeDot={{
              r: 5,
              fill: `var(--color-${item.key})`,
              stroke: "var(--aiwa-surface)",
              strokeWidth: 3,
            }}
            isAnimationActive
            animationDuration={240}
            animationBegin={index * 30}
          >
            <LabelList
              dataKey={item.key}
              position="top"
              offset={12 + index * 10}
              fill="var(--aiwa-ink)"
              fontSize={12}
              fontWeight={600}
            />
          </Area>
        ))}
      </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
