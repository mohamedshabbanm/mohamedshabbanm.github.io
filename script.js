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

            navtoggle.textContent =
                "[MENU]";

        } else {

            mobilemenu.removeAttribute(
                "hidden"
            );

            navtoggle.setAttribute(
                "aria-expanded",
                "true"
            );

            navtoggle.textContent =
                "[CLOSE]";
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

                navtoggle.textContent =
                    "[MENU]";

            });

        });

}



// =========================================================
// SCROLL REVEAL
// =========================================================

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

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
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(
            element
        );

    });

} else {

    revealElements.forEach(element => {

        element.classList.add(
            "in-view"
        );

    });

}



// =========================================================
// PROGRESS BAR
// =========================================================

const progressFill =
    document.getElementById(
        "progressFill"
    );


if (
    progressFill &&
    "IntersectionObserver" in window
) {

    const progressObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        progressFill.style.width =
                            "84%";

                        progressObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.3
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
                link.getAttribute(
                    "href"
                );

            return document.querySelector(
                id
            );

        })
        .filter(Boolean);


if (
    sections.length &&
    "IntersectionObserver" in window
) {

    const navObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
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

                threshold: 0
            }
        );


    sections.forEach(section => {

        navObserver.observe(
            section
        );

    });

}



// =========================================================
// HERO TERMINAL TYPING ANIMATION
// =========================================================

const heroTerminal =
    document.getElementById(
        "heroTerminal"
    );


if (heroTerminal) {

    const commands =
        heroTerminal.querySelectorAll(
            ".terminal-command"
        );


    const outputs =
        heroTerminal.querySelectorAll(
            "[data-terminal-output]"
        );


    const sleep =
        milliseconds =>
            new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        milliseconds
                    )
            );


    // -----------------------------------------------------
    // TYPE TEXT
    // -----------------------------------------------------

    async function typeText(element) {

        if (!element) {
            return;
        }


        const text =
            element.getAttribute(
                "data-text"
            ) || "";


        element.textContent = "";


        for (
            let i = 0;
            i < text.length;
            i++
        ) {

            element.textContent +=
                text[i];


            // Fast typing effect
            await sleep(
                text[i] === " "
                    ? 12
                    : 22
            );

        }

    }


    // -----------------------------------------------------
    // SHOW ELEMENT
    // -----------------------------------------------------

    function showTerminalElement(
        element
    ) {

        if (!element) {
            return;
        }


        element.classList.remove(
            "terminal-hidden"
        );


        element.classList.add(
            "terminal-show"
        );

    }


    // -----------------------------------------------------
    // RUN TERMINAL
    // -----------------------------------------------------

    async function runTerminal() {

        // ---------------------------------------------
        // COMMAND 1
        // ---------------------------------------------

        const command1 =
            commands[0];


        const typing1 =
            command1.querySelector(
                ".typing-text"
            );


        showTerminalElement(
            command1
        );


        await typeText(
            typing1
        );


        await sleep(180);


        // ---------------------------------------------
        // OUTPUT 1
        // ---------------------------------------------

        showTerminalElement(
            outputs[0]
        );


        await sleep(350);


        // ---------------------------------------------
        // COMMAND 2
        // ---------------------------------------------

        const command2 =
            commands[1];


        const typing2 =
            command2.querySelector(
                ".typing-text"
            );


        showTerminalElement(
            command2
        );


        await typeText(
            typing2
        );


        await sleep(180);


        // ---------------------------------------------
        // OUTPUT 2
        // ---------------------------------------------

        showTerminalElement(
            outputs[1]
        );


        await sleep(400);


        // ---------------------------------------------
        // COMMAND 3
        // ---------------------------------------------

        const command3 =
            commands[2];


        const typing3 =
            command3.querySelector(
                ".typing-text"
            );


        showTerminalElement(
            command3
        );


        await typeText(
            typing3
        );


        await sleep(180);


        // ---------------------------------------------
        // OUTPUT 3
        // ---------------------------------------------

        showTerminalElement(
            outputs[2]
        );


        await sleep(350);


        // ---------------------------------------------
        // FINAL PROMPT
        // ---------------------------------------------

        const finalCommand =
            commands[3];


        showTerminalElement(
            finalCommand
        );

    }


    // Run terminal after page loads
    setTimeout(
        runTerminal,
        450
    );

}



// =========================================================
// TERMINAL NAVIGATION
// =========================================================

const terminalLinks =
    document.querySelectorAll(
        ".terminal-link"
    );


terminalLinks.forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetSelector =
                link.getAttribute(
                    "href"
                );


            if (
                !targetSelector ||
                !targetSelector.startsWith("#")
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetSelector
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            // Close mobile menu
            if (mobilemenu) {

                mobilemenu.setAttribute(
                    "hidden",
                    ""
                );

            }


            if (navtoggle) {

                navtoggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                navtoggle.textContent =
                    "[MENU]";

            }


            // Smooth navigation
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            // Update URL without jumping
            if (
                history.replaceState
            ) {

                history.replaceState(
                    null,
                    "",
                    targetSelector
                );

            }

        }
    );

});



// =========================================================
// CERTIFICATE HORIZONTAL SCROLL
// DRAG + WHEEL + ARROWS
// =========================================================

const scrollContainer =
    document.getElementById(
        "certificatesScroll"
    );


const certPrev =
    document.getElementById(
        "certPrev"
    );


const certNext =
    document.getElementById(
        "certNext"
    );


let isMouseDown = false;

let startX = 0;

let scrollStartLeft = 0;

let isDragging = false;



if (scrollContainer) {

    // -----------------------------------------------------
    // ARROWS
    // -----------------------------------------------------

    if (
        certPrev &&
        certNext
    ) {

        certPrev.addEventListener(
            "click",
            () => {

                scrollContainer.scrollBy({
                    left: -360,
                    behavior: "smooth"
                });

            }
        );


        certNext.addEventListener(
            "click",
            () => {

                scrollContainer.scrollBy({
                    left: 360,
                    behavior: "smooth"
                });

            }
        );

    }


    // -----------------------------------------------------
    // MOUSE WHEEL
    // -----------------------------------------------------

    scrollContainer.addEventListener(
        "wheel",
        event => {

            if (
                Math.abs(
                    event.deltaY
                ) >
                Math.abs(
                    event.deltaX
                )
            ) {

                event.preventDefault();

                scrollContainer.scrollLeft +=
                    event.deltaY * 1.5;

            }

        },
        {
            passive: false
        }
    );


    // -----------------------------------------------------
    // MOUSE DOWN
    // -----------------------------------------------------

    scrollContainer.addEventListener(
        "mousedown",
        event => {

            isMouseDown = true;

            isDragging = false;

            scrollContainer.style.cursor =
                "grabbing";


            startX =
                event.pageX -
                scrollContainer.offsetLeft;


            scrollStartLeft =
                scrollContainer.scrollLeft;

        }
    );


    // -----------------------------------------------------
    // MOUSE LEAVE
    // -----------------------------------------------------

    scrollContainer.addEventListener(
        "mouseleave",
        () => {

            isMouseDown = false;

            scrollContainer.style.cursor =
                "grab";

        }
    );


    // -----------------------------------------------------
    // MOUSE UP
    // -----------------------------------------------------

    scrollContainer.addEventListener(
        "mouseup",
        () => {

            isMouseDown = false;

            scrollContainer.style.cursor =
                "grab";

        }
    );


    // -----------------------------------------------------
    // MOUSE MOVE
    // -----------------------------------------------------

    scrollContainer.addEventListener(
        "mousemove",
        event => {

            if (!isMouseDown) {
                return;
            }


            const x =
                event.pageX -
                scrollContainer.offsetLeft;


            const walk =
                (x - startX) * 2.2;


            if (
                Math.abs(walk) > 8
            ) {

                isDragging = true;

            }


            event.preventDefault();


            scrollContainer.scrollLeft =
                scrollStartLeft -
                walk;

        }
    );

}



// =========================================================
// CERTIFICATE MODAL
// =========================================================

const certificateModal =
    document.getElementById(
        "certificateModal"
    );


const modalImage =
    document.getElementById(
        "modalImage"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );


const certificateCards =
    document.querySelectorAll(
        ".certificate-card"
    );



function openCertificate(
    image,
    title
) {

    if (
        !certificateModal ||
        !modalImage ||
        !modalTitle
    ) {
        return;
    }


    modalImage.src =
        image;


    modalImage.alt =
        title;


    modalTitle.textContent =
        title;


    certificateModal.removeAttribute(
        "hidden"
    );


    document.body.classList.add(
        "modal-open"
    );

}



function closeCertificate() {

    if (
        !certificateModal ||
        !modalImage
    ) {
        return;
    }


    certificateModal.setAttribute(
        "hidden",
        ""
    );


    modalImage.src = "";


    document.body.classList.remove(
        "modal-open"
    );

}



certificateCards.forEach(
    card => {

        card.addEventListener(
            "click",
            () => {

                // Don't open while dragging
                if (isDragging) {

                    isDragging = false;

                    return;

                }


                const image =
                    card.getAttribute(
                        "data-image"
                    );


                const title =
                    card.getAttribute(
                        "data-title"
                    );


                openCertificate(
                    image,
                    title
                );

            }
        );

    }
);



if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeCertificate
    );

}



if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeCertificate
    );

}



// =========================================================
// ESC CLOSE MODAL
// =========================================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            certificateModal &&
            !certificateModal.hasAttribute(
                "hidden"
            )
        ) {

            closeCertificate();

        }

    }
);



// =========================================================
// CLOSE MOBILE MENU ON RESIZE
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
                    "[MENU]";

            }

        }

    }
);
