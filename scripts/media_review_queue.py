#!/usr/bin/env python3
"""Create and apply a complete visual-review queue for generated media."""

from __future__ import annotations

import argparse
import hashlib
import html
import json
from pathlib import Path


SUPPORTED_SCHEMAS = {
    "aiwa-food-backfill-assets-v1",
    "aiwa-sport-backfill-assets-v1",
}


def _load(path: Path) -> tuple[dict, str]:
    raw = path.read_bytes()
    payload = json.loads(raw)
    if payload.get("schema") not in SUPPORTED_SCHEMAS:
        raise ValueError("media_review_manifest_schema")
    if payload.get("review_status") != "complete":
        raise ValueError("media_review_automatic_review_required")
    return payload, hashlib.sha256(raw).hexdigest()


def build_queue(manifest_path: Path, output_path: Path) -> int:
    payload, source_hash = _load(manifest_path)
    rows = [
        row for row in payload.get("assets") or []
        if isinstance(row, dict)
        and row.get("review_status") == "approved"
        and row.get("filename")
    ]
    cards = []
    for index, row in enumerate(rows):
        canonical_id = html.escape(str(row.get("canonical_id") or ""))
        content_hash = html.escape(str(row.get("content_hash") or ""))
        filename = html.escape(str(row["filename"]))
        label = html.escape(str(row.get("label") or "Без названия"))
        origin = html.escape(str(row.get("origin") or "batch"))
        score = float(row.get("review_score") or row.get(
            "validation_score"
        ) or 0)
        cards.append(
            f"""
            <article class="card" data-index="{index}" data-state="pending"
              data-id="{canonical_id}" data-hash="{content_hash}">
              <img src="{filename}" alt="{label}" loading="lazy">
              <div class="body">
                <div class="meta"><span>#{index + 1}</span>
                  <span>auto {score:.2f}</span></div>
                <h2>{label}</h2>
                <p>{origin}</p>
                <label>Заметка<input class="note" maxlength="240"
                  placeholder="Что исправить"></label>
                <div class="actions">
                  <button class="approve" type="button">✓ Верно</button>
                  <button class="reject" type="button">× Переделать</button>
                </div>
              </div>
            </article>
            """
        )
    title = (
        "AIWA · Проверка изображений еды"
        if payload["schema"].startswith("aiwa-food")
        else "AIWA · Проверка изображений спорта"
    )
    document = f"""<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<style>
:root{{--ink:#17212b;--muted:#66717d;--paper:#fff;--bg:#f4f1ed;
--orange:#ff7a3d;--green:#23855b;--red:#bd3d43;--line:#ded9d2}}
*{{box-sizing:border-box}}body{{margin:0;font:15px/1.45 Inter,system-ui,sans-serif;
background:var(--bg);color:var(--ink)}}header{{position:sticky;top:0;z-index:5;
background:rgba(244,241,237,.96);backdrop-filter:blur(12px);
border-bottom:1px solid var(--line);padding:18px 24px}}h1{{font-size:24px;margin:0 0 6px}}
.sub{{color:var(--muted);display:flex;gap:16px;flex-wrap:wrap}}
.toolbar{{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}}
button{{border:1px solid var(--line);background:var(--paper);border-radius:12px;
padding:10px 13px;font-weight:700;cursor:pointer}}button.primary{{background:var(--orange);
border-color:var(--orange);color:#fff}}main{{padding:20px;display:grid;
grid-template-columns:repeat(auto-fill,minmax(245px,1fr));gap:16px}}
.card{{background:var(--paper);border:2px solid transparent;border-radius:20px;
overflow:hidden;box-shadow:0 8px 22px rgba(40,34,28,.06)}}.card[data-state=approved]{{
border-color:var(--green)}}.card[data-state=rejected]{{border-color:var(--red)}}
.card[hidden]{{display:none}}img{{display:block;width:100%;aspect-ratio:1;
object-fit:cover;background:#fffaf6}}.body{{padding:14px}}h2{{font-size:17px;
margin:7px 0 2px}}p,.meta{{color:var(--muted);margin:0}}.meta{{display:flex;
justify-content:space-between;font-size:12px}}label{{display:block;color:var(--muted);
font-size:12px;margin-top:12px}}input{{display:block;width:100%;margin-top:5px;
padding:9px;border:1px solid var(--line);border-radius:9px}}.actions{{display:grid;
grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}}.approve{{color:var(--green)}}
.reject{{color:var(--red)}}@media(max-width:540px){{header{{padding:14px}}
main{{padding:12px;grid-template-columns:1fr 1fr;gap:9px}}.body{{padding:9px}}
h2{{font-size:14px}}.actions{{grid-template-columns:1fr}}}}
</style>
</head>
<body>
<header>
  <h1>{title}</h1>
  <div class="sub"><span>Всего: <b id="total">{len(rows)}</b></span>
    <span>Проверено: <b id="done">0</b></span>
    <span>Верно: <b id="approved">0</b></span>
    <span>Переделать: <b id="rejected">0</b></span></div>
  <div class="toolbar">
    <button data-filter="all">Все</button>
    <button data-filter="pending">Ожидают</button>
    <button data-filter="approved">Верные</button>
    <button data-filter="rejected">Переделать</button>
    <button class="primary" id="export">Скачать решения JSON</button>
  </div>
</header>
<main>{''.join(cards)}</main>
<script>
const sourceManifestSha256={json.dumps(source_hash)};
const schema="aiwa-media-visual-decisions-v1";
const storageKey="aiwa-media-review:"+sourceManifestSha256;
const cards=[...document.querySelectorAll(".card")];
let saved={{}};try{{saved=JSON.parse(localStorage.getItem(storageKey)||"{{}}")}}catch{{}}
function state(card,value,note){{card.dataset.state=value;
 card.querySelector(".note").value=note||"";
 saved[card.dataset.id]={{canonical_id:card.dataset.id,
  content_hash:card.dataset.hash,decision:value,note:note||""}};
 localStorage.setItem(storageKey,JSON.stringify(saved));stats()}}
function stats(){{const values=cards.map(c=>c.dataset.state);
 const a=values.filter(v=>v==="approved").length;
 const r=values.filter(v=>v==="rejected").length;
 document.querySelector("#done").textContent=a+r;
 document.querySelector("#approved").textContent=a;
 document.querySelector("#rejected").textContent=r}}
cards.forEach(card=>{{const old=saved[card.dataset.id];
 if(old)state(card,old.decision,old.note);
 card.querySelector(".approve").onclick=()=>state(card,"approved",card.querySelector(".note").value);
 card.querySelector(".reject").onclick=()=>state(card,"rejected",card.querySelector(".note").value);
 card.querySelector(".note").onchange=()=>{{
   if(saved[card.dataset.id])state(card,card.dataset.state,card.querySelector(".note").value)
 }}
}});
document.querySelectorAll("[data-filter]").forEach(btn=>btn.onclick=()=>{{
 const value=btn.dataset.filter;cards.forEach(card=>card.hidden=value!=="all"&&card.dataset.state!==value)
}});
document.querySelector("#export").onclick=()=>{{
 const payload={{schema,source_manifest_sha256:sourceManifestSha256,
  decisions:cards.filter(c=>saved[c.dataset.id]).map(c=>saved[c.dataset.id])}};
 const blob=new Blob([JSON.stringify(payload,null,2)],{{type:"application/json"}});
 const link=document.createElement("a");link.href=URL.createObjectURL(blob);
 link.download="visual-decisions.json";link.click();URL.revokeObjectURL(link.href)
}};stats();
</script>
</body></html>"""
    output_path.write_text(document, encoding="utf-8")
    return len(rows)


def apply_decisions(
    manifest_path: Path, decisions_path: Path, output_path: Path,
) -> tuple[int, int]:
    payload, source_hash = _load(manifest_path)
    decisions = json.loads(decisions_path.read_text(encoding="utf-8"))
    if decisions.get("schema") != "aiwa-media-visual-decisions-v1":
        raise ValueError("media_review_decisions_schema")
    if decisions.get("source_manifest_sha256") != source_hash:
        raise ValueError("media_review_decisions_source")
    decision_map = {
        str(row.get("canonical_id")): row
        for row in decisions.get("decisions") or []
        if isinstance(row, dict)
    }
    approved = rejected = required = 0
    for row in payload.get("assets") or []:
        if not isinstance(row, dict) or row.get("review_status") != "approved":
            continue
        required += 1
        decision = decision_map.get(str(row.get("canonical_id")))
        if (
            not decision
            or decision.get("content_hash") != row.get("content_hash")
            or decision.get("decision") not in {"approved", "rejected"}
        ):
            raise ValueError(
                "media_review_incomplete:"
                + str(row.get("canonical_id") or "unknown")
            )
        row["visual_review_status"] = decision["decision"]
        row["visual_review_note"] = str(decision.get("note") or "")[:240]
        if decision["decision"] == "approved":
            approved += 1
        else:
            rejected += 1
    payload["visual_review_status"] = "complete"
    payload["visual_review_required"] = required
    payload["visual_review_approved"] = approved
    payload["visual_review_rejected"] = rejected
    output_path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    return approved, rejected


def main() -> int:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--build", action="store_true")
    mode.add_argument("--apply", action="store_true")
    parser.add_argument("--manifest", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--decisions", type=Path)
    args = parser.parse_args()
    if args.build:
        count = build_queue(args.manifest, args.output)
        print(json.dumps({"queue": str(args.output), "count": count}))
        return 0
    if not args.decisions:
        raise SystemExit("--apply requires --decisions")
    approved, rejected = apply_decisions(
        args.manifest, args.decisions, args.output
    )
    print(json.dumps(
        {"approved": approved, "rejected": rejected},
        ensure_ascii=False,
    ))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
