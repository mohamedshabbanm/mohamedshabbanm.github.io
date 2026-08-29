```javascript
/* ============================================================
   MOHAMEDSM // SECURITY PORTFOLIO
   ============================================================ */


/* ============================================================
   MOBILE MENU
   ============================================================ */

const navToggle =
  document.getElementById("navtoggle");

const mobileMenu =
  document.getElementById("mobilemenu");

if (navToggle && mobileMenu) {

  navToggle.addEventListener("click", () => {

    const isOpen =
      navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    if (isOpen) {

      mobileMenu.setAttribute(
        "hidden",
        ""
      );

      navToggle.textContent =
        "MENU";

    } else {

      mobileMenu.removeAttribute(
        "hidden"
      );

      navToggle.textContent =
        "CLOSE";

    }

  });


  mobileMenu
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          mobileMenu.setAttribute(
            "hidden",
            ""
          );

          navToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          navToggle.textContent =
            "MENU";

        }
      );

    });

}


/* ============================================================
   SCROLL REVEAL
   ============================================================ */

const revealElements =
  document.querySelectorAll(".reveal");


if (
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "in-view"
          );

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach((element) => {

    revealObserver.observe(
      element
    );

  });

} else {

  revealElements.forEach((element) => {

    element.classList.add(
      "in-view"
    );

  });

}


/* ============================================================
   CURRENT YEAR
   ============================================================ */

const year =
  new Date().getFullYear();

document
  .querySelectorAll("[data-year]")
  .forEach((element) => {

    element.textContent =
      year;

  });


/* ============================================================
   CONSOLE SIGNATURE
   ============================================================ */

console.log(
  "%c[ MOHAMEDSM.SEC ]",
  "color:#79e6a7;font-family:monospace;font-weight:700;font-size:16px;"
);

console.log(
  "%cAUTHORIZED SECURITY RESEARCH",
  "font-family:monospace;"
);

console.log(
  "%cRecon → Enumeration → Exploitation → PrivEsc → Pivot → Report",
  "font-family:monospace;"
);
```
