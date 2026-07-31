/**
 * Аватар пользователя: фото из Telegram, под ним — оранжевый круг с инициалом.
 *
 * Единственный владелец этой картинки. Раньше главная рисовала фото, а питание
 * и нагрузка — только букву, поэтому один и тот же человек выглядел на соседних
 * экранах по-разному. Размер задаётся стилями снаружи, разметка одна.
 *
 * Круг с буквой рисуется всегда, фото ложится поверх и просто исчезает, если
 * клиент его не отдал или загрузка упала.
 */
export function ProfileAvatar({ className = "", onClick, label = "Открыть профиль" }) {
  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const photo = tgUser?.photo_url;
  const host = typeof window.aiwaData === "function" ? window.aiwaData() : window.aiwaData;
  const name = (host?.name || tgUser?.first_name || "").trim();
  const initial = (name[0] || "•").toUpperCase();
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
