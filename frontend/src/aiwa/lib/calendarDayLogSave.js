let nextOperationId = 0;
const lanes = new Map();

const immutableCopy = (value) => {
  if (Array.isArray(value)) return Object.freeze(value.map(immutableCopy));
  if (!value || typeof value !== "object") return value;
  return Object.freeze(Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, immutableCopy(item)]),
  ));
};

const laneFor = (iso) => {
  const key = String(iso || "");
  let lane = lanes.get(key);
  if (!lane) {
    lane = { active: null, completion: null, listeners: new Set() };
    lanes.set(key, lane);
  }
  return lane;
};

const publicOperation = (operation) => operation ? {
  id: operation.id,
  iso: operation.iso,
  payload: operation.payload,
  draft: operation.draft,
} : null;

const snapshot = (iso) => {
  const lane = laneFor(iso);
  return {
    active: publicOperation(lane.active),
    completion: lane.completion ? { ...lane.completion } : null,
  };
};

const notify = (iso) => {
  const lane = laneFor(iso);
  const state = snapshot(iso);
  for (const listener of lane.listeners) listener(state);
};

export const getCalendarDayLogSaveState = (iso) => snapshot(iso);

export const subscribeToCalendarDayLogSave = (iso, listener) => {
  const lane = laneFor(iso);
  lane.listeners.add(listener);
  listener(snapshot(iso));
  return () => lane.listeners.delete(listener);
};

/**
 * Calendar pages unmount their day-log sheet when the parent closes. Keep the
 * date-bound absolute write outside React so reopening the same ISO adopts the
 * original draft and outcome instead of starting a second write. Other dates
 * have independent lanes and never receive this operation's state.
 */
export const requestCalendarDayLogSave = (iso, payload, task, { draft = null } = {}) => {
  const lane = laneFor(iso);
  if (lane.active) {
    return {
      owner: false,
      operation: publicOperation(lane.active),
      promise: lane.active.promise,
    };
  }

  const operation = {
    id: ++nextOperationId,
    iso,
    payload: immutableCopy(payload),
    draft: immutableCopy(draft),
  };
  const source = Promise.resolve().then(() => task(operation.payload));
  const promise = source.then(
    (value) => {
      if (lane.active?.id === operation.id) {
        lane.active = null;
        lane.completion = {
          ...publicOperation(operation),
          status: "fulfilled",
          value,
          consumed: false,
        };
        notify(iso);
      }
      return value;
    },
    (error) => {
      if (lane.active?.id === operation.id) {
        lane.active = null;
        lane.completion = {
          ...publicOperation(operation),
          status: "rejected",
          error,
          consumed: false,
        };
        notify(iso);
      }
      throw error;
    },
  );

  lane.completion = null;
  lane.active = { ...operation, promise };
  notify(iso);
  return { owner: true, operation: publicOperation(operation), promise };
};

export const consumeCalendarDayLogSaveCompletion = (iso, operationId) => {
  const lane = laneFor(iso);
  if (!lane.completion || lane.completion.id !== operationId || lane.completion.consumed) return false;
  lane.completion = { ...lane.completion, consumed: true };
  notify(iso);
  return true;
};
