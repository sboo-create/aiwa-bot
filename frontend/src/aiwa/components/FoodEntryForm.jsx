import { useState } from "react";
import { AiwaButton } from "./AiwaButton";
import { Field } from "./Field";
import { ChoicePills } from "./ChoicePills";
import { FOOD_SLOTS, foodFormFromMeal } from "../lib/constants";
import { apiCall, showToast, actionProps } from "../lib/api";
import { optimisticFoodEdit } from "../lib/foodDayCache";
import {
  completeManualFoodRequest,
  manualFoodRequestForPayload,
  manualFoodResponseExpiresTarget,
  retireManualFoodRequest,
} from "../lib/foodMutation";

export function FoodEntryForm({ meal, onSaved, onClose, choiceSurface = "container" }) {
  const [form, setForm] = useState(() => foodFormFromMeal(meal));
  const [busy, setBusy] = useState(false);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const save = async () => {
    if (busy) return;
    if (!form.title.trim() && !String(form.kcal).trim()) {
      showToast("Укажи название или калории", { type: "error" });
      return;
    }
    setBusy(true);
    let manualRequest = null;
    try {
      manualRequest = meal ? null : manualFoodRequestForPayload(form);
      const result = await apiCall(meal ? "/api/diary_edit" : "/api/food_manual", {
        ...(meal ? { id: meal.id } : {}),
        ...form,
        ...(manualRequest ? {
          request_id: manualRequest.id,
          date: manualRequest.date,
        } : {}),
      });
      if (result?.ok === false || result?.error) {
        if (manualRequest && manualFoodResponseExpiresTarget(result)) {
          retireManualFoodRequest(manualRequest.id);
        }
        throw new Error(result.message || "Не получилось сохранить");
      }
      if (manualRequest) completeManualFoodRequest(manualRequest.id);
      showToast(meal ? "Приём обновлён" : "Приём добавлен", { type: "success" });
      await onSaved({
        type: meal ? "edit" : "receipt",
        result,
        meal: meal ? optimisticFoodEdit(meal, form) : null,
      });
      onClose();
    } catch (error) {
      showToast(error.message || "Не получилось сохранить", { type: "error" });
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="aiwa-form-stack">
      <Field label="Название" value={form.title} onChange={(value) => set("title", value)} placeholder="Например, творог и банан" />
      <div className="aiwa-form-grid">
        <Field label="Ккал" value={form.kcal} onChange={(value) => set("kcal", value)} inputMode="decimal" />
        <Field label="Граммы" value={form.grams} onChange={(value) => set("grams", value)} inputMode="decimal" />
        <Field label="Белки" value={form.protein} onChange={(value) => set("protein", value)} inputMode="decimal" />
        <Field label="Жиры" value={form.fat} onChange={(value) => set("fat", value)} inputMode="decimal" />
        <Field label="Углеводы" value={form.carbs} onChange={(value) => set("carbs", value)} inputMode="decimal" />
      </div>
      <ChoicePills
        label="Приём пищи"
        options={FOOD_SLOTS}
        value={form.slot}
        onChange={(value) => set("slot", value)}
        surface={choiceSurface}
      />
      <AiwaButton
        label={meal ? "Сохранить изменения" : "Сохранить приём"}
        loading={busy}
        isFill
        {...actionProps("Сохранить приём", save)}
      />
    </div>
  );
}
