import assert from "node:assert/strict";

import {
  isCompleteModeSettingsData,
  syncProfileSettingsSnapshot,
} from "../src/aiwa/lib/profileSettings.js";

const base = (mode) => ({
  mode,
  cycle: false,
  last_period: null,
  cycle_len: null,
  periods: [],
  cycles: [],
  past_periods: [{ start: "2026-06-01", end: "2026-06-05" }],
  stats: {},
  preg: null,
  day: null,
  phase: null,
  days_to_next: null,
  days_since: null,
  status: null,
  delay_days: null,
});

const fixtures = {
  preg: {
    ...base("preg"),
    preg: {
      lmp: "2026-06-01",
      week: 9,
      day: 0,
      trimester: 1,
      due: "2027-03-08",
      days_left: 218,
    },
  },
  meno: base("meno"),
  none: base("none"),
  irregular: {
    ...base("irregular"),
    periods: [{ start: "2026-06-01", end: "2026-06-05" }],
    cycles: ["2026-06-01"],
    stats: {
      history: [{ start: "2026-06-01", end: "2026-06-05" }],
      avg_cycle: 29,
    },
  },
};

let checks = 0;
for (const [mode, data] of Object.entries(fixtures)) {
  assert.equal(isCompleteModeSettingsData(data), true, `${mode} is complete`);
  const calls = [];
  const snapshot = await syncProfileSettingsSnapshot(async (name) => {
    calls.push(name);
    if (name === "reloadSettingsData") return { ok: false, error: "network" };
    return { data, revision: checks + 1 };
  }, "mode", { ok: true, mode, mode_snapshot: data });
  assert.deepEqual(snapshot, { data, revision: checks + 1 });
  assert.deepEqual(calls, ["reloadSettingsData", "applySettingsMutationReceipt"]);
  checks += 1;
}

const incompletePreg = { ...base("preg"), preg: null };
assert.equal(isCompleteModeSettingsData(incompletePreg), false);
assert.equal(await syncProfileSettingsSnapshot(async (name) => (
  name === "reloadSettingsData"
    ? null
    : { data: incompletePreg, revision: 9 }
), "mode", { ok: true, mode: "preg" }), null);
checks += 1;

console.log(`Phase 3 mode receipt contracts: ${checks}/${checks} passed.`);
