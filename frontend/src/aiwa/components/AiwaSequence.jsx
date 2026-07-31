import { useEffect, useState } from "react";
import { AIWA_SEQUENCE_FRAMES, AIWA_SEQUENCE_PAUSE_MS, AIWA_SEQUENCE_FRAME_MS, preloadAiwaSequence, AIWA_CARD_SEQUENCE_FRAMES } from "../lib/sequence";

export function AiwaSequence({ size, frames = AIWA_SEQUENCE_FRAMES, pauseMs = AIWA_SEQUENCE_PAUSE_MS }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return undefined;

    let cancelled = false;
    let frameTimer = 0;
    let pauseTimer = 0;

    const play = () => {
      let nextFrame = 0;
      setFrame(nextFrame);
      frameTimer = window.setInterval(() => {
        nextFrame += 1;
        setFrame(nextFrame);
        if (nextFrame === frames.length - 1) {
          window.clearInterval(frameTimer);
          pauseTimer = window.setTimeout(play, pauseMs || AIWA_SEQUENCE_FRAME_MS);
        }
      }, AIWA_SEQUENCE_FRAME_MS);
    };

    preloadAiwaSequence(frames).then(() => {
      if (!cancelled) play();
    });

    return () => {
      cancelled = true;
      window.clearInterval(frameTimer);
      window.clearTimeout(pauseTimer);
    };
  }, [frames, pauseMs]);

  return (
    <span
      className="aiwa-sequence"
      style={{ "--aiwa-sequence-size": `${size}px` }}
      data-aiwa-sequence="true"
      data-sequence={frames === AIWA_CARD_SEQUENCE_FRAMES ? "card" : "default"}
      data-pause-ms={pauseMs}
      data-frame={frame}
      aria-hidden="true"
    >
      <img src={frames[frame]} alt="" draggable="false" />
    </span>
  );
}
