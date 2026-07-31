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
import llm


ROOT = Path(__file__).resolve().parents[1]
BUNDLE = ROOT / "webapp2" / "assets" / "deslop" / "deslop-main-aiwa-v177.js"
WRAPPER = ROOT / "webapp2" / "assets" / "deslop" / "main.js"
CHART_BUNDLE = ROOT / "webapp2" / "assets" / "deslop" / "AiwaWebUiChart-aiwa-v177.js"
V163_CSS = ROOT / "webapp2" / "assets" / "deslop" / "aiwa-v163.css"
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
        bot._TODAY_CACHE.clear()
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
        bot._TODAY_CACHE.clear()
        bot.DB = self.old_db
        self.tmp.cleanup()

    def test_male_data_never_invents_cycle_fields(self):
        payload = json.loads(bot._api_data_sync(self.cid, {}).text)

        self.assertEqual(payload["mode"], "male")
        self.assertFalse(payload["cycle"])
        self.assertIsNone(payload["last_period"])
        self.assertIsNone(payload["cycle_len"])
        self.assertIsNone(payload["profile"]["age"])
        self.assertEqual(payload["today"], bot.dtoday().isoformat())
        self.assertEqual(payload["timezone"], str(bot.TZ))

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

    def test_male_pdf_context_discards_stale_cycle_data(self):
        stale_status = {"day": 12, "cycle_len": 28, "phase_ru": "Фолликулярная"}

        male, status, cycles = bot.RPT._report_context({
            "mode": "male",
            "st": stale_status,
            "cycles": ["2026-06-01", "2026-06-29"],
        })

        self.assertTrue(male)
        self.assertIsNone(status)
        self.assertEqual(cycles, [])

    def test_male_today_cache_is_repaired_without_cycle_content(self):
        stale = {
            "summary": "День 12, фолликулярная фаза, растёт эстроген.",
            "suggestions": ["Как отследить овуляцию?"],
        }
        bot.dc_put(self.cid, "today", stale, "male")

        user, status, _, note = bot._api_today_lookup(self.cid)

        self.assertEqual(user["mode"], "male")
        self.assertIsNone(status)
        visible = json.dumps(note, ensure_ascii=False).lower()
        for forbidden in ("цикл", "фоллик", "овуляц", "эстроген"):
            self.assertNotIn(forbidden, visible)
        self.assertEqual(bot.dc_get(self.cid, "today", "male"), note)

    def test_male_today_prompt_explicitly_forbids_cycle_content(self):
        captured = {}

        def fake_call(messages, **kwargs):
            captured["messages"] = messages
            return '{"summary":"Энергия стабильна.","suggestions":["Как восстановиться?"]}'

        with mock.patch.object(llm, "_call", side_effect=fake_call):
            note = llm.today_note(
                None, {"age": 41, "male": True}, mode="male", usage=[]
            )

        prompt = " ".join(item["content"] for item in captured["messages"]).lower()
        self.assertIn("мужской профиль", prompt)
        self.assertIn("любые сведения о менструальном цикле запрещены", prompt)
        self.assertEqual(note["summary"], "Энергия стабильна.")

    def test_male_training_prompts_exclude_cycle_personalization(self):
        captured = []

        def fake_call(messages, **kwargs):
            captured.append(" ".join(item["content"] for item in messages).lower())
            if "строго json" in captured[-1]:
                return json.dumps({
                    "level": "Умеренная",
                    "duration": "30 минут",
                    "summary": "Сегодня подойдёт ходьба.",
                    "why": "Нагрузка соответствует восстановлению.",
                    "options": [],
                    "avoid": "Острая боль.",
                    "recovery": "Сон и вода.",
                }, ensure_ascii=False)
            return (
                "Разбор: Нагрузка соответствует восстановлению.\n"
                "Что добавить: Мобильность.\n"
                "Следующая нагрузка: Спокойная ходьба."
            )

        with mock.patch.object(llm, "_call", side_effect=fake_call):
            llm.training_today(
                None, {"age": 41, "male": True}, mode="male", usage=[]
            )
            llm.training_review(
                {"type": "Силовая", "items": [], "duration": "40 минут"},
                mode="male", profile={"age": 41, "male": True}, usage=[],
            )

        self.assertEqual(len(captured), 2)
        for prompt in captured:
            self.assertIn("мужск", prompt)
            self.assertIn("женская физиология запрещена", prompt)

    def test_male_meal_replacement_never_invents_follicular_context(self):
        captured = {}

        def fake_call(messages, **kwargs):
            captured["prompt"] = " ".join(
                item["content"] for item in messages
            ).lower()
            return '{"dish":"Омлет с овощами","time":"08:00","kcal":"420 ккал"}'

        with mock.patch.object(llm, "_call", side_effect=fake_call):
            meal = llm.replace_meal(
                None, 0, "каша", {"age": 41, "male": True},
                (2200, 130, 70, 250), [], "male",
            )

        self.assertEqual(meal["dish"], "Омлет с овощами")
        self.assertIn("мужской профиль", captured["prompt"])
        self.assertNotIn("фолликуляр", captured["prompt"])
        self.assertNotIn("день  цикла", captured["prompt"])

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

    def test_mascot_has_an_unclipped_layout_contract(self):
        css = V163_CSS.read_text(encoding="utf-8")

        self.assertIn("grid-template-columns: 52px minmax(0, 1fr)", css)
        self.assertIn("height: 58px", css)
        self.assertIn(".aiwa-nav-mascot .aiwa-sequence img", css)
        self.assertIn("object-fit: contain", css)
        self.assertIn("transform: none", css)

    def test_webapp_uses_prefetched_diary_for_recent_days(self):
        bundle = BUNDLE.read_text(encoding="utf-8")

        self.assertIn(
            "const ii = selectedDayRevision ? null : l.diary.recent?.[Kt]",
            bundle,
        )
        self.assertIn("S(ii);", bundle)

    def test_webapp_uses_server_moscow_day_instead_of_utc_day(self):
        bundle = BUNDLE.read_text(encoding="utf-8")
        index = INDEX.read_text(encoding="utf-8")

        self.assertIn("const aiwaTodayIso", bundle)
        self.assertIn("Europe/Moscow", bundle)
        self.assertNotIn("toISOString().slice(0, 10)", bundle)
        self.assertIn("applyCanonicalToday()", index)
        self.assertIn("installDayRollover()", index)
        self.assertIn('moscowDateIso()!==D.today', index)

    def test_telegram_gets_a_fresh_bundle_and_diary_cache_revalidates(self):
        bundle = BUNDLE.read_text(encoding="utf-8")
        wrapper = WRAPPER.read_text(encoding="utf-8")
        chart_bundle = CHART_BUNDLE.read_text(encoding="utf-8")
        index = INDEX.read_text(encoding="utf-8")

        self.assertIn('deslop-main-aiwa-v177.js', wrapper)
        self.assertIn('AiwaWebUiChart-aiwa-v177.js', bundle)
        self.assertIn('deslop-main-aiwa-v177.js', chart_bundle)
        self.assertIn('main.js?v=r26', index)
        self.assertIn(
            'import "./deslop-main-aiwa-v177.js?v=r26";',
            wrapper,
        )
        self.assertIn(
            'import("./AiwaWebUiChart-aiwa-v177.js?v=r26")',
            bundle,
        )
        self.assertIn(
            'from "./deslop-main-aiwa-v177.js?v=r26";',
            chart_bundle,
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

    def test_aiwa_art_stays_aligned_with_the_tab_bar(self):
        css = V163_CSS.read_text(encoding="utf-8")
        index = INDEX.read_text(encoding="utf-8")

        self.assertIn("aiwa-v163.css", index)
        self.assertIn(".aiwa-insight-content .aiwa-paper-ai-heading .aiwa-sequence", css)
        self.assertIn("overflow: visible", css)
        # Маскот обязан считать низ от той же --bottom-clearance, что и таб-бар.
        # Собственный env(safe-area-inset-bottom) поднимал его над баром на
        # устройствах с home indicator: apple/material-правила бара перебивают
        # базовый padding-bottom: env(...) шорткатом padding, то есть сам бар
        # safe-area не учитывает.
        self.assertIn("bottom: calc(var(--bottom-clearance, 21px) - 3.5px)", css)
        self.assertIn("bottom: calc(var(--bottom-clearance, 16px) - 3.5px)", css)
        self.assertNotIn("+ env(safe-area-inset-bottom", css)

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
