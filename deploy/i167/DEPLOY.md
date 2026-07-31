# Деплой AIWA на i167

Выкатка выполняется workflow `Deploy to i167` (`.github/workflows/deploy.yml`),
вручную: Actions -> Deploy to i167 -> Run workflow -> ref + `confirm: deploy`.

## Почему так, а не иначе

- **Без артефактов.** Релиз собирается `git archive` на runner и уходит
  по SSH прямо на сервер. GitHub storage не расходуется (для публичного
  репозитория минуты стандартных runner-ов и так бесплатны).
- **Без self-hosted runner.** Репозиторий публичный: runner на i167 позволил
  бы выполнить произвольный код из fork-PR на боевом хосте.
- **Ключ без shell.** CI-ключ прописан в `authorized_keys` пользователя
  `aiwa-deployer` с `command="/usr/local/bin/aiwa-deploy"` и запретом
  pty/agent/port-forwarding: ключ умеет ровно три команды и ничего больше.
- **sudo по списку.** `/etc/sudoers.d/aiwa-deployer` разрешает только
  `systemctl restart|is-active aiwa`, pip/python внутри `/srv/aiwa/venv`
  и запись `venv/.req-sha256`.

## Что делает выкатка

1. `workflow_dispatch` доступен только пользователям с write-доступом;
   `confirm` должен быть буквально `deploy`.
2. Проверяется, что коммит является предком `origin/main` (нельзя выкатить
   произвольную ветку).
3. Прогоняются compile + полный `unittest` **на точном выкатываемом дереве**.
4. `git archive` -> ssh -> `aiwa-deploy deploy <sha>` на сервере:
   - immutable `releases/<40-hex-sha>`, при повторе переиспользуется;
   - `pip install` только если изменился `requirements.txt`;
   - pre-deploy snapshot SQLite через Backup API (не `cp` живого файла);
   - атомарное переключение symlink `current` и `systemctl restart aiwa`;
   - ожидание `/health` с **точным** `release_sha` (до 60 секунд);
   - при неудаче — автоматический откат на предыдущий release и ненулевой код;
   - хранятся последние 5 релизов.
5. Отдельным шагом проверяется публичный домен: он должен отдавать тот же
   `release_sha` (то есть путь через Railway-прокси жив).

## Ручные команды (тот же ключ)

```bash
ssh -i <deploy-key> aiwa-deployer@<i167> status
ssh -i <deploy-key> aiwa-deployer@<i167> rollback
```

`rollback` возвращает предыдущий release и проверяет health.

## Секреты

| Секрет | Что |
|---|---|
| `I167_DEPLOY_KEY` | приватный ключ CI (forced command) |
| `I167_HOST` | адрес сервера |
| `I167_KNOWN_HOSTS` | host key сервера (StrictHostKeyChecking=yes) |

## Осталось сделать админу репозитория

Создать GitHub environment `production` с required reviewers и вернуть
`environment: production` в job — тогда выкатка потребует подтверждения
второго человека. Прав на это у CI-пользователя нет.
