"""Реестр действий и общий сбор недостающих параметров.

Зачем это есть. Возможности продукта были описаны трижды: HTTP-эндпоинтами
мини-аппа, ветками самодельной машины состояний в меню бота и отдельным
списком действий семантического роутера. Поэтому «поправить период», «удалить
приём», «задать время сводки» существовали на одной поверхности и отсутствовали
на другой, а тринадцать веток `await_*` были тринадцатью копиями одной логики
«разобрать → успех → неудача». Четыре из них ошиблись в ветке неудачи
одинаково: сбрасывали состояние, две — вообще молча, и пользователь вываливался
из сценария без единого слова.

Здесь действие описывается один раз: параметры, как их разобрать, что спросить
и что ответить. Сбор параметров — один драйвер на всех, поэтому ветка неудачи
тоже одна и «молча потерять состояние» становится невозможно структурно.

Модуль намеренно ничего не знает ни о базе, ни о Telegram: он получает текст и
токен состояния, возвращает следующий шаг. Хранение состояния и отправку
сообщений делает вызывающий код. Это же держит модуль в стороне от истории с
циклическим импортом: зависимость строго односторонняя, `aiwa_bot` импортирует
`dialog`, но не наоборот.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Callable, Iterable

# Три неудачных попытки подряд — и предлагаем выход. Меньше похоже на тупик,
# чем молчаливый сброс, и не запирает того, кто просто не понял вопрос.
MAX_ATTEMPTS = 3
CANCEL_WORDS = frozenset({"отмена", "отменить", "стоп", "хватит", "cancel"})
_STATE_PREFIX = "act"


class DialogError(ValueError):
    """Некорректное описание действия — ошибка разработчика, не пользователя."""


@dataclass(frozen=True)
class Param:
    """Один параметр действия.

    `parse` возвращает значение или None. None — «не разобрала», это НЕ повод
    выбрасывать пользователя из сценария: драйвер переспросит.
    """

    name: str
    prompt: str
    parse: Callable[[str], object | None]
    error: str


@dataclass(frozen=True)
class Action:
    """Действие продукта — единственное место, где оно описано."""

    name: str
    title: str
    params: tuple[Param, ...] = ()
    #: Поверхности, на которых действие доступно. Инструменты чата берут
    #: список отсюда, а не заводят собственный.
    surfaces: frozenset[str] = frozenset({"chat", "menu"})
    description: str = ""


@dataclass(frozen=True)
class Ask:
    """Спросить пользователя и сохранить состояние."""

    prompt: str
    state: str


@dataclass(frozen=True)
class Done:
    """Все параметры собраны — вызывающий код применяет действие."""

    action: str
    values: dict


@dataclass(frozen=True)
class Cancelled:
    """Пользователь вышел сам или исчерпал попытки. Состояние снимается."""

    message: str


_REGISTRY: dict[str, Action] = {}


def register(action: Action) -> Action:
    if action.name in _REGISTRY:
        raise DialogError(f"действие {action.name} уже зарегистрировано")
    if not action.name.replace("_", "").isalnum():
        raise DialogError(f"недопустимое имя действия: {action.name!r}")
    names = [p.name for p in action.params]
    if len(names) != len(set(names)):
        raise DialogError(f"повторяющиеся параметры у {action.name}")
    _REGISTRY[action.name] = action
    return action


def get(name: str) -> Action | None:
    return _REGISTRY.get(name)


def actions(surface: str | None = None) -> tuple[Action, ...]:
    """Все действия, при необходимости — только доступные на поверхности."""
    items = tuple(_REGISTRY.values())
    if surface is None:
        return items
    return tuple(a for a in items if surface in a.surfaces)


def _encode(action: str, index: int, attempts: int, values: dict) -> str:
    # Значения уже собранных параметров держим в самом токене: колонка `state`
    # текстовая, отдельной таблицы под это заводить не хочется, а параметров у
    # действия единицы. Разделитель `|` не встречается в именах и в разобранных
    # значениях (они приводятся к строке парсером действия).
    packed = ";".join(f"{k}={v}" for k, v in values.items())
    return f"{_STATE_PREFIX}:{action}:{index}:{attempts}:{packed}"


def parse_state(state: object) -> tuple[str, int, int, dict] | None:
    """Разобрать токен состояния. None — состояние не наше (легаси `await_*`)."""
    text = str(state or "")
    if not text.startswith(f"{_STATE_PREFIX}:"):
        return None
    parts = text.split(":", 4)
    if len(parts) != 5:
        return None
    _, name, index, attempts, packed = parts
    if name not in _REGISTRY or not index.isdigit() or not attempts.isdigit():
        return None
    values = {}
    for chunk in packed.split(";"):
        if "=" in chunk:
            key, _, value = chunk.partition("=")
            values[key] = value
    return name, int(index), int(attempts), values


def coerce(name: str, raw: dict) -> tuple[dict | None, str | None]:
    """Привести значения, пришедшие снаружи, теми же парсерами.

    Нужно для чата: модель присылает «в 8 утра» или «28 дней», и проверять это
    вторым, отдельным кодом — ровно та ошибка, из-за которой поверхности
    разъехались. Возвращает (значения, None) либо (None, имя_плохого_параметра).
    """
    action = _REGISTRY.get(name)
    if action is None:
        raise DialogError(f"неизвестное действие: {name!r}")
    values: dict = {}
    for param in action.params:
        if param.name not in (raw or {}):
            return None, param.name
        try:
            value = param.parse(" ".join(str(raw[param.name]).split()))
        except Exception:
            value = None
        if value is None:
            return None, param.name
        values[param.name] = value
    return values, None


def begin(name: str, values: dict | None = None) -> Ask | Done:
    """Начать действие. Если все параметры уже известны — сразу Done."""
    action = _REGISTRY.get(name)
    if action is None:
        raise DialogError(f"неизвестное действие: {name!r}")
    known = dict(values or {})
    return _advance(action, known, attempts=0)


def feed(state: object, text: str) -> Ask | Done | Cancelled | None:
    """Обработать ответ пользователя. None — состояние не наше."""
    parsed = parse_state(state)
    if parsed is None:
        return None
    name, index, attempts, values = parsed
    action = _REGISTRY[name]
    if index >= len(action.params):
        return Done(action.name, values)

    said = " ".join(str(text or "").split())
    if said.casefold() in CANCEL_WORDS:
        return Cancelled(f"Отменила: {action.title.lower()}.")

    param = action.params[index]
    value = None
    try:
        value = param.parse(said)
    except Exception:
        # Парсер действия не обязан быть пуленепробиваемым: его падение — это
        # «не разобрала», а не потеря сценария.
        value = None

    if value is None:
        attempts += 1
        if attempts >= MAX_ATTEMPTS:
            return Cancelled(
                f"{param.error}\n\nПока отменила: {action.title.lower()}. "
                "Начни заново, когда будет удобно."
            )
        return Ask(
            f"{param.error} Или напиши «отмена».",
            _encode(action.name, index, attempts, values),
        )

    values[param.name] = value
    return _advance(action, values, attempts=0)


def _advance(action: Action, values: dict, attempts: int) -> Ask | Done:
    for index, param in enumerate(action.params):
        if param.name not in values:
            return Ask(param.prompt, _encode(action.name, index, attempts, values))
    return Done(action.name, values)
