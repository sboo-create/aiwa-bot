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

def _f(name,size):
    for p in (os.path.join(HERE,"assets",name),
              "/usr/share/fonts/truetype/dejavu/"+name,
              "/usr/local/lib/python3.10/dist-packages/matplotlib/mpl-data/fonts/ttf/"+name):
        if os.path.exists(p): return ImageFont.truetype(p,size*S)
    return ImageFont.load_default()

def _arc_round(d, cx, cy, R, a0, a1, color, w):
    """Дуга со скруглёнными концами: сама дуга + круги-капы на концах."""
    box=[cx-R,cy-R,cx+R,cy+R]
    d.arc(box,a0,a1,fill=color,width=w)
    for a in (a0,a1):
        rad=math.radians(a); x=cx+R*math.cos(rad); y=cy+R*math.sin(rad)
        d.ellipse([x-w/2,y-w/2,x+w/2,y+w/2],fill=color)

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
        _arc_round(d,cx,cy,R,270+fday/cycle_len*360,270+tday/cycle_len*360,COL[name],wd)
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

if __name__=="__main__":
    open("/tmp/pwapp/anim/info_v2.png","wb").write(render_cycle(date(2026,5,25),29,date(2026,6,17)))
    print("wrote info_v2.png")
