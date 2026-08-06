import { useEffect, useRef } from "react";
import { Tappable, RegularButton, SectionList } from "../lib/tma";
import { AiwaCell } from "../components/AiwaCell";
import { AiwaModalView } from "../components/AiwaModalView";
import { PaperRow } from "../components/PaperRow";
import { FOOD_SLOTS } from "../lib/constants";
import { CrossIcon } from "../lib/icons";
import { actionProps } from "../lib/api";

/** List body pure TMA; navigation via native Telegram header. */
// canAdd=false для прошедшего дня: записи показываем, но добавлять в чужой
// день нельзя (порт прод-патча v177).
export function FoodDiaryPanel({ isOpen, onClose, diary, onAdd, onEdit, onDelete, onReco, canAdd = true, focusMealId = null }) {
  const meals = diary?.meals || [];
  const totals = diary?.totals || {};
  const target = diary?.target || {};
  const focusRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !focusMealId || !focusRef.current) return;
    const timer = window.setTimeout(() => {
      focusRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [isOpen, focusMealId, meals.length]);

  return (
    <AiwaModalView isOpen={isOpen} onClose={onClose} aria-label="Дневник питания">
      <SectionList className="aiwa-tma-blocks">
        <SectionList.Item>
          <AiwaCell tappable={false}>
            <AiwaCell.Text
              title={`${Math.round(totals.kcal || 0)} ккал`}
              description={`из ${Math.round(target.kcal || 0) || "—"} ккал`}
              bold
            />
          </AiwaCell>
        </SectionList.Item>

        {FOOD_SLOTS.map((slot) => {
          const rows = meals.filter((meal) => (meal.slot || "snack") === slot.value);
          return (
            <SectionList.Item header={slot.label} key={slot.value}>
              {!rows.length ? (canAdd ? (
                <AiwaCell as="button" type="button" onClick={onAdd} end={<AiwaCell.Part type="Chevron" />}>
                  <AiwaCell.Text type="Accent" title="Добавить" />
                </AiwaCell>
              ) : (
                <AiwaCell tappable={false}>
                  <AiwaCell.Text title="Нет записей" />
                </AiwaCell>
              )) : rows.map((meal) => {
                const focused = String(meal.id) === String(focusMealId || "");
                return (
                  <div key={meal.id} ref={focused ? focusRef : null} aria-current={focused ? "true" : undefined}>
                    <PaperRow
                      title={meal.title}
                      description={`${Math.round(meal.kcal || 0)} ккал`}
                      onClick={() => onEdit(meal)}
                      separateAction
                      actionLabel={`Изменить ${meal.title}, ${Math.round(meal.kcal || 0)} ккал`}
                      trailing={(
                        <Tappable
                          as="button"
                          type="button"
                          mode="opacity"
                          aria-label={`Удалить ${meal.title}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            onDelete(meal.id);
                          }}
                        >
                          <CrossIcon />
                        </Tappable>
                      )}
                    />
                  </div>
                );
              })}
            </SectionList.Item>
          );
        })}

        {canAdd || onReco ? (
          <SectionList.Item>
            <AiwaCell tappable={false}>
              <div className="aiwa-cell-actions">
                {canAdd ? <RegularButton variant="filled" label="Добавить приём" isFill {...actionProps("Добавить приём", onAdd)} /> : null}
                {onReco ? <RegularButton variant="filled" label="Совет по дневнику" isFill {...actionProps("Совет по дневнику", onReco)} /> : null}
              </div>
            </AiwaCell>
          </SectionList.Item>
        ) : null}
      </SectionList>
    </AiwaModalView>
  );
}
