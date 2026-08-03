"""Формат выгрузки: один и тот же на экспорт и на импорт."""

import json
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import portability as P


PROFILE = {
    "last_period": "2026-07-20", "cycle_len": 29, "send_time": "08:00",
    "mode": "cycle", "height": 168, "weight": 60.0, "age": 30,
    "voice_reply": "text", "secret": "не должно попасть",
}
SECTIONS = {
    "cycles": [{"start_date": "2026-06-21", "end_date": "2026-06-26"}],
    "meals": [{"d": "2026-07-01", "title": "Творог", "kcal": 240, "protein": 34,
               "лишнее": "поле"}],
    "workouts": [{"d": "2026-07-02", "type": "Ходьба", "duration": "40"}],
    "logs": [{"log_date": "2026-07-03", "energy": 4, "symptoms": "[]"}],
    "intimacy": [{"d": "2026-07-04"}],
    "memory": [{"mkey": "цель", "mval": "больше энергии", "updated": "2026-07-05"}],
}


class DumpTests(unittest.TestCase):
    def test_round_trip_keeps_every_section(self):
        doc = P.dump(PROFILE, SECTIONS, exported_at="2026-08-03T12:00:00+03:00")
        back = P.load(P.to_json(doc))
        for name in P.SECTIONS:
            self.assertEqual(back["counts"][name], len(SECTIONS[name]), name)
        self.assertEqual(back["profile"]["cycle_len"], 29)
        self.assertEqual(back["cycles"][0]["end_date"], "2026-06-26")

    def test_unknown_profile_fields_are_not_exported(self):
        doc = P.dump(PROFILE, SECTIONS, exported_at="2026-08-03T12:00:00+03:00")
        self.assertNotIn("secret", doc["profile"])

    def test_unknown_row_fields_are_dropped_not_fatal(self):
        doc = P.dump(PROFILE, SECTIONS, exported_at="2026-08-03T12:00:00+03:00")
        self.assertNotIn("лишнее", doc["meals"][0])

    def test_exported_at_comes_from_the_caller(self):
        doc = P.dump({}, {}, exported_at="2026-08-03T12:00:00+03:00")
        self.assertEqual(doc["exported_at"], "2026-08-03T12:00:00+03:00")

    def test_summary_reads_like_a_sentence(self):
        doc = P.dump(PROFILE, SECTIONS, exported_at="x")
        text = P.summary(doc)
        self.assertIn("1 циклов", text)
        self.assertIn("приёмов пищи", text)
        self.assertEqual(P.summary(P.dump({}, {}, exported_at="x")), "записей пока нет")


class LoadTests(unittest.TestCase):
    def test_foreign_format_is_refused(self):
        with self.assertRaisesRegex(P.ExportError, "чужой формат"):
            P.load({"schema": "flo-export-v9", "meals": []})

    def test_broken_json_is_refused(self):
        with self.assertRaisesRegex(P.ExportError, "не разобрала"):
            P.load("{это не json")

    def test_bad_date_is_refused_with_the_section_named(self):
        doc = {"schema": P.SCHEMA, "cycles": [{"start_date": "21.06.2026"}]}
        with self.assertRaisesRegex(P.ExportError, "cycles"):
            P.load(doc)

    def test_section_must_be_a_list(self):
        with self.assertRaisesRegex(P.ExportError, "должен быть списком"):
            P.load({"schema": P.SCHEMA, "meals": {"d": "2026-07-01"}})

    def test_missing_sections_are_empty_not_an_error(self):
        loaded = P.load({"schema": P.SCHEMA})
        self.assertEqual(loaded["counts"]["meals"], 0)
        self.assertEqual(loaded["meals"], [])

    def test_import_from_another_app_is_an_adapter_not_a_feature(self):
        """Смысл общего формата: чужой источник переводится в него и грузится."""
        foreign = [{"period_start": "2026-06-21"}, {"period_start": "2026-05-24"}]
        adapted = {
            "schema": P.SCHEMA,
            "cycles": [{"start_date": row["period_start"]} for row in foreign],
        }
        loaded = P.load(adapted)
        self.assertEqual(loaded["counts"]["cycles"], 2)
        self.assertEqual(loaded["cycles"][0]["start_date"], "2026-06-21")


if __name__ == "__main__":
    unittest.main()
