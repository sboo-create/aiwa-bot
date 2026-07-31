import { aiwaTodayIso } from "./dates";
/**
 * Полоса последних дней для мини-календарей питания и нагрузки — как на
 * главной: длиннее недели, поэтому Week превращает её в горизонтальный
 * скроллер, сегодня справа.
 */
const DOW = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

export const historyStrip = (days = 30) => {
  const out = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(`${aiwaTodayIso()}T12:00:00`);
    d.setDate(d.getDate() - i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    out.push({ iso, date: String(d.getDate()), label: DOW[d.getDay()], today: i === 0 });
  }
  return out;
};
