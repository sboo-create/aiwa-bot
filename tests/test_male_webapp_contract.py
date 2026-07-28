import asyncio
import json
import os
import tempfile
import types
import unittest
from datetime import timedelta
from pathlib import Path
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


ROOT = Path(__file__).resolve().parents[1]
BUNDLE = ROOT / "webapp2" / "assets" / "deslop" / "deslop-main-aiwa-v162.js"
WRAPPER = ROOT / "webapp2" / "assets" / "deslop" / "main.js"
CHART_BUNDLE = ROOT / "webapp2" / "assets" / "deslop" / "AiwaWebUiChart-aiwa-v162.js"
V162_CSS = ROOT / "webapp2" / "assets" / "deslop" / "aiwa-v162.css"
INDEX = ROOT / "webapp2" / "index.html"


class FakeJsonRequest:
    def __init__(self, body):
        self.body = body

    async def json(self):
        return self.body


class MaleWebappContractTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "test.db")
        self.cid = 771
        bot._activate_user(self.cid)
        bot.upsert(
            self.cid,
            mode="male",
            height=178,
            weight=81,
            age=None,
            last_period=None,
            cycle_len=None,
        )

    def tearDown(self):
        bot.DB = self.old_db
        self.tmp.cleanup()

    def test_male_data_never_invents_cycle_fields(self):
        payload = json.loads(bot._api_data_sync(self.cid, {}).text)

        self.assertEqual(payload["mode"], "male")
        self.assertFalse(payload["cycle"])
        self.assertIsNone(payload["last_period"])
        self.assertIsNone(payload["cycle_len"])
        self.assertIsNone(payload["profile"]["age"])

    def test_male_profile_ignores_forged_cycle_length(self):
        request = FakeJsonRequest({
            "height": "178",
            "weight": "81",
            "age": "41",
            "cycle_len": "35",
        })
        with mock.patch.object(bot, "_verify_init", return_value=self.cid):
            response = asyncio.run(bot._api_profile(request))

        self.assertTrue(json.loads(response.text)["ok"])
        self.assertIsNone(bot.row(self.cid)["cycle_len"])

    def test_male_report_copy_never_mentions_cycle_or_gynecologist(self):
        user = bot.row(self.cid)

        prompt = bot.report_prompt(user)
        caption = bot.report_caption(user, "Весь период")

        self.assertEqual(prompt, "За какой период собрать выписку по самочувствию?")
        self.assertIn("самочувствию", caption)
        self.assertNotIn("цикл", (prompt + caption).lower())
        self.assertNotIn("гинеколог", (prompt + caption).lower())
        self.assertIn("терапевт", caption.lower())

    def test_initial_diary_payload_prefetches_previous_week(self):
        yesterday = (bot.dtoday() - timedelta(days=1)).isoformat()
        bot.meal_add(
            self.cid,
            {
                "title": "Творог",
                "kcal": 180,
                "protein": 28,
                "fat": 5,
                "carbs": 6,
                "items": [],
                "slot": "breakfast",
            },
            d=yesterday,
        )
        request = FakeJsonRequest({})
        with mock.patch.object(bot, "_verify_init", return_value=self.cid):
            response = asyncio.run(bot._api_diary(request))
        payload = json.loads(response.text)

        self.assertEqual(len(payload["recent"]), 7)
        self.assertEqual(payload["recent"][yesterday]["meals"][0]["title"], "Творог")


class MaleWebappStaticContractTests(unittest.TestCase):
    def test_male_webapp_keeps_home_and_hides_cycle_editor(self):
        bundle = BUNDLE.read_text(encoding="utf-8")
        index = INDEX.read_text(encoding="utf-8")

        self.assertIn("const s = sv, r = a === \"stats\" ? \"today\" : a", bundle)
        self.assertIn(
            "r.mode === \"cycle\" ? /* @__PURE__ */ m.jsx(ie, { label: \"Длина цикла\"",
            bundle,
        )
        self.assertIn(
            "...r.mode === \"cycle\" ? { cycle_len: g.cycle_len } : {}",
            bundle,
        )
        self.assertNotIn("мужской режим: без главной", index)
        self.assertIn(
            'title: r.mode === "male" ? "Выписка по самочувствию" : "Выписка для врача"',
            bundle,
        )
        self.assertIn(
            'description: r.mode === "male" ? "рост · вес · возраст" : "рост · вес · возраст · цикл"',
            bundle,
        )
        self.assertIn(
            'r.mode === "male" ? "Динамика энергии и дневник самочувствия придут PDF-файлом в чат бота."',
            bundle,
        )

    def test_webapp_uses_prefetched_diary_for_recent_days(self):
        bundle = BUNDLE.read_text(encoding="utf-8")

        self.assertIn("const ii = Z.recent?.[Kt]", bundle)
        self.assertIn("S(ii);", bundle)

    def test_telegram_gets_a_fresh_bundle_and_diary_cache_revalidates(self):
        bundle = BUNDLE.read_text(encoding="utf-8")
        wrapper = WRAPPER.read_text(encoding="utf-8")
        chart_bundle = CHART_BUNDLE.read_text(encoding="utf-8")
        index = INDEX.read_text(encoding="utf-8")

        self.assertIn('deslop-main-aiwa-v162.js', wrapper)
        self.assertIn('AiwaWebUiChart-aiwa-v162.js', bundle)
        self.assertIn('deslop-main-aiwa-v162.js', chart_bundle)
        self.assertIn('main.js?v=r15', index)
        self.assertIn(
            'import "./deslop-main-aiwa-v162.js?v=mascot-static-1";',
            wrapper,
        )
        self.assertIn("aiwaCacheTs", bundle)
        self.assertIn("maxAgeMs: l = 1500", bundle)
        self.assertIn("Date.now() - (aiwaCacheTs.get(a) || 0) <= l", bundle)

    def test_aiwa_mascot_uses_one_fully_decoded_frame_in_every_surface(self):
        bundle = BUNDLE.read_text(encoding="utf-8")
        component = bundle.split("function Gh", 1)[1].split("function xj", 1)[0]

        self.assertNotIn("setInterval", component)
        self.assertNotIn("setTimeout", component)
        self.assertIn('"data-frame": 0', component)
        self.assertIn("src: e[0]", component)
        self.assertIn('decoding: "sync"', component)

    def test_aiwa_art_stays_inside_telegram_safe_area(self):
        css = V162_CSS.read_text(encoding="utf-8")
        index = INDEX.read_text(encoding="utf-8")

        self.assertIn("aiwa-v162.css", index)
        self.assertIn(".aiwa-insight-content .aiwa-paper-ai-heading .aiwa-sequence", css)
        self.assertIn("overflow: visible", css)
        self.assertIn("env(safe-area-inset-bottom, 0px)", css)

    def test_food_and_training_use_telegram_photo_avatar(self):
        bundle = BUNDLE.read_text(encoding="utf-8")

        self.assertEqual(
            bundle.count("children: /* @__PURE__ */ m.jsx(Fj, {})"),
            2,
        )
        self.assertNotIn(
            'children: (c?.name || "•").trim()[0]?.toUpperCase() || "•"',
            bundle,
        )
        self.assertNotIn(
            'children: (r?.name || "•").trim()[0]?.toUpperCase() || "•"',
            bundle,
        )
