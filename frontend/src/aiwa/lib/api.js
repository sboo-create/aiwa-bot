import { toast } from "./toast.jsx";

export const call = (name, ...args) => {
  const fn = window[name];
  return typeof fn === "function" ? fn(...args) : undefined;
};

export const read = (name, ...args) => {
  const fn = window[name];
  return typeof fn === "function" ? fn(...args) : null;
};

export const apiCall = (path, body = {}) => {
  const request = read("aiwaApi", path, body);
  return request && typeof request.then === "function"
    ? request
    : Promise.reject(new Error("API bridge is unavailable"));
};

export const showToast = (message, options = {}) => toast(message, options);

/**
 * Journal writes must be acknowledged by the host before React confirms or
 * closes a draft. Undefined and legacy boolean results are deliberately treated
 * as unconfirmed instead of turning a network failure into success UI.
 */
export const acknowledgedHostWrite = async (name, ...args) => {
  const result = await read(name, ...args);
  if (result && typeof result === "object" && result.ok === true) return result;
  const detail = result && typeof result === "object"
    ? result.message || result.text || result.error?.message
    : "";
  throw new Error(detail || "Не удалось подтвердить сохранение. Попробуй ещё раз.");
};

const MUTED_HOST_CONFIRMATIONS = new Set([
  "Сохранено",
  "Месячные отмечены на сегодня",
  "Сегодня убрано из месячных",
]);
let hostToastMuteDepth = 0;
let mutedHostToast = null;
let originalHostToast = null;
let previousQuietToast;

/**
 * Keep a multi-field React save to one confirmation without hiding host errors.
 *
 * The current host forwards its journal messages through `window.aiwaToast` but
 * does not yet read `__aiwaQuietToast`. While the batch is active, this narrow
 * adapter drops only its known success confirmations and delegates every other
 * message. The flag remains for a future host-side silent contract.
 */
export const withHostToastsMuted = async (run) => {
  if (typeof window === "undefined") return run();
  if (hostToastMuteDepth === 0) {
    originalHostToast = typeof window.aiwaToast === "function" ? window.aiwaToast : null;
    previousQuietToast = window.__aiwaQuietToast;
    window.__aiwaQuietToast = true;
    if (originalHostToast) {
      mutedHostToast = (message, ...args) => {
        const title = typeof message === "string" ? message : message?.title;
        if (MUTED_HOST_CONFIRMATIONS.has(String(title || ""))) return null;
        return originalHostToast(message, ...args);
      };
      window.aiwaToast = mutedHostToast;
    }
  }
  hostToastMuteDepth += 1;
  try {
    return await run();
  } finally {
    hostToastMuteDepth -= 1;
    if (hostToastMuteDepth === 0) {
      if (mutedHostToast && window.aiwaToast === mutedHostToast) {
        window.aiwaToast = originalHostToast;
      }
      if (previousQuietToast === undefined) delete window.__aiwaQuietToast;
      else window.__aiwaQuietToast = previousQuietToast;
      mutedHostToast = null;
      originalHostToast = null;
      previousQuietToast = undefined;
    }
  }
};

// «1 110 ккал»: ru-RU разделяет тысячи неразрывным пробелом.
export const fmtKcal = (n) => `${Math.round(Number(n) || 0).toLocaleString("ru-RU")} ккал`;
export const trackFlow = (flow) => call("track", flow);

// Close the Mini App outright. No-op outside Telegram (web stand).
export const closeMiniApp = () => {
  const tg = window.Telegram?.WebApp;
  if (tg?.close) tg.close();
};

/**
 * Hands the user over to the bot chat and closes the Mini App behind it.
 *
 * `openTelegramLink` first: the chat opens no matter how the app was launched.
 * `close()` alone only returns the user to wherever they came from — from a home
 * screen shortcut that is the home screen, not the chat, so a message the bot
 * just sent would go unseen. Newer clients keep the app minimized on top of the
 * chat instead of dismissing it, so close() follows the link explicitly.
 * Needs Bot API 6.1+ and the username from /api/data; falls back to close().
 *
 * @param {{nudge?: boolean, topic?: string}} options — nudge: ask the bot to
 *   post a message first, so the chat already has one waiting. Skip it when the
 *   caller has already triggered a message of its own. topic ("food"/"train")
 *   makes the nudge open the matching conversation with themed suggestions.
 */
export const openBotChat = async ({ nudge = true, topic = "" } = {}) => {
  // The nudge only decides whether a message is already waiting — a slow or dead
  // network must never leave the tap with nothing happening, so it is capped.
  // A reply that lands late still shows up: the chat stays open.
  if (nudge) {
    await Promise.race([
      apiCall("/api/nudge", topic ? { topic } : {}).catch(() => null),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);
  }
  const tg = window.Telegram?.WebApp;
  const username = read("aiwaData")?.bot_username;
  const supported = typeof tg?.openTelegramLink === "function"
    && (typeof tg.isVersionAtLeast !== "function" || tg.isVersionAtLeast("6.1"));
  if (username && supported) {
    tg.openTelegramLink(`https://t.me/${username}`);
  }
  closeMiniApp();
};

/**
 * Telegram's `showPopup` — the only native chooser the Mini App API exposes.
 * On iOS the client renders it as a system UIAlertController; there is no UIMenu
 * or context-menu method. Bot API 6.2+, and at most three buttons, so every caller
 * needs a fallback: old clients, and the local web stand (which never loads
 * telegram-web-app.js), have nothing to show.
 */
export const nativeMenuSupported = () => {
  const tg = window.Telegram?.WebApp;
  if (typeof tg?.showPopup !== "function") return false;
  return typeof tg.isVersionAtLeast !== "function" || tg.isVersionAtLeast("6.2");
};

let nativeMenuOpen = false;

/**
 * @param {{message: string, options: {value: string, label: string}[]}} params
 * @returns {Promise<string|null>} the chosen value, or null if dismissed.
 */
export const showNativeMenu = ({ message, options }) => new Promise((resolve) => {
  const tg = window.Telegram?.WebApp;
  // The client throws WebAppPopupOpened on a second popup, which a double tap on
  // the trigger would otherwise produce.
  if (!nativeMenuSupported() || nativeMenuOpen) {
    resolve(null);
    return;
  }
  nativeMenuOpen = true;
  const settle = (value) => {
    nativeMenuOpen = false;
    resolve(value || null);
  };
  try {
    tg.showPopup(
      { message, buttons: options.slice(0, 3).map((option) => ({ id: option.value, type: "default", text: option.label })) },
      settle,
    );
  } catch (error) {
    settle(null);
  }
});

export const actionProps = (label, onClick) => ({
  "aria-label": label,
  onClick,
  onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  },
  role: "button",
  tabIndex: 0,
});


/* Подтверждение доставки выписки (порт прод-патча v177): тост + системный
   попап Telegram с возвратом в чат, где уже лежит PDF. */
export function aiwaConfirmReportDelivered() {
  const webApp = window.Telegram?.WebApp;
  showToast("Выписка готова и отправлена в чат бота.", { type: "success" });
  if (typeof webApp?.showPopup === "function") {
    try {
      webApp.showPopup({
        title: "Выписка готова",
        message: "PDF уже отправлен в чат. Нажми «ОК», чтобы вернуться к нему.",
        buttons: [{ id: "ok", type: "ok" }],
      }, () => webApp.close?.());
      return;
    } catch {}
  }
  setTimeout(() => { try { webApp?.close?.(); } catch {} }, 2200);
}
