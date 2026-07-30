# AIWA egress relay (Telegram + OpenRouter)

Fixed-destination mTLS relay по варианту A из
`docs/operations/i167-production-migration-plan.md`, расширенный на второй
upstream: план Codex покрывал только Telegram, но production так же зависит от
egress к OpenRouter (сейчас оба ходят через SSH-туннели — это SSH trust и
единые точки отказа, которые этот пакет убирает).

Свойства:

- relay принимает **только** mTLS-клиентов AIWA и подключается ровно к
  `api.telegram.org:443` и `openrouter.ai:443`; CONNECT/SOCKS/динамический
  upstream отсутствуют;
- внутренний TLS проходит насквозь: relay не видит bot token, ключи
  провайдеров и содержимое запросов;
- DNS upstream разрешается на каждое новое соединение (`delay = yes`), IP не
  фиксируются;
- на application host нет SSH-ключей или shell-доступа к relay.

## Топология и порты

```
приложение ──https──> 127.0.0.1:8443  (telegram, HAProxy на cutover)
                      127.0.0.1:14443 (openrouter, HAProxy на cutover)
HAProxy ──> stunnel client A: 18443 (tg), 24443 (or)   [B: 28443, 34443]
stunnel client ──mTLS──> relay A (i196): 15443 (tg), 16443 (or)
relay ──raw inner TLS──> api.telegram.org:443 / openrouter.ai:443
```

Порты 8443/14443 совпадают с теми, куда приложение уже ходит через
SSH-туннели, поэтому переключение не требует изменения конфигурации
приложения. Пока HAProxy не включён, тестовый путь проверяется напрямую через
18443/24443.

Relay A — i196 (переходный, общий сервер). Целевая схема — два служебных VPS
у разных провайдеров/ASN; добавление relay B = развернуть тот же пакет и
раскомментировать backend в `client/haproxy-aiwa-egress.cfg`.

## Сертификаты

CA живёт на машине оператора и не копируется на серверы:

```bash
scripts/gen-ca ~/aiwa-relay-ca
scripts/issue-cert ~/aiwa-relay-ca server relay-a.aiwa.egress
scripts/issue-cert ~/aiwa-relay-ca client i167-staging
scripts/issue-cert ~/aiwa-relay-ca client i167-production
```

Staging и production используют разные client-сертификаты: утечка одного не
открывает второй контур. Срок 397 дней; ротация — повторный выпуск, копия на
хост, перезапуск unit. Отзыв — удалить cert с хоста и перевыпустить CA-подпись
остальным при компрометации CA.

## Установка relay (i196, root)

```bash
apt-get install -y stunnel4
systemctl disable --now stunnel4 2>/dev/null || true   # дефолтный init не используется
useradd --system --home /nonexistent --shell /usr/sbin/nologin tg-relay
mkdir -p /etc/tg-relay/certs
# скопировать: server/stunnel.conf -> /etc/tg-relay/stunnel.conf
#   ca.pem, server cert/key -> /etc/tg-relay/certs/{ca.pem,server-cert.pem,server-key.pem}
chown -R root:tg-relay /etc/tg-relay
chmod 750 /etc/tg-relay /etc/tg-relay/certs
chmod 640 /etc/tg-relay/certs/*
# server/tg-relay.service -> /etc/systemd/system/tg-relay.service
systemctl daemon-reload && systemctl enable --now tg-relay
```

Firewall: если на relay включён ufw/nftables — открыть 15443/16443 только
для текущего IP application host **как дополнительный слой** (не как замену
mTLS: production IP должен быть заменяем).

## Установка клиента (application host, sudo)

```bash
sudo apt-get install -y stunnel4
sudo systemctl disable --now stunnel4 2>/dev/null || true
sudo useradd --system --home /nonexistent --shell /usr/sbin/nologin aiwa-relay
sudo mkdir -p /etc/aiwa-relay/certs
# client/stunnel-client.conf -> /etc/aiwa-relay/stunnel.conf
#   ca.pem, client cert/key -> /etc/aiwa-relay/certs/{ca.pem,client-cert.pem,client-key.pem}
sudo chown -R root:aiwa-relay /etc/aiwa-relay
sudo chmod 750 /etc/aiwa-relay /etc/aiwa-relay/certs
sudo chmod 640 /etc/aiwa-relay/certs/*
# client/aiwa-relay-client.service -> /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now aiwa-relay-client
```

Проверка пути (с application host):

```bash
scripts/verify-relay 18443 api.telegram.org
scripts/verify-relay 24443 openrouter.ai
```

## Переключение staging с SSH-туннелей (отдельное короткое окно)

1. `verify-relay` зелёный по обоим портам.
2. Установить HAProxy, положить `client/haproxy-aiwa-egress.cfg`.
3. Остановить `gigatool-tg-tunnel.service` (8443) и
   `aiwa-openrouter-tunnel.service` (14443); убедиться, что порты свободны.
4. Запустить HAProxy на 8443/14443; конфигурация приложения не меняется.
5. Смоук: `/health`, test-bot text/callback, один AI-вызов.
6. Откат: остановить HAProxy, запустить прежние туннели.

После стабильной работы staging тот же клиентский путь используется для
production layout (`/srv/aiwa`) с сертификатом `i167-production`.

## Мониторинг (минимум до cutover)

- `systemctl is-active tg-relay` на relay и `aiwa-relay-client` на app host;
- `verify-relay` по обоим портам раз в 30-60 сек (cron/timer) с алертом;
- после включения HAProxy — его health-check журнал (`log-health-checks`).
