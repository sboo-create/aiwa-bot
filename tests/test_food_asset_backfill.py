import tempfile
import unittest
from pathlib import Path
from unittest import mock

from PIL import Image

import food_assets as assets
from scripts import backfill_food_assets as backfill


class FoodAssetBackfillTests(unittest.TestCase):
    def test_review_failure_is_repaired_and_reviewed_again(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            image_path = root / "first.webp"
            Image.new("RGB", (512, 512), "orange").save(image_path, "WEBP")
            replacement_path = root / "replacement.webp"
            Image.new("RGB", (512, 512), "white").save(
                replacement_path, "WEBP"
            )
            row = {
                "label": "Караси жареные",
                "canonical_id": assets.canonical_id("Караси жареные"),
                "frequency": 1,
                "filename": image_path.name,
                "image_url": f"/generated-food/{image_path.name}",
                "literal_description": "whole fried crucian carp fish",
                "content_hash": "first",
            }
            replacement = {
                "image_url": f"/generated-food/{replacement_path.name}",
                "content_hash": "replacement",
                "canonical_label": row["label"],
                "literal_description": row["literal_description"],
                "prompt_version": assets.GENERATED_PROMPT_VERSION,
                "validation_score": 0.91,
            }
            with (
                mock.patch.object(
                    assets, "generated_asset_dir", return_value=root
                ),
                mock.patch.object(
                    assets,
                    "_validate_generated_image",
                    side_effect=[
                        assets.FoodImageValidationError("wrong preparation"),
                        0.94,
                    ],
                ) as validate,
                mock.patch.object(
                    assets, "generate_and_store", return_value=replacement
                ) as generate,
            ):
                result = backfill._review_one(row, repair_attempts=2)

            self.assertEqual(result["review_status"], "approved")
            self.assertEqual(result["review_repairs"], 1)
            self.assertEqual(result["filename"], replacement_path.name)
            self.assertEqual(validate.call_count, 2)
            generate.assert_called_once_with(row["label"], attempt=4)

    def test_generation_failure_also_enters_review_repair_queue(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            replacement_path = root / "replacement.webp"
            Image.new("RGB", (512, 512), "white").save(
                replacement_path, "WEBP"
            )
            row = {
                "label": "Омлет из двух яиц",
                "canonical_id": assets.canonical_id("Омлет из двух яиц"),
                "frequency": 2,
                "status": "failed",
                "errors": ["FoodImageValidationError"] * 3,
            }
            replacement = {
                "image_url": f"/generated-food/{replacement_path.name}",
                "content_hash": "replacement",
                "canonical_label": row["label"],
                "literal_description": "two egg omelette",
                "prompt_version": assets.GENERATED_PROMPT_VERSION,
                "validation_score": 0.92,
            }
            with (
                mock.patch.object(
                    assets, "generated_asset_dir", return_value=root
                ),
                mock.patch.object(
                    assets, "_validate_generated_image", return_value=0.95
                ),
                mock.patch.object(
                    assets, "generate_and_store", return_value=replacement
                ) as generate,
            ):
                result = backfill._review_one(row, repair_attempts=2)

            self.assertEqual(result["review_status"], "approved")
            self.assertEqual(result["review_repairs"], 1)
            generate.assert_called_once_with(row["label"], attempt=4)

    def test_import_requires_completed_review(self):
        with tempfile.TemporaryDirectory() as directory:
            manifest = Path(directory) / "manifest.json"
            manifest.write_text(
                '{"schema":"aiwa-food-backfill-assets-v1",'
                '"review_status":"pending","assets":[]}',
                encoding="utf-8",
            )
            with self.assertRaisesRegex(ValueError, "review_required"):
                backfill.import_manifest(manifest)


if __name__ == "__main__":
    unittest.main()
