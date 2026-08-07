import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Text, Badge, Tappable } from "../lib/tma";
import { DateCell } from "../components/DateCell";
import { AiwaFab } from "../components/AiwaFab";
import { ActionMenu } from "../components/ActionMenu";
import { CalendarMarkBar } from "../components/CalendarMarkBar";
import { CalendarDayLogPanel } from "./CalendarDayLogPanel";
import { InfoIcon, PlusIcon } from "../lib/icons";
import { CALENDAR_LEGEND, CALENDAR_MARK_MODES, calendarMarkOptions } from "../lib/constants";
import { useBackButton } from "../lib/backButton";
import { nativeMenuSupported, read } from "../lib/api";
import { aiwaTodayIso } from "../lib/dates";
import { isCalendarDaySelectable } from "../lib/calendarDay";

/**
 * Calendar opens as a full-screen page (a plain fixed layer portaled to body),
 * NOT a @deslop/tma ModalView. Because it is not a ModalView, the per-day log can
 * safely be a ModalView bottom sheet on top of it — one open ModalView at a time,
 * which is the constraint the vendored @deslop/tma sheet imposes.
 *
 * Picking what a tap records is asked once, when marking starts: the FAB is the
 * trigger of an `ActionMenu` listing the same options. It used to be Telegram's
 * `showPopup` on clients that have it, but that alert is the client's UI — system
 * font, system language, three buttons max — so the app draws its own menu and
 * gets one appearance everywhere.
 *
 * Outside Telegram the options also stay on screen as `CalendarMarkBar`, which
 * doubles as the indicator of the active mode; Telegram keeps the bare grid.
 */
export function CalendarPanel({ isOpen, onClose, mode, revision, symptomGroups }) {
  const [showLegend, setShowLegend] = useState(false);
  const [dayLog, setDayLog] = useState(null);
  const [marking, setMarking] = useState(false);
  const [markMode, setMarkMode] = useState("period");
  // Both host toggles round-trip to the API before refreshing the panel, so the
  // radio would lag a tap behind. This holds the tapped values until the queue of
  // host calls drains and the refreshed months are on screen.
  const [pending, setPending] = useState({});
  // `toggleCalendarPeriodDay` rewrites the whole period list from the state it
  // reads when it starts, so two taps in flight at once lose one of the days —
  // and marking a period is five taps in a row. One call at a time.
  const queue = useRef(Promise.resolve());
  const inflight = useRef(0);
  const pageRef = useRef(null);
  // Год истории и восемь месяцев вперёд; открывается на текущем месяце.
  const months = Array.from({ length: 20 }, (_, index) => read("getAiwaCalendarMonth", index - 12)).filter(Boolean);
  const canEditPeriods = !["preg", "meno", "male", "none", "fit"].includes(mode);
  const markOptions = calendarMarkOptions(canEditPeriods ? ["period", "symptoms", "intimacy"] : ["symptoms", "intimacy"]);
  const activeMark = CALENDAR_MARK_MODES[markMode] || CALENDAR_MARK_MODES.symptoms;

  // Probes `showPopup`, so it reads as "a real Telegram client" — the one that
  // marks with the bare grid, where the stand keeps the mark bar on screen.
  // Read every render rather than cached: `window.Telegram` comes from a script tag
  // outside the bundle, so a value latched at mount can be a false negative.
  const nativeMenu = nativeMenuSupported();

  const stopMarking = () => {
    setMarking(false);
    setPending({});
  };

  const startMarking = (value) => {
    setMarkMode(value);
    setShowLegend(false);
    setMarking(true);
  };

  const markMenuItems = markOptions.map((option) => ({
    label: option.label,
    // Selecting a mode replaces the FAB trigger. ActionMenu must not restore
    // focus to that unmounted node; the marking state owns the live target.
    restoreFocus: false,
    onSelect: () => startMarking(option.value),
  }));

  useBackButton(isOpen, marking ? stopMarking : onClose);

  // Прокрутка к текущему месяцу: без неё календарь открывается на январе
  // полгода назад. Мгновенно, до отрисовки кадра.
  const scrollRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return;
    const box = scrollRef.current;
    const current = box?.querySelector("[data-current-month=\"true\"]");
    if (box && current) box.scrollTop = Math.max(0, current.offsetTop - 8);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setShowLegend(false);
      setDayLog(null);
      setMarking(false);
      setPending({});
    }
    setMarkMode(canEditPeriods ? "period" : "symptoms");
  }, [isOpen, canEditPeriods]);

  useEffect(() => {
    if (!isOpen || !marking) return;
    pageRef.current?.querySelector(".aiwa-calendar-done")?.focus({ preventScroll: true });
  }, [isOpen, marking]);

  const isChecked = (day) => {
    const optimistic = pending[`${markMode}:${day.iso}`];
    return typeof optimistic === "boolean" ? optimistic : Boolean(activeMark.checked(day));
  };

  // Chain the host call after whatever is still running, and only drop the
  // optimistic values once nothing is left in flight — clearing them per call
  // would flash the queued days back to their old state.
  const enqueue = (name, iso) => {
    const run = () => read(name, iso);
    inflight.current += 1;
    queue.current = queue.current.then(run, run).then(() => {
      inflight.current -= 1;
      if (inflight.current === 0) setPending({});
    });
  };

  // Calendar boundaries follow the same Moscow civil day as the host and the
  // shared day strip. A device-local midnight must not unlock tomorrow early.
  const todayIso = aiwaTodayIso();

  const handleSelect = (day, monthName) => {
    // Future and host-disabled cells are read-only in every branch: day log,
    // symptoms, period and intimacy. Phase 3 will mirror this at the bridge.
    if (!isCalendarDaySelectable(day, todayIso)) return;
    if (!marking) {
      // Вне режима отметок тап по прошедшему дню открывает его журнал —
      // симптомы и самочувствие смотрятся прямо из календаря.
      setDayLog({ iso: day.iso, label: `${day.date} ${monthName}` });
      return;
    }
    if (markMode === "symptoms") {
      setDayLog({ iso: day.iso, label: `${day.date} ${monthName}` });
      return;
    }
    setPending((current) => ({ ...current, [`${markMode}:${day.iso}`]: !isChecked(day) }));
    enqueue(markMode === "period" ? "toggleCalendarPeriodDay" : "markPA", day.iso);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={pageRef}
      className="aiwa-calendar-page"
      data-aiwa-calendar-modal="true"
      data-marking={marking ? "true" : undefined}
      data-markbar={marking && !nativeMenu ? "true" : undefined}
      role="region"
      aria-label="Календарь"
    >
      <div className="aiwa-calendar-screen" data-revision={revision} role="document" aria-label="Календарь">
        <div className="aiwa-calendar-modeswitch">
          {/* Marking hides every mark the legend explains, so on the native path
              the slot stays empty and «Готово» is alone on the bar. The mode is
              chosen once in the menu the FAB opens. */}
          {marking && nativeMenu ? null : (
            <Tappable
              as="button"
              type="button"
              mode="opacity"
              className="aiwa-calendar-legend-toggle"
              aria-pressed={showLegend}
              aria-label={showLegend ? "Скрыть обозначения" : "Показать обозначения календаря"}
              onClick={() => setShowLegend((value) => !value)}
            >
              <InfoIcon />
              <Text variant="body" weight="semibold">Обозначения</Text>
            </Tappable>
          )}

          {marking ? (
            <Tappable
              as="button"
              type="button"
              mode="opacity"
              className="aiwa-calendar-done"
              aria-label="Закончить отметки"
              onClick={stopMarking}
            >
              <Text variant="body" weight="semibold">Готово</Text>
            </Tappable>
          ) : null}
        </div>

        {showLegend ? (
          <div className="aiwa-calendar-help" role="status">
            <Text variant="body" weight="semibold">Обозначения</Text>
            <div className="aiwa-calendar-legend">
              {CALENDAR_LEGEND.map(({ label, variant, token }) => (
                <Badge
                  key={label}
                  variant={variant}
                  textVariant="caption1"
                  weight="semibold"
                  style={{ color: `var(${token})` }}
                >
                  {label}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}

        <div className="aiwa-calendar-scroll" ref={scrollRef}>
          <div className="aiwa-calendar-months">
            {months.map((month) => (
              <section
                className="aiwa-calendar-month"
                aria-label={month.label}
                data-current-month={month.days.some((day) => day.today) ? "true" : undefined}
                key={month.key || month.label}
              >
                <Text className="aiwa-calendar-month-title" variant="body" weight="semibold">{month.label || month.name}</Text>
                <div className="aiwa-calendar-grid">
                  {month.days.map((day) => (
                    day.empty
                      ? <span className="aiwa-calendar-empty" aria-hidden="true" key={day.key} />
                      : (
                        <DateCell
                          day={day}
                          interactive={isCalendarDaySelectable(day, todayIso)}
                          marking={marking && isCalendarDaySelectable(day, todayIso)}
                          checked={marking && isCalendarDaySelectable(day, todayIso) && isChecked(day)}
                          markVariant={markMode === "intimacy" ? "heart" : "radio"}
                          monthLabel={month.label}
                          onSelect={(selected) => handleSelect(selected, month.name || month.label)}
                          key={day.key}
                        />
                      )
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {marking && !nativeMenu ? (
        <CalendarMarkBar
          options={markOptions}
          value={markMode}
          onChange={setMarkMode}
          hint={activeMark.hint}
        />
      ) : null}

      {marking ? null : (
        <ActionMenu
          className="aiwa-calendar-fab"
          align="end"
          items={markMenuItems}
          trigger={<AiwaFab icon={<PlusIcon />} label="Отметить день" />}
        />
      )}

      <CalendarDayLogPanel
        iso={dayLog?.iso}
        label={dayLog?.label}
        open={Boolean(dayLog)}
        onClose={() => setDayLog(null)}
        symptomGroups={symptomGroups}
        showIntimacy={false}
      />
    </div>,
    document.body,
  );
}
