#!/usr/bin/env python3
"""Временные локальные 3d-стилизованные иконки еды (Pillow), пока нет ключа gpt-image-2.

Рисует простые глянцевые иконки блюд на белом фоне и пишет assets/food/manifest.json.
Позже scripts/gen_food_icons.py перезапишет и файлы, и манифест настоящими картинками.
"""
import json
import math
import os
import re

from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT_DIR = os.path.join(ROOT, "assets", "food")
S = 3          # супер-сэмплинг
SZ = 320       # итоговый размер px
BG = (255, 255, 255)

DISHES = [
    "Омлет с овощами и сыром",
    "Курица с рисом и салатом",
    "Греческий йогурт с ягодами",
    "Рыба с картофелем",
]

_TR = {"а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"e","ж":"zh","з":"z","и":"i",
       "й":"y","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t",
       "у":"u","ф":"f","х":"h","ц":"ts","ч":"ch","ш":"sh","щ":"sch","ъ":"","ы":"y","ь":"",
       "э":"e","ю":"yu","я":"ya"," ":"-"}


def slug(name):
    s = "".join(_TR.get(ch, "") for ch in name.lower())
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9-]+", "", s)).strip("-") or "dish"


def _shade(c, k):
    return tuple(max(0, min(255, int(v * k))) for v in c)


def _blob(d, box, color, hi=(255, 255, 255)):
    """Эллипс с мягким верхним бликом — псевдо-3d."""
    x0, y0, x1, y1 = box
    d.ellipse(box, fill=color)
    d.ellipse([x0 + (x1 - x0) * 0.05, y0 + (y1 - y0) * 0.05, x1 - (x1 - x0) * 0.5, y0 + (y1 - y0) * 0.42],
              fill=_shade(color, 1.18))
    d.ellipse([x0 + (x1 - x0) * 0.18, y0 + (y1 - y0) * 0.1, x0 + (x1 - x0) * 0.4, y0 + (y1 - y0) * 0.3], fill=hi)


def _plate(d, cx, cy, r):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(238, 233, 228))
    d.ellipse([cx - r * 0.82, cy - r * 0.82, cx + r * 0.82, cy + r * 0.82], fill=(250, 248, 246))


def draw_omlet(d, W):
    cx, cy = W * 0.5, W * 0.55
    _plate(d, cx, cy, W * 0.34)
    _blob(d, [W * 0.24, W * 0.34, W * 0.76, W * 0.66], (247, 201, 72))       # яйцо
    for (px, py, col) in [(0.4, 0.5, (196, 92, 84)), (0.58, 0.44, (120, 160, 96)),
                          (0.5, 0.6, (196, 92, 84)), (0.62, 0.58, (120, 160, 96))]:
        d.ellipse([W * px, W * py, W * px + W * 0.06, W * py + W * 0.06], fill=col)


def draw_chicken(d, W):
    cx, cy = W * 0.5, W * 0.56
    _plate(d, cx, cy, W * 0.34)
    _blob(d, [W * 0.26, W * 0.28, W * 0.58, W * 0.62], (255, 255, 255))       # рис
    _blob(d, [W * 0.48, W * 0.36, W * 0.74, W * 0.62], (198, 132, 74))        # курица
    d.ellipse([W * 0.3, W * 0.58, W * 0.5, W * 0.72], fill=(110, 156, 88))    # салат


def draw_yogurt(d, W):
    # чашка
    d.rounded_rectangle([W * 0.3, W * 0.34, W * 0.7, W * 0.74], radius=W * 0.06, fill=(245, 243, 240))
    d.ellipse([W * 0.3, W * 0.28, W * 0.7, W * 0.4], fill=(255, 255, 255))
    d.ellipse([W * 0.33, W * 0.29, W * 0.67, W * 0.39], fill=(250, 249, 248))
    for (px, py) in [(0.42, 0.3), (0.52, 0.29), (0.6, 0.31), (0.47, 0.32)]:
        _blob(d, [W * px, W * py, W * px + W * 0.08, W * py + W * 0.08], (150, 60, 110))


def draw_fish(d, W):
    cx, cy = W * 0.5, W * 0.55
    _plate(d, cx, cy, W * 0.34)
    _blob(d, [W * 0.26, W * 0.4, W * 0.64, W * 0.62], (120, 150, 186))        # рыба
    d.polygon([(W * 0.62, W * 0.51), (W * 0.74, W * 0.42), (W * 0.74, W * 0.6)], fill=(120, 150, 186))
    for (px, py) in [(0.34, 0.62), (0.5, 0.64)]:
        _blob(d, [W * px, W * py, W * px + W * 0.12, W * py + W * 0.1], (232, 214, 150))  # картофель


DRAW = {
    "Омлет с овощами и сыром": draw_omlet,
    "Курица с рисом и салатом": draw_chicken,
    "Греческий йогурт с ягодами": draw_yogurt,
    "Рыба с картофелем": draw_fish,
}


def render(name):
    W = SZ * S
    img = Image.new("RGB", (W, W), BG)
    # мягкая тень-подложка
    sh = Image.new("L", (W, W), 0)
    ds = ImageDraw.Draw(sh)
    ds.ellipse([W * 0.2, W * 0.66, W * 0.8, W * 0.82], fill=90)
    sh = sh.filter(ImageFilter.GaussianBlur(W * 0.03))
    img.paste((214, 208, 202), (0, 0), sh)
    d = ImageDraw.Draw(img)
    DRAW[name](d, W)
    img = img.resize((SZ, SZ), Image.LANCZOS)
    return img


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    manifest = {}
    for name in DISHES:
        fname = f"{slug(name)}.png"
        render(name).save(os.path.join(OUT_DIR, fname))
        manifest[name] = f"/assets/food/{fname}"
        print("ok", fname)
    with open(os.path.join(OUT_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print("manifest ->", os.path.join(OUT_DIR, "manifest.json"))


if __name__ == "__main__":
    main()
