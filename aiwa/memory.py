"""Секция «memory» aiwa_bot.py — перенесена механически (модульный монолит).

Внешнее состояние читается через aiwa_bot в момент вызова — см.
docs/architecture/monolith-split-plan.md.
"""
import asyncio
from datetime import date
from datetime import datetime
from datetime import time as dtime
import io
import json
import os
from datetime import timedelta
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

import aiwa_bot as _bot

MEM_MAX = 40
def mem_all(cid):
    try:
        c = _bot.db(); rows = c.execute("SELECT mkey, mval, updated FROM memory WHERE chat_id=? ORDER BY updated DESC", (cid,)).fetchall(); c.close()
        return [{"key": r[0], "value": r[1], "updated": r[2]} for r in rows]
    except Exception:
        return []
def mem_set(cid, key, val):
    key = (key or "").strip().lower()[:48]; val = (val or "").strip()[:220]
    if not key or not val:
        return False
    try:
        c = _bot.db()
        if not _bot._user_write_allowed(cid, conn=c):
            c.close(); return False
        c.execute("INSERT OR REPLACE INTO memory(chat_id, mkey, mval, updated) VALUES(?,?,?,?)",
                  (cid, key, val, datetime.now(_bot.TZ).isoformat()))
        c.execute("DELETE FROM memory WHERE chat_id=? AND mkey NOT IN (SELECT mkey FROM memory WHERE chat_id=? ORDER BY updated DESC LIMIT ?)",
                  (cid, cid, _bot.MEM_MAX))
        c.commit(); c.close(); return True
    except Exception as e:
        _bot.log.warning("mem_set: %s", e); return False
def mem_delete(cid, key):
    try:
        c = _bot.db(); c.execute("DELETE FROM memory WHERE chat_id=? AND mkey=?", (cid, (key or "").strip().lower())); c.commit(); c.close(); return True
    except Exception:
        return False
def mem_text(cid, limit=16):
    rows = _bot.mem_all(cid)[:limit]
    if not rows:
        return ""
    return "; ".join((r["key"] + ": " + r["value"]) for r in rows)
def _with_memory(cid, q):
    mt = _bot.mem_text(cid)
    if mt:
        subject = "нём" if _bot.is_male_profile(_bot.row(cid)) else "ней"
        return q + f"\n\nЧто ты уже знаешь о {subject} из прошлых разговоров (долгая память) — учитывай, но не перечисляй вслух без надобности: " + mt
    return q

def _ref_touch(cid, src):
    """Первое касание источника перехода (deep-link ?start=<source>)."""
    try:
        c = _bot.db()
        if not _bot._user_write_allowed(cid, conn=c):
            c.close(); return False
        c.execute("INSERT OR IGNORE INTO referrals(chat_id, source, ts) VALUES(?,?,?)",
                            (cid, src, datetime.now(_bot.TZ).isoformat())); c.commit(); c.close()
        return True
    except Exception as e:
        _bot.log.warning("ref_touch: %s", e)

def _proactive_signals(cid, slot="eve"):
    out = []
    try:
        u = _bot.row(cid); _, st = _bot.status_of(cid); today = _bot.dtoday()
        male = _bot.is_male_profile(u)
        tlog = _bot.log_get(cid, today.isoformat()) or {}
        ylog = _bot.log_get(cid, (today - timedelta(days=1)).isoformat()) or {}
        badY = (ylog.get("energy") == 1) or (ylog.get("mood") == 1) or any(x in (ylog.get("symptoms") or []) for x in ("anx", "low", "tired", "irrit"))
        checkedToday = bool(tlog.get("energy") or tlog.get("mood") or (tlog.get("symptoms")))
        if badY and not checkedToday:
            out.append({"key": "felt_bad", "score": 78, "cooldown": 2,
                        "topic": (("вчера ему было тяжело" if male else "вчера ей было тяжело") + " (низкая энергия/настроение или тревожные симптомы) — мягко предложи поддержку"),
                        "data": "вчера энергия=%s, настроение=%s, симптомы=%s" % (ylog.get("energy"), ylog.get("mood"), ",".join(ylog.get("symptoms") or []))})
        if st and st.get("days_to_next") in (2, 3, 4) and (u.get("mode") in (None, "cycle")):
            out.append({"key": "pms_soon", "score": 66, "cooldown": 18,
                        "topic": "через %s дня ожидаются месячные, приближается ПМС — тёплое предупреждение и что поможет" % st.get("days_to_next"),
                        "data": "фаза %s, до месячных %s дн" % (st.get("phase_ru"), st.get("days_to_next"))})
        logs = _bot.logs_of(cid, (today - timedelta(days=4)).isoformat()) or []
        lowe = [l for l in logs if l.get("energy") == 1]
        if len(lowe) >= 2:
            out.append({"key": "low_energy", "score": 70, "cooldown": 3,
                        "topic": "несколько дней подряд низкая энергия — поддержи и мягко предложи разгрузку: снизить нагрузку, прогуляться или лечь спать пораньше",
                        "data": "низкая энергия в %s из последних дней" % len(lowe)})
        rw = _bot.workouts_recent(cid, days=12, limit=3) or []
        if rw:
            try:
                gap = (today - date.fromisoformat(rw[0].get("d"))).days
            except Exception:
                gap = 99
            if gap >= 5:
                out.append({"key": "no_move", "score": 46, "cooldown": 4,
                            "topic": (
                                "давно не было тренировки (%s дн) — мягко пригласи "
                                "подвигаться с учётом восстановления" % gap
                                if male else
                                "давно не было тренировки (%s дн) — мягко пригласи подвигаться под её фазу" % gap
                            ),
                            "data": (
                                "последняя тренировка %s дней назад" % gap
                                if male else
                                "последняя тренировка %s дней назад, фаза %s" % (gap, (st or {}).get("phase_ru"))
                            )})
        try:
            streak = _bot.streak_of(cid)
        except Exception:
            streak = 0
        if streak in (3, 7, 14, 30):
            out.append({"key": "streak_%s" % streak, "score": 56, "once": True,
                        "topic": "коротко и по-взрослому отметь, что %s %s дней подряд ведёт отметки, и спокойно предложи продолжить — без слащавости, без фраз вроде порадуй себя" % (
                            "он" if male else "она", streak,
                        ),
                        "data": "стрик %s дней" % streak})
        if slot == "eve":
            try:
                dp = _bot.diary_payload(cid); tot = dp.get("totals") or {}; tgt = dp.get("target") or {}
                if tgt.get("protein") and (tot.get("protein") is not None) and tot["protein"] < 0.5 * tgt["protein"]:
                    out.append({"key": "low_protein", "score": 40, "cooldown": 3,
                                "topic": "сегодня мало белка к вечеру — подскажи добавить белок к ужину",
                                "data": "белок %s из %s г" % (round(tot.get("protein", 0)), round(tgt.get("protein", 0)))})
            except Exception:
                pass
    except Exception as e:
        _bot.log.warning("proactive_signals: %s", e)
    return out

_PA_TAB = {"no_move": "train", "low_protein": "food"}
_PA_ACTION = {"no_move": ("Да, собери тренировку", "train"),
              "low_protein": ("Что съесть на ужин?", "food")}
def _pa_deeplink(wu, key):
    tab = _bot._PA_TAB.get(key)
    if not wu or not tab:
        return wu
    sep = "&" if "?" in wu else "?"
    return wu + sep + "tab=" + tab

async def _proactive_pick_and_send(cid, slot, shadow, context):
    u = _bot.row(cid)
    if not _bot.is_onboarded(u):
        return None
    if _bot._pa_logged_today(cid):
        return None
    cands = [
        c for c in _bot._proactive_signals(cid, slot)
        if not _bot._pa_suppressed(cid, c)
    ]
    cands = [c for c in cands if c["score"] >= _bot.PROACTIVE_MIN]
    if not cands:
        return None
    best = max(cands, key=lambda x: x["score"])
    _u = []
    text = await _bot.llm_to_thread(
        cid, "proactive_message", _bot.L.proactive_compose,
        best["topic"], best.get("data", ""), u.get("mode"), _u,
    )
    if _u:
        _bot.ev(cid, "tokens", sum(_u), meta="proactive_compose", calls=len(_u), usage=_u)
    text = _bot.guard_aiwa_reply(cid, (text or "").strip())
    if not text:
        return None
    if shadow:
        # Shadow evaluation must not consume a lifetime milestone before the
        # user has actually received it. Recurring cooldown signals keep the
        # old marking behaviour so shadow runs stay bounded.
        if not best.get("once"):
            _bot._pa_mark(cid, best["key"])
        _bot._pa_logrow(cid, best["key"], best["score"], 0, text)
        _bot.ev(cid, "proactive", meta="shadow:" + best["key"])
    else:
        _campaign = _bot.campaign_id("proactive_" + best["key"])
        wu = _bot.campaign_webapp_url(u, _campaign, _bot._PA_TAB.get(best["key"]))
        rows = []
        _act = _bot._PA_ACTION.get(best["key"])
        if _act:
            rows.append([InlineKeyboardButton(_act[0], callback_data=f"pado:{_campaign}:{_act[1]}")])
        if wu:
            rows.append([InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=wu))])
        kb = InlineKeyboardMarkup(rows) if rows else None
        await context.bot.send_message(cid, text, reply_markup=kb)
        _bot._pa_mark(cid, best["key"]); _bot._pa_logrow(cid, best["key"], best["score"], 1, text)
        _bot.ev(cid, "broadcast", meta="sent|" + _campaign)
    return (best["key"], best["score"], text)

async def proactive_job(context, slot):
    if not _bot._proactive_enabled():
        return
    shadow = os.environ.get("AIWA_PROACTIVE_SHADOW", "1") not in ("0", "false", "False", "no", "off")
    delay = float(os.environ.get("AIWA_PROACTIVE_DELAY", "0.3"))
    n = 0
    for cid in _bot.all_users():
        try:
            if not _bot._proactive_on(cid):
                continue
            r = await _bot._proactive_pick_and_send(cid, slot, shadow, context)
            if r:
                n += 1
                await asyncio.sleep(delay)
        except _bot.Forbidden as exc:
            _bot._record_push_failure(cid, _bot.campaign_id("proactive"), exc)
        except Exception as e:
            _bot._record_push_failure(cid, _bot.campaign_id("proactive"), e)
            _bot.log.warning("proactive_job(%s): %s", slot, e)
    _bot.log.info("proactive %s: %s (%s)", slot, n, "shadow" if shadow else "sent")

async def proactive_job_mid(context):
    await _bot.proactive_job(context, "mid")
async def proactive_job_eve(context):
    await _bot.proactive_job(context, "eve")

async def _proactive_preview(compose_limit=4, scan_limit=500):
    rows = []; composed = 0; scanned = 0
    for cid in _bot.all_users():
        if scanned >= scan_limit:
            break
        scanned += 1
        try:
            u = _bot.row(cid)
            if not _bot.is_onboarded(u):
                continue
            cands = [c for c in _bot._proactive_signals(cid, "eve") if c["score"] >= _bot.PROACTIVE_MIN]
            if not cands:
                continue
            best = max(cands, key=lambda x: x["score"])
            text = ""
            if composed < compose_limit:
                _u = []
                try:
                    text = await _bot.llm_to_thread(
                        cid, "proactive_message", _bot.L.proactive_compose,
                        best["topic"], best.get("data", ""), u.get("mode"), _u,
                    )
                    text = _bot.guard_aiwa_reply(cid, text)
                except Exception:
                    text = ""
                composed += 1
                if _u: _bot.ev(cid, "tokens", sum(_u), meta="proactive_preview", calls=len(_u), usage=_u)
            rows.append((cid, best["key"], best["score"], (text or "").strip()))
        except Exception as e:
            _bot.log.warning("proactive_preview: %s", e)
    return rows

async def proactive_cmd(update, context):
    cid = update.effective_chat.id
    if not _bot.AIWA_ADMIN or str(cid) != str(_bot.AIWA_ADMIN):
        return await update.message.reply_text("Команда только для админа.")
    try:
        await update.message.reply_text("Считаю дай-ран проактива по реальным данным… (несколько примеров с текстом, остальное — сигналами)")
        rows = await _bot._proactive_preview()
        if not rows:
            return await update.message.reply_text("Сегодня ни одного проактивного сообщения не сработало бы (сигналов выше порога %s нет)." % _bot.PROACTIVE_MIN)
        blocks = []
        for r in rows[:25]:
            line = "• user %s · %s (%s)" % (r[0], r[1], r[2])
            if r[3]:
                line += "\n" + r[3][:400]
            blocks.append(line)
        msg = ("Проактив — дай-ран (порог %s). Сработало бы у %s:\n\n" % (_bot.PROACTIVE_MIN, len(rows))) + "\n\n".join(blocks)
        for i in range(0, len(msg), 3500):
            await update.message.reply_text(msg[i:i + 3500])
        await update.message.reply_text("Живая отправка: AIWA_PROACTIVE=%s, SHADOW=%s. Реальную отправку включает AIWA_PROACTIVE=1 + AIWA_PROACTIVE_SHADOW=0." % (
            os.environ.get("AIWA_PROACTIVE", "0"), os.environ.get("AIWA_PROACTIVE_SHADOW", "1")))
    except Exception as e:
        _bot.log.warning("proactive_cmd: %s", e)
        try:
            await update.message.reply_text("Дай-ран упал с ошибкой: %s" % e)
        except Exception:
            pass

def _remove_daily_jobs(app, cid):
    for name in (str(cid), f"prepare:{cid}"):
        for job in app.job_queue.get_jobs_by_name(name):
            job.schedule_removal()

def schedule_daily(app, cid, hhmm):
    _bot._remove_daily_jobs(app, cid)
    user = _bot.row(cid)
    if user and not user.get("daily_summary_enabled", True):
        return
    actual, _, _ = _bot.scheduled_hhmm(cid, hhmm)
    prepare_at = _bot.summary_prepare_hhmm(cid, actual)
    ph, pm = map(int, prepare_at.split(":"))
    h, m = map(int, actual.split(":"))
    app.job_queue.run_daily(
        _bot.summary_prepare_job,
        time=dtime(ph, pm, tzinfo=_bot.TZ),
        chat_id=cid,
        name=f"prepare:{cid}",
        data={"delivery_hhmm": actual},
    )
    app.job_queue.run_daily(_bot.daily_job, time=dtime(h, m, tzinfo=_bot.TZ), chat_id=cid, name=str(cid))

def set_daily_time(app, cid, hhmm):
    """An explicit delivery-time choice also explicitly enables summaries."""
    _bot.upsert(
        cid,
        send_time=hhmm,
        daily_summary_enabled=1,
        state=None,
    )
    _bot.schedule_daily(app, cid, hhmm)

def _save_period_start_atomic(cid, iso, user_generation=None, protect_modes=False, enforce_spacing=False,
                              mutation_key=None, args_hash=None):
    """Одна транзакция для cycles + users, включая проверку lifecycle и текущего режима."""
    event_date = date.fromisoformat(iso)
    c = _bot.db(); c.execute("BEGIN IMMEDIATE")
    if not _bot._user_write_allowed(cid, user_generation, conn=c):
        c.close(); return {"status": "stale"}
    if mutation_key:
        prior = c.execute(
            "SELECT kind,record_id,args_hash,result_json FROM chat_mutations WHERE chat_id=? AND mutation_key=?",
            (cid, mutation_key),
        ).fetchone()
        if prior:
            c.commit(); c.close()
            status = "mismatch" if prior[0] != "period_start" or (prior[2] or "") != (args_hash or "") else "duplicate"
            try: saved_data = json.loads(prior[3] or "{}")
            except (TypeError, ValueError): saved_data = {}
            return {"status": status, "date": saved_data.get("date") or prior[1]}
    user = c.execute("SELECT cycle_len,mode FROM users WHERE chat_id=?", (cid,)).fetchone()
    if not user:
        c.close(); return {"status": "stale"}
    mode = user[1] or "cycle"
    if protect_modes and mode in ("preg", "meno", "male"):
        c.commit(); c.close(); return {"status": "protected", "mode": mode}
    starts = [x[0] for x in c.execute(
        "SELECT start_date FROM cycles WHERE chat_id=? ORDER BY start_date", (cid,)
    ).fetchall()]
    if iso in starts:
        if mutation_key:
            c.execute(
                """INSERT INTO chat_mutations
                   (chat_id,mutation_key,generation,kind,record_id,args_hash,result_json,created_at)
                   VALUES(?,?,?,?,?,?,?,?)""",
                (cid, mutation_key, int(user_generation), "period_start", iso, args_hash or "",
                 json.dumps({"date": iso}), datetime.now(_bot.TZ).isoformat()),
            )
        c.commit(); c.close(); return {"status": "duplicate", "date": iso}
    if enforce_spacing:
        close = [x for x in starts if 0 < abs((event_date - date.fromisoformat(x)).days) <= 10]
        if close:
            c.commit(); c.close(); return {"status": "conflict", "date": max(close)}
    c.execute("INSERT INTO cycles(chat_id,start_date) VALUES(?,?)", (cid, iso))
    latest = max(starts + [iso])
    if latest == iso:
        c.execute(
            """UPDATE users SET last_period=?,cycle_len=?,mode='cycle',state=NULL,
               period_end=NULL,period_len=NULL WHERE chat_id=?""",
            (latest, user[0] or 28, cid),
        )
    else:
        c.execute(
            "UPDATE users SET last_period=?,cycle_len=?,mode='cycle',state=NULL WHERE chat_id=?",
            (latest, user[0] or 28, cid),
        )
    if mutation_key:
        c.execute(
            """INSERT INTO chat_mutations
               (chat_id,mutation_key,generation,kind,record_id,args_hash,result_json,created_at)
               VALUES(?,?,?,?,?,?,?,?)""",
            (cid, mutation_key, int(user_generation), "period_start", iso, args_hash or "",
             json.dumps({"date": iso}), datetime.now(_bot.TZ).isoformat()),
        )
    c.commit(); c.close()
    return {"status": "created", "date": iso}

def _save_period_end_atomic(cid, end_iso, user_generation=None, mutation_key=None, args_hash=None):
    event_date = date.fromisoformat(end_iso)
    c = _bot.db(); c.execute("BEGIN IMMEDIATE")
    if not _bot._user_write_allowed(cid, user_generation, conn=c):
        c.close(); return {"status": "stale"}
    if mutation_key:
        prior = c.execute(
            "SELECT kind,record_id,args_hash,result_json FROM chat_mutations WHERE chat_id=? AND mutation_key=?",
            (cid, mutation_key),
        ).fetchone()
        if prior:
            c.commit(); c.close()
            status = "mismatch" if prior[0] != "period_end" or (prior[2] or "") != (args_hash or "") else "duplicate"
            try: saved_data = json.loads(prior[3] or "{}")
            except (TypeError, ValueError): saved_data = {}
            return dict(saved_data, status=status)
    user = c.execute("SELECT last_period,mode FROM users WHERE chat_id=?", (cid,)).fetchone()
    if not user:
        c.commit(); c.close(); return {"status": "missing"}
    if (user[1] or "cycle") == "male":
        c.commit(); c.close(); return {"status": "protected", "mode": "male"}
    if (user[1] or "cycle") in ("irregular", "none", "meno", "preg") or not user[0]:
        c.commit(); c.close(); return {"status": "missing"}
    start_iso = user[0]
    length = (event_date - date.fromisoformat(start_iso)).days + 1
    if not 1 <= length <= 10:
        c.commit(); c.close(); return {"status": "invalid"}
    c.execute("UPDATE cycles SET end_date=? WHERE chat_id=? AND start_date=?", (end_iso, cid, start_iso))
    c.execute("UPDATE users SET period_end=?,period_len=? WHERE chat_id=?", (end_iso, length, cid))
    if mutation_key:
        result = {"start": start_iso, "end": end_iso, "length": length}
        c.execute(
            """INSERT INTO chat_mutations
               (chat_id,mutation_key,generation,kind,record_id,args_hash,result_json,created_at)
               VALUES(?,?,?,?,?,?,?,?)""",
            (cid, mutation_key, int(user_generation), "period_end", end_iso, args_hash or "",
             json.dumps(result), datetime.now(_bot.TZ).isoformat()),
        )
    c.commit(); c.close()
    return {"status": "saved", "start": start_iso, "end": end_iso, "length": length}

def db_mark_period(cid, iso, user_generation=None):
    """Записывает старт месячных атомарно. Без планировщика, безопасно из веб-обработчика."""
    return _bot._save_period_start_atomic(
        cid, iso, user_generation=user_generation, protect_modes=True,
    ).get("status") in (
        "created", "duplicate",
    )
def mark_period(context, cid, iso, user_generation=None):
    if not _bot.db_mark_period(cid, iso, user_generation=user_generation):
        return False
    if user_generation is not None and not _bot._user_write_allowed(cid, user_generation):
        return False
    _bot.schedule_daily(context.application, cid, _bot.row(cid)["send_time"] or "08:00")
    return True
async def think_llm(context, cid, fn, *args, **kwargs):
    """Выполняет тяжёлый вызов модели в фоне и держит индикатор «печатает» живым."""
    request_id = kwargs.pop("_request_id", None) or ("r_" + _bot.secrets.token_hex(16))
    purpose = kwargs.pop("_purpose", None) or getattr(fn, "__name__", "llm_call").lstrip("_")
    def run():
        with _bot.L.call_context(user_key=_bot.A2.user_key(cid), request_id=request_id, purpose=purpose):
            return fn(*args, **kwargs)
    task = asyncio.create_task(asyncio.to_thread(run))
    while not task.done():
        try: await context.bot.send_chat_action(cid, "typing")
        except Exception: pass
        await asyncio.wait({task}, timeout=4)
    return task.result()

class _BCtx:
    def __init__(self, app): self.bot = app.bot; self.application = app

async def summary_prepare_job(context: _bot.ContextTypes.DEFAULT_TYPE):
    cid = context.job.chat_id
    if not (_bot.row(cid) or {}).get("daily_summary_enabled", True):
        _bot._remove_daily_jobs(context.application, cid)
        return
    try:
        actual = ((context.job.data or {}).get("delivery_hhmm")
                  if getattr(context.job, "data", None) is not None else None)
        target = _bot.dtoday()
        if actual:
            ah, am = map(int, actual.split(":"))
            prepare_at = _bot.summary_prepare_hhmm(cid, actual)
            ph, pm = map(int, prepare_at.split(":"))
            if ph * 60 + pm > ah * 60 + am:
                target += timedelta(days=1)
        await _bot.prepare_daily_summary(cid, target.isoformat())
    except Exception as exc:
        # Delivery still runs at the selected time and can generate on demand or
        # fall back, so preparation failure must never cancel the send job.
        _bot.log.warning("summary prepare %s: %s", cid, exc)

async def daily_job(context: _bot.ContextTypes.DEFAULT_TYPE):
    cid = context.job.chat_id
    user = _bot.row(cid) or {}
    if not user.get("daily_summary_enabled", True) or user.get("push_suppressed_at"):
        _bot._remove_daily_jobs(context.application, cid)
        return
    if _bot.BCAST_Q is not None:
        return await _bot.enqueue_broadcast(cid)    # в очередь, обработает воркер с паузами
    try:
        sent = await _bot.push_summary(context, cid, campaign=_bot.campaign_id("daily_summary"))
        if sent:
            await _bot.push_partner(context, cid)
        await _bot.push_checkin(context, cid, campaign=_bot.campaign_id("daily_checkin"))
    except _bot.Forbidden as exc:
        _bot._record_push_failure(cid, _bot.campaign_id("daily_summary"), exc)
        try:
            _bot._remove_daily_jobs(context.application, cid)
        except Exception: pass
    except Exception as e:
        _bot._record_push_failure(cid, _bot.campaign_id("daily_summary"), e)
        raise

async def broadcast_worker(app):
    """Один из нескольких параллельных воркеров рассылки. Реальный лимит GigaChat держит семафор в llm._call, поэтому большая пауза не нужна."""
    delay = float(os.environ.get("AIWA_BROADCAST_DELAY", "0.05"))
    while True:
        cid = await _bot.BCAST_Q.get()
        try:
            ctx = _bot._BCtx(app)
            sent = await _bot.push_summary(ctx, cid, campaign=_bot.campaign_id("daily_summary"))
            if sent:
                await _bot.push_partner(ctx, cid)
            await _bot.push_checkin(ctx, cid, campaign=_bot.campaign_id("daily_checkin"))
        except _bot.Forbidden as exc:
            try:
                _bot._record_push_failure(cid, _bot.campaign_id("daily_summary"), exc)
                _bot._remove_daily_jobs(app, cid)
            except Exception: pass
            _bot.log.info("broadcast %s: заблокирован пользователем, снял с рассылки", cid)
        except Exception as e:
            try: _bot._record_push_failure(cid, _bot.campaign_id("daily_summary"), e)
            except Exception: pass
            _bot.log.warning("broadcast %s: %s", cid, e)
        finally:
            _bot.BCAST_PENDING.discard(cid)
            _bot.BCAST_Q.task_done()
        await asyncio.sleep(delay)

def _phase_of(cid):
    try:
        _, st = _bot.status_of(cid); return (st or {}).get("phase")
    except Exception:
        return None

def food_reminder_text(cid):
    base = "🍽 Не забудь отметить обед. Пришли фото тарелки, напиши текстом или добавь вручную — Айва посчитает КБЖУ."
    tip = {"menstrual": "Сейчас менструация — добавь железо: гречка, красное мясо, зелень, гранат.",
           "follicular": "Ты в фолликулярной фазе — упор на белок и овощи, углеводы усваиваются хорошо.",
           "ovulation": "Овуляция — лёгкая клетчатка, белок и побольше воды.",
           "luteal": "Лютеиновая фаза — магний и белок помогут с тягой к сладкому и сытостью."}.get(_bot._phase_of(cid))
    return base + (("\n\n" + tip) if tip else "")

def train_reminder_text(cid):
    male = (_bot.row(cid) or {}).get("mode") == "male"
    base = (
        "🏋️ Ещё не отметил тренировку сегодня? Даже 20 минут считается. "
        "Отметь — Айва разберёт нагрузку и подскажет следующую."
        if male else
        "🏋️ Ещё не отмечала тренировку сегодня? Даже 20 минут считается. "
        "Отметь — Айва разберёт нагрузку и подскажет следующую."
    )
    tip = {"menstrual": "Сейчас менструация — подойдёт лёгкое: ходьба, растяжка, мягкая йога.",
           "follicular": "Фолликулярная фаза — хорошее окно для силовой или интенсива.",
           "ovulation": "Овуляция — сил много, но береги связки.",
           "luteal": "Лютеиновая фаза — спокойное кардио или зона 2, без рекордов."}.get(_bot._phase_of(cid))
    return base + (("\n\n" + tip) if tip else "")

async def push_food_reminder(context, cid):
    u = _bot.row(cid)
    if not _bot.is_onboarded(u) or not _bot._proactive_preference_on(cid): return
    if _bot.meals_of(cid, _bot.dtoday().isoformat()): return   # уже отметила еду сегодня — не дёргаем
    campaign = _bot.campaign_id("food_reminder")
    wu = _bot.campaign_webapp_url(u, campaign, "food")
    kb = InlineKeyboardMarkup([[InlineKeyboardButton("🍎 Отметить еду", web_app=WebAppInfo(url=wu))]]) if wu else None
    await context.bot.send_message(cid, _bot.food_reminder_text(cid), reply_markup=kb)
    _bot.ev(cid, "broadcast", meta="sent|" + campaign)

async def push_train_reminder(context, cid):
    u = _bot.row(cid)
    if not _bot.is_onboarded(u) or not _bot._proactive_preference_on(cid): return
    if _bot.workouts_of(cid, _bot.dtoday().isoformat()): return   # уже отметила тренировку — не дёргаем
    campaign = _bot.campaign_id("train_reminder")
    wu = _bot.campaign_webapp_url(u, campaign, "train")
    kb = InlineKeyboardMarkup([[InlineKeyboardButton("🏋️ Отметить тренировку", web_app=WebAppInfo(url=wu))]]) if wu else None
    await context.bot.send_message(cid, _bot.train_reminder_text(cid), reply_markup=kb)
    _bot.ev(cid, "broadcast", meta="sent|" + campaign)

async def train_worker(app):
    delay = float(os.environ.get("AIWA_TRAIN_DELAY", "0.3"))
    while True:
        cid = await _bot.TRAIN_Q.get()
        try:
            await _bot.push_train_reminder(_bot._BCtx(app), cid)
        except _bot.Forbidden as exc:
            _bot._record_push_failure(cid, _bot.campaign_id("train_reminder"), exc)
            _bot.log.info("train reminder %s: заблокирован", cid)
        except Exception as e:
            _bot._record_push_failure(cid, _bot.campaign_id("train_reminder"), e)
            _bot.log.warning("train reminder %s: %s", cid, e)
        finally:
            _bot.TRAIN_PENDING.discard(cid)
            _bot.TRAIN_Q.task_done()
        await asyncio.sleep(delay)

async def train_reminder_job(context: _bot.ContextTypes.DEFAULT_TYPE):
    if _bot.TRAIN_Q is None: return
    n = 0
    for cid in _bot.all_users():
        if cid in _bot.TRAIN_PENDING or not _bot._proactive_preference_on(cid): continue
        _bot.TRAIN_PENDING.add(cid); await _bot.TRAIN_Q.put(cid); n += 1
    _bot.log.info("train reminder queued: %d", n)

def streak_of(cid):
    """Дней подряд с активностью (еда, тренировка или чек-ин), заканчивая сегодня или вчера."""
    c = _bot.db(); days = set()
    for tbl in ("meals", "workouts"):
        for (d,) in c.execute(f"SELECT DISTINCT d FROM {tbl} WHERE chat_id=?", (cid,)):  # nosec B608
            if d: days.add(d)
    for (d,) in c.execute("SELECT DISTINCT log_date FROM logs WHERE chat_id=? AND (energy IS NOT NULL OR (symptoms IS NOT NULL AND symptoms<>''))", (cid,)):
        if d: days.add(d)
    c.close()
    today = datetime.now(_bot.TZ).date()
    if today.isoformat() in days:
        cur = today
    elif (today - timedelta(days=1)).isoformat() in days:
        cur = today - timedelta(days=1)
    else:
        return 0
    n = 0
    while cur.isoformat() in days:
        n += 1; cur = cur - timedelta(days=1)
    return n

PHASE_INTRO = {
    "menstrual": "🌙 Началась менструация. Гормоны сейчас низко — тело просит поберечься: добавь железо (гречка, красное мясо, зелень), тепло и мягкое движение. Резкие тренировки лучше отложить.",
    "follicular": "🌱 Ты вошла в фолликулярную фазу. Эстроген растёт, энергии больше — хорошее окно для силовых и новых начинаний, тело лучше восстанавливается.",
    "ovulation": "☀️ Овуляция — пик энергии и сил. Можно самые интенсивные тренировки, но береги связки. Настроение и либидо обычно на высоте.",
    "luteal": "🌾 Началась лютеиновая фаза. Растёт прогестерон — может тянуть на еду и быстрее приходить усталость. Помогут спокойное кардио, магний и белок.",
}

async def phase_transition_job(context: _bot.ContextTypes.DEFAULT_TYPE):
    """Пуш при входе в новую фазу цикла. На первом расчёте только запоминаем фазу, без пуша."""
    delay = float(os.environ.get("AIWA_PHASE_DELAY", "0.3"))
    sent = 0
    for cid in _bot.all_users():
        try:
            u = _bot.row(cid)
            if (not _bot.is_onboarded(u) or not _bot._proactive_preference_on(cid)
                    or (u.get("mode") or "cycle") != "cycle"):
                continue
            _, st = _bot.status_of(cid); phase = (st or {}).get("phase")
            if not phase or u.get("last_phase_notified") == phase:
                continue
            first = u.get("last_phase_notified") is None
            _bot.upsert(cid, last_phase_notified=phase)
            if first:
                continue
            txt = _bot.PHASE_INTRO.get(phase)
            if not txt:
                continue
            campaign = _bot.campaign_id("phase_" + phase)
            wu = _bot.campaign_webapp_url(u, campaign)
            kb = InlineKeyboardMarkup([[InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=wu))]]) if wu else None
            await context.bot.send_message(cid, txt, reply_markup=kb)
            _bot.ev(cid, "broadcast", meta="sent|" + campaign); sent += 1
            await asyncio.sleep(delay)
        except _bot.Forbidden as exc:
            _bot._record_push_failure(cid, _bot.campaign_id("phase_transition"), exc)
        except Exception as e:
            _bot._record_push_failure(cid, _bot.campaign_id("phase_transition"), e)
            _bot.log.warning("phase push %s: %s", cid, e)
    _bot.log.info("phase transition pushes: %d", sent)

async def reactivation_job(context: _bot.ContextTypes.DEFAULT_TYPE):
    """Возврат неактивных: если не заходила N дней и давно не слали возврат — тёплый персональный пуш."""
    delay = float(os.environ.get("AIWA_REACT_DELAY", "0.3"))
    ndays = max(2, int(os.environ.get("AIWA_INACTIVE_DAYS", "5")))
    today = datetime.now(_bot.TZ).date(); sent = 0
    for cid in _bot.all_users():
        try:
            u = _bot.row(cid)
            if not _bot.is_onboarded(u) or not _bot._proactive_preference_on(cid):
                continue
            c = _bot.db()
            old_last = c.execute(
                """SELECT MAX(ts) FROM events
                   WHERE chat_id=? AND action IN
                     ('manual','button','suggest','command','answered','voice','goal')""",
                (cid,),
            ).fetchone()[0]
            v2_last = c.execute(
                """SELECT MAX(occurred_at) FROM events_v2
                   WHERE user_key=? AND event_name IN (
                     'legacy_message_interaction','screen_viewed','app_opened',
                     'assistant_response_received','user_message_sent',
                     'summary_delivered','meal_add_completed','workout_add_completed',
                     'checkin_completed','checkin_updated'
                   )""",
                (_bot.A2.user_key(cid),),
            ).fetchone()[0]
            c.close()
            timestamps = []
            for value, default_tz in ((old_last, _bot.TZ), (v2_last, _bot.timezone.utc)):
                if not value:
                    continue
                parsed = datetime.fromisoformat(value)
                if parsed.tzinfo is None:
                    parsed = parsed.replace(tzinfo=default_tz)
                timestamps.append(parsed.astimezone(_bot.timezone.utc))
            if not timestamps:
                continue
            last = max(timestamps).astimezone(_bot.TZ).date()
            if (today - last).days < ndays:
                continue
            lr = u.get("last_reactivation")
            if lr:
                try:
                    if (today - date.fromisoformat(lr)).days < 7:
                        continue
                except Exception:
                    pass
            _bot.upsert(cid, last_reactivation=today.isoformat())
            _, st = _bot.status_of(cid); phase = (st or {}).get("phase")
            tip = {"menstrual": "Сейчас у тебя менструация — поберегись и добавь железо.",
                   "follicular": "Ты в фолликулярной фазе — энергии больше обычного.",
                   "ovulation": "У тебя овуляция — пик сил.",
                   "luteal": "Ты в лютеиновой фазе — самое время на спокойный режим и белок."}.get(phase, "")
            campaign = _bot.campaign_id("reactivation")
            wu = _bot.campaign_webapp_url(u, campaign)
            kb = InlineKeyboardMarkup([[InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=wu))]]) if wu else None
            txt = "🌸 Давно не виделись. " + (tip + " " if tip else "") + "Загляни — я собрала твою сводку и рекомендации на сегодня."
            await context.bot.send_message(cid, txt, reply_markup=kb)
            _bot.ev(cid, "broadcast", meta="sent|" + campaign); sent += 1
            await asyncio.sleep(delay)
        except _bot.Forbidden as exc:
            _bot._record_push_failure(cid, _bot.campaign_id("reactivation"), exc)
        except Exception as e:
            _bot._record_push_failure(cid, _bot.campaign_id("reactivation"), e)
            _bot.log.warning("reactivation %s: %s", cid, e)
    _bot.log.info("reactivation pushes: %d", sent)

async def food_worker(app):
    delay = float(os.environ.get("AIWA_FOOD_DELAY", "0.3"))
    while True:
        cid = await _bot.FOOD_Q.get()
        try:
            await _bot.push_food_reminder(_bot._BCtx(app), cid)
        except _bot.Forbidden as exc:
            _bot._record_push_failure(cid, _bot.campaign_id("food_reminder"), exc)
            _bot.log.info("food reminder %s: заблокирован", cid)
        except Exception as e:
            _bot._record_push_failure(cid, _bot.campaign_id("food_reminder"), e)
            _bot.log.warning("food reminder %s: %s", cid, e)
        finally:
            _bot.FOOD_PENDING.discard(cid)
            _bot.FOOD_Q.task_done()
        await asyncio.sleep(delay)

async def food_reminder_job(context: _bot.ContextTypes.DEFAULT_TYPE):
    """Глобальный джоб в обед: ставит в очередь пуш про еду всем, кто ещё не отметил сегодня."""
    if _bot.FOOD_Q is None: return
    n = 0
    for cid in _bot.all_users():
        if cid in _bot.FOOD_PENDING or not _bot._proactive_preference_on(cid): continue
        _bot.FOOD_PENDING.add(cid); await _bot.FOOD_Q.put(cid); n += 1
    _bot.log.info("food reminder queued: %d", n)

def finish_onboarding(context, cid, last_period_iso, n):
    # Switch into cycle mode only after both onboarding inputs are valid.
    # Until then an existing male profile must remain isolated from cycle state.
    _bot.upsert(
        cid,
        mode="cycle",
        last_period=last_period_iso,
        cycle_len=n,
        period_end=None,
        period_len=None,
        state=None,
        pending_date=None,
    )
    _bot._invalidate_mode_dependent_state(cid)
    _bot.cyc_add(cid, last_period_iso); _bot.schedule_daily(context.application, cid, _bot.row(cid)["send_time"] or "08:00")

async def welcome_finish(context, cid, msg):
    u = _bot.row(cid)
    male = (u.get("mode") == "male")
    _bot.ev(cid, "onboarding_completed", meta=(u.get("mode") or "cycle"))
    text = ("Готово. " + _bot.schedule_text(cid, "08:00") +
            ("" if male else "\n\nИсторию прошлых циклов можно добавить позже командой /addcycles.") +
            "\n\nКалендарь, питание и тренировки — в приложении по кнопке ниже. "
            "А здесь, в чате, задай любой вопрос или опиши блюдо или тренировку — текстом или голосом, разберу и запишу. "
            + ("Например: «яичница и кофе на завтрак» или «пожал 60 кг, запиши тренировку»." if male
               else "Например: «овсянка с ягодами на завтрак» или «пробежала 5 км, запиши»."))
    kb_rows = []
    if _bot.AIWA_WEBAPP_URL:
        kb_rows.append([InlineKeyboardButton(_bot.APP_BUTTON_TEXT, web_app=WebAppInfo(url=_bot.webapp_url(u) or _bot.AIWA_WEBAPP_URL))])
    await msg.reply_text(text, reply_markup=InlineKeyboardMarkup(kb_rows) if kb_rows else None)
    # Первая сводка — сразу после настройки, но не дублируем при повторном
    # прохождении онбординга в тот же день.
    if not _bot.summary_sent_today(cid):
        await _bot.push_summary(context, cid)

async def send_report(context, cid, period):
    u = _bot.row(cid)
    if not _bot.is_onboarded(u):
        await context.bot.send_message(cid, "Сначала пройди настройку: /start.")
        return {"ok": False, "delivered": False, "error": "onboard"}
    if not _bot.RPT:
        await context.bot.send_message(cid, "Выписка временно недоступна.")
        return {"ok": False, "delivered": False, "error": "unavailable"}
    _, st = _bot.status_of(cid)
    await context.bot.send_chat_action(cid, "upload_document")
    since, label = _bot.RPT.period_since(period)
    male = u.get("mode") == "male"
    cycles = [] if male else _bot.cycles_of(cid, since)
    logs = _bot.logs_of(cid, since)
    if st and u.get("last_period") and u["last_period"] not in cycles:
        cycles = sorted(set(cycles + [u["last_period"]]))
    try:
        pdf = _bot.RPT.build_report({"cycles": cycles, "logs": logs, "st": st, "cycle_len": (u.get("cycle_len") or 28),
                                "period_label": label, "profile": _bot.profile_of(u), "mode": u.get("mode")})
        bio = io.BytesIO(pdf); bio.name = "AIWA_vypiska.pdf"
        await context.bot.send_document(cid, document=bio, filename="AIWA_vypiska.pdf",
            caption=_bot.report_caption(u, label))
        _bot.ev(cid, "goal", meta="report")
        return {"ok": True, "delivered": True}
    except Exception as e:
        _bot.log.warning("report: %s", e)
        _bot.ev(cid, "error", meta="report_delivery")
        try:
            await context.bot.send_message(cid, "Не удалось собрать выписку, попробуй позже.")
        except Exception as notify_exc:
            _bot.log.warning("report failure notice: %s", notify_exc)
        return {"ok": False, "delivered": False, "error": "delivery_failed"}

PARTNER_TIPS = {
    "menstrual": "Идут месячные, может болеть живот и не быть сил. Грелка, тёплый чай, еда с железом и спокойный режим зайдут, на марафон лучше не звать.",
    "follicular": "Энергия на подъёме, хорошее окно для активностей, спорта и планов вместе.",
    "ovulation": "Пик энергии и настроения, отличное время для свиданий и совместного спорта.",
    "luteal": "Ближе к месячным возможны ПМС, усталость и тяга к сладкому. Тёмный шоколад, забота и спокойный вечер будут кстати.",
}
PARTNER_GUIDE = {
    "menstrual": {
        "body": "Эстроген и прогестерон сейчас низкие, а простагландины могут усиливать спазмы. Может быть меньше сил, ниже терпимость к шуму и больше потребность в тепле.",
        "support": ["Спроси, нужна ли тишина, еда или обезболивающее по инструкции.", "Возьми на себя мелкую бытовую задачу без обсуждения на час.", "Не обесценивай боль фразами вроде «потерпи»."],
        "food": "Тёплая еда, вода, чай, рыба, яйца, говядина, гречка или другой источник железа и белка.",
        "fact": "Во время месячных боль часто связана с простагландинами: это вещества, которые помогают матке сокращаться. У части женщин из-за них может болеть живот, поясница и даже появляться тошнота.",
        "watch": "Если боль очень сильная, кровотечение резко обильное или ей заметно хуже обычного, лучше предложить помощь с врачом."
    },
    "follicular": {
        "body": "После месячных эстроген постепенно растёт. Часто становится больше энергии, легче даются планы, спорт и новые задачи.",
        "support": ["Поддержи её инициативы, но не перегружай планами.", "Предложи прогулку, тренировку или спокойное свидание.", "Отметь, что видишь её энергию, это приятно и не давит."],
        "food": "Белковый завтрак, рыба, яйца, курица, творог или йогурт, крупа, овощи, вода.",
        "fact": "Рост эстрогена в первой половине цикла может улучшать чувствительность к инсулину и переносимость нагрузки. Поэтому активность часто ощущается легче, чем перед месячными.",
        "watch": "Если после месячных сохраняется сильная слабость или головокружение, это повод не геройствовать и проверить самочувствие."
    },
    "ovulation": {
        "body": "Эстроген близок к пику, рядом с овуляцией растёт лютеинизирующий гормон. У многих больше энергии, либидо и общительности.",
        "support": ["Предложи активный план, но оставь ей право отказаться.", "Будь внимателен к границам и контрацепции.", "Если есть боль сбоку живота, не драматизируй, но спроси, как она."],
        "food": "Белок, рыба, яйца, индейка, овощи, ягоды, вода. Это поддержит восстановление и стабильную энергию.",
        "fact": "Фертильное окно обычно включает примерно 5 дней до овуляции и день овуляции. Сперматозоиды могут жить в репродуктивных путях до нескольких дней, поэтому календарный метод ненадёжен.",
        "watch": "Резкая сильная боль, температура или необычные выделения - повод не ждать и обратиться к врачу."
    },
    "luteal": {
        "body": "После овуляции выше прогестерон. Он может повышать сонливость, чувствительность к стрессу, отёки и тягу к сладкому, особенно ближе к месячным.",
        "support": ["Снизь количество внезапных просьб и конфликтных разговоров.", "Предложи спокойный вечер, сон и помощь с бытом.", "Спроси, что ей сейчас облегчить: еду, тишину, объятия или пространство."],
        "food": "Белок плюс сложные углеводы: яйца, рыба, индейка, гречка, картофель, овощи. Для тяги к сладкому подойдёт тёмный шоколад в небольшом количестве.",
        "fact": "Во второй половине цикла базальная температура может быть выше примерно на 0,3-0,5 °C из-за прогестерона. Поэтому усталость, жар и хуже переносимый недосып могут быть не «капризом», а физиологией.",
        "watch": "Если ПМС мешает жить, есть сильная тревога, плаксивость или боль каждый цикл, это не надо терпеть молча."
    },
}
def partner_text(st, hint):
    extra = f"\nСегодня она отмечала: {hint}." if hint else ""
    g = _bot.PARTNER_GUIDE.get(st.get("phase")) or _bot.PARTNER_GUIDE["luteal"]
    support = "\n".join(f"• {x}" for x in g["support"])
    return (
        f"💛 Апдейт Айвы\n\n"
        f"💛 Что с ней сегодня\n"
        f"• День {st['day']} из {st['cycle_len']}, {st['subphase']} {st['phase_ru'].lower()} фаза.\n"
        f"• {g['body']}{extra}\n\n"
        f"🤝 Как поддержать\n{support}\n\n"
        f"🍽 Что предложить\n"
        f"• {g['food']}\n\n"
        f"🧠 Факт дня\n"
        f"«{g['fact']}»\n\n"
        f"📌 На что обратить внимание\n"
        f"• {g['watch']}\n\n"
        f"Это подсказка для поддержки, не диагноз."
    )

def partner_delay_text(st, hint):
    extra = f"\n• Сегодня она отмечала: {hint}." if hint else ""
    status = st.get("status")
    delay_days = int(st.get("delay_days") or 0)
    if status == "due":
        title = "месячные ожидаются примерно сейчас"
        body = ("Прогноз подошёл к окну месячных. Сдвиг на 1-3 дня бывает даже при регулярном цикле: "
                "на него влияют сон, стресс, перелёты, болезнь, питание и нагрузка.")
        watch = "Если была незащищённая близость, тест на ХГЧ можно делать с первого дня задержки, точнее через 3-5 дней."
    elif status == "stale":
        title = "данные цикла устарели"
        body = (f"С последних отмеченных месячных прошло {st.get('days_since')} дн., поэтому прогноз может быть неточным. "
                "Ей нужно спокойно обновить календарь, когда будет удобно.")
        watch = "Если месячных действительно нет так долго, лучше обсудить это с гинекологом: причины бывают от беременности до СПКЯ, щитовидной железы, стресса или перименопаузы."
    else:
        title = f"задержка {delay_days} дн."
        body = ("Месячные пока не начались в прогнозное окно. Частая причина задержки - поздняя овуляция: "
                "если овуляция сдвинулась, весь цикл становится длиннее. Также влияют стресс, недосып, болезнь, "
                "резкие изменения веса, интенсивные тренировки и перелёты.")
        watch = "Если была незащищённая близость, сначала исключают беременность: тест на ХГЧ информативен с первого дня задержки, точнее через 3-5 дней."
    return (
        f"💛 Апдейт Айвы: {title}\n\n"
        f"💛 Что с ней сегодня\n"
        f"• {body}{extra}\n"
        f"• В конце цикла прогестерон обычно снижается, поэтому могут быть ПМС, отёки, чувствительность груди, усталость, тревожность или тяга к сладкому.\n\n"
        f"🤝 Как поддержать\n"
        f"• Не дави вопросами и не пугай её. Лучше спроси: «Хочешь, я помогу с тестом, едой или просто побуду рядом?»\n"
        f"• Возьми на себя одну бытовую задачу: ужин, аптеку, воду, прогулку, такси или спокойный вечер.\n"
        f"• Если она тревожится, помоги действовать по шагам: тест, повтор через несколько дней, запись к врачу при необходимости.\n\n"
        f"🍽 Что предложить\n"
        f"• Белок и сложные углеводы: яйца, рыба, курица, гречка, картофель, овощи, йогурт или творог, если ей подходит.\n"
        f"• Вода, тёплый напиток, магний из еды: гречка, орехи, какао, тёмный шоколад в небольшом количестве.\n\n"
        f"🧠 Факт дня\n"
        f"«Лютеиновая фаза после овуляции обычно длится примерно 11-17 дней. Поэтому задержка часто означает не “сбой месячных”, а то, что овуляция была позже обычного.»\n\n"
        f"📌 На что обратить внимание\n"
        f"• {watch} Сильная боль, температура, необычные выделения или очень обильное кровотечение - повод обратиться за медицинской помощью.\n\n"
        f"Это подсказка для поддержки, не диагноз."
    )

PREG_FRUIT = {
    4: ("маковое зёрнышко", "~2 мм", "🌱"), 5: ("кунжутное семечко", "~3 мм", "🌱"), 6: ("горошина", "~6 мм", "🫛"),
    7: ("черника", "~1.3 см", "🫐"), 8: ("малина", "~1.6 см", "🍓"), 9: ("виноградина", "~2.3 см", "🍇"),
    10: ("клубника", "~3 см", "🍓"), 11: ("инжир", "~4 см", "🫒"), 12: ("лайм", "~5 см", "🍋"),
    13: ("стручок гороха", "~7 см", "🫛"), 14: ("лимон", "~8.5 см", "🍋"), 15: ("яблоко", "~10 см", "🍎"),
    16: ("авокадо", "~11.5 см", "🥑"), 17: ("репа", "~13 см", "🥔"), 18: ("болгарский перец", "~14 см", "🫑"),
    19: ("манго", "~15 см", "🥭"), 20: ("банан", "~16 см", "🍌"), 21: ("морковь", "~26 см", "🥕"),
    22: ("кабачок", "~28 см", "🥒"), 23: ("грейпфрут", "~29 см", "🍊"), 24: ("кукуруза", "~30 см", "🌽"),
    25: ("цветная капуста", "~34 см", "🥦"), 26: ("кочан салата", "~35 см", "🥬"), 27: ("брокколи", "~36 см", "🥦"),
    28: ("баклажан", "~37 см", "🍆"), 29: ("тыква", "~38 см", "🎃"), 30: ("капуста", "~39 см", "🥬"),
    31: ("кокос", "~41 см", "🥥"), 32: ("большой кабачок", "~42 см", "🥒"), 33: ("ананас", "~43 см", "🍍"),
    34: ("дыня", "~45 см", "🍈"), 35: ("медовая дыня", "~46 см", "🍈"), 36: ("салат романо", "~47 см", "🥬"),
    37: ("сельдерей", "~48 см", "🥬"), 38: ("лук-порей", "~49 см", "🧅"), 39: ("мини-арбуз", "~50 см", "🍉"), 40: ("небольшая тыква", "~51 см", "🎃"),
}

def preg_fruit(w):
    if w < 4:
        return ("крошечный зародыш", "ещё очень рано", "🌱")
    w = min(int(w or 4), 40)
    while w > 4 and w not in _bot.PREG_FRUIT:
        w -= 1
    return _bot.PREG_FRUIT.get(w, ("малыш", "растёт", "🌸"))

def _fruit_label(week):
    """Человеческая строка для карточки: «маковое зёрнышко (~2 мм)», а не сырой кортеж."""
    try:
        f = _bot.preg_fruit(week)
        name, size = str(f[0]), (str(f[1]) if len(f) > 1 else "")
        return f"{name} ({size})" if size and any(ch.isdigit() for ch in size) else name
    except Exception:
        return None

def partner_preg_text(preg, hint):
    week = int(preg.get("week") or 0)
    day = int(preg.get("day") or 0)
    tri = int(preg.get("trimester") or 1)
    due = date.fromisoformat(preg["due"]).strftime("%d.%m.%Y")
    left = int(preg.get("days_left") or 0)
    fruit, size, icon = _bot.preg_fruit(week)
    extra = f"\n• Сегодня она отмечала: {hint}." if hint else ""
    tri_body = {
        1: "В первом триместре активно закладываются органы и плацента. Часто бывают усталость, тошнота, сонливость, чувствительность к запахам и эмоциональные качели.",
        2: "Во втором триместре у многих становится больше энергии, растёт объём крови, увеличивается нагрузка на спину и таз. Малыш активно растёт, могут появляться первые или более заметные шевеления.",
        3: "В третьем триместре малыш набирает вес, матка сильнее давит на диафрагму, желудок и мочевой пузырь. Может быть одышка, изжога, отёки, хуже сон и быстрее усталость.",
    }.get(tri, "Беременность меняет нагрузку на сердце, сосуды, сон, пищеварение и эмоциональное состояние.")
    food = {
        1: "простая еда маленькими порциями: яйца, йогурт или творог, крупа, суп, рыба или курица, вода. При тошноте часто легче заходят сухари, банан, тёплый чай.",
        2: "белок, железо и кальций: мясо или рыба, яйца, гречка, овощи, молочные продукты, если подходят. Плюс вода и перекус, чтобы не проваливаться по энергии.",
        3: "лёгкая, но питательная еда: белок, овощи, крупа или картофель, кисломолочные продукты, если подходят. Большие тяжёлые ужины могут усиливать изжогу.",
    }.get(tri, "доступная еда с белком, сложными углеводами, овощами и водой.")
    watch = "Кровотечение, сильная боль, температура, выраженные отёки, сильная головная боль, мушки перед глазами или заметное снижение шевелений после того, как они уже стали регулярными, это повод связаться с врачом."
    return (
        f"💛 Апдейт Айвы: беременность\n\n"
        f"💛 Что с ней сегодня\n"
        f"• Срок примерно {week} нед {day} дн., {tri} триместр. ПДР: {due}, до родов около {max(0, left)} дн.\n"
        f"• {icon} Малыш сейчас ориентировочно как {fruit}, {size}. Это не точное измерение, а понятный ориентир по акушерскому сроку.\n"
        f"• {tri_body}{extra}\n\n"
        f"🤝 Как поддержать\n"
        f"• Спроси конкретно: «Что тебе сейчас облегчить: еду, воду, сон, прогулку, аптеку или тишину?»\n"
        f"• Возьми на себя быт без торговли: продукты, ужин, дорога, напоминание про воду, спокойный вечер.\n"
        f"• Не обесценивай усталость. Во время беременности растёт объём крови, меняется работа сосудов и гормонов, поэтому «устала» часто буквально физиология.\n\n"
        f"🍽 Что предложить\n"
        f"• {food}\n"
        f"• Без алкоголя, сырого мяса и рыбы, непастеризованных продуктов. С кофеином аккуратно, лучше сверяться с врачом по её ситуации.\n\n"
        f"🧠 Факт дня\n"
        f"«Акушерский срок считают от первого дня последних месячных, поэтому первые две недели срока формально идут ещё до зачатия. Так врачам проще считать ПДР и недели наблюдения.»\n\n"
        f"📌 На что обратить внимание\n"
        f"• {watch}\n\n"
        f"Это подсказка для поддержки, не диагноз."
    )

async def push_partner(context, woman_cid):
    pid = _bot.partner_of(woman_cid)
    if not pid: return
    u = _bot.row(woman_cid)
    hint = _bot.last_hint(woman_cid)
    if _bot.is_male_profile(u):
        log_today = _bot.log_get(woman_cid, _bot.dtoday().isoformat()) or {}
        details = []
        if log_today.get("energy"):
            details.append("энергия: " + _bot.EN.get(log_today["energy"], "не отмечена"))
        if log_today.get("mood"):
            details.append("настроение: " + _bot.MOOD.get(log_today["mood"], "не отмечено"))
        if hint:
            details.append("последняя отметка: " + hint)
        facts = "; ".join(details) if details else "сегодняшних отметок пока нет"
        text = (
            "💛 Сводка поддержки Айвы\n\n"
            f"• {facts}.\n"
            "• Можно спросить, нужна ли помощь с едой, отдыхом или планом "
            "нагрузки, без давления и непрошеных советов."
        )
        try:
            await context.bot.send_message(pid, text)
        except Exception as exc:
            _bot.log.warning("partner male push: %s", exc)
        return
    if u and u.get("mode") == "preg" and u.get("last_period"):
        try:
            _preg = _bot.C.preg_status(u["last_period"]); _pu = []
            text = None
            try: text = await _bot.llm_to_thread(woman_cid, "partner_brief", _bot.L.partner_preg_brief, _preg, hint, _pu)
            except Exception as e: _bot.log.warning("partner_preg_brief: %s", e)
            if _pu: _bot.ev(woman_cid, "tokens", sum(_pu), meta="partner_brief", calls=len(_pu))
            if not text: text = _bot.partner_preg_text(_preg, hint)
            try:
                await _bot.send_rich(context.bot, pid, text)
            except Exception:
                await context.bot.send_message(pid, _bot.tg_rich(text), parse_mode="HTML")
            return
        except Exception as e:
            return _bot.log.warning("partner preg push: %s", e)
    u, st = _bot.status_of(woman_cid)
    if not st: return
    if st.get("status") != "normal":
        try:
            return await context.bot.send_message(pid, _bot.partner_delay_text(st, hint))
        except Exception as e:
            return _bot.log.warning("partner delay push: %s", e)
    text = None; _pu = []
    try: text = await _bot.llm_to_thread(woman_cid, "partner_brief", _bot.L.partner_brief, st, hint, _pu)
    except Exception as e: _bot.log.warning("partner_brief: %s", e)
    if _pu: _bot.ev(woman_cid, "tokens", sum(_pu), meta="partner_brief", calls=len(_pu))
    if not text: text = _bot.partner_text(st, hint)
    try:
        try:
            await _bot.send_rich(context.bot, pid, text)
        except Exception:
            await context.bot.send_message(pid, _bot.tg_rich(text), parse_mode="HTML")
    except Exception as e:
        _bot.log.warning("partner push: %s", e)

async def addcycles_entry(context, cid, msg):
    if _bot.is_male_profile(_bot.row(cid)):
        _bot.upsert(cid, state=None)
        _bot.ev(cid, "male_mode_block", meta="addcycles_entry")
        return await msg.reply_text(_bot.MALE_PROFILE_FUNCTION_TEXT)
    _bot.upsert(cid, state="await_cycles")
    await msg.reply_text(_bot.ADDCYCLES_TEXT)
async def addcycles_cmd(update, context):
    cid = update.effective_chat.id; _bot.ev(cid, "command")
    u = _bot.row(cid)
    if not _bot.is_onboarded(u): return await _bot.need_onboard(update.message)
    if _bot.is_male_profile(u):
        return await update.message.reply_text(_bot.MALE_PROFILE_FUNCTION_TEXT)
    await _bot.addcycles_entry(context, cid, update.message)
async def partner_entry(context, cid, msg):
    u = _bot.row(cid); code = u.get("partner_code")
    if not code or len(code) < 24:
        code = _bot.secrets.token_urlsafe(24); _bot.set_partner_code(cid, code)
    if not _bot.BOT_USERNAME:
        try: _bot.BOT_USERNAME = (await context.bot.get_me()).username
        except Exception: _bot.BOT_USERNAME = None
    link = f"https://t.me/{_bot.BOT_USERNAME}?start=p_{code}" if _bot.BOT_USERNAME else None
    linked = _bot.partner_of(cid)
    body = "Перешли партнёру эту ссылку:\n" + (link if link else f"Код подключения: {code}")
    if _bot.is_male_profile(u):
        body += (
            "\n\nПартнёр откроет бота и будет получать короткую сводку об "
            "общем самочувствии, нагрузке и о том, как поддержать. Личные "
            "разделы он не увидит."
        )
    else:
        body += ("\n\nОн откроет бота и будет получать по утрам короткую сводку: день цикла, общее состояние "
                 "и как поддержать. Календарь и личные разделы он не увидит.")
    body += ("\n\nПартнёр уже подключён. Отключить: /unlink" if linked else "\n\nПартнёр пока не подключён.")
    await msg.reply_text(body)

async def partner_join(context, partner_cid, msg, code):
    woman = _bot.woman_by_code(code)
    if not woman:
        return await msg.reply_text("Ссылка недействительна. Попроси прислать новую через Меню, кнопка Партнёр.")
    if woman == partner_cid:
        return await msg.reply_text("Это твоя же ссылка, перешли её партнёру.")
    _bot.link_partner(partner_cid, woman); _bot.ev(partner_cid, "goal", meta="partner_link")
    await msg.reply_text(_bot.partner_hello_for(_bot.row(woman)))
    await _bot.push_partner(context, woman)  # сразу первый апдейт, не ждать утра
    try:
        await context.bot.send_message(woman, "Партнёр подключился и будет получать утреннюю сводку поддержки. Отключить: /unlink или в Меню, кнопка «Партнёр».")
    except Exception: pass
