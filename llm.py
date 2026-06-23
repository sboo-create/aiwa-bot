# -*- coding: utf-8 -*-
"""Сводка, ответы и динамические саджесты через GigaChat/LiteLLM."""
import os, re, json, requests, unicodedata, threading

PROVIDER = os.environ.get("AIWA_PROVIDER", "litellm").lower()
GIGA_MODEL = os.environ.get("GIGACHAT_MODEL", "GigaChat-2")
GIGA_SCOPE = os.environ.get("GIGACHAT_SCOPE", "GIGACHAT_API_PERS")
GIGA_OAUTH = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"
GIGA_CHAT = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions"
_GIGA_CA = os.environ.get("GIGACHAT_CA_BUNDLE_FILE")
_GIGA_VERIFY = _GIGA_CA if _GIGA_CA else False
if _GIGA_VERIFY is False:
    try:
        import urllib3; urllib3.disable_warnings()
    except Exception: pass
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
        r = requests.post(GIGA_OAUTH,
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
        try:
            r = requests.post(GIGA_CHAT,
                headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json", "Accept": "application/json"},
                json={"model": GIGA_MODEL, "messages": messages, "temperature": max(0.01, temperature), "max_tokens": max_tokens},
                timeout=(6, 30), verify=_GIGA_VERIFY)
            if r.status_code == 401:
                _giga_tok["token"] = None; tok = _giga_auth()
                if not tok: return None
                continue
            if r.status_code == 429:
                _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            r.raise_for_status(); data = r.json()
            if usage is not None:
                usage.append(int(data.get("usage", {}).get("total_tokens", 0)))
            txt = (data["choices"][0]["message"]["content"] or "").strip()
            txt = re.sub(r"<think>.*?</think>", "", txt, flags=re.S).strip()
            return txt or None
        except Exception as e:
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
    raw = os.environ.get("GIGACHAT_STAND_SSL_VERIFY") or os.environ.get("GIGACHAT_SSL_VERIFY") or "false"
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
            r = requests.post(url, headers=headers, timeout=(6, 30), verify=_stand_verify())
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
            r = requests.post(_stand_chat_url(), headers=headers,
                json=_stand_payload(messages, max_tokens, temperature),
                timeout=(6, float(os.environ.get("GIGACHAT_STAND_TIMEOUT") or os.environ.get("GIGACHAT_CHAT_TIMEOUT_SECONDS") or "60")),
                verify=_stand_verify())
            if r.status_code == 401:
                _stand_tok["token"] = None
                if i < attempts - 1:
                    continue
            if r.status_code == 429:
                _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            if r.status_code >= 400:
                print("GigaStand chat error:", r.status_code, (r.text or "")[:500])
                if i < attempts - 1:
                    _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
                return None
            data = r.json()
            if usage is not None:
                usage.append(int(data.get("usage", {}).get("total_tokens", 0)))
            txt = _response_text(data)
            txt = (txt or "").strip()
            txt = re.sub(r"<think>.*?</think>", "", txt, flags=re.S).strip()
            return txt or None
        except Exception as e:
            print("GigaStand chat error:", e)
            if i < attempts - 1:
                _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            return None
    return None

SYSTEM = (
    "Ты — AIWA, ИИ-ассистент женского здоровья по циклу. Пиши конкретно и тепло, на русском, без воды и без AI-флёра. "
    "Опирайся на физиологию цикла и рекомендации гинекологов и эндокринологов. "
    "Твоё имя - Айва. Если пользовательница начинает сообщение с «Айва», воспринимай это как обращение к тебе, а не как просьбу рассказать о продукте. "
    "Если спрашивают, на чём ты работаешь, какая модель тебя питает, отвечай, что ты работаешь на GigaChat. "
    "Ты сама ведёшь календарь цикла и отмечаешь месячные прямо в этом боте (кнопка Отметить месячные или команда /period). НИКОГДА не советуй пользователю сторонние приложения, календари или бумажные дневники для отслеживания цикла, всё это делается здесь, у тебя. "
    "ОЧЕНЬ ВАЖНО: ты НЕ можешь сама вносить, изменять или удалять данные (даты месячных, длину цикла, профиль, время рассылки, отметки) через чат, у тебя нет такой возможности. Никогда не пиши, что ты «добавила», «внесла», «изменила», «удалила» или «отметила» что-то. Если просят это сделать, честно объясни, ГДЕ это сделать: отметить месячные — кнопка «Отметить месячные» в меню или тап по дате в календаре приложения; изменить рост/вес/возраст — команда /profile; добавить историю циклов — «Изменить данные» → «История циклов». "
    "Команды бота, существуют только эти: /menu, /today, /checkin, /period, /calendar, /report, /partner, /unlink, /addcycles, /profile, /app, /time, /about, /id, /stop. Никогда не выдумывай других команд (например, нет команды /settings). Рост, вес и возраст меняются командой /profile. "
    "Формат строго для мессенджера: обычный текст без markdown. НИКОГДА не используй символы #, *, _, обратные кавычки, "
    "markdown-таблицы и вертикальную черту |. Не используй длинные тире, ставь обычный дефис, запятую или скобки. "
    "Каждый смысловой блок начинай с эмодзи-заголовка (🌙 фаза, 💛 самочувствие, 🍽 питание, 🏋️ нагрузка, 📅 прогноз). "
    "Перечисления давай короткими строками, каждая с «• ». "
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

def split_followups(text):
    """Достаёт из ответа строку 'СЛЕДУЮЩИЕ: q1 ;; q2' и возвращает (чистый текст, [вопросы])."""
    if not text:
        return text, []
    m = re.search(r"(?im)^\s*[•\-\*]?\s*СЛЕДУЮЩИЕ\s*:?\s*(.+)$", text)
    if not m:
        return text.strip(), []
    qs = [q.strip(" •-–—").strip() for q in re.split(r";;|\||,\s+(?=[А-ЯA-Z])", m.group(1)) if q.strip()]
    qs = [q for q in qs if 3 <= len(q) <= 70][:2]
    return text[:m.start()].rstrip(), qs

def _clean(out, fallback):
    r = strip_md(out) if out else ""
    return r if r and r.strip() else fallback

def strip_md(t):
    """Убираем markdown, который Telegram не рендерит, и длинные тире (SB их не любит)."""
    if not t:
        return t
    t = t.replace("\r", "")
    t = re.sub(r"`{1,3}", "", t)
    t = re.sub(r"\*\*(.+?)\*\*", r"\1", t)
    t = re.sub(r"\*(.+?)\*", r"\1", t)
    t = re.sub(r"__(.+?)__", r"\1", t)
    out = []
    for ln in t.split("\n"):
        s = ln.rstrip()
        if re.match(r"^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?\s*$", s):
            continue
        if "|" in s and "СЛЕДУЮЩИЕ" not in s.upper():
            cells = [c.strip() for c in s.strip().strip("|").split("|") if c.strip()]
            s = "• " + ", ".join(cells) if cells else s
        s = re.sub(r"^\s*#{1,6}\s*", "", s)
        s = re.sub(r"^(\s*)[-*]\s+", r"\1• ", s)
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


PROXY_URL = os.environ.get("LITELLM_URL", "https://94.139.253.119:8002/litellm/v1/chat/completions")
PROXY_MODEL = os.environ.get("LITELLM_MODEL", "gigachat-3-ultra")
FALLBACK_PROXY_URL = "https://104.168.54.196:4000/litellm/v1/messages?beta=true"
def _proxy_is_messages(url=None):
    return "/messages" in ((url or PROXY_URL) or "")

def _proxy_payload(messages, max_tokens, temperature, url=None, model=None):
    model = model or PROXY_MODEL
    if not _proxy_is_messages(url):
        return {"model": model, "messages": messages, "temperature": max(0.01, temperature), "max_tokens": max_tokens}
    system = "\n\n".join((m.get("content") or "") for m in messages if m.get("role") == "system").strip()
    mm = []
    for m in messages:
        role = m.get("role")
        if role == "system":
            continue
        if role not in ("user", "assistant"):
            role = "user"
        mm.append({"role": role, "content": m.get("content") or ""})
    payload = {"model": model, "messages": mm, "temperature": max(0.01, temperature), "max_tokens": max_tokens}
    if system:
        payload["system"] = system
    return payload

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
    key = os.environ.get("LITELLM_KEY"); xkey = os.environ.get("LITELLM_XKEY")
    cfgs = [{"name": "litellm", "url": PROXY_URL, "model": PROXY_MODEL, "key": key, "xkey": xkey}]
    fb_key = os.environ.get("LITELLM_FALLBACK_KEY") or os.environ.get("AIWA_LLM_FALLBACK_KEY")
    fb_xkey = os.environ.get("LITELLM_FALLBACK_XKEY") or os.environ.get("AIWA_LLM_FALLBACK_XKEY")
    fb_url = os.environ.get("LITELLM_FALLBACK_URL") or os.environ.get("AIWA_LLM_FALLBACK_URL") or FALLBACK_PROXY_URL
    if fb_key or fb_xkey:
        cfgs.append({
            "name": "litellm_fallback",
            "url": fb_url,
            "model": os.environ.get("LITELLM_FALLBACK_MODEL") or os.environ.get("AIWA_LLM_FALLBACK_MODEL") or PROXY_MODEL,
            "key": fb_key,
            "xkey": fb_xkey,
        })
    return [c for c in cfgs if c.get("url") and (c.get("key") or c.get("xkey"))]

def _call_proxy_one(cfg, messages, max_tokens, temperature, usage, attempts=4):
    import time as _t
    headers = {"Content-Type": "application/json"}
    if cfg.get("key"): headers["Authorization"] = f"Bearer {cfg['key']}"
    if cfg.get("xkey"): headers["X-API-Key"] = cfg["xkey"]
    wait = 1.5
    for i in range(attempts):
        try:
            r = requests.post(cfg["url"], headers=headers,
                json=_proxy_payload(messages, max_tokens, temperature, cfg["url"], cfg.get("model")),
                timeout=(6, 30), verify=False)
            if r.status_code == 429:
                _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            if r.status_code >= 400:
                print("Proxy error:", cfg.get("name"), r.status_code, (r.text or "")[:500])
                if i < attempts - 1: _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
                return None
            data = r.json()
            if usage is not None:
                usage.append(int(data.get("usage", {}).get("total_tokens", 0)))
            txt = _response_text(data)
            txt = (txt or "").strip()
            txt = re.sub(r"<think>.*?</think>", "", txt, flags=re.S).strip()
            return txt or None
        except Exception as e:
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

def _call_impl(messages, max_tokens=1100, temperature=0.45, usage=None, attempts=4):
    """Единая точка вызова модели. Движок выбирается переменной AIWA_PROVIDER."""
    aliases = {"proxy": "litellm", "stand": "gigastand", "direct": "gigastand", "adapter": "gigastand"}
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
        if not out and len(str(messages)) > 3000:
            print("LLM compact retry")
            out = _call_impl(_compact_messages(messages), min(max_tokens, 650), min(temperature, 0.35), usage, 1)
        return out
    finally:
        _LLM_SEM.release()
        STATS["ms"] += int((_tt.time() - t1) * 1000)
        if not out: STATS["err"] += 1
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


def build_prompt(st, modules):
    p = [f"Данные: {_ctx(st)}", f"Сегодняшний акцент дня: {_focus(st)}.", "",
         "Собери короткую утреннюю сводку из блоков. Каждый блок начинай с эмодзи-заголовка на отдельной строке, "
         "содержимое давай короткими пунктами, каждый пункт с новой строки и с «• ». Конкретика и числа, без воды."]
    if "phase" in modules:    p.append("Блок «🌙 Фаза и прогноз»: точный день и под-фаза, что это значит, сколько дней до месячных.")
    if "general" in modules:  p.append("Блок «💛 Тело сегодня»: какой гормон ведёт и как это отражается на энергии и самочувствии именно в этот день.")
    if "food" in modules:     p.append("Блок «🍽 Питание»: что с аппетитом в эту под-фазу, и 3-4 продукта отдельными пунктами в виде «• продукт - зачем (нутриент и эффект)», с привязкой к акценту дня.")
    if "training" in modules: p.append("Блок «🏋️ Нагрузка»: какая тренировка уместна сегодня и обязательно ПОЧЕМУ - свяжи с фазой и гормонами (например, в фолликулярной выше чувствительность к инсулину, поэтому силовые; в поздней лютеиновой - восстановление). 2-3 пункта.")
    p.append("Только обычный текст на русском, без markdown, без символов # * |, без длинных тире. Сделай акцент дня заметным, не повторяй формулировки изо дня в день, без приветствий.")
    return "\n".join(p)


def generate_summary(st, modules, hint=None, usage=None):
    prompt = build_prompt(st, modules)
    if hint:
        prompt += f"\nУчитывай вчерашний чек-ин пользовательницы: {hint}. Свяжи рекомендации с этим."
    out = _call([{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}], max_tokens=700, usage=usage)
    return _clean(out, fallback_summary(st, modules))


_ACT = {1: "минимальная", 2: "лёгкая", 3: "умеренная", 4: "высокая", 5: "очень высокая"}
def _ctx_note(st, profile):
    note = ""
    if st:
        ov = max(12, st['cycle_len'] - 14)
        note = (f"Данные пользовательницы по циклу: сегодня день {st['day']} из {st['cycle_len']}, фаза {st['subphase']} {st['phase_ru'].lower()}. "
                f"До следующих месячных примерно {st['days_to_next']} дн. Овуляция ориентировочно на {ov} день цикла, фертильное окно примерно за 5 дней до овуляции. "
                f"Когда спрашивают про овуляцию, фертильность, день цикла или сколько до месячных - отвечай этими конкретными числами про неё, а не общими словами.")
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

def answer_question(st, question, profile=None, history=None, usage=None):
    note = _ctx_note(st, profile)
    msgs = [{"role": "system", "content": SYSTEM + (("\n\n" + note) if note else "")}]
    if history: msgs += list(history)
    msgs.append({"role": "user", "content": (
        "Дай подробный, качественный ответ с медицинским обоснованием, как грамотный и тёплый гинеколог простыми словами. "
        "Структура: начни с уместного эмодзи, дальше эмодзи-подзаголовки разделов и пункты с «• », давай конкретику (продукты, нормы, числа). Безрецептурные препараты можно назвать, но без конкретных доз. "
        "Если вопрос про цикл, беременность, гормоны, фертильность, питание, тренировки или самочувствие - СНАЧАЛА коротко привяжи к её данным (день цикла, фаза, до месячных, день овуляции), потом разверни тему по существу. "
        "Если вопрос общий (фильмы, быт) - ответь развёрнуто по теме, цикл не притягивай. "
        "Не здоровайся, если пользовательница не поздоровалась прямо сейчас. Если есть история диалога, отвечай как продолжение и учитывай предыдущие реплики. "
        "Пиши живо и тепло, без воды и канцелярита. Уложись примерно в 3000 знаков и ОБЯЗАТЕЛЬНО заверши мысль, не обрывай предложение на полуслове. Только русский, без markdown. "
        "В самом конце добавь отдельной строкой ровно так: СЛЕДУЮЩИЕ: вопрос ;; вопрос — два релевантных вопроса от лица пользовательницы, ОЧЕНЬ КОРОТКО, по 2-4 слова. Вопрос: " + question)})
    out = _call(msgs, max_tokens=1100, temperature=0.35, usage=usage)
    return _clean(out, "Я вижу вопрос, но модель сейчас не вернула ответ. Попробуй ещё раз через минуту.")


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
        "🧬 Гормоны и физиология",
    ]
    for h in p.get("hormones", []):
        lines.append(f"• {h}")
    lines += [
        "",
        "📌 Почему такая нагрузка",
        p["why"],
        "",
        "✅ Что выбрать",
    ]
    for o in p["options"]:
        lines.append(f"• {o['name']}: {o['benefit']}. Как: {o['how']}.")
    lines += ["", "⚠️ Сегодня лучше избегать", f"• {p['avoid']}", "", "💧 Восстановление", f"• {p['recovery']}"]
    lines.append("")
    lines.append("СЛЕДУЮЩИЕ: А если мало сил? ;; Что после тренировки?")
    return "\n".join(lines)

def explain_section(st, key, usage=None):
    if key == "training":
        return training_text(st)
    base = (f"Её фаза: {st['subphase']} {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}, "
            f"до месячных ~{st['days_to_next']} дн.")
    if key == "food":
        q = ("Ответь КОМПАКТНО, без воды. Сначала 2 предложения, почему эти нутриенты важны в эту под-фазу. "
             "Затем 4 продукта строками «• продукт - зачем». Затем одна строка с идеей завтрака, обеда и ужина. Начни строкой «🍽 Питание сегодня».")
    else:
        return section_text(st, key)
    msgs = [{"role": "system", "content": SYSTEM},
            {"role": "user", "content": base + "\n\n" + q + " Развёрнуто и конкретно, с числами где уместно, но без воды. Только обычный текст без markdown. "
            "В самом конце добавь отдельной строкой ровно так: СЛЕДУЮЩИЕ: вопрос ;; вопрос — два релевантных вопроса по теме, ОЧЕНЬ КОРОТКО, по 2-4 слова."}]
    out = _call(msgs, max_tokens=750, temperature=0.4, usage=usage)
    return _clean(out, _section_fallback(st, key))

def _section_fallback(st, key):
    c = st["content"]
    head = "🍽 Питание сегодня" if key == "food" else "🏋️ Нагрузка сегодня"
    body = c["food"] if key == "food" else c["training"]
    return (f"{head}, день {st['day']} из {st['cycle_len']}, {st['subphase']} {st['phase_ru'].lower()} фаза.\n"
            f"{body}\n\nПереспроси, и я соберу подробный разбор по этой фазе.")


def followups(st, basis_q, basis_a, usage=None):
    # случайные саджесты по фазе: разные каждый раз, без обращения к модели
    import random
    pool = [t for _, t in _static(st)]; random.shuffle(pool)
    return pool[:2]


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
              "Строго такая структура, каждый блок с эмодзи-заголовком на отдельной строке:\n"
              "💛 Что с ней сегодня\n"
              "• 2 пункта: день цикла, ведущие гормоны, возможное самочувствие.\n"
              "🤝 Как поддержать\n"
              "• 3 конкретных действия: что сказать, что сделать, чего не требовать.\n"
              "🍽 Что предложить\n"
              "• 2-3 доступные идеи еды/напитков под фазу и симптомы, без сложных рецептов.\n"
              "🧠 Факт дня\n"
              "• Напиши настоящий интересный факт о женском здоровье, гормонах, цикле или ПМС в кавычках «...». Не копируй текст задания.\n"
              "📌 На что обратить внимание\n"
              "• 1 короткий пункт про тревожные симптомы или мягкое наблюдение, без диагнозов.\n"
              "Объём 900-1300 знаков. Без markdown, без длинных тире, только русский.")
    out = _call([{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}], max_tokens=850, temperature=0.45, usage=usage)
    return _clean(out, None)

def partner_answer(st, question, hint=None, usage=None):
    h = f" Сегодня она отмечала: {hint}." if hint else ""
    msgs = [{"role": "system", "content": SYSTEM},
            {"role": "user", "content": (f"К тебе обращается ПАРТНЁР женщины (её парень). Она сейчас: день {st['day']} из {st['cycle_len']}, "
             f"{st['subphase']} {st['phase_ru'].lower()} фаза, до месячных примерно {st['days_to_next']} дн.{h}\n\n"
             "Ответь на его вопрос конкретно и тепло: как именно ей помочь и поддержать с учётом фазы, какие действия и что можно купить. "
             "Дай короткое объяснение через гормоны или физиологию, чтобы ему было интересно и понятно, но не перегружай. "
             "Если уместно, добавь строку «🧠 Факт: ...» с одним полезным фактом о цикле, ПМС, овуляции, прогестероне, эстрогене или самочувствии. "
             "Без воды, только русский, без markdown, без длинных тире. Вопрос: " + question)}]
    out = _call(msgs, max_tokens=650, temperature=0.38, usage=usage)
    return _clean(out, "Поддержи её вниманием и заботой, спроси, чего ей сейчас хочется.")

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
        "Конкретно, без воды, только русский, без markdown.")
    out = _call([{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}], max_tokens=600, temperature=0.3, usage=usage)
    return _clean(out, None)

def general_answer(profile, mode, question, hint=None, history=None, usage=None):
    h = f" {hint}." if hint else ""
    msgs = [{"role": "system", "content": SYSTEM + "\n\n" + _gen_ctx(profile, mode) + h}]
    if history: msgs += list(history)
    msgs.append({"role": "user", "content": (
        "Дай подробный, качественный ответ с медицинским обоснованием, простыми словами, с учётом возраста, режима и контекста диалога. "
        "Структура: начни с уместного эмодзи, дальше эмодзи-подзаголовки разделов и пункты с «• », конкретика (продукты, действия, числа, калории по росту/весу/возрасту). "
        "Если уместно по возрасту или режиму, добавь, на что обратить внимание и когда к врачу. "
        "Не здоровайся, если пользовательница не поздоровалась прямо сейчас. Если есть история диалога, отвечай как продолжение и учитывай предыдущие реплики. "
        "Пиши живо и тепло, без воды. Уложись примерно в 3000 знаков и ОБЯЗАТЕЛЬНО заверши мысль, не обрывай на полуслове. Только русский, без markdown. "
        "ВАЖНО: у этого человека фаза цикла НЕ отслеживается, поэтому НЕ упоминай фазы менструального цикла (фолликулярную, лютеиновую, овуляторную, менструальную) и не привязывай советы к дню цикла. "
        "В самом конце добавь отдельной строкой ровно так: СЛЕДУЮЩИЕ: вопрос ;; вопрос — два релевантных вопроса от лица пользовательницы, ОЧЕНЬ КОРОТКО, по 2-4 слова. Вопрос: " + question)})
    out = _call(msgs, max_tokens=1100, temperature=0.35, usage=usage)
    return _clean(out, "Я вижу вопрос, но модель сейчас не вернула ответ. Попробуй ещё раз через минуту.")

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
def menu_today(st, profile=None, target=None, usage=None):
    # Без диет-ограничений отдаём готовый набор под фазу (без обращения к модели, экономим лимит).
    has_diet = bool(profile and (profile.get("diet") or profile.get("diet_note")))
    if not has_diet:
        import datetime as _dt
        seed = _dt.date.today().toordinal()
        phase = st["phase"] if st["phase"] in MEAL_POOLS else "follicular"
        pools = MEAL_POOLS[phase]; times = {"b": "08:00", "l": "13:00", "s": "16:00", "d": "20:00"}
        meals = []
        for idx, k in enumerate(("b", "l", "s", "d")):
            opt = pools[k][(seed + idx) % len(pools[k])]
            meals.append({"time": times[k], "dish": opt[0], "note": opt[1], "kcal": opt[2]})
        return {"macros": dict(CURATED_MACROS.get(phase, CURATED_MACROS["follicular"])), "meals": meals}
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
              " Блюда короткие, до 5 слов. Ответь строго JSON без обрамления: "
              '{"macros":{"protein":"NN г","fat":"NN г","carbs":"NNN г"},'
              '"meals":[{"time":"08:00","dish":"...","note":"нутриент","kcal":"NNN ккал"}]}')
    out = _call([{"role": "system", "content": "Ты нутрициолог femtech-приложения. Отвечай строго JSON, по-русски."},
                 {"role": "user", "content": prompt}], max_tokens=600, usage=usage)
    if out:
        try:
            data = json.loads(out[out.find("{"):out.rfind("}") + 1])
            if data.get("meals"):
                return data
        except Exception:
            pass
    import copy
    return copy.deepcopy(CURATED_MENU.get(st["phase"], CURATED_MENU["follicular"]))


def replace_meal(st, slot=0, avoid=None, profile=None, target=None, usage=None):
    slots = ("b", "l", "s", "d")
    times = {"b": "08:00", "l": "13:00", "s": "16:00", "d": "20:00"}
    try:
        idx = max(0, min(3, int(slot)))
    except Exception:
        idx = 0
    k = slots[idx]
    has_diet = bool(profile and (profile.get("diet") or profile.get("diet_note")))
    if has_diet:
        extra = ""
        parts = [DIET_RU.get(x, x) for x in (profile.get("diet").split(",") if profile and profile.get("diet") else []) if x]
        if profile and profile.get("diet_note"): parts.append(profile["diet_note"])
        if parts: extra += f" Ограничения: {', '.join(parts)}."
        if target:
            extra += f" Ориентир дня: {target[0]} ккал, белок {target[1]} г, жиры {target[2]} г, углеводы {target[3]} г."
        prompt = (f"Замени один приём пищи в меню femtech-приложения: слот {times[k]}, "
                  f"{st.get('subphase','')} {st.get('phase_ru','').lower()} фаза, день {st.get('day','')} цикла. "
                  f"Не повторяй блюдо: {avoid or 'нет'}." + extra +
                  " Блюдо должно быть обычным для России, простым, белковым, без тофу, батата, киноа, протеиновых порошков и странных сочетаний. "
                  'Ответь строго JSON: {"time":"08:00","dish":"...","note":"нутриент","kcal":"NNN ккал"}')
        out = _call([{"role": "system", "content": "Ты нутрициолог femtech-приложения. Отвечай строго JSON, по-русски."},
                     {"role": "user", "content": prompt}], max_tokens=220, temperature=0.2, usage=usage)
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
    for off in range(len(pool)):
        opt = pool[(seed + off) % len(pool)]
        if opt[0].strip().lower() != avoid_s:
            return {"time": times[k], "dish": opt[0], "note": opt[1], "kcal": opt[2]}
    opt = pool[seed % len(pool)]
    return {"time": times[k], "dish": opt[0], "note": opt[1], "kcal": opt[2]}



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


def transcribe(audio_bytes, filename="voice.ogg"):
    """Распознавание голосового через Groq Whisper."""
    key = os.environ.get("GROQ_API_KEY")
    if not key:
        return None
    try:
        r = requests.post("https://api.groq.com/openai/v1/audio/transcriptions",
            headers={"Authorization": f"Bearer {key}"},
            files={"file": (filename, audio_bytes, "audio/ogg")},
            data={"model": "whisper-large-v3-turbo", "language": "ru"}, timeout=60)
        r.raise_for_status()
        return (r.json().get("text") or "").strip() or None
    except Exception as e:
        print("STT error:", e); return None
