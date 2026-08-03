/** Small per-key generation clock used to reject late cache reads. */
export function createCacheCoordinator() {
  const generations = new Map();
  return {
    begin(key) {
      const generation = (generations.get(key) || 0) + 1;
      generations.set(key, generation);
      return generation;
    },
    isCurrent(key, generation) {
      return generations.get(key) === generation;
    },
  };
}

export const isSuccessfulCachePayload = (payload) => Boolean(payload)
  && !(typeof payload === "object"
    && Object.prototype.hasOwnProperty.call(payload, "error"));
