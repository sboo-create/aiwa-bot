import asyncio
import json
import os
import tempfile
import types
import re
import unittest
from datetime import timedelta
from pathlib import Path
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot
import llm

def _deslop_bundle(directory):
    """Имя чанка версионируется при сборке — резолвим по маске, не по строке."""
    matches = sorted(directory.glob("deslop-main-*.js"))
    assert len(matches) == 1, f"ожидался один deslop-main-*.js: {matches}"
    return matches[0]


def _deslop_chart(directory):
    matches = sorted(directory.glob("AiwaWebUiChart-*.js"))
    assert len(matches) == 1, f"ожидался один AiwaWebUiChart-*.js: {matches}"
    return matches[0]




ROOT = Path(__file__).resolve().parents[1]
BUNDLE = _deslop_bundle(ROOT / "webapp2" / "assets" / "deslop")
WRAPPER = ROOT / "webapp2" / "assets" / "deslop" / "main.js"
CHART_BUNDLE = _deslop_chart(ROOT / "webapp2" / "assets" / "deslop")
# Правки поверх примитивов deslop живут в исходниках и попадают в сборку.
# Раньше это был статический webapp2/assets/deslop/aiwa-v163.css, который
# подключался после main.css и молча перебивал всё, что правили в src.
OVERRIDES_CSS = ROOT / "frontend" / "src" / "aiwa" / "styles" / "overrides.css"
INDEX = ROOT / "webapp2" / "index.html"
PROFILE_PANEL = ROOT / "frontend" / "src" / "aiwa" / "panels" / "ProfilePanel.jsx"
DATES_SOURCE = ROOT / "frontend" / "src" / "aiwa" / "lib" / "dates.js"
PROFILE_AVATAR = ROOT / "frontend" / "src" / "aiwa" / "components" / "ProfileAvatar.jsx"
SCREEN_DAY_HEADER = ROOT / "frontend" / "src" / "aiwa" / "components" / "ScreenDayHeader.jsx"
FOOD_SCREEN = ROOT / "frontend" / "src" / "aiwa" / "screens" / "FoodScreen.jsx"
ACTIVITY_SCREEN = ROOT / "frontend" / "src" / "aiwa" / "screens" / "ActivityScreen.jsx"


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
        profile_panel = PROFILE_PANEL.read_text(encoding="utf-8")

        self.assertNotIn('filter((f) => f.id !== "today")', bundle)
        # поле длины цикла есть, но показывается только в цикличном режиме
        self.assertIn('"Длина цикла"', bundle)
        self.assertIn('const isCycleMode = currentMode === "cycle";', profile_panel)
        self.assertIn('const isMaleMode = currentMode === "male";', profile_panel)
        self.assertIn('{isCycleMode ? (', profile_panel)
        self.assertIn("cycle_len", bundle)
        self.assertNotIn("мужской режим: без главной", index)
        self.assertIn(
            'title={isMaleMode ? "Выписка по самочувствию" : "Выписка для врача"}',
            profile_panel,
        )
        self.assertIn(
            'description={isCycleMode ? "рост · вес · возраст · цикл" : "рост · вес · возраст"}',
            profile_panel,
        )
        self.assertIn(
            '? "Динамика энергии и дневник самочувствия придут PDF-файлом в чат бота."',
            profile_panel,
        )
        self.assertIn(
            '"Динамика энергии и дневник самочувствия придут PDF-файлом в чат бота."',
            bundle,
        )

    def test_mascot_has_an_unclipped_layout_contract(self):
        css = OVERRIDES_CSS.read_text(encoding="utf-8")

        self.assertIn("grid-template-columns: 52px minmax(0, 1fr)", css)
        self.assertIn("height: 58px", css)
        self.assertIn(".aiwa-nav-mascot .aiwa-sequence img", css)
        self.assertIn("object-fit: contain", css)
        self.assertIn("transform: none", css)

    def test_webapp_uses_prefetched_diary_for_recent_days(self):
        bundle = BUNDLE.read_text(encoding="utf-8")

        self.assertIn("/api/diary", bundle)
        self.assertIn('"/api/diary"', bundle)

    def test_webapp_uses_server_moscow_day_instead_of_utc_day(self):
        bundle = BUNDLE.read_text(encoding="utf-8")
        index = INDEX.read_text(encoding="utf-8")
        dates_source = DATES_SOURCE.read_text(encoding="utf-8")

        self.assertIn("Europe/Moscow", bundle)
        self.assertIn('timeZone: "Europe/Moscow"', dates_source)
        self.assertIn(".formatToParts(new Date())", dates_source)
        self.assertNotIn("toISOString().slice(0, 10)", dates_source)
        self.assertIn("applyCanonicalToday()", index)
        self.assertIn("installDayRollover()", index)
        self.assertIn('moscowDateIso()!==D.today', index)

    def test_telegram_gets_a_fresh_bundle_and_diary_cache_revalidates(self):
        bundle = BUNDLE.read_text(encoding="utf-8")
        wrapper = WRAPPER.read_text(encoding="utf-8")
        chart_bundle = CHART_BUNDLE.read_text(encoding="utf-8")
        index = INDEX.read_text(encoding="utf-8")

        self.assertIn('deslop-main-', wrapper)
        self.assertIn('AiwaWebUiChart-', bundle)
        self.assertIn('deslop-main-', chart_bundle)
        self.assertIn('main.js?v=r', index)
        self.assertIn(
            'import "./deslop-main-',
            wrapper,
        )
        self.assertIn(
            'import("./AiwaWebUiChart-',
            bundle,
        )
        self.assertIn(
            'from "./deslop-main-',
            chart_bundle,
        )
        self.assertIn("maxAgeMs", bundle)
        self.assertIn("maxAgeMs", bundle)
        self.assertIn("maxAgeMs", bundle)

    def test_aiwa_mascot_uses_one_fully_decoded_frame_in_every_surface(self):
        bundle = BUNDLE.read_text(encoding="utf-8")
        # компонент талисмана: берём окрестность его data-атрибута (имена функций
        # минифицированы и меняются от сборки к сборке)
        anchor = bundle.index('"data-aiwa-sequence": "true"')
        component = bundle[anchor - 700:anchor + 700]

        self.assertNotIn("setInterval", component)
        self.assertNotIn("setTimeout", component)
        self.assertIn('"data-frame": 0', component)
        self.assertIn("[0], alt:", component)
        self.assertIn('decoding: "sync"', component)

    def test_aiwa_art_stays_inside_telegram_safe_area(self):
        css = OVERRIDES_CSS.read_text(encoding="utf-8")
        index = INDEX.read_text(encoding="utf-8")

        self.assertNotIn("aiwa-v163.css", index)
        self.assertIn(".aiwa-insight-content .aiwa-paper-ai-heading .aiwa-sequence", css)
        self.assertIn("overflow: visible", css)
        # Маскот НЕ добавляет свой env(): бар safe-area не учитывает, потому что
        # apple/material-правила перебивают базовый padding-bottom шорткатом
        # padding. Лишний терм поднимал маскота над баром на устройствах с
        # home indicator. Он центруется по бару смещением -3.5px.
        # Комментарии вырезаем: механизм в них разбирается словами.
        declarations = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
        self.assertNotIn("env(safe-area-inset-bottom", declarations)
        self.assertIn("var(--bottom-clearance, 21px) - 3.5px", declarations)

    def test_food_and_training_use_telegram_photo_avatar(self):
        bundle = BUNDLE.read_text(encoding="utf-8")
        profile_avatar = PROFILE_AVATAR.read_text(encoding="utf-8")
        screen_day_header = SCREEN_DAY_HEADER.read_text(encoding="utf-8")
        food_screen = FOOD_SCREEN.read_text(encoding="utf-8")
        activity_screen = ACTIVITY_SCREEN.read_text(encoding="utf-8")

        # общий ProfileAvatar на «Питании» и «Нагрузке»: инициал + фото Telegram
        self.assertGreaterEqual(bundle.count('className: "aiwa-avatar-photo"'), 1)
        self.assertIn("tgUser?.photo_url", profile_avatar)
        self.assertIn('className="aiwa-avatar-photo"', profile_avatar)
        self.assertIn("<ProfileAvatar />", screen_day_header)
        self.assertIn("<ScreenDayHeader", food_screen)
        self.assertIn("<ScreenDayHeader", activity_screen)
