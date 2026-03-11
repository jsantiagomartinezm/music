// Theme: detecta preferencia del sistema y permite override manual (localStorage)
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('theme');

  // Detecta preferencia del sistema
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Aplica prioridad: localStorage > preferencia del sistema > light por defecto
  if(stored === 'dark' || (!stored && systemPrefersDark)) {
    root.setAttribute('data-theme','dark');
  } else {
    root.removeAttribute('data-theme');
  }

  function updateIcon(){
    const isDark = root.getAttribute('data-theme') === 'dark';
    toggle.textContent = isDark ? '☀️' : '🌙';
  }
  updateIcon();

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

  // Escucha cambios en la preferencia del sistema y aplica solo si el usuario no eligió manualmente
  if(window.matchMedia){
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if(!localStorage.getItem('theme')) {
        if(e.matches) root.setAttribute('data-theme','dark');
        else root.removeAttribute('data-theme');
        updateIcon();
      }
    });
  }
})();
