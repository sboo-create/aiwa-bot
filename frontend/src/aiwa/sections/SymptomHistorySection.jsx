import { useEffect, useState } from "react";
import { SectionList } from "../lib/tma";
import { AiwaButton } from "../components/AiwaButton";
import { AiwaCell } from "../components/AiwaCell";
import { JOURNAL_SYMPTOM_GROUPS } from "../lib/constants";
import { apiCall, actionProps, showToast, aiwaConfirmReportDelivered } from "../lib/api";
import {
  isReportRequestInFlight,
  requestReportOnce,
  subscribeToReportRequest,
} from "../lib/reportRequest";

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
  const [busy, setBusy] = useState(isReportRequestInFlight);

  useEffect(() => {
    apiCall("/api/log_history", {})
      .then((result) => setItems(result?.items || []))
      .catch(() => setItems([]));
  }, []);

  useEffect(() => subscribeToReportRequest(setBusy), []);

  const requestReport = async () => {
    const { owner, promise } = requestReportOnce("all");
    if (!owner) return;
    const result = await promise.catch(() => null);
    if (result?.ok && result?.delivered) aiwaConfirmReportDelivered();
    else showToast(result?.text || "Выписка временно недоступна", { type: "error" });
  };

  if (!items?.length) return null;
  const shown = expanded ? items : items.slice(0, 3);

  return (
    <>
      <SectionList.Item header="Журнал симптомов">
        {shown.map((item) => (
          <AiwaCell tappable={false} key={item.d}>
            <AiwaCell.Text title={dayName(item.d)} description={describe(item)} />
          </AiwaCell>
        ))}
        {items.length > 3 ? (
          <AiwaCell
            as="button"
            type="button"
            data-aiwa-row-variant="compact"
            onClick={() => setExpanded((value) => !value)}
          >
            <AiwaCell.Text type="Accent" title={expanded ? "Свернуть" : "Показать все"} />
          </AiwaCell>
        ) : null}
      </SectionList.Item>
      <div className="aiwa-page-action">
        <AiwaButton
          variant="secondaryCanvas"
          label="Сформировать выписку"
          loading={busy}
          isFill
          {...actionProps("Сформировать выписку", requestReport)}
        />
      </div>
    </>
  );
}
