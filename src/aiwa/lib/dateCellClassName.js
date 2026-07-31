export const dateCellClassName = (day, className = "") => [
  "aiwa-date-cell",
  day.actualPeriod ? "is-actual-period" : "",
  day.predictedPeriod ? "is-predicted-period" : "",
  day.phase ? `is-phase-${day.phase}` : "",
  day.workout ? "is-workout" : "",
  day.today ? "is-today" : "",
  day.selected ? "is-selected" : "",
  day.muted ? "is-muted" : "",
  className,
].filter(Boolean).join(" ");

