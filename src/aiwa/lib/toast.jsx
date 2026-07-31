import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { TMAProvider, useSnackbar } from "./tma";
import { CheckIcon, AlertIcon, InfoIcon } from "./icons";

const typeIcon = {
  success: CheckIcon,
  error: AlertIcon,
  warning: AlertIcon,
  info: InfoIcon,
};

let showRef = null;
let mounted = false;
const queue = [];

// A single portal-based Snackbar host lives at <body> level, so it serves every
// independent React root the bridge mounts (home/food/activity/chat/nav) plus
// the legacy window.aiwaToast callers.
function ToastBridge() {
  const api = useSnackbar();
  useEffect(() => {
    showRef = api.show;
    if (queue.length) queue.splice(0).forEach((options) => api.show(options));
    return () => {
      showRef = null;
    };
  });
  return null;
}

function ensureHost() {
  if (mounted || typeof document === "undefined") return;
  mounted = true;
  const container = document.createElement("div");
  container.setAttribute("data-aiwa-toast-host", "");
  document.body.appendChild(container);
  // TMAProvider, а не голый SnackbarProvider: хост живёт в собственном React-корне,
  // и без него сюда не доходит MotionProvider. SnackbarItem анимируется ленивыми
  // компонентами motion/react-m, поэтому без LazyMotion он навсегда застревал в
  // стартовом кадре — opacity 0 — и тост был в DOM, но не на экране.
  // SnackbarProvider внутри TMAProvider уже есть.
  createRoot(container).render(
    <TMAProvider>
      <ToastBridge />
    </TMAProvider>,
  );
}

export function toast(message, options = {}) {
  const config = typeof message === "string" ? { title: message, ...options } : { ...message };
  if (config.type && !config.icon) {
    const Icon = typeIcon[config.type];
    if (Icon) config.icon = <Icon />;
  }
  ensureHost();
  if (showRef) return showRef(config);
  queue.push(config);
  return null;
}

export function installToast() {
  if (typeof window !== "undefined") window.aiwaToast = toast;
}
