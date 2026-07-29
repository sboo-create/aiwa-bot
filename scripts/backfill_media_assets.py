#!/usr/bin/env python3
"""Resumable offline generator for food and sport media catalogs."""

from __future__ import annotations

import argparse
import concurrent.futures
import json
import os
import sys
import threading
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import food_assets
import sport_assets


def _module(kind: str):
    return food_assets if kind == "food" else sport_assets


def _label_schema(kind: str) -> str:
    return f"aiwa-{kind}-backfill-labels-v1"


def _asset_schema(kind: str) -> str:
    return f"aiwa-{kind}-backfill-assets-v1"


def _atomic_json(path: Path, payload: dict) -> None:
    temporary = path.with_name(f".{path.name}.{os.getpid()}.tmp")
    temporary.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    os.replace(temporary, path)


def _configure(kind: str, output_dir: Path) -> None:
    if kind == "food":
        os.environ["AIWA_FOOD_ASSET_DIR"] = str(output_dir)
        os.environ["AIWA_FOOD_ASSET_PUBLIC_BASE"] = "/generated-food"
    else:
        os.environ["AIWA_SPORT_ASSET_DIR"] = str(output_dir)
        os.environ["AIWA_SPORT_ASSET_PUBLIC_BASE"] = "/generated-sport"


def _generate_one(
    kind: str, row: dict[str, object], max_attempts: int,
) -> dict[str, object]:
    assets = _module(kind)
    started = time.perf_counter()
    errors = []
    for attempt in range(1, max_attempts + 1):
        try:
            result = assets.generate_and_store(
                row["label"], attempt=attempt
            )
            return {
                **row,
                **result,
                "filename": Path(str(result["image_url"])).name,
                "status": "ready",
                "attempts": attempt,
                "elapsed_s": round(time.perf_counter() - started, 3),
            }
        except Exception as exc:
            errors.append(
                f"{type(exc).__name__}:{str(exc)[:120]}"
            )
    return {
        **row,
        "status": "failed",
        "attempts": max_attempts,
        "errors": errors,
        "elapsed_s": round(time.perf_counter() - started, 3),
    }


def _valid_existing(assets, output_dir: Path, row: dict) -> bool:
    filename = str(row.get("filename") or "")
    content_hash = str(row.get("content_hash") or "")
    path = output_dir / filename
    if (
        row.get("status") != "ready"
        or not filename
        or filename != f"{content_hash}.webp"
        or not path.is_file()
    ):
        return False
    try:
        return assets.canonical_id(row.get("label")) == row.get(
            "canonical_id"
        )
    except Exception:
        return False


def generate(
    kind: str,
    input_path: Path,
    output_dir: Path,
    workers: int,
    attempts: int,
) -> int:
    assets = _module(kind)
    source = json.loads(input_path.read_text(encoding="utf-8"))
    if source.get("schema") != _label_schema(kind):
        raise ValueError("media_backfill_input_schema")
    rows = source.get("labels")
    if not isinstance(rows, list):
        raise ValueError("media_backfill_input_labels")
    output_dir.mkdir(parents=True, exist_ok=True)
    _configure(kind, output_dir)
    manifest_path = output_dir / "backfill-manifest.json"
    completed: dict[str, dict] = {}
    if manifest_path.exists():
        previous = json.loads(manifest_path.read_text(encoding="utf-8"))
        if previous.get("schema") != _asset_schema(kind):
            raise ValueError("media_backfill_resume_schema")
        for row in previous.get("assets") or []:
            if isinstance(row, dict) and _valid_existing(
                assets, output_dir, row
            ):
                completed[str(row["canonical_id"])] = row

    lock = threading.Lock()

    def checkpoint() -> None:
        ordered = sorted(
            completed.values(),
            key=lambda row: (
                -int(row.get("frequency") or 0),
                assets.normalize_label(row.get("label")),
            ),
        )
        payload = {
            "schema": _asset_schema(kind),
            "generated_prompt_version": assets.GENERATED_PROMPT_VERSION,
            "review_status": "pending",
            "input_count": len(rows),
            "completed": len(ordered),
            "ready": sum(
                row.get("status") == "ready" for row in ordered
            ),
            "failed": sum(
                row.get("status") == "failed" for row in ordered
            ),
            "assets": ordered,
        }
        _atomic_json(manifest_path, payload)

    pending = [
        row for row in rows
        if isinstance(row, dict)
        and str(row.get("canonical_id") or "") not in completed
    ]
    checkpoint()
    with concurrent.futures.ThreadPoolExecutor(
        max_workers=workers
    ) as executor:
        futures = {
            executor.submit(
                _generate_one, kind, row, attempts
            ): row
            for row in pending
        }
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            with lock:
                completed[str(result["canonical_id"])] = result
                checkpoint()
                print(json.dumps(
                    {
                        "kind": kind,
                        "progress": len(completed),
                        "total": len(rows),
                        "label": result["label"],
                        "status": result["status"],
                        "attempts": result["attempts"],
                        "elapsed_s": result["elapsed_s"],
                    },
                    ensure_ascii=False,
                ), flush=True)
    failed = sum(
        row.get("status") == "failed" for row in completed.values()
    )
    print(json.dumps(
        {
            "kind": kind,
            "manifest": str(manifest_path),
            "ready": len(completed) - failed,
            "failed": failed,
        },
        ensure_ascii=False,
    ), flush=True)
    return failed


def _review_one(
    kind: str, row: dict[str, object], repair_attempts: int,
) -> dict[str, object]:
    assets = _module(kind)
    errors = []
    if row.get("status") != "failed":
        path = assets.generated_asset_dir() / str(row["filename"])
        try:
            score = assets._validate_generated_image(
                str(row["label"]),
                str(row["literal_description"]),
                path.read_bytes(),
            )
            return {
                **row,
                "review_status": "approved",
                "review_score": score,
                "review_repairs": 0,
            }
        except Exception as exc:
            errors.append(f"{type(exc).__name__}:{str(exc)[:120]}")
    else:
        errors.extend(str(error)[:120] for error in row.get("errors") or [])
    for repair in range(1, repair_attempts + 1):
        try:
            replacement = assets.generate_and_store(
                row["label"], attempt=3 + repair
            )
            replacement_path = (
                assets.generated_asset_dir()
                / Path(str(replacement["image_url"])).name
            )
            score = assets._validate_generated_image(
                str(row["label"]),
                str(replacement["literal_description"]),
                replacement_path.read_bytes(),
            )
            return {
                **row,
                **replacement,
                "filename": replacement_path.name,
                "status": "ready",
                "review_status": "approved",
                "review_score": score,
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
    kind: str,
    input_path: Path,
    output_path: Path,
    workers: int,
    repair_attempts: int,
) -> int:
    assets = _module(kind)
    source = json.loads(input_path.read_text(encoding="utf-8"))
    if source.get("schema") != _asset_schema(kind):
        raise ValueError("media_backfill_manifest_schema")
    rows = source.get("assets")
    if not isinstance(rows, list):
        raise ValueError("media_backfill_manifest_assets")
    _configure(kind, input_path.resolve().parent)
    reviewed: dict[str, dict] = {}
    if output_path.exists():
        previous = json.loads(output_path.read_text(encoding="utf-8"))
        if previous.get("schema") != _asset_schema(kind):
            raise ValueError("media_review_resume_schema")
        for row in previous.get("assets") or []:
            if (
                isinstance(row, dict)
                and row.get("review_status") in {"approved", "rejected"}
            ):
                reviewed[str(row.get("canonical_id"))] = row

    lock = threading.Lock()

    def checkpoint(final: bool = False) -> None:
        ordered = sorted(
            reviewed.values(),
            key=lambda row: (
                -int(row.get("frequency") or 0),
                assets.normalize_label(row.get("label")),
            ),
        )
        payload = {
            **source,
            "review_status": (
                "complete" if final and len(ordered) == len(rows)
                else "in_progress"
            ),
            "assets": ordered,
            "ready": sum(
                row.get("review_status") == "approved" for row in ordered
            ),
            "failed": sum(
                row.get("review_status") == "rejected" for row in ordered
            ),
        }
        _atomic_json(output_path, payload)

    pending = [
        row for row in rows
        if isinstance(row, dict)
        and str(row.get("canonical_id") or "") not in reviewed
    ]
    checkpoint()
    with concurrent.futures.ThreadPoolExecutor(
        max_workers=workers
    ) as executor:
        futures = {
            executor.submit(
                _review_one, kind, row, repair_attempts
            ): row
            for row in pending
        }
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            with lock:
                reviewed[str(result["canonical_id"])] = result
                checkpoint()
                print(json.dumps(
                    {
                        "kind": kind,
                        "review_progress": len(reviewed),
                        "total": len(rows),
                        "label": result["label"],
                        "review_status": result["review_status"],
                        "repairs": result.get("review_repairs", 0),
                    },
                    ensure_ascii=False,
                ), flush=True)
    checkpoint(final=True)
    rejected = sum(
        row.get("review_status") == "rejected"
        for row in reviewed.values()
    )
    return rejected


def main() -> int:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--generate", action="store_true")
    mode.add_argument("--review", action="store_true")
    parser.add_argument("--kind", choices=("food", "sport"), required=True)
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--workers", type=int, default=4)
    parser.add_argument("--attempts", type=int, default=3)
    parser.add_argument("--repair-attempts", type=int, default=2)
    args = parser.parse_args()
    workers = max(1, min(8, args.workers))
    if args.generate:
        failures = generate(
            args.kind,
            args.input,
            args.output,
            workers,
            max(1, min(3, args.attempts)),
        )
    else:
        failures = review(
            args.kind,
            args.input,
            args.output,
            workers,
            max(0, min(2, args.repair_attempts)),
        )
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
