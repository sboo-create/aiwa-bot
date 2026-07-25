import os
import sqlite3
import tempfile
import unittest
from unittest import mock

import database


class DatabaseTests(unittest.TestCase):
    def test_sqlite_is_default_backend(self):
        with tempfile.TemporaryDirectory() as tmp, mock.patch.dict(os.environ, {}, clear=False):
            os.environ.pop("DATABASE_URL", None)
            conn = database.connect(os.path.join(tmp, "db.sqlite"))
            self.assertIsInstance(conn, sqlite3.Connection)
            conn.close()

    def test_postgres_qmark_translation(self):
        self.assertEqual(
            database._pg_sql("SELECT * FROM users WHERE chat_id=? AND mode=?"),
            "SELECT * FROM users WHERE chat_id=%s AND mode=%s",
        )

    def test_all_postgres_schema_statements_are_sqlite_free(self):
        joined = "\n".join(database.POSTGRES_SCHEMA).upper()
        self.assertNotIn("AUTOINCREMENT", joined)
        self.assertNotIn("INSERT OR ", joined)
        self.assertNotIn("PRAGMA", joined)

