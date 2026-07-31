"""Секция «commands» aiwa_bot.py — перенесена механически (модульный монолит).

Внешнее состояние читается через aiwa_bot в момент вызова — см.
docs/architecture/monolith-split-plan.md.
"""
import re
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

import aiwa_bot as _bot

async def start(update, context):
    cid = update.effective_chat.id
    # /start is the only operation that begins a fresh lifecycle after /stop.
    # Incrementing the generation keeps older in-flight tasks permanently stale.
    user_generation = _bot._activate_user(cid)
    _bot._sync_telegram_identity(update, allow_create=True)
    _bot.record_onboarding_started(cid, user_generation)
    if context.args and context.args[0].startswith("p_"):
        return await _bot.partner_join(context, cid, update.message, context.args[0][2:])
    if context.args and context.args[0] and not context.args[0].startswith("p_"):
        _src = re.sub(r"[^a-z0-9_]", "", (context.args[0] or "").lower())[:32]
        if _src:
            _bot._ref_touch(cid, _src); _bot.ev(cid, "ref", meta="src:" + _src)
    if _bot.is_partner(cid) and not _bot.is_onboarded(_bot.row(cid)):
        # Партнёр может завести и собственный профиль (например, мужской режим) —
        # партнёрские сводки при этом продолжают приходить.
        await update.message.reply_text(_bot.partner_info_for(cid))
        return await update.message.reply_text(
            "Кстати, Айва может вести и твои питание, тренировки и сводки — параллельно с партнёрской сводкой.",
            reply_markup=InlineKeyboardMarkup([[_bot.B("Настроить мой профиль", "go_start", _bot.KBS.PRIMARY)]]))
    _bot.ev(cid, "command", meta="start")
    if _bot.is_onboarded(_bot.row(cid)):
        return await update.message.reply_text(
            "У тебя уже всё настроено, данные на месте. Продолжить или начать настройку заново?",
            reply_markup=InlineKeyboardMarkup([[_bot.B("Продолжить", "keep", _bot.KBS.PRIMARY)], [_bot.B("Начать заново", "go_start", _bot.KBS.DANGER)]]))
    await _bot.begin_onboard(
        cid,
        update.message,
        user_generation=user_generation,
    )
async def today(update, context):
    cid = update.effective_chat.id; _bot.ev(cid, "command")
    if not _bot.is_onboarded(_bot.row(cid)): return await _bot.need_onboard(update.message)
    await _bot.push_summary(context, cid)
async def id_cmd(update, context):
    await update.message.reply_text(f"Твой chat id: {update.effective_chat.id}")
async def calendar_cmd(update, context):
    cid = update.effective_chat.id; _bot.ev(cid, "command"); u, st = _bot.status_of(cid)
    if not _bot.is_onboarded(u): return await _bot.need_onboard(update.message)
    if _bot.is_male_profile(u):
        return await update.message.reply_text(_bot.MALE_PROFILE_FUNCTION_TEXT)
    if st is None: return await update.message.reply_text("Пока не вижу данных цикла. Отметь последние месячные командой /period или кнопкой «Отметить месячные», и я покажу фазы и календарь.")
    if st["status"] != "normal": return await _bot.send_delay(context, cid, st)
    await _bot.send_infographic(context.bot, cid)
async def menu(update, context):
    _bot.ev(update.effective_chat.id, "command")
    u = _bot.row(update.effective_chat.id)
    if not _bot.is_onboarded(u): return await _bot.need_onboard(update.message)
    await update.message.reply_text("О чём рассказать сегодня?", reply_markup=_bot.menu_kb_for(u, not _bot.is_cycle(u)))
async def checkin_cmd(update, context):
    _bot.ev(update.effective_chat.id, "command"); cid = update.effective_chat.id
    if not _bot.is_onboarded(_bot.row(cid)): return await _bot.need_onboard(update.message)
    _bot.log_ensure(cid, _bot.dtoday().isoformat())
    await update.message.reply_text("Отметим самочувствие. Какая сегодня энергия?", reply_markup=_bot.en_kb("e"))
async def period_cmd(update, context):
    _bot.ev(update.effective_chat.id, "command"); cid = update.effective_chat.id
    u = _bot.row(cid)
    if not _bot.is_onboarded(u): return await _bot.need_onboard(update.message)
    if _bot.is_male_profile(u):
        _bot.upsert(cid, state=None)
        return await update.message.reply_text(_bot.MALE_PROFILE_FUNCTION_TEXT)
    if context.args:
        d = _bot.parse_date(context.args[0])
        if d:
            _bot.mark_period(context, cid, d.isoformat())
            await update.message.reply_text(f"Отметила начало месячных: {d.strftime('%d.%m.%Y')}. Вот свежая сводка:")
            return await _bot.push_summary(context, cid)
    _bot.upsert(cid, state="await_period_date")
    await update.message.reply_text("Напиши дату начала последних месячных, например 25.05.2026, или нажми кнопку. Потом даты можно редактировать в приложении.", reply_markup=_bot.PERIOD_KB)
async def set_time_cmd(update, context):
    _bot.ev(update.effective_chat.id, "command"); cid = update.effective_chat.id
    if not _bot.is_onboarded(_bot.row(cid)): return await _bot.need_onboard(update.message)
    hhmm = _bot.parse_time(context.args[0]) if context.args else None
    if not hhmm:
        _bot.upsert(cid, state="await_time")
        return await update.message.reply_text("Во сколько присылать сводку (МСК)? Выбери или впиши своё время, например 09:00.", reply_markup=_bot.time_kb())
    _bot.set_daily_time(context.application, cid, hhmm)
    await update.message.reply_text(_bot.schedule_text(cid, hhmm))
MODE_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Мужчина", callback_data="mode:male")],
    [InlineKeyboardButton("Цикл", callback_data="onb_cycle")],
    [InlineKeyboardButton("Нерегулярный цикл", callback_data="mode:irregular")],
    [InlineKeyboardButton("Беременность", callback_data="mode:preg")],
    [InlineKeyboardButton("Менопауза", callback_data="mode:meno")],
    [InlineKeyboardButton("Сейчас нет месячных", callback_data="mode:none")],
])
async def mode_cmd(update, context):
    _bot.ev(update.effective_chat.id, "command"); cid = update.effective_chat.id
    if not _bot.is_onboarded(_bot.row(cid)): return await _bot.need_onboard(update.message)
    await update.message.reply_text("Что отслеживаем сейчас? Поменять можно в любой момент.", reply_markup=_bot.MODE_KB)
async def menutoday_cmd(update, context):
    cid = update.effective_chat.id; _bot.ev(cid, "command"); u, st = _bot.status_of(cid)
    if not _bot.is_onboarded(u): return await _bot.need_onboard(update.message)
    if st is None: return await _bot.send_general(context, cid, "food")
    await _bot.send_section(context, cid, st, "food")
async def profile_cmd(update, context):
    cid = update.effective_chat.id; _bot.ev(cid, "command")
    if not _bot.is_onboarded(_bot.row(cid)): return await _bot.need_onboard(update.message)
    _bot.upsert(cid, state="await_profile_edit")
    await update.message.reply_text("Обновим данные. Напиши через пробел рост (см), вес (кг), возраст. Например 168 60 30.")
async def guide_cmd(update, context):
    cid = update.effective_chat.id; _bot.ev(cid, "command")
    if _bot.is_male_profile(_bot.row(cid)):
        return await update.message.reply_text(_bot.MALE_PROFILE_FUNCTION_TEXT)
    await _bot.send_guide(context, cid, _bot.GUIDES[0])
async def about_cmd(update, context):
    cid = update.effective_chat.id; _bot.ev(cid, "command")
    await update.message.reply_text(_bot.meta_text_for(_bot.row(cid), "about"))
async def report_cmd(update, context):
    cid = update.effective_chat.id; _bot.ev(cid, "command")
    u = _bot.row(cid)
    if not _bot.is_onboarded(u): return await _bot.need_onboard(update.message)
    await update.message.reply_text(_bot.report_prompt(u), reply_markup=_bot.HIST_KB)
async def partner_cmd(update, context):
    cid = update.effective_chat.id; _bot.ev(cid, "command")
    if not _bot.is_onboarded(_bot.row(cid)): return await _bot.need_onboard(update.message)
    await _bot.partner_entry(context, cid, update.message)
async def unlink_cmd(update, context):
    cid = update.effective_chat.id
    c = _bot.db(); c.execute("DELETE FROM partners WHERE partner_id=? OR woman_id=?", (cid, cid)); c.commit(); c.close()
    await update.message.reply_text("Партнёрская связь отключена.")
async def app_cmd(update, context):
    cid = update.effective_chat.id; _bot.ev(cid, "command")
    u = _bot.row(cid)
    if not _bot.is_onboarded(u): return await _bot.need_onboard(update.message)
    url = _bot.webapp_url(u)
    if not url:
        return await update.message.reply_text("Приложение скоро подключим.")
    await update.message.reply_text("Приложение Айвы:",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton(_bot.APP_BUTTON_TEXT, web_app=WebAppInfo(url=url))]]))
async def stop(update, context):
    cid = update.effective_chat.id
    _bot._remove_daily_jobs(context.application, cid)
    _bot.del_user(cid); await update.message.reply_text("Отключила сводки и удалила данные. Вернуться: /start")
async def help_cmd(update, context):
    male = _bot.is_male_profile(_bot.row(update.effective_chat.id))
    await update.message.reply_text(
        "Команды AIWA:\n"
        "/menu: открыть меню\n"
        "/today: сводка за день\n"
        "/app: открыть приложение\n"
        "/report: выписка для врача\n"
        "/partner: подключить партнёра\n"
        "/unlink: отключить партнёра\n"
        "/stop: стереть все данные и отключить бота\n\n"
        + (
            "Самочувствие, питание, нагрузка и статистика живут в приложении. "
            if male else
            "Календарь, симптомы, питание, нагрузка и статистика живут в приложении. "
        )
        + "Ещё можно писать словами: «как изменить вес», «поменять время рассылки», «как удалить данные», «отключить партнёра»."
    )
