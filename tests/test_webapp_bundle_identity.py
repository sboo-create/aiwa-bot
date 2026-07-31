import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DESLOP_DIR = ROOT / "webapp2" / "assets" / "deslop"
def _deslop_bundle(directory):
    """Имя чанка версионируется при сборке — резолвим по маске, не по строке."""
    matches = sorted(directory.glob("deslop-main-*.js"))
    assert len(matches) == 1, f"ожидался один deslop-main-*.js, найдено: {matches}"
    return matches[0]


def _deslop_chart(directory):
    matches = sorted(directory.glob("AiwaWebUiChart-*.js"))
    assert len(matches) == 1, f"ожидался один AiwaWebUiChart-*.js, найдено: {matches}"
    return matches[0]



def test_deslop_module_graph_uses_one_cache_key_for_each_module():
    bootstrap = (DESLOP_DIR / "main.js").read_text(encoding="utf-8")
    chart = _deslop_chart(DESLOP_DIR).read_text(encoding="utf-8")
    bundle = _deslop_bundle(DESLOP_DIR).read_text(encoding="utf-8")
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
