import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BUNDLE = ROOT / "webapp2/assets/deslop/deslop-main-aiwa-v162.js"


class FoodVisualFallbackTests(unittest.TestCase):
    def test_unknown_meal_is_neutral_and_drink_has_its_own_asset(self):
        source = BUNDLE.read_text(encoding="utf-8")
        self.assertIn('cj = "/assets/paper-food-placeholder.png"', source)
        self.assertIn('zd(a?.fclass) === "напиток"', source)
        self.assertIn('"/assets/food/drink-cup.svg?v=1"', source)
        self.assertIn("image: av(p, rt.title) || foodFallbackImage(rt) || cj", source)
        self.assertTrue((ROOT / "webapp2/assets/food/drink-cup.svg").is_file())


if __name__ == "__main__":
    unittest.main()
