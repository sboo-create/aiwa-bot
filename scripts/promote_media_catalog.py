#!/usr/bin/env python3
"""Promote visually approved WebP files into immutable static catalogs."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import food_assets
import sport_assets


def _atomic_json(path: Path, payload: dict) -> None:
    temporary = path.with_name(f".{path.name}.{os.getpid()}.tmp")
    temporary.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    os.replace(temporary, path)


def _verified_source(
    directory: Path, filename: str, expected_hash: str,
) -> Path:
    if filename != f"{expected_hash}.webp":
        raise ValueError("media_promote_filename")
    path = (directory / filename).resolve()
    if path.parent != directory.resolve():
        raise ValueError("media_promote_directory")
    raw = path.read_bytes()
    if not raw or len(raw) > 512 * 1024:
        raise ValueError("media_promote_size")
    if hashlib.sha256(raw).hexdigest() != expected_hash:
        raise ValueError("media_promote_hash")
    with Image.open(path) as image:
        image.load()
        if image.format != "WEBP" or image.size != (512, 512):
            raise ValueError("media_promote_format")
    return path


def promote(
    kind: str, manifest_path: Path, dry_run: bool = False,
    replace: bool = False, drop_missing: bool = False,
) -> dict[str, int]:
    """Перенести проверенный прогон в статический каталог.

    `replace` нужен для полной перегенерации: обычный режим только дополняет
    каталог и пропускает уже известные блюда, а при смене модели или стиля
    заменить надо всё. `drop_missing` убирает из манифеста то, что прогон не
    дал: у такого блюда останется честная заглушка вместо картинки чужой
    манеры.
    """
    payload = json.loads(manifest_path.read_text(encoding="utf-8"))
    expected_schema = f"aiwa-{kind}-backfill-assets-v1"
    if payload.get("schema") != expected_schema:
        raise ValueError("media_promote_schema")
    if payload.get("review_status") != "complete":
        raise ValueError("media_promote_automatic_review")
    if payload.get("visual_review_status") != "complete":
        raise ValueError("media_promote_visual_review")

    asset_root = ROOT / "webapp2/assets" / (
        "food" if kind == "food" else "train"
    )
    destination = asset_root / "catalog-v2"
    manifest_file = asset_root / "manifest.json"
    catalog = json.loads(manifest_file.read_text(encoding="utf-8"))
    if not isinstance(catalog, dict):
        raise ValueError("media_promote_static_manifest")
    assets = food_assets if kind == "food" else sport_assets
    existing_labels = {
        assets.normalize_label(label) for label in catalog
    }
    source_dir = manifest_path.resolve().parent
    promoted = skipped_existing = rejected = 0
    planned: list[tuple[Path, Path, str, str]] = []
    for row in payload.get("assets") or []:
        if not isinstance(row, dict):
            raise ValueError("media_promote_row")
        if row.get("visual_review_status") != "approved":
            rejected += 1
            continue
        label = assets.reviewed_generation_label(row.get("label"))
        if not label:
            raise ValueError("media_promote_label")
        canonical_id = str(row.get("canonical_id") or "")
        if (
            canonical_id != assets.canonical_id(label)
            or not canonical_id.startswith(f"{kind}:")
        ):
            raise ValueError("media_promote_canonical_id")
        normalized_label = assets.normalize_label(label)
        if normalized_label in existing_labels and not replace:
            skipped_existing += 1
            continue
        existing_labels.add(normalized_label)
        content_hash = str(row.get("content_hash") or "")
        filename = str(row.get("filename") or "")
        source = _verified_source(source_dir, filename, content_hash)
        target = destination / filename
        if target.exists():
            _verified_source(destination, filename, content_hash)
        planned.append((source, target, label, filename))
        catalog[label] = (
            f"/assets/{'food' if kind == 'food' else 'train'}"
            f"/catalog-v2/{filename}"
        )
        promoted += 1

    if drop_missing:
        promoted_labels = {label for _, _, label, _ in planned}
        dropped_labels = [l for l in catalog if l not in promoted_labels]
        for label in dropped_labels:
            del catalog[label]
    else:
        dropped_labels = []
    ordered = dict(sorted(catalog.items(), key=lambda item: item[0].casefold()))
    result = {
        "promoted": promoted,
        "skipped_existing": skipped_existing,
        "rejected": rejected,
        "dropped": len(dropped_labels),
        "catalog_total": len(ordered),
        "dry_run": int(dry_run),
    }
    if dry_run or (promoted == 0 and not dropped_labels):
        return result

    destination.mkdir(parents=True, exist_ok=True)
    created: list[Path] = []
    temporaries: list[Path] = []
    try:
        for source, target, _, _ in planned:
            if target.exists():
                _verified_source(
                    destination, target.name, target.stem
                )
                continue
            temporary = target.with_name(
                f".{target.name}.{os.getpid()}.tmp"
            )
            temporaries.append(temporary)
            shutil.copyfile(source, temporary)
            os.replace(temporary, target)
            temporaries.remove(temporary)
            created.append(target)
        _atomic_json(manifest_file, ordered)
    except Exception:
        for temporary in temporaries:
            temporary.unlink(missing_ok=True)
        for target in created:
            target.unlink(missing_ok=True)
        raise
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--kind", choices=("food", "sport"), required=True)
    parser.add_argument("--manifest", type=Path, required=True)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--replace", action="store_true",
                        help="заменять уже известные блюда (полная перегенерация)")
    parser.add_argument("--drop-missing", action="store_true",
                        help="убрать из каталога то, чего нет в прогоне")
    args = parser.parse_args()
    print(json.dumps(
        promote(args.kind, args.manifest, args.dry_run,
                args.replace, args.drop_missing),
        ensure_ascii=False,
    ))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
