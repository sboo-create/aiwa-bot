import asyncio
import os
import tempfile
import unittest
from datetime import timedelta
from types import SimpleNamespace
from unittest import mock


os.environ.setdefault("BOT_TOKEN", "123456:test-token")
os.environ.setdefault("AIWA_ANALYTICS_SALT", "test-analytics-salt")

import aiwa_bot as bot


VOICE = (
    "Я съела бутерброд с острочистелой красной рыбой, чуть-чуть голубики, "
    "горсочку ладонь прям. Ещё я съела припешку с сыром и зеленью и скусила "
    "половину. И ещё я съела куриный наггетс. Один. Домашний."
)

PARSED_VOICE = {
    "title": "Бутерброд, голубика и наггетс",
    "fclass": "смешанное",
    "items": [
        {"name": "Бутерброд с красной рыбой", "grams": 120, "kcal": 300,
         "protein": 15, "fat": 14, "carbs": 28},
        {"name": "Голубика", "grams": 40, "kcal": 23,
         "protein": 0.3, "fat": 0.1, "carbs": 5},
        {"name": "Куриный наггетс", "grams": 30, "kcal": 90,
         "protein": 5, "fat": 5, "carbs": 5},
    ],
    "unparsed": ["припешку с сыром и зеленью"],
}

PARSED_FLATBREAD = {
    "title": "Лепёшка с сыром и зеленью",
    "fclass": "смешанное",
    "items": [
        {"name": "Лепёшка с сыром и зеленью, половина", "grams": 90, "kcal": 240,
         "protein": 9, "fat": 11, "carbs": 26},
    ],
    "unparsed": [],
}


def route(action, evidence, **extra):
    payload = {
        "action": action,
        "target_id": None,
        "slot": "",
        "evidence_span": evidence,
        "subject": "self",
        "status": "completed",
        "polarity": "positive",
        "certainty": "certain",
        "primary_purpose": "journal",
        "confidence": 0.98,
        "food_text": "",
        "workout": {},
    }
    payload.update(extra)
    return payload


class SoniaJournalV2Tests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.old_db = bot.DB
        self.old_v2 = os.environ.get("AIWA_JOURNAL_V2")
        os.environ["AIWA_JOURNAL_V2"] = "1"
        bot.DB = os.path.join(self.tmp.name, "sonia-v2.db")
        self.cid = 7710
        bot._activate_user(self.cid)
        bot.upsert(
            self.cid,
            mode="cycle",
            cycle_len=28,
            last_period=(bot.dtoday() - timedelta(days=12)).isoformat(),
            height=168,
            weight=60,
            age=30,
            activity=2,
        )

    def tearDown(self):
        bot.DB = self.old_db
        if self.old_v2 is None:
            os.environ.pop("AIWA_JOURNAL_V2", None)
        else:
            os.environ["AIWA_JOURNAL_V2"] = self.old_v2
        self.tmp.cleanup()

    def _reply(self, text, request_id, classified, parsed=None):
        patches = [mock.patch.object(bot.L, "classify_journal_event", return_value=classified)]
        if parsed is not None:
            patches.append(mock.patch.object(bot.L, "analyze_food_text", return_value=parsed))
        with patches[0]:
            if len(patches) == 1:
                return asyncio.run(bot._chat_reply(
                    self.cid, bot.row(self.cid), text,
                    mutation_key=bot.chat_mutation_key("webchat", request_id),
                    require_mutation_key=True,
                ))
            with patches[1]:
                return asyncio.run(bot._chat_reply(
                    self.cid, bot.row(self.cid), text,
                    mutation_key=bot.chat_mutation_key("webchat", request_id),
                    require_mutation_key=True,
                ))

    def test_full_sonia_dialog_mutates_verified_record_without_guard_loop(self):
        first_route = route(
            "food",
            "Я съела бутерброд с острочистелой красной рыбой",
            food_text=VOICE,
            food_record=PARSED_VOICE,
        )
        with mock.patch.object(bot, "slot_for_now", return_value="lunch"):
            first = self._reply(VOICE, "sonia-1", first_route)

        self.assertEqual(first["mutation"]["kind"], "food")
        self.assertIn("Не разобрала", first["answer"])
        self.assertIn("припешку с сыром и зеленью", first["answer"])
        self.assertIn("определила по времени", first["answer"])
        saved = bot.meals_of(self.cid)
        self.assertEqual(len(saved), 1)
        self.assertEqual(len(saved[0]["items"]), 3)
        self.assertTrue(saved[0]["slot_guessed"])
        meal_id = saved[0]["id"]

        correction = "Это был мой завтрак а не обед"
        moved = self._reply(
            correction,
            "sonia-2",
            route(
                "move_meal_slot",
                correction,
                target_id=meal_id,
                slot="breakfast",
                primary_purpose="repair",
            ),
        )
        self.assertEqual(moved["mutation"]["kind"], "food_update")
        self.assertIn("Перенесла в завтрак", moved["answer"])
        self.assertNotIn("сервер не подтвердил", moved["answer"])
        self.assertEqual(bot.meal_get(self.cid, meal_id)["slot"], "breakfast")
        self.assertFalse(bot.meal_get(self.cid, meal_id)["slot_guessed"])

        complaint = "А ты не записал, что я съела лепешку с сыром и зеленью из вкусвилла?"
        appended = self._reply(
            complaint,
            "sonia-3",
            route(
                "append_meal_item",
                "я съела лепешку с сыром и зеленью из вкусвилла",
                target_id=meal_id,
                food_text="половина лепёшки с сыром и зеленью из ВкусВилла",
                food_record=PARSED_FLATBREAD,
                primary_purpose="repair",
            ),
        )
        self.assertEqual(appended["mutation"]["kind"], "food_update")
        self.assertIn("Добавила в завтрак", appended["answer"])
        self.assertNotIn("сервер не подтвердил", appended["answer"])
        final = bot.meal_get(self.cid, meal_id)
        self.assertEqual(len(final["items"]), 4)
        self.assertEqual(final["kcal"], 653)
        self.assertEqual(final["kcal"], sum(x["kcal"] for x in final["items"]))

        with mock.patch.object(bot.L, "classify_journal_event") as classify:
            replay = asyncio.run(bot._chat_reply(
                self.cid,
                bot.row(self.cid),
                complaint,
                mutation_key=bot.chat_mutation_key("webchat", "sonia-3"),
                require_mutation_key=True,
            ))
        classify.assert_not_called()
        self.assertIn("запрос уже применён", replay["answer"])
        self.assertEqual(len(bot.meal_get(self.cid, meal_id)["items"]), 4)

    def test_model_cannot_move_foreign_target_or_invent_evidence(self):
        rec = bot.normalize_food({
            "title": "Суп", "grams": 300, "kcal": 200,
            "protein": 8, "fat": 5, "carbs": 25,
        }, "text")
        meal_id = bot.meal_add(self.cid, rec)
        context = bot._journal_recent_context(self.cid)
        text = "Это был мой завтрак, а не обед"
        base = route(
            "move_meal_slot", text, target_id=meal_id, slot="breakfast",
            primary_purpose="repair",
        )
        self.assertEqual(
            bot._normalize_semantic_journal(base, text, context, enable_v2=True)["intent"],
            "movemealslot",
        )
        self.assertIsNone(bot._normalize_semantic_journal(
            dict(base, target_id=meal_id + 999), text, context, enable_v2=True,
        ))
        self.assertIsNone(bot._normalize_semantic_journal(
            dict(base, evidence_span="выдуманная цитата"), text, context, enable_v2=True,
        ))

    def test_ambiguous_repair_asks_for_target_instead_of_falling_into_chat(self):
        rec = bot.normalize_food({
            "title": "Каша", "grams": 250, "kcal": 230,
            "protein": 7, "fat": 5, "carbs": 40,
        }, "text")
        first_id = bot.meal_add(
            self.cid, dict(rec, slot="lunch", slot_guessed=True),
            mutation_key=bot.chat_mutation_key("test", "first"),
            args_hash=bot.chat_mutation_args_hash("food", "first"),
        )
        bot.meal_add(
            self.cid, dict(rec, title="Суп", slot="dinner", slot_guessed=True),
            mutation_key=bot.chat_mutation_key("test", "second"),
            args_hash=bot.chat_mutation_args_hash("food", "second"),
        )
        text = "Это был мой завтрак а не обед"
        classified = route(
            "move_meal_slot", text, target_id=first_id, slot="breakfast",
            primary_purpose="repair",
        )
        with mock.patch.object(
            bot.L, "classify_journal_event", return_value=classified,
        ):
            plan = asyncio.run(bot.resolve_semantic_journal_action(self.cid, text))
        self.assertEqual(plan["intent"], "clarifymeal")
        self.assertEqual(bot.meal_get(self.cid, first_id)["slot"], "lunch")

    def test_append_executor_does_not_duplicate_an_item_already_in_db(self):
        rec = bot.normalize_food({
            "title": "Голубика",
            "items": [{"name": "Голубика", "grams": 100, "kcal": 57,
                       "protein": 1, "fat": 0, "carbs": 14}],
        }, "text")
        rec.update(slot="breakfast", slot_guessed=False)
        meal_id = bot.meal_add(self.cid, rec)
        parsed = {
            "title": "голубика",
            "items": [{"name": "голубику", "grams": 100, "kcal": 57,
                       "protein": 1, "fat": 0, "carbs": 14}],
        }
        with mock.patch.object(bot.L, "analyze_food_text", return_value=parsed):
            result = asyncio.run(bot.append_meal_item_action(
                self.cid,
                bot.row(self.cid),
                meal_id,
                "голубику 100 г",
                mutation_key=bot.chat_mutation_key("telegram", "no-duplicate"),
            ))
        self.assertTrue(result["ok"])
        self.assertIn("уже есть", result["text"])
        self.assertEqual(len(bot.meal_get(self.cid, meal_id)["items"]), 1)

    def test_mixed_completed_and_planned_food_uses_only_completed_evidence(self):
        text = "Я съела творог, а вечером собираюсь съесть кекс"
        parsed = {
            "title": "Творог",
            "items": [{"name": "Творог", "grams": 150, "kcal": 180,
                       "protein": 25, "fat": 7, "carbs": 4}],
            "unparsed": [],
        }
        classified = route(
            "food", "Я съела творог", food_text="творог", food_record=parsed,
        )
        result = self._reply(text, "mixed-status", classified)
        self.assertEqual(result["mutation"]["kind"], "food")
        self.assertEqual([x["name"] for x in bot.meals_of(self.cid)[0]["items"]], ["Творог"])

    def test_question_without_recent_journal_does_not_pay_router_latency(self):
        with mock.patch.object(bot.L, "classify_journal_event") as classify:
            self.assertIsNone(asyncio.run(
                bot.resolve_semantic_journal_action(self.cid, "Можно ли есть лепёшку?")
            ))
        classify.assert_not_called()

    def test_v2_off_preserves_legacy_prefilter_and_rejects_new_actions(self):
        os.environ["AIWA_JOURNAL_V2"] = "0"
        text = "Я планирую съесть творог"
        with mock.patch.object(bot.L, "classify_journal_event") as classify:
            self.assertIsNone(asyncio.run(
                bot.resolve_semantic_journal_action(self.cid, text)
            ))
        classify.assert_not_called()

        correction = "Это был мой завтрак а не обед"
        payload = route(
            "move_meal_slot",
            correction,
            target_id=1,
            slot="breakfast",
            primary_purpose="repair",
        )
        self.assertIsNone(bot._normalize_semantic_journal(
            payload, correction, {"meals": [], "workouts": []}, enable_v2=False,
        ))

        legacy_answer = (
            "НАЗВАНИЕ: Творог\nКЛАСС: молочное\nГРАММЫ: 200\n"
            "ККАЛ: 240\nБЕЛКИ: 34\nЖИРЫ: 10\nУГЛЕВОДЫ: 6"
        )
        with (
            mock.patch.object(bot.L, "_call", return_value=legacy_answer) as legacy_call,
            mock.patch.object(bot.L, "_call_model") as v2_call,
        ):
            parsed = bot.L.analyze_food_text("200 г творога", structured=False)
        self.assertEqual(parsed["title"], "Творог")
        legacy_call.assert_called_once()
        v2_call.assert_not_called()

    def test_short_food_name_is_not_treated_as_substring_duplicate(self):
        self.assertFalse(bot._same_food_item("сыр", "сырники"))
        self.assertTrue(bot._same_food_item("голубику", "голубика"))

    def test_router_timeout_returns_visible_non_mutating_result(self):
        async def timeout(awaitable, *_args, **_kwargs):
            awaitable.close()
            raise asyncio.TimeoutError

        with (
            mock.patch.object(bot.asyncio, "wait_for", side_effect=timeout),
            mock.patch.object(bot, "ev"),
        ):
            plan = asyncio.run(
                bot.resolve_semantic_journal_action(self.cid, "Я съела творог")
            )
        self.assertEqual(plan["intent"], "journalunavailable")
        self.assertEqual(bot.meals_of(self.cid), [])

    def test_telegram_handle_text_executes_slot_move(self):
        rec = bot.normalize_food({
            "title": "Каша", "grams": 250, "kcal": 230,
            "protein": 7, "fat": 5, "carbs": 40,
        }, "text")
        rec.update(slot="lunch", slot_guessed=True)
        meal_id = bot.meal_add(self.cid, rec)
        text = "Это был мой завтрак а не обед"
        classified = route(
            "move_meal_slot", text, target_id=meal_id, slot="breakfast",
            primary_purpose="repair",
        )
        reply_text = mock.AsyncMock()
        update = SimpleNamespace(
            update_id=99001,
            effective_chat=SimpleNamespace(id=self.cid),
            message=SimpleNamespace(entities=[], reply_text=reply_text),
        )
        context = SimpleNamespace(
            bot=SimpleNamespace(send_chat_action=mock.AsyncMock()),
        )
        with mock.patch.object(bot.L, "classify_journal_event", return_value=classified):
            asyncio.run(bot.handle_text(update, context, text))
        self.assertEqual(bot.meal_get(self.cid, meal_id)["slot"], "breakfast")
        self.assertIn("Перенесла в завтрак", reply_text.await_args.args[0])

    def test_exact_voice_transport_reaches_position_parser_and_verified_write(self):
        voice_file = SimpleNamespace(
            download_as_bytearray=mock.AsyncMock(return_value=bytearray(b"ogg"))
        )
        telegram_bot = SimpleNamespace(
            send_chat_action=mock.AsyncMock(),
            get_file=mock.AsyncMock(return_value=voice_file),
            send_message=mock.AsyncMock(),
            send_voice=mock.AsyncMock(),
            send_audio=mock.AsyncMock(),
        )
        message = SimpleNamespace(
            voice=SimpleNamespace(file_id="voice-file"),
            entities=[],
            reply_text=mock.AsyncMock(),
        )
        update = SimpleNamespace(
            update_id=99002,
            effective_chat=SimpleNamespace(id=self.cid),
            message=message,
        )
        context = SimpleNamespace(bot=telegram_bot)
        classified = route(
            "food",
            "Я съела бутерброд с острочистелой красной рыбой",
            food_text=VOICE,
            food_record=PARSED_VOICE,
        )

        async def fake_llm(_cid, purpose, _fn, *args, **kwargs):
            if purpose == "stt":
                return VOICE
            if purpose == "journal_route":
                return classified
            raise AssertionError(purpose)

        with (
            mock.patch.dict(os.environ, {"AIWA_VOICE_REPLY": "0"}),
            mock.patch.object(bot, "llm_to_thread", side_effect=fake_llm),
            mock.patch.object(bot, "slot_for_now", return_value="lunch"),
            mock.patch.object(bot, "ev"),
        ):
            asyncio.run(bot.on_voice(update, context))

        self.assertIn("Расслышала", message.reply_text.await_args_list[0].args[0])
        replies = [call.args[0] for call in message.reply_text.await_args_list]
        self.assertTrue(any("Не разобрала" in text for text in replies))
        saved = bot.meals_of(self.cid)
        self.assertEqual(len(saved), 1)
        self.assertEqual(len(saved[0]["items"]), 3)
        self.assertTrue(saved[0]["slot_guessed"])


if __name__ == "__main__":
    unittest.main()
