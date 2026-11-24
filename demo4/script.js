document.getElementById('y').textContent = new Date().getFullYear();

// Aparicion al hacer scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + 'ms';
  io.observe(el);
});

// Luz que sigue al cursor dentro de las tarjetas de servicios
document.querySelectorAll('.svc').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', e.clientX - r.left + 'px');
    card.style.setProperty('--my', e.clientY - r.top + 'px');
  });
});

// Sticker que sigue al mouse dentro de una seccion; el clic equivale a pulsar su boton.
function chase(section, link) {
  const chaser = section && section.querySelector('.chaser');
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

  section.addEventListener('pointermove', (e) => {
    const r = section.getBoundingClientRect();
    tx = e.clientX - r.left;
    ty = e.clientY - r.top;
    if (!active) {
      x = tx; y = ty; active = true;
      section.classList.add('chasing');
      if (!raf) raf = requestAnimationFrame(draw);
    }
  });
  section.addEventListener('pointerleave', () => {
    active = false; pressed = false;
    section.classList.remove('chasing');
  });
  section.addEventListener('pointerdown', () => { pressed = true; });
  section.addEventListener('pointerup', () => { pressed = false; });
  section.addEventListener('click', (e) => {
    if (e.target.closest('a')) return; // los enlaces ya hacen su propio clic
    link.click();
  });
}

chase(document.querySelector('.hero'), document.querySelector('.hero .actions a.btn'));
