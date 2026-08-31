// =========================================================
// MOBILE MENU
// =========================================================

const navtoggle =
    document.getElementById("navtoggle");

const mobilemenu =
    document.getElementById("mobilemenu");


if (navtoggle && mobilemenu) {

    navtoggle.addEventListener("click", () => {

        const opened =
            navtoggle.getAttribute("aria-expanded") === "true";


        if (opened) {

            mobilemenu.setAttribute(
                "hidden",
                ""
            );

            navtoggle.setAttribute(
                "aria-expanded",
                "false"
            );

            navtoggle.textContent = "MENU";

        } else {

            mobilemenu.removeAttribute(
                "hidden"
            );

            navtoggle.setAttribute(
                "aria-expanded",
                "true"
            );

            navtoggle.textContent = "CLOSE";

        }

    });


    mobilemenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mobilemenu.setAttribute(
                    "hidden",
                    ""
                );

                navtoggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                navtoggle.textContent = "MENU";

            });

        });

}


// =========================================================
// SCROLL REVEAL
// =========================================================

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "in-view"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold:0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


// =========================================================
// PROGRESS BAR
// =========================================================

const progressFill =
    document.getElementById(
        "progressFill"
    );


if (progressFill) {

    const progressObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        progressFill.style.width =
                            "84%";

                        progressObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold:0.3
            }
        );


    progressObserver.observe(
        progressFill
    );

}


// =========================================================
// NAVIGATION SCROLL SPY
// =========================================================

const navLinks =
    document.querySelectorAll(
        ".navlinks a[data-nav]"
    );


const sections =
    Array.from(navLinks)
        .map(link => {

            const id =
                link.getAttribute("href");

            return document.querySelector(id);

        })
        .filter(Boolean);


const navObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );

                });


                const activeLink =
                    document.querySelector(
                        `.navlinks a[href="#${entry.target.id}"]`
                    );


                if (activeLink) {

                    activeLink.classList.add(
                        "active"
                    );

                }

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px",

            threshold:0
        }
    );


sections.forEach(section => {

    navObserver.observe(section);

});


// =========================================================
// SMOOTH CLOSE MENU ON RESIZE
// =========================================================

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 900 &&
            mobilemenu
        ) {

            mobilemenu.setAttribute(
                "hidden",
                ""
            );

            if (navtoggle) {

                navtoggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                navtoggle.textContent =
                    "MENU";

            }

        }

    }
);
