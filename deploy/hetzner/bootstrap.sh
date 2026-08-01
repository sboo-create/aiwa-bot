#!/bin/bash
# Разовая подготовка тестового стенда AIWA на Hetzner. Идемпотентен —
# безопасно гонять повторно.
#
#   ssh -i ~/.ssh/hermes_hetzner root@167.233.103.46 'bash -s' < deploy/hetzner/bootstrap.sh
#
# Скрипт НЕ запускает сервис: без токена он всё равно упадёт. Порядок такой —
# bootstrap, затем секреты руками (см. README.md), затем systemctl start.
set -euo pipefail

ROOT=/srv/aiwa-test
USER_NAME=aiwa-test

# Системный юзер без логина и без домашнего каталога: сервису нужен только
# доступ к своим каталогам.
if ! id "$USER_NAME" >/dev/null 2>&1; then
  useradd --system --no-create-home --shell /usr/sbin/nologin "$USER_NAME"
  echo "создан пользователь $USER_NAME"
fi

mkdir -p "$ROOT"/{current,data,data/food-assets,config,secrets,logs}

# Данные пишет сервис, всё остальное только читает.
chown -R "$USER_NAME:$USER_NAME" "$ROOT/data"
chmod 750 "$ROOT/data"

# Секреты читает systemd от root ещё до сброса привилегий, поэтому сервисному
# пользователю доступ не нужен вовсе.
chown -R root:root "$ROOT/secrets"
chmod 700 "$ROOT/secrets"

chown root:root "$ROOT" "$ROOT/config" "$ROOT/current"
chmod 755 "$ROOT" "$ROOT/config" "$ROOT/current"

# venv отдельный от системного питона: на коробке живут другие сервисы.
if [ ! -x "$ROOT/venv/bin/python" ]; then
  python3 -m venv "$ROOT/venv"
  echo "создан venv"
fi
"$ROOT/venv/bin/pip" install --quiet --upgrade pip
if [ -f "$ROOT/current/requirements.txt" ]; then
  "$ROOT/venv/bin/pip" install --quiet -r "$ROOT/current/requirements.txt"
  echo "зависимости установлены"
fi

# Пустые файлы под секреты с правильными правами: значения вписывает человек,
# скрипт их не трогает и не печатает.
for secret in bot-token providers.env; do
  [ -f "$ROOT/secrets/$secret" ] || install -m 600 -o root -g root /dev/null "$ROOT/secrets/$secret"
done

echo
echo "готово. дальше:"
echo "  1) вписать токен:   nano $ROOT/secrets/bot-token"
echo "  2) ключи провайдеров: nano $ROOT/secrets/providers.env"
echo "  3) systemctl enable --now aiwa-test"
