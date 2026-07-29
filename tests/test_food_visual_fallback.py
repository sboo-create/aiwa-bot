import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BUNDLE = ROOT / "webapp2/assets/deslop/deslop-main-aiwa-v163.js"
PLACEHOLDER = ROOT / "webapp2/assets/food/meal-placeholder.svg"


class FoodVisualFallbackTests(unittest.TestCase):
    def test_unknown_meal_is_neutral_and_drink_has_its_own_asset(self):
        source = BUNDLE.read_text(encoding="utf-8")
        self.assertIn('cj = "/assets/food/meal-placeholder.svg"', source)
        self.assertIn('uA = "/assets/food/meal-placeholder.svg"', source)
        self.assertIn('zd(a?.fclass) === "напиток"', source)
        self.assertIn('"/assets/food/drink-cup.svg?v=1"', source)
        self.assertIn(
            "image: rt.image_url || av(p, rt.title) || foodFallbackImage(rt) || cj",
            source,
        )
        self.assertIn(
            "image: rt.meal.image_url || rt.meal.image || av(p, rt.meal.dish) || uA",
            source,
        )
        self.assertTrue((ROOT / "webapp2/assets/food/drink-cup.svg").is_file())
        self.assertTrue(PLACEHOLDER.is_file())
        placeholder = PLACEHOLDER.read_text(encoding="utf-8")
        self.assertIn("<svg", placeholder)
        self.assertIn('aria-label="Приём пищи"', placeholder)

    def test_food_refresh_is_server_directed_bounded_and_visibility_aware(self):
        source = BUNDLE.read_text(encoding="utf-8")
        self.assertIn("l.foodSection?.refreshing", source)
        self.assertIn("et.current >= 3", source)
        self.assertIn("l.foodSection?.retry_after_ms", source)
        self.assertIn('document.visibilityState !== "visible"', source)
        self.assertIn("Math.max(5e3", source)

    def test_generated_food_images_refresh_without_polling_heavy_payloads(self):
        source = BUNDLE.read_text(encoding="utf-8")
        self.assertIn('qt("/api/food-assets/revision", {})', source)
        self.assertIn("aiwaAssetPoll.current.attempts >= 30", source)
        self.assertIn("6e4 + Math.floor(Math.random() * 2e4)", source)
        self.assertIn('await s("foodSection", "diary")', source)
        self.assertIn("document.visibilityState ===", source)
        self.assertIn("aiwaPayloadAssetRevision = Math.max", source)


if __name__ == "__main__":
    unittest.main()
