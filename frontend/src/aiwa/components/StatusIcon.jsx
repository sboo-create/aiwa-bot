import { CheckIcon, AlertIcon } from "../lib/icons";

export function StatusIcon({ ok }) {
  const Icon = ok ? CheckIcon : AlertIcon;
  return (
    <span className={ok ? "aiwa-status is-ok" : "aiwa-status is-alert"} aria-label={ok ? "В пределах нормы" : "Требует внимания"}>
      <Icon />
    </span>
  );
}
