# T0: переезд на i167 без переключения домена (Railway как прокси)

> Исторический runbook инфраструктурного T0. Актуальный переход Mini App на
> `app.aiwa-wellness.app` и последующее отключение Railway описаны в
> `app-domain-cutover-2026-08-04.md`.

Дата подготовки: 2026-07-30. Вариант согласован владельцем: production
переезжает на i167 **до** появления собственного домена; Railway-сервис
сохраняет свой публичный домен и превращается в тонкий reverse-proxy
(`railway_proxy.py`) на i167. Все ранее отправленные inline-кнопки и
BotFather Mini App URL продолжают работать без изменений.

Отличие от базового плана `i167-production-migration-plan.md`: этап
«стабильный домен сначала на Railway» не выполняется. Когда появится
собственный домен, он подключается **сразу к i167** (Caddy + `AIWA_WEBAPP_URL`
+ BotFather, один раз), а прокси остаётся дожить хвост старых кнопок.

## Целевая схема после T0

```
Telegram long poll  <- i167 (aiwa.service) -> HAProxy 8443/14443 -> relay i196
Mini App (старый URL) -> Railway proxy (railway_proxy.py) -> https://i167 (Caddy)
SQLite               -> /srv/aiwa/data/aiwa.db (единственный writer)
Railway Volume       -> заморожен, rollback-точка 72 часа
```

## Факты Railway (read-only аудит 2026-07-30)

- проект `grateful-generosity` (`fc38314f-d9a4-4975-b5ec-e7ecd74a9271`),
  environment `production` (`5f7b7620-c859-474f-a8e5-23944f5154f3`),
  сервис `worker` (`fea631f4-b270-4850-a89f-8826ce59afd9`);
- домен `worker-production-505e.up.railway.app`, target port 8080, US West,
  1 replica;
- **config-as-code**: builder, start command, healthcheck (`/health`,
  timeout 300) и restart policy задаются `/railway.json` в репо — dashboard
  их не переопределяет. Переключение на прокси = коммит в `railway.json`;
- **автодеплой из `main` включён** («Wait for CI»): каждый merge в main
  деплоится в production автоматически (проверено 2026-07-30: production
  ACTIVE на merge PR #71 спустя минуты). В proxy-first порядке автодеплой
  не выключается — он и есть механизм T0; после merge T0-PR `railway.json`
  собирает только прокси, и случайный merge второй poller не поднимет;
- 81 service variable (секреты и конфиг вместе); переносить только через
  Railway CLI (`railway variables`) по ssh-pipe на i167, без печати;
- Volume: `worker-volume` (приложение), рядом `worker-staging-volume`
  (staging остановлен, volume ждёт удаления по §10 базового плана),
  `postgres-volume`/`redis-volume` — вне scope.

## Предусловия (gate, все обязательны)

- [ ] relay A и HAProxy health-checks зелёные на i167;
- [ ] `aiwa.service` проверен в candidate-режиме (`candidate: true`, ноль
      `getUpdates`);
- [ ] restore-drill из эвакуированного снапшота пройден (integrity ok);
- [ ] `railway_proxy.py` в `main`; его тесты зелёные; живой смоук
      прокси -> i167 выполнен;
- [ ] в `/health` доступен `release_sha` (PR #67 влит);
- [ ] окно согласовано; оператор с Railway-доступом на связи;
- [ ] зафиксирован текущий Railway deployment (id/commit) как rollback-точка.

## T-1 (подготовка, без влияния на production)

- в Variables сервиса `worker` добавить
  `AIWA_PROXY_TARGET=https://aiwa-candidate-167.158-160-163-167.sslip.io`
  (безвредно до переключения: приложение переменную не читает);
- держать наготове **draft PR «T0: railway.json -> proxy»** (меняет только
  `startCommand` на `python railway_proxy.py`); мержится исключительно в T0;
- прогнать доставку переменных на i167 в тестовый файл (сверка имён с
  `aiwa-production.env.example`), файл удалить.

## T0 — последовательность (низкий простой, proxy-first)

Порядок построен так, чтобы долгий шаг (билд прокси на Railway) шёл, пока
старое приложение ещё обслуживает пользователей, а окно недоступности
свелось к переносу базы (~5 минут на 47 MiB). Ручных действий в дашборде
Railway нет: и «стоп», и «переключение» выполняет один merge. Автодеплой
НЕ выключается — он и есть механизм T0; после merge #74 `railway.json`
запускает только прокси, поэтому случайный merge второй poller поднять
не может.

1. **Предпроверки.** Кандидат на i167 здоров (`/health` через
   `aiwa-candidate-167...sslip.io` -> 200) — от него зависит healthcheck
   прокси; relay/HAProxy зелёные; свежая drill-копия базы уже на i167.
2. **Merge T0-PR (#74).** Автодеплой собирает прокси; приложение работает
   весь билд (простой = 0). Активация прокси проходит healthcheck-guard
   (`/health` проксируется на i167) и автоматически сносит деплой
   приложения — graceful SIGINT, poll завершается. С этого момента:
   - бот молчит; входящие апдейты копятся у Telegram (до 24 ч) и будут
     обработаны после старта i167 — сообщения не теряются;
   - Mini App: статика работает через прокси, а API отдаёт 401 — кандидат
     ещё на staging-токене, поэтому production-initData не проходит и
     записи невозможны (потерь данных нет by design).
3. **Убедиться в остановке.** Deployment прокси ACTIVE, приложение
   REMOVED, логи приложения затихли. База на volume квиесцентна.
4. **Финальный snapshot.** Volume `/data` примонтирован в прокси-контейнер:
   через `railway ssh` снять SQLite Backup API snapshot (python в контейнере
   есть), плюс tar `/data/food-assets`; SHA-256 на обеих сторонах;
   выгрузка ssh-pipe'ом на i167 (`~50 MiB`, секунды).
5. **Установка.** `pragma integrity_check`, counts не меньше drill-копии;
   атомарно `mv` в `/srv/aiwa/data/aiwa.db`; assets -> `data/food-assets/`;
   владельцы `aiwa:aiwa`.
6. **Секреты и env.** `railway variable list --kv` ssh-pipe'ом (механика
   отрепетирована, значения не печатаются): `BOT_TOKEN` ->
   `/srv/aiwa/secrets/bot-token`, провайдерские ключи -> `providers.env`;
   в `app.env`: удалить `AIWA_CANDIDATE`,
   `AIWA_WEBAPP_URL=https://worker-production-505e.up.railway.app` (прежний
   публичный URL!), `AIWA_ALLOWED_ORIGINS` — он же, `AIWA_PROACTIVE` и
   остальное — как в переменных Railway. Плейсхолдеры staging удаляются.
7. **Старт.** `systemctl restart aiwa`; проверить: `active`, `/health` ->
   `ok`, `candidate: false`, точный `release_sha`, один поллер, нет
   `getUpdates Conflict`; накопленные апдейты дообрабатываются. Mini App
   auth снова работает — сервис полностью восстановлен.
8. **Смоук.** Mini App по прежнему URL из Telegram iOS/Android: initData,
   три экрана, запись/чтение еды; бот: text, callback, voice, photo;
   outbox/stats; `journalctl -u aiwa` без ошибок.
9. **Наблюдение.** 30 минут активно; далее алерты. Volume и билды Railway
   не удалять 72 часа.

Про «сначала перелить снапшот»: SQLite не умеет безопасную инкрементальную
досинхронизацию двух живых файлов, поэтому финальный перенос всегда полный.
Но файл маленький (47 MiB, секунды по ssh), а свежая копия уже лежит на
i167 после restore-drill — предзаливка выигрыша не даёт; выигрыш даёт
именно порядок proxy-first выше.

## Rollback (полный возврат на Railway)

1. `systemctl stop aiwa` на i167 (дождаться завершения poll).
2. Финальный i167-snapshot; вернуть базу в Railway Volume обратной
   процедурой эвакуации (если восстановление БД не требуется — пропустить:
   restore теряет записи, сделанные на i167).
3. Revert T0-коммита `railway.json` в main (автодеплой включён) — сервис
   снова собирается как полноценное приложение; `AIWA_PROXY_TARGET` можно
   не трогать (приложение её не читает).
4. Смоук; poller ровно один (i167 остановлен!).

## После появления собственного домена (вт-ср)

1. DNS домена -> IP i167; hostname добавить в `/etc/caddy/aiwa.caddy`.
2. `AIWA_WEBAPP_URL`/`AIWA_ALLOWED_ORIGINS` -> новый домен; BotFather
   Mini App/menu URL -> новый домен; restart.
3. Новые сообщения используют свой домен; прокси остаётся только для
   старых кнопок. Через согласованный срок прокси и Railway закрываются по
   разделу 10 базового плана (инвентаризация и удаление платных ресурсов).

## Что не делать

- не запускать i167 poller, пока Railway replica не остановлена (и наоборот);
- не менять BotFather/URL на T0 — это отдельный шаг после домена;
- не удалять Railway volume/билды до окончания окна отката;
- не печатать секреты при доставке.
