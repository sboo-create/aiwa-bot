#!/usr/bin/env python3
"""Promote visually approved WebP files into immutable static catalogs."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]


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


def promote(kind: str, manifest_path: Path) -> dict[str, int]:
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
    destination.mkdir(parents=True, exist_ok=True)
    manifest_file = asset_root / "manifest.json"
    catalog = json.loads(manifest_file.read_text(encoding="utf-8"))
    source_dir = manifest_path.resolve().parent
    promoted = skipped_existing = rejected = 0
    for row in payload.get("assets") or []:
        if not isinstance(row, dict):
            continue
        if row.get("visual_review_status") != "approved":
            rejected += 1
            continue
        label = " ".join(str(row.get("label") or "").split())
        if not label:
            raise ValueError("media_promote_label")
        if label in catalog:
            skipped_existing += 1
            continue
        content_hash = str(row.get("content_hash") or "")
        filename = str(row.get("filename") or "")
        source = _verified_source(source_dir, filename, content_hash)
        target = destination / filename
        if target.exists():
            _verified_source(destination, filename, content_hash)
        else:
            shutil.copyfile(source, target)
        catalog[label] = (
            f"/assets/{'food' if kind == 'food' else 'train'}"
            f"/catalog-v2/{filename}"
        )
        promoted += 1

    ordered = dict(sorted(catalog.items(), key=lambda item: item[0].casefold()))
    _atomic_json(manifest_file, ordered)
    return {
        "promoted": promoted,
        "skipped_existing": skipped_existing,
        "rejected": rejected,
        "catalog_total": len(ordered),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--kind", choices=("food", "sport"), required=True)
    parser.add_argument("--manifest", type=Path, required=True)
    args = parser.parse_args()
    print(json.dumps(
        promote(args.kind, args.manifest),
        ensure_ascii=False,
    ))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
