const glow = document.querySelector('.glow');
window.addEventListener('pointermove', (e) => {
  glow.style.setProperty('--x', e.clientX + 'px');
  glow.style.setProperty('--y', e.clientY + 'px');
});

const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 90 + 'ms';
  io.observe(el);
});

document.getElementById('y').textContent = new Date().getFullYear();

// Sticker que sigue al mouse dentro de una seccion; el clic equivale a pulsar su boton.
function chase(cta, link) {
  const chaser = cta && cta.querySelector('.chaser');
  if (!chaser || !link || !window.matchMedia('(pointer: fine)').matches) return;

  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let tx = 0, ty = 0, x = 0, y = 0, active = false, pressed = false, raf = 0;

  const draw = () => {
    const k = smooth ? 0.18 : 1;
    const dx = tx - x;
    x += dx * k;
    y += (ty - y) * k;
    const tilt = Math.max(-25, Math.min(25, dx * 0.5));
    chaser.style.transform = `translate(${x}px, ${y}px) rotate(${tilt}deg) scale(${pressed ? 0.88 : 1})`;
    raf = active ? requestAnimationFrame(draw) : 0;
  };

  cta.addEventListener('pointermove', (e) => {
    const r = cta.getBoundingClientRect();
    tx = e.clientX - r.left;
    ty = e.clientY - r.top;
    if (!active) {
      x = tx; y = ty; active = true;
      cta.classList.add('chasing');
      if (!raf) raf = requestAnimationFrame(draw);
    }
  });
  cta.addEventListener('pointerleave', () => {
    active = false; pressed = false;
    cta.classList.remove('chasing');
  });
  cta.addEventListener('pointerdown', () => { pressed = true; });
  cta.addEventListener('pointerup', () => { pressed = false; });
  cta.addEventListener('click', (e) => {
    if (e.target.closest('a')) return; // el boton ya hace su propio clic
    link.click();
  });
}

chase(document.querySelector('.hero'), document.querySelector('.hero a.pill'));
