# -*- coding: utf-8 -*-
"""Логика цикла: расчёт дня, фазы, прогноза и базового контента по фазам."""
from datetime import date, timedelta

PHASES = ["menstrual", "follicular", "ovulation", "luteal"]

PHASE_RU = {
    "menstrual":  "Менструальная",
    "follicular": "Фолликулярная",
    "ovulation":  "Овуляторная",
    "luteal":     "Лютеиновая",
}

# Краткая база рекомендаций по фазам (валидируется специалистами; в проде — расширить)
PHASE_CONTENT = {
    "menstrual": {
        "general": "Гормоны на минимуме, энергия снижена. Норма — больше отдыхать.",
        "food": "Железо и тёплое: гречка, печень, чечевица, свёкла; вода и магний.",
        "training": "Лёгкое движение: ходьба, растяжка, мягкая йога. Без рекордов.",
    },
    "follicular": {
        "general": "Эстроген растёт, энергия и настроение идут вверх — лучшее окно для нагрузок и задач.",
        "food": "Белок и свежее: яйца, рыба, зелень, ферментированное; сложные углеводы.",
        "training": "Силовые на пике: чувствительность к инсулину и силовые показатели выше.",
    },
    "ovulation": {
        "general": "Пик эстрогена, максимум энергии и либидо. Короткое, но мощное окно.",
        "food": "Антиоксиданты и клетчатка: ягоды, листовые, крестоцветные; лёгкий белок.",
        "training": "HIIT и кардио, интенсивные тренировки — тело лучше всего переносит нагрузку.",
    },
    "luteal": {
        "general": "Прогестерон растёт, к концу фазы — ПМС и тяга к сладкому. Энергия снижается.",
        "food": "Магний, B6, железо, сложные углеводы: тёмный шоколад 85%, орехи, киноа, лосось.",
        "training": "Начало фазы — средняя интенсивность, ближе к месячным — восстановление.",
    },
}


def phase_for_day(day: int, cycle_len: int) -> str:
    """Определить фазу по дню цикла. Овуляция привязана к (длина - 14)."""
    if day <= 5:
        return "menstrual"
    ovulation = max(12, cycle_len - 14)  # день овуляции
    if day < ovulation:
        return "follicular"
    if ovulation <= day <= ovulation + 2:
        return "ovulation"
    return "luteal"


def cycle_status(last_period: date, cycle_len: int, today: date | None = None) -> dict:
    """Текущий день цикла, фаза, прогноз следующих месячных."""
    today = today or date.today()
    delta = (today - last_period).days
    if delta < 0:
        delta = 0
    day = (delta % cycle_len) + 1
    ph = phase_for_day(day, cycle_len)
    days_to_next = cycle_len - day + 1
    next_period = today + timedelta(days=days_to_next)
    # под-фаза: ранняя/средняя/поздняя внутри текущей фазы
    bounds={"menstrual":(1,5),"follicular":(6,max(12,cycle_len-14)-1),
            "ovulation":(max(12,cycle_len-14),max(12,cycle_len-14)+2),"luteal":(max(12,cycle_len-14)+3,cycle_len)}
    lo,hi=bounds[ph]; span=max(1,hi-lo); pos=(day-lo)/span
    sub="ранняя" if pos<0.34 else ("средняя" if pos<0.67 else "поздняя")
    return {
        "subphase": sub,
        "day": day,
        "cycle_len": cycle_len,
        "phase": ph,
        "phase_ru": PHASE_RU[ph],
        "days_to_next": days_to_next,
        "next_period": next_period,
        "content": PHASE_CONTENT[ph],
    }
