"""Lightweight trace propagation shared by API, scheduler, and workers."""
from __future__ import annotations

import contextvars
import logging
import re
import secrets
from contextlib import contextmanager
from dataclasses import asdict, dataclass
from typing import Any, Iterator, Mapping


TRACE_HEADER = "X-Trace-ID"
_TRACE_RE = re.compile(r"^[A-Za-z0-9_.:-]{8,128}$")
_trace_id = contextvars.ContextVar("aiwa_trace_id", default="")


def new_trace_id() -> str:
    return "tr_" + secrets.token_hex(16)


def normalize_trace_id(value: Any) -> str:
    candidate = str(value or "").strip()
    return candidate if _TRACE_RE.fullmatch(candidate) else ""


def current_trace_id(create: bool = True) -> str:
    value = _trace_id.get()
    if not value and create:
        value = new_trace_id()
        _trace_id.set(value)
    return value


def bind_trace_id(trace_id: str | None = None) -> str:
    """Bind a trace to the current async context until that task completes."""
    value = normalize_trace_id(trace_id) or new_trace_id()
    _trace_id.set(value)
    return value


@contextmanager
def trace_context(trace_id: str | None = None) -> Iterator[str]:
    value = normalize_trace_id(trace_id) or new_trace_id()
    token = _trace_id.set(value)
    try:
        yield value
    finally:
        _trace_id.reset(token)


@dataclass(frozen=True)
class JobEnvelope:
    job_id: str
    job_type: str
    trace_id: str
    payload: dict[str, Any]
    idempotency_key: str
    attempt: int = 0

    @classmethod
    def create(
        cls,
        job_type: str,
        payload: Mapping[str, Any],
        idempotency_key: str,
        *,
        job_id: str | None = None,
        trace_id: str | None = None,
    ) -> "JobEnvelope":
        return cls(
            job_id=job_id or ("job_" + secrets.token_hex(16)),
            job_type=job_type,
            trace_id=normalize_trace_id(trace_id) or current_trace_id(),
            payload=dict(payload),
            idempotency_key=idempotency_key,
        )

    def as_dict(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, value: Mapping[str, Any]) -> "JobEnvelope":
        trace_id = normalize_trace_id(value.get("trace_id"))
        if not trace_id:
            raise ValueError("job envelope has no valid trace_id")
        return cls(
            job_id=str(value["job_id"]),
            job_type=str(value["job_type"]),
            trace_id=trace_id,
            payload=dict(value.get("payload") or {}),
            idempotency_key=str(value["idempotency_key"]),
            attempt=int(value.get("attempt") or 0),
        )


class TraceLogFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        record.trace_id = current_trace_id(create=False) or "-"
        return True


def install_log_record_factory() -> None:
    """Make ``trace_id`` available to every formatter without per-logger setup."""
    previous = logging.getLogRecordFactory()
    if getattr(previous, "_aiwa_trace_factory", False):
        return

    def factory(*args: Any, **kwargs: Any) -> logging.LogRecord:
        record = previous(*args, **kwargs)
        record.trace_id = current_trace_id(create=False) or "-"
        return record

    factory._aiwa_trace_factory = True  # type: ignore[attr-defined]
    logging.setLogRecordFactory(factory)
