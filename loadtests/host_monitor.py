#!/usr/bin/env python3
"""Low-overhead host/service monitor for AIWA load experiments."""

import argparse
import csv
import os
import subprocess
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import urlopen


def read_int(path, default=0):
    try:
        return int(Path(path).read_text().strip())
    except Exception:
        return default


def meminfo():
    values = {}
    try:
        for line in Path("/proc/meminfo").read_text().splitlines():
            key, raw = line.split(":", 1)
            values[key] = int(raw.strip().split()[0]) * 1024
    except Exception:
        pass
    return values


def process_stats(needle):
    rss = 0
    cpu_ticks = 0
    count = 0
    for entry in Path("/proc").iterdir():
        if not entry.name.isdigit():
            continue
        if int(entry.name) == os.getpid():
            continue
        try:
            cmdline = (entry / "cmdline").read_bytes().replace(b"\0", b" ").decode()
            if needle not in cmdline:
                continue
            count += 1
            status = (entry / "status").read_text()
            for line in status.splitlines():
                if line.startswith("VmRSS:"):
                    rss += int(line.split()[1]) * 1024
            fields = (entry / "stat").read_text().split()
            cpu_ticks += int(fields[13]) + int(fields[14])
        except Exception:
            continue
    return count, rss, cpu_ticks


def pid_stats(pid):
    if not pid:
        return 0, 0, 0
    entry = Path("/proc") / str(pid)
    try:
        status = entry.joinpath("status").read_text()
        rss = 0
        for line in status.splitlines():
            if line.startswith("VmRSS:"):
                rss = int(line.split()[1]) * 1024
                break
        fields = entry.joinpath("stat").read_text().split()
        return 1, rss, int(fields[13]) + int(fields[14])
    except Exception:
        return 0, 0, 0


def service_restarts(service):
    try:
        value = subprocess.check_output(
            ["systemctl", "show", service, "-p", "NRestarts", "--value"],
            text=True,
            timeout=2,
        )
        return int(value.strip())
    except Exception:
        return -1


def health(url):
    if not url:
        return 0, 0.0
    started = time.monotonic()
    try:
        with urlopen(url, timeout=2) as response:
            response.read()
            return response.status, (time.monotonic() - started) * 1000
    except Exception:
        return 0, (time.monotonic() - started) * 1000


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--duration", type=float, required=True)
    parser.add_argument("--interval", type=float, default=2)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--service")
    parser.add_argument("--cgroup")
    parser.add_argument("--db")
    parser.add_argument("--health-url")
    parser.add_argument("--process-needle")
    parser.add_argument("--process-pid", type=int)
    args = parser.parse_args()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    fields = (
        "captured_at", "host_load1", "host_load5", "mem_available_bytes",
        "swap_free_bytes", "service_cpu_usec", "service_memory_bytes",
        "service_memory_peak_bytes", "service_pids", "service_restarts",
        "process_count", "process_rss_bytes", "process_cpu_ticks",
        "db_bytes", "wal_bytes", "shm_bytes", "health_status", "health_ms",
    )
    deadline = time.monotonic() + args.duration
    with args.output.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=fields)
        writer.writeheader()
        while time.monotonic() < deadline:
            started = time.monotonic()
            mi = meminfo()
            load1, load5, _ = os.getloadavg()
            cpu_usec = memory = memory_peak = pids = 0
            if args.cgroup:
                cg = Path(args.cgroup)
                try:
                    cpu = dict(
                        line.split()
                        for line in (cg / "cpu.stat").read_text().splitlines()
                    )
                    cpu_usec = int(cpu.get("usage_usec", 0))
                except Exception:
                    pass
                memory = read_int(cg / "memory.current")
                memory_peak = read_int(cg / "memory.peak")
                pids = read_int(cg / "pids.current")
            process_count = process_rss = process_cpu = 0
            if args.process_pid:
                process_count, process_rss, process_cpu = pid_stats(args.process_pid)
            elif args.process_needle:
                process_count, process_rss, process_cpu = process_stats(
                    args.process_needle
                )
            sizes = []
            for suffix in ("", "-wal", "-shm"):
                path = (args.db or "") + suffix
                sizes.append(os.path.getsize(path) if path and os.path.exists(path) else 0)
            health_status, health_ms = health(args.health_url)
            writer.writerow(
                {
                    "captured_at": datetime.now(timezone.utc).isoformat(),
                    "host_load1": round(load1, 3),
                    "host_load5": round(load5, 3),
                    "mem_available_bytes": mi.get("MemAvailable", 0),
                    "swap_free_bytes": mi.get("SwapFree", 0),
                    "service_cpu_usec": cpu_usec,
                    "service_memory_bytes": memory,
                    "service_memory_peak_bytes": memory_peak,
                    "service_pids": pids,
                    "service_restarts": service_restarts(args.service) if args.service else -1,
                    "process_count": process_count,
                    "process_rss_bytes": process_rss,
                    "process_cpu_ticks": process_cpu,
                    "db_bytes": sizes[0],
                    "wal_bytes": sizes[1],
                    "shm_bytes": sizes[2],
                    "health_status": health_status,
                    "health_ms": round(health_ms, 3),
                }
            )
            fh.flush()
            time.sleep(max(0, args.interval - (time.monotonic() - started)))


if __name__ == "__main__":
    main()
