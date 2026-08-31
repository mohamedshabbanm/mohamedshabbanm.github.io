// =========================================================
// MOHAMED — PENETRATION TESTER PORTFOLIO
// INTERACTIVITY
// =========================================================


// =========================================================
// MOBILE MENU
// =========================================================

const navtoggle = document.getElementById('navtoggle');
const mobilemenu = document.getElementById('mobilemenu');

if (navtoggle && mobilemenu) {

  navtoggle.addEventListener('click', () => {

    const isHidden = mobilemenu.hasAttribute('hidden');

    if (isHidden) {

      mobilemenu.removeAttribute('hidden');

      navtoggle.setAttribute(
        'aria-expanded',
        'true'
      );

    } else {

      mobilemenu.setAttribute(
        'hidden',
        ''
      );

      navtoggle.setAttribute(
        'aria-expanded',
        'false'
      );

    }

  });


  mobilemenu
    .querySelectorAll('a')
    .forEach(a => {

      a.addEventListener('click', () => {

        mobilemenu.setAttribute(
          'hidden',
          ''
        );

        navtoggle.setAttribute(
          'aria-expanded',
          'false'
        );

      });

    });

}


// =========================================================
// ABOUT — SHOW MORE / SHOW LESS
// =========================================================

const showMoreBtn =
  document.getElementById('showMoreBtn');

const aboutCard =
  document.querySelector('.about-card');


if (showMoreBtn && aboutCard) {

  showMoreBtn.addEventListener('click', () => {

    const expanded =
      aboutCard.classList.toggle('expanded');

    showMoreBtn.setAttribute(
      'aria-expanded',
      String(expanded)
    );

    const textNodes =
      Array.from(showMoreBtn.childNodes)
        .filter(
          node => node.nodeType === Node.TEXT_NODE
        );

    if (textNodes.length) {

      textNodes[0].textContent =
        expanded
          ? ' Show less'
          : ' Show more';

    }

  });

}


// =========================================================
// SCROLL REVEAL
// =========================================================

const revealEls =
  document.querySelectorAll('.reveal');


const io =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            'in-view'
          );

          io.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold:0.15
    }
  );


revealEls.forEach(el => {

  io.observe(el);

});


// =========================================================
// PROGRESS BAR
// =========================================================

const progressFill =
  document.getElementById(
    'progressFill'
  );


if (progressFill) {

  const progressIO =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            progressFill.style.width =
              '82%';

            progressIO.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold:0.3
      }
    );


  progressIO.observe(
    progressFill
  );

}


// =========================================================
// NAVIGATION SCROLL SPY
// =========================================================

const navLinks =
  document.querySelectorAll(
    '.navlinks a[data-nav]'
  );


const sections =
  Array.from(navLinks)
    .map(link =>
      document.querySelector(
        link.getAttribute('href')
      )
    )
    .filter(Boolean);


if (sections.length) {

  const spyIO =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(entry => {

          const link =
            document.querySelector(
              `.navlinks a[href="#${entry.target.id}"]`
            );

          if (!link) {
            return;
          }


          if (entry.isIntersecting) {

            navLinks.forEach(
              l =>
                l.classList.remove(
                  'active'
                )
            );

            link.classList.add(
              'active'
            );

          }

        });

      },
      {
        rootMargin:
          '-40% 0px -50% 0px',

        threshold:0
      }
    );


  sections.forEach(section => {

    spyIO.observe(
      section
    );

  });

}
