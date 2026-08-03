import { aiwaTodayIso } from "./dates";

/** One guard shared by every CalendarPanel interaction branch. */
export const isCalendarDaySelectable = (day, today = aiwaTodayIso()) => Boolean(
  day?.iso && !day.disabled && day.iso <= today,
);
