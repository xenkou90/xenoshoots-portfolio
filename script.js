
document.addEventListener("DOMContentLoaded", () => {
/* ==========================================================
   LIGHTBOX FUNCTIONALITY
========================================================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightboxClose = document.querySelector(".lightbox-close");

let currentIndex = -1;
const images = [...galleryItems].map(item =>
    item.dataset.image || item.querySelector("img")?.src
).filter(Boolean);

function showImageAt(index) {
    if (!lightboxImg || !images.length) return;

    currentIndex = index;
    lightboxImg.classList.remove("visible");

    lightboxImg.onload = () => {
        requestAnimationFrame(() => lightboxImg.classList.add("visible"));
    };

    lightboxImg.src = images[currentIndex];
}

function openLightbox(index) {
    if (!lightbox) return;

    showImageAt(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// OPEN LIGHTBOX WHEN CLICKING A GALLERY ITEM
galleryItems.forEach((item, i) => {
    item.addEventListener("click", e => {
        e.preventDefault();
        openLightbox(i);
    });
});

// CLOSE LIGHTBOX WHEN CLICKING THE CLOSE BUTTON (if it exists)
if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

// CLOSE LIGHTBOX WHEN CLICKING OUTSIDE THE IMAGE
if (lightbox) {
    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) closeLightbox();
    });
}

// CLOSE LIGHTBOX WITH ESC KEY & ArrowLeft/ArrowRight to navigate
document.addEventListener("keydown", e => {
    if (!lightbox?.classList.contains("open")) return;

    if (e.key === "Escape") return closeLightbox();
    if (e.key === "ArrowLeft")
        return showImageAt((currentIndex - 1 + images.length) % images.length);
    if (e.key === "ArrowRight")
        return showImageAt((currentIndex + 1) % images.length);
});

// DISABLE RIGHT-CLICK ON LIGHTBOX IMAGE
if (lightboxImg) {
    lightboxImg.addEventListener("contextmenu", e => e.preventDefault());
}

// SWIPE NAVIGATION FOR LIGHTBOX (MOBILE)
let startX = 0;
let endX = 0;

function handleSwipe() {
    const distance = endX - startX;

    // Minimum swipe distance
    if (Math.abs(distance) < 50) return;

    if (distance < 0) {
        // swipe left -> next image
        const next = (currentIndex + 1) % images.length;
        showImageAt(next);
    } 
    else {
        // swipe right -> previous image
        const prev = (currentIndex - 1 + images.length) % images.length;
        showImageAt(prev);
    }
}

if (lightbox) {
lightbox.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});
}

/* ==========================================================
   CONTACT MODAL
========================================================== */
// CONTACT MODAL FUNCTIONALITY
const contactModal = document.getElementById("contact-modal");
const contactLinks = document.querySelectorAll('a[href="#contact"]');
const contactClose = document.querySelector(".contact-close");

// Open modal when clicking Contact link
function openContact() {
    if (!contactModal) return;
    contactModal.classList.add("open");
    contactModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeContact() {
    if (!contactModal) return;
    contactModal.classList.remove("open");
    contactModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

contactLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        openContact();
    });
});

// Close modal when clicking X
if (contactClose) {
    contactClose.addEventListener("click", closeContact);
}

// Close modal when clicking outside the content
if (contactModal) {
    contactModal.addEventListener("click", e => {
        if (e.target === contactModal) closeContact();
    });
}

// Close modal with ESC key
document.addEventListener("keydown", e => {
    if (e.key === "Escape" &&
        contactModal?.classList.contains("open")) {
            closeContact();
        }
});

/* ==========================================================
   LAZY LOADING FADE-IN EFFECT
========================================================== */
const lazyImages = document.querySelectorAll("img[loading='lazy']");

lazyImages.forEach(img => {
    const fadeIn = () => img.classList.add("loaded");
    img.addEventListener("load", fadeIn);
    
    // If image is already cached and loaded
    if (img.complete) fadeIn();
});

/* ==========================================================
   MOBILE HAMBURGER MENU TOGGLE
========================================================== */
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.getElementById("mobile-nav");
const mobileNavClose = document.querySelector(".mobile-nav-close");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-content a");

// Toggle mobile nav open/close
function openMobileNav() {
    mobileNav.classList.add("open");
    mobileNav.setAttribute("aria-hidden", "false");
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
}

function closeMobileNav() {
    mobileNav.classList.remove("open");
    mobileNav.setAttribute("aria-hidden", "true");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
}

if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
        mobileNav.classList.contains("open")
        ? closeMobileNav()
        : openMobileNav();
    });
}

// Close mobile nav with close button
if (mobileNavClose) mobileNavClose.addEventListener("click", closeMobileNav);

// Close mobile nav when clicking a link inside it
mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
        setTimeout(closeMobileNav, 50);
    });
});

// Close mobile nav with ESC key
document.addEventListener("keydown", e => {
    if (e.key === "Escape" && mobileNav?.classList.contains("open")) {
        closeMobileNav();
    }
});
});

// Disable right-click on hero image only
document.addEventListener("DOMContentLoaded", () => {
    const protectedElements = document.querySelectorAll('.protect');

    protectedElements.forEach(el => {
        el.addEventListener("contextmenu", function(e) {
            e.preventDefault();
        });
    });
});