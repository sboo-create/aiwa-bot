import { toast } from "./toast.jsx";

export const call = (name, ...args) => {
  const fn = window[name];
  if (typeof fn === "function") fn(...args);
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
