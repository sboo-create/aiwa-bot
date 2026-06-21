# -*- coding: utf-8 -*-
"""AIWA, Telegram-бот женского здоровья по циклу: сводка, инфографика, меню, чек-ин, история, статистика."""
import os, io, re, time, html, asyncio, sqlite3, secrets, logging
from collections import deque
from datetime import datetime, date, time as dtime, timedelta
try:
    from zoneinfo import ZoneInfo
except ImportError:
    from datetime import timezone
    def ZoneInfo(name):
        return timezone(timedelta(hours=3)) if name == "Europe/Moscow" else timezone.utc

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, InputMediaPhoto, WebAppInfo, MenuButtonWebApp, BotCommand
from telegram.ext import (Application, CommandHandler, MessageHandler,
                          CallbackQueryHandler, ContextTypes, filters)
from aiohttp import web
import hmac as _hmac, hashlib as _hashlib
from urllib.parse import parse_qsl as _pqsl

import cycle as C
import llm as L

class KBS:
    PRIMARY = "primary"
    SUCCESS = "success"
    DANGER = "danger"

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
    try: chatlog_add(cid, "user", q[:1000]); chatlog_add(cid, "ai", (clean or a)[:1500])
    except Exception: pass

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("aiwa")
TZ = ZoneInfo(os.environ.get("AIWA_TZ", "Europe/Moscow"))
DB = os.environ.get("AIWA_DB") or ("/data/aiwa.db" if os.path.isdir("/data") else "aiwa.db")
if os.path.dirname(DB): os.makedirs(os.path.dirname(DB), exist_ok=True)
AIWA_ADMIN = os.environ.get("AIWA_ADMIN")
DISCLAIMER = "AIWA не ставит диагнозы; при тревожных симптомах обратись к гинекологу."
AIWA_VERSION = "2026-06-21-ux-audit-menu-onboarding"
AIWA_WEBAPP_URL = os.environ.get("AIWA_WEBAPP_URL", "")
def webapp_url(u):
    if not AIWA_WEBAPP_URL: return None
    if u and u.get("last_period") and u.get("cycle_len") and u.get("mode", "cycle") == "cycle":
        sep = "&" if "?" in AIWA_WEBAPP_URL else "?"
        return f"{AIWA_WEBAPP_URL}{sep}d={u['last_period']}&c={u['cycle_len']}"
    return AIWA_WEBAPP_URL
def menu_kb_for(u, general=False):
    base = GENERAL_MENU_KB if general else MENU_KB
    rows = [list(r) for r in base.inline_keyboard]
    if AIWA_WEBAPP_URL:
        rows.append([InlineKeyboardButton("📱 Открыть приложение", web_app=WebAppInfo(url=webapp_url(u) or AIWA_WEBAPP_URL))])
    return InlineKeyboardMarkup(rows)
EN = {1: "низкая", 2: "средняя", 3: "высокая"}
SYMPTOMS = [("cramps", "спазмы"), ("head", "головная боль"), ("bloat", "вздутие"),
            ("sweet", "тяга к сладкому"), ("anx", "тревожность"), ("tired", "усталость")]
SYM = dict(SYMPTOMS)

START_TEXT = ("🌸 Привет, я Айва.\n\n"
 "Я веду календарь месячных, показываю прогноз, подбираю питание и нагрузку под твой цикл, помогаю отмечать симптомы, отвечаю на вопросы и могу собрать выписку для врача.\n\n"
 "Настройка короткая: нужен первый день последних месячных и средняя длина цикла. Если цикл нерегулярный, сейчас беременность или менопауза, выбери второй вариант. Остальное можно пропустить и добавить позже.")
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
 "• Спорт: интенсивнее обычного, если хорошее самочувствие\n\n"
 "🌙 Лютеиновая, дни 17 и до месячных\n"
 "Растёт прогестерон, ближе к концу ПМС и тяга к сладкому.\n"
 "• Самочувствие: спад энергии, перепады настроения\n"
 "• Еда: магний и B6, тёмный шоколад 70-85%, орехи, гречка, рыба\n"
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
    c.execute("CREATE TABLE IF NOT EXISTS intimacy(chat_id INTEGER, d TEXT, PRIMARY KEY(chat_id,d))")
    c.execute("CREATE TABLE IF NOT EXISTS chat_log(id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, ts TEXT, role TEXT, text TEXT)")
    c.execute("""CREATE TABLE IF NOT EXISTS logs(chat_id INTEGER, log_date TEXT, energy INTEGER, mood INTEGER,
        symptoms TEXT, PRIMARY KEY(chat_id,log_date))""")
    c.execute("""CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER,
        ts TEXT, action TEXT, tokens INTEGER DEFAULT 0)""")
    c.execute("CREATE TABLE IF NOT EXISTS partners(partner_id INTEGER PRIMARY KEY, woman_id INTEGER, created TEXT)")
    for col in ("meta TEXT", "ms INTEGER DEFAULT 0", "n INTEGER DEFAULT 0"):
        try: c.execute(f"ALTER TABLE events ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    for col in ("end_date TEXT",):
        try: c.execute(f"ALTER TABLE cycles ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    for col in ("state TEXT", "pending_date TEXT", "height INTEGER", "weight REAL", "age INTEGER",
                "activity INTEGER", "diet TEXT", "partner_code TEXT", "mode TEXT", "diet_note TEXT",
                "period_end TEXT", "period_len INTEGER"):
        try: c.execute(f"ALTER TABLE users ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    return c

def row(cid):
    c = db(); r = c.execute("SELECT chat_id,last_period,cycle_len,send_time,modules,state,pending_date,height,weight,age,activity,diet,partner_code,mode,diet_note,period_end,period_len FROM users WHERE chat_id=?", (cid,)).fetchone(); c.close()
    if not r: return None
    return {"chat_id": r[0], "last_period": r[1], "cycle_len": r[2], "send_time": r[3],
            "modules": (r[4] or "phase,general,food,training").split(","), "state": r[5], "pending_date": r[6],
            "height": r[7], "weight": r[8], "age": r[9], "activity": r[10], "diet": r[11] or "", "partner_code": r[12],
            "mode": r[13] or "cycle", "diet_note": r[14] or "", "period_end": r[15], "period_len": r[16]}

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
def cyc_add(cid, d, end=None):
    c = db()
    c.execute("INSERT OR IGNORE INTO cycles(chat_id,start_date,end_date) VALUES(?,?,?)", (cid, d, end))
    if end: c.execute("UPDATE cycles SET end_date=? WHERE chat_id=? AND start_date=?", (end, cid, d))
    c.commit(); c.close()
def cyc_set_end(cid, start_iso, end_iso):
    c = db(); c.execute("UPDATE cycles SET end_date=? WHERE chat_id=? AND start_date=?", (end_iso, cid, start_iso)); c.commit(); c.close()
def pa_list(cid):
    c = db(); r = c.execute("SELECT d FROM intimacy WHERE chat_id=? ORDER BY d", (cid,)).fetchall(); c.close(); return [x[0] for x in r]
def pa_toggle(cid, iso):
    c = db()
    ex = c.execute("SELECT 1 FROM intimacy WHERE chat_id=? AND d=?", (cid, iso)).fetchone()
    if ex:
        c.execute("DELETE FROM intimacy WHERE chat_id=? AND d=?", (cid, iso)); marked = False
    else:
        c.execute("INSERT OR IGNORE INTO intimacy(chat_id,d) VALUES(?,?)", (cid, iso)); marked = True
    c.commit(); c.close(); return marked
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
    c = db(); rows = c.execute("""SELECT chat_id FROM users
        WHERE (last_period IS NOT NULL AND cycle_len IS NOT NULL)
           OR mode IN ('irregular','none','meno','preg')""").fetchall(); c.close(); return [x[0] for x in rows]
def del_user(cid):
    c = db()
    for t in ("users", "cycles", "logs", "chat_log", "intimacy", "sugg"): c.execute(f"DELETE FROM {t} WHERE chat_id=?", (cid,))
    c.execute("DELETE FROM partners WHERE woman_id=? OR partner_id=?", (cid, cid)); c.commit(); c.close()
def chatlog_add(cid, role, text):
    if not text: return
    c = db()
    c.execute("INSERT INTO chat_log(chat_id,ts,role,text) VALUES(?,?,?,?)", (cid, datetime.now().isoformat(), role, text[:1500]))
    c.execute("DELETE FROM chat_log WHERE chat_id=? AND id NOT IN (SELECT id FROM chat_log WHERE chat_id=? ORDER BY id DESC LIMIT 120)", (cid, cid))
    c.commit(); c.close()
def chatlog_get(cid, limit=60):
    c = db(); r = c.execute("SELECT role,text FROM chat_log WHERE chat_id=? ORDER BY id DESC LIMIT ?", (cid, limit)).fetchall(); c.close()
    return [{"role": x[0], "text": x[1]} for x in reversed(r)]
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
def periods_of(cid, since_iso=None):
    c = db()
    if since_iso:
        rows = c.execute("SELECT start_date,end_date FROM cycles WHERE chat_id=? AND start_date>=? ORDER BY start_date", (cid, since_iso)).fetchall()
    else:
        rows = c.execute("SELECT start_date,end_date FROM cycles WHERE chat_id=? ORDER BY start_date", (cid,)).fetchall()
    c.close()
    return [{"start": x[0], "end": x[1]} for x in rows]
def period_start_at_or_before(cid, iso, max_days=10):
    d = date.fromisoformat(iso)
    best = None
    for p in periods_of(cid):
        s = date.fromisoformat(p["start"])
        e = date.fromisoformat(p["end"]) if p.get("end") else s
        if s <= d <= e: return p["start"]
        if s <= d and (d - s).days < max_days and (best is None or s > date.fromisoformat(best)):
            best = p["start"]
    return best
def period_delete_at(cid, iso):
    d = date.fromisoformat(iso); start = None
    for p in periods_of(cid):
        s = date.fromisoformat(p["start"])
        e = date.fromisoformat(p["end"]) if p.get("end") else s
        if s <= d <= e:
            start = p["start"]; break
    if not start: return False
    c = db(); c.execute("DELETE FROM cycles WHERE chat_id=? AND start_date=?", (cid, start)); c.commit(); c.close()
    return True
def logs_of(cid, since_iso=None):
    c = db()
    if since_iso:
        rows = c.execute("SELECT log_date,energy,mood,symptoms FROM logs WHERE chat_id=? AND log_date>=? ORDER BY log_date", (cid, since_iso)).fetchall()
    else:
        rows = c.execute("SELECT log_date,energy,mood,symptoms FROM logs WHERE chat_id=? ORDER BY log_date", (cid,)).fetchall()
    c.close(); return [{"date": r[0], "energy": r[1], "mood": r[2], "symptoms": (r[3].split(",") if r[3] else [])} for r in rows]

# ---------- helpers ----------
MONTHS_RU = {
    "янв": 1, "фев": 2, "мар": 3, "апр": 4, "май": 5, "мая": 5, "мае": 5, "июн": 6, "июл": 7,
    "авг": 8, "сен": 9, "окт": 10, "ноя": 11, "дек": 12,
}
def _month_ru(word):
    w = word.lower().strip(".")
    if w[:3] in MONTHS_RU: return MONTHS_RU[w[:3]]
    if w in MONTHS_RU: return MONTHS_RU[w]
    return None
def parse_date(t):
    ml = re.search(r"(\d{1,2})\s*([а-яё]{3,})\.?(?:\s*(\d{4}))?", t.lower())
    if ml:
        mon = _month_ru(ml.group(2))
        if mon:
            try:
                day = int(ml.group(1)); yr = int(ml.group(3)) if ml.group(3) else date.today().year
                d = date(yr, mon, day)
                if not ml.group(3) and d > date.today(): d = d.replace(year=d.year - 1)
                return d
            except ValueError: pass
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
            if fmt in ("%d.%m", "%d%m"):
                d = d.replace(year=date.today().year)
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

_DATE_RE = re.compile(r"\d{1,2}[.\-/ ]\d{1,2}(?:[.\-/ ]\d{2,4})?|\d{1,2}\s+[а-яё]{3,}\.?(?:\s+\d{4})?", re.I)
def parse_cycle_starts(text):
    return [x["start"] for x in parse_cycle_ranges(text)]
def parse_cycle_ranges(text):
    lines = [l for l in re.split(r"[\n;]+", text) if l.strip()]
    if len(lines) == 1 and len(_DATE_RE.findall(lines[0])) > 1 and not re.search(r"[-\u2013]|\bпо\b", lines[0].lower()):
        segs = [x for x in re.split(r"[,]+", lines[0]) if x.strip()]
    else:
        segs = lines
    out = []
    for seg in segs:
        found = _DATE_RE.findall(seg)
        if not found: continue
        d = parse_date(found[0])
        if not d: continue
        end = None
        if len(found) > 1:
            e = parse_date(found[1])
            if e and e < d and not re.search(r"\d{4}", found[1]):
                try: e = e.replace(year=d.year)
                except ValueError: pass
            if e and d <= e and 1 <= (e - d).days + 1 <= 10:
                end = e
        out.append({"start": d.isoformat(), "end": (end.isoformat() if end else None)})
    seen = set(); res = []
    for x in sorted(out, key=lambda z: z["start"]):
        if x["start"] not in seen:
            seen.add(x["start"]); res.append(x)
    return res

ADDCYCLES_TEXT = ("\U0001F4C5 История цикла вручную.\n\n"
    "Прямой импорт из Flo и других трекеров, к сожалению, невозможен: у них нет открытого доступа к данным для сторонних приложений, поэтому автоматически перенести цикл нельзя. Но историю можно быстро ввести руками.\n\n"
    "Напиши даты начала последних месячных, каждую с новой строки. Если помнишь окончание, добавь через тире. Например:\n"
    "12.04.2026 - 16.04.2026\n14.05.2026 - 18.05.2026\n10.06.2026\n\n"
    "Этот список ПОЛНОСТЬЮ заменит твою историю циклов в календаре, поэтому пришли все нужные даты разом. Если ошиблась в дате раньше, просто пришли правильный список, и старые даты заменятся.")

def match_intent(t):
    t = t.lower()
    if re.search(r"(помен|измен|задать|настро|переключ|во ?сколько|поставь).{0,24}(время|рассылк|сводк|присыл)", t) or re.search(r"\bвремя\b\s*(рассылк|сводк|присыл)", t): return "time"
    if re.search(r"(добав|ввес|внес|загруз|импорт)\w*.{0,16}(истори\w*\s*цикл|цикл)|истори\w*\s*цикл\w*\s*вручную|(импорт|перенес\w*).{0,12}(flo|фло)", t): return "addcycles"
    if re.search(r"(ввес\w*|поменя\w*|измен\w*|обнов\w*|исправ\w*|задат\w*|укаж\w*|написа\w*|внес\w*|поправ\w*)\s*(свой|свои|мой|мои)?\s*(вес|рост|возраст|данные|параметр)|мой вес|новый вес|неправильн\w*.{0,18}(вес|рост|возраст|данные)", t): return "profile"
    if re.search(r"фаз", t) and re.search(r"(что так|что значит|расскаж|объясн|не понима|не разбира|какие бывают|подробнее|про фаз)", t): return "phases"
    if re.search(r"месячн|менструац", t) and re.search(r"(законч[иеё]\w*|кончил\w*|завершил\w*|прошл[иаяо]|перестал\w*|отошл\w*|закончен)", t): return "period_end"
    if re.search(r"(длин\w*|продолжительн\w*).{0,14}цикл|цикл.{0,8}(длин|продолж)|(измен\w*|поменя\w*|задат\w*|сменит\w*|настро\w*|выстав\w*|постав\w*|укаж\w*).{0,14}(длин\w*\s*)?цикл|цикл\w*\s*(на\s+)?\d{1,2}\s*дн", t): return "cyclelen"
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

def is_question_like(txt):
    t = (txt or "").strip().lower()
    if len(t) < 5 or is_gibberish(t): return False
    if re.sub(r"[ .,:/\\-]", "", t).isdigit(): return False
    return ("?" in t) or (re.search(r"(^|\b)(что|как|почему|зачем|когда|какой|какая|какие|каков|сколько|можно ли|нужно ли|стоит ли|значит|расскаж|объясн|правда ли|а если|это\s)", t) is not None)
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

def is_cycle(u): return not (u and u.get("mode") in ("irregular", "none", "meno", "preg"))
def is_onboarded(u):
    if not u: return False
    if u.get("mode") in ("irregular", "none", "meno", "preg"): return True
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
    "edit": "5336819202575573316",          # ✏️ карандаш
    "cyclelen": "5337121636992690373",      # 🔁 цикл
    "addcycles": "5337010070922209271",     # 📌 пин
    "profile_edit": "5359307659927364818",  # 🌸 цветок
}
def B(text, cb, style=None):
    if style is None and cb == "menu":
        style = KBS.PRIMARY
    if style:
        pref = {KBS.PRIMARY: "🔵", KBS.SUCCESS: "🟢", KBS.DANGER: "🔴"}.get(style)
        if pref and not text.startswith(pref):
            text = pref + " " + text.lstrip("← ").strip()
    return InlineKeyboardButton(text, callback_data=cb)

MENU_KB = InlineKeyboardMarkup([
    [B("🍽 Питание", "food"), B("🏋️ Нагрузка", "sec:training")],
    [B("📅 Календарь", "calendar"), B("💛 Симптомы", "checkin")],
    [B("👫 Партнёр", "partner"), B("⚙️ Изменить данные", "edit")],
    [B("⋯ Ещё", "more")],
])
GATE_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Начать", callback_data="go_start")]])
ONB_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("🩸 Отслеживать цикл", callback_data="onb_cycle")],
    [InlineKeyboardButton("🌿 Другой режим", callback_data="no_cycle")],
])
NOCYCLE_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("〰️ Нерегулярный цикл", callback_data="mode:irregular")],
    [InlineKeyboardButton("🌙 Сейчас нет месячных", callback_data="mode:none")],
    [InlineKeyboardButton("🌤 Менопауза", callback_data="mode:meno")],
    [InlineKeyboardButton("🤰 Беременность", callback_data="mode:preg")],
])
GENERAL_MENU_KB = InlineKeyboardMarkup([
    [B("🍽 Питание", "food"), B("🏋️ Нагрузка", "sec:training")],
    [B("💛 Симптомы", "checkin"), B("👫 Партнёр", "partner")],
    [B("⚙️ Изменить данные", "edit")],
    [B("⋯ Ещё", "more")],
])
MORE_KB = InlineKeyboardMarkup([
    [B("📄 История и выписка", "history"), B("📘 Гид", "guides")],
    [B("⏰ Время сводки", "set:time")],
    [B("← Назад", "menu")],
])
EDIT_KB = InlineKeyboardMarkup([
    [B("🩸 Отметить месячные", "period")],
    [B("🔁 Длина цикла", "cyclelen"), B("🌸 Рост, вес, возраст", "profile_edit")],
    [B("📌 История циклов", "addcycles")],
    [B("⏰ Время рассылки", "set:time")],
    [B("← Назад", "menu")],
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
        [B("🍽 Питание", "food"), B("🏋️ Нагрузка", "sec:training")],
        [B("💛 Симптомы", "checkin"), B("Меню", "menu")],
    ])

# ---------- senders ----------
async def need_onboard(t):
    cid = getattr(getattr(t, "chat", None), "id", None)
    if cid and is_partner(cid) and not is_onboarded(row(cid)):
        return await t.reply_text(PARTNER_INFO)
    if cid and not row(cid): ev(cid, "signup")
    if cid: upsert(cid, state=None)
    await t.reply_text("Давай настроим Айву. Выбери, что сейчас ближе: отслеживать цикл или другой режим.", reply_markup=ONB_KB)
_last_start = {}
async def begin_onboard(cid, msg):
    now = time.time()
    if now - _last_start.get(cid, 0) < 4: return   # не показываем приветствие дважды подряд
    _last_start[cid] = now
    if not row(cid): ev(cid, "signup")
    upsert(cid, state=None, pending_date=None)
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
    if not st: return None
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
        return mdata, target
    except Exception as e:
        log.warning("menu: %s", e); await context.bot.send_message(cid, "🍽 " + note)
        return None

async def send_section(context, cid, st, key):
    """Нагрузка и питание: живой ответ с мед-обоснованием. Для нагрузки картинка цикла идёт над текстом, для питания сверху карточка-меню."""
    await context.bot.send_chat_action(cid, "typing"); ev(cid, "button")
    usage = []
    if key == "training":
        await send_training_card(context, cid, st)
        text = await think_llm(context, cid, L.explain_section, st, "training", usage=usage)
        return await send_answer(context, cid, text, st, "нагрузка сегодня", usage=usage)
    if key == "food":
        res = await send_menu(context, cid)
        if res:
            mdata, target = res
            text = L.menu_text(st, mdata, target)
        else:
            text = L.section_text(st, "food")
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

def fit_tg(text, limit=4000):
    if not text or len(text) <= limit: return text
    cut = text[:limit]
    p = max(cut.rfind(". "), cut.rfind(".\n"), cut.rfind("!\n"), cut.rfind("\n\n"), cut.rfind("! "), cut.rfind("? "))
    if p > limit * 0.6: cut = cut[:p + 1]
    return cut.rstrip()
def chat_hint(cid):
    base = last_hint(cid) or ""
    u = row(cid)
    if u and u.get("mode") == "preg" and u.get("last_period"):
        try:
            stp = C.preg_status(u["last_period"])
            base = (base + " " if base else "") + f"Беременность, срок примерно {stp['week']} недель, {stp['trimester']} триместр, до родов ~{max(0, stp['days_left'])} дн."
        except Exception: pass
    return base or None
async def send_answer(context, cid, text, st, basis_q, usage=None, quote=None):
    if usage is None: usage = []
    sf = getattr(L, "split_followups", None)
    clean, sugg = sf(text) if sf else (text, [])
    clean = fit_tg(clean)
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
    body = await asyncio.to_thread(L.general_summary, profile_of(u), u.get("mode"), hint=chat_hint(cid), usage=usage)
    if not body:
        body = "💛 Сводка на сегодня. Отметь самочувствие через Симптомы, и я подскажу, на что обратить внимание."
    await context.bot.send_message(cid, f"{body}\n\nДобавь сегодняшние симптомы через Симптомы, чтобы сводка была точнее.\n\nAIWA · {DISCLAIMER}", reply_markup=summary_kb())
    ev(cid, "tokens", sum(usage)); ev(cid, "goal", meta="summary")

async def send_general(context, cid, key):
    u = row(cid); await context.bot.send_chat_action(cid, "typing"); ev(cid, "button")
    qmap = {"food": "Что мне есть сегодня под мой возраст и самочувствие? Дай конкретные продукты или меню на день.",
            "training": "Какая физическая активность мне сейчас подходит и почему? Дай конкретные варианты."}
    usage = []; q = qmap.get(key, key)
    ans = await think_llm(context, cid, L.general_answer, profile_of(u), u.get("mode"), q, hint=chat_hint(cid), usage=usage)
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

async def dispatch_intent(context, update, cid, u, intent, txt=""):
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
    if intent == "phases":
        return await msg.reply_text(PHASES_TEXT)
    if intent == "addcycles":
        return await addcycles_entry(context, cid, msg)
    if intent == "profile":
        upsert(cid, state="await_profile_edit")
        return await msg.reply_text("Обновим данные. Напиши через пробел рост (см), вес (кг), возраст. Например 168 60 30.")
    if intent == "period_end":
        u2 = row(cid)
        if not (is_cycle(u2) and u2.get("last_period")):
            return await msg.reply_text("Сначала отметь начало последних месячных, тогда посчитаю их длину. Кнопка «Отметить месячные» в Меню.")
        mdt = _DATE_RE.search(txt or "")
        end = (parse_date(mdt.group(0)) if mdt else None) or date.today()
        ln = (end - date.fromisoformat(u2["last_period"])).days + 1
        if 1 <= ln <= 10:
            cyc_set_end(cid, u2["last_period"], end.isoformat())
            upsert(cid, period_end=end.isoformat(), period_len=ln)
            return await msg.reply_text(f"Записала: месячные длились {ln} дн. Учту это в прогнозе и выписке для врача.")
        return await msg.reply_text("Поняла, месячные закончились. Чтобы посчитать длину, отметь ещё и дату их начала кнопкой «Отметить месячные».")
    if intent == "cyclelen":
        mnum = re.search(r"\b(1[5-9]|[2-5]\d|60)\b", txt or "")
        if mnum:
            upsert(cid, cycle_len=int(mnum.group(1)), state=None)
            await msg.reply_text(f"Записала длину цикла: {mnum.group(1)} дн.")
            return await push_summary(context, cid)
        upsert(cid, state="await_cycle_len")
        return await msg.reply_text("Какая у тебя средняя длина цикла в днях? Обычно 21-35. Напиши число, например 28.")
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
    body = await asyncio.to_thread(L.generate_summary, st, u["modules"], hint=chat_hint(cid), usage=usage)
    kb = summary_kb()
    await context.bot.send_message(cid, f"{body}\n\nДобавь сегодняшние симптомы через Симптомы, чтобы сводка была точнее.\n\nAIWA · {DISCLAIMER}", reply_markup=kb)
    ev(cid, "tokens", sum(usage)); ev(cid, "goal", meta="summary")

def schedule_daily(app, cid, hhmm):
    for j in app.job_queue.get_jobs_by_name(str(cid)): j.schedule_removal()
    h, m = map(int, hhmm.split(":"))
    m += abs(cid) % 15  # разброс 0..14 мин: у многих юзеров сводки не падают в одну минуту
    h = (h + m // 60) % 24; m %= 60
    app.job_queue.run_daily(daily_job, time=dtime(h, m, tzinfo=TZ), chat_id=cid, name=str(cid))

def db_mark_period(cid, iso):
    """Записывает старт месячных в БД и включает трекинг цикла. Без планировщика, безопасно из веб-обработчика."""
    u = row(cid) or {}; cl = u.get("cycle_len") or 28
    cyc_add(cid, iso)
    latest = max(cycles_of(cid) or [iso])
    upsert(cid, last_period=latest, cycle_len=cl, mode="cycle", state=None)
def mark_period(context, cid, iso):
    db_mark_period(cid, iso)
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
    await msg.reply_text("Готово. Утреннюю сводку буду присылать каждый день в 08:00 (МСК), время меняется в Меню. Историю прошлых циклов можно добавить позже командой /addcycles.",
        reply_markup=InlineKeyboardMarkup([[B("Меню", "menu", KBS.PRIMARY)]]))
    await push_summary(context, cid)

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

async def addcycles_entry(context, cid, msg):
    upsert(cid, state="await_cycles")
    await msg.reply_text(ADDCYCLES_TEXT)
async def addcycles_cmd(update, context):
    cid = update.effective_chat.id; ev(cid, "command")
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    await addcycles_entry(context, cid, update.message)
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
    await update.message.reply_text("О чём рассказать сегодня?", reply_markup=menu_kb_for(u, not is_cycle(u)))
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
    upsert(cid, state="await_profile_edit")
    await update.message.reply_text("Обновим данные. Напиши через пробел рост (см), вес (кг), возраст. Например 168 60 30.")
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
    await update.message.reply_text(
        "Команды AIWA:\n"
        "/menu: открыть меню\n"
        "/today: сводка за день\n"
        "/checkin: отметить самочувствие\n"
        "/period: отметить месячные\n"
        "/calendar: календарь цикла\n"
        "/report: выписка для врача\n"
        "/partner: подключить партнёра\n"
        "/unlink: отключить партнёра\n"
        "/profile: изменить рост, вес и возраст\n"
        "/time: время утренней сводки\n"
        "/addcycles: добавить историю циклов\n"
        "/app: открыть мини-эпп\n"
        "/stop: стереть все данные и отключить бота\n\n"
        "Ещё можно написать словами: «изменить вес», «поменять время рассылки», «подключить партнёра», «отключить партнёра», «добавить историю циклов»."
    )

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
    onboarded = sum(1 for _, _, lp, cl, md in users if (lp and cl) or md in ("irregular", "none", "meno", "preg"))
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

    VALUE_STATES = {
        "await_date": "Когда начались последние месячные? Напиши дату, например 25.05.2026.",
        "await_len": "Напиши среднюю длину цикла числом. Это дни от первого дня одних месячных до первого дня следующих. Обычно 21-35, если не знаешь, можно 28.",
        "await_cycle_len": "Какая средняя длина цикла в днях? Напиши число 15-60.",
        "await_preg_date": "Напиши дату первого дня последних месячных (например 25.05.2026), или ПДР со словом ПДР.",
        "await_period_date": "Когда начались последние месячные? Напиши дату или нажми кнопку.",
        "await_time": "Во сколько присылать сводку? Например 08:00.",
        "await_profile": "Напиши рост (см), вес (кг), возраст. Например 168 60 30, или «Пропустить».",
        "await_profile_edit": "Напиши рост (см), вес (кг), возраст. Например 168 60 30.",
        "await_cycles": "Пришли даты начала месячных, по одной на строке.",
    }
    if state in VALUE_STATES and is_question_like(txt):
        await context.bot.send_chat_action(cid, "typing")
        _, _qst = status_of(cid)
        a = await think_llm(context, cid, L.answer_question, _qst, txt, profile_of(u), None)
        await update.message.reply_text(fit_tg(L.split_followups(a)[0]))
        return await update.message.reply_text("А теперь вернёмся к настройке. " + VALUE_STATES[state])

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
        if not d:
            if is_question_like(txt):
                a = await think_llm(context, cid, L.answer_question, None, txt, profile_of(u), None)
                return await update.message.reply_text(fit_tg(L.split_followups(a)[0]) + "\n\nА теперь вернёмся: когда начались последние месячные? Напиши дату, например 25.05.2026.")
            return await update.message.reply_text("Не разобрала дату. Напиши в формате ДД.ММ.ГГГГ, например 25.05.2026, или нажми кнопку выше.")
        upsert(cid, pending_date=d.isoformat(), state="await_len")
        return await update.message.reply_text(
            "Поняла. Теперь длина цикла.\n\n"
            "Это количество дней от первого дня одних месячных до первого дня следующих. Например, если месячные начались 1 мая, а следующие 29 мая, длина цикла 28 дней.\n\n"
            "Напиши число. Норма обычно 21-35 дней. Если не знаешь точно, напиши примерное значение, потом его можно поправить.")
    if state == "await_len":
        try:
            n = int(txt); assert 20 <= n <= 60
        except (ValueError, AssertionError):
            if is_question_like(txt):
                a = await think_llm(context, cid, L.answer_question, None, txt, profile_of(u), None)
                return await update.message.reply_text(fit_tg(L.split_followups(a)[0]) + "\n\nА теперь вернёмся: какая средняя длина цикла в днях? (обычно 21-35, по умолчанию 28)")
            return await update.message.reply_text("Нужно число от 20 до 60. Если не знаешь точно, напиши примерное значение. Если цикл нерегулярный, начни заново через /start и выбери «Другой режим».")
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

    if state == "await_profile_edit":
        nums = [p for p in re.split(r"[ ,;/]+", txt) if p]
        try:
            cm = float(nums[0]); kg = float(nums[1]); age = int(float(nums[2]))
            assert 120 < cm < 220 and 30 < kg < 250 and 10 < age < 80
        except Exception:
            return await update.message.reply_text("Нужно три числа: рост в см, вес в кг, возраст. Например 168 60 30.")
        upsert(cid, height=int(cm), weight=kg, age=age, state=None)
        return await update.message.reply_text(f"Обновила: рост {int(cm)} см, вес {kg:g} кг, возраст {age}. Пересчитаю калории и питание под тебя.")
    if state == "await_profile":
        nums = [p for p in re.split(r"[ ,;/]+", txt) if p]
        try:
            cm = float(nums[0]); kg = float(nums[1]); age = int(float(nums[2]))
            assert 120 < cm < 220 and 30 < kg < 250 and 10 < age < 80
        except Exception:
            if is_question_like(txt):
                a = await think_llm(context, cid, L.answer_question, None, txt, profile_of(u), None)
                return await update.message.reply_text(fit_tg(L.split_followups(a)[0]) + "\n\nА теперь вернёмся: напиши рост (см), вес (кг), возраст. Например 168 60 30, или нажми «Пропустить».", reply_markup=SKIP_KB)
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
    elif state == "await_preg_date":
        mdt = _DATE_RE.search(txt); d = parse_date(mdt.group(0)) if mdt else None
        if not d:
            return await update.message.reply_text("Не разобрала дату. Напиши ДД.ММ.ГГГГ, например 25.05.2026.")
        low = txt.lower()
        lmp = (d - timedelta(days=280)) if ("пдр" in low or "род" in low) else d
        upsert(cid, last_period=lmp.isoformat(), state="await_profile")
        stp = C.preg_status(lmp.isoformat())
        return await update.message.reply_text(
            f"Записала. Срок: {stp['week']} нед {stp['day']} дн, ПДР примерно {date.fromisoformat(stp['due']).strftime('%d.%m.%Y')}.\n\n"
            "Осталось пару данных для рекомендаций: рост (см), вес (кг), возраст. Например 168 60 30.", reply_markup=SKIP_KB)
    elif state == "await_cycle_len":
        mnum = re.search(r"\d{1,2}", txt)
        if mnum and 15 <= int(mnum.group()) <= 60:
            upsert(cid, cycle_len=int(mnum.group()), state=None)
            await update.message.reply_text(f"Записала длину цикла: {mnum.group()} дн.")
            return await push_summary(context, cid)
        upsert(cid, state=None)
        return await update.message.reply_text("Нужно число от 15 до 60. Открой «Длина цикла» в Меню и попробуй ещё раз.")
    elif state == "await_cycles":
        ranges = parse_cycle_ranges(txt)
        if not ranges:
            upsert(cid, state=None)
            return await update.message.reply_text("Не нашла дат. Попробуй ещё раз: открой «Добавить историю циклов» в Меню и пришли даты начала месячных, по одной на строке, например 12.04.2026.")
        c = db(); c.execute("DELETE FROM cycles WHERE chat_id=?", (cid,)); c.commit(); c.close()
        for p in ranges: cyc_add(cid, p["start"], p.get("end"))
        starts = [p["start"] for p in ranges]; u2 = row(cid); latest = max(starts)
        last_range = next((p for p in ranges if p["start"] == latest), None)
        if last_range and last_range.get("end"):
            ln = (date.fromisoformat(last_range["end"]) - date.fromisoformat(latest)).days + 1
            upsert(cid, period_end=last_range["end"], period_len=ln)
        upsert(cid, last_period=latest, cycle_len=(u2.get("cycle_len") or 28), mode="cycle", state=None)
        schedule_daily(context.application, cid, row(cid)["send_time"] or "08:00")
        word = "цикл" if len(starts)==1 else ("цикла" if len(starts)<5 else "циклов")
        await update.message.reply_text(f"Готово, история заменена на {len(starts)} {word}. Последние месячные: {date.fromisoformat(latest).strftime('%d.%m.%Y')}. Календарь обновлён, ошибочные даты убраны.")
        return await push_summary(context, cid)

    if is_onboarded(u):
        pre_intent = match_intent(txt)
        if pre_intent in ("wipe", "unlink", "help"):
            return await dispatch_intent(context, update, cid, u, pre_intent, txt)

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
            return await dispatch_intent(context, update, cid, u, _intent, txt)

    if is_onboarded(u) and not is_cycle(u):
        await context.bot.send_chat_action(cid, "typing")
        t0 = time.monotonic(); usage = []
        ans = await think_llm(context, cid, L.general_answer, profile_of(u), u.get("mode"), txt, hint=chat_hint(cid), history=hist_get(cid), usage=usage)
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
    if is_question_like(txt):
        await context.bot.send_chat_action(cid, "typing")
        a = await think_llm(context, cid, L.answer_question, None, txt, profile_of(u), None)
        await update.message.reply_text(fit_tg(L.split_followups(a)[0]))
    await need_onboard(update.message)

# ---------- callbacks ----------
async def on_cb(update, context):
    q = update.callback_query; await q.answer(); cid = q.message.chat.id; data = q.data
    if data == "go_start": return await begin_onboard(cid, q.message)
    if data == "keep":
        u_keep = row(cid)
        return await q.message.reply_text("О чём рассказать сегодня?", reply_markup=menu_kb_for(u_keep, not is_cycle(u_keep)))
    if data == "onb_cycle":
        upsert(cid, state="await_date", pending_date=None)
        return await q.message.reply_text("Когда начались последние месячные? Нужен первый день кровотечения. Напиши дату, например 25.05.2026 или 26 мая 2026.")
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
        return await q.message.reply_text("Ок, тогда выбери режим. Его можно поменять позже, если ситуация изменится.", reply_markup=NOCYCLE_KB)
    if data.startswith("mode:"):
        m = data.split(":")[1]; upsert(cid, mode=m)
        schedule_daily(context.application, cid, row(cid)["send_time"] or "08:00")
        if m == "preg":
            upsert(cid, state="await_preg_date")
            return await q.message.reply_text("Поздравляю! \U0001F930 Чтобы считать срок и неделю, напиши дату первого дня последних месячных (например 25.05.2026). Если знаешь ПДР (дату родов), напиши её и добавь слово ПДР.")
        upsert(cid, state="await_profile")
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
        await q.message.reply_text("О чём рассказать сегодня?", reply_markup=menu_kb_for(u, general))
    elif data == "more":
        await q.message.reply_text("Ещё возможности:", reply_markup=MORE_KB)
    elif data == "edit":
        await q.message.reply_text("Что изменить?", reply_markup=EDIT_KB)
    elif data == "profile_edit":
        upsert(cid, state="await_profile_edit")
        await q.message.reply_text("Обновим данные. Напиши через пробел рост (см), вес (кг), возраст. Например 168 60 30.")
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
    elif data == "addcycles":
        await addcycles_entry(context, cid, q.message)
    elif data == "cyclelen":
        upsert(cid, state="await_cycle_len")
        await q.message.reply_text("Какая у тебя средняя длина цикла в днях? Обычно 21-35. Напиши число, например 28.")
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
            usage = []; ans = await think_llm(context, cid, L.general_answer, profile_of(u), u.get("mode"), question, hint=chat_hint(cid), history=hist_get(cid), usage=usage)
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
            BotCommand("start", "Старт"),
            BotCommand("menu", "Меню"),
            BotCommand("today", "Сводка за день"),
            BotCommand("checkin", "Отметить самочувствие"),
            BotCommand("period", "Отметить месячные"),
            BotCommand("calendar", "Календарь цикла"),
            BotCommand("report", "Выписка для врача"),
            BotCommand("partner", "Подключить партнёра"),
            BotCommand("unlink", "Отключить партнёра"),
            BotCommand("profile", "Изменить рост, вес и возраст"),
            BotCommand("time", "Время сводки"),
            BotCommand("addcycles", "История циклов"),
            BotCommand("app", "Открыть приложение"),
            BotCommand("help", "Команды"),
            BotCommand("stop", "Удалить данные")])
    except Exception as e:
        log.warning("set commands: %s", e)
    try:
        me = await app.bot.get_me()
        BOT_USERNAME = getattr(me, "username", None)
    except Exception:
        BOT_USERNAME = None
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
        if os.path.exists(p):
            with open(p, "r", encoding="utf-8") as fh: html_text = fh.read()
            return web.Response(text=html_text, content_type="text/html",
                                headers={"Cache-Control": "no-store, no-cache, must-revalidate, max-age=0", "Pragma": "no-cache"})
    return web.Response(text="webapp not found", status=404)
async def _api_data(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not u or not is_onboarded(u): return _cors(web.json_response({"onboarded": False}))
    out = {"onboarded": True, "cycle": bool(is_cycle(u) and u.get("last_period")),
           "last_period": u.get("last_period"), "cycle_len": u.get("cycle_len") or 28,
           "mode": u.get("mode") or "cycle", "name": (body.get("name") or ""), "pa": pa_list(cid), "chatlog": chatlog_get(cid, 60),
           "today_log": log_get(cid, date.today().isoformat()) or {"symptoms": []},
           "send_time": u.get("send_time") or "08:00",
           "profile": {"height": u.get("height"), "weight": u.get("weight"), "age": u.get("age"),
                       "activity": u.get("activity"), "diet": u.get("diet") or "", "diet_note": u.get("diet_note") or ""}}
    if out["cycle"]:
        stt = C.cycle_status(date.fromisoformat(u["last_period"]), u.get("cycle_len") or 28)
        out.update({"day": stt["day"], "phase": stt["phase"], "days_to_next": stt["days_to_next"],
                    "days_since": stt["days_since"], "status": stt["status"], "delay_days": stt["delay_days"]})
        periods = periods_of(cid)
        if u.get("period_end"):
            for p in periods:
                if p["start"] == u.get("last_period") and not p.get("end"):
                    p["end"] = u["period_end"]
        cyc = [p["start"] for p in periods]
        out["cycles"] = cyc
        out["periods"] = periods
        lens = []
        for i in range(1, len(cyc)):
            dd = (date.fromisoformat(cyc[i]) - date.fromisoformat(cyc[i - 1])).days
            if 10 <= dd <= 90: lens.append(dd)
        plens = []
        for p in periods:
            if p.get("end"):
                ln = (date.fromisoformat(p["end"]) - date.fromisoformat(p["start"])).days + 1
                if 1 <= ln <= 10: plens.append(ln)
        reg = None
        if len(lens) >= 2:
            mlen = sum(lens) / len(lens); sd = (sum((x - mlen) ** 2 for x in lens) / len(lens)) ** 0.5
            reg = "регулярный" if sd <= 2.5 else ("умеренный разброс" if sd <= 5 else "нерегулярный")
        history = [{"start": periods[i]["start"], "end": periods[i].get("end"),
                    "period_len": ((date.fromisoformat(periods[i]["end"]) - date.fromisoformat(periods[i]["start"])).days + 1) if periods[i].get("end") else None,
                    "len": ((date.fromisoformat(cyc[i + 1]) - date.fromisoformat(cyc[i])).days if i + 1 < len(cyc) else None)} for i in range(len(cyc))]
        out["stats"] = {
            "cycles_count": len(cyc),
            "last_cycle_len": lens[-1] if lens else None,
            "avg_cycle": round(sum(lens) / len(lens)) if lens else None,
            "min_cycle": min(lens) if lens else None,
            "max_cycle": max(lens) if lens else None,
            "spread": (max(lens) - min(lens)) if lens else None,
            "period_len": (plens[-1] if plens else u.get("period_len")),
            "avg_period": round(sum(plens) / len(plens)) if plens else None,
            "regularity": reg,
            "history": history,
        }
    elif out["mode"] == "preg" and u.get("last_period"):
        out["preg"] = C.preg_status(u["last_period"])
    return _cors(web.json_response(out))
async def _api_period(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    action = body.get("action"); ds = body.get("date")
    try: d = date.fromisoformat(ds) if ds else date.today()
    except Exception: d = date.today()
    if action == "start":
        db_mark_period(cid, d.isoformat()); ev(cid, "manual", meta="web_period_start")
        return _cors(web.json_response({"ok": True}))
    if action == "replace":
        periods = body.get("periods") or []
        clean = []
        for p in periods:
            try:
                s = date.fromisoformat(p.get("start"))
                e = date.fromisoformat(p.get("end") or p.get("start"))
                if e < s: e = s
                if 1 <= (e - s).days + 1 <= 10:
                    clean.append((s.isoformat(), e.isoformat()))
            except Exception:
                continue
        c = db(); c.execute("DELETE FROM cycles WHERE chat_id=?", (cid,)); c.commit(); c.close()
        for s, e in clean: cyc_add(cid, s, e)
        starts = [s for s, _ in clean]
        latest = max(starts) if starts else None
        if latest:
            latest_end = next((e for s, e in clean if s == latest), latest)
            ln = (date.fromisoformat(latest_end) - date.fromisoformat(latest)).days + 1
            upsert(cid, last_period=latest, mode="cycle", period_end=latest_end, period_len=ln)
        else:
            upsert(cid, last_period=None, period_end=None, period_len=None)
        ev(cid, "manual", meta="web_period_replace")
        return _cors(web.json_response({"ok": True}))
    if action == "delete":
        period_delete_at(cid, d.isoformat())
        cyc = cycles_of(cid)
        upsert(cid, last_period=(max(cyc) if cyc else None))
        ev(cid, "manual", meta="web_period_del")
        return _cors(web.json_response({"ok": True}))
    if action == "end":
        u = row(cid); ok = False
        start_iso = body.get("start") or period_start_at_or_before(cid, d.isoformat())
        if is_cycle(u) and start_iso:
            ln = (d - date.fromisoformat(start_iso)).days + 1
            if 1 <= ln <= 10:
                cyc_set_end(cid, start_iso, d.isoformat())
                if start_iso == u.get("last_period"):
                    upsert(cid, period_end=d.isoformat(), period_len=ln)
                ok = True
        ev(cid, "manual", meta="web_period_end")
        return _cors(web.json_response({"ok": ok}))
    return _cors(web.json_response({"error": "bad action"}, status=400))
async def _api_pa(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    ds = body.get("date")
    try: d = date.fromisoformat(ds)
    except Exception: return _cors(web.json_response({"error": "bad date"}, status=400))
    if d > date.today(): return _cors(web.json_response({"marked": False, "skip": True}))
    marked = pa_toggle(cid, d.isoformat()); ev(cid, "manual", meta="web_pa")
    return _cors(web.json_response({"marked": marked}))
async def _api_checkin(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    ds = body.get("date") or date.today().isoformat()
    try: date.fromisoformat(ds)
    except Exception: ds = date.today().isoformat()
    log_ensure(cid, ds)
    if body.get("energy"):
        try: log_set(cid, ds, energy=max(1, min(3, int(body["energy"]))))
        except Exception: pass
    if body.get("mood"):
        try: log_set(cid, ds, mood=max(1, min(3, int(body["mood"]))))
        except Exception: pass
    if body.get("symptom"):
        code = str(body.get("symptom"))
        if code in SYM:
            log_toggle(cid, ds, code)
    ev(cid, "manual", meta="web_checkin")
    return _cors(web.json_response({"ok": True, "log": log_get(cid, ds) or {"symptoms": []}}))
async def _api_section(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid); _, st = status_of(cid); kind = body.get("kind", "food"); ev(cid, "button", meta="web_" + kind)
    if not is_onboarded(u):
        return _cors(web.json_response({"error": "onboard", "text": "Сначала настрой Айву в боте."}, status=403))
    if st is None:
        q = {"food": "Что мне есть сегодня под мой возраст?", "training": "Какая активность мне подходит и почему?"}.get(kind, kind)
        ans = await asyncio.to_thread(L.general_answer, profile_of(u), u.get("mode"), q, chat_hint(cid), None)
        return _cors(web.json_response({"text": ans}))
    if kind == "food":
        prof = profile_of(u); target = profile_kcal(prof) if prof else None
        menu = await asyncio.to_thread(L.menu_today, st, profile=prof, target=target)
        if target: menu["macros"] = {"protein": f"{target[1]} г", "fat": f"{target[2]} г", "carbs": f"{target[3]} г"}
        text = st["content"]["food"]
        return _cors(web.json_response({"menu": menu, "kcal": (target[0] if target else None), "text": text}))
    text = await asyncio.to_thread(L.explain_section, st, "training")
    text = L.split_followups(text)[0]
    plan = await asyncio.to_thread(L.training_plan, st, profile_of(u))
    return _cors(web.json_response({"text": text, "training": plan}))
async def _api_chat(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u):
        return _cors(web.json_response({"answer": "Сначала настрой Айву в боте: /start.", "suggestions": []}, status=403))
    msg = (body.get("message") or "").strip()
    if not msg: return _cors(web.json_response({"answer": "Напиши вопрос.", "suggestions": []}))
    intent = match_intent(msg)
    if intent == "phases":
        chatlog_add(cid, "user", msg); chatlog_add(cid, "ai", PHASES_TEXT)
        return _cors(web.json_response({"answer": PHASES_TEXT, "suggestions": ["Что есть в мою фазу?", "Какая тренировка сейчас?"]}))
    if intent in ("period", "addcycles", "profile", "cyclelen", "time", "wipe", "unlink", "partner", "checkin"):
        guide = {
            "period": "Через чат я не меняю календарь, чтобы случайно не записать ошибку. Открой в мини-эппе экран «Сегодня», нажми «Редактировать месячные», отметь нужные дни прямо на календаре и нажми «Сохранить». В боте можно ещё написать /period.",
            "addcycles": "Историю циклов сейчас надёжнее добавлять через бота: /addcycles. Пришли даты начала месячных списком, и я заменю историю календаря.",
            "profile": "Рост, вес и возраст меняются в боте командой /profile или через Меню → Изменить данные.",
            "cyclelen": "Длину цикла меняй в боте: Меню → Изменить данные → Длина цикла.",
            "time": "Время утренней сводки меняется в боте командой /time.",
            "wipe": "Чтобы стереть все данные и отключить бота, введи в Telegram команду /stop.",
            "unlink": "Чтобы отключить партнёра, введи в Telegram команду /unlink.",
            "partner": "Партнёра можно подключить в боте: /partner или Меню → Партнёр.",
            "checkin": "Симптомы можно отметить в мини-эппе на экране «Сегодня» или в боте: /checkin, Меню → Симптомы.",
        }[intent]
        chatlog_add(cid, "user", msg); chatlog_add(cid, "ai", guide)
        return _cors(web.json_response({"answer": guide, "suggestions": ["Что по циклу?", "Открыть питание"]}))
    _, st = status_of(cid)
    if st is not None:
        ans = await asyncio.to_thread(L.answer_question, st, msg, profile_of(u), hist_get(cid))
    else:
        ans = await asyncio.to_thread(L.general_answer, profile_of(u), u.get("mode"), msg, chat_hint(cid), hist_get(cid))
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
    aio.router.add_get("/health", lambda r: web.Response(text="ok " + AIWA_VERSION))
    aio.router.add_post("/api/data", _api_data)
    aio.router.add_post("/api/section", _api_section)
    aio.router.add_post("/api/chat", _api_chat)
    aio.router.add_post("/api/period", _api_period)
    aio.router.add_post("/api/pa", _api_pa)
    aio.router.add_post("/api/checkin", _api_checkin)
    aio.router.add_route("OPTIONS", "/api/{tail:.*}", _api_opts)
    aio.router.add_get("/{tail:.*}", _serve_index)
    return aio

async def run_all():
    app = Application.builder().token(os.environ["BOT_TOKEN"]).build()
    for cmd, fn in (("start", start), ("today", today), ("summary", today), ("calendar", calendar_cmd), ("checkin", checkin_cmd),
                    ("period", period_cmd), ("menu", menu), ("time", set_time_cmd), ("menutoday", menutoday_cmd),
                    ("profile", profile_cmd), ("guide", guide_cmd), ("about", about_cmd), ("report", report_cmd), ("partner", partner_cmd), ("unlink", unlink_cmd), ("addcycles", addcycles_cmd), ("app", app_cmd), ("stop", stop), ("help", help_cmd), ("stats", stats_cmd)):
        app.add_handler(CommandHandler(cmd, fn))
    app.add_error_handler(on_error)
    app.add_handler(CallbackQueryHandler(on_cb))
    app.add_handler(MessageHandler(filters.VOICE, on_voice))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, on_text))
    runner = web.AppRunner(build_web()); await runner.setup()
    port = int(os.environ.get("PORT", "8080"))
    site = web.TCPSite(runner, "0.0.0.0", port); await site.start()
    await app.initialize(); await on_startup(app); await app.start(); await app.updater.start_polling(allowed_updates=Update.ALL_TYPES)
    log.info("AIWA bot + web on :%s", port)
    await asyncio.Event().wait()

def main():
    asyncio.run(run_all())

if __name__ == "__main__":
    main()
