// LIGHTBOX FUNCTIONALITY
// Wrap initialization in DOMContentLoaded so elements exist before we bind handlers.
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.lightbox-close');

    // If the basic elements aren't present, stop silently.
    if (!lightbox || !lightboxImg) return;

    // Prepare an array of image sources and track the current index
    const galleryArray = Array.from(galleryItems);
    const images = galleryArray.map(item => item.dataset?.image || item.getAttribute('data-image') || item.querySelector('img')?.src).filter(Boolean);
    let currentIndex = -1;

    // helper to show image at index with fade
    function showImageAt(index) {
        if (index < 0 || index >= images.length) return;
        currentIndex = index;
        // remove visible class to start fade-out (if any)
        lightboxImg.classList.remove('visible');
        // set src, then add visible on load to fade-in
        lightboxImg.onload = () => {
            // small timeout to ensure transition applies
            requestAnimationFrame(() => lightboxImg.classList.add('visible'));
        };
        lightboxImg.src = images[currentIndex];
    }

    function openLightboxAt(index) {
        showImageAt(index);
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden'; // prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    // OPEN LIGHTBOX WHEN CLICKING A GALLERY ITEM
    galleryArray.forEach((item, idx) => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            if (!images[idx]) return;
            openLightboxAt(idx);
        });
    });

    // CLOSE LIGHTBOX WHEN CLICKING THE CLOSE BUTTON (if it exists)
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeLightbox();
        });
    }

    // CLOSE LIGHTBOX WHEN CLICKING OUTSIDE THE IMAGE
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // CLOSE LIGHTBOX WITH ESC KEY
    // Keyboard support: Escape to close, ArrowLeft/ArrowRight to navigate
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') {
            closeLightbox();
            return;
        }
        if (e.key === 'ArrowLeft') {
            // previous
            const prev = (currentIndex - 1 + images.length) % images.length;
            showImageAt(prev);
            return;
        }
        if (e.key === 'ArrowRight') {
            const next = (currentIndex + 1) % images.length;
            showImageAt(next);
            return;
        }
    });

    // DISABLE RIGHT-CLICK ON LIGHTBOX IMAGE
    lightboxImg.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
});

// CONTACT MODAL FUNCTIONALITY
document.addEventListener('DOMContentLoaded', () => {
    const contactModal = document.getElementById('contact-modal');
    const contactTriggers = document.querySelectorAll('a[href="#contact"]');
    const contactClose = document.querySelector('.contact-close');

    if (!contactModal) return;

    // Open modal when clicking Contact link
    contactTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            contactModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal when clicking X
    if (contactClose) {
        contactClose.addEventListener('click', () => {
            contactModal.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Close modal when clicking outside the content
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            contactModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.classList.contains('open')) {
            contactModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});

// MOBILE HAMBURGER MENU TOGGLE
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-content a');

    if (!hamburger || !mobileNav) return;

    // Toggle mobile nav open/close
    function openMobileNav() {
        mobileNav.classList.add('open');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileNav.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        if (mobileNav.classList.contains('open')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    // Close mobile nav with close button
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileNav);
    }

    // Close mobile nav when clicking a link inside it
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // let contact link behavior run (contact modal) then close nav
            setTimeout(closeMobileNav, 50);
        });
    });

    // Close mobile nav with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            closeMobileNav();
        }
    });
});