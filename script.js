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