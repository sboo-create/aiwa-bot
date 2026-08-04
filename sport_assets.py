"""Offline generation and validation for sport/training catalog artwork.

This module deliberately has no request-path worker or database integration.
The generated catalog is reviewed and promoted as immutable static assets, so
Telegram and Mini App latency cannot depend on an image provider.
"""

from __future__ import annotations

import base64
import hashlib
import json
import math
import os
import re
import threading
from typing import Iterable
from pathlib import Path
from urllib.parse import urlsplit

import requests

import food_assets


STYLE_VERSION = "sport-v2"
GENERATED_PROMPT_VERSION = "sport-photo-v2-white"
_WORD_RE = re.compile(r"[a-zа-яё0-9]+", re.IGNORECASE)


def normalize_label(value: object) -> str:
    text = str(value or "").casefold().replace("ё", "е")
    return " ".join(_WORD_RE.findall(text))


def canonical_id(value: object) -> str:
    normalized = normalize_label(value) or "unknown"
    digest = hashlib.sha256(normalized.encode("utf-8")).hexdigest()[:16]
    return f"sport:{digest}"


def reviewed_generation_label(value: object) -> str | None:
    label = " ".join(str(value or "").strip().split())[:80]
    normalized = normalize_label(label)
    words = normalized.split()
    if not (1 <= len(words) <= 10):
        return None
    if len(normalized) < 3 or re.search(
        r"\b(ignore|prompt|system|инструкц|ссылка|http|www|пароль|токен)\b",
        normalized,
    ):
        return None
    return label


def generated_asset_dir() -> Path:
    configured = os.environ.get("AIWA_SPORT_ASSET_DIR", "").strip()
    if configured:
        return Path(configured).expanduser().resolve()
    return Path(__file__).resolve().parent / ".runtime/sport-assets"


def generated_public_base() -> str:
    base = os.environ.get(
        "AIWA_SPORT_ASSET_PUBLIC_BASE", "/generated-sport"
    ).strip().rstrip("/")
    if (
        not base
        or not base.startswith("/")
        or base.startswith("//")
        or "\\" in base
        or any(part == ".." for part in base.split("/"))
    ):
        raise ValueError("sport_asset_public_base")
    return base


def validation_enabled() -> bool:
    value = os.environ.get(
        "AIWA_SPORT_IMAGE_VALIDATION",
        os.environ.get("AIWA_FOOD_IMAGE_VALIDATION", "0"),
    )
    return value.strip().casefold() in {"1", "true", "yes", "on"}


def _provider_value(sport_name: str, food_name: str) -> str:
    return (
        os.environ.get(sport_name, "").strip()
        or os.environ.get(food_name, "").strip()
    )


def _json_object(value: object) -> dict:
    text = str(value or "").strip()
    if len(text) > 8_000:
        raise ValueError("sport_image_validator_response_size")
    start = text.find("{")
    end = text.rfind("}")
    if start < 0 or end <= start:
        raise ValueError("sport_image_validator_json")
    data = json.loads(text[start:end + 1])
    if not isinstance(data, dict):
        raise ValueError("sport_image_validator_json")
    return data


def _validation_chat(prompt: str, image: bytes | None = None) -> dict:
    endpoint = _provider_value(
        "AIWA_SPORT_IMAGE_VALIDATION_API_URL",
        "AIWA_FOOD_IMAGE_VALIDATION_API_URL",
    )
    api_key = (
        _provider_value(
            "AIWA_SPORT_IMAGE_VALIDATION_API_KEY",
            "AIWA_FOOD_IMAGE_VALIDATION_API_KEY",
        )
        or _provider_value(
            "AIWA_SPORT_IMAGE_API_KEY", "AIWA_FOOD_IMAGE_API_KEY"
        )
    )
    model = _provider_value(
        "AIWA_SPORT_IMAGE_VALIDATION_MODEL",
        "AIWA_FOOD_IMAGE_VALIDATION_MODEL",
    )
    if not (endpoint and api_key and model):
        raise RuntimeError("sport_image_validator_unconfigured")
    parsed = urlsplit(endpoint)
    if (
        parsed.scheme != "https"
        or not parsed.netloc
        or parsed.username
        or parsed.password
        or parsed.fragment
    ):
        raise ValueError("sport_image_validator_url")
    content: object = prompt
    if image is not None:
        encoded = base64.b64encode(image).decode("ascii")
        content = [
            {"type": "text", "text": prompt},
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/webp;base64,{encoded}",
                },
            },
        ]
    timeout = int(_provider_value(
        "AIWA_SPORT_IMAGE_VALIDATION_TIMEOUT_SECONDS",
        "AIWA_FOOD_IMAGE_VALIDATION_TIMEOUT_SECONDS",
    ) or "45")
    response = requests.post(
        endpoint,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": model,
            "messages": [{"role": "user", "content": content}],
            "temperature": 0,
            "max_tokens": 220,
            "response_format": {"type": "json_object"},
        },
        timeout=(5, max(15, min(90, timeout))),
    )
    response.raise_for_status()
    payload = response.json()
    message = ((payload.get("choices") or [{}])[0] or {}).get("message") or {}
    answer = message.get("content")
    if isinstance(answer, list):
        answer = " ".join(
            str(part.get("text") or "")
            for part in answer
            if isinstance(part, dict)
        )
    return _json_object(answer)


def _literal_sport_description(label: str) -> str:
    if not validation_enabled():
        return label
    data = _validation_chat(
        "Translate this short Russian sport or workout label into a literal, "
        "concise English visual description for an image model. Preserve the "
        "exact sport, equipment, environment and movement. Do not substitute "
        "a related sport. Return only JSON: {\"description\":\"...\"}. Label: "
        + json.dumps(label, ensure_ascii=False)
    )
    description = " ".join(str(data.get("description") or "").split())
    if (
        not 3 <= len(description) <= 180
        or re.search(
            r"\b(?:http|prompt|instruction|token|password)\b",
            description,
            re.I,
        )
    ):
        raise ValueError("sport_image_translation")
    return description


class SportImageValidationError(ValueError):
    """The image is technically valid but depicts the wrong activity."""


def _validate_generated_image(
    label: str, description: str, image: bytes,
) -> float:
    if not validation_enabled():
        return 1.0
    data = _validation_chat(
        "Act as a strict sport-icon quality gate. Compare the image with the "
        "target activity. The exact sport, the essential equipment and the "
        "movement must be recognizable. The icon is cut out on a plain white "
        "field on purpose — a missing gym, court or scenery is NOT a defect "
        "and must not be a reason to reject. Reject a related-but-different "
        "sport, unsafe or "
        "anatomically impossible posture, injury, visible text/logo, celebrity "
        "likeness, nudity or a close-up identifiable face. Return only JSON: "
        '{"matches":true,"confidence":0.0,"reason":"short reason"}. '
        "Original Russian label: " + json.dumps(label, ensure_ascii=False)
        + ". Literal English target: " + json.dumps(description),
        image=image,
    )
    matches = data.get("matches") is True
    confidence = data.get("confidence")
    if (
        not isinstance(confidence, (int, float))
        or isinstance(confidence, bool)
        or not math.isfinite(float(confidence))
    ):
        raise SportImageValidationError("sport_image_validation_score")
    score = max(0.0, min(1.0, float(confidence)))
    threshold = float(_provider_value(
        "AIWA_SPORT_IMAGE_VALIDATION_THRESHOLD",
        "AIWA_FOOD_IMAGE_VALIDATION_THRESHOLD",
    ) or "0.78")
    threshold = max(0.5, min(0.95, threshold))
    if not matches or score < threshold:
        reason = re.sub(
            r"[^a-zA-Zа-яА-ЯёЁ0-9 _-]",
            "",
            str(data.get("reason") or "semantic_mismatch"),
        )[:48]
        raise SportImageValidationError(
            f"sport_image_semantic_mismatch:{score:.2f}:{reason}"
        )
    return score


def _image_request(
    label: str,
    description: str | None = None,
    attempt: int = 1,
    missing: Iterable[str] = (),
) -> bytes:
    endpoint = _provider_value(
        "AIWA_SPORT_IMAGE_API_URL", "AIWA_FOOD_IMAGE_API_URL"
    )
    api_key = _provider_value(
        "AIWA_SPORT_IMAGE_API_KEY", "AIWA_FOOD_IMAGE_API_KEY"
    )
    model = _provider_value(
        "AIWA_SPORT_IMAGE_MODEL", "AIWA_FOOD_IMAGE_MODEL"
    )
    if not (endpoint and api_key and model):
        raise RuntimeError("sport_image_provider_unconfigured")
    parsed = urlsplit(endpoint)
    if (
        parsed.scheme != "https"
        or not parsed.netloc
        or parsed.username
        or parsed.password
        or parsed.fragment
    ):
        raise ValueError("sport_image_provider_url")
    literal = description or label
    retry_note = (
        " This is a retry: make the unique equipment and movement of this "
        "specific activity unmistakable."
        if int(attempt or 1) > 1 else ""
    )
    absent = [
        re.sub(r"[^a-zA-Zа-яА-ЯёЁ0-9 ,_-]", "", str(item)).strip()[:40]
        for item in missing
        if str(item).strip()
    ]
    if absent:
        retry_note += (
            " The previous attempt did not show: "
            + ", ".join(item for item in absent if item)
            + ". Render each of those clearly."
        )
    prompt = (
        "Single friendly sport icon for a wellness training diary. Show exactly "
        f"this activity: {literal}. Original Russian label: {label}. One full-"
        "body adult athlete or a small non-identifiable pair/team, with correct "
        "equipment and movement. Sport photograph: soft diffused studio light, "
        "gentle natural shadow, crisp detail, centered square composition, "
        "no close-up face, no text, no logo, no brand, no injury. "
        "The background must be plain pure white (#FFFFFF) with no tint, "
        "gradient, floor, court or scenery behind the athlete — the app composites "
        "the icon over its own backdrop and a baked background shows up as a "
        "grey tile." + retry_note
    )
    size = _provider_value(
        "AIWA_SPORT_IMAGE_SIZE", "AIWA_FOOD_IMAGE_SIZE"
    ) or "512x512"
    if not re.fullmatch(r"(?:512|1024)x(?:512|1024)", size):
        raise ValueError("sport_image_provider_size")
    request_json: dict[str, object] = {
        "model": model,
        "prompt": prompt,
        "size": size,
        "response_format": "b64_json",
        "n": 1,
    }
    quality = _provider_value(
        "AIWA_SPORT_IMAGE_QUALITY", "AIWA_FOOD_IMAGE_QUALITY"
    )
    if quality:
        if quality not in {"low", "medium", "high", "auto"}:
            raise ValueError("sport_image_provider_quality")
        request_json["quality"] = quality
    timeout = int(_provider_value(
        "AIWA_SPORT_IMAGE_TIMEOUT_SECONDS",
        "AIWA_FOOD_IMAGE_TIMEOUT_SECONDS",
    ) or "75")
    response = requests.post(
        endpoint,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json=request_json,
        timeout=(5, max(15, min(180, timeout))),
    )
    response.raise_for_status()
    payload = response.json()
    encoded = ((payload.get("data") or [{}])[0] or {}).get("b64_json")
    if not encoded:
        raise ValueError("sport_image_missing_b64")
    raw = base64.b64decode(encoded, validate=True)
    if not raw or len(raw) > 6 * 1024 * 1024:
        raise ValueError("sport_image_size")
    return raw


def generate_and_store(
    label: object, attempt: int = 1, missing: Iterable[str] = (),
) -> dict[str, object]:
    reviewed = reviewed_generation_label(label)
    if not reviewed:
        raise ValueError("sport_image_label_rejected")
    description = _literal_sport_description(reviewed)
    webp = food_assets._safe_webp(
        _image_request(reviewed, description, attempt, missing)
    )
    # Sport tiles composite over the same backdrop as food, so a baked
    # background breaks them identically.
    food_assets._reject_baked_background(webp)
    validation_score = _validate_generated_image(
        reviewed, description, webp
    )
    content_hash = hashlib.sha256(webp).hexdigest()
    directory = generated_asset_dir()
    directory.mkdir(parents=True, exist_ok=True)
    filename = f"{content_hash}.webp"
    destination = directory / filename
    if not destination.exists():
        temporary = directory / (
            f".{filename}.{os.getpid()}.{threading.get_ident()}.tmp"
        )
        with temporary.open("wb") as target:
            target.write(webp)
            target.flush()
            os.fsync(target.fileno())
        os.replace(temporary, destination)
    return {
        "image_url": f"{generated_public_base()}/{filename}",
        "content_hash": content_hash,
        "canonical_label": reviewed,
        "literal_description": description,
        "prompt_version": GENERATED_PROMPT_VERSION,
        "validation_score": validation_score,
    }

#: Резолвер тренировок — тот же механизм, что у еды.
#:
#: Подбор картинки тренировки жил на фронте отдельным кодом: точное совпадение,
#: потом вхождение подстроки, потом список из двадцати корней, выписанный
#: руками. Словоформ он не знал, и «мягкая разминка для спины» не находила
#: каталожную «Спину» — «спины» это не «спина». Запасного варианта тоже не
#: было: подбор возвращал null, и строка рисовалась без картинки вовсе.
#:
#: Всё, что делалось для еды — приведение форм, совпадение по подмножеству
#: токенов, честная заглушка, очередь на догенерацию, — обходило тренировки
#: стороной, потому что у них не было резолвера. Теперь он общий: класс из
#: food_assets работает над любым каталогом.
TRAIN_PLACEHOLDER = "/assets/train/workout-placeholder.webp"
_MANIFEST_PATH = Path(__file__).resolve().parent / "webapp2/assets/train/manifest.json"


def _manifest() -> dict[str, str]:
    with _MANIFEST_PATH.open("r", encoding="utf-8") as source:
        payload = json.load(source)
    if not isinstance(payload, dict):
        raise ValueError("sport_manifest")
    return payload


#: Композиции у тренировок нет: занятие одно, склеивать нечего.
RESOLVER = food_assets.CatalogResolver(
    _manifest(),
    placeholder=TRAIN_PLACEHOLDER,
    style_version=STYLE_VERSION,
    identity=canonical_id,
    compose=False,
)


def resolver_enabled() -> bool:
    return os.environ.get(
        "AIWA_SPORT_ASSET_RESOLVER", "1"
    ).strip().casefold() in {"1", "true", "yes", "on"}


def generation_enabled() -> bool:
    value = os.environ.get(
        "AIWA_SPORT_ASSET_GENERATION",
        os.environ.get("AIWA_FOOD_ASSET_GENERATION", "0"),
    )
    return value.strip().casefold() in {"1", "true", "yes", "on"}


def resolve(label: object) -> dict[str, object]:
    return RESOLVER.resolve(label)


def decorate(record: object, *, key: str = "type") -> dict:
    """Дополнить запись о тренировке картинкой и качеством совпадения.

    Раньше это делал фронт по манифесту, и поэтому не делал никто: тот код не
    умел ни словоформ, ни заглушки. Решение о картинке принимает сервер — там
    же, где оно принимается для еды.
    """
    if not isinstance(record, dict):
        return {}
    result = dict(record)
    if not resolver_enabled():
        return result
    result.update(resolve(result.get(key)))
    return result


def decorate_plan(plan: object) -> dict:
    """Варианты тренировки на день — с картинками.

    Названия вариантов придумывает модель («Мягкая разминка для спины»), и
    каталог их, разумеется, не содержит. Промах виден по asset_state и уезжает
    в догенерацию — как у еды.
    """
    if not isinstance(plan, dict):
        return {}
    result = dict(plan)
    options = result.get("options")
    if isinstance(options, list):
        result["options"] = [
            decorate(option, key="name") if isinstance(option, dict) else option
            for option in options
        ]
    return result
