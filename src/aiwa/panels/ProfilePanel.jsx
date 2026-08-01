import { useEffect, useState } from "react";
import { Text, RegularButton, SectionList } from "../lib/tma";
import { AiwaModalView } from "../components/AiwaModalView";
import { PaperRow } from "../components/PaperRow";
import { AiwaCell } from "../components/AiwaCell";
import { ProfileAvatar, profileName } from "../components/ProfileAvatar";
import { Field } from "../components/Field";
import { MODE_OPTIONS, modeLabel } from "../lib/constants";
import { call, read, apiCall, showToast, actionProps } from "../lib/api";
import { SelectionCheckIcon } from "../lib/icons";

const REPORT_PERIOD_OPTIONS = [
  { value: "3", label: "3 месяца" },
  { value: "6", label: "6 месяцев" },
  { value: "all", label: "Весь период" },
];

function SelectionCell({ label, selected, onClick }) {
  return (
    <AiwaCell
      as="button"
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      end={selected ? (
        <span className="aiwa-settings-check" aria-hidden="true">
          <SelectionCheckIcon />
        </span>
      ) : null}
    >
      <AiwaCell.Text title={label} />
    </AiwaCell>
  );
}

export function ProfilePanel({ isOpen, onClose }) {
  const [view, setView] = useState("main");
  const [data, setData] = useState(() => read("aiwaData") || {});
  const [partner, setPartner] = useState(null);
  const [reportPeriod, setReportPeriod] = useState("3");
  const [form, setForm] = useState({});

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
      proactive_enabled: next.proactive_enabled !== false,
    });
  }, [isOpen]);

  const openPartner = async () => {
    setView("partner");
    const result = await apiCall("/api/partner", {}).catch(() => null);
    setPartner(result || {});
  };
  const saveProfile = async () => {
    const result = await apiCall("/api/profile", {
      height: form.height,
      weight: form.weight,
      age: form.age,
      cycle_len: form.cycle_len,
    }).catch(() => null);
    if (result?.ok) {
      showToast("Данные сохранены", { type: "success" });
      call("reloadAfterEdit");
      setView("main");
    } else showToast(result?.text || "Проверь рост, вес, возраст и длину цикла", { type: "error" });
  };
  const savePreferences = async () => {
    const result = await apiCall("/api/prefs", {
      diet_note: form.diet_note,
      kcal_goal: form.kcal_goal,
    }).catch(() => null);
    if (result?.ok) {
      showToast("Предпочтения сохранены", { type: "success" });
      call("reloadAfterEdit");
      setView("main");
    } else showToast(result?.text || "Не получилось сохранить предпочтения", { type: "error" });
  };
  const saveSummaryTime = async () => {
    const result = await apiCall("/api/settime", { time: form.send_time }).catch(() => null);
    if (result?.ok) {
      showToast("Время сводки сохранено", { type: "success" });
      setView("main");
    } else showToast(result?.text || "Проверь время утренней сводки", { type: "error" });
  };
  const requestReport = async () => {
    const result = await apiCall("/api/report", { period: reportPeriod }).catch(() => null);
    if (result?.ok) {
      showToast("Выписка отправлена в чат бота", { type: "success" });
      setView("main");
    } else showToast(result?.text || "Выписка временно недоступна", { type: "error" });
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
  const chooseMode = async (mode) => {
    // Ждём сервер и закрываемся только на успехе. Раньше панель закрывалась
    // сразу, поэтому отказ прилетал уже на главный экран и выглядел как
    // «нажал — выкинуло, режим тот же». Отказ здесь штатный: «Цикл» и
    // «Беременность» требуют отмеченную дату месячных.
    const result = await apiCall("/api/mode", { mode }).catch(() => null);
    if (!result?.ok) {
      showToast(result?.text || "Не получилось сменить режим", { type: "error" });
      return;
    }
    showToast(`Режим: ${modeLabel(mode)}`, {
      type: "success",
      // Дату мог подставить сервер при выходе из мужского режима — она уходит
      // в медицинские данные, поэтому молчать об этом нельзя.
      description: result.seeded_period
        ? "Дату месячных поставили на сегодня — поправь в календаре"
        : undefined,
    });
    call("reloadAfterEdit");
    onClose();
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

  const name = profileName();
  const currentMode = data.mode || MODE_OPTIONS[0].value;

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
              {/* Аватар и имя — одна шапка профиля. Имя набрано теми же
                  body/semibold, что и заголовок шапки экрана, поэтому шрифт
                  здесь не переопределяем: он приходит из --ui-font-interface. */}
              <div className="aiwa-profile-avatar">
                <ProfileAvatar />
                {name ? <Text variant="body" weight="semibold">{name}</Text> : null}
              </div>
              <SectionList className="aiwa-tma-blocks">
                <SectionList.Item>
                  {/* Режим — обычная строка списка со значением справа. Показываем
                      и в мужском режиме: иначе из него нельзя выйти. */}
                  <PaperRow
                    title="Режим"
                    trailing={(
                      <span className="aiwa-mode-value">
                        <Text variant="body" weight="regular">{modeLabel(currentMode)}</Text>
                        <AiwaCell.Part type="Chevron" />
                      </span>
                    )}
                    onClick={() => setView("mode")}
                  />
                  {data.mode === "male" ? null : <PaperRow title="Выписка для врача" description="PDF в чат бота" onClick={() => setView("report")} />}
                  <PaperRow title="Предпочтения по питанию" description="ограничения и цель калорий" onClick={() => setView("preferences")} />
                  <PaperRow title="Мои данные" description="рост · вес · возраст · цикл" onClick={() => setView("data")} />
                  <PaperRow title="Утренняя сводка" description={`${form.send_time || "08:00"} · МСК`} onClick={() => setView("summary")} />
                  <PaperRow
                    title="Проактивные сообщения"
                    description={form.proactive_enabled === false ? "выключены" : "не больше одного в день"}
                    onClick={() => setView("proactive")}
                  />
                  {data.mode === "male" ? null : <PaperRow title="Партнёр и близкие" description="короткая бережная сводка" onClick={openPartner} />}
                </SectionList.Item>
              </SectionList>
            </>
          ) : null}

          {view === "mode" ? (
            <SectionList className="aiwa-tma-blocks aiwa-settings-page">
              <SectionList.Item
                header="Режим Айвы"
                description="Выбери режим, чтобы рекомендации и календарь учитывали твой текущий этап."
                role="radiogroup"
                aria-label="Режим Айвы"
              >
                {MODE_OPTIONS.map((option) => (
                  <SelectionCell
                    key={option.value}
                    label={option.label}
                    selected={currentMode === option.value}
                    onClick={() => chooseMode(option.value)}
                  />
                ))}
              </SectionList.Item>
            </SectionList>
          ) : null}

          {view === "data" ? (
            <>
              <SectionList className="aiwa-tma-blocks aiwa-settings-page">
                <SectionList.Item
                  header="Мои данные"
                  description="Эти параметры помогают точнее рассчитывать питание, нагрузку и прогноз цикла."
                >
                  <div className="aiwa-settings-form aiwa-settings-form-grid">
                    <Field label="Рост, см" value={form.height || ""} onChange={(value) => setForm((current) => ({ ...current, height: value }))} inputMode="decimal" />
                    <Field label="Вес, кг" value={form.weight || ""} onChange={(value) => setForm((current) => ({ ...current, weight: value }))} inputMode="decimal" />
                    <Field label="Возраст" value={form.age || ""} onChange={(value) => setForm((current) => ({ ...current, age: value }))} inputMode="numeric" />
                    <Field label="Длина цикла" value={form.cycle_len || ""} onChange={(value) => setForm((current) => ({ ...current, cycle_len: value }))} inputMode="numeric" />
                  </div>
                </SectionList.Item>
              </SectionList>
              <RegularButton variant="filled" label="Сохранить" isFill {...actionProps("Сохранить данные", saveProfile)} />
            </>
          ) : null}

          {view === "preferences" ? (
            <>
              <SectionList className="aiwa-tma-blocks aiwa-settings-page">
                <SectionList.Item
                  header="Предпочтения по питанию"
                  description="Напиши только то, что важно учитывать Айве: ограничения, аллергии и желаемую калорийность."
                >
                  <div className="aiwa-settings-form">
                    <Field
                      label="Предпочтения и ограничения"
                      value={form.diet_note || ""}
                      onChange={(value) => setForm((current) => ({ ...current, diet_note: value }))}
                      placeholder="Например: без свинины, аллергия на орехи"
                      multiline
                    />
                    <Field label="Желаемые калории" value={form.kcal_goal || ""} onChange={(value) => setForm((current) => ({ ...current, kcal_goal: value }))} inputMode="numeric" />
                  </div>
                </SectionList.Item>
              </SectionList>
              <RegularButton variant="filled" label="Сохранить" isFill {...actionProps("Сохранить предпочтения", savePreferences)} />
            </>
          ) : null}

          {view === "summary" ? (
            <>
              <SectionList className="aiwa-tma-blocks aiwa-settings-page">
                <SectionList.Item
                  header="Утренняя сводка"
                  description="Айва пришлёт короткую сводку дня в чат в указанное время по Москве."
                >
                  <div className="aiwa-settings-form">
                    <Field label="Время, МСК" type="time" value={form.send_time || "08:00"} onChange={(value) => setForm((current) => ({ ...current, send_time: value }))} />
                  </div>
                </SectionList.Item>
              </SectionList>
              <RegularButton variant="filled" label="Сохранить" isFill {...actionProps("Сохранить время сводки", saveSummaryTime)} />
            </>
          ) : null}

          {view === "proactive" ? (
            <SectionList className="aiwa-tma-blocks aiwa-settings-page">
              <SectionList.Item
                header="Проактивные сообщения"
                description="Айва может сама написать, когда заметит важное изменение. Не больше одного сообщения в день."
                role="radiogroup"
                aria-label="Проактивные сообщения"
              >
                <SelectionCell
                  label="Включены"
                  selected={form.proactive_enabled !== false}
                  onClick={() => setProactive(true)}
                />
                <SelectionCell
                  label="Выключены"
                  selected={form.proactive_enabled === false}
                  onClick={() => setProactive(false)}
                />
              </SectionList.Item>
            </SectionList>
          ) : null}

          {view === "report" ? (
            <>
              <SectionList className="aiwa-tma-blocks aiwa-settings-page">
                <SectionList.Item
                  header="Выписка для врача"
                  description="Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота."
                  role="radiogroup"
                  aria-label="Период выписки"
                >
                  {REPORT_PERIOD_OPTIONS.map((option) => (
                    <SelectionCell
                      key={option.value}
                      label={option.label}
                      selected={reportPeriod === option.value}
                      onClick={() => setReportPeriod(option.value)}
                    />
                  ))}
                </SectionList.Item>
              </SectionList>
              <RegularButton variant="filled" label="Собрать выписку" isFill {...actionProps("Собрать выписку", requestReport)} />
            </>
          ) : null}

          {view === "partner" ? (
            <>
              <SectionList className="aiwa-tma-blocks aiwa-settings-page">
                <SectionList.Item
                  header="Партнёр и близкие"
                  description="Близкий получит только бережную сводку о поддержке и отдыхе — без календаря, интимных и медицинских деталей."
                >
                  {partner === null ? (
                    <AiwaCell><AiwaCell.Text title="Готовлю ссылку…" /></AiwaCell>
                  ) : null}
                  {partner?.linked ? (
                    <PaperRow title="Партнёр подключён" description="Бережная сводка включена" />
                  ) : null}
                  {partner?.link ? (
                    <div className="aiwa-settings-form">
                      <Field label="Ссылка-приглашение" value={partner.link} readOnly multiline />
                    </div>
                  ) : null}
                  {partner && !partner.linked && !partner.link ? (
                    <AiwaCell>
                      <AiwaCell.Text title="Ссылка доступна только в Telegram" description="В боте можно использовать команду /partner" />
                    </AiwaCell>
                  ) : null}
                </SectionList.Item>
              </SectionList>
              {partner?.linked ? <RegularButton variant="filled" label="Отключить партнёра" isFill {...actionProps("Отключить партнёра", unlinkPartner)} /> : null}
              {partner?.link ? <RegularButton variant="filled" label="Скопировать ссылку" isFill {...actionProps("Скопировать ссылку", copyPartner)} /> : null}
            </>
          ) : null}
        </div>
      </>
    </AiwaModalView>
  );
}
