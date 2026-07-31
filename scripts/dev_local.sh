#!/bin/bash
# Локальная разработка мини-аппа: поднимает cloudflared-туннель, подставляет свежий
# AIWA_WEBAPP_URL в .env и запускает бота. Ctrl+C гасит и туннель, и бота.
#
#   ./scripts/dev_local.sh
#
# Токен берётся из .env (тестовый бот, не продовый).
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f .env ] || { echo "Нет .env — скопируй .env.example и заполни BOT_TOKEN."; exit 1; }
[ -x venv/bin/python ] || { echo "Нет venv — python3.12 -m venv venv && venv/bin/pip install -r requirements.txt"; exit 1; }
command -v cloudflared >/dev/null || { echo "Нет cloudflared — brew install cloudflared"; exit 1; }

PORT="${PORT:-8080}"
LOG="$(mktemp -t aiwa-tunnel)"
cleanup() { kill "${TUNNEL_PID:-}" "${BOT_PID:-}" 2>/dev/null || true; }
trap cleanup EXIT INT TERM

# QUIC (UDP 7844) часто зарезан провайдером/VPN — http2 работает везде.
cloudflared tunnel --url "http://localhost:$PORT" --protocol http2 --no-autoupdate >"$LOG" 2>&1 &
TUNNEL_PID=$!

echo "Поднимаю туннель…"
URL=""
for _ in $(seq 1 60); do
  URL="$(grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' "$LOG" | head -1 || true)"
  [ -n "$URL" ] && break
  sleep 1
done
[ -n "$URL" ] || { echo "Туннель не поднялся, лог: $LOG"; exit 1; }

# Свежий адрес живёт до перезапуска туннеля, поэтому переписываем его в .env.
python3 - "$URL" <<'PY'
import pathlib, re, sys
url = sys.argv[1]
env = pathlib.Path(".env")
text = env.read_text(encoding="utf-8")
line = f"AIWA_WEBAPP_URL={url}"
text, n = re.subn(r"(?m)^AIWA_WEBAPP_URL=.*$", line, text)
env.write_text(text if n else text.rstrip("\n") + "\n" + line + "\n", encoding="utf-8")
PY

echo "Mini App: $URL"
echo "Storybook дизайн-системы: cd ~/deslop/tma && corepack yarn dev"

set -a; . ./.env; set +a
venv/bin/python aiwa_bot.py &
BOT_PID=$!
wait "$BOT_PID"
