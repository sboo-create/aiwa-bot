# T0: переезд на i167 без переключения домена (Railway как прокси)

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

## T0 — последовательность (цель: < 30 минут)

1. **Стоп Railway app.** Дашборд: `worker-production` -> остановить
   deployment (scale к нулю). Poll завершается сам; убедиться, что replica
   выключена.
2. **Финальный snapshot.** По процедуре
   `railway-volume-evacuation-2026-07-30.md`: SQLite Backup API snapshot,
   выгрузка с Volume, SHA-256 на обеих сторонах.
3. **Доставка на i167.** Snapshot -> `/srv/aiwa/data/aiwa.db` (атомарно:
   во временное имя, `pragma integrity_check`, затем `mv`), владельцы
   `aiwa:aiwa`.
4. **Production-секреты.** Из Railway variables -> `/srv/aiwa/secrets/bot-token`
   и `providers.env`, без печати значений в терминал/логи. Плейсхолдеры
   staging удаляются.
5. **Env production.** В `/srv/aiwa/config/app.env`: удалить
   `AIWA_CANDIDATE`; `AIWA_WEBAPP_URL=https://worker-production-505e.up.railway.app`
   (прежний публичный URL!); `AIWA_ALLOWED_ORIGINS` — он же; `AIWA_PROACTIVE`
   и прочие значения — как на Railway production.
6. **Старт.** `systemctl restart aiwa`; проверить: `active`, `/health` ->
   `ok`, `candidate: false`, точный `release_sha`, в журнале один поллер и
   нет `getUpdates Conflict`.
7. **Railway -> прокси.** `worker-production` -> Variables:
   `AIWA_PROXY_TARGET=https://aiwa-candidate-167.158-160-163-167.sslip.io`;
   Settings -> Custom Start Command: `python railway_proxy.py`; Deploy.
   Домен сервиса не меняется.
8. **Смоук.** Mini App по прежнему URL из Telegram iOS/Android: initData,
   три экрана, запись/чтение еды; бот: text, callback, voice, photo;
   outbox/stats; `journalctl -u aiwa` без ошибок.
9. **Наблюдение.** 30 минут активно; далее алерты. Volume и билды Railway
   не удалять 72 часа.

## Rollback (полный возврат на Railway)

1. `systemctl stop aiwa` на i167 (дождаться завершения poll).
2. Финальный i167-snapshot; вернуть базу в Railway Volume обратной
   процедурой эвакуации (если восстановление БД не требуется — пропустить:
   restore теряет записи, сделанные на i167).
3. `worker-production`: убрать Custom Start Command и `AIWA_PROXY_TARGET`,
   redeploy прежнего билда — сервис снова полноценное приложение.
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
