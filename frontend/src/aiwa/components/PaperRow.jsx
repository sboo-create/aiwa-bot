import { Spinner, Text } from "../lib/tma";
import { AiwaCell } from "./AiwaCell";

/**
 * Content-list row — pure TMA Cell (storybook).
 * Used only below screen headers.
 * Pass `image` for the Extended media variant (thumbnail on the left).
 * Image rows always resolve to Extended so every consumer gets the same larger
 * 88px geometry from the design system without opting in at each call site.
 * Pass `loading` for a pending row: TMA Spinner в слоте превью, чтобы ряд
 * стоял ровно там, где через пару секунд появится настоящая запись.
 */
export function PaperRow({
  title,
  description,
  onClick,
  trailing,
  muted = false,
  start,
  image,
  loading = false,
  variant = "default",
  separateAction = false,
  actionLabel,
}) {
  const resolvedVariant = image || loading || variant === "extended" ? "extended" : "default";
  const end = trailing !== undefined
    ? trailing
    : (onClick ? <AiwaCell.Part type="Chevron" /> : null);

  const leading = loading
    ? <span className="aiwa-cell-thumb aiwa-cell-thumb-loading"><Spinner size={22} /></span>
    : image
      ? <span className="aiwa-cell-thumb"><img src={image} alt="" loading="lazy" /></span>
      : start;

  if (onClick && separateAction) {
    return (
      <AiwaCell
        data-aiwa-row-variant={resolvedVariant}
        start={leading}
        end={end}
        tappable={false}
        as="div"
        style={muted ? { opacity: 0.65 } : undefined}
      >
        <button
          type="button"
          className="aiwa-row-main-action"
          aria-label={actionLabel}
          onClick={onClick}
        >
          <span className="aiwa-row-main-title">
            <Text as="span" variant="body" weight="regular">{title}</Text>
          </span>
          {description ? (
            <span className="aiwa-row-main-description">
              <Text as="span" variant="subheadline2" weight="regular">{description}</Text>
            </span>
          ) : null}
        </button>
      </AiwaCell>
    );
  }

  return (
    <AiwaCell
      data-aiwa-row-variant={resolvedVariant}
      start={leading}
      end={end}
      onClick={onClick}
      tappable={Boolean(onClick)}
      as={onClick ? "button" : "div"}
      type={onClick ? "button" : undefined}
      style={muted ? { opacity: 0.65 } : undefined}
    >
      <AiwaCell.Text title={title} description={description || undefined} />
    </AiwaCell>
  );
}
