# Гибридные картинки питания без влияния на скорость

## Контракт производительности

Запись еды и первый ответ Mini App никогда не ждут генерацию картинки,
скачивание, Pillow или дополнительный LLM-вызов. Быстрый путь:

1. нормализует название и проверяет immutable in-memory индекс из 105
   существующих картинок;
2. принимает только точное, явное alias- или консервативное
   anchor/containment-сопоставление;
3. сразу возвращает известную картинку, чашку для напитка или нейтральную
   заглушку;
4. при включённом генераторе делает только `put_nowait` канонической пары в
   ограниченную очередь.

Необработанный чат, профиль и история пользователя в генератор не попадают.
При заполненной очереди кандидат отбрасывается, а основной запрос завершается
обычно. Следующее открытие может предложить его ещё раз.

## Состояние и хранение

`food_assets` хранит единый asset на `(canonical_id, style_version)` со
статусами `pending`, `ready`, `rejected` и `retry_after`.
`food_asset_jobs` — durable deduplicated очередь с тем же уникальным ключом.
105 старых картинок регистрируются как `source=catalog` при идемпотентной
миграции.

Worker получает только проверенное короткое название блюда, просит provider
вернуть base64, проверяет размер и число пикселей, переводит результат в
512×512 WebP без метаданных и сохраняет под SHA-256 именем. URL immutable.
Ответные URL провайдера намеренно не скачиваются: это закрывает SSRF-класс
ошибок.

Production-каталог должен быть на Railway Volume:

```text
AIWA_FOOD_ASSET_DIR=/data/food-assets
AIWA_FOOD_ASSET_PUBLIC_BASE=/generated-food
```

При переходе на object storage `AIWA_FOOD_ASSET_PUBLIC_BASE` должен указывать
на immutable CDN URL, а storage adapter — публиковать тот же content hash.
До появления такого adapter безопасный production-вариант — Railway Volume.

## Защита от пика в 1000 пользователей

- `AIWA_SECTION_PENDING_MAX=96` ограничивает число холодных персональных
  section-задач в процессе. Сверх лимита пользователь сразу получает
  детерминированную секцию без retry-storm.
- Один menu-вызов возвращает `summary + menu + suggestions`; отдельный
  `food_suggestions` больше не нужен.
- Клиент повторяет food-section только по `refreshing=true`, максимум три раза,
  с server delay не меньше 5 секунд и случайным jitter до 2.5 секунд.
- Скрытая вкладка не делает повторный запрос.
- Image worker использует отдельный executor, по умолчанию один поток,
  отдельный daily cap и не занимает интерактивные LLM slots.
- `AIWA_FOOD_ASSET_GENERATION=0` полностью убирает generator workers и очередь
  из production-процесса.

## Флаги и мгновенный откат

| Флаг | Безопасное значение на пик | Что отключает |
|---|---:|---|
| `AIWA_FOOD_ASSET_RESOLVER` | `1` | `0` возвращает прежний client fallback |
| `AIWA_FOOD_SECTION_REFRESH` | `1` | `0` запрещает food polling |
| `AIWA_FOOD_DYNAMIC_SECTION` | `0` | `0` сохраняет текущий cache namespace и статичный card text |
| `AIWA_FOOD_DYNAMIC_SECTION_PERCENT` | `0` | стабильный canary-процент; boolean без процента ничего не включает |
| `AIWA_FOOD_ASSET_GENERATION` | `0` | `0` не запускает image workers |

Изменение любого флага требует обычного restart/deploy, но не миграции и не
отката данных. Новые таблицы обратно совместимы; старый код их игнорирует.

## Порядок rollout

### Важный день / до 1000 пользователей одновременно

1. Держать `GENERATION=0`, `DYNAMIC_SECTION=0`.
2. Можно включить `RESOLVER=1`: это in-memory операция и повторное использование
   уже доставляемых статических файлов.
3. Оставить `SECTION_REFRESH=1` только после нагрузочной проверки; при любом
   росте section pending/latency переключить в `0`.
4. Следить за `/health`: `section_pending`, `section_pending_limit`,
   `food_asset_queue`, `food_asset_workers`.

### После пика

1. На staging включить `DYNAMIC_SECTION=1`,
   `DYNAMIC_SECTION_PERCENT=100`, генератор ещё оставить `0`.
2. Проверить новый день/профиль, ограничения питания, male/non-cycle/cycle,
   fallback провайдера и отсутствие второго model call.
3. Включить staging generator с `WORKERS=1`, `DAILY_MAX=5`; проверить
   дедупликацию, retry, WebP, restart recovery и появление asset после
   повторного открытия без polling по картинке.
4. В production увеличивать stable cohort `1% → 5% → 25% → 100%`.
   Только новые когорты переходят с cache namespace v2 на v3, поэтому процент
   нельзя сразу менять на 100 во время пика. После суток стабильности —
   generator canary с `WORKERS=1`, `DAILY_MAX=10`.
5. Поднимать budget только по фактическим cache-hit, стоимости, reject-rate и
   latency; request latency не должна меняться.

## QA и критерии остановки

- 1000 параллельных fallback/asset-resolve операций не создают image jobs при
  выключенном generator.
- Section tasks никогда не превышают configured pending limit.
- Нет дополнительного provider call для suggestions.
- Две фразы одного канонического блюда создают максимум один job.
- Неизвестные «снеки» не получают чужую красивую картинку.
- Diary write успешен при provider timeout, bad base64, oversized image,
  заполненной очереди и read-only/недоступном asset storage.
- Restart подхватывает `ready` generated assets и `queued` jobs.
- В `/health` нет роста event writer failures/dropped, а chat/diary p95 не
  ухудшается более чем на 10% от baseline.

Если p95 ухудшается более чем на 10%, появляются SQLite lock errors или
`section_pending` держится у лимита дольше пяти минут, сначала выключаются
`AIWA_FOOD_ASSET_GENERATION` и `AIWA_FOOD_SECTION_REFRESH`. Откат кода для этого
не нужен.

## Отдельное расширение готового каталога

После стабилизации релиза каталог следует расширять не случайной массовой
генерацией, а по фактическому recall:

1. считать только обезличенные `canonical_id`, нормализованную короткую метку,
   число показов placeholder и успешных reuse; не сохранять raw chat;
2. раз в неделю собирать top-N `missing`, объединять орфографические и
   морфологические варианты и исключать мусор/слишком общие названия;
3. сначала покрыть 20–30 кластеров с максимальным произведением
   `частота × уверенность канонизации`;
4. генерировать по 2–3 варианта офлайн, а не в request path; вручную проверить
   узнаваемость блюда, отсутствие текста/логотипов/людей и единый стиль;
5. выбранный WebP добавить в reviewed manifest как catalog asset. После этого
   он работает без БД/provider и ускоряет всех пользователей;
6. runtime generator оставить для длинного хвоста и не повышать его budget,
   пока batch-каталог даёт более дешёвый прирост hit-rate.

Первый batch разумно строить из production `missing` после 3–7 дней наблюдения.
Цель — измеримый рост catalog hit-rate; количество картинок само по себе не
является метрикой качества.
