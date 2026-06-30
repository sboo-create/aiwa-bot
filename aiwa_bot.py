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
BOT_APP = None  # ссылка на PTB Application для веб-обработчиков
BCAST_Q = None  # очередь утренней рассылки (троттлинг под лимиты LLM-провайдера)
BCAST_PENDING = set()
ALERT_LAST = {}
CHAT_HIST = {}  # cid -> deque последних реплик диалога (память контекста)
def hist_get(cid):
    mem = list(CHAT_HIST.get(cid, []))
    if mem:
        return mem
    try:
        out = []
        for m in chatlog_get(cid, 8):
            role = "assistant" if m.get("role") in ("ai", "assistant") else "user"
            out.append({"role": role, "content": (m.get("text") or "")[:1200]})
        if out:
            dq = CHAT_HIST.setdefault(cid, deque(maxlen=6))
            for x in out[-6:]: dq.append(x)
            return list(dq)
    except Exception:
        pass
    return []
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
AIWA_VERSION = "2026-06-25-meno-delay-summary-suggestions"
AIWA_WEBAPP_URL = os.environ.get("AIWA_WEBAPP_URL", "")
APP_BUTTON_TEXT = "📱 Приложение"
APP_MENU_BUTTON_TEXT = "Айва"
APP_CTA_HTML = "📱 <b>Приложение Айвы</b>: календарь, симптомы, питание с заменой блюд, нагрузка и статистика. Открой кнопкой ниже."
MENO_UPDATE_TEXT = (
    "🌸 Обновила экран для менопаузы в приложении Айвы.\n\n"
    "Теперь там есть отдельный режим без фаз цикла: самочувствие сегодня, симптомы менопаузы, научный факт дня, "
    "чекапы и красные флаги.\n\n"
    "Почему важно отмечать симптомы: приливы, сон, тревожность, сухость, сердцебиение, суставы и вес помогают увидеть паттерны. "
    "Так проще понять, что влияет на состояние, что обсудить с врачом и когда стоит проверить МГТ, негормональные варианты или профилактику.\n\n"
    "Открой приложение кнопкой ниже."
)
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
        rows.append([InlineKeyboardButton(APP_BUTTON_TEXT, web_app=WebAppInfo(url=webapp_url(u) or AIWA_WEBAPP_URL))])
    return InlineKeyboardMarkup(rows)
EN = {1: "низкая", 2: "средняя", 3: "высокая"}
MOOD = {1: "плохое", 2: "нормальное", 3: "хорошее"}
SYMPTOMS = [("cramps", "спазмы"), ("head", "головная боль"), ("bloat", "вздутие"),
            ("sweet", "тяга к сладкому"), ("anx", "тревожность"), ("tired", "усталость")]
MENO_SYMPTOMS = [("meno_hot", "приливы"), ("meno_night", "ночная потливость"), ("meno_sleep", "плохой сон"),
                 ("meno_mood", "тревожность"), ("meno_dry", "сухость"), ("meno_heart", "сердцебиение"),
                 ("meno_joint", "суставы"), ("meno_brain", "туман в голове"), ("meno_weight", "изменение веса")]
PREG_SYMPTOMS = [("preg_nausea", "тошнота"), ("preg_heartburn", "изжога"), ("preg_swelling", "отёки"),
                 ("preg_back", "боль в спине"), ("preg_move", "шевеления"), ("preg_tired", "усталость"),
                 ("preg_sleep", "плохой сон"), ("preg_cramp", "тянет живот")]
SYM = dict(SYMPTOMS + MENO_SYMPTOMS + PREG_SYMPTOMS)
def clean_custom_symptom(text):
    s = re.sub(r"\s+", " ", (text or "").strip().lower())
    s = re.sub(r"[^0-9a-zа-яё ,.+()/-]", "", s, flags=re.I).strip(" ,.-")
    return s[:40]
def symptom_code(text):
    s = clean_custom_symptom(text)
    return ("custom:" + s) if s else None
def symptom_label(code):
    if not code: return ""
    if code in SYM: return SYM[code]
    if code.startswith("custom:"): return code.split(":", 1)[1]
    return code
def symptoms_labels(items):
    return [symptom_label(x) for x in (items or []) if symptom_label(x)]

START_TEXT = ("🌸 Привет, я Айва, персональный ИИ-ассистент по циклу и женскому здоровью.\n\n"
 "Я помогаю понимать цикл и получать персональные рекомендации по питанию, нагрузке и симптомам.\n\n"
 "Можно писать мне текстом или голосом, получать сводку на день, меню, тренировки, выписку для врача и подсказки для партнёра.\n\n"
 "Айва учитывает твои отметки, пищевые ограничения и медицинские рекомендации. Чтобы начать, выбери один из вариантов ниже.")
ABOUT_TEXT = ("🌸 Я AIWA, ИИ-ассистент по женскому здоровью на базе GigaChat.\n\n"
 "Умею: утренние сводки по фазе цикла, персональное питание и тренировки, ответы на вопросы про здоровье, "
 "отслеживание симптомов, выписку для врача и партнёрский режим. Опираюсь на медицинские рекомендации и персонализируюсь под тебя.\n\n"
 "Быстрые действия есть в Меню, а календарь, симптомы, питание, нагрузка и статистика живут в приложении. Можно писать или наговаривать вопросы прямо в чат.")
PRIVACY_TEXT = ("🔒 Про данные: храню минимум, дату последних месячных, длину цикла, твои чек-ины и время рассылки, чтобы считать фазу. "
 "Это не передаётся третьим лицам. Удалить все данные и отключиться можно командой /stop в любой момент.")
PARTNER_HELLO = ("💛 Привет! Ты подключился как партнёр в AIWA.\n\n"
 "Каждое утро я буду присылать тебе короткий апдейт: что может происходить с её самочувствием, как поддержать, что предложить из еды или быта, и один факт про цикл, гормоны или женское здоровье.\n\n"
 "Ты не увидишь её календарь и личные разделы, только бережную сводку поддержки. Отключить доступ можно в любой момент: /unlink.")
PARTNER_INFO = ("💛 Ты в партнёрском режиме AIWA. Я присылаю ежедневный апдейт о самочувствии, поддержке, питании и фактах про цикл. "
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
def log_add_symptom(cid, d, code):
    if not code: return
    lg = log_get(cid, d) or {"symptoms": []}
    s = set(x for x in lg.get("symptoms", []) if x)
    s.add(code)
    log_set(cid, d, symptoms=",".join(sorted(s)))
def last_hint(cid):
    c = db(); r = c.execute("SELECT energy,symptoms FROM logs WHERE chat_id=? AND energy IS NOT NULL ORDER BY log_date DESC LIMIT 1", (cid,)).fetchone(); c.close()
    if not r: return None
    parts = []
    if r[0]: parts.append(f"энергия {EN.get(r[0],'')}")
    if r[1]: parts.append("симптомы: " + ", ".join(symptoms_labels(x for x in r[1].split(",") if x)))
    return "; ".join(parts) or None
def all_users():
    c = db(); rows = c.execute("""SELECT chat_id FROM users
        WHERE (last_period IS NOT NULL AND cycle_len IS NOT NULL)
           OR mode IN ('irregular','none','meno','preg')""").fetchall(); c.close(); return [x[0] for x in rows]
def meno_users():
    c = db(); rows = c.execute("SELECT chat_id FROM users WHERE mode='meno'").fetchall(); c.close(); return [x[0] for x in rows]
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

AIWA_ADDR_RE = re.compile(r"^\s*(?:эй\s+)?(?:айва+|айвочка|aiwa)\s*[,!?:;\-–—]*\s*", re.I)
def strip_aiwa_address(text):
    raw = (text or "").strip()
    m = AIWA_ADDR_RE.match(raw)
    if not m:
        return raw, False
    return raw[m.end():].strip(), True

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
    if re.search(r"(нагрузк|трениров|какой спорт|каким спортом|позанима|чем заня|упражнени|фитнес|какая активн)", t): return "training"
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
    return InlineKeyboardButton(text, callback_data=cb)

MENU_KB = InlineKeyboardMarkup([
    [B("Сводка", "today")],
    [B("Партнёр", "partner"), B("Выписка врачу", "history")],
])
GATE_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Начать", callback_data="go_start")]])
ONB_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Веду цикл", callback_data="onb_cycle")],
    [InlineKeyboardButton("Нет регулярного цикла", callback_data="no_cycle")],
])
NOCYCLE_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Нерегулярный цикл", callback_data="mode:irregular")],
    [InlineKeyboardButton("Беременность", callback_data="mode:preg")],
    [InlineKeyboardButton("Менопауза", callback_data="mode:meno")],
    [InlineKeyboardButton("Сейчас нет месячных", callback_data="mode:none")],
])
GENERAL_MENU_KB = InlineKeyboardMarkup([
    [B("Сводка", "today")],
    [B("Партнёр", "partner"), B("Выписка врачу", "history")],
])
MORE_KB = InlineKeyboardMarkup([
    [B("История и выписка", "history"), B("Гид", "guides")],
    [B("Время сводки", "set:time")],
    [B("Назад", "menu")],
])
EDIT_KB = InlineKeyboardMarkup([
    [B("Отметить месячные", "period")],
    [B("Длина цикла", "cyclelen"), B("Рост, вес, возраст", "profile_edit")],
    [B("История циклов", "addcycles")],
    [B("Время рассылки", "set:time")],
    [B("Назад", "menu")],
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

def schedule_jitter_min():
    try:
        return max(0, int(os.environ.get("AIWA_SCHEDULE_JITTER_MIN", "15")))
    except (TypeError, ValueError):
        return 15

def scheduled_hhmm(cid, hhmm):
    h, m = map(int, hhmm.split(":"))
    jitter = schedule_jitter_min()
    offset = abs(int(cid)) % jitter if jitter else 0
    m += offset
    h = (h + m // 60) % 24
    return f"{h:02d}:{m % 60:02d}", offset, jitter

def schedule_text(cid, hhmm):
    actual, offset, jitter = scheduled_hhmm(cid, hhmm)
    if not offset:
        return f"Время сводки: {hhmm} (МСК)."
    return (f"Время сводки: {hhmm} (МСК). Для тебя фактически около {actual}.\n\n"
            f"Разброс до {jitter - 1} минут нужен, чтобы сводки у всех пользователей не уходили в одну секунду.")

def today_start_iso():
    return datetime.combine(datetime.now(TZ).date(), dtime.min).isoformat()

def summary_sent_today(cid):
    c = db()
    r = c.execute("""SELECT 1 FROM events
        WHERE chat_id=? AND ts>=? AND (
            (action='goal' AND meta='summary') OR
            (action='broadcast' AND meta='sent')
        ) LIMIT 1""", (cid, today_start_iso())).fetchone()
    c.close()
    return bool(r)

def should_catchup_broadcast(cid, hhmm):
    actual, _, _ = scheduled_hhmm(cid, hhmm)
    h, m = map(int, actual.split(":"))
    now = datetime.now(TZ)
    due = datetime.combine(now.date(), dtime(h, m), tzinfo=TZ)
    try:
        hours = max(1, int(os.environ.get("AIWA_BROADCAST_CATCHUP_HOURS", "16")))
    except (TypeError, ValueError):
        hours = 16
    return due <= now <= due + timedelta(hours=hours) and not summary_sent_today(cid)

async def enqueue_broadcast(cid, meta="queued"):
    if summary_sent_today(cid):
        return False
    if cid in BCAST_PENDING:
        return False
    BCAST_PENDING.add(cid)
    ev(cid, "broadcast", meta=meta)
    if BCAST_Q is not None:
        await BCAST_Q.put(cid)
        return True
    BCAST_PENDING.discard(cid)
    return False

def en_kb(p, labels=None):
    L = labels or EN
    return InlineKeyboardMarkup([[InlineKeyboardButton(L[i].capitalize(), callback_data=f"ci:{p}:{i}") for i in (1, 2, 3)]])
def sym_kb(selected):
    rows = [[InlineKeyboardButton(("✓ " if code in selected else "") + ru, callback_data=f"ci:s:{code}")] for code, ru in SYMPTOMS]
    rows.append([InlineKeyboardButton("Свой симптом", callback_data="ci:custom")])
    rows.append([InlineKeyboardButton("Готово", callback_data="ci:done")]); return InlineKeyboardMarkup(rows)
def sugg_kb(cid, items, app_user=None, app_label=None):
    def _short(t): return t if len(t) <= 28 else t[:26].rstrip(" ,.-") + "…"
    rows = [[B(_short(t), f"q:{add_sugg(cid,t)}")] for t in items[:2]]
    if app_user and AIWA_WEBAPP_URL:
        rows.append([InlineKeyboardButton(app_label or APP_BUTTON_TEXT, web_app=WebAppInfo(url=webapp_url(app_user) or AIWA_WEBAPP_URL))])
    rows.append([B("Меню", "menu", KBS.PRIMARY)]); return InlineKeyboardMarkup(rows)
def summary_kb(u=None):
    rows = []
    if AIWA_WEBAPP_URL:
        rows.append([InlineKeyboardButton(APP_BUTTON_TEXT, web_app=WebAppInfo(url=webapp_url(u) or AIWA_WEBAPP_URL))])
    rows.append([B("Меню", "menu")])
    return InlineKeyboardMarkup(rows)
def summary_suggestions(st):
    if not st:
        return ["Что важно сегодня?", "Что отметить?"]
    if st.get("status") == "due":
        return ["Тест уже делать?", "Почему сдвигается?"]
    if st.get("status") == "delay":
        d = int(st.get("delay_days") or 0)
        if d >= 10:
            return ["Когда к врачу?", "Что проверить?"]
        return ["Тест на ХГЧ?", "Почему задержка?"]
    if st.get("status") == "stale":
        return ["Как обновить календарь?", "Что проверить?"]
    ph = st.get("phase")
    return {
        "menstrual": ["Как снизить боль?", "Что есть при месячных?"],
        "follicular": ["Какая тренировка?", "Что есть сегодня?"],
        "ovulation": ["Когда фертильное окно?", "Можно интенсивнее?"],
        "luteal": ["Как пережить ПМС?", "Что съесть вечером?"],
    }.get(ph, ["Что важно сегодня?", "Что отметить?"])
def general_summary_suggestions(u):
    mode = (u or {}).get("mode")
    if mode == "meno":
        return ["Почему приливы?", "Какие чекапы?"]
    if mode == "preg":
        return ["Что есть сейчас?", "Какая активность?"]
    if mode == "irregular":
        return ["Почему цикл скачет?", "Что отмечать?"]
    return ["Что важно сегодня?", "Что отметить?"]
def summary_sugg_kb(cid, u=None, st=None, app_label=None):
    items = summary_suggestions(st) if st is not None else general_summary_suggestions(u)
    return sugg_kb(cid, items, app_user=u, app_label=app_label or APP_BUTTON_TEXT)
def merge_summary_suggestions(u=None, st=None, extra=None):
    items = [x for x in (extra or []) if x]
    fallback = summary_suggestions(st) if st is not None else general_summary_suggestions(u)
    for x in fallback:
        if len(items) >= 2: break
        if x not in items: items.append(x)
    return items[:2]

# ---------- senders ----------
async def need_onboard(t):
    cid = getattr(getattr(t, "chat", None), "id", None)
    if cid and is_partner(cid) and not is_onboarded(row(cid)):
        return await t.reply_text(PARTNER_INFO)
    if cid and not row(cid): ev(cid, "signup")
    if cid: upsert(cid, state=None)
    await t.reply_text("Чтобы Айва давала персональные рекомендации, выбери, что сейчас ближе: ведёшь цикл или нет регулярного цикла.", reply_markup=ONB_KB)
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

async def send_menu(context, cid, with_image=False):
    u, st = status_of(cid)
    if not st: return None
    if with_image:
        await context.bot.send_chat_action(cid, "upload_photo")
    prof = profile_of(u); target = profile_kcal(prof) if prof else None
    usage = []; mdata = await asyncio.to_thread(L.menu_today, st, profile=prof, target=target, usage=usage); ev(cid, "tokens", sum(usage))
    if target:
        mdata["macros"] = {"protein": f"{target[1]} г", "fat": f"{target[2]} г", "carbs": f"{target[3]} г"}
    note = st["content"]["food"]
    if not with_image:
        return mdata, target
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
    """Нагрузка и питание: подробный текст с мед-обоснованием и переходом в приложение."""
    await context.bot.send_chat_action(cid, "typing"); ev(cid, "button")
    usage = []
    if key == "training":
        text = await think_llm(context, cid, L.explain_section, st, "training", usage=usage)
        text += "\n\n📱 В приложении Айвы можно посмотреть нагрузку рядом с календарём, симптомами и фазой цикла. Открой приложение кнопкой ниже."
        return await send_answer(context, cid, text, st, "нагрузка сегодня", usage=usage,
            app_user=row(cid), app_label="Открыть нагрузку")
    if key == "food":
        res = await send_menu(context, cid, with_image=False)
        if res:
            mdata, target = res
            text = L.menu_text(st, mdata, target)
        else:
            text = L.section_text(st, "food")
        text += "\n\n📱 В приложении Айвы меню удобнее: рядом с каждым блюдом есть кнопка «Заменить», можно быстро выбрать другой вариант без пересборки всего дня. Открой приложение кнопкой ниже."
        return await send_answer(context, cid, text, st, "питание сегодня", usage=usage,
            app_user=row(cid), app_label="Открыть питание")
    text = L.section_text(st, key)
    await send_answer(context, cid, text, st, text, usage=usage)

async def send_delay(context, cid, st):
    if IMG:
        try:
            bio = io.BytesIO(IMG.render_delay(st)); bio.name = "delay.png"; await context.bot.send_photo(cid, photo=bio)
        except Exception as e: log.warning("delay img: %s", e)
    msgs = {
        "due": (
            "🟡 Сводка на сегодня: месячные ожидаются примерно сейчас.\n\n"
            "🌙 Цикл\n"
            "• Прогноз подошёл к окну месячных.\n"
            "• Если они уже начались, отметь дни в календаре приложения.\n\n"
            "💛 Тело сегодня\n"
            "• Небольшой сдвиг на 1-3 дня бывает даже при регулярном цикле.\n"
            "• На цикл часто влияют стресс, сон, перелёты, болезнь и нагрузка.\n\n"
            "📌 Что сделать\n"
            "• Если была незащищённая близость, сделай тест на ХГЧ с первого дня задержки, точнее через 3-5 дней.\n"
            "• Если есть сильная боль, необычные выделения, температура или кровотечение, лучше обратиться к врачу."
        ),
        "delay": (
            f"🔴 Сводка на сегодня: задержка {st['delay_days']} дн.\n\n"
            "🌙 Цикл\n"
            "• Месячные пока не начались в прогнозное окно.\n"
            "• Когда они начнутся, отметь реальные дни в календаре, и Айва пересчитает прогноз.\n\n"
            "💛 Тело сегодня\n"
            "• Частые причины задержки: стресс, перелёты, недосып, болезнь, резкие изменения веса, интенсивные тренировки.\n"
            "• Если был незащищённый секс, сначала исключаем беременность.\n\n"
            "📌 Что сделать\n"
            "• Сделай тест на ХГЧ: он информативен с первого дня задержки, точнее через 3-5 дней.\n"
            "• Если задержка растёт, цикл часто сбивается или есть тревожные симптомы, обратись к гинекологу."
        ),
        "stale": (
            f"⚪ Сводка на сегодня: данные цикла устарели, прошло {st['days_since']} дн. с последних отмеченных месячных.\n\n"
            "🌙 Цикл\n"
            "• Айве не хватает актуальной даты, поэтому прогноз может быть неверным.\n"
            "• Открой приложение и поправь календарь: добавь реальные дни месячных или удали ошибочные.\n\n"
            "📌 Что проверить\n"
            "• Если месячных действительно нет так долго, это повод обсудить ситуацию с гинекологом.\n"
            "• Возможные причины: беременность, СПКЯ, щитовидная железа, резкая потеря веса, стресс, перименопауза."
        )}
    u = row(cid)
    body = msgs.get(st["status"], "")
    await context.bot.send_message(cid, html.escape(body) + "\n\n" + APP_CTA_HTML,
        reply_markup=summary_sugg_kb(cid, u, st, app_label="Открыть календарь"), parse_mode="HTML")

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
async def send_answer(context, cid, text, st, basis_q, usage=None, quote=None, app_user=None, app_label=None):
    if usage is None: usage = []
    sf = getattr(L, "split_followups", None)
    clean, sugg = sf(text) if sf else (text, [])
    clean = fit_tg(clean)
    if len(sugg) < 2:
        try:
            for e in L.followups(st, basis_q, clean):
                if e not in sugg and len(sugg) < 2: sugg.append(e)
        except Exception: pass
    kb = sugg_kb(cid, sugg, app_user=app_user, app_label=app_label)
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
    clean, extra = L.split_followups(body)
    kb = sugg_kb(cid, merge_summary_suggestions(u, None, extra), app_user=u, app_label=APP_BUTTON_TEXT)
    await context.bot.send_message(cid, html.escape(clean) + "\n\n" + APP_CTA_HTML,
        reply_markup=kb, parse_mode="HTML")
    ev(cid, "tokens", sum(usage)); ev(cid, "goal", meta="summary")

async def send_general(context, cid, key):
    u = row(cid); await context.bot.send_chat_action(cid, "typing"); ev(cid, "button")
    qmap = {"food": "Что мне есть сегодня под мой возраст и самочувствие? Дай конкретные продукты или меню на день.",
            "training": "Какая физическая активность мне сейчас подходит и почему? Дай конкретные варианты."}
    usage = []; q = qmap.get(key, key)
    ans = await think_llm(context, cid, L.general_answer, profile_of(u), u.get("mode"), q, hint=chat_hint(cid), usage=usage)
    _, st = status_of(cid)
    if key == "food":
        ans += "\n\n📱 В приложении Айвы можно открыть питание и заменить блюдо кнопкой «Заменить»."
        return await send_answer(context, cid, ans, st, q, usage=usage, app_user=u, app_label="Открыть питание")
    if key == "training":
        ans += "\n\n📱 В приложении Айвы можно смотреть нагрузку рядом с календарём, симптомами и статистикой."
        return await send_answer(context, cid, ans, st, q, usage=usage, app_user=u, app_label="Открыть нагрузку")
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
        return await msg.reply_text("Напиши дату начала последних месячных, например 25.05.2026, или нажми кнопку. Потом даты можно редактировать в приложении.", reply_markup=PERIOD_KB)

async def push_summary(context, cid, with_image=True):
    u0 = row(cid)
    if u0 and not is_cycle(u0): return await push_general(context, cid)
    u, st = status_of(cid)
    if not st: return
    if st["status"] != "normal": return await send_delay(context, cid, st)
    if with_image: await send_infographic(context.bot, cid)
    usage = []
    body = await asyncio.to_thread(L.generate_summary, st, u["modules"], hint=chat_hint(cid), usage=usage)
    if not body:
        body = "💛 Сводка на сегодня готова. Открой приложение, чтобы посмотреть календарь, симптомы, питание и нагрузку."
    clean, extra = L.split_followups(body)
    kb = sugg_kb(cid, merge_summary_suggestions(u, st, extra), app_user=u, app_label=APP_BUTTON_TEXT)
    await context.bot.send_message(cid, html.escape(clean) + "\n\n" + APP_CTA_HTML,
        reply_markup=kb, parse_mode="HTML")
    ev(cid, "tokens", sum(usage)); ev(cid, "goal", meta="summary")

async def push_checkin(context, cid):
    """После утренней сводки — быстрый чек-ин. Переиспользует существующий поток ci:* (энергия→настроение→симптомы)."""
    try:
        u = row(cid)
        if not is_onboarded(u): return
        log_ensure(cid, date.today().isoformat())
        await context.bot.send_message(cid,
            "Как ты сегодня? Отметь за 10 секунд — подстрою совет дня под твоё реальное состояние.\n\nКакая энергия?",
            reply_markup=en_kb("e"))
        ev(cid, "broadcast", meta="checkin_push")
    except Exception as e:
        log.warning("checkin push %s: %s", cid, e)

def schedule_daily(app, cid, hhmm):
    for j in app.job_queue.get_jobs_by_name(str(cid)): j.schedule_removal()
    actual, _, _ = scheduled_hhmm(cid, hhmm)
    h, m = map(int, actual.split(":"))
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
        return await enqueue_broadcast(cid)    # в очередь, обработает воркер с паузами
    try:
        await push_summary(context, cid); await push_partner(context, cid)
        await push_checkin(context, cid)
        ev(cid, "broadcast", meta="sent")
    except Exception as e:
        ev(cid, "broadcast", meta="error")
        raise

async def broadcast_worker(app):
    """Шлёт утренние сводки по одной с паузой, чтобы не превышать лимит токенов/мин LLM-провайдера."""
    delay = float(os.environ.get("AIWA_BROADCAST_DELAY", "6"))
    while True:
        cid = await BCAST_Q.get()
        try:
            ctx = _BCtx(app)
            await push_summary(ctx, cid)
            await push_partner(ctx, cid)
            await push_checkin(ctx, cid)
            ev(cid, "broadcast", meta="sent")
        except Exception as e:
            try: ev(cid, "broadcast", meta="error")
            except Exception: pass
            log.warning("broadcast %s: %s", cid, e)
        finally:
            BCAST_PENDING.discard(cid)
            BCAST_Q.task_done()
        await asyncio.sleep(delay)

def finish_onboarding(context, cid, last_period_iso, n):
    upsert(cid, last_period=last_period_iso, cycle_len=n, state=None, pending_date=None)
    cyc_add(cid, last_period_iso); schedule_daily(context.application, cid, row(cid)["send_time"] or "08:00")

async def welcome_finish(context, cid, msg):
    ev(cid, "activated", meta=(row(cid).get("mode") or "cycle"))
    await msg.reply_text("Готово. " + schedule_text(cid, "08:00") + "\n\nВремя меняется в Меню. Историю прошлых циклов можно добавить позже командой /addcycles.",
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
PARTNER_GUIDE = {
    "menstrual": {
        "body": "Эстроген и прогестерон сейчас низкие, а простагландины могут усиливать спазмы. Может быть меньше сил, ниже терпимость к шуму и больше потребность в тепле.",
        "support": ["Спроси, нужна ли тишина, еда или обезболивающее по инструкции.", "Возьми на себя мелкую бытовую задачу без обсуждения на час.", "Не обесценивай боль фразами вроде «потерпи»."],
        "food": "Тёплая еда, вода, чай, рыба, яйца, говядина, гречка или другой источник железа и белка.",
        "fact": "Во время месячных боль часто связана с простагландинами: это вещества, которые помогают матке сокращаться. У части женщин из-за них может болеть живот, поясница и даже появляться тошнота.",
        "watch": "Если боль очень сильная, кровотечение резко обильное или ей заметно хуже обычного, лучше предложить помощь с врачом."
    },
    "follicular": {
        "body": "После месячных эстроген постепенно растёт. Часто становится больше энергии, легче даются планы, спорт и новые задачи.",
        "support": ["Поддержи её инициативы, но не перегружай планами.", "Предложи прогулку, тренировку или спокойное свидание.", "Отметь, что видишь её энергию, это приятно и не давит."],
        "food": "Белковый завтрак, рыба, яйца, курица, творог или йогурт, крупа, овощи, вода.",
        "fact": "Рост эстрогена в первой половине цикла может улучшать чувствительность к инсулину и переносимость нагрузки. Поэтому активность часто ощущается легче, чем перед месячными.",
        "watch": "Если после месячных сохраняется сильная слабость или головокружение, это повод не геройствовать и проверить самочувствие."
    },
    "ovulation": {
        "body": "Эстроген близок к пику, рядом с овуляцией растёт лютеинизирующий гормон. У многих больше энергии, либидо и общительности.",
        "support": ["Предложи активный план, но оставь ей право отказаться.", "Будь внимателен к границам и контрацепции.", "Если есть боль сбоку живота, не драматизируй, но спроси, как она."],
        "food": "Белок, рыба, яйца, индейка, овощи, ягоды, вода. Это поддержит восстановление и стабильную энергию.",
        "fact": "Фертильное окно обычно включает примерно 5 дней до овуляции и день овуляции. Сперматозоиды могут жить в репродуктивных путях до нескольких дней, поэтому календарный метод ненадёжен.",
        "watch": "Резкая сильная боль, температура или необычные выделения - повод не ждать и обратиться к врачу."
    },
    "luteal": {
        "body": "После овуляции выше прогестерон. Он может повышать сонливость, чувствительность к стрессу, отёки и тягу к сладкому, особенно ближе к месячным.",
        "support": ["Снизь количество внезапных просьб и конфликтных разговоров.", "Предложи спокойный вечер, сон и помощь с бытом.", "Спроси, что ей сейчас облегчить: еду, тишину, объятия или пространство."],
        "food": "Белок плюс сложные углеводы: яйца, рыба, индейка, гречка, картофель, овощи. Для тяги к сладкому подойдёт тёмный шоколад в небольшом количестве.",
        "fact": "Во второй половине цикла базальная температура может быть выше примерно на 0,3-0,5 °C из-за прогестерона. Поэтому усталость, жар и хуже переносимый недосып могут быть не «капризом», а физиологией.",
        "watch": "Если ПМС мешает жить, есть сильная тревога, плаксивость или боль каждый цикл, это не надо терпеть молча."
    },
}
def partner_text(st, hint):
    extra = f"\nСегодня она отмечала: {hint}." if hint else ""
    g = PARTNER_GUIDE.get(st.get("phase")) or PARTNER_GUIDE["luteal"]
    support = "\n".join(f"• {x}" for x in g["support"])
    return (
        f"💛 Апдейт Айвы\n\n"
        f"💛 Что с ней сегодня\n"
        f"• День {st['day']} из {st['cycle_len']}, {st['subphase']} {st['phase_ru'].lower()} фаза.\n"
        f"• {g['body']}{extra}\n\n"
        f"🤝 Как поддержать\n{support}\n\n"
        f"🍽 Что предложить\n"
        f"• {g['food']}\n\n"
        f"🧠 Факт дня\n"
        f"«{g['fact']}»\n\n"
        f"📌 На что обратить внимание\n"
        f"• {g['watch']}\n\n"
        f"Это подсказка для поддержки, не диагноз."
    )

def partner_delay_text(st, hint):
    extra = f"\n• Сегодня она отмечала: {hint}." if hint else ""
    status = st.get("status")
    delay_days = int(st.get("delay_days") or 0)
    if status == "due":
        title = "месячные ожидаются примерно сейчас"
        body = ("Прогноз подошёл к окну месячных. Сдвиг на 1-3 дня бывает даже при регулярном цикле: "
                "на него влияют сон, стресс, перелёты, болезнь, питание и нагрузка.")
        watch = "Если была незащищённая близость, тест на ХГЧ можно делать с первого дня задержки, точнее через 3-5 дней."
    elif status == "stale":
        title = "данные цикла устарели"
        body = (f"С последних отмеченных месячных прошло {st.get('days_since')} дн., поэтому прогноз может быть неточным. "
                "Ей нужно спокойно обновить календарь, когда будет удобно.")
        watch = "Если месячных действительно нет так долго, лучше обсудить это с гинекологом: причины бывают от беременности до СПКЯ, щитовидной железы, стресса или перименопаузы."
    else:
        title = f"задержка {delay_days} дн."
        body = ("Месячные пока не начались в прогнозное окно. Частая причина задержки - поздняя овуляция: "
                "если овуляция сдвинулась, весь цикл становится длиннее. Также влияют стресс, недосып, болезнь, "
                "резкие изменения веса, интенсивные тренировки и перелёты.")
        watch = "Если была незащищённая близость, сначала исключают беременность: тест на ХГЧ информативен с первого дня задержки, точнее через 3-5 дней."
    return (
        f"💛 Апдейт Айвы: {title}\n\n"
        f"💛 Что с ней сегодня\n"
        f"• {body}{extra}\n"
        f"• В конце цикла прогестерон обычно снижается, поэтому могут быть ПМС, отёки, чувствительность груди, усталость, тревожность или тяга к сладкому.\n\n"
        f"🤝 Как поддержать\n"
        f"• Не дави вопросами и не пугай её. Лучше спроси: «Хочешь, я помогу с тестом, едой или просто побуду рядом?»\n"
        f"• Возьми на себя одну бытовую задачу: ужин, аптеку, воду, прогулку, такси или спокойный вечер.\n"
        f"• Если она тревожится, помоги действовать по шагам: тест, повтор через несколько дней, запись к врачу при необходимости.\n\n"
        f"🍽 Что предложить\n"
        f"• Белок и сложные углеводы: яйца, рыба, курица, гречка, картофель, овощи, йогурт или творог, если ей подходит.\n"
        f"• Вода, тёплый напиток, магний из еды: гречка, орехи, какао, тёмный шоколад в небольшом количестве.\n\n"
        f"🧠 Факт дня\n"
        f"«Лютеиновая фаза после овуляции обычно длится примерно 11-17 дней. Поэтому задержка часто означает не “сбой месячных”, а то, что овуляция была позже обычного.»\n\n"
        f"📌 На что обратить внимание\n"
        f"• {watch} Сильная боль, температура, необычные выделения или очень обильное кровотечение - повод обратиться за медицинской помощью.\n\n"
        f"Это подсказка для поддержки, не диагноз."
    )

PREG_FRUIT = {
    4: ("маковое зёрнышко", "~2 мм", "🌱"), 5: ("кунжутное семечко", "~3 мм", "🌱"), 6: ("горошина", "~6 мм", "🫛"),
    7: ("черника", "~1.3 см", "🫐"), 8: ("малина", "~1.6 см", "🍓"), 9: ("виноградина", "~2.3 см", "🍇"),
    10: ("клубника", "~3 см", "🍓"), 11: ("инжир", "~4 см", "🫒"), 12: ("лайм", "~5 см", "🍋"),
    13: ("стручок гороха", "~7 см", "🫛"), 14: ("лимон", "~8.5 см", "🍋"), 15: ("яблоко", "~10 см", "🍎"),
    16: ("авокадо", "~11.5 см", "🥑"), 17: ("репа", "~13 см", "🥔"), 18: ("болгарский перец", "~14 см", "🫑"),
    19: ("манго", "~15 см", "🥭"), 20: ("банан", "~16 см", "🍌"), 21: ("морковь", "~26 см", "🥕"),
    22: ("кабачок", "~28 см", "🥒"), 23: ("грейпфрут", "~29 см", "🍊"), 24: ("кукуруза", "~30 см", "🌽"),
    25: ("цветная капуста", "~34 см", "🥦"), 26: ("кочан салата", "~35 см", "🥬"), 27: ("брокколи", "~36 см", "🥦"),
    28: ("баклажан", "~37 см", "🍆"), 29: ("тыква", "~38 см", "🎃"), 30: ("капуста", "~39 см", "🥬"),
    31: ("кокос", "~41 см", "🥥"), 32: ("большой кабачок", "~42 см", "🥒"), 33: ("ананас", "~43 см", "🍍"),
    34: ("дыня", "~45 см", "🍈"), 35: ("медовая дыня", "~46 см", "🍈"), 36: ("салат романо", "~47 см", "🥬"),
    37: ("сельдерей", "~48 см", "🥬"), 38: ("лук-порей", "~49 см", "🧅"), 39: ("мини-арбуз", "~50 см", "🍉"), 40: ("небольшая тыква", "~51 см", "🎃"),
}

def preg_fruit(w):
    if w < 4:
        return ("крошечный зародыш", "ещё очень рано", "🌱")
    w = min(int(w or 4), 40)
    while w > 4 and w not in PREG_FRUIT:
        w -= 1
    return PREG_FRUIT.get(w, ("малыш", "растёт", "🌸"))

def partner_preg_text(preg, hint):
    week = int(preg.get("week") or 0)
    day = int(preg.get("day") or 0)
    tri = int(preg.get("trimester") or 1)
    due = date.fromisoformat(preg["due"]).strftime("%d.%m.%Y")
    left = int(preg.get("days_left") or 0)
    fruit, size, icon = preg_fruit(week)
    extra = f"\n• Сегодня она отмечала: {hint}." if hint else ""
    tri_body = {
        1: "В первом триместре активно закладываются органы и плацента. Часто бывают усталость, тошнота, сонливость, чувствительность к запахам и эмоциональные качели.",
        2: "Во втором триместре у многих становится больше энергии, растёт объём крови, увеличивается нагрузка на спину и таз. Малыш активно растёт, могут появляться первые или более заметные шевеления.",
        3: "В третьем триместре малыш набирает вес, матка сильнее давит на диафрагму, желудок и мочевой пузырь. Может быть одышка, изжога, отёки, хуже сон и быстрее усталость.",
    }.get(tri, "Беременность меняет нагрузку на сердце, сосуды, сон, пищеварение и эмоциональное состояние.")
    food = {
        1: "простая еда маленькими порциями: яйца, йогурт или творог, крупа, суп, рыба или курица, вода. При тошноте часто легче заходят сухари, банан, тёплый чай.",
        2: "белок, железо и кальций: мясо или рыба, яйца, гречка, овощи, молочные продукты, если подходят. Плюс вода и перекус, чтобы не проваливаться по энергии.",
        3: "лёгкая, но питательная еда: белок, овощи, крупа или картофель, кисломолочные продукты, если подходят. Большие тяжёлые ужины могут усиливать изжогу.",
    }.get(tri, "доступная еда с белком, сложными углеводами, овощами и водой.")
    watch = "Кровотечение, сильная боль, температура, выраженные отёки, сильная головная боль, мушки перед глазами или заметное снижение шевелений после того, как они уже стали регулярными, это повод связаться с врачом."
    return (
        f"💛 Апдейт Айвы: беременность\n\n"
        f"💛 Что с ней сегодня\n"
        f"• Срок примерно {week} нед {day} дн., {tri} триместр. ПДР: {due}, до родов около {max(0, left)} дн.\n"
        f"• {icon} Малыш сейчас ориентировочно как {fruit}, {size}. Это не точное измерение, а понятный ориентир по акушерскому сроку.\n"
        f"• {tri_body}{extra}\n\n"
        f"🤝 Как поддержать\n"
        f"• Спроси конкретно: «Что тебе сейчас облегчить: еду, воду, сон, прогулку, аптеку или тишину?»\n"
        f"• Возьми на себя быт без торговли: продукты, ужин, дорога, напоминание про воду, спокойный вечер.\n"
        f"• Не обесценивай усталость. Во время беременности растёт объём крови, меняется работа сосудов и гормонов, поэтому «устала» часто буквально физиология.\n\n"
        f"🍽 Что предложить\n"
        f"• {food}\n"
        f"• Без алкоголя, сырого мяса и рыбы, непастеризованных продуктов. С кофеином аккуратно, лучше сверяться с врачом по её ситуации.\n\n"
        f"🧠 Факт дня\n"
        f"«Акушерский срок считают от первого дня последних месячных, поэтому первые две недели срока формально идут ещё до зачатия. Так врачам проще считать ПДР и недели наблюдения.»\n\n"
        f"📌 На что обратить внимание\n"
        f"• {watch}\n\n"
        f"Это подсказка для поддержки, не диагноз."
    )

async def push_partner(context, woman_cid):
    pid = partner_of(woman_cid)
    if not pid: return
    u = row(woman_cid)
    hint = last_hint(woman_cid)
    if u and u.get("mode") == "preg" and u.get("last_period"):
        try:
            return await context.bot.send_message(pid, partner_preg_text(C.preg_status(u["last_period"]), hint))
        except Exception as e:
            return log.warning("partner preg push: %s", e)
    u, st = status_of(woman_cid)
    if not st: return
    if st.get("status") != "normal":
        try:
            return await context.bot.send_message(pid, partner_delay_text(st, hint))
        except Exception as e:
            return log.warning("partner delay push: %s", e)
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
    body = ("👫 Партнёрский режим. Перешли партнёру ссылку ниже. Он откроет бота и будет получать в Telegram короткую ежедневную сводку: "
            "день цикла, общее состояние и подсказки, как поддержать. Календарь и личные разделы он не увидит.\n\n")
    body += (link if link else f"Код подключения: {code}")
    body += ("\n\nПартнёр уже подключён." if linked else "\n\nПартнёр пока не подключён.")
    if linked:
        body += " Отключить доступ можно в любой момент командой /unlink"
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
async def id_cmd(update, context):
    await update.message.reply_text(f"Твой chat id: {update.effective_chat.id}")
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
    await update.message.reply_text("Напиши дату начала последних месячных, например 25.05.2026, или нажми кнопку. Потом даты можно редактировать в приложении.", reply_markup=PERIOD_KB)
async def set_time_cmd(update, context):
    ev(update.effective_chat.id, "command"); cid = update.effective_chat.id
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    hhmm = parse_time(context.args[0]) if context.args else None
    if not hhmm:
        upsert(cid, state="await_time")
        return await update.message.reply_text("Во сколько присылать сводку (МСК)? Выбери или впиши своё время, например 09:00.", reply_markup=time_kb())
    upsert(cid, send_time=hhmm, state=None); schedule_daily(context.application, cid, hhmm)
    await update.message.reply_text(schedule_text(cid, hhmm))
MODE_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Цикл", callback_data="onb_cycle")],
    [InlineKeyboardButton("Нерегулярный цикл", callback_data="mode:irregular")],
    [InlineKeyboardButton("Беременность", callback_data="mode:preg")],
    [InlineKeyboardButton("Менопауза", callback_data="mode:meno")],
    [InlineKeyboardButton("Сейчас нет месячных", callback_data="mode:none")],
])
async def mode_cmd(update, context):
    ev(update.effective_chat.id, "command"); cid = update.effective_chat.id
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    await update.message.reply_text("Что отслеживаем сейчас? Поменять можно в любой момент.", reply_markup=MODE_KB)
async def menutoday_cmd(update, context):
    cid = update.effective_chat.id; ev(cid, "command"); u, st = status_of(cid)
    if not is_onboarded(u): return await need_onboard(update.message)
    if st is None: return await send_general(context, cid, "food")
    await send_section(context, cid, st, "food")
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
    await update.message.reply_text("📱 Приложение Айвы:",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton(APP_BUTTON_TEXT, web_app=WebAppInfo(url=url))]]))
async def stop(update, context):
    cid = update.effective_chat.id
    for j in context.application.job_queue.get_jobs_by_name(str(cid)): j.schedule_removal()
    del_user(cid); await update.message.reply_text("Отключила сводки и удалила данные. Вернуться: /start")
async def help_cmd(update, context):
    await update.message.reply_text(
        "Команды AIWA:\n"
        "/menu: открыть меню\n"
        "/today: сводка за день\n"
        "/app: открыть приложение\n"
        "/report: выписка для врача\n"
        "/partner: подключить партнёра\n"
        "/unlink: отключить партнёра\n"
        "/stop: стереть все данные и отключить бота\n\n"
        "Календарь, симптомы, питание, нагрузка и статистика живут в приложении. Ещё можно писать словами: «как изменить вес», «поменять время рассылки», «как удалить данные», «отключить партнёра»."
    )

# ---------- stats ----------
def aggregate_stats():
    from collections import defaultdict, Counter
    import statistics as ST
    PRICE = float(os.environ.get("AIWA_TOKEN_PRICE_USD", "0.5"))  # $ за 1M токенов, blended, приблизительно
    c = db()
    users = c.execute("SELECT chat_id, created, last_period, cycle_len, mode FROM users").fetchall()
    rows = c.execute("SELECT chat_id, ts, action, tokens, meta, ms, n FROM events ORDER BY chat_id, ts").fetchall()
    partner_rows = c.execute("SELECT partner_id, woman_id, created FROM partners").fetchall()
    c.close()
    now = datetime.now(); today = now.date()
    ACT = {"manual", "button", "suggest", "command", "fallback", "answered"}
    ev_by_user = defaultdict(list); active_days = defaultdict(set); first_day = {}
    tokens_total = 0; answered = 0; fallback = 0; errors = 0
    goals = Counter(); intents = Counter(); lat = []; reqlens = []
    bcast_today = Counter()
    for cid, ts, action, tok, meta, ms, n in rows:
        t = datetime.fromisoformat(ts); d = t.date(); tokens_total += (tok or 0)
        if action == "broadcast" and d == today:
            bcast_today[meta or "unknown"] += 1
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
    partners_connected = len(partner_rows)
    partners_women = len(set(r[1] for r in partner_rows))
    partners_unique = len(set(r[0] for r in partner_rows))
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
        f"Партнёров подключено: {partners_connected}, у женщин с партнёром: {partners_women}, уникальных партнёров: {partners_unique}\n"
        f"DAU {dau} / WAU {wau} / MAU {mau}\n"
        f"Вернувшиеся: {returning}, stickiness DAU/MAU: {stick:.0f}%\n"
        f"Режимы: {modestr}\n\n"
        "АКТИВАЦИЯ\n"
        f"Регистраций: {signups}, активаций: {activated} ({act_rate:.0f}%)\n\n"
        "ВОВЛЕЧЕНИЕ\n"
        f"Сессий: {sessions}, на юзера {spu:.1f}, средняя длина {avg_slen:.1f} мин, событий/сессия {avg_sev:.1f}\n"
        f"Запросов: {requests}, на сессию {rps:.1f}, средняя длина ввода {avg_reqlen:.0f} симв.\n\n"
        "РАССЫЛКИ СЕГОДНЯ\n"
        f"Запланировано пользователей: {len(all_users())}, в очереди: {bcast_today['queued']}, отправлено: {bcast_today['sent']}, ошибок: {bcast_today['error']}\n\n"
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

async def broadcast_today_cmd(update, context):
    cid = update.effective_chat.id
    if not AIWA_ADMIN or str(cid) != str(AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    users = all_users()
    queued = skipped = 0
    for uid in users:
        if summary_sent_today(uid):
            skipped += 1
            continue
        if await enqueue_broadcast(uid):
            queued += 1
        else:
            skipped += 1
    qsize = BCAST_Q.qsize() if BCAST_Q is not None else 0
    await update.message.reply_text(
        f"Запустила рассылку на сегодня.\n\n"
        f"В очереди: {queued}\n"
        f"Уже была сводка или уже стоят в очереди: {skipped}\n"
        f"Размер очереди сейчас: {qsize}\n\n"
        f"Сводки уйдут по очереди, чтобы не положить модель и Telegram."
    )

async def meno_update_cmd(update, context):
    cid = update.effective_chat.id
    if not AIWA_ADMIN or str(cid) != str(AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    users = meno_users()
    sent = failed = 0
    for uid in users:
        u = row(uid)
        try:
            await context.bot.send_message(uid, html.escape(MENO_UPDATE_TEXT),
                reply_markup=summary_sugg_kb(uid, u), parse_mode="HTML")
            ev(uid, "broadcast", meta="meno_update_sent")
            sent += 1
            await asyncio.sleep(0.25)
        except Exception as e:
            failed += 1
            ev(uid, "broadcast", meta="meno_update_error")
            log.warning("meno update %s: %s", uid, e)
    await update.message.reply_text(f"Пуш про мено-экран отправлен.\n\nУшло: {sent}\nОшибок: {failed}")

# ---------- text ----------
async def on_text(update, context):
    cid = update.effective_chat.id
    try:
        await handle_text(update, context, update.message.text.strip())
    except Exception as e:
        log.exception("text handler failed for %s", cid)
        ev(cid, "error", meta=type(e).__name__)
        await update.message.reply_text(
            "Я вижу сообщение, но сейчас не смогла собрать ответ. Попробуй ещё раз через минуту или открой Меню.",
            reply_markup=InlineKeyboardMarkup([[B("Меню", "menu", KBS.PRIMARY)]]))

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
    txt, addressed = strip_aiwa_address(txt)
    if addressed and not txt:
        return await update.message.reply_text("Я тут. Напиши вопрос или открой меню, и я помогу с циклом, питанием, нагрузкой или самочувствием.")

    VALUE_STATES = {
        "await_date": "Напиши дату начала последних месячных, например 25.05.2026 или 26 мая 2026. Потом даты можно редактировать в приложении.",
        "await_len": "Напиши среднюю длину цикла числом. Это дни от первого дня одних месячных до первого дня следующих. Обычно 21-35, если не знаешь, можно 28.",
        "await_cycle_len": "Какая средняя длина цикла? Это дни от первого дня одних месячных до первого дня следующих. Напиши число, например 28.",
        "await_preg_date": "Напиши дату начала последних месячных, например 25.05.2026. Если знаешь ПДР, напиши дату и добавь слово ПДР.",
        "await_period_date": "Напиши дату начала последних месячных, например 25.05.2026 или 26 мая 2026. Потом даты можно редактировать в приложении.",
        "await_time": "Во сколько присылать сводку? Напиши время по Москве, например 08:00.",
        "await_profile": "Напиши рост, вес и возраст через пробел. Например 168 60 30. Можно написать «Пропустить».",
        "await_profile_edit": "Напиши рост, вес и возраст через пробел. Например 168 60 30.",
        "await_cycles": "Пришли даты начала месячных, по одной на строке. Можно добавить последние несколько циклов.",
        "await_symptom_custom": "Напиши симптом коротко, например «тошнота», «ломота», «боль в груди».",
    }
    if state in VALUE_STATES and is_question_like(txt):
        await context.bot.send_chat_action(cid, "typing")
        _, _qst = status_of(cid)
        a = await think_llm(context, cid, L.answer_question, _qst, txt, profile_of(u), None)
        await update.message.reply_text(fit_tg(L.split_followups(a)[0]))
        return await update.message.reply_text("А теперь вернёмся к настройке. " + VALUE_STATES[state])

    if is_partner(cid) and not is_onboarded(u):
        wid = woman_of_partner(cid); wu = row(wid); _, wst = status_of(wid)
        mt = match_meta(txt)
        if mt:
            return await update.message.reply_text({"about": ABOUT_TEXT, "privacy": PRIVACY_TEXT, "tech": TECH_TEXT}[mt])
        if is_gibberish(txt):
            return await update.message.reply_text("Не поняла вопрос. Напиши словами, например: «как её поддержать сегодня» или «что ей купить».")
        await context.bot.send_chat_action(cid, "typing")
        t0 = time.monotonic(); usage = []
        if wu and wu.get("mode") == "preg" and wu.get("last_period"):
            ans = await asyncio.to_thread(L.partner_preg_answer, C.preg_status(wu["last_period"]), txt, last_hint(wid), usage=usage)
        elif wst:
            ans = await asyncio.to_thread(L.partner_answer, wst, txt, last_hint(wid), usage=usage)
        else:
            return await update.message.reply_text(PARTNER_INFO)
        ev(cid, "answered", tokens=sum(usage), meta="partner_q", ms=int((time.monotonic()-t0)*1000), n=len(txt))
        return await context.bot.send_message(cid, ans)

    if state == "await_date":
        d = parse_date(txt)
        if not d:
            if is_question_like(txt):
                a = await think_llm(context, cid, L.answer_question, None, txt, profile_of(u), None)
                return await update.message.reply_text(fit_tg(L.split_followups(a)[0]) + "\n\nА теперь вернёмся: напиши дату начала последних месячных, например 25.05.2026. Потом даты можно редактировать в приложении.")
            return await update.message.reply_text("Не разобрала дату. Напиши дату начала последних месячных в формате ДД.ММ.ГГГГ, например 25.05.2026, или нажми кнопку выше.")
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
                return await update.message.reply_text(fit_tg(L.split_followups(a)[0]) + "\n\nА теперь вернёмся: какая средняя длина цикла в днях? Обычно это 21-35 дней, но у многих бывает иначе.")
            return await update.message.reply_text("Нужно число от 20 до 60. Если не знаешь точно, напиши примерное значение, потом его можно поправить. Если цикл нерегулярный, можно начать заново через /start и выбрать «Нет регулярного цикла».")
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
        return await update.message.reply_text("Принято 💪 Какой у тебя уровень физической активности?\n\n"
            "• Минимальная — сидячий образ жизни, почти без спорта\n"
            "• Лёгкая — лёгкие тренировки 1–3 раза в неделю\n"
            "• Умеренная — спорт 3–5 раз в неделю\n"
            "• Высокая — интенсивно 6–7 раз в неделю\n"
            "• Очень высокая — спорт плюс физическая работа\n\n"
            "Это нужно, чтобы точнее считать калории и питание.", reply_markup=ACT_KB)

    if state == "await_symptom_custom":
        code = symptom_code(txt)
        if not code:
            return await update.message.reply_text("Напиши симптом коротко, например «тошнота» или «ломота».")
        today_s = date.today().isoformat()
        log_add_symptom(cid, today_s, code)
        upsert(cid, state=None)
        ev(cid, "manual", meta="custom_symptom", n=len(txt))
        sel = set((log_get(cid, today_s) or {}).get("symptoms", []))
        return await update.message.reply_text(f"Записала: {symptom_label(code)}. Можно добавить ещё или нажать Готово.", reply_markup=sym_kb(sel))

    if state == "await_time":
        hhmm = parse_time(txt)
        if hhmm:
            upsert(cid, send_time=hhmm, state=None); schedule_daily(context.application, cid, hhmm)
            return await update.message.reply_text(schedule_text(cid, hhmm))
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
            return await update.message.reply_text("Не разобрала дату. Напиши дату начала последних месячных в формате ДД.ММ.ГГГГ, например 25.05.2026. Если знаешь ПДР, напиши дату и добавь слово ПДР.")
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
        return await send_section(context, cid, st, "food")
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
        return await q.message.reply_text(
            "Ок. Напиши дату начала последних месячных. По этой дате Айва поймёт день цикла и подстроит питание, нагрузку и подсказки.\n\n"
            "Например: 25.05.2026 или 26 мая 2026. Потом даты можно редактировать в приложении.")
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
        return await q.message.reply_text(
            "Ок. Айва может работать и без регулярного цикла: при нерегулярных месячных, беременности, менопаузе или если месячных сейчас нет.\n\n"
            "Выбери, что ближе сейчас. Это можно поменять позже.", reply_markup=NOCYCLE_KB)
    if data.startswith("mode:"):
        m = data.split(":")[1]; upsert(cid, mode=m)
        schedule_daily(context.application, cid, row(cid)["send_time"] or "08:00")
        if m == "preg":
            upsert(cid, state="await_preg_date")
            return await q.message.reply_text("Поздравляю! \U0001F930 Чтобы Айва считала срок, ПДР и неделю беременности, напиши дату начала последних месячных. Например: 25.05.2026. Если знаешь ПДР, напиши дату и добавь слово ПДР.")
        upsert(cid, state="await_profile")
        return await q.message.reply_text(
            "Поняла. Айва не будет считать стандартные фазы цикла, но всё равно сможет давать персональные рекомендации по самочувствию, питанию и движению.\n\n"
            "Чтобы советы были точнее, напиши рост, вес и возраст через пробел. Например: 168 60 30. Можно пропустить и добавить позже.", reply_markup=SKIP_KB)
    ev(cid, "suggest" if data.startswith("q:") else "button", meta=data)
    u, st = status_of(cid)
    if not st and not is_onboarded(u):
        return await need_onboard(q.message)
    general = st is None
    today_s = date.today().isoformat()
    if data == "menu":
        await q.message.reply_text("О чём рассказать сегодня?", reply_markup=menu_kb_for(u, general))
    elif data == "today":
        await push_summary(context, cid)
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
        await q.message.reply_text("Напиши дату начала последних месячных, например 25.05.2026, или нажми кнопку. Потом даты можно редактировать в приложении.", reply_markup=PERIOD_KB)
    elif data == "period_today":
        mark_period(context, cid, today_s)
        await q.message.reply_text("Отметила начало месячных сегодня. Вот свежая сводка:")
        await push_summary(context, cid)
    elif data == "set:time":
        upsert(cid, state="await_time")
        await q.message.reply_text("Во сколько присылать сводку (МСК)? Выбери или впиши своё время, например 09:00.", reply_markup=time_kb())
    elif data.startswith("tm:"):
        hhmm = data.split(":", 1)[1]; upsert(cid, send_time=hhmm, state=None); schedule_daily(context.application, cid, hhmm)
        await q.message.reply_text(schedule_text(cid, hhmm))
    elif data.startswith("ci:e:"):
        log_set(cid, today_s, energy=int(data.split(":")[2])); await q.edit_message_text("Настроение?", reply_markup=en_kb("m", MOOD))
    elif data.startswith("ci:m:"):
        log_set(cid, today_s, mood=int(data.split(":")[2])); await q.edit_message_text("Что беспокоит сегодня? Можно несколько, потом Готово.", reply_markup=sym_kb(set()))
    elif data.startswith("ci:s:"):
        log_toggle(cid, today_s, data.split(":")[2]); sel = set((log_get(cid, today_s) or {}).get("symptoms", [])); await q.edit_message_reply_markup(reply_markup=sym_kb(sel))
    elif data == "ci:custom":
        upsert(cid, state="await_symptom_custom")
        await q.message.reply_text("Напиши свой симптом коротко, например «тошнота», «ломота», «боль в груди».")
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
        await admin_alert(context.application, "handler_error",
            f"⚠️ Ошибка обработчика: {type(context.error).__name__}\nПроверь Railway logs.")
    except Exception: pass

async def admin_alert(app, key, text, cooldown=900):
    if not AIWA_ADMIN:
        return
    now = time.time()
    if now - ALERT_LAST.get(key, 0) < cooldown:
        return
    ALERT_LAST[key] = now
    chat_id = str(AIWA_ADMIN).strip()
    try:
        chat_id = int(chat_id)
    except Exception:
        pass
    try:
        await app.bot.send_message(chat_id, "🚨 AIWA alert\n\n" + text)
    except Exception as e:
        log.warning("admin_alert: %s", e)

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
            err_threshold = int(os.environ.get("AIWA_ALERT_LLM_ERRS", "2"))
            if calls and s["err"] >= err_threshold and (s["err"] / calls) >= 0.5:
                await admin_alert(app, "llm_errors",
                    f"Модель отвечает нестабильно: ошибок {s['err']} из {calls} вызовов за последнюю минуту.\n"
                    f"Средняя задержка: {avg} мс, очередь модели: {wq}.", cooldown=600)
            q_threshold = int(os.environ.get("AIWA_ALERT_BCAST_Q", "20"))
            if q >= q_threshold:
                await admin_alert(app, "broadcast_queue",
                    f"Очередь рассылки выросла до {q}. Возможно, модель или Telegram тормозит.", cooldown=600)
        except Exception as e:
            log.warning("load_logger: %s", e)

async def model_probe(app):
    """Опциональная активная проверка модели. Включается AIWA_MODEL_PROBE_SEC, например 300."""
    interval = int(os.environ.get("AIWA_MODEL_PROBE_SEC", "0") or "0")
    if interval <= 0:
        return
    await asyncio.sleep(30)
    while True:
        usage = []
        ok = False; out = ""
        try:
            ok, out = await asyncio.to_thread(L.health_check, usage)
        except Exception as e:
            out = type(e).__name__
        if not ok:
            await admin_alert(app, "model_probe",
                f"Служебная проверка модели не получила ответ.\nОтвет/ошибка: {out or 'пусто'}", cooldown=600)
        await asyncio.sleep(interval)

async def on_startup(app):
    global BOT_USERNAME, BCAST_Q
    try:
        import concurrent.futures
        asyncio.get_running_loop().set_default_executor(concurrent.futures.ThreadPoolExecutor(max_workers=24))
    except Exception as e:
        log.warning("executor: %s", e)
    if AIWA_WEBAPP_URL:
        try:
            await app.bot.set_chat_menu_button(menu_button=MenuButtonWebApp(text=APP_MENU_BUTTON_TEXT, web_app=WebAppInfo(url=AIWA_WEBAPP_URL)))
        except Exception as e:
            log.warning("menu button: %s", e)
    try:
        await app.bot.set_my_commands([
            BotCommand("start", "Старт"),
            BotCommand("menu", "Меню"),
            BotCommand("today", "Сводка за день"),
            BotCommand("app", "Приложение"),
            BotCommand("report", "Выписка для врача"),
            BotCommand("partner", "Подключить партнёра"),
            BotCommand("unlink", "Отключить партнёра"),
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
    asyncio.create_task(model_probe(app))
    n = catchup = 0
    for cid in all_users():
        u = row(cid) or {}
        hhmm = u.get("send_time") or "08:00"
        schedule_daily(app, cid, hhmm); n += 1
        if should_catchup_broadcast(cid, hhmm):
            if await enqueue_broadcast(cid):
                catchup += 1
    log.info("Rescheduled %d, broadcast catchup queued %d", n, catchup)

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
           "partner_linked": bool(partner_of(cid)),
           "today_log": log_get(cid, date.today().isoformat()) or {"symptoms": []},
           "send_time": u.get("send_time") or "08:00",
           "profile": {"height": u.get("height"), "weight": u.get("weight"), "age": u.get("age"),
                       "activity": u.get("activity"), "diet": u.get("diet") or "", "diet_note": u.get("diet_note") or ""}}
    out["sym_log"] = logs_of(cid, (date.today() - timedelta(days=45)).isoformat())
    out["past_periods"] = periods_of(cid)
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
        if code in SYM or code.startswith("custom:"):
            log_toggle(cid, ds, code)
    if body.get("custom_symptom"):
        code = symptom_code(str(body.get("custom_symptom")))
        if code:
            log_add_symptom(cid, ds, code)
    ev(cid, "manual", meta="web_checkin")
    return _cors(web.json_response({"ok": True, "log": log_get(cid, ds) or {"symptoms": []}}))
async def _api_profile(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u):
        return _cors(web.json_response({"error": "onboard"}, status=403))
    try:
        cm = float(str(body.get("height", "")).replace(",", "."))
        kg = float(str(body.get("weight", "")).replace(",", "."))
        age = int(float(str(body.get("age", "")).replace(",", ".")))
        assert 120 < cm < 220 and 30 < kg < 250 and 10 < age < 80
    except Exception:
        return _cors(web.json_response({"error": "bad_profile", "text": "Нужны рост, вес и возраст."}, status=400))
    upsert(cid, height=int(cm), weight=kg, age=age)
    ev(cid, "manual", meta="web_profile")
    return _cors(web.json_response({"ok": True, "profile": {"height": int(cm), "weight": kg, "age": age}}))
async def _api_meal(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid); _, st = status_of(cid)
    if not is_onboarded(u):
        return _cors(web.json_response({"error": "onboard"}, status=403))
    if st is None:
        st = {"phase": "follicular", "phase_ru": "фолликулярная", "subphase": "общая", "day": ""}
    prof = profile_of(u); target = profile_kcal(prof) if prof else None; usage = []
    meal = await asyncio.to_thread(L.replace_meal, st, body.get("slot", 0), body.get("dish"), prof, target, usage)
    ev(cid, "button", meta="web_meal_replace"); ev(cid, "tokens", sum(usage))
    return _cors(web.json_response({"meal": meal}))
async def _api_partner(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u):
        return _cors(web.json_response({"error": "onboard"}, status=403))
    if body.get("action") == "unlink":
        c = db(); c.execute("DELETE FROM partners WHERE woman_id=? OR partner_id=?", (cid, cid)); c.commit(); c.close()
        ev(cid, "manual", meta="web_partner_unlink")
        return _cors(web.json_response({"ok": True, "linked": False}))
    code = u.get("partner_code")
    if not code:
        code = secrets.token_hex(4); set_partner_code(cid, code)
    link = f"https://t.me/{BOT_USERNAME}?start=p_{code}" if BOT_USERNAME else ""
    pid = partner_of(cid)
    ev(cid, "button", meta="web_partner")
    return _cors(web.json_response({"code": code, "link": link, "linked": bool(pid)}))
async def _api_section(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid); _, st = status_of(cid); kind = body.get("kind", "food"); ev(cid, "button", meta="web_" + kind)
    if not is_onboarded(u):
        return _cors(web.json_response({"error": "onboard", "text": "Сначала настрой Айву в боте."}, status=403))
    if st is None:
        prof = profile_of(u); target = profile_kcal(prof) if prof else None
        if kind == "food":
            menu = await asyncio.to_thread(L.general_menu, prof, u.get("mode"), target)
            if target: menu["macros"] = {"protein": f"{target[1]} г", "fat": f"{target[2]} г", "carbs": f"{target[3]} г"}
            txt = {"meno": "Питание под менопаузу: белок, кальций и витамин D для костей, магний для сна и приливов.",
                   "preg": "Питание в беременности: фолиевая кислота, железо, кальций и белок; без сырого и непастеризованного.",
                   "irregular": "Сбалансированное питание: белок в каждый приём, магний, железо, клетчатка.",
                   "none": "Сбалансированное питание: белок, овощи, сложные углеводы и вода."}.get(u.get("mode"), "Сбалансированное питание на день.")
            return _cors(web.json_response({"menu": menu, "kcal": (target[0] if target else None), "text": txt}))
        plan = await asyncio.to_thread(L.general_training, prof, u.get("mode"))
        return _cors(web.json_response({"text": plan.get("summary", ""), "training": plan}))
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
    msg, addressed = strip_aiwa_address(msg)
    if addressed and not msg:
        return _cors(web.json_response({"answer": "Я тут. Напиши вопрос про цикл, питание, нагрузку или самочувствие.", "suggestions": ["Когда овуляция?", "Что есть сегодня?"]}))
    intent = match_intent(msg)
    if intent == "phases":
        chatlog_add(cid, "user", msg); chatlog_add(cid, "ai", PHASES_TEXT)
        return _cors(web.json_response({"answer": PHASES_TEXT, "suggestions": ["Что есть в мою фазу?", "Какая тренировка сейчас?"]}))
    if intent in ("period", "addcycles", "profile", "cyclelen", "time", "wipe", "unlink", "partner", "checkin"):
        guide = {
            "period": "Через чат я не меняю календарь, чтобы случайно не записать ошибку. Открой в приложении экран «Сегодня», нажми «Редактировать месячные», отметь нужные дни прямо на календаре и нажми «Сохранить». В боте можно ещё написать /period.",
            "addcycles": "Историю циклов сейчас надёжнее добавлять через бота: /addcycles. Пришли даты начала месячных списком, и я заменю историю календаря.",
            "profile": "Рост, вес и возраст меняются в боте командой /profile или через Меню → Изменить данные.",
            "cyclelen": "Длину цикла меняй в боте: Меню → Изменить данные → Длина цикла.",
            "time": "Время утренней сводки меняется в боте командой /time.",
            "wipe": "Чтобы стереть все данные и отключить бота, введи в Telegram команду /stop.",
            "unlink": "Чтобы отключить партнёра, введи в Telegram команду /unlink.",
            "partner": "Партнёра можно подключить в приложении на вкладке «Статистика» или в боте командой /partner.",
            "checkin": "Симптомы можно отметить в приложении на экране «Сегодня» или в боте: /checkin, Меню → Симптомы.",
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
async def _api_mode(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u): return _cors(web.json_response({"error": "onboard"}, status=403))
    m = body.get("mode")
    if m not in ("cycle", "irregular", "meno", "none", "preg"):
        return _cors(web.json_response({"error": "bad_mode"}, status=400))
    if m in ("cycle", "preg") and not u.get("last_period"):
        return _cors(web.json_response({"error": "need_period",
            "text": "Сначала отметь дату последних месячных — без неё этот режим не включить."}, status=400))
    upsert(cid, mode=m, state=None)
    if BOT_APP:
        try: schedule_daily(BOT_APP, cid, row(cid).get("send_time") or "08:00")
        except Exception as e: log.warning("reschedule: %s", e)
    ev(cid, "manual", meta="web_mode_" + m)
    return _cors(web.json_response({"ok": True, "mode": m}))

async def _api_prefs(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    note = (body.get("diet_note") or "").strip()[:300]
    upsert(cid, diet_note=note)
    ev(cid, "manual", meta="web_prefs")
    return _cors(web.json_response({"ok": True, "diet_note": note}))

async def _api_settime(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    t = parse_time(str(body.get("time") or ""))
    if not t: return _cors(web.json_response({"error": "bad_time", "text": "Время в формате 09:00."}, status=400))
    upsert(cid, send_time=t)
    if BOT_APP:
        try: schedule_daily(BOT_APP, cid, t)
        except Exception as e: log.warning("reschedule: %s", e)
    ev(cid, "manual", meta="web_settime")
    return _cors(web.json_response({"ok": True, "send_time": t}))

async def _api_report(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    if not (BOT_APP and RPT):
        return _cors(web.json_response({"error": "unavail", "text": "Выписка временно недоступна."}, status=503))
    period = str(body.get("period") or "all")
    try:
        await send_report(_BCtx(BOT_APP), cid, period)
        return _cors(web.json_response({"ok": True}))
    except Exception as e:
        log.warning("web report %s: %s", cid, e)
        return _cors(web.json_response({"error": "fail", "text": "Не удалось собрать выписку."}, status=500))

async def _api_opts(request): return _cors(web.Response())

def _admin_key_ok(request):
    expected = os.environ.get("AIWA_ADMIN_KEY") or AIWA_ADMIN
    if not expected:
        return False
    got = request.query.get("key") or request.headers.get("X-Admin-Key") or ""
    return _hmac.compare_digest(str(got), str(expected))

def admin_dashboard_data(days=30, frm=None, to=None):
    from collections import Counter, defaultdict
    ACTIVE = ("manual", "button", "suggest", "command", "answered", "fallback", "voice")
    today = datetime.now(TZ).date()
    try: days = int(days)
    except (TypeError, ValueError): days = 30
    if frm and to:
        try:
            since = date.fromisoformat(str(frm)); until = date.fromisoformat(str(to))
            if until < since: since, until = until, since
        except Exception:
            until = today; since = today - timedelta(days=max(1, min(180, days)) - 1)
    else:
        days = max(1, min(180, days)); until = today; since = today - timedelta(days=days - 1)
    span = (until - since).days + 1
    since_ts = datetime.combine(since, dtime.min).isoformat()
    until_ts = datetime.combine(until, dtime.max).isoformat()
    c = db()
    users = c.execute("SELECT chat_id, created, last_period, cycle_len, mode FROM users").fetchall()
    events = c.execute("SELECT chat_id, ts, action, tokens, meta, ms, n FROM events WHERE ts>=? AND ts<=? ORDER BY ts",
                       (since_ts, until_ts)).fetchall()
    partners = c.execute("SELECT partner_id, woman_id, created FROM partners").fetchall()
    logs = c.execute("SELECT log_date, symptoms FROM logs WHERE log_date>=? AND log_date<=? ORDER BY log_date DESC",
                     (since.isoformat(), until.isoformat())).fetchall()
    amin = datetime.combine(today - timedelta(days=29), dtime.min).isoformat()
    arows = c.execute("SELECT chat_id, ts, action FROM events WHERE ts>=?", (amin,)).fetchall()
    c.close()
    def dparse(ts):
        try: return datetime.fromisoformat(ts).date()
        except Exception: return today
    def pct(a, p):
        a = sorted(a); return a[min(len(a) - 1, int(len(a) * p))] if a else 0
    def in_period(ts): return bool(ts) and since <= dparse(ts) <= until
    umode = {cid: (mode or "cycle") for cid, _, _, _, mode in users}

    active_by_day = defaultdict(set); active_mode_day = defaultdict(lambda: defaultdict(set))
    signups_by_day = Counter(); answers_by_day = Counter(); errors_by_day = Counter()
    bcast_by_day = defaultdict(Counter)
    bcast = Counter(); bcast_today = Counter(); actions = Counter(); goals = Counter(); modes = Counter()
    answers = fallback = errors = tokens = reqs = 0; lat = []; input_lens = []
    for _, _, _, _, mode in users: modes[mode or "cycle"] += 1
    for cid, ts, action, tok, meta, ms, n in events:
        d = dparse(ts); iso = d.isoformat()
        if action in ACTIVE:
            active_by_day[iso].add(cid); active_mode_day[iso][umode.get(cid, "cycle")].add(cid)
            if n: input_lens.append(n)
        if action == "signup": signups_by_day[iso] += 1
        if action == "broadcast":
            key = meta or "unknown"; bcast[key] += 1; bcast_by_day[iso][key] += 1
            if d == today: bcast_today[key] += 1
        if action == "answered":
            answers += 1; answers_by_day[iso] += 1
            if ms: lat.append(ms)
        if action == "fallback": fallback += 1
        if action == "error": errors += 1; errors_by_day[iso] += 1
        if tok: tokens += tok
        if action in ("answered", "fallback", "command", "button", "manual", "suggest", "voice"): reqs += 1
        if action == "goal": goals[meta or "goal"] += 1
        label = (action + ":" + meta) if meta and action in ("manual", "goal", "broadcast") else (meta or action)
        actions[label] += 1
    abd = defaultdict(set)
    for cid, ts, action in arows:
        if action in ACTIVE: abd[dparse(ts).isoformat()].add(cid)
    def active(n):
        cut = today - timedelta(days=n - 1)
        return len(set().union(*[s for ds, s in abd.items() if date.fromisoformat(ds) >= cut]) if abd else set())
    mode_union = defaultdict(set)
    for iso, mm in active_mode_day.items():
        for m, s in mm.items(): mode_union[m] |= s
    seg_active = {m: len(s) for m, s in mode_union.items()}
    seg_dau = {m: len(s) for m, s in active_mode_day.get(today.isoformat(), {}).items()}
    symptom_counts = Counter()
    for _, ss in logs:
        for s in (ss or "").split(","):
            if s: symptom_counts[symptom_label(s)] += 1
    series = []
    d = since
    while d <= until:
        iso = d.isoformat()
        series.append({"date": iso[5:], "active": len(active_by_day.get(iso, set())),
                       "signups": signups_by_day[iso], "answers": answers_by_day[iso], "errors": errors_by_day[iso],
                       "broadcast_sent": bcast_by_day[iso]["sent"], "broadcast_error": bcast_by_day[iso]["error"],
                       "modes": {m: len(s) for m, s in active_mode_day.get(iso, {}).items()}})
        d += timedelta(days=1)
    lat.sort(); p50 = pct(lat, 0.5); p95 = pct(lat, 0.95)
    onboarded = sum(1 for _, _, lp, cl, md in users if (lp and cl) or md in ("irregular", "none", "meno", "preg"))
    new_users = sum(1 for _, created, _, _, _ in users if in_period(created))
    active_period = len(set().union(*active_by_day.values()) if active_by_day else set())
    app_users = len(set(cid for cid, _, action, _, meta, _, _ in events
                        if meta in ("webapp", "web_checkin", "web_period", "web_pa", "web_profile", "web_meal")))
    got_summary = len(set(cid for cid, _, action, _, meta, _, _ in events if action == "goal" and meta == "summary"))
    partner_new = sum(1 for _, _, created in partners if in_period(created))
    ans_tot = answers + fallback + errors
    success_rate = round(answers / ans_tot * 100) if ans_tot else 0
    avg_input = round(sum(input_lens) / len(input_lens)) if input_lens else 0
    checkin_sent = bcast["checkin_push"]; checkin_done = goals["checkin"]
    checkin_rate = round(checkin_done / checkin_sent * 100) if checkin_sent else 0
    return {
        "updated": datetime.now().strftime("%d.%m %H:%M"),
        "period_days": span, "since": since.isoformat(), "until": until.isoformat(),
        "users": len(users), "onboarded": onboarded, "new_users": new_users, "active_period": active_period,
        "dau": active(1), "wau": active(7), "mau": active(30),
        "partners": len(partners), "partner_new": partner_new, "partner_women": len(set(p[1] for p in partners)),
        "broadcast": {"scheduled": len(all_users()), "queued": bcast["queued"], "sent": bcast["sent"], "error": bcast["error"],
            "today_queued": bcast_today["queued"], "today_sent": bcast_today["sent"], "today_error": bcast_today["error"]},
        "model": {"answers": answers, "fallback": fallback, "errors": errors, "tokens": tokens,
            "p50_ms": p50, "p95_ms": p95, "success_rate": success_rate, "avg_input": avg_input},
        "funnel": {"new_users": new_users, "onboarded_total": onboarded, "active_period": active_period,
            "got_summary": got_summary, "app_users": app_users, "partner_new": partner_new},
        "proactivity": {"checkin_sent": checkin_sent, "checkin_done": checkin_done, "checkin_rate": checkin_rate},
        "seg_dau": Counter(seg_dau).most_common(), "seg_active": Counter(seg_active).most_common(),
        "modes": modes.most_common(), "actions": actions.most_common(14), "goals": goals.most_common(10),
        "symptoms": symptom_counts.most_common(12), "days": series,
    }

async def _admin_stats(request):
    if not _admin_key_ok(request):
        return web.json_response({"error": "forbidden"}, status=403)
    qp = request.query
    return web.json_response(admin_dashboard_data(qp.get("days", 30), qp.get("from"), qp.get("to")))

async def _admin_page(request):
    if not _admin_key_ok(request):
        return web.Response(text="forbidden", status=403)
    html_text = """<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AIWA dashboard</title><style>
:root{--paper:#FAF5F2;--ink:#211C1A;--muted:#8E8179;--line:#E8DED8;--card:#FFFDFC;--rose:#C25E76;--rose2:#F8DDE5;--green:#4FAB73;--blue:#2F84DD;--amber:#E4A93A;--bad:#A94D5A}*{box-sizing:border-box}body{margin:0;background:linear-gradient(180deg,#FFFDFC 0,#FAF5F2 42%,#F6EEE9 100%);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"Manrope","Segoe UI",Arial,sans-serif}.wrap{max-width:1240px;margin:0 auto;padding:28px 24px 40px}.top{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:18px}.brand{display:flex;gap:12px;align-items:center}.mark{width:42px;height:42px;border-radius:16px;background:radial-gradient(circle at 35% 30%,#fff 0 14%,#F8C9D6 15% 45%,#C25E76 46% 100%);box-shadow:0 14px 30px rgba(194,94,118,.18)}h1{font-family:Georgia,"Times New Roman",serif;font-size:36px;line-height:1;margin:0;font-weight:500}.sub,.muted{color:var(--muted)}.sub{font-size:14px;margin-top:7px}.tabs{display:flex;gap:8px;background:#fff;border:1px solid var(--line);padding:6px;border-radius:999px;box-shadow:0 10px 26px rgba(33,28,26,.05)}.tabs button{border:0;border-radius:999px;background:transparent;padding:10px 14px;color:#6F625B;font-weight:800;cursor:pointer}.tabs button.on{background:var(--rose);color:white}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:14px 0}.card{background:rgba(255,253,252,.92);border:1px solid var(--line);border-radius:18px;padding:17px;box-shadow:0 12px 28px rgba(33,28,26,.05)}.k{font-size:11px;text-transform:uppercase;color:#A79A91;font-weight:850;letter-spacing:.06em}.v{font-size:32px;line-height:1.05;font-family:Georgia,"Times New Roman",serif;margin-top:7px}.hint{font-size:13px;color:var(--muted);margin-top:5px}.cols{display:grid;grid-template-columns:1.35fr .85fr;gap:14px}.stack{display:grid;gap:14px}.chart{display:flex;align-items:end;gap:5px;height:180px;margin-top:16px;padding:0 2px 24px;border-bottom:1px solid var(--line)}.b{flex:1;min-width:5px;border-radius:7px 7px 0 0;background:linear-gradient(180deg,var(--rose),#E9A6B6);position:relative}.b.signup{background:linear-gradient(180deg,var(--green),#BEE4C7)}.b.answer{background:linear-gradient(180deg,var(--blue),#BBD8F5)}.b.err{background:linear-gradient(180deg,var(--bad),#F0BBC2)}.b i{position:absolute;bottom:-21px;left:50%;transform:translateX(-50%) rotate(-35deg);font-size:10px;color:#A79A91;font-style:normal;white-space:nowrap}.legend{display:flex;gap:12px;flex-wrap:wrap;margin-top:13px;font-size:13px;color:#6F625B}.dot{width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:6px;background:var(--rose)}.dot.g{background:var(--green)}.dot.blu{background:var(--blue)}.dot.bad{background:var(--bad)}.row{display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid #F0E8E3;padding:9px 0;font-size:14px}.row:last-child{border-bottom:0}.row span{color:#6F625B}.row b{text-align:right}.pillgrid{display:grid;gap:9px;margin-top:10px}.pill{display:grid;grid-template-columns:minmax(90px,1fr) 70px;gap:10px;align-items:center}.track{height:10px;border-radius:99px;background:#F2EAE5;overflow:hidden}.fill{display:block;height:100%;border-radius:99px;background:var(--rose)}.fill.green{background:var(--green)}.fill.blue{background:var(--blue)}.fill.amber{background:var(--amber)}.split{display:grid;grid-template-columns:1fr 1fr;gap:14px}.wide{grid-column:1/-1}.status{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);border-radius:999px;padding:7px 10px;background:#fff;color:#6F625B;font-size:13px}.loading{padding:28px;border:1px dashed var(--line);border-radius:18px;color:var(--muted)}@media(max-width:980px){.grid{grid-template-columns:repeat(2,1fr)}.cols,.split{grid-template-columns:1fr}.top{align-items:flex-start;flex-direction:column}}.tabs .dinp{border:1px solid var(--line);border-radius:10px;padding:8px 9px;font-family:inherit;color:#6F625B;font-size:13px;background:#fff}#applyRange{background:var(--rose);color:#fff}@media(max-width:560px){.wrap{padding:18px 14px}.grid{grid-template-columns:1fr}.tabs{width:100%;justify-content:space-between}.tabs button{flex:1;padding:9px 8px}h1{font-size:31px}.chart{gap:3px}.b i{display:none}}
</style><div class="wrap"><div class="top"><div class="brand"><div class="mark"></div><div><h1>AIWA dashboard</h1><div class="sub" id="up">загрузка</div></div></div><div class="tabs" id="tabs"><button data-days="1">сегодня</button><button data-days="2">2 дня</button><button data-days="7">7 дней</button><button data-days="30">30 дней</button><button data-days="90">90 дней</button><input type="date" id="dfrom" class="dinp"><input type="date" id="dto" class="dinp"><button id="applyRange">диапазон</button></div></div><div id="root" class="loading">Собираю статистику...</div></div>
<script>
const q=new URLSearchParams(location.search),key=q.get('key')||'';let period=Number(q.get('days')||30);if(![1,2,7,30,90].includes(period))period=30;let frm=q.get('from')||'',to=q.get('to')||'';const rootEl=document.getElementById('root'),upEl=document.getElementById('up');
const labels={cycle:'цикл',irregular:'нерегулярный',none:'без цикла',meno:'менопауза',preg:'беременность',answered:'ответы',fallback:'фолбэк',error:'ошибка',command:'команды',button:'кнопки',suggest:'саджесты','manual:web_checkin':'чек-ин','manual:web_period':'месячные','manual:web_pa':'близость','goal:summary':'сводка','goal:report':'выписка','goal:partner_link':'партнёр','broadcast:sent':'рассылка ушла','broadcast:error':'ошибка рассылки','broadcast:queued':'рассылка в очереди'};
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function name(x){return labels[x]||x||'пусто'}function fmt(n){return Number(n||0).toLocaleString('ru-RU')}function row(k,v){return `<div class=row><span>${esc(k)}</span><b>${esc(v)}</b></div>`}
function card(k,v,h){return `<div class=card><div class=k>${esc(k)}</div><div class=v>${esc(v)}</div>${h?`<div class=hint>${esc(h)}</div>`:''}</div>`}
function list(items,cls){let mx=Math.max(1,...(items||[]).map(x=>x[1]||0));return `<div class=pillgrid>${(items||[]).map((x,i)=>`<div class=pill><div><b>${esc(name(x[0]))}</b><div class=track><span class="fill ${cls||''}" style="width:${Math.max(4,(x[1]||0)/mx*100)}%"></span></div></div><b>${fmt(x[1])}</b></div>`).join('')||'<div class=muted>нет данных</div>'}</div>`}
function bars(days,field,cls){let mx=Math.max(1,...days.map(x=>x[field]||0));return days.map((x,i)=>`<div class="b ${cls||''}" title="${x.date}: ${x[field]||0}" style="height:${Math.max(3,(x[field]||0)/mx*100)}%">${(i%Math.ceil(days.length/8)===0)?`<i>${x.date}</i>`:''}</div>`).join('')}
function segCard(d){return `<div class="card wide"><div class=k>Активность по режимам</div><div class=split><div><div class=hint>DAU сегодня</div>${list(d.seg_dau)}</div><div><div class=hint>уникальные за период</div>${list(d.seg_active)}</div></div></div>`}
function proCard(d){let p=d.proactivity||{};return `<div class="card wide"><div class=k>Проактивность · утренний чек-ин</div>${row('чек-инов отправлено',fmt(p.checkin_sent))+row('ответили на чек-ин',fmt(p.checkin_done))+row('доля ответивших',(p.checkin_rate||0)+'%')}</div>`}
function setTabs(){document.querySelectorAll('#tabs button[data-days]').forEach(b=>{b.classList.toggle('on',!frm&&Number(b.dataset.days)===period);b.onclick=()=>{period=Number(b.dataset.days);frm='';to='';q.set('days',period);q.delete('from');q.delete('to');history.replaceState(null,'','?'+q.toString());load();}});var f=document.getElementById('dfrom'),t=document.getElementById('dto');if(f)f.value=frm;if(t)t.value=to;var ar=document.getElementById('applyRange');if(ar)ar.onclick=()=>{var a=document.getElementById('dfrom').value,z=document.getElementById('dto').value;if(a&&z){frm=a;to=z;q.set('from',a);q.set('to',z);q.delete('days');history.replaceState(null,'','?'+q.toString());load();}else{alert('Выбери обе даты');}};}
async function load(){setTabs();rootEl.className='loading';rootEl.textContent='Собираю статистику...';let r=await fetch('/api/admin_stats?key='+encodeURIComponent(key)+((frm&&to)?('&from='+frm+'&to='+to):('&days='+period)));let d=await r.json();if(d.error){rootEl.textContent='Нет доступа';return}upEl.textContent=`${d.since} - ${d.until}, обновлено ${d.updated}`;rootEl.className='';rootEl.innerHTML=`<div class=grid>${card('Всего пользователей',fmt(d.users),`новых за период: ${fmt(d.new_users)}`)}${card('Онбординг',fmt(d.onboarded),'всего прошли настройку')}${card('Активные за период',fmt(d.active_period),`DAU ${fmt(d.dau)} · WAU ${fmt(d.wau)} · MAU ${fmt(d.mau)}`)}${card('Партнёры',fmt(d.partners),`новых: ${fmt(d.partner_new)}, женщин: ${fmt(d.partner_women)}`)}${card('Ответы модели',fmt(d.model.answers),`успешность ${d.model.success_rate}%`)}${card('Ошибки модели',fmt(d.model.errors),`p95 ${fmt(d.model.p95_ms)} мс`)}${card('Рассылки',fmt(d.broadcast.sent),`ошибок: ${fmt(d.broadcast.error)}`)}${card('Токены',fmt(d.model.tokens),`средний ввод ${fmt(d.model.avg_input)} симв.`)}</div>${segCard(d)}${proCard(d)}<div class=cols><div class=stack><div class=card><div class=k>Активность за ${d.period_days} дней</div><div class=chart>${bars(d.days,'active','')}</div><div class=legend><span><i class=dot></i>активные пользователи по дням</span></div></div><div class=split><div class=card><div class=k>Регистрации</div><div class=chart>${bars(d.days,'signups','signup')}</div><div class=legend><span><i class="dot g"></i>новые пользователи</span></div></div><div class=card><div class=k>Ответы и ошибки</div><div class=chart>${bars(d.days,'answers','answer')}</div><div class=legend><span><i class="dot blu"></i>ответы</span><span><i class="dot bad"></i>ошибки: ${fmt(d.model.errors)}</span></div></div></div></div><div class=stack><div class=card><div class=k>Рассылки</div>${row('запланировано сейчас',fmt(d.broadcast.scheduled))+row('ушло за период',fmt(d.broadcast.sent))+row('ошибок за период',fmt(d.broadcast.error))+row('сегодня ушло',fmt(d.broadcast.today_sent))+row('сегодня ошибок',fmt(d.broadcast.today_error))}</div><div class=card><div class=k>Воронка</div>${row('новые пользователи',fmt(d.funnel.new_users))+row('активные за период',fmt(d.funnel.active_period))+row('получили сводку',fmt(d.funnel.got_summary))+row('пользовались приложением',fmt(d.funnel.app_users))+row('новые партнёры',fmt(d.funnel.partner_new))}</div><div class=card><div class=k>Модель</div>${row('ответы',fmt(d.model.answers))+row('фолбэки',fmt(d.model.fallback))+row('ошибки',fmt(d.model.errors))+row('успешность',d.model.success_rate+'%')+row('p50 / p95',fmt(d.model.p50_ms)+' / '+fmt(d.model.p95_ms)+' мс')}</div></div><div class="card wide"><div class=k>Топ действий</div>${list(d.actions)}</div><div class=card><div class=k>Симптомы</div>${list(d.symptoms,'amber')}</div><div class=card><div class=k>Режимы</div>${list(d.modes,'green')}</div><div class=card><div class=k>Целевые действия</div>${list(d.goals,'blue')}</div></div>`}
load().catch(e=>{rootEl.className='loading';rootEl.textContent='Ошибка загрузки: '+e.message});
</script>"""
    return web.Response(text=html_text, content_type="text/html")

def build_web():
    aio = web.Application()
    aio.router.add_get("/", _serve_index)
    aio.router.add_get("/health", lambda r: web.Response(text="ok " + AIWA_VERSION))
    aio.router.add_get("/admin", _admin_page)
    aio.router.add_get("/api/admin_stats", _admin_stats)
    aio.router.add_post("/api/data", _api_data)
    aio.router.add_post("/api/section", _api_section)
    aio.router.add_post("/api/chat", _api_chat)
    aio.router.add_post("/api/period", _api_period)
    aio.router.add_post("/api/pa", _api_pa)
    aio.router.add_post("/api/checkin", _api_checkin)
    aio.router.add_post("/api/profile", _api_profile)
    aio.router.add_post("/api/meal", _api_meal)
    aio.router.add_post("/api/partner", _api_partner)
    aio.router.add_post("/api/mode", _api_mode)
    aio.router.add_post("/api/prefs", _api_prefs)
    aio.router.add_post("/api/settime", _api_settime)
    aio.router.add_post("/api/report", _api_report)
    aio.router.add_route("OPTIONS", "/api/{tail:.*}", _api_opts)
    aio.router.add_get("/{tail:.*}", _serve_index)
    return aio

async def run_all():
    app = Application.builder().token(os.environ["BOT_TOKEN"]).build()
    global BOT_APP; BOT_APP = app
    for cmd, fn in (("start", start), ("today", today), ("summary", today), ("id", id_cmd), ("calendar", calendar_cmd), ("checkin", checkin_cmd),
                    ("period", period_cmd), ("menu", menu), ("time", set_time_cmd), ("mode", mode_cmd), ("menutoday", menutoday_cmd),
                    ("profile", profile_cmd), ("guide", guide_cmd), ("about", about_cmd), ("report", report_cmd), ("partner", partner_cmd), ("unlink", unlink_cmd), ("addcycles", addcycles_cmd), ("app", app_cmd), ("stop", stop), ("help", help_cmd), ("stats", stats_cmd), ("broadcast_today", broadcast_today_cmd), ("meno_update", meno_update_cmd)):
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
