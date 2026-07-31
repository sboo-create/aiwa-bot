import { SectionList, RegularButton } from "../lib/tma";
import { AiwaCell } from "../components/AiwaCell";
import { call, actionProps } from "../lib/api";

export function DelaySection({ delay }) {
  if (!delay) return null;
  return (
    <SectionList.Item header={delay.title}>
      <AiwaCell tappable={false}>
        <AiwaCell.Text title={delay.message} description={delay.hint} />
      </AiwaCell>
      {delay.canSwitchToPregnancy ? (
        <AiwaCell tappable={false}>
          <div className="aiwa-cell-actions">
            <RegularButton
              variant="filled"
              label="Перейти в режим беременности"
              isFill
              {...actionProps("Перейти в режим беременности", () => call("switchPreg"))}
            />
          </div>
        </AiwaCell>
      ) : null}
    </SectionList.Item>
  );
}
