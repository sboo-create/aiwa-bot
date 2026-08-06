import threading
import unittest
from unittest import mock

import llm


class LlmRuntimeStatsTests(unittest.TestCase):
    def setUp(self):
        llm.pop_stats()

    def tearDown(self):
        llm.pop_stats()

    def test_inflight_failure_stays_with_its_completed_call(self):
        started = threading.Event()
        release = threading.Event()

        def blocked_failure(*_args, **_kwargs):
            started.set()
            release.wait(timeout=5)
            return None

        with mock.patch.object(llm, "_call_impl", side_effect=blocked_failure):
            worker = threading.Thread(
                target=llm._call,
                args=([{"role": "user", "content": "test"}],),
            )
            worker.start()
            self.assertTrue(started.wait(timeout=2))
            boundary = llm.pop_stats()
            release.set()
            worker.join(timeout=5)

        completed = llm.pop_stats()
        self.assertEqual(boundary["calls"], 0)
        self.assertEqual(boundary["err"], 0)
        self.assertEqual(completed["calls"], 1)
        self.assertEqual(completed["err"], 1)
        self.assertLessEqual(completed["err"], completed["calls"])

    def test_synthetic_health_probe_does_not_double_count_user_errors(self):
        with mock.patch.object(llm, "_call_impl", return_value=None):
            ok, output = llm.health_check()
        self.assertFalse(ok)
        self.assertEqual(output, "")
        self.assertEqual(llm.pop_stats()["calls"], 0)


if __name__ == "__main__":
    unittest.main()
