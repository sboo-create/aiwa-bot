import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  completeFoodDeleteRequest,
  completeManualFoodRequest,
  foodDeleteRequestForMeal,
  manualFoodRequestForPayload,
  resetFoodMutationRequestsForTests,
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
completeManualFoodRequest(firstManual.id);
const nextManual = manualFoodRequestForPayload(payload, "2026-08-03", () => "manual-2");
assert.equal(nextManual.id, "manual-2");
assert.equal(nextManual.date, "2026-08-03");

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
