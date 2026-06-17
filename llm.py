# -*- coding: utf-8 -*-
"""Генерация сводки и ответов на вопросы через OSS-модель на Groq (OpenAI-совместимый API)."""
import os, requests

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = os.environ.get("AIWA_MODEL", "llama-3.3-70b-versatile")

SYSTEM = (
    "Ты — Айва, аналитический слой femtech-приложения о женском здоровье по циклу. "
    "Пиши как аналитик, который знает физиологию цикла: конкретно, по делу, на русском, тепло но без сюсюканья. "
    "ЗАПРЕЩЕНО: «бережно», «мягко», «я рядом», уменьшительные, сентиментальный AI-флёр, вода и общие фразы. "
    "Не ставь диагнозы. При тревожных симптомах (сильная боль, обильное кровотечение, пропуски циклов) — советуй гинеколога."
)

def _ctx(st: dict) -> str:
    c = st["content"]
    return (f"День цикла {st['day']} из {st['cycle_len']}, фаза {st['phase_ru'].lower()}, "
            f"до месячных ~{st['days_to_next']} дн. Опорно: {c['general']} Питание: {c['food']} Нагрузка: {c['training']}")

def _call(messages, max_tokens=600, temperature=0.6):
    key = os.environ.get("GROQ_API_KEY")
    if not key:
        return None
    try:
        r = requests.post(GROQ_URL,
            headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
            json={"model": MODEL, "max_tokens": max_tokens, "temperature": temperature, "messages": messages},
            timeout=30)
        r.raise_for_status()
        return r.json()["choices"][0]["message"]["content"].strip() or None
    except Exception as e:
        print("LLM error:", e)
        return None

def build_prompt(st, modules):
    parts = [f"Данные пользовательницы: {_ctx(st)}", "", "Собери короткую утреннюю сводку из блоков:"]
    if "phase" in modules:    parts.append("🌙 Фаза и прогноз — где сейчас цикл и сколько до месячных.")
    if "general" in modules:  parts.append("ℹ️ Об этом периоде — кратко что происходит в теле.")
    if "food" in modules:     parts.append("🥗 Питание — 1–2 конкретные подсказки под фазу.")
    if "training" in modules: parts.append("🏋️ Нагрузка — какая тренировка уместна сегодня.")
    parts.append("Каждый блок 1–2 предложения, с эмодзи-заголовком. Без «Доброе утро» — сразу к делу.")
    return "\n".join(parts)

def generate_summary(st, modules):
    txt = _call([{"role": "system", "content": SYSTEM}, {"role": "user", "content": build_prompt(st, modules)}])
    return txt or fallback_summary(st, modules)

def answer_question(st, question):
    msgs = [{"role": "system", "content": SYSTEM},
            {"role": "user", "content": f"Контекст пользовательницы: {_ctx(st)}\n\nОтветь на вопрос в 2–4 предложениях, "
                                        f"свяжи с фазой и дай практику. Вопрос: {question}"}]
    return _call(msgs, max_tokens=500) or ("Сейчас не могу ответить по существу — подключи OSS-модель (ключ Groq), "
                                           "и я буду отвечать развёрнуто. По фазе: " + st["content"]["general"])

def section_text(st, key):
    c = st["content"]
    if key == "phase":
        return f"🌙 Фаза: {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}. Месячные через ~{st['days_to_next']} дн."
    if key == "general":  return f"ℹ️ {c['general']}"
    if key == "food":     return f"🥗 Питание: {c['food']}"
    if key == "training": return f"🏋️ Нагрузка: {c['training']}"
    return ""

def fallback_summary(st, modules):
    return "\n\n".join(section_text(st, k) for k in ["phase", "general", "food", "training"] if k in modules)
