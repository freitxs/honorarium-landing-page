document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
     * 1) Menu Mobile
     * ----------------------------- */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('is-active');
            navMenu.classList.toggle('is-active');
            const isActive = navToggle.classList.contains('is-active');
            navToggle.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('is-active')) {
                navToggle.classList.remove('is-active');
                navMenu.classList.remove('is-active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = 'auto';
            }
        });
    });

    /* -----------------------------
     * 2) Header ao rolar
     * ----------------------------- */
    const header = document.getElementById('site-header');
    if (header) {
        const onScrollHeader = () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScrollHeader, { passive: true });
        onScrollHeader();
    }

    /* -----------------------------
     * 3) Fade-in on scroll
     * ----------------------------- */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    } else {
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    /* -----------------------------
     * 4) Form demo (animação simples do botão)
     * ----------------------------- */
    const demoForm = document.getElementById('demo-form');
    const successMessage = document.getElementById('form-success-message');
    // Nota: O envio real está no script do HTML (fetch). Aqui é apenas UX fallback se necessário.
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            // A lógica de envio real está no index.html
        });
    }

    /* (#1) Contadores animados (Quem Somos) */
    const counters = document.querySelectorAll('.about-stats .stat-item h3');
    if (counters.length) {
        const animateNumber = (el) => {
            const raw = (el.textContent || '').trim();
            const hasPlus = raw.startsWith('+');
            const hasPercent = raw.endsWith('%');
            const end = parseInt(raw.replace(/[^\d]/g, ''), 10) || 0;
            const duration = 1200;
            const startTime = performance.now();

            const step = (now) => {
                const p = Math.min((now - startTime) / duration, 1);
                const val = Math.floor(end * p).toLocaleString('pt-BR');
                el.textContent = (hasPlus ? '+' : '') + val + (hasPercent ? '%' : '');
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };

        const obs = new IntersectionObserver((entries, o) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    animateNumber(e.target);
                    o.unobserve(e.target);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(c => obs.observe(c));
    }

    /* (#8) Barra de progresso de leitura */
    const sp = document.createElement('div');
    sp.id = 'scroll-progress';
    sp.className = 'scroll-progress';
    document.body.appendChild(sp);

    const onScrollProgress = () => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
        sp.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScrollProgress, { passive: true });
    window.addEventListener('resize', onScrollProgress);
    onScrollProgress();

    /* -----------------------------
     * 11) Hero Carousel
     * ----------------------------- */
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 1) {
        let currentSlide = 0;
        const slideInterval = 6000; 

        const nextSlide = () => {
            heroSlides[currentSlide].classList.remove('is-active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('is-active');
        };

        setInterval(nextSlide, slideInterval);
    }
});
