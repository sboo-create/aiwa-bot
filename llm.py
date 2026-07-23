# -*- coding: utf-8 -*-
"""Сводка, ответы и динамические саджесты через GigaChat/LiteLLM."""
import os, re, json, html, requests, unicodedata, threading, contextvars, uuid
from contextlib import contextmanager
from datetime import datetime, timezone

# переиспользуем TCP/TLS-соединения к провайдеру вместо нового хендшейка на каждый вызов
_HTTP = requests.Session()
try:
    _adp = requests.adapters.HTTPAdapter(pool_connections=32, pool_maxsize=64, max_retries=0)
    _HTTP.mount("https://", _adp); _HTTP.mount("http://", _adp)
except Exception:
    pass

class Tok(int):
    """Token total with the legacy input/output/model attributes attached."""
    def __new__(cls, total, pin=0, pout=0, model=""):
        obj = int.__new__(cls, int(total or 0))
        obj.pin, obj.pout, obj.model = int(pin or 0), int(pout or 0), str(model or "")
        return obj

def _mk_tok(data, model=""):
    raw = (data or {}).get("usage") or {}
    inp = raw.get("prompt_tokens") or raw.get("input_tokens") or 0
    out = raw.get("completion_tokens") or raw.get("output_tokens") or 0
    total = raw.get("total_tokens") or (int(inp or 0) + int(out or 0))
    return Tok(total, inp, out, (data or {}).get("model") or model)

def usage_split(usage):
    """Return input, output and first reported model for the legacy dashboard."""
    values = usage or []
    inp = sum(getattr(item, "pin", 0) for item in values)
    out = sum(getattr(item, "pout", 0) for item in values)
    model = next((getattr(item, "model", "") for item in values if getattr(item, "model", "")), "")
    return inp, out, model

_USAGE_SINK = None
_CALL_CONTEXT = contextvars.ContextVar("aiwa_llm_call_context", default={})

def set_usage_sink(sink):
    """Register a best-effort callback receiving one record per provider call."""
    global _USAGE_SINK
    _USAGE_SINK = sink

@contextmanager
def call_context(user_key=None, request_id=None, purpose=None, user_generation=None):
    token = _CALL_CONTEXT.set({"user_key": user_key, "request_id": request_id, "purpose": purpose,
                               "user_generation": user_generation})
    try:
        yield
    finally:
        _CALL_CONTEXT.reset(token)

def _capture_usage(usage_list, data, provider, model, started, status="success", retry_index=0,
                   fallback_from=None, cost_unit=None):
    """Normalize OpenAI-, Anthropic- and GigaChat-style usage fields."""
    import time as _t
    raw = data.get("usage") or {} if isinstance(data, dict) else {}
    inp = int(raw.get("prompt_tokens") or raw.get("input_tokens") or 0)
    out = int(raw.get("completion_tokens") or raw.get("output_tokens") or 0)
    total = int(raw.get("total_tokens") or (inp + out))
    details = raw.get("prompt_tokens_details") or raw.get("input_tokens_details") or {}
    cached = int(details.get("cached_tokens") or raw.get("cache_read_input_tokens") or 0)
    reported_cost = raw.get("cost")
    try: reported_cost = float(reported_cost) if reported_cost is not None else None
    except (TypeError, ValueError): reported_cost = None
    if usage_list is not None:
        usage_list.append(Tok(total, inp, out, model))
    if _USAGE_SINK:
        ctx = _CALL_CONTEXT.get() or {}
        record = {
            "call_id": str(uuid.uuid4()), "occurred_at": datetime.now(timezone.utc).isoformat(),
            "user_key": ctx.get("user_key"), "request_id": ctx.get("request_id"),
            "user_generation": ctx.get("user_generation"),
            "purpose": ctx.get("purpose"), "provider": provider, "model": model,
            "status": status, "latency_ms": int((_t.time() - started) * 1000),
            "input_tokens": inp, "output_tokens": out, "cached_tokens": cached,
            "total_tokens": total, "retry_index": retry_index, "fallback_from": fallback_from,
            "reported_cost": reported_cost,
            "cost_unit": ((cost_unit or "provider_credit") if reported_cost is not None else None),
            "meta": {"reasoning_tokens": int((raw.get("completion_tokens_details") or {}).get("reasoning_tokens") or 0)},
        }
        try:
            _USAGE_SINK(record)
        except Exception as exc:
            print("usage sink error:", exc)

def _capture_failure(provider, model, started, status, retry_index=0):
    _capture_usage(None, {}, provider, model, started, status=status, retry_index=retry_index)

def _capture_media(provider, model, started, status, purpose, meta=None):
    import time as _t
    if not _USAGE_SINK:
        return
    ctx = _CALL_CONTEXT.get() or {}
    record = {
        "call_id": str(uuid.uuid4()), "occurred_at": datetime.now(timezone.utc).isoformat(),
        "user_key": ctx.get("user_key"), "request_id": ctx.get("request_id"),
        "user_generation": ctx.get("user_generation"),
        "purpose": ctx.get("purpose") or purpose, "provider": provider, "model": model,
        "status": status, "latency_ms": int((_t.time() - started) * 1000), "meta": meta or {},
    }
    try:
        _USAGE_SINK(record)
    except Exception as exc:
        print("usage sink error:", exc)

PROVIDER = os.environ.get("AIWA_PROVIDER", "litellm").lower()
GIGA_MODEL = os.environ.get("GIGACHAT_MODEL", "GigaChat-2")
GIGA_SCOPE = os.environ.get("GIGACHAT_SCOPE", "GIGACHAT_API_PERS")
GIGA_OAUTH = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"
GIGA_CHAT = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions"
GIGA_FILES = "https://gigachat.devices.sberbank.ru/api/v1/files"
GIGA_VISION_MODEL = os.environ.get("GIGACHAT_VISION_MODEL", GIGA_MODEL)
_GIGA_CA = os.environ.get("GIGACHAT_CA_BUNDLE_FILE")
_GIGA_VERIFY = _GIGA_CA if _GIGA_CA else os.environ.get("GIGACHAT_SSL_VERIFY", "true").strip().lower() not in {"0", "false", "no", "off"}
_giga_tok = {"token": None, "exp": 0.0}

def _giga_auth():
    import time as _t, uuid
    if _giga_tok["token"] and _giga_tok["exp"] - 60 > _t.time():
        return _giga_tok["token"]
    creds = os.environ.get("GIGACHAT_CREDENTIALS")
    if not creds:
        cid = os.environ.get("GIGACHAT_CLIENT_ID"); sec = os.environ.get("GIGACHAT_CLIENT_SECRET")
        if cid and sec:
            import base64
            creds = base64.b64encode(f"{cid}:{sec}".encode()).decode()
    if not creds:
        return None
    try:
        r = _HTTP.post(GIGA_OAUTH,
            headers={"Authorization": f"Basic {creds}", "RqUID": str(uuid.uuid4()),
                     "Content-Type": "application/x-www-form-urlencoded", "Accept": "application/json"},
            data={"scope": GIGA_SCOPE}, timeout=30, verify=_GIGA_VERIFY)
        r.raise_for_status(); d = r.json()
        _giga_tok["token"] = d["access_token"]
        _giga_tok["exp"] = (d.get("expires_at", 0) / 1000) or (_t.time() + 1500)
        return _giga_tok["token"]
    except Exception as e:
        print("Giga auth error:", e); return None

def _call_giga(messages, max_tokens, temperature, usage, attempts=4):
    import time as _t
    tok = _giga_auth()
    if not tok:
        return None
    wait = 1.5
    for i in range(attempts):
        started = _t.time()
        try:
            r = _HTTP.post(GIGA_CHAT,
                headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json", "Accept": "application/json"},
                json={"model": GIGA_MODEL, "messages": messages, "temperature": max(0.01, temperature), "max_tokens": max_tokens},
                timeout=(6, float(os.environ.get("GIGACHAT_CHAT_TIMEOUT_SECONDS") or "45")), verify=_GIGA_VERIFY)
            if r.status_code == 401:
                _capture_failure("gigachat", GIGA_MODEL, started, "http_401", i)
                _giga_tok["token"] = None; tok = _giga_auth()
                if not tok: return None
                continue
            if r.status_code == 429:
                _capture_failure("gigachat", GIGA_MODEL, started, "http_429", i)
                _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            r.raise_for_status(); data = r.json()
            _capture_usage(usage, data, "gigachat", GIGA_MODEL, started, retry_index=i)
            txt = (data["choices"][0]["message"]["content"] or "").strip()
            txt = re.sub(r"<think>.*?</think>", "", txt, flags=re.S).strip()
            return txt or None
        except Exception as e:
            _capture_failure("gigachat", GIGA_MODEL, started, "error", i)
            print("Giga error:", e)
            if i < attempts - 1: _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            return None
    return None

STAND_BASE = os.environ.get("GIGACHAT_STAND_BASE_URL", "https://gigachat.sberdevices.ru/v1").rstrip("/")
STAND_TOKEN_URL = os.environ.get("GIGACHAT_STAND_TOKEN_URL", "")
STAND_CHAT_URL = os.environ.get("GIGACHAT_STAND_CHAT_URL", "")
STAND_MODEL = os.environ.get("GIGACHAT_STAND_MODEL") or os.environ.get("GIGACHAT_DEFAULT_MODEL") or "GigaChat-3-Ultra"
STAND_UA = os.environ.get("GIGACHAT_STAND_USER_AGENT", "GigaChat-GigaTool-LiteLLM")
_stand_tok = {"token": None, "exp": 0.0}

def _env_bool(name, default):
    raw = os.environ.get(name)
    if raw is None:
        return default
    return raw.strip().lower() not in {"0", "false", "no", "off"}

def _stand_verify():
    raw = os.environ.get("GIGACHAT_STAND_SSL_VERIFY") or os.environ.get("GIGACHAT_SSL_VERIFY") or "true"
    raw = raw.strip()
    if raw.lower() in {"0", "false", "no", "off"}:
        return False
    if raw.lower() in {"1", "true", "yes", "on"}:
        return True
    return raw

def _stand_v1_base():
    base = STAND_BASE.rstrip("/")
    return base if base.endswith("/v1") else base + "/v1"

def _stand_token_urls():
    urls = []
    if STAND_TOKEN_URL:
        urls.append(STAND_TOKEN_URL)
    base = STAND_BASE.rstrip("/")
    v1 = _stand_v1_base()
    urls += [v1 + "/token", base + "/token"]
    out = []
    for u in urls:
        if u not in out:
            out.append(u)
    return out

def _stand_chat_url():
    if STAND_CHAT_URL:
        return STAND_CHAT_URL
    return _stand_v1_base() + "/chat/completions"

def _stand_model_name():
    m = STAND_MODEL or PROXY_MODEL
    aliases = {
        "gigachat-3-ultra": "GigaChat-3-Ultra",
        "gigachat-3-pro": "GigaChat-3-Pro",
        "gigachat-2-max": "GigaChat-2-Max",
        "gigachat-2-pro": "GigaChat-2-Pro",
    }
    return aliases.get(m.lower(), m)

def _stand_basic():
    key = os.environ.get("GIGACHAT_AUTHORIZATION_KEY") or os.environ.get("GIGACHAT_CREDENTIALS") or os.environ.get("GIGACHAT_BASIC")
    if key:
        key = key.strip()
        return key.split(" ", 1)[1].strip() if key.lower().startswith("basic ") else key
    user = os.environ.get("GIGACHAT_USER")
    password = os.environ.get("GIGACHAT_PASSWORD")
    if user and password:
        import base64
        return base64.b64encode(f"{user}:{password}".encode("utf-8")).decode("ascii")
    return None

def _stand_configured():
    return bool(_stand_basic())

def _stand_auth(force=False):
    import time as _t, uuid
    if not force and _stand_tok["token"] and _stand_tok["exp"] - 60 > _t.time():
        return _stand_tok["token"]
    basic = _stand_basic()
    if not basic:
        return None
    headers = {
        "Authorization": f"Basic {basic}",
        "RqUID": str(uuid.uuid4()),
        "Accept": "application/json",
        "User-Agent": STAND_UA,
    }
    for url in _stand_token_urls():
        try:
            r = _HTTP.post(url, headers=headers, timeout=(6, 30), verify=_stand_verify())
            if r.status_code in (404, 405):
                continue
            if r.status_code >= 400:
                print("GigaStand token error:", r.status_code, (r.text or "")[:300])
                continue
            data = r.json()
            token = data.get("tok") or data.get("access_token") or data.get("token")
            if not token:
                print("GigaStand token error: missing token field", list(data.keys()))
                continue
            exp = data.get("exp") or data.get("expires_at") or (_t.time() + 1500)
            try:
                exp = float(exp)
            except (TypeError, ValueError):
                exp = _t.time() + 1500
            if exp > 1e12:
                exp = exp / 1000.0
            elif exp < 1e6:  # это относительный TTL в секундах, а не абсолютная метка времени
                exp = _t.time() + exp
            _stand_tok["token"] = str(token)
            _stand_tok["exp"] = exp
            return _stand_tok["token"]
        except Exception as e:
            print("GigaStand token error:", e)
    return None

def _stand_payload(messages, max_tokens, temperature):
    return {
        "model": _stand_model_name(),
        "messages": messages,
        "temperature": max(0.01, temperature),
        "max_tokens": max_tokens,
    }

def _call_gigastand(messages, max_tokens, temperature, usage, attempts=3):
    import time as _t, uuid
    if not _stand_configured():
        return None
    wait = 1.5
    for i in range(attempts):
        started = _t.time()
        tok = _stand_auth(force=(i > 0 and i == attempts - 1))
        if not tok:
            return None
        headers = {
            "Authorization": f"Bearer {tok}",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Request-ID": str(uuid.uuid4()),
            "User-Agent": STAND_UA,
        }
        try:
            r = _HTTP.post(_stand_chat_url(), headers=headers,
                json=_stand_payload(messages, max_tokens, temperature),
                timeout=(6, float(os.environ.get("GIGACHAT_STAND_TIMEOUT") or os.environ.get("GIGACHAT_CHAT_TIMEOUT_SECONDS") or "60")),
                verify=_stand_verify())
            if r.status_code == 401:
                _capture_failure("gigastand", _stand_model_name(), started, "http_401", i)
                _stand_tok["token"] = None
                if i < attempts - 1:
                    continue
            if r.status_code == 429:
                _capture_failure("gigastand", _stand_model_name(), started, "http_429", i)
                _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            if r.status_code >= 400:
                _capture_failure("gigastand", _stand_model_name(), started, "http_%s" % r.status_code, i)
                print("GigaStand chat error:", r.status_code, (r.text or "")[:500])
                if i < attempts - 1:
                    _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
                return None
            data = r.json()
            _capture_usage(usage, data, "gigastand", _stand_model_name(), started, retry_index=i)
            txt = _response_text(data)
            txt = (txt or "").strip()
            txt = re.sub(r"<think>.*?</think>", "", txt, flags=re.S).strip()
            return txt or None
        except Exception as e:
            _capture_failure("gigastand", _stand_model_name(), started, "error", i)
            print("GigaStand chat error:", e)
            if i < attempts - 1:
                _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            return None
    return None

SYSTEM = (
    "Ты — AIWA, ИИ-ассистент женского здоровья по циклу. Пиши конкретно и тепло, на русском, без воды и без AI-флёра. "
    "Без восклицательных знаков, мотивационных лозунгов («ты справишься», «ты молодец»), уменьшительных и пафосных метафор; не обещай результат («станет легче») — говори «часто помогает». "
    "Опирайся на физиологию цикла и рекомендации гинекологов и эндокринологов. "
    "Твоё имя - Айва. Если пользовательница начинает сообщение с «Айва», воспринимай это как обращение к тебе, а не как просьбу рассказать о продукте. "
    "Если спрашивают, на чём ты работаешь и какая модель тебя питает, не называй конкретного вендора: скажи, что ты ИИ-ассистент Айва и работаешь на большой языковой модели. "
    "Ты сама ведёшь календарь цикла и отмечаешь месячные прямо в этом боте (кнопка Отметить месячные или команда /period). НИКОГДА не советуй пользователю сторонние приложения, календари или бумажные дневники для отслеживания цикла, всё это делается здесь, у тебя. "
    "ОЧЕНЬ ВАЖНО: ты НЕ можешь сама вносить, изменять или удалять данные (даты месячных, длину цикла, профиль, время рассылки, отметки) через чат, у тебя нет такой возможности. Никогда не пиши, что ты «добавила», «внесла», «изменила», «удалила» или «отметила» что-то. Если просят это сделать, честно объясни, ГДЕ это сделать: отметить месячные — кнопка «Отметить месячные» в меню или тап по дате в календаре приложения; изменить рост/вес/возраст — команда /profile; добавить историю циклов — «Изменить данные» → «История циклов». "
    "Команды бота, существуют только эти: /menu, /today, /checkin, /period, /calendar, /report, /partner, /unlink, /addcycles, /profile, /app, /time, /about, /id, /stop. Никогда не выдумывай других команд (например, нет команды /settings). Рост, вес и возраст меняются командой /profile. "
    "Формат строго для мессенджера: GitHub Markdown, который Telegram рендерит нативно. "
    "Используй ### для коротких подзаголовков, **жирный** для ключевых слов, строки с - для списков "
    "и GFM-таблицы с вертикальными чертами и обязательной строкой-разделителем. "
    "Если пользователь прямо просит таблицу, обязательно ответь настоящей таблицей и включи все запрошенные периоды. "
    "Не используй HTML-теги, одиночные обратные кавычки и ссылки в скобках. Не используй длинные тире. "
    "Отвечай точно на заданный вопрос и ровно в том объёме, который он требует. НЕ добавляй разделы про питание, нагрузку, фазу или прогноз, если о них прямо не спрашивали. Если в ответе несколько смысловых частей, можешь предварять их уместным эмодзи, но не навязывай фиксированную структуру ответ-питание-нагрузка-рекомендации. "
    "Перечисления оформляй списком: каждая строка с новой строки, начинается с «- » (дефис и пробел). "
    "Пиши строго и только на грамотном русском языке кириллицей. Никогда не вставляй латинские буквы и слова из других языков внутрь русских слов: пиши «сперматозоиды», а не «Сpermatozoиды»; «помогает», а не «giúpает»; «силовая тренировка», а не «силачья»; «кости», а не «bones». "
    "Отвечай ПО СУЩЕСТВУ вопроса и конкретно: названия, продукты, числа (нормы, дни, граммы), а не общие слова. "
    "Лекарства: безрецептурные препараты называть можно (например, ибупрофен, парацетамол, дротаверин), но БЕЗ конкретных "
    "дозировок и схем приёма; добавляй, что принимать по инструкции, а при сильной или частой боли обратиться к врачу. "
    "Не ставь диагнозы; при тревожных симптомах (сильная боль, обильное кровотечение, пропуски циклов) советуй гинеколога. "
    "Привязывай к фазе цикла только если вопрос про здоровье, питание, тренировки или самочувствие. "
    "Если вопрос общий (фильмы, досуг, быт), просто полезно ответь по теме и не притягивай физиологию цикла. "
    "Не здоровайся в каждом ответе. Приветствие допустимо только если пользовательница сама поздоровалась или это первое сообщение. Если в истории уже есть диалог, отвечай как продолжение разговора. "
    "Если вопрос медицинский или гинекологический (боль, выделения, ПМС, контрацепция, гормоны, симптомы), отвечай ГЛУБОКО и "
    "ПРИКЛАДНО: коротко механизм (что происходит физиологически), конкретные признаки и нормы с числами, что делать по шагам, "
    "и когда это повод к врачу. Не отписывайся общими словами. "
    "Если спрашивают про контрацепцию или предохранение, обязательно поясняй надёжность методов: прерванный половой акт (ППА) и "
    "календарный метод НЕнадёжны (по индексу Перля беременеют примерно 18-25 из 100 женщин в год; предэякулят может содержать сперматозоиды, "
    "и ППА не защищает от ИППП); презерватив надёжен при правильном применении; гормональные таблетки, ВМС и имплант высоконадёжны. "
    "Метод советуй подбирать с гинекологом, дозировки не назначай. "
    "Если спрашивают про подготовку к беременности, дай конкретику: фолиевая кислота заранее, отказ от алкоголя и курения, нормализация веса и сна, "
    "отслеживание овуляции и фертильного окна (примерно 5 дней до овуляции плюс день овуляции), визит к гинекологу и базовое обследование. "
    "Дозировки не называй ни для лекарств, ни для витаминов и добавок (включая фолиевую кислоту): говори принимать по инструкции или уточнить дозу у врача. "
    "Если это приветствие, благодарность или болтовня, ответь коротко и по-человечески, без сводок и без цикла."
)

FOCI = ["сон и восстановление", "железо и уровень энергии", "настроение и ПМС", "гидратация и отёки",
        "белок и сытость", "магний и тяга к сладкому", "пищеварение и клетчатка", "кожа и гормоны"]


_LAT2CYR = {"a":"а","b":"б","c":"с","d":"д","e":"е","f":"ф","g":"г","h":"х","i":"и","j":"й","k":"к",
            "l":"л","m":"м","n":"н","o":"о","p":"п","q":"к","r":"р","s":"с","t":"т","u":"у","v":"в",
            "w":"в","x":"кс","y":"ы","z":"з"}
def _translit_word(w):
    out = []
    for ch in w:
        rep = _LAT2CYR.get(ch.lower(), ch)
        if ch.isupper() and rep: rep = rep[0].upper() + rep[1:]
        out.append(rep)
    return "".join(out)
def fix_mixed_script(text):
    """Чиним слова, где модель смешала кириллицу и латиницу (Сpermatozoиды -> Сперматозоиды)."""
    if not text: return text
    def repl(m):
        w = m.group(0)
        w2 = "".join(c for c in unicodedata.normalize("NFD", w) if unicodedata.category(c) != "Mn")
        has_cyr = any("а" <= c.lower() <= "я" or c.lower() == "ё" for c in w2)
        has_lat = any("a" <= c.lower() <= "z" for c in w2)
        return _translit_word(w2) if (has_cyr and has_lat) else w
    return re.sub(r"[^\W\d_]+", repl, text, flags=re.UNICODE)

def _norm_sugg1(s, ensure_q=False):
    """Один саджест под кнопку Telegram: с заглавной буквы, без хвостовой точки, коротко."""
    if not s: return ""
    x = str(s).strip().strip('"«»').strip(" •-–—\n").strip()
    x = re.sub(r"(?i)^(вопрос|саджест|question|suggestion)\s*[:.\-—]?\s*", "", x)   # модельный префикс «вопрос:»
    x = re.sub(r"\s+", " ", x).rstrip(".")          # кнопке точка в конце не нужна
    if x and x[0].islower():
        x = x[0].upper() + x[1:]                     # всегда с большой буквы
    if ensure_q and x and not x.endswith("?"):
        x += "?"
    return x

def norm_suggs(items, n=2, maxlen=40, maxwords=5, ensure_q=False):
    """Чистит список саджестов: заглавная буква, без дублей, длинные отсекаем, чтобы влезали на кнопку.
    Если после фильтра по длине осталось меньше нужного — добираем самыми короткими из длинных (обрезки нет,
    просто такие не берём в приоритет)."""
    seen = set(); short = []; long = []
    for it in (items or []):
        x = _norm_sugg1(it, ensure_q=ensure_q)
        if not x or x.lower() in seen: continue
        seen.add(x.lower())
        wc = len(x.split())
        (short if (len(x) <= maxlen and wc <= maxwords) else long).append(x)
    long.sort(key=len)
    return (short + long)[:n]

def split_followups(text):
    """Достаёт 'СЛЕДУЮЩИЕ: q1 ;; q2' (в т.ч. обрезанное) и возвращает (чистый текст, [вопросы])."""
    if not text:
        return text, []
    qs = []
    m = re.search(r"СЛЕДУЮЩИЕ\s*:?\s*(.*)$", text, re.S)   # верхний регистр, как в инструкции, в любом месте
    if m:
        tail = m.group(1)
        raw = [q for q in re.split(r";;|\||\n|,\s+(?=[А-ЯA-ZЁ])", tail) if q.strip()]
        qs = norm_suggs(raw, n=2, maxlen=40, maxwords=5, ensure_q=True)
        clean = text[:m.start()]
    else:
        clean = re.sub(r"\n?\s*СЛЕДУ[А-ЯЁ]{0,6}\s*:?\s*$", "", text)   # обрезанный маркер в конце
    return clean.rstrip(), qs

def _clean(out, fallback):
    r = strip_md(out) if out else ""
    return r if r and r.strip() else fallback

def _ensure_complete(text):
    """Страховка от обрыва на полуслове: если ответ не закончился знаком конца предложения,
    подрезаем до последней завершённой фразы. Маркер СЛЕДУЮЩИЕ модель ставит в самом конце,
    поэтому его отсутствие — верный признак обрыва."""
    if not text:
        return text
    t = text.rstrip()
    if "СЛЕДУЮЩИЕ" in t.upper():
        return text                       # маркер на месте — ответ дошёл до конца
    if t.endswith((".", "!", "?", "…", ":", ")", "»", '"')):
        return text                       # завершается нормальным знаком
    m = list(re.finditer(r"[.!?…](?=\s|$)", t))
    if m and m[-1].end() > len(t) * 0.5:  # есть законченная фраза не в самом начале
        return t[:m[-1].end()].rstrip()
    return text

def strip_md(t):
    """Убираем markdown, который Telegram не рендерит, и длинные тире (SB их не любит)."""
    if not t:
        return t
    t = t.replace("\r", "")
    # ``` (моноширинные блоки), **жирный** и __курсив__ сохраняем — их конвертирует tg_rich при отправке
    t = re.sub(r"(?<!`)`(?!`)", "", t)                    # одиночные бэктики убираем
    t = re.sub(r"(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)", r"__\1__", t)   # *курсив* -> __курсив__
    out = []
    for ln in t.split("\n"):
        s = ln.rstrip()
        # GFM-таблицы и #-заголовки сохраняем — их рендерит sendRichMessage
        s = re.sub(r"^(\s*)•\s+", r"\1- ", s)      # «• » -> GFM-список, иначе markdown склеит строки
        out.append(s)
    t = "\n".join(out)
    t = t.replace("—", "-").replace("–", "-")
    t = re.sub(r"\n{3,}", "\n\n", t)
    return fix_mixed_script(t.strip())


def _ctx(st):
    c = st["content"]
    return (f"День цикла {st['day']} из {st['cycle_len']}, {st['subphase']} {st['phase_ru'].lower()} фаза, "
            f"до месячных ~{st['days_to_next']} дн. Опорно: {c['general']} Питание: {c['food']} Нагрузка: {c['training']}")


def _focus(st):
    return FOCI[st["day"] % len(FOCI)]


_OPENROUTER_KEY = os.environ.get("OPENROUTER_API_KEY")
def _chat_completions_url(base_url):
    """Accept either an OpenAI base URL (/v1) or a full chat-completions URL."""
    url = (base_url or "").strip().rstrip("/")
    if not url:
        return ""
    if url.endswith("/chat/completions") or url.endswith("/messages"):
        return url
    if url.endswith("/v1"):
        return url + "/chat/completions"
    return url + "/v1/chat/completions"

_PROXY_BASE = (os.environ.get("LITELLM_URL") or os.environ.get("OPENROUTER_BASE_URL")
               or ("https://openrouter.ai/api/v1" if _OPENROUTER_KEY else ""))
PROXY_URL = _chat_completions_url(_PROXY_BASE)
if PROXY_URL.startswith("http://") and not _env_bool("AIWA_ALLOW_INSECURE_LLM_HTTP", False):
    print("LLM proxy disabled: plain HTTP would expose API keys and health data; configure HTTPS")
    PROXY_URL = ""
PROXY_MODEL = (os.environ.get("LITELLM_MODEL") or os.environ.get("OPENROUTER_TEXT_MODEL")
               or os.environ.get("OPENROUTER_MODEL") or (None if _OPENROUTER_KEY else "gigachat-3-ultra"))
OPENROUTER_VISION_MODEL = os.environ.get("OPENROUTER_VISION_MODEL")
FALLBACK_PROXY_URL = ""  # no implicit third-party endpoints; configure the fallback explicitly
def _proxy_verify():
    raw = (os.environ.get("LITELLM_CA_BUNDLE_FILE") or os.environ.get("LITELLM_SSL_VERIFY") or "true").strip()
    if raw.lower() in {"0", "false", "no", "off"}: return False
    if raw.lower() in {"1", "true", "yes", "on"}: return True
    return raw
def _proxy_is_messages(url=None):
    return "/messages" in ((url or PROXY_URL) or "")

def _proxy_payload(messages, max_tokens, temperature, url=None, model=None, provider_preferences=None):
    model = model or PROXY_MODEL
    if not _proxy_is_messages(url):
        payload = {"messages": messages, "temperature": max(0.01, temperature), "max_tokens": max_tokens}
        if model: payload["model"] = model
        if provider_preferences: payload["provider"] = provider_preferences
        return payload
    system = "\n\n".join((m.get("content") or "") for m in messages if m.get("role") == "system").strip()
    mm = []
    for m in messages:
        role = m.get("role")
        if role == "system":
            continue
        if role not in ("user", "assistant"):
            role = "user"
        mm.append({"role": role, "content": m.get("content") or ""})
    payload = {"messages": mm, "temperature": max(0.01, temperature), "max_tokens": max_tokens}
    if model: payload["model"] = model
    if provider_preferences: payload["provider"] = provider_preferences
    if system:
        payload["system"] = system
    return payload

def _openrouter_provider_preferences():
    """Fail closed for sensitive health data unless explicitly overridden."""
    collection = (os.environ.get("OPENROUTER_DATA_COLLECTION") or "deny").strip().lower()
    if collection not in {"allow", "deny"}:
        collection = "deny"
    prefs = {"data_collection": collection}
    if _env_bool("OPENROUTER_ZDR", True):
        prefs["zdr"] = True
    return prefs

def _response_text(data):
    try:
        txt = data["choices"][0]["message"]["content"]
    except Exception:
        txt = None
    if isinstance(txt, str) and txt.strip():
        return txt.strip()
    c = data.get("content") if isinstance(data, dict) else None
    if isinstance(c, str):
        return c.strip()
    if isinstance(c, list):
        parts = []
        for item in c:
            if isinstance(item, dict):
                val = item.get("text") or item.get("content")
                if isinstance(val, str): parts.append(val)
            elif isinstance(item, str):
                parts.append(item)
        return "\n".join(parts).strip()
    return None

def _proxy_configs():
    key = os.environ.get("LITELLM_KEY") or _OPENROUTER_KEY; xkey = os.environ.get("LITELLM_XKEY")
    is_openrouter = bool(_OPENROUTER_KEY and not os.environ.get("LITELLM_URL"))
    # A LiteLLM gateway can still route an explicitly prefixed OpenRouter
    # model. OpenRouter credits are denominated in USD, so preserve that unit
    # even though the immediate HTTP endpoint is LiteLLM.
    uses_openrouter_billing = is_openrouter or str(PROXY_MODEL or "").lower().startswith("openrouter/")
    cfgs = [{"name": ("openrouter" if is_openrouter else "litellm"), "url": PROXY_URL, "model": PROXY_MODEL,
             "key": key, "xkey": xkey,
             "referer": os.environ.get("OPENROUTER_HTTP_REFERER"),
             "title": os.environ.get("OPENROUTER_APP_TITLE") or "AIWA",
             "provider": (_openrouter_provider_preferences() if is_openrouter else None),
             "cost_unit": ("usd" if uses_openrouter_billing else os.environ.get("LITELLM_COST_UNIT"))}]
    fb_key = os.environ.get("LITELLM_FALLBACK_KEY") or os.environ.get("AIWA_LLM_FALLBACK_KEY")
    fb_xkey = os.environ.get("LITELLM_FALLBACK_XKEY") or os.environ.get("AIWA_LLM_FALLBACK_XKEY")
    fb_url = os.environ.get("LITELLM_FALLBACK_URL") or os.environ.get("AIWA_LLM_FALLBACK_URL") or FALLBACK_PROXY_URL
    if fb_key or fb_xkey:
        fb_model = os.environ.get("LITELLM_FALLBACK_MODEL") or os.environ.get("AIWA_LLM_FALLBACK_MODEL") or PROXY_MODEL
        cfgs.append({
            "name": "litellm_fallback",
            "url": fb_url,
            "model": fb_model,
            "key": fb_key,
            "xkey": fb_xkey,
            "cost_unit": ("usd" if str(fb_model or "").lower().startswith("openrouter/")
                          else os.environ.get("LITELLM_FALLBACK_COST_UNIT") or os.environ.get("LITELLM_COST_UNIT")),
        })
    return [c for c in cfgs if c.get("url") and (c.get("key") or c.get("xkey"))]

def _openrouter_vision_config():
    """Separate image model so a text-only model never receives food photos."""
    if not (_OPENROUTER_KEY and OPENROUTER_VISION_MODEL and PROXY_URL):
        return None
    return {
        "name": "openrouter",
        "url": PROXY_URL,
        "model": OPENROUTER_VISION_MODEL,
        "key": _OPENROUTER_KEY,
        "referer": os.environ.get("OPENROUTER_HTTP_REFERER"),
        "title": os.environ.get("OPENROUTER_APP_TITLE") or "AIWA",
        "provider": _openrouter_provider_preferences(),
        "cost_unit": "usd",
    }

def _call_proxy_one(cfg, messages, max_tokens, temperature, usage, attempts=4):
    import time as _t
    headers = {"Content-Type": "application/json"}
    if cfg.get("key"): headers["Authorization"] = f"Bearer {cfg['key']}"
    if cfg.get("xkey"): headers["X-API-Key"] = cfg["xkey"]
    if cfg.get("referer"): headers["HTTP-Referer"] = cfg["referer"]
    if cfg.get("title"): headers["X-OpenRouter-Title"] = cfg["title"]
    wait = 1.5
    for i in range(attempts):
        started = _t.time()
        try:
            r = _HTTP.post(cfg["url"], headers=headers,
                json=_proxy_payload(messages, max_tokens, temperature, cfg["url"], cfg.get("model"),
                                    cfg.get("provider")),
                timeout=(6, 30), verify=_proxy_verify())
            if r.status_code == 429:
                _capture_failure(cfg.get("name") or "litellm", cfg.get("model"), started, "http_429", i)
                _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            if r.status_code >= 400:
                _capture_failure(cfg.get("name") or "litellm", cfg.get("model"), started, "http_%s" % r.status_code, i)
                print("Proxy error:", cfg.get("name"), r.status_code, (r.text or "")[:500])
                if i < attempts - 1: _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
                return None
            data = r.json()
            actual_provider = data.get("provider") or cfg.get("name") or "litellm"
            actual_model = data.get("model") or cfg.get("model")
            _capture_usage(usage, data, actual_provider, actual_model, started, retry_index=i,
                           cost_unit=cfg.get("cost_unit"))
            txt = _response_text(data)
            txt = (txt or "").strip()
            txt = re.sub(r"<think>.*?</think>", "", txt, flags=re.S).strip()
            return txt or None
        except Exception as e:
            _capture_failure(cfg.get("name") or "litellm", cfg.get("model"), started, "error", i)
            print("Proxy error:", cfg.get("name"), e)
            if i < attempts - 1: _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            return None
    return None

def _call_proxy(messages, max_tokens, temperature, usage, attempts=4):
    for i, cfg in enumerate(_proxy_configs()):
        out = _call_proxy_one(cfg, messages, max_tokens, temperature, usage, attempts if i == 0 else 1)
        if out:
            if i:
                print("LLM fallback proxy used:", cfg.get("name"))
            return out
    return None


def call_tools(messages, tools, usage=None, temperature=0.4, max_tokens=900):
    """Один раунд OpenAI-style function-calling. Возвращает {content, tool_calls} или None,
    если провайдер недоступен/не поддержал инструменты (тогда вызывающий откатывается к обычному ответу)."""
    cfgs = [c for c in _proxy_configs() if not _proxy_is_messages(c.get("url"))]
    if not cfgs:
        return None
    cfg = cfgs[0]
    import time as _tt
    STATS["calls"] += 1
    if not _LLM_SEM.acquire(blocking=False):
        STATS["queued"] += 1
        _LLM_SEM.acquire()
    t1 = _tt.time(); ok = False
    try:
        headers = {"Content-Type": "application/json"}
        if cfg.get("key"): headers["Authorization"] = "Bearer " + cfg["key"]
        if cfg.get("xkey"): headers["X-API-Key"] = cfg["xkey"]
        if cfg.get("referer"): headers["HTTP-Referer"] = cfg["referer"]
        if cfg.get("title"): headers["X-OpenRouter-Title"] = cfg["title"]
        payload = {"messages": messages, "temperature": max(0.01, temperature), "max_tokens": max_tokens,
                   "tools": tools, "tool_choice": "auto"}
        if cfg.get("model") or PROXY_MODEL: payload["model"] = cfg.get("model") or PROXY_MODEL
        if cfg.get("provider"): payload["provider"] = cfg["provider"]
        r = _HTTP.post(cfg["url"], headers=headers, json=payload, timeout=(6, 45), verify=_proxy_verify())
        if r.status_code >= 400:
            _capture_failure(cfg.get("name") or "litellm", cfg.get("model"), t1, "http_%s" % r.status_code)
            print("call_tools proxy error:", r.status_code, (r.text or "")[:300])
            return None
        data = r.json()
        actual_provider = data.get("provider") or cfg.get("name") or "litellm"
        actual_model = data.get("model") or cfg.get("model")
        _capture_usage(usage, data, actual_provider, actual_model, t1,
                       cost_unit=cfg.get("cost_unit"))
        msg = (data.get("choices") or [{}])[0].get("message") or {}
        content = msg.get("content")
        if isinstance(content, str):
            content = re.sub(r"<think>.*?</think>", "", content, flags=re.S).strip()
        ok = True
        return {"content": content, "tool_calls": msg.get("tool_calls")}
    except Exception as e:
        _capture_failure(cfg.get("name") or "litellm", cfg.get("model"), t1, "error")
        print("call_tools error:", e)
        return None
    finally:
        _LLM_SEM.release()
        STATS["ms"] += int((_tt.time() - t1) * 1000)
        if not ok:
            STATS["err"] += 1

def _call_impl(messages, max_tokens=1100, temperature=0.45, usage=None, attempts=4):
    """Единая точка вызова модели. Движок выбирается переменной AIWA_PROVIDER."""
    aliases = {"proxy": "litellm", "openrouter": "litellm", "stand": "gigastand", "direct": "gigastand", "adapter": "gigastand"}
    primary = aliases.get(PROVIDER, PROVIDER)
    providers = [primary] + [p for p in ("litellm", "gigastand", "gigachat") if p != primary]
    for i, p in enumerate(providers):
        tries = attempts if i == 0 else 1
        if p == "litellm":
            out = _call_proxy(messages, max_tokens, temperature, usage, attempts=tries)
        elif p == "gigastand":
            out = _call_gigastand(messages, max_tokens, temperature, usage, attempts=tries)
        elif p == "gigachat":
            out = _call_giga(messages, max_tokens, temperature, usage, attempts=tries)
        else:
            out = None
        if out:
            if i:
                print(f"LLM fallback provider used: {p}")
            return out
    return None

def _compact_messages(messages):
    user = ""
    for m in reversed(messages or []):
        if m.get("role") == "user":
            user = m.get("content") or ""
            break
    return [
        {"role": "system", "content": (
            "Ты AIWA, ИИ-ассистент женского здоровья. Отвечай на русском, конкретно, медицински аккуратно, "
            "без markdown и без длинных тире. Если вопрос про цикл, беременность, питание или тренировки, дай практичный ответ. "
            "Если нужно менять данные, честно скажи, что это делается через меню или приложение."
        )},
        {"role": "user", "content": user[-1800:]},
    ]


# --- метрики нагрузки: считаем вызовы модели и латентность за интервал ---
STATS = {"calls": 0, "ms": 0, "err": 0, "wait_ms": 0, "queued": 0}
# семафор: не больше N одновременных обращений к модели, остальные ждут в очереди
_LLM_SEM = threading.Semaphore(int(os.environ.get("AIWA_LLM_CONCURRENCY", "10")))
def _call(messages, max_tokens=1100, temperature=0.45, usage=None, attempts=2):
    import time as _tt
    t0 = _tt.time(); STATS["calls"] += 1
    if not _LLM_SEM.acquire(blocking=False):
        STATS["queued"] += 1
        _LLM_SEM.acquire()  # ждём свободный слот
    STATS["wait_ms"] += int((_tt.time() - t0) * 1000)
    t1 = _tt.time(); out = None
    try:
        out = _call_impl(messages, max_tokens, temperature, usage, attempts)
        # компакт-ретрай только для чисто текстовых сообщений: vision-контент (список) он бы выбросил
        if not out and len(str(messages)) > 3000 and all(isinstance(m.get("content"), str) for m in (messages or []) if m.get("content") is not None):
            print("LLM compact retry")
            out = _call_impl(_compact_messages(messages), min(max_tokens, 650), min(temperature, 0.35), usage, 1)
        return out
    finally:
        _LLM_SEM.release()
        STATS["ms"] += int((_tt.time() - t1) * 1000)
        if not out: STATS["err"] += 1
def probe_once():
    """Один минимальный вызов к модели В ОБХОД семафора — для замера реальной параллельности тарифа."""
    import time as _t
    t0 = _t.time()
    try:
        out = _call_impl([{"role": "system", "content": "Ответь одним словом."},
                          {"role": "user", "content": "ок"}], max_tokens=5, temperature=0.1, usage=None, attempts=1)
        return (bool(out), int((_t.time() - t0) * 1000))
    except Exception:
        return (False, int((_t.time() - t0) * 1000))

def pop_stats():
    s = dict(STATS)
    for k in STATS:
        STATS[k] = 0
    return s

def health_check(usage=None):
    out = _call([
        {"role": "system", "content": "Ты AIWA. Ответь только одним словом на русском."},
        {"role": "user", "content": "Служебная проверка. Ответь: работает"}
    ], max_tokens=16, temperature=0.1, usage=usage, attempts=1)
    return bool(out and out.strip()), (out or "").strip()


FMT_TG = ("Форматирование — GitHub-маркдаун, Telegram рендерит его нативно: подзаголовки «### Название» (можно с эмодзи), "
          "**жирный** для ключевых слов, списки строками с «- », таблицы в GFM-синтаксисе (| Колонка | Колонка | с разделительной строкой |---|---|) — "
          "используй таблицу, когда сравниваешь числа или даёшь нормы КБЖУ. Цитата — строка с «> ». "
          "Не используй HTML-теги и не вставляй ссылки. "
          "ВАЖНО: если пользовательница просит конкретный формат (таблицу, список, шаги) — ОБЯЗАТЕЛЬНО оформи именно им; просьба «в таблице» = настоящая GFM-таблица.")

SUGG_RULES = ("Каждый саджест: от лица пользовательницы, начинается С ЗАГЛАВНОЙ буквы, 2-4 слова, "
              "ЗАКАНЧИВАЕТСЯ знаком вопроса, БЕЗ слова «вопрос», без точки, без нумерации и без кавычек.")

SUMMARY_LEN = ("Объём всей сводки 700-1100 знаков. В каждом блоке 2-3 пункта; каждый пункт — конкретика "
               "(число, продукт или действие) плюс короткое «почему» через механизм (гормон, нутриент, сон). Без общих слов.")

TOV = ("Тон: спокойный, конкретный, на равных, тёплый без слащавости. ЗАПРЕЩЕНО: восклицательные знаки; "
       "мотивационные лозунги и комплименты («ты справишься», «ты молодец», «супер», «отличный день»); "
       "уменьшительные («денёк», «водичка»); пафосные метафоры («магия тела», «суперсила», «перезагрузка»); "
       "канцелярит («осуществляется», «рекомендуется к употреблению»); обещания результата — вместо «станет легче» "
       "пиши «часто помогает»; пустые фразы без факта или действия. Каждый пункт начинай с сути.")

def build_prompt(st, modules):
    p = [f"Данные: {_ctx(st)}", f"Сегодняшний акцент дня: {_focus(st)}.", "",
         "Собери короткую утреннюю сводку из блоков. Каждый блок начинай с заголовка «### эмодзи название» на отдельной строке, "
         "содержимое — список: каждый пункт с НОВОЙ строки и начинается с «- » (это обязательный формат списка). Между блоками пустая строка. Конкретика и числа, без воды."]
    if "phase" in modules:    p.append("Блок «🌙 Фаза и прогноз»: точный день и под-фаза, что это значит, сколько дней до месячных.")
    if "general" in modules:  p.append("Блок «💛 Тело сегодня»: какой гормон ведёт и как это отражается на энергии и самочувствии именно в этот день.")
    if "food" in modules:     p.append("Блок «🍽 Питание»: что с аппетитом в эту под-фазу, и 3-4 продукта отдельными пунктами списка вида «- продукт: зачем (нутриент и эффект)», с привязкой к акценту дня.")
    if "training" in modules: p.append("Блок «🏋️ Нагрузка»: какая тренировка уместна сегодня и обязательно ПОЧЕМУ - свяжи с фазой и гормонами (например, в фолликулярной выше чувствительность к инсулину, поэтому силовые; в поздней лютеиновой - восстановление). 2-3 пункта.")
    p.append("Русский язык, без длинных тире. " + FMT_TG + " " + SUMMARY_LEN + " Сделай акцент дня заметным, не повторяй формулировки изо дня в день, без приветствий. " + TOV)
    return "\n".join(p)


def generate_summary(st, modules, hint=None, usage=None):
    prompt = build_prompt(st, modules)
    if hint:
        prompt += f"\nУчитывай вчерашний чек-ин пользовательницы: {hint}. Свяжи рекомендации с этим."
    out = _call([{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}], max_tokens=1100, usage=usage)
    return _ensure_complete(_clean(out, fallback_summary(st, modules)))


_ACT = {1: "минимальная", 2: "лёгкая", 3: "умеренная", 4: "высокая", 5: "очень высокая"}
def _ctx_note(st, profile):
    note = ""
    if st:
        ov = max(12, st['cycle_len'] - 14)
        note = (f"Данные пользовательницы по циклу: сегодня день {st['day']} из {st['cycle_len']}, фаза {st['subphase']} {st['phase_ru'].lower()}. "
                f"До следующих месячных примерно {st['days_to_next']} дн. Овуляция ориентировочно на {ov} день цикла, фертильное окно примерно за 5 дней до овуляции. "
                f"Когда спрашивают про овуляцию, фертильность, день цикла или сколько до месячных - отвечай этими конкретными числами про неё, а не общими словами. "
                f"ВАЖНО: эти данные - фоновая справка. Используй их ТОЛЬКО если вопрос про цикл, самочувствие, питание, тренировки или здоровье. "
                f"Если сообщение - приветствие, болтовня, благодарность или общий вопрос (фильмы, быт, отношения, работа), НЕ упоминай день цикла, фазу и месячные вообще.")
    if profile:
        bits = []
        if profile.get("height"): bits.append(f"рост {profile['height']} см")
        if profile.get("weight"): bits.append(f"вес {profile['weight']} кг")
        if profile.get("age"): bits.append(f"возраст {profile['age']}")
        a = _ACT.get(profile.get("activity"))
        if a: bits.append(f"активность {a}")
        d = profile.get("diet") or profile.get("diet_note")
        if d: bits.append("есть пищевые ограничения")
        if bits:
            note += " Данные пользовательницы: " + ", ".join(bits) + ". Используй их для персональных расчётов (например калорий по формуле Миффлина-Сан Жеора для женщин)."
    return note

def _history_note(history):
    if not history:
        return ""
    rows = []
    for m in list(history)[-6:]:
        role = "Айва" if m.get("role") == "assistant" else "Пользовательница"
        text = re.sub(r"\s+", " ", (m.get("content") or "")).strip()
        if text:
            rows.append(f"{role}: {text[:500]}")
    if not rows:
        return ""
    return ("\n\nКонтекст предыдущего диалога. Используй его только как память, "
            "но отвечай именно на новый вопрос ниже, а не на предыдущие вопросы:\n" + "\n".join(rows))

def answer_question(st, question, profile=None, history=None, usage=None):
    note = _ctx_note(st, profile)
    msgs = [{"role": "system", "content": SYSTEM + (("\n\n" + note) if note else "") + _history_note(history)}]
    msgs.append({"role": "user", "content": (
        "НОВЫЙ ВОПРОС, НА КОТОРЫЙ НУЖНО ОТВЕТИТЬ СЕЙЧАС:\n" + question + "\n\n"
        "СНАЧАЛА определи тип сообщения. Если это приветствие, благодарность, болтовня или просто общение без вопроса про здоровье - ответь коротко (1-3 предложения), тепло и по-человечески, БЕЗ упоминания цикла, фаз, месячных и медицины, и сразу переходи к строке СЛЕДУЮЩИЕ. Все требования ниже про подробность - только для содержательных вопросов. "
        "Дай подробный, качественный ответ с медицинским обоснованием, как грамотный и тёплый гинеколог простыми словами. "
        "Отвечай строго по заданному вопросу, без лишних разделов. Начни с уместного эмодзи. Разбивай на части и используй списки (строки с «- ») только там, где это реально нужно по теме. НЕ добавляй разделы про питание, нагрузку или общие рекомендации, если вопрос не про них. Давай конкретику (продукты, нормы, числа) там, где уместно. Безрецептурные препараты можно назвать, но без конкретных доз. "
        "Если вопрос про питание или тренировки - СРАЗУ отвечай по сути: конкретные продукты или пример меню на день, либо конкретные упражнения; привязку к фазе цикла давай кратко и только если это реально важно, НЕ уводи ответ в рассказ про цикл. Если вопрос про цикл, беременность, гормоны, фертильность или самочувствие - можешь коротко привязать к её данным (день цикла, фаза, до месячных), потом разверни тему по существу. "
        "Если вопрос общий (фильмы, быт) - ответь развёрнуто по теме, цикл не притягивай. "
        "Не здоровайся, если пользовательница не поздоровалась прямо сейчас. Если есть история диалога, отвечай как продолжение и учитывай предыдущие реплики. "
        "Пиши живо и тепло, без воды и канцелярита. Будь ЛАКОНИЧНА: целевой объём 900-1500 знаков, ЖЁСТКИЙ предел 1900 знаков. Убирай всё лишнее, оставляй только суть по вопросу. Лучше короче и завершённо, чем длинно и оборванно — ОБЯЗАТЕЛЬНО заверши мысль. Только русский. " + FMT_TG + " "
        "В самом конце добавь отдельной строкой ровно так: СЛЕДУЮЩИЕ: <текст> ;; <текст> — два релевантных саджеста. " + SUGG_RULES)})
    out = _call(msgs, max_tokens=1200, temperature=0.35, usage=usage)
    return _ensure_complete(_clean(out, "Я вижу вопрос, но модель сейчас не вернула ответ. Попробуй ещё раз через минуту."))


def training_plan(st, profile=None):
    phase = st.get("phase")
    sub = st.get("subphase", "")
    day = st.get("day")
    cycle_len = st.get("cycle_len")
    left = st.get("days_to_next")
    base = {
        "menstrual": {
            "level": "Мягкая нагрузка",
            "duration": "10-30 мин",
            "summary": "Сегодня цель не прогресс, а облегчить спазм, поддержать кровоток и не забрать у тела ресурс.",
            "why": "В дни кровотечения эстроген и прогестерон находятся на низком уровне, а простагландины могут усиливать спазмы. Поэтому цель нагрузки не рекорд, а мягкое движение, которое поддерживает кровоток, снижает мышечное напряжение и не усиливает боль.",
            "hormones": [
                "Эстроген и прогестерон низкие: энергии может быть меньше обычного.",
                "Простагландины связаны со спазмами, поэтому тренировка через боль часто ухудшает состояние.",
                "Мягкое движение может уменьшить напряжение в пояснице и животе за счёт кровотока и дыхания."
            ],
            "options": [
                {"name": "Спокойная прогулка", "benefit": "поддерживает кровоток и может снизить ощущение спазма без резкого подъёма пульса", "how": "20-30 мин в ровном темпе, без цели ускоряться"},
                {"name": "Растяжка спины и таза", "benefit": "помогает расслабить поясницу, бёдра и тазовое дно, где часто копится напряжение при спазмах", "how": "10-15 мин, медленно, без боли, рывков, глубоких скручиваний и пресса"},
                {"name": "Мягкая йога", "benefit": "снижает мышечное напряжение, помогает дыханию и может облегчить тяжесть в животе", "how": "15-25 мин, спокойные позы, без прыжков, планок и перевёрнутых положений"},
            ],
            "avoid": "прыжки, тяжёлые веса, интенсивное кардио, тренировку через боль",
            "recovery": "тепло, вода, сон, железо в питании; при сильной боли - отдых"
        },
        "follicular": {
            "level": "Можно активнее",
            "duration": "35-55 мин",
            "summary": "Хорошее окно для силовой, пилатеса и бодрого кардио, если сон и самочувствие нормальные.",
            "why": "После месячных эстроген обычно растёт, а прогестерон ещё низкий. У многих в это окно выше энергия, лучше переносимость нагрузки и легче даётся силовая работа. Нагрузку можно делать плотнее, но без резкого скачка объёма.",
            "hormones": [
                "Эстроген растёт: часто больше энергии, мотивации и устойчивости к нагрузке.",
                "Прогестерон ещё низкий: меньше сонливости и ощущения тяжести, чем во второй половине цикла.",
                "Чувствительность к инсулину у многих лучше, поэтому силовая и углеводы вокруг тренировки могут переноситься легче."
            ],
            "options": [
                {"name": "Силовая тренировка", "benefit": "использует окно роста эстрогена: мышцы часто лучше переносят рабочий вес и объём", "how": "40-50 мин, ноги, спина, ягодицы, 2-3 подхода, 2 повтора в запасе"},
                {"name": "Кардио умеренно-бодро", "benefit": "поддерживает выносливость и настроение, но не перегружает восстановление как жёсткие интервалы", "how": "25-35 мин: дорожка, велосипед или эллипс, дыхание активное, но контролируемое"},
                {"name": "Пилатес или функциональная", "benefit": "укрепляет корпус, осанку и тазовое дно, помогает вернуться в активный режим после месячных", "how": "35-45 мин, контролируемый темп, без резких прыжков и работы через боль"},
            ],
            "avoid": "не добавлять резко вес и темп, если плохо спала или есть тянущая боль",
            "recovery": "белок после тренировки, углеводы в обед, 7-8 часов сна"
        },
        "ovulation": {
            "level": "Интенсивно, но аккуратно",
            "duration": "30-50 мин",
            "summary": "Можно выбрать более энергичную тренировку, но разминка и контроль движений сегодня особенно важны.",
            "why": "В овуляцию обычно пик эстрогена и всплеск ЛГ. Часто больше энергии и драйва, но у части женщин связки ощущаются мягче, а резкие движения хуже контролируются. Поэтому интенсивность можно, но только с разминкой и техникой.",
            "hormones": [
                "Эстроген на пике, ЛГ запускает овуляцию: у многих больше энергии и желания двигаться.",
                "Тело может ощущаться более подвижным, поэтому прыжки и рывки требуют особенно хорошей разминки.",
                "Если есть тянущая боль сбоку или дискомфорт внизу живота, интенсивность лучше снизить."
            ],
            "options": [
                {"name": "Силовая активнее обычного", "benefit": "использует пик энергии, но оставляет запас для связок и суставов", "how": "35-50 мин, 10 мин разминки, вес добавлять только если техника стабильная"},
                {"name": "Короткие интервалы", "benefit": "дают кардио-стимул без слишком длинной сессии, когда энергии много, но восстановление всё равно важно", "how": "10-15 мин основной части после разминки, паузы не пропускать"},
                {"name": "Танцы, бокс или сайкл", "benefit": "подходит для динамики и настроения, если нет боли и хорошо контролируются движения", "how": "30-45 мин, следить за дыханием, коленями и дискомфортом внизу живота"},
            ],
            "avoid": "рывки без разминки, прыжки при дискомфорте внизу живота",
            "recovery": "разминка 10 мин, заминка, вода и электролиты при жаре"
        },
        "luteal": {
            "level": "Умеренно и стабильно",
            "duration": "25-45 мин",
            "summary": "Лучше выбрать нагрузку, после которой станет легче, а не тренировку на максимум.",
            "why": "Во второй половине цикла выше прогестерон. У некоторых растёт температура тела, быстрее приходит усталость, появляются отёки, тяга к сладкому и раздражительность. Умеренная нагрузка помогает сну и настроению, а перегруз может усилить ПМС.",
            "hormones": [
                "Прогестерон выше: может быть больше сонливости, отёков и чувствительности к стрессу.",
                "Ближе к месячным часто хуже переносится перегрев и тренировка на голодный желудок.",
                "Лучше работают умеренная силовая, ходьба, плавание и пилатес, где нагрузка стабильная."
            ],
            "options": [
                {"name": "Лёгкая силовая", "benefit": "сохраняет тонус и чувствительность к нагрузке, но не усиливает ПМС через перегруз", "how": "30-40 мин, вес легче обычного, больше пауз, без отказных подходов"},
                {"name": "Быстрая ходьба", "benefit": "помогает отёкам, тревожности и сну за счёт мягкого кардио без скачка стресса", "how": "30-40 мин ровно, дыхание активное, но контролируемое"},
                {"name": "Плавание, йога или пилатес", "benefit": "разгружает спину и живот, снижает напряжение перед месячными", "how": "25-40 мин, без гонки за результатом и без боли"},
            ],
            "avoid": "тяжёлые веса, длинное интенсивное кардио, тренировки на голодный желудок",
            "recovery": "магний и B6 из еды, углеводы до тренировки, сон и снижение стресса"
        }
    }.get(phase)
    if not base:
        base = {
            "level": "Умеренно",
            "duration": "20-40 мин",
            "summary": "Ориентируйся на самочувствие.",
            "why": "Если цикл сейчас не отслеживается, безопаснее опираться на сон, боль, уровень энергии, кровотечение и общее состояние. Цель: нагрузка должна улучшать состояние после тренировки, а не добивать.",
            "hormones": [
                "Без данных о цикле Айва не делает выводы о фазе.",
                "Главные ориентиры: боль, кровотечение, слабость, сон и восстановление.",
                "При беременности, сильной боли, головокружении или обильном кровотечении нагрузку лучше обсудить с врачом."
            ],
            "options": [
                {"name": "Ходьба", "benefit": "мягко поддерживает энергию и сон без перегруза", "how": "20-30 мин в комфортном темпе"},
                {"name": "Растяжка", "benefit": "снимает напряжение в спине, шее и тазу", "how": "10-15 мин, без боли и рывков"},
                {"name": "Лёгкая силовая", "benefit": "поддерживает тонус мышц, если нет слабости и боли", "how": "20-30 мин, лёгкий вес, запас 2-3 повтора"},
            ],
            "avoid": "нагрузку через боль",
            "recovery": "сон, вода, регулярная еда"
        }
    if phase == "luteal" and sub == "поздняя":
        base = dict(base)
        base["level"] = "Спокойнее обычного"
        base["duration"] = "20-40 мин"
        base["summary"] = "Если месячные близко, нагрузку лучше снизить."
        base["why"] += " В поздней лютеиновой фазе перед месячными нагрузку лучше снижать сильнее."
        base["options"] = [
            {"name": "Прогулка", "benefit": "уменьшает отёки, тревожность и напряжение без лишнего стресса для тела", "how": "30-40 мин в темпе, при котором можно спокойно говорить"},
            {"name": "Пилатес", "benefit": "поддерживает тонус корпуса и таза без перегруза перед месячными", "how": "25-35 мин спокойно, без упражнений через боль"},
            {"name": "Растяжка", "benefit": "расслабляет спину, таз и заднюю поверхность бедра, где часто накапливается напряжение", "how": "15-20 мин, медленно, с ровным дыханием"},
        ]
    if phase == "menstrual" and day and day <= 2:
        base = dict(base)
        base["level"] = "Очень мягкая"
        base["duration"] = "10-20 мин"
    return {
        "title": f"{base['level']} нагрузка",
        "level": base["level"],
        "duration": base["duration"],
        "summary": base["summary"],
        "phase": st.get("phase_ru", ""),
        "day": day,
        "cycle_len": cycle_len,
        "days_to_next": left,
        "why": base["why"],
        "hormones": base.get("hormones", []),
        "options": base["options"],
        "avoid": base["avoid"],
        "reduce": base["avoid"],
        "recovery": base["recovery"],
    }

def training_text(st, profile=None):
    p = training_plan(st, profile)
    lines = [
        f"🏋️ Нагрузка сегодня: {p['level'].lower()}, {p['duration']}",
        f"День {p['day']} из {p['cycle_len']}, {st['subphase']} {st['phase_ru'].lower()} фаза.",
        p["summary"],
        "",
        "**Гормоны и физиология**",
    ]
    for h in p.get("hormones", []):
        lines.append(f"• {h}")
    lines += [
        "",
        "**Почему так**",
        p["why"],
        "",
        "**Что выбрать**",
    ]
    for o in p["options"]:
        lines.append(f"• {o['name']}: {o['benefit']}. Как: {o['how']}.")
    lines += ["", "**Чего избегать**", f"• {p['avoid']}", "", "**Восстановление**", f"• {p['recovery']}"]
    lines.append("")
    lines.append("СЛЕДУЮЩИЕ: А если мало сил? ;; Что после тренировки?")
    return "\n".join(lines)

def training_review(workout, recent=None, phase_ru=None, mode=None, profile=None, usage=None):
    """Разбор тренировки: разбор + что добавить + следующая нагрузка (учёт истории, восстановления, фазы)."""
    def _items(w):
        out = []
        for it in (w.get("items") or []):
            nm = (it.get("name") or "").strip()
            if not nm: continue
            extra = []
            if it.get("weight"): extra.append(str(it.get("weight")) + " кг")
            if it.get("sets"): extra.append(str(it.get("sets")) + "x" + (str(it.get("reps")) if it.get("reps") else "?"))
            out.append(nm + ((" " + " ".join(extra)) if extra else ""))
        return ", ".join(out)
    today_items = _items(workout) or "без деталей"
    hist_lines = []
    for w in (recent or [])[:6]:
        it = ", ".join((i.get("name") or "") for i in (w.get("items") or []) if i.get("name"))
        hist_lines.append((w.get("d","") or "") + ": " + (w.get("type","") or "") + ((" (" + it + ")") if it else ""))
    hist = "; ".join(hist_lines) or "нет записей"
    ctx = []
    if phase_ru: ctx.append("Фаза цикла сейчас: " + str(phase_ru) + ".")
    if mode and mode != "cycle": ctx.append("Режим: " + str(mode) + " (цикл не отслеживается, опирайся на самочувствие).")
    prof = profile if isinstance(profile, dict) else {}
    pr = "; ".join(str(k) + ": " + str(v) for k, v in prof.items() if v)
    if pr: ctx.append("Профиль тренировок: " + pr + ".")
    if workout.get("muscles"): ctx.append("Основные группы мышц: " + str(workout.get("muscles")) + ".")
    if workout.get("kcal"): ctx.append("Оценка сожжённых калорий: около " + str(workout.get("kcal")) + " ккал.")
    parts = [
        "Пользователь только что отметила тренировку.",
        "Сегодня: " + (workout.get("type","") or "") + " - " + today_items + " - " + (workout.get("duration","") or "") + " - ощущение: " + (workout.get("rpe","") or "") + ".",
        "Недавние тренировки (свежие сверху): " + hist + ".",
        " ".join(ctx),
        "Ответь обычным текстом, без markdown и звёздочек, тремя короткими блоками, каждый с новой строки и с указанной подписи в начале:",
        "Разбор: 1-2 предложения, как эта нагрузка ложится на фазу цикла и недавнюю историю, поддерживающе.",
        "Что добавить: 1 предложение - какой группы мышц или элемента не хватает на этой неделе.",
        "Следующая нагрузка: 1-2 предложения, конкретно что сделать в следующий раз, обязательно с учётом восстановления (после тяжёлой силовой - восстановление или другая группа, не то же самое) и без повторов изо дня в день.",
    ]
    user = "\n".join(x for x in parts if x)
    sys = "Ты AIWA - тёплый и точный ассистент по женскому здоровью и тренировкам. Пиши по-русски, обычным текстом, без markdown, без звёздочек и списков, без приветствий."
    out = _call([{"role": "system", "content": sys}, {"role": "user", "content": user}], max_tokens=600, temperature=0.6, usage=usage)
    return (out or "").strip()

def _parse_str_list(out, n=3):
    if not out: return []
    arr = None
    try:
        arr = json.loads(out[out.find("["):out.rfind("]") + 1])
    except Exception:
        arr = [re.sub(r"^[\-\*•\d\.\)\s\"]+", "", l).strip().strip('"').strip()
               for l in (out or "").splitlines() if l.strip()]
    res = []
    for x in (arr or []):
        if isinstance(x, str):
            x = _norm_sugg1(x, ensure_q=True)        # заглавная буква, «?» в конце, без «вопрос:»
            if x and x not in res:
                res.append(x)
    return res[:n]


def _train_ctx(st, mode, profile, pregnancy=None, checkin=None):
    if st:
        base = (f"Сегодня день {st['day']} из {st['cycle_len']}, {st.get('subphase','')} "
                f"{st['phase_ru'].lower()} фаза, до месячных ~{st['days_to_next']} дн.")
    else:
        mm = {"meno": "менопауза (цикл не отслеживается)", "preg": "беременность",
              "irregular": "нерегулярный цикл", "none": "месячных сейчас нет"}.get(mode, "цикл не отслеживается")
        base = f"Режим: {mm}. Опирайся на самочувствие, сон, боль и энергию, без жёсткой привязки к фазе."
    bits = []
    if profile:
        if profile.get("age"): bits.append(f"возраст {profile['age']}")
        a = _ACT.get(profile.get("activity"))
        if a: bits.append(f"обычная активность {a}")
    if bits:
        base += " Пользовательница: " + ", ".join(bits) + "."
    if mode == "preg" and pregnancy:
        base += (f" Акушерский срок: примерно {pregnancy.get('week')} недель, "
                 f"{pregnancy.get('trimester')} триместр.")
    if checkin:
        energy = checkin.get("energy")
        symptoms = ", ".join(checkin.get("symptoms") or [])
        if energy:
            base += f" Энергия по чек-ину: {energy} из 3."
        if symptoms:
            base += " Отмеченные симптомы: " + symptoms + "."
    return base


def training_today(st, profile=None, recent=None, mode=None, usage=None, pregnancy=None, checkin=None):
    """Динамическая рекомендация по нагрузке от модели: меняется день ото дня и учитывает недавние тренировки."""
    if mode == "preg" and checkin:
        symptoms = set(checkin.get("symptoms") or [])
        if checkin.get("energy") == 1 or symptoms.intersection({"preg_cramp", "preg_swelling"}):
            return {
                "title": "Пауза и самочувствие",
                "level": "Без интенсивной нагрузки",
                "duration": "по самочувствию",
                "summary": "Сегодня не планируй интенсивную тренировку. Отдохни или выбери только спокойную прогулку, если она комфортна.",
                "why": "При низкой энергии, тянущей боли или отёках сначала важно оценить самочувствие. Если симптом новый, сильный или нарастает, свяжись со своим врачом.",
                "phase": "", "day": "", "cycle_len": "",
                "options": [
                    {"name": "Отдых", "benefit": "не добавляет нагрузку при плохом самочувствии",
                     "how": "вернись к активности после улучшения и с учётом рекомендаций врача"},
                    {"name": "Спокойная прогулка", "benefit": "поддерживает мягкое движение",
                     "how": "только если комфортно, без одышки, боли и перегрева"},
                ],
                "suggestions": ["Когда связаться с врачом?", "Как вернуться к нагрузке?"],
            }
    ctx = _train_ctx(st, mode, profile, pregnancy=pregnancy, checkin=checkin)
    rec = ""
    if recent:
        rec = (" Недавние тренировки (свежие сверху): " + recent +
               ". Не предлагай то же самое подряд, чередуй нагрузку и группы мышц, учитывай восстановление.")
    prompt = (
        "Ты тренер и физиолог женского здоровья. Составь рекомендацию по физической нагрузке на СЕГОДНЯ лично для неё. "
        + ctx + rec +
        " Ответ должен быть живым и разным день ото дня, без шаблонных повторов. Строго JSON без обрамления:\n"
        '{"level":"2-4 слова, напр. Силовая, можно активнее",'
        '"duration":"диапазон, напр. 35-50 мин",'
        '"summary":"1-2 живых предложения: что делать сегодня и ради чего",'
        '"why":"2-3 предложения простыми словами: физиология именно сегодня — фаза, гормоны или самочувствие",'
        '"options":[{"name":"короткое название","benefit":"чем полезно именно ей сегодня","how":"как делать: время, подходы или темп"}],'
        '"suggestions":["три РАЗНЫХ саджеста про нагрузку, восстановление или технику"]}\n' + SUGG_RULES + '\n'
        "В options 2-3 конкретных варианта. Только обычная доступная активность. По-русски, без markdown."
    )
    if mode == "preg":
        prompt += (
            " Для беременности учитывай указанный триместр и чек-ин. Не предлагай контактный спорт, "
            "риск падения, перегрев, задержку дыхания, тренировку через боль или новые упражнения высокой интенсивности. "
            "Не обещай медицинский эффект и напомни остановиться при боли, кровотечении, головокружении или ухудшении самочувствия."
        )
    out = _call([{"role": "system", "content": "Ты тренер femtech-приложения. Отвечай строго JSON, по-русски, без markdown."},
                 {"role": "user", "content": prompt}], max_tokens=1100, temperature=0.6, usage=usage)
    data = None
    if out:
        try:
            data = json.loads(out[out.find("{"):out.rfind("}") + 1])
        except Exception:
            data = None
    base = training_plan(st, profile) if st else general_training(profile, mode)
    if not isinstance(data, dict):
        return dict(base, _fallback="training_plan")
    opts = [o for o in (data.get("options") or []) if isinstance(o, dict) and o.get("name")]
    if len(opts) < 2 or not (data.get("summary") or "").strip():
        return dict(base, _fallback="training_plan")
    sugg = _parse_str_list(json.dumps(data.get("suggestions") or [], ensure_ascii=False), 3)
    return {
        "title": (data.get("level") or base.get("level", "")) + " нагрузка",
        "level": data.get("level") or base.get("level", ""),
        "duration": data.get("duration") or base.get("duration", ""),
        "summary": (data.get("summary") or base.get("summary", "")).strip(),
        "why": (data.get("why") or base.get("why", "")).strip(),
        "phase": (st.get("phase_ru", "") if st else ""),
        "day": (st.get("day", "") if st else ""),
        "cycle_len": (st.get("cycle_len", "") if st else ""),
        "options": [{"name": o.get("name", ""), "benefit": o.get("benefit", ""),
                     "how": o.get("how") or o.get("detail", "")} for o in opts[:3]],
        "suggestions": sugg,
    }


def food_suggestions(dishes, ctx="", usage=None):
    """3 коротких интересных контекстных вопроса про сегодняшнее меню — от модели."""
    dl = ", ".join([d for d in (dishes or []) if d][:4]) or "обычные блюда"
    prompt = ("Сегодняшнее меню: " + dl + ". " + (ctx or "") +
              " Придумай 3 КОРОТКИХ, интересных и РАЗНЫХ вопроса от лица женщины к ассистенту по женскому здоровью. "
              "Каждый до 40 знаков, про пользу конкретного продукта из меню в её состоянии/фазе, необычный факт или удачную замену. "
              "Живо, не шаблонно, без слова «рецепт». Пример стиля: «польза миндаля при ПМС», «чем заменить рис вечером», «почему тянет на сладкое». "
              "Ответь строго JSON-массивом из 3 строк, по-русски.")
    out = _call([{"role": "system", "content": "Ты ассистент femtech-приложения. Отвечай строго JSON-массивом строк, по-русски."},
                 {"role": "user", "content": prompt}], max_tokens=350, temperature=0.85, usage=usage)
    return _parse_str_list(out, 3)


def today_note(st, profile=None, recent_syms=None, mode=None, usage=None):
    """Короткая персональная сводка на «Сегодня» + подсказки — от модели."""
    ctx = _train_ctx(st, mode, profile)
    sy = (" Сегодня отмечено: " + recent_syms + ".") if recent_syms else ""
    prompt = ("Ты точный ассистент по женскому здоровью. " + ctx + sy +
              " Напиши короткую персональную сводку на сегодня: 2-3 предложения о том, как её тело сегодня "
              "и что это значит для энергии и самочувствия, с одним практичным действием. " + TOV + " "
              "И 3 разных саджеста — только про тело, цикл, фазу, питание, нагрузку, сон или самочувствие (не продуктивность и не быт). " + SUGG_RULES + " Строго JSON без обрамления: "
              '{"summary":"...","suggestions":["...","...","..."]}. По-русски, без markdown.')
    out = _call([{"role": "system", "content": "Ты ассистент femtech-приложения. Отвечай строго JSON, по-русски, без markdown."},
                 {"role": "user", "content": prompt}], max_tokens=600, temperature=0.55, usage=usage)
    data = None
    if out:
        try:
            data = json.loads(out[out.find("{"):out.rfind("}") + 1])
        except Exception:
            data = None
    if not isinstance(data, dict):
        return {"summary": "", "suggestions": []}
    sugg = _parse_str_list(json.dumps(data.get("suggestions") or [], ensure_ascii=False), 3)
    return {"summary": (data.get("summary") or "").strip(), "suggestions": sugg}


def proactive_compose(topic, data_note, usage=None):
    """Короткое проактивное сообщение (Айва пишет первой) по выбранному сигналу и данным пользовательницы."""
    prompt = ("Ты AIWA — тёплый и точный ассистент по женскому здоровью. Составь ОДНО короткое проактивное сообщение "
              "пользовательнице (ты пишешь ей первой) по теме: " + (topic or "поддержка") + ". "
              "Её актуальные данные: " + (data_note or "нет") + ". "
              "Сделай личным и конкретным (используй данные), по делу, максимум 300 знаков; ОБЯЗАТЕЛЬНО заверши последнюю мысль, не обрывай фразу. " + TOV + " Заверши мягким приглашением открыть Айву, где это можно сделать прямо сейчас (например: открой Айву — соберём тренировку под твою фазу; загляни в меню в Айве; включим короткую практику в приложении). НЕ обещай, что сделаешь что-то сама автоматически, и не задавай общих вопросов вроде как самочувствие сегодня и не пиши как тебе такая идея. "
              "Без markdown, без длинных тире, по-русски, без приветствия если это не первое сообщение дня.")
    out = _call([{"role": "system", "content": "Ты AIWA. Пиши коротко, тепло, по-русски, без markdown."},
                 {"role": "user", "content": prompt}], max_tokens=400, temperature=0.6, usage=usage)
    return _ensure_complete(_clean(out, ""))


def memory_extract(user_msg, ai_msg, existing="", usage=None):
    """Выделяет из реплики устойчивые факты о пользовательнице для долгой памяти.
    Возвращает список dict {key, value} (может быть пустым)."""
    prompt = ("Ты ведёшь долгую память ассистента по женскому здоровью. Из ДИАЛОГА ниже выдели устойчивые, "
              "полезные надолго факты о пользовательнице: цели, предпочтения (еда, тренировки), что ей НЕ подходит "
              "или что плохо переносит, ограничения/диагнозы, привычки, важные обстоятельства жизни. "
              "НЕ сохраняй: сиюминутное настроение, разовые события, вопросы, общеизвестное, то что уже есть в памяти. "
              "Уже в памяти: " + (existing or "пусто") + ". "
              "Реплика пользовательницы: " + (user_msg or "") + " || Ответ ассистента: " + (ai_msg or "") + ". "
              "Верни СТРОГО JSON-массив, максимум 3 элемента, каждый вида {\"key\":\"короткий ярлык\",\"value\":\"факт кратко\"}. "
              "Если сохранять нечего — верни []. Только JSON, без пояснений.")
    out = _call([{"role": "system", "content": "Ты извлекаешь факты. Отвечай только валидным JSON-массивом."},
                 {"role": "user", "content": prompt}], max_tokens=240, temperature=0.1, usage=usage)
    if not out:
        return []
    try:
        m = re.search(r"\[.*\]", out, re.S)
        arr = json.loads(m.group(0)) if m else []
    except Exception:
        return []
    res = []
    if isinstance(arr, list):
        for it in arr:
            if isinstance(it, dict) and it.get("key") and it.get("value"):
                res.append({"key": str(it["key"]).strip()[:48], "value": str(it["value"]).strip()[:220]})
    return res[:3]


def explain_section(st, key, usage=None):
    if key == "training":
        plan = training_plan(st)
        prompt = (
            f"Данные: {_ctx(st)}\n"
            f"Проверенный базовый план нагрузки: {json.dumps(plan, ensure_ascii=False)}\n\n"
            "Собери персональный ответ про нагрузку на сегодня. Не меняй точный день цикла и не противоречь "
            "базовому уровню нагрузки. Объясни связь с гормонами и самочувствием, дай 2-3 конкретных варианта "
            "с длительностью, отдельно коротко укажи, чего сегодня избегать и как восстановиться. "
            "Не добавляй питание, если оно не нужно для восстановления. " + FMT_TG + " " + TOV +
            "\nВ самом конце добавь строку: СЛЕДУЮЩИЕ: вопрос ;; вопрос — два коротких продолжения строго про эту нагрузку."
        )
        out = _call(
            [{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}],
            max_tokens=750,
            temperature=0.35,
            usage=usage,
        )
        return _clean(out, training_text(st))
    base = (f"Её фаза: {st['subphase']} {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}, "
            f"до месячных ~{st['days_to_next']} дн.")
    if key == "food":
        q = ("Ответь КОМПАКТНО, без воды. Сначала 2 предложения, почему эти нутриенты важны в эту под-фазу. "
             "Затем 4 продукта строками списка «- продукт: зачем». Затем одна строка с идеей завтрака, обеда и ужина. Начни строкой «🍽 Питание сегодня».")
    else:
        return section_text(st, key)
    msgs = [{"role": "system", "content": SYSTEM},
            {"role": "user", "content": base + "\n\n" + q + " Развёрнуто и конкретно, с числами где уместно, но без воды. Только обычный текст без markdown. "
            "В самом конце добавь отдельной строкой ровно так: СЛЕДУЮЩИЕ: <текст> ;; <текст> — два релевантных саджеста. " + SUGG_RULES + "\n"}]
    out = _call(msgs, max_tokens=750, temperature=0.4, usage=usage)
    return _clean(out, _section_fallback(st, key))

def _section_fallback(st, key):
    c = st["content"]
    head = "🍽 Питание сегодня" if key == "food" else "🏋️ Нагрузка сегодня"
    body = c["food"] if key == "food" else c["training"]
    return (f"{head}, день {st['day']} из {st['cycle_len']}, {st['subphase']} {st['phase_ru'].lower()} фаза.\n"
            f"{body}\n\nПереспроси, и я соберу подробный разбор по этой фазе.")


def followups(st, basis_q, basis_a, usage=None):
    """Relevant fallback suggestions when the model omitted its own.

    Topic relevance is more important than always filling two buttons.  The old
    implementation ignored ``basis_q``/``basis_a`` and sampled by cycle phase,
    so an answer about dietary fats could end with buttons about energy and
    training.
    """
    question = str(basis_q or "").lower()
    answer = str(basis_a or "").lower()
    topics = (
        (r"жир|масл|омега|авокад|орех", ["Какие жиры выбрать?", "Сколько орехов в день?"]),
        (r"белок|протеин|творог|мяс|рыб|яйц", ["Сколько нужно белка?", "Какие источники лучше?"]),
        (r"углевод|сахар|сладк|круп|хлеб", ["Какие углеводы выбрать?", "Как снизить тягу?"]),
        (r"калори|ккал|дефицит|вес", ["Какая моя норма?", "Как собрать меню?"]),
        (r"питани|ед[ауы]|продукт|меню|завтрак|обед|ужин", ["Что съесть сегодня?", "Как собрать меню?"]),
        (r"тренир|нагруз|спорт|кардио|силов|упражнен", ["Какая нагрузка подойдёт?", "Как восстановиться?"]),
        (r"сон|спать|бессон", ["Как улучшить сон?", "Что мешает засыпать?"]),
        (r"овуляц|фертиль", ["Когда фертильное окно?", "Как понять овуляцию?"]),
        (r"пмс|месячн|цикл|фаз|задерж", ["Что сейчас с циклом?", "Когда ждать месячные?"]),
        (r"беремен|триместр|недел", ["Что важно на сроке?", "Какие симптомы допустимы?"]),
        (r"менопауз|прилив|мгт", ["Как уменьшить приливы?", "Какие чекапы нужны?"]),
    )
    ranked = []
    for order, (pattern, suggestions) in enumerate(topics):
        q_hits = len(re.findall(pattern, question))
        a_hits = len(re.findall(pattern, answer))
        score = q_hits * 5 + min(a_hits, 3)
        if score:
            ranked.append((score, -order, suggestions))
    return max(ranked)[2] if ranked else []


def _static(st):
    phase = st.get("phase") if isinstance(st, dict) else None
    S = {"menstrual": ["Почему мало сил?", "Что есть при месячных?", "Можно ли тренироваться?", "Как уменьшить боль внизу живота?", "Сколько в норме длятся месячные?", "Что делать при сильной усталости?"],
         "follicular": ["Почему много энергии?", "Что есть сейчас?", "Какая тренировка лучше?", "Когда фертильное окно?", "Как использовать прилив сил?", "Что с кожей в эту фазу?"],
         "ovulation": ["Почему пик энергии?", "Что есть в овуляцию?", "Можно интенсивнее?", "Как понять, что овуляция?", "Это самые фертильные дни?", "Почему повышено либидо?"],
         "luteal": ["Почему тянет на сладкое?", "Что съесть вечером?", "Когда начнутся месячные?", "Как пережить ПМС?", "Почему отёки и вздутие?", "Какая нагрузка перед месячными?"]}
    GEN = ["Что съесть сегодня?", "Какая нагрузка подойдёт?", "Как поднять энергию?", "Как улучшить сон?", "Что важно в моём возрасте?", "Как снизить стресс?"]
    return [("", t) for t in (S.get(phase) or GEN)]


def partner_brief(st, hint=None, usage=None):
    h = f" Сегодня она отмечала: {hint}." if hint else ""
    prompt = (f"Её цикл: день {st['day']} из {st['cycle_len']}, {st['subphase']} {st['phase_ru'].lower()} фаза, "
              f"до месячных примерно {st['days_to_next']} дн.{h}\n\n"
              "Напиши ежедневный апдейт для её партнёра (парня). Цель: чтобы ему было понятно, что с ней может происходить, "
              "как поддержать без навязчивости, что предложить из еды/быта и почему это связано с гормонами. "
              "Тон: взрослый, тёплый, не сюсюкать, без стыда и без медицинского занудства. "
              "Строго такая структура, каждый блок с заголовком «### эмодзи название» на отдельной строке, пункты — строки с «- »:\n"
              "### 💛 Что с ней сегодня\n"
              "- 2 пункта: день цикла, ведущие гормоны, возможное самочувствие.\n"
              "### 🤝 Как поддержать\n"
              "- 3 конкретных действия: что сказать, что сделать, чего не требовать.\n"
              "### 🍽 Что предложить\n"
              "- 2-3 доступные идеи еды/напитков под фазу и симптомы, без сложных рецептов.\n"
              "### 🧠 Факт дня\n"
              "- Настоящий интересный факт о женском здоровье, гормонах, цикле или ПМС в кавычках «...». Не копируй текст задания.\n"
              "### 📌 На что обратить внимание\n"
              "- 1 короткий пункт про тревожные симптомы или мягкое наблюдение, без диагнозов.\n"
              "Объём 900-1300 знаков. Только русский, без длинных тире. " + TOV)
    out = _call([{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}], max_tokens=1200, temperature=0.45, usage=usage)
    return _ensure_complete(_clean(out, None)) if out else None

def partner_answer(st, question, hint=None, usage=None):
    h = f" Сегодня она отмечала: {hint}." if hint else ""
    msgs = [{"role": "system", "content": SYSTEM},
            {"role": "user", "content": (f"К тебе обращается ПАРТНЁР женщины (её парень). Она сейчас: день {st['day']} из {st['cycle_len']}, "
             f"{st['subphase']} {st['phase_ru'].lower()} фаза, до месячных примерно {st['days_to_next']} дн.{h}\n\n"
             "Ответь на его вопрос конкретно и тепло: как именно ей помочь и поддержать с учётом фазы, какие действия и что можно купить. "
             "Дай короткое объяснение через гормоны или физиологию, чтобы ему было интересно и понятно, но не перегружай. "
             "Если уместно, добавь строку «🧠 Факт: ...» с одним полезным фактом о цикле, ПМС, овуляции, прогестероне, эстрогене или самочувствии. "
             "Без воды, только русский, без markdown, без длинных тире. Вопрос: " + question)}]
    out = _call(msgs, max_tokens=950, temperature=0.38, usage=usage)
    return _clean(out, "Поддержи её вниманием и заботой, спроси, чего ей сейчас хочется.")

def partner_preg_brief(preg, hint=None, usage=None):
    h = f" Сегодня она отмечала: {hint}." if hint else ""
    prompt = (f"Срок её беременности: примерно {preg.get('week')} нед {preg.get('day')} дн, {preg.get('trimester')} триместр, "
              f"до ПДР ~{max(0, preg.get('days_left', 0))} дн.{h}\n\n"
              "Напиши ежедневный апдейт для её партнёра (парня). Цель: понять, что происходит с ней и малышом на этом сроке, "
              "как поддержать и что предложить. Структура: каждый блок с заголовком «### эмодзи название», пункты — строки с «- »:\n"
              "### 💛 Что с ней сейчас\n- 2 пункта: что типично для этого срока (самочувствие, тело).\n"
              "### 👶 Малыш на этой неделе\n- 1-2 пункта: размер и что развивается, без выдумок.\n"
              "### 🤝 Как поддержать\n- 3 конкретных действия.\n"
              "### 🍽 Что предложить\n- 2-3 идеи еды/напитков, безопасные при беременности.\n"
              "### 📌 На что обратить внимание\n- 1 пункт: когда стоит связаться с врачом, без запугивания.\n"
              "Объём 900-1300 знаков. Только русский, без длинных тире. " + TOV)
    out = _call([{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}], max_tokens=1200, temperature=0.45, usage=usage)
    return _ensure_complete(_clean(out, None)) if out else None

def partner_preg_answer(preg, question, hint=None, usage=None):
    h = f" Сегодня она отмечала: {hint}." if hint else ""
    msgs = [{"role": "system", "content": SYSTEM},
            {"role": "user", "content": (
             f"К тебе обращается ПАРТНЁР беременной женщины. Её срок: примерно {preg.get('week')} нед {preg.get('day')} дн, "
             f"{preg.get('trimester')} триместр, ПДР {preg.get('due')}, до родов примерно {preg.get('days_left')} дн.{h}\n\n"
             "Ответь на его вопрос конкретно и тепло: как ей помочь, что можно купить или сделать, что важно по самочувствию. "
             "Дай медицинское объяснение простыми словами: гормоны, нагрузка на сосуды, объём крови, сон, ЖКТ, таз/спина, в зависимости от вопроса и триместра. "
             "Если вопрос про тревожные симптомы, аккуратно направь к врачу. "
             "Добавь строку «🧠 Факт: ...» с одним фактологичным фактом о беременности, сроке, ПДР или развитии плода. "
             "Без воды, без markdown, без длинных тире, только русский. Уложись в 1200-1800 знаков и заверши мысль. Вопрос: " + question)}]
    out = _call(msgs, max_tokens=750, temperature=0.35, usage=usage)
    return _clean(out, "Спроси, что ей сейчас облегчить: еду, воду, сон, прогулку, аптеку или тишину. Если есть тревожные симптомы, лучше связаться с врачом.")

DIET_RU = {"veg": "вегетарианство", "vegan": "веган", "nolac": "без лактозы", "noglu": "без глютена", "nonuts": "без орехов", "pesc": "пескетарианство, из мяса только рыба"}
MODE_RU = {"irregular": "нерегулярный цикл", "none": "сейчас нет месячных (аменорея)", "meno": "менопауза или постменопауза", "preg": "беременность (давай рекомендации с учётом беременности, безопасные при гестации, без потенциально вредных продуктов и нагрузок)", "long": "длинный цикл (более 40 дней)"}
def _age_band(age):
    a = age or 0
    if a >= 55: return "постменопауза"
    if a >= 45: return "перименопауза, 45+"
    if a >= 40: return "40+"
    if a > 0: return "репродуктивный возраст"
    return "возраст не указан"

def _gen_ctx(profile, mode):
    band = _age_band(profile.get("age") if profile else None)
    age = (profile.get("age") if profile else None) or "не указан"
    diet = ""
    parts = [DIET_RU.get(x, x) for x in (profile.get("diet").split(",") if profile and profile.get("diet") else []) if x]
    if profile and profile.get("diet_note"): parts.append(profile["diet_note"])
    if parts: diet = f" Пищевые ограничения: {', '.join(parts)}."
    return f"Режим без отслеживания фазы цикла: {MODE_RU.get(mode, mode)}. Возраст примерно {age} ({band}).{diet}"

def general_summary(profile, mode, hint=None, usage=None):
    h = f" {hint}." if hint else ""
    prompt = (_gen_ctx(profile, mode) + h + "\n\n"
        "Дай короткую утреннюю wellness-сводку БЕЗ привязки к фазе цикла, блоками с эмодзи-заголовками, каждый блок 1-2 пункта:\n"
        "💛 Самочувствие и энергия\n🍽 Питание (под возраст)\n🏋️ Движение\n📌 На что обратить внимание по возрасту\n"
        "Если это аменорея в репродуктивном возрасте, мягко напомни: отсутствие месячных дольше 3 месяцев стоит обсудить с гинекологом (причины: стресс, вес, спорт, щитовидная железа, СПКЯ). "
        "Если перименопауза или менопауза, объясни, что происходит с гормонами (снижение эстрогена и прогестерона) и к чему это ведёт (приливы, сон, настроение, кости, сердце). Расскажи про варианты: менопаузальная гормональная терапия (МГТ) для замещения эстрогена под контролем гинеколога-эндокринолога, негормональные методы и образ жизни (кальций, витамин D, белок, движение, сон). Конкретные препараты и дозы не назначай, советуй подбор с врачом. "
        "Конкретно, без воды, только русский. " + FMT_TG + " " + SUMMARY_LEN + " " + TOV)
    out = _call([{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}], max_tokens=1000, temperature=0.3, usage=usage)
    return _ensure_complete(_clean(out, None)) if out else None


# The model personalizes a card by choosing identifiers, never by placing
# arbitrary medical copy or numbers onto the image. Every rendered sentence
# therefore comes from this small reviewed catalogue.
SUMMARY_CARD_FACTS = {
    "cycle_common": {
        "check_in": "Сверяй нагрузку с самочувствием, а не только с прогнозом",
        "sleep": "Оставь достаточно времени на сон и восстановление",
        "food": "Собери регулярные приёмы пищи с белком и клетчаткой",
        "water": "Держи воду рядом и пей по ощущениям в течение дня",
        "pain": "Не тренируйся через боль или заметное ухудшение самочувствия",
    },
    "menstrual": {
        "gentle": "При боли выбирай отдых или спокойное движение",
        "iron_food": "Добавь привычные продукты с железом и белком",
    },
    "follicular": {
        "gradual": "Если энергии больше, повышай нагрузку постепенно",
        "routine": "Используй хороший ресурс для привычной активности",
    },
    "ovulation": {
        "contraception": "Не используй прогноз овуляции как метод контрацепции",
        "steady": "Сохраняй привычную технику даже при хорошем самочувствии",
    },
    "luteal": {
        "recovery": "Если энергии меньше, оставь больше времени на восстановление",
        "regular_food": "Регулярная еда часто помогает избежать резкого голода",
    },
    "preg": {
        "doctor": "Ориентируйся на самочувствие и рекомендации своего врача",
        "movement": "Выбирай привычное спокойное движение без перегрузки",
        "rest": "Чередуй повседневную активность с коротким отдыхом",
        "food": "Собирай регулярные приёмы пищи с белком и клетчаткой",
        "symptoms": "При новых или сильных симптомах свяжись с врачом",
        "water": "Держи воду рядом и пей по ощущениям в течение дня",
    },
}

def summary_card_facts(mode, st=None, pregnancy=None, hint=None, usage=None):
    """Choose three safe catalogue facts through a constrained model call."""
    if mode == "cycle":
        phase = (st or {}).get("phase") or "cycle_common"
        allowed = dict(SUMMARY_CARD_FACTS["cycle_common"])
        allowed.update(SUMMARY_CARD_FACTS.get(phase, {}))
        preferred = {
            "menstrual": ["gentle", "iron_food", "sleep"],
            "follicular": ["gradual", "routine", "check_in"],
            "ovulation": ["steady", "contraception", "check_in"],
            "luteal": ["recovery", "regular_food", "sleep"],
        }.get(phase, ["check_in", "sleep", "food"])
        context = f"Режим: цикл; прогнозируемая фаза: {phase}."
    elif mode == "preg":
        allowed = dict(SUMMARY_CARD_FACTS["preg"])
        preferred = ["doctor", "movement", "symptoms"]
        tri = (pregnancy or {}).get("trimester")
        context = f"Режим: беременность; триместр: {tri or 'не указан'}."
    else:
        return []
    if hint:
        context += " Чек-ин: " + str(hint)[:240]
    prompt = (
        context + "\n"
        "Выбери ровно три наиболее уместных идентификатора для короткой карточки. "
        "Нельзя писать свой текст, числа, диагнозы или назначения. Верни только JSON "
        'вида {\"ids\":[\"id1\",\"id2\",\"id3\"]}. Доступные идентификаторы: ' +
        ", ".join(sorted(allowed))
    )
    out = _call(
        [{"role": "system", "content": "Ты выбираешь только идентификаторы из заданного списка и отвечаешь строгим JSON."},
         {"role": "user", "content": prompt}],
        max_tokens=80, temperature=0.15, usage=usage,
    )
    chosen = []
    try:
        raw = out or ""
        data = json.loads(raw[raw.find("{"):raw.rfind("}") + 1])
        for key in data.get("ids") or []:
            if key in allowed and key not in chosen:
                chosen.append(key)
    except Exception:
        pass
    for key in preferred:
        if key in allowed and key not in chosen:
            chosen.append(key)
        if len(chosen) >= 3:
            break
    return [allowed[key] for key in chosen[:3]]


def general_answer(profile, mode, question, hint=None, history=None, usage=None):
    h = f" {hint}." if hint else ""
    msgs = [{"role": "system", "content": SYSTEM + "\n\n" + _gen_ctx(profile, mode) + h + _history_note(history)}]
    msgs.append({"role": "user", "content": (
        "НОВЫЙ ВОПРОС, НА КОТОРЫЙ НУЖНО ОТВЕТИТЬ СЕЙЧАС:\n" + question + "\n\n"
        "Дай подробный, качественный ответ с медицинским обоснованием, простыми словами, с учётом возраста, режима и контекста диалога. "
        "Отвечай строго по заданному вопросу, без лишних разделов. Начни с уместного эмодзи, разбивай на части только там, где это нужно по теме. НЕ добавляй разделы про питание или нагрузку, если вопрос не про них. Конкретика (продукты, действия, числа) там, где уместно. "
        "Если уместно по возрасту или режиму, добавь, на что обратить внимание и когда к врачу. "
        "Не здоровайся, если пользовательница не поздоровалась прямо сейчас. Если есть история диалога, отвечай как продолжение и учитывай предыдущие реплики. "
        "Пиши живо и тепло, без воды. Будь ЛАКОНИЧНА: целевой объём 900-1500 знаков, ЖЁСТКИЙ предел 1900 знаков. Оставляй только суть по вопросу. Лучше короче и завершённо, чем длинно и оборванно — ОБЯЗАТЕЛЬНО заверши мысль. Только русский. " + FMT_TG + " "
        "ВАЖНО: у этого человека фаза цикла НЕ отслеживается, поэтому НЕ упоминай фазы менструального цикла (фолликулярную, лютеиновую, овуляторную, менструальную) и не привязывай советы к дню цикла. "
        "В самом конце добавь отдельной строкой ровно так: СЛЕДУЮЩИЕ: <текст> ;; <текст> — два релевантных саджеста. " + SUGG_RULES)})
    out = _call(msgs, max_tokens=1200, temperature=0.35, usage=usage)
    return _ensure_complete(_clean(out, "Я вижу вопрос, но модель сейчас не вернула ответ. Попробуй ещё раз через минуту."))

CURATED_MENU = {
    "menstrual": {"macros": {"protein": "100 г", "fat": "55 г", "carbs": "170 г"}, "meals": [
        {"time": "08:00", "dish": "Омлет из 3 яиц с сыром", "note": "белок и железо", "kcal": "380 ккал"},
        {"time": "13:00", "dish": "Говядина с гречкой и овощами", "note": "железо и B12", "kcal": "560 ккал"},
        {"time": "16:00", "dish": "Греческий йогурт с орехами", "note": "белок и магний", "kcal": "220 ккал"},
        {"time": "20:00", "dish": "Куриная грудка с тушёными овощами", "note": "лёгкий белок", "kcal": "450 ккал"}]},
    "follicular": {"macros": {"protein": "105 г", "fat": "55 г", "carbs": "190 г"}, "meals": [
        {"time": "08:00", "dish": "Омлет с овощами и сыром", "note": "белок и сытость", "kcal": "380 ккал"},
        {"time": "13:00", "dish": "Курица с рисом и салатом", "note": "белок и сложные углеводы", "kcal": "550 ккал"},
        {"time": "16:00", "dish": "Сыр и цельнозерновой хлеб", "note": "белок", "kcal": "220 ккал"},
        {"time": "20:00", "dish": "Запечённая рыба с картофелем", "note": "белок и омега-3", "kcal": "500 ккал"}]},
    "ovulation": {"macros": {"protein": "108 г", "fat": "55 г", "carbs": "185 г"}, "meals": [
        {"time": "08:00", "dish": "Яичница с сыром и помидорами", "note": "белок", "kcal": "380 ккал"},
        {"time": "13:00", "dish": "Запечённая рыба с гречкой", "note": "белок и омега-3", "kcal": "540 ккал"},
        {"time": "16:00", "dish": "Греческий йогурт с ягодами", "note": "белок", "kcal": "200 ккал"},
        {"time": "20:00", "dish": "Индейка с овощным салатом", "note": "лёгкий белок", "kcal": "470 ккал"}]},
    "luteal": {"macros": {"protein": "100 г", "fat": "60 г", "carbs": "175 г"}, "meals": [
        {"time": "08:00", "dish": "Омлет с сыром и зеленью", "note": "белок", "kcal": "380 ккал"},
        {"time": "13:00", "dish": "Говядина с картофелем и салатом", "note": "белок и сложные углеводы", "kcal": "560 ккал"},
        {"time": "16:00", "dish": "Горький шоколад 70% и орехи", "note": "магний при тяге к сладкому", "kcal": "210 ккал"},
        {"time": "20:00", "dish": "Лосось с овощами", "note": "омега-3 и B6", "kcal": "520 ккал"}]},
}
CURATED_MACROS = {
    "menstrual": {"protein": "100 г", "fat": "55 г", "carbs": "170 г"},
    "follicular": {"protein": "105 г", "fat": "55 г", "carbs": "190 г"},
    "ovulation": {"protein": "108 г", "fat": "55 г", "carbs": "185 г"},
    "luteal": {"protein": "100 г", "fat": "60 г", "carbs": "175 г"},
}
MEAL_POOLS = {
 "menstrual": {
  "b": [("Омлет из 3 яиц с сыром","белок и железо","380 ккал"),("Яичница с томатами и зеленью","белок","360 ккал"),("Омлет со шпинатом и сыром","железо и белок","370 ккал"),("Тост с яйцом и авокадо","белок и жиры","390 ккал")],
  "l": [("Говядина с гречкой и овощами","железо и B12","560 ккал"),("Печень с картофельным пюре","железо","540 ккал"),("Тушёная говядина с фасолью","железо и белок","550 ккал"),("Куриная печень с рисом и салатом","железо","520 ккал")],
  "s": [("Греческий йогурт с орехами","белок и магний","220 ккал"),("Сыр и цельнозерновой хлеб","белок","220 ккал"),("Хумус с овощами","магний и клетчатка","190 ккал"),("Миндаль и яблоко","клетчатка","200 ккал")],
  "d": [("Куриная грудка с тушёными овощами","лёгкий белок","450 ккал"),("Запечённая рыба с овощами","омега-3","460 ккал"),("Индейка с овощным рагу","белок","440 ккал"),("Чечевичный суп с курицей","железо и тепло","430 ккал")],
 },
 "follicular": {
  "b": [("Омлет с овощами и сыром","белок и сытость","380 ккал"),("Яичница с сыром и зеленью","белок","370 ккал"),("Тост с яйцом и авокадо","белок и жиры","390 ккал"),("Омлет с курицей и шпинатом","белок","400 ккал")],
  "l": [("Курица с рисом и салатом","белок и углеводы","550 ккал"),("Говядина с гречкой и овощами","белок","560 ккал"),("Индейка с картофелем и салатом","белок","540 ккал"),("Рыба с рисом и овощами","белок и омега-3","530 ккал")],
  "s": [("Сыр и цельнозерновой хлеб","белок","220 ккал"),("Греческий йогурт с ягодами","белок","200 ккал"),("Орехи и яблоко","жиры и клетчатка","200 ккал"),("Варёное яйцо и овощи","белок","180 ккал")],
  "d": [("Запечённая рыба с картофелем","белок и омега-3","500 ккал"),("Куриная грудка с овощами","белок","470 ккал"),("Индейка с овощным салатом","лёгкий белок","460 ккал"),("Говядина с тушёными овощами","белок","510 ккал")],
 },
 "ovulation": {
  "b": [("Яичница с сыром и помидорами","белок","380 ккал"),("Омлет с овощами","белок","370 ккал"),("Тост с яйцом и авокадо","белок и жиры","390 ккал"),("Яйца пашот со шпинатом","белок","360 ккал")],
  "l": [("Запечённая рыба с гречкой и овощами","белок и омега-3","540 ккал"),("Курица с рисом и брокколи","белок","530 ккал"),("Индейка с овощами и картофелем","белок","520 ккал"),("Говядина с салатом и овощами","белок","540 ккал")],
  "s": [("Греческий йогурт с ягодами","белок","200 ккал"),("Ягоды и орехи","антиоксиданты","200 ккал"),("Сыр и овощи","белок","190 ккал"),("Яблоко и миндаль","клетчатка","200 ккал")],
  "d": [("Индейка с овощным салатом","лёгкий белок","470 ккал"),("Рыба с овощами на пару","омега-3","460 ккал"),("Куриная грудка с зеленью","белок","450 ккал"),("Овощное рагу с курицей","белок","440 ккал")],
 },
 "luteal": {
  "b": [("Омлет с сыром и зеленью","белок","380 ккал"),("Яичница с овощами","белок","370 ккал"),("Тост с яйцом и авокадо","белок и жиры","390 ккал"),("Омлет со шпинатом","белок и магний","375 ккал")],
  "l": [("Говядина с картофелем и салатом","белок и углеводы","560 ккал"),("Индейка с гречкой и овощами","белок","540 ккал"),("Курица с рисом и овощами","белок","530 ккал"),("Рыба с картофелем и зеленью","омега-3","520 ккал")],
  "s": [("Горький шоколад 70% и орехи","магний при тяге к сладкому","210 ккал"),("Банан и миндаль","магний","200 ккал"),("Греческий йогурт с орехами","белок и магний","220 ккал"),("Тыквенные семечки и яблоко","магний","190 ккал")],
  "d": [("Лосось с овощами","омега-3 и B6","520 ккал"),("Индейка с тушёными овощами","белок","470 ккал"),("Рыба с овощным рагу","омега-3","480 ккал"),("Куриная грудка с салатом","белок","450 ккал")],
 },
}
def _kcal_num(s):
    m = re.search(r"\d+", str(s or ""))
    return int(m.group()) if m else 0

def _scale_menu(menu, target):
    """Подгоняет калории блюд и БЖУ дня под рассчитанную норму пользовательницы (target = (ккал, белок, жиры, углеводы)).
    Без этого меню из пулов/модели живёт своей жизнью и не сходится с нормой на экране."""
    if not (menu and target and target[0]):
        return menu
    meals = menu.get("meals") or []
    total = sum(_kcal_num(m.get("kcal")) for m in meals)
    if total:
        f = float(target[0]) / total
        if abs(f - 1) > 0.05:
            for m in meals:
                k = _kcal_num(m.get("kcal"))
                if k: m["kcal"] = "%d ккал" % (int(round(k * f / 10.0)) * 10)
    if len(target) >= 4 and target[1] and target[2] and target[3]:
        menu["macros"] = {"protein": "%d г" % round(target[1]), "fat": "%d г" % round(target[2]), "carbs": "%d г" % round(target[3])}
    return menu

def menu_today(st, profile=None, target=None, usage=None):
    # Без диет-ограничений отдаём готовый набор под фазу (без обращения к модели, экономим лимит).
    phase_key = (st or {}).get("phase")   # меню всегда генерит модель; пул блюд остался только аварийным фолбэком
    extra = ""
    if target:
        extra += (f" Ориентир по дню: примерно {target[0]} ккал, белок {target[1]} г, жиры {target[2]} г, "
                  f"углеводы {target[3]} г, распредели по приёмам.")
    parts = [DIET_RU.get(x, x) for x in (profile.get("diet").split(",") if profile and profile.get("diet") else []) if x]
    if profile and profile.get("diet_note"): parts.append(profile["diet_note"])
    if parts: extra += f" Строго учитывай пищевые ограничения: {', '.join(parts)}. Не предлагай запрещённые продукты."
    prompt = (f"Составь меню на день под {st['subphase']} {st['phase_ru'].lower()} фазу (день {st['day']} цикла). "
              "Четыре приёма: завтрак ~08:00, обед ~13:00, перекус ~16:00, ужин ~20:00. "
              "Завтрак обязательно белковый (яйца, омлет, сыр, греческий йогурт, рыба), а не сладкая каша как основа. "
              "Только обычные, доступные в России продукты и простые блюда. Не предлагай тофу, батат, киноа, булгур, протеиновые порошки и экзотику. Никаких странных сочетаний вроде яблока с маслом. "
              "Учитывай нутриенты под фазу." + extra +
              " Все четыре блюда разные, без повторов и без дублей между приёмами. Блюда короткие, до 5 слов. Ответь строго JSON без обрамления: "
              '{"macros":{"protein":"NN г","fat":"NN г","carbs":"NNN г"},'
              '"meals":[{"time":"08:00","dish":"...","note":"нутриент","kcal":"NNN ккал"}]}')
    out = _call([{"role": "system", "content": "Ты нутрициолог femtech-приложения. Отвечай строго JSON, по-русски."},
                 {"role": "user", "content": prompt}], max_tokens=900, usage=usage)
    if out:
        try:
            data = json.loads(out[out.find("{"):out.rfind("}") + 1])
            meals = data.get("meals") or []
            dishes = [(m.get("dish") or "").strip().lower() for m in meals]
            if len(meals) >= 4 and len(set(d for d in dishes if d)) >= 3:
                return _scale_menu(data, target)
        except Exception:
            pass
    import copy
    _fb = _scale_menu(copy.deepcopy(CURATED_MENU.get(phase_key, CURATED_MENU["follicular"])), target)
    _fb["_fallback"] = "menu_pool"
    return _fb


def replace_meal(st, slot=0, avoid=None, profile=None, target=None, usage=None):
    slots = ("b", "l", "s", "d")
    times = {"b": "08:00", "l": "13:00", "s": "16:00", "d": "20:00"}
    try:
        idx = max(0, min(3, int(slot)))
    except Exception:
        idx = 0
    k = slots[idx]
    if True:   # замену блюда тоже всегда делает модель; пул — фолбэк ниже
        extra = ""
        parts = [DIET_RU.get(x, x) for x in (profile.get("diet").split(",") if profile and profile.get("diet") else []) if x]
        if profile and profile.get("diet_note"): parts.append(profile["diet_note"])
        if parts: extra += f" Ограничения: {', '.join(parts)}."
        if target:
            extra += f" Ориентир дня: {target[0]} ккал, белок {target[1]} г, жиры {target[2]} г, углеводы {target[3]} г."
        prompt = (f"Замени один приём пищи. Это {('завтрак' if k=='b' else 'обед' if k=='l' else 'перекус' if k=='s' else 'ужин')} около {times[k]}. "
                  f"{st.get('subphase','')} {st.get('phase_ru','').lower()} фаза, день {st.get('day','')} цикла. "
                  f"Не повторяй блюдо: {avoid or 'нет'}." + extra +
                  " Блюдо должно быть обычным для России, простым, белковым, без тофу, батата, киноа, протеиновых порошков и странных сочетаний. "
                  'Ответь строго JSON: {"time":"08:00","dish":"...","note":"нутриент","kcal":"NNN ккал"}')
        out = _call([{"role": "system", "content": "Ты нутрициолог femtech-приложения. Отвечай строго JSON, по-русски."},
                     {"role": "user", "content": prompt}], max_tokens=320, temperature=0.2, usage=usage)
        if out:
            try:
                data = json.loads(out[out.find("{"):out.rfind("}") + 1])
                if data.get("dish"):
                    data["time"] = data.get("time") or times[k]
                    return data
            except Exception:
                pass
    import datetime as _dt
    phase = st["phase"] if st and st.get("phase") in MEAL_POOLS else "follicular"
    pool = MEAL_POOLS[phase][k]
    seed = _dt.date.today().toordinal() + idx + 1
    avoid_s = (avoid or "").strip().lower()
    def _fit(opt):
        # Приводим калории блюда к доле от нормы дня, как это делает _scale_menu для всего меню
        m = {"time": times[k], "dish": opt[0], "note": opt[1], "kcal": opt[2]}
        if target and target[0]:
            base = sum(_kcal_num(x.get("kcal")) for x in CURATED_MENU.get(phase, CURATED_MENU["follicular"])["meals"])
            if base:
                f = float(target[0]) / base
                kc = _kcal_num(opt[2])
                if kc and abs(f - 1) > 0.05:
                    m["kcal"] = "%d ккал" % (int(round(kc * f / 10.0)) * 10)
        return m
    for off in range(len(pool)):
        opt = pool[(seed + off) % len(pool)]
        if opt[0].strip().lower() != avoid_s:
            return _fit(opt)
    return _fit(pool[seed % len(pool)])



FOOD_PHASE_NOTE = {
    "menstrual": [
        "В менструальные дни эстроген и прогестерон низкие, а простагландины могут усиливать спазмы.",
        "Задача питания: белок для сытости, железо и B12 для восполнения потерь, тёплая еда и вода для мягкой поддержки ЖКТ.",
        "Если месячные обильные, особенно важны продукты с железом: говядина, печень, рыба, яйца, гречка, зелень."
    ],
    "follicular": [
        "В фолликулярную фазу эстроген постепенно растёт, часто становится больше энергии и лучше переносится активность.",
        "Обычно лучше заходит белок плюс сложные углеводы: они поддерживают мышцы, насыщение и стабильную энергию.",
        "Хорошая база: яйца, курица, рыба, говядина, рис, гречка, картофель, овощи, молочные продукты, если они подходят."
    ],
    "ovulation": [
        "В овуляцию эстроген близок к пику, повышается ЛГ, у многих больше энергии и аппетит может быть ровнее.",
        "Полезны белок, омега-3, антиоксиданты и вода: они поддерживают восстановление, кожу, слизистые и воспалительный баланс.",
        "Ставка на простые продукты: яйца, рыба, индейка, курица, зелень, овощи, ягоды, крупы."
    ],
    "luteal": [
        "В лютеиновой фазе выше прогестерон, температура тела может слегка расти, чаще появляются отёки, тяга к сладкому и ПМС.",
        "Питание лучше делать более стабильным: белок в каждый приём, сложные углеводы, магний и B6.",
        "Подойдут яйца, рыба, индейка, говядина, гречка, картофель, орехи, тыквенные семечки, тёмный шоколад в небольшом количестве."
    ],
}

def menu_text(st, menu, target=None):
    """Подробный текст питания из того же меню, что в приложении."""
    lines = [f"🍽 Питание сегодня: {st['subphase']} {st['phase_ru'].lower()} фаза",
             f"День {st['day']} из {st['cycle_len']}, до месячных примерно {st['days_to_next']} дн.",
             "",
             "🧬 Почему именно так"]
    for x in FOOD_PHASE_NOTE.get(st.get("phase"), FOOD_PHASE_NOTE["follicular"]):
        lines.append(f"• {x}")
    lines += ["", "🥗 Меню на день"]
    for m in menu.get("meals", []):
        k = m.get("kcal", "")
        note = m.get("note", "")
        tail = " - " + ", ".join([x for x in (note, k) if x])
        lines.append(f"• {m.get('time','')} {m.get('dish','')}{tail if tail.strip(' -') else ''}")
    mk = menu.get("macros", {})
    if mk:
        lines.append("")
        lines.append("⚖️ БЖУ на день")
        lines.append(f"• Белок: {mk.get('protein','-')} - нужен для сытости, мышц и восстановления.")
        lines.append(f"• Жиры: {mk.get('fat','-')} - важны для гормонов и желчного оттока.")
        lines.append(f"• Углеводы: {mk.get('carbs','-')} - поддерживают энергию и снижают риск тяги к сладкому.")
    if target:
        lines.append(f"• Ориентир по калориям: примерно {target[0]} ккал в день под твои параметры.")
    lines.append("")
    lines.append("СЛЕДУЮЩИЕ: Что купить? ;; Заменить блюдо?")
    return "\n".join(lines)

def section_text(st, key):
    c = st["content"]
    if key == "phase":    return f"Фаза: {st['subphase']} {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}. Месячные через ~{st['days_to_next']} дн."
    if key == "general":  return c["general"]
    if key == "food":     return f"🍽 Питание сегодня. {c['food']}"
    if key == "training": return f"🏋️ Нагрузка сегодня. {c['training']}"
    return ""


def fallback_summary(st, modules):
    return "\n\n".join(section_text(st, k) for k in ["phase", "general", "food", "training"] if k in modules)


GEN_NUTRI = {
    "meno": "менопауза: упор на белок, кальций и витамин D для костей, магний и B6 для сна и приливов, омега-3, клетчатку; меньше быстрых сахаров, кофеина и алкоголя",
    "preg": "беременность: фолиевая кислота, железо, кальций, омега-3, достаточно белка; избегать сырого мяса и рыбы, непастеризованного, печени в избытке, алкоголя и лишнего кофеина",
    "irregular": "нерегулярный цикл: стабильный сахар, белок в каждый приём, магний, железо, клетчатка",
    "none": "сбалансированно: белок в каждый приём, овощи, сложные углеводы, вода, омега-3",
}

def general_menu(profile, mode, target=None, usage=None):
    ctx = GEN_NUTRI.get(mode, GEN_NUTRI["none"])
    extra = ""
    if target:
        extra += (f" Ориентир по дню: примерно {target[0]} ккал, белок {target[1]} г, жиры {target[2]} г, "
                  f"углеводы {target[3]} г, распредели по приёмам.")
    parts = [DIET_RU.get(x, x) for x in (profile.get("diet").split(",") if profile and profile.get("diet") else []) if x]
    if profile and profile.get("diet_note"): parts.append(profile["diet_note"])
    if parts: extra += f" Строго учитывай пищевые ограничения: {', '.join(parts)}. Не предлагай запрещённые продукты."
    prompt = (f"Составь меню на день. Контекст питания: {ctx}. "
              "Четыре приёма: завтрак ~08:00, обед ~13:00, перекус ~16:00, ужин ~20:00. "
              "Завтрак обязательно белковый (яйца, омлет, сыр, греческий йогурт, рыба). "
              "Только обычные, доступные в России продукты и простые блюда. Не предлагай тофу, батат, киноа, булгур, протеиновые порошки и экзотику." + extra +
              " Блюда короткие, до 5 слов. Ответь строго JSON без обрамления: "
              '{"macros":{"protein":"NN г","fat":"NN г","carbs":"NNN г"},'
              '"meals":[{"time":"08:00","dish":"...","note":"нутриент","kcal":"NNN ккал"}]}')
    out = _call([{"role": "system", "content": "Ты нутрициолог femtech-приложения. Отвечай строго JSON, по-русски."},
                 {"role": "user", "content": prompt}], max_tokens=900, usage=usage)
    if out:
        try:
            data = json.loads(out[out.find("{"):out.rfind("}") + 1])
            meals = data.get("meals") or []
            dishes = [(m.get("dish") or "").strip().lower() for m in meals]
            if len(meals) >= 4 and len(set(d for d in dishes if d)) >= 3:
                return _scale_menu(data, target)
        except Exception:
            pass
    import copy
    _fb = _scale_menu(copy.deepcopy(CURATED_MENU.get("follicular")), target)
    _fb["_fallback"] = "menu_pool"
    return _fb

def general_training(profile, mode):
    base = {
        "meno": {"level": "Силовая + кардио", "duration": "30-45 мин",
                 "summary": "В менопаузе приоритет — мышцы и кости. Силовая 2-3 раза в неделю, ходьба для сердца и сна, упражнения на баланс против падений. Это замедляет потерю мышечной массы и плотности костей и помогает настроению и весу.",
                 "why": "После снижения эстрогена ускоряется потеря мышц и плотности костей. Силовая нагрузка и ходьба замедляют это и помогают сну, настроению и весу.",
                 "options": [{"name": "Силовая", "benefit": "поддерживает мышцы, кости и обмен", "how": "2-3 раза в неделю, базовые упражнения, умеренный вес"},
                             {"name": "Ходьба или кардио", "benefit": "сердце, сон, настроение", "how": "30-40 мин в комфортном темпе"},
                             {"name": "Баланс и растяжка", "benefit": "снижает риск падений, снимает зажатость", "how": "10-15 мин йоги или баланса"}],
                 "avoid": "тренировки через сильную усталость и боль", "recovery": "белок после нагрузки, вода, сон, прохлада при приливах",
                 "hormones": ["Эстроген снижается — выше потеря мышц и плотности костей.", "Силовая и ударная нагрузка стимулируют кости.", "Сон и стресс сильно влияют на восстановление."]},
        "preg": {"level": "Мягкая активность", "duration": "20-30 мин",
                 "summary": "В беременности — умеренно и без перегрева. Ходьба, плавание, мягкая силовая и дыхательные упражнения по самочувствию поддерживают сон, спину и подготовку к родам. Избегай падений, контактного спорта и нагрузки лёжа на спине в позднем сроке.",
                 "why": "Умеренная активность поддерживает самочувствие, сон и подготовку к родам. Важно избегать перегрева, падений и нагрузки лёжа на спине во 2-3 триместре.",
                 "options": [{"name": "Ходьба", "benefit": "мягко поддерживает форму и настроение", "how": "20-30 мин в комфортном темпе"},
                             {"name": "Плавание или аквагимнастика", "benefit": "разгружает спину и суставы", "how": "если нет противопоказаний"},
                             {"name": "Дыхание и таз", "benefit": "подготовка к родам, меньше боли в спине", "how": "мягкие упражнения, без задержек дыхания"}],
                 "avoid": "контактный спорт, падения, перегрев, упражнения лёжа на спине в позднем сроке", "recovery": "вода, отдых, следить за шевелениями и самочувствием",
                 "hormones": ["Релаксин повышает подвижность суставов — выше риск растяжений.", "Растущая матка смещает центр тяжести — осторожно с балансом.", "При тревожных симптомах — к врачу."]},
        "default": {"level": "По самочувствию", "duration": "20-40 мин",
                    "summary": "Опирайся на самочувствие, а не на рекорды. Ходьба, растяжка и лёгкая силовая поддерживают энергию, сон и тонус. Если есть боль, слабость или головокружение — выбери отдых.",
                    "why": "Без отслеживания цикла безопаснее ориентироваться на сон, энергию, боль и общее состояние.",
                    "options": [{"name": "Ходьба", "benefit": "мягко поддерживает энергию и сон", "how": "20-40 мин ровным темпом"},
                                {"name": "Растяжка или йога", "benefit": "снимает напряжение", "how": "10-20 мин без боли"},
                                {"name": "Лёгкая силовая", "benefit": "тонус и мышцы", "how": "25-35 мин, лёгкий вес"}],
                    "avoid": "нагрузка через боль, слабость, головокружение", "recovery": "вода, белок, сон",
                    "hormones": ["Без данных о цикле выводы о фазе не делаем.", "Ориентиры: сон, энергия, боль, восстановление."]},
    }
    b = base.get(mode, base["default"])
    return {"title": f"{b['level']} нагрузка", "level": b["level"], "duration": b["duration"], "summary": b["summary"],
            "phase": "", "day": "", "cycle_len": "", "days_to_next": "", "why": b["why"], "hormones": b.get("hormones", []),
            "options": b["options"], "avoid": b["avoid"], "reduce": b["avoid"], "recovery": b["recovery"]}

_FOOD_ERR = {"msg": ""}
def last_food_err():
    return _FOOD_ERR.get("msg") or ""

def _giga_upload_image(image_bytes, filename="food.jpg"):
    """Загружает картинку в GigaChat, возвращает file_id для attachments."""
    tok = _giga_auth()
    if not tok:
        _FOOD_ERR["msg"] = "нет прямого ключа GigaChat (GIGACHAT_CREDENTIALS) для Vision"
        print("FOOD upload: no GigaChat token")
        return None
    ext = (filename.rsplit(".", 1)[-1] if "." in filename else "jpg").lower()
    mime = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png", "webp": "image/webp"}.get(ext, "image/jpeg")
    try:
        r = _HTTP.post(GIGA_FILES,
            headers={"Authorization": f"Bearer {tok}", "Accept": "application/json"},
            files={"file": (filename, image_bytes, mime)},
            data={"purpose": "general"},
            timeout=(6, 60), verify=_GIGA_VERIFY)
        if r.status_code != 200:
            _FOOD_ERR["msg"] = f"загрузка {r.status_code}: {(r.text or '')[:140]}"
            print("FOOD upload HTTP", r.status_code, (r.text or "")[:400])
            return None
        fid = r.json().get("id")
        print("FOOD upload ok, file_id:", fid, "bytes:", len(image_bytes))
        return fid
    except Exception as e:
        _FOOD_ERR["msg"] = "загрузка: " + repr(e)[:140]
        print("FOOD upload EXC:", repr(e)[:300])
        return None

def _call_giga_vision(file_id, prompt, max_tokens=900, temperature=0.2, usage=None):
    import time as _t
    tok = _giga_auth()
    if not tok:
        return None
    messages = [{"role": "user", "content": prompt, "attachments": [file_id]}]
    for i in range(3):
        started = _t.time()
        try:
            r = _HTTP.post(GIGA_CHAT,
                headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json", "Accept": "application/json"},
                json={"model": GIGA_VISION_MODEL, "messages": messages, "temperature": max(0.01, temperature), "max_tokens": max_tokens},
                timeout=(6, float(os.environ.get("GIGACHAT_VISION_TIMEOUT_SECONDS") or "70")), verify=_GIGA_VERIFY)
            if r.status_code == 401:
                _capture_failure("gigachat_vision", GIGA_VISION_MODEL, started, "http_401", i)
                _giga_tok["token"] = None; tok = _giga_auth()
                if not tok: return None
                continue
            if r.status_code == 429:
                _capture_failure("gigachat_vision", GIGA_VISION_MODEL, started, "http_429", i)
                _t.sleep(2 * (i + 1)); continue
            if r.status_code != 200:
                _capture_failure("gigachat_vision", GIGA_VISION_MODEL, started, "http_%s" % r.status_code, i)
                _FOOD_ERR["msg"] = f"vision {r.status_code}: {(r.text or '')[:140]} (модель {GIGA_VISION_MODEL})"
                print("FOOD vision HTTP", r.status_code, (r.text or "")[:400], "| model:", GIGA_VISION_MODEL)
                if i < 2:
                    _t.sleep(2 * (i + 1)); continue
                return None
            data = r.json()
            _capture_usage(usage, data, "gigachat_vision", GIGA_VISION_MODEL, started, retry_index=i)
            txt = (data["choices"][0]["message"]["content"] or "").strip()
            return re.sub(r"<think>.*?</think>", "", txt, flags=re.S).strip() or None
        except Exception as e:
            _capture_failure("gigachat_vision", GIGA_VISION_MODEL, started, "error", i)
            print("FOOD vision EXC:", repr(e)[:300])
            if i < 2: _t.sleep(2 * (i + 1)); continue
            return None
    return None

FOOD_CLASSES = ("белковое", "углеводное", "овощи и фрукты", "молочное", "жиры и орехи", "сладкое", "напиток", "смешанное")

_FOOD_FORMAT = ("Ответь СТРОГО этими строками, каждая с новой строки, без вступления и без пояснений, только эти поля:\n"
    "НАЗВАНИЕ: короткое название\n"
    "КЛАСС: одно значение из списка: белковое / углеводное / овощи и фрукты / молочное / жиры и орехи / сладкое / напиток / смешанное\n"
    "ГРАММЫ: число (примерный вес порции)\n"
    "ККАЛ: число\n"
    "БЕЛКИ: число\n"
    "ЖИРЫ: число\n"
    "УГЛЕВОДЫ: число\n"
    "Числа целые, без единиц измерения. Если точно не знаешь — поставь реалистичную оценку.")

def food_class_norm(v, protein=0, fat=0, carbs=0):
    """Приводит класс продукта к канону; если модель класс не дала — оцениваем по БЖУ."""
    t = str(v or "").strip().lower()
    for c in FOOD_CLASSES:
        if c in t: return c
    alias = {"белок": "белковое", "мясо": "белковое", "рыба": "белковое", "птица": "белковое",
             "углевод": "углеводное", "крупа": "углеводное", "гарнир": "углеводное", "выпечка": "углеводное",
             "овощ": "овощи и фрукты", "фрукт": "овощи и фрукты", "салат": "овощи и фрукты", "ягод": "овощи и фрукты",
             "молоч": "молочное", "сыр": "молочное", "творо": "молочное", "йогурт": "молочное", "кефир": "молочное",
             "орех": "жиры и орехи", "жир": "жиры и орехи", "масло": "жиры и орехи",
             "десерт": "сладкое", "сладост": "сладкое", "снек": "сладкое", "перекус": "сладкое",
             "напит": "напиток", "смузи": "напиток", "кофе": "напиток", "чай": "напиток"}
    for k, c in alias.items():
        if k in t: return c
    # фолбэк: по доле калорий из макросов
    pk, fk, ck = protein * 4, fat * 9, carbs * 4
    tot = pk + fk + ck
    if tot <= 0: return "смешанное"
    if pk / tot >= 0.45: return "белковое"
    if ck / tot >= 0.6: return "углеводное"
    if fk / tot >= 0.55: return "жиры и орехи"
    return "смешанное"

def _food_num(v):
    if v is None:
        return 0
    m = re.search(r"-?\d+(?:[.,]\d+)?", str(v))
    return float(m.group(0).replace(",", ".")) if m else 0

def _parse_food(out):
    """Разбирает ответ модели: сначала пробует JSON, затем построчный формат КЛЮЧ: значение."""
    if not out:
        return None
    try:
        js = out[out.find("{"):out.rfind("}") + 1]
        if js:
            data = json.loads(js)
            if isinstance(data, dict) and (data.get("items") or data.get("total") or data.get("kcal") or data.get("title")):
                return data
    except Exception:
        pass
    def grab(keys):
        for k in keys:
            m = re.search(r"(?im)^\s*[\u2022\-\*]?\s*" + k + r"[^:\-\u2013]*[:\-\u2013]\s*(.+)$", out)
            if m:
                return m.group(1).strip()
        return None
    title = grab(["НАЗВАНИЕ", "БЛЮДО", "ПРОДУКТ"])
    kcal_s = grab(["ККАЛ", "КАЛОРИ", "ЭНЕРГ"])
    if not kcal_s:
        m = re.search(r"(\d+(?:[.,]\d+)?)\s*(?:ккал|калор)", out, re.I)
        kcal_s = m.group(1) if m else None
    if not title and not kcal_s:
        return None
    _p = round(_food_num(grab(["БЕЛК", "PROTEIN"])), 1)
    _f = round(_food_num(grab(["ЖИР", "FAT"])), 1)
    _c = round(_food_num(grab(["УГЛЕВОД", "CARB"])), 1)
    return {"title": title or "Приём пищи", "kind": "dish", "items": [],
            "fclass": food_class_norm(grab(["КЛАСС", "КАТЕГОР", "CLASS"]), _p, _f, _c),
            "grams": int(_food_num(grab(["ГРАММ", "ВЕС", "ПОРЦИ"]))) or None,
            "kcal": int(_food_num(kcal_s)),
            "protein": _p, "fat": _f, "carbs": _c,
            "confidence": "medium", "note": ""}

def analyze_food(image_bytes, filename="food.jpg", profile=None, usage=None):
    """Фото -> КБЖУ. Сначала через отдельную OpenRouter vision-модель, если она задана,
    иначе через рабочий провайдер (OpenAI-стиль image_url, base64),
    затем прямой GigaChat Vision как запасной путь (если задан GIGACHAT_CREDENTIALS)."""
    import base64
    _FOOD_ERR["msg"] = ""
    prompt = ("На фото готовая еда/тарелка ИЛИ упаковка или этикетка продукта. "
        "Если это этикетка — прочитай название и пищевую ценность (КБЖУ) с упаковки. "
        "Если это готовое блюдо — определи, что это, и оцени вес порции на глаз. Посчитай калории и БЖУ. " + _FOOD_FORMAT)
    ext = (filename.rsplit(".", 1)[-1] if "." in filename else "jpg").lower()
    mime = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png", "webp": "image/webp"}.get(ext, "image/jpeg")
    # 1) Separate OpenRouter vision model, generic LiteLLM vision model, or text channel.
    try:
        b64 = base64.b64encode(image_bytes).decode()
        mm = [{"role": "user", "content": [
            {"type": "text", "text": prompt},
            {"type": "image_url", "image_url": {"url": f"data:{mime};base64,{b64}"}}]}]
        vision_cfg = _openrouter_vision_config()
        if vision_cfg:
            out = _call_proxy_one(vision_cfg, mm, max_tokens=500, temperature=0.2,
                                  usage=usage, attempts=3)
        else:
            out = None
            vmodel = os.environ.get("LITELLM_VISION_MODEL")
            if vmodel:
                for cfg in _proxy_configs():
                    out = _call_proxy_one(dict(cfg, model=vmodel), mm, 500, 0.2, usage, attempts=2)
                    if out:
                        break
            if not out:
                out = _call(mm, max_tokens=500, temperature=0.2, usage=usage)
        try: print("FOOD provider vision raw:", repr(out)[:300])
        except Exception: pass
        rec = _parse_food(out)
        if rec:
            return rec
    except Exception as e:
        print("FOOD provider vision EXC:", repr(e)[:200])
        _FOOD_ERR["msg"] = "провайдер: " + repr(e)[:120]
    # 2) прямой GigaChat Vision (если есть ключ прямого API)
    if os.environ.get("GIGACHAT_CREDENTIALS") or os.environ.get("GIGACHAT_CLIENT_ID"):
        fid = _giga_upload_image(image_bytes, filename)
        if fid:
            out2 = _call_giga_vision(fid, prompt, usage=usage)
            try: print("FOOD direct vision raw:", repr(out2)[:300])
            except Exception: pass
            rec2 = _parse_food(out2)
            if rec2:
                return rec2
    if not _FOOD_ERR.get("msg"):
        _FOOD_ERR["msg"] = "провайдер не распознал фото (нужна модель с поддержкой картинок)"
    return None

def analyze_food_text(text, profile=None, usage=None):
    """Текст ('200 г творога и банан') -> оценка КБЖУ через GigaChat."""
    prompt = ("Пользователь съел: «" + (text or "").strip() + "». Оцени калорийность и БЖУ. "
        "Если вес не указан — прими типичную порцию. " + _FOOD_FORMAT)
    out = _call([{"role": "system", "content": "Ты нутрициолог, оцениваешь КБЖУ еды по описанию."},
                 {"role": "user", "content": prompt}], max_tokens=300, temperature=0.2, usage=usage)
    try:
        print("FOOD text raw:", repr(out)[:400])
    except Exception:
        pass
    rec = _parse_food(out)
    if rec and (not rec.get("title") or rec.get("title") == "Приём пищи"):
        rec["title"] = ((text or "").strip()[:60] or "Приём пищи")
    try: print("FOOD text parsed:", rec)
    except Exception: pass
    return rec

def diary_reco(summary, usage=None):
    """Персональные советы по дневнику питания за день."""
    prompt = ("Дневник питания пользовательницы за сегодня и её цель по КБЖУ:\n" + summary + "\n\n"
        "Дай 2-3 очень коротких персональных совета строго по этим цифрам: чего недобирает или перебирает (калории, белок, жиры, углеводы), "
        "что добавить или убрать в следующий приём. Если указана фаза цикла — учти её. "
        "Каждый совет с новой строки, начинай с уместного эмодзи. Тепло, конкретно, без общих слов и без воды. "
        "Только русский, без markdown, до 600 знаков. Не добавляй строку СЛЕДУЮЩИЕ.")
    return _clean(_call([{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}],
                        max_tokens=500, temperature=0.4, usage=usage),
                  "Пока мало данных за день. Добавь пару приёмов, и я подскажу, чего не хватает.")

SALUTE_OAUTH = (os.environ.get("SBER_SALUTE_OAUTH_URL") or os.environ.get("SALUTE_SPEECH_OAUTH_URL")
                or "https://speech.giga.chat/v1/token")
SALUTE_STT = (os.environ.get("SBER_SALUTE_RECOGNIZE_URL") or os.environ.get("SALUTE_SPEECH_URL")
              or "https://speech.giga.chat/rest/v1/speech:recognize")
SALUTE_SCOPE = os.environ.get("SALUTE_SPEECH_SCOPE") or os.environ.get("SBER_SALUTE_SCOPE") or "SALUTE_SPEECH_PERS"
# voice_messaging — модель SaluteSpeech под голосовые сообщения (короткая спонтанная речь), general — универсальная
SALUTE_MODEL = os.environ.get("SBER_SALUTE_RECOGNITION_MODEL") or os.environ.get("SALUTE_SPEECH_MODEL") or "general"
_salute_tok = {"token": None, "exp": 0.0}
_SALUTE_ERR = {"auth": "", "stt": "", "tts": "", "form": ""}   # последние ошибки — для команды /voicetest
_salute_auth_lock = threading.Lock()

def _salute_is_giga():
    """speech.giga.chat — отдельный речевой сервис: токен по /v1/token, без scope."""
    u = (SALUTE_OAUTH or "").lower()
    return "giga.chat" in u or u.rstrip("/").endswith("/v1/token")
# Форматы, которые SaluteSpeech принимает напрямую. Голосовые Telegram — ogg/opus, попадают сюда.
_SALUTE_MIME = {"ogg": "audio/ogg;codecs=opus", "oga": "audio/ogg;codecs=opus",
                "opus": "audio/ogg;codecs=opus", "mp3": "audio/mpeg", "flac": "audio/flac"}

SALUTE_CLIENT = (os.environ.get("SBER_SALUTE_CLIENT") or "gigacons").strip()

def _norm_basic(raw):
    """Собирает заголовок Basic для SaluteSpeech.
    SBER_SALUTE_AUTH_KEY — это ТОЛЬКО секрет, логин отдельно (по умолчанию 'gigacons'),
    итоговый ключ = base64('логин:секрет'). Так это работает в основном проекте."""
    import base64
    s = (raw or "").strip().strip('"').strip("'").strip()
    if s.lower().startswith("basic "):              # снимаем префикс до чистки пробелов
        s = s[6:]
    s = re.sub(r"\s+", "", s)                       # переносы строк при копировании в панель
    if not s:
        return None, "пусто"
    if SALUTE_CLIENT:
        return base64.b64encode(("%s:%s" % (SALUTE_CLIENT, s)).encode()).decode(), None
    return s, None

def _salute_auth_unlocked(force=False):
    """OAuth SaluteSpeech — та же схема, что у GigaChat, но свой scope и свой кэш токена."""
    import time as _t, uuid
    if not force and _salute_tok["token"] and _salute_tok["exp"] - 60 > _t.time():
        return _salute_tok["token"]
    creds = (os.environ.get("SBER_SALUTE_AUTH_KEY") or os.environ.get("SALUTE_SPEECH_CREDENTIALS")
             or os.environ.get("SALUTE_SPEECH_KEY"))
    if not creds:
        cid = os.environ.get("SALUTE_SPEECH_CLIENT_ID"); sec = os.environ.get("SALUTE_SPEECH_CLIENT_SECRET")
        if cid and sec:
            import base64
            creds = base64.b64encode(f"{cid}:{sec}".encode()).decode()
    if not creds:
        _SALUTE_ERR["auth"] = "ключ не задан (SBER_SALUTE_AUTH_KEY)"
        return None
    creds, _bad = _norm_basic(creds)
    if not creds:
        _SALUTE_ERR["auth"] = "ключ в неверном формате: " + str(_bad)
        return None
    raw = re.sub(r"\s+", "", (os.environ.get("SBER_SALUTE_AUTH_KEY") or
                              os.environ.get("SALUTE_SPEECH_CREDENTIALS") or "").strip().strip('"').strip("'"))
    # Разные контуры Сбера ждут ключ по-разному. Перебираем варианты, пока один не сработает,
    # и запоминаем удачный — чтобы не гадать по документации.
    variants = [("Basic " + creds, "Basic base64(%s:секрет)" % SALUTE_CLIENT)]
    if raw and raw != creds:
        variants.append(("Basic " + raw, "Basic ключ как есть"))
    last = ""
    for hdr, label in variants:
        try:
            # scope передаётся всегда, в теле формы — так делает рабочий проект и для speech.giga.chat
            headers = {"Authorization": hdr, "RqUID": str(uuid.uuid4()), "Accept": "application/json",
                       "Content-Type": "application/x-www-form-urlencoded"}
            r = _HTTP.post(SALUTE_OAUTH, headers=headers, data={"scope": SALUTE_SCOPE},
                           timeout=30, verify=_GIGA_VERIFY)
            if r.status_code >= 400:
                last = "%s -> HTTP %s: %s" % (label, r.status_code, (r.text or "")[:120])
                continue
            d = r.json()
            tok = d.get("tok") or d.get("access_token") or d.get("token")
            if not tok:
                last = "%s -> нет токена, поля: %s" % (label, ",".join(list(d.keys())[:6]))
                continue
            _SALUTE_ERR["auth"] = ""; _SALUTE_ERR["form"] = label
            _salute_tok["token"] = str(tok)
            exp = d.get("exp") or d.get("expires_at") or d.get("expires_in") or 0
            try: exp = float(exp)
            except (TypeError, ValueError): exp = 0
            if exp > 1e12: exp = exp / 1000.0                 # миллисекунды
            elif exp < 1e6: exp = _t.time() + (exp or 1500)   # относительный TTL
            _salute_tok["exp"] = exp
            return _salute_tok["token"]
        except Exception as e:
            last = "%s -> %s" % (label, str(e)[:120])
            print("Salute auth error:", label, e)
    _SALUTE_ERR["auth"] = last or "все варианты ключа отвергнуты"
    return None

def _salute_auth(force=False):
    """Serialize token refreshes so parallel TTS requests do not stampede OAuth."""
    with _salute_auth_lock:
        return _salute_auth_unlocked(force=force)

def _transcribe_salute(audio_bytes, ext):
    mime = _SALUTE_MIME.get(ext)
    if not mime:
        return None            # формат не поддерживается синхронным API — уходим на фолбэк
    tok = _salute_auth()
    if not tok:
        return None
    import uuid
    params = {"model": SALUTE_MODEL} if SALUTE_MODEL else {}
    for attempt in (1, 2):
        try:
            r = _HTTP.post(SALUTE_STT, params=params,
                headers={"Authorization": "Bearer " + tok, "Content-Type": mime, "RqUID": str(uuid.uuid4())},
                data=audio_bytes, timeout=(6, 60), verify=_GIGA_VERIFY)
            if r.status_code == 401 and attempt == 1:
                tok = _salute_auth(force=True)      # токен протух — перевыпустить и повторить
                if not tok: return None
                continue
            r.raise_for_status()
            res = r.json().get("result") or []
            txt = " ".join(x for x in res if x).strip()
            return txt or None
        except Exception as e:
            print("Salute STT error:", e); return None
    return None

def _transcribe_groq(audio_bytes, filename, ext):
    key = os.environ.get("GROQ_API_KEY")
    if not key:
        return None
    mime = {"ogg": "audio/ogg", "oga": "audio/ogg", "webm": "audio/webm", "mp4": "audio/mp4",
            "m4a": "audio/mp4", "mp3": "audio/mpeg", "wav": "audio/wav"}.get(ext, "audio/ogg")
    try:
        r = _HTTP.post("https://api.groq.com/openai/v1/audio/transcriptions",
            headers={"Authorization": f"Bearer {key}"},
            files={"file": (filename, audio_bytes, mime)},
            data={"model": "whisper-large-v3-turbo", "language": "ru"}, timeout=60)
        r.raise_for_status()
        return (r.json().get("text") or "").strip() or None
    except Exception as e:
        print("STT error:", e); return None

SALUTE_TTS = (os.environ.get("SBER_SALUTE_SYNTH_URL") or os.environ.get("SALUTE_SPEECH_SYNTH_URL")
              or "https://speech.giga.chat/rest/v1/text:synthesize")
SALUTE_VOICE = os.environ.get("AIWA_TTS_VOICE") or "erm"   # голос Joy
TTS_FORMAT = os.environ.get("AIWA_TTS_FORMAT") or "opus"   # opus — родной для голосовых Telegram
TTS_MAXCHARS = int(os.environ.get("AIWA_TTS_MAXCHARS", "3500"))
SALUTE_TTS_LANGUAGES = frozenset({"ru", "uz", "pt", "pl", "nl", "kz", "en", "de", "es", "fr", "it", "ky"})
_LANGID_TO_SALUTE = {"kk": "kz"}
_TTS_LANG_IDENTIFIER = None
_TTS_LANG_LOCK = threading.Lock()

def _tts_account_limit():
    legal = str(os.environ.get("AIWA_SALUTE_ACCOUNT_TYPE") or "personal").lower() in {
        "legal", "business", "company", "juridical",
    }
    return 10 if legal else 5

def _tts_provider_concurrency():
    try:
        requested = int(os.environ.get("AIWA_TTS_PROVIDER_CONCURRENCY", "3"))
    except (TypeError, ValueError):
        requested = 3
    return max(1, min(_tts_account_limit(), requested))

_TTS_PROVIDER_GATE = threading.BoundedSemaphore(_tts_provider_concurrency())

def _tts_lang_identifier():
    global _TTS_LANG_IDENTIFIER
    if _TTS_LANG_IDENTIFIER is None:
        with _TTS_LANG_LOCK:
            if _TTS_LANG_IDENTIFIER is None:
                from langid.langid import LanguageIdentifier, model
                _TTS_LANG_IDENTIFIER = LanguageIdentifier.from_modelstring(model, norm_probs=True)
    return _TTS_LANG_IDENTIFIER

_TTS_MARKERS = {
    "fr": {"bonjour", "merci", "monsieur", "madame", "mon", "ami", "je", "vous", "avec", "dans", "très", "pour"},
    "it": {"ciao", "grazie", "buongiorno", "come", "stai", "sono", "non", "mio", "mia", "per"},
    "es": {"hola", "gracias", "buenos", "días", "señor", "señora", "cómo", "estás", "para", "pero"},
    "pt": {"olá", "obrigado", "obrigada", "você", "como", "está", "não", "senhor", "senhora"},
    "de": {"guten", "morgen", "danke", "herr", "frau", "der", "die", "das", "nicht", "und"},
    "nl": {"goed", "dank", "meneer", "mevrouw", "het", "een", "niet", "voor", "van"},
    "pl": {"dzień", "dobry", "dziękuję", "pan", "pani", "jest", "nie", "jak", "się"},
    "en": {"hello", "thanks", "thank", "good", "morning", "the", "and", "with", "you", "not"},
    "uz": {"o‘zbek", "o'zbek", "salom", "rahmat", "tilidagi", "uchun", "bilan", "emas"},
    "kz": {"қазақ", "тіліндегі", "сөйлем", "бұл", "үшін", "және", "қарапайым"},
    "ky": {"кыргыз", "тилиндеги", "сүйлөм", "бул", "үчүн", "менен", "жөнөкөй"},
}
_TTS_STRONG_MARKERS = {
    "bonjour": "fr", "merci": "fr", "monsieur": "fr", "madame": "fr",
    "ciao": "it", "grazie": "it", "buongiorno": "it",
    "hola": "es", "gracias": "es",
    "olá": "pt", "obrigado": "pt", "obrigada": "pt",
    "dziękuję": "pl", "dzień": "pl",
    "hello": "en", "thanks": "en",
    "salom": "uz", "rahmat": "uz", "o‘zbek": "uz", "o'zbek": "uz",
    "қазақ": "kz", "кыргыз": "ky",
}
_UNSUPPORTED_SCRIPT_CODES = (
    ("HIRAGANA", "ja"), ("KATAKANA", "ja"), ("CJK", "zh"), ("HANGUL", "ko"),
    ("GREEK", "el"), ("ARABIC", "ar"), ("HEBREW", "he"), ("THAI", "th"),
    ("DEVANAGARI", "hi"), ("GEORGIAN", "ka"), ("ARMENIAN", "hy"),
)

class UnsupportedTTSLanguage(ValueError):
    def __init__(self, languages):
        self.languages = tuple(sorted(set(languages)))
        super().__init__("unsupported SaluteSpeech language(s): " + ", ".join(self.languages))

def _marker_language(text):
    words = re.findall(r"[^\W\d_]+(?:[’'][^\W\d_]+)?", text.lower(), flags=re.U)
    if not words:
        return None
    for word in words:
        if word in _TTS_STRONG_MARKERS:
            return _TTS_STRONG_MARKERS[word]
    scores = {lang: sum(word in markers for word in words) for lang, markers in _TTS_MARKERS.items()}
    lang, score = max(scores.items(), key=lambda item: item[1])
    return lang if score >= 2 else None

def detect_tts_language(text, default="ru"):
    """Return (Salute language or None, confidence) without forcing unsupported scripts into Russian."""
    value = str(text or "").strip()
    letters = [ch for ch in value if ch.isalpha()]
    if len(letters) < 4:
        return default, 1.0
    script_hits = {}
    for ch in letters:
        name = unicodedata.name(ch, "")
        for script, code in _UNSUPPORTED_SCRIPT_CODES:
            if script in name:
                script_hits[code] = script_hits.get(code, 0) + 1
    if script_hits:
        code, hits = max(script_hits.items(), key=lambda item: item[1])
        if hits >= max(3, len(letters) // 3):
            return None, 1.0
    lower = value.lower()
    if re.search(r"[ўҳ]", lower) or re.search(r"\b(?:o[‘’']zbek|tilidagi|uchun|bilan|emas)\b", lower):
        return "uz", 0.99
    marked = _marker_language(value)
    if marked:
        return marked, 0.95
    try:
        raw_code, confidence = _tts_lang_identifier().classify(value)
    except Exception:
        return default, 0.0
    code = _LANGID_TO_SALUTE.get(raw_code, raw_code)
    if code in SALUTE_TTS_LANGUAGES:
        if confidence >= 0.58 or len(letters) >= 24:
            return code, float(confidence)
        return default, float(confidence)
    word_count = len(re.findall(r"[^\W\d_]+", value, flags=re.U))
    if confidence >= 0.75 and len(letters) >= 24 and word_count >= 4:
        return None, float(confidence)
    return default, float(confidence)

def _tts_fragments(text):
    """Split sentences and quoted spans so language switches keep their own tag."""
    value = _tts_spoken_text(text)
    if not value:
        return []
    quoted = re.compile(r"(«[^»]+»|“[^”]+”|「[^」]+」|『[^』]+』|\"[^\"]+\")")
    pieces = []
    for outer in quoted.split(value):
        if not outer or not outer.strip():
            continue
        if quoted.fullmatch(outer):
            pieces.append(outer.strip())
            continue
        pieces.extend(
            part.strip()
            for part in re.findall(r"[^.!?…]+(?:[.!?…]+|$)", outer)
            if part.strip()
        )
    return pieces

def tts_language_segments(text, default="ru"):
    """Return coalesced [{language,text,confidence}] and preserve reading order."""
    segments = []
    unsupported = []
    for fragment in _tts_fragments(text):
        language, confidence = detect_tts_language(fragment, default=default)
        if language is None:
            unsupported.append(_tts_lang_identifier().classify(fragment)[0])
            continue
        if segments and segments[-1]["language"] == language:
            segments[-1]["text"] += " " + fragment
            segments[-1]["confidence"] = min(segments[-1]["confidence"], confidence)
        else:
            segments.append({"language": language, "text": fragment, "confidence": confidence})
    if unsupported:
        raise UnsupportedTTSLanguage(unsupported)
    return segments

def _salute_voice_id(voice=None):
    voice_name = (voice or SALUTE_VOICE or "erm").strip()
    voice_name = re.sub(r"[^A-Za-z0-9_]", "", voice_name)
    voice_name = voice_name[:1].upper() + voice_name[1:]
    return voice_name if re.search(r"_\d+$", voice_name) else voice_name + "_24000"

def _tts_ssml(segments, voice):
    tags = []
    for segment in segments:
        body = html.escape(segment["text"], quote=False)
        tags.append(f'<voice name="{voice}" lang="{segment["language"]}">{body}</voice>')
    return "<speak>" + "".join(tags) + "</speak>"

def _split_tts_segment(segment, max_text):
    text = segment["text"].strip()
    if len(html.escape(text, quote=False)) <= max_text:
        return [segment]
    parts = []
    while text:
        escaped_size = 0
        safe_end = 0
        for index, char in enumerate(text, start=1):
            escaped_size += len(html.escape(char, quote=False))
            if escaped_size > max_text:
                break
            safe_end = index
        if safe_end >= len(text):
            cut = len(text)
        else:
            window = text[:max(1, safe_end)]
            boundaries = [m.end() for m in re.finditer(r"(?<=[.!?;,:])\s+|\s+", window)]
            cut = max((p for p in boundaries if p >= max(1, safe_end // 2)), default=max(1, safe_end))
        part = dict(segment)
        part["text"] = text[:cut].strip()
        if part["text"]:
            parts.append(part)
        text = text[cut:].strip()
    return parts

def tts_ssml_requests(text, voice=None, limit=4000, default_language="ru"):
    """Build bounded synchronous SSML requests for all supported language switches."""
    max_body = max(500, min(4000, int(limit)))
    voice_id = _salute_voice_id(voice)
    overhead = len(_tts_ssml([{"language": "ru", "text": "", "confidence": 1.0}], voice_id))
    segments = []
    for segment in tts_language_segments(text, default=default_language):
        segments.extend(_split_tts_segment(segment, max(200, max_body - overhead - 24)))
    requests_ = []
    current = []
    for segment in segments:
        candidate = current + [segment]
        body = _tts_ssml(candidate, voice_id)
        if current and len(body) > max_body:
            request_body = _tts_ssml(current, voice_id)
            requests_.append({
                "body": request_body,
                "content_type": "application/ssml",
                "characters": sum(len(item["text"]) for item in current),
                "languages": tuple(dict.fromkeys(item["language"] for item in current)),
                "text": " ".join(item["text"] for item in current),
            })
            current = [segment]
        else:
            current = candidate
    if current:
        request_body = _tts_ssml(current, voice_id)
        requests_.append({
            "body": request_body,
            "content_type": "application/ssml",
            "characters": sum(len(item["text"]) for item in current),
            "languages": tuple(dict.fromkeys(item["language"] for item in current)),
            "text": " ".join(item["text"] for item in current),
        })
    if any(len(item["body"]) > max_body for item in requests_):
        raise ValueError("SSML request exceeds SaluteSpeech 4000-character limit")
    return requests_

def _tts_spoken_text(text):
    """Convert messenger markup, tables and formulas into pronounceable prose."""
    t = html.unescape(re.sub(r"<[^>]+>", " ", str(text or "")))
    t = re.sub(r"```[a-z]*\n?", "\n", t, flags=re.I)
    t = t.replace("```", "\n").replace("**", "").replace("__", "")
    t = re.sub(r"(?m)^\s*#{1,6}\s*", "", t)
    rows = []
    for line in t.splitlines():
        if re.match(r"^\s*\|?[\s:|-]+\|?\s*$", line) and "|" in line:
            continue
        cells = [c.strip() for c in re.split(r"\t+|\s*\|\s*", line.strip().strip("|")) if c.strip()]
        rows.append(". ".join(cells) if len(cells) > 1 else line)
    t = "\n".join(rows)
    t = re.sub(r"\bBMR\b", "базовый обмен", t, flags=re.I)
    t = re.sub(r"\bTDEE\b", "суточный расход энергии", t, flags=re.I)
    t = re.sub(r"(?<=\d)\.(?=\d)", ",", t)
    t = re.sub(r"(?<=\d)\s*[-–—]\s*(?=\d)", " до ", t)
    t = t.replace("×", " умножить на ").replace("*", " умножить на ")
    t = t.replace("≈", " примерно ").replace("=", " равно ").replace("+", " плюс ")
    t = re.sub(r"(?<!\w)-(?=\s*\d)", " минус ", t)
    t = re.sub(r"(?<=\d)\s*%", " процентов", t)
    t = re.sub(r"\bккал\s*/\s*день\b", "килокалорий в день", t, flags=re.I)
    t = re.sub(r"\bккал\b", "килокалорий", t, flags=re.I)
    t = re.sub(r"\bг\s*/\s*день\b", "граммов в день", t, flags=re.I)
    t = re.sub(r"\s*[•·]\s*", ". ", t)
    t = re.sub(r"[^\w\s.,!?;:。！？，、()«»“”„\"'’‘「」『』&\-–—/%°]", " ", t, flags=re.U)
    t = re.sub(r"\s+", " ", t).strip()
    return t

def tts_chunks(text, limit=None):
    """Return complete spoken chunks; never silently discard the tail."""
    lim = max(200, min(3800, int(TTS_MAXCHARS if limit is None else limit)))
    rest = _tts_spoken_text(text)
    chunks = []
    while rest:
        if len(rest) <= lim:
            chunks.append(rest)
            break
        window = rest[:lim + 1]
        floor = int(lim * 0.55)
        boundaries = [m.end() for m in re.finditer(r"(?<=[.!?])\s+|;\s+|,\s+|\s+", window)]
        cut = max((p for p in boundaries if floor <= p <= lim), default=lim)
        chunks.append(rest[:cut].strip())
        rest = rest[cut:].strip()
    return [chunk for chunk in chunks if chunk]

def _tts_trim(text, limit=None):
    """Prepare one bounded TTS request; multi-part callers should use tts_chunks."""
    lim = TTS_MAXCHARS if limit is None else limit
    t = _tts_spoken_text(text)
    if len(t) <= lim:
        return t
    cut = t[:lim]
    m = max(cut.rfind("."), cut.rfind("!"), cut.rfind("?"))
    return (cut[:m + 1] if m > lim * 0.4 else cut).strip()

def synthesize_request(request_, info=None):
    """Execute one already-bounded SaluteSpeech request."""
    import time as _t, uuid
    if not isinstance(request_, dict) or not request_.get("body"):
        return None
    t0 = _t.time()
    body = str(request_["body"])
    content_type = str(request_.get("content_type") or "application/ssml")
    characters = int(request_.get("characters") or len(request_.get("text") or ""))
    languages = tuple(request_.get("languages") or ())
    tok = _salute_auth()
    if not tok:
        return None
    voice = _salute_voice_id()
    for attempt in (1, 2):
        try:
            with _TTS_PROVIDER_GATE:
                r = _HTTP.post(
                    SALUTE_TTS,
                    params={"format": TTS_FORMAT, "voice": voice},
                    headers={
                        "Authorization": "Bearer " + tok,
                        "Content-Type": content_type,
                        "RqUID": str(uuid.uuid4()),
                    },
                    data=body.encode("utf-8"),
                    timeout=(6, 60),
                    verify=_GIGA_VERIFY,
                )
            if r.status_code == 401 and attempt == 1:
                tok = _salute_auth(force=True)
                if not tok: return None
                continue
            if r.status_code >= 400:
                _SALUTE_ERR["tts"] = "HTTP %s: %s" % (r.status_code, (r.text or "")[:200])
            r.raise_for_status()
            audio = r.content
            _SALUTE_ERR["tts"] = ""
            if isinstance(info, dict):
                info.update(
                    ms=int((_t.time() - t0) * 1000),
                    chars=characters,
                    languages=list(languages),
                    ssml=content_type == "application/ssml",
                )
            _capture_media(
                "salute", SALUTE_VOICE, t0, "success", "tts",
                {"characters": characters, "languages": list(languages), "ssml": True},
            )
            return audio or None
        except Exception as e:
            if not _SALUTE_ERR["tts"]: _SALUTE_ERR["tts"] = str(e)[:200]
            _capture_media(
                "salute", SALUTE_VOICE, t0, "error", "tts",
                {"characters": characters, "languages": list(languages), "ssml": True},
            )
            print("Salute TTS error:", e); return None
    return None

def synthesize(text, info=None):
    """Synthesize one short mono- or multilingual text through SSML."""
    if not text or not str(text).strip():
        return None
    try:
        requests_ = tts_ssml_requests(text)
    except (UnsupportedTTSLanguage, ValueError) as exc:
        _SALUTE_ERR["tts"] = str(exc)[:200]
        return None
    if len(requests_) != 1:
        _SALUTE_ERR["tts"] = "текст требует нескольких TTS-запросов; используй tts_ssml_requests"
        return None
    return synthesize_request(requests_[0], info=info)

def salute_diag():
    """Диагностика голосового контура для админ-команды /voicetest."""
    out = {"key": bool(os.environ.get("SBER_SALUTE_AUTH_KEY") or os.environ.get("SALUTE_SPEECH_CREDENTIALS")),
           "mode": ("speech.giga.chat" if _salute_is_giga() else "smartspeech.sber.ru"), "client": SALUTE_CLIENT,
           "scope": SALUTE_SCOPE, "model": SALUTE_MODEL, "voice": SALUTE_VOICE,
           "tts_languages": sorted(SALUTE_TTS_LANGUAGES),
           "tts_concurrency": _tts_provider_concurrency(),
           "tts_account_limit": _tts_account_limit(),
           "stt_mode": (os.environ.get("AIWA_STT", "auto") or "auto"),
           "oauth_url": SALUTE_OAUTH, "tts_url": SALUTE_TTS, "stt_url": SALUTE_STT,
           "groq": bool(os.environ.get("GROQ_API_KEY"))}
    raw = os.environ.get("SBER_SALUTE_AUTH_KEY") or os.environ.get("SALUTE_SPEECH_CREDENTIALS") or ""
    if raw:
        import base64
        norm, bad = _norm_basic(raw)
        out["key_len"] = len(raw.strip())
        out["key_raw_tail"] = raw.strip()[-4:] if len(raw.strip()) > 8 else "?"
        out["key_form"] = ("передаю как есть" if (norm and re.sub(r"\s+", "", raw.strip().strip('"').strip("'")) == norm)
                           else ("пара id:secret, закодировал сам" if norm else "непонятный: " + str(bad)))
    tok = _salute_auth(force=True)
    out["auth"] = bool(tok); out["auth_err"] = _SALUTE_ERR["auth"]; out["auth_form"] = _SALUTE_ERR.get("form", "")
    if tok:
        a = synthesize("Проверка связи. Айва слышит и говорит.")
        out["tts_bytes"] = len(a or b""); out["tts_err"] = _SALUTE_ERR["tts"]
    return out

def transcribe(audio_bytes, filename="voice.ogg", info=None):
    """Распознавание голосового. Провайдер выбирается AIWA_STT: salute | groq | auto (по умолчанию).
    В auto сначала пробуем SaluteSpeech (тот же контур, что GigaChat), при неудаче или неподдержанном
    формате (webm из мини-аппа) уходим на Groq Whisper. В info кладём, кто реально распознал — для аналитики."""
    import time as _t
    ext = (filename.rsplit(".", 1)[-1] if "." in filename else "ogg").lower()
    mode = (os.environ.get("AIWA_STT", "auto") or "auto").lower()
    t0 = _t.time()
    used = None; txt = None
    if mode in ("auto", "salute", "salutespeech", "sber"):
        txt = _transcribe_salute(audio_bytes, ext)
        if txt: used = "salute"
    if not txt and mode != "salute":
        txt = _transcribe_groq(audio_bytes, filename, ext)
        if txt: used = "groq"
    if isinstance(info, dict):
        info["provider"] = used or "none"
        info["ms"] = int((_t.time() - t0) * 1000)
    model = SALUTE_MODEL if used == "salute" else ("whisper-large-v3-turbo" if used == "groq" else None)
    _capture_media(used or "none", model, t0, "success" if txt else "error", "stt",
                   {"audio_bytes": len(audio_bytes or b""), "format": ext})
    return txt
