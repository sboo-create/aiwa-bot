import { CheckIcon, AlertIcon, ClockIcon } from "../lib/icons";

export function StatusIcon({ ok, pending = false }) {
  const Icon = pending ? ClockIcon : ok ? CheckIcon : AlertIcon;
  const className = pending
    ? "aiwa-status is-pending"
    : ok
      ? "aiwa-status is-ok"
      : "aiwa-status is-alert";
  const label = pending
    ? "Рассчитывается"
    : ok
      ? "В пределах нормы"
      : "Требует внимания";

  return (
    <span className={className} role="img" aria-label={label}>
      <Icon />
    </span>
  );
}
