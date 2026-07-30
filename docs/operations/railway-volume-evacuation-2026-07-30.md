# AIWA: эвакуация старых Railway backup на i167

Дата: 2026-07-30, `Europe/Moscow`.

Статус: копирование и проверка завершены; удаление исходных старых файлов на
Railway ожидает ручного запуска владельцем. Production-код, live SQLite,
food-assets и процессы не переключались и не перезапускались.

## Зачем это сделано

Production volume Railway имеет размер около 434 MiB и был заполнен на 81%:

```text
/data:         341 MiB used, 84 MiB available
/data/backups: 293 MiB
/data/aiwa.db:  45 MiB
/data/food-assets: 2.9 MiB
```

Динамические assets и live DB не переносились из request path: они нужны
работающему production, а потенциальная экономия на assets составляет только
2.9 MiB. На i167 скопированы старые offline snapshots и approved-food archive.

## Куда скопировано

```text
i167:/srv/aiwa-migration-prep/production-backups/2026-07-30
```

Права:

```text
root:root
directory 0700
files     0600
```

На i167 было около 93 GiB свободного места. Этот каталог не обслуживается
Caddy, не используется staging и не входит в runtime AIWA.

## Доказательство целостности

SHA-256 каждого файла совпал на трёх сторонах:

1. `/data/backups` Railway;
2. временная локальная выгрузка;
3. защищённый каталог i167.

| Файл | Размер, bytes | SHA-256 |
|---|---:|---|
| `aiwa-before-analytics-legacy-20260723.db` | 6,156,288 | `e8118a93e5fe9da9c8b8b7cf1c6b11d7fb7988cff58fe74d290d88d1bcba046b` |
| `aiwa-pre-food-backfill-20260729T115134Z.db` | 45,182,976 | `02b69b535d56830f8fe29eaea79ce406fb2d5f5d8acdb1e86721bba38014af9a` |
| `pre-food-assets-1ad45a8-20260729.db` | 40,914,944 | `a2c77c5130c14d889f41b35443785d5570c58ebae98788dbc30a5d4b696a457f` |
| `pre-food-hardening-3d1055b-20260729.db` | 41,099,264 | `48f1a78a0685455d89f21d22f13abc42495a5c84664b787de675967f346adc46` |
| `pre-media-13fe278-20260730T0055MSK.db` | 46,891,008 | `82269c29e25e7eb6676b01e3175d15638801727c8f9d96bf0787d26c86e14829` |
| `pre-pr55-20260729-7537197.db` | 39,677,952 | `5e3426c15b89c4d20966960ef133b1fc389594421f264b12b6261564956b9c1a` |
| `pre-release-a629992-20260729T0200MSK.db` | 39,575,552 | `bda831b0f9ebd9bca702ee960daf9998bae40d259e4946d4281c0dfe930c07bc` |
| `pre-v179-b6fbd64-20260729T1600MSK.db` | 45,379,584 | `59a3fe4545b708cd9587b2c9f11ebc3165bae597add483707dc184d4dc46cf9a` |
| `aiwa-food-approved-20260729.tar.gz` | 1,624,401 | `d71a6de18c5eb83e8e82ee7ea50a1f7f90557fdd445a307f9d968272d6cff439` |

На i167 все восемь DB открыты как `mode=ro&immutable=1`; для каждой
`PRAGMA integrity_check` вернул `ok`. Контрольные количества `users`,
`meals`, `workouts`, `events` и `events_v2` совпали с read-only аудитом
Railway. `tar -tzf` прочитал все 298 записей approved-food archive.

Предупреждения `LIBARCHIVE.xattr.com.apple.provenance` относятся только к
неизвестному расширенному атрибуту macOS; содержимое архива читается, а его
SHA-256 совпадает на всех трёх сторонах.

## Что оставить на Railway

Обязательно оставить:

```text
/data/aiwa.db
/data/aiwa.db-wal
/data/aiwa.db-shm
/data/food-assets/
/data/backups/pre-media-13fe278-20260730T0055MSK.db
/data/backups/pre-media-13fe278-20260730T0055MSK.db-wal
/data/backups/pre-media-13fe278-20260730T0055MSK.db-shm
```

`pre-media-13fe278-20260730T0055MSK.db` — ближайшая offline rollback-точка,
поэтому она остаётся рядом с production до следующего подтверждённого backup.

## Ручное удаление старых копий с Railway

Railway CLI запрещает агентам удалять service files и 2026-07-30 остановил
операцию до первого файла. Владелец может выполнить следующий блок с любого
компьютера после `railway login`. Он удаляет только семь уже проверенных старых
DB, их пустые/служебные sidecar и offline tar; live DB и свежий pre-media
snapshot не входят в список.

```bash
project_id=fc38314f-d9a4-4975-b5ec-e7ecd74a9271
environment=production
service=worker

old_backups=(
  aiwa-before-analytics-legacy-20260723.db
  aiwa-pre-food-backfill-20260729T115134Z.db
  pre-food-assets-1ad45a8-20260729.db
  pre-food-hardening-3d1055b-20260729.db
  pre-pr55-20260729-7537197.db
  pre-release-a629992-20260729T0200MSK.db
  pre-v179-b6fbd64-20260729T1600MSK.db
)

for name in "${old_backups[@]}"; do
  railway service files \
    --project "$project_id" \
    --environment "$environment" \
    --service "$service" \
    delete "/data/backups/$name"
  railway service files \
    --project "$project_id" \
    --environment "$environment" \
    --service "$service" \
    delete "/data/backups/$name-shm"
  railway service files \
    --project "$project_id" \
    --environment "$environment" \
    --service "$service" \
    delete "/data/backups/$name-wal"
done

railway service files \
  --project "$project_id" \
  --environment "$environment" \
  --service "$service" \
  delete /data/backups/aiwa-food-approved-20260729.tar.gz
```

Не добавлять `--yes` при первом ручном запуске: Railway покажет каждый точный
target перед удалением. Ожидаемая экономия основных файлов — 259,610,961 bytes,
плюс около 224 KiB sidecar. Свободное место должно вырасти примерно с 84 MiB до
332 MiB.

## Проверка после ручного удаления

```bash
project_id=fc38314f-d9a4-4975-b5ec-e7ecd74a9271

railway ssh \
  --project "$project_id" \
  --environment production \
  --service worker \
  sh -lc '
    df -h /data
    du -sh /data/backups /data/food-assets /data/aiwa.db
    test -f /data/aiwa.db
    test -f /data/backups/pre-media-13fe278-20260730T0055MSK.db
  '

curl -fsS --max-time 15 \
  https://worker-production-505e.up.railway.app/health
```

Acceptance:

- `/data` имеет не менее 300 MiB свободного места;
- `pre-media-13fe278-20260730T0055MSK.db` остаётся на Railway;
- `/health` возвращает `status=ok`;
- `event_writer_alive=true`, очереди не растут, worker failures отсутствуют;
- production deployment не перезапускался из-за housekeeping.

До удаления health был `ok`, event queue и food asset queue были равны нулю,
writer был жив, generation worker — один.

## Что дальше

Копия на i167 снимает срочный риск переполнения, но не заменяет off-host
backup: i167 остаётся одним сервером. До production cutover нужно добавить
зашифрованный object storage с retention, checksum manifest и регулярным
restore test на disposable host.
