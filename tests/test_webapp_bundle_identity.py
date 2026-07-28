import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DESLOP_DIR = ROOT / "webapp2" / "assets" / "deslop"


def test_deslop_bootstrap_does_not_duplicate_the_react_module():
    bootstrap = (DESLOP_DIR / "main.js").read_text(encoding="utf-8")
    match = re.fullmatch(r'import "(\./deslop-main-[^"]+\.js)";\s*', bootstrap)

    assert match, (
        "Keep cache busting on the outer main.js script URL only. Adding a query "
        "to its internal bundle import creates a second React module identity when "
        "lazy chunks import the same bundle without that query."
    )


def test_deslop_outer_bootstrap_is_cache_busted():
    index = (ROOT / "webapp2" / "index.html").read_text(encoding="utf-8")

    assert re.search(
        r'<script type="module" src="/assets/deslop/main\.js\?v=[^"]+"></script>',
        index,
    )
