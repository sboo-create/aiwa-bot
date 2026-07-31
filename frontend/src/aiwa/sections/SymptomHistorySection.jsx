import { useEffect, useState } from "react";
import { RegularButton, SectionList } from "../lib/tma";
import { AiwaCell } from "../components/AiwaCell";
import { JOURNAL_SYMPTOM_GROUPS } from "../lib/constants";
import { apiCall, actionProps, showToast, aiwaConfirmReportDelivered } from "../lib/api";

const SYMPTOM_LABEL = Object.fromEntries(
  JOURNAL_SYMPTOM_GROUPS.flatMap(([, options]) => options),
);
const ENERGY = { 1: "низкая энергия", 2: "средняя энергия", 3: "высокая энергия" };
const MOOD = { 1: "плохое настроение", 2: "нормальное настроение", 3: "хорошее настроение" };
const DAY_LABEL = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });

// Код симптома в человеческую подпись: словарь, затем «custom:боль» → «Боль»,
// «meno:hot» → «Hot» (хвост после двоеточия), всегда с большой буквы.
const humanize = (code) => {
  const known = SYMPTOM_LABEL[code];
  const raw = known || String(code).split(":").pop().replace(/_/g, " ").trim();
  return raw ? raw[0].toUpperCase() + raw.slice(1) : "";
};

const describe = (item) => {
  const parts = [
    ...(item.symptoms || []).map(humanize),
    ENERGY[item.energy],
    MOOD[item.mood],
  ].filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1));
  return parts.join(" • ") || "Без деталей";
};

const dayName = (iso) => {
  const parsed = new Date(`${iso}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? iso : DAY_LABEL.format(parsed);
};

/**
 * Journal history on Home: the last three entries, «Показать все» unfolds the
 * rest, and the report CTA sends the same PDF the profile screen offers.
 */
export function SymptomHistorySection() {
  const [items, setItems] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    apiCall("/api/log_history", {})
      .then((result) => setItems(result?.items || []))
      .catch(() => setItems([]));
  }, []);

  const requestReport = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const result = await apiCall("/api/report", { period: "all" }).catch(() => null);
      if (result?.ok && result?.delivered) aiwaConfirmReportDelivered();
      else showToast(result?.text || "Выписка временно недоступна", { type: "error" });
    } finally {
      setBusy(false);
    }
  };

  if (!items) return null;
  const shown = expanded ? items : items.slice(0, 3);

  return (
    <SectionList.Item header="Журнал симптомов">
      {shown.length ? shown.map((item) => (
        <AiwaCell tappable={false} key={item.d}>
          <AiwaCell.Text title={dayName(item.d)} description={describe(item)} />
        </AiwaCell>
      )) : (
        <AiwaCell tappable={false}>
          <AiwaCell.Text title="Записей пока нет" description="Отмечай самочувствие в журнале — здесь появится история." />
        </AiwaCell>
      )}
      {items.length > 3 ? (
        <AiwaCell
          as="button"
          type="button"
          onClick={() => setExpanded((value) => !value)}
          end={<AiwaCell.Part type="Chevron" />}
        >
          <AiwaCell.Text type="Accent" title={expanded ? "Свернуть" : "Показать все"} />
        </AiwaCell>
      ) : null}
      <AiwaCell tappable={false}>
        <div className="aiwa-cell-actions">
          <RegularButton
            variant="filled"
            label={busy ? "Собираю…" : "Сформировать выписку"}
            isFill
            disabled={busy}
            {...actionProps("Сформировать выписку", requestReport)}
          />
        </div>
      </AiwaCell>
    </SectionList.Item>
  );
}
