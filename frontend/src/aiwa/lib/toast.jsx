import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { MotionProvider, SnackbarProvider, useSnackbar } from "./tma";
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
  // This independent root only needs Motion/LazyMotion and Snackbar context.
  // Appearance/Device providers would run global body/theme effects again.
  createRoot(container).render(
    <MotionProvider>
      <SnackbarProvider>
        <ToastBridge />
      </SnackbarProvider>
    </MotionProvider>,
  );
}

export function toast(message, options = {}) {
  const config = typeof message === "string" ? { title: message, ...options } : { ...message };
  if (config.type && !config.icon) {
    const Icon = typeIcon[config.type];
    if (Icon) config.icon = <Icon className="aiwa-toast-icon" />;
  }
  ensureHost();
  if (showRef) return showRef(config);
  queue.push(config);
  return null;
}

export function installToast() {
  if (typeof window !== "undefined") window.aiwaToast = toast;
}
