# -*- coding: utf-8 -*-
"""Инфографика цикла: кольцо фаз + календарь месяца. Рисуется на лету (Pillow)."""
import io, math, os, calendar
from datetime import date
from PIL import Image, ImageDraw, ImageFont
import cycle as C

PAPER=(250,245,242); INK=(33,28,26); SOFT=(168,156,147); INKMID=(110,99,92)
ROSE=(194,94,118); ROSEWASH=(251,228,233)
COL={"menstrual":(194,94,118),"follicular":(148,169,126),"ovulation":(229,167,52),"luteal":(224,135,154)}
HERE=os.path.dirname(os.path.abspath(__file__))
MONTHS=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"]
WD=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"]
MNOM=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]

def _f(name,size):
    for p in (os.path.join(HERE,"assets",name),
              "/usr/share/fonts/truetype/dejavu/"+name,
              "/usr/local/lib/python3.10/dist-packages/matplotlib/mpl-data/fonts/ttf/"+name):
        if os.path.exists(p):
            return ImageFont.truetype(p,size)
    return ImageFont.load_default()

def render_cycle(last_period: date, cycle_len: int, today: date) -> bytes:
    W,H=720,950
    img=Image.new("RGB",(W,H),PAPER); d=ImageDraw.Draw(img)
    f_eye=_f("DejaVuSans-Bold.ttf",22); f_sm=_f("DejaVuSans.ttf",20)
    f_h=_f("DejaVuSerif.ttf",34); f_big=_f("DejaVuSerif.ttf",92)
    f_lab=_f("DejaVuSans-Bold.ttf",15); f_pill=_f("DejaVuSans-Bold.ttf",20)
    f_day=_f("DejaVuSans-Bold.ttf",19); f_wd=_f("DejaVuSans-Bold.ttf",15); f_leg=_f("DejaVuSans.ttf",16)

    st=C.cycle_status(last_period,cycle_len,today)
    d.text((40,32),"AIWA",font=f_eye,fill=ROSE)
    d.text((W-40,36),f"{today.day} {MONTHS[today.month-1]}",font=f_sm,fill=SOFT,anchor="ra")
    d.text((40,64),"Твой цикл сегодня",font=f_h,fill=INK)

    cx,cy,R,wd=W//2,330,150,26
    box=[cx-R,cy-R,cx+R,cy+R]
    ov=max(12,cycle_len-14)
    for name,fday,tday in (("menstrual",0,5),("follicular",5,ov),("ovulation",ov,ov+3),("luteal",ov+3,cycle_len)):
        d.arc(box,270+fday/cycle_len*360,270+tday/cycle_len*360,fill=COL[name],width=wd)
    am=math.radians(270+st["day"]/cycle_len*360)
    mx,my=cx+R*math.cos(am),cy+R*math.sin(am)
    d.ellipse([mx-13,my-13,mx+13,my+13],fill=(255,255,255),outline=ROSE,width=6)
    d.text((cx,cy-42),"ДЕНЬ ЦИКЛА",font=f_lab,fill=SOFT,anchor="mm")
    d.text((cx,cy+12),str(st["day"]),font=f_big,fill=INK,anchor="mm")

    py=cy+R+40
    tw=d.textlength(st["phase_ru"],font=f_pill)
    d.rounded_rectangle([40,py,40+tw+34,py+38],radius=19,fill=ROSEWASH)
    d.text((57,py+19),st["phase_ru"],font=f_pill,fill=ROSE,anchor="lm")
    d.text((40+tw+52,py+19),f"Месячные через ~{st['days_to_next']} дн.",font=f_sm,fill=INKMID,anchor="lm")

    cal_top=py+72
    d.text((40,cal_top),MNOM[today.month-1],font=f_lab,fill=INK)
    gtop=cal_top+30; cols=7; cw=(W-80)/cols; ch=46
    for i,w in enumerate(WD):
        d.text((40+cw*i+cw/2,gtop),w,font=f_wd,fill=SOFT,anchor="mm")
    fwd=date(today.year,today.month,1).weekday()
    dim=calendar.monthrange(today.year,today.month)[1]; ry=gtop+28
    for day in range(1,dim+1):
        idx=fwd+day-1; x=40+cw*(idx%7)+cw/2; y=ry+(idx//7)*ch+ch/2
        dd=date(today.year,today.month,day); cyd=((dd-last_period).days%cycle_len)+1
        ph=C.phase_for_day(cyd,cycle_len); r=16
        if dd==today:
            d.ellipse([x-r,y-r,x+r,y+r],fill=INK); d.text((x,y),str(day),font=f_day,fill=(255,255,255),anchor="mm")
        else:
            fut=dd>today
            d.ellipse([x-r,y-r,x+r,y+r],outline=COL[ph],width=3)
            d.text((x,y),str(day),font=f_day,fill=SOFT if fut else INK,anchor="mm")

    rows=((fwd+dim-1)//7)+1; ly=ry+rows*ch+22
    items=[("Менструальная","menstrual"),("Фолликулярная","follicular"),("Овуляторная","ovulation"),("Лютеиновая","luteal")]
    for n,(nm,key) in enumerate(items):
        col=n%2; rr=n//2; lx=40+col*330; yy=ly+rr*30
        d.ellipse([lx,yy,lx+14,yy+14],fill=COL[key]); d.text((lx+20,yy+7),nm,font=f_leg,fill=INKMID,anchor="lm")

    buf=io.BytesIO(); img.save(buf,"PNG"); return buf.getvalue()

if __name__=="__main__":
    open("/tmp/pwapp/anim/info_test.png","wb").write(render_cycle(date(2026,5,25),29,date(2026,6,17)))
    print("wrote info_test.png")
