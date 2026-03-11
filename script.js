// script.js — añade clase 'js', gestiona tema y reveal
(function(){
  try {
    // Añadir clase 'js' para activar estilos dependientes de JS
    document.documentElement.classList.add('js');

    // Theme toggle (mantiene la lógica previa)
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

    if(mql){
      if(typeof mql.addEventListener === 'function'){
        mql.addEventListener('change', e => {
          if(!localStorage.getItem('theme')) {
            if(e.matches) root.setAttribute('data-theme','dark');
            else root.removeAttribute('data-theme');
            updateIcon();
          }
        });
      } else if(typeof mql.addListener === 'function'){
        mql.addListener(e => {
          if(!localStorage.getItem('theme')) {
            if(e.matches) root.setAttribute('data-theme','dark');
            else root.removeAttribute('data-theme');
            updateIcon();
          }
        });
      }
    }

    // Scroll reveal con IntersectionObserver
    (function(){
      const reveals = document.querySelectorAll('.reveal');
      if(reveals.length === 0) return;

      if('IntersectionObserver' in window){
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if(entry.isIntersecting){
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, {threshold: 0.12, rootMargin: '0px 0px -6% 0px'});
        reveals.forEach(r => observer.observe(r));
      } else {
        // Fallback: si no hay IntersectionObserver, mostramos todo con pequeña demora
        reveals.forEach((r, i) => {
          setTimeout(() => r.classList.add('visible'), i * 80);
        });
      }
    })();

  } catch (err) {
    console.error('Script error:', err);
    // Si algo falla, mostramos todo para no romper la página
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
})();
  }
})();
