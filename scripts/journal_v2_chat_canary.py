#!/usr/bin/env python3
"""End-to-end live-provider canary against an isolated temporary SQLite DB."""

import asyncio
import json
import os
from pathlib import Path
import socket
import sqlite3
import sys
import tempfile
import time
from datetime import timedelta


tmp = tempfile.TemporaryDirectory(prefix="aiwa-journal-v2-")
os.environ["AIWA_DB"] = os.path.join(tmp.name, "canary.db")
os.environ["AIWA_JOURNAL_V2"] = "1"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

if os.environ.get("AIWA_CANARY_FORCE_OPENROUTER_LOOPBACK") == "1":
    _original_getaddrinfo = socket.getaddrinfo

    def _canary_getaddrinfo(host, port, *args, **kwargs):
        if str(host or "").casefold() == "openrouter.ai":
            host = "127.0.0.1"
        return _original_getaddrinfo(host, port, *args, **kwargs)

    socket.getaddrinfo = _canary_getaddrinfo

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
        "припеш" in json.dumps(first[0], ensure_ascii=False).casefold()
        or "припеш" in created.get("answer", "").casefold()
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

    typo_cid = cid + 4
    bot._activate_user(typo_cid)
    bot.upsert(
        typo_cid,
        mode="male",
        height=178,
        weight=81,
        age=41,
        activity=2,
    )
    typo, typo_ms = await turn(
        typo_cid,
        "я поезл квашеной капусты с кратошшкой и грибами на полдник",
        "damaged-completed-verb",
    )
    typo_meals = bot.meals_of(typo_cid)

    multi_cid = cid + 5
    bot._activate_user(multi_cid)
    bot.upsert(
        multi_cid,
        mode="male",
        height=178,
        weight=81,
        age=41,
        activity=2,
    )
    multi, multi_ms = await turn(
        multi_cid,
        (
            "аллоБ а покушал чернику - буквально две ладони полныхБ "
            "выпил молока и 3 печеньки орео утром\n"
            "а в полдник еще выпил самогону чекушечку"
        ),
        "multiple-meals-transport-noise",
    )
    multi_meals = bot.meals_of(multi_cid)

    prompt_cid = cid + 6
    bot._activate_user(prompt_cid)
    bot.upsert(
        prompt_cid,
        mode="male",
        height=178,
        weight=81,
        age=41,
        activity=2,
    )
    prompt_text = (
        "колобки в супе гороховом пшеничные -3 штБ 4 селдки "
        "1 салат мимоза =это на завтрак\n"
        "а на полдник - самовар чаю с кренделями"
    )
    prompt_started = time.monotonic()
    prompt_plan = await bot.resolve_semantic_journal_action(
        prompt_cid,
        prompt_text,
        user_generation=bot._user_generation(prompt_cid),
        food_prompt_mode=True,
    )
    if (prompt_plan or {}).get("intent") == "logmealbatch":
        prompt = await bot.log_food_batch_action(
            prompt_cid,
            bot.row(prompt_cid),
            prompt_plan,
            user_generation=bot._user_generation(prompt_cid),
            mutation_key=bot.chat_mutation_key("canary", "food-prompt-batch"),
        )
    elif (prompt_plan or {}).get("intent") == "logmeal":
        prompt = await bot.log_food_action(
            prompt_cid,
            bot.row(prompt_cid),
            prompt_text,
            user_generation=bot._user_generation(prompt_cid),
            mutation_key=bot.chat_mutation_key("canary", "food-prompt-single"),
            preparsed_food_text=prompt_plan.get("food_text"),
            preparsed_slot=prompt_plan.get("slot"),
            preparsed_food_record=prompt_plan.get("food_record"),
        )
    else:
        prompt = {
            "ok": False,
            "text": "food prompt did not produce a verified mutation plan",
        }
    prompt_ms = round((time.monotonic() - prompt_started) * 1000)
    prompt_meals = bot.meals_of(prompt_cid)

    workout_cid = cid + 7
    bot._activate_user(workout_cid)
    bot.upsert(
        workout_cid,
        mode="male",
        height=178,
        weight=81,
        age=41,
        activity=2,
    )
    workout, workout_ms = await turn(
        workout_cid,
        (
            "Сегодня сделал силовую тренировку: приседания и жим лёжа, "
            "45 минут, было тяжело"
        ),
        "structured-workout",
    )
    saved_workouts = bot.workouts_of(workout_cid)

    checkin_day = bot.dtoday().isoformat()
    checkin = bot._api_checkin_sync(
        workout_cid,
        {
            "date": checkin_day,
            "energy": 2,
            "mood": 3,
            "symptom": "head",
        },
    )
    reopened_checkin = bot.log_get(workout_cid, checkin_day)
    reopened_diary = bot.diary_payload(prompt_cid)
    male_payload = json.loads(bot._api_data_sync(workout_cid, {}).text)

    period_cid = cid + 8
    bot._activate_user(period_cid)
    bot.upsert(
        period_cid,
        mode="cycle",
        cycle_len=28,
        last_period=(bot.dtoday() - timedelta(days=28)).isoformat(),
        height=168,
        weight=60,
        age=30,
        activity=2,
    )
    period = await bot.log_period_action(
        period_cid,
        bot.row(period_cid),
        "Сегодня начались месячные",
        user_generation=bot._user_generation(period_cid),
        mutation_key=bot.chat_mutation_key("canary", "period-start"),
    )
    period_payload = json.loads(bot._api_data_sync(period_cid, {}).text)

    connection = sqlite3.connect(bot.DB)
    call_rows = connection.execute(
        """SELECT input_tokens,output_tokens,reported_cost,cost_unit,meta_json
           FROM llm_calls ORDER BY occurred_at"""
    ).fetchall()
    connection.close()
    input_tokens = sum(int(row[0] or 0) for row in call_rows)
    output_tokens = sum(int(row[1] or 0) for row in call_rows)
    reported_cost = sum(
        float(row[2] or 0)
        for row in call_rows
        if row[2] is not None and row[3] == "usd"
    )
    generation_ids = []
    for row in call_rows:
        try:
            generation_id = json.loads(row[4] or "{}").get("generation_id")
        except (TypeError, ValueError):
            generation_id = None
        if generation_id:
            generation_ids.append(str(generation_id))
    reconciled_cost = 0.0
    reconciled_generations = 0
    generation_url = (
        str(os.environ.get("OPENROUTER_BASE_URL") or "https://openrouter.ai/api/v1")
        .rstrip("/")
        + "/generation"
    )
    openrouter_key = os.environ.get("OPENROUTER_API_KEY")
    if openrouter_key:
        for generation_id in generation_ids:
            for attempt in range(3):
                try:
                    response = bot.L._HTTP.get(
                        generation_url,
                        headers={"Authorization": f"Bearer {openrouter_key}"},
                        params={"id": generation_id},
                        timeout=(6, 20),
                        verify=bot.L._proxy_verify(),
                    )
                    payload = response.json() if response.ok else {}
                    total_cost = (payload.get("data") or {}).get("total_cost")
                    if total_cost is not None:
                        reconciled_cost += float(total_cost)
                        reconciled_generations += 1
                        break
                except Exception:
                    pass
                if attempt < 2:
                    await asyncio.sleep(1)
    list_price_estimate = (
        input_tokens * 0.25 / 1_000_000
        + output_tokens * 1.50 / 1_000_000
    )

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
            (mixed.get("mutation") or {}).get("kind") in {"food", "food_batch"}
            and 1 <= len(mixed_meals) <= 2
            and all(term in mixed_saved for term in ("чай", "суш", "йогурт"))
            and all(term not in mixed_saved for term in ("суп", "шоколад"))
        ),
        "damaged_completed_verb_saved": (
            (typo.get("mutation") or {}).get("kind") == "food"
            and len(typo_meals) == 1
            and typo_meals[0].get("slot") == "snack"
        ),
        "multiple_meals_saved_separately": (
            (multi.get("mutation") or {}).get("kind") == "food_batch"
            and len(multi_meals) == 2
            and {meal.get("slot") for meal in multi_meals}
            == {"breakfast", "snack"}
        ),
        "food_prompt_state_saves_without_magic_verbs": (
            prompt.get("ok")
            and len(prompt_meals) == 2
            and {meal.get("slot") for meal in prompt_meals}
            == {"breakfast", "snack"}
            and all(
                meal.get("items") and int(meal.get("kcal") or 0) > 0
                for meal in prompt_meals
            )
        ),
        "workout_category_and_fields_persist": (
            (workout.get("mutation") or {}).get("kind") == "workout"
            and len(saved_workouts) == 1
            and saved_workouts[0].get("type") == "Силовая"
            and saved_workouts[0].get("duration") == "45 мин"
            and saved_workouts[0].get("rpe") == "тяжёлая"
            and len(saved_workouts[0].get("items") or []) >= 2
        ),
        "checkin_categories_survive_reopen": (
            checkin.get("ok")
            and reopened_checkin == {
                "energy": 2,
                "mood": 3,
                "symptoms": ["head"],
            }
        ),
        "food_survives_reopen_with_separate_slots": (
            len(reopened_diary.get("meals") or []) == 2
            and {
                meal.get("slot")
                for meal in reopened_diary.get("meals") or []
            } == {"breakfast", "snack"}
        ),
        "male_profile_has_no_cycle_contract": (
            male_payload.get("mode") == "male"
            and male_payload.get("cycle") is False
            and male_payload.get("last_period") is None
            and male_payload.get("cycle_len") is None
        ),
        "period_write_is_visible_to_calendar_contract": (
            period.get("ok")
            and period_payload.get("last_period") == checkin_day
            and checkin_day in {
                entry.get("start")
                for entry in period_payload.get("past_periods") or []
            }
        ),
        "no_guard_loop": all(
            "сервер не подтвердил" not in x.get("answer", "")
            for x in (created, moved, appended, replayed, mixed, workout)
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
            "damaged_completed_verb": typo_ms,
            "multiple_meals": multi_ms,
            "food_prompt_batch": prompt_ms,
            "structured_workout": workout_ms,
        },
        "answers": {
            "create": created.get("answer"),
            "move": moved.get("answer"),
            "append": appended.get("answer"),
            "append_retry": replayed.get("answer"),
            "masculine_first_person": masculine.get("answer"),
            "mixed_status": mixed.get("answer"),
            "damaged_completed_verb": typo.get("answer"),
            "multiple_meals": multi.get("answer"),
            "food_prompt_batch": prompt.get("text"),
            "structured_workout": workout.get("answer"),
            "period_start": period.get("text"),
        },
        "cost": {
            "calls": len(call_rows),
            "input_tokens": input_tokens,
            "output_tokens": output_tokens,
            "reported_cost_usd": round(reported_cost, 9),
            "reconciled_cost_usd": round(reconciled_cost, 9),
            "reconciled_generations": reconciled_generations,
            "list_price_estimate_usd": round(list_price_estimate, 9),
        },
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result["ok"] else 1


if __name__ == "__main__":
    try:
        raise SystemExit(asyncio.run(main()))
    finally:
        tmp.cleanup()
