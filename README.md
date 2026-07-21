# Айва (AIWA) — Telegram-бот проактивных сводок по циклу

Бот спрашивает дату последних месячных и длину цикла, считает фазу и каждое утро
присылает короткую сводку: фаза и прогноз, краткая инфа о периоде, питание и тренировки
под фазу. Генерация — на GigaChat (Сбер); при недоступности есть фолбэк на LiteLLM-прокси,
а без ключей работает шаблонный режим без LLM.

## Файлы
- `aiwa_bot.py` — бот (Telegram, онбординг, расписание, SQLite)
- `cycle.py` — расчёт дня/фазы/прогноза и база контента по фазам
- `llm.py` — генерация сводки через GigaChat / LiteLLM-прокси + шаблонный фолбэк
- `requirements.txt`, `.env.example`

## Что нужно (2 ключа)
1. **Telegram Bot Token** — открой @BotFather в Телеграме → `/newbot` → имя и @username →
   он выдаст токен вида `123456:ABC...`.
2. **GigaChat Authorization key** — developers.sber.ru/portal/products/gigachat-api →
   создай проект → возьми `Authorization key` для `GIGACHAT_CREDENTIALS`
   (scope `GIGACHAT_API_PERS`). Модель `GigaChat-2`.
3. *(необязательно)* **Groq API key** — для распознавания голосовых сообщений
   (Whisper): console.groq.com → API Keys → ключ `gsk_...` в `GROQ_API_KEY`.
   Без него текст работает как обычно, голосовые просто игнорируются.
   GigaChat сам речь не распознаёт — это текстовая модель.

## Запуск локально (Mac)
```bash
cd AIWA_bot
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
export BOT_TOKEN="123456:ABC..."
export AIWA_PROVIDER="gigachat"
export GIGACHAT_CREDENTIALS="<Authorization key>"
python aiwa_bot.py
```
Бот начнёт отвечать в Телеграме. Пользователи находят его по @username и жмут Start.

## Команды
- `/start` — настроить (дата месячных + длина цикла)
- `/today` — сводка сейчас
- `/time 09:30` — время ежедневной рассылки (МСК по умолчанию)
- `/stop` — отключить и удалить данные

## 24/7 без выключения
Чтобы бот работал постоянно, держи процесс запущенным на:
- **своём Mac** — например через `launchd` или просто не закрывать терминал;
- **дешёвом облаке** — Railway / Render / любой VPS: загрузить папку, задать
  переменные `BOT_TOKEN` и `GIGACHAT_CREDENTIALS`, команда запуска `python aiwa_bot.py`.

## Приватность
Хранятся только chat_id, дата последних месячных, длина цикла и время рассылки (SQLite
`aiwa.db` локально). Никаких аккаунтов и облака. Бот не ставит диагнозы и при тревожных
симптомах направляет к врачу.
