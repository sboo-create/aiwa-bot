# Локальный стенд, совместимый с Railway

`compose.yaml` поднимает тот же образ и те же process roles, которые описаны
в `deploy/railway/*.toml`:

- `api`: `python -m aiwa_service api`;
- `telegram`: `python -m aiwa_service telegram`;
- `worker`: `python -m aiwa_service worker`;
- `scheduler`: `python -m aiwa_service scheduler`;
- PostgreSQL 16 и Redis 7.

## Запуск

```bash
cp .env.example .env
# заполнить как минимум BOT_TOKEN и ключ выбранного LLM-провайдера
docker compose config
docker compose up -d --build --wait
docker compose ps
curl http://localhost:8080/health
```

Логи всех ролей:

```bash
docker compose logs -f api telegram worker scheduler
```

Перезапуск приложения без удаления данных:

```bash
docker compose restart api telegram worker scheduler
```

Полностью остановить или снова запустить стенд:

```bash
docker compose stop
docker compose start
```

Удалить контейнеры, сохранив PostgreSQL и Redis:

```bash
docker compose down
```

Тома удаляются только явной командой `docker compose down -v`.

## Перенос старой SQLite

Перед первым PostgreSQL-запуском можно перенести данные:

```bash
docker compose up -d postgres
DATABASE_URL=postgresql://aiwa:${AIWA_POSTGRES_PASSWORD:-aiwa_local}@localhost:5432/aiwa \
  python scripts/migrate_sqlite_to_postgres.py --sqlite aiwa.db
```

Скрипт идемпотентен: существующие строки пропускаются по primary/unique key.

## Соответствие Railway

Compose нужен только для локальной оркестрации. В Railway создаются PostgreSQL,
Redis и четыре сервиса из одного репозитория. Каждому сервису назначается
соответствующий `deploy/railway/<role>.toml`; `DATABASE_URL` и `REDIS_URL`
задаются ссылками на Railway-сервисы. Код, Dockerfile и команды запуска при
этом остаются теми же.

Worker потребляет Redis Stream `aiwa:jobs` через consumer group, подтверждает
сообщение только после успешной обработки и повторно забирает зависшие
сообщения через `XAUTOCLAIM`. Scheduler ставит персональные и глобальные
задания раз в минуту, используя Redis idempotency keys и minute-lock.
