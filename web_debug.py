#!/usr/bin/env python3
"""Run AIWA's real web backend locally with an isolated debug user."""
import asyncio
import os
import sys
from datetime import date, timedelta
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
os.environ.setdefault("AIWA_WEB_DEBUG", "1")
os.environ.setdefault("AIWA_WEB_DEBUG_USER", "-910001")
os.environ.setdefault("AIWA_DB", str(BASE_DIR / ".aiwa-web-debug.db"))


def load_dotenv():
    """Подхватываем .env рядом со стендом: BOT_TOKEN нужен, чтобы проверять подпись
    initData и писать в чат (переход по маскоту). Переменные окружения главнее файла."""
    path = BASE_DIR / ".env"
    if not path.exists():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip().strip("'\""))


load_dotenv()

from aiohttp import web

import aiwa_bot as A


def seed_user(cid):
    """Create realistic history once; subsequent browser edits stay persistent."""
    if A.row(cid):
        return cid

    current_start = date.today() - timedelta(days=16)
    gaps = [31, 28, 30, 29]
    starts = [current_start]
    for gap in gaps:
        starts.append(starts[-1] - timedelta(days=gap))
    starts.reverse()

    for start in starts:
        A.cyc_add(cid, start.isoformat(), (start + timedelta(days=4)).isoformat())

    A.upsert(
        cid,
        last_period=current_start.isoformat(),
        cycle_len=29,
        mode="cycle",
        period_end=(current_start + timedelta(days=4)).isoformat(),
        period_len=5,
        height=168,
        weight=62,
        age=29,
        activity=2,
        kcal_goal=1800,
        send_time="08:00",
    )

    sample_logs = [
        (0, 2, 3, "bloat"),
        (1, 2, 2, "tired"),
        (3, 3, 3, ""),
        (6, 2, 2, "head"),
        (9, 3, 3, ""),
    ]
    for days_ago, energy, mood, symptoms in sample_logs:
        A.log_set(
            cid,
            (date.today() - timedelta(days=days_ago)).isoformat(),
            energy=energy,
            mood=mood,
            symptoms=symptoms,
        )

    today_meals = [
        {
            "title": "Омлет с овощами и сыром",
            "kcal": 370, "protein": 25, "fat": 21, "carbs": 18, "grams": 280,
            "items": [
                {"name": "Яйца", "grams": 120, "kcal": 190},
                {"name": "Овощи", "grams": 100, "kcal": 40},
                {"name": "Сыр", "grams": 30, "kcal": 110},
            ],
            "source": "photo", "slot": "breakfast",
        },
        {
            "title": "Курица с рисом и салатом",
            "kcal": 540, "protein": 42, "fat": 16, "carbs": 60, "grams": 420,
            "items": [
                {"name": "Куриная грудка", "grams": 180, "kcal": 280},
                {"name": "Рис", "grams": 150, "kcal": 200},
                {"name": "Салат", "grams": 90, "kcal": 60},
            ],
            "source": "text", "slot": "lunch",
        },
        {
            "title": "Греческий йогурт с ягодами",
            "kcal": 200, "protein": 18, "fat": 5, "carbs": 22, "grams": 220,
            "items": [
                {"name": "Йогурт", "grams": 170, "kcal": 130},
                {"name": "Ягоды", "grams": 50, "kcal": 70},
            ],
            "source": "manual", "slot": "snack",
        },
    ]
    for meal in today_meals:
        A.meal_add(cid, meal)

    # приёмы за прошлые дни для истории дневника
    A.meal_add(
        cid,
        {
            "title": "Рыба с картофелем",
            "kcal": 520, "protein": 34, "fat": 22, "carbs": 45, "grams": 380,
            "items": [{"name": "Лосось", "grams": 180, "kcal": 320}, {"name": "Картофель", "grams": 200, "kcal": 200}],
            "source": "photo", "slot": "dinner",
        },
        d=(date.today() - timedelta(days=1)).isoformat(),
    )

    workouts = [
        (0, {
            "type": "Ходьба", "items": [], "duration": "35 мин", "rpe": "Легко",
            "note": "Прогулка в парке",
            "review": "Мягкая нагрузка поддерживает восстановление.", "kcal": 135,
        }),
        (2, {
            "type": "Силовая",
            "items": [{"name": "Присед", "sets": 3}, {"name": "Тяга", "sets": 3}],
            "duration": "50 мин", "rpe": "Тяжело",
            "note": "Ноги и спина",
            "review": "Хорошая силовая в фолликулярную фазу.", "kcal": 320,
            "muscles": "Ноги, спина",
        }),
        (4, {
            "type": "Йога", "items": [{"name": "Хатха"}], "duration": "40 мин", "rpe": "Легко",
            "note": "Растяжка и дыхание",
            "review": "Мягкая практика для восстановления.", "kcal": 150,
        }),
    ]
    for days_ago, rec in workouts:
        A.workout_add(cid, rec, d=(date.today() - timedelta(days=days_ago)).isoformat())

    A.chatlog_add(cid, "ai", "Привет! Я вижу твой цикл и последние отметки. Что обсудим?")
    A.chatlog_add(cid, "user", "Что лучше поесть вечером?")
    A.chatlog_add(cid, "ai", "В фолликулярную фазу телу хорошо заходит белок и сложные углеводы: рыба или курица с гречкой и овощами.")
    return cid


def wipe_user(cid):
    """Удалить все данные пользователя из дебажной базы (для переcева)."""
    c = A.db()
    tables = [r[0] for r in c.execute("SELECT name FROM sqlite_master WHERE type='table'")]
    for table in tables:
        cols = {r[1] for r in c.execute(f"PRAGMA table_info({table})")}
        if "chat_id" in cols:
            c.execute(f"DELETE FROM {table} WHERE chat_id=?", (cid,))
    c.commit()
    c.close()


def seed_debug_user(reseed=False):
    cid = int(os.environ["AIWA_WEB_DEBUG_USER"])
    if reseed:
        wipe_user(cid)
        print(f"AIWA browser debug: wiped user {cid} before reseed", flush=True)
    return seed_user(cid)


def patch_telegram_stand():
    """Make the стенд usable when opened from the test Telegram Mini App.

    Мини-апп приходит с реальным Telegram-id, а не с `aiwa-local-debug`:
    - если подпись проверяется (задан BOT_TOKEN) — засеиваем демо-историю
      новому id, иначе виден только гейт онбординга;
    - если BOT_TOKEN не задан, подпись проверить нечем — сажаем гостя на
      тот же засеянный демо-аккаунт.
    """
    original = A._verify_init
    demo_cid = int(os.environ["AIWA_WEB_DEBUG_USER"])

    def verify_for_stand(init_data):
        cid = original(init_data)
        if cid is None and init_data and not os.environ.get("BOT_TOKEN"):
            print("AIWA browser debug: unverified initData -> demo user", flush=True)
            return demo_cid
        if cid and not A.row(cid):
            seed_user(cid)
            print(f"AIWA browser debug: seeded demo data for user {cid}", flush=True)
        return cid

    A._verify_init = verify_for_stand


async def main():
    reseed = "--reseed" in sys.argv or os.environ.get("AIWA_WEB_DEBUG_RESEED") == "1"
    cid = seed_debug_user(reseed=reseed)
    if os.environ.get("AIWA_WEB_DEBUG_TG_STAND", "1") == "1":
        patch_telegram_stand()
    if not os.environ.get("BOT_TOKEN"):
        print("AIWA browser debug: BOT_TOKEN не задан — подпись initData не проверяется, "
              "а переход по маскоту в чат не сработает: боту нечем написать первое "
              "сообщение и неоткуда взять свой юзернейм для ссылки t.me. "
              "Для теста в мини-аппе запускай стенд как: BOT_TOKEN=... python web_debug.py", flush=True)
    port = int(os.environ.get("PORT", "8080"))
    host = os.environ.get("AIWA_WEB_DEBUG_HOST", "127.0.0.1")
    if os.environ.get("BOT_TOKEN") and os.environ.get("AIWA_WEB_DEBUG_BOT", "1") == "1":
        # С токеном поднимаем и сам бот: без polling входящие сообщения никто не
        # разбирает и в чате бот молчит, хотя мини-апп и /api/* работают.
        print(f"AIWA browser debug: бот + веб на http://{host}:{port} (user {cid})", flush=True)
        await A.run_all(host=host)
        return
    runner = web.AppRunner(A.build_web())
    await runner.setup()
    site = web.TCPSite(runner, host, port)
    await site.start()
    print(f"AIWA browser debug: http://{host}:{port} (user {cid})")
    try:
        await asyncio.Event().wait()
    finally:
        await runner.cleanup()


if __name__ == "__main__":
    asyncio.run(main())
