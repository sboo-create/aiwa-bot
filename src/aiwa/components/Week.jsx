import { useEffect, useLayoutEffect, useRef } from "react";
import { DateCell } from "./DateCell";
import { useWheelPan } from "../lib/useWheelPan";

/** How long the strip has to stand still after a pan before the middle day is taken. */
const SETTLE_MS = 140;

/** Where the track has to stand for `cell` to sit in the middle of the pill. */
function centreOffset(track, cell) {
  const max = track.scrollWidth - track.clientWidth;
  const centred = cell.offsetLeft - (track.clientWidth - cell.offsetWidth) / 2;
  return Math.min(max, Math.max(0, centred));
}

/**
 * The day a pan has stopped on. Normally that is the cell closest to the middle
 * of the pill, skipping days ahead of today — they are disabled and cannot be
 * opened.
 *
 * The three cells at each end of the range can never reach the middle: the track
 * runs out of scroll first. So a pan that comes to rest against an end takes the
 * outermost day instead — otherwise swiping all the way right, to today, would
 * hand back the day three cells before it.
 */
function centreCell(track) {
  const cells = [...track.querySelectorAll("[data-iso]")].filter((cell) => !cell.disabled);
  if (!cells.length) return null;
  const max = track.scrollWidth - track.clientWidth;
  if (track.scrollLeft <= 1) return cells[0];
  if (track.scrollLeft >= max - 1) return cells[cells.length - 1];
  const middle = track.scrollLeft + track.clientWidth / 2;
  let best = null;
  let bestGap = Infinity;
  for (const cell of cells) {
    const gap = Math.abs(cell.offsetLeft + cell.offsetWidth / 2 - middle);
    if (gap < bestGap) {
      bestGap = gap;
      best = cell;
    }
  }
  return best;
}

/**
 * Date strip on Home. With `onSelect` it turns into a date picker: past days and
 * today become tappable and the screen below follows the selected day.
 *
 * Seven days fill the track exactly; a longer range turns the track into a
 * horizontal scroller so the whole tracked history stays reachable by swipe.
 */
export function Week({ days, selectedIso = "", onSelect = null }) {
  const interactive = typeof onSelect === "function";
  const trackRef = useRef(null);
  // Latest props for the pan listeners below: they are attached once and must
  // not be re-bound mid-gesture every time the screen above re-renders.
  const latest = useRef(null);
  latest.current = { days, selectedIso, onSelect };
  // The day a swipe just chose. While it is waiting to arrive back as
  // `selectedIso`, the centring effect leaves the strip alone — it is already
  // animating itself to that day.
  const snappedIso = useRef("");
  useWheelPan(trackRef, days?.length);

  // Open on the chosen day rather than at the far end of the range, and follow
  // it when the selection moves. Before paint, so a months-long strip does not
  // flash its oldest week first. scrollLeft is set directly because
  // scrollIntoView would drag the page vertically too.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const snapped = snappedIso.current;
    snappedIso.current = "";
    if (snapped && snapped === selectedIso) return;
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 0) return;
    const cell = track.querySelector(selectedIso ? `[data-iso="${selectedIso}"]` : ".is-today");
    if (!cell) return;
    track.scrollLeft = centreOffset(track, cell);
  }, [selectedIso, days?.length]);

  // A swipe is a choice, not just a look around: once the finger leaves and the
  // strip stops drifting, the day standing in the middle of the pill becomes the
  // selected one and the strip settles it exactly on centre. Only a pan the user
  // drove counts — the centring above scrolls the track too, and it must not
  // bounce back as a selection of its own.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !interactive) return undefined;
    let timer = 0;
    let touching = false;
    let panned = false;

    const commit = () => {
      timer = 0;
      if (touching || !panned) return;
      panned = false;
      const cell = centreCell(track);
      if (!cell) return;
      const { days: current, selectedIso: selected, onSelect: select } = latest.current;
      const day = current?.find((entry) => entry.iso === cell.dataset.iso);
      if (!day) return;
      if (day.iso !== selected) {
        snappedIso.current = day.iso;
        select(day);
      }
      const target = centreOffset(track, cell);
      if (Math.abs(target - track.scrollLeft) > 0.5) {
        const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        track.scrollTo({ left: target, behavior: reduced ? "auto" : "smooth" });
      }
    };

    const schedule = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(commit, SETTLE_MS);
    };
    // Momentum keeps firing `scroll` after the finger is gone, so the settle
    // timer — not `touchend` — is what decides the strip has come to rest.
    const onScroll = () => {
      if (touching) panned = true;
      schedule();
    };
    const onTouchStart = () => { touching = true; };
    const onTouchEnd = () => {
      touching = false;
      schedule();
    };
    const onWheel = () => { panned = true; };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    track.addEventListener("touchcancel", onTouchEnd, { passive: true });
    track.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      if (timer) clearTimeout(timer);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchcancel", onTouchEnd);
      track.removeEventListener("wheel", onWheel);
    };
  }, [interactive]);

  return (
    <div
      className="aiwa-week"
      role={interactive ? "group" : undefined}
      data-selection={selectedIso ? "true" : undefined}
      aria-label={interactive ? "Выбор дня" : "Текущая неделя"}
      ref={trackRef}
    >
      {days.map((day) => (
        <DateCell
          day={selectedIso ? { ...day, selected: day.iso === selectedIso } : day}
          key={day.iso}
          variant="overview"
          interactive={interactive}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
