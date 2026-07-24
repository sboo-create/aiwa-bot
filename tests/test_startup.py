import asyncio
import os
import unittest
from unittest import mock

import startup


class StartupTests(unittest.IsolatedAsyncioTestCase):
    async def test_retries_until_dependency_is_ready(self):
        attempts = 0

        async def flaky():
            nonlocal attempts
            attempts += 1
            if attempts < 3:
                raise ConnectionError("not yet")

        await startup.wait_for_dependencies(
            ["postgres"], timeout=2, checks={"postgres": flaky}
        )
        self.assertEqual(attempts, 3)

    async def test_timeout_fails_startup(self):
        async def unavailable():
            raise ConnectionError("down")

        with self.assertRaisesRegex(RuntimeError, "did not become ready"):
            await startup.wait_for_dependencies(
                ["redis"], timeout=0.01, checks={"redis": unavailable}
            )

    async def test_telegram_waits_for_worker_only_in_distributed_mode(self):
        seen = []

        async def capture(names, **kwargs):
            seen.append(tuple(names))

        with mock.patch.object(startup, "wait_for_dependencies", capture):
            with mock.patch.dict(os.environ, {}, clear=False):
                os.environ.pop("AIWA_ENABLE_DISTRIBUTED_ROLES", None)
                await startup.wait_for_role("telegram")
            with mock.patch.dict(
                os.environ, {"AIWA_ENABLE_DISTRIBUTED_ROLES": "1"}
            ):
                await startup.wait_for_role("telegram")

        self.assertEqual(seen[0], ("postgres", "redis"))
        self.assertEqual(seen[1], ("postgres", "redis", "worker"))

    async def test_missing_urls_fail_closed_for_distributed_roles(self):
        with mock.patch.dict(
            os.environ, {"AIWA_ENABLE_DISTRIBUTED_ROLES": "1"}, clear=True
        ):
            with self.assertRaisesRegex(RuntimeError, "DATABASE_URL"):
                await startup.check_postgres()


if __name__ == "__main__":
    unittest.main()
