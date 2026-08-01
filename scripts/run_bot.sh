#!/bin/bash
# Запуск бота под launchd: подхватывает .env и отдаёт процесс наружу.
#
# launchd стартует процесс с пустым окружением и без shell, поэтому .env
# приходится читать здесь — иначе бот поднимется без BOT_TOKEN. `exec` нужен,
# чтобы PID процесса совпал с тем, за которым следит launchd: без него launchd
# сторожил бы обёртку, а упавшего питона не заметил.
#
#   ./scripts/run_bot.sh          — вручную, как обычный скрипт
#   launchctl kickstart -k gui/$UID/com.aiwa.bot — перезапуск под агентом
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f .env ] || { echo "Нет .env — скопируй .env.example и заполни BOT_TOKEN."; exit 1; }
[ -x venv/bin/python ] || { echo "Нет venv — python3.12 -m venv venv && venv/bin/pip install -r requirements.txt"; exit 1; }

# Homebrew в PATH: под launchd его нет, а боту нужны ffmpeg и прочие бинари.
export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

set -a; . ./.env; set +a
exec venv/bin/python aiwa_bot.py
