import puppeteer from "puppeteer-core";
import { mkdirSync, writeFileSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const URL = "http://127.0.0.1:8080";
const OUT = "/Users/sergejegorov/aiwa/aiwa-redesign/.artifacts/paper-capture";
mkdirSync(OUT, { recursive: true });

const WIDTH = 390;

// Serialize the visible DOM with key computed styles, relative to app root.
const DUMP_FN = `(() => {
  const root = document.querySelector('.aiwa-deslop-home, .aiwa-deslop-food, .aiwa-deslop-activity, #app, body');
  const PROPS = ['display','flexDirection','justifyContent','alignItems','gap','padding','paddingTop','paddingRight','paddingBottom','paddingLeft','width','height','backgroundColor','color','borderRadius','border','borderTop','borderBottom','boxShadow','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','textAlign','opacity','position'];
  function txt(el){
    let t='';
    for(const n of el.childNodes){ if(n.nodeType===3) t+=n.textContent; }
    return t.trim();
  }
  function walk(el, depth){
    const r = el.getBoundingClientRect();
    if (r.width===0 && r.height===0) return null;
    const cs = getComputedStyle(el);
    const style = {};
    for(const p of PROPS){ style[p]=cs[p]; }
    const node = {
      tag: el.tagName.toLowerCase(),
      cls: el.getAttribute('class')||'',
      aria: el.getAttribute('aria-label')||'',
      rect: {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)},
      text: txt(el),
      style,
      children: []
    };
    if (depth < 22){
      for(const c of el.children){
        const cn = walk(c, depth+1);
        if(cn) node.children.push(cn);
      }
    }
    return node;
  }
  return JSON.stringify(walk(root, 0));
})()`;

async function capture(page, name) {
  await new Promise((r) => setTimeout(r, 900));
  const full = await page.evaluate("document.body.scrollHeight");
  await page.setViewport({ width: WIDTH, height: Math.max(844, full), deviceScaleFactor: 2 });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  const dump = await page.evaluate(DUMP_FN);
  writeFileSync(`${OUT}/${name}.json`, dump);
  console.log(name, "captured, bytes:", dump.length);
}

async function clickTab(page, label) {
  const ok = await page.evaluate((lbl) => {
    const els = [...document.querySelectorAll('.aiwa-nav-tabbar-layer *')];
    const t = els.find((e) => e.textContent.trim() === lbl && e.children.length <= 2);
    const btn = t ? t.closest('[class*="_tab_"], button, [role="button"]') || t : null;
    if (btn) { btn.click(); return true; }
    return false;
  }, label);
  await new Promise((r) => setTimeout(r, 1200));
  return ok;
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--force-device-scale-factor=2"],
  defaultViewport: { width: WIDTH, height: 844, deviceScaleFactor: 2 },
});
const page = await browser.newPage();
await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });
await new Promise((r) => setTimeout(r, 1500));

await capture(page, "home");
console.log("tab food:", await clickTab(page, "Питание"));
await capture(page, "food");
console.log("tab train:", await clickTab(page, "Нагрузка"));
await capture(page, "activity");

await browser.close();
console.log("DONE");
