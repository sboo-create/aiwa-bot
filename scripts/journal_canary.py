#!/usr/bin/env python3
"""Офлайн-прогон корпуса против ЖИВОЙ модели — то, чего не меряют юнит-тесты.

Юнит-тесты подменяют решение модели и проверяют исполнитель: что он правильно
пишет и правильно отказывает. Здесь проверяется ровно противоположное — выберет
ли настоящая модель нужный инструмент на реальных формулировках.

Промпт и спецификация инструментов берутся из aiwa_bot напрямую, поэтому прогон
не может разойтись с продом.

Запуск (нужны ключи LLM в окружении, в CI не входит):
    venv/bin/python scripts/journal_canary.py
    venv/bin/python scripts/journal_canary.py --only safe-third-party
    venv/bin/python scripts/journal_canary.py --repeat 3 --min-accuracy 0.9
"""

import argparse
import json
import os
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "tests"))

os.environ.setdefault("BOT_TOKEN", "123456:canary")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "canary-salt")

import aiwa_bot as bot  # noqa: E402
from journal_corpus import KNOWN_BUGS, MUST_NOT_WRITE, MUST_WRITE  # noqa: E402

OP_TO_TOOL = {
    "meal.create": "log_meal", "meal.update": "update_meal",
    "meal.append_item": "append_meal_item", "meal.move_slot": "move_meal_slot",
    "workout.create": "log_workout",
    "period.start": "log_period_start", "period.end": "log_period_end",
}

# Модель видит дневник так же, как через today_diary в проде: иначе она не
# сможет выбрать meal_id для правок и будет отказываться там, где не должна.
FAKE_DIARY = {"meals": [{"id": 1, "title": "Бутерброд с рыбой, голубика, наггетс",
                         "grams": 190, "kcal": 413, "slot": "lunch"}]}


def called_tools(text):
    """Какие инструменты выберет живая модель на этой фразе."""
    messages = [
        {"role": "system", "content": bot.AGENT_PLAN_SYSTEM},
        {"role": "user", "content": text},
        {"role": "system", "content": "today_diary: " + json.dumps(FAKE_DIARY, ensure_ascii=False)},
    ]
    out = bot.L.call_tools(messages, bot._agent_tools_spec(), [], 0.2, 480)
    if out is None:
        return None                       # провайдер недоступен — это не результат теста
    return [((c.get("function") or {}).get("name") or "") for c in (out.get("tool_calls") or [])]


def run_case(text, expect_tool, forbid_write, repeat):
    hits, errors = 0, 0
    picked = Counter()
    for _ in range(repeat):
        tools = called_tools(text)
        if tools is None:
            errors += 1
            continue
        writes = [t for t in tools if t in bot._WRITE_TOOLS]
        picked.update(writes or ["<нет записи>"])
        ok = (not writes) if forbid_write else (expect_tool in tools)
        hits += int(ok)
    return hits, errors, picked


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--repeat", type=int, default=1, help="прогонов на фразу (модель недетерминирована)")
    ap.add_argument("--only", default="", help="подстрока id кейса")
    ap.add_argument("--min-accuracy", type=float, default=0.0, help="ниже — ненулевой код возврата")
    args = ap.parse_args()

    cases = (
        [(c[0], c[1], OP_TO_TOOL[c[2]], False) for c in MUST_WRITE]
        + [(c[0], c[1], OP_TO_TOOL[c[2]], False) for c in KNOWN_BUGS]
        + [(c[0], c[1], None, True) for c in MUST_NOT_WRITE]
    )
    if args.only:
        cases = [c for c in cases if args.only in c[0]]
    if not cases:
        print("нет подходящих кейсов"); return 2

    total = hit = err = 0
    failures = []
    for case_id, text, expect_tool, forbid in cases:
        hits, errors, picked = run_case(text, expect_tool, forbid, args.repeat)
        runs = args.repeat - errors
        total += runs; hit += hits; err += errors
        if not runs:
            mark = "skip"          # провайдер не ответил — это не суждение о модели
        elif hits == runs:
            mark = "ok  "
        elif hits:
            mark = "~   "
        else:
            mark = "FAIL"
        detail = ", ".join(f"{k}×{v}" for k, v in picked.most_common(3))
        print(f"{mark} {case_id:<28} {hits}/{runs or 0}  {detail}")
        if runs and hits < runs:
            failures.append((case_id, text,
                             ("не должна писать" if forbid else f"ожидался {expect_tool}"), detail))

    acc = (hit / total) if total else 0.0
    print(f"\nТочность выбора инструмента: {hit}/{total} = {acc:.1%}"
          + (f"   (провайдер не ответил: {err})" if err else ""))
    if failures:
        print("\nРасхождения — их разбирать вручную, это качество промпта, а не кода:")
        for case_id, text, want, got in failures:
            print(f"  {case_id}: «{text}»\n      {want}; модель выбрала: {got}")
    if args.min_accuracy and acc < args.min_accuracy:
        print(f"\nНиже порога {args.min_accuracy:.0%}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
