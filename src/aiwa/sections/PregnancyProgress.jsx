import { useEffect, useState } from "react";
import { Text, SectionList } from "../lib/tma";
import { AiwaCell } from "../components/AiwaCell";

/** Размер малыша по неделям — та же таблица, что у бота (PREG_FRUIT). */
const FRUIT = {
  4: ["маковое зёрнышко", "~2 мм"], 5: ["кунжутное семечко", "~3 мм"], 6: ["горошина", "~6 мм"],
  7: ["черника", "~1.3 см"], 8: ["малина", "~1.6 см"], 9: ["виноградина", "~2.3 см"],
  10: ["клубника", "~3 см"], 11: ["инжир", "~4 см"], 12: ["лайм", "~5 см"],
  13: ["стручок гороха", "~7 см"], 14: ["лимон", "~8.5 см"], 15: ["яблоко", "~10 см"],
  16: ["авокадо", "~11.5 см"], 17: ["репа", "~13 см"], 18: ["болгарский перец", "~14 см"],
  19: ["манго", "~15 см"], 20: ["банан", "~16 см"], 21: ["морковь", "~26 см"],
  22: ["кабачок", "~28 см"], 23: ["грейпфрут", "~29 см"], 24: ["кукуруза", "~30 см"],
  25: ["цветная капуста", "~34 см"], 26: ["кочан салата", "~35 см"], 27: ["брокколи", "~36 см"],
  28: ["баклажан", "~37 см"], 29: ["тыква", "~38 см"], 30: ["капуста", "~39 см"],
  31: ["кокос", "~41 см"], 32: ["большой кабачок", "~42 см"], 33: ["ананас", "~43 см"],
  34: ["дыня", "~45 см"], 35: ["медовая дыня", "~46 см"], 36: ["салат романо", "~47 см"],
  37: ["сельдерей", "~48 см"], 38: ["лук-порей", "~49 см"], 39: ["мини-арбуз", "~50 см"],
  40: ["небольшая тыква", "~51 см"],
};

const fruitFor = (week) => {
  let w = Math.min(Math.max(Math.round(week) || 4, 4), 40);
  while (w > 4 && !FRUIT[w]) w -= 1;
  return { week: w, name: FRUIT[w][0], size: FRUIT[w][1] };
};

/**
 * Pregnancy timeline on Home: the trimester bar with a marker at the current
 * week, plus the baby-size card with its 3d icon (assets/preg, generated in the
 * same clay style as the food set).
 */
export function PregnancyProgress({ pregnancy }) {
  const [icons, setIcons] = useState({});
  useEffect(() => {
    fetch("/assets/preg/manifest.json?v=1")
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => setIcons(data || {}))
      .catch(() => {});
  }, []);

  const week = Math.min(Math.max(Number(pregnancy?.week) || 4, 1), 40);
  const fruit = fruitFor(week);
  const icon = icons[String(fruit.week)];
  const pct = Math.min(100, Math.max(2, (week / 40) * 100));

  return (
    <SectionList.Item header="Срок и малыш">
      <AiwaCell tappable={false}>
        <div className="aiwa-preg-progress">
          <div className="aiwa-preg-track" role="img" aria-label={`${week} неделя из 40`}>
            <div className="aiwa-preg-fill" style={{ width: `${pct}%` }} />
            <span className="aiwa-preg-marker" style={{ left: `${pct}%` }} />
          </div>
          <div className="aiwa-preg-trimesters">
            {[1, 2, 3].map((t) => (
              <Text
                key={t}
                variant="caption1"
                weight={pregnancy?.trimester === t ? "semibold" : "regular"}
                className={pregnancy?.trimester === t ? "is-current" : ""}
              >
                {t} триместр
              </Text>
            ))}
          </div>
          <div className="aiwa-preg-fruit">
            {icon ? <img src={icon} alt="" width="64" height="64" loading="lazy" /> : null}
            <div>
              <Text variant="body" weight="semibold">{`${week} неделя`}</Text>
              <Text variant="body" weight="regular">{`Малыш размером с ${fruit.name}, ${fruit.size}`}</Text>
            </div>
          </div>
        </div>
      </AiwaCell>
    </SectionList.Item>
  );
}
