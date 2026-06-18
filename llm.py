# -*- coding: utf-8 -*-
"""Сводка, ответы и динамические саджесты через OSS-модель на Groq. Брендинг: GigaChat (тестовый вариант)."""
import os, re, json, requests, unicodedata

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = os.environ.get("AIWA_MODEL", "openai/gpt-oss-120b")

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
        if "|" in s:
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


def _call(messages, max_tokens=1100, temperature=0.45, usage=None):
    key = os.environ.get("GROQ_API_KEY")
    if not key:
        return None
    import time as _t
    for attempt in range(2):
        try:
            r = requests.post(GROQ_URL, headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
                json={"model": MODEL, "max_tokens": max_tokens, "temperature": temperature, "messages": messages}, timeout=45)
            r.raise_for_status(); data = r.json()
            if usage is not None:
                usage.append(int(data.get("usage", {}).get("total_tokens", 0)))
            txt = (data["choices"][0]["message"]["content"] or "").strip()
            txt = re.sub(r"<think>.*?</think>", "", txt, flags=re.S).strip()
            return txt or None
        except Exception as e:
            print("LLM error:", e)
            if attempt == 0: _t.sleep(1.3); continue
            return None


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
    out = _call([{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}], max_tokens=1100, usage=usage)
    return _clean(out, fallback_summary(st, modules))


def answer_question(st, question, usage=None):
    msgs = [{"role": "system", "content": SYSTEM},
            {"role": "user", "content": (f"Её фаза сейчас: {st['subphase']} {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}.\n\n"
             "Ответь на вопрос по существу и КОНКРЕТНО: конкретные названия, продукты, числа, а не общие слова. "
             "Если вопрос про цикл, питание, тренировки или самочувствие - свяжи с её фазой. "
             "Если вопрос общий (фильмы, досуг, быт), ответь по теме конкретно; цикл упоминай только если это правда уместно и коротко. "
             "Начни с уместного эмодзи. Перечни оформляй пунктами с «• », каждый с новой строки. Только обычный текст, без markdown. Вопрос: " + question)}]
    out = _call(msgs, max_tokens=1000, temperature=0.3, usage=usage)
    return _clean(out, "По твоей фазе: " + st["content"]["general"])


def explain_section(st, key, usage=None):
    base = (f"Её фаза: {st['subphase']} {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}, "
            f"до месячных ~{st['days_to_next']} дн.")
    if key == "training":
        q = ("Объясни, какая физическая нагрузка уместна именно в эту под-фазу и обязательно ПОЧЕМУ с точки зрения "
             "гормонов (эстроген, прогестерон, чувствительность к инсулину, температура тела и связки). "
             "Дай 3-4 конкретных варианта тренировки под этот день и что снизить. Будь конкретной, без воды и повторов, максимум 6 коротких пунктов. Начни строкой «🏋️ Нагрузка сегодня».")
    elif key == "food":
        q = ("Объясни, что есть именно в эту под-фазу и ПОЧЕМУ: какие нутриенты сейчас важны и какой эффект дают. "
             "Дай 4-5 конкретных продуктов строками «• продукт - нутриент и зачем». Без воды и повторов. Начни строкой «🍽 Питание сегодня».")
    else:
        return section_text(st, key)
    msgs = [{"role": "system", "content": SYSTEM},
            {"role": "user", "content": base + "\n\n" + q + " Конкретно, с числами где уместно, только обычный текст без markdown."}]
    out = _call(msgs, max_tokens=600, temperature=0.3, usage=usage)
    return _clean(out, section_text(st, key))


def followups(st, basis_q, basis_a, usage=None):
    out = _call([{"role": "system", "content": "Ты придумываешь follow-up вопросы для femtech-ассистента."},
                 {"role": "user", "content": (f"Фаза: {st['subphase']} {st['phase_ru']}, день {st['day']}. Вопрос: «{basis_q}». "
                  f"Ответ: «{basis_a[:500]}». Дай 3 коротких уточняющих вопроса от лица пользовательницы, по 3-6 слов, "
                  "разные по теме, релевантные именно этому ответу. Ответь строго JSON-массивом строк.")}],
                max_tokens=200, temperature=0.7, usage=usage)
    if out:
        try:
            arr = json.loads(out[out.find("["):out.rfind("]") + 1])
            arr = [str(x).strip() for x in arr if str(x).strip()][:3]
            if arr:
                return arr
        except Exception:
            pass
    return [t for _, t in _static(st)]


def _static(st):
    S = {"menstrual": [("s1", "Почему мало сил?"), ("s2", "Что есть при месячных?"), ("s3", "Можно тренироваться?")],
         "follicular": [("s1", "Почему много энергии?"), ("s2", "Что есть сейчас?"), ("s3", "Какая тренировка лучше?")],
         "ovulation": [("s1", "Почему пик энергии?"), ("s2", "Что есть в овуляцию?"), ("s3", "Можно HIIT?")],
         "luteal": [("s1", "Почему тянет на сладкое?"), ("s2", "Что съесть вечером?"), ("s3", "Когда месячные?")]}
    return S.get(st["phase"], S["luteal"])


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
    out = _call(msgs, max_tokens=700, temperature=0.35, usage=usage)
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
    out = _call([{"role": "system", "content": SYSTEM}, {"role": "user", "content": prompt}], max_tokens=700, temperature=0.3, usage=usage)
    return _clean(out, None)

def general_answer(profile, mode, question, hint=None, usage=None):
    h = f" {hint}." if hint else ""
    msgs = [{"role": "system", "content": SYSTEM},
            {"role": "user", "content": (_gen_ctx(profile, mode) + h + "\n\n"
             "Ответь на вопрос по существу и конкретно, с учётом возраста и режима, БЕЗ привязки к фазе цикла. "
             "Если вопрос про питание, движение или симптомы, дай конкретные продукты, действия, числа. "
             "Если уместно по возрасту (перименопауза, менопауза, аменерея), добавь, на что обратить внимание и когда к врачу. "
             "Только русский, без markdown. Вопрос: " + question)}]
    out = _call(msgs, max_tokens=900, temperature=0.3, usage=usage)
    return _clean(out, "Сейчас не могу собрать ответ, попробуй переспросить чуть иначе или нажми Меню.")

def menu_today(st, profile=None, target=None, usage=None):
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
    return {"macros": {"protein": "92 г", "fat": "54 г", "carbs": "180 г"},
            "meals": [{"time": "08:00", "dish": "Омлет с овощами и сыром", "note": "Белок и сытость", "kcal": "360 ккал"},
                      {"time": "13:00", "dish": "Киноа, печёная свёкла, фета", "note": "Железо и B6", "kcal": "520 ккал"},
                      {"time": "16:00", "dish": "Греческий йогурт с орехами", "note": "Белок и магний", "kcal": "200 ккал"},
                      {"time": "20:00", "dish": "Лосось, шпинат, батат", "note": "Омега-3", "kcal": "540 ккал"}]}


def section_text(st, key):
    c = st["content"]
    if key == "phase":    return f"Фаза: {st['subphase']} {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}. Месячные через ~{st['days_to_next']} дн."
    if key == "general":  return c["general"]
    if key == "food":     return f"🍽 Питание сегодня. {c['food']}"
    if key == "training": return f"🏋️ Нагрузка сегодня. {c['training']}"
    return ""


def fallback_summary(st, modules):
    return "\n\n".join(section_text(st, k) for k in ["phase", "general", "food", "training"] if k in modules)
