const pendingRequests = new Map();

const canonicalValue = (value) => {
  if (Array.isArray(value)) return value.map(canonicalValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, canonicalValue(value[key])]),
  );
};

export const workoutPayloadFingerprint = (payload) => JSON.stringify(canonicalValue(payload));

const newWorkoutRequestId = () => (
  globalThis.crypto?.randomUUID?.()
  || `workout-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
);

/**
 * The backend treats request_id as the durable workout mutation identity. Keep
 * it outside the panel so a close/unmount or lost response cannot turn the same
 * canonical payload into a second mutation on retry.
 */
export const workoutRequestForPayload = (payload, makeId = newWorkoutRequestId) => {
  const fingerprint = workoutPayloadFingerprint(payload);
  let request = pendingRequests.get(fingerprint);
  if (!request) {
    request = { fingerprint, id: makeId() };
    pendingRequests.set(fingerprint, request);
  }
  return request;
};

export const acknowledgeWorkoutRequest = (request) => {
  if (!request) return false;
  const current = pendingRequests.get(request.fingerprint);
  if (current?.id !== request.id) return false;
  pendingRequests.delete(request.fingerprint);
  return true;
};
