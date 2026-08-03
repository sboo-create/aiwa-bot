const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button",
  "input:not([type='hidden'])",
  "label",
  "select",
  "summary",
  "textarea",
  "[contenteditable='true']",
  "[onclick]",
  "[role='button']",
  "[role='checkbox']",
  "[role='combobox']",
  "[role='link']",
  "[role='menuitem']",
  "[role='option']",
  "[role='radio']",
  "[role='slider']",
  "[role='switch']",
  "[role='tab']",
  "[role='treeitem']",
  "[tabindex]:not([tabindex='-1'])",
  "[data-haptic='light']",
].join(",");

const FALLBACK_DEDUPE_MS = 50;
let fallbackLastHapticAt = -Infinity;
let installed = false;

const isDisabled = (element) =>
  Boolean(element.closest(":disabled, [inert], [aria-disabled='true'], [data-disabled='true']")) ||
  Boolean(element.tagName === "LABEL" && element.control?.disabled);

/** Fire the one product haptic: Telegram's light impact. */
export function hapticLight() {
  if (typeof window === "undefined") return;

  if (typeof window.haptic === "function") {
    window.haptic("impact", "light");
    return;
  }

  const now = performance.now();
  if (now - fallbackLastHapticAt < FALLBACK_DEDUPE_MS) return;
  fallbackLastHapticAt = now;

  const webApp = window.Telegram?.WebApp;
  if (!webApp?.HapticFeedback) return;
  if (webApp.isVersionAtLeast && !webApp.isVersionAtLeast("6.1")) return;

  try {
    webApp.HapticFeedback.impactOccurred("light");
  } catch {
    // Enhancement only: old clients keep the action even without feedback.
  }
}

/**
 * Prepared for the host phase. Do not install this alongside the current host,
 * whose existing handlers are not yet deduplicated.
 */
export function installLightHaptics() {
  if (installed || typeof document === "undefined") return;
  installed = true;

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target instanceof Element
        ? event.target.closest(INTERACTIVE_SELECTOR)
        : null;
      if (!target || target.closest("[data-haptic='off']") || isDisabled(target)) return;
      hapticLight();
    },
    true,
  );
}
