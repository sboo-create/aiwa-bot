import { useCallback, useEffect, useRef, useState } from "react";
import { apiCall } from "./api";

/**
 * Данные экранов «Питание» и «Нагрузка» живут вне React.
 *
 * `prefetchScreens()` вызывается на старте мини-аппа, поэтому к моменту, когда
 * пользователь жмёт таб, ответы уже в кэше и экран рисуется сразу. Если запрос
 * ещё в полёте, на его месте скелетон экрана (ScreenLoading), а не текстовая
 * карточка загрузки. Данные переживают перемонтирование, так что второй заход
 * на таб не мигает вовсе.
 */
const REQUESTS = {
  foodSection: () => apiCall("/api/section", { kind: "food" }),
  diary: () => apiCall("/api/diary", {}),
  trainingSection: () => apiCall("/api/section", { kind: "training" }),
  train: () => apiCall("/api/train", {}),
};

const cache = new Map();
const inflight = new Map();

const snapshot = (keys) => Object.fromEntries(keys.map((key) => [key, cache.get(key) ?? null]));

/**
 * Cache-first: `/api/section` за кадром ходит в модель, поэтому лишний раз его
 * не дёргаем. `force` — для перезагрузки после правок профиля или дневника.
 */
export const fetchScreenData = (key, { force = false } = {}) => {
  if (!force) {
    if (cache.has(key)) return Promise.resolve(cache.get(key));
    const pending = inflight.get(key);
    if (pending) return pending;
  }
  const request = REQUESTS[key]()
    .catch(() => null)
    .then((data) => {
      if (data) cache.set(key, data);
      // Параллельный force мог уже занять слот — чужой запрос не трогаем.
      if (inflight.get(key) === request) inflight.delete(key);
      return cache.get(key) ?? null;
    });
  inflight.set(key, request);
  return request;
};

/** Прогрев на старте: к первому переключению таба данные уже есть. */
export const prefetchScreens = () => {
  Object.keys(REQUESTS).forEach((key) => { fetchScreenData(key); });
};

/**
 * @param {string[]} keys стабильный (модульного уровня) список ключей
 * @param {any[]} deps перезагрузка при смене режима или ревизии экрана
 * @returns {[Record<string, any>, (...keys: string[]) => Promise<void>, (key: string, value: any) => void]}
 */
export function useScreenData(keys, deps) {
  const [values, setValues] = useState(() => snapshot(keys));
  const mounted = useRef(false);

  const refresh = useCallback(async (...only) => {
    const wanted = only.length ? only : keys;
    await Promise.all(wanted.map((key) => fetchScreenData(key, { force: true })));
    setValues(snapshot(keys));
  }, [keys]);

  // Ответ мутирующей ручки уже содержит новое состояние — кладём его без запроса.
  const patch = useCallback((key, value) => {
    cache.set(key, value);
    setValues(snapshot(keys));
  }, [keys]);

  useEffect(() => {
    let alive = true;
    // Первый проход берёт прогретый кэш; смена deps — всегда свежий запрос.
    const force = mounted.current;
    mounted.current = true;
    Promise.all(keys.map((key) => fetchScreenData(key, { force })))
      .then(() => { if (alive) setValues(snapshot(keys)); });
    return () => { alive = false; };
  }, deps);

  return [values, refresh, patch];
}
