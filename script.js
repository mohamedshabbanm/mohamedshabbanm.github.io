```javascript
"use strict";

document.addEventListener("DOMContentLoaded", function () {

  /* ================= MOBILE MENU ================= */

  const navToggle = document.getElementById("navtoggle");
  const mobileMenu = document.getElementById("mobilemenu");

  if (navToggle && mobileMenu) {

    navToggle.addEventListener("click", function () {

      const opened = !mobileMenu.hasAttribute("hidden");

      if (opened) {
        mobileMenu.setAttribute("hidden", "");
        navToggle.setAttribute("aria-expanded", "false");
      } else {
        mobileMenu.removeAttribute("hidden");
        navToggle.setAttribute("aria-expanded", "true");
      }

    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {
        mobileMenu.setAttribute("hidden", "");
        navToggle.setAttribute("aria-expanded", "false");
      });

    });
  }


  /* ================= SHOW MORE ================= */

  const showMoreBtn = document.getElementById("showMoreBtn");
  const aboutCard = document.querySelector(".about-card");

  if (showMoreBtn && aboutCard) {

    showMoreBtn.addEventListener("click", function () {

      const expanded =
        aboutCard.classList.toggle("expanded");

      showMoreBtn.textContent =
        expanded
          ? "↑ Show less"
          : "↓ Show more";

    });
  }


  /* ================= SCROLL REVEAL ================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add("in-view");

              observer.unobserve(entry.target);
            }

          });

        },
        {
          threshold: 0.08
        }
      );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(function (element) {
      element.classList.add("in-view");
    });

  }


  /* ================= PROGRESS ================= */

  const progress =
    document.getElementById("progressFill");

  if (progress && "IntersectionObserver" in window) {

    const progressObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              progress.style.width = "82%";

              progressObserver.unobserve(
                entry.target
              );
            }

          });

        },
        {
          threshold: 0.2
        }
      );

    progressObserver.observe(progress);

  } else if (progress) {

    progress.style.width = "82%";

  }


  /* ================= NAV ACTIVE ================= */

  const navLinks =
    document.querySelectorAll(".navlinks a");

  const sections =
    document.querySelectorAll("main section");

  if ("IntersectionObserver" in window) {

    const navObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (!entry.isIntersecting) {
              return;
            }

            navLinks.forEach(function (link) {
              link.classList.remove("active");
            });

            const activeLink =
              document.querySelector(
                '.navlinks a[href="#' +
                entry.target.id +
                '"]'
              );

            if (activeLink) {
              activeLink.classList.add("active");
            }

          });

        },
        {
          rootMargin: "-35% 0px -55% 0px"
        }
      );

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

});
```
