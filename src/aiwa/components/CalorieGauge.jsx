import { useEffect, useRef, useState } from "react";
import { Text } from "../lib/tma";
import { fmtKcal } from "../lib/api";

const ARC = "M 11 169 A 158 158 0 0 1 327 169";
const ARC_LEN = Math.PI * 158;
const FILL_MS = 500;

// cubic ease-out
const easeOut = (t) => 1 - (1 - t) ** 3;

// Заполняет дугу от текущего положения до целевого за 500ms.
// Дуга и «набалдашник» двигаются одним rAF-циклом, иначе они рассинхронятся.
function useFillAnimation(target) {
  const [pct, setPct] = useState(0);
  const fromRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      fromRef.current = target;
      setPct(target);
      return undefined;
    }
    const from = fromRef.current;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / FILL_MS);
      const next = from + (target - from) * easeOut(t);
      fromRef.current = next;
      setPct(next);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  return pct;
}

export function CalorieGauge({ kcal, kcalTarget }) {
  const value = Number(kcal || 0);
  const target = Number(kcalTarget || 0);
  const pct = useFillAnimation(Math.min(1, value / Math.max(1, target)));
  const theta = pct * Math.PI;
  const knobX = 169 - 158 * Math.cos(theta);
  const knobY = 169 - 158 * Math.sin(theta);
  return (
    <div className="aiwa-food-gauge">
      <svg className="aiwa-food-gauge-arc" viewBox="0 0 338 180" width="338" height="180" fill="none">
        <path className="aiwa-food-gauge-track" d={ARC} />
        <path
          className="aiwa-food-gauge-progress"
          d={ARC}
          strokeDasharray={ARC_LEN}
          strokeDashoffset={ARC_LEN * (1 - pct)}
        />
        <circle className="aiwa-food-gauge-knob" cx={knobX} cy={knobY} r="11" />
      </svg>
      <div className="aiwa-food-gauge-center">
        <Text variant="title1" weight="semibold">{fmtKcal(value)}</Text>
        <Text variant="body" weight="regular">из {fmtKcal(target)}</Text>
      </div>
    </div>
  );
}
