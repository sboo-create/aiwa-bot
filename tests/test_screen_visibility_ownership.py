"""Рендер экрана не решает, что видно.

Баг, ради которого это есть: на «Питании» перемотка календаря открывала
главный экран поверх, а таб оставался на «Питании». Причина — один оператор:
renderPaperHome присваивал el.className целиком и вместе со стилем стирал
класс hidden, которым владеет навигация. У атрибута class оказалось два
владельца, и рендер молча забирал чужое.

Тест сторожит границу: корню экрана нельзя присваивать className целиком.
Добавлять и снимать свои классы можно — classList для того и есть.
"""

import re
import unittest
from pathlib import Path

INDEX = Path(__file__).resolve().parents[1] / "webapp2" / "index.html"

#: Присваивание className корню экрана. Именно оно затирает hidden.
WHOLESALE = re.compile(r"el\.className\s*=\s*['\"]paper-[a-z]+['\"]")


class ScreenVisibilityOwnershipTests(unittest.TestCase):
    def setUp(self):
        self.source = INDEX.read_text(encoding="utf-8")

    def test_no_renderer_overwrites_the_class_attribute(self):
        hits = WHOLESALE.findall(self.source)
        self.assertEqual(
            hits, [],
            "рендер затирает класс видимости: " + ", ".join(hits)
            + ". Сохраняй hidden или используй classList.add.",
        )

    def test_renderers_preserve_the_visibility_class(self):
        """Все три корня экранов обязаны сохранять hidden при перерисовке."""
        preserving = self.source.count("el.classList.contains('hidden')?'paper-")
        self.assertGreaterEqual(
            preserving, 3,
            "ожидались сохраняющие видимость присваивания у главной, питания и нагрузки",
        )

    def test_day_selection_still_repaints_the_home_root(self):
        """Сохранение hidden не должно отменить саму перерисовку."""
        self.assertIn("function aiwaSelectDay(iso){", self.source)
        start = self.source.index("function aiwaSelectDay(iso){")
        body = self.source[start:start + 600]
        self.assertIn("renderToday()", body)


if __name__ == "__main__":
    unittest.main()
