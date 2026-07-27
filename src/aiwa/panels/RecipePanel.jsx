import { useEffect, useState } from "react";
import { Text, RegularButton, SectionList, Spinner } from "../lib/tma";
import { AiwaCell } from "../components/AiwaCell";
import { AiwaModalView } from "../components/AiwaModalView";
import { apiCall, actionProps } from "../lib/api";

/**
 * Recipe card for a recommended dish. The recipe is generated on first open
 * (the backend caches it for the day), so the panel shows a spinner while the
 * model is writing and never blocks the tap itself.
 */
export function RecipePanel({ isOpen, meal, slotLabel = "", onClose, onAdd, busy = false }) {
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

  const macros = recipe?.macros || {};
  const macroLine = [macros.protein && `Б ${macros.protein}`, macros.fat && `Ж ${macros.fat}`, macros.carbs && `У ${macros.carbs}`]
    .filter(Boolean).join(" · ");
  const metaLine = [slotLabel, recipe?.kcal || meal?.kcal, macroLine, recipe?.time].filter(Boolean).join(" · ");

  return (
    <AiwaModalView isOpen={isOpen} onClose={onClose}>
      <SectionList className="aiwa-tma-blocks">
        <SectionList.Item>
          <AiwaCell tappable={false}>
            <AiwaCell.Text title={dish} description={metaLine || meal?.note || ""} bold />
          </AiwaCell>
        </SectionList.Item>

        {!recipe && !failed ? (
          <SectionList.Item>
            <AiwaCell tappable={false}>
              <div className="aiwa-cell-actions" aria-label="Готовлю рецепт">
                <Spinner size="m" />
                <Text variant="body" weight="regular">Айва пишет рецепт…</Text>
              </div>
            </AiwaCell>
          </SectionList.Item>
        ) : null}

        {failed ? (
          <SectionList.Item>
            <AiwaCell tappable={false}>
              <AiwaCell.Text title="Рецепт не собрался" description="Попробуй открыть блюдо ещё раз." />
            </AiwaCell>
          </SectionList.Item>
        ) : null}

        {recipe?.ingredients?.length ? (
          <SectionList.Item header="Ингредиенты">
            {recipe.ingredients.map((item) => (
              <AiwaCell key={item} tappable={false}>
                <AiwaCell.Text title={item} />
              </AiwaCell>
            ))}
          </SectionList.Item>
        ) : null}

        {recipe?.steps?.length ? (
          <SectionList.Item header="Приготовление">
            {recipe.steps.map((step, index) => (
              <AiwaCell key={step} tappable={false}>
                <AiwaCell.Text title={`${index + 1}. ${step}`} />
              </AiwaCell>
            ))}
          </SectionList.Item>
        ) : null}

        <SectionList.Item>
          <AiwaCell tappable={false}>
            <div className="aiwa-cell-actions">
              <RegularButton
                variant="filled"
                label={busy ? "Добавляю…" : "Добавить в дневник"}
                isFill
                disabled={busy}
                {...actionProps("Добавить в дневник", onAdd)}
              />
            </div>
          </AiwaCell>
        </SectionList.Item>
      </SectionList>
    </AiwaModalView>
  );
}
