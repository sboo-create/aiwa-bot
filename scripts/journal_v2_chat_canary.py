#!/usr/bin/env python3
"""End-to-end live-provider canary against an isolated temporary SQLite DB."""

import asyncio
import json
import os
from pathlib import Path
import sys
import tempfile
import time
from datetime import timedelta


tmp = tempfile.TemporaryDirectory(prefix="aiwa-journal-v2-")
os.environ["AIWA_DB"] = os.path.join(tmp.name, "canary.db")
os.environ["AIWA_JOURNAL_V2"] = "1"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import aiwa_bot as bot


VOICE = (
    "Я съела бутерброд с острочистелой красной рыбой, чуть-чуть голубики, "
    "горсочку ладонь прям. Ещё я съела припешку с сыром и зеленью и скусила "
    "половину. И ещё я съела куриный наггетс. Один. Домашний."
)


async def turn(cid, text, request_id):
    started = time.monotonic()
    result = await bot._chat_reply(
        cid,
        bot.row(cid),
        text,
        mutation_key=bot.chat_mutation_key("canary", request_id),
        require_mutation_key=True,
    )
    return result, round((time.monotonic() - started) * 1000)


async def main():
    cid = 777001
    bot._activate_user(cid)
    bot.upsert(
        cid,
        mode="cycle",
        cycle_len=28,
        last_period=(bot.dtoday() - timedelta(days=12)).isoformat(),
        height=168,
        weight=60,
        age=30,
        activity=2,
    )

    created, create_ms = await turn(cid, VOICE, "create")
    first = bot.meals_of(cid)
    create_coverage = bool(first) and (
        len(first[0].get("items") or []) >= 4
        or "Не разобрала" in created.get("answer", "")
    )
    create_uncertainty_preserved = bool(first) and (
        not any(
            "припеш" in str(item.get("name") or "").casefold()
            for item in (first[0].get("items") or [])
        )
        and "припеш" in created.get("answer", "").casefold()
    )

    repair_cid = cid + 1
    bot._activate_user(repair_cid)
    bot.upsert(
        repair_cid,
        mode="cycle",
        cycle_len=28,
        last_period=(bot.dtoday() - timedelta(days=12)).isoformat(),
        height=168,
        weight=60,
        age=30,
        activity=2,
    )
    seed = bot.normalize_food({
        "title": "Бутерброд с рыбой, голубика, наггетс",
        "items": [
            {"name": "Бутерброд с красной рыбой", "grams": 120, "kcal": 300,
             "protein": 15, "fat": 14, "carbs": 28},
            {"name": "Голубика", "grams": 40, "kcal": 23,
             "protein": 0.3, "fat": 0.1, "carbs": 5},
            {"name": "Куриный наггетс", "grams": 30, "kcal": 90,
             "protein": 5, "fat": 5, "carbs": 5},
        ],
    }, "text")
    seed.update(slot="lunch", slot_guessed=True)
    seed_id = bot.meal_add(
        repair_cid,
        seed,
        user_generation=bot._user_generation(repair_cid),
        mutation_key=bot.chat_mutation_key("canary", "seed"),
        args_hash=bot.chat_mutation_args_hash("food", "seed repair target"),
    )

    moved, move_ms = await turn(repair_cid, "Это был мой завтрак а не обед", "move")
    after_move = bot.meal_get(repair_cid, seed_id)

    appended, append_ms = await turn(
        repair_cid,
        "А ты не записала, что я съела лепешку с сыром и зеленью из ВкусВилла?",
        "append",
    )
    final = bot.meal_get(repair_cid, seed_id)
    replayed, replay_ms = await turn(
        repair_cid,
        "А ты не записала, что я съела лепешку с сыром и зеленью из ВкусВилла?",
        "append",
    )
    after_replay = bot.meal_get(repair_cid, seed_id)

    masculine_cid = cid + 2
    bot._activate_user(masculine_cid)
    bot.upsert(
        masculine_cid,
        mode="cycle",
        cycle_len=28,
        last_period=(bot.dtoday() - timedelta(days=12)).isoformat(),
        height=168,
        weight=60,
        age=30,
        activity=2,
    )
    masculine, masculine_ms = await turn(
        masculine_cid,
        "На обед съел бутерброд с красной рыбой немного голубики один домашний наггетс",
        "masculine-self",
    )
    masculine_meals = bot.meals_of(masculine_cid)

    mixed_cid = cid + 3
    bot._activate_user(mixed_cid)
    bot.upsert(
        mixed_cid,
        mode="cycle",
        cycle_len=28,
        last_period=(bot.dtoday() - timedelta(days=12)).isoformat(),
        height=168,
        weight=60,
        age=30,
        activity=2,
    )
    mixed, mixed_ms = await turn(
        mixed_cid,
        (
            "Я выпил чай и съел пару сушек, вечером хочу заказать суп, "
            "после прогулки попробовал йогурт, а шоколад не ел"
        ),
        "mixed-status",
    )
    mixed_meals = bot.meals_of(mixed_cid)
    mixed_saved = json.dumps(mixed_meals, ensure_ascii=False).casefold()

    checks = {
        "create_mutation": (created.get("mutation") or {}).get("kind") == "food",
        "create_coverage": create_coverage,
        "create_uncertainty_preserved": create_uncertainty_preserved,
        "slot_moved": after_move and after_move.get("slot") == "breakfast"
                      and not after_move.get("slot_guessed"),
        "move_answer_verified": "Перенесла в завтрак" in moved.get("answer", ""),
        "item_appended": final and len(final.get("items") or []) == 4,
        "totals_consistent": final and final.get("kcal") == sum(
            int(x.get("kcal") or 0) for x in (final.get("items") or [])
        ),
        "append_answer_verified": "Добавила в завтрак" in appended.get("answer", ""),
        "append_retry_idempotent": (
            after_replay
            and len(after_replay.get("items") or []) == 4
            and "запрос уже применён" in replayed.get("answer", "")
        ),
        "masculine_first_person_saved": (
            (masculine.get("mutation") or {}).get("kind") == "food"
            and len(masculine_meals) == 1
            and masculine_meals[0].get("slot") == "lunch"
            and len(masculine_meals[0].get("items") or []) == 3
        ),
        "mixed_status_saves_only_completed": (
            (mixed.get("mutation") or {}).get("kind") == "food"
            and len(mixed_meals) == 1
            and all(term in mixed_saved for term in ("чай", "суш", "йогурт"))
            and all(term not in mixed_saved for term in ("суп", "шоколад"))
        ),
        "no_guard_loop": all(
            "сервер не подтвердил" not in x.get("answer", "")
            for x in (created, moved, appended, replayed, mixed)
        ),
    }
    result = {
        "ok": all(checks.values()),
        "checks": checks,
        "latency_ms": {
            "create_complex_meal": create_ms,
            "move_slot": move_ms,
            "append_item": append_ms,
            "append_retry": replay_ms,
            "masculine_first_person": masculine_ms,
            "mixed_status": mixed_ms,
        },
        "answers": {
            "create": created.get("answer"),
            "move": moved.get("answer"),
            "append": appended.get("answer"),
            "append_retry": replayed.get("answer"),
            "masculine_first_person": masculine.get("answer"),
            "mixed_status": mixed.get("answer"),
        },
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result["ok"] else 1


if __name__ == "__main__":
    try:
        raise SystemExit(asyncio.run(main()))
    finally:
        tmp.cleanup()
