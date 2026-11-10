(() => {
  const opening = document.getElementById('opening');
  const invitation = document.getElementById('invitation');
  const openSeal = document.getElementById('openSeal');
  const musicToggle = document.getElementById('musicToggle');
  let opened = false;
  const backgroundMusic = document.getElementById('backgroundMusic');
  let musicOn = false;

  // Prevent all scrolling while the envelope is the only visible screen.
  document.body.classList.add('locked');
  const blockScroll = e => { if (!opened) e.preventDefault(); };
  window.addEventListener('wheel', blockScroll, {passive:false});
  window.addEventListener('touchmove', blockScroll, {passive:false});
  window.addEventListener('keydown', e => { if (!opened && ['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key)) e.preventDefault(); });

  // Mobile pinch-zoom can shift the visible seal away from the fixed hotspot.
  // Allow a tap anywhere on the opening screen to trigger the same open action.
  opening.addEventListener('click', (event) => {
    if (!opened && event.target !== openSeal) openSeal.click();
  });

  openSeal.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    opening.classList.add('leaving');
    document.getElementById('intro').classList.remove('intro-sequence-done');
    document.getElementById('intro').classList.add('intro-sequence-start');
    invitation.classList.add('entered');
    invitation.setAttribute('aria-hidden','false');
    musicToggle.hidden = false;
    document.body.classList.remove('locked');
    // Start the complete uploaded track on the guest's tap; loop continuously.
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.78;
    backgroundMusic.play().then(() => setMusicState(true)).catch(() => setMusicState(false));
    window.removeEventListener('wheel', blockScroll);
    window.removeEventListener('touchmove', blockScroll);
    // Keep the order intact while slowing the envelope's opening motion.
    // Start the leg descent as soon as the opening screen is removed (1.2s after seal tap).
    const intro = document.getElementById('intro');
    window.setTimeout(() => {
      opening.remove();
      intro.scrollIntoView({behavior:'auto',block:'start'});
      const feet = intro.querySelector('.couple-feet');
      let sequenceFinished = false;
      const finishIntroSequence = () => {
        if (sequenceFinished) return;
        sequenceFinished = true;
        intro.classList.add('intro-sequence-done');
        // Start the digital date roll as its own staggered reveal begins.
        const dateEl = intro.querySelector('.date-rolling');
        const dateRevealDelay = dateEl
          ? (Number.parseFloat(getComputedStyle(dateEl).getPropertyValue('--reveal-delay')) || 0)
          : 0;
        window.setTimeout(rollDate, dateRevealDelay + 40);
      };
      if (feet) {
        feet.addEventListener('animationend', finishIntroSequence, { once: true });
        intro.classList.add('intro-legs-start');
        // Safety fallback sits just after the 2.25s leg descent, so text never appears early.
        window.setTimeout(finishIntroSequence, 2600);
      } else {
        intro.classList.add('intro-legs-start');
        finishIntroSequence();
      }
    }, 1200);
  });

  const closingSection = document.getElementById('closing');
  if ('IntersectionObserver' in window && closingSection) {
    const closingObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          closingSection.classList.add('in-view');
          closingObserver.disconnect();
        }
      });
    }, { threshold: 0.25 });
    closingObserver.observe(closingSection);
  } else if (closingSection) {
    closingSection.classList.add('in-view');
  }

  // Soft reveal for section content as each section enters the viewport.
  const revealTargets = document.querySelectorAll('.section .intro-copy > *, .blessings-copy > *, .sky-copy > *, .ceremony-copy > *, .venue-sky-copy > *, .closing-copy > *');
  let introRevealIndex = 0;
  revealTargets.forEach((el, i) => {
    el.classList.add('smooth-reveal');
    // First-section copy reveals in a slower, deliberate cascade after the legs land.
    const delay = el.closest('.intro-copy')
      ? introRevealIndex++ * 280
      : Math.min(i % 8, 7) * 75;
    el.style.setProperty('--reveal-delay', `${delay}ms`);
  });
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  function rollDate() {
    const el = document.querySelector('.rolling-number');
    const yearEl = document.querySelector('.rolling-year');
    if (!el) return;
    const target = Number(el.dataset.final || '18');
    const targetYear = Number(yearEl?.dataset.final || '2026');
    let tick = 0;
    const timer = window.setInterval(() => {
      tick++;
      el.textContent = tick < 15 ? String(Math.floor(Math.random()*31)+1).padStart(2,'0') : String(target).padStart(2,'0');
      if (yearEl) yearEl.textContent = tick < 15 ? String(1990 + Math.floor(Math.random() * (targetYear - 1989))) : String(targetYear);
      if (tick >= 18) window.clearInterval(timer);
    }, 75);
  }

  function setMusicState(isOn) {
    musicOn = isOn;
    musicToggle.classList.toggle('is-on', musicOn);
    musicToggle.classList.toggle('is-off', !musicOn);
    musicToggle.title = musicOn ? 'Turn music off' : 'Turn music on';
    musicToggle.setAttribute('aria-label', musicOn ? 'Turn music off' : 'Turn music on');
  }

  musicToggle.addEventListener('click', async () => {
    if (musicOn) {
      backgroundMusic.pause();
      setMusicState(false);
    } else {
      try {
        await backgroundMusic.play();
        setMusicState(true);
      } catch (error) {
        setMusicState(false);
        musicToggle.title = 'Tap again to play music';
      }
    }
  });
})();


// Gentle red and white rose petals drifting across the full invitation.
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['red', 'white'];
  let active = 0;
  const maxActive = 18;
  function dropPetal() {
    if (!document.getElementById('invitation')?.classList.contains('entered')) return;
    if (active >= maxActive) return;
    const petal = document.createElement('span');
    const isRed = Math.random() < 0.58;
    petal.className = 'rose-petal-fx' + (isRed ? ' red' : '');
    petal.setAttribute('aria-hidden', 'true');
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.setProperty('--petal-w', `${8 + Math.random() * 8}px`);
    petal.style.setProperty('--petal-h', `${13 + Math.random() * 12}px`);
    petal.style.setProperty('--petal-duration', `${7 + Math.random() * 5}s`);
    petal.style.setProperty('--petal-delay', `${Math.random() * .8}s`);
    petal.style.setProperty('--petal-drift', `${Math.round(Math.random() * 100 - 50)}px`);
    petal.style.setProperty('--petal-rot', `${Math.round(180 + Math.random() * 360)}deg`);
    document.body.appendChild(petal);
    active++;
    const duration = parseFloat(petal.style.getPropertyValue('--petal-duration')) * 1000 + 1000;
    window.setTimeout(() => { petal.remove(); active = Math.max(0, active - 1); }, duration);
  }
  // A small initial scatter, then a steady, mobile-friendly flow.
  document.getElementById('openSeal')?.addEventListener('click', () => {
    for (let i = 0; i < 7; i++) window.setTimeout(dropPetal, i * 260);
    window.setInterval(dropPetal, 650);
  }, { once: true });
})();
