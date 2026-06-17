# -*- coding: utf-8 -*-
"""Сводка, ответы и динамические саджесты через OSS-модель на Groq. Брендинг: GigaChat (тестовый вариант)."""
import os, json, requests

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = os.environ.get("AIWA_MODEL", "llama-3.3-70b-versatile")

SYSTEM = (
    "Ты — AIWA, ИИ-ассистент женского здоровья по циклу. Пиши конкретно, структурно, на русском, тепло, без сюсюканья. "
    "Опирайся на физиологию цикла и рекомендации, проверенные гинекологами и эндокринологами. "
    "Если спрашивают, на чём ты работаешь, какая модель или нейросеть тебя питает, отвечай, что ты работаешь на GigaChat. "
    "ЗАПРЕЩЕНО: «бережно», «мягко», «я рядом», уменьшительные, AI-флёр, вода, длинные тире. "
    "Не ставь диагнозы; при тревожных симптомах (сильная боль, обильное кровотечение, пропуски циклов) советуй гинеколога."
)

FOCI = ["сон и восстановление", "железо и уровень энергии", "настроение и ПМС", "гидратация и отёки",
        "белок и сытость", "магний и тяга к сладкому", "пищеварение и клетчатка", "кожа и гормоны"]

def _ctx(st):
    c = st["content"]
    return (f"День цикла {st['day']} из {st['cycle_len']}, {st['subphase']} {st['phase_ru'].lower()} фаза, "
            f"до месячных ~{st['days_to_next']} дн. Опорно: {c['general']} Питание: {c['food']} Нагрузка: {c['training']}")

def _focus(st): return FOCI[st["day"] % len(FOCI)]

def _call(messages, max_tokens=1100, temperature=0.6, usage=None):
    key = os.environ.get("GROQ_API_KEY")
    if not key: return None
    try:
        r = requests.post(GROQ_URL, headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
            json={"model": MODEL, "max_tokens": max_tokens, "temperature": temperature, "messages": messages}, timeout=40)
        r.raise_for_status(); data = r.json()
        if usage is not None: usage.append(int(data.get("usage", {}).get("total_tokens", 0)))
        return (data["choices"][0]["message"]["content"] or "").strip() or None
    except Exception as e:
        print("LLM error:", e); return None

def build_prompt(st, modules):
    p = [f"Данные: {_ctx(st)}", f"Сегодняшний акцент дня: {_focus(st)}.", "",
         "Собери утреннюю сводку. Каждый блок с заголовком и 2-3 ёмкими предложениями, конкретика и числа, без воды:"]
    if "phase" in modules:    p.append("Фаза и прогноз: точный день и под-фаза, что это значит, сколько до месячных.")
    if "general" in modules:  p.append("Тело сегодня: какой гормон ведёт, как это отражается на энергии и самочувствии именно в этот день.")
    if "food" in modules:     p.append("Питание: что с аппетитом в эту под-фазу, 3-4 конкретных продукта и зачем (нутриент и эффект), с привязкой к акценту дня.")
    if "training" in modules: p.append("Нагрузка: какая тренировка уместна сегодня и почему, с учётом под-фазы.")
    p.append("Заголовок каждого блока пиши обычным текстом на отдельной строке, без символов # и *, например \"Фаза и прогноз\". Только на русском. Сделай акцент дня заметным, не повторяй формулировки изо дня в день, без приветствий и длинных тире.")
    return "\n".join(p)

def generate_summary(st, modules, hint=None, usage=None):
    prompt = build_prompt(st, modules)
    if hint:
        prompt += f"\nУчитывай вчерашний чек-ин пользовательницы: {hint}. Свяжи рекомендации с этим."
    return _call([{"role":"system","content":SYSTEM},{"role":"user","content":prompt}], max_tokens=1100, usage=usage) or fallback_summary(st, modules)

def answer_question(st, question, usage=None):
    msgs = [{"role":"system","content":SYSTEM},
            {"role":"user","content":(f"Контекст: {_ctx(st)} Акцент дня: {_focus(st)}.\n\n"
             "Ответь структурно: 3-6 предложений, свяжи с под-фазой и днём цикла, дай конкретику. "
             "Если про питание — назови продукты и нутриенты. Только на русском, без markdown-символов # и *, без воды и длинных тире. Вопрос: " + question)}]
    return _call(msgs, max_tokens=800, usage=usage) or ("Подключи модель (ключ), и отвечу развёрнуто. По фазе: " + st["content"]["general"])

def followups(st, basis_q, basis_a, usage=None):
    out = _call([{"role":"system","content":"Ты придумываешь follow-up вопросы для femtech-ассистента."},
                 {"role":"user","content":(f"Фаза: {st['subphase']} {st['phase_ru']}, день {st['day']}. Вопрос: «{basis_q}». "
                  f"Ответ: «{basis_a[:500]}». Дай 3 коротких уточняющих вопроса от лица пользовательницы, по 3-6 слов, "
                  "разные по теме, релевантные именно этому ответу. Ответь строго JSON-массивом строк.")}],
                max_tokens=200, temperature=0.7, usage=usage)
    if out:
        try:
            arr = json.loads(out[out.find("["):out.rfind("]")+1])
            arr = [str(x).strip() for x in arr if str(x).strip()][:3]
            if arr: return arr
        except Exception: pass
    return [t for _, t in _static(st)]

def _static(st):
    S = {"menstrual":[("s1","Почему мало сил?"),("s2","Что есть при месячных?"),("s3","Можно тренироваться?")],
         "follicular":[("s1","Почему много энергии?"),("s2","Что есть сейчас?"),("s3","Какая тренировка лучше?")],
         "ovulation":[("s1","Почему пик энергии?"),("s2","Что есть в овуляцию?"),("s3","Можно HIIT?")],
         "luteal":[("s1","Почему тянет на сладкое?"),("s2","Что съесть вечером?"),("s3","Когда месячные?")]}
    return S.get(st["phase"], S["luteal"])

def section_text(st, key):
    c = st["content"]
    if key=="phase":    return f"Фаза: {st['subphase']} {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}. Месячные через ~{st['days_to_next']} дн."
    if key=="general":  return c["general"]
    if key=="food":     return f"Питание: {c['food']}"
    if key=="training": return f"Нагрузка: {c['training']}"
    return ""

def fallback_summary(st, modules):
    return "\n\n".join(section_text(st,k) for k in ["phase","general","food","training"] if k in modules)
