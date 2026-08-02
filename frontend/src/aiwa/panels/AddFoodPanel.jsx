import { useEffect, useState } from "react";
import { Text, Spinner } from "../lib/tma";
import { AiwaModalView } from "../components/AiwaModalView";
import { AiwaButton } from "../components/AiwaButton";
import { ChoicePills } from "../components/ChoicePills";
import { FoodEntryForm } from "../components/FoodEntryForm";
import { Field } from "../components/Field";
import { apiCall, showToast, trackFlow, actionProps } from "../lib/api";

export function AddFoodPanel({ isOpen, onClose, onSaved, editingMeal = null }) {
  const [method, setMethod] = useState("text");
  const [textValue, setTextValue] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (isOpen) {
      trackFlow("food");
      setMethod(editingMeal ? "manual" : "text");
      setTextValue("");
    }
  }, [editingMeal, isOpen]);

  const addText = async () => {
    if (busy || !textValue.trim()) return;
    setBusy(true);
    try {
      const result = await apiCall("/api/food_text", { text: textValue.trim() });
      if (!result?.ok) throw new Error(result?.message || "Не получилось разобрать приём");
      showToast(`Добавлено · ${result.rec?.kcal || 0} ккал`, { type: "success" });
      await onSaved({ type: "receipt", result });
      onClose();
    } catch (error) {
      showToast(error.message || "Не получилось добавить", { type: "error" });
    } finally {
      setBusy(false);
    }
  };

  const upload = async (file) => {
    if (busy || !file) return;
    setBusy(true);
    try {
      const fn = window.aiwaUploadFoodPhoto;
      if (typeof fn !== "function") throw new Error("Загрузка фото недоступна");
      const result = await fn(file);
      await onSaved(result && typeof result === "object" ? { type: "receipt", result } : null);
      showToast("Приём добавлен", { type: "success" });
      onClose();
    } catch (error) {
      showToast(error.message || "Не получилось разобрать фото", { type: "error" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <AiwaModalView isOpen={isOpen} onClose={onClose} aria-label={editingMeal ? "Изменить приём пищи" : "Добавить приём пищи"}>
      <div>
        <div className="aiwa-sheet-scroll aiwa-form-stack">
          {editingMeal ? (
            <FoodEntryForm meal={editingMeal} onSaved={onSaved} onClose={onClose} choiceSurface="canvas" />
          ) : (
            <>
              <ChoicePills
                surface="canvas"
                options={[
                  { value: "photo", label: "Фото" },
                  { value: "text", label: "Текст" },
                  { value: "manual", label: "Вручную" },
                ]}
                value={method}
                onChange={setMethod}
              />
              {method === "photo" ? (
                <label className={`aiwa-upload-zone${busy ? " is-busy" : ""}`}>
                  {busy ? <Spinner size={28} /> : null}
                  <Text variant="title3" weight="semibold">{busy ? "Разбираю фото…" : "Сфотографировать еду"}</Text>
                  <Text variant="body" weight="regular">
                    {busy ? "Айва считает КБЖУ, это займёт несколько секунд." : "Айва распознает блюдо и посчитает КБЖУ."}
                  </Text>
                  <input type="file" accept="image/*" capture="environment" disabled={busy} onChange={(event) => upload(event.target.files?.[0])} />
                </label>
              ) : null}
              {method === "text" ? (
                <div className="aiwa-form-stack">
                  <Field
                    label="Что было в приёме пищи?"
                    value={textValue}
                    onChange={setTextValue}
                    placeholder="Например: 200 г творога и банан"
                    multiline
                  />
                  <AiwaButton
                    label="Добавить приём"
                    loading={busy}
                    isFill
                    disabled={!textValue.trim()}
                    {...actionProps("Добавить приём", addText)}
                  />
                </div>
              ) : null}
              {method === "manual" ? <FoodEntryForm meal={null} onSaved={onSaved} onClose={onClose} choiceSurface="canvas" /> : null}
            </>
          )}
        </div>
      </div>
    </AiwaModalView>
  );
}
