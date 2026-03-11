// Theme toggle: guarda preferencia en localStorage
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('theme');
  if(stored === 'dark') root.setAttribute('data-theme','dark');

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
})();

// Scroll reveal simple
(function(){
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        // Si querés que se revele solo una vez, descomenta la siguiente línea:
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(r => observer.observe(r));
})();
