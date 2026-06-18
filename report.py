# -*- coding: utf-8 -*-
"""Красивая выписка по циклу в PDF: история, график, симптомы, рекомендации. УТП AIWA."""
import io, os
from datetime import date, datetime, timedelta

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

import cycle as C

HERE = os.path.dirname(os.path.abspath(__file__))
GOLOS = os.path.join(HERE, "assets", "GolosText.ttf")

PAPER = colors.HexColor("#FAF5F2"); INK = colors.HexColor("#211C1A")
ROSE = colors.HexColor("#C25E76"); ROSEW = colors.HexColor("#FBE4E9")
INKMID = colors.HexColor("#6E635C"); SOFT = colors.HexColor("#A89C93")
CARD = colors.HexColor("#F4EBE6")
PHASE_HEX = {"menstrual": "#C25E76", "follicular": "#94A97E", "ovulation": "#E5A734", "luteal": "#E0879A"}

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


class Band(Flowable):
    """Цветная шапка с заголовком."""
    def __init__(self, w, title, subtitle):
        super().__init__(); self.w = w; self.h = 30*mm; self.title = title; self.subtitle = subtitle
    def draw(self):
        c = self.canv
        c.setFillColor(ROSEW); c.roundRect(0, 0, self.w, self.h, 6*mm, fill=1, stroke=0)
        c.setFillColor(ROSE); c.setFont(_FONT, 12); c.drawString(8*mm, self.h-12*mm, "AIWA")
        c.setFillColor(INK); c.setFont(_FONT, 17); c.drawString(8*mm, self.h-20*mm, self.title)
        c.setFillColor(INKMID); c.setFont(_FONT, 9); c.drawString(8*mm, self.h-26*mm, self.subtitle)


def _stat_cards(items, w):
    n = len(items); gap = 4*mm; cw = (w - gap*(n-1)) / n
    cells = []
    for label, value in items:
        p_l = Paragraph(label, ParagraphStyle("l", fontName=_FONT, fontSize=8, textColor=SOFT, leading=10))
        p_v = Paragraph(str(value), ParagraphStyle("v", fontName=_FONT, fontSize=13, textColor=INK, leading=15))
        t = Table([[p_l], [p_v]], colWidths=[cw-5*mm], rowHeights=[6*mm, 10*mm])
        t.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,-1), CARD), ("LEFTPADDING",(0,0),(-1,-1),5*mm),
                               ("TOPPADDING",(0,0),(-1,-1),2*mm), ("ROUNDEDCORNERS",[5,5,5,5]),
                               ("VALIGN",(0,0),(-1,-1),"MIDDLE")]))
        cells.append(t)
    outer = Table([cells], colWidths=[cw]*n)
    outer.setStyle(TableStyle([("LEFTPADDING",(0,0),(-1,-1),0),("RIGHTPADDING",(0,0),(-1,-1),gap/2),
                               ("TOPPADDING",(0,0),(-1,-1),0),("BOTTOMPADDING",(0,0),(-1,-1),0)]))
    return outer


def _cycle_chart(starts):
    """Бар-чарт длин циклов между отмеченными датами начала."""
    pairs = []
    for i in range(1, len(starts)):
        d0 = date.fromisoformat(starts[i-1]); d1 = date.fromisoformat(starts[i])
        ln = (d1 - d0).days
        if 15 <= ln <= 60: pairs.append((d1, ln))
    fig, ax = plt.subplots(figsize=(7.0, 2.5), dpi=150)
    fig.patch.set_facecolor("#FAF5F2"); ax.set_facecolor("#FAF5F2")
    if pairs:
        xs = [f"{d.day}.{d.month:02d}" for d, _ in pairs]; ys = [ln for _, ln in pairs]
        ax.axhspan(21, 35, color="#94A97E", alpha=0.12)
        ax.bar(xs, ys, color="#C25E76", width=0.55, zorder=3)
        avg = sum(ys)/len(ys); ax.axhline(avg, color="#6E635C", ls="--", lw=1, zorder=2)
        ax.text(len(xs)-0.4, avg+0.4, f"среднее {avg:.0f} дн", color="#6E635C", fontproperties=_MPL_FP, fontsize=8, ha="right")
        for i, v in enumerate(ys):
            ax.text(i, v+0.3, str(v), ha="center", color="#211C1A", fontproperties=_MPL_FP, fontsize=8)
        ax.set_ylim(0, max(max(ys)+6, 36))
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


SYM_RU = {"cramps": "спазмы", "head": "головная боль", "bloat": "вздутие",
          "sweet": "тяга к сладкому", "anx": "тревожность", "tired": "усталость"}
def _symptom_table(logs, w):
    from collections import Counter
    cnt = Counter()
    for lg in logs:
        for s in lg.get("symptoms", []): cnt[s] += 1
    if not cnt:
        return Paragraph("За период симптомы не отмечались.",
                         ParagraphStyle("e", fontName=_FONT, fontSize=10, textColor=INKMID))
    rows = []; mx = max(cnt.values())
    for code, n in cnt.most_common():
        name = SYM_RU.get(code, code); bar = "█" * max(1, round(10*n/mx))
        rows.append([Paragraph(name, ParagraphStyle("s", fontName=_FONT, fontSize=10, textColor=INK)),
                     Paragraph(f'<font color="#C25E76">{bar}</font>', ParagraphStyle("b", fontName=_FONT, fontSize=10)),
                     Paragraph(f"{n}", ParagraphStyle("n", fontName=_FONT, fontSize=10, textColor=INKMID))])
    t = Table(rows, colWidths=[w*0.4, w*0.45, w*0.15])
    t.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"MIDDLE"),("TOPPADDING",(0,0),(-1,-1),2),("BOTTOMPADDING",(0,0),(-1,-1),2)]))
    return t


def build_report(meta):
    """meta: name, cycles[list iso], logs[list], st, cycle_len, period_label, date_from, date_to"""
    _fonts()
    buf = io.BytesIO()
    W, H = A4; ml = 16*mm; fw = W - 2*ml
    doc = BaseDocTemplate(buf, pagesize=A4, leftMargin=ml, rightMargin=ml, topMargin=14*mm, bottomMargin=14*mm)
    frame = Frame(ml, 14*mm, fw, H-28*mm, id="f", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    def _bg(canvas, _doc):
        canvas.setFillColor(PAPER); canvas.rect(0, 0, W, H, fill=1, stroke=0)
        canvas.setFillColor(SOFT); canvas.setFont(_FONT, 8)
        canvas.drawString(ml, 8*mm, "Сформировано AIWA. Документ для ориентира, не заменяет консультацию гинеколога.")
        canvas.drawRightString(W-ml, 8*mm, f"стр. {_doc.page}")
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=_bg)])

    def H2(t): return Paragraph(t, ParagraphStyle("h2", fontName=_FONT, fontSize=12, textColor=ROSE, spaceBefore=4, spaceAfter=4, leading=15))
    def P(t): return Paragraph(t, ParagraphStyle("p", fontName=_FONT, fontSize=10, textColor=INK, leading=15))

    st = meta["st"]; cycles = meta.get("cycles", []); logs = meta.get("logs", [])
    story = []
    story.append(Band(fw, "Выписка по менструальному циклу", f"{meta['period_label']} · сформировано {_ru(date.today())}"))
    story.append(Spacer(1, 6*mm))

    lens = []
    for i in range(1, len(cycles)):
        ln = (date.fromisoformat(cycles[i]) - date.fromisoformat(cycles[i-1])).days
        if 15 <= ln <= 60: lens.append(ln)
    avg_len = round(sum(lens)/len(lens)) if lens else meta.get("cycle_len", st["cycle_len"])
    nxt = st.get("next_period")
    story.append(_stat_cards([
        ("Средняя длина", f"{avg_len} дн"),
        ("Отмечено циклов", f"{len(cycles)}"),
        ("Текущая фаза", st["phase_ru"]),
        ("След. месячные", _ru(nxt) if nxt else "-"),
    ], fw))
    story.append(Spacer(1, 6*mm))

    story.append(H2("Длина цикла по времени"))
    story.append(Image(_cycle_chart(cycles), width=fw, height=fw*2.5/7.0))
    story.append(Spacer(1, 4*mm))

    story.append(H2("История отмеченных месячных"))
    if cycles:
        rows = [[P("Дата начала"), P("Длина цикла")]]
        for idx in range(len(cycles)-1, -1, -1):
            dd = date.fromisoformat(cycles[idx])
            ln = "-"
            if idx >= 1:
                ln = f"{(dd - date.fromisoformat(cycles[idx-1])).days} дн"
            rows.append([P(_ru(dd)), P(ln)])
            if len(rows) > 12: break
        t = Table(rows, colWidths=[fw*0.5, fw*0.5])
        t.setStyle(TableStyle([("FONTNAME",(0,0),(-1,-1),_FONT),("FONTSIZE",(0,0),(-1,-1),10),
                               ("TEXTCOLOR",(0,0),(-1,0),colors.white),("BACKGROUND",(0,0),(-1,0),ROSE),
                               ("ROWBACKGROUNDS",(0,1),(-1,-1),[colors.white, CARD]),
                               ("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4),
                               ("LEFTPADDING",(0,0),(-1,-1),6)]))
        story.append(t)
    else:
        story.append(P("Пока нет отмеченных дат."))
    story.append(Spacer(1, 6*mm))

    story.append(H2("Симптомы за период"))
    story.append(_symptom_table(logs, fw))
    story.append(Spacer(1, 6*mm))

    en = [lg["energy"] for lg in logs if lg.get("energy")]
    if en:
        ENR = {1: "низкая", 2: "средняя", 3: "высокая"}
        avg_en = round(sum(en)/len(en))
        story.append(P(f"Средняя энергия за период: {ENR.get(avg_en,'')} (по {len(en)} отметкам)."))
        story.append(Spacer(1, 4*mm))

    story.append(H2("Рекомендации на текущую фазу"))
    c = st["content"]
    story.append(P(f"<b>Фаза:</b> {st['subphase']} {st['phase_ru'].lower()}, день {st['day']} из {st['cycle_len']}."))
    story.append(P(f"<b>Тело:</b> {c['general']}"))
    story.append(P(f"<b>Питание:</b> {c['food']}"))
    story.append(P(f"<b>Нагрузка:</b> {c['training']}"))

    doc.build(story)
    buf.seek(0); return buf.getvalue()


def period_since(label):
    today = date.today()
    if label == "3": return (today - timedelta(days=92)).isoformat(), "Последние 3 месяца"
    if label == "6": return (today - timedelta(days=183)).isoformat(), "Последние 6 месяцев"
    return None, "Весь период"
