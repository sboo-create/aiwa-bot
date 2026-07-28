# AIWA: staging, production и откат

Этот документ описывает текущую схему выкладки AIWA. Он рассчитан на запуск
с чистого компьютера без Codex. Секреты здесь намеренно не указаны.

## Где что работает

- **staging**: выделенный сервер `104.168.54.167`, systemd unit
  `aiwa-staging.service`, каталог `/srv/aiwa-staging`, отдельный тестовый
  Telegram-бот и отдельная SQLite. Подробности: `deploy/i167/README.md`.
- **production**: Railway, project `grateful-generosity`, environment
  `production`, service `worker`, одна реплика и Railway Volume в `/data`.
  База задаётся как `AIWA_DB=/data/aiwa.db`.
- Push в `main` автоматически запускает production deploy из GitHub. Само
  слияние PR поэтому является началом релиза, а не только изменением кода.
- Нельзя одновременно запускать две копии с production `BOT_TOKEN`: Telegram
  long polling начнёт конфликтовать, а фоновые рассылки могут задвоиться.

`railway.json` хранит воспроизводимую часть production-конфигурации: команду
старта, startup-healthcheck и restart policy. Секреты, домен и Volume остаются
в Railway.

## Доступ с нового компьютера

Нужны Git, Python 3.12, [GitHub CLI](https://cli.github.com/) и
[Railway CLI](https://docs.railway.com/guides/cli).

```bash
gh auth login
railway login
git clone git@github.com:sboo-create/aiwa-bot.git
cd aiwa-bot
python3.12 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
python -m unittest discover -s tests -v
```

Для SSH/копирования файлов Railway нужен зарегистрированный публичный ключ:

```bash
railway ssh keys add --key "$HOME/.ssh/id_ed25519.pub" --name aiwa-operator
railway ssh keys list
```

После временной операции ключ следует удалить по показанному fingerprint:

```bash
railway ssh keys remove SHA256:REPLACE_WITH_FINGERPRINT
```

## Необходимые production-настройки

Проверять значения следует в Railway Variables, не копируя их в git или логи.

- `BOT_TOKEN`
- `AIWA_DB=/data/aiwa.db`
- `AIWA_TZ=Europe/Moscow`
- `AIWA_ADMIN`
- `AIWA_ANALYTICS_SALT`
- настройки выбранного LLM provider
- URL и ключ доставки продуктовой аналитики
- точные origins в `AIWA_ALLOWED_ORIGINS`
- `AIWA_TELEGRAM_API_ORIGIN` обычно не задаётся и использует
  `https://api.telegram.org`; разрешённый `:8443` нужен только изолированному
  staging-туннелю, где TLS всё равно проверяется для `api.telegram.org`

Обязательны Volume с mount path `/data`, одна реплика и публичный домен,
направленный на порт `8080`. Текущие идентификаторы можно получить так:

```bash
railway status \
  --project fc38314f-d9a4-4975-b5ec-e7ecd74a9271 \
  --environment production \
  --json
railway service list \
  --project fc38314f-d9a4-4975-b5ec-e7ecd74a9271 \
  --environment production \
  --json
```

## Порядок релиза

1. Убедиться, что PR не draft, синхронизирован с `main`, mergeable и все
   обязательные проверки зелёные. Deep review запускается только отдельной
   меткой и не является частью обычного релиза.
2. Проверить на staging тот же commit SHA: запуск, `/health`, Telegram text,
   voice/photo, Mini App, профиль, дневник по датам, фоновые задачи и
   доставку аналитики. Нагрузочный тест повторяется только после
   архитектурных/конкурентных изменений, а не перед каждым релизом.
3. Поставить аннотированный git tag на текущий production SHA и сделать
   консистентную SQLite-копию по инструкции ниже.
4. Слить PR с защитой от подмены head SHA:

   ```bash
   gh pr checks PR_NUMBER --watch
   gh pr merge PR_NUMBER --merge --match-head-commit EXPECTED_HEAD_SHA
   ```

5. Следить одновременно за GitHub CI и Railway:

   ```bash
   gh run list --branch main --limit 5
   railway deployment list \
     --project fc38314f-d9a4-4975-b5ec-e7ecd74a9271 \
     --environment production \
     --service fea631f4-b270-4850-a89f-8826ce59afd9
   railway logs \
     --project fc38314f-d9a4-4975-b5ec-e7ecd74a9271 \
     --environment production \
     --service fea631f4-b270-4850-a89f-8826ce59afd9
   curl --fail --show-error \
     https://worker-production-505e.up.railway.app/health
   ```

6. Не считать релиз завершённым только по HTTP 200. Проверить в логах:
   единственный Telegram poller, запуск планировщиков, отсутствие traceback,
   живой event writer, доставку traction outbox и отсутствие повторяющихся
   ошибок LLM/Telegram/SQLite.
7. Провести smoke-test реальным production-ботом: текст и одна кнопка,
   открытие трёх экранов Mini App, переключение даты. Не отправлять
   искусственную массовую рассылку.

Railway healthcheck является startup-gate: новая версия получает трафик только
после `200` от `/health`. У сервиса с подключённым Volume старая и новая
реплики не могут работать параллельно, поэтому при переключении возможна
короткая пауза.

## Консистентная копия SQLite

Нельзя копировать живой `aiwa.db` обычным `cp`: WAL может сделать копию
несогласованной. Создавать snapshot следует SQLite Backup API внутри
production-контейнера.

Сначала из `railway status --json` взять active deployment instance id и
подставить его в команду:

```bash
railway ssh \
  --project fc38314f-d9a4-4975-b5ec-e7ecd74a9271 \
  --environment production \
  --service fea631f4-b270-4850-a89f-8826ce59afd9 \
  --deployment-instance DEPLOYMENT_INSTANCE_ID \
  "python -c 'import sqlite3; s=sqlite3.connect(\"/data/aiwa.db\"); d=sqlite3.connect(\"/data/backups/pre-release.db\"); s.backup(d); print(d.execute(\"pragma integrity_check\").fetchone()[0]); d.close(); s.close()'"
```

Скачать snapshot и сверить SHA-256:

```bash
mkdir -p "$HOME/aiwa-prod-backups"
railway service files \
  --project fc38314f-d9a4-4975-b5ec-e7ecd74a9271 \
  --environment production \
  --service fea631f4-b270-4850-a89f-8826ce59afd9 \
  download /data/backups/pre-release.db \
  "$HOME/aiwa-prod-backups/pre-release.db" --json
shasum -a 256 "$HOME/aiwa-prod-backups/pre-release.db"
```

Для каждого релиза использовать уникальное имя с датой и коротким SHA.
Snapshot хранить на Volume и вне Railway до завершения окна наблюдения.

## Откат

### Только код — основной и наиболее безопасный вариант

Схема SQLite меняется только обратно совместимыми миграциями, поэтому сначала
откатывается код, а база остаётся на месте. Это сохраняет данные, появившиеся
после релиза.

```bash
git fetch origin --tags
git switch -c rollback/RELEASE_DATE origin/main
git revert -m 1 MERGE_COMMIT_SHA
git push -u origin rollback/RELEASE_DATE
gh pr create --base main --head rollback/RELEASE_DATE \
  --title "rollback: production release RELEASE_DATE" \
  --body "Rollback to TAG because: REASON"
gh pr checks --watch
gh pr merge --merge
```

Если релиз был squash/rebase, убрать `-m 1` и revert-нуть соответствующий
commit. Не делать force-push в `main`.

### Восстановление базы — только при подтверждённом повреждении данных

Восстановление snapshot удаляет все записи после точки копии, поэтому это
отдельное аварийное решение. Перед ним:

1. Остановить production service (scale текущего региона до `0`).
2. Сделать ещё одну аварийную копию текущего файла.
3. Загрузить проверенный snapshot под временным именем.
4. Переименовать текущую БД в `aiwa.db.failed-TIMESTAMP`, затем snapshot в
   `/data/aiwa.db`.
5. Вернуть одну реплику, дождаться `/health`, проверить Telegram, очереди и
   агрегаты статистики.

Операцию выполняют два человека с зафиксированными SHA-256 обеих копий.
Нельзя восстанавливать БД только потому, что откатывается код.

## Что проверить после большого релиза

- `pragma integrity_check` возвращает `ok`;
- количество users/meals/workouts/events не уменьшилось;
- `traction_outbox` не растёт и доставленные события появляются в статистике;
- event writer жив, `event_writer_failures` и `event_writer_dropped` равны нулю;
- cron-сводки и proactive jobs созданы один раз и отправляются один раз;
- нет `Conflict: terminated by other getUpdates request`;
- Mini App отдаёт актуальный asset version, а не закэшированный HTML/JS.

Фактическая точка каждого большого релиза записывается отдельным файлом в
`docs/releases/`.
