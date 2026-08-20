(function(){
  const cfg=window.SITE_CONFIG||{};
  document.querySelectorAll('[data-site-name]').forEach(el=>el.textContent=cfg.siteName||'Roofly');
  document.querySelectorAll('[data-legal-name]').forEach(el=>el.textContent=cfg.legalName||cfg.siteName||'Roofly Network');
  document.querySelectorAll('[data-site-email]').forEach(el=>{el.textContent=cfg.email||''; if(el.tagName==='A') el.href='mailto:'+cfg.email});
  document.querySelectorAll('[data-disclaimer]').forEach(el=>el.textContent=cfg.disclaimer||'');
  document.querySelectorAll('[data-copyright]').forEach(el=>el.textContent=cfg.copyright||'');
  document.querySelectorAll('[data-config-logo]').forEach(el=>el.src=cfg.logo||'assets/images/logo-mark.svg');
  const favicon=document.querySelector('link[rel="icon"]'); if(favicon) favicon.href=cfg.favicon||'assets/images/favicon.svg';
  document.querySelectorAll('[data-nav-label]').forEach(el=>{const key=el.dataset.navLabel;if(cfg.nav&&cfg.nav[key])el.textContent=cfg.nav[key]});
  const header=document.querySelector('.site-header');
  window.addEventListener('scroll',()=>{if(header) header.classList.toggle('is-scrolled',window.scrollY>30)}, {passive:true});
  const consentKey='rooflyPolicyConsent';
  const getConsent=()=>{try{return localStorage.getItem(consentKey)}catch(e){return null}};
  const setConsent=()=>{try{localStorage.setItem(consentKey,'accepted')}catch(e){}};
  if(!getConsent()){
    const policy=document.createElement('div');
    policy.className='policy-toast';
    policy.setAttribute('role','region');
    policy.setAttribute('aria-label','Policy confirmation');
    policy.innerHTML='<p>We use essential browser storage to remember this choice and support site features. Review our policies anytime.</p><div class="policy-toast__actions"><a href="privacy-policy.html">Privacy Policy</a><button type="button">Accept</button></div>';
    document.body.appendChild(policy);
    policy.querySelector('button').addEventListener('click',()=>{setConsent();policy.classList.add('is-hidden');policy.addEventListener('transitionend',()=>policy.remove(),{once:true})});
  }
  const menu=document.querySelector('.menu-toggle'), links=document.querySelector('.nav__links');
  if(links&&!links.querySelector('.nav__mobile-email')){
    const email=document.createElement('a');
    email.className='nav__mobile-email';
    email.setAttribute('data-site-email','');
    email.href='mailto:'+(cfg.email||'hello@roofly.network');
    email.textContent=cfg.email||'hello@roofly.network';
    links.appendChild(email);
  }
  if(menu&&links){menu.addEventListener('click',()=>{const open=links.classList.toggle('is-open');menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Close menu':'Open menu');menu.textContent=open?'×':'☰';document.body.classList.toggle('is-locked',open)});links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('is-open');document.body.classList.remove('is-locked');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');menu.textContent='☰'}))}
  document.querySelectorAll('.nav__item--has-menu').forEach(item=>{const trigger=item.querySelector('.nav__trigger');if(!trigger)return;let closeTimer=0;const setOpen=open=>{window.clearTimeout(closeTimer);trigger.setAttribute('aria-expanded',open?'true':'false');item.classList.toggle('is-open',open)};const scheduleClose=()=>{window.clearTimeout(closeTimer);closeTimer=window.setTimeout(()=>setOpen(false),360)};item.addEventListener('mouseenter',()=>setOpen(true));item.addEventListener('mouseleave',scheduleClose);item.addEventListener('focusin',()=>setOpen(true));item.addEventListener('focusout',event=>{if(!item.contains(event.relatedTarget))scheduleClose()})});
  if(window.AOS) AOS.init({once:true,duration:700,easing:'ease-out-cubic',offset:70});
  if(window.Swiper) document.querySelectorAll('.provider-swiper').forEach(swiper=>new Swiper(swiper,{loop:true,spaceBetween:18,slidesPerView:1,autoplay:{delay:4500,disableOnInteraction:false},pagination:{el:swiper.querySelector('.swiper-pagination'),clickable:true},breakpoints:{700:{slidesPerView:2,spaceBetween:24},1100:{slidesPerView:2,spaceBetween:28}}}));
  if(window.Swiper) document.querySelectorAll('.testimonial-swiper').forEach(swiper=>new Swiper(swiper,{loop:true,speed:720,slidesPerView:1,spaceBetween:24,grabCursor:true,keyboard:{enabled:true},autoplay:{delay:5200,disableOnInteraction:false},pagination:{el:swiper.querySelector('.testimonial-pagination'),clickable:true},breakpoints:{700:{slidesPerView:2,spaceBetween:24},1100:{slidesPerView:2,spaceBetween:34}}}));
  if(window.Swiper) document.querySelectorAll('.about-photo-swiper').forEach(swiper=>{const section=swiper.closest('.about-photo-panel'),back=section&&section.querySelector('[data-about-ghost-back]'),mid=section&&section.querySelector('[data-about-ghost-mid]'),photos=[...swiper.querySelectorAll('[data-about-photo]')].map(slide=>slide.dataset.aboutPhoto);const setGhosts=gallery=>{if(!photos.length)return;const next=photos[(gallery.realIndex+1)%photos.length],after=photos[(gallery.realIndex+2)%photos.length];if(mid&&next)mid.src=next;if(back&&after)back.src=after};new Swiper(swiper,{loop:true,speed:720,slidesPerView:1,spaceBetween:0,grabCursor:true,keyboard:{enabled:true},navigation:{prevEl:section&&section.querySelector('.about-photo-prev'),nextEl:section&&section.querySelector('.about-photo-next')},on:{init:setGhosts,slideChange:setGhosts}})});
  if(window.Swiper) document.querySelectorAll('.vertical-project-swiper').forEach(swiper=>{const current=swiper.querySelector('[data-project-current]');const updateProject=gallery=>{const slide=gallery.slides[gallery.activeIndex];if(!slide)return;if(current)current.textContent=slide.dataset.index||String(gallery.realIndex+1).padStart(2,'0')};new Swiper(swiper,{direction:'vertical',loop:true,speed:900,slidesPerView:1,spaceBetween:0,allowTouchMove:false,simulateTouch:false,autoplay:{delay:4200,disableOnInteraction:false},navigation:{prevEl:swiper.querySelector('.project-arrow-prev'),nextEl:swiper.querySelector('.project-arrow-next')},pagination:{el:swiper.querySelector('.project-vertical-pagination'),clickable:false},on:{init:updateProject,slideChange:updateProject}})});
  if(window.Swiper) document.querySelectorAll('.service-gallery-swiper').forEach(swiper=>{const section=swiper.closest('.service-showcase'),caption=section&&section.querySelector('.service-gallery-caption');const updateCaption=gallery=>{if(!caption)return;const slide=gallery.slides[gallery.activeIndex];if(!slide)return;caption.classList.remove('is-changing');void caption.offsetWidth;caption.querySelector('span').textContent=slide.dataset.captionLabel||'';caption.querySelector('h3').textContent=slide.dataset.captionTitle||'';caption.querySelector('p').textContent=slide.dataset.captionText||'';caption.classList.add('is-changing')};new Swiper(swiper,{loop:true,speed:650,slidesPerView:1,spaceBetween:0,navigation:{prevEl:section&&section.querySelector('.service-slider-prev'),nextEl:section&&section.querySelector('.service-slider-next')},pagination:{el:section&&section.querySelector('.service-slider-pagination'),type:'progressbar'},on:{init:updateCaption,slideChange:updateCaption}})});
  if(window.Swiper) document.querySelectorAll('.service-timeline-swiper').forEach(swiper=>new Swiper(swiper,{speed:680,slidesPerView:1,spaceBetween:34,grabCursor:true,keyboard:{enabled:true},navigation:{prevEl:swiper.querySelector('.service-timeline-prev'),nextEl:swiper.querySelector('.service-timeline-next')},pagination:{el:swiper.querySelector('.service-timeline-pagination'),clickable:true},breakpoints:{760:{slidesPerView:2,spaceBetween:42},1180:{slidesPerView:3,spaceBetween:64}}}));
  if(window.Swiper) document.querySelectorAll('.facts-swiper').forEach(swiper=>{const shell=swiper.closest('.facts-shell'),setFactsHeight=gallery=>requestAnimationFrame(()=>{const styles=getComputedStyle(swiper),pad=parseFloat(styles.paddingTop)+parseFloat(styles.paddingBottom),space=gallery.params.spaceBetween||0;let total=0;for(let i=0;i<3;i++){const slide=gallery.slides[(gallery.activeIndex+i)%gallery.slides.length];if(slide)total+=slide.offsetHeight}if(total)swiper.style.height=Math.ceil(total+space*2+pad)+'px'});new Swiper(swiper,{direction:'vertical',loop:true,speed:650,slidesPerView:'auto',spaceBetween:18,grabCursor:true,keyboard:{enabled:true},autoplay:{delay:4800,disableOnInteraction:false},navigation:{prevEl:shell&&shell.querySelector('[data-facts-prev]'),nextEl:shell&&shell.querySelector('[data-facts-next]')},on:{init:setFactsHeight,slideChangeTransitionStart:setFactsHeight,resize:setFactsHeight}})});
  document.querySelectorAll('.service-tabs').forEach(tabs=>{const buttons=[...tabs.querySelectorAll('[role="tab"]')],panels=[...tabs.querySelectorAll('[role="tabpanel"]')];buttons.forEach(button=>button.addEventListener('click',()=>{buttons.forEach(item=>{const active=item===button;item.classList.toggle('is-active',active);item.setAttribute('aria-selected',active?'true':'false')});panels.forEach(panel=>{const active=panel.id===button.getAttribute('aria-controls');panel.hidden=!active;panel.classList.toggle('is-active',active)})}))});
  document.querySelectorAll('.accordion__button').forEach(button=>button.addEventListener('click',()=>{const item=button.closest('.accordion__item');const open=item.classList.toggle('is-open');button.setAttribute('aria-expanded',open)}));
  const parallaxImages=['assets/images/parallax-tiles.png','assets/images/process-roof-parallax.png','assets/images/service-parallax-main.jpg','assets/images/service-insight-parallax.png'];
  const parallaxBg=src=>`linear-gradient(rgba(12, 19, 32, .62), rgba(12, 19, 32, .62)), url("${src}")`;
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.parallax__frame').forEach((frame,frameIndex)=>{
    if(!parallaxImages.length)return;
    let currentIndex=0,stripCount=0,isAnimating=false,transitionTimer=0;
    const svgNS='http://www.w3.org/2000/svg';
    const clipId=`parallaxRevealClip${frameIndex}${Math.random().toString(36).slice(2)}`;
    const stack=document.createElement('div');
    const currentLayer=document.createElement('div');
    const nextLayer=document.createElement('div');
    const maskSvg=document.createElementNS(svgNS,'svg');
    const defs=document.createElementNS(svgNS,'defs');
    const clipPath=document.createElementNS(svgNS,'clipPath');
    stack.className='parallax-image-stack';
    currentLayer.className='parallax-image parallax-image--current';
    nextLayer.className='parallax-image parallax-image--next';
    maskSvg.classList.add('parallax-reveal-mask');
    maskSvg.setAttribute('aria-hidden','true');
    maskSvg.setAttribute('focusable','false');
    clipPath.setAttribute('id',clipId);
    clipPath.setAttribute('clipPathUnits','objectBoundingBox');
    defs.appendChild(clipPath);
    maskSvg.appendChild(defs);
    stack.append(currentLayer,nextLayer);
    frame.prepend(stack,maskSvg);
    nextLayer.style.clipPath=`url(#${clipId})`;
    nextLayer.style.webkitClipPath=`url(#${clipId})`;
    currentLayer.style.backgroundImage=parallaxBg(parallaxImages[currentIndex]);
    parallaxImages.forEach(src=>{const image=new Image();image.src=src});
    const getStripCount=()=>window.matchMedia('(max-width: 640px)').matches?6:window.matchMedia('(max-width: 1024px)').matches?9:12;
    const buildMask=()=>{
      const nextCount=getStripCount();
      if(stripCount===nextCount&&clipPath.children.length)return;
      stripCount=nextCount;
      clipPath.textContent='';
      const overlap=.002;
      for(let i=0;i<stripCount;i++){
        const strip=document.createElementNS(svgNS,'rect');
        const width=1/stripCount+overlap;
        strip.classList.add('parallax-mask-strip');
        strip.setAttribute('x',Math.max(0,i/stripCount-overlap/2));
        strip.setAttribute('y','0');
        strip.setAttribute('width',width);
        strip.setAttribute('height','1');
        clipPath.appendChild(strip);
      }
    };
    const scheduleTransition=delay=>{
      window.clearTimeout(transitionTimer);
      transitionTimer=window.setTimeout(runTransition,delay);
    };
    const finishTransition=nextIndex=>{
      currentIndex=nextIndex;
      currentLayer.style.backgroundImage=parallaxBg(parallaxImages[currentIndex]);
      frame.classList.remove('is-revealing-image');
      nextLayer.style.backgroundImage='';
      clipPath.querySelectorAll('.parallax-mask-strip').forEach(strip=>{strip.getAnimations().forEach(animation=>animation.cancel())});
      isAnimating=false;
      scheduleTransition(3800);
    };
    const runTransition=()=>{
      if(isAnimating){
        scheduleTransition(900);
        return;
      }
      if(reducedMotion.matches)return;
      buildMask();
      const nextIndex=(currentIndex+1)%parallaxImages.length;
      const strips=[...clipPath.querySelectorAll('.parallax-mask-strip')];
      const duration=680,stagger=42;
      isAnimating=true;
      nextLayer.style.backgroundImage=parallaxBg(parallaxImages[nextIndex]);
      frame.classList.add('is-revealing-image');
      const animations=strips.map((strip,i)=>strip.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration,delay:i*stagger,easing:'cubic-bezier(.65, 0, .35, 1)',fill:'forwards'}));
      Promise.allSettled(animations.map(animation=>animation.finished)).then(()=>finishTransition(nextIndex));
    };
    buildMask();
    if(!reducedMotion.matches)scheduleTransition(4200);
    window.addEventListener('resize',()=>{if(!isAnimating)buildMask()},{passive:true});
  });
  const parallaxPanels=document.querySelectorAll('.parallax__frame,.process-photo,.service-showcase__hero,.service-insight__parallax'); if(parallaxPanels.length&&window.matchMedia('(min-width: 901px)').matches){const syncParallax=()=>{parallaxPanels.forEach(panel=>{const rect=panel.getBoundingClientRect();const shift=(window.innerHeight/2-(rect.top+rect.height/2))*.08;if(panel.classList.contains('parallax__frame')){panel.style.setProperty('--parallax-shift',`${shift}px`)}else{panel.style.backgroundPosition=`center calc(50% + ${shift}px)`}})};syncParallax();window.addEventListener('scroll',syncParallax,{passive:true})}
  document.querySelectorAll('.contact-form').forEach(form=>form.addEventListener('submit',async e=>{
    e.preventDefault();
    const status=form.querySelector('.form-status'),button=form.querySelector('button[type=submit]');
    if(!form.checkValidity()){form.reportValidity();return}
    button.disabled=true;
    button.setAttribute('aria-busy','true');
    status.textContent='Sending...';
    status.className='form-status';
    try{
      const endpoint=new URL(form.getAttribute('action')||form.action,window.location.href);
      if(endpoint.pathname.endsWith('/contact.php')&&['5500','5501','5502'].includes(window.location.port)){
        throw new Error('The form needs a PHP server. Open the site with php -S, not Live Server.');
      }
      const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      const raw=(await response.text()).trim();
      const data=raw?JSON.parse(raw):{};
      if(!response.ok||!data.success)throw new Error(data.message||(response.status===405?'The form endpoint is not running PHP. Open the site through a PHP server.':'Please complete the form and try again.'));
      status.textContent=cfg.formSuccessMessage||data.message||'Thank you. Your request has been received.';
      status.className='form-status success';
      form.reset();
    }catch(err){
      status.textContent=err.message&&err.name!=='SyntaxError'?err.message:'The form could not be sent. Please try again or email us directly.';
      status.className='form-status error';
    }finally{
      button.disabled=false;
      button.removeAttribute('aria-busy');
    }
  }));
})();
