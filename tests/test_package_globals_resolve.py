import builtins
import dis
import importlib
import os
import pkgutil
import types
import unittest


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot  # noqa: F401  (регистрирует алиас и пакет)
import aiwa


def _iter_code_objects(code):
    yield code
    for const in code.co_consts:
        if isinstance(const, types.CodeType):
            yield from _iter_code_objects(const)


class PackageGlobalsResolveTest(unittest.TestCase):
    """Каждый LOAD_GLOBAL в модулях пакета должен резолвиться.

    Инцидент 2026-07-31: f-строка в перенесённом коде осталась с `bot.` вместо
    `_bot.` — NameError всплыл только в 05:00 на проде. Этот тест ловит весь
    класс таких ошибок статически: имя, которого нет ни в модуле, ни в
    builtins, — провал ещё в CI.
    """

    def test_all_load_globals_resolve(self):
        problems = []
        for info in pkgutil.iter_modules(aiwa.__path__, "aiwa."):
            mod = importlib.import_module(info.name)
            for obj in vars(mod).values():
                func = None
                if isinstance(obj, types.FunctionType):
                    func = obj
                elif isinstance(obj, (staticmethod, classmethod)):
                    func = obj.__func__
                if func is None or func.__module__ != info.name:
                    continue
                for code in _iter_code_objects(func.__code__):
                    for ins in dis.get_instructions(code):
                        if ins.opname != "LOAD_GLOBAL":
                            continue
                        name = ins.argval
                        if hasattr(mod, name) or hasattr(builtins, name):
                            continue
                        problems.append("%s.%s: неизвестное имя %r" % (
                            info.name, func.__name__, name))
        self.assertEqual(problems, [],
                         "нерезолвящиеся глобальные имена:\n" + "\n".join(problems))
