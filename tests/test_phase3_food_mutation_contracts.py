import asyncio
import json
import os
import tempfile
import unittest
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


class FakeJsonRequest:
    def __init__(self, body):
        self.body = body

    async def json(self):
        return self.body


class Phase3FoodMutationContracts(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "food-mutations.db")
        self.cid = 9401
        bot._activate_user(self.cid)
        bot.upsert(self.cid, mode="irregular", height=168, weight=62, age=31)

    def tearDown(self):
        bot.DB = self.old_db
        self.tmp.cleanup()

    def call(self, handler, body):
        with mock.patch.object(bot, "_verify_init", return_value=self.cid):
            response = asyncio.run(handler(FakeJsonRequest(body)))
        return response, json.loads(response.text)

    def manual_body(self, request_id="manual-1"):
        return {
            "request_id": request_id,
            "date": bot.dtoday().isoformat(),
            "title": "Творог и банан",
            "kcal": "340",
            "protein": "28",
            "fat": "8",
            "carbs": "42",
            "grams": "300",
            "slot": "breakfast",
        }

    def test_manual_retry_replays_atomic_receipt_without_duplicate(self):
        first_response, first = self.call(bot._api_food_manual, self.manual_body())
        second_response, second = self.call(bot._api_food_manual, self.manual_body())

        self.assertEqual(first_response.status, 200)
        self.assertEqual(second_response.status, 200)
        self.assertFalse(first["duplicate"])
        self.assertTrue(second["duplicate"])
        self.assertEqual(first["meal_id"], second["meal_id"])
        self.assertEqual(len(bot.meals_of(self.cid)), 1)
        self.assertEqual(second["diary"]["date"], bot.dtoday().isoformat())

    def test_manual_receipt_failure_rolls_forward_to_durable_retry(self):
        original = bot._stored_food_mutation_receipt
        with mock.patch.object(
            bot, "_stored_food_mutation_receipt", side_effect=RuntimeError("after commit")
        ):
            failed_response, failed = self.call(bot._api_food_manual, self.manual_body())
        self.assertEqual(failed_response.status, 500)
        self.assertTrue(failed["committed"])
        self.assertEqual(len(bot.meals_of(self.cid)), 1)

        with mock.patch.object(bot, "_stored_food_mutation_receipt", wraps=original):
            retry_response, retry = self.call(bot._api_food_manual, self.manual_body())
        self.assertEqual(retry_response.status, 200)
        self.assertTrue(retry["duplicate"])
        self.assertEqual(len(bot.meals_of(self.cid)), 1)

    def test_delete_receipt_failure_replays_tombstone_instead_of_404(self):
        target = bot.dtoday().isoformat()
        mid = bot.meal_add(self.cid, {
            "title": "Каша", "kcal": 250, "protein": 8, "fat": 5,
            "carbs": 44, "grams": 250, "items": [], "source": "manual",
        }, d=target)
        body = {"id": mid, "request_id": "delete-1"}

        with mock.patch.object(
            bot, "_stored_food_mutation_receipt", side_effect=RuntimeError("after commit")
        ):
            failed_response, failed = self.call(bot._api_diary_del, body)
        self.assertEqual(failed_response.status, 500)
        self.assertTrue(failed["committed"])
        self.assertIsNone(bot.meal_get(self.cid, mid))

        retry_response, retry = self.call(bot._api_diary_del, body)
        self.assertEqual(retry_response.status, 200)
        self.assertTrue(retry["duplicate"])
        self.assertEqual(retry["deleted_id"], mid)
        self.assertEqual(retry["date"], target)
        self.assertEqual(retry["meals"], [])

        # Losing the client token is still safe because the owned tombstone is
        # discoverable by immutable meal id.
        recovered_response, recovered = self.call(
            bot._api_diary_del, {"id": mid, "request_id": "delete-new-token"}
        )
        self.assertEqual(recovered_response.status, 200)
        self.assertTrue(recovered["duplicate"])

    def test_delete_failure_inside_transaction_rolls_back_meal_and_tombstone(self):
        mid = bot.meal_add(self.cid, {
            "title": "Суп", "kcal": 190, "protein": 9, "fat": 7,
            "carbs": 24, "items": [], "source": "manual",
        })
        with mock.patch.object(bot, "_diary_snapshot_conn", side_effect=RuntimeError("middle")):
            response, payload = self.call(
                bot._api_diary_del, {"id": mid, "request_id": "delete-rollback"}
            )
        self.assertEqual(response.status, 500)
        self.assertEqual(payload["error"], "diary_delete_failed")
        self.assertIsNotNone(bot.meal_get(self.cid, mid))
        c = bot.db()
        count = c.execute(
            "SELECT COUNT(*) FROM chat_mutations WHERE chat_id=? AND kind='food_delete'",
            (self.cid,),
        ).fetchone()[0]
        c.close()
        self.assertEqual(count, 0)


if __name__ == "__main__":
    unittest.main()
