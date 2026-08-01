#!/bin/bash
# Быстрая публикация только Telegram Mini App на тестовый Hetzner-стенд.
# Бот читает webapp2 с диска, поэтому systemd-рестарт не нужен.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SSH_HOST="${AIWA_FRONTEND_SSH_HOST:-root@167.233.103.46}"
SSH_KEY="${AIWA_FRONTEND_SSH_KEY:-${HOME}/.ssh/hermes_hetzner}"
REMOTE_ROOT="${AIWA_FRONTEND_REMOTE_ROOT:-/srv/aiwa-test/current}"
PUBLIC_URL="${AIWA_FRONTEND_URL:-https://aiwa-167.233.103.46.sslip.io}"
DRY_RUN=0

usage() {
  echo "Использование: $0 [--dry-run]"
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --dry-run) DRY_RUN=1 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Неизвестный аргумент: $1" >&2; usage >&2; exit 2 ;;
  esac
  shift
done

command -v npm >/dev/null || { echo "Не найден npm" >&2; exit 1; }
command -v python3 >/dev/null || { echo "Не найден python3" >&2; exit 1; }
command -v rsync >/dev/null || { echo "Не найден rsync" >&2; exit 1; }
command -v curl >/dev/null || { echo "Не найден curl" >&2; exit 1; }
[ -f "$SSH_KEY" ] || { echo "Не найден SSH-ключ: $SSH_KEY" >&2; exit 1; }
case "$REMOTE_ROOT" in
  /*) ;;
  *) echo "AIWA_FRONTEND_REMOTE_ROOT должен быть абсолютным путём" >&2; exit 1 ;;
esac
[ "$REMOTE_ROOT" != "/" ] || { echo "Корень сервера нельзя использовать как цель" >&2; exit 1; }

echo "Собираю и публикую локальный webapp2…"
npm run front:build

REVISION="$(sed -nE 's/.*main\.js\?v=(r[0-9]+).*/\1/p' webapp2/index.html | head -1)"
[ -n "$REVISION" ] || { echo "Не удалось прочитать ревизию из webapp2/index.html" >&2; exit 1; }

RSYNC_ARGS=(-az --delete-delay --delay-updates --exclude .DS_Store)
if [ "$DRY_RUN" -eq 1 ]; then
  RSYNC_ARGS+=(--dry-run --itemize-changes)
fi

echo "Отправляю только webapp2 (ревизия $REVISION)…"
RSYNC_RSH="ssh -i $SSH_KEY -o BatchMode=yes" \
  rsync "${RSYNC_ARGS[@]}" webapp2/ "$SSH_HOST:${REMOTE_ROOT%/}/webapp2/"

if [ "$DRY_RUN" -eq 1 ]; then
  echo "Dry run завершён: на сервер ничего не записано."
  exit 0
fi

echo "Проверяю публичную версию…"
INDEX=""
for ATTEMPT in 1 2 3 4 5; do
  INDEX="$(curl -fsS --max-time 15 "$PUBLIC_URL/?frontend_revision=$REVISION&attempt=$ATTEMPT" || true)"
  if printf '%s' "$INDEX" | grep -Fq "/assets/deslop/main.js?v=$REVISION"; then
    break
  fi
  sleep 2
done
printf '%s' "$INDEX" | grep -Fq "/assets/deslop/main.js?v=$REVISION" || {
  echo "Публичный index.html не содержит ревизию $REVISION" >&2
  exit 1
}
BOOTSTRAP=""
for ATTEMPT in 1 2 3 4 5; do
  BOOTSTRAP="$(curl -fsS --max-time 15 "$PUBLIC_URL/assets/deslop/main.js?v=$REVISION&attempt=$ATTEMPT" || true)"
  if printf '%s' "$BOOTSTRAP" | grep -Fq "deslop-main-aiwa-"; then
    break
  fi
  sleep 2
done
printf '%s' "$BOOTSTRAP" | grep -Fq "deslop-main-aiwa-" || {
  echo "Публичный JS bootstrap не прошёл проверку" >&2
  exit 1
}

echo "Готово: $PUBLIC_URL (ревизия $REVISION), рестарт бота не выполнялся."
