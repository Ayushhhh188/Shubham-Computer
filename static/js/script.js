document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('modalOverlay');
    const modals = document.querySelectorAll('.modal');

    // Open specific modal
    window.openModal = (id) => {
        const modal = document.getElementById(id);
        if (!modal) return;

        // Hide all other modals first
        modals.forEach(m => m.classList.remove('active'));

        // Show overlay and modal
        overlay.style.display = 'block';
        modal.classList.add('active');
    };

    // Close all modals
    window.closeAllModals = () => {
        modals.forEach(modal => modal.classList.remove('active'));

        // Hide overlay after animation delay
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300); // sync with CSS animation
    };

    // Close specific modal (used by "×" buttons)
    window.closeModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('active');
        }

        // Check if any modal is still open
        const anyOpen = [...modals].some(m => m.classList.contains('active'));

        if (!anyOpen) {
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }
    };

    // ESC key closes all modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Fade-in effect on scroll
    const fadeEls = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    fadeEls.forEach(el => observer.observe(el));
});
