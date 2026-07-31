import unittest
from pathlib import Path

def _deslop_bundle(directory):
    """Имя чанка версионируется при сборке — резолвим по маске, не по строке."""
    matches = sorted(directory.glob("deslop-main-*.js"))
    assert len(matches) == 1, f"ожидался один deslop-main-*.js: {matches}"
    return matches[0]


def _deslop_chart(directory):
    matches = sorted(directory.glob("AiwaWebUiChart-*.js"))
    assert len(matches) == 1, f"ожидался один AiwaWebUiChart-*.js: {matches}"
    return matches[0]




ROOT = Path(__file__).resolve().parents[1]
BUNDLE = _deslop_bundle(ROOT / "webapp2/assets/deslop")
PLACEHOLDER = ROOT / "webapp2/assets/food/meal-placeholder.svg"


class FoodVisualFallbackTests(unittest.TestCase):
    def test_unknown_meal_is_neutral_and_drink_has_its_own_asset(self):
        source = BUNDLE.read_text(encoding="utf-8")
        self.assertIn('"/assets/food/meal-placeholder.svg"', source)
        self.assertIn('"/assets/food/meal-placeholder.svg"', source)
        self.assertIn('"напиток"', source)
        self.assertIn('"/assets/food/drink-cup.svg?v=1"', source)
        # серверная картинка -> манифест -> заглушка по типу приёма
        self.assertIn("image_url", source)
        # заглушка выбирается по типу приёма: стакан для напитков, тарелка иначе
        self.assertIn('"/assets/food/drink-cup.svg?v=1"', source)
        # в рекомендациях серверная картинка приоритетнее манифеста и заглушки
        self.assertIn("image_url", source)
        self.assertTrue((ROOT / "webapp2/assets/food/drink-cup.svg").is_file())
        self.assertTrue(PLACEHOLDER.is_file())
        placeholder = PLACEHOLDER.read_text(encoding="utf-8")
        self.assertIn("<svg", placeholder)
        self.assertIn('aria-label="Приём пищи"', placeholder)

    def test_food_refresh_is_server_directed_bounded_and_visibility_aware(self):
        source = BUNDLE.read_text(encoding="utf-8")
        self.assertIn("l.foodSection?.refreshing", source)
        self.assertIn("current.attempts >= 30", source)
        self.assertIn("l.foodSection?.retry_after_ms", source)
        self.assertIn("document.visibilityState", source)
        self.assertIn("Math.max(5e3", source)

    def test_generated_food_images_refresh_without_polling_heavy_payloads(self):
        source = BUNDLE.read_text(encoding="utf-8")
        self.assertIn('"/api/food-assets/revision"', source)
        self.assertIn("attempts >= 30", source)
        self.assertIn("6e4 + Math.floor(Math.random() * 2e4)", source)
        self.assertIn('await s("foodSection", "diary")', source)
        self.assertIn("document.visibilityState ===", source)
        self.assertIn("asset_revision", source)


if __name__ == "__main__":
    unittest.main()
