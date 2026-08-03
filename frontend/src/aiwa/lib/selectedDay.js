import { useSyncExternalStore } from "react";
import { call, read } from "./api";
import { aiwaTodayIso } from "./dates";
import { historyStrip } from "./historyStrip";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const DAY_TITLE = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  timeZone: "Europe/Moscow",
});

/** The whole app uses the host/Moscow day, never the device-local calendar. */
export const todayIso = aiwaTodayIso;

const validIso = (value) => {
  const iso = String(value || "");
  if (!ISO_DATE.test(iso)) return "";
  const parsed = new Date(`${iso}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === iso ? iso : "";
};

const selectableIso = (value) => {
  const iso = validIso(value);
  const today = aiwaTodayIso();
  return iso && iso <= today ? iso : "";
};

/** «31 июля» — the shared screen header and day-specific section label. */
export const dayTitle = (iso) => {
  const day = validIso(iso);
  if (!day) return "";
  const parsed = new Date(`${day}T12:00:00+03:00`);
  return Number.isNaN(parsed.getTime()) ? "" : DAY_TITLE.format(parsed);
};

const listeners = new Set();
let selected = "";

export const getSelectedDay = () => {
  const fromHost = selectableIso(read("aiwaSelectedDay"));
  const local = selectableIso(selected);
  return fromHost || local || aiwaTodayIso();
};

/**
 * Shared day strip. Until the host phase exposes aiwaDayStrip, the canonical
 * Moscow-aware history strip is the safe standalone/Storybook fallback.
 */
export const dayStrip = () => {
  const strip = read("aiwaDayStrip");
  return Array.isArray(strip) && strip.length ? strip : historyStrip(30);
};

/** Select one non-future Moscow day and notify every mounted React screen. */
export function selectDay(iso) {
  const next = selectableIso(iso);
  if (!next) return getSelectedDay();
  const hasHostReader = typeof window.aiwaSelectedDay === "function";
  const hasHostSelector = typeof window.aiwaSelectDay === "function";
  // The current main host exposes the selector before it exposes the reader.
  // In that bridge state, the fallback `today` may not be the controlled Home
  // day, so only the caller (DayWheel) can decide that a selection is a no-op.
  if (next === getSelectedDay() && (hasHostReader || !hasHostSelector)) {
    return getSelectedDay();
  }
  call("aiwaSelectDay", next);
  // The host may clamp or reject the request. When its reader exists, never
  // overwrite that truth with the requested value; the local request is only
  // the standalone/current-host fallback until aiwaSelectedDay ships there.
  const hostSelected = selectableIso(read("aiwaSelectedDay"));
  selected = hostSelected
    || (hasHostReader ? selectableIso(selected) || aiwaTodayIso() : next);
  listeners.forEach((notify) => notify());
  return selected;
}

const subscribe = (notify) => {
  listeners.add(notify);
  return () => { listeners.delete(notify); };
};

export function useSelectedDay() {
  return useSyncExternalStore(subscribe, getSelectedDay, getSelectedDay);
}
