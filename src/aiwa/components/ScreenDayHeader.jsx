import { AiwaPanelHeader } from "./AiwaPanelHeader";
import { ProfileAvatar } from "./ProfileAvatar";
import { DayOverview } from "./DayOverview";
import { CalendarIcon } from "../lib/icons";
import { dayStrip, dayTitle, selectDay, useSelectedDay } from "../lib/selectedDay";

/**
 * Шапка дня — одна и та же на главной, в питании и в нагрузке: аватар, дата,
 * календарь, барабан дней и жёлтая кнопка экрана.
 *
 * День общий для всех табов (см. lib/selectedDay), поэтому по умолчанию и
 * полоса, и выбранная дата берутся оттуда же — экрану остаётся только блок
 * между барабаном и кнопкой. Главная передаёт `days`/`selectedIso`/`title`
 * своими пропами: там их строит хост, и storybook подставляет фикстуры.
 */
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
