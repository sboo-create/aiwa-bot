#!/usr/bin/env bash
set -euo pipefail

sha="${1:-}"
if [[ ! "$sha" =~ ^[0-9a-f]{40}$ ]]; then
  echo "usage: $0 <full-git-sha>" >&2
  exit 1
fi

test_root="${AIWA_PUBLIC_ASSET_TEST_ROOT:-}"
if [[ -n "$test_root" ]]; then
  staging_root="$(python3 - "$test_root" <<'PY'
import os
import sys

print(os.path.realpath(sys.argv[1]))
PY
)"
  case "$staging_root" in
    /tmp/*|/private/tmp/*|/var/folders/*/T/*|/private/var/folders/*/T/*) ;;
    *)
      echo "AIWA_PUBLIC_ASSET_TEST_ROOT must resolve below a temporary directory" >&2
      exit 1
      ;;
  esac
  test -d "$staging_root"
  test ! -L "$staging_root"
  public_owner="$(id -un)"
  public_group="$(id -gn)"
else
  staging_root="/srv/aiwa-staging"
  public_owner="root"
  public_group="caddy"
fi
if [[ -z "$test_root" && "$(id -u)" -ne 0 ]]; then
  echo "run as root" >&2
  exit 1
fi

lock_file="$staging_root/.public-assets-activation.lock"
lock_claim="$staging_root/.public-assets-activation.lock.$$.$sha"
candidate=""
process_start_token() {
  local pid="$1"
  if [[ -r "/proc/$pid/stat" ]]; then
    awk '{print $22}' "/proc/$pid/stat" 2>/dev/null || true
  else
    ps -o lstart= -p "$pid" 2>/dev/null | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' || true
  fi
}
claim_start="$(process_start_token "$$")"
if [[ -z "$claim_start" ]]; then
  echo "cannot identify activation process start time" >&2
  exit 1
fi
printf '%s\n%s\n' "$$" "$claim_start" >"$lock_claim"
chmod 0600 "$lock_claim"
lock_acquired=0
for _attempt in 1 2 3; do
  if ln -- "$lock_claim" "$lock_file" 2>/dev/null; then
    lock_acquired=1
    break
  fi
  owner_pid="$(sed -n '1p' "$lock_file" 2>/dev/null || true)"
  owner_start="$(sed -n '2p' "$lock_file" 2>/dev/null || true)"
  current_start=""
  if [[ "$owner_pid" =~ ^[0-9]+$ ]]; then
    current_start="$(process_start_token "$owner_pid")"
  fi
  if [[ -n "$owner_start" && "$current_start" == "$owner_start" ]]; then
    rm -f -- "$lock_claim"
    echo "public asset activation already in progress: $lock_file (pid $owner_pid)" >&2
    exit 1
  fi
  # Re-sample immediately before the atomic move so a process that appeared
  # during the first /proc/ps lookup cannot have its live lock reclaimed.
  if [[ "$owner_pid" =~ ^[0-9]+$ ]]; then
    current_start="$(process_start_token "$owner_pid")"
  fi
  if [[ -n "$owner_start" && "$current_start" == "$owner_start" ]]; then
    rm -f -- "$lock_claim"
    echo "public asset activation already in progress: $lock_file (pid $owner_pid)" >&2
    exit 1
  fi
  stale_lock="$lock_file.stale.$sha.$$"
  if mv -- "$lock_file" "$stale_lock" 2>/dev/null; then
    rm -f -- "$stale_lock"
    echo "reclaimed stale public asset activation lock (pid ${owner_pid:-unknown})" >&2
  fi
done
rm -f -- "$lock_claim"
if [[ "$lock_acquired" != 1 ]]; then
  echo "could not acquire public asset activation lock: $lock_file" >&2
  exit 1
fi
cleanup() {
  if [[ -n "${candidate:-}" && -d "$candidate" ]]; then
    rm -rf -- "$candidate"
  fi
  if [[ "$(sed -n '1p' "$lock_file" 2>/dev/null || true)" == "$$" ]] &&
     [[ "$(sed -n '2p' "$lock_file" 2>/dev/null || true)" == "$claim_start" ]]; then
    rm -f -- "$lock_file"
  fi
}
trap cleanup EXIT

release="$staging_root/releases/$sha"
source_assets="$release/webapp2/assets"
public_root="$staging_root/public-releases"
target="$public_root/$sha"
next_link="$staging_root/public-current.next"
current_link="$staging_root/public-current"

if [[ -L "$target" ]]; then
  echo "refusing unexpected immutable-release symlink: $target" >&2
  exit 1
fi
if [[ -e "$next_link" || -L "$next_link" ]]; then
  echo "refusing to replace unexpected $next_link" >&2
  exit 1
fi

test -d "$source_assets"
test -f "$source_assets/food/manifest.json"
test -f "$source_assets/train/manifest.json"
if [[ -n "$test_root" ]]; then
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
resolved_root = root.resolve()

def checked_asset_path(kind, url):
    prefix = f"/assets/{kind}/"
    if not url.startswith(prefix):
        raise SystemExit(f"unsafe asset URL: {kind}: {url}")
    path = (root / url.removeprefix("/")).resolve()
    if path != resolved_root and resolved_root not in path.parents:
        raise SystemExit(f"unsafe asset URL: {kind}: {url}")
    return path

for kind in ("food", "train"):
    manifest = json.loads(
        (root / "assets" / kind / "manifest.json").read_text(encoding="utf-8")
    )
    if not manifest:
        raise SystemExit(f"empty manifest: {kind}")
    for label, url in manifest.items():
        if not isinstance(label, str) or not isinstance(url, str):
            raise SystemExit(f"invalid manifest row: {kind}")
        path = checked_asset_path(kind, url)
        if not path.is_file():
            raise SystemExit(f"missing asset: {kind}: {url}")
    previous_manifest = current / "assets" / kind / "manifest.json"
    if previous_manifest.is_file():
        previous = json.loads(previous_manifest.read_text(encoding="utf-8"))
        for previous_url in previous.values():
            previous_path = checked_asset_path(kind, str(previous_url))
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

ln -s "$target" "$next_link"
python3 - "$next_link" "$current_link" <<'PY'
import os
import sys

os.replace(sys.argv[1], sys.argv[2])
print(os.path.realpath(sys.argv[2]))
PY
