"""Fast, conservative food-image resolution.

The request path only reads immutable in-memory indexes. Unknown dishes receive
an honest category placeholder; image generation is scheduled separately by
``aiwa_bot`` and must never delay a diary write or Mini App response.
"""

import base64
import hashlib
import io
import json
import math
import os
import re
import threading
from pathlib import Path
from typing import Iterable
from urllib.parse import urlsplit

import requests


STYLE_VERSION = "food-v1"
GENERATED_PROMPT_VERSION = "food-photo-v4-white"
# Заглушки — рендеры в манере каталога на белом фоне: приложение кладёт их на
# свою подложку через mix-blend-mode: darken, и контурная svg-иконка выбивалась
# из ряда 3D-тарелок. Старые svg остаются на диске: на них ещё ссылаются
# бандлы, закэшированные у клиентов.
MEAL_PLACEHOLDER = "/assets/food/meal-placeholder.webp"
DRINK_PLACEHOLDER = "/assets/food/drink-placeholder.webp"
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
    # Разговорные и множественные формы: люди пишут «картошка» и «блинчики»,
    # а каталог знает «Картофель» и «Блины». Это тот же продукт, и отказ из-за
    # словоформы выглядит как отсутствие картинки.
    "картошка": "картофель",
    "картошкой": "картофель",
    "блинчик": "блины",
    "блинчики": "блины",
    "блинчиками": "блины",
    "булочки": "булочка",
    "булочка": "булочка",
    "помидорка": "помидор",
    "помидорки": "помидор",
    "помидоры": "помидор",
    "огурцы": "огурец",
    "огурчик": "огурец",
    "мандарины": "мандарин",
    "мандаринка": "мандарин",
    "яблоки": "яблоко",
    "бананы": "банан",
    "сырник": "сырники",
    "орешки": "орехи",
    "конфета": "конфеты",
    "печеньки": "печенье",
    "печенька": "печенье",
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


def _vocabulary(manifest: dict[str, str] | None = None) -> frozenset[str]:
    """Опорные слова каталога — и только они.

    Первая версия брала словарь из всех названий манифеста плюс морфологические
    алиасы, и «варенье» тут же исправилось в «вареные»: слово из алиасов, ровно
    одна правка. Поэтому словарь сузили до слов, которые реально определяют
    картинку, — головных продуктов из групп якорей и семейных фолбэков. Слова
    вроде «варенье», «инжирное», «домашний» в него не входят и остаются нетронутыми.
    """
    words: set[str] = set()
    for group in _ANCHOR_GROUPS:
        words.update(group)
    for required, _ in _FAMILY_DEFAULTS:
        words.update(required)
    return frozenset(w for w in words if len(w) >= 5)


def _distance_one(a: str, b: str) -> bool:
    """Ровно одна правка: замена, вставка, удаление или перестановка соседних."""
    if a == b:
        return False
    la, lb = len(a), len(b)
    if abs(la - lb) > 1:
        return False
    if la == lb:
        diff = [i for i, (x, y) in enumerate(zip(a, b)) if x != y]
        if len(diff) == 1:
            return True
        # «таорог» → «творог»: соседние буквы поменялись местами
        if len(diff) == 2 and diff[1] == diff[0] + 1:
            i = diff[0]
            return a[i] == b[i + 1] and a[i + 1] == b[i]
        return False
    short, long = (a, b) if la < lb else (b, a)
    i = j = 0
    skipped = False
    while i < len(short) and j < len(long):
        if short[i] != long[j]:
            if skipped:
                return False
            skipped = True
            j += 1
            continue
        i += 1
        j += 1
    return True


def correct_typos(label: object, manifest: dict[str, str] | None = None) -> str:
    """Исправить очевидные опечатки в названии блюда по словарю каталога.

    Зачем. Запись «таорог, варенье инжирное» попадала в дневник как есть: одна
    переставленная буква — и блюдо не находит ни картинку, ни семейство, а
    пользователь видит заглушку вместо творога. Модель исправлять такое не
    должна (ей прямо запрещено достраивать догадками незнакомые слова, иначе
    она начнёт выдумывать еду), поэтому правка детерминированная и узкая:

    * трогаем только слова, которых в словаре каталога НЕТ — знакомое слово
      остаётся как есть, «торт» не превращается в «торты»;
    * только длиной от пяти букв: короткие слова слишком близки друг к другу;
    * ровно одна правка расстояния, включая перестановку соседних букв;
    * и только если кандидат ровно один. Два кандидата — оставляем как было,
      потому что «красиво, но неверно» хуже честной опечатки.
    """
    text = str(label or "")
    if not text.strip():
        return text
    vocabulary = _vocabulary(manifest)

    def fix(match: "re.Match[str]") -> str:
        word = match.group(0)
        low = word.casefold().replace("ё", "е")
        if len(low) < 5 or low in vocabulary or low.isdigit():
            return word
        hits = [c for c in vocabulary if _distance_one(low, c)]
        if len(hits) != 1:
            return word
        fixed = hits[0]
        return fixed.capitalize() if word[:1].isupper() else fixed

    return _WORD_RE.sub(fix, text)


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
    label: object, manifest: dict[str, str],
) -> tuple[str, str, str] | None:
    # Generated menu labels use the head ingredient first (“салат с…”,
    # “гречка с…”, “треска с…”). Resolve the first explicit family token in
    # text order instead of whichever family happens to appear first in the
    # defaults table. This keeps multi-ingredient dishes deterministic and
    # prevents a secondary ingredient from stealing the image.
    ordered_tokens = [
        _TOKEN_ALIASES.get(word, word)
        for word in normalize_label(label).split()
        if word not in _STOP_WORDS and not word.isdigit()
    ]
    for token in ordered_tokens:
        for required, catalog_label in _FAMILY_DEFAULTS:
            if token in required and catalog_label in manifest:
                return (
                    catalog_label,
                    manifest[catalog_label],
                    "catalog_family",
                )
    return None



#: Бренды приводим к категории, а не рисуем каждый. «Твикс», «Bombbar» и
#: «Corona» — это шоколадный батончик, протеиновый батончик и пиво; заводить
#: на каждую марку свою картинку бессмысленно и юридически мутно.
_BRAND_CATEGORIES = (
    ("Шоколадный батончик", (
        "твикс", "twix", "сникерс", "snickers", "марс", "mars", "баунти",
        "bounty", "kitkat", "kit kat", "milka", "милка", "alpen gold",
        "альпен", "picnic", "пикник",
    )),
    # Иглы сравниваются с нормализованным названием, где «M&M's» превращается
    # в «m m s»: писать здесь «m&m» бесполезно, амперсанд до этой строки не
    # доживает.
    ("Драже в глазури", ("m m", "mms", "эмэндэмс", "skittles", "скитлс", "драже")),
    ("Протеиновый батончик", ("bombbar", "бомбар", "bonbar", "protein bar", "протеиновый бат")),
    ("Газировка", (
        "доктор пеппер", "dr pepper", "pepper", "кола", "cola", "пепси",
        "pepsi", "спрайт", "sprite", "фанта", "fanta", "швепс", "schweppes",
    )),
    ("Пиво", ("corona", "heineken", "балтика", "жигул", "туборг", "tuborg", "budweiser")),
)


def brand_category(label: object) -> str | None:
    """Категория для брендового продукта, если он узнан."""
    low = normalize_label(label)
    if not low:
        return None
    for category, needles in _BRAND_CATEGORIES:
        if any(n in low for n in needles):
            return category
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
        self._generated_revision = 0
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
            if self._generated.get(food_id) == image_url:
                return
            self._generated[food_id] = image_url
            self._generated_revision += 1

    def generated_snapshot(self) -> dict[str, str]:
        with self._generated_lock:
            return dict(self._generated)

    def generated_revision(self) -> int:
        with self._generated_lock:
            return self._generated_revision

    def _generated_url(self, food_id: str) -> str | None:
        with self._generated_lock:
            return self._generated.get(food_id)

    def _subset_match(self, query_tokens: frozenset[str]) -> tuple[str, str] | None:
        if not query_tokens:
            return None
        best: tuple[int, str] | None = None
        for label, label_tokens in self._tokens.items():
            if not label_tokens or not label_tokens <= query_tokens:
                continue
            size = len(label_tokens)
            if best is None or size > best[0]:
                best = (size, label)
        if best is None:
            return None
        return best[1], self.manifest[best[1]]

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

        brand = brand_category(label)
        if brand and brand in self.manifest:
            result = (brand, self.manifest[brand], "catalog_brand")
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

        # Подмножество токенов: все слова каталожной подписи присутствуют в
        # названии. «Блины с творогом и сметаной» ⊇ «Блины», «Латте на кокосовом
        # молоке» ⊇ «Латте». Это не нечёткое сходство — лишних слов у подписи
        # нет ни одного, поэтому подмена блюда невозможна. Самая длинная
        # подходящая подпись выигрывает, иначе «Салат Цезарь» проиграл бы
        # «Салату». Замер на реальных записях прода: покрытие 43% → 74%.
        subset = self._subset_match(query_tokens)
        if subset:
            result = (subset[0], subset[1], "catalog_subset")
            with self._match_cache_lock:
                self._match_cache[normalized] = result
            return result

        query_anchor = _anchor(query_tokens)
        if not query_tokens or query_anchor is None:
            result = _family_match(label, self.manifest)
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
            # A reviewed candidate may be a less-specific subset of what the
            # user named, but never a more-specific superset. The latter would
            # invent ingredients or preparation methods (for example mapping
            # “рис с тунцом” to “тунец НА ГРИЛЕ с рисом”). Queries without a
            # safe subset use a family/neutral image and may receive a reviewed
            # exact image asynchronously.
            contained = candidate_tokens.issubset(query_tokens)
            union = query_tokens.union(candidate_tokens)
            score = len(common) / max(1, len(union))
            if contained and score >= 0.60:
                matches.append((score, len(common), candidate, self.manifest[candidate]))
        if not matches:
            result = _family_match(label, self.manifest)
            with self._match_cache_lock:
                if len(self._match_cache) >= 4096:
                    self._match_cache.clear()
                self._match_cache[normalized] = result
            return result
        matches.sort(reverse=True)
        best = matches[0]
        if len(matches) > 1 and matches[1][:2] == best[:2]:
            # Ambiguous catalog matches fail closed. Common, manually reviewed
            # formulations belong in _EXPLICIT_ALIASES; unknown combinations
            # keep the neutral fallback and can receive an exact generated
            # asset asynchronously.
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
        # Preserve reviewed exact catalog art. For a broader family/canonical
        # fallback, prefer a semantically validated image generated for this
        # exact label when one is available.
        if match and match[2] in {"catalog_exact", "catalog_alias"}:
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


def validation_enabled() -> bool:
    return os.environ.get(
        "AIWA_FOOD_IMAGE_VALIDATION", "0"
    ).strip().casefold() in {"1", "true", "yes", "on"}


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


class FoodImageValidationError(ValueError):
    """A technically valid image does not visibly represent the requested food."""

    def __init__(self, *args: object, missing: Iterable[str] = ()):
        super().__init__(*args)
        #: Components the gate could not identify — fed back into the retry so
        #: the next attempt is told what to fix instead of guessing.
        self.missing = tuple(str(item) for item in missing if str(item).strip())


def _json_object(value: object) -> dict:
    text = str(value or "").strip()
    if len(text) > 8_000:
        raise ValueError("food_image_validator_response_size")
    start = text.find("{")
    end = text.rfind("}")
    if start < 0 or end <= start:
        raise ValueError("food_image_validator_json")
    data = json.loads(text[start:end + 1])
    if not isinstance(data, dict):
        raise ValueError("food_image_validator_json")
    return data


def _validation_chat(prompt: str, image: bytes | None = None) -> dict:
    endpoint = os.environ.get(
        "AIWA_FOOD_IMAGE_VALIDATION_API_URL", ""
    ).strip()
    api_key = os.environ.get(
        "AIWA_FOOD_IMAGE_VALIDATION_API_KEY", ""
    ).strip() or os.environ.get("AIWA_FOOD_IMAGE_API_KEY", "").strip()
    model = os.environ.get(
        "AIWA_FOOD_IMAGE_VALIDATION_MODEL", ""
    ).strip()
    if not (endpoint and api_key and model):
        raise RuntimeError("food_image_validator_unconfigured")
    parsed = urlsplit(endpoint)
    if (
        parsed.scheme != "https"
        or not parsed.netloc
        or parsed.username
        or parsed.password
        or parsed.fragment
    ):
        raise ValueError("food_image_validator_url")
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
        timeout=(5, max(15, min(90, int(os.environ.get(
            "AIWA_FOOD_IMAGE_VALIDATION_TIMEOUT_SECONDS", "45"
        ))))),
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


def _literal_food_description(label: str) -> str:
    if not validation_enabled():
        return label
    data = _validation_chat(
        "Translate the following short Russian food diary label into a literal, "
        "concise English visual description for an image model. Preserve the "
        "exact main ingredient or animal species, cooking method and dish form. "
        "Name EVERY component the label mentions — protein, grain or side, "
        "vegetable, sauce — and give each one a short visual cue that tells it "
        "apart from lookalike foods: grain size and shape, cut, colour, texture "
        "(for example bulgur as coarse irregular cracked wheat versus couscous "
        "as tiny round pale granules). Do not add components the label does not "
        "mention and do not drop any. Do not infer health context. Return only "
        'JSON: {"description":"..."}. Label: '
        + json.dumps(label, ensure_ascii=False)
    )
    description = " ".join(str(data.get("description") or "").split())
    if (
        not 3 <= len(description) <= 400
        or re.search(
            r"\b(?:http|prompt|instruction|token|password)\b",
            description,
            re.I,
        )
    ):
        raise ValueError("food_image_translation")
    return description


def _validate_generated_image(
    label: str, description: str, image: bytes,
) -> float:
    if not validation_enabled():
        return 1.0
    data = _validation_chat(
        "Act as a strict food-image quality gate. Compare the image with the "
        "target dish. Every component named in the label must have its own "
        "visible portion on the plate — a component that is absent, replaced by "
        "a different food, or merged into an unidentifiable blob is a rejection, "
        "not an acceptable garnish difference. In \"absent\" list ONLY components "
        "you cannot find at all or that are clearly a different food. If a "
        "plausible portion is there but you cannot confirm the exact variety "
        "(bulgur versus couscous, one white fish versus another), that is NOT "
        "absent — leave it out of the list. Reject substitutions caused by "
        "similar-sounding words (for example fish versus carrots), non-food "
        "objects, visible text/logos or people. Return only JSON: "
        '{"matches":true,"confidence":0.0,"absent":[],"reason":"short reason"}. '
        "Original Russian label: " + json.dumps(label, ensure_ascii=False)
        + ". Literal English target: " + json.dumps(description),
        image=image,
    )
    missing = data.get("absent")
    matches = data.get("matches") is True
    if isinstance(missing, list) and any(str(item).strip() for item in missing):
        absent = [str(item) for item in missing if str(item).strip()]
        gap = re.sub(
            r"[^a-zA-Zа-яА-ЯёЁ0-9 ,_-]", "", ", ".join(absent),
        )[:48]
        raise FoodImageValidationError(
            f"food_image_missing_components:{gap}", missing=absent,
        )
    confidence = data.get("confidence")
    if (
        not isinstance(confidence, (int, float))
        or isinstance(confidence, bool)
        or not math.isfinite(float(confidence))
    ):
        raise FoodImageValidationError("food_image_validation_score")
    score = max(0.0, min(1.0, float(confidence)))
    threshold = max(0.5, min(0.95, float(os.environ.get(
        "AIWA_FOOD_IMAGE_VALIDATION_THRESHOLD", "0.78"
    ))))
    if not matches or score < threshold:
        reason = re.sub(
            r"[^a-zA-Zа-яА-ЯёЁ0-9 _-]",
            "",
            str(data.get("reason") or "semantic_mismatch"),
        )[:48]
        raise FoodImageValidationError(
            f"food_image_semantic_mismatch:{score:.2f}:{reason}"
        )
    return score


def _image_request(
    label: str,
    description: str | None = None,
    attempt: int = 1,
    missing: Iterable[str] = (),
) -> bytes:
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
    literal = description or label
    retry_note = (
        " This is a retry: depict the literal main ingredient unmistakably "
        "and avoid metaphor or word association."
        if int(attempt or 1) > 1 else ""
    )
    absent = [
        re.sub(r"[^a-zA-Zа-яА-ЯёЁ0-9 ,_-]", "", str(item)).strip()[:40]
        for item in missing
        if str(item).strip()
    ]
    if absent:
        # Blind retries repeated the same omission; naming what the gate could
        # not find is what actually moves composite dishes past it.
        retry_note += (
            " The previous attempt did not show: "
            + ", ".join(item for item in absent if item)
            + ". Render each of those unmistakably, as its own visible portion."
        )
    prompt = (
        "Single appetizing food icon for a wellness diary. Show exactly this "
        f"dish: {literal}. Original Russian label: {label}. Every component "
        "listed must be separately visible and identifiable on the plate — do "
        "not merge them into one blob and do not omit any; keep grains, cuts "
        "and textures distinct enough to tell lookalike foods apart. Appetizing "
        "food photograph: three-quarter overhead view, soft diffused studio "
        "light, gentle natural shadow under the plate, shallow depth of field, "
        "crisp texture detail, centered square composition, no people, no text, "
        "no logo. The background must be plain pure white (#FFFFFF) "
        "with no tint, gradient, shadow wash, table or surface behind the "
        "plate — the app composites the icon over its own backdrop and a baked "
        "background shows up as a grey tile. Do not replace an ingredient with "
        "a similar-sounding object." + retry_note
    )
    size = os.environ.get("AIWA_FOOD_IMAGE_SIZE", "512x512").strip()
    if not re.fullmatch(r"(?:512|1024)x(?:512|1024)", size):
        raise ValueError("food_image_provider_size")
    request_json = {
        "model": model,
        "prompt": prompt,
        "size": size,
        "response_format": "b64_json",
        "n": 1,
    }
    quality = os.environ.get("AIWA_FOOD_IMAGE_QUALITY", "").strip()
    if quality:
        if quality not in {"low", "medium", "high", "auto"}:
            raise ValueError("food_image_provider_quality")
        request_json["quality"] = quality
    response = requests.post(
        endpoint,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json=request_json,
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
        # Pure white, not a warm off-white: the Mini App paints its own
        # backdrop and composites the icon with mix-blend-mode: darken, so any
        # tint in the padding survives the blend as a visible tile.
        canvas = Image.new("RGBA", (512, 512), (255, 255, 255, 255))
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


def _reject_baked_background(webp: bytes) -> float:
    """Fail artwork that carries its own backdrop.

    The Mini App draws the tile background itself (``--aiwa-media-bg``) and
    composites the icon with ``mix-blend-mode: darken``. White pixels vanish
    into that backdrop, which is what makes the icons look cut out; anything
    darker survives and reads as a grey box around the food. The catalog-v2
    batch was generated on a beige plate and broke exactly this way, so the
    check is mechanical rather than left to the model.
    """
    from PIL import Image

    with Image.open(io.BytesIO(webp)) as source:
        source.load()
        image = source.convert("RGB")
    width, height = image.size
    pixels = image.load()
    step = max(1, width // 64)
    border = []
    for x in range(0, width, step):
        border.append(pixels[x, 0])
        border.append(pixels[x, height - 1])
    for y in range(0, height, step):
        border.append(pixels[0, y])
        border.append(pixels[width - 1, y])
    # Median, not minimum: a dish may legitimately touch the frame edge, and a
    # single dark pixel there must not reject an otherwise clean icon.
    levels = sorted(sum(pixel) / 3 for pixel in border)
    median = levels[len(levels) // 2]
    threshold = max(200.0, min(254.0, float(os.environ.get(
        "AIWA_FOOD_IMAGE_BACKGROUND_MIN", "245"
    ))))
    if median < threshold:
        raise FoodImageValidationError(
            f"food_image_background_not_white:{median:.0f}",
            missing=("plain white background",),
        )
    return median


def generate_and_store(
    label: object, attempt: int = 1, missing: Iterable[str] = (),
) -> dict[str, object]:
    """Generate one immutable asset. Intended only for a bounded worker."""
    reviewed = reviewed_generation_label(label)
    if not reviewed:
        raise ValueError("food_image_label_rejected")
    description = _literal_food_description(reviewed)
    webp = _safe_webp(_image_request(reviewed, description, attempt, missing))
    _reject_baked_background(webp)
    validation_score = _validate_generated_image(reviewed, description, webp)
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
