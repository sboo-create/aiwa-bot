import { useEffect, useState } from "react";
import { Text, Spinner } from "../lib/tma";
import { AiwaModalView } from "../components/AiwaModalView";
import { AiwaButton } from "../components/AiwaButton";
import { apiCall, actionProps } from "../lib/api";

const calorieLabel = (value) => {
  const match = String(value || "").match(/\d[\d\s\u00a0]*/);
  return match ? `${match[0].trim()} калорий` : "";
};

/**
 * Recipe card for a recommended dish. The recipe is generated on first open
 * (the backend caches it for the day), so the panel shows a spinner while the
 * model is writing and never blocks the tap itself.
 */
export function RecipePanel({ isOpen, meal, image, slotLabel = "", onClose, onAdd, busy = false }) {
  const [recipe, setRecipe] = useState(null);
  const [failed, setFailed] = useState(false);
  const dish = meal?.dish || "";

  useEffect(() => {
    if (!isOpen || !dish) return;
    setRecipe(null);
    setFailed(false);
    let alive = true;
    apiCall("/api/recipe", { dish })
      .then((result) => {
        if (!alive) return;
        if (result?.steps?.length) setRecipe(result);
        else setFailed(true);
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [isOpen, dish]);

  const metaLine = [slotLabel, calorieLabel(meal?.kcal || recipe?.kcal)].filter(Boolean).join(" · ");

  return (
    <AiwaModalView isOpen={isOpen} onClose={onClose}>
      <div className="aiwa-sheet-scroll aiwa-recipe-page">
        <header className="aiwa-recipe-hero">
          {image ? (
            <span className="aiwa-recipe-image">
              <img src={image} alt={dish} />
            </span>
          ) : null}
          <div className="aiwa-recipe-heading">
            <Text as="h1" variant="body" weight="semibold">{dish}</Text>
            {metaLine || meal?.note ? (
              <Text as="p" variant="subheadline2" weight="regular">
                {metaLine || meal?.note}
              </Text>
            ) : null}
          </div>
        </header>

        <main className="aiwa-recipe-content" aria-live="polite">
          {!recipe && !failed ? (
            <div className="aiwa-recipe-status" role="status" aria-label="Готовлю рецепт">
              <Spinner size="m" />
              <Text variant="body" weight="regular">Айва пишет рецепт…</Text>
            </div>
          ) : null}

          {failed ? (
            <section className="aiwa-recipe-section">
              <Text as="h2" variant="body" weight="semibold">Рецепт не собрался</Text>
              <Text as="p" variant="body" weight="regular">Попробуй открыть блюдо ещё раз.</Text>
            </section>
          ) : null}

          {recipe?.ingredients?.length ? (
            <section className="aiwa-recipe-section">
              <Text as="h2" variant="body" weight="semibold">Ингредиенты</Text>
              <ul className="aiwa-recipe-list">
                {recipe.ingredients.map((item) => (
                  <li key={item}><Text variant="body" weight="regular">{item}</Text></li>
                ))}
              </ul>
            </section>
          ) : null}

          {recipe?.steps?.length ? (
            <section className="aiwa-recipe-section">
              <Text as="h2" variant="body" weight="semibold">Приготовление</Text>
              <ol className="aiwa-recipe-list">
                {recipe.steps.map((step, index) => (
                  <li key={step} value={index + 1}><Text variant="body" weight="regular">{step}</Text></li>
                ))}
              </ol>
            </section>
          ) : null}
        </main>

        <div className="aiwa-recipe-action">
          <AiwaButton
            label="Добавить в дневник"
            loading={busy}
            isFill
            {...actionProps("Добавить в дневник", onAdd)}
          />
        </div>
      </div>
    </AiwaModalView>
  );
}
