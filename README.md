# Айва (AIWA) — Telegram-бот проактивных сводок по циклу

> Эта папка — рабочая копия для редизайна. Эталонная версия остаётся в `../aiwa-bot`.
> Новый главный экран живёт в `aiwa_webapp.html`; продуктовые API и SQLite-модели остаются общими с Telegram Mini App.

Бот спрашивает дату последних месячных и длину цикла, считает фазу и каждое утро
присылает короткую сводку: фаза и прогноз, краткая инфа о периоде, питание и тренировки
под фазу. Генерация — на OSS-модели (Llama 3.3 70B через Groq); если ключа нет, работает
шаблонный режим без LLM.

## Файлы
- `aiwa_bot.py` — бот (Telegram, онбординг, расписание, SQLite)
- `cycle.py` — расчёт дня/фазы/прогноза и база контента по фазам
- `llm.py` — генерация сводки через Groq (OpenAI-совместимый API) + фолбэк
- `requirements.txt`, `.env.example`

## Что нужно (2 бесплатных ключа)
1. **Telegram Bot Token** — открой @BotFather в Телеграме → `/newbot` → имя и @username →
   он выдаст токен вида `123456:ABC...`.
2. **Groq API key** — console.groq.com → Sign in → API Keys → Create → ключ `gsk_...`
   (бесплатный тариф). Модель открытая (Llama 3.3).

## Запуск локально (Mac)
```bash
cd AIWA_bot
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
export BOT_TOKEN="123456:ABC..."
export GROQ_API_KEY="gsk_..."
python aiwa_bot.py
```
Бот начнёт отвечать в Телеграме. Пользователи находят его по @username и жмут Start.

## Главный экран в обычном браузере

Локальный стенд запускает тот же `aiohttp`-backend и те же `/api/*`, но без Telegram-бота.
Для него создаётся отдельный пользователь и отдельная база `.aiwa-web-debug.db`.

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python web_debug.py
```

После запуска открой `http://127.0.0.1:8080`. Изменения календаря, журнала, питания,
нагрузки и профиля сохраняются между перезапусками. Чтобы получить чистый набор
демо-данных, останови сервер и удали только `.aiwa-web-debug.db`.

Debug-авторизация включается скриптом через `AIWA_WEB_DEBUG=1` и не работает в обычном
production-запуске `aiwa_bot.py`. Сервер стенда слушает только `127.0.0.1`.

## Дизайн-система и UI-kit

Telegram Mini App UI собран на **@deslop/tma** (Telegram-компоненты Deslop).

| Слой | Где |
|------|-----|
| Vendored TMA | `vendor/deslop-tma` (неизменённый library build) |
| Иконки primitives | `vendor/deslop-primitives/icons` |
| **Продуктовый kit** | **`src/aiwa/`** — экраны, панели, блоки, bridge |
| Paper CSS (как сейчас) | `src/aiwa/styles/composition.css` |
| **Локальный Storybook** | **`src/storybook/` — источник истины для UI** |
| Paper/Figma ↔ code | `DESIGN_SYNC.md` |
| Реестр стабильных имён | `src/aiwa/design-system/registry.json` |
| Разрешённые компоненты | `UI_COMPONENTS.md` |
| Точка бандла | `src/deslop-main.jsx` → `window.AiwaDeslop` |
| Правила разработки | `AGENTS.md` + `src/aiwa/AGENTS.md` |

Переиспользование в следующих сессиях:

```js
import {
  HomeScreen, PaperRow, AiwaModalView, Field, ChoicePills,
  JournalPanel, Navigation, installBridge,
} from "./src/aiwa/index.js";
```

Новые экраны собираются только из компонентов, представленных в локальном
Storybook. TMA-примитивы импортируются через `src/aiwa/lib/tma.js`; прямые
импорты из `@deslop/tma` в продуктовом коде запрещены автоматической проверкой.
Если нужного компонента ещё нет, сначала добавь его в gateway и Storybook.

```bash
npm install
npm run storybook
npm run verify
```

Storybook доступен по адресу
`http://127.0.0.1:5173/storybook/#/ui-kit/colors`, а связь компонентов с
Paper/Figma — на `/storybook/#/system/components`.

`npm run verify` проверяет реестр дизайн-системы и владельцев базовых примитивов,
собирает Storybook и React-бандл, а затем проверяет структуру kit, хэши vendored
`dist`, SVG Deslop, отсутствие CSS/HTML-реплик и связи с `/api/*`.

## Команды
- `/start` — настроить (дата месячных + длина цикла)
- `/today` — сводка сейчас
- `/time 09:30` — время ежедневной рассылки (МСК по умолчанию)
- `/stop` — отключить и удалить данные

## 24/7 без выключения
Чтобы бот работал постоянно, держи процесс запущенным на:
- **своём Mac** — например через `launchd` или просто не закрывать терминал;
- **дешёвом облаке** — Railway / Render / любой VPS: загрузить папку, задать
  переменные `BOT_TOKEN` и `GROQ_API_KEY`, команда запуска `python aiwa_bot.py`.

## Приватность
Хранятся только chat_id, дата последних месячных, длина цикла и время рассылки (SQLite
`aiwa.db` локально). Никаких аккаунтов и облака. Бот не ставит диагнозы и при тревожных
симптомах направляет к врачу.
