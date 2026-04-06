/* ===== BASHAR PLATFORM — main.js ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    document.getElementById('backTop').classList.toggle('show', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Active nav link on scroll ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');
  const observer  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));

  /* ── Fade-up reveal ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => revealObs.observe(el));

  /* ── Counter animation ── */
  const counters = document.querySelectorAll('.counter');
  let counted = false;
  const statsSection = document.getElementById('stats');

  const runCounters = () => {
    if (counted) return;
    counted = true;
    counters.forEach(el => {
      const target  = parseFloat(el.dataset.target);
      const suffix  = el.dataset.suffix || '';
      const isFloat = el.dataset.float === 'true';
      const duration = 1800;
      const start = performance.now();
      const step = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = isFloat ? (eased * target).toFixed(1) : Math.round(eased * target);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };

  if (statsSection) {
    const statsObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) runCounters();
    }, { threshold: 0.3 });
    statsObs.observe(statsSection);
  }

  /* ── Back to top ── */
  document.getElementById('backTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Mobile menu close on link click ── */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('mainNav');
      if (collapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(collapse)?.hide();
      }
    });
  });

  /* ── Join form ── */
  const joinForm = document.getElementById('joinForm');
  if (joinForm) {
    joinForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = joinForm.querySelector('input[type="email"]');
      if (!input.value.trim()) return;
      const btn = joinForm.querySelector('button');
      btn.textContent = 'تم التسجيل ✓';
      btn.disabled = true;
      btn.style.background = '#D1FAE5';
      btn.style.color = '#065F46';
      input.value = '';
      setTimeout(() => { btn.textContent = 'سجّل الآن'; btn.disabled = false; btn.style = ''; }, 3500);
    });
  }

});