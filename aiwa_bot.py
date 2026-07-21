# -*- coding: utf-8 -*-
"""AIWA, Telegram-бот женского здоровья по циклу: сводка, инфографика, меню, чек-ин, история, статистика."""
import os, io, re, time, json, html, asyncio, sqlite3, secrets, logging
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
from telegram.error import BadRequest, TimedOut, NetworkError, RetryAfter, Forbidden
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
FOOD_Q = None   # очередь обеденного пуша про еду
FOOD_PENDING = set()
TRAIN_Q = None  # очередь вечернего пуша про тренировку
TRAIN_PENDING = set()
ANNOUNCE_WAIT = set()   # админы в режиме рассылки: ждём следующее сообщение и копируем всем
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
# httpx логирует полный URL с токеном бота на уровне INFO — глушим, чтобы токен не утекал в логи
logging.getLogger("httpx").setLevel(logging.WARNING)
log = logging.getLogger("aiwa")
TZ = ZoneInfo(os.environ.get("AIWA_TZ", "Europe/Moscow"))
def dtoday():
    """«Сегодня» в часовом поясе пользовательниц (МСК), а не сервера: Railway живёт в UTC,
    и серверная дата после полуночи по Москве ещё показывает вчера."""
    return datetime.now(TZ).date()
DB = os.environ.get("AIWA_DB") or ("/data/aiwa.db" if os.path.isdir("/data") else "aiwa.db")
if os.path.dirname(DB): os.makedirs(os.path.dirname(DB), exist_ok=True)
AIWA_ADMIN = os.environ.get("AIWA_ADMIN")
DISCLAIMER = "AIWA не ставит диагнозы; при тревожных симптомах обратись к гинекологу."
AIWA_VERSION = "2026-07-21-v57"
print("AIWA_VERSION:", AIWA_VERSION)  # видно в Railway logs при старте
AIWA_WEBAPP_URL = os.environ.get("AIWA_WEBAPP_URL", "")
APP_BUTTON_TEXT = "📱 Приложение"
APP_MENU_BUTTON_TEXT = "Айва"
APP_CTA_HTML = "📱 <b>Приложение Айвы</b>: календарь, симптомы, питание с заменой блюд, нагрузка и статистика. Открой кнопкой ниже."
ANNOUNCE_TEXT = (
    "🌸 Большое обновление в приложении Айвы: теперь можно вести дневник питания и отмечать тренировки.\n\n"
    "🍎 Дневник калорий. Отмечай приёмы пищи по фото тарелки, текстом или вручную — Айва посчитает калории и БЖУ, "
    "соберёт дневник по приёмам (завтрак, обед, ужин, перекус) и подскажет, чего не хватило за день. Всё можно редактировать.\n\n"
    "🏋️ Тренировки. Отмечай тренировку — тип, упражнения, вес для силовых и как ощущалось. Айва разберёт нагрузку "
    "с учётом фазы цикла и твоей истории и предложит следующую: после силовой — восстановление, без повторов одного и того же.\n\n"
    "Всё подстраивается под твой цикл и самочувствие. Открой приложение кнопкой ниже."
)

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
    c.execute("""CREATE TABLE IF NOT EXISTS meals(id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, d TEXT, ts TEXT,
        title TEXT, kcal INTEGER DEFAULT 0, protein REAL DEFAULT 0, fat REAL DEFAULT 0, carbs REAL DEFAULT 0,
        grams INTEGER, items TEXT, source TEXT)""")
    c.execute("""CREATE TABLE IF NOT EXISTS workouts(id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, d TEXT, ts TEXT,
        type TEXT, items TEXT, duration TEXT, rpe TEXT, note TEXT, review TEXT)""")
    c.execute("""CREATE TABLE IF NOT EXISTS proactive_log(id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER,
        ts TEXT, signal TEXT, score INTEGER DEFAULT 0, sent INTEGER DEFAULT 0, text TEXT)""")
    c.execute("CREATE TABLE IF NOT EXISTS proactive_state(chat_id INTEGER, signal TEXT, last_ts TEXT, PRIMARY KEY(chat_id, signal))")
    c.execute("CREATE TABLE IF NOT EXISTS memory(chat_id INTEGER, mkey TEXT, mval TEXT, updated TEXT, PRIMARY KEY(chat_id, mkey))")
    c.execute("CREATE TABLE IF NOT EXISTS referrals(chat_id INTEGER PRIMARY KEY, source TEXT, ts TEXT)")
    for col in ("meta TEXT", "ms INTEGER DEFAULT 0", "n INTEGER DEFAULT 0", "calls INTEGER DEFAULT 0"):
        try: c.execute(f"ALTER TABLE events ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    for col in ("end_date TEXT",):
        try: c.execute(f"ALTER TABLE cycles ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    try: c.execute("ALTER TABLE meals ADD COLUMN slot TEXT")
    except sqlite3.OperationalError: pass
    for _wcol in ("kcal INTEGER DEFAULT 0", "muscles TEXT"):
        try: c.execute(f"ALTER TABLE workouts ADD COLUMN {_wcol}")
        except sqlite3.OperationalError: pass
    for _ix in ("CREATE INDEX IF NOT EXISTS ix_events_ts ON events(ts)",
                "CREATE INDEX IF NOT EXISTS ix_events_cid_ts ON events(chat_id, ts)",
                "CREATE INDEX IF NOT EXISTS ix_meals_cid_d ON meals(chat_id, d)",
                "CREATE INDEX IF NOT EXISTS ix_workouts_cid_d ON workouts(chat_id, d)"):
        try: c.execute(_ix)
        except sqlite3.OperationalError: pass
    for col in ("state TEXT", "pending_date TEXT", "height INTEGER", "weight REAL", "age INTEGER",
                "activity INTEGER", "diet TEXT", "partner_code TEXT", "mode TEXT", "diet_note TEXT",
                "period_end TEXT", "period_len INTEGER", "train_profile TEXT", "kcal_goal INTEGER", "last_phase_notified TEXT", "last_reactivation TEXT"):
        try: c.execute(f"ALTER TABLE users ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    return c

def row(cid):
    c = db(); r = c.execute("SELECT chat_id,last_period,cycle_len,send_time,modules,state,pending_date,height,weight,age,activity,diet,partner_code,mode,diet_note,period_end,period_len,train_profile,kcal_goal,last_phase_notified,last_reactivation FROM users WHERE chat_id=?", (cid,)).fetchone(); c.close()
    if not r: return None
    return {"chat_id": r[0], "last_period": r[1], "cycle_len": r[2], "send_time": r[3],
            "modules": (r[4] or "phase,general,food,training").split(","), "state": r[5], "pending_date": r[6],
            "height": r[7], "weight": r[8], "age": r[9], "activity": r[10], "diet": r[11] or "", "partner_code": r[12],
            "mode": r[13] or "cycle", "diet_note": r[14] or "", "period_end": r[15], "period_len": r[16],
            "train_profile": r[17], "kcal_goal": r[18], "last_phase_notified": r[19], "last_reactivation": r[20]}

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
def ev(cid, action, tokens=0, meta=None, ms=0, n=0, calls=0):
    c = db(); c.execute("INSERT INTO events(chat_id,ts,action,tokens,meta,ms,n,calls) VALUES(?,?,?,?,?,?,?,?)",
        (cid, datetime.now(TZ).isoformat(), action, int(tokens), meta, int(ms), int(n), int(calls))); c.commit(); c.close()

def _num(x, d=0):
    try:
        return float(str(x).replace(",", ".").split()[0])
    except Exception:
        return d

def normalize_food(data, source="photo"):
    """Приводит JSON от модели к чистой записи дневника."""
    if not isinstance(data, dict):
        return None
    items = []
    for it in (data.get("items") or []):
        if not isinstance(it, dict):
            continue
        items.append({"name": str(it.get("name") or "").strip()[:60],
                      "grams": int(_num(it.get("grams"))), "kcal": int(_num(it.get("kcal"))),
                      "protein": round(_num(it.get("protein")), 1), "fat": round(_num(it.get("fat")), 1),
                      "carbs": round(_num(it.get("carbs")), 1)})
    tot = data.get("total") or {}
    kcal = int(_num(tot.get("kcal"))) or int(_num(data.get("kcal"))) or sum(i["kcal"] for i in items)
    protein = round(_num(tot.get("protein")) or _num(data.get("protein")) or sum(i["protein"] for i in items), 1)
    fat = round(_num(tot.get("fat")) or _num(data.get("fat")) or sum(i["fat"] for i in items), 1)
    carbs = round(_num(tot.get("carbs")) or _num(data.get("carbs")) or sum(i["carbs"] for i in items), 1)
    grams = int(_num(data.get("grams"))) or sum(i["grams"] for i in items) or None
    has_title = bool(str(data.get("title") or "").strip())
    title = str(data.get("title") or (items[0]["name"] if items else "Приём пищи")).strip()[:80]
    if not (kcal or items or has_title):
        return None
    return {"title": title, "kind": data.get("kind") or "dish", "items": items,
            "kcal": kcal, "protein": protein, "fat": fat, "carbs": carbs, "grams": grams,
            "confidence": data.get("confidence") or "medium", "note": str(data.get("note") or "")[:160], "source": source}

def slot_for_now():
    try: h = datetime.now(TZ).hour
    except Exception: h = datetime.now().hour
    if 4 <= h < 11: return "breakfast"
    if 11 <= h < 16: return "lunch"
    if 16 <= h < 18: return "snack"
    if 18 <= h < 24: return "dinner"
    return "snack"

def meal_add(cid, rec, d=None):
    d = d or dtoday().isoformat()
    slot = rec.get("slot") or slot_for_now()
    c = db(); mid = c.execute(
        "INSERT INTO meals(chat_id,d,ts,title,kcal,protein,fat,carbs,grams,items,source,slot) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
        (cid, d, datetime.now().isoformat(), rec["title"], int(rec["kcal"]), float(rec["protein"]), float(rec["fat"]),
         float(rec["carbs"]), (int(rec["grams"]) if rec.get("grams") else None),
         json.dumps(rec.get("items") or [], ensure_ascii=False), rec.get("source") or "photo", slot)).lastrowid
    c.commit(); c.close(); return mid

def meal_set_slot(cid, mid, slot):
    if slot not in ("breakfast", "lunch", "snack", "dinner"): return False
    c = db(); c.execute("UPDATE meals SET slot=? WHERE chat_id=? AND id=?", (slot, cid, int(mid))); c.commit(); c.close(); return True

def slot_from_text(t):
    t = (t or "").lower()
    if "завтрак" in t: return "breakfast"
    if "обед" in t: return "lunch"
    if "ужин" in t: return "dinner"
    if "перекус" in t or "полдник" in t: return "snack"
    return None

def meal_edit(cid, mid, **kw):
    cols = {"title": "title", "kcal": "kcal", "protein": "protein", "fat": "fat", "carbs": "carbs", "grams": "grams", "slot": "slot"}
    sets = []; vals = []
    for k, col in cols.items():
        if kw.get(k) is not None:
            sets.append(col + "=?"); vals.append(kw[k])
    if not sets: return False
    vals += [cid, int(mid)]
    c = db(); c.execute("UPDATE meals SET " + ", ".join(sets) + " WHERE chat_id=? AND id=?", vals); c.commit(); c.close(); return True

def meals_of(cid, d=None):
    d = d or dtoday().isoformat()
    c = db(); r = c.execute("SELECT id,ts,title,kcal,protein,fat,carbs,grams,items,source,slot FROM meals WHERE chat_id=? AND d=? ORDER BY ts", (cid, d)).fetchall(); c.close()
    return [{"id": x[0], "ts": x[1], "title": x[2], "kcal": x[3], "protein": x[4], "fat": x[5], "carbs": x[6],
             "grams": x[7], "items": json.loads(x[8] or "[]"), "source": x[9], "slot": (x[10] or "snack")} for x in r]

def meal_del(cid, mid):
    c = db(); c.execute("DELETE FROM meals WHERE chat_id=? AND id=?", (cid, int(mid))); c.commit(); c.close()

def meal_scale(cid, mid, new_grams):
    """Пересчитывает КБЖУ приёма пропорционально новой граммовке."""
    c = db(); r = c.execute("SELECT kcal,protein,fat,carbs,grams FROM meals WHERE chat_id=? AND id=?", (cid, int(mid))).fetchone()
    if not r or not r[4] or not new_grams:
        c.close(); return False
    k = float(new_grams) / float(r[4]) if r[4] else 1
    c.execute("UPDATE meals SET kcal=?,protein=?,fat=?,carbs=?,grams=? WHERE chat_id=? AND id=?",
              (int(round(r[0] * k)), round(r[1] * k, 1), round(r[2] * k, 1), round(r[3] * k, 1), int(new_grams), cid, int(mid)))
    c.commit(); c.close(); return True

_MET = {"Силовая": 5.0, "Кардио": 8.0, "Йога": 3.0, "Ходьба": 3.5, "Плавание": 7.0}
def workout_calories(wtype, duration, rpe, weight_kg):
    m = re.search(r"\d+", str(duration or "")); mins = int(m.group()) if m else 40
    met = _MET.get(wtype, 5.0)
    r = str(rpe or "").lower()
    if "лег" in r: met *= 0.85
    elif "тяж" in r: met *= 1.15
    w = weight_kg if (weight_kg and weight_kg > 30) else 65
    return int(round(met * w * (mins / 60.0)))

def workout_add(cid, rec, d=None):
    d = d or dtoday().isoformat()
    c = db()
    cur = c.execute("INSERT INTO workouts(chat_id,d,ts,type,items,duration,rpe,note,review,kcal,muscles) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
        (cid, d, datetime.now(TZ).isoformat(), rec.get("type", ""), json.dumps(rec.get("items", []), ensure_ascii=False),
         rec.get("duration", ""), rec.get("rpe", ""), rec.get("note", ""), rec.get("review", ""),
         int(rec.get("kcal") or 0), rec.get("muscles", "")))
    wid = cur.lastrowid; c.commit(); c.close(); return wid

def workouts_of(cid, d=None):
    d = d or dtoday().isoformat()
    c = db(); r = c.execute("SELECT id,ts,type,items,duration,rpe,note,review,kcal,muscles FROM workouts WHERE chat_id=? AND d=? ORDER BY ts", (cid, d)).fetchall(); c.close()
    return [{"id": x[0], "ts": x[1], "type": x[2], "items": json.loads(x[3] or "[]"), "duration": x[4],
             "rpe": x[5], "note": x[6], "review": x[7], "kcal": x[8], "muscles": x[9]} for x in r]

def workouts_recent(cid, days=10, limit=8):
    cut = (dtoday() - timedelta(days=days)).isoformat()
    c = db(); r = c.execute("SELECT d,type,items,duration,rpe FROM workouts WHERE chat_id=? AND d>=? ORDER BY ts DESC LIMIT ?", (cid, cut, limit)).fetchall(); c.close()
    return [{"d": x[0], "type": x[1], "items": json.loads(x[2] or "[]"), "duration": x[3], "rpe": x[4]} for x in r]

def workout_del(cid, wid):
    c = db(); c.execute("DELETE FROM workouts WHERE chat_id=? AND id=?", (cid, int(wid))); c.commit(); c.close()

def train_week(cid, offset=0):
    today = datetime.now(TZ).date(); monday = today - timedelta(days=today.weekday()) + timedelta(days=offset * 7)
    dow = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]; out = []
    for i in range(7):
        d = monday + timedelta(days=i); ws = workouts_of(cid, d.isoformat())
        out.append({"d": d.isoformat(), "dow": dow[i], "today": d == today,
                    "type": (ws[0]["type"] if ws else ""), "count": len(ws)})
    return out

def train_profile_get(cid):
    u = row(cid) or {}
    try: return json.loads(u.get("train_profile") or "{}")
    except (TypeError, ValueError): return {}

def train_profile_set(cid, prof):
    upsert(cid, train_profile=json.dumps(prof, ensure_ascii=False))

def diary_totals(cid, d=None):
    ms = meals_of(cid, d)
    return {"kcal": sum(m["kcal"] for m in ms), "protein": round(sum(m["protein"] for m in ms)),
            "fat": round(sum(m["fat"] for m in ms)), "carbs": round(sum(m["carbs"] for m in ms)), "count": len(ms)}

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
                day = int(ml.group(1)); yr = int(ml.group(3)) if ml.group(3) else dtoday().year
                d = date(yr, mon, day)
                if not ml.group(3) and d > dtoday(): d = d.replace(year=d.year - 1)
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
                d = d.replace(year=dtoday().year)
                if d > dtoday(): d = d.replace(year=d.year - 1)
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
        return {"height": u["height"], "weight": u["weight"], "age": u["age"], "activity": u.get("activity") or 2,
                "diet": u.get("diet") or "", "diet_note": u.get("diet_note") or "", "kcal_goal": u.get("kcal_goal")}
    return None
def diet_human(code_csv):
    if not code_csv: return "без ограничений"
    return ", ".join(DIETD.get(x, x) for x in code_csv.split(",") if x) or "без ограничений"
def profile_kcal(p):
    base = calc_calories(p["height"], p["weight"], p["age"], p["activity"])
    try:
        goal = int(p.get("kcal_goal") or 0)
    except (TypeError, ValueError):
        goal = 0
    if 800 <= goal <= 6000:
        kg = p["weight"]; prot = round(1.6 * kg); fat = round(goal * 0.3 / 9)
        carbs = round(max(0, goal - prot * 4 - fat * 9) / 4)
        return (goal, prot, fat, carbs)
    return base

def match_meta(text):
    t = text.lower()
    if any(k in t for k in ("гигачат", "gigachat", "на чём ты работаешь", "на чем ты работаешь", "чём ты работаешь", "чем ты работаешь",
                            "на чем ты сделан", "на чём ты сделан", "из чего ты", "что под капотом", "какой движок", "какая технология", "на какой технологии",
                            "какая модель", "что за модель", "на какой модели", "какая нейросеть", "какой ии", "что за нейросеть", "ты нейросеть",
                            "ты gpt", "ты чат gpt", "chatgpt", "ты openai", "openai", "ты llama", "языковая модель", "ты ллм", "кто тебя сделал", "кто тебя создал")): return "tech"
    if any(k in t for k in ("что такое айва", "что такое aiwa", "расскажи о себе", "расскажи про себя", "расскажи о айв", "расскажи про айв", "расскажи о aiwa", "кто ты", "о тебе", "про себя", "что ты умеешь", "что умеешь", "что ты можешь", "что можешь", "чем можешь помочь", "чем ты помога", "чем занимаешься", "что ты делаешь", "что ты за", "что за бот", "какой ты бот", "представься", "твои возможност", "какие возможност", "какие у тебя функц", "твои функц", "что ты такое", "зачем ты", "для чего ты", "ты кто")): return "about"
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
    if re.search(r"(нагрузк|трениров|какой\s+спорт|каким\s+спортом|позанима|чем\s+(мне\s+)?заня|упражнени|фитнес|какая\s+(сегодня\s+)?активн|как\s+(мне\s+)?двигат|размят|разминк|зарядк|можно\s+ли\s+(мне\s+)?(бегать|качат|присед)|(какую|какая)\s+(мне\s+)?(сегодня\s+)?(трениров|нагрузк)|что\s+по\s+(спорт|трениров|нагрузк))", t): return "training"
    if re.search(r"(?:(?:добав\w*|запиш\w*|занес\w*|отмет\w*)\s+.{0,40}(?:(?:на\s+|в\s+)?(?:завтрак|обед|ужин|полдник|перекус)\b|в\s+дневник|в\s+еду|в\s+приём|съел|поел|скушал|покушал|съела|поела|\bела\b|поем)|(?:залогир\w*|\bлогни\b)\s+\S)", t): return "logmeal"
    if re.search(r"(мой\s+дневник|дневник\s+питани|что\s+(?:мне\s+)?добрать|добрать\s+.{0,12}(белк|калор|бжу)|сколько\s+.{0,12}(съел|калор|ккал)\s*.{0,10}сегодн|мой\s+калораж|хватает\s+ли\s+.{0,12}(белк|калор)|итог\w*\s*.{0,10}(дн|калор|по\s+еде|бжу)|сколько\s+осталось\s+.{0,12}(калор|ккал|съесть))", t): return "diary"
    if re.search(r"(что\s+(?:мне\s+|тебе\s+|лучше\s+|полезн\w*\s+|стоит\s+|сейчас\s+|сегодня\s+|можно\s+|бы\s+|такого\s+|нужно\s+)*(?:есть|поесть|съесть|покушать|скушать|кушать|приготовить|готовить)\b(?!\s*(?:ли\b|у\s+мен|в\s+профил|в\s+приложени|в\s+холодильник|дома|интересн|врем|деньг|дела|презентац|отчёт|доклад))|полезн\w*\s+(?:есть|поесть|кушать|съесть)|(?:поесть|покушать|съесть|скушать|кушать)\s+полезн|что\s+(?:есть|поесть)\s+(?:полезн|при\b|для\s|чтобы|на\s+(?:завтрак|обед|ужин|перекус))|какое\s+питани|какая\s+(?:сегодня\s+)?еда|какие\s+(?:мне\s+)?продукт|какие\s+продукты\s+полезн|меню\s+(?:на\s+)?(?:сегодня|день|завтра)|составь\s+меню|подбери\s+меню|обнови\s+меню|дай\s+меню|покажи\s+меню|пересобер\w*\s+меню|чем\s+(?:мне\s+)?(?:сегодня\s+)?питат|как\s+(?:мне\s+)?(?:лучше\s+)?питат|что\s+по\s+(?:еде|питани)|(?:посоветуй|подскажи|дай|хочу|можешь|порекоменду)\w*\s+.{0,24}(?:поесть|съесть|еду|питани|меню|рацион|продукт|блюд)|\bрацион\b|еда\s+на\s+сегодня|что\s+поедим|проголодал|что\s+на\s+(?:завтрак|обед|ужин|перекус))", t): return "food"
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
    has_cycle = any(w in t for w in ("цикл", "месячн", "менструац", "менстр", "овуляц"))
    if not has_cycle:
        return None
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

def summary_spread_min():
    try:
        return max(1, int(os.environ.get("AIWA_SUMMARY_SPREAD_MIN", "180")))
    except (TypeError, ValueError):
        return 180

def scheduled_hhmm(cid, hhmm):
    h, m = map(int, hhmm.split(":"))
    # дефолтную утреннюю сводку (08:00) размазываем по окну 08:00-11:00; кастомное время — маленький анти-коллизионный джиттер
    window = summary_spread_min() if hhmm == "08:00" else schedule_jitter_min()
    offset = abs(int(cid)) % window if window else 0
    m += offset
    h = (h + m // 60) % 24
    return f"{h:02d}:{m % 60:02d}", offset, window

def schedule_text(cid, hhmm):
    actual, offset, window = scheduled_hhmm(cid, hhmm)
    if hhmm == "08:00":
        return (f"Утреннюю сводку присылаю в интервале 08:00-11:00 (МСК) — у тебя примерно в {actual}.\n\n"
                f"Так нагрузка размазывается по утру и сводки не уходят всем в одну минуту. Точное время можно задать в Меню.")
    if not offset:
        return f"Время сводки: {hhmm} (МСК)."
    return (f"Время сводки: {hhmm} (МСК). Для тебя фактически около {actual}.\n\n"
            f"Разброс до {window - 1} минут нужен, чтобы сводки не уходили всем в одну секунду.")

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
async def begin_onboard(cid, msg, force=False):
    now = time.time()
    # дебаунс только для повторного /start; явный тап по кнопке (force) должен отвечать всегда
    if not force and now - _last_start.get(cid, 0) < 4: return
    _last_start[cid] = now
    if not row(cid): ev(cid, "signup")
    upsert(cid, state=None, pending_date=None)
    await msg.reply_text(START_TEXT, reply_markup=ONB_KB)

async def send_infographic(bot, cid):
    if not IMG: return
    u, st = status_of(cid)
    if not st: return
    try:
        png = await asyncio.to_thread(IMG.render_cycle, date.fromisoformat(u["last_period"]), u["cycle_len"], dtoday())
        bio = io.BytesIO(png); bio.name = "cycle.png"
        await bot.send_photo(cid, photo=bio, caption=f"AIWA · {st['subphase']} {st['phase_ru'].lower()}, день {st['day']}. Месячные через ~{st['days_to_next']} дн.")
    except Exception as e: log.warning("infographic: %s", e)

async def send_training_card(context, cid, st):
    if not IMG: return
    await context.bot.send_chat_action(cid, "upload_photo")
    try:
        bio = io.BytesIO(await asyncio.to_thread(IMG.render_training, st)); bio.name = "training.png"
        await context.bot.send_photo(cid, photo=bio)
    except Exception as e:
        log.warning("training img: %s", e)

_MENU_CACHE = {}
def _menu_key(cid, st, prof, mode):
    diet = ((prof.get("diet") if prof else "") or "", (prof.get("diet_note") if prof else "") or "")
    phase = (st.get("phase") if st else ("mode:" + str(mode)))
    return (cid, dtoday().isoformat(), phase, diet)
def menu_cached(cid, st, prof, target, mode=None, usage=None):
    """Дневной кэш меню: обращаемся к модели максимум раз в день на юзера, дальше — мгновенно."""
    key = _menu_key(cid, st, prof, mode)
    hit = _MENU_CACHE.get(key)
    if hit is not None:
        return hit
    if st is not None:
        m = L.menu_today(st, profile=prof, target=target, usage=usage)
    else:
        m = L.general_menu(prof, mode, target, usage=usage)
    _MENU_CACHE[key] = m
    _prune_day(_MENU_CACHE)
    return m
def menu_cache_clear(cid):
    for k in [k for k in list(_MENU_CACHE) if k[0] == cid]:
        _MENU_CACHE.pop(k, None)

_SUM_CACHE = {}
def _prune_day(cache):
    today = dtoday().isoformat()
    if len(cache) > 1500:
        for k in [k for k in list(cache) if k[1] != today]:
            cache.pop(k, None)

async def send_menu(context, cid, with_image=False):
    u, st = status_of(cid)
    if not st: return None
    if with_image:
        await context.bot.send_chat_action(cid, "upload_photo")
    prof = profile_of(u); target = profile_kcal(prof) if prof else None
    usage = []; mdata = await asyncio.to_thread(menu_cached, cid, st, prof, target, None, usage)
    if usage: ev(cid, "tokens", sum(usage), meta="menu", calls=len(usage))
    if target:
        mdata["macros"] = {"protein": f"{target[1]} г", "fat": f"{target[2]} г", "carbs": f"{target[3]} г"}
    note = st["content"]["food"]
    if not with_image:
        return mdata, target
    try:
        bio = io.BytesIO(await asyncio.to_thread(IMG.render_menu, mdata, st["phase_ru"], target_kcal=(target[0] if target else None))); bio.name = "menu.png"
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
            bio = io.BytesIO(await asyncio.to_thread(IMG.render_delay, st)); bio.name = "delay.png"; await context.bot.send_photo(cid, photo=bio)
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
    ev(cid, "tokens", sum(usage), meta="answer", calls=len(usage))

async def push_general(context, cid):
    u = row(cid); usage = []; _ds = dtoday().isoformat()
    _key = (cid, _ds, "mode:" + str(u.get("mode")), str(log_get(cid, _ds) or ""))
    body = _SUM_CACHE.get(_key)
    if body is None:
        body = await asyncio.to_thread(L.general_summary, profile_of(u), u.get("mode"), hint=chat_hint(cid), usage=usage)
        if body: _prune_day(_SUM_CACHE); _SUM_CACHE[_key] = body
    if not body:
        body = "💛 Сводка на сегодня. Отметь самочувствие через Симптомы, и я подскажу, на что обратить внимание."
    clean, extra = L.split_followups(body)
    kb = sugg_kb(cid, merge_summary_suggestions(u, None, extra), app_user=u, app_label=APP_BUTTON_TEXT)
    await context.bot.send_message(cid, html.escape(clean) + "\n\n" + APP_CTA_HTML,
        reply_markup=kb, parse_mode="HTML")
    if usage: ev(cid, "tokens", sum(usage), meta="summary", calls=len(usage))
    ev(cid, "goal", meta="summary")

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
        log_ensure(cid, dtoday().isoformat())
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
        end = (parse_date(mdt.group(0)) if mdt else None) or dtoday()
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
    if intent == "logmeal":
        await context.bot.send_chat_action(cid, "typing")
        return await msg.reply_text(await log_food_from_text(cid, u, txt))
    if intent == "diary":
        await context.bot.send_chat_action(cid, "typing"); usage = []
        t = await answer_diary(cid, usage); ev(cid, "tokens", sum(usage), meta="diary_reco", calls=len(usage))
        return await msg.reply_text(t)
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
    usage = []; _ds = dtoday().isoformat()
    _key = (cid, _ds, st.get("phase"), str(log_get(cid, _ds) or ""))
    body = _SUM_CACHE.get(_key)
    if body is None:
        body = await asyncio.to_thread(L.generate_summary, st, u["modules"], hint=chat_hint(cid), usage=usage)
        if body: _prune_day(_SUM_CACHE); _SUM_CACHE[_key] = body
    if not body:
        body = "💛 Сводка на сегодня готова. Открой приложение, чтобы посмотреть календарь, симптомы, питание и нагрузку."
    clean, extra = L.split_followups(body)
    kb = sugg_kb(cid, merge_summary_suggestions(u, st, extra), app_user=u, app_label=APP_BUTTON_TEXT)
    await context.bot.send_message(cid, html.escape(clean) + "\n\n" + APP_CTA_HTML,
        reply_markup=kb, parse_mode="HTML")
    if usage: ev(cid, "tokens", sum(usage), meta="summary", calls=len(usage))
    ev(cid, "goal", meta="summary")

async def push_checkin(context, cid):
    """После утренней сводки — быстрый чек-ин. Переиспользует существующий поток ci:* (энергия→настроение→симптомы)."""
    try:
        u = row(cid)
        if not is_onboarded(u): return
        log_ensure(cid, dtoday().isoformat())
        await context.bot.send_message(cid,
            "Как ты сегодня? Отметь за 10 секунд — подстрою совет дня под твоё реальное состояние.\n\nКакая энергия?",
            reply_markup=en_kb("e"))
        ev(cid, "broadcast", meta="checkin_push")
    except Exception as e:
        log.warning("checkin push %s: %s", cid, e)

# ================= Проактивный движок =================
PROACTIVE_MIN = int(os.environ.get("AIWA_PROACTIVE_MIN", "40"))
def _proactive_enabled():
    return os.environ.get("AIWA_PROACTIVE", "0") in ("1", "true", "True", "yes", "on")
def _proactive_on(cid):
    if not _proactive_enabled():
        return False
    raw = (os.environ.get("AIWA_PROACTIVE_IDS", "") or "").strip()
    if not raw or raw.lower() == "all":
        return True  # по умолчанию — все пользователи
    ids = set(x.strip() for x in raw.split(",") if x.strip())
    if AIWA_ADMIN:
        ids.add(str(AIWA_ADMIN))
    return str(cid) in ids
def _pa_recent(cid, key, days):
    try:
        c = db(); r = c.execute("SELECT last_ts FROM proactive_state WHERE chat_id=? AND signal=?", (cid, key)).fetchone(); c.close()
        if not r or not r[0]:
            return False
        return (dtoday() - date.fromisoformat(r[0][:10])).days < max(1, int(days))
    except Exception:
        return False
def _pa_mark(cid, key):
    try:
        c = db(); c.execute("INSERT OR REPLACE INTO proactive_state(chat_id,signal,last_ts) VALUES(?,?,?)",
                            (cid, key, datetime.now(TZ).isoformat())); c.commit(); c.close()
    except Exception as e:
        log.warning("pa_mark: %s", e)
def _pa_logged_today(cid):
    try:
        c = db(); r = c.execute("SELECT COUNT(*) FROM proactive_log WHERE chat_id=? AND ts>=?",
                               (cid, dtoday().isoformat())).fetchone(); c.close()
        return bool(r and r[0])
    except Exception:
        return False
def _pa_logrow(cid, key, score, sent, text):
    try:
        c = db(); c.execute("INSERT INTO proactive_log(chat_id,ts,signal,score,sent,text) VALUES(?,?,?,?,?,?)",
                            (cid, datetime.now(TZ).isoformat(), key, int(score), int(sent), text or "")); c.commit(); c.close()
    except Exception as e:
        log.warning("pa_logrow: %s", e)

# ---------- долгая память (living profile) ----------
MEM_MAX = 40
def mem_all(cid):
    try:
        c = db(); rows = c.execute("SELECT mkey, mval, updated FROM memory WHERE chat_id=? ORDER BY updated DESC", (cid,)).fetchall(); c.close()
        return [{"key": r[0], "value": r[1], "updated": r[2]} for r in rows]
    except Exception:
        return []
def mem_set(cid, key, val):
    key = (key or "").strip().lower()[:48]; val = (val or "").strip()[:220]
    if not key or not val:
        return False
    try:
        c = db()
        c.execute("INSERT OR REPLACE INTO memory(chat_id, mkey, mval, updated) VALUES(?,?,?,?)",
                  (cid, key, val, datetime.now(TZ).isoformat()))
        c.execute("DELETE FROM memory WHERE chat_id=? AND mkey NOT IN (SELECT mkey FROM memory WHERE chat_id=? ORDER BY updated DESC LIMIT ?)",
                  (cid, cid, MEM_MAX))
        c.commit(); c.close(); return True
    except Exception as e:
        log.warning("mem_set: %s", e); return False
def mem_delete(cid, key):
    try:
        c = db(); c.execute("DELETE FROM memory WHERE chat_id=? AND mkey=?", (cid, (key or "").strip().lower())); c.commit(); c.close(); return True
    except Exception:
        return False
def mem_text(cid, limit=16):
    rows = mem_all(cid)[:limit]
    if not rows:
        return ""
    return "; ".join((r["key"] + ": " + r["value"]) for r in rows)
def _with_memory(cid, q):
    mt = mem_text(cid)
    if mt:
        return q + "\n\nЧто ты уже знаешь о ней из прошлых разговоров (долгая память) — учитывай, но не перечисляй вслух без надобности: " + mt
    return q

def _ref_touch(cid, src):
    """Первое касание источника перехода (deep-link ?start=<source>)."""
    try:
        c = db(); c.execute("INSERT OR IGNORE INTO referrals(chat_id, source, ts) VALUES(?,?,?)",
                            (cid, src, datetime.now(TZ).isoformat())); c.commit(); c.close()
    except Exception as e:
        log.warning("ref_touch: %s", e)

def _proactive_signals(cid, slot="eve"):
    out = []
    try:
        u = row(cid); _, st = status_of(cid); today = dtoday()
        tlog = log_get(cid, today.isoformat()) or {}
        ylog = log_get(cid, (today - timedelta(days=1)).isoformat()) or {}
        badY = (ylog.get("energy") == 1) or (ylog.get("mood") == 1) or any(x in (ylog.get("symptoms") or []) for x in ("anx", "low", "tired", "irrit"))
        checkedToday = bool(tlog.get("energy") or tlog.get("mood") or (tlog.get("symptoms")))
        if badY and not checkedToday:
            out.append({"key": "felt_bad", "score": 78, "cooldown": 2,
                        "topic": "вчера ей было тяжело (низкая энергия/настроение или тревожные симптомы) — мягко спроси, как она сегодня, и предложи поддержку",
                        "data": "вчера энергия=%s, настроение=%s, симптомы=%s" % (ylog.get("energy"), ylog.get("mood"), ",".join(ylog.get("symptoms") or []))})
        if st and st.get("days_to_next") in (2, 3, 4) and (u.get("mode") in (None, "cycle")):
            out.append({"key": "pms_soon", "score": 66, "cooldown": 18,
                        "topic": "через %s дня ожидаются месячные, приближается ПМС — тёплое предупреждение и что поможет" % st.get("days_to_next"),
                        "data": "фаза %s, до месячных %s дн" % (st.get("phase_ru"), st.get("days_to_next"))})
        logs = logs_of(cid, (today - timedelta(days=4)).isoformat()) or []
        lowe = [l for l in logs if l.get("energy") == 1]
        if len(lowe) >= 2:
            out.append({"key": "low_energy", "score": 70, "cooldown": 3,
                        "topic": "несколько дней подряд низкая энергия — поддержи и мягко предложи разгрузку или дыхательную практику",
                        "data": "низкая энергия в %s из последних дней" % len(lowe)})
        rw = workouts_recent(cid, days=12, limit=3) or []
        if rw:
            try:
                gap = (today - date.fromisoformat(rw[0].get("d"))).days
            except Exception:
                gap = 99
            if gap >= 5:
                out.append({"key": "no_move", "score": 46, "cooldown": 4,
                            "topic": "давно не было тренировки (%s дн) — мягко пригласи подвигаться под её фазу" % gap,
                            "data": "последняя тренировка %s дней назад, фаза %s" % (gap, (st or {}).get("phase_ru"))})
        try:
            streak = streak_of(cid)
        except Exception:
            streak = 0
        if streak in (3, 7, 14, 30):
            out.append({"key": "streak_%s" % streak, "score": 56, "cooldown": 1,
                        "topic": "коротко и по-взрослому отметь, что она %s дней подряд ведёт отметки, и спокойно предложи продолжить — без слащавости, без фраз вроде порадуй себя" % streak,
                        "data": "стрик %s дней" % streak})
        if slot == "eve":
            try:
                dp = diary_payload(cid); tot = dp.get("totals") or {}; tgt = dp.get("target") or {}
                if tgt.get("protein") and (tot.get("protein") is not None) and tot["protein"] < 0.5 * tgt["protein"]:
                    out.append({"key": "low_protein", "score": 40, "cooldown": 3,
                                "topic": "сегодня мало белка к вечеру — подскажи добавить белок к ужину",
                                "data": "белок %s из %s г" % (round(tot.get("protein", 0)), round(tgt.get("protein", 0)))})
            except Exception:
                pass
    except Exception as e:
        log.warning("proactive_signals: %s", e)
    return out

_PA_TAB = {"no_move": "train", "low_protein": "food"}
_PA_ACTION = {"no_move": ("Да, собери тренировку", "train"),
              "low_protein": ("Что съесть на ужин?", "food")}
def _pa_deeplink(wu, key):
    tab = _PA_TAB.get(key)
    if not wu or not tab:
        return wu
    sep = "&" if "?" in wu else "?"
    return wu + sep + "tab=" + tab

async def _proactive_pick_and_send(cid, slot, shadow, context):
    u = row(cid)
    if not is_onboarded(u):
        return None
    if _pa_logged_today(cid):
        return None
    cands = [c for c in _proactive_signals(cid, slot) if not _pa_recent(cid, c["key"], c.get("cooldown", 2))]
    cands = [c for c in cands if c["score"] >= PROACTIVE_MIN]
    if not cands:
        return None
    best = max(cands, key=lambda x: x["score"])
    _u = []
    text = await asyncio.to_thread(L.proactive_compose, best["topic"], best.get("data", ""), _u)
    if _u:
        ev(cid, "tokens", sum(_u), meta="proactive_compose", calls=len(_u))
    text = (text or "").strip()
    if not text:
        return None
    if shadow:
        _pa_mark(cid, best["key"]); _pa_logrow(cid, best["key"], best["score"], 0, text)
        ev(cid, "proactive", meta="shadow:" + best["key"])
    else:
        wu = webapp_url(u) or AIWA_WEBAPP_URL
        wu = _pa_deeplink(wu, best["key"])
        rows = []
        _act = _PA_ACTION.get(best["key"])
        if _act:
            rows.append([InlineKeyboardButton(_act[0], callback_data="pado:" + _act[1])])
        if wu:
            rows.append([InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=wu))])
        kb = InlineKeyboardMarkup(rows) if rows else None
        await context.bot.send_message(cid, text, reply_markup=kb)
        _pa_mark(cid, best["key"]); _pa_logrow(cid, best["key"], best["score"], 1, text)
        ev(cid, "broadcast", meta="proactive:" + best["key"])
    return (best["key"], best["score"], text)

async def proactive_job(context, slot):
    if not _proactive_enabled():
        return
    shadow = os.environ.get("AIWA_PROACTIVE_SHADOW", "1") not in ("0", "false", "False", "no", "off")
    delay = float(os.environ.get("AIWA_PROACTIVE_DELAY", "0.3"))
    n = 0
    for cid in all_users():
        try:
            if not _proactive_on(cid):
                continue
            r = await _proactive_pick_and_send(cid, slot, shadow, context)
            if r:
                n += 1
                await asyncio.sleep(delay)
        except Forbidden:
            pass
        except Exception as e:
            log.warning("proactive_job(%s): %s", slot, e)
    log.info("proactive %s: %s (%s)", slot, n, "shadow" if shadow else "sent")

async def proactive_job_mid(context):
    await proactive_job(context, "mid")
async def proactive_job_eve(context):
    await proactive_job(context, "eve")

async def _proactive_preview(compose_limit=4, scan_limit=500):
    rows = []; composed = 0; scanned = 0
    for cid in all_users():
        if scanned >= scan_limit:
            break
        scanned += 1
        try:
            u = row(cid)
            if not is_onboarded(u):
                continue
            cands = [c for c in _proactive_signals(cid, "eve") if c["score"] >= PROACTIVE_MIN]
            if not cands:
                continue
            best = max(cands, key=lambda x: x["score"])
            text = ""
            if composed < compose_limit:
                _u = []
                try:
                    text = await asyncio.to_thread(L.proactive_compose, best["topic"], best.get("data", ""), _u)
                except Exception:
                    text = ""
                composed += 1
                if _u: ev(cid, "tokens", sum(_u), meta="proactive_preview", calls=len(_u))
            rows.append((cid, best["key"], best["score"], (text or "").strip()))
        except Exception as e:
            log.warning("proactive_preview: %s", e)
    return rows

async def proactive_cmd(update, context):
    cid = update.effective_chat.id
    if not AIWA_ADMIN or str(cid) != str(AIWA_ADMIN):
        return await update.message.reply_text("Команда только для админа.")
    try:
        await update.message.reply_text("Считаю дай-ран проактива по реальным данным… (несколько примеров с текстом, остальное — сигналами)")
        rows = await _proactive_preview()
        if not rows:
            return await update.message.reply_text("Сегодня ни одного проактивного сообщения не сработало бы (сигналов выше порога %s нет)." % PROACTIVE_MIN)
        blocks = []
        for r in rows[:25]:
            line = "• user %s · %s (%s)" % (r[0], r[1], r[2])
            if r[3]:
                line += "\n" + r[3][:400]
            blocks.append(line)
        msg = ("Проактив — дай-ран (порог %s). Сработало бы у %s:\n\n" % (PROACTIVE_MIN, len(rows))) + "\n\n".join(blocks)
        for i in range(0, len(msg), 3500):
            await update.message.reply_text(msg[i:i + 3500])
        await update.message.reply_text("Живая отправка: AIWA_PROACTIVE=%s, SHADOW=%s. Реальную отправку включает AIWA_PROACTIVE=1 + AIWA_PROACTIVE_SHADOW=0." % (
            os.environ.get("AIWA_PROACTIVE", "0"), os.environ.get("AIWA_PROACTIVE_SHADOW", "1")))
    except Exception as e:
        log.warning("proactive_cmd: %s", e)
        try:
            await update.message.reply_text("Дай-ран упал с ошибкой: %s" % e)
        except Exception:
            pass

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
    except Forbidden:
        ev(cid, "broadcast", meta="blocked")
        try:
            for j in context.application.job_queue.get_jobs_by_name(str(cid)): j.schedule_removal()
        except Exception: pass
    except Exception as e:
        ev(cid, "broadcast", meta="error")
        raise

async def broadcast_worker(app):
    """Один из нескольких параллельных воркеров рассылки. Реальный лимит GigaChat держит семафор в llm._call, поэтому большая пауза не нужна."""
    delay = float(os.environ.get("AIWA_BROADCAST_DELAY", "0.3"))
    while True:
        cid = await BCAST_Q.get()
        try:
            ctx = _BCtx(app)
            await push_summary(ctx, cid)
            await push_partner(ctx, cid)
            await push_checkin(ctx, cid)
            ev(cid, "broadcast", meta="sent")
        except Forbidden:
            try:
                ev(cid, "broadcast", meta="blocked")
                for j in app.job_queue.get_jobs_by_name(str(cid)): j.schedule_removal()
            except Exception: pass
            log.info("broadcast %s: заблокирован пользователем, снял с рассылки", cid)
        except Exception as e:
            try: ev(cid, "broadcast", meta="error")
            except Exception: pass
            log.warning("broadcast %s: %s", cid, e)
        finally:
            BCAST_PENDING.discard(cid)
            BCAST_Q.task_done()
        await asyncio.sleep(delay)

def _phase_of(cid):
    try:
        _, st = status_of(cid); return (st or {}).get("phase")
    except Exception:
        return None

def food_reminder_text(cid):
    base = "🍽 Не забудь отметить обед. Пришли фото тарелки, напиши текстом или добавь вручную — Айва посчитает КБЖУ."
    tip = {"menstrual": "Сейчас менструация — добавь железо: гречка, красное мясо, зелень, гранат.",
           "follicular": "Ты в фолликулярной фазе — упор на белок и овощи, углеводы усваиваются хорошо.",
           "ovulation": "Овуляция — лёгкая клетчатка, белок и побольше воды.",
           "luteal": "Лютеиновая фаза — магний и белок помогут с тягой к сладкому и сытостью."}.get(_phase_of(cid))
    return base + (("\n\n" + tip) if tip else "")

def train_reminder_text(cid):
    base = "🏋️ Ещё не отмечала тренировку сегодня? Даже 20 минут считается. Отметь — Айва разберёт нагрузку и подскажет следующую."
    tip = {"menstrual": "Сейчас менструация — подойдёт лёгкое: ходьба, растяжка, мягкая йога.",
           "follicular": "Фолликулярная фаза — хорошее окно для силовой или интенсива.",
           "ovulation": "Овуляция — сил много, но береги связки.",
           "luteal": "Лютеиновая фаза — спокойное кардио или зона 2, без рекордов."}.get(_phase_of(cid))
    return base + (("\n\n" + tip) if tip else "")

async def push_food_reminder(context, cid):
    u = row(cid)
    if not is_onboarded(u): return
    if meals_of(cid, dtoday().isoformat()): return   # уже отметила еду сегодня — не дёргаем
    wu = webapp_url(u) or AIWA_WEBAPP_URL
    kb = InlineKeyboardMarkup([[InlineKeyboardButton("🍎 Отметить еду", web_app=WebAppInfo(url=wu))]]) if wu else None
    await context.bot.send_message(cid, food_reminder_text(cid), reply_markup=kb)
    ev(cid, "broadcast", meta="food_reminder_sent")

async def push_train_reminder(context, cid):
    u = row(cid)
    if not is_onboarded(u): return
    if workouts_of(cid, dtoday().isoformat()): return   # уже отметила тренировку — не дёргаем
    wu = webapp_url(u) or AIWA_WEBAPP_URL
    kb = InlineKeyboardMarkup([[InlineKeyboardButton("🏋️ Отметить тренировку", web_app=WebAppInfo(url=wu))]]) if wu else None
    await context.bot.send_message(cid, train_reminder_text(cid), reply_markup=kb)
    ev(cid, "broadcast", meta="train_reminder_sent")

async def train_worker(app):
    delay = float(os.environ.get("AIWA_TRAIN_DELAY", "0.3"))
    while True:
        cid = await TRAIN_Q.get()
        try:
            await push_train_reminder(_BCtx(app), cid)
        except Forbidden:
            log.info("train reminder %s: заблокирован", cid)
        except Exception as e:
            log.warning("train reminder %s: %s", cid, e)
        finally:
            TRAIN_PENDING.discard(cid)
            TRAIN_Q.task_done()
        await asyncio.sleep(delay)

async def train_reminder_job(context: ContextTypes.DEFAULT_TYPE):
    if TRAIN_Q is None: return
    n = 0
    for cid in all_users():
        if cid in TRAIN_PENDING: continue
        TRAIN_PENDING.add(cid); await TRAIN_Q.put(cid); n += 1
    log.info("train reminder queued: %d", n)

def streak_of(cid):
    """Дней подряд с активностью (еда, тренировка или чек-ин), заканчивая сегодня или вчера."""
    c = db(); days = set()
    for tbl in ("meals", "workouts"):
        for (d,) in c.execute(f"SELECT DISTINCT d FROM {tbl} WHERE chat_id=?", (cid,)):
            if d: days.add(d)
    for (d,) in c.execute("SELECT DISTINCT log_date FROM logs WHERE chat_id=? AND (energy IS NOT NULL OR (symptoms IS NOT NULL AND symptoms<>''))", (cid,)):
        if d: days.add(d)
    c.close()
    today = datetime.now(TZ).date()
    if today.isoformat() in days:
        cur = today
    elif (today - timedelta(days=1)).isoformat() in days:
        cur = today - timedelta(days=1)
    else:
        return 0
    n = 0
    while cur.isoformat() in days:
        n += 1; cur = cur - timedelta(days=1)
    return n

PHASE_INTRO = {
    "menstrual": "🌙 Началась менструация. Гормоны сейчас низко — тело просит поберечься: добавь железо (гречка, красное мясо, зелень), тепло и мягкое движение. Резкие тренировки лучше отложить.",
    "follicular": "🌱 Ты вошла в фолликулярную фазу. Эстроген растёт, энергии больше — хорошее окно для силовых и новых начинаний, тело лучше восстанавливается.",
    "ovulation": "☀️ Овуляция — пик энергии и сил. Можно самые интенсивные тренировки, но береги связки. Настроение и либидо обычно на высоте.",
    "luteal": "🌾 Началась лютеиновая фаза. Растёт прогестерон — может тянуть на еду и быстрее приходить усталость. Помогут спокойное кардио, магний и белок.",
}

async def phase_transition_job(context: ContextTypes.DEFAULT_TYPE):
    """Пуш при входе в новую фазу цикла. На первом расчёте только запоминаем фазу, без пуша."""
    delay = float(os.environ.get("AIWA_PHASE_DELAY", "0.3"))
    sent = 0
    for cid in all_users():
        try:
            u = row(cid)
            if not is_onboarded(u) or (u.get("mode") or "cycle") != "cycle":
                continue
            _, st = status_of(cid); phase = (st or {}).get("phase")
            if not phase or u.get("last_phase_notified") == phase:
                continue
            first = u.get("last_phase_notified") is None
            upsert(cid, last_phase_notified=phase)
            if first:
                continue
            txt = PHASE_INTRO.get(phase)
            if not txt:
                continue
            wu = webapp_url(u) or AIWA_WEBAPP_URL
            kb = InlineKeyboardMarkup([[InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=wu))]]) if wu else None
            await context.bot.send_message(cid, txt, reply_markup=kb)
            ev(cid, "broadcast", meta="phase_push"); sent += 1
            await asyncio.sleep(delay)
        except Forbidden:
            pass
        except Exception as e:
            log.warning("phase push %s: %s", cid, e)
    log.info("phase transition pushes: %d", sent)

async def reactivation_job(context: ContextTypes.DEFAULT_TYPE):
    """Возврат неактивных: если не заходила N дней и давно не слали возврат — тёплый персональный пуш."""
    delay = float(os.environ.get("AIWA_REACT_DELAY", "0.3"))
    ndays = max(2, int(os.environ.get("AIWA_INACTIVE_DAYS", "5")))
    today = datetime.now(TZ).date(); sent = 0
    for cid in all_users():
        try:
            u = row(cid)
            if not is_onboarded(u):
                continue
            c = db(); r = c.execute("SELECT MAX(ts) FROM events WHERE chat_id=? AND action IN ('manual','button','suggest','command','answered','voice','goal')", (cid,)).fetchone(); c.close()
            if not r or not r[0]:
                continue
            last = datetime.fromisoformat(r[0]).date()
            if (today - last).days < ndays:
                continue
            lr = u.get("last_reactivation")
            if lr:
                try:
                    if (today - date.fromisoformat(lr)).days < 7:
                        continue
                except Exception:
                    pass
            upsert(cid, last_reactivation=today.isoformat())
            _, st = status_of(cid); phase = (st or {}).get("phase")
            tip = {"menstrual": "Сейчас у тебя менструация — поберегись и добавь железо.",
                   "follicular": "Ты в фолликулярной фазе — энергии больше обычного.",
                   "ovulation": "У тебя овуляция — пик сил.",
                   "luteal": "Ты в лютеиновой фазе — самое время на спокойный режим и белок."}.get(phase, "")
            wu = webapp_url(u) or AIWA_WEBAPP_URL
            kb = InlineKeyboardMarkup([[InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=wu))]]) if wu else None
            txt = "🌸 Давно не виделись. " + (tip + " " if tip else "") + "Загляни — я собрала твою сводку и рекомендации на сегодня."
            await context.bot.send_message(cid, txt, reply_markup=kb)
            ev(cid, "broadcast", meta="reactivation_sent"); sent += 1
            await asyncio.sleep(delay)
        except Forbidden:
            pass
        except Exception as e:
            log.warning("reactivation %s: %s", cid, e)
    log.info("reactivation pushes: %d", sent)

async def food_worker(app):
    delay = float(os.environ.get("AIWA_FOOD_DELAY", "0.3"))
    while True:
        cid = await FOOD_Q.get()
        try:
            await push_food_reminder(_BCtx(app), cid)
        except Forbidden:
            log.info("food reminder %s: заблокирован", cid)
        except Exception as e:
            log.warning("food reminder %s: %s", cid, e)
        finally:
            FOOD_PENDING.discard(cid)
            FOOD_Q.task_done()
        await asyncio.sleep(delay)

async def food_reminder_job(context: ContextTypes.DEFAULT_TYPE):
    """Глобальный джоб в обед: ставит в очередь пуш про еду всем, кто ещё не отметил сегодня."""
    if FOOD_Q is None: return
    n = 0
    for cid in all_users():
        if cid in FOOD_PENDING: continue
        FOOD_PENDING.add(cid); await FOOD_Q.put(cid); n += 1
    log.info("food reminder queued: %d", n)

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
    text = None; _pu = []
    try: text = await asyncio.to_thread(L.partner_brief, st, hint, _pu)
    except Exception as e: log.warning("partner_brief: %s", e)
    if _pu: ev(woman_cid, "tokens", sum(_pu), meta="partner_brief", calls=len(_pu))
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
    if context.args and context.args[0] and not context.args[0].startswith("p_"):
        _src = re.sub(r"[^a-z0-9_]", "", (context.args[0] or "").lower())[:32]
        if _src:
            _ref_touch(cid, _src); ev(cid, "ref", meta="src:" + _src)
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
    log_ensure(cid, dtoday().isoformat())
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
    """Выжимка /stats из analytics_data: 4 блока, явный период, WoW, источники."""
    A = analytics_data(days=7)
    a = A["audience"]; e = A["engagement"]; pr = A["product"]; qd = A["quality"]
    g = A.get("growth", {}); ts = A.get("toolcalls_by_source", {})
    def rr(x): return "-" if x is None else (str(x) + "%")
    def wow(x): return "" if x is None else (" · WoW " + ("+" if x >= 0 else "") + str(x) + "%")
    L = []
    L.append("Аналитика AIWA · за 7 дней (" + A["since"] + " -> " + A["until"] + ")")
    L.append("")
    L.append("АУДИТОРИЯ")
    L.append("Средний DAU " + str(a["avg_dau"]) + wow(g.get("avg_dau")) + " · сегодня " + str(a["dau"]) + " (день идёт)")
    L.append("WAU " + str(a["wau"]) + " · MAU " + str(a["mau"]) + " · Stickiness " + str(a["stickiness"]) + "% (DAU/MAU)")
    ret = a["retention"]
    L.append("Rolling retention D1/7/30: " + rr(ret["roll_d1"]) + "/" + rr(ret["roll_d7"]) + "/" + rr(ret["roll_d30"]))
    L.append("Всего " + str(a["users_total"]) + ", новых за период " + str(a["new_users"]) + ", партнёров " + str(a["partners"]["connected"]))
    L.append("Сегменты (активных): " + (", ".join(str(sg["mode"]) + " " + str(sg["active"]) for sg in a["segments"]) or "нет"))
    L.append("")
    L.append("ВОВЛЕЧЁННОСТЬ")
    L.append("Событий на DAU: " + str(e["events_per_dau"]) + " = " + str(e["events_total"]) + " событий / " + str(e["active_user_days"]) + " активных·дней" + wow(g.get("events")))
    L.append("События по источнику: приложение " + str(e["by_source"]["app"]) + ", чат " + str(e["by_source"]["chat"]))
    L.append("Тул-коллов " + str(e["toolcalls_total"]) + " (на DAU " + str(e["toolcalls_per_dau"]) + ") · прил " + str(ts.get("app", 0)) + ", чат " + str(ts.get("chat", 0)) + ", авто " + str(ts.get("auto", 0)) + wow(g.get("toolcalls")))
    L.append("Топ действий: " + (", ".join(str(k) + " " + str(vv) for k, vv in e["actions_top"][:6]) or "нет"))
    ss = e["sessions"]
    L.append("Сессии за период: всего " + str(ss["count"]) + ", на DAU " + str(ss["per_dau"]) + ", длина " + str(ss["avg_len_min"]) + " мин, действий/сессия " + str(ss["events_per"]))
    L.append("")
    L.append("ПРОДУКТ")
    po = pr["push_open"]
    L.append("Пуш->открытие: " + str(po["rate"]) + "% (" + str(po["opened"]) + " из " + str(po["sent"]) + ")")
    _bc = sorted(pr["broadcasts"].items(), key=lambda x: -x[1])[:6]
    L.append("Рассылки: " + (", ".join(str(k) + " " + str(vv) for k, vv in _bc) or "нет"))
    f = pr["funnel"]
    L.append("Воронка: новые " + str(f["new_users"]) + " -> активны " + str(f["onboarded"]) + " -> сводка " + str(f["got_summary"]) + " -> еда " + str(f["logged_food"]) + " -> тренировка " + str(f["logged_workout"]))
    L.append("")
    L.append("КАЧЕСТВО")
    L.append("Успешность " + str(qd["success_rate"]) + "% = " + str(qd["answered"]) + " / (" + str(qd["answered"]) + "+" + str(qd["fallback"]) + "+" + str(qd["errors"]) + ")")
    L.append("Фолбэки " + str(qd["fallback_rate"]) + "%, ошибки " + str(qd["error_rate"]) + "%")
    L.append("Латентность p50 " + str(qd["p50"]) + " / p95 " + str(qd["p95"]) + " мс")
    L.append("Токены " + str(qd["tokens"]) + ", оценка $" + str(qd["cost_usd"]))
    return "\n".join(L)

async def refs_cmd(update, context):
    cid = update.effective_chat.id
    if not AIWA_ADMIN or str(cid) != str(AIWA_ADMIN):
        return await update.message.reply_text("Команда только для админа.")
    try:
        c = db(); rows = c.execute("SELECT source, chat_id FROM referrals").fetchall(); c.close()
    except Exception:
        rows = []
    from collections import defaultdict
    agg = defaultdict(lambda: [0, 0])
    for src, ccid in rows:
        agg[src][0] += 1
        if is_onboarded(row(ccid)): agg[src][1] += 1
    if not agg:
        return await update.message.reply_text(
            "Пока нет переходов по ссылкам с меткой.\nРаздавай ссылку вида:\nhttps://t.me/" + (BOT_USERNAME or "<bot>") + "?start=ИСТОЧНИК")
    lines = ["Переходы по меткам (перешли \u2192 настроили Айву):", ""]
    tot_all = 0; onb_all = 0
    for src, (tot, onb) in sorted(agg.items(), key=lambda x: -x[1][0]):
        tot_all += tot; onb_all += onb
        cr = (str(round(onb * 100 / tot)) + "%") if tot else "0%"
        lines.append("\u2022 " + src + ": " + str(tot) + " \u2192 " + str(onb) + " (" + cr + ")")
    lines.append("")
    lines.append("Итого: " + str(tot_all) + " \u2192 " + str(onb_all))
    await update.message.reply_text("\n".join(lines))

async def stats_cmd(update, context):
    cid = update.effective_chat.id
    if not AIWA_ADMIN:
        return await update.message.reply_text(f"Статистика закрыта. Твой chat id: {cid}. Задай в Railway переменную AIWA_ADMIN={cid}, и команда станет доступна только тебе.")
    if str(cid) != str(AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    _txt = await asyncio.to_thread(aggregate_stats)
    await update.message.reply_text(_txt)

async def probe_cmd(update, context):
    cid = update.effective_chat.id
    if not AIWA_ADMIN or str(cid) != str(AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    try:
        n = int(context.args[0]) if getattr(context, "args", None) else 10
    except (ValueError, IndexError):
        n = 10
    n = max(1, min(200, n))
    await update.message.reply_text(f"Запускаю {n} по-настоящему параллельных вызовов к модели в обход внутреннего лимита, меряю реальную параллельность тарифа...")
    import concurrent.futures as _cf
    t0 = time.time()
    loop = asyncio.get_running_loop()
    pool = _cf.ThreadPoolExecutor(max_workers=n)
    try:
        results = await asyncio.gather(*[loop.run_in_executor(pool, L.probe_once) for _ in range(n)])
    finally:
        pool.shutdown(wait=False)
    dt = int((time.time() - t0) * 1000)
    ok = sum(1 for r in results if r[0])
    fail = n - ok
    lats = sorted(r[1] for r in results)
    p50 = lats[len(lats) // 2]
    p95 = lats[min(len(lats) - 1, int(len(lats) * 0.95))]
    verdict = ("Все прошли - тариф держит такую параллельность."
               if fail == 0 else
               f"{fail} из {n} упало при одновременном запуске - похоже, это потолок параллельности тарифа. "
               f"Держи AIWA_LLM_CONCURRENCY ниже порога, где начинаются ошибки.")
    await update.message.reply_text(
        f"Готово за {dt} мс.\n\n"
        f"Успешно: {ok}/{n}\n"
        f"Ошибок: {fail}\n"
        f"Задержка: p50 {p50} мс, p95 {p95} мс, max {lats[-1]} мс\n\n"
        + verdict
    )

async def broadcast_today_cmd(update, context):
    cid = update.effective_chat.id
    if not AIWA_ADMIN or str(cid) != str(AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    users = all_users()
    queued = skipped = 0
    for uid in users:
        hhmm = (row(uid) or {}).get("send_time") or "08:00"
        if not should_catchup_broadcast(uid, hhmm):
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

async def _announce_capture(update, context, cid):
    """Копирует сообщение, которое админ прислал после /announce (текст и/или фото), всем пользователям."""
    ANNOUNCE_WAIT.discard(cid)
    msg = update.message
    txt = (msg.text or "").strip()
    if txt.lower() in ("/cancel", "отмена"):
        return await msg.reply_text("Рассылка отменена.")
    await msg.reply_text("Рассылаю это сообщение всем пользователям. Пришлю отчёт, когда закончу.")
    sent = failed = 0
    for uid in all_users():
        try:
            await context.bot.copy_message(chat_id=uid, from_chat_id=cid, message_id=msg.message_id,
                                           reply_markup=summary_kb(row(uid)))
            ev(uid, "broadcast", meta="announce_sent"); sent += 1
            await asyncio.sleep(0.25)
        except Forbidden:
            failed += 1; ev(uid, "broadcast", meta="blocked")
        except Exception as e:
            failed += 1; ev(uid, "broadcast", meta="announce_error"); log.warning("announce %s: %s", uid, e)
    await msg.reply_text(f"Готово. Ушло: {sent}, ошибок: {failed}.")

async def announce_cmd(update, context):
    cid = update.effective_chat.id
    if not AIWA_ADMIN or str(cid) != str(AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    ANNOUNCE_WAIT.add(cid)
    await update.message.reply_text(
        "Режим рассылки включён.\n\n"
        "Пришли СЛЕДУЮЩИМ сообщением то, что разослать всем: обычный текст, или фото с подписью, или картинку. "
        "Я скопирую это сообщение всем пользователям и добавлю кнопку «Приложение».\n\n"
        "Чтобы отменить — напиши слово: отмена.")

# ---------- text ----------
async def on_text(update, context):
    cid = update.effective_chat.id
    if cid in ANNOUNCE_WAIT:
        return await _announce_capture(update, context, cid)
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

def food_card(rec, added=True):
    conf = {"low": "низкая", "medium": "средняя", "high": "высокая"}.get(rec.get("confidence"), "средняя")
    head = f"🍽 <b>{html.escape(rec['title'])}</b>"
    if rec.get("grams"): head += f" · ~{rec['grams']} г"
    lines = [head, f"~{rec['kcal']} ккал · Б {round(rec['protein'])} · Ж {round(rec['fat'])} · У {round(rec['carbs'])} г"]
    for it in (rec.get("items") or [])[:6]:
        g = f" {it['grams']} г" if it.get("grams") else ""
        lines.append(f"• {html.escape(it['name'])}{g} — {it['kcal']} ккал")
    if rec.get("note"): lines.append(f"<i>{html.escape(rec['note'])}</i>")
    lines.append(f"\nОценка примерная (точность {conf})." + (" Добавила в дневник — итоги дня в приложении." if added else ""))
    return "\n".join(lines)

async def on_photo(update, context):
    cid = update.effective_chat.id; u = row(cid)
    if cid in ANNOUNCE_WAIT:
        return await _announce_capture(update, context, cid)
    if not is_onboarded(u):
        return await update.message.reply_text("Сначала настрой Айву: /start.")
    await context.bot.send_chat_action(cid, "typing")
    try:
        ph = update.message.photo
        fid = ph[-1].file_id if ph else (update.message.document.file_id if update.message.document else None)
        if not fid: return
        f = await context.bot.get_file(fid); ba = await f.download_as_bytearray()
    except Exception as e:
        log.warning("photo dl %s: %s", cid, e)
        return await update.message.reply_text("Не смогла скачать фото, попробуй ещё раз.")
    prof = profile_of(u); usage = []
    try:
        parsed = await asyncio.to_thread(L.analyze_food, bytes(ba), "food.jpg", prof, usage)
    except Exception as e:
        log.warning("on_photo analyze %s: %s", cid, e); parsed = None
    ev(cid, "tokens", sum(usage), meta="food_photo", calls=len(usage))
    rec = normalize_food(parsed, "photo") if parsed else None
    if not rec:
        _e = ""
        try: _e = L.last_food_err()
        except Exception: pass
        return await update.message.reply_text("Не разобрала фото 🙈 Сфоткай ближе и светлее, либо напиши текстом." + (("\n\n⚙️ " + _e) if _e else ""))
    mid = meal_add(cid, rec); ev(cid, "goal", meta="food_log"); ev(cid, "manual", meta="food_log")
    rows = [[B("🗑 Убрать из дневника", f"mdel:{mid}")]]
    wu = webapp_url(u) or AIWA_WEBAPP_URL
    if wu: rows.append([InlineKeyboardButton("📱 Открыть дневник", web_app=WebAppInfo(url=wu))])
    await update.message.reply_text(food_card(rec), reply_markup=InlineKeyboardMarkup(rows), parse_mode="HTML")

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
        ev(cid, "answered", tokens=sum(usage), meta="partner_q", ms=int((time.monotonic()-t0)*1000), n=len(txt), calls=len(usage))
        return await context.bot.send_message(cid, ans)

    if state == "await_date":
        d = parse_date(txt)
        if not d:
            if is_question_like(txt):
                _oq = []; a = await think_llm(context, cid, L.answer_question, None, txt, profile_of(u), None, usage=_oq)
                ev(cid, "tokens", sum(_oq), meta="onboard_q", calls=len(_oq))
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
                _oq = []; a = await think_llm(context, cid, L.answer_question, None, txt, profile_of(u), None, usage=_oq)
                ev(cid, "tokens", sum(_oq), meta="onboard_q", calls=len(_oq))
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
                _oq = []; a = await think_llm(context, cid, L.answer_question, None, txt, profile_of(u), None, usage=_oq)
                ev(cid, "tokens", sum(_oq), meta="onboard_q", calls=len(_oq))
                return await update.message.reply_text(fit_tg(L.split_followups(a)[0]) + "\n\nА теперь вернёмся: напиши рост (см), вес (кг), возраст. Например 168 60 30, или нажми «Пропустить».", reply_markup=SKIP_KB)
            return await update.message.reply_text("Нужно три числа: рост в см, вес в кг, возраст. Например 168 60 30. Или нажми «Пропустить».", reply_markup=SKIP_KB)
        upsert(cid, height=int(cm), weight=kg, age=age, state="await_activity")
        return await update.message.reply_text("Принято 💪 Какой у тебя уровень физической активности?\n\n"
            "• Минимальная — сидячий образ жизни, почти без спорта\n"
            "• Лёгкая — лёгкие тренировки 1–3 раза в неделю\n"
            "• Умеренная — спорт 3–5 раз в неделю\n"
            "• Высокая — интенсивно 6–7 раз в неделю\n"
            "• Очень высокая — спорт плюс физическая работа\n\n"
            "Это нужно, чтобы точнее считать калории и питание.", reply_markup=ACT_KB)

    if state == "await_activity":
        # раньше этот шаг принимал только кнопки: написавшая словами выпадала из онбординга в общий чат
        _low = txt.lower()
        _act = None
        for _pat, _lvl in (("очень высок", 5), ("минимал", 1), ("лёгк", 2), ("легк", 2), ("умерен", 3), ("средн", 3), ("высок", 4)):
            if _pat in _low: _act = _lvl; break
        if _act is None:
            _md = re.fullmatch(r"[1-5]", _low.strip())
            if _md: _act = int(_low.strip())
        if _act is None:
            return await update.message.reply_text("Выбери уровень активности кнопкой ниже — так точнее.", reply_markup=ACT_KB)
        upsert(cid, activity=_act, state="await_diet")
        return await update.message.reply_text("Есть ограничения в еде? Отметь кнопками или напиши своё текстом (например «без свинины, без сахара»), потом Готово.", reply_markup=diet_kb(set()))

    if state == "await_symptom_custom":
        code = symptom_code(txt)
        if not code:
            return await update.message.reply_text("Напиши симптом коротко, например «тошнота» или «ломота».")
        today_s = dtoday().isoformat()
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
        ev(cid, "answered", meta="general", ms=int((time.monotonic()-t0)*1000), n=len(txt))
        hist_push(cid, txt, ans)
        return await send_answer(context, cid, ans, None, txt, usage=usage, quote=txt)
    if is_onboarded(u):
        _, st = status_of(cid); await context.bot.send_chat_action(cid, "typing")
        g = match_guide(txt)
        if g: await send_guide(context, cid, g)
        t0 = time.monotonic(); usage = []
        ans = await think_llm(context, cid, L.answer_question, st, txt, profile_of(u), hist_get(cid), usage=usage)
        ev(cid, "answered", meta="answer", ms=int((time.monotonic()-t0)*1000), n=len(txt))
        hist_push(cid, txt, ans)
        return await send_answer(context, cid, ans, st, txt, usage=usage, quote=txt)
    if is_question_like(txt):
        await context.bot.send_chat_action(cid, "typing")
        _oq = []; a = await think_llm(context, cid, L.answer_question, None, txt, profile_of(u), None, usage=_oq)
        ev(cid, "tokens", sum(_oq), meta="onboard_q", calls=len(_oq))
        await update.message.reply_text(fit_tg(L.split_followups(a)[0]))
    await need_onboard(update.message)

# ---------- callbacks ----------
async def on_cb(update, context):
    q = update.callback_query; await q.answer()
    if not q.message:  # у сообщений старше ~48ч Telegram не присылает message — без защиты тут AttributeError
        return
    cid = q.message.chat.id; data = q.data
    if data.startswith("pado:"):
        _intent = data.split(":", 1)[1]
        _u = row(cid)
        if not is_onboarded(_u):
            return await q.message.reply_text("Сначала настрой Айву: /start.")
        _QQ = {"train": "Собери мне короткую тренировку примерно на 10 минут под мою фазу цикла и сегодняшнее самочувствие. Дай конкретные упражнения с подходами и повторами.",
               "food": "Что съесть, чтобы добрать белок к ужину, под мою фазу? Дай 2-3 конкретных варианта."}
        _query = _QQ.get(_intent)
        if not _query:
            return
        await context.bot.send_chat_action(cid, "typing")
        try:
            _res = await _chat_reply(cid, _u, _query)
            _ans = _res.get("answer") if isinstance(_res, dict) else None
        except Exception as _e:
            log.warning("pado reply: %s", _e); _ans = None
        if not _ans:
            _ans = "Не получилось собрать прямо сейчас, попробуй ещё раз чуть позже."
        _wu = webapp_url(_u) or AIWA_WEBAPP_URL
        _kb = InlineKeyboardMarkup([[InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=_wu))]]) if _wu else None
        return await context.bot.send_message(cid, _ans, reply_markup=_kb)
    if data == "go_start": return await begin_onboard(cid, q.message, force=True)
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
    today_s = dtoday().isoformat()
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
        log_set(cid, today_s, energy=int(data.split(":")[2])); await safe_edit(q, "Настроение?", reply_markup=en_kb("m", MOOD))
    elif data.startswith("ci:m:"):
        log_set(cid, today_s, mood=int(data.split(":")[2])); await safe_edit(q, "Что беспокоит сегодня? Можно несколько, потом Готово.", reply_markup=sym_kb(set()))
    elif data.startswith("ci:s:"):
        log_toggle(cid, today_s, data.split(":")[2]); sel = set((log_get(cid, today_s) or {}).get("symptoms", [])); await safe_edit(q, reply_markup=sym_kb(sel))
    elif data == "ci:custom":
        upsert(cid, state="await_symptom_custom")
        await q.message.reply_text("Напиши свой симптом коротко, например «тошнота», «ломота», «боль в груди».")
    elif data == "ci:done":
        ev(cid, "goal", meta="checkin"); await safe_edit(q, "Записала. Учту в завтрашней сводке.")
    elif data.startswith("mdel:"):
        try:
            meal_del(cid, int(data.split(":")[1])); await safe_edit(q, "🗑 Убрала из дневника.")
        except Exception: pass
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

async def safe_edit(q, text=None, reply_markup=None):
    """edit_message_* с проглатыванием безобидных ошибок Telegram (not modified / таймаут)."""
    try:
        if text is not None:
            await q.edit_message_text(text, reply_markup=reply_markup)
        else:
            await q.edit_message_reply_markup(reply_markup=reply_markup)
    except BadRequest as e:
        if "not modified" in str(e).lower():
            return
        raise
    except (TimedOut, NetworkError):
        return

async def on_error(update, context):
    err = context.error
    # Безобидные ошибки Telegram: не пишем пользователю и не шлём алерт админу
    if isinstance(err, BadRequest) and "not modified" in str(err).lower():
        return
    if isinstance(err, (TimedOut, NetworkError, RetryAfter)):
        log.warning("transient telegram error: %s", err)
        return
    log.error("handler error", exc_info=err)
    try:
        if isinstance(update, Update) and update.effective_chat:
            ev(update.effective_chat.id, "error", meta=type(err).__name__)
            await context.bot.send_message(update.effective_chat.id,
                "Упс, что-то пошло не так. Попробуй ещё раз.",
                reply_markup=InlineKeyboardMarkup([[B("Меню", "menu", KBS.PRIMARY)]]))
        await admin_alert(context.application, "handler_error",
            f"⚠️ Ошибка обработчика: {type(err).__name__}\nПроверь Railway logs.")
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
            q_threshold = int(os.environ.get("AIWA_ALERT_BCAST_Q", "250"))
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
    global BOT_USERNAME, BCAST_Q, FOOD_Q, TRAIN_Q
    try:
        import concurrent.futures
        _ex_threads = max(8, min(128, int(os.environ.get("AIWA_EXECUTOR_THREADS", "32"))))
        asyncio.get_running_loop().set_default_executor(concurrent.futures.ThreadPoolExecutor(max_workers=_ex_threads))
        log.info("default executor threads: %d", _ex_threads)
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
    _bw = max(1, min(20, int(os.environ.get("AIWA_BROADCAST_WORKERS", "6"))))
    for _ in range(_bw):
        asyncio.create_task(broadcast_worker(app))
    log.info("broadcast workers started: %d", _bw)
    FOOD_Q = asyncio.Queue()
    _fw = max(1, min(10, int(os.environ.get("AIWA_FOOD_WORKERS", "3"))))
    for _ in range(_fw):
        asyncio.create_task(food_worker(app))
    try:
        _fh, _fm = map(int, os.environ.get("AIWA_FOOD_PUSH_TIME", "14:00").split(":"))
    except (ValueError, AttributeError):
        _fh, _fm = 14, 0
    if not _proactive_enabled():
        app.job_queue.run_daily(food_reminder_job, time=dtime(_fh, _fm, tzinfo=TZ), name="food_reminder_all")
        log.info("food reminder scheduled %02d:%02d, workers: %d", _fh, _fm, _fw)
    else:
        log.info("food reminder suppressed (proactive engine on)")
    TRAIN_Q = asyncio.Queue()
    for _ in range(_fw):
        asyncio.create_task(train_worker(app))
    try:
        _th, _tm = map(int, os.environ.get("AIWA_TRAIN_PUSH_TIME", "19:00").split(":"))
    except (ValueError, AttributeError):
        _th, _tm = 19, 0
    if not _proactive_enabled():
        app.job_queue.run_daily(train_reminder_job, time=dtime(_th, _tm, tzinfo=TZ), name="train_reminder_all")
        log.info("train reminder scheduled %02d:%02d", _th, _tm)
    else:
        log.info("train reminder suppressed (proactive engine on)")
    try:
        _ph, _pm = map(int, os.environ.get("AIWA_PHASE_PUSH_TIME", "11:30").split(":"))
    except (ValueError, AttributeError):
        _ph, _pm = 11, 30
    if not _proactive_enabled():
        app.job_queue.run_daily(phase_transition_job, time=dtime(_ph, _pm, tzinfo=TZ), name="phase_transition")
    try:
        _rh, _rm = map(int, os.environ.get("AIWA_REACT_TIME", "18:30").split(":"))
    except (ValueError, AttributeError):
        _rh, _rm = 18, 30
    if not _proactive_enabled():
        app.job_queue.run_daily(reactivation_job, time=dtime(_rh, _rm, tzinfo=TZ), name="reactivation")
        log.info("phase push %02d:%02d, reactivation %02d:%02d", _ph, _pm, _rh, _rm)
    else:
        log.info("phase/reactivation pushes suppressed (proactive engine on)")
    if _proactive_enabled():
        try:
            app.job_queue.run_daily(proactive_job_mid, time=dtime(13, 0, tzinfo=TZ), name="proactive_mid")
            app.job_queue.run_daily(proactive_job_eve, time=dtime(19, 30, tzinfo=TZ), name="proactive_eve")
            log.info("proactive engine ON (shadow=%s)", os.environ.get("AIWA_PROACTIVE_SHADOW", "1"))
        except Exception as _pe:
            log.warning("proactive schedule: %s", _pe)
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
    ev(cid, "button", meta="app_open")
    out = {"onboarded": True, "cycle": bool(is_cycle(u) and u.get("last_period")),
           "last_period": u.get("last_period"), "cycle_len": u.get("cycle_len") or 28,
           "mode": u.get("mode") or "cycle", "name": (body.get("name") or ""), "pa": pa_list(cid), "chatlog": chatlog_get(cid, 60),
           "partner_linked": bool(partner_of(cid)),
           "today_log": log_get(cid, dtoday().isoformat()) or {"symptoms": []},
           "send_time": u.get("send_time") or "08:00",
           "profile": {"height": u.get("height"), "weight": u.get("weight"), "age": u.get("age"),
                       "activity": u.get("activity"), "diet": u.get("diet") or "", "diet_note": u.get("diet_note") or "", "kcal_goal": u.get("kcal_goal")}}
    out["sym_log"] = logs_of(cid, (dtoday() - timedelta(days=45)).isoformat())
    out["past_periods"] = periods_of(cid)
    try:
        _pr = profile_of(u)
        out["kcal_base"] = calc_calories(_pr["height"], _pr["weight"], _pr["age"], _pr["activity"])[0] if _pr else None
    except Exception:
        out["kcal_base"] = None
    try:
        out["streak"] = streak_of(cid)
    except Exception:
        out["streak"] = 0
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
    try: d = date.fromisoformat(ds) if ds else dtoday()
    except Exception: d = dtoday()
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
    if d > dtoday(): return _cors(web.json_response({"marked": False, "skip": True}))
    marked = pa_toggle(cid, d.isoformat()); ev(cid, "manual", meta="web_pa")
    return _cors(web.json_response({"marked": marked}))
async def _api_checkin(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    ds = body.get("date") or dtoday().isoformat()
    try: date.fromisoformat(ds)
    except Exception: ds = dtoday().isoformat()
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
    if "kcal_goal" in body:
        g = body.get("kcal_goal")
        if g in (None, "", 0, "0"):
            upsert(cid, kcal_goal=None)
        else:
            try:
                gi = int(float(str(g).replace(",", ".")))
                upsert(cid, kcal_goal=(gi if 800 <= gi <= 6000 else None))
            except (TypeError, ValueError):
                pass
    if "cycle_len" in body:
        try:
            _ci = int(float(str(body.get("cycle_len"))))
            if 15 <= _ci <= 60:
                upsert(cid, cycle_len=_ci)
                if BOT_APP:
                    try: schedule_daily(BOT_APP, cid, (row(cid).get("send_time") or "08:00"))
                    except Exception as e: log.warning("reschedule: %s", e)
        except (TypeError, ValueError):
            pass
    menu_cache_clear(cid)
    ev(cid, "manual", meta="web_profile")
    _u2 = row(cid)
    return _cors(web.json_response({"ok": True,
        "profile": {"height": int(cm), "weight": kg, "age": age, "kcal_goal": _u2.get("kcal_goal")}, "cycle_len": _u2.get("cycle_len"),
        "kcal_base": calc_calories(int(cm), kg, age, _u2.get("activity") or 2)[0]}))
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
    ev(cid, "button", meta="web_meal_replace"); ev(cid, "tokens", sum(usage), meta="meal", calls=len(usage))
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
def _food_ctx(u, st):
    if st:
        return f"Сейчас {st.get('subphase','')} {st['phase_ru'].lower()} фаза, день {st['day']} цикла."
    return {"meno": "Режим менопаузы.", "preg": "Беременность.", "irregular": "Нерегулярный цикл.",
            "none": "Месячных сейчас нет."}.get(u.get("mode"), "")

def _recent_workouts_text(cid):
    try:
        rw = workouts_recent(cid, days=10, limit=5)
    except Exception:
        return ""
    parts = []
    for w in rw:
        items = ", ".join((i.get("name") or "") for i in (w.get("items") or []) if i.get("name"))
        seg = (w.get("d", "") or "") + ": " + (w.get("type", "") or "")
        if items: seg += " (" + items[:60] + ")"
        parts.append(seg)
    return "; ".join(parts)

def _recent_syms_text(cid):
    lg = log_get(cid, dtoday().isoformat()) or {}
    out = []
    e = lg.get("energy"); m = lg.get("mood")
    if e: out.append("энергия " + {1: "низкая", 2: "средняя", 3: "высокая"}.get(e, str(e)))
    if m: out.append("настроение " + {1: "плохое", 2: "нормальное", 3: "хорошее"}.get(m, str(m)))
    n = len(lg.get("symptoms") or [])
    if n: out.append(f"симптомов отмечено: {n}")
    return ", ".join(out)

async def _api_section(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid); _, st = status_of(cid); kind = body.get("kind", "food"); ev(cid, "button", meta="web_" + kind)
    if not is_onboarded(u):
        return _cors(web.json_response({"error": "onboard", "text": "Сначала настрой Айву в боте."}, status=403))
    if st is None:
        prof = profile_of(u); target = profile_kcal(prof) if prof else None
        if kind == "food":
            _usage = []; menu = await asyncio.to_thread(menu_cached, cid, None, prof, target, u.get("mode"), _usage)
            if _usage: ev(cid, "tokens", sum(_usage), meta="menu", calls=len(_usage))
            if target: menu["macros"] = {"protein": f"{target[1]} г", "fat": f"{target[2]} г", "carbs": f"{target[3]} г"}
            txt = {"meno": "В менопаузе на первый план выходят кости, сон и сердце. Делай упор на белок (рыба, яйца, творог, курица) и кальций с витамином D (молочное, сардины, зелень), добавляй магний и B6 (гречка, орехи, тёмный шоколад) для сна и приливов, и омега-3 из жирной рыбы. Меньше быстрых сахаров, кофеина и алкоголя — они усиливают приливы.",
                   "preg": "В беременности важно закрыть потребность в фолиевой кислоте, железе, кальции и белке. Ешь зелень и бобовые (фолаты), красное мясо и гречку (железо), молочное (кальций), рыбу с омега-3 и белок в каждый приём. Избегай сырого мяса и рыбы, непастеризованного, печени в избытке, алкоголя и лишнего кофеина.",
                   "irregular": "Без чёткого цикла опирайся на стабильный сахар и сытость. Белок в каждый приём (яйца, рыба, птица, творог), сложные углеводы (гречка, рис, овощи), магний и железо — это держит энергию и настроение ровными в течение дня.",
                   "none": "Сбалансированно и просто: белок в каждый приём, овощи и зелень, сложные углеводы, полезные жиры (рыба, орехи) и достаточно воды. Меньше резких скачков сахара — стабильнее энергия и меньше тяги к перекусам."}.get(u.get("mode"), "Сбалансированное питание на день: белок, овощи, сложные углеводы и вода.")
            _su = []; sugg = await asyncio.to_thread(L.food_suggestions, [m.get("dish", "") for m in (menu.get("meals") or [])], _food_ctx(u, None), _su)
            if _su: ev(cid, "tokens", sum(_su), meta="food_suggest", calls=len(_su))
            return _cors(web.json_response({"menu": menu, "kcal": (target[0] if target else None), "text": txt, "suggestions": sugg}))
        _su = []; plan = await asyncio.to_thread(L.training_today, None, prof, _recent_workouts_text(cid), u.get("mode"), _su)
        if _su: ev(cid, "tokens", sum(_su), meta="training_today", calls=len(_su))
        return _cors(web.json_response({"text": plan.get("summary", ""), "training": plan}))
    if kind == "food":
        prof = profile_of(u); target = profile_kcal(prof) if prof else None
        _usage = []; menu = await asyncio.to_thread(menu_cached, cid, st, prof, target, None, _usage)
        if _usage: ev(cid, "tokens", sum(_usage), meta="menu", calls=len(_usage))
        if target: menu["macros"] = {"protein": f"{target[1]} г", "fat": f"{target[2]} г", "carbs": f"{target[3]} г"}
        text = st["content"]["food"]
        _su = []; sugg = await asyncio.to_thread(L.food_suggestions, [m.get("dish", "") for m in (menu.get("meals") or [])], _food_ctx(u, st), _su)
        if _su: ev(cid, "tokens", sum(_su), meta="food_suggest", calls=len(_su))
        return _cors(web.json_response({"menu": menu, "kcal": (target[0] if target else None), "text": text, "suggestions": sugg}))
    _su = []; plan = await asyncio.to_thread(L.training_today, st, profile_of(u), _recent_workouts_text(cid), u.get("mode"), _su)
    if _su: ev(cid, "tokens", sum(_su), meta="training_today", calls=len(_su))
    return _cors(web.json_response({"text": plan.get("summary", ""), "training": plan}))
async def _api_today(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u): return _cors(web.json_response({"error": "onboard"}, status=403))
    _, st = status_of(cid); ev(cid, "button", meta="web_today")
    _su = []
    note = await asyncio.to_thread(L.today_note, st, profile_of(u), _recent_syms_text(cid), u.get("mode"), _su)
    if _su: ev(cid, "tokens", sum(_su), meta="today_note", calls=len(_su))
    return _cors(web.json_response(note))

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
    return _cors(web.json_response(await _chat_reply(cid, u, msg)))

def _agent_tools_spec():
    return [
        {"type": "function", "function": {"name": "cycle_status",
            "description": "Текущая фаза цикла, день цикла, сколько дней до месячных, задержка. Вызывай для вопросов про цикл, фазу, овуляцию, ПМС, самочувствие.",
            "parameters": {"type": "object", "properties": {}}}},
        {"type": "function", "function": {"name": "recent_symptoms",
            "description": "Отметки самочувствия за последние дни: симптомы, энергия, настроение.",
            "parameters": {"type": "object", "properties": {"days": {"type": "integer", "description": "за сколько дней, по умолчанию 14"}}}}},
        {"type": "function", "function": {"name": "today_diary",
            "description": "Что пользовательница ела сегодня: калории и БЖУ, цель по калориям. Вызывай для вопросов про питание и калории.",
            "parameters": {"type": "object", "properties": {}}}},
        {"type": "function", "function": {"name": "recent_workouts",
            "description": "Последние тренировки пользовательницы. Вызывай для вопросов про нагрузку.",
            "parameters": {"type": "object", "properties": {}}}},
        {"type": "function", "function": {"name": "user_profile",
            "description": "Профиль: рост, вес, возраст, активность, цель по калориям, режим (цикл/менопауза/беременность).",
            "parameters": {"type": "object", "properties": {}}}},
        {"type": "function", "function": {"name": "recall",
            "description": "Достать, что ассистент уже знает о пользовательнице из долгой памяти (её предпочтения, цели, что ей не подходит, важные факты). Вызывай в начале, если персональный контекст поможет ответить точнее.",
            "parameters": {"type": "object", "properties": {}}}},
        {"type": "function", "function": {"name": "remember",
            "description": "Сохранить в долгую память ОДИН устойчивый факт о пользовательнице (предпочтение, цель, ограничение, что плохо переносит, привычка). НЕ сохраняй разовое, сиюминутное или уже известное.",
            "parameters": {"type": "object", "properties": {"key": {"type": "string", "description": "короткий ярлык факта, напр. 'цель', 'не любит', 'плохо переносит'"}, "value": {"type": "string", "description": "сам факт кратко"}}, "required": ["key", "value"]}}},
    ]

def _agent_exec(cid, name, args):
    args = args or {}
    try:
        if name == "cycle_status":
            _, st = status_of(cid)
            if not st:
                return {"tracked": False, "note": "цикл сейчас не отслеживается"}
            return {"tracked": True, "phase": st.get("phase_ru"), "subphase": st.get("subphase"),
                    "day": st.get("day"), "cycle_len": st.get("cycle_len"),
                    "days_to_next": st.get("days_to_next"), "status": st.get("status")}
        if name == "recent_symptoms":
            days = int(args.get("days") or 14)
            logs = logs_of(cid, (dtoday() - timedelta(days=days)).isoformat()) or []
            out = [{"date": l.get("date"), "symptoms": l.get("symptoms"), "energy": l.get("energy"), "mood": l.get("mood")}
                   for l in logs if (l.get("symptoms") or l.get("energy") or l.get("mood"))]
            return {"logs": out[-12:]}
        if name == "today_diary":
            dp = diary_payload(cid)
            return {"totals": dp.get("totals"), "target": dp.get("target"), "meals_logged": len(dp.get("meals") or [])}
        if name == "recent_workouts":
            return {"recent": _recent_workouts_text(cid) or "нет записей"}
        if name == "user_profile":
            u = row(cid) or {}; p = profile_of(u) or {}
            return {"height": p.get("height"), "weight": p.get("weight"), "age": p.get("age"),
                    "activity": p.get("activity"), "kcal_goal": p.get("kcal_goal"), "mode": u.get("mode")}
        if name == "recall":
            return {"memory": mem_all(cid)[:16] or "пока пусто"}
        if name == "remember":
            ok = mem_set(cid, args.get("key"), args.get("value"))
            if ok: ev(cid, "remember", meta="agent")
            return {"saved": bool(ok)}
    except Exception as e:
        return {"error": str(e)}
    return {"error": "unknown tool"}

async def _agent_answer(cid, u, msg, usage):
    """Агентный ответ в два этапа:
    1) модель через инструменты сама добывает реальные данные пользовательницы (реальные тул-колы);
    2) финальный ответ пишется прежним качественным промптом (answer_question/general_answer) с этими данными.
    Возвращает текст или None (тогда вызывающий откатывается к обычному ответу)."""
    plan_sys = ("Ты — планировщик ассистента по женскому здоровью. Реши, какие инструменты нужны, чтобы ответить "
                "на вопрос пользовательницы по её РЕАЛЬНЫМ данным (цикл, симптомы, дневник еды, тренировки, профиль), и вызови их. "
                "Если это приветствие, благодарность, болтовня или общий вопрос не про её здоровье и данные (фильмы, быт, отношения, работа) — НЕ вызывай НИКАКИЕ инструменты, включая cycle_status. "
                "Если вопрос общий и данные не нужны — не вызывай инструменты. Сам развёрнутый ответ не пиши, только выбери инструменты.")
    messages = [{"role": "system", "content": plan_sys}, {"role": "user", "content": msg}]
    tools = _agent_tools_spec()
    gathered = []
    for _r in range(2):
        m = await asyncio.to_thread(L.call_tools, messages, tools, usage, 0.2, 480)
        if not m:
            return None if _r == 0 else await _agent_final(cid, u, msg, gathered, usage)
        tc = m.get("tool_calls")
        if not tc:
            break
        messages.append({"role": "assistant", "content": m.get("content") or "", "tool_calls": tc})
        for call in tc:
            fn = call.get("function") or {}
            nm = fn.get("name") or ""
            try:
                a = json.loads(fn.get("arguments") or "{}")
            except Exception:
                a = {}
            res = _agent_exec(cid, nm, a)
            gathered.append(nm + ": " + json.dumps(res, ensure_ascii=False))
            messages.append({"role": "tool", "tool_call_id": call.get("id"),
                             "content": json.dumps(res, ensure_ascii=False)})
    return await _agent_final(cid, u, msg, gathered, usage)

async def _agent_final(cid, u, msg, gathered, usage):
    _, st = status_of(cid); prof = profile_of(u)
    q = msg
    if gathered:
        q = msg + "\n\nВот её актуальные данные из приложения — когда отвечаешь про здоровье, цикл, питание или тренировки, обязательно опирайся на них и приводи конкретные числа. Если сам вопрос не про это (болтовня, общие темы), отвечай по теме вопроса и эти данные не упоминай: " + " | ".join(gathered)
    q = _with_memory(cid, q)
    if st is not None:
        return await asyncio.to_thread(L.answer_question, st, q, prof, hist_get(cid), usage=usage)
    return await asyncio.to_thread(L.general_answer, prof, u.get("mode"), q, chat_hint(cid), hist_get(cid), usage=usage)

async def _memory_learn(cid, umsg, amsg):
    """Фоновая выжимка устойчивых фактов из диалога в долгую память (не блокирует ответ)."""
    try:
        existing = mem_text(cid, 30); usage = []
        facts = await asyncio.to_thread(L.memory_extract, umsg, amsg, existing, usage)
        for f in (facts or []):
            mem_set(cid, f.get("key"), f.get("value"))
        if usage:
            ev(cid, "memory_learn", tokens=sum(usage), meta="memory_learn", calls=len(usage))
    except Exception as e:
        log.warning("memory_learn: %s", e)

async def _chat_reply(cid, u, msg):
    """Единый ответ чата для текста и голоса. Возвращает dict {answer, suggestions}."""
    intent = match_intent(msg)
    if intent == "phases":
        chatlog_add(cid, "user", msg); chatlog_add(cid, "ai", PHASES_TEXT)
        return {"answer": PHASES_TEXT, "suggestions": ["Что есть в мою фазу?", "Какая тренировка сейчас?"]}
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
        return {"answer": guide, "suggestions": ["Что по циклу?", "Открыть питание"]}
    if intent == "logmeal":
        _t = await log_food_from_text(cid, u, msg)
        return {"answer": _t, "suggestions": ["Открыть питание", "Совет по дневнику"]}
    if intent == "diary":
        usage = []; txt = await answer_diary(cid, usage)
        if usage: ev(cid, "answered", tokens=sum(usage), meta="webapp", n=len(msg), calls=len(usage))
        return {"answer": txt, "suggestions": ["Открыть питание", "Что купить?"]}
    _, st = status_of(cid); usage = []; prof = profile_of(u)
    ans = None
    try:
        ans = await _agent_answer(cid, u, msg, usage)
    except Exception as _ae:
        log.warning("agent fallback: %s", _ae); ans = None
    if not ans:
        if intent in ("food", "training"):
            fq = ("Что мне есть сегодня под мою фазу/режим, возраст и самочувствие? Дай конкретные продукты или пример меню на день. Отвечай ТОЛЬКО про еду, не рассказывай про фазы цикла."
                  if intent == "food" else
                  "Какая физическая активность мне сегодня подходит и почему? Дай 2-3 конкретных варианта. Отвечай про тренировки, тему цикла не разворачивай.")
            fq = _with_memory(cid, fq)
            if st is not None:
                ans = await asyncio.to_thread(L.answer_question, st, fq, prof, hist_get(cid), usage=usage)
            else:
                ans = await asyncio.to_thread(L.general_answer, prof, u.get("mode"), fq, chat_hint(cid), hist_get(cid), usage=usage)
        elif st is not None:
            ans = await asyncio.to_thread(L.answer_question, st, _with_memory(cid, msg), prof, hist_get(cid), usage=usage)
        else:
            ans = await asyncio.to_thread(L.general_answer, prof, u.get("mode"), _with_memory(cid, msg), chat_hint(cid), hist_get(cid), usage=usage)
    hist_push(cid, msg, ans)
    clean, sugg = L.split_followups(ans)
    if st is not None and len(sugg) < 2:
        try:
            for e in L.followups(st, msg, clean):
                if e not in sugg and len(sugg) < 2: sugg.append(e)
        except Exception: pass
    ev(cid, "answered", tokens=sum(usage), meta="webapp", n=len(msg), calls=len(usage))
    try:
        asyncio.create_task(_memory_learn(cid, msg, clean))
    except Exception:
        pass
    return {"answer": clean, "suggestions": sugg[:2]}

async def _api_voice(request):
    try:
        data = await request.post()
    except Exception:
        return _cors(web.json_response({"answer": "Не получила аудио.", "suggestions": []}, status=400))
    cid = _verify_init(data.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u):
        return _cors(web.json_response({"answer": "Сначала настрой Айву в боте: /start.", "suggestions": []}, status=403))
    field = data.get("audio")
    raw = b""
    if field is not None:
        try: raw = field.file.read()
        except Exception:
            raw = field if isinstance(field, (bytes, bytearray)) else b""
    fn = getattr(field, "filename", "voice.webm") or "voice.webm"
    if not raw:
        return _cors(web.json_response({"transcript": "", "answer": "Пустая запись, попробуй ещё раз.", "suggestions": []}))
    txt = await asyncio.to_thread(L.transcribe, bytes(raw), fn)
    if not txt:
        return _cors(web.json_response({"transcript": "", "answer": "Не расслышала, попробуй ещё раз или напиши текстом.", "suggestions": []}))
    ev(cid, "voice", n=len(txt))
    msg, _addr = strip_aiwa_address(txt.strip())
    if not msg: msg = txt.strip()
    reply = await _chat_reply(cid, u, msg)
    reply["transcript"] = txt.strip()
    return _cors(web.json_response(reply))

def diary_payload(cid, prof=None):
    prof = prof if prof is not None else profile_of(row(cid))
    tg = profile_kcal(prof) if prof else None
    return {"meals": meals_of(cid), "totals": diary_totals(cid),
            "target": ({"kcal": tg[0], "protein": tg[1], "fat": tg[2], "carbs": tg[3]} if tg else None)}

def diary_reco_summary(cid):
    prof = profile_of(row(cid)); tg = profile_kcal(prof) if prof else None
    ms = meals_of(cid); tot = diary_totals(cid)
    if not ms:
        return None
    lines = ["Приёмы: " + "; ".join(f"{m['title']} ({m['kcal']} ккал, Б{round(m['protein'])}/Ж{round(m['fat'])}/У{round(m['carbs'])})" for m in ms)]
    lines.append(f"Итого за день: {tot['kcal']} ккал, белок {tot['protein']} г, жиры {tot['fat']} г, углеводы {tot['carbs']} г.")
    if tg:
        lines.append(f"Цель на день: {tg[0]} ккал, белок {tg[1]} г, жиры {tg[2]} г, углеводы {tg[3]} г.")
    try:
        _, st = status_of(cid)
        if st and st.get("phase_ru"):
            lines.append(f"Фаза цикла: {st['phase_ru']}.")
    except Exception:
        pass
    return "\n".join(lines)

async def answer_diary(cid, usage=None):
    summ = diary_reco_summary(cid)
    if not summ:
        return "За сегодня в дневнике пусто. Сфоткай еду или напиши, что съела — посчитаю калории и подскажу, чего добрать."
    return await asyncio.to_thread(L.diary_reco, summ, (usage if usage is not None else []))

async def log_food_from_text(cid, u, text):
    """«добавь на завтрак рисовую кашу» -> распознать КБЖУ и записать в дневник."""
    slot = slot_from_text(text)
    food = re.sub(r"(?i)^\s*(айва[,\s]*)?(добав\w*|запиш\w*|занес\w*|залогир\w*|логни|отмет\w*)\b", "", text)
    food = re.sub(r"(?i)\b(в\s+дневник|в\s+еду|в\s+приём|что\s+я\s+(съел\w*|поел\w*|ел\w*)|на\s+(завтрак|обед|ужин|перекус|полдник)|в\s+(завтрак|обед|ужин|перекус))\b", " ", food)
    food = food.strip(" ,.:—-\t")
    if not food:
        food = text
    usage = []
    parsed = await asyncio.to_thread(L.analyze_food_text, food, profile_of(u), usage)
    ev(cid, "tokens", sum(usage), meta="food_text", calls=len(usage))
    rec = normalize_food(parsed, "text") if parsed else None
    if not rec:
        return "Не поняла, что добавить. Напиши, например «добавь на завтрак рисовую кашу»."
    rec["slot"] = slot or slot_for_now()
    meal_add(cid, rec); ev(cid, "goal", meta="food_log"); ev(cid, "manual", meta="food_log")
    sm = {"breakfast": "завтрак", "lunch": "обед", "snack": "перекус", "dinner": "ужин"}.get(rec["slot"], "приём")
    return f"Добавила в {sm}: {rec['title']} — {rec['kcal']} ккал (Б{round(rec['protein'])} Ж{round(rec['fat'])} У{round(rec['carbs'])}). Итоги дня — в разделе «Питание»."

def _read_upload(field):
    if field is None: return b"", "food.jpg"
    raw = b""
    try: raw = field.file.read()
    except Exception:
        raw = field if isinstance(field, (bytes, bytearray)) else b""
    return bytes(raw), (getattr(field, "filename", "food.jpg") or "food.jpg")

async def _api_food_photo(request):
    try:
        data = await request.post()
    except Exception:
        return _cors(web.json_response({"ok": False, "message": "Не получила фото."}, status=400))
    cid = _verify_init(data.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u):
        return _cors(web.json_response({"ok": False, "message": "Сначала настрой Айву в боте: /start."}, status=403))
    raw, fn = _read_upload(data.get("photo"))
    if not raw:
        return _cors(web.json_response({"ok": False, "message": "Пустое фото."}))
    if len(raw) > 12 * 1024 * 1024:
        return _cors(web.json_response({"ok": False, "message": "Фото слишком большое, сожми и попробуй ещё раз."}))
    prof = profile_of(u); usage = []
    try:
        parsed = await asyncio.to_thread(L.analyze_food, raw, fn, prof, usage)
    except Exception as e:
        log.warning("food_photo analyze %s: %s", cid, e); parsed = None
    ev(cid, "tokens", sum(usage), meta="food_photo", calls=len(usage))
    rec = normalize_food(parsed, "photo") if parsed else None
    if not rec:
        _e = ""
        try: _e = L.last_food_err()
        except Exception: pass
        msg = "Не разобрала фото. Сфоткай ближе и светлее, либо добавь текстом."
        if _e: msg += " [" + _e + "]"
        return _cors(web.json_response({"ok": False, "message": msg}))
    try:
        mid = meal_add(cid, rec); ev(cid, "goal", meta="food_log"); ev(cid, "manual", meta="food_log")
        out = {"ok": True, "meal_id": mid, "rec": rec}; out.update(diary_payload(cid, prof))
        return _cors(web.json_response(out))
    except Exception as e:
        import traceback; log.warning("FOOD save FAIL %s: %s", cid, traceback.format_exc())
        return _cors(web.json_response({"ok": False, "message": "Сбой сохранения: " + str(e)[:150]}))

async def _api_food_text(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u):
        return _cors(web.json_response({"ok": False, "message": "Сначала настрой Айву в боте."}, status=403))
    txt = (body.get("text") or "").strip()
    if not txt: return _cors(web.json_response({"ok": False, "message": "Напиши, что съела."}))
    prof = profile_of(u); usage = []
    try:
        parsed = await asyncio.to_thread(L.analyze_food_text, txt, prof, usage)
    except Exception as e:
        log.warning("food_text analyze %s: %s", cid, e); parsed = None
    ev(cid, "tokens", sum(usage), meta="food_text", calls=len(usage))
    rec = normalize_food(parsed, "text") if parsed else None
    if not rec:
        return _cors(web.json_response({"ok": False, "message": "Не поняла блюдо. Уточни, например «200 г творога и банан»."}))
    _bslot = body.get("slot")
    _sl = slot_from_text(txt)
    if _bslot in ("breakfast", "lunch", "snack", "dinner"): rec["slot"] = _bslot
    elif _sl: rec["slot"] = _sl
    try:
        mid = meal_add(cid, rec); ev(cid, "goal", meta="food_log"); ev(cid, "manual", meta="food_log")
        out = {"ok": True, "meal_id": mid, "rec": rec}; out.update(diary_payload(cid, prof))
        return _cors(web.json_response(out))
    except Exception as e:
        import traceback; log.warning("FOOD save FAIL %s: %s", cid, traceback.format_exc())
        return _cors(web.json_response({"ok": False, "message": "Сбой сохранения: " + str(e)[:150]}))

async def _api_track(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    scr = re.sub(r"[^a-z0-9_]", "", str(body.get("screen") or "").lower())[:20]
    if scr and is_onboarded(row(cid)):
        ev(cid, "button", meta="view_" + scr)
    return _cors(web.json_response({"ok": True}))

async def _api_train(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    ev(cid, "button", meta="web_train")
    try:
        wo = int(body.get("week_offset") or 0)
    except (TypeError, ValueError):
        wo = 0
    wo = max(-52, min(0, wo))
    tod = workouts_of(cid)
    return _cors(web.json_response({"ok": True, "profile": train_profile_get(cid), "week": train_week(cid, wo),
        "today": tod, "last_review": (tod[-1]["review"] if tod else "")}))

async def _api_workout(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u): return _cors(web.json_response({"error": "onboard"}, status=403))
    items = []; groups = []
    for i in (body.get("items") or [])[:24]:
        nm = str(i.get("name") or "").strip()[:40]
        if not nm: continue
        w = i.get("weight"); sets = i.get("sets"); reps = i.get("reps"); grp = str(i.get("group") or "").strip()[:24]
        items.append({"name": nm,
                      "weight": (_num(w) if w not in (None, "", 0) else None),
                      "sets": (int(_num(sets)) if sets not in (None, "", 0) else None),
                      "reps": (int(_num(reps)) if reps not in (None, "", 0) else None),
                      "group": (grp or None)})
        if grp and grp not in groups: groups.append(grp)
    wtype = str(body.get("type") or "")[:40]; dur = str(body.get("duration") or "")[:20]; rpe = str(body.get("rpe") or "")[:20]
    if not wtype and not items:
        return _cors(web.json_response({"error": "empty", "text": "Выбери тип и упражнения."}, status=400))
    prof = profile_of(u); weight_kg = (prof.get("weight") if prof else None)
    kcal = workout_calories(wtype, dur, rpe, weight_kg)
    muscles = ", ".join(groups)
    wk = {"type": wtype, "items": items, "duration": dur, "rpe": rpe, "note": str(body.get("note") or "")[:200],
          "kcal": kcal, "muscles": muscles}
    _, st = status_of(cid); phase_ru = (st or {}).get("phase_ru") if st else None
    usage = []
    try:
        review = await asyncio.to_thread(L.training_review, wk, workouts_recent(cid), phase_ru, u.get("mode"), train_profile_get(cid), usage)
    except Exception as e:
        review = ""; log.warning("train review %s: %s", cid, e)
    wk["review"] = review
    d_iso = str(body.get("date") or "")[:10]
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", d_iso):
        d_iso = None
    else:
        try:
            _dd = date.fromisoformat(d_iso); _td = datetime.now(TZ).date()
            if _dd > _td or (_td - _dd).days > 90: d_iso = None
        except Exception:
            d_iso = None
    try:
        workout_add(cid, wk, d=d_iso)
    except Exception as e:
        return _cors(web.json_response({"error": "save", "text": "Сбой сохранения: " + str(e)}, status=500))
    if usage: ev(cid, "tokens", sum(usage), meta="workout", calls=len(usage))
    ev(cid, "goal", meta="workout"); ev(cid, "manual", meta="workout")
    return _cors(web.json_response({"ok": True, "review": review, "calories": kcal, "muscles": muscles,
        "week": train_week(cid), "today": workouts_of(cid)}))

async def _api_train_profile(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    prof = {}
    for k in ("format", "goal", "limits", "level", "freq"):
        v = body.get(k)
        if v is not None: prof[k] = str(v).strip()[:120]
    train_profile_set(cid, prof)
    ev(cid, "manual", meta="web_train_profile")
    return _cors(web.json_response({"ok": True, "profile": prof}))

async def _api_diary(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    ev(cid, "button", meta="web_diary")
    return _cors(web.json_response(diary_payload(cid)))

async def _api_diary_del(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    try: meal_del(cid, int(body.get("id")))
    except Exception: pass
    ev(cid, "button", meta="web_diary_del")
    return _cors(web.json_response(diary_payload(cid)))

async def _api_diary_scale(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    try: meal_scale(cid, int(body.get("id")), int(body.get("grams")))
    except Exception: pass
    ev(cid, "button", meta="web_diary_scale")
    return _cors(web.json_response(diary_payload(cid)))

async def _api_diary_slot(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    try: meal_set_slot(cid, int(body.get("id")), body.get("slot"))
    except Exception: pass
    ev(cid, "button", meta="web_diary_slot")
    return _cors(web.json_response(diary_payload(cid)))

async def _api_diary_edit(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    kw = {}
    if body.get("title") is not None: kw["title"] = str(body["title"]).strip()[:80]
    for k in ("kcal", "grams"):
        v = body.get(k)
        if v not in (None, ""): kw[k] = int(_num(v))
    for k in ("protein", "fat", "carbs"):
        v = body.get(k)
        if v not in (None, ""): kw[k] = round(_num(v), 1)
    if body.get("slot") in ("breakfast", "lunch", "snack", "dinner"): kw["slot"] = body["slot"]
    try: meal_edit(cid, int(body.get("id")), **kw)
    except Exception: pass
    ev(cid, "button", meta="web_diary_edit")
    return _cors(web.json_response(diary_payload(cid)))

async def _api_food_manual(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"ok": False, "message": "Сначала настрой Айву."}, status=403))
    title = (body.get("title") or "").strip()[:80]
    kcal = int(_num(body.get("kcal")))
    if not title and not kcal:
        return _cors(web.json_response({"ok": False, "message": "Укажи название или калории."}))
    rec = {"title": title or "Приём пищи", "kind": "manual", "items": [],
           "kcal": kcal, "protein": round(_num(body.get("protein")), 1), "fat": round(_num(body.get("fat")), 1),
           "carbs": round(_num(body.get("carbs")), 1), "grams": (int(_num(body.get("grams"))) or None),
           "source": "manual"}
    if body.get("slot") in ("breakfast", "lunch", "snack", "dinner"): rec["slot"] = body["slot"]
    mid = meal_add(cid, rec); ev(cid, "goal", meta="food_log"); ev(cid, "manual", meta="food_log")
    out = {"ok": True, "meal_id": mid, "rec": rec}; out.update(diary_payload(cid))
    return _cors(web.json_response(out))

async def _api_diary_reco(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u): return _cors(web.json_response({"error": "onboard"}, status=403))
    usage = []; text = await answer_diary(cid, usage)
    if usage: ev(cid, "tokens", sum(usage), meta="diary_reco", calls=len(usage))
    return _cors(web.json_response({"ok": True, "text": text}))

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
    if "kcal_goal" in body:
        g = body.get("kcal_goal")
        if g in (None, "", 0, "0"):
            upsert(cid, kcal_goal=None)
        else:
            try:
                gi = int(float(str(g).replace(",", ".")))
                upsert(cid, kcal_goal=(gi if 800 <= gi <= 6000 else None))
            except (TypeError, ValueError):
                pass
    menu_cache_clear(cid)
    ev(cid, "manual", meta="web_prefs")
    _up = row(cid); _kb = None
    try:
        if _up.get("height") and _up.get("weight") and _up.get("age"):
            _kb = calc_calories(_up["height"], _up["weight"], _up["age"], _up.get("activity") or 2)[0]
    except Exception:
        _kb = None
    return _cors(web.json_response({"ok": True, "diet_note": note, "kcal_goal": _up.get("kcal_goal"), "kcal_base": _kb}))

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

_EV_LBL = {
    "app_open": "Открыла приложение", "web_food": "Открыла меню", "web_diary": "Открыла дневник",
    "web_checkin": "Чек-ин (в приложении)", "web_training": "Открыла тренировки", "web_meal_replace": "Замена блюда",
    "web_partner": "Партнёр", "web_profile": "Профиль", "web_prefs": "Предпочтения по еде", "web_settime": "Время сводки",
    "web_train_profile": "Профиль тренировок", "web_pa": "Отметка близости", "web_diary_del": "Удаление из дневника",
    "web_diary_edit": "Правка в дневнике", "web_diary_scale": "Граммовка в дневнике", "web_diary_slot": "Перенос приёма",
    "web_today": "Открыла «Сегодня»", "food_suggest": "Идеи по питанию", "training_today": "Разбор нагрузки", "today_note": "Сводка дня",
    "proactive_compose": "Проактив-сообщение", "partner_brief": "Партнёрский пуш", "onboard_q": "Вопрос в онбординге", "proactive_preview": "Проактив: сухой прогон",
    "food_log": "Записала еду", "workout": "Отметила тренировку", "summary": "Открыла сводку", "checkin": "Чек-ин",
    "answer": "Вопрос в чате", "general": "Вопрос в чате", "webapp": "Вопрос в приложении", "command": "Команда бота", "voice": "Голосовое", "fallback": "Не поняла",
    "menu_replace": "Замена блюда", "summary_intent": "Запрос сводки", "custom_symptom": "Свой симптом",
}
def _ev_lbl(m):
    if not m: return "Прочее"
    if m.startswith("ci:e:"): return "Чек-ин: энергия"
    if m.startswith("ci:m:"): return "Чек-ин: настроение"
    if m.startswith("ci:s:"): return "Чек-ин: симптом"
    if m == "ci:done": return "Чек-ин: готово"
    if m.startswith("ci:"): return "Чек-ин"
    if m.startswith("tm:"): return "Время сводки"
    if m.startswith("q:"): return "Подсказка в чате"
    if m.startswith("web_period"): return "Отметка месячных"
    if m.startswith("view_"): return {"view_today": "Экран: Сегодня", "view_food": "Экран: Питание", "view_train": "Экран: Нагрузка", "view_stats": "Экран: Статистика", "view_chat": "Экран: Чат"}.get(m, "Экран: " + m[5:])
    if m.startswith("intent_"): return "Запрос: " + m[7:]
    if m.startswith("web_"): return _EV_LBL.get(m, "Приложение: " + m[4:])
    return _EV_LBL.get(m, m)

_TC_LBL = {"summary": "Сводки (утро)", "answer": "Ответы в чате", "menu": "Меню питания", "food_photo": "Фото еды",
           "food_text": "Еда текстом", "meal": "Замена блюда", "workout": "Разбор тренировки", "diary_reco": "Совет по дневнику",
           "webapp": "Чат в приложении", "training_section": "Разбор нагрузки", "partner_q": "Ответ партнёру",
           "today_note": "Сводка дня (ИИ)", "food_suggest": "Идеи по питанию", "training_today": "Нагрузка (ИИ)", "proactive_compose": "Проактив-сообщение", "memory_learn": "Память: запись (ИИ)", "menu": "Меню питания",
           "partner_brief": "Партнёрский пуш (ИИ)", "onboard_q": "Вопрос в онбординге", "proactive_preview": "Проактив: сухой прогон",
           "auto": "Память: запись (ИИ)"}
def _tc_lbl(m): return _TC_LBL.get(m, m or "прочее")
_TC_APP = ("menu", "food_photo", "food_text", "meal", "workout", "diary_reco", "webapp", "training_section", "today_note", "food_suggest", "training_today")
_TC_CHAT = ("answer", "general", "partner_q", "onboard_q")
def _tc_src(m):
    if m in _TC_APP: return "app"
    if m in _TC_CHAT: return "chat"
    if m in ("summary", "proactive_compose", "proactive_preview", "today_note", "memory_learn", "auto", "partner_brief"): return "auto"
    return "other"

def _feat_of(action, meta):
    """К какому разделу продукта относится событие — для подсчёта уникальных пользователей по фичам."""
    m = str(meta or "")
    if m in ("view_train", "web_training", "web_train_profile", "workout"): return "Нагрузка"
    if m in ("view_food", "web_food", "web_diary", "food_log", "web_meal_replace", "web_diary_del",
             "web_diary_edit", "web_diary_scale", "web_diary_slot") or m.startswith("food"): return "Питание"
    if m == "view_chat" or (action == "answered" and m in ("webapp", "answer", "general")): return "Чат"
    if m in ("view_stats", "web_partner"): return "Статистика"
    if m in ("view_today", "web_today", "web_checkin", "web_period") or m.startswith("ci:"): return "Сегодня"
    return None

def analytics_data(days=7, frm=None, to=None):
    """Чистый слой аналитики (спека v2). tool-calls = Σ calls (все хопы к модели)."""
    from collections import Counter, defaultdict
    ACTIVE = ("command", "button", "suggest", "manual", "answered", "voice", "fallback")
    APP_PREF = ("web_", "view_", "app_open")
    PUSH_META = ("sent", "checkin_push", "food_reminder_sent", "train_reminder_sent", "phase_push", "reactivation_sent", "announce_sent", "meno_update_sent")
    today = dtoday()
    try: days = int(days)
    except (TypeError, ValueError): days = 7
    if frm and to:
        try:
            since = date.fromisoformat(str(frm)); until = date.fromisoformat(str(to))
            if until < since: since, until = until, since
        except Exception:
            until = today; since = today - timedelta(days=max(1, min(180, days)) - 1)
    else:
        days = max(1, min(180, days)); until = today; since = today - timedelta(days=days - 1)
    span = (until - since).days + 1
    since_ts = datetime.combine(since, dtime.min).isoformat(); until_ts = datetime.combine(until, dtime.max).isoformat()
    def dparse(ts):
        try: return datetime.fromisoformat(ts).date()
        except Exception: return today
    c = db()
    users = c.execute("SELECT chat_id, created, mode FROM users").fetchall()
    evs = c.execute("SELECT chat_id, ts, action, tokens, meta, ms, calls FROM events WHERE ts>=? AND ts<=?", (since_ts, until_ts)).fetchall()
    partners = c.execute("SELECT partner_id, woman_id FROM partners").fetchall()
    wmin = datetime.combine(until - timedelta(days=120), dtime.min).isoformat()
    wide = c.execute("SELECT chat_id, ts, action FROM events WHERE ts>=? AND ts<=?", (wmin, until_ts)).fetchall()
    first_rows = c.execute("SELECT chat_id, MIN(ts) FROM events WHERE action IN ('command','button','suggest','manual','answered','voice','fallback') GROUP BY chat_id").fetchall()
    goalrows = c.execute("SELECT DISTINCT chat_id, meta FROM events WHERE action='goal'").fetchall()
    refrows = c.execute("SELECT source, chat_id, ts FROM referrals").fetchall()
    pmin = datetime.combine(since - timedelta(days=span), dtime.min).isoformat()
    pmax = datetime.combine(since - timedelta(days=1), dtime.max).isoformat()
    prev = c.execute("SELECT chat_id, ts, action, calls FROM events WHERE ts>=? AND ts<=?", (pmin, pmax)).fetchall()
    c.close()
    _ACT = ("command", "button", "suggest", "manual", "answered", "voice", "fallback")
    pv_events = 0; pv_tool = 0; pv_days = defaultdict(set)
    for cid, ts, action, calls in prev:
        if calls: pv_tool += calls
        if action in _ACT:
            pv_events += 1; pv_days[dparse(ts).isoformat()].add(cid)
    pv_aud = sum(len(x) for x in pv_days.values())
    umode = {cid: (m or "cycle") for cid, _, m in users}
    created_by = {}
    for cid, cr, _ in users:
        try: created_by[cid] = date.fromisoformat((cr or "")[:10])
        except Exception: pass
    active_by_day = defaultdict(set); events_by_day = Counter(); tool_by_day = Counter()
    ev_src = Counter(); actions = Counter(); tool_meta = Counter()
    answered = fallback = errors = tokens = tool_total = ev_total = 0
    lat = []; sess = defaultdict(list); modeseg = defaultdict(set); mode_active_day = defaultdict(lambda: defaultdict(set))
    bcast = Counter(); ans_by_day = Counter(); err_by_day = Counter(); tool_src = Counter()
    push_days = defaultdict(set); act_days = defaultdict(set); new_by_day = Counter(); gper = defaultdict(set)
    feat_users = defaultdict(set); feat_events = Counter()
    for cid, ts, action, tok, meta, ms, calls in evs:
        d = dparse(ts); iso = d.isoformat(); tokens += (tok or 0)
        if calls:
            tool_total += calls; tool_by_day[iso] += calls; tool_meta[meta or action] += calls; tool_src[_tc_src(meta or action)] += calls
        if action == "broadcast":
            bcast[meta or "unknown"] += 1
            if meta in PUSH_META: push_days[cid].add(d)
            continue
        if action == "answered":
            answered += 1; ans_by_day[iso] += 1
            if ms: lat.append(ms)
        elif action == "fallback": fallback += 1
        elif action == "error": errors += 1; err_by_day[iso] += 1
        elif action == "goal": gper[meta or ""].add(cid)
        if action in ACTIVE:
            ev_total += 1; events_by_day[iso] += 1; active_by_day[iso].add(cid); act_days[cid].add(d)
            actions[_ev_lbl(meta or action)] += 1
            _ft = _feat_of(action, meta)
            if _ft: feat_users[_ft].add(cid); feat_events[_ft] += 1
            m = umode.get(cid, "cycle"); mode_active_day[iso][m].add(cid); modeseg[m].add(cid)
            ev_src["app" if (meta and str(meta).startswith(APP_PREF)) else "chat"] += 1
            _st = datetime.fromisoformat(ts) if isinstance(ts, str) else ts
            # старые события писались без таймзоны, новые — с ней; без приведения их нельзя вычитать друг из друга
            if getattr(_st, "tzinfo", None) is not None: _st = _st.astimezone(TZ).replace(tzinfo=None)
            sess[cid].append(_st)
            if created_by.get(cid) == d: new_by_day[iso] += 1
    active_user_days = sum(len(x) for x in active_by_day.values())
    abw = defaultdict(set)
    for cid, ts, action in wide:
        if action in ACTIVE: abw[dparse(ts).isoformat()].add(cid)
    def win_union(dd, n):
        acc = set(); k = dd - timedelta(days=n - 1)
        while k <= dd: acc |= abw.get(k.isoformat(), set()); k += timedelta(days=1)
        return acc
    anchor = until
    dau = len(active_by_day.get(anchor.isoformat(), set())); wau = len(win_union(anchor, 7)); mau = len(win_union(anchor, 30))
    avg_dau = active_user_days / span if span else 0
    adays = defaultdict(set); fa = {}
    for cid, ts, action in wide:
        if action in ACTIVE: adays[cid].add(dparse(ts))
    for cid, mn in first_rows:
        if mn: fa[cid] = dparse(mn)
    def retention(n, rolling):
        elig = [cid for cid, f in fa.items() if n <= (today - f).days <= 90]
        if not elig: return None
        hit = 0
        for cid in elig:
            f = fa[cid]
            if rolling: hit += 1 if any((d - f).days >= n for d in adays.get(cid, ())) else 0
            else: hit += 1 if (f + timedelta(days=n)) in adays.get(cid, ()) else 0
        return round(hit / len(elig) * 100)
    GAP = 1800; sc = 0; slens = []; sevs = []
    for cid, tl in sess.items():
        tl.sort(); cur = []
        for t in tl:
            if cur and (t - cur[-1]).total_seconds() > GAP:
                sc += 1; slens.append((cur[-1] - cur[0]).total_seconds()); sevs.append(len(cur)); cur = []
            cur.append(t)
        if cur: sc += 1; slens.append((cur[-1] - cur[0]).total_seconds()); sevs.append(len(cur))
    popen = ptot = 0
    for cid, pd in push_days.items():
        for d in pd:
            ptot += 1
            if d in act_days.get(cid, set()): popen += 1
    gset = defaultdict(set)
    for cid, meta in goalrows: gset[meta].add(cid)
    ref_agg = {}
    for src, rcid, rts in refrows:
        a = ref_agg.setdefault(src or "(без метки)", [0, 0, 0])
        a[0] += 1
        try:
            if is_onboarded(row(rcid)): a[1] += 1
        except Exception: pass
        try:
            if since <= dparse(rts) <= until: a[2] += 1
        except Exception: pass
    referrals_out = [{"src": k, "total": v[0], "onboarded": v[1],
                      "conv": round(v[1] * 100 / v[0]) if v[0] else 0, "new_period": v[2]}
                     for k, v in sorted(ref_agg.items(), key=lambda x: -x[1][0])]
    def pct(a, pp):
        a = sorted(a); return a[min(len(a) - 1, int(len(a) * pp))] if a else 0
    onboarded = len(fa)
    new_users = sum(1 for cid, cr in created_by.items() if since <= cr <= until)
    active_period = len(set().union(*active_by_day.values()) if active_by_day else set())
    seg = []
    for m in sorted(modeseg, key=lambda x: -len(modeseg[x])):
        act = 0
        for iso, mm in mode_active_day.items(): act += len(mm.get(m, set()))
        seg.append({"mode": m, "users": sum(1 for c2, _, mo in users if (mo or "cycle") == m),
                    "active": len(modeseg[m]), "avg_dau": round(act / span, 1) if span else 0})
    PRICE = float(os.environ.get("AIWA_TOKEN_PRICE_USD", "0.5"))
    series = []; d = since
    while d <= until:
        iso = d.isoformat()
        series.append({"date": iso[5:], "full": iso,
            "dau": len(active_by_day.get(iso, set())), "wau": len(win_union(d, 7)), "mau": len(win_union(d, 30)),
            "events": events_by_day[iso], "toolcalls": tool_by_day[iso],
            "answered": ans_by_day[iso], "errors": err_by_day[iso], "new": new_by_day[iso],
            "stick": (round(len(active_by_day.get(iso, set())) / len(win_union(d, 30)) * 100) if len(win_union(d, 30)) else 0)})
        d += timedelta(days=1)
    ans_tot = answered + fallback + errors
    return {
        "since": since.isoformat(), "until": until.isoformat(), "span": span,
        "updated": datetime.now(TZ).strftime("%d.%m %H:%M"),
        "audience": {
            "dau": dau, "wau": wau, "mau": mau, "avg_dau": round(avg_dau, 1),
            "avg_wau": round(sum(x["wau"] for x in series) / len(series), 1) if series else 0,
            "stickiness": round(dau / mau * 100) if mau else 0,
            "users_total": len(users), "onboarded": onboarded, "new_users": new_users, "active_period": active_period,
            "partners": {"connected": len(partners), "women": len(set(p[1] for p in partners))},
            "segments": seg,
            "retention": {"d1": retention(1, False), "d7": retention(7, False), "d30": retention(30, False),
                          "roll_d1": retention(1, True), "roll_d7": retention(7, True), "roll_d30": retention(30, True)}},
        "engagement": {
            "events_total": ev_total, "toolcalls_total": tool_total, "active_user_days": active_user_days,
            "events_per_dau": round(ev_total / active_user_days, 2) if active_user_days else 0,
            "toolcalls_per_dau": round(tool_total / active_user_days, 2) if active_user_days else 0,
            "by_source": {"chat": ev_src.get("chat", 0), "app": ev_src.get("app", 0)},
            "actions_top": actions.most_common(12), "toolcalls_by_meta": [[_tc_lbl(k), v] for k, v in tool_meta.most_common(10)],
            "features": sorted([{"name": k, "users": len(v), "events": feat_events[k]} for k, v in feat_users.items()],
                               key=lambda x: -x["users"]),
            "sessions": {"count": sc, "per_dau": round(sc / active_user_days, 2) if active_user_days else 0,
                         "avg_len_min": round(sum(slens) / len(slens) / 60, 1) if slens else 0,
                         "events_per": round(sum(sevs) / len(sevs), 1) if sevs else 0}},
        "product": {
            "broadcasts": dict(bcast),
            "push_open": {"sent": ptot, "opened": popen, "rate": round(popen / ptot * 100) if ptot else 0},
            "funnel": {"new_users": new_users, "onboarded": active_period,
                       "got_summary": len(gper.get("summary", set())), "logged_food": len(gper.get("food_log", set())),
                       "logged_workout": len(gper.get("workout", set()))},
            "referrals": referrals_out,
            "adoption": {"food": len(gset.get("food_log", set())), "workout": len(gset.get("workout", set())),
                         "partner": len(set(p[1] for p in partners))}},
        "quality": {
            "answered": answered, "fallback": fallback, "errors": errors,
            "success_rate": round(answered / ans_tot * 100) if ans_tot else 0,
            "fallback_rate": round(fallback / ans_tot * 100) if ans_tot else 0,
            "error_rate": round(errors / ans_tot * 100) if ans_tot else 0,
            "p50": pct(lat, 0.5), "p95": pct(lat, 0.95),
            "tokens": tokens, "cost_usd": round(tokens / 1e6 * PRICE, 2)},
        "toolcalls_by_source": {"app": tool_src.get("app", 0), "chat": tool_src.get("chat", 0), "auto": tool_src.get("auto", 0), "other": tool_src.get("other", 0)},
        "growth": {
            "events": (round((ev_total - pv_events) / pv_events * 100) if pv_events else None),
            "toolcalls": (round((tool_total - pv_tool) / pv_tool * 100) if pv_tool else None),
            "avg_dau": (round((avg_dau - (pv_aud / span)) / (pv_aud / span) * 100) if pv_aud else None)},
        "series": series,
    }

async def _admin_stats(request):
    if not _admin_key_ok(request):
        return web.json_response({"error": "forbidden"}, status=403)
    qp = request.query
    d = await asyncio.to_thread(analytics_data, qp.get("days", 7), qp.get("from"), qp.get("to"))
    return web.json_response(d)

async def _admin_page(request):
    if not _admin_key_ok(request):
        return web.Response(text="forbidden", status=403)
    html_text = r"""<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AIWA · Аналитика</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
<style>
:root{--bg:#F6F8FA;--card:#fff;--ink:#14181F;--mut:#6B7280;--faint:#9AA3AF;--line:#E9ECF1;--blue:#2F6BED;--green:#1E9E54;--amber:#E8912A;--red:#DC5A5A;--violet:#7C5CD0}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,Inter,"Segoe UI",Arial,sans-serif}
.wrap{max-width:1180px;margin:0 auto;padding:20px 20px 70px}
.head{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
h1{font-size:20px;margin:0}
.per{color:var(--mut);font-size:12.5px}
.bar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:14px 0 4px}
.bar button,.bar input{border:1px solid var(--line);background:#fff;border-radius:9px;padding:7px 11px;font-size:13px;cursor:pointer;color:var(--ink)}
.bar input{cursor:text;width:140px}
.bar button.on{background:var(--ink);color:#fff;border-color:var(--ink)}
.bar .sp{flex:1}
.tabs{display:flex;gap:6px;margin:16px 0 18px;flex-wrap:wrap}
.tabs button{border:1px solid var(--line);background:#fff;border-radius:999px;padding:8px 16px;font-size:13.5px;font-weight:600;cursor:pointer;color:var(--mut)}
.tabs button.on{background:var(--blue);color:#fff;border-color:var(--blue)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px;margin-bottom:16px}
.mc{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 15px}
.ml{font-size:12px;color:var(--mut);font-weight:600;display:flex;align-items:center;gap:5px}
.mv{font-size:26px;font-weight:800;margin-top:5px;letter-spacing:-.02em;display:flex;align-items:baseline;gap:8px}
.ms{font-size:11.5px;color:var(--faint);margin-top:3px}
.chip{font-size:11px;font-weight:800;padding:2px 7px;border-radius:999px}
.chip.up{color:#0E7A3A;background:#E4F5EC}.chip.dn{color:#B33636;background:#FBE7E7}.chip.zero{color:var(--mut);background:var(--line)}
.ic{display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;border-radius:50%;background:var(--line);color:var(--mut);font-size:10px;font-style:italic;cursor:pointer;font-weight:800;user-select:none}
.chartcard{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px;margin-bottom:16px}
.ct{font-size:13px;font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:6px}
.tb{width:100%;border-collapse:collapse;background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:hidden;margin-bottom:16px}
.tb th{background:#FAFBFC;text-align:left;font-size:11px;color:var(--mut);font-weight:700;padding:9px 12px;text-transform:uppercase;letter-spacing:.03em}
.tb td{padding:9px 12px;font-size:13px;border-top:1px solid var(--line)}
.tb td:last-child,.tb th:last-child{text-align:right;font-variant-numeric:tabular-nums}
.sec-h{font-size:14px;font-weight:800;margin:22px 0 10px;display:flex;align-items:center;gap:6px}
.loading{color:var(--mut);padding:50px;text-align:center}
#defpop{position:absolute;display:none;max-width:300px;background:#111827;color:#fff;font-size:12px;line-height:1.5;padding:10px 12px;border-radius:10px;z-index:99;box-shadow:0 8px 24px rgba(0,0,0,.2)}
</style>
<div class="wrap">
 <div class="head"><h1>AIWA · Аналитика</h1><span class="per" id="per"></span></div>
 <div class="bar" id="bar">
   <button data-d="7">7 дней</button><button data-d="30">30 дней</button><button data-d="90">90 дней</button>
   <button id="yday">Вчера</button>
   <span style="color:var(--mut);font-size:12px">c</span><input type="date" id="from"><span style="color:var(--mut);font-size:12px">по</span><input type="date" id="to"><button id="apply">Применить</button>
   <span class="sp"></span><button id="csv">Excel (CSV)</button><button id="rl">Обновить</button>
 </div>
 <div class="tabs" id="tabs"></div>
 <div id="view" class="loading">Загрузка…</div>
</div>
<div id="defpop"></div>
<script>
var q=new URLSearchParams(location.search), key=q.get('key')||'', DAYS=Number(q.get('days'))||7, FROM=q.get('from')||'', TO=q.get('to')||'', D=null, TAB='aud', CH=[];
var C={dau:'#2F6BED',wau:'#1E9E54',mau:'#E8912A',stick:'#7C5CD0',ev:'#2F6BED',tc:'#7C5CD0',ans:'#1E9E54',err:'#DC5A5A'};
var DEF={
 dau:"Уникальные активные за день. Активный = минимум одно действие пользователя (кнопки, команды, ответы, голос, ручной ввод) в чате или приложении. Получение пуша активностью НЕ считается.",
 avgdau:"Средний DAU = сумма дневных DAU за период / число дней. Показатель за весь период, не за сегодня.",
 wau:"Уникальные активные за последние 7 дней (скользящее окно).",
 mau:"Уникальные активные за последние 30 дней (скользящее окно).",
 stick:"Липкость = DAU / MAU × 100%. Доля месячной аудитории, заходящей в конкретный день.",
 ret:"Rolling retention D_N: доля новых пользователей, кто был активен на N-й день после первого ИЛИ позже. Считается по когортам возрастом от N до 90 дней.",
 evdau:"Событий на DAU = все действия пользователя (чат + приложение) за период / активные·дни.",
 tcdau:"Тул-коллов на DAU = все вызовы модели (сумма calls, учтены все хопы одного запроса; фото ≈ 1) / активные·дни.",
 aud:"Активные·дни = сумма по дням числа активных пользователей за период (человеко-дни). Это знаменатель метрик «на DAU».",
 evtot:"Все пользовательские действия за период (чат + приложение).",
 tctot:"Все вызовы модели за период = сумма поля calls по всем событиям.",
 tcsrc:"Откуда пришли вызовы модели: приложение (меню, фото/текст еды, тренировки), чат (ответы), авто (утренние сводки).",
 succ:"Успешность = answered / (answered + fallback + errors) × 100%.",
 lat:"Латентность ответа модели: p50 (медиана) и p95 (почти худшее) по времени ответа.",
 push:"Конверсия пуш→открытие = доля отправленных пушей, после которых пользователь сделал действие в тот же день.",
 tok:"Токены модели за период и оценка стоимости по цене за 1M токенов.",
 grow:"WoW = рост относительно предыдущего периода такой же длины."
};
function esc(x){return String(x==null?'':x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function ic(d){return d?"<span class='ic' data-def=\""+esc(d)+"\">i</span>":"";}
function chip(g){if(g==null)return '';var c=g>0?'up':(g<0?'dn':'zero');var ar=g>0?'▲':(g<0?'▼':'■');return "<span class='chip "+c+"' title='WoW'>"+ar+" "+Math.abs(g)+"%</span>";}
function card(label,val,sub,def,growth){return "<div class='mc'><div class='ml'>"+label+ic(def)+"</div><div class='mv'>"+(val==null?'—':val)+(growth!==undefined?chip(growth):'')+"</div>"+(sub?"<div class='ms'>"+sub+"</div>":"")+"</div>";}
function tbl(head,rows){if(!rows||!rows.length)return "<div class='ms' style='margin-bottom:16px'>нет данных за период</div>";return "<table class='tb'><tr>"+head.map(function(h){return "<th>"+h+"</th>";}).join('')+"</tr>"+rows.map(function(r){return "<tr>"+r.map(function(c){return "<td>"+c+"</td>";}).join('')+"</tr>";}).join('')+"</table>";}
function chartCard(id,title,def){return "<div class='chartcard'><div class='ct'>"+title+ic(def)+"</div><div style='height:230px'><canvas id='"+id+"'></canvas></div></div>";}
function mkLine(id,keys){var el=document.getElementById(id);if(!el)return;if(!window.Chart){el.parentNode.innerHTML="<div class='ms'>График не отрисовался: не загрузился Chart.js с CDN. Все цифры выше корректны.</div>";return;}var labels=D.series.map(function(p){return p.date;});
 var ds=keys.map(function(k){return {label:k.label,data:D.series.map(function(p){return p[k.key]||0;}),borderColor:k.color,backgroundColor:k.color,tension:.3,pointRadius:3,pointHoverRadius:6,borderWidth:2,fill:false};});
 CH.push(new Chart(el,{type:'line',data:{labels:labels,datasets:ds},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{position:'bottom',labels:{boxWidth:12,font:{size:11}}},tooltip:{enabled:true}},scales:{y:{beginAtZero:true,grid:{color:'#EEF1F5'},ticks:{font:{size:11}}},x:{grid:{display:false},ticks:{font:{size:11},maxRotation:0,autoSkip:true,maxTicksLimit:9}}}}}));}
function clearCharts(){CH.forEach(function(c){try{c.destroy();}catch(e){}});CH=[];}
function pctv(x){return x==null?'—':x+'%';}
function bLbl(k){var M={'sent':'Утренняя сводка','queued':'Поставлено в очередь','blocked':'Бот заблокирован','checkin_push':'Пуш чек-ина','food_reminder_sent':'Пуш про питание','train_reminder_sent':'Пуш про тренировку','phase_push':'Смена фазы','reactivation_sent':'Реактивация','announce_sent':'Анонс','meno_update_sent':'Мено-дайджест'};if(M[k])return M[k];
 if(k&&k.indexOf('proactive:')===0){var S={'pms_soon':'скоро ПМС','no_move':'нет движения','low_energy':'мало энергии','felt_bad':'плохое самочувствие','low_protein':'мало белка','practice_eve':'вечерняя практика'};var s=k.slice(10);if(S[s])return 'Проактив: '+S[s];if(s.indexOf('streak_')===0)return 'Проактив: стрик '+s.slice(7)+' дн.';return 'Проактив: '+s;}
 return k;}
function render(){
 clearCharts();var v=document.getElementById('view');if(!D){v.textContent='нет данных';return;}v.className='';
 var g=D.growth||{};
 if(TAB==='aud'){
  var a=D.audience,h='';
  h+="<div class='grid'>"+
   card('Средний DAU',a.avg_dau,'за период',DEF.avgdau,g.avg_dau)+
   card('DAU за день',a.dau,'на '+D.until,DEF.dau)+
   card('WAU',a.wau,'7 дней',DEF.wau)+
   card('MAU',a.mau,'30 дней',DEF.mau)+
   card('Stickiness',a.stickiness+'%','DAU/MAU',DEF.stick)+
   card('Новых за период',a.new_users,'из '+a.users_total+' всего',null)+"</div>";
  h+=chartCard('cAud','Аудитория по дням',DEF.dau);
  h+=chartCard('cStick','Липкость по дням, %',DEF.stick);
  var r=a.retention;
  h+="<div class='sec-h'>Rolling retention"+ic(DEF.ret)+"</div>";
  h+="<div class='grid'>"+card('D1',pctv(r.roll_d1),'вернулись на 1-й день+',DEF.ret)+card('D7',pctv(r.roll_d7),'на 7-й день+',DEF.ret)+card('D30',pctv(r.roll_d30),'на 30-й день+',DEF.ret)+"</div>";
  h+="<div class='sec-h'>Сегменты по режиму</div>";
  h+=tbl(['Режим','Всего','Активных','Ср. DAU'],a.segments.map(function(s){return [s.mode,s.users,s.active,s.avg_dau];}));
  h+="<div class='grid'>"+card('Партнёров',a.partners.connected,'у '+a.partners.women+' женщин',null)+card('Активных за период',a.active_period,'уникальных',null)+"</div>";
  v.innerHTML=h;mkLine('cAud',[{key:'dau',label:'DAU',color:C.dau},{key:'wau',label:'WAU',color:C.wau},{key:'mau',label:'MAU',color:C.mau}]);mkLine('cStick',[{key:'stick',label:'Stickiness %',color:C.stick}]);
 } else if(TAB==='eng'){
  var e=D.engagement,ts=D.toolcalls_by_source||{},h='';
  h+="<div class='grid'>"+
   card('Событий на DAU',e.events_per_dau,e.events_total+' соб / '+e.active_user_days+' акт·дн',DEF.evdau,g.events)+
   card('Всего событий',e.events_total,'за период',DEF.evtot,g.events)+
   card('Активные·дни',e.active_user_days,'знаменатель «на DAU»',DEF.aud)+"</div>";
  h+=chartCard('cEng','События по дням',DEF.evtot);
  h+="<div class='sec-h'>Разделы: сколько людей пользуются"+ic('Уникальные пользователи за выбранный период, которые совершали действия в каждом разделе. Один человек может быть в нескольких разделах.')+"</div>";
  h+=tbl(['Раздел','Людей','Из активных','Событий'],(e.features||[]).map(function(x){var ap=D.audience&&D.audience.active_period;return [x.name,x.users,(ap?Math.round(x.users/ap*100)+'%':'—'),x.events];}));
  h+="<div class='sec-h'>События по источнику"+ic('Приложение vs чат — где пользователи совершают действия.')+"</div>";
  h+=tbl(['Источник','Событий'],[['Приложение',e.by_source.app],['Чат',e.by_source.chat]]);
  h+="<div class='sec-h'>Тул-коллы (вызовы модели)"+ic('Все обращения к модели: шаги агента (инструменты) + финальный ответ. Растут с агентными ответами.')+"</div>";
  h+="<div class='grid'>"+card('Тул-коллов на DAU',e.toolcalls_per_dau,e.toolcalls_total+' вызовов',DEF.tcdau,g.toolcalls)+card('Всего тул-коллов',e.toolcalls_total,'за период',null,g.toolcalls)+"</div>";
  h+=tbl(['Источник','Тул-коллов'],[['Приложение',ts.app||0],['Чат',ts.chat||0],['Авто/пуши',ts.auto||0],['Прочее',ts.other||0]]);
  h+="<div class='sec-h'>Тул-коллы по фиче</div>";
  h+=tbl(['Фича','Вызовов'],(e.toolcalls_by_meta||[]).map(function(x){return [x[0],x[1]];}));
  h+="<div class='sec-h'>Топ действий</div>";
  h+=tbl(['Действие','Кол-во'],e.actions_top.map(function(x){return [x[0],x[1]];}));
  var ss=e.sessions;
  h+="<div class='sec-h'>Сессии <span style='font-weight:600;color:var(--mut);font-size:12px'>(за период "+D.since+" → "+D.until+")</span></div>";
  h+="<div class='grid'>"+card('Сессий всего',ss.count,'',null)+card('Сессий/DAU',ss.per_dau,'',null)+card('Средняя длина',ss.avg_len_min+' мин','',null)+card('Действий/сессия',ss.events_per,'',null)+"</div>";
  v.innerHTML=h;mkLine('cEng',[{key:'events',label:'События',color:C.ev}]);
 } else if(TAB==='prod'){
  var pr=D.product,po=pr.push_open,h='';
  h+="<div class='grid'>"+card('Конверсия пуш→открытие',po.rate+'%',po.opened+' из '+po.sent+' пушей',DEF.push)+card('Отправлено пушей',po.sent,'за период',null)+"</div>";
  h+="<div class='sec-h'>Источники переходов"+ic('Реферальные метки из ссылок вида t.me/бот?start=МЕТКА. Первое касание: пользовательница закрепляется за той меткой, по которой пришла впервые. «Перешли» и «Настроили» — за всё время, «Новых» — за выбранный период.')+"</div>";
  h+=tbl(['Метка','Перешли','Настроили','Конверсия','Новых за период'],(pr.referrals||[]).map(function(r){return [esc(r.src),r.total,r.onboarded,r.conv+'%',r.new_period];}));
  h+="<div class='sec-h'>Рассылки по типам</div>";
  h+=tbl(['Тип','Кол-во'],Object.keys(pr.broadcasts).sort(function(a,b){return pr.broadcasts[b]-pr.broadcasts[a];}).map(function(k){return [bLbl(k),pr.broadcasts[k]];}));
  var f=pr.funnel;
  h+="<div class='sec-h'>Воронка за период"+ic('Все этапы считаются в выбранном периоде: новые пользователи → кто совершал действия → кто открывал сводку → кто записал еду → кто отметил тренировку.')+"</div>";
  h+=tbl(['Этап','Пользователей'],[['Новые за период',f.new_users],['Активные за период',f.onboarded],['Открывали сводку',f.got_summary],['Записали еду',f.logged_food],['Отметили тренировку',f.logged_workout]]);
  v.innerHTML=h;
 } else {
  var qd=D.quality,h='';
  h+="<div class='grid'>"+card('Успешность ответов',qd.success_rate+'%',qd.answered+' ответов',DEF.succ)+card('Фолбэки',qd.fallback,qd.fallback_rate+'% от попыток',null)+card('Ошибки',qd.errors,qd.error_rate+'% от попыток',null)+card('Латентность',qd.p50+' / '+qd.p95+' мс','p50 / p95',DEF.lat)+card('Токены',qd.tokens,'≈ $'+qd.cost_usd,DEF.tok)+"</div>";
  h+=chartCard('cQ','Ответы и ошибки по дням',DEF.succ);
  v.innerHTML=h;mkLine('cQ',[{key:'answered',label:'Ответы',color:C.ans},{key:'errors',label:'Ошибки',color:C.err}]);
 }
}
function tabsBar(){var t=[['aud','Аудитория'],['eng','Вовлечённость'],['prod','Продукт'],['qual','Качество']];document.getElementById('tabs').innerHTML=t.map(function(x){return "<button data-t='"+x[0]+"' class='"+(TAB===x[0]?'on':'')+"'>"+x[1]+"</button>";}).join('');document.querySelectorAll('#tabs button').forEach(function(b){b.onclick=function(){TAB=b.dataset.t;tabsBar();render();};});}
function bar(){
 document.querySelectorAll('#bar button[data-d]').forEach(function(b){b.classList.toggle('on',!FROM&&Number(b.dataset.d)===DAYS);b.onclick=function(){DAYS=Number(b.dataset.d);FROM='';TO='';q.set('days',DAYS);q.delete('from');q.delete('to');upURL();load();};});
 var fy=document.getElementById('from'),ty=document.getElementById('to');fy.value=FROM;ty.value=TO;
 document.getElementById('apply').onclick=function(){var a=fy.value,z=ty.value;if(a&&z){FROM=a;TO=z;q.set('from',a);q.set('to',z);q.delete('days');upURL();load();}else alert('Выбери обе даты');};
 document.getElementById('yday').onclick=function(){var y=new Date(Date.now()-864e5).toISOString().slice(0,10);FROM=y;TO=y;q.set('from',y);q.set('to',y);q.delete('days');upURL();load();};
 document.getElementById('rl').onclick=load;document.getElementById('csv').onclick=toCSV;
}
function upURL(){history.replaceState(null,'','?'+q.toString());}
function toCSV(){if(!D)return;var head=['date','dau','wau','mau','events','toolcalls','answered','errors','new','stickiness_pct'];var lines=[head.join(',')];D.series.forEach(function(p){lines.push([p.full,p.dau,p.wau,p.mau,p.events,p.toolcalls,p.answered,p.errors,p.new,p.stick].join(','));});var blob=new Blob(['﻿'+lines.join('\n')],{type:'text/csv;charset=utf-8'});var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='aiwa_analytics_'+D.since+'_'+D.until+'.csv';document.body.appendChild(a);a.click();a.remove();}
document.addEventListener('click',function(e){var pp=document.getElementById('defpop');if(e.target&&e.target.classList&&e.target.classList.contains('ic')){var r=e.target.getBoundingClientRect();pp.textContent=e.target.getAttribute('data-def')||'';pp.style.display='block';pp.style.left=Math.max(8,Math.min(window.innerWidth-312,r.left-140))+'px';pp.style.top=(r.bottom+window.scrollY+7)+'px';e.stopPropagation();}else{pp.style.display='none';}});
async function load(){var v=document.getElementById('view');v.className='loading';v.textContent='Собираю аналитику…';bar();tabsBar();try{var u='/api/admin_stats?key='+encodeURIComponent(key)+(FROM&&TO?('&from='+FROM+'&to='+TO):('&days='+DAYS));var r=await fetch(u);var d=await r.json();if(d.error){v.textContent='Нет доступа';return;}D=d;var span=d.span;document.getElementById('per').textContent='Период: '+d.since+' → '+d.until+' ('+span+' дн.) · обновлено '+d.updated;render();}catch(e){v.className='loading';v.textContent='Ошибка загрузки: '+e.message;}}
load();
</script>"""
    return web.Response(text=html_text, content_type="text/html")

def build_web():
    aio = web.Application(client_max_size=20 * 1024 * 1024)  # фото до ~20 МБ
    aio.router.add_get("/", _serve_index)
    aio.router.add_get("/health", lambda r: web.Response(text="ok " + AIWA_VERSION))
    aio.router.add_get("/admin", _admin_page)
    aio.router.add_get("/api/admin_stats", _admin_stats)
    aio.router.add_post("/api/data", _api_data)
    aio.router.add_post("/api/section", _api_section)
    aio.router.add_post("/api/today", _api_today)
    aio.router.add_post("/api/chat", _api_chat)
    aio.router.add_post("/api/voice", _api_voice)
    aio.router.add_post("/api/food_photo", _api_food_photo)
    aio.router.add_post("/api/food_text", _api_food_text)
    aio.router.add_post("/api/track", _api_track)
    aio.router.add_post("/api/train", _api_train)
    aio.router.add_post("/api/workout", _api_workout)
    aio.router.add_post("/api/train_profile", _api_train_profile)
    aio.router.add_post("/api/diary", _api_diary)
    aio.router.add_post("/api/diary_del", _api_diary_del)
    aio.router.add_post("/api/diary_scale", _api_diary_scale)
    aio.router.add_post("/api/diary_slot", _api_diary_slot)
    aio.router.add_post("/api/diary_edit", _api_diary_edit)
    aio.router.add_post("/api/food_manual", _api_food_manual)
    aio.router.add_post("/api/diary_reco", _api_diary_reco)
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
    app = Application.builder().token(os.environ["BOT_TOKEN"]).concurrent_updates(True).build()
    global BOT_APP; BOT_APP = app
    for cmd, fn in (("start", start), ("today", today), ("summary", today), ("id", id_cmd), ("calendar", calendar_cmd), ("checkin", checkin_cmd),
                    ("period", period_cmd), ("menu", menu), ("time", set_time_cmd), ("mode", mode_cmd), ("menutoday", menutoday_cmd),
                    ("profile", profile_cmd), ("guide", guide_cmd), ("about", about_cmd), ("report", report_cmd), ("partner", partner_cmd), ("unlink", unlink_cmd), ("addcycles", addcycles_cmd), ("app", app_cmd), ("stop", stop), ("help", help_cmd), ("stats", stats_cmd), ("probe", probe_cmd), ("broadcast_today", broadcast_today_cmd), ("meno_update", meno_update_cmd), ("announce", announce_cmd), ("proactive", proactive_cmd), ("refs", refs_cmd)):
        app.add_handler(CommandHandler(cmd, fn))
    app.add_error_handler(on_error)
    app.add_handler(CallbackQueryHandler(on_cb))
    app.add_handler(MessageHandler(filters.VOICE, on_voice))
    app.add_handler(MessageHandler(filters.PHOTO | filters.Document.IMAGE, on_photo))
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
