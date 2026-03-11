// script.js — añade clase 'js', gestiona tema y reveal con stagger
(function(){
  try {
    // 1) Activar estilos dependientes de JS
    document.documentElement.classList.add('js');

    // 2) Theme toggle (igual que antes)
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const stored = localStorage.getItem('theme');
    const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const systemPrefersDark = mql ? mql.matches : false;

    if(stored === 'dark' || (!stored && systemPrefersDark)) {
      root.setAttribute('data-theme','dark');
    } else {
      root.removeAttribute('data-theme');
    }

    function updateIcon(){
      const isDark = root.getAttribute('data-theme') === 'dark';
      if(toggle) toggle.textContent = isDark ? '☀️' : '🌙';
    }
    updateIcon();

    if(toggle){
      toggle.addEventListener('click', () => {
        const isDark = root.getAttribute('data-theme') === 'dark';
        if(isDark){
          root.removeAttribute('data-theme');
          localStorage.setItem('theme','light');
        } else {
          root.setAttribute('data-theme','dark');
          localStorage.setItem('theme','dark');
        }
        updateIcon();
      });
    }

    // 3) Scroll reveal con IntersectionObserver y stagger
    (function(){
      const reveals = Array.from(document.querySelectorAll('.reveal'));
      if(reveals.length === 0) return;

      // función para aplicar visible con delay
      const applyVisible = (el, index) => {
        // calculo de delay: 0.06s por índice, máximo 0.36s
        const delay = Math.min(index * 0.06, 0.36);
        el.style.setProperty('--reveal-delay', `${delay}s`);
        // forzamos reflow para asegurar transición en algunos navegadores
        void el.offsetWidth;
        el.classList.add('visible');
      };

      if('IntersectionObserver' in window){
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if(entry.isIntersecting){
              // cuando un contenedor reveal entra, aplicamos stagger a sus hijos directos .reveal-child si existen
              const target = entry.target;
              // si el elemento contiene elementos con clase .reveal-child, los animamos en cascada
              const children = target.querySelectorAll('.reveal-child');
              if(children.length){
                children.forEach((c, i) => applyVisible(c, i));
              } else {
                // si no hay hijos, aplicamos delay según posición global
                const index = reveals.indexOf(target);
                applyVisible(target, index >= 0 ? index : 0);
              }
              observer.unobserve(target);
            }
          });
        }, {threshold: 0.12, rootMargin: '0px 0px -6% 0px'});
        reveals.forEach(r => observer.observe(r));
      } else {
        // Fallback: mostrar todo con pequeño stagger
        reveals.forEach((r, i) => setTimeout(() => {
          r.style.setProperty('--reveal-delay', `${Math.min(i * 0.06, 0.36)}s`);
          r.classList.add('visible');
        }, i * 80));
      }
    })();

  } catch (err) {
    console.error('Script error:', err);
    // Si algo falla, mostramos todo para no romper la página
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
})();
