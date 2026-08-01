# AIWA test stand on Hetzner

Тестовый стенд на той же коробке, где живут gigagochi и радио
(`167.233.103.46`). Изолирован от них отдельным пользователем, каталогом и
systemd-юнитом.

- публичный адрес: `https://aiwa-167.233.103.46.sslip.io`;
- код: `/srv/aiwa-test/current`;
- SQLite: `/srv/aiwa-test/data/aiwa.db`;
- конфигурация: `/srv/aiwa-test/config/app.env`;
- секреты: `/srv/aiwa-test/secrets/` (`bot-token`, `providers.env`), режим 600 root;
- HTTP bind: `172.19.0.1:9910`;
- публичный HTTPS: общий Caddy из стека bizzy-radio.

## Чем отличается от deploy/i167

Кит i167 обходил сетевые ограничения площадки: релей до Telegram на `:8443`,
SSH-туннель до OpenRouter на `:14443`, российский trust-бандл для SaluteSpeech.
Из Германии Telegram и OpenRouter доступны напрямую, поэтому здесь ничего
этого нет — юнит зависит только от сети.

Второе отличие — ресурсы. На коробке 3.7 ГБ памяти на все сервисы и swap занят
наполовину, поэтому `MemoryMax=768M` и урезанные пулы воркеров в `app.env`.
Стенд рассчитан на одного-двух тестировщиков, не на нагрузку.

## Почему bind на 172.19.0.1, а не на loopback

Caddy здесь работает в контейнере (`bizzy-radio-caddy-1`, сеть
`bizzy-radio_default`), и `127.0.0.1` хоста ему не виден. `172.19.0.1` — гейтвей
этой docker-сети: адрес приватный, снаружи не маршрутизируется, а контейнер до
него дотягивается.

Если стек bizzy-radio пересоздадут, гейтвей может смениться. Проверить:

```bash
docker network inspect bizzy-radio_default --format '{{(index .IPAM.Config 0).Gateway}}'
```

и поправить `AIWA_BIND_HOST` в `app.env` вместе с `reverse_proxy` в Caddyfile.

## ufw: без правила Caddy получает 502

На хосте активен ufw с `deny (incoming)`, и трафик из docker-моста на порт
хоста под это правило подпадает. Симптом ровно такой: с хоста
`curl http://172.19.0.1:9910/health` отдаёт 200, а снаружи через Caddy — 502.

Нужное правило (только приватная подсеть, наружу порт не выставляется):

```bash
ufw allow from 172.19.0.0/16 to any port 9910 proto tcp comment "aiwa-test via caddy"
```

Диагностика, которая сразу отделяет эту причину от падения сервиса:

```bash
curl -m 8 http://172.19.0.1:9910/health                                   # с хоста
docker exec bizzy-radio-caddy-1 wget -q -T 8 -O - http://172.19.0.1:9910/health   # из контейнера
```

## Первая установка

```bash
ssh -i ~/.ssh/hermes_hetzner root@167.233.103.46 'bash -s' < deploy/hetzner/bootstrap.sh
```

Дальше — секреты руками на сервере, значения через агента или чат не передаются:

```bash
ssh -i ~/.ssh/hermes_hetzner root@167.233.103.46
nano /srv/aiwa-test/secrets/bot-token        # только сам токен, одной строкой
nano /srv/aiwa-test/secrets/providers.env    # AIWA_ANALYTICS_SALT=..., OPENROUTER_API_KEY=...
systemctl enable --now aiwa-test
```

`bot-token` читает systemd как credential и подставляет в `BOT_TOKEN_FILE` —
токен не попадает ни в окружение процесса целиком, ни в `systemctl show`.

## Обновление кода

```bash
rsync -az --delete \
  --exclude '/.git/' --exclude '/venv/' --exclude 'node_modules/' \
  --exclude '__pycache__/' --exclude '*.pyc' \
  --exclude '/aiwa.db*' --exclude '/aiwa-local.db*' --exclude '/.env' \
  --exclude '/assets/deslop/' --exclude '/logs/' --exclude '/archive/' \
  -e "ssh -i ~/.ssh/hermes_hetzner" \
  ./ root@167.233.103.46:/srv/aiwa-test/current/
ssh -i ~/.ssh/hermes_hetzner root@167.233.103.46 'systemctl restart aiwa-test'
```

Исключения обязательно якорить слэшем: без него `assets/deslop/` вырезает и
`webapp2/assets/deslop/`, то есть сам бандл мини-аппа.

Правки только по фронту перезапуска не требуют — `webapp2/index.html` и бандлы
читаются с диска на каждый запрос. Быстрая команда сама проверит исходники,
поднимет cache key, синхронизирует только `webapp2` и проверит публичный бандл:

```bash
npm run front:deploy
```

Посмотреть дельту без записи на сервер: `npm run front:deploy -- --dry-run`.
Подробный рабочий цикл: [`docs/frontend-workflow.md`](../../docs/frontend-workflow.md).

## Caddy

Site-блок лежит в общем `/opt/bizzy-radio/Caddyfile` — том же, что обслуживает
`gigagochi.serega.works` и радио. Перед перезагрузкой обязательно:

```bash
docker exec bizzy-radio-caddy-1 caddy validate --adapter caddyfile --config /etc/caddy/Caddyfile
docker exec bizzy-radio-caddy-1 caddy reload --adapter caddyfile --config /etc/caddy/Caddyfile
curl -fsS https://gigagochi.serega.works/health
```

Бэкап до появления AIWA: `/opt/bizzy-radio/Caddyfile.bak-before-aiwa`.

## База

Стенд стартует с пустой SQLite и проходит онбординг заново. Продуктовые данные
сюда не копируются — то же правило, что и в ките i167.

## Диагностика

```bash
systemctl status aiwa-test
journalctl -u aiwa-test -n 100 --no-pager
curl -fsS https://aiwa-167.233.103.46.sslip.io/health
```

`502` от Caddy означает, что сервис не слушает `172.19.0.1:9910` — смотреть
журнал юнита.
