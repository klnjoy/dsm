// KLN Data Strategy — Minimal interactions
// Main logic is inline in index.html for performance
// This file kept for backward compatibility with other pages

document.addEventListener('DOMContentLoaded', function() {
    // Form handling for legacy pages
    const form = document.getElementById('contactForm');
    if (form && !form.hasAttribute('data-netlify')) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = form.querySelector('button');
            if (btn) {
                btn.textContent = 'Message Sent ✓';
                btn.disabled = true;
                form.reset();
                setTimeout(() => {
                    btn.textContent = 'Send Message';
                    btn.disabled = false;
                }, 3000);
            }
        });
    }
});
