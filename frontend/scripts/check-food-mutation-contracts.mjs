import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  completeFoodDeleteRequest,
  completeManualFoodRequest,
  foodDeleteRequestForMeal,
  manualFoodRequestForPayload,
  manualFoodResponseExpiresTarget,
  manualFoodTargetIsReplayable,
  resetFoodMutationRequestsForTests,
  retireManualFoodRequest,
} from "../src/aiwa/lib/foodMutation.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = (path) => readFileSync(resolve(root, path), "utf8");

resetFoodMutationRequestsForTests();
const payload = { title: "Каша", kcal: "250", slot: "breakfast" };
const firstManual = manualFoodRequestForPayload(payload, "2026-08-02", () => "manual-1");
const reopenedManual = manualFoodRequestForPayload(
  { ...payload }, "2026-08-03", () => "must-not-run",
);
assert.deepEqual(reopenedManual, firstManual);
assert.equal(reopenedManual.date, "2026-08-02");
assert.equal(manualFoodTargetIsReplayable("2026-08-02", "2026-08-03"), true);
assert.equal(manualFoodTargetIsReplayable("2026-08-02", "2026-08-04"), false);
assert.equal(manualFoodTargetIsReplayable("2026-02-30", "2026-03-01"), false);
const expiredManual = manualFoodRequestForPayload(payload, "2026-08-04", () => "manual-2");
assert.equal(expiredManual.id, "manual-2");
assert.equal(expiredManual.date, "2026-08-04");

// A late response for the retired request cannot clear the replacement.
completeManualFoodRequest(firstManual.id);
assert.equal(
  manualFoodRequestForPayload(payload, "2026-08-04", () => "must-not-run").id,
  "manual-2",
);

// An explicit server expiry retires the matching token so the next gesture can
// target the current Moscow day, while ordinary failures retain it for replay.
assert.equal(manualFoodResponseExpiresTarget({ error: "date_out_of_range" }), true);
assert.equal(manualFoodResponseExpiresTarget({ error: "food_target_expired" }), true);
assert.equal(manualFoodResponseExpiresTarget({ error: "food_manual_save_failed" }), false);
retireManualFoodRequest("wrong-token");
assert.equal(
  manualFoodRequestForPayload(payload, "2026-08-04", () => "must-not-run").id,
  "manual-2",
);
retireManualFoodRequest(expiredManual.id);
const nextManual = manualFoodRequestForPayload(payload, "2026-08-04", () => "manual-3");
assert.equal(nextManual.id, "manual-3");
assert.equal(nextManual.date, "2026-08-04");
completeManualFoodRequest(nextManual.id);
const tomorrowManual = manualFoodRequestForPayload(payload, "2026-08-05", () => "manual-4");
assert.equal(tomorrowManual.id, "manual-4");
assert.equal(tomorrowManual.date, "2026-08-05");

const firstDelete = foodDeleteRequestForMeal(77, () => "delete-1");
assert.equal(foodDeleteRequestForMeal(77, () => "must-not-run"), firstDelete);
completeFoodDeleteRequest(77, "wrong-token");
assert.equal(foodDeleteRequestForMeal(77, () => "must-not-run"), firstDelete);
completeFoodDeleteRequest(77, firstDelete);
assert.equal(foodDeleteRequestForMeal(77, () => "delete-2"), "delete-2");

const form = source("src/aiwa/components/FoodEntryForm.jsx");
assert.ok(form.includes("manualFoodRequestForPayload(form)"));
assert.ok(form.includes("request_id: manualRequest.id"));
assert.ok(form.includes("date: manualRequest.date"));
assert.ok(form.includes("manualFoodResponseExpiresTarget(result)"));
assert.ok(form.includes("retireManualFoodRequest(manualRequest.id)"));
assert.ok(form.indexOf("completeManualFoodRequest(manualRequest.id)") > form.indexOf("if (result?.ok === false"));

const screen = source("src/aiwa/screens/FoodScreen.jsx");
assert.ok(screen.includes("foodDeleteRequestForMeal(id)"));
assert.ok(screen.includes("{ id, request_id: requestId }"));
assert.ok(screen.indexOf("completeFoodDeleteRequest(id, requestId)") > screen.indexOf("if (!result || result.error"));

const host = source("../webapp2/index.html");
assert.ok(host.includes("function manualFoodPending(body)"));
assert.ok(host.includes("body.request_id=pending.request_id;body.date=pending.date"));
assert.ok(host.includes("function foodDeletePending(id)"));
assert.ok(host.includes("{id:id,request_id:pending.request_id}"));
assert.ok(host.includes("sessionStorage.removeItem(pending.key)"));

console.log("Food mutation durability contracts: pass");
