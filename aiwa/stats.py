"""Секция «stats» aiwa_bot.py — перенесена механически (модульный монолит).

Внешнее состояние читается через aiwa_bot в момент вызова — см.
docs/architecture/monolith-split-plan.md.
"""
import asyncio
import html
import time
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

import aiwa_bot as _bot

def aggregate_stats():
    """Выжимка /stats из analytics_data: 4 блока, явный период, WoW, источники."""
    A = _bot.analytics_data(days=7)
    a = A["audience"]; e = A["engagement"]; pr = A["product"]; qd = A["quality"]
    g = A.get("growth", {}); ts = A.get("toolcalls_by_source", {})
    def rr(x): return "-" if x is None else (str(x) + "%")
    def wow(x): return "" if x is None else (" · WoW " + ("+" if x >= 0 else "") + str(x) + "%")
    _bot.L = []
    _bot.L.append("Аналитика AIWA · за 7 дней (" + A["since"] + " -> " + A["until"] + ")")
    _bot.L.append("")
    _bot.L.append("АУДИТОРИЯ")
    _bot.L.append("Ever used " + str(a["ever_used"]))
    _bot.L.append("Средний DAU " + str(a["avg_dau"]) + wow(g.get("avg_dau")) + " · сегодня " + str(a["dau"]) + " (день идёт)")
    _bot.L.append("WAU " + str(a["wau"]) + " · MAU " + str(a["mau"]) + " · Stickiness " + str(a["stickiness"]) + "% (DAU/MAU)")
    ret = a["retention"]
    _bot.L.append("Rolling retention D1/7/30: " + rr(ret["roll_d1"]) + "/" + rr(ret["roll_d7"]) + "/" + rr(ret["roll_d30"]))
    _bot.L.append("Всего " + str(a["users_total"]) + ", новых за период " + str(a["new_users"]) + ", партнёров " + str(a["partners"]["connected"]))
    _bot.L.append("Сегменты (активных): " + (", ".join(str(sg["mode"]) + " " + str(sg["active"]) for sg in a["segments"]) or "нет"))
    _bot.L.append("")
    _bot.L.append("ВОВЛЕЧЁННОСТЬ")
    _bot.L.append("Событий на DAU: " + str(e["events_per_dau"]) + " = " + str(e["events_total"]) + " событий / " + str(e["active_user_days"]) + " активных·дней" + wow(g.get("events")))
    _bot.L.append("События по источнику: приложение " + str(e["by_source"]["app"]) + ", чат " + str(e["by_source"]["chat"]))
    _bot.L.append("Tools / DAU " + str(e["tools_per_dau"]) + " (" + str(e["toolcalls_total"]) + " вызовов) · прил " + str(ts.get("app", 0)) + ", чат " + str(ts.get("chat", 0)) + ", авто " + str(ts.get("auto", 0)) + wow(g.get("toolcalls")))
    _bot.L.append("Топ действий: " + (", ".join(str(k) + " " + str(vv) for k, vv in e["actions_top"][:6]) or "нет"))
    ss = e["sessions"]
    _bot.L.append("Sessions / DAU " + str(e["sessions_per_dau"]) + " (" + str(ss["count"]) + " сессий), длина " + str(ss["avg_len_min"]) + " мин, действий/сессия " + str(ss["events_per"]))
    _bot.L.append("")
    _bot.L.append("ПРОДУКТ")
    po = pr["push_open"]
    _bot.L.append("Пуш->открытие: " + str(po["rate"]) + "% (" + str(po["opened"]) + " из " + str(po["sent"]) + ")")
    _bc = sorted(pr["broadcasts"].items(), key=lambda x: -x[1])[:6]
    _bot.L.append("Рассылки: " + (", ".join(str(k) + " " + str(vv) for k, vv in _bc) or "нет"))
    f = pr["funnel"]
    _bot.L.append("Воронка: новые " + str(f["new_users"]) + " -> активны " + str(f["onboarded"]) + " -> сводка " + str(f["got_summary"]) + " -> еда " + str(f["logged_food"]) + " -> тренировка " + str(f["logged_workout"]))
    _bot.L.append("")
    _bot.L.append("КАЧЕСТВО")
    _bot.L.append("Успешность " + str(qd["success_rate"]) + "% = " + str(qd["answered"]) + " / (" + str(qd["answered"]) + "+" + str(qd["fallback"]) + "+" + str(qd["errors"]) + ")")
    _bot.L.append("Фолбэки " + str(qd["fallback_rate"]) + "%, ошибки " + str(qd["error_rate"]) + "%")
    _bot.L.append("Латентность p50 " + str(qd["p50"]) + " / p95 " + str(qd["p95"]) + " мс")
    _bot.L.append("Токены " + str(qd["tokens"]) + ", оценка $" + str(qd["cost_usd"]))
    return "\n".join(_bot.L)

async def ui_cmd(update, context):
    """Диагностика редизайна: что видит флаг и какой URL получают кнопки этого пользователя."""
    cid = update.effective_chat.id
    u = _bot.row(cid)
    url = _bot.webapp_url(u) or "(нет AIWA_WEBAPP_URL)"
    lines = ["Диагностика мини-аппа:",
             f"твой id: {cid}",
             f"redesign включён для тебя: {'ДА' if bot.redesign_on(cid) else 'НЕТ'}",
             f"id в списке AIWA_REDESIGN_IDS: {len(bot._REDESIGN_IDS)} шт",
             f"URL кнопок: {url}",
             "", "Кнопка ниже ведёт на новый фронт напрямую. Если по ней открывается старый экран — пришли скрин."]
    kb = None
    if _bot.AIWA_WEBAPP_URL:
        kb = InlineKeyboardMarkup([[InlineKeyboardButton("Новый апп (прямая ссылка)",
              web_app=WebAppInfo(url=_bot.AIWA_WEBAPP_URL))]])
    await update.message.reply_text("\n".join(lines), reply_markup=kb)

async def voicetest_cmd(update, context):
    """Диагностика голоса: авторизация Сбера, синтез, отправка тестового голосового."""
    cid = update.effective_chat.id
    if not _bot.AIWA_ADMIN or str(cid) != str(_bot.AIWA_ADMIN):
        return await update.message.reply_text("Команда только для админа.")
    await update.message.reply_text("Проверяю голосовой контур…")
    d = await asyncio.to_thread(_bot.L.salute_diag)
    L_ = ["Голосовой контур:", ""]
    L_.append(("✅" if d["key"] else "❌") + " ключ SBER_SALUTE_AUTH_KEY " + ("задан" if d["key"] else "НЕ задан")
              + (" · %s символов · %s" % (d.get("key_len"), d.get("key_form")) if d.get("key_form") else ""))
    L_.append(("✅" if d["auth"] else "❌") + " авторизация в Сбере" + ("" if d["auth"] else ": " + (d.get("auth_err") or "неизвестно")))
    if d.get("auth_form"): L_.append("   формат ключа: " + str(d["auth_form"]))
    if d.get("auth"):
        ok_tts = d.get("tts_bytes", 0) > 0
        L_.append(("✅" if ok_tts else "❌") + " синтез речи" + (" (%s байт)" % d["tts_bytes"] if ok_tts else ": " + (d.get("tts_err") or "пусто")))
    if d.get("key_parts"): L_.append("   в ключе: " + str(d["key_parts"]) + " (норма: 36 + 36)")
    L_ += ["", "версия: " + _bot.AIWA_VERSION, "сервис: " + str(d.get("mode")) + " · логин: " + str(d.get("client")),
           "OAuth URL: " + str(d.get("oauth_url")),
           "модель распознавания: " + str(d["model"]),
           "голос: " + str(d["voice"]), "режим STT: " + str(d["stt_mode"]),
           "ответ голосом: " + ("включён" if _bot._voice_reply_on() else "ВЫКЛЮЧЕН (AIWA_VOICE_REPLY=0)"),
           "Groq (запасной): " + ("есть" if d["groq"] else "нет")]
    await update.message.reply_text("\n".join(L_))
    if d.get("tts_bytes"):
        try:
            audio = await asyncio.to_thread(_bot.L.synthesize, "Привет! Это Айва. Проверка голосового ответа.")
            if audio:
                try:
                    await context.bot.send_voice(cid, audio)
                except Exception as e:
                    if "voice_messages_forbidden" not in str(e).lower():
                        raise
                    await _bot._send_audio_fallback(context, cid, audio)
                    await update.message.reply_text(
                        "⚠️ Голосовые тебе слать нельзя — это настройка приватности Telegram, не ошибка бота.\n"
                        "Прислала ответ обычным аудиофайлом. Чтобы приходили именно голосовые: "
                        "Настройки → Конфиденциальность → Голосовые сообщения → «Все».\n"
                        "Пользовательницам без этого ограничения голосовые уходят нормально.")
        except Exception as e:
            await update.message.reply_text("Синтез удался, но отправить не вышло: " + str(e)[:200])

async def refs_cmd(update, context):
    cid = update.effective_chat.id
    if not _bot.AIWA_ADMIN or str(cid) != str(_bot.AIWA_ADMIN):
        return await update.message.reply_text("Команда только для админа.")
    try:
        c = _bot.db(); rows = c.execute("SELECT source, chat_id FROM referrals").fetchall(); c.close()
    except Exception:
        rows = []
    from collections import defaultdict
    agg = defaultdict(lambda: [0, 0])
    for src, ccid in rows:
        agg[src][0] += 1
        if _bot.is_onboarded(_bot.row(ccid)): agg[src][1] += 1
    if not agg:
        return await update.message.reply_text(
            "Пока нет переходов по ссылкам с меткой.\nРаздавай ссылку вида:\nhttps://t.me/" + (_bot.BOT_USERNAME or "<bot>") + "?start=ИСТОЧНИК")
    lines = ["Переходы по меткам (перешли \u2192 настроили Айву):", ""]
    tot_all = 0; onb_all = 0
    for src, (tot, onb) in sorted(agg.items(), key=lambda x: -x[1][0]):
        tot_all += tot; onb_all += onb
        cr = (str(round(onb * 100 / tot)) + "%") if tot else "0%"
        lines.append("\u2022 " + src + ": " + str(tot) + " \u2192 " + str(onb) + " (" + cr + ")")
    lines.append("")
    lines.append("Итого: " + str(tot_all) + " \u2192 " + str(onb_all))
    await update.message.reply_text("\n".join(lines))

async def stats_cmd(update, context):
    cid = update.effective_chat.id
    if not _bot.AIWA_ADMIN:
        return await update.message.reply_text(f"Статистика закрыта. Твой chat id: {cid}. Задай в Railway переменную AIWA_ADMIN={cid}, и команда станет доступна только тебе.")
    if str(cid) != str(_bot.AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    _txt = await asyncio.to_thread(aggregate_stats)
    await update.message.reply_text(_txt)

async def probe_cmd(update, context):
    cid = update.effective_chat.id
    if not _bot.AIWA_ADMIN or str(cid) != str(_bot.AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    try:
        n = int(context.args[0]) if getattr(context, "args", None) else 10
    except (ValueError, IndexError):
        n = 10
    n = max(1, min(200, n))
    await update.message.reply_text(f"Запускаю {n} по-настоящему параллельных вызовов к модели в обход внутреннего лимита, меряю реальную параллельность тарифа...")
    import concurrent.futures as _cf
    t0 = time.time()
    loop = asyncio.get_running_loop()
    pool = _cf.ThreadPoolExecutor(max_workers=n)
    try:
        results = await asyncio.gather(*[loop.run_in_executor(pool, _bot.L.probe_once) for _ in range(n)])
    finally:
        pool.shutdown(wait=False)
    dt = int((time.time() - t0) * 1000)
    ok = sum(1 for r in results if r[0])
    fail = n - ok
    lats = sorted(r[1] for r in results)
    p50 = lats[len(lats) // 2]
    p95 = lats[min(len(lats) - 1, int(len(lats) * 0.95))]
    verdict = ("Все прошли - тариф держит такую параллельность."
               if fail == 0 else
               f"{fail} из {n} упало при одновременном запуске - похоже, это потолок параллельности тарифа. "
               f"Держи AIWA_LLM_CONCURRENCY ниже порога, где начинаются ошибки.")
    await update.message.reply_text(
        f"Готово за {dt} мс.\n\n"
        f"Успешно: {ok}/{n}\n"
        f"Ошибок: {fail}\n"
        f"Задержка: p50 {p50} мс, p95 {p95} мс, max {lats[-1]} мс\n\n"
        + verdict
    )

async def broadcast_today_cmd(update, context):
    cid = update.effective_chat.id
    if not _bot.AIWA_ADMIN or str(cid) != str(_bot.AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    users = _bot.all_users()
    queued = skipped = 0
    for uid in users:
        hhmm = (_bot.row(uid) or {}).get("send_time") or "08:00"
        if not _bot.should_catchup_broadcast(uid, hhmm):
            skipped += 1
            continue
        if await _bot.enqueue_broadcast(uid):
            queued += 1
        else:
            skipped += 1
    qsize = _bot.BCAST_Q.qsize() if _bot.BCAST_Q is not None else 0
    await update.message.reply_text(
        f"Запустила рассылку на сегодня.\n\n"
        f"В очереди: {queued}\n"
        f"Уже была сводка или уже стоят в очереди: {skipped}\n"
        f"Размер очереди сейчас: {qsize}\n\n"
        f"Сводки уйдут по очереди, чтобы не положить модель и Telegram."
    )

async def meno_update_cmd(update, context):
    cid = update.effective_chat.id
    if not _bot.AIWA_ADMIN or str(cid) != str(_bot.AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    users = _bot.meno_users()
    sent = failed = 0
    campaign = _bot.campaign_id("meno_update")
    for uid in users:
        u = _bot.row(uid)
        try:
            await context.bot.send_message(uid, html.escape(_bot.MENO_UPDATE_TEXT),
                reply_markup=_bot.summary_sugg_kb(uid, u, campaign=campaign), parse_mode="HTML")
            _bot.ev(uid, "broadcast", meta="sent|" + campaign)
            sent += 1
            await asyncio.sleep(0.25)
        except Exception as e:
            failed += 1
            _bot._record_push_failure(uid, campaign, e)
            _bot.log.warning("meno update %s: %s", uid, e)
    await update.message.reply_text(f"Пуш про мено-экран отправлен.\n\nУшло: {sent}\nОшибок: {failed}")

async def _announce_capture(update, context, cid):
    """Копирует сообщение, которое админ прислал после /announce (текст и/или фото), всем пользователям."""
    _bot.ANNOUNCE_WAIT.discard(cid)
    msg = update.message
    txt = (msg.text or "").strip()
    if txt.lower() in ("/cancel", "отмена"):
        return await msg.reply_text("Рассылка отменена.")
    await msg.reply_text("Рассылаю это сообщение всем пользователям. Пришлю отчёт, когда закончу.")
    sent = failed = 0
    campaign = _bot.campaign_id("announcement")
    for uid in _bot.all_users():
        try:
            await context.bot.copy_message(chat_id=uid, from_chat_id=cid, message_id=msg.message_id,
                                           reply_markup=_bot.summary_kb(_bot.row(uid), campaign=campaign))
            _bot.ev(uid, "broadcast", meta="sent|" + campaign); sent += 1
            await asyncio.sleep(0.25)
        except _bot.Forbidden as exc:
            failed += 1; _bot._record_push_failure(uid, campaign, exc)
        except Exception as e:
            failed += 1; _bot._record_push_failure(uid, campaign, e); _bot.log.warning("announce %s: %s", uid, e)
    await msg.reply_text(f"Готово. Ушло: {sent}, ошибок: {failed}.")

async def announce_cmd(update, context):
    cid = update.effective_chat.id
    if not _bot.AIWA_ADMIN or str(cid) != str(_bot.AIWA_ADMIN):
        return await update.message.reply_text("Эта команда доступна только администратору.")
    _bot.ANNOUNCE_WAIT.add(cid)
    await update.message.reply_text(
        "Режим рассылки включён.\n\n"
        "Пришли СЛЕДУЮЩИМ сообщением то, что разослать всем: обычный текст, или фото с подписью, или картинку. "
        "Я скопирую это сообщение всем пользователям и добавлю кнопку «Приложение».\n\n"
        "Чтобы отменить — напиши слово: отмена.")
