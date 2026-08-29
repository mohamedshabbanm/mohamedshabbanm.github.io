```javascript
/* ============================================================
   MOHAMEDSM.GITHUB.IO
   SECURITY PORTFOLIO JS
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

    const expanded =
      navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute(
      "aria-expanded",
      String(!expanded)
    );

    if (expanded) {

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
   TERMINAL TYPING
   ============================================================ */

const terminalLines = [

  {
    type: "prompt",
    text: "mohamed@kali:~$ whoami"
  },

  {
    type: "out",
    text: "mohamed — cybersecurity student"
  },

  {
    type: "prompt",
    text: "mohamed@kali:~$ cat objective.txt"
  },

  {
    type: "out",
    text: "penetration testing | web security | offensive security"
  },

  {
    type: "prompt",
    text: "mohamed@kali:~$ ls /skills"
  },

  {
    type: "out",
    text: "nmap  burp  metasploit  ffuf  gobuster  hydra"
  },

  {
    type: "out",
    text: "impacket  netexec  chisel  proxychains"
  },

  {
    type: "prompt",
    text: "mohamed@kali:~$ cat web.txt"
  },

  {
    type: "out",
    text: "sqli  xss  lfi  ssrf  xxe  cmdi"
  },

  {
    type: "prompt",
    text: "mohamed@kali:~$ ./enum.sh"
  },

  {
    type: "comment",
    text: "[+] Reconnaissance"
  },

  {
    type: "comment",
    text: "[+] Enumeration"
  },

  {
    type: "comment",
    text: "[+] Exploitation"
  },

  {
    type: "comment",
    text: "[+] Privilege Escalation"
  },

  {
    type: "comment",
    text: "[+] Pivoting"
  },

  {
    type: "prompt",
    text: "mohamed@kali:~$ cat status"
  },

  {
    type: "comment",
    text: "[+] eJPT v2 preparation: ACTIVE"
  }

];


const terminalBody =
  document.getElementById("termBody");


const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* ============================================================
   TERMINAL STATIC
   ============================================================ */

function renderStaticTerminal() {

  if (!terminalBody) return;

  terminalBody.innerHTML =
    terminalLines
      .map((line) => {

        const safeText =
          line.text
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;");

        return `
          <div class="term-line ${line.type}">
            ${safeText}
          </div>
        `;

      })
      .join("");

  addTerminalCursor();

}


/* ============================================================
   TERMINAL CURSOR
   ============================================================ */

function addTerminalCursor() {

  if (!terminalBody) return;

  const cursorLine =
    document.createElement("div");

  cursorLine.className =
    "term-line";

  cursorLine.innerHTML =
    `
      <span class="prompt">
        mohamed@kali:~$
      </span>
      <span class="term-cursor"></span>
    `;

  terminalBody.appendChild(
    cursorLine
  );

}


/* ============================================================
   TERMINAL TYPING EFFECT
   ============================================================ */

function typeTerminal() {

  if (!terminalBody) return;

  let lineIndex = 0;


  function nextLine() {

    if (
      lineIndex >=
      terminalLines.length
    ) {

      addTerminalCursor();

      return;

    }


    const currentLine =
      terminalLines[lineIndex];


    const element =
      document.createElement("div");

    element.className =
      `term-line ${currentLine.type}`;


    terminalBody.appendChild(
      element
    );


    let charIndex = 0;


    const speed =
      currentLine.type === "prompt"
        ? 28
        : currentLine.type === "comment"
        ? 9
        : 10;


    const interval =
      setInterval(() => {

        element.textContent =
          currentLine.text.slice(
            0,
            charIndex + 1
          );

        charIndex++;


        if (
          charIndex >=
          currentLine.text.length
        ) {

          clearInterval(
            interval
          );

          lineIndex++;

          setTimeout(
            nextLine,
            currentLine.type === "prompt"
              ? 160
              : 220
          );

        }

      }, speed);

  }


  nextLine();

}


if (prefersReducedMotion) {

  renderStaticTerminal();

} else {

  typeTerminal();

}


/* ============================================================
   SCROLL REVEAL
   ============================================================ */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if (
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }

            entry.target.classList.add(
              "in-view"
            );

            observer.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );

} else {

  revealElements.forEach(
    (element) => {

      element.classList.add(
        "in-view"
      );

    }
  );

}


/* ============================================================
   ACTIVE NAVIGATION
   ============================================================ */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".navlinks a"
  );


if (
  "IntersectionObserver" in window
) {

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }

            const id =
              entry.target.id;


            navLinks.forEach(
              (link) => {

                const active =
                  link.getAttribute(
                    "href"
                  ) === `#${id}`;


                link.classList.toggle(
                  "active",
                  active
                );

              }
            );

          }
        );

      },
      {
        rootMargin:
          "-35% 0px -55% 0px",
        threshold: 0
      }
    );


  sections.forEach(
    (section) => {

      sectionObserver.observe(
        section
      );

    }
  );

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
   CONSOLE MESSAGE
   ============================================================ */

console.log(
  "%c[ MOHAMEDSM.SEC ]",
  "color:#63f2ba;font-weight:700;font-size:18px;"
);

console.log(
  "%cCybersecurity Portfolio",
  "font-weight:700;"
);

console.log(
  "%cRecon → Enumerate → Exploit → PrivEsc → Pivot",
  "font-family:monospace;"
);
```
