import { useEffect, useRef } from "react";

/**
 * Native Telegram BackButton, driven as a stack. Each open full-screen page
 * pushes its back handler; a back press only fires the topmost one, so nested
 * pages (e.g. day log over calendar) pop in order. Outside Telegram every call
 * is a no-op, so panels stay safe in a plain browser.
 */
const stack = [];
let wired = false;

const button = () =>
  typeof window !== "undefined" ? window.Telegram?.WebApp?.BackButton : null;

const dispatch = () => stack[stack.length - 1]?.();

const sync = () => {
  const native = button();
  if (!native) return;
  if (stack.length) native.show?.();
  else native.hide?.();
};

const pushBackHandler = (handler) => {
  const native = button();
  if (native && !wired) {
    native.onClick?.(dispatch);
    wired = true;
  }
  stack.push(handler);
  sync();
  return () => {
    const index = stack.lastIndexOf(handler);
    if (index !== -1) stack.splice(index, 1);
    sync();
  };
};

export function useBackButton(active, handler) {
  const ref = useRef(handler);
  ref.current = handler;
  useEffect(() => {
    if (!active) return undefined;
    return pushBackHandler(() => ref.current?.());
  }, [active]);
}
