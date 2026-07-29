#!/usr/bin/env bash
set -euo pipefail

if [[ "$(id -u)" -ne 0 ]]; then
  echo "run as root" >&2
  exit 1
fi

sha="${1:-}"
if [[ ! "$sha" =~ ^[0-9a-f]{40}$ ]]; then
  echo "usage: $0 <full-git-sha>" >&2
  exit 1
fi

release="/srv/aiwa-staging/releases/$sha"
source_assets="$release/webapp2/assets"
public_root="/srv/aiwa-staging/public-releases"
target="$public_root/$sha"
next_link="/srv/aiwa-staging/public-current.next"
current_link="/srv/aiwa-staging/public-current"

test -d "$source_assets"
test -f "$source_assets/food/manifest.json"
test -f "$source_assets/train/manifest.json"
getent group caddy >/dev/null

if [[ ! -e "$target" ]]; then
  install -d -o root -g caddy -m 0750 "$public_root"
  install -d -o root -g caddy -m 0750 "$target"
  cp -a "$source_assets" "$target/assets"
  chown -R root:caddy "$target"
  find "$target" -type d -exec chmod 0750 {} +
  find "$target" -type f -exec chmod 0640 {} +
fi

python3 - "$target" <<'PY'
import json
import sys
from pathlib import Path

root = Path(sys.argv[1])
for kind in ("food", "train"):
    manifest = json.loads(
        (root / "assets" / kind / "manifest.json").read_text(encoding="utf-8")
    )
    if not manifest:
        raise SystemExit(f"empty manifest: {kind}")
    for label, url in manifest.items():
        if not isinstance(label, str) or not isinstance(url, str):
            raise SystemExit(f"invalid manifest row: {kind}")
        path = root / url.removeprefix("/")
        if not path.is_file():
            raise SystemExit(f"missing asset: {kind}: {url}")
print("public assets validated")
PY

if [[ -e "$next_link" || -L "$next_link" ]]; then
  echo "refusing to replace unexpected $next_link" >&2
  exit 1
fi
ln -s "$target" "$next_link"
mv -Tf "$next_link" "$current_link"
readlink -f "$current_link"
