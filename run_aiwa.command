#!/bin/bash
# Двойной клик по этому файлу запускает бота Айва на твоём Mac.
cd "$(dirname "$0")"
if ! command -v python3 >/dev/null 2>&1; then
  echo "Не найден python3. Установи: https://www.python.org/downloads/ и запусти снова."; read -n1; exit 1
fi
[ -f .env ] && set -a && . ./.env && set +a
if [ -z "$BOT_TOKEN" ]; then echo "Не задан BOT_TOKEN в .env"; read -n1; exit 1; fi
python3 -m venv venv 2>/dev/null
source venv/bin/activate
pip install -q -r requirements.txt
echo "Айва запущена. Не закрывай это окно — пока оно открыто, бот работает."
python aiwa_bot.py
