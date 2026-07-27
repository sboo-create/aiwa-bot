import { AiwaInsightCard } from "../components/AiwaInsightCard";
import { call } from "../lib/api";

/** Home AI block — reusable product composition over Deslop primitives. */
export function AiSection({ aiText }) {
  return (
    <AiwaInsightCard
      message={aiText}
      onDiscuss={() => call("go", "chat")}
    />
  );
}
