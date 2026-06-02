// Elements Selection
const header = document.getElementById('header');
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');
const backToTop = document.getElementById('backToTop');

// Header Scroll Effect & Back to Top Visibility
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (window.scrollY > lastScrollY && window.scrollY > 150) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;

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
function initAll() {
    if (window.appInitialized) return;
    window.appInitialized = true;
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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

// --- UNIFIED SLIDER LOGIC (Infinite Loop) ---
function initYaraSliderSection(slider) {
    const track = slider.querySelector('.yara-slider-track');
    const prevBtn = slider.querySelector('.yara-slider-prev');
    const nextBtn = slider.querySelector('.yara-slider-next');
    if (!track || slider._sliderInitialized || track.classList.contains('yara-slider-static')) return;
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

/* =========================================
   ASSISTANT IA WIDGET (Option 1)
========================================= */
function initAssistant() {
    // 1. Créer le HTML du assistant et l'injecter dans le body
    const assistantHTML = `
        <div id="yara-assistant-wrapper">
            <button id="yara-assistant-btn" aria-label="Ouvrir le chat">
                <i class="fa-solid fa-comment-dots bot-icon"></i>
                <i class="fa-solid fa-xmark close-icon"></i>
            </button>
            <div id="yara-assistant-window">
                <div class="yara-assistant-header">
                    <div class="yara-assistant-avatar">
                        <i class="fa-solid fa-headset"></i>
                    </div>
                    <div class="yara-assistant-title">
                        <h4>Conseiller Yaracad</h4>
                        <p>En ligne</p>
                    </div>
                </div>
                <div class="yara-assistant-body" id="assistant-body">
                    <!-- Les messages apparaitront ici -->
                </div>
                <div class="yara-assistant-footer">
                    <input type="text" id="assistant-input" class="yara-assistant-input" placeholder="Écrivez votre message..." disabled>
                    <button id="assistant-send" class="yara-assistant-send" disabled>
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', assistantHTML);

    // 2. Sélectionner les éléments
    const wrapper = document.getElementById('yara-assistant-wrapper');
    const btn = document.getElementById('yara-assistant-btn');
    const body = document.getElementById('assistant-body');
    const input = document.getElementById('assistant-input');
    const sendBtn = document.getElementById('assistant-send');

    // 3. Variables d'état
    let currentStep = 0;
    const userData = {
        service: '',
        budget: '',
        name: ''
    };
    let isTyping = false;

    // 4. Ouvrir/Fermer le chat
    btn.addEventListener('click', () => {
        const isOpen = wrapper.classList.toggle('open');
        if (isOpen && currentStep === 0) {
            // Lancer le premier message si c'est la première ouverture
            setTimeout(startConversation, 500);
        }
    });

    // 5. Fonctions d'affichage
    function scrollToBottom() {
        body.scrollTop = body.scrollHeight;
    }

    function showTyping() {
        isTyping = true;
        const typingHTML = `
            <div class="typing-indicator" id="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        body.insertAdjacentHTML('beforeend', typingHTML);
        scrollToBottom();
    }

    function hideTyping() {
        isTyping = false;
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    function addBotMessage(text, options = null) {
        showTyping();
        setTimeout(() => {
            hideTyping();
            let msgHTML = `<div class="chat-msg bot">${text}</div>`;
            if (options) {
                let optionsHTML = '<div class="chat-options">';
                options.forEach(opt => {
                    optionsHTML += `<button class="chat-option-btn" data-value="${opt}">${opt}</button>`;
                });
                optionsHTML += '</div>';
                msgHTML += optionsHTML;
            }
            body.insertAdjacentHTML('beforeend', msgHTML);
            scrollToBottom();
            
            // Ajouter les écouteurs sur les boutons d'options
            if (options) {
                const btns = body.querySelectorAll('.chat-option-btn:not(.used)');
                btns.forEach(b => {
                    b.addEventListener('click', function() {
                        if(isTyping) return;
                        const val = this.getAttribute('data-value');
                        // Désactiver tous les boutons actuels
                        btns.forEach(btn => {
                            btn.classList.add('used');
                            btn.style.pointerEvents = 'none';
                            btn.style.opacity = '0.7';
                        });
                        addUserMessage(val);
                        handleUserInput(val, true);
                    });
                });
            } else {
                // S'il n'y a pas d'options, c'est au tour de l'utilisateur de taper
                input.disabled = false;
                sendBtn.disabled = false;
                input.focus();
            }
        }, 1200); // Délai artificiel
    }

    function addUserMessage(text) {
        const msgHTML = `<div class="chat-msg user">${text}</div>`;
        body.insertAdjacentHTML('beforeend', msgHTML);
        scrollToBottom();
        input.value = '';
        input.disabled = true;
        sendBtn.disabled = true;
    }

    // 6. Logique de conversation (Le Scénario)
    function startConversation() {
        currentStep = 1;
        addBotMessage("Bonjour ! 👋 Bienvenue chez Yaracad.Digital. Comment puis-je vous accompagner aujourd'hui ?", ["Aménagement", "Plan 3D", "Décoration", "Autre demande"]);
    }

    function handleUserInput(text, fromOption = false) {
        if (!text.trim()) return;
        
        if (!fromOption) {
            addUserMessage(text);
        }

        if (currentStep === 1) {
            userData.service = text;
            currentStep = 2;
            addBotMessage("Excellent choix. Avez-vous une idée de la surface à traiter ou un budget estimé en tête ? (Vous pouvez répondre par texte)");
        } 
        else if (currentStep === 2) {
            userData.budget = text;
            currentStep = 3;
            addBotMessage("C'est noté ! Pour que l'un de nos architectes puisse vous recontacter sur WhatsApp avec ces informations, quel est votre prénom ?");
        }
        else if (currentStep === 3) {
            userData.name = text;
            currentStep = 4;
            
            // Génération du lien WA
            const waMessage = `*Nouveau contact via IA (Site Web)*\n\n*Nom:* ${userData.name}\n*Besoin:* ${userData.service}\n*Surface/Budget:* ${userData.budget}`;
            const waUrl = `https://wa.me/212661678047?text=${encodeURIComponent(waMessage)}`;
            
            addBotMessage(`Merci ${userData.name} ! 🎉 Cliquez sur le bouton ci-dessous pour envoyer vos réponses directement sur notre WhatsApp officiel.`, [`Envoyer sur WhatsApp`]);
            
            // Gérer le clic final
            setTimeout(() => {
                const finalBtn = body.querySelectorAll('.chat-option-btn');
                const lastBtn = finalBtn[finalBtn.length - 1];
                if (lastBtn) {
                    lastBtn.addEventListener('click', () => {
                        window.open(waUrl, '_blank');
                    });
                }
            }, 1300);
        }
    }

    // 7. Événements de saisie
    sendBtn.addEventListener('click', () => {
        handleUserInput(input.value);
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput(input.value);
        }
    });
}

// Initialiser l'assistant (gestion Vercel / defer)
function tryInitAssistant() {
    if (!document.getElementById('yara-assistant-wrapper')) {
        initAssistant();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInitAssistant);
} else {
    tryInitAssistant();
}
