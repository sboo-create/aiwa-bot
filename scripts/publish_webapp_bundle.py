#!/usr/bin/env python3
"""Кладёт свежесобранный фронт мини-аппа в webapp2/assets/deslop.

Vite складывает результат в assets/deslop со случайными хешами в именах.
Прод отдаёт файлы под стабильными именами с версией и с ?v=... в ссылках,
чтобы WebView Телеграма не показывал закешированную сборку. Скрипт делает
переименование, чинит перекрёстные ссылки и поднимает ключ кэша.

    npm run build:deslop
    python3 scripts/publish_webapp_bundle.py

Шрифты из main.css вынимаются отдельно: scripts/extract_deslop_fonts.py.
"""
import argparse
import pathlib
import re
import shutil
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
BUILD = ROOT / "assets" / "deslop"
TARGET = ROOT / "webapp2" / "assets" / "deslop"
INDEX = ROOT / "webapp2" / "index.html"


def one(pattern: str) -> pathlib.Path:
    hits = sorted(BUILD.glob(pattern))
    if len(hits) != 1:
        sys.exit(f"ожидался ровно один файл {pattern} в {BUILD}, найдено {len(hits)}")
    return hits[0]


def next_revision() -> str:
    current = re.search(r"main\.js\?v=r(\d+)", INDEX.read_text(encoding="utf-8"))
    return f"r{int(current.group(1)) + 1}" if current else "r1"


def next_version() -> str:
    versions = []
    for bundle in TARGET.glob("deslop-main-aiwa-v*.js"):
        match = re.fullmatch(r"deslop-main-aiwa-v(\d+)\.js", bundle.name)
        if match:
            versions.append(int(match.group(1)))
    return f"v{max(versions, default=0) + 1}"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--version",
        help="метка сборки, например v181; без флага берётся следующая автоматически",
    )
    args = parser.parse_args()
    version = args.version or next_version()
    version = version if version.startswith("v") else "v" + version

    main_src, chart_src = one("deslop-main-*.js"), one("AiwaWebUiChart-*.js")
    main_name = f"deslop-main-aiwa-{version}.js"
    chart_name = f"AiwaWebUiChart-aiwa-{version}.js"
    revision = next_revision()

    # Старые артефакты убираем: имена версионные, иначе они копятся.
    for stale in list(TARGET.glob("deslop-main-aiwa-*.js")) + list(TARGET.glob("AiwaWebUiChart-aiwa-*.js")):
        stale.unlink()

    # Перекрёстные ссылки между чанками переписываем на новые имена и ключ кэша,
    # иначе бандл потянет чарт по хешевому имени, которого в webapp2 нет.
    bundle = main_src.read_text(encoding="utf-8").replace(chart_src.name, f"{chart_name}?v={revision}")
    (TARGET / main_name).write_text(bundle, encoding="utf-8")
    chart = chart_src.read_text(encoding="utf-8").replace(main_src.name, f"{main_name}?v={revision}")
    (TARGET / chart_name).write_text(chart, encoding="utf-8")
    (TARGET / "main.js").write_text(f'import "./{main_name}?v={revision}";\n', encoding="utf-8")
    shutil.copy2(BUILD / "main.css", TARGET / "main.css")

    worker_dir = BUILD / "assets"
    if worker_dir.is_dir():
        worker_target = TARGET / "assets"
        worker_target.mkdir(exist_ok=True)
        worker_names = {worker.name for worker in worker_dir.glob("*.js")}
        for stale in worker_target.glob("*.js"):
            if stale.name not in worker_names:
                stale.unlink()
        for worker in worker_dir.glob("*.js"):
            shutil.copy2(worker, worker_target / worker.name)

    index = INDEX.read_text(encoding="utf-8")
    index = re.sub(
        r"deslop-main-aiwa-v\d+\.js\?v=r\d+",
        f"{main_name}?v={revision}",
        index,
    )
    index = re.sub(r"main\.js\?v=r\d+", f"main.js?v={revision}", index)
    index = re.sub(r"main\.css\?v=r\d+", f"main.css?v={revision}", index)
    INDEX.write_text(index, encoding="utf-8")

    print(f"опубликовано: {main_name}, {chart_name}, ключ кэша {revision}")


if __name__ == "__main__":
    main()
