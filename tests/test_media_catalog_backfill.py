import hashlib
import io
import json
import os
import tempfile
import unittest
from pathlib import Path
from unittest import mock

from PIL import Image, ImageDraw

import food_assets
import sport_assets
from scripts import backfill_media_assets as backfill
from scripts import catalog_seed_labels as seeds
from scripts import media_review_queue as review_queue
from scripts import promote_media_catalog as promote
from scripts import rekey_media_manifest as rekey_manifest
from scripts import select_media_catalog as select_catalog


def _write_webp(directory: Path, color: object = "orange") -> tuple[str, str]:
    buffer = io.BytesIO()
    Image.new("RGB", (512, 512), color).save(buffer, format="WEBP")
    raw = buffer.getvalue()
    content_hash = hashlib.sha256(raw).hexdigest()
    filename = f"{content_hash}.webp"
    (directory / filename).write_bytes(raw)
    return content_hash, filename


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
            root = Path(directory)
            manifest = root / "webapp2/assets/food/manifest.json"
            manifest.parent.mkdir(parents=True)
            manifest.write_text(json.dumps({
                "Уже в каталоге": "/assets/food/already.webp",
            }, ensure_ascii=False), encoding="utf-8")
            path = root / "production.json"
            path.write_text(json.dumps({
                "schema": "aiwa-food-backfill-labels-v1",
                "labels": [
                    {
                        "label": "Уже в каталоге",
                        "canonical_id": "food:already",
                        "frequency": 100,
                    },
                    {
                        "label": "Редкое production-блюдо",
                        "canonical_id": "food:production",
                        "frequency": 17,
                    }
                ],
            }, ensure_ascii=False), encoding="utf-8")
            with mock.patch.object(seeds, "ROOT", root):
                rows = seeds._food_rows(path, 500)
        self.assertEqual(len(rows), 500)
        self.assertEqual(rows[0]["label"], "Редкое production-блюдо")
        self.assertEqual(
            rows[0]["canonical_id"],
            food_assets.canonical_id("Редкое production-блюдо"),
        )
        self.assertEqual(rows[0]["origin"], "production_aggregate")
        self.assertEqual(rows[-1]["origin"], "curated_taxonomy")
        self.assertNotIn("Уже в каталоге", {row["label"] for row in rows})


class StaticCatalogReleaseTests(unittest.TestCase):
    def test_all_catalog_v2_assets_are_content_addressed_bounded_webp(self):
        root = Path(__file__).resolve().parents[1] / "webapp2"
        hashes: set[str] = set()
        expected = {"food": 507, "train": 216}

        for kind, expected_count in expected.items():
            manifest = json.loads(
                (root / "assets" / kind / "manifest.json").read_text(
                    encoding="utf-8"
                )
            )
            catalog = [
                (label, url)
                for label, url in manifest.items()
                if "/catalog-v2/" in url
            ]
            self.assertEqual(len(catalog), expected_count)
            for label, url in catalog:
                with self.subTest(kind=kind, label=label):
                    path = root / url.removeprefix("/")
                    raw = path.read_bytes()
                    digest = hashlib.sha256(raw).hexdigest()
                    self.assertEqual(path.stem, digest)
                    self.assertNotIn(digest, hashes)
                    hashes.add(digest)
                    self.assertLessEqual(len(raw), 512 * 1024)
                    with Image.open(path) as image:
                        self.assertEqual(image.format, "WEBP")
                        self.assertEqual(image.size, (512, 512))
                        self.assertFalse(image.getexif())


class SportAssetTests(unittest.TestCase):
    def test_generated_sport_is_immutable_validated_webp(self):
        raw = io.BytesIO()
        # White field with the subject inside it: catalog art must arrive
        # without its own backdrop, so a flat-orange frame is now rejected.
        fixture = Image.new("RGB", (640, 640), "white")
        ImageDraw.Draw(fixture).ellipse((160, 160, 480, 480), fill="orange")
        fixture.save(raw, "PNG")
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
            ) as generate, mock.patch.object(
                sport_assets, "validation_enabled", return_value=True
            ):
                failed = backfill.generate(
                    "sport", input_path, output_dir, workers=2, attempts=1
                )
        self.assertEqual(failed, 0)
        generate.assert_not_called()

    def test_duplicate_input_canonical_id_fails_before_generation(self):
        row = {
            "label": "Падел",
            "canonical_id": sport_assets.canonical_id("Падел"),
        }
        with self.assertRaisesRegex(ValueError, "canonical_id"):
            backfill._validated_rows("sport", [row, row])

    def test_generation_requires_semantic_validation(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            input_path = root / "input.json"
            input_path.write_text(json.dumps({
                "schema": "aiwa-sport-backfill-labels-v1",
                "labels": [{
                    "label": "Падел",
                    "canonical_id": sport_assets.canonical_id("Падел"),
                }],
            }), encoding="utf-8")
            with mock.patch.object(
                sport_assets, "validation_enabled", return_value=False
            ), self.assertRaisesRegex(ValueError, "validation_required"):
                backfill.generate(
                    "sport", input_path, root / "output", 1, 1
                )

    def test_generation_rejects_stale_resume_rows(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            output = root / "output"
            output.mkdir()
            label = "Падел"
            input_path = root / "input.json"
            input_path.write_text(json.dumps({
                "schema": "aiwa-sport-backfill-labels-v1",
                "labels": [{
                    "label": label,
                    "canonical_id": sport_assets.canonical_id(label),
                }],
            }), encoding="utf-8")
            stale_label = "Теннис"
            (output / "backfill-manifest.json").write_text(json.dumps({
                "schema": "aiwa-sport-backfill-assets-v1",
                "assets": [{
                    "label": stale_label,
                    "canonical_id": sport_assets.canonical_id(stale_label),
                    "status": "failed",
                }],
            }), encoding="utf-8")
            with mock.patch.object(
                sport_assets, "validation_enabled", return_value=True
            ), self.assertRaisesRegex(ValueError, "resume_input"):
                backfill.generate(
                    "sport", input_path, output, 1, 1
                )

    def test_review_missing_ready_asset_never_repairs(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            manifest = root / "backfill-manifest.json"
            manifest.write_text(json.dumps({
                "schema": "aiwa-sport-backfill-assets-v1",
                "assets": [{
                    "label": "Падел",
                    "canonical_id": sport_assets.canonical_id("Падел"),
                    "status": "ready",
                    "content_hash": "a" * 64,
                    "filename": f"{'a' * 64}.webp",
                    "literal_description": "Падел на закрытом корте",
                }],
            }), encoding="utf-8")
            with mock.patch.object(
                sport_assets, "validation_enabled", return_value=True
            ), mock.patch.object(
                sport_assets, "generate_and_store"
            ) as generate, self.assertRaises(FileNotFoundError):
                backfill.review(
                    "sport",
                    manifest,
                    root / "reviewed-manifest.json",
                    1,
                    2,
                )
            generate.assert_not_called()

    def test_review_rejects_ready_row_without_literal_description(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            content_hash, filename = _write_webp(root)
            manifest = root / "backfill-manifest.json"
            manifest.write_text(json.dumps({
                "schema": "aiwa-sport-backfill-assets-v1",
                "assets": [{
                    "label": "Падел",
                    "canonical_id": sport_assets.canonical_id("Падел"),
                    "status": "ready",
                    "content_hash": content_hash,
                    "filename": filename,
                }],
            }), encoding="utf-8")
            with mock.patch.object(
                sport_assets, "validation_enabled", return_value=True
            ), mock.patch.object(
                sport_assets, "generate_and_store"
            ) as generate, self.assertRaisesRegex(
                ValueError, "manifest_description"
            ):
                backfill.review(
                    "sport",
                    manifest,
                    root / "reviewed-manifest.json",
                    1,
                    2,
                )
            generate.assert_not_called()

    def test_review_worker_rejects_missing_literal_description(self):
        row = {
            "label": "Падел",
            "canonical_id": sport_assets.canonical_id("Падел"),
            "status": "ready",
            "content_hash": "a" * 64,
            "filename": f"{'a' * 64}.webp",
        }
        with mock.patch.object(
            sport_assets, "generate_and_store"
        ) as generate, self.assertRaisesRegex(
            ValueError, "manifest_description"
        ):
            backfill._review_one("sport", row, 2)
        generate.assert_not_called()


class VisualReviewQueueTests(unittest.TestCase):
    def test_queue_requires_complete_decisions_before_promotion(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            manifest = root / "reviewed.json"
            content_hash, filename = _write_webp(root)
            payload = {
                "schema": "aiwa-sport-backfill-assets-v1",
                "review_status": "complete",
                "assets": [{
                    "label": "Падел",
                    "canonical_id": sport_assets.canonical_id("Падел"),
                    "content_hash": content_hash,
                    "filename": filename,
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

    def test_apply_decisions_sanitizes_note_and_rejects_in_place(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            content_hash, filename = _write_webp(root)
            manifest = root / "reviewed.json"
            manifest.write_text(json.dumps({
                "schema": "aiwa-sport-backfill-assets-v1",
                "review_status": "complete",
                "assets": [{
                    "label": "Падел",
                    "canonical_id": sport_assets.canonical_id("Падел"),
                    "content_hash": content_hash,
                    "filename": filename,
                    "review_status": "approved",
                }],
            }), encoding="utf-8")
            decisions = root / "decisions.json"
            decisions.write_text(json.dumps({
                "schema": "aiwa-media-visual-decisions-v1",
                "source_manifest_sha256": hashlib.sha256(
                    manifest.read_bytes()
                ).hexdigest(),
                "decisions": [{
                    "canonical_id": sport_assets.canonical_id("Падел"),
                    "content_hash": content_hash,
                    "decision": "approved",
                    "note": "  хорошо\u0001   проверено ",
                }],
            }), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "output_manifest"):
                review_queue.apply_decisions(
                    manifest, decisions, manifest
                )
            output = root / "visual.json"
            self.assertEqual(
                review_queue.apply_decisions(
                    manifest, decisions, output
                ),
                (1, 0),
            )
            payload = json.loads(output.read_text(encoding="utf-8"))
            self.assertEqual(
                payload["assets"][0]["visual_review_note"],
                "хорошо проверено",
            )

    def test_apply_decisions_rejects_duplicate_rows(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            content_hash, filename = _write_webp(root)
            canonical_id = sport_assets.canonical_id("Падел")
            manifest = root / "reviewed.json"
            manifest.write_text(json.dumps({
                "schema": "aiwa-sport-backfill-assets-v1",
                "review_status": "complete",
                "assets": [{
                    "label": "Падел",
                    "canonical_id": canonical_id,
                    "content_hash": content_hash,
                    "filename": filename,
                    "review_status": "approved",
                }],
            }), encoding="utf-8")
            decision = {
                "canonical_id": canonical_id,
                "content_hash": content_hash,
                "decision": "approved",
            }
            decisions = root / "decisions.json"
            decisions.write_text(json.dumps({
                "schema": "aiwa-media-visual-decisions-v1",
                "source_manifest_sha256": hashlib.sha256(
                    manifest.read_bytes()
                ).hexdigest(),
                "decisions": [decision, decision],
            }), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "decision_identity"):
                review_queue.apply_decisions(
                    manifest, decisions, root / "output.json"
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
                content_hash, filename = _write_webp(
                    source, (index * 50, 30, 20)
                )
                assets.append({
                    "label": label,
                    "canonical_id": food_assets.canonical_id(label),
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


class RekeyManifestTests(unittest.TestCase):
    def test_rekeys_legacy_manifest_without_touching_asset_hash(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            source = root / "legacy.json"
            output = root / "rekeyed.json"
            source.write_text(json.dumps({
                "schema": "aiwa-sport-backfill-assets-v1",
                "assets": [{
                    "label": "Аштанга-йога",
                    "canonical_id": "sport:legacy",
                    "content_hash": "a" * 64,
                }],
            }), encoding="utf-8")
            self.assertEqual(
                rekey_manifest.rekey("sport", source, output),
                1,
            )
            payload = json.loads(output.read_text(encoding="utf-8"))
            self.assertEqual(
                payload["assets"][0]["canonical_id"],
                sport_assets.canonical_id("Аштанга-йога"),
            )
            self.assertEqual(payload["assets"][0]["content_hash"], "a" * 64)


class PromotionTests(unittest.TestCase):
    def test_promotion_preserves_existing_and_writes_catalog_path(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            asset_root = root / "webapp2/assets/train"
            asset_root.mkdir(parents=True)
            (asset_root / "manifest.json").write_text(json.dumps({
                "Падел": "/assets/train/padel.png",
            }), encoding="utf-8")
            release = root / "release"
            release.mkdir()
            content_hash, filename = _write_webp(release)
            label = "Теннис"
            manifest = release / "selected-manifest.json"
            manifest.write_text(json.dumps({
                "schema": "aiwa-sport-backfill-assets-v1",
                "review_status": "complete",
                "visual_review_status": "complete",
                "assets": [{
                    "label": label,
                    "canonical_id": sport_assets.canonical_id(label),
                    "content_hash": content_hash,
                    "filename": filename,
                    "visual_review_status": "approved",
                }],
            }), encoding="utf-8")
            with mock.patch.object(promote, "ROOT", root):
                dry = promote.promote("sport", manifest, dry_run=True)
                self.assertEqual(dry["promoted"], 1)
                self.assertFalse((asset_root / "catalog-v2").exists())
                result = promote.promote("sport", manifest)
            self.assertEqual(result["promoted"], 1)
            catalog = json.loads(
                (asset_root / "manifest.json").read_text(encoding="utf-8")
            )
            self.assertEqual(catalog["Падел"], "/assets/train/padel.png")
            self.assertEqual(
                catalog[label],
                f"/assets/train/catalog-v2/{filename}",
            )

    def test_promotion_skips_normalized_existing_label(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            asset_root = root / "webapp2/assets/food"
            asset_root.mkdir(parents=True)
            (asset_root / "manifest.json").write_text(json.dumps({
                "Плов с курицей": "/assets/food/plov.png",
            }), encoding="utf-8")
            release = root / "release"
            release.mkdir()
            content_hash, filename = _write_webp(release)
            label = "плов с курицей"
            manifest = release / "selected-manifest.json"
            manifest.write_text(json.dumps({
                "schema": "aiwa-food-backfill-assets-v1",
                "review_status": "complete",
                "visual_review_status": "complete",
                "assets": [{
                    "label": label,
                    "canonical_id": food_assets.canonical_id(label),
                    "content_hash": content_hash,
                    "filename": filename,
                    "visual_review_status": "approved",
                }],
            }), encoding="utf-8")
            with mock.patch.object(promote, "ROOT", root):
                result = promote.promote("food", manifest)
            self.assertEqual(result["promoted"], 0)
            self.assertEqual(result["skipped_existing"], 1)


if __name__ == "__main__":
    unittest.main()
