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
  const inactive = disabled || loading;
  const handleKeyDown = inactive ? undefined : (event) => {
    if (typeof onKeyDown === "function") onKeyDown(event);
    if (event.defaultPrevented || typeof onClick !== "function") return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(event);
    }
  };

  return (
    <RegularButton
      {...props}
      {...(className ? { className } : {})}
      variant={TMA_VARIANTS[variant] || TMA_VARIANTS.primary}
      label={loading ? (
        <span className="aiwa-button-spinner">
          <Spinner size={20} focusable="false" aria-hidden="true" />
          <span className="aiwa-visually-hidden">
            {label}<span> — выполняется</span>
          </span>
        </span>
      ) : label}
      data-aiwa-button-variant={variant}
      data-loading={loading || undefined}
      disabled={inactive || undefined}
      role="button"
      tabIndex={inactive ? -1 : 0}
      aria-disabled={inactive || undefined}
      aria-busy={loading || undefined}
      aria-label={loading && ariaLabel ? `${ariaLabel} — выполняется` : ariaLabel}
      onClick={inactive ? undefined : onClick}
      onKeyDown={handleKeyDown}
    />
  );
}
