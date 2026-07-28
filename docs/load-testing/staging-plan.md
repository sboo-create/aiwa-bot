# План нагрузочного тестирования AIWA staging

Дата подготовки: 2026-07-28  
Цель: определить безопасную ёмкость текущей SQLite-архитектуры и понять, что
ограничит одновременную работу 1 000 пользователей.

## 1. Зафиксированный стенд

- Primary target: `i167`, `/srv/aiwa-staging`
- URL: `https://aiwa-staging-167.158-160-163-167.sslip.io`
- systemd services: `aiwa-staging`, `aiwa-litellm-tunnel`
- Release: `/srv/aiwa-staging/releases/2457f6f82fb2-i167-3`
- Git SHA: `2457f6f82fb2dc170a931c2d57823f3efab713c5`
- App version: `2026-07-27-v146-summary-dedup-i167-staging`
- Архитектура: один Python-процесс (Telegram polling + aiohttp API + scheduler),
  SQLite в WAL-режиме в `/srv/aiwa-staging/data`.
- Limits: 2 vCPU, 4 GiB RAM, 512 tasks, 65 536 file descriptors.
- Load generator: `8gpu-008`,
  `/home/jovyan/mprekunchak/aiwa-load-tests`.
- PostgreSQL и Redis в этом тесте не используются.
- Test bot: `@rrr_rrr_rrr_bot`; production использует другого бота.
- Railway `worker-staging` сохранён как rollback, использует другой bot token и
  scaled to zero (`Service temporarily offline`); volume не удалён.
- Railway deployment `0857c59a-7358-4804-8bd7-405ff6356932` с исходным SHA
  остаётся доступным до отдельного решения об отключении.

## 2. Решение, которое должен поддержать тест

Для каждого уровня нагрузки нужно ответить:

1. Обслуживает ли система запросы в заданных SLO без ошибок и деградации?
2. Что насыщается первым: HTTP/event loop, SQLite, CPU/RAM, сеть, thread pool,
   LLM semaphore или внешний провайдер?
3. Какой максимальный уровень проходит устойчиво и с запасом 20%?
4. Что нужно изменить, чтобы безопасно принять 1 000 пользователей одновременно?

«Сервис не упал» не считается прохождением теста.

## 3. Что обязательно сделать до подачи нагрузки

1. Сделать backup staging SQLite и проверить, что volume не production.
2. Убедиться, что за 5 минут нет:
   - Telegram `getUpdates Conflict`;
   - рестартов контейнера;
   - фоновой рассылки тестовым пользователям;
   - ошибок `database is locked`.
3. Настроить Railway healthcheck `/health`. Сейчас endpoint существует, но
   healthcheck в Railway не задан.
4. Создать 300 синтетических staging-пользователей с отдельным диапазоном
   Telegram id. Не использовать данные реальных пользователей.
5. Подготовить очистку синтетических данных после теста.
6. Реальные AI-вызовы обязательны для integrated-сценария. Поскольку
   OpenRouter, Groq и Salute credentials совпадают с production, начинать с
   ограниченной AI-доли на 10 VU и отдельно учитывать calls, tokens, cost,
   provider latency, 429 и 5xx. Повышать AI concurrency только при отсутствии
   влияния на production-квоты.
7. Зафиксировать фоновые значения за 10 минут: CPU, RAM, HTTP latency/error rate,
   network, volume size, LLM calls/errors/queue.

### Уже обнаруженные preflight-проблемы

Исправить до подачи нагрузки:

1. **Старый Railway staging Telegram polling конфликтовал со вторым
   процессом.** Для i167 выбран новый отдельный бот `@rrr_rrr_rrr_bot`; его
   polling работает без conflict. Перед каждым прогоном всё равно требуется
   чистое окно логов не менее 5 минут.
2. **Ключи AI/voice-провайдеров общие с production.** Telegram-боты и volumes
   разделены, но OpenRouter, Groq и Salute credentials совпадают. Реальные
   вызовы разрешены только отдельным integrated-сценарием с лимитом concurrency,
   наблюдением за 429/5xx, tokens/cost и немедленной остановкой при влиянии на
   production-квоты.
3. **Railway healthcheck не был настроен.** На i167 readiness проверяется через
   публичный и локальный `/health`, а systemd фиксирует restarts и memory peak.
   Во время теста нужен отдельный непрерывный health probe.
4. **Текущий `main` не проходит весь unit test suite.** Из 146 тестов падают два:
   проверка kcal тренировки и текст времени утренней сводки. Это не доказанный
   performance-блокер, но baseline должен быть либо исправлен, либо эти
   расхождения должны быть явно приняты до теста.
5. **Нет зафиксированного backup/cleanup synthetic data.** Нужны backup SQLite,
   проверка `PRAGMA integrity_check`, отдельный диапазон test user ids и
   повторяемая очистка.
6. **Shared LiteLLM работает на малом хосте.** На момент preflight у `196` было
   около 220 MiB available RAM из 3.3 GiB и 1.6 GiB занятого swap. OOM за
   последние 7 дней не найден, но integrated-тест начинается только с AI
   concurrency 2 и мониторингом RAM/swap/429/5xx. Сам restricted SSH tunnel
   изолирован и может открыть только `127.0.0.1:4000`; риск создаёт именно
   реальный AI-трафик.

Не исправлять до первого baseline, но измерять как главные гипотезы:

1. Один Python-процесс совмещает Telegram polling, HTTP API, scheduler и отдачу
   static assets; attached volume не позволяет просто увеличить replicas.
2. Синхронные SQLite-операции выполняются внутри async HTTP handlers. Несколько
   write-путей используют `BEGIN IMMEDIATE`, а `db()` выполняет schema setup при
   каждом новом соединении.
3. `/api/data` выполняет не только чтение: обновляет пользователя и пишет
   analytics events. Поэтому массовый cold open создаёт конкурирующие SQLite
   writes.
4. `webapp2` занимает около 43 MB и содержит 547 файлов, а CDN caching не
   включён. Static-трафик конкурирует с API и ботом в одном процессе.
5. LLM ограничен semaphore по умолчанию на 10 запросов и общим thread pool на
   32 потока; при пике ожидается очередь даже при низком CPU.
6. Upload limit равен 20 MB, поэтому одновременные photo/voice uploads могут
   насытить RAM и сеть раньше обычных API-запросов.

Принцип: сначала устранить проблемы безопасности и валидности стенда, затем
снять baseline текущей архитектуры без преждевременного перехода на PostgreSQL,
CDN или несколько сервисов. Архитектурные изменения выбирать по измеренному
bottleneck.

## 4. Модель нагрузки

Тест состоит из независимых сценариев. Их нельзя смешивать в один прогон до
получения отдельных базовых результатов.

### A. Cold open мини-приложения

Пользователи почти одновременно открывают приложение:

- `GET /`;
- критические JS/CSS/assets;
- `POST /api/data`.

Отдельно проверить холодный кэш и повторное открытие с кэшем клиента. Это важно,
потому что `webapp2` содержит 547 файлов и занимает около 43 MB, CDN caching
сейчас не включён.

### B. Обычная сессия без AI

Реалистичная смесь запросов после открытия:

- 45% `/api/data`;
- 15% `/api/diary`;
- 10% `/api/train` и `/api/train_day`;
- 10% `/api/log_history`;
- 10% `/api/checkin` (write);
- 5% `/api/track` (write);
- 5% `/api/prefs`, `/api/settime` и другие небольшие writes.

Think time: случайно 2–6 секунд. Каждый virtual user использует отдельного
синтетического пользователя.

### C. SQLite write contention

Одновременные записи в `/api/checkin`, `/api/food_manual`, `/api/workout` и
`/api/track`. Цель — найти границу появления lock waits, 5xx и роста p99.

### D. AI-трафик

Два отдельных варианта:

1. Infrastructure-only: LLM stub с контролируемой задержкой 1–3 секунды для
   проверки очередей приложения без влияния внешнего провайдера.
2. Integrated: реальные провайдеры на текущих общих credentials с отдельным
   лимитом одновременных AI-запросов. Начать с 2, затем 5, 10 и 20. Следующую
   ступень разрешать только при отсутствии 429/5xx и влияния на production.

Реалистичная смесь integrated-теста:

- 90% обычные запросы;
- 8% `/api/chat` или `/api/section`;
- 1% `/api/food_text`;
- 1% voice/photo, только после отдельного согласования бюджета.

Нельзя отправлять 300 одновременных реальных LLM/photo/voice запросов: это
проверит тариф и rate limits провайдера, а не архитектуру AIWA. При этом
реальные AI-вызовы должны присутствовать на каждой integrated-ступени.

В отчёте разделять:

- `core`: non-AI routes, SQLite и event loop;
- `ai_queue`: ожидание semaphore/executor внутри AIWA;
- `provider`: внешний latency, 429/5xx/timeouts, tokens и cost;
- `ai_e2e`: полный пользовательский latency.

Provider latency не ухудшает core SLO, но `ai_queue` относится к архитектуре
AIWA и учитывается как её bottleneck.

### E. Синхронный burst

Все пользователи начинают cold open в окне 5 секунд. Это модель события, когда
ссылка или QR-код показывается всей аудитории одновременно.

### F. Утренняя рассылка

Отдельный controlled test с синтетическими получателями и Telegram/LLM stub:
подготовка сводок, очередь `BCAST_Q`, скорость отправки и восстановление после
ошибки. Не смешивать с HTTP-тестом.

## 5. Ступени

На каждой ступени:

| Этап | Virtual users | Ramp | Hold | Назначение |
|---|---:|---:|---:|---|
| Smoke | 10 | 30 sec | 3 min | Проверка сценария и данных |
| Small | 50 | 1 min | 5 min | Первая оценка нелинейности |
| Medium | 100 | 2 min | 7 min | Проверка SQLite и event loop |
| Target-1 | 300 | 3 min | 10 min | Основной согласованный пик |
| Target-2 | 500 | 5 min | 10 min | Только после успешных 300 |
| Event goal | 1 000 | 10 min | 15 min | Только после анализа и исправлений |

После каждой ступени — 3 минуты cooldown. Переход на следующую ступень разрешён
только при выполнении stop/go критериев.

Для 100, 300 и 1 000 пользователей дополнительно выполнить 30-секундный burst.

## 6. Метрики и определения

### Пользовательский результат

- success rate = успешные бизнес-ответы / все завершённые итерации;
- HTTP 2xx/4xx/5xx и timeout rate;
- latency p50/p90/p95/p99/max по каждому route и сценарию;
- achieved RPS и completed iterations/sec;
- доля пользователей, завершивших сценарий целиком;
- деградация p95 относительно 10 VU.

### Насыщение сервиса

- CPU average/max и время выше 85%;
- RAM average/max, рост во время hold и возврат после cooldown;
- ingress/egress и размер cold-open ответа;
- container restarts и `/health` availability;
- `/health` p99 под нагрузкой как внешний proxy event-loop lag;
- число active/in-flight запросов, если будет добавлена временная телеметрия.

### SQLite

- число `database is locked` и `OperationalError`;
- latency write routes p95/p99;
- доля write 5xx/timeouts;
- размеры `aiwa.db`, `aiwa.db-wal`, `aiwa.db-shm` до/после;
- время checkpoint и восстановление WAL после cooldown;
- скорость роста таблиц `events`, `events_v2`, `chat_log`.

### LLM и очереди

Из существующего `LOAD/60s`:

- `llm_calls`;
- `avg_ms`;
- `wait_ms`;
- `queued / llm_calls`;
- `err / llm_calls`;
- `bcast_q`.

Дополнительно:

- HTTP 429/5xx/timeouts по провайдеру;
- стоимость и tokens/request;
- executor saturation;
- время ответа без provider time отдельно от provider time.

Перед и после каждого эксперимента сохранять target snapshot. Разница должна
содержать calls, input/output/cached/total tokens, `reported_cost_usd` и
`calls_without_cost`. Если хотя бы один новый вызов не вернул стоимость,
стоимость эксперимента помечается incomplete, а отсутствующее значение не
считается нулём.

## 7. Stop/go критерии

Ступень считается пройденной, если весь hold:

- health availability = 100%;
- container restarts = 0;
- non-AI HTTP error rate < 1%;
- non-AI 5xx rate < 0.2%;
- timeout rate < 0.1%;
- read routes: p95 <= 1 s, p99 <= 2 s;
- write routes: p95 <= 1.5 s, p99 <= 3 s;
- p95 не вырос более чем в 2 раза относительно 10 VU;
- `database is locked` = 0;
- CPU не выше 85% дольше 3 минут;
- RAM не выше 80% и нет монотонного роста больше 15% за hold;
- очередь broadcast не растёт после завершения нагрузки;
- для integrated AI: error rate < 5%, p95 queue wait <= 5 s,
  p95 end-to-end <= 20 s, p99 <= 45 s.

Немедленно остановить ступень при:

- health 503/timeout более 30 секунд;
- рестарте контейнера;
- росте 5xx выше 2% две минуты подряд;
- ошибках SQLite или потере/повреждении данных;
- rate limit, способном повлиять на production credentials;
- отправке сообщений реальным пользователям.

## 8. Диагностическая матрица

| Симптом | Вероятное узкое место |
|---|---|
| CPU высокий, все routes замедляются | Python/event loop, изображения, static assets |
| CPU низкий, health и writes замедляются, есть locks | Синхронный SQLite в event loop |
| CPU низкий, только AI медленный, растёт `queued` | LLM semaphore/thread pool/provider |
| Cold open медленный, API стабилен, высокий egress | 43 MB assets, нет CDN/cache |
| RAM растёт и не возвращается | in-memory caches/tasks/media buffers |
| 429/5xx только на AI/voice/photo | Квота внешнего провайдера |
| `getUpdates Conflict` | Два poller-процесса для одного staging-бота |
| 5xx растёт без CPU/RAM saturation | Исключения приложения или DB contention |

## 9. Артефакты каждого прогона

Сохранять в timestamped каталоге:

- manifest: SHA, deployment id, Railway environment/service, сценарий и параметры;
- raw client metrics;
- агрегаты по route и уровню нагрузки;
- Railway resource/HTTP metrics в JSON;
- HTTP/application logs за точное окно теста;
- SQLite размеры и проверку целостности до/после;
- вывод с решением pass/fail и подтверждённым bottleneck.

Итогом должен быть не один график, а таблица ёмкости по сценариям и
приоритизированный план исправлений с ожидаемым эффектом.

## 10. Вариант дешёвого staging-клона на i167

### Вывод

`i167` подходит для предварительных нагрузочных прогонов, но не должен
автоматически считаться эквивалентом Railway:

- 4 vCPU AMD EPYC Genoa;
- 15 GiB RAM, на момент проверки доступно около 12 GiB;
- 101 GiB свободного места на ext4;
- фоновая загрузка CPU в момент проверки около 0–3%;
- Caddy уже занимает 80/443 и обслуживает другие сайты;
- на сервере работают gateway, analytics, stats и другие сервисы;
- прямой доступ к `api.telegram.org:443` заблокирован, но существует рабочий
  SSH tunnel через отдельный relay;
- Docker и Docker Compose установлены, активных Docker-контейнеров на момент
  проверки нет.

Ступени 10/50/100/300 VU можно проводить на этом сервере после изоляции.
Ступени 500/1 000 VU разрешать только после успешных 300 VU, с наблюдением за
всем хостом и в согласованное окно. Иначе тест может замедлить соседние сервисы,
а первым bottleneck окажется общий 4-vCPU сервер, а не AIWA.

### Безопасная схема

Не делать обычный mutable `git clone` в рабочий каталог. Разворачивать exact
release:

1. Локально собрать архив только из Git SHA, выбранного для теста.
2. Загрузить его в новый каталог
   `/srv/aiwa-staging/releases/<full-git-sha>`.
3. Данные хранить отдельно в `/srv/aiwa-staging/data`, backup — в
   `/srv/aiwa-staging/backups`, secrets — вне release с правами `0600`.
4. Переключать `/srv/aiwa-staging/current` только после smoke-проверки.
5. Запускать AIWA в отдельном Docker Compose project, не в namespace уже
   работающих сервисов.
6. Публиковать приложение только на `127.0.0.1:9910`; наружу отдавать через
   отдельный небольшой Caddy site block с HTTPS.
7. Для Telegram использовать изолированный relay-sidecar в Docker network.
   Не менять общесерверный DNS, `/etc/hosts`, firewall или существующий
   `gigatool-tg-tunnel`.
8. Монтировать SQLite volume только в AIWA container. Не использовать каталоги
   существующего `stats-aiwa`.

Начальные защитные лимиты контейнера:

- CPU limit: 2 vCPU;
- memory limit: 4 GiB;
- process/pid limit;
- restart policy с ограничением частоты;
- log rotation;
- bind только на loopback;
- отдельные labels/project name.

Такие лимиты подходят для безопасных прогонов до 300 VU, но результат нужно
трактовать как ёмкость в пределах 2 vCPU. Для оценки полной ёмкости AIWA можно
временно поднять лимит до 3 vCPU в согласованное окно, оставив запас соседним
сервисам.

### Telegram и переключение с Railway

Нельзя одновременно запускать Railway и i167 с одним `BOT_TOKEN`: это создаст
ещё один `getUpdates Conflict`. Безопасный порядок:

1. Подготовить release, data, HTTPS и контейнеры на i167, но AIWA polling не
   запускать.
2. Сделать backup Railway staging SQLite и проверить его integrity.
3. Лучше перевыпустить токен staging-бота, поскольку неизвестный второй poller
   уже существует.
4. Остановить Railway `worker-staging`, не удаляя service/volume.
5. Подождать не менее 60 секунд и убедиться, что старый poller завершён.
6. Запустить AIWA на i167 и проверить `/health`, `/`, WebApp и Telegram.
7. Только после 5 минут чистых логов менять staging WebApp URL и начинать тест.

AI/voice/photo providers должны иметь отдельные staging credentials независимо
от места запуска.

### HTTPS

Предпочтительно создать отдельную DNS-запись на `158.160.163.167`. Для
временного технического стенда DNS `sslip.io` и `nip.io` уже разрешается в этот
IP, но такой домен следует считать временным и публичным. Перед Caddy reload
обязательны:

- backup текущего Caddyfile;
- отдельный imported snippet;
- `caddy validate`;
- reload, не restart;
- smoke-check всех существующих публичных routes.

### Rollback и экономия

Railway staging сначала остановить/scale-to-zero, но не удалять. Это сохраняет
быстрый rollback:

1. остановить AIWA container на i167;
2. вернуть прежний staging WebApp URL;
3. запустить сохранённый Railway deployment;
4. проверить, что polling выполняет ровно один процесс.

Удалять Railway staging service или volume можно только после успешного
проведения тестов и отдельного решения. Генератор нагрузки должен работать не
на i167, иначе его CPU и network будут конкурировать с тестируемым приложением.
