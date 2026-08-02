import asyncio
import json
import os
import tempfile
import threading
import unittest
from datetime import date, timedelta
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


class FakeJsonRequest:
    def __init__(self, body):
        self.body = body

    async def json(self):
        return self.body


class FakePostRequest:
    def __init__(self, body):
        self.body = body

    async def post(self):
        return self.body


class Phase3BackendContractTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "phase3.db")
        self.cid = 9301
        bot._activate_user(self.cid)
        bot.upsert(
            self.cid,
            mode="irregular",
            height=168,
            weight=62,
            age=31,
            send_time="08:00",
            daily_summary_enabled=1,
        )

    def tearDown(self):
        bot.DB = self.old_db
        self.tmp.cleanup()

    def call(self, handler, body, cid=None):
        with mock.patch.object(bot, "_verify_init", return_value=cid or self.cid):
            response = asyncio.run(handler(FakeJsonRequest(body)))
        return response, json.loads(response.text)

    def journal_body(self, target=None, **changes):
        body = {
            "date": target or bot.dtoday().isoformat(),
            "energy": 2,
            "mood": 3,
            "symptoms": ["tired"],
            "custom_symptoms": ["Сухость глаз"],
            "intimacy": True,
        }
        body.update(changes)
        return body

    def test_read_history_boundaries_are_364_inclusive_without_today_fallback(self):
        accepted = (bot.dtoday() - timedelta(days=364)).isoformat()
        rejected = (bot.dtoday() - timedelta(days=365)).isoformat()
        bot.meal_add(self.cid, {
            "title": "Архивный завтрак", "kcal": 200, "protein": 10,
            "fat": 5, "carbs": 30, "items": [],
        }, d=accepted)

        response, payload = self.call(bot._api_diary, {"d": accepted})
        self.assertEqual(response.status, 200)
        self.assertEqual(payload["date"], accepted)
        self.assertEqual(payload["meals"][0]["title"], "Архивный завтрак")

        response, payload = self.call(bot._api_diary, {"d": rejected})
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "date_out_of_range")
        self.assertNotIn("meals", payload)

        response, payload = self.call(bot._api_train_day, {"d": accepted})
        self.assertEqual(response.status, 200)
        self.assertEqual(payload["d"], accepted)
        response, payload = self.call(bot._api_train_day, {"d": rejected})
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "date_out_of_range")

        future = (bot.dtoday() + timedelta(days=1)).isoformat()
        for handler in (bot._api_diary, bot._api_train_day):
            response, payload = self.call(handler, {"d": future})
            self.assertEqual(response.status, 400)
            self.assertEqual(payload["error"], "future_date")

    def test_data_seeds_full_364_day_journal_window_before_absolute_edit(self):
        boundary = (bot.dtoday() - timedelta(days=364)).isoformat()
        bot.log_set(self.cid, boundary, energy=1, mood=2, symptoms="head")
        payload = json.loads(bot._api_data_sync(self.cid, {}).text)
        saved = next(item for item in payload["sym_log"] if item["date"] == boundary)
        self.assertEqual(saved["energy"], 1)
        self.assertEqual(saved["mood"], 2)
        self.assertEqual(saved["symptoms"], ["head"])

    def test_moscow_day_guard_rejects_future_and_uses_moscow_today(self):
        moscow_today = date(2026, 1, 2)
        with mock.patch.object(bot, "dtoday", return_value=moscow_today):
            parsed, error, _ = bot._validated_moscow_iso("2026-01-02", max_age=364)
            self.assertEqual(parsed, moscow_today)
            self.assertIsNone(error)
            parsed, error, status = bot._validated_moscow_iso("2026-01-03", max_age=364)
            self.assertIsNone(parsed)
            self.assertEqual(status, 400)
            self.assertEqual(error["error"], "future_date")

    def test_workout_90_is_written_with_canonical_receipt(self):
        target = (bot.dtoday() - timedelta(days=90)).isoformat()
        body = {"date": target, "type": "Своё", "duration": "30 мин", "rpe": "средняя",
                "items": [{"name": "сквош"}]}
        with mock.patch.object(bot, "llm_to_thread", new=mock.AsyncMock(return_value="Хорошая нагрузка.")):
            response, payload = self.call(bot._api_workout, body)
        self.assertEqual(response.status, 200)
        self.assertTrue(payload["ok"])
        self.assertEqual(payload["date"], target)
        self.assertEqual(payload["workout"]["date"], target)
        self.assertEqual(payload["workout"]["type"], "Сквош")
        self.assertIsInstance(payload["workout"]["id"], int)

    def test_workout_request_id_replays_commit_without_llm_or_duplicate(self):
        target = (bot.dtoday() - timedelta(days=3)).isoformat()
        body = {
            "request_id": "workout-submit-123",
            "date": target, "type": "Пилатес", "duration": "35 мин",
            "rpe": "средняя", "items": [{"name": "Пилатес"}],
        }
        llm = mock.AsyncMock(return_value="Хорошая нагрузка.")
        original_workout_get = bot.workout_get
        reads = 0

        def first_receipt_read_fails(cid, wid):
            nonlocal reads
            reads += 1
            if reads == 1:
                raise RuntimeError("post-commit receipt read failed")
            return original_workout_get(cid, wid)

        with (
            mock.patch.object(bot, "llm_to_thread", new=llm),
            mock.patch.object(
                bot, "workout_get", side_effect=first_receipt_read_fails
            ),
        ):
            first_response, first = self.call(bot._api_workout, body)
            second_response, second = self.call(bot._api_workout, body)
            conflict_response, conflict = self.call(
                bot._api_workout, {**body, "duration": "55 мин"}
            )
        self.assertEqual(first_response.status, 200)
        self.assertTrue(first["committed"])
        self.assertTrue(first["receipt_pending"])
        self.assertEqual(second_response.status, 200)
        self.assertTrue(second["duplicate"])
        self.assertEqual(second["workout"]["id"], first["workout"]["id"])
        self.assertEqual(llm.await_count, 1)
        self.assertEqual(len(bot.workouts_of(self.cid, target)), 1)
        self.assertEqual(conflict_response.status, 409)
        self.assertEqual(conflict["error"], "workout_mutation_conflict")

    def test_invalid_or_91_day_workout_never_calls_llm_or_writes_today(self):
        llm = mock.AsyncMock(return_value="unused")
        target = (bot.dtoday() - timedelta(days=91)).isoformat()
        body = {"date": target, "type": "Пилатес", "items": []}
        with mock.patch.object(bot, "llm_to_thread", new=llm):
            response, payload = self.call(bot._api_workout, body)
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "date_out_of_range")
        llm.assert_not_awaited()
        self.assertEqual(bot.workouts_of(self.cid), [])

        with mock.patch.object(bot, "llm_to_thread", new=llm):
            response, payload = self.call(bot._api_workout, {**body, "date": "not-a-date"})
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "invalid_date")
        llm.assert_not_awaited()

        future = (bot.dtoday() + timedelta(days=1)).isoformat()
        with mock.patch.object(bot, "llm_to_thread", new=llm):
            response, payload = self.call(bot._api_workout, {**body, "date": future})
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "future_date")
        llm.assert_not_awaited()
        self.assertEqual(bot.workouts_of(self.cid), [])

    def test_journal_absolute_retry_is_idempotent_and_fixed_to_payload_date(self):
        target = (bot.dtoday() - timedelta(days=2)).isoformat()
        body = self.journal_body(target)
        body["custom_symptoms"].append("голова, спина")
        first_payload, first_status = bot._save_journal_atomic(self.cid, body)
        second_payload, second_status = bot._save_journal_atomic(self.cid, body)
        self.assertEqual(first_status, 200)
        self.assertEqual(second_status, 200)
        self.assertEqual(first_payload["date"], target)
        self.assertEqual(second_payload["log"], first_payload["log"])
        self.assertEqual(bot.log_get(self.cid, target)["energy"], 2)
        self.assertIn("custom:сухость глаз", bot.log_get(self.cid, target)["symptoms"])
        self.assertIn("custom:голова / спина", bot.log_get(self.cid, target)["symptoms"])
        self.assertIn(target, bot.pa_list(self.cid))
        self.assertIsNone(bot.log_get(self.cid, bot.dtoday().isoformat()))

        c = bot.db()
        intimacy_count = c.execute(
            "SELECT COUNT(*) FROM intimacy WHERE chat_id=? AND d=?", (self.cid, target)
        ).fetchone()[0]
        c.close()
        self.assertEqual(intimacy_count, 1)

    def test_journal_failure_in_middle_rolls_back_every_table(self):
        target = (bot.dtoday() - timedelta(days=1)).isoformat()
        c = bot.db()
        c.execute(
            """CREATE TRIGGER fail_phase3_intimacy BEFORE INSERT ON intimacy
               BEGIN SELECT RAISE(ABORT, 'injected failure'); END"""
        )
        c.commit(); c.close()

        payload, status = bot._save_journal_atomic(self.cid, self.journal_body(target))
        self.assertEqual(status, 500)
        self.assertEqual(payload["error"], "journal_save_failed")
        self.assertIsNone(bot.log_get(self.cid, target))
        self.assertNotIn(target, bot.pa_list(self.cid))

    def test_journal_rejects_queued_write_from_reactivated_lifecycle(self):
        target = (bot.dtoday() - timedelta(days=1)).isoformat()
        original_save = bot._save_journal_atomic

        def reactivate_before_write(cid, body, generation):
            bot.del_user(cid)
            bot._activate_user(cid)
            bot.upsert(cid, mode="irregular", height=170, weight=64, age=32)
            return original_save(cid, body, generation)

        with mock.patch.object(
            bot, "_save_journal_atomic", side_effect=reactivate_before_write
        ):
            response, payload = self.call(
                bot._api_journal, self.journal_body(target)
            )

        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "deleted")
        self.assertIsNone(bot.log_get(self.cid, target))
        self.assertNotIn(target, bot.pa_list(self.cid))

    def test_journal_period_extends_only_adjacent_range_never_a_gap(self):
        today = bot.dtoday()
        bot.upsert(self.cid, mode="cycle", cycle_len=28, period_len=1)
        gap_start = (today - timedelta(days=2)).isoformat()
        bot.cyc_add(self.cid, gap_start, gap_start)
        payload, status = bot._save_journal_atomic(
            self.cid, self.journal_body(period=True)
        )
        self.assertEqual(status, 200)
        self.assertTrue(payload["period"])
        periods = bot.periods_of(self.cid)
        self.assertIn({"start": gap_start, "end": gap_start}, periods)
        self.assertIn({"start": today.isoformat(), "end": today.isoformat()}, periods)

        other = self.cid + 1
        bot._activate_user(other)
        yesterday = (today - timedelta(days=1)).isoformat()
        bot.upsert(other, mode="cycle", cycle_len=28, last_period=yesterday, period_len=1)
        bot.cyc_add(other, yesterday, yesterday)
        payload, status = bot._save_journal_atomic(
            other, self.journal_body(period=True)
        )
        self.assertEqual(status, 200)
        self.assertEqual(bot.periods_of(other), [{"start": yesterday, "end": today.isoformat()}])

        virtual = self.cid + 2
        bot._activate_user(virtual)
        virtual_start = (today - timedelta(days=3)).isoformat()
        bot.upsert(
            virtual,
            mode="cycle",
            cycle_len=28,
            last_period=virtual_start,
            period_len=3,
            period_end=None,
        )
        bot.cyc_add(virtual, virtual_start)
        payload, status = bot._save_journal_atomic(
            virtual, self.journal_body(period=True)
        )
        self.assertEqual(status, 200)
        self.assertTrue(payload["period"])
        self.assertEqual(
            bot.periods_of(virtual),
            [{"start": virtual_start, "end": today.isoformat()}],
        )

    def test_journal_unmarks_open_period_days_from_historical_average(self):
        today = bot.dtoday()
        for offset, average in enumerate((6, 7), start=10):
            with self.subTest(average=average):
                cid = self.cid + offset
                bot._activate_user(cid)
                first = today - timedelta(days=100)
                second = today - timedelta(days=60)
                current = today - timedelta(days=average - 1)
                bot.upsert(
                    cid, mode="cycle", cycle_len=28,
                    last_period=current.isoformat(), period_len=None,
                    period_end=None,
                )
                for start in (first, second):
                    bot.cyc_add(
                        cid, start.isoformat(),
                        (start + timedelta(days=average - 1)).isoformat(),
                    )
                bot.cyc_add(cid, current.isoformat())

                c = bot.db()
                try:
                    self.assertTrue(
                        bot._journal_period_marked_conn(
                            c, cid, today.isoformat()
                        )
                    )
                finally:
                    c.close()
                body = self.journal_body(period=False)
                payload, status = bot._save_journal_atomic(cid, body)
                self.assertEqual(status, 200)
                self.assertFalse(payload["period"])
                latest = bot.periods_of(cid)[-1]
                self.assertEqual(
                    latest["end"],
                    (today - timedelta(days=1)).isoformat(),
                )

    def test_journal_invalid_future_and_period_on_past_are_rejected_without_write(self):
        future = (bot.dtoday() + timedelta(days=1)).isoformat()
        payload, status = bot._save_journal_atomic(self.cid, self.journal_body(future))
        self.assertEqual(status, 400)
        self.assertEqual(payload["error"], "future_date")
        self.assertIsNone(bot.log_get(self.cid, future))

        past = (bot.dtoday() - timedelta(days=1)).isoformat()
        payload, status = bot._save_journal_atomic(
            self.cid, self.journal_body(past, period=True)
        )
        self.assertEqual(status, 400)
        self.assertEqual(payload["error"], "period_date")

    def test_irregular_period_survives_canonical_reload_and_none_rejects_it(self):
        payload, status = bot._save_journal_atomic(
            self.cid, self.journal_body(period=True)
        )
        self.assertEqual(status, 200)
        self.assertTrue(payload["period"])
        reloaded = json.loads(bot._api_data_sync(self.cid, {}).text)
        today = bot.dtoday().isoformat()
        self.assertIn({"start": today, "end": today}, reloaded["periods"])
        self.assertIn(today, reloaded["cycles"])

        bot.upsert(
            self.cid,
            mode="none",
            last_period=None,
            cycle_len=None,
            period_end=None,
            period_len=None,
        )
        payload, status = bot._save_journal_atomic(
            self.cid, self.journal_body(period=True)
        )
        self.assertEqual(status, 409)
        self.assertEqual(payload["error"], "profile_mode")

    def test_diary_mutations_require_ownership_and_return_target_day_receipt(self):
        target = (bot.dtoday() - timedelta(days=5)).isoformat()
        mid = bot.meal_add(self.cid, {
            "title": "Каша", "kcal": 250, "protein": 8, "fat": 6,
            "carbs": 42, "grams": 200, "items": [], "slot": "breakfast",
        }, d=target)
        response, payload = self.call(bot._api_diary_edit, {
            "id": mid, "title": "Овсянка", "kcal": "270", "protein": "9",
            "fat": "7", "carbs": "44", "grams": "210", "slot": "breakfast",
        })
        self.assertEqual(response.status, 200)
        self.assertEqual(payload["date"], target)
        self.assertEqual(payload["diary"]["date"], target)
        self.assertIn("asset_revision", payload["diary"])
        self.assertEqual(payload["meal"]["title"], "Овсянка")

        response, payload = self.call(bot._api_diary_scale, {"id": mid, "grams": "210.9"})
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "invalid_grams")
        self.assertEqual(bot.meal_get(self.cid, mid)["grams"], 210)

        response, payload = self.call(bot._api_diary_slot, {"id": mid, "slot": "dinner"})
        self.assertEqual(response.status, 200)
        self.assertEqual(payload["date"], target)
        self.assertEqual(payload["diary"]["date"], target)
        self.assertEqual(payload["meal"]["slot"], "dinner")

        response, payload = self.call(bot._api_diary_scale, {"id": mid, "grams": "420"})
        self.assertEqual(response.status, 200)
        self.assertEqual(payload["date"], target)
        self.assertEqual(payload["diary"]["date"], target)
        self.assertEqual(payload["meal"]["grams"], 420)
        self.assertEqual(payload["diary"]["meals"][0]["grams"], 420)

        response, payload = self.call(bot._api_diary_edit, {
            "id": mid + 0.9, "title": "Не должна примениться",
        })
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "invalid_meal_id")
        self.assertEqual(bot.meal_get(self.cid, mid)["title"], "Овсянка")

        other = self.cid + 7
        bot._activate_user(other)
        bot.upsert(other, mode="irregular")
        response, payload = self.call(bot._api_diary_del, {"id": mid}, cid=other)
        self.assertEqual(response.status, 404)
        self.assertEqual(payload["error"], "meal_not_found")
        self.assertIsNotNone(bot.meal_get(self.cid, mid))

        response, payload = self.call(bot._api_diary_del, {"id": mid})
        self.assertEqual(response.status, 200)
        self.assertEqual(payload["date"], target)
        self.assertEqual(payload["deleted_id"], mid)
        self.assertEqual(payload["diary"]["meals"], [])

    def test_diary_mutation_exception_is_not_swallowed(self):
        mid = bot.meal_add(self.cid, {
            "title": "Йогурт", "kcal": 100, "protein": 5, "fat": 3,
            "carbs": 12, "grams": 150, "items": [],
        })
        with mock.patch.object(bot, "meal_edit", side_effect=sqlite_failure()):
            response, payload = self.call(bot._api_diary_edit, {"id": mid, "title": "Кефир"})
        self.assertEqual(response.status, 500)
        self.assertEqual(payload["error"], "diary_edit_failed")
        self.assertEqual(bot.meal_get(self.cid, mid)["title"], "Йогурт")

    def test_food_photo_finalize_returns_canonical_receipt_or_structured_error(self):
        generation = bot._user_generation(self.cid)
        parsed = {
            "title": "Салат", "kcal": 240, "protein": 8, "fat": 12,
            "carbs": 24, "grams": 250, "items": [{"name": "овощи"}],
        }
        response = bot._finalize_food_photo(
            self.cid, generation, parsed, [], bot.profile_of(bot.row(self.cid))
        )
        payload = json.loads(response.text)
        self.assertEqual(response.status, 200)
        self.assertTrue(payload["ok"])
        self.assertEqual(payload["date"], bot.dtoday().isoformat())
        self.assertEqual(payload["diary"]["date"], bot.dtoday().isoformat())
        self.assertIn("asset_revision", payload["diary"])
        self.assertEqual(payload["meal"]["id"], payload["meal_id"])

        response = bot._finalize_food_photo(
            self.cid, generation, None, [], bot.profile_of(bot.row(self.cid))
        )
        payload = json.loads(response.text)
        self.assertEqual(response.status, 422)
        self.assertFalse(payload["ok"])
        self.assertEqual(payload["error"], "food_not_recognized")

    def test_food_photo_retry_after_receipt_failure_is_idempotent(self):
        generation = bot._user_generation(self.cid)
        existing_id = bot.meal_add(self.cid, {
            "title": "Завтрак", "kcal": 300, "protein": 12, "fat": 8,
            "carbs": 42, "grams": 220, "items": [],
        })
        parsed = {
            "title": "Салат", "kcal": 240, "protein": 8, "fat": 12,
            "carbs": 24, "grams": 250, "items": [{"name": "овощи"}],
        }
        target, mutation_key, args_hash = bot._food_photo_mutation_identity(
            b"same-photo"
        )
        with (
            mock.patch.object(
                bot, "_diary_mutation_receipt",
                side_effect=RuntimeError("receipt read failed"),
            ),
            mock.patch.object(bot, "ev") as event,
        ):
            first = bot._finalize_food_photo(
                self.cid, generation, parsed, [7],
                bot.profile_of(bot.row(self.cid)), mutation_key, args_hash,
                target,
            )
        first_payload = json.loads(first.text)
        self.assertEqual(first.status, 200)
        self.assertTrue(first_payload["ok"])
        self.assertTrue(first_payload["committed"])
        self.assertTrue(first_payload["receipt_pending"])
        self.assertEqual(
            {item["id"] for item in first_payload["meals"]},
            {existing_id, first_payload["meal_id"]},
        )
        token_event = next(
            call for call in event.call_args_list
            if len(call.args) > 1 and call.args[1] == "tokens"
        )
        self.assertEqual(token_event.kwargs["user_generation"], generation)

        second = bot._finalize_food_photo(
            self.cid, generation, parsed, [], bot.profile_of(bot.row(self.cid)),
            mutation_key, args_hash, target,
        )
        second_payload = json.loads(second.text)
        self.assertEqual(second.status, 200)
        self.assertTrue(second_payload["duplicate"])
        self.assertEqual(second_payload["meal_id"], first_payload["meal_id"])
        self.assertEqual(len(bot.meals_of(self.cid)), 2)

    def test_food_photo_retry_keeps_upload_start_day_across_midnight(self):
        generation = bot._user_generation(self.cid)
        upload_day = bot.dtoday()
        after_midnight = upload_day + timedelta(days=1)
        parsed = {
            "title": "Поздний ужин", "kcal": 420, "protein": 24,
            "fat": 18, "carbs": 38, "grams": 320,
            "items": [{"name": "ужин"}],
        }
        with mock.patch.object(bot, "dtoday", return_value=upload_day):
            target, mutation_key, args_hash = bot._food_photo_mutation_identity(
                b"midnight-photo"
            )
        with mock.patch.object(bot, "dtoday", return_value=after_midnight):
            first = bot._finalize_food_photo(
                self.cid, generation, parsed, [],
                bot.profile_of(bot.row(self.cid)), mutation_key, args_hash,
                target,
            )
            second = bot._finalize_food_photo(
                self.cid, generation, parsed, [],
                bot.profile_of(bot.row(self.cid)), mutation_key, args_hash,
                target,
            )
        first_payload = json.loads(first.text)
        second_payload = json.loads(second.text)
        self.assertEqual(first.status, 200)
        self.assertEqual(second.status, 200)
        self.assertEqual(first_payload["date"], upload_day.isoformat())
        self.assertEqual(second_payload["date"], upload_day.isoformat())
        self.assertTrue(second_payload["duplicate"])
        self.assertEqual(first_payload["meal_id"], second_payload["meal_id"])
        self.assertEqual(len(bot.meals_of(self.cid, upload_day.isoformat())), 1)
        self.assertEqual(len(bot.meals_of(self.cid, after_midnight.isoformat())), 0)

    def test_food_photo_endpoint_lost_ack_retry_keeps_frozen_target(self):
        upload_day = bot.dtoday()
        after_midnight = upload_day + timedelta(days=1)
        parsed = {
            "title": "Поздний ужин", "kcal": 420, "protein": 24,
            "fat": 18, "carbs": 38, "grams": 320,
            "items": [{"name": "ужин"}],
        }
        request = FakePostRequest({
            "initData": "signed", "photo": b"lost-ack-photo",
            "request_id": "food-gesture-midnight",
            "target": upload_day.isoformat(),
        })
        llm = mock.AsyncMock(
            side_effect=[parsed, RuntimeError("vision must not run on retry")]
        )
        with (
            mock.patch.object(bot, "_verify_init", return_value=self.cid),
            mock.patch.object(bot, "llm_to_thread", new=llm),
            mock.patch.object(
                bot, "_acquire_food_vision_slot",
                new=mock.AsyncMock(return_value=True),
            ) as acquire,
            mock.patch.object(bot, "_release_food_vision_slot") as release,
            mock.patch.object(bot, "dtoday", return_value=upload_day),
        ):
            first = asyncio.run(bot._api_food_photo_bounded(request))
        with (
            mock.patch.object(bot, "_verify_init", return_value=self.cid),
            mock.patch.object(bot, "llm_to_thread", new=llm),
            mock.patch.object(
                bot, "_acquire_food_vision_slot",
                new=mock.AsyncMock(return_value=True),
            ) as retry_acquire,
            mock.patch.object(bot, "_release_food_vision_slot") as retry_release,
            mock.patch.object(bot, "dtoday", return_value=after_midnight),
        ):
            second = asyncio.run(bot._api_food_photo_bounded(request))

        first_payload = json.loads(first.text)
        second_payload = json.loads(second.text)
        self.assertEqual(first.status, 200)
        self.assertEqual(second.status, 200)
        self.assertEqual(first_payload["meal_id"], second_payload["meal_id"])
        self.assertEqual(second_payload["date"], upload_day.isoformat())
        self.assertTrue(second_payload["duplicate"])
        self.assertEqual(llm.await_count, 1)
        self.assertEqual(acquire.await_count, 1)
        retry_acquire.assert_not_awaited()
        release.assert_called_once_with()
        retry_release.assert_not_called()
        self.assertEqual(len(bot.meals_of(self.cid, upload_day.isoformat())), 1)
        self.assertEqual(len(bot.meals_of(self.cid, after_midnight.isoformat())), 0)

    def test_food_photo_replay_skips_vision_and_returns_original_receipt(self):
        parsed = {
            "title": "Суп", "kcal": 280, "protein": 16, "fat": 10,
            "carbs": 32, "grams": 350, "items": [{"name": "суп"}],
        }
        request = FakePostRequest({"initData": "signed", "photo": b"same-image"})
        llm = mock.AsyncMock(
            side_effect=[parsed, RuntimeError("vision must not run on replay")]
        )
        with (
            mock.patch.object(bot, "_verify_init", return_value=self.cid),
            mock.patch.object(bot, "llm_to_thread", new=llm),
            mock.patch.object(
                bot, "_acquire_food_vision_slot", new=mock.AsyncMock(return_value=True)
            ) as acquire,
            mock.patch.object(bot, "_release_food_vision_slot") as release,
        ):
            first = asyncio.run(bot._api_food_photo_bounded(request))
            second = asyncio.run(bot._api_food_photo_bounded(request))
        first_payload = json.loads(first.text)
        second_payload = json.loads(second.text)
        self.assertEqual(first.status, 200)
        self.assertEqual(second.status, 200)
        self.assertEqual(first_payload["meal_id"], second_payload["meal_id"])
        self.assertTrue(second_payload["duplicate"])
        self.assertEqual(llm.await_count, 1)
        self.assertEqual(acquire.await_count, 1)
        release.assert_called_once_with()
        self.assertEqual(len(bot.meals_of(self.cid)), 1)

    def test_post_commit_receipts_never_cross_reactivated_lifecycle(self):
        photo_generation = bot._user_generation(self.cid)
        parsed = {
            "title": "Салат", "kcal": 240, "protein": 8, "fat": 12,
            "carbs": 24, "grams": 250, "items": [{"name": "овощи"}],
        }

        def reactivate_during_photo_receipt(*_args, **_kwargs):
            bot.del_user(self.cid)
            bot._activate_user(self.cid)
            bot.upsert(self.cid, mode="irregular", height=170, weight=64, age=32)
            return {"ok": True}

        with (
            mock.patch.object(
                bot, "_diary_mutation_receipt",
                side_effect=reactivate_during_photo_receipt,
            ),
            mock.patch.object(bot, "ev") as photo_event,
        ):
            response = bot._finalize_food_photo(
                self.cid, photo_generation, parsed, [3],
                bot.profile_of(bot.row(self.cid)),
            )
        payload = json.loads(response.text)
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "deleted")
        self.assertEqual(bot.meals_of(self.cid), [])
        for call in photo_event.call_args_list:
            self.assertEqual(call.kwargs.get("user_generation"), photo_generation)

        workout_generation = bot._user_generation(self.cid)
        original_workout_get = bot.workout_get

        def reactivate_during_workout_receipt(cid, wid):
            bot.del_user(cid)
            bot._activate_user(cid)
            bot.upsert(cid, mode="irregular", height=171, weight=65, age=33)
            return original_workout_get(cid, wid)

        async def reviewed(*args, **_kwargs):
            args[-1].append(5)
            return "Восстановись после тренировки."

        with (
            mock.patch.object(bot, "llm_to_thread", new=reviewed),
            mock.patch.object(
                bot, "workout_get", side_effect=reactivate_during_workout_receipt
            ),
            mock.patch.object(bot, "ev") as workout_event,
        ):
            response, payload = self.call(bot._api_workout, {
                "request_id": "lifecycle-workout",
                "date": bot.dtoday().isoformat(),
                "type": "Пилатес", "duration": "30 мин", "rpe": "лёгкая",
                "items": [{"name": "Пилатес"}],
            })
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "deleted")
        self.assertEqual(bot.workouts_of(self.cid), [])
        protected_actions = {"tokens", "goal", "manual"}
        for call in workout_event.call_args_list:
            if len(call.args) > 1 and call.args[1] in protected_actions:
                self.assertEqual(
                    call.kwargs.get("user_generation"), workout_generation
                )

    def test_summary_time_and_enabled_are_one_validated_write(self):
        response, payload = self.call(bot._api_settime, {
            "time": "09:30", "daily_summary_enabled": False,
        })
        self.assertEqual(response.status, 200)
        self.assertEqual(payload["send_time"], "09:30")
        self.assertFalse(payload["daily_summary_enabled"])
        self.assertEqual(bot.row(self.cid)["send_time"], "09:30")
        self.assertFalse(bot.row(self.cid)["daily_summary_enabled"])

        app = mock.Mock()
        with (
            mock.patch.object(bot, "BOT_APP", app),
            mock.patch.object(bot, "schedule_daily") as schedule,
            mock.patch.object(bot, "upsert", return_value=False),
            mock.patch.object(bot, "_remove_daily_jobs") as remove_jobs,
        ):
            response, payload = self.call(bot._api_settime, {
                "time": "10:30", "daily_summary_enabled": True,
            })
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "deleted")
        schedule.assert_called_once_with(app, self.cid, "10:30", enabled=True)
        remove_jobs.assert_called_once_with(app, self.cid)

        response, payload = self.call(bot._api_settime, {
            "time": "10:00", "daily_summary_enabled": "false",
        })
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "bad_daily_summary_enabled")
        self.assertEqual(bot.row(self.cid)["send_time"], "09:30")

        with (
            mock.patch.object(bot, "BOT_APP", app),
            mock.patch.object(
                bot,
                "schedule_daily",
                side_effect=[RuntimeError("injected scheduler failure"), None],
            ) as schedule,
        ):
            response, payload = self.call(bot._api_settime, {
                "time": "10:15", "daily_summary_enabled": True,
            })
        self.assertEqual(response.status, 503)
        self.assertEqual(payload["error"], "schedule_failed")
        self.assertEqual(schedule.call_count, 2)
        schedule.assert_has_calls([
            mock.call(app, self.cid, "10:15", enabled=True),
            mock.call(app, self.cid, "09:30", enabled=False),
        ])
        self.assertEqual(bot.row(self.cid)["send_time"], "09:30")
        self.assertFalse(bot.row(self.cid)["daily_summary_enabled"])

        with (
            mock.patch.object(bot, "BOT_APP", app),
            mock.patch.object(bot, "schedule_daily") as schedule,
            mock.patch.object(bot, "upsert", side_effect=RuntimeError("db write failed")),
        ):
            response, payload = self.call(bot._api_settime, {
                "time": "10:45", "daily_summary_enabled": True,
            })
        self.assertEqual(response.status, 500)
        self.assertEqual(payload["error"], "settings_save_failed")
        schedule.assert_has_calls([
            mock.call(app, self.cid, "10:45", enabled=True),
            mock.call(app, self.cid, "09:30", enabled=False),
        ])

        with (
            mock.patch.object(bot, "BOT_APP", app),
            mock.patch.object(
                bot,
                "schedule_daily",
                side_effect=[RuntimeError("toggle schedule failed"), None],
            ) as schedule,
        ):
            response, payload = self.call(bot._api_daily_summary, {"enabled": True})
        self.assertEqual(response.status, 503)
        self.assertEqual(payload["error"], "schedule_failed")
        self.assertFalse(bot.row(self.cid)["daily_summary_enabled"])
        schedule.assert_has_calls([
            mock.call(app, self.cid, "09:30", enabled=True),
            mock.call(app, self.cid, "09:30", enabled=False),
        ])

    def test_summary_mutations_reject_stale_reactivated_lifecycle(self):
        app = mock.Mock()

        def reactivate_during_schedule(*_args, **_kwargs):
            bot.del_user(self.cid)
            bot._activate_user(self.cid)
            bot.upsert(
                self.cid, mode="irregular", height=175, weight=70, age=35,
                send_time="06:45", daily_summary_enabled=0,
            )

        with (
            mock.patch.object(bot, "BOT_APP", app),
            mock.patch.object(
                bot, "schedule_daily", side_effect=reactivate_during_schedule
            ) as schedule,
            mock.patch.object(bot, "_remove_daily_jobs") as remove_jobs,
            mock.patch.object(bot, "ev") as event,
        ):
            response, payload = self.call(bot._api_settime, {
                "time": "10:30", "daily_summary_enabled": True,
            })
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "deleted")
        schedule.assert_called_once_with(app, self.cid, "10:30", enabled=True)
        remove_jobs.assert_called_once_with(app, self.cid)
        self.assertEqual(bot.row(self.cid)["send_time"], "06:45")
        self.assertFalse(bot.row(self.cid)["daily_summary_enabled"])
        event.assert_not_called()

        with (
            mock.patch.object(bot, "BOT_APP", app),
            mock.patch.object(
                bot, "schedule_daily", side_effect=reactivate_during_schedule
            ) as schedule,
            mock.patch.object(bot, "_remove_daily_jobs") as remove_jobs,
            mock.patch.object(bot, "ev") as event,
        ):
            response, payload = self.call(
                bot._api_daily_summary, {"enabled": True}
            )
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "deleted")
        schedule.assert_called_once_with(app, self.cid, "06:45", enabled=True)
        remove_jobs.assert_called_once_with(app, self.cid)
        self.assertEqual(bot.row(self.cid)["send_time"], "06:45")
        self.assertFalse(bot.row(self.cid)["daily_summary_enabled"])
        event.assert_not_called()

    def test_photo_and_text_meal_insert_recheck_lifecycle_generation(self):
        parsed = {
            "title": "Салат", "kcal": 240, "protein": 8, "fat": 12,
            "carbs": 24, "grams": 250, "items": [{"name": "овощи", "grams": 250}],
        }
        original_meal_add = bot.meal_add

        def delete_before_photo_insert(cid, rec, **kwargs):
            bot.del_user(cid)
            return original_meal_add(cid, rec, **kwargs)

        generation = bot._user_generation(self.cid)
        with mock.patch.object(bot, "meal_add", side_effect=delete_before_photo_insert):
            response = bot._finalize_food_photo(
                self.cid, generation, parsed, [], bot.profile_of(bot.row(self.cid))
            )
        payload = json.loads(response.text)
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "deleted")

        self.cid += 1
        bot._activate_user(self.cid)
        bot.upsert(self.cid, mode="irregular", height=168, weight=62, age=31)

        def delete_before_text_insert(cid, rec, **kwargs):
            bot.del_user(cid)
            return original_meal_add(cid, rec, **kwargs)

        with (
            mock.patch.object(bot, "llm_to_thread", new=mock.AsyncMock(return_value=parsed)),
            mock.patch.object(bot, "meal_add", side_effect=delete_before_text_insert),
        ):
            response, payload = self.call(bot._api_food_text, {"text": "салат"})
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "deleted")

    def test_profile_and_prefs_reject_invalid_values_without_silent_clear(self):
        bot.upsert(self.cid, mode="cycle", last_period=bot.dtoday().isoformat(), cycle_len=28,
                   kcal_goal=1900)
        response, payload = self.call(bot._api_profile, {
            "height": 170, "weight": 63, "age": 32, "cycle_len": "four weeks",
        })
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "bad_cycle_len")
        self.assertEqual(bot.row(self.cid)["height"], 168)
        self.assertEqual(bot.row(self.cid)["cycle_len"], 28)

        response, payload = self.call(bot._api_prefs, {
            "diet_note": "", "kcal_goal": "lots",
        })
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "bad_kcal_goal")
        self.assertEqual(bot.row(self.cid)["kcal_goal"], 1900)

        response, payload = self.call(bot._api_prefs, {
            "diet_note": "", "kcal_goal": "",
        })
        self.assertEqual(response.status, 200)
        self.assertIsNone(payload["kcal_goal"])
        self.assertIsNone(bot.row(self.cid)["kcal_goal"])

    def test_profile_and_mode_concurrent_writes_preserve_mode_invariants(self):
        today = bot.dtoday().isoformat()
        bot.upsert(
            self.cid, mode="cycle", last_period=today, cycle_len=28,
            period_end=today, period_len=1,
        )
        generation = bot._user_generation(self.cid)
        entered = threading.Event()
        release = threading.Event()
        original_strict_integer = bot._strict_integer
        results = {}

        def blocking_cycle_length(value):
            entered.set()
            self.assertTrue(release.wait(3))
            return original_strict_integer(value)

        def save_profile():
            results["profile"] = bot._save_profile_atomic(
                self.cid, generation,
                {"cycle_len": 35}, 170, 64, 32,
            )

        def change_mode():
            results["mode"] = bot._change_mode_atomic(
                self.cid, "male", user_generation=generation,
            )

        with mock.patch.object(bot, "_strict_integer", side_effect=blocking_cycle_length):
            profile_thread = threading.Thread(target=save_profile)
            mode_thread = threading.Thread(target=change_mode)
            profile_thread.start()
            self.assertTrue(entered.wait(3))
            mode_thread.start()
            release.set()
            profile_thread.join(5)
            mode_thread.join(5)

        self.assertFalse(profile_thread.is_alive())
        self.assertFalse(mode_thread.is_alive())
        self.assertEqual(results["profile"][1], 200)
        self.assertEqual(results["mode"][1], 200)
        saved = bot.row(self.cid)
        self.assertEqual(saved["mode"], "male")
        self.assertIsNone(saved["last_period"])
        self.assertIsNone(saved["cycle_len"])
        self.assertIsNone(saved["period_end"])
        self.assertIsNone(saved["period_len"])

    def test_mode_and_prefs_reject_stale_reactivated_lifecycle(self):
        original_change_mode = bot._change_mode_atomic

        def reactivate_before_mode_write(cid, mode, explicit_lmp, generation):
            bot.del_user(cid)
            bot._activate_user(cid)
            bot.upsert(cid, mode="irregular", height=171, weight=65, age=33)
            return original_change_mode(cid, mode, explicit_lmp, generation)

        with mock.patch.object(
            bot, "_change_mode_atomic", side_effect=reactivate_before_mode_write
        ):
            response, payload = self.call(bot._api_mode, {"mode": "male"})
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "deleted")
        self.assertEqual(bot.row(self.cid)["mode"], "irregular")

        original_prefs = bot._api_prefs_sync

        def reactivate_before_prefs_write(cid, body, generation):
            bot.del_user(cid)
            bot._activate_user(cid)
            bot.upsert(
                cid, mode="irregular", height=172, weight=66, age=34,
                diet_note="new lifecycle", kcal_goal=2100,
            )
            return original_prefs(cid, body, generation)

        with (
            mock.patch.object(
                bot, "_api_prefs_sync", side_effect=reactivate_before_prefs_write
            ),
            mock.patch.object(bot, "ev") as event,
        ):
            response, payload = self.call(bot._api_prefs, {
                "diet_note": "stale request", "kcal_goal": 1800,
            })
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "deleted")
        self.assertEqual(bot.row(self.cid)["diet_note"], "new lifecycle")
        self.assertEqual(bot.row(self.cid)["kcal_goal"], 2100)
        event.assert_not_called()

    def test_mode_transitions_seed_cycle_but_never_guess_pregnancy_lmp(self):
        bot.upsert(self.cid, mode="male", last_period=None, cycle_len=None,
                   period_end=None, period_len=None)
        response, payload = self.call(bot._api_mode, {"mode": "preg"})
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "need_period")
        self.assertEqual(bot.row(self.cid)["mode"], "male")

        response, payload = self.call(bot._api_mode, {"mode": "cycle"})
        self.assertEqual(response.status, 200)
        self.assertTrue(payload["seeded_period"])
        self.assertEqual(payload["mode"], "cycle")
        self.assertEqual(payload["cycle_len"], 28)
        self.assertEqual(bot.row(self.cid)["last_period"], bot.dtoday().isoformat())
        self.assertEqual(bot.row(self.cid)["cycle_len"], 28)
        self.assertTrue(bot.is_onboarded(bot.row(self.cid)))

        bot.upsert(self.cid, mode="male", last_period=None, cycle_len=None,
                   period_end=None, period_len=None)
        explicit = (bot.dtoday() - timedelta(days=42)).isoformat()
        response, payload = self.call(bot._api_mode, {
            "mode": "preg", "last_period": explicit,
        })
        self.assertEqual(response.status, 200)
        self.assertFalse(payload["seeded_period"])
        self.assertEqual(payload["mode"], "preg")
        self.assertEqual(payload["last_period"], explicit)
        self.assertEqual(bot.row(self.cid)["mode"], "preg")
        self.assertEqual(bot.row(self.cid)["last_period"], explicit)

    def test_legacy_checkin_and_pa_reject_invalid_or_future_dates(self):
        future = (bot.dtoday() + timedelta(days=1)).isoformat()
        response, payload = self.call(bot._api_checkin, {"date": future, "energy": 3})
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "future_date")
        response, payload = self.call(bot._api_checkin, {"date": "bad", "energy": 3})
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "invalid_date")
        self.assertIsNone(bot.log_get(self.cid, bot.dtoday().isoformat()))

        response, payload = self.call(bot._api_pa, {"date": future})
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "future_date")
        self.assertEqual(bot.pa_list(self.cid), [])


def sqlite_failure():
    return RuntimeError("injected sqlite failure")


if __name__ == "__main__":
    unittest.main()
