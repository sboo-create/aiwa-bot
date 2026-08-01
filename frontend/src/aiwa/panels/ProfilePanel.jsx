import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Text, SectionList } from "../lib/tma";
import { AiwaModalView } from "../components/AiwaModalView";
import { AiwaButton } from "../components/AiwaButton";
import { PaperRow } from "../components/PaperRow";
import { AiwaCell } from "../components/AiwaCell";
import { ProfileAvatar, profileName } from "../components/ProfileAvatar";
import { Field } from "../components/Field";
import { MODE_OPTIONS } from "../lib/constants";
import { call, read, apiCall, showToast, actionProps, aiwaConfirmReportDelivered } from "../lib/api";
import {
  isReportRequestInFlight,
  requestReportOnce,
  subscribeToReportRequest,
} from "../lib/reportRequest";
import {
  normalizeProfileSettingsSnapshot,
  profileSettingsFormFromData,
  reconcileProfileSettingsForm,
} from "../lib/profileSettings";
import { SelectionCheckIcon } from "../lib/icons";

const REPORT_PERIOD_OPTIONS = [
  { value: "3", label: "3 месяца" },
  { value: "6", label: "6 месяцев" },
  { value: "all", label: "Весь период" },
];
const PARTNER_ACTIONS = new Set(["copy-partner", "unlink-partner"]);

const modeLabel = (value) => MODE_OPTIONS.find((option) => option.value === value)?.label || "Не выбран";

const syncSettingsData = async () => {
  try {
    // Phase 3 host contract: refresh aiwaData/marks and the active screen
    // without `go("today")`. Never fall back to the legacy navigational
    // reloadAfterEdit bridge from a settings mutation.
    const result = await call("reloadSettingsData");
    return normalizeProfileSettingsSnapshot(result);
  } catch {
    // The API mutation already succeeded; a host sync failure must not turn it
    // into a second write. The next explicit host refresh can reconcile data.
    return null;
  }
};

function SelectionCell({ label, selected, disabled = false, onClick }) {
  const moveSelection = (event) => {
    const direction = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    }[event.key];
    const boundary = event.key === "Home" ? "first" : event.key === "End" ? "last" : null;
    if (!direction && !boundary) return;
    const group = event.currentTarget.closest('[role="radiogroup"]');
    const radios = [...(group?.querySelectorAll('[role="radio"]:not(:disabled)') || [])];
    if (!radios.length) return;
    event.preventDefault();
    const currentIndex = radios.indexOf(event.currentTarget);
    const next = boundary === "first"
      ? radios[0]
      : boundary === "last"
        ? radios[radios.length - 1]
        : radios[(currentIndex + direction + radios.length) % radios.length];
    next?.focus();
    next?.click();
  };

  return (
    <AiwaCell
      as="button"
      type="button"
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled || undefined}
      disabled={disabled || undefined}
      tabIndex={disabled || !selected ? -1 : 0}
      onClick={disabled || selected ? undefined : onClick}
      onKeyDown={moveSelection}
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
  const [reportBusy, setReportBusy] = useState(isReportRequestInFlight);
  const [actionBusy, setActionBusy] = useState("");
  const actionLock = useRef(null);
  const operationId = useRef(0);
  const openSession = useRef({ generation: 0, open: false });
  const viewRef = useRef(view);
  const userDraftVersion = useRef(0);
  const appliedSettingsRevision = useRef(-Infinity);
  viewRef.current = view;

  useLayoutEffect(() => {
    openSession.current = {
      generation: openSession.current.generation + (isOpen ? 1 : 0),
      open: isOpen,
    };
  }, [isOpen]);

  useEffect(() => subscribeToReportRequest(setReportBusy), []);

  const currentMode = data.mode || MODE_OPTIONS[0].value;
  const isCycleMode = currentMode === "cycle";
  const isMaleMode = currentMode === "male";
  const name = profileName();
  const actionLocked = Boolean(actionBusy);

  const updateDraft = (field, value) => {
    userDraftVersion.current += 1;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const openView = (nextView) => {
    if (actionLock.current) return;
    setView(nextView);
  };

  const handleBack = () => {
    if (viewRef.current === "main" || actionLock.current) onClose();
    else setView("main");
  };

  const reconcileSettingsData = (snapshot, operation) => {
    if (!snapshot || snapshot.revision < appliedSettingsRevision.current) return;
    appliedSettingsRevision.current = snapshot.revision;
    if (!openSession.current.open) return;
    setData(snapshot.data);
    // A late canonical response may reconcile a reopened session, but it may
    // only replace fields owned by this mutation and only while the submitted
    // draft is still untouched.
    setForm((current) => reconcileProfileSettingsForm({
      current,
      data: snapshot.data,
      actionKey: operation.key,
      draftVersion: userDraftVersion.current,
      submittedDraftVersion: operation.draftVersion,
    }));
  };

  useEffect(() => {
    if (!isOpen) return;
    const next = read("aiwaData") || {};
    // Reopening during a settings request keeps its page and loading affordance.
    // Partner actions are different: their data is cleared below, so keeping
    // that page would strand the new session on an empty loading state.
    const lockedAction = actionLock.current?.key;
    const preserveActionView = lockedAction && !PARTNER_ACTIONS.has(lockedAction);
    const preserveReportView = isReportRequestInFlight() && viewRef.current === "report";
    if (!preserveActionView && !preserveReportView) setView("main");
    setPartner(null);
    setActionBusy(actionLock.current?.key || "");
    setReportBusy(isReportRequestInFlight());
    // Do not replace an in-flight submitted draft with the host's pre-mutation
    // aiwaData snapshot. The operation's data-only sync reconciles it later.
    if (!actionLock.current) {
      setData(next);
      setForm(profileSettingsFormFromData(next));
      userDraftVersion.current += 1;
    }
  }, [isOpen]);

  const openPartner = async () => {
    if (actionLock.current) return;
    const generation = openSession.current.generation;
    setView("partner");
    const result = await apiCall("/api/partner", {}).catch(() => null);
    if (openSession.current.open && openSession.current.generation === generation) {
      setPartner(result || {});
    }
  };

  const runAction = async (key, action) => {
    if (actionLock.current) return;
    const operation = {
      id: ++operationId.current,
      key,
      generation: openSession.current.generation,
      draftVersion: userDraftVersion.current,
    };
    actionLock.current = operation;
    setActionBusy(key);
    const isCurrentSession = () => (
      openSession.current.open
      && openSession.current.generation === operation.generation
    );
    try {
      await action(isCurrentSession, operation);
    } finally {
      if (actionLock.current?.id === operation.id) {
        actionLock.current = null;
        setActionBusy((current) => (current === key ? "" : current));
      }
    }
  };

  const saveProfile = () => runAction("profile", async (isCurrentSession, operation) => {
    const result = await apiCall("/api/profile", {
      height: form.height,
      weight: form.weight,
      age: form.age,
      ...(isCycleMode ? { cycle_len: form.cycle_len } : {}),
    }).catch(() => null);
    if (result?.ok) {
      const snapshot = await syncSettingsData();
      reconcileSettingsData(snapshot, operation);
      if (!isCurrentSession()) return;
      showToast("Данные сохранены", { type: "success" });
      setView("main");
    } else if (isCurrentSession()) {
      showToast(result?.text || (isCycleMode
        ? "Проверь рост, вес, возраст и длину цикла"
        : "Проверь рост, вес и возраст"), { type: "error" });
    }
  });

  const savePreferences = () => runAction("preferences", async (isCurrentSession, operation) => {
    const result = await apiCall("/api/prefs", {
      diet_note: form.diet_note,
      kcal_goal: form.kcal_goal,
    }).catch(() => null);
    if (result?.ok) {
      const snapshot = await syncSettingsData();
      reconcileSettingsData(snapshot, operation);
      if (!isCurrentSession()) return;
      showToast("Предпочтения сохранены", { type: "success" });
      setView("main");
    } else if (isCurrentSession()) {
      showToast(result?.text || "Не получилось сохранить предпочтения", { type: "error" });
    }
  });

  const saveSummaryTime = () => runAction("summary", async (isCurrentSession, operation) => {
    const dailySummaryEnabled = form.daily_summary_enabled !== false;
    // Forward Phase 3 contract: time + enabled must be one atomic mutation.
    // The current host ignores daily_summary_enabled and does not acknowledge
    // it, so source refuses to claim success until the host implements both.
    const result = await apiCall("/api/settime", {
      time: form.send_time,
      daily_summary_enabled: dailySummaryEnabled,
    }).catch(() => null);
    if (result?.ok) {
      const snapshot = await syncSettingsData();
      reconcileSettingsData(snapshot, operation);
    }
    const acknowledged = result?.ok
      && result.daily_summary_enabled === dailySummaryEnabled;
    if (!acknowledged) {
      if (isCurrentSession()) {
        showToast(result?.text || (result?.ok
          ? "Настройки сводки сохранены не полностью. Попробуй позже"
          : "Проверь время утренней сводки"), { type: "error" });
      }
      return;
    }
    if (!isCurrentSession()) return;
    showToast("Время сводки сохранено", { type: "success" });
    setView("main");
  });

  const requestReport = async () => {
    const generation = openSession.current.generation;
    const { owner, promise } = requestReportOnce(reportPeriod);
    if (!owner) return;
    const result = await promise.catch(() => null);
    // Delivery is an external fact: acknowledge it even if the initiating
    // profile session was closed or a newer session has since opened.
    if (result?.ok && result?.delivered) {
      aiwaConfirmReportDelivered();
      return;
    }
    if (openSession.current.open && openSession.current.generation === generation) {
      showToast(result?.text || "Выписка временно недоступна", { type: "error" });
    }
  };

  const setProactive = (enabled) => runAction("proactive", async (isCurrentSession, operation) => {
    const previous = form.proactive_enabled !== false;
    setForm((current) => ({ ...current, proactive_enabled: enabled }));
    const result = await apiCall("/api/proactive", { enabled }).catch(() => null);
    if (!result?.ok) {
      if (openSession.current.open && userDraftVersion.current === operation.draftVersion) {
        setForm((current) => ({ ...current, proactive_enabled: previous }));
      }
      if (isCurrentSession()) showToast("Не получилось изменить настройку", { type: "error" });
      return;
    }
    const snapshot = await syncSettingsData();
    reconcileSettingsData(snapshot, operation);
  });

  const setDailySummary = (enabled) => runAction("daily-summary", async (isCurrentSession, operation) => {
    const previous = form.daily_summary_enabled !== false;
    setForm((current) => ({ ...current, daily_summary_enabled: enabled }));
    const result = await apiCall("/api/daily-summary", { enabled }).catch(() => null);
    if (!result?.ok) {
      if (openSession.current.open && userDraftVersion.current === operation.draftVersion) {
        setForm((current) => ({ ...current, daily_summary_enabled: previous }));
      }
      if (isCurrentSession()) showToast("Не получилось изменить настройку", { type: "error" });
      return;
    }
    const snapshot = await syncSettingsData();
    reconcileSettingsData(snapshot, operation);
  });

  const chooseMode = (mode) => runAction("mode", async (isCurrentSession, operation) => {
    const result = await apiCall("/api/mode", { mode }).catch(() => null);
    if (!result?.ok) {
      if (isCurrentSession()) {
        showToast(result?.text || "Не получилось сменить режим", { type: "error" });
      }
      return;
    }
    const snapshot = await syncSettingsData();
    reconcileSettingsData(snapshot, operation);
    if (!isCurrentSession()) return;
    showToast(`Режим: ${modeLabel(mode)}`, {
      type: "success",
      description: result.seeded_period
        ? "Дату месячных поставили на сегодня — поправь в календаре"
        : undefined,
    });
    onClose();
  });

  const copyPartner = () => runAction("copy-partner", async (isCurrentSession) => {
    if (!partner?.link) return;
    try {
      await navigator.clipboard.writeText(partner.link);
      if (!isCurrentSession()) return;
      showToast("Ссылка скопирована", { type: "success" });
    } catch {
      if (!isCurrentSession()) return;
      showToast("Ссылка готова — выдели и скопируй", { type: "error" });
    }
  });

  const unlinkPartner = () => runAction("unlink-partner", async (isCurrentSession, operation) => {
    const result = await apiCall("/api/partner", { action: "unlink" }).catch(() => null);
    if (result?.ok) {
      const snapshot = await syncSettingsData();
      reconcileSettingsData(snapshot, operation);
      if (!isCurrentSession()) return;
      setPartner({ linked: false });
      showToast("Партнёр отключён", { type: "success" });
    } else if (isCurrentSession()) {
      showToast(result?.text || "Не получилось отключить партнёра", { type: "error" });
    }
  });

  return (
    <AiwaModalView
      isOpen={isOpen}
      onClose={onClose}
      onBack={handleBack}
      aria-label="Профиль и настройки"
    >
      <>
        <div className="aiwa-sheet-scroll" aria-busy={Boolean(actionBusy || reportBusy) || undefined}>
          {view === "main" ? (
            <>
              <div className="aiwa-profile-avatar">
                <ProfileAvatar />
                {name ? <Text variant="body" weight="semibold">{name}</Text> : null}
              </div>
              <SectionList className="aiwa-tma-blocks">
                <SectionList.Item>
                  <PaperRow
                    title="Режим"
                    trailing={(
                      <span className="aiwa-mode-value">
                        <Text variant="body" weight="regular">{modeLabel(currentMode)}</Text>
                        {actionLocked ? null : <AiwaCell.Part type="Chevron" />}
                      </span>
                    )}
                    onClick={actionLocked ? undefined : () => openView("mode")}
                  />
                  <PaperRow title={isMaleMode ? "Выписка по самочувствию" : "Выписка для врача"} description="PDF в чат бота" onClick={actionLocked ? undefined : () => openView("report")} />
                  <PaperRow title="Предпочтения по питанию" description="ограничения и цель калорий" onClick={actionLocked ? undefined : () => openView("preferences")} />
                  <PaperRow title="Мои данные" description={isCycleMode ? "рост · вес · возраст · цикл" : "рост · вес · возраст"} onClick={actionLocked ? undefined : () => openView("data")} />
                  <PaperRow title="Утренняя сводка" description={form.daily_summary_enabled === false ? "выключена" : `${form.send_time || "08:00"} · МСК`} onClick={actionLocked ? undefined : () => openView("summary")} />
                  <PaperRow
                    title="Проактивные сообщения"
                    description={form.proactive_enabled === false ? "выключены" : "не больше одного в день"}
                    onClick={actionLocked ? undefined : () => openView("proactive")}
                  />
                  {isMaleMode ? null : <PaperRow title="Партнёр и близкие" description="короткая бережная сводка" onClick={actionLocked ? undefined : openPartner} />}
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
                aria-busy={actionBusy === "mode" || undefined}
              >
                {MODE_OPTIONS.map((option) => (
                  <SelectionCell
                    key={option.value}
                    label={option.label}
                    selected={currentMode === option.value}
                    disabled={actionLocked}
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
                  description={isCycleMode
                    ? "Эти параметры помогают точнее рассчитывать питание, нагрузку и прогноз цикла."
                    : "Эти параметры помогают точнее рассчитывать питание и нагрузку."}
                >
                  <div className="aiwa-settings-form aiwa-settings-form-grid">
                    <Field label="Рост, см" value={form.height || ""} onChange={(value) => updateDraft("height", value)} inputMode="decimal" disabled={actionLocked} />
                    <Field label="Вес, кг" value={form.weight || ""} onChange={(value) => updateDraft("weight", value)} inputMode="decimal" disabled={actionLocked} />
                    <Field label="Возраст" value={form.age || ""} onChange={(value) => updateDraft("age", value)} inputMode="numeric" disabled={actionLocked} />
                    {isCycleMode ? (
                      <Field label="Длина цикла" value={form.cycle_len || ""} onChange={(value) => updateDraft("cycle_len", value)} inputMode="numeric" disabled={actionLocked} />
                    ) : null}
                  </div>
                </SectionList.Item>
              </SectionList>
              <div className="aiwa-page-action">
                <AiwaButton
                  label="Сохранить"
                  loading={actionBusy === "profile"}
                  isFill
                  {...actionProps("Сохранить данные", saveProfile)}
                />
              </div>
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
                      onChange={(value) => updateDraft("diet_note", value)}
                      placeholder="Например: без свинины, аллергия на орехи"
                      multiline
                      disabled={actionLocked}
                    />
                    <Field label="Желаемые калории" value={form.kcal_goal || ""} onChange={(value) => updateDraft("kcal_goal", value)} inputMode="numeric" disabled={actionLocked} />
                  </div>
                </SectionList.Item>
              </SectionList>
              <div className="aiwa-page-action">
                <AiwaButton
                  label="Сохранить"
                  loading={actionBusy === "preferences"}
                  isFill
                  {...actionProps("Сохранить предпочтения", savePreferences)}
                />
              </div>
            </>
          ) : null}

          {view === "summary" ? (
            <>
              <SectionList className="aiwa-tma-blocks aiwa-settings-page">
                <SectionList.Item
                  header="Утренняя сводка"
                  description="Айва пришлёт короткую сводку дня в чат в указанное время по Москве."
                  aria-busy={actionBusy === "daily-summary" || actionBusy === "summary" || undefined}
                >
                  <div role="radiogroup" aria-label="Утренняя сводка">
                    <SelectionCell
                      label="Присылать утром"
                      selected={form.daily_summary_enabled !== false}
                      disabled={actionLocked}
                      onClick={() => setDailySummary(true)}
                    />
                    <SelectionCell
                      label="Не присылать"
                      selected={form.daily_summary_enabled === false}
                      disabled={actionLocked}
                      onClick={() => setDailySummary(false)}
                    />
                  </div>
                  <div className="aiwa-settings-form">
                    <Field label="Время, МСК" type="time" value={form.send_time || "08:00"} onChange={(value) => updateDraft("send_time", value)} disabled={actionLocked} />
                  </div>
                </SectionList.Item>
              </SectionList>
              <div className="aiwa-page-action">
                <AiwaButton
                  label="Сохранить"
                  loading={actionBusy === "summary"}
                  disabled={actionLocked && actionBusy !== "summary"}
                  isFill
                  {...actionProps("Сохранить время сводки", saveSummaryTime)}
                />
              </div>
            </>
          ) : null}

          {view === "proactive" ? (
            <SectionList className="aiwa-tma-blocks aiwa-settings-page">
              <SectionList.Item
                header="Проактивные сообщения"
                description="Айва может сама написать, когда заметит важное изменение. Не больше одного сообщения в день."
                role="radiogroup"
                aria-label="Проактивные сообщения"
                aria-busy={actionBusy === "proactive" || undefined}
              >
                <SelectionCell
                  label="Включены"
                  selected={form.proactive_enabled !== false}
                  disabled={actionLocked}
                  onClick={() => setProactive(true)}
                />
                <SelectionCell
                  label="Выключены"
                  selected={form.proactive_enabled === false}
                  disabled={actionLocked}
                  onClick={() => setProactive(false)}
                />
              </SectionList.Item>
            </SectionList>
          ) : null}

          {view === "report" ? (
            <>
              <SectionList className="aiwa-tma-blocks aiwa-settings-page">
                <SectionList.Item
                  header={isMaleMode ? "Выписка по самочувствию" : "Выписка для врача"}
                  description={isMaleMode
                    ? "Динамика энергии и дневник самочувствия придут PDF-файлом в чат бота."
                    : "Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота."}
                  role="radiogroup"
                  aria-label="Период выписки"
                  aria-busy={reportBusy || undefined}
                >
                  {REPORT_PERIOD_OPTIONS.map((option) => (
                    <SelectionCell
                      key={option.value}
                      label={option.label}
                      selected={reportPeriod === option.value}
                      disabled={reportBusy}
                      onClick={() => setReportPeriod(option.value)}
                    />
                  ))}
                </SectionList.Item>
              </SectionList>
              <div className="aiwa-page-action">
                <AiwaButton
                  label="Собрать выписку"
                  loading={reportBusy}
                  isFill
                  {...actionProps("Собрать выписку", requestReport)}
                />
              </div>
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
                    <AiwaCell tappable={false}><AiwaCell.Text title="Готовлю ссылку…" /></AiwaCell>
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
                    <AiwaCell tappable={false}>
                      <AiwaCell.Text title="Ссылка доступна только в Telegram" description="В боте можно использовать команду /partner" />
                    </AiwaCell>
                  ) : null}
                </SectionList.Item>
              </SectionList>
              {partner?.linked ? (
                <div className="aiwa-page-action">
                  <AiwaButton
                    label="Отключить партнёра"
                    loading={actionBusy === "unlink-partner"}
                    disabled={Boolean(actionBusy) && actionBusy !== "unlink-partner"}
                    isFill
                    {...actionProps("Отключить партнёра", unlinkPartner)}
                  />
                </div>
              ) : null}
              {partner?.link ? (
                <div className="aiwa-page-action">
                  <AiwaButton
                    label="Скопировать ссылку"
                    loading={actionBusy === "copy-partner"}
                    disabled={Boolean(actionBusy) && actionBusy !== "copy-partner"}
                    isFill
                    {...actionProps("Скопировать ссылку", copyPartner)}
                  />
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </>
    </AiwaModalView>
  );
}
