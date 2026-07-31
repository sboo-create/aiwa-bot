import { RegularButton, SectionList } from "../lib/tma";
import { AiwaCell } from "../components/AiwaCell";
import { AiwaModalView } from "../components/AiwaModalView";
import { PaperRow } from "../components/PaperRow";
import { AiwaInsightCard } from "../components/AiwaInsightCard";
import { actionProps, call, openBotChat } from "../lib/api";

export function WorkoutHistoryPanel({ isOpen, onClose, state, onAdd }) {
  const today = state?.today || [];
  return (
    <AiwaModalView isOpen={isOpen} onClose={onClose}>
      <SectionList className="aiwa-tma-blocks">
        {state?.last_review ? (
          <AiwaInsightCard
            message={state.last_review.text || state.last_review}
            onDiscuss={() => openBotChat({ topic: "train" })}
          />
        ) : null}
        <SectionList.Item header="Неделя">
          {(state?.week || []).map((day) => (
            <PaperRow
              key={day.d}
              title={day.dow}
              description={day.count ? `${day.type || "Тренировка"} · ${day.count}` : "Без тренировки"}
              muted={!day.count}
            />
          ))}
        </SectionList.Item>
        {today.length ? (
          <SectionList.Item header="Сегодня">
            {today.map((workout) => (
              <PaperRow
                key={workout.id}
                title={workout.type || "Тренировка"}
                description={`${workout.duration || "—"} · ${String(workout.rpe || "").toLowerCase()}`}
              />
            ))}
          </SectionList.Item>
        ) : null}
        <SectionList.Item>
          <AiwaCell tappable={false}>
            <div className="aiwa-cell-actions">
              <RegularButton
                variant="filled"
                label="Отметить тренировку"
                isFill
                {...actionProps("Отметить тренировку", onAdd)}
              />
            </div>
          </AiwaCell>
        </SectionList.Item>
      </SectionList>
    </AiwaModalView>
  );
}
