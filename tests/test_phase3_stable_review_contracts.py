import asyncio
import json
import os
import tempfile
import unittest
from datetime import date, timedelta
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
        bot._TODAY_CACHE.clear()
        bot._TODAY_CACHE_REVISION.clear()
        bot._CARD_CACHE.clear()

    def tearDown(self):
        bot._WEEK_FOOD_CACHE.clear()
        bot._WEEK_FOOD_REVISION.clear()
        bot._TODAY_CACHE.clear()
        bot._TODAY_CACHE_REVISION.clear()
        bot._CARD_CACHE.clear()
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

    def run_today_worker_once(self, job, llm):
        async def scenario():
            claimed = False
            statuses = []
            finished = asyncio.Event()
            loop = asyncio.get_running_loop()
            old_wake = bot._AI_JOB_WAKE
            bot._AI_JOB_WAKE = asyncio.Event()

            def claim_once():
                nonlocal claimed
                if claimed:
                    return None
                claimed = True
                return job

            def finish(_job, status, *_args, **_kwargs):
                statuses.append(status)
                loop.call_soon_threadsafe(finished.set)

            try:
                with (
                    mock.patch.object(bot, "_claim_ai_job", side_effect=claim_once),
                    mock.patch.object(bot, "_finish_ai_job", side_effect=finish),
                    mock.patch.object(bot, "llm_to_thread", new=llm),
                ):
                    task = asyncio.create_task(bot._ai_job_worker(1))
                    await asyncio.wait_for(finished.wait(), timeout=1)
                    task.cancel()
                    await asyncio.gather(task, return_exceptions=True)
            finally:
                bot._AI_JOB_WAKE = old_wake
            return statuses

        return asyncio.run(scenario())

    def test_stop_clears_persisted_and_memory_food_review_cache(self):
        generation = bot._user_generation(self.cid)
        revision = bot._WEEK_FOOD_REVISION.get(self.cid, 0)
        key = (self.cid, generation, revision, bot.dtoday().isoformat(), "v2")
        disk_key = f"{generation}:{revision}:v2"
        bot._WEEK_FOOD_CACHE[key] = "старый разбор"
        bot.dc_put(self.cid, "week_food", "старый разбор", disk_key)
        today_key = (
            self.cid, bot.dtoday().isoformat(), "irregular",
        )
        card_key = (
            self.cid, bot.dtoday().isoformat(), bot.AIWA_VERSION,
            "irregular", False,
        )
        bot._TODAY_CACHE[today_key] = {"summary": "прошлая жизнь"}
        bot._CARD_CACHE[card_key] = {"food": "прошлая жизнь"}
        bot.dc_put(
            self.cid, "today", {"summary": "прошлая жизнь"}, "irregular"
        )

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
        self.assertFalse(any(key[0] == self.cid for key in bot._TODAY_CACHE))
        self.assertFalse(any(key[0] == self.cid for key in bot._CARD_CACHE))
        self.assertIsNone(bot.dc_get(self.cid, "week_food", disk_key))
        self.assertIsNone(bot.dc_get(self.cid, "today", "irregular"))
        self.assertIsNone(bot.row(self.cid))

    def test_old_today_and_card_generation_cannot_publish_after_reactivation(self):
        old_generation = bot._user_generation(self.cid)
        target = bot.dtoday().isoformat()
        job = {
            "job_id": "old-today-job",
            "chat_id": self.cid,
            "generation": old_generation,
            "kind": "today_note",
            "payload": {
                "date": target,
                "mode": "irregular",
                "state": None,
                "profile": {},
                "recent_syms": "",
            },
            "attempts": 1,
        }

        async def reactivate_in_llm(*_args, **_kwargs):
            bot.del_user(self.cid)
            bot._activate_user(self.cid)
            bot.upsert(
                self.cid, mode="irregular", height=171, weight=65, age=33,
            )
            return {"summary": "сводка прошлого lifecycle", "suggestions": []}

        statuses = self.run_today_worker_once(job, reactivate_in_llm)
        self.assertIn("superseded", statuses)
        self.assertNotEqual(old_generation, bot._user_generation(self.cid))
        self.assertFalse(any(key[0] == self.cid for key in bot._TODAY_CACHE))
        self.assertIsNone(bot.dc_get(self.cid, "today", "irregular"))

        async def card_llm(*_args, **_kwargs):
            bot.del_user(self.cid)
            bot._activate_user(self.cid)
            bot.upsert(
                self.cid, mode="irregular", height=172, weight=66, age=34,
            )
            return {"food": "подпись прошлого lifecycle"}

        with mock.patch.object(bot, "llm_to_thread", new=card_llm):
            captions = asyncio.run(
                bot._card_captions(self.cid, "irregular", "private context")
            )
        self.assertEqual(captions, {})
        self.assertFalse(any(key[0] == self.cid for key in bot._CARD_CACHE))

    def test_today_revision_rejects_invalidation_during_llm_and_publish(self):
        generation = bot._user_generation(self.cid)
        revision = bot._TODAY_CACHE_REVISION.get(self.cid, 0)
        target = bot.dtoday().isoformat()
        job = {
            "job_id": "stale-context-job",
            "chat_id": self.cid,
            "generation": generation,
            "kind": "today_note",
            "payload": {
                "date": target,
                "mode": "irregular",
                "cache_revision": revision,
                "state": None,
                "profile": {},
                "recent_syms": "",
            },
            "attempts": 1,
        }

        async def invalidate_in_llm(*_args, **_kwargs):
            bot._evict_today_cache(self.cid)
            return {"summary": "устаревшая сводка", "suggestions": []}

        statuses = self.run_today_worker_once(job, invalidate_in_llm)
        self.assertIn("superseded", statuses)
        old_memory_key, old_disk_key = bot._today_cache_keys(
            self.cid, "irregular", generation=generation,
            revision=revision, day=target,
        )
        self.assertNotIn(old_memory_key, bot._TODAY_CACHE)
        self.assertIsNone(bot.dc_get(self.cid, "today", old_disk_key))

        current_revision = bot._TODAY_CACHE_REVISION.get(self.cid, 0)
        write_race_job = dict(job, payload=dict(
            job["payload"], cache_revision=current_revision,
        ))
        original_put = bot.dc_put_for_generation

        def invalidate_during_put(cid, kind, payload, key, pinned_generation):
            bot._evict_today_cache(cid)
            return original_put(cid, kind, payload, key, pinned_generation)

        with mock.patch.object(
            bot, "dc_put_for_generation", side_effect=invalidate_during_put,
        ):
            published = bot._publish_today_note_for_generation(
                write_race_job,
                {"summary": "устаревшая запись", "suggestions": []},
            )
        write_memory_key, write_disk_key = bot._today_cache_keys(
            self.cid, "irregular", generation=generation,
            revision=current_revision, day=target,
        )
        self.assertFalse(published)
        self.assertNotIn(write_memory_key, bot._TODAY_CACHE)
        self.assertIsNone(bot.dc_get(self.cid, "today", write_disk_key))

    def test_today_enqueue_rebuilds_snapshot_inside_pinned_lifecycle(self):
        stale_user = bot.row(self.cid)
        _, stale_status = bot.status_of(self.cid)
        stale_generation = bot._user_generation(self.cid)

        bot.del_user(self.cid)
        new_generation = bot._activate_user(self.cid)
        bot.upsert(
            self.cid, mode="male", height=188, weight=91, age=42,
        )

        queued = bot._enqueue_today_job(self.cid, stale_user, stale_status)

        self.assertNotEqual(stale_generation, new_generation)
        self.assertEqual(queued["generation"], new_generation)
        self.assertEqual(queued["payload"]["mode"], "male")
        self.assertTrue(queued["payload"]["profile"]["male"])
        self.assertEqual(queued["payload"]["profile"]["weight"], 91)

    def test_today_enqueue_rejects_snapshot_crossing_cache_revision(self):
        original_status = bot.status_of

        def invalidate_after_snapshot(cid):
            snapshot = original_status(cid)
            bot._evict_today_cache(cid)
            return snapshot

        with mock.patch.object(
            bot, "status_of", side_effect=invalidate_after_snapshot,
        ):
            queued = bot._enqueue_today_job(self.cid, bot.row(self.cid), None)

        self.assertIsNone(queued)
        conn = bot.db()
        try:
            count = conn.execute(
                "SELECT COUNT(*) FROM ai_jobs WHERE chat_id=?", (self.cid,)
            ).fetchone()[0]
        finally:
            conn.close()
        self.assertEqual(count, 0)

    def test_today_enqueue_rejects_snapshot_crossing_moscow_midnight(self):
        with mock.patch.object(
            bot, "dtoday", side_effect=[date(2026, 8, 1), date(2026, 8, 2)],
        ):
            queued = bot._enqueue_today_job(self.cid, bot.row(self.cid), None)

        self.assertIsNone(queued)
        conn = bot.db()
        try:
            count = conn.execute(
                "SELECT COUNT(*) FROM ai_jobs WHERE chat_id=?", (self.cid,)
            ).fetchone()[0]
        finally:
            conn.close()
        self.assertEqual(count, 0)

    def test_today_publish_rejects_job_from_previous_moscow_day(self):
        generation = bot._user_generation(self.cid)
        job = {
            "chat_id": self.cid,
            "generation": generation,
            "payload": {
                "date": "2026-08-01",
                "mode": "irregular",
                "cache_revision": bot._TODAY_CACHE_REVISION.get(self.cid, 0),
            },
        }
        with (
            mock.patch.object(bot, "dtoday", return_value=date(2026, 8, 2)),
            mock.patch.object(bot, "dc_put_for_generation") as durable_put,
        ):
            published = bot._publish_today_note_for_generation(
                job, {"summary": "вчерашняя сводка", "suggestions": []},
            )
        self.assertFalse(published)
        durable_put.assert_not_called()
        self.assertFalse(any(key[0] == self.cid for key in bot._TODAY_CACHE))

    def test_today_api_rechecks_identity_after_lookup_invalidation(self):
        user = bot.row(self.cid)
        generation = bot._user_generation(self.cid)
        revision = bot._TODAY_CACHE_REVISION.get(self.cid, 0)
        stale_key, _ = bot._today_cache_keys(
            self.cid, "irregular", generation=generation, revision=revision,
        )
        bot._evict_today_cache(self.cid)
        fresh_key, _ = bot._today_cache_keys(
            self.cid, "irregular", generation=generation,
            revision=bot._TODAY_CACHE_REVISION.get(self.cid, 0),
        )
        lookups = [
            (user, None, stale_key, {
                "summary": "private stale summary", "suggestions": [],
            }),
            (user, None, fresh_key, None),
        ]
        with (
            mock.patch.object(bot, "_verify_init", return_value=self.cid),
            mock.patch.object(bot, "_api_today_lookup", side_effect=lookups) as lookup,
            mock.patch.object(
                bot, "_enqueue_today_job",
                return_value={"status": "rejected", "reason": "queue_full"},
            ),
            mock.patch.object(bot, "_AI_JOB_WAKE", None),
        ):
            response = asyncio.run(bot._api_today(FakeJsonRequest({})))
        payload = json.loads(response.text)
        self.assertEqual(lookup.call_count, 2)
        self.assertNotIn("private stale summary", payload["summary"])

    def test_today_lookup_cannot_migrate_legacy_note_across_midnight(self):
        legacy = {"summary": "вчерашняя сводка", "suggestions": []}
        with (
            mock.patch.object(
                bot, "dtoday",
                side_effect=[date(2026, 8, 1), date(2026, 8, 2)],
            ),
            mock.patch.object(bot, "dc_get", side_effect=[None, legacy]),
            mock.patch.object(bot, "dc_put_for_generation") as durable_put,
        ):
            user, _status, cache_key, hit = bot._api_today_lookup(self.cid)

        self.assertIsNotNone(user)
        self.assertEqual(cache_key[3], "2026-08-01")
        self.assertIsNone(hit)
        durable_put.assert_not_called()
        self.assertFalse(any(key[0] == self.cid for key in bot._TODAY_CACHE))

    def test_card_caption_rejects_upstream_snapshot_from_old_lifecycle(self):
        old_generation = bot._user_generation(self.cid)
        old_context = bot._card_ctx(self.cid, bot.row(self.cid))
        bot.del_user(self.cid)
        bot._activate_user(self.cid)
        bot.upsert(self.cid, mode="male", height=188, weight=91, age=42)

        llm = mock.AsyncMock(return_value={"food": "old private caption"})
        with mock.patch.object(bot, "llm_to_thread", new=llm):
            captions = asyncio.run(bot._card_captions(
                self.cid, "irregular", old_context,
                summary="old private summary", user_generation=old_generation,
            ))
        self.assertEqual(captions, {})
        llm.assert_not_awaited()
        self.assertFalse(any(key[0] == self.cid for key in bot._CARD_CACHE))

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
        generation, profile, assistant_variant = bot._prepare_food_photo(self.cid)
        self.assertEqual(assistant_variant, "female")
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
