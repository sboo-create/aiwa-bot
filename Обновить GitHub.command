#!/bin/bash
# Двойной клик по этому файлу отправляет все изменения проекта на GitHub одним коммитом.
cd "$(dirname "$0")"
echo "Смотрю, что поменялось..."
git add -A
if git diff --cached --quiet; then
  echo "Изменений нет — на GitHub уже всё свежее."
  echo; read -n1 -s -p "Нажми любую клавишу, чтобы закрыть."
  exit 0
fi
echo
git status --short
echo
echo "Напиши одной строкой, что поменялось, и нажми Enter."
echo "(можно просто нажать Enter — подставлю дату)"
read -r msg
[ -z "$msg" ] && msg="Обновление $(date '+%d.%m.%Y %H:%M')"
git commit -m "$msg"
echo
echo "Отправляю на GitHub..."
if git push; then
  echo
  echo "✅ Готово! Всё уехало: https://github.com/sboo-create/aiwa-bot"
else
  echo
  echo "⚠️ Не получилось отправить. Проверь интернет и попробуй ещё раз."
fi
echo; read -n1 -s -p "Нажми любую клавишу, чтобы закрыть."
