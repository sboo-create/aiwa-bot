import asyncio
from datetime import date
import inspect
import json
import mimetypes
import os
import subprocess
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot
import llm
from aiohttp.test_utils import TestClient, TestServer


class _JobQueue:
    def __init__(self):
        self.daily = []

    def get_jobs_by_name(self, _name):
        return []

    def run_daily(self, callback, **kwargs):
        self.daily.append((callback, kwargs))

class _JsonRequest:
    def __init__(self, body):
        self.body = body

    async def json(self):
        return self.body


class PostReleaseSystemicTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        bot.DB = os.path.join(self.tmp.name, "post-release.db")
        self.cid = 94001
        bot._activate_user(self.cid)
        bot.upsert(self.cid, mode="male", height=180, weight=80, age=35)

    def tearDown(self):
        bot.DB = self.old_db
        self.tmp.cleanup()

    def test_followup_protocol_variants_never_leak(self):
        cases = [
            "Ответ.\nСЛЕДУЮЩИЕ: Что дальше? ;; Нужна помощь?",
            "Ответ.\n**Следующие:** Что дальше? ;; Нужна помощь?",
            "Ответ. Suggestions: What next? ;; More detail?",
            "Ответ.\n### FOLLOW-UPS — Что дальше? ;; Подробнее?",
        ]
        for value in cases:
            clean, suggestions = llm.split_followups(value)
            self.assertEqual(clean, "Ответ.")
            self.assertEqual(len(suggestions), 2)

    def test_final_delivery_guard_strips_internal_suggestions(self):
        visible = bot.guard_aiwa_reply(
            self.cid,
            "Нормальный ответ.\n**Следующие:** Что дальше? ;; Подробнее?",
        )
        self.assertEqual(visible, "Нормальный ответ.")

    def test_complaint_is_not_routed_to_static_about_fallback(self):
        self.assertIsNone(bot.match_meta("Зачем ты отправляешь заглушку?"))
        self.assertEqual(bot.match_meta("Что ты умеешь?"), "about")

    def test_drink_content_overrides_wrong_model_class(self):
        record = bot.normalize_food(
            {
                "title": "Кедровый кофе",
                "fclass": "углеводное",
                "items": [
                    {
                        "name": "Кедровый кофе",
                        "grams": 400,
                        "kcal": 180,
                        "protein": 4,
                        "fat": 10,
                        "carbs": 18,
                    }
                ],
            },
            "text",
        )
        self.assertEqual(record["fclass"], "напиток")
        self.assertEqual(
            llm.food_class_norm(
                "смешанное", 8, 15, 70, "Чай с сахаром, ватрушка",
            ),
            "смешанное",
        )

    def test_existing_wrong_drink_class_is_repaired_on_read(self):
        bot.meal_add(
            self.cid,
            {
                "title": "Кедровый кофе",
                "fclass": "углеводное",
                "items": [{"name": "Кедровый кофе"}],
                "kcal": 180,
                "protein": 4,
                "fat": 10,
                "carbs": 18,
                "source": "text",
                "slot": "snack",
            },
        )
        self.assertEqual(bot.meals_of(self.cid)[0]["fclass"], "напиток")

    def test_empty_generic_food_label_cannot_mutate_diary(self):
        empty_snack = bot.normalize_food(
            {
                "title": "Снек",
                "total": {"kcal": 0, "protein": 0, "fat": 0, "carbs": 0},
                "items": [],
            },
            "text",
        )
        self.assertIsNotNone(empty_snack)
        self.assertFalse(bot.food_record_admissible(empty_snack))
        self.assertTrue(bot.food_record_admissible(
            bot.normalize_food({"title": "Стакан воды", "items": []}, "text")
        ))

    def test_food_receipt_contains_short_deterministic_analysis(self):
        result = bot._food_action_success(
            {
                "slot": "breakfast",
                "title": "Творог",
                "items": [],
                "grams": 200,
                "kcal": 240,
                "protein": 32,
                "fat": 10,
                "carbs": 6,
                "fclass": "молочное",
                "slot_guessed": False,
                "unparsed": [],
            },
            12,
            bot.dtoday(),
        )
        self.assertIn("Короткий разбор:", result["text"])
        self.assertIn("вклад в белок", result["text"])

    def test_voice_reply_is_opt_in(self):
        with mock.patch.dict(os.environ, {"AIWA_VOICE_REPLY": "0"}):
            self.assertFalse(bot._voice_reply_on())
        with mock.patch.dict(os.environ, {"AIWA_VOICE_REPLY": "1"}):
            self.assertTrue(bot._voice_reply_on())

    def test_disabling_summary_removes_both_jobs(self):
        queue = _JobQueue()
        app = SimpleNamespace(job_queue=queue)
        bot.upsert(self.cid, daily_summary_enabled=0)
        bot.schedule_daily(app, self.cid, "08:00")
        self.assertEqual(queue.daily, [])

        bot.upsert(self.cid, daily_summary_enabled=1)
        bot.schedule_daily(app, self.cid, "08:00")
        self.assertEqual(len(queue.daily), 2)
        self.assertEqual(
            {entry[1]["name"] for entry in queue.daily},
            {str(self.cid), f"prepare:{self.cid}"},
        )

    def test_explicit_time_change_reenables_summary_delivery(self):
        queue = _JobQueue()
        app = SimpleNamespace(job_queue=queue)
        bot.upsert(self.cid, daily_summary_enabled=0)

        bot.set_daily_time(app, self.cid, "09:30")

        user = bot.row(self.cid)
        self.assertTrue(user["daily_summary_enabled"])
        self.assertEqual(user["send_time"], "09:30")
        self.assertEqual(len(queue.daily), 2)

    def test_summary_notification_api_is_separate_from_proactive(self):
        app = SimpleNamespace(job_queue=_JobQueue())
        bot.upsert(self.cid, proactive_enabled=1, daily_summary_enabled=1)
        with (
            mock.patch.object(bot, "_verify_init", return_value=self.cid),
            mock.patch.object(bot, "BOT_APP", app),
            mock.patch.object(bot, "ev"),
        ):
            response = asyncio.run(
                bot._api_daily_summary(_JsonRequest({"enabled": False}))
            )
        self.assertEqual(response.status, 200)
        self.assertFalse(json.loads(response.text)["daily_summary_enabled"])
        user = bot.row(self.cid)
        self.assertFalse(user["daily_summary_enabled"])
        self.assertTrue(user["proactive_enabled"])

    def test_current_ui_exposes_summary_toggle_and_pilates_type(self):
        root = Path(__file__).resolve().parents[1]
        bundle = (
            root / "webapp2/assets/deslop/deslop-main-aiwa-v177.js"
        ).read_text(encoding="utf-8")
        self.assertIn('qt("/api/daily-summary", { enabled: A })', bundle)
        self.assertIn('"Силовая", "Кардио", "Пилатес", "Йога"', bundle)
        self.assertIn('["пилатес", "Пилатес"]', bundle)
        self.assertTrue(any(
            button.callback_data == "more"
            for row in bot.MENU_KB.inline_keyboard
            for button in row
        ))

    def test_cx_food_history_and_report_feedback_are_durable(self):
        root = Path(__file__).resolve().parents[1]
        bundle = (
            root / "webapp2/assets/deslop/deslop-main-aiwa-v177.js"
        ).read_text(encoding="utf-8")
        fallback = (root / "webapp2/index.html").read_text(encoding="utf-8")
        self.assertNotIn("aiwa.food.selectedDate", bundle)
        self.assertIn("selectedDayRequest.current === rt", bundle)
        self.assertIn("[v, !!l.diary, selectedDayRevision]", bundle)
        self.assertIn(
            "selectedDayRevision ? null : l.diary.recent?.[Kt]",
            bundle,
        )
        self.assertIn("setSelectedDayRevision((rt) => rt + 1)", bundle)
        self.assertIn("selectedDayRef = E.useRef(v)", bundle)
        self.assertIn("selectedAtRequest === selectedDayRef.current", bundle)
        self.assertIn('r("diary", { ...l.diary, ...Kt })', bundle)
        self.assertIn(
            "diary: wt ? T || { meals: [], totals: {}, target: st } : Z",
            bundle,
        )
        self.assertIn("canAdd: !wt", bundle)
        self.assertIn('title: "Выписка готова"', bundle)
        self.assertIn("a.showPopup({", bundle)
        self.assertNotIn(
            'Ot("PDF отправлен — открываю чат", { type: "success" })',
            bundle,
        )
        self.assertIn("function reportDelivered()", fallback)
        self.assertIn("typeof tg.showPopup==='function'", fallback)
        self.assertNotIn("},650)", fallback)

    def test_streak_proactive_milestone_is_lifetime_once(self):
        candidate = {"key": "streak_3", "score": 56, "once": True}
        self.assertFalse(bot._pa_suppressed(self.cid, candidate))
        self.assertTrue(bot._pa_mark(self.cid, candidate["key"]))
        self.assertTrue(bot._pa_suppressed(self.cid, candidate))

        recurring = {"key": "low_energy", "score": 70, "cooldown": 3}
        with mock.patch.object(bot, "_pa_recent", return_value=True) as recent:
            self.assertTrue(bot._pa_suppressed(self.cid, recurring))
        recent.assert_called_once_with(self.cid, "low_energy", 3)

    def test_shadow_run_does_not_consume_lifetime_milestone(self):
        source = inspect.getsource(bot._proactive_pick_and_send)
        self.assertIn('if not best.get("once"):', source)
        self.assertLess(
            source.index('if not best.get("once"):'),
            source.index('_pa_mark(cid, best["key"])'),
        )
        self.assertTrue(bot._pa_logrow(
            self.cid, "streak_3", 56, 0, "shadow",
        ))
        self.assertTrue(bot._pa_logged_today(self.cid))

    def test_decimal_amount_is_not_mistaken_for_a_date(self):
        with mock.patch.object(bot, "dtoday", return_value=date(2026, 7, 29)):
            event_date, error = bot.chat_event_date(
                "Я выпил пол бутылки кока-колы сейчас. 0.35"
            )
        self.assertEqual(event_date, date(2026, 7, 29))
        self.assertIsNone(error)

    def test_current_date_is_deterministic_moscow_product_answer(self):
        self.assertEqual(bot.match_intent("Ну, какая сегодня дата?"), "current_date")
        with mock.patch.object(bot, "dtoday", return_value=date(2026, 7, 29)):
            answer = bot.current_date_text()
        self.assertIn("29 июля 2026", answer)
        self.assertIn("среда", answer)
        self.assertIn("московское время", answer)

    def test_current_date_does_not_shadow_a_journal_write(self):
        self.assertEqual(
            bot.match_intent("Какое сегодня число, запиши тренировку"),
            "logworkout",
        )
        self.assertNotEqual(
            bot.match_intent("Какая сегодня дата, я съел творог"),
            "current_date",
        )

    def test_completed_drink_with_popil_is_journal_candidate(self):
        text = "В 2 часа я попил сладкой воды 200 миллилитров"
        self.assertTrue(bot._JOURNAL_FOOD_COMPLETED_RE.search(text))
        self.assertTrue(bot._semantic_journal_candidate(text, enable_v2=True))
        self.assertNotIn("попил", bot.extract_food_log_text(text).casefold())

    def test_male_general_prompt_forbids_cycle_hallucinations(self):
        captured = {}

        def fake_call(messages, **_kwargs):
            captured["messages"] = messages
            return "🥤 Короткий ответ по вопросу."

        with mock.patch.object(llm, "_call", side_effect=fake_call):
            llm.general_answer(
                {"age": 40, "gender": "male"},
                "male",
                "Почему хочется пить?",
            )
        prompt = "\n".join(
            message["content"] for message in captured["messages"]
        ).casefold()
        self.assertIn("профиль мужчины", prompt)
        self.assertIn("никогда не интерпретируй отсутствие менструаций как аменорею", prompt)
        self.assertIn("не добавляй женскую репродуктивную физиологию", prompt)

    def test_diary_deep_link_selects_food_tab(self):
        with (
            mock.patch.object(bot, "AIWA_WEBAPP_URL", "https://example.test/app"),
            mock.patch.object(bot, "redesign_on", return_value=True),
        ):
            url = bot.campaign_webapp_url(
                {"chat_id": self.cid},
                campaign="receipt:test",
                tab="food",
            )
        self.assertIn("tab=food", url)
        self.assertIn("campaign=receipt:test", url)

    def test_unknown_food_does_not_fuzzy_match_an_unrelated_dish(self):
        root = Path(__file__).resolve().parents[1]
        bundle = (
            root / "webapp2/assets/deslop/deslop-main-aiwa-v177.js"
        ).read_text(encoding="utf-8")
        self.assertNotIn("return h >= 0.5 ? c + Xf : null", bundle)
        self.assertIn("if (zd(y) === l) return p + Xf", bundle)

    def test_nested_immutable_asset_has_matching_cache_version(self):
        root = Path(__file__).resolve().parents[1]
        index = (root / "webapp2/index.html").read_text(encoding="utf-8")
        entry = (
            root / "webapp2/assets/deslop/main.js"
        ).read_text(encoding="utf-8")
        bundle = (
            root / "webapp2/assets/deslop/deslop-main-aiwa-v177.js"
        ).read_text(encoding="utf-8")
        self.assertIn("main.js?v=r25", index)
        self.assertIn('import "./deslop-main-aiwa-v177.js?v=r25";', entry)
        self.assertIn(
            'import("./AiwaWebUiChart-aiwa-v177.js?v=r25")',
            bundle,
        )
        chart_bundle = (
            root / "webapp2/assets/deslop/AiwaWebUiChart-aiwa-v177.js"
        ).read_text(encoding="utf-8")
        self.assertIn(
            'from "./deslop-main-aiwa-v177.js?v=r25";',
            chart_bundle,
        )

    def test_i167_assets_use_isolated_atomic_public_release(self):
        root = Path(__file__).resolve().parents[1]
        caddy = (
            root / "deploy/i167/aiwa-staging.caddy"
        ).read_text(encoding="utf-8")

        self.assertIn("handle /assets/*", caddy)
        self.assertIn("root * /srv/aiwa-staging/public-current", caddy)
        self.assertIn("file_server", caddy)
        self.assertNotIn("root * /srv/aiwa-staging/current", caddy)
        self.assertEqual(mimetypes.guess_type("catalog.webp")[0], "image/webp")

    def test_security_headers_never_relabel_synthesized_webp_responses(self):
        request = SimpleNamespace(
            path="/assets/food/catalog-v2/example.webp",
            headers={},
        )

        async def handler(_request):
            return bot.web.Response(
                body=b"webp",
                content_type="application/octet-stream",
            )

        response = asyncio.run(bot._security_headers(request, handler))

        self.assertEqual(response.content_type, "application/octet-stream")
        self.assertEqual(response.headers["X-Content-Type-Options"], "nosniff")

        async def explicit_handler(_request):
            return bot.web.Response(body=b"text", content_type="text/plain")

        explicit = asyncio.run(bot._security_headers(request, explicit_handler))
        self.assertEqual(explicit.content_type, "text/plain")

        async def missing_handler(_request):
            return bot.web.Response(
                status=404,
                body=b"not found",
                content_type="application/octet-stream",
            )

        missing = asyncio.run(bot._security_headers(request, missing_handler))
        self.assertEqual(missing.status, 404)
        self.assertEqual(missing.content_type, "application/octet-stream")

        generated_request = SimpleNamespace(
            path="/generated-food/example.webp",
            headers={},
        )
        generated = asyncio.run(
            bot._security_headers(generated_request, handler)
        )
        self.assertEqual(generated.content_type, "application/octet-stream")

        unrelated_asset_request = SimpleNamespace(
            path="/assets/deslop/example.webp",
            headers={},
        )
        unrelated = asyncio.run(
            bot._security_headers(unrelated_asset_request, handler)
        )
        self.assertEqual(unrelated.content_type, "application/octet-stream")

    def test_security_headers_repair_only_real_reviewed_catalog_files(self):
        root = Path(__file__).resolve().parents[1]
        reviewed = (
            root
            / "webapp2/assets/food/catalog-v2"
            / "445a7df943bbd2442c7f5d72d01c9461816376395ae7b345d36e901e4d9a4401.webp"
        )
        request = SimpleNamespace(
            path=f"/assets/food/catalog-v2/{reviewed.name}",
            headers={},
        )

        async def reviewed_handler(_request):
            response = bot.web.FileResponse(reviewed)
            response.content_type = "application/octet-stream"
            return response

        response = asyncio.run(bot._security_headers(request, reviewed_handler))
        self.assertEqual(response.content_type, "image/webp")

        async def outside_handler(_request):
            response = bot.web.FileResponse(root / "README.md")
            response.content_type = "application/octet-stream"
            return response

        outside = asyncio.run(bot._security_headers(request, outside_handler))
        self.assertEqual(outside.content_type, "application/octet-stream")

    def test_public_asset_activation_is_atomic_idempotent_and_additive(self):
        root = Path(__file__).resolve().parents[1]
        script = root / "deploy/i167/activate-public-assets.sh"
        first_sha = "1" * 40
        second_sha = "2" * 40
        env = {
            **os.environ,
            "AIWA_PUBLIC_ASSET_TEST_ROOT": self.tmp.name,
        }

        def release(sha, *, include_old=True):
            assets = (
                Path(self.tmp.name) / "releases" / sha / "webapp2" / "assets"
            )
            for kind in ("food", "train"):
                catalog = assets / kind / "catalog-v2"
                catalog.mkdir(parents=True)
                manifest = {}
                if include_old:
                    image = catalog / f"{kind}-old.webp"
                    image.write_bytes(b"old")
                    manifest[f"{kind} old"] = (
                        f"/assets/{kind}/catalog-v2/{kind}-old.webp"
                    )
                (assets / kind / "manifest.json").write_text(
                    json.dumps(manifest or {f"{kind} new": (
                        f"/assets/{kind}/catalog-v2/{kind}-new.webp"
                    )}),
                    encoding="utf-8",
                )
                if not include_old:
                    (catalog / f"{kind}-new.webp").write_bytes(b"new")

        release(first_sha)
        partial = Path(self.tmp.name) / "public-releases" / first_sha
        partial.mkdir(parents=True)
        (partial / "partial").write_text("interrupted", encoding="utf-8")

        first = subprocess.run(
            [str(script), first_sha],
            env=env,
            capture_output=True,
            text=True,
        )
        self.assertEqual(first.returncode, 0, first.stdout + first.stderr)
        current = Path(self.tmp.name) / "public-current"
        self.assertEqual(current.resolve(), partial.resolve())
        self.assertTrue((partial / ".activation-complete").is_file())
        self.assertIn("quarantined incomplete", first.stderr)

        subprocess.run(
            [str(script), first_sha],
            env=env,
            check=True,
            capture_output=True,
            text=True,
        )
        self.assertEqual(current.resolve(), partial.resolve())

        release(second_sha, include_old=False)
        failed = subprocess.run(
            [str(script), second_sha],
            env=env,
            capture_output=True,
            text=True,
        )
        self.assertNotEqual(failed.returncode, 0)
        self.assertIn("previously published asset disappeared", failed.stderr)
        self.assertEqual(current.resolve(), partial.resolve())

        symlink_sha = "3" * 40
        release(symlink_sha)
        outside = Path(self.tmp.name) / "outside"
        outside.mkdir()
        symlink_target = (
            Path(self.tmp.name) / "public-releases" / symlink_sha
        )
        symlink_target.symlink_to(outside, target_is_directory=True)
        refused = subprocess.run(
            [str(script), symlink_sha],
            env=env,
            capture_output=True,
            text=True,
        )
        self.assertNotEqual(refused.returncode, 0)
        self.assertIn("immutable-release symlink", refused.stderr)
        self.assertTrue(symlink_target.is_symlink())
        self.assertEqual(current.resolve(), partial.resolve())

        traversal_sha = "5" * 40
        release(traversal_sha)
        traversal_manifest = (
            Path(self.tmp.name)
            / "releases"
            / traversal_sha
            / "webapp2"
            / "assets"
            / "food"
            / "manifest.json"
        )
        traversal_manifest.write_text(
            json.dumps({
                "escape": "/assets/food/../../../../../../etc/passwd",
            }),
            encoding="utf-8",
        )
        traversal = subprocess.run(
            [str(script), traversal_sha],
            env=env,
            capture_output=True,
            text=True,
        )
        self.assertNotEqual(traversal.returncode, 0)
        self.assertIn("unsafe asset URL", traversal.stderr)
        self.assertEqual(current.resolve(), partial.resolve())

        lock_dir = Path(self.tmp.name) / ".public-assets-activation.lock"
        lock_dir.mkdir()
        locked = subprocess.run(
            [str(script), "4" * 40],
            env=env,
            capture_output=True,
            text=True,
        )
        self.assertNotEqual(locked.returncode, 0)
        self.assertIn("activation already in progress", locked.stderr)
        self.assertTrue(lock_dir.is_dir())
        self.assertEqual(current.resolve(), partial.resolve())

    def test_aiwa_upstream_serves_static_manifest_for_i167_proxy(self):
        async def fetch_manifest():
            client = TestClient(TestServer(bot.build_web()))
            await client.start_server()
            try:
                response = await client.get("/assets/food/manifest.json")
                manifest = await response.json()
                image = await client.get(
                    "/assets/food/catalog-v2/"
                    "445a7df943bbd2442c7f5d72d01c9461816376395ae7b345d36e901e4d9a4401.webp"
                )
                await image.read()
                return (
                    response.status,
                    response.content_type,
                    manifest,
                    image.status,
                    image.content_type,
                )
            finally:
                await client.close()

        status, content_type, manifest, image_status, image_type = asyncio.run(
            fetch_manifest()
        )

        self.assertEqual(status, 200)
        self.assertEqual(content_type, "application/json")
        self.assertEqual(len(manifest), 612)
        self.assertTrue(any("/catalog-v2/" in url for url in manifest.values()))
        self.assertEqual(image_status, 200)
        self.assertEqual(image_type, "image/webp")


if __name__ == "__main__":
    unittest.main()
