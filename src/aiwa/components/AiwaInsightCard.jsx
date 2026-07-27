import { RegularButton, SectionList, Text } from "../lib/tma";
import { AiwaCardHeading } from "./AiwaCardHeading";
import { AiwaCell } from "./AiwaCell";

/**
 * Reusable AIWA insight block that keeps Deslop section, cell and button behavior.
 */
export function AiwaInsightCard({
  message,
  detail,
  onDiscuss,
  chip = "",
  className = "",
}) {
  return (
    <SectionList.Item className={`aiwa-insight-section ${className}`.trim()}>
      <AiwaCell data-aiwa-insight-cell="true" tappable={false}>
        <div className="aiwa-insight-content">
          <AiwaCardHeading />
          {chip ? <span className="aiwa-insight-chip">{chip}</span> : null}
          <Text className="aiwa-insight-message" variant="body" weight="regular">
            {message}
          </Text>
          {detail ? (
            <Text className="aiwa-insight-detail" variant="body" weight="regular">
              {detail}
            </Text>
          ) : null}
          {onDiscuss ? (
            <RegularButton
              className="aiwa-btn-secondary"
              variant="filled"
              label="Обсудить с Айвой"
              isFill
              onClick={onDiscuss}
            />
          ) : null}
        </div>
      </AiwaCell>
    </SectionList.Item>
  );
}
