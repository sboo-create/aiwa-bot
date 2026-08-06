import asyncio
import concurrent.futures
import os
import sqlite3
import tempfile
import unittest
from datetime import timedelta
from pathlib import Path
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


class JournalJobTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "journal-jobs.db")
        self.cid = 8801
        bot._activate_user(self.cid)
        bot.upsert(
            self.cid,
            mode="cycle",
            cycle_len=28,
            last_period=(bot.dtoday() - timedelta(days=10)).isoformat(),
            height=168,
            weight=60,
            age=30,
            activity=2,
        )

    def tearDown(self):
        bot.DB = self.old_db
        self.tmp.cleanup()

    def test_journal_job_is_durable_deduplicated_and_kind_isolated(self):
        key = bot.chat_mutation_key("telegram", "42")
        first = bot._enqueue_journal_job(
            self.cid, "Вчера съела творог", key,
            channel="telegram", request_id="42", notify=True,
        )
        second = bot._enqueue_journal_job(
            self.cid, "Вчера съела творог", key,
            channel="telegram", request_id="42", notify=True,
        )
        bot._enqueue_today_job(self.cid)

        self.assertEqual(first["job_id"], second["job_id"])
        claimed = bot._claim_ai_job("journal_mutation")
        self.assertEqual(claimed["job_id"], first["job_id"])
        self.assertEqual(claimed["kind"], "journal_mutation")
        today = bot._claim_ai_job("today_note")
        self.assertIsNotNone(today)
        self.assertEqual(today["kind"], "today_note")

    def test_completed_journal_result_remains_pollable_but_payload_is_redacted(self):
        key = bot.chat_mutation_key("webchat", "abc")
        queued = bot._enqueue_journal_job(
            self.cid, "Съела яблоко", key, request_id="abc",
        )
        job = bot._claim_ai_job("journal_mutation")
        result = {"answer": "Записала", "completed": True}
        bot._finish_ai_job(job, "completed", result)

        status = bot._journal_job_status(self.cid, queued["job_id"])
        self.assertEqual(status["status"], "completed")
        self.assertEqual(status["result"], result)
        conn = sqlite3.connect(bot.DB)
        payload, saved = conn.execute(
            "SELECT payload_json,result_json FROM ai_jobs WHERE job_id=?",
            (queued["job_id"],),
        ).fetchone()
        conn.close()
        self.assertEqual(payload, "{}")
        self.assertIn("Записала", saved)

    def test_retry_while_job_is_running_reuses_the_same_durable_identity(self):
        key = bot.chat_mutation_key("telegram", "running-retry")
        first = bot._enqueue_journal_job(
            self.cid, "Вчера съела творог", key,
            channel="telegram", request_id="running-retry",
        )
        claimed = bot._claim_ai_job("journal_mutation")
        self.assertEqual(claimed["job_id"], first["job_id"])

        retry = bot._enqueue_journal_job(
            self.cid, "Вчера съела творог", key,
            channel="telegram", request_id="running-retry",
        )
        self.assertEqual(retry["job_id"], first["job_id"])
        self.assertEqual(retry["status"], "running")
        conn = sqlite3.connect(bot.DB)
        count = conn.execute(
            "SELECT COUNT(*) FROM ai_jobs WHERE dedupe_key=?",
            (bot._journal_job_key(self.cid, bot._user_generation(self.cid), key),),
        ).fetchone()[0]
        conn.close()
        self.assertEqual(count, 1)

    def test_concurrent_retries_create_one_durable_job(self):
        key = bot.chat_mutation_key("telegram", "concurrent-retry")

        def enqueue(_index):
            return bot._enqueue_journal_job(
                self.cid, "Вчера съела творог", key,
                channel="telegram", request_id="concurrent-retry",
            )

        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
            jobs = list(pool.map(enqueue, range(16)))

        self.assertEqual(len({job["job_id"] for job in jobs}), 1)
        conn = sqlite3.connect(bot.DB)
        count = conn.execute(
            "SELECT COUNT(*) FROM ai_jobs WHERE dedupe_key=?",
            (bot._journal_job_key(self.cid, bot._user_generation(self.cid), key),),
        ).fetchone()[0]
        conn.close()
        self.assertEqual(count, 1)

    def test_per_chat_cap_preserves_capacity_for_other_users(self):
        other_cid = self.cid + 1
        bot._activate_user(other_cid)
        old_limit = bot._AI_JOURNAL_CHAT_QUEUE_MAX
        bot._AI_JOURNAL_CHAT_QUEUE_MAX = 2
        try:
            for index in range(2):
                accepted = bot._enqueue_journal_job(
                    self.cid, f"Съела яблоко {index}",
                    bot.chat_mutation_key("webchat", f"same-chat-{index}"),
                )
                self.assertEqual(accepted["status"], "queued")
            rejected = bot._enqueue_journal_job(
                self.cid, "Съела ещё одно яблоко",
                bot.chat_mutation_key("webchat", "same-chat-overflow"),
            )
            other = bot._enqueue_journal_job(
                other_cid, "Съела грушу",
                bot.chat_mutation_key("webchat", "other-chat"),
            )
        finally:
            bot._AI_JOURNAL_CHAT_QUEUE_MAX = old_limit

        self.assertEqual(rejected, {"status": "rejected", "reason": "chat_queue_full"})
        self.assertEqual(other["status"], "queued")

    def test_dedicated_worker_completes_verified_food_write(self):
        parsed = {
            "title": "Творог", "grams": 200, "kcal": 240,
            "protein": 32, "fat": 10, "carbs": 6,
        }

        async def scenario():
            old_wake = bot._AI_JOB_WAKE
            bot._AI_JOB_WAKE = asyncio.Event()
            try:
                queued = bot._enqueue_journal_job(
                    self.cid, "Вчера съела творог",
                    bot.chat_mutation_key("webchat", "worker-1"),
                    request_id="worker-1", known_intent="logmeal",
                )
                worker = asyncio.create_task(bot._journal_job_worker(0))
                bot._AI_JOB_WAKE.set()
                for _ in range(100):
                    status = bot._journal_job_status(self.cid, queued["job_id"])
                    if status and status["status"] == "completed":
                        break
                    await asyncio.sleep(0.02)
                else:
                    self.fail("journal worker did not complete")
                worker.cancel()
                await asyncio.gather(worker, return_exceptions=True)
                return status
            finally:
                bot._AI_JOB_WAKE = old_wake

        with mock.patch.object(bot.L, "analyze_food_text", return_value=parsed):
            status = asyncio.run(scenario())
        self.assertIn("Записала", status["result"]["answer"])
        self.assertEqual(status["result"]["mutation"]["record_id"], 1)
        self.assertEqual(
            len(bot.meals_of(self.cid, (bot.dtoday() - timedelta(days=1)).isoformat())), 1,
        )

    def test_semantic_worker_uses_a_bounded_long_route_timeout(self):
        seen = []

        async def resolve(*_args, **kwargs):
            seen.append(kwargs.get("route_timeout_s"))
            return {"intent": "logmeal", "food_text": "творог"}

        async def reply(*_args, **_kwargs):
            return {"answer": "Записала", "suggestions": []}

        async def scenario():
            old_wake = bot._AI_JOB_WAKE
            bot._AI_JOB_WAKE = asyncio.Event()
            try:
                queued = bot._enqueue_journal_job(
                    self.cid, "Вчера съела творог",
                    bot.chat_mutation_key("webchat", "bounded-timeout"),
                    request_id="bounded-timeout", known_intent="logmeal",
                )
                worker = asyncio.create_task(bot._journal_job_worker(0))
                bot._AI_JOB_WAKE.set()
                for _ in range(100):
                    status = bot._journal_job_status(self.cid, queued["job_id"])
                    if status and status["status"] == "completed":
                        break
                    await asyncio.sleep(0.02)
                worker.cancel()
                await asyncio.gather(worker, return_exceptions=True)
            finally:
                bot._AI_JOB_WAKE = old_wake

        with (
            mock.patch.object(bot, "resolve_semantic_journal_action", side_effect=resolve),
            mock.patch.object(bot, "_chat_reply", side_effect=reply),
        ):
            asyncio.run(scenario())
        self.assertEqual(seen, [bot._AI_JOURNAL_WORKER_ROUTE_TIMEOUT_SECONDS])
        self.assertGreaterEqual(seen[0], 20)

    def test_unambiguous_completed_food_uses_structured_lane(self):
        text = "Вчера вечером съела два яйца и помидоры"
        with mock.patch.object(
            bot.L, "classify_journal_event",
            side_effect=AssertionError("universal classifier must be skipped"),
        ):
            plan = asyncio.run(bot.resolve_semantic_journal_action(
                self.cid, text, route_timeout_s=None,
            ))
        self.assertEqual(plan["intent"], "logmeal")
        self.assertEqual(plan["route"], "structured")
        self.assertEqual(plan["food_text"], text)

    def test_negated_food_never_uses_structured_lane(self):
        text = "Вчера вечером не ела ужин"
        with mock.patch.object(
            bot.L, "classify_journal_event", return_value={"action": "none"},
        ) as classifier:
            plan = asyncio.run(bot.resolve_semantic_journal_action(
                self.cid, text, route_timeout_s=None,
            ))
        classifier.assert_called_once()
        self.assertNotEqual((plan or {}).get("route"), "structured")
        self.assertNotEqual((plan or {}).get("intent"), "logmeal")

    def test_multiple_food_events_never_use_structured_lane(self):
        text = "Вчера поела омлет, потом перекусила яблоком"
        with mock.patch.object(
            bot.L, "classify_journal_event", return_value={"action": "none"},
        ) as classifier:
            plan = asyncio.run(bot.resolve_semantic_journal_action(
                self.cid, text, route_timeout_s=None,
            ))
        classifier.assert_called_once()
        self.assertNotEqual((plan or {}).get("route"), "structured")
        self.assertNotEqual((plan or {}).get("intent"), "logmeal")

    def test_workout_adjacent_text_never_uses_food_structured_lane(self):
        text = "Вчера поела омлет и размялась десять минут"
        with mock.patch.object(
            bot.L, "classify_journal_event", return_value={"action": "none"},
        ) as classifier:
            plan = asyncio.run(bot.resolve_semantic_journal_action(
                self.cid, text, route_timeout_s=None,
            ))
        classifier.assert_called_once()
        self.assertNotEqual((plan or {}).get("route"), "structured")
        self.assertNotEqual((plan or {}).get("intent"), "logmeal")

    def test_database_busy_becomes_retryable_rejection(self):
        with (
            mock.patch.object(
                bot, "_enqueue_journal_job",
                side_effect=sqlite3.OperationalError("database is locked"),
            ),
            mock.patch.object(bot, "ev"),
        ):
            result = asyncio.run(bot._submit_journal_mutation(
                self.cid, "Съела яблоко",
                bot.chat_mutation_key("webchat", "busy"),
                channel="webapp", request_id="busy",
            ))

        self.assertEqual(result["status"], "rejected")
        self.assertEqual(result["reason"], "database_busy")
        self.assertEqual(result["retry_after"], 2)
        payload = bot._journal_rejection_payload(
            result["reason"], result["retry_after"],
        )
        self.assertEqual(payload["retry_after"], 2)
        self.assertIn("Ничего не добавила", payload["answer"])

    def test_telegram_notification_retries_transient_delivery_errors(self):
        send_message = mock.AsyncMock(side_effect=[
            RuntimeError("telegram unavailable"),
            RuntimeError("telegram unavailable"),
            None,
        ])
        fake_app = mock.Mock()
        fake_app.bot.send_message = send_message
        with (
            mock.patch.object(bot, "BOT_APP", fake_app),
            mock.patch.object(bot.asyncio, "sleep", new=mock.AsyncMock()),
        ):
            delivered = asyncio.run(bot._send_journal_job_notification(
                "job-retry", self.cid, "Записала",
            ))

        self.assertTrue(delivered)
        self.assertEqual(send_message.await_count, 3)

    def test_worker_retry_after_mutation_commit_does_not_duplicate_meal(self):
        parsed = {
            "title": "Творог", "grams": 200, "kcal": 240,
            "protein": 32, "fat": 10, "carbs": 6,
        }
        original_finish = bot._finish_ai_job
        crashed = False

        def crash_before_job_completion(job, status, *args, **kwargs):
            nonlocal crashed
            if status == "completed" and not crashed:
                crashed = True
                raise RuntimeError("crash_after_mutation_commit")
            return original_finish(job, status, *args, **kwargs)

        async def scenario():
            old_wake = bot._AI_JOB_WAKE
            bot._AI_JOB_WAKE = asyncio.Event()
            try:
                queued = bot._enqueue_journal_job(
                    self.cid, "Вчера съела творог",
                    bot.chat_mutation_key("webchat", "retry-after-commit"),
                    request_id="retry-after-commit", known_intent="logmeal",
                )
                worker = asyncio.create_task(bot._journal_job_worker(0))
                bot._AI_JOB_WAKE.set()
                for _ in range(250):
                    status = bot._journal_job_status(self.cid, queued["job_id"])
                    if status and status["status"] == "completed":
                        break
                    await asyncio.sleep(0.02)
                else:
                    self.fail("retried journal worker did not complete")
                worker.cancel()
                await asyncio.gather(worker, return_exceptions=True)
                return status
            finally:
                bot._AI_JOB_WAKE = old_wake

        with (
            mock.patch.object(bot.L, "analyze_food_text", return_value=parsed),
            mock.patch.object(bot, "_finish_ai_job", side_effect=crash_before_job_completion),
        ):
            status = asyncio.run(scenario())

        self.assertTrue(crashed)
        self.assertEqual(status["status"], "completed")
        self.assertEqual(status["attempts"], 2)
        conn = sqlite3.connect(bot.DB)
        meal_count = conn.execute(
            "SELECT COUNT(*) FROM meals WHERE chat_id=?", (self.cid,),
        ).fetchone()[0]
        conn.close()
        self.assertEqual(meal_count, 1)

    def test_receipt_token_is_opaque_scoped_and_opens_exact_record(self):
        mutation = {"kind": "food", "record_id": 91, "date": "2026-08-05"}
        receipt = bot._create_receipt_link(self.cid, mutation)
        self.assertGreaterEqual(len(receipt["token"]), 40)
        self.assertRegex(receipt["token"], r"^[A-Za-z0-9_-]+$")
        with mock.patch.object(bot, "AIWA_WEBAPP_URL", "https://app.example.test/"):
            url = bot.campaign_webapp_url(bot.row(self.cid), open_token=receipt["token"])
        self.assertIn("?open=", url)
        self.assertNotIn("date=", url)
        self.assertNotIn("record", url)

        resolved = bot._resolve_receipt_link(self.cid, receipt["token"])
        self.assertEqual(resolved["tab"], "food")
        self.assertEqual(resolved["record_id"], "91")
        self.assertEqual(resolved["date"], "2026-08-05")
        self.assertEqual(resolved["view"], "diary")
        self.assertEqual(
            bot._resolve_receipt_link(self.cid, receipt["token"]), resolved,
        )
        self.assertIsNone(bot._resolve_receipt_link(self.cid + 1, receipt["token"]))

        conn = sqlite3.connect(bot.DB)
        conn.execute(
            "UPDATE receipt_links SET expires_at=? WHERE token_hash=?",
            ("2000-01-01T00:00:00+03:00", bot._hashlib.sha256(
                receipt["token"].encode("utf-8")
            ).hexdigest()),
        )
        conn.commit(); conn.close()
        self.assertIsNone(bot._resolve_receipt_link(self.cid, receipt["token"]))

        next_receipt = bot._create_receipt_link(self.cid, mutation)
        bot.del_user(self.cid)
        bot._activate_user(self.cid)
        self.assertIsNone(bot._resolve_receipt_link(self.cid, next_receipt["token"]))

    def test_receipt_creation_is_generation_atomic(self):
        mutation = {"kind": "food", "record_id": 7, "date": "2026-08-05"}
        stale_generation = bot._user_generation(self.cid)
        bot.del_user(self.cid)
        bot._activate_user(self.cid)

        receipt = bot._create_receipt_link(
            self.cid, mutation, user_generation=stale_generation,
        )

        self.assertIsNone(receipt)
        conn = sqlite3.connect(bot.DB)
        count = conn.execute(
            "SELECT COUNT(*) FROM receipt_links WHERE chat_id=?", (self.cid,),
        ).fetchone()[0]
        conn.close()
        self.assertEqual(count, 0)

    def test_job_counters_remain_separate_by_kind(self):
        bot._enqueue_journal_job(
            self.cid, "Съела яблоко",
            bot.chat_mutation_key("webchat", "counter-journal"),
        )
        bot._enqueue_today_job(self.cid)

        counts = bot._ai_job_status_counts()

        self.assertEqual(counts["queued"], 2)
        self.assertEqual(counts["journal_mutation_queued"], 1)
        self.assertEqual(counts["today_note_queued"], 1)

    def test_miniapp_consumes_receipt_and_chat_polls_pending_job(self):
        root = Path(__file__).resolve().parents[1]
        host = (root / "webapp2" / "index.html").read_text(encoding="utf-8")
        food = (root / "frontend" / "src" / "aiwa" / "screens" / "FoodScreen.jsx").read_text(encoding="utf-8")
        panel = (root / "frontend" / "src" / "aiwa" / "panels" / "FoodDiaryPanel.jsx").read_text(encoding="utf-8")
        chat = (root / "frontend" / "src" / "aiwa" / "screens" / "ChatScreen.jsx").read_text(encoding="utf-8")

        self.assertIn("/api/open_receipt", host)
        self.assertIn("aiwaConsumeOpenReceipt", host)
        self.assertIn('setPanel("diary")', food)
        self.assertIn("focusMealId", panel)
        self.assertIn("request_id: turnId", chat)
        self.assertIn("/api/journal_job", chat)


if __name__ == "__main__":
    unittest.main()
