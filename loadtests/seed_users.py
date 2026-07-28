#!/usr/bin/env python3
"""Seed synthetic onboarded users into the dedicated AIWA staging SQLite."""

import argparse
import sqlite3
from datetime import datetime, timezone
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--db", type=Path, required=True)
    parser.add_argument("--user-id-base", type=int, default=790_000_000_000)
    parser.add_argument("--count", type=int, default=1000)
    parser.add_argument("--confirm-aiwa-staging", action="store_true")
    args = parser.parse_args()
    resolved = args.db.resolve()
    if not args.confirm_aiwa_staging:
        raise SystemExit("--confirm-aiwa-staging is required")
    if str(resolved) != "/srv/aiwa-staging/data/aiwa.db":
        raise SystemExit(f"Refusing unexpected database path: {resolved}")
    if not 1 <= args.count <= 2000:
        raise SystemExit("--count must be between 1 and 2000")
    connection = sqlite3.connect(resolved, timeout=30)
    try:
        columns = {
            row[1] for row in connection.execute("PRAGMA table_info(users)")
        }
        required = {"chat_id", "created", "mode", "height", "weight", "age", "activity"}
        if not required.issubset(columns):
            raise SystemExit("AIWA users schema is not initialized")
        now = datetime.now(timezone.utc).isoformat()
        connection.execute("BEGIN IMMEDIATE")
        connection.executemany(
            """INSERT INTO users(
                   chat_id,created,mode,state,height,weight,age,activity,
                   tg_first_name,proactive_enabled
               ) VALUES(?,?,?,?,?,?,?,?,?,?)
               ON CONFLICT(chat_id) DO UPDATE SET
                   mode=excluded.mode,state=NULL,height=excluded.height,
                   weight=excluded.weight,age=excluded.age,
                   activity=excluded.activity,
                   tg_first_name=excluded.tg_first_name,
                   proactive_enabled=excluded.proactive_enabled""",
            (
                (
                    args.user_id_base + index,
                    now,
                    "none",
                    None,
                    168,
                    65.0,
                    32,
                    2,
                    "Loadtest",
                    0,
                )
                for index in range(args.count)
            ),
        )
        connection.commit()
        seeded = connection.execute(
            "SELECT COUNT(*) FROM users WHERE chat_id>=? AND chat_id<?",
            (args.user_id_base, args.user_id_base + args.count),
        ).fetchone()[0]
        integrity = connection.execute("PRAGMA integrity_check").fetchone()[0]
    finally:
        connection.close()
    print(f"seeded={seeded}")
    print(f"integrity={integrity}")


if __name__ == "__main__":
    main()
