# -*- coding: utf-8 -*-
"""Сводка, ответы и динамические саджесты через OSS-модель на Groq. Брендинг: GigaChat (тестовый вариант)."""
import os, re, json, requests, unicodedata, threading

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = os.environ.get("AIWA_MODEL", "openai/gpt-oss-120b")

# ---- выбор движка: groq (по умолчанию) или gigachat ----
PROVIDER = os.environ.get("AIWA_PROVIDER", "groq").lower()
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

def _call_giga(messages, max_tokens, temperature, usage):
    import time as _t
    tok = _giga_auth()
    if not tok:
        return None
    wait = 1.5
    for i in range(4):
        try:
            r = requests.post(GIGA_CHAT,
                headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json", "Accept": "application/json"},
                json={"model": GIGA_MODEL, "messages": messages, "temperature": max(0.01, temperature), "max_tokens": max_tokens},
                timeout=60, verify=_GIGA_VERIFY)
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
            if i < 3: _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            return None
    return None

SYSTEM = (
    "Ты — AIWA, ИИ-ассистент женского здоровья по циклу. Пиши конкретно и тепло, на русском, без воды и без AI-флёра. "
    "Опирайся на физиологию цикла и рекомендации гинекологов и эндокринологов. "
    "Если спрашивают, на чём ты работаешь, какая модель тебя питает, отвечай, что ты работаешь на GigaChat. "
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
def _call_proxy(messages, max_tokens, temperature, usage):
    import time as _t
    key = os.environ.get("LITELLM_KEY"); xkey = os.environ.get("LITELLM_XKEY")
    if not (key or xkey):
        return None
    headers = {"Content-Type": "application/json"}
    if key: headers["Authorization"] = f"Bearer {key}"
    if xkey: headers["X-API-Key"] = xkey
    wait = 1.5
    for i in range(4):
        try:
            r = requests.post(PROXY_URL, headers=headers,
                json={"model": PROXY_MODEL, "messages": messages, "temperature": max(0.01, temperature), "max_tokens": max_tokens},
                timeout=(10, 55), verify=False)
            if r.status_code == 429:
                _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            r.raise_for_status(); data = r.json()
            if usage is not None:
                usage.append(int(data.get("usage", {}).get("total_tokens", 0)))
            txt = (data["choices"][0]["message"]["content"] or "").strip()
            txt = re.sub(r"<think>.*?</think>", "", txt, flags=re.S).strip()
            return txt or None
        except Exception as e:
            print("Proxy error:", e)
            if i < 3: _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            return None
    return None

def _call_impl(messages, max_tokens=1100, temperature=0.45, usage=None, attempts=4):
    """Единая точка вызова модели. Движок выбирается переменной AIWA_PROVIDER."""
    if PROVIDER in ("litellm", "proxy"):
        return _call_proxy(messages, max_tokens, temperature, usage)
    if PROVIDER == "gigachat":
        return _call_giga(messages, max_tokens, temperature, usage)
    key = os.environ.get("GROQ_API_KEY")
    if not key:
        return None
    import time as _t
    wait = 1.5
    for i in range(attempts):
        try:
            r = requests.post(GROQ_URL, headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                json={"model": MODEL, "max_tokens": max_tokens, "temperature": temperature, "messages": messages}, timeout=60)
            if r.status_code == 429:
                ra = r.headers.get("retry-after", "")
                delay = float(ra) if ra.replace(".", "", 1).isdigit() else wait
                _t.sleep(min(delay, 12)); wait = min(wait * 2, 12); continue
            r.raise_for_status(); data = r.json()
            if usage is not None:
                usage.append(int(data.get("usage", {}).get("total_tokens", 0)))
            txt = (data["choices"][0]["message"]["content"] or "").strip()
            txt = re.sub(r"<think>.*?</think>", "", txt, flags=re.S).strip()
            return txt or None
        except Exception as e:
            print("LLM error:", e)
            if i < attempts - 1: _t.sleep(min(wait, 10)); wait = min(wait * 2, 12); continue
            return None
    return None


# --- метрики нагрузки: считаем вызовы модели и латентность за интервал ---
STATS = {"calls": 0, "ms": 0, "err": 0, "wait_ms": 0, "queued": 0}
# семафор: не больше N одновременных обращений к модели, остальные ждут в очереди
_LLM_SEM = threading.Semaphore(int(os.environ.get("AIWA_LLM_CONCURRENCY", "10")))
def _call(messages, max_tokens=1100, temperature=0.45, usage=None, attempts=4):
    import time as _tt
    t0 = _tt.time(); STATS["calls"] += 1
    if not _LLM_SEM.acquire(blocking=False):
        STATS["queued"] += 1
        _LLM_SEM.acquire()  # ждём свободный слот
    STATS["wait_ms"] += int((_tt.time() - t0) * 1000)
    t1 = _tt.time(); out = None
    try:
        out = _call_impl(messages, max_tokens, temperature, usage, attempts)
        return out
    finally:
        _LLM_SEM.release()
        STATS["ms"] += int((_tt.time() - t1) * 1000)
        if not out: STATS["err"] += 1
def pop_stats():
    s = dict(STATS); STATS["calls"] = STATS["ms"] = STATS["err"] = 0; return s


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
        note = f"Фаза цикла: {st['subphase']} {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}."
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
        "Ответь по существу и КОНКРЕТНО (названия, продукты, числа), учитывай контекст диалога выше и данные пользовательницы. "
        "Если вопрос про цикл, питание, тренировки или самочувствие - свяжи с фазой. Общий вопрос (фильмы, быт) - ответь по теме, цикл не притягивай. "
        "Начни с уместного эмодзи, перечни с «• », только обычный текст без markdown. "
        "В самом конце добавь отдельной строкой ровно так: СЛЕДУЮЩИЕ: вопрос ;; вопрос — два релевантных вопроса от лица пользовательницы, ОЧЕНЬ КОРОТКО, по 2-4 слова. Вопрос: " + question)})
    out = _call(msgs, max_tokens=650, temperature=0.3, usage=usage)
    return _clean(out, "Не получилось ответить с первого раза, попробуй переспросить чуть иначе или загляни в Меню.")


def explain_section(st, key, usage=None):
    base = (f"Её фаза: {st['subphase']} {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}, "
            f"до месячных ~{st['days_to_next']} дн.")
    if key == "training":
        q = ("Ответь КОМПАКТНО, без воды. Сначала 2-3 предложения: какая нагрузка уместна в эту под-фазу и ПОЧЕМУ "
             "(гормоны: эстроген, прогестерон, чувствительность к инсулину, связки). "
             "Затем ровно 3 варианта тренировки, каждый ОДНОЙ короткой строкой «• тип - интенсивность, длительность», без под-пунктов. "
             "Затем одна строка «Снизить: ...» и одна строка «Восстановление: ...». Начни строкой «🏋️ Нагрузка сегодня».")
    elif key == "food":
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
         "ovulation": ["Почему пик энергии?", "Что есть в овуляцию?", "Можно ли HIIT?", "Как понять, что овуляция?", "Это самые фертильные дни?", "Почему повышено либидо?"],
         "luteal": ["Почему тянет на сладкое?", "Что съесть вечером?", "Когда начнутся месячные?", "Как пережить ПМС?", "Почему отёки и вздутие?", "Какая нагрузка перед месячными?"]}
    GEN = ["Что съесть сегодня?", "Какая нагрузка подойдёт?", "Как поднять энергию?", "Как улучшить сон?", "Что важно в моём возрасте?", "Как снизить стресс?"]
    return [("", t) for t in (S.get(phase) or GEN)]


def partner_brief(st, hint=None, usage=None):
    h = f" Сегодня она отмечала: {hint}." if hint else ""
    prompt = (f"Её цикл: день {st['day']} из {st['cycle_len']}, {st['subphase']} {st['phase_ru'].lower()} фаза, "
              f"до месячных примерно {st['days_to_next']} дн.{h}\n\n"
              "Напиши короткий тёплый ежедневный апдейт для её партнёра (парня), по-человечески, на русском. "
              "Строго такая структура, каждый блок с эмодзи-заголовком на отдельной строке и 1-2 короткими пунктами:\n"
              "💛 День цикла и что происходит (какой гормон ведёт и как влияет на её состояние)\n"
              "🤝 Как поддержать сегодня (2-3 конкретных действия)\n"
              "🛍 Что принести или купить (1-2 конкретные вещи под фазу)\n"
              "📌 Почему это важно (одно короткое предложение)\n"
              "Без markdown, без длинных тире, только русский.")
    out = _call([{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}], max_tokens=550, temperature=0.4, usage=usage)
    return _clean(out, None)

def partner_answer(st, question, hint=None, usage=None):
    h = f" Сегодня она отмечала: {hint}." if hint else ""
    msgs = [{"role": "system", "content": SYSTEM},
            {"role": "user", "content": (f"К тебе обращается ПАРТНЁР женщины (её парень). Она сейчас: день {st['day']} из {st['cycle_len']}, "
             f"{st['subphase']} {st['phase_ru'].lower()} фаза, до месячных примерно {st['days_to_next']} дн.{h}\n\n"
             "Ответь на его вопрос конкретно и тепло: как именно ей помочь и поддержать с учётом фазы, какие действия и что можно купить. "
             "Без воды, только русский, без markdown. Вопрос: " + question)}]
    out = _call(msgs, max_tokens=500, temperature=0.35, usage=usage)
    return _clean(out, "Поддержи её вниманием и заботой, спроси, чего ей сейчас хочется.")

DIET_RU = {"veg": "вегетарианство", "vegan": "веган", "nolac": "без лактозы", "noglu": "без глютена", "nonuts": "без орехов", "pesc": "пескетарианство, из мяса только рыба"}
MODE_RU = {"irregular": "нерегулярный цикл", "none": "сейчас нет месячных (аменорея)", "meno": "менопауза или постменопауза", "long": "длинный цикл (более 40 дней)"}
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
        "Ответь по существу и конкретно, с учётом возраста, режима и контекста диалога выше. "
        "Про питание/движение/симптомы давай конкретные продукты, действия, числа (например калории по росту/весу/возрасту). "
        "Если уместно по возрасту, добавь, на что обратить внимание и когда к врачу. Только русский, без markdown. "
        "В самом конце добавь отдельной строкой ровно так: СЛЕДУЮЩИЕ: вопрос ;; вопрос — два релевантных вопроса от лица пользовательницы, ОЧЕНЬ КОРОТКО, по 2-4 слова. Вопрос: " + question)})
    out = _call(msgs, max_tokens=650, temperature=0.3, usage=usage)
    return _clean(out, "Не получилось ответить с первого раза, попробуй переспросить чуть иначе или загляни в Меню.")

CURATED_MENU = {
    "menstrual": {"macros": {"protein": "90 г", "fat": "55 г", "carbs": "180 г"}, "meals": [
        {"time": "08:00", "dish": "Омлет со шпинатом", "note": "Белок и железо", "kcal": "360 ккал"},
        {"time": "13:00", "dish": "Говядина с гречкой и свёклой", "note": "Железо и B12", "kcal": "560 ккал"},
        {"time": "16:00", "dish": "Хумус с овощами", "note": "Магний и клетчатка", "kcal": "190 ккал"},
        {"time": "20:00", "dish": "Чечевичный суп с зеленью", "note": "Железо и тепло", "kcal": "430 ккал"}]},
    "follicular": {"macros": {"protein": "95 г", "fat": "55 г", "carbs": "200 г"}, "meals": [
        {"time": "08:00", "dish": "Омлет с овощами и сыром", "note": "Белок и сытость", "kcal": "370 ккал"},
        {"time": "13:00", "dish": "Курица с киноа и зеленью", "note": "Белок и сложные углеводы", "kcal": "540 ккал"},
        {"time": "16:00", "dish": "Греческий йогурт с ягодами", "note": "Белок и пробиотики", "kcal": "200 ккал"},
        {"time": "20:00", "dish": "Лосось со спаржей", "note": "Омега-3", "kcal": "520 ккал"}]},
    "ovulation": {"macros": {"protein": "98 г", "fat": "58 г", "carbs": "190 г"}, "meals": [
        {"time": "08:00", "dish": "Яичница с авокадо", "note": "Белок и полезные жиры", "kcal": "390 ккал"},
        {"time": "13:00", "dish": "Рыба с брокколи и булгуром", "note": "Антиоксиданты и белок", "kcal": "530 ккал"},
        {"time": "16:00", "dish": "Ягоды с орехами", "note": "Антиоксиданты", "kcal": "200 ккал"},
        {"time": "20:00", "dish": "Индейка с зелёным салатом", "note": "Лёгкий белок", "kcal": "470 ккал"}]},
    "luteal": {"macros": {"protein": "92 г", "fat": "60 г", "carbs": "185 г"}, "meals": [
        {"time": "08:00", "dish": "Творог с орехами и бананом", "note": "Белок и магний", "kcal": "380 ккал"},
        {"time": "13:00", "dish": "Индейка с бататом", "note": "Белок и сложные углеводы", "kcal": "550 ккал"},
        {"time": "16:00", "dish": "Тёмный шоколад 85% и миндаль", "note": "Магний при тяге к сладкому", "kcal": "200 ккал"},
        {"time": "20:00", "dish": "Жирная рыба с овощами", "note": "Омега-3 и B6", "kcal": "520 ккал"}]},
}
def menu_today(st, profile=None, target=None, usage=None):
    # Без диет-ограничений отдаём готовый набор под фазу (без обращения к модели, экономим лимит).
    has_diet = bool(profile and (profile.get("diet") or profile.get("diet_note")))
    if not has_diet:
        import copy
        return copy.deepcopy(CURATED_MENU.get(st["phase"], CURATED_MENU["follicular"]))
    extra = ""
    if target:
        extra += (f" Ориентир по дню: примерно {target[0]} ккал, белок {target[1]} г, жиры {target[2]} г, "
                  f"углеводы {target[3]} г, распредели по приёмам.")
    parts = [DIET_RU.get(x, x) for x in (profile.get("diet").split(",") if profile and profile.get("diet") else []) if x]
    if profile and profile.get("diet_note"): parts.append(profile["diet_note"])
    if parts: extra += f" Строго учитывай пищевые ограничения: {', '.join(parts)}. Не предлагай запрещённые продукты."
    prompt = (f"Составь меню на день под {st['subphase']} {st['phase_ru'].lower()} фазу (день {st['day']} цикла). "
              "Четыре приёма: завтрак ~08:00, обед ~13:00, перекус ~16:00, ужин ~20:00. "
              "Завтрак обязательно белковый (яйца, омлет, творог, греческий йогурт, рыба, тофу), а не сладкая каша как основа. "
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
