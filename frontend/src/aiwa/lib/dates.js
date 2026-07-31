/* Сегодняшний день приложения. Телефон может жить в любой таймзоне, а бот и
   сервер считают день по Europe/Moscow: сначала берём today из payload
   склейки, затем честно вычисляем московскую дату. UTC-полночь здесь давала
   сдвиг дня (портировано из прод-патча v177). */
export function aiwaTodayIso() {
  const data = typeof window.aiwaData === "function" ? window.aiwaData() : window.aiwaData;
  const fromHost = String(data?.today || "");
  if (/^\d{4}-\d{2}-\d{2}$/.test(fromHost)) return fromHost;
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en", { timeZone: "Europe/Moscow", year: "numeric", month: "2-digit", day: "2-digit" })
      .formatToParts(new Date())
      .filter((p) => p.type !== "literal")
      .map((p) => [p.type, p.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}
