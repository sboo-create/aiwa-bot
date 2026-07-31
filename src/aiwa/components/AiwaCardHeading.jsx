import { Text } from "../lib/tma";
import { AiwaSequence } from "./AiwaSequence";
import { AIWA_CARD_SEQUENCE_FRAMES } from "../lib/sequence";

export function AiwaCardHeading() {
  return (
    <div className="aiwa-paper-ai-heading">
      <AiwaSequence size={58} frames={AIWA_CARD_SEQUENCE_FRAMES} pauseMs={0} />
      <div>
        <Text variant="body" weight="semibold">Айва AI</Text>
      </div>
    </div>
  );
}
