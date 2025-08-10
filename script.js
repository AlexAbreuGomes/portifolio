// Script global do site e CV
// Reveal (index)
(function () {
    const iniciarObservador = () => {
        if (!('IntersectionObserver' in window)) return;
        const prefereReducao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefereReducao) return;
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => { if (entrada.isIntersecting) { entrada.target.classList.add('reveal-visible'); observador.unobserve(entrada.target); } });
        }, { threshold: 0.15 });
        document.querySelectorAll('.reveal').forEach(elemento => observador.observe(elemento));
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarObservador); else iniciarObservador();
})();

// Botão voltar ao topo (index)
(function () {
    const botaoTopo = document.querySelector('.back-to-top');
    if (!botaoTopo) return;
    const alternarVisibilidade = () => { window.scrollY > 480 ? botaoTopo.classList.add('show') : botaoTopo.classList.remove('show'); };
    window.addEventListener('scroll', alternarVisibilidade, { passive: true });
    botaoTopo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// CV: data e auto print
(function () {
    const spanData = document.getElementById('cv-date');
    if (spanData) { spanData.textContent = new Date().toLocaleDateString('pt-BR'); }
    if (/print=1|pdf=1/i.test(window.location.search)) {
        setTimeout(() => window.print(), 400);
    }
})();

// Menu móvel
(function () {
    const nav = document.querySelector('.site-nav');
    const botao = document.querySelector('.nav-toggle');
    const links = document.querySelectorAll('.nav-links a');
    if (!nav || !botao) return;
    const fechar = () => { nav.classList.remove('open'); botao.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); };
    botao.addEventListener('click', () => {
        const aberto = botao.getAttribute('aria-expanded') === 'true';
        if (aberto) { fechar(); }
        else { nav.classList.add('open'); botao.setAttribute('aria-expanded', 'true'); document.body.classList.add('menu-open'); }
    });
    links.forEach(l => l.addEventListener('click', fechar));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });
})();
