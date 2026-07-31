import { useEffect } from "react";

/**
 * Horizontal scrollers pan natively under a finger, but a mouse wheel scrolls
 * the page instead. Translate vertical wheel into horizontal panning, and hand
 * the gesture back to the page once the row hits an end so the reader is never
 * trapped inside the strip.
 *
 * `deps` re-attaches the listener when the row is (re)mounted — a row that
 * renders conditionally has a null ref on the first pass.
 */
export function useWheelPan(ref, ...deps) {
  useEffect(() => {
    const row = ref.current;
    if (!row) return undefined;
    const onWheel = (event) => {
      if (event.ctrlKey) return; // pinch-zoom
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return; // trackpad already pans
      const max = row.scrollWidth - row.clientWidth;
      if (max <= 0) return;
      const next = Math.min(max, Math.max(0, row.scrollLeft + event.deltaY));
      if (next === row.scrollLeft) return;
      row.scrollLeft = next;
      event.preventDefault();
    };
    row.addEventListener("wheel", onWheel, { passive: false });
    return () => row.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);
}
