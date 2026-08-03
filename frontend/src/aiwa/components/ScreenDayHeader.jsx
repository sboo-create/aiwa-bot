import { AiwaPanelHeader } from "./AiwaPanelHeader";
import { ProfileAvatar } from "./ProfileAvatar";
import { DayOverview } from "./DayOverview";
import { CalendarIcon } from "../lib/icons";
import { dayStrip, dayTitle, selectDay, useSelectedDay } from "../lib/selectedDay";

/** Shared day header for Home, Food and Activity. */
export function ScreenDayHeader({
  title,
  days,
  selectedIso,
  onSelect,
  previewDay,
  heroValue,
  heroLabel,
  hero,
  action,
  onProfile,
  onCalendar,
}) {
  const shared = useSelectedDay();
  const iso = selectedIso ?? shared;

  return (
    <>
      <AiwaPanelHeader
        title={title || dayTitle(iso)}
        left={<ProfileAvatar />}
        onLeft={onProfile}
        leftAriaLabel="Открыть профиль"
        right={<CalendarIcon />}
        onRight={onCalendar}
        rightAriaLabel="Открыть календарь"
      />
      <div className="aiwa-overview">
        <DayOverview
          days={days ?? dayStrip()}
          selectedIso={iso}
          heroValue={heroValue}
          heroLabel={heroLabel}
          hero={hero}
          previewDay={previewDay}
          onSelect={onSelect ?? ((day) => selectDay(day.iso))}
        />
        {action}
      </div>
    </>
  );
}
