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
import { Text } from "../lib/tma";
import "../styles/chart-states.css";

const DEFAULT_SERIES = [
  {
    key: "value",
    label: "Значение",
    color: "var(--aiwa-accent)",
  },
];

// Empty cycle history keeps the shape of the real chart, but muted and without
// values, axes, grid lines, month labels, or interactive hints.
const PLACEHOLDER_DATA = [10, 6, 4].map((value, index) => ({
  label: String(index),
  value,
}));

const PLACEHOLDER_CONFIG = {
  value: { label: "", color: "var(--aiwa-ink-muted)" },
};

function isFiniteChartValue(value) {
  return value !== null
    && value !== undefined
    && value !== ""
    && Number.isFinite(Number(value));
}

function ChartEmptyState({ gradientId, emptyText }) {
  return (
    <div className="aiwa-area-chart-empty">
      <div className="aiwa-area-chart-empty-plot" aria-hidden="true">
        <ChartContainer config={PLACEHOLDER_CONFIG} className="h-40 w-full">
          <AreaChart
            data={PLACEHOLDER_DATA}
            margin={{ top: 8, left: 4, right: 4, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.26} />
                <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" hide padding={{ left: 22, right: 22 }} />
            <YAxis hide domain={[0, 12]} />
            <Area
              dataKey="value"
              type="natural"
              fill={`url(#${gradientId})`}
              fillOpacity={1}
              stroke="var(--color-value)"
              strokeOpacity={0.7}
              dot={{
                r: 4,
                fill: "var(--color-value)",
                stroke: "var(--aiwa-surface)",
                strokeWidth: 3,
              }}
              activeDot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ChartContainer>
      </div>
      <Text
        as="p"
        className="aiwa-area-chart-empty-text"
        variant="subheadline1"
        weight="regular"
        role="status"
      >
        {emptyText}
      </Text>
    </div>
  );
}

export function AiwaWebUiChart({
  data = [],
  series = DEFAULT_SERIES,
  xKey = "label",
  ariaLabel = "График динамики",
  emptyText = "Продолжай вести дневник, чтобы увидеть динамику цикла",
  loading = false,
  showLegend,
  band = null,
}) {
  const gradientPrefix = useId().replaceAll(":", "");
  const safeData = Array.isArray(data) ? data : [];
  const safeSeries = Array.isArray(series) ? series : DEFAULT_SERIES;
  const shouldShowLegend = showLegend ?? safeSeries.length > 1;
  // Длинная история скроллится по горизонтали; открывается на свежих циклах.
  const scrollRef = useRef(null);
  useEffect(() => {
    const box = scrollRef.current;
    if (box) box.scrollLeft = box.scrollWidth;
  }, [safeData.length]);
  // A single point or a non-numeric placeholder is not enough to show a trend.
  const availableSeries = safeSeries.filter((item) => (
    item?.key
    && safeData.filter((point) => isFiniteChartValue(point?.[item.key])).length >= 2
  ));
  const chartData = safeData.map((point) => {
    const normalized = { ...point };
    availableSeries.forEach((item) => {
      const value = point?.[item.key];
      normalized[item.key] = isFiniteChartValue(value) ? Number(value) : null;
    });
    return normalized;
  });
  const config = Object.fromEntries(availableSeries.map((item) => [
    item.key,
    {
      label: item.label || item.key,
      color: item.color || "var(--aiwa-accent)",
    },
  ]));
  const values = chartData.flatMap((point) => (
    availableSeries
      .map((item) => point?.[item.key])
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

  if (!safeData.length || !availableSeries.length) {
    return <ChartEmptyState gradientId={`${gradientPrefix}-empty`} emptyText={emptyText} />;
  }

  const minWidth = Math.max(chartData.length * 56, 320);
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
        data={chartData}
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
            fill="var(--aiwa-hint-color, var(--aiwa-ink-muted))"
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
        {shouldShowLegend ? <ChartLegend content={<ChartLegendContent />} /> : null}
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
