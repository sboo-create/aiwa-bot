"""Канонический формат выгрузки и загрузки данных пользователя.

Зачем. Экспорт и импорт были разными задачами, решёнными по-разному и не до
конца: наружу отдавалась только PDF-выписка для врача — документ для чтения,
а не данные, — а внутрь принимался единственный частный случай, список дат
начала месячных строками. Поэтому «выгрузить свои записи» и «перенести
историю из другого приложения» выглядели как две новые фичи, хотя это одна:
общий формат.

Здесь он один. Выгрузка складывает записи в документ, загрузка принимает тот
же документ обратно. Импорт из чужого приложения становится адаптером в этот
формат, а не отдельной веткой на каждый источник.

Модуль намеренно не знает ни про Telegram, ни про схему БД: он получает и
отдаёт обычные словари, а SQL остаётся в вызывающем коде. Зависимость
односторонняя — как и у dialog.
"""

from __future__ import annotations

import json
import re
from typing import Iterable

SCHEMA = "aiwa-export-v1"

_ISO_DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")

#: Разделы документа и поля, которые в них переносятся. Порядок полей задаёт
#: и порядок колонок при загрузке, поэтому список — источник правды для обеих
#: сторон, а не два совпадающих по памяти набора.
SECTIONS: dict[str, tuple[str, ...]] = {
    "cycles": ("start_date", "end_date"),
    "meals": ("d", "ts", "title", "kcal", "protein", "fat", "carbs", "grams",
              "items", "source", "slot", "fclass"),
    "workouts": ("d", "ts", "type", "items", "duration", "rpe", "note"),
    "logs": ("log_date", "energy", "mood", "symptoms"),
    "intimacy": ("d",),
    "memory": ("mkey", "mval", "updated"),
}

PROFILE_FIELDS = (
    "last_period", "cycle_len", "send_time", "mode", "height", "weight", "age",
    "activity", "diet", "diet_note", "kcal_goal", "period_end", "period_len",
    "train_profile", "voice_reply",
)


class ExportError(ValueError):
    """Документ не является выгрузкой Айвы или повреждён."""


def dump(profile: dict, sections: dict[str, Iterable[dict]], *, exported_at: str) -> dict:
    """Собрать документ выгрузки.

    `exported_at` передаётся снаружи, а не берётся из часов: так документ
    остаётся воспроизводимым в тестах, а время в нём — то же самое, что
    пользователь видит в сообщении.
    """
    document = {
        "schema": SCHEMA,
        "exported_at": str(exported_at),
        "profile": {k: profile.get(k) for k in PROFILE_FIELDS if profile.get(k) is not None},
    }
    for name, fields in SECTIONS.items():
        rows = []
        for row in sections.get(name) or ():
            rows.append({f: row.get(f) for f in fields if row.get(f) is not None})
        document[name] = rows
    return document


def to_json(document: dict) -> str:
    return json.dumps(document, ensure_ascii=False, indent=1, sort_keys=False)


def load(raw: object) -> dict:
    """Разобрать документ выгрузки обратно в разделы.

    Проверяем ровно то, что нужно для безопасной вставки: схему, типы разделов
    и формат дат. Неизвестные поля выбрасываем молча — чужой экспорт вполне
    может нести своё, и падать из-за этого незачем.
    """
    if isinstance(raw, (str, bytes)):
        try:
            raw = json.loads(raw)
        except Exception as exc:
            raise ExportError("не разобрала файл выгрузки") from exc
    if not isinstance(raw, dict):
        raise ExportError("ожидался объект выгрузки")
    if raw.get("schema") != SCHEMA:
        raise ExportError(f"чужой формат: {raw.get('schema')!r}")

    result: dict = {"profile": {}, "counts": {}}
    profile = raw.get("profile")
    if isinstance(profile, dict):
        result["profile"] = {k: profile[k] for k in PROFILE_FIELDS if k in profile}

    for name, fields in SECTIONS.items():
        rows = raw.get(name)
        if rows is None:
            result[name] = []
            result["counts"][name] = 0
            continue
        if not isinstance(rows, list):
            raise ExportError(f"раздел {name} должен быть списком")
        cleaned = []
        for row in rows:
            if not isinstance(row, dict):
                raise ExportError(f"раздел {name}: ожидалась запись-объект")
            item = {f: row[f] for f in fields if f in row}
            for date_field in ("d", "start_date", "end_date", "log_date"):
                value = item.get(date_field)
                if value is not None and not _ISO_DATE.match(str(value)):
                    raise ExportError(f"раздел {name}: дата {value!r} не в формате ГГГГ-ММ-ДД")
            cleaned.append(item)
        result[name] = cleaned
        result["counts"][name] = len(cleaned)
    return result


def summary(document: dict) -> str:
    """Строка «что внутри» — одинаковая для выгрузки и для подтверждения импорта."""
    names = {
        "cycles": "циклов", "meals": "приёмов пищи", "workouts": "тренировок",
        "logs": "дней самочувствия", "intimacy": "отметок близости",
        "memory": "заметок памяти",
    }
    parts = []
    for name, title in names.items():
        count = len(document.get(name) or ())
        if count:
            parts.append(f"{count} {title}")
    return ", ".join(parts) if parts else "записей пока нет"


def row_key(section: str, row: dict) -> str:
    """Устойчивый ключ записи журнала для импорта без дублей.

    У питания и тренировок первичный ключ — автоинкремент, поэтому повторный
    импорт того же файла добавлял бы их заново. Ключ считаем из содержимого:
    день, отметка времени и название. Файл, загруженный дважды, даёт те же
    ключи, и вторая загрузка ничего не добавляет.
    """
    import hashlib

    fields = {
        "meals": ("d", "ts", "title", "kcal"),
        "workouts": ("d", "ts", "type", "duration"),
    }.get(section)
    if not fields:
        raise ExportError(f"для раздела {section} ключ не определён")
    payload = "|".join(str(row.get(f) or "") for f in fields)
    digest = hashlib.sha256(payload.encode("utf-8")).hexdigest()[:32]
    return f"import:{section}:{digest}"
