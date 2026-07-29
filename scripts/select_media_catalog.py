#!/usr/bin/env python3
"""Select a deduplicated reviewed media catalog into one review directory."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]


def _normalized(value: object) -> str:
    return " ".join(str(value or "").strip().casefold().replace("ё", "е").split())


def _existing_labels(kind: str) -> set[str]:
    directory = "food" if kind == "food" else "train"
    manifest = ROOT / "webapp2/assets" / directory / "manifest.json"
    if not manifest.exists():
        return set()
    payload = json.loads(manifest.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise ValueError("media_select_static_manifest")
    return {_normalized(label) for label in payload}


def _verified_asset(directory: Path, row: dict) -> Path:
    content_hash = str(row.get("content_hash") or "")
    filename = str(row.get("filename") or "")
    if not content_hash or filename != f"{content_hash}.webp":
        raise ValueError("media_select_filename")
    source = (directory / filename).resolve()
    if source.parent != directory.resolve():
        raise ValueError("media_select_directory")
    raw = source.read_bytes()
    if hashlib.sha256(raw).hexdigest() != content_hash:
        raise ValueError("media_select_hash")
    with Image.open(source) as image:
        image.load()
        if image.format != "WEBP" or image.size != (512, 512):
            raise ValueError("media_select_format")
    return source


def select_catalog(
    kind: str,
    manifest_paths: list[Path],
    output_dir: Path,
    target: int | None,
    require_visual: bool = False,
) -> dict:
    if target is not None and target < 1:
        raise ValueError("media_select_target")
    schema = f"aiwa-{kind}-backfill-assets-v1"
    existing = _existing_labels(kind)
    candidates: list[tuple[dict, Path]] = []
    seen_labels: set[str] = set()
    seen_hashes: set[str] = set()
    reviewed_total = 0
    for manifest_path in manifest_paths:
        payload = json.loads(manifest_path.read_text(encoding="utf-8"))
        if (
            payload.get("schema") != schema
            or payload.get("review_status") != "complete"
        ):
            raise ValueError("media_select_reviewed_manifest")
        if (
            require_visual
            and payload.get("visual_review_status") != "complete"
        ):
            raise ValueError("media_select_visual_reviewed_manifest")
        for row in payload.get("assets") or []:
            if (
                not isinstance(row, dict)
                or row.get("review_status") != "approved"
                or (
                    require_visual
                    and row.get("visual_review_status") != "approved"
                )
            ):
                continue
            reviewed_total += 1
            label_key = _normalized(row.get("label"))
            content_hash = str(row.get("content_hash") or "")
            if (
                not label_key
                or label_key in existing
                or label_key in seen_labels
                or content_hash in seen_hashes
            ):
                continue
            source = _verified_asset(manifest_path.resolve().parent, row)
            candidates.append((dict(row), source))
            seen_labels.add(label_key)
            seen_hashes.add(content_hash)
    if target is not None and len(candidates) < target:
        raise ValueError(
            f"media_select_insufficient:{len(candidates)}/{target}"
        )

    output_dir.mkdir(parents=True, exist_ok=True)
    selected = candidates if target is None else candidates[:target]
    rows: list[dict] = []
    for row, source in selected:
        target_path = output_dir / source.name
        if target_path.exists():
            if hashlib.sha256(target_path.read_bytes()).hexdigest() != row[
                "content_hash"
            ]:
                raise ValueError("media_select_existing_hash")
        else:
            shutil.copyfile(source, target_path)
        rows.append(row)

    result = {
        "schema": schema,
        "review_status": "complete",
        "selection_status": "complete",
        "selection_target": target if target is not None else "all",
        "selection_candidates": len(candidates),
        "selection_excluded_existing_or_duplicate": (
            reviewed_total - len(candidates)
        ),
        "ready": len(rows),
        "failed": 0,
        "assets": rows,
    }
    if require_visual:
        result.update({
            "visual_review_status": "complete",
            "visual_review_required": len(rows),
            "visual_review_approved": len(rows),
            "visual_review_rejected": 0,
        })
    manifest_path = output_dir / "selected-manifest.json"
    temporary = manifest_path.with_name(
        f".{manifest_path.name}.{os.getpid()}.tmp"
    )
    temporary.write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    os.replace(temporary, manifest_path)
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--kind", choices=("food", "sport"), required=True)
    parser.add_argument("--manifest", type=Path, action="append", required=True)
    parser.add_argument("--output", type=Path, required=True)
    selection = parser.add_mutually_exclusive_group(required=True)
    selection.add_argument("--target", type=int)
    selection.add_argument("--all", action="store_true")
    parser.add_argument("--require-visual", action="store_true")
    args = parser.parse_args()
    result = select_catalog(
        args.kind,
        args.manifest,
        args.output,
        None if args.all else args.target,
        args.require_visual,
    )
    print(json.dumps(
        {
            "kind": args.kind,
            "selected": result["ready"],
            "candidates": result["selection_candidates"],
            "output": str(args.output / "selected-manifest.json"),
        },
        ensure_ascii=False,
    ))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
