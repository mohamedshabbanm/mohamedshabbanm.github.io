// =========================================================
// MOBILE MENU
// =========================================================
const navtoggle = document.getElementById("navtoggle");
const mobilemenu = document.getElementById("mobilemenu");

if (navtoggle && mobilemenu) {
    navtoggle.addEventListener("click", () => {
        const opened = navtoggle.getAttribute("aria-expanded") === "true";

        if (opened) {
            mobilemenu.setAttribute("hidden", "");
            navtoggle.setAttribute("aria-expanded", "false");
            navtoggle.textContent = "MENU";
        } else {
            mobilemenu.removeAttribute("hidden");
            navtoggle.setAttribute("aria-expanded", "true");
            navtoggle.textContent = "CLOSE";
        }
    });

    mobilemenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobilemenu.setAttribute("hidden", "");
            navtoggle.setAttribute("aria-expanded", "false");
            navtoggle.textContent = "MENU";
        });
    });
}

// =========================================================
// SCROLL REVEAL
// =========================================================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("in-view");
    });
}

// =========================================================
// PROGRESS BAR
// =========================================================
const progressFill = document.getElementById("progressFill");

if (progressFill && "IntersectionObserver" in window) {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressFill.style.width = "84%";
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    progressObserver.observe(progressFill);
}

// =========================================================
// NAVIGATION SCROLL SPY
// =========================================================
const navLinks = document.querySelectorAll(".navlinks a[data-nav]");

const sections = Array.from(navLinks)
    .map(link => {
        const id = link.getAttribute("href");
        return document.querySelector(id);
    })
    .filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            navLinks.forEach(link => link.classList.remove("active"));

            const activeLink = document.querySelector(`.navlinks a[href="#${entry.target.id}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    sections.forEach(section => {
        navObserver.observe(section);
    });
}

// =========================================================
// CERTIFICATE HORIZONTAL SCROLL (DRAG + WHEEL)
// =========================================================
const certificatesScroll = document.getElementById("certificatesScroll");
let isDragging = false;
let startX = 0;
let scrollLeft = 0;
let dragThreshold = false;

if (certificatesScroll) {
    // Wheel horizontal scroll
    certificatesScroll.addEventListener("wheel", (event) => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            event.preventDefault();
            certificatesScroll.scrollLeft += event.deltaY * 1.5;
        }
    }, { passive: false });

    // Mouse Drag To Scroll
    certificatesScroll.addEventListener("mousedown", (e) => {
        isDragging = true;
        dragThreshold = false;
        startX = e.pageX - certificatesScroll.offsetLeft;
        scrollLeft = certificatesScroll.scrollLeft;
    });

    certificatesScroll.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    certificatesScroll.addEventListener("mouseup", () => {
        isDragging = false;
    });

    certificatesScroll.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const x = e.pageX - certificatesScroll.offsetLeft;
        const walk = (x - startX) * 2;
        if (Math.abs(walk) > 6) {
            dragThreshold = true;
        }
        e.preventDefault();
        certificatesScroll.scrollLeft = scrollLeft - walk;
    });
}

// =========================================================
// CERTIFICATE MODAL POPUP
// =========================================================
const certificateModal = document.getElementById("certificateModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");
const certificateCards = document.querySelectorAll(".certificate-card");

function openCertificate(image, title) {
    if (!certificateModal || !modalImage || !modalTitle) return;

    modalImage.src = image;
    modalImage.alt = title;
    modalTitle.textContent = title;

    certificateModal.removeAttribute("hidden");
    document.body.classList.add("modal-open");
}

function closeCertificate() {
    if (!certificateModal || !modalImage) return;

    certificateModal.setAttribute("hidden", "");
    modalImage.src = "";
    document.body.classList.remove("modal-open");
}

certificateCards.forEach(card => {
    card.addEventListener("click", (e) => {
        // Prevent opening popup if user was dragging the carousel
        if (dragThreshold) {
            dragThreshold = false;
            return;
        }

        const image = card.getAttribute("data-image");
        const title = card.getAttribute("data-title");
        openCertificate(image, title);
    });
});

if (modalClose) {
    modalClose.addEventListener("click", closeCertificate);
}

if (modalOverlay) {
    modalOverlay.addEventListener("click", closeCertificate);
}

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        certificateModal &&
        !certificateModal.hasAttribute("hidden")
    ) {
        closeCertificate();
    }
});

// =========================================================
// CLOSE MOBILE MENU ON RESIZE
// =========================================================
window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && mobilemenu) {
        mobilemenu.setAttribute("hidden", "");
        if (navtoggle) {
            navtoggle.setAttribute("aria-expanded", "false");
            navtoggle.textContent = "MENU";
        }
    }
});
