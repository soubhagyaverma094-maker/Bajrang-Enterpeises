var WA_NUMBER='918359922242';
/* feature sets by niche */
var FEATS={wooden:'Solid wood build|Warm natural grain|Termite-treated|Sealed finish',
security:'Reinforced steel core|Premium multi-lock|Weather-sealed|Anti-pry frame',
designer:'Custom glass inlay|Statement design|Chrome hardware|Made to order',
locks:'Premium materials|Smooth action|Anti-corrosion finish|Easy install'};
function featsFor(it){return (FEATS[it.niche]||FEATS.designer).split('|');}
/* build a door card element */
function doorCard(it){
  var el=document.createElement('div');el.className='door reveal';el.setAttribute('data-k',it.k);
  var badge=it.bd?'<span class="badge2">'+it.bd+'</span>':'';
  el.innerHTML=badge+'<div class="d-media"><img src="'+it.img+'" alt="'+it.n+'" loading="lazy"></div><div class="d-info"><div class="d-nm">'+it.n+'<small>'+it.d+'</small></div><div class="d-price">'+it.p+'</div></div>';
  return el;
}
/* MODAL (expects #dmb markup on page) */
function initModal(){
  var b=document.getElementById('dmb');if(!b)return;
  var img=document.getElementById('dmi'),nm=document.getElementById('dmn'),dd=document.getElementById('dmd'),pr=document.getElementById('dmp'),fl=document.getElementById('dmf');
  var MAP={};CATALOG.forEach(function(it){MAP[it.k]=it;});
  function open(k){var it=MAP[k];if(!it)return;img.src=it.img;nm.textContent=it.n;dd.textContent=it.d;pr.textContent=it.p;fl.innerHTML='';featsFor(it).forEach(function(x){var li=document.createElement('li');li.textContent=x;fl.appendChild(li);});b.classList.add('open');document.body.style.overflow='hidden';}
  function close(){b.classList.remove('open');document.body.style.overflow='';}
  document.addEventListener('click',function(e){var el=e.target.closest('[data-k]');if(el&&el.getAttribute('data-k'))open(el.getAttribute('data-k'));});
  document.getElementById('dmc').addEventListener('click',close);b.addEventListener('click',function(e){if(e.target===b)close();});
  addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  var cta=document.getElementById('dmcta');if(cta)cta.addEventListener('click',close);
}
/* PALETTE (expects #pfab #ppanel #swgrid) */
function initPalette(){
  var g=document.getElementById('swgrid'),fab=document.getElementById('pfab'),pan=document.getElementById('ppanel');if(!g)return;
  PALETTES.forEach(function(p,i){var b=document.createElement('button');b.className='sw'+(i===0?' on':'');b.title=PNAMES[i]||('Theme '+(i+1));
    b.style.background='linear-gradient(135deg,'+p[0]+' 45%,'+p[4]+')';
    b.addEventListener('click',function(){apply(p);[].forEach.call(g.children,function(c){c.classList.remove('on');});b.classList.add('on');try{localStorage.setItem('bj_pal',i);}catch(e){}});g.appendChild(b);});
  function apply(p){var r=document.documentElement.style;r.setProperty('--ivory',p[0]);r.setProperty('--ivory-2',p[1]);r.setProperty('--paper',p[2]);r.setProperty('--walnut',p[3]);r.setProperty('--coral',p[4]);r.setProperty('--coral-deep',p[5]);r.setProperty('--ink',p[6]);r.setProperty('--ink-soft',p[7]);document.body.style.background=p[0];}
  fab.addEventListener('click',function(e){e.stopPropagation();pan.classList.toggle('open');});
  document.addEventListener('click',function(e){if(!pan.contains(e.target)&&e.target!==fab)pan.classList.remove('open');});
  // restore saved palette across pages
  try{var s=localStorage.getItem('bj_pal');if(s!==null&&PALETTES[s]){apply(PALETTES[s]);[].forEach.call(g.children,function(c,i){c.classList.toggle('on',i==s);});}}catch(e){}
}
/* NAV + REVEAL */
function initChrome(){
  var nav=document.getElementById('nav');
  addEventListener('scroll',function(){if(nav&&!nav.classList.contains('solid'))nav.classList.toggle('scrolled',scrollY>40);var tt=document.getElementById('toTop');if(tt)tt.classList.toggle('show',scrollY>700);},{passive:true});
  var toggle=document.getElementById('navToggle'),links=document.getElementById('navLinks');
  if(toggle)toggle.addEventListener('click',function(){links.classList.toggle('open');});
  document.querySelectorAll('[data-nav]').forEach(function(a){a.addEventListener('click',function(){if(links)links.classList.remove('open');});});
  var tt=document.getElementById('toTop');if(tt)tt.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'});});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
  function obs(){document.querySelectorAll('.reveal:not(.in)').forEach(function(el){io.observe(el);});}
  obs();setTimeout(obs,300);setTimeout(obs,1000);
}
/* shared footer + floating controls markup */
function mountCommon(){
  document.querySelectorAll('[data-yr]').forEach(function(e){e.textContent=new Date().getFullYear();});
  var wl=document.getElementById('waLink');if(wl)wl.href='https://wa.me/'+WA_NUMBER;
  var wc=document.getElementById('waCta');if(wc){wc.href='https://wa.me/'+WA_NUMBER;wc.target='_blank';}
  initModal();initPalette();initChrome();
}
