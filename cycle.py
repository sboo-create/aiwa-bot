# -*- coding: utf-8 -*-
"""Логика цикла: день, фаза, под-фаза, прогноз и детекция задержки."""
from datetime import date, timedelta

PHASES = ["menstrual", "follicular", "ovulation", "luteal"]
PHASE_RU = {"menstrual":"Менструальная","follicular":"Фолликулярная","ovulation":"Овуляторная","luteal":"Лютеиновая"}
PHASE_CONTENT = {
    "menstrual": {"general":"Идут месячные, эстроген и прогестерон на минимуме, поэтому энергии мало. Это нормально, телу нужно больше отдыха.",
                  "food":"С кровью теряется железо, поэтому сейчас полезны продукты с железом и тёплая еда: говядина или печень, гречка, чечевица, свёкла, плюс вода и магний.",
                  "training":"Подойдёт лёгкая активность: ходьба, растяжка, мягкая йога. Силовые рекорды сейчас не нужны."},
    "follicular":{"general":"Эстроген растёт, энергия, настроение и концентрация идут вверх. Хорошее окно для нагрузок и сложных задач.",
                  "food":"Тело хорошо усваивает белок и свежее: яйца, рыба, курица, зелень, ферментированные продукты и сложные углеводы.",
                  "training":"Лучшее время для силовых: чувствительность к инсулину и силовые показатели на пике."},
    "ovulation": {"general":"Пик эстрогена, максимум энергии и либидо. Короткое, но самое активное окно цикла.",
                  "food":"Поддержи антиоксидантами и клетчаткой: ягоды, листовая зелень, брокколи и капуста, лёгкий белок.",
                  "training":"Можно интенсивнее обычного, если хорошее самочувствие: силовая, бодрое кардио, танцы или функциональная тренировка. Важны разминка и техника."},
    "luteal":    {"general":"Растёт прогестерон, ближе к месячным появляются ПМС, тяга к сладкому и усталость, энергия снижается.",
                  "food":"Сгладить ПМС помогают магний, витамин B6 и сложные углеводы: тёмный шоколад 85%, орехи, бананы, жирная рыба, гречка.",
                  "training":"В начале фазы средняя интенсивность, ближе к месячным переходи на восстановление: йога, плавание, прогулки."},
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
        day = days_since + 1; ph = "luteal"; days_to_next = 0
        delay_days = days_since - cycle_len
        if days_since <= cycle_len + 7: status = "due"
        elif days_since <= cycle_len + 21: status = "delay"
        else: status = "stale"
    next_period = last_period + timedelta(days=cycle_len)
    return {"subphase": _subphase(day, ph, cycle_len), "day": day, "cycle_len": cycle_len,
            "phase": ph, "phase_ru": PHASE_RU[ph], "days_to_next": days_to_next,
            "days_since": days_since, "status": status, "delay_days": delay_days,
            "next_period": next_period, "content": PHASE_CONTENT[ph]}


def preg_status(lmp_iso, today=None):
    """Срок беременности по первому дню последних месячных (стандартный акушерский метод)."""
    today = today or date.today()
    lmp = date.fromisoformat(lmp_iso)
    days = max(0, (today - lmp).days)
    week = min(days // 7, 42); day = days % 7
    due = lmp + timedelta(days=280)
    left = (due - today).days
    tri = 1 if week < 14 else (2 if week < 28 else 3)
    return {"week": week, "day": day, "trimester": tri, "due": due.isoformat(),
            "days_left": left, "lmp": lmp_iso}
