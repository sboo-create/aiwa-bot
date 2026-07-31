"""Секция «chat_text» aiwa_bot.py — перенесена механически (модульный монолит).

Внешнее состояние читается через aiwa_bot в момент вызова — см.
docs/architecture/monolith-split-plan.md.
"""
from datetime import date
from datetime import datetime
import html
import re
import time
from datetime import timedelta
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

import aiwa_bot as _bot

async def on_text(update, context):
    cid = update.effective_chat.id
    if cid in _bot.ANNOUNCE_WAIT:
        return await _bot._announce_capture(update, context, cid)
    try:
        await _bot.handle_text(update, context, update.message.text.strip())
    except Exception as e:
        _bot.log.exception("text handler failed for %s", cid)
        _bot.ev(cid, "error", meta=type(e).__name__)
        await update.message.reply_text(
            "Я вижу сообщение, но сейчас не смогла собрать ответ. Попробуй ещё раз через минуту.")

async def on_voice(update, context):
    cid = update.effective_chat.id; txt = None; _sti = {}
    generation = _bot._user_generation(cid)
    await context.bot.send_chat_action(cid, "typing")
    try:
        f = await context.bot.get_file(update.message.voice.file_id)
        ba = await f.download_as_bytearray(); txt = await _bot.llm_to_thread(cid, "stt", _bot.L.transcribe, bytes(ba), "voice.ogg", _sti,
                                                                       user_generation=generation)
    except Exception as e:
        _bot.log.warning("voice: %s", e)
    if not _bot._user_write_allowed(cid, generation):
        return await update.message.reply_text("Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start.")
    if _sti: _bot.ev(cid, "stt", meta="stt:" + str(_sti.get("provider")), ms=int(_sti.get("ms") or 0), calls=1)
    if not txt:
        return await update.message.reply_text("Не разобрала голосовое, попробуй ещё раз или напиши текстом.")
    _bot.ev(cid, "voice", n=len(txt))
    await update.message.reply_text(f"🎙 Расслышала: «{txt}»")
    _bot._VOICE_TURN[cid] = True          # спросили голосом — ответим текстом и голосом
    sent_texts = []
    collector_token = _bot._SPOKEN_COLLECTOR.set(sent_texts)
    voice_context = _bot._VoiceContextProxy(
        context, _bot._VoiceBotProxy(context.bot, cid, sent_texts)
    )
    voice_update = _bot._VoiceUpdateProxy(
        update, _bot._VoiceMessageProxy(update.message, sent_texts)
    )
    try:
        await _bot.handle_text(voice_update, voice_context, txt)
        # Free-form AI answers speak inside send_answer(). Intent/state branches
        # often reply directly, so duplicate their final visible text here too.
        if _bot._VOICE_TURN.pop(cid, False) and _bot._voice_reply_on():
            spoken = _bot._voice_plain_text(
                sent_texts[-1] if sent_texts else "Готово. Результат отправила в чат."
            )
            if spoken:
                await _bot._send_voice_reply(context, cid, spoken)
    finally:
        _bot._SPOKEN_COLLECTOR.reset(collector_token)
        _bot._VOICE_TURN.pop(cid, None)   # чтобы флаг не протёк на следующий текстовый вопрос

def food_card(rec, added=True):
    conf = {"low": "низкая", "medium": "средняя", "high": "высокая"}.get(rec.get("confidence"), "средняя")
    head = f"🍽 <b>{html.escape(rec['title'])}</b>"
    if rec.get("grams"): head += f" · ~{rec['grams']} г"
    lines = [head, f"~{rec['kcal']} ккал · Б {round(rec['protein'])} · Ж {round(rec['fat'])} · У {round(rec['carbs'])} г"
             + (f" · {rec['fclass']}" if rec.get("fclass") else "")]
    for it in (rec.get("items") or [])[:6]:
        g = f" {it['grams']} г" if it.get("grams") else ""
        lines.append(f"• {html.escape(it['name'])}{g} — {it['kcal']} ккал")
    if rec.get("note"): lines.append(f"<i>{html.escape(rec['note'])}</i>")
    lines.append(f"\nОценка примерная (точность {conf})." + (" Добавила в дневник — итоги дня в приложении." if added else ""))
    return "\n".join(lines)

async def on_photo(update, context):
    cid = update.effective_chat.id
    if cid in _bot.ANNOUNCE_WAIT:
        return await _bot._announce_capture(update, context, cid)
    u = _bot.row(cid)
    if not _bot.is_onboarded(u):
        return await update.message.reply_text("Сначала настрой Айву: /start.")
    generation = _bot._user_generation(cid)
    acquired = await _bot._acquire_food_vision_slot()
    if not acquired:
        _bot.ev(
            cid, "fallback", meta="food_vision_busy",
            user_generation=generation,
        )
        return await update.message.reply_text(
            "Сейчас разбираю много фотографий, поэтому фото не сохранила. "
            "Попробуй ещё раз через минуту или добавь приём текстом."
        )
    try:
        return await _bot._on_photo_bounded(update, context)
    finally:
        _bot._release_food_vision_slot()


async def _on_photo_bounded(update, context):
    cid = update.effective_chat.id; u = _bot.row(cid)
    if not _bot.is_onboarded(u):
        return await update.message.reply_text("Сначала настрой Айву: /start.")
    generation = _bot._user_generation(cid)
    _bot.ev(cid, "flow_start", meta="food", user_generation=generation)
    await context.bot.send_chat_action(cid, "typing")
    try:
        ph = update.message.photo
        fid = ph[-1].file_id if ph else (update.message.document.file_id if update.message.document else None)
        if not fid: return
        f = await context.bot.get_file(fid); ba = await f.download_as_bytearray()
    except Exception as e:
        _bot.log.warning("photo dl %s: %s", cid, e)
        return await update.message.reply_text("Не смогла скачать фото, попробуй ещё раз.")
    prof = _bot.profile_of(u); usage = []
    try:
        parsed = await _bot.llm_to_thread(
            cid, "food_vision", _bot.L.analyze_food, bytes(ba), "food.jpg",
            prof, usage, user_generation=generation,
        )
    except Exception as e:
        _bot.log.warning("on_photo analyze %s: %s", cid, e); parsed = None
    if not _bot._user_write_allowed(cid, generation):
        return await update.message.reply_text("Запрос отменён: данные уже удалены. Чтобы начать заново, введи /start.")
    _bot.ev(cid, "tokens", sum(usage), meta="food_photo", calls=len(usage), usage=usage)
    rec = _bot.normalize_food(parsed, "photo") if parsed else None
    if not rec:
        _e = ""
        try: _e = _bot.L.last_food_err()
        except Exception: pass
        return await update.message.reply_text("Не разобрала фото 🙈 Сфоткай ближе и светлее, либо напиши текстом." + (("\n\n⚙️ " + _e) if _e else ""))
    mid = _bot.meal_add(cid, rec); _bot.ev(cid, "goal", meta="food_log"); _bot.ev(cid, "manual", meta="food_log")
    rows = [[_bot.B("🗑 Убрать из дневника", f"mdel:{mid}")]]
    wu = _bot.campaign_webapp_url(u, tab="food")
    if wu: rows.append([InlineKeyboardButton("Открыть дневник", web_app=WebAppInfo(url=wu))])
    await update.message.reply_text(_bot.food_card(rec), reply_markup=InlineKeyboardMarkup(rows), parse_mode="HTML")

async def handle_text(update, context, txt):
    cid = update.effective_chat.id; u = _bot.row(cid); state = u["state"] if u else None
    cem = [e.custom_emoji_id for e in (update.message.entities or []) if getattr(e, "custom_emoji_id", None)]
    if cem:
        return await update.message.reply_text("ID кастомных эмодзи:\n" + "\n".join(cem))
    txt, addressed = _bot.strip_aiwa_address(txt)
    if addressed and not txt:
        topics = (
            "питанием, нагрузкой или самочувствием"
            if (u or {}).get("mode") == "male"
            else "циклом, питанием, нагрузкой или самочувствием"
        )
        return await update.message.reply_text(
            f"Я тут. Напиши вопрос или открой меню, и я помогу с {topics}."
        )
    if _bot.is_male_profile(u) and state in {
        "await_period_date", "await_cycle_len", "await_cycles",
    }:
        _bot.upsert(cid, state=None, pending_date=None)
        _bot.ev(cid, "male_mode_block", meta="stale_state_" + state)
        return await update.message.reply_text(_bot.MALE_PROFILE_FUNCTION_TEXT)

    if state == "await_food_text":
        pending_at = None
        try:
            pending_at = datetime.fromisoformat(str(u.get("pending_date") or ""))
            if pending_at.tzinfo is None:
                pending_at = pending_at.replace(tzinfo=_bot.TZ)
        except (TypeError, ValueError):
            pending_at = None
        still_pending = bool(
            pending_at
            and timedelta(0) <= datetime.now(_bot.TZ) - pending_at <= timedelta(minutes=30)
        )
        # The prompt is a one-shot capability and must not trap later messages.
        _bot.upsert(cid, state=None, pending_date=None)
        if still_pending:
            generation = _bot._user_generation(cid)
            journal = await _bot.resolve_semantic_journal_action(
                cid, txt, user_generation=generation, food_prompt_mode=True,
            )
            if journal and journal.get("intent") in {"logmeal", "logmealbatch"}:
                return await _bot.dispatch_intent(
                    context, update, cid, u, journal["intent"], txt,
                    journal=journal, user_generation=generation,
                )
            # The one-shot journal prompt must never suppress normal safety and
            # question handling. If this is not a verifiable meal, continue
            # through the ordinary router instead of trapping the message in a
            # food-only refusal.
            _bot.ev(
                cid, "fallback", meta="food_prompt_normal_router",
                user_generation=generation,
            )

    VALUE_STATES = {
        "await_date": "Напиши дату начала последних месячных, например 25.05.2026 или 26 мая 2026. Потом даты можно редактировать в приложении.",
        "await_len": "Напиши среднюю длину цикла числом. Это дни от первого дня одних месячных до первого дня следующих. Обычно 21-35, если не знаешь, можно 28.",
        "await_cycle_len": "Какая средняя длина цикла? Это дни от первого дня одних месячных до первого дня следующих. Напиши число, например 28.",
        "await_preg_date": "Напиши дату начала последних месячных, например 25.05.2026. Если знаешь ПДР, напиши дату и добавь слово ПДР.",
        "await_period_date": "Напиши дату начала последних месячных, например 25.05.2026 или 26 мая 2026. Потом даты можно редактировать в приложении.",
        "await_time": "Во сколько присылать сводку? Напиши время по Москве, например 08:00.",
        "await_profile": "Напиши рост, вес и возраст через пробел. Например 168 60 30. Можно написать «Пропустить».",
        "await_profile_edit": "Напиши рост, вес и возраст через пробел. Например 168 60 30.",
        "await_cycles": "Пришли даты начала месячных, по одной на строке. Можно добавить последние несколько циклов.",
        "await_symptom_custom": "Напиши симптом коротко, например «тошнота», «ломота», «боль в груди».",
    }
    if state in VALUE_STATES and _bot.is_question_like(txt):
        await context.bot.send_chat_action(cid, "typing")
        _, _qst = _bot.status_of(cid)
        a = await _bot.think_llm(context, cid, _bot.L.answer_question, _qst, txt, _bot.llm_profile_of(u), None)
        await _bot.reply_long(update.message, _bot.L.split_followups(a)[0])
        return await update.message.reply_text("А теперь вернёмся к настройке. " + VALUE_STATES[state])

    if _bot.is_partner(cid) and not _bot.is_onboarded(u):
        wid = _bot.woman_of_partner(cid); wu = _bot.row(wid); _, wst = _bot.status_of(wid)
        mt = _bot.match_meta(txt)
        if mt:
            return await update.message.reply_text(_bot.meta_text_for(u, mt))
        if _bot.is_gibberish(txt):
            return await update.message.reply_text("Не поняла вопрос. Напиши словами, например: «как её поддержать сегодня» или «что ей купить».")
        await context.bot.send_chat_action(cid, "typing")
        t0 = time.monotonic(); usage = []
        if wu and wu.get("mode") == "preg" and wu.get("last_period"):
            ans = await _bot.llm_to_thread(cid, "partner_answer", _bot.L.partner_preg_answer, _bot.C.preg_status(wu["last_period"]), txt, _bot.last_hint(wid), usage=usage)
        elif wst:
            ans = await _bot.llm_to_thread(cid, "partner_answer", _bot.L.partner_answer, wst, txt, _bot.last_hint(wid), usage=usage)
        else:
            return await update.message.reply_text(_bot.partner_info_for(cid))
        _bot.ev(cid, "answered", tokens=sum(usage), meta="partner_q", ms=int((time.monotonic()-t0)*1000), n=len(txt), calls=len(usage), usage=usage)
        return await context.bot.send_message(cid, ans)

    if state == "await_date":
        d = _bot.parse_date(txt)
        if not d:
            if _bot.is_question_like(txt):
                _oq = []; a = await _bot.think_llm(context, cid, _bot.L.answer_question, None, txt, _bot.llm_profile_of(u), None, usage=_oq)
                _bot.ev(cid, "tokens", sum(_oq), meta="onboard_q", calls=len(_oq), usage=_oq)
                return await _bot.reply_long(update.message, _bot.L.split_followups(a)[0] + "\n\nА теперь вернёмся: напиши дату начала последних месячных, например 25.05.2026. Потом даты можно редактировать в приложении.")
            return await update.message.reply_text("Не разобрала дату. Напиши дату начала последних месячных в формате ДД.ММ.ГГГГ, например 25.05.2026, или нажми кнопку выше.")
        _bot.upsert(cid, pending_date=d.isoformat(), state="await_len")
        return await update.message.reply_text(
            "Теперь длина цикла — сколько дней от первого дня одних месячных до первого дня следующих. "
            "Например, месячные начались 1 мая, следующие 29 мая — цикл 28 дней.\n\n"
            "Напиши число. Обычно это 21–35 дней; если не помнишь точно, укажи примерно — потом можно поправить.")
    if state == "await_len":
        try:
            n = int(txt); assert 20 <= n <= 60
        except (ValueError, AssertionError):
            if _bot.is_question_like(txt):
                _oq = []; a = await _bot.think_llm(context, cid, _bot.L.answer_question, None, txt, _bot.llm_profile_of(u), None, usage=_oq)
                _bot.ev(cid, "tokens", sum(_oq), meta="onboard_q", calls=len(_oq), usage=_oq)
                return await _bot.reply_long(update.message, _bot.L.split_followups(a)[0] + "\n\nА теперь вернёмся: какая средняя длина цикла в днях? Обычно это 21-35 дней, но у многих бывает иначе.")
            return await update.message.reply_text("Нужно число от 20 до 60. Если не знаешь точно, напиши примерное значение, потом его можно поправить. Если цикл нерегулярный, можно начать заново через /start и выбрать «Нет регулярного цикла».")
        _bot.finish_onboarding(context, cid, u["pending_date"], n)
        note = ""
        if n > 40:
            note = ("Цикл длиннее 40 дней часто говорит о нерегулярности (бывает при СПКЯ, щитовидке, стрессе), это стоит обсудить с гинекологом. "
                    "Ориентировочные фазы я всё равно посчитаю и буду следить за симптомами.\n\n")
        _bot.upsert(cid, state="await_profile")
        return await update.message.reply_text(note +
            "Напиши через пробел рост, вес и возраст — например: 168 60 30.\nПо ним я рассчитаю калории и подберу питание.", reply_markup=_bot.SKIP_KB)

    if state == "await_diet":
        _clean = txt.strip().lower()
        if _clean in ("нет", "нету", "не", "no", "ограничений нет", "нет ограничений", "-", "пропустить"):
            _bot.upsert(cid, diet="", diet_note="", state=None)
        else:
            _bot.upsert(cid, diet="", diet_note=txt[:200], state=None)
        return await _bot.welcome_finish(context, cid, update.message)

    if state == "await_profile_edit":
        nums = [p for p in re.split(r"[ ,;/]+", txt) if p]
        try:
            cm = float(nums[0]); kg = float(nums[1]); age = int(float(nums[2]))
            assert 120 < cm < 220 and 30 < kg < 250 and 10 < age < 80
        except Exception:
            return await update.message.reply_text("Нужно три числа: рост в см, вес в кг, возраст. Например 168 60 30.")
        _bot.upsert(cid, height=int(cm), weight=kg, age=age, state=None)
        return await update.message.reply_text(f"Обновила: рост {int(cm)} см, вес {kg:g} кг, возраст {age}. Пересчитаю калории и питание под тебя.")
    if state == "await_profile":
        nums = [p for p in re.split(r"[ ,;/]+", txt) if p]
        try:
            cm = float(nums[0]); kg = float(nums[1]); age = int(float(nums[2]))
            assert 120 < cm < 220 and 30 < kg < 250 and 10 < age < 80
        except Exception:
            if _bot.is_question_like(txt):
                _oq = []; a = await _bot.think_llm(context, cid, _bot.L.answer_question, None, txt, _bot.llm_profile_of(u), None, usage=_oq)
                _bot.ev(cid, "tokens", sum(_oq), meta="onboard_q", calls=len(_oq), usage=_oq)
                return await _bot.reply_long(update.message, _bot.L.split_followups(a)[0] + "\n\nА теперь вернёмся: напиши рост (см), вес (кг), возраст. Например 168 60 30, или нажми «Пропустить».", reply_markup=_bot.SKIP_KB)
            return await update.message.reply_text("Нужно три числа: рост в см, вес в кг, возраст. Например 168 60 30. Или нажми «Пропустить».", reply_markup=_bot.SKIP_KB)
        _bot.upsert(cid, height=int(cm), weight=kg, age=age, state="await_activity")
        return await update.message.reply_text("Записала. Какой у тебя уровень физической активности?\n\n"
            "• Минимальная — сидячий образ жизни, почти без спорта\n"
            "• Лёгкая — лёгкие тренировки 1–3 раза в неделю\n"
            "• Умеренная — спорт 3–5 раз в неделю\n"
            "• Высокая — интенсивно 6–7 раз в неделю\n"
            "• Очень высокая — спорт плюс физическая работа\n\n"
            "Это нужно, чтобы точнее считать калории и питание.", reply_markup=_bot.ACT_KB)

    if state == "await_activity":
        # раньше этот шаг принимал только кнопки: написавшая словами выпадала из онбординга в общий чат
        _low = txt.lower()
        _act = None
        for _pat, _lvl in (("очень высок", 5), ("минимал", 1), ("лёгк", 2), ("легк", 2), ("умерен", 3), ("средн", 3), ("высок", 4)):
            if _pat in _low: _act = _lvl; break
        if _act is None:
            _md = re.fullmatch(r"[1-5]", _low.strip())
            if _md: _act = int(_low.strip())
        if _act is None:
            return await update.message.reply_text("Выбери уровень активности кнопкой ниже — так точнее.", reply_markup=_bot.ACT_KB)
        _bot.upsert(cid, activity=_act, state="await_diet")
        return await update.message.reply_text("Есть ограничения в еде? Отметь варианты или напиши своё текстом, например «без свинины, без сахара». Если ограничений нет, нажми «Ограничений нет».", reply_markup=_bot.diet_kb(set()))

    if state == "await_symptom_custom":
        code = _bot.symptom_code(txt)
        if not code:
            return await update.message.reply_text("Напиши симптом коротко, например «тошнота» или «ломота».")
        today_s = _bot.dtoday().isoformat()
        _bot.log_add_symptom(cid, today_s, code)
        _bot.upsert(cid, state=None)
        _bot.ev(cid, "manual", meta="custom_symptom", n=len(txt))
        sel = set((_bot.log_get(cid, today_s) or {}).get("symptoms", []))
        return await update.message.reply_text(f"Записала: {_bot.symptom_label(code)}. Можно добавить ещё или нажать Готово.", reply_markup=_bot.sym_kb(sel))

    if state == "await_time":
        hhmm = _bot.parse_time(txt)
        if hhmm:
            _bot.set_daily_time(context.application, cid, hhmm)
            return await update.message.reply_text(_bot.schedule_text(cid, hhmm))
        _bot.upsert(cid, state=None)
    elif state == "await_period_date":
        d = _bot.parse_date(txt)
        if d:
            _bot.mark_period(context, cid, d.isoformat())
            await update.message.reply_text(f"Отметила начало месячных: {d.strftime('%d.%m.%Y')}. Вот свежая сводка:")
            return await _bot.push_summary(context, cid)
        _bot.upsert(cid, state=None)
    elif state == "await_preg_date":
        mdt = _bot._DATE_RE.search(txt); d = _bot.parse_date(mdt.group(0)) if mdt else None
        if not d:
            return await update.message.reply_text("Не разобрала дату. Напиши дату начала последних месячных в формате ДД.ММ.ГГГГ, например 25.05.2026. Если знаешь ПДР, напиши дату и добавь слово ПДР.")
        low = txt.lower()
        lmp = (d - timedelta(days=280)) if ("пдр" in low or "род" in low) else d
        _bot.upsert(cid, last_period=lmp.isoformat(), state="await_profile")
        stp = _bot.C.preg_status(lmp.isoformat())
        return await update.message.reply_text(
            f"Записала. Срок: {stp['week']} нед {stp['day']} дн, ПДР примерно {date.fromisoformat(stp['due']).strftime('%d.%m.%Y')}.\n\n"
            "Осталось пару данных для рекомендаций: рост (см), вес (кг), возраст. Например 168 60 30.", reply_markup=_bot.SKIP_KB)
    elif state == "await_cycle_len":
        mnum = re.search(r"\d{1,2}", txt)
        if mnum and 15 <= int(mnum.group()) <= 60:
            _bot.upsert(cid, cycle_len=int(mnum.group()), state=None)
            await update.message.reply_text(f"Записала длину цикла: {mnum.group()} дн.")
            return await _bot.push_summary(context, cid)
        _bot.upsert(cid, state=None)
        return await update.message.reply_text("Нужно число от 15 до 60. Открой «Длина цикла» в Меню и попробуй ещё раз.")
    elif state == "await_cycles":
        ranges = _bot.parse_cycle_ranges(txt)
        if not ranges:
            _bot.upsert(cid, state=None)
            return await update.message.reply_text("Не нашла дат. Попробуй ещё раз: открой «Добавить историю циклов» в Меню и пришли даты начала месячных, по одной на строке, например 12.04.2026.")
        c = _bot.db(); c.execute("DELETE FROM cycles WHERE chat_id=?", (cid,)); c.commit(); c.close()
        for p in ranges: _bot.cyc_add(cid, p["start"], p.get("end"))
        starts = [p["start"] for p in ranges]; u2 = _bot.row(cid); latest = max(starts)
        last_range = next((p for p in ranges if p["start"] == latest), None)
        if last_range and last_range.get("end"):
            ln = (date.fromisoformat(last_range["end"]) - date.fromisoformat(latest)).days + 1
            _bot.upsert(cid, period_end=last_range["end"], period_len=ln)
        _bot.upsert(cid, last_period=latest, cycle_len=(u2.get("cycle_len") or 28), mode="cycle", state=None)
        _bot.schedule_daily(context.application, cid, _bot.row(cid)["send_time"] or "08:00")
        word = "цикл" if len(starts)==1 else ("цикла" if len(starts)<5 else "циклов")
        await update.message.reply_text(f"Готово, история заменена на {len(starts)} {word}. Последние месячные: {date.fromisoformat(latest).strftime('%d.%m.%Y')}. Календарь обновлён, ошибочные даты убраны.")
        return await _bot.push_summary(context, cid)

    if _bot.is_onboarded(u):
        pre_intent = _bot.match_intent(txt)
        if pre_intent in ("wipe", "unlink", "help", "current_date"):
            return await _bot.dispatch_intent(context, update, cid, u, pre_intent, txt)

    m = _bot.match_meta(txt)
    if m:
        _bot.ev(cid, "manual", meta="meta", n=len(txt))
        return await update.message.reply_text(_bot.meta_text_for(u, m))

    low = txt.lower()
    if _bot.is_onboarded(u) and re.search(r"(где.*сводк|пришл\w*\s*сводк|покажи\s*сводк|моя\s*сводк|^сводк|что там сегодня|что сегодня по циклу)", low):
        _bot.ev(cid, "manual", meta="summary_intent", n=len(txt)); return await _bot.push_summary(context, cid)
    if _bot.is_onboarded(u) and _bot.is_cycle(u) and re.search(r"(замен\w*|друго[ей]\w*\s+блюд\w*|другое на (завтрак|обед|ужин|перекус)|не нравит\w* блюд\w*|обнови\w* меню|пересобер\w* меню)", low):
        _, st = _bot.status_of(cid); _bot.ev(cid, "manual", meta="menu_replace", n=len(txt))
        return await _bot.send_section(context, cid, st, "food")
    if _bot.is_onboarded(u) and _bot.is_gibberish(txt):
        _bot.ev(cid, "fallback", meta="gibberish", n=len(txt))
        return await update.message.reply_text("Не поняла запрос. Напиши вопрос словами, например: «почему тянет на сладкое» или «какая тренировка сегодня».")

    if _bot.is_onboarded(u):
        _turn_generation = _bot._user_generation(cid)
        _intent = _bot.match_intent(txt)
        _journal = None
        if _intent not in _bot._JOURNAL_MUTATION_INTENTS:
            _telegram_mutation_key = _bot.chat_mutation_key(
                "telegram", getattr(update, "update_id", None),
            )
            _journal = _bot.chat_mutation_route_preflight(cid, _telegram_mutation_key)
            if not _journal:
                _journal = await _bot.resolve_semantic_journal_action(
                    cid, txt, user_generation=_turn_generation,
                )
            if _journal:
                _intent = _journal["intent"]
        if _intent:
            return await _bot.dispatch_intent(
                context, update, cid, u, _intent, txt, journal=_journal,
                user_generation=_turn_generation,
            )

    if _bot.is_onboarded(u) and not _bot.is_cycle(u):
        if not _bot._VOICE_TURN.get(cid): _bot.ev(cid, "user_message", meta="text", n=len(txt))
        await context.bot.send_chat_action(cid, "typing")
        t0 = time.monotonic(); usage = []
        ans = await _bot.think_llm(context, cid, _bot.L.general_answer, _bot.llm_profile_of(u), u.get("mode"), txt, hint=_bot.chat_hint(cid), history=_bot.hist_get(cid, male=_bot.is_male_profile(u)), usage=usage)
        _bot.ev(cid, "answered", meta="general", ms=int((time.monotonic()-t0)*1000), n=len(txt))
        ans = _bot.guard_aiwa_reply(cid, ans)
        _bot.hist_push(cid, txt, ans)
        return await _bot.send_answer(context, cid, ans, None, txt, usage=usage, quote=txt)
    if _bot.is_onboarded(u):
        if not _bot._VOICE_TURN.get(cid): _bot.ev(cid, "user_message", meta="text", n=len(txt))
        _, st = _bot.status_of(cid); await context.bot.send_chat_action(cid, "typing")
        g = _bot.match_guide(txt)
        if g: await _bot.send_guide(context, cid, g)
        t0 = time.monotonic(); usage = []
        ans = await _bot.think_llm(context, cid, _bot.L.answer_question, st, txt, _bot.llm_profile_of(u), _bot.hist_get(cid, male=_bot.is_male_profile(u)), usage=usage)
        _bot.ev(cid, "answered", meta="answer", ms=int((time.monotonic()-t0)*1000), n=len(txt))
        ans = _bot.guard_aiwa_reply(cid, ans)
        _bot.hist_push(cid, txt, ans)
        return await _bot.send_answer(context, cid, ans, st, txt, usage=usage, quote=txt)
    if _bot.is_question_like(txt):
        await context.bot.send_chat_action(cid, "typing")
        _oq = []; a = await _bot.think_llm(context, cid, _bot.L.answer_question, None, txt, _bot.llm_profile_of(u), None, usage=_oq)
        _bot.ev(cid, "tokens", sum(_oq), meta="onboard_q", calls=len(_oq), usage=_oq)
        await _bot.reply_long(update.message, _bot.L.split_followups(a)[0])
    await _bot.need_onboard(update.message)
