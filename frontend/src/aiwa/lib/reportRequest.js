import { apiCall } from "./api";

let inFlightReport = null;
const listeners = new Set();

const notify = () => {
  for (const listener of listeners) listener(Boolean(inFlightReport));
};

export const isReportRequestInFlight = () => Boolean(inFlightReport);

export const subscribeToReportRequest = (listener) => {
  listeners.add(listener);
  listener(Boolean(inFlightReport));
  return () => listeners.delete(listener);
};

/**
 * Keep report generation single-flight across every source entry point.
 *
 * Only the caller that starts the request owns its completion UI. Other
 * callers observe the shared busy state and never duplicate the delivered
 * confirmation when they happen to call during the same request.
 */
export const requestReportOnce = (period) => {
  if (inFlightReport) return { owner: false, promise: inFlightReport };

  const request = Promise.resolve()
    .then(() => apiCall("/api/report", { period }))
    .finally(() => {
      if (inFlightReport !== request) return;
      inFlightReport = null;
      notify();
    });
  inFlightReport = request;
  notify();
  return { owner: true, promise: request };
};
