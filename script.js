// Elements Selection
const header = document.getElementById('header');
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');
const backToTop = document.getElementById('backToTop');

// Header Scroll Effect & Back to Top Visibility
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile Menu Toggle
if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
}

// Close Mobile Menu on Link Click
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileNavToggle) mobileNavToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// --- MODERN REVEAL ANIMATIONS ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

function initAnimations() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .service-card, .yara-service-row, .yara-num-card').forEach(el => {
        revealObserver.observe(el);
    });
}

// --- CUSTOM CURSOR ---
function initCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .yara-nav-item, .yara-mega-nav-item, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
}

// Initializations
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    if (window.innerWidth > 991) initCursor();
    
    // Mega Menu logic (Cascading)
    const megaNavItems = document.querySelectorAll('.yara-mega-nav-item');
    const megaPanels = document.querySelectorAll('.yara-mega-content');
    const rightPanel = document.querySelector('.yara-mega-panel');

    function activateMegaItem(item) {
        const target = item.getAttribute('data-mega');
        megaNavItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        if (rightPanel) rightPanel.classList.add('show');
        megaPanels.forEach(p => {
            p.classList.remove('active');
            if (p.id === target) p.classList.add('active');
        });
    }

    megaNavItems.forEach(item => {
        item.addEventListener('mouseenter', () => activateMegaItem(item));
        item.addEventListener('click', (e) => {
            if (item.tagName.toLowerCase() !== 'a') {
                e.preventDefault();
            }
            e.stopPropagation();
            activateMegaItem(item);
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.yara-mega-menu')) {
            if (rightPanel) rightPanel.classList.remove('show');
            megaNavItems.forEach(i => i.classList.remove('active'));
        }
    });

    // Accordion - toggle open/close on click
    document.querySelectorAll('.yara-acc-head').forEach(head => {
        head.addEventListener('click', function() {
            const item = this.closest('.yara-acc-item');
            const icon = this.querySelector('.yara-icon');
            const isActive = item.classList.contains('active');

            // Close all items first and reset icons to +
            document.querySelectorAll('.yara-acc-item').forEach(i => {
                i.classList.remove('active');
                const iIcon = i.querySelector('.yara-icon');
                if (iIcon) iIcon.textContent = '+';
            });

            // If it wasn't open, open it and change icon to -
            if (!isActive) {
                item.classList.add('active');
                if (icon) icon.textContent = '-';
            }
        });
    });

    // Initialize
    initYaraSlider();
    initAnimations();
});

// --- UNIFIED SLIDER LOGIC (Infinite Loop) ---
function initYaraSliderSection(slider) {
    const track = slider.querySelector('.yara-slider-track');
    const prevBtn = slider.querySelector('.yara-slider-prev');
    const nextBtn = slider.querySelector('.yara-slider-next');
    if (!track || slider._sliderInitialized) return;
    slider._sliderInitialized = true;

    const originalItems = Array.from(track.querySelectorAll('.yara-slider-item'));
    if (originalItems.length === 0) return;

    // Clone items for infinite loop
    function buildInfiniteTrack() {
        track.querySelectorAll('.clone').forEach(c => c.remove());
        // Append clones at end
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.add('clone');
            track.appendChild(clone);
        });
        // Prepend clones at start
        originalItems.slice().reverse().forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.add('clone');
            track.insertBefore(clone, track.firstChild);
        });
    }

    buildInfiniteTrack();

    const allItems = () => Array.from(track.querySelectorAll('.yara-slider-item'));
    let currentIndex = originalItems.length; // Start at first real item
    let isTransitioning = false;

    function getItemWidth() {
        const items = allItems();
        if (items.length === 0) return 0;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        return items[0].offsetWidth + gap;
    }

    function goTo(index, animate = true) {
        track.style.transition = animate
            ? 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)'
            : 'none';
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * getItemWidth()}px)`;
    }

    track.addEventListener('transitionend', () => {
        const orig = originalItems.length;
        if (currentIndex >= orig * 2) {
            goTo(orig, false);
        } else if (currentIndex < orig) {
            goTo(orig * 2 - 1, false);
        }
        isTransitioning = false;
    });

    goTo(currentIndex, false);

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            goTo(currentIndex + 1);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            goTo(currentIndex - 1);
        });
    }

    // Touch support
    let touchStartX = 0;
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    slider.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (diff > 50 && nextBtn) nextBtn.click();
        if (diff < -50 && prevBtn) prevBtn.click();
    }, {passive: true});

    // Mouse drag support
    let isDragging = false;
    let dragStartX = 0;
    let dragCurrentX = 0;
    let baseTranslate = 0;

    track.style.cursor = 'grab';

    track.addEventListener('mousedown', e => {
        isDragging = true;
        dragStartX = e.clientX;
        baseTranslate = currentIndex * getItemWidth();
        track.style.cursor = 'grabbing';
        track.style.transition = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        dragCurrentX = e.clientX;
        const moved = dragStartX - dragCurrentX;
        track.style.transform = `translateX(-${baseTranslate + moved}px)`;
    });

    document.addEventListener('mouseup', e => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        const moved = dragStartX - e.clientX;
        if (Math.abs(moved) > 60) {
            if (moved > 0 && nextBtn) nextBtn.click();
            else if (moved < 0 && prevBtn) prevBtn.click();
        } else {
            // Snap back to current position
            goTo(currentIndex);
        }
    });

    // Prevent link clicks during drag
    track.addEventListener('click', e => {
        if (Math.abs(dragStartX - dragCurrentX) > 10) {
            e.preventDefault();
        }
    }, true);

    window.addEventListener('resize', () => {
        buildInfiniteTrack();
        currentIndex = originalItems.length;
        goTo(currentIndex, false);
    });
}

function initYaraSlider() {
    document.querySelectorAll('.yara-slider-section').forEach(slider => {
        initYaraSliderSection(slider);
    });
}
