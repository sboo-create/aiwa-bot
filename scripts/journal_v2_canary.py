#!/usr/bin/env python3
"""Read-only live-provider canary for the journal-v2 model contracts.

It never imports aiwa_bot and never touches the application database. Railway
variables are used only to call the same configured provider as the service.
"""

import json
from pathlib import Path
import statistics
import sys
import time

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import llm


MEAL_CONTEXT = {
    "meals": [
        {
            "id": 101,
            "date": "2026-07-26",
            "title": "Бутерброд с рыбой, голубика, наггетс",
            "slot": "lunch",
            "slot_guessed": True,
            "items": [
                {"name": "Бутерброд с красной рыбой"},
                {"name": "Голубика"},
                {"name": "Куриный наггетс"},
            ],
        }
    ],
    "workouts": [],
    "last_mutation": {
        "kind": "food",
        "record_id": 101,
        "created_at": "2026-07-26T16:00:00+03:00",
    },
}

EMPTY_CONTEXT = {"meals": [], "workouts": [], "last_mutation": None}

VOICE = (
    "Я съела бутерброд с острочистелой красной рыбой, чуть-чуть голубики, "
    "горсочку ладонь прям. Ещё я съела припешку с сыром и зеленью и скусила "
    "половину. И ещё я съела куриный наггетс. Один. Домашний."
)

CASES = [
    ("voice-create", VOICE, EMPTY_CONTEXT, "food"),
    ("move-slot", "Это был мой завтрак а не обед", MEAL_CONTEXT, "move_meal_slot"),
    (
        "append-missed",
        "А ты не записала, что я съела лепешку с сыром и зеленью из ВкусВилла?",
        MEAL_CONTEXT,
        "append_meal_item",
    ),
    ("natural-workout", "Я сегодня тренировку сделала на ноги", EMPTY_CONTEXT, "workout"),
    ("food-advice", "Можно ли есть лепёшку на завтрак?", EMPTY_CONTEXT, "none"),
    ("future-food", "Я вечером собираюсь съесть кекс", EMPTY_CONTEXT, "none"),
    (
        "mixed-status",
        "Я съела творог, а вечером собираюсь съесть кекс",
        EMPTY_CONTEXT,
        "food",
    ),
    ("third-party", "Соня съела творог, запиши", EMPTY_CONTEXT, "none"),
]


def main():
    failures = []
    timings = []
    rows = []
    voice_record = {}
    for name, text, context, expected in CASES:
        usage = []
        started = time.monotonic()
        result = llm.classify_journal_event(
            text, usage=usage, context=context, enable_v2=True,
        ) or {}
        elapsed = round((time.monotonic() - started) * 1000)
        timings.append(elapsed)
        actual = str(result.get("action") or "none")
        ok = actual == expected
        if expected not in {"none"}:
            span = str(result.get("evidence_span") or "")
            ok = ok and bool(span) and span.casefold() in text.casefold()
        if expected in {"move_meal_slot", "append_meal_item"}:
            ok = ok and result.get("target_id") == 101
        if expected == "move_meal_slot":
            ok = ok and result.get("slot") == "breakfast"
        if expected == "mixed-status":
            # Kept for readability if the case name is ever used as expectation.
            pass
        if name == "mixed-status" and actual == "food":
            span = str(result.get("evidence_span") or "")
            ok = ok and "собираюсь" not in span.casefold()
        if name == "voice-create":
            voice_record = result.get("food_record") if isinstance(result.get("food_record"), dict) else {}
            items = voice_record.get("items") if isinstance(voice_record.get("items"), list) else []
            unparsed = voice_record.get("unparsed") if isinstance(voice_record.get("unparsed"), list) else []
            ok = ok and len(items) + len(unparsed) >= 4
            ok = ok and not any(
                "припеш" in str(item.get("name") or "").casefold() for item in items
            )
            ok = ok and any(
                "припеш" in str(fragment).casefold() for fragment in unparsed
            )
        rows.append({
            "case": name,
            "expected": expected,
            "actual": actual,
            "ok": ok,
            "ms": elapsed,
            "provider_calls": len(usage),
        })
        if not ok:
            failures.append(name)

    usage = []
    started = time.monotonic()
    food = llm.analyze_food_text(
        "200 г творога и один банан", usage=usage, structured=True,
    ) or {}
    food_ms = round((time.monotonic() - started) * 1000)
    items = food.get("items") if isinstance(food.get("items"), list) else []
    unparsed = food.get("unparsed") if isinstance(food.get("unparsed"), list) else []
    coverage_ok = len(items) + len(unparsed) >= 2
    rows.append({
        "case": "voice-item-coverage",
        "expected": "2 named or unresolved positions",
        "actual": f"{len(items)} items + {len(unparsed)} unresolved",
        "ok": coverage_ok,
        "ms": food_ms,
        "provider_calls": len(usage),
    })
    if not coverage_ok:
        failures.append("voice-item-coverage")

    ordered = sorted(timings)
    p50 = statistics.median(ordered) if ordered else 0
    p95 = ordered[min(len(ordered) - 1, int(len(ordered) * 0.95))] if ordered else 0
    print(json.dumps({
        "ok": not failures,
        "failures": failures,
        "router_latency_ms": {"p50": p50, "p95": p95, "max": max(ordered or [0])},
        "food_parser_ms": food_ms,
        "cases": rows,
    }, ensure_ascii=False, indent=2))
    return 0 if not failures else 1


if __name__ == "__main__":
    sys.exit(main())
