# -*- coding: utf-8 -*-
"""AIWA, Telegram-бот женского здоровья по циклу: сводка, инфографика, меню, чек-ин, история, статистика."""
import os, io, re, sqlite3, secrets, logging
from datetime import datetime, date, time as dtime
from zoneinfo import ZoneInfo

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, InputMediaPhoto
from telegram.constants import KeyboardButtonStyle as KBS
from telegram.ext import (Application, CommandHandler, MessageHandler,
                          CallbackQueryHandler, ContextTypes, filters)

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

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("aiwa")
TZ = ZoneInfo(os.environ.get("AIWA_TZ", "Europe/Moscow"))
DB = os.environ.get("AIWA_DB", "aiwa.db")
if os.path.dirname(DB): os.makedirs(os.path.dirname(DB), exist_ok=True)
AIWA_ADMIN = os.environ.get("AIWA_ADMIN")
DISCLAIMER = "AIWA не ставит диагнозы; при тревожных симптомах обратись к гинекологу."
EN = {1: "низкая", 2: "средняя", 3: "высокая"}
SYMPTOMS = [("cramps", "спазмы"), ("head", "головная боль"), ("bloat", "вздутие"),
            ("sweet", "тяга к сладкому"), ("anx", "тревожность"), ("tired", "усталость")]
SYM = dict(SYMPTOMS)

START_TEXT = ("🌸 Привет! Я AIWA, ИИ-ассистент женского здоровья по циклу. Цветок на логотипе, про то, чтобы расцветать в своём ритме. "
 "Каждое утро собираю сводку под твою фазу: тело, питание, тренировки, и отвечаю на любые вопросы про цикл и самочувствие.\n\n"
 "Чтобы я считала фазу и отвечала точно, укажи дату последних месячных: напиши её (например 25.05.2026) или нажми кнопку ниже.")
ABOUT_TEXT = ("🌸 Я AIWA (AI for Woman Awareness), ИИ-ассистент женского здоровья по циклу. Цветок на логотипе, про идею расцветать в своём ритме. "
 "Каждое утро собираю сводку под твою фазу: тело, питание, тренировки, и отвечаю на вопросы про цикл и самочувствие. Работаю на GigaChat.\n\n"
 "Открой Меню, чтобы увидеть всё, что я умею.")
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
        send_time TEXT DEFAULT '09:00', modules TEXT DEFAULT 'phase,general,food,training',
        state TEXT, pending_date TEXT, created TEXT)""")
    c.execute("CREATE TABLE IF NOT EXISTS sugg(id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, q TEXT)")
    c.execute("CREATE TABLE IF NOT EXISTS cycles(chat_id INTEGER, start_date TEXT, PRIMARY KEY(chat_id,start_date))")
    c.execute("""CREATE TABLE IF NOT EXISTS logs(chat_id INTEGER, log_date TEXT, energy INTEGER, mood INTEGER,
        symptoms TEXT, PRIMARY KEY(chat_id,log_date))""")
    c.execute("""CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER,
        ts TEXT, action TEXT, tokens INTEGER DEFAULT 0)""")
    c.execute("CREATE TABLE IF NOT EXISTS partners(partner_id INTEGER PRIMARY KEY, woman_id INTEGER, created TEXT)")
    for col in ("state TEXT", "pending_date TEXT", "height INTEGER", "weight REAL", "age INTEGER",
                "activity INTEGER", "diet TEXT", "partner_code TEXT"):
        try: c.execute(f"ALTER TABLE users ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    return c

def row(cid):
    c = db(); r = c.execute("SELECT chat_id,last_period,cycle_len,send_time,modules,state,pending_date,height,weight,age,activity,diet,partner_code FROM users WHERE chat_id=?", (cid,)).fetchone(); c.close()
    if not r: return None
    return {"chat_id": r[0], "last_period": r[1], "cycle_len": r[2], "send_time": r[3],
            "modules": (r[4] or "phase,general,food,training").split(","), "state": r[5], "pending_date": r[6],
            "height": r[7], "weight": r[8], "age": r[9], "activity": r[10], "diet": r[11] or "", "partner_code": r[12]}

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
    c = db(); c.execute("INSERT INTO events(chat_id,ts,action,tokens) VALUES(?,?,?,?)", (cid, datetime.now().isoformat(), action, int(tokens))); c.commit(); c.close()
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
DIET = [("veg", "Вегетарианство"), ("vegan", "Веган"), ("nolac", "Без лактозы"), ("noglu", "Без глютена"), ("nonuts", "Без орехов"), ("pesc", "Только рыба из мяса")]
DIETD = dict(DIET)
def profile_of(u):
    if u and u.get("height") and u.get("weight") and u.get("age"):
        return {"height": u["height"], "weight": u["weight"], "age": u["age"], "activity": u.get("activity") or 3, "diet": u.get("diet") or ""}
    return None
def diet_human(code_csv):
    if not code_csv: return "без ограничений"
    return ", ".join(DIETD.get(x, x) for x in code_csv.split(",") if x) or "без ограничений"
def profile_kcal(p):
    return calc_calories(p["height"], p["weight"], p["age"], p["activity"])

def match_meta(text):
    t = text.lower()
    if any(k in t for k in ("гигачат", "gigachat", "на чём ты работаешь", "на чем ты работаешь", "чём ты работаешь", "чем ты работаешь",
                            "какая модель", "что за модель", "на какой модели", "какая нейросеть", "какой ии", "что за нейросеть", "кто тебя сделал")): return "tech"
    if any(k in t for k in ("что такое айва", "что такое aiwa", "расскажи о себе", "кто ты", "о тебе", "про себя", "что ты умеешь", "ты кто")): return "about"
    if any(k in t for k in ("храните данные", "хранишь данные", "хранение данных", "мои данные", "персональные данные", "приватн", "конфиденц",
                            "что с данными", "безопасн", "удалить данные", "передаёте", "передаете данные", "данные в безопас")): return "privacy"
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

def is_onboarded(u): return u and u.get("last_period") and u.get("cycle_len")
def status_of(cid):
    u = row(cid)
    if not is_onboarded(u): return None, None
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
ONB_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Месячные начались сегодня", callback_data="onb_today")]])
PERIOD_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Начались сегодня", callback_data="period_today")]])
SKIP_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Пропустить", callback_data="prof_skip")]])
HIST_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("3 месяца", callback_data="rep:3"), InlineKeyboardButton("6 месяцев", callback_data="rep:6")],
    [InlineKeyboardButton("Весь период", callback_data="rep:all")],
])
ACT_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Сидячий", callback_data="act:1"), InlineKeyboardButton("Лёгкая", callback_data="act:2")],
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
    rows = [[B(t, f"q:{add_sugg(cid,t)}")] for t in items[:2]]
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
    await t.reply_text("Чтобы рекомендации были точными, сначала укажи дату последних месячных и длину цикла.", reply_markup=GATE_KB)
async def begin_onboard(cid, msg):
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
    usage = []; mdata = L.menu_today(st, profile=prof, target=target, usage=usage); ev(cid, "tokens", sum(usage))
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
        text = L.explain_section(st, "training", usage=usage)
        return await send_answer(context, cid, text, st, "нагрузка сегодня", usage=usage)
    if key == "food":
        await send_menu(context, cid)
        text = L.explain_section(st, "food", usage=usage)
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

async def send_answer(context, cid, text, st, basis_q, usage=None):
    if usage is None: usage = []
    kb = sugg_kb(cid, L.followups(st, basis_q, text, usage=usage))
    await context.bot.send_message(cid, text, reply_markup=kb)
    ev(cid, "tokens", sum(usage))

async def push_summary(context, cid, with_image=True):
    u, st = status_of(cid)
    if not st: return
    if st["status"] != "normal": return await send_delay(context, cid, st)
    if with_image: await send_infographic(context.bot, cid)
    usage = []
    body = L.generate_summary(st, u["modules"], hint=last_hint(cid), usage=usage)
    kb = summary_kb()
    await context.bot.send_message(cid, f"{body}\n\nAIWA · {DISCLAIMER}", reply_markup=kb)
    ev(cid, "tokens", sum(usage))

def schedule_daily(app, cid, hhmm):
    for j in app.job_queue.get_jobs_by_name(str(cid)): j.schedule_removal()
    h, m = map(int, hhmm.split(":")); app.job_queue.run_daily(daily_job, time=dtime(h, m, tzinfo=TZ), chat_id=cid, name=str(cid))
async def daily_job(context: ContextTypes.DEFAULT_TYPE):
    await push_summary(context, context.job.chat_id)
    await push_partner(context, context.job.chat_id)

def finish_onboarding(context, cid, last_period_iso, n):
    upsert(cid, last_period=last_period_iso, cycle_len=n, state=None, pending_date=None)
    cyc_add(cid, last_period_iso); schedule_daily(context.application, cid, row(cid)["send_time"] or "09:00")

async def welcome_finish(context, cid, msg):
    await msg.reply_text("Всё готово! Утреннюю сводку буду присылать каждый день в 09:00 (МСК), время меняется в Меню.")
    await push_summary(context, cid)
    await context.bot.send_message(cid, "📘 Есть гид про норму цикла: длина, фазы и когда к врачу.",
        reply_markup=InlineKeyboardMarkup([[B("Гид: норма цикла", "guides")]]))

async def send_report(context, cid, period):
    u, st = status_of(cid)
    if not st: return await context.bot.send_message(cid, "Сначала настрой цикл: /start.")
    if not RPT: return await context.bot.send_message(cid, "Выписка временно недоступна.")
    await context.bot.send_chat_action(cid, "upload_document")
    since, label = RPT.period_since(period)
    cycles = cycles_of(cid, since); logs = logs_of(cid, since)
    if u["last_period"] and u["last_period"] not in cycles:
        cycles = sorted(set(cycles + [u["last_period"]]))
    try:
        pdf = RPT.build_report({"cycles": cycles, "logs": logs, "st": st, "cycle_len": u["cycle_len"], "period_label": label})
        bio = io.BytesIO(pdf); bio.name = "AIWA_vypiska.pdf"
        await context.bot.send_document(cid, document=bio, filename="AIWA_vypiska.pdf",
            caption=f"📄 Выписка по циклу, {label.lower()}. Можно показать гинекологу.")
        ev(cid, "button")
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
    try:
        await context.bot.send_message(pid, partner_text(st, last_hint(woman_cid)))
    except Exception as e:
        log.warning("partner push: %s", e)

async def partner_entry(context, cid, msg):
    u = row(cid); code = u.get("partner_code")
    if not code:
        code = secrets.token_hex(4); set_partner_code(cid, code)
    link = f"https://t.me/{BOT_USERNAME}?start=p_{code}" if BOT_USERNAME else f"код подключения: {code}"
    connected = "Партнёр уже подключён. Отключить: /unlink" if partner_of(cid) else "Партнёр пока не подключён."
    await msg.reply_text(
        "👫 Партнёрский режим. Перешли партнёру ссылку ниже. Он откроет бота и каждое утро будет получать короткий апдейт: "
        "твоя фаза, настроение и что можно сделать или купить.\n\n"
        f"{link}\n\n{connected}")

async def partner_join(context, partner_cid, msg, code):
    woman = woman_by_code(code)
    if not woman:
        return await msg.reply_text("Ссылка недействительна. Попроси прислать новую через Меню, кнопка Партнёр.")
    if woman == partner_cid:
        return await msg.reply_text("Это твоя же ссылка, перешли её партнёру.")
    link_partner(partner_cid, woman)
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
    await update.message.reply_text("О чём рассказать сегодня?", reply_markup=MENU_KB)
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
            cyc_add(cid, d.isoformat()); upsert(cid, last_period=d.isoformat(), state=None)
            schedule_daily(context.application, cid, row(cid)["send_time"] or "09:00")
            return await update.message.reply_text(f"Отметила начало месячных: {d.strftime('%d.%m.%Y')}.")
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
    ev(update.effective_chat.id, "command")
    _, st = status_of(update.effective_chat.id)
    if not st: return await need_onboard(update.message)
    await send_menu(context, update.effective_chat.id)
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
async def stop(update, context):
    cid = update.effective_chat.id
    for j in context.application.job_queue.get_jobs_by_name(str(cid)): j.schedule_removal()
    del_user(cid); await update.message.reply_text("Отключила сводки и удалила данные. Вернуться: /start")
async def help_cmd(update, context):
    await update.message.reply_text("AIWA, помощник по циклу.\n/today сводка\n/menu кнопки\n/calendar календарь\n/checkin симптомы\n/period отметить месячные\n/profile данные для питания\n/report выписка для врача\n/partner подключить партнёра\n/time время\n/stop отключить")

# ---------- stats ----------
def aggregate_stats():
    from collections import defaultdict
    import statistics as ST
    c = db(); n_users = c.execute("SELECT COUNT(*) FROM users").fetchone()[0]
    rows = c.execute("SELECT chat_id,ts,action,tokens FROM events ORDER BY chat_id,ts").fetchall(); c.close()
    byu = defaultdict(list)
    for cid, ts, action, tok in rows: byu[cid].append((datetime.fromisoformat(ts), action, tok or 0))
    actions = {"manual": 0, "suggest": 0, "button": 0, "command": 0}; tokens = 0; msgs = 0
    sessions = 0; slens = []; sev = []; active7 = set(); now = datetime.now(); GAP = 1800
    for cid, evs in byu.items():
        cur = []
        for t, a, tok in evs:
            if a == "tokens": tokens += tok; continue
            if a in actions: actions[a] += 1; msgs += 1
            if (now - t).days < 7: active7.add(cid)
            if cur and (t - cur[-1]).total_seconds() > GAP:
                sessions += 1; slens.append((cur[-1] - cur[0]).total_seconds()); sev.append(len(cur)); cur = []
            cur.append(t)
        if cur: sessions += 1; slens.append((cur[-1] - cur[0]).total_seconds()); sev.append(len(cur))
    avg_slen = (ST.mean(slens) / 60 if slens else 0); avg_sev = (ST.mean(sev) if sev else 0)
    mpu = (msgs / n_users if n_users else 0); tot = sum(actions.values()) or 1
    mix = ", ".join(f"{k} {actions[k]} ({actions[k]*100//tot}%)" for k in ("manual", "suggest", "button", "command"))
    return ("Статистика AIWA\n"
            f"Пользователей: {n_users}, активных за 7 дней: {len(active7)}\n"
            f"Сессий: {sessions}, средняя длина {avg_slen:.1f} мин, событий на сессию {avg_sev:.1f}\n"
            f"Сообщений на пользователя: {mpu:.1f}\n"
            f"Ввод: {mix}\n"
            f"Токенов всего: {tokens}, на сообщение ~{tokens//(msgs or 1)}")
async def stats_cmd(update, context):
    cid = update.effective_chat.id
    if not AIWA_ADMIN:
        return await update.message.reply_text(f"Статистика закрыта. Твой chat id: {cid}. Задай в Railway переменную AIWA_ADMIN={cid}, и команда станет доступна только тебе.")
    if str(cid) != str(AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    await update.message.reply_text(aggregate_stats())

# ---------- text ----------
async def on_text(update, context):
    cid = update.effective_chat.id; u = row(cid); state = u["state"] if u else None; txt = update.message.text.strip()
    cem = [e.custom_emoji_id for e in (update.message.entities or []) if getattr(e, "custom_emoji_id", None)]
    if cem:
        return await update.message.reply_text("ID кастомных эмодзи:\n" + "\n".join(cem))

    if state == "await_date":
        d = parse_date(txt)
        if not d: return await update.message.reply_text("Не разобрала дату. Напиши в формате ДД.ММ.ГГГГ, например 25.05.2026, или нажми кнопку выше.")
        upsert(cid, pending_date=d.isoformat(), state="await_len")
        return await update.message.reply_text("Поняла. Какая у тебя средняя длина цикла в днях? (обычно 21-35, по умолчанию 28)")
    if state == "await_len":
        try:
            n = int(txt); assert 20 <= n <= 40
        except (ValueError, AssertionError):
            return await update.message.reply_text("Нужно число от 20 до 40. Если не знаешь, напиши 28.")
        finish_onboarding(context, cid, u["pending_date"], n)
        upsert(cid, state="await_profile")
        return await update.message.reply_text(
            "Цикл настроен. Осталось немного для персонального питания и калорий.\n\n"
            "Напиши через пробел рост (см), вес (кг) и возраст. Например: 168 60 30.", reply_markup=SKIP_KB)

    if state == "await_profile":
        nums = [p for p in re.split(r"[ ,;/]+", txt) if p]
        try:
            cm = float(nums[0]); kg = float(nums[1]); age = int(float(nums[2]))
            assert 120 < cm < 220 and 30 < kg < 250 and 10 < age < 80
        except Exception:
            return await update.message.reply_text("Нужно три числа: рост в см, вес в кг, возраст. Например 168 60 30. Или нажми «Пропустить».", reply_markup=SKIP_KB)
        upsert(cid, height=int(cm), weight=kg, age=age, state=None)
        return await update.message.reply_text("Принято. Насколько ты активна в среднем?", reply_markup=ACT_KB)

    if state == "await_time":
        hhmm = parse_time(txt)
        if hhmm:
            upsert(cid, send_time=hhmm, state=None); schedule_daily(context.application, cid, hhmm)
            return await update.message.reply_text(f"Время сводки: {hhmm} (МСК).")
        upsert(cid, state=None)
    elif state == "await_period_date":
        d = parse_date(txt)
        if d:
            cyc_add(cid, d.isoformat()); upsert(cid, last_period=d.isoformat(), state=None)
            schedule_daily(context.application, cid, row(cid)["send_time"] or "09:00")
            return await update.message.reply_text(f"Отметила начало месячных: {d.strftime('%d.%m.%Y')}.")
        upsert(cid, state=None)

    m = match_meta(txt)
    if m:
        return await update.message.reply_text({"about": ABOUT_TEXT, "privacy": PRIVACY_TEXT, "tech": TECH_TEXT}[m])

    low = txt.lower()
    if is_onboarded(u) and re.search(r"(где.*сводк|пришл\w*\s*сводк|покажи\s*сводк|моя\s*сводк|^сводк|что там сегодня|что сегодня по циклу)", low):
        ev(cid, "manual"); return await push_summary(context, cid)
    if is_onboarded(u) and re.search(r"(замен\w*|друго[ей]\w*\s+блюд\w*|другое на (завтрак|обед|ужин|перекус)|не нравит\w* блюд\w*|обнови\w* меню|пересобер\w* меню)", low):
        _, st = status_of(cid); ev(cid, "manual")
        return await send_menu(context, cid)
    if is_onboarded(u) and is_gibberish(txt):
        return await update.message.reply_text("Не поняла запрос. Напиши вопрос словами, например: «почему тянет на сладкое» или «какая тренировка сегодня».")

    if is_onboarded(u):
        _, st = status_of(cid); await context.bot.send_chat_action(cid, "typing"); ev(cid, "manual")
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
    if data == "keep": return await q.message.reply_text("О чём рассказать сегодня?", reply_markup=MENU_KB)
    if data == "onb_today":
        upsert(cid, pending_date=date.today().isoformat(), state="await_len")
        return await q.message.reply_text("Отметила начало месячных сегодня. Какая средняя длина цикла в днях? (обычно 21-35, по умолчанию 28)")
    if data == "prof_skip":
        upsert(cid, state=None); return await welcome_finish(context, cid, q.message)
    if data.startswith("act:"):
        upsert(cid, activity=int(data.split(":")[1]), state="await_diet")
        return await q.message.reply_text("Есть ограничения в еде? Отметь, что подходит, потом Готово.", reply_markup=diet_kb(set()))
    if data.startswith("diet:s:"):
        code = data.split(":")[2]; cur = set((row(cid).get("diet") or "").split(",")) - {""}
        cur.symmetric_difference_update({code}); upsert(cid, diet=",".join(sorted(cur)))
        return await q.edit_message_reply_markup(reply_markup=diet_kb(cur))
    if data == "diet:done":
        upsert(cid, state=None); return await welcome_finish(context, cid, q.message)
    ev(cid, "suggest" if data.startswith("q:") else "button")
    u, st = status_of(cid)
    if not st:
        return await need_onboard(q.message)
    today_s = date.today().isoformat()
    if data == "menu":
        await q.message.reply_text("О чём рассказать сегодня?", reply_markup=MENU_KB)
    elif data == "food":
        await send_section(context, cid, st, "food")
    elif data.startswith("sec:"):
        await send_section(context, cid, st, data.split(":")[1])
    elif data == "calendar":
        if st["status"] != "normal": await send_delay(context, cid, st)
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
        cyc_add(cid, today_s); upsert(cid, last_period=today_s, state=None); schedule_daily(context.application, cid, row(cid)["send_time"] or "09:00")
        await q.message.reply_text("Отметила начало месячных сегодня.")
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
        await q.edit_message_text("Записала. Учту в завтрашней сводке.")
    elif data.startswith("q:"):
        question = get_sugg(int(data.split(":")[1])) or "Расскажи про эту фазу"
        await context.bot.send_chat_action(cid, "typing")
        usage = []; ans = L.answer_question(st, question, usage=usage)
        await q.message.reply_text(f"❓ {question}")
        await send_answer(context, cid, ans, st, question, usage=usage)

async def on_error(update, context):
    log.error("handler error", exc_info=context.error)
    try:
        if isinstance(update, Update) and update.effective_chat:
            await context.bot.send_message(update.effective_chat.id, "Упс, что-то пошло не так. Попробуй ещё раз или нажми Меню.")
    except Exception: pass

async def on_startup(app):
    global BOT_USERNAME
    try: BOT_USERNAME = app.bot.username
    except Exception: BOT_USERNAME = None
    n = 0
    for cid in all_users(): schedule_daily(app, cid, row(cid)["send_time"] or "09:00"); n += 1
    log.info("Rescheduled %d", n)

def main():
    app = Application.builder().token(os.environ["BOT_TOKEN"]).post_init(on_startup).build()
    for cmd, fn in (("start", start), ("today", today), ("summary", today), ("calendar", calendar_cmd), ("checkin", checkin_cmd),
                    ("period", period_cmd), ("menu", menu), ("time", set_time_cmd), ("menutoday", menutoday_cmd),
                    ("profile", profile_cmd), ("guide", guide_cmd), ("about", about_cmd), ("report", report_cmd), ("partner", partner_cmd), ("unlink", unlink_cmd), ("stop", stop), ("help", help_cmd), ("stats", stats_cmd)):
        app.add_handler(CommandHandler(cmd, fn))
    app.add_error_handler(on_error)
    app.add_handler(CallbackQueryHandler(on_cb))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, on_text))
    log.info("AIWA bot starting..."); app.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == "__main__":
    main()
