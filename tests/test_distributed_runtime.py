import json
import unittest
from unittest import mock

import distributed_runtime as runtime


class FakeRedis:
    def __init__(self):
        self.values = {}
        self.messages = []
        self.acked = []

    async def set(self, key, value, ex=None, nx=False):
        if nx and key in self.values:
            return False
        self.values[key] = value
        return True

    async def delete(self, key):
        self.values.pop(key, None)

    async def xadd(self, stream, fields, **kwargs):
        self.messages.append((stream, fields))
        return "1-0"

    async def incr(self, key):
        self.values[key] = int(self.values.get(key, 0)) + 1
        return self.values[key]

    async def expire(self, key, ttl):
        return True

    async def xack(self, stream, group, message_id):
        self.acked.append(message_id)


class DistributedRuntimeTests(unittest.IsolatedAsyncioTestCase):
    async def test_enqueue_is_idempotent_and_carries_trace(self):
        client = FakeRedis()
        with mock.patch.object(runtime.TR, "current_trace_id", return_value="trace_test_123"):
            self.assertTrue(await runtime.enqueue(client, "daily_summary", {"chat_id": 7}, "daily:7"))
            self.assertFalse(await runtime.enqueue(client, "daily_summary", {"chat_id": 7}, "daily:7"))
        self.assertEqual(len(client.messages), 1)
        envelope = json.loads(client.messages[0][1]["envelope"])
        self.assertEqual(envelope["trace_id"], "trace_test_123")
        self.assertEqual(envelope["payload"], {"chat_id": 7})

    async def test_failed_job_moves_to_dead_letter_after_limit(self):
        client = FakeRedis()
        fields = {"envelope": "{}"}
        with mock.patch.dict("os.environ", {"AIWA_JOB_MAX_ATTEMPTS": "2"}):
            await runtime._handle_failure(client, "9-0", fields, RuntimeError("temporary"))
            self.assertEqual(client.acked, [])
            await runtime._handle_failure(client, "9-0", fields, RuntimeError("still broken"))
        self.assertEqual(client.acked, ["9-0"])
        self.assertEqual(client.messages[0][0], runtime.STREAM + ":dead")

