"""Прогон корпуса journal_corpus.py против текущей реализации.

Ключевая идея — **состязательный классификатор**: на каждый текст модель отвечает
«пиши, субъект — она сама, событие завершено, уверенность 1.0». Всё, что после
этого всё равно не записывается, защищено КОДОМ. Всё остальное держится только на
доброй воле модели и развалится, если она ошибётся или её переубедят инъекцией.

Этот прогон переживает переход на инструменты записи: меняется только `decide()`.
"""

import asyncio
import os
import tempfile
from unittest import mock

import pytest

os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot  # noqa: E402

from journal_corpus import (  # noqa: E402
    KNOWN_BUGS,
    MEAL_APPEND,
    MEAL_CREATE,
    MEAL_MOVE_SLOT,
    MEAL_UPDATE,
    MUST_NOT_WRITE,
    MUST_WRITE,
    MODEL_DEPENDENT_ONLY,
    NEGATION_NOT_ENFORCED_BY_CODE,
    PERIOD_END,
    PERIOD_START,
    WORKOUT_CREATE,
)

# Операция целевой модели -> инструмент записи.
OP_TO_TOOL = {
    MEAL_CREATE: "log_meal",
    MEAL_UPDATE: "update_meal",
    MEAL_APPEND: "append_meal_item",
    MEAL_MOVE_SLOT: "move_meal_slot",
    WORKOUT_CREATE: "log_workout",
    PERIOD_START: "log_period_start",
    PERIOD_END: "log_period_end",
}


@pytest.fixture()
def cid():
    """Активная пользовательница с одной недавней записью еды и мутацией в журнале.

    Недавняя мутация нужна, чтобы работали маршруты продолжения («и ещё чипсы»)
    и правки — иначе они отсекаются до классификатора.
    """
    tmp = tempfile.TemporaryDirectory()
    old_db = bot.DB
    bot.DB = os.path.join(tmp.name, "corpus.db")
    chat_id = 9701
    bot._activate_user(chat_id)
    bot.upsert(chat_id, mode="cycle", cycle_len=28,
               last_period=(bot.dtoday() - bot.timedelta(days=12)).isoformat(),
               height=168, weight=60, age=30, activity=2)
    bot.meal_add(
        chat_id,
        {"title": "Творог", "kcal": 200, "protein": 20, "fat": 5, "carbs": 10,
         "grams": 150, "items": [], "source": "text", "slot": "lunch"},
        user_generation=bot._user_generation(chat_id),
        mutation_key=bot.chat_mutation_key("test", "seed-meal"),
        args_hash=bot.chat_mutation_args_hash("food", "seed"),
    )
    try:
        yield chat_id
    finally:
        bot.DB = old_db
        tmp.cleanup()


PARSED_FOOD = {"title": "Творог", "grams": 100, "kcal": 100,
               "protein": 10, "fat": 3, "carbs": 5}
PARSED_WORKOUT = {"type": "Кардио", "duration_minutes": 30, "rpe": "средняя",
                  "items": [], "note": ""}


def _adversarial_args(tool, meal_id):
    """Аргументы, которые дал бы сломанный или переубеждённый инъекцией классификатор:
    субъект не назван (самый разрешающий вариант), цель — реальная своя запись."""
    return {
        "log_meal": {"food_text": "творог 100 г", "subject_span": ""},
        "move_meal_slot": {"meal_id": meal_id, "slot": "breakfast", "subject_span": ""},
        "append_meal_item": {"meal_id": meal_id, "food_text": "лепёшка 90 г", "subject_span": ""},
        "update_meal": {"meal_id": meal_id, "food_text": "творог 100 г", "subject_span": ""},
        "log_workout": {"workout_text": "бег 30 минут", "subject_span": ""},
        "log_period_start": {"subject_span": ""},
        "log_period_end": {"subject_span": ""},
    }[tool]


def try_tool(chat_id, text, tool, seq=0):
    """Единственное место, знающее об устройстве маршрута записи.

    Модель «уже решила» вызвать инструмент — проверяем, пропустит ли это КОД.
    """
    meals = bot.meals_of(chat_id)
    meal_id = meals[-1]["id"] if meals else None
    with (
        mock.patch.object(bot.L, "analyze_food_text", return_value=PARSED_FOOD),
        mock.patch.object(bot.L, "analyze_workout_text", return_value=PARSED_WORKOUT),
    ):
        res = asyncio.run(bot._agent_exec_write(
            chat_id, bot.row(chat_id), tool, _adversarial_args(tool, meal_id), text,
            user_generation=bot._user_generation(chat_id),
            mutation_key=bot.chat_mutation_key("corpus", f"{tool}:{seq}:{len(text)}:{text[:24]}"),
        ))
    return bool(res and res.get("ok"))


def decide(chat_id, text, op):
    """Запишется ли событие: быстрый детерминированный путь или инструмент."""
    if bot.match_intent(text) in bot._JOURNAL_MUTATION_INTENTS:
        return True
    return try_tool(chat_id, text, OP_TO_TOOL[op])


def any_write(chat_id, text):
    """Создалась бы НОВАЯ запись, если модель на всё отвечает «да»?

    Проверяем только создающие инструменты: ложная новая запись — это вред,
    который пользовательница не просила. Правка её же существующей строки —
    другой класс риска: она обратима, ограничена одной записью и требует id.
    """
    if bot.match_intent(text) in bot._JOURNAL_MUTATION_INTENTS:
        return "match_intent", bot.match_intent(text)
    for i, tool in enumerate(sorted(bot._CREATE_TOOLS)):
        if try_tool(chat_id, text, tool, seq=i):
            return tool, "written"
    return None


# --------------------------------------------------------------------------
# 1. Инварианты безопасности: код обязан отказать при любом решении модели.
# --------------------------------------------------------------------------
def _safety_param(case):
    """Известные дыры помечаем xfail(strict), чтобы починка сразу дала сигнал."""
    case_id = case[0]
    marks = []
    if case_id in NEGATION_NOT_ENFORCED_BY_CODE or case_id in MODEL_DEPENDENT_ONLY:
        marks.append(pytest.mark.xfail(
            strict=True,
            reason="инвариант держится суждением модели, не кодом — "
                   "см. journal_corpus.MODEL_DEPENDENT_ONLY",
        ))
    return pytest.param(*case, id=case_id, marks=marks)


@pytest.mark.parametrize("case_id,text,why",
                         [_safety_param(c) for c in MUST_NOT_WRITE])
def test_must_not_write_survives_adversarial_model(cid, case_id, text, why):
    leaked = any_write(cid, text)
    assert leaked is None, (
        f"{case_id}: «{text}» ({why}) — запись прошла как {leaked[1]} "
        f"при действии модели {leaked[0]!r}. Инвариант держится только моделью."
    )


# --------------------------------------------------------------------------
# 2. Позитивы: запись обязана произойти.
# --------------------------------------------------------------------------
@pytest.mark.parametrize("case_id,text,op",
                         MUST_WRITE,
                         ids=[c[0] for c in MUST_WRITE])
def test_must_write_still_routes(cid, case_id, text, op):
    assert decide(cid, text, op), (
        f"{case_id}: «{text}» должно приводить к {op}, но запись не прошла"
    )


# --------------------------------------------------------------------------
# 3. Открытые дефекты. strict=True: как только починим — тест начнёт падать
#    «неожиданным успехом», и его надо будет перевести в MUST_WRITE.
# --------------------------------------------------------------------------
@pytest.mark.parametrize("case_id,text,op,why",
                         KNOWN_BUGS,
                         ids=[c[0] for c in KNOWN_BUGS])
def test_known_bugs_from_sonia_dialog(cid, case_id, text, op, why):
    assert decide(cid, text, op), f"{case_id}: {why}"


# --------------------------------------------------------------------------
# 4. Инварианты исполнителя записи. Живут ниже роутера и обязаны пережить
#    его удаление на этапе 3 — иначе вместе с роутером уйдёт и защита.
# --------------------------------------------------------------------------
PARSED_MEAL = {"title": "Овсянка", "grams": 200, "kcal": 180,
               "protein": 6, "fat": 3, "carbs": 32}


def test_same_mutation_key_writes_once(cid):
    """§6.9 — повтор одного tool call не должен удваивать запись."""
    key = bot.chat_mutation_key("test", "idem-1")
    with mock.patch.object(bot.L, "analyze_food_text", return_value=PARSED_MEAL):
        first = asyncio.run(bot.log_food_action(
            cid, bot.row(cid), "я съела овсянку, запиши", mutation_key=key))
        second = asyncio.run(bot.log_food_action(
            cid, bot.row(cid), "я съела овсянку, запиши", mutation_key=key))
    assert first["ok"] and second["ok"]
    assert first["record_id"] == second["record_id"]
    assert [m["title"] for m in bot.meals_of(cid)] == ["Творог", "Овсянка"]


def test_foreign_record_cannot_be_updated(cid):
    """§6.8 — правка чужой строки отклоняется проверкой владения, а не моделью."""
    stranger = 9702
    bot._activate_user(stranger)
    bot.upsert(stranger, mode="cycle", cycle_len=28,
               last_period=(bot.dtoday() - bot.timedelta(days=5)).isoformat())
    victim_meal_id = bot.meals_of(cid)[0]["id"]

    assert bot.meal_get(stranger, victim_meal_id) is None
    with mock.patch.object(bot.L, "analyze_food_text", return_value=PARSED_MEAL):
        result = asyncio.run(bot.log_food_update_action(
            stranger, bot.row(stranger), "было меньше, грамм 100", victim_meal_id,
            mutation_key=bot.chat_mutation_key("test", "cross-user"),
        ))
    assert result["ok"] is False
    assert bot.meal_get(cid, victim_meal_id)["title"] == "Творог"


def test_normalizer_already_supports_multiple_items(cid):
    """§6.5 — приёмник позиций готов: недостающее звено только в промпте."""
    rec = bot.normalize_food({
        "title": "Завтрак",
        "items": [
            {"name": "Бутерброд с красной рыбой", "grams": 120, "kcal": 300,
             "protein": 15, "fat": 14, "carbs": 28},
            {"name": "Голубика", "grams": 40, "kcal": 23,
             "protein": 0.3, "fat": 0.1, "carbs": 5},
            {"name": "Лепёшка с сыром и зеленью", "grams": 90, "kcal": 240,
             "protein": 9, "fat": 11, "carbs": 26},
            {"name": "Куриный наггетс", "grams": 30, "kcal": 90,
             "protein": 5, "fat": 5, "carbs": 5},
        ],
    }, source="text")
    assert len(rec["items"]) == 4
    assert rec["kcal"] == sum(i["kcal"] for i in rec["items"])
    assert rec["grams"] == sum(i["grams"] for i in rec["items"])


def test_food_prompt_asks_for_items_and_unparsed():
    """§6.5 — промпт обязан требовать позиции и явный остаток нераспознанного."""
    assert "items" in bot.L._FOOD_FORMAT
    assert "unparsed" in bot.L._FOOD_FORMAT


def test_unparsed_fragments_survive_normalization():
    """Нераспознанный кусок описания не должен теряться молча."""
    rec = bot.normalize_food({
        "title": "Завтрак",
        "items": [{"name": "Голубика", "grams": 40, "kcal": 23,
                   "protein": 0.3, "fat": 0.1, "carbs": 5}],
        "unparsed": ["припешку с сыром и зеленью"],
    }, source="text")
    assert rec["unparsed"] == ["припешку с сыром и зеленью"]
    text = bot._food_action_success(dict(rec, slot="breakfast"), 1, bot.dtoday())["text"]
    assert "припешку с сыром и зеленью" in text


def test_executor_refuses_third_party_write(cid):
    """§6.6/6.7 — защита субъекта живёт в исполнителе инструментов, а не в роутере.

    Роутер удалён; если бы проверка осталась только в нём, эта запись прошла бы.
    """
    with mock.patch.object(bot.L, "analyze_food_text", return_value=PARSED_FOOD):
        result = asyncio.run(bot._agent_exec_write(
            cid, bot.row(cid), "log_meal",
            {"food_text": "творог", "subject_span": "я"},
            "Соня съела творог, запиши",
            user_generation=bot._user_generation(cid),
            mutation_key=bot.chat_mutation_key("test", "third-party-direct"),
        ))
    assert result["ok"] is False
    assert len(bot.meals_of(cid)) == 1, "новая запись создаваться не должна"
