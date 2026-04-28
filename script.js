// Elements Selection
const header = document.getElementById('header');
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

// Header Scroll Effect & Back to Top Visibility
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Mobile Menu Toggle
mobileNavToggle.addEventListener('click', () => {
    mobileNavToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close Mobile Menu on Link Click
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('active');
        navMenu.classList.remove('active');
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

// Form Validation & Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;

        // Simple Validation
        [name, email, message].forEach(input => {
            const group = input.parentElement;
            if (!input.value.trim() || (input.type === 'email' && !validateEmail(input.value))) {
                group.classList.add('error');
                isValid = false;
            } else {
                group.classList.remove('error');
            }
        });

        if (isValid) {
            // Simulate Sending
            const btnText = submitBtn.querySelector('.btn-text');
            const loader = submitBtn.querySelector('.loader');
            
            btnText.style.display = 'none';
            loader.style.display = 'block';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'flex';
                formSuccess.style.animation = 'fadeInUp 0.8s ease-out';
            }, 2000);
        }
    });
}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

function resetForm() {
    contactForm.reset();
    contactForm.style.display = 'block';
    formSuccess.style.display = 'none';
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
    btnText.style.display = 'block';
    loader.style.display = 'none';
    submitBtn.disabled = false;
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply reveal effect
document.querySelectorAll('.service-card, .portfolio-item, .step, .section-title, .contact-container').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
    
    // Add a class to handle the animation in JS/CSS
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    observer.observe(item);
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Process Modern Accordion
function toggleProcess(element) {
    const item = element.parentElement;
    const isAlreadyActive = item.classList.contains('active');
    
    // Close all items
    document.querySelectorAll('.process-item').forEach(pItem => {
        pItem.classList.remove('active');
    });
    
    // Toggle clicked item
    if (!isAlreadyActive) {
        item.classList.add('active');
    }
}
