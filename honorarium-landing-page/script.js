document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
     * 1) Menu Mobile (igual ao seu)
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
     * 3) Fade-in on scroll (igual)
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
     * 4) Form demo (igual ao seu)
     * ----------------------------- */
    const demoForm = document.getElementById('demo-form');
    const successMessage = document.getElementById('form-success-message');
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitButton = demoForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            setTimeout(() => {
                demoForm.reset();
                demoForm.style.display = 'none';
                if (successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 1000);
        });
    }

    /* =====================================================
     * NOVAS FUNCIONALIDADES (sem mudar sua estrutura HTML)
     * ===================================================== */

    /* (#1) Contadores animados (Quem Somos)
       - Lê o texto atual de .about-stats h3 (ex: "+123", "75%")
       - Anima de 0 até o número, preservando prefixo/sufixo (+, %)
    */
    const counters = document.querySelectorAll('.about-stats .stat-item h3');
    if (counters.length) {
        const animateNumber = (el) => {
            const raw = (el.textContent || '').trim();
            const hasPlus = raw.startsWith('+');
            const hasPercent = raw.endsWith('%');

            // extrai apenas dígitos
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

    /* (#2) Carrossel de depoimentos sem alterar HTML
       - CSS já transforma .testimonials-grid em trilho com snap no mobile
       - Aqui, opcionalmente, podemos rolar por "arraste" (nativo) ou setas (não adicionamos botões)
    */

    /* (#3) Esteira infinita de logos (marquee)
       - Duplicamos os itens via JS e aplicamos classe .marquee (CSS anima)
    */
    const logos = document.querySelector('.logos-container');
    if (logos) {
        const children = Array.from(logos.children);
        children.forEach(node => logos.appendChild(node.cloneNode(true))); // duplica
        logos.classList.add('marquee');
    }

    /* (#4/#5) Hero já recebe Ken Burns/parallax pelo CSS */

    /* (#6) Micro-interações já aplicadas no CSS (.btn) */

    /* (#7) Realce nos cartões já aplicado no CSS (.benefit-card::after) */

    /* (#8) Barra de progresso de leitura (injetada sem mudar HTML)
       - cria <div id="scroll-progress"> e controla a largura conforme scroll
    */
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

    /* (#9) Anchor offset já resolvido no CSS com [id]{scroll-margin-top} */

    /* (#10) Chips com scroll no mobile (CSS já cobre)
    */
});
