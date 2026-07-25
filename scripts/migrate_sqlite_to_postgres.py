#!/usr/bin/env python3
"""One-shot, idempotent copy of the legacy AIWA SQLite DB to PostgreSQL."""
import argparse
import os
import sqlite3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import psycopg
from psycopg import sql

import database


def migrate(sqlite_path, postgres_url, dry_run=False):
    source = sqlite3.connect(sqlite_path)
    target = psycopg.connect(postgres_url)
    copied = {}
    try:
        for statement in database.POSTGRES_SCHEMA:
            target.execute(statement)
        tables = [
            row[0] for row in source.execute(
                "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
            )
        ]
        for table in tables:
            columns = [row[1] for row in source.execute(f'PRAGMA table_info("{table}")')]
            if not columns:
                continue
            # Names come from SQLite's own catalog; double quoting is sufficient here.
            quoted_columns = ",".join('"' + name.replace('"', '""') + '"' for name in columns)
            quoted_table = '"' + table.replace('"', '""') + '"'
            rows = source.execute(f"SELECT {quoted_columns} FROM {quoted_table}").fetchall()  # nosec B608
            copied[table] = len(rows)
            if dry_run or not rows:
                continue
            statement = sql.SQL("INSERT INTO {} ({}) VALUES ({}) ON CONFLICT DO NOTHING").format(
                sql.Identifier(table),
                sql.SQL(",").join(map(sql.Identifier, columns)),
                sql.SQL(",").join(sql.Placeholder() for _ in columns),
            )
            target.executemany(statement, rows)
        if not dry_run:
            for table in ("sugg", "chat_log", "events", "meals", "workouts", "proactive_log"):
                target.execute(
                    sql.SQL(
                        "SELECT setval(pg_get_serial_sequence(%s, 'id'), "
                        "COALESCE((SELECT MAX(id) FROM {}), 1), "
                        "EXISTS(SELECT 1 FROM {}))"
                    ).format(sql.Identifier(table), sql.Identifier(table)),
                    (table,),
                )
            target.commit()
        else:
            target.rollback()
        return copied
    except Exception:
        target.rollback()
        raise
    finally:
        source.close()
        target.close()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--sqlite", default=os.environ.get("AIWA_DB", "aiwa.db"))
    parser.add_argument("--postgres", default=os.environ.get("DATABASE_URL"))
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    if not args.postgres:
        parser.error("--postgres or DATABASE_URL is required")
    result = migrate(args.sqlite, args.postgres, args.dry_run)
    print(("would copy" if args.dry_run else "copied"), sum(result.values()), "rows", result)


if __name__ == "__main__":
    main()
