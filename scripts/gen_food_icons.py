#!/usr/bin/env python3
"""Генерация 3d-иконок для тестовой еды через gpt-image-2 (litellm images API).

Промпт по каждому блюду: "<название> нарисуй иконку в стиле 3d для приложения белый фон".
Картинки кладутся в assets/food/<slug>.png, а соответствие "название -> файл" пишется
в assets/food/manifest.json (используется фронтом как источник иконок).

Запуск:
  LITELLM_KEY=... [LITELLM_IMAGE_URL=...] [LITELLM_IMAGE_MODEL=gpt-image-2] \
    python scripts/gen_food_icons.py
"""
import base64
import json
import os
import re
import sys
import urllib3
import requests

urllib3.disable_warnings()

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT_DIR = os.path.join(ROOT, "assets", "food")

# Базовый litellm-эндпоинт берём тот же, что и для чата, но с images/generations.
CHAT_URL = os.environ.get("LITELLM_URL", "https://94.139.253.119:8002/litellm/v1/chat/completions")
IMAGE_URL = os.environ.get("LITELLM_IMAGE_URL") or re.sub(r"/chat/completions/?$", "/images/generations", CHAT_URL)
MODEL = os.environ.get("LITELLM_IMAGE_MODEL", "gpt-image-2")
KEY = os.environ.get("LITELLM_KEY")
XKEY = os.environ.get("LITELLM_XKEY")
SIZE = os.environ.get("LITELLM_IMAGE_SIZE", "1024x1024")

# Названия еды из текущих тестовых данных (web_debug.py seed).
DISHES = [
    "Омлет с овощами и сыром",
    "Курица с рисом и салатом",
    "Греческий йогурт с ягодами",
    "Рыба с картофелем",
]

_TRANSLIT = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "e", "ж": "zh",
    "з": "z", "и": "i", "й": "y", "к": "k", "л": "l", "м": "m", "н": "n", "о": "o",
    "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f", "х": "h", "ц": "ts",
    "ч": "ch", "ш": "sh", "щ": "sch", "ъ": "", "ы": "y", "ь": "", "э": "e", "ю": "yu",
    "я": "ya", " ": "-",
}


def slug(name):
    s = "".join(_TRANSLIT.get(ch, "") for ch in name.lower())
    s = re.sub(r"[^a-z0-9-]+", "", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s or "dish"


def prompt_for(name):
    return f"{name} нарисуй иконку в стиле 3d для приложения белый фон"


def generate(name):
    headers = {"Content-Type": "application/json"}
    if KEY:
        headers["Authorization"] = f"Bearer {KEY}"
    if XKEY:
        headers["X-API-Key"] = XKEY
    payload = {"model": MODEL, "prompt": prompt_for(name), "n": 1, "size": SIZE}
    r = requests.post(IMAGE_URL, headers=headers, json=payload, timeout=(6, 180), verify=False)
    if r.status_code >= 400:
        raise RuntimeError(f"{r.status_code}: {(r.text or '')[:500]}")
    item = (r.json().get("data") or [{}])[0]
    if item.get("b64_json"):
        return base64.b64decode(item["b64_json"])
    if item.get("url"):
        img = requests.get(item["url"], timeout=(6, 180), verify=False)
        img.raise_for_status()
        return img.content
    raise RuntimeError(f"нет данных изображения в ответе: {str(r.json())[:300]}")


def main():
    if not KEY:
        sys.exit("нужен LITELLM_KEY в окружении")
    os.makedirs(OUT_DIR, exist_ok=True)
    print(f"images endpoint: {IMAGE_URL}\nmodel: {MODEL}\n")
    manifest = {}
    for name in DISHES:
        fname = f"{slug(name)}.png"
        print(f"→ {name} … ", end="", flush=True)
        try:
            data = generate(name)
        except Exception as e:
            print(f"FAIL ({e})")
            continue
        with open(os.path.join(OUT_DIR, fname), "wb") as f:
            f.write(data)
        manifest[name] = f"/assets/food/{fname}"
        print(f"ok ({len(data)} bytes) -> {fname}")
    with open(os.path.join(OUT_DIR, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f"\nmanifest: {os.path.join(OUT_DIR, 'manifest.json')} ({len(manifest)} блюд)")


if __name__ == "__main__":
    main()
