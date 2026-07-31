"""Секция «pushes» aiwa_bot.py — перенесена механически (модульный монолит).

Внешнее состояние читается через aiwa_bot в момент вызова — см.
docs/architecture/monolith-split-plan.md.
"""
import asyncio
from datetime import date
from datetime import datetime
import html
import io
import json
import os
import re
import time
from datetime import timedelta
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, InputMediaPhoto, WebAppInfo

import aiwa_bot as _bot

async def need_onboard(t, user_generation=None):
    cid = getattr(getattr(t, "chat", None), "id", None)
    if cid and _bot.is_partner(cid) and not _bot.is_onboarded(_bot.row(cid)):
        return await t.reply_text(_bot.partner_info_for(cid))
    if cid and user_generation is None:
        user_generation = _bot._user_generation(cid)
    if cid: _bot.upsert(cid, user_generation=user_generation, state=None)
    if cid: _bot.record_onboarding_started(cid, user_generation)
    await t.reply_text("Чтобы Айва давала персональные рекомендации, выбери, что сейчас ближе: ведёшь цикл или нет регулярного цикла.", reply_markup=_bot.ONB_KB)
_last_start = {}
async def begin_onboard(cid, msg, force=False, user_generation=None):
    now = time.time()
    # дебаунс только для повторного /start; явный тап по кнопке (force) должен отвечать всегда
    if not force and now - _bot._last_start.get(cid, 0) < 4: return
    _bot._last_start[cid] = now
    if user_generation is None:
        user_generation = _bot._user_generation(cid)
    _bot.upsert(
        cid,
        user_generation=user_generation,
        state=None,
        pending_date=None,
    )
    _bot.record_onboarding_started(cid, user_generation)
    await msg.reply_text(_bot.START_TEXT, reply_markup=_bot.ONB_KB)

_CARD_CACHE = {}
_NEW_CARDS_ALL = os.environ.get("AIWA_NEW_CARDS", "0") in ("1", "true", "True", "on")
_NEW_CARDS_IDS = set(x.strip() for x in (os.environ.get("AIWA_NEW_CARDS_IDS", "") or "").split(",") if x.strip())
for _bad in [x for x in _NEW_CARDS_IDS if len(x) < 6]:
    print(f"ВНИМАНИЕ: AIWA_NEW_CARDS_IDS содержит «{_bad}» — это не похоже на chat_id (нужен полный id, напр. 625405535). "
          f"Для включения всем используйте AIWA_NEW_CARDS=1.")
def new_cards_on(cid):
    """Новые карточки: всем через AIWA_NEW_CARDS=1 или точечно через AIWA_NEW_CARDS_IDS=123,456."""
    return _bot._NEW_CARDS_ALL or str(cid) in _bot._NEW_CARDS_IDS

def _card_ctx(cid, u, st=None, preg=None):
    """Контекст для персональных строк карточки: состояние + чек-ин + дневник + память."""
    bits = []
    if st: bits.append(f"День цикла {st['day']} из {st['cycle_len']}, {st['subphase']} {st['phase_ru'].lower()} фаза, до месячных ~{st['days_to_next']} дн")
    if preg: bits.append(f"Беременность: {preg.get('week')} нед, {preg.get('trimester')} триместр")
    if u and u.get("mode") == "meno": bits.append("Режим: менопауза")
    h = _bot.last_hint(cid)
    if h: bits.append("Вчерашний чек-ин: " + h)
    try:
        from datetime import timedelta as _td
        _y = (_bot.dtoday() - _td(days=1)).isoformat()
        _tot = _bot.diary_totals(cid, _y)
        if _tot and _tot.get("kcal"): bits.append(f"Еда вчера: {round(_tot['kcal'])} ккал, белок {round(_tot.get('protein',0))} г")
    except Exception: pass
    try:
        _rw = _bot._recent_workouts_text(cid)
        if _rw: bits.append("Недавние тренировки: " + _rw)
    except Exception: pass
    try:
        _mm = _bot.mem_text(cid, 8)
        if _mm: bits.append("Память: " + _mm)
    except Exception: pass
    p = _bot.profile_of(u)
    if p and p.get("age"): bits.append(f"Возраст {p['age']}")
    return ". ".join(bits)

async def _card_captions(cid, mode, ctx, summary=None):
    key = (cid, _bot.dtoday().isoformat(), _bot.AIWA_VERSION, mode, bool(summary))
    hit = _bot._CARD_CACHE.get(key)
    if hit is not None: return hit
    if summary:
        ctx = (ctx or "") + " || Текст сегодняшней сводки — строки карточки ОБЯЗАНЫ быть согласованы с ним: питание — суть блока про питание, нагрузка — суть блока про нагрузку, не выдумывай нового: " + str(summary)[:1800]
    _cu = []
    caps = {}
    try:
        caps = await _bot.llm_to_thread(cid, "card_captions", _bot.L.card_captions, mode, ctx, _cu) or {}
    except Exception as e:
        _bot.log.warning("card_captions %s: %s", cid, e)
    if _cu: _bot.ev(cid, "tokens", sum(_cu), meta="card", calls=len(_cu), usage=_cu)
    def _cut(v, lim=80):
        v = str(v).strip()
        if len(v) <= lim: return v
        cut = v[:lim].rsplit(" ", 1)[0].rstrip(",;:")
        if len(cut) < lim // 2: cut = v[:lim]      # строка без пробелов — чистый срез
        return cut + "…"
    caps = {k: _cut(v, 40 if k in ("focus", "theme") else 80) for k, v in caps.items()}
    _bot._CARD_CACHE[key] = caps; _bot._prune_day(_bot._CARD_CACHE)
    return caps

async def _cycle_card_png(cid, u, st, summary=None):
    """Белая персональная карточка цикла; None, если выключено/не собралось."""
    if not (_bot.IMG and _bot.new_cards_on(cid) and hasattr(_bot.IMG, "render_daily_card")): return None
    try:
        caps = await _bot._card_captions(cid, "cycle", _bot._card_ctx(cid, u, st=st), summary=summary)
        if not caps.get("food"):
            _bot.ev(cid, "fallback", meta="static:card_caps_empty"); return None
        data = {"day": st["day"], "total": st["cycle_len"], "to_period": st["days_to_next"],
                "phase_ru": st["phase_ru"], **caps}
        return await asyncio.to_thread(_bot.IMG.render_daily_card, "cycle", data)
    except Exception as e:
        _bot.log.warning("cycle card %s: %s", cid, e); return None

async def _general_card_png(cid, u, summary=None):
    """Белая карточка для беременности/менопаузы; None, если выключено/не собралось."""
    if not (_bot.IMG and _bot.new_cards_on(cid) and hasattr(_bot.IMG, "render_daily_card")): return None
    mode = (u or {}).get("mode") or "none"
    pregnancy = None
    if mode == "preg" and u.get("last_period"):
        try: pregnancy = _bot.C.preg_status(u["last_period"])
        except Exception: pregnancy = None
    _m = "preg" if pregnancy else ("meno" if mode == "meno" else None)
    if not _m: return None
    try:
        caps = await _bot._card_captions(cid, _m, _bot._card_ctx(cid, u, preg=pregnancy), summary=summary)
        if not caps.get("food"):
            _bot.ev(cid, "fallback", meta="static:card_caps_empty"); return None
        if _m == "preg":
            data = {"week": pregnancy.get("week"), "trimester": pregnancy.get("trimester"),
                    "days_left": max(0, pregnancy.get("days_left", 0)),
                    "fruit": _bot._fruit_label(pregnancy.get("week")), **caps}
        else:
            data = dict(caps)
        return await asyncio.to_thread(_bot.IMG.render_daily_card, _m, data)
    except Exception as e:
        _bot.log.warning("general card %s: %s", cid, e); return None

async def send_infographic(bot, cid):
    if not _bot.IMG: return
    u, st = _bot.status_of(cid)
    if not st: return
    try:
        png = await _bot._cycle_card_png(cid, u, st)
        if png is None:
            png = await asyncio.to_thread(_bot.IMG.render_cycle, date.fromisoformat(u["last_period"]), u["cycle_len"], _bot.dtoday())
        bio = io.BytesIO(png); bio.name = "cycle.png"
        await bot.send_photo(cid, photo=bio, caption=f"AIWA · {st['subphase']} {st['phase_ru'].lower()}, день {st['day']}. Месячные через ~{st['days_to_next']} дн.")
        return True
    except Exception as e: _bot.log.warning("infographic: %s", e)
    return False

async def send_general_infographic(bot, cid, u=None):
    """Картинка к сводке для беременности и режимов без прогноза фазы цикла."""
    if not _bot.IMG: return False
    u = u or _bot.row(cid)
    if not u: return False
    mode = u.get("mode") or "none"
    pregnancy = None
    if mode == "preg" and u.get("last_period"):
        try:
            pregnancy = _bot.C.preg_status(u["last_period"])
        except Exception:
            pregnancy = None
    try:
        _m = ("preg" if (mode == "preg" and pregnancy) else ("meno" if mode == "meno" else None)) if _bot.new_cards_on(cid) else None
        png = None
        if _m and hasattr(_bot.IMG, "render_daily_card"):
            caps = await _bot._card_captions(cid, _m, _bot._card_ctx(cid, u, preg=pregnancy))
            if caps.get("food"):
                if _m == "preg":
                    data = {"week": pregnancy.get("week"), "trimester": pregnancy.get("trimester"),
                            "days_left": max(0, pregnancy.get("days_left", 0)),
                            "fruit": _bot._fruit_label(pregnancy.get("week")), **caps}
                else:
                    data = dict(caps)
                png = await asyncio.to_thread(_bot.IMG.render_daily_card, _m, data)
        if png is None:
            png = await asyncio.to_thread(_bot.IMG.render_general_summary, mode, _bot.dtoday(), pregnancy)
        bio = io.BytesIO(png); bio.name = "summary.png"
        await bot.send_photo(cid, photo=bio)
        return True
    except Exception as e:
        _bot.log.warning("general infographic (%s): %s", mode, e)
        return False

async def send_daily_infographic(bot, cid, u, facts=None, st=None):
    """Render trusted metrics plus model-selected reviewed facts."""
    if not _bot.IMG or not u:
        return False
    mode = "cycle" if st is not None else (u.get("mode") or "none")
    pregnancy = None
    if mode == "preg" and u.get("last_period"):
        try:
            pregnancy = _bot.C.preg_status(u["last_period"])
        except Exception:
            pregnancy = None
    try:
        png = await asyncio.to_thread(
            _bot.IMG.render_summary_card,
            mode,
            _bot.dtoday(),
            facts or [],
            st,
            pregnancy,
        )
        bio = io.BytesIO(png); bio.name = "aiwa-today.png"
        await bot.send_photo(cid, photo=bio)
        return True
    except Exception as e:
        _bot.log.warning("daily infographic (%s): %s", mode, e)
        return False

async def send_training_card(context, cid, st):
    if not _bot.IMG: return
    await context.bot.send_chat_action(cid, "upload_photo")
    try:
        bio = io.BytesIO(await asyncio.to_thread(_bot.IMG.render_training, st)); bio.name = "training.png"
        await context.bot.send_photo(cid, photo=bio)
    except Exception as e:
        _bot.log.warning("training img: %s", e)

def _feature_on(name, default="0"):
    return os.environ.get(name, default).strip().casefold() in {
        "1", "true", "yes", "on",
    }


def _food_dynamic_section_on(cid=None):
    # Off by default during the event rollout. Enabling it changes only the
    # daily cache namespace and never blocks the fast fallback response.
    if not _bot._feature_on("AIWA_FOOD_DYNAMIC_SECTION", "0") or cid is None:
        return False
    percent = max(
        0, min(100, int(os.environ.get(
            "AIWA_FOOD_DYNAMIC_SECTION_PERCENT", "0"
        )))
    )
    if percent <= 0:
        return False
    cohort = int(_bot._hashlib.sha256(
        f"food-section:{int(cid)}".encode("utf-8")
    ).hexdigest()[:8], 16) % 100
    return cohort < percent


def _food_section_refresh_on():
    return _bot._feature_on("AIWA_FOOD_SECTION_REFRESH", "1")


_MENU_CACHE = {}
def _menu_key(cid, st, prof, mode):
    diet = ((prof.get("diet") if prof else "") or "", (prof.get("diet_note") if prof else "") or "")
    phase = (st.get("phase") if st else ("mode:" + str(mode)))
    version = (
        "food-section-v3"
        if _bot._food_dynamic_section_on(cid) else "food-section-v2"
    )
    return (cid, _bot.dtoday().isoformat(), phase, diet, version)
def dc_get(cid, kind, key=""):
    """Дневной кэш в SQLite: чтобы деплой/рестарт не заставлял модель генерить всё заново."""
    c = _bot.db(); r = c.execute("SELECT js FROM day_cache WHERE chat_id=? AND d=? AND kind=? AND k=?",
                            (cid, _bot.dtoday().isoformat(), kind, str(key)[:120])).fetchone(); c.close()
    if not r: return None
    try:
        return json.loads(r[0])
    except Exception:
        return None

def dc_put(cid, kind, payload, key=""):
    try:
        c = _bot.db()
        c.execute("INSERT OR REPLACE INTO day_cache(chat_id,d,kind,k,js) VALUES(?,?,?,?,?)",
                  (cid, _bot.dtoday().isoformat(), kind, str(key)[:120], json.dumps(payload, ensure_ascii=False)))
        c.execute("DELETE FROM day_cache WHERE d<?", ((_bot.dtoday() - timedelta(days=2)).isoformat(),))
        c.commit(); c.close()
    except Exception as e:
        _bot.log.info("day_cache put %s/%s: %s", cid, kind, e)

def dc_del(cid, kind=None):
    try:
        c = _bot.db()
        if kind: c.execute("DELETE FROM day_cache WHERE chat_id=? AND kind=?", (cid, kind))
        else: c.execute("DELETE FROM day_cache WHERE chat_id=?", (cid,))
        c.commit(); c.close()
    except Exception:
        pass

def menu_cached(cid, st, prof, target, mode=None, usage=None):
    """Дневной кэш меню: обращаемся к модели максимум раз в день на юзера, дальше — мгновенно."""
    key = _bot._menu_key(cid, st, prof, mode)
    hit = _bot._MENU_CACHE.get(key)
    if hit is not None:
        return hit
    disk = _bot.dc_get(cid, "menu", key[2:])
    if disk is not None:
        _bot._MENU_CACHE[key] = disk
        return disk
    if st is not None:
        m = _bot.L.menu_today(st, profile=prof, target=target, usage=usage)
    else:
        m = _bot.L.general_menu(prof, mode, target, usage=usage)
    if isinstance(m, dict) and m.pop("_fallback", None):
        _bot.ev(cid, "fallback", meta="static:menu_pool")
    _bot._MENU_CACHE[key] = m
    _bot.dc_put(cid, "menu", m, key[2:])
    _bot._prune_day(_bot._MENU_CACHE)
    return m
def menu_cache_clear(cid):
    for k in [k for k in list(_bot._MENU_CACHE) if k[0] == cid]:
        _bot._MENU_CACHE.pop(k, None)
    _bot.dc_del(cid, "menu")

_SUM_CACHE = {}
def _prune_day(cache):
    today = _bot.dtoday().isoformat()
    if len(cache) > 1500:
        tomorrow = (_bot.dtoday() + timedelta(days=1)).isoformat()
        for k in [k for k in list(cache) if k[1] not in (today, tomorrow)]:
            cache.pop(k, None)

def _prepared_context_key(cache_key):
    raw = json.dumps(list(cache_key[2:]), ensure_ascii=False, sort_keys=True, default=str)
    return _bot._hashlib.sha256(raw.encode("utf-8")).hexdigest()

def _summary_state_for_day(u, day):
    target = date.fromisoformat(day)
    if _bot.is_cycle(u) and u.get("last_period") and u.get("cycle_len"):
        return _bot.C.cycle_status(date.fromisoformat(u["last_period"]), int(u["cycle_len"]), target), None
    if u.get("mode") == "preg" and u.get("last_period"):
        try:
            return None, _bot.C.preg_status(u["last_period"], target)
        except Exception:
            pass
    return None, None

def _summary_hint(cid, u, pregnancy=None):
    hint = _bot.last_hint(cid) or ""
    if u.get("mode") == "preg" and pregnancy:
        hint = ((hint + " ") if hint else "") + (
            f"Беременность, срок примерно {pregnancy['week']} недель, "
            f"{pregnancy['trimester']} триместр."
        )
    return hint or None

def _summary_key(cid, u, day, st=None, pregnancy=None):
    profile = _bot.profile_of(u) or {}
    snapshot = {
        "mode": "cycle" if st is not None else (u.get("mode") or "none"),
        "last_period": u.get("last_period"),
        "cycle_len": u.get("cycle_len"),
        "period_len": u.get("period_len"),
        "modules": list(u.get("modules") or []),
        "profile": {k: profile.get(k) for k in (
            "height", "weight", "age", "activity", "diet", "diet_note", "kcal_goal"
        )},
        "checkin": _bot.log_get(cid, day) or {},
        "hint": _bot._summary_hint(cid, u, pregnancy),
        "cycle": ({k: st.get(k) for k in (
            "day", "cycle_len", "phase", "subphase", "days_to_next", "status"
        )} if st else None),
        "pregnancy": ({k: pregnancy.get(k) for k in (
            "week", "day", "trimester", "due", "days_left"
        )} if pregnancy else None),
    }
    return (cid, day, json.dumps(snapshot, ensure_ascii=False, sort_keys=True, default=str))

def _summary_pack(body, facts=None):
    return {"v": 2, "body": str(body or ""), "facts": list(facts or [])[:3]}

def _summary_unpack(value):
    if isinstance(value, dict):
        return str(value.get("body") or ""), list(value.get("facts") or [])[:3]
    return str(value or ""), []

def prepared_summary_clear(cid):
    """Сводки, подготовленные под прежний режим/профиль, не должны доезжать после смены."""
    for k in [k for k in list(_bot._SUM_CACHE) if k[0] == cid]:
        _bot._SUM_CACHE.pop(k, None)
    try:
        c = _bot.db(); c.execute("DELETE FROM prepared_summaries WHERE chat_id=?", (cid,)); c.commit(); c.close()
    except Exception as e:
        _bot.log.info("prepared clear %s: %s", cid, e)

def prepared_summary_get(cid, day, cache_key):
    c = _bot.db()
    try:
        row_ = c.execute(
            """SELECT body FROM prepared_summaries
               WHERE chat_id=? AND summary_date=? AND context_key=?""",
            (cid, day, _bot._prepared_context_key(cache_key)),
        ).fetchone()
        if not row_:
            return None
        raw = row_[0]
        try:
            value = json.loads(raw)
            if isinstance(value, dict) and value.get("v") == 2:
                return value
        except Exception:
            pass
        return raw
    finally:
        c.close()

_PREP_CLEANUP_DAY = None
def prepared_summary_put(cid, day, cache_key, value, generation=None):
    global _PREP_CLEANUP_DAY
    body, _ = _bot._summary_unpack(value)
    if not body:
        return False
    stored = (json.dumps(value, ensure_ascii=False, separators=(",", ":"))
              if isinstance(value, dict) else str(value))
    c = _bot.db()
    try:
        if not _bot._user_write_allowed(cid, generation=generation, conn=c):
            return False
        c.execute(
            """INSERT OR REPLACE INTO prepared_summaries
               (chat_id,summary_date,context_key,body,prepared_at)
               VALUES(?,?,?,?,?)""",
            (cid, day, _bot._prepared_context_key(cache_key), stored, datetime.now(_bot.TZ).isoformat()),
        )
        cleanup_day = _bot.dtoday().isoformat()
        if _PREP_CLEANUP_DAY != cleanup_day:
            c.execute("DELETE FROM prepared_summaries WHERE summary_date<?",
                      ((_bot.dtoday() - timedelta(days=2)).isoformat(),))
            _PREP_CLEANUP_DAY = cleanup_day
        c.commit()
        return True
    finally:
        c.close()

async def prepare_daily_summary(cid, target_day=None):
    """Warm the daily LLM result before the user's exact delivery time."""
    generation = _bot._user_generation(cid)
    u = _bot.row(cid)
    if not u or not _bot.is_onboarded(u):
        return False
    usage = []; day = target_day or _bot.dtoday().isoformat()
    st, pregnancy = _bot._summary_state_for_day(u, day)
    if st is not None and st.get("status") != "normal":
        return False
    key = _bot._summary_key(cid, u, day, st, pregnancy)
    if _bot._SUM_CACHE.get(key) is not None or _bot.prepared_summary_get(cid, day, key) is not None:
        return True
    hint = _bot._summary_hint(cid, u, pregnancy)
    if st is None:
        body = await _bot.llm_to_thread(
            cid, "daily_summary_prepare", _bot.L.general_summary,
            _bot.profile_of(u), u.get("mode"), hint=hint, usage=usage,
            user_generation=generation,
        )
    else:
        body = await _bot.llm_to_thread(
            cid, "daily_summary_prepare", _bot.L.generate_summary,
            st, u["modules"], hint=hint, usage=usage,
            user_generation=generation,
        )
    if not body or not _bot._user_write_allowed(cid, generation=generation):
        return False
    mode = "cycle" if st is not None else (u.get("mode") or "none")
    facts = []
    if mode in ("cycle", "preg"):
        facts = await _bot.llm_to_thread(
            cid, "summary_card_facts", _bot.L.summary_card_facts,
            mode, st, pregnancy, hint, usage,
            user_generation=generation,
        )
    if not _bot._user_write_allowed(cid, generation=generation):
        return False
    value = _bot._summary_pack(body, facts)
    _bot._prune_day(_bot._SUM_CACHE)
    _bot._SUM_CACHE[key] = value
    if not _bot.prepared_summary_put(cid, day, key, value, generation=generation):
        _bot._SUM_CACHE.pop(key, None)
        return False
    if usage:
        _bot.ev(cid, "tokens", sum(usage), meta="summary_prepare", calls=len(usage), usage=usage)
    return True

async def send_menu(context, cid, with_image=False):
    u, st = _bot.status_of(cid)
    if not st: return None
    if with_image:
        await context.bot.send_chat_action(cid, "upload_photo")
    prof = _bot.profile_of(u); target = _bot.profile_kcal(prof) if prof else None
    usage = []; mdata = await asyncio.to_thread(_bot.menu_cached, cid, st, prof, target, None, usage)
    if usage: _bot.ev(cid, "tokens", sum(usage), meta="menu", calls=len(usage), usage=usage)
    if target:
        mdata["macros"] = {"protein": f"{target[1]} г", "fat": f"{target[2]} г", "carbs": f"{target[3]} г"}
    note = st["content"]["food"]
    if not with_image:
        return mdata, target
    try:
        bio = io.BytesIO(await asyncio.to_thread(_bot.IMG.render_menu, mdata, st["phase_ru"], target_kcal=(target[0] if target else None))); bio.name = "menu.png"
        cap = f"🍽 Меню под {st['phase_ru'].lower()} фазу"
        if target: cap += f", цель ~{target[0]} ккал/день"
        cap += ". Не нравится блюдо, напиши «замени обед» или «другое на ужин»."
        if not prof: cap += "\n\nЧтобы считать калории под тебя, добавь данные командой /profile."
        await context.bot.send_photo(cid, photo=bio, caption=cap)
        return mdata, target
    except Exception as e:
        _bot.log.warning("menu: %s", e); await context.bot.send_message(cid, "🍽 " + note)
        return None

async def send_section(context, cid, st, key):
    """Нагрузка и питание: подробный текст с мед-обоснованием и переходом в приложение."""
    await context.bot.send_chat_action(cid, "typing"); _bot.ev(cid, "button")
    usage = []
    if key == "training":
        _recent = _bot._recent_workouts_text(cid)
        _fq = ("Составь рекомендацию по нагрузке на сегодня под мою фазу. Мои последние тренировки: "
               + (_recent or "данных нет") + ". ОБЯЗАТЕЛЬНО учти их: если вчера была тяжёлая тренировка "
               "(например на ноги) — сегодня предложи другие группы мышц или восстановление, и скажи об этом прямо. "
               "Формат: короткий заголовок, почему именно так (гормоны и восстановление), 2-3 конкретных варианта с «как».")
        text = await _bot.think_llm(context, cid, _bot.L.answer_question, st, _fq, _bot.llm_profile_of(_bot.row(cid)), None, usage=usage)
        if not text or "не вернула ответ" in text:
            text = await _bot.think_llm(context, cid, _bot.L.explain_section, st, "training", usage=usage)
        text += "\n\nВ приложении Айвы можно посмотреть нагрузку рядом с календарём, симптомами и фазой цикла. Открой приложение кнопкой ниже."
        return await _bot.send_answer(context, cid, text, st, "нагрузка сегодня", usage=usage,
            app_user=_bot.row(cid), app_label="Открыть нагрузку")
    if key == "food":
        res = await _bot.send_menu(context, cid, with_image=False)
        if res:
            mdata, target = res
            text = _bot.L.menu_text(st, mdata, target)
        else:
            text = _bot.L.section_text(st, "food")
        text += "\n\nВ приложении Айвы меню удобнее: рядом с каждым блюдом есть кнопка «Заменить», можно быстро выбрать другой вариант без пересборки всего дня. Открой приложение кнопкой ниже."
        return await _bot.send_answer(context, cid, text, st, "питание сегодня", usage=usage,
            app_user=_bot.row(cid), app_label="Открыть питание")
    text = _bot.L.section_text(st, key)
    await _bot.send_answer(context, cid, text, st, text, usage=usage)

async def send_delay(context, cid, st, campaign=None):
    claimed = False; sent_any = False
    if campaign:
        claimed = _bot._claim_push_delivery(cid, campaign)
        if not claimed:
            _bot.log.info("delay summary skipped as duplicate: %s %s", cid, campaign)
            return False
    msgs = {
        "due": (
            "🟡 Сводка на сегодня: месячные ожидаются примерно сейчас.\n\n"
            "🌙 Цикл\n"
            "• Прогноз подошёл к окну месячных.\n"
            "• Если они уже начались, отметь дни в календаре приложения.\n\n"
            "💛 Тело сегодня\n"
            "• Небольшой сдвиг на 1-3 дня бывает даже при регулярном цикле.\n"
            "• На цикл часто влияют стресс, сон, перелёты, болезнь и нагрузка.\n\n"
            "📌 Что сделать\n"
            "• Если была незащищённая близость, сделай тест на ХГЧ с первого дня задержки, точнее через 3-5 дней.\n"
            "• Если есть сильная боль, необычные выделения, температура или кровотечение, лучше обратиться к врачу."
        ),
        "delay": (
            f"🔴 Сводка на сегодня: задержка {st['delay_days']} дн.\n\n"
            "🌙 Цикл\n"
            "• Месячные пока не начались в прогнозное окно.\n"
            "• Когда они начнутся, отметь реальные дни в календаре, и Айва пересчитает прогноз.\n\n"
            "💛 Тело сегодня\n"
            "• Частые причины задержки: стресс, перелёты, недосып, болезнь, резкие изменения веса, интенсивные тренировки.\n"
            "• Если был незащищённый секс, сначала исключаем беременность.\n\n"
            "📌 Что сделать\n"
            "• Сделай тест на ХГЧ: он информативен с первого дня задержки, точнее через 3-5 дней.\n"
            "• Если задержка растёт, цикл часто сбивается или есть тревожные симптомы, обратись к гинекологу."
        ),
        "stale": (
            f"⚪ Сводка на сегодня: данные цикла устарели, прошло {st['days_since']} дн. с последних отмеченных месячных.\n\n"
            "🌙 Цикл\n"
            "• Айве не хватает актуальной даты, поэтому прогноз может быть неверным.\n"
            "• Открой приложение и поправь календарь: добавь реальные дни месячных или удали ошибочные.\n\n"
            "📌 Что проверить\n"
            "• Если месячных действительно нет так долго, это повод обсудить ситуацию с гинекологом.\n"
            "• Возможные причины: беременность, СПКЯ, щитовидная железа, резкая потеря веса, стресс, перименопауза."
        )}
    try:
        if _bot.IMG:
            try:
                bio = io.BytesIO(await asyncio.to_thread(_bot.IMG.render_delay, st))
                bio.name = "delay.png"
                await context.bot.send_photo(cid, photo=bio)
                sent_any = True
            except Exception as e:
                _bot.log.warning("delay img: %s", e)
        u = _bot.row(cid)
        body = msgs.get(st["status"], "")
        await context.bot.send_message(
            cid, html.escape(body) + "\n\n" + _bot.APP_CTA_HTML,
            reply_markup=_bot.summary_sugg_kb(cid, u, st, app_label="Открыть календарь"),
            parse_mode="HTML",
        )
        sent_any = True
        if campaign:
            _bot._complete_push_delivery(cid, campaign)
            _bot.ev(cid, "goal", meta="summary")
            _bot.ev(cid, "broadcast", meta="sent|" + campaign)
        return True
    except Exception:
        if claimed and not sent_any:
            _bot._release_push_delivery(cid, campaign)
        raise

async def send_guide(context, cid, g):
    path = os.path.join(_bot.GUIDE_DIR, g["file"])
    if not os.path.exists(path):
        return await context.bot.send_message(cid, "Этот гид скоро появится.")
    try:
        from PIL import Image
        im = Image.open(path).convert("RGB"); w, h = im.size; n = 3; part = h // n
        media = []
        for i in range(n):
            top = i * part; bottom = h if i == n - 1 else (i + 1) * part
            b = io.BytesIO(); im.crop((0, top, w, bottom)).save(b, "JPEG", quality=90); b.seek(0)
            media.append(InputMediaPhoto(b, caption=(g["title"] if i == 0 else None)))
        await context.bot.send_media_group(cid, media)
    except Exception as e:
        _bot.log.warning("guide: %s", e)
        with open(path, "rb") as fh: await context.bot.send_photo(cid, photo=fh, caption=g["title"])

RICH_OK = os.environ.get("AIWA_RICH", "1") in ("1", "true", "True", "on")

async def send_rich_with_photo(bot, cid, md_text, png_bytes, reply_markup=None):
    """Одно сообщение: карточка + текст сводки. Bot API 10.1: media в rich-markdown через tg://photo?id=."""
    def _do():
        import requests as _rq
        md = re.sub(r"(?m)^(\s*)•\s+", r"\1- ", str(md_text))
        rich = {"markdown": "![](tg://photo?id=card)\n\n" + md,
                "media": [{"id": "card", "media": {"type": "photo", "media": "attach://cardpng"}}]}
        data = {"chat_id": str(cid), "rich_message": json.dumps(rich, ensure_ascii=False)}
        if reply_markup is not None:
            data["reply_markup"] = reply_markup.to_json()
        last = None
        for _att in (1, 2):
            try:
                r = _rq.post(f"{_bot.AIWA_TELEGRAM_API_ORIGIN}/bot{bot.token}/sendRichMessage",
                             data=data, files={"cardpng": ("card.png", png_bytes, "image/png")}, timeout=60)
                j = r.json()
                if j.get("ok"): return j
                last = RuntimeError(f"sendRichMessage(photo): {j.get('description')}")
                if "retry" not in str(j.get("description", "")).lower(): break
            except Exception as e:
                last = e
        raise last
    _bot._remember_spoken(cid, md_text)
    return await asyncio.to_thread(_do)

async def send_rich(bot, cid, md_text, reply_markup=None):
    """Отправка через sendRichMessage (Bot API 10.1+): Telegram сам рендерит GFM —
    таблицы, ### заголовки, списки, цитаты. Бросает исключение, если метод недоступен."""
    md_text = _bot.guard_aiwa_reply(cid, md_text)
    md_text = re.sub(r"(?m)^(\s*)•\s+", r"\1- ", str(md_text))   # любые «• » -> GFM-список, иначе рендер склеит/задвоит
    _bot._remember_spoken(cid, md_text)  # rich bypasses the Telegram proxy
    data = {"chat_id": cid, "rich_message": json.dumps({"markdown": md_text})}
    if reply_markup is not None:
        data["reply_markup"] = reply_markup.to_json()
    return await bot._post("sendRichMessage", data)

def tg_rich(text):
    """Лёгкие маркеры от модели -> Telegram HTML: **жирный**, __курсив__, ```моноширинный блок```."""
    if not text: return ""
    # Protect fenced blocks before applying inline entities: Telegram rejects
    # nested <b>/<i> inside <pre>.
    chunks = re.split(r"(```[a-z]*\n?.*?```)", str(text), flags=re.S)
    out = []
    for chunk in chunks:
        if chunk.startswith("```") and chunk.endswith("```"):
            body = re.sub(r"^```[a-z]*\n?", "", chunk)
            body = body[:-3].strip("\n")
            out.append("<pre>" + html.escape(body, quote=False) + "</pre>")
            continue
        safe = html.escape(chunk, quote=False)
        safe = re.sub(r"(?m)^#{1,6}\s*(.+)$", r"<b>\1</b>", safe)
        safe = _bot._gfm_tables_to_pre(safe)
        for part in re.split(r"(<pre>.*?</pre>)", safe, flags=re.S):
            if part.startswith("<pre>") and part.endswith("</pre>"):
                out.append(part)
                continue
            part = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", part, flags=re.S)
            part = re.sub(r"__(.+?)__", r"<i>\1</i>", part, flags=re.S)
            out.append(part.replace("**", "").replace("__", ""))
    return "".join(out)

def _gfm_tables_to_pre(t):
    """Фолбэк для клиентов без rich: GFM-таблицу выравниваем пробелами в <pre>."""
    out, buf = [], []
    def flush():
        if len(buf) >= 2 and re.match(r"^\s*\|?[\s:|-]+\|?\s*$", buf[1]):
            rows = [[c.strip() for c in r.strip().strip("|").split("|")] for r in (buf[:1] + buf[2:])]
            w = [max(len(r[i]) if i < len(r) else 0 for r in rows) for i in range(max(len(r) for r in rows))]
            out.append("<pre>" + "\n".join("  ".join((r[i] if i < len(r) else "").ljust(w[i]) for i in range(len(w))).rstrip() for r in rows) + "</pre>")
        else:
            out.extend(buf)
        buf.clear()
    for ln in t.split("\n"):
        if "|" in ln and ln.strip():
            buf.append(ln)
        else:
            flush(); out.append(ln)
    flush()
    return "\n".join(out)

def md_plain(text):
    """Для мини-аппа: маркеры убираем, таблицы сводим к строкам — он рендерит плейн."""
    if not text: return text
    t = re.sub(r"```[a-z]*\n?(.*?)```", r"\1", str(text), flags=re.S)
    t = re.sub(r"(?m)^#{1,6}\s*", "", t)
    lines = []
    for ln in t.split("\n"):
        if re.match(r"^\s*\|?[\s:|-]+\|?\s*$", ln) and "|" in ln:
            continue                                   # разделитель таблицы
        if "|" in ln and ln.strip().startswith("|"):
            cells = [c.strip() for c in ln.strip().strip("|").split("|") if c.strip()]
            ln = "• " + ", ".join(cells)
        lines.append(ln)
    t = "\n".join(lines)
    t = re.sub(r"(?m)^(\s*)-\s+", r"\1• ", t)          # в мини-аппе плейн: «- » -> «• »
    return t.replace("**", "").replace("__", "")

TG_MESSAGE_LIMIT = 4096
# Leave room for Telegram entity parsing and for a short quoted question.
TG_TEXT_CHUNK = 3600
TG_QUOTE_LIMIT = 700

def _tg_units(text):
    """Telegram entity offsets and limits use UTF-16 code units."""
    return len((text or "").encode("utf-16-le")) // 2

def _tg_prefix_len(text, limit):
    """Largest Python string prefix that fits into ``limit`` UTF-16 units."""
    lo, hi = 0, len(text)
    while lo < hi:
        mid = (lo + hi + 1) // 2
        if _bot._tg_units(text[:mid]) <= limit: lo = mid
        else: hi = mid - 1
    return lo

def split_tg(text, limit=TG_TEXT_CHUNK, first_limit=None):
    """Split a Telegram message without dropping content or breaking sentences when possible."""
    if not text: return []
    out = []; rest = str(text); current_limit = int(first_limit or limit)
    while rest:
        if _bot._tg_units(rest) <= current_limit:
            out.append(rest); break
        hard = max(1, _bot._tg_prefix_len(rest, current_limit))
        window = rest[:hard]; floor = max(1, int(hard * 0.55))
        boundaries = [m.end() for m in re.finditer(r"\n\n|\n|(?<=[.!?])\s+|\s+", window)]
        cut = max((p for p in boundaries if p >= floor), default=hard)
        out.append(rest[:cut]); rest = rest[cut:]; current_limit = int(limit)
    return out

def _clip_tg(text, limit=TG_QUOTE_LIMIT):
    text = str(text or "")
    if _bot._tg_units(text) <= limit: return text
    keep = max(1, _bot._tg_prefix_len(text, max(1, limit - 1)))
    return text[:keep].rstrip() + "…"

async def reply_long(message, text, reply_markup=None):
    """Ответ с rich-форматированием; фолбэк — HTML по кускам. Кнопки только у последней части."""
    text = _bot.guard_aiwa_reply(message.chat_id, text)
    if _bot.RICH_OK:
        try:
            await _bot.send_rich(message.get_bot(), message.chat_id, text, reply_markup=reply_markup)
            return
        except Exception as _e:
            _bot.log.info("rich fallback: %s", str(_e)[:120])
    parts = _bot.split_tg(text) or [str(text or "")]
    for i, part in enumerate(parts):
        markup = reply_markup if i == len(parts) - 1 else None
        try:
            await message.reply_text(_bot.tg_rich(part), reply_markup=markup, parse_mode="HTML")
        except _bot.BadRequest:
            await message.reply_text(_bot.md_plain(part), reply_markup=markup)
def chat_hint(cid):
    base = _bot.last_hint(cid) or ""
    u = _bot.row(cid)
    if u and u.get("mode") == "preg" and u.get("last_period"):
        try:
            stp = _bot.C.preg_status(u["last_period"])
            base = (base + " " if base else "") + f"Беременность, срок примерно {stp['week']} недель, {stp['trimester']} триместр, до родов ~{max(0, stp['days_left'])} дн."
        except Exception: pass
    return base or None
_VOICE_TURN = {}   # cid -> True, если текущий вопрос пришёл голосом: тогда ответ дублируем голосом
_SPOKEN_COLLECTOR = _bot.contextvars.ContextVar("aiwa_spoken_collector", default=None)

def _remember_spoken(cid, text):
    """Record visible text in the current voice request, never in global chat state."""
    collector = _bot._SPOKEN_COLLECTOR.get()
    if collector is not None and str(text or "").strip():
        collector.append(_bot._voice_plain_text(text))

def _voice_reply_on():
    # TTS is opt-in until the provider path has proved text/audio parity in
    # production. STT remains available and still returns the text answer.
    return os.environ.get("AIWA_VOICE_REPLY", "0") in ("1", "true", "True", "yes", "on")

def _voice_plain_text(value):
    """Prepare already-sent Telegram text for TTS without speaking HTML markup."""
    text = html.unescape(re.sub(r"<[^>]+>", "", str(value or "")))
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return text[:3000].rstrip()

class _VoiceBotProxy:
    """Delegate Telegram calls while remembering text sent during a voice turn."""
    def __init__(self, bot, cid, sent_texts):
        self._bot = bot; self._cid = cid; self._sent_texts = sent_texts

    def __getattr__(self, name):
        return getattr(self._bot, name)

    async def send_message(self, chat_id, text, *args, **kwargs):
        result = await self._bot.send_message(chat_id, text, *args, **kwargs)
        if str(chat_id) == str(self._cid) and str(text or "").strip():
            self._sent_texts.append(str(text))
        return result

    async def send_photo(self, chat_id, *args, **kwargs):
        result = await self._bot.send_photo(chat_id, *args, **kwargs)
        caption = kwargs.get("caption")
        if str(chat_id) == str(self._cid) and str(caption or "").strip():
            self._sent_texts.append(str(caption))
        return result

class _VoiceContextProxy:
    def __init__(self, context, bot):
        self._context = context; self.bot = bot

    def __getattr__(self, name):
        return getattr(self._context, name)

class _VoiceMessageProxy:
    def __init__(self, message, sent_texts):
        self._message = message; self._sent_texts = sent_texts

    def __getattr__(self, name):
        return getattr(self._message, name)

    async def reply_text(self, text, *args, **kwargs):
        result = await self._message.reply_text(text, *args, **kwargs)
        if str(text or "").strip():
            self._sent_texts.append(str(text))
        return result

class _VoiceUpdateProxy:
    def __init__(self, update, message):
        self._update = update; self.message = message

    def __getattr__(self, name):
        return getattr(self._update, name)

async def _send_audio_fallback(context, cid, audio):
    """Если Telegram не даёт слать голосовые (настройка приватности у получателя),
    отправляем то же самое обычным аудиофайлом."""
    from io import BytesIO
    buf = BytesIO(audio); buf.name = "aiwa.ogg"
    await context.bot.send_audio(cid, buf, title="Ответ Айвы", performer="Айва")

async def _send_voice_reply(context, cid, text):
    """Speak the complete answer in bounded requests; synthesize chunks in parallel but send in order."""
    try:
        chunks = _bot.L.tts_chunks(text)
        try:
            parallelism = int(os.environ.get("AIWA_TTS_PARALLELISM", "1"))
        except (TypeError, ValueError):
            parallelism = 1
        parallelism = max(1, min(int(getattr(_bot.L, "_tts_provider_concurrency")()), parallelism))
        gate = asyncio.Semaphore(parallelism)

        async def synthesize_one(chunk):
            info = {}
            async with gate:
                audio = await _bot.llm_to_thread(cid, "tts", _bot.L.synthesize, chunk, info)
            return chunk, audio, info

        results = await asyncio.gather(*(synthesize_one(chunk) for chunk in chunks))
        total_ms = 0; total_chars = 0; calls = 0; how = "tts:salute"
        for chunk, audio, info in results:
            if not audio:
                continue
            calls += 1
            total_ms += int(info.get("ms") or 0)
            total_chars += int(info.get("chars") or len(chunk))
            try:
                await context.bot.send_voice(cid, audio)
            except Exception as exc:
                if "voice_messages_forbidden" not in str(exc).lower():
                    raise
                await _bot._send_audio_fallback(context, cid, audio)
                how = "tts:audio"
        if calls:
            _bot.ev(cid, "tts", meta=how, ms=total_ms, n=total_chars, calls=calls)
    except Exception as e:
        _bot.log.warning("voice reply: %s", e)

def _safety_level(text):
    """Classify only the presence of safety guidance; never store answer text."""
    value = str(text or "").lower()
    if re.search(r"\b(103|112)\b|вызов\w*\s+скор\w*|неотложн\w*\s+помощ", value):
        return "emergency"
    if re.search(r"обрат\w*\s+(?:за\s+)?(?:медицинск\w*\s+помощ\w*|к\s+врач\w*)|"
                 r"связ\w*\s+с\s+врач\w*|запис\w*\s+к\s+врач\w*", value):
        return "escalation"
    if re.search(r"не\s+(?:является\s+)?диагноз\w*|не\s+став\w*\s+диагноз", value):
        return "disclaimer"
    return None

def _feedback_sampled(answer_id):
    """Показывает оценку на стабильной доле ответов, а не после каждой реплики."""
    try:
        rate = float(os.environ.get("AIWA_FEEDBACK_SAMPLE_RATE", "0.20"))
    except (TypeError, ValueError):
        rate = 0.20
    rate = max(0.0, min(1.0, rate))
    if rate <= 0:
        return False
    if rate >= 1:
        return True
    bucket = int(_bot._hashlib.sha256(str(answer_id).encode("utf-8")).hexdigest()[:8], 16)
    return bucket < int(rate * (2 ** 32))

def _instrument_feedback_prompt(cid, answer, channel="bot"):
    answer_id = _bot.secrets.token_hex(8)
    sampled = _bot._feedback_sampled(answer_id)
    if sampled:
        _bot._register_feedback_prompt(cid, answer_id, channel)
    level = _bot._safety_level(answer)
    if level:
        _bot.ev(cid, "safety", meta=f"{level}|{answer_id}|{channel}")
    return answer_id if sampled else None

def _register_feedback_prompt(cid, answer_id, channel="bot"):
    """Persist the button entitlement independently from analytics events."""
    answer_id = re.sub(r"[^a-f0-9]", "", str(answer_id or ""))[:32]
    if not answer_id:
        return False
    c = _bot.db()
    try:
        if not _bot._user_write_allowed(cid, conn=c):
            return False
        cur = c.execute(
            """INSERT OR IGNORE INTO feedback_requests
               (chat_id,answer_id,channel,created_at) VALUES(?,?,?,?)""",
            (cid, answer_id, str(channel or "bot")[:24], datetime.now(_bot.TZ).isoformat()),
        )
        c.commit()
        created = cur.rowcount > 0
    finally:
        c.close()
    if created:
        _bot.ev(cid, "feedback_prompt", meta=f"{answer_id}|{channel}")
    return True

def _feedback_prompt_exists(cid, answer_id):
    """Accept feedback only for an answer actually shown to this user."""
    c = _bot.db()
    try:
        if c.execute(
            "SELECT 1 FROM feedback_requests WHERE chat_id=? AND answer_id=? LIMIT 1",
            (cid, answer_id),
        ).fetchone() is not None:
            return True
        v2 = c.execute(
            """SELECT properties_json FROM events_v2
               WHERE user_key=? AND event_name='answer_feedback_prompted'
               ORDER BY occurred_at DESC""",
            (_bot.A2.user_key(cid),),
        ).fetchall()
        for (props_json,) in v2:
            try:
                if json.loads(props_json or "{}").get("answer_id") == answer_id:
                    return True
            except (TypeError, ValueError):
                continue
        # Compatibility with buttons sent before feedback_requests was introduced.
        return c.execute(
            "SELECT 1 FROM events WHERE chat_id=? AND action='feedback_prompt' AND meta LIKE ? LIMIT 1",
            (cid, answer_id + "|%"),
        ).fetchone() is not None
    finally:
        c.close()

def _submit_feedback(cid, answer_id, rating, channel="bot"):
    """Atomically save one rating; repeated taps are successful but do not duplicate analytics."""
    answer_id = re.sub(r"[^a-f0-9]", "", str(answer_id or ""))[:32]
    rating = str(rating or "")
    if not answer_id or rating not in {"helpful", "unhelpful"}:
        return "missing"
    c = _bot.db()
    saved_channel = str(channel or "bot")[:24]
    try:
        if not _bot._user_write_allowed(cid, conn=c):
            return "missing"
        c.execute("BEGIN IMMEDIATE")
        row_ = c.execute(
            "SELECT channel,rating FROM feedback_requests WHERE chat_id=? AND answer_id=?",
            (cid, answer_id),
        ).fetchone()
        if row_ is None:
            # Migrate a still-visible button on first click.
            v2_channel = None
            for (props_json,) in c.execute(
                """SELECT properties_json FROM events_v2
                   WHERE user_key=? AND event_name='answer_feedback_prompted'
                   ORDER BY occurred_at DESC""",
                (_bot.A2.user_key(cid),),
            ).fetchall():
                try:
                    props = json.loads(props_json or "{}")
                except (TypeError, ValueError):
                    continue
                if props.get("answer_id") == answer_id:
                    v2_channel = str(props.get("channel") or saved_channel)[:24]
                    break
            legacy = c.execute(
                """SELECT meta FROM events
                   WHERE chat_id=? AND action='feedback_prompt' AND meta LIKE ?
                   ORDER BY id DESC LIMIT 1""",
                (cid, answer_id + "|%"),
            ).fetchone()
            if legacy is None and v2_channel is None:
                c.rollback()
                return "missing"
            if legacy is not None and "|" in (legacy[0] or ""):
                saved_channel = legacy[0].split("|", 1)[1][:24] or saved_channel
            elif v2_channel:
                saved_channel = v2_channel
            c.execute(
                """INSERT INTO feedback_requests
                   (chat_id,answer_id,channel,created_at) VALUES(?,?,?,?)""",
                (cid, answer_id, saved_channel, datetime.now(_bot.TZ).isoformat()),
            )
            row_ = (saved_channel, None)
        saved_channel = row_[0] or saved_channel
        if row_[1] in {"helpful", "unhelpful"}:
            c.commit()
            return "duplicate"
        c.execute(
            """UPDATE feedback_requests SET rating=?,submitted_at=?
               WHERE chat_id=? AND answer_id=? AND rating IS NULL""",
            (rating, datetime.now(_bot.TZ).isoformat(), cid, answer_id),
        )
        c.commit()
    finally:
        c.close()
    _bot.ev(cid, "feedback", meta=f"{rating}|{answer_id}|{saved_channel}")
    return "saved"

async def send_answer(context, cid, text, st, basis_q, usage=None, quote=None, app_user=None, app_label=None):
    if usage is None: usage = []
    sf = getattr(_bot.L, "split_followups", None)
    clean, sugg = sf(text) if sf else (text, [])
    clean = _bot.guard_aiwa_reply(cid, clean)
    try:
        topical = _bot.L.followups(st, basis_q, clean)
        # For known product topics deterministic relevance wins over a model
        # suggestion that may be well-formed but unrelated to the answer.
        if topical:
            sugg = topical
    except Exception:
        pass
    answer_id = _bot.secrets.token_hex(8)
    feedback_id = answer_id if _bot._feedback_sampled(answer_id) else None
    kb = _bot.sugg_kb(cid, sugg, app_user=app_user, app_label=app_label, feedback_id=feedback_id)
    quote_text = _bot._clip_tg(quote) if quote else None
    rich_sent = False
    if _bot.RICH_OK:
        try:
            md = (("> " + quote_text.replace("\n", " ") + "\n\n") if quote_text else "") + clean
            await _bot.send_rich(context.bot, cid, md, reply_markup=kb)
            rich_sent = True
        except Exception as _re_:
            _bot.log.info("rich fallback: %s", str(_re_)[:120])
    if not rich_sent:
        first_limit = min(_bot.TG_TEXT_CHUNK, _bot.TG_MESSAGE_LIMIT - _bot._tg_units(quote_text) - 1) if quote_text else _bot.TG_TEXT_CHUNK
        parts = _bot.split_tg(clean, first_limit=max(256, first_limit)) or [clean]
        for i, part in enumerate(parts):
            last = i == len(parts) - 1
            if i == 0 and quote_text:
                body = f"<blockquote>{html.escape(quote_text)}</blockquote>\n{_bot.tg_rich(part)}"
                try:
                    await context.bot.send_message(cid, body, reply_markup=(kb if last else None), parse_mode="HTML")
                except _bot.BadRequest:
                    await context.bot.send_message(cid, quote_text + "\n\n" + _bot.md_plain(part),
                                                   reply_markup=(kb if last else None))
            else:
                try:
                    await context.bot.send_message(cid, _bot.tg_rich(part), reply_markup=(kb if last else None), parse_mode="HTML")
                except _bot.BadRequest:
                    await context.bot.send_message(cid, _bot.md_plain(part), reply_markup=(kb if last else None))
    _bot.ev(cid, "assistant_message", meta="bot_rich" if rich_sent else "bot")
    if feedback_id:
        _bot._register_feedback_prompt(cid, answer_id, "bot")
    level = _bot._safety_level(clean)
    if level:
        _bot.ev(cid, "safety", meta=f"{level}|{answer_id}|bot")
    _bot.ev(cid, "tokens", sum(usage), meta="answer", calls=len(usage), usage=usage)
    if _bot._VOICE_TURN.pop(cid, False) and _bot._voice_reply_on():
        await _bot._send_voice_reply(context, cid, clean)

async def _send_summary_text(context, cid, clean, kb):
    """Use Telegram rich messages when available, with a safe HTML fallback."""
    clean = _bot.guard_aiwa_reply(cid, clean)
    if _bot.RICH_OK:
        try:
            await _bot.send_rich(context.bot, cid, clean, reply_markup=kb)
            return
        except Exception as exc:
            _bot.log.info("rich summary fallback: %s", str(exc)[:120])
    try:
        await context.bot.send_message(
            cid, _bot.tg_rich(clean) + "\n\n" + _bot.APP_CTA_HTML,
            reply_markup=kb, parse_mode="HTML",
        )
    except _bot.BadRequest:
        await context.bot.send_message(cid, _bot.md_plain(clean), reply_markup=kb)

def _delivery_summary_fallback(u, st=None, pregnancy=None):
    """Fast deterministic fallback used only when scheduled pre-generation missed."""
    if st is not None:
        return _bot.L.fallback_summary(st, u.get("modules") or ["phase", "general", "food", "training"])
    mode = (u or {}).get("mode") or "none"
    if mode == "preg":
        term = ""
        if pregnancy:
            term = f"Сейчас ориентировочно {pregnancy['week']}-я неделя, {pregnancy['trimester']}-й триместр. "
        return (
            "### 💛 Сегодня\n"
            f"- {term}Ориентируйся на самочувствие и назначения врача.\n"
            "- При боли, кровянистых выделениях, выраженной слабости или резком ухудшении самочувствия свяжись с врачом.\n\n"
            "### 🍽 Основа дня\n"
            "- Регулярно ешь, пей достаточно воды и избегай продуктов, которые врач рекомендовал исключить.\n\n"
            "### 🏋️ Нагрузка\n"
            "- Выбирай только привычную комфортную активность без боли и перегрева."
        )
    if mode == "male":
        return (
            "### ⚡ Сегодня\n"
            "- Это резервная сводка: персональный текст не успел подготовиться заранее.\n"
            "- Оцени энергию, сон и восстановление после последних нагрузок.\n\n"
            "### 🍽 Питание и нагрузка\n"
            "- Выбирай обычный сбалансированный рацион и комфортную активность, оставляя запас сил."
        )
    if mode == "meno":
        context_line = "при менопаузе"
    elif mode == "irregular":
        context_line = "при нерегулярном цикле"
    else:
        context_line = "без привязки к циклу"
    return (
        "### 💛 Сегодня\n"
        f"- Это резервная сводка {context_line}: персональный текст не успел подготовиться заранее.\n"
        "- Отметь энергию и симптомы, чтобы следующая сводка учитывала актуальное самочувствие.\n\n"
        "### 🍽 Питание и нагрузка\n"
        "- Выбирай обычный сбалансированный рацион и комфортную активность по самочувствию."
    )

async def push_general(context, cid, with_image=True, campaign=None):
    u = _bot.row(cid)
    if not u or not _bot.is_onboarded(u):
        return False
    if u.get("mode") == "male":
        with_image = False   # мужская сводка — только текст, без инфографики
    claimed = False; sent_any = False
    if campaign:
        claimed = _bot._claim_push_delivery(cid, campaign)
        if not claimed:
            _bot.log.info("summary push skipped as duplicate: %s %s", cid, campaign)
            return False
    try:
        generation = _bot._user_generation(cid)
        usage = []; day = _bot.dtoday().isoformat()
        _, pregnancy = _bot._summary_state_for_day(u, day)
        key = _bot._summary_key(cid, u, day, None, pregnancy)
        value = _bot._SUM_CACHE.get(key)
        if value is None:
            value = _bot.prepared_summary_get(cid, day, key)
        body, facts = _bot._summary_unpack(value)
        if not body and not campaign:
            hint = _bot._summary_hint(cid, u, pregnancy)
            body = await _bot.llm_to_thread(
                cid, "daily_summary", _bot.L.general_summary,
                _bot.profile_of(u), u.get("mode"), hint=hint, usage=usage,
                user_generation=generation,
            )
            if u.get("mode") == "preg" and _bot._user_write_allowed(cid, generation=generation):
                facts = await _bot.llm_to_thread(
                    cid, "summary_card_facts", _bot.L.summary_card_facts,
                    "preg", None, pregnancy, hint, usage,
                    user_generation=generation,
                )
            if body and _bot._user_write_allowed(cid, generation=generation):
                value = _bot._summary_pack(body, facts)
                _bot._prune_day(_bot._SUM_CACHE); _bot._SUM_CACHE[key] = value
                _bot.prepared_summary_put(cid, day, key, value, generation=generation)
        if not body:
            body = _bot._delivery_summary_fallback(u, pregnancy=pregnancy)
            _bot.ev(cid, "fallback", meta="static:summary_delivery_cache_miss")
        clean, extra = _bot.L.split_followups(body)
        kb = _bot.sugg_kb(cid, _bot.merge_summary_suggestions(u, None, extra), app_user=u,
                     app_label=_bot.APP_BUTTON_TEXT, campaign=campaign)
        _png = (await _bot._general_card_png(cid, u, summary=clean)) if (with_image and _bot.new_cards_on(cid)) else None
        if _png is not None:
            try:
                await _bot.send_rich_with_photo(context.bot, cid, _bot.guard_aiwa_reply(cid, clean), _png, reply_markup=kb)
            except Exception as _ce:
                _bot.log.info("combined card fallback: %s", str(_ce)[:120])
                _bot.ev(cid, "fallback", meta="static:combined_send_fail")
                await _bot.send_daily_infographic(context.bot, cid, u, facts)
                await _bot._send_summary_text(context, cid, clean, kb)
        else:
            if with_image:
                sent_any = await _bot.send_daily_infographic(context.bot, cid, u, facts)
            await _bot._send_summary_text(context, cid, clean, kb)
        sent_any = True
        if usage: _bot.ev(cid, "tokens", sum(usage), meta="summary", calls=len(usage), usage=usage)
        _bot.ev(cid, "goal", meta="summary")
        if campaign:
            _bot._complete_push_delivery(cid, campaign)
            _bot.ev(cid, "broadcast", meta="sent|" + campaign)
        return True
    except Exception:
        if claimed and not sent_any:
            _bot._release_push_delivery(cid, campaign)
        raise

async def send_general(context, cid, key):
    u = _bot.row(cid); await context.bot.send_chat_action(cid, "typing"); _bot.ev(cid, "button")
    qmap = {"food": "Что мне есть сегодня под мой возраст и самочувствие? Дай конкретные продукты или меню на день.",
            "training": "Какая физическая активность мне сейчас подходит и почему? Дай конкретные варианты."}
    usage = []; q = qmap.get(key, key)
    ans = await _bot.think_llm(context, cid, _bot.L.general_answer, _bot.llm_profile_of(u), u.get("mode"), q, hint=_bot.chat_hint(cid), usage=usage)
    _, st = _bot.status_of(cid)
    if key == "food":
        ans += "\n\nВ приложении Айвы можно открыть питание и заменить блюдо кнопкой «Заменить»."
        return await _bot.send_answer(context, cid, ans, st, q, usage=usage, app_user=u, app_label="Открыть питание")
    if key == "training":
        ans += "\n\nВ приложении Айвы можно смотреть нагрузку рядом с календарём, симптомами и статистикой."
        return await _bot.send_answer(context, cid, ans, st, q, usage=usage, app_user=u, app_label="Открыть нагрузку")
    await _bot.send_answer(context, cid, ans, st, q, usage=usage)

def cycle_text_analysis(cid):
    import statistics as ST
    from collections import Counter
    u = _bot.row(cid); cyc = _bot.cycles_of(cid); logs = _bot.logs_of(cid)
    if _bot.is_male_profile(u):
        parts = ["📊 Анализ самочувствия"]
        cnt = Counter()
        for lg in logs:
            for item in lg.get("symptoms", []):
                cnt[item] += 1
        if cnt:
            top = ", ".join(_bot.SYM.get(code, code) for code, _ in cnt.most_common(3))
            parts.append(f"• Чаще всего отмечено: {top}.")
        energy = [lg["energy"] for lg in logs if lg.get("energy")]
        mood = [lg["mood"] for lg in logs if lg.get("mood")]
        if energy:
            parts.append(f"• Средняя энергия по отметкам: {_bot.EN.get(round(ST.mean(energy)), '')}.")
        if mood:
            parts.append(f"• Среднее настроение: {_bot.MOOD.get(round(ST.mean(mood)), '')}.")
        try:
            recent_workout_count = _bot.workouts_count_recent(cid, days=14)
        except Exception as exc:
            _bot.log.warning("male wellbeing analysis workouts unavailable for %s: %s", cid, exc)
            recent_workout_count = 0
        if recent_workout_count:
            parts.append(f"• Тренировок за последние 14 дней: {recent_workout_count}.")
        if len(parts) == 1:
            parts.append(
                "Пока мало данных. Отмечай энергию, настроение, питание и "
                "нагрузку — анализ станет точнее."
            )
        parts.append("\nПодробную выписку по самочувствию можно собрать кнопкой ниже.")
        return "\n".join(parts)
    lens = []
    for i in range(1, len(cyc)):
        d = (date.fromisoformat(cyc[i]) - date.fromisoformat(cyc[i - 1])).days
        if 15 <= d <= 60: lens.append(d)
    parts = ["📊 Анализ твоих данных"]
    if not _bot.is_cycle(u):
        parts.append("• Сейчас режим без отслеживания фазы цикла, смотрю по симптомам и самочувствию.")
    elif len(lens) >= 2:
        avg = round(ST.mean(lens)); sd = ST.pstdev(lens)
        reg = "регулярный" if sd <= 2.5 else ("умеренно нерегулярный" if sd <= 5 else "нерегулярный")
        parts.append(f"• Средняя длина цикла {avg} дн (разброс {min(lens)}-{max(lens)}), цикл {reg}.")
        ov = max(12, avg - 14)
        parts.append(f"• Овуляция ориентировочно на {ov} день, фертильное окно за 5 дней до неё.")
    elif lens:
        parts.append(f"• Длина цикла около {lens[0]} дн, для оценки регулярности нужно больше отмеченных циклов.")
    else:
        parts.append(f"• Отмеченных циклов пока мало. Заявленная длина {u.get('cycle_len') or 28} дн.")
    cnt = Counter()
    for lg in logs:
        for x in lg.get("symptoms", []): cnt[x] += 1
    if cnt:
        top = ", ".join(_bot.SYM.get(c, c) for c, _ in cnt.most_common(3))
        parts.append(f"• Чаще всего отмечаешь: {top}.")
    en = [lg["energy"] for lg in logs if lg.get("energy")]
    if en:
        parts.append(f"• Средняя энергия по отметкам: {_bot.EN.get(round(ST.mean(en)), '')}.")
    if len(parts) == 2 and not cnt and not en:
        parts.append("Пока мало данных. Отмечай месячные и симптомы — и анализ станет точнее.")
    parts.append("\nПодробную выписку для врача можно собрать кнопкой ниже.")
    return "\n".join(parts)

async def dispatch_intent(context, update, cid, u, intent, txt="", journal=None, user_generation=None):
    msg = update.message; general = not _bot.is_cycle(u); _bot.ev(cid, "manual", meta="intent_" + intent)
    turn_generation = _bot._user_generation(cid) if user_generation is None else int(user_generation)
    if intent == "current_date":
        return await msg.reply_text(_bot.current_date_text())
    if _bot.is_male_profile(u) and intent in {
        "phases", "addcycles", "period_end", "cyclelen", "logperiod",
        "calendar", "period",
    }:
        _bot.upsert(cid, state=None)
        _bot.ev(cid, "male_mode_block", meta="intent_" + intent)
        return await msg.reply_text(_bot.MALE_PROFILE_FUNCTION_TEXT)
    if intent == "analysis":
        return await msg.reply_text(_bot.cycle_text_analysis(cid),
            reply_markup=InlineKeyboardMarkup([[_bot.B("Собрать выписку PDF", "history")]]))
    if intent == "time":
        _bot.upsert(cid, state="await_time")
        return await msg.reply_text("Во сколько присылать сводку (МСК)? Выбери или впиши своё время, например 08:00.", reply_markup=_bot.time_kb())
    if intent == "checkin":
        _bot.log_ensure(cid, _bot.dtoday().isoformat())
        return await msg.reply_text("Отметим самочувствие. Какая сегодня энергия?", reply_markup=_bot.en_kb("e"))
    if intent == "history":
        return await msg.reply_text(_bot.report_prompt(u), reply_markup=_bot.HIST_KB)
    if intent == "phases":
        _pu = []
        _pa = None
        try: _pa = await _bot.llm_to_thread(cid, "phases", _bot.L.answer_question, _bot.status_of(cid)[1], "Расскажи кратко про четыре фазы цикла: сколько длится каждая, какие гормоны ведут и как это отражается на самочувствии, питании и нагрузке.", _bot.llm_profile_of(_bot.row(cid)), None, usage=_pu)
        except Exception: pass
        if _pu: _bot.ev(cid, "tokens", sum(_pu), meta="answer", calls=len(_pu), usage=_pu)
        if _pa:
            return await _bot.reply_long(msg, _bot.L.split_followups(_pa)[0])
        _bot.ev(cid, "fallback", meta="static:phases")
        return await msg.reply_text(_bot.PHASES_TEXT)
    if intent == "addcycles":
        return await _bot.addcycles_entry(context, cid, msg)
    if intent == "profile":
        _bot.upsert(cid, state="await_profile_edit")
        return await msg.reply_text("Обновим данные. Напиши через пробел рост (см), вес (кг), возраст. Например 168 60 30.")
    if intent == "period_end":
        result = await _bot.log_period_end_action(
            cid, u, txt,
            mutation_key=_bot.chat_mutation_key("telegram", getattr(update, "update_id", None)),
            user_generation=turn_generation,
        )
        return await msg.reply_text(result["text"])
    if intent == "cyclelen":
        mnum = re.search(r"\b(1[5-9]|[2-5]\d|60)\b", txt or "")
        if mnum:
            _bot.upsert(cid, cycle_len=int(mnum.group(1)), state=None)
            await msg.reply_text(f"Записала длину цикла: {mnum.group(1)} дн.")
            return await _bot.push_summary(context, cid)
        _bot.upsert(cid, state="await_cycle_len")
        return await msg.reply_text("Какая у тебя средняя длина цикла в днях? Обычно 21-35. Напиши число, например 28.")
    if intent == "unlink":
        return await msg.reply_text("Чтобы отключить партнёра, введи команду /unlink")
    if intent == "wipe":
        return await msg.reply_text("Чтобы стереть все свои данные и отключить бота, введи команду /stop")
    if intent == "help":
        return await _bot.help_cmd(update, context)
    if intent == "partner":
        return await _bot.partner_entry(context, cid, msg)
    if intent == "logperiod":
        result = await _bot.log_period_action(
            cid, u, txt, context=context,
            mutation_key=_bot.chat_mutation_key("telegram", getattr(update, "update_id", None)),
            user_generation=turn_generation,
        )
        return await msg.reply_text(result["text"])
    if intent == "logjournalbatch":
        await context.bot.send_chat_action(cid, "typing")
        result = await _bot.log_journal_batch_action(
            cid, u, journal,
            user_generation=turn_generation,
            mutation_key=_bot.chat_mutation_key(
                "telegram", getattr(update, "update_id", None),
            ),
        )
        rows = []
        for record in result.get("records", []):
            record_id = record.get("record_id")
            if record.get("intent") == "logmeal":
                rows.append([_bot.B("🗑 Убрать еду", f"mdel:{record_id}")])
            elif record.get("intent") == "logworkout":
                rows.append([_bot.B("🗑 Убрать тренировку", f"wdel:{record_id}")])
        wu = _bot.webapp_url(u) or _bot.AIWA_WEBAPP_URL
        if wu and rows:
            rows.append([InlineKeyboardButton("Открыть Айву", web_app=WebAppInfo(url=wu))])
        return await msg.reply_text(
            result["text"],
            reply_markup=(InlineKeyboardMarkup(rows) if rows else None),
        )
    if intent == "logworkout":
        await context.bot.send_chat_action(cid, "typing")
        generation = turn_generation
        result = await _bot.log_workout_action(
            cid, u, txt, user_generation=generation,
            mutation_key=_bot.chat_mutation_key("telegram", getattr(update, "update_id", None)),
            preparsed_workout=((journal or {}).get("workout")),
        )
        rows = []
        if result.get("ok") and result.get("record_id"):
            rows.append([_bot.B("🗑 Убрать тренировку", f"wdel:{result['record_id']}")])
            wu = _bot.campaign_webapp_url(u, tab="train")
            if wu:
                rows.append([InlineKeyboardButton("Открыть нагрузку", web_app=WebAppInfo(url=wu))])
        return await msg.reply_text(result["text"], reply_markup=(InlineKeyboardMarkup(rows) if rows else None))
    if intent == "updateworkout":
        await context.bot.send_chat_action(cid, "typing")
        result = await _bot.log_workout_update_action(
            cid, u, txt, (journal or {}).get("target_id"),
            user_generation=turn_generation,
            mutation_key=_bot.chat_mutation_key("telegram", getattr(update, "update_id", None)),
            preparsed_workout=((journal or {}).get("workout")),
        )
        rows = []
        if result.get("ok") and result.get("record_id"):
            rows.append([_bot.B("🗑 Убрать тренировку", f"wdel:{result['record_id']}")])
            wu = _bot.campaign_webapp_url(u, tab="train")
            if wu:
                rows.append([InlineKeyboardButton("Открыть нагрузку", web_app=WebAppInfo(url=wu))])
        return await msg.reply_text(result["text"], reply_markup=(InlineKeyboardMarkup(rows) if rows else None))
    if intent == "training":
        if general: return await _bot.send_general(context, cid, "training")
        _, st = _bot.status_of(cid); return await _bot.send_section(context, cid, st, "training")
    if intent == "logmealbatch":
        await context.bot.send_chat_action(cid, "typing")
        result = await _bot.log_food_batch_action(
            cid, u, journal,
            user_generation=turn_generation,
            mutation_key=_bot.chat_mutation_key(
                "telegram", getattr(update, "update_id", None),
            ),
        )
        rows = [
            [_bot.B("🗑 Убрать из дневника", f"mdel:{record_id}")]
            for record_id in result.get("record_ids", [])
        ]
        wu = _bot.campaign_webapp_url(u, tab="food")
        if wu and result.get("record_ids"):
            rows.append([
                InlineKeyboardButton("Открыть дневник", web_app=WebAppInfo(url=wu)),
            ])
        return await msg.reply_text(
            result["text"],
            reply_markup=(InlineKeyboardMarkup(rows) if rows else None),
        )
    if intent == "logmeal":
        await context.bot.send_chat_action(cid, "typing")
        generation = turn_generation
        result = await _bot.log_food_action(
            cid, u, txt, user_generation=generation,
            mutation_key=_bot.chat_mutation_key("telegram", getattr(update, "update_id", None)),
            preparsed_food_text=((journal or {}).get("food_text")),
            preparsed_slot=((journal or {}).get("slot")),
            preparsed_food_record=((journal or {}).get("food_record")),
        )
        rows = []
        if result.get("ok") and result.get("record_id"):
            rows.append([_bot.B("🗑 Убрать из дневника", f"mdel:{result['record_id']}")])
            wu = _bot.campaign_webapp_url(u, tab="food")
            if wu:
                rows.append([InlineKeyboardButton("Открыть дневник", web_app=WebAppInfo(url=wu))])
        return await msg.reply_text(result["text"], reply_markup=(InlineKeyboardMarkup(rows) if rows else None))
    if intent == "updatemeal":
        await context.bot.send_chat_action(cid, "typing")
        result = await _bot.log_food_update_action(
            cid, u, txt, (journal or {}).get("target_id"),
            user_generation=turn_generation,
            mutation_key=_bot.chat_mutation_key("telegram", getattr(update, "update_id", None)),
            preparsed_food_text=((journal or {}).get("food_text")),
            preparsed_food_record=((journal or {}).get("food_record")),
        )
        rows = []
        if result.get("ok") and result.get("record_id"):
            rows.append([_bot.B("🗑 Убрать из дневника", f"mdel:{result['record_id']}")])
            wu = _bot.campaign_webapp_url(u, tab="food")
            if wu:
                rows.append([InlineKeyboardButton("Открыть дневник", web_app=WebAppInfo(url=wu))])
        return await msg.reply_text(result["text"], reply_markup=(InlineKeyboardMarkup(rows) if rows else None))
    if intent == "movemealslot":
        await context.bot.send_chat_action(cid, "typing")
        result = await _bot.move_meal_slot_action(
            cid, (journal or {}).get("target_id"), (journal or {}).get("slot"),
            user_generation=turn_generation,
            mutation_key=_bot.chat_mutation_key("telegram", getattr(update, "update_id", None)),
        )
        return await msg.reply_text(result["text"])
    if intent == "appendmealitem":
        await context.bot.send_chat_action(cid, "typing")
        result = await _bot.append_meal_item_action(
            cid, u, (journal or {}).get("target_id"), (journal or {}).get("food_text"),
            user_generation=turn_generation,
            mutation_key=_bot.chat_mutation_key("telegram", getattr(update, "update_id", None)),
            preparsed_food_record=((journal or {}).get("food_record")),
        )
        return await msg.reply_text(result["text"])
    if intent == "journalreplay":
        result = _bot.journal_replay_result(cid, journal)
        return await msg.reply_text(result["text"])
    if intent == "journalunavailable":
        return await msg.reply_text(
            "Сейчас не получилось достаточно быстро и надёжно разобрать изменение дневника, "
            "поэтому я ничего не меняла. Попробуй повторить одной фразой через минуту."
        )
    if intent == "clarifymeal":
        return await msg.reply_text(
            "Не уверена, какую именно запись еды изменить, поэтому ничего не меняла. "
            "Напиши название и новое количество, например: «чипсы — 100 г»."
        )
    if intent == "clarifyworkout":
        return await msg.reply_text(
            "Не уверена, какую именно тренировку изменить, поэтому ничего не меняла. "
            "Напиши её название и исправление, например: «приседания — 3 подхода по 12»."
        )
    if intent == "diary":
        await context.bot.send_chat_action(cid, "typing"); usage = []
        t = await _bot.answer_diary(cid, usage); _bot.ev(cid, "tokens", sum(usage), meta="diary_reco", calls=len(usage), usage=usage)
        return await msg.reply_text(t)
    if intent == "food":
        if general: return await _bot.send_general(context, cid, "food")
        _, st = _bot.status_of(cid); return await _bot.send_section(context, cid, st, "food")
    if intent == "calendar":
        if general: return await msg.reply_text("Пока не вижу данных цикла. Отметь последние месячные командой /period или кнопкой «Отметить месячные», и я покажу фазы и календарь.")
        _, st = _bot.status_of(cid)
        if st["status"] != "normal": return await _bot.send_delay(context, cid, st)
        return await _bot.send_infographic(context.bot, cid)
    if intent == "period":
        _bot.upsert(cid, state="await_period_date")
        return await msg.reply_text("Напиши дату начала последних месячных, например 25.05.2026, или нажми кнопку. Потом даты можно редактировать в приложении.", reply_markup=_bot.PERIOD_KB)

async def push_summary(context, cid, with_image=True, campaign=None):
    u0 = _bot.row(cid)
    if u0 and not _bot.is_cycle(u0):
        return await _bot.push_general(context, cid, with_image=with_image, campaign=campaign)
    u, st = _bot.status_of(cid)
    if not st: return
    if st["status"] != "normal":
        return await _bot.send_delay(context, cid, st, campaign=campaign)
    claimed = False; sent_any = False
    if campaign:
        claimed = _bot._claim_push_delivery(cid, campaign)
        if not claimed:
            _bot.log.info("summary push skipped as duplicate: %s %s", cid, campaign)
            return False
    try:
        generation = _bot._user_generation(cid)
        usage = []; day = _bot.dtoday().isoformat()
        key = _bot._summary_key(cid, u, day, st, None)
        value = _bot._SUM_CACHE.get(key)
        if value is None:
            value = _bot.prepared_summary_get(cid, day, key)
        body, facts = _bot._summary_unpack(value)
        if not body and not campaign:
            hint = _bot._summary_hint(cid, u)
            body = await _bot.llm_to_thread(
                cid, "daily_summary", _bot.L.generate_summary,
                st, u["modules"], hint=hint, usage=usage,
                user_generation=generation,
            )
            if _bot._user_write_allowed(cid, generation=generation):
                facts = await _bot.llm_to_thread(
                    cid, "summary_card_facts", _bot.L.summary_card_facts,
                    "cycle", st, None, hint, usage,
                    user_generation=generation,
                )
            if body and _bot._user_write_allowed(cid, generation=generation):
                value = _bot._summary_pack(body, facts)
                _bot._prune_day(_bot._SUM_CACHE); _bot._SUM_CACHE[key] = value
                _bot.prepared_summary_put(cid, day, key, value, generation=generation)
        if not body:
            body = _bot._delivery_summary_fallback(u, st=st)
            _bot.ev(cid, "fallback", meta="static:summary_delivery_cache_miss")
        clean, extra = _bot.L.split_followups(body)
        kb = _bot.sugg_kb(cid, _bot.merge_summary_suggestions(u, st, extra), app_user=u,
                     app_label=_bot.APP_BUTTON_TEXT, campaign=campaign)
        _png = (await _bot._cycle_card_png(cid, u, st, summary=clean)) if (with_image and _bot.new_cards_on(cid)) else None
        if _png is not None:
            try:
                await _bot.send_rich_with_photo(context.bot, cid, _bot.guard_aiwa_reply(cid, clean), _png, reply_markup=kb)
            except Exception as _ce:
                _bot.log.info("combined card fallback: %s", str(_ce)[:120])
                _bot.ev(cid, "fallback", meta="static:combined_send_fail")
                await _bot.send_daily_infographic(context.bot, cid, u, facts, st)
                await _bot._send_summary_text(context, cid, clean, kb)
        else:
            if with_image:
                sent_any = await _bot.send_daily_infographic(context.bot, cid, u, facts, st)
            await _bot._send_summary_text(context, cid, clean, kb)
        sent_any = True
        if usage: _bot.ev(cid, "tokens", sum(usage), meta="summary", calls=len(usage), usage=usage)
        _bot.ev(cid, "goal", meta="summary")
        if campaign:
            _bot._complete_push_delivery(cid, campaign)
            _bot.ev(cid, "broadcast", meta="sent|" + campaign)
        return True
    except Exception:
        if claimed and not sent_any:
            _bot._release_push_delivery(cid, campaign)
        raise

async def push_checkin(context, cid, campaign=None):
    """После утренней сводки — быстрый чек-ин. Переиспользует существующий поток ci:* (энергия→настроение→симптомы)."""
    claimed = False
    delivered = False
    try:
        u = _bot.row(cid)
        if not _bot.is_onboarded(u): return
        if campaign:
            claimed = _bot._claim_push_delivery(cid, campaign)
            if not claimed:
                _bot.log.info("checkin push skipped as duplicate: %s %s", cid, campaign)
                return False
        _bot.log_ensure(cid, _bot.dtoday().isoformat())
        await context.bot.send_message(cid,
            "Как ты сегодня? Отметь за 10 секунд — подстрою совет дня под твоё реальное состояние.\n\nКакая энергия?",
            reply_markup=_bot.en_kb("e"))
        delivered = True
        if campaign:
            _bot._complete_push_delivery(cid, campaign)
            _bot.ev(cid, "broadcast", meta="sent|" + campaign)
        return True
    except Exception as e:
        if claimed and not delivered:
            try: _bot._release_push_delivery(cid, campaign)
            except Exception as release_error: _bot.log.warning("checkin claim release %s: %s", cid, release_error)
        if campaign:
            _bot._record_push_failure(cid, campaign, e)
        _bot.log.warning("checkin push %s: %s", cid, e)
        return False

# ================= Проактивный движок =================
PROACTIVE_MIN = int(os.environ.get("AIWA_PROACTIVE_MIN", "40"))
def _candidate_mode():
    # candidate/no-poll: кандидат production-раскладки поднимает HTTP, Mini App
    # и health, но не вызывает getUpdates, не запускает cron/broadcast/AI
    # workers и не пишет в Telegram (menu button, команды). Позволяет проверить
    # systemd/Caddy/release layout, пока действующий production ещё поллит.
    return os.environ.get("AIWA_CANDIDATE", "0") in ("1", "true", "True", "yes", "on")

def _proactive_enabled():
    return os.environ.get("AIWA_PROACTIVE", "0") in ("1", "true", "True", "yes", "on")
def _proactive_preference_on(cid):
    """User-level opt-in shared by the new engine and legacy optional jobs."""
    user = _bot.row(cid)
    return bool(user and user.get("proactive_enabled", True))
def _proactive_on(cid):
    if not _bot._proactive_enabled():
        return False
    if not _bot._proactive_preference_on(cid):
        return False
    raw = (os.environ.get("AIWA_PROACTIVE_IDS", "") or "").strip()
    if not raw or raw.lower() == "all":
        return True  # по умолчанию — все пользователи
    ids = set(x.strip() for x in raw.split(",") if x.strip())
    if _bot.AIWA_ADMIN:
        ids.add(str(_bot.AIWA_ADMIN))
    return str(cid) in ids
def _pa_recent(cid, key, days):
    try:
        c = _bot.db(); r = c.execute("SELECT last_ts FROM proactive_state WHERE chat_id=? AND signal=?", (cid, key)).fetchone(); c.close()
        if not r or not r[0]:
            return False
        return (_bot.dtoday() - date.fromisoformat(r[0][:10])).days < max(1, int(days))
    except Exception:
        return False
def _pa_seen(cid, key):
    """Return whether a lifetime milestone signal was already processed."""
    try:
        c = _bot.db()
        r = c.execute(
            "SELECT 1 FROM proactive_state WHERE chat_id=? AND signal=? LIMIT 1",
            (cid, key),
        ).fetchone()
        c.close()
        return bool(r)
    except Exception:
        return False
def _pa_suppressed(cid, candidate):
    """Apply lifetime semantics to milestones and cooldowns to recurring nudges."""
    if candidate.get("once"):
        return _bot._pa_seen(cid, candidate["key"])
    return _bot._pa_recent(cid, candidate["key"], candidate.get("cooldown", 2))
def _pa_mark(cid, key):
    try:
        c = _bot.db()
        if not _bot._user_write_allowed(cid, conn=c):
            c.close(); return False
        c.execute("INSERT OR REPLACE INTO proactive_state(chat_id,signal,last_ts) VALUES(?,?,?)",
                            (cid, key, datetime.now(_bot.TZ).isoformat())); c.commit(); c.close()
        return True
    except Exception as e:
        _bot.log.warning("pa_mark: %s", e)
def _pa_logged_today(cid):
    try:
        c = _bot.db(); r = c.execute("SELECT COUNT(*) FROM proactive_log WHERE chat_id=? AND ts>=?",
                               (cid, _bot.dtoday().isoformat())).fetchone(); c.close()
        return bool(r and r[0])
    except Exception:
        return False
def _pa_logrow(cid, key, score, sent, text):
    try:
        c = _bot.db()
        if not _bot._user_write_allowed(cid, conn=c):
            c.close(); return False
        c.execute("INSERT INTO proactive_log(chat_id,ts,signal,score,sent,text) VALUES(?,?,?,?,?,?)",
                            (cid, datetime.now(_bot.TZ).isoformat(), key, int(score), int(sent), text or "")); c.commit(); c.close()
        return True
    except Exception as e:
        _bot.log.warning("pa_logrow: %s", e)
