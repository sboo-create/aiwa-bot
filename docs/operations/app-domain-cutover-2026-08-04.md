# Mini App domain cutover: Railway -> app.aiwa-wellness.app

Дата подготовки: 2026-08-04. Статистика и `stats.multitool.works` вне scope:
их hostname, Caddy routes, service и `AIWA_TRACTION_URL` не меняются.

Статус 2026-08-05: владелец подтвердил Main Mini App URL в BotFather и
iOS/Android smoke. Все production и load-test deployments в Railway
остановлены, Railway production hostname отвечает 404, прямой production на
i167 здоров. Окончательное удаление проекта `grateful-generosity` ожидает
workspace admin: текущая operator-role не имеет права удалять services/project.

## Выполнено 2026-08-04

- DNS, Caddy и TLS для `app.aiwa-wellness.app` включены;
- production `AIWA_WEBAPP_URL` и глобальная Telegram menu button переключены;
- Railway proxy смотрит на app-домен и отдаёт тот же release SHA;
- Railway service fallback start command зафиксирован на proxy, autodeploy
  ограничен тремя файлами, legacy application variables удалены;
- старый production volume отсоединён от proxy без удаления данных;
- CI external health-check переключён на app-домен.

Main Mini App URL в BotFather и ручной Telegram iOS/Android smoke подтверждены
владельцем 2026-08-05.

## Целевая схема

- `aiwa-wellness.app` — публичный лендинг;
- `app.aiwa-wellness.app` — канонический Mini App и API;
- `worker-production-505e.up.railway.app` — короткоживущий compatibility
  proxy только для уже отправленных Telegram inline-кнопок;
- `aiwa-candidate-167.158-160-163-167.sslip.io` — исторический candidate alias;
  в итоговой Caddy-конфигурации он удалён.

Фронтенд использует root-relative `/api/*` и `/assets/*`, поэтому Mini App
живёт на отдельном hostname, а не под `/app` на домене лендинга.

## Исторический cutover на собственный домен

Ниже зафиксированы шаги, выполненные 2026-08-04. Это не актуальная инструкция
для повторного применения: текущий `AIWA_ALLOWED_ORIGINS` содержит только
`https://app.aiwa-wellness.app`.

1. DNS `A app.aiwa-wellness.app -> 158.160.163.167`, TTL 300.
2. Добавить hostname в `/etc/caddy/aiwa.caddy`, `caddy validate`, reload.
3. Проверить публичные `/health`, `/`, CSS/JS и отсутствие TLS-ошибок.
4. На i167 задать:

   ```text
   AIWA_WEBAPP_URL=https://app.aiwa-wellness.app
   AIWA_ALLOWED_ORIGINS=https://app.aiwa-wellness.app  # текущее значение
   ```

5. Перезапустить `aiwa`; проверить exact `release_sha`, единственный poller и
   `getChatMenuButton`. Новые inline-кнопки после этого используют app-домен.
6. В BotFather заменить Main Mini App URL на
   `https://app.aiwa-wellness.app/`. `getChatMenuButton` этого не делает:
   профильная кнопка Launch app — отдельная настройка.
7. В Railway изменить только
   `AIWA_PROXY_TARGET=https://app.aiwa-wellness.app`. Старый Railway hostname
   должен продолжить прозрачно обслуживать `/`, `/assets/*` и `/api/*`.
8. На уровне Railway service зафиксировать `python railway_proxy.py` как
   fallback start command и ограничить autodeploy файлами `railway_proxy.py`,
   `railway.json`, `requirements.txt`. Атомарно удалить legacy variables:
   proxy не нужны bot/provider tokens или production app config.
9. Smoke через Telegram iOS/Android: initData, главная, питание, нагрузка,
   чтение и запись дневника, фото. Отдельно открыть старую inline-кнопку.

## Несколько дней совместимости

- Не отдавать redirect с Railway: прозрачный proxy надёжнее сохраняет старый
  origin, query string и Telegram WebApp lifecycle.
- Ежедневно смотреть Railway HTTP logs без IP/user data: открытия `/`,
  `/api/*`, ошибки 4xx/5xx.
- Не считать Railway volume актуальным rollback state: source of truth уже
  `/srv/aiwa/data/aiwa.db` на i167.
- Новые деплои проверяют `https://app.aiwa-wellness.app/health`, поэтому
  остановка Railway больше не ломает production deploy workflow.

## Финальное отключение Railway

Исторические inline-кнопки содержат Railway service domain навсегда. Перед
отключением владелец продукта явно принимает, что они перестанут работать;
актуальное меню и все новые кнопки к этому моменту уже ведут на app-домен.

1. [x] Зафиксировать Railway HTTP traffic и проверить ошибки.
2. [x] Получить явное решение владельца удалить устаревшие Railway data.
3. [x] Остановить production, staging и load-test deployments.
4. [ ] Workspace admin удаляет целиком проект `grateful-generosity`, включая
   services, environments, volumes, domains, TCP proxies и shared variables.
   Не трогать `narra-proxy`, `stats.multitool.works` и `stats-aiwa` на i167.
5. [ ] На i167 удалить Railway origin из `AIWA_ALLOWED_ORIGINS`, restart
   `aiwa` и проверить точный `release_sha`.
6. [ ] Повторить production `/health`, Telegram smoke и следующий ручной
   deploy из GitHub Actions; убедиться, что Railway usage больше не растёт.

## Rollback после отключения Railway

Railway больше не является rollback target. Откат выполняется переключением
на предыдущий immutable release i167; SQLite остаётся актуальной, если нет
подтверждённого повреждения данных. При проблеме DNS оператор проверяет i167
локально или через временный явно согласованный диагностический hostname, не
возвращая старые aliases в production Caddy.
