import { useEffect, useState } from "react";
import { call, read } from "./api";
import { historyStrip } from "./historyStrip";

/**
 * Выбранный день — один на всё приложение.
 *
 * Главная живёт в хосте (index.html): барабан дней зовёт `aiwaSelectDay`, хост
 * перерисовывает экран целиком. «Питание» и «Нагрузка» — обычные React-экраны,
 * которые остаются смонтированными, пока пользователь ходит по табам, поэтому
 * им мало вызова хоста: они подписываются здесь и обновляются сами.
 *
 * Хранилище только пересылает выбор: правда о дне остаётся у хоста
 * (`SELECTED_DAY`), а `aiwaSelectDay` умеет отбросить будущую дату. Поэтому
 * чтение всегда начинается с хоста, а не с локальной переменной.
 */
const DAY_TITLE = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });

/** Сегодня по часам устройства — тот же формат, что `isoOf` в index.html. */
export const todayIso = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

/** «31 июля» — заголовок шапки и подписи разделов «за <день>». */
export const dayTitle = (iso) => {
  const parsed = new Date(`${iso}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? "" : DAY_TITLE.format(parsed);
};

const listeners = new Set();
let selected = "";

export const getSelectedDay = () => selected || read("aiwaSelectedDay") || todayIso();

/**
 * Полоса дней для барабана: та же, что строит главная, — от первой отметки в
 * истории до конца текущей недели. Вне хоста (storybook, локальный стенд без
 * данных) остаётся месяц назад от сегодня.
 */
export const dayStrip = () => {
  const strip = read("aiwaDayStrip");
  return strip?.length ? strip : historyStrip(30);
};

/** Выбор дня с любого таба: хост перестраивает главную, экраны — себя. */
export function selectDay(iso) {
  const next = iso || todayIso();
  if (next === getSelectedDay()) return;
  selected = next;
  call("aiwaSelectDay", next);
  listeners.forEach((notify) => notify(next));
}

export function useSelectedDay() {
  const [iso, setIso] = useState(getSelectedDay);
  useEffect(() => {
    // Хост мог сменить день, пока экран был размонтирован.
    setIso(getSelectedDay());
    listeners.add(setIso);
    return () => { listeners.delete(setIso); };
  }, []);
  return iso;
}
