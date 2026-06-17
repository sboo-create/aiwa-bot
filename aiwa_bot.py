# -*- coding: utf-8 -*-
"""
Айва (AIWA) — Telegram-бот: проактивная сводка по циклу + кнопки, меню, саджесты и Q&A на OSS-модели.
Запуск: BOT_TOKEN=... GROQ_API_KEY=... python aiwa_bot.py
"""
import os, sqlite3, logging
from datetime import datetime, date, time as dtime
from zoneinfo import ZoneInfo

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (Application, CommandHandler, MessageHandler,
                          CallbackQueryHandler, ContextTypes, filters)

import cycle as C
import llm as L

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("aiwa")

TZ = ZoneInfo(os.environ.get("AIWA_TZ", "Europe/Moscow"))
DB = os.environ.get("AIWA_DB", "aiwa.db")
DISCLAIMER = "Айва не ставит диагнозы; при тревожных симптомах — к гинекологу."

# саджесты по фазам (короткие коды для callback_data)
SUGGEST = {
    "menstrual":  [("s1", "Почему мало сил?"), ("s2", "Что есть при месячных?"), ("s3", "Можно тренироваться?")],
    "follicular": [("s1", "Почему много энергии?"), ("s2", "Что есть сейчас?"), ("s3", "Какая тренировка лучше?")],
    "ovulation":  [("s1", "Почему пик энергии?"), ("s2", "Что есть в овуляцию?"), ("s3", "Можно HIIT?")],
    "luteal":     [("s1", "Почему тянет на сладкое?"), ("s2", "Что съесть вечером?"), ("s3", "Когда месячные?")],
}

# ---------- DB ----------
def db():
    c = sqlite3.connect(DB)
    c.execute("""CREATE TABLE IF NOT EXISTS users(
        chat_id INTEGER PRIMARY KEY, last_period TEXT, cycle_len INTEGER,
        send_time TEXT DEFAULT '08:00', modules TEXT DEFAULT 'phase,general,food,training',
        state TEXT, pending_date TEXT, created TEXT)""")
    for col in ("state TEXT", "pending_date TEXT"):
        try: c.execute(f"ALTER TABLE users ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    return c

def row(chat_id):
    c = db(); r = c.execute("SELECT chat_id,last_period,cycle_len,send_time,modules,state,pending_date "
                            "FROM users WHERE chat_id=?", (chat_id,)).fetchone(); c.close()
    if not r: return None
    return {"chat_id": r[0], "last_period": r[1], "cycle_len": r[2], "send_time": r[3],
            "modules": (r[4] or "phase,general,food,training").split(","), "state": r[5], "pending_date": r[6]}

def upsert(chat_id, **kw):
    c = db()
    if not c.execute("SELECT 1 FROM users WHERE chat_id=?", (chat_id,)).fetchone():
        c.execute("INSERT INTO users(chat_id,created) VALUES(?,?)", (chat_id, datetime.now().isoformat()))
    for k, v in kw.items():
        c.execute(f"UPDATE users SET {k}=? WHERE chat_id=?", (v, chat_id))
    c.commit(); c.close()

def all_users():
    c = db(); rows = c.execute("SELECT chat_id FROM users WHERE last_period IS NOT NULL").fetchall(); c.close()
    return [x[0] for x in rows]

def del_user(chat_id):
    c = db(); c.execute("DELETE FROM users WHERE chat_id=?", (chat_id,)); c.commit(); c.close()

# ---------- helpers ----------
def parse_date(text):
    text = text.strip().replace("/", ".").replace("-", ".")
    for fmt in ("%d.%m.%Y", "%Y.%m.%d", "%d.%m.%y", "%d.%m"):
        try:
            d = datetime.strptime(text, fmt).date()
            if fmt == "%d.%m": d = d.replace(year=date.today().year)
            if d > date.today(): d = d.replace(year=d.year - 1)
            return d
        except ValueError:
            continue
    return None

def is_onboarded(u): return u and u.get("last_period") and u.get("cycle_len")

def status_of(chat_id):
    u = row(chat_id)
    if not is_onboarded(u): return None, None
    return u, C.cycle_status(date.fromisoformat(u["last_period"]), u["cycle_len"])

def main_kb():
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("🥗 Питание", callback_data="sec:food"),
         InlineKeyboardButton("🏋️ Нагрузка", callback_data="sec:training")],
        [InlineKeyboardButton("🩸 Фаза и прогноз", callback_data="sec:phase"),
         InlineKeyboardButton("🤔 Спросить Айву", callback_data="ask")],
        [InlineKeyboardButton("⏰ Время рассылки", callback_data="set:time")],
    ])

def suggest_kb(phase):
    btns = [InlineKeyboardButton(t, callback_data=f"q:{code}") for code, t in SUGGEST.get(phase, [])]
    rows = [btns[i:i+1] for i in range(len(btns))]  # по одной в ряд (длинный текст)
    rows.append([InlineKeyboardButton("☰ Меню", callback_data="menu")])
    return InlineKeyboardMarkup(rows)

async def send_summary(bot, chat_id):
    u, st = status_of(chat_id)
    if not st: return
    body = L.generate_summary(st, u["modules"])
    await bot.send_message(chat_id, f"{body}\n\n— Айва · {DISCLAIMER}", reply_markup=main_kb())

def schedule_daily(app, chat_id, hhmm):
    for j in app.job_queue.get_jobs_by_name(str(chat_id)): j.schedule_removal()
    h, m = map(int, hhmm.split(":"))
    app.job_queue.run_daily(daily_job, time=dtime(h, m, tzinfo=TZ), chat_id=chat_id, name=str(chat_id))

async def daily_job(context: ContextTypes.DEFAULT_TYPE):
    await send_summary(context.bot, context.job.chat_id)

# ---------- commands ----------
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    cid = update.effective_chat.id
    upsert(cid, state="await_date", pending_date=None)
    await update.message.reply_text(
        "Привет, я Айва (AIWA) 🌸 Каждое утро собираю короткую сводку по циклу: фаза, питание и тренировки под неё, "
        "плюс отвечаю на вопросы.\n\nКогда начались твои последние месячные? Напиши дату, например 25.05.2026.")

async def today(update: Update, context: ContextTypes.DEFAULT_TYPE):
    _, st = status_of(update.effective_chat.id)
    if not st:
        await update.message.reply_text("Сначала короткий онбординг: /start"); return
    await send_summary(context.bot, update.effective_chat.id)

async def menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_onboarded(row(update.effective_chat.id)):
        await update.message.reply_text("Сначала /start"); return
    await update.message.reply_text("Что показать?", reply_markup=main_kb())

async def set_time_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    cid = update.effective_chat.id
    if not is_onboarded(row(cid)):
        await update.message.reply_text("Сначала /start"); return
    if not context.args:
        await update.message.reply_text("Укажи время: /time 09:30"); return
    try:
        h, m = map(int, context.args[0].split(":")); assert 0 <= h < 24 and 0 <= m < 60
    except Exception:
        await update.message.reply_text("Формат: /time 09:30"); return
    upsert(cid, send_time=f"{h:02d}:{m:02d}")
    schedule_daily(context.application, cid, f"{h:02d}:{m:02d}")
    await update.message.reply_text(f"⏰ Время сводки обновлено на {h:02d}:{m:02d} (МСК).")

async def stop(update: Update, context: ContextTypes.DEFAULT_TYPE):
    cid = update.effective_chat.id
    for j in context.application.job_queue.get_jobs_by_name(str(cid)): j.schedule_removal()
    del_user(cid)
    await update.message.reply_text("Отключила сводки и удалила данные. Вернуться: /start")

async def help_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Айва — сводка по циклу.\n/start — настроить\n/today — сводка\n"
                                    "/menu — кнопки\n/time 09:30 — время\n/stop — отключить\n\n" + DISCLAIMER)

# ---------- text ----------
async def on_text(update: Update, context: ContextTypes.DEFAULT_TYPE):
    cid = update.effective_chat.id
    u = row(cid); state = u["state"] if u else None
    txt = update.message.text.strip()

    if state == "await_date":
        d = parse_date(txt)
        if not d:
            await update.message.reply_text("Не разобрала дату. Формат: ДД.ММ.ГГГГ, например 25.05.2026."); return
        upsert(cid, pending_date=d.isoformat(), state="await_len")
        await update.message.reply_text("Поняла. Средняя длина цикла в днях? (обычно 21–35, по умолчанию 28)"); return

    if state == "await_len":
        try:
            n = int(txt); assert 20 <= n <= 40
        except (ValueError, AssertionError):
            await update.message.reply_text("Нужно число 20–40. Не знаешь — напиши 28."); return
        upsert(cid, last_period=u["pending_date"], cycle_len=n, state=None, pending_date=None)
        schedule_daily(context.application, cid, u["send_time"] or "08:00")
        await update.message.reply_text("Готово! Сводка будет приходить каждое утро в 08:00 (МСК). Время: /time 09:30")
        await send_summary(context.bot, cid); return

    # свободный вопрос (онбординг пройден или режим await_question)
    if state == "await_question" or is_onboarded(u):
        if state == "await_question": upsert(cid, state=None)
        _, st = status_of(cid)
        if not st:
            await update.message.reply_text("Сначала /start"); return
        await context.bot.send_chat_action(cid, "typing")
        ans = L.answer_question(st, txt)
        await update.message.reply_text(ans, reply_markup=suggest_kb(st["phase"]))
        return

    await update.message.reply_text("Давай настроимся: набери /start")

# ---------- callbacks ----------
async def on_cb(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query
    await q.answer()
    cid = q.message.chat.id
    data = q.data
    u, st = status_of(cid)
    if not st:
        await q.message.reply_text("Сначала /start"); return

    if data.startswith("sec:"):
        await q.message.reply_text(L.section_text(st, data.split(":")[1]), reply_markup=suggest_kb(st["phase"]))
    elif data == "ask":
        upsert(cid, state="await_question")
        await q.message.reply_text("Напиши свой вопрос Айве — отвечу с учётом твоей фазы.")
    elif data == "menu":
        await q.message.reply_text("Что показать?", reply_markup=main_kb())
    elif data == "set:time":
        await q.message.reply_text("Отправь время в формате: /time 09:30")
    elif data.startswith("q:"):
        code = data.split(":")[1]
        question = dict(SUGGEST.get(st["phase"], [])).get(code, "Расскажи про эту фазу")
        await context.bot.send_chat_action(cid, "typing")
        ans = L.answer_question(st, question)
        await q.message.reply_text(f"❓ {question}\n\n{ans}", reply_markup=suggest_kb(st["phase"]))

async def on_startup(app: Application):
    n = 0
    for cid in all_users():
        schedule_daily(app, cid, row(cid)["send_time"] or "08:00"); n += 1
    log.info("Rescheduled daily jobs for %d users", n)

def main():
    app = Application.builder().token(os.environ["BOT_TOKEN"]).post_init(on_startup).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("today", today))
    app.add_handler(CommandHandler("summary", today))
    app.add_handler(CommandHandler("menu", menu))
    app.add_handler(CommandHandler("time", set_time_cmd))
    app.add_handler(CommandHandler("stop", stop))
    app.add_handler(CommandHandler("help", help_cmd))
    app.add_handler(CallbackQueryHandler(on_cb))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, on_text))
    log.info("AIWA bot starting...")
    app.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
