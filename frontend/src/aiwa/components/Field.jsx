import { Text } from "../lib/tma";

export function Field({
  label,
  value,
  onChange = () => {},
  placeholder = "",
  type = "text",
  inputMode,
  multiline = false,
  readOnly = false,
  ...rest
}) {
  const controlProps = {
    ...rest,
    inputMode,
    value,
    placeholder,
    readOnly,
    onChange: (event) => onChange(event.target.value),
  };
  return (
    <label className="aiwa-field">
      <Text variant="caption1" weight="regular">{label}</Text>
      {multiline ? <textarea {...controlProps} /> : <input type={type} {...controlProps} />}
    </label>
  );
}
