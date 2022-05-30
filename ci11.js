class _rgb {
    constructor() {
    this.temp=0;
        this.red = 1;
        this.green = 1;
        this.blue = 1;
        this.black = 1;
        this.bw=0;
        this.pixel=[0,0,0];
    }

    r() { return Math.round(this.pixel[0]*this.red*this.black+(this.bw<0?this.pixel[0]:255-main_rgb.pixel[0])*this.bw) }
    g() { return Math.round(this.pixel[1]*this.green*this.black+(this.bw<0?this.pixel[1]:255-main_rgb.pixel[1])*this.bw) }
    b() { return Math.round(this.pixel[2]*this.blue*this.black+(this.bw<0?this.pixel[2]:255-main_rgb.pixel[2])*this.bw) }
    c() { return `rgb(${this.r()},${this.g()},${this.b()})`; }
    cc() { return `rgb(${255-this.r()},${255-this.g()},${255-this.b()})`; }
    rgb() { return [this.r(),this.g(),this.b()]; }
    rgbv() { return this.r()+','+this.g()+','+this.b(); }
    rgbgd() { return `linear-gradient(45deg,rgb(0,0,0)5%,${this.c()}45%,${this.c()}55%,rgb(255,255,255)80%)`; }   
    cgd(i) { return `linear-gradient(to top,rgb(${i==0?255:0},${i==1?255:0},${i==2?255:0})${this.rgb()[i]/255*100}%,rgba(255,255,255,0)${this.rgb()[i]/255*100}%)`; } 
    rgbgc() { return `radial-gradient(${this.c()} 20%,transparent,white)`; }   
}

var main_rgb=new _rgb();
var palettes={};
var millis= new Date().getTime();
var activPalette;
const arrayPointer= {};
arrayPointer[0]=0;
arrayPointer[1]=6;

function palM(e){
  var lx=e.target;
  if(lx.tagName==='PP')lx=lx.parentNode.firstChild;
  var pal = lx.firstChild;
  var x=e.clientX-lx.offsetLeft-pal.clientWidth/2;
  if(x<0)x=0;
  lx=lx.clientWidth-pal.clientWidth;
  if(x<0)x=0;
  if(x>=lx-1)x=lx;
    pal.style.left = x+pal.parentNode.offsetLeft + 'px'; 
    x=Math.round(x/lx*255);
  if(x)fire(4,x); 
}
function colorPressed()
{
  fire(14,main_rgb.rgbv());
}

function createIcon(x,y,z)
{
    x.setAttribute('class','material-icons');
    x.setAttribute('style','font-size:'+z+'px');
    x.innerHTML=y;
    x.style.position='absolute';
}
function cPPicker(x)
{
    var fD= document.createElement('div');
    x.appendChild(fD); 
    var fP = document.createElement('cp');
    var add= document.createElement('i');
    var del= document.createElement('i');
    var pb= document.createElement('ppb');   
    fP.appendChild(add);
    fP.appendChild(del);
    fD.appendChild(fP);
    fD.appendChild(pb);
    fP.setAttribute('class','show');
    createIcon(add,'add',30);
    createIcon(del,'delete',30);
    add.addEventListener('click', function(){addToP(1)});
    del.addEventListener('click', function(){addToP(0)});
    fP.style.width =pb.style.width =x.clientWidth-add.clientWidth-del.clientWidth+'px';  
    var y=fP.offsetLeft+fP.clientWidth;
    add.style.left=y +'px';
    del.style.left=y+add.clientWidth +'px';
    fP.style.marginBottom='5px';
    fD.style.marginBottom='15px';
    for( var i=0; i<8; i++)
    {
      var pp = document.createElement('ppp');
      pp.style.left= i*(fP.clientWidth)/7 -5+ 'px';
      pb.appendChild(pp);
      pp.addEventListener('mousedown',newPointer);
    }
}

function newPointer(e)
{
  var par = document.getElementsByTagName('ppb');
  if(e.target.tagName=='PPP')
  {
    palp =e.target.parentNode.children;
    for (var i=0 ;i<palp.length;i++)
    {
      if(e.target==palp[i])arrayPointer[1]=i;
    }
  }
  window.addEventListener('mousemove', pointermove,false);
}
function cCValue(x)
{
  var psp = document.createElement('psp');
  var ppsp = document.createElement('div');
  var cs = document.createElement('cscs');
  cs.style.width=cs.style.height=x.clientWidth/4+'px';
  psp.appendChild(cs);
  x.appendChild(ppsp);
  createRgbPalette(ppsp,4);
  ppsp.firstChild.addEventListener('mousedown',function(e){window.addEventListener('mousemove',palM);palM(e);})
  ppsp.appendChild(psp);
  psp.style.marginTop='15px';  
  for(var i =0; i<3; i++)
  {
  var pps =document.createElement('cpcp');
  pps.style.marginLeft='15px';
  psp.appendChild(pps);
  pps.addEventListener('mousedown',function(e){
    window.addEventListener('mousemove',splitMove);
    splitMove(e);
  pps.style.backgroundImage=main_rgb.cgd(i);
  });
  }
  cs.addEventListener('mousedown',function(e){
    cs.addEventListener('mousemove',gdMove);
    gdMove(e);
  });
  var pps =document.createElement('color');
  pps.addEventListener('click',colorPressed);
  pps.style.height=x.clientWidth/4+'px';
  cs.style.borderRadius=pps.style.borderRadius='15px';
  psp.appendChild(pps);
  pps.style.width=x.clientWidth-pps.offsetLeft+'px';
  pps.style.marginLeft='15px';
  pps.style.backgroundColor=main_rgb.c();
  pps.innerHTML='<div style="margin:auto;">fill_solid()</div>'
  pps.style.display='flex';
  cs.style.display='block';
  cs.style.backgroundImage=main_rgb.rgbgd(); 
}
function cCir(cir)
{
  cir.width = cir.height=cir.parentNode.clientWidth;  
  var ctx = cir.getContext('2d');
  ctx.translate(cir.clientHeight/2,cir.clientHeight/2);
  ctx.rotate(Math.PI);
  ctx.lineWidth = 2;
  ctx.lineCap = 'round'; 
  var xt=Math.PI*cir.clientHeight;
  for(var i=0; i<xt; i++) 
  {
    var gradient = ctx.createLinearGradient(0,0, cir.clientHeight/5,cir.clientHeight/9*4,0,0);
    ctx.strokeStyle = gradient;
    ctx.save();
    ctx.rotate(Math.PI * i/xt*2);    
    ctx.beginPath();gradient.addColorStop(0, "white");
    var xct=i/xt*360;
    var color = 'hsl('+xct+',100%,90%)';
    gradient.addColorStop(0.05,color);
    color = 'hsl('+xct+',100%,70%)';
    color = 'hsl('+xct+',100%,50%)';
    gradient.addColorStop(0.45, color);
    gradient.addColorStop(0.55, color);
    color = 'hsl('+xct+',100%,25%)';
    gradient.addColorStop(0.7, color);
    color = 'hsl('+xct+',100%,5%)';
    gradient.addColorStop(0.9, "black");
    ctx.moveTo(0, 0);
    ctx.lineTo(0, cir.clientHeight/2);
    ctx.stroke();
    ctx.closePath();   
    ctx.restore();
  }
}
cCir(document.getElementById('farbe'));

function createCircle(parentnode)
{
  d =  parentnode.clientWidth-20;
  if(d>window.innerHeight)d/=2;
  else 
  {
    parentnode.style.margin='auto';
    d =  Math.min(d,window.innerHeight/3);
  }
  var r=d/2;
  parentnode.style.width=d+'px';
  cPShow(parentnode);
  cPPicker(parentnode);
  cCCircle(parentnode);
  cCValue(parentnode);
  if(window.innerHeight<window.innerWidth){
    var daf=document.querySelector('cps');daf.style.marginBottom=daf.style.marginTop=daf.nextSibling.style.marginBottom=(window.innerHeight-parentnode.clientHeight-parentnode.offsetTop)/3+'px';
  }

}
function createRgbPalette(x,i)
  {
    var pointer2=document.createElement("PP");
    var secondP = document.createElement('cp');
    var secondDiv= document.createElement('div');
    var text = `linear-gradient(to right,rgb(0,0,0),rgb(${i<2||i==4?255:0 },${i==0||i==2||i==4?255:0 },${i==0||i==3?255:0 }))`;
    secondP.appendChild(pointer2);
    secondP.style.backgroundImage=text; 
    secondDiv.appendChild(secondP);
    x.appendChild(secondDiv);
    pointer2.style.left=x.offsetLeft+x.clientWidth-pointer2.clientWidth+'px';
  }


var pal, palp;
  
function addToP(x)
{
  if(arrayPointer[1]==0)arrayPointer[1]=1;
  if(arrayPointer[1]>=(palettes.value.length-1))arrayPointer[1]--;
  if(x)
  {
    while(palettes.value[arrayPointer[1]]==palettes.value[arrayPointer[1]-1]-1)arrayPointer[1]--;
    if(palettes.value.length<30)
    {
      for (var i=0;i<palettes.value.length-arrayPointer[1];i++)
      {
        palettes.value[palettes.value.length-i]=palettes.value[palettes.value.length-i-1];
        palettes.position[palettes.value.length-i]=palettes.position[palettes.value.length-i-1];
      }
      palettes.position[arrayPointer[1]+1]=( palettes.position[arrayPointer[1]]+ palettes.position[arrayPointer[1]+2])/2;
      var pP = document.createElement('ppp');
      palp[arrayPointer[1]].after(pP);
      pP.style.left= (palettes.position[arrayPointer[1]+1]-5)/255*(pP.parentNode.clientWidth) +'px';
      pP.addEventListener('mousedown',newPointer);
    }
  }
  else
  {
    if(palettes.value.length>2)
    {
      for (var i=arrayPointer[1];i<palettes.value.length-1;i++)
      {
        palettes.value[i]=palettes.value[i+1];
        palettes.position[i]=palettes.position[i+1];
      }
      palp[arrayPointer[1]].remove();
      palettes.value.length--;
    }
  }
}
function mouseUp(e)
{
  window.removeEventListener('mousemove', cirMove, false);

  document.querySelector('cscs').removeEventListener('mousemove', gdMove, false);
  window.removeEventListener('mousemove',splitMove,false);
  window.removeEventListener('mousemove', paletteMove, false);
  window.removeEventListener('mousemove', pointermove, false);
  window.removeEventListener('mousemove', palM);
  if(e.detail===2){adjustColor();}
}
function paletteMove(e){
  var lx=e.target;
  if(lx.tagName==='PP')lx=lx.parentNode.firstChild;
  var pal = lx.firstChild;
  var x=e.clientX-lx.offsetLeft-pal.clientWidth/2;
  if(x<0)x=0;
  lx=lx.clientWidth-pal.clientWidth;
  if(x<0)x=0;
  if(x>=lx-1)x=lx;
  if(x>=0&&x<=lx&&pal.tagName==='PP')
  {
    pal.style.left = x+pal.parentNode.offsetLeft + 'px';  
    x/=lx;
    if(e.target==document.getElementsByTagName('cp')[7])
      main_rgb.black=x;
    else if(e.target==document.getElementsByTagName('cp')[8])
      main_rgb.red=x;
    else if(e.target==document.getElementsByTagName('cp')[9])
      main_rgb.green=x;
    else(e.target==document.getElementsByTagName('cp')[10])
    main_rgb.blue=x;
    adjustColor();
    main_rgb.bw=0;

  }
}
function adjustColor()
{
    var div = document.getElementById('ColorPointer').style.background=main_rgb.rgbgc();
    palettes.value[arrayPointer[1]]=main_rgb.rgb();
    adjustElements();
}
function adjustElements()
{
    var text='linear-gradient(to right,';
    for (var i in palettes.value)
    {
    text+=`rgb(${palettes.value[i][0]},${palettes.value[i][1]},${palettes.value[i][2]})`;
    text+=palettes.position[i]/255*100+'%';
    if(i<Object.keys(palettes.value).length-1)
    text += ',';
    }
    text += ')';
    document.querySelector('.show').style.backgroundImage=text;
    document.querySelector('cscs').style.backgroundImage=main_rgb.rgbgd();
    document.querySelector('color').style.backgroundColor=main_rgb.c();
    document.querySelector('color').style.color=main_rgb.cc();
    var div = document.querySelectorAll('cpcp');
    for(var i in div)div[i].style.backgroundImage=main_rgb.cgd(i);
}
function pointermove(e)
{
var x=palp[arrayPointer[1]].parentNode;
    var xl=Math.round((e.clientX-x.offsetLeft)/(x.clientWidth)*255);
  if(arrayPointer[1]!=0&&arrayPointer[1]!=palp.length-1)
  {
    if(xl<=palettes.position[arrayPointer[1]-1])arrayPointer[1]-=1;
    else if(xl>palettes.position[arrayPointer[1]+1])arrayPointer[1]+=1;
    if(arrayPointer[1]!=0&&arrayPointer[1]!=palp.length-1)
    {
    if(xl<255)
    palp[arrayPointer[1]].style.left= e.clientX-x.offsetLeft-5+ 'px';
    palettes.position[arrayPointer[1]]=xl;
    }
    }
    adjustElements();
}
function splitMove(e)
{
var div=document.querySelectorAll('cpcp');
var i=0;
while(i<3&&(div[i]!=e.target))i++;
  main_rgb.pixel[i]=  255-((e.clientY+window.scrollY -document.querySelectorAll('cpcp')[i].offsetTop)/document.querySelectorAll('cpcp')[i].clientHeight*255);
  main_rgb.bw=0;
  adjustColor();
}
function gdMove(e){
  main_rgb.bw= (Math.sqrt(2)*(e.target.clientHeight-(e.clientY+window.scrollY-e.target.offsetTop)+(e.clientX -e.target.offsetLeft))/2 -  (Math.sqrt(2)*e.target.clientHeight/2))/e.target.clientHeight*2;
  if(Math.abs(main_rgb.bw)>1)main_rgb.bw/=Math.abs(main_rgb.bw);
  adjustColor();
}
function cirMove(e){
    var x,y,div;
    div=e.target.parentNode.firstChild;
    var vid=e.target.parentNode.secondChild;
    x=e.clientX;
    y=e.clientY+window.scrollY;
    x-=e.target.parentNode.offsetLeft;y-=e.target.parentNode.offsetTop;
  div.style.top = y-div.clientWidth/2 +'px';
  div.style.left = x-div.clientWidth/2 + 'px';    
  main_rgb.pixel = document.getElementById('ColorWheel').getContext('2d').getImageData(x,y, 1, 1).data;  
  main_rgb.bw=0;
  adjustColor();
}
function cCCircle(x)
{
  var main = document.createElement('cc');
  x.appendChild(main);
  var cir = document.createElement('canvas');
  var cP=document.createElement("PP");
  main.style.position='relative';
  main.style.display='block';
  var xl=x.clientWidth;
  if(window.innerHeight<window.innerWidth){x.style.marginTop='30px';main.style.position='fixed';main.style.left=xl+20+'px';main.style.top=(window.innerHeight-xl)/2+'px';}  cP.style.position = 'absolute';
  cP.setAttribute("id","ColorPointer");
  cP.style.top=cir.offsetTop-5+xl/2+'px';
  cP.style.left=cir.offsetLeft-5+xl/2+'px';
  cir.setAttribute("id","ColorWheel");
  cir.addEventListener('mousedown', function(e){window.addEventListener('mousemove', cirMove);cirMove(e);});   
  main.setAttribute("id","WheelParent");
  main.addEventListener('mouseleave',mouseUp);
  main.appendChild(cP);
  main.appendChild(cir);
  var fP = document.createElement('cps');
  fP.style.display='block';
  x.appendChild(fP);
  fP.addEventListener('mousedown', function(e){window.addEventListener('mousemove', paletteMove);paletteMove(e)});
  for (var i =0; i<4; i++)createRgbPalette(fP,i);
  main.style.width=main.style.height=x.clientWidth+'px';
  cir.style.borderRadius=main.style.borderRadius="50%";
  cCir(cir);
  window.addEventListener('mouseup',mouseUp);
}
var activeP={};
activeP[0]=0;
function cPM(x)
{
  var div=document.createElement('ph');
  for(i=0;i<4;i++)
  { var div2=document.createElement('ph');
    div2.style.marginRight='15px';
    x.appendChild(div);
    if(i==0){div2.setAttribute('class','pn');div2.innerHTML='PALETTE';}
    else if(i==1)div2.innerHTML='MUSIK1';
    else if(i==2)div2.innerHTML='MUSIK2';
    else div2.innerHTML='MUSIK3';
    div.appendChild(div2);
    div2.addEventListener('click',cph);
  }
  for(var y =0; y<3; y++)
  {
    var div=document.createElement('psp');
    div.style.flexWrap='wrap';
    x.appendChild(div);
    for(var i=0; i<32;i++)
      {
          var fP = document.createElement('cp');
          div.appendChild(fP); 
          fP.style.marginTop='5px';
          fP.style.width =div.clientWidth/8+'px';  
      
          fP.addEventListener('click',cph());
      }
    div.style.display='none';
  }
}
function cPShow(x)
{    
  var fS= document.createElement('psp');
    x.appendChild(fS); 
  for (var y=1; y<7; y++)
  {
    var fD= document.createElement('div');
    var fP = document.createElement('cp');
    fS.appendChild(fD); 
    fD.innerHTML=y<4?'now'+y:'fut'+(y-3);
    fD.appendChild(fP);
    fP.setAttribute('class','pshow');
    fP.style.marginTop='5px';
    fP.style.width =fS.clientWidth/6+'px';  
    fP.addEventListener('click',cpq);
  }  
}
function changePalette(e){
  var count =document.getElementsByClassName('pshow');
  for (var i=0;i<count.length;i++)if(count[i]==e.target)
  {
      activePalette=i;
    var x=i+',';
    for (var i=0 in palettes.value){x+=`${palettes.position[i]},${palettes.value[i][0]},${palettes.value[i][1]},${palettes.value[i][2]}`;if(i<Object.keys(palettes.value).length-1)x+=',';}
    var y=document.querySelector('.show');
    if(y)
    {
      e.target.style.backgroundImage=y.style.backgroundImage;
      fire(15,x);
    }
    else
    {
      y=e.target.parentNode.parentNode.querySelector('.active');
      if(y)y.classList.remove('active');
      e.target.parentNode.classList.add('active');
    }
  }
}
function cpq(){
var px = document.querySelector('.activeP');
if(px!==null)px.classList.remove('activeP');
if(document.querySelector('cpcp'))
{
  var count =document.getElementsByClassName('pshow');
  for (var i=0;i<count.length;i++)if(count[i]==e.target)
  {
      activePalette=i;
    var x=i+',';
    for (var i=0 in palettes.value){x+=`${palettes.position[i]},${palettes.value[i][0]},${palettes.value[i][1]},${palettes.value[i][2]}`;if(i<Object.keys(palettes.value).length-1)x+=',';}
    var y=document.querySelector('.show');
    if(y)
    {
      this.style.backgroundImage=y.style.backgroundImage;
      fire(15,x);
    }
  }
  
}
this.classList.add('activeP')
px = this.parentNode.childNodes;
var i2=i;
for(var i=0;i<32;i++){if(px[i]==this)i2=i};    
activeP[1]=i2;
}
function cph()
{
if(this.className!=='pn')
{
var x=document.querySelector('.pn');
if(x)x.classList.remove('pn');
this.classList='pn';
x=document.querySelector('.pn');
if(x)
{
  x=x.parentNode.childNodes;
for(var i=0; i<4;i++)
{
if(x[i].className=='pn')
{
activeP[0]=i;
document.getElementsByTagName('psp')[3-i].style.display='flex';
}
else
document.getElementsByTagName('psp')[3-i].style.display='none'
}
}
}
}
function createPalette(x)
{
  var y=document.createElement('mmain');
  x.appendChild(y);
      for(var i=0; i<palettevalues.length;i++)
      {
        var nP = document.createElement('h4');
        nP.innerHTML=palettenames[i];
        var nN = document.createElement('div');
        div.style.width='25%';
        nN.appendChild(nP);
        nN.appendChild(document.createElement('br'));
        nP = document.createElement('cp');
        nN.appendChild(nP);
        nP.setAttribute('class','pic');
        var text = "linear-gradient(to right,";
        for (var ii = 0; ii < palettevalues[i].length/4; ii++)
        {
          text += "rgb("
          for( var iii=1; iii<4; iii++)
          {
            text += palettevalues[i][ii*4+iii];
            if(iii<3) text += ",";
            else text += ")";
          }
          text += palettevalues[i][ii*4];
          text += "%";
          if(ii<palettevalues[i].length/4-1)text += ",";
        }
        text += ")";
        nP.style.backgroundImage = text;
        y.appendChild(nN);
        nN.addEventListener('click',function(){fire(5,i);
        var count =document.getElementsByClassName('pshow');if(activeP[0]!==0)count=document.querySelector('.pn');
        if(count)count[activePalette].style.backgroundImage=e.target.querySelector('cp').style.backgroundImage;});
      }
}
palettes.value=[];
palettes.position=[];
for(var ii=0; ii<8; ii++)
{
palettes.value[ii]=main_rgb.rgb();
palettes.position[ii]=Math.round(ii*255/7);
if(ii==8)palettes.position[ii]=255;
}
