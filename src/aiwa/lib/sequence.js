export const AIWA_SEQUENCE_FRAME_MS = 1000 / 40;
export const AIWA_SEQUENCE_PAUSE_MS = 5000;
export const sequenceFrames = (directory, count) => Array.from(
  { length: count },
  (_, index) => `/assets/${directory}/frame-${String(index).padStart(3, "0")}.png`,
);
export const AIWA_SEQUENCE_FRAMES = sequenceFrames("aiwa-sequence", 182);
export const AIWA_CARD_SEQUENCE_FRAMES = sequenceFrames("aiwa-card-sequence", 193);

export const aiwaSequencePreloads = new Map();

export const preloadAiwaSequence = (frames) => {
  if (!aiwaSequencePreloads.has(frames)) {
    aiwaSequencePreloads.set(
      frames,
      Promise.all(frames.map((src) => new Promise((resolve) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = resolve;
        image.src = src;
      }))),
    );
  }
  return aiwaSequencePreloads.get(frames);
};

