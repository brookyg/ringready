// RingReady — main.js

// NAV scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('navMobile');
  menu.classList.toggle('open');
}
document.querySelectorAll('.nav-mobile a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navMobile').classList.remove('open');
  });
});

// DEMO animation
let demoTimer = null;
const demoSteps = [
  { id: 'd1', delay: 1200 },
  { id: 'd2', delay: 3000 },
  { id: 'd3', delay: 4400 },
  { id: 'd4', delay: 6200 },
  { id: 'd5', delay: 7500 },
  { id: 'd6', delay: 9000 },
];

function runDemo() {
  demoSteps.forEach(({ id, delay }) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    }, delay);
  });
}

function replayDemo() {
  if (demoTimer) { demoSteps.forEach((_, i) => clearTimeout(i)); }
  demoSteps.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
    }
  });
  setTimeout(runDemo, 300);
}

// Set initial transforms
demoSteps.forEach(({ id }) => {
  const el = document.getElementById(id);
  if (el) el.style.transform = 'translateY(8px)';
});

// Intersection observer to trigger demo when in view
const demoCard = document.querySelector('.demo-card');
if (demoCard) {
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      runDemo();
      obs.disconnect();
    }
  }, { threshold: 0.3 });
  obs.observe(demoCard);
}

// Scroll-reveal for sections
const reveals = document.querySelectorAll(
  '.feature-card, .testi-card, .pricing-card, .step, .problem-card, .stat'
);
reveals.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 60 * (Array.from(reveals).indexOf(entry.target) % 4));
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObs.observe(el));

// CTA form submit
function handleSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  const val = input.value.trim();
  if (!val) return;
  btn.textContent = 'Sending setup link…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Check your phone!';
    input.value = '';
    setTimeout(() => {
      btn.innerHTML = 'Get started free <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      btn.disabled = false;
    }, 3000);
  }, 1200);
}
