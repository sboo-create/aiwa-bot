# План подготовки AIWA к нагрузке до 1000 одновременных открытий

Основание: HTTP/SQLite load test на i167 и отдельный capacity test маршрута
`LiteLLM i196 → OpenRouter → deepseek-v4-flash` от 2026-07-28.

## Цель

Текущая версия без PostgreSQL должна:

- принять все 1000 задач `today_note` в durable queue;
- сразу продолжить обслуживать обычные экраны и `/health`;
- не создавать дубликаты генераций при повторных открытиях;
- сохранить очередь и результаты при рестарте;
- обработать очередь с контролируемой стоимостью и понятным ETA;
- не повлиять на другие сервисы и пользователей общего LiteLLM на i196.

PostgreSQL и горизонтальное масштабирование не входят в критический путь.
Сначала исправляется однопроцессная SQLite-архитектура; для текущего события
ресурсов i167 достаточно.

## Порядок реализации

### Этап 1. Убрать SQLite из критического пути

Что меняется:

1. Schema migration, `CREATE TABLE`, `ALTER TABLE`, PRAGMA и создание индексов
   выполняются один раз на startup/deploy, а не внутри каждого `db()`.
2. `db()` становится дешёвым открытием уже подготовленного соединения.
3. Blocking SQLite-вызовы HTTP handlers переносятся из asyncio event loop.
4. Продуктовые записи пользователя остаются приоритетными и транзакционными.
5. Для аналитики создаётся один writer с batch до 100 событий и flush каждые
   250 мс.

Проверки:

- unit test подтверждает, что request не выполняет DDL;
- `writes-100`: HTTP success 100%, p95 ≤ 500 мс, `/health` без timeout;
- SQLite integrity check проходит;
- WAL не растёт без ограничения после завершения ступени.

### Этап 2. Полностью перейти на `events_v2`

Порядок:

1. Перевести отчёты, счётчики и admin-аналитику на `events_v2`.
2. Проверить паритет обязательных метрик на одном staging-прогоне.
3. Остановить все `INSERT` в legacy `events`.
4. Оставить legacy-таблицу временно только для чтения/отката.
5. Удаление старой таблицы вынести в отдельную будущую миграцию.

Критерии:

- один пользовательский action создаёт ровно одну аналитическую запись;
- расхождение обязательных счётчиков до переключения ≤ 0,5%;
- после переключения число новых строк в legacy `events` равно нулю;
- ошибки аналитики не ломают продуктовый запрос.

### Этап 3. Durable AI queue без PostgreSQL

Добавляется таблица `ai_jobs`:

- `job_id`, `user_key`, `kind`, `dedupe_key`, `priority`;
- `queued/running/completed/failed`;
- `created_at`, `started_at`, `finished_at`, `available_at`, `expires_at`;
- `attempts`, `last_error_class`;
- context snapshot/hash, result reference, token usage и cost.

Правила:

1. `dedupe_key` для сводки: пользователь + дата + тип + версия контекста.
2. Повторное открытие возвращает существующий job, а не создаёт новый.
3. При рестарте незавершённые `running` jobs возвращаются в `queued`.
4. Устаревшие jobs не теряются молча: они помечаются `superseded/expired`.
5. Активная очередь ограничена 1500 задачами: это принимает все 1000
   event-задач с запасом 50%, но не позволяет бесконечно накапливать дорогую
   работу. Завершённые строки остаются для аудита и могут очищаться отдельно.
6. Worker pool ограничивает именно исполнение, а не приём:
   - общий AI concurrency: 8;
   - chat reserved: 2;
   - background `today_note`: до 6;
   - низкий приоритет: prewarm меню, рецепты и другие фоновые задачи.

Критерии:

- 1000 одновременных enqueue дают 1000 accepted и 1000 уникальных jobs;
- 10 повторных открытий одного пользователя дают один job;
- после принудительного рестарта очередь продолжает обработку;
- chat начинает исполнение не позднее 5 секунд даже при backlog `today_note`.

### Этап 4. Асинхронный `today_note`

Текущий fire-and-forget `_prewarm_today()` из `/api/data` удаляется.

Новый контракт:

1. `/api/data` возвращает только данные приложения и не вызывает LLM.
2. `/api/today`:
   - возвращает готовый дневной кэш, если он есть;
   - иначе атомарно enqueue/dedupe job;
   - сразу возвращает fallback, `job_id`, статус, позицию и ETA.
3. Mini App опрашивает job status с backoff либо получает результат при
   следующем открытии.
4. Готовый результат сохраняется в дневной кэш и переживает рестарт.
5. До мероприятия разрешён scheduled prewarm, который начинает наполнять
   очередь за 20–25 минут до ожидаемого массового открытия.

Критерии:

- p95 ответа `/api/today` без готового кэша ≤ 300 мс;
- HTTP-соединение никогда не ждёт модель 30–60 секунд;
- fallback доступен при любом состоянии OpenRouter;
- один пользователь не видит результат другого пользователя;
- ETA считается по rolling throughput и позиции, а не по константе.

### Этап 5. Отдельное обсуждение модели и маршрутизации

Из результатов capacity test:

- sustained concurrency 8: 40/40, 1,05 `today_note`/с, p95 10 секунд;
- concurrency 12: 24/24, но без достаточного запаса;
- concurrency 16: 22/24, два пустых HTTP 200 после 600 reasoning tokens.

До завершения этапов 1–4 модель не меняется: `today_note` продолжает работать
через текущую `openrouter/deepseek/deepseek-v4-flash`.

На этапе 5 сначала готовится отдельное сравнение вариантов:

1. оставить текущую модель и изменить token/reasoning budget;
2. оставить текущую модель, но изменить правила выбора upstream;
3. рассмотреть отдельную быструю модель только для `today_note`;
4. сравнить качество, latency, успешность и стоимость на одинаковом наборе
   запросов.

После сравнения результаты отдельно обсуждаются. Никакая модель, provider route
или task profile не переключается без явного решения.

Нейтральные доработки надёжности, не меняющие выбранную LLM:

1. Валидировать непустой текст и JSON-схему; HTTP 200 с пустым result считается
   provider failure.
2. До двух retry выполняются через ту же текущую модель; OpenRouter может
   выбрать другой совместимый upstream.
3. Circuit breaker временно приостанавливает проблемный маршрут после повторных
   429/5xx/timeout/empty response, не подменяя модель автоматически.
4. Получить отдельный LiteLLM virtual key для staging/AIWA и передавать
   `run_id`, task type и deployment tag для точной стоимости.

Критерии:

- eventual success после retry ≥ 99%;
- доля пустых финальных результатов < 0,5%;
- provider error rate до retry ≤ 2%;
- `today_note` p95 ≤ 15 секунд при concurrency 8;
- реальный throughput ≥ 0,8 результата/с.

### Этап 6. Метрики и эксплуатационные лимиты

Три главных KPI:

1. **Core availability/latency**  
   Success обычных экранов ≥ 99,9%, p95 ≤ 500 мс при массовой AI-очереди.
2. **Queue completion**  
   100% задач принято; ≥ 99% завершено успешно после retry; очередь из 1000
   сводок drained ≤ 25 минут.
3. **User-visible AI latency**  
   enqueue/fallback p95 ≤ 300 мс; фактический completion p95 и ETA показываются
   отдельно.

Диагностические метрики:

- queue depth по типу/приоритету;
- age oldest queued job;
- accepted/running/completed/failed/superseded;
- dedupe hit rate;
- throughput за rolling 1/5 минут;
- wait time и execution time отдельно;
- provider/model/status/tokens/cost;
- ETA prediction error.

Guardrails:

- `/health` success 100%, p95 ≤ 250 мс;
- LiteLLM readiness p95 ≤ 100 мс, рестарты = 0;
- warning при i196 MemAvailable < 250 МБ;
- stop при MemAvailable < 200 МБ или устойчивом росте swap-in/swap-out;
- warning при projected `today_note` cost > $0,25 на 1000;
- stop/manual review при projected cost > $0,50 на 1000;
- core-трафик и chat не теряют зарезервированную ёмкость из-за background queue.

### Этап 7. Повторный staging load test

Все тесты идут только на i167 и отдельном staging-боте. Production и данные
пользователей не затрагиваются.

Последовательность:

1. Unit/integration:
   - migration only on startup;
   - `events_v2` only;
   - dedupe;
   - restart recovery;
   - priority reservation;
   - fallback/job API;
   - cost persistence.
2. `core-100` и `writes-100`.
3. `core-300` и `writes-300`.
4. `cold-open-100` с настоящим AI queue.
5. `cold-open-300`.
6. `cold-open-1000`: все открываются сразу, AI execution остаётся ≤ 8.
7. Mixed test: backlog 1000 `today_note` + интерактивный chat.
8. После каждой ступени: SQLite snapshot, i167/i196 monitor, LiteLLM ledger,
   queue metrics и stop/go решение.

Финальный критерий готовности:

- 1000/1000 открытий обслужены;
- 1000/1000 AI-задач приняты без дубликатов;
- обычные экраны остаются в целевых latency/availability;
- chat reservation работает;
- очередь drained ≤ 25 минут;
- eventual AI success ≥ 99%;
- стоимость подтверждена ledger и укладывается в установленный бюджет;
- на i167/i196 нет OOM, restart или устойчивого swap pressure.

## Rollout и откат

Эксплуатационные лимиты задаются окружением:

- `AIWA_LLM_CONCURRENCY=8`;
- `AIWA_TODAY_CONCURRENCY=6` — тем самым минимум два общих слота остаются чату;
- `AIWA_TODAY_QUEUE_MAX=1500`;
- `AIWA_ALERT_TODAY_Q=1200`.

После stop-guard на реальном `cold-open-100` staging временно работает с
`AIWA_TODAY_CONCURRENCY=2`. Возврат к 6 допускается только после решения
этапа 5: текущий shared LiteLLM на i196 ушёл в swap, а OpenRouter upstream
Novita дал массовые пустые ответы.

Порядок rollout:

1. i167 staging;
2. тестовые chat id;
3. небольшой production canary;
4. все пользователи после проверки метрик.

Откат выполняется переключением symlink на предыдущий release. Миграции
остаются backward-compatible, legacy `events` не удаляется в этом релизе.

## Критический путь перед мероприятием

Обязательно:

1. этапы 1–4;
2. лимиты 8/2/6;
3. обработка empty response повтором текущей модели;
4. метрики очереди и стоимости;
5. staging-тест 100/300/1000.

Можно отложить:

- отдельный worker service;
- PostgreSQL/Redis;
- удаление legacy `events`;
- выбор другой модели или окончательный provider allowlist;
- полноценный dashboard, если основные метрики доступны в отчёте и логах.
