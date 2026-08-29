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

// ---------- terminal typing effect ----------
const lines = [
  { type: 'prompt', text: '$ whoami' },
  { type: 'out', text: 'mohamed — aspiring penetration tester' },
  { type: 'prompt', text: '$ cat objective.txt' },
  { type: 'out', text: 'eJPT v2 (in progress) -> OSCP+ (target)' },
  { type: 'prompt', text: '$ ls skills/' },
  { type: 'out', text: 'php  cpp  python  sqli  xss  lfi  ssrf  xxe  cmdi' },
  { type: 'prompt', text: '$ cat status.txt' },
  { type: 'comment', text: 'open to bug bounty and freelance engagements' },
];

const termBody = document.getElementById('termBody');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderStatic() {
  termBody.innerHTML = lines.map(l =>
    `<div class="term-line ${l.type}">${l.text}</div>`
  ).join('');
}

function typeTerminal() {
  let li = 0;
  function nextLine() {
    if (li >= lines.length) {
      const cursorLine = document.createElement('div');
      cursorLine.className = 'term-line';
      cursorLine.innerHTML = '<span class="prompt">$</span> <span class="term-cursor"></span>';
      termBody.appendChild(cursorLine);
      return;
    }
    const l = lines[li];
    const div = document.createElement('div');
    div.className = 'term-line ' + l.type;
    termBody.appendChild(div);
    let ci = 0;
    const speed = l.type === 'prompt' ? 38 : 12;
    const interval = setInterval(() => {
      div.textContent = l.text.slice(0, ci + 1);
      ci++;
      if (ci >= l.text.length) {
        clearInterval(interval);
        li++;
        setTimeout(nextLine, l.type === 'prompt' ? 220 : 340);
      }
    }, speed);
  }
  nextLine();
}

if (reduceMotion) {
  renderStatic();
} else {
  typeTerminal();
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
