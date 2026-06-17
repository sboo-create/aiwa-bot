# -*- coding: utf-8 -*-
"""Логика цикла: день, фаза, под-фаза, прогноз и детекция задержки."""
from datetime import date, timedelta

PHASES = ["menstrual", "follicular", "ovulation", "luteal"]
PHASE_RU = {"menstrual":"Менструальная","follicular":"Фолликулярная","ovulation":"Овуляторная","luteal":"Лютеиновая"}
PHASE_CONTENT = {
    "menstrual": {"general":"Гормоны на минимуме, энергия снижена. Норма — больше отдыхать.",
                  "food":"Железо и тёплое: гречка, печень, чечевица, свёкла; вода и магний.",
                  "training":"Лёгкое движение: ходьба, растяжка, мягкая йога. Без рекордов."},
    "follicular":{"general":"Эстроген растёт, энергия и настроение идут вверх — лучшее окно для нагрузок и задач.",
                  "food":"Белок и свежее: яйца, рыба, зелень, ферментированное; сложные углеводы.",
                  "training":"Силовые на пике: чувствительность к инсулину и силовые показатели выше."},
    "ovulation": {"general":"Пик эстрогена, максимум энергии и либидо. Короткое, но мощное окно.",
                  "food":"Антиоксиданты и клетчатка: ягоды, листовые, крестоцветные; лёгкий белок.",
                  "training":"HIIT и кардио, интенсивные тренировки — тело лучше всего переносит нагрузку."},
    "luteal":    {"general":"Прогестерон растёт, к концу фазы — ПМС и тяга к сладкому. Энергия снижается.",
                  "food":"Магний, B6, железо, сложные углеводы: тёмный шоколад 85%, орехи, киноа, лосось.",
                  "training":"Начало фазы — средняя интенсивность, ближе к месячным — восстановление."},
}

def phase_for_day(day, cycle_len):
    if day <= 5: return "menstrual"
    ov = max(12, cycle_len - 14)
    if day < ov: return "follicular"
    if ov <= day <= ov + 2: return "ovulation"
    return "luteal"

def _subphase(day, ph, cycle_len):
    ov = max(12, cycle_len - 14)
    bounds = {"menstrual":(1,5),"follicular":(6,ov-1),"ovulation":(ov,ov+2),"luteal":(ov+3,cycle_len)}
    lo, hi = bounds[ph]; span = max(1, hi - lo); pos = (day - lo) / span
    return "ранняя" if pos < 0.34 else ("средняя" if pos < 0.67 else "поздняя")

def cycle_status(last_period, cycle_len, today=None):
    today = today or date.today()
    days_since = max(0, (today - last_period).days)
    if days_since < cycle_len:
        day = days_since + 1
        ph = phase_for_day(day, cycle_len)
        days_to_next = cycle_len - day + 1
        status = "normal"; delay_days = 0
    else:
        day = cycle_len; ph = "luteal"; days_to_next = 0
        delay_days = days_since - cycle_len
        if days_since <= cycle_len + 7: status = "due"
        elif days_since <= cycle_len + 21: status = "delay"
        else: status = "stale"
    next_period = last_period + timedelta(days=((days_since // cycle_len) + 1) * cycle_len)
    return {"subphase": _subphase(day, ph, cycle_len), "day": day, "cycle_len": cycle_len,
            "phase": ph, "phase_ru": PHASE_RU[ph], "days_to_next": days_to_next,
            "days_since": days_since, "status": status, "delay_days": delay_days,
            "next_period": next_period, "content": PHASE_CONTENT[ph]}
