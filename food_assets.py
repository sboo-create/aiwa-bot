"""Fast, conservative food-image resolution.

The request path only reads immutable in-memory indexes. Unknown dishes receive
an honest category placeholder; image generation is scheduled separately by
``aiwa_bot`` and must never delay a diary write or Mini App response.
"""

import base64
import hashlib
import io
import json
import os
import re
import threading
from pathlib import Path
from typing import Iterable
from urllib.parse import urlsplit

import requests


STYLE_VERSION = "food-v1"
MEAL_PLACEHOLDER = "/assets/food/meal-placeholder.svg"
DRINK_PLACEHOLDER = "/assets/food/drink-cup.svg?v=1"
_MANIFEST_PATH = Path(__file__).resolve().parent / "webapp2/assets/food/manifest.json"
_WORD_RE = re.compile(r"[a-zа-яё0-9]+", re.IGNORECASE)
_STOP_WORDS = {
    "с", "со", "и", "из", "на", "в", "по", "под", "для", "без",
    "порция", "кусок", "штука", "штук", "шт", "г", "гр", "грамм",
}
_TOKEN_ALIASES = {
    "запеченная": "запеченный",
    "запеченное": "запеченный",
    "запеченные": "запеченный",
    "запечённая": "запеченный",
    "запечённое": "запеченный",
    "запечённые": "запеченный",
    "вареные": "вареный",
    "варёные": "вареный",
    "отварной": "вареный",
    "отварная": "вареный",
    "куриная": "курица",
    "куриное": "курица",
    "куриный": "курица",
    "курицей": "курица",
    "индейки": "индейка",
    "индейкой": "индейка",
    "творожная": "творог",
    "творожный": "творог",
    "гречневая": "гречка",
    "гречневой": "гречка",
    "гречкой": "гречка",
    "рисовая": "рис",
    "рисовый": "рис",
    "рисом": "рис",
    "овощной": "овощи",
    "овощная": "овощи",
    "овощами": "овощи",
    "овощей": "овощи",
    "картофелем": "картофель",
    "картофельное": "картофель",
    "картофельным": "картофель",
    "ягодами": "ягоды",
    "грибами": "грибы",
    "сыром": "сыр",
    "говядиной": "говядина",
    "рыбой": "рыба",
    "треской": "треска",
    "салатом": "салат",
    "яиц": "яйца",
    "тунцом": "тунец",
    "лососем": "лосось",
}
_EXPLICIT_ALIASES = {
    "творожная запеканка": "Запеканка творожная",
    "запеканка из творога": "Запеканка творожная",
    "запеченный лосось": "Лосось запечённый",
    "лосось в духовке": "Лосось запечённый",
    "запеченная куриная грудка": "Куриная грудка запечённая",
    "вареные яйца": "Яйца варёные",
    "салат тунец": "Салат с тунцом",
    "курага": "Сухофрукты",
}
_DRINK_RE = re.compile(
    r"\b(вода|чай|кофе|какао|сок|морс|компот|напиток|латте|капучино|"
    r"эспрессо|американо|кефир|ряженка|смузи)\b",
    re.IGNORECASE,
)
_ANCHOR_GROUPS = (
    {"омлет", "яйца", "яичница"},
    {"курица", "индейка"},
    {"лосось", "треска", "рыба", "тунец", "скумбрия", "сельдь", "креветки"},
    {"говядина", "котлеты", "тефтели", "гуляш", "бефстроганов"},
    {"суп", "борщ", "щи", "уха"},
    {"салат", "винегрет"},
    {"каша", "овсянка", "гречка", "рис", "пшено"},
    {"творог", "йогурт", "сыр", "кефир", "ряженка"},
    {"яблоко", "банан", "апельсин", "груша", "ягоды", "сухофрукты"},
)
# Deterministic family fallbacks are deliberately narrower than fuzzy
# similarity. They reuse a reviewed catalog image only when the dish contains
# an explicit main-food token. Side dishes cannot turn an unrelated unknown
# snack into a pretty but false match, while common generated menu variants
# such as “омлет из двух яиц” and “треска с капустой” still get honest,
# category-correct artwork.
_FAMILY_DEFAULTS = (
    ({"омлет"}, "Омлет с овощами"),
    ({"яичница"}, "Яичница глазунья"),
    ({"яйца", "яйцо"}, "Яйца варёные"),
    ({"треска"}, "Треска на пару"),
    ({"лосось"}, "Лосось запечённый"),
    ({"скумбрия"}, "Скумбрия запечённая"),
    ({"сельдь"}, "Сельдь с картофелем"),
    ({"тунец"}, "Тунец с салатом"),
    ({"креветки"}, "Креветки с овощами"),
    ({"рыба"}, "Рыба с картофелем"),
    ({"говядина"}, "Говядина тушёная"),
    ({"индейка"}, "Запечённая индейка с овощами"),
    ({"курица"}, "Курица с овощами"),
    ({"борщ"}, "Борщ"),
    ({"щи"}, "Щи"),
    ({"уха"}, "Уха"),
    ({"суп"}, "Овощной суп"),
    ({"творог"}, "Творог с ягодами"),
    ({"йогурт"}, "Йогурт натуральный"),
    ({"гречка"}, "Гречневая каша"),
    ({"рис"}, "Рис с овощами"),
    ({"картофель"}, "Картофель запечённый"),
    ({"салат"}, "Овощной салат"),
)


def normalize_label(value: object) -> str:
    text = str(value or "").casefold().replace("ё", "е")
    return " ".join(_WORD_RE.findall(text))


def _tokens(value: object) -> frozenset[str]:
    return frozenset(
        _TOKEN_ALIASES.get(word, word)
        for word in normalize_label(value).split()
        if word not in _STOP_WORDS and not word.isdigit()
    )


def canonical_id(value: object) -> str:
    normalized = normalize_label(value) or "unknown"
    digest = hashlib.sha256(normalized.encode("utf-8")).hexdigest()[:16]
    return f"food:{digest}"


def _anchor(tokens: Iterable[str]) -> str | None:
    token_set = set(tokens)
    for index, group in enumerate(_ANCHOR_GROUPS):
        if token_set.intersection(group):
            return str(index)
    return None


def _family_match(
    tokens: Iterable[str], manifest: dict[str, str],
) -> tuple[str, str, str] | None:
    token_set = set(tokens)
    for required, label in _FAMILY_DEFAULTS:
        if token_set.intersection(required) and label in manifest:
            return label, manifest[label], "catalog_family"
    return None


class FoodAssetResolver:
    """Immutable manifest index plus a tiny locked generated-asset overlay."""

    def __init__(self, manifest: dict[str, str]):
        self.manifest = dict(manifest)
        self._exact = {normalize_label(label): (label, url) for label, url in manifest.items()}
        self._tokens = {
            label: _tokens(label)
            for label in manifest
        }
        self._generated: dict[str, str] = {}
        self._generated_lock = threading.Lock()
        self._match_cache: dict[str, tuple[str, str, str] | None] = {}
        self._match_cache_lock = threading.Lock()

    @classmethod
    def from_default_manifest(cls) -> "FoodAssetResolver":
        with _MANIFEST_PATH.open("r", encoding="utf-8") as source:
            return cls(json.load(source))

    def publish_generated(self, food_id: str, image_url: str) -> None:
        if not food_id or not image_url:
            return
        with self._generated_lock:
            self._generated[food_id] = image_url

    def generated_snapshot(self) -> dict[str, str]:
        with self._generated_lock:
            return dict(self._generated)

    def _generated_url(self, food_id: str) -> str | None:
        with self._generated_lock:
            return self._generated.get(food_id)

    def _manifest_match(self, label: str) -> tuple[str, str, str] | None:
        normalized = normalize_label(label)
        with self._match_cache_lock:
            if normalized in self._match_cache:
                return self._match_cache[normalized]
        exact = self._exact.get(normalized)
        if exact:
            result = (exact[0], exact[1], "catalog_exact")
            with self._match_cache_lock:
                self._match_cache[normalized] = result
            return result

        alias_label = _EXPLICIT_ALIASES.get(normalized)
        if alias_label and alias_label in self.manifest:
            result = (alias_label, self.manifest[alias_label], "catalog_alias")
            with self._match_cache_lock:
                self._match_cache[normalized] = result
            return result

        query_tokens = _tokens(label)
        query_anchor = _anchor(query_tokens)
        if not query_tokens or query_anchor is None:
            result = _family_match(query_tokens, self.manifest)
            with self._match_cache_lock:
                self._match_cache[normalized] = result
            return result
        matches: list[tuple[float, int, str, str]] = []
        for candidate, candidate_tokens in self._tokens.items():
            if _anchor(candidate_tokens) != query_anchor:
                continue
            common = query_tokens.intersection(candidate_tokens)
            if not common:
                continue
            # Only accept containment around the same semantic anchor. This
            # handles “омлет с сыром и зеленью”, but cannot turn unrelated
            # snacks into the same pretty picture as the former fuzzy matcher.
            contained = (
                candidate_tokens.issubset(query_tokens)
                or query_tokens.issubset(candidate_tokens)
            )
            union = query_tokens.union(candidate_tokens)
            score = len(common) / max(1, len(union))
            if contained and score >= 0.60:
                matches.append((score, len(common), candidate, self.manifest[candidate]))
        if not matches:
            result = _family_match(query_tokens, self.manifest)
            with self._match_cache_lock:
                if len(self._match_cache) >= 4096:
                    self._match_cache.clear()
                self._match_cache[normalized] = result
            return result
        matches.sort(reverse=True)
        best = matches[0]
        if len(matches) > 1 and matches[1][:2] == best[:2]:
            result = None
        else:
            result = (best[2], best[3], "catalog_canonical")
        with self._match_cache_lock:
            if len(self._match_cache) >= 4096:
                self._match_cache.clear()
            self._match_cache[normalized] = result
        return result

    def resolve(
        self,
        label: object,
        *,
        fclass: object = None,
        items: Iterable[dict] | None = None,
    ) -> dict[str, object]:
        title = str(label or "").strip()
        match = self._manifest_match(title)
        if match:
            canonical_label, url, source = match
            return {
                "canonical_id": canonical_id(canonical_label),
                "canonical_label": canonical_label,
                "image_url": url,
                "image_source": source,
                "asset_state": "ready",
                "style_version": STYLE_VERSION,
            }

        food_id = canonical_id(title)
        generated = self._generated_url(food_id)
        if generated:
            return {
                "canonical_id": food_id,
                "canonical_label": title,
                "image_url": generated,
                "image_source": "generated",
                "asset_state": "ready",
                "style_version": STYLE_VERSION,
            }

        evidence = " ".join(
            [title, str(fclass or "")]
            + [
                str(item.get("name") or "")
                for item in (items or [])
                if isinstance(item, dict)
            ]
        )
        is_drink = normalize_label(fclass) == "напиток" or bool(_DRINK_RE.search(evidence))
        return {
            "canonical_id": food_id,
            "canonical_label": title,
            "image_url": DRINK_PLACEHOLDER if is_drink else MEAL_PLACEHOLDER,
            "image_source": "category",
            "asset_state": "missing",
            "style_version": STYLE_VERSION,
        }


RESOLVER = FoodAssetResolver.from_default_manifest()


def decorate(record: dict) -> dict:
    """Return a shallow copy decorated with stable asset metadata."""
    result = dict(record)
    if os.environ.get(
        "AIWA_FOOD_ASSET_RESOLVER", "1"
    ).strip().casefold() in {"0", "false", "no", "off"}:
        return result
    result.update(
        RESOLVER.resolve(
            result.get("dish") or result.get("title"),
            fclass=result.get("fclass"),
            items=result.get("items"),
        )
    )
    return result


def decorate_menu(menu: dict | None) -> dict:
    result = dict(menu or {})
    result["meals"] = [
        decorate(meal)
        for meal in (result.get("meals") or [])
        if isinstance(meal, dict)
    ]
    return result


def generation_enabled() -> bool:
    return os.environ.get("AIWA_FOOD_ASSET_GENERATION", "0").strip().casefold() in {
        "1", "true", "yes", "on",
    }


def generated_asset_dir() -> Path:
    configured = os.environ.get("AIWA_FOOD_ASSET_DIR", "").strip()
    if configured:
        return Path(configured).expanduser().resolve()
    data_dir = Path("/data")
    if data_dir.is_dir():
        return data_dir / "food-assets"
    return Path(__file__).resolve().parent / ".runtime/food-assets"


def generated_public_base() -> str:
    base = os.environ.get(
        "AIWA_FOOD_ASSET_PUBLIC_BASE", "/generated-food"
    ).strip().rstrip("/")
    if base.startswith("/"):
        if (
            not base
            or base.startswith("//")
            or "\\" in base
            or any(part == ".." for part in base.split("/"))
        ):
            raise ValueError("food_asset_public_base")
        return base
    parsed = urlsplit(base)
    if (
        parsed.scheme != "https"
        or not parsed.netloc
        or parsed.username
        or parsed.password
        or parsed.query
        or parsed.fragment
    ):
        raise ValueError("food_asset_public_base")
    allowed_hosts = {
        host.strip().casefold()
        for host in os.environ.get(
            "AIWA_FOOD_ASSET_ALLOWED_HOSTS", ""
        ).split(",")
        if host.strip()
    }
    if not parsed.hostname or parsed.hostname.casefold() not in allowed_hosts:
        raise ValueError("food_asset_public_host")
    return base


def reviewed_generation_label(value: object) -> str | None:
    """Admit a parsed dish label, never raw chat/profile text, to generation."""
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


def _image_request(label: str) -> bytes:
    endpoint = os.environ.get("AIWA_FOOD_IMAGE_API_URL", "").strip()
    api_key = os.environ.get("AIWA_FOOD_IMAGE_API_KEY", "").strip()
    model = os.environ.get("AIWA_FOOD_IMAGE_MODEL", "").strip()
    if not (endpoint and api_key and model):
        raise RuntimeError("food_image_provider_unconfigured")
    parsed = urlsplit(endpoint)
    if (
        parsed.scheme != "https"
        or not parsed.netloc
        or parsed.username
        or parsed.password
        or parsed.fragment
    ):
        raise ValueError("food_image_provider_url")
    prompt = (
        "Single appetizing food icon for a wellness diary: "
        f"{label}. Centered plate, simple warm 3D illustration, neutral light "
        "background, no people, no text, no logo, square composition."
    )
    response = requests.post(
        endpoint,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": model,
            "prompt": prompt,
            "size": "512x512",
            "response_format": "b64_json",
            "n": 1,
        },
        timeout=(5, max(15, min(180, int(os.environ.get(
            "AIWA_FOOD_IMAGE_TIMEOUT_SECONDS", "75"
        ))))),
    )
    response.raise_for_status()
    payload = response.json()
    encoded = ((payload.get("data") or [{}])[0] or {}).get("b64_json")
    if not encoded:
        # Deliberately do not fetch arbitrary provider-returned URLs. Base64
        # keeps generated-asset workers outside the SSRF boundary.
        raise ValueError("food_image_missing_b64")
    raw = base64.b64decode(encoded, validate=True)
    if not raw or len(raw) > 6 * 1024 * 1024:
        raise ValueError("food_image_size")
    return raw


def _safe_webp(raw: bytes) -> bytes:
    from PIL import Image

    with Image.open(io.BytesIO(raw)) as source:
        source.load()
        if source.width * source.height > 4_000_000:
            raise ValueError("food_image_pixels")
        image = source.convert("RGBA")
        image.thumbnail((512, 512), Image.Resampling.LANCZOS)
        canvas = Image.new("RGBA", (512, 512), (255, 250, 246, 255))
        x = (512 - image.width) // 2
        y = (512 - image.height) // 2
        canvas.alpha_composite(image, (x, y))
        output = io.BytesIO()
        # Omitting icc_profile is the cross-version Pillow contract for
        # excluding it. Passing None is not accepted consistently by libwebp.
        canvas.convert("RGB").save(
            output, "WEBP", quality=82, method=6, exif=b""
        )
        result = output.getvalue()
    if not result or len(result) > 512 * 1024:
        raise ValueError("food_image_webp_size")
    return result


def generate_and_store(label: object) -> dict[str, str]:
    """Generate one immutable asset. Intended only for a bounded worker."""
    reviewed = reviewed_generation_label(label)
    if not reviewed:
        raise ValueError("food_image_label_rejected")
    webp = _safe_webp(_image_request(reviewed))
    content_hash = hashlib.sha256(webp).hexdigest()
    directory = generated_asset_dir()
    directory.mkdir(parents=True, exist_ok=True)
    filename = f"{content_hash}.webp"
    destination = directory / filename
    if not destination.exists():
        temporary = directory / f".{filename}.{os.getpid()}.tmp"
        with temporary.open("wb") as target:
            target.write(webp)
            target.flush()
            os.fsync(target.fileno())
        os.replace(temporary, destination)
    return {
        "image_url": f"{generated_public_base()}/{filename}",
        "content_hash": content_hash,
        "canonical_label": reviewed,
    }
