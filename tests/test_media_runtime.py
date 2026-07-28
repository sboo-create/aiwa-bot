import json
import unittest
from unittest import mock

import media_runtime as runtime


class FakeRedis:
    def __init__(self):
        self.messages = []
        self.closed = False
        self.groups = [{"name": runtime.GROUP, "lag": 0, "pending": 0}]

    async def xadd(self, stream, fields, **kwargs):
        self.messages.append((stream, fields, kwargs))
        return "1-0"

    async def xinfo_groups(self, stream):
        return self.groups

    async def aclose(self):
        self.closed = True


class MediaRuntimeTests(unittest.IsolatedAsyncioTestCase):
    async def asyncTearDown(self):
        await runtime.close_publisher()

    async def test_enqueue_food_photo_carries_job_identity(self):
        client = FakeRedis()
        with mock.patch.object(runtime, "_client", return_value=client):
            await runtime.enqueue_food_photo("media_test", 42)
            await runtime.enqueue_food_photo("media_test_2", 42)

        self.assertFalse(client.closed)
        self.assertEqual(len(client.messages), 2)
        self.assertEqual(client.messages[0][0], runtime.STREAM)
        envelope = json.loads(client.messages[0][1]["envelope"])
        self.assertEqual(envelope["job_type"], "food_photo")
        self.assertEqual(envelope["job_id"], "media_test")
        self.assertEqual(envelope["payload"], {"job_id": "media_test", "chat_id": 42})
        await runtime.close_publisher()
        self.assertTrue(client.closed)

    async def test_enqueue_rejects_overloaded_queue(self):
        client = FakeRedis()
        client.groups[0].update(lag=8, pending=2)
        with (
            mock.patch.object(runtime, "_client", return_value=client),
            mock.patch.dict("os.environ", {"AIWA_MEDIA_QUEUE_MAX_DEPTH": "10"}),
        ):
            with self.assertRaises(runtime.MediaQueueFull) as caught:
                await runtime.enqueue_food_photo("media_overload", 42)

        self.assertEqual(caught.exception.depth, 10)
        self.assertGreaterEqual(caught.exception.retry_after, 5)
        self.assertEqual(client.messages, [])
