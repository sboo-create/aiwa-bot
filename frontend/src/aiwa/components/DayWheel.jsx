import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Wheel } from "../lib/tma";
import { hapticLight } from "../lib/haptics";
import { dayTitle } from "../lib/selectedDay";

const SETTLE_MS = 140;

/**
 * Date ruler with two costs: onTick previews the centered day immediately;
 * onSelect waits until the drum settles and the pointer is up before asking
 * the host to rebuild. Returning the actual ISO lets a rejecting/normalizing
 * host move the focused Wheel back without remounting it.
 */
export function DayWheel({ days, selectedIso = "", onSelect, onTick, onReset, dragAreaRef }) {
  const fallbackAreaRef = useRef(null);
  const interactionAreaRef = dragAreaRef || fallbackAreaRef;
  const openable = (days || []).filter((day) => !day.disabled);
  const stripKey = openable.map((day) => day.iso).join("|");
  const controlKey = `${selectedIso}\u0000${stripKey}`;
  const selectedIndex = openable.findIndex((day) => day.iso === selectedIso);
  const committedValue = (selectedIndex >= 0 ? selectedIndex : openable.length - 1) + 1;
  const committedIso = openable[committedValue - 1]?.iso || "";

  const [preview, setPreview] = useState(() => ({ key: controlKey, value: committedValue }));
  const previewValue = preview.key === controlKey ? preview.value : committedValue;
  const previewDay = openable[previewValue - 1];

  const latest = useRef(null);
  latest.current = { openable, selectedIso, onSelect, onReset, controlKey };
  const pendingIso = useRef(committedIso);
  const timer = useRef(0);
  const pointerDown = useRef(false);
  const armSettleRef = useRef(null);

  const commitPending = (pendingAtSchedule, keyAtSchedule) => {
    if (pointerDown.current || pendingIso.current !== pendingAtSchedule) return;
    const current = latest.current;
    if (current.controlKey !== keyAtSchedule) return;
    const settled = current.openable.find((item) => item.iso === pendingAtSchedule);
    if (!settled || settled.iso === current.selectedIso || typeof current.onSelect !== "function") return;

    const actualIso = current.onSelect(settled);
    if (typeof actualIso !== "string" || actualIso === settled.iso) return;

    let correctedIndex = current.openable.findIndex((item) => item.iso === actualIso);
    if (correctedIndex < 0) {
      correctedIndex = current.openable.findIndex((item) => item.iso === current.selectedIso);
    }
    if (correctedIndex < 0) correctedIndex = current.openable.length - 1;
    const correctedIso = current.openable[correctedIndex]?.iso || "";
    pendingIso.current = correctedIso;
    setPreview({ key: keyAtSchedule, value: correctedIndex + 1 });
    if (typeof current.onReset === "function") current.onReset();
  };

  const armSettle = (iso, key = controlKey) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => commitPending(iso, key), SETTLE_MS);
  };
  armSettleRef.current = armSettle;

  useEffect(() => () => clearTimeout(timer.current), []);
  useLayoutEffect(() => {
    pendingIso.current = committedIso;
    clearTimeout(timer.current);
  }, [committedIso, controlKey]);

  useEffect(() => {
    const area = interactionAreaRef.current;
    if (!area) return undefined;

    const handlePointerDown = () => {
      pointerDown.current = true;
      clearTimeout(timer.current);
    };
    const handlePointerEnd = () => {
      if (!pointerDown.current) return;
      pointerDown.current = false;
      const iso = pendingIso.current;
      if (iso) armSettleRef.current?.(iso, latest.current.controlKey);
    };

    area.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerEnd);
    window.addEventListener("pointercancel", handlePointerEnd);
    return () => {
      area.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerEnd);
      window.removeEventListener("pointercancel", handlePointerEnd);
    };
  }, [interactionAreaRef, stripKey]);

  const handleChange = (next) => {
    const day = openable[next - 1];
    if (!day) return;
    const changed = day.iso !== pendingIso.current;
    // Current main adds a haptic inside aiwaSelectDay. Per-tick production
    // haptics wait for a host silent-select contract so the final tick is not
    // followed by a duplicate host impact.
    const hostOwnsHaptic = typeof window !== "undefined" && typeof window.aiwaSelectDay === "function";
    if (changed && !hostOwnsHaptic) hapticLight();
    pendingIso.current = day.iso;
    setPreview({ key: controlKey, value: next });
    if (typeof onTick === "function") onTick(day);
    armSettle(day.iso);
  };

  if (!openable.length) return null;

  const wheel = (
    <Wheel
      className="aiwa-day-wheel"
      value={previewValue}
      max={openable.length}
      onChange={handleChange}
      formatTick={(tick) => openable[tick - 1]?.date}
      showValue={false}
      showLimits={false}
      indicator="label"
      ariaLabel="Выбор дня"
      ariaValueText={dayTitle(previewDay?.iso)}
      dragAreaRef={interactionAreaRef}
      enableHaptic={false}
    />
  );

  return dragAreaRef ? wheel : (
    <div className="aiwa-day-wheel-area" ref={fallbackAreaRef}>
      {wheel}
    </div>
  );
}
