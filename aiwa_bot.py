# -*- coding: utf-8 -*-
"""AIWA — Telegram-бот: сводка по циклу, инфографика, чек-ин, история циклов, динамические саджесты."""
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
    IMG = None; print("image off:", e)

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("aiwa")
TZ = ZoneInfo(os.environ.get("AIWA_TZ", "Europe/Moscow"))
DB = os.environ.get("AIWA_DB", "aiwa.db")
if os.path.dirname(DB): os.makedirs(os.path.dirname(DB), exist_ok=True)
DISCLAIMER = "AIWA не ставит диагнозы; при тревожных симптомах обратись к гинекологу."
AIWA_ADMIN = os.environ.get("AIWA_ADMIN")
GUIDE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "guides")
GUIDES = [{"id":"cycle_length","title":"Сколько длится нормальный цикл","file":"cycle_length.png",
           "kw":["нормальн","сколько длит","длина цикл","норма цикл","цикл длит","какой цикл норм"]}]
def guide_by_id(gid): return next((g for g in GUIDES if g["id"]==gid), None)
def match_guide(text):
    t=text.lower()
    for g in GUIDES:
        if any(k in t for k in g["kw"]): return g
    return None
EN = {1:"низкая",2:"средняя",3:"высокая"}; MD = {1:"низкое",2:"нормальное",3:"хорошее"}
SYMPTOMS = [("cramps","спазмы"),("head","головная боль"),("bloat","вздутие"),
            ("sweet","тяга к сладкому"),("anx","тревожность"),("tired","усталость")]
SYM = dict(SYMPTOMS)

# ---------- DB ----------
def db():
    c = sqlite3.connect(DB, timeout=30)
    c.execute("PRAGMA journal_mode=WAL")
    c.execute("""CREATE TABLE IF NOT EXISTS users(chat_id INTEGER PRIMARY KEY, last_period TEXT, cycle_len INTEGER,
        send_time TEXT DEFAULT '08:00', modules TEXT DEFAULT 'phase,general,food,training',
        state TEXT, pending_date TEXT, created TEXT)""")
    c.execute("CREATE TABLE IF NOT EXISTS sugg(id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, q TEXT)")
    c.execute("CREATE TABLE IF NOT EXISTS cycles(chat_id INTEGER, start_date TEXT, PRIMARY KEY(chat_id,start_date))")
    c.execute("""CREATE TABLE IF NOT EXISTS logs(chat_id INTEGER, log_date TEXT, energy INTEGER, mood INTEGER,
        symptoms TEXT, PRIMARY KEY(chat_id,log_date))""")
    c.execute("""CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER,
        ts TEXT, action TEXT, tokens INTEGER DEFAULT 0)""")
    for col in ("state TEXT", "pending_date TEXT"):
        try: c.execute(f"ALTER TABLE users ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    return c

def row(cid):
    c = db(); r = c.execute("SELECT chat_id,last_period,cycle_len,send_time,modules,state,pending_date FROM users WHERE chat_id=?",(cid,)).fetchone(); c.close()
    if not r: return None
    return {"chat_id":r[0],"last_period":r[1],"cycle_len":r[2],"send_time":r[3],
            "modules":(r[4] or "phase,general,food,training").split(","),"state":r[5],"pending_date":r[6]}

def upsert(cid, **kw):
    c = db()
    if not c.execute("SELECT 1 FROM users WHERE chat_id=?", (cid,)).fetchone():
        c.execute("INSERT INTO users(chat_id,created) VALUES(?,?)", (cid, datetime.now().isoformat()))
    for k, v in kw.items(): c.execute(f"UPDATE users SET {k}=? WHERE chat_id=?", (v, cid))
    c.commit(); c.close()

def add_sugg(cid, q):
    c = db(); sid = c.execute("INSERT INTO sugg(chat_id,q) VALUES(?,?)", (cid, q)).lastrowid; c.commit(); c.close(); return sid
def get_sugg(sid):
    c = db(); r = c.execute("SELECT q FROM sugg WHERE id=?", (sid,)).fetchone(); c.close(); return r[0] if r else None
def ev(cid, action, tokens=0):
    c = db(); c.execute("INSERT INTO events(chat_id,ts,action,tokens) VALUES(?,?,?,?)",
        (cid, datetime.now().isoformat(), action, int(tokens))); c.commit(); c.close()

def cyc_add(cid, d):
    c = db(); c.execute("INSERT OR IGNORE INTO cycles(chat_id,start_date) VALUES(?,?)", (cid, d)); c.commit(); c.close()
def cyc_list(cid):
    c = db(); rows = c.execute("SELECT start_date FROM cycles WHERE chat_id=? ORDER BY start_date", (cid,)).fetchall(); c.close()
    return [r[0] for r in rows]

def log_get(cid, d):
    c = db(); r = c.execute("SELECT energy,mood,symptoms FROM logs WHERE chat_id=? AND log_date=?", (cid, d)).fetchone(); c.close()
    return {"energy":r[0],"mood":r[1],"symptoms":(r[2].split(",") if r[2] else [])} if r else None
def log_ensure(cid, d):
    c = db(); c.execute("INSERT OR IGNORE INTO logs(chat_id,log_date,symptoms) VALUES(?,?,'')", (cid, d)); c.commit(); c.close()
def log_set(cid, d, **kw):
    log_ensure(cid, d); c = db()
    for k, v in kw.items(): c.execute(f"UPDATE logs SET {k}=? WHERE chat_id=? AND log_date=?", (v, cid, d))
    c.commit(); c.close()
def log_toggle(cid, d, code):
    lg = log_get(cid, d) or {"symptoms":[]}; s = set(lg["symptoms"])
    s.symmetric_difference_update({code}); log_set(cid, d, symptoms=",".join(sorted(s)))
def last_hint(cid):
    c = db(); r = c.execute("SELECT energy,symptoms FROM logs WHERE chat_id=? AND energy IS NOT NULL ORDER BY log_date DESC LIMIT 1",(cid,)).fetchone(); c.close()
    if not r: return None
    parts = []
    if r[0]: parts.append(f"энергия {EN.get(r[0],'')}")
    if r[1]: parts.append("симптомы: " + ", ".join(SYM.get(x,x) for x in r[1].split(",") if x))
    return "; ".join(parts) or None

def all_users():
    c = db(); rows = c.execute("SELECT chat_id FROM users WHERE last_period IS NOT NULL").fetchall(); c.close(); return [x[0] for x in rows]
def del_user(cid):
    c = db()
    for t in ("users","cycles","logs"): c.execute(f"DELETE FROM {t} WHERE chat_id=?", (cid,))
    c.commit(); c.close()

# ---------- helpers ----------
def parse_date(t):
    t = t.strip().replace("/", ".").replace("-", ".")
    for fmt in ("%d.%m.%Y","%Y.%m.%d","%d.%m.%y","%d.%m"):
        try:
            d = datetime.strptime(t, fmt).date()
            if fmt == "%d.%m": d = d.replace(year=date.today().year)
            if d > date.today(): d = d.replace(year=d.year-1)
            return d
        except ValueError: continue
    return None
def is_onboarded(u): return u and u.get("last_period") and u.get("cycle_len")
def status_of(cid):
    u = row(cid)
    if not is_onboarded(u): return None, None
    return u, C.cycle_status(date.fromisoformat(u["last_period"]), u["cycle_len"])

MENU_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Питание", callback_data="sec:food"), InlineKeyboardButton("Нагрузка", callback_data="sec:training")],
    [InlineKeyboardButton("Календарь", callback_data="calendar"), InlineKeyboardButton("Чек-ин", callback_data="checkin")],
    [InlineKeyboardButton("Отметить месячные", callback_data="period"), InlineKeyboardButton("Спросить AIWA", callback_data="ask")],
    [InlineKeyboardButton("Гид по циклу", callback_data="guides")],
    [InlineKeyboardButton("Время рассылки", callback_data="set:time")],
])
GATE_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Начать", callback_data="go_start")]])
def time_kb():
    times=["07:00","08:00","09:00","10:00","21:00","22:00"]
    return InlineKeyboardMarkup([[InlineKeyboardButton(t, callback_data=f"tm:{t}") for t in times[i:i+3]] for i in (0,3)])

async def send_guide(context, cid, g):
    path = os.path.join(GUIDE_DIR, g["file"])
    if not os.path.exists(path):
        return await context.bot.send_message(cid, "Этот гид скоро появится.")
    with open(path, "rb") as fh:
        await context.bot.send_photo(cid, photo=fh, caption=g["title"])

def sugg_kb(cid, items):
    rows = [[InlineKeyboardButton(t, callback_data=f"q:{add_sugg(cid,t)}")] for t in items[:3]]
    rows.append([InlineKeyboardButton("Меню", callback_data="menu")]); return InlineKeyboardMarkup(rows)
def en_kb(p): return InlineKeyboardMarkup([[InlineKeyboardButton(EN[i].capitalize(), callback_data=f"ci:{p}:{i}") for i in (1,2,3)]])
def sym_kb(selected):
    rows = [[InlineKeyboardButton(("✓ " if code in selected else "") + ru, callback_data=f"ci:s:{code}")] for code, ru in SYMPTOMS]
    rows.append([InlineKeyboardButton("Готово", callback_data="ci:done")]); return InlineKeyboardMarkup(rows)

async def need_onboard(t):
    await t.reply_text("Чтобы рекомендации были точными, сначала введи свои данные: дату последних месячных и длину цикла. 20 секунд.", reply_markup=GATE_KB)
async def begin_onboard(cid, msg):
    upsert(cid, state="await_date", pending_date=None)
    await msg.reply_text("Когда начались твои последние месячные? Напиши дату, например 25.05.2026.")

async def send_infographic(bot, cid):
    if not IMG: return
    u, st = status_of(cid)
    if not st: return
    try:
        png = IMG.render_cycle(date.fromisoformat(u["last_period"]), u["cycle_len"], date.today())
        bio = io.BytesIO(png); bio.name = "cycle.png"
        await bot.send_photo(cid, photo=bio, caption=f"AIWA · {st['subphase']} {st['phase_ru'].lower()}, день {st['day']}. Месячные через ~{st['days_to_next']} дн.")
    except Exception as e: log.warning("infographic: %s", e)

async def send_answer(context, cid, text, st, basis_q, usage=None):
    if usage is None: usage = []
    kb = sugg_kb(cid, L.followups(st, basis_q, text, usage=usage))
    await context.bot.send_message(cid, text, reply_markup=kb)
    ev(cid, "tokens", sum(usage))

async def send_delay(context, cid, st):
    if IMG:
        try:
            bio = io.BytesIO(IMG.render_delay(st)); bio.name = "delay.png"
            await context.bot.send_photo(cid, photo=bio)
        except Exception as e: log.warning("delay img: %s", e)
    msgs = {
      "due":"Месячные ожидаются примерно сейчас. Если уже начались, отметь их кнопкой ниже. Небольшая задержка бывает нормой.",
      "delay":f"Задержка {st['delay_days']} дней. Если был незащищённый секс, имеет смысл сделать тест на ХГЧ (струйный или полоска): он информативен с первого дня задержки, точнее через 3-5 дней. Если задержка растёт или есть тревожные симптомы, обратись к гинекологу. Когда месячные начнутся, отметь кнопкой ниже.",
      "stale":f"С последних отмеченных месячных прошло {st['days_since']} дней, данные похоже устарели. Отметь дату последних месячных. Если менструации нет дольше обычного, обратись к гинекологу."}
    kb = InlineKeyboardMarkup([[InlineKeyboardButton("Отметить месячные", callback_data="period")],
                               [InlineKeyboardButton("Меню", callback_data="menu")]])
    await context.bot.send_message(cid, msgs.get(st["status"], "") + "\n\n— AIWA · " + DISCLAIMER, reply_markup=kb)

async def push_summary(context, cid, with_image=True):
    u, st = status_of(cid)
    if not st: return
    if st["status"] != "normal": return await send_delay(context, cid, st)
    if with_image: await send_infographic(context.bot, cid)
    usage = []
    body = L.generate_summary(st, u["modules"], hint=last_hint(cid), usage=usage)
    kb = sugg_kb(cid, L.followups(st, "утренняя сводка", body, usage=usage))
    await context.bot.send_message(cid, f"{body}\n\n— AIWA · {DISCLAIMER}", reply_markup=kb)
    ev(cid, "tokens", sum(usage))

def schedule_daily(app, cid, hhmm):
    for j in app.job_queue.get_jobs_by_name(str(cid)): j.schedule_removal()
    h, m = map(int, hhmm.split(":")); app.job_queue.run_daily(daily_job, time=dtime(h, m, tzinfo=TZ), chat_id=cid, name=str(cid))
async def daily_job(context: ContextTypes.DEFAULT_TYPE): await push_summary(context, context.job.chat_id)

# ---------- commands ----------
async def start(update, context):
    cid = update.effective_chat.id
    await update.message.reply_text("Привет! Я AIWA, твой ИИ-ассистент по женскому здоровью. Каждое утро собираю короткую сводку под фазу цикла: что в теле, что есть и как тренироваться, и отвечаю на вопросы.")
    await begin_onboard(cid, update.message)
async def today(update, context):
    ev(update.effective_chat.id, "command")
    _, st = status_of(update.effective_chat.id)
    if not st: return await need_onboard(update.message)
    await push_summary(context, update.effective_chat.id)
async def calendar_cmd(update, context):
    ev(update.effective_chat.id, "command")
    _, st = status_of(update.effective_chat.id)
    if not st: return await need_onboard(update.message)
    if st["status"] != "normal": return await send_delay(context, update.effective_chat.id, st)
    await send_infographic(context.bot, update.effective_chat.id)
async def menu(update, context):
    ev(update.effective_chat.id, "command")
    if not is_onboarded(row(update.effective_chat.id)): return await need_onboard(update.message)
    await update.message.reply_text("Что показать?", reply_markup=MENU_KB)
async def checkin_cmd(update, context):
    ev(update.effective_chat.id, "command")
    cid = update.effective_chat.id
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    log_ensure(cid, date.today().isoformat())
    await update.message.reply_text("Чек-ин на сегодня. Какая энергия?", reply_markup=en_kb("e"))
async def period_cmd(update, context):
    ev(update.effective_chat.id, "command")
    cid = update.effective_chat.id
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    d = (parse_date(context.args[0]) if context.args else date.today()) or date.today()
    cyc_add(cid, d.isoformat()); upsert(cid, last_period=d.isoformat())
    schedule_daily(context.application, cid, row(cid)["send_time"] or "08:00")
    await update.message.reply_text(f"Отметила начало месячных: {d.strftime('%d.%m.%Y')}. Историю учту в прогнозе и динамике.")
async def set_time_cmd(update, context):
    ev(update.effective_chat.id, "command")
    cid = update.effective_chat.id
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    if not context.args: return await update.message.reply_text("Укажи время: /time 09:30")
    try:
        h, m = map(int, context.args[0].split(":")); assert 0<=h<24 and 0<=m<60
    except Exception: return await update.message.reply_text("Формат: /time 09:30")
    upsert(cid, send_time=f"{h:02d}:{m:02d}"); schedule_daily(context.application, cid, f"{h:02d}:{m:02d}")
    await update.message.reply_text(f"Время сводки обновлено на {h:02d}:{m:02d} (МСК).")
async def stop(update, context):
    cid = update.effective_chat.id
    for j in context.application.job_queue.get_jobs_by_name(str(cid)): j.schedule_removal()
    del_user(cid); await update.message.reply_text("Отключила сводки и удалила данные. Вернуться: /start")
async def guide_cmd(update, context):
    ev(update.effective_chat.id, "command")
    if len(GUIDES)==1:
        return await send_guide(context, update.effective_chat.id, GUIDES[0])
    kb=InlineKeyboardMarkup([[InlineKeyboardButton(g["title"], callback_data=f"g:{g['id']}")] for g in GUIDES])
    await update.message.reply_text("Гиды по циклу:", reply_markup=kb)

async def help_cmd(update, context):
    await update.message.reply_text("AIWA — сводка по циклу.\n/start — настроить\n/today — сводка\n/calendar — инфографика\n/checkin — чек-ин\n/period — отметить месячные\n/menu — кнопки\n/time 09:30 — время\n/stop — отключить")

# ---------- text ----------
async def on_text(update, context):
    cid = update.effective_chat.id; u = row(cid); state = u["state"] if u else None; txt = update.message.text.strip()
    if state == "await_date":
        d = parse_date(txt)
        if not d: return await update.message.reply_text("Не разобрала дату. Формат: ДД.ММ.ГГГГ, например 25.05.2026.")
        upsert(cid, pending_date=d.isoformat(), state="await_len")
        return await update.message.reply_text("Поняла. Средняя длина цикла в днях? (обычно 21-35, по умолчанию 28)")
    if state == "await_len":
        try:
            n = int(txt); assert 20<=n<=40
        except (ValueError, AssertionError): return await update.message.reply_text("Нужно число 20-40. Не знаешь — напиши 28.")
        upsert(cid, last_period=u["pending_date"], cycle_len=n, state=None, pending_date=None)
        cyc_add(cid, u["pending_date"]); schedule_daily(context.application, cid, u["send_time"] or "08:00")
        await update.message.reply_text("Готово! Сводка будет приходить каждое утро в 08:00 (МСК). Время: /time 09:30")
        return await push_summary(context, cid)
    if is_onboarded(u):
        _, st = status_of(cid); await context.bot.send_chat_action(cid, "typing")
        ev(cid, "manual")
        g = match_guide(txt)
        if g: await send_guide(context, cid, g)
        usage = []
        ans = L.answer_question(st, txt, usage=usage)
        return await send_answer(context, cid, ans, st, txt, usage=usage)
    await need_onboard(update.message)

# ---------- callbacks ----------
async def on_cb(update, context):
    q = update.callback_query; await q.answer(); cid = q.message.chat.id; data = q.data
    if data == "go_start": return await begin_onboard(cid, q.message)
    ev(cid, "suggest" if data.startswith("q:") else "button")
    u, st = status_of(cid)
    if not st: return await need_onboard(q.message)
    today_s = date.today().isoformat()
    if data == "menu":
        await q.message.reply_text("Что показать?", reply_markup=MENU_KB)
    elif data.startswith("sec:"):
        text = L.section_text(st, data.split(":")[1]); await send_answer(context, cid, text, st, text)
    elif data == "calendar":
        await send_infographic(context.bot, cid)
    elif data == "guides":
        if len(GUIDES)==1: await send_guide(context, cid, GUIDES[0])
        else:
            kb=InlineKeyboardMarkup([[InlineKeyboardButton(g["title"], callback_data=f"g:{g['id']}")] for g in GUIDES])
            await q.message.reply_text("Гиды по циклу:", reply_markup=kb)
    elif data.startswith("g:"):
        g=guide_by_id(data.split(":",1)[1])
        if g: await send_guide(context, cid, g)
    elif data == "ask":
        upsert(cid, state="await_question"); await q.message.reply_text("Напиши свой вопрос AIWA, отвечу с учётом твоей фазы.")
    elif data == "checkin":
        log_ensure(cid, today_s); await q.message.reply_text("Чек-ин на сегодня. Какая энергия?", reply_markup=en_kb("e"))
    elif data == "period":
        cyc_add(cid, today_s); upsert(cid, last_period=today_s); schedule_daily(context.application, cid, u["send_time"] or "08:00")
        await q.message.reply_text("Отметила начало месячных сегодня. Учту в прогнозе и динамике.")
    elif data == "set:time":
        await q.message.reply_text("Во сколько присылать сводку (МСК)?", reply_markup=time_kb())
    elif data.startswith("tm:"):
        hhmm = data.split(":", 1)[1]
        upsert(cid, send_time=hhmm); schedule_daily(context.application, cid, hhmm)
        await q.message.reply_text(f"Время сводки: {hhmm} (МСК).")
    elif data.startswith("ci:e:"):
        log_set(cid, today_s, energy=int(data.split(":")[2]))
        await q.edit_message_text("Настроение?", reply_markup=en_kb("m"))
    elif data.startswith("ci:m:"):
        log_set(cid, today_s, mood=int(data.split(":")[2]))
        await q.edit_message_text("Что беспокоит сегодня? Можно несколько, потом Готово.", reply_markup=sym_kb(set()))
    elif data.startswith("ci:s:"):
        log_toggle(cid, today_s, data.split(":")[2])
        sel = set((log_get(cid, today_s) or {}).get("symptoms", []))
        await q.edit_message_reply_markup(reply_markup=sym_kb(sel))
    elif data == "ci:done":
        await q.edit_message_text("Записала чек-ин. Учту в завтрашней сводке и в динамике.")
    elif data.startswith("q:"):
        question = get_sugg(int(data.split(":")[1])) or "Расскажи про эту фазу"
        await context.bot.send_chat_action(cid, "typing")
        usage = []; ans = L.answer_question(st, question, usage=usage)
        await q.message.reply_text(f"❓ {question}")
        await send_answer(context, cid, ans, st, question, usage=usage)

async def on_startup(app):
    n = 0
    for cid in all_users(): schedule_daily(app, cid, row(cid)["send_time"] or "08:00"); n += 1
    log.info("Rescheduled %d", n)


def aggregate_stats():
    from collections import defaultdict
    import statistics as ST
    c=db(); n_users=c.execute("SELECT COUNT(*) FROM users").fetchone()[0]
    rows=c.execute("SELECT chat_id,ts,action,tokens FROM events ORDER BY chat_id,ts").fetchall(); c.close()
    byu=defaultdict(list)
    for cid,ts,action,tok in rows: byu[cid].append((datetime.fromisoformat(ts),action,tok or 0))
    actions={"manual":0,"suggest":0,"button":0,"command":0}; tokens=0; msgs=0
    sessions=0; slens=[]; sev=[]; active7=set(); now=datetime.now(); GAP=1800
    for cid,evs in byu.items():
        cur=[]
        for t,a,tok in evs:
            if a=="tokens": tokens+=tok; continue
            if a in actions: actions[a]+=1; msgs+=1
            if (now-t).days<7: active7.add(cid)
            if cur and (t-cur[-1]).total_seconds()>GAP:
                sessions+=1; slens.append((cur[-1]-cur[0]).total_seconds()); sev.append(len(cur)); cur=[]
            cur.append(t)
        if cur: sessions+=1; slens.append((cur[-1]-cur[0]).total_seconds()); sev.append(len(cur))
    avg_slen=(ST.mean(slens)/60 if slens else 0); avg_sev=(ST.mean(sev) if sev else 0)
    mpu=(msgs/n_users if n_users else 0); tot=sum(actions.values()) or 1
    mix=", ".join(f"{k} {actions[k]} ({actions[k]*100//tot}%)" for k in ("manual","suggest","button","command"))
    return ("Статистика AIWA\n"
            f"Пользователей: {n_users}, активных за 7 дней: {len(active7)}\n"
            f"Сессий: {sessions}, средняя длина {avg_slen:.1f} мин, событий на сессию {avg_sev:.1f}\n"
            f"Сообщений на пользователя: {mpu:.1f}\n"
            f"Ввод: {mix}\n"
            f"Токенов всего: {tokens}, на сообщение ~{tokens//(msgs or 1)}")

async def stats_cmd(update, context):
    cid=update.effective_chat.id
    if not AIWA_ADMIN:
        return await update.message.reply_text(
            f"Статистика закрыта. Твой chat id: {cid}. Задай в Railway переменную AIWA_ADMIN={cid}, "
            "и команда станет доступна только тебе.")
    if str(cid)!=str(AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    await update.message.reply_text(aggregate_stats())

async def on_error(update, context):
    log.error("handler error", exc_info=context.error)
    try:
        if isinstance(update, Update) and update.effective_chat:
            await context.bot.send_message(update.effective_chat.id, "Упс, что-то пошло не так. Попробуй ещё раз или нажми Меню.")
    except Exception: pass

def main():
    app = Application.builder().token(os.environ["BOT_TOKEN"]).post_init(on_startup).build()
    for cmd, fn in (("start",start),("today",today),("summary",today),("calendar",calendar_cmd),("checkin",checkin_cmd),
                    ("period",period_cmd),("menu",menu),("time",set_time_cmd),("guide",guide_cmd),("stop",stop),("help",help_cmd),("stats",stats_cmd)):
        app.add_handler(CommandHandler(cmd, fn))
    app.add_error_handler(on_error)
    app.add_handler(CallbackQueryHandler(on_cb))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, on_text))
    log.info("AIWA bot starting..."); app.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
