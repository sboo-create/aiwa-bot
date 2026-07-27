import json
import unittest
from unittest import mock

import media_runtime as runtime


class FakeRedis:
    def __init__(self):
        self.messages = []
        self.closed = False

    async def xadd(self, stream, fields, **kwargs):
        self.messages.append((stream, fields, kwargs))
        return "1-0"

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
