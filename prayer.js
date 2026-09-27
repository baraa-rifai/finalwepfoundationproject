const PRAYER_NAMES = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء"
};

const DISPLAY_PRAYERS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
const FARD_PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

function normalizeNumber(input, allowNegative = false) {
  if (input === undefined || input === null || input === '') return 0;
  const easternNumbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  let str = input.toString().trim();
  for (let i = 0; i < 10; i++) {
    str = str.replaceAll(easternNumbers[i], i);
  }
  const parsed = parseInt(str, 10);
  if (isNaN(parsed)) return 0;
  if (!allowNegative && parsed < 0) return 0;
  return parsed;
}

let rawPrayerTimes = {};
let adjustedPrayerTimes = {};
let currentRawDate = null;

let prayerOffsets = JSON.parse(localStorage.getItem('prayer_offsets')) || {
  Fajr: 0, Sunrise: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0
};

let iqamaMinutes = JSON.parse(localStorage.getItem('iqama_minutes')) || {
  Fajr: 15, Dhuhr: 15, Asr: 15, Maghrib: 15, Isha: 15
};

function renderHijriDateWithOffset() {
  if (!currentRawDate) return;
  const offset = parseInt(localStorage.getItem('hijri_offset') || '0', 10);
  const baseDay = parseInt(currentRawDate.hijri.day, 10);
  const adjustedDay = baseDay + offset;
  const hijriStr = `${adjustedDay} ${currentRawDate.hijri.month.ar} ${currentRawDate.hijri.year} هـ`;
  const gregorianStr = currentRawDate.gregorian.date;

  const dateEl = document.getElementById('prayer-date');
  if (dateEl) {
    dateEl.textContent = `${currentRawDate.hijri.weekday.ar} : ${hijriStr} - ${gregorianStr} م`;
  }
}

async function getPrayerTimes() {
  const city = localStorage.getItem('selected_city') || 'Amman';
  const country = 'Jordan';
  const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=4`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.code === 200) {
      rawPrayerTimes = data.data.timings;
      currentRawDate = data.data.date;
      
      renderHijriDateWithOffset();
      applyAdjustments();
      renderPrayerDisplay();
      setupAdjustModal();
    }
  } catch (err) {
    console.error("فشل جلب المواقيت", err);
  }
}

function timeStringToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTimeString(totalMinutes) {
  let normalized = (totalMinutes % 1440 + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function format12Hour(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'م' : 'ص';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

function applyAdjustments() {
  adjustedPrayerTimes = {};
  DISPLAY_PRAYERS.forEach(p => {
    if (rawPrayerTimes[p]) {
      const baseMin = timeStringToMinutes(rawPrayerTimes[p]);
      const offset = prayerOffsets[p] || 0;
      adjustedPrayerTimes[p] = minutesToTimeString(baseMin + offset);
    }
  });
}

function getNextPrayerInfo(now) {
  const currentMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
  let nextPrayer = null;
  let nextMinutes = Infinity;

  for (let p of FARD_PRAYERS) {
    if (!adjustedPrayerTimes[p]) continue;
    const pMinutes = timeStringToMinutes(adjustedPrayerTimes[p]);
    if (pMinutes > currentMinutes && pMinutes < nextMinutes) {
      nextMinutes = pMinutes;
      nextPrayer = p;
    }
  }

  if (!nextPrayer) {
    nextPrayer = "Fajr";
    nextMinutes = timeStringToMinutes(adjustedPrayerTimes["Fajr"]) + 1440;
  }

  const diffSec = Math.floor((nextMinutes - currentMinutes) * 60);
  return { key: nextPrayer, remainingSeconds: diffSec };
}

function getActiveIqamaCountdown(now) {
  const currentMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  for (let p of FARD_PRAYERS) {
    if (!adjustedPrayerTimes[p]) continue;
    const pMinutes = timeStringToMinutes(adjustedPrayerTimes[p]);
    const duration = iqamaMinutes[p] !== undefined ? iqamaMinutes[p] : 15;
    const elapsedMinutes = currentMinutes - pMinutes;

    if (elapsedMinutes >= 0 && elapsedMinutes < duration) {
      const remainingSec = Math.floor((duration - elapsedMinutes) * 60);
      return { active: true, prayerName: PRAYER_NAMES[p], seconds: remainingSec };
    }
  }

  return { active: false };
}

function renderPrayerDisplay() {
  const gridContainer = document.getElementById('prayer-cards-container');
  const tableBody = document.getElementById('prayer-table-body');
  if (!gridContainer) return;

  const now = new Date();
  const nextInfo = getNextPrayerInfo(now);

  const nextNameEl = document.getElementById('next-prayer-name');
  if (nextNameEl) nextNameEl.textContent = PRAYER_NAMES[nextInfo.key];

  gridContainer.innerHTML = '';
  if (tableBody) tableBody.innerHTML = '';

  DISPLAY_PRAYERS.forEach(p => {
    const isNext = (p === nextInfo.key);
    const timeFormatted = format12Hour(adjustedPrayerTimes[p]);

    const card = document.createElement('div');
    card.className = `prayer-single-card ${isNext ? 'is-next-prayer' : ''}`;
    card.innerHTML = `
      <h6>${PRAYER_NAMES[p]}</h6>
      <h4>${timeFormatted}</h4>
    `;
    gridContainer.appendChild(card);

    if (tableBody) {
      const row = document.createElement('tr');
      if (isNext) row.className = 'is-next-prayer-row';
      row.innerHTML = `
        <td class="fw-bold py-2">${PRAYER_NAMES[p]}</td>
        <td class="font-monospace py-2">${timeFormatted}</td>
      `;
      tableBody.appendChild(row);
    }
  });
}

function updateLiveClockAndCountdown() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const liveClockEl = document.getElementById('live-clock');
  if (liveClockEl) liveClockEl.textContent = `${hours}:${minutes}:${seconds}`;

  if (Object.keys(adjustedPrayerTimes).length > 0) {
    const nextInfo = getNextPrayerInfo(now);
    const s = nextInfo.remainingSeconds;
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    const timerEl = document.getElementById('countdown-timer');
    if (timerEl) {
      timerEl.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }

    const nextNameEl = document.getElementById('next-prayer-name');
    if (nextNameEl && nextNameEl.textContent !== PRAYER_NAMES[nextInfo.key]) {
      renderPrayerDisplay();
    }

    const iqamaTimerEl = document.getElementById('iqama-timer');
    const iqamaLabelEl = document.getElementById('iqama-card-label');
    const iqamaStatus = getActiveIqamaCountdown(now);

    if (iqamaStatus.active) {
      const remM = Math.floor(iqamaStatus.seconds / 60);
      const remS = iqamaStatus.seconds % 60;
      if (iqamaLabelEl) iqamaLabelEl.textContent = `إقامة صلاة ${iqamaStatus.prayerName}`;
      if (iqamaTimerEl) {
        iqamaTimerEl.textContent = `${String(remM).padStart(2, '0')}:${String(remS).padStart(2, '0')}`;
        iqamaTimerEl.classList.add('text-danger');
        iqamaTimerEl.classList.remove('text-success');
      }
    } else {
      if (iqamaLabelEl) iqamaLabelEl.textContent = "المتبقي للإقامة";
      if (iqamaTimerEl) {
        iqamaTimerEl.textContent = "--:--";
        iqamaTimerEl.classList.remove('text-danger');
        iqamaTimerEl.classList.add('text-success');
      }
    }
  }
}

function setupAdjustModal() {
  const offsetContainer = document.getElementById('prayer-offsets-form');
  const iqamaContainer = document.getElementById('iqama-settings-form');
  if (!offsetContainer || !iqamaContainer) return;

  offsetContainer.innerHTML = '';
  DISPLAY_PRAYERS.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4';
    col.innerHTML = `
      <label class="form-label small fw-bold mb-1">${PRAYER_NAMES[p]}:</label>
      <input type="text" class="form-control form-control-sm text-center offset-input" data-prayer="${p}" value="${prayerOffsets[p] || 0}">
    `;
    offsetContainer.appendChild(col);
  });

  iqamaContainer.innerHTML = '';
  FARD_PRAYERS.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4';
    col.innerHTML = `
      <label class="form-label small fw-bold mb-1">${PRAYER_NAMES[p]}:</label>
      <div class="input-group input-group-sm">
        <input type="text" class="form-control text-center iqama-input" data-prayer="${p}" value="${iqamaMinutes[p] !== undefined ? iqamaMinutes[p] : 15}">
        <span class="input-group-text">د</span>
      </div>
    `;
    iqamaContainer.appendChild(col);
  });
}

function saveAllAdjustments() {
  document.querySelectorAll('.offset-input').forEach(inp => {
    const p = inp.dataset.prayer;
    prayerOffsets[p] = normalizeNumber(inp.value, true);
  });

  document.querySelectorAll('.iqama-input').forEach(inp => {
    const p = inp.dataset.prayer;
    iqamaMinutes[p] = normalizeNumber(inp.value, false);
  });

  localStorage.setItem('prayer_offsets', JSON.stringify(prayerOffsets));
  localStorage.setItem('iqama_minutes', JSON.stringify(iqamaMinutes));

  applyAdjustments();
  renderPrayerDisplay();

  const modalEl = document.getElementById('adjustModal');
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();
}

function resetAllAdjustments() {
  if (confirm("هل تريد إعادة ضبط جميع الفروق وأوقات الإقامة للقيم الافتراضية؟")) {
    prayerOffsets = { Fajr: 0, Sunrise: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 };
    iqamaMinutes = { Fajr: 15, Dhuhr: 15, Asr: 15, Maghrib: 15, Isha: 15 };

    localStorage.removeItem('prayer_offsets');
    localStorage.removeItem('iqama_minutes');

    setupAdjustModal();
    applyAdjustments();
    renderPrayerDisplay();
  }
}

function saveManualCity(e) {
  e.preventDefault();
  const select = document.getElementById('jordan-city-select');
  const city = select.value;
  const cityNameAr = select.options[select.selectedIndex].text;

  localStorage.setItem('selected_city', city);
  const locDisplay = document.getElementById('current-location-display');
  if (locDisplay) locDisplay.textContent = cityNameAr;

  const modalEl = document.getElementById('locationModal');
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();

  getPrayerTimes();
}

function getUserCurrentGPS() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=4`)
          .then(res => res.json())
          .then(data => {
            if (data.code === 200) {
              rawPrayerTimes = data.data.timings;
              currentRawDate = data.data.date;
              renderHijriDateWithOffset();
              document.getElementById('current-location-display').textContent = "موقعي الحالي (GPS)";
              applyAdjustments();
              renderPrayerDisplay();

              const modalEl = document.getElementById('locationModal');
              const modalInstance = bootstrap.Modal.getInstance(modalEl);
              if (modalInstance) modalInstance.hide();
            }
          });
      },
      () => alert("تعذر الوصول للموقع الجغرافي.")
    );
  }
}

function handleResumeQuran(e) {
  e.preventDefault();
  let targetPage = 1;

  const lastRead = localStorage.getItem('last_read_page');
  const savedBookmark = localStorage.getItem('user_quran_bookmark');

  if (lastRead) {
    targetPage = parseInt(lastRead, 10);
  } else if (savedBookmark) {
    try {
      const bm = JSON.parse(savedBookmark);
      targetPage = parseInt(bm.page, 10) || 1;
    } catch (err) {
      targetPage = 1;
    }
  }

  window.location.href = `quran.html?page=${targetPage}`;
}

const fullscreenBtn = document.getElementById('fullscreen-btn');
if (fullscreenBtn) {
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      document.body.classList.add('fullscreen-mode');
    } else {
      document.exitFullscreen().catch(() => {});
      document.body.classList.remove('fullscreen-mode');
    }
  });
}

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    document.body.classList.remove('fullscreen-mode');
  }
});

setInterval(updateLiveClockAndCountdown, 1000);

document.addEventListener('DOMContentLoaded', () => {
  const city = localStorage.getItem('selected_city') || 'Amman';
  const select = document.getElementById('jordan-city-select');
  if (select) {
    select.value = city;
    const locDisplay = document.getElementById('current-location-display');
    if (locDisplay && select.selectedIndex >= 0) {
      locDisplay.textContent = select.options[select.selectedIndex].text.split(' ')[0];
    }
  }

  const hijriSelect = document.getElementById('hijri-offset-select');
  if (hijriSelect) {
    hijriSelect.value = localStorage.getItem('hijri_offset') || '0';
    hijriSelect.addEventListener('change', (e) => {
      localStorage.setItem('hijri_offset', e.target.value);
      renderHijriDateWithOffset();
    });
  }

  getPrayerTimes();
});