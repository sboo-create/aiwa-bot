import { RegularButton, Spinner } from "../lib/tma";

const TMA_VARIANTS = {
  primary: "filled",
  secondary: "filled",
  secondaryCanvas: "filled",
  outlined: "outlined",
};

/**
 * Product button variants on top of Deslop's RegularButton.
 * `secondary` belongs inside a white section; `secondaryCanvas` belongs on the
 * gray page canvas and therefore uses the white surface token.
 */
export function AiwaButton({
  variant = "primary",
  className,
  disabled = false,
  loading = false,
  label,
  onClick,
  onKeyDown,
  "aria-label": ariaLabel,
  ...props
}) {
  const classNameProps = className ? { className } : {};
  const inactive = disabled || loading;
  const actionLabel = ariaLabel || (typeof label === "string" ? label : "Действие");

  return (
    <RegularButton
      {...props}
      {...classNameProps}
      variant={TMA_VARIANTS[variant] || TMA_VARIANTS.primary}
      label={loading ? (
        <span className="aiwa-button-spinner" aria-hidden="true">
          <Spinner size={20} focusable="false" />
        </span>
      ) : label}
      data-aiwa-button-variant={variant}
      data-loading={loading || undefined}
      disabled={inactive || undefined}
      aria-disabled={inactive || undefined}
      aria-busy={loading || undefined}
      aria-label={loading ? `${actionLabel} — выполняется` : ariaLabel}
      onClick={inactive ? undefined : onClick}
      onKeyDown={inactive ? undefined : onKeyDown}
    />
  );
}
