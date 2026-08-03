let nextOperationId = 0;
let activeMutation = null;
let lastCompletion = null;
const listeners = new Set();

const snapshot = () => ({
  active: activeMutation
    ? { id: activeMutation.id, key: activeMutation.key, ownerId: activeMutation.ownerId }
    : null,
  completion: lastCompletion,
});

const notify = () => {
  const state = snapshot();
  for (const listener of listeners) listener(state);
};

export const getProfileMutationState = () => snapshot();
export const isProfileMutationInFlight = () => Boolean(activeMutation);

export const subscribeToProfileMutation = (listener) => {
  listeners.add(listener);
  listener(snapshot());
  return () => listeners.delete(listener);
};

/**
 * A panel may close and reopen while its own request is still in flight. The
 * submitted payload remains bound to the original operation, while feedback
 * may be adopted by the new visible session for that same operation only.
 */
export const isProfileMutationSessionCurrent = ({
  isOpen,
  currentGeneration,
  startedGeneration,
  operationId,
  adoptedOperationId,
  adoptedGeneration,
}) => Boolean(isOpen && (
  currentGeneration === startedGeneration
  || (
    operationId != null
    && operationId === adoptedOperationId
    && currentGeneration === adoptedGeneration
  )
));

/**
 * One mutation lane for every mounted ProfilePanel instance. Starting a second
 * action returns the existing promise without executing the supplied task.
 */
export const requestProfileMutation = (key, task, { ownerId = null } = {}) => {
  if (activeMutation) {
    return {
      owner: false,
      operation: { id: activeMutation.id, key: activeMutation.key, ownerId: activeMutation.ownerId },
      promise: activeMutation.promise,
    };
  }

  const operation = { id: ++nextOperationId, key, ownerId };
  const source = Promise.resolve().then(task);
  const promise = source.then(
    (value) => {
      if (activeMutation?.id === operation.id) {
        activeMutation = null;
        lastCompletion = { ...operation, status: "fulfilled", value };
        notify();
      }
      return value;
    },
    (error) => {
      if (activeMutation?.id === operation.id) {
        activeMutation = null;
        lastCompletion = { ...operation, status: "rejected", error };
        notify();
      }
      throw error;
    },
  );

  lastCompletion = null;
  activeMutation = { ...operation, promise };
  notify();
  return { owner: true, operation, promise };
};
