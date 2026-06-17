# -*- coding: utf-8 -*-
"""Сводка, ответы и динамические саджесты через OSS-модель на Groq."""
import os, json, requests

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = os.environ.get("AIWA_MODEL", "llama-3.3-70b-versatile")

SYSTEM = (
    "Ты — AIWA, ИИ-ассистент женского здоровья по циклу. Пиши конкретно, по делу, на русском, тепло, но без сюсюканья. "
    "Опирайся на физиологию цикла и рекомендации, проверенные гинекологами и эндокринологами. "
    "ЗАПРЕЩЕНО: «бережно», «мягко», «я рядом», уменьшительные, AI-флёр, вода, длинные тире. "
    "Не ставь диагнозы; при тревожных симптомах (сильная боль, обильное кровотечение, пропуски циклов) советуй гинеколога."
)

def _ctx(st):
    c = st["content"]
    return (f"День цикла {st['day']} из {st['cycle_len']}, фаза {st['phase_ru'].lower()}, до месячных ~{st['days_to_next']} дн. "
            f"Опорно: {c['general']} Питание: {c['food']} Нагрузка: {c['training']}")

def _call(messages, max_tokens=700, temperature=0.6):
    key = os.environ.get("GROQ_API_KEY")
    if not key: return None
    try:
        r = requests.post(GROQ_URL, headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
            json={"model": MODEL, "max_tokens": max_tokens, "temperature": temperature, "messages": messages}, timeout=30)
        r.raise_for_status()
        return (r.json()["choices"][0]["message"]["content"] or "").strip() or None
    except Exception as e:
        print("LLM error:", e); return None

def build_prompt(st, modules):
    p = [f"Данные: {_ctx(st)}", "", "Собери утреннюю сводку из блоков:"]
    if "phase" in modules:    p.append("🌙 Фаза и прогноз: где сейчас цикл и сколько до месячных, 1 предложение.")
    if "general" in modules:  p.append("ℹ️ Об этом периоде: что происходит в теле сейчас, 1-2 предложения.")
    if "food" in modules:     p.append("🥗 Питание: что происходит с аппетитом в эту фазу, 3-4 конкретных продукта и зачем (какие нутриенты и эффект). 2-3 предложения.")
    if "training" in modules: p.append("🏋️ Нагрузка: какая тренировка уместна сегодня и почему, 1-2 предложения.")
    p.append("Каждый блок с эмодзи-заголовком. Без приветствий, сразу к делу. Не используй длинные тире.")
    return "\n".join(p)

def generate_summary(st, modules):
    return _call([{"role":"system","content":SYSTEM},{"role":"user","content":build_prompt(st,modules)}]) or fallback_summary(st, modules)

def answer_question(st, question):
    detail = "Если вопрос про питание, назови конкретные продукты и нутриенты. " 
    msgs = [{"role":"system","content":SYSTEM},
            {"role":"user","content":f"Контекст: {_ctx(st)}\n\n{detail}Ответь на вопрос в 3-5 предложениях, свяжи с фазой и дай практику. Вопрос: {question}"}]
    return _call(msgs, max_tokens=600) or ("Подключи OSS-модель (ключ Groq), и отвечу развёрнуто. По фазе: " + st["content"]["general"])

def followups(st, basis_q, basis_a):
    """3 коротких контекстных уточняющих вопроса под ответ."""
    out = _call([{"role":"system","content":"Ты помогаешь придумать follow-up вопросы для femtech-ассистента."},
                 {"role":"user","content":(f"Фаза: {st['phase_ru']}, день {st['day']}. Был вопрос: «{basis_q}». "
                  f"Ответ: «{basis_a[:500]}». Предложи 3 коротких уточняющих вопроса от лица пользовательницы, "
                  "по 3-6 слов, разные по теме. Ответь строго JSON-массивом строк, без обрамления.")}],
                max_tokens=200, temperature=0.7)
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
    if key=="phase":    return f"🌙 Фаза: {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}. Месячные через ~{st['days_to_next']} дн."
    if key=="general":  return f"ℹ️ {c['general']}"
    if key=="food":     return f"🥗 Питание: {c['food']}"
    if key=="training": return f"🏋️ Нагрузка: {c['training']}"
    return ""

def fallback_summary(st, modules):
    return "\n\n".join(section_text(st,k) for k in ["phase","general","food","training"] if k in modules)
