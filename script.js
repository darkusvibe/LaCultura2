// script.js — Lacultura interactive behavior

document.addEventListener('DOMContentLoaded', () => {
  /* THEME (persistent) */
  const themeToggle = document.getElementById('theme-toggle');
  const docEl = document.documentElement;

  const setThemeIcon = () => {
    const i = themeToggle?.querySelector('i');
    if (!i) return;
    i.className = docEl.classList.contains('light-mode') ? 'fas fa-sun' : 'fas fa-moon';
  };

  try {
    if (localStorage.getItem('lacultura-theme') === 'light')
      docEl.classList.add('light-mode');
  } catch (e) {}
  setThemeIcon();
  themeToggle?.addEventListener('click', () => {
    docEl.classList.toggle('light-mode');
    const isLight = docEl.classList.contains('light-mode');
    try {
      localStorage.setItem('lacultura-theme', isLight ? 'light' : 'dark');
    } catch (e) {}
    setThemeIcon();
  });

  /* SIDEBAR (mobile toggle) */
  const burger = document.getElementById('burger');
  const sidebar = document.getElementById('sidebar');
  burger?.addEventListener('click', () => sidebar.classList.toggle('open'));

  /* HERO SLIDESHOW */
  const slides = Array.from(document.querySelectorAll('.slide'));
  let idx = 0;
  const show = (n) => slides.forEach((s, i) => s.classList.toggle('active', i === n));
  show(idx);
  setInterval(() => {
    idx = (idx + 1) % slides.length;
    show(idx);
  }, 4500);

  document.getElementById('prev-slide')?.addEventListener('click', () => {
    idx = (idx - 1 + slides.length) % slides.length;
    show(idx);
  });
  document.getElementById('next-slide')?.addEventListener('click', () => {
    idx = (idx + 1) % slides.length;
    show(idx);
  });

  /* NARRATION (Web Speech API) */
  document.querySelectorAll('.narrate').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.textId;
      const text = document.getElementById(id)?.innerText.trim();
      if (!text) return;
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        btn.innerHTML = '<i class="fas fa-headphones"></i> Narrate';
      } else {
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-GB';
        u.rate = 1;
        u.onend = () =>
          (btn.innerHTML = '<i class="fas fa-headphones"></i> Narrate');
        btn.innerHTML = '<i class="fas fa-stop"></i> Stop';
        speechSynthesis.speak(u);
      }
    });
  });

  /* VIDEO MODAL */
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
  document.querySelectorAll('.video .thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      iframe.src = thumb.dataset.video + '?autoplay=1';
      modal.style.display = 'flex';
    });
  });
  document.getElementById('video-close')?.addEventListener('click', () => {
    iframe.src = '';
    modal.style.display = 'none';
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      iframe.src = '';
      modal.style.display = 'none';
    }
  });

  /* ATTIRE LEARN MORE / BUY NOW */
  document.querySelectorAll('.attire-card .learn-more').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('.attire-card').classList.toggle('open');
    });
  });
  document.querySelectorAll('.attire-card .buy-now').forEach((btn) => {
    btn.addEventListener('click', () => alert('🛍️ Coming soon!'));
  });

  /* PROFILE DROPDOWN TOGGLE */
  const navProfilePic = document.getElementById('nav-profile-pic');
  const dropdown = document.getElementById('profile-dropdown');

  if (navProfilePic && dropdown) {
    navProfilePic.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });
    // close dropdown if clicked outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
    });
  }
});
