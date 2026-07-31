import { Field } from "./Field";

/**
 * «Свой симптом» row — a plain Field, no submit control of its own: the panel's
 * primary Save button commits it along with the rest of the journal draft.
 */
export function JournalCustomSymptom({ value, onChange }) {
  return (
    <div className="aiwa-custom-symptom">
      <Field
        label="Свой симптом"
        value={value}
        onChange={onChange}
        placeholder="Например, тошнота"
        maxLength={40}
      />
    </div>
  );
}
