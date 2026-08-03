import unittest

from PIL import Image
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
FOOD_SCREEN = ROOT / "frontend/src/aiwa/screens/FoodScreen.jsx"
PLACEHOLDER = ROOT / "webapp2/assets/food/meal-placeholder.webp"
DRINK_PLACEHOLDER = ROOT / "webapp2/assets/food/drink-placeholder.webp"


class FoodVisualFallbackTests(unittest.TestCase):
    def test_unknown_meal_is_neutral_and_drink_has_its_own_asset(self):
        source = BUNDLE.read_text(encoding="utf-8")
        self.assertIn('"/assets/food/meal-placeholder.webp"', source)
        self.assertIn('"напиток"', source)
        # заглушка выбирается по типу приёма: кружка для напитков, тарелка иначе
        self.assertIn('"/assets/food/drink-placeholder.webp"', source)
        # серверная картинка приоритетнее манифеста и заглушки
        self.assertIn("image_url", source)
        # Заглушки — такие же рендеры на белом, как каталог: приложение кладёт
        # их на свою подложку через darken, и контурная svg выбивалась из ряда.
        for asset in (PLACEHOLDER, DRINK_PLACEHOLDER):
            self.assertTrue(asset.is_file(), asset)
            with Image.open(asset) as image:
                image.load()
                self.assertEqual(image.format, "WEBP")
                corner = image.convert("RGB").getpixel((0, 0))
            self.assertTrue(
                all(channel >= 245 for channel in corner),
                f"{asset.name}: фон обязан быть белым, а не {corner}",
            )

    def test_food_refresh_is_server_directed_bounded_and_visibility_aware(self):
        source = FOOD_SCREEN.read_text(encoding="utf-8")
        self.assertIn("Boolean(data.foodSection?.refreshing)", source)
        self.assertIn("menuRetry.current >= 3", source)
        self.assertIn("data.foodSection?.retry_after_ms", source)
        self.assertIn("document.visibilityState", source)
        self.assertIn("Math.max(5000", source)

    def test_generated_food_images_refresh_without_polling_heavy_payloads(self):
        source = FOOD_SCREEN.read_text(encoding="utf-8")
        bundle = BUNDLE.read_text(encoding="utf-8")
        self.assertIn('"/api/food-assets/revision"', source)
        self.assertIn("assetPoll.current.attempts >= 30", source)
        self.assertIn("60000 + Math.floor(Math.random() * 20000)", source)
        self.assertIn('await refresh("foodSection", "diary")', source)
        self.assertIn("document.visibilityState ===", source)
        self.assertIn('"/api/food-assets/revision"', bundle)
        self.assertIn("asset_revision", bundle)


if __name__ == "__main__":
    unittest.main()
