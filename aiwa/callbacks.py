"""Секция «callbacks» aiwa_bot.py — перенесена механически (модульный монолит).

Внешнее состояние читается через aiwa_bot в момент вызова — см.
docs/architecture/monolith-split-plan.md.
"""
import asyncio
import os
import re
import sqlite3
import time
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update, WebAppInfo

import aiwa_bot as _bot

async def on_cb(update, context):
    q = update.callback_query
    if not q.message:  # у сообщений старше ~48ч Telegram не присылает message — без защиты тут AttributeError
        await q.answer()
        return
    cid = q.message.chat.id; data = q.data
    if data.startswith("fb:"):
        parts = data.split(":", 2)
        rating = parts[1] if len(parts) > 1 else ""
        answer_id = re.sub(r"[^a-f0-9]", "", parts[2] if len(parts) > 2 else "")[:32]
        feedback_result = _bot._submit_feedback(cid, answer_id, rating, "bot")
        if feedback_result == "missing":
            return await q.answer("Не получилось сохранить оценку")
        if feedback_result == "duplicate":
            await q.answer("Оценка уже сохранена 💛")
        else:
            await q.answer("Спасибо, это помогает улучшать Айву 💛")
        rows = []
        for row_buttons in (getattr(q.message.reply_markup, "inline_keyboard", None) or []):
            if any(str(getattr(button, "callback_data", "") or "").startswith("fb:") for button in row_buttons):
                continue
            rows.append(list(row_buttons))
        await _bot.safe_edit(q, reply_markup=InlineKeyboardMarkup(rows) if rows else None)
        return
    await q.answer()
    # Onboarding has several early returns, so record the tap before routing.
    _bot.ev(cid, "suggest" if data.startswith("q:") else "button", meta=data)
    if data.startswith("pado:"):
        _parts = data.split(":")
        _intent = _parts[-1]
        if len(_parts) >= 4:
            _bot.ev(cid, "push_open", meta=":".join(_parts[1:-1]))
        _u = _bot.row(cid)
        if not _bot.is_onboarded(_u):
            return await q.message.reply_text("Сначала настрой Айву: /start.")
        if _bot.is_male_profile(_u):
            _QQ = {
                "train": (
                    "Собери мне короткую тренировку примерно на 10 минут с "
                    "учётом сегодняшнего самочувствия и восстановления. Дай "
                    "конкретные упражнения с подходами и повторами."
                ),
                "food": "Что съесть, чтобы добрать белок к ужину? Дай 2-3 конкретных варианта.",
            }
        else:
            _QQ = {
                "train": "Собери мне короткую тренировку примерно на 10 минут под мою фазу цикла и сегодняшнее самочувствие. Дай конкретные упражнения с подходами и повторами.",
                "food": "Что съесть, чтобы добрать белок к ужину, под мою фазу? Дай 2-3 конкретных варианта.",
            }
        _query = _QQ.get(_intent)
        if not _query:
            return
        _bot.ev(cid, "user_message", meta="suggest", n=len(_query))
        await context.bot.send_chat_action(cid, "typing")
        try:
            _res = await _bot._chat_reply(cid, _u, _query)
            _ans = _res.get("answer") if isinstance(_res, dict) else None
        except Exception as _e:
            _bot.log.warning("pado reply: %s", _e); _ans = None
        if not _ans:
            _ans = "Не получилось собрать прямо сейчас, попробуй ещё раз чуть позже."
        _ans = _bot.guard_aiwa_reply(cid, _ans)
        _wu = _bot.webapp_url(_u) or _bot.AIWA_WEBAPP_URL
        _kb = InlineKeyboardMarkup([[InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=_wu))]]) if _wu else None
        sent = await context.bot.send_message(cid, _ans, reply_markup=_kb)
        _bot.ev(cid, "assistant_message", meta="bot")
        return sent
    if data == "go_start": return await _bot.begin_onboard(cid, q.message, force=True)
    if data == "keep":
        u_keep = _bot.row(cid)
        return await q.message.reply_text("О чём рассказать сегодня?", reply_markup=_bot.menu_kb_for(u_keep, not _bot.is_cycle(u_keep)))
    if data == "onb_female":
        return await q.message.reply_text(_bot.FEMALE_START_TEXT, reply_markup=_bot.FEMALE_ONB_KB)
    if data == "onb_cycle":
        # Defer the mode transition until finish_onboarding has valid cycle
        # inputs. Cancelling this step must not expose cycle state.
        _bot.upsert(cid, state="await_date", pending_date=None)
        return await q.message.reply_text(
            "Напиши дату начала последних месячных — например 25.05.2026 или 26 мая 2026.\n\n"
            "По ней я определю день цикла и подстрою питание и нагрузку. Даты потом можно править в приложении.")
    if data == "prof_skip":
        _bot.upsert(cid, state=None); return await _bot.welcome_finish(context, cid, q.message)
    if data.startswith("act:"):
        _bot.upsert(cid, activity=int(data.split(":")[1]), state="await_diet")
        _bot.upsert(cid, state="await_diet")
        return await q.message.reply_text("Есть ограничения или предпочтения в еде? Напиши свободным текстом — например «без свинины, аллергия на орехи, не ем молочку». Если ограничений нет, напиши «нет».")
    if data.startswith("diet:s:"):
        code = data.split(":")[2]; cur = set((_bot.row(cid).get("diet") or "").split(",")) - {""}
        cur.symmetric_difference_update({code}); _bot.upsert(cid, diet=",".join(sorted(cur)))
        return await q.edit_message_reply_markup(reply_markup=_bot.diet_kb(cur))
    if data == "diet:none":
        # явный выбор «без ограничений»: чистим отмеченное и сразу завершаем шаг
        _bot.upsert(cid, diet="", state=None); return await _bot.welcome_finish(context, cid, q.message)
    if data == "diet:done":
        _bot.upsert(cid, state=None); return await _bot.welcome_finish(context, cid, q.message)
    if data == "no_cycle":
        return await q.message.reply_text(
            "Выбери, что ближе сейчас — это можно поменять позже.\n\n"
            "Айва работает и без регулярного цикла: при нерегулярных месячных, беременности и менопаузе.", reply_markup=_bot.NOCYCLE_KB)
    if data.startswith("mode:"):
        m = data.split(":")[1]; _bot.upsert(cid, mode=m)
        _bot._invalidate_mode_dependent_state(cid)
        if m == "male":
            # тестовые/старые аккаунты: дата цикла от прежнего профиля не должна
            # включать циклическую логику в ответах и сводках
            _bot.upsert(
                cid,
                last_period=None,
                cycle_len=None,
                period_end=None,
                period_len=None,
            )
        _bot.schedule_daily(context.application, cid, _bot.row(cid)["send_time"] or "08:00")
        if m == "preg":
            _bot.upsert(cid, state="await_preg_date")
            return await q.message.reply_text("Поздравляю! \U0001F930 Чтобы Айва считала срок, ПДР и неделю беременности, напиши дату начала последних месячных. Например: 25.05.2026. Если знаешь ПДР, напиши дату и добавь слово ПДР.")
        _bot.upsert(cid, state="await_profile")
        if m == "male":
            return await q.message.reply_text(
                "Принято. Напиши рост, вес и возраст через пробел — так рекомендации по питанию и нагрузке будут точнее. Например: 180 80 30. Можно пропустить и добавить позже.", reply_markup=_bot.SKIP_KB)
        return await q.message.reply_text(
            "Поняла. Айва не будет считать стандартные фазы цикла, но всё равно сможет давать персональные рекомендации по самочувствию, питанию и движению.\n\n"
            "Чтобы советы были точнее, напиши рост, вес и возраст через пробел. Например: 168 60 30. Можно пропустить и добавить позже.", reply_markup=_bot.SKIP_KB)
    u, st = _bot.status_of(cid)
    if not st and not _bot.is_onboarded(u):
        return await _bot.need_onboard(q.message)
    general = st is None
    today_s = _bot.dtoday().isoformat()
    if _bot.is_male_profile(u) and data in {
        "calendar", "addcycles", "cyclelen", "period", "period_today", "guides",
    }:
        _bot.upsert(cid, state=None, pending_date=None)
        _bot.ev(cid, "male_mode_block", meta="callback_" + data)
        return await q.message.reply_text(_bot.MALE_PROFILE_FUNCTION_TEXT)
    if data == "menu":
        _rows = []
        if _bot.AIWA_WEBAPP_URL:
            _rows.append([InlineKeyboardButton(_bot.APP_BUTTON_TEXT, web_app=WebAppInfo(url=_bot.webapp_url(u) or _bot.AIWA_WEBAPP_URL))])
        await q.message.reply_text(
            "Всё управление — в приложении по кнопке ниже. А здесь просто напиши или скажи, что нужно: вопрос, блюдо или тренировку.",
            reply_markup=InlineKeyboardMarkup(_rows) if _rows else None)
    elif data == "today":
        await _bot.push_summary(context, cid)
    elif data == "more":
        await q.message.reply_text(
            "Ещё возможности:",
            reply_markup=(_bot.MALE_MORE_KB if _bot.is_male_profile(u) else _bot.MORE_KB),
        )
    elif data == "edit":
        await q.message.reply_text(
            "Что изменить?",
            reply_markup=(_bot.MALE_EDIT_KB if _bot.is_male_profile(u) else _bot.EDIT_KB),
        )
    elif data == "profile_edit":
        _bot.upsert(cid, state="await_profile_edit")
        await q.message.reply_text("Обновим данные. Напиши через пробел рост (см), вес (кг), возраст. Например 168 60 30.")
    elif data == "food":
        if general: await _bot.send_general(context, cid, "food")
        else: await _bot.send_section(context, cid, st, "food")
    elif data.startswith("sec:"):
        if general: await _bot.send_general(context, cid, "training")
        else: await _bot.send_section(context, cid, st, data.split(":")[1])
    elif data == "calendar":
        if general: await q.message.reply_text("Пока не вижу данных цикла. Отметь последние месячные командой /period или кнопкой «Отметить месячные», и я покажу фазы и календарь.")
        elif st["status"] != "normal": await _bot.send_delay(context, cid, st)
        else: await _bot.send_infographic(context.bot, cid)
    elif data == "history":
        await q.message.reply_text(_bot.report_prompt(u), reply_markup=_bot.HIST_KB)
    elif data.startswith("rep:"):
        await _bot.send_report(context, cid, data.split(":")[1])
    elif data == "partner":
        await _bot.partner_entry(context, cid, q.message)
    elif data == "guides":
        await _bot.send_guide(context, cid, _bot.GUIDES[0])
    elif data == "checkin":
        _bot.log_ensure(cid, today_s); await q.message.reply_text("Отметим самочувствие. Какая сегодня энергия?", reply_markup=_bot.en_kb("e"))
    elif data == "addcycles":
        await _bot.addcycles_entry(context, cid, q.message)
    elif data == "cyclelen":
        _bot.upsert(cid, state="await_cycle_len")
        await q.message.reply_text("Какая у тебя средняя длина цикла в днях? Обычно 21-35. Напиши число, например 28.")
    elif data == "period":
        _bot.upsert(cid, state="await_period_date")
        await q.message.reply_text("Напиши дату начала последних месячных, например 25.05.2026, или нажми кнопку. Потом даты можно редактировать в приложении.", reply_markup=_bot.PERIOD_KB)
    elif data == "period_today":
        _bot.mark_period(context, cid, today_s)
        await q.message.reply_text("Отметила начало месячных сегодня. Вот свежая сводка:")
        await _bot.push_summary(context, cid)
    elif data == "set:time":
        _bot.upsert(cid, state="await_time")
        await q.message.reply_text("Во сколько присылать сводку (МСК)? Выбери или впиши своё время, например 09:00.", reply_markup=_bot.time_kb())
    elif data == "toggle:summary":
        if not _bot.is_onboarded(u):
            return await _bot.need_onboard(q.message)
        enabled = not bool((_bot.row(cid) or {}).get("daily_summary_enabled", True))
        _bot.upsert(cid, daily_summary_enabled=int(enabled))
        if enabled:
            _bot.schedule_daily(context.application, cid, (_bot.row(cid) or {}).get("send_time") or "08:00")
        else:
            _bot._remove_daily_jobs(context.application, cid)
        _bot.ev(cid, "manual", meta=("summary_notifications_on" if enabled else "summary_notifications_off"))
        await q.message.reply_text(
            "Утренние сводки включены." if enabled else
            "Утренние сводки выключены. Сводку по-прежнему можно открыть вручную в приложении или командой /today."
        )
    elif data.startswith("tm:"):
        hhmm = data.split(":", 1)[1]
        _bot.set_daily_time(context.application, cid, hhmm)
        await q.message.reply_text(_bot.schedule_text(cid, hhmm))
    elif data.startswith("ci:e:"):
        _bot.log_set(cid, today_s, energy=int(data.split(":")[2])); await _bot.safe_edit(q, "Настроение?", reply_markup=_bot.en_kb("m", _bot.MOOD))
    elif data.startswith("ci:m:"):
        _bot.log_set(cid, today_s, mood=int(data.split(":")[2])); await _bot.safe_edit(q, "Что беспокоит сегодня? Можно несколько, потом Готово.", reply_markup=_bot.sym_kb(set()))
    elif data.startswith("ci:s:"):
        _bot.log_toggle(cid, today_s, data.split(":")[2]); sel = set((_bot.log_get(cid, today_s) or {}).get("symptoms", [])); await _bot.safe_edit(q, reply_markup=_bot.sym_kb(sel))
    elif data == "ci:custom":
        _bot.upsert(cid, state="await_symptom_custom")
        await q.message.reply_text("Напиши свой симптом коротко, например «тошнота», «ломота», «боль в груди».")
    elif data == "ci:done":
        _bot.ev(cid, "goal", meta="checkin"); await _bot.safe_edit(q, "Записала. Учту в завтрашней сводке.")
    elif data.startswith("mdel:"):
        try:
            _bot.meal_del(cid, int(data.split(":")[1])); await _bot.safe_edit(q, "🗑 Убрала из дневника.")
        except Exception: pass
    elif data.startswith("wdel:"):
        try:
            _bot.workout_del(cid, int(data.split(":")[1])); await _bot.safe_edit(q, "🗑 Убрала тренировку.")
        except Exception: pass
    elif data.startswith("q:"):
        question = _bot.get_sugg(int(data.split(":")[1])) or "Дай рекомендацию"
        _bot.ev(cid, "user_message", meta="suggest", n=len(question))
        await context.bot.send_chat_action(cid, "typing")
        if general:
            usage = []; ans = await _bot.think_llm(context, cid, _bot.L.general_answer, _bot.llm_profile_of(u), u.get("mode"), question, hint=_bot.chat_hint(cid), history=_bot.hist_get(cid, male=_bot.is_male_profile(u)), usage=usage)
            _bot.hist_push(cid, question, ans)
            await _bot.send_answer(context, cid, ans, None, question, usage=usage, quote=question)
        else:
            usage = []; ans = await _bot.think_llm(context, cid, _bot.L.answer_question, st, question, _bot.llm_profile_of(u), _bot.hist_get(cid, male=_bot.is_male_profile(u)), usage=usage)
            _bot.hist_push(cid, question, ans)
            await _bot.send_answer(context, cid, ans, st, question, usage=usage, quote=question)

async def safe_edit(q, text=None, reply_markup=None):
    """edit_message_* с проглатыванием безобидных ошибок Telegram (not modified / таймаут)."""
    try:
        if text is not None:
            await q.edit_message_text(text, reply_markup=reply_markup)
        else:
            await q.edit_message_reply_markup(reply_markup=reply_markup)
    except _bot.BadRequest as e:
        if "not modified" in str(e).lower():
            return
        raise
    except (_bot.TimedOut, _bot.NetworkError):
        return

async def on_error(update, context):
    err = context.error
    # Безобидные ошибки Telegram: не пишем пользователю и не шлём алерт админу
    if isinstance(err, _bot.BadRequest) and "not modified" in str(err).lower():
        return
    if isinstance(err, (_bot.TimedOut, _bot.NetworkError, _bot.RetryAfter)):
        _bot.log.warning("transient telegram error: %s", err)
        return
    _bot.log.error("handler error", exc_info=err)
    try:
        if isinstance(update, Update) and update.effective_chat:
            _bot.ev(update.effective_chat.id, "error", meta=type(err).__name__)
            await context.bot.send_message(update.effective_chat.id,
                "Упс, что-то пошло не так. Попробуй ещё раз.")
        await _bot.admin_alert(context.application, "handler_error",
            f"⚠️ Ошибка обработчика: {type(err).__name__}\nЖурнал: journalctl -u aiwa на i167.")
    except Exception: pass

async def admin_alert(app, key, text, cooldown=900):
    # AIWA_ALERT_CHATS (список через запятую, поддерживает канал -100...)
    # имеет приоритет над AIWA_ADMIN — операционные алерты идут в мониторинг.
    raw = (os.environ.get("AIWA_ALERT_CHATS") or "").strip() or str(_bot.AIWA_ADMIN or "").strip()
    if not raw:
        return
    now = time.time()
    if now - _bot.ALERT_LAST.get(key, 0) < cooldown:
        return
    _bot.ALERT_LAST[key] = now
    for chat in raw.split(","):
        chat = chat.strip()
        if not chat:
            continue
        try:
            chat_id = int(chat)
        except Exception:
            chat_id = chat
        try:
            await app.bot.send_message(chat_id, "🚨 AIWA alert\n\n" + text)
        except Exception as e:
            _bot.log.warning("admin_alert %s: %s", chat, e)

async def load_logger(app):
    """Раз в минуту пишет в лог сводку нагрузки: вызовы модели, средняя латентность, очередь рассылки, число юзеров."""
    while True:
        await asyncio.sleep(60)
        try:
            s = _bot.L.pop_stats(); calls = s["calls"]
            avg = (s["ms"] // calls) if calls else 0
            q = _bot.BCAST_Q.qsize() if _bot.BCAST_Q is not None else 0
            wq = s.get("queued", 0); wms = (s.get("wait_ms", 0) // calls) if calls else 0
            ai_jobs = await asyncio.to_thread(_bot._ai_job_status_counts)
            _bot.log.info(
                "LOAD/60s llm_calls=%d avg_ms=%d wait_ms=%d queued=%d err=%d "
                "bcast_q=%d event_q=%d ai_queued=%d ai_running=%d ai_failed=%d users=%d",
                calls, avg, wms, wq, s["err"], q, _bot._EVENT_WRITE_Q.qsize(),
                ai_jobs.get("queued", 0), ai_jobs.get("running", 0),
                ai_jobs.get("failed", 0), len(_bot.all_users(include_synthetic=True)),
            )
            err_threshold = int(os.environ.get("AIWA_ALERT_LLM_ERRS", "2"))
            if calls and s["err"] >= err_threshold and (s["err"] / calls) >= 0.5:
                await _bot.admin_alert(app, "llm_errors",
                    f"Модель отвечает нестабильно: ошибок {s['err']} из {calls} вызовов за последнюю минуту.\n"
                    f"Средняя задержка: {avg} мс, очередь модели: {wq}.", cooldown=600)
            q_threshold = int(os.environ.get("AIWA_ALERT_BCAST_Q", "250"))
            if q >= q_threshold:
                await _bot.admin_alert(app, "broadcast_queue",
                    f"Очередь рассылки выросла до {q}. Возможно, модель или Telegram тормозит.", cooldown=600)
            ai_threshold = int(os.environ.get("AIWA_ALERT_TODAY_Q", "1200"))
            if ai_jobs.get("queued", 0) >= ai_threshold:
                await _bot.admin_alert(
                    app, "today_queue",
                    f"Очередь персональных сводок выросла до {ai_jobs['queued']}. "
                    "Обычные экраны продолжают обслуживаться, новые сводки получают fallback.",
                    cooldown=600,
                )
        except Exception as e:
            _bot.log.warning("load_logger: %s", e)

async def model_probe(app):
    """Опциональная активная проверка модели. Включается AIWA_MODEL_PROBE_SEC, например 300."""
    interval = int(os.environ.get("AIWA_MODEL_PROBE_SEC", "0") or "0")
    if interval <= 0:
        return
    await asyncio.sleep(30)
    while True:
        usage = []
        ok = False; out = ""
        try:
            ok, out = await asyncio.to_thread(_bot.L.health_check, usage)
        except Exception as e:
            out = type(e).__name__
        if not ok:
            await _bot.admin_alert(app, "model_probe",
                f"Служебная проверка модели не получила ответ.\nОтвет/ошибка: {out or 'пусто'}", cooldown=600)
        await asyncio.sleep(interval)

async def traction_worker():
    """Durable, privacy-safe delivery to the external Disrupt Analytics module."""
    url = os.environ.get("AIWA_TRACTION_URL", "").strip()
    token = os.environ.get("AIWA_TRACTION_TOKEN", "").strip()
    if not url:
        _bot.log.info("traction delivery disabled: AIWA_TRACTION_URL is not set")
        return
    for attempt in range(5):
        try:
            await asyncio.to_thread(_bot.A2.seed_traction_outbox, _bot.DB)
            break
        except sqlite3.OperationalError as exc:
            if "locked" not in str(exc).lower() or attempt == 4:
                _bot.log.warning("traction seed failed: %s", exc)
                break
            await asyncio.sleep(0.25 * (attempt + 1))
        except Exception as exc:
            _bot.log.warning("traction seed failed: %s", exc)
            break
    delay = 2
    while True:
        try:
            batch = await asyncio.to_thread(_bot.A2.traction_batch, _bot.DB, 200)
            if not batch:
                delay = 2; await asyncio.sleep(10); continue
            headers = {"Content-Type": "application/json"}
            if token: headers["X-Ingest-Token"] = token
            def _post():
                return _bot.requests.post(url, json={"events": batch}, headers=headers, timeout=10)
            response = await asyncio.to_thread(_post)
            if response.status_code < 200 or response.status_code >= 300:
                raise RuntimeError("HTTP " + str(response.status_code))
            await asyncio.to_thread(_bot.A2.traction_ack, _bot.DB, [item["event_id"] for item in batch])
            _bot.log.info("traction delivered: %d", len(batch)); delay = 2
        except Exception as exc:
            _bot.log.warning("traction delivery failed: %s", exc)
            await asyncio.sleep(delay); delay = min(delay * 2, 300)
