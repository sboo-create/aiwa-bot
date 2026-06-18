# -*- coding: utf-8 -*-
"""AIWA, Telegram-бот женского здоровья по циклу: сводка, инфографика, меню, чек-ин, история, статистика."""
import os, io, re, time, html, asyncio, sqlite3, secrets, logging
from collections import deque
from datetime import datetime, date, time as dtime, timedelta
from zoneinfo import ZoneInfo

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, InputMediaPhoto, WebAppInfo, MenuButtonWebApp, BotCommand
from telegram.constants import KeyboardButtonStyle as KBS
from telegram.ext import (Application, CommandHandler, MessageHandler,
                          CallbackQueryHandler, ContextTypes, filters)
from aiohttp import web
import hmac as _hmac, hashlib as _hashlib
from urllib.parse import parse_qsl as _pqsl

import cycle as C
import llm as L
try:
    import image as IMG
except Exception as e:
    IMG = None; print("image off:", e)
try:
    import report as RPT
except Exception as e:
    RPT = None; print("report off:", e)
BOT_USERNAME = None
BCAST_Q = None  # очередь утренней рассылки (троттлинг под лимиты Groq)
CHAT_HIST = {}  # cid -> deque последних реплик диалога (память контекста)
def hist_get(cid): return list(CHAT_HIST.get(cid, []))
def hist_push(cid, q, a):
    dq = CHAT_HIST.setdefault(cid, deque(maxlen=6))
    clean = a
    try: clean = L.split_followups(a)[0]
    except Exception: pass
    dq.append({"role": "user", "content": q[:600]}); dq.append({"role": "assistant", "content": (clean or a)[:1200]})

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("aiwa")
TZ = ZoneInfo(os.environ.get("AIWA_TZ", "Europe/Moscow"))
DB = os.environ.get("AIWA_DB") or ("/data/aiwa.db" if os.path.isdir("/data") else "aiwa.db")
if os.path.dirname(DB): os.makedirs(os.path.dirname(DB), exist_ok=True)
AIWA_ADMIN = os.environ.get("AIWA_ADMIN")
DISCLAIMER = "AIWA не ставит диагнозы; при тревожных симптомах обратись к гинекологу."
AIWA_WEBAPP_URL = os.environ.get("AIWA_WEBAPP_URL", "")
def webapp_url(u):
    if not AIWA_WEBAPP_URL: return None
    if u and u.get("last_period") and u.get("cycle_len") and u.get("mode", "cycle") == "cycle":
        sep = "&" if "?" in AIWA_WEBAPP_URL else "?"
        return f"{AIWA_WEBAPP_URL}{sep}d={u['last_period']}&c={u['cycle_len']}"
    return AIWA_WEBAPP_URL
def menu_kb_for(u):
    return MENU_KB
EN = {1: "низкая", 2: "средняя", 3: "высокая"}
SYMPTOMS = [("cramps", "спазмы"), ("head", "головная боль"), ("bloat", "вздутие"),
            ("sweet", "тяга к сладкому"), ("anx", "тревожность"), ("tired", "усталость")]
SYM = dict(SYMPTOMS)

START_TEXT = ("🌸 Привет! Я AIWA, ИИ-ассистент по женскому здоровью на базе GigaChat.\n\n"
 "Умею: считать фазу цикла и присылать утреннюю сводку, подбирать питание и тренировки под фазу и под тебя, "
 "отслеживать симптомы, собирать выписку для врача и держать в курсе партнёра. Персонализируюсь под твои данные.\n\n"
 "Полный функционал в разделе Меню. Можешь писать или наговаривать вопросы прямо в чат, я отвечу.\n\n"
 "Для начала отметь последние месячные: напиши дату (например 25.05.2026) или нажми кнопку ниже.")
ABOUT_TEXT = ("🌸 Я AIWA, ИИ-ассистент по женскому здоровью на базе GigaChat.\n\n"
 "Умею: утренние сводки по фазе цикла, персональное питание и тренировки, ответы на вопросы про здоровье, "
 "отслеживание симптомов, выписку для врача и партнёрский режим. Персонализируюсь под тебя.\n\n"
 "Полный функционал в разделе Меню. Можно писать или наговаривать вопросы прямо в чат.")
PRIVACY_TEXT = ("🔒 Про данные: храню минимум, дату последних месячных, длину цикла, твои чек-ины и время рассылки, чтобы считать фазу. "
 "Это не передаётся третьим лицам. Удалить все данные и отключиться можно командой /stop в любой момент.")
PARTNER_HELLO = ("💛 Привет! Ты подключился как партнёр в AIWA.\n\n"
 "Каждое утро я буду присылать короткий апдейт: на каком дне цикла твоя девушка, какая фаза и настроение, и чем её поддержать, что сделать или купить.\n\n"
 "От тебя ничего не требуется, просто будь рядом. Отключить в любой момент: /unlink.")
PARTNER_INFO = ("💛 Ты в партнёрском режиме AIWA. Я присылаю ежедневный апдейт о цикле и самочувствии твоей девушки. "
 "Своего меню и календаря тут нет, они в её приложении. Отключить: /unlink.")
TECH_TEXT = ("🤖 Я работаю на GigaChat. GigaChat, это мультимодальная диалоговая нейросеть, разработанная Сбером. На её основе я считаю фазу цикла, собираю утреннюю сводку и отвечаю на вопросы про здоровье. Данные о тебе не передаются третьим лицам и не используются для обучения; храню только то, что нужно для расчёта цикла, и всё можно удалить командой /stop.")
PHASES_TEXT = (
 "🌸 Четыре фазы цикла\n\n"
 "🩸 Менструальная, дни 1-5\n"
 "Эстроген и прогестерон на минимуме, энергии мало.\n"
 "• Самочувствие: усталость, иногда спазмы\n"
 "• Еда: восполняй железо, печень, гречка, чечевица, свёкла\n"
 "• Спорт: ходьба, растяжка, мягкая йога\n\n"
 "🌱 Фолликулярная, дни 6-13\n"
 "Эстроген растёт, энергия и настроение поднимаются.\n"
 "• Самочувствие: бодрость, ясная голова\n"
 "• Еда: белок и свежее, яйца, рыба, зелень\n"
 "• Спорт: лучшее время для силовых\n\n"
 "☀️ Овуляторная, дни 14-16\n"
 "Пик эстрогена, максимум энергии и либидо.\n"
 "• Самочувствие: уверенность, общительность\n"
 "• Еда: антиоксиданты и клетчатка, ягоды, зелень, брокколи\n"
 "• Спорт: самое интенсивное, HIIT, спринты\n\n"
 "🌙 Лютеиновая, дни 17 и до месячных\n"
 "Растёт прогестерон, ближе к концу ПМС и тяга к сладкому.\n"
 "• Самочувствие: спад энергии, перепады настроения\n"
 "• Еда: магний и B6, тёмный шоколад 85%, орехи, киноа\n"
 "• Спорт: средняя нагрузка, ближе к месячным восстановление\n\n"
 "Дни даны для цикла около 28 дней и сдвигаются под твою длину.")

GUIDE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "guides")
GUIDES = [{"id": "norm", "title": "Норма цикла: длина, фазы и когда к врачу", "file": "cycle_length.png",
           "kw": ["нормальн", "норма цикл", "что считается норм", "сколько длит", "длина цикл", "цикл норм", "это нормально"]}]

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
    c.execute("CREATE TABLE IF NOT EXISTS partners(partner_id INTEGER PRIMARY KEY, woman_id INTEGER, created TEXT)")
    for col in ("meta TEXT", "ms INTEGER DEFAULT 0", "n INTEGER DEFAULT 0"):
        try: c.execute(f"ALTER TABLE events ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    for col in ("state TEXT", "pending_date TEXT", "height INTEGER", "weight REAL", "age INTEGER",
                "activity INTEGER", "diet TEXT", "partner_code TEXT", "mode TEXT", "diet_note TEXT"):
        try: c.execute(f"ALTER TABLE users ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    return c

def row(cid):
    c = db(); r = c.execute("SELECT chat_id,last_period,cycle_len,send_time,modules,state,pending_date,height,weight,age,activity,diet,partner_code,mode,diet_note FROM users WHERE chat_id=?", (cid,)).fetchone(); c.close()
    if not r: return None
    return {"chat_id": r[0], "last_period": r[1], "cycle_len": r[2], "send_time": r[3],
            "modules": (r[4] or "phase,general,food,training").split(","), "state": r[5], "pending_date": r[6],
            "height": r[7], "weight": r[8], "age": r[9], "activity": r[10], "diet": r[11] or "", "partner_code": r[12], "mode": r[13] or "cycle", "diet_note": r[14] or ""}

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
def ev(cid, action, tokens=0, meta=None, ms=0, n=0):
    c = db(); c.execute("INSERT INTO events(chat_id,ts,action,tokens,meta,ms,n) VALUES(?,?,?,?,?,?,?)",
        (cid, datetime.now().isoformat(), action, int(tokens), meta, int(ms), int(n))); c.commit(); c.close()
def cyc_add(cid, d):
    c = db(); c.execute("INSERT OR IGNORE INTO cycles(chat_id,start_date) VALUES(?,?)", (cid, d)); c.commit(); c.close()
def log_get(cid, d):
    c = db(); r = c.execute("SELECT energy,mood,symptoms FROM logs WHERE chat_id=? AND log_date=?", (cid, d)).fetchone(); c.close()
    return {"energy": r[0], "mood": r[1], "symptoms": (r[2].split(",") if r[2] else [])} if r else None
def log_ensure(cid, d):
    c = db(); c.execute("INSERT OR IGNORE INTO logs(chat_id,log_date,symptoms) VALUES(?,?,'')", (cid, d)); c.commit(); c.close()
def log_set(cid, d, **kw):
    log_ensure(cid, d); c = db()
    for k, v in kw.items(): c.execute(f"UPDATE logs SET {k}=? WHERE chat_id=? AND log_date=?", (v, cid, d))
    c.commit(); c.close()
def log_toggle(cid, d, code):
    lg = log_get(cid, d) or {"symptoms": []}; s = set(lg["symptoms"]); s.symmetric_difference_update({code}); log_set(cid, d, symptoms=",".join(sorted(s)))
def last_hint(cid):
    c = db(); r = c.execute("SELECT energy,symptoms FROM logs WHERE chat_id=? AND energy IS NOT NULL ORDER BY log_date DESC LIMIT 1", (cid,)).fetchone(); c.close()
    if not r: return None
    parts = []
    if r[0]: parts.append(f"энергия {EN.get(r[0],'')}")
    if r[1]: parts.append("симптомы: " + ", ".join(SYM.get(x, x) for x in r[1].split(",") if x))
    return "; ".join(parts) or None
def all_users():
    c = db(); rows = c.execute("SELECT chat_id FROM users WHERE last_period IS NOT NULL").fetchall(); c.close(); return [x[0] for x in rows]
def del_user(cid):
    c = db()
    for t in ("users", "cycles", "logs"): c.execute(f"DELETE FROM {t} WHERE chat_id=?", (cid,))
    c.execute("DELETE FROM partners WHERE woman_id=? OR partner_id=?", (cid, cid)); c.commit(); c.close()
def set_partner_code(cid, code): upsert(cid, partner_code=code)
def woman_by_code(code):
    c = db(); r = c.execute("SELECT chat_id FROM users WHERE partner_code=?", (code,)).fetchone(); c.close(); return r[0] if r else None
def link_partner(partner_id, woman_id):
    c = db(); c.execute("INSERT OR REPLACE INTO partners(partner_id,woman_id,created) VALUES(?,?,?)", (partner_id, woman_id, datetime.now().isoformat())); c.commit(); c.close()
def partner_of(woman_id):
    c = db(); r = c.execute("SELECT partner_id FROM partners WHERE woman_id=?", (woman_id,)).fetchone(); c.close(); return r[0] if r else None
def woman_of_partner(pid):
    c = db(); r = c.execute("SELECT woman_id FROM partners WHERE partner_id=?", (pid,)).fetchone(); c.close(); return r[0] if r else None
def is_partner(cid): return woman_of_partner(cid) is not None
def cycles_of(cid, since_iso=None):
    c = db()
    if since_iso:
        rows = c.execute("SELECT start_date FROM cycles WHERE chat_id=? AND start_date>=? ORDER BY start_date", (cid, since_iso)).fetchall()
    else:
        rows = c.execute("SELECT start_date FROM cycles WHERE chat_id=? ORDER BY start_date", (cid,)).fetchall()
    c.close(); return [x[0] for x in rows]
def logs_of(cid, since_iso=None):
    c = db()
    if since_iso:
        rows = c.execute("SELECT log_date,energy,mood,symptoms FROM logs WHERE chat_id=? AND log_date>=? ORDER BY log_date", (cid, since_iso)).fetchall()
    else:
        rows = c.execute("SELECT log_date,energy,mood,symptoms FROM logs WHERE chat_id=? ORDER BY log_date", (cid,)).fetchall()
    c.close(); return [{"date": r[0], "energy": r[1], "mood": r[2], "symptoms": (r[3].split(",") if r[3] else [])} for r in rows]

# ---------- helpers ----------
def parse_date(t):
    t = t.strip().replace("/", ".").replace("-", ".").replace(" ", ".").replace(",", ".")
    while ".." in t: t = t.replace("..", ".")
    digits = t.replace(".", "")
    if t.isdigit() or (digits.isdigit() and "." not in t):
        fmt = {4: "%d%m", 6: "%d%m%y", 8: "%d%m%Y"}.get(len(digits))
        formats = [fmt] if fmt else []
    else:
        formats = ["%d.%m.%Y", "%Y.%m.%d", "%d.%m.%y", "%d.%m"]
    for fmt in formats:
        try:
            d = datetime.strptime(t if "." in t else digits, fmt).date()
            if fmt in ("%d.%m", "%d%m"): d = d.replace(year=date.today().year)
            if d > date.today(): d = d.replace(year=d.year - 1)
            return d
        except ValueError: continue
    return None

def parse_time(t):
    t = t.strip().replace(".", ":").replace(" ", ":").replace("-", ":")
    try:
        if ":" in t:
            h, m = (t.split(":") + ["0"])[:2]; h = int(h); m = int(m or 0)
        else:
            h = int(t); m = 0
        if 0 <= h < 24 and 0 <= m < 60: return f"{h:02d}:{m:02d}"
    except Exception: pass
    return None

def calc_calories(cm, kg, age, act):
    bmr = 10 * kg + 6.25 * cm - 5 * age - 161
    tdee = bmr * {1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9}.get(act, 1.375)
    p = round(1.6 * kg); fat = round(tdee * 0.3 / 9); carbs = round(max(0, tdee - p * 4 - fat * 9) / 4)
    return round(tdee), p, fat, carbs

ACT_RU = {1: "сидячий образ жизни", 2: "лёгкая активность", 3: "умеренная активность", 4: "высокая активность", 5: "очень высокая активность"}
DIET = [("veg", "Вегетарианство"), ("vegan", "Веган"), ("nolac", "Без лактозы"), ("noglu", "Без глютена"), ("nonuts", "Без орехов"), ("pesc", "Пескетарианство")]
DIETD = dict(DIET)
def profile_of(u):
    if u and u.get("height") and u.get("weight") and u.get("age"):
        return {"height": u["height"], "weight": u["weight"], "age": u["age"], "activity": u.get("activity") or 3,
                "diet": u.get("diet") or "", "diet_note": u.get("diet_note") or ""}
    return None
def diet_human(code_csv):
    if not code_csv: return "без ограничений"
    return ", ".join(DIETD.get(x, x) for x in code_csv.split(",") if x) or "без ограничений"
def profile_kcal(p):
    return calc_calories(p["height"], p["weight"], p["age"], p["activity"])

def match_meta(text):
    t = text.lower()
    if any(k in t for k in ("гигачат", "gigachat", "на чём ты работаешь", "на чем ты работаешь", "чём ты работаешь", "чем ты работаешь",
                            "на чем ты сделан", "на чём ты сделан", "из чего ты", "что под капотом", "какой движок", "какая технология", "на какой технологии",
                            "какая модель", "что за модель", "на какой модели", "какая нейросеть", "какой ии", "что за нейросеть", "ты нейросеть",
                            "ты gpt", "ты чат gpt", "chatgpt", "ты openai", "openai", "ты llama", "языковая модель", "ты ллм", "кто тебя сделал", "кто тебя создал")): return "tech"
    if any(k in t for k in ("что такое айва", "что такое aiwa", "расскажи о себе", "кто ты", "о тебе", "про себя", "что ты умеешь", "ты кто")): return "about"
    if any(k in t for k in ("храните данные", "хранишь данные", "хранение данных", "мои данные", "персональные данные", "приватн", "конфиденц",
                            "что с данными", "безопасн", "удалить данные", "передаёте", "передаете данные", "данные в безопас")): return "privacy"
    return None

def match_intent(t):
    t = t.lower()
    if re.search(r"(помен|измен|задать|настро|переключ|во ?сколько|поставь).{0,24}(время|рассылк|сводк|присыл)", t) or re.search(r"\bвремя\b\s*(рассылк|сводк|присыл)", t): return "time"
    if re.search(r"(нагрузк|трениров|какой спорт|каким спортом|позанима|упражнени|фитнес|какая активн)", t): return "training"
    if re.search(r"(что (мне )?(съесть|поесть|есть)|что приготов|какое питани|меню (на )?сегодня|что покушать|еда на сегодня|рацион|что поедим)", t): return "food"
    if re.search(r"(календар|покажи цикл|инфограф|какой (у меня )?день цикла|где я в цикле)", t): return "calendar"
    if re.search(r"(проанализир|сделай анализ|^\s*анализ|разбер|оцени мой цикл|что (говор|показыв)\w*.*(данн|цикл|выписк)|анализ (выписк|цикл|данн))", t): return "analysis"
    if re.search(r"(выписк|выпуск|для врача|истори[яю]|отчёт|отчет|справк)", t): return "history"
    if re.search(r"(отметить симптом|записать симптом|чек.?ин|отметить самочувств)", t): return "checkin"
    if re.search(r"(отключить|отвязать|удалить)\s+партн", t): return "unlink"
    if re.search(r"(стере|сотри|удали|обнул|снес|снос|очист)", t) and re.search(r"(вс[её]|\bвсе\b|данн|аккаунт|профил|себя|про меня|обо мне|информац)", t): return "wipe"
    if re.search(r"(партнёр|партнер|подключить (парня|мужа|партнёр))", t): return "partner"
    if re.search(r"(какие\s+команд|список\s+команд|что\s+ты\s+умеешь|твои\s+команд|покажи\s+команд|^\s*команды\s*$|^\s*помощь\s*$|^\s*help\s*$|меню\s+команд)", t): return "help"
    if re.search(r"месячн|менструац|критическ\w* дн", t) and re.search(r"(отмет|отмеч|добав|записа|внес|залог|зафиксир|поменя|измен|обнов|исправ|как.{0,14}(отмет|добав|внес))", t): return "period"
    if re.search(r"(месячные начал|у меня (сегодня )?месячн|пришли месячн|начались месячн|сегодня начал\w* месячн|снова месячн|опять месячн)", t): return "period"
    return None

def is_gibberish(t):
    s = t.strip(); low = s.lower()
    letters = re.sub(r"[^а-яёa-z]", "", low)
    if len(s) <= 1 or len(letters) == 0: return True
    if len(set(letters)) == 1 and len(letters) >= 3: return True
    if len(letters) >= 4 and not re.search(r"[аеёиоуыэюяaeiouy]", letters): return True
    return False

def match_guide(text):
    t = text.lower()
    for g in GUIDES:
        if any(k in t for k in g["kw"]): return g
    return None

def is_cycle(u): return not (u and u.get("mode") in ("irregular", "none", "meno"))
def is_onboarded(u):
    if not u: return False
    if u.get("mode") in ("irregular", "none", "meno"): return True
    return bool(u.get("last_period") and u.get("cycle_len"))
def status_of(cid):
    u = row(cid)
    if not (u and u.get("last_period") and u.get("cycle_len") and is_cycle(u)):
        return u, None
    return u, C.cycle_status(date.fromisoformat(u["last_period"]), u["cycle_len"])

# ---------- keyboards ----------
ICONS = {  # набор Goodluck_sasha (@goodluck_alex): подобраны разные по цвету
    "food": "5418123573438980585",          # 🟢 зелёный
    "sec:training": "5359581378193138129",  # 🔥 оранжевый
    "calendar": "5415856681110217088",      # 🔵 синий
    "checkin": "5337172201642664657",       # 💜 фиолетовый
    "history": "5418143957353766660",       # ⭐️ золотой
    "guides": "5359285137118864843",        # 📕 красный
    "partner": "5359828776899322943",       # 💙 голубое сердце
    "period": "5357334118159883232",        # ❤️ красный
    "set:time": "5415597204955996883",      # 🟡 жёлтый
    "menu": "5415634562581538032",          # 🔘 нейтральный
}
def B(text, cb, style=None):
    kw = {"callback_data": cb}
    if style is not None: kw["style"] = style
    icon = ICONS.get(cb)
    if icon: kw["icon_custom_emoji_id"] = icon
    return InlineKeyboardButton(text, **kw)

MENU_KB = InlineKeyboardMarkup([
    [B("Питание", "food"), B("Нагрузка", "sec:training")],
    [B("Календарь", "calendar"), B("Симптомы", "checkin", KBS.SUCCESS)],
    [B("История и выписка", "history"), B("Гид: норма цикла", "guides")],
    [B("Партнёр", "partner"), B("Отметить месячные", "period", KBS.DANGER)],
    [B("Время рассылки", "set:time")],
])
GATE_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Начать", callback_data="go_start")]])
ONB_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Месячные начались сегодня", callback_data="onb_today")],
    [InlineKeyboardButton("Нет регулярного цикла", callback_data="no_cycle")],
])
NOCYCLE_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Нерегулярный / не знаю", callback_data="mode:irregular")],
    [InlineKeyboardButton("Сейчас нет месячных", callback_data="mode:none")],
    [InlineKeyboardButton("Менопауза", callback_data="mode:meno")],
])
GENERAL_MENU_KB = InlineKeyboardMarkup([
    [B("Питание", "food"), B("Нагрузка", "sec:training")],
    [B("Симптомы", "checkin", KBS.SUCCESS), B("История и выписка", "history")],
    [B("Отметить месячные", "period", KBS.DANGER)],
    [B("Партнёр", "partner"), B("Время рассылки", "set:time")],
])
PERIOD_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Начались сегодня", callback_data="period_today")]])
SKIP_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Пропустить", callback_data="prof_skip")]])
HIST_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("3 месяца", callback_data="rep:3"), InlineKeyboardButton("6 месяцев", callback_data="rep:6")],
    [InlineKeyboardButton("Весь период", callback_data="rep:all")],
])
ACT_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Минимальная", callback_data="act:1"), InlineKeyboardButton("Лёгкая", callback_data="act:2")],
    [InlineKeyboardButton("Умеренная", callback_data="act:3"), InlineKeyboardButton("Высокая", callback_data="act:4")],
    [InlineKeyboardButton("Очень высокая", callback_data="act:5")],
])
def diet_kb(selected):
    rows = [[InlineKeyboardButton(("✓ " if code in selected else "") + ru, callback_data=f"diet:s:{code}")] for code, ru in DIET]
    rows.append([InlineKeyboardButton("Готово", callback_data="diet:done")]); return InlineKeyboardMarkup(rows)

def time_kb():
    times = ["07:00", "08:00", "09:00", "10:00", "21:00", "22:00"]
    return InlineKeyboardMarkup([[InlineKeyboardButton(t, callback_data=f"tm:{t}") for t in times[i:i + 3]] for i in (0, 3)])
def en_kb(p):
    return InlineKeyboardMarkup([[InlineKeyboardButton(EN[i].capitalize(), callback_data=f"ci:{p}:{i}") for i in (1, 2, 3)]])
def sym_kb(selected):
    rows = [[InlineKeyboardButton(("✓ " if code in selected else "") + ru, callback_data=f"ci:s:{code}")] for code, ru in SYMPTOMS]
    rows.append([InlineKeyboardButton("Готово", callback_data="ci:done")]); return InlineKeyboardMarkup(rows)
def sugg_kb(cid, items):
    def _short(t): return t if len(t) <= 28 else t[:26].rstrip(" ,.-") + "…"
    rows = [[B(_short(t), f"q:{add_sugg(cid,t)}")] for t in items[:2]]
    rows.append([B("Меню", "menu", KBS.PRIMARY)]); return InlineKeyboardMarkup(rows)
def summary_kb():
    return InlineKeyboardMarkup([
        [B("Питание", "food"), B("Нагрузка", "sec:training")],
        [B("Меню", "menu", KBS.PRIMARY), B("Симптомы", "checkin", KBS.SUCCESS)],
    ])

# ---------- senders ----------
async def need_onboard(t):
    cid = getattr(getattr(t, "chat", None), "id", None)
    if cid and is_partner(cid) and not is_onboarded(row(cid)):
        return await t.reply_text(PARTNER_INFO)
    if cid and not row(cid): ev(cid, "signup")
    if cid: upsert(cid, state="await_date")
    await t.reply_text("Чтобы считать фазу и давать рекомендации, отметь последние месячные: напиши дату (например 25.05.2026), нажми кнопку или выбери «Нет регулярного цикла».", reply_markup=ONB_KB)
_last_start = {}
async def begin_onboard(cid, msg):
    now = time.time()
    if now - _last_start.get(cid, 0) < 4: return   # не показываем приветствие дважды подряд
    _last_start[cid] = now
    if not row(cid): ev(cid, "signup")
    upsert(cid, state="await_date", pending_date=None)
    await msg.reply_text(START_TEXT, reply_markup=ONB_KB)

async def send_infographic(bot, cid):
    if not IMG: return
    u, st = status_of(cid)
    if not st: return
    try:
        png = IMG.render_cycle(date.fromisoformat(u["last_period"]), u["cycle_len"], date.today())
        bio = io.BytesIO(png); bio.name = "cycle.png"
        await bot.send_photo(cid, photo=bio, caption=f"AIWA · {st['subphase']} {st['phase_ru'].lower()}, день {st['day']}. Месячные через ~{st['days_to_next']} дн.")
    except Exception as e: log.warning("infographic: %s", e)

async def send_training_card(context, cid, st):
    if not IMG: return
    await context.bot.send_chat_action(cid, "upload_photo")
    try:
        bio = io.BytesIO(IMG.render_training(st)); bio.name = "training.png"
        await context.bot.send_photo(cid, photo=bio)
    except Exception as e:
        log.warning("training img: %s", e)

async def send_menu(context, cid):
    u, st = status_of(cid)
    if not st: return
    await context.bot.send_chat_action(cid, "upload_photo")
    prof = profile_of(u); target = profile_kcal(prof) if prof else None
    usage = []; mdata = await asyncio.to_thread(L.menu_today, st, profile=prof, target=target, usage=usage); ev(cid, "tokens", sum(usage))
    if target:
        mdata["macros"] = {"protein": f"{target[1]} г", "fat": f"{target[2]} г", "carbs": f"{target[3]} г"}
    note = st["content"]["food"]
    try:
        bio = io.BytesIO(IMG.render_menu(mdata, st["phase_ru"], target_kcal=(target[0] if target else None))); bio.name = "menu.png"
        cap = f"🍽 Меню под {st['phase_ru'].lower()} фазу"
        if target: cap += f", цель ~{target[0]} ккал/день"
        cap += ". Не нравится блюдо, напиши «замени обед» или «другое на ужин»."
        if not prof: cap += "\n\nЧтобы считать калории под тебя, добавь данные командой /profile."
        await context.bot.send_photo(cid, photo=bio, caption=cap)
    except Exception as e:
        log.warning("menu: %s", e); await context.bot.send_message(cid, "🍽 " + note)

async def send_section(context, cid, st, key):
    """Нагрузка и питание: живой ответ с мед-обоснованием. Для нагрузки картинка цикла идёт над текстом, для питания сверху карточка-меню."""
    await context.bot.send_chat_action(cid, "typing"); ev(cid, "button")
    usage = []
    if key == "training":
        await send_training_card(context, cid, st)
        text = await think_llm(context, cid, L.explain_section, st, "training", usage=usage)
        return await send_answer(context, cid, text, st, "нагрузка сегодня", usage=usage)
    if key == "food":
        await send_menu(context, cid)
        text = await think_llm(context, cid, L.explain_section, st, "food", usage=usage)
        return await send_answer(context, cid, text, st, "питание сегодня", usage=usage)
    text = L.section_text(st, key)
    await send_answer(context, cid, text, st, text, usage=usage)

async def send_delay(context, cid, st):
    if IMG:
        try:
            bio = io.BytesIO(IMG.render_delay(st)); bio.name = "delay.png"; await context.bot.send_photo(cid, photo=bio)
        except Exception as e: log.warning("delay img: %s", e)
    msgs = {
        "due": "🟡 Месячные ожидаются примерно сейчас.\n• Если уже начались, отметь их кнопкой ниже.\n• Задержка в пару дней бывает нормой.",
        "delay": f"🔴 Задержка {st['delay_days']} дн.\n• Если был незащищённый секс, сделай тест на ХГЧ (струйный или полоска): информативен с первого дня задержки, точнее через 3-5 дней.\n• Частые причины: стресс, перелёты, резкие изменения веса и сна, интенсивные тренировки, болезнь.\n• Если задержка растёт или есть тревожные симптомы, обратись к гинекологу.\n• Когда месячные начнутся, отметь их кнопкой ниже.",
        "stale": f"⚪ С последних отмеченных месячных прошло {st['days_since']} дн.\n• Похоже, данные устарели, отметь дату последних месячных кнопкой ниже.\n• Если менструации действительно нет так долго, это повод обратиться к гинекологу.\n• Возможные причины: беременность, СПКЯ, щитовидная железа, резкая потеря веса, перименопауза."}
    kb = InlineKeyboardMarkup([[InlineKeyboardButton("Отметить месячные", callback_data="period")], [InlineKeyboardButton("Меню", callback_data="menu")]])
    await context.bot.send_message(cid, msgs.get(st["status"], "") + "\n\nAIWA · " + DISCLAIMER, reply_markup=kb)

async def send_guide(context, cid, g):
    path = os.path.join(GUIDE_DIR, g["file"])
    if not os.path.exists(path):
        return await context.bot.send_message(cid, "Этот гид скоро появится.")
    try:
        from PIL import Image
        im = Image.open(path).convert("RGB"); w, h = im.size; n = 3; part = h // n
        media = []
        for i in range(n):
            top = i * part; bottom = h if i == n - 1 else (i + 1) * part
            b = io.BytesIO(); im.crop((0, top, w, bottom)).save(b, "JPEG", quality=90); b.seek(0)
            media.append(InputMediaPhoto(b, caption=(g["title"] if i == 0 else None)))
        await context.bot.send_media_group(cid, media)
    except Exception as e:
        log.warning("guide: %s", e)
        with open(path, "rb") as fh: await context.bot.send_photo(cid, photo=fh, caption=g["title"])

async def send_answer(context, cid, text, st, basis_q, usage=None, quote=None):
    if usage is None: usage = []
    sf = getattr(L, "split_followups", None)
    clean, sugg = sf(text) if sf else (text, [])
    if len(sugg) < 2:
        try:
            for e in L.followups(st, basis_q, clean):
                if e not in sugg and len(sugg) < 2: sugg.append(e)
        except Exception: pass
    kb = sugg_kb(cid, sugg)
    if quote:
        body = f"<blockquote>{html.escape(quote)}</blockquote>\n{html.escape(clean)}"
        await context.bot.send_message(cid, body, reply_markup=kb, parse_mode="HTML")
    else:
        await context.bot.send_message(cid, clean, reply_markup=kb)
    ev(cid, "tokens", sum(usage))

async def push_general(context, cid):
    u = row(cid); usage = []
    body = await asyncio.to_thread(L.general_summary, profile_of(u), u.get("mode"), hint=last_hint(cid), usage=usage)
    if not body:
        body = "💛 Доброе утро! Отметь самочувствие через Симптомы, и подскажу, на что обратить внимание сегодня."
    await context.bot.send_message(cid, f"{body}\n\nДобавь сегодняшние симптомы через Симптомы, чтобы сводка была точнее.\n\nAIWA · {DISCLAIMER}", reply_markup=summary_kb())
    ev(cid, "tokens", sum(usage)); ev(cid, "goal", meta="summary")

async def send_general(context, cid, key):
    u = row(cid); await context.bot.send_chat_action(cid, "typing"); ev(cid, "button")
    qmap = {"food": "Что мне есть сегодня под мой возраст и самочувствие? Дай конкретные продукты или меню на день.",
            "training": "Какая физическая активность мне сейчас подходит и почему? Дай конкретные варианты."}
    usage = []; q = qmap.get(key, key)
    ans = await think_llm(context, cid, L.general_answer, profile_of(u), u.get("mode"), q, hint=last_hint(cid), usage=usage)
    _, st = status_of(cid)
    await send_answer(context, cid, ans, st, q, usage=usage)

def cycle_text_analysis(cid):
    import statistics as ST
    from collections import Counter
    u = row(cid); cyc = cycles_of(cid); logs = logs_of(cid)
    lens = []
    for i in range(1, len(cyc)):
        d = (date.fromisoformat(cyc[i]) - date.fromisoformat(cyc[i - 1])).days
        if 15 <= d <= 60: lens.append(d)
    parts = ["📊 Анализ твоих данных"]
    if not is_cycle(u):
        parts.append("• Сейчас режим без отслеживания фазы цикла, смотрю по симптомам и самочувствию.")
    elif len(lens) >= 2:
        avg = round(ST.mean(lens)); sd = ST.pstdev(lens)
        reg = "регулярный" if sd <= 2.5 else ("умеренно нерегулярный" if sd <= 5 else "нерегулярный")
        parts.append(f"• Средняя длина цикла {avg} дн (разброс {min(lens)}-{max(lens)}), цикл {reg}.")
        ov = max(12, avg - 14)
        parts.append(f"• Овуляция ориентировочно на {ov} день, фертильное окно за 5 дней до неё.")
    elif lens:
        parts.append(f"• Длина цикла около {lens[0]} дн, для оценки регулярности нужно больше отмеченных циклов.")
    else:
        parts.append(f"• Отмеченных циклов пока мало. Заявленная длина {u.get('cycle_len') or 28} дн.")
    cnt = Counter()
    for lg in logs:
        for x in lg.get("symptoms", []): cnt[x] += 1
    if cnt:
        top = ", ".join(SYM.get(c, c) for c, _ in cnt.most_common(3))
        parts.append(f"• Чаще всего отмечаешь: {top}.")
    en = [lg["energy"] for lg in logs if lg.get("energy")]
    if en:
        parts.append(f"• Средняя энергия по отметкам: {EN.get(round(ST.mean(en)), '')}.")
    if len(parts) == 2 and not cnt and not en:
        parts.append("Пока мало данных. Отмечай месячные и симптомы — и анализ станет точнее.")
    parts.append("\nПодробную выписку для врача можно собрать кнопкой ниже.")
    return "\n".join(parts)

async def dispatch_intent(context, update, cid, u, intent):
    msg = update.message; general = not is_cycle(u); ev(cid, "manual", meta="intent_" + intent)
    if intent == "analysis":
        return await msg.reply_text(cycle_text_analysis(cid),
            reply_markup=InlineKeyboardMarkup([[B("Собрать выписку PDF", "history")]]))
    if intent == "time":
        upsert(cid, state="await_time")
        return await msg.reply_text("Во сколько присылать сводку (МСК)? Выбери или впиши своё время, например 08:00.", reply_markup=time_kb())
    if intent == "checkin":
        log_ensure(cid, date.today().isoformat())
        return await msg.reply_text("Отметим самочувствие. Какая сегодня энергия?", reply_markup=en_kb("e"))
    if intent == "history":
        return await msg.reply_text("За какой период собрать выписку для врача?", reply_markup=HIST_KB)
    if intent == "unlink":
        return await msg.reply_text("Чтобы отключить партнёра, введи команду /unlink")
    if intent == "wipe":
        return await msg.reply_text("Чтобы стереть все свои данные и отключить бота, введи команду /stop")
    if intent == "help":
        return await help_cmd(update, context)
    if intent == "partner":
        return await partner_entry(context, cid, msg)
    if intent == "training":
        if general: return await send_general(context, cid, "training")
        _, st = status_of(cid); return await send_section(context, cid, st, "training")
    if intent == "food":
        if general: return await send_general(context, cid, "food")
        _, st = status_of(cid); return await send_section(context, cid, st, "food")
    if intent == "calendar":
        if general: return await msg.reply_text("Пока не вижу данных цикла. Отметь последние месячные командой /period или кнопкой «Отметить месячные», и я покажу фазы и календарь.")
        _, st = status_of(cid)
        if st["status"] != "normal": return await send_delay(context, cid, st)
        return await send_infographic(context.bot, cid)
    if intent == "period":
        upsert(cid, state="await_period_date")
        return await msg.reply_text("Когда начались последние месячные? Напиши дату (например 25.05.2026) или нажми кнопку.", reply_markup=PERIOD_KB)

async def push_summary(context, cid, with_image=True):
    u0 = row(cid)
    if u0 and not is_cycle(u0): return await push_general(context, cid)
    u, st = status_of(cid)
    if not st: return
    if st["status"] != "normal": return await send_delay(context, cid, st)
    if with_image: await send_infographic(context.bot, cid)
    usage = []
    body = await asyncio.to_thread(L.generate_summary, st, u["modules"], hint=last_hint(cid), usage=usage)
    kb = summary_kb()
    await context.bot.send_message(cid, f"{body}\n\nДобавь сегодняшние симптомы через Симптомы, чтобы сводка была точнее.\n\nAIWA · {DISCLAIMER}", reply_markup=kb)
    ev(cid, "tokens", sum(usage)); ev(cid, "goal", meta="summary")

def schedule_daily(app, cid, hhmm):
    for j in app.job_queue.get_jobs_by_name(str(cid)): j.schedule_removal()
    h, m = map(int, hhmm.split(":"))
    m += abs(cid) % 15  # разброс 0..14 мин: у многих юзеров сводки не падают в одну минуту
    h = (h + m // 60) % 24; m %= 60
    app.job_queue.run_daily(daily_job, time=dtime(h, m, tzinfo=TZ), chat_id=cid, name=str(cid))

def mark_period(context, cid, iso):
    """Отметка месячных доступна всем. Любая отметка включает трекинг цикла (динамику)."""
    u = row(cid); cl = u.get("cycle_len") or 28
    cyc_add(cid, iso)
    upsert(cid, last_period=iso, cycle_len=cl, mode="cycle", state=None)
    schedule_daily(context.application, cid, row(cid)["send_time"] or "08:00")
async def think_llm(context, cid, fn, *args, **kwargs):
    """Выполняет тяжёлый вызов модели в фоне и держит индикатор «печатает» живым."""
    task = asyncio.create_task(asyncio.to_thread(fn, *args, **kwargs))
    while not task.done():
        try: await context.bot.send_chat_action(cid, "typing")
        except Exception: pass
        await asyncio.wait({task}, timeout=4)
    return task.result()

class _BCtx:
    def __init__(self, app): self.bot = app.bot; self.application = app

async def daily_job(context: ContextTypes.DEFAULT_TYPE):
    cid = context.job.chat_id
    if BCAST_Q is not None:
        return await BCAST_Q.put(cid)          # в очередь, обработает воркер с паузами
    await push_summary(context, cid); await push_partner(context, cid)

async def broadcast_worker(app):
    """Шлёт утренние сводки по одной с паузой, чтобы не превышать лимит токенов/мин Groq."""
    delay = float(os.environ.get("AIWA_BROADCAST_DELAY", "15"))
    while True:
        cid = await BCAST_Q.get()
        try:
            ctx = _BCtx(app)
            await push_summary(ctx, cid)
            await push_partner(ctx, cid)
        except Exception as e:
            log.warning("broadcast %s: %s", cid, e)
        finally:
            BCAST_Q.task_done()
        await asyncio.sleep(delay)

def finish_onboarding(context, cid, last_period_iso, n):
    upsert(cid, last_period=last_period_iso, cycle_len=n, state=None, pending_date=None)
    cyc_add(cid, last_period_iso); schedule_daily(context.application, cid, row(cid)["send_time"] or "08:00")

async def welcome_finish(context, cid, msg):
    ev(cid, "activated", meta=(row(cid).get("mode") or "cycle"))
    await msg.reply_text("Всё готово! Утреннюю сводку буду присылать автоматически каждый день в 08:00 (МСК), время меняется в Меню.",
        reply_markup=InlineKeyboardMarkup([[B("Меню", "menu", KBS.PRIMARY)]]))
    await push_summary(context, cid)
    if is_cycle(row(cid)):
        await context.bot.send_message(cid, "📘 Есть гид про норму цикла: длина, фазы и когда к врачу.",
            reply_markup=InlineKeyboardMarkup([[B("Гид: норма цикла", "guides")]]))

async def send_report(context, cid, period):
    u = row(cid)
    if not is_onboarded(u): return await context.bot.send_message(cid, "Сначала пройди настройку: /start.")
    if not RPT: return await context.bot.send_message(cid, "Выписка временно недоступна.")
    _, st = status_of(cid)
    await context.bot.send_chat_action(cid, "upload_document")
    since, label = RPT.period_since(period)
    cycles = cycles_of(cid, since); logs = logs_of(cid, since)
    if st and u.get("last_period") and u["last_period"] not in cycles:
        cycles = sorted(set(cycles + [u["last_period"]]))
    try:
        pdf = RPT.build_report({"cycles": cycles, "logs": logs, "st": st, "cycle_len": (u.get("cycle_len") or 28),
                                "period_label": label, "profile": profile_of(u), "mode": u.get("mode")})
        bio = io.BytesIO(pdf); bio.name = "AIWA_vypiska.pdf"
        await context.bot.send_document(cid, document=bio, filename="AIWA_vypiska.pdf",
            caption=f"📄 Выписка по циклу, {label.lower()}. Можно показать гинекологу.")
        ev(cid, "goal", meta="report")
    except Exception as e:
        log.warning("report: %s", e); await context.bot.send_message(cid, "Не удалось собрать выписку, попробуй позже.")

PARTNER_TIPS = {
    "menstrual": "Идут месячные, может болеть живот и не быть сил. Грелка, тёплый чай, еда с железом и спокойный режим зайдут, на марафон лучше не звать.",
    "follicular": "Энергия на подъёме, хорошее окно для активностей, спорта и планов вместе.",
    "ovulation": "Пик энергии и настроения, отличное время для свиданий и совместного спорта.",
    "luteal": "Ближе к месячным возможны ПМС, усталость и тяга к сладкому. Тёмный шоколад, забота и спокойный вечер будут кстати.",
}
def partner_text(st, hint):
    extra = f"\nСегодня она отмечала: {hint}." if hint else ""
    return (f"💛 Апдейт AIWA\nОна на дне {st['day']} цикла, {st['subphase']} {st['phase_ru'].lower()} фаза.\n"
            f"{PARTNER_TIPS.get(st['phase'],'')}{extra}\n\nЭто короткая подсказка, не диагноз.")

async def push_partner(context, woman_cid):
    pid = partner_of(woman_cid)
    if not pid: return
    u, st = status_of(woman_cid)
    if not st: return
    hint = last_hint(woman_cid)
    text = None
    try: text = await asyncio.to_thread(L.partner_brief, st, hint)
    except Exception as e: log.warning("partner_brief: %s", e)
    if not text: text = partner_text(st, hint)
    try:
        await context.bot.send_message(pid, text)
    except Exception as e:
        log.warning("partner push: %s", e)

async def partner_entry(context, cid, msg):
    global BOT_USERNAME
    u = row(cid); code = u.get("partner_code")
    if not code:
        code = secrets.token_hex(4); set_partner_code(cid, code)
    if not BOT_USERNAME:
        try: BOT_USERNAME = (await context.bot.get_me()).username
        except Exception: BOT_USERNAME = None
    link = f"https://t.me/{BOT_USERNAME}?start=p_{code}" if BOT_USERNAME else None
    linked = partner_of(cid)
    body = ("👫 Партнёрский режим. Перешли партнёру ссылку ниже. Он откроет бота и каждое утро будет получать короткий апдейт: "
            "твоя фаза, настроение и что можно сделать или купить.\n\n")
    body += (link if link else f"Код подключения: {code}")
    body += ("\n\nПартнёр уже подключён." if linked else "\n\nПартнёр пока не подключён.")
    if linked:
        body += " Отключить можно командой /unlink"
    await msg.reply_text(body)

async def partner_join(context, partner_cid, msg, code):
    woman = woman_by_code(code)
    if not woman:
        return await msg.reply_text("Ссылка недействительна. Попроси прислать новую через Меню, кнопка Партнёр.")
    if woman == partner_cid:
        return await msg.reply_text("Это твоя же ссылка, перешли её партнёру.")
    link_partner(partner_cid, woman); ev(partner_cid, "goal", meta="partner_link")
    await msg.reply_text(PARTNER_HELLO)
    await push_partner(context, woman)  # сразу первый апдейт, не ждать утра
    try:
        await context.bot.send_message(woman, "💛 Партнёр подключился к твоему AIWA и будет получать ежедневный апдейт. Отключить можно в Меню, кнопка Партнёр.")
    except Exception: pass

# ---------- commands ----------
async def start(update, context):
    cid = update.effective_chat.id
    if context.args and context.args[0].startswith("p_"):
        return await partner_join(context, cid, update.message, context.args[0][2:])
    if is_partner(cid) and not is_onboarded(row(cid)):
        return await update.message.reply_text(PARTNER_INFO)
    if is_onboarded(row(cid)):
        return await update.message.reply_text(
            "У тебя уже настроен цикл, данные на месте. Продолжить или начать настройку заново?",
            reply_markup=InlineKeyboardMarkup([[B("Продолжить", "keep", KBS.PRIMARY)], [B("Начать заново", "go_start", KBS.DANGER)]]))
    await begin_onboard(cid, update.message)
async def today(update, context):
    cid = update.effective_chat.id; ev(cid, "command")
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    await push_summary(context, cid)
async def calendar_cmd(update, context):
    cid = update.effective_chat.id; ev(cid, "command"); u, st = status_of(cid)
    if not is_onboarded(u): return await need_onboard(update.message)
    if st is None: return await update.message.reply_text("Пока не вижу данных цикла. Отметь последние месячные командой /period или кнопкой «Отметить месячные», и я покажу фазы и календарь.")
    if st["status"] != "normal": return await send_delay(context, cid, st)
    await send_infographic(context.bot, cid)
async def menu(update, context):
    ev(update.effective_chat.id, "command")
    u = row(update.effective_chat.id)
    if not is_onboarded(u): return await need_onboard(update.message)
    await update.message.reply_text("О чём рассказать сегодня?", reply_markup=menu_kb_for(u))
async def checkin_cmd(update, context):
    ev(update.effective_chat.id, "command"); cid = update.effective_chat.id
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    log_ensure(cid, date.today().isoformat())
    await update.message.reply_text("Отметим самочувствие. Какая сегодня энергия?", reply_markup=en_kb("e"))
async def period_cmd(update, context):
    ev(update.effective_chat.id, "command"); cid = update.effective_chat.id
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    if context.args:
        d = parse_date(context.args[0])
        if d:
            mark_period(context, cid, d.isoformat())
            await update.message.reply_text(f"Отметила начало месячных: {d.strftime('%d.%m.%Y')}. Вот свежая сводка:")
            return await push_summary(context, cid)
    upsert(cid, state="await_period_date")
    await update.message.reply_text("Когда начались последние месячные? Напиши дату (например 25.05.2026) или нажми кнопку.", reply_markup=PERIOD_KB)
async def set_time_cmd(update, context):
    ev(update.effective_chat.id, "command"); cid = update.effective_chat.id
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    hhmm = parse_time(context.args[0]) if context.args else None
    if not hhmm:
        upsert(cid, state="await_time")
        return await update.message.reply_text("Во сколько присылать сводку (МСК)? Выбери или впиши своё время, например 09:00.", reply_markup=time_kb())
    upsert(cid, send_time=hhmm, state=None); schedule_daily(context.application, cid, hhmm)
    await update.message.reply_text(f"Время сводки: {hhmm} (МСК).")
async def menutoday_cmd(update, context):
    cid = update.effective_chat.id; ev(cid, "command"); u, st = status_of(cid)
    if not is_onboarded(u): return await need_onboard(update.message)
    if st is None: return await send_general(context, cid, "food")
    await send_menu(context, cid)
async def profile_cmd(update, context):
    cid = update.effective_chat.id; ev(cid, "command")
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    upsert(cid, state="await_profile")
    await update.message.reply_text("Обновим данные для питания. Напиши через пробел рост (см), вес (кг), возраст. Например 168 60 30.", reply_markup=SKIP_KB)
async def guide_cmd(update, context):
    ev(update.effective_chat.id, "command"); await send_guide(context, update.effective_chat.id, GUIDES[0])
async def about_cmd(update, context):
    ev(update.effective_chat.id, "command"); await update.message.reply_text(ABOUT_TEXT)
async def report_cmd(update, context):
    cid = update.effective_chat.id; ev(cid, "command")
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    await update.message.reply_text("За какой период собрать выписку для врача?", reply_markup=HIST_KB)
async def partner_cmd(update, context):
    cid = update.effective_chat.id; ev(cid, "command")
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    await partner_entry(context, cid, update.message)
async def unlink_cmd(update, context):
    cid = update.effective_chat.id
    c = db(); c.execute("DELETE FROM partners WHERE partner_id=? OR woman_id=?", (cid, cid)); c.commit(); c.close()
    await update.message.reply_text("Партнёрская связь отключена.")
async def app_cmd(update, context):
    cid = update.effective_chat.id; ev(cid, "command")
    u = row(cid)
    if not is_onboarded(u): return await need_onboard(update.message)
    url = webapp_url(u)
    if not url:
        return await update.message.reply_text("Приложение скоро подключим.")
    await update.message.reply_text("Интерактивный экран цикла:",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("📅 Мой цикл", web_app=WebAppInfo(url=url))]]))
async def stop(update, context):
    cid = update.effective_chat.id
    for j in context.application.job_queue.get_jobs_by_name(str(cid)): j.schedule_removal()
    del_user(cid); await update.message.reply_text("Отключила сводки и удалила данные. Вернуться: /start")
async def help_cmd(update, context):
    await update.message.reply_text("AIWA, помощник по циклу. Команды:\n/menu меню\n/today сводка за день\n/checkin отметить симптомы\n/period отметить месячные\n/calendar календарь цикла\n/report выписка для врача\n/partner подключить партнёра\n/unlink отключить партнёра\n/profile мои данные\n/app открыть приложение\n/time время сводки\n/about о боте\n/stop удалить данные")

# ---------- stats ----------
def aggregate_stats():
    from collections import defaultdict, Counter
    import statistics as ST
    PRICE = float(os.environ.get("AIWA_TOKEN_PRICE_USD", "0.5"))  # $ за 1M токенов, blended, приблизительно
    c = db()
    users = c.execute("SELECT chat_id, created, last_period, cycle_len, mode FROM users").fetchall()
    rows = c.execute("SELECT chat_id, ts, action, tokens, meta, ms, n FROM events ORDER BY chat_id, ts").fetchall()
    c.close()
    now = datetime.now(); today = now.date()
    ACT = {"manual", "button", "suggest", "command", "fallback", "answered"}
    ev_by_user = defaultdict(list); active_days = defaultdict(set); first_day = {}
    tokens_total = 0; answered = 0; fallback = 0; errors = 0
    goals = Counter(); intents = Counter(); lat = []; reqlens = []
    for cid, ts, action, tok, meta, ms, n in rows:
        t = datetime.fromisoformat(ts); d = t.date(); tokens_total += (tok or 0)
        if action in ACT:
            ev_by_user[cid].append(t); active_days[cid].add(d)
            if cid not in first_day or d < first_day[cid]: first_day[cid] = d
            intents[meta or action] += 1
        if action == "answered":
            answered += 1
            if ms: lat.append(ms)
            if n: reqlens.append(n)
        elif action == "fallback": fallback += 1
        elif action == "error": errors += 1
        elif action == "goal": goals[meta or "goal"] += 1
        elif action == "manual" and n: reqlens.append(n)

    n_users = len(users)
    onboarded = sum(1 for _, _, lp, cl, md in users if (lp and cl) or md in ("irregular", "none", "meno"))
    signups = len(set(r[0] for r in rows if r[2] == "signup")) or n_users
    activated = len(set(r[0] for r in rows if r[2] == "activated"))
    act_rate = activated / signups * 100 if signups else 0
    def active_in(days):
        cut = today - timedelta(days=days - 1)
        return len(set(cid for cid, ds in active_days.items() if any(dd >= cut for dd in ds)))
    dau, wau, mau = active_in(1), active_in(7), active_in(30)
    sev7 = today - timedelta(days=7)
    returning = len(set(cid for cid, ds in active_days.items() if any(dd > sev7 for dd in ds) and any(dd <= sev7 for dd in ds)))
    stick = dau / mau * 100 if mau else 0

    GAP = 1800; sessions = 0; slens = []; sev = []; requests = 0
    for cid, tl in ev_by_user.items():
        tl = sorted(tl); requests += len(tl); cur = []
        for t in tl:
            if cur and (t - cur[-1]).total_seconds() > GAP:
                sessions += 1; slens.append((cur[-1] - cur[0]).total_seconds()); sev.append(len(cur)); cur = []
            cur.append(t)
        if cur: sessions += 1; slens.append((cur[-1] - cur[0]).total_seconds()); sev.append(len(cur))
    avg_slen = ST.mean(slens) / 60 if slens else 0; avg_sev = ST.mean(sev) if sev else 0
    spu = sessions / len(ev_by_user) if ev_by_user else 0; rps = requests / sessions if sessions else 0

    def retention(win):
        elig = [cid for cid, fd in first_day.items() if (today - fd).days >= win]
        if not elig: return None
        ret = sum(1 for cid in elig if any((dd - first_day[cid]).days >= win for dd in active_days[cid]))
        return ret / len(elig) * 100
    r1, r7, r30 = retention(1), retention(7), retention(30)
    l7 = [len([dd for dd in ds if (today - dd).days < 7]) for ds in active_days.values()]
    avg_l7 = ST.mean(l7) if l7 else 0

    ans_tot = answered + fallback + errors
    succ = answered / ans_tot * 100 if ans_tot else 0
    fb_rate = fallback / requests * 100 if requests else 0
    err_rate = errors / requests * 100 if requests else 0
    avg_reqlen = ST.mean(reqlens) if reqlens else 0
    tpd = tokens_total / answered if answered else 0
    cost = tokens_total / 1e6 * PRICE; cost_act = cost / mau if mau else 0
    def pct(a, p):
        a = sorted(a); return a[min(len(a) - 1, int(len(a) * p))] if a else 0
    p50, p95 = pct(lat, 0.5), pct(lat, 0.95)
    modes = Counter((md or "cycle") for _, _, lp, cl, md in users)
    got_sum = len(set(r[0] for r in rows if r[2] == "goal" and r[4] == "summary"))
    got_out = len(set(r[0] for r in rows if r[2] == "goal" and r[4] in ("report", "partner_link")))
    def fr(x): return f"{x:.0f}%" if x is not None else "n/a"
    top = ", ".join(f"{k} {v}" for k, v in intents.most_common(8)) or "нет данных"
    goalstr = ", ".join(f"{k} {v}" for k, v in goals.most_common()) or "нет"
    modestr = ", ".join(f"{k} {v}" for k, v in modes.most_common())

    return (
        "Аналитика AIWA\n\n"
        "АУДИТОРИЯ\n"
        f"Всего: {n_users}, онбординг пройден: {onboarded}\n"
        f"DAU {dau} / WAU {wau} / MAU {mau}\n"
        f"Вернувшиеся: {returning}, stickiness DAU/MAU: {stick:.0f}%\n"
        f"Режимы: {modestr}\n\n"
        "АКТИВАЦИЯ\n"
        f"Регистраций: {signups}, активаций: {activated} ({act_rate:.0f}%)\n\n"
        "ВОВЛЕЧЕНИЕ\n"
        f"Сессий: {sessions}, на юзера {spu:.1f}, средняя длина {avg_slen:.1f} мин, событий/сессия {avg_sev:.1f}\n"
        f"Запросов: {requests}, на сессию {rps:.1f}, средняя длина ввода {avg_reqlen:.0f} симв.\n\n"
        "УДЕРЖАНИЕ (rolling)\n"
        f"D1 {fr(r1)}, D7 {fr(r7)}, D30 {fr(r30)}; активных дней за 7: {avg_l7:.1f}\n\n"
        "УСПЕШНОСТЬ\n"
        f"Ответов: {answered}, доля успешных {succ:.0f}%, фолбэков {fallback} ({fb_rate:.0f}%), ошибок {errors} ({err_rate:.0f}%)\n"
        f"Целевые действия: {goalstr}\n"
        f"Воронка: рег {signups} → актив {activated} → получили сводку {got_sum} → выписка/партнёр {got_out}\n\n"
        "ЗАПРОСЫ\n"
        f"Топ интентов: {top}\n\n"
        "ТОКЕНЫ И СКОРОСТЬ\n"
        f"Токенов: {tokens_total}, на диалог ~{tpd:.0f}\n"
        f"Оценка стоимости: ${cost:.2f} (по ${PRICE}/1M токенов), на активного ${cost_act:.3f}\n"
        f"Латентность ответа: p50 {p50} мс, p95 {p95} мс"
    )


async def stats_cmd(update, context):
    cid = update.effective_chat.id
    if not AIWA_ADMIN:
        return await update.message.reply_text(f"Статистика закрыта. Твой chat id: {cid}. Задай в Railway переменную AIWA_ADMIN={cid}, и команда станет доступна только тебе.")
    if str(cid) != str(AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    await update.message.reply_text(aggregate_stats())

# ---------- text ----------
async def on_text(update, context):
    await handle_text(update, context, update.message.text.strip())

async def on_voice(update, context):
    cid = update.effective_chat.id; txt = None
    await context.bot.send_chat_action(cid, "typing")
    try:
        f = await context.bot.get_file(update.message.voice.file_id)
        ba = await f.download_as_bytearray(); txt = await asyncio.to_thread(L.transcribe, bytes(ba))
    except Exception as e:
        log.warning("voice: %s", e)
    if not txt:
        return await update.message.reply_text("Не разобрала голосовое, попробуй ещё раз или напиши текстом.")
    ev(cid, "voice", n=len(txt))
    await update.message.reply_text(f"🎙 Расслышала: «{txt}»")
    await handle_text(update, context, txt)

async def handle_text(update, context, txt):
    cid = update.effective_chat.id; u = row(cid); state = u["state"] if u else None
    cem = [e.custom_emoji_id for e in (update.message.entities or []) if getattr(e, "custom_emoji_id", None)]
    if cem:
        return await update.message.reply_text("ID кастомных эмодзи:\n" + "\n".join(cem))

    if is_partner(cid) and not is_onboarded(u):
        wid = woman_of_partner(cid); _, wst = status_of(wid)
        if not wst:
            return await update.message.reply_text(PARTNER_INFO)
        mt = match_meta(txt)
        if mt:
            return await update.message.reply_text({"about": ABOUT_TEXT, "privacy": PRIVACY_TEXT, "tech": TECH_TEXT}[mt])
        if is_gibberish(txt):
            return await update.message.reply_text("Не поняла вопрос. Напиши словами, например: «как её поддержать сегодня» или «что ей купить».")
        await context.bot.send_chat_action(cid, "typing")
        t0 = time.monotonic(); usage = []
        ans = await asyncio.to_thread(L.partner_answer, wst, txt, last_hint(wid), usage=usage)
        ev(cid, "answered", tokens=sum(usage), meta="partner_q", ms=int((time.monotonic()-t0)*1000), n=len(txt))
        return await context.bot.send_message(cid, ans)

    if state == "await_date":
        d = parse_date(txt)
        if not d: return await update.message.reply_text("Не разобрала дату. Напиши в формате ДД.ММ.ГГГГ, например 25.05.2026, или нажми кнопку выше.")
        upsert(cid, pending_date=d.isoformat(), state="await_len")
        return await update.message.reply_text("Поняла. Какая у тебя средняя длина цикла в днях? (обычно 21-35, по умолчанию 28)")
    if state == "await_len":
        try:
            n = int(txt); assert 20 <= n <= 60
        except (ValueError, AssertionError):
            return await update.message.reply_text("Нужно число от 20 до 60. Если цикла нет или он нерегулярный, начни заново через /start и выбери «Нет регулярного цикла». Если не знаешь длину, напиши 28.")
        finish_onboarding(context, cid, u["pending_date"], n)
        note = ""
        if n > 40:
            note = ("Цикл длиннее 40 дней часто говорит о нерегулярности (бывает при СПКЯ, щитовидке, стрессе), это стоит обсудить с гинекологом. "
                    "Ориентировочные фазы я всё равно посчитаю и буду следить за симптомами.\n\n")
        upsert(cid, state="await_profile")
        return await update.message.reply_text(note +
            "Осталось немного для персонального питания и калорий.\nНапиши через пробел рост (см), вес (кг) и возраст. Например: 168 60 30.", reply_markup=SKIP_KB)

    if state == "await_diet":
        upsert(cid, diet_note=txt[:200])
        sel = set((row(cid).get("diet") or "").split(",")) - {""}
        return await update.message.reply_text("Записала: " + txt[:200] + ". Можно отметить ещё кнопками или нажать Готово.", reply_markup=diet_kb(sel))

    if state == "await_profile":
        nums = [p for p in re.split(r"[ ,;/]+", txt) if p]
        try:
            cm = float(nums[0]); kg = float(nums[1]); age = int(float(nums[2]))
            assert 120 < cm < 220 and 30 < kg < 250 and 10 < age < 80
        except Exception:
            return await update.message.reply_text("Нужно три числа: рост в см, вес в кг, возраст. Например 168 60 30. Или нажми «Пропустить».", reply_markup=SKIP_KB)
        upsert(cid, height=int(cm), weight=kg, age=age, state=None)
        return await update.message.reply_text("Принято. Оцени свой уровень физической активности:", reply_markup=ACT_KB)

    if state == "await_time":
        hhmm = parse_time(txt)
        if hhmm:
            upsert(cid, send_time=hhmm, state=None); schedule_daily(context.application, cid, hhmm)
            return await update.message.reply_text(f"Время сводки: {hhmm} (МСК).")
        upsert(cid, state=None)
    elif state == "await_period_date":
        d = parse_date(txt)
        if d:
            mark_period(context, cid, d.isoformat())
            await update.message.reply_text(f"Отметила начало месячных: {d.strftime('%d.%m.%Y')}. Вот свежая сводка:")
            return await push_summary(context, cid)
        upsert(cid, state=None)

    m = match_meta(txt)
    if m:
        ev(cid, "manual", meta="meta", n=len(txt))
        return await update.message.reply_text({"about": ABOUT_TEXT, "privacy": PRIVACY_TEXT, "tech": TECH_TEXT}[m])

    low = txt.lower()
    if is_onboarded(u) and re.search(r"(где.*сводк|пришл\w*\s*сводк|покажи\s*сводк|моя\s*сводк|^сводк|что там сегодня|что сегодня по циклу)", low):
        ev(cid, "manual", meta="summary_intent", n=len(txt)); return await push_summary(context, cid)
    if is_onboarded(u) and is_cycle(u) and re.search(r"(замен\w*|друго[ей]\w*\s+блюд\w*|другое на (завтрак|обед|ужин|перекус)|не нравит\w* блюд\w*|обнови\w* меню|пересобер\w* меню)", low):
        _, st = status_of(cid); ev(cid, "manual", meta="menu_replace", n=len(txt))
        return await send_menu(context, cid)
    if is_onboarded(u) and is_gibberish(txt):
        ev(cid, "fallback", meta="gibberish", n=len(txt))
        return await update.message.reply_text("Не поняла запрос. Напиши вопрос словами, например: «почему тянет на сладкое» или «какая тренировка сегодня».")

    if is_onboarded(u):
        _intent = match_intent(txt)
        if _intent:
            return await dispatch_intent(context, update, cid, u, _intent)

    if is_onboarded(u) and not is_cycle(u):
        await context.bot.send_chat_action(cid, "typing")
        t0 = time.monotonic(); usage = []
        ans = await think_llm(context, cid, L.general_answer, profile_of(u), u.get("mode"), txt, hint=last_hint(cid), history=hist_get(cid), usage=usage)
        ev(cid, "answered", tokens=sum(usage), meta="general", ms=int((time.monotonic()-t0)*1000), n=len(txt))
        hist_push(cid, txt, ans)
        return await send_answer(context, cid, ans, None, txt, usage=usage)
    if is_onboarded(u):
        _, st = status_of(cid); await context.bot.send_chat_action(cid, "typing")
        g = match_guide(txt)
        if g: await send_guide(context, cid, g)
        t0 = time.monotonic(); usage = []
        ans = await think_llm(context, cid, L.answer_question, st, txt, profile_of(u), hist_get(cid), usage=usage)
        ev(cid, "answered", meta="answer", ms=int((time.monotonic()-t0)*1000), n=len(txt))
        hist_push(cid, txt, ans)
        return await send_answer(context, cid, ans, st, txt, usage=usage)
    await need_onboard(update.message)

# ---------- callbacks ----------
async def on_cb(update, context):
    q = update.callback_query; await q.answer(); cid = q.message.chat.id; data = q.data
    if data == "go_start": return await begin_onboard(cid, q.message)
    if data == "keep": return await q.message.reply_text("О чём рассказать сегодня?", reply_markup=MENU_KB)
    if data == "onb_today":
        upsert(cid, pending_date=date.today().isoformat(), state="await_len")
        return await q.message.reply_text("Отметила начало месячных сегодня. Какая средняя длина цикла в днях? (обычно 21-35, по умолчанию 28)")
    if data == "prof_skip":
        upsert(cid, state=None); return await welcome_finish(context, cid, q.message)
    if data.startswith("act:"):
        upsert(cid, activity=int(data.split(":")[1]), state="await_diet")
        upsert(cid, state="await_diet")
        return await q.message.reply_text("Есть ограничения в еде? Отметь кнопками или напиши своё текстом (например «без свинины, без сахара»), потом Готово.", reply_markup=diet_kb(set()))
    if data.startswith("diet:s:"):
        code = data.split(":")[2]; cur = set((row(cid).get("diet") or "").split(",")) - {""}
        cur.symmetric_difference_update({code}); upsert(cid, diet=",".join(sorted(cur)))
        return await q.edit_message_reply_markup(reply_markup=diet_kb(cur))
    if data == "diet:done":
        upsert(cid, state=None); return await welcome_finish(context, cid, q.message)
    if data == "no_cycle":
        return await q.message.reply_text("Понимаю. Что ближе?", reply_markup=NOCYCLE_KB)
    if data.startswith("mode:"):
        m = data.split(":")[1]; upsert(cid, mode=m, state="await_profile")
        schedule_daily(context.application, cid, row(cid)["send_time"] or "08:00")
        return await q.message.reply_text(
            "Поняла. Фазы цикла отслеживать не буду, но дам рекомендации по самочувствию, питанию и движению с учётом возраста и помогу следить за симптомами.\n\n"
            "Чтобы советы были точнее, напиши через пробел рост (см), вес (кг) и возраст. Например 168 60 30.", reply_markup=SKIP_KB)
    ev(cid, "suggest" if data.startswith("q:") else "button", meta=data)
    u, st = status_of(cid)
    if not st and not is_onboarded(u):
        return await need_onboard(q.message)
    general = st is None
    today_s = date.today().isoformat()
    if data == "menu":
        await q.message.reply_text("О чём рассказать сегодня?", reply_markup=(GENERAL_MENU_KB if general else menu_kb_for(u)))
    elif data == "food":
        if general: await send_general(context, cid, "food")
        else: await send_section(context, cid, st, "food")
    elif data.startswith("sec:"):
        if general: await send_general(context, cid, "training")
        else: await send_section(context, cid, st, data.split(":")[1])
    elif data == "calendar":
        if general: await q.message.reply_text("Пока не вижу данных цикла. Отметь последние месячные командой /period или кнопкой «Отметить месячные», и я покажу фазы и календарь.")
        elif st["status"] != "normal": await send_delay(context, cid, st)
        else: await send_infographic(context.bot, cid)
    elif data == "history":
        await q.message.reply_text("За какой период собрать выписку для врача?", reply_markup=HIST_KB)
    elif data.startswith("rep:"):
        await send_report(context, cid, data.split(":")[1])
    elif data == "partner":
        await partner_entry(context, cid, q.message)
    elif data == "guides":
        await send_guide(context, cid, GUIDES[0])
    elif data == "checkin":
        log_ensure(cid, today_s); await q.message.reply_text("Отметим самочувствие. Какая сегодня энергия?", reply_markup=en_kb("e"))
    elif data == "period":
        upsert(cid, state="await_period_date")
        await q.message.reply_text("Когда начались последние месячные? Напиши дату (например 25.05.2026) или нажми кнопку.", reply_markup=PERIOD_KB)
    elif data == "period_today":
        mark_period(context, cid, today_s)
        await q.message.reply_text("Отметила начало месячных сегодня. Вот свежая сводка:")
        await push_summary(context, cid)
    elif data == "set:time":
        upsert(cid, state="await_time")
        await q.message.reply_text("Во сколько присылать сводку (МСК)? Выбери или впиши своё время, например 09:00.", reply_markup=time_kb())
    elif data.startswith("tm:"):
        hhmm = data.split(":", 1)[1]; upsert(cid, send_time=hhmm, state=None); schedule_daily(context.application, cid, hhmm)
        await q.message.reply_text(f"Время сводки: {hhmm} (МСК).")
    elif data.startswith("ci:e:"):
        log_set(cid, today_s, energy=int(data.split(":")[2])); await q.edit_message_text("Настроение?", reply_markup=en_kb("m"))
    elif data.startswith("ci:m:"):
        log_set(cid, today_s, mood=int(data.split(":")[2])); await q.edit_message_text("Что беспокоит сегодня? Можно несколько, потом Готово.", reply_markup=sym_kb(set()))
    elif data.startswith("ci:s:"):
        log_toggle(cid, today_s, data.split(":")[2]); sel = set((log_get(cid, today_s) or {}).get("symptoms", [])); await q.edit_message_reply_markup(reply_markup=sym_kb(sel))
    elif data == "ci:done":
        ev(cid, "goal", meta="checkin"); await q.edit_message_text("Записала. Учту в завтрашней сводке.")
    elif data.startswith("q:"):
        question = get_sugg(int(data.split(":")[1])) or "Дай рекомендацию"
        await context.bot.send_chat_action(cid, "typing")
        if general:
            usage = []; ans = await think_llm(context, cid, L.general_answer, profile_of(u), u.get("mode"), question, hint=last_hint(cid), history=hist_get(cid), usage=usage)
            hist_push(cid, question, ans)
            await send_answer(context, cid, ans, None, question, usage=usage, quote=question)
        else:
            usage = []; ans = await think_llm(context, cid, L.answer_question, st, question, profile_of(u), hist_get(cid), usage=usage)
            hist_push(cid, question, ans)
            await send_answer(context, cid, ans, st, question, usage=usage, quote=question)

async def on_error(update, context):
    log.error("handler error", exc_info=context.error)
    try:
        if isinstance(update, Update) and update.effective_chat:
            ev(update.effective_chat.id, "error", meta=type(context.error).__name__)
            await context.bot.send_message(update.effective_chat.id,
                "Упс, что-то пошло не так. Попробуй ещё раз.",
                reply_markup=InlineKeyboardMarkup([[B("Меню", "menu", KBS.PRIMARY)]]))
    except Exception: pass

async def load_logger(app):
    """Раз в минуту пишет в лог сводку нагрузки: вызовы модели, средняя латентность, очередь рассылки, число юзеров."""
    while True:
        await asyncio.sleep(60)
        try:
            s = L.pop_stats(); calls = s["calls"]
            avg = (s["ms"] // calls) if calls else 0
            q = BCAST_Q.qsize() if BCAST_Q is not None else 0
            wq = s.get("queued", 0); wms = (s.get("wait_ms", 0) // calls) if calls else 0
            log.info("LOAD/60s llm_calls=%d avg_ms=%d wait_ms=%d queued=%d err=%d bcast_q=%d users=%d", calls, avg, wms, wq, s["err"], q, len(all_users()))
        except Exception as e:
            log.warning("load_logger: %s", e)

async def on_startup(app):
    global BOT_USERNAME, BCAST_Q
    try:
        import concurrent.futures
        asyncio.get_running_loop().set_default_executor(concurrent.futures.ThreadPoolExecutor(max_workers=24))
    except Exception as e:
        log.warning("executor: %s", e)
    if AIWA_WEBAPP_URL:
        try:
            await app.bot.set_chat_menu_button(menu_button=MenuButtonWebApp(text="Айва", web_app=WebAppInfo(url=AIWA_WEBAPP_URL)))
        except Exception as e:
            log.warning("menu button: %s", e)
    try:
        await app.bot.set_my_commands([
            BotCommand("menu", "Меню"), BotCommand("today", "Сводка за день"),
            BotCommand("checkin", "Отметить симптомы"), BotCommand("period", "Отметить месячные"),
            BotCommand("calendar", "Календарь цикла"), BotCommand("report", "Выписка для врача"),
            BotCommand("partner", "Подключить партнёра"), BotCommand("unlink", "Отключить партнёра"),
            BotCommand("profile", "Мои данные"), BotCommand("app", "Открыть приложение"),
            BotCommand("time", "Время сводки"), BotCommand("about", "О боте"),
            BotCommand("help", "Команды"), BotCommand("stop", "Удалить данные")])
    except Exception as e:
        log.warning("set commands: %s", e)
    try: BOT_USERNAME = app.bot.username
    except Exception: BOT_USERNAME = None
    BCAST_Q = asyncio.Queue()
    asyncio.create_task(broadcast_worker(app))
    asyncio.create_task(load_logger(app))
    n = 0
    for cid in all_users(): schedule_daily(app, cid, row(cid)["send_time"] or "08:00"); n += 1
    log.info("Rescheduled %d", n)

WEB_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "webapp")
def _verify_init(init_data):
    try:
        pairs = dict(_pqsl(init_data, keep_blank_values=True))
        rh = pairs.pop("hash", "")
        if not rh: return None
        dcs = "\n".join(f"{k}={pairs[k]}" for k in sorted(pairs))
        secret = _hmac.new(b"WebAppData", os.environ["BOT_TOKEN"].encode(), _hashlib.sha256).digest()
        calc = _hmac.new(secret, dcs.encode(), _hashlib.sha256).hexdigest()
        if calc != rh: return None
        import json as _j
        return _j.loads(pairs.get("user", "{}")).get("id")
    except Exception as e:
        log.warning("init verify: %s", e); return None
def _cors(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    resp.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    return resp
async def _serve_index(request):
    BD = os.path.dirname(os.path.abspath(__file__))
    for p in (os.path.join(WEB_DIR, "index.html"), os.path.join(BD, "index.html"),
              os.path.join(BD, "webapp.html"), os.path.join(BD, "aiwa_webapp.html")):
        if os.path.exists(p): return web.FileResponse(p)
    return web.Response(text="webapp not found", status=404)
async def _api_data(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not u or not is_onboarded(u): return _cors(web.json_response({"onboarded": False}))
    out = {"onboarded": True, "cycle": bool(is_cycle(u) and u.get("last_period")),
           "last_period": u.get("last_period"), "cycle_len": u.get("cycle_len") or 28,
           "mode": u.get("mode") or "cycle", "name": (body.get("name") or "")}
    return _cors(web.json_response(out))
async def _api_section(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid); _, st = status_of(cid); kind = body.get("kind", "food"); ev(cid, "button", meta="web_" + kind)
    if st is None:
        q = {"food": "Что мне есть сегодня под мой возраст?", "training": "Какая активность мне подходит и почему?"}.get(kind, kind)
        ans = await asyncio.to_thread(L.general_answer, profile_of(u), u.get("mode"), q, None, None)
        return _cors(web.json_response({"text": ans}))
    if kind == "food":
        prof = profile_of(u); target = profile_kcal(prof) if prof else None
        menu = await asyncio.to_thread(L.menu_today, st, profile=prof, target=target)
        if target: menu["macros"] = {"protein": f"{target[1]} г", "fat": f"{target[2]} г", "carbs": f"{target[3]} г"}
        text = await asyncio.to_thread(L.explain_section, st, "food")
        text = L.split_followups(text)[0]
        return _cors(web.json_response({"menu": menu, "kcal": (target[0] if target else None), "text": text}))
    text = await asyncio.to_thread(L.explain_section, st, "training")
    text = L.split_followups(text)[0]
    return _cors(web.json_response({"text": text}))
async def _api_chat(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    msg = (body.get("message") or "").strip()
    if not msg: return _cors(web.json_response({"answer": "Напиши вопрос.", "suggestions": []}))
    u = row(cid); _, st = status_of(cid)
    if st is not None:
        ans = await asyncio.to_thread(L.answer_question, st, msg, profile_of(u), hist_get(cid))
    else:
        ans = await asyncio.to_thread(L.general_answer, profile_of(u), u.get("mode"), msg, None, hist_get(cid))
    hist_push(cid, msg, ans)
    clean, sugg = L.split_followups(ans)
    if st is not None and len(sugg) < 2:
        try:
            for e in L.followups(st, msg, clean):
                if e not in sugg and len(sugg) < 2: sugg.append(e)
        except Exception: pass
    ev(cid, "answered", meta="webapp", n=len(msg))
    return _cors(web.json_response({"answer": clean, "suggestions": sugg[:2]}))
async def _api_opts(request): return _cors(web.Response())
def build_web():
    aio = web.Application()
    aio.router.add_get("/", _serve_index)
    aio.router.add_get("/health", lambda r: web.Response(text="ok"))
    aio.router.add_post("/api/data", _api_data)
    aio.router.add_post("/api/section", _api_section)
    aio.router.add_post("/api/chat", _api_chat)
    aio.router.add_route("OPTIONS", "/api/{tail:.*}", _api_opts)
    aio.router.add_get("/{tail:.*}", _serve_index)
    return aio

async def run_all():
    app = Application.builder().token(os.environ["BOT_TOKEN"]).post_init(on_startup).build()
    for cmd, fn in (("start", start), ("today", today), ("summary", today), ("calendar", calendar_cmd), ("checkin", checkin_cmd),
                    ("period", period_cmd), ("menu", menu), ("time", set_time_cmd), ("menutoday", menutoday_cmd),
                    ("profile", profile_cmd), ("guide", guide_cmd), ("about", about_cmd), ("report", report_cmd), ("partner", partner_cmd), ("unlink", unlink_cmd), ("app", app_cmd), ("stop", stop), ("help", help_cmd), ("stats", stats_cmd)):
        app.add_handler(CommandHandler(cmd, fn))
    app.add_error_handler(on_error)
    app.add_handler(CallbackQueryHandler(on_cb))
    app.add_handler(MessageHandler(filters.VOICE, on_voice))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, on_text))
    runner = web.AppRunner(build_web()); await runner.setup()
    port = int(os.environ.get("PORT", "8080"))
    site = web.TCPSite(runner, "0.0.0.0", port); await site.start()
    await app.initialize(); await app.start(); await app.updater.start_polling(allowed_updates=Update.ALL_TYPES)
    log.info("AIWA bot + web on :%s", port)
    await asyncio.Event().wait()

def main():
    asyncio.run(run_all())

if __name__ == "__main__":
    main()
