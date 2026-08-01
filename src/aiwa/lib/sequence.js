export const AIWA_SEQUENCE_FRAME_MS = 1000 / 40;
export const AIWA_SEQUENCE_PAUSE_MS = 5000;
export const sequenceFrames = (directory, count) => Array.from(
  { length: count },
  (_, index) => `/assets/${directory}/frame-${String(index).padStart(3, "0")}.png`,
);
export const AIWA_SEQUENCE_FRAMES = sequenceFrames("aiwa-sequence", 182);
export const AIWA_CARD_SEQUENCE_FRAMES = sequenceFrames("aiwa-card-sequence", 193);

export const aiwaSequencePreloads = new Map();
export const aiwaFramePreloads = new Map();
let aiwaPostersPreload = null;
let aiwaPostersReady = false;
let aiwaAnimationsPreload = null;
let aiwaAnimationsReady = false;

const afterFirstPaint = () => new Promise((resolve) => {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(resolve, { timeout: 1200 });
    } else {
      window.setTimeout(resolve, 120);
    }
  }));
});

const preloadFrame = (src) => {
  if (!aiwaFramePreloads.has(src)) {
    aiwaFramePreloads.set(src, new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        // `load` means the bytes are available; `decode` also prepares the
        // bitmap. The same promise is shared by poster and background loading.
        if (typeof image.decode === "function") {
          image.decode().then(resolve, resolve);
        } else {
          resolve();
        }
      };
      image.onerror = resolve;
      image.src = src;
    }));
  }
  return aiwaFramePreloads.get(src);
};

export const preloadAiwaSequence = (frames) => {
  if (!aiwaSequencePreloads.has(frames)) {
    aiwaSequencePreloads.set(
      frames,
      afterFirstPaint().then(async () => {
        // Fetch in small batches: the two sequences together contain hundreds
        // of frames and must not crowd the initial API/font requests. Frame 0 is
        // included because this preload can start before either mascot mounts.
        const pending = frames;
        const batchSize = 6;
        for (let index = 0; index < pending.length; index += batchSize) {
          await Promise.all(pending.slice(index, index + batchSize).map(preloadFrame));
        }
      }),
    );
  }
  return aiwaSequencePreloads.get(frames);
};

/** Only the two static posters are critical for revealing the app shell. */
export const preloadAiwaPosters = () => {
  if (!aiwaPostersPreload) {
    aiwaPostersPreload = Promise.all([
      preloadFrame(AIWA_SEQUENCE_FRAMES[0]),
      preloadFrame(AIWA_CARD_SEQUENCE_FRAMES[0]),
    ]).then(() => {
      aiwaPostersReady = true;
    });
  }
  return aiwaPostersPreload;
};

export const areAiwaPostersReady = () => aiwaPostersReady;

/** Remaining frames warm in the background; callers must not block UI on it. */
export const preloadAiwaAnimations = () => {
  if (!aiwaAnimationsPreload) {
    preloadAiwaPosters();
    aiwaAnimationsPreload = Promise.all([
      preloadAiwaSequence(AIWA_SEQUENCE_FRAMES),
      preloadAiwaSequence(AIWA_CARD_SEQUENCE_FRAMES),
    ]).then(() => {
      aiwaAnimationsReady = true;
    });
  }
  return aiwaAnimationsPreload;
};

export const areAiwaAnimationsReady = () => aiwaAnimationsReady;
