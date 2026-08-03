/**
 * Как зовут человека: имя из хоста, иначе first_name из Telegram.
 *
 * Живёт рядом с аватаром намеренно — буква в круге и подпись под ним должны
 * браться из одного места, иначе профиль легко разъедется («А» и «Аня»).
 * Пустая строка, если клиент имени не отдал (storybook, веб без Telegram).
 */
export function profileName() {
  const browser = typeof window === "undefined" ? {} : window;
  const host = typeof browser.aiwaData === "function" ? browser.aiwaData() : browser.aiwaData;
  const tgUser = browser.Telegram?.WebApp?.initDataUnsafe?.user;
  return (host?.name || tgUser?.first_name || "").trim();
}

/**
 * Единый аватар пользователя: Telegram-фото поверх круга с инициалом.
 * Размер задаётся внешним контекстом; при `onClick` компонент сам становится
 * доступной кнопкой, иначе остаётся декоративным содержимым чужой кнопки.
 */
export function ProfileAvatar({ className = "", onClick, label = "Открыть профиль" }) {
  const browser = typeof window === "undefined" ? {} : window;
  const tgUser = browser.Telegram?.WebApp?.initDataUnsafe?.user;
  const photo = tgUser?.photo_url;
  const initial = (profileName()[0] || "•").toUpperCase();
  const classes = `aiwa-avatar-initial${className ? ` ${className}` : ""}`;

  const content = (
    <>
      {initial}
      {photo ? (
        <img
          className="aiwa-avatar-photo"
          src={photo}
          alt=""
          onError={(event) => { event.currentTarget.style.display = "none"; }}
        />
      ) : null}
    </>
  );

  if (!onClick) {
    return <span className={classes} aria-hidden="true">{content}</span>;
  }
  return (
    <button type="button" className={classes} aria-label={label} onClick={onClick}>
      {content}
    </button>
  );
}
