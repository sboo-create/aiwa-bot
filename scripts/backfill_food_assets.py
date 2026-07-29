#!/usr/bin/env python3
"""Generate and import a reviewed food-image backfill without request latency.

The generation mode is intended for a separate workstation/process. It can use
bounded parallelism without consuming AIWA chat workers. The import mode
verifies immutable files again, then performs short SQLite upserts. No Telegram
identifiers, messages or profile data are exported: only parsed dish labels and
aggregate frequencies leave production.
"""

import argparse
import collections
import concurrent.futures
import hashlib
import json
import os
import sqlite3
import sys
import threading
import time
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import food_assets as assets


def _database_path() -> Path:
    return Path(
        os.environ.get("AIWA_DB")
        or os.environ.get("DB_PATH")
        or "/data/aiwa.db"
    ).expanduser().resolve()


def _collect_labels(connection: sqlite3.Connection) -> list[dict[str, object]]:
    counts: collections.Counter[str] = collections.Counter()
    for title, count in connection.execute(
        """SELECT title,COUNT(*) FROM meals
           WHERE TRIM(COALESCE(title,''))!='' GROUP BY title"""
    ):
        counts[str(title)] += int(count or 0)
    for (raw,) in connection.execute(
        """SELECT js FROM day_cache
           WHERE kind IN ('food','menu','day')"""
    ):
        try:
            stack = [json.loads(raw)]
        except (TypeError, ValueError):
            continue
        while stack:
            item = stack.pop()
            if isinstance(item, dict):
                label = item.get("dish") or item.get("title")
                if isinstance(label, str) and 2 < len(label) < 120:
                    counts[label] += 1
                stack.extend(item.values())
            elif isinstance(item, list):
                stack.extend(item)

    ready = {
        row[0]: row[1]
        for row in connection.execute(
            """SELECT canonical_id,prompt_version FROM food_assets
               WHERE status='ready' AND source='generated'"""
        )
    }
    rows = []
    for label, frequency in counts.items():
        reviewed = assets.reviewed_generation_label(label)
        if not reviewed:
            continue
        match = assets.RESOLVER._manifest_match(reviewed)
        if match and match[2] in {"catalog_exact", "catalog_alias"}:
            continue
        food_id = assets.canonical_id(reviewed)
        if ready.get(food_id) == assets.GENERATED_PROMPT_VERSION:
            continue
        rows.append(
            {
                "label": reviewed,
                "canonical_id": food_id,
                "frequency": frequency,
            }
        )
    rows.sort(
        key=lambda row: (
            -int(row["frequency"]),
            assets.normalize_label(row["label"]),
        )
    )
    return rows


def export_labels(output: Path | None) -> int:
    connection = sqlite3.connect(_database_path())
    try:
        rows = _collect_labels(connection)
    finally:
        connection.close()
    payload = {
        "schema": "aiwa-food-backfill-labels-v1",
        "generated_prompt_version": assets.GENERATED_PROMPT_VERSION,
        "count": len(rows),
        "labels": rows,
    }
    encoded = json.dumps(payload, ensure_ascii=False, indent=2)
    if output:
        output.write_text(encoded + "\n", encoding="utf-8")
    else:
        print(encoded)
    return len(rows)


def _generate_one(row: dict[str, object], max_attempts: int) -> dict[str, object]:
    started = time.perf_counter()
    errors = []
    for attempt in range(1, max_attempts + 1):
        try:
            result = assets.generate_and_store(row["label"], attempt=attempt)
            return {
                **row,
                **result,
                "filename": Path(result["image_url"]).name,
                "attempts": attempt,
                "elapsed_s": round(time.perf_counter() - started, 3),
            }
        except Exception as exc:  # keep the batch moving after a rejected image
            errors.append(type(exc).__name__)
    return {
        **row,
        "status": "failed",
        "attempts": max_attempts,
        "errors": errors,
        "elapsed_s": round(time.perf_counter() - started, 3),
    }


def generate(input_path: Path, output_dir: Path, workers: int, attempts: int) -> int:
    payload = json.loads(input_path.read_text(encoding="utf-8"))
    if payload.get("schema") != "aiwa-food-backfill-labels-v1":
        raise ValueError("food_backfill_input_schema")
    rows = payload.get("labels")
    if not isinstance(rows, list):
        raise ValueError("food_backfill_input_labels")
    output_dir.mkdir(parents=True, exist_ok=True)
    os.environ["AIWA_FOOD_ASSET_DIR"] = str(output_dir)
    os.environ["AIWA_FOOD_ASSET_PUBLIC_BASE"] = "/generated-food"

    completed = []
    lock = threading.Lock()
    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as executor:
        futures = {
            executor.submit(_generate_one, row, attempts): row
            for row in rows
        }
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            with lock:
                completed.append(result)
                print(
                    json.dumps(
                        {
                            "progress": len(completed),
                            "total": len(rows),
                            "label": result["label"],
                            "status": result.get("status", "ready"),
                            "attempts": result["attempts"],
                            "elapsed_s": result["elapsed_s"],
                        },
                        ensure_ascii=False,
                    ),
                    flush=True,
                )
    completed.sort(
        key=lambda row: (
            -int(row["frequency"]),
            assets.normalize_label(row["label"]),
        )
    )
    manifest = {
        "schema": "aiwa-food-backfill-assets-v1",
        "generated_prompt_version": assets.GENERATED_PROMPT_VERSION,
        "review_status": "pending",
        "ready": sum(row.get("status") != "failed" for row in completed),
        "failed": sum(row.get("status") == "failed" for row in completed),
        "assets": completed,
    }
    manifest_path = output_dir / "backfill-manifest.json"
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(
        json.dumps(
            {
                "manifest": str(manifest_path),
                "ready": manifest["ready"],
                "failed": manifest["failed"],
            },
            ensure_ascii=False,
        ),
        flush=True,
    )
    return int(manifest["failed"])


def _review_one(
    row: dict[str, object], repair_attempts: int,
) -> dict[str, object]:
    errors = []
    if row.get("status") != "failed":
        path = assets.generated_asset_dir() / str(row["filename"])
        try:
            review_score = assets._validate_generated_image(
                str(row["label"]),
                str(row["literal_description"]),
                path.read_bytes(),
            )
            return {
                **row,
                "review_status": "approved",
                "review_score": review_score,
                "review_repairs": 0,
            }
        except Exception as exc:
            errors.append(f"{type(exc).__name__}:{str(exc)[:120]}")
    else:
        errors.extend(str(error)[:120] for error in row.get("errors") or [])

    # Both generation failures and review failures enter the repair queue. A
    # repaired image must pass the normal gate and this second review.
    for repair in range(1, repair_attempts + 1):
        try:
            replacement = assets.generate_and_store(
                row["label"], attempt=3 + repair
            )
            replacement_path = (
                assets.generated_asset_dir()
                / Path(str(replacement["image_url"])).name
            )
            review_score = assets._validate_generated_image(
                str(row["label"]),
                str(replacement["literal_description"]),
                replacement_path.read_bytes(),
            )
            return {
                **row,
                **replacement,
                "filename": replacement_path.name,
                "review_status": "approved",
                "review_score": review_score,
                "review_repairs": repair,
            }
        except Exception as exc:
            errors.append(f"{type(exc).__name__}:{str(exc)[:120]}")
    return {
        **row,
        "status": "failed",
        "review_status": "rejected",
        "review_repairs": repair_attempts,
        "review_errors": errors,
    }


def review(
    input_path: Path,
    output_path: Path,
    workers: int,
    repair_attempts: int,
) -> int:
    payload = json.loads(input_path.read_text(encoding="utf-8"))
    if payload.get("schema") != "aiwa-food-backfill-assets-v1":
        raise ValueError("food_backfill_manifest_schema")
    rows = payload.get("assets")
    if not isinstance(rows, list):
        raise ValueError("food_backfill_manifest_assets")
    os.environ["AIWA_FOOD_ASSET_DIR"] = str(input_path.resolve().parent)
    os.environ["AIWA_FOOD_ASSET_PUBLIC_BASE"] = "/generated-food"
    reviewed = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as executor:
        futures = {
            executor.submit(_review_one, row, repair_attempts): row
            for row in rows
        }
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            reviewed.append(result)
            print(
                json.dumps(
                    {
                        "review_progress": len(reviewed),
                        "total": len(rows),
                        "label": result["label"],
                        "review_status": result.get(
                            "review_status", "generation_failed"
                        ),
                        "repairs": result.get("review_repairs", 0),
                    },
                    ensure_ascii=False,
                ),
                flush=True,
            )
    reviewed.sort(
        key=lambda row: (
            -int(row["frequency"]),
            assets.normalize_label(row["label"]),
        )
    )
    payload["review_status"] = "complete"
    payload["assets"] = reviewed
    payload["ready"] = sum(
        row.get("review_status") == "approved" for row in reviewed
    )
    payload["failed"] = len(reviewed) - int(payload["ready"])
    output_path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(
        json.dumps(
            {
                "review_manifest": str(output_path),
                "approved": payload["ready"],
                "rejected": payload["failed"],
            },
            ensure_ascii=False,
        ),
        flush=True,
    )
    return int(payload["failed"])


def _verified_webp(path: Path, expected_hash: str) -> None:
    if path.parent.resolve() != assets.generated_asset_dir():
        raise ValueError("food_backfill_asset_directory")
    raw = path.read_bytes()
    if not raw or len(raw) > 512 * 1024:
        raise ValueError("food_backfill_asset_size")
    if hashlib.sha256(raw).hexdigest() != expected_hash:
        raise ValueError("food_backfill_asset_hash")
    with Image.open(path) as image:
        image.load()
        if image.format != "WEBP" or image.size != (512, 512):
            raise ValueError("food_backfill_asset_format")


def import_manifest(manifest_path: Path) -> int:
    payload = json.loads(manifest_path.read_text(encoding="utf-8"))
    if payload.get("schema") != "aiwa-food-backfill-assets-v1":
        raise ValueError("food_backfill_manifest_schema")
    if payload.get("review_status") != "complete":
        raise ValueError("food_backfill_review_required")
    imported = []
    for row in payload.get("assets") or []:
        if (
            not isinstance(row, dict)
            or row.get("review_status") != "approved"
        ):
            continue
        filename = str(row.get("filename") or "")
        content_hash = str(row.get("content_hash") or "")
        if filename != f"{content_hash}.webp":
            raise ValueError("food_backfill_asset_filename")
        path = (assets.generated_asset_dir() / filename).resolve()
        _verified_webp(path, content_hash)
        if assets.canonical_id(row.get("label")) != row.get("canonical_id"):
            raise ValueError("food_backfill_asset_identity")
        imported.append(row)

    connection = sqlite3.connect(_database_path(), timeout=30)
    try:
        connection.execute("BEGIN IMMEDIATE")
        now = datetime.now(timezone.utc).isoformat()
        for row in imported:
            connection.execute(
                """INSERT INTO food_assets(
                       canonical_id,style_version,canonical_label,status,source,
                       image_url,content_hash,prompt_version,retry_after,
                       last_error_class,updated_at
                   ) VALUES(?,?,?,?,?,?,?,?,?,?,?)
                   ON CONFLICT(canonical_id,style_version) DO UPDATE SET
                       canonical_label=excluded.canonical_label,
                       status='ready',source='generated',
                       image_url=excluded.image_url,
                       content_hash=excluded.content_hash,
                       prompt_version=excluded.prompt_version,
                       retry_after=NULL,last_error_class=NULL,
                       updated_at=excluded.updated_at""",
                (
                    row["canonical_id"],
                    assets.STYLE_VERSION,
                    row["label"],
                    "ready",
                    "generated",
                    row["image_url"],
                    row["content_hash"],
                    assets.GENERATED_PROMPT_VERSION,
                    None,
                    None,
                    now,
                ),
            )
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()
    print(json.dumps({"imported": len(imported)}, ensure_ascii=False))
    return len(imported)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    modes = parser.add_mutually_exclusive_group(required=True)
    modes.add_argument("--export-labels", action="store_true")
    modes.add_argument("--generate", action="store_true")
    modes.add_argument("--review", action="store_true")
    modes.add_argument("--import-manifest", type=Path)
    parser.add_argument("--input", type=Path)
    parser.add_argument("--output", type=Path)
    parser.add_argument("--workers", type=int, default=4)
    parser.add_argument("--attempts", type=int, default=3)
    parser.add_argument("--repair-attempts", type=int, default=2)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.export_labels:
        export_labels(args.output)
        return 0
    if args.generate:
        if not args.input or not args.output:
            raise SystemExit("--generate requires --input and --output")
        workers = max(1, min(8, args.workers))
        attempts = max(1, min(3, args.attempts))
        return 1 if generate(args.input, args.output, workers, attempts) else 0
    if args.review:
        if not args.input or not args.output:
            raise SystemExit("--review requires --input and --output")
        workers = max(1, min(8, args.workers))
        repairs = max(0, min(2, args.repair_attempts))
        return 1 if review(
            args.input, args.output, workers, repairs
        ) else 0
    import_manifest(args.import_manifest)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
