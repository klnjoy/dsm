// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Counter animation with performance optimization
function animateCounters() {
    const counters = document.querySelectorAll('.achievement-number');
    if (!counters.length) return;
    
    const duration = 2000;
    const startTime = performance.now();
    
    // Cache counter data to avoid repeated DOM queries
    const counterData = Array.from(counters).map(counter => ({
        element: counter,
        target: parseInt(counter.getAttribute('data-target')),
        suffix: counter.textContent.includes('%') ? '%' : '+'
    }));
    
    function updateCounters(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        counterData.forEach(({ element, target, suffix }) => {
            element.textContent = Math.floor(target * progress) + suffix;
        });
        
        if (progress < 1) {
            requestAnimationFrame(updateCounters);
        }
    }
    
    requestAnimationFrame(updateCounters);
}

// Skills animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        }
    });
}

// Testimonial slider
let slideIndex = 1;

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length || !dots.length) return;
    
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[slideIndex - 1] && dots[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto-slide testimonials
function autoSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const message = document.getElementById('formMessage');
    
    if (!form || !message) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        message.textContent = 'Thank you! Your message has been sent successfully.';
        message.className = 'form-message success';
        message.style.display = 'block';
        
        form.reset();
        
        setTimeout(() => {
            message.style.display = 'none';
        }, 5000);
    });
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'experience') {
                    animateCounters();
                }
                if (entry.target.id === 'skills') {
                    animateSkills();
                }
            }
        });
    });
    
    const experienceEl = document.getElementById('experience');
    const skillsEl = document.getElementById('skills');
    
    if (experienceEl) observer.observe(experienceEl);
    if (skillsEl) observer.observe(skillsEl);
    
    // Auto-slide testimonials with cleanup
    let slideInterval = setInterval(autoSlide, 5000);
    
    // Cleanup on page visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(slideInterval);
        } else {
            slideInterval = setInterval(autoSlide, 5000);
        }
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(slideInterval);
    });
});