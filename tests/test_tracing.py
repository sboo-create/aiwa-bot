import logging
import unittest

import tracing


class TracingTests(unittest.TestCase):
    def test_context_is_restored(self):
        with tracing.trace_context("tr_parent123"):
            self.assertEqual(tracing.current_trace_id(), "tr_parent123")
            with tracing.trace_context("tr_child1234"):
                self.assertEqual(tracing.current_trace_id(), "tr_child1234")
            self.assertEqual(tracing.current_trace_id(), "tr_parent123")

    def test_invalid_external_trace_is_replaced(self):
        with tracing.trace_context("../../secret") as trace_id:
            self.assertRegex(trace_id, r"^tr_[0-9a-f]{32}$")

    def test_job_envelope_propagates_trace(self):
        with tracing.trace_context("tr_request123"):
            job = tracing.JobEnvelope.create(
                "food.photo.analyze",
                {"media_id": "m1"},
                "food-photo:m1",
            )
        restored = tracing.JobEnvelope.from_dict(job.as_dict())
        self.assertEqual(restored.trace_id, "tr_request123")
        self.assertEqual(restored.idempotency_key, "food-photo:m1")

    def test_log_factory_adds_trace(self):
        tracing.install_log_record_factory()
        with tracing.trace_context("tr_logging123"):
            record = logging.getLogger("test").makeRecord(
                "test", logging.INFO, __file__, 1, "hello", (), None
            )
        self.assertEqual(record.trace_id, "tr_logging123")


if __name__ == "__main__":
    unittest.main()
