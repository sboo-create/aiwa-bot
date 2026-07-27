import { SectionList } from "../lib/tma";
import { AiwaCell } from "../components/AiwaCell";
import { AiwaModalView } from "../components/AiwaModalView";
import { PaperRow } from "../components/PaperRow";

/** Options list pure TMA; navigation via native Telegram header. */
export function WorkoutVariantsPanel({ isOpen, onClose, options, onSelect }) {
  return (
    <AiwaModalView isOpen={isOpen} onClose={onClose}>
      <SectionList className="aiwa-tma-blocks">
        <SectionList.Item>
          <AiwaCell tappable={false}>
            <AiwaCell.Text
              title="Рекомендация на сегодня"
              description="Выбери вариант, после которого останется запас сил."
            />
          </AiwaCell>
        </SectionList.Item>
        <SectionList.Item>
          {options.map((option, index) => (
            <PaperRow
              key={option.name || index}
              title={option.name || `Вариант ${index + 1}`}
              description={option.how || option.benefit || option.detail}
              onClick={() => onSelect(option)}
            />
          ))}
        </SectionList.Item>
      </SectionList>
    </AiwaModalView>
  );
}
