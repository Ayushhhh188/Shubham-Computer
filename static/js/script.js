document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('modalOverlay');
    const modals = document.querySelectorAll('.modal');

    // ─────────────── Modal Management ───────────────
    window.openModal = (id) => {
        const modal = document.getElementById(id);
        if (!modal) return;
        modals.forEach(m => m.classList.remove('active'));
        overlay.style.display = 'block';
        modal.classList.add('active');
    };

    window.closeAllModals = () => {
        modals.forEach(modal => modal.classList.remove('active'));
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    };

    window.closeModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
        const anyOpen = [...modals].some(m => m.classList.contains('active'));
        if (!anyOpen) {
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // ─────────────── Fade-In on Scroll ───────────────
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

    // ─────────────── Cost Calculation Functions ───────────────

    // Computer Composing Modal: ₹10/page (English), ₹20/page (Hindi)
    window.calcComposingCost = () => {
        const pages = parseInt(document.getElementById('pagesInput').value) || 0;
        const language = document.getElementById('language').value;
        const rate = language === 'English' ? 10 : 20;
        const total = pages * rate;
        document.getElementById('composingCost').textContent = `₹${total}`;
    };

    // Computer Print Modal:
    // B&W:
    // 1 page = ₹10
    // 2 pages = ₹15
    // 3+ pages = ₹5/page
    // Colour = ₹20/page
    // Photo Paper +₹20/page
    window.calcPrintCost = () => {
        const pages = parseInt(document.getElementById('printPages').value) || 0;
        const type = document.querySelector('input[name="printType"]:checked').value;
        const paperType = document.getElementById('paperType').value;
        let rate = 0;

        if (type === 'bw') {
            if (pages === 1) rate = 10;
            else if (pages === 2) rate = 7.5; // 15/2
            else if (pages >= 3) rate = 5;
        } else if (type === 'colour') {
            rate = 20;
        }

        let total = pages * rate;

        if (paperType === 'photo') {
            total += pages * 20; // Photo Paper surcharge
        }

        document.getElementById('printCost').textContent = `₹${total}`;
    };

    // Xerox Modal: ₹3/page B&W
    window.calcXeroxCost = () => {
        const pages = parseInt(document.getElementById('xeroxPages').value) || 0;
        const rate = 3;
        const total = pages * rate;
        document.getElementById('xeroxCost').textContent = `₹${total}`;
    };
});
