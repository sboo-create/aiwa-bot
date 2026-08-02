import unittest
import json
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INDEX = (ROOT / "webapp2" / "index.html").read_text(encoding="utf-8")
AIWA_SOURCE = ROOT / "frontend" / "src" / "aiwa"


def function_source(name):
    """Return one classic-script function, including balanced nested blocks."""
    markers = (f"async function {name}(", f"function {name}(")
    starts = [INDEX.find(marker) for marker in markers]
    starts = [start for start in starts if start >= 0]
    if not starts:
        raise AssertionError(f"function {name} not found")
    start = min(starts)
    opening = INDEX.find("{", start)
    depth = 0
    quote = None
    escaped = False
    line_comment = False
    block_comment = False
    i = opening
    while i < len(INDEX):
        char = INDEX[i]
        nxt = INDEX[i + 1] if i + 1 < len(INDEX) else ""
        if line_comment:
            if char == "\n":
                line_comment = False
        elif block_comment:
            if char == "*" and nxt == "/":
                block_comment = False
                i += 1
        elif quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = None
        elif char in ("'", '"', "`"):
            quote = char
        elif char == "/" and nxt == "/":
            line_comment = True
            i += 1
        elif char == "/" and nxt == "*":
            block_comment = True
            i += 1
        elif char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                return INDEX[start:i + 1]
        i += 1
    raise AssertionError(f"function {name} is not balanced")


class Phase3HostContractTests(unittest.TestCase):
    def test_legacy_workout_reuses_persisted_identity_after_lost_ack(self):
        pending = function_source("workoutPending")
        save = function_source("saveWorkout")
        gesture = function_source("foodGestureId")

        self.assertIn("sessionStorage.getItem(key)", pending)
        self.assertIn("sessionStorage.setItem(key,JSON.stringify(pending))", pending)
        self.assertIn("date:String(body.date||'')", pending)
        self.assertIn("body.request_id=pending.request_id", save)
        self.assertIn("sessionStorage.removeItem(pending.key)", save)

        script = f"""
var store={{}},submissions=[],uuid=0;
var sessionStorage={{
  getItem:function(key){{return Object.prototype.hasOwnProperty.call(store,key)?store[key]:null;}},
  setItem:function(key,value){{store[key]=value;}},
  removeItem:function(key){{delete store[key];}}
}};
var window={{
  crypto:{{randomUUID:function(){{uuid+=1;return"uuid-"+uuid;}}}},
  scrollTo:function(){{}}
}};
var document={{getElementById:function(){{return null;}}}};
var trcur={{type:"Ходьба",dur:"30",rpe:"5",date:"2026-08-01",ex:{{
  "Быстрая ходьба":{{sel:true,kind:false,strength:false,timed:false,group:"Кардио"}}
}}}};
var responseQueue=[
  {{ok:false,text:"lost acknowledgement A"}},
  {{ok:false,text:"lost acknowledgement B"}},
  {{ok:true,review:"ok",calories:120,muscles:"ноги"}}
];
async function api(_url,body){{submissions.push(JSON.parse(JSON.stringify(body)));return responseQueue.shift();}}
function toast(){{}}
function closeHub(){{}}
function loadTrWeek(){{}}
function renderTrReview(){{}}
{gesture}
{pending}
{save}
(async function(){{
  await saveWorkout();
  var pendingKeys=Object.keys(store).filter(function(key){{return key.indexOf("aiwa:workout-pending:")===0;}});
  var kept=JSON.parse(store[pendingKeys[0]]||"null");
  // A different failed gesture must not overwrite A's unacknowledged identity.
  trcur={{type:"Йога",dur:"20",rpe:"3",date:"2026-08-01",ex:{{
    "Мягкая йога":{{sel:true,kind:false,strength:false,timed:false,group:"Мобильность"}}
  }}}};
  await saveWorkout();
  // Recreate A's legacy panel state: only sessionStorage survives the reopen.
  trcur={{type:"Ходьба",dur:"30",rpe:"5",date:"2026-08-01",ex:{{
    "Быстрая ходьба":{{sel:true,kind:false,strength:false,timed:false,group:"Кардио"}}
  }}}};
  await saveWorkout();
  var remaining=Object.keys(store).filter(function(key){{return key.indexOf("aiwa:workout-pending:")===0;}}).map(function(key){{return JSON.parse(store[key]).request_id;}});
  process.stdout.write(JSON.stringify({{
    first:submissions[0].request_id,other:submissions[1].request_id,
    retry:submissions[2].request_id,date:submissions[2].date,kept:kept&&kept.request_id,
    remaining:remaining,
    uuid:uuid
  }}));
}})().catch(function(error){{console.error(error);process.exit(1);}});
"""
        completed = subprocess.run(
            ["node", "-e", script], check=True, capture_output=True, text=True
        )
        self.assertEqual(json.loads(completed.stdout), {
            "first": "uuid-1",
            "other": "uuid-2",
            "retry": "uuid-1",
            "date": "2026-08-01",
            "kept": "uuid-1",
            "remaining": ["uuid-2"],
            "uuid": 2,
        })

    def test_legacy_manual_food_rotates_after_two_midnights_and_recovers_expiry(self):
        pending = function_source("manualFoodPending")
        clear = function_source("clearManualFoodPending")
        save = function_source("saveManual")
        gesture = function_source("foodGestureId")

        self.assertIn("pending.date!==today&&pending.date!==yesterday", pending)
        self.assertIn("aiwa:food-manual-pending:", pending)
        self.assertIn("current.request_id!==pending.request_id", clear)
        self.assertIn("r.error==='date_out_of_range'", save)
        self.assertIn("r.error==='food_target_expired'", save)

        script = f"""
var day="2026-08-02",store={{}},submissions=[],uuid=0,applied=0;
var sessionStorage={{
  getItem:function(key){{return Object.prototype.hasOwnProperty.call(store,key)?store[key]:null;}},
  setItem:function(key,value){{store[key]=value;}},
  removeItem:function(key){{delete store[key];}}
}};
var window={{crypto:{{randomUUID:function(){{uuid+=1;return"uuid-"+uuid;}}}}}};
function moscowDateIso(){{return day;}}
{gesture}
{pending}
{clear}
var form={{title:"Каша",kcal:"320",protein:"12",fat:"8",carbs:"45",grams:"250",slot:"breakfast"}};
var first=manualFoodPending(form);
day="2026-08-03";
var withinWindow=manualFoodPending(form);
day="2026-08-04";
var afterTwoMidnights=manualFoodPending(form);

var responseQueue=[
  {{ok:false,error:"date_out_of_range",message:"expired"}},
  {{ok:true,date:"2026-08-05",meal_id:7}}
];
var document={{getElementById:function(id){{
  if(id==="ed-manual")return{{getAttribute:function(){{return"breakfast";}}}};
  return null;
}}}};
function _gv(id){{return ({{
  "f-title-manual":"Каша","f-kcal-manual":"320","f-p-manual":"12",
  "f-f-manual":"8","f-c-manual":"45","f-g-manual":"250"
}})[id]||"";}}
async function api(_url,body){{submissions.push(JSON.parse(JSON.stringify(body)));return responseQueue.shift();}}
function showFoodLoading(){{}}
function hideFoodLoading(){{}}
function toast(){{}}
function haptic(){{}}
function _applyDiary(){{applied+=1;return true;}}
{save}
(async function(){{
  // The Aug 4 identity is still yesterday on Aug 5, but a structured server
  // expiry retires it and retries once with a fresh current-day identity.
  day="2026-08-05";
  await saveManual("manual");
  process.stdout.write(JSON.stringify({{
    first:first,within:withinWindow,rotated:afterTwoMidnights,
    retryIds:submissions.map(function(item){{return item.request_id;}}),
    retryDates:submissions.map(function(item){{return item.date;}}),
    cleared:Object.keys(store).every(function(key){{return key.indexOf("aiwa:food-manual-pending:")!==0;}}),
    applied:applied,uuid:uuid
  }}));
}})().catch(function(error){{console.error(error);process.exit(1);}});
"""
        completed = subprocess.run(
            ["node", "-e", script], check=True, capture_output=True, text=True
        )
        result = json.loads(completed.stdout)
        self.assertEqual(result["first"]["request_id"], "uuid-1")
        self.assertEqual(result["within"], result["first"])
        self.assertTrue(
            result["rotated"]["key"].startswith("aiwa:food-manual-pending:")
        )
        self.assertEqual(result["rotated"]["request_id"], "uuid-2")
        self.assertEqual(result["rotated"]["date"], "2026-08-04")
        self.assertEqual(result["retryIds"], ["uuid-2", "uuid-3"])
        self.assertEqual(result["retryDates"], ["2026-08-04", "2026-08-05"])
        self.assertTrue(result["cleared"])
        self.assertEqual(result["applied"], 1)
        self.assertEqual(result["uuid"], 3)

    def test_legacy_manual_food_late_response_cannot_retire_new_identity(self):
        pending = function_source("manualFoodPending")
        clear = function_source("clearManualFoodPending")
        save = function_source("saveManual")
        gesture = function_source("foodGestureId")

        script = f"""
var day="2026-08-02",store={{}},submissions=[],deferred=[],uuid=0,title="Каша";
var sessionStorage={{
  getItem:function(key){{return Object.prototype.hasOwnProperty.call(store,key)?store[key]:null;}},
  setItem:function(key,value){{store[key]=value;}},
  removeItem:function(key){{delete store[key];}}
}};
var window={{crypto:{{randomUUID:function(){{uuid+=1;return"uuid-"+uuid;}}}}}};
function moscowDateIso(){{return day;}}
{gesture}
{pending}
{clear}
var document={{getElementById:function(id){{if(id==="ed-manual")return{{getAttribute:function(){{return"breakfast";}}}};return null;}}}};
function _gv(id){{return id==="f-title-manual"?title:({{
  "f-kcal-manual":"320","f-p-manual":"12","f-f-manual":"8",
  "f-c-manual":"45","f-g-manual":"250"
}})[id]||"";}}
function api(_url,body){{submissions.push(JSON.parse(JSON.stringify(body)));return new Promise(function(resolve){{deferred.push(resolve);}});}}
function showFoodLoading(){{}}
function hideFoodLoading(){{}}
function toast(){{}}
function haptic(){{}}
function _applyDiary(){{return true;}}
{save}
(async function(){{
  var oldSave=saveManual("manual");
  await Promise.resolve();
  // The same payload rotates after two Moscow midnights while the old request
  // remains unresolved, so both requests share a storage key but not an ID.
  day="2026-08-04";
  var newSave=saveManual("manual");
  await Promise.resolve();
  deferred[0]({{ok:true,date:"2026-08-02",meal_id:1}});
  await oldSave;
  var keys=Object.keys(store).filter(function(key){{return key.indexOf("aiwa:food-manual-pending:")===0;}});
  var afterLateSuccess=JSON.parse(store[keys[0]]||"null");
  deferred[1]({{ok:false,error:"network",message:"retry later"}});
  await newSave;
  day="2026-08-06";
  var expiringOld=saveManual("manual");
  await Promise.resolve();
  day="2026-08-08";
  var latest=saveManual("manual");
  await Promise.resolve();
  deferred[2]({{ok:false,error:"food_target_expired",message:"expired"}});
  await expiringOld;
  var afterLateExpiry=JSON.parse(store[keys[0]]||"null");
  deferred[3]({{ok:false,error:"network",message:"retry later"}});
  await latest;
  process.stdout.write(JSON.stringify({{
    ids:submissions.map(function(item){{return item.request_id;}}),
    afterLateSuccess:afterLateSuccess,
    afterLateExpiry:afterLateExpiry,
    finalPending:JSON.parse(store[keys[0]]||"null"),uuid:uuid
  }}));
}})().catch(function(error){{console.error(error);process.exit(1);}});
"""
        completed = subprocess.run(
            ["node", "-e", script], check=True, capture_output=True, text=True
        )
        result = json.loads(completed.stdout)
        self.assertEqual(
            result["ids"], ["uuid-1", "uuid-2", "uuid-3", "uuid-4"]
        )
        self.assertEqual(result["afterLateSuccess"]["request_id"], "uuid-2")
        self.assertEqual(result["afterLateExpiry"]["request_id"], "uuid-4")
        self.assertEqual(result["finalPending"]["request_id"], "uuid-4")
        self.assertEqual(result["uuid"], 4)

    def test_atomic_journal_uses_fixed_snapshot_and_refreshes_before_resolve(self):
        snapshot = function_source("journalRequestSnapshot")
        bridge = function_source("aiwaSaveJournal")

        self.assertIn("date:source.date", snapshot)
        self.assertIn("source.symptoms.slice()", snapshot)
        self.assertIn("source.custom_symptoms.slice()", snapshot)
        self.assertIn('hasOwnProperty.call(source,"period")', snapshot)
        self.assertIn("var body=journalRequestSnapshot(payload);", bridge)
        request = bridge.index('await api("/api/journal",body)')
        refresh = bridge.index("await reloadSettingsData()")
        success = bridge.index("return Object.assign({},result")
        self.assertLess(request, refresh)
        self.assertLess(refresh, success)
        self.assertNotIn("toast(", bridge)
        self.assertNotIn("haptic(", bridge)
        self.assertNotIn("go(", bridge)

    def test_settings_refresh_updates_data_without_navigation(self):
        refresh = function_source("reloadSettingsData")
        render = function_source("renderCurrentDataScreen")

        self.assertIn('await api("/api/data",{name:NAME})', refresh)
        self.assertIn("request=++SETTINGS_DATA_REQUEST", refresh)
        self.assertIn("await latest.promise", refresh)
        self.assertIn("D=d;", refresh)
        self.assertIn("applyCanonicalToday();", refresh)
        self.assertIn("syncMarks();", refresh)
        self.assertIn("renderCurrentDataScreen(ACTIVE_SCREEN);", refresh)
        self.assertNotIn("var active=ACTIVE_SCREEN", refresh)
        self.assertIn("return{data:D,revision:SETTINGS_DATA_REVISION};", refresh)
        self.assertNotIn("go(", refresh)
        self.assertNotIn("ACTIVE_SCREEN=", refresh)
        self.assertIn("renderToday();", render)
        self.assertIn('screen==="food"', render)
        self.assertIn('screen==="train"', render)
        self.assertNotIn("go(", render)

    def test_settings_refresh_reverse_order_never_commits_old_data(self):
        refresh = function_source("reloadSettingsData")
        script = f"""
var NAME="",D={{value:0}},ACTIVE_SCREEN="food",loadedFood=true,loadedTrain=true;
var SETTINGS_DATA_REVISION=0,SETTINGS_DATA_REQUEST=0,SETTINGS_DATA_LATEST=null;
var pending=[];
function api(){{return new Promise(function(resolve){{pending.push(resolve);}});}}
function applyCanonicalToday(){{}}
function syncMarks(){{}}
function renderCurrentDataScreen(){{}}
{refresh}
(async function(){{
  var older=reloadSettingsData();
  var newer=reloadSettingsData();
  pending[1]({{onboarded:true,value:2}});
  await newer;
  pending[0]({{onboarded:true,value:1}});
  var values=await Promise.all([older,newer]);
  process.stdout.write(JSON.stringify({{value:D.value,revisions:values.map(function(x){{return x.revision;}})}}));
}})().catch(function(error){{console.error(error);process.exit(1);}});
"""
        completed = subprocess.run(
            ["node", "-e", script], check=True, capture_output=True, text=True
        )
        self.assertEqual(
            json.loads(completed.stdout),
            {"value": 2, "revisions": [1, 1]},
        )

    def test_settings_receipt_reconciles_after_refresh_failure_without_navigation(self):
        apply_receipt = function_source("applySettingsMutationReceipt")
        self.assertIn('action==="summary"', apply_receipt)
        self.assertIn("SETTINGS_DATA_REQUEST+=1", apply_receipt)
        self.assertIn("renderCurrentDataScreen(ACTIVE_SCREEN)", apply_receipt)
        self.assertNotIn("go(", apply_receipt)

        script = f"""
var D={{profile:{{}},send_time:"08:00",daily_summary_enabled:true}};
var ACTIVE_SCREEN="train",loadedFood=true,loadedTrain=true;
var SETTINGS_DATA_REVISION=4,SETTINGS_DATA_REQUEST=8,SETTINGS_DATA_LATEST={{id:8}};
var rendered="";
function applyCanonicalToday(){{}}
function syncMarks(){{}}
function renderCurrentDataScreen(screen){{rendered=screen;}}
{apply_receipt}
var result=applySettingsMutationReceipt("summary",{{
  ok:true,send_time:"09:30",daily_summary_enabled:false
}});
process.stdout.write(JSON.stringify({{
  sendTime:D.send_time,enabled:D.daily_summary_enabled,active:ACTIVE_SCREEN,
  rendered:rendered,request:SETTINGS_DATA_REQUEST,latest:SETTINGS_DATA_LATEST,
  revision:result.revision
}}));
"""
        completed = subprocess.run(
            ["node", "-e", script], check=True, capture_output=True, text=True
        )
        self.assertEqual(json.loads(completed.stdout), {
            "sendTime": "09:30",
            "enabled": False,
            "active": "train",
            "rendered": "train",
            "request": 9,
            "latest": None,
            "revision": 5,
        })

    def test_mode_receipt_fully_replaces_mode_state_when_refresh_fails(self):
        apply_receipt = function_source("applySettingsMutationReceipt")
        script = f"""
var D={{profile:{{}},mode:"cycle",cycle:true,last_period:"2026-07-01",cycle_len:28,
  periods:[{{start:"2026-07-01",end:"2026-07-05"}}],cycles:["2026-07-01"],
  past_periods:[{{start:"2026-07-01",end:"2026-07-05"}}],stats:{{history:[{{start:"2026-07-01"}}]}},
  preg:{{lmp:"stale"}},day:12,phase:"follicular",days_to_next:16,days_since:12,status:"normal",delay_days:0}};
var ACTIVE_SCREEN="food",loadedFood=true,loadedTrain=true;
var SETTINGS_DATA_REVISION=2,SETTINGS_DATA_REQUEST=3,SETTINGS_DATA_LATEST=null;
function applyCanonicalToday(){{}}
function syncMarks(){{}}
function renderCurrentDataScreen(){{}}
{apply_receipt}
function base(mode){{return{{mode:mode,cycle:false,last_period:null,cycle_len:null,
  periods:[],cycles:[],past_periods:[{{start:"2026-06-01",end:"2026-06-05"}}],stats:{{}},preg:null,
  day:null,phase:null,days_to_next:null,days_since:null,status:null,delay_days:null}};}}
function apply(snapshot){{return applySettingsMutationReceipt("mode",{{ok:true,mode:snapshot.mode,mode_snapshot:snapshot}});}}
var preg=base("preg");preg.preg={{lmp:"2026-06-01",week:9,day:0,trimester:1,due:"2027-03-08",days_left:218}};
var pregResult=apply(preg);
var pregState={{ok:!!pregResult.data,preg:D.preg&&D.preg.lmp,periods:D.periods.length,cycles:D.cycles.length,past:D.past_periods.length}};
var modes={{}};
["meno","none"].forEach(function(mode){{D.periods=[{{start:"stale"}}];D.cycles=["stale"];D.preg={{lmp:"stale"}};var result=apply(base(mode));modes[mode]={{ok:!!result.data,periods:D.periods.length,cycles:D.cycles.length,preg:D.preg}};}});
var irregular=base("irregular");irregular.periods=[{{start:"2026-05-01",end:"2026-05-05"}}];irregular.cycles=["2026-05-01"];irregular.stats={{history:[{{start:"2026-05-01",end:"2026-05-05"}}],avg_cycle:29}};
var irregularResult=apply(irregular);
var irregularState={{ok:!!irregularResult.data,cycles:D.cycles.slice(),history:D.stats.history.length,preg:D.preg}};
var before=D.mode;var incomplete=applySettingsMutationReceipt("mode",{{ok:true,mode:"preg",mode_snapshot:base("preg")}});
process.stdout.write(JSON.stringify({{preg:pregState,modes:modes,irregular:irregularState,incomplete:incomplete.error,modeAfterIncomplete:D.mode,before:before}}));
"""
        completed = subprocess.run(
            ["node", "-e", script], check=True, capture_output=True, text=True
        )
        self.assertEqual(json.loads(completed.stdout), {
            "preg": {
                "ok": True, "preg": "2026-06-01", "periods": 0,
                "cycles": 0, "past": 1,
            },
            "modes": {
                "meno": {"ok": True, "periods": 0, "cycles": 0, "preg": None},
                "none": {"ok": True, "periods": 0, "cycles": 0, "preg": None},
            },
            "irregular": {
                "ok": True, "cycles": ["2026-05-01"], "history": 1,
                "preg": None,
            },
            "incomplete": "incomplete_mode_receipt",
            "modeAfterIncomplete": "irregular",
            "before": "irregular",
        })

    def test_calendar_period_toggle_refreshes_data_without_switching_tabs(self):
        toggle = function_source("toggleCalendarPeriodDay")

        self.assertIn("await reloadSettingsData()", toggle)
        self.assertNotIn("reloadAfterEdit(", toggle)
        self.assertNotIn("go(", toggle)
        self.assertNotIn("ACTIVE_SCREEN=", toggle)
        self.assertIn("return{ok:true,date:iso,marked:", toggle)
        self.assertIn('error:"refresh_failed"', toggle)

        script = f"""
var today=new Date("2026-08-02T00:00:00Z"),ACTIVE_SCREEN="food";
var PERIOD_DAY={{}},EDIT_DAYS={{}},refreshCalls=0,renderCalls=0,panelCalls=0;
function isoOf(value){{return value.toISOString().slice(0,10);}}
function seedEditDaysFromActual(){{}}
function haptic(){{}}
function rangesFromEditDays(){{return[];}}
async function api(){{return{{ok:true}};}}
async function reloadSettingsData(){{
  refreshCalls+=1;PERIOD_DAY["2026-08-01"]=true;
  return{{data:{{canonical:true}},revision:9}};
}}
function renderToday(){{renderCalls+=1;}}
function toast(){{}}
var window={{AiwaDeslop:{{refreshPanel:function(){{panelCalls+=1;}}}}}};
{toggle}
(async function(){{
  var result=await toggleCalendarPeriodDay("2026-08-01");
  process.stdout.write(JSON.stringify({{
    active:ACTIVE_SCREEN,
    refreshCalls:refreshCalls,
    renderCalls:renderCalls,
    panelCalls:panelCalls,
    result:{{ok:result.ok,date:result.date,marked:result.marked,revision:result.revision}}
  }}));
}})().catch(function(error){{console.error(error);process.exit(1);}});
"""
        completed = subprocess.run(
            ["node", "-e", script], check=True, capture_output=True, text=True
        )
        self.assertEqual(
            json.loads(completed.stdout),
            {
                "active": "food",
                "refreshCalls": 1,
                "renderCalls": 0,
                "panelCalls": 1,
                "result": {
                    "ok": True,
                    "date": "2026-08-01",
                    "marked": True,
                    "revision": 9,
                },
            },
        )

    def test_fallback_summary_time_uses_atomic_settings_contract(self):
        save = function_source("saveHubTime")

        self.assertIn("daily_summary_enabled:!!(D&&D.daily_summary_enabled)", save)
        self.assertIn("D.daily_summary_enabled=!!r.daily_summary_enabled", save)

    def test_selected_day_is_canonical_and_strip_reaches_364_days(self):
        validator = function_source("canonicalSelectableDay")
        select = function_source("aiwaSelectDay")
        strip = function_source("aiwaDayStrip")
        home_start = function_source("homeStripStart")

        self.assertIn("addDays(today,-364)", validator)
        self.assertIn("parsed.toISOString().slice(0,10)!==iso", validator)
        self.assertIn("if(!canonical)return aiwaSelectedDay();", select)
        self.assertIn("return aiwaSelectedDay();", select)
        self.assertEqual(select.count("haptic('impact','light')"), 1)
        self.assertIn("floor=addDays(today,-364)", strip)
        self.assertIn("date<=today", strip)
        self.assertIn("state.disabled=false", strip)
        self.assertIn("floor=addDays(today,-364)", home_start)
        self.assertNotIn("floor=addDays(monday,-364)", home_start)

    def test_atomic_save_haptic_is_one_disabled_safe_gesture_opt_in(self):
        journal = (AIWA_SOURCE / "panels" / "JournalPanel.jsx").read_text(encoding="utf-8")
        day_log = (AIWA_SOURCE / "panels" / "CalendarDayLogPanel.jsx").read_text(encoding="utf-8")
        wheel = (AIWA_SOURCE / "components" / "DayWheel.jsx").read_text(encoding="utf-8")

        self.assertIn('.copylink,[data-haptic="light"]', INDEX)
        self.assertIn(
            "':disabled,[inert],[aria-disabled=\"true\"],[data-disabled=\"true\"],[data-haptic=\"off\"]'",
            INDEX,
        )
        self.assertIn("},true);\nfunction boot()", INDEX)
        self.assertEqual(journal.count('data-haptic="light"'), 1)
        self.assertEqual(day_log.count('data-haptic="light"'), 1)
        self.assertEqual(function_source("aiwaSaveJournal").count("haptic("), 0)
        self.assertIn("enableHaptic={false}", wheel)
        self.assertNotIn('data-haptic="light"', wheel)

    def test_photo_bridge_returns_receipt_or_throws_structured_error(self):
        upload = function_source("uploadFoodPhoto")
        digest = function_source("foodUploadDigest")
        pending = function_source("foodUploadPending")
        error = function_source("foodUploadError")
        fallback = function_source("onFoodFile")

        self.assertIn("if(!resp.ok||!r||r.ok!==true)", upload)
        self.assertIn("throw foodUploadError", upload)
        self.assertIn("return r;", upload)
        self.assertNotIn("toast(", upload)
        self.assertNotIn("haptic(", upload)
        self.assertIn("await foodUploadDigest(blob,file)", upload)
        self.assertIn("pending=foodUploadPending(digest)", upload)
        self.assertIn("fd.append('request_id',requestId)", upload)
        self.assertIn("fd.append('target',target)", upload)
        self.assertIn("for(var attempt=0;attempt<2;attempt++)", upload)
        self.assertIn("window.crypto.subtle.digest('SHA-256',bytes)", digest)
        self.assertIn("sessionStorage.getItem(key)", pending)
        self.assertIn("sessionStorage.setItem(key,JSON.stringify(pending))", pending)
        self.assertIn("pending.target!==todayIso&&pending.target!==yesterdayIso", pending)
        self.assertIn("target:todayIso", pending)
        self.assertIn("failure.code==='food_target_expired'", upload)
        self.assertEqual(upload.count("sessionStorage.removeItem(pending.key)"), 2)
        self.assertLess(
            upload.index("sessionStorage.removeItem(pending.key)"),
            upload.index("return r;"),
        )
        self.assertIn("_applyDiary(r);", fallback)
        for field in ("error.code=", "error.status=", "error.payload="):
            self.assertIn(field, error)

    def test_expired_photo_request_retires_pending_but_committed_replay_keeps_identity(self):
        upload = function_source("uploadFoodPhoto")
        digest = function_source("foodUploadDigest")
        pending = function_source("foodUploadPending")
        error = function_source("foodUploadError")
        script = f"""
var day="2026-08-02",store={{}},responses=[],submissions=[],uuid=0,INIT="signed";
function moscowDateIso(){{return day;}}
var sessionStorage={{
  getItem:function(key){{return Object.prototype.hasOwnProperty.call(store,key)?store[key]:null;}},
  setItem:function(key,value){{store[key]=value;}},
  removeItem:function(key){{delete store[key];}}
}};
var window={{crypto:{{randomUUID:function(){{uuid+=1;return"uuid-"+uuid;}}}}}};
function compressImage(file){{return Promise.resolve(file);}}
function showFoodLoading(){{}}
function hideFoodLoading(){{}}
function FormData(){{this.values={{}};}}
FormData.prototype.append=function(key,value){{this.values[key]=value;}};
async function fetch(_url,options){{
  submissions.push(Object.assign({{}},options.body.values));
  var response=responses.shift();
  return{{ok:response.ok,status:response.status,json:async function(){{return response.body;}}}};
}}
{error}
{digest}
{pending}
{upload}
var file={{name:"meal.jpg",size:4,lastModified:7,arrayBuffer:async function(){{return new ArrayBuffer(4);}}}};
var key="aiwa:food-upload:meal.jpg:4:7";
(async function(){{
  store[key]=JSON.stringify({{request_id:"yesterday-uncommitted",target:"2026-08-01"}});
  responses.push({{ok:false,status:409,body:{{ok:false,error:"food_target_expired",message:"expired"}}}});
  var expired="";try{{await uploadFoodPhoto(file);}}catch(failure){{expired=failure.code;}}
  var retired=!Object.prototype.hasOwnProperty.call(store,key);

  responses.push({{ok:true,status:200,body:{{ok:true,meal_id:12,date:"2026-08-02"}}}});
  await uploadFoodPhoto(file);
  var fresh=submissions[1];

  store[key]=JSON.stringify({{request_id:"yesterday-committed",target:"2026-08-01"}});
  responses.push({{ok:true,status:200,body:{{ok:true,duplicate:true,meal_id:9,date:"2026-08-01"}}}});
  var replay=await uploadFoodPhoto(file),committed=submissions[2];
  process.stdout.write(JSON.stringify({{
    expired:expired,retired:retired,freshRequest:fresh.request_id,
    freshTarget:fresh.target,replayRequest:committed.request_id,
    replayTarget:committed.target,duplicate:replay.duplicate
  }}));
}})().catch(function(failure){{console.error(failure);process.exit(1);}});
"""
        completed = subprocess.run(
            ["node", "-e", script], check=True, capture_output=True, text=True
        )
        self.assertEqual(json.loads(completed.stdout), {
            "expired": "food_target_expired",
            "retired": True,
            "freshRequest": "uuid-1",
            "freshTarget": "2026-08-02",
            "replayRequest": "yesterday-committed",
            "replayTarget": "2026-08-01",
            "duplicate": True,
        })


if __name__ == "__main__":
    unittest.main()
