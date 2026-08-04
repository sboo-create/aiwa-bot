"""Отчёт о сделанной тренировке записывается, как бы человек его ни построил.

Репорт: голосовое «Так, сейчас была разминка спины с приседаниями» не попало в
дневник. Модель-роутер разобрала фразу верно (workout, completed, уверенность
1.0) — отказала независимая проверка домена: она требовала совпадения со
списком глаголов, где есть «была НА тренировке», но нет безличного «была
разминка». Список закрывал бы дыру ровно до следующей формулировки.

Проверка теперь другая по сути: то, что модель назвала активностью, должно
дословно встречаться в тексте человека. Здесь зафиксированы формы отчёта, а не
конкретные слова, и границы, которые проверка обязана держать закрытыми.
"""

import json
import sys
import unittest
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import aiwa_bot as bot


def plan(**workout):
    """Ответ роутера в том виде, в каком его вернула модель на проде."""
    return {
        "action": "workout",
        "target_id": None,
        "subject": "self",
        "status": "completed",
        "polarity": "positive",
        "certainty": "certain",
        "primary_purpose": "journal",
        "confidence": 1.0,
        "workout": {"type": "Силовая", "duration_minutes": None, "rpe": None,
                    "items": [], "note": "", **workout},
    }


REPORTED = plan(items=[{"name": "разминка спины"}, {"name": "приседания"}])


class ImpersonalReportTests(unittest.TestCase):
    def test_the_reported_phrase_is_written_down(self):
        result = bot._normalize_semantic_journal(
            REPORTED, "Так, сейчас была разминка спины с приседаниями.",
        )
        self.assertEqual((result or {}).get("intent"), "logworkout")

    def test_forms_of_the_same_report(self):
        for text, payload in (
            ("сделала разминку спины с приседаниями", REPORTED),
            ("была тренировка ног", plan(note="тренировка ног")),
            ("сегодня была растяжка 20 минут",
             plan(type="Растяжка", duration_minutes=20)),
            ("утром размялась, потом приседания",
             plan(items=[{"name": "приседания"}])),
        ):
            with self.subTest(text=text):
                result = bot._normalize_semantic_journal(payload, text)
                self.assertEqual((result or {}).get("intent"), "logworkout", text)

    def test_case_endings_do_not_break_grounding(self):
        """«разминку» и «разминка» — одно слово, падеж тут ни при чём."""
        self.assertTrue(bot._journal_workout_grounded(
            "сделала разминку спины", plan(items=[{"name": "разминка спины"}]),
        ))


class BoundaryTests(unittest.TestCase):
    """Проверка домена остаётся защитой, а не формальностью."""

    def test_negation_is_not_a_workout(self):
        for text in ("не было сегодня разминки спины",
                     "не тренировалась, только гуляла с собакой в парке"):
            with self.subTest(text=text):
                self.assertIsNone(bot._normalize_semantic_journal(REPORTED, text))

    def test_someone_else_is_not_the_user(self):
        result = bot._normalize_semantic_journal(
            REPORTED, "у подруги была разминка спины с приседаниями",
        )
        self.assertIsNone(result)

    def test_model_cannot_invent_an_activity_absent_from_the_text(self):
        """Главное свойство проверки: названия берутся из текста человека."""
        result = bot._normalize_semantic_journal(
            plan(items=[{"name": "становая тяга"}]),
            "сегодня была тяжёлая встреча и я устала",
        )
        self.assertIsNone(result)

    def test_a_question_never_reaches_the_router(self):
        self.assertFalse(bot._semantic_journal_candidate("когда была разминка спины?"))

    def test_present_tense_plan_is_not_a_completed_workout(self):
        self.assertIsNone(bot._normalize_semantic_journal(
            REPORTED, "сейчас планирую разминку спины и приседания",
        ))



def meal(food_text):
    return {
        "action": "food", "subject": "self", "status": "completed",
        "polarity": "positive", "certainty": "certain",
        "primary_purpose": "journal", "confidence": 1.0,
        "food_text": food_text,
    }


class FoodHasTheSameGapTests(unittest.TestCase):
    """У еды была ровно та же дыра: список глаголов вместо разбора события."""

    def test_impersonal_food_report_is_written_down(self):
        for text, food in (
            ("сегодня был творог и банан", "творог, банан"),
            ("вчера была пицца", "пицца"),
        ):
            with self.subTest(text=text):
                result = bot._normalize_semantic_journal(meal(food), text)
                self.assertEqual((result or {}).get("intent"), "logmeal", text)

    def test_negation_is_not_a_meal(self):
        self.assertIsNone(bot._normalize_semantic_journal(
            meal("завтрак"), "не было ни завтрака, ни обеда",
        ))

    def test_someone_else_is_not_the_user(self):
        self.assertIsNone(bot._normalize_semantic_journal(
            meal("торт"), "у мамы был торт",
        ))

    def test_food_absent_from_the_text_is_not_written_down(self):
        self.assertIsNone(bot._normalize_semantic_journal(
            meal("пирожное"), "сегодня была тяжёлая встреча",
        ))


#: Ответ роутера в v2-форме: модель обязана процитировать то, на чём основано
#: решение, и сервер проверяет цитату на дословность. Это тот путь, по которому
#: идёт прод; тесты, написанные только под v1, пропустили бы поломку целиком —
#: что однажды и произошло.
CONTEXT = {"meals": [], "workouts": []}


def quoted_workout(span, **workout):
    payload = plan(**workout)
    payload["evidence_spans"] = [span]
    return payload


def quoted_meal(span, food_text, items):
    return {
        "action": "food", "target_id": None, "slot": None,
        "evidence_spans": [span], "subject": "self", "status": "completed",
        "polarity": "positive", "certainty": "certain",
        "primary_purpose": "journal", "confidence": 1.0,
        "food_text": food_text,
        "food_record": {
            "title": food_text, "fclass": "смешанное",
            "items": [
                {"name": name, "grams": 100, "kcal": 100, "protein": 5,
                 "fat": 3, "carbs": 10, "evidence_span": name}
                for name in items
            ],
            "unparsed": [],
        },
        "food_entries": [],
    }


class QuotedPathTests(unittest.TestCase):
    """Путь с цитатами — тот, что работает у людей."""

    def test_the_reported_phrase_is_written_down(self):
        result = bot._normalize_semantic_journal(
            quoted_workout(
                "сейчас была разминка спины с приседаниями",
                items=[{"name": "разминка спины"}, {"name": "приседания"}],
            ),
            "Так, сейчас была разминка спины с приседаниями.",
            CONTEXT, enable_v2=True,
        )
        self.assertEqual((result or {}).get("intent"), "logworkout")

    def test_prefixed_run_and_handstand_report_is_written_down(self):
        """Реальная голосовая фраза не должна зависеть от каталога картинок."""
        text = "Побегал по улице 10 минут и постоял на руках несколько минут."
        result = bot._normalize_semantic_journal(
            quoted_workout(
                text,
                type="Кардио",
                duration_minutes=10,
                items=[{"name": "стойка на руках"}],
            ),
            text, CONTEXT, enable_v2=True,
        )
        self.assertEqual((result or {}).get("intent"), "logworkout")

    def test_impersonal_food_report_is_written_down(self):
        result = bot._normalize_semantic_journal(
            quoted_meal("сегодня был творог и банан", "творог и банан",
                        ["творог", "банан"]),
            "сегодня был творог и банан", CONTEXT, enable_v2=True,
        )
        self.assertEqual((result or {}).get("intent"), "logmeal")

    def test_quote_must_carry_the_event_itself(self):
        """Цитата «сегодня» ничего не доказывает, даже если текст про спорт."""
        result = bot._normalize_semantic_journal(
            quoted_workout("Так, сейчас", items=[{"name": "приседания"}]),
            "Так, сейчас была разминка спины с приседаниями.",
            CONTEXT, enable_v2=True,
        )
        self.assertIsNone(result)

    def test_quote_absent_from_the_text_is_refused(self):
        result = bot._normalize_semantic_journal(
            quoted_workout("была становая тяга", items=[{"name": "становая тяга"}]),
            "Так, сейчас была разминка спины с приседаниями.",
            CONTEXT, enable_v2=True,
        )
        self.assertIsNone(result)

    def test_negation_inside_the_quote_is_refused(self):
        result = bot._normalize_semantic_journal(
            quoted_workout("не было разминки спины",
                           items=[{"name": "разминка спины"}]),
            "сегодня не было разминки спины", CONTEXT, enable_v2=True,
        )
        self.assertIsNone(result)



class CorpusTests(unittest.TestCase):
    """Корпус формулировок с настоящими ответами роутера.

    Чинить по одному примеру — способ узнать о следующей формулировке от
    тестировщиков. Здесь записаны ответы боевой модели на два десятка фраз, а
    проверяется своя половина решения: подтверждение домена. Вызовов модели в
    CI нет, поэтому корпус можно гонять на каждый коммит.
    """

    CASES = json.loads(
        (ROOT / "tests/data/journal_route_corpus.json").read_text(encoding="utf-8")
    )["cases"]
    CONTEXT = {"meals": [], "workouts": []}

    def test_every_formulation_lands_where_it_should(self):
        wrong = []
        for case in self.CASES:
            text = case["text"]
            got = None
            if bot._semantic_journal_candidate(text, self.CONTEXT, enable_v2=True):
                got = (bot._normalize_semantic_journal(
                    case["router"], text, self.CONTEXT, enable_v2=True,
                ) or {}).get("intent")
            if got != case["expected"]:
                wrong.append(f"{text} → {got}, ждали {case['expected']}")
        self.assertEqual(wrong, [], "\n  " + "\n  ".join(wrong))

    def test_corpus_covers_both_domains_and_both_answers(self):
        expected = {case["expected"] for case in self.CASES}
        self.assertEqual(expected, {"logworkout", "logmeal", None})



class PrefilterTests(unittest.TestCase):
    """Фильтр решает, звать ли роутер. Он молчит, и это его свойство опаснее.

    «Покрутил велотренажёр минут двадцать» не доходило до модели вовсе: правило
    формы отчёта знало только женский род. Отказ роутера хотя бы виден в
    аналитике, а тут не происходило вообще ничего.
    """

    CONTEXT = {"meals": [], "workouts": []}

    def test_report_is_recognized_in_both_genders(self):
        for text in (
            "покрутил велотренажёр минут двадцать",
            "покрутила велотренажёр минут двадцать",
            "поделал приседания и разминку спины",
            "поделала приседания и разминку спины",
        ):
            with self.subTest(text=text):
                self.assertTrue(
                    bot._semantic_journal_candidate(text, self.CONTEXT, enable_v2=True),
                    text,
                )

    def test_prefixed_run_reaches_the_router_without_catalog_art(self):
        text = "Побегал по улице 10 минут и постоял на руках несколько минут."
        self.assertFalse(bot.SA.RESOLVER.mentions(text))
        self.assertTrue(bot._journal_workout_named(text, {}))
        self.assertTrue(
            bot._semantic_journal_candidate(text, self.CONTEXT, enable_v2=True)
        )
        self.assertTrue(bot._journal_completed_event_signal(text))

    def test_skate_report_uses_activity_vocabulary_not_food_catalog(self):
        text = "Немного поездил на скейте, минут 10:15 в быстром темпе по улице."
        self.assertFalse(bot.SA.RESOLVER.mentions(text))
        with mock.patch.object(bot.FA.RESOLVER, "mentions", return_value=False):
            self.assertTrue(bot._journal_workout_named(text, {}))
            self.assertTrue(
                bot._semantic_journal_candidate(text, self.CONTEXT, enable_v2=True)
            )

    def test_past_tense_alone_does_not_call_the_model(self):
        """Новая ветка требует прошедшего времени и названной еды/активности.

        Иначе фильтр звал бы модель на любую фразу в прошедшем времени —
        а он стоит на пути каждого сообщения.
        """
        for text in (
            "покрутил головой и пошёл дальше",
            "привет, как дела",
            "расскажи про лютеиновую фазу",
        ):
            with self.subTest(text=text):
                self.assertFalse(
                    bot._semantic_journal_candidate(text, self.CONTEXT, enable_v2=True),
                    text,
                )


if __name__ == "__main__":
    unittest.main()
