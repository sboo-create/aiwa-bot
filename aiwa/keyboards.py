"""Секция «keyboards» aiwa_bot.py — перенесена механически (модульный монолит).

Внешнее состояние читается через aiwa_bot в момент вызова — см.
docs/architecture/monolith-split-plan.md.
"""
from datetime import datetime
from datetime import time as dtime
import os
from datetime import timedelta
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

import aiwa_bot as _bot

ICONS = {  # набор Goodluck_sasha (@goodluck_alex): подобраны разные по цвету
    "food": "5418123573438980585",          # 🟢 зелёный
    "sec:training": "5359581378193138129",  # 🔥 оранжевый
    "calendar": "5415856681110217088",      # 🔵 синий
    "checkin": "5337172201642664657",       # 💜 фиолетовый
    "history": "5418143957353766660",       # ⭐️ золотой
    "guides": "5359285137118864843",        # 📕 красный
    "partner": "5359828776899322943",       # 💙 голубое сердце
    "period": "5357334118159883232",        # ❤️ красный
    "set:time": "5415597204955996883",      # 🟡 жёлтый
    "menu": "5415634562581538032",          # 🔘 нейтральный
    "edit": "5336819202575573316",          # ✏️ карандаш
    "cyclelen": "5337121636992690373",      # 🔁 цикл
    "addcycles": "5337010070922209271",     # 📌 пин
    "profile_edit": "5359307659927364818",  # 🌸 цветок
}
def B(text, cb, style=None):
    return InlineKeyboardButton(text, callback_data=cb)

MENU_KB = InlineKeyboardMarkup([
    [B("Сводка", "today")],
    [B("Партнёр", "partner"), B("Выписка врачу", "history")],
    [B("Настройки уведомлений", "more")],
])
GATE_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Начать", callback_data="go_start")]])
ONB_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Женщина", callback_data="onb_female")],
    [InlineKeyboardButton("Мужчина", callback_data="mode:male")],
])
FEMALE_ONB_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Веду цикл", callback_data="onb_cycle")],
    [InlineKeyboardButton("Нет регулярного цикла", callback_data="no_cycle")],
])
NOCYCLE_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Нерегулярный цикл", callback_data="mode:irregular")],
    [InlineKeyboardButton("Беременность", callback_data="mode:preg")],
    [InlineKeyboardButton("Менопауза", callback_data="mode:meno")],
    [InlineKeyboardButton("Сейчас нет месячных", callback_data="mode:none")],
])
GENERAL_MENU_KB = InlineKeyboardMarkup([
    [B("Сводка", "today")],
    [B("Партнёр", "partner"), B("Выписка врачу", "history")],
    [B("Настройки уведомлений", "more")],
])
MORE_KB = InlineKeyboardMarkup([
    [B("История и выписка", "history"), B("Гид", "guides")],
    [B("Время сводки", "set:time")],
    [B("Утренние сводки: вкл/выкл", "toggle:summary")],
    [B("Назад", "menu")],
])
MALE_MORE_KB = InlineKeyboardMarkup([
    [B("История и выписка", "history")],
    [B("Время сводки", "set:time")],
    [B("Утренние сводки: вкл/выкл", "toggle:summary")],
    [B("Назад", "menu")],
])
EDIT_KB = InlineKeyboardMarkup([
    [B("Отметить месячные", "period")],
    [B("Длина цикла", "cyclelen"), B("Рост, вес, возраст", "profile_edit")],
    [B("История циклов", "addcycles")],
    [B("Время рассылки", "set:time")],
    [B("Назад", "menu")],
])
MALE_EDIT_KB = InlineKeyboardMarkup([
    [B("Рост, вес, возраст", "profile_edit")],
    [B("Время рассылки", "set:time")],
    [B("Назад", "menu")],
])
PERIOD_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Начались сегодня", callback_data="period_today")]])
SKIP_KB = InlineKeyboardMarkup([[InlineKeyboardButton("Пропустить", callback_data="prof_skip")]])
REPORT_PERIODS = frozenset({"3", "6", "all"})
HIST_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("3 месяца", callback_data="rep:3"), InlineKeyboardButton("6 месяцев", callback_data="rep:6")],
    [InlineKeyboardButton("Весь период", callback_data="rep:all")],
])
def report_prompt(u):
    if u and u.get("mode") == "male":
        return "За какой период собрать выписку по самочувствию?"
    return "За какой период собрать выписку для врача?"
def report_caption(u, label):
    if u and u.get("mode") == "male":
        return f"📄 Выписка по самочувствию, {label.lower()}. Можно показать терапевту."
    return f"📄 Выписка по циклу, {label.lower()}. Можно показать гинекологу."
ACT_KB = InlineKeyboardMarkup([
    [InlineKeyboardButton("Минимальная", callback_data="act:1"), InlineKeyboardButton("Лёгкая", callback_data="act:2")],
    [InlineKeyboardButton("Умеренная", callback_data="act:3"), InlineKeyboardButton("Высокая", callback_data="act:4")],
    [InlineKeyboardButton("Очень высокая", callback_data="act:5")],
])
def diet_kb(selected):
    rows = [[InlineKeyboardButton("Ограничений нет", callback_data="diet:none")]]
    rows += [[InlineKeyboardButton(("✓ " if code in selected else "") + ru, callback_data=f"diet:s:{code}")] for code, ru in _bot.DIET]
    rows.append([InlineKeyboardButton("Готово", callback_data="diet:done")]); return InlineKeyboardMarkup(rows)

def time_kb():
    times = ["07:00", "08:00", "09:00", "10:00", "21:00", "22:00"]
    return InlineKeyboardMarkup([[InlineKeyboardButton(t, callback_data=f"tm:{t}") for t in times[i:i + 3]] for i in (0, 3)])

def scheduled_hhmm(cid, hhmm):
    """The selected time is the delivery time, never a load-spreading hint."""
    h, m = map(int, hhmm.split(":"))
    return f"{h % 24:02d}:{m % 60:02d}", 0, 0

def summary_prepare_hhmm(cid, hhmm):
    """Spread expensive generation before, rather than after, delivery time."""
    try:
        lead = max(1, int(os.environ.get("AIWA_SUMMARY_PREPARE_MIN", "10")))
    except (TypeError, ValueError):
        lead = 10
    try:
        spread = max(1, int(os.environ.get("AIWA_SUMMARY_PREPARE_SPREAD_MIN", "20")))
    except (TypeError, ValueError):
        spread = 20
    h, m = map(int, hhmm.split(":"))
    total = (h * 60 + m - lead - (abs(int(cid)) % spread)) % (24 * 60)
    return f"{total // 60:02d}:{total % 60:02d}"

def schedule_text(cid, hhmm):
    """Пользователю показываем выбранное время — то же, что в профиле приложения.
    Внутренний сдвиг очереди рассылки (scheduled_hhmm) — деталь доставки, не UI."""
    shown = (_bot.row(cid) or {}).get("send_time") or hhmm or "08:00"
    return (
        f"Время сводки: {shown} по Москве — подготовлю заранее и начну отправку в это время. "
        "При высокой нагрузке доставка может занять несколько минут."
    )

def today_start_iso():
    """UTC boundary for canonical events_v2 timestamps."""
    return datetime.combine(
        datetime.now(_bot.TZ).date(), dtime.min, tzinfo=_bot.TZ
    ).astimezone(_bot.timezone.utc).isoformat()

def legacy_today_start_iso():
    """Moscow-local boundary for historical naive `events.ts` rows."""
    return datetime.combine(datetime.now(_bot.TZ).date(), dtime.min).isoformat()

def summary_sent_today(cid):
    c = _bot.db()
    r = c.execute(
        """SELECT 1 FROM events_v2
           WHERE user_key=? AND occurred_at>=?
             AND event_name IN ('summary_delivered','push_sent')
           LIMIT 1""",
        (_bot.A2.user_key(cid), today_start_iso()),
    ).fetchone()
    if not r:
        # Historical rows created before events_v2 remain readable.
        r = c.execute("""SELECT 1 FROM events
            WHERE chat_id=? AND ts>=? AND (
                (action='goal' AND meta='summary') OR
                (action='broadcast' AND (meta='sent' OR meta LIKE 'sent|%'))
            ) LIMIT 1""", (cid, legacy_today_start_iso())).fetchone()
    c.close()
    return bool(r)

_PERMANENT_PUSH_FAILURES = frozenset({"blocked", "chat_not_found", "user_deactivated"})
_RETRYABLE_PUSH_FAILURES = frozenset({"rate_limit", "timeout", "network"})

def _push_failure_class(exc):
    """Map Telegram exceptions to stable, privacy-safe delivery diagnostics."""
    if isinstance(exc, _bot.Forbidden):
        return "blocked"
    if isinstance(exc, _bot.RetryAfter):
        return "rate_limit"
    if isinstance(exc, _bot.TimedOut):
        return "timeout"
    if isinstance(exc, _bot.NetworkError):
        return "network"
    if isinstance(exc, _bot.BadRequest):
        text = str(exc or "").lower()
        if "chat not found" in text:
            return "chat_not_found"
        if "user is deactivated" in text or "user deactivated" in text:
            return "user_deactivated"
        return "bad_request"
    return "internal_or_unknown"

def _suppress_push_delivery(cid, reason):
    if reason not in _PERMANENT_PUSH_FAILURES:
        return False
    c = _bot.db()
    try:
        changed = c.execute(
            """UPDATE users
               SET push_suppressed_at=?, push_suppression_reason=?
               WHERE chat_id=? AND push_suppressed_at IS NULL""",
            (datetime.now(_bot.TZ).isoformat(), reason, cid),
        ).rowcount == 1
        c.commit()
        return changed
    finally:
        c.close()

def _clear_push_suppression(cid):
    """An inbound private Telegram update proves that this recipient is reachable again."""
    c = _bot.db()
    try:
        occurred_at = datetime.now(_bot.timezone.utc).isoformat()
        changed = c.execute(
            """UPDATE users
               SET push_suppressed_at=NULL, push_suppression_reason=NULL
               WHERE chat_id=? AND push_suppressed_at IS NOT NULL""",
            (cid,),
        ).rowcount == 1
        if changed:
            # Backfill uses immutable delivery/reachability history after a
            # restart. Persist the proof in the same transaction as the state
            # change so a queued best-effort event cannot re-suppress a user
            # who has already contacted the bot again.
            _bot.A2.insert_event_v2(
                c, cid, "user_message", meta="push_reachable",
                app_version=_bot.AIWA_VERSION, occurred_at=occurred_at,
            )
        c.commit()
        if changed:
            _bot.log.info("push delivery restored after inbound update: %s", cid)
        return changed
    finally:
        c.close()

def _backfill_push_suppressions():
    """Persist previously blocked recipients from immutable legacy and v2 history."""
    c = _bot.db()
    try:
        changed_legacy = c.execute(
            """UPDATE users
               SET push_suppressed_at=(
                     SELECT MAX(e.ts) FROM events e
                     WHERE e.chat_id=users.chat_id
                       AND e.action='broadcast' AND e.meta LIKE 'blocked|%'
                   ),
                   push_suppression_reason='blocked'
               WHERE push_suppressed_at IS NULL
                 AND EXISTS (
                     SELECT 1 FROM events e
                     WHERE e.chat_id=users.chat_id
                       AND e.action='broadcast' AND e.meta LIKE 'blocked|%'
                 )
                 AND (
                     SELECT MAX(e.ts) FROM events e
                     WHERE e.chat_id=users.chat_id
                       AND e.action='broadcast' AND e.meta LIKE 'blocked|%'
                 ) > COALESCE((
                     SELECT MAX(e.ts) FROM events e
                     WHERE e.chat_id=users.chat_id
                       AND (
                           (e.action='broadcast' AND e.meta LIKE 'sent|%')
                           OR e.action IN ('command','user_message','voice','button','suggest')
                       )
                 ), '')"""
        ).rowcount
        changed_v2 = 0
        users_by_key = {
            _bot.A2.user_key(cid): cid
            for (cid,) in c.execute(
                "SELECT chat_id FROM users WHERE push_suppressed_at IS NULL"
            ).fetchall()
        }
        # One indexed scan/group replaces an unbounded history query per user.
        # json_extract is safe here: analytics_v2 always stores an object.
        v2_states = c.execute(
            """SELECT user_key,
                      MAX(CASE
                          WHEN event_name='push_failed'
                           AND json_extract(properties_json,'$.delivery_status')='blocked'
                          THEN occurred_at ELSE '' END) AS latest_failed,
                      MAX(CASE
                          WHEN event_name!='push_failed'
                          THEN occurred_at ELSE '' END) AS latest_reachable
               FROM events_v2
               WHERE event_name IN (
                 'push_failed','push_sent','user_message_sent',
                 'screen_viewed','app_opened','legacy_message_interaction'
               )
               GROUP BY user_key"""
        ).fetchall()
        for key, latest_failed, latest_reachable in v2_states:
            cid = users_by_key.get(key)
            if cid is not None and latest_failed and latest_failed > (latest_reachable or ""):
                changed_v2 += c.execute(
                    """UPDATE users
                       SET push_suppressed_at=?,push_suppression_reason='blocked'
                       WHERE chat_id=? AND push_suppressed_at IS NULL""",
                    (latest_failed, cid),
                ).rowcount
        c.commit()
        changed = changed_legacy + changed_v2
        if changed:
            _bot.log.info("push suppression backfilled for %d blocked recipients", changed)
        return changed
    finally:
        c.close()

def _record_push_failure(cid, campaign, exc):
    """Record one attempt without leaking Telegram error text or identifiers."""
    failure_class = _push_failure_class(exc)
    permanent = failure_class in _PERMANENT_PUSH_FAILURES
    if permanent:
        _suppress_push_delivery(cid, failure_class)
    status = "blocked" if permanent else "error"
    _bot.ev(
        cid,
        "broadcast",
        meta="|".join((status, campaign or "unknown", failure_class,
                       "retryable" if failure_class in _RETRYABLE_PUSH_FAILURES else "terminal")),
    )
    return failure_class

def _claim_push_delivery(cid, campaign):
    """Atomically reserve a push using a recoverable lease, not a permanent lock."""
    if not campaign:
        return True
    try:
        lease_seconds = max(60, int(os.environ.get("AIWA_PUSH_CLAIM_TTL_SEC", "900")))
    except (TypeError, ValueError):
        lease_seconds = 900
    now = datetime.now(_bot.TZ)
    now_iso = now.isoformat()
    stale_before = (now - timedelta(seconds=lease_seconds)).isoformat()
    c = _bot.db()
    try:
        c.execute("BEGIN IMMEDIATE")
        already_sent = c.execute(
            """SELECT 1 FROM events
               WHERE chat_id=? AND action='broadcast' AND meta=?
               LIMIT 1""",
            (cid, "sent|" + campaign),
        ).fetchone()
        if not already_sent:
            already_sent = c.execute(
                """SELECT 1 FROM events_v2
                   WHERE user_key=? AND event_name='push_sent'
                     AND json_extract(properties_json,'$.campaign_id')=?
                   LIMIT 1""",
                (_bot.A2.user_key(cid), campaign),
            ).fetchone()
        if already_sent:
            c.execute(
                """INSERT OR IGNORE INTO push_deliveries
                   (chat_id,campaign_id,status,claimed_at,sent_at)
                   VALUES(?,?,'sent',?,?)""",
                (cid, campaign, now_iso, now_iso),
            )
            c.commit()
            return False
        claimed = c.execute(
            """INSERT OR IGNORE INTO push_deliveries
               (chat_id,campaign_id,status,claimed_at)
               VALUES(?,?,'claimed',?)""",
            (cid, campaign, now_iso),
        ).rowcount == 1
        if not claimed:
            # A process may die after claiming and before completing. Reclaim only
            # an expired in-flight lease; a sent row is never reopened.
            claimed = c.execute(
                """UPDATE push_deliveries
                   SET claimed_at=?, sent_at=NULL
                   WHERE chat_id=? AND campaign_id=? AND status='claimed'
                     AND claimed_at<=?""",
                (now_iso, cid, campaign, stale_before),
            ).rowcount == 1
        c.commit()
        return claimed
    finally:
        c.close()

def _complete_push_delivery(cid, campaign):
    if not campaign:
        return
    c = _bot.db()
    try:
        c.execute(
            """UPDATE push_deliveries
               SET status='sent', sent_at=?
               WHERE chat_id=? AND campaign_id=?""",
            (datetime.now(_bot.TZ).isoformat(), cid, campaign),
        )
        c.commit()
    finally:
        c.close()

def _release_push_delivery(cid, campaign):
    """Allow retry only when Telegram definitely rejected the send."""
    if not campaign:
        return
    c = _bot.db()
    try:
        c.execute(
            """DELETE FROM push_deliveries
               WHERE chat_id=? AND campaign_id=? AND status='claimed'""",
            (cid, campaign),
        )
        c.commit()
    finally:
        c.close()

def should_catchup_broadcast(cid, hhmm):
    actual, _, _ = scheduled_hhmm(cid, hhmm)
    h, m = map(int, actual.split(":"))
    now = datetime.now(_bot.TZ)
    due = datetime.combine(now.date(), dtime(h, m), tzinfo=_bot.TZ)
    try:
        hours = max(1, int(os.environ.get("AIWA_BROADCAST_CATCHUP_HOURS", "16")))
    except (TypeError, ValueError):
        hours = 16
    return due <= now <= due + timedelta(hours=hours) and not summary_sent_today(cid)

async def enqueue_broadcast(cid, meta="queued"):
    if (_bot.row(cid) or {}).get("push_suppressed_at"):
        return False
    if summary_sent_today(cid):
        return False
    if cid in _bot.BCAST_PENDING:
        return False
    _bot.BCAST_PENDING.add(cid)
    _bot.ev(cid, "broadcast", meta=f"queued|{bot.campaign_id('daily_summary')}")
    if _bot.BCAST_Q is not None:
        await _bot.BCAST_Q.put(cid)
        return True
    _bot.BCAST_PENDING.discard(cid)
    return False

def en_kb(p, labels=None):
    _bot.L = labels or _bot.EN
    return InlineKeyboardMarkup([[InlineKeyboardButton(_bot.L[i].capitalize(), callback_data=f"ci:{p}:{i}") for i in (1, 2, 3)]])
def sym_kb(selected):
    rows = [[InlineKeyboardButton(("✓ " if code in selected else "") + ru, callback_data=f"ci:s:{code}")] for code, ru in _bot.SYMPTOMS]
    rows.append([InlineKeyboardButton("Свой симптом", callback_data="ci:custom")])
    rows.append([InlineKeyboardButton("Готово", callback_data="ci:done")]); return InlineKeyboardMarkup(rows)
def sugg_kb(cid, items, app_user=None, app_label=None, feedback_id=None, campaign=None):
    def _short(t): return t if len(t) <= 28 else t[:26].rstrip(" ,.-") + "…"
    # единая точка сборки кнопок: каждый саджест с заглавной буквы (в т.ч. статичные)
    norm = getattr(_bot.L, "_norm_sugg1", None)
    items = _bot.guard_aiwa_suggestions(cid, items)
    items = [(norm(t) if norm else t) for t in items if t]
    rows = [[B(_short(t), f"q:{bot.add_sugg(cid,t)}")] for t in items[:2]]
    if app_user and _bot.AIWA_WEBAPP_URL:
        app_tab = {
            "Открыть дневник": "food",
            "Открыть питание": "food",
            "Открыть нагрузку": "train",
        }.get(app_label)
        rows.append([InlineKeyboardButton(app_label or _bot.APP_BUTTON_TEXT,
                     web_app=WebAppInfo(url=_bot.campaign_webapp_url(app_user, campaign, app_tab)))])
    if feedback_id:
        rows.append([B("👍 Полезно", f"fb:helpful:{feedback_id}"),
                     B("👎 Не помогло", f"fb:unhelpful:{feedback_id}")])
    return InlineKeyboardMarkup(rows)
def summary_kb(u=None, campaign=None):
    rows = []
    if _bot.AIWA_WEBAPP_URL:
        rows.append([InlineKeyboardButton(_bot.APP_BUTTON_TEXT, web_app=WebAppInfo(url=_bot.campaign_webapp_url(u, campaign)))])
    return InlineKeyboardMarkup(rows)
def summary_suggestions(st):
    if not st:
        return ["Что важно сегодня?", "Что отметить?"]
    if st.get("status") == "due":
        return ["Тест уже делать?", "Почему сдвигается?"]
    if st.get("status") == "delay":
        d = int(st.get("delay_days") or 0)
        if d >= 10:
            return ["Когда к врачу?", "Что проверить?"]
        return ["Тест на ХГЧ?", "Почему задержка?"]
    if st.get("status") == "stale":
        return ["Как обновить календарь?", "Что проверить?"]
    ph = st.get("phase")
    return {
        "menstrual": ["Как снизить боль?", "Что есть при месячных?"],
        "follicular": ["Какая тренировка?", "Что есть сегодня?"],
        "ovulation": ["Когда фертильное окно?", "Можно интенсивнее?"],
        "luteal": ["Как пережить ПМС?", "Что съесть вечером?"],
    }.get(ph, ["Что важно сегодня?", "Что отметить?"])
def general_summary_suggestions(u):
    mode = (u or {}).get("mode")
    if mode == "meno":
        return ["Почему приливы?", "Какие чекапы?"]
    if mode == "preg":
        return ["Что есть сейчас?", "Какая активность?"]
    if mode == "irregular":
        return ["Почему цикл скачет?", "Что отмечать?"]
    return ["Что важно сегодня?", "Что отметить?"]
def summary_sugg_kb(cid, u=None, st=None, app_label=None, campaign=None):
    items = summary_suggestions(st) if st is not None else general_summary_suggestions(u)
    return sugg_kb(cid, items, app_user=u, app_label=app_label or _bot.APP_BUTTON_TEXT, campaign=campaign)
def merge_summary_suggestions(u=None, st=None, extra=None):
    items = [x for x in (extra or []) if x]
    fallback = summary_suggestions(st) if st is not None else general_summary_suggestions(u)
    for x in fallback:
        if len(items) >= 2: break
        if x not in items: items.append(x)
    return items[:2]
