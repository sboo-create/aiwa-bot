import { useEffect, useState } from "react";
import { Text, RegularButton } from "../lib/tma";
import { AiwaModalView } from "../components/AiwaModalView";
import { Field } from "../components/Field";
import { apiCall, showToast, actionProps } from "../lib/api";

export function TrainingProfilePanel({ isOpen, onClose, profile, onSaved }) {
  const [form, setForm] = useState(profile || {});
  useEffect(() => { if (isOpen) setForm(profile || {}); }, [isOpen, profile]);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const save = async () => {
    const result = await apiCall("/api/train_profile", form).catch(() => null);
    if (result?.ok) {
      showToast("Тренировочный профиль сохранён", { type: "success" });
      await onSaved();
      onClose();
    } else showToast("Не получилось сохранить", { type: "error" });
  };
  return (
    <AiwaModalView isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="aiwa-sheet-scroll aiwa-form-stack">
          <Text variant="body" weight="regular">Расскажи, чем занимаешься и что важно беречь. Айва учтёт это в рекомендациях и разборе нагрузки.</Text>
          <Field label="Формат" value={form.format || ""} onChange={(value) => set("format", value)} placeholder="Зал и прогулки" />
          <Field label="Цель" value={form.goal || ""} onChange={(value) => set("goal", value)} placeholder="Тонус и больше энергии" />
          <Field label="Ограничения" value={form.limits || ""} onChange={(value) => set("limits", value)} placeholder="Например, бережём поясницу" />
          <RegularButton variant="filled" label="Сохранить" isFill {...actionProps("Сохранить профиль", save)} />
        </div>
      </div>
    </AiwaModalView>
  );
}
