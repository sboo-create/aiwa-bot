/* Аватар профиля: оранжевый круг с инициалом плюс фото Telegram поверх, если
   клиент его отдал. Общий для всех экранов (порт прод-патча v177: раньше
   «Питание» и «Нагрузка» рисовали голую букву без фото). */
export function ProfileAvatar() {
  const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
  const photo = tgUser?.photo_url;
  const data = typeof window.aiwaData === "function" ? window.aiwaData() : window.aiwaData;
  const name = (data?.name || tgUser?.first_name || "").trim();
  return (
    <span className="aiwa-avatar-initial" aria-hidden="true">
      {(name[0] || "•").toUpperCase()}
      {photo ? (
        <img
          className="aiwa-avatar-photo"
          src={photo}
          alt=""
          onError={(event) => { event.currentTarget.style.display = "none"; }}
        />
      ) : null}
    </span>
  );
}
