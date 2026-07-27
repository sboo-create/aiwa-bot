import { AiwaInsightCard } from "../components/AiwaInsightCard";
import { call, openBotChat } from "../lib/api";

/** Home AI block — reusable product composition over Deslop primitives. */
export function AiSection({ aiText, aiChip = "" }) {
  return (
    <AiwaInsightCard
      message={aiText}
      chip={aiChip}
      onDiscuss={() => openBotChat()}
    />
  );
}
