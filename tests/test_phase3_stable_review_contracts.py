import asyncio
import json
import os
import tempfile
import unittest
from datetime import timedelta
from types import SimpleNamespace
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


class FakeJsonRequest:
    def __init__(self, body):
        self.body = body

    async def json(self):
        return self.body


class StableReviewBackendTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "stable-review.db")
        self.cid = 9401
        bot._activate_user(self.cid)
        bot.upsert(
            self.cid, mode="irregular", height=168, weight=62, age=31,
        )
        bot._WEEK_FOOD_CACHE.clear()
        bot._WEEK_FOOD_REVISION.clear()

    def tearDown(self):
        bot._WEEK_FOOD_CACHE.clear()
        bot._WEEK_FOOD_REVISION.clear()
        bot.DB = self.old_db
        self.tmp.cleanup()

    def call(self, handler, body):
        with mock.patch.object(bot, "_verify_init", return_value=self.cid):
            response = asyncio.run(handler(FakeJsonRequest(body)))
        return response, json.loads(response.text)

    def seed_food(self):
        bot.meal_add(self.cid, {
            "title": "Каша", "kcal": 320, "protein": 10, "fat": 8,
            "carbs": 52, "items": [],
        })

    def test_stop_clears_persisted_and_memory_food_review_cache(self):
        generation = bot._user_generation(self.cid)
        revision = bot._WEEK_FOOD_REVISION.get(self.cid, 0)
        key = (self.cid, generation, revision, bot.dtoday().isoformat(), "v2")
        disk_key = f"{generation}:{revision}:v2"
        bot._WEEK_FOOD_CACHE[key] = "старый разбор"
        bot.dc_put(self.cid, "week_food", "старый разбор", disk_key)

        message = SimpleNamespace(reply_text=mock.AsyncMock())
        update = SimpleNamespace(
            effective_chat=SimpleNamespace(id=self.cid), message=message,
        )
        application = SimpleNamespace(
            job_queue=SimpleNamespace(get_jobs_by_name=lambda _name: [])
        )
        context = SimpleNamespace(application=application)
        asyncio.run(bot.stop(update, context))

        self.assertFalse(any(key[0] == self.cid for key in bot._WEEK_FOOD_CACHE))
        self.assertIsNone(bot.dc_get(self.cid, "week_food", disk_key))
        self.assertIsNone(bot.row(self.cid))

    def test_week_food_publication_rejects_mutation_and_lifecycle_races(self):
        self.seed_food()

        async def mutate_during_review(*_args, **_kwargs):
            bot._evict_week_food_cache(self.cid)
            return "устаревший разбор"

        with mock.patch.object(bot, "llm_to_thread", new=mutate_during_review):
            response, payload = self.call(bot._api_week_food_review, {})
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "stale_review")
        self.assertFalse(any(key[0] == self.cid for key in bot._WEEK_FOOD_CACHE))

        async def reactivate_during_review(*_args, **_kwargs):
            bot.del_user(self.cid)
            bot._activate_user(self.cid)
            bot.upsert(
                self.cid, mode="irregular", height=170, weight=64, age=32,
            )
            return "чужой разбор"

        self.seed_food()
        with mock.patch.object(bot, "llm_to_thread", new=reactivate_during_review):
            response, payload = self.call(bot._api_week_food_review, {})
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "deleted")
        self.assertFalse(any(key[0] == self.cid for key in bot._WEEK_FOOD_CACHE))

    def test_week_food_review_started_during_text_analysis_cannot_publish_after_commit(self):
        self.seed_food()

        async def scenario():
            food_started = asyncio.Event()
            finish_food = asyncio.Event()
            review_started = asyncio.Event()
            finish_review = asyncio.Event()

            async def interleaved_llm(_cid, purpose, *_args, **_kwargs):
                if purpose == "food_text":
                    food_started.set()
                    await finish_food.wait()
                    return {
                        "title": "Творог", "kcal": 180, "protein": 28,
                        "fat": 5, "carbs": 6, "items": [],
                    }
                if purpose == "week_food_review":
                    review_started.set()
                    await finish_review.wait()
                    return "устаревший разбор"
                raise AssertionError(f"unexpected LLM purpose: {purpose}")

            with (
                mock.patch.object(bot, "_verify_init", return_value=self.cid),
                mock.patch.object(bot, "llm_to_thread", new=interleaved_llm),
            ):
                food_task = asyncio.create_task(bot._api_food_text(
                    FakeJsonRequest({"text": "творог"})
                ))
                await food_started.wait()
                # Food admission already invalidated revision N-1. The review
                # now captures N and the pre-insert diary while food analysis
                # is still pending.
                review_task = asyncio.create_task(bot._api_week_food_review(
                    FakeJsonRequest({})
                ))
                await review_started.wait()
                finish_food.set()
                food_response = await food_task
                finish_review.set()
                review_response = await review_task
            return food_response, review_response

        food_response, review_response = asyncio.run(scenario())
        self.assertEqual(food_response.status, 200)
        self.assertEqual(review_response.status, 409)
        self.assertEqual(json.loads(review_response.text)["error"], "stale_review")
        self.assertFalse(any(key[0] == self.cid for key in bot._WEEK_FOOD_CACHE))
        generation = bot._user_generation(self.cid)
        revision = bot._WEEK_FOOD_REVISION.get(self.cid, 0)
        self.assertIsNone(bot.dc_get(
            self.cid, "week_food", f"{generation}:{revision}:v2"
        ))

    def test_week_food_review_started_after_photo_admission_cannot_publish_after_commit(self):
        self.seed_food()
        generation, profile = bot._prepare_food_photo(self.cid)
        review_started = asyncio.Event()
        finish_review = asyncio.Event()

        async def delayed_review(_cid, purpose, *_args, **_kwargs):
            self.assertEqual(purpose, "week_food_review")
            review_started.set()
            await finish_review.wait()
            return "устаревший разбор"

        async def scenario():
            with (
                mock.patch.object(bot, "_verify_init", return_value=self.cid),
                mock.patch.object(bot, "llm_to_thread", new=delayed_review),
            ):
                review_task = asyncio.create_task(bot._api_week_food_review(
                    FakeJsonRequest({})
                ))
                await review_started.wait()
                photo_response = bot._finalize_food_photo(
                    self.cid, generation,
                    {
                        "title": "Омлет", "kcal": 260, "protein": 18,
                        "fat": 17, "carbs": 5, "items": [],
                    },
                    [], profile, target=bot.dtoday().isoformat(),
                )
                finish_review.set()
                review_response = await review_task
            return photo_response, review_response

        photo_response, review_response = asyncio.run(scenario())
        self.assertEqual(photo_response.status, 200)
        self.assertEqual(review_response.status, 409)
        self.assertEqual(json.loads(review_response.text)["error"], "stale_review")
        self.assertFalse(any(key[0] == self.cid for key in bot._WEEK_FOOD_CACHE))
        revision = bot._WEEK_FOOD_REVISION.get(self.cid, 0)
        self.assertIsNone(bot.dc_get(
            self.cid, "week_food", f"{generation}:{revision}:v2"
        ))

    def test_week_food_late_publication_is_unreachable_and_lifecycle_guarded(self):
        self.seed_food()
        generation = bot._user_generation(self.cid)
        original_guarded_put = bot.dc_put_for_generation

        def invalidate_between_check_and_put(cid, kind, payload, key, pinned_generation):
            bot._evict_week_food_cache(cid)
            return original_guarded_put(
                cid, kind, payload, key, pinned_generation
            )

        with (
            mock.patch.object(
                bot, "llm_to_thread", new=mock.AsyncMock(return_value="старый разбор")
            ),
            mock.patch.object(
                bot, "dc_put_for_generation", side_effect=invalidate_between_check_and_put
            ),
        ):
            response, payload = self.call(bot._api_week_food_review, {})
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "stale_review")
        self.assertFalse(any(key[0] == self.cid for key in bot._WEEK_FOOD_CACHE))
        c = bot.db()
        try:
            self.assertEqual(c.execute(
                "SELECT COUNT(*) FROM day_cache WHERE chat_id=? AND kind='week_food'",
                (self.cid,),
            ).fetchone()[0], 0)
        finally:
            c.close()

        def reactivate_between_check_and_put(cid, kind, payload, key, pinned_generation):
            bot.del_user(cid)
            bot._activate_user(cid)
            bot.upsert(cid, mode="irregular", height=171, weight=65, age=33)
            return original_guarded_put(
                cid, kind, payload, key, pinned_generation
            )

        self.seed_food()
        with (
            mock.patch.object(
                bot, "llm_to_thread", new=mock.AsyncMock(return_value="чужой разбор")
            ),
            mock.patch.object(
                bot, "dc_put_for_generation", side_effect=reactivate_between_check_and_put
            ),
        ):
            response, payload = self.call(bot._api_week_food_review, {})
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "deleted")
        self.assertFalse(any(key[0] == self.cid for key in bot._WEEK_FOOD_CACHE))
        self.assertNotEqual(generation, bot._user_generation(self.cid))
        c = bot.db()
        try:
            self.assertEqual(c.execute(
                "SELECT COUNT(*) FROM day_cache WHERE chat_id=? AND kind='week_food'",
                (self.cid,),
            ).fetchone()[0], 0)
        finally:
            c.close()

    def test_week_food_cache_hit_cannot_republish_after_invalidation_or_stop(self):
        self.seed_food()
        original_get = bot.dc_get

        generation = bot._user_generation(self.cid)
        revision = bot._WEEK_FOOD_REVISION.get(self.cid, 0)
        disk_key = f"{generation}:{revision}:v2"
        bot.dc_put(self.cid, "week_food", "старый разбор", disk_key)

        def invalidate_after_read(cid, kind, key=""):
            hit = original_get(cid, kind, key)
            if kind == "week_food":
                bot._evict_week_food_cache(cid)
            return hit

        with mock.patch.object(bot, "dc_get", side_effect=invalidate_after_read):
            response, payload = self.call(bot._api_week_food_review, {})
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "stale_review")
        self.assertFalse(any(key[0] == self.cid for key in bot._WEEK_FOOD_CACHE))

        generation = bot._user_generation(self.cid)
        revision = bot._WEEK_FOOD_REVISION.get(self.cid, 0)
        disk_key = f"{generation}:{revision}:v2"
        bot.dc_put(self.cid, "week_food", "прошлая жизнь", disk_key)

        def reactivate_after_read(cid, kind, key=""):
            hit = original_get(cid, kind, key)
            if kind == "week_food":
                bot.del_user(cid)
                bot._activate_user(cid)
                bot.upsert(cid, mode="irregular", height=171, weight=65, age=33)
            return hit

        with mock.patch.object(bot, "dc_get", side_effect=reactivate_after_read):
            response, payload = self.call(bot._api_week_food_review, {})
        self.assertEqual(response.status, 409)
        self.assertEqual(payload["error"], "deleted")
        self.assertFalse(any(key[0] == self.cid for key in bot._WEEK_FOOD_CACHE))
        self.assertEqual(bot.meals_of(self.cid), [])

    def test_food_and_workout_pin_generation_before_profile_reads(self):
        original_row = bot.row

        def exercise(handler, body):
            reactivated = False

            def row_after_reactivation(cid):
                nonlocal reactivated
                if not reactivated:
                    reactivated = True
                    bot.del_user(cid)
                    bot._activate_user(cid)
                    bot.upsert(
                        cid, mode="irregular", height=171, weight=65, age=33,
                    )
                return original_row(cid)

            with (
                mock.patch.object(bot, "row", side_effect=row_after_reactivation),
                mock.patch.object(bot, "llm_to_thread", new=mock.AsyncMock()) as llm,
            ):
                response, payload = self.call(handler, body)
            self.assertEqual(response.status, 409)
            self.assertEqual(payload["error"], "deleted")
            llm.assert_not_awaited()

        exercise(bot._api_food_text, {"text": "каша"})
        exercise(bot._api_workout, {
            "request_id": "generation-first", "date": bot.dtoday().isoformat(),
            "type": "Пилатес", "duration": "30 мин", "items": [],
        })
        exercise(bot._api_food_manual, {"title": "Каша", "kcal": 320})
        self.assertEqual(bot.meals_of(self.cid), [])
        self.assertEqual(bot.workouts_of(self.cid), [])

    def test_period_rejects_invalid_future_and_preserves_history_on_bad_replace(self):
        original = (bot.dtoday() - timedelta(days=30)).isoformat()
        bot.cyc_add(self.cid, original, (
            bot.dtoday() - timedelta(days=26)
        ).isoformat())
        bot.upsert(
            self.cid, mode="cycle", last_period=original, cycle_len=28,
            period_end=(bot.dtoday() - timedelta(days=26)).isoformat(),
            period_len=5,
        )
        before = bot.periods_of(self.cid)

        for action in ("start", "delete", "end"):
            for missing_date in ({}, {"date": None}, {"date": ""}):
                response, payload = self.call(bot._api_period, {
                    "action": action, **missing_date,
                })
                self.assertEqual(response.status, 400)
                self.assertEqual(payload["error"], "invalid_date")
                self.assertEqual(bot.periods_of(self.cid), before)

        for missing_periods in ({}, {"periods": None}):
            response, payload = self.call(bot._api_period, {
                "action": "replace", **missing_periods,
            })
            self.assertEqual(response.status, 400)
            self.assertEqual(payload["error"], "invalid_periods")
            self.assertEqual(bot.periods_of(self.cid), before)

        response, payload = self.call(bot._api_period, {
            "action": "replace",
            "periods": [before[0], {"start": "not-a-date", "end": "2026-01-02"}],
        })
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "invalid_date")
        self.assertEqual(bot.periods_of(self.cid), before)

        response, payload = self.call(bot._api_period, {
            "action": "replace", "periods": [before[0], before[0]],
        })
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "overlapping_periods")
        self.assertEqual(bot.periods_of(self.cid), before)

        future = (bot.dtoday() + timedelta(days=1)).isoformat()
        for action in ("start", "delete", "end"):
            response, payload = self.call(bot._api_period, {
                "action": action, "date": future,
            })
            self.assertEqual(response.status, 400)
            self.assertEqual(payload["error"], "future_date")
        response, payload = self.call(bot._api_period, {
            "action": "start", "date": "bad",
        })
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "invalid_date")
        response, payload = self.call(bot._api_period, {
            "action": "end", "date": bot.dtoday().isoformat(),
            "start": "bad",
        })
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "invalid_date")
        response, payload = self.call(bot._api_period, {
            "action": "end",
            "date": (bot.dtoday() - timedelta(days=2)).isoformat(),
            "start": (bot.dtoday() - timedelta(days=1)).isoformat(),
        })
        self.assertEqual(response.status, 400)
        self.assertEqual(payload["error"], "invalid_period_range")
        self.assertEqual(bot.periods_of(self.cid), before)


if __name__ == "__main__":
    unittest.main()
