import { useEffect, useState } from "react";
import { Text, Tappable, RegularButton, SectionList } from "../lib/tma";
import { AiwaModalView } from "../components/AiwaModalView";
import { PaperRow } from "../components/PaperRow";
import { AiwaCell } from "../components/AiwaCell";
import { Field } from "../components/Field";
import { ChoicePills } from "../components/ChoicePills";
import { MODE_OPTIONS } from "../lib/constants";
import { call, read, apiCall, showToast, actionProps, aiwaConfirmReportDelivered } from "../lib/api";

export function ProfilePanel({ isOpen, onClose }) {
  const [view, setView] = useState("main");
  const [data, setData] = useState(() => read("aiwaData") || {});
  const [partner, setPartner] = useState(null);
  const [reportPeriod, setReportPeriod] = useState("3");
  const [form, setForm] = useState({});
  const [reportBusy, setReportBusy] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const next = read("aiwaData") || {};
    setData(next);
    setView("main");
    setPartner(null);
    setForm({
      height: String(next.profile?.height || ""),
      weight: String(next.profile?.weight || ""),
      age: String(next.profile?.age || ""),
      cycle_len: String(next.cycle_len || ""),
      diet_note: next.profile?.diet_note || next.diet_note || "",
      kcal_goal: String(next.profile?.kcal_goal || next.kcal_goal || ""),
      send_time: next.send_time || "08:00",
      daily_summary_enabled: next.daily_summary_enabled !== false,
      proactive_enabled: next.proactive_enabled !== false,
    });
  }, [isOpen]);

  const openPartner = async () => {
    setView("partner");
    const result = await apiCall("/api/partner", {}).catch(() => null);
    setPartner(result || {});
  };
  const saveData = async () => {
    const profileResult = await apiCall("/api/profile", {
      height: form.height,
      weight: form.weight,
      age: form.age,
      ...(data.mode === "cycle" ? { cycle_len: form.cycle_len } : {}),
    }).catch(() => null);
    const prefResult = await apiCall("/api/prefs", {
      diet_note: form.diet_note,
      kcal_goal: form.kcal_goal,
    }).catch(() => null);
    const timeResult = await apiCall("/api/settime", { time: form.send_time }).catch(() => null);
    if (profileResult?.ok && prefResult?.ok && timeResult?.ok) {
      showToast("Данные сохранены", { type: "success" });
      call("reloadAfterEdit");
      setView("main");
    } else showToast(profileResult?.text || "Проверь рост, вес, возраст и время", { type: "error" });
  };
  const requestReport = async () => {
    if (reportBusy) return;
    setReportBusy(true);
    try {
      const result = await apiCall("/api/report", { period: reportPeriod }).catch(() => null);
      if (result?.ok && result?.delivered) aiwaConfirmReportDelivered();
      else showToast(result?.text || "Выписка временно недоступна", { type: "error" });
    } finally {
      setReportBusy(false);
    }
  };
  const setProactive = async (enabled) => {
    const previous = form.proactive_enabled !== false;
    setForm((current) => ({ ...current, proactive_enabled: enabled }));
    const result = await apiCall("/api/proactive", { enabled }).catch(() => null);
    if (!result?.ok) {
      setForm((current) => ({ ...current, proactive_enabled: previous }));
      showToast("Не получилось изменить настройку", { type: "error" });
    }
  };
  const setDailySummary = async (enabled) => {
    const previous = form.daily_summary_enabled !== false;
    setForm((current) => ({ ...current, daily_summary_enabled: enabled }));
    const result = await apiCall("/api/daily-summary", { enabled }).catch(() => null);
    if (!result?.ok) {
      setForm((current) => ({ ...current, daily_summary_enabled: previous }));
      showToast("Не получилось изменить настройку", { type: "error" });
    }
  };
  const chooseMode = (mode) => {
    onClose();
    call("chooseMode", mode);
  };
  const copyPartner = async () => {
    if (!partner?.link) return;
    try {
      await navigator.clipboard.writeText(partner.link);
      showToast("Ссылка скопирована", { type: "success" });
    } catch {
      showToast("Ссылка готова — выдели и скопируй");
    }
  };
  const unlinkPartner = async () => {
    const result = await apiCall("/api/partner", { action: "unlink" }).catch(() => null);
    if (result?.ok) {
      setPartner({ linked: false });
      showToast("Партнёр отключён", { type: "success" });
    }
  };

  return (
    <AiwaModalView
      isOpen={isOpen}
      onClose={onClose}
      onBack={view === "main" ? onClose : () => setView("main")}
    >
      <>
        <div className="aiwa-sheet-scroll">
          {view === "main" ? (
            <>
              {data.mode === "male" ? null : (
              <div className="aiwa-profile-modes">
                <Text variant="body" weight="semibold">Режим</Text>
                <div className="aiwa-choice-pills">
                  {MODE_OPTIONS.map((option) => (
                    <Tappable
                      as="button"
                      type="button"
                      mode="opacity"
                      className={data.mode === option.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill"}
                      aria-pressed={data.mode === option.value}
                      onClick={() => chooseMode(option.value)}
                      key={option.value}
                    >
                      <Text variant="body" weight="regular">{option.label}</Text>
                    </Tappable>
                  ))}
                </div>
              </div>
              )}
              <SectionList className="aiwa-tma-blocks">
                <SectionList.Item>
                  <PaperRow title={data.mode === "male" ? "Выписка по самочувствию" : "Выписка для врача"} description="PDF в чат бота" onClick={() => setView("report")} />
                  <PaperRow title="Предпочтения по питанию" description="ограничения и цель калорий" onClick={() => setView("data")} />
                  <PaperRow title="Мои данные" description={data.mode === "male" ? "рост · вес · возраст" : "рост · вес · возраст · цикл"} onClick={() => setView("data")} />
                  <PaperRow title="Утренняя сводка" description={form.daily_summary_enabled === false ? "выключена" : `${form.send_time || "08:00"} · МСК`} onClick={() => setView("summary")} />
                  <AiwaCell.Switch
                    value={form.proactive_enabled !== false}
                    onChange={setProactive}
                  >
                    <AiwaCell.Text
                      title="Проактивные сообщения"
                      description={form.proactive_enabled === false ? "выключены" : "не больше одного в день"}
                    />
                  </AiwaCell.Switch>
                  {data.mode === "male" ? null : <PaperRow title="Партнёр и близкие" description="короткая бережная сводка" onClick={openPartner} />}
                </SectionList.Item>
              </SectionList>
            </>
          ) : null}

          {view === "data" ? (
            <div className="aiwa-form-stack">
              <Text variant="title3" weight="semibold">Параметры тела</Text>
              <div className="aiwa-form-grid">
                <Field label="Рост, см" value={form.height || ""} onChange={(value) => setForm((current) => ({ ...current, height: value }))} inputMode="decimal" />
                <Field label="Вес, кг" value={form.weight || ""} onChange={(value) => setForm((current) => ({ ...current, weight: value }))} inputMode="decimal" />
                <Field label="Возраст" value={form.age || ""} onChange={(value) => setForm((current) => ({ ...current, age: value }))} inputMode="numeric" />
                {data.mode === "cycle" ? <Field label="Длина цикла" value={form.cycle_len || ""} onChange={(value) => setForm((current) => ({ ...current, cycle_len: value }))} inputMode="numeric" /> : null}
              </div>
              <Text variant="title3" weight="semibold">Питание</Text>
              <Field
                label="Предпочтения и ограничения"
                value={form.diet_note || ""}
                onChange={(value) => setForm((current) => ({ ...current, diet_note: value }))}
                placeholder="Например: без свинины, аллергия на орехи"
                multiline
              />
              <Field label="Желаемые калории" value={form.kcal_goal || ""} onChange={(value) => setForm((current) => ({ ...current, kcal_goal: value }))} inputMode="numeric" />
              <RegularButton variant="filled" label="Сохранить" isFill {...actionProps("Сохранить данные", saveData)} />
            </div>
          ) : null}

          {view === "summary" ? (
            <div className="aiwa-form-stack">
              <Text variant="title3" weight="semibold">Утренняя сводка</Text>
              <Text variant="body" weight="regular">Каждое утро Айва присылает сводку дня в чат — выбери удобное время (МСК).</Text>
              <AiwaCell.Switch value={form.daily_summary_enabled !== false} onChange={setDailySummary}>
                <AiwaCell.Text title="Присылать утром" description={form.daily_summary_enabled === false ? "выключено" : "включено"} />
              </AiwaCell.Switch>
              <Field label="Время утренней сводки" type="time" value={form.send_time || "08:00"} onChange={(value) => setForm((current) => ({ ...current, send_time: value }))} />
              <RegularButton variant="filled" label="Сохранить" isFill {...actionProps("Сохранить время сводки", saveData)} />
            </div>
          ) : null}

          {view === "report" ? (
            <div className="aiwa-form-stack">
              <Text variant="body" weight="regular">{data.mode === "male" ? "Динамика энергии и дневник самочувствия придут PDF-файлом в чат бота." : "Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота."}</Text>
              <ChoicePills
                options={[
                  { value: "3", label: "3 месяца" },
                  { value: "6", label: "6 месяцев" },
                  { value: "all", label: "Весь период" },
                ]}
                value={reportPeriod}
                onChange={setReportPeriod}
              />
              <RegularButton variant="filled" label={reportBusy ? "Собираю…" : "Собрать выписку"} isFill disabled={reportBusy} {...actionProps("Собрать выписку", requestReport)} />
            </div>
          ) : null}

          {view === "partner" ? (
            <div className="aiwa-form-stack">
              <div className="aiwa-paper-card">
                <Text variant="title3" weight="semibold">Бережная сводка для близкого</Text>
                <Text variant="body" weight="regular">Айва расскажет, когда особенно нужны поддержка и отдых — без интимных и медицинских деталей.</Text>
              </div>
              {partner === null ? <Text variant="body" weight="regular">Готовлю ссылку…</Text> : null}
              {partner?.linked ? (
                <>
                  <div className="aiwa-sheet-card">
                    <PaperRow title="Партнёр подключён" description="Получает только бережную сводку без календаря и приватных заметок." />
                  </div>
                  <RegularButton variant="filled" label="Отключить партнёра" isFill {...actionProps("Отключить партнёра", unlinkPartner)} />
                </>
              ) : null}
              {partner?.link ? (
                <>
                  <Field label="Ссылка-приглашение" value={partner.link} readOnly multiline />
                  <RegularButton variant="filled" label="Скопировать ссылку" isFill {...actionProps("Скопировать ссылку", copyPartner)} />
                </>
              ) : null}
              {partner && !partner.linked && !partner.link ? <Text variant="body" weight="regular">Ссылка доступна после запуска из Telegram. В боте можно использовать команду /partner.</Text> : null}
            </div>
          ) : null}
        </div>
      </>
    </AiwaModalView>
  );
}
