// script.js — interactive behavior

document.addEventListener('DOMContentLoaded', () => {
  /* THEME (persistent) */
  const themeToggle = document.getElementById('theme-toggle');
  const docEl = document.documentElement;
  // Initialize icon state
  const setThemeIcon = () => {
    const i = themeToggle.querySelector('i');
    if (docEl.classList.contains('light-mode')) { i.className = 'fas fa-sun'; }
    else { i.className = 'fas fa-moon'; }
  };
  // load saved theme
  try {
    if (localStorage.getItem('lacultura-theme') === 'light') docEl.classList.add('light-mode');
  } catch(e){}
  setThemeIcon();
  themeToggle.addEventListener('click', () => {
    docEl.classList.toggle('light-mode');
    const isLight = docEl.classList.contains('light-mode');
    try { localStorage.setItem('lacultura-theme', isLight ? 'light' : 'dark'); } catch(e){}
    setThemeIcon();
  });

  /* SIDEBAR (mobile toggle) */
  const burger = document.getElementById('burger');
  const sidebar = document.getElementById('sidebar');
  burger?.addEventListener('click', () => sidebar.classList.toggle('open'));

  /* HERO slideshow (auto + manual) */
  const slides = Array.from(document.querySelectorAll('.slide'));
  let idx = 0, interval = null;
  const show = (n) => {
    slides.forEach((s,i)=> s.classList.toggle('active', i===n));
  };
  const start = () => interval = setInterval(()=>{ idx = (idx+1) % slides.length; show(idx); }, 4500);
  const stop = ()=> { if (interval) clearInterval(interval); interval = null; };
  show(idx); start();

  // manual controls
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  prevBtn?.addEventListener('click', () => { stop(); idx = (idx - 1 + slides.length) % slides.length; show(idx); start(); });
  nextBtn?.addEventListener('click', () => { stop(); idx = (idx + 1) % slides.length; show(idx); start(); });

  /* NARRATION (Web Speech API) - toggle speak/stop */
  let speaking = false;
  const narrateButtons = document.querySelectorAll('.narrate');
  narrateButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.textId;
      const el = document.getElementById(id);
      if (!el) return;
      const text = el.innerText.trim();
      if (!text) return;
      if (speechSynthesis.speaking) { speechSynthesis.cancel(); speaking = false; btn.innerHTML = '<i class="fas fa-headphones"></i> Narrate'; return; }
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-GB';
      u.rate = 1;
      u.onend = () => { speaking = false; btn.innerHTML = '<i class="fas fa-headphones"></i> Narrate'; };
      speaking = true;
      btn.innerHTML = '<i class="fas fa-stop"></i> Stop';
      speechSynthesis.speak(u);
    });
  });

  /* VIDEO MODAL (open on thumbnail click) */
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
  const videoThumbs = document.querySelectorAll('.video .thumb');
  const openVideo = (url) => {
    iframe.src = url + '?autoplay=1&rel=0';
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
  };
  videoThumbs.forEach(t => {
    t.addEventListener('click', () => openVideo(t.dataset.video));
  });
  document.getElementById('video-close')?.addEventListener('click', () => {
    iframe.src = ''; modal.style.display = 'none'; modal.setAttribute('aria-hidden','true');
  });
  modal.addEventListener('click', (e) => { if (e.target === modal) { iframe.src=''; modal.style.display='none'; } });

  /* LOGIN modal & profile (simple localStorage demo) */
  const loginOpen = document.getElementById('login-open');
  const loginModal = document.getElementById('login-modal');
  const loginClose = document.getElementById('login-close');
  const saveBtn = document.getElementById('save-profile');
  const logoutBtn = document.getElementById('logout');
  const usernameInput = document.getElementById('username-input');
  const profileNameEl = document.getElementById('profile-name');
  const profileView = document.getElementById('profile-view');
  const profileForm = document.getElementById('profile-form');
  const viewName = document.getElementById('view-name');
  // open/close
  loginOpen?.addEventListener('click', () => {
    loginModal.style.display = 'flex';
    const user = localStorage.getItem('lacultura-user');
    if (user) { profileForm.style.display='none'; profileView.style.display='block'; viewName.textContent = user; profileNameEl.textContent = user; }
    else { profileForm.style.display='block'; profileView.style.display='none'; }
  });
  loginClose?.addEventListener('click', ()=> loginModal.style.display='none');
  // save profile
  saveBtn?.addEventListener('click', () => {
    const name = usernameInput.value.trim();
    if (!name) return alert('Enter a display name');
    localStorage.setItem('lacultura-user', name);
    profileNameEl.textContent = name; viewName.textContent = name;
    profileForm.style.display='none'; profileView.style.display='block';
  });
  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('lacultura-user');
    profileNameEl.textContent = 'Login';
    profileForm.style.display='block'; profileView.style.display='none';
    loginModal.style.display='none';
  });

  // update displayed name at load
  const stored = localStorage.getItem('lacultura-user');
  if (stored) profileNameEl.textContent = stored;

  /* Close modals via Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal.style.display === 'flex') { iframe.src=''; modal.style.display='none'; }
      if (loginModal.style.display === 'flex') loginModal.style.display='none';
    }
  });

  /* close login modal click-out */
  loginModal.addEventListener('click', (e) => { if (e.target === loginModal) loginModal.style.display='none'; });

});
// Learn More toggle
document.querySelectorAll(".attire-card .learn-more").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".attire-card");
    card.classList.toggle("open");
  });
});

// Buy Now placeholder
document.querySelectorAll(".attire-card .buy-now").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Buy Now feature coming soon!");
  });
});
// Switch between login/register tabs
const loginTab = document.getElementById("tab-login");
const registerTab = document.getElementById("tab-register");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.style.display = "block";
  registerForm.style.display = "none";
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.style.display = "block";
  loginForm.style.display = "none";
});
