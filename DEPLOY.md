# Деплой бота Айва в облако 24/7 (без терминала)

Бот — это «воркер» с long-polling: ему нужен **всегда включённый** процесс.
Бесплатно-навсегда таких хостов почти нет; самый простой путь — **Railway**
(есть стартовый бесплатный кредит, дальше ~$5/мес). Альтернативы — в конце.

Нужные файлы уже лежат в этой папке: `aiwa_bot.py`, `cycle.py`, `llm.py`,
`requirements.txt`, `Procfile`, `.python-version`.
⚠️ Файл `.env` с токеном и ключом в облако НЕ загружаем — секреты зададим в панели.

## Шаг 1. Залить код на GitHub (через браузер, без git)
1. Зайди на github.com → войди/зарегистрируйся.
2. Сверху справа «+» → **New repository**. Имя: `aiwa-bot`. Private. **Create**.
3. На странице репозитория → **Add file → Upload files**.
4. Перетащи в окно файлы из папки `AIWA_bot`:
   `aiwa_bot.py, cycle.py, llm.py, requirements.txt, Procfile, .python-version, README.md`
   (⚠️ БЕЗ `.env`).
5. Внизу **Commit changes**.

## Шаг 2. Развернуть на Railway
1. Зайди на railway.app → **Login with GitHub** → разреши доступ.
2. **New Project → Deploy from GitHub repo** → выбери `aiwa-bot`.
3. Railway сам поставит зависимости и запустит процесс из `Procfile`
   (`worker: python aiwa_bot.py`).

## Шаг 3. Прописать секреты (Variables)
1. В проекте Railway открой сервис → вкладка **Variables → New Variable**.
2. Добавь по одной:
   - `BOT_TOKEN` = токен из BotFather
   - `AIWA_PROVIDER` = `gigachat`
   - `GIGACHAT_CREDENTIALS` = Authorization key из кабинета GigaChat
   - `GIGACHAT_SCOPE` = `GIGACHAT_API_PERS`
   - `GIGACHAT_MODEL` = `GigaChat-2`
   - `AIWA_TZ` = `Europe/Moscow`
   - `AIWA_ADMIN` = Telegram chat ID администратора команд бота
   - `AIWA_ADMIN_KEY` = отдельная случайная строка длиной не меньше 32 символов
   - `AIWA_ANALYTICS_SALT` = ещё одна отдельная случайная строка длиной не меньше 32 символов
   - `AIWA_DB` = `/data/aiwa.db`
   - для OpenRouter вместо GigaChat: `AIWA_PROVIDER=openrouter`, `OPENROUTER_API_KEY`,
     `OPENROUTER_TEXT_MODEL=deepseek/deepseek-v3.2` и
     `OPENROUTER_VISION_MODEL=google/gemini-2.5-flash`
3. Railway перезапустит сервис. Во вкладке **Deploy logs** должно появиться
   `AIWA bot starting...` и `Application started`.

## Шаг 4. Проверить
Напиши боту в Телеграме `/start` — он ответит и пришлёт сводку. Готово, работает 24/7.

## Важные нюансы
- **Данные (aiwa.db)** должны лежать на Railway Volume. Подключи volume к сервису с mount path
  `/data`, задай `AIWA_DB=/data/aiwa.db`, включи backups и проверь восстановление на staging.
- **Один экземпляр.** Не запускай бота одновременно в двух местах (облако + Mac) —
  Telegram отдаёт апдейты только одному поллеру, будет конфликт `getUpdates`.
- В Railway настрой healthcheck path `/health`. Он отвечает `200` только после запуска
  Telegram polling и планировщиков, а во время старта возвращает `503`.
- Сначала создай отдельный staging environment с другим Telegram-ботом, БД и ключами.
- TLS проверяется по умолчанию. Для внутреннего CA используй `GIGACHAT_CA_BUNDLE_FILE` или
  `LITELLM_CA_BUNDLE_FILE`; не отключай проверку сертификата в production.
- Если mini app и API находятся на разных доменах, перечисли точные origins в
  `AIWA_ALLOWED_ORIGINS`. Значение `*` не используется.
- Дашборд открывается по `/admin`: ключ вводится в форме и сохраняется в защищённой HttpOnly
  cookie на 8 часов. Ключи в URL запрещены, потому что URL попадают в access logs. Пока
  `AIWA_ADMIN_KEY` не задан, для совместимости принимается текущее значение `AIWA_ADMIN`;
  приложение пишет предупреждение в лог. Позже лучше вынести отдельный длинный ключ.
- Для OpenRouter текст и фото намеренно маршрутизируются в разные модели. Не используй
  `gemini-2.5-flash-image`: это модель генерации/редактирования изображений, а для разбора
  фотографии еды нужна обычная мультимодальная `gemini-2.5-flash`.

## Альтернативы
- **Render** → New → **Background Worker** из того же GitHub-репо, start command
  `python aiwa_bot.py`, переменные те же. (Бесплатный тариф воркеров ограничен.)
- **Koyeb / Fly.io** — есть небольшие всегда-включённые инстансы.
