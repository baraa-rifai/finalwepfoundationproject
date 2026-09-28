function setTheme(theme) {
  localStorage.setItem('user_theme', theme);
  document.documentElement.setAttribute('data-theme-mode', theme);

  if (theme === 'black') {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.body.classList.remove('has-custom-bg');
    document.body.style.removeProperty('background-image');
  } else if (theme === 'dark') {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    applySavedBackground();
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    applySavedBackground();
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('user_theme') || 'light';
  setTheme(savedTheme);
}

function applySavedBackground() {
  const currentTheme = localStorage.getItem('user_theme');
  const bgType = localStorage.getItem('userBgType');
  const bgValue = localStorage.getItem('userBgValue');

  if (bgType === 'image' && bgValue) {
    if (currentTheme === 'black') {
      localStorage.setItem('user_theme', 'dark');
      document.documentElement.setAttribute('data-theme-mode', 'dark');
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
    document.body.classList.add('has-custom-bg');
    document.body.style.setProperty('background-image', `linear-gradient(rgba(10, 25, 20, 0.78), rgba(10, 25, 20, 0.78)), url('${bgValue}')`, 'important');
    document.body.style.setProperty('background-size', 'cover', 'important');
    document.body.style.setProperty('background-position', 'center center', 'important');
    document.body.style.setProperty('background-attachment', 'fixed', 'important');
    document.body.style.setProperty('background-repeat', 'no-repeat', 'important');
  } else {
    document.body.classList.remove('has-custom-bg');
    document.body.style.removeProperty('background-image');
    document.body.style.removeProperty('background-size');
    document.body.style.removeProperty('background-position');
    document.body.style.removeProperty('background-attachment');
    document.body.style.removeProperty('background-repeat');
  }
}

async function fetchDailyAyah() {
  const tickerEl = document.getElementById('dailyAyahText');
  if (!tickerEl) return;

  try {
    const randomAyahNumber = Math.floor(Math.random() * 6236) + 1;
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${randomAyahNumber}/quran-uthmani`);
    const data = await res.json();

    if (data.code === 200 && data.data) {
      const ayah = data.data;
      tickerEl.textContent = `﴿ ${ayah.text} ﴾ [ ${ayah.surah.name}: ${ayah.numberInSurah}]`;
    }
  } catch (err) {
    tickerEl.textContent = "﴿ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴾ [سورة الرعد: 28]";
  }
}

(function() {
  const savedTheme = localStorage.getItem('user_theme') || 'light';
  document.documentElement.setAttribute('data-theme-mode', savedTheme);
  if (savedTheme === 'black' || savedTheme === 'dark') {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  fetchDailyAyah();
});