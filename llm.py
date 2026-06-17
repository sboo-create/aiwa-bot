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
    "Не ставь диагнозы; при тревожных симптомах (сильная боль, обильное кровотечение, пропуски циклов) советуй гинеколога. "
    "Формат: каждый смысловой блок начинай с эмодзи-заголовка (🌙 фаза, 💛 самочувствие, 🍽 питание, 🏋️ нагрузка, 📅 прогноз). "
    "Перечисления давай короткими пунктами, каждый с новой строки и с «• ». Не пиши сплошным абзацем. Без символов # и *. "
    "На вопросы отвечай ПО СУЩЕСТВУ вопроса и конкретно (конкретные названия, продукты, числа). "
    "Привязывай к фазе цикла только если вопрос про здоровье, питание, тренировки или самочувствие. "
    "Если вопрос общий (фильмы, досуг, быт), просто полезно ответь по теме и не притягивай физиологию цикла. "
    "Если вопрос медицинский или гинекологический (боль, выделения, ПМС, контрацепция, гормоны, симптомы), отвечай ГЛУБОКО и ПРИКЛАДНО: коротко механизм (что происходит физиологически), конкретные признаки и нормы с числами, что делать по шагам, и когда это повод к врачу. Не отписывайся общими словами. "
    "Если это приветствие, благодарность или болтовня, ответь коротко и по-человечески, без сводок и без цикла."
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
         "Собери короткую утреннюю сводку из блоков. Каждый блок начинай с эмодзи-заголовка на отдельной строке, "
         "содержимое давай короткими пунктами, каждый пункт с новой строки и с «• ». Конкретика и числа, без воды."]
    if "phase" in modules:    p.append("Блок «🌙 Фаза и прогноз»: точный день и под-фаза, что это значит, сколько дней до месячных.")
    if "general" in modules:  p.append("Блок «💛 Тело сегодня»: какой гормон ведёт и как это отражается на энергии и самочувствии именно в этот день.")
    if "food" in modules:     p.append("Блок «🍽 Питание»: что с аппетитом в эту под-фазу, и 3-4 продукта отдельными пунктами в виде «• продукт — зачем (нутриент и эффект)», с привязкой к акценту дня.")
    if "training" in modules: p.append("Блок «🏋️ Нагрузка»: какая тренировка уместна сегодня и обязательно ПОЧЕМУ — свяжи с фазой и гормонами (например, в фолликулярной выше чувствительность к инсулину, поэтому силовые; в поздней лютеиновой — восстановление). 2-3 пункта.")
    p.append("Без символов # и *, только на русском. Сделай акцент дня заметным, не повторяй формулировки изо дня в день, без приветствий и длинных тире.")
    return "\n".join(p)

def generate_summary(st, modules, hint=None, usage=None):
    prompt = build_prompt(st, modules)
    if hint:
        prompt += f"\nУчитывай вчерашний чек-ин пользовательницы: {hint}. Свяжи рекомендации с этим."
    return _call([{"role":"system","content":SYSTEM},{"role":"user","content":prompt}], max_tokens=1100, usage=usage) or fallback_summary(st, modules)

def answer_question(st, question, usage=None):
    msgs = [{"role":"system","content":SYSTEM},
            {"role":"user","content":(f"Её фаза сейчас: {st['subphase']} {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}.\n\n"
             "Ответь на вопрос по существу и КОНКРЕТНО: конкретные названия, продукты, числа, а не общие слова. "
             "Если вопрос про цикл, питание, тренировки или самочувствие — свяжи с её фазой. "
             "Если вопрос общий (фильмы, досуг, быт), ответь по теме конкретно; цикл упоминай только если это правда уместно и коротко, не притягивай физиологию. "
             "Начни с уместного эмодзи. Перечни оформляй пунктами с «• », каждый с новой строки. Без # и *, без воды. Вопрос: " + question)}]
    return _call(msgs, max_tokens=1000, usage=usage) or ("Подключи модель (ключ), и отвечу развёрнуто. По фазе: " + st["content"]["general"])

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

def menu_today(st, usage=None):
    import json
    prompt=(f"Составь меню на день под {st['subphase']} {st['phase_ru'].lower()} фазу (день {st['day']} цикла). "
            "Четыре приёма: завтрак ~08:00, обед ~13:00, перекус ~16:00, ужин ~20:00. Учитывай нутриенты под фазу. "
            "Ответь строго JSON без обрамления: "
            '{\"macros\":{\"protein\":\"NN г\",\"fat\":\"NN г\",\"carbs\":\"NNN г\"},'
            '\"meals\":[{\"time\":\"08:00\",\"dish\":\"...\",\"note\":\"нутриент\",\"kcal\":\"NNN ккал\"}]}')
    out=_call([{"role":"system","content":"Ты нутрициолог femtech-приложения. Отвечай строго JSON, по-русски."},
               {"role":"user","content":prompt}], max_tokens=600, usage=usage)
    if out:
        try:
            data=json.loads(out[out.find("{"):out.rfind("}")+1])
            if data.get("meals"): return data
        except Exception: pass
    return {"macros":{"protein":"92 г","fat":"54 г","carbs":"180 г"},
            "meals":[{"time":"08:00","dish":"Овсянка с миндалём и ягодами","note":"Сложные углеводы","kcal":"380 ккал"},
                     {"time":"13:00","dish":"Киноа, печёная свёкла, фета","note":"Железо и B6","kcal":"520 ккал"},
                     {"time":"16:00","dish":"Тёмный шоколад 85% и орехи","note":"Магний","kcal":"180 ккал"},
                     {"time":"20:00","dish":"Лосось, шпинат, батат","note":"Омега-3","kcal":"540 ккал"}]}

def section_text(st, key):
    c = st["content"]
    if key=="phase":    return f"Фаза: {st['subphase']} {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}. Месячные через ~{st['days_to_next']} дн."
    if key=="general":  return c["general"]
    if key=="food":     return f"Питание: {c['food']}"
    if key=="training": return f"Нагрузка: {c['training']}"
    return ""

def fallback_summary(st, modules):
    return "\n\n".join(section_text(st,k) for k in ["phase","general","food","training"] if k in modules)
