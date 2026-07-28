#!/usr/bin/env python3
"""Extract embedded Deslop OTF fonts to deduplicated, cacheable WOFF2 files."""

from __future__ import annotations

import base64
import re
import tempfile
from pathlib import Path

from fontTools.ttLib import woff2


ROOT = Path(__file__).resolve().parents[1]
CSS_PATH = ROOT / "webapp2/assets/deslop/main.css"
FONT_DIR = CSS_PATH.parent / "fonts"
FACE_RE = re.compile(r"@font-face\{[^{}]*\}")
DATA_RE = re.compile(
    r"url\(data:font/otf;base64,([A-Za-z0-9+/=]+)\)"
    r"(?:\s*format\([\"']opentype[\"']\))?"
)


def property_value(block: str, name: str) -> str:
    match = re.search(rf"{re.escape(name)}:([^;}}]+)", block)
    return match.group(1).strip().strip("\"'") if match else ""


def font_filename(block: str) -> str:
    family = property_value(block, "font-family")
    weight = property_value(block, "font-weight") or "400"
    families = {
        "SB Sans Interface": "sb-sans-interface",
        "SB Sans Interface Caps": "sb-sans-interface-caps",
        "SB Sans Text Mono": "sb-sans-text-mono",
    }
    if family not in families:
        raise RuntimeError(f"Unexpected embedded font family: {family!r}")
    return f"{families[family]}-{weight}.woff2"


def main() -> None:
    css = CSS_PATH.read_text(encoding="utf-8")
    faces = FACE_RE.findall(css)
    embedded = [face for face in faces if DATA_RE.search(face)]
    if not embedded:
        print("No embedded Deslop fonts found; nothing to do.")
        return
    if len(embedded) != 10:
        raise RuntimeError(f"Expected 10 embedded font faces, found {len(embedded)}")

    FONT_DIR.mkdir(parents=True, exist_ok=True)
    written: dict[str, bytes] = {}
    seen_faces: set[str] = set()

    with tempfile.TemporaryDirectory(prefix="aiwa-deslop-fonts-") as temp_dir:
        temp_root = Path(temp_dir)

        def replace_face(match: re.Match[str]) -> str:
            block = match.group(0)
            data_match = DATA_RE.search(block)
            if not data_match:
                return block
            filename = font_filename(block)
            otf_bytes = base64.b64decode(data_match.group(1), validate=True)
            previous = written.get(filename)
            if previous is not None and previous != otf_bytes:
                raise RuntimeError(f"Conflicting embedded data for {filename}")
            if previous is None:
                source = temp_root / filename.replace(".woff2", ".otf")
                target = FONT_DIR / filename
                source.write_bytes(otf_bytes)
                woff2.compress(str(source), str(target))
                written[filename] = otf_bytes
            relative = f"url(fonts/{filename}) format(\"woff2\")"
            transformed = DATA_RE.sub(relative, block, count=1)
            if transformed in seen_faces:
                return ""
            seen_faces.add(transformed)
            return transformed

        optimized = FACE_RE.sub(replace_face, css)

    if len(written) != 6 or len(seen_faces) != 6:
        raise RuntimeError(
            f"Expected 6 unique fonts/faces, got {len(written)}/{len(seen_faces)}"
        )
    CSS_PATH.write_text(optimized, encoding="utf-8")
    print(
        f"Optimized {CSS_PATH}: {len(css)} -> {len(optimized)} bytes; "
        f"wrote {len(written)} WOFF2 fonts."
    )


if __name__ == "__main__":
    main()
