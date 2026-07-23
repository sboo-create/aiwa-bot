# -*- coding: utf-8 -*-
"""Инфографика цикла: кольцо фаз + календарь месяца. Рисуется на лету (Pillow), 3x супер-сэмплинг для гладкости."""
import io, math, os, calendar
from datetime import date
from PIL import Image, ImageDraw, ImageFont
import cycle as C

PAPER=(250,245,242); INK=(33,28,26); SOFT=(168,156,147); INKMID=(110,99,92)
ROSE=(194,94,118); ROSEWASH=(251,228,233)
COL={"menstrual":(194,94,118),"follicular":(148,169,126),"ovulation":(229,167,52),"luteal":(224,135,154)}
HERE=os.path.dirname(os.path.abspath(__file__))
MONTHS=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"]
MNOM=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]
WD=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"]
S=3  # supersample factor

GOLOS=os.path.join(HERE,"assets","GolosText.ttf")
def _f(name,size):
    """Единый шрифт всех картинок: Golos Text (русский, OFL), вес из имени. Фолбэк DejaVu."""
    w=700 if "Bold" in name else (600 if "Serif" in name else 400)
    if os.path.exists(GOLOS):
        try:
            f=ImageFont.truetype(GOLOS,int(size*S))
            try: f.set_variation_by_axes([w])
            except Exception: pass
            return f
        except Exception: pass
    for p in (os.path.join(HERE,"assets",name),"/usr/share/fonts/truetype/dejavu/"+name):
        if os.path.exists(p): return ImageFont.truetype(p,int(size*S))
    return ImageFont.load_default()

def _seg(d, cx, cy, R, a0, a1, color, w):
    """Сегмент кольца плоскими концами, с лёгким перекрытием чтобы не было швов."""
    d.arc([cx-R,cy-R,cx+R,cy+R], a0, a1+1.4, fill=color, width=w)

def render_cycle(last_period: date, cycle_len: int, today: date) -> bytes:
    W,H=720,950
    img=Image.new("RGB",(W*S,H*S),PAPER); d=ImageDraw.Draw(img)
    def X(v): return v*S
    f_eye=_f("DejaVuSans-Bold.ttf",22); f_sm=_f("DejaVuSans.ttf",20)
    f_h=_f("DejaVuSerif.ttf",34); f_big=_f("DejaVuSerif.ttf",92)
    f_lab=_f("DejaVuSans-Bold.ttf",15); f_pill=_f("DejaVuSans-Bold.ttf",20)
    f_day=_f("DejaVuSans-Bold.ttf",19); f_wd=_f("DejaVuSans-Bold.ttf",15); f_leg=_f("DejaVuSans.ttf",16)

    st=C.cycle_status(last_period,cycle_len,today)
    d.text((X(40),X(32)),"AIWA",font=f_eye,fill=ROSE)
    d.text((X(W-40),X(36)),f"{today.day} {MONTHS[today.month-1]}",font=f_sm,fill=SOFT,anchor="ra")
    d.text((X(40),X(64)),"Твой цикл сегодня",font=f_h,fill=INK)

    cx,cy,R,wd=X(W//2),X(330),X(150),X(26)
    ov=max(12,cycle_len-14)
    for name,fday,tday in (("menstrual",0,5),("follicular",5,ov),("ovulation",ov,ov+3),("luteal",ov+3,cycle_len)):
        _seg(d,cx,cy,R,270+fday/cycle_len*360,270+tday/cycle_len*360,COL[name],wd)
    am=math.radians(270+st["day"]/cycle_len*360)
    mx,my=cx+R*math.cos(am),cy+R*math.sin(am); mr=X(15)
    d.ellipse([mx-mr,my-mr,mx+mr,my+mr],fill=(255,255,255),outline=ROSE,width=X(6))
    d.text((cx,cy-X(42)),"ДЕНЬ ЦИКЛА",font=f_lab,fill=SOFT,anchor="mm")
    d.text((cx,cy+X(12)),str(st["day"]),font=f_big,fill=INK,anchor="mm")

    py=X(330)+R//1+X(40)
    py=X(330+150+40)
    tw=d.textlength(st["phase_ru"],font=f_pill)
    d.rounded_rectangle([X(40),py,X(40)+tw+X(34),py+X(38)],radius=X(19),fill=ROSEWASH)
    d.text((X(57),py+X(19)),st["phase_ru"],font=f_pill,fill=ROSE,anchor="lm")
    d.text((X(40)+tw+X(52),py+X(19)),f"Месячные через ~{st['days_to_next']} дн.",font=f_sm,fill=INKMID,anchor="lm")

    cal_top=py+X(72)
    d.text((X(40),cal_top),MNOM[today.month-1],font=f_lab,fill=INK)
    gtop=cal_top+X(30); cw=(W-80)/7*S; ch=X(46)
    for i,w in enumerate(WD):
        d.text((X(40)+cw*i+cw/2,gtop),w,font=f_wd,fill=SOFT,anchor="mm")
    fwd=date(today.year,today.month,1).weekday()
    dim=calendar.monthrange(today.year,today.month)[1]; ry=gtop+X(28)
    for day in range(1,dim+1):
        idx=fwd+day-1; x=X(40)+cw*(idx%7)+cw/2; y=ry+(idx//7)*ch+ch/2
        dd=date(today.year,today.month,day); cyd=((dd-last_period).days%cycle_len)+1
        ph=C.phase_for_day(cyd,cycle_len); r=X(16)
        if dd==today:
            d.ellipse([x-r,y-r,x+r,y+r],fill=INK); d.text((x,y),str(day),font=f_day,fill=(255,255,255),anchor="mm")
        else:
            fut=dd>today
            d.ellipse([x-r,y-r,x+r,y+r],outline=COL[ph],width=X(3))
            d.text((x,y),str(day),font=f_day,fill=SOFT if fut else INK,anchor="mm")

    rows=((fwd+dim-1)//7)+1; ly=ry+rows*ch+X(22)
    for n,(nm,key) in enumerate([("Менструальная","menstrual"),("Фолликулярная","follicular"),("Овуляторная","ovulation"),("Лютеиновая","luteal")]):
        lx=X(40)+(n%2)*X(330); yy=ly+(n//2)*X(30)
        d.ellipse([lx,yy,lx+X(14),yy+X(14)],fill=COL[key]); d.text((lx+X(20),yy+X(7)),nm,font=f_leg,fill=INKMID,anchor="lm")

    img=img.resize((W,H),Image.LANCZOS)
    buf=io.BytesIO(); img.save(buf,"PNG"); return buf.getvalue()


def render_delay(st):
    W,H=720,540; S2=S
    img=Image.new("RGB",(W*S2,H*S2),PAPER); d=ImageDraw.Draw(img)
    def X(v): return v*S2
    f=_f
    f_eye=f("DejaVuSans-Bold.ttf",22); f_sm=f("DejaVuSans.ttf",20)
    f_h=f("DejaVuSerif.ttf",34); f_big=f("DejaVuSerif.ttf",80); f_t=f("DejaVuSans.ttf",19)
    d.text((X(40),X(34)),"AIWA",font=f_eye,fill=ROSE)
    titles={"due":"Месячные ожидаются","delay":"Задержка","stale":"Данные устарели"}
    d.text((X(40),X(70)),titles.get(st["status"],"Цикл"),font=f_h,fill=INK)
    num = st["delay_days"] if st["status"]=="delay" else st["days_since"]
    # бейдж с числом
    cx,cy,r=X(W//2),X(250),X(95)
    d.ellipse([cx-r,cy-r,cx+r,cy+r],fill=ROSEWASH)
    d.text((cx,cy-X(20)),str(num),font=f_big,fill=ROSEDEEP if False else (158,66,87),anchor="mm")
    d.text((cx,cy+X(40)),"дней",font=f_sm,fill=SOFT,anchor="mm")
    advice={"due":"Если месячные начались, отметь реальные дни. При риске беременности тест информативен с 1 дня задержки.",
            "delay":"Если был незащищённый секс, сначала исключаем беременность: тест на ХГЧ, при отрицательном повтор через несколько дней.",
            "stale":"Обнови календарь. Если месячных нет 3 цикла подряд или появились тревожные симптомы, лучше к гинекологу."}
    # перенос строки
    import textwrap
    y=X(380)
    for line in textwrap.wrap(advice.get(st["status"],""), width=46):
        d.text((X(40),y),line,font=f_t,fill=INKMID); y+=X(28)
    img=img.resize((W,H),Image.LANCZOS)
    buf=io.BytesIO(); img.save(buf,"PNG"); return buf.getvalue()


def render_general_summary(mode, today, pregnancy=None):
    """Карточка утренней сводки для режимов, где фазу цикла не прогнозируем."""
    W,H=720,540
    img=Image.new("RGB",(W*S,H*S),PAPER); d=ImageDraw.Draw(img)
    def X(v): return int(v*S)
    f_eye=_f("DejaVuSans-Bold.ttf",22); f_date=_f("DejaVuSans.ttf",20)
    f_h=_f("DejaVuSerif.ttf",38); f_big=_f("DejaVuSerif.ttf",58)
    f_sm=_f("DejaVuSans.ttf",21); f_lab=_f("DejaVuSans-Bold.ttf",15)

    cards={
        "irregular": ("Нерегулярный цикл", "Сегодня", "Опираемся на самочувствие и отметки,\nа не на прогноз фазы цикла."),
        "meno": ("Менопауза", "Сегодня", "В фокусе сон, энергия, настроение\nи другие отмеченные симптомы."),
        "none": ("Без месячных", "Сегодня", "Фазу цикла не прогнозируем.\nСводка учитывает твои отметки."),
        "preg": ("Беременность", "Сегодня", "Сводка учитывает срок беременности\nи сегодняшнее самочувствие."),
    }
    title,big,note=cards.get(mode,cards["none"])
    if mode=="preg" and pregnancy:
        week=max(1,int(pregnancy.get("week") or 1))
        trimester=max(1,int(pregnancy.get("trimester") or 1))
        big=f"{week} неделя"
        note=f"{trimester} триместр. Сводка учитывает срок\nбеременности и самочувствие."

    d.text((X(40),X(34)),"AIWA",font=f_eye,fill=ROSE)
    d.text((X(W-40),X(38)),f"{today.day} {MONTHS[today.month-1]}",font=f_date,fill=SOFT,anchor="ra")
    d.text((X(40),X(78)),title,font=f_h,fill=INK)

    d.rounded_rectangle([X(40),X(150),X(W-40),X(350)],radius=X(34),fill=ROSEWASH)
    d.text((X(W//2),X(202)),"СВОДКА НА СЕГОДНЯ",font=f_lab,fill=ROSE,anchor="mm")
    d.text((X(W//2),X(265)),big,font=f_big,fill=INK,anchor="mm")

    y=X(394)
    for line in note.splitlines():
        d.text((X(40),y),line,font=f_sm,fill=INKMID)
        y+=X(31)
    d.text((X(40),X(500)),"Открой сводку, чтобы увидеть рекомендации на день.",font=f_sm,fill=INK)

    img=img.resize((W,H),Image.LANCZOS)
    buf=io.BytesIO(); img.save(buf,"PNG"); return buf.getvalue()


def render_summary_card(mode, today, facts=None, cycle=None, pregnancy=None, variant=None):
    """Render one of three stable daily-card templates.

    The date deterministically rotates the template, so repeated renders on the
    same day are identical.  All numbers come from application state; ``facts``
    are selected from the reviewed catalogue in ``llm.py``.
    """
    import textwrap
    W,H=720,1040
    mode=mode or "none"
    variant=(today.toordinal()+(1 if mode=="preg" else 0))%3 if variant is None else int(variant)%3
    accent=(105,126,91) if mode=="preg" else ROSE
    wash=(236,239,229) if mode=="preg" else ROSEWASH
    apricot=(232,139,72)
    palettes=[
        (accent,wash,(242,239,231)),
        ((177,103,119) if mode!="preg" else (119,139,102),(249,235,229),(235,239,228)),
        ((202,116,83) if mode!="preg" else (103,133,113),(246,231,226),(239,235,218)),
    ]
    accent,wash,soft2=palettes[variant]
    img=Image.new("RGB",(W*S,H*S),PAPER); d=ImageDraw.Draw(img)
    def X(v): return int(v*S)
    f_brand=_f("DejaVuSerif.ttf",34); f_date=_f("DejaVuSans.ttf",18)
    f_title=_f("DejaVuSans.ttf",28); f_metric=_f("DejaVuSerif.ttf",54)
    f_label=_f("DejaVuSans-Bold.ttf",14); f_fact=_f("DejaVuSans.ttf",17)
    f_num=_f("DejaVuSans-Bold.ttf",17); f_small=_f("DejaVuSans.ttf",15)

    title="Сегодня"
    metric="Персональная сводка"
    metric_label="САМОЧУВСТВИЕ"
    status=""
    if mode=="cycle" and cycle:
        day=max(1,int(cycle.get("day") or 1))
        phase=str(cycle.get("phase_ru") or "Фаза цикла")
        left=max(0,int(cycle.get("days_to_next") or 0))
        title=f"Сегодня — {day} день цикла"
        metric=phase+" фаза"
        metric_label="ПРОГНОЗИРУЕМАЯ ФАЗА"
        status=f"До месячных ориентировочно ~{left} дн."
    elif mode=="preg" and pregnancy:
        week=max(1,int(pregnancy.get("week") or 1))
        tri=max(1,int(pregnancy.get("trimester") or 1))
        left=max(0,int(pregnancy.get("days_left") or 0))
        title=f"Сегодня — {week} неделя"
        metric=("I" if tri==1 else "II" if tri==2 else "III")+" триместр"
        metric_label="СРОК БЕРЕМЕННОСТИ"
        status=f"До ПДР ориентировочно ~{left} дн."
    elif mode=="meno":
        title="Самочувствие сегодня"; metric="Менопауза"; metric_label="БЕЗ ПРОГНОЗА ФАЗЫ"
    elif mode=="irregular":
        title="Самочувствие сегодня"; metric="Нерегулярный цикл"; metric_label="БЕЗ ПРОГНОЗА ФАЗЫ"

    clean=[]
    for value in facts or []:
        value=" ".join(str(value or "").split()).strip(" •-")
        if value and value not in clean and len(value)<=110:
            clean.append(value)
        if len(clean)>=3: break
    fallbacks={
        "cycle":["Ориентируйся на сегодняшнее самочувствие","Выбирай привычную нагрузку без работы через боль","Оставь время на сон, еду и восстановление"],
        "preg":["Ориентируйся на самочувствие и рекомендации врача","Выбирай привычное спокойное движение без перегрузки","При новых или сильных симптомах свяжись с врачом"],
    }
    for fact in fallbacks.get(mode,["Ориентируйся на сегодняшнее самочувствие"]):
        if len(clean)>=3: break
        if fact not in clean: clean.append(fact)

    # Shared paper texture and calm organic shapes from the approved references.
    d.ellipse([X(-140),X(-110),X(260),X(250)],fill=(247,232,225))
    d.ellipse([X(520),X(-120),X(850),X(235)],fill=soft2)
    d.ellipse([X(-150),X(845),X(250),X(1160)],fill=soft2)
    d.ellipse([X(525),X(850),X(850),X(1160)],fill=(248,229,221))
    d.text((X(42),X(42)),"AIWA",font=f_brand,fill=INK)
    d.text((X(W-42),X(54)),f"{today.day} {MONTHS[today.month-1]}",font=f_date,fill=INKMID,anchor="ra")

    if variant==0:
        # Reference A: generous hero plus three editorial columns.
        d.rounded_rectangle([X(42),X(135),X(W-42),X(475)],radius=X(34),fill=(255,250,247),outline=wash,width=X(2))
        d.text((X(W//2),X(188)),title,font=f_title,fill=INK,anchor="mm")
        d.text((X(W//2),X(260)),metric,font=f_metric,fill=accent,anchor="mm")
        d.text((X(W//2),X(320)),metric_label,font=f_label,fill=accent,anchor="mm")
        if status:
            d.rounded_rectangle([X(120),X(366),X(W-120),X(438)],radius=X(35),fill=accent)
            d.text((X(W//2),X(402)),status,font=f_num,fill=(255,255,255),anchor="mm")
        d.text((X(42),X(515)),"СЕГОДНЯ ВАЖНО",font=f_label,fill=INKMID)
        gap=12; cw=(W-84-gap*2)//3
        for i,fact in enumerate(clean[:3]):
            x=42+i*(cw+gap)
            fill=(255,246,243) if i==0 else ((246,248,240) if i==1 else (255,247,237))
            d.rounded_rectangle([X(x),X(552),X(x+cw),X(850)],radius=X(24),fill=fill,outline=wash,width=X(1))
            d.ellipse([X(x+cw//2-24),X(584),X(x+cw//2+24),X(632)],fill=wash)
            d.text((X(x+cw//2),X(608)),str(i+1),font=f_num,fill=accent,anchor="mm")
            lines=textwrap.wrap(fact,width=20,break_long_words=False,break_on_hyphens=False)[:6]
            y=674-(len(lines)-3)*10
            for line in lines:
                d.text((X(x+cw//2),X(y)),line,font=f_fact,fill=INK,anchor="mm"); y+=27
    elif variant==1:
        # Reference B: asymmetrical editorial stripe and stacked insights.
        d.rounded_rectangle([X(42),X(140),X(W-42),X(380)],radius=X(34),fill=wash)
        d.rounded_rectangle([X(42),X(140),X(62),X(380)],radius=X(10),fill=accent)
        d.text((X(88),X(190)),metric_label,font=f_label,fill=accent)
        d.text((X(88),X(238)),title,font=f_title,fill=INK)
        d.text((X(88),X(302)),metric,font=f_metric,fill=INK)
        if status: d.text((X(88),X(354)),status,font=f_num,fill=accent)
        d.text((X(42),X(430)),"ТРИ ОРИЕНТИРА НА ДЕНЬ",font=f_label,fill=INKMID)
        y=470
        for i,fact in enumerate(clean[:3]):
            fill=(255,249,246) if i%2==0 else (245,248,240)
            d.rounded_rectangle([X(42),X(y),X(W-42),X(y+126)],radius=X(24),fill=fill)
            d.ellipse([X(62),X(y+36),X(112),X(y+86)],fill=wash)
            d.text((X(87),X(y+61)),str(i+1),font=f_num,fill=accent,anchor="mm")
            lines=textwrap.wrap(fact,width=48,break_long_words=False,break_on_hyphens=False)[:3]
            ty=y+36
            for line in lines:
                d.text((X(138),X(ty)),line,font=f_fact,fill=INK); ty+=28
            y+=142
    else:
        # Reference C: circular status seal and compact numbered cards.
        d.text((X(42),X(150)),title,font=f_title,fill=INK)
        cx,cy=X(W//2),X(330); rr=X(154)
        d.ellipse([cx-rr,cy-rr,cx+rr,cy+rr],fill=wash)
        d.text((cx,X(285)),metric_label,font=f_label,fill=accent,anchor="mm")
        metric_lines=textwrap.wrap(metric,width=18,break_long_words=False)
        my=330-(len(metric_lines)-1)*28
        for line in metric_lines:
            d.text((cx,X(my)),line,font=f_metric,fill=INK,anchor="mm"); my+=58
        if status: d.text((cx,X(414)),status,font=f_small,fill=accent,anchor="mm")
        d.text((X(42),X(530)),"СЕГОДНЯ ВАЖНО",font=f_label,fill=INKMID)
        y=570
        for i,fact in enumerate(clean[:3]):
            d.rounded_rectangle([X(42),X(y),X(W-42),X(y+105)],radius=X(52),fill=(255,250,247))
            d.ellipse([X(58),X(y+18),X(127),X(y+87)],fill=(wash if i<2 else (249,230,216)))
            d.text((X(92),X(y+52)),str(i+1),font=f_num,fill=(accent if i<2 else apricot),anchor="mm")
            lines=textwrap.wrap(fact,width=48,break_long_words=False,break_on_hyphens=False)[:3]
            ty=y+26
            for line in lines:
                d.text((X(150),X(ty)),line,font=f_fact,fill=INK); ty+=27
            y+=120

    footer="Прогноз цикла ориентировочный · не метод контрацепции" if mode=="cycle" else "Срок рассчитан по данным профиля · рекомендации обновляются"
    d.text((X(W//2),X(H-48)),footer,font=f_small,fill=SOFT,anchor="mm")
    img=img.resize((W,H),Image.LANCZOS)
    buf=io.BytesIO(); img.save(buf,"PNG"); return buf.getvalue()


def render_menu(data, phase_ru="Лютеиновая", target_kcal=None):
    """Карточка питания на день. Единый рендер (3x супер-сэмплинг), длинный текст обрезается, а не вылезает."""
    W=720
    meals=data.get("meals",[])[:4]; H=300+len(meals)*92
    img=Image.new("RGB",(W*S,H*S),PAPER); d=ImageDraw.Draw(img)
    def X(v): return int(v*S)
    f_eye=_f("DejaVuSans-Bold.ttf",22); f_h=_f("DejaVuSerif.ttf",32)
    f_ml=_f("DejaVuSans-Bold.ttf",17); f_mv=_f("DejaVuSerif.ttf",28)
    f_t=_f("DejaVuSans-Bold.ttf",13); f_dish=_f("DejaVuSans-Bold.ttf",18); f_note=_f("DejaVuSans.ttf",15)
    def fit(text,font,maxw_pt):
        maxw=X(maxw_pt); text=str(text)
        if d.textlength(text,font=font)<=maxw: return text
        while text and d.textlength(text+"…",font=font)>maxw: text=text[:-1]
        return (text.rstrip()+"…") if text else text
    d.text((X(40),X(34)),"AIWA",font=f_eye,fill=ROSE)
    d.text((X(40),X(66)),"Питание на сегодня",font=f_h,fill=INK)
    if target_kcal:
        d.text((X(W-40),X(82)),f"~{target_kcal} ккал/день",font=_f("DejaVuSans-Bold.ttf",17),fill=ROSE,anchor="rm")
    m=data.get("macros",{}); items=[("Белок",m.get("protein","")),("Жиры",m.get("fat","")),("Углеводы",m.get("carbs",""))]
    bw=(W-80-2*14)/3; bx=40; by=120
    for lab,val in items:
        d.rounded_rectangle([X(bx),X(by),X(bx+bw),X(by+86)],radius=X(16),fill=(246,238,232))
        d.text((X(bx+bw/2),X(by+24)),lab,font=f_ml,fill=SOFT,anchor="mm")
        d.text((X(bx+bw/2),X(by+58)),fit(val,f_mv,bw-12),font=f_mv,fill=INK,anchor="mm")
        bx+=bw+14
    tints=[(251,228,233),(230,235,221),(251,239,203),(246,238,232)]
    y=235; tx=112; maxw=W-tx-40
    for i,meal in enumerate(meals):
        d.rounded_rectangle([X(40),X(y),X(40+56),X(y+56)],radius=X(14),fill=tints[i%4])
        d.text((X(tx),X(y+2)),str(meal.get("time","")),font=f_t,fill=SOFT)
        d.text((X(tx),X(y+22)),fit(meal.get("dish",""),f_dish,maxw),font=f_dish,fill=INK)
        note=str(meal.get("note","")); kcal=str(meal.get("kcal",""))
        sub=(note+(" · "+kcal if kcal else "")).strip(" ·")
        d.text((X(tx),X(y+48)),fit(sub,f_note,maxw),font=f_note,fill=INKMID)
        y+=92
    img=img.resize((W,H),Image.LANCZOS)
    buf=io.BytesIO(); img.save(buf,"PNG"); return buf.getvalue()

def training_plan(st):
    ph=st["phase"]; sub=st["subphase"]
    if ph=="menstrual":
        return 2,"низкая",["Ходьба 20-30 мин","Мягкая йога","Растяжка","Дыхание"],["Силовые рекорды","Прыжки и рывки"]
    if ph=="follicular":
        return 4,"выше средней",["Силовая тренировка","Бодрое кардио","Пилатес","Новые нагрузки"],["Резкий скачок веса"]
    if ph=="ovulation":
        return 4,"активная",["Силовая активнее","Танцы или сайкл","Функциональная","Бодрая прогулка"],["Рывки без разминки"]
    if sub=="поздняя":
        return 2,"низкая",["Йога и пилатес","Плавание","Ходьба","Лёгкая мобилизация"],["Тяжёлые максимумы","Длинное интенсивное кардио"]
    return 3,"средняя",["Умеренные силовые","Кардио в темпе","Пилатес","Велотренажёр"],["Личные рекорды","Тренировка через усталость"]

def render_training(st):
    """Отдельная карточка нагрузки: интенсивность под фазу, что подходит и что отложить."""
    W,H=720,640
    img=Image.new("RGB",(W*S,H*S),PAPER); d=ImageDraw.Draw(img)
    def X(v): return int(v*S)
    acc=COL.get(st["phase"],ROSE)
    f_eye=_f("DejaVuSans-Bold.ttf",22); f_h=_f("DejaVuSerif.ttf",34); f_sm=_f("DejaVuSans.ttf",20)
    f_pill=_f("DejaVuSans-Bold.ttf",20); f_lab=_f("DejaVuSans-Bold.ttf",16); f_big=_f("DejaVuSerif.ttf",30)
    f_item=_f("DejaVuSans.ttf",19); f_col=_f("DejaVuSans-Bold.ttf",18)
    d.text((X(40),X(34)),"AIWA",font=f_eye,fill=ROSE)
    d.text((X(40),X(66)),"Нагрузка сегодня",font=f_h,fill=INK)
    # пилюля фазы
    py=X(120); tw=d.textlength(st["phase_ru"],font=f_pill)
    d.rounded_rectangle([X(40),py,X(40)+tw+X(34),py+X(38)],radius=X(19),fill=ROSEWASH)
    d.text((X(57),py+X(19)),st["phase_ru"],font=f_pill,fill=ROSE,anchor="lm")
    d.text((X(40)+tw+X(52),py+X(19)),f"день {st['day']} из {st['cycle_len']}, под-фаза {st['subphase']}",font=f_sm,fill=INKMID,anchor="lm")
    lvl,word,do,avoid=training_plan(st)
    # шкала интенсивности
    gy=X(188); d.text((X(40),gy),"ИНТЕНСИВНОСТЬ",font=f_lab,fill=SOFT)
    bx=X(40); bw=X(116); bh=X(20); gap=X(12); by=gy+X(28)
    for i in range(5):
        on=i<lvl
        d.rounded_rectangle([bx,by,bx+bw,by+bh],radius=X(8),fill=acc if on else (236,229,224))
        bx+=bw+gap
    d.text((X(40)+5*bw+5*gap-gap+X(0),by-X(2)) if False else (X(W-40),by+bh/2),word,font=f_big,fill=acc,anchor="rm")
    # две колонки
    cy=by+X(70); colw=X(320)
    d.text((X(40),cy),"Сегодня подходит",font=f_col,fill=(74,122,86))
    d.text((X(40)+colw+X(20),cy),"Лучше отложить",font=f_col,fill=(176,86,96))
    iy=cy+X(40)
    for i in range(max(len(do),len(avoid))):
        if i<len(do):
            d.ellipse([X(40),iy+X(7),X(40)+X(9),iy+X(16)],fill=(120,170,130))
            d.text((X(40)+X(20),iy),do[i],font=f_item,fill=INK)
        if i<len(avoid):
            xx=X(40)+colw+X(20)
            d.text((xx,iy),"×",font=f_col,fill=(196,110,118))
            d.text((xx+X(22),iy),avoid[i],font=f_item,fill=INKMID)
        iy+=X(40)
    img=img.resize((W,H),Image.LANCZOS)
    buf=io.BytesIO(); img.save(buf,"PNG"); return buf.getvalue()

if __name__=="__main__":
    import tempfile
    with tempfile.NamedTemporaryFile(prefix="aiwa-cycle-", suffix=".png", delete=False) as fh:
        fh.write(render_cycle(date(2026,5,25),29,date(2026,6,17)))
        print("wrote", fh.name)
