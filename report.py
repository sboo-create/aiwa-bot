# -*- coding: utf-8 -*-
"""Красивая выписка по циклу в PDF: краткий вывод, история, график, симптомы, рекомендации, прогноз. УТП AIWA."""
import io, os, statistics
from collections import Counter
from datetime import date, timedelta

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager as fm

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
                                Table, TableStyle, Image, Flowable)

HERE = os.path.dirname(os.path.abspath(__file__))
GOLOS = os.path.join(HERE, "assets", "GolosText.ttf")

PAPER = colors.HexColor("#FAF5F2"); INK = colors.HexColor("#211C1A")
ROSE = colors.HexColor("#C25E76"); ROSEW = colors.HexColor("#FBE4E9")
INKMID = colors.HexColor("#6E635C"); SOFT = colors.HexColor("#A89C93")
CARD = colors.HexColor("#F4EBE6")

_FONT = "Helvetica"
def _fonts():
    global _FONT
    if _FONT == "Golos": return
    if os.path.exists(GOLOS):
        try:
            pdfmetrics.registerFont(TTFont("Golos", GOLOS)); _FONT = "Golos"
        except Exception: pass
_MPL_FP = fm.FontProperties(fname=GOLOS) if os.path.exists(GOLOS) else fm.FontProperties()

MONTHS = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
def _ru(d): return f"{d.day} {MONTHS[d.month-1]} {d.year}"
SYM_RU = {"cramps": "спазмы", "head": "головная боль", "bloat": "вздутие",
          "sweet": "тяга к сладкому", "anx": "тревожность", "tired": "усталость"}
def _sym_label(code):
    if code in SYM_RU: return SYM_RU[code]
    if isinstance(code, str) and code.startswith("custom:"): return code.split(":", 1)[1]
    return code
ENR = {1: "низкая", 2: "средняя", 3: "высокая"}


class Band(Flowable):
    """Цветная шапка с заголовком. Корректно сообщает свой размер через wrap()."""
    def __init__(self, w, title, subtitle):
        super().__init__()
        self.width = w; self.height = 30*mm; self.title = title; self.subtitle = subtitle
    def wrap(self, aw, ah):
        return (self.width, self.height)
    def draw(self):
        c = self.canv; h = self.height
        c.setFillColor(ROSEW); c.roundRect(0, 0, self.width, h, 6*mm, fill=1, stroke=0)
        c.setFillColor(ROSE); c.setFont(_FONT, 11); c.drawString(9*mm, h-12*mm, "AIWA")
        c.setFillColor(INK); c.setFont(_FONT, 16); c.drawString(9*mm, h-20*mm, self.title)
        c.setFillColor(INKMID); c.setFont(_FONT, 9); c.drawString(9*mm, h-26*mm, self.subtitle)


def _fit_size(text, base, maxw_pt, minsize=9):
    """Подбор кегля, чтобы строка влезла по ширине (для значений карточек)."""
    sz = base
    while sz > minsize and pdfmetrics.stringWidth(str(text), _FONT, sz) > maxw_pt:
        sz -= 0.5
    return sz


def _stat_cards(items, w):
    gap = 5*mm; cw = (w - gap) / 2; inner = cw - 12*mm
    def card(label, value):
        vs = _fit_size(value, 14, inner)
        p_l = Paragraph(label, ParagraphStyle("l", fontName=_FONT, fontSize=8.5, textColor=SOFT, leading=11))
        p_v = Paragraph(str(value), ParagraphStyle("v", fontName=_FONT, fontSize=vs, textColor=INK, leading=vs+3))
        t = Table([[p_l], [p_v]], colWidths=[inner], rowHeights=[6.5*mm, 8.5*mm])
        t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),CARD),("LEFTPADDING",(0,0),(-1,-1),6*mm),
                               ("RIGHTPADDING",(0,0),(-1,-1),3*mm),("TOPPADDING",(0,0),(-1,-1),2*mm),
                               ("BOTTOMPADDING",(0,0),(-1,-1),1*mm),("ROUNDEDCORNERS",[6,6,6,6]),
                               ("VALIGN",(0,0),(-1,-1),"MIDDLE")]))
        return t
    grid = []
    for i in range(0, len(items), 2):
        cells = [card(*it) for it in items[i:i+2]]
        while len(cells) < 2: cells.append("")
        grid.append(cells)
    outer = Table(grid, colWidths=[cw, cw])
    outer.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),0),("TOPPADDING",(0,0),(-1,-1),0),
                               ("RIGHTPADDING",(0,0),(0,-1),gap),("RIGHTPADDING",(1,0),(1,-1),0),
                               ("BOTTOMPADDING",(0,0),(-1,-2),gap),("BOTTOMPADDING",(0,-1),(-1,-1),0),
                               ("VALIGN",(0,0),(-1,-1),"TOP")]))
    return outer


def _cycle_lengths(cycles):
    out = []
    for i in range(1, len(cycles)):
        ln = (date.fromisoformat(cycles[i]) - date.fromisoformat(cycles[i-1])).days
        if 15 <= ln <= 60: out.append((date.fromisoformat(cycles[i]), ln))
    return out


def _summary_box(cycles, logs, st, w):
    lens = [ln for _, ln in _cycle_lengths(cycles)]
    lines = []
    if len(lens) >= 2:
        avg = round(statistics.mean(lens)); sd = statistics.pstdev(lens)
        reg = "регулярный" if sd <= 2.5 else ("умеренно нерегулярный" if sd <= 5 else "нерегулярный")
        lines.append(f"<b>Цикл:</b> средняя длина {avg} дн, разброс {min(lens)}-{max(lens)} дн, цикл {reg}.")
        ov = max(12, avg - 14)
        lines.append(f"<b>Овуляция:</b> ориентировочно на {ov} день цикла, фертильное окно за 5 дней до неё.")
    elif lens:
        avg = lens[0]
        lines.append(f"<b>Цикл:</b> по отмеченным данным около {avg} дн, для оценки регулярности нужно больше циклов.")
    else:
        avg = st["cycle_len"] if st else 28
        if st:
            lines.append(f"<b>Цикл:</b> заявленная длина {avg} дн, отмеченных месячных пока мало для статистики.")
    cnt = Counter()
    for lg in logs:
        for s in lg.get("symptoms", []): cnt[s] += 1
    if cnt:
        top = ", ".join(_sym_label(c) for c, _ in cnt.most_common(3))
        lines.append(f"<b>Симптомы:</b> чаще всего отмечаются {top}.")
    en = [lg["energy"] for lg in logs if lg.get("energy")]
    if en:
        lines.append(f"<b>Энергия:</b> в среднем {ENR.get(round(statistics.mean(en)),'')} (по {len(en)} отметкам).")
    if st:
        lines.append(f"<b>Сейчас:</b> {st['subphase']} {st['phase_ru'].lower()} фаза, день {st['day']} из {st['cycle_len']}.")
    else:
        lines.append("<b>Режим:</b> без отслеживания фазы цикла, выписка по симптомам и самочувствию.")
    style = ParagraphStyle("sm", fontName=_FONT, fontSize=10, textColor=INK, leading=15, spaceAfter=2)
    inner = [[Paragraph(t, style)] for t in lines]
    t = Table(inner, colWidths=[w-12*mm])
    t.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),ROSEW),("LEFTPADDING",(0,0),(-1,-1),6*mm),
                           ("RIGHTPADDING",(0,0),(-1,-1),6*mm),("TOPPADDING",(0,0),(0,0),4*mm),
                           ("BOTTOMPADDING",(0,-1),(-1,-1),4*mm),("ROUNDEDCORNERS",[6,6,6,6])]))
    return t, (round(statistics.mean(lens)) if lens else (st["cycle_len"] if st else 28))


def _cycle_chart(cycles):
    pairs = _cycle_lengths(cycles)
    fig, ax = plt.subplots(figsize=(7.0, 2.4), dpi=150)
    fig.patch.set_facecolor("#FAF5F2"); ax.set_facecolor("#FAF5F2")
    if pairs:
        xs = [f"{d.day}.{d.month:02d}" for d, _ in pairs]; ys = [ln for _, ln in pairs]
        ax.axhspan(21, 35, color="#94A97E", alpha=0.12, zorder=1)
        ax.bar(xs, ys, color="#C25E76", width=min(0.5, 0.16*len(xs)+0.18), zorder=3)
        avg = sum(ys)/len(ys); ax.axhline(avg, color="#6E635C", ls="--", lw=1, zorder=2)
        for i, v in enumerate(ys):
            ax.text(i, v+0.4, str(v), ha="center", color="#211C1A", fontproperties=_MPL_FP, fontsize=8)
        ax.set_ylim(0, max(max(ys)+6, 38)); ax.set_xlim(-0.6, len(xs)-0.4)
        ax.set_title(f"норма 21-35 дн (зелёная зона), среднее {avg:.0f} дн", fontproperties=_MPL_FP, fontsize=8, color="#6E635C", loc="left")
    else:
        ax.text(0.5, 0.5, "Пока мало данных для графика длины цикла", ha="center", va="center",
                color="#6E635C", fontproperties=_MPL_FP, fontsize=10); ax.set_xticks([]); ax.set_yticks([])
    for s in ("top", "right"): ax.spines[s].set_visible(False)
    for s in ("left", "bottom"): ax.spines[s].set_color("#A89C93")
    ax.tick_params(colors="#6E635C")
    for lab in ax.get_xticklabels() + ax.get_yticklabels(): lab.set_fontproperties(_MPL_FP); lab.set_fontsize(8)
    ax.set_ylabel("дней в цикле", fontproperties=_MPL_FP, fontsize=8, color="#6E635C")
    fig.tight_layout()
    buf = io.BytesIO(); fig.savefig(buf, format="png", facecolor=fig.get_facecolor()); plt.close(fig); buf.seek(0)
    return buf


def _symptom_table(logs, w):
    cnt = Counter()
    for lg in logs:
        for s in lg.get("symptoms", []): cnt[s] += 1
    if not cnt:
        return Paragraph("За период симптомы не отмечались.",
                         ParagraphStyle("e", fontName=_FONT, fontSize=10, textColor=INKMID))
    rows = []; mx = max(cnt.values())
    for code, n in cnt.most_common():
        bar = "█" * max(1, round(12*n/mx))
        rows.append([Paragraph(_sym_label(code), ParagraphStyle("s", fontName=_FONT, fontSize=10, textColor=INK)),
                     Paragraph(f'<font color="#C25E76">{bar}</font>', ParagraphStyle("b", fontName=_FONT, fontSize=10)),
                     Paragraph(f"{n}", ParagraphStyle("n", fontName=_FONT, fontSize=10, textColor=INKMID))])
    t = Table(rows, colWidths=[w*0.38, w*0.50, w*0.12])
    t.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"MIDDLE"),("TOPPADDING",(0,0),(-1,-1),2),("BOTTOMPADDING",(0,0),(-1,-1),2),
                           ("ALIGN",(2,0),(2,-1),"RIGHT")]))
    return t


def build_report(meta):
    """meta: cycles[list iso], logs[list], st, cycle_len, period_label"""
    _fonts()
    buf = io.BytesIO()
    W, H = A4; ml = 16*mm; fw = W - 2*ml
    doc = BaseDocTemplate(buf, pagesize=A4, leftMargin=ml, rightMargin=ml, topMargin=15*mm, bottomMargin=15*mm)
    frame = Frame(ml, 15*mm, fw, H-30*mm, id="f", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    def _bg(canvas, _doc):
        canvas.setFillColor(PAPER); canvas.rect(0, 0, W, H, fill=1, stroke=0)
        canvas.setFillColor(SOFT); canvas.setFont(_FONT, 8)
        canvas.drawString(ml, 9*mm, "Сформировано AIWA. Документ для ориентира, не заменяет консультацию гинеколога.")
        canvas.drawRightString(W-ml, 9*mm, f"стр. {_doc.page}")
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=_bg)])

    def H2(t): return Paragraph(t, ParagraphStyle("h2", fontName=_FONT, fontSize=12, textColor=ROSE, spaceBefore=2, spaceAfter=5, leading=15))
    def P(t): return Paragraph(t, ParagraphStyle("p", fontName=_FONT, fontSize=10, textColor=INK, leading=15))

    st = meta["st"]; cycles = sorted(set(meta.get("cycles", []))); logs = meta.get("logs", [])
    story = []
    story.append(Band(fw, ("Выписка по менструальному циклу" if st else "Выписка по самочувствию"), f"{meta['period_label']} · сформировано {_ru(date.today())}"))
    story.append(Spacer(1, 7*mm))

    nxt = st.get("next_period") if st else None
    pretty = _cycle_lengths(cycles)
    avg_len = round(statistics.mean([l for _, l in pretty])) if pretty else meta.get("cycle_len", 28)
    prof = meta.get("profile") or {}
    if st:
        cards = [("Средняя длина", f"{avg_len} дн"), ("Отмечено циклов", f"{len(cycles)}"),
                 ("Текущая фаза", st["phase_ru"]), ("Следующие месячные", _ru(nxt) if nxt else "-")]
    else:
        nsym = sum(len(lg.get("symptoms", [])) for lg in logs)
        cards = [("Режим", "без цикла"), ("Возраст", f"{prof.get('age')}" if prof.get("age") else "-"),
                 ("Дней с отметками", f"{len(logs)}"), ("Симптомов отмечено", f"{nsym}")]
    story.append(_stat_cards(cards, fw))
    story.append(Spacer(1, 5*mm))

    story.append(H2("Краткий вывод"))
    box, avg2 = _summary_box(cycles, logs, st, fw)
    story.append(box); story.append(Spacer(1, 6*mm))

    if st:
        story.append(H2("Длина цикла по времени"))
        story.append(Image(_cycle_chart(cycles), width=fw, height=fw*2.4/7.0))
        story.append(Spacer(1, 5*mm))
        story.append(H2("История отмеченных месячных"))
    if st and cycles:
        rows = [[P("Дата начала"), P("Длина цикла")]]
        for idx in range(len(cycles)-1, -1, -1):
            dd = date.fromisoformat(cycles[idx]); ln = "-"
            if idx >= 1:
                diff = (dd - date.fromisoformat(cycles[idx-1])).days
                ln = f"{diff} дн" if diff >= 15 else "повторная отметка"
            rows.append([P(_ru(dd)), P(ln)])
            if len(rows) > 12: break
        t = Table(rows, colWidths=[fw*0.5, fw*0.5])
        t.setStyle(TableStyle([("FONTNAME",(0,0),(-1,-1),_FONT),("FONTSIZE",(0,0),(-1,-1),10),
                               ("TEXTCOLOR",(0,0),(-1,0),colors.white),("BACKGROUND",(0,0),(-1,0),ROSE),
                               ("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white, CARD]),
                               ("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),
                               ("LEFTPADDING",(0,0),(-1,-1),6)]))
        story.append(t)
    elif st:
        story.append(P("Пока нет отмеченных дат."))
    if st: story.append(Spacer(1, 6*mm))

    story.append(H2("Симптомы за период"))
    story.append(_symptom_table(logs, fw)); story.append(Spacer(1, 6*mm))

    if st:
        story.append(H2("Рекомендации на текущую фазу"))
        c = st["content"]
        story.append(P(f"<b>Фаза:</b> {st['subphase']} {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}."))
        story.append(P(f"<b>Тело:</b> {c['general']}"))
        story.append(P(f"<b>Питание:</b> {c['food']}"))
        story.append(P(f"<b>Нагрузка:</b> {c['training']}"))
        story.append(Spacer(1, 5*mm))

    if st and nxt:
        fc = []; d = nxt
        for _ in range(3): fc.append(_ru(d)); d = d + timedelta(days=avg_len)
        story.append(H2("Прогноз следующих месячных"))
        story.append(P("По средней длине цикла: " + "; ".join(fc) + "."))

    doc.build(story)
    buf.seek(0); return buf.getvalue()


def period_since(label):
    today = date.today()
    if label == "3": return (today - timedelta(days=92)).isoformat(), "Последние 3 месяца"
    if label == "6": return (today - timedelta(days=183)).isoformat(), "Последние 6 месяцев"
    return None, "Весь период"
