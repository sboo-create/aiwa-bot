# -*- coding: utf-8 -*-
"""AIWA — Telegram-бот: проактивная сводка по циклу, инфографика, кнопки, динамические саджесты, Q&A на OSS-модели."""
import os, io, sqlite3, logging
from datetime import datetime, date, time as dtime
from zoneinfo import ZoneInfo

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (Application, CommandHandler, MessageHandler,
                          CallbackQueryHandler, ContextTypes, filters)

import cycle as C
import llm as L
try:
    import image as IMG
except Exception as e:
    IMG = None
    print("image module off:", e)

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("aiwa")
TZ = ZoneInfo(os.environ.get("AIWA_TZ", "Europe/Moscow"))
DB = os.environ.get("AIWA_DB", "aiwa.db")
SEP = "\x1f"
DISCLAIMER = "AIWA не ставит диагнозы; при тревожных симптомах обратись к гинекологу."

# ---------- DB ----------
def db():
    c = sqlite3.connect(DB)
    c.execute("""CREATE TABLE IF NOT EXISTS users(
        chat_id INTEGER PRIMARY KEY, last_period TEXT, cycle_len INTEGER,
        send_time TEXT DEFAULT '08:00', modules TEXT DEFAULT 'phase,general,food,training',
        state TEXT, pending_date TEXT, last_sugg TEXT, created TEXT)""")
    for col in ("state TEXT", "pending_date TEXT", "last_sugg TEXT"):
        try: c.execute(f"ALTER TABLE users ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    return c

def row(cid):
    c = db(); r = c.execute("SELECT chat_id,last_period,cycle_len,send_time,modules,state,pending_date,last_sugg "
                            "FROM users WHERE chat_id=?", (cid,)).fetchone(); c.close()
    if not r: return None
    return {"chat_id":r[0],"last_period":r[1],"cycle_len":r[2],"send_time":r[3],
            "modules":(r[4] or "phase,general,food,training").split(","),"state":r[5],"pending_date":r[6],
            "last_sugg":(r[7].split(SEP) if r[7] else [])}

def upsert(cid, **kw):
    c = db()
    if not c.execute("SELECT 1 FROM users WHERE chat_id=?", (cid,)).fetchone():
        c.execute("INSERT INTO users(chat_id,created) VALUES(?,?)", (cid, datetime.now().isoformat()))
    for k, v in kw.items():
        c.execute(f"UPDATE users SET {k}=? WHERE chat_id=?", (v, cid))
    c.commit(); c.close()

def all_users():
    c = db(); rows = c.execute("SELECT chat_id FROM users WHERE last_period IS NOT NULL").fetchall(); c.close()
    return [x[0] for x in rows]

def del_user(cid):
    c = db(); c.execute("DELETE FROM users WHERE chat_id=?", (cid,)); c.commit(); c.close()

# ---------- helpers ----------
def parse_date(t):
    t = t.strip().replace("/", ".").replace("-", ".")
    for fmt in ("%d.%m.%Y", "%Y.%m.%d", "%d.%m.%y", "%d.%m"):
        try:
            d = datetime.strptime(t, fmt).date()
            if fmt == "%d.%m": d = d.replace(year=date.today().year)
            if d > date.today(): d = d.replace(year=d.year - 1)
            return d
        except ValueError: continue
    return None

def is_onboarded(u): return u and u.get("last_period") and u.get("cycle_len")

def status_of(cid):
    u = row(cid)
    if not is_onboarded(u): return None, None
    return u, C.cycle_status(date.fromisoformat(u["last_period"]), u["cycle_len"])

def main_kb():
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("🥗 Питание", callback_data="sec:food"),
         InlineKeyboardButton("🏋️ Нагрузка", callback_data="sec:training")],
        [InlineKeyboardButton("📅 Календарь", callback_data="calendar"),
         InlineKeyboardButton("🤔 Спросить AIWA", callback_data="ask")],
        [InlineKeyboardButton("⏰ Время рассылки", callback_data="set:time")],
    ])

def sugg_kb(sugg):
    rows = [[InlineKeyboardButton(t, callback_data=f"fq:{i}")] for i, t in enumerate(sugg[:3])]
    rows.append([InlineKeyboardButton("☰ Меню", callback_data="menu")])
    return InlineKeyboardMarkup(rows)

async def send_infographic(bot, cid):
    if not IMG: return
    u, st = status_of(cid)
    if not st: return
    try:
        png = IMG.render_cycle(date.fromisoformat(u["last_period"]), u["cycle_len"], date.today())
        bio = io.BytesIO(png); bio.name = "cycle.png"
        await bot.send_photo(cid, photo=bio,
            caption=f"AIWA · {st['phase_ru'].lower()}, день {st['day']}. Месячные через ~{st['days_to_next']} дн.")
    except Exception as e:
        log.warning("infographic failed: %s", e)

async def send_answer(context, cid, text, st, basis_q):
    sugg = L.followups(st, basis_q, text)
    upsert(cid, last_sugg=SEP.join(sugg))
    await context.bot.send_message(cid, text, reply_markup=sugg_kb(sugg))

async def push_summary(context, cid, with_image=True):
    u, st = status_of(cid)
    if not st: return
    if with_image: await send_infographic(context.bot, cid)
    body = L.generate_summary(st, u["modules"])
    await context.bot.send_message(cid, f"{body}\n\n— AIWA · {DISCLAIMER}", reply_markup=main_kb())

def schedule_daily(app, cid, hhmm):
    for j in app.job_queue.get_jobs_by_name(str(cid)): j.schedule_removal()
    h, m = map(int, hhmm.split(":"))
    app.job_queue.run_daily(daily_job, time=dtime(h, m, tzinfo=TZ), chat_id=cid, name=str(cid))

async def daily_job(context: ContextTypes.DEFAULT_TYPE):
    await push_summary(context, context.job.chat_id)

# ---------- commands ----------
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    cid = update.effective_chat.id
    upsert(cid, state="await_date", pending_date=None)
    await update.message.reply_text(
        "Привет! Я AIWA, твой ИИ-ассистент по женскому здоровью. Каждое утро собираю короткую сводку под фазу цикла: "
        "что в теле, что есть и как тренироваться, и отвечаю на вопросы.\n\n"
        "Когда начались твои последние месячные? Напиши дату, например 25.05.2026.")

async def today(update: Update, context: ContextTypes.DEFAULT_TYPE):
    _, st = status_of(update.effective_chat.id)
    if not st:
        await update.message.reply_text("Сначала короткий онбординг: /start"); return
    await push_summary(context, update.effective_chat.id)

async def calendar_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    _, st = status_of(update.effective_chat.id)
    if not st:
        await update.message.reply_text("Сначала /start"); return
    await send_infographic(context.bot, update.effective_chat.id)

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
    await update.message.reply_text("AIWA — сводка по циклу.\n/start — настроить\n/today — сводка\n"
                                    "/calendar — инфографика\n/menu — кнопки\n/time 09:30 — время\n/stop — отключить")

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
        await update.message.reply_text("Поняла. Средняя длина цикла в днях? (обычно 21-35, по умолчанию 28)"); return
    if state == "await_len":
        try:
            n = int(txt); assert 20 <= n <= 40
        except (ValueError, AssertionError):
            await update.message.reply_text("Нужно число 20-40. Не знаешь — напиши 28."); return
        upsert(cid, last_period=u["pending_date"], cycle_len=n, state=None, pending_date=None)
        schedule_daily(context.application, cid, u["send_time"] or "08:00")
        await update.message.reply_text("Готово! Сводка будет приходить каждое утро в 08:00 (МСК). Время: /time 09:30")
        await push_summary(context, cid); return
    if is_onboarded(u):
        _, st = status_of(cid)
        await context.bot.send_chat_action(cid, "typing")
        ans = L.answer_question(st, txt)
        await send_answer(context, cid, ans, st, txt); return
    await update.message.reply_text("Давай настроимся: набери /start")

# ---------- callbacks ----------
async def on_cb(update: Update, context: ContextTypes.DEFAULT_TYPE):
    q = update.callback_query; await q.answer()
    cid = q.message.chat.id; data = q.data
    u, st = status_of(cid)
    if not st:
        await q.message.reply_text("Сначала /start"); return
    if data.startswith("sec:"):
        key = data.split(":")[1]; text = L.section_text(st, key)
        await q.message.reply_text(text)
        await send_answer(context, cid, "Что ещё подсказать по этой теме?", st, text)
    elif data == "calendar":
        await send_infographic(context.bot, cid)
    elif data == "ask":
        upsert(cid, state="await_question")
        await q.message.reply_text("Напиши свой вопрос AIWA, отвечу с учётом твоей фазы.")
    elif data == "menu":
        await q.message.reply_text("Что показать?", reply_markup=main_kb())
    elif data == "set:time":
        await q.message.reply_text("Отправь время в формате: /time 09:30")
    elif data.startswith("fq:"):
        i = int(data.split(":")[1]); sugg = u["last_sugg"]
        question = sugg[i] if i < len(sugg) else "Расскажи про эту фазу"
        await context.bot.send_chat_action(cid, "typing")
        ans = L.answer_question(st, question)
        await q.message.reply_text(f"❓ {question}")
        await send_answer(context, cid, ans, st, question)

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
    app.add_handler(CommandHandler("calendar", calendar_cmd))
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
