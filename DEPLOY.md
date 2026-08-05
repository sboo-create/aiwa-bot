# AIWA: production, staging и откат

Этот документ описывает текущую схему после переноса с Railway на i167.
Секреты здесь намеренно не указаны.

## Где что работает

- **production**: i167 (`158.160.163.167`), systemd unit `aiwa`, каталог
  `/srv/aiwa`, SQLite `/srv/aiwa/data/aiwa.db`, публичный адрес
  `https://app.aiwa-wellness.app`;
- **staging**: тот же выделенный сервер, изолированный unit
  `aiwa-staging.service`, каталог `/srv/aiwa-staging`, отдельные bot token и
  SQLite, публичный адрес
  `https://aiwa-staging-167.158-160-163-167.sslip.io`;
- **analytics**: отдельный `stats-aiwa` на i167 и
  `https://stats.multitool.works/p/aiwa/`.

Railway compute остановлен 2026-08-05 и больше не является runtime или
rollback-контуром. Проект `grateful-generosity` подлежит окончательному
удалению workspace admin вместе со всеми environments, volumes, domains,
TCP proxies и shared variables.

Нельзя одновременно запускать две копии с одним production `BOT_TOKEN`:
Telegram long polling начнёт конфликтовать, а фоновые рассылки могут
задвоиться.

## Доступ и конфигурация

Релиз выполняется workflow `Deploy to i167` из
`.github/workflows/deploy.yml`. Нужны repository secrets:

- `I167_DEPLOY_KEY`;
- `I167_HOST`;
- `I167_KNOWN_HOSTS`.

Production-конфигурация хранится на сервере в
`/srv/aiwa/config/app.env`, bot token — в защищённом credential-файле,
provider credentials — в `/srv/aiwa/secrets/providers.env`.

Канонические web-настройки:

```text
AIWA_WEBAPP_URL=https://app.aiwa-wellness.app
AIWA_ALLOWED_ORIGINS=https://app.aiwa-wellness.app
```

Railway hostnames не должны возвращаться в allowed origins, Telegram menu
buttons или BotFather Main Mini App URL.

## Порядок релиза

1. Убедиться, что точный SHA находится в `origin/main`, а обязательные CI
   checks зелёные.
2. Проверить тот же SHA на staging: `/health`, Telegram text, voice/photo,
   Mini App, профиль, дневник и фоновые задачи.
3. Запустить Actions → `Deploy to i167` → `Run workflow`, указать ref и
   `confirm: deploy`.
4. Workflow прогонит тесты, передаст `git archive` по forced-command SSH,
   создаст pre-deploy SQLite snapshot, атомарно переключит immutable release
   и проверит точный `release_sha`.
5. Проверить снаружи:

   ```bash
   curl --fail --show-error https://app.aiwa-wellness.app/health
   ```

6. Проверить service logs: единственный Telegram poller, запуск scheduler,
   живой event writer, доставку traction outbox и отсутствие повторяющихся
   ошибок LLM/Telegram/SQLite.
7. Провести smoke реальным production-ботом: текст, кнопка, три экрана Mini
   App и переключение даты.

Подробная механика forced-command deploy и ручного rollback описана в
`deploy/i167/DEPLOY.md`.

## Backup и восстановление SQLite

Нельзя копировать живой `aiwa.db` обычным `cp`: WAL может сделать копию
несогласованной. Deploy helper создаёт snapshot через SQLite Backup API перед
каждым переключением release.

Ручное восстановление выполняется оператором на i167 только при подтверждённом
повреждении данных:

1. остановить `aiwa`;
2. сделать аварийный snapshot текущего состояния;
3. проверить SHA-256 и `PRAGMA integrity_check` у выбранной копии;
4. заменить БД с сохранением повреждённого файла;
5. запустить `aiwa` и проверить `/health`, Telegram, очереди и агрегаты.

Откат кода не требует отката БД: миграции должны оставаться обратно
совместимыми, чтобы не терять новые пользовательские записи.

## Что проверить после большого релиза

- `release_sha` совпадает с выкатываемым SHA;
- `pragma integrity_check` возвращает `ok`;
- количество users/meals/workouts/events не уменьшилось;
- `event_writer_alive=true`, failures/dropped равны нулю;
- `traction_outbox` не растёт;
- cron и proactive jobs созданы один раз;
- нет `Conflict: terminated by other getUpdates request`;
- Mini App отдаёт актуальные HTML/JS/CSS и проходит iOS/Android smoke.

## Окончательное удаление Railway

Удаление требует роли workspace admin:

```bash
railway project delete \
  --project fc38314f-d9a4-4975-b5ec-e7ecd74a9271
```

Удаляется только проект AIWA `grateful-generosity`. Не трогать отдельный
проект `narra-proxy`, домен `stats.multitool.works` и сервисы i167. После
удаления проверить, что проект отсутствует в Railway Dashboard и новые
resource usage больше не начисляются.
