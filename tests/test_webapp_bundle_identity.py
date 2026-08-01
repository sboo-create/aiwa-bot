import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DESLOP_DIR = ROOT / "webapp2" / "assets" / "deslop"


def test_deslop_module_graph_uses_one_cache_key_for_each_module():
    bootstrap = (DESLOP_DIR / "main.js").read_text(encoding="utf-8")
    chart = (DESLOP_DIR / "AiwaWebUiChart-aiwa-v177.js").read_text(
        encoding="utf-8"
    )
    bundle = (DESLOP_DIR / "deslop-main-aiwa-v177.js").read_text(
        encoding="utf-8"
    )
    match = re.fullmatch(
        r'import "(\./deslop-main-[^"]+\.js\?v=([^"]+))";\s*',
        bootstrap,
    )

    assert match, (
        "The immutable transitive bundle needs an explicit cache revision."
    )
    main_url, revision = match.groups()
    assert f'from "{main_url}";' in chart
    assert f'import("./AiwaWebUiChart-aiwa-v177.js?v={revision}")' in bundle
    assert chart.count(main_url) == 1


def test_deslop_outer_bootstrap_is_cache_busted():
    index = (ROOT / "webapp2" / "index.html").read_text(encoding="utf-8")

    assert re.search(
        r'<script type="module" src="/assets/deslop/main\.js\?v=[^"]+"></script>',
        index,
    )
