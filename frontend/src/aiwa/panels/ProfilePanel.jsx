import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
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
  profileSettingsFormFromData,
  reconcileProfileSettingsForm,
  syncProfileSettingsSnapshot,
} from "../lib/profileSettings";
import {
  getProfileMutationState,
  isProfileMutationSessionCurrent,
  isProfileMutationInFlight,
  requestProfileMutation,
  subscribeToProfileMutation,
} from "../lib/profileMutation";
import { SelectionCheckIcon } from "../lib/icons";

const REPORT_PERIOD_OPTIONS = [
  { value: "3", label: "3 месяца" },
  { value: "6", label: "6 месяцев" },
  { value: "all", label: "Весь период" },
];
const PARTNER_ACTIONS = new Set(["copy-partner", "unlink-partner"]);

const modeLabel = (value) => MODE_OPTIONS.find((option) => option.value === value)?.label || "Не выбран";

const syncSettingsData = (actionKey, receipt) => (
  // Both bridges are data-only. The receipt fallback is local and cannot
  // navigate; it prevents an acknowledged server write from leaving D stale.
  syncProfileSettingsSnapshot(call, actionKey, receipt)
);

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
  const [mutationState, setMutationState] = useState(getProfileMutationState);
  const mutationOwnerId = useId();
  const openSession = useRef({ generation: 0, open: false });
  const adoptedMutation = useRef(null);
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
  useEffect(() => subscribeToProfileMutation(setMutationState), []);

  const currentMode = data.mode || MODE_OPTIONS[0].value;
  const isCycleMode = currentMode === "cycle";
  const isMaleMode = currentMode === "male";
  const name = profileName();
  const actionBusy = mutationState.active?.key || "";
  const actionLocked = Boolean(mutationState.active);

  const updateDraft = (field, value) => {
    userDraftVersion.current += 1;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const openView = (nextView) => {
    if (isProfileMutationInFlight()) return;
    setView(nextView);
  };

  const handleBack = () => {
    if (viewRef.current === "main" || isProfileMutationInFlight()) onClose();
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

  const reconcileMutationReceipt = async (
    actionKey,
    receipt,
    isCurrentSession,
    operation,
  ) => {
    const snapshot = await syncSettingsData(actionKey, receipt);
    if (!snapshot) {
      if (isCurrentSession()) {
        showToast(
          "Изменение сохранено, но данные профиля не обновились. Попробуй открыть профиль ещё раз.",
          { type: "error" },
        );
      }
      return null;
    }
    reconcileSettingsData(snapshot, operation);
    return snapshot;
  };

  useEffect(() => {
    if (!isOpen) return;
    const next = read("aiwaData") || {};
    // Reopening during a settings request keeps its page and loading affordance.
    // Partner actions are different: their data is cleared below, so keeping
    // that page would strand the new session on an empty loading state.
    const lockedMutation = getProfileMutationState().active;
    const lockedAction = lockedMutation?.key;
    const preserveActionView = lockedMutation?.ownerId === mutationOwnerId
      && !PARTNER_ACTIONS.has(lockedAction);
    const preserveReportView = isReportRequestInFlight() && viewRef.current === "report";
    if (!preserveActionView && !preserveReportView) setView("main");
    adoptedMutation.current = preserveActionView
      ? {
        id: lockedMutation.id,
        generation: openSession.current.generation,
      }
      : null;
    setPartner(null);
    setReportBusy(isReportRequestInFlight());
    // Do not replace an in-flight submitted draft with the host's pre-mutation
    // aiwaData snapshot. The operation's data-only sync reconciles it later.
    if (!isProfileMutationInFlight()) {
      setData(next);
      setForm(profileSettingsFormFromData(next));
      userDraftVersion.current += 1;
    }
  }, [isOpen, mutationOwnerId]);

  useEffect(() => {
    const completion = mutationState.completion;
    if (!isOpen
        || !completion
        || completion.value?.synced !== true
        || completion.ownerId === mutationOwnerId
        || viewRef.current !== "main") return;
    // A different mounted profile may have owned the mutation. This instance
    // stayed read-only on its main page, so it is safe to adopt the host's
    // canonical data once the shared lock clears.
    const next = read("aiwaData") || {};
    setData(next);
    setForm(profileSettingsFormFromData(next));
    userDraftVersion.current += 1;
  }, [isOpen, mutationOwnerId, mutationState.completion]);

  const openPartner = async () => {
    if (isProfileMutationInFlight()) return;
    const generation = openSession.current.generation;
    setView("partner");
    const result = await apiCall("/api/partner", {}).catch(() => null);
    if (openSession.current.open && openSession.current.generation === generation) {
      setPartner(result || {});
    }
  };

  const runAction = (key, action) => {
    if (isProfileMutationInFlight()) return null;
    const operation = {
      id: null,
      key,
      generation: openSession.current.generation,
      draftVersion: userDraftVersion.current,
    };
    const isCurrentSession = () => isProfileMutationSessionCurrent({
      isOpen: openSession.current.open,
      currentGeneration: openSession.current.generation,
      startedGeneration: operation.generation,
      operationId: operation.id,
      adoptedOperationId: adoptedMutation.current?.id,
      adoptedGeneration: adoptedMutation.current?.generation,
    });
    const request = requestProfileMutation(
      key,
      () => action(isCurrentSession, operation),
      { ownerId: mutationOwnerId },
    );
    operation.id = request.operation.id;
    if (request.owner) {
      request.promise.catch((error) => {
        if (isCurrentSession()) {
          showToast(error?.message || "Не получилось сохранить настройку", { type: "error" });
        }
      });
      return request.promise;
    }
    return null;
  };

  const saveProfile = () => runAction("profile", async (isCurrentSession, operation) => {
    const result = await apiCall("/api/profile", {
      height: form.height,
      weight: form.weight,
      age: form.age,
      ...(isCycleMode ? { cycle_len: form.cycle_len } : {}),
    }).catch(() => null);
    if (result?.ok) {
      const snapshot = await reconcileMutationReceipt(
        "profile", result, isCurrentSession, operation,
      );
      if (!snapshot) return { synced: false };
      if (!isCurrentSession()) return { synced: true };
      showToast("Данные сохранены", { type: "success" });
      setView("main");
    } else if (isCurrentSession()) {
      showToast(result?.text || (isCycleMode
        ? "Проверь рост, вес, возраст и длину цикла"
        : "Проверь рост, вес и возраст"), { type: "error" });
    }
    return { synced: Boolean(result?.ok) };
  });

  const savePreferences = () => runAction("preferences", async (isCurrentSession, operation) => {
    const result = await apiCall("/api/prefs", {
      diet_note: form.diet_note,
      kcal_goal: form.kcal_goal,
    }).catch(() => null);
    if (result?.ok) {
      const snapshot = await reconcileMutationReceipt(
        "preferences", result, isCurrentSession, operation,
      );
      if (!snapshot) return { synced: false };
      if (!isCurrentSession()) return { synced: true };
      showToast("Предпочтения сохранены", { type: "success" });
      setView("main");
    } else if (isCurrentSession()) {
      showToast(result?.text || "Не получилось сохранить предпочтения", { type: "error" });
    }
    return { synced: Boolean(result?.ok) };
  });

  const saveSummaryTime = () => runAction("summary", async (isCurrentSession, operation) => {
    const sendTime = String(form.send_time || "");
    const dailySummaryEnabled = form.daily_summary_enabled !== false;
    // Time + enabled are one atomic mutation. Both echoed values must match the
    // submitted snapshot before the UI can claim success.
    const result = await apiCall("/api/settime", {
      time: sendTime,
      daily_summary_enabled: dailySummaryEnabled,
    }).catch(() => null);
    let snapshot = null;
    if (result?.ok) {
      snapshot = await reconcileMutationReceipt(
        "summary", result, isCurrentSession, operation,
      );
      if (!snapshot) return { synced: false };
    }
    const acknowledged = result?.ok
      && result.send_time === sendTime
      && result.daily_summary_enabled === dailySummaryEnabled;
    if (!acknowledged) {
      if (isCurrentSession()) {
        showToast(result?.text || (result?.ok
          ? "Настройки сводки сохранены не полностью. Попробуй позже"
          : "Проверь время утренней сводки"), { type: "error" });
      }
      return { synced: false };
    }
    if (!isCurrentSession()) return { synced: true };
    showToast("Время сводки сохранено", { type: "success" });
    setView("main");
    return { synced: true };
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
      return { synced: false };
    }
    const snapshot = await reconcileMutationReceipt(
      "proactive", result, isCurrentSession, operation,
    );
    return { synced: Boolean(snapshot) };
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
      return { synced: false };
    }
    const snapshot = await reconcileMutationReceipt(
      "daily-summary", result, isCurrentSession, operation,
    );
    return { synced: Boolean(snapshot) };
  });

  const chooseMode = (mode) => runAction("mode", async (isCurrentSession, operation) => {
    const result = await apiCall("/api/mode", { mode }).catch(() => null);
    if (!result?.ok) {
      if (isCurrentSession()) {
        showToast(result?.text || "Не получилось сменить режим", { type: "error" });
      }
      return { synced: false };
    }
    const snapshot = await reconcileMutationReceipt(
      "mode", result, isCurrentSession, operation,
    );
    if (!snapshot) return { synced: false };
    if (!isCurrentSession()) return { synced: true };
    showToast(`Режим: ${modeLabel(mode)}`, {
      type: "success",
      description: result.seeded_period
        ? "Дату месячных поставили на сегодня — поправь в календаре"
        : undefined,
    });
    onClose();
    return { synced: true };
  });

  const copyPartner = () => runAction("copy-partner", async (isCurrentSession) => {
    if (!partner?.link) return;
    try {
      await navigator.clipboard.writeText(partner.link);
      if (!isCurrentSession()) return { synced: false };
      showToast("Ссылка скопирована", { type: "success" });
    } catch {
      if (!isCurrentSession()) return { synced: false };
      showToast("Ссылка готова — выдели и скопируй", { type: "error" });
    }
    return { synced: false };
  });

  const unlinkPartner = () => runAction("unlink-partner", async (isCurrentSession, operation) => {
    const result = await apiCall("/api/partner", { action: "unlink" }).catch(() => null);
    if (result?.ok) {
      const snapshot = await reconcileMutationReceipt(
        "partner", result, isCurrentSession, operation,
      );
      if (!snapshot) return { synced: false };
      if (!isCurrentSession()) return { synced: true };
      setPartner({ linked: false });
      showToast("Партнёр отключён", { type: "success" });
    } else if (isCurrentSession()) {
      showToast(result?.text || "Не получилось отключить партнёра", { type: "error" });
    }
    return { synced: Boolean(result?.ok) };
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
                  disabled={actionLocked && actionBusy !== "profile"}
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
                  disabled={actionLocked && actionBusy !== "preferences"}
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
                      disabled={reportBusy || actionLocked}
                      onClick={() => setReportPeriod(option.value)}
                    />
                  ))}
                </SectionList.Item>
              </SectionList>
              <div className="aiwa-page-action">
                <AiwaButton
                  label="Собрать выписку"
                  loading={reportBusy}
                  disabled={actionLocked}
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
