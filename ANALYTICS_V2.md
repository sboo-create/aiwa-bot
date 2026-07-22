# AIWA Analytics v2

Миграция сделана через dual-write: старый дашборд продолжает читать `events`, а новые события
пишутся в `events_v2` и `llm_calls`. Это позволяет включить код на staging и production без
разрушительной миграции или пересчёта старых данных.

## Границы данных

- `events_v2.user_key` — HMAC от Telegram chat ID с `AIWA_ANALYTICS_SALT`.
- В `properties_json` не пишутся тексты сообщений, даты цикла, симптомы, интимность, фото и аудио.
- Один пользовательский AI-ответ получает `request_id`; tool planning и final answer связываются
  по нему.
- `/stop` удаляет строки пользователя из обеих новых таблиц.

## Таблицы

`events_v2` хранит продуктовые события: UTC-время, псевдоним пользователя, имя события, source,
screen, request/session IDs, status, latency, безопасные properties и версию приложения.

`llm_calls` хранит каждый фактический запрос к AI-провайдеру, включая неуспешные попытки и ретраи:
provider, model, purpose, status, latency, input/output/cached/total tokens, сообщённую провайдером
стоимость и request ID. Для STT/TTS
в `meta_json` сохраняются только единицы тарификации — байты аудио или число символов.

## События первого этапа

- `app_opened`, `screen_viewed`
- `assistant_message_sent`, `assistant_response_received`
- `meal_add_completed`, `workout_add_completed`
- `checkin_updated`, `checkin_symptom_selected`, `checkin_completed`
- `ai_usage_recorded`

Legacy-события, которым пока не сопоставлено устойчивое продуктовое имя, получают префикс
`legacy_`. Конкретное значение симптома при переносе намеренно отбрасывается.

## Проверка после включения

1. Сравнить суточное число строк `events` и `events_v2` с учётом dual-write.
2. Проверить, что у `assistant_response_received` и соответствующих `llm_calls` совпадает request ID.
3. Сверить сумму input/output tokens и число запросов с кабинетами провайдеров.
4. Проверить долю `llm_calls` без `user_key`, `purpose` или `model`.
5. Провести тестовое удаление staging-пользователя и убедиться, что связанных строк не осталось.

Старые оценки стоимости нельзя смешивать с данными после cutover: в старой таблице нет надёжного
разделения input/output tokens и полного списка provider calls.

## OpenRouter

Для OpenRouter используются `AIWA_PROVIDER=openrouter`, `OPENROUTER_API_KEY` и обязательный для
контролируемой маршрутизации `OPENROUTER_MODEL`. Код обращается только к официальному
`https://openrouter.ai/api/v1/chat/completions`; неявные IP-адреса legacy-прокси удалены.
Speech и прямой GigaChat Vision остаются отдельными контурами и учитываются отдельно.
