import { AIWA_SEQUENCE_FRAMES, AIWA_SEQUENCE_PAUSE_MS, AIWA_CARD_SEQUENCE_FRAMES } from "../lib/sequence";

/**
 * Талисман Айвы. В v177 покадровая анимация (182 png через setInterval) убрана:
 * на слабых телефонах она грузила главный поток и мигала при перерисовках.
 * Рисуем первый кадр синхронно; сама анимация живёт в CSS по data-атрибутам.
 */
export function AiwaSequence({ size, frames = AIWA_SEQUENCE_FRAMES, pauseMs = AIWA_SEQUENCE_PAUSE_MS }) {
  return (
    <span
      className="aiwa-sequence"
      style={{ "--aiwa-sequence-size": `${size}px` }}
      data-aiwa-sequence="true"
      data-sequence={frames === AIWA_CARD_SEQUENCE_FRAMES ? "card" : "default"}
      data-pause-ms={pauseMs}
      data-frame={0}
      aria-hidden="true"
    >
      <img src={frames[0]} alt="" draggable="false" decoding="sync" />
    </span>
  );
}
