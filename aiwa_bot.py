# -*- coding: utf-8 -*-
"""AIWA, Telegram-бот женского здоровья по циклу: сводка, инфографика, меню, чек-ин, история, статистика."""
import os, io, re, time, json, html, asyncio, sqlite3, secrets, logging, math, threading, queue, atexit, contextvars
import mimetypes
from collections import deque
from datetime import datetime, date, time as dtime, timedelta, timezone
from difflib import SequenceMatcher

def _load_secret_file(env_name):
    """Load a secret from a systemd/Docker credential without committing it."""
    if os.environ.get(env_name):
        return
    path = os.environ.get(env_name + "_FILE", "").strip()
    if not path:
        return
    try:
        with open(path, "r", encoding="utf-8") as secret_file:
            value = secret_file.read().strip()
    except OSError as exc:
        raise RuntimeError(f"cannot read {env_name}_FILE credential") from exc
    if value:
        os.environ[env_name] = value

_load_secret_file("BOT_TOKEN")

try:
    from zoneinfo import ZoneInfo
except ImportError:
    from datetime import timezone
    def ZoneInfo(name):
        return timezone(timedelta(hours=3)) if name == "Europe/Moscow" else timezone.utc

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, InputMediaPhoto, WebAppInfo, MenuButtonWebApp, BotCommand
from telegram.ext import (Application, CommandHandler, MessageHandler, TypeHandler,
                          CallbackQueryHandler, ContextTypes, AIORateLimiter, filters)
from telegram.error import BadRequest, TimedOut, NetworkError, RetryAfter, Forbidden
from aiohttp import web
import requests
import hmac as _hmac, hashlib as _hashlib
from urllib.parse import parse_qsl as _pqsl, urlsplit as _urlsplit, quote as _urlquote

mimetypes.add_type("image/webp", ".webp")

import cycle as C
import llm as L
import analytics_v2 as A2
import food_assets as FA
import portability
# Реестр действий и общий сбор параметров. Зависимость строго односторонняя:
# dialog ничего не знает про aiwa_bot, поэтому истории с двойной загрузкой
# модуля под `python aiwa_bot.py` тут возникнуть не может.
import dialog

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
APP_READY = False
BCAST_Q = None  # очередь утренней рассылки (троттлинг под лимиты LLM-провайдера)
BCAST_PENDING = set()
FOOD_Q = None   # очередь обеденного пуша про еду
FOOD_PENDING = set()
TRAIN_Q = None  # очередь вечернего пуша про тренировку
TRAIN_PENDING = set()
ANNOUNCE_WAIT = set()   # админы в режиме рассылки: ждём следующее сообщение и копируем всем
ALERT_LAST = {}
CHAT_HIST = {}  # cid -> deque последних реплик диалога (память контекста)
def hist_get(cid, male=False):
    mem = list(CHAT_HIST.get(cid, []))
    if mem and male:
        mem = _male_safe_history(mem, text_key="content")
    if mem:
        return mem
    try:
        out = []
        for m in chatlog_get(cid, 8):
            role = "assistant" if m.get("role") in ("ai", "assistant") else "user"
            out.append({"role": role, "content": (m.get("text") or "")[:1200]})
        if male:
            out = _male_safe_history(out, text_key="content")
        if out:
            dq = CHAT_HIST.setdefault(cid, deque(maxlen=6))
            for x in out[-6:]: dq.append(x)
            return list(dq)
    except Exception:
        pass
    return []
def hist_push(cid, q, a):
    if not _user_write_allowed(cid):
        return False
    dq = CHAT_HIST.setdefault(cid, deque(maxlen=6))
    clean = a
    try: clean = L.split_followups(a)[0]
    except Exception: pass
    clean = guard_aiwa_reply(cid, clean)
    dq.append({"role": "user", "content": q[:600]}); dq.append({"role": "assistant", "content": (clean or a)[:1200]})
    try: chatlog_add(cid, "user", q[:1000]); chatlog_add(cid, "ai", (clean or a)[:1500])
    except Exception: pass
    return True

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
# httpx логирует полный URL с токеном бота на уровне INFO — глушим, чтобы токен не утекал в логи
logging.getLogger("httpx").setLevel(logging.WARNING)
# APScheduler emits one INFO line per restored user job during startup. At
# production scale this hides actionable logs and can trigger provider log
# rate-limits; warnings and errors remain visible.
logging.getLogger("apscheduler").setLevel(logging.WARNING)
log = logging.getLogger("aiwa")
TZ = ZoneInfo(os.environ.get("AIWA_TZ", "Europe/Moscow"))
def dtoday():
    """«Сегодня» в часовом поясе пользовательниц (МСК), а не сервера: Railway живёт в UTC,
    и серверная дата после полуночи по Москве ещё показывает вчера."""
    return datetime.now(TZ).date()

READ_HISTORY_DAYS = 364
WORKOUT_WRITE_DAYS = 90

def _api_error_payload(code, text):
    return {"ok": False, "error": code, "text": text, "message": text}

def _validated_moscow_iso(value, *, max_age=None, field="date"):
    """Validate one absolute calendar day against Moscow's current date.

    `date.fromisoformat` accepts a few compact ISO variants; public API dates
    deliberately do not.  The web app and persisted rows share the canonical
    YYYY-MM-DD form, so accepting anything else would reintroduce the old
    silent-today fallback at a boundary.
    """
    raw = value if isinstance(value, str) else ""
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", raw):
        return None, _api_error_payload(
            "invalid_date", f"Поле {field}: укажи дату в формате ГГГГ-ММ-ДД."
        ), 400
    try:
        parsed = date.fromisoformat(raw)
    except ValueError:
        return None, _api_error_payload(
            "invalid_date", f"Поле {field}: такой даты не существует."
        ), 400
    today = dtoday()
    if parsed > today:
        return None, _api_error_payload(
            "future_date", "Нельзя сохранять или читать данные из будущего."
        ), 400
    if max_age is not None and (today - parsed).days > int(max_age):
        return None, _api_error_payload(
            "date_out_of_range",
            f"Дата должна быть не старше {int(max_age)} дней.",
        ), 400
    return parsed, None, 200

def _strict_integer(value):
    if isinstance(value, bool):
        raise ValueError("boolean is not an integer")
    number = float(str(value).strip().replace(",", "."))
    if not math.isfinite(number) or not number.is_integer():
        raise ValueError("not an exact integer")
    return int(number)
DB = os.environ.get("AIWA_DB") or ("/data/aiwa.db" if os.path.isdir("/data") else "aiwa.db")
if os.path.dirname(DB): os.makedirs(os.path.dirname(DB), exist_ok=True)
L.set_usage_sink(lambda record: A2.persist_llm_call(DB, record))
AIWA_ADMIN = os.environ.get("AIWA_ADMIN")
DISCLAIMER = "AIWA не ставит диагнозы; при тревожных симптомах обратись к гинекологу."
AIWA_VERSION = os.environ.get(
    "AIWA_VERSION", "2026-07-29-v180-cx-day-diary"
)
print("AIWA_VERSION:", AIWA_VERSION)  # видно в Railway logs при старте

def _detected_release_sha(environ=None, source_path=None):
    env = environ if environ is not None else os.environ
    real_source = os.path.realpath(source_path or __file__)
    source_dir = os.path.dirname(real_source)
    release_parent = os.path.dirname(source_dir)
    path_release = None
    if (
        os.path.basename(real_source) == "aiwa_bot.py"
        and os.path.basename(release_parent) == "releases"
    ):
        path_release = os.path.basename(source_dir)
    candidates = (
        env.get("AIWA_RELEASE_SHA"),
        env.get("RAILWAY_GIT_COMMIT_SHA"),
        path_release,
    )
    for candidate in candidates:
        value = str(candidate or "").strip().lower()
        if re.fullmatch(r"[0-9a-f]{40}", value):
            return value
    return ""

AIWA_RELEASE_SHA = _detected_release_sha()
print("AIWA_RELEASE_SHA:", AIWA_RELEASE_SHA or "unknown")
AIWA_WEBAPP_URL = os.environ.get("AIWA_WEBAPP_URL", "")

def _validated_telegram_api_origin(raw):
    origin = str(raw or "https://api.telegram.org").rstrip("/")
    parsed = _urlsplit(origin)
    if (
        parsed.scheme != "https"
        or parsed.hostname != "api.telegram.org"
        or parsed.username is not None
        or parsed.password is not None
        or parsed.path not in ("", "/")
        or parsed.query
        or parsed.fragment
        or parsed.port not in (None, 443, 8443)
    ):
        raise RuntimeError(
            "AIWA_TELEGRAM_API_ORIGIN must be the trusted HTTPS Telegram API host"
        )
    return origin

AIWA_TELEGRAM_API_ORIGIN = _validated_telegram_api_origin(
    os.environ.get("AIWA_TELEGRAM_API_ORIGIN")
)
APP_BUTTON_TEXT = "Открыть Айву"
APP_MENU_BUTTON_TEXT = "Айва"
APP_CTA_HTML = "<b>Приложение Айвы</b>: календарь, симптомы, питание с заменой блюд, нагрузка и статистика. Открой кнопкой ниже."
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
    # Health data must not travel in URLs: it leaks into browser history,
    # access logs and referrers. The authenticated /api/data response already
    # provides everything the mini app needs.
    # Новый мини-апп — дефолт для всех; при аварийном откате отдаём старый фронт.
    if not redesign_on(u.get("chat_id") if u else None):
        return AIWA_WEBAPP_URL.rstrip("/") + "/?ui=1"
    return AIWA_WEBAPP_URL
def campaign_id(kind):
    """Stable, non-sensitive daily campaign id for push attribution."""
    kind = re.sub(r"[^a-z0-9_:-]", "", str(kind or "push").lower())[:40] or "push"
    return f"{kind}:{dtoday().isoformat()}"
def campaign_webapp_url(u, campaign=None, tab=None):
    url = webapp_url(u) or AIWA_WEBAPP_URL
    if not url: return None
    params = []
    if campaign: params.append("campaign=" + _urlquote(str(campaign)[:80], safe=":_-"))
    if tab: params.append("tab=" + _urlquote(str(tab)[:20], safe="_-"))
    if not params: return url
    return url + ("&" if "?" in url else "?") + "&".join(params)
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
# Existing Mini App controls expose a richer set than the compact Telegram
# keyboard.  Accept those codes in APIs and labels without expanding the bot's
# established six-button check-in flow.
WEBAPP_SYMPTOMS = [("breast", "боль в груди"), ("back", "боль в пояснице"),
                   ("irrit", "раздражительность"), ("low", "апатия"),
                   ("swell", "отёки"), ("skin", "высыпания"),
                   ("insomnia", "плохой сон"), ("stress", "стресс"),
                   ("soreness", "крепатура")]
MENO_SYMPTOMS = [("meno_hot", "приливы"), ("meno_night", "ночная потливость"), ("meno_sleep", "плохой сон"),
                 ("meno_mood", "тревожность"), ("meno_dry", "сухость"), ("meno_heart", "сердцебиение"),
                 ("meno_joint", "суставы"), ("meno_brain", "туман в голове"), ("meno_weight", "изменение веса")]
PREG_SYMPTOMS = [("preg_nausea", "тошнота"), ("preg_heartburn", "изжога"), ("preg_swelling", "отёки"),
                 ("preg_back", "боль в спине"), ("preg_move", "шевеления"), ("preg_tired", "усталость"),
                 ("preg_sleep", "плохой сон"), ("preg_cramp", "тянет живот")]
SYM = dict(SYMPTOMS + WEBAPP_SYMPTOMS + MENO_SYMPTOMS + PREG_SYMPTOMS)
def clean_custom_symptom(text):
    s = re.sub(r"\s+", " ", (text or "").strip().lower())
    s = re.sub(r"[^0-9a-zа-яё ,.+()/-]", "", s, flags=re.I).strip(" ,.-")
    # `logs.symptoms` is a legacy comma-delimited column. Keep one free-text
    # symptom atomic by normalizing its internal delimiter before persistence.
    s = re.sub(r"\s*,\s*", " / ", s)
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

START_TEXT = ("Привет, это Айва — ИИ wellness-ассистент про самочувствие, питание и нагрузку.\n\n"
 "Внутри:\n"
 "• утренняя сводка под твоё состояние\n"
 "• персональное меню и тренировки на день\n"
 "• ответы на вопросы о здоровье — текстом или голосом\n"
 "• дневник еды, можно просто по фото\n"
 "• календарь цикла и поддержка на каждую фазу — для женщин\n"
 "• выписка для врача\n\n"
 "Настройка займёт около минуты. Кто ты?")

FEMALE_START_TEXT = ("Принято. Что ближе?")
ABOUT_TEXT = ("Я Айва — ИИ wellness-ассистент: самочувствие, питание, нагрузка; для женщин — цикл и календарь.\n\n"
 "Что я умею:\n"
 "• веду календарь цикла и присылаю утреннюю сводку под фазу\n"
 "• подбираю питание и тренировки\n"
 "• отвечаю на вопросы о здоровье — текстом или голосом\n"
 "• веду дневник еды, можно по фото\n"
 "• отслеживаю симптомы и самочувствие\n"
 "• собираю выписку для врача\n"
 "• подсказываю партнёру, как поддержать\n\n"
 "Опираюсь на медицинские рекомендации и твои отметки. Быстрые действия — в Меню, календарь и разделы — в приложении.")
PRIVACY_TEXT = ("🔒 Про данные: Айва хранит данные профиля и отмеченные тобой сведения о цикле, самочувствии, питании, "
 "нагрузке и переписке, чтобы персонализировать ответы и работу приложения. Для генерации ответов, распознавания фото и речи "
 "необходимые данные могут передаваться подключённым ИИ- и речевым провайдерам. Данные не используются Айвой для рекламы. "
 "Удалить сохранённые данные и отключиться можно командой /stop в любой момент.")
MALE_ABOUT_TEXT = (
    "Я Айва — ИИ wellness-ассистент: самочувствие, питание и нагрузка.\n\n"
    "Я подбираю питание и тренировки, отвечаю на вопросы о здоровье текстом "
    "или голосом, веду дневники еды и активности, отслеживаю самочувствие и "
    "собираю выписку для врача.\n\n"
    "Опираюсь на медицинские рекомендации и твои отметки."
)
MALE_PRIVACY_TEXT = (
    "🔒 Про данные: Айва хранит данные профиля и отмеченные тобой сведения о "
    "самочувствии, питании, нагрузке и переписке, чтобы персонализировать ответы "
    "и приложение. Для генерации ответов, распознавания фото и речи необходимая "
    "часть запроса может передаваться подключённым ИИ- и речевым провайдерам. "
    "Данные не используются Айвой для рекламы. Удалить их можно командой /stop."
)
PARTNER_HELLO = ("Ты подключился как партнёр в Айве.\n\n"
 "Каждое утро буду присылать короткую сводку:\n"
 "• что сейчас с её самочувствием\n"
 "• как поддержать\n"
 "• что предложить из еды или быта\n"
 "• один факт про цикл и женское здоровье\n\n"
 "Её календарь и личные разделы тебе не видны — только сводка поддержки. Отключить: /unlink")
PARTNER_INFO = ("Ты в партнёрском режиме Айвы: каждое утро приходит сводка о её самочувствии и о том, как поддержать. "
 "Своего меню и календаря здесь нет — они в её приложении. Отключить: /unlink")
TECH_TEXT = ("🤖 Я работаю на современных больших языковых моделях и речевых сервисах: они помогают мне собирать сводки, "
 "отвечать на вопросы, распознавать фото еды и голосовые. Необходимая часть запроса передаётся соответствующему ИИ-провайдеру, "
 "конкретные модели могут меняться — я выбираю те, что отвечают точнее и быстрее. "
 "Сохранённые в Айве данные можно удалить командой /stop.")

def meta_text_for(u, kind):
    if is_male_profile(u):
        return {
            "about": MALE_ABOUT_TEXT,
            "privacy": MALE_PRIVACY_TEXT,
            "tech": TECH_TEXT,
        }[kind]
    return {"about": ABOUT_TEXT, "privacy": PRIVACY_TEXT, "tech": TECH_TEXT}[kind]

def partner_hello_for(u):
    if is_male_profile(u):
        return (
            "Ты подключился как партнёр в Айве.\n\n"
            "Каждое утро буду присылать короткую сводку о его самочувствии и "
            "нагрузке и о том, как поддержать. Личные разделы тебе не видны. "
            "Отключить: /unlink"
        )
    return PARTNER_HELLO

def partner_info_for(partner_cid):
    owner = row(woman_of_partner(partner_cid))
    if is_male_profile(owner):
        return (
            "Ты в партнёрском режиме Айвы: здесь приходит короткая сводка о "
            "его самочувствии и о том, как поддержать. Личные разделы доступны "
            "только владельцу профиля. Отключить: /unlink"
        )
    return PARTNER_INFO
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
_DB_SCHEMA_LOCK = threading.Lock()
_DB_SCHEMA_PATH = None

def _connect_db():
    c = sqlite3.connect(DB, timeout=30)
    c.execute("PRAGMA busy_timeout=30000")
    return c

def _migrate_db():
    """Run schema creation/migrations and release the lock on every failure."""
    c = _connect_db()
    try:
        return _migrate_db_on_connection(c)
    except BaseException:
        try:
            c.rollback()
        finally:
            c.close()
        raise

def _migrate_db_on_connection(c):
    """Apply idempotent DDL under SQLite's cross-process write lock."""
    c.execute("PRAGMA journal_mode=WAL")
    c.execute("PRAGMA synchronous=NORMAL")
    # The Python lock below coordinates threads in this process. BEGIN IMMEDIATE
    # additionally serializes schema work against a concurrently starting
    # process (for example an overlapping Railway replacement).
    c.execute("BEGIN IMMEDIATE")
    c.execute("""CREATE TABLE IF NOT EXISTS users(chat_id INTEGER PRIMARY KEY, last_period TEXT, cycle_len INTEGER,
        send_time TEXT DEFAULT '08:00', daily_summary_enabled INTEGER DEFAULT 1,
        modules TEXT DEFAULT 'phase,general,food,training',
        state TEXT, pending_date TEXT, created TEXT,
        onboarding_started INTEGER DEFAULT 0)""")
    c.execute("""CREATE TABLE IF NOT EXISTS schema_migrations(
        name TEXT PRIMARY KEY, applied_at TEXT NOT NULL)""")
    c.execute("CREATE TABLE IF NOT EXISTS sugg(id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, q TEXT)")
    c.execute("CREATE TABLE IF NOT EXISTS cycles(chat_id INTEGER, start_date TEXT, PRIMARY KEY(chat_id,start_date))")
    c.execute("CREATE TABLE IF NOT EXISTS intimacy(chat_id INTEGER, d TEXT, PRIMARY KEY(chat_id,d))")
    c.execute("CREATE TABLE IF NOT EXISTS chat_log(id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER, ts TEXT, role TEXT, text TEXT)")
    c.execute("""CREATE TABLE IF NOT EXISTS logs(chat_id INTEGER, log_date TEXT, energy INTEGER, mood INTEGER,
        symptoms TEXT, PRIMARY KEY(chat_id,log_date))""")
    c.execute("""CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY AUTOINCREMENT, chat_id INTEGER,
        ts TEXT, action TEXT, tokens INTEGER DEFAULT 0)""")
    c.execute("CREATE TABLE IF NOT EXISTS partners(partner_id INTEGER PRIMARY KEY, woman_id INTEGER, created TEXT)")
    # Дневной кэш генераций (меню, сводка, рецепты, недельный разбор) — переживает рестарты процесса.
    c.execute("CREATE TABLE IF NOT EXISTS day_cache(chat_id INTEGER, d TEXT, kind TEXT, k TEXT, js TEXT, PRIMARY KEY(chat_id,d,kind,k))")
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
    c.execute("""CREATE TABLE IF NOT EXISTS push_deliveries(
        chat_id INTEGER NOT NULL,
        campaign_id TEXT NOT NULL,
        status TEXT NOT NULL,
        claimed_at TEXT NOT NULL,
        sent_at TEXT,
        PRIMARY KEY(chat_id, campaign_id))""")
    c.execute("""CREATE TABLE IF NOT EXISTS prepared_summaries(
        chat_id INTEGER NOT NULL,
        summary_date TEXT NOT NULL,
        context_key TEXT NOT NULL,
        body TEXT NOT NULL,
        prepared_at TEXT NOT NULL,
        PRIMARY KEY(chat_id, summary_date))""")
    c.execute("""CREATE TABLE IF NOT EXISTS feedback_requests(
        chat_id INTEGER NOT NULL,
        answer_id TEXT NOT NULL,
        channel TEXT NOT NULL,
        created_at TEXT NOT NULL,
        rating TEXT,
        submitted_at TEXT,
        PRIMARY KEY(chat_id, answer_id))""")
    c.execute("""CREATE TABLE IF NOT EXISTS chat_mutations(
        chat_id INTEGER NOT NULL,
        mutation_key TEXT NOT NULL,
        generation INTEGER NOT NULL,
        kind TEXT NOT NULL,
        record_id TEXT,
        args_hash TEXT,
        result_json TEXT,
        created_at TEXT NOT NULL,
        reversed_at TEXT,
        PRIMARY KEY(chat_id, mutation_key))""")
    c.execute("""CREATE TABLE IF NOT EXISTS ai_jobs(
        job_id TEXT PRIMARY KEY,
        chat_id INTEGER NOT NULL,
        user_generation INTEGER NOT NULL DEFAULT 0,
        kind TEXT NOT NULL,
        dedupe_key TEXT NOT NULL UNIQUE,
        priority INTEGER NOT NULL DEFAULT 100,
        status TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        result_json TEXT,
        attempts INTEGER NOT NULL DEFAULT 0,
        last_error_class TEXT,
        created_at TEXT NOT NULL,
        available_at TEXT NOT NULL,
        started_at TEXT,
        finished_at TEXT,
        expires_at TEXT,
        reported_cost REAL DEFAULT 0
    )""")
    c.execute("""CREATE TABLE IF NOT EXISTS food_assets(
        canonical_id TEXT NOT NULL,
        style_version TEXT NOT NULL,
        canonical_label TEXT NOT NULL,
        status TEXT NOT NULL,
        source TEXT NOT NULL,
        image_url TEXT,
        content_hash TEXT,
        prompt_version TEXT,
        retry_after TEXT,
        last_error_class TEXT,
        updated_at TEXT NOT NULL,
        PRIMARY KEY(canonical_id,style_version)
    )""")
    c.execute("""CREATE TABLE IF NOT EXISTS food_asset_jobs(
        job_id TEXT PRIMARY KEY,
        canonical_id TEXT NOT NULL,
        style_version TEXT NOT NULL,
        canonical_label TEXT NOT NULL,
        status TEXT NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        available_at TEXT NOT NULL,
        started_at TEXT,
        finished_at TEXT,
        last_error_class TEXT,
        UNIQUE(canonical_id,style_version)
    )""")
    c.execute("""CREATE TABLE IF NOT EXISTS food_asset_attempts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        job_id TEXT NOT NULL,
        started_at TEXT NOT NULL
    )""")
    _catalog_now = datetime.now(TZ).isoformat()
    for _catalog_label, _catalog_url in FA.RESOLVER.manifest.items():
        c.execute(
            """INSERT OR IGNORE INTO food_assets(
                   canonical_id,style_version,canonical_label,status,source,
                   image_url,updated_at
               ) VALUES(?,?,?,?,?,?,?)""",
            (
                FA.canonical_id(_catalog_label), FA.STYLE_VERSION,
                _catalog_label, "ready", "catalog", _catalog_url, _catalog_now,
            ),
        )
    if FA.validation_enabled():
        # Assets produced before the semantic quality gate are not trusted.
        # Keep immutable files for rollback/audit, but stop publishing them and
        # make their durable jobs eligible for validated regeneration.
        _legacy_generated = [
            item[0]
            for item in c.execute(
                """SELECT canonical_id FROM food_assets
                   WHERE source='generated' AND status='ready'
                     AND COALESCE(prompt_version,'')!=?""",
                (FA.GENERATED_PROMPT_VERSION,),
            ).fetchall()
        ]
        if _legacy_generated:
            _legacy_now = datetime.now(TZ).isoformat()
            c.executemany(
                """UPDATE food_assets SET status='rejected',image_url=NULL,
                          content_hash=NULL,retry_after=NULL,
                          last_error_class='legacy_unvalidated',
                          updated_at=?
                   WHERE canonical_id=? AND source='generated'""",
                ((_legacy_now, food_id) for food_id in _legacy_generated),
            )
            c.executemany(
                """UPDATE food_asset_jobs SET status='rejected',
                          last_error_class='legacy_unvalidated'
                   WHERE canonical_id=?""",
                ((food_id,) for food_id in _legacy_generated),
            )
    A2.init_schema(c)
    for col in ("meta TEXT", "ms INTEGER DEFAULT 0", "n INTEGER DEFAULT 0", "calls INTEGER DEFAULT 0",
                "tok_in INTEGER DEFAULT 0", "tok_out INTEGER DEFAULT 0", "model TEXT"):
        try: c.execute(f"ALTER TABLE events ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    for col in ("end_date TEXT",):
        try: c.execute(f"ALTER TABLE cycles ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    try: c.execute("ALTER TABLE meals ADD COLUMN slot TEXT")
    except sqlite3.OperationalError: pass
    try: c.execute("ALTER TABLE meals ADD COLUMN fclass TEXT")
    except sqlite3.OperationalError: pass
    # True only when the slot came from server time rather than user meaning.
    try: c.execute("ALTER TABLE meals ADD COLUMN slot_guessed INTEGER DEFAULT 0")
    except sqlite3.OperationalError: pass
    for _wcol in ("kcal INTEGER DEFAULT 0", "muscles TEXT"):
        try: c.execute(f"ALTER TABLE workouts ADD COLUMN {_wcol}")
        except sqlite3.OperationalError: pass
    for _ix in ("CREATE INDEX IF NOT EXISTS ix_events_ts ON events(ts)",
                "CREATE INDEX IF NOT EXISTS ix_events_cid_ts ON events(chat_id, ts)",
                "CREATE INDEX IF NOT EXISTS ix_meals_cid_d ON meals(chat_id, d)",
                "CREATE INDEX IF NOT EXISTS ix_workouts_cid_d ON workouts(chat_id, d)",
                "CREATE INDEX IF NOT EXISTS ix_prepared_summary_date ON prepared_summaries(summary_date)",
                "CREATE INDEX IF NOT EXISTS ix_ai_jobs_pick ON ai_jobs(status,priority,available_at,created_at)",
                "CREATE INDEX IF NOT EXISTS ix_ai_jobs_user_kind ON ai_jobs(chat_id,kind,created_at)",
                "CREATE INDEX IF NOT EXISTS ix_food_asset_jobs_pick ON food_asset_jobs(status,available_at,created_at)",
                "CREATE INDEX IF NOT EXISTS ix_food_asset_attempts_started ON food_asset_attempts(started_at)"):
        try: c.execute(_ix)
        except sqlite3.OperationalError: pass
    for col in ("state TEXT", "pending_date TEXT", "height INTEGER", "weight REAL", "age INTEGER",
                "activity INTEGER", "diet TEXT", "partner_code TEXT", "mode TEXT", "diet_note TEXT",
                "period_end TEXT", "period_len INTEGER", "train_profile TEXT", "kcal_goal INTEGER",
                "last_phase_notified TEXT", "last_reactivation TEXT",
                "proactive_enabled INTEGER DEFAULT 1",
                "daily_summary_enabled INTEGER DEFAULT 1", "tg_first_name TEXT",
                "push_suppressed_at TEXT", "push_suppression_reason TEXT",
                # Отвечать ли голосом. Единственная возможность из списка багов,
                # которой не было ни на одной поверхности.
                "voice_reply TEXT"):
        try: c.execute(f"ALTER TABLE users ADD COLUMN {col}")
        except sqlite3.OperationalError: pass
    # v177 introduced the marker without a durable migration marker. Production
    # can therefore already have the column while legacy rows still contain 0.
    # Backfill once under the schema transaction: rows created after this
    # migration retain the DEFAULT 0 and are counted by record_onboarding_started.
    _onboarding_migration = "2026-07-29-onboarding-started-backfill-v1"
    if not c.execute(
        "SELECT 1 FROM schema_migrations WHERE name=?",
        (_onboarding_migration,),
    ).fetchone():
        _user_columns = {
            item[1] for item in c.execute("PRAGMA table_info(users)").fetchall()
        }
        if "onboarding_started" not in _user_columns:
            c.execute(
                "ALTER TABLE users ADD COLUMN onboarding_started INTEGER DEFAULT 0"
            )
        c.execute("UPDATE users SET onboarding_started=1")
        c.execute(
            "INSERT INTO schema_migrations(name,applied_at) VALUES(?,?)",
            (_onboarding_migration, datetime.now(timezone.utc).isoformat()),
        )
    c.commit()
    return c

def ensure_db_schema():
    """Prepare the current DB path once; normal requests never execute DDL."""
    global _DB_SCHEMA_PATH
    target = os.path.abspath(DB)
    if _DB_SCHEMA_PATH == target:
        return
    with _DB_SCHEMA_LOCK:
        if _DB_SCHEMA_PATH == target:
            return
        c = None
        for attempt in range(4):
            try:
                c = _migrate_db()
                break
            except sqlite3.OperationalError as exc:
                if "locked" not in str(exc).lower() or attempt == 3:
                    raise
                delay = 0.25 * (2 ** attempt)
                log.warning(
                    "schema migration lock contention; retrying in %.2fs "
                    "(attempt=%d/4)",
                    delay, attempt + 1,
                )
                time.sleep(delay)
        if c is None:
            raise RuntimeError("schema migration did not return a connection")
        c.close()
        A2.mark_schema_ready(DB)
        _DB_SCHEMA_PATH = target

def db():
    ensure_db_schema()
    return _connect_db()

def _user_generation(cid):
    c = db()
    try:
        return A2.lifecycle_generation(c, cid)
    finally:
        c.close()

def _user_write_allowed(cid, generation=None, conn=None):
    own_connection = conn is None
    c = conn or db()
    try:
        return A2.write_allowed(c, chat_id=cid, generation=generation)
    finally:
        if own_connection:
            c.close()

def _activate_user(cid):
    c = db()
    try:
        generation = A2.activate_user(c, cid)
        c.commit()
        return generation
    finally:
        c.close()

def row(cid):
    c = db(); r = c.execute("SELECT chat_id,last_period,cycle_len,send_time,modules,state,pending_date,height,weight,age,activity,diet,partner_code,mode,diet_note,period_end,period_len,train_profile,kcal_goal,last_phase_notified,last_reactivation,proactive_enabled,tg_first_name,push_suppressed_at,push_suppression_reason,daily_summary_enabled FROM users WHERE chat_id=?", (cid,)).fetchone(); c.close()
    if not r: return None
    return {"chat_id": r[0], "last_period": r[1], "cycle_len": r[2], "send_time": r[3],
            "modules": (r[4] or "phase,general,food,training").split(","), "state": r[5], "pending_date": r[6],
            "height": r[7], "weight": r[8], "age": r[9], "activity": r[10], "diet": r[11] or "", "partner_code": r[12],
            "mode": r[13] or "cycle", "diet_note": r[14] or "", "period_end": r[15], "period_len": r[16],
            "train_profile": r[17], "kcal_goal": r[18], "last_phase_notified": r[19],
            "last_reactivation": r[20], "proactive_enabled": r[21] is None or bool(r[21]),
            "tg_first_name": r[22] or "", "push_suppressed_at": r[23],
            "push_suppression_reason": r[24] or "",
            "daily_summary_enabled": r[25] is None or bool(r[25])}

_USER_UPDATE_COLUMNS = frozenset({"activity", "age", "cycle_len", "diet", "diet_note", "height", "kcal_goal",
    "last_period", "last_phase_notified", "last_reactivation", "mode", "partner_code", "pending_date",
    "period_end", "period_len", "proactive_enabled", "daily_summary_enabled", "push_suppressed_at",
    "push_suppression_reason", "send_time", "state", "tg_first_name", "train_profile", "voice_reply", "weight"})
def upsert(cid, *, user_generation=None, **kw):
    unknown = set(kw) - _USER_UPDATE_COLUMNS
    if unknown:
        raise ValueError("unknown user fields: " + ", ".join(sorted(unknown)))
    c = db()
    if user_generation is not None:
        c.execute("BEGIN IMMEDIATE")
    if not _user_write_allowed(cid, user_generation, conn=c):
        c.close()
        return False
    if not c.execute("SELECT 1 FROM users WHERE chat_id=?", (cid,)).fetchone():
        c.execute("INSERT INTO users(chat_id,created) VALUES(?,?)", (cid, datetime.now().isoformat()))
    # Dynamic identifier is safe because every key was checked against _USER_UPDATE_COLUMNS.
    for k, v in kw.items(): c.execute(f"UPDATE users SET {k}=? WHERE chat_id=?", (v, cid))  # nosec B608
    c.commit(); c.close(); return True

def record_onboarding_started(cid, user_generation=None):
    """Emit one acquisition start per active privacy lifecycle.

    The marker, analytics event and Traction outbox item share one transaction.
    `/stop` removes the row and analytics lifecycle, so a later explicit
    `/start` correctly begins a new, separately consented lifecycle.
    """
    c = db()
    try:
        # The overwhelmingly common path is read-only and takes no write lock.
        current = c.execute(
            """SELECT COALESCE(onboarding_started,0)
               FROM users WHERE chat_id=?""",
            (cid,),
        ).fetchone()
        if not current or current[0]:
            return False
        c.execute("BEGIN IMMEDIATE")
        if not _user_write_allowed(cid, user_generation, conn=c):
            c.rollback()
            return False
        claimed = c.execute(
            """UPDATE users SET onboarding_started=1
               WHERE chat_id=? AND COALESCE(onboarding_started,0)=0""",
            (cid,),
        ).rowcount
        if claimed != 1:
            c.rollback()
            return False
        event_id = A2.insert_event_v2(
            c,
            cid,
            "signup",
            app_version=AIWA_VERSION,
            occurred_at=datetime.now(timezone.utc).isoformat(),
        )
        if not event_id:
            c.rollback()
            return False
        c.commit()
        return True
    except Exception as exc:
        try:
            c.rollback()
        except sqlite3.Error:
            pass
        log.warning("onboarding acquisition write failed for %s: %s", cid, exc)
        return False
    finally:
        c.close()

def _clean_telegram_first_name(value):
    """Telegram profile label used only for addressing, never inferred from chat."""
    raw = re.sub(r"\s+", " ", str(value or "")).strip()
    # first_name is user-controlled profile text. Use only its first name-like
    # token and pass it to the model later as delimited data, never as prose.
    tokens = re.findall(r"[^\W\d_]+(?:[-'’][^\W\d_]+)*", raw, flags=re.UNICODE)
    return tokens[0][:64] if tokens else ""

def _store_telegram_first_name(cid, raw_name, allow_create=False):
    """Persist a changed private-chat label without resurrecting deleted users."""
    if raw_name is None:
        return False
    name = _clean_telegram_first_name(raw_name)
    try:
        current = row(cid)
        if current is None and not allow_create:
            return False
        if current is not None and current.get("tg_first_name", "") == name:
            return True
        return upsert(cid, tg_first_name=name)
    except Exception as exc:
        log.warning("telegram identity sync %s: %s", cid, exc)
        return False

def _sync_telegram_identity(update, allow_create=False):
    """Refresh the private-chat first name without resurrecting deleted users."""
    user = getattr(update, "effective_user", None)
    chat = getattr(update, "effective_chat", None)
    cid = getattr(chat, "id", None)
    if not user or cid is None or getattr(chat, "type", "private") != "private":
        return False
    return _store_telegram_first_name(cid, getattr(user, "first_name", None), allow_create)

async def sync_telegram_identity(update, context):
    """Run before normal Telegram handlers so this turn sees the current name."""
    _sync_telegram_identity(update)
    chat = getattr(update, "effective_chat", None)
    cid = getattr(chat, "id", None)
    if cid is not None and getattr(chat, "type", "private") == "private":
        if _clear_push_suppression(cid):
            user = row(cid) or {}
            if is_onboarded(user):
                schedule_daily(context.application, cid, user.get("send_time") or "08:00")

def add_sugg(cid, q):
    c = db()
    if not _user_write_allowed(cid, conn=c):
        c.close(); return None
    sid = c.execute("INSERT INTO sugg(chat_id,q) VALUES(?,?)", (cid, q)).lastrowid; c.commit(); c.close(); return sid
def get_sugg(sid):
    c = db(); r = c.execute("SELECT q FROM sugg WHERE id=?", (sid,)).fetchone(); c.close(); return r[0] if r else None

_EVENT_WRITE_Q = queue.Queue(maxsize=max(1000, int(os.environ.get("AIWA_EVENT_QUEUE_SIZE", "50000"))))
_EVENT_WRITER_STOP = threading.Event()
_EVENT_WRITER_THREAD = None
_EVENT_WRITER_ACTIVE = False
_EVENT_WRITER_LOCK = threading.Lock()
_EVENT_WRITER_FAILURES = 0
_EVENT_WRITER_LAST_ERROR_AT = None
_EVENT_WRITER_DROPPED = 0

def _write_event_batch(items):
    if not items:
        return 0
    written = 0
    c = db()
    try:
        # The lifecycle check and event inserts must be one write transaction.
        # Otherwise /stop can delete a user between the check and the insert,
        # allowing a queued telemetry item to reappear after deletion.
        c.execute("BEGIN IMMEDIATE")
        for item in items:
            cid, action, meta, ms, calls, request_id, generation, occurred_at = item
            if not A2.write_allowed(
                c, chat_id=cid, generation=generation, occurred_at=occurred_at,
            ):
                continue
            event_id = A2.insert_event_v2(
                c, cid, action, meta=meta, latency_ms=ms,
                app_version=AIWA_VERSION, request_id=request_id, calls=calls,
                occurred_at=occurred_at,
            )
            if event_id:
                written += 1
        c.commit()
    finally:
        c.close()
    return written

def _event_writer_loop():
    global _EVENT_WRITER_FAILURES, _EVENT_WRITER_LAST_ERROR_AT, _EVENT_WRITER_DROPPED
    batch_size = max(1, min(500, int(os.environ.get("AIWA_EVENT_BATCH_SIZE", "100"))))
    flush_seconds = max(0.05, min(2.0, float(os.environ.get("AIWA_EVENT_FLUSH_SECONDS", "0.25"))))
    while not _EVENT_WRITER_STOP.is_set() or not _EVENT_WRITE_Q.empty():
        batch = []
        try:
            batch.append(_EVENT_WRITE_Q.get(timeout=flush_seconds))
        except queue.Empty:
            continue
        deadline = time.monotonic() + flush_seconds
        while len(batch) < batch_size:
            if _EVENT_WRITER_STOP.is_set():
                try:
                    batch.append(_EVENT_WRITE_Q.get_nowait())
                    continue
                except queue.Empty:
                    break
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                break
            try:
                batch.append(_EVENT_WRITE_Q.get(timeout=remaining))
            except queue.Empty:
                break
        max_attempts = 6
        persisted = False
        for attempt in range(1, max_attempts + 1):
            try:
                _write_event_batch(batch)
                persisted = True
                break
            except Exception:
                _EVENT_WRITER_FAILURES += 1
                _EVENT_WRITER_LAST_ERROR_AT = datetime.now(timezone.utc).isoformat()
                if _EVENT_WRITER_STOP.is_set() and attempt >= 2:
                    break
                delay = min(2.0, 0.05 * (2 ** min(attempt - 1, 6)))
                log.exception(
                    "events_v2 batch write failed; retaining %d events for retry "
                    "(attempt=%d/%d, retry_in=%.2fs)",
                    len(batch), attempt, max_attempts, delay,
                )
                time.sleep(delay)
        if not persisted:
            # Isolate a poison item so one malformed telemetry event cannot stall
            # every later event or clean shutdown. A critical event can reach
            # this path only after its synchronous contention retries exhaust;
            # any final drop increments the health-visible counter below.
            for item in batch:
                try:
                    _write_event_batch([item])
                except Exception:
                    _EVENT_WRITER_DROPPED += 1
                    log.error(
                        "events_v2 noncritical event dropped after retries: action=%s",
                        item[1],
                    )
        for _ in batch:
            _EVENT_WRITE_Q.task_done()

def start_event_writer():
    global _EVENT_WRITER_THREAD, _EVENT_WRITER_ACTIVE
    with _EVENT_WRITER_LOCK:
        if _EVENT_WRITER_THREAD and _EVENT_WRITER_THREAD.is_alive():
            _EVENT_WRITER_ACTIVE = True
            return
        _EVENT_WRITER_STOP.clear()
        _EVENT_WRITER_THREAD = threading.Thread(
            target=_event_writer_loop, name="aiwa-events-v2-writer", daemon=True
        )
        _EVENT_WRITER_THREAD.start()
        _EVENT_WRITER_ACTIVE = True

def flush_event_writer(timeout=5):
    if not _EVENT_WRITER_ACTIVE:
        return True
    deadline = time.monotonic() + max(0, timeout)
    while _EVENT_WRITE_Q.unfinished_tasks and time.monotonic() < deadline:
        time.sleep(0.01)
    return _EVENT_WRITE_Q.unfinished_tasks == 0

def stop_event_writer(timeout=10):
    """Stop accepting queued writes and drain the writer before clean exit."""
    global _EVENT_WRITER_ACTIVE
    _EVENT_WRITER_ACTIVE = False
    _EVENT_WRITER_STOP.set()
    thread = _EVENT_WRITER_THREAD
    if thread and thread.is_alive():
        thread.join(max(0, timeout))
    return _EVENT_WRITE_Q.unfinished_tasks == 0 and not (
        thread and thread.is_alive()
    )

atexit.register(stop_event_writer)

def _write_durable_event(item, max_attempts=3):
    """Persist a critical event or retain it for the monitored writer."""
    global _EVENT_WRITER_FAILURES, _EVENT_WRITER_LAST_ERROR_AT
    action = item[1]
    for attempt in range(1, max(1, int(max_attempts)) + 1):
        try:
            return _write_event_batch([item]) == 1
        except sqlite3.OperationalError as exc:
            transient = any(
                marker in str(exc).lower() for marker in ("locked", "busy")
            )
            if not transient:
                log.error(
                    "durable events_v2 write failed for %s "
                    "(attempt=%d/%d): %s",
                    action, attempt, max_attempts, exc,
                )
                return False
            if attempt >= max_attempts:
                if (
                    _EVENT_WRITER_ACTIVE
                    and _EVENT_WRITER_THREAD
                    and _EVENT_WRITER_THREAD.is_alive()
                ):
                    try:
                        _EVENT_WRITE_Q.put_nowait(item)
                        log.error(
                            "durable events_v2 write exhausted retries for %s; "
                            "retained in monitored writer queue",
                            action,
                        )
                        return True
                    except queue.Full:
                        pass
                log.error(
                    "durable events_v2 write failed for %s "
                    "(attempt=%d/%d): %s",
                    action, attempt, max_attempts, exc,
                )
                return False
            _EVENT_WRITER_FAILURES += 1
            _EVENT_WRITER_LAST_ERROR_AT = datetime.now(timezone.utc).isoformat()
            delay = min(0.2, 0.05 * (2 ** (attempt - 1)))
            log.warning(
                "durable events_v2 write contention for %s; retrying "
                "(attempt=%d/%d, retry_in=%.2fs)",
                action, attempt, max_attempts, delay,
            )
            time.sleep(delay)
        except Exception as exc:
            log.error("durable events_v2 write failed for %s: %s", action, exc)
            return False
    return False

def ev(cid, action, tokens=0, meta=None, ms=0, n=0, calls=0, request_id=None, usage=None,
       user_generation=None):
    """Write privacy-preserving analytics v2; legacy events is read-only.

    Safety and push-delivery decisions are durable before returning. High-volume
    UX telemetry is accepted into the monitored/drained batch writer.
    """
    item = (
        cid, action, meta, int(ms), int(calls), request_id, user_generation,
        datetime.now(timezone.utc).isoformat(),
    )
    if action in {"safety", "broadcast"}:
        return _write_durable_event(item)
    if _EVENT_WRITER_ACTIVE and not (
        _EVENT_WRITER_THREAD and _EVENT_WRITER_THREAD.is_alive()
    ):
        log.error("events_v2 writer is not alive; restarting it before enqueue")
        start_event_writer()
    if _EVENT_WRITER_ACTIVE:
        try:
            _EVENT_WRITE_Q.put_nowait(item)
            return True
        except queue.Full:
            log.warning("events_v2 queue full; writing synchronously")
    try:
        return _write_event_batch([item]) == 1
    except Exception as exc:
        log.warning("events_v2 write failed: %s", exc)
        return False

async def llm_to_thread(cid, purpose, func, *args, request_id=None, user_generation=None, **kwargs):
    """Run a provider call with a shared trace id and pseudonymous user key."""
    request_id = request_id or ("r_" + secrets.token_hex(16))
    generation = _user_generation(cid) if user_generation is None else int(user_generation)
    def run():
        with L.call_context(user_key=A2.user_key(cid), request_id=request_id, purpose=purpose,
                            user_generation=generation):
            return func(*args, **kwargs)
    return await asyncio.to_thread(run)

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
    for it in (data.get("items") or [])[:24]:
        if not isinstance(it, dict):
            continue
        grams = max(0, min(5000, int(_num(it.get("grams")))))
        kcal = max(0, min(10000, int(_num(it.get("kcal")))))
        protein = max(0, min(1000, round(_num(it.get("protein")), 1)))
        fat = max(0, min(1000, round(_num(it.get("fat")), 1)))
        carbs = max(0, min(1000, round(_num(it.get("carbs")), 1)))
        items.append({"name": str(it.get("name") or "").strip()[:60],
                      "grams": grams, "kcal": kcal,
                      "protein": protein, "fat": fat, "carbs": carbs})
    tot = data.get("total") or {}
    kcal = max(0, min(10000, int(_num(tot.get("kcal"))) or int(_num(data.get("kcal"))) or sum(i["kcal"] for i in items)))
    protein = max(0, min(1000, round(_num(tot.get("protein")) or _num(data.get("protein")) or sum(i["protein"] for i in items), 1)))
    fat = max(0, min(1000, round(_num(tot.get("fat")) or _num(data.get("fat")) or sum(i["fat"] for i in items), 1)))
    carbs = max(0, min(1000, round(_num(tot.get("carbs")) or _num(data.get("carbs")) or sum(i["carbs"] for i in items), 1)))
    grams = max(0, min(5000, int(_num(data.get("grams"))) or sum(i["grams"] for i in items))) or None
    has_title = bool(str(data.get("title") or "").strip())
    title = str(data.get("title") or (items[0]["name"] if items else "Приём пищи")).strip()[:80]
    if not (kcal or items or has_title):
        return None
    if source == "photo":
        # Vision providers sometimes return a syntactically valid JSON object
        # with a technical placeholder instead of food. Never persist such an
        # object as a real diary entry, even when it has a non-empty title.
        placeholder = re.sub(r"[^а-яёa-z0-9]+", " ", title.casefold()).strip()
        invalid_titles = {
            "нет данных", "чек", "не определено", "не удалось определить",
            "не распознано", "не удалось распознать", "приём пищи", "прием пищи",
        }
        item_has_evidence = any(
            str(item.get("name") or "").strip()
            and any(_num(item.get(field)) > 0 for field in ("grams", "kcal", "protein", "fat", "carbs"))
            for item in items
        )
        total_has_evidence = any(value > 0 for value in (grams or 0, kcal, protein, fat, carbs))
        if placeholder in invalid_titles or not (has_title and (total_has_evidence or item_has_evidence)):
            return None
    class_evidence = " ".join(
        [title]
        + [str(item.get("name") or "") for item in items]
    )
    fclass = L.food_class_norm(
        data.get("fclass") or data.get("class") or data.get("category"),
        protein, fat, carbs, class_evidence,
    )
    unparsed = [
        str(x).strip()[:120]
        for x in (data.get("unparsed") or [])[:8]
        if str(x or "").strip()
    ]
    item_names = [str(x.get("name") or "").strip().casefold() for x in items]
    unparsed = [
        fragment for fragment in unparsed
        if not any(
            SequenceMatcher(
                None,
                re.sub(r"[^а-яёa-z0-9]+", "", fragment.casefold())[:48],
                re.sub(r"[^а-яёa-z0-9]+", "", name)[:48],
            ).ratio() >= 0.72
            for name in item_names
            if name
        )
    ]
    return {"title": title, "kind": data.get("kind") or "dish", "items": items, "fclass": fclass,
            "kcal": kcal, "protein": protein, "fat": fat, "carbs": carbs, "grams": grams,
            "unparsed": unparsed, "confidence": data.get("confidence") or "medium",
            "note": str(data.get("note") or "")[:160], "source": source}

def food_record_admissible(rec):
    """A model label alone is not enough evidence to mutate the diary."""
    if not isinstance(rec, dict):
        return False
    numeric_evidence = any(
        _num(rec.get(field)) > 0
        for field in ("grams", "kcal", "protein", "fat", "carbs")
    )
    item_evidence = any(
        str(item.get("name") or "").strip()
        and any(
            _num(item.get(field)) > 0
            for field in ("grams", "kcal", "protein", "fat", "carbs")
        )
        for item in (rec.get("items") or [])
        if isinstance(item, dict)
    )
    # Zero-calorie drinks are legitimate even when a provider omitted volume.
    # Keep this whitelist narrow so generic labels such as “снек” or
    # “нет данных” cannot become empty diary rows.
    title = re.sub(
        r"[^а-яёa-z0-9]+", " ", str(rec.get("title") or "").casefold()
    ).strip()
    zero_calorie_drink = bool(re.fullmatch(
        r"(?:(?:стакан|кружка|чашка|бутылка)\s+)?"
        r"(?:вод[аы]|минеральная вода|чай|чёрный чай|черный чай|"
        r"зелёный чай|зеленый чай|кофе|эспрессо|американо)"
        r"(?:\s+без\s+(?:сахара|молока))?",
        title,
    ))
    return bool(numeric_evidence or item_evidence or zero_calorie_drink)

def slot_for_now():
    try: h = datetime.now(TZ).hour
    except Exception: h = datetime.now().hour
    if 4 <= h < 11: return "breakfast"
    if 11 <= h < 16: return "lunch"
    if 16 <= h < 18: return "snack"
    if 18 <= h < 24: return "dinner"
    return "snack"

def meal_add(cid, rec, d=None, user_generation=None, mutation_key=None, args_hash=None, return_status=False):
    d = d or dtoday().isoformat()
    slot = rec.get("slot") or slot_for_now()
    c = db()
    if user_generation is not None or mutation_key:
        c.execute("BEGIN IMMEDIATE")
    if not _user_write_allowed(cid, user_generation, conn=c):
        c.close(); return None
    if mutation_key:
        prior = c.execute(
            "SELECT kind,record_id,args_hash,result_json,reversed_at FROM chat_mutations WHERE chat_id=? AND mutation_key=?",
            (cid, mutation_key),
        ).fetchone()
        if prior:
            c.commit(); c.close()
            try: prior_id = int(prior[1])
            except (TypeError, ValueError): prior_id = None
            status = "mismatch" if prior[0] != "food" or (prior[2] or "") != (args_hash or "") else (
                "reversed" if prior[4] else "duplicate"
            )
            try: saved_data = json.loads(prior[3] or "{}")
            except (TypeError, ValueError): saved_data = {}
            result = {"id": prior_id, "created": False, "status": status, "data": saved_data}
            return result if return_status else prior_id
    # Опечатка в опорном слове стоит блюду картинки и семейного фолбэка:
    # «таорог» не находит ни творог, ни его каталог. Правим на записи, а не
    # только при подборе картинки, чтобы в дневнике лежало читаемое название.
    title = FA.correct_typos(rec["title"])
    mid = c.execute(
        "INSERT INTO meals(chat_id,d,ts,title,kcal,protein,fat,carbs,grams,items,source,slot,fclass,slot_guessed) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        (cid, d, datetime.now(TZ).isoformat(), title, int(rec["kcal"]), float(rec["protein"]), float(rec["fat"]),
         float(rec["carbs"]), (int(rec["grams"]) if rec.get("grams") else None),
         json.dumps(rec.get("items") or [], ensure_ascii=False), rec.get("source") or "photo", slot,
         rec.get("fclass") or None, int(bool(rec.get("slot_guessed"))))).lastrowid
    if mutation_key:
        c.execute(
            """INSERT INTO chat_mutations
               (chat_id,mutation_key,generation,kind,record_id,args_hash,result_json,created_at)
               VALUES(?,?,?,?,?,?,?,?)""",
            (cid, mutation_key,
             int(user_generation if user_generation is not None else A2.lifecycle_generation(c, cid)),
             "food", str(mid), args_hash or "",
             json.dumps(dict(rec, slot=slot, date=d), ensure_ascii=False, sort_keys=True),
             datetime.now(TZ).isoformat()),
        )
    c.commit(); c.close()
    result = {"id": mid, "created": True, "status": "created", "data": dict(rec, slot=slot, date=d)}
    return result if return_status else mid

def meal_set_slot(cid, mid, slot):
    if slot not in ("breakfast", "lunch", "snack", "dinner"): return False
    c = db()
    changed = c.execute(
        "UPDATE meals SET slot=?,slot_guessed=0 WHERE chat_id=? AND id=?",
        (slot, cid, int(mid)),
    ).rowcount
    c.commit(); c.close()
    return bool(changed)

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
            if k == "slot":
                sets.append("slot_guessed=0")
    if not sets: return False
    vals += [cid, int(mid)]
    # SET identifiers come exclusively from the fixed cols mapping above.
    c = db(); c.execute("UPDATE meals SET " + ", ".join(sets) + " WHERE chat_id=? AND id=?", vals); c.commit(); c.close(); return True  # nosec B608

def _meal_row_payload(x):
    items = json.loads(x[8] or "[]")
    class_evidence = " ".join(
        [str(x[2] or "")]
        + [str(item.get("name") or "") for item in items if isinstance(item, dict)]
    )
    return FA.decorate({
        "id": x[0], "ts": x[1], "title": x[2], "kcal": x[3],
        "protein": x[4], "fat": x[5], "carbs": x[6], "grams": x[7],
        "items": items, "source": x[9],
        "slot": (x[10] or "snack"),
        "fclass": L.food_class_norm(x[11], x[4], x[5], x[6], class_evidence),
        "slot_guessed": bool(x[12]),
    })


def meals_of(cid, d=None):
    d = d or dtoday().isoformat()
    c = db()
    r = c.execute(
        """SELECT id,ts,title,kcal,protein,fat,carbs,grams,items,source,
                  slot,fclass,slot_guessed
           FROM meals WHERE chat_id=? AND d=? ORDER BY ts""",
        (cid, d),
    ).fetchall()
    c.close()
    return [_meal_row_payload(x) for x in r]

def meal_get(cid, mid):
    """Read back one owned meal. Mutation confirmations must use this DB receipt."""
    try:
        wanted = int(mid)
    except (TypeError, ValueError):
        return None
    c = db()
    x = c.execute(
        """SELECT id,d,ts,title,kcal,protein,fat,carbs,grams,items,source,slot,fclass,slot_guessed
           FROM meals WHERE chat_id=? AND id=?""",
        (cid, wanted),
    ).fetchone()
    c.close()
    if not x:
        return None
    items = json.loads(x[9] or "[]")
    class_evidence = " ".join(
        [str(x[3] or "")]
        + [str(item.get("name") or "") for item in items if isinstance(item, dict)]
    )
    return {
        "id": x[0], "date": x[1], "ts": x[2], "title": x[3], "kcal": x[4],
        "protein": x[5], "fat": x[6], "carbs": x[7], "grams": x[8],
        "items": items, "source": x[10],
        "slot": x[11] or "snack",
        "fclass": L.food_class_norm(x[12], x[5], x[6], x[7], class_evidence),
        "slot_guessed": bool(x[13]),
    }

def meal_update(cid, mid, rec, *, user_generation=None, mutation_key=None,
                args_hash=None, mutation_kind="food_update", return_status=False):
    """Atomically replace one owned meal and persist an idempotent verified receipt."""
    try:
        wanted = int(mid)
    except (TypeError, ValueError):
        return None
    c = db()
    c.execute("BEGIN IMMEDIATE")
    if not _user_write_allowed(cid, user_generation, conn=c):
        c.close()
        return None
    if mutation_key:
        prior = c.execute(
            """SELECT kind,record_id,args_hash,result_json,reversed_at
               FROM chat_mutations WHERE chat_id=? AND mutation_key=?""",
            (cid, mutation_key),
        ).fetchone()
        if prior:
            c.commit(); c.close()
            status = "mismatch" if (
                prior[0] != mutation_kind
                or str(prior[1] or "") != str(wanted)
                or (prior[2] or "") != (args_hash or "")
            ) else ("reversed" if prior[4] else "duplicate")
            try:
                saved_data = json.loads(prior[3] or "{}")
            except (TypeError, ValueError):
                saved_data = {}
            result = {"id": wanted, "updated": False, "status": status, "data": saved_data}
            return result if return_status else (wanted if status == "duplicate" else None)
    current = c.execute(
        "SELECT d,slot,slot_guessed FROM meals WHERE chat_id=? AND id=?",
        (cid, wanted),
    ).fetchone()
    if not current:
        c.rollback(); c.close()
        result = {"id": None, "updated": False, "status": "missing", "data": {}}
        return result if return_status else None
    slot = rec.get("slot") or current[1] or "snack"
    slot_guessed = (
        bool(rec["slot_guessed"])
        if "slot_guessed" in rec
        else bool(current[2])
    )
    c.execute(
        """UPDATE meals
           SET title=?,kcal=?,protein=?,fat=?,carbs=?,grams=?,items=?,source=?,slot=?,fclass=?,ts=?,slot_guessed=?
           WHERE chat_id=? AND id=?""",
        (
            rec["title"], int(rec["kcal"]), float(rec["protein"]), float(rec["fat"]),
            float(rec["carbs"]), int(rec["grams"]) if rec.get("grams") else None,
            json.dumps(rec.get("items") or [], ensure_ascii=False),
            rec.get("source") or "text", slot, rec.get("fclass") or None,
            datetime.now(TZ).isoformat(), int(slot_guessed), cid, wanted,
        ),
    )
    x = c.execute(
        """SELECT id,d,ts,title,kcal,protein,fat,carbs,grams,items,source,slot,fclass,slot_guessed
           FROM meals WHERE chat_id=? AND id=?""",
        (cid, wanted),
    ).fetchone()
    if not x:
        c.rollback(); c.close()
        result = {"id": None, "updated": False, "status": "verify_failed", "data": {}}
        return result if return_status else None
    verified = {
        "id": x[0], "date": x[1], "ts": x[2], "title": x[3], "kcal": x[4],
        "protein": x[5], "fat": x[6], "carbs": x[7], "grams": x[8],
        "items": json.loads(x[9] or "[]"), "source": x[10],
        "slot": x[11] or "snack", "fclass": x[12] or None, "slot_guessed": bool(x[13]),
    }
    if mutation_key:
        c.execute(
            """INSERT INTO chat_mutations
               (chat_id,mutation_key,generation,kind,record_id,args_hash,result_json,created_at)
               VALUES(?,?,?,?,?,?,?,?)""",
            (
                cid, mutation_key,
                int(user_generation if user_generation is not None else A2.lifecycle_generation(c, cid)),
                mutation_kind, str(wanted), args_hash or "",
                json.dumps(verified, ensure_ascii=False, sort_keys=True),
                datetime.now(TZ).isoformat(),
            ),
        )
    c.commit(); c.close()
    result = {"id": wanted, "updated": True, "status": "updated", "data": verified}
    return result if return_status else wanted

def meal_del(cid, mid):
    c = db()
    c.execute("DELETE FROM meals WHERE chat_id=? AND id=?", (cid, int(mid)))
    c.execute(
        """UPDATE chat_mutations SET reversed_at=?,result_json=NULL
           WHERE chat_id=? AND kind IN ('food','food_update','food_move_slot','food_append') AND record_id=?""",
        (datetime.now(TZ).isoformat(), cid, str(int(mid))),
    )
    c.commit(); c.close()

def meal_scale(cid, mid, new_grams):
    """Пересчитывает КБЖУ приёма пропорционально новой граммовке."""
    c = db(); r = c.execute("SELECT kcal,protein,fat,carbs,grams FROM meals WHERE chat_id=? AND id=?", (cid, int(mid))).fetchone()
    if not r or not r[4] or not new_grams:
        c.close(); return False
    k = float(new_grams) / float(r[4]) if r[4] else 1
    c.execute("UPDATE meals SET kcal=?,protein=?,fat=?,carbs=?,grams=? WHERE chat_id=? AND id=?",
              (int(round(r[0] * k)), round(r[1] * k, 1), round(r[2] * k, 1), round(r[3] * k, 1), int(new_grams), cid, int(mid)))
    c.commit(); c.close(); return True

_MET = {"Силовая": 5.0, "Кардио": 8.0, "Йога": 3.0, "Ходьба": 3.5, "Плавание": 7.0,
        "Пилатес": 3.0, "Растяжка": 2.5}
# Типы из стандартного набора приложения; всё остальное — собственные
# активности пользовательницы (например Сквош), их ведём отдельно.
_STANDARD_WORKOUT_TYPES = frozenset(_MET) | {"Своё", "Тренировка", "Танцы", "Бег", "Велосипед", ""}

def _custom_workout_title(name):
    """Заголовок своей тренировки из единственного вписанного занятия.
    Длинный свободный текст обрезается, чтобы не ломать карточки."""
    t = re.sub(r"\s+", " ", str(name or "")).strip(" .,!—-")
    if not t:
        return ""
    if len(t) > 24:
        t = t[:23].rstrip() + "…"
    return t[:1].upper() + t[1:]

def favorite_activities(cid, days=60, limit=3):
    """Собственные активности за окно, по убыванию частоты, свежие выше.
    Окно даёт естественное затухание: что перестали отмечать — выпадает."""
    cut = (dtoday() - timedelta(days=days)).isoformat()
    c = db()
    rows = c.execute(
        "SELECT type, COUNT(*) AS n, MAX(d) FROM workouts WHERE chat_id=? AND d>=? "
        "GROUP BY type ORDER BY n DESC, MAX(d) DESC", (cid, cut)).fetchall()
    c.close()
    out = []
    for t, n, _last in rows:
        t = (t or "").strip()
        if t in _STANDARD_WORKOUT_TYPES:
            continue
        out.append((t, n))
        if len(out) >= limit:
            break
    return out

def workout_calories(wtype, duration, rpe, weight_kg):
    m = re.search(r"\d+", str(duration or "")); mins = int(m.group()) if m else 40
    met = _MET.get(wtype, 5.0)
    r = str(rpe or "").lower()
    if "лег" in r: met *= 0.85
    elif "тяж" in r: met *= 1.15
    w = weight_kg if (weight_kg and weight_kg > 30) else 65
    return int(round(met * w * (mins / 60.0)))

def workout_add(cid, rec, d=None, user_generation=None, mutation_key=None, args_hash=None, return_status=False):
    d = d or dtoday().isoformat()
    c = db()
    if user_generation is not None or mutation_key:
        c.execute("BEGIN IMMEDIATE")
    if not _user_write_allowed(cid, user_generation, conn=c):
        c.close(); return None
    if mutation_key:
        prior = c.execute(
            "SELECT kind,record_id,args_hash,result_json,reversed_at FROM chat_mutations WHERE chat_id=? AND mutation_key=?",
            (cid, mutation_key),
        ).fetchone()
        if prior:
            c.commit(); c.close()
            try: prior_id = int(prior[1])
            except (TypeError, ValueError): prior_id = None
            status = "mismatch" if prior[0] != "workout" or (prior[2] or "") != (args_hash or "") else (
                "reversed" if prior[4] else "duplicate"
            )
            try: saved_data = json.loads(prior[3] or "{}")
            except (TypeError, ValueError): saved_data = {}
            result = {"id": prior_id, "created": False, "status": status, "data": saved_data}
            return result if return_status else prior_id
    cur = c.execute("INSERT INTO workouts(chat_id,d,ts,type,items,duration,rpe,note,review,kcal,muscles) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
        (cid, d, datetime.now(TZ).isoformat(), rec.get("type", ""), json.dumps(rec.get("items", []), ensure_ascii=False),
         rec.get("duration", ""), rec.get("rpe", ""), rec.get("note", ""), rec.get("review", ""),
         int(rec.get("kcal") or 0), rec.get("muscles", "")))
    wid = cur.lastrowid
    if mutation_key:
        c.execute(
            """INSERT INTO chat_mutations
               (chat_id,mutation_key,generation,kind,record_id,args_hash,result_json,created_at)
               VALUES(?,?,?,?,?,?,?,?)""",
            (cid, mutation_key,
             int(user_generation if user_generation is not None else A2.lifecycle_generation(c, cid)),
             "workout", str(wid), args_hash or "",
             json.dumps(dict(rec, date=d), ensure_ascii=False, sort_keys=True),
             datetime.now(TZ).isoformat()),
        )
    c.commit(); c.close()
    result = {"id": wid, "created": True, "status": "created", "data": dict(rec, date=d)}
    return result if return_status else wid

def workout_get(cid, wid):
    """Read back one owned workout for verified mutation receipts."""
    try:
        wanted = int(wid)
    except (TypeError, ValueError):
        return None
    c = db()
    x = c.execute(
        """SELECT id,d,ts,type,items,duration,rpe,note,review,kcal,muscles
           FROM workouts WHERE chat_id=? AND id=?""",
        (cid, wanted),
    ).fetchone()
    c.close()
    if not x:
        return None
    return {
        "id": x[0], "date": x[1], "ts": x[2], "type": x[3],
        "items": json.loads(x[4] or "[]"), "duration": x[5] or "",
        "rpe": x[6] or "", "note": x[7] or "", "review": x[8] or "",
        "kcal": int(x[9] or 0), "muscles": x[10] or "",
    }

def workout_update(cid, wid, rec, *, user_generation=None, mutation_key=None,
                   args_hash=None, return_status=False):
    """Atomically replace one owned workout and verify it before acknowledging."""
    try:
        wanted = int(wid)
    except (TypeError, ValueError):
        return None
    c = db()
    c.execute("BEGIN IMMEDIATE")
    if not _user_write_allowed(cid, user_generation, conn=c):
        c.close()
        return None
    if mutation_key:
        prior = c.execute(
            """SELECT kind,record_id,args_hash,result_json,reversed_at
               FROM chat_mutations WHERE chat_id=? AND mutation_key=?""",
            (cid, mutation_key),
        ).fetchone()
        if prior:
            c.commit(); c.close()
            status = "mismatch" if (
                prior[0] != "workout_update"
                or str(prior[1] or "") != str(wanted)
                or (prior[2] or "") != (args_hash or "")
            ) else ("reversed" if prior[4] else "duplicate")
            try:
                saved_data = json.loads(prior[3] or "{}")
            except (TypeError, ValueError):
                saved_data = {}
            result = {"id": wanted, "updated": False, "status": status, "data": saved_data}
            return result if return_status else (wanted if status == "duplicate" else None)
    current = c.execute(
        "SELECT d FROM workouts WHERE chat_id=? AND id=?",
        (cid, wanted),
    ).fetchone()
    if not current:
        c.rollback(); c.close()
        result = {"id": None, "updated": False, "status": "missing", "data": {}}
        return result if return_status else None
    c.execute(
        """UPDATE workouts
           SET type=?,items=?,duration=?,rpe=?,note=?,review=?,kcal=?,muscles=?,ts=?
           WHERE chat_id=? AND id=?""",
        (
            rec.get("type", ""), json.dumps(rec.get("items") or [], ensure_ascii=False),
            rec.get("duration", ""), rec.get("rpe", ""), rec.get("note", ""),
            rec.get("review", ""), int(rec.get("kcal") or 0), rec.get("muscles", ""),
            datetime.now(TZ).isoformat(), cid, wanted,
        ),
    )
    x = c.execute(
        """SELECT id,d,ts,type,items,duration,rpe,note,review,kcal,muscles
           FROM workouts WHERE chat_id=? AND id=?""",
        (cid, wanted),
    ).fetchone()
    if not x:
        c.rollback(); c.close()
        result = {"id": None, "updated": False, "status": "verify_failed", "data": {}}
        return result if return_status else None
    verified = {
        "id": x[0], "date": x[1], "ts": x[2], "type": x[3],
        "items": json.loads(x[4] or "[]"), "duration": x[5] or "",
        "rpe": x[6] or "", "note": x[7] or "", "review": x[8] or "",
        "kcal": int(x[9] or 0), "muscles": x[10] or "",
    }
    if mutation_key:
        c.execute(
            """INSERT INTO chat_mutations
               (chat_id,mutation_key,generation,kind,record_id,args_hash,result_json,created_at)
               VALUES(?,?,?,?,?,?,?,?)""",
            (
                cid, mutation_key,
                int(user_generation if user_generation is not None else A2.lifecycle_generation(c, cid)),
                "workout_update", str(wanted), args_hash or "",
                json.dumps(verified, ensure_ascii=False, sort_keys=True),
                datetime.now(TZ).isoformat(),
            ),
        )
    c.commit(); c.close()
    result = {"id": wanted, "updated": True, "status": "updated", "data": verified}
    return result if return_status else wanted

_WORKOUT_TYPES = {
    "бассейн": "Плавание", "плав": "Плавание", "силов": "Силовая", "кардио": "Кардио",
    "бег": "Кардио", "пробеж": "Кардио", "йог": "Йога", "ход": "Ходьба", "гуля": "Ходьба",
    "пилатес": "Пилатес", "растяж": "Растяжка",
    "стретч": "Растяжка", "велосипед": "Кардио", "вело": "Кардио",
}

def _workout_type_from_text(text):
    low = (text or "").lower()
    for marker, canonical in _WORKOUT_TYPES.items():
        if marker in low:
            return canonical
    return ""

def _workout_minutes(value):
    if value in (None, ""):
        return None
    if isinstance(value, (int, float)):
        mins = int(round(float(value)))
    else:
        raw = str(value).lower().replace(",", ".")
        hour = re.search(r"(\d+(?:\.\d+)?)\s*(?:ч|час)", raw)
        minute = re.search(r"(\d+)\s*(?:мин)", raw)
        if hour:
            mins = int(round(float(hour.group(1)) * 60)) + (int(minute.group(1)) if minute else 0)
        else:
            number = re.search(r"\d+", raw)
            mins = int(number.group()) if number else 0
    return mins if 1 <= mins <= 600 else None

def normalize_workout(data, source_text=""):
    """Очищает извлечённую моделью тренировку; отсутствующие факты не выдумываются."""
    data = data if isinstance(data, dict) else {}
    raw_type = str(data.get("type") or "").strip()[:40]
    allowed = {"Силовая", "Кардио", "Йога", "Ходьба", "Плавание", "Пилатес", "Растяжка", "Другая"}
    wtype = raw_type if raw_type in allowed else _workout_type_from_text(raw_type or source_text)
    items = []
    groups = []
    for item in (data.get("items") or [])[:24]:
        if not isinstance(item, dict):
            continue
        name = str(item.get("name") or "").strip()[:60]
        if not name:
            continue
        group = str(item.get("group") or "").strip()[:30]
        clean = {"name": name}
        for key in ("sets", "reps"):
            val = int(_num(item.get(key))) if item.get(key) not in (None, "", 0) else None
            clean[key] = val if val and 1 <= val <= 1000 else None
        weight = _num(item.get("weight")) if item.get("weight") not in (None, "", 0) else None
        clean["weight"] = weight if weight and 0 < weight <= 1000 else None
        clean["group"] = group or None
        items.append(clean)
        if group and group not in groups:
            groups.append(group)
    if not wtype and items:
        wtype = "Силовая"
    if not wtype and not items:
        return None
    minutes = _workout_minutes(data.get("duration_minutes") or data.get("duration"))
    rpe_raw = str(data.get("rpe") or "").lower()
    rpe = "лёгкая" if "лег" in rpe_raw or "лёг" in rpe_raw else (
        "тяжёлая" if "тяж" in rpe_raw else ("средняя" if "сред" in rpe_raw else "")
    )
    return {
        "type": wtype or "Другая",
        "items": items,
        "duration": (f"{minutes} мин" if minutes else ""),
        "rpe": rpe,
        "note": str(data.get("note") or "").strip()[:200],
        "review": "",
        "kcal": 0,
        "muscles": ", ".join(groups),
    }

def basic_workout_from_text(text):
    """Детерминированный фолбэк, если модель недоступна."""
    wtype = _workout_type_from_text(text)
    if not wtype:
        return None
    low = (text or "").lower()
    duration = None
    duration_match = re.search(r"\d+(?:[.,]\d+)?\s*(?:ч(?:ас(?:а|ов)?)?|мин(?:ут[аы]?)?)", low)
    if duration_match:
        duration = _workout_minutes(duration_match.group(0))
    rpe = "лёгкая" if re.search(r"л[её]гк", low) else (
        "тяжёлая" if re.search(r"тяж", low) else ("средняя" if re.search(r"средн", low) else "")
    )
    return {"type": wtype, "items": [], "duration_minutes": duration, "rpe": rpe, "note": ""}

def workouts_of(cid, d=None):
    d = d or dtoday().isoformat()
    c = db(); r = c.execute("SELECT id,ts,type,items,duration,rpe,note,review,kcal,muscles FROM workouts WHERE chat_id=? AND d=? ORDER BY ts", (cid, d)).fetchall(); c.close()
    return [{"id": x[0], "ts": x[1], "type": x[2], "items": json.loads(x[3] or "[]"), "duration": x[4],
             "rpe": x[5], "note": x[6], "review": x[7], "kcal": x[8], "muscles": x[9]} for x in r]

def workouts_recent(cid, days=10, limit=8):
    cut = (dtoday() - timedelta(days=days)).isoformat()
    c = db(); r = c.execute("SELECT d,type,items,duration,rpe FROM workouts WHERE chat_id=? AND d>=? ORDER BY ts DESC LIMIT ?", (cid, cut, limit)).fetchall(); c.close()
    return [{"d": x[0], "type": x[1], "items": json.loads(x[2] or "[]"), "duration": x[3], "rpe": x[4]} for x in r]

def workouts_count_recent(cid, days=10):
    cut = (dtoday() - timedelta(days=days)).isoformat()
    c = db()
    r = c.execute(
        "SELECT COUNT(*) FROM workouts WHERE chat_id=? AND d>=?",
        (cid, cut),
    ).fetchone()
    c.close()
    return int((r or [0])[0] or 0)

def workout_del(cid, wid):
    c = db()
    c.execute("DELETE FROM workouts WHERE chat_id=? AND id=?", (cid, int(wid)))
    c.execute(
        """UPDATE chat_mutations SET reversed_at=?,result_json=NULL
           WHERE chat_id=? AND kind IN ('workout','workout_update') AND record_id=?""",
        (datetime.now(TZ).isoformat(), cid, str(int(wid))),
    )
    c.commit(); c.close()

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
    return _diary_totals_from_meals(ms)


def _diary_totals_from_meals(ms):
    return {
        "kcal": sum(m["kcal"] for m in ms),
        "protein": round(sum(m["protein"] for m in ms)),
        "fat": round(sum(m["fat"] for m in ms)),
        "carbs": round(sum(m["carbs"] for m in ms)),
        "count": len(ms),
    }

def cyc_add(cid, d, end=None, user_generation=None):
    c = db()
    if user_generation is not None:
        c.execute("BEGIN IMMEDIATE")
    if not _user_write_allowed(cid, user_generation, conn=c):
        c.close(); return False
    c.execute("INSERT OR IGNORE INTO cycles(chat_id,start_date,end_date) VALUES(?,?,?)", (cid, d, end))
    if end: c.execute("UPDATE cycles SET end_date=? WHERE chat_id=? AND start_date=?", (end, cid, d))
    c.commit(); c.close(); return True
def cyc_set_end(cid, start_iso, end_iso, user_generation=None):
    c = db()
    if user_generation is not None:
        c.execute("BEGIN IMMEDIATE")
    if not _user_write_allowed(cid, user_generation, conn=c):
        c.close(); return False
    c.execute("UPDATE cycles SET end_date=? WHERE chat_id=? AND start_date=?", (end_iso, cid, start_iso))
    c.commit(); c.close(); return True
def pa_list(cid):
    c = db(); r = c.execute("SELECT d FROM intimacy WHERE chat_id=? ORDER BY d", (cid,)).fetchall(); c.close(); return [x[0] for x in r]
def pa_toggle(cid, iso):
    c = db()
    if not _user_write_allowed(cid, conn=c):
        c.close(); return False
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
    c = db()
    if not _user_write_allowed(cid, conn=c):
        c.close(); return False
    c.execute("INSERT OR IGNORE INTO logs(chat_id,log_date,symptoms) VALUES(?,?,'')", (cid, d)); c.commit(); c.close(); return True
def log_set(cid, d, **kw):
    unknown = set(kw) - {"energy", "mood", "symptoms"}
    if unknown:
        raise ValueError("unknown log fields: " + ", ".join(sorted(unknown)))
    if not log_ensure(cid, d): return False
    c = db()
    if not _user_write_allowed(cid, conn=c):
        c.close(); return False
    # Dynamic identifier is safe because every key was checked above.
    for k, v in kw.items(): c.execute(f"UPDATE logs SET {k}=? WHERE chat_id=? AND log_date=?", (v, cid, d))  # nosec B608
    c.commit(); c.close(); return True
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
def _synthetic_user_id_min():
    raw = os.environ.get("AIWA_SYNTHETIC_USER_ID_MIN", "0") or "0"
    try:
        value = int(raw)
    except (TypeError, ValueError) as exc:
        raise RuntimeError(
            "AIWA_SYNTHETIC_USER_ID_MIN must be an integer"
        ) from exc
    if value < 0:
        raise RuntimeError("AIWA_SYNTHETIC_USER_ID_MIN must be non-negative")
    if value and value < 100_000_000_000:
        raise RuntimeError(
            "AIWA_SYNTHETIC_USER_ID_MIN must use the reserved >=100000000000 range"
        )
    return value

def all_users(include_synthetic=False):
    c = db()
    synthetic_min = _synthetic_user_id_min()
    rows = c.execute("""SELECT chat_id FROM users
        WHERE push_suppressed_at IS NULL
          AND ((last_period IS NOT NULL AND cycle_len IS NOT NULL)
               OR mode IN ('irregular','none','meno','preg','male'))
          AND (?=0 OR ?=1 OR chat_id<?)""",
        (synthetic_min, int(bool(include_synthetic)), synthetic_min),
    ).fetchall()
    c.close()
    return [x[0] for x in rows]
def meno_users():
    c = db(); rows = c.execute(
        "SELECT chat_id FROM users WHERE mode='meno' AND push_suppressed_at IS NULL"
    ).fetchall(); c.close(); return [x[0] for x in rows]
def del_user(cid):
    c = db()
    for t in ("users", "cycles", "logs", "chat_log", "intimacy", "sugg", "events", "meals", "workouts",
              "proactive_log", "proactive_state", "memory", "referrals", "push_deliveries",
              "prepared_summaries", "feedback_requests", "chat_mutations", "ai_jobs", "day_cache"):
        c.execute(f"DELETE FROM {t} WHERE chat_id=?", (cid,))  # nosec B608
    c.execute("DELETE FROM partners WHERE woman_id=? OR partner_id=?", (cid, cid))
    A2.delete_user(c, cid)
    c.commit(); c.close()
    CHAT_HIST.pop(cid, None)
    menu_cache_clear(cid)
    section_cache_clear(cid)
    for key in [key for key in list(_SUM_CACHE) if key and key[0] == cid]:
        _SUM_CACHE.pop(key, None)
    for key in [key for key in list(globals().get("_TODAY_CACHE", {})) if key and key[0] == cid]:
        _TODAY_CACHE.pop(key, None)
    if "_TODAY_CACHE_REVISION" in globals():
        _TODAY_CACHE_REVISION[cid] = _TODAY_CACHE_REVISION.get(cid, 0) + 1
    for key in [key for key in list(globals().get("_CARD_CACHE", {})) if key and key[0] == cid]:
        _CARD_CACHE.pop(key, None)
    for key in [key for key in list(globals().get("_WEEK_FOOD_CACHE", {})) if key and key[0] == cid]:
        _WEEK_FOOD_CACHE.pop(key, None)
    if "_WEEK_FOOD_REVISION" in globals():
        _WEEK_FOOD_REVISION[cid] = _WEEK_FOOD_REVISION.get(cid, 0) + 1
    BCAST_PENDING.discard(cid)
def chatlog_add(cid, role, text):
    if not text: return
    c = db()
    if not _user_write_allowed(cid, conn=c):
        c.close(); return False
    c.execute("INSERT INTO chat_log(chat_id,ts,role,text) VALUES(?,?,?,?)", (cid, datetime.now().isoformat(), role, text[:1500]))
    c.execute("DELETE FROM chat_log WHERE chat_id=? AND id NOT IN (SELECT id FROM chat_log WHERE chat_id=? ORDER BY id DESC LIMIT 120)", (cid, cid))
    c.commit(); c.close(); return True
def chatlog_get(cid, limit=60):
    c = db(); r = c.execute("SELECT role,text FROM chat_log WHERE chat_id=? ORDER BY id DESC LIMIT ?", (cid, limit)).fetchall(); c.close()
    return [{"role": x[0], "text": x[1]} for x in reversed(r)]
def set_partner_code(cid, code): upsert(cid, partner_code=code)
def woman_by_code(code):
    c = db(); r = c.execute("SELECT chat_id FROM users WHERE partner_code=?", (code,)).fetchone(); c.close(); return r[0] if r else None
def link_partner(partner_id, woman_id):
    c = db()
    if not (_user_write_allowed(partner_id, conn=c) and _user_write_allowed(woman_id, conn=c)):
        c.close(); return False
    c.execute("INSERT OR REPLACE INTO partners(partner_id,woman_id,created) VALUES(?,?,?)", (partner_id, woman_id, datetime.now().isoformat())); c.commit(); c.close(); return True
def partner_of(woman_id):
    c = db(); r = c.execute("SELECT partner_id FROM partners WHERE woman_id=?", (woman_id,)).fetchone(); c.close(); return r[0] if r else None
def woman_of_partner(pid):
    c = db(); r = c.execute("SELECT woman_id FROM partners WHERE partner_id=?", (pid,)).fetchone(); c.close(); return r[0] if r else None
def is_partner(cid): return woman_of_partner(cid) is not None

# Вопрос адресован партнёрше, а не себе: «как ей помочь», «что у неё сегодня».
_ABOUT_HER_RE = re.compile(
    r"\b(её|ее|ей|неё|нее|она|ней|жен[аеуы]|девушк\w+|партнёрш\w+|партнерш\w+|супруг[аеиу])\b",
    re.IGNORECASE,
)

def partner_question(cid, text):
    """Роль партнёра — это связь, а не отсутствие собственного профиля.

    Раньше партнёрский ответ выдавался по условию «связан И сам не прошёл
    онбординг»: стоило партнёру завести собственный профиль в Айве, и он
    переставал получать ответы про партнёршу — проваливался в обычную ветку.
    Теперь связь проверяется отдельно от своих данных: если профиля нет,
    партнёрский режим включён всегда, если есть — когда спрашивают про неё.
    """
    if not is_partner(cid):
        return False
    if not is_onboarded(row(cid)):
        return True
    return bool(_ABOUT_HER_RE.search(str(text or "")))
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

# Первое действие в реестре. Дальше сюда же переезжают остальные ветки
# `await_*`: сбор параметров у них общий, поэтому и ветка неудачи одна.
def _parse_time_phrase(text):
    """Достать время из живой фразы, а не только из «08:00».

    «Поставь сводку на 9:15» приходит целой репликой — и голосом почти всегда
    так. Сначала ищем время внутри текста, потом отдаём строку обычному
    parse_time: короткий ответ «8» на прямой вопрос он разберёт сам.
    """
    raw = " ".join(str(text or "").split())
    m = re.search(r"\b([01]?\d|2[0-3])[:.\s]([0-5]\d)\b", raw)
    if m:
        return f"{int(m.group(1)):02d}:{m.group(2)}"
    m = re.search(r"\b([01]?\d|2[0-3])\s*(?:час\w*|утра|вечера|дня)\b", raw.lower())
    if m:
        hour = int(m.group(1))
        if "вечера" in raw.lower() and hour < 12:
            hour += 12
        return f"{hour:02d}:00"
    return parse_time(raw)

ACT_SETTIME = dialog.register(dialog.Action(
    name="settime",
    title="Время сводки",
    description="Во сколько присылать ежедневную сводку.",
    params=(dialog.Param(
        name="hhmm",
        prompt="Во сколько присылать сводку (МСК)? Например 08:00.",
        parse=_parse_time_phrase,
        error="Нужно время по Москве, например 08:00.",
    ),),
))

def _parse_period_date(text):
    d = parse_date(text)
    return d.isoformat() if d else None

ACT_PERIOD_DATE = dialog.register(dialog.Action(
    name="period_date",
    title="Дата последних месячных",
    description="Отметить начало последних месячных.",
    params=(dialog.Param(
        name="iso",
        prompt="Напиши дату начала последних месячных, например 25.05.2026.",
        parse=_parse_period_date,
        error="Не разобрала дату. Нужен формат ДД.ММ.ГГГГ, например 25.05.2026.",
    ),),
))

def _parse_energy(text):
    low = " ".join(str(text or "").split()).lower()
    words = {"мало": 1, "низк": 1, "плохо": 1, "устал": 1, "сред": 2, "норм": 2,
             "нормаль": 2, "обычн": 2, "много": 3, "отлич": 3, "бодр": 3, "хорош": 3}
    for stem, value in words.items():
        if stem in low:
            return value
    m = re.search(r"\b([1-3])\b", low)
    return int(m.group(1)) if m else None

ACT_CHECKIN = dialog.register(dialog.Action(
    name="checkin",
    title="Чек-ин самочувствия",
    description="Отметить уровень энергии на сегодня.",
    params=(dialog.Param(
        name="energy",
        prompt="Как сегодня с энергией — мало, средне или много?",
        parse=_parse_energy,
        error="Скажи «мало», «средне» или «много».",
    ),),
))

def _parse_meal_hint(text):
    hint = " ".join(str(text or "").split())
    return hint[:80] if len(hint) >= 2 else None

ACT_MEAL_DELETE = dialog.register(dialog.Action(
    name="meal_delete",
    title="Удалить приём пищи",
    description="Удалить запись о приёме пищи за сегодня по её названию.",
    params=(dialog.Param(
        name="title",
        prompt="Какой приём удалить? Напиши название так, как оно записано.",
        parse=_parse_meal_hint,
        error="Напиши название приёма, например «творог».",
    ),),
))

ACT_EXPORT = dialog.register(dialog.Action(
    name="export_data",
    title="Выгрузка данных",
    description="Прислать файлом все записи пользователя: цикл, питание, тренировки, самочувствие.",
))

def _parse_voice_choice(text):
    low = " ".join(str(text or "").split()).lower()
    if re.search(r"\b(голос\w*|говор\w+|озвуч\w+|аудио|voice)\b", low):
        return "voice"
    if re.search(r"\b(текст\w*|письм\w+|молч\w+|без голоса|text)\b", low):
        return "text"
    return None

ACT_VOICE_MODE = dialog.register(dialog.Action(
    name="voice_mode",
    title="Ответы голосом",
    description="Отвечать голосом или текстом на голосовые сообщения.",
    params=(dialog.Param(
        name="choice",
        prompt="Как отвечать на голосовые — голосом или текстом?",
        parse=_parse_voice_choice,
        error="Напиши «голосом» или «текстом».",
    ),),
))

def _parse_cycle_len(text):
    m = re.search(r"\d{1,2}", text or "")
    if not m:
        return None
    value = int(m.group())
    return value if 15 <= value <= 60 else None

ACT_CYCLE_LEN = dialog.register(dialog.Action(
    name="cycle_len",
    title="Длина цикла",
    description="Средняя длина цикла в днях.",
    params=(dialog.Param(
        name="days",
        prompt="Какая средняя длина цикла? Напиши число, например 28.",
        parse=_parse_cycle_len,
        error="Нужно число от 15 до 60.",
    ),),
))

def calc_calories(cm, kg, age, act, male=False):
    # Миффлин-Сан Жеор: −161 для женщин, +5 для мужчин.
    bmr = 10 * kg + 6.25 * cm - 5 * age + (5 if male else -161)
    tdee = bmr * {1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9}.get(act, 1.375)
    p = round(1.6 * kg); fat = round(tdee * 0.3 / 9); carbs = round(max(0, tdee - p * 4 - fat * 9) / 4)
    return round(tdee), p, fat, carbs

ACT_RU = {1: "сидячий образ жизни", 2: "лёгкая активность", 3: "умеренная активность", 4: "высокая активность", 5: "очень высокая активность"}
DIET = [("veg", "Вегетарианство"), ("vegan", "Веган"), ("nolac", "Без лактозы"), ("noglu", "Без глютена"), ("nonuts", "Без орехов"), ("pesc", "Пескетарианство")]
DIETD = dict(DIET)
def profile_of(u):
    if u and u.get("height") and u.get("weight") and u.get("age"):
        return {"height": u["height"], "weight": u["weight"], "age": u["age"], "activity": u.get("activity") or 2,
                "diet": u.get("diet") or "", "diet_note": u.get("diet_note") or "", "kcal_goal": u.get("kcal_goal"),
                "male": (u.get("mode") == "male")}
    return None
def llm_profile_of(u):
    """LLM context includes Telegram identity even when health profile was skipped."""
    profile = dict(profile_of(u) or {})
    name = _clean_telegram_first_name((u or {}).get("tg_first_name"))
    if name:
        profile["first_name"] = name
    return profile or None
_UNVERIFIED_MUTATION_CLAIM_RE = re.compile(
    r"(?<!бы\s)\b(?:я\s+)?(?:записал[аи]?|сохранил[аи]?|внесл[аи]?|"
    r"скорректировал[аи]?)\b(?!\s+бы\b)|"
    r"\b(?:добавил[аи]?|исправил[аи]?|обновил[аи]?|отметил[аи]?)\b"
    r".{0,60}\b(?:дневник\w*|запис\w*|трениров\w*|месячн\w*|"
    r"календар\w*|профил\w*|данн\w*)\b|"
    r"\b(?:вс[её]\s+)?(?:сохранено|записано|добавлено|обновлено)\b|"
    r"\bзапись\s+уже\s+(?:видна|в\s+дневнике)\b",
    re.I,
)
_MALE_REPRODUCTIVE_STRONG_RE = re.compile(
    r"\b(?:фолликул\w*|лютеин\w*|овуляц\w*|месячн\w*|"
    r"менструац\w*|пмс)\b",
    re.I,
)
_MALE_CYCLE_CONTEXT_FORBIDDEN_RE = re.compile(
    r"\b(?:день|фаз\w*|длин\w*|календар\w*|прогноз\w*|"
    r"отслежив\w*)\b.{0,32}\bцикл\w*\b|"
    r"\bцикл\w*\b.{0,32}\b(?:день|фаз\w*|длин\w*|месячн\w*|"
    r"менструац\w*|овуляц\w*)\b|"
    r"\b(?:по|о)\s+(?:мо(?:ему|ём)\s+)?цикл\w*\b",
    re.I,
)
_MALE_CYCLE_FORBIDDEN_RE = re.compile(
    _MALE_REPRODUCTIVE_STRONG_RE.pattern + r"|" +
    _MALE_CYCLE_CONTEXT_FORBIDDEN_RE.pattern,
    re.I,
)
_MALE_BENIGN_CYCLE_RE = re.compile(
    r"\b(?:день|фаз\w*|длин\w*)?\s*"
    r"(?:трениров\w*|нагрузоч\w*|восстановитель\w*|сон\w*|сна)\s+"
    r"цикл\w*\b|"
    r"\bцикл\w*\s+(?:трениров\w*|нагруз\w*|восстановлен\w*|сон\w*|сна)\b",
    re.I,
)
_MALE_SUGGESTION_PERSONAL_CYCLE_RE = re.compile(
    r"\bчто\s+сейчас\s+с\s+цикл\w*\b|"
    r"\b(?:мой|твой|ваш)\s+цикл\w*\b",
    re.I,
)
_MEDICAL_ESCALATION_RE = re.compile(
    r"\b(?:врач\w*|скор\w+\s+помощ\w*|неотлож\w*|112|температур\w*|"
    r"кровотеч\w*|резк\w+\s+ухудш\w*|сильн\w+\s+бол\w*)\b",
    re.I,
)
MALE_PROFILE_FUNCTION_TEXT = (
    "Эта функция недоступна для мужского профиля. "
    "Можно вести дневник самочувствия, питание и нагрузку или собрать "
    "выписку по самочувствию."
)
MALE_SAFE_SUGGESTIONS = (
    "Что важно сегодня?",
    "Открыть питание",
    "Открыть нагрузку",
)
_MALE_CYCLE_MUTATION_KIND_RE = re.compile(
    r"^(?:period(?:$|_)|cycle(?:$|_)|cyclelen$|addcycles$|"
    r"ovulation(?:$|_)|menstruation(?:$|_))",
    re.I,
)

def is_male_profile(u):
    return bool(u and u.get("mode") == "male")

def _male_cycle_content_forbidden(text):
    """Block reproductive cycle copy without rejecting training/sleep cycles."""
    value = str(text or "")
    if _MALE_REPRODUCTIVE_STRONG_RE.search(value):
        return True
    without_benign_cycles = _MALE_BENIGN_CYCLE_RE.sub("", value)
    return bool(_MALE_CYCLE_CONTEXT_FORBIDDEN_RE.search(without_benign_cycles))

def _male_suggestion_forbidden(text):
    value = str(text or "")
    if _male_cycle_content_forbidden(value):
        return True
    without_benign_cycles = _MALE_BENIGN_CYCLE_RE.sub("", value)
    return bool(_MALE_SUGGESTION_PERSONAL_CYCLE_RE.search(without_benign_cycles))

def _male_reply_fallback(original=None, escalation_required=None):
    text = (
        "Для этого профиля я ориентируюсь на самочувствие, сон, питание, "
        "восстановление и фактическую нагрузку. Напиши, что именно хочешь "
        "разобрать, и я отвечу по этим данным."
    )
    if escalation_required is None:
        escalation_required = bool(
            _MEDICAL_ESCALATION_RE.search(str(original or ""))
        )
    if escalation_required:
        text += (
            " Если есть сильная или нарастающая боль, высокая температура, "
            "кровотечение либо резкое ухудшение состояния, обратись к врачу; "
            "при экстренных симптомах — за неотложной помощью."
        )
    return text

def _male_safe_history(items, text_key="text"):
    """Preserve ordering/user turns; rewrite unsafe assistant text consistently."""
    out = []
    for item in items or []:
        safe_item = dict(item)
        role = str(item.get("role") or "")
        text = item.get(text_key)
        if (
            role in ("ai", "assistant")
            and _male_cycle_content_forbidden(text)
        ):
            safe_item[text_key] = _male_reply_fallback(text)
        out.append(safe_item)
    return out

def guard_aiwa_suggestions(cid, items):
    """Male profiles never receive reproductive suggestions, even from an LLM."""
    values = [str(item).strip() for item in (items or []) if str(item).strip()]
    if not is_male_profile(row(cid)):
        return values
    safe = [item for item in values if not _male_suggestion_forbidden(item)]
    for fallback in MALE_SAFE_SUGGESTIONS:
        if len(safe) >= 2:
            break
        if fallback not in safe:
            safe.append(fallback)
    return safe

def guard_aiwa_reply(cid, text, verified_mutation=False):
    """Final identity and write-truth invariants before model text reaches the user."""
    u = row(cid)
    try:
        guarded = L.guard_user_address(text, llm_profile_of(u))
    except Exception:
        guarded = text
    # Suggestions are protocol metadata.  Strip them again at the final
    # delivery boundary so direct, partner and onboarding paths are protected
    # too, not only the main send_answer() route.
    try:
        guarded = L.split_followups(guarded)[0]
    except Exception:
        pass
    if is_male_profile(u) and _male_cycle_content_forbidden(guarded):
        ev(cid, "fallback", meta="male_mode_content_guard")
        return _male_reply_fallback(
            guarded,
            escalation_required=bool(
                _MEDICAL_ESCALATION_RE.search(str(guarded or ""))
            ),
        )
    if not verified_mutation and _UNVERIFIED_MUTATION_CLAIM_RE.search(str(guarded or "")):
        ev(cid, "journal_claim_blocked", meta="unverified_model_claim")
        return (
            "В этом сообщении сервер не подтвердил изменение дневника, поэтому я не буду "
            "говорить, что запись сохранена. Напиши, что именно нужно добавить или исправить, "
            "и я подтвержу результат только после проверки в приложении."
        )
    return guarded

def guard_chat_payload(cid, payload):
    """Final WebApp/voice boundary for generated text and button metadata."""
    out = dict(payload or {})
    out["answer"] = md_plain(guard_aiwa_reply(cid, out.get("answer") or ""))
    out["suggestions"] = guard_aiwa_suggestions(cid, out.get("suggestions"))[:2]
    if is_male_profile(row(cid)):
        blocked_mutation = False
        mutation = out.get("mutation") or {}
        if _MALE_CYCLE_MUTATION_KIND_RE.search(str(mutation.get("kind") or "")):
            out.pop("mutation", None)
            blocked_mutation = True
        raw_mutations = out.get("mutations") or []
        mutations = [
            item for item in raw_mutations
            if isinstance(item, dict)
            and not _MALE_CYCLE_MUTATION_KIND_RE.search(
                str(item.get("kind") or "")
            )
        ]
        blocked_mutation = blocked_mutation or len(mutations) < len(raw_mutations)
        if mutations:
            out["mutations"] = mutations
        else:
            out.pop("mutations", None)
        if blocked_mutation:
            out["mutation_blocked"] = "male_mode"
            if mutations:
                out["answer"] = (
                    str(out.get("answer") or "").rstrip()
                    + "\n\n"
                    + MALE_PROFILE_FUNCTION_TEXT
                ).strip()
            else:
                out["answer"] = MALE_PROFILE_FUNCTION_TEXT
            out["suggestions"] = list(MALE_SAFE_SUGGESTIONS[:2])
            ev(cid, "male_mode_block", meta="payload_cycle_mutation")
    return out

def diet_human(code_csv):
    if not code_csv: return "без ограничений"
    return ", ".join(DIETD.get(x, x) for x in code_csv.split(",") if x) or "без ограничений"
def profile_kcal(p):
    base = calc_calories(p["height"], p["weight"], p["age"], p["activity"], male=bool(p.get("male")))
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
    if any(k in t for k in ("что такое айва", "что такое aiwa", "расскажи о себе", "расскажи про себя", "расскажи о айв", "расскажи про айв", "расскажи о aiwa", "кто ты", "о тебе", "про себя", "что ты умеешь", "что умеешь", "что ты можешь", "что можешь", "чем можешь помочь", "чем ты помога", "чем занимаешься", "что ты делаешь", "что ты за", "что за бот", "какой ты бот", "представься", "твои возможност", "какие возможност", "какие у тебя функц", "твои функц", "что ты такое", "для чего ты", "ты кто")): return "about"
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

_JOURNAL_THIRD_PARTY_EVENT_RE = (
    r"(?:съел\w*|доел\w*|поел\w*|перекусил\w*|ел[аи]?\b|кушал\w*|"
    r"выпил\w*|попробовал\w*|кусал\w*|куснул\w*|"
    r"тренировал\w*|потренир\w*|занимал\w*|сделал\w*|бегал\w*|"
    r"ходил\w*|плавал\w*|начал\w*|пришл\w*|законч\w*|завершил\w*)"
)
_JOURNAL_NON_NAME_STARTERS = (
    r"Сегодня|Вчера|Позавчера|Сейчас|Позже|Потом|Затем|Утром|Днём|Днем|"
    r"Вечером|Ночью|Пожалуйста|Айва|До|После|Перед|Только|На|"
    r"Ну|Так|А|И|Ещё|Еще|Кстати|Короче|Вообще|Ладно|Нет|Да|"
    r"Как|Можешь|Запиши|Записать|Добавь|Добавить|Внеси|Внести|"
    r"Отметь|Отметить|Зафиксируй|Зафиксировать|"
    r"Месячные|Менструация|Тренировка|Тренировку|Тренировки|Кардио|"
    r"Силовая|Силовую|Йога|Завтрак|Обед|Ужин|Перекус"
)

def _journal_third_party_source(text):
    """Общий fail-closed guard для старого и семантического mutation router."""
    raw = str(text or "")
    low = raw.lower()
    if re.search(r"\b(?:по\s+словам|со\s+слов|как\s+рассказал\w*|как\s+сообщил\w*)\b", low):
        return True
    if re.search(
        r"\bу\s+(?!меня\b)(?:[А-ЯЁ][а-яё-]{1,30}|подруг\w*|дочер\w*|дочк\w*|"
        r"сестр\w*|мам\w*|жен\w*|девушк\w*)\b",
        raw,
        re.I,
    ):
        return True
    if re.search(
        r"\b(?:моя\s+|мой\s+)?(?:дочь|дочка|подруга|сестра|мама|жена|девушка|"
        r"сын|муж|парень|она|он)\b.{0,55}" + _JOURNAL_THIRD_PARTY_EVENT_RE,
        low,
        re.I,
    ):
        return True
    return bool(re.search(
        r"\b(?!(?:" + _JOURNAL_NON_NAME_STARTERS + r")\b)"
        r"[А-ЯЁ][а-яё-]{1,30}\b.{0,55}" + _JOURNAL_THIRD_PARTY_EVENT_RE,
        raw,
    ))

def _journal_explicit_first_person_event(text):
    """True when a fragment explicitly attributes an event to this account owner."""
    raw = str(text or "")
    return bool(
        re.search(r"\bя\b.{0,90}" + _JOURNAL_THIRD_PARTY_EVENT_RE, raw, re.I)
        and not re.search(
            r"\b(?:по\s+словам|как\s+рассказал\w*|как\s+сообщил\w*|"
            r"цитир\w*|сказал\w*\s*,?\s+что)\b",
            raw,
            re.I,
        )
    )

_TRAINING_SECTION_INTENT_RE = re.compile(
    r"(?:"
    r"(?:собер|состав|подбер)\w*.{0,24}(?:трениров\w*|нагрузк\w*)|"
    r"(?:покажи|дай)\w*.{0,18}(?:трениров\w*|нагрузк\w*|план\w*)"
    r"(?:.{0,12}(?:сегодня|на\s+день))?|"
    r"(?:какую|какая)\s+(?:мне\s+)?(?:сегодня\s+)?"
    r"(?:трениров\w*|нагрузк\w*)|"
    r"(?:трениров\w*|нагрузк\w*|упражнен\w*)\s+на\s+сегодня|"
    r"какой\s+(?:мне\s+)?спорт|каким\s+спортом|"
    r"чем\s+(?:мне\s+)?(?:сегодня\s+)?(?:заня\w*|позанима\w*)|"
    r"какая\s+(?:сегодня\s+)?активн\w*|"
    r"что\s+(?:мне\s+)?потренир\w*(?:\s+сегодня)?|"
    r"что\s+по\s+(?:спорт\w*|трениров\w*|нагрузк\w*)|"
    r"можно\s+ли\s+(?:мне\s+)?(?:сегодня\s+)?"
    r"(?:бегать|качат\w*|приседат\w*)"
    r")",
    re.I,
)

def match_intent(t):
    raw_t = str(t or "")
    t = t.lower()
    _mutation_denied = bool(re.search(
        r"\b(?:не|не\s+надо|не\s+нужно)\s+(?:запис\w*|запиш\w*|добав\w*|внос\w*|"
        r"внес\w*|занос\w*|занес\w*|отмеч\w*|отмет\w*|фиксир\w*|зафиксир\w*)",
        t,
    ))
    _date_question = re.search(
        r"\b(?:какая\s+(?:сегодня\s+)?дата|какое\s+(?:сегодня\s+)?число|"
        r"сегодня\s+какое\s+число|какой\s+сегодня\s+день(?!\s+цикл))\b",
        t,
    )
    _journal_signal = bool(
        re.search(
            r"\b(?:запис\w*|запиш\w*|добав\w*|внес\w*|занес\w*|отмет\w*|"
            r"зафиксир\w*|залогир\w*|логни)\b",
            t,
        )
        or _JOURNAL_SEMANTIC_CANDIDATE_RE.search(raw_t)
    )
    # A deterministic date answer is safe only for a standalone question.
    # Combined messages must continue through journal routing so a write is
    # never discarded merely because the same sentence mentions today's date.
    if _date_question and (not _journal_signal or _mutation_denied):
        return "current_date"
    _mutation_context_blocked = bool(
        _journal_third_party_source(raw_t)
        or "?" in t
        or re.search(r"\b(кажется|вроде|возможно|наверное|не\s+уверен\w*|может\s+быть|"
                     r"допустим|например|представим|цитат\w*|если|в\s+случае|когда|"
                     r"у\s+(?:подруг\w*|дочк\w*|сестр\w*|мам\w*)|"
                     r"(?:я|она|он|мне)\s+(?:сказал\w*|говорил\w*)|мне\s+говорят|"
                     r"(?:говорят|сказали|сообщили|рассказали)|"
                     r"не\s+был[оаи]?|нет\s+(?:месячн\w*|трениров\w*))\b", t)
        or re.search(
            r"\b(?:моя\s+|мой\s+)?(?:дочь|дочка|подруга|сестра|мама|жена|девушка|"
            r"сын|муж|парень|она|он)\s+.{0,24}(?:съел\w*|поел\w*|ел\w*|кушал\w*|"
            r"тренировал\w*|бегал\w*|ходил\w*|плавал\w*|начал\w*|пришл\w*)",
            t,
        )
        or re.search(r"[«»\"]", t)
        or re.search(
            r"^\s*У\s+(?!меня\b)[А-ЯЁ][а-яё-]{1,30}\s+.{0,30}"
            r"(?:начал\w*|пришл\w*|съел\w*|поел\w*|бегал\w*|ходил\w*|плавал\w*)",
            raw_t,
        )
        or re.search(
            r"\b(?!(?:Сегодня|Вчера|Позавчера|Месячные|Менструация|Я|Айва|Как|"
            r"Можешь|Пожалуйста|После|Перед|Только)\b)"
            r"[А-ЯЁ][а-яё-]{1,30}\s+(?:(?:сегодня|вчера|позавчера)\s+)?"
            r"(?:начал\w*|пришл\w*|съел\w*|поел\w*|бегал\w*|ходил\w*|плавал\w*)",
            raw_t,
        )
    )
    if re.search(r"(помен|измен|задать|настро|переключ|во ?сколько|поставь).{0,24}(время|рассылк|сводк|присыл)", t) or re.search(r"\bвремя\b\s*(рассылк|сводк|присыл)", t): return "time"
    # Выгрузка данных. Без явного интента фраза «пришли мои данные» уходила в
    # справку о приватности: та отвечает на «какие данные вы храните», а тут
    # человек просит сами записи.
    if re.search(r"(пришл\w*|отправ\w*|скач\w*|выгруз\w*|экспорт\w*|дай|отдай)\w*[^.]{0,24}"
                 r"(мои\s+данн\w*|мои\s+запис\w*|все\s+данн\w*|выгрузк\w*|бэкап|архив)", t) \
            or re.search(r"\b(экспорт|выгрузк\w*)\s+(данн\w*|запис\w*)", t): return "export"
    # Чек-ин самочувствия утверждением: «сегодня мало энергии» — это отметка,
    # а не вопрос, и раньше уходило в обычный ответ ИИ.
    if re.search(r"(сегодня|сейчас|у меня)[^.]{0,24}(мало|низк\w*|нет|много|высок\w*|средн\w*|норм\w*)"
                 r"[^.]{0,12}(энерги\w*|сил)", t) \
            or re.search(r"(энерги\w*|сил)[^.]{0,16}(мало|низк\w*|много|высок\w*|средн\w*)", t): return "energy"
    if re.search(r"(добав|ввес|внес|загруз|импорт)\w*.{0,16}(истори\w*\s*цикл|цикл)|истори\w*\s*цикл\w*\s*вручную|(импорт|перенес\w*).{0,12}(flo|фло)", t): return "addcycles"
    if re.search(r"(ввес\w*|поменя\w*|измен\w*|обнов\w*|исправ\w*|задат\w*|укаж\w*|написа\w*|внес\w*|поправ\w*)\s*(свой|свои|мой|мои)?\s*(вес|рост|возраст|данные|параметр)|мой вес|новый вес|неправильн\w*.{0,18}(вес|рост|возраст|данные)", t): return "profile"
    if re.search(r"фаз", t) and re.search(r"(что так|что значит|расскаж|объясн|не понима|не разбира|какие бывают|подробнее|про фаз)", t): return "phases"
    if (
        re.search(r"месячн|менструац", t)
        and re.search(r"(законч[иеё]\w*|кончил\w*|завершил\w*|прошл[иаяо]|перестал\w*|отошл\w*|закончен)", t)
        and not re.search(r"\b(когда|как|почему|сколько|можно\s+ли)\b", t)
        and not re.search(r"\bне\s+(?:законч\w*|кончил\w*|завершил\w*|прошл\w*|перестал\w*|отошл\w*)", t)
        and not _mutation_denied
        and not _mutation_context_blocked
    ):
        return "period_end"
    _write = re.search(r"\b(запис\w*|запиш\w*|добав\w*|внес\w*|занес\w*|отмет\w*|зафиксир\w*|залогир\w*|логни)\b", t)
    if _mutation_denied:
        _write = None
    _hard_write_question = re.search(
        r"^\s*(?:айва[,\s]*)?(?:как|где|когда|почему)\s+(?:мне\s+|это\s+)?"
        r"(?:запис\w*|добав\w*|внес\w*|занес\w*|отмет\w*|зафиксир\w*)",
        t,
    )
    _capability_question = re.search(r"\b(можно\s+ли|можешь\s+ли|можешь|умеешь\s+ли)\b", t)
    _food_done = re.search(
        r"\b(?:я\s+)?(?:съел\w*|поел\w*|ел[аи]?\b|кушал\w*|скушал\w*|покушал\w*|выпил\w*)",
        t,
    )
    _food_negated = re.search(
        r"\bне\s+(?:съел\w*|поел\w*|ел[аи]?\b|кушал\w*|скушал\w*|покушал\w*|выпил\w*)",
        t,
    )
    _food_slot = re.search(r"\b(?:завтрак\w*|обед\w*|ужин\w*|перекус\w*|полдник\w*)", t)
    _food_non_event = re.search(r"\b(?:рецепт\w*|меню|план\w*|расписани\w*|встреч\w*)", t)
    _workout_done = re.search(
        r"\b(?:потренир\w*|тренировал\w*|занимал\w*|бегал\w*|пробежал\w*|"
        r"ходил\w*|плавал\w*|сделал\w*.{0,12}трениров\w*|был[аи]?\s+на\s+(?:йог|пилатес))",
        t,
    )
    _workout_negated = re.search(
        r"\bне\s+(?:потренир\w*|тренировал\w*|занимал\w*|бегал\w*|пробежал\w*|ходил\w*|плавал\w*)",
        t,
    )
    _period_started = re.search(
        r"(?:начал\w*|пришл\w*|пошл\w*)\s+(?:сегодня\s+)?(?:месячн|менструац)|"
        r"(?:месячн|менструац)\w*\s+(?:начал\w*|пришл\w*|пошл\w*)",
        t,
    )
    _period_negated = re.search(r"\bне\s+(?:начал\w*|пришл\w*|пошл\w*)", t)
    if (
        re.search(r"(месячн|менструац|критическ\w*\s+дн)", t)
        and (_write or _period_started)
        and not _mutation_denied
        and not _period_negated
        and not _mutation_context_blocked
        and not _hard_write_question
        and not (_capability_question and not _period_started)
    ):
        return "logperiod"
    if (
        _write
        and not _food_negated
        and not _food_non_event
        and not _mutation_context_blocked
        and (_food_done or _food_slot)
        and not _hard_write_question
        and not (_capability_question and not _food_done)
    ):
        return "logmeal"
    if _write and not _workout_negated and not _mutation_context_blocked and not _hard_write_question and not (_capability_question and not _workout_done) and re.search(
        r"(трениров\w*|потренир\w*|занимал\w*|бегал\w*|пробеж\w*|ходил\w*|"
        r"йог\w*|пилатес\w*|плавал\w*|кардио|силов\w*|растяж\w*|велосипед\w*|"
        r"присед\w*|выпад\w*|планк\w*|отжим\w*|подтяг\w*|жим\w*|тяг\w*)",
        t,
    ):
        return "logworkout"
    if re.search(r"(длин\w*|продолжительн\w*).{0,14}цикл|цикл.{0,8}(длин|продолж)|(измен\w*|поменя\w*|задат\w*|сменит\w*|настро\w*|выстав\w*|постав\w*|укаж\w*).{0,14}(длин\w*\s*)?цикл|цикл\w*\s*(на\s+)?\d{1,2}\s*дн", t): return "cyclelen"
    # A topic mention is not a navigation intent. Questions such as
    # “полезно ли кардио?” and “почему болят мышцы после тренировки?” must
    # reach the conversational answer path. Only an explicit request for a
    # personal section/plan is routed to the generated training card.
    if _TRAINING_SECTION_INTENT_RE.search(t):
        return "training"
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

_JOURNAL_MUTATION_INTENTS = frozenset({
    "logmeal", "logmealbatch", "logjournalbatch", "updatemeal", "movemealslot", "appendmealitem",
    "logworkout", "updateworkout", "logperiod", "period_end",
    "journalunavailable", "journalreplay",
})
_JOURNAL_SEMANTIC_CANDIDATE_RE = re.compile(
    r"\b(?:"
    r"съел\w*|доел\w*|поел\w*|перекусил\w*|ел[аи]?\b|кушал\w*|скушал\w*|"
    r"покушал\w*|пил[аи]?\b|выпил\w*|попил\w*|попробовал\w*|кусал\w*|куснул\w*|"
    r"завтрак\w*|обед\w*|ужин\w*|перекус\w*|"
    r"тренир\w*|потренир\w*|занимал\w*|спорт\w*|зал\w*|упражнен\w*|"
    r"бегал\w*|пробеж\w*|ходил\w*|гулял\w*|плавал\w*|бассейн\w*|"
    r"йог\w*|пилатес\w*|кардио\w*|силов\w*|растяж\w*|зарядк\w*|"
    r"велосипед\w*|присед\w*|выпад\w*|планк\w*|отжим\w*|подтяг\w*|"
    r"месячн\w*|менструац\w*|критическ\w*\s+дн\w*"
    r")\b",
    re.I,
)
_JOURNAL_SEMANTIC_HARD_BLOCK_RE = re.compile(
    r"\b(?:"
    r"если|допустим|представим|кажется|вроде|возможно|наверное|не\s+уверен\w*|"
    r"может\s+быть|планир\w*|собира\w*|буду|хочу|хотел\w*|"
    r"посовет\w*|подскаж\w*|состав\w*|порекоменду\w*|"
    r"говорят|сказали|сообщили|рассказали|цитат\w*"
    r")\b",
    re.I,
)
_JOURNAL_META_INSTRUCTION_RE = re.compile(
    r"\b(?:игнорируй|инструкц\w*|системн\w*\s+промпт|system|assistant|json|"
    r"action|subject|confidence|primary_purpose|верни\s+ответ|ответь\s+строго)\b",
    re.I,
)
_JOURNAL_PERIOD_SOURCE_RE = re.compile(r"\b(?:месячн\w*|менструац\w*|критическ\w*\s+дн\w*)\b", re.I)
_JOURNAL_FOOD_COMPLETED_RE = re.compile(
    r"\b(?:съел\w*|доел\w*|поел\w*|перекусил\w*|ел[аи]?\b|кушал\w*|"
    r"скушал\w*|покушал\w*|пил[аи]?\b|выпил\w*|попил\w*|попробовал\w*|"
    r"кусал\w*|куснул\w*)\b|"
    r"\b(?:на\s+)?(?:завтрак\w*|обед\w*|ужин\w*|перекус\w*)\b"
    r"(?:\s+у\s+меня)?\s*(?:был[аи]?|были|съел\w*|поел\w*|:|-)",
    re.I,
)
_JOURNAL_FOOD_NEGATED_RE = re.compile(
    r"\bне\s+(?:съел\w*|доел\w*|поел\w*|перекусил\w*|ел[аи]?\b|"
    r"кушал\w*|скушал\w*|покушал\w*|пил[аи]?\b|выпил\w*|попил\w*|"
    r"попробовал\w*|кусал\w*|куснул\w*)\b",
    re.I,
)
_JOURNAL_WORKOUT_COMPLETED_RE = re.compile(
    r"\b(?:потренир\w*|тренировал\w*|занимал\w*|бегал\w*|пробежал\w*|"
    r"ходил\w*|сходил\w*|гулял\w*|плавал\w*|качал\w*|танцевал\w*|"
    r"приседал\w*|поприседал\w*|отжимал\w*|подтягивал\w*|"
    r"делал\w*\s+(?:планк\w*|выпад\w*|присед\w*|упражнен\w*))\b|"
    r"\b(?:был[аи]?|сходил\w*)\s+(?:сегодня\s+|вчера\s+|позавчера\s+)?"
    r"(?:на|в)\s+(?:трениров\w*|йог\w*|пилатес\w*|фитнес\w*|бокс\w*|"
    r"танц\w*|бассейн\w*|зал\w*)\b|"
    r"\b(?:сделал\w*|провел\w*|закончил\w*)\b.{0,45}"
    r"\b(?:трениров\w*|кардио\w*|силов\w*|растяж\w*|зарядк\w*)\b|"
    r"\b(?:трениров\w*|кардио\w*|силов\w*|растяж\w*|зарядк\w*)\b.{0,45}"
    r"\b(?:сделал\w*|провел\w*|закончил\w*)\b",
    re.I,
)
_JOURNAL_WORKOUT_NEGATED_RE = re.compile(
    r"\bне\s+(?:(?:сегодня|вчера|позавчера)\s+)?(?:"
    r"потренир\w*|тренировал\w*|занимал\w*|бегал\w*|пробежал\w*|"
    r"ходил\w*|сходил\w*|гулял\w*|плавал\w*|качал\w*|танцевал\w*|"
    r"приседал\w*|поприседал\w*|отжимал\w*|подтягивал\w*|"
    r"делал\w*|сделал\w*|провел\w*|закончил\w*|был[аи]?"
    r")\b",
    re.I,
)
_JOURNAL_PERIOD_START_RE = re.compile(
    r"\b(?:начал\w*|пришл\w*|пошл\w*|открыл\w*)\b", re.I,
)
_JOURNAL_PERIOD_END_RE = re.compile(
    r"\b(?:законч\w*|кончил\w*|завершил\w*|прошл\w*|перестал\w*|отошл\w*)\b", re.I,
)
_JOURNAL_PERIOD_NEGATED_RE = re.compile(
    r"\bне\s+(?:начал\w*|пришл\w*|пошл\w*|открыл\w*|законч\w*|"
    r"кончил\w*|завершил\w*|прошл\w*|перестал\w*|отошл\w*)\b|"
    r"\b(?:месячн\w*|менструац\w*)\s+(?:ещ[её]\s+)?не\s+"
    r"(?:начал\w*|пришл\w*|пошл\w*|законч\w*|завершил\w*|прошл\w*)\b",
    re.I,
)
_JOURNAL_CONTEXT_OPEN_RE = re.compile(
    r"^\s*(?:а\s+)?(?:и\s+)?(?:ещ[её]|также|плюс)\b|"
    r"^\s*(?:ну|нет|неа|точнее|вернее|на\s+самом\s+деле)\b|"
    r"\b(?:исправ\w*|скорректир\w*|измени\w*|поменя\w*|"
    r"было\s+не|не\s+\d+|меньше|больше|всего)\b",
    re.I,
)
_JOURNAL_CORRECTION_RE = re.compile(
    r"\b(?:исправ\w*|скорректир\w*|измени\w*|поменя\w*|"
    r"точнее|вернее|на\s+самом\s+деле|меньше|больше|"
    r"\d+(?:[.,]\d+)?\s*(?:г|гр|грамм\w*|кг|ккал|мин\w*|час\w*|"
    r"подход\w*|повтор\w*))\b",
    re.I,
)
_JOURNAL_PAST_DAY_RE = re.compile(
    r"\b(?:вчера|позавчера|накануне)\b|"
    r"\b\d{1,2}[./]\d{1,2}\b|\b\d{1,2}(?:-го|\s+числа)\b|"
    r"\b(?:дня|дней|день)\s+назад\b",
    re.I,
)
_JOURNAL_BREAKFAST_TYPO_RE = re.compile(
    r"\bна\s+завтра(?=\s+(?:(?:я|мы)\s+)?"
    r"(?:съел\w*|поел\w*|ел[аи]?\b|кушал\w*|выпил\w*))",
    re.I,
)
_JOURNAL_COMPLETED_VERB_FORMS = (
    "съел", "съела", "съели",
    "доел", "доела", "доели",
    "поел", "поела", "поели",
    "перекусил", "перекусила", "перекусили",
    "кушал", "кушала", "кушали",
    "скушал", "скушала", "скушали",
    "покушал", "покушала", "покушали",
    "пил", "пила", "пили",
    "выпил", "выпила", "выпили",
    "попробовал", "попробовала", "попробовали",
    "кусал", "кусала", "кусали",
    "куснул", "куснула", "куснули",
)
_JOURNAL_INFINITIVE_SUFFIXES = ("ть", "ться", "ти")

def _journal_edit_distance_at_most_one(left, right):
    """Small bounded distance used only for the closed completed-verb lexicon."""
    a = str(left or "")
    b = str(right or "")
    if a == b:
        return True
    if abs(len(a) - len(b)) > 1:
        return False
    if len(a) == len(b):
        return sum(x != y for x, y in zip(a, b)) <= 1
    if len(a) > len(b):
        a, b = b, a
    index_a = index_b = differences = 0
    while index_a < len(a) and index_b < len(b):
        if a[index_a] == b[index_b]:
            index_a += 1
            index_b += 1
            continue
        differences += 1
        if differences > 1:
            return False
        index_b += 1
    return True

def _normalize_journal_completed_verbs(text):
    """Repair one-character ASR/typing damage without rewriting food names."""
    raw = str(text or "")

    def replace(match):
        token = match.group(0)
        folded = token.casefold().replace("ё", "е")
        if (
            len(folded) < 4
            or folded.endswith(_JOURNAL_INFINITIVE_SUFFIXES)
            or folded in _JOURNAL_COMPLETED_VERB_FORMS
        ):
            return token
        candidates = [
            form for form in _JOURNAL_COMPLETED_VERB_FORMS
            if abs(len(folded) - len(form)) <= 1
            and folded[:2] == form[:2]
            and _journal_edit_distance_at_most_one(folded, form)
        ]
        if len(candidates) != 1:
            return token
        replacement = candidates[0]
        if token[:1].isupper():
            replacement = replacement.capitalize()
        return replacement

    return re.sub(r"[А-Яа-яЁё]{3,}", replace, raw)

def _normalize_journal_typo(text):
    """Normalize bounded event-language damage while preserving user food text."""
    normalized = _normalize_journal_completed_verbs(text)
    return _JOURNAL_BREAKFAST_TYPO_RE.sub("на завтрак", normalized)

def _journal_completed_event_signal(text):
    """Stronger than the broad candidate prefilter: proves mutation-like wording."""
    raw = _normalize_journal_typo(text)
    positive_food = any(
        not re.search(
            r"\bне\s+$",
            raw[max(0, match.start() - 12):match.start()],
            re.I,
        )
        for match in _JOURNAL_FOOD_COMPLETED_RE.finditer(raw)
    )
    return bool(
        positive_food
        or (
            _JOURNAL_WORKOUT_COMPLETED_RE.search(raw)
            and not _JOURNAL_WORKOUT_NEGATED_RE.search(raw)
        )
        or (
            _JOURNAL_PERIOD_SOURCE_RE.search(raw)
            and (
                _JOURNAL_PERIOD_START_RE.search(raw)
                or _JOURNAL_PERIOD_END_RE.search(raw)
            )
            and not _JOURNAL_PERIOD_NEGATED_RE.search(raw)
        )
    )

def _normalize_mixed_implicit_self_workout(text, male=False):
    """Carry the account owner's subject into a following «сделали зарядку» clause."""
    raw = str(text or "")
    if re.search(r"\b(?:я|мы|он|она|они|муж|жена|сын|дочь|дочка|подруг\w*)\b", raw, re.I):
        return raw
    return re.sub(
        r"\bсделали(?=\s+(?:утренн\w*\s+)?"
        r"(?:зарядк\w*|тренировк\w*|кардио\w*|растяжк\w*))",
        ("я сделал" if male else "я сделала"),
        raw,
        count=1,
        flags=re.I,
    )

def _journal_mixed_segments(text, max_segments=4, male=False):
    """Return independent completed food/workout clauses, or fail closed."""
    raw = str(text or "").replace("\r\n", "\n").replace("\r", "\n").strip()
    if not raw or len(raw) > 1200:
        return []
    parts = [
        _normalize_journal_typo(part).strip()
        for part in re.split(r"(?:\n+|(?<=[.!?;])\s+)", raw)
        if part.strip()
    ]
    if not 2 <= len(parts) <= int(max_segments):
        return []
    domains = []
    normalized_parts = []
    for part in parts:
        part = _normalize_mixed_implicit_self_workout(part, male=male)
        food = bool(
            _JOURNAL_FOOD_COMPLETED_RE.search(part)
            and not _JOURNAL_FOOD_NEGATED_RE.search(part)
        )
        workout = bool(
            _JOURNAL_WORKOUT_COMPLETED_RE.search(part)
            and not _JOURNAL_WORKOUT_NEGATED_RE.search(part)
        )
        if food == workout:
            return []
        domains.append("food" if food else "workout")
        normalized_parts.append(part)
    if set(domains) != {"food", "workout"}:
        return []
    return [
        {"text": part, "domain": domain}
        for part, domain in zip(normalized_parts, domains)
    ]

def _journal_recent_context(cid, limit=5):
    """Small DB-backed context for ellipsis and corrections; IDs stay server-owned."""
    c = db()
    meals = c.execute(
        """SELECT id,d,ts,title,grams,kcal,slot,items,slot_guessed FROM meals
           WHERE chat_id=? ORDER BY ts DESC,id DESC LIMIT ?""",
        (cid, int(limit)),
    ).fetchall()
    workouts = c.execute(
        """SELECT id,d,ts,type,duration,rpe,note FROM workouts
           WHERE chat_id=? ORDER BY ts DESC,id DESC LIMIT ?""",
        (cid, int(limit)),
    ).fetchall()
    last_mutation = c.execute(
        """SELECT kind,record_id,created_at FROM chat_mutations
           WHERE chat_id=? AND reversed_at IS NULL
             AND kind IN (
               'food','food_update','food_move_slot','food_append',
               'workout','workout_update'
             )
           ORDER BY created_at DESC LIMIT 1""",
        (cid,),
    ).fetchone()
    c.close()
    return {
        "meals": [
            {"id": x[0], "date": x[1], "ts": x[2], "title": x[3],
             "grams": x[4], "kcal": x[5], "slot": x[6] or "snack",
             "items": json.loads(x[7] or "[]"), "slot_guessed": bool(x[8])}
            for x in meals
        ],
        "workouts": [
            {"id": x[0], "date": x[1], "ts": x[2], "type": x[3],
             "duration": x[4] or "", "rpe": x[5] or "", "note": x[6] or ""}
            for x in workouts
        ],
        "last_mutation": (
            {"kind": last_mutation[0], "record_id": int(last_mutation[1]),
             "created_at": last_mutation[2]}
            if last_mutation and str(last_mutation[1] or "").isdigit() else None
        ),
    }

def _journal_has_recent_mutation(context, max_minutes=180):
    last = (context or {}).get("last_mutation") or {}
    raw = last.get("created_at")
    if not raw:
        return False
    try:
        stamp = datetime.fromisoformat(raw)
        if stamp.tzinfo is None:
            stamp = stamp.replace(tzinfo=TZ)
        return timedelta(0) <= datetime.now(TZ) - stamp <= timedelta(minutes=max_minutes)
    except (TypeError, ValueError):
        return False

def _journal_recent_meal_slot_followup(text, context, max_minutes=10):
    """Resolve a narrow meal-slot correction without another model round-trip."""
    match = re.fullmatch(
        r"\s*(?:это|всё\s+это|все\s+это)\s+"
        r"(?:было|была|были)\s+(?:на\s+)?"
        r"(завтрак|обед|ужин|перекус)(?:е|ом)?\s*[.!]?\s*",
        str(text or ""),
        re.I,
    )
    if not match or not _journal_has_recent_mutation(context, max_minutes=max_minutes):
        return None
    last = (context or {}).get("last_mutation") or {}
    if not str(last.get("kind") or "").startswith("food"):
        return None
    target_id = last.get("record_id")
    if str(target_id) not in {
        str(meal.get("id")) for meal in ((context or {}).get("meals") or [])
    }:
        return None
    slot = {
        "завтрак": "breakfast",
        "обед": "lunch",
        "ужин": "dinner",
        "перекус": "snack",
    }[match.group(1).lower()]
    return {"intent": "movemealslot", "target_id": int(target_id), "slot": slot}

_JOURNAL_MEAL_HEADING_RE = re.compile(
    r"(?i)(?<![а-яёa-z0-9])(?:(?:сегодня|вчера|позавчера)\s+)?(?:на\s+)?"
    r"(завтрак\w*|обед\w*|перекус\w*|полдник\w*|ужин\w*)"
    r"[ \t]*(?::|[-–—])[ \t]*",
)

def _journal_explicit_meal_segments(text, max_segments=4):
    """Split explicit headings even when a client has flattened newlines to spaces."""
    raw = str(text or "").replace("\r\n", "\n").replace("\r", "\n").strip()
    if not raw or len(raw) > 1200:
        return []
    matches = list(_JOURNAL_MEAL_HEADING_RE.finditer(raw))
    if not 2 <= len(matches) <= int(max_segments):
        return []
    if raw[:matches[0].start()].strip():
        return []
    slot_by_prefix = {
        "завтрак": "breakfast",
        "обед": "lunch",
        "перекус": "snack",
        "полдник": "snack",
        "ужин": "dinner",
    }
    segments = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(raw)
        segment = raw[match.start():end].strip()
        label = match.group(1).casefold()
        slot = next(
            (value for prefix, value in slot_by_prefix.items() if label.startswith(prefix)),
            None,
        )
        if not slot or not segment or len(segment) > 500:
            return []
        segments.append({"text": segment, "slot": slot})
    return segments

def journal_v2_enabled(cid=None):
    if str(os.environ.get("AIWA_JOURNAL_V2") or "").strip().lower() in {
        "1", "true", "yes", "on",
    }:
        return True
    allowed = {
        x.strip()
        for x in str(os.environ.get("AIWA_JOURNAL_V2_IDS") or "").split(",")
        if x.strip()
    }
    return cid is not None and str(cid) in allowed

def _semantic_journal_candidate(text, context=None, enable_v2=False):
    """Дешёвый prefilter; решение принимает модель, а не набор фраз/порядок слов."""
    raw = str(text or "").strip()
    if not raw:
        return False
    if re.search(r"[«»\"]", raw) or (
        not enable_v2 and ("\n" in raw or "\r" in raw)
    ):
        return False
    if _JOURNAL_META_INSTRUCTION_RE.search(raw):
        return False
    # Keep the production-v1 prefilter byte-for-byte conservative while the
    # broader model-owned routing is canaried behind AIWA_JOURNAL_V2.
    if not enable_v2 and _JOURNAL_SEMANTIC_HARD_BLOCK_RE.search(raw):
        return False
    # V2 validates the model-selected evidence fragments independently below.
    # Whole-message rejection would incorrectly drop mixed self/other reports.
    if _journal_third_party_source(raw) and not enable_v2:
        return False
    domain_hint = bool(_JOURNAL_SEMANTIC_CANDIDATE_RE.search(raw))
    contextual_repair = bool(
        enable_v2
        and _journal_has_recent_mutation(context)
        and (context or {}).get("meals")
        and len(raw) <= 300
        and (
            domain_hint
            or re.search(r"\b(?:дневник\w*|запис\w*|добав\w*|пропуст\w*)\b", raw, re.I)
        )
    )
    # A question must not become a diary write. Keep this boundary narrower
    # than the conversational helper: an internal phrase such as “это на
    # завтрак” is not a question merely because it contains “это”.
    journal_question_like = bool(
        "?" in raw
        or re.search(
            r"^\s*(?:айва[,\s]*)?(?:что|как|какая|какую|какие|почему|"
            r"зачем|когда|сколько|можно\s+ли|нужно\s+ли|стоит\s+ли|"
            r"полезн\w*\s+ли|вредн\w*\s+ли|помога\w*\s+ли|"
            r"эффективн\w*\s+ли|нормальн\w*\s+ли|имеет\s+ли\s+смысл)\b",
            raw,
            re.I,
        )
    )
    if journal_question_like and not contextual_repair:
        return False
    personal_report_shape = bool(
        re.search(r"^\s*(?:(?:ну|а|кстати|короче)[,\s]+)*(?:я|сегодня|вчера|позавчера)\b", raw, re.I)
        or (len(raw) <= 220 and re.search(r"\b[а-яё-]{3,}(?:ла|лась)\b", raw, re.I))
    )
    contextual_followup = bool(
        _journal_has_recent_mutation(context)
        and len(raw) <= 300
        and _JOURNAL_CONTEXT_OPEN_RE.search(raw)
    )
    return domain_hint or personal_report_shape or contextual_followup or contextual_repair

def _semantic_evidence_spans(source_text, payload):
    """Return ordered, non-overlapping exact quotes selected by the model."""
    raw = str(source_text or "")
    data = payload or {}
    if "evidence_spans" in data:
        values = data.get("evidence_spans")
        if not isinstance(values, list) or not values or len(values) > 8:
            return []
    else:
        values = [data.get("evidence_span")]
    folded = raw.casefold()
    cursor = 0
    total = 0
    spans = []
    for value in values:
        span = str(value or "").strip()
        if not span or len(span) > 300 or total + len(span) > 900:
            return []
        start = folded.find(span.casefold(), cursor)
        if start < 0:
            return []
        exact = raw[start:start + len(span)]
        spans.append(exact)
        cursor = start + len(span)
        total += len(span)
    return spans

def _semantic_evidence_span(source_text, payload):
    """Backward-compatible access to the first verified evidence quote."""
    spans = _semantic_evidence_spans(source_text, payload)
    return spans[0] if spans else None

def _semantic_food_evidence_safe(
    source_text, payload, trusted_food_prompt=False,
):
    """Every selected food fragment must prove a completed, positive event."""
    spans = _semantic_evidence_spans(source_text, payload)
    return bool(
        spans
        and all(
            (trusted_food_prompt or _JOURNAL_FOOD_COMPLETED_RE.search(span))
            and not _JOURNAL_FOOD_NEGATED_RE.search(span)
            and _semantic_source_subject_safe(span)
            and not _JOURNAL_SEMANTIC_HARD_BLOCK_RE.search(span)
            for span in spans
        )
    )

def _semantic_filter_food_record(source_text, payload):
    """Bind every item from the multi-span contract to allowed source evidence."""
    record = (payload or {}).get("food_record")
    if not isinstance(record, dict):
        return None
    if "evidence_spans" not in (payload or {}):
        return record
    allowed = _semantic_evidence_spans(source_text, payload)
    if not allowed:
        return None

    def inside_allowed(fragment):
        quote = str(fragment or "").strip()
        return bool(
            quote
            and len(quote) <= 300
            and any(quote.casefold() in span.casefold() for span in allowed)
        )

    def item_supported_by_allowed_evidence(item):
        name_tokens = re.findall(
            r"[а-яёa-z0-9]{3,}",
            str(item.get("name") or "").casefold().replace("ё", "е"),
        )
        source_tokens = re.findall(
            r"[а-яёa-z0-9]{3,}",
            " ".join(allowed).casefold().replace("ё", "е"),
        )
        ignored = {
            "один", "одна", "одно", "несколько", "примерно", "домашний",
            "грамм", "грамма", "граммов", "порция",
        }
        name_tokens = [token for token in name_tokens if token not in ignored]

        def related(left, right):
            common = 0
            for a, b in zip(left, right):
                if a != b:
                    break
                common += 1
            return (
                left == right
                or SequenceMatcher(None, left, right).ratio() >= 0.72
                or (
                    common >= 2
                    and common / min(len(left), len(right)) >= 0.65
                )
            )

        matched = sum(
            any(related(name_token, source_token) for source_token in source_tokens)
            for name_token in name_tokens
        )
        return bool(name_tokens and matched >= math.ceil(len(name_tokens) * 0.6))

    items = []
    for item in (record.get("items") or [])[:24]:
        if not isinstance(item, dict) or not item_supported_by_allowed_evidence(item):
            continue
        clean = dict(item)
        clean.pop("evidence_span", None)
        if str(clean.get("name") or "").strip():
            items.append(clean)
    unparsed = [
        str(fragment).strip()
        for fragment in (record.get("unparsed") or [])[:8]
        if inside_allowed(fragment)
    ]
    if not items and not unparsed:
        return None
    clean_record = dict(record)
    clean_record["items"] = items
    clean_record["unparsed"] = unparsed
    clean_record["title"] = (
        ", ".join(str(item.get("name") or "").strip() for item in items[:4])
        or "Приём пищи"
    )[:80]
    for aggregate in ("total", "grams", "kcal", "protein", "fat", "carbs"):
        clean_record.pop(aggregate, None)
    return clean_record

def _semantic_owned_recent_target(context, domain, target):
    """Only the sole row or the last verified mutation is safe to edit."""
    rows = list((context or {}).get(domain) or [])
    wanted = str(target or "")
    if wanted not in {str(x.get("id")) for x in rows}:
        return False
    if len(rows) == 1:
        return True
    last = (context or {}).get("last_mutation") or {}
    expected_kind = "food" if domain == "meals" else "workout"
    return (
        str(last.get("kind") or "").startswith(expected_kind)
        and str(last.get("record_id") or "") == wanted
    )

def _journal_target_day_allowed(context, domain, target, raw):
    """Правка записи прошлого дня требует явного маркера прошлого в сообщении.

    Иначе утреннее «съел X» до первой сегодняшней записи дополняет вчерашний
    приём: кандидаты берутся последними по ts без ограничения дня
    (инцидент «карамель в вчерашнем чае», 2026-07-31)."""
    rows = list((context or {}).get(domain) or [])
    row = next((x for x in rows if str(x.get("id")) == str(target or "")), None)
    if not row:
        return True   # принадлежность и свежесть проверяются отдельно
    d = str(row.get("date") or "")
    if not d or d >= dtoday().isoformat():
        return True
    return bool(_JOURNAL_PAST_DAY_RE.search(str(raw or "")))

def _semantic_source_subject_safe(text):
    # Evidence is already evaluated per span in v2. If a span (or the whole
    # legacy message) also attributes a completed event to someone else, reject
    # it even when another clause contains first-person wording.
    return not _journal_third_party_source(text)

def _semantic_action_matches_source(
    action, text, context=None, payload=None, require_evidence=False,
    trusted_food_prompt=False,
):
    """Модель выбирает смысл, код независимо подтверждает разрешённый домен события."""
    raw = str(text or "").strip()
    if (
        not raw
        or (not require_evidence and ("\n" in raw or "\r" in raw))
        or _JOURNAL_META_INSTRUCTION_RE.search(raw)
    ):
        return False
    if require_evidence:
        evidence_spans = _semantic_evidence_spans(raw, payload)
        if not evidence_spans or any(
            not _semantic_source_subject_safe(span)
            or _JOURNAL_SEMANTIC_HARD_BLOCK_RE.search(span)
            for span in evidence_spans
        ):
            return False
    elif not _semantic_source_subject_safe(raw):
        return False
    if not require_evidence:
        if action == "food":
            return bool(
                _JOURNAL_FOOD_COMPLETED_RE.search(raw)
                or (
                    _journal_has_recent_mutation(context)
                    and bool((context or {}).get("meals"))
                    and str(
                        ((context or {}).get("last_mutation") or {}).get("kind") or ""
                    ).startswith("food")
                    and _JOURNAL_CONTEXT_OPEN_RE.search(raw)
                    and str((payload or {}).get("food_text") or "").strip()
                )
            )
        if action == "food_update":
            target = str((payload or {}).get("target_id") or "")
            owned = {str(x.get("id")) for x in ((context or {}).get("meals") or [])}
            return bool(target in owned and _JOURNAL_CORRECTION_RE.search(raw)
                        and _journal_target_day_allowed(context, "meals", target, raw))
        if action == "workout":
            return bool(
                _JOURNAL_WORKOUT_COMPLETED_RE.search(raw)
                and not _JOURNAL_WORKOUT_NEGATED_RE.search(raw)
            )
        if action == "workout_update":
            target = str((payload or {}).get("target_id") or "")
            owned = {
                str(x.get("id")) for x in ((context or {}).get("workouts") or [])
            }
            return bool(target in owned and _JOURNAL_CORRECTION_RE.search(raw)
                        and _journal_target_day_allowed(context, "workouts", target, raw))
        if action == "period_start":
            return bool(
                _JOURNAL_PERIOD_SOURCE_RE.search(raw)
                and _JOURNAL_PERIOD_START_RE.search(raw)
                and not _JOURNAL_PERIOD_NEGATED_RE.search(raw)
            )
        if action == "period_end":
            return bool(
                _JOURNAL_PERIOD_SOURCE_RE.search(raw)
                and _JOURNAL_PERIOD_END_RE.search(raw)
                and not _JOURNAL_PERIOD_NEGATED_RE.search(raw)
            )
        return False
    if action == "food":
        return bool(
            (
                _semantic_food_evidence_safe(
                    raw, payload, trusted_food_prompt=trusted_food_prompt,
                )
            )
            or (
                _journal_has_recent_mutation(context)
                and bool((context or {}).get("meals"))
                and str(((context or {}).get("last_mutation") or {}).get("kind") or "").startswith("food")
                and _JOURNAL_CONTEXT_OPEN_RE.search(raw)
                and str((payload or {}).get("food_text") or "").strip()
                and _semantic_food_evidence_safe(
                    raw, payload, trusted_food_prompt=trusted_food_prompt,
                )
            )
        )
    if action == "food_update":
        target = str((payload or {}).get("target_id") or "")
        evidence = _semantic_evidence_span(raw, payload)
        return bool(
            _semantic_owned_recent_target(context, "meals", target)
            and _journal_target_day_allowed(context, "meals", target, raw)
            and evidence
            and not _JOURNAL_SEMANTIC_HARD_BLOCK_RE.search(evidence)
        )
    if action == "move_meal_slot":
        target = str((payload or {}).get("target_id") or "")
        slot = str((payload or {}).get("slot") or "")
        evidence = _semantic_evidence_span(raw, payload)
        return bool(
            _semantic_owned_recent_target(context, "meals", target)
            and _journal_target_day_allowed(context, "meals", target, raw)
            and slot in {"breakfast", "lunch", "snack", "dinner"}
            and evidence
            and not _JOURNAL_SEMANTIC_HARD_BLOCK_RE.search(evidence)
        )
    if action == "append_meal_item":
        target = str((payload or {}).get("target_id") or "")
        food_text = str((payload or {}).get("food_text") or "").strip()
        evidence = _semantic_evidence_span(raw, payload)
        return bool(
            _semantic_owned_recent_target(context, "meals", target)
            and _journal_target_day_allowed(context, "meals", target, raw)
            and food_text
            and evidence
            and _JOURNAL_FOOD_COMPLETED_RE.search(evidence)
            and not _JOURNAL_SEMANTIC_HARD_BLOCK_RE.search(evidence)
        )
    if action == "workout":
        evidence = _semantic_evidence_span(raw, payload)
        return bool(
            evidence
            and _JOURNAL_WORKOUT_COMPLETED_RE.search(evidence)
            and not _JOURNAL_WORKOUT_NEGATED_RE.search(evidence)
            and not _JOURNAL_SEMANTIC_HARD_BLOCK_RE.search(evidence)
        )
    if action == "workout_update":
        target = str((payload or {}).get("target_id") or "")
        evidence = _semantic_evidence_span(raw, payload)
        return bool(
            _semantic_owned_recent_target(context, "workouts", target)
            and _journal_target_day_allowed(context, "workouts", target, raw)
            and evidence
            and not _JOURNAL_SEMANTIC_HARD_BLOCK_RE.search(evidence)
        )
    if action == "period_start":
        evidence = _semantic_evidence_span(raw, payload)
        return bool(
            evidence
            and _JOURNAL_PERIOD_SOURCE_RE.search(evidence)
            and _JOURNAL_PERIOD_START_RE.search(evidence)
            and not _JOURNAL_PERIOD_NEGATED_RE.search(evidence)
            and not _JOURNAL_SEMANTIC_HARD_BLOCK_RE.search(evidence)
        )
    if action == "period_end":
        evidence = _semantic_evidence_span(raw, payload)
        return bool(
            evidence
            and _JOURNAL_PERIOD_SOURCE_RE.search(evidence)
            and _JOURNAL_PERIOD_END_RE.search(evidence)
            and not _JOURNAL_PERIOD_NEGATED_RE.search(evidence)
            and not _JOURNAL_SEMANTIC_HARD_BLOCK_RE.search(evidence)
        )
    return False

def _normalize_semantic_journal(
    data, source_text="", context=None, enable_v2=False,
    trusted_food_prompt=False,
):
    """Fail-closed валидация решения модели перед любой записью в БД."""
    if not isinstance(data, dict):
        return None
    if enable_v2 and str(data.get("action") or "").strip().lower() == "food_batch":
        return _normalize_semantic_food_batch(
            data, source_text, context,
            trusted_food_prompt=trusted_food_prompt,
        )
    action_to_intent = {
        "food": "logmeal",
        "food_update": "updatemeal",
        "move_meal_slot": "movemealslot",
        "append_meal_item": "appendmealitem",
        "workout": "logworkout",
        "workout_update": "updateworkout",
        "period_start": "logperiod",
        "period_end": "period_end",
    }
    action = str(data.get("action") or "").strip().lower()
    if action in {"move_meal_slot", "append_meal_item"} and not enable_v2:
        return None
    confidence_raw = data.get("confidence")
    confidence = (
        float(confidence_raw)
        if isinstance(confidence_raw, (int, float)) and not isinstance(confidence_raw, bool)
        else -1.0
    )
    if (
        action not in action_to_intent
        or not math.isfinite(confidence)
        or not 0.85 <= confidence <= 1.0
        or not _semantic_action_matches_source(
            action, source_text, context, data, require_evidence=enable_v2,
            trusted_food_prompt=trusted_food_prompt,
        )
        or str(data.get("subject") or "").lower() != "self"
        or str(data.get("status") or "").lower() != "completed"
        or str(data.get("polarity") or "").lower() != "positive"
        or str(data.get("certainty") or "").lower() != "certain"
        or str(data.get("primary_purpose") or "").lower() not in (
            {"journal", "repair"}
            if action in {"move_meal_slot", "append_meal_item"}
            else {"journal"}
        )
    ):
        return None
    out = {"intent": action_to_intent[action], "confidence": confidence}
    if action == "food":
        food_record = (
            _semantic_filter_food_record(source_text, data)
            if enable_v2 else None
        )
        if enable_v2 and "evidence_spans" in data:
            if not food_record:
                return None
            parts = [
                str(item.get("name") or "").strip()
                for item in (food_record.get("items") or [])
                if str(item.get("name") or "").strip()
            ] + list(food_record.get("unparsed") or [])
            out["food_text"] = ", ".join(parts)[:500]
        else:
            out["food_text"] = str(data.get("food_text") or "").strip()[:500]
        # An evidence-only record with every position in `unparsed` is not a
        # meal receipt. Keep the exact verified fragments as food_text and let
        # the dedicated food parser make one bounded second pass instead of
        # persisting a zero-kcal placeholder.
        if enable_v2 and food_record and food_record.get("items"):
            out["food_record"] = food_record
        slot = str(data.get("slot") or "")
        if slot in {"breakfast", "lunch", "snack", "dinner"}:
            out["slot"] = slot
    elif action == "food_update":
        out["target_id"] = int(data.get("target_id"))
        out["food_text"] = str(data.get("food_text") or "").strip()[:500]
        if enable_v2 and isinstance(data.get("food_record"), dict):
            out["food_record"] = data["food_record"]
    elif action == "move_meal_slot":
        out["target_id"] = int(data.get("target_id"))
        out["slot"] = str(data.get("slot") or "")
    elif action == "append_meal_item":
        out["target_id"] = int(data.get("target_id"))
        out["food_text"] = str(data.get("food_text") or "").strip()[:500]
        if enable_v2 and isinstance(data.get("food_record"), dict):
            out["food_record"] = data["food_record"]
    elif action == "workout":
        workout = data.get("workout")
        out["workout"] = workout if isinstance(workout, dict) else {}
    elif action == "workout_update":
        out["target_id"] = int(data.get("target_id"))
        workout = data.get("workout")
        out["workout"] = workout if isinstance(workout, dict) else {}
    return out

def _normalize_semantic_food_batch(
    data, source_text="", context=None, trusted_food_prompt=False,
):
    """Validate every model-proposed meal independently and preserve source order."""
    if not isinstance(data, dict):
        return None
    entries = data.get("food_entries")
    confidence = data.get("confidence")
    if (
        not isinstance(entries, list)
        or not 2 <= len(entries) <= 4
        or not isinstance(confidence, (int, float))
        or isinstance(confidence, bool)
        or not math.isfinite(float(confidence))
        or not 0.85 <= float(confidence) <= 1.0
        or str(data.get("subject") or "").lower() != "self"
        or str(data.get("status") or "").lower() != "completed"
        or str(data.get("polarity") or "").lower() != "positive"
        or str(data.get("certainty") or "").lower() != "certain"
        or str(data.get("primary_purpose") or "").lower() != "journal"
    ):
        return None

    raw = str(source_text or "")
    folded = raw.casefold()
    cursor = 0
    plans = []
    for entry in entries:
        if not isinstance(entry, dict):
            return None
        spans = entry.get("evidence_spans")
        if not isinstance(spans, list) or not spans:
            return None
        exact_spans = []
        for value in spans:
            span = str(value or "").strip()
            if not span or len(span) > 300:
                return None
            start = folded.find(span.casefold(), cursor)
            if start < 0:
                return None
            exact_spans.append(raw[start:start + len(span)])
            cursor = start + len(span)
        payload = {
            "action": "food",
            "target_id": None,
            "slot": entry.get("slot"),
            "evidence_spans": spans,
            "subject": data.get("subject"),
            "status": data.get("status"),
            "polarity": data.get("polarity"),
            "certainty": data.get("certainty"),
            "primary_purpose": data.get("primary_purpose"),
            "confidence": confidence,
            "food_text": entry.get("food_text"),
            "food_record": entry.get("food_record"),
            "workout": {},
        }
        plan = _normalize_semantic_journal(
            payload, raw, context, enable_v2=True,
            trusted_food_prompt=trusted_food_prompt,
        )
        if not plan or plan.get("intent") != "logmeal" or not plan.get("slot"):
            return None
        plan["source_text"] = "\n".join(exact_spans)
        plans.append(plan)
    return {
        "intent": "logmealbatch",
        "confidence": float(confidence),
        "entries": plans,
        "source_text": raw,
    }

def _semantic_update_clarification(
    data, source_text, context=None, enable_v2=False,
):
    """Recognize a safe correction whose target is ambiguous instead of guessing an ID."""
    if not isinstance(data, dict):
        return None
    action = str(data.get("action") or "").strip().lower()
    confidence = data.get("confidence")
    if enable_v2 and action in {"move_meal_slot", "append_meal_item"}:
        evidence = _semantic_evidence_span(source_text, data)
        action_shape_ok = (
            str(data.get("slot") or "") in SLOT_RU
            if action == "move_meal_slot"
            else (
                bool(str(data.get("food_text") or "").strip())
                and evidence
                and bool(_JOURNAL_FOOD_COMPLETED_RE.search(evidence))
            )
        )
        if (
            isinstance(confidence, (int, float))
            and not isinstance(confidence, bool)
            and math.isfinite(float(confidence))
            and float(confidence) >= 0.85
            and evidence
            and action_shape_ok
            and not _JOURNAL_SEMANTIC_HARD_BLOCK_RE.search(evidence)
            and str(data.get("subject") or "").lower() == "self"
            and str(data.get("status") or "").lower() == "completed"
            and str(data.get("polarity") or "").lower() == "positive"
            and str(data.get("certainty") or "").lower() == "certain"
            and str(data.get("primary_purpose") or "").lower() == "repair"
            and not _journal_third_party_source(source_text)
        ):
            return "clarifymeal"
        return None
    if (
        action not in {"food_update", "workout_update"}
        or not isinstance(confidence, (int, float)) or isinstance(confidence, bool)
        or not math.isfinite(float(confidence)) or float(confidence) < 0.85
        or str(data.get("subject") or "").lower() != "self"
        or str(data.get("status") or "").lower() != "completed"
        or str(data.get("polarity") or "").lower() != "positive"
        or str(data.get("certainty") or "").lower() != "certain"
        or str(data.get("primary_purpose") or "").lower() != "journal"
        or not _semantic_source_subject_safe(source_text)
        or not _JOURNAL_CORRECTION_RE.search(str(source_text or ""))
    ):
        return None
    return "clarifymeal" if action == "food_update" else "clarifyworkout"

async def resolve_semantic_journal_action(
    cid, text, user_generation=None, food_prompt_mode=False,
):
    """Распознаёт естественное журналирование без привязки к порядку конкретных слов."""
    context = _journal_recent_context(cid)
    v2 = True if food_prompt_mode else journal_v2_enabled(cid)
    if food_prompt_mode:
        context = dict(context, awaiting_food_text=True)
    text = _normalize_journal_typo(text)
    completed_signal = _journal_completed_event_signal(text)
    slot_followup = _journal_recent_meal_slot_followup(text, context)
    if slot_followup:
        ev(cid, "journal_action_planned", meta="movemealslot_fastpath")
        return slot_followup
    mixed = _journal_mixed_segments(
        text, male=(row(cid) or {}).get("mode") == "male",
    )
    if mixed:
        plans = await asyncio.gather(*(
            resolve_semantic_journal_action(
                cid, segment["text"], user_generation=user_generation,
                food_prompt_mode=food_prompt_mode,
            )
            for segment in mixed
        ))
        entries = []
        for segment, plan in zip(mixed, plans):
            expected = "logmeal" if segment["domain"] == "food" else "logworkout"
            if not plan or plan.get("intent") != expected:
                ev(cid, "journal_route_failed", meta="mixed_segment")
                return {"intent": "journalunavailable", "reason": "mixed_segment"}
            entry = dict(plan)
            entry["source_text"] = segment["text"]
            entries.append(entry)
        ev(cid, "journal_action_planned", meta=f"mixed_batch|{len(entries)}")
        return {
            "intent": "logjournalbatch",
            "entries": entries,
            "source_text": _normalize_journal_typo(text),
        }
    if (
        not food_prompt_mode
        and not _semantic_journal_candidate(text, context, enable_v2=v2)
    ):
        return None
    segments = _journal_explicit_meal_segments(text) if v2 else []
    if segments:
        plans = await asyncio.gather(*(
            resolve_semantic_journal_action(
                cid, segment["text"], user_generation=user_generation,
                food_prompt_mode=food_prompt_mode,
            )
            for segment in segments
        ))
        entries = []
        for segment, plan in zip(segments, plans):
            if not plan or plan.get("intent") != "logmeal":
                ev(cid, "journal_route_failed", meta="multimeal_segment")
                return {"intent": "journalunavailable", "reason": "multimeal_segment"}
            entry = dict(plan)
            entry["source_text"] = segment["text"]
            # The slot is derived from an exact server-side heading, not model output.
            entry["slot"] = segment["slot"]
            entries.append(entry)
        ev(cid, "journal_action_planned", meta=f"food_batch|{len(entries)}")
        return {
            "intent": "logmealbatch",
            "entries": entries,
            "source_text": str(text or ""),
        }
    generation = _user_generation(cid) if user_generation is None else int(user_generation)
    usage = []
    try:
        timeout_s = max(
            3.0,
            min(30.0, float(os.environ.get("AIWA_JOURNAL_ROUTE_TIMEOUT_SECONDS") or "15")),
        )
        classified = await asyncio.wait_for(
            llm_to_thread(
                cid, "journal_route", L.classify_journal_event, text, usage, context,
                v2,
                user_generation=generation,
            ),
            timeout=timeout_s,
        )
    except asyncio.TimeoutError:
        ev(cid, "journal_route_failed", meta="timeout", user_generation=generation)
        return {"intent": "journalunavailable", "reason": "timeout"}
    except Exception as exc:
        log.warning("journal route %s: %s", cid, exc)
        ev(cid, "journal_route_failed", meta="error", user_generation=generation)
        return {"intent": "journalunavailable", "reason": "error"}
    if not _user_write_allowed(cid, generation):
        return None
    if usage:
        ev(cid, "tokens", sum(usage), meta="journal_route", calls=len(usage), usage=usage,
           user_generation=generation)
    if classified is None:
        ev(cid, "journal_route_failed", meta="empty", user_generation=generation)
        return {"intent": "journalunavailable", "reason": "empty"}
    plan = _normalize_semantic_journal(
        classified, text, context, enable_v2=v2,
        trusted_food_prompt=food_prompt_mode,
    )
    if food_prompt_mode and (
        not plan or plan.get("intent") not in {"logmeal", "logmealbatch"}
    ):
        ev(cid, "journal_route_failed", meta="food_prompt_validation",
           user_generation=generation)
        return {"intent": "journalunavailable", "reason": "food_prompt_validation"}
    if not plan:
        clarification = _semantic_update_clarification(
            classified, text, context, enable_v2=v2,
        )
        if clarification:
            return {"intent": clarification}
        if completed_signal:
            ev(cid, "journal_route_failed", meta="validation", user_generation=generation)
            return {"intent": "journalunavailable", "reason": "validation"}
    if plan:
        ev(cid, "journal_action_planned", meta=plan["intent"], user_generation=generation)
    return plan

def is_question_like(txt):
    t = (txt or "").strip().lower()
    if len(t) < 5 or is_gibberish(t): return False
    if re.sub(r"[ .,:/\\-]", "", t).isdigit(): return False
    return ("?" in t) or (re.search(
        r"(^|\b)(?:что|как|почему|зачем|когда|какой|какая|какие|каков|"
        r"сколько|можно\s+ли|нужно\s+ли|стоит\s+ли|значит|расскаж|"
        r"объясн|правда\s+ли|а\s+если|это\s|полезн\w*\s+ли|"
        r"вредн\w*\s+ли|помога\w*\s+ли|эффективн\w*\s+ли|"
        r"нормальн\w*\s+ли|имеет\s+ли\s+смысл)",
        t,
    ) is not None)
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

def is_cycle(u): return not (u and u.get("mode") in ("irregular", "none", "meno", "preg", "male"))
def is_onboarded(u):
    if not u: return False
    if u.get("mode") in ("irregular", "none", "meno", "preg", "male"): return True
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
    [B("Настройки уведомлений", "more")],
])
GATE_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Начать", callback_data="go_start")]])
ONB_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Женщина", callback_data="onb_female")],
    [InlineKeyboardButton("Мужчина", callback_data="mode:male")],
])
# Беременность — самостоятельное состояние, а не разновидность «нет цикла».
# Она лежала уровнем ниже, за кнопкой «Нет регулярного цикла», и беременные
# на первом экране онбординга себя не находили.
FEMALE_ONB_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Веду цикл", callback_data="onb_cycle")],
    [InlineKeyboardButton("Беременность", callback_data="mode:preg")],
    [InlineKeyboardButton("Нет регулярного цикла", callback_data="no_cycle")],
])
NOCYCLE_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Нерегулярный цикл", callback_data="mode:irregular")],
    [InlineKeyboardButton("Менопауза", callback_data="mode:meno")],
    [InlineKeyboardButton("Сейчас нет месячных", callback_data="mode:none")],
])
GENERAL_MENU_KB = InlineKeyboardMarkup([
    [B("Сводка", "today")],
    [B("Партнёр", "partner"), B("Выписка врачу", "history")],
    [B("Настройки уведомлений", "more")],
])
MORE_KB = InlineKeyboardMarkup([
    [B("История и выписка", "history"), B("Гид", "guides")],
    [B("Время сводки", "set:time")],
    [B("Утренние сводки: вкл/выкл", "toggle:summary")],
    [B("Назад", "menu")],
])
MALE_MORE_KB = InlineKeyboardMarkup([
    [B("История и выписка", "history")],
    [B("Время сводки", "set:time")],
    [B("Утренние сводки: вкл/выкл", "toggle:summary")],
    [B("Назад", "menu")],
])
EDIT_KB = InlineKeyboardMarkup([
    [B("Отметить месячные", "period")],
    [B("Длина цикла", "cyclelen"), B("Рост, вес, возраст", "profile_edit")],
    [B("История циклов", "addcycles")],
    [B("Время рассылки", "set:time")],
    [B("Назад", "menu")],
])
MALE_EDIT_KB = InlineKeyboardMarkup([
    [B("Рост, вес, возраст", "profile_edit")],
    [B("Время рассылки", "set:time")],
    [B("Назад", "menu")],
])
PERIOD_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Начались сегодня", callback_data="period_today")]])
SKIP_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Пропустить", callback_data="prof_skip")]])
REPORT_PERIODS = frozenset({"3", "6", "all"})
HIST_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("3 месяца", callback_data="rep:3"), InlineKeyboardButton("6 месяцев", callback_data="rep:6")],
    [InlineKeyboardButton("Весь период", callback_data="rep:all")],
])
def report_prompt(u):
    if u and u.get("mode") == "male":
        return "За какой период собрать выписку по самочувствию?"
    return "За какой период собрать выписку для врача?"
def report_caption(u, label):
    if u and u.get("mode") == "male":
        return f"📄 Выписка по самочувствию, {label.lower()}. Можно показать терапевту."
    return f"📄 Выписка по циклу, {label.lower()}. Можно показать гинекологу."
ACT_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Минимальная", callback_data="act:1"), InlineKeyboardButton("Лёгкая", callback_data="act:2")],
    [InlineKeyboardButton("Умеренная", callback_data="act:3"), InlineKeyboardButton("Высокая", callback_data="act:4")],
    [InlineKeyboardButton("Очень высокая", callback_data="act:5")],
])
def diet_kb(selected):
    rows = [[InlineKeyboardButton("Ограничений нет", callback_data="diet:none")]]
    rows += [[InlineKeyboardButton(("✓ " if code in selected else "") + ru, callback_data=f"diet:s:{code}")] for code, ru in DIET]
    rows.append([InlineKeyboardButton("Готово", callback_data="diet:done")]); return InlineKeyboardMarkup(rows)

def time_kb():
    times = ["07:00", "08:00", "09:00", "10:00", "21:00", "22:00"]
    return InlineKeyboardMarkup([[InlineKeyboardButton(t, callback_data=f"tm:{t}") for t in times[i:i + 3]] for i in (0, 3)])

def scheduled_hhmm(cid, hhmm):
    """The selected time is the delivery time, never a load-spreading hint."""
    h, m = map(int, hhmm.split(":"))
    return f"{h % 24:02d}:{m % 60:02d}", 0, 0

def summary_prepare_hhmm(cid, hhmm):
    """Spread expensive generation before, rather than after, delivery time."""
    try:
        lead = max(1, int(os.environ.get("AIWA_SUMMARY_PREPARE_MIN", "10")))
    except (TypeError, ValueError):
        lead = 10
    try:
        spread = max(1, int(os.environ.get("AIWA_SUMMARY_PREPARE_SPREAD_MIN", "20")))
    except (TypeError, ValueError):
        spread = 20
    h, m = map(int, hhmm.split(":"))
    total = (h * 60 + m - lead - (abs(int(cid)) % spread)) % (24 * 60)
    return f"{total // 60:02d}:{total % 60:02d}"

def schedule_text(cid, hhmm):
    """Пользователю показываем выбранное время — то же, что в профиле приложения.
    Внутренний сдвиг очереди рассылки (scheduled_hhmm) — деталь доставки, не UI."""
    shown = (row(cid) or {}).get("send_time") or hhmm or "08:00"
    return (
        f"Время сводки: {shown} по Москве — подготовлю заранее и начну отправку в это время. "
        "При высокой нагрузке доставка может занять несколько минут."
    )

def today_start_iso():
    """UTC boundary for canonical events_v2 timestamps."""
    return datetime.combine(
        datetime.now(TZ).date(), dtime.min, tzinfo=TZ
    ).astimezone(timezone.utc).isoformat()

def legacy_today_start_iso():
    """Moscow-local boundary for historical naive `events.ts` rows."""
    return datetime.combine(datetime.now(TZ).date(), dtime.min).isoformat()

def summary_sent_today(cid):
    c = db()
    r = c.execute(
        """SELECT 1 FROM events_v2
           WHERE user_key=? AND occurred_at>=?
             AND event_name IN ('summary_delivered','push_sent')
           LIMIT 1""",
        (A2.user_key(cid), today_start_iso()),
    ).fetchone()
    if not r:
        # Historical rows created before events_v2 remain readable.
        r = c.execute("""SELECT 1 FROM events
            WHERE chat_id=? AND ts>=? AND (
                (action='goal' AND meta='summary') OR
                (action='broadcast' AND (meta='sent' OR meta LIKE 'sent|%'))
            ) LIMIT 1""", (cid, legacy_today_start_iso())).fetchone()
    c.close()
    return bool(r)

_PERMANENT_PUSH_FAILURES = frozenset({"blocked", "chat_not_found", "user_deactivated"})
_RETRYABLE_PUSH_FAILURES = frozenset({"rate_limit", "timeout", "network"})

def _push_failure_class(exc):
    """Map Telegram exceptions to stable, privacy-safe delivery diagnostics."""
    if isinstance(exc, Forbidden):
        return "blocked"
    if isinstance(exc, RetryAfter):
        return "rate_limit"
    if isinstance(exc, TimedOut):
        return "timeout"
    if isinstance(exc, NetworkError):
        return "network"
    if isinstance(exc, BadRequest):
        text = str(exc or "").lower()
        if "chat not found" in text:
            return "chat_not_found"
        if "user is deactivated" in text or "user deactivated" in text:
            return "user_deactivated"
        return "bad_request"
    return "internal_or_unknown"

def _suppress_push_delivery(cid, reason):
    if reason not in _PERMANENT_PUSH_FAILURES:
        return False
    c = db()
    try:
        changed = c.execute(
            """UPDATE users
               SET push_suppressed_at=?, push_suppression_reason=?
               WHERE chat_id=? AND push_suppressed_at IS NULL""",
            (datetime.now(TZ).isoformat(), reason, cid),
        ).rowcount == 1
        c.commit()
        return changed
    finally:
        c.close()

def _clear_push_suppression(cid):
    """An inbound private Telegram update proves that this recipient is reachable again."""
    c = db()
    try:
        occurred_at = datetime.now(timezone.utc).isoformat()
        changed = c.execute(
            """UPDATE users
               SET push_suppressed_at=NULL, push_suppression_reason=NULL
               WHERE chat_id=? AND push_suppressed_at IS NOT NULL""",
            (cid,),
        ).rowcount == 1
        if changed:
            # Backfill uses immutable delivery/reachability history after a
            # restart. Persist the proof in the same transaction as the state
            # change so a queued best-effort event cannot re-suppress a user
            # who has already contacted the bot again.
            A2.insert_event_v2(
                c, cid, "user_message", meta="push_reachable",
                app_version=AIWA_VERSION, occurred_at=occurred_at,
            )
        c.commit()
        if changed:
            log.info("push delivery restored after inbound update: %s", cid)
        return changed
    finally:
        c.close()

def _backfill_push_suppressions():
    """Persist previously blocked recipients from immutable legacy and v2 history."""
    c = db()
    try:
        changed_legacy = c.execute(
            """UPDATE users
               SET push_suppressed_at=(
                     SELECT MAX(e.ts) FROM events e
                     WHERE e.chat_id=users.chat_id
                       AND e.action='broadcast' AND e.meta LIKE 'blocked|%'
                   ),
                   push_suppression_reason='blocked'
               WHERE push_suppressed_at IS NULL
                 AND EXISTS (
                     SELECT 1 FROM events e
                     WHERE e.chat_id=users.chat_id
                       AND e.action='broadcast' AND e.meta LIKE 'blocked|%'
                 )
                 AND (
                     SELECT MAX(e.ts) FROM events e
                     WHERE e.chat_id=users.chat_id
                       AND e.action='broadcast' AND e.meta LIKE 'blocked|%'
                 ) > COALESCE((
                     SELECT MAX(e.ts) FROM events e
                     WHERE e.chat_id=users.chat_id
                       AND (
                           (e.action='broadcast' AND e.meta LIKE 'sent|%')
                           OR e.action IN ('command','user_message','voice','button','suggest')
                       )
                 ), '')"""
        ).rowcount
        changed_v2 = 0
        users_by_key = {
            A2.user_key(cid): cid
            for (cid,) in c.execute(
                "SELECT chat_id FROM users WHERE push_suppressed_at IS NULL"
            ).fetchall()
        }
        # One indexed scan/group replaces an unbounded history query per user.
        # json_extract is safe here: analytics_v2 always stores an object.
        v2_states = c.execute(
            """SELECT user_key,
                      MAX(CASE
                          WHEN event_name='push_failed'
                           AND json_extract(properties_json,'$.delivery_status')='blocked'
                          THEN occurred_at ELSE '' END) AS latest_failed,
                      MAX(CASE
                          WHEN event_name!='push_failed'
                          THEN occurred_at ELSE '' END) AS latest_reachable
               FROM events_v2
               WHERE event_name IN (
                 'push_failed','push_sent','user_message_sent',
                 'screen_viewed','app_opened','legacy_message_interaction'
               )
               GROUP BY user_key"""
        ).fetchall()
        for key, latest_failed, latest_reachable in v2_states:
            cid = users_by_key.get(key)
            if cid is not None and latest_failed and latest_failed > (latest_reachable or ""):
                changed_v2 += c.execute(
                    """UPDATE users
                       SET push_suppressed_at=?,push_suppression_reason='blocked'
                       WHERE chat_id=? AND push_suppressed_at IS NULL""",
                    (latest_failed, cid),
                ).rowcount
        c.commit()
        changed = changed_legacy + changed_v2
        if changed:
            log.info("push suppression backfilled for %d blocked recipients", changed)
        return changed
    finally:
        c.close()

def _record_push_failure(cid, campaign, exc):
    """Record one attempt without leaking Telegram error text or identifiers."""
    failure_class = _push_failure_class(exc)
    permanent = failure_class in _PERMANENT_PUSH_FAILURES
    if permanent:
        _suppress_push_delivery(cid, failure_class)
    status = "blocked" if permanent else "error"
    ev(
        cid,
        "broadcast",
        meta="|".join((status, campaign or "unknown", failure_class,
                       "retryable" if failure_class in _RETRYABLE_PUSH_FAILURES else "terminal")),
    )
    return failure_class

def _claim_push_delivery(cid, campaign):
    """Atomically reserve a push using a recoverable lease, not a permanent lock."""
    if not campaign:
        return True
    try:
        lease_seconds = max(60, int(os.environ.get("AIWA_PUSH_CLAIM_TTL_SEC", "900")))
    except (TypeError, ValueError):
        lease_seconds = 900
    now = datetime.now(TZ)
    now_iso = now.isoformat()
    stale_before = (now - timedelta(seconds=lease_seconds)).isoformat()
    c = db()
    try:
        c.execute("BEGIN IMMEDIATE")
        already_sent = c.execute(
            """SELECT 1 FROM events
               WHERE chat_id=? AND action='broadcast' AND meta=?
               LIMIT 1""",
            (cid, "sent|" + campaign),
        ).fetchone()
        if not already_sent:
            already_sent = c.execute(
                """SELECT 1 FROM events_v2
                   WHERE user_key=? AND event_name='push_sent'
                     AND json_extract(properties_json,'$.campaign_id')=?
                   LIMIT 1""",
                (A2.user_key(cid), campaign),
            ).fetchone()
        if already_sent:
            c.execute(
                """INSERT OR IGNORE INTO push_deliveries
                   (chat_id,campaign_id,status,claimed_at,sent_at)
                   VALUES(?,?,'sent',?,?)""",
                (cid, campaign, now_iso, now_iso),
            )
            c.commit()
            return False
        claimed = c.execute(
            """INSERT OR IGNORE INTO push_deliveries
               (chat_id,campaign_id,status,claimed_at)
               VALUES(?,?,'claimed',?)""",
            (cid, campaign, now_iso),
        ).rowcount == 1
        if not claimed:
            # A process may die after claiming and before completing. Reclaim only
            # an expired in-flight lease; a sent row is never reopened.
            claimed = c.execute(
                """UPDATE push_deliveries
                   SET claimed_at=?, sent_at=NULL
                   WHERE chat_id=? AND campaign_id=? AND status='claimed'
                     AND claimed_at<=?""",
                (now_iso, cid, campaign, stale_before),
            ).rowcount == 1
        c.commit()
        return claimed
    finally:
        c.close()

def _complete_push_delivery(cid, campaign):
    if not campaign:
        return
    c = db()
    try:
        c.execute(
            """UPDATE push_deliveries
               SET status='sent', sent_at=?
               WHERE chat_id=? AND campaign_id=?""",
            (datetime.now(TZ).isoformat(), cid, campaign),
        )
        c.commit()
    finally:
        c.close()

def _release_push_delivery(cid, campaign):
    """Allow retry only when Telegram definitely rejected the send."""
    if not campaign:
        return
    c = db()
    try:
        c.execute(
            """DELETE FROM push_deliveries
               WHERE chat_id=? AND campaign_id=? AND status='claimed'""",
            (cid, campaign),
        )
        c.commit()
    finally:
        c.close()

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
    if (row(cid) or {}).get("push_suppressed_at"):
        return False
    if summary_sent_today(cid):
        return False
    if cid in BCAST_PENDING:
        return False
    BCAST_PENDING.add(cid)
    ev(cid, "broadcast", meta=f"queued|{campaign_id('daily_summary')}")
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
def sugg_kb(cid, items, app_user=None, app_label=None, feedback_id=None, campaign=None):
    def _short(t): return t if len(t) <= 28 else t[:26].rstrip(" ,.-") + "…"
    # единая точка сборки кнопок: каждый саджест с заглавной буквы (в т.ч. статичные)
    norm = getattr(L, "_norm_sugg1", None)
    items = guard_aiwa_suggestions(cid, items)
    items = [(norm(t) if norm else t) for t in items if t]
    rows = [[B(_short(t), f"q:{add_sugg(cid,t)}")] for t in items[:2]]
    if app_user and AIWA_WEBAPP_URL:
        app_tab = {
            "Открыть дневник": "food",
            "Открыть питание": "food",
            "Открыть нагрузку": "train",
        }.get(app_label)
        rows.append([InlineKeyboardButton(app_label or APP_BUTTON_TEXT,
                     web_app=WebAppInfo(url=campaign_webapp_url(app_user, campaign, app_tab)))])
    if feedback_id:
        rows.append([B("👍 Полезно", f"fb:helpful:{feedback_id}"),
                     B("👎 Не помогло", f"fb:unhelpful:{feedback_id}")])
    return InlineKeyboardMarkup(rows)
def summary_kb(u=None, campaign=None):
    rows = []
    if AIWA_WEBAPP_URL:
        rows.append([InlineKeyboardButton(APP_BUTTON_TEXT, web_app=WebAppInfo(url=campaign_webapp_url(u, campaign)))])
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
def summary_sugg_kb(cid, u=None, st=None, app_label=None, campaign=None):
    items = summary_suggestions(st) if st is not None else general_summary_suggestions(u)
    return sugg_kb(cid, items, app_user=u, app_label=app_label or APP_BUTTON_TEXT, campaign=campaign)
def merge_summary_suggestions(u=None, st=None, extra=None):
    items = [x for x in (extra or []) if x]
    fallback = summary_suggestions(st) if st is not None else general_summary_suggestions(u)
    for x in fallback:
        if len(items) >= 2: break
        if x not in items: items.append(x)
    return items[:2]

# ---------- senders ----------
async def need_onboard(t, user_generation=None):
    cid = getattr(getattr(t, "chat", None), "id", None)
    if cid and is_partner(cid) and not is_onboarded(row(cid)):
        return await t.reply_text(partner_info_for(cid))
    if cid and user_generation is None:
        user_generation = _user_generation(cid)
    if cid: upsert(cid, user_generation=user_generation, state=None)
    if cid: record_onboarding_started(cid, user_generation)
    await t.reply_text("Чтобы Айва давала персональные рекомендации, выбери, что сейчас ближе: ведёшь цикл или нет регулярного цикла.", reply_markup=ONB_KB)
_last_start = {}
async def begin_onboard(cid, msg, force=False, user_generation=None):
    now = time.time()
    # дебаунс только для повторного /start; явный тап по кнопке (force) должен отвечать всегда
    if not force and now - _last_start.get(cid, 0) < 4: return
    _last_start[cid] = now
    if user_generation is None:
        user_generation = _user_generation(cid)
    upsert(
        cid,
        user_generation=user_generation,
        state=None,
        pending_date=None,
    )
    record_onboarding_started(cid, user_generation)
    await msg.reply_text(START_TEXT, reply_markup=ONB_KB)

_CARD_CACHE = {}
_NEW_CARDS_ALL = os.environ.get("AIWA_NEW_CARDS", "0") in ("1", "true", "True", "on")
_NEW_CARDS_IDS = set(x.strip() for x in (os.environ.get("AIWA_NEW_CARDS_IDS", "") or "").split(",") if x.strip())
for _bad in [x for x in _NEW_CARDS_IDS if len(x) < 6]:
    print(f"ВНИМАНИЕ: AIWA_NEW_CARDS_IDS содержит «{_bad}» — это не похоже на chat_id (нужен полный id, напр. 625405535). "
          f"Для включения всем используйте AIWA_NEW_CARDS=1.")
def new_cards_on(cid):
    """Новые карточки: всем через AIWA_NEW_CARDS=1 или точечно через AIWA_NEW_CARDS_IDS=123,456."""
    return _NEW_CARDS_ALL or str(cid) in _NEW_CARDS_IDS

def _card_ctx(cid, u, st=None, preg=None):
    """Контекст для персональных строк карточки: состояние + чек-ин + дневник + память."""
    bits = []
    if st: bits.append(f"День цикла {st['day']} из {st['cycle_len']}, {st['subphase']} {st['phase_ru'].lower()} фаза, до месячных ~{st['days_to_next']} дн")
    if preg: bits.append(f"Беременность: {preg.get('week')} нед, {preg.get('trimester')} триместр")
    if u and u.get("mode") == "meno": bits.append("Режим: менопауза")
    h = last_hint(cid)
    if h: bits.append("Вчерашний чек-ин: " + h)
    try:
        from datetime import timedelta as _td
        _y = (dtoday() - _td(days=1)).isoformat()
        _tot = diary_totals(cid, _y)
        if _tot and _tot.get("kcal"): bits.append(f"Еда вчера: {round(_tot['kcal'])} ккал, белок {round(_tot.get('protein',0))} г")
    except Exception: pass
    try:
        _rw = _recent_workouts_text(cid)
        if _rw: bits.append("Недавние тренировки: " + _rw)
    except Exception: pass
    try:
        _mm = mem_text(cid, 8)
        if _mm: bits.append("Память: " + _mm)
    except Exception: pass
    p = profile_of(u)
    if p and p.get("age"): bits.append(f"Возраст {p['age']}")
    return ". ".join(bits)

async def _card_captions(
    cid, mode, ctx, summary=None, *, user_generation=None,
):
    generation = (
        _user_generation(cid) if user_generation is None else user_generation
    )
    if not _user_write_allowed(cid, generation):
        return {}
    key = (cid, dtoday().isoformat(), AIWA_VERSION, mode, bool(summary))
    hit = _CARD_CACHE.get(key)
    if hit is not None:
        return hit if _user_write_allowed(cid, generation) else {}
    if summary:
        ctx = (ctx or "") + " || Текст сегодняшней сводки — строки карточки ОБЯЗАНЫ быть согласованы с ним: питание — суть блока про питание, нагрузка — суть блока про нагрузку, не выдумывай нового: " + str(summary)[:1800]
    _cu = []
    caps = {}
    try:
        caps = await llm_to_thread(
            cid, "card_captions", L.card_captions, mode, ctx, _cu,
            user_generation=generation,
        ) or {}
    except Exception as e:
        log.warning("card_captions %s: %s", cid, e)
    if _cu:
        ev(
            cid, "tokens", sum(_cu), meta="card", calls=len(_cu), usage=_cu,
            user_generation=generation,
        )
    def _cut(v, lim=80):
        v = str(v).strip()
        if len(v) <= lim: return v
        cut = v[:lim].rsplit(" ", 1)[0].rstrip(",;:")
        if len(cut) < lim // 2: cut = v[:lim]      # строка без пробелов — чистый срез
        return cut + "…"
    caps = {k: _cut(v, 40 if k in ("focus", "theme") else 80) for k, v in caps.items()}
    if not _user_write_allowed(cid, generation):
        return {}
    _CARD_CACHE[key] = caps; _prune_day(_CARD_CACHE)
    # Publish first and validate again. If /stop completed before publication,
    # the pinned generation is stale and this removes the late entry. If /stop
    # starts afterwards, del_user() owns the final cache clear.
    if not _user_write_allowed(cid, generation):
        if _CARD_CACHE.get(key) is caps:
            _CARD_CACHE.pop(key, None)
        return {}
    return caps

async def _cycle_card_png(
    cid, u, st, summary=None, *, user_generation=None,
):
    """Белая персональная карточка цикла; None, если выключено/не собралось."""
    if not (IMG and new_cards_on(cid) and hasattr(IMG, "render_daily_card")): return None
    try:
        caps = await _card_captions(
            cid, "cycle", _card_ctx(cid, u, st=st), summary=summary,
            user_generation=user_generation,
        )
        if not caps.get("food"):
            ev(cid, "fallback", meta="static:card_caps_empty"); return None
        data = {"day": st["day"], "total": st["cycle_len"], "to_period": st["days_to_next"],
                "phase_ru": st["phase_ru"], **caps}
        return await asyncio.to_thread(IMG.render_daily_card, "cycle", data)
    except Exception as e:
        log.warning("cycle card %s: %s", cid, e); return None

async def _general_card_png(cid, u, summary=None, *, user_generation=None):
    """Белая карточка для беременности/менопаузы; None, если выключено/не собралось."""
    if not (IMG and new_cards_on(cid) and hasattr(IMG, "render_daily_card")): return None
    mode = (u or {}).get("mode") or "none"
    pregnancy = None
    if mode == "preg" and u.get("last_period"):
        try: pregnancy = C.preg_status(u["last_period"])
        except Exception: pregnancy = None
    _m = "preg" if pregnancy else ("meno" if mode == "meno" else None)
    if not _m: return None
    try:
        caps = await _card_captions(
            cid, _m, _card_ctx(cid, u, preg=pregnancy), summary=summary,
            user_generation=user_generation,
        )
        if not caps.get("food"):
            ev(cid, "fallback", meta="static:card_caps_empty"); return None
        if _m == "preg":
            data = {"week": pregnancy.get("week"), "trimester": pregnancy.get("trimester"),
                    "days_left": max(0, pregnancy.get("days_left", 0)),
                    "fruit": _fruit_label(pregnancy.get("week")), **caps}
        else:
            data = dict(caps)
        return await asyncio.to_thread(IMG.render_daily_card, _m, data)
    except Exception as e:
        log.warning("general card %s: %s", cid, e); return None

async def send_infographic(bot, cid):
    if not IMG: return
    generation = _user_generation(cid)
    u, st = status_of(cid)
    if not st: return
    try:
        png = await _cycle_card_png(
            cid, u, st, user_generation=generation,
        )
        if png is None:
            png = await asyncio.to_thread(IMG.render_cycle, date.fromisoformat(u["last_period"]), u["cycle_len"], dtoday())
        bio = io.BytesIO(png); bio.name = "cycle.png"
        await bot.send_photo(cid, photo=bio, caption=f"AIWA · {st['subphase']} {st['phase_ru'].lower()}, день {st['day']}. Месячные через ~{st['days_to_next']} дн.")
        return True
    except Exception as e: log.warning("infographic: %s", e)
    return False

async def send_general_infographic(bot, cid, u=None):
    """Картинка к сводке для беременности и режимов без прогноза фазы цикла."""
    if not IMG: return False
    generation = _user_generation(cid)
    u = u or row(cid)
    if not u: return False
    mode = u.get("mode") or "none"
    pregnancy = None
    if mode == "preg" and u.get("last_period"):
        try:
            pregnancy = C.preg_status(u["last_period"])
        except Exception:
            pregnancy = None
    try:
        _m = ("preg" if (mode == "preg" and pregnancy) else ("meno" if mode == "meno" else None)) if new_cards_on(cid) else None
        png = None
        if _m and hasattr(IMG, "render_daily_card"):
            caps = await _card_captions(
                cid, _m, _card_ctx(cid, u, preg=pregnancy),
                user_generation=generation,
            )
            if caps.get("food"):
                if _m == "preg":
                    data = {"week": pregnancy.get("week"), "trimester": pregnancy.get("trimester"),
                            "days_left": max(0, pregnancy.get("days_left", 0)),
                            "fruit": _fruit_label(pregnancy.get("week")), **caps}
                else:
                    data = dict(caps)
                png = await asyncio.to_thread(IMG.render_daily_card, _m, data)
        if png is None:
            png = await asyncio.to_thread(IMG.render_general_summary, mode, dtoday(), pregnancy)
        bio = io.BytesIO(png); bio.name = "summary.png"
        await bot.send_photo(cid, photo=bio)
        return True
    except Exception as e:
        log.warning("general infographic (%s): %s", mode, e)
        return False

async def send_daily_infographic(bot, cid, u, facts=None, st=None):
    """Render trusted metrics plus model-selected reviewed facts."""
    if not IMG or not u:
        return False
    mode = "cycle" if st is not None else (u.get("mode") or "none")
    pregnancy = None
    if mode == "preg" and u.get("last_period"):
        try:
            pregnancy = C.preg_status(u["last_period"])
        except Exception:
            pregnancy = None
    try:
        png = await asyncio.to_thread(
            IMG.render_summary_card,
            mode,
            dtoday(),
            facts or [],
            st,
            pregnancy,
        )
        bio = io.BytesIO(png); bio.name = "aiwa-today.png"
        await bot.send_photo(cid, photo=bio)
        return True
    except Exception as e:
        log.warning("daily infographic (%s): %s", mode, e)
        return False

async def send_training_card(context, cid, st):
    if not IMG: return
    await context.bot.send_chat_action(cid, "upload_photo")
    try:
        bio = io.BytesIO(await asyncio.to_thread(IMG.render_training, st)); bio.name = "training.png"
        await context.bot.send_photo(cid, photo=bio)
    except Exception as e:
        log.warning("training img: %s", e)

def _feature_on(name, default="0"):
    return os.environ.get(name, default).strip().casefold() in {
        "1", "true", "yes", "on",
    }


def _food_dynamic_section_on(cid=None):
    # Off by default during the event rollout. Enabling it changes only the
    # daily cache namespace and never blocks the fast fallback response.
    if not _feature_on("AIWA_FOOD_DYNAMIC_SECTION", "0") or cid is None:
        return False
    percent = max(
        0, min(100, int(os.environ.get(
            "AIWA_FOOD_DYNAMIC_SECTION_PERCENT", "0"
        )))
    )
    if percent <= 0:
        return False
    cohort = int(_hashlib.sha256(
        f"food-section:{int(cid)}".encode("utf-8")
    ).hexdigest()[:8], 16) % 100
    return cohort < percent


def _food_section_refresh_on():
    return _feature_on("AIWA_FOOD_SECTION_REFRESH", "1")


_MENU_CACHE = {}
def _menu_key(cid, st, prof, mode):
    diet = ((prof.get("diet") if prof else "") or "", (prof.get("diet_note") if prof else "") or "")
    phase = (st.get("phase") if st else ("mode:" + str(mode)))
    version = (
        "food-section-v3"
        if _food_dynamic_section_on(cid) else "food-section-v2"
    )
    return (cid, dtoday().isoformat(), phase, diet, version)
def dc_get(cid, kind, key=""):
    """Дневной кэш в SQLite: чтобы деплой/рестарт не заставлял модель генерить всё заново."""
    c = db(); r = c.execute("SELECT js FROM day_cache WHERE chat_id=? AND d=? AND kind=? AND k=?",
                            (cid, dtoday().isoformat(), kind, str(key)[:120])).fetchone(); c.close()
    if not r: return None
    try:
        return json.loads(r[0])
    except Exception:
        return None

def dc_put(cid, kind, payload, key=""):
    try:
        c = db()
        c.execute("INSERT OR REPLACE INTO day_cache(chat_id,d,kind,k,js) VALUES(?,?,?,?,?)",
                  (cid, dtoday().isoformat(), kind, str(key)[:120], json.dumps(payload, ensure_ascii=False)))
        c.execute("DELETE FROM day_cache WHERE d<?", ((dtoday() - timedelta(days=2)).isoformat(),))
        c.commit(); c.close()
    except Exception as e:
        log.info("day_cache put %s/%s: %s", cid, kind, e)

def dc_put_for_generation(cid, kind, payload, key, generation):
    """Publish cache only inside the lifecycle that produced ``payload``.

    The write-allowed check and INSERT share one SQLite write transaction. If
    /stop wins the lock it deletes the lifecycle before this check; if this
    writer wins, /stop necessarily deletes the row afterwards.
    """
    c = db()
    try:
        c.execute("BEGIN IMMEDIATE")
        if not _user_write_allowed(cid, generation, conn=c):
            c.rollback()
            return False
        c.execute(
            "INSERT OR REPLACE INTO day_cache(chat_id,d,kind,k,js) VALUES(?,?,?,?,?)",
            (
                cid, dtoday().isoformat(), kind, str(key)[:120],
                json.dumps(payload, ensure_ascii=False),
            ),
        )
        c.execute(
            "DELETE FROM day_cache WHERE d<?",
            ((dtoday() - timedelta(days=2)).isoformat(),),
        )
        c.commit()
        return True
    except Exception as e:
        try:
            c.rollback()
        except sqlite3.Error:
            pass
        log.info("day_cache guarded put %s/%s: %s", cid, kind, e)
        return None
    finally:
        c.close()

def dc_del_key(cid, kind, key):
    c = None
    try:
        c = db()
        c.execute(
            "DELETE FROM day_cache WHERE chat_id=? AND d=? AND kind=? AND k=?",
            (cid, dtoday().isoformat(), kind, str(key)[:120]),
        )
        c.commit()
    except Exception:
        pass
    finally:
        if c is not None:
            c.close()

def dc_del(cid, kind=None):
    try:
        c = db()
        if kind: c.execute("DELETE FROM day_cache WHERE chat_id=? AND kind=?", (cid, kind))
        else: c.execute("DELETE FROM day_cache WHERE chat_id=?", (cid,))
        c.commit(); c.close()
    except Exception:
        pass

def menu_cached(cid, st, prof, target, mode=None, usage=None):
    """Дневной кэш меню: обращаемся к модели максимум раз в день на юзера, дальше — мгновенно."""
    key = _menu_key(cid, st, prof, mode)
    hit = _MENU_CACHE.get(key)
    if hit is not None:
        return hit
    disk = dc_get(cid, "menu", key[2:])
    if disk is not None:
        _MENU_CACHE[key] = disk
        return disk
    if st is not None:
        m = L.menu_today(st, profile=prof, target=target, usage=usage)
    else:
        m = L.general_menu(prof, mode, target, usage=usage)
    if isinstance(m, dict) and m.pop("_fallback", None):
        ev(cid, "fallback", meta="static:menu_pool")
    _MENU_CACHE[key] = m
    dc_put(cid, "menu", m, key[2:])
    _prune_day(_MENU_CACHE)
    return m
def menu_cache_clear(cid):
    for k in [k for k in list(_MENU_CACHE) if k[0] == cid]:
        _MENU_CACHE.pop(k, None)
    dc_del(cid, "menu")

_SUM_CACHE = {}
def _prune_day(cache):
    today = dtoday().isoformat()
    if len(cache) > 1500:
        tomorrow = (dtoday() + timedelta(days=1)).isoformat()
        for k in [k for k in list(cache) if k[1] not in (today, tomorrow)]:
            cache.pop(k, None)

def _prepared_context_key(cache_key):
    raw = json.dumps(list(cache_key[2:]), ensure_ascii=False, sort_keys=True, default=str)
    return _hashlib.sha256(raw.encode("utf-8")).hexdigest()

def _summary_state_for_day(u, day):
    target = date.fromisoformat(day)
    if is_cycle(u) and u.get("last_period") and u.get("cycle_len"):
        return C.cycle_status(date.fromisoformat(u["last_period"]), int(u["cycle_len"]), target), None
    if u.get("mode") == "preg" and u.get("last_period"):
        try:
            return None, C.preg_status(u["last_period"], target)
        except Exception:
            pass
    return None, None

def _summary_hint(cid, u, pregnancy=None):
    hint = last_hint(cid) or ""
    if u.get("mode") == "preg" and pregnancy:
        hint = ((hint + " ") if hint else "") + (
            f"Беременность, срок примерно {pregnancy['week']} недель, "
            f"{pregnancy['trimester']} триместр."
        )
    return hint or None

def _summary_key(cid, u, day, st=None, pregnancy=None):
    profile = profile_of(u) or {}
    snapshot = {
        "mode": "cycle" if st is not None else (u.get("mode") or "none"),
        "last_period": u.get("last_period"),
        "cycle_len": u.get("cycle_len"),
        "period_len": u.get("period_len"),
        "modules": list(u.get("modules") or []),
        "profile": {k: profile.get(k) for k in (
            "height", "weight", "age", "activity", "diet", "diet_note", "kcal_goal"
        )},
        "checkin": log_get(cid, day) or {},
        "hint": _summary_hint(cid, u, pregnancy),
        "cycle": ({k: st.get(k) for k in (
            "day", "cycle_len", "phase", "subphase", "days_to_next", "status"
        )} if st else None),
        "pregnancy": ({k: pregnancy.get(k) for k in (
            "week", "day", "trimester", "due", "days_left"
        )} if pregnancy else None),
    }
    return (cid, day, json.dumps(snapshot, ensure_ascii=False, sort_keys=True, default=str))

def _summary_pack(body, facts=None):
    return {"v": 2, "body": str(body or ""), "facts": list(facts or [])[:3]}

def _summary_unpack(value):
    if isinstance(value, dict):
        return str(value.get("body") or ""), list(value.get("facts") or [])[:3]
    return str(value or ""), []

def prepared_summary_clear(cid):
    """Сводки, подготовленные под прежний режим/профиль, не должны доезжать после смены."""
    for k in [k for k in list(_SUM_CACHE) if k[0] == cid]:
        _SUM_CACHE.pop(k, None)
    try:
        c = db(); c.execute("DELETE FROM prepared_summaries WHERE chat_id=?", (cid,)); c.commit(); c.close()
    except Exception as e:
        log.info("prepared clear %s: %s", cid, e)

def prepared_summary_get(cid, day, cache_key):
    c = db()
    try:
        row_ = c.execute(
            """SELECT body FROM prepared_summaries
               WHERE chat_id=? AND summary_date=? AND context_key=?""",
            (cid, day, _prepared_context_key(cache_key)),
        ).fetchone()
        if not row_:
            return None
        raw = row_[0]
        try:
            value = json.loads(raw)
            if isinstance(value, dict) and value.get("v") == 2:
                return value
        except Exception:
            pass
        return raw
    finally:
        c.close()

_PREP_CLEANUP_DAY = None
def prepared_summary_put(cid, day, cache_key, value, generation=None):
    global _PREP_CLEANUP_DAY
    body, _ = _summary_unpack(value)
    if not body:
        return False
    stored = (json.dumps(value, ensure_ascii=False, separators=(",", ":"))
              if isinstance(value, dict) else str(value))
    c = db()
    try:
        if not _user_write_allowed(cid, generation=generation, conn=c):
            return False
        c.execute(
            """INSERT OR REPLACE INTO prepared_summaries
               (chat_id,summary_date,context_key,body,prepared_at)
               VALUES(?,?,?,?,?)""",
            (cid, day, _prepared_context_key(cache_key), stored, datetime.now(TZ).isoformat()),
        )
        cleanup_day = dtoday().isoformat()
        if _PREP_CLEANUP_DAY != cleanup_day:
            c.execute("DELETE FROM prepared_summaries WHERE summary_date<?",
                      ((dtoday() - timedelta(days=2)).isoformat(),))
            _PREP_CLEANUP_DAY = cleanup_day
        c.commit()
        return True
    finally:
        c.close()

async def prepare_daily_summary(cid, target_day=None):
    """Warm the daily LLM result before the user's exact delivery time."""
    generation = _user_generation(cid)
    u = row(cid)
    if not u or not is_onboarded(u):
        return False
    usage = []; day = target_day or dtoday().isoformat()
    st, pregnancy = _summary_state_for_day(u, day)
    if st is not None and st.get("status") != "normal":
        return False
    key = _summary_key(cid, u, day, st, pregnancy)
    if _SUM_CACHE.get(key) is not None or prepared_summary_get(cid, day, key) is not None:
        return True
    hint = _summary_hint(cid, u, pregnancy)
    if st is None:
        body = await llm_to_thread(
            cid, "daily_summary_prepare", L.general_summary,
            profile_of(u), u.get("mode"), hint=hint, usage=usage,
            user_generation=generation,
        )
    else:
        body = await llm_to_thread(
            cid, "daily_summary_prepare", L.generate_summary,
            st, u["modules"], hint=hint, usage=usage,
            user_generation=generation,
        )
    if not body or not _user_write_allowed(cid, generation=generation):
        return False
    mode = "cycle" if st is not None else (u.get("mode") or "none")
    facts = []
    if mode in ("cycle", "preg"):
        facts = await llm_to_thread(
            cid, "summary_card_facts", L.summary_card_facts,
            mode, st, pregnancy, hint, usage,
            user_generation=generation,
        )
    if not _user_write_allowed(cid, generation=generation):
        return False
    value = _summary_pack(body, facts)
    _prune_day(_SUM_CACHE)
    _SUM_CACHE[key] = value
    if not prepared_summary_put(cid, day, key, value, generation=generation):
        _SUM_CACHE.pop(key, None)
        return False
    if usage:
        ev(cid, "tokens", sum(usage), meta="summary_prepare", calls=len(usage), usage=usage)
    return True

async def send_menu(context, cid, with_image=False):
    u, st = status_of(cid)
    if not st: return None
    if with_image:
        await context.bot.send_chat_action(cid, "upload_photo")
    prof = profile_of(u); target = profile_kcal(prof) if prof else None
    usage = []; mdata = await asyncio.to_thread(menu_cached, cid, st, prof, target, None, usage)
    if usage: ev(cid, "tokens", sum(usage), meta="menu", calls=len(usage), usage=usage)
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
        _recent = _recent_workouts_text(cid)
        _fq = ("Составь рекомендацию по нагрузке на сегодня под мою фазу. Мои последние тренировки: "
               + (_recent or "данных нет") + ". ОБЯЗАТЕЛЬНО учти их: если вчера была тяжёлая тренировка "
               "(например на ноги) — сегодня предложи другие группы мышц или восстановление, и скажи об этом прямо. "
               "Формат: короткий заголовок, почему именно так (гормоны и восстановление), 2-3 конкретных варианта с «как».")
        text = await think_llm(context, cid, L.answer_question, st, _fq, llm_profile_of(row(cid)), None, usage=usage)
        if not text or "не вернула ответ" in text:
            text = await think_llm(context, cid, L.explain_section, st, "training", usage=usage)
        text += "\n\nВ приложении Айвы можно посмотреть нагрузку рядом с календарём, симптомами и фазой цикла. Открой приложение кнопкой ниже."
        return await send_answer(context, cid, text, st, "нагрузка сегодня", usage=usage,
            app_user=row(cid), app_label="Открыть нагрузку")
    if key == "food":
        res = await send_menu(context, cid, with_image=False)
        if res:
            mdata, target = res
            text = L.menu_text(st, mdata, target)
        else:
            text = L.section_text(st, "food")
        text += "\n\nВ приложении Айвы меню удобнее: рядом с каждым блюдом есть кнопка «Заменить», можно быстро выбрать другой вариант без пересборки всего дня. Открой приложение кнопкой ниже."
        return await send_answer(context, cid, text, st, "питание сегодня", usage=usage,
            app_user=row(cid), app_label="Открыть питание")
    text = L.section_text(st, key)
    await send_answer(context, cid, text, st, text, usage=usage)

async def send_delay(context, cid, st, campaign=None):
    claimed = False; sent_any = False
    if campaign:
        claimed = _claim_push_delivery(cid, campaign)
        if not claimed:
            log.info("delay summary skipped as duplicate: %s %s", cid, campaign)
            return False
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
    try:
        if IMG:
            try:
                bio = io.BytesIO(await asyncio.to_thread(IMG.render_delay, st))
                bio.name = "delay.png"
                await context.bot.send_photo(cid, photo=bio)
                sent_any = True
            except Exception as e:
                log.warning("delay img: %s", e)
        u = row(cid)
        body = msgs.get(st["status"], "")
        await context.bot.send_message(
            cid, html.escape(body) + "\n\n" + APP_CTA_HTML,
            reply_markup=summary_sugg_kb(cid, u, st, app_label="Открыть календарь"),
            parse_mode="HTML",
        )
        sent_any = True
        if campaign:
            _complete_push_delivery(cid, campaign)
            ev(cid, "goal", meta="summary")
            ev(cid, "broadcast", meta="sent|" + campaign)
        return True
    except Exception:
        if claimed and not sent_any:
            _release_push_delivery(cid, campaign)
        raise

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

RICH_OK = os.environ.get("AIWA_RICH", "1") in ("1", "true", "True", "on")

async def send_rich_with_photo(bot, cid, md_text, png_bytes, reply_markup=None):
    """Одно сообщение: карточка + текст сводки. Bot API 10.1: media в rich-markdown через tg://photo?id=."""
    def _do():
        import requests as _rq
        md = re.sub(r"(?m)^(\s*)•\s+", r"\1- ", str(md_text))
        rich = {"markdown": "![](tg://photo?id=card)\n\n" + md,
                "media": [{"id": "card", "media": {"type": "photo", "media": "attach://cardpng"}}]}
        data = {"chat_id": str(cid), "rich_message": json.dumps(rich, ensure_ascii=False)}
        if reply_markup is not None:
            data["reply_markup"] = reply_markup.to_json()
        last = None
        for _att in (1, 2):
            try:
                r = _rq.post(f"{AIWA_TELEGRAM_API_ORIGIN}/bot{bot.token}/sendRichMessage",
                             data=data, files={"cardpng": ("card.png", png_bytes, "image/png")}, timeout=60)
                j = r.json()
                if j.get("ok"): return j
                last = RuntimeError(f"sendRichMessage(photo): {j.get('description')}")
                if "retry" not in str(j.get("description", "")).lower(): break
            except Exception as e:
                last = e
        raise last
    _remember_spoken(cid, md_text)
    return await asyncio.to_thread(_do)

async def send_rich(bot, cid, md_text, reply_markup=None):
    """Отправка через sendRichMessage (Bot API 10.1+): Telegram сам рендерит GFM —
    таблицы, ### заголовки, списки, цитаты. Бросает исключение, если метод недоступен."""
    md_text = guard_aiwa_reply(cid, md_text)
    md_text = re.sub(r"(?m)^(\s*)•\s+", r"\1- ", str(md_text))   # любые «• » -> GFM-список, иначе рендер склеит/задвоит
    _remember_spoken(cid, md_text)  # rich bypasses the Telegram proxy
    data = {"chat_id": cid, "rich_message": json.dumps({"markdown": md_text})}
    if reply_markup is not None:
        data["reply_markup"] = reply_markup.to_json()
    return await bot._post("sendRichMessage", data)

def tg_rich(text):
    """Лёгкие маркеры от модели -> Telegram HTML: **жирный**, __курсив__, ```моноширинный блок```."""
    if not text: return ""
    # Protect fenced blocks before applying inline entities: Telegram rejects
    # nested <b>/<i> inside <pre>.
    chunks = re.split(r"(```[a-z]*\n?.*?```)", str(text), flags=re.S)
    out = []
    for chunk in chunks:
        if chunk.startswith("```") and chunk.endswith("```"):
            body = re.sub(r"^```[a-z]*\n?", "", chunk)
            body = body[:-3].strip("\n")
            out.append("<pre>" + html.escape(body, quote=False) + "</pre>")
            continue
        safe = html.escape(chunk, quote=False)
        safe = re.sub(r"(?m)^#{1,6}\s*(.+)$", r"<b>\1</b>", safe)
        safe = _gfm_tables_to_pre(safe)
        for part in re.split(r"(<pre>.*?</pre>)", safe, flags=re.S):
            if part.startswith("<pre>") and part.endswith("</pre>"):
                out.append(part)
                continue
            part = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", part, flags=re.S)
            part = re.sub(r"__(.+?)__", r"<i>\1</i>", part, flags=re.S)
            out.append(part.replace("**", "").replace("__", ""))
    return "".join(out)

def _gfm_tables_to_pre(t):
    """Фолбэк для клиентов без rich: GFM-таблицу выравниваем пробелами в <pre>."""
    out, buf = [], []
    def flush():
        if len(buf) >= 2 and re.match(r"^\s*\|?[\s:|-]+\|?\s*$", buf[1]):
            rows = [[c.strip() for c in r.strip().strip("|").split("|")] for r in (buf[:1] + buf[2:])]
            w = [max(len(r[i]) if i < len(r) else 0 for r in rows) for i in range(max(len(r) for r in rows))]
            out.append("<pre>" + "\n".join("  ".join((r[i] if i < len(r) else "").ljust(w[i]) for i in range(len(w))).rstrip() for r in rows) + "</pre>")
        else:
            out.extend(buf)
        buf.clear()
    for ln in t.split("\n"):
        if "|" in ln and ln.strip():
            buf.append(ln)
        else:
            flush(); out.append(ln)
    flush()
    return "\n".join(out)

def md_plain(text):
    """Для мини-аппа: маркеры убираем, таблицы сводим к строкам — он рендерит плейн."""
    if not text: return text
    t = re.sub(r"```[a-z]*\n?(.*?)```", r"\1", str(text), flags=re.S)
    t = re.sub(r"(?m)^#{1,6}\s*", "", t)
    lines = []
    for ln in t.split("\n"):
        if re.match(r"^\s*\|?[\s:|-]+\|?\s*$", ln) and "|" in ln:
            continue                                   # разделитель таблицы
        if "|" in ln and ln.strip().startswith("|"):
            cells = [c.strip() for c in ln.strip().strip("|").split("|") if c.strip()]
            ln = "• " + ", ".join(cells)
        lines.append(ln)
    t = "\n".join(lines)
    t = re.sub(r"(?m)^(\s*)-\s+", r"\1• ", t)          # в мини-аппе плейн: «- » -> «• »
    return t.replace("**", "").replace("__", "")

TG_MESSAGE_LIMIT = 4096
# Leave room for Telegram entity parsing and for a short quoted question.
TG_TEXT_CHUNK = 3600
TG_QUOTE_LIMIT = 700

def _tg_units(text):
    """Telegram entity offsets and limits use UTF-16 code units."""
    return len((text or "").encode("utf-16-le")) // 2

def _tg_prefix_len(text, limit):
    """Largest Python string prefix that fits into ``limit`` UTF-16 units."""
    lo, hi = 0, len(text)
    while lo < hi:
        mid = (lo + hi + 1) // 2
        if _tg_units(text[:mid]) <= limit: lo = mid
        else: hi = mid - 1
    return lo

def split_tg(text, limit=TG_TEXT_CHUNK, first_limit=None):
    """Split a Telegram message without dropping content or breaking sentences when possible."""
    if not text: return []
    out = []; rest = str(text); current_limit = int(first_limit or limit)
    while rest:
        if _tg_units(rest) <= current_limit:
            out.append(rest); break
        hard = max(1, _tg_prefix_len(rest, current_limit))
        window = rest[:hard]; floor = max(1, int(hard * 0.55))
        boundaries = [m.end() for m in re.finditer(r"\n\n|\n|(?<=[.!?])\s+|\s+", window)]
        cut = max((p for p in boundaries if p >= floor), default=hard)
        out.append(rest[:cut]); rest = rest[cut:]; current_limit = int(limit)
    return out

def _clip_tg(text, limit=TG_QUOTE_LIMIT):
    text = str(text or "")
    if _tg_units(text) <= limit: return text
    keep = max(1, _tg_prefix_len(text, max(1, limit - 1)))
    return text[:keep].rstrip() + "…"

async def reply_long(message, text, reply_markup=None):
    """Ответ с rich-форматированием; фолбэк — HTML по кускам. Кнопки только у последней части."""
    text = guard_aiwa_reply(message.chat_id, text)
    if RICH_OK:
        try:
            await send_rich(message.get_bot(), message.chat_id, text, reply_markup=reply_markup)
            return
        except Exception as _e:
            log.info("rich fallback: %s", str(_e)[:120])
    parts = split_tg(text) or [str(text or "")]
    for i, part in enumerate(parts):
        markup = reply_markup if i == len(parts) - 1 else None
        try:
            await message.reply_text(tg_rich(part), reply_markup=markup, parse_mode="HTML")
        except BadRequest:
            await message.reply_text(md_plain(part), reply_markup=markup)
def chat_hint(cid):
    base = last_hint(cid) or ""
    u = row(cid)
    if u and u.get("mode") == "preg" and u.get("last_period"):
        try:
            stp = C.preg_status(u["last_period"])
            base = (base + " " if base else "") + f"Беременность, срок примерно {stp['week']} недель, {stp['trimester']} триместр, до родов ~{max(0, stp['days_left'])} дн."
        except Exception: pass
    return base or None
_VOICE_TURN = {}   # cid -> True, если текущий вопрос пришёл голосом: тогда ответ дублируем голосом
_SPOKEN_COLLECTOR = contextvars.ContextVar("aiwa_spoken_collector", default=None)

def _remember_spoken(cid, text):
    """Record visible text in the current voice request, never in global chat state."""
    collector = _SPOKEN_COLLECTOR.get()
    if collector is not None and str(text or "").strip():
        collector.append(_voice_plain_text(text))

def _voice_reply_default():
    # Общий рубильник провайдера: пока путь TTS не доказал паритет с текстом,
    # он выключен по умолчанию. STT это не касается — расшифровка работает
    # всегда и всё равно возвращает текстовый ответ.
    return os.environ.get("AIWA_VOICE_REPLY", "0") in ("1", "true", "True", "yes", "on")

def _voice_reply_on(cid=None):
    """Отвечать ли голосом. Выбор пользователя важнее общего умолчания.

    Раньше это был только глобальный флаг: настроить режим под себя было
    нельзя ни из чата, ни из меню, ни из мини-аппа — единственная возможность
    из списка багов, которой не существовало нигде. Теперь решение хранится
    в профиле, а флаг остаётся страховкой на стороне провайдера: выключенный
    рубильник запрещает голос всем.
    """
    if not _voice_reply_default():
        return False
    if cid is None:
        return True
    choice = str((row(cid) or {}).get("voice_reply") or "").strip().lower()
    return choice != "text"

def _voice_plain_text(value):
    """Prepare already-sent Telegram text for TTS without speaking HTML markup."""
    text = html.unescape(re.sub(r"<[^>]+>", "", str(value or "")))
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return text[:3000].rstrip()

class _VoiceBotProxy:
    """Delegate Telegram calls while remembering text sent during a voice turn."""
    def __init__(self, bot, cid, sent_texts):
        self._bot = bot; self._cid = cid; self._sent_texts = sent_texts

    def __getattr__(self, name):
        return getattr(self._bot, name)

    async def send_message(self, chat_id, text, *args, **kwargs):
        result = await self._bot.send_message(chat_id, text, *args, **kwargs)
        if str(chat_id) == str(self._cid) and str(text or "").strip():
            self._sent_texts.append(str(text))
        return result

    async def send_photo(self, chat_id, *args, **kwargs):
        result = await self._bot.send_photo(chat_id, *args, **kwargs)
        caption = kwargs.get("caption")
        if str(chat_id) == str(self._cid) and str(caption or "").strip():
            self._sent_texts.append(str(caption))
        return result

class _VoiceContextProxy:
    def __init__(self, context, bot):
        self._context = context; self.bot = bot

    def __getattr__(self, name):
        return getattr(self._context, name)

class _VoiceMessageProxy:
    def __init__(self, message, sent_texts):
        self._message = message; self._sent_texts = sent_texts

    def __getattr__(self, name):
        return getattr(self._message, name)

    async def reply_text(self, text, *args, **kwargs):
        result = await self._message.reply_text(text, *args, **kwargs)
        if str(text or "").strip():
            self._sent_texts.append(str(text))
        return result

class _VoiceUpdateProxy:
    def __init__(self, update, message):
        self._update = update; self.message = message

    def __getattr__(self, name):
        return getattr(self._update, name)

async def _send_audio_fallback(context, cid, audio):
    """Если Telegram не даёт слать голосовые (настройка приватности у получателя),
    отправляем то же самое обычным аудиофайлом."""
    from io import BytesIO
    buf = BytesIO(audio); buf.name = "aiwa.ogg"
    await context.bot.send_audio(cid, buf, title="Ответ Айвы", performer="Айва")

async def _send_voice_reply(context, cid, text):
    """Speak the complete answer in bounded requests; synthesize chunks in parallel but send in order."""
    try:
        chunks = L.tts_chunks(text)
        try:
            parallelism = int(os.environ.get("AIWA_TTS_PARALLELISM", "1"))
        except (TypeError, ValueError):
            parallelism = 1
        parallelism = max(1, min(int(getattr(L, "_tts_provider_concurrency")()), parallelism))
        gate = asyncio.Semaphore(parallelism)

        async def synthesize_one(chunk):
            info = {}
            async with gate:
                audio = await llm_to_thread(cid, "tts", L.synthesize, chunk, info)
            return chunk, audio, info

        results = await asyncio.gather(*(synthesize_one(chunk) for chunk in chunks))
        total_ms = 0; total_chars = 0; calls = 0; how = "tts:salute"
        for chunk, audio, info in results:
            if not audio:
                continue
            calls += 1
            total_ms += int(info.get("ms") or 0)
            total_chars += int(info.get("chars") or len(chunk))
            try:
                await context.bot.send_voice(cid, audio)
            except Exception as exc:
                if "voice_messages_forbidden" not in str(exc).lower():
                    raise
                await _send_audio_fallback(context, cid, audio)
                how = "tts:audio"
        if calls:
            ev(cid, "tts", meta=how, ms=total_ms, n=total_chars, calls=calls)
    except Exception as e:
        log.warning("voice reply: %s", e)

def _safety_level(text):
    """Classify only the presence of safety guidance; never store answer text."""
    value = str(text or "").lower()
    if re.search(r"\b(103|112)\b|вызов\w*\s+скор\w*|неотложн\w*\s+помощ", value):
        return "emergency"
    if re.search(r"обрат\w*\s+(?:за\s+)?(?:медицинск\w*\s+помощ\w*|к\s+врач\w*)|"
                 r"связ\w*\s+с\s+врач\w*|запис\w*\s+к\s+врач\w*", value):
        return "escalation"
    if re.search(r"не\s+(?:является\s+)?диагноз\w*|не\s+став\w*\s+диагноз", value):
        return "disclaimer"
    return None

def _feedback_sampled(answer_id):
    """Показывает оценку на стабильной доле ответов, а не после каждой реплики."""
    try:
        rate = float(os.environ.get("AIWA_FEEDBACK_SAMPLE_RATE", "0.20"))
    except (TypeError, ValueError):
        rate = 0.20
    rate = max(0.0, min(1.0, rate))
    if rate <= 0:
        return False
    if rate >= 1:
        return True
    bucket = int(_hashlib.sha256(str(answer_id).encode("utf-8")).hexdigest()[:8], 16)
    return bucket < int(rate * (2 ** 32))

def _instrument_feedback_prompt(cid, answer, channel="bot"):
    answer_id = secrets.token_hex(8)
    sampled = _feedback_sampled(answer_id)
    if sampled:
        _register_feedback_prompt(cid, answer_id, channel)
    level = _safety_level(answer)
    if level:
        ev(cid, "safety", meta=f"{level}|{answer_id}|{channel}")
    return answer_id if sampled else None

def _register_feedback_prompt(cid, answer_id, channel="bot"):
    """Persist the button entitlement independently from analytics events."""
    answer_id = re.sub(r"[^a-f0-9]", "", str(answer_id or ""))[:32]
    if not answer_id:
        return False
    c = db()
    try:
        if not _user_write_allowed(cid, conn=c):
            return False
        cur = c.execute(
            """INSERT OR IGNORE INTO feedback_requests
               (chat_id,answer_id,channel,created_at) VALUES(?,?,?,?)""",
            (cid, answer_id, str(channel or "bot")[:24], datetime.now(TZ).isoformat()),
        )
        c.commit()
        created = cur.rowcount > 0
    finally:
        c.close()
    if created:
        ev(cid, "feedback_prompt", meta=f"{answer_id}|{channel}")
    return True

def _feedback_prompt_exists(cid, answer_id):
    """Accept feedback only for an answer actually shown to this user."""
    c = db()
    try:
        if c.execute(
            "SELECT 1 FROM feedback_requests WHERE chat_id=? AND answer_id=? LIMIT 1",
            (cid, answer_id),
        ).fetchone() is not None:
            return True
        v2 = c.execute(
            """SELECT properties_json FROM events_v2
               WHERE user_key=? AND event_name='answer_feedback_prompted'
               ORDER BY occurred_at DESC""",
            (A2.user_key(cid),),
        ).fetchall()
        for (props_json,) in v2:
            try:
                if json.loads(props_json or "{}").get("answer_id") == answer_id:
                    return True
            except (TypeError, ValueError):
                continue
        # Compatibility with buttons sent before feedback_requests was introduced.
        return c.execute(
            "SELECT 1 FROM events WHERE chat_id=? AND action='feedback_prompt' AND meta LIKE ? LIMIT 1",
            (cid, answer_id + "|%"),
        ).fetchone() is not None
    finally:
        c.close()

def _submit_feedback(cid, answer_id, rating, channel="bot"):
    """Atomically save one rating; repeated taps are successful but do not duplicate analytics."""
    answer_id = re.sub(r"[^a-f0-9]", "", str(answer_id or ""))[:32]
    rating = str(rating or "")
    if not answer_id or rating not in {"helpful", "unhelpful"}:
        return "missing"
    c = db()
    saved_channel = str(channel or "bot")[:24]
    try:
        if not _user_write_allowed(cid, conn=c):
            return "missing"
        c.execute("BEGIN IMMEDIATE")
        row_ = c.execute(
            "SELECT channel,rating FROM feedback_requests WHERE chat_id=? AND answer_id=?",
            (cid, answer_id),
        ).fetchone()
        if row_ is None:
            # Migrate a still-visible button on first click.
            v2_channel = None
            for (props_json,) in c.execute(
                """SELECT properties_json FROM events_v2
                   WHERE user_key=? AND event_name='answer_feedback_prompted'
                   ORDER BY occurred_at DESC""",
                (A2.user_key(cid),),
            ).fetchall():
                try:
                    props = json.loads(props_json or "{}")
                except (TypeError, ValueError):
                    continue
                if props.get("answer_id") == answer_id:
                    v2_channel = str(props.get("channel") or saved_channel)[:24]
                    break
            legacy = c.execute(
                """SELECT meta FROM events
                   WHERE chat_id=? AND action='feedback_prompt' AND meta LIKE ?
                   ORDER BY id DESC LIMIT 1""",
                (cid, answer_id + "|%"),
            ).fetchone()
            if legacy is None and v2_channel is None:
                c.rollback()
                return "missing"
            if legacy is not None and "|" in (legacy[0] or ""):
                saved_channel = legacy[0].split("|", 1)[1][:24] or saved_channel
            elif v2_channel:
                saved_channel = v2_channel
            c.execute(
                """INSERT INTO feedback_requests
                   (chat_id,answer_id,channel,created_at) VALUES(?,?,?,?)""",
                (cid, answer_id, saved_channel, datetime.now(TZ).isoformat()),
            )
            row_ = (saved_channel, None)
        saved_channel = row_[0] or saved_channel
        if row_[1] in {"helpful", "unhelpful"}:
            c.commit()
            return "duplicate"
        c.execute(
            """UPDATE feedback_requests SET rating=?,submitted_at=?
               WHERE chat_id=? AND answer_id=? AND rating IS NULL""",
            (rating, datetime.now(TZ).isoformat(), cid, answer_id),
        )
        c.commit()
    finally:
        c.close()
    ev(cid, "feedback", meta=f"{rating}|{answer_id}|{saved_channel}")
    return "saved"

async def send_answer(context, cid, text, st, basis_q, usage=None, quote=None, app_user=None, app_label=None):
    if usage is None: usage = []
    sf = getattr(L, "split_followups", None)
    clean, sugg = sf(text) if sf else (text, [])
    clean = guard_aiwa_reply(cid, clean)
    try:
        topical = L.followups(st, basis_q, clean)
        # For known product topics deterministic relevance wins over a model
        # suggestion that may be well-formed but unrelated to the answer.
        if topical:
            sugg = topical
    except Exception:
        pass
    answer_id = secrets.token_hex(8)
    feedback_id = answer_id if _feedback_sampled(answer_id) else None
    kb = sugg_kb(cid, sugg, app_user=app_user, app_label=app_label, feedback_id=feedback_id)
    quote_text = _clip_tg(quote) if quote else None
    rich_sent = False
    if RICH_OK:
        try:
            md = (("> " + quote_text.replace("\n", " ") + "\n\n") if quote_text else "") + clean
            await send_rich(context.bot, cid, md, reply_markup=kb)
            rich_sent = True
        except Exception as _re_:
            log.info("rich fallback: %s", str(_re_)[:120])
    if not rich_sent:
        first_limit = min(TG_TEXT_CHUNK, TG_MESSAGE_LIMIT - _tg_units(quote_text) - 1) if quote_text else TG_TEXT_CHUNK
        parts = split_tg(clean, first_limit=max(256, first_limit)) or [clean]
        for i, part in enumerate(parts):
            last = i == len(parts) - 1
            if i == 0 and quote_text:
                body = f"<blockquote>{html.escape(quote_text)}</blockquote>\n{tg_rich(part)}"
                try:
                    await context.bot.send_message(cid, body, reply_markup=(kb if last else None), parse_mode="HTML")
                except BadRequest:
                    await context.bot.send_message(cid, quote_text + "\n\n" + md_plain(part),
                                                   reply_markup=(kb if last else None))
            else:
                try:
                    await context.bot.send_message(cid, tg_rich(part), reply_markup=(kb if last else None), parse_mode="HTML")
                except BadRequest:
                    await context.bot.send_message(cid, md_plain(part), reply_markup=(kb if last else None))
    ev(cid, "assistant_message", meta="bot_rich" if rich_sent else "bot")
    if feedback_id:
        _register_feedback_prompt(cid, answer_id, "bot")
    level = _safety_level(clean)
    if level:
        ev(cid, "safety", meta=f"{level}|{answer_id}|bot")
    ev(cid, "tokens", sum(usage), meta="answer", calls=len(usage), usage=usage)
    if _VOICE_TURN.pop(cid, False) and _voice_reply_on(cid):
        await _send_voice_reply(context, cid, clean)

async def _send_summary_text(context, cid, clean, kb):
    """Use Telegram rich messages when available, with a safe HTML fallback."""
    clean = guard_aiwa_reply(cid, clean)
    if RICH_OK:
        try:
            await send_rich(context.bot, cid, clean, reply_markup=kb)
            return
        except Exception as exc:
            log.info("rich summary fallback: %s", str(exc)[:120])
    try:
        await context.bot.send_message(
            cid, tg_rich(clean) + "\n\n" + APP_CTA_HTML,
            reply_markup=kb, parse_mode="HTML",
        )
    except BadRequest:
        await context.bot.send_message(cid, md_plain(clean), reply_markup=kb)

def _delivery_summary_fallback(u, st=None, pregnancy=None):
    """Fast deterministic fallback used only when scheduled pre-generation missed."""
    if st is not None:
        return L.fallback_summary(st, u.get("modules") or ["phase", "general", "food", "training"])
    mode = (u or {}).get("mode") or "none"
    if mode == "preg":
        term = ""
        if pregnancy:
            term = f"Сейчас ориентировочно {pregnancy['week']}-я неделя, {pregnancy['trimester']}-й триместр. "
        return (
            "### 💛 Сегодня\n"
            f"- {term}Ориентируйся на самочувствие и назначения врача.\n"
            "- При боли, кровянистых выделениях, выраженной слабости или резком ухудшении самочувствия свяжись с врачом.\n\n"
            "### 🍽 Основа дня\n"
            "- Регулярно ешь, пей достаточно воды и избегай продуктов, которые врач рекомендовал исключить.\n\n"
            "### 🏋️ Нагрузка\n"
            "- Выбирай только привычную комфортную активность без боли и перегрева."
        )
    if mode == "male":
        return (
            "### ⚡ Сегодня\n"
            "- Это резервная сводка: персональный текст не успел подготовиться заранее.\n"
            "- Оцени энергию, сон и восстановление после последних нагрузок.\n\n"
            "### 🍽 Питание и нагрузка\n"
            "- Выбирай обычный сбалансированный рацион и комфортную активность, оставляя запас сил."
        )
    if mode == "meno":
        context_line = "при менопаузе"
    elif mode == "irregular":
        context_line = "при нерегулярном цикле"
    else:
        context_line = "без привязки к циклу"
    return (
        "### 💛 Сегодня\n"
        f"- Это резервная сводка {context_line}: персональный текст не успел подготовиться заранее.\n"
        "- Отметь энергию и симптомы, чтобы следующая сводка учитывала актуальное самочувствие.\n\n"
        "### 🍽 Питание и нагрузка\n"
        "- Выбирай обычный сбалансированный рацион и комфортную активность по самочувствию."
    )

async def push_general(
    context, cid, with_image=True, campaign=None, *, user_generation=None,
):
    generation = (
        _user_generation(cid) if user_generation is None else user_generation
    )
    u = row(cid)
    if not u or not is_onboarded(u):
        return False
    if not _user_write_allowed(cid, generation):
        return False
    if u.get("mode") == "male":
        with_image = False   # мужская сводка — только текст, без инфографики
    claimed = False; sent_any = False
    if campaign:
        claimed = _claim_push_delivery(cid, campaign)
        if not claimed:
            log.info("summary push skipped as duplicate: %s %s", cid, campaign)
            return False
    try:
        usage = []; day = dtoday().isoformat()
        _, pregnancy = _summary_state_for_day(u, day)
        key = _summary_key(cid, u, day, None, pregnancy)
        value = _SUM_CACHE.get(key)
        if value is None:
            value = prepared_summary_get(cid, day, key)
        body, facts = _summary_unpack(value)
        if not body and not campaign:
            hint = _summary_hint(cid, u, pregnancy)
            body = await llm_to_thread(
                cid, "daily_summary", L.general_summary,
                profile_of(u), u.get("mode"), hint=hint, usage=usage,
                user_generation=generation,
            )
            if u.get("mode") == "preg" and _user_write_allowed(cid, generation=generation):
                facts = await llm_to_thread(
                    cid, "summary_card_facts", L.summary_card_facts,
                    "preg", None, pregnancy, hint, usage,
                    user_generation=generation,
                )
            if body and _user_write_allowed(cid, generation=generation):
                value = _summary_pack(body, facts)
                _prune_day(_SUM_CACHE); _SUM_CACHE[key] = value
                prepared_summary_put(cid, day, key, value, generation=generation)
        if not body:
            body = _delivery_summary_fallback(u, pregnancy=pregnancy)
            ev(cid, "fallback", meta="static:summary_delivery_cache_miss")
        clean, extra = L.split_followups(body)
        kb = sugg_kb(cid, merge_summary_suggestions(u, None, extra), app_user=u,
                     app_label=APP_BUTTON_TEXT, campaign=campaign)
        _png = (
            await _general_card_png(
                cid, u, summary=clean, user_generation=generation,
            )
        ) if (with_image and new_cards_on(cid)) else None
        if _png is not None:
            try:
                await send_rich_with_photo(context.bot, cid, guard_aiwa_reply(cid, clean), _png, reply_markup=kb)
            except Exception as _ce:
                log.info("combined card fallback: %s", str(_ce)[:120])
                ev(cid, "fallback", meta="static:combined_send_fail")
                await send_daily_infographic(context.bot, cid, u, facts)
                await _send_summary_text(context, cid, clean, kb)
        else:
            if with_image:
                sent_any = await send_daily_infographic(context.bot, cid, u, facts)
            await _send_summary_text(context, cid, clean, kb)
        sent_any = True
        if usage: ev(cid, "tokens", sum(usage), meta="summary", calls=len(usage), usage=usage)
        ev(cid, "goal", meta="summary")
        if campaign:
            _complete_push_delivery(cid, campaign)
            ev(cid, "broadcast", meta="sent|" + campaign)
        return True
    except Exception:
        if claimed and not sent_any:
            _release_push_delivery(cid, campaign)
        raise

async def send_general(context, cid, key):
    u = row(cid); await context.bot.send_chat_action(cid, "typing"); ev(cid, "button")
    qmap = {"food": "Что мне есть сегодня под мой возраст и самочувствие? Дай конкретные продукты или меню на день.",
            "training": "Какая физическая активность мне сейчас подходит и почему? Дай конкретные варианты."}
    usage = []; q = qmap.get(key, key)
    ans = await think_llm(context, cid, L.general_answer, llm_profile_of(u), u.get("mode"), q, hint=chat_hint(cid), usage=usage)
    _, st = status_of(cid)
    if key == "food":
        ans += "\n\nВ приложении Айвы можно открыть питание и заменить блюдо кнопкой «Заменить»."
        return await send_answer(context, cid, ans, st, q, usage=usage, app_user=u, app_label="Открыть питание")
    if key == "training":
        ans += "\n\nВ приложении Айвы можно смотреть нагрузку рядом с календарём, симптомами и статистикой."
        return await send_answer(context, cid, ans, st, q, usage=usage, app_user=u, app_label="Открыть нагрузку")
    await send_answer(context, cid, ans, st, q, usage=usage)

def cycle_text_analysis(cid):
    import statistics as ST
    from collections import Counter
    u = row(cid); cyc = cycles_of(cid); logs = logs_of(cid)
    if is_male_profile(u):
        parts = ["📊 Анализ самочувствия"]
        cnt = Counter()
        for lg in logs:
            for item in lg.get("symptoms", []):
                cnt[item] += 1
        if cnt:
            top = ", ".join(SYM.get(code, code) for code, _ in cnt.most_common(3))
            parts.append(f"• Чаще всего отмечено: {top}.")
        energy = [lg["energy"] for lg in logs if lg.get("energy")]
        mood = [lg["mood"] for lg in logs if lg.get("mood")]
        if energy:
            parts.append(f"• Средняя энергия по отметкам: {EN.get(round(ST.mean(energy)), '')}.")
        if mood:
            parts.append(f"• Среднее настроение: {MOOD.get(round(ST.mean(mood)), '')}.")
        try:
            recent_workout_count = workouts_count_recent(cid, days=14)
        except Exception as exc:
            log.warning("male wellbeing analysis workouts unavailable for %s: %s", cid, exc)
            recent_workout_count = 0
        if recent_workout_count:
            parts.append(f"• Тренировок за последние 14 дней: {recent_workout_count}.")
        if len(parts) == 1:
            parts.append(
                "Пока мало данных. Отмечай энергию, настроение, питание и "
                "нагрузку — анализ станет точнее."
            )
        parts.append("\nПодробную выписку по самочувствию можно собрать кнопкой ниже.")
        return "\n".join(parts)
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

async def _start_action(context, update, cid, name, text, prompt=None, reply_markup=None):
    """Начать действие, забрав из фразы то, что в ней уже сказано.

    «Поставь сводку на 9:15» содержит ответ на единственный вопрос действия —
    переспрашивать в таком случае глупо. Разбираем текст теми же парсерами, и
    если всё нужное нашлось, сразу выполняем; чего не хватает — спрашиваем.
    """
    action = dialog.get(name)
    known = {}
    for param in action.params:
        try:
            value = param.parse(text or "")
        except Exception:
            value = None
        if value is not None:
            known[param.name] = value
    step = dialog.begin(name, known)
    if isinstance(step, dialog.Done):
        upsert(cid, state=None)
        return await _apply_action(context, update, cid, step)
    upsert(cid, state=step.state)
    message = getattr(update, "message", None) or update.effective_message
    return await message.reply_text(prompt or step.prompt, reply_markup=reply_markup)

async def dispatch_intent(context, update, cid, u, intent, txt="", journal=None, user_generation=None):
    msg = update.message; general = not is_cycle(u); ev(cid, "manual", meta="intent_" + intent)
    turn_generation = _user_generation(cid) if user_generation is None else int(user_generation)
    if intent == "current_date":
        return await msg.reply_text(current_date_text())
    if is_male_profile(u) and intent in {
        "phases", "addcycles", "period_end", "cyclelen", "logperiod",
        "calendar", "period",
    }:
        upsert(cid, state=None)
        ev(cid, "male_mode_block", meta="intent_" + intent)
        return await msg.reply_text(MALE_PROFILE_FUNCTION_TEXT)
    if intent == "analysis":
        return await msg.reply_text(cycle_text_analysis(cid),
            reply_markup=InlineKeyboardMarkup([[B("Собрать выписку PDF", "history")]]))
    if intent == "export":
        return await _start_action(context, update, cid, ACT_EXPORT.name, txt)
    if intent == "energy":
        return await _start_action(
            context, update, cid, ACT_CHECKIN.name, txt,
            prompt="Как сегодня с энергией — мало, средне или много?",
        )
    if intent == "time":
        return await _start_action(
            context, update, cid, ACT_SETTIME.name, txt,
            prompt="Во сколько присылать сводку (МСК)? Выбери или впиши своё время, например 08:00.",
            reply_markup=time_kb(),
        )
    if intent == "checkin":
        log_ensure(cid, dtoday().isoformat())
        return await msg.reply_text("Отметим самочувствие. Какая сегодня энергия?", reply_markup=en_kb("e"))
    if intent == "history":
        return await msg.reply_text(report_prompt(u), reply_markup=HIST_KB)
    if intent == "phases":
        _pu = []
        _pa = None
        try: _pa = await llm_to_thread(cid, "phases", L.answer_question, status_of(cid)[1], "Расскажи кратко про четыре фазы цикла: сколько длится каждая, какие гормоны ведут и как это отражается на самочувствии, питании и нагрузке.", llm_profile_of(row(cid)), None, usage=_pu)
        except Exception: pass
        if _pu: ev(cid, "tokens", sum(_pu), meta="answer", calls=len(_pu), usage=_pu)
        if _pa:
            return await reply_long(msg, L.split_followups(_pa)[0])
        ev(cid, "fallback", meta="static:phases")
        return await msg.reply_text(PHASES_TEXT)
    if intent == "addcycles":
        return await addcycles_entry(context, cid, msg)
    if intent == "profile":
        upsert(cid, state="await_profile_edit")
        return await msg.reply_text("Обновим данные. Напиши через пробел рост (см), вес (кг), возраст. Например 168 60 30.")
    if intent == "period_end":
        result = await log_period_end_action(
            cid, u, txt,
            mutation_key=chat_mutation_key("telegram", getattr(update, "update_id", None)),
            user_generation=turn_generation,
        )
        return await msg.reply_text(result["text"])
    if intent == "cyclelen":
        mnum = re.search(r"\b(1[5-9]|[2-5]\d|60)\b", txt or "")
        if mnum:
            upsert(cid, cycle_len=int(mnum.group(1)), state=None)
            await msg.reply_text(f"Записала длину цикла: {mnum.group(1)} дн.")
            return await push_summary(context, cid)
        upsert(cid, state=dialog.begin(ACT_CYCLE_LEN.name).state)
        return await msg.reply_text("Какая у тебя средняя длина цикла в днях? Обычно 21-35. Напиши число, например 28.")
    if intent == "unlink":
        return await msg.reply_text("Чтобы отключить партнёра, введи команду /unlink")
    if intent == "wipe":
        return await msg.reply_text("Чтобы стереть все свои данные и отключить бота, введи команду /stop")
    if intent == "help":
        return await help_cmd(update, context)
    if intent == "partner":
        return await partner_entry(context, cid, msg)
    if intent == "logperiod":
        result = await log_period_action(
            cid, u, txt, context=context,
            mutation_key=chat_mutation_key("telegram", getattr(update, "update_id", None)),
            user_generation=turn_generation,
        )
        return await msg.reply_text(result["text"])
    if intent == "logjournalbatch":
        await context.bot.send_chat_action(cid, "typing")
        result = await log_journal_batch_action(
            cid, u, journal,
            user_generation=turn_generation,
            mutation_key=chat_mutation_key(
                "telegram", getattr(update, "update_id", None),
            ),
        )
        rows = []
        for record in result.get("records", []):
            record_id = record.get("record_id")
            if record.get("intent") == "logmeal":
                rows.append([B("🗑 Убрать еду", f"mdel:{record_id}")])
            elif record.get("intent") == "logworkout":
                rows.append([B("🗑 Убрать тренировку", f"wdel:{record_id}")])
        wu = webapp_url(u) or AIWA_WEBAPP_URL
        if wu and rows:
            rows.append([InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=wu))])
        return await msg.reply_text(
            result["text"],
            reply_markup=(InlineKeyboardMarkup(rows) if rows else None),
        )
    if intent == "logworkout":
        await context.bot.send_chat_action(cid, "typing")
        generation = turn_generation
        result = await log_workout_action(
            cid, u, txt, user_generation=generation,
            mutation_key=chat_mutation_key("telegram", getattr(update, "update_id", None)),
            preparsed_workout=((journal or {}).get("workout")),
        )
        rows = []
        if result.get("ok") and result.get("record_id"):
            rows.append([B("🗑 Убрать тренировку", f"wdel:{result['record_id']}")])
            wu = campaign_webapp_url(u, tab="train")
            if wu:
                rows.append([InlineKeyboardButton("Открыть нагрузку", web_app=WebAppInfo(url=wu))])
        return await msg.reply_text(result["text"], reply_markup=(InlineKeyboardMarkup(rows) if rows else None))
    if intent == "updateworkout":
        await context.bot.send_chat_action(cid, "typing")
        result = await log_workout_update_action(
            cid, u, txt, (journal or {}).get("target_id"),
            user_generation=turn_generation,
            mutation_key=chat_mutation_key("telegram", getattr(update, "update_id", None)),
            preparsed_workout=((journal or {}).get("workout")),
        )
        rows = []
        if result.get("ok") and result.get("record_id"):
            rows.append([B("🗑 Убрать тренировку", f"wdel:{result['record_id']}")])
            wu = campaign_webapp_url(u, tab="train")
            if wu:
                rows.append([InlineKeyboardButton("Открыть нагрузку", web_app=WebAppInfo(url=wu))])
        return await msg.reply_text(result["text"], reply_markup=(InlineKeyboardMarkup(rows) if rows else None))
    if intent == "training":
        if general: return await send_general(context, cid, "training")
        _, st = status_of(cid); return await send_section(context, cid, st, "training")
    if intent == "logmealbatch":
        await context.bot.send_chat_action(cid, "typing")
        result = await log_food_batch_action(
            cid, u, journal,
            user_generation=turn_generation,
            mutation_key=chat_mutation_key(
                "telegram", getattr(update, "update_id", None),
            ),
        )
        rows = [
            [B("🗑 Убрать из дневника", f"mdel:{record_id}")]
            for record_id in result.get("record_ids", [])
        ]
        wu = campaign_webapp_url(u, tab="food")
        if wu and result.get("record_ids"):
            rows.append([
                InlineKeyboardButton("Открыть дневник", web_app=WebAppInfo(url=wu)),
            ])
        return await msg.reply_text(
            result["text"],
            reply_markup=(InlineKeyboardMarkup(rows) if rows else None),
        )
    if intent == "logmeal":
        await context.bot.send_chat_action(cid, "typing")
        generation = turn_generation
        result = await log_food_action(
            cid, u, txt, user_generation=generation,
            mutation_key=chat_mutation_key("telegram", getattr(update, "update_id", None)),
            preparsed_food_text=((journal or {}).get("food_text")),
            preparsed_slot=((journal or {}).get("slot")),
            preparsed_food_record=((journal or {}).get("food_record")),
        )
        rows = []
        if result.get("ok") and result.get("record_id"):
            rows.append([B("🗑 Убрать из дневника", f"mdel:{result['record_id']}")])
            wu = campaign_webapp_url(u, tab="food")
            if wu:
                rows.append([InlineKeyboardButton("Открыть дневник", web_app=WebAppInfo(url=wu))])
        return await msg.reply_text(result["text"], reply_markup=(InlineKeyboardMarkup(rows) if rows else None))
    if intent == "updatemeal":
        await context.bot.send_chat_action(cid, "typing")
        result = await log_food_update_action(
            cid, u, txt, (journal or {}).get("target_id"),
            user_generation=turn_generation,
            mutation_key=chat_mutation_key("telegram", getattr(update, "update_id", None)),
            preparsed_food_text=((journal or {}).get("food_text")),
            preparsed_food_record=((journal or {}).get("food_record")),
        )
        rows = []
        if result.get("ok") and result.get("record_id"):
            rows.append([B("🗑 Убрать из дневника", f"mdel:{result['record_id']}")])
            wu = campaign_webapp_url(u, tab="food")
            if wu:
                rows.append([InlineKeyboardButton("Открыть дневник", web_app=WebAppInfo(url=wu))])
        return await msg.reply_text(result["text"], reply_markup=(InlineKeyboardMarkup(rows) if rows else None))
    if intent == "movemealslot":
        await context.bot.send_chat_action(cid, "typing")
        result = await move_meal_slot_action(
            cid, (journal or {}).get("target_id"), (journal or {}).get("slot"),
            user_generation=turn_generation,
            mutation_key=chat_mutation_key("telegram", getattr(update, "update_id", None)),
        )
        return await msg.reply_text(result["text"])
    if intent == "appendmealitem":
        await context.bot.send_chat_action(cid, "typing")
        result = await append_meal_item_action(
            cid, u, (journal or {}).get("target_id"), (journal or {}).get("food_text"),
            user_generation=turn_generation,
            mutation_key=chat_mutation_key("telegram", getattr(update, "update_id", None)),
            preparsed_food_record=((journal or {}).get("food_record")),
        )
        return await msg.reply_text(result["text"])
    if intent == "journalreplay":
        result = journal_replay_result(cid, journal)
        return await msg.reply_text(result["text"])
    if intent == "journalunavailable":
        return await msg.reply_text(
            "Сейчас не получилось достаточно быстро и надёжно разобрать изменение дневника, "
            "поэтому я ничего не меняла. Попробуй повторить одной фразой через минуту."
        )
    if intent == "clarifymeal":
        return await msg.reply_text(
            "Не уверена, какую именно запись еды изменить, поэтому ничего не меняла. "
            "Напиши название и новое количество, например: «чипсы — 100 г»."
        )
    if intent == "clarifyworkout":
        return await msg.reply_text(
            "Не уверена, какую именно тренировку изменить, поэтому ничего не меняла. "
            "Напиши её название и исправление, например: «приседания — 3 подхода по 12»."
        )
    if intent == "diary":
        await context.bot.send_chat_action(cid, "typing"); usage = []
        t = await answer_diary(cid, usage); ev(cid, "tokens", sum(usage), meta="diary_reco", calls=len(usage), usage=usage)
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
        upsert(cid, state=dialog.begin(ACT_PERIOD_DATE.name).state)
        return await msg.reply_text("Напиши дату начала последних месячных, например 25.05.2026, или нажми кнопку. Потом даты можно редактировать в приложении.", reply_markup=PERIOD_KB)

async def push_summary(context, cid, with_image=True, campaign=None):
    generation = _user_generation(cid)
    u0 = row(cid)
    if u0 and not is_cycle(u0):
        return await push_general(
            context, cid, with_image=with_image, campaign=campaign,
            user_generation=generation,
        )
    u, st = status_of(cid)
    if not st: return
    if not _user_write_allowed(cid, generation):
        return False
    if st["status"] != "normal":
        return await send_delay(context, cid, st, campaign=campaign)
    claimed = False; sent_any = False
    if campaign:
        claimed = _claim_push_delivery(cid, campaign)
        if not claimed:
            log.info("summary push skipped as duplicate: %s %s", cid, campaign)
            return False
    try:
        usage = []; day = dtoday().isoformat()
        key = _summary_key(cid, u, day, st, None)
        value = _SUM_CACHE.get(key)
        if value is None:
            value = prepared_summary_get(cid, day, key)
        body, facts = _summary_unpack(value)
        if not body and not campaign:
            hint = _summary_hint(cid, u)
            body = await llm_to_thread(
                cid, "daily_summary", L.generate_summary,
                st, u["modules"], hint=hint, usage=usage,
                user_generation=generation,
            )
            if _user_write_allowed(cid, generation=generation):
                facts = await llm_to_thread(
                    cid, "summary_card_facts", L.summary_card_facts,
                    "cycle", st, None, hint, usage,
                    user_generation=generation,
                )
            if body and _user_write_allowed(cid, generation=generation):
                value = _summary_pack(body, facts)
                _prune_day(_SUM_CACHE); _SUM_CACHE[key] = value
                prepared_summary_put(cid, day, key, value, generation=generation)
        if not body:
            body = _delivery_summary_fallback(u, st=st)
            ev(cid, "fallback", meta="static:summary_delivery_cache_miss")
        clean, extra = L.split_followups(body)
        kb = sugg_kb(cid, merge_summary_suggestions(u, st, extra), app_user=u,
                     app_label=APP_BUTTON_TEXT, campaign=campaign)
        _png = (
            await _cycle_card_png(
                cid, u, st, summary=clean, user_generation=generation,
            )
        ) if (with_image and new_cards_on(cid)) else None
        if _png is not None:
            try:
                await send_rich_with_photo(context.bot, cid, guard_aiwa_reply(cid, clean), _png, reply_markup=kb)
            except Exception as _ce:
                log.info("combined card fallback: %s", str(_ce)[:120])
                ev(cid, "fallback", meta="static:combined_send_fail")
                await send_daily_infographic(context.bot, cid, u, facts, st)
                await _send_summary_text(context, cid, clean, kb)
        else:
            if with_image:
                sent_any = await send_daily_infographic(context.bot, cid, u, facts, st)
            await _send_summary_text(context, cid, clean, kb)
        sent_any = True
        if usage: ev(cid, "tokens", sum(usage), meta="summary", calls=len(usage), usage=usage)
        ev(cid, "goal", meta="summary")
        if campaign:
            _complete_push_delivery(cid, campaign)
            ev(cid, "broadcast", meta="sent|" + campaign)
        return True
    except Exception:
        if claimed and not sent_any:
            _release_push_delivery(cid, campaign)
        raise

async def push_checkin(context, cid, campaign=None):
    """После утренней сводки — быстрый чек-ин. Переиспользует существующий поток ci:* (энергия→настроение→симптомы)."""
    claimed = False
    delivered = False
    try:
        u = row(cid)
        if not is_onboarded(u): return
        if campaign:
            claimed = _claim_push_delivery(cid, campaign)
            if not claimed:
                log.info("checkin push skipped as duplicate: %s %s", cid, campaign)
                return False
        log_ensure(cid, dtoday().isoformat())
        await context.bot.send_message(cid,
            "Как ты сегодня? Отметь за 10 секунд — подстрою совет дня под твоё реальное состояние.\n\nКакая энергия?",
            reply_markup=en_kb("e"))
        delivered = True
        if campaign:
            _complete_push_delivery(cid, campaign)
            ev(cid, "broadcast", meta="sent|" + campaign)
        return True
    except Exception as e:
        if claimed and not delivered:
            try: _release_push_delivery(cid, campaign)
            except Exception as release_error: log.warning("checkin claim release %s: %s", cid, release_error)
        if campaign:
            _record_push_failure(cid, campaign, e)
        log.warning("checkin push %s: %s", cid, e)
        return False

# ================= Проактивный движок =================
PROACTIVE_MIN = int(os.environ.get("AIWA_PROACTIVE_MIN", "40"))
def _candidate_mode():
    # candidate/no-poll: кандидат production-раскладки поднимает HTTP, Mini App
    # и health, но не вызывает getUpdates, не запускает cron/broadcast/AI
    # workers и не пишет в Telegram (menu button, команды). Позволяет проверить
    # systemd/Caddy/release layout, пока действующий production ещё поллит.
    return os.environ.get("AIWA_CANDIDATE", "0") in ("1", "true", "True", "yes", "on")

def _proactive_enabled():
    return os.environ.get("AIWA_PROACTIVE", "0") in ("1", "true", "True", "yes", "on")
def _proactive_preference_on(cid):
    """User-level opt-in shared by the new engine and legacy optional jobs."""
    user = row(cid)
    return bool(user and user.get("proactive_enabled", True))
def _proactive_on(cid):
    if not _proactive_enabled():
        return False
    if not _proactive_preference_on(cid):
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
def _pa_seen(cid, key):
    """Return whether a lifetime milestone signal was already processed."""
    try:
        c = db()
        r = c.execute(
            "SELECT 1 FROM proactive_state WHERE chat_id=? AND signal=? LIMIT 1",
            (cid, key),
        ).fetchone()
        c.close()
        return bool(r)
    except Exception:
        return False
def _pa_suppressed(cid, candidate):
    """Apply lifetime semantics to milestones and cooldowns to recurring nudges."""
    if candidate.get("once"):
        return _pa_seen(cid, candidate["key"])
    return _pa_recent(cid, candidate["key"], candidate.get("cooldown", 2))
def _pa_mark(cid, key):
    try:
        c = db()
        if not _user_write_allowed(cid, conn=c):
            c.close(); return False
        c.execute("INSERT OR REPLACE INTO proactive_state(chat_id,signal,last_ts) VALUES(?,?,?)",
                            (cid, key, datetime.now(TZ).isoformat())); c.commit(); c.close()
        return True
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
        c = db()
        if not _user_write_allowed(cid, conn=c):
            c.close(); return False
        c.execute("INSERT INTO proactive_log(chat_id,ts,signal,score,sent,text) VALUES(?,?,?,?,?,?)",
                            (cid, datetime.now(TZ).isoformat(), key, int(score), int(sent), text or "")); c.commit(); c.close()
        return True
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
        if not _user_write_allowed(cid, conn=c):
            c.close(); return False
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
        subject = "нём" if is_male_profile(row(cid)) else "ней"
        return q + f"\n\nЧто ты уже знаешь о {subject} из прошлых разговоров (долгая память) — учитывай, но не перечисляй вслух без надобности: " + mt
    return q

def _ref_touch(cid, src):
    """Первое касание источника перехода (deep-link ?start=<source>)."""
    try:
        c = db()
        if not _user_write_allowed(cid, conn=c):
            c.close(); return False
        c.execute("INSERT OR IGNORE INTO referrals(chat_id, source, ts) VALUES(?,?,?)",
                            (cid, src, datetime.now(TZ).isoformat())); c.commit(); c.close()
        return True
    except Exception as e:
        log.warning("ref_touch: %s", e)

def _proactive_signals(cid, slot="eve"):
    out = []
    try:
        u = row(cid); _, st = status_of(cid); today = dtoday()
        male = is_male_profile(u)
        tlog = log_get(cid, today.isoformat()) or {}
        ylog = log_get(cid, (today - timedelta(days=1)).isoformat()) or {}
        badY = (ylog.get("energy") == 1) or (ylog.get("mood") == 1) or any(x in (ylog.get("symptoms") or []) for x in ("anx", "low", "tired", "irrit"))
        checkedToday = bool(tlog.get("energy") or tlog.get("mood") or (tlog.get("symptoms")))
        if badY and not checkedToday:
            out.append({"key": "felt_bad", "score": 78, "cooldown": 2,
                        "topic": (("вчера ему было тяжело" if male else "вчера ей было тяжело") + " (низкая энергия/настроение или тревожные симптомы) — мягко предложи поддержку"),
                        "data": "вчера энергия=%s, настроение=%s, симптомы=%s" % (ylog.get("energy"), ylog.get("mood"), ",".join(ylog.get("symptoms") or []))})
        if st and st.get("days_to_next") in (2, 3, 4) and (u.get("mode") in (None, "cycle")):
            out.append({"key": "pms_soon", "score": 66, "cooldown": 18,
                        "topic": "через %s дня ожидаются месячные, приближается ПМС — тёплое предупреждение и что поможет" % st.get("days_to_next"),
                        "data": "фаза %s, до месячных %s дн" % (st.get("phase_ru"), st.get("days_to_next"))})
        logs = logs_of(cid, (today - timedelta(days=4)).isoformat()) or []
        lowe = [l for l in logs if l.get("energy") == 1]
        if len(lowe) >= 2:
            out.append({"key": "low_energy", "score": 70, "cooldown": 3,
                        "topic": "несколько дней подряд низкая энергия — поддержи и мягко предложи разгрузку: снизить нагрузку, прогуляться или лечь спать пораньше",
                        "data": "низкая энергия в %s из последних дней" % len(lowe)})
        rw = workouts_recent(cid, days=12, limit=3) or []
        if rw:
            try:
                gap = (today - date.fromisoformat(rw[0].get("d"))).days
            except Exception:
                gap = 99
            if gap >= 5:
                out.append({"key": "no_move", "score": 46, "cooldown": 4,
                            "topic": (
                                "давно не было тренировки (%s дн) — мягко пригласи "
                                "подвигаться с учётом восстановления" % gap
                                if male else
                                "давно не было тренировки (%s дн) — мягко пригласи подвигаться под её фазу" % gap
                            ),
                            "data": (
                                "последняя тренировка %s дней назад" % gap
                                if male else
                                "последняя тренировка %s дней назад, фаза %s" % (gap, (st or {}).get("phase_ru"))
                            )})
        try:
            streak = streak_of(cid)
        except Exception:
            streak = 0
        if streak in (3, 7, 14, 30):
            out.append({"key": "streak_%s" % streak, "score": 56, "once": True,
                        "topic": "коротко и по-взрослому отметь, что %s %s дней подряд ведёт отметки, и спокойно предложи продолжить — без слащавости, без фраз вроде порадуй себя" % (
                            "он" if male else "она", streak,
                        ),
                        "data": "стрик %s дней" % streak})
        if slot == "eve":
            try:
                dp = diary_payload(cid); tot = dp.get("totals") or {}; tgt = dp.get("target") or {}
                # пустой дневник — не повод для пуша «нет белка»: нечего дополнять
                if dp.get("meals") and tgt.get("protein") and (tot.get("protein") is not None) and tot["protein"] < 0.5 * tgt["protein"]:
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
    cands = [
        c for c in _proactive_signals(cid, slot)
        if not _pa_suppressed(cid, c)
    ]
    cands = [c for c in cands if c["score"] >= PROACTIVE_MIN]
    if not cands:
        return None
    best = max(cands, key=lambda x: x["score"])
    _u = []
    text = await llm_to_thread(
        cid, "proactive_message", L.proactive_compose,
        best["topic"], best.get("data", ""), u.get("mode"), _u,
    )
    if _u:
        ev(cid, "tokens", sum(_u), meta="proactive_compose", calls=len(_u), usage=_u)
    text = guard_aiwa_reply(cid, (text or "").strip())
    if not text:
        return None
    if shadow:
        # Shadow evaluation must not consume a lifetime milestone before the
        # user has actually received it. Recurring cooldown signals keep the
        # old marking behaviour so shadow runs stay bounded.
        if not best.get("once"):
            _pa_mark(cid, best["key"])
        _pa_logrow(cid, best["key"], best["score"], 0, text)
        ev(cid, "proactive", meta="shadow:" + best["key"])
    else:
        _campaign = campaign_id("proactive_" + best["key"])
        wu = campaign_webapp_url(u, _campaign, _PA_TAB.get(best["key"]))
        rows = []
        _act = _PA_ACTION.get(best["key"])
        if _act:
            rows.append([InlineKeyboardButton(_act[0], callback_data=f"pado:{_campaign}:{_act[1]}")])
        if wu:
            rows.append([InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=wu))])
        kb = InlineKeyboardMarkup(rows) if rows else None
        await context.bot.send_message(cid, text, reply_markup=kb)
        _pa_mark(cid, best["key"]); _pa_logrow(cid, best["key"], best["score"], 1, text)
        ev(cid, "broadcast", meta="sent|" + _campaign)
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
        except Forbidden as exc:
            _record_push_failure(cid, campaign_id("proactive"), exc)
        except Exception as e:
            _record_push_failure(cid, campaign_id("proactive"), e)
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
                    text = await llm_to_thread(
                        cid, "proactive_message", L.proactive_compose,
                        best["topic"], best.get("data", ""), u.get("mode"), _u,
                    )
                    text = guard_aiwa_reply(cid, text)
                except Exception:
                    text = ""
                composed += 1
                if _u: ev(cid, "tokens", sum(_u), meta="proactive_preview", calls=len(_u), usage=_u)
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

def _remove_daily_jobs(app, cid):
    for name in (str(cid), f"prepare:{cid}"):
        for job in app.job_queue.get_jobs_by_name(name):
            job.schedule_removal()

def schedule_daily(app, cid, hhmm, enabled=None):
    _remove_daily_jobs(app, cid)
    user = row(cid)
    summary_enabled = (
        bool(user.get("daily_summary_enabled", True))
        if enabled is None else bool(enabled)
    )
    if not user or not summary_enabled:
        return
    actual, _, _ = scheduled_hhmm(cid, hhmm)
    prepare_at = summary_prepare_hhmm(cid, actual)
    ph, pm = map(int, prepare_at.split(":"))
    h, m = map(int, actual.split(":"))
    app.job_queue.run_daily(
        summary_prepare_job,
        time=dtime(ph, pm, tzinfo=TZ),
        chat_id=cid,
        name=f"prepare:{cid}",
        data={"delivery_hhmm": actual},
    )
    app.job_queue.run_daily(daily_job, time=dtime(h, m, tzinfo=TZ), chat_id=cid, name=str(cid))

def set_daily_time(app, cid, hhmm):
    """An explicit delivery-time choice also explicitly enables summaries."""
    upsert(
        cid,
        send_time=hhmm,
        daily_summary_enabled=1,
        state=None,
    )
    schedule_daily(app, cid, hhmm)

def _act_settime(cid, values):
    hhmm = values["hhmm"]
    set_daily_time(BOT_APP, cid, hhmm)
    return {"ok": True, "time": hhmm, "text": schedule_text(cid, hhmm)}

def _act_period_date(cid, values):
    if is_male_profile(row(cid)):
        return {"ok": False, "error": "unavailable", "note": "недоступно для этого профиля"}
    iso = values["iso"]
    if not db_mark_period(cid, iso):
        return {"ok": False, "error": "not_saved"}
    schedule_daily(BOT_APP, cid, (row(cid) or {}).get("send_time") or "08:00")
    return {"ok": True, "date": iso,
            "text": f"Отметила начало месячных: {date.fromisoformat(iso).strftime('%d.%m.%Y')}."}

def _act_cycle_len(cid, values):
    if is_male_profile(row(cid)):
        return {"ok": False, "error": "unavailable", "note": "недоступно для этого профиля"}
    days = int(values["days"])
    upsert(cid, cycle_len=days)
    return {"ok": True, "cycle_len": days, "text": f"Записала длину цикла: {days} дн."}

# Один обработчик на действие — им пользуются и меню, и чат. Пока их два, но
# именно это и разъезжалось: возможность жила на одной поверхности и не
# существовала на другой.
def _act_checkin(cid, values):
    day = dtoday().isoformat()
    if not log_set(cid, day, energy=int(values["energy"])):
        return {"ok": False, "error": "not_saved"}
    _evict_today_cache(cid)
    words = {1: "мало", 2: "средне", 3: "много"}
    return {"ok": True, "date": day, "energy": int(values["energy"]),
            "text": f"Отметила энергию на сегодня: {words[int(values['energy'])]}."}

def _act_meal_delete(cid, values):
    """Удаление приёма из чата.

    Мини-апп это умеет через /api/diary_del, а чат — нет: возможность жила на
    одной поверхности. Здесь тот же удаляющий путь, только запись ищется по
    названию, потому что в разговоре пользователь идентификатором не оперирует.
    """
    hint = FA.correct_typos(values["title"]).casefold()
    day = dtoday().isoformat()
    c = db()
    try:
        rows = c.execute(
            "SELECT id,title FROM meals WHERE chat_id=? AND d=? ORDER BY id DESC",
            (cid, day),
        ).fetchall()
    finally:
        c.close()
    hits = [r for r in rows if hint in str(r[1] or "").casefold()]
    if not hits:
        return {"ok": False, "error": "not_found",
                "note": f"За сегодня не нашла приём «{values['title']}»."}
    if len(hits) > 1:
        names = ", ".join(f"«{r[1]}»" for r in hits[:4])
        return {"ok": False, "error": "ambiguous",
                "note": f"Под это описание подходит несколько записей: {names}. Уточни название."}
    meal_id, title = hits[0][0], hits[0][1]
    mutation, error, _status = _delete_diary_meal_atomic(
        cid, meal_id, None, _user_generation(cid), _diary_target_snapshot(cid),
    )
    if error:
        return {"ok": False, "error": "not_deleted", "note": "Не получилось удалить запись."}
    _evict_week_food_cache(cid)
    return {"ok": True, "title": title, "text": f"Удалила «{title}» из сегодняшнего дневника."}

def _export_document(cid):
    """Собрать выгрузку. SQL живёт здесь, формат — в portability."""
    c = db()
    try:
        def rows(sql, fields):
            return [dict(zip(fields, r)) for r in c.execute(sql, (cid,)).fetchall()]
        sections = {
            "cycles": rows("SELECT start_date,end_date FROM cycles WHERE chat_id=? ORDER BY start_date",
                           ("start_date", "end_date")),
            "meals": rows("SELECT d,ts,title,kcal,protein,fat,carbs,grams,items,source,slot,fclass "
                          "FROM meals WHERE chat_id=? ORDER BY d,ts",
                          ("d", "ts", "title", "kcal", "protein", "fat", "carbs", "grams",
                           "items", "source", "slot", "fclass")),
            "workouts": rows("SELECT d,ts,type,items,duration,rpe,note FROM workouts WHERE chat_id=? ORDER BY d,ts",
                             ("d", "ts", "type", "items", "duration", "rpe", "note")),
            "logs": rows("SELECT log_date,energy,mood,symptoms FROM logs WHERE chat_id=? ORDER BY log_date",
                         ("log_date", "energy", "mood", "symptoms")),
            "intimacy": rows("SELECT d FROM intimacy WHERE chat_id=? ORDER BY d", ("d",)),
            "memory": rows("SELECT mkey,mval,updated FROM memory WHERE chat_id=? ORDER BY mkey",
                           ("mkey", "mval", "updated")),
        }
    finally:
        c.close()
    return portability.dump(row(cid) or {}, sections,
                            exported_at=datetime.now(TZ).isoformat(timespec="seconds"))

async def _send_export_job(context):
    cid = context.job.chat_id
    document = context.job.data["document"]
    payload = portability.to_json(document).encode("utf-8")
    bio = io.BytesIO(payload); bio.name = "aiwa-export.json"
    await context.bot.send_document(
        cid, document=bio, filename="aiwa-export.json",
        caption="Твои записи одним файлом. Его же можно прислать обратно, чтобы восстановить историю.",
    )

def _act_export_data(cid, values):
    document = _export_document(cid)
    BOT_APP.job_queue.run_once(
        _send_export_job, 0, chat_id=cid, name=f"export:{cid}:{secrets.token_hex(4)}",
        data={"document": document},
    )
    return {"ok": True, "text": "Собрала выгрузку: " + portability.summary(document)
                                + ". Файл придёт следующим сообщением."}

def _act_voice_mode(cid, values):
    choice = values["choice"]
    upsert(cid, voice_reply=choice)
    if choice == "voice" and not _voice_reply_default():
        return {"ok": True, "voice_reply": choice,
                "text": "Записала: отвечать голосом. Пока голосовые ответы отключены на стороне сервиса — "
                        "как включим, заработает без дополнительных настроек."}
    return {"ok": True, "voice_reply": choice,
            "text": "Буду отвечать голосом." if choice == "voice" else "Буду отвечать текстом."}

_ACTION_HANDLERS = {
    ACT_VOICE_MODE.name: _act_voice_mode,
    ACT_CHECKIN.name: _act_checkin,
    ACT_MEAL_DELETE.name: _act_meal_delete,
    ACT_EXPORT.name: _act_export_data,
    ACT_SETTIME.name: _act_settime,
    ACT_PERIOD_DATE.name: _act_period_date,
    ACT_CYCLE_LEN.name: _act_cycle_len,
}

def _registry_chat_tools():
    """Спецификация инструментов чата — из реестра, а не отдельным списком."""
    tools = []
    for action in dialog.actions("chat"):
        handler = _ACTION_HANDLERS.get(action.name)
        if handler is None:
            continue
        tools.append({"type": "function", "function": {
            "name": action.name,
            "description": (action.description or action.title)
                           + " Вызывай, только если пользователь прямо просит это изменить.",
            "parameters": {
                "type": "object",
                "properties": {
                    param.name: {"type": "string", "description": param.prompt}
                    for param in action.params
                },
                "required": [param.name for param in action.params],
            },
        }})
    return tools

def _dialog_hint(state):
    """Текущий вопрос действия из реестра — чтобы вернуться к нему после ответа."""
    parsed = dialog.parse_state(state)
    if not parsed:
        return None
    name, index, _, _ = parsed
    action = dialog.get(name)
    if not action or index >= len(action.params):
        return None
    return action.params[index].prompt

async def _apply_action(context, update, cid, done):
    """Единственное место, где действие реестра встречается с эффектом.

    Сбор параметров и проверка ввода уже позади — сюда приходит готовый
    словарь значений. Новое действие добавляется одной веткой здесь и одним
    объявлением в реестре, а не тремя реализациями на трёх поверхностях.
    """
    handler = _ACTION_HANDLERS.get(done.action)
    if handler is None:
        # Действие зарегистрировано, но обработчика нет — это ошибка сборки, а
        # не пользователя: не молчим ни ему, ни в лог.
        log.error("действие без обработчика: %s", done.action)
        return await update.message.reply_text(
            "Не смогла выполнить действие. Напиши ещё раз, пожалуйста."
        )
    result = handler(cid, done.values)
    if not result.get("ok"):
        return await update.message.reply_text(
            result.get("note") or "Не получилось сохранить. Попробуй ещё раз."
        )
    await update.message.reply_text(result["text"])
    # Сводку после изменений цикла показываем сразу — так было и раньше.
    if done.action in {ACT_PERIOD_DATE.name, ACT_CYCLE_LEN.name}:
        return await push_summary(context, cid)
    return None

def _save_period_start_atomic(cid, iso, user_generation=None, protect_modes=False, enforce_spacing=False,
                              mutation_key=None, args_hash=None):
    """Одна транзакция для cycles + users, включая проверку lifecycle и текущего режима."""
    event_date = date.fromisoformat(iso)
    c = db(); c.execute("BEGIN IMMEDIATE")
    if not _user_write_allowed(cid, user_generation, conn=c):
        c.close(); return {"status": "stale"}
    if mutation_key:
        prior = c.execute(
            "SELECT kind,record_id,args_hash,result_json FROM chat_mutations WHERE chat_id=? AND mutation_key=?",
            (cid, mutation_key),
        ).fetchone()
        if prior:
            c.commit(); c.close()
            status = "mismatch" if prior[0] != "period_start" or (prior[2] or "") != (args_hash or "") else "duplicate"
            try: saved_data = json.loads(prior[3] or "{}")
            except (TypeError, ValueError): saved_data = {}
            return {"status": status, "date": saved_data.get("date") or prior[1]}
    user = c.execute("SELECT cycle_len,mode FROM users WHERE chat_id=?", (cid,)).fetchone()
    if not user:
        c.close(); return {"status": "stale"}
    mode = user[1] or "cycle"
    if protect_modes and mode in ("preg", "meno", "male"):
        c.commit(); c.close(); return {"status": "protected", "mode": mode}
    starts = [x[0] for x in c.execute(
        "SELECT start_date FROM cycles WHERE chat_id=? ORDER BY start_date", (cid,)
    ).fetchall()]
    if iso in starts:
        if mutation_key:
            c.execute(
                """INSERT INTO chat_mutations
                   (chat_id,mutation_key,generation,kind,record_id,args_hash,result_json,created_at)
                   VALUES(?,?,?,?,?,?,?,?)""",
                (cid, mutation_key, int(user_generation), "period_start", iso, args_hash or "",
                 json.dumps({"date": iso}), datetime.now(TZ).isoformat()),
            )
        c.commit(); c.close(); return {"status": "duplicate", "date": iso}
    if enforce_spacing:
        close = [x for x in starts if 0 < abs((event_date - date.fromisoformat(x)).days) <= 10]
        if close:
            c.commit(); c.close(); return {"status": "conflict", "date": max(close)}
    c.execute("INSERT INTO cycles(chat_id,start_date) VALUES(?,?)", (cid, iso))
    latest = max(starts + [iso])
    if latest == iso:
        c.execute(
            """UPDATE users SET last_period=?,cycle_len=?,mode='cycle',state=NULL,
               period_end=NULL,period_len=NULL WHERE chat_id=?""",
            (latest, user[0] or 28, cid),
        )
    else:
        c.execute(
            "UPDATE users SET last_period=?,cycle_len=?,mode='cycle',state=NULL WHERE chat_id=?",
            (latest, user[0] or 28, cid),
        )
    if mutation_key:
        c.execute(
            """INSERT INTO chat_mutations
               (chat_id,mutation_key,generation,kind,record_id,args_hash,result_json,created_at)
               VALUES(?,?,?,?,?,?,?,?)""",
            (cid, mutation_key, int(user_generation), "period_start", iso, args_hash or "",
             json.dumps({"date": iso}), datetime.now(TZ).isoformat()),
        )
    c.commit(); c.close()
    return {"status": "created", "date": iso}

def _save_period_end_atomic(cid, end_iso, user_generation=None, mutation_key=None, args_hash=None):
    event_date = date.fromisoformat(end_iso)
    c = db(); c.execute("BEGIN IMMEDIATE")
    if not _user_write_allowed(cid, user_generation, conn=c):
        c.close(); return {"status": "stale"}
    if mutation_key:
        prior = c.execute(
            "SELECT kind,record_id,args_hash,result_json FROM chat_mutations WHERE chat_id=? AND mutation_key=?",
            (cid, mutation_key),
        ).fetchone()
        if prior:
            c.commit(); c.close()
            status = "mismatch" if prior[0] != "period_end" or (prior[2] or "") != (args_hash or "") else "duplicate"
            try: saved_data = json.loads(prior[3] or "{}")
            except (TypeError, ValueError): saved_data = {}
            return dict(saved_data, status=status)
    user = c.execute("SELECT last_period,mode FROM users WHERE chat_id=?", (cid,)).fetchone()
    if not user:
        c.commit(); c.close(); return {"status": "missing"}
    if (user[1] or "cycle") == "male":
        c.commit(); c.close(); return {"status": "protected", "mode": "male"}
    if (user[1] or "cycle") in ("irregular", "none", "meno", "preg") or not user[0]:
        c.commit(); c.close(); return {"status": "missing"}
    start_iso = user[0]
    length = (event_date - date.fromisoformat(start_iso)).days + 1
    if not 1 <= length <= 10:
        c.commit(); c.close(); return {"status": "invalid"}
    c.execute("UPDATE cycles SET end_date=? WHERE chat_id=? AND start_date=?", (end_iso, cid, start_iso))
    c.execute("UPDATE users SET period_end=?,period_len=? WHERE chat_id=?", (end_iso, length, cid))
    if mutation_key:
        result = {"start": start_iso, "end": end_iso, "length": length}
        c.execute(
            """INSERT INTO chat_mutations
               (chat_id,mutation_key,generation,kind,record_id,args_hash,result_json,created_at)
               VALUES(?,?,?,?,?,?,?,?)""",
            (cid, mutation_key, int(user_generation), "period_end", end_iso, args_hash or "",
             json.dumps(result), datetime.now(TZ).isoformat()),
        )
    c.commit(); c.close()
    return {"status": "saved", "start": start_iso, "end": end_iso, "length": length}

def db_mark_period(cid, iso, user_generation=None):
    """Записывает старт месячных атомарно. Без планировщика, безопасно из веб-обработчика."""
    return _save_period_start_atomic(
        cid, iso, user_generation=user_generation, protect_modes=True,
    ).get("status") in (
        "created", "duplicate",
    )
def mark_period(context, cid, iso, user_generation=None):
    if not db_mark_period(cid, iso, user_generation=user_generation):
        return False
    if user_generation is not None and not _user_write_allowed(cid, user_generation):
        return False
    schedule_daily(context.application, cid, row(cid)["send_time"] or "08:00")
    return True
async def think_llm(context, cid, fn, *args, **kwargs):
    """Выполняет тяжёлый вызов модели в фоне и держит индикатор «печатает» живым."""
    request_id = kwargs.pop("_request_id", None) or ("r_" + secrets.token_hex(16))
    purpose = kwargs.pop("_purpose", None) or getattr(fn, "__name__", "llm_call").lstrip("_")
    def run():
        with L.call_context(user_key=A2.user_key(cid), request_id=request_id, purpose=purpose):
            return fn(*args, **kwargs)
    task = asyncio.create_task(asyncio.to_thread(run))
    while not task.done():
        try: await context.bot.send_chat_action(cid, "typing")
        except Exception: pass
        await asyncio.wait({task}, timeout=4)
    return task.result()

class _BCtx:
    def __init__(self, app): self.bot = app.bot; self.application = app

async def summary_prepare_job(context: ContextTypes.DEFAULT_TYPE):
    cid = context.job.chat_id
    if not (row(cid) or {}).get("daily_summary_enabled", True):
        _remove_daily_jobs(context.application, cid)
        return
    try:
        actual = ((context.job.data or {}).get("delivery_hhmm")
                  if getattr(context.job, "data", None) is not None else None)
        target = dtoday()
        if actual:
            ah, am = map(int, actual.split(":"))
            prepare_at = summary_prepare_hhmm(cid, actual)
            ph, pm = map(int, prepare_at.split(":"))
            if ph * 60 + pm > ah * 60 + am:
                target += timedelta(days=1)
        await prepare_daily_summary(cid, target.isoformat())
    except Exception as exc:
        # Delivery still runs at the selected time and can generate on demand or
        # fall back, so preparation failure must never cancel the send job.
        log.warning("summary prepare %s: %s", cid, exc)

async def daily_job(context: ContextTypes.DEFAULT_TYPE):
    cid = context.job.chat_id
    user = row(cid) or {}
    if not user.get("daily_summary_enabled", True) or user.get("push_suppressed_at"):
        _remove_daily_jobs(context.application, cid)
        return
    if BCAST_Q is not None:
        return await enqueue_broadcast(cid)    # в очередь, обработает воркер с паузами
    try:
        sent = await push_summary(context, cid, campaign=campaign_id("daily_summary"))
        if sent:
            await push_partner(context, cid)
        await push_checkin(context, cid, campaign=campaign_id("daily_checkin"))
    except Forbidden as exc:
        _record_push_failure(cid, campaign_id("daily_summary"), exc)
        try:
            _remove_daily_jobs(context.application, cid)
        except Exception: pass
    except Exception as e:
        _record_push_failure(cid, campaign_id("daily_summary"), e)
        raise

async def broadcast_worker(app):
    """Один из нескольких параллельных воркеров рассылки. Реальный лимит GigaChat держит семафор в llm._call, поэтому большая пауза не нужна."""
    delay = float(os.environ.get("AIWA_BROADCAST_DELAY", "0.05"))
    while True:
        cid = await BCAST_Q.get()
        try:
            ctx = _BCtx(app)
            sent = await push_summary(ctx, cid, campaign=campaign_id("daily_summary"))
            if sent:
                await push_partner(ctx, cid)
            await push_checkin(ctx, cid, campaign=campaign_id("daily_checkin"))
        except Forbidden as exc:
            try:
                _record_push_failure(cid, campaign_id("daily_summary"), exc)
                _remove_daily_jobs(app, cid)
            except Exception: pass
            log.info("broadcast %s: заблокирован пользователем, снял с рассылки", cid)
        except Exception as e:
            try: _record_push_failure(cid, campaign_id("daily_summary"), e)
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
    male = (row(cid) or {}).get("mode") == "male"
    base = (
        "🏋️ Ещё не отметил тренировку сегодня? Даже 20 минут считается. "
        "Отметь — Айва разберёт нагрузку и подскажет следующую."
        if male else
        "🏋️ Ещё не отмечала тренировку сегодня? Даже 20 минут считается. "
        "Отметь — Айва разберёт нагрузку и подскажет следующую."
    )
    tip = {"menstrual": "Сейчас менструация — подойдёт лёгкое: ходьба, растяжка, мягкая йога.",
           "follicular": "Фолликулярная фаза — хорошее окно для силовой или интенсива.",
           "ovulation": "Овуляция — сил много, но береги связки.",
           "luteal": "Лютеиновая фаза — спокойное кардио или зона 2, без рекордов."}.get(_phase_of(cid))
    return base + (("\n\n" + tip) if tip else "")

async def push_food_reminder(context, cid):
    u = row(cid)
    if not is_onboarded(u) or not _proactive_preference_on(cid): return
    if meals_of(cid, dtoday().isoformat()): return   # уже отметила еду сегодня — не дёргаем
    campaign = campaign_id("food_reminder")
    wu = campaign_webapp_url(u, campaign, "food")
    kb = InlineKeyboardMarkup([[InlineKeyboardButton("🍎 Отметить еду", web_app=WebAppInfo(url=wu))]]) if wu else None
    await context.bot.send_message(cid, food_reminder_text(cid), reply_markup=kb)
    ev(cid, "broadcast", meta="sent|" + campaign)

async def push_train_reminder(context, cid):
    u = row(cid)
    if not is_onboarded(u) or not _proactive_preference_on(cid): return
    if workouts_of(cid, dtoday().isoformat()): return   # уже отметила тренировку — не дёргаем
    campaign = campaign_id("train_reminder")
    wu = campaign_webapp_url(u, campaign, "train")
    kb = InlineKeyboardMarkup([[InlineKeyboardButton("🏋️ Отметить тренировку", web_app=WebAppInfo(url=wu))]]) if wu else None
    await context.bot.send_message(cid, train_reminder_text(cid), reply_markup=kb)
    ev(cid, "broadcast", meta="sent|" + campaign)

async def train_worker(app):
    delay = float(os.environ.get("AIWA_TRAIN_DELAY", "0.3"))
    while True:
        cid = await TRAIN_Q.get()
        try:
            await push_train_reminder(_BCtx(app), cid)
        except Forbidden as exc:
            _record_push_failure(cid, campaign_id("train_reminder"), exc)
            log.info("train reminder %s: заблокирован", cid)
        except Exception as e:
            _record_push_failure(cid, campaign_id("train_reminder"), e)
            log.warning("train reminder %s: %s", cid, e)
        finally:
            TRAIN_PENDING.discard(cid)
            TRAIN_Q.task_done()
        await asyncio.sleep(delay)

async def train_reminder_job(context: ContextTypes.DEFAULT_TYPE):
    if TRAIN_Q is None: return
    n = 0
    for cid in all_users():
        if cid in TRAIN_PENDING or not _proactive_preference_on(cid): continue
        TRAIN_PENDING.add(cid); await TRAIN_Q.put(cid); n += 1
    log.info("train reminder queued: %d", n)

def streak_of(cid):
    """Дней подряд с активностью (еда, тренировка или чек-ин), заканчивая сегодня или вчера."""
    c = db(); days = set()
    for tbl in ("meals", "workouts"):
        for (d,) in c.execute(f"SELECT DISTINCT d FROM {tbl} WHERE chat_id=?", (cid,)):  # nosec B608
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
            if (not is_onboarded(u) or not _proactive_preference_on(cid)
                    or (u.get("mode") or "cycle") != "cycle"):
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
            campaign = campaign_id("phase_" + phase)
            wu = campaign_webapp_url(u, campaign)
            kb = InlineKeyboardMarkup([[InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=wu))]]) if wu else None
            await context.bot.send_message(cid, txt, reply_markup=kb)
            ev(cid, "broadcast", meta="sent|" + campaign); sent += 1
            await asyncio.sleep(delay)
        except Forbidden as exc:
            _record_push_failure(cid, campaign_id("phase_transition"), exc)
        except Exception as e:
            _record_push_failure(cid, campaign_id("phase_transition"), e)
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
            if not is_onboarded(u) or not _proactive_preference_on(cid):
                continue
            c = db()
            old_last = c.execute(
                """SELECT MAX(ts) FROM events
                   WHERE chat_id=? AND action IN
                     ('manual','button','suggest','command','answered','voice','goal')""",
                (cid,),
            ).fetchone()[0]
            v2_last = c.execute(
                """SELECT MAX(occurred_at) FROM events_v2
                   WHERE user_key=? AND event_name IN (
                     'legacy_message_interaction','screen_viewed','app_opened',
                     'assistant_response_received','user_message_sent',
                     'summary_delivered','meal_add_completed','workout_add_completed',
                     'checkin_completed','checkin_updated'
                   )""",
                (A2.user_key(cid),),
            ).fetchone()[0]
            c.close()
            timestamps = []
            for value, default_tz in ((old_last, TZ), (v2_last, timezone.utc)):
                if not value:
                    continue
                parsed = datetime.fromisoformat(value)
                if parsed.tzinfo is None:
                    parsed = parsed.replace(tzinfo=default_tz)
                timestamps.append(parsed.astimezone(timezone.utc))
            if not timestamps:
                continue
            last = max(timestamps).astimezone(TZ).date()
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
            campaign = campaign_id("reactivation")
            wu = campaign_webapp_url(u, campaign)
            kb = InlineKeyboardMarkup([[InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=wu))]]) if wu else None
            txt = "🌸 Давно не виделись. " + (tip + " " if tip else "") + "Загляни — я собрала твою сводку и рекомендации на сегодня."
            await context.bot.send_message(cid, txt, reply_markup=kb)
            ev(cid, "broadcast", meta="sent|" + campaign); sent += 1
            await asyncio.sleep(delay)
        except Forbidden as exc:
            _record_push_failure(cid, campaign_id("reactivation"), exc)
        except Exception as e:
            _record_push_failure(cid, campaign_id("reactivation"), e)
            log.warning("reactivation %s: %s", cid, e)
    log.info("reactivation pushes: %d", sent)

async def food_worker(app):
    delay = float(os.environ.get("AIWA_FOOD_DELAY", "0.3"))
    while True:
        cid = await FOOD_Q.get()
        try:
            await push_food_reminder(_BCtx(app), cid)
        except Forbidden as exc:
            _record_push_failure(cid, campaign_id("food_reminder"), exc)
            log.info("food reminder %s: заблокирован", cid)
        except Exception as e:
            _record_push_failure(cid, campaign_id("food_reminder"), e)
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
        if cid in FOOD_PENDING or not _proactive_preference_on(cid): continue
        FOOD_PENDING.add(cid); await FOOD_Q.put(cid); n += 1
    log.info("food reminder queued: %d", n)

def finish_onboarding(context, cid, last_period_iso, n):
    # Switch into cycle mode only after both onboarding inputs are valid.
    # Until then an existing male profile must remain isolated from cycle state.
    upsert(
        cid,
        mode="cycle",
        last_period=last_period_iso,
        cycle_len=n,
        period_end=None,
        period_len=None,
        state=None,
        pending_date=None,
    )
    _invalidate_mode_dependent_state(cid)
    cyc_add(cid, last_period_iso); schedule_daily(context.application, cid, row(cid)["send_time"] or "08:00")

async def welcome_finish(context, cid, msg):
    u = row(cid)
    male = (u.get("mode") == "male")
    ev(cid, "onboarding_completed", meta=(u.get("mode") or "cycle"))
    text = ("Готово. " + schedule_text(cid, "08:00") +
            ("" if male else "\n\nИсторию прошлых циклов можно добавить позже командой /addcycles.") +
            "\n\nКалендарь, питание и тренировки — в приложении по кнопке ниже. "
            "А здесь, в чате, задай любой вопрос или опиши блюдо или тренировку — текстом или голосом, разберу и запишу. "
            + ("Например: «яичница и кофе на завтрак» или «пожал 60 кг, запиши тренировку»." if male
               else "Например: «овсянка с ягодами на завтрак» или «пробежала 5 км, запиши»."))
    kb_rows = []
    if AIWA_WEBAPP_URL:
        kb_rows.append([InlineKeyboardButton(APP_BUTTON_TEXT, web_app=WebAppInfo(url=webapp_url(u) or AIWA_WEBAPP_URL))])
    await msg.reply_text(text, reply_markup=InlineKeyboardMarkup(kb_rows) if kb_rows else None)
    # Первая сводка — сразу после настройки, но не дублируем при повторном
    # прохождении онбординга в тот же день.
    if not summary_sent_today(cid):
        await push_summary(context, cid)

async def send_report(context, cid, period):
    u = row(cid)
    if not is_onboarded(u):
        await context.bot.send_message(cid, "Сначала пройди настройку: /start.")
        return {"ok": False, "delivered": False, "error": "onboard"}
    if not RPT:
        await context.bot.send_message(cid, "Выписка временно недоступна.")
        return {"ok": False, "delivered": False, "error": "unavailable"}
    _, st = status_of(cid)
    await context.bot.send_chat_action(cid, "upload_document")
    since, label = RPT.period_since(period)
    male = u.get("mode") == "male"
    cycles = [] if male else cycles_of(cid, since)
    logs = logs_of(cid, since)
    if st and u.get("last_period") and u["last_period"] not in cycles:
        cycles = sorted(set(cycles + [u["last_period"]]))
    try:
        pdf = RPT.build_report({"cycles": cycles, "logs": logs, "st": st, "cycle_len": (u.get("cycle_len") or 28),
                                "period_label": label, "profile": profile_of(u), "mode": u.get("mode")})
        bio = io.BytesIO(pdf); bio.name = "AIWA_vypiska.pdf"
        await context.bot.send_document(cid, document=bio, filename="AIWA_vypiska.pdf",
            caption=report_caption(u, label))
        ev(cid, "goal", meta="report")
        return {"ok": True, "delivered": True}
    except Exception as e:
        log.warning("report: %s", e)
        ev(cid, "error", meta="report_delivery")
        try:
            await context.bot.send_message(cid, "Не удалось собрать выписку, попробуй позже.")
        except Exception as notify_exc:
            log.warning("report failure notice: %s", notify_exc)
        return {"ok": False, "delivered": False, "error": "delivery_failed"}

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

def _fruit_label(week):
    """Человеческая строка для карточки: «маковое зёрнышко (~2 мм)», а не сырой кортеж."""
    try:
        f = preg_fruit(week)
        name, size = str(f[0]), (str(f[1]) if len(f) > 1 else "")
        return f"{name} ({size})" if size and any(ch.isdigit() for ch in size) else name
    except Exception:
        return None

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
    if is_male_profile(u):
        log_today = log_get(woman_cid, dtoday().isoformat()) or {}
        details = []
        if log_today.get("energy"):
            details.append("энергия: " + EN.get(log_today["energy"], "не отмечена"))
        if log_today.get("mood"):
            details.append("настроение: " + MOOD.get(log_today["mood"], "не отмечено"))
        if hint:
            details.append("последняя отметка: " + hint)
        facts = "; ".join(details) if details else "сегодняшних отметок пока нет"
        text = (
            "💛 Сводка поддержки Айвы\n\n"
            f"• {facts}.\n"
            "• Можно спросить, нужна ли помощь с едой, отдыхом или планом "
            "нагрузки, без давления и непрошеных советов."
        )
        try:
            await context.bot.send_message(pid, text)
        except Exception as exc:
            log.warning("partner male push: %s", exc)
        return
    if u and u.get("mode") == "preg" and u.get("last_period"):
        try:
            _preg = C.preg_status(u["last_period"]); _pu = []
            text = None
            try: text = await llm_to_thread(woman_cid, "partner_brief", L.partner_preg_brief, _preg, hint, _pu)
            except Exception as e: log.warning("partner_preg_brief: %s", e)
            if _pu: ev(woman_cid, "tokens", sum(_pu), meta="partner_brief", calls=len(_pu))
            if not text: text = partner_preg_text(_preg, hint)
            try:
                await send_rich(context.bot, pid, text)
            except Exception:
                await context.bot.send_message(pid, tg_rich(text), parse_mode="HTML")
            return
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
    try: text = await llm_to_thread(woman_cid, "partner_brief", L.partner_brief, st, hint, _pu)
    except Exception as e: log.warning("partner_brief: %s", e)
    if _pu: ev(woman_cid, "tokens", sum(_pu), meta="partner_brief", calls=len(_pu))
    if not text: text = partner_text(st, hint)
    try:
        try:
            await send_rich(context.bot, pid, text)
        except Exception:
            await context.bot.send_message(pid, tg_rich(text), parse_mode="HTML")
    except Exception as e:
        log.warning("partner push: %s", e)

async def addcycles_entry(context, cid, msg):
    if is_male_profile(row(cid)):
        upsert(cid, state=None)
        ev(cid, "male_mode_block", meta="addcycles_entry")
        return await msg.reply_text(MALE_PROFILE_FUNCTION_TEXT)
    upsert(cid, state="await_cycles")
    await msg.reply_text(ADDCYCLES_TEXT)
async def addcycles_cmd(update, context):
    cid = update.effective_chat.id; ev(cid, "command")
    u = row(cid)
    if not is_onboarded(u): return await need_onboard(update.message)
    if is_male_profile(u):
        return await update.message.reply_text(MALE_PROFILE_FUNCTION_TEXT)
    await addcycles_entry(context, cid, update.message)
async def partner_entry(context, cid, msg):
    global BOT_USERNAME
    u = row(cid); code = u.get("partner_code")
    if not code or len(code) < 24:
        code = secrets.token_urlsafe(24); set_partner_code(cid, code)
    if not BOT_USERNAME:
        try: BOT_USERNAME = (await context.bot.get_me()).username
        except Exception: BOT_USERNAME = None
    link = f"https://t.me/{BOT_USERNAME}?start=p_{code}" if BOT_USERNAME else None
    linked = partner_of(cid)
    body = "Перешли партнёру эту ссылку:\n" + (link if link else f"Код подключения: {code}")
    if is_male_profile(u):
        body += (
            "\n\nПартнёр откроет бота и будет получать короткую сводку об "
            "общем самочувствии, нагрузке и о том, как поддержать. Личные "
            "разделы он не увидит."
        )
    else:
        body += ("\n\nОн откроет бота и будет получать по утрам короткую сводку: день цикла, общее состояние "
                 "и как поддержать. Календарь и личные разделы он не увидит.")
    body += ("\n\nПартнёр уже подключён. Отключить: /unlink" if linked else "\n\nПартнёр пока не подключён.")
    await msg.reply_text(body)

async def partner_join(context, partner_cid, msg, code):
    woman = woman_by_code(code)
    if not woman:
        return await msg.reply_text("Ссылка недействительна. Попроси прислать новую через Меню, кнопка Партнёр.")
    if woman == partner_cid:
        return await msg.reply_text("Это твоя же ссылка, перешли её партнёру.")
    link_partner(partner_cid, woman); ev(partner_cid, "goal", meta="partner_link")
    await msg.reply_text(partner_hello_for(row(woman)))
    await push_partner(context, woman)  # сразу первый апдейт, не ждать утра
    try:
        await context.bot.send_message(woman, "Партнёр подключился и будет получать утреннюю сводку поддержки. Отключить: /unlink или в Меню, кнопка «Партнёр».")
    except Exception: pass

# ---------- commands ----------
async def start(update, context):
    cid = update.effective_chat.id
    # /start is the only operation that begins a fresh lifecycle after /stop.
    # Incrementing the generation keeps older in-flight tasks permanently stale.
    user_generation = _activate_user(cid)
    _sync_telegram_identity(update, allow_create=True)
    record_onboarding_started(cid, user_generation)
    if context.args and context.args[0].startswith("p_"):
        return await partner_join(context, cid, update.message, context.args[0][2:])
    if context.args and context.args[0] and not context.args[0].startswith("p_"):
        _src = re.sub(r"[^a-z0-9_]", "", (context.args[0] or "").lower())[:32]
        if _src:
            _ref_touch(cid, _src); ev(cid, "ref", meta="src:" + _src)
    if is_partner(cid) and not is_onboarded(row(cid)):
        # Партнёр может завести и собственный профиль (например, мужской режим) —
        # партнёрские сводки при этом продолжают приходить.
        await update.message.reply_text(partner_info_for(cid))
        return await update.message.reply_text(
            "Кстати, Айва может вести и твои питание, тренировки и сводки — параллельно с партнёрской сводкой.",
            reply_markup=InlineKeyboardMarkup([[B("Настроить мой профиль", "go_start", KBS.PRIMARY)]]))
    ev(cid, "command", meta="start")
    if is_onboarded(row(cid)):
        return await update.message.reply_text(
            "У тебя уже всё настроено, данные на месте. Продолжить или начать настройку заново?",
            reply_markup=InlineKeyboardMarkup([[B("Продолжить", "keep", KBS.PRIMARY)], [B("Начать заново", "go_start", KBS.DANGER)]]))
    await begin_onboard(
        cid,
        update.message,
        user_generation=user_generation,
    )
async def today(update, context):
    cid = update.effective_chat.id; ev(cid, "command")
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    await push_summary(context, cid)
async def id_cmd(update, context):
    await update.message.reply_text(f"Твой chat id: {update.effective_chat.id}")
async def calendar_cmd(update, context):
    cid = update.effective_chat.id; ev(cid, "command"); u, st = status_of(cid)
    if not is_onboarded(u): return await need_onboard(update.message)
    if is_male_profile(u):
        return await update.message.reply_text(MALE_PROFILE_FUNCTION_TEXT)
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
    u = row(cid)
    if not is_onboarded(u): return await need_onboard(update.message)
    if is_male_profile(u):
        upsert(cid, state=None)
        return await update.message.reply_text(MALE_PROFILE_FUNCTION_TEXT)
    if context.args:
        d = parse_date(context.args[0])
        if d:
            mark_period(context, cid, d.isoformat())
            await update.message.reply_text(f"Отметила начало месячных: {d.strftime('%d.%m.%Y')}. Вот свежая сводка:")
            return await push_summary(context, cid)
    upsert(cid, state=dialog.begin(ACT_PERIOD_DATE.name).state)
    await update.message.reply_text("Напиши дату начала последних месячных, например 25.05.2026, или нажми кнопку. Потом даты можно редактировать в приложении.", reply_markup=PERIOD_KB)
async def set_time_cmd(update, context):
    ev(update.effective_chat.id, "command"); cid = update.effective_chat.id
    if not is_onboarded(row(cid)): return await need_onboard(update.message)
    hhmm = parse_time(context.args[0]) if context.args else None
    if not hhmm:
        upsert(cid, state=dialog.begin(ACT_SETTIME.name).state)
        return await update.message.reply_text("Во сколько присылать сводку (МСК)? Выбери или впиши своё время, например 09:00.", reply_markup=time_kb())
    set_daily_time(context.application, cid, hhmm)
    await update.message.reply_text(schedule_text(cid, hhmm))
MODE_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Мужчина", callback_data="mode:male")],
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
    cid = update.effective_chat.id; ev(cid, "command")
    if is_male_profile(row(cid)):
        return await update.message.reply_text(MALE_PROFILE_FUNCTION_TEXT)
    await send_guide(context, cid, GUIDES[0])
async def about_cmd(update, context):
    cid = update.effective_chat.id; ev(cid, "command")
    await update.message.reply_text(meta_text_for(row(cid), "about"))
async def report_cmd(update, context):
    cid = update.effective_chat.id; ev(cid, "command")
    u = row(cid)
    if not is_onboarded(u): return await need_onboard(update.message)
    await update.message.reply_text(report_prompt(u), reply_markup=HIST_KB)
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
    await update.message.reply_text("Приложение Айвы:",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton(APP_BUTTON_TEXT, web_app=WebAppInfo(url=url))]]))
async def stop(update, context):
    cid = update.effective_chat.id
    _remove_daily_jobs(context.application, cid)
    del_user(cid); await update.message.reply_text("Отключила сводки и удалила данные. Вернуться: /start")
async def help_cmd(update, context):
    male = is_male_profile(row(update.effective_chat.id))
    await update.message.reply_text(
        "Команды AIWA:\n"
        "/menu: открыть меню\n"
        "/today: сводка за день\n"
        "/app: открыть приложение\n"
        "/report: выписка для врача\n"
        "/partner: подключить партнёра\n"
        "/unlink: отключить партнёра\n"
        "/stop: стереть все данные и отключить бота\n\n"
        + (
            "Самочувствие, питание, нагрузка и статистика живут в приложении. "
            if male else
            "Календарь, симптомы, питание, нагрузка и статистика живут в приложении. "
        )
        + "Ещё можно писать словами: «как изменить вес», «поменять время рассылки», «как удалить данные», «отключить партнёра»."
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
    L.append("Ever used " + str(a["ever_used"]))
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
    L.append("Tools / DAU " + str(e["tools_per_dau"]) + " (" + str(e["toolcalls_total"]) + " вызовов) · прил " + str(ts.get("app", 0)) + ", чат " + str(ts.get("chat", 0)) + ", авто " + str(ts.get("auto", 0)) + wow(g.get("toolcalls")))
    L.append("Топ действий: " + (", ".join(str(k) + " " + str(vv) for k, vv in e["actions_top"][:6]) or "нет"))
    ss = e["sessions"]
    L.append("Sessions / DAU " + str(e["sessions_per_dau"]) + " (" + str(ss["count"]) + " сессий), длина " + str(ss["avg_len_min"]) + " мин, действий/сессия " + str(ss["events_per"]))
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

async def ui_cmd(update, context):
    """Диагностика редизайна: что видит флаг и какой URL получают кнопки этого пользователя."""
    cid = update.effective_chat.id
    u = row(cid)
    url = webapp_url(u) or "(нет AIWA_WEBAPP_URL)"
    lines = ["Диагностика мини-аппа:",
             f"твой id: {cid}",
             f"redesign включён для тебя: {'ДА' if redesign_on(cid) else 'НЕТ'}",
             f"id в списке AIWA_REDESIGN_IDS: {len(_REDESIGN_IDS)} шт",
             f"URL кнопок: {url}",
             "", "Кнопка ниже ведёт на новый фронт напрямую. Если по ней открывается старый экран — пришли скрин."]
    kb = None
    if AIWA_WEBAPP_URL:
        kb = InlineKeyboardMarkup([[InlineKeyboardButton("Новый апп (прямая ссылка)",
              web_app=WebAppInfo(url=AIWA_WEBAPP_URL))]])
    await update.message.reply_text("\n".join(lines), reply_markup=kb)

async def voicetest_cmd(update, context):
    """Диагностика голоса: авторизация Сбера, синтез, отправка тестового голосового."""
    cid = update.effective_chat.id
    if not AIWA_ADMIN or str(cid) != str(AIWA_ADMIN):
        return await update.message.reply_text("Команда только для админа.")
    await update.message.reply_text("Проверяю голосовой контур…")
    d = await asyncio.to_thread(L.salute_diag)
    L_ = ["Голосовой контур:", ""]
    L_.append(("✅" if d["key"] else "❌") + " ключ SBER_SALUTE_AUTH_KEY " + ("задан" if d["key"] else "НЕ задан")
              + (" · %s символов · %s" % (d.get("key_len"), d.get("key_form")) if d.get("key_form") else ""))
    L_.append(("✅" if d["auth"] else "❌") + " авторизация в Сбере" + ("" if d["auth"] else ": " + (d.get("auth_err") or "неизвестно")))
    if d.get("auth_form"): L_.append("   формат ключа: " + str(d["auth_form"]))
    if d.get("auth"):
        ok_tts = d.get("tts_bytes", 0) > 0
        L_.append(("✅" if ok_tts else "❌") + " синтез речи" + (" (%s байт)" % d["tts_bytes"] if ok_tts else ": " + (d.get("tts_err") or "пусто")))
    if d.get("key_parts"): L_.append("   в ключе: " + str(d["key_parts"]) + " (норма: 36 + 36)")
    L_ += ["", "версия: " + AIWA_VERSION, "сервис: " + str(d.get("mode")) + " · логин: " + str(d.get("client")),
           "OAuth URL: " + str(d.get("oauth_url")),
           "модель распознавания: " + str(d["model"]),
           "голос: " + str(d["voice"]), "режим STT: " + str(d["stt_mode"]),
           "ответ голосом: " + ("включён" if _voice_reply_default() else "ВЫКЛЮЧЕН (AIWA_VOICE_REPLY=0)"),
           "Groq (запасной): " + ("есть" if d["groq"] else "нет")]
    await update.message.reply_text("\n".join(L_))
    if d.get("tts_bytes"):
        try:
            audio = await asyncio.to_thread(L.synthesize, "Привет! Это Айва. Проверка голосового ответа.")
            if audio:
                try:
                    await context.bot.send_voice(cid, audio)
                except Exception as e:
                    if "voice_messages_forbidden" not in str(e).lower():
                        raise
                    await _send_audio_fallback(context, cid, audio)
                    await update.message.reply_text(
                        "⚠️ Голосовые тебе слать нельзя — это настройка приватности Telegram, не ошибка бота.\n"
                        "Прислала ответ обычным аудиофайлом. Чтобы приходили именно голосовые: "
                        "Настройки → Конфиденциальность → Голосовые сообщения → «Все».\n"
                        "Пользовательницам без этого ограничения голосовые уходят нормально.")
        except Exception as e:
            await update.message.reply_text("Синтез удался, но отправить не вышло: " + str(e)[:200])

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
    campaign = campaign_id("meno_update")
    for uid in users:
        u = row(uid)
        try:
            await context.bot.send_message(uid, html.escape(MENO_UPDATE_TEXT),
                reply_markup=summary_sugg_kb(uid, u, campaign=campaign), parse_mode="HTML")
            ev(uid, "broadcast", meta="sent|" + campaign)
            sent += 1
            await asyncio.sleep(0.25)
        except Exception as e:
            failed += 1
            _record_push_failure(uid, campaign, e)
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
    campaign = campaign_id("announcement")
    for uid in all_users():
        try:
            await context.bot.copy_message(chat_id=uid, from_chat_id=cid, message_id=msg.message_id,
                                           reply_markup=summary_kb(row(uid), campaign=campaign))
            ev(uid, "broadcast", meta="sent|" + campaign); sent += 1
            await asyncio.sleep(0.25)
        except Forbidden as exc:
            failed += 1; _record_push_failure(uid, campaign, exc)
        except Exception as e:
            failed += 1; _record_push_failure(uid, campaign, e); log.warning("announce %s: %s", uid, e)
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
    # PTB отдаёт в этот же хендлер правку уже отправленного сообщения: там
    # update.message = None, а update.edited_message заполнен. Правку не
    # переобрабатываем — иначе один текст дважды попал бы в дневник.
    if update.message is None:
        return
    cid = update.effective_chat.id
    if cid in ANNOUNCE_WAIT:
        return await _announce_capture(update, context, cid)
    try:
        await handle_text(update, context, update.message.text.strip())
    except Exception as e:
        log.exception("text handler failed for %s", cid)
        ev(cid, "error", meta=type(e).__name__)
        await update.message.reply_text(
            "Я вижу сообщение, но сейчас не смогла собрать ответ. Попробуй ещё раз через минуту.")

async def on_export_document(update, context):
    """Приём файла выгрузки обратно.

    Восстанавливаем только разделы с естественным ключом — циклы, дни
    самочувствия и отметки близости: у них первичный ключ (chat_id, дата),
    поэтому повторный импорт того же файла ничего не задваивает. Питание и
    тренировки — журнал с автоинкрементом, их слияние без ключа идемпотентности
    плодило бы дубли, поэтому в этой версии они не переносятся, и об этом
    честно сказано пользователю.
    """
    if update.message is None:
        return
    cid = update.effective_chat.id
    doc = update.message.document
    if not doc or not str(doc.file_name or "").lower().endswith(".json"):
        return
    if (doc.file_size or 0) > 8 * 1024 * 1024:
        return await update.message.reply_text("Файл слишком большой — жду выгрузку Айвы до 8 МБ.")
    try:
        handle = await context.bot.get_file(doc.file_id)
        raw = bytes(await handle.download_as_bytearray())
        parsed = portability.load(raw.decode("utf-8", "replace"))
    except portability.ExportError as exc:
        return await update.message.reply_text(f"Не приняла файл: {exc}")
    except Exception:
        log.exception("import: не смогла прочитать файл")
        return await update.message.reply_text("Не смогла прочитать файл. Пришли выгрузку Айвы в формате JSON.")

    generation = _user_generation(cid)
    c = db()
    try:
        if not _user_write_allowed(cid, generation, conn=c):
            return await update.message.reply_text("Профиль изменился, попробуй ещё раз.")
        c.execute("BEGIN IMMEDIATE")
        for item in parsed["cycles"]:
            c.execute("INSERT OR REPLACE INTO cycles(chat_id,start_date,end_date) VALUES(?,?,?)",
                      (cid, item.get("start_date"), item.get("end_date")))
        for item in parsed["logs"]:
            c.execute("INSERT OR REPLACE INTO logs(chat_id,log_date,energy,mood,symptoms) VALUES(?,?,?,?,?)",
                      (cid, item.get("log_date"), item.get("energy"), item.get("mood"),
                       item.get("symptoms") or ""))
        for item in parsed["intimacy"]:
            c.execute("INSERT OR IGNORE INTO intimacy(chat_id,d) VALUES(?,?)", (cid, item.get("d")))
        c.commit()
    except Exception:
        c.rollback()
        log.exception("import: не смогла применить выгрузку")
        return await update.message.reply_text("Не получилось применить выгрузку. Ничего не изменила.")
    finally:
        c.close()

    counts = parsed["counts"]
    restored = f"Восстановила: {counts['cycles']} циклов, {counts['logs']} дней самочувствия."
    skipped = ""
    if counts["meals"] or counts["workouts"]:
        skipped = (f"\n\nПитание ({counts['meals']}) и тренировки ({counts['workouts']}) "
                   "из файла не переносила: их пришлось бы задваивать. Они остались в файле.")
    _evict_today_cache(cid)
    return await update.message.reply_text(restored + skipped)

async def on_voice(update, context):
    if update.message is None:   # правка сообщения: см. комментарий в on_text
        return
    cid = update.effective_chat.id; txt = None; _sti = {}
    generation = _user_generation(cid)
    await context.bot.send_chat_action(cid, "typing")
    try:
        f = await context.bot.get_file(update.message.voice.file_id)
        ba = await f.download_as_bytearray(); txt = await llm_to_thread(cid, "stt", L.transcribe, bytes(ba), "voice.ogg", _sti,
                                                                       user_generation=generation)
    except Exception as e:
        log.warning("voice: %s", e)
    if not _user_write_allowed(cid, generation):
        return await update.message.reply_text("Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start.")
    if _sti: ev(cid, "stt", meta="stt:" + str(_sti.get("provider")), ms=int(_sti.get("ms") or 0), calls=1)
    if not txt:
        return await update.message.reply_text("Не разобрала голосовое, попробуй ещё раз или напиши текстом.")
    ev(cid, "voice", n=len(txt))
    await update.message.reply_text(f"🎙 Расслышала: «{txt}»")
    _VOICE_TURN[cid] = True          # спросили голосом — ответим текстом и голосом
    sent_texts = []
    collector_token = _SPOKEN_COLLECTOR.set(sent_texts)
    voice_context = _VoiceContextProxy(
        context, _VoiceBotProxy(context.bot, cid, sent_texts)
    )
    voice_update = _VoiceUpdateProxy(
        update, _VoiceMessageProxy(update.message, sent_texts)
    )
    try:
        await handle_text(voice_update, voice_context, txt)
        # Free-form AI answers speak inside send_answer(). Intent/state branches
        # often reply directly, so duplicate their final visible text here too.
        if _VOICE_TURN.pop(cid, False) and _voice_reply_on(cid):
            spoken = _voice_plain_text(
                sent_texts[-1] if sent_texts else "Готово. Результат отправила в чат."
            )
            if spoken:
                await _send_voice_reply(context, cid, spoken)
    finally:
        _SPOKEN_COLLECTOR.reset(collector_token)
        _VOICE_TURN.pop(cid, None)   # чтобы флаг не протёк на следующий текстовый вопрос

def food_card(rec, added=True):
    conf = {"low": "низкая", "medium": "средняя", "high": "высокая"}.get(rec.get("confidence"), "средняя")
    head = f"🍽 <b>{html.escape(rec['title'])}</b>"
    if rec.get("grams"): head += f" · ~{rec['grams']} г"
    lines = [head, f"~{rec['kcal']} ккал · Б {round(rec['protein'])} · Ж {round(rec['fat'])} · У {round(rec['carbs'])} г"
             + (f" · {rec['fclass']}" if rec.get("fclass") else "")]
    for it in (rec.get("items") or [])[:6]:
        g = f" {it['grams']} г" if it.get("grams") else ""
        lines.append(f"• {html.escape(it['name'])}{g} — {it['kcal']} ккал")
    if rec.get("note"): lines.append(f"<i>{html.escape(rec['note'])}</i>")
    lines.append(f"\nОценка примерная (точность {conf})." + (" Добавила в дневник — итоги дня в приложении." if added else ""))
    return "\n".join(lines)

async def on_photo(update, context):
    if update.message is None:   # правка сообщения: см. комментарий в on_text
        return
    cid = update.effective_chat.id
    if cid in ANNOUNCE_WAIT:
        return await _announce_capture(update, context, cid)
    u = row(cid)
    if not is_onboarded(u):
        return await update.message.reply_text("Сначала настрой Айву: /start.")
    generation = _user_generation(cid)
    acquired = await _acquire_food_vision_slot()
    if not acquired:
        ev(
            cid, "fallback", meta="food_vision_busy",
            user_generation=generation,
        )
        return await update.message.reply_text(
            "Сейчас разбираю много фотографий, поэтому фото не сохранила. "
            "Попробуй ещё раз через минуту или добавь приём текстом."
        )
    try:
        return await _on_photo_bounded(update, context)
    finally:
        _release_food_vision_slot()


async def _on_photo_bounded(update, context):
    cid = update.effective_chat.id; u = row(cid)
    if not is_onboarded(u):
        return await update.message.reply_text("Сначала настрой Айву: /start.")
    generation = _user_generation(cid)
    ev(cid, "flow_start", meta="food", user_generation=generation)
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
        parsed = await llm_to_thread(
            cid, "food_vision", L.analyze_food, bytes(ba), "food.jpg",
            prof, usage, user_generation=generation,
        )
    except Exception as e:
        log.warning("on_photo analyze %s: %s", cid, e); parsed = None
    if not _user_write_allowed(cid, generation):
        return await update.message.reply_text("Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start.")
    ev(
        cid, "tokens", sum(usage), meta="food_photo", calls=len(usage),
        usage=usage, user_generation=generation,
    )
    rec = normalize_food(parsed, "photo") if parsed else None
    if not rec:
        _e = ""
        try: _e = L.last_food_err()
        except Exception: pass
        return await update.message.reply_text("Не разобрала фото 🙈 Сфоткай ближе и светлее, либо напиши текстом." + (("\n\n⚙️ " + _e) if _e else ""))
    mid = meal_add(cid, rec); ev(cid, "goal", meta="food_log"); ev(cid, "manual", meta="food_log")
    rows = [[B("🗑 Убрать из дневника", f"mdel:{mid}")]]
    wu = campaign_webapp_url(u, tab="food")
    if wu: rows.append([InlineKeyboardButton("Открыть дневник", web_app=WebAppInfo(url=wu))])
    await update.message.reply_text(food_card(rec), reply_markup=InlineKeyboardMarkup(rows), parse_mode="HTML")

async def handle_text(update, context, txt):
    cid = update.effective_chat.id; u = row(cid); state = u["state"] if u else None
    cem = [e.custom_emoji_id for e in (update.message.entities or []) if getattr(e, "custom_emoji_id", None)]
    if cem:
        return await update.message.reply_text("ID кастомных эмодзи:\n" + "\n".join(cem))
    txt, addressed = strip_aiwa_address(txt)
    if addressed and not txt:
        topics = (
            "питанием, нагрузкой или самочувствием"
            if (u or {}).get("mode") == "male"
            else "циклом, питанием, нагрузкой или самочувствием"
        )
        return await update.message.reply_text(
            f"Я тут. Напиши вопрос или открой меню, и я помогу с {topics}."
        )
    # Циклические сценарии не для мужского профиля. Состояние может быть и
    # легаси-строкой, и токеном реестра — разбираем оба.
    _act = dialog.parse_state(state)
    _cycle_state = state in {"await_cycles"} or (
        _act is not None and _act[0] in {ACT_PERIOD_DATE.name, ACT_CYCLE_LEN.name}
    )
    if is_male_profile(u) and _cycle_state:
        upsert(cid, state=None, pending_date=None)
        ev(cid, "male_mode_block", meta="stale_state_" + str(state)[:24])
        return await update.message.reply_text(MALE_PROFILE_FUNCTION_TEXT)

    if state == "await_food_text":
        pending_at = None
        try:
            pending_at = datetime.fromisoformat(str(u.get("pending_date") or ""))
            if pending_at.tzinfo is None:
                pending_at = pending_at.replace(tzinfo=TZ)
        except (TypeError, ValueError):
            pending_at = None
        still_pending = bool(
            pending_at
            and timedelta(0) <= datetime.now(TZ) - pending_at <= timedelta(minutes=30)
        )
        # The prompt is a one-shot capability and must not trap later messages.
        upsert(cid, state=None, pending_date=None)
        if still_pending:
            generation = _user_generation(cid)
            journal = await resolve_semantic_journal_action(
                cid, txt, user_generation=generation, food_prompt_mode=True,
            )
            if journal and journal.get("intent") in {"logmeal", "logmealbatch"}:
                return await dispatch_intent(
                    context, update, cid, u, journal["intent"], txt,
                    journal=journal, user_generation=generation,
                )
            # The one-shot journal prompt must never suppress normal safety and
            # question handling. If this is not a verifiable meal, continue
            # through the ordinary router instead of trapping the message in a
            # food-only refusal.
            ev(
                cid, "fallback", meta="food_prompt_normal_router",
                user_generation=generation,
            )

    VALUE_STATES = {
        "await_date": "Напиши дату начала последних месячных, например 25.05.2026 или 26 мая 2026. Потом даты можно редактировать в приложении.",
        "await_len": "Напиши среднюю длину цикла числом. Это дни от первого дня одних месячных до первого дня следующих. Обычно 21-35, если не знаешь, можно 28.",
        "await_preg_date": "Напиши дату начала последних месячных, например 25.05.2026. Если знаешь ПДР, напиши дату и добавь слово ПДР.",
        "await_time": "Во сколько присылать сводку? Напиши время по Москве, например 08:00.",
        "await_profile": "Напиши рост, вес и возраст через пробел. Например 168 60 30. Можно написать «Пропустить».",
        "await_profile_edit": "Напиши рост, вес и возраст через пробел. Например 168 60 30.",
        "await_cycles": "Пришли даты начала месячных, по одной на строке. Можно добавить последние несколько циклов.",
        "await_symptom_custom": "Напиши симптом коротко, например «тошнота», «ломота», «боль в груди».",
    }
    # Подсказка «на чём мы остановились» для действий реестра берётся из него
    # же — заводить её второй раз в таблице выше не нужно.
    value_hint = VALUE_STATES.get(state) or _dialog_hint(state)
    if value_hint and is_question_like(txt):
        await context.bot.send_chat_action(cid, "typing")
        _, _qst = status_of(cid)
        a = await think_llm(context, cid, L.answer_question, _qst, txt, llm_profile_of(u), None)
        await reply_long(update.message, L.split_followups(a)[0])
        return await update.message.reply_text("А теперь вернёмся к настройке. " + value_hint)

    if partner_question(cid, txt):
        wid = woman_of_partner(cid); wu = row(wid); _, wst = status_of(wid)
        mt = match_meta(txt)
        if mt:
            return await update.message.reply_text(meta_text_for(u, mt))
        if is_gibberish(txt):
            return await update.message.reply_text("Не поняла вопрос. Напиши словами, например: «как её поддержать сегодня» или «что ей купить».")
        await context.bot.send_chat_action(cid, "typing")
        t0 = time.monotonic(); usage = []
        if wu and wu.get("mode") == "preg" and wu.get("last_period"):
            ans = await llm_to_thread(cid, "partner_answer", L.partner_preg_answer, C.preg_status(wu["last_period"]), txt, last_hint(wid), usage=usage)
        elif wst:
            ans = await llm_to_thread(cid, "partner_answer", L.partner_answer, wst, txt, last_hint(wid), usage=usage)
        else:
            return await update.message.reply_text(partner_info_for(cid))
        ev(cid, "answered", tokens=sum(usage), meta="partner_q", ms=int((time.monotonic()-t0)*1000), n=len(txt), calls=len(usage), usage=usage)
        return await context.bot.send_message(cid, ans)

    if state == "await_date":
        d = parse_date(txt)
        if not d:
            if is_question_like(txt):
                _oq = []; a = await think_llm(context, cid, L.answer_question, None, txt, llm_profile_of(u), None, usage=_oq)
                ev(cid, "tokens", sum(_oq), meta="onboard_q", calls=len(_oq), usage=_oq)
                return await reply_long(update.message, L.split_followups(a)[0] + "\n\nА теперь вернёмся: напиши дату начала последних месячных, например 25.05.2026. Потом даты можно редактировать в приложении.")
            return await update.message.reply_text("Не разобрала дату. Напиши дату начала последних месячных в формате ДД.ММ.ГГГГ, например 25.05.2026, или нажми кнопку выше.")
        upsert(cid, pending_date=d.isoformat(), state="await_len")
        return await update.message.reply_text(
            "Теперь длина цикла — сколько дней от первого дня одних месячных до первого дня следующих. "
            "Например, месячные начались 1 мая, следующие 29 мая — цикл 28 дней.\n\n"
            "Напиши число. Обычно это 21–35 дней; если не помнишь точно, укажи примерно — потом можно поправить.")
    if state == "await_len":
        try:
            n = int(txt); assert 20 <= n <= 60
        except (ValueError, AssertionError):
            if is_question_like(txt):
                _oq = []; a = await think_llm(context, cid, L.answer_question, None, txt, llm_profile_of(u), None, usage=_oq)
                ev(cid, "tokens", sum(_oq), meta="onboard_q", calls=len(_oq), usage=_oq)
                return await reply_long(update.message, L.split_followups(a)[0] + "\n\nА теперь вернёмся: какая средняя длина цикла в днях? Обычно это 21-35 дней, но у многих бывает иначе.")
            return await update.message.reply_text("Нужно число от 20 до 60. Если не знаешь точно, напиши примерное значение, потом его можно поправить. Если цикл нерегулярный, можно начать заново через /start и выбрать «Нет регулярного цикла».")
        finish_onboarding(context, cid, u["pending_date"], n)
        note = ""
        if n > 40:
            note = ("Цикл длиннее 40 дней часто говорит о нерегулярности (бывает при СПКЯ, щитовидке, стрессе), это стоит обсудить с гинекологом. "
                    "Ориентировочные фазы я всё равно посчитаю и буду следить за симптомами.\n\n")
        upsert(cid, state="await_profile")
        return await update.message.reply_text(note +
            "Напиши через пробел рост, вес и возраст — например: 168 60 30.\nПо ним я рассчитаю калории и подберу питание.", reply_markup=SKIP_KB)

    if state == "await_diet":
        _clean = txt.strip().lower()
        if _clean in ("нет", "нету", "не", "no", "ограничений нет", "нет ограничений", "-", "пропустить"):
            upsert(cid, diet="", diet_note="", state=None)
        else:
            upsert(cid, diet="", diet_note=txt[:200], state=None)
        return await welcome_finish(context, cid, update.message)

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
                _oq = []; a = await think_llm(context, cid, L.answer_question, None, txt, llm_profile_of(u), None, usage=_oq)
                ev(cid, "tokens", sum(_oq), meta="onboard_q", calls=len(_oq), usage=_oq)
                return await reply_long(update.message, L.split_followups(a)[0] + "\n\nА теперь вернёмся: напиши рост (см), вес (кг), возраст. Например 168 60 30, или нажми «Пропустить».", reply_markup=SKIP_KB)
            return await update.message.reply_text("Нужно три числа: рост в см, вес в кг, возраст. Например 168 60 30. Или нажми «Пропустить».", reply_markup=SKIP_KB)
        upsert(cid, height=int(cm), weight=kg, age=age, state="await_activity")
        return await update.message.reply_text("Записала. Какой у тебя уровень физической активности?\n\n"
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
        return await update.message.reply_text("Есть ограничения в еде? Отметь варианты или напиши своё текстом, например «без свинины, без сахара». Если ограничений нет, нажми «Ограничений нет».", reply_markup=diet_kb(set()))

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

    # Действия из реестра. Ветка неудачи здесь одна на всех: непонятный ввод
    # переспрашивается, а не роняет сценарий молча — ровно то, чем болели
    # ветки ниже. По мере переезда `await_*` этот блок останется единственным.
    step = dialog.feed(state, txt)
    if step is not None and isinstance(step, dialog.Ask) and match_intent(txt) not in (None, ""):
        # Пользователь не ответил на вопрос, а сказал новое: «пришли мои данные»
        # посреди настройки времени. Переспрашивать в такой ситуации значит
        # съесть команду — выходим из сценария и отдаём фразу дальше.
        upsert(cid, state=None)
        step = None
    if step is not None:
        if isinstance(step, dialog.Ask):
            upsert(cid, state=step.state)
            return await update.message.reply_text(step.prompt)
        if isinstance(step, dialog.Cancelled):
            upsert(cid, state=None)
            return await update.message.reply_text(step.message)
        upsert(cid, state=None)
        return await _apply_action(context, update, cid, step)

    if state == "await_preg_date":
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
        if pre_intent in ("wipe", "unlink", "help", "current_date"):
            return await dispatch_intent(context, update, cid, u, pre_intent, txt)

    m = match_meta(txt)
    if m:
        ev(cid, "manual", meta="meta", n=len(txt))
        return await update.message.reply_text(meta_text_for(u, m))

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
        _turn_generation = _user_generation(cid)
        _intent = match_intent(txt)
        _journal = None
        if _intent not in _JOURNAL_MUTATION_INTENTS:
            _telegram_mutation_key = chat_mutation_key(
                "telegram", getattr(update, "update_id", None),
            )
            _journal = chat_mutation_route_preflight(cid, _telegram_mutation_key)
            if not _journal:
                _journal = await resolve_semantic_journal_action(
                    cid, txt, user_generation=_turn_generation,
                )
            if _journal:
                _intent = _journal["intent"]
        if _intent:
            return await dispatch_intent(
                context, update, cid, u, _intent, txt, journal=_journal,
                user_generation=_turn_generation,
            )

    if is_onboarded(u) and not is_cycle(u):
        if not _VOICE_TURN.get(cid): ev(cid, "user_message", meta="text", n=len(txt))
        await context.bot.send_chat_action(cid, "typing")
        t0 = time.monotonic(); usage = []
        ans = await think_llm(context, cid, L.general_answer, llm_profile_of(u), u.get("mode"), txt, hint=chat_hint(cid), history=hist_get(cid, male=is_male_profile(u)), usage=usage)
        ev(cid, "answered", meta="general", ms=int((time.monotonic()-t0)*1000), n=len(txt))
        ans = guard_aiwa_reply(cid, ans)
        hist_push(cid, txt, ans)
        return await send_answer(context, cid, ans, None, txt, usage=usage, quote=txt)
    if is_onboarded(u):
        if not _VOICE_TURN.get(cid): ev(cid, "user_message", meta="text", n=len(txt))
        _, st = status_of(cid); await context.bot.send_chat_action(cid, "typing")
        g = match_guide(txt)
        if g: await send_guide(context, cid, g)
        t0 = time.monotonic(); usage = []
        ans = await think_llm(context, cid, L.answer_question, st, txt, llm_profile_of(u), hist_get(cid, male=is_male_profile(u)), usage=usage)
        ev(cid, "answered", meta="answer", ms=int((time.monotonic()-t0)*1000), n=len(txt))
        ans = guard_aiwa_reply(cid, ans)
        hist_push(cid, txt, ans)
        return await send_answer(context, cid, ans, st, txt, usage=usage, quote=txt)
    if is_question_like(txt):
        await context.bot.send_chat_action(cid, "typing")
        _oq = []; a = await think_llm(context, cid, L.answer_question, None, txt, llm_profile_of(u), None, usage=_oq)
        ev(cid, "tokens", sum(_oq), meta="onboard_q", calls=len(_oq), usage=_oq)
        await reply_long(update.message, L.split_followups(a)[0])
    await need_onboard(update.message)

# ---------- callbacks ----------
async def on_cb(update, context):
    q = update.callback_query
    if not q.message:  # у сообщений старше ~48ч Telegram не присылает message — без защиты тут AttributeError
        await q.answer()
        return
    cid = q.message.chat.id; data = q.data
    if data.startswith("fb:"):
        parts = data.split(":", 2)
        rating = parts[1] if len(parts) > 1 else ""
        answer_id = re.sub(r"[^a-f0-9]", "", parts[2] if len(parts) > 2 else "")[:32]
        feedback_result = _submit_feedback(cid, answer_id, rating, "bot")
        if feedback_result == "missing":
            return await q.answer("Не получилось сохранить оценку")
        if feedback_result == "duplicate":
            await q.answer("Оценка уже сохранена 💛")
        else:
            await q.answer("Спасибо, это помогает улучшать Айву 💛")
        rows = []
        for row_buttons in (getattr(q.message.reply_markup, "inline_keyboard", None) or []):
            if any(str(getattr(button, "callback_data", "") or "").startswith("fb:") for button in row_buttons):
                continue
            rows.append(list(row_buttons))
        await safe_edit(q, reply_markup=InlineKeyboardMarkup(rows) if rows else None)
        return
    await q.answer()
    # Onboarding has several early returns, so record the tap before routing.
    ev(cid, "suggest" if data.startswith("q:") else "button", meta=data)
    if data.startswith("pado:"):
        _parts = data.split(":")
        _intent = _parts[-1]
        if len(_parts) >= 4:
            ev(cid, "push_open", meta=":".join(_parts[1:-1]))
        _u = row(cid)
        if not is_onboarded(_u):
            return await q.message.reply_text("Сначала настрой Айву: /start.")
        if is_male_profile(_u):
            _QQ = {
                "train": (
                    "Собери мне короткую тренировку примерно на 10 минут с "
                    "учётом сегодняшнего самочувствия и восстановления. Дай "
                    "конкретные упражнения с подходами и повторами."
                ),
                "food": "Что съесть, чтобы добрать белок к ужину? Дай 2-3 конкретных варианта.",
            }
        else:
            _QQ = {
                "train": "Собери мне короткую тренировку примерно на 10 минут под мою фазу цикла и сегодняшнее самочувствие. Дай конкретные упражнения с подходами и повторами.",
                "food": "Что съесть, чтобы добрать белок к ужину, под мою фазу? Дай 2-3 конкретных варианта.",
            }
        _query = _QQ.get(_intent)
        if not _query:
            return
        ev(cid, "user_message", meta="suggest", n=len(_query))
        await context.bot.send_chat_action(cid, "typing")
        try:
            _res = await _chat_reply(cid, _u, _query)
            _ans = _res.get("answer") if isinstance(_res, dict) else None
        except Exception as _e:
            log.warning("pado reply: %s", _e); _ans = None
        if not _ans:
            _ans = "Не получилось собрать прямо сейчас, попробуй ещё раз чуть позже."
        _ans = guard_aiwa_reply(cid, _ans)
        _wu = webapp_url(_u) or AIWA_WEBAPP_URL
        _kb = InlineKeyboardMarkup([[InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=_wu))]]) if _wu else None
        sent = await context.bot.send_message(cid, _ans, reply_markup=_kb)
        ev(cid, "assistant_message", meta="bot")
        return sent
    if data == "go_start": return await begin_onboard(cid, q.message, force=True)
    if data == "keep":
        u_keep = row(cid)
        return await q.message.reply_text("О чём рассказать сегодня?", reply_markup=menu_kb_for(u_keep, not is_cycle(u_keep)))
    if data == "onb_female":
        return await q.message.reply_text(FEMALE_START_TEXT, reply_markup=FEMALE_ONB_KB)
    if data == "onb_cycle":
        # Defer the mode transition until finish_onboarding has valid cycle
        # inputs. Cancelling this step must not expose cycle state.
        upsert(cid, state="await_date", pending_date=None)
        return await q.message.reply_text(
            "Напиши дату начала последних месячных — например 25.05.2026 или 26 мая 2026.\n\n"
            "По ней я определю день цикла и подстрою питание и нагрузку. Даты потом можно править в приложении.")
    if data == "prof_skip":
        upsert(cid, state=None); return await welcome_finish(context, cid, q.message)
    if data.startswith("act:"):
        upsert(cid, activity=int(data.split(":")[1]), state="await_diet")
        upsert(cid, state="await_diet")
        return await q.message.reply_text("Есть ограничения или предпочтения в еде? Напиши свободным текстом — например «без свинины, аллергия на орехи, не ем молочку». Если ограничений нет, напиши «нет».")
    if data.startswith("diet:s:"):
        code = data.split(":")[2]; cur = set((row(cid).get("diet") or "").split(",")) - {""}
        cur.symmetric_difference_update({code}); upsert(cid, diet=",".join(sorted(cur)))
        return await q.edit_message_reply_markup(reply_markup=diet_kb(cur))
    if data == "diet:none":
        # явный выбор «без ограничений»: чистим отмеченное и сразу завершаем шаг
        upsert(cid, diet="", state=None); return await welcome_finish(context, cid, q.message)
    if data == "diet:done":
        upsert(cid, state=None); return await welcome_finish(context, cid, q.message)
    if data == "no_cycle":
        return await q.message.reply_text(
            "Выбери, что ближе сейчас — это можно поменять позже.\n\n"
            "Айва работает и без регулярного цикла: при нерегулярных месячных и менопаузе.", reply_markup=NOCYCLE_KB)
    if data.startswith("mode:"):
        m = data.split(":")[1]; upsert(cid, mode=m)
        _invalidate_mode_dependent_state(cid)
        if m == "male":
            # тестовые/старые аккаунты: дата цикла от прежнего профиля не должна
            # включать циклическую логику в ответах и сводках
            upsert(
                cid,
                last_period=None,
                cycle_len=None,
                period_end=None,
                period_len=None,
            )
        schedule_daily(context.application, cid, row(cid)["send_time"] or "08:00")
        if m == "preg":
            upsert(cid, state="await_preg_date")
            return await q.message.reply_text("Поздравляю! \U0001F930 Чтобы Айва считала срок, ПДР и неделю беременности, напиши дату начала последних месячных. Например: 25.05.2026. Если знаешь ПДР, напиши дату и добавь слово ПДР.")
        upsert(cid, state="await_profile")
        if m == "male":
            return await q.message.reply_text(
                "Принято. Напиши рост, вес и возраст через пробел — так рекомендации по питанию и нагрузке будут точнее. Например: 180 80 30. Можно пропустить и добавить позже.", reply_markup=SKIP_KB)
        return await q.message.reply_text(
            "Поняла. Айва не будет считать стандартные фазы цикла, но всё равно сможет давать персональные рекомендации по самочувствию, питанию и движению.\n\n"
            "Чтобы советы были точнее, напиши рост, вес и возраст через пробел. Например: 168 60 30. Можно пропустить и добавить позже.", reply_markup=SKIP_KB)
    u, st = status_of(cid)
    if not st and not is_onboarded(u):
        return await need_onboard(q.message)
    general = st is None
    today_s = dtoday().isoformat()
    if is_male_profile(u) and data in {
        "calendar", "addcycles", "cyclelen", "period", "period_today", "guides",
    }:
        upsert(cid, state=None, pending_date=None)
        ev(cid, "male_mode_block", meta="callback_" + data)
        return await q.message.reply_text(MALE_PROFILE_FUNCTION_TEXT)
    if data == "menu":
        _rows = []
        if AIWA_WEBAPP_URL:
            _rows.append([InlineKeyboardButton(APP_BUTTON_TEXT, web_app=WebAppInfo(url=webapp_url(u) or AIWA_WEBAPP_URL))])
        await q.message.reply_text(
            "Всё управление — в приложении по кнопке ниже. А здесь просто напиши или скажи, что нужно: вопрос, блюдо или тренировку.",
            reply_markup=InlineKeyboardMarkup(_rows) if _rows else None)
    elif data == "today":
        await push_summary(context, cid)
    elif data == "more":
        await q.message.reply_text(
            "Ещё возможности:",
            reply_markup=(MALE_MORE_KB if is_male_profile(u) else MORE_KB),
        )
    elif data == "edit":
        await q.message.reply_text(
            "Что изменить?",
            reply_markup=(MALE_EDIT_KB if is_male_profile(u) else EDIT_KB),
        )
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
        await q.message.reply_text(report_prompt(u), reply_markup=HIST_KB)
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
        upsert(cid, state=dialog.begin(ACT_CYCLE_LEN.name).state)
        await q.message.reply_text("Какая у тебя средняя длина цикла в днях? Обычно 21-35. Напиши число, например 28.")
    elif data == "period":
        upsert(cid, state=dialog.begin(ACT_PERIOD_DATE.name).state)
        await q.message.reply_text("Напиши дату начала последних месячных, например 25.05.2026, или нажми кнопку. Потом даты можно редактировать в приложении.", reply_markup=PERIOD_KB)
    elif data == "period_today":
        mark_period(context, cid, today_s)
        await q.message.reply_text("Отметила начало месячных сегодня. Вот свежая сводка:")
        await push_summary(context, cid)
    elif data == "set:time":
        upsert(cid, state=dialog.begin(ACT_SETTIME.name).state)
        await q.message.reply_text("Во сколько присылать сводку (МСК)? Выбери или впиши своё время, например 09:00.", reply_markup=time_kb())
    elif data == "toggle:summary":
        if not is_onboarded(u):
            return await need_onboard(q.message)
        enabled = not bool((row(cid) or {}).get("daily_summary_enabled", True))
        upsert(cid, daily_summary_enabled=int(enabled))
        if enabled:
            schedule_daily(context.application, cid, (row(cid) or {}).get("send_time") or "08:00")
        else:
            _remove_daily_jobs(context.application, cid)
        ev(cid, "manual", meta=("summary_notifications_on" if enabled else "summary_notifications_off"))
        await q.message.reply_text(
            "Утренние сводки включены." if enabled else
            "Утренние сводки выключены. Сводку по-прежнему можно открыть вручную в приложении или командой /today."
        )
    elif data.startswith("tm:"):
        hhmm = data.split(":", 1)[1]
        set_daily_time(context.application, cid, hhmm)
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
    elif data.startswith("wdel:"):
        try:
            workout_del(cid, int(data.split(":")[1])); await safe_edit(q, "🗑 Убрала тренировку.")
        except Exception: pass
    elif data.startswith("q:"):
        question = get_sugg(int(data.split(":")[1])) or "Дай рекомендацию"
        ev(cid, "user_message", meta="suggest", n=len(question))
        await context.bot.send_chat_action(cid, "typing")
        if general:
            usage = []; ans = await think_llm(context, cid, L.general_answer, llm_profile_of(u), u.get("mode"), question, hint=chat_hint(cid), history=hist_get(cid, male=is_male_profile(u)), usage=usage)
            hist_push(cid, question, ans)
            await send_answer(context, cid, ans, None, question, usage=usage, quote=question)
        else:
            usage = []; ans = await think_llm(context, cid, L.answer_question, st, question, llm_profile_of(u), hist_get(cid, male=is_male_profile(u)), usage=usage)
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
                "Упс, что-то пошло не так. Попробуй ещё раз.")
        await admin_alert(context.application, "handler_error",
            f"⚠️ Ошибка обработчика: {type(err).__name__}\nЖурнал: journalctl -u aiwa на i167.")
    except Exception: pass

async def admin_alert(app, key, text, cooldown=900):
    # AIWA_ALERT_CHATS (список через запятую, поддерживает канал -100...)
    # имеет приоритет над AIWA_ADMIN — операционные алерты идут в мониторинг.
    raw = (os.environ.get("AIWA_ALERT_CHATS") or "").strip() or str(AIWA_ADMIN or "").strip()
    if not raw:
        return
    now = time.time()
    if now - ALERT_LAST.get(key, 0) < cooldown:
        return
    ALERT_LAST[key] = now
    for chat in raw.split(","):
        chat = chat.strip()
        if not chat:
            continue
        try:
            chat_id = int(chat)
        except Exception:
            chat_id = chat
        try:
            await app.bot.send_message(chat_id, "🚨 AIWA alert\n\n" + text)
        except Exception as e:
            log.warning("admin_alert %s: %s", chat, e)

async def load_logger(app):
    """Раз в минуту пишет в лог сводку нагрузки: вызовы модели, средняя латентность, очередь рассылки, число юзеров."""
    while True:
        await asyncio.sleep(60)
        try:
            s = L.pop_stats(); calls = s["calls"]
            avg = (s["ms"] // calls) if calls else 0
            q = BCAST_Q.qsize() if BCAST_Q is not None else 0
            wq = s.get("queued", 0); wms = (s.get("wait_ms", 0) // calls) if calls else 0
            ai_jobs = await asyncio.to_thread(_ai_job_status_counts)
            log.info(
                "LOAD/60s llm_calls=%d avg_ms=%d wait_ms=%d queued=%d err=%d "
                "bcast_q=%d event_q=%d ai_queued=%d ai_running=%d ai_failed=%d users=%d",
                calls, avg, wms, wq, s["err"], q, _EVENT_WRITE_Q.qsize(),
                ai_jobs.get("queued", 0), ai_jobs.get("running", 0),
                ai_jobs.get("failed", 0), len(all_users(include_synthetic=True)),
            )
            err_threshold = int(os.environ.get("AIWA_ALERT_LLM_ERRS", "2"))
            if calls and s["err"] >= err_threshold and (s["err"] / calls) >= 0.5:
                await admin_alert(app, "llm_errors",
                    f"Модель отвечает нестабильно: ошибок {s['err']} из {calls} вызовов за последнюю минуту.\n"
                    f"Средняя задержка: {avg} мс, очередь модели: {wq}.", cooldown=600)
            q_threshold = int(os.environ.get("AIWA_ALERT_BCAST_Q", "250"))
            if q >= q_threshold:
                await admin_alert(app, "broadcast_queue",
                    f"Очередь рассылки выросла до {q}. Возможно, модель или Telegram тормозит.", cooldown=600)
            ai_threshold = int(os.environ.get("AIWA_ALERT_TODAY_Q", "1200"))
            if ai_jobs.get("queued", 0) >= ai_threshold:
                await admin_alert(
                    app, "today_queue",
                    f"Очередь персональных сводок выросла до {ai_jobs['queued']}. "
                    "Обычные экраны продолжают обслуживаться, новые сводки получают fallback.",
                    cooldown=600,
                )
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

async def traction_worker():
    """Durable, privacy-safe delivery to the external Disrupt Analytics module."""
    url = os.environ.get("AIWA_TRACTION_URL", "").strip()
    token = os.environ.get("AIWA_TRACTION_TOKEN", "").strip()
    if not url:
        log.info("traction delivery disabled: AIWA_TRACTION_URL is not set")
        return
    for attempt in range(5):
        try:
            await asyncio.to_thread(A2.seed_traction_outbox, DB)
            break
        except sqlite3.OperationalError as exc:
            if "locked" not in str(exc).lower() or attempt == 4:
                log.warning("traction seed failed: %s", exc)
                break
            await asyncio.sleep(0.25 * (attempt + 1))
        except Exception as exc:
            log.warning("traction seed failed: %s", exc)
            break
    delay = 2
    while True:
        try:
            batch = await asyncio.to_thread(A2.traction_batch, DB, 200)
            if not batch:
                delay = 2; await asyncio.sleep(10); continue
            headers = {"Content-Type": "application/json"}
            if token: headers["X-Ingest-Token"] = token
            def _post():
                return requests.post(url, json={"events": batch}, headers=headers, timeout=10)
            response = await asyncio.to_thread(_post)
            if response.status_code < 200 or response.status_code >= 300:
                raise RuntimeError("HTTP " + str(response.status_code))
            await asyncio.to_thread(A2.traction_ack, DB, [item["event_id"] for item in batch])
            log.info("traction delivered: %d", len(batch)); delay = 2
        except Exception as exc:
            log.warning("traction delivery failed: %s", exc)
            await asyncio.sleep(delay); delay = min(delay * 2, 300)

async def on_startup(app):
    global BOT_USERNAME, BCAST_Q, FOOD_Q, TRAIN_Q, _AI_JOB_WAKE, _AI_JOB_TASKS
    global _AI_BACKGROUND_SEM, _FOOD_VISION_SEM, _FOOD_VISION_WAITERS
    global _FOOD_ASSET_CANDIDATES, _FOOD_ASSET_TASKS, _FOOD_ASSET_EXECUTOR
    # Fail before scheduling/sending anything if the boundary protecting real
    # users from synthetic load identities is malformed.
    _synthetic_user_id_min()
    try:
        import concurrent.futures
        _ex_threads = max(8, min(128, int(os.environ.get("AIWA_EXECUTOR_THREADS", "32"))))
        asyncio.get_running_loop().set_default_executor(concurrent.futures.ThreadPoolExecutor(max_workers=_ex_threads))
        log.info("default executor threads: %d", _ex_threads)
    except Exception as e:
        log.warning("executor: %s", e)
    if AIWA_WEBAPP_URL:
        try:
            await app.bot.set_chat_menu_button(menu_button=MenuButtonWebApp(text=APP_MENU_BUTTON_TEXT, web_app=WebAppInfo(url=webapp_url(None) or AIWA_WEBAPP_URL)))
        except Exception as e:
            log.warning("menu button: %s", e)
        # редизайн раскатан: персональные кнопки тест-группы возвращаем на общий URL
        for _rid in _REDESIGN_IDS:
            try:
                await app.bot.set_chat_menu_button(chat_id=int(_rid),
                    menu_button=MenuButtonWebApp(text=APP_MENU_BUTTON_TEXT, web_app=WebAppInfo(url=AIWA_WEBAPP_URL)))
            except Exception as e:
                log.warning("redesign menu button %s: %s", _rid, e)
    try:
        await app.bot.set_my_commands([
            BotCommand("start", "Старт"),
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
    # asyncio synchronization primitives belong to the running application
    # loop, not the module-import loop used by tests or process bootstrap.
    _AI_BACKGROUND_SEM = asyncio.Semaphore(_AI_BACKGROUND_CONCURRENCY)
    _FOOD_VISION_SEM = asyncio.Semaphore(_FOOD_VISION_CONCURRENCY)
    _FOOD_VISION_WAITERS = 0
    _AI_JOB_WAKE = asyncio.Event()
    await asyncio.to_thread(_recover_ai_jobs)
    _AI_JOB_TASKS = [
        asyncio.create_task(_ai_job_worker(i), name=f"aiwa-today-worker-{i}")
        for i in range(_AI_TODAY_WORKERS)
    ]
    _AI_JOB_WAKE.set()
    log.info("durable today workers started: %d", _AI_TODAY_WORKERS)
    loaded_assets = await asyncio.to_thread(_load_generated_food_assets)
    if FA.generation_enabled():
        import concurrent.futures
        recovered_assets = await asyncio.to_thread(_recover_food_asset_jobs)
        _FOOD_ASSET_CANDIDATES = asyncio.Queue(maxsize=_FOOD_ASSET_QUEUE_MAX)
        _FOOD_ASSET_EXECUTOR = concurrent.futures.ThreadPoolExecutor(
            max_workers=_FOOD_ASSET_WORKERS,
            thread_name_prefix="aiwa-food-assets",
        )
        _FOOD_ASSET_TASKS = [
            asyncio.create_task(
                _food_asset_worker(i), name=f"aiwa-food-asset-worker-{i}"
            )
            for i in range(_FOOD_ASSET_WORKERS)
        ]
        log.info(
            "food asset workers started: workers=%d daily_max=%d loaded=%d recovered=%d",
            _FOOD_ASSET_WORKERS, _FOOD_ASSET_DAILY_MAX, loaded_assets,
            recovered_assets,
        )
    else:
        _FOOD_ASSET_CANDIDATES = None
        _FOOD_ASSET_TASKS = []
        log.info("food asset generation disabled; loaded=%d", loaded_assets)
    BCAST_Q = asyncio.Queue()
    _bw = max(1, min(20, int(os.environ.get("AIWA_BROADCAST_WORKERS", "10"))))
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
            app.job_queue.run_daily(proactive_job_mid, time=dtime(14, 0, tzinfo=TZ), name="proactive_mid")
            app.job_queue.run_daily(proactive_job_eve, time=dtime(19, 30, tzinfo=TZ), name="proactive_eve")
            log.info("proactive engine ON (shadow=%s)", os.environ.get("AIWA_PROACTIVE_SHADOW", "1"))
        except Exception as _pe:
            log.warning("proactive schedule: %s", _pe)
    asyncio.create_task(load_logger(app))
    asyncio.create_task(model_probe(app))
    asyncio.create_task(traction_worker())
    _backfill_push_suppressions()
    n = catchup = 0
    for cid in all_users():
        u = row(cid) or {}
        hhmm = u.get("send_time") or "08:00"
        schedule_daily(app, cid, hhmm)
        if u.get("daily_summary_enabled", True):
            n += 1
        if u.get("daily_summary_enabled", True) and should_catchup_broadcast(cid, hhmm):
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
        if not _hmac.compare_digest(calc, rh): return None
        auth_date = int(pairs.get("auth_date") or 0)
        max_age = max(60, int(os.environ.get("AIWA_INIT_DATA_MAX_AGE_SECONDS", "86400")))
        now = int(time.time())
        # Reject replayed credentials and implausible timestamps from the future.
        if not auth_date or auth_date < now - max_age or auth_date > now + 60:
            return None
        import json as _j
        telegram_user = _j.loads(pairs.get("user", "{}"))
        cid = telegram_user.get("id") if isinstance(telegram_user, dict) else None
        if cid is not None:
            # The whole user object is covered by Telegram's signature. Its
            # display name is still user-controlled, so storage/prompt helpers
            # sanitize and delimit it before use.
            _store_telegram_first_name(cid, telegram_user.get("first_name"))
        return cid
    except Exception as e:
        log.warning("init verify: %s", e); return None
def _cors(resp):
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    resp.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    resp.headers["Cache-Control"] = "no-store"
    resp.headers["X-Content-Type-Options"] = "nosniff"
    resp.headers["Referrer-Policy"] = "no-referrer"
    return resp
_REDESIGN_IDS = set(x.strip().strip('"').strip("'") for x in (os.environ.get("AIWA_REDESIGN_IDS", "") or "").split(",") if x.strip())
def redesign_on(cid):
    """Редизайн раскатан на всех; AIWA_REDESIGN=0 вернёт старый апп всем (аварийный откат)."""
    if os.environ.get("AIWA_REDESIGN", "1") in ("0", "false", "False", "off"): return False
    return True

async def _serve_index2(request):
    BD = os.path.dirname(os.path.abspath(__file__))
    p = os.path.join(BD, "webapp2", "index.html")
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as fh: html_text = fh.read()
        return web.Response(text=html_text, content_type="text/html",
                            headers={"Cache-Control": "no-store, no-cache, must-revalidate, max-age=0", "Pragma": "no-cache"})
    return web.Response(text="redesign webapp not found", status=404)

async def _serve_index(request):
    # Редизайн раскатан на всех: базовый URL — новый мини-апп.
    # Старый фронт остаётся на ?ui=1 как аварийный откат.
    if request.query.get("ui") != "1":
        return await _serve_index2(request)
    BD = os.path.dirname(os.path.abspath(__file__))
    for p in (os.path.join(WEB_DIR, "index.html"), os.path.join(BD, "index.html"),
              os.path.join(BD, "webapp.html"), os.path.join(BD, "aiwa_webapp.html")):
        if os.path.exists(p):
            with open(p, "r", encoding="utf-8") as fh: html_text = fh.read()
            return web.Response(text=html_text, content_type="text/html",
                                headers={"Cache-Control": "no-store, no-cache, must-revalidate, max-age=0", "Pragma": "no-cache"})
    return web.Response(text="webapp not found", status=404)

def _today_cache_keys(cid, mode, *, generation=None, revision=None, day=None):
    generation = _user_generation(cid) if generation is None else int(generation)
    revision = (
        _TODAY_CACHE_REVISION.get(cid, 0) if revision is None else int(revision)
    )
    day = day or dtoday().isoformat()
    mode = str(mode or "")
    return (
        (cid, generation, revision, day, mode),
        f"{generation}:{revision}:{mode}",
    )


async def _prewarm_today(cid):
    """Schedule one durable daily-summary job without waiting for the model."""
    try:
        u = row(cid)
        if not is_onboarded(u): return
        generation = _user_generation(cid)
        revision = _TODAY_CACHE_REVISION.get(cid, 0)
        ck, disk_key = _today_cache_keys(
            cid, u.get("mode") or "", generation=generation, revision=revision,
        )
        hit = (
            _TODAY_CACHE.get(ck)
            or dc_get(cid, "today", disk_key)
            or dc_get(cid, "today", u.get("mode") or "")
        )
        if hit and _user_write_allowed(cid, generation) and (
            revision == _TODAY_CACHE_REVISION.get(cid, 0)
        ):
            return
        _, st = status_of(cid)
        await asyncio.to_thread(_enqueue_today_job, cid, u, st)
        if _AI_JOB_WAKE is not None:
            _AI_JOB_WAKE.set()
    except Exception as e:
        log.info("today prewarm %s: %s", cid, e)

async def _api_log_history(request):
    """История журнала: непустые записи симптомов/энергии/настроения для главной."""
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    c = db()
    rows = c.execute(
        "SELECT log_date,energy,mood,symptoms FROM logs WHERE chat_id=? "
        "AND (COALESCE(symptoms,'')!='' OR energy IS NOT NULL OR mood IS NOT NULL) "
        "ORDER BY log_date DESC LIMIT 60", (cid,)).fetchall()
    c.close()
    items = [{"d": r[0], "energy": r[1], "mood": r[2],
              "symptoms": (r[3].split(",") if r[3] else [])} for r in rows]
    ev(cid, "button", meta="web_log_history")
    return _cors(web.json_response({"items": items}))

# Недельный разбор питания: кэш на день, собирается из дневника за 7 дней.
_WEEK_FOOD_CACHE = {}
_WEEK_FOOD_REVISION = {}

def _evict_today_cache(cid):
    """Сводка дня зависит от чек-ина, циклов и профиля — сбрасываем при их изменении."""
    _TODAY_CACHE_REVISION[cid] = _TODAY_CACHE_REVISION.get(cid, 0) + 1
    for k in [k for k in _TODAY_CACHE if k[0] == cid]:
        _TODAY_CACHE.pop(k, None)
    dc_del(cid, "today")

def _evict_week_food_cache(cid):
    _WEEK_FOOD_REVISION[cid] = _WEEK_FOOD_REVISION.get(cid, 0) + 1
    for k in [k for k in _WEEK_FOOD_CACHE if k[0] == cid]:
        _WEEK_FOOD_CACHE.pop(k, None)
    dc_del(cid, "week_food")

def _invalidate_mode_dependent_state(cid):
    """Drop every derived answer that may have been built for another mode."""
    _evict_today_cache(cid)
    _evict_week_food_cache(cid)
    menu_cache_clear(cid)
    section_cache_clear(cid)
    prepared_summary_clear(cid)
    dc_del(cid)
    CHAT_HIST.pop(cid, None)
    for key in [key for key in list(_CARD_CACHE) if key and key[0] == cid]:
        _CARD_CACHE.pop(key, None)

async def _api_week_food_review(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    generation = _user_generation(cid)
    u = row(cid)
    if not is_onboarded(u): return _cors(web.json_response({"error": "onboard"}, status=403))
    if not _user_write_allowed(cid, generation):
        return _cors(web.json_response(
            _api_error_payload("deleted", "Профиль уже удалён."), status=409
        ))
    revision = _WEEK_FOOD_REVISION.get(cid, 0)
    cache_key = f"{generation}:{revision}:v2"
    ck = (cid, generation, revision, dtoday().isoformat(), "v2")
    hit = _WEEK_FOOD_CACHE.get(ck) or dc_get(cid, "week_food", cache_key)
    if hit:
        # Publish first, then validate. If /stop or a diary mutation won after
        # the read, its generation/revision change is now observable and this
        # old key is removed again; if it wins after the checks, its own
        # invalidation clears the entry.
        _WEEK_FOOD_CACHE[ck] = hit
        if not _user_write_allowed(cid, generation):
            _WEEK_FOOD_CACHE.pop(ck, None)
            return _cors(web.json_response(
                _api_error_payload("deleted", "Профиль уже удалён."), status=409
            ))
        if revision != _WEEK_FOOD_REVISION.get(cid, 0):
            _WEEK_FOOD_CACHE.pop(ck, None)
            return _cors(web.json_response(
                _api_error_payload(
                    "stale_review", "Дневник изменился — запусти разбор ещё раз."
                ), status=409
            ))
        return _cors(web.json_response({"ok": True, "review": hit}))
    lines = []
    for off in range(6, -1, -1):
        d = (dtoday() - timedelta(days=off)).isoformat()
        meals = meals_of(cid, d); tot = diary_totals(cid, d)
        if not meals: continue
        dishes = ", ".join(f"{m.get('title')} ({round(m.get('kcal') or 0)} ккал)" for m in meals[:8])
        lines.append(f"{d}: {dishes}; итог {round(tot.get('kcal') or 0)} ккал, Б{round(tot.get('protein') or 0)} Ж{round(tot.get('fat') or 0)} У{round(tot.get('carbs') or 0)}")
    if not lines:
        return _cors(web.json_response({"ok": False, "text": "За неделю в дневнике пусто — добавь приёмы, и я сделаю разбор."}))
    prof = profile_of(u) or {}
    profile_line = f"цель {prof.get('kcal_goal') or profile_kcal(prof) or '—'} ккал/день" if prof else ""
    try:
        usage = []
        review = await llm_to_thread(
            cid, "week_food_review", L.week_food_review, "\n".join(lines),
            profile_line, usage, user_generation=generation,
        )
        if not _user_write_allowed(cid, generation):
            return _cors(web.json_response(
                _api_error_payload("deleted", "Профиль уже удалён."), status=409
            ))
        if revision != _WEEK_FOOD_REVISION.get(cid, 0):
            return _cors(web.json_response(
                _api_error_payload(
                    "stale_review", "Дневник изменился — запусти разбор ещё раз."
                ), status=409
            ))
        if usage:
            ev(
                cid, "tokens", sum(usage), meta="week_food", calls=len(usage),
                usage=usage, user_generation=generation,
            )
        if len(_WEEK_FOOD_CACHE) > 1000: _WEEK_FOOD_CACHE.clear()
        _WEEK_FOOD_CACHE[ck] = review
        stored = dc_put_for_generation(
            cid, "week_food", review, cache_key, generation
        )
        if stored is False:
            _WEEK_FOOD_CACHE.pop(ck, None)
            return _cors(web.json_response(
                _api_error_payload("deleted", "Профиль уже удалён."), status=409
            ))
        # A mutation can win after the pre-publication equality check. The old
        # revision key makes that write unreachable; remove it as well so an
        # invalidation cannot leave persisted stale data behind.
        if revision != _WEEK_FOOD_REVISION.get(cid, 0):
            _WEEK_FOOD_CACHE.pop(ck, None)
            dc_del_key(cid, "week_food", cache_key)
            return _cors(web.json_response(
                _api_error_payload(
                    "stale_review", "Дневник изменился — запусти разбор ещё раз."
                ), status=409
            ))
        return _cors(web.json_response({"ok": True, "review": review}))
    except Exception as e:
        log.warning("week food review %s: %s", cid, e)
        ev(
            cid, "fallback", meta="static:week_food_fail",
            user_generation=generation,
        )
        return _cors(web.json_response({"ok": False, "text": "Не получилось собрать разбор, попробуй чуть позже."}, status=502))

# Рецепты меню: кэш на день, чтобы повторный тап по блюду не жёг токены.
_RECIPE_CACHE = {}

async def _prewarm_recipes(cid, dishes):
    """Фоновый прогрев рецептов для блюд меню — карточка открывается мгновенно."""
    for dish in dishes[:4]:
        dish = str(dish or "").strip()[:80]
        if not dish: continue
        ck = (dish.lower(), dtoday().isoformat(), "v2")
        if _RECIPE_CACHE.get(ck) or dc_get(cid, "recipe", dish.lower()): continue
        try:
            usage = []
            rec = await llm_to_thread(cid, "recipe", L.recipe, dish, usage)
            if usage: ev(cid, "tokens", sum(usage), meta="recipe", calls=len(usage), usage=usage)
            if len(_RECIPE_CACHE) > 300: _RECIPE_CACHE.clear()
            _RECIPE_CACHE[ck] = rec
            dc_put(cid, "recipe", rec, dish.lower())
        except Exception as e:
            log.info("recipe prewarm «%s»: %s", dish, e)

async def _api_recipe(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    dish = str(body.get("dish") or "").strip()[:80]
    if not dish: return _cors(web.json_response({"error": "no dish"}, status=400))
    ck = (dish.lower(), dtoday().isoformat(), "v2")
    hit = _RECIPE_CACHE.get(ck) or dc_get(cid, "recipe", dish.lower())
    if hit:
        _RECIPE_CACHE[ck] = hit
        return _cors(web.json_response(hit))
    try:
        usage = []
        rec = await llm_to_thread(cid, "recipe", L.recipe, dish, usage)
        if usage: ev(cid, "tokens", sum(usage), meta="recipe", calls=len(usage), usage=usage)
        if len(_RECIPE_CACHE) > 300: _RECIPE_CACHE.clear()
        _RECIPE_CACHE[ck] = rec
        dc_put(cid, "recipe", rec, dish.lower())
        return _cors(web.json_response(rec))
    except Exception as e:
        log.warning("recipe %s «%s»: %s", cid, dish, e)
        ev(cid, "fallback", meta="static:recipe_fail")
        return _cors(web.json_response({"error": "generation"}, status=502))

async def _api_food_prompt(request):
    """Кнопка «Текстом»: бот просит нейтрально описать приём пищи."""
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u): return _cors(web.json_response({"ok": False}))
    try:
        ev(cid, "button", meta="web_food_prompt")
        upsert(
            cid,
            state="await_food_text",
            pending_date=datetime.now(TZ).isoformat(),
        )
        if BOT_APP:
            question = (
                "Что было в приёме пищи? Напиши обычным текстом — например "
                "«200 г творога и банан» — я посчитаю КБЖУ и запишу в дневник."
            )
            await BOT_APP.bot.send_message(cid, question)
        return _cors(web.json_response({"ok": True}))
    except Exception as e:
        upsert(cid, state=None, pending_date=None)
        log.warning("food_prompt %s: %s", cid, e)
        return _cors(web.json_response({"ok": False}))

async def _api_nudge(request):
    """Новый фронт: перед переключением в чат бот присылает туда сообщение, чтобы чат не был пустым."""
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u): return _cors(web.json_response({"ok": False}))
    topic = str(body.get("topic") or "")[:20]
    cycle_user = is_cycle(u) and bool(u.get("last_period"))
    ctx_word = "под фазу" if cycle_user else "под твою цель"
    prompts = {"food": (f"Обсудим питание: могу разобрать твой дневник за сегодня, собрать меню {ctx_word} или ответить про конкретные продукты.",
                        ["Разбери мой дневник", "Что съесть на ужин?"]),
               "train": (f"Обсудим нагрузку: подберу тренировку {ctx_word} с учётом последних занятий или отвечу про восстановление.",
                         ["Собери тренировку", "Что с восстановлением?"])}
    if cycle_user:
        default = ("Я здесь. Спрашивай про цикл, самочувствие, питание или нагрузку — отвечу с учётом твоих данных.",
                   ["Что по циклу сегодня?", "Что съесть сегодня?"])
    else:
        default = ("Я здесь. Спрашивай про питание, тренировки и самочувствие — отвечу с учётом твоих данных.",
                   ["Что съесть сегодня?", "Собери тренировку"])
    text, suggs = prompts.get(topic, default)
    try:
        if BOT_APP:
            kb = sugg_kb(cid, suggs, app_user=u)
            await BOT_APP.bot.send_message(cid, text, reply_markup=kb)
        ev(cid, "button", meta="web_nudge")
        return _cors(web.json_response({"ok": True}))
    except Exception as e:
        log.warning("nudge %s: %s", cid, e)
        return _cors(web.json_response({"ok": False}))

async def _api_data(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    return await asyncio.to_thread(_api_data_sync, cid, body)


def _estimated_period_length(period_len, closed_lengths):
    """One estimate for API display and absolute journal mutations."""
    lengths = [int(value) for value in closed_lengths if 1 <= int(value) <= 10]
    try:
        explicit = int(period_len) if period_len else None
    except (TypeError, ValueError):
        explicit = None
    estimate = explicit or (round(sum(lengths) / len(lengths)) if lengths else 5)
    return max(1, min(10, int(estimate)))


def _mode_dependent_snapshot(cid, u):
    """Canonical mode state shared by /api/data and /api/mode receipts.

    The mode mutation can be acknowledged before a follow-up /api/data read
    succeeds.  Returning every mode-owned field (including explicit empty
    collections) lets the host replace stale cycle/pregnancy state rather than
    trying to infer which keys should survive a transition.
    """
    mode = (u or {}).get("mode") or "cycle"
    cycle_user = is_cycle(u)
    cycle_active = bool(cycle_user and u.get("last_period"))
    stored_periods = [] if is_male_profile(u) else periods_of(cid)
    snapshot = {
        "mode": mode,
        "cycle": cycle_active,
        "last_period": u.get("last_period") if cycle_user else None,
        "cycle_len": (u.get("cycle_len") or 28) if cycle_user else None,
        "periods": [],
        "cycles": [],
        "past_periods": [dict(period) for period in stored_periods],
        "stats": {},
        "preg": None,
        "day": None,
        "phase": None,
        "days_to_next": None,
        "days_since": None,
        "status": None,
        "delay_days": None,
    }
    if cycle_active or mode == "irregular":
        if cycle_active:
            stt = C.cycle_status(
                date.fromisoformat(u["last_period"]), u.get("cycle_len") or 28
            )
            snapshot.update({
                "day": stt["day"], "phase": stt["phase"],
                "days_to_next": stt["days_to_next"],
                "days_since": stt["days_since"], "status": stt["status"],
                "delay_days": stt["delay_days"],
            })
        periods = [dict(period) for period in stored_periods]
        if u.get("period_end"):
            for period in periods:
                if period["start"] == u.get("last_period") and not period.get("end"):
                    period["end"] = u["period_end"]
        cycles = [period["start"] for period in periods]
        snapshot["cycles"] = cycles
        snapshot["periods"] = periods
        cycle_lengths = []
        for index in range(1, len(cycles)):
            length = (
                date.fromisoformat(cycles[index])
                - date.fromisoformat(cycles[index - 1])
            ).days
            if 10 <= length <= 90:
                cycle_lengths.append(length)
        period_lengths = []
        for period in periods:
            if period.get("end"):
                length = (
                    date.fromisoformat(period["end"])
                    - date.fromisoformat(period["start"])
                ).days + 1
                if 1 <= length <= 10:
                    period_lengths.append(length)
        regularity = None
        if len(cycle_lengths) >= 2:
            mean = sum(cycle_lengths) / len(cycle_lengths)
            deviation = (
                sum((value - mean) ** 2 for value in cycle_lengths)
                / len(cycle_lengths)
            ) ** 0.5
            regularity = (
                "регулярный" if deviation <= 2.5
                else ("умеренный разброс" if deviation <= 5 else "нерегулярный")
            )
        history = [{
            "start": periods[index]["start"],
            "end": periods[index].get("end"),
            "period_len": (
                date.fromisoformat(periods[index]["end"])
                - date.fromisoformat(periods[index]["start"])
            ).days + 1 if periods[index].get("end") else None,
            "len": (
                date.fromisoformat(cycles[index + 1])
                - date.fromisoformat(cycles[index])
            ).days if index + 1 < len(cycles) else None,
        } for index in range(len(cycles))]
        snapshot["stats"] = {
            "cycles_count": len(cycles),
            "last_cycle_len": cycle_lengths[-1] if cycle_lengths else None,
            "avg_cycle": round(sum(cycle_lengths) / len(cycle_lengths)) if cycle_lengths else None,
            "min_cycle": min(cycle_lengths) if cycle_lengths else None,
            "max_cycle": max(cycle_lengths) if cycle_lengths else None,
            "spread": (max(cycle_lengths) - min(cycle_lengths)) if cycle_lengths else None,
            "period_len": period_lengths[-1] if period_lengths else u.get("period_len"),
            "avg_period": round(sum(period_lengths) / len(period_lengths)) if period_lengths else None,
            "regularity": regularity,
            "history": history,
        }
        # Expose the same estimated current range used by the full data load.
        for period in snapshot["periods"]:
            if period["start"] == u.get("last_period") and not period.get("end"):
                estimate = _estimated_period_length(u.get("period_len"), period_lengths)
                virtual_end = min(
                    dtoday(),
                    date.fromisoformat(period["start"])
                    + timedelta(days=max(1, estimate) - 1),
                )
                if virtual_end >= date.fromisoformat(period["start"]):
                    period["end"] = virtual_end.isoformat()
                    period["end_estimated"] = True
    elif mode == "preg" and u.get("last_period"):
        snapshot["preg"] = C.preg_status(u["last_period"])
    return snapshot


def _api_data_sync(cid, body):
    u = row(cid)
    if not u or not is_onboarded(u): return _cors(web.json_response({"onboarded": False}))
    ev(cid, "button", meta="app_open")
    campaign = re.sub(r"[^a-zA-Z0-9_.:-]", "", str(body.get("campaign") or ""))[:80]
    if campaign:
        ev(cid, "push_open", meta=campaign)
        if campaign.split(":", 1)[0] == "daily_summary":
            ev(cid, "summary_open", meta="daily_summary")
    chatlog = chatlog_get(cid, 60)
    if is_male_profile(u):
        chatlog = _male_safe_history(chatlog, text_key="text")
    out = {"onboarded": True,
           "today": dtoday().isoformat(), "timezone": str(TZ),
           "name": (body.get("name") or ""), "pa": pa_list(cid), "chatlog": chatlog,
           "bot_username": BOT_USERNAME,
           "partner_linked": bool(partner_of(cid)),
           "proactive_enabled": bool(u.get("proactive_enabled", True)),
           "daily_summary_enabled": bool(u.get("daily_summary_enabled", True)),
           "today_log": log_get(cid, dtoday().isoformat()) or {"symptoms": []},
           "send_time": u.get("send_time") or "08:00",
           "profile": {"height": u.get("height"), "weight": u.get("weight"), "age": u.get("age"),
                       "activity": u.get("activity"), "diet": u.get("diet") or "", "diet_note": u.get("diet_note") or "", "kcal_goal": u.get("kcal_goal")}}
    # The shared selected-day strip reaches 364 days.  Every writable journal
    # draft must therefore seed from the same canonical window; otherwise an
    # older absolute save would mistake an unloaded record for an empty one.
    out["sym_log"] = logs_of(
        cid, (dtoday() - timedelta(days=READ_HISTORY_DAYS)).isoformat()
    )
    out.update(_mode_dependent_snapshot(cid, u))
    try:
        _pr = profile_of(u)
        out["kcal_base"] = profile_kcal(_pr)[0] if _pr else None
    except Exception:
        out["kcal_base"] = None
    try:
        out["streak"] = streak_of(cid)
    except Exception:
        out["streak"] = 0
    return _cors(web.json_response(out))
def _normalize_journal_payload(body):
    parsed, error, status = _validated_moscow_iso(
        body.get("date"), max_age=READ_HISTORY_DAYS
    )
    if error:
        return None, error, status
    missing = [key for key in ("energy", "mood", "symptoms", "intimacy") if key not in body]
    if missing:
        return None, _api_error_payload(
            "missing_fields", "Не хватает полей журнала: " + ", ".join(missing) + "."
        ), 400

    levels = {}
    for key in ("energy", "mood"):
        value = body.get(key)
        if isinstance(value, bool) or not isinstance(value, int) or not 0 <= value <= 3:
            return None, _api_error_payload(
                "invalid_" + key, f"Поле {key} должно быть целым числом от 0 до 3."
            ), 400
        levels[key] = value or None

    raw_symptoms = body.get("symptoms")
    if not isinstance(raw_symptoms, list) or len(raw_symptoms) > 64:
        return None, _api_error_payload(
            "invalid_symptoms", "Симптомы должны быть списком не более чем из 64 отметок."
        ), 400
    symptoms = set()
    for raw in raw_symptoms:
        code = str(raw or "")
        if code in SYM:
            symptoms.add(code)
            continue
        if code.startswith("custom:"):
            custom = clean_custom_symptom(code.split(":", 1)[1])
            if custom:
                symptoms.add("custom:" + custom)
                continue
        return None, _api_error_payload(
            "invalid_symptom", "Одна из отметок симптомов не поддерживается."
        ), 400

    custom_symptoms = body.get("custom_symptoms", [])
    if not isinstance(custom_symptoms, list) or len(custom_symptoms) > 16:
        return None, _api_error_payload(
            "invalid_custom_symptoms", "Свои симптомы должны быть списком не более чем из 16 отметок."
        ), 400
    for raw in custom_symptoms:
        code = symptom_code(str(raw or ""))
        if not code:
            return None, _api_error_payload(
                "invalid_custom_symptom", "Свой симптом не может быть пустым."
            ), 400
        symptoms.add(code)

    intimacy = body.get("intimacy")
    if not isinstance(intimacy, bool):
        return None, _api_error_payload(
            "invalid_intimacy", "Отметка близости должна быть true или false."
        ), 400
    period_supplied = "period" in body
    period = body.get("period")
    if period_supplied and not isinstance(period, bool):
        return None, _api_error_payload(
            "invalid_period", "Отметка месячных должна быть true или false."
        ), 400
    if period_supplied and parsed != dtoday():
        return None, _api_error_payload(
            "period_date", "Из журнала месячные можно отметить только за сегодня."
        ), 400
    return {
        "date": parsed.isoformat(),
        "energy": levels["energy"],
        "mood": levels["mood"],
        "symptoms": sorted(symptoms),
        "intimacy": intimacy,
        "period_supplied": period_supplied,
        "period": period if period_supplied else None,
    }, None, 200


def _journal_period_marked_conn(c, cid, target):
    row_ = c.execute(
        """SELECT start_date,end_date FROM cycles
           WHERE chat_id=? AND start_date<=?
           ORDER BY start_date DESC LIMIT 1""",
        (cid, target),
    ).fetchone()
    if not row_:
        return False
    start = date.fromisoformat(row_[0])
    end = _journal_period_effective_end_conn(c, cid, row_[0], row_[1])
    return start <= date.fromisoformat(target) <= end


def _journal_period_effective_end_conn(c, cid, start_iso, end_iso):
    if end_iso:
        return date.fromisoformat(end_iso)
    user = c.execute(
        "SELECT period_len FROM users WHERE chat_id=?", (cid,)
    ).fetchone()
    rows = c.execute(
        """SELECT start_date,end_date FROM cycles
           WHERE chat_id=? AND end_date IS NOT NULL""",
        (cid,),
    ).fetchall()
    closed_lengths = [
        (date.fromisoformat(end) - date.fromisoformat(start)).days + 1
        for start, end in rows
    ]
    length = _estimated_period_length((user or [None])[0], closed_lengths)
    return date.fromisoformat(start_iso) + timedelta(days=length - 1)


def _sync_latest_period_conn(c, cid):
    latest = c.execute(
        """SELECT start_date,end_date FROM cycles
           WHERE chat_id=? ORDER BY start_date DESC LIMIT 1""",
        (cid,),
    ).fetchone()
    if not latest:
        c.execute(
            "UPDATE users SET last_period=NULL,period_end=NULL,period_len=NULL WHERE chat_id=?",
            (cid,),
        )
        return
    start, stored_end = latest[0], latest[1]
    if stored_end:
        length = (date.fromisoformat(stored_end) - date.fromisoformat(start)).days + 1
        c.execute(
            """UPDATE users SET last_period=?,period_end=?,period_len=?
               WHERE chat_id=?""",
            (start, stored_end, length, cid),
        )
    else:
        # An older open range uses the user's established period length for the
        # same estimated display as /api/data.  Removing a newer one-day range
        # must not collapse that history to a fabricated one-day period.
        c.execute(
            "UPDATE users SET last_period=?,period_end=NULL WHERE chat_id=?",
            (start, cid),
        )


def _set_today_period_absolute_conn(c, cid, target, marked):
    """Set today's actual period state without toggle semantics."""
    target_date = date.fromisoformat(target)
    latest = c.execute(
        """SELECT start_date,end_date FROM cycles
           WHERE chat_id=? AND start_date<=?
           ORDER BY start_date DESC LIMIT 1""",
        (cid, target),
    ).fetchone()
    current = _journal_period_marked_conn(c, cid, target)
    if current == marked:
        return current

    if marked:
        extended = False
        if latest:
            end = _journal_period_effective_end_conn(
                c, cid, latest[0], latest[1]
            )
            if end == target_date - timedelta(days=1):
                c.execute(
                    "UPDATE cycles SET end_date=? WHERE chat_id=? AND start_date=?",
                    (target, cid, latest[0]),
                )
                extended = True
        if not extended:
            c.execute(
                "INSERT INTO cycles(chat_id,start_date,end_date) VALUES(?,?,?)",
                (cid, target, target),
            )
    elif latest:
        start = date.fromisoformat(latest[0])
        end = _journal_period_effective_end_conn(c, cid, latest[0], latest[1])
        if start == target_date:
            c.execute(
                "DELETE FROM cycles WHERE chat_id=? AND start_date=?",
                (cid, latest[0]),
            )
        elif start < target_date and (
            latest[1] is None
            or target_date <= end
        ):
            previous = (target_date - timedelta(days=1)).isoformat()
            c.execute(
                "UPDATE cycles SET end_date=? WHERE chat_id=? AND start_date=?",
                (previous, cid, latest[0]),
            )
    _sync_latest_period_conn(c, cid)
    return _journal_period_marked_conn(c, cid, target)


def _save_journal_atomic(cid, body, user_generation=None):
    normalized, error, status = _normalize_journal_payload(body)
    if error:
        return error, status
    target = normalized["date"]
    c = db()
    try:
        c.execute("BEGIN IMMEDIATE")
        if not _user_write_allowed(cid, user_generation, conn=c):
            c.rollback()
            return _api_error_payload("deleted", "Профиль уже удалён."), 409
        user = c.execute("SELECT mode FROM users WHERE chat_id=?", (cid,)).fetchone()
        if not user:
            c.rollback()
            return _api_error_payload("onboard", "Сначала настрой Айву."), 403
        mode = user[0] or "cycle"
        if normalized["period_supplied"] and mode in ("preg", "meno", "male", "none"):
            c.rollback()
            return _api_error_payload(
                "profile_mode", "В текущем режиме нельзя отмечать месячные."
            ), 409

        c.execute(
            """INSERT INTO logs(chat_id,log_date,energy,mood,symptoms)
               VALUES(?,?,?,?,?)
               ON CONFLICT(chat_id,log_date) DO UPDATE SET
                 energy=excluded.energy,
                 mood=excluded.mood,
                 symptoms=excluded.symptoms""",
            (
                cid, target, normalized["energy"], normalized["mood"],
                ",".join(normalized["symptoms"]),
            ),
        )
        if normalized["intimacy"]:
            c.execute(
                "INSERT OR IGNORE INTO intimacy(chat_id,d) VALUES(?,?)",
                (cid, target),
            )
        else:
            c.execute("DELETE FROM intimacy WHERE chat_id=? AND d=?", (cid, target))

        period = None
        if normalized["period_supplied"]:
            period = _set_today_period_absolute_conn(
                c, cid, target, normalized["period"]
            )
        elif target == dtoday().isoformat():
            period = _journal_period_marked_conn(c, cid, target)

        canonical = c.execute(
            "SELECT energy,mood,symptoms FROM logs WHERE chat_id=? AND log_date=?",
            (cid, target),
        ).fetchone()
        canonical_intimacy = bool(c.execute(
            "SELECT 1 FROM intimacy WHERE chat_id=? AND d=?", (cid, target)
        ).fetchone())
        c.commit()
    except Exception as exc:
        try:
            c.rollback()
        except sqlite3.Error:
            pass
        log.warning("atomic journal save failed for %s/%s: %s", cid, target, exc)
        return _api_error_payload(
            "journal_save_failed", "Не удалось сохранить журнал. Попробуй ещё раз."
        ), 500
    finally:
        c.close()

    _evict_today_cache(cid)
    ev(
        cid, "manual", meta="web_journal_atomic",
        user_generation=user_generation,
    )
    ev(
        cid, "goal", meta="web_checkin_complete",
        user_generation=user_generation,
    )
    payload = {
        "ok": True,
        "date": target,
        "log": {
            "energy": canonical[0],
            "mood": canonical[1],
            "symptoms": canonical[2].split(",") if canonical[2] else [],
        },
        "intimacy": canonical_intimacy,
    }
    if period is not None:
        payload["period"] = bool(period)
    return payload, 200


async def _api_journal(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    generation = _user_generation(cid)
    if not is_onboarded(row(cid)):
        return _cors(web.json_response({"error": "onboard"}, status=403))
    payload, status = await asyncio.to_thread(
        _save_journal_atomic, cid, body, generation
    )
    return _cors(web.json_response(payload, status=status))


async def _api_period(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    generation = _user_generation(cid)
    if is_male_profile(row(cid)):
        ev(
            cid, "male_mode_block", meta="api_period",
            user_generation=generation,
        )
        return _cors(web.json_response(
            {"ok": False, "error": "profile_mode", "text": MALE_PROFILE_FUNCTION_TEXT},
            status=409,
        ))
    action = body.get("action"); ds = body.get("date")
    d = None
    if action in ("start", "delete", "end"):
        d, error, status = _validated_moscow_iso(
            ds, max_age=READ_HISTORY_DAYS,
            field="date",
        )
        if error:
            return _cors(web.json_response(error, status=status))
    if action == "start":
        _evict_today_cache(cid)
        db_mark_period(cid, d.isoformat(), user_generation=generation)
        ev(
            cid, "manual", meta="web_period_start",
            user_generation=generation,
        )
        return _cors(web.json_response({"ok": True}))
    if action == "replace":
        periods = body.get("periods")
        if periods is None:
            return _cors(web.json_response(
                _api_error_payload(
                    "invalid_periods", "Передай полную историю месячных списком."
                ), status=400
            ))
        if not isinstance(periods, list):
            return _cors(web.json_response(
                _api_error_payload(
                    "invalid_periods", "История месячных должна быть списком."
                ), status=400
            ))
        clean = []
        for index, period in enumerate(periods):
            if not isinstance(period, dict) or not period.get("start"):
                return _cors(web.json_response(
                    _api_error_payload(
                        "invalid_period", f"Период №{index + 1} заполнен неверно."
                    ), status=400
                ))
            start, error, status = _validated_moscow_iso(
                period.get("start"), max_age=READ_HISTORY_DAYS,
                field="start",
            )
            if error:
                return _cors(web.json_response(error, status=status))
            end, error, status = _validated_moscow_iso(
                period.get("end") or period.get("start"),
                max_age=READ_HISTORY_DAYS, field="end",
            )
            if error:
                return _cors(web.json_response(error, status=status))
            length = (end - start).days + 1
            if not 1 <= length <= 10:
                return _cors(web.json_response(
                    _api_error_payload(
                        "invalid_period_range",
                        "Каждый период должен длиться от 1 до 10 дней.",
                    ), status=400
                ))
            clean.append((start.isoformat(), end.isoformat()))
        clean.sort(key=lambda period: period[0])
        for index in range(1, len(clean)):
            previous_start, previous_end = clean[index - 1]
            current_start, _ = clean[index]
            if current_start <= previous_end:
                return _cors(web.json_response(
                    _api_error_payload(
                        "overlapping_periods",
                        "Периоды не должны повторяться или пересекаться.",
                    ), status=400
                ))
        starts = [s for s, _ in clean]
        latest = max(starts) if starts else None
        latest_end = next((e for s, e in clean if s == latest), latest)
        length = (
            (date.fromisoformat(latest_end) - date.fromisoformat(latest)).days + 1
            if latest else None
        )
        c = db()
        try:
            c.execute("BEGIN IMMEDIATE")
            if not _user_write_allowed(cid, generation, conn=c):
                c.rollback()
                return _cors(web.json_response(
                    _api_error_payload("deleted", "Профиль уже удалён."), status=409
                ))
            c.execute("DELETE FROM cycles WHERE chat_id=?", (cid,))
            c.executemany(
                "INSERT INTO cycles(chat_id,start_date,end_date) VALUES(?,?,?)",
                [(cid, start, end) for start, end in clean],
            )
            if latest:
                c.execute(
                    """UPDATE users SET last_period=?,mode='cycle',period_end=?,period_len=?
                       WHERE chat_id=?""",
                    (latest, latest_end, length, cid),
                )
            else:
                c.execute(
                    "UPDATE users SET last_period=NULL,period_end=NULL,period_len=NULL WHERE chat_id=?",
                    (cid,),
                )
            c.commit()
        except Exception:
            c.rollback()
            raise
        finally:
            c.close()
        _evict_today_cache(cid)
        ev(
            cid, "manual", meta="web_period_replace",
            user_generation=generation,
        )
        return _cors(web.json_response({"ok": True}))
    if action == "delete":
        _evict_today_cache(cid)
        period_delete_at(cid, d.isoformat())
        cyc = cycles_of(cid)
        upsert(cid, last_period=(max(cyc) if cyc else None))
        ev(cid, "manual", meta="web_period_del", user_generation=generation)
        return _cors(web.json_response({"ok": True}))
    if action == "end":
        u = row(cid); ok = False
        start_iso = body.get("start")
        if start_iso:
            parsed_start, error, status = _validated_moscow_iso(
                start_iso, max_age=READ_HISTORY_DAYS, field="start"
            )
            if error:
                return _cors(web.json_response(error, status=status))
            start_iso = parsed_start.isoformat()
        else:
            start_iso = period_start_at_or_before(cid, d.isoformat())
        if is_cycle(u) and start_iso:
            ln = (d - date.fromisoformat(start_iso)).days + 1
            if not 1 <= ln <= 10:
                return _cors(web.json_response(
                    _api_error_payload(
                        "invalid_period_range",
                        "Конец периода должен быть в пределах 10 дней от начала.",
                    ), status=400
                ))
            _evict_today_cache(cid)
            cyc_set_end(cid, start_iso, d.isoformat())
            if start_iso == u.get("last_period"):
                upsert(cid, period_end=d.isoformat(), period_len=ln)
            ok = True
        ev(cid, "manual", meta="web_period_end", user_generation=generation)
        return _cors(web.json_response({"ok": ok}))
    return _cors(web.json_response({"error": "bad action"}, status=400))
async def _api_pa(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    d, error, status = _validated_moscow_iso(body.get("date"))
    if error:
        return _cors(web.json_response(error, status=status))
    marked = pa_toggle(cid, d.isoformat()); ev(cid, "manual", meta="web_pa")
    return _cors(web.json_response({"marked": marked}))
def _api_checkin_sync(cid, body):
    _evict_today_cache(cid)
    supplied = body.get("date") if "date" in body else dtoday().isoformat()
    parsed, error, status = _validated_moscow_iso(supplied)
    if error:
        error["_http_status"] = status
        return error
    ds = parsed.isoformat()
    energy = mood = None
    changed = False
    if body.get("energy"):
        try:
            energy = max(1, min(3, int(body["energy"])))
            changed = True
        except Exception: pass
    if body.get("mood"):
        try:
            mood = max(1, min(3, int(body["mood"])))
            changed = True
        except Exception: pass
    toggle_code = None
    if body.get("symptom"):
        code = str(body.get("symptom"))
        if code in SYM or code.startswith("custom:"):
            toggle_code = code
            changed = True
    add_code = None
    if body.get("custom_symptom"):
        code = symptom_code(str(body.get("custom_symptom")))
        if code:
            add_code = code
            changed = True
    c = db()
    try:
        c.execute("BEGIN IMMEDIATE")
        if not _user_write_allowed(cid, conn=c):
            c.rollback()
            return {"ok": False, "log": {"symptoms": []}}
        c.execute(
            "INSERT OR IGNORE INTO logs(chat_id,log_date,symptoms) VALUES(?,?,'')",
            (cid, ds),
        )
        row_ = c.execute(
            "SELECT energy,mood,symptoms FROM logs WHERE chat_id=? AND log_date=?",
            (cid, ds),
        ).fetchone()
        symptoms = set(x for x in ((row_[2] or "").split(",") if row_ else []) if x)
        if toggle_code:
            symptoms.symmetric_difference_update({toggle_code})
        if add_code:
            symptoms.add(add_code)
        c.execute(
            """UPDATE logs
               SET energy=?,mood=?,symptoms=?
               WHERE chat_id=? AND log_date=?""",
            (
                energy if energy is not None else (row_[0] if row_ else None),
                mood if mood is not None else (row_[1] if row_ else None),
                ",".join(sorted(symptoms)),
                cid,
                ds,
            ),
        )
        c.commit()
        result = {
            "energy": energy if energy is not None else (row_[0] if row_ else None),
            "mood": mood if mood is not None else (row_[1] if row_ else None),
            "symptoms": sorted(symptoms),
        }
    finally:
        c.close()
    if changed:
        ev(cid, "manual", meta="web_checkin")
        # In the mini app every successful field save is a completed check-in:
        # unlike the bot flow there is intentionally no separate “Готово” button.
        ev(cid, "goal", meta="web_checkin_complete")
    return {"ok": True, "log": result}

async def _api_checkin(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    payload = await asyncio.to_thread(_api_checkin_sync, cid, body)
    status = int(payload.pop("_http_status", 200))
    return _cors(web.json_response(payload, status=status))

async def _api_proactive(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    enabled = body.get("enabled")
    if not isinstance(enabled, bool):
        return _cors(web.json_response({"error": "bad_enabled"}, status=400))
    upsert(cid, proactive_enabled=int(enabled))
    ev(cid, "manual", meta=("web_proactive_on" if enabled else "web_proactive_off"))
    return _cors(web.json_response({"ok": True, "proactive_enabled": enabled}))

async def _api_daily_summary(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    generation = _user_generation(cid)
    previous = row(cid) or {}
    if not is_onboarded(previous): return _cors(web.json_response({"error": "onboard"}, status=403))
    enabled = body.get("enabled")
    if not isinstance(enabled, bool):
        return _cors(web.json_response({"error": "bad_enabled"}, status=400))
    send_time = previous.get("send_time") or "08:00"
    previous_enabled = bool(previous.get("daily_summary_enabled", True))
    if BOT_APP:
        try:
            schedule_daily(BOT_APP, cid, send_time, enabled=enabled)
        except Exception as exc:
            log.warning("summary notification reschedule: %s", exc)
            try:
                if _user_write_allowed(cid, generation):
                    schedule_daily(
                        BOT_APP, cid, send_time, enabled=previous_enabled
                    )
                else:
                    _remove_daily_jobs(BOT_APP, cid)
            except Exception as restore_exc:
                log.error("summary notification restore failed: %s", restore_exc)
            return _cors(web.json_response(
                _api_error_payload(
                    "schedule_failed",
                    "Не удалось обновить расписание сводки. Попробуй ещё раз.",
                ), status=503,
            ))
    try:
        stored = upsert(
            cid, user_generation=generation,
            daily_summary_enabled=int(enabled),
        )
    except Exception as exc:
        log.warning("summary setting save failed: %s", exc)
        if BOT_APP:
            try:
                if _user_write_allowed(cid, generation):
                    schedule_daily(
                        BOT_APP, cid, send_time, enabled=previous_enabled
                    )
                else:
                    _remove_daily_jobs(BOT_APP, cid)
            except Exception as restore_exc:
                log.error("summary notification restore failed: %s", restore_exc)
        return _cors(web.json_response(
            _api_error_payload(
                "settings_save_failed",
                "Не удалось сохранить настройку сводки. Попробуй ещё раз.",
            ), status=500,
        ))
    if not stored:
        if BOT_APP:
            try:
                _remove_daily_jobs(BOT_APP, cid)
            except Exception as remove_exc:
                log.error("deleted-user job cleanup failed: %s", remove_exc)
        return _cors(web.json_response(
            _api_error_payload("deleted", "Профиль уже удалён."), status=409
        ))
    ev(
        cid, "manual",
        meta=("summary_notifications_on" if enabled else "summary_notifications_off"),
        user_generation=generation,
    )
    return _cors(web.json_response({"ok": True, "daily_summary_enabled": enabled}))
def _save_profile_atomic(cid, generation, body, cm, kg, age):
    """Serialize profile fields with mode changes and return one DB snapshot."""
    c = db()
    try:
        c.execute("BEGIN IMMEDIATE")
        current = c.execute(
            """SELECT mode,last_period,cycle_len,height,weight,age,activity,
                      kcal_goal,send_time
               FROM users WHERE chat_id=?""",
            (cid,),
        ).fetchone()
        if not current or not _user_write_allowed(cid, generation, conn=c):
            c.rollback()
            return _api_error_payload("deleted", "Профиль уже удалён."), 409
        mode = current[0] or "cycle"
        current_user = {
            "mode": mode, "last_period": current[1], "cycle_len": current[2],
        }
        if not is_onboarded(current_user):
            c.rollback()
            return {"error": "onboard"}, 403

        cycle_len = None
        if is_cycle(current_user) and "cycle_len" in body:
            try:
                cycle_len = _strict_integer(body.get("cycle_len"))
                if not 15 <= cycle_len <= 60:
                    raise ValueError("cycle length out of range")
            except (TypeError, ValueError):
                c.rollback()
                return _api_error_payload(
                    "bad_cycle_len",
                    "Длина цикла должна быть целым числом от 15 до 60 дней.",
                ), 400

        sets = ["height=?", "weight=?", "age=?"]
        values = [int(cm), kg, age]
        if mode == "male":
            sets.extend([
                "last_period=NULL", "cycle_len=NULL", "period_end=NULL",
                "period_len=NULL",
            ])
        elif cycle_len is not None:
            sets.append("cycle_len=?")
            values.append(cycle_len)

        if "kcal_goal" in body:
            goal = body.get("kcal_goal")
            if goal in (None, "", 0, "0"):
                sets.append("kcal_goal=NULL")
            else:
                try:
                    parsed_goal = int(float(str(goal).replace(",", ".")))
                except (TypeError, ValueError):
                    parsed_goal = None
                if parsed_goal is not None:
                    sets.append("kcal_goal=?")
                    values.append(parsed_goal if 800 <= parsed_goal <= 6000 else None)

        values.append(cid)
        # Every identifier above is a fixed literal selected by this function.
        c.execute(
            "UPDATE users SET " + ",".join(sets) + " WHERE chat_id=?", values  # nosec B608
        )
        saved = c.execute(
            """SELECT mode,last_period,cycle_len,height,weight,age,activity,
                      diet,diet_note,kcal_goal,send_time
               FROM users WHERE chat_id=?""",
            (cid,),
        ).fetchone()
        c.commit()
    except Exception as exc:
        try: c.rollback()
        except sqlite3.Error: pass
        log.warning("profile save failed %s: %s", cid, exc)
        return _api_error_payload("profile_save_failed", "Не удалось сохранить профиль."), 500
    finally:
        c.close()

    saved_user = {
        "mode": saved[0] or "cycle", "last_period": saved[1],
        "cycle_len": saved[2], "height": saved[3], "weight": saved[4],
        "age": saved[5], "activity": saved[6], "diet": saved[7] or "",
        "diet_note": saved[8] or "", "kcal_goal": saved[9],
        "send_time": saved[10] or "08:00",
    }
    profile = profile_of(saved_user)
    return {
        "ok": True,
        "profile": {
            "height": int(cm), "weight": kg, "age": age,
            "kcal_goal": saved_user.get("kcal_goal"),
        },
        "cycle_len": saved_user.get("cycle_len") if is_cycle(saved_user) else None,
        "kcal_base": profile_kcal(profile)[0] if profile else None,
        "mode": saved_user["mode"],
        "send_time": saved_user["send_time"],
        "cycle_len_changed": cycle_len is not None,
    }, 200


async def _api_profile(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    generation = _user_generation(cid)
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
    payload, status = await asyncio.to_thread(
        _save_profile_atomic, cid, generation, body, cm, kg, age
    )
    if status != 200:
        return _cors(web.json_response(payload, status=status))
    _evict_today_cache(cid)
    cycle_len_changed = payload.pop("cycle_len_changed", False)
    send_time = payload.pop("send_time", "08:00")
    payload.pop("mode", None)
    if cycle_len_changed:
        if BOT_APP:
            try:
                if _user_write_allowed(cid, generation):
                    schedule_daily(BOT_APP, cid, send_time)
            except Exception as e: log.warning("reschedule: %s", e)
    menu_cache_clear(cid)
    ev(cid, "manual", meta="web_profile", user_generation=generation)
    return _cors(web.json_response(payload))
async def _api_meal(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid); _, st = status_of(cid)
    if not is_onboarded(u):
        return _cors(web.json_response({"error": "onboard"}, status=403))
    prof = profile_of(u); target = profile_kcal(prof) if prof else None; usage = []
    meal = await llm_to_thread(
        cid, "meal_replacement", L.replace_meal, st, body.get("slot", 0),
        body.get("dish"), prof, target, usage, u.get("mode"),
    )
    ev(cid, "button", meta="web_meal_replace", usage=usage)
    ev(cid, "tokens", sum(usage), meta="meal", calls=len(usage), usage=usage)
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
    if not code or len(code) < 24:
        code = secrets.token_urlsafe(24); set_partner_code(cid, code)
    link = f"https://t.me/{BOT_USERNAME}?start=p_{code}" if BOT_USERNAME else ""
    pid = partner_of(cid)
    ev(cid, "button", meta="web_partner")
    return _cors(web.json_response({"code": code, "link": link, "linked": bool(pid)}))
def _food_ctx(u, st):
    if st:
        return f"Сейчас {st.get('subphase','')} {st['phase_ru'].lower()} фаза, день {st['day']} цикла."
    return {
        "male": (
            "Мужской профиль: никаких тем менструального цикла, фаз или "
            "женской физиологии."
        ),
        "meno": "Режим менопаузы.",
        "preg": "Беременность.",
        "irregular": "Нерегулярный цикл.",
        "none": "Месячных сейчас нет.",
    }.get(u.get("mode"), "")

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
    txt = "; ".join(parts)
    try:
        fav = favorite_activities(cid)
    except Exception:
        fav = []
    if fav:
        txt += (". Её собственные активности за последние 2 месяца: "
                + ", ".join("%s (%s раз)" % (t, n) for t, n in fav)
                + " — когда уместно по нагрузке и самочувствию, предлагай их "
                  "или похожие по духу, а не только стандартный набор.")
    return txt

def _recent_syms_text(cid, day=None):
    lg = log_get(cid, day or dtoday().isoformat()) or {}
    out = []
    e = lg.get("energy"); m = lg.get("mood")
    if e: out.append("энергия " + {1: "низкая", 2: "средняя", 3: "высокая"}.get(e, str(e)))
    if m: out.append("настроение " + {1: "плохое", 2: "нормальное", 3: "хорошее"}.get(m, str(m)))
    n = len(lg.get("symptoms") or [])
    if n: out.append(f"симптомов отмечено: {n}")
    return ", ".join(out)

_SECTION_CACHE = {}
_SECTION_TASKS = {}
_SECTION_FAST_WAIT_SECONDS = 0.75
_SECTION_PENDING_LIMIT = max(
    8, min(512, int(os.environ.get("AIWA_SECTION_PENDING_MAX", "96")))
)
_SECTION_RETRY_AFTER_MS = max(
    3_000, min(120_000, int(os.environ.get("AIWA_SECTION_RETRY_AFTER_MS", "8000")))
)

def section_cache_clear(cid):
    for key in [key for key in list(_SECTION_CACHE) if key and key[0] == cid]:
        _SECTION_CACHE.pop(key, None)
    for key in [key for key in list(_SECTION_TASKS) if key and key[0] == cid]:
        task = _SECTION_TASKS.pop(key, None)
        if task and not task.done():
            task.cancel()

def _section_key(cid, kind, u, st):
    """Cache generated Mini App sections by the data that can change their answer."""
    profile = profile_of(u) or {}
    snapshot = {
        "mode": u.get("mode"),
        "profile": {k: profile.get(k) for k in (
            "height", "weight", "age", "activity", "diet", "diet_note", "kcal_goal"
        )},
        "cycle": ({k: st.get(k) for k in (
            "day", "cycle_len", "phase", "subphase", "days_to_next", "status"
        )} if st else None),
    }
    if kind == "training":
        snapshot["recent"] = _recent_workouts_text(cid)
        snapshot["checkin"] = log_get(cid, dtoday().isoformat()) or {}
    raw = json.dumps(snapshot, ensure_ascii=False, sort_keys=True, default=str)
    return (cid, dtoday().isoformat(), kind, _hashlib.sha256(raw.encode("utf-8")).hexdigest())

def _section_fallback(cid, kind, u, st):
    """Fast deterministic response shown while the personal model result is prepared."""
    prof = profile_of(u)
    if kind == "training":
        pregnancy = None
        if u.get("mode") == "preg" and u.get("last_period"):
            try:
                pregnancy = C.preg_status(u["last_period"])
            except Exception:
                pregnancy = None
        plan = (L.training_plan(st, prof) if st is not None
                else L.general_training(prof, u.get("mode")))
        # The pregnancy safety override is deterministic and must also apply
        # before the background model call has completed.
        if u.get("mode") == "preg":
            checkin = log_get(cid, dtoday().isoformat()) or {}
            symptoms = set(checkin.get("symptoms") or [])
            if checkin.get("energy") == 1 or symptoms.intersection({"preg_cramp", "preg_swelling"}):
                plan = L.training_today(
                    None, prof, None, "preg", pregnancy=pregnancy, checkin=checkin
                )
        return {"text": plan.get("summary", ""), "training": plan}

    target = profile_kcal(prof) if prof else None
    if st is not None:
        text = st["content"]["food"]
        phase_key = st.get("phase") or "follicular"
    else:
        text = {
            "meno": "В менопаузе важны белок, кальций, витамин D, омега-3 и стабильный сахар.",
            "preg": "В беременности важны белок, фолаты, железо, кальций и безопасные продукты.",
            "irregular": "Без чёткой фазы опирайся на белок, клетчатку, сложные углеводы и регулярность.",
            "none": "Сбалансированная база на день: белок, овощи, сложные углеводы и вода.",
        }.get(u.get("mode"), "Сбалансированная база на день: белок, овощи, сложные углеводы и вода.")
        phase_key = "follicular"
    restrictions = bool(prof and ((prof.get("diet") or "").strip() or (prof.get("diet_note") or "").strip()))
    out = {"kcal": (target[0] if target else None), "text": text,
           "suggestions": ["Что выбрать на завтрак?", "Как добрать белок?", "Что есть вечером?"]}
    # A generic menu must never override explicit allergies/restrictions.
    if not restrictions:
        menu = json.loads(json.dumps(L.CURATED_MENU.get(
            phase_key, L.CURATED_MENU["follicular"]
        ), ensure_ascii=False))
        out["menu"] = FA.decorate_menu(L._scale_menu(menu, target))
    return out

async def _generate_section(cid, kind, u, st, key):
    """Generate one section once, then make it instantly reusable."""
    generation = _user_generation(cid)
    try:
        prof = profile_of(u)
        if kind == "food":
            target = profile_kcal(prof) if prof else None
            usage = []
            menu = await llm_to_thread(
                cid, "menu_generation", menu_cached, cid, st, prof, target,
                (u.get("mode") if st is None else None), usage,
                user_generation=generation,
            )
            if usage:
                ev(cid, "tokens", sum(usage), meta="menu", calls=len(usage), usage=usage)
            menu = FA.decorate_menu(menu)
            _offer_food_asset_candidates(menu.get("meals") or [])
            if target:
                menu["macros"] = {
                    "protein": f"{target[1]} г", "fat": f"{target[2]} г",
                    "carbs": f"{target[3]} г",
                }
            fallback = _section_fallback(cid, "food", u, st)
            dynamic = _food_dynamic_section_on(cid)
            text = str(
                menu.get("summary") if dynamic else fallback["text"]
            ).strip() or fallback["text"]
            suggestions = [
                str(item).strip()
                for item in (
                    (menu.get("suggestions") or fallback["suggestions"])
                    if dynamic else fallback["suggestions"]
                )
                if str(item).strip()
            ][:3]
            payload = {"menu": menu, "kcal": (target[0] if target else None),
                       "text": text, "suggestions": suggestions}
            try:
                asyncio.create_task(_prewarm_recipes(cid, [m.get("dish") for m in (menu.get("meals") or [])]))
            except Exception:
                pass
        else:
            pregnancy = None
            if u.get("mode") == "preg" and u.get("last_period"):
                try:
                    pregnancy = C.preg_status(u["last_period"])
                except Exception:
                    pregnancy = None
            usage = []
            plan = await llm_to_thread(
                cid, "training_recommendation", L.training_today,
                st, prof, _recent_workouts_text(cid), u.get("mode"), usage,
                pregnancy=pregnancy, checkin=log_get(cid, dtoday().isoformat()),
                user_generation=generation,
            )
            if isinstance(plan, dict) and plan.pop("_fallback", None):
                ev(cid, "fallback", meta="static:training_plan")
            if usage:
                ev(cid, "tokens", sum(usage), meta="training_today",
                   calls=len(usage), usage=usage)
            payload = {"text": plan.get("summary", ""), "training": plan}
        if not _user_write_allowed(cid, generation=generation):
            return _section_fallback(cid, kind, u, st)
        _SECTION_CACHE[key] = payload
        _prune_day(_SECTION_CACHE)
        return payload
    except Exception:
        log.exception("miniapp section generation failed: cid=%s kind=%s", cid, kind)
        return _section_fallback(cid, kind, u, st)
    finally:
        if _SECTION_TASKS.get(key) is asyncio.current_task():
            _SECTION_TASKS.pop(key, None)

def _section_with_current_food_assets(payload, kind):
    result = dict(payload or {})
    if kind == "food" and isinstance(result.get("menu"), dict):
        result["menu"] = FA.decorate_menu(result["menu"])
    result["asset_revision"] = FA.RESOLVER.generated_revision()
    return result

async def _api_section(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid); _, st = status_of(cid); kind = body.get("kind", "food")
    if kind not in ("food", "training"):
        return _cors(web.json_response({"error": "bad_kind"}, status=400))
    if not body.get("refresh"):
        ev(cid, "button", meta="web_" + kind)
    if not is_onboarded(u):
        return _cors(web.json_response({"error": "onboard", "text": "Сначала настрой Айву в боте."}, status=403))
    key = _section_key(cid, kind, u, st)
    cached = _SECTION_CACHE.get(key)
    if cached is not None:
        payload = _section_with_current_food_assets(cached, kind)
        return _cors(web.json_response(dict(payload, cached=True, refreshing=False)))
    task = _SECTION_TASKS.get(key)
    if task is None:
        if len(_SECTION_TASKS) >= _SECTION_PENDING_LIMIT:
            payload = _section_with_current_food_assets(
                _section_fallback(cid, kind, u, st), kind
            )
            return _cors(web.json_response(dict(
                payload,
                cached=False,
                refreshing=False,
                capacity_limited=True,
                retry_after_ms=_SECTION_RETRY_AFTER_MS,
            )))
        task = asyncio.create_task(_generate_section(cid, kind, u, st, key))
        _SECTION_TASKS[key] = task
    # A tab must never inherit the provider's 30-60 second timeout. Give a warm
    # provider a short chance, otherwise return useful deterministic content
    # while the single shared task keeps preparing the personal result.
    try:
        payload = await asyncio.wait_for(asyncio.shield(task), timeout=_SECTION_FAST_WAIT_SECONDS)
        payload = _section_with_current_food_assets(payload, kind)
        return _cors(web.json_response(dict(payload, cached=False, refreshing=False)))
    except asyncio.TimeoutError:
        payload = _section_with_current_food_assets(
            _section_fallback(cid, kind, u, st), kind
        )
        return _cors(web.json_response(dict(
            payload,
            cached=False,
            refreshing=(
                _food_section_refresh_on()
                if kind == "food" else True
            ),
            retry_after_ms=_SECTION_RETRY_AFTER_MS,
        )))
    except Exception:
        payload = _section_with_current_food_assets(
            _section_fallback(cid, kind, u, st), kind
        )
        return _cors(web.json_response(dict(payload, cached=False, refreshing=False)))

async def _api_food_asset_revision(request):
    body = await request.json()
    if not _verify_init(body.get("initData", "")):
        return _cors(web.json_response({"error": "auth"}, status=401))
    response = _cors(
        web.json_response(
            {"revision": FA.RESOLVER.generated_revision()}
        )
    )
    response.headers["Cache-Control"] = "no-store"
    return response


# Food images use their own durable queue and executor. The interactive path
# only offers a tiny canonical tuple to a bounded asyncio queue; it never waits
# for SQLite, the image provider, conversion, or storage.
_FOOD_ASSET_CANDIDATES = None
_FOOD_ASSET_TASKS = []
_FOOD_ASSET_EXECUTOR = None
_FOOD_ASSET_SEEN = {}
_FOOD_ASSET_QUEUE_MAX = max(
    16, min(2048, int(os.environ.get("AIWA_FOOD_ASSET_QUEUE_MAX", "256")))
)
# The durable queue is SQLite-backed. Keep a single writer until the planned
# PostgreSQL/Redis phase provides row-level claims.
_FOOD_ASSET_WORKERS = 1
_FOOD_ASSET_SEEN_TTL_SECONDS = max(
    30, min(3600, int(os.environ.get("AIWA_FOOD_ASSET_SEEN_TTL_SECONDS", "300")))
)
_FOOD_ASSET_DAILY_MAX = max(
    1, min(500, int(os.environ.get("AIWA_FOOD_ASSET_DAILY_MAX", "40")))
)
_FOOD_ASSET_MAX_ATTEMPTS = max(
    1, min(5, int(os.environ.get("AIWA_FOOD_ASSET_MAX_ATTEMPTS", "3")))
)


def _offer_food_asset_candidates(records):
    if not FA.generation_enabled() or _FOOD_ASSET_CANDIDATES is None:
        return 0
    now = time.monotonic()
    expired = [
        key for key, expires_at in _FOOD_ASSET_SEEN.items()
        if expires_at <= now
    ]
    for key in expired:
        _FOOD_ASSET_SEEN.pop(key, None)
    offered = 0
    for record in records or []:
        if not isinstance(record, dict) or record.get("asset_state") != "missing":
            continue
        food_id = str(record.get("canonical_id") or "")
        label = FA.reviewed_generation_label(
            record.get("canonical_label") or record.get("dish") or record.get("title")
        )
        key = (food_id, FA.STYLE_VERSION)
        if (
            not food_id or not label
            or _FOOD_ASSET_SEEN.get(key, 0) > now
        ):
            continue
        try:
            _FOOD_ASSET_CANDIDATES.put_nowait((food_id, label))
            _FOOD_ASSET_SEEN[key] = now + _FOOD_ASSET_SEEN_TTL_SECONDS
            offered += 1
        except asyncio.QueueFull:
            break
    return offered


def _enqueue_food_asset_job(food_id, label):
    now = datetime.now(TZ).isoformat()
    job_id = secrets.token_hex(12)
    c = db()
    try:
        c.execute("BEGIN IMMEDIATE")
        asset = c.execute(
            """SELECT status,retry_after FROM food_assets
               WHERE canonical_id=? AND style_version=?""",
            (food_id, FA.STYLE_VERSION),
        ).fetchone()
        if asset and asset[0] == "ready":
            c.commit()
            return False
        if asset and asset[1] and asset[1] > now:
            c.commit()
            return False
        existing_job = c.execute(
            """SELECT job_id,status FROM food_asset_jobs
               WHERE canonical_id=? AND style_version=?""",
            (food_id, FA.STYLE_VERSION),
        ).fetchone()
        if existing_job and existing_job[1] in {"queued", "running", "completed"}:
            c.commit()
            return False
        if existing_job:
            c.execute(
                """UPDATE food_asset_jobs SET status='queued',attempts=0,
                       canonical_label=?,available_at=?,started_at=NULL,
                       finished_at=NULL,last_error_class=NULL
                   WHERE job_id=?""",
                (label, now, existing_job[0]),
            )
        else:
            c.execute(
                """INSERT INTO food_asset_jobs(
                       job_id,canonical_id,style_version,canonical_label,status,
                       created_at,available_at
                   ) VALUES(?,?,?,?,?,?,?)""",
                (job_id, food_id, FA.STYLE_VERSION, label, "queued", now, now),
            )
        c.execute(
            """INSERT INTO food_assets(
                   canonical_id,style_version,canonical_label,status,source,
                   updated_at
               ) VALUES(?,?,?,?,?,?)
               ON CONFLICT(canonical_id,style_version) DO UPDATE SET
                   canonical_label=excluded.canonical_label,
                   status=CASE WHEN food_assets.status='ready'
                               THEN food_assets.status ELSE 'pending' END,
                   updated_at=excluded.updated_at""",
            (food_id, FA.STYLE_VERSION, label, "pending", "generated", now),
        )
        c.commit()
        return True
    finally:
        c.close()


def _claim_food_asset_job():
    now = datetime.now(TZ)
    day_start = datetime.combine(now.date(), dtime.min, tzinfo=TZ).isoformat()
    c = db()
    try:
        c.execute("BEGIN IMMEDIATE")
        attempts_today = c.execute(
            """SELECT COUNT(*) FROM food_asset_attempts
               WHERE started_at>=?""",
            (day_start,),
        ).fetchone()[0]
        if attempts_today >= _FOOD_ASSET_DAILY_MAX:
            c.commit()
            return None
        row_ = c.execute(
            """SELECT job_id,canonical_id,canonical_label,attempts
               FROM food_asset_jobs
               WHERE status='queued' AND available_at<=?
               ORDER BY created_at LIMIT 1""",
            (now.isoformat(),),
        ).fetchone()
        if not row_:
            c.commit()
            return None
        changed = c.execute(
            """UPDATE food_asset_jobs
               SET status='running',started_at=?,attempts=attempts+1
               WHERE job_id=? AND status='queued'""",
            (now.isoformat(), row_[0]),
        ).rowcount
        if changed:
            c.execute(
                "INSERT INTO food_asset_attempts(job_id,started_at) VALUES(?,?)",
                (row_[0], now.isoformat()),
            )
            c.execute(
                """UPDATE food_assets SET status='generating',updated_at=?
                   WHERE canonical_id=? AND style_version=?
                     AND status!='ready'""",
                (now.isoformat(), row_[1], FA.STYLE_VERSION),
            )
            c.execute(
                "DELETE FROM food_asset_attempts WHERE started_at<?",
                ((now - timedelta(days=14)).isoformat(),),
            )
        c.commit()
        if not changed:
            return None
        return {
            "job_id": row_[0],
            "canonical_id": row_[1],
            "canonical_label": row_[2],
            "attempts": int(row_[3] or 0) + 1,
        }
    finally:
        c.close()


def _finish_food_asset_job(job, result=None, error=None):
    now = datetime.now(TZ)
    c = db()
    try:
        c.execute("BEGIN IMMEDIATE")
        if result:
            c.execute(
                """UPDATE food_asset_jobs SET status='completed',finished_at=?,
                       last_error_class=NULL WHERE job_id=?""",
                (now.isoformat(), job["job_id"]),
            )
            c.execute(
                """UPDATE food_assets SET status='ready',source='generated',
                       image_url=?,content_hash=?,prompt_version=?,
                       retry_after=NULL,last_error_class=NULL,updated_at=?
                   WHERE canonical_id=? AND style_version=?""",
                (
                    result["image_url"], result["content_hash"],
                    result.get("prompt_version") or FA.GENERATED_PROMPT_VERSION,
                    now.isoformat(), job["canonical_id"], FA.STYLE_VERSION,
                ),
            )
            c.commit()
            return "completed"
        error_class = str(error or "generation_failed")[:80]
        if job["attempts"] < _FOOD_ASSET_MAX_ATTEMPTS:
            delay = min(3600, 30 * (2 ** (job["attempts"] - 1)))
            available = (now + timedelta(seconds=delay)).isoformat()
            c.execute(
                """UPDATE food_asset_jobs SET status='queued',available_at=?,
                       started_at=NULL,last_error_class=? WHERE job_id=?""",
                (available, error_class, job["job_id"]),
            )
            c.execute(
                """UPDATE food_assets SET status='pending',last_error_class=?,
                       updated_at=? WHERE canonical_id=? AND style_version=?""",
                (
                    error_class, now.isoformat(), job["canonical_id"],
                    FA.STYLE_VERSION,
                ),
            )
            status = "queued"
        else:
            retry_after = (now + timedelta(days=7)).isoformat()
            c.execute(
                """UPDATE food_asset_jobs SET status='rejected',finished_at=?,
                       last_error_class=? WHERE job_id=?""",
                (now.isoformat(), error_class, job["job_id"]),
            )
            c.execute(
                """UPDATE food_assets SET status='rejected',retry_after=?,
                       last_error_class=?,updated_at=?
                   WHERE canonical_id=? AND style_version=?""",
                (
                    retry_after, error_class, now.isoformat(),
                    job["canonical_id"], FA.STYLE_VERSION,
                ),
            )
            status = "rejected"
        c.commit()
        return status
    finally:
        c.close()


def _load_generated_food_assets():
    c = db()
    try:
        rows = c.execute(
            """SELECT canonical_id,image_url FROM food_assets
               WHERE status='ready' AND source='generated'
                     AND image_url IS NOT NULL"""
        ).fetchall()
    finally:
        c.close()
    for food_id, image_url in rows:
        FA.RESOLVER.publish_generated(food_id, image_url)
    return len(rows)


def _recover_food_asset_jobs():
    """Make provider jobs durable across a process or host restart."""
    now = datetime.now(TZ).isoformat()
    c = db()
    try:
        changed = c.execute(
            """UPDATE food_asset_jobs
               SET status='queued',started_at=NULL,available_at=?
               WHERE status='running'""",
            (now,),
        ).rowcount
        c.execute(
            """UPDATE food_assets SET status='pending',updated_at=?
               WHERE status='generating'
                 AND EXISTS (
                     SELECT 1 FROM food_asset_jobs j
                     WHERE j.canonical_id=food_assets.canonical_id
                       AND j.style_version=food_assets.style_version
                       AND j.status='queued'
                 )""",
            (now,),
        )
        c.commit()
        return int(changed or 0)
    finally:
        c.close()


async def _food_asset_worker(worker_no):
    loop = asyncio.get_running_loop()
    last_overlay_refresh = 0.0
    while True:
        try:
            food_id, label = await asyncio.wait_for(
                _FOOD_ASSET_CANDIDATES.get(), timeout=1.0
            )
            try:
                await asyncio.to_thread(_enqueue_food_asset_job, food_id, label)
            except asyncio.CancelledError:
                raise
            except Exception as exc:
                _FOOD_ASSET_SEEN.pop((food_id, FA.STYLE_VERSION), None)
                log.warning(
                    "food asset enqueue failed: worker=%s error=%s",
                    worker_no, type(exc).__name__,
                )
            finally:
                _FOOD_ASSET_CANDIDATES.task_done()
        except asyncio.TimeoutError:
            pass
        except asyncio.CancelledError:
            raise
        try:
            job = await asyncio.to_thread(_claim_food_asset_job)
        except asyncio.CancelledError:
            raise
        except Exception as exc:
            log.warning(
                "food asset claim failed: worker=%s error=%s",
                worker_no, type(exc).__name__,
            )
            await asyncio.sleep(1)
            continue
        if not job:
            now = time.monotonic()
            if now - last_overlay_refresh >= 30:
                try:
                    await asyncio.to_thread(_load_generated_food_assets)
                    last_overlay_refresh = now
                except asyncio.CancelledError:
                    raise
                except Exception as exc:
                    log.warning(
                        "food asset overlay refresh failed: worker=%s error=%s",
                        worker_no, type(exc).__name__,
                    )
            continue
        try:
            result = await loop.run_in_executor(
                _FOOD_ASSET_EXECUTOR,
                FA.generate_and_store,
                job["canonical_label"],
                job["attempts"],
            )
            await asyncio.to_thread(_finish_food_asset_job, job, result, None)
            FA.RESOLVER.publish_generated(job["canonical_id"], result["image_url"])
            log.info(
                "food asset ready: worker=%s canonical_id=%s",
                worker_no, job["canonical_id"],
            )
        except Exception as exc:
            error = type(exc).__name__
            try:
                await asyncio.to_thread(
                    _finish_food_asset_job, job, None, error
                )
            except Exception as persistence_exc:
                log.error(
                    "food asset failure persistence failed: worker=%s error=%s",
                    worker_no, type(persistence_exc).__name__,
                )
            log.warning(
                "food asset failed: worker=%s canonical_id=%s error=%s",
                worker_no, job["canonical_id"], error,
            )


async def _shutdown_food_asset_workers():
    global _FOOD_ASSET_TASKS, _FOOD_ASSET_EXECUTOR
    tasks = list(_FOOD_ASSET_TASKS)
    for task in tasks:
        task.cancel()
    if tasks:
        await asyncio.gather(*tasks, return_exceptions=True)
    _FOOD_ASSET_TASKS = []
    executor = _FOOD_ASSET_EXECUTOR
    _FOOD_ASSET_EXECUTOR = None
    if executor is not None:
        executor.shutdown(wait=False, cancel_futures=True)
# Сводка дня в мини-аппе: кэш на день, чтобы апп открывался сразу, а не ждал модель.
_TODAY_CACHE = {}
_TODAY_CACHE_REVISION = {}
_AI_JOB_WAKE = None
_AI_JOB_TASKS = []
_AI_JOB_COMPLETIONS = deque(maxlen=200)
_AI_LLM_CONCURRENCY_LIMIT = max(
    1, min(64, int(os.environ.get("AIWA_LLM_CONCURRENCY", "8")))
)
_AI_CHAT_RESERVED_SLOTS = max(
    0,
    min(
        _AI_LLM_CONCURRENCY_LIMIT - 1,
        int(os.environ.get("AIWA_CHAT_RESERVED_SLOTS", "2")),
    ),
)
_AI_TODAY_WORKERS = max(
    1,
    min(
        32,
        int(os.environ.get("AIWA_TODAY_CONCURRENCY", "6")),
        _AI_LLM_CONCURRENCY_LIMIT - _AI_CHAT_RESERVED_SLOTS,
    ),
)
_AI_BACKGROUND_CONCURRENCY = max(
    1, _AI_LLM_CONCURRENCY_LIMIT - _AI_CHAT_RESERVED_SLOTS
)
_AI_BACKGROUND_SEM = None
_AI_JOB_MAX_ATTEMPTS = max(1, min(5, int(os.environ.get("AIWA_AI_JOB_MAX_ATTEMPTS", "3"))))
_AI_TODAY_QUEUE_MAX = max(100, int(os.environ.get("AIWA_TODAY_QUEUE_MAX", "1500")))
_FOOD_VISION_CONCURRENCY = max(
    1, min(64, int(os.environ.get("AIWA_FOOD_VISION_CONCURRENCY", "3")))
)
_FOOD_VISION_QUEUE_MAX = max(
    _FOOD_VISION_CONCURRENCY,
    min(500, int(os.environ.get("AIWA_FOOD_VISION_QUEUE_MAX", "50"))),
)
_FOOD_VISION_WAIT_SECONDS = max(
    1.0, min(180.0, float(os.environ.get("AIWA_FOOD_VISION_WAIT_SECONDS", "60")))
)
_FOOD_VISION_SEM = None
_FOOD_VISION_WAITERS = 0


def _loop_semaphore(current, limit):
    """Create asyncio primitives lazily and replace ones bound to another loop."""
    loop = asyncio.get_running_loop()
    bound_loop = getattr(current, "_loop", None)
    if current is None or (bound_loop is not None and bound_loop is not loop):
        return asyncio.Semaphore(limit)
    return current


def _ensure_ai_background_semaphore():
    global _AI_BACKGROUND_SEM
    _AI_BACKGROUND_SEM = _loop_semaphore(
        _AI_BACKGROUND_SEM, _AI_BACKGROUND_CONCURRENCY
    )
    return _AI_BACKGROUND_SEM


def _ensure_food_vision_semaphore():
    global _FOOD_VISION_SEM
    _FOOD_VISION_SEM = _loop_semaphore(
        _FOOD_VISION_SEM, _FOOD_VISION_CONCURRENCY
    )
    return _FOOD_VISION_SEM


async def _acquire_food_vision_slot():
    """Bound photo parsing and provider calls before they consume memory."""
    global _FOOD_VISION_WAITERS
    if _FOOD_VISION_WAITERS >= _FOOD_VISION_QUEUE_MAX:
        return False
    _FOOD_VISION_WAITERS += 1
    try:
        await asyncio.wait_for(
            _ensure_food_vision_semaphore().acquire(),
            timeout=_FOOD_VISION_WAIT_SECONDS,
        )
        return True
    except asyncio.TimeoutError:
        return False
    finally:
        _FOOD_VISION_WAITERS = max(0, _FOOD_VISION_WAITERS - 1)


def _release_food_vision_slot():
    _ensure_food_vision_semaphore().release()


def _today_note_mode_guard(mode, note):
    """Never expose cycle-derived content in a male profile, even if an LLM errs."""
    if not isinstance(note, dict):
        return note
    clean = {
        "summary": str(note.get("summary") or "").strip(),
        "suggestions": [
            str(item).strip()
            for item in (note.get("suggestions") or [])
            if str(item).strip()
        ][:3],
    }
    if mode != "male":
        for key in ("day", "phase"):
            if note.get(key) not in (None, ""):
                clean[key] = note[key]
        return clean
    visible = " ".join([clean["summary"], *clean["suggestions"]])
    if _male_suggestion_forbidden(visible):
        return {
            "summary": (
                "Сегодня ориентируйся на уровень энергии, качество сна и "
                "восстановление после нагрузки. Выбери умеренную активность и "
                "оставь запас сил; если усталость выше обычной, сократи темп и "
                "добавь отдых."
            ),
            "suggestions": [
                "Как оценить восстановление?",
                "Что съесть для энергии?",
                "Какая нагрузка подойдёт?",
            ],
        }
    return clean

def _today_job_payload(cid, u, st, cache_revision, target_day):
    return {
        "date": target_day,
        "mode": str(u.get("mode") or ""),
        "cache_revision": int(cache_revision),
        "profile": profile_of(u),
        "state": st,
        "recent_syms": _recent_syms_text(cid, target_day),
    }

def _today_job_key(cid, payload):
    raw = json.dumps(payload, ensure_ascii=False, sort_keys=True, default=str)
    digest = _hashlib.sha256(raw.encode("utf-8")).hexdigest()[:24]
    return f"today:{cid}:{payload['date']}:{payload['mode']}:{digest}"

def _enqueue_today_job(cid, _caller_u=None, _caller_st=None):
    # Callers may have taken their screen snapshot before /stop + /start. Pin
    # the lifecycle first, then rebuild every private input inside that pin so
    # an old profile can never be queued under the reactivated generation.
    generation = _user_generation(cid)
    revision = _TODAY_CACHE_REVISION.get(cid, 0)
    target_day = dtoday().isoformat()
    u, st = status_of(cid)
    if not is_onboarded(u):
        return None
    payload = _today_job_payload(cid, u, st, revision, target_day)
    dedupe_key = _today_job_key(cid, payload)
    now = datetime.now(TZ).isoformat()
    expires = datetime.combine(
        date.fromisoformat(target_day) + timedelta(days=2),
        dtime.min, tzinfo=TZ,
    ).isoformat()
    c = db()
    try:
        c.execute("BEGIN IMMEDIATE")
        if (
            not _user_write_allowed(cid, generation, conn=c)
            or revision != _TODAY_CACHE_REVISION.get(cid, 0)
            or target_day != dtoday().isoformat()
        ):
            c.rollback()
            return None
        existing = c.execute(
            """SELECT job_id,status,attempts,result_json,created_at,started_at,finished_at,
                      last_error_class
               FROM ai_jobs WHERE dedupe_key=?""",
            (dedupe_key,),
        ).fetchone()
        if not existing:
            active = c.execute(
                """SELECT COUNT(*) FROM ai_jobs
                   WHERE kind='today_note' AND status IN ('queued','running')"""
            ).fetchone()[0]
            if int(active or 0) >= _AI_TODAY_QUEUE_MAX:
                c.rollback()
                return {"status": "rejected", "reason": "queue_full"}
        job_id = "job_" + secrets.token_hex(16)
        if existing:
            # Terminal jobs intentionally redact their health payload/result.
            # If the durable day cache is unavailable, reuse the dedupe row as
            # fresh work instead of leaving the client on a permanent fallback.
            if existing[1] in {"completed", "failed", "expired", "superseded"} and not existing[3]:
                c.execute(
                    """UPDATE ai_jobs
                       SET user_generation=?,status='queued',attempts=0,
                           payload_json=?,available_at=?,expires_at=?,
                           started_at=NULL,finished_at=NULL,result_json=NULL,
                           last_error_class=NULL
                       WHERE job_id=?""",
                    (
                        generation,
                        json.dumps(
                            payload, ensure_ascii=False, separators=(",", ":"),
                            default=str,
                        ),
                        now, expires, existing[0],
                    ),
                )
                row_ = c.execute(
                    """SELECT job_id,status,attempts,result_json,created_at,
                              started_at,finished_at,last_error_class
                       FROM ai_jobs WHERE job_id=?""",
                    (existing[0],),
                ).fetchone()
            else:
                row_ = existing
        else:
            c.execute(
                """INSERT INTO ai_jobs(
                       job_id,chat_id,user_generation,kind,dedupe_key,priority,status,
                       payload_json,created_at,available_at,expires_at)
                   VALUES(?,?,?,?,?,100,'queued',?,?,?,?)""",
                (
                    job_id, cid, generation, "today_note", dedupe_key,
                    json.dumps(payload, ensure_ascii=False, separators=(",", ":"), default=str),
                    now, now, expires,
                ),
            )
            row_ = c.execute(
                """SELECT job_id,status,attempts,result_json,created_at,started_at,finished_at,
                          last_error_class
                   FROM ai_jobs WHERE job_id=?""",
                (job_id,),
            ).fetchone()
        c.commit()
    finally:
        c.close()
    if not row_:
        return None
    return {
        "job_id": row_[0], "status": row_[1], "attempts": int(row_[2] or 0),
        "result": json.loads(row_[3]) if row_[3] else None,
        "created_at": row_[4], "started_at": row_[5], "finished_at": row_[6],
        "error": row_[7], "deduped": bool(existing),
        "generation": generation, "payload": payload,
    }

def _claim_ai_job():
    now = datetime.now(TZ).isoformat()
    c = db()
    try:
        c.execute("BEGIN IMMEDIATE")
        row_ = c.execute(
            """SELECT job_id,chat_id,user_generation,kind,payload_json,attempts
               FROM ai_jobs
               WHERE status='queued' AND available_at<=?
                 AND (expires_at IS NULL OR expires_at>?)
               ORDER BY priority ASC,created_at ASC LIMIT 1""",
            (now, now),
        ).fetchone()
        if not row_:
            c.commit()
            return None
        updated = c.execute(
            """UPDATE ai_jobs SET status='running',started_at=?,attempts=attempts+1
               WHERE job_id=? AND status='queued'""",
            (now, row_[0]),
        ).rowcount
        c.commit()
        if not updated:
            return None
        return {
            "job_id": row_[0], "chat_id": row_[1], "generation": int(row_[2] or 0),
            "kind": row_[3], "payload": json.loads(row_[4]),
            "attempts": int(row_[5] or 0) + 1,
        }
    finally:
        c.close()

def _recover_ai_jobs():
    now = datetime.now(TZ).isoformat()
    c = db()
    try:
        c.execute(
            """UPDATE ai_jobs
               SET status='queued',started_at=NULL,available_at=?
               WHERE status='running'""",
            (now,),
        )
        c.execute(
            """UPDATE ai_jobs SET status='expired',finished_at=?
               WHERE status IN ('queued','running')
                 AND expires_at IS NOT NULL AND expires_at<=?""",
            (now, now),
        )
        c.execute(
            """UPDATE ai_jobs
               SET payload_json='{}',result_json=NULL
               WHERE status IN ('completed','failed','expired','superseded')"""
        )
        c.execute(
            """DELETE FROM ai_jobs
               WHERE status IN ('completed','failed','expired','superseded')
                 AND expires_at IS NOT NULL AND expires_at<=?""",
            (now,),
        )
        c.commit()
    finally:
        c.close()

def _ai_job_status_counts():
    c = db()
    try:
        counts = {
            status: int(count)
            for status, count in c.execute(
                "SELECT status,COUNT(*) FROM ai_jobs GROUP BY status"
            ).fetchall()
        }
        counts["active"] = counts.get("queued", 0) + counts.get("running", 0)
        return counts
    finally:
        c.close()

def _finish_ai_job(job, status, result=None, error=None, retry_delay=0):
    now = datetime.now(TZ)
    c = db()
    try:
        if status == "queued":
            available = (now + timedelta(seconds=max(1, retry_delay))).isoformat()
            c.execute(
                """UPDATE ai_jobs
                   SET status='queued',available_at=?,started_at=NULL,last_error_class=?
                   WHERE job_id=?""",
                (available, str(error or "error")[:48], job["job_id"]),
            )
        else:
            c.execute(
                """UPDATE ai_jobs
                   SET status=?,payload_json='{}',result_json=NULL,
                       last_error_class=?,finished_at=?
                   WHERE job_id=?""",
                (
                    status,
                    str(error or "")[:48] or None,
                    now.isoformat(),
                    job["job_id"],
                ),
            )
        c.commit()
    finally:
        c.close()

def _ai_job_position(job_id):
    c = db()
    try:
        row_ = c.execute(
            "SELECT status,priority,created_at FROM ai_jobs WHERE job_id=?", (job_id,)
        ).fetchone()
        if not row_:
            return None
        if row_[0] == "completed":
            return 0
        running = c.execute(
            "SELECT COUNT(*) FROM ai_jobs WHERE status='running'"
        ).fetchone()[0]
        ahead = c.execute(
            """SELECT COUNT(*) FROM ai_jobs
               WHERE status='queued'
                 AND (priority<? OR (priority=? AND created_at<=?))""",
            (row_[1], row_[1], row_[2]),
        ).fetchone()[0]
        return max(1, int(running or 0) + int(ahead or 0))
    finally:
        c.close()

def _ai_job_eta(position):
    if not position:
        return 0
    rate = float(os.environ.get("AIWA_TODAY_THROUGHPUT", "0.8"))
    if len(_AI_JOB_COMPLETIONS) >= 3:
        now = time.monotonic()
        recent = [t for t in _AI_JOB_COMPLETIONS if now - t <= 300]
        if len(recent) >= 3:
            span = max(1.0, recent[-1] - recent[0])
            rate = max(0.05, (len(recent) - 1) / span)
    return int(math.ceil(float(position) / max(0.05, rate)))

def _today_job_fallback(st, job=None):
    if st:
        summary = (
            f"День {st.get('day')}, {(st.get('phase_ru') or '').lower()} фаза. "
            "Персональная сводка готовится — пока ориентируйся на сегодняшнее "
            "самочувствие и выбирай комфортную нагрузку."
        )
    else:
        summary = (
            "Персональная сводка готовится. Пока опирайся на сегодняшнее "
            "самочувствие, регулярное питание и комфортную активность."
        )
    out = {
        "summary": summary,
        "suggestions": ["Что съесть сегодня?", "Какая нагрузка подойдёт?", "Как улучшить сон?"],
        "cached": False,
        "refreshing": True,
    }
    if job:
        if job.get("status") == "rejected":
            out["refreshing"] = False
            out["capacity_limited"] = True
            out["retry_after_seconds"] = 60
            return out
        if job.get("status") in {"failed", "expired", "superseded"}:
            out["refreshing"] = False
            out["ai_unavailable"] = True
            return out
        position = _ai_job_position(job["job_id"])
        out["job"] = {
            "id": job["job_id"], "status": job["status"],
            "position": position, "eta_seconds": _ai_job_eta(position),
            "attempts": job.get("attempts", 0),
        }
    return out


def _publish_today_note_for_generation(job, note):
    """Publish an AI result only into the lifecycle that requested it."""
    cid = job["chat_id"]
    generation = job["generation"]
    payload = job["payload"]
    mode = str(payload.get("mode") or "")
    revision = int(payload.get("cache_revision", 0))
    payload_day = str(payload.get("date") or "")
    ck, disk_key = _today_cache_keys(
        cid, mode, generation=generation, revision=revision,
        day=payload_day,
    )
    if (
        payload_day != dtoday().isoformat()
        or revision != _TODAY_CACHE_REVISION.get(cid, 0)
    ):
        return False
    # Memory goes first: a concurrent /stop either clears it afterwards or is
    # already visible to the generation-aware durable write, which rejects it.
    _TODAY_CACHE[ck] = note
    if not dc_put_for_generation(cid, "today", note, disk_key, generation):
        if _TODAY_CACHE.get(ck) is note:
            _TODAY_CACHE.pop(ck, None)
        return False
    if (
        not _user_write_allowed(cid, generation)
        or revision != _TODAY_CACHE_REVISION.get(cid, 0)
        or payload_day != dtoday().isoformat()
    ):
        if _TODAY_CACHE.get(ck) is note:
            _TODAY_CACHE.pop(ck, None)
        dc_del_key(cid, "today", disk_key)
        return False
    return True


def _today_cache_identity_current(cid, cache_key):
    try:
        key_cid, generation, revision, day, _mode = cache_key
    except (TypeError, ValueError):
        return False
    return bool(
        key_cid == cid
        and day == dtoday().isoformat()
        and revision == _TODAY_CACHE_REVISION.get(cid, 0)
        and _user_write_allowed(cid, generation)
    )


async def _ai_job_worker(worker_no):
    while True:
        job = await asyncio.to_thread(_claim_ai_job)
        if not job:
            try:
                await asyncio.wait_for(_AI_JOB_WAKE.wait(), timeout=2)
            except asyncio.TimeoutError:
                pass
            if _AI_JOB_WAKE is not None:
                _AI_JOB_WAKE.clear()
            continue
        try:
            payload = job["payload"]
            if not await asyncio.to_thread(
                _user_write_allowed, job["chat_id"], job["generation"]
            ):
                await asyncio.to_thread(
                    _finish_ai_job, job, "superseded", None, "user_inactive"
                )
                continue
            usage = []
            async with _ensure_ai_background_semaphore():
                note = await llm_to_thread(
                    job["chat_id"], "today_note", L.today_note,
                    payload.get("state"), payload.get("profile"),
                    payload.get("recent_syms"), payload.get("mode"), usage,
                    user_generation=job["generation"],
                )
            if usage:
                ev(
                    job["chat_id"], "tokens", sum(usage), meta="today_note",
                    calls=len(usage), usage=usage, user_generation=job["generation"],
                )
            if not isinstance(note, dict) or not (note.get("summary") or "").strip():
                raise ValueError("empty_response")
            note = _today_note_mode_guard(payload.get("mode"), note)
            if not await asyncio.to_thread(
                _user_write_allowed, job["chat_id"], job["generation"]
            ):
                await asyncio.to_thread(
                    _finish_ai_job, job, "superseded", None, "user_inactive"
                )
                continue
            current = row(job["chat_id"])
            if not current or str(current.get("mode") or "") != str(payload.get("mode") or ""):
                _finish_ai_job(job, "superseded", error="context_changed")
                continue
            st = payload.get("state")
            if st:
                note.setdefault("day", st.get("day"))
                note.setdefault("phase", st.get("phase_ru") or "")
            if not await asyncio.to_thread(
                _publish_today_note_for_generation, job, note
            ):
                await asyncio.to_thread(
                    _finish_ai_job, job, "superseded", None, "user_inactive"
                )
                continue
            await asyncio.to_thread(_finish_ai_job, job, "completed", note)
            _AI_JOB_COMPLETIONS.append(time.monotonic())
            ev(job["chat_id"], "ai_job", meta="completed|today_note")
        except Exception as exc:
            error = "empty_response" if "empty_response" in str(exc) else type(exc).__name__
            if job["attempts"] < _AI_JOB_MAX_ATTEMPTS:
                await asyncio.to_thread(
                    _finish_ai_job, job, "queued", None, error, 2 ** job["attempts"]
                )
                if _AI_JOB_WAKE is not None:
                    _AI_JOB_WAKE.set()
            else:
                await asyncio.to_thread(_finish_ai_job, job, "failed", None, error)
                ev(job["chat_id"], "ai_job", meta="failed|today_note")
            log.warning("ai job %s worker %s: %s", job["job_id"], worker_no, error)

def _api_today_lookup(cid):
    u = row(cid)
    if not is_onboarded(u):
        return None, None, None, None
    lookup_day = dtoday().isoformat()
    generation = _user_generation(cid)
    revision = _TODAY_CACHE_REVISION.get(cid, 0)
    _, st = status_of(cid); ev(cid, "button", meta="web_today")
    mode = str(u.get("mode") or "")
    ck, disk_key = _today_cache_keys(
        cid, mode, generation=generation, revision=revision, day=lookup_day,
    )
    hit = _TODAY_CACHE.get(ck) or dc_get(cid, "today", disk_key)
    legacy_hit = False
    if not hit:
        # Existing deployments used mode as the key. /stop and every same-life
        # invalidation delete all today rows, so this is safe to migrate once.
        hit = dc_get(cid, "today", mode)
        legacy_hit = bool(hit)
    if hit:
        if (
            not _user_write_allowed(cid, generation)
            or revision != _TODAY_CACHE_REVISION.get(cid, 0)
        ):
            return u, st, ck, None
        guarded = _today_note_mode_guard(u.get("mode"), hit)
        repaired_legacy = legacy_hit and guarded != hit
        if guarded != hit:
            # Repair already-generated stale content without paying for another
            # model call; subsequent opens read only the corrected cache entry.
            hit = guarded
            ev(cid, "fallback", meta="today_note_mode_guard")
        cache_job = {
            "chat_id": cid,
            "generation": generation,
            "payload": {
                "date": lookup_day, "mode": mode,
                "cache_revision": revision,
            },
        }
        if not _publish_today_note_for_generation(cache_job, hit):
            return u, st, ck, None
        if repaired_legacy:
            # Keep the legacy row internally consistent during the one-release
            # migration; new publications only use generation+revision keys.
            dc_put_for_generation(cid, "today", hit, mode, generation)
            if (
                not _user_write_allowed(cid, generation)
                or revision != _TODAY_CACHE_REVISION.get(cid, 0)
            ):
                dc_del_key(cid, "today", mode)
                return u, st, ck, None
    return u, st, ck, hit

async def _api_today(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    hit = None
    for _attempt in range(2):
        u, st, ck, hit = await asyncio.to_thread(_api_today_lookup, cid)
        if not u:
            return _cors(web.json_response({"error": "onboard"}, status=403))
        if not hit:
            break
        if await asyncio.to_thread(_today_cache_identity_current, cid, ck):
            return _cors(web.json_response(
                dict(hit, cached=True, refreshing=False)
            ))
    else:
        hit = None
    job = await asyncio.to_thread(_enqueue_today_job, cid, u, st)
    if job and job.get("status") == "rejected":
        ev(cid, "ai_job", meta="rejected|today_note|queue_full")
    elif job and job.get("deduped"):
        ev(cid, "ai_job", meta="deduped|today_note")
    elif job:
        ev(cid, "ai_job", meta="accepted|today_note")
    if _AI_JOB_WAKE is not None:
        _AI_JOB_WAKE.set()
    if job and job.get("status") == "completed" and job.get("result"):
        if await asyncio.to_thread(
            _publish_today_note_for_generation, job, job["result"]
        ):
            return _cors(web.json_response(
                dict(job["result"], cached=True, refreshing=False)
            ))
        job = dict(job, status="superseded", result=None)
    return _cors(web.json_response(_today_job_fallback(st, job)))

async def _api_chat(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u):
        return _cors(web.json_response({"answer": "Сначала настрой Айву в боте: /start.", "suggestions": []}, status=403))
    generation = _user_generation(cid)
    msg = (body.get("message") or "").strip()
    if not msg: return _cors(web.json_response({"answer": "Напиши вопрос.", "suggestions": []}))
    msg, addressed = strip_aiwa_address(msg)
    if addressed and not msg:
        if is_male_profile(u):
            return _cors(web.json_response({
                "answer": "Я тут. Напиши вопрос про питание, нагрузку или самочувствие.",
                "suggestions": ["Что съесть сегодня?", "Собери тренировку"],
            }))
        return _cors(web.json_response({"answer": "Я тут. Напиши вопрос про цикл, питание, нагрузку или самочувствие.", "suggestions": ["Когда овуляция?", "Что есть сегодня?"]}))
    ev(cid, "user_message", meta="webapp", n=len(msg))
    reply = await _chat_reply(
        cid, u, msg, user_generation=generation,
        mutation_key=chat_mutation_key("webchat", body.get("request_id")),
        require_mutation_key=True,
        channel="webapp",
    )
    reply = guard_chat_payload(cid, reply)
    if not _user_write_allowed(cid, generation):
        return _cors(web.json_response({"error": "deleted"}, status=409))
    ev(cid, "assistant_message", meta="webapp")
    answer_id = _instrument_feedback_prompt(cid, reply.get("answer"), "webapp")
    reply["answer_id"] = answer_id
    return _cors(web.json_response(reply))

async def _api_feedback(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    rating = str(body.get("rating") or "")
    answer_id = re.sub(r"[^a-f0-9]", "", str(body.get("answer_id") or ""))[:32]
    feedback_result = _submit_feedback(cid, answer_id, rating, "webapp")
    if feedback_result == "missing":
        return _cors(web.json_response({"error": "bad_feedback"}, status=400))
    return _cors(web.json_response({"ok": True, "duplicate": feedback_result == "duplicate"}))

def _agent_tools_spec(mode=None):
    tools = [
        {"type": "function", "function": {"name": "recent_symptoms",
            "description": "Отметки самочувствия за последние дни: симптомы, энергия, настроение.",
            "parameters": {"type": "object", "properties": {"days": {"type": "integer", "description": "за сколько дней, по умолчанию 14"}}}}},
        {"type": "function", "function": {"name": "today_diary",
            "description": "Что пользователь ел сегодня: калории и БЖУ, цель по калориям. Вызывай для вопросов про питание и калории.",
            "parameters": {"type": "object", "properties": {}}}},
        {"type": "function", "function": {"name": "recent_workouts",
            "description": "Последние тренировки пользователя. Вызывай для вопросов про нагрузку.",
            "parameters": {"type": "object", "properties": {}}}},
        {"type": "function", "function": {"name": "user_profile",
            "description": "Профиль: рост, вес, возраст, активность, цель по калориям и режим.",
            "parameters": {"type": "object", "properties": {}}}},
        {"type": "function", "function": {"name": "recall",
            "description": "Достать, что ассистент уже знает о пользователе из долгой памяти: предпочтения, цели, ограничения и важные факты.",
            "parameters": {"type": "object", "properties": {}}}},
        {"type": "function", "function": {"name": "remember",
            "description": "Сохранить в долгую память один устойчивый факт о пользователе. Не сохраняй разовое, сиюминутное или уже известное.",
            "parameters": {"type": "object", "properties": {"key": {"type": "string", "description": "короткий ярлык факта, напр. 'цель', 'не любит', 'плохо переносит'"}, "value": {"type": "string", "description": "сам факт кратко"}}, "required": ["key", "value"]}}},
    ]
    if mode != "male":
        tools.insert(0, {"type": "function", "function": {
            "name": "cycle_status",
            "description": "Текущая фаза, день, прогноз следующего начала и задержка. Вызывай только для репродуктивных вопросов.",
            "parameters": {"type": "object", "properties": {}},
        }})
    # Пишущие действия берутся из реестра: чат получает ровно то, что умеет
    # приложение, с той же проверкой значений. Отдельного списка больше нет.
    for tool in _registry_chat_tools():
        if tool["function"]["name"] in {"period_date", "cycle_len"} and mode == "male":
            continue
        tools.append(tool)
    return tools

def _agent_exec(cid, name, args):
    args = args or {}
    handler = _ACTION_HANDLERS.get(name)
    if handler is not None:
        values, bad = dialog.coerce(name, args)
        if bad is not None:
            action = dialog.get(name)
            param = next((p for p in action.params if p.name == bad), None)
            return {"error": "bad_argument", "argument": bad,
                    "note": param.error if param else "значение не подходит"}
        try:
            return handler(cid, values)
        except Exception as exc:
            log.error("действие %s из чата упало: %s", name, exc)
            return {"error": "failed"}
    try:
        if name == "cycle_status":
            if is_male_profile(row(cid)):
                return {"available": False, "note": "недоступно для этого профиля"}
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
            meals = dp.get("meals") or []
            return {
                "totals": dp.get("totals"), "target": dp.get("target"),
                "meals_logged": len(meals),
                "meals": [
                    {"id": m.get("id"), "title": m.get("title"), "grams": m.get("grams"),
                     "kcal": m.get("kcal"), "slot": m.get("slot")}
                    for m in meals[-12:]
                ],
            }
        if name == "recent_workouts":
            context = _journal_recent_context(cid, limit=8)
            return {"recent": context.get("workouts") or []}
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

async def _agent_answer(cid, u, msg, usage, request_id, user_generation=None, channel="bot"):
    """Агентный ответ в два этапа:
    1) модель через инструменты сама добывает реальные данные пользовательницы (реальные тул-колы);
    2) финальный ответ пишется прежним качественным промптом (answer_question/general_answer) с этими данными.
    Возвращает текст или None (тогда вызывающий откатывается к обычному ответу)."""
    male = is_male_profile(u)
    plan_sys = (
                ("Ты — планировщик wellness-ассистента для мужчины. "
                 "Женская репродуктивная физиология и соответствующие инструменты запрещены. "
                 if male else
                 "Ты — планировщик ассистента по женскому здоровью. ")
                + "Реши, какие инструменты нужны, чтобы ответить "
                + ("на вопрос пользователя по его реальным данным (самочувствие, дневник еды, тренировки, профиль), и вызови их. "
                   if male else
                   "на вопрос пользовательницы по её реальным данным (цикл, симптомы, дневник еды, тренировки, профиль), и вызови их. ")
                + "Если вопрос о том, сохранилась ли еда или что именно есть в дневнике, обязательно вызови today_diary. "
                + "Если вопрос о сохранённой тренировке, обязательно вызови recent_workouts. "
                + "Если это приветствие, благодарность, болтовня или общий вопрос не про здоровье и данные (фильмы, быт, отношения, работа) — НЕ вызывай НИКАКИЕ инструменты. "
                + "Если вопрос общий и данные не нужны — не вызывай инструменты. Сам развёрнутый ответ не пиши, только выбери инструменты.")
    messages = [{"role": "system", "content": plan_sys}, {"role": "user", "content": msg}]
    tools = _agent_tools_spec(u.get("mode"))
    gathered = []
    successful_tools = 0

    async def finish():
        answer = await _agent_final(
            cid, u, msg, gathered, usage, request_id, user_generation,
        )
        if successful_tools and answer and _user_write_allowed(cid, user_generation):
            ev(
                cid, "tool_outcome",
                meta=f"success|tool_assisted_answer|{channel}",
                request_id=request_id, user_generation=user_generation,
            )
        return answer

    for _r in range(2):
        m = await llm_to_thread(cid, "tool_plan", L.call_tools, messages, tools, usage, 0.2, 480,
                                request_id=request_id, user_generation=user_generation)
        if not m:
            return None if _r == 0 else await finish()
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
            if not _user_write_allowed(cid, user_generation):
                return None
            tool_started = time.monotonic()
            res = _agent_exec(cid, nm, a)
            tool_status = "error" if isinstance(res, dict) and res.get("error") else "success"
            if tool_status == "success":
                successful_tools += 1
            ev(
                cid, "tool_execution",
                meta=f"{tool_status}|{nm}|{channel}",
                ms=int((time.monotonic() - tool_started) * 1000),
                request_id=request_id, user_generation=user_generation,
            )
            gathered.append(nm + ": " + json.dumps(res, ensure_ascii=False))
            messages.append({"role": "tool", "tool_call_id": call.get("id"),
                             "content": json.dumps(res, ensure_ascii=False)})
    return await finish()

async def _agent_final(cid, u, msg, gathered, usage, request_id, user_generation=None):
    _, st = status_of(cid); prof = llm_profile_of(u)
    q = msg
    if gathered:
        if is_male_profile(u):
            q = msg + "\n\nВот его актуальные данные из приложения — когда отвечаешь про здоровье, питание или тренировки, обязательно опирайся на них и приводи конкретные числа. Женскую репродуктивную физиологию не упоминай. Если вопрос не про эти данные, отвечай по теме и данные не перечисляй: " + " | ".join(gathered)
        else:
            q = msg + "\n\nВот её актуальные данные из приложения — когда отвечаешь про здоровье, цикл, питание или тренировки, обязательно опирайся на них и приводи конкретные числа. Если сам вопрос не про это (болтовня, общие темы), отвечай по теме вопроса и эти данные не упоминай: " + " | ".join(gathered)
    q = _with_memory(cid, q)
    if st is not None:
        return await llm_to_thread(cid, "final_answer", L.answer_question, st, q, prof, hist_get(cid, male=is_male_profile(u)), usage=usage,
                                   request_id=request_id, user_generation=user_generation)
    return await llm_to_thread(cid, "final_answer", L.general_answer, prof, u.get("mode"), q, chat_hint(cid), hist_get(cid, male=is_male_profile(u)), usage=usage,
                               request_id=request_id, user_generation=user_generation)

async def _memory_learn(cid, umsg, amsg, user_generation=None):
    """Фоновая выжимка устойчивых фактов из диалога в долгую память (не блокирует ответ)."""
    try:
        existing = mem_text(cid, 30); usage = []
        facts = await llm_to_thread(cid, "memory_extract", L.memory_extract, umsg, amsg, existing, usage,
                                    user_generation=user_generation)
        if not _user_write_allowed(cid, user_generation):
            return
        for f in (facts or []):
            mem_set(cid, f.get("key"), f.get("value"))
        if usage:
            ev(cid, "memory_learn", tokens=sum(usage), meta="memory_learn", calls=len(usage), usage=usage)
    except Exception as e:
        log.warning("memory_learn: %s", e)

async def _chat_reply(cid, u, msg, user_generation=None, mutation_key=None,
                      require_mutation_key=False, channel="bot"):
    """Единый ответ чата для текста и голоса. Возвращает dict {answer, suggestions}."""
    generation = _user_generation(cid) if user_generation is None else int(user_generation)
    intent = match_intent(msg)
    if intent == "current_date":
        answer = current_date_text()
        chatlog_add(cid, "user", msg); chatlog_add(cid, "ai", answer)
        return {"answer": answer, "suggestions": ["Что запланировано сегодня?"]}
    journal = None
    if intent not in _JOURNAL_MUTATION_INTENTS:
        journal = chat_mutation_route_preflight(cid, mutation_key)
        if not journal:
            journal = await resolve_semantic_journal_action(
                cid, msg, user_generation=generation,
            )
        if journal:
            intent = journal["intent"]
    if is_male_profile(u) and intent in {
        "phases", "period", "addcycles", "cyclelen", "logperiod",
        "period_end", "calendar",
    }:
        upsert(cid, state=None, pending_date=None)
        ev(cid, "male_mode_block", meta="chat_" + intent)
        return {
            "answer": MALE_PROFILE_FUNCTION_TEXT,
            "suggestions": list(MALE_SAFE_SUGGESTIONS[:2]),
        }
    if intent == "phases":
        _pu = []
        _pa = None
        try: _pa = await asyncio.to_thread(L.answer_question, status_of(cid)[1], "Расскажи кратко про четыре фазы цикла: сколько длится каждая, какие гормоны ведут и как это отражается на самочувствии, питании и нагрузке.", llm_profile_of(u), None, usage=_pu)
        except Exception: pass
        if _pu: ev(cid, "answered", tokens=sum(_pu), meta="webapp", calls=len(_pu), usage=_pu)
        _txt = L.split_followups(_pa)[0] if _pa else PHASES_TEXT
        if not _pa: ev(cid, "fallback", meta="static:phases")
        chatlog_add(cid, "user", msg); chatlog_add(cid, "ai", _txt)
        return {"answer": md_plain(_txt), "suggestions": ["Что есть в мою фазу?", "Какая тренировка сейчас?"]}
    if intent in ("period", "addcycles", "profile", "cyclelen", "time", "wipe", "unlink", "partner", "checkin"):
        guide = {
            "period": "Можно отметить начало прямо в чате: напиши «сегодня начались месячные» или «месячные начались 23 июля, запиши». Для редактирования нескольких дней открой календарь приложения.",
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
    if intent == "logperiod":
        if require_mutation_key and not mutation_key:
            return {"answer": "Не стала менять календарь без идентификатора запроса. Обнови приложение и попробуй ещё раз.",
                    "suggestions": ["Открыть календарь"]}
        result = await log_period_action(
            cid, u, msg, user_generation=generation, mutation_key=mutation_key,
        )
        out = {"answer": result["text"], "suggestions": ["Что сейчас с циклом?", "Открыть календарь"]}
        if result.get("mutation"):
            out["mutation"] = result["mutation"]
        return out
    if intent == "period_end":
        if require_mutation_key and not mutation_key:
            return {"answer": "Не стала менять календарь без идентификатора запроса. Обнови приложение и попробуй ещё раз.",
                    "suggestions": ["Открыть календарь"]}
        result = await log_period_end_action(
            cid, u, msg, user_generation=generation, mutation_key=mutation_key,
        )
        out = {"answer": result["text"], "suggestions": ["Что сейчас с циклом?", "Открыть календарь"]}
        if result.get("mutation"):
            out["mutation"] = result["mutation"]
        return out
    if intent == "logjournalbatch":
        if require_mutation_key and not mutation_key:
            return {
                "answer": "Не стала записывать без идентификатора запроса. Обнови приложение и попробуй ещё раз.",
                "suggestions": ["Открыть питание", "Открыть нагрузку"],
            }
        result = await log_journal_batch_action(
            cid, u, journal,
            user_generation=generation,
            mutation_key=mutation_key,
        )
        out = {
            "answer": result["text"],
            "suggestions": ["Открыть питание", "Открыть нагрузку"],
        }
        if result.get("mutations"):
            out["mutations"] = result["mutations"]
        return out
    if intent == "logworkout":
        if require_mutation_key and not mutation_key:
            return {"answer": "Не стала записывать без идентификатора запроса. Обнови приложение и попробуй ещё раз.",
                    "suggestions": ["Открыть нагрузку"]}
        result = await log_workout_action(
            cid, u, msg, user_generation=generation, mutation_key=mutation_key,
            preparsed_workout=((journal or {}).get("workout")),
        )
        out = {"answer": result["text"], "suggestions": ["Открыть нагрузку", "Что делать завтра?"]}
        if result.get("mutation"):
            out["mutation"] = result["mutation"]
        return out
    if intent == "updateworkout":
        if require_mutation_key and not mutation_key:
            return {"answer": "Не стала исправлять без идентификатора запроса. Обнови приложение и попробуй ещё раз.",
                    "suggestions": ["Открыть нагрузку"]}
        result = await log_workout_update_action(
            cid, u, msg, (journal or {}).get("target_id"),
            user_generation=generation, mutation_key=mutation_key,
            preparsed_workout=((journal or {}).get("workout")),
        )
        out = {"answer": result["text"], "suggestions": ["Открыть нагрузку", "Что делать завтра?"]}
        if result.get("mutation"):
            out["mutation"] = result["mutation"]
        return out
    if intent == "logmealbatch":
        if require_mutation_key and not mutation_key:
            return {
                "answer": "Не стала записывать без идентификатора запроса. Обнови приложение и попробуй ещё раз.",
                "suggestions": ["Открыть питание"],
            }
        result = await log_food_batch_action(
            cid, u, journal,
            user_generation=generation,
            mutation_key=mutation_key,
        )
        out = {
            "answer": result["text"],
            "suggestions": ["Открыть питание", "Совет по дневнику"],
        }
        if result.get("mutation"):
            out["mutation"] = result["mutation"]
        if result.get("mutations"):
            out["mutations"] = result["mutations"]
        return out
    if intent == "logmeal":
        if require_mutation_key and not mutation_key:
            return {"answer": "Не стала записывать без идентификатора запроса. Обнови приложение и попробуй ещё раз.",
                    "suggestions": ["Открыть питание"]}
        result = await log_food_action(
            cid, u, msg, user_generation=generation, mutation_key=mutation_key,
            preparsed_food_text=((journal or {}).get("food_text")),
            preparsed_slot=((journal or {}).get("slot")),
            preparsed_food_record=((journal or {}).get("food_record")),
        )
        out = {"answer": result["text"], "suggestions": ["Открыть питание", "Совет по дневнику"]}
        if result.get("mutation"):
            out["mutation"] = result["mutation"]
        return out
    if intent == "updatemeal":
        if require_mutation_key and not mutation_key:
            return {"answer": "Не стала исправлять без идентификатора запроса. Обнови приложение и попробуй ещё раз.",
                    "suggestions": ["Открыть питание"]}
        result = await log_food_update_action(
            cid, u, msg, (journal or {}).get("target_id"),
            user_generation=generation, mutation_key=mutation_key,
            preparsed_food_text=((journal or {}).get("food_text")),
            preparsed_food_record=((journal or {}).get("food_record")),
        )
        out = {"answer": result["text"], "suggestions": ["Открыть питание", "Совет по дневнику"]}
        if result.get("mutation"):
            out["mutation"] = result["mutation"]
        return out
    if intent == "movemealslot":
        if require_mutation_key and not mutation_key:
            return {"answer": "Не стала переносить запись без идентификатора запроса.",
                    "suggestions": ["Открыть питание"]}
        result = await move_meal_slot_action(
            cid, (journal or {}).get("target_id"), (journal or {}).get("slot"),
            user_generation=generation, mutation_key=mutation_key,
        )
        out = {"answer": result["text"], "suggestions": ["Открыть питание"]}
        if result.get("mutation"):
            out["mutation"] = result["mutation"]
        return out
    if intent == "appendmealitem":
        if require_mutation_key and not mutation_key:
            return {"answer": "Не стала дополнять запись без идентификатора запроса.",
                    "suggestions": ["Открыть питание"]}
        result = await append_meal_item_action(
            cid, u, (journal or {}).get("target_id"), (journal or {}).get("food_text"),
            user_generation=generation, mutation_key=mutation_key,
            preparsed_food_record=((journal or {}).get("food_record")),
        )
        out = {"answer": result["text"], "suggestions": ["Открыть питание", "Совет по дневнику"]}
        if result.get("mutation"):
            out["mutation"] = result["mutation"]
        return out
    if intent == "journalreplay":
        result = journal_replay_result(cid, journal)
        out = {"answer": result["text"], "suggestions": ["Открыть питание"]}
        if result.get("mutation"):
            out["mutation"] = result["mutation"]
        return out
    if intent == "journalunavailable":
        return {
            "answer": (
                "Сейчас не получилось достаточно быстро и надёжно разобрать изменение дневника, "
                "поэтому я ничего не меняла. Попробуй повторить одной фразой через минуту."
            ),
            "suggestions": ["Открыть питание"],
        }
    if intent == "clarifymeal":
        return {
            "answer": (
                "Не уверена, какую именно запись еды изменить, поэтому ничего не меняла. "
                "Напиши название и новое количество, например: «чипсы — 100 г»."
            ),
            "suggestions": ["Открыть питание"],
        }
    if intent == "clarifyworkout":
        return {
            "answer": (
                "Не уверена, какую именно тренировку изменить, поэтому ничего не меняла. "
                "Напиши её название и исправление, например: «приседания — 3 подхода по 12»."
            ),
            "suggestions": ["Открыть нагрузку"],
        }
    if intent == "diary":
        usage = []; txt = await answer_diary(cid, usage)
        if usage: ev(cid, "answered", tokens=sum(usage), meta="webapp", n=len(msg), calls=len(usage), usage=usage)
        return {"answer": txt, "suggestions": ["Открыть питание", "Что купить?"]}
    _, st = status_of(cid); usage = []; prof = llm_profile_of(u)
    request_id = "r_" + secrets.token_hex(16)
    ans = None
    try:
        ans = await _agent_answer(
            cid, u, msg, usage, request_id,
            user_generation=generation, channel=channel,
        )
    except Exception as _ae:
        log.warning("agent fallback: %s", _ae); ans = None
    if not ans:
        if intent in ("food", "training"):
            fq = ("Что мне есть сегодня под мою фазу/режим, возраст и самочувствие? Дай конкретные продукты или пример меню на день. Отвечай ТОЛЬКО про еду, не рассказывай про фазы цикла."
                  if intent == "food" else
                  "Какая физическая активность мне сегодня подходит и почему? Дай 2-3 конкретных варианта. Отвечай про тренировки, тему цикла не разворачивай.")
            fq = _with_memory(cid, fq)
            if st is not None:
                ans = await llm_to_thread(cid, "final_answer", L.answer_question, st, fq, prof, hist_get(cid, male=is_male_profile(u)), usage=usage,
                                          request_id=request_id, user_generation=generation)
            else:
                ans = await llm_to_thread(cid, "final_answer", L.general_answer, prof, u.get("mode"), fq, chat_hint(cid), hist_get(cid, male=is_male_profile(u)), usage=usage,
                                          request_id=request_id, user_generation=generation)
        elif st is not None:
            ans = await llm_to_thread(cid, "final_answer", L.answer_question, st, _with_memory(cid, msg), prof, hist_get(cid, male=is_male_profile(u)), usage=usage,
                                      request_id=request_id, user_generation=generation)
        else:
            ans = await llm_to_thread(cid, "final_answer", L.general_answer, prof, u.get("mode"), _with_memory(cid, msg), chat_hint(cid), hist_get(cid, male=is_male_profile(u)), usage=usage,
                                      request_id=request_id, user_generation=generation)
    current = _user_write_allowed(cid, generation)
    clean, sugg = L.split_followups(ans)
    clean = guard_aiwa_reply(cid, clean)
    if current:
        hist_push(cid, msg, clean)
    try:
        topical = L.followups(st, msg, clean)
        if topical:
            sugg = topical
    except Exception:
        pass
    if current:
        ev(cid, "answered", tokens=sum(usage), meta="webapp", n=len(msg), calls=len(usage),
           request_id=request_id, usage=usage)
        try:
            asyncio.create_task(_memory_learn(cid, msg, clean, generation))
        except Exception:
            pass
    return guard_chat_payload(
        cid, {"answer": md_plain(clean), "suggestions": sugg[:2]},
    )

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
    generation = _user_generation(cid)
    field = data.get("audio")
    raw = b""
    if field is not None:
        try: raw = field.file.read()
        except Exception:
            raw = field if isinstance(field, (bytes, bytearray)) else b""
    fn = getattr(field, "filename", "voice.webm") or "voice.webm"
    if not raw:
        return _cors(web.json_response({"transcript": "", "answer": "Пустая запись, попробуй ещё раз.", "suggestions": []}))
    _sti = {}
    txt = await llm_to_thread(cid, "stt", L.transcribe, bytes(raw), fn, _sti, user_generation=generation)
    if not _user_write_allowed(cid, generation):
        return _cors(web.json_response({"error": "deleted"}, status=409))
    if _sti: ev(cid, "stt", meta="stt:" + str(_sti.get("provider")), ms=int(_sti.get("ms") or 0), calls=1)
    if not txt:
        return _cors(web.json_response({"transcript": "", "answer": "Не расслышала, попробуй ещё раз или напиши текстом.", "suggestions": []}))
    ev(cid, "voice", n=len(txt))
    msg, _addr = strip_aiwa_address(txt.strip())
    if not msg: msg = txt.strip()
    reply = await _chat_reply(
        cid, u, msg, user_generation=generation,
        mutation_key=chat_mutation_key("webvoice", data.get("request_id")),
        require_mutation_key=True,
        channel="webapp",
    )
    reply = guard_chat_payload(cid, reply)
    if not _user_write_allowed(cid, generation):
        return _cors(web.json_response({"error": "deleted"}, status=409))
    ev(cid, "assistant_message", meta="webapp")
    answer_id = _instrument_feedback_prompt(cid, reply.get("answer"), "webapp")
    reply["answer_id"] = answer_id
    reply["transcript"] = txt.strip()
    return _cors(web.json_response(reply))

def diary_payload(cid, prof=None, d=None):
    prof = prof if prof is not None else profile_of(row(cid))
    tg = profile_kcal(prof) if prof else None
    meals = meals_of(cid, d)
    return {
        "meals": meals,
        "totals": _diary_totals_from_meals(meals),
        "date": (d or dtoday().isoformat()),
        "target": (
            {"kcal": tg[0], "protein": tg[1], "fat": tg[2], "carbs": tg[3]}
            if tg else None
        ),
    }


def _diary_payload_with_recent(cid, selected_date=None):
    """Build the diary off-loop; initial week load uses one SQLite read."""
    if selected_date:
        return diary_payload(cid, d=selected_date)
    today = dtoday()
    days = [(today - timedelta(days=offset)).isoformat() for offset in range(8)]
    prof = profile_of(row(cid))
    tg = profile_kcal(prof) if prof else None
    target = (
        {"kcal": tg[0], "protein": tg[1], "fat": tg[2], "carbs": tg[3]}
        if tg else None
    )
    c = db()
    rows = c.execute(
        """SELECT id,ts,title,kcal,protein,fat,carbs,grams,items,source,
                  slot,fclass,slot_guessed,d
           FROM meals
           WHERE chat_id=? AND d>=? AND d<=?
           ORDER BY d,ts""",
        (cid, days[-1], days[0]),
    ).fetchall()
    c.close()
    grouped = {day: [] for day in days}
    for item in rows:
        grouped.setdefault(item[13], []).append(_meal_row_payload(item))

    def payload_for(day):
        meals = grouped.get(day, [])
        return {
            "meals": meals,
            "totals": _diary_totals_from_meals(meals),
            "date": day,
            "target": target,
        }

    payload = payload_for(days[0])
    payload["recent"] = {day: payload_for(day) for day in days[1:]}
    return payload

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
        return (
            "За сегодня в дневнике пусто. Сфотографируй еду или опиши приём "
            "текстом — посчитаю калории и подскажу, чего добрать."
        )
    return await llm_to_thread(cid, "diary_recommendation", L.diary_reco, summ, (usage if usage is not None else []))

def chat_mutation_key(channel, request_id):
    raw = str(request_id or "").strip()
    if not raw:
        return None
    digest = _hashlib.sha256((str(channel or "chat") + ":" + raw).encode("utf-8")).hexdigest()
    return str(channel or "chat")[:12] + ":" + digest[:40]

def chat_mutation_child_key(mutation_key, label):
    if not mutation_key:
        return None
    digest = _hashlib.sha256(
        (str(mutation_key) + ":" + str(label or "")).encode("utf-8")
    ).hexdigest()
    return "batch:" + digest[:40]

def chat_mutation_args_hash(kind, text):
    normalized = re.sub(r"\s+", " ", str(text or "").strip().lower())
    return _hashlib.sha256((str(kind) + "\n" + normalized).encode("utf-8")).hexdigest()

def chat_mutation_route_preflight(cid, mutation_key):
    """Возвращает уже зафиксированный маршрут retry до повторного вызова классификатора."""
    if not mutation_key:
        return None
    c = db()
    prior = c.execute(
        """SELECT kind,record_id,result_json,reversed_at
           FROM chat_mutations WHERE chat_id=? AND mutation_key=?""",
        (cid, mutation_key),
    ).fetchone()
    c.close()
    if not prior:
        return None
    # An append retry no longer contains the model-produced item payload. Return
    # the already verified result directly instead of calling the model again or
    # trying to reconstruct mutation arguments from aggregate totals.
    if prior[0] == "food_append":
        try:
            target_id = int(prior[1])
        except (TypeError, ValueError):
            target_id = None
        return {
            "intent": "journalreplay",
            "mutation_kind": "food_append",
            "target_id": target_id,
            "reversed": bool(prior[3]),
        }
    intent = {
        "food": "logmeal",
        "food_update": "updatemeal",
        "food_move_slot": "movemealslot",
        "food_append": "appendmealitem",
        "workout": "logworkout",
        "workout_update": "updateworkout",
        "period_start": "logperiod",
        "period_end": "period_end",
    }.get(prior[0])
    if not intent:
        return None
    route = {"intent": intent, "replay": True}
    try:
        route["target_id"] = int(prior[1])
    except (TypeError, ValueError):
        pass
    try:
        saved = json.loads(prior[2] or "{}")
    except (TypeError, ValueError):
        saved = {}
    if intent == "movemealslot" and saved.get("slot") in SLOT_RU:
        route["slot"] = saved["slot"]
    return route

def journal_replay_result(cid, journal):
    """Describe an idempotent semantic retry from current verified storage."""
    target_id = (journal or {}).get("target_id")
    if (journal or {}).get("reversed"):
        return {
            "ok": False,
            "text": "Этот запрос уже применялся, но запись после этого удалили. Повторно её не создавала.",
        }
    if (journal or {}).get("mutation_kind") == "food_append":
        verified = meal_get(cid, target_id)
        if verified:
            return {
                "ok": True,
                "text": (
                    "Этот запрос уже применён. Проверила дневник: в "
                    f"{SLOT_RU.get(verified.get('slot'), 'приёме пищи')} сейчас "
                    f"{_meal_items_line(verified)}."
                ),
                "record_id": target_id,
                "rec": verified,
                "mutation": {
                    "kind": "food_update",
                    "date": verified.get("date") or dtoday().isoformat(),
                },
            }
    return {
        "ok": False,
        "text": "Этот запрос уже обрабатывался, но сейчас не удалось подтвердить запись в дневнике.",
    }

async def log_journal_batch_action(
    cid, u, journal, user_generation=None, mutation_key=None,
):
    """Apply an already validated mixed food/workout message with child idempotency keys."""
    entries = list((journal or {}).get("entries") or [])
    if not 2 <= len(entries) <= 4:
        return {"ok": False, "text": "Не удалось безопасно разделить записи. Ничего не меняла."}
    results = []
    for index, entry in enumerate(entries):
        intent = entry.get("intent")
        source = str(entry.get("source_text") or "").strip()
        child_key = chat_mutation_child_key(mutation_key, f"{index}:{intent}")
        if intent == "logmeal":
            result = await log_food_action(
                cid, u, source,
                user_generation=user_generation,
                mutation_key=child_key,
                preparsed_food_text=entry.get("food_text"),
                preparsed_slot=entry.get("slot"),
                preparsed_food_record=entry.get("food_record"),
            )
        elif intent == "logworkout":
            result = await log_workout_action(
                cid, u, source,
                user_generation=user_generation,
                mutation_key=child_key,
                preparsed_workout=entry.get("workout"),
            )
        else:
            return {"ok": False, "text": "Не удалось безопасно разделить записи. Ничего не меняла."}
        results.append({"intent": intent, "result": result})
    successful = [item for item in results if item["result"].get("ok")]
    return {
        "ok": len(successful) == len(results),
        "text": "\n\n".join(item["result"]["text"] for item in results),
        "records": [
            {
                "intent": item["intent"],
                "record_id": item["result"].get("record_id"),
                "mutation": item["result"].get("mutation"),
            }
            for item in successful
            if item["result"].get("record_id")
        ],
        "mutations": [
            item["result"]["mutation"]
            for item in successful
            if item["result"].get("mutation")
        ],
    }

def chat_mutation_preflight(cid, mutation_key, kind, args_hash):
    if not mutation_key:
        return None
    c = db()
    if not _user_write_allowed(cid, conn=c):
        c.close(); return {"status": "stale"}
    prior = c.execute(
        """SELECT kind,record_id,args_hash,result_json,reversed_at
           FROM chat_mutations WHERE chat_id=? AND mutation_key=?""",
        (cid, mutation_key),
    ).fetchone()
    c.close()
    if not prior:
        return None
    status = "mismatch" if prior[0] != kind or (prior[2] or "") != (args_hash or "") else (
        "reversed" if prior[4] else "duplicate"
    )
    try: record_id = int(prior[1])
    except (TypeError, ValueError): record_id = None
    try: data = json.loads(prior[3] or "{}")
    except (TypeError, ValueError): data = {}
    return {"status": status, "id": record_id, "created": False, "data": data}

def _food_short_analysis(rec):
    """Cheap, deterministic feedback after a verified food write.

    It deliberately uses only persisted nutrients and category: no second LLM
    call, no extra latency, and no claims about fibre/micronutrients that the
    record does not actually contain.
    """
    protein = max(0.0, float(rec.get("protein") or 0))
    fat = max(0.0, float(rec.get("fat") or 0))
    carbs = max(0.0, float(rec.get("carbs") or 0))
    kcal = max(0, int(rec.get("kcal") or 0))
    fclass = str(rec.get("fclass") or "")
    if fclass == "напиток":
        if kcal == 0:
            body = "напиток почти не добавляет энергии"
        elif carbs >= 20 and protein < 8:
            body = "в напитке заметная доля углеводов; учитывай его как часть приёма пищи"
        else:
            body = "напиток тоже учтён в калориях и КБЖУ дня"
    elif protein >= 25:
        body = "хороший вклад в белок"
        if carbs < 15:
            body += "; для более полного приёма можно добавить овощи или сложные углеводы"
    elif carbs >= 50 and protein < 15:
        body = "приём преимущественно углеводный; белковый продукт сделает его сытнее"
    elif fat >= 30 and protein < 20:
        body = "жиров здесь заметно больше белка; следующий приём лучше сделать легче и белковее"
    elif protein >= 15 and carbs >= 15:
        body = "по основным макронутриентам приём выглядит достаточно сбалансированным"
    else:
        body = "это небольшой вклад в дневной рацион; итог лучше оценивать по всему дню"
    return "Короткий разбор: " + body + "."

def _food_action_success(rec, mid, event_date):
    slot = rec.get("slot") or slot_for_now()
    sm = SLOT_RU.get(slot, "приём")
    grams = f", примерно {rec['grams']} г" if rec.get("grams") else ""
    when = "" if event_date == dtoday() else f" за {event_date.strftime('%d.%m.%Y')}"
    title = _meal_items_line(rec) if rec.get("items") else rec["title"]
    text_out = (
        f"Записала{when} в {sm}: {title}{grams} — около {rec['kcal']} ккал "
        f"(Б{round(rec['protein'])} Ж{round(rec['fat'])} У{round(rec['carbs'])}). "
        "Порция и КБЖУ оценочные, запись уже видна в разделе «Питание»."
    )
    text_out += " " + _food_short_analysis(rec)
    if rec.get("slot_guessed"):
        text_out += (
            f" Приём пищи определила по времени как «{sm}»; если это не так, "
            "просто напиши, например «это был завтрак, а не обед»."
        )
    unparsed = [str(x).strip() for x in (rec.get("unparsed") or []) if str(x).strip()]
    if unparsed:
        text_out += (
            " Не разобрала: «" + "», «".join(unparsed[:3])
            + "». Напиши, что это было, и я дополню запись."
        )
    return {"ok": True, "text": text_out, "record_id": mid, "rec": rec,
            "mutation": {"kind": "food", "date": event_date.isoformat()}}

def _food_update_success(rec, mid, event_date):
    grams = f", примерно {rec['grams']} г" if rec.get("grams") else ""
    when = "" if event_date == dtoday() else f" за {event_date.strftime('%d.%m.%Y')}"
    text_out = (
        f"Исправила запись{when}: {rec['title']}{grams} — около {rec['kcal']} ккал "
        f"(Б{round(rec['protein'])} Ж{round(rec['fat'])} У{round(rec['carbs'])}). "
        "Проверила сохранение — обновлённая запись уже в разделе «Питание»."
    )
    return {
        "ok": True, "text": text_out, "record_id": mid, "rec": rec,
        "mutation": {"kind": "food_update", "date": event_date.isoformat()},
    }

def _workout_action_success(rec, wid, event_date):
    details = []
    if rec.get("duration"):
        details.append(rec["duration"])
    if rec.get("rpe"):
        details.append(rec["rpe"] + " нагрузка")
    when = "" if event_date == dtoday() else f" за {event_date.strftime('%d.%m.%Y')}"
    suffix = " · " + ", ".join(details) if details else ""
    kcal_note = f" · около {rec['kcal']} ккал" if rec.get("kcal") else ""
    return {
        "ok": True,
        "text": f"Записала тренировку{when}: {rec['type']}{suffix}{kcal_note}. Она уже видна в разделе «Нагрузка».",
        "record_id": wid,
        "rec": rec,
        "mutation": {"kind": "workout", "date": event_date.isoformat()},
    }

def _workout_update_success(rec, wid, event_date):
    details = []
    if rec.get("duration"):
        details.append(rec["duration"])
    if rec.get("rpe"):
        details.append(rec["rpe"] + " нагрузка")
    suffix = " · " + ", ".join(details) if details else ""
    when = "" if event_date == dtoday() else f" за {event_date.strftime('%d.%m.%Y')}"
    return {
        "ok": True,
        "text": (
            f"Исправила тренировку{when}: {rec['type']}{suffix}. "
            "Проверила сохранение — обновление уже в разделе «Нагрузка»."
        ),
        "record_id": wid,
        "rec": rec,
        "mutation": {"kind": "workout_update", "date": event_date.isoformat()},
    }

_CHAT_DATE_RE = re.compile(
    r"(?<![\d.,])(?:(?:0?[1-9]|[12]\d|3[01])[./-](?:0?[1-9]|1[0-2])"
    r"(?:[./-](?:\d{2}|\d{4}))?|\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])|"
    r"\d{1,2}\s+(?:январ\w*|феврал\w*|март\w*|апрел\w*|ма[йяе]|июн\w*|июл\w*|"
    r"август\w*|сентябр\w*|октябр\w*|ноябр\w*|декабр\w*)(?:\s+\d{4})?)(?![\d.,])",
    re.I,
)
_CHAT_RELATIVE_DATE_RE = re.compile(
    r"\b(?:сегодня|вчера|позавчера|завтра)\b",
    re.I,
)

def _chat_explicit_date_tokens(text):
    """Return explicit date tokens in source order; `завтрак` is not `завтра`."""
    raw = str(text or "")
    matches = list(_CHAT_RELATIVE_DATE_RE.finditer(raw))
    matches.extend(_CHAT_DATE_RE.finditer(raw))
    return [match.group(0) for match in sorted(matches, key=lambda match: match.start())]

def _parse_chat_absolute_date(raw):
    value = str(raw or "").strip()
    # Для журналирования дата без года означает текущий год. В отличие от
    # прогнозного parse_date, будущий день нельзя молча переносить на прошлый год.
    if re.fullmatch(r"\d{1,2}[./-]\d{1,2}", value):
        sep = "." if "." in value else ("/" if "/" in value else "-")
        return parse_date(value + sep + str(dtoday().year))
    if re.fullmatch(
        r"\d{1,2}\s+(?:январ\w*|феврал\w*|март\w*|апрел\w*|ма[йяе]|июн\w*|июл\w*|"
        r"август\w*|сентябр\w*|октябр\w*|ноябр\w*|декабр\w*)",
        value,
        re.I,
    ):
        return parse_date(value + " " + str(dtoday().year))
    return parse_date(value)

def chat_event_date(text, max_past_days=366):
    """Дата события из чата. Возвращает (date, error); без даты — сегодня по Москве."""
    low = (text or "").lower()
    today = dtoday()
    if re.search(r"\bпозавчера\b", low):
        parsed = today - timedelta(days=2)
    elif re.search(r"\bвчера\b", low):
        parsed = today - timedelta(days=1)
    elif re.search(r"\bсегодня\b", low):
        parsed = today
    elif re.search(r"\bзавтра\b", low):
        return None, "future"
    else:
        match = _CHAT_DATE_RE.search(text or "")
        parsed = _parse_chat_absolute_date(match.group(0)) if match else today
        if match and parsed is None:
            return None, "invalid"
    if parsed > today:
        return None, "future"
    if (today - parsed).days > max_past_days:
        return None, "too_old"
    return parsed, None

def current_date_text():
    """Canonical product date; never ask a language model what day it is."""
    today = dtoday()
    months = (
        "", "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря",
    )
    weekdays = (
        "понедельник", "вторник", "среда", "четверг",
        "пятница", "суббота", "воскресенье",
    )
    return (
        f"Сегодня {today.day} {months[today.month]} {today.year} года, "
        f"{weekdays[today.weekday()]}. В Айве используется московское время."
    )

def extract_food_log_text(text):
    """Убирает только служебные слова команды, сохраняя продукт, количество и жирность."""
    cleaned, _ = strip_aiwa_address(text)
    cleaned = re.sub(r"(?i)^\s*можешь(?:\s+ли)?\s+", " ", cleaned)
    cleaned = re.sub(
        r"(?i)\b(запис\w*|запиш\w*|добав\w*|внес\w*|занес\w*|отмет\w*|зафиксир\w*|залогир\w*|логни)\b",
        " ",
        cleaned,
    )
    cleaned = re.sub(r"(?i)\bпожалуйста\b", " ", cleaned)
    cleaned = re.sub(
        r"(?i)\b(?:я\s+)?(?:съел\w*|поел\w*|ел[аи]?|кушал\w*|скушал\w*|покушал\w*|выпил\w*|попил\w*|пил[аи]?)\b",
        " ",
        cleaned,
    )
    cleaned = re.sub(
        r"(?i)\b(?:в\s+дневник(?:\s+(?:еды|питания))?|в\s+еду|в\s+при[её]м|"
        r"на\s+(?:завтрак|обед|ужин|перекус|полдник)|в\s+(?:завтрак|обед|ужин|перекус))\b",
        " ",
        cleaned,
    )
    cleaned = re.sub(r"\s+", " ", cleaned).strip(" ,.:;—-\t")
    return cleaned

async def log_food_action(cid, u, text, user_generation=None, mutation_key=None,
                          preparsed_food_text=None, preparsed_slot=None,
                          preparsed_food_record=None):
    """«добавь на завтрак рисовую кашу» -> распознать КБЖУ и записать в дневник."""
    generation = _user_generation(cid) if user_generation is None else int(user_generation)
    args_hash = chat_mutation_args_hash("food", text)
    prior = chat_mutation_preflight(cid, mutation_key, "food", args_hash)
    if prior:
        if prior["status"] == "mismatch":
            return {"ok": False, "text": "Не стала повторять запрос: его идентификатор уже использован для другой записи."}
        if prior["status"] == "reversed":
            return {"ok": False, "text": "Эта запись уже была отменена и не добавлена повторно."}
        if prior["status"] == "duplicate" and prior.get("data"):
            saved_date = date.fromisoformat(prior["data"].get("date") or dtoday().isoformat())
            return _food_action_success(prior["data"], prior.get("id"), saved_date)
        if prior["status"] == "stale":
            return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
    ev(cid, "flow_start", meta="food")
    slot = (
        preparsed_slot
        if preparsed_slot in {"breakfast", "lunch", "snack", "dinner"}
        else slot_from_text(text)
    )
    event_date, date_error = chat_event_date(text, max_past_days=31)
    if date_error:
        return {"ok": False, "text": "Не стала записывать: укажи сегодняшнюю дату или один из последних 31 дней."}
    food = str(preparsed_food_text or "").strip()[:500] or extract_food_log_text(text)
    if not food:
        return {"ok": False, "text": "Не поняла, что добавить. Напиши, например «200 г творога, запиши»."}
    usage = []
    parsed = preparsed_food_record if isinstance(preparsed_food_record, dict) else None
    if parsed is None:
        parsed = await llm_to_thread(
            cid, "food_text", L.analyze_food_text, food, profile_of(u), usage,
            journal_v2_enabled(cid),
            user_generation=generation,
        )
    if not _user_write_allowed(cid, generation):
        return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
    ev(cid, "tokens", sum(usage), meta="food_text", calls=len(usage), usage=usage,
       user_generation=generation)
    rec = normalize_food(parsed, "text") if parsed else None
    if not rec or not food_record_admissible(rec):
        return {"ok": False, "text": "Не поняла продукт или порцию. Напиши, например «200 г творога 5%, запиши»."}
    rec["slot"] = slot or slot_for_now()
    rec["slot_guessed"] = not bool(slot)
    saved = meal_add(
        cid, rec, d=event_date.isoformat(), user_generation=generation, mutation_key=mutation_key,
        args_hash=args_hash, return_status=True,
    )
    if not saved or saved.get("status") == "mismatch":
        return {"ok": False, "text": "Не стала повторять запрос: его идентификатор уже использован для другой записи."}
    if saved.get("status") == "reversed":
        return {"ok": False, "text": "Эта запись уже была отменена и не добавлена повторно."}
    mid = saved.get("id")
    if not mid:
        return {"ok": False, "text": "Не получилось сохранить запись. Попробуй ещё раз."}
    verified = meal_get(cid, mid)
    if not verified:
        ev(cid, "journal_mutation_failed", meta="food|verify_failed", user_generation=generation)
        return {"ok": False, "text": "Запись отправилась на сохранение, но я не смогла проверить её в дневнике. Попробуй ещё раз."}
    # Parsing diagnostics do not belong to the meal row, but must survive the
    # verify-after-write boundary so silent omissions become visible.
    rec = dict(verified, unparsed=rec.get("unparsed") or [])
    if not _user_write_allowed(cid, generation):
        return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
    if saved.get("created"):
        ev(cid, "goal", meta="food_log", user_generation=generation)
        ev(cid, "manual", meta="food_log", user_generation=generation)
        ev(cid, "journal_mutation_executed", meta="create|food", user_generation=generation)
        ev(cid, "tool_execution", meta="success|create_meal|journal", user_generation=generation)
    ev(cid, "journal_mutation_verified", meta="create|food", user_generation=generation)
    return _food_action_success(rec, mid, date.fromisoformat(rec.get("date") or event_date.isoformat()))

async def log_food_batch_action(cid, u, journal, user_generation=None, mutation_key=None):
    """Persist every prevalidated explicit meal section with its own receipt."""
    entries = list((journal or {}).get("entries") or [])
    if not 2 <= len(entries) <= 4:
        return {
            "ok": False,
            "text": "Не смогла надёжно разделить приёмы пищи, поэтому ничего не записала.",
            "record_ids": [],
        }
    batch_date_tokens = _chat_explicit_date_tokens(
        (journal or {}).get("source_text") or "",
    )
    common_date_token = (
        batch_date_tokens[0] if len(batch_date_tokens) == 1 else None
    )
    results = []
    for index, entry in enumerate(entries):
        child_key = f"{mutation_key}:meal:{index}" if mutation_key else None
        entry_source = str(entry.get("source_text") or "")
        if common_date_token and not _chat_explicit_date_tokens(entry_source):
            entry_source = f"{common_date_token} {entry_source}".strip()
        result = await log_food_action(
            cid,
            u,
            entry_source,
            user_generation=user_generation,
            mutation_key=child_key,
            preparsed_food_text=entry.get("food_text"),
            preparsed_slot=entry.get("slot"),
            preparsed_food_record=entry.get("food_record"),
        )
        results.append(result)
    record_ids = [
        result["record_id"]
        for result in results
        if result.get("ok") and result.get("record_id")
    ]
    mutations = [
        result["mutation"]
        for result in results
        if result.get("mutation")
    ]
    ok = len(record_ids) == len(entries)
    if not ok:
        ev(
            cid,
            "journal_mutation_failed",
            meta=f"food_batch|verified_{len(record_ids)}_of_{len(entries)}",
            user_generation=user_generation,
        )
    return {
        "ok": ok,
        "text": "\n\n".join(result["text"] for result in results),
        "record_ids": record_ids,
        "mutations": mutations,
        "mutation": {
            "kind": "food_batch",
            "date": (
                mutations[0].get("date")
                if mutations else dtoday().isoformat()
            ),
            "count": len(record_ids),
        } if record_ids else None,
    }

async def log_food_from_text(cid, u, text, user_generation=None, mutation_key=None):
    result = await log_food_action(cid, u, text, user_generation=user_generation, mutation_key=mutation_key)
    return result["text"]

SLOT_RU = {
    "breakfast": "завтрак",
    "lunch": "обед",
    "snack": "перекус",
    "dinner": "ужин",
}

def _items_or_synthetic(rec):
    """Legacy aggregate rows become one item when an item-level edit is needed."""
    items = [dict(x) for x in (rec.get("items") or []) if isinstance(x, dict)]
    if items:
        return items
    return [{
        "name": rec.get("title") or "Приём пищи",
        "grams": rec.get("grams") or 0,
        "kcal": rec.get("kcal") or 0,
        "protein": rec.get("protein") or 0,
        "fat": rec.get("fat") or 0,
        "carbs": rec.get("carbs") or 0,
    }]

def _meal_items_line(rec):
    names = [str(x.get("name") or "").strip() for x in (rec.get("items") or [])]
    names = [x for x in names if x]
    return ", ".join(names[:5]) or rec.get("title") or "приём пищи"

def _same_food_item(left, right):
    def canonical(value):
        return re.sub(r"[^а-яёa-z0-9]+", "", str(value or "").casefold())[:80]
    a, b = canonical(left), canonical(right)
    if not a or not b:
        return False
    if a == b:
        return True
    contained = min(len(a), len(b)) >= 5 and (a in b or b in a)
    return contained or SequenceMatcher(None, a, b).ratio() >= 0.78

async def move_meal_slot_action(cid, meal_id, slot, user_generation=None, mutation_key=None):
    """Move an owned meal and acknowledge only the verified DB state."""
    generation = _user_generation(cid) if user_generation is None else int(user_generation)
    if slot not in SLOT_RU:
        return {"ok": False, "text": "Не поняла, куда перенести запись: в завтрак, обед, перекус или ужин."}
    current = meal_get(cid, meal_id)
    if not current:
        return {"ok": False, "text": "Не нашла эту запись в дневнике. Уточни, какой приём пищи нужно исправить."}
    if current.get("slot") == slot and not current.get("slot_guessed"):
        return {
            "ok": True,
            "text": f"Эта запись уже находится в разделе «{SLOT_RU[slot]}» — ничего не меняла.",
            "record_id": current["id"],
            "rec": current,
            "mutation": {"kind": "food_update", "date": current.get("date") or dtoday().isoformat()},
        }
    args_hash = chat_mutation_args_hash("food_update", f"{meal_id}\nslot={slot}")
    rec = dict(current, slot=slot, slot_guessed=False)
    saved = meal_update(
        cid, meal_id, rec, user_generation=generation, mutation_key=mutation_key,
        args_hash=args_hash, mutation_kind="food_move_slot", return_status=True,
    )
    if not saved or saved.get("status") not in {"updated", "duplicate"}:
        ev(cid, "journal_mutation_failed", meta=f"move_slot|{(saved or {}).get('status', 'failed')}",
           user_generation=generation)
        return {"ok": False, "text": "Не получилось перенести запись. Дневник не меняла — попробуй ещё раз."}
    verified = meal_get(cid, meal_id)
    if not verified or verified.get("slot") != slot or verified.get("slot_guessed"):
        ev(cid, "journal_mutation_failed", meta="move_slot|verify_failed", user_generation=generation)
        return {"ok": False, "text": "Не смогла проверить перенос в дневнике. Попробуй ещё раз."}
    if saved.get("updated"):
        ev(cid, "journal_mutation_executed", meta="move_slot|food", user_generation=generation)
        ev(cid, "tool_execution", meta="success|move_meal_slot|journal", user_generation=generation)
    ev(cid, "journal_mutation_verified", meta="move_slot|food", user_generation=generation)
    return {
        "ok": True,
        "text": (
            f"Перенесла в {SLOT_RU[slot]}: {_meal_items_line(verified)}. "
            "Проверила — запись уже обновлена в разделе «Питание»."
        ),
        "record_id": meal_id,
        "rec": verified,
        "mutation": {"kind": "food_update", "date": verified.get("date") or dtoday().isoformat()},
    }

async def append_meal_item_action(cid, u, meal_id, food_text, user_generation=None,
                                  mutation_key=None, preparsed_food_record=None):
    """Append one omitted item, recompute totals in code, and verify the update."""
    generation = _user_generation(cid) if user_generation is None else int(user_generation)
    current = meal_get(cid, meal_id)
    if not current:
        return {"ok": False, "text": "Не нашла запись, куда добавить продукт. Уточни нужный приём пищи."}
    addition = str(food_text or "").strip()[:500]
    if not addition:
        return {"ok": False, "text": "Не поняла, какой продукт пропущен. Напиши название и количество."}
    args_hash = chat_mutation_args_hash("food_update", f"{meal_id}\nappend={addition}")
    prior = chat_mutation_preflight(cid, mutation_key, "food_append", args_hash)
    if prior:
        if prior["status"] == "duplicate" and prior.get("data"):
            verified = meal_get(cid, meal_id) or prior["data"]
            return {
                "ok": True,
                "text": (
                    f"Эта позиция уже добавлена в {SLOT_RU.get(verified.get('slot'), 'приём пищи')}: "
                    f"{_meal_items_line(verified)}."
                ),
                "record_id": meal_id,
                "rec": verified,
                "mutation": {"kind": "food_update", "date": verified.get("date") or dtoday().isoformat()},
            }
        if prior["status"] == "stale":
            return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
        return {"ok": False, "text": "Не стала повторять дополнение: идентификатор запроса уже использован."}
    usage = []
    parsed = preparsed_food_record if isinstance(preparsed_food_record, dict) else None
    if parsed is None:
        parsed = await llm_to_thread(
            cid, "food_text", L.analyze_food_text, addition, profile_of(u), usage,
            journal_v2_enabled(cid),
            user_generation=generation,
        )
    if not _user_write_allowed(cid, generation):
        return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
    if usage:
        ev(cid, "tokens", sum(usage), meta="food_text", calls=len(usage), usage=usage,
           user_generation=generation)
    extra = normalize_food(parsed, "text") if parsed else None
    if not extra or not _items_or_synthetic(extra):
        return {"ok": False, "text": "Не смогла разобрать пропущенный продукт. Уточни название и количество."}
    current_items = _items_or_synthetic(current)
    extra_items = _items_or_synthetic(extra)
    if all(
        any(_same_food_item(add.get("name"), old.get("name")) for old in current_items)
        for add in extra_items
    ):
        return {
            "ok": True,
            "text": (
                f"Проверила дневник: {_meal_items_line(extra)} уже есть в "
                f"{SLOT_RU.get(current.get('slot'), 'этом приёме пищи')}. Ничего не дублировала."
            ),
            "record_id": meal_id,
            "rec": current,
            "mutation": {"kind": "food_update", "date": current.get("date") or dtoday().isoformat()},
        }
    merged = current_items + extra_items
    rec = {
        "title": ", ".join(str(x.get("name") or "") for x in merged[:4])[:80] or current["title"],
        "items": merged,
        "source": "text",
        "slot": current.get("slot"),
        "slot_guessed": bool(current.get("slot_guessed")),
        "fclass": current.get("fclass"),
        "kcal": sum(int(x.get("kcal") or 0) for x in merged),
        "protein": round(sum(float(x.get("protein") or 0) for x in merged), 1),
        "fat": round(sum(float(x.get("fat") or 0) for x in merged), 1),
        "carbs": round(sum(float(x.get("carbs") or 0) for x in merged), 1),
        "grams": sum(int(x.get("grams") or 0) for x in merged) or None,
    }
    saved = meal_update(
        cid, meal_id, rec, user_generation=generation, mutation_key=mutation_key,
        args_hash=args_hash, mutation_kind="food_append", return_status=True,
    )
    if not saved or saved.get("status") not in {"updated", "duplicate"}:
        ev(cid, "journal_mutation_failed", meta=f"append|{(saved or {}).get('status', 'failed')}",
           user_generation=generation)
        return {"ok": False, "text": "Не получилось дополнить запись. Дневник не меняла — попробуй ещё раз."}
    verified = meal_get(cid, meal_id)
    if not verified:
        ev(cid, "journal_mutation_failed", meta="append|verify_failed", user_generation=generation)
        return {"ok": False, "text": "Не смогла проверить дополнение в дневнике. Попробуй ещё раз."}
    if saved.get("updated"):
        ev(cid, "journal_mutation_executed", meta="append|food", user_generation=generation)
        ev(cid, "tool_execution", meta="success|append_meal_item|journal", user_generation=generation)
    ev(cid, "journal_mutation_verified", meta="append|food", user_generation=generation)
    return {
        "ok": True,
        "text": (
            f"Проверила: этой позиции не было. Добавила в {SLOT_RU.get(verified.get('slot'), 'приём пищи')}: "
            f"{_meal_items_line(extra)}. Итог записи — около {verified['kcal']} ккал "
            f"(Б{round(verified['protein'])} Ж{round(verified['fat'])} У{round(verified['carbs'])})."
        ),
        "record_id": meal_id,
        "rec": verified,
        "mutation": {"kind": "food_update", "date": verified.get("date") or dtoday().isoformat()},
    }

async def log_food_update_action(cid, u, text, target_id, user_generation=None,
                                 mutation_key=None, preparsed_food_text=None,
                                 preparsed_food_record=None):
    """Update one explicit owned meal, then acknowledge only the verified DB row."""
    generation = _user_generation(cid) if user_generation is None else int(user_generation)
    args_hash = chat_mutation_args_hash("food_update", f"{target_id}\n{text}")
    prior = chat_mutation_preflight(cid, mutation_key, "food_update", args_hash)
    if prior:
        if prior["status"] == "duplicate" and prior.get("data"):
            saved_date = date.fromisoformat(prior["data"].get("date") or dtoday().isoformat())
            return _food_update_success(prior["data"], prior.get("id"), saved_date)
        if prior["status"] == "stale":
            return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
        return {"ok": False, "text": "Не стала повторять исправление: идентификатор запроса уже использован."}
    current = meal_get(cid, target_id)
    if not current:
        return {"ok": False, "text": "Не нашла запись, которую нужно исправить. Открой дневник и уточни приём пищи."}
    ev(cid, "journal_action_planned", meta="update|food", user_generation=generation)
    correction = str(preparsed_food_text or "").strip()[:500]
    grams_match = re.search(r"\b(\d{1,4})\s*(?:г|гр|грамм\w*)\b", text or "", re.I)
    if not correction:
        correction = (
            f"{current['title']}, {grams_match.group(1)} г"
            if grams_match else f"{current['title']}. Уточнение пользовательницы: {text}"
        )
    usage = []
    parsed = preparsed_food_record if isinstance(preparsed_food_record, dict) else None
    if parsed is None:
        parsed = await llm_to_thread(
            cid, "food_update", L.analyze_food_text, correction, profile_of(u), usage,
            journal_v2_enabled(cid),
            user_generation=generation,
        )
    if not _user_write_allowed(cid, generation):
        return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
    if usage:
        ev(cid, "tokens", sum(usage), meta="food_update", calls=len(usage), usage=usage,
           user_generation=generation)
    rec = normalize_food(parsed, "text") if parsed else None
    if not rec and grams_match and current.get("grams"):
        new_grams = int(grams_match.group(1))
        ratio = new_grams / float(current["grams"])
        rec = dict(current)
        rec.update({
            "grams": new_grams,
            "kcal": int(round(current["kcal"] * ratio)),
            "protein": round(current["protein"] * ratio, 1),
            "fat": round(current["fat"] * ratio, 1),
            "carbs": round(current["carbs"] * ratio, 1),
            "source": "text",
        })
    if not rec:
        return {"ok": False, "text": "Не поняла исправление. Уточни продукт и новое количество, например «чипсов было 100 г»."}
    rec["slot"] = current.get("slot") or slot_for_now()
    saved = meal_update(
        cid, target_id, rec, user_generation=generation, mutation_key=mutation_key,
        args_hash=args_hash, return_status=True,
    )
    if not saved or saved.get("status") not in {"updated", "duplicate"}:
        ev(cid, "journal_mutation_failed", meta=f"food_update|{(saved or {}).get('status', 'failed')}",
           user_generation=generation)
        return {"ok": False, "text": "Не получилось исправить запись. Ничего не меняла — попробуй ещё раз."}
    verified = meal_get(cid, target_id)
    if not verified:
        ev(cid, "journal_mutation_failed", meta="food_update|verify_failed", user_generation=generation)
        return {"ok": False, "text": "Не смогла проверить исправление в дневнике. Попробуй ещё раз."}
    if saved.get("updated"):
        ev(cid, "journal_mutation_executed", meta="update|food", user_generation=generation)
        ev(cid, "tool_execution", meta="success|update_meal|journal", user_generation=generation)
    ev(cid, "journal_mutation_verified", meta="update|food", user_generation=generation)
    return _food_update_success(
        verified, target_id, date.fromisoformat(verified.get("date") or dtoday().isoformat()),
    )

async def log_workout_action(cid, u, text, user_generation=None, mutation_key=None, preparsed_workout=None):
    generation = _user_generation(cid) if user_generation is None else int(user_generation)
    args_hash = chat_mutation_args_hash("workout", text)
    prior = chat_mutation_preflight(cid, mutation_key, "workout", args_hash)
    if prior:
        if prior["status"] == "mismatch":
            return {"ok": False, "text": "Не стала повторять запрос: его идентификатор уже использован для другой записи."}
        if prior["status"] == "reversed":
            return {"ok": False, "text": "Эта тренировка уже была отменена и не добавлена повторно."}
        if prior["status"] == "duplicate" and prior.get("data"):
            saved_date = date.fromisoformat(prior["data"].get("date") or dtoday().isoformat())
            return _workout_action_success(prior["data"], prior.get("id"), saved_date)
        if prior["status"] == "stale":
            return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
    event_date, date_error = chat_event_date(text, max_past_days=90)
    if date_error:
        return {"ok": False, "text": "Не стала записывать: тренировка должна быть сегодня или в последние 90 дней."}
    ev(cid, "flow_start", meta="workout", user_generation=generation)
    usage = []
    parsed = preparsed_workout if isinstance(preparsed_workout, dict) else None
    if parsed is None:
        try:
            parsed = await llm_to_thread(
                cid, "workout_text", L.analyze_workout_text, text, usage,
                user_generation=generation,
            )
        except Exception as exc:
            log.warning("workout text analyze %s: %s", cid, exc)
            parsed = None
    if not _user_write_allowed(cid, generation):
        return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
    if usage:
        ev(cid, "tokens", sum(usage), meta="workout_text", calls=len(usage), usage=usage,
           user_generation=generation)
    rec = normalize_workout(parsed or basic_workout_from_text(text), text)
    if not rec:
        return {"ok": False, "text": "Не поняла, какую тренировку записать. Напиши, например «бегала 30 минут, запиши тренировку»."}
    prof = profile_of(u) or {}
    # Как в мини-аппе: без явной длительности считаем от 40 минут, чтобы запись
    # из чата не висела с нулём калорий в дневнике приложения.
    rec["kcal"] = workout_calories(
        rec["type"], rec.get("duration") or "40 мин", rec.get("rpe"), prof.get("weight")
    )
    saved = workout_add(
        cid, rec, d=event_date.isoformat(), user_generation=generation, mutation_key=mutation_key,
        args_hash=args_hash, return_status=True,
    )
    if not saved or saved.get("status") == "mismatch":
        return {"ok": False, "text": "Не стала повторять запрос: его идентификатор уже использован для другой записи."}
    if saved.get("status") == "reversed":
        return {"ok": False, "text": "Эта тренировка уже была отменена и не добавлена повторно."}
    wid = saved.get("id")
    if not wid:
        return {"ok": False, "text": "Не получилось сохранить тренировку. Попробуй ещё раз."}
    verified = workout_get(cid, wid)
    if not verified:
        ev(cid, "journal_mutation_failed", meta="workout|verify_failed", user_generation=generation)
        return {"ok": False, "text": "Тренировка отправилась на сохранение, но я не смогла проверить её в дневнике. Попробуй ещё раз."}
    rec = verified
    if not _user_write_allowed(cid, generation):
        return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
    if saved.get("created"):
        ev(cid, "goal", meta="workout", user_generation=generation)
        ev(cid, "manual", meta="workout", user_generation=generation)
        ev(cid, "journal_mutation_executed", meta="create|workout", user_generation=generation)
        ev(cid, "tool_execution", meta="success|create_workout|journal", user_generation=generation)
    ev(cid, "journal_mutation_verified", meta="create|workout", user_generation=generation)
    return _workout_action_success(rec, wid, date.fromisoformat(rec.get("date") or event_date.isoformat()))

async def log_workout_update_action(cid, u, text, target_id, user_generation=None,
                                    mutation_key=None, preparsed_workout=None):
    """Update one explicit owned workout and confirm only its verified DB state."""
    generation = _user_generation(cid) if user_generation is None else int(user_generation)
    args_hash = chat_mutation_args_hash("workout_update", f"{target_id}\n{text}")
    prior = chat_mutation_preflight(cid, mutation_key, "workout_update", args_hash)
    if prior:
        if prior["status"] == "duplicate" and prior.get("data"):
            saved_date = date.fromisoformat(prior["data"].get("date") or dtoday().isoformat())
            return _workout_update_success(prior["data"], prior.get("id"), saved_date)
        if prior["status"] == "stale":
            return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
        return {"ok": False, "text": "Не стала повторять исправление: идентификатор запроса уже использован."}
    current = workout_get(cid, target_id)
    if not current:
        return {"ok": False, "text": "Не нашла тренировку, которую нужно исправить. Открой раздел «Нагрузка» и уточни запись."}
    ev(cid, "journal_action_planned", meta="update|workout", user_generation=generation)
    usage = []
    parsed = preparsed_workout if isinstance(preparsed_workout, dict) else None
    if parsed is None:
        parsed = await llm_to_thread(
            cid, "workout_update", L.analyze_workout_text,
            f"{current['type']} {current.get('note') or ''}. Уточнение: {text}", usage,
            user_generation=generation,
        )
    if not _user_write_allowed(cid, generation):
        return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
    if usage:
        ev(cid, "tokens", sum(usage), meta="workout_update", calls=len(usage), usage=usage,
           user_generation=generation)
    rec = normalize_workout(parsed, text) if parsed else None
    if not rec:
        return {"ok": False, "text": "Не поняла исправление тренировки. Уточни длительность, упражнение или количество повторов."}
    for field in ("type", "duration", "rpe", "note", "review", "muscles"):
        if not rec.get(field) and current.get(field):
            rec[field] = current[field]
    if not rec.get("items") and current.get("items"):
        rec["items"] = current["items"]
    prof = profile_of(u) or {}
    # Как в мини-аппе: без явной длительности считаем от 40 минут, чтобы запись
    # из чата не висела с нулём калорий в дневнике приложения.
    rec["kcal"] = workout_calories(
        rec["type"], rec.get("duration") or "40 мин", rec.get("rpe"), prof.get("weight")
    )
    saved = workout_update(
        cid, target_id, rec, user_generation=generation, mutation_key=mutation_key,
        args_hash=args_hash, return_status=True,
    )
    if not saved or saved.get("status") not in {"updated", "duplicate"}:
        ev(cid, "journal_mutation_failed", meta=f"workout_update|{(saved or {}).get('status', 'failed')}",
           user_generation=generation)
        return {"ok": False, "text": "Не получилось исправить тренировку. Ничего не меняла — попробуй ещё раз."}
    verified = workout_get(cid, target_id)
    if not verified:
        ev(cid, "journal_mutation_failed", meta="workout_update|verify_failed", user_generation=generation)
        return {"ok": False, "text": "Не смогла проверить исправление тренировки. Попробуй ещё раз."}
    if saved.get("updated"):
        ev(cid, "journal_mutation_executed", meta="update|workout", user_generation=generation)
        ev(cid, "tool_execution", meta="success|update_workout|journal", user_generation=generation)
    ev(cid, "journal_mutation_verified", meta="update|workout", user_generation=generation)
    return _workout_update_success(
        verified, target_id, date.fromisoformat(verified.get("date") or dtoday().isoformat()),
    )

async def log_period_action(cid, u, text, context=None, user_generation=None, mutation_key=None):
    generation = _user_generation(cid) if user_generation is None else int(user_generation)
    if is_male_profile(row(cid)):
        ev(cid, "male_mode_block", meta="period_start")
        return {"ok": False, "text": MALE_PROFILE_FUNCTION_TEXT}
    args_hash = chat_mutation_args_hash("period_start", text)
    event_date, date_error = chat_event_date(text, max_past_days=366)
    if date_error:
        return {"ok": False, "text": "Не стала менять календарь: дата не должна быть в будущем и старше одного года."}
    iso = event_date.isoformat()
    saved = _save_period_start_atomic(
        cid, iso, user_generation=generation, protect_modes=True, enforce_spacing=True,
        mutation_key=mutation_key, args_hash=args_hash,
    )
    if saved["status"] == "mismatch":
        return {"ok": False, "text": "Не стала повторять запрос: его идентификатор уже использован для другой записи."}
    if saved["status"] == "protected":
        if saved.get("mode") == "male":
            return {"ok": False, "text": MALE_PROFILE_FUNCTION_TEXT}
        label = "беременности" if saved.get("mode") == "preg" else "менопаузы"
        return {"ok": False, "text": f"Сейчас включён режим {label}, поэтому я не стала менять календарь автоматически. Сначала переключи режим в приложении, если это неактуально."}
    if saved["status"] == "duplicate":
        saved_iso = saved.get("date") or iso
        return {"ok": True, "text": f"Начало месячных {date.fromisoformat(saved_iso).strftime('%d.%m.%Y')} уже отмечено в календаре.",
                "mutation": {"kind": "period", "date": saved_iso}}
    if saved["status"] == "conflict":
        return {"ok": False, "text": f"В календаре уже есть начало {date.fromisoformat(saved['date']).strftime('%d.%m.%Y')}. Не стала создавать новый цикл так близко — проверь даты в календаре приложения."}
    if saved["status"] != "created":
        return {"ok": False, "text": "Не получилось сохранить дату. Попробуй ещё раз."}
    if not _user_write_allowed(cid, generation):
        return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
    if context is not None:
        current = row(cid)
        if current and _user_write_allowed(cid, generation):
            schedule_daily(context.application, cid, current["send_time"] or "08:00")
    ev(cid, "goal", meta="period", user_generation=generation)
    ev(cid, "manual", meta="period_chat", user_generation=generation)
    return {"ok": True,
            "text": f"Отметила начало месячных: {event_date.strftime('%d.%m.%Y')}. Прогноз цикла обновлён, дата уже видна в календаре приложения.",
            "mutation": {"kind": "period", "date": iso}}

async def log_period_end_action(cid, u, text, user_generation=None, mutation_key=None):
    generation = _user_generation(cid) if user_generation is None else int(user_generation)
    if is_male_profile(row(cid)):
        ev(cid, "male_mode_block", meta="period_end")
        return {"ok": False, "text": MALE_PROFILE_FUNCTION_TEXT}
    args_hash = chat_mutation_args_hash("period_end", text)
    event_date, date_error = chat_event_date(text, max_past_days=31)
    if date_error:
        return {"ok": False, "text": "Не стала менять календарь: дата окончания должна быть сегодня или в последние 31 день."}
    saved = _save_period_end_atomic(
        cid, event_date.isoformat(), user_generation=generation,
        mutation_key=mutation_key, args_hash=args_hash,
    )
    if saved["status"] == "mismatch":
        return {"ok": False, "text": "Не стала повторять запрос: его идентификатор уже использован для другой записи."}
    if saved["status"] == "protected":
        return {"ok": False, "text": MALE_PROFILE_FUNCTION_TEXT}
    if saved["status"] == "duplicate":
        saved_end = date.fromisoformat(saved.get("end") or event_date.isoformat())
        return {
            "ok": True,
            "text": f"Окончание месячных {saved_end.strftime('%d.%m.%Y')} уже записано. Длительность — {saved.get('length')} дн.",
            "mutation": {"kind": "period", "date": saved.get("start"), "end": saved_end.isoformat()},
        }
    if saved["status"] == "missing":
        return {"ok": False, "text": "Сначала отметь начало последних месячных, тогда я смогу записать окончание."}
    if saved["status"] == "invalid":
        return {"ok": False, "text": "Дата не сходится с последним началом месячных. Проверь начало и окончание в календаре приложения."}
    if saved["status"] != "saved":
        return {"ok": False, "text": "Не получилось сохранить окончание месячных. Попробуй ещё раз."}
    if not _user_write_allowed(cid, generation):
        return {"ok": False, "text": "Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start."}
    ev(cid, "manual", meta="period_end_chat", user_generation=generation)
    return {
        "ok": True,
        "text": f"Записала окончание месячных: {event_date.strftime('%d.%m.%Y')}. Длительность — {saved['length']} дн., календарь приложения обновлён.",
        "mutation": {"kind": "period", "date": saved["start"], "end": event_date.isoformat()},
    }

def _read_upload(field):
    if field is None: return b"", "food.jpg"
    raw = b""
    try: raw = field.file.read()
    except Exception:
        raw = field if isinstance(field, (bytes, bytearray)) else b""
    return bytes(raw), (getattr(field, "filename", "food.jpg") or "food.jpg")

async def _api_food_photo(request):
    return await _api_food_photo_bounded(request)


def _prepare_food_photo(cid):
    _evict_week_food_cache(cid)
    generation = _user_generation(cid)
    u = row(cid)
    if not is_onboarded(u) or not _user_write_allowed(cid, generation):
        return None
    ev(cid, "flow_start", meta="food", user_generation=generation)
    return generation, profile_of(u)


def _food_photo_mutation_identity(raw, target=None, request_id=None):
    """Give retries of the same compressed upload one durable meal mutation.

    The day is part of the identity so deliberately reusing a photo on a later
    day remains a new diary entry.  `chat_mutations` is lifecycle-owned and is
    deleted with the account, so the digest cannot bridge a reactivation.
    """
    digest = _hashlib.sha256(bytes(raw)).hexdigest()
    target = str(target or dtoday().isoformat())
    stable_request_id = str(request_id or "").strip()
    identity = stable_request_id or (target + ":" + digest)
    args_hash = _hashlib.sha256(
        (target + "\n" + digest).encode("utf-8")
    ).hexdigest()
    return target, chat_mutation_key("webphoto", identity), args_hash


def _food_photo_committed_receipt(cid, target, mutation, rec, prior_diary):
    """Unambiguous fallback when the canonical diary read fails post-commit."""
    try:
        prior_diary = diary_payload(cid, d=target)
    except Exception:
        pass
    mid = mutation["id"]
    saved = dict(mutation.get("data") or rec)
    saved.update({"id": mid, "date": target})
    meals = [
        item for item in (prior_diary.get("meals") or [])
        if item.get("id") != mid
    ]
    meals.append(saved)
    diary = {
        **prior_diary,
        "date": target,
        "meals": meals,
        "totals": _diary_totals_from_meals(meals),
    }
    payload = {
        "ok": True,
        "committed": True,
        "receipt_pending": True,
        "duplicate": mutation.get("status") == "duplicate",
        "date": target,
        "meal_id": mid,
        "meal": saved,
        "rec": rec,
        "diary": diary,
    }
    payload.update(diary)
    return payload


def _food_photo_mutation_response(
    cid, generation, target, mutation, rec, prior_diary,
):
    mid = mutation["id"]
    target = str((mutation.get("data") or {}).get("date") or target)
    committed_rec = dict(mutation.get("data") or rec)
    try:
        saved = meal_get(cid, mid)
        if not saved:
            raise RuntimeError("meal receipt verification failed")
        out = _diary_mutation_receipt(
            cid, target, meal_id=mid, rec=committed_rec, meal=saved
        )
        out.update({
            "committed": True,
            "receipt_pending": False,
            "duplicate": mutation.get("status") == "duplicate",
        })
        if not _user_write_allowed(cid, generation):
            return _cors(web.json_response(
                _api_error_payload("deleted", "Профиль уже удалён."), status=409
            ))
        return _cors(web.json_response(out))
    except Exception:
        # The meal and its mutation receipt were committed together.  A failed
        # follow-up diary read must not tell the client to repeat the insert.
        log.warning("FOOD receipt read failed after commit for %s/%s", cid, mid)
        if not _user_write_allowed(cid, generation):
            return _cors(web.json_response(
                _api_error_payload("deleted", "Профиль уже удалён."), status=409
            ))
        fallback = _food_photo_committed_receipt(
            cid, target, mutation, committed_rec, prior_diary
        )
        if not _user_write_allowed(cid, generation):
            return _cors(web.json_response(
                _api_error_payload("deleted", "Профиль уже удалён."), status=409
            ))
        return _cors(web.json_response(fallback))


def _finalize_food_photo(
    cid, generation, parsed, usage, prof, mutation_key=None, args_hash=None,
    target=None,
):
    if not _user_write_allowed(cid, generation):
        return _cors(web.json_response({"error": "deleted"}, status=409))
    ev(
        cid, "tokens", sum(usage), meta="food_photo", calls=len(usage),
        usage=usage, user_generation=generation,
    )
    rec = normalize_food(parsed, "photo") if parsed else None
    if not rec:
        _e = ""
        try: _e = L.last_food_err()
        except Exception: pass
        msg = "Не разобрала фото. Сфоткай ближе и светлее, либо добавь текстом."
        if _e: msg += " [" + _e + "]"
        payload = _api_error_payload("food_not_recognized", msg)
        return _cors(web.json_response(payload, status=422))
    target = str(target or dtoday().isoformat())
    try:
        # Keep a complete pre-commit snapshot for the rare case where the
        # canonical follow-up read fails. Legacy host code applies successful
        # responses directly, so a partial payload must never look like an
        # intentionally empty diary.
        prior_diary = diary_payload(cid, prof, d=target)
    except Exception:
        log.warning("FOOD pre-commit diary read failed for %s", cid)
        return _cors(web.json_response(
            _api_error_payload("food_save_failed", "Не удалось сохранить распознанный приём пищи."),
            status=500,
        ))
    try:
        mutation = meal_add(
            cid, rec, d=target, user_generation=generation,
            mutation_key=mutation_key, args_hash=args_hash,
            return_status=True,
        )
        if mutation is None:
            return _cors(web.json_response(
                _api_error_payload("deleted", "Профиль уже удалён."), status=409
            ))
        if mutation.get("status") in {"mismatch", "reversed"}:
            return _cors(web.json_response(
                _api_error_payload(
                    "food_mutation_conflict",
                    "Этот запрос на добавление уже завершён с другими данными.",
                ), status=409,
            ))
    except Exception:
        import traceback; log.warning("FOOD save FAIL %s: %s", cid, traceback.format_exc())
        return _cors(web.json_response(
            _api_error_payload("food_save_failed", "Не удалось сохранить распознанный приём пищи."),
            status=500,
        ))

    if mutation.get("created"):
        # A review may start after admission invalidated the old cache but
        # before the long vision request commits this meal. Bump again at the
        # actual write boundary so that review cannot publish its old snapshot.
        _evict_week_food_cache(cid)
        ev(cid, "goal", meta="food_log", user_generation=generation)
        ev(cid, "manual", meta="food_log", user_generation=generation)
    return _food_photo_mutation_response(
        cid, generation, target, mutation, rec, prior_diary
    )


async def _api_food_photo_bounded(request):
    try:
        data = await request.post()
    except Exception:
        return _cors(web.json_response(
            _api_error_payload("invalid_photo", "Не получила фото."), status=400
        ))
    cid = _verify_init(data.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    prepared = await asyncio.to_thread(_prepare_food_photo, cid)
    if not prepared:
        return _cors(web.json_response(
            _api_error_payload("onboard", "Сначала настрой Айву в боте: /start."), status=403
        ))
    generation, prof = prepared
    raw, fn = _read_upload(data.get("photo"))
    if not raw:
        return _cors(web.json_response(
            _api_error_payload("empty_photo", "Пустое фото."), status=400
        ))
    if len(raw) > 12 * 1024 * 1024:
        return _cors(web.json_response(
            _api_error_payload("photo_too_large", "Фото слишком большое, сожми и попробуй ещё раз."),
            status=413,
        ))
    received_today = dtoday()
    requested_target = data.get("target") or received_today.isoformat()
    parsed_target, target_error, target_status = _validated_moscow_iso(
        requested_target, max_age=1, field="target"
    )
    if target_error:
        return _cors(web.json_response(target_error, status=target_status))
    target, mutation_key, args_hash = _food_photo_mutation_identity(
        raw, parsed_target.isoformat(), data.get("request_id")
    )
    prior = chat_mutation_preflight(cid, mutation_key, "food", args_hash)
    if prior:
        if prior.get("status") == "stale" or not _user_write_allowed(
            cid, generation
        ):
            return _cors(web.json_response(
                _api_error_payload("deleted", "Профиль уже удалён."), status=409
            ))
        if prior.get("status") != "duplicate":
            return _cors(web.json_response(
                _api_error_payload(
                    "food_mutation_conflict",
                    "Этот запрос на добавление уже завершён с другими данными.",
                ), status=409,
            ))
        try:
            prior_diary = diary_payload(cid, prof, d=target)
        except Exception:
            return _cors(web.json_response({
                **_api_error_payload(
                    "food_receipt_failed",
                    "Приём уже сохранён, но дневник пока не обновился.",
                ),
                "committed": True,
                "meal_id": prior.get("id"),
                "date": target,
            }, status=503))
        return _food_photo_mutation_response(
            cid, generation, target, prior, prior.get("data") or {},
            prior_diary,
        )
    if target != received_today.isoformat():
        return _cors(web.json_response(
            _api_error_payload(
                "food_target_expired",
                "Этот запрос на фото уже завершён. Добавь фото ещё раз для нового дня.",
            ), status=409,
        ))
    acquired = await _acquire_food_vision_slot()
    if not acquired:
        ev(
            cid, "fallback", meta="food_vision_busy",
            user_generation=generation,
        )
        return _cors(web.json_response(
            {
                "ok": False,
                "error": "busy",
                "message": (
                    "Сейчас разбираю много фотографий, поэтому фото не сохранила. "
                    "Попробуй ещё раз через минуту или добавь приём текстом."
                ),
            },
            status=429,
        ))
    usage = []
    try:
        try:
            parsed = await llm_to_thread(
                cid, "food_vision", L.analyze_food, raw, fn, prof, usage,
                user_generation=generation,
            )
        except Exception as e:
            log.warning("food_photo analyze %s: %s", cid, e); parsed = None
        return await asyncio.to_thread(
            _finalize_food_photo, cid, generation, parsed, usage, prof,
            mutation_key, args_hash, target,
        )
    finally:
        _release_food_vision_slot()

async def _api_food_text(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    generation = _user_generation(cid)
    u = row(cid)
    if not is_onboarded(u):
        return _cors(web.json_response({"ok": False, "message": "Сначала настрой Айву в боте."}, status=403))
    if not _user_write_allowed(cid, generation):
        return _cors(web.json_response(
            _api_error_payload("deleted", "Профиль уже удалён."), status=409
        ))
    _evict_week_food_cache(cid)
    txt = (body.get("text") or "").strip()
    if not txt: return _cors(web.json_response({"ok": False, "message": "Опиши приём пищи."}))
    ev(cid, "flow_start", meta="food", user_generation=generation)
    prof = profile_of(u)
    journal_v2 = journal_v2_enabled(cid)
    if not _user_write_allowed(cid, generation):
        return _cors(web.json_response(
            _api_error_payload("deleted", "Профиль уже удалён."), status=409
        ))
    usage = []
    try:
        parsed = await llm_to_thread(
            cid, "food_text", L.analyze_food_text, txt, prof, usage,
            journal_v2,
                                     user_generation=generation)
    except Exception as e:
        log.warning("food_text analyze %s: %s", cid, e); parsed = None
    if not _user_write_allowed(cid, generation):
        return _cors(web.json_response({"error": "deleted"}, status=409))
    ev(
        cid, "tokens", sum(usage), meta="food_text", calls=len(usage),
        usage=usage, user_generation=generation,
    )
    rec = normalize_food(parsed, "text") if parsed else None
    if not rec or not food_record_admissible(rec):
        return _cors(web.json_response({"ok": False, "message": "Не поняла блюдо. Уточни, например «200 г творога и банан»."}))
    _bslot = body.get("slot")
    _sl = slot_from_text(txt)
    if _bslot in ("breakfast", "lunch", "snack", "dinner"): rec["slot"] = _bslot
    elif _sl: rec["slot"] = _sl
    try:
        mid = meal_add(cid, rec, user_generation=generation)
        if mid is None:
            return _cors(web.json_response(
                _api_error_payload("deleted", "Профиль уже удалён."), status=409
            ))
        # The pre-LLM invalidation does not cover a weekly review that starts
        # while analysis is running. Invalidate again after the atomic insert.
        _evict_week_food_cache(cid)
        ev(cid, "goal", meta="food_log", user_generation=generation)
        ev(cid, "manual", meta="food_log", user_generation=generation)
        out = {"ok": True, "meal_id": mid, "rec": rec}; out.update(diary_payload(cid, prof))
        if not _user_write_allowed(cid, generation):
            return _cors(web.json_response(
                _api_error_payload("deleted", "Профиль уже удалён."), status=409
            ))
        return _cors(web.json_response(out))
    except Exception as e:
        import traceback; log.warning("FOOD save FAIL %s: %s", cid, traceback.format_exc())
        return _cors(web.json_response({"ok": False, "message": "Сбой сохранения: " + str(e)[:150]}))

def _api_track_sync(cid, body):
    scr = re.sub(r"[^a-z0-9_]", "", str(body.get("screen") or "").lower())[:20]
    flow = re.sub(r"[^a-z0-9_]", "", str(body.get("flow") or "").lower())[:20]
    onboarded = is_onboarded(row(cid))
    if scr and onboarded:
        ev(cid, "button", meta="view_" + scr)
    if flow in {"food", "workout"} and onboarded:
        ev(cid, "flow_start", meta=flow)
    return {"ok": True}

async def _api_track(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    payload = await asyncio.to_thread(_api_track_sync, cid, body)
    return _cors(web.json_response(payload))

async def _api_train_day(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    dd, error, status = _validated_moscow_iso(
        body.get("d"), max_age=READ_HISTORY_DAYS, field="d"
    )
    if error:
        return _cors(web.json_response(error, status=status))
    d = dd.isoformat()
    ev(cid, "button", meta="web_train_day")
    return _cors(web.json_response({"ok": True, "d": d, "workouts": workouts_of(cid, d)}))

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
        "today": tod, "last_review": (tod[-1]["review"] if tod else ""),
        "favorite_types": [t for t, _ in favorite_activities(cid)]}))


def _workout_request_args_hash(target, workout):
    canonical = {"date": target, **workout}
    canonical.pop("review", None)
    raw = json.dumps(canonical, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    return _hashlib.sha256(raw.encode("utf-8")).hexdigest()


def _workout_committed_receipt(cid, mutation, target):
    """Return the durable saved workout even if aggregate refresh is degraded."""
    wid = mutation.get("id")
    try:
        saved = workout_get(cid, wid)
    except Exception:
        saved = None
    receipt_pending = not bool(saved)
    if not saved:
        saved = dict(mutation.get("data") or {})
        saved.update({"id": wid, "date": target})
    payload = {
        "ok": True,
        "committed": True,
        "duplicate": mutation.get("status") == "duplicate",
        "date": target,
        "workout": saved,
        "review": saved.get("review") or "",
        "calories": int(saved.get("kcal") or 0),
        "muscles": saved.get("muscles") or "",
    }
    try:
        payload.update({"week": train_week(cid), "today": workouts_of(cid)})
    except Exception:
        receipt_pending = True
    payload["receipt_pending"] = receipt_pending
    return payload


async def _api_workout(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    generation = _user_generation(cid)
    u = row(cid)
    if not is_onboarded(u): return _cors(web.json_response({"error": "onboard"}, status=403))
    if not _user_write_allowed(cid, generation):
        return _cors(web.json_response(
            _api_error_payload("deleted", "Профиль уже удалён."), status=409
        ))
    workout_day, error, status = _validated_moscow_iso(
        body.get("date"), max_age=WORKOUT_WRITE_DAYS
    )
    if error:
        # Date validation intentionally precedes parsing and the LLM review:
        # unsupported backfills must never spend tokens or fall back to today.
        return _cors(web.json_response(error, status=status))
    d_iso = workout_day.isoformat()
    ev(cid, "flow_start", meta="workout", user_generation=generation)
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
    # «Своё» с единственным вписанным занятием получает его имя как заголовок
    # (обрезанный): в «Прошедших тренировках» видно «Сквош», а не «Своё».
    if wtype in ("Своё", "Тренировка") and len(items) == 1:
        wtype = _custom_workout_title(items[0]["name"]) or wtype
    muscles = ", ".join(groups)
    wk = {"type": wtype, "items": items, "duration": dur, "rpe": rpe, "note": str(body.get("note") or "")[:200],
          "kcal": kcal, "muscles": muscles}
    mutation_key = chat_mutation_key("webworkout", body.get("request_id"))
    args_hash = _workout_request_args_hash(d_iso, wk)
    prior = chat_mutation_preflight(cid, mutation_key, "workout", args_hash)
    if prior:
        if not _user_write_allowed(cid, generation):
            return _cors(web.json_response(
                _api_error_payload("deleted", "Профиль уже удалён."), status=409
            ))
        if prior.get("status") == "duplicate":
            receipt = _workout_committed_receipt(cid, prior, d_iso)
            if not _user_write_allowed(cid, generation):
                return _cors(web.json_response(
                    _api_error_payload("deleted", "Профиль уже удалён."), status=409
                ))
            return _cors(web.json_response(receipt))
        if prior.get("status") == "stale":
            return _cors(web.json_response(
                _api_error_payload("deleted", "Профиль уже удалён."), status=409
            ))
        return _cors(web.json_response(
            _api_error_payload(
                "workout_mutation_conflict",
                "Этот запрос на тренировку уже завершён с другими данными.",
            ), status=409,
        ))
    _, st = status_of(cid); phase_ru = (st or {}).get("phase_ru") if st else None
    recent_workouts = workouts_recent(cid)
    train_profile = train_profile_get(cid)
    if not _user_write_allowed(cid, generation):
        return _cors(web.json_response(
            _api_error_payload("deleted", "Профиль уже удалён."), status=409
        ))
    usage = []
    try:
        review = await llm_to_thread(cid, "workout_review", L.training_review, wk, recent_workouts, phase_ru, u.get("mode"), train_profile, usage,
                                     user_generation=generation)
    except Exception as e:
        review = ""; log.warning("train review %s: %s", cid, e)
    if not _user_write_allowed(cid, generation):
        return _cors(web.json_response({"error": "deleted"}, status=409))
    wk["review"] = review
    try:
        mutation = workout_add(
            cid, wk, d=d_iso, user_generation=generation,
            mutation_key=mutation_key, args_hash=args_hash,
            return_status=True,
        )
    except Exception as e:
        log.warning("web workout save failed %s/%s: %s", cid, d_iso, e)
        return _cors(web.json_response(
            _api_error_payload("workout_save_failed", "Не удалось сохранить тренировку."),
            status=500,
        ))
    if not mutation:
        return _cors(web.json_response(
            _api_error_payload("deleted", "Профиль уже удалён."),
            status=409,
        ))
    if mutation.get("status") in {"mismatch", "reversed"}:
        return _cors(web.json_response(
            _api_error_payload(
                "workout_mutation_conflict",
                "Этот запрос на тренировку уже завершён с другими данными.",
            ), status=409,
        ))
    if usage:
        ev(
            cid, "tokens", sum(usage), meta="workout", calls=len(usage),
            usage=usage, user_generation=generation,
        )
    if mutation.get("created"):
        ev(cid, "goal", meta="workout", user_generation=generation)
        ev(cid, "manual", meta="workout", user_generation=generation)
    receipt = _workout_committed_receipt(cid, mutation, d_iso)
    if not _user_write_allowed(cid, generation):
        return _cors(web.json_response(
            _api_error_payload("deleted", "Профиль уже удалён."), status=409
        ))
    return _cors(web.json_response(receipt))

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
    _d = None
    if "d" in body:
        _dd, error, status = _validated_moscow_iso(
            body.get("d"), max_age=READ_HISTORY_DAYS, field="d"
        )
        if error:
            return _cors(web.json_response(error, status=status))
        _d = _dd.isoformat()
    payload = await asyncio.to_thread(_diary_payload_with_recent, cid, _d)
    payload["asset_revision"] = FA.RESOLVER.generated_revision()
    _offer_food_asset_candidates(payload.get("meals") or [])
    for recent in (payload.get("recent") or {}).values():
        if isinstance(recent, dict):
            _offer_food_asset_candidates(recent.get("meals") or [])
    return _cors(web.json_response(payload))

def _diary_mutation_receipt(cid, target, **extra):
    diary = diary_payload(cid, d=target)
    diary["asset_revision"] = FA.RESOLVER.generated_revision()
    _offer_food_asset_candidates(diary.get("meals") or [])
    if isinstance(extra.get("meal"), dict):
        wanted = extra["meal"].get("id")
        extra["meal"] = next(
            (item for item in diary.get("meals") or [] if item.get("id") == wanted),
            extra["meal"],
        )
    payload = {"ok": True, "date": target, "diary": diary, **diary}
    payload.update(extra)
    return payload


def _diary_target_snapshot(cid):
    user = row(cid)
    prof = profile_of(user) if user else None
    target = profile_kcal(prof) if prof else None
    return (
        {"kcal": target[0], "protein": target[1], "fat": target[2], "carbs": target[3]}
        if target else None
    )


def _diary_snapshot_conn(c, cid, target, nutrition_target=None):
    rows = c.execute(
        """SELECT id,ts,title,kcal,protein,fat,carbs,grams,items,source,
                  slot,fclass,slot_guessed
           FROM meals WHERE chat_id=? AND d=? ORDER BY ts""",
        (cid, target),
    ).fetchall()
    meals = [_meal_row_payload(item) for item in rows]
    return {
        "meals": meals,
        "totals": _diary_totals_from_meals(meals),
        "date": target,
        "target": nutrition_target,
    }


def _stored_food_mutation_receipt(data, *, duplicate=False):
    """Materialize the full day stored in the same transaction as a mutation."""
    if not isinstance(data, dict) or not isinstance(data.get("diary"), dict):
        raise ValueError("food mutation receipt is incomplete")
    diary = dict(data["diary"])
    if not diary.get("date") or not isinstance(diary.get("meals"), list):
        raise ValueError("food mutation diary is incomplete")
    diary["asset_revision"] = FA.RESOLVER.generated_revision()
    _offer_food_asset_candidates(diary.get("meals") or [])
    payload = {
        "ok": True,
        "committed": True,
        "duplicate": bool(duplicate),
        "date": diary["date"],
        "diary": diary,
        **diary,
    }
    for key in ("meal_id", "meal", "rec", "deleted_id"):
        if key in data:
            payload[key] = data[key]
    return payload


def _food_mutation_row_conn(c, cid, mutation_key):
    if not mutation_key:
        return None
    return c.execute(
        """SELECT kind,record_id,args_hash,result_json,reversed_at
           FROM chat_mutations WHERE chat_id=? AND mutation_key=?""",
        (cid, mutation_key),
    ).fetchone()


def _food_mutation_data(row_):
    try:
        return json.loads(row_[3] or "{}") if row_ else {}
    except (TypeError, ValueError):
        return {}


def _delete_diary_meal_atomic(cid, raw_id, request_id, generation, nutrition_target):
    try:
        mid = _strict_integer(raw_id)
        if mid <= 0:
            raise ValueError("meal id out of range")
    except (TypeError, ValueError):
        return None, _api_error_payload(
            "invalid_meal_id", "Не удалось определить запись дневника."
        ), 400

    # A meal can only be deleted once, so the record id is a safe legacy fallback
    # when an older client does not yet send a durable gesture token.
    stable_id = str(request_id or "").strip() or f"meal:{mid}"
    mutation_key = chat_mutation_key("webdelete", stable_id)
    args_hash = chat_mutation_args_hash("food_delete", str(mid))
    c = db()
    try:
        c.execute("BEGIN IMMEDIATE")
        if not _user_write_allowed(cid, generation, conn=c):
            c.rollback()
            return None, _api_error_payload("deleted", "Профиль уже удалён."), 409

        prior = _food_mutation_row_conn(c, cid, mutation_key)
        if prior:
            if prior[0] != "food_delete" or (prior[2] or "") != args_hash:
                c.rollback()
                return None, _api_error_payload(
                    "food_mutation_conflict",
                    "Этот запрос уже использован для другой записи.",
                ), 409
            data = _food_mutation_data(prior)
            c.commit()
            return {"created": False, "data": data}, None, 200

        meal = c.execute(
            "SELECT d FROM meals WHERE chat_id=? AND id=?", (cid, mid)
        ).fetchone()
        if not meal:
            # Even if a client lost its in-memory token, an owned tombstone is
            # authoritative and must replay instead of degrading to a 404.
            tombstone = c.execute(
                """SELECT kind,record_id,args_hash,result_json,reversed_at
                   FROM chat_mutations
                   WHERE chat_id=? AND kind='food_delete' AND record_id=?
                   ORDER BY created_at DESC LIMIT 1""",
                (cid, str(mid)),
            ).fetchone()
            if tombstone:
                data = _food_mutation_data(tombstone)
                c.commit()
                return {"created": False, "data": data}, None, 200
            c.rollback()
            return None, _api_error_payload(
                "meal_not_found", "Эта запись дневника не найдена."
            ), 404

        target = str(meal[0])
        c.execute("DELETE FROM meals WHERE chat_id=? AND id=?", (cid, mid))
        c.execute(
            """UPDATE chat_mutations SET reversed_at=?,result_json=NULL
               WHERE chat_id=?
                 AND kind IN ('food','food_update','food_move_slot','food_append')
                 AND record_id=?""",
            (datetime.now(TZ).isoformat(), cid, str(mid)),
        )
        diary = _diary_snapshot_conn(c, cid, target, nutrition_target)
        data = {"date": target, "deleted_id": mid, "diary": diary}
        c.execute(
            """INSERT INTO chat_mutations
               (chat_id,mutation_key,generation,kind,record_id,args_hash,result_json,created_at)
               VALUES(?,?,?,?,?,?,?,?)""",
            (
                cid, mutation_key, int(generation), "food_delete", str(mid), args_hash,
                json.dumps(data, ensure_ascii=False, sort_keys=True),
                datetime.now(TZ).isoformat(),
            ),
        )
        c.commit()
        return {"created": True, "data": data}, None, 200
    except Exception as exc:
        try:
            c.rollback()
        except sqlite3.Error:
            pass
        log.warning("atomic diary delete failed %s/%s: %s", cid, mid, exc)
        return None, _api_error_payload(
            "diary_delete_failed", "Не удалось удалить приём пищи."
        ), 500
    finally:
        c.close()


def _owned_meal_for_api(cid, raw_id):
    try:
        mid = _strict_integer(raw_id)
    except (TypeError, ValueError):
        return None, None, _api_error_payload(
            "invalid_meal_id", "Не удалось определить запись дневника."
        ), 400
    if mid <= 0:
        return None, None, _api_error_payload(
            "invalid_meal_id", "Не удалось определить запись дневника."
        ), 400
    meal = meal_get(cid, mid)
    if not meal:
        return mid, None, _api_error_payload(
            "meal_not_found", "Эта запись дневника не найдена."
        ), 404
    return mid, meal, None, 200


def _api_number(value, *, integer=False):
    if isinstance(value, bool):
        raise ValueError("boolean is not a number")
    number = float(str(value).strip().replace(",", "."))
    if not math.isfinite(number):
        raise ValueError("number is not finite")
    if integer and not number.is_integer():
        raise ValueError("number is not an exact integer")
    return int(number) if integer else round(number, 1)


async def _api_diary_del(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    generation = _user_generation(cid)
    if not is_onboarded(row(cid)):
        return _cors(web.json_response({"error": "onboard"}, status=403))
    mutation, error, status = await asyncio.to_thread(
        _delete_diary_meal_atomic,
        cid, body.get("id"), body.get("request_id"), generation,
        _diary_target_snapshot(cid),
    )
    if error:
        return _cors(web.json_response(error, status=status))
    data = mutation.get("data") or {}
    if mutation.get("created"):
        # The durable mutation, not receipt materialization, is the cache
        # invalidation boundary. A lost acknowledgement must still invalidate
        # once, while a canonical retry must not advance the revision again.
        _evict_week_food_cache(cid)
    try:
        payload = _stored_food_mutation_receipt(
            data, duplicate=not mutation.get("created")
        )
    except Exception as exc:
        log.warning("diary delete receipt failed %s/%s: %s", cid, body.get("id"), exc)
        return _cors(web.json_response(
            {
                **_api_error_payload(
                    "diary_delete_receipt_failed",
                    "Приём удалён, но дневник пока не обновился. Повтори запрос.",
                ),
                "committed": True,
                "deleted_id": data.get("deleted_id"),
                "date": data.get("date"),
            },
            status=500,
        ))
    if mutation.get("created"):
        ev(cid, "button", meta="web_diary_del", user_generation=generation)
    return _cors(web.json_response(payload))

async def _api_diary_scale(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    mid, meal, error, status = _owned_meal_for_api(cid, body.get("id"))
    if error: return _cors(web.json_response(error, status=status))
    try:
        grams = _api_number(body.get("grams"), integer=True)
        if not 1 <= grams <= 100000:
            raise ValueError("grams out of range")
    except (TypeError, ValueError):
        return _cors(web.json_response(
            _api_error_payload("invalid_grams", "Укажи положительный вес блюда в граммах."),
            status=400,
        ))
    try:
        if not meal_scale(cid, mid, grams):
            return _cors(web.json_response(
                _api_error_payload(
                    "scale_unavailable", "Для этой записи нельзя пересчитать граммовку."
                ), status=409,
            ))
    except Exception as exc:
        log.warning("diary scale failed %s/%s: %s", cid, mid, exc)
        return _cors(web.json_response(
            _api_error_payload("diary_scale_failed", "Не удалось изменить граммовку."),
            status=500,
        ))
    updated = meal_get(cid, mid)
    if not updated:
        return _cors(web.json_response(
            _api_error_payload("meal_not_found", "Запись исчезла во время изменения."),
            status=409,
        ))
    _evict_week_food_cache(cid)
    ev(cid, "button", meta="web_diary_scale")
    return _cors(web.json_response(
        _diary_mutation_receipt(cid, meal["date"], meal=updated)
    ))

async def _api_diary_slot(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    mid, meal, error, status = _owned_meal_for_api(cid, body.get("id"))
    if error: return _cors(web.json_response(error, status=status))
    slot = body.get("slot")
    if slot not in ("breakfast", "lunch", "snack", "dinner"):
        return _cors(web.json_response(
            _api_error_payload("invalid_slot", "Выбери корректный приём пищи."),
            status=400,
        ))
    try:
        if not meal_set_slot(cid, mid, slot):
            return _cors(web.json_response(
                _api_error_payload("meal_not_found", "Эта запись дневника не найдена."),
                status=404,
            ))
    except Exception as exc:
        log.warning("diary slot failed %s/%s: %s", cid, mid, exc)
        return _cors(web.json_response(
            _api_error_payload("diary_slot_failed", "Не удалось перенести приём пищи."),
            status=500,
        ))
    updated = meal_get(cid, mid)
    if not updated:
        return _cors(web.json_response(
            _api_error_payload("meal_not_found", "Запись исчезла во время изменения."),
            status=409,
        ))
    _evict_week_food_cache(cid)
    ev(cid, "button", meta="web_diary_slot")
    return _cors(web.json_response(
        _diary_mutation_receipt(cid, meal["date"], meal=updated)
    ))

async def _api_diary_edit(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    mid, meal, error, status = _owned_meal_for_api(cid, body.get("id"))
    if error: return _cors(web.json_response(error, status=status))
    kw = {}
    if body.get("title") is not None:
        title = str(body["title"]).strip()[:80]
        if not title:
            return _cors(web.json_response(
                _api_error_payload("invalid_title", "Название блюда не может быть пустым."),
                status=400,
            ))
        kw["title"] = title
    for k in ("kcal", "grams"):
        v = body.get(k)
        if v not in (None, ""):
            try:
                parsed = _api_number(v, integer=True)
                minimum = 1 if k == "grams" else 0
                if not minimum <= parsed <= 100000: raise ValueError
                kw[k] = parsed
            except (TypeError, ValueError):
                return _cors(web.json_response(
                    _api_error_payload("invalid_" + k, f"Поле {k} заполнено неверно."),
                    status=400,
                ))
    for k in ("protein", "fat", "carbs"):
        v = body.get(k)
        if v not in (None, ""):
            try:
                parsed = _api_number(v)
                if not 0 <= parsed <= 10000: raise ValueError
                kw[k] = parsed
            except (TypeError, ValueError):
                return _cors(web.json_response(
                    _api_error_payload("invalid_" + k, f"Поле {k} заполнено неверно."),
                    status=400,
                ))
    if body.get("slot") is not None:
        if body.get("slot") not in ("breakfast", "lunch", "snack", "dinner"):
            return _cors(web.json_response(
                _api_error_payload("invalid_slot", "Выбери корректный приём пищи."),
                status=400,
            ))
        kw["slot"] = body["slot"]
    if not kw:
        return _cors(web.json_response(
            _api_error_payload("empty_edit", "Нет изменений для сохранения."),
            status=400,
        ))
    try:
        if not meal_edit(cid, mid, **kw):
            return _cors(web.json_response(
                _api_error_payload("meal_not_found", "Эта запись дневника не найдена."),
                status=404,
            ))
    except Exception as exc:
        log.warning("diary edit failed %s/%s: %s", cid, mid, exc)
        return _cors(web.json_response(
            _api_error_payload("diary_edit_failed", "Не удалось изменить приём пищи."),
            status=500,
        ))
    updated = meal_get(cid, mid)
    if not updated:
        return _cors(web.json_response(
            _api_error_payload("meal_not_found", "Запись исчезла во время изменения."),
            status=409,
        ))
    _evict_week_food_cache(cid)
    ev(cid, "button", meta="web_diary_edit")
    return _cors(web.json_response(
        _diary_mutation_receipt(cid, meal["date"], meal=updated)
    ))

def _save_manual_food_atomic(
    cid, rec, target, request_id, generation, nutrition_target,
):
    mutation_key = chat_mutation_key("webmanual", request_id)
    args_hash = chat_mutation_args_hash(
        "food_manual",
        json.dumps({"date": target, "rec": rec}, ensure_ascii=False, sort_keys=True),
    )
    c = db()
    try:
        c.execute("BEGIN IMMEDIATE")
        if not _user_write_allowed(cid, generation, conn=c):
            c.rollback()
            return None, _api_error_payload("deleted", "Профиль уже удалён."), 409

        prior = _food_mutation_row_conn(c, cid, mutation_key)
        if prior:
            if prior[0] != "food" or (prior[2] or "") != args_hash:
                c.rollback()
                return None, _api_error_payload(
                    "food_mutation_conflict",
                    "Этот запрос уже использован для другого приёма пищи.",
                ), 409
            if prior[4]:
                c.rollback()
                return None, _api_error_payload(
                    "food_mutation_reversed", "Этот приём уже удалён из дневника."
                ), 409
            data = _food_mutation_data(prior)
            c.commit()
            return {"created": False, "data": data}, None, 200

        slot = rec.get("slot") or slot_for_now()
        now = datetime.now(TZ).isoformat()
        mid = c.execute(
            """INSERT INTO meals
               (chat_id,d,ts,title,kcal,protein,fat,carbs,grams,items,source,
                slot,fclass,slot_guessed)
               VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)""",
            (
                cid, target, now, rec["title"], int(rec["kcal"]),
                float(rec["protein"]), float(rec["fat"]), float(rec["carbs"]),
                int(rec["grams"]) if rec.get("grams") else None,
                json.dumps(rec.get("items") or [], ensure_ascii=False),
                "manual", slot, rec.get("fclass") or None,
                int(bool(rec.get("slot_guessed"))),
            ),
        ).lastrowid
        saved = _meal_row_payload((
            mid, now, rec["title"], int(rec["kcal"]), float(rec["protein"]),
            float(rec["fat"]), float(rec["carbs"]),
            int(rec["grams"]) if rec.get("grams") else None,
            json.dumps(rec.get("items") or [], ensure_ascii=False),
            "manual", slot, rec.get("fclass") or None,
            int(bool(rec.get("slot_guessed"))),
        ))
        saved["date"] = target
        diary = _diary_snapshot_conn(c, cid, target, nutrition_target)
        data = {
            "date": target,
            "meal_id": mid,
            "meal": saved,
            "rec": dict(rec, slot=slot, date=target),
            "diary": diary,
        }
        c.execute(
            """INSERT INTO chat_mutations
               (chat_id,mutation_key,generation,kind,record_id,args_hash,result_json,created_at)
               VALUES(?,?,?,?,?,?,?,?)""",
            (
                cid, mutation_key, int(generation), "food", str(mid), args_hash,
                json.dumps(data, ensure_ascii=False, sort_keys=True), now,
            ),
        )
        c.commit()
        return {"created": True, "data": data}, None, 200
    except Exception as exc:
        try:
            c.rollback()
        except sqlite3.Error:
            pass
        log.warning("atomic manual food save failed %s/%s: %s", cid, target, exc)
        return None, _api_error_payload(
            "food_manual_save_failed", "Не удалось сохранить приём пищи."
        ), 500
    finally:
        c.close()


def _api_food_manual_sync(cid, body, generation):
    if not is_onboarded(row(cid)):
        return {"ok": False, "message": "Сначала настрой Айву."}, 403
    if not _user_write_allowed(cid, generation):
        return _api_error_payload("deleted", "Профиль уже удалён."), 409
    parsed_target, error, status = _validated_moscow_iso(
        body.get("date") or dtoday().isoformat(), max_age=1, field="date"
    )
    if error:
        return error, status
    title = (body.get("title") or "").strip()[:80]
    kcal = int(_num(body.get("kcal")))
    if not title and not kcal:
        return {"ok": False, "message": "Укажи название или калории."}, 200
    rec = {"title": title or "Приём пищи", "kind": "manual", "items": [],
           "kcal": kcal, "protein": round(_num(body.get("protein")), 1), "fat": round(_num(body.get("fat")), 1),
           "carbs": round(_num(body.get("carbs")), 1), "grams": (int(_num(body.get("grams"))) or None),
           "source": "manual"}
    if body.get("slot") in ("breakfast", "lunch", "snack", "dinner"): rec["slot"] = body["slot"]
    # Older clients did not send request_id; keep them functional, while every
    # current client keeps the generated token across close/reopen and retries.
    request_id = str(body.get("request_id") or "").strip() or (
        "legacy-" + secrets.token_hex(16)
    )
    mutation, error, status = _save_manual_food_atomic(
        cid, rec, parsed_target.isoformat(), request_id, generation,
        _diary_target_snapshot(cid),
    )
    if error:
        return error, status
    data = mutation.get("data") or {}
    if mutation.get("created"):
        # Receipt generation may fail after commit; invalidate from the durable
        # created flag so the first attempt advances the cache revision once.
        _evict_week_food_cache(cid)
    try:
        payload = _stored_food_mutation_receipt(
            data, duplicate=not mutation.get("created")
        )
    except Exception as exc:
        log.warning("manual food receipt failed %s/%s: %s", cid, request_id, exc)
        return {
            **_api_error_payload(
                "food_manual_receipt_failed",
                "Приём сохранён, но дневник пока не обновился. Повтори запрос.",
            ),
            "committed": True,
            "meal_id": data.get("meal_id"),
            "date": data.get("date"),
        }, 500
    if mutation.get("created"):
        ev(cid, "flow_start", meta="food", user_generation=generation)
        ev(cid, "goal", meta="food_log", user_generation=generation)
        ev(cid, "manual", meta="food_log", user_generation=generation)
    return payload, 200

async def _api_food_manual(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    generation = _user_generation(cid)
    payload, status = await asyncio.to_thread(
        _api_food_manual_sync, cid, body, generation
    )
    return _cors(web.json_response(payload, status=status))

async def _api_diary_reco(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    u = row(cid)
    if not is_onboarded(u): return _cors(web.json_response({"error": "onboard"}, status=403))
    usage = []; text = await answer_diary(cid, usage)
    if usage: ev(cid, "tokens", sum(usage), meta="diary_reco", calls=len(usage), usage=usage)
    return _cors(web.json_response({"ok": True, "text": text}))

def _change_mode_atomic(cid, mode, explicit_lmp=None, user_generation=None):
    if explicit_lmp is not None:
        lmp, error, status = _validated_moscow_iso(
            explicit_lmp, max_age=READ_HISTORY_DAYS, field="last_period"
        )
        if error:
            return error, status
        lmp_iso = lmp.isoformat()
    else:
        lmp_iso = None
    c = db()
    try:
        c.execute("BEGIN IMMEDIATE")
        current = c.execute(
            """SELECT mode,last_period,cycle_len,period_end,period_len
               FROM users WHERE chat_id=?""", (cid,)
        ).fetchone()
        if not current or not _user_write_allowed(
            cid, user_generation, conn=c
        ):
            c.rollback()
            return _api_error_payload("deleted", "Профиль уже удалён."), 409
        old_mode = current[0] or "cycle"
        last_period = current[1]
        seeded = False
        if mode in ("cycle", "preg") and not last_period:
            if lmp_iso:
                last_period = lmp_iso
            elif old_mode == "male" and mode == "cycle":
                last_period = dtoday().isoformat()
                seeded = True
            else:
                c.rollback()
                return _api_error_payload(
                    "need_period",
                    "Сначала укажи дату последних месячных — без неё этот режим не включить.",
                ), 400
        if lmp_iso and mode in ("cycle", "preg"):
            last_period = lmp_iso

        if mode == "male":
            c.execute(
                """UPDATE users SET mode=?,state=NULL,last_period=NULL,
                     cycle_len=NULL,period_end=NULL,period_len=NULL
                   WHERE chat_id=?""",
                (mode, cid),
            )
        elif last_period and (seeded or lmp_iso):
            c.execute(
                "INSERT OR IGNORE INTO cycles(chat_id,start_date,end_date) VALUES(?,?,?)",
                (cid, last_period, last_period),
            )
            c.execute(
                """UPDATE users SET mode=?,state=NULL,last_period=?,
                     period_end=?,period_len=1,
                     cycle_len=CASE WHEN ?='cycle' THEN COALESCE(cycle_len,28) ELSE cycle_len END
                   WHERE chat_id=?""",
                (mode, last_period, last_period, mode, cid),
            )
        else:
            c.execute(
                "UPDATE users SET mode=?,state=NULL WHERE chat_id=?", (mode, cid)
            )
        saved = c.execute(
            "SELECT mode,last_period,cycle_len FROM users WHERE chat_id=?",
            (cid,),
        ).fetchone()
        c.commit()
    except Exception as exc:
        try: c.rollback()
        except sqlite3.Error: pass
        log.warning("mode change failed %s/%s: %s", cid, mode, exc)
        return _api_error_payload("mode_save_failed", "Не удалось сменить режим."), 500
    finally:
        c.close()
    canonical_user = row(cid)
    if not canonical_user or not _user_write_allowed(cid, user_generation):
        return _api_error_payload("deleted", "Профиль уже удалён."), 409
    return {
        "ok": True,
        "mode": saved[0] or mode,
        "last_period": saved[1],
        "cycle_len": saved[2],
        "seeded_period": seeded,
        "mode_snapshot": _mode_dependent_snapshot(cid, canonical_user),
    }, 200


async def _api_mode(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    generation = _user_generation(cid)
    u = row(cid)
    if not is_onboarded(u): return _cors(web.json_response({"error": "onboard"}, status=403))
    m = body.get("mode")
    if m not in ("male", "cycle", "irregular", "meno", "none", "preg"):
        return _cors(web.json_response({"error": "bad_mode"}, status=400))
    explicit_lmp = body.get("last_period") if "last_period" in body else None
    payload, status = await asyncio.to_thread(
        _change_mode_atomic, cid, m, explicit_lmp, generation
    )
    if status != 200:
        return _cors(web.json_response(payload, status=status))
    if not _user_write_allowed(cid, generation):
        return _cors(web.json_response(
            _api_error_payload("deleted", "Профиль уже удалён."), status=409
        ))
    _invalidate_mode_dependent_state(cid)
    if BOT_APP:
        try:
            current = row(cid)
            if current and _user_write_allowed(cid, generation):
                schedule_daily(BOT_APP, cid, current.get("send_time") or "08:00")
        except Exception as e: log.warning("reschedule: %s", e)
    ev(cid, "manual", meta="web_mode_" + m, user_generation=generation)
    return _cors(web.json_response(payload))

def _api_prefs_sync(cid, body, user_generation=None):
    if not is_onboarded(row(cid)):
        return {"error": "onboard"}, 403
    note = str(body.get("diet_note") or "").strip()[:300]
    changes = {"diet_note": note}
    if "kcal_goal" in body:
        g = body.get("kcal_goal")
        if g is None or (isinstance(g, str) and not g.strip()):
            changes["kcal_goal"] = None
        else:
            try:
                gi = _strict_integer(g)
                if not 800 <= gi <= 6000:
                    raise ValueError("calorie goal out of range")
                changes["kcal_goal"] = gi
            except (TypeError, ValueError):
                return _api_error_payload(
                    "bad_kcal_goal", "Цель должна быть целым числом от 800 до 6000 ккал."
                ), 400
    _evict_today_cache(cid)
    if not upsert(cid, user_generation=user_generation, **changes):
        return _api_error_payload("deleted", "Профиль уже удалён."), 409
    menu_cache_clear(cid)
    ev(cid, "manual", meta="web_prefs", user_generation=user_generation)
    if not _user_write_allowed(cid, user_generation):
        return _api_error_payload("deleted", "Профиль уже удалён."), 409
    _up = row(cid); _kb = None
    try:
        if _up.get("height") and _up.get("weight") and _up.get("age"):
            _kb = calc_calories(_up["height"], _up["weight"], _up["age"], _up.get("activity") or 2)[0]
    except Exception:
        _kb = None
    return {
        "ok": True,
        "diet_note": note,
        "kcal_goal": _up.get("kcal_goal"),
        "kcal_base": _kb,
    }, 200

async def _api_prefs(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    generation = _user_generation(cid)
    payload, status = await asyncio.to_thread(
        _api_prefs_sync, cid, body, generation
    )
    return _cors(web.json_response(payload, status=status))

async def _api_settime(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    generation = _user_generation(cid)
    previous = row(cid) or {}
    if not is_onboarded(previous): return _cors(web.json_response({"error": "onboard"}, status=403))
    t = parse_time(str(body.get("time") or ""))
    if not t: return _cors(web.json_response({"error": "bad_time", "text": "Время в формате 09:00."}, status=400))
    enabled = body.get("daily_summary_enabled")
    if not isinstance(enabled, bool):
        return _cors(web.json_response(
            _api_error_payload(
                "bad_daily_summary_enabled",
                "Настройка утренней сводки должна быть true или false.",
            ), status=400,
        ))
    previous_time = previous.get("send_time") or "08:00"
    previous_enabled = bool(previous.get("daily_summary_enabled", True))
    if BOT_APP:
        try:
            # Apply the complete desired scheduler state before acknowledging
            # the DB mutation. A partial queue failure is an error, not a
            # successful preference write with missing jobs.
            schedule_daily(BOT_APP, cid, t, enabled=enabled)
        except Exception as exc:
            log.warning("summary notification reschedule: %s", exc)
            try:
                if _user_write_allowed(cid, generation):
                    schedule_daily(
                        BOT_APP, cid, previous_time, enabled=previous_enabled
                    )
                else:
                    _remove_daily_jobs(BOT_APP, cid)
            except Exception as restore_exc:
                log.error("summary notification restore failed: %s", restore_exc)
            return _cors(web.json_response(
                _api_error_payload(
                    "schedule_failed",
                    "Не удалось обновить расписание сводки. Попробуй ещё раз.",
                ), status=503,
            ))
    try:
        stored = upsert(
            cid, user_generation=generation, send_time=t,
            daily_summary_enabled=int(enabled), state=None,
        )
    except Exception as exc:
        log.warning("summary settings save failed: %s", exc)
        if BOT_APP:
            try:
                if _user_write_allowed(cid, generation):
                    schedule_daily(
                        BOT_APP, cid, previous_time, enabled=previous_enabled
                    )
                else:
                    _remove_daily_jobs(BOT_APP, cid)
            except Exception as restore_exc:
                log.error("summary notification restore failed: %s", restore_exc)
        return _cors(web.json_response(
            _api_error_payload(
                "settings_save_failed",
                "Не удалось сохранить настройки сводки. Попробуй ещё раз.",
            ), status=500,
        ))
    if not stored:
        if BOT_APP:
            try:
                # The lifecycle ended between queue mutation and DB write.
                # Never restore old jobs for a deleted account.
                _remove_daily_jobs(BOT_APP, cid)
            except Exception as remove_exc:
                log.error("deleted-user job cleanup failed: %s", remove_exc)
        return _cors(web.json_response(
            _api_error_payload("deleted", "Профиль уже удалён."), status=409
        ))
    ev(cid, "manual", meta="web_settime", user_generation=generation)
    return _cors(web.json_response({
        "ok": True,
        "send_time": t,
        "daily_summary_enabled": enabled,
    }))

async def _api_report(request):
    body = await request.json(); cid = _verify_init(body.get("initData", ""))
    if not cid: return _cors(web.json_response({"error": "auth"}, status=401))
    if not is_onboarded(row(cid)): return _cors(web.json_response({"error": "onboard"}, status=403))
    if not (BOT_APP and RPT):
        return _cors(web.json_response({"error": "unavail", "text": "Выписка временно недоступна."}, status=503))
    period = str(body.get("period") or "all")
    if period not in REPORT_PERIODS:
        return _cors(web.json_response({"error": "period", "text": "Выбери период выписки."}, status=400))
    ev(cid, "manual", meta="web_report_requested")
    try:
        result = await send_report(_BCtx(BOT_APP), cid, period)
        if result.get("ok") and result.get("delivered"):
            return _cors(web.json_response({
                "ok": True,
                "delivered": True,
                "text": "PDF отправлен в чат бота.",
            }))
        return _cors(web.json_response({
            "error": result.get("error") or "fail",
            "delivered": False,
            "text": "Не удалось отправить выписку. Попробуй ещё раз.",
        }, status=502))
    except Exception as e:
        log.warning("web report: %s", e)
        return _cors(web.json_response({
            "error": "fail",
            "delivered": False,
            "text": "Не удалось отправить выписку. Попробуй ещё раз.",
        }, status=500))

async def _api_opts(request): return _cors(web.Response())

_EV_LBL = {
    "start": "Начала настройку", "onboarding_completed": "Завершила настройку",
    "app_open": "Открыла приложение", "web_food": "Открыла меню", "web_diary": "Открыла дневник",
    "web_checkin": "Чек-ин (в приложении)", "web_training": "Открыла тренировки", "web_meal_replace": "Замена блюда",
    "web_partner": "Партнёр", "web_profile": "Профиль", "web_prefs": "Предпочтения по еде", "web_settime": "Время сводки",
    "web_train_profile": "Профиль тренировок", "web_pa": "Отметка близости", "web_diary_del": "Удаление из дневника",
    "web_diary_edit": "Правка в дневнике", "web_diary_scale": "Граммовка в дневнике", "web_diary_slot": "Перенос приёма",
    "web_today": "Открыла «Сегодня»", "food_suggest": "Идеи по питанию", "training_today": "Разбор нагрузки", "today_note": "Сводка дня",
    "proactive_compose": "Проактив-сообщение", "partner_brief": "Партнёрский пуш", "onboard_q": "Вопрос в онбординге", "proactive_preview": "Проактив: сухой прогон",
    "stt:salute": "Расшифровка (SaluteSpeech)", "stt:groq": "Расшифровка (Groq)", "stt:none": "Расшифровка: сбой", "tts:salute": "Озвучка ответа", "tts:audio": "Озвучка (файлом)", "static:menu_pool": "Фолбэк: меню из пула", "static:training_plan": "Фолбэк: план нагрузки", "static:phases": "Фолбэк: текст фаз", "static:card_caps_empty": "Карточка: строки не собрались", "static:combined_send_fail": "Карточка: сбой объединённой отправки",
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
           "partner_brief": "Партнёрский пуш (ИИ)", "onboard_q": "Вопрос в онбординге", "proactive_preview": "Проактив: сухой прогон", "card": "Карточка сводки (ИИ)",
           "auto": "Память: запись (ИИ)",
           "stt:salute": "Расшифровка (SaluteSpeech)", "stt:groq": "Расшифровка (Groq)", "stt:none": "Расшифровка: сбой", "tts:salute": "Озвучка ответа", "tts:audio": "Озвучка (файлом)"}
def _tc_lbl(m): return _TC_LBL.get(m, m or "прочее")
_TC_APP = ("menu", "food_photo", "food_text", "meal", "workout", "diary_reco", "webapp", "training_section", "today_note", "food_suggest", "training_today")
_TC_CHAT = ("answer", "general", "partner_q", "onboard_q")
def _tc_src(m):
    if m and (str(m).startswith("stt:") or str(m).startswith("tts:")): return "stt"
    if m in _TC_APP: return "app"
    if m in _TC_CHAT: return "chat"
    if m in ("summary", "proactive_compose", "proactive_preview", "today_note", "memory_learn", "auto", "partner_brief", "card"): return "auto"
    return "other"

def _feat_of(action, meta):
    """К какому разделу продукта относится событие — для подсчёта уникальных пользователей по фичам."""
    m = str(meta or "")
    if m in ("view_train", "web_training", "web_train_profile", "workout"): return "Нагрузка"
    if m in ("view_food", "web_food", "web_diary", "food_log", "web_meal_replace", "web_diary_del",
             "web_diary_edit", "web_diary_scale", "web_diary_slot") or m.startswith("food"): return "Питание"
    if m == "view_chat" or action == "user_message" or (action == "answered" and m in ("webapp", "answer", "general")): return "Чат"
    if m in ("view_stats", "web_partner"): return "Статистика"
    if m in ("view_today", "web_today", "web_checkin", "web_period") or m.startswith("ci:"): return "Сегодня"
    return None

def _analytics_event_projection(conn, users):
    """Return one legacy-shaped stream backed by events_v2 after each user's cutover."""
    key_to_cid = {A2.user_key(cid): cid for cid, _created, _mode in users}
    projected = []
    first_v2 = {}
    v2_rows = conn.execute(
        """SELECT occurred_at,user_key,event_name,source,screen,status,latency_ms,properties_json
           FROM events_v2 ORDER BY occurred_at"""
    ).fetchall()
    for ts, key, name, source, screen, status, latency_ms, props_json in v2_rows:
        cid = key_to_cid.get(key)
        if cid is None:
            continue
        first_v2[cid] = min(first_v2.get(cid, ts), ts)
        try:
            props = json.loads(props_json or "{}")
        except (TypeError, ValueError):
            props = {}
        action = "manual"
        meta = props.get("channel") or name
        if name == "onboarding_started":
            action, meta = "signup", None
        elif name == "onboarding_completed":
            action, meta = "onboarding_completed", None
        elif name == "assistant_response_received":
            action, meta = "answered", props.get("channel")
        elif name == "user_message_sent":
            action, meta = "user_message", props.get("channel")
        elif name == "assistant_message_sent":
            action, meta = "assistant_message", props.get("channel")
        elif name == "legacy_message_interaction":
            action, meta = "manual", props.get("channel")
        elif name in {"screen_viewed", "app_opened"}:
            action = "button"
            meta = ("view_" + str(screen or "")) if name == "screen_viewed" else "app_open"
        elif name in {"checkin_completed", "checkin_updated", "checkin_symptom_selected"}:
            action, meta = "manual", "checkin"
        elif name in {"push_queued", "push_sent", "push_failed", "push_shadowed"}:
            action = "broadcast"
            delivery = props.get("delivery_status")
            if not delivery:
                delivery = {
                    "push_queued": "queued", "push_sent": "sent",
                    "push_failed": "error", "push_shadowed": "shadow",
                }[name]
            meta = str(delivery)
            if props.get("campaign_id"):
                meta += "|" + str(props["campaign_id"])
        elif name == "push_opened":
            action, meta = "push_open", props.get("campaign_id")
        elif name == "summary_delivered":
            action, meta = "goal", "summary"
        elif name == "summary_opened":
            action, meta = "summary_open", "daily_summary"
        elif name == "meal_add_completed":
            action, meta = "goal", "food_log"
        elif name == "workout_add_completed":
            action, meta = "goal", "workout"
        elif name == "answer_feedback_prompted":
            action, meta = "feedback_prompt", props.get("answer_id")
        elif name == "answer_feedback_submitted":
            action = "feedback"
            meta = "|".join(filter(None, (props.get("rating"), props.get("answer_id"))))
        elif name == "safety_guidance_shown":
            action, meta = "safety", props.get("safety_level")
        elif name == "tool_execution_completed":
            action = "tool_execution"
            meta = "|".join(filter(None, (props.get("status"), props.get("tool_name"), source)))
        elif name == "tool_outcome_completed":
            action = "tool_outcome"
            meta = "|".join(filter(None, (props.get("status"), props.get("outcome_type"), source)))
        elif name == "fallback_served":
            action, meta = "fallback", props.get("reason")
        elif name == "ai_usage_recorded":
            action, meta = "tokens", props.get("channel")
        elif name == "error":
            action, meta = "error", status
        elif name.startswith("legacy_"):
            action, meta = name[7:], props.get("channel")
        projected.append((
            cid, ts, action, 0, meta, int(latency_ms or 0),
            int(props.get("calls") or 0), 0, 0, None,
        ))

    # Keep pre-cutover history only. During the former dual-write period v2 wins.
    for legacy in conn.execute(
        """SELECT chat_id,ts,action,tokens,meta,ms,calls,tok_in,tok_out,model
           FROM events ORDER BY ts"""
    ).fetchall():
        cid, ts = legacy[0], legacy[1]
        if cid not in first_v2 or (ts or "") < (first_v2[cid] or ""):
            projected.append(legacy)
    projected.sort(key=lambda row_: row_[1] or "")
    return projected


def analytics_data(days=7, frm=None, to=None):
    """Чистый слой аналитики (спека v2). tool-calls = Σ calls (все хопы к модели)."""
    from collections import Counter, defaultdict
    ACTIVE = ("command", "button", "suggest", "manual", "answered", "user_message", "voice", "fallback", "onboarding_completed")
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
    all_evs = _analytics_event_projection(c, users)
    evs = [event for event in all_evs if since <= dparse(event[1]) <= until]
    partners = c.execute("SELECT partner_id, woman_id FROM partners").fetchall()
    wmin = datetime.combine(until - timedelta(days=120), dtime.min).isoformat()
    wide = [(event[0], event[1], event[2]) for event in all_evs
            if (until - timedelta(days=120)) <= dparse(event[1]) <= until]
    first_by_user = {}
    for event in all_evs:
        if event[2] in ACTIVE:
            first_by_user[event[0]] = min(first_by_user.get(event[0], event[1]), event[1])
    first_rows = list(first_by_user.items())
    goalrows = list({(event[0], event[4]) for event in all_evs if event[2] == "goal"})
    refrows = c.execute("SELECT source, chat_id, ts FROM referrals").fetchall()
    pmin = datetime.combine(since - timedelta(days=span), dtime.min).isoformat()
    pmax = datetime.combine(since - timedelta(days=1), dtime.max).isoformat()
    prev = [(event[0], event[1], event[2], event[6]) for event in all_evs
            if (since - timedelta(days=span)) <= dparse(event[1]) <= (since - timedelta(days=1))]
    llm_rows = c.execute("""SELECT provider,model,purpose,status,latency_ms,input_tokens,output_tokens,
                                   cached_tokens,total_tokens,user_key,request_id,reported_cost,cost_unit
                            FROM llm_calls WHERE occurred_at>=? AND occurred_at<=?""",
                         (since_ts, until_ts)).fetchall()
    c.close()
    _ACT = ("command", "button", "suggest", "manual", "answered", "user_message", "voice", "fallback", "onboarding_completed")
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
    tok_in = tok_out = 0; by_model = {}
    tokens_by_day = Counter(); tin_by_day = Counter(); tout_by_day = Counter()
    lat = []; sess = defaultdict(list); modeseg = defaultdict(set); mode_active_day = defaultdict(lambda: defaultdict(set))
    bcast = Counter(); ans_by_day = Counter(); err_by_day = Counter(); tool_src = Counter()
    push_days = defaultdict(set); act_days = defaultdict(set); new_by_day = Counter(); gper = defaultdict(set)
    feat_users = defaultdict(set); feat_events = Counter()
    for cid, ts, action, tok, meta, ms, calls, t_in, t_out, mdl in evs:
        d = dparse(ts); iso = d.isoformat(); tokens += (tok or 0)
        tok_in += (t_in or 0); tok_out += (t_out or 0)
        tokens_by_day[iso] += (tok or 0); tin_by_day[iso] += (t_in or 0); tout_by_day[iso] += (t_out or 0)
        if (tok or 0) or (t_in or 0):
            mk = mdl or "(не указана)"
            mstat = by_model.setdefault(mk, {"model": mk, "tokens": 0, "tok_in": 0, "tok_out": 0, "calls": 0, "ms": 0, "n": 0})
            mstat["tokens"] += (tok or 0); mstat["tok_in"] += (t_in or 0); mstat["tok_out"] += (t_out or 0)
            mstat["calls"] += (calls or 0)
            if ms: mstat["ms"] += ms; mstat["n"] += 1
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
    tools_per_dau = round(tool_total / active_user_days, 2) if active_user_days else 0
    sessions_per_dau = round(sc / active_user_days, 2) if active_user_days else 0
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
    PRICE_IN = float(os.environ.get("AIWA_PRICE_IN_USD", os.environ.get("AIWA_TOKEN_PRICE_USD", "0.5")))
    PRICE_OUT = float(os.environ.get("AIWA_PRICE_OUT_USD", "1.5"))
    series = []; d = since
    while d <= until:
        iso = d.isoformat()
        series.append({"date": iso[5:], "full": iso,
            "dau": len(active_by_day.get(iso, set())), "wau": len(win_union(d, 7)), "mau": len(win_union(d, 30)),
            "events": events_by_day[iso], "toolcalls": tool_by_day[iso],
            "tokens": tokens_by_day[iso], "tok_in": tin_by_day[iso], "tok_out": tout_by_day[iso],
            "answered": ans_by_day[iso], "errors": err_by_day[iso], "new": new_by_day[iso],
            "stick": (round(len(active_by_day.get(iso, set())) / len(win_union(d, 30)) * 100) if len(win_union(d, 30)) else 0)})
        d += timedelta(days=1)
    ans_tot = answered + fallback + errors
    llm_providers = defaultdict(lambda: {"calls": 0, "success": 0, "input_tokens": 0, "output_tokens": 0, "total_tokens": 0})
    llm_lat = []; llm_success = 0; llm_in = llm_out = llm_cached = llm_total = 0
    llm_users = set(); llm_requests = set(); llm_reported_cost = 0.0; llm_cost_units = set()
    for provider, model, purpose, status, latency_ms, inp, out, cached, total, ukey, reqid, reported_cost, cost_unit in llm_rows:
        key = (provider or "unknown") + (" / " + model if model else "")
        item = llm_providers[key]; item["calls"] += 1
        if status == "success": item["success"] += 1; llm_success += 1
        item["input_tokens"] += int(inp or 0); item["output_tokens"] += int(out or 0); item["total_tokens"] += int(total or 0)
        llm_in += int(inp or 0); llm_out += int(out or 0); llm_cached += int(cached or 0); llm_total += int(total or 0)
        if latency_ms: llm_lat.append(int(latency_ms))
        if ukey: llm_users.add(ukey)
        if reqid: llm_requests.add(reqid)
        if reported_cost is not None: llm_reported_cost += float(reported_cost)
        if cost_unit: llm_cost_units.add(cost_unit)
    llm_calls = len(llm_rows)
    return {
        "since": since.isoformat(), "until": until.isoformat(), "span": span,
        "updated": datetime.now(TZ).strftime("%d.%m %H:%M"),
        "audience": {
            "ever_used": onboarded, "dau": dau, "wau": wau, "mau": mau, "avg_dau": round(avg_dau, 1),
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
            "tools_per_dau": tools_per_dau, "sessions_per_dau": sessions_per_dau,
            "toolcalls_per_dau": tools_per_dau,
            "by_source": {"chat": ev_src.get("chat", 0), "app": ev_src.get("app", 0)},
            "actions_top": actions.most_common(12), "toolcalls_by_meta": [[_tc_lbl(k), v] for k, v in tool_meta.most_common(10)],
            "features": sorted([{"name": k, "users": len(v), "events": feat_events[k]} for k, v in feat_users.items()],
                               key=lambda x: -x["users"]),
            "sessions": {"count": sc, "per_dau": sessions_per_dau,
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
            "tokens": tokens, "tokens_in": tok_in, "tokens_out": tok_out,
            "cost_usd": round(tokens / 1e6 * PRICE, 2),
            "cost_split_usd": round(tok_in / 1e6 * PRICE_IN + tok_out / 1e6 * PRICE_OUT, 2) if (tok_in or tok_out) else None},
        "quality_v2": {
            "available": bool(llm_calls), "calls": llm_calls, "successful": llm_success,
            "success_rate": round(llm_success / llm_calls * 100) if llm_calls else 0,
            "requests": len(llm_requests), "users": len(llm_users),
            "input_tokens": llm_in, "output_tokens": llm_out, "cached_tokens": llm_cached,
            "total_tokens": llm_total, "p50": pct(llm_lat, 0.5), "p95": pct(llm_lat, 0.95),
            "reported_cost": round(llm_reported_cost, 6), "cost_units": sorted(llm_cost_units),
            "providers": [{"name": name, **vals} for name, vals in sorted(llm_providers.items(), key=lambda x: -x[1]["calls"])]},
        "models": sorted([dict(v, avg_ms=(round(v["ms"] / v["n"]) if v["n"] else 0)) for v in by_model.values()],
                         key=lambda x: -x["tokens"]),
        "toolcalls_by_source": {"app": tool_src.get("app", 0), "chat": tool_src.get("chat", 0), "auto": tool_src.get("auto", 0),
                                "stt": tool_src.get("stt", 0), "other": tool_src.get("other", 0)},
        "growth": {
            "events": (round((ev_total - pv_events) / pv_events * 100) if pv_events else None),
            "toolcalls": (round((tool_total - pv_tool) / pv_tool * 100) if pv_tool else None),
            "avg_dau": (round((avg_dau - (pv_aud / span)) / (pv_aud / span) * 100) if pv_aud else None)},
        "series": series,
    }

async def _legacy_admin_removed(request):
    return web.Response(
        status=410,
        text="Legacy AIWA analytics has been removed.",
        headers={"Cache-Control": "no-store"},
    )

_REVIEWED_CATALOG_FILE_RE = re.compile(r"^[0-9a-f]{64}\.webp$")

async def _serve_reviewed_catalog_file(request):
    """Serve only content-addressed reviewed art with an explicit MIME type."""
    kind = request.match_info.get("kind", "")
    filename = request.match_info.get("filename", "")
    if kind not in {"food", "train"} or not _REVIEWED_CATALOG_FILE_RE.fullmatch(filename):
        raise web.HTTPNotFound()
    path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        "webapp2",
        "assets",
        kind,
        "catalog-v2",
        filename,
    )
    if not os.path.isfile(path) or os.path.islink(path):
        raise web.HTTPNotFound()
    response = web.FileResponse(
        path,
        headers={"Cache-Control": "public, max-age=31536000, immutable"},
    )
    response.content_type = "image/webp"
    return response

@web.middleware
async def _security_headers(request, handler):
    response = await handler(request)
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("Referrer-Policy", "no-referrer")
    if request.path == "/":
        # Telegram Web renders Mini Apps in an iframe owned by web.telegram.org.
        # X-Frame-Options cannot express that allow-list, so use CSP for the
        # only embeddable HTML route and keep every API/admin route same-origin.
        response.headers.pop("X-Frame-Options", None)
        response.headers.setdefault(
            "Content-Security-Policy",
            "frame-ancestors 'self' https://web.telegram.org "
            "https://telegram.org https://*.telegram.org",
        )
    else:
        response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
    origin = request.headers.get("Origin")
    configured = {x.strip().rstrip("/") for x in os.environ.get("AIWA_ALLOWED_ORIGINS", "").split(",") if x.strip()}
    if AIWA_WEBAPP_URL:
        parsed = _urlsplit(AIWA_WEBAPP_URL)
        if parsed.scheme and parsed.netloc:
            configured.add(parsed.scheme + "://" + parsed.netloc)
    if origin and origin.rstrip("/") in configured:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"
    return response

async def _health(request):
    status = 200 if APP_READY else 503
    return web.json_response(
        {
            "status": "ok" if APP_READY else "starting",
            "version": AIWA_VERSION,
            # The repository is public; this non-secret marker lets deploy
            # automation prove which immutable revision actually took traffic.
            "release_sha": AIWA_RELEASE_SHA or None,
            "candidate": _candidate_mode(),
            "journal_router": "v2" if journal_v2_enabled() else "v1",
            "event_queue": _EVENT_WRITE_Q.qsize(),
            "event_writer_alive": bool(
                _EVENT_WRITER_THREAD and _EVENT_WRITER_THREAD.is_alive()
            ),
            "event_writer_failures": _EVENT_WRITER_FAILURES,
            "event_writer_last_error_at": _EVENT_WRITER_LAST_ERROR_AT,
            "event_writer_dropped": _EVENT_WRITER_DROPPED,
            "ai_workers": sum(1 for task in _AI_JOB_TASKS if not task.done()),
            "ai_worker_limit": _AI_TODAY_WORKERS,
            "llm_concurrency_limit": _AI_LLM_CONCURRENCY_LIMIT,
            "chat_reserved_slots": _AI_CHAT_RESERVED_SLOTS,
            "ai_background_concurrency_limit": _AI_BACKGROUND_CONCURRENCY,
            "ai_background_active": (
                _AI_BACKGROUND_CONCURRENCY
                - int(getattr(
                    _AI_BACKGROUND_SEM, "_value", _AI_BACKGROUND_CONCURRENCY
                ))
            ),
            "food_vision_concurrency_limit": _FOOD_VISION_CONCURRENCY,
            "food_vision_active": (
                _FOOD_VISION_CONCURRENCY
                - int(getattr(
                    _FOOD_VISION_SEM, "_value", _FOOD_VISION_CONCURRENCY
                ))
            ),
            "food_vision_waiting": _FOOD_VISION_WAITERS,
            "food_asset_generation_enabled": FA.generation_enabled(),
            "food_asset_workers": sum(
                1 for task in _FOOD_ASSET_TASKS if not task.done()
            ),
            "food_asset_queue": (
                _FOOD_ASSET_CANDIDATES.qsize()
                if _FOOD_ASSET_CANDIDATES is not None else 0
            ),
            "section_pending": len(_SECTION_TASKS),
            "section_pending_limit": _SECTION_PENDING_LIMIT,
        },
        status=status,
    )

def build_web():
    aio = web.Application(client_max_size=20 * 1024 * 1024, middlewares=[_security_headers])  # фото до ~20 МБ
    aio.router.add_get("/", _serve_index)
    aio.router.add_get("/app2", _serve_index2)
    aio.router.add_post("/api/nudge", _api_nudge)
    aio.router.add_post("/api/food_prompt", _api_food_prompt)
    aio.router.add_post("/api/recipe", _api_recipe)
    aio.router.add_post("/api/log_history", _api_log_history)
    aio.router.add_post("/api/week_food_review", _api_week_food_review)
    _bd2 = os.path.join(os.path.dirname(os.path.abspath(__file__)), "webapp2", "assets")
    if os.path.isdir(_bd2):
        # Keep this strict content-addressed route before the broad static
        # mount: Railway/aiohttp then gets an explicit WebP MIME type, while
        # i167 Caddy serves the same immutable path directly.
        aio.router.add_get(
            "/assets/{kind}/catalog-v2/{filename}",
            _serve_reviewed_catalog_file,
        )
        aio.router.add_static("/assets/", path=_bd2)   # deslop-бандл, кадры маскота, картинки еды
    try:
        _generated_base = FA.generated_public_base()
    except ValueError as exc:
        # A disabled or previously used optional image feature must never
        # prevent Telegram, diary, cron jobs, or the whole web app from booting.
        log.warning("generated food assets route disabled: %s", exc)
        _generated_base = ""
    if _generated_base.startswith("/") and "://" not in _generated_base:
        _generated_dir = FA.generated_asset_dir()
        _generated_dir.mkdir(parents=True, exist_ok=True)
        aio.router.add_static(
            _generated_base + "/", path=str(_generated_dir),
            show_index=False, append_version=False,
        )
    aio.router.add_get("/health", _health)
    aio.router.add_route("*", "/admin", _legacy_admin_removed)
    aio.router.add_route("*", "/admin/login", _legacy_admin_removed)
    aio.router.add_route("*", "/api/admin_stats", _legacy_admin_removed)
    aio.router.add_post("/api/data", _api_data)
    aio.router.add_post("/api/section", _api_section)
    aio.router.add_post("/api/food-assets/revision", _api_food_asset_revision)
    aio.router.add_post("/api/today", _api_today)
    aio.router.add_post("/api/chat", _api_chat)
    aio.router.add_post("/api/feedback", _api_feedback)
    aio.router.add_post("/api/voice", _api_voice)
    aio.router.add_post("/api/food_photo", _api_food_photo)
    aio.router.add_post("/api/food_text", _api_food_text)
    aio.router.add_post("/api/track", _api_track)
    aio.router.add_post("/api/train", _api_train)
    aio.router.add_post("/api/train_day", _api_train_day)
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
    aio.router.add_post("/api/journal", _api_journal)
    aio.router.add_post("/api/proactive", _api_proactive)
    aio.router.add_post("/api/daily-summary", _api_daily_summary)
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
    await asyncio.to_thread(ensure_db_schema)
    start_event_writer()
    builder = (
        Application.builder()
        .token(os.environ["BOT_TOKEN"])
        .concurrent_updates(True)
        .rate_limiter(
            AIORateLimiter(
                overall_max_rate=float(
                    os.environ.get("AIWA_TELEGRAM_MAX_RATE", "28")
                ),
                overall_time_period=1,
                max_retries=int(
                    os.environ.get("AIWA_TELEGRAM_RATE_RETRIES", "2")
                ),
            )
        )
    )
    telegram_base_url = os.environ.get("AIWA_TELEGRAM_BOT_BASE_URL", "").strip()
    telegram_file_base_url = os.environ.get("AIWA_TELEGRAM_FILE_BASE_URL", "").strip()
    if telegram_base_url:
        builder = builder.base_url(telegram_base_url)
    if telegram_file_base_url:
        builder = builder.base_file_url(telegram_file_base_url)
    app = builder.build()
    global BOT_APP; BOT_APP = app
    app.add_handler(TypeHandler(Update, sync_telegram_identity), group=-1)
    for cmd, fn in (("start", start), ("today", today), ("summary", today), ("id", id_cmd), ("calendar", calendar_cmd), ("checkin", checkin_cmd),
                    ("period", period_cmd), ("menu", menu), ("time", set_time_cmd), ("mode", mode_cmd), ("menutoday", menutoday_cmd),
                    ("profile", profile_cmd), ("guide", guide_cmd), ("about", about_cmd), ("report", report_cmd), ("partner", partner_cmd), ("unlink", unlink_cmd), ("addcycles", addcycles_cmd), ("app", app_cmd), ("stop", stop), ("help", help_cmd), ("stats", stats_cmd), ("probe", probe_cmd), ("broadcast_today", broadcast_today_cmd), ("meno_update", meno_update_cmd), ("announce", announce_cmd), ("proactive", proactive_cmd), ("refs", refs_cmd), ("voicetest", voicetest_cmd), ("ui", ui_cmd)):
        # AIWA — бот личных диалогов. В группе (например, канале мониторинга)
        # он не должен заводить «пользователя» с id чата и вести онбординг;
        # исключение — /id, чтобы можно было узнать id группы для алертов.
        app.add_handler(CommandHandler(
            cmd, fn, filters=None if cmd == "id" else filters.ChatType.PRIVATE))
    app.add_error_handler(on_error)
    app.add_handler(CallbackQueryHandler(on_cb))
    app.add_handler(MessageHandler(filters.VOICE & filters.ChatType.PRIVATE, on_voice))
    # Выгрузка, присланная обратно: тот же формат, что отдаёт экспорт.
    app.add_handler(MessageHandler(
        filters.Document.FileExtension("json") & filters.ChatType.PRIVATE, on_export_document))
    app.add_handler(MessageHandler(
        (filters.PHOTO | filters.Document.IMAGE) & filters.ChatType.PRIVATE, on_photo))
    app.add_handler(MessageHandler(
        filters.TEXT & ~filters.COMMAND & filters.ChatType.PRIVATE, on_text))
    runner = web.AppRunner(build_web()); await runner.setup()
    port = int(os.environ.get("PORT", "8080"))
    # Railway needs the default public container bind; hardened i167 explicitly
    # sets AIWA_BIND_HOST=127.0.0.1 and exposes it only through Caddy.
    bind_host = os.environ.get("AIWA_BIND_HOST", "0.0.0.0")  # nosec B104
    http_backlog = max(
        128, min(4096, int(os.environ.get("AIWA_HTTP_BACKLOG", "1024")))
    )
    # The Railway default remains all interfaces; self-hosted staging binds loopback.
    site = web.TCPSite(
        runner, bind_host, port, backlog=http_backlog
    ); await site.start()  # nosec B104
    await app.initialize()
    if _candidate_mode():
        log.warning("AIWA_CANDIDATE=1: no polling, no jobs, no Telegram writes")
    else:
        await on_startup(app); await app.start(); await app.updater.start_polling(allowed_updates=Update.ALL_TYPES)
    global APP_READY; APP_READY = True
    log.info("AIWA bot + web on :%s", port)
    try:
        await asyncio.Event().wait()
    finally:
        APP_READY = False
        # Stop accepting new work before draining analytics produced by the last
        # in-flight handlers. This is the explicit SIGINT/SIGTERM deploy path;
        # atexit remains a final fallback only.
        await _shutdown_food_asset_workers()
        for name, shutdown in (
            ("telegram polling", app.updater.stop),
            ("telegram application", app.stop),
            ("telegram resources", app.shutdown),
            ("HTTP server", runner.cleanup),
        ):
            try:
                await shutdown()
            except (RuntimeError, asyncio.CancelledError) as exc:
                log.info("%s already stopped during shutdown: %s", name, exc)
            except Exception:
                log.exception("%s shutdown failed", name)
        drained = await asyncio.to_thread(stop_event_writer, 10)
        if not drained:
            log.error(
                "events_v2 writer did not drain before shutdown: pending=%s",
                _EVENT_WRITE_Q.unfinished_tasks,
            )

def main():
    try:
        asyncio.run(run_all())
    except KeyboardInterrupt:
        # systemd intentionally uses SIGINT so asyncio can run the explicit
        # shutdown/drain path above; do not report that clean stop as a crash.
        log.info("AIWA stopped cleanly after interrupt")

if __name__ == "__main__":
    main()
