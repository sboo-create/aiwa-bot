#!/usr/bin/env bash
set -euo pipefail

REMOTE="${REMOTE:?set REMOTE=user@host (canonical: max@158.160.163.167)}"
REMOTE_DIR="${REMOTE_DIR:-/srv/stats/aiwa/app}"
DRY_RUN="${DRY_RUN:-0}"
HERE="$(cd "$(dirname "$0")" && pwd)"
VERSION="$(git -C "$HERE" rev-parse --short HEAD 2>/dev/null || echo unknown)-$(date -u +%Y%m%d%H%M)"

FLAGS=(-az --exclude=.venv --exclude=__pycache__ --exclude='*.pyc'
  --exclude=data --exclude=deploy.sh --exclude=.DS_Store)
[ "$DRY_RUN" = "1" ] && FLAGS+=(--dry-run -v)

echo "[deploy] $HERE -> $REMOTE:$REMOTE_DIR (v$VERSION)"
rsync "${FLAGS[@]}" --rsync-path="sudo rsync" "$HERE/" "$REMOTE:$REMOTE_DIR/"
if [ "$DRY_RUN" = "1" ]; then
  exit 0
fi

TMP_VERSION="$(mktemp)"
printf '%s\n' "$VERSION" > "$TMP_VERSION"
rsync -az --rsync-path="sudo rsync" "$TMP_VERSION" "$REMOTE:$REMOTE_DIR/VERSION"
rm -f "$TMP_VERSION"

ssh "$REMOTE" "cd '$REMOTE_DIR' \
  && { [ -x .venv/bin/python ] || sudo python3 -m venv .venv; } \
  && sudo .venv/bin/pip install -q -r requirements.txt \
  && sudo chown -R gigatool:gigatool /srv/stats/aiwa \
  && sudo systemctl restart stats-aiwa && sleep 2 \
  && systemctl is-active stats-aiwa \
  && curl -sf http://127.0.0.1:9904/health \
  && curl -sf 'http://127.0.0.1:9904/summary?days=1' >/dev/null"
