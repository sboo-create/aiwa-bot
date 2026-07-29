import hashlib
import io
import json
import os
import tempfile
import unittest
from pathlib import Path
from unittest import mock

from PIL import Image

import sport_assets
from scripts import backfill_media_assets as backfill
from scripts import catalog_seed_labels as seeds
from scripts import media_review_queue as review_queue
from scripts import promote_media_catalog as promote
from scripts import select_media_catalog as select_catalog


class MediaCatalogSeedTests(unittest.TestCase):
    def test_seed_taxonomies_cover_requested_batch(self):
        food = seeds.food_seed_labels()
        sport = seeds.sport_seed_labels()
        self.assertGreaterEqual(len(food), 500)
        self.assertGreaterEqual(len(sport), 200)
        self.assertEqual(len(food), len({seeds._normal(x) for x in food}))
        self.assertEqual(len(sport), len({seeds._normal(x) for x in sport}))
        self.assertIn("Падел", sport)
        self.assertIn("Пилатес на реформере", sport)
        self.assertIn("Караси", " ".join(food))

    def test_production_food_is_prioritized_then_curated_to_500(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "production.json"
            path.write_text(json.dumps({
                "schema": "aiwa-food-backfill-labels-v1",
                "labels": [
                    {
                        "label": "Редкое production-блюдо",
                        "canonical_id": "food:production",
                        "frequency": 17,
                    }
                ],
            }, ensure_ascii=False), encoding="utf-8")
            rows = seeds._food_rows(path, 500)
        self.assertEqual(len(rows), 500)
        self.assertEqual(rows[0]["label"], "Редкое production-блюдо")
        self.assertEqual(rows[0]["origin"], "production_aggregate")
        self.assertEqual(rows[-1]["origin"], "curated_taxonomy")


class SportAssetTests(unittest.TestCase):
    def test_generated_sport_is_immutable_validated_webp(self):
        raw = io.BytesIO()
        Image.new("RGB", (640, 640), "orange").save(raw, "PNG")
        with tempfile.TemporaryDirectory() as directory, mock.patch.dict(
            os.environ,
            {
                "AIWA_SPORT_ASSET_DIR": directory,
                "AIWA_SPORT_ASSET_PUBLIC_BASE": "/generated-sport",
            },
            clear=False,
        ), mock.patch.object(
            sport_assets, "_literal_sport_description",
            return_value="padel player with padel racket",
        ), mock.patch.object(
            sport_assets, "_image_request", return_value=raw.getvalue()
        ), mock.patch.object(
            sport_assets, "_validate_generated_image", return_value=0.93
        ):
            result = sport_assets.generate_and_store("Падел")
            path = Path(directory) / Path(result["image_url"]).name
            self.assertTrue(path.is_file())
            self.assertEqual(
                hashlib.sha256(path.read_bytes()).hexdigest(),
                result["content_hash"],
            )
            with Image.open(path) as image:
                self.assertEqual(image.format, "WEBP")
                self.assertEqual(image.size, (512, 512))


class ResumableBackfillTests(unittest.TestCase):
    def test_generate_resumes_verified_asset(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            input_path = root / "input.json"
            output_dir = root / "output"
            output_dir.mkdir()
            image = output_dir / ("a" * 64 + ".webp")
            Image.new("RGB", (512, 512), "orange").save(image, "WEBP")
            content_hash = hashlib.sha256(image.read_bytes()).hexdigest()
            correct = output_dir / f"{content_hash}.webp"
            image.replace(correct)
            row = {
                "label": "Падел",
                "canonical_id": sport_assets.canonical_id("Падел"),
                "frequency": 0,
                "origin": "curated_taxonomy",
            }
            input_path.write_text(json.dumps({
                "schema": "aiwa-sport-backfill-labels-v1",
                "labels": [row],
            }, ensure_ascii=False), encoding="utf-8")
            (output_dir / "backfill-manifest.json").write_text(json.dumps({
                "schema": "aiwa-sport-backfill-assets-v1",
                "assets": [{
                    **row,
                    "filename": correct.name,
                    "content_hash": content_hash,
                    "status": "ready",
                }],
            }, ensure_ascii=False), encoding="utf-8")
            with mock.patch.object(
                sport_assets, "generate_and_store"
            ) as generate:
                failed = backfill.generate(
                    "sport", input_path, output_dir, workers=2, attempts=1
                )
        self.assertEqual(failed, 0)
        generate.assert_not_called()


class VisualReviewQueueTests(unittest.TestCase):
    def test_queue_requires_complete_decisions_before_promotion(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            manifest = root / "reviewed.json"
            image = root / "asset.webp"
            Image.new("RGB", (512, 512), "orange").save(image, "WEBP")
            payload = {
                "schema": "aiwa-sport-backfill-assets-v1",
                "review_status": "complete",
                "assets": [{
                    "label": "Падел",
                    "canonical_id": sport_assets.canonical_id("Падел"),
                    "content_hash": "content",
                    "filename": image.name,
                    "review_status": "approved",
                    "review_score": 0.94,
                }],
            }
            manifest.write_text(
                json.dumps(payload, ensure_ascii=False),
                encoding="utf-8",
            )
            queue = root / "queue.html"
            self.assertEqual(review_queue.build_queue(manifest, queue), 1)
            self.assertIn("Падел", queue.read_text(encoding="utf-8"))
            decisions = root / "decisions.json"
            decisions.write_text(json.dumps({
                "schema": "aiwa-media-visual-decisions-v1",
                "source_manifest_sha256": hashlib.sha256(
                    manifest.read_bytes()
                ).hexdigest(),
                "decisions": [],
            }), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "incomplete"):
                review_queue.apply_decisions(
                    manifest, decisions, root / "final.json"
                )

    def test_promotion_rejects_manifest_without_visual_review(self):
        with tempfile.TemporaryDirectory() as directory:
            manifest = Path(directory) / "reviewed.json"
            manifest.write_text(json.dumps({
                "schema": "aiwa-food-backfill-assets-v1",
                "review_status": "complete",
                "assets": [],
            }), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "visual_review"):
                promote.promote("food", manifest)


class SelectionTests(unittest.TestCase):
    def test_selects_reviewed_unique_assets(self):
        with tempfile.TemporaryDirectory() as temporary:
            directory = Path(temporary)
            source = directory / "source"
            output = directory / "selected"
            source.mkdir()
            assets = []
            for index, label in enumerate(("Новый суп", "Новое блюдо")):
                image = Image.new("RGB", (512, 512), (index * 50, 30, 20))
                buffer = io.BytesIO()
                image.save(buffer, format="WEBP")
                raw = buffer.getvalue()
                content_hash = hashlib.sha256(raw).hexdigest()
                filename = f"{content_hash}.webp"
                (source / filename).write_bytes(raw)
                assets.append({
                    "label": label,
                    "canonical_id": f"food:{index}",
                    "content_hash": content_hash,
                    "filename": filename,
                    "review_status": "approved",
                })
            manifest = source / "reviewed-manifest.json"
            manifest.write_text(json.dumps({
                "schema": "aiwa-food-backfill-assets-v1",
                "review_status": "complete",
                "assets": assets,
            }), encoding="utf-8")
            with mock.patch.object(
                select_catalog, "_existing_labels", return_value=set()
            ):
                result = select_catalog.select_catalog(
                    "food", [manifest], output, 2
                )
            self.assertEqual(result["ready"], 2)
            self.assertEqual(len(list(output.glob("*.webp"))), 2)

    def test_refuses_insufficient_candidates(self):
        with tempfile.TemporaryDirectory() as temporary:
            directory = Path(temporary)
            manifest = directory / "reviewed-manifest.json"
            manifest.write_text(json.dumps({
                "schema": "aiwa-sport-backfill-assets-v1",
                "review_status": "complete",
                "assets": [],
            }), encoding="utf-8")
            with self.assertRaisesRegex(
                ValueError, "media_select_insufficient"
            ):
                select_catalog.select_catalog(
                    "sport", [manifest], directory / "output", 1
                )

    def test_visual_selection_requires_approved_rows(self):
        with tempfile.TemporaryDirectory() as temporary:
            directory = Path(temporary)
            manifest = directory / "reviewed-manifest.json"
            manifest.write_text(json.dumps({
                "schema": "aiwa-sport-backfill-assets-v1",
                "review_status": "complete",
                "visual_review_status": "complete",
                "assets": [{
                    "label": "Падел",
                    "review_status": "approved",
                    "visual_review_status": "rejected",
                }],
            }), encoding="utf-8")
            with mock.patch.object(
                select_catalog, "_existing_labels", return_value=set()
            ), self.assertRaisesRegex(
                ValueError, "media_select_insufficient"
            ):
                select_catalog.select_catalog(
                    "sport",
                    [manifest],
                    directory / "output",
                    1,
                    require_visual=True,
                )


if __name__ == "__main__":
    unittest.main()
