import { Calligraph } from "calligraph";
import { Text } from "../lib/tma";

/**
 * One macro tile: current / target and a filled track.
 *
 * `macro` names the nutrient, not a colour — the hue comes from the
 * --aiwa-macro-* tokens, so «белки» is the same blue on the food header as it is
 * in the diary. `color` stays for the rare caller that has to paint a track from
 * another token (Storybook does), and it must be a token reference.
 */
export function MacroCard({ label, value, target, macro, color }) {
  const percent = target ? Math.min(100, Math.round((Number(value || 0) / Number(target)) * 100)) : 0;
  const track = color || (macro ? `var(--aiwa-macro-${macro})` : "var(--aiwa-accent)");
  return (
    <div className="aiwa-macro-card">
      {/* Единица измерения одна на пару: «149 / 216 г» — «149 г / 216 г» не влезает
          в 101px карточки, как только у углеводов появляются три цифры. */}
      <Text variant="body" weight="semibold">
        <Calligraph variant="number" animation="snappy">
          {`${Math.round(value || 0)}${target ? "" : " г"}`}
        </Calligraph>
        {target ? <span className="aiwa-macro-target"> / {Math.round(target)} г</span> : null}
      </Text>
      <Text variant="caption1" weight="regular">{label}</Text>
      <span className="aiwa-macro-track" style={{ "--macro-color": track }}>
        <span style={{ width: `${percent}%` }} />
      </span>
    </div>
  );
}
