import os
import re
import unittest


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")


class PackageEntrypointTest(unittest.TestCase):
    def test_main_alias_precedes_package_imports(self):
        # Production запускает `python aiwa_bot.py`: без алиаса __main__ ->
        # aiwa_bot модули пакета aiwa/ загружают файл второй раз и падают
        # циклическим импортом (инцидент деплоя 2026-07-31, авто-откат).
        src = open("aiwa_bot.py", encoding="utf-8").read()
        alias = src.find('sys.modules.setdefault("aiwa_bot"')
        first_pkg_import = re.search(r"^from aiwa\.", src, re.M)
        self.assertGreater(alias, -1, "нет алиаса __main__ -> aiwa_bot")
        if first_pkg_import:
            self.assertLess(alias, first_pkg_import.start(),
                            "алиас должен стоять до первого импорта из пакета aiwa")

    def test_no_second_module_instance(self):
        import sys
        import aiwa_bot
        self.assertIs(sys.modules["aiwa_bot"], aiwa_bot)
        import aiwa.fitness as fitness
        self.assertIs(fitness.bot, aiwa_bot)

    def test_module_loads_under_foreign_name(self):
        # Эмуляция production-запуска: файл исполняется НЕ под именем
        # aiwa_bot (как __main__ у `python aiwa_bot.py`). Без алиаса пакет
        # aiwa/ загрузит файл второй раз — subprocess упадёт.
        import subprocess
        import sys as _sys
        import tempfile
        with tempfile.TemporaryDirectory() as tmp:
            env = dict(os.environ, AIWA_DB=os.path.join(tmp, "smoke.db"),
                       BOT_TOKEN="123456:test-token",
                       AIWA_ANALYTICS_SALT="test-analytics-salt")
            r = subprocess.run(
                [_sys.executable, "-c",
                 "import runpy; runpy.run_path('aiwa_bot.py', run_name='aiwa_smoke')"],
                capture_output=True, text=True, timeout=120, env=env)
            self.assertEqual(r.returncode, 0, "module failed under foreign name:\n" + r.stderr[-1500:])
