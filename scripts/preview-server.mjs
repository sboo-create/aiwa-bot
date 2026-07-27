import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const port = Number(process.env.PORT || 8080);
const today = new Date();
const iso = (date) => date.toISOString().slice(0, 10);

const json = (response, payload) => {
  response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
};

const mock = {
  "/api/data": {
    onboarded: true,
    cycle: true,
    mode: "cycle",
    name: "Анна",
    last_period: iso(new Date(today.getTime() - 16 * 86400000)),
    cycle_len: 29,
    today_log: { symptoms: ["bloat"], energy: 2, mood: 3 },
    pa: [],
    chatlog: [{ role: "assistant", text: "Привет! Что обсудим?" }],
    profile: { height: 168, weight: 62, age: 29, kcal_goal: 1800 },
    send_time: "08:00",
    proactive_enabled: true,
    stats: { avg_cycle: 29, avg_period: 5, history: [] },
  },
  "/api/section": {
    text: "Сегодня держим ровную энергию: белок, овощи и спокойный ритм.",
    kcal: 1800,
    menu: {
      meals: [
        { dish: "Омлет с овощами", note: "Белок и сытость", kcal: "370 ккал", time: "08:00" },
        { dish: "Курица с рисом", note: "Белок и сложные углеводы", kcal: "520 ккал", time: "13:00" },
        { dish: "Греческий йогурт с ягодами", note: "Перекус", kcal: "180 ккал", time: "16:00" },
        { dish: "Рыба с картофелем", note: "Омега-3 и магний", kcal: "480 ккал", time: "20:00" },
      ],
    },
    training: {
      summary: "Подойдёт спокойная силовая или прогулка.",
      why: "Ориентируйся на энергию и самочувствие.",
      options: [
        { name: "Ходьба", benefit: "мягко поддерживает энергию", how: "30 минут в ровном темпе" },
        { name: "Лёгкая силовая", benefit: "поддерживает тонус", how: "30–40 минут без отказа" },
      ],
    },
  },
  "/api/diary": {
    meals: [{ id: 1, title: "Омлет с овощами", kcal: 370, protein: 25, fat: 21, carbs: 18, slot: "breakfast" }],
    totals: { kcal: 370, protein: 25, fat: 21, carbs: 18 },
    target: { kcal: 1800, protein: 95, fat: 60, carbs: 210 },
  },
  "/api/workout": {
    ok: true,
    calories: 210,
    review: "Хорошая связка на низ тела: присед и мост нагружают ягодицы и бёдра. Завтра дай ногам отдых — верх тела или прогулка.",
  },
  "/api/log_history": {
    items: [
      { d: "2026-07-27", energy: 2, mood: 3, symptoms: ["bloat"] },
      { d: "2026-07-26", energy: 3, mood: 3, symptoms: [] },
      { d: "2026-07-25", energy: 1, mood: 2, symptoms: ["cramps", "headache"] },
      { d: "2026-07-23", energy: 2, mood: 2, symptoms: ["fatigue"] },
      { d: "2026-07-21", energy: 3, mood: 3, symptoms: [] },
    ],
  },
  "/api/recipe": {
    dish: "Омлет с овощами",
    ingredients: ["Яйца — 3 шт", "Помидор — 1 шт", "Шпинат — горсть", "Молоко — 50 мл", "Масло — 1 ч. л."],
    steps: ["Взбей яйца с молоком и щепоткой соли.", "Обжарь овощи 2 минуты.", "Залей яйцами и готовь под крышкой 5 минут."],
    kcal: "370 ккал на порцию",
    time: "15 минут",
  },
  "/api/train": {
    ok: true,
    week: [],
    today: [],
    profile: {},
    last_review: "",
  },
  "/api/today": {
    summary: "Сегодня лучше двигаться в комфортном темпе и не пропускать еду.",
    suggestions: ["Что съесть сегодня?", "Какая нагрузка подойдёт?"],
  },
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (request.method === "POST" && url.pathname.startsWith("/api/")) {
    if (url.pathname === "/api/chat" || url.pathname === "/api/voice") {
      json(response, {
        answer: "Смотри на самочувствие: мягкая нагрузка и регулярная еда сегодня подойдут лучше всего.",
        answer_id: "preview-answer",
        suggestions: ["Что съесть?", "Как восстановиться?"],
      });
      return;
    }
    if (url.pathname === "/api/proactive") {
      let body = "";
      for await (const chunk of request) body += chunk;
      const parsed = body ? JSON.parse(body) : {};
      json(response, { ok: true, proactive_enabled: Boolean(parsed.enabled) });
      return;
    }
    json(response, mock[url.pathname] || { ok: true });
    return;
  }

  const relative = url.pathname === "/" ? "webapp/index.html" : url.pathname.slice(1);
  const file = resolve(root, relative);
  if (!file.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  try {
    if (!(await stat(file)).isFile()) throw new Error("Not a file");
    const type = {
      ".css": "text/css",
      ".html": "text/html",
      ".js": "text/javascript",
      ".jpg": "image/jpeg",
      ".png": "image/png",
      ".svg": "image/svg+xml",
    }[extname(file)] || "application/octet-stream";
    response.writeHead(200, { "content-type": `${type}; charset=utf-8` });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404).end("Not found");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`AIWA preview: http://127.0.0.1:${port}`);
});
