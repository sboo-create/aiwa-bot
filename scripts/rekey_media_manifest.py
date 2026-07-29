#!/usr/bin/env python3
"""Migrate pre-v1 backfill manifests to canonical label-derived IDs."""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import food_assets
import sport_assets


def rekey(kind: str, input_path: Path, output_path: Path) -> int:
    if input_path.resolve() == output_path.resolve():
        raise ValueError("media_rekey_output_manifest")
    payload = json.loads(input_path.read_text(encoding="utf-8"))
    if payload.get("schema") != f"aiwa-{kind}-backfill-assets-v1":
        raise ValueError("media_rekey_schema")
    assets = food_assets if kind == "food" else sport_assets
    rows = payload.get("assets")
    if not isinstance(rows, list):
        raise ValueError("media_rekey_assets")
    seen: set[str] = set()
    changed = 0
    for row in rows:
        if not isinstance(row, dict):
            raise ValueError("media_rekey_row")
        label = assets.reviewed_generation_label(row.get("label"))
        if not label:
            raise ValueError("media_rekey_label")
        canonical_id = assets.canonical_id(label)
        if canonical_id in seen:
            raise ValueError("media_rekey_duplicate")
        seen.add(canonical_id)
        if row.get("canonical_id") != canonical_id:
            row["canonical_id"] = canonical_id
            changed += 1
    payload["canonical_id_migration"] = {
        "schema": "aiwa-media-canonical-id-migration-v1",
        "changed": changed,
    }
    temporary = output_path.with_name(
        f".{output_path.name}.{os.getpid()}.tmp"
    )
    temporary.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    os.replace(temporary, output_path)
    return changed


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--kind", choices=("food", "sport"), required=True)
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    changed = rekey(args.kind, args.input, args.output)
    print(json.dumps({
        "kind": args.kind,
        "changed": changed,
        "output": str(args.output),
    }, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
