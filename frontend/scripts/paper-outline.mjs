import { readFileSync } from "node:fs";
const name = process.argv[2] || "home";
const maxDepth = Number(process.argv[3] || 99);
const root = JSON.parse(readFileSync(`/Users/sergejegorov/aiwa/aiwa-redesign/.artifacts/paper-capture/${name}.json`, "utf8"));

const short = (c) => (c || "").split(/\s+/).filter(Boolean).slice(0, 2).join(".");
function line(n, d) {
  const s = n.style;
  const bits = [];
  const bg = s.backgroundColor;
  if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") bits.push(`bg:${bg}`);
  if (n.text) bits.push(`col:${s.color} ${s.fontSize}/${s.lineHeight} w${s.fontWeight}`);
  if (s.display === "flex") bits.push(`flex-${s.flexDirection[0]} gap:${s.gap} jc:${s.justifyContent} ai:${s.alignItems}`);
  const pad = [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft].map((v) => parseInt(v) || 0);
  if (pad.some((v) => v)) bits.push(`pad:${pad.join(",")}`);
  if (s.borderRadius && s.borderRadius !== "0px") bits.push(`r:${s.borderRadius}`);
  if (s.border && !/0px|none/.test(s.border)) bits.push(`bd:${s.border}`);
  if (s.boxShadow && s.boxShadow !== "none") bits.push(`sh`);
  const cls = short(n.cls);
  const r = n.rect;
  const txt = n.text ? ` "${n.text.slice(0, 60)}"` : "";
  return `${"  ".repeat(d)}${n.tag}${cls ? "." + cls : ""} [${r.x},${r.y} ${r.w}x${r.h}]${txt} ${bits.join(" ")}`;
}
function walk(n, d) {
  if (d > maxDepth) return;
  // skip pure svg internals
  if (n.tag === "path" || n.tag === "svg" && d > 3) return;
  console.log(line(n, d));
  for (const c of n.children) walk(c, d + 1);
}
walk(root, 0);
