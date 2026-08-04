"""Отметка цикла пересобирает всё, что от неё считается.

Репорт: в первый день месячных питание и нагрузка обновились, а карточка на
главной осталась с прошлой фазой — «сегодня 39 день». Сброс кэша висел на
вызывающих: приложение его звало, чат и реестр действий — нет.

Отметку можно поставить с четырёх поверхностей, и помнить про сброс на каждой
— ровно тот способ, которым карточка и протухла. Поэтому здесь проверяется
запись, а не обработчик: любой путь, меняющий цикл, обязан сбросить
производные ответы.
"""

import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import aiwa_bot as bot


class CycleWriteInvalidatesDerivedState(unittest.TestCase):
    CID = 424242

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "cycle.db")
        bot._DB_SCHEMA_PATH = None
        bot.ensure_db_schema()
        self.addCleanup(self._restore)
        bot.upsert(self.CID, mode="cycle", cycle_len=28, last_period="2026-06-26")
        bot._TODAY_CACHE_REVISION.pop(self.CID, None)

    def _restore(self):
        bot.DB = self.old_db
        bot._DB_SCHEMA_PATH = None
        bot._TODAY_CACHE_REVISION.pop(self.CID, None)

    def _revision(self):
        return bot._TODAY_CACHE_REVISION.get(self.CID, 0)

    def _assert_invalidates(self, label, write):
        before = self._revision()
        bot._TODAY_CACHE[(self.CID, "cycle", 0, before, "2026-08-04")] = {"summary": "старое"}
        self.assertTrue(write(), f"{label}: запись не прошла")
        self.assertGreater(
            self._revision(), before,
            f"{label}: производные ответы остались от прошлой фазы",
        )
        self.assertFalse(
            [key for key in bot._TODAY_CACHE if key[0] == self.CID],
            f"{label}: сводка дня осталась в памяти",
        )

    def test_period_start(self):
        self._assert_invalidates(
            "старт месячных",
            lambda: bot.db_mark_period(self.CID, "2026-08-04"),
        )

    def test_period_start_repeated(self):
        """Повтор той же даты — тоже повод пересобрать: раньше мог и не быть."""
        bot.db_mark_period(self.CID, "2026-08-04")
        self._assert_invalidates(
            "повторный старт",
            lambda: bot.db_mark_period(self.CID, "2026-08-04"),
        )

    def test_period_end(self):
        bot.db_mark_period(self.CID, "2026-08-01")
        self._assert_invalidates(
            "конец месячных",
            lambda: bot.cyc_set_end(self.CID, "2026-08-01", "2026-08-04"),
        )

    def test_period_delete(self):
        bot.db_mark_period(self.CID, "2026-08-01")
        self._assert_invalidates(
            "удаление отметки",
            lambda: bot.period_delete_at(self.CID, "2026-08-01"),
        )

    def test_history_import(self):
        self._assert_invalidates(
            "импорт истории",
            lambda: bot.cyc_add(self.CID, "2026-05-01", "2026-05-05"),
        )

    def test_registry_action_marks_and_invalidates(self):
        """Отметка из чата через реестр действий — та же запись, тот же сброс."""
        before = self._revision()
        with mock.patch.object(bot, "schedule_daily"):
            result = bot._act_period_date(self.CID, {"iso": "2026-08-04"})
        self.assertTrue(result.get("ok"), result)
        self.assertGreater(self._revision(), before)


if __name__ == "__main__":
    unittest.main()
