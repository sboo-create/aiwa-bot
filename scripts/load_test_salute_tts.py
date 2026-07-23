#!/usr/bin/env python3
"""Controlled live load test for SaluteSpeech multilingual synchronous TTS.

The script never prints credentials or stores returned audio. It ramps concurrency
only to the documented account limit and exits non-zero on any failed request.
"""

import argparse
import concurrent.futures
import json
import os
from pathlib import Path
import statistics
import sys
import time


SAMPLES = [
    ("ru", "Сегодня хорошая погода, и мы идём гулять."),
    ("uz", "Salom, bu o‘zbek tilidagi oddiy gap."),
    ("pt", "Olá, como você está hoje? Muito obrigado."),
    ("pl", "Dzień dobry, jak się masz? Dziękuję bardzo."),
    ("nl", "Goedemorgen, dit is een Nederlandse zin."),
    ("kz", "Бұл қазақ тіліндегі қарапайым сөйлем."),
    ("en", "Hello, this is a simple English sentence."),
    ("de", "Guten Morgen, das ist ein deutscher Satz."),
    ("es", "Hola, buenos días. Esta es una frase española."),
    ("fr", "Bonjour, ceci est une phrase française."),
    ("it", "Ciao, questa è una semplice frase italiana."),
    ("ky", "Бул кыргыз тилиндеги жөнөкөй сүйлөм."),
]


def percentile(values, fraction):
    if not values:
        return None
    ordered = sorted(values)
    index = min(len(ordered) - 1, max(0, int(round((len(ordered) - 1) * fraction))))
    return ordered[index]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--confirm-live", action="store_true", help="required: makes billable provider calls")
    parser.add_argument("--account-type", choices=("personal", "legal"), default="personal")
    parser.add_argument("--levels", default="1,2,3,5")
    parser.add_argument("--requests-per-level", type=int, default=12)
    parser.add_argument("--cooldown", type=float, default=2.0)
    parser.add_argument("--output", default="")
    args = parser.parse_args()
    if not args.confirm_live:
        parser.error("--confirm-live is required")

    account_limit = 10 if args.account_type == "legal" else 5
    levels = sorted(set(int(value) for value in args.levels.split(",") if value.strip()))
    if not levels or min(levels) < 1 or max(levels) > account_limit:
        parser.error(f"levels must be between 1 and documented account limit {account_limit}")
    if not 1 <= args.requests_per_level <= 120:
        parser.error("--requests-per-level must be between 1 and 120")

    os.environ["AIWA_SALUTE_ACCOUNT_TYPE"] = args.account_type
    os.environ["AIWA_TTS_PROVIDER_CONCURRENCY"] = str(max(levels))
    root = str(Path(__file__).resolve().parents[1])
    if root not in sys.path:
        sys.path.insert(0, root)
    import llm

    configured = bool(
        os.environ.get("SBER_SALUTE_AUTH_KEY")
        or os.environ.get("SALUTE_SPEECH_CREDENTIALS")
        or (
            os.environ.get("SALUTE_SPEECH_CLIENT_ID")
            and os.environ.get("SALUTE_SPEECH_CLIENT_SECRET")
        )
    )
    if not configured:
        raise SystemExit("SaluteSpeech credentials are not configured")
    if not llm._salute_auth():
        raise SystemExit("SaluteSpeech authentication failed")

    payloads = []
    while len(payloads) < args.requests_per_level:
        for language, text in SAMPLES:
            payloads.append(
                llm.tts_ssml_requests(text, default_language=language)[0]
            )
            if len(payloads) >= args.requests_per_level:
                break

    report = {
        "provider": "salute",
        "mode": "sync_multilingual_ssml",
        "account_type": args.account_type,
        "documented_concurrency_limit": account_limit,
        "requests_per_level": args.requests_per_level,
        "levels": [],
    }

    def one(index):
        info = {}
        started = time.perf_counter()
        audio = llm.synthesize_request(payloads[index % len(payloads)], info)
        elapsed_ms = int((time.perf_counter() - started) * 1000)
        return {
            "ok": bool(audio),
            "latency_ms": elapsed_ms,
            "characters": int(info.get("chars") or 0),
            "languages": info.get("languages") or [],
        }

    baseline_wall = None
    for position, concurrency in enumerate(levels):
        started = time.perf_counter()
        with concurrent.futures.ThreadPoolExecutor(max_workers=concurrency) as pool:
            results = list(pool.map(one, range(args.requests_per_level)))
        wall_seconds = time.perf_counter() - started
        latencies = [result["latency_ms"] for result in results]
        successes = sum(result["ok"] for result in results)
        if concurrency == 1:
            baseline_wall = wall_seconds
        level = {
            "concurrency": concurrency,
            "successes": successes,
            "failures": len(results) - successes,
            "wall_seconds": round(wall_seconds, 3),
            "requests_per_second": round(len(results) / wall_seconds, 3),
            "p50_ms": percentile(latencies, 0.50),
            "p95_ms": percentile(latencies, 0.95),
            "max_ms": max(latencies),
            "speedup_vs_serial": round(baseline_wall / wall_seconds, 2) if baseline_wall else 1.0,
        }
        report["levels"].append(level)
        print(json.dumps(level, ensure_ascii=False))
        if level["failures"]:
            report["passed"] = False
            break
        if position < len(levels) - 1 and args.cooldown > 0:
            time.sleep(min(args.cooldown, 30))
    else:
        report["passed"] = True

    output = json.dumps(report, ensure_ascii=False, indent=2)
    if args.output:
        Path(args.output).write_text(output + "\n", encoding="utf-8")
    print(output)
    return 0 if report.get("passed") else 2


if __name__ == "__main__":
    raise SystemExit(main())
