#!/usr/bin/env bash
set -euo pipefail

sha="${1:-}"
if [[ ! "$sha" =~ ^[0-9a-f]{40}$ ]]; then
  echo "usage: $0 <full-git-sha>" >&2
  exit 1
fi

staging_root="${AIWA_STAGING_ROOT:-/srv/aiwa-staging}"
public_owner="${AIWA_PUBLIC_OWNER:-root}"
public_group="${AIWA_PUBLIC_GROUP:-caddy}"
if [[ "$staging_root" != /* ]]; then
  echo "AIWA_STAGING_ROOT must be absolute" >&2
  exit 1
fi
if [[ "$public_owner" == "root" && "$(id -u)" -ne 0 ]]; then
  echo "run as root" >&2
  exit 1
fi

release="$staging_root/releases/$sha"
source_assets="$release/webapp2/assets"
public_root="$staging_root/public-releases"
target="$public_root/$sha"
next_link="$staging_root/public-current.next"
current_link="$staging_root/public-current"

test -d "$source_assets"
test -f "$source_assets/food/manifest.json"
test -f "$source_assets/train/manifest.json"
if [[ "$public_group" =~ ^[0-9]+$ ]]; then
  :
elif command -v getent >/dev/null 2>&1; then
  getent group "$public_group" >/dev/null
elif command -v dscl >/dev/null 2>&1; then
  dscl . -read "/Groups/$public_group" >/dev/null
else
  echo "cannot validate public group: neither getent nor dscl is available" >&2
  exit 1
fi

install -d -o "$public_owner" -g "$public_group" -m 0750 "$public_root"
candidate="$(mktemp -d "$public_root/.${sha}.candidate.XXXXXX")"
cleanup() {
  if [[ -n "${candidate:-}" && -d "$candidate" ]]; then
    rm -rf -- "$candidate"
  fi
}
trap cleanup EXIT

cp -a "$source_assets" "$candidate/assets"
chown -R "$public_owner:$public_group" "$candidate"
find "$candidate" -type d -exec chmod 0750 {} +
find "$candidate" -type f -exec chmod 0640 {} +

python3 - "$candidate" "$current_link" <<'PY'
import json
import sys
from pathlib import Path

root = Path(sys.argv[1])
current = Path(sys.argv[2])
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
    previous_manifest = current / "assets" / kind / "manifest.json"
    if previous_manifest.is_file():
        previous = json.loads(previous_manifest.read_text(encoding="utf-8"))
        for previous_url in previous.values():
            previous_path = root / str(previous_url).removeprefix("/")
            if not previous_path.is_file():
                raise SystemExit(
                    f"previously published asset disappeared: {kind}: {previous_url}"
                )
print("public assets validated")
PY

printf '%s\n' "$sha" >"$candidate/.activation-complete"
chown "$public_owner:$public_group" "$candidate/.activation-complete"
chmod 0640 "$candidate/.activation-complete"

if [[ -e "$target" || -L "$target" ]]; then
  active_target="$(python3 - "$current_link" <<'PY'
import os
import sys

print(os.path.realpath(sys.argv[1]) if os.path.lexists(sys.argv[1]) else "")
PY
)"
  if [[ "$active_target" == "$target" ]]; then
    if [[ ! -f "$target/.activation-complete" ]] \
      || ! diff -qr --exclude=.activation-complete "$candidate" "$target" >/dev/null; then
      echo "refusing to replace active immutable release: $target" >&2
      exit 1
    fi
    rm -rf -- "$candidate"
    candidate=""
  else
    rejected="$public_root/.rejected-${sha}-$(date -u +%Y%m%dT%H%M%SZ)"
    mv -- "$target" "$rejected"
    mv -- "$candidate" "$target"
    candidate=""
    echo "quarantined incomplete or mismatched target at $rejected" >&2
  fi
else
  mv -- "$candidate" "$target"
  candidate=""
fi

if [[ -e "$next_link" || -L "$next_link" ]]; then
  echo "refusing to replace unexpected $next_link" >&2
  exit 1
fi
ln -s "$target" "$next_link"
python3 - "$next_link" "$current_link" <<'PY'
import os
import sys

os.replace(sys.argv[1], sys.argv[2])
print(os.path.realpath(sys.argv[2]))
PY
