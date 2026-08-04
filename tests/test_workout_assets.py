"""Картинки тренировок решаются на сервере тем же механизмом, что и еда.

Репорт тестировщиков: у «Мягкой разминки для спины» картинки не было вообще —
не заглушка, а пустое место. Причина системная: у тренировок не было
резолвера. Подбор жил на фронте отдельным кодом (точное совпадение, вхождение
подстроки, список из двадцати корней руками), словоформ не знал — «спины» не
находило каталожную «Спину» — и на промахе возвращал null.

Здесь зафиксировано то, что должно быть верно независимо от состава каталога:
промах даёт заглушку, а не пустоту; свободные формулировки находят каталог;
подбор делает сервер.
"""

import asyncio
import json
import os
import re
import sqlite3
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import aiwa_bot as bot
import food_assets as FA
import sport_assets as SA


class WorkoutResolverTests(unittest.TestCase):
    def test_miss_gives_a_placeholder_not_an_empty_row(self):
        """Именно этого не было: подбор возвращал null и строка пустела."""
        result = SA.resolve("Мягкая разминка для спины")
        self.assertEqual(result["asset_state"], "missing")
        self.assertEqual(result["image_url"], SA.TRAIN_PLACEHOLDER)

    def test_placeholder_file_is_published(self):
        path = ROOT / "webapp2" / SA.TRAIN_PLACEHOLDER.lstrip("/")
        self.assertTrue(path.exists(), SA.TRAIN_PLACEHOLDER)

    def test_free_form_names_find_the_catalog(self):
        """Названия вариантов придумывает модель, каталожных подписей не зная."""
        for phrase in ("Планка 3 подхода", "лёгкая йога", "Бег", "Ягодичный мост"):
            with self.subTest(phrase=phrase):
                self.assertEqual(SA.resolve(phrase)["asset_state"], "ready", phrase)

    def test_word_forms_are_reduced_like_in_food(self):
        """Тот же класс ошибки, что «нектарины» у еды: «спины» вместо «спина»."""
        for phrase in ("планки", "растяжки", "прогулки", "ходьбы", "скакалки"):
            with self.subTest(phrase=phrase):
                self.assertEqual(SA.resolve(phrase)["asset_state"], "ready", phrase)

    def test_equipment_is_not_invented(self):
        """«Приседания» есть только с гантелью, со штангой и на TRX.

        Выбрать одну из трёх — значит дорисовать человеку снаряд, которого он
        не называл. Отказ честнее: заглушку заменит своя картинка.
        """
        self.assertEqual(SA.resolve("Приседания")["asset_state"], "missing")

    def test_unrelated_words_do_not_borrow_someone_elses_art(self):
        self.assertEqual(SA.resolve("Своё")["asset_state"], "missing")

    def test_decorate_keeps_the_record_and_adds_the_picture(self):
        record = SA.decorate({"id": 7, "type": "Йога", "duration": "30 мин"})
        self.assertEqual(record["id"], 7)
        self.assertEqual(record["duration"], "30 мин")
        self.assertTrue(record["image_url"].startswith("/assets/train/"))

    def test_plan_options_are_decorated(self):
        plan = SA.decorate_plan({
            "summary": "…",
            "options": [{"name": "Мягкая разминка для спины"}, {"name": "Йога"}],
        })
        self.assertEqual(plan["summary"], "…")
        self.assertEqual(
            [option["asset_state"] for option in plan["options"]],
            ["missing", "ready"],
        )

    def test_catalogs_do_not_share_identifiers(self):
        """Очередь догенерации общая, ключ — canonical_id + style_version."""
        self.assertNotEqual(SA.canonical_id("Йога"), FA.canonical_id("Йога"))
        self.assertTrue(SA.canonical_id("Йога").startswith("sport:"))


class ServerDecidesTheImageTests(unittest.TestCase):
    """Подбор на клиенте — это и был баг: чинили еду, тренировки не менялись."""

    SOURCE = ROOT / "frontend/src/aiwa/screens/ActivityScreen.jsx"

    def _code(self):
        source = self.SOURCE.read_text(encoding="utf-8")
        return re.sub(r"//[^\n]*|/\*.*?\*/", "", source, flags=re.S)

    def test_no_client_side_matcher(self):
        code = self._code()
        self.assertNotIn("TRAIN_SYNONYMS", code)
        self.assertNotIn("assets/train/manifest.json", code)

    def test_row_takes_the_url_from_the_server(self):
        self.assertIn("image_url", self._code())


class ApiContractTests(unittest.TestCase):
    """Ручки экрана отдают картинку вместе с данными."""

    SOURCE = (ROOT / "aiwa_bot.py").read_text(encoding="utf-8")

    def test_train_screen_decorates_workouts(self):
        self.assertIn("_with_workout_assets(workouts_of(cid))", self.SOURCE)

    def test_history_day_decorates_workouts(self):
        self.assertIn("_with_workout_assets(workouts_of(cid, d))", self.SOURCE)

    def test_plan_options_are_decorated_on_both_paths(self):
        self.assertEqual(self.SOURCE.count("SA.decorate_plan("), 3)

    def test_misses_go_to_the_generation_queue(self):
        self.assertIn("assets=SA", self.SOURCE)


class SharedQueueTests(unittest.TestCase):
    """Одна очередь на оба каталога: таблицы всегда были с style_version."""

    def test_manifest_of_each_catalog_has_its_own_style(self):
        self.assertNotEqual(FA.STYLE_VERSION, SA.STYLE_VERSION)

    def test_train_manifest_is_not_empty(self):
        manifest = json.loads(
            (ROOT / "webapp2/assets/train/manifest.json").read_text(encoding="utf-8")
        )
        self.assertGreater(len(manifest), 100)


if __name__ == "__main__":
    unittest.main()


class GenerationBudgetTests(unittest.TestCase):
    """Догенерация — общая очередь, но не общий кошелёк.

    Очередь разбирается по времени создания. С одним лимитом на двоих каталог
    с бо́льшим потоком промахов вытеснял бы второй: в день, когда набежало
    много новых тренировок, еда осталась бы без картинок вообще.
    """

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.old_db = bot.DB
        self.old_seen = bot._FOOD_ASSET_SEEN
        self.old_queue = bot._FOOD_ASSET_CANDIDATES
        bot.DB = str(Path(self.tmp.name) / "assets.db")
        bot._DB_SCHEMA_PATH = None
        bot.ensure_db_schema()
        bot._FOOD_ASSET_SEEN = {}
        self.addCleanup(self._restore)

    def _restore(self):
        bot.DB = self.old_db
        bot._DB_SCHEMA_PATH = None
        bot._FOOD_ASSET_SEEN = self.old_seen
        bot._FOOD_ASSET_CANDIDATES = self.old_queue

    def _spend(self, style, count):
        now = bot.datetime.now(bot.TZ).isoformat()
        conn = sqlite3.connect(bot.DB)
        conn.executemany(
            "INSERT INTO food_asset_attempts(job_id,started_at,style_version)"
            " VALUES(?,?,?)",
            [(f"spent-{style}-{i}", now, style) for i in range(count)],
        )
        conn.commit()
        conn.close()

    def test_spent_sport_budget_does_not_block_food(self):
        bot._enqueue_food_asset_job(
            FA.canonical_id("тарелка неизвестного"), "тарелка неизвестного",
            FA.STYLE_VERSION,
        )
        self._spend(SA.STYLE_VERSION, 50)
        with mock.patch.object(bot, "_SPORT_ASSET_DAILY_MAX", 5):
            job = bot._claim_food_asset_job()
        self.assertIsNotNone(job)
        self.assertEqual(job["style_version"], FA.STYLE_VERSION)

    def test_own_budget_stops_own_catalog(self):
        bot._enqueue_food_asset_job(
            SA.canonical_id("заплыв на сапе"), "заплыв на сапе", SA.STYLE_VERSION,
        )
        self._spend(SA.STYLE_VERSION, 5)
        with mock.patch.object(bot, "_SPORT_ASSET_DAILY_MAX", 5):
            self.assertIsNone(bot._claim_food_asset_job())

    def test_approximate_workout_is_not_queued(self):
        """«Прогулка» для «Спокойной прогулки 30 минут» — та же активность."""
        record = SA.decorate({"type": "Спокойная прогулка 30 минут"})
        self.assertEqual(record["match_quality"], "approximate")
        with mock.patch.dict(os.environ, {"AIWA_SPORT_ASSET_GENERATION": "1"}):
            bot._FOOD_ASSET_CANDIDATES = asyncio.Queue(maxsize=4)
            self.assertEqual(
                bot._offer_food_asset_candidates([record], assets=SA), 0
            )

    def test_missing_workout_is_queued_under_its_own_style(self):
        record = SA.decorate({"type": "Заплыв на сапе"})
        with mock.patch.dict(os.environ, {"AIWA_SPORT_ASSET_GENERATION": "1"}):
            bot._FOOD_ASSET_CANDIDATES = asyncio.Queue(maxsize=4)
            self.assertEqual(
                bot._offer_food_asset_candidates([record], assets=SA), 1
            )
            _, label, style = bot._FOOD_ASSET_CANDIDATES.get_nowait()
        self.assertEqual(style, SA.STYLE_VERSION)
        self.assertEqual(label, "Заплыв на сапе")

    def test_ui_stub_type_is_not_generated(self):
        """«Своё» — подпись кнопки, а не активность: рисовать нечего."""
        record = SA.decorate({"type": "Своё"})
        with mock.patch.dict(os.environ, {"AIWA_SPORT_ASSET_GENERATION": "1"}):
            bot._FOOD_ASSET_CANDIDATES = asyncio.Queue(maxsize=4)
            self.assertEqual(
                bot._offer_food_asset_candidates([record], assets=SA), 0
            )
