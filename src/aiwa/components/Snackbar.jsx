import { SnackbarBase } from "../lib/tma";
import { CheckIcon, AlertIcon, InfoIcon } from "../lib/icons";

const typeIcon = {
  success: CheckIcon,
  error: AlertIcon,
  warning: AlertIcon,
  info: InfoIcon,
};

/**
 * Product notification surface. Wraps the Deslop Snackbar primitive and
 * supplies the AIWA default icon per semantic type. The imperative host in
 * lib/toast.jsx drives real toasts; this component owns the visual contract.
 */
export function Snackbar({ type, icon, ...props }) {
  const Fallback = type ? typeIcon[type] : null;
  const resolvedIcon = icon ?? (Fallback ? <Fallback /> : undefined);
  return <SnackbarBase icon={resolvedIcon} {...props} />;
}
