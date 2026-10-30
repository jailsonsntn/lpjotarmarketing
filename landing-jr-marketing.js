const menu = document.getElementById('menu');
document.getElementById('menu-toggle').addEventListener('click', () => menu.classList.toggle('show'));
document.querySelectorAll('#menu a').forEach(a => a.addEventListener('click', () => menu.classList.remove('show')));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.section > .wrap, .card, .step, .feature-panel, .cta-box');

revealItems.forEach(item => item.classList.add('js-reveal'));

if (reduceMotion) {
  revealItems.forEach(item => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));
}

if (!reduceMotion) {
  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;
    document.documentElement.style.setProperty('--hero-ring-y', `${scrollY * 0.12}px`);
    document.documentElement.style.setProperty('--orb-y', `${scrollY * -0.08}px`);
    document.documentElement.style.setProperty('--dashboard-y', `${scrollY * -0.035}px`);
    document.documentElement.style.setProperty('--float-one-y', `${scrollY * -0.06}px`);
    document.documentElement.style.setProperty('--float-two-y', `${scrollY * 0.05}px`);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }, { passive: true });

  updateParallax();
}
