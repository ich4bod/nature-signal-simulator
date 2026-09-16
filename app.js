const traces={dawn:[['first light',18,34,6],['blackbird call',24,43,20],['sun through grass',39,61,12],['warm stillness',47,72,3]],storm:[['pressure falls',16,22,9],['wind gathers',19,34,48],['rain arrives',17,19,81],['clear edge',23,52,16]],night:[['blue hour',14,27,5],['frog chorus',16,31,57],['water settles',13,18,14],['moon reflection',11,48,2]]};
const palettes=['moss & gold','rain slate & electric blue','ink & moonstone'];
let name='dawn',frame=0,timer=null;
const $=id=>document.getElementById(id); const eventList=$('events');
function color(t,l,m){return `hsl(${Math.round((t*7+l*2+m)%360)} ${48+m/3}% ${26+l/2}%)`}
function render(){const row=traces[name][frame];const [event,temp,light,motion]=row;const bg=color(temp,light,motion);$('art').style.background=bg;$('orb').style.background=`hsl(${(light*4+35)%360} 82% 72%)`;$('orb').style.transform=`scale(${.65+motion/120})`;$('ripple').style.transform=`scale(${.7+motion/100})`;$('reading').textContent=`${event}: ${temp}°C · light ${light}% · motion ${motion}%`;$('palette').textContent=`Palette: ${palettes[['dawn','storm','night'].indexOf(name)]}`;$('frame').textContent=`Frame ${frame+1} / ${traces[name].length}`;eventList.innerHTML=traces[name].slice(0,frame+1).map((r,i)=>`<li>${String(i+1).padStart(2,'0')} — ${r[0]}</li>`).join('')}
function stop(){clearInterval(timer);timer=null;$('play').textContent='Play trace'}
function play(){if(timer){stop();return}render();$('play').textContent='Pause';timer=setInterval(()=>{frame++;if(frame>=traces[name].length){stop();frame=0;return}render()},900)}
function reset(){stop();frame=0;render()}
$('play').onclick=play;$('reset').onclick=reset;$('trace').onchange=e=>{name=e.target.value;reset()};
document.addEventListener('keydown',e=>{if(e.target.tagName==='SELECT')return;if(e.code==='Space'){e.preventDefault();play()}if(e.key.toLowerCase()==='r')reset();if('123'.includes(e.key)){name=['dawn','storm','night'][Number(e.key)-1];$('trace').value=name;reset()}});render();
window.simulator={traces,paletteFor:(trace)=>palettes[['dawn','storm','night'].indexOf(trace)]};
