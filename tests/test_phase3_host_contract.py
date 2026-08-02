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
        self.assertEqual(upload.count("sessionStorage.removeItem(pending.key)"), 1)
        self.assertLess(
            upload.index("sessionStorage.removeItem(pending.key)"),
            upload.index("return r;"),
        )
        self.assertIn("_applyDiary(r);", fallback)
        for field in ("error.code=", "error.status=", "error.payload="):
            self.assertIn(field, error)


if __name__ == "__main__":
    unittest.main()
