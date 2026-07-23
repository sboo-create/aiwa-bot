import os
import sqlite3
import tempfile
import unittest
from pathlib import Path

import analytics_v2 as a2
from scripts import migrate_legacy_analytics as migration


class LegacyMigrationTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.db_path = Path(self.tmp.name) / "aiwa.db"
        self.old_salt = os.environ.get("AIWA_ANALYTICS_SALT")
        os.environ["AIWA_ANALYTICS_SALT"] = "migration-test-salt-at-least-32-characters"
        self.conn = sqlite3.connect(self.db_path)
        self.conn.execute("CREATE TABLE users(chat_id INTEGER PRIMARY KEY, created TEXT)")
        self.conn.execute("""CREATE TABLE events(
            id INTEGER PRIMARY KEY, chat_id INTEGER, ts TEXT, action TEXT, tokens INTEGER,
            meta TEXT, calls INTEGER DEFAULT 0)""")
        a2.init_schema(self.conn)
        self.conn.execute("INSERT INTO users VALUES(?,?)", (123456, "2026-06-01T10:00:00+00:00"))
        self.conn.execute("INSERT INTO events VALUES(?,?,?,?,?,?,?)",
                          (1, 123456, "2026-06-02T10:00:00+00:00", "button", 0, "view_food", 0))
        self.conn.execute("""INSERT INTO events_v2(
            event_id,occurred_at,user_key,event_name,source,properties_json)
            VALUES('exact','2026-07-01T00:00:00+00:00','u_exact','app_opened','bot','{}')""")
        self.conn.commit()

    def tearDown(self):
        self.conn.close()
        if self.old_salt is None: os.environ.pop("AIWA_ANALYTICS_SALT", None)
        else: os.environ["AIWA_ANALYTICS_SALT"] = self.old_salt
        self.tmp.cleanup()

    def test_dry_run_apply_is_idempotent_and_rollbackable(self):
        plan = migration.build_plan(self.conn, None, "batch-test")
        serialized = str(plan)
        self.assertEqual(plan["cutover"], "2026-07-01T00:00:00+00:00")
        self.assertEqual(len(plan["pending"]), 2)
        self.assertNotIn("123456", serialized)
        self.assertEqual(plan["event_counts"], {"onboarding_started": 1, "screen_viewed": 1})

        backup = migration.apply_plan(self.conn, self.db_path, plan)
        self.assertTrue(backup.exists())
        self.assertEqual(self.conn.execute("SELECT COUNT(*) FROM events_v2 WHERE source='legacy_migration'").fetchone()[0], 2)
        self.assertEqual(len(migration.build_plan(self.conn, None, "second")["pending"]), 0)
        self.assertEqual(migration.rollback(self.conn, "batch-test"), 2)
        self.assertEqual(self.conn.execute("SELECT COUNT(*) FROM events_v2 WHERE event_id='exact'").fetchone()[0], 1)


if __name__ == "__main__":
    unittest.main()
