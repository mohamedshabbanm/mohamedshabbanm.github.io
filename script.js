const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- mobile menu ----------
const navtoggle = document.getElementById('navtoggle');
const mobilemenu = document.getElementById('mobilemenu');
navtoggle.addEventListener('click', () => {
  const isHidden = mobilemenu.hasAttribute('hidden');
  if (isHidden) {
    mobilemenu.removeAttribute('hidden');
    navtoggle.setAttribute('aria-expanded', 'true');
  } else {
    mobilemenu.setAttribute('hidden', '');
    navtoggle.setAttribute('aria-expanded', 'false');
  }
});
mobilemenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobilemenu.setAttribute('hidden', '');
  navtoggle.setAttribute('aria-expanded', 'false');
}));

// ---------- about card show more/less ----------
const showMoreBtn = document.getElementById('showMoreBtn');
const aboutCard = document.querySelector('.about-card');
if (showMoreBtn && aboutCard) {
  showMoreBtn.addEventListener('click', () => {
    const expanded = aboutCard.classList.toggle('expanded');
    showMoreBtn.setAttribute('aria-expanded', String(expanded));
    showMoreBtn.lastChild.textContent = expanded ? ' Show less' : ' Show more';
  });
}

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ---------- progress bar fill on view ----------
const progressFill = document.getElementById('progressFill');
if (progressFill) {
  const progressIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressFill.style.width = '20%';
        progressIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  progressIO.observe(progressFill);
}

// ---------- scroll-spy: highlight current section in nav ----------
const navLinks = document.querySelectorAll('.navlinks a[data-nav]');
const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

if (sections.length) {
  const spyIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.navlinks a[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
  sections.forEach(sec => spyIO.observe(sec));
}

// ---------- matrix rain background ----------
(function matrixRain() {
  if (reduceMotion) return;

  const canvas = document.getElementById('matrixCanvas');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');

  const chars = 'アイウエオカキクケコサシスセソ01';
  const fontSize = 15;
  let columns, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * -40));
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(9, 12, 16, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';
    ctx.fillStyle = '#39D97A';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 60);
})();
