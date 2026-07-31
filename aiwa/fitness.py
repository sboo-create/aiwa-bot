"""Тренировки: калории, заголовки своих тренировок, любимые активности.

Перенесено из aiwa_bot.py механически. Глобальное состояние (DB, dtoday)
читается через модуль aiwa_bot в момент вызова — так продолжает работать
подмена bot.DB в тестах и существующие вызовы bot.workout_calories(...).
"""
import re

import aiwa_bot as _bot

_MET = {"Силовая": 5.0, "Кардио": 8.0, "Йога": 3.0, "Ходьба": 3.5, "Плавание": 7.0,
        "Пилатес": 3.0, "Растяжка": 2.5}
# Типы из стандартного набора приложения; всё остальное — собственные
# активности пользовательницы (например Сквош), их ведём отдельно.
_STANDARD_WORKOUT_TYPES = frozenset(_MET) | {"Своё", "Тренировка", "Танцы", "Бег", "Велосипед", ""}


def _custom_workout_title(name):
    """Заголовок своей тренировки из единственного вписанного занятия.
    Длинный свободный текст обрезается, чтобы не ломать карточки."""
    t = re.sub(r"\s+", " ", str(name or "")).strip(" .,!—-")
    if not t:
        return ""
    if len(t) > 24:
        t = t[:23].rstrip() + "…"
    return t[:1].upper() + t[1:]


def favorite_activities(cid, days=60, limit=3):
    """Собственные активности за окно, по убыванию частоты, свежие выше.
    Окно даёт естественное затухание: что перестали отмечать — выпадает."""
    from datetime import timedelta
    cut = (_bot.dtoday() - timedelta(days=days)).isoformat()
    c = _bot.db()
    rows = c.execute(
        "SELECT type, COUNT(*) AS n, MAX(d) FROM workouts WHERE chat_id=? AND d>=? "
        "GROUP BY type ORDER BY n DESC, MAX(d) DESC", (cid, cut)).fetchall()
    c.close()
    out = []
    for t, n, _last in rows:
        t = (t or "").strip()
        if t in _STANDARD_WORKOUT_TYPES:
            continue
        out.append((t, n))
        if len(out) >= limit:
            break
    return out


def workout_calories(wtype, duration, rpe, weight_kg):
    m = re.search(r"\d+", str(duration or "")); mins = int(m.group()) if m else 40
    met = _MET.get(wtype, 5.0)
    r = str(rpe or "").lower()
    if "лег" in r: met *= 0.85
    elif "тяж" in r: met *= 1.15
    w = weight_kg if (weight_kg and weight_kg > 30) else 65
    return int(round(met * w * (mins / 60.0)))
