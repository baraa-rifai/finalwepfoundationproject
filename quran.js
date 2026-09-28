let currentPage = 1;
let currentSurahName = "الفاتحة";

const SURAH_PAGES = [
  { no: 1, name: "الفاتحة", page: 1 },
  { no: 2, name: "البقرة", page: 2 },
  { no: 3, name: "آل عمران", page: 50 },
  { no: 4, name: "النساء", page: 77 },
  { no: 5, name: "المائدة", page: 106 },
  { no: 6, name: "الأنعام", page: 128 },
  { no: 7, name: "الأعراف", page: 151 },
  { no: 8, name: "الأنفال", page: 177 },
  { no: 9, name: "التوبة", page: 187 },
  { no: 10, name: "يونس", page: 208 },
  { no: 11, name: "هود", page: 221 },
  { no: 12, name: "يوسف", page: 235 },
  { no: 13, name: "الرعد", page: 249 },
  { no: 14, name: "إبراهيم", page: 255 },
  { no: 15, name: "الحجر", page: 262 },
  { no: 16, name: "النحل", page: 267 },
  { no: 17, name: "الإسراء", page: 282 },
  { no: 18, name: "الكهف", page: 293 },
  { no: 19, name: "مريم", page: 305 },
  { no: 20, name: "طه", page: 312 },
  { no: 21, name: "الأنبياء", page: 322 },
  { no: 22, name: "الحج", page: 332 },
  { no: 23, name: "المؤمنون", page: 342 },
  { no: 24, name: "النور", page: 350 },
  { no: 25, name: "الفرقان", page: 359 },
  { no: 26, name: "الشعراء", page: 367 },
  { no: 27, name: "النمل", page: 377 },
  { no: 28, name: "القصص", page: 385 },
  { no: 29, name: "العنكبوت", page: 396 },
  { no: 30, name: "الروم", page: 404 },
  { no: 31, name: "لقمان", page: 411 },
  { no: 32, name: "السجدة", page: 415 },
  { no: 33, name: "الأحزاب", page: 418 },
  { no: 34, name: "سبأ", page: 428 },
  { no: 35, name: "فاطر", page: 434 },
  { no: 36, name: "يس", page: 440 },
  { no: 37, name: "الصافات", page: 446 },
  { no: 38, name: "ص", page: 453 },
  { no: 39, name: "الزمر", page: 458 },
  { no: 40, name: "غافر", page: 467 },
  { no: 41, name: "فصلت", page: 477 },
  { no: 42, name: "الشورى", page: 483 },
  { no: 43, name: "الزخرف", page: 489 },
  { no: 44, name: "الدخان", page: 496 },
  { no: 45, name: "الجاثية", page: 499 },
  { no: 46, name: "الأحقاف", page: 502 },
  { no: 47, name: "محمد", page: 507 },
  { no: 48, name: "الفتح", page: 511 },
  { no: 49, name: "الحجرات", page: 515 },
  { no: 50, name: "ق", page: 518 },
  { no: 51, name: "الذاريات", page: 520 },
  { no: 52, name: "الطور", page: 523 },
  { no: 53, name: "النجم", page: 526 },
  { no: 54, name: "القمر", page: 528 },
  { no: 55, name: "الرحمن", page: 531 },
  { no: 56, name: "الواقعة", page: 534 },
  { no: 57, name: "الحديد", page: 537 },
  { no: 58, name: "المجادلة", page: 542 },
  { no: 59, name: "الحشر", page: 545 },
  { no: 60, name: "الممتحنة", page: 549 },
  { no: 61, name: "الصف", page: 551 },
  { no: 62, name: "الجمعة", page: 553 },
  { no: 63, name: "المنافقون", page: 554 },
  { no: 64, name: "التغابن", page: 556 },
  { no: 65, name: "الطلاق", page: 558 },
  { no: 66, name: "التحريم", page: 560 },
  { no: 67, name: "الملك", page: 562 },
  { no: 68, name: "القلم", page: 564 },
  { no: 69, name: "الحاقة", page: 566 },
  { no: 70, name: "المعارج", page: 568 },
  { no: 71, name: "نوح", page: 570 },
  { no: 72, name: "الجن", page: 572 },
  { no: 73, name: "المزمل", page: 574 },
  { no: 74, name: "المدثر", page: 575 },
  { no: 75, name: "القيامة", page: 577 },
  { no: 76, name: "الإنسان", page: 578 },
  { no: 77, name: "المرسلات", page: 580 },
  { no: 78, name: "النبأ", page: 582 },
  { no: 79, name: "النازعات", page: 583 },
  { no: 80, name: "عبس", page: 585 },
  { no: 81, name: "التكوير", page: 586 },
  { no: 82, name: "الانفطار", page: 587 },
  { no: 83, name: "المطففين", page: 587 },
  { no: 84, name: "الانشقاق", page: 589 },
  { no: 85, name: "البروج", page: 590 },
  { no: 86, name: "الطارق", page: 591 },
  { no: 87, name: "الأعلى", page: 591 },
  { no: 88, name: "الغاشية", page: 592 },
  { no: 89, name: "الفجر", page: 593 },
  { no: 90, name: "البلد", page: 594 },
  { no: 91, name: "الشمس", page: 595 },
  { no: 92, name: "الليل", page: 595 },
  { no: 93, name: "الضحى", page: 596 },
  { no: 94, name: "الشرح", page: 596 },
  { no: 95, name: "التين", page: 597 },
  { no: 96, name: "العلق", page: 597 },
  { no: 97, name: "القدر", page: 598 },
  { no: 98, name: "البينة", page: 598 },
  { no: 99, name: "الزلزلة", page: 599 },
  { no: 100, name: "العاديات", page: 599 },
  { no: 101, name: "القارعة", page: 600 },
  { no: 102, name: "التكاثر", page: 600 },
  { no: 103, name: "العصر", page: 601 },
  { no: 104, name: "الهمزة", page: 601 },
  { no: 105, name: "الفيل", page: 601 },
  { no: 106, name: "قريش", page: 602 },
  { no: 107, name: "الماعون", page: 602 },
  { no: 108, name: "الكوثر", page: 602 },
  { no: 109, name: "الكافرون", page: 603 },
  { no: 110, name: "النصر", page: 603 },
  { no: 111, name: "المسد", page: 603 },
  { no: 112, name: "الإخلاص", page: 604 },
  { no: 113, name: "الفلق", page: 604 },
  { no: 114, name: "الناس", page: 604 }
];

function getSavedBookmark() {
  try {
    const saved = localStorage.getItem('user_quran_bookmark');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return { page: 1, surah: "الفاتحة", ayah: 1 };
}

function updateBookmarkBarText() {
  const bookmark = getSavedBookmark();
  const textEl = document.getElementById('bookmarkReminderText');
  if (textEl) {
    textEl.textContent = `الفاصلة: ${bookmark.surah} (صـ ${bookmark.page} - آية ${bookmark.ayah})`;
  }
}

async function fetchQuranPage(pageNumber) {
  if (pageNumber < 1) pageNumber = 1;
  if (pageNumber > 604) pageNumber = 604;
  currentPage = pageNumber;

  localStorage.setItem('last_read_page', currentPage);

  const inputEl = document.getElementById('directPageInput');
  if (inputEl) inputEl.value = currentPage;

  const footerEl = document.getElementById('pageNumberFooter');
  if (footerEl) footerEl.textContent = `- صفحة ${currentPage} -`;

  const container = document.getElementById('quranTextContainer');
  const loader = document.getElementById('pageLoader');
  const surahHeader = document.getElementById('surahHeaderName');
  const juzHeader = document.getElementById('juzHeader');

  if (loader) loader.classList.remove('d-none');
  if (container) container.innerHTML = '';

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/page/${currentPage}/quran-uthmani`);
    const data = await res.json();

    if (data.code === 200 && data.data.ayahs.length > 0) {
      const ayahs = data.data.ayahs;
      const firstAyah = ayahs[0];
      currentSurahName = firstAyah.surah.name;
      
      if (surahHeader) surahHeader.textContent = `سورة ${currentSurahName}`;
      if (juzHeader) juzHeader.textContent = `الجزء ${firstAyah.juz}`;

      let html = '';
      ayahs.forEach((a) => {
        let text = a.text;
        
        if (a.numberInSurah === 1 && a.surah.number !== 1 && a.surah.number !== 9) {
          html += `
            <div class="surah-title-header my-3 p-3 rounded-4 text-center shadow-sm">
              <h4 class="fw-bold mb-1 text-white font-amiri">سورة ${a.surah.name}</h4>
              <p class="mb-0 text-white-50 small font-amiri">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            </div>
          `;
          text = text.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", "").trim();
        }

        html += `<span class="ayah-span">${text}</span> <span class="ayah-num-badge">﴿${a.numberInSurah}﴾</span> `;
      });

      if (container) container.innerHTML = html;
    }
  } catch (err) {
    if (container) {
      container.innerHTML = '<p class="text-danger my-5">تعذر تحميل الصفحة. يرجى التحقق من اتصالك بالإنترنت.</p>';
    }
  } finally {
    if (loader) loader.classList.add('d-none');
  }
}

function nextPage() {
  if (currentPage < 604) {
    fetchQuranPage(currentPage + 1);
  }
}

function prevPage() {
  if (currentPage > 1) {
    fetchQuranPage(currentPage - 1);
  }
}

function jumpToPageInput() {
  const val = parseInt(document.getElementById('directPageInput').value, 10);
  if (!isNaN(val)) {
    fetchQuranPage(val);
  }
}

function saveCustomBookmark(e) {
  e.preventDefault();
  const ayahInput = document.getElementById('ayahBookmarkInput');
  const ayahNum = parseInt(ayahInput.value, 10) || 1;

  const bookmark = {
    page: currentPage,
    surah: currentSurahName,
    ayah: ayahNum
  };

  localStorage.setItem('user_quran_bookmark', JSON.stringify(bookmark));
  localStorage.setItem('last_read_page', currentPage);
  updateBookmarkBarText();
  ayahInput.value = '';
  alert(`تم تثبيت الفاصلة عند سورة ${currentSurahName} (صفحة ${currentPage} - آية ${ayahNum})`);
}

function goToBookmark() {
  const bookmark = getSavedBookmark();
  fetchQuranPage(bookmark.page);
}

function renderSurahIndex(list = SURAH_PAGES) {
  const container = document.getElementById('surahIndexListContainer');
  if (!container) return;

  container.innerHTML = list.map(s => `
    <div class="col-6 col-md-4">
      <div class="p-2 rounded-3 d-flex align-items-center justify-content-between surah-index-item" onclick="selectSurahFromIndex(${s.page})">
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-brand rounded-circle font-monospace">${s.no}</span>
          <span class="fw-bold">${s.name}</span>
        </div>
        <span class="text-muted small font-monospace">صـ ${s.page}</span>
      </div>
    </div>
  `).join('');
}

function selectSurahFromIndex(page) {
  const modalEl = document.getElementById('surahIndexModal');
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();
  fetchQuranPage(page);
}

function filterSurahIndex() {
  const term = document.getElementById('surahSearchInput').value.trim().toLowerCase();
  const filtered = SURAH_PAGES.filter(s => s.name.includes(term) || s.no.toString() === term);
  renderSurahIndex(filtered);
}

document.addEventListener('keydown', (e) => {
  if (document.activeElement.tagName === 'INPUT') return;

  if (e.key === "ArrowRight") {
    prevPage();
  } else if (e.key === "ArrowLeft") {
    nextPage();
  }
});

(function quranswibe() {
  const card = document.querySelector('.quran-page-card') || document.getElementById('quranTextContainer');
  if (!card) return;

  card.style.touchAction = 'pan-y';

  let startX = 0;
  let startY = 0;

  card.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  card.addEventListener('touchend', (e) => {
    if (!startX) return;
    const diffX = e.changedTouches[0].clientX - startX;
    const diffY = e.changedTouches[0].clientY - startY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 40) {
        nextPage();
      } else if (diffX < -40) {
        prevPage();
      }
    }
    startX = 0;
    startY = 0;
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  updateBookmarkBarText();
  renderSurahIndex();

  const urlParams = new URLSearchParams(window.location.search);
  const requestedPage = parseInt(urlParams.get('page'), 10);

  if (!isNaN(requestedPage) && requestedPage >= 1 && requestedPage <= 604) {
    fetchQuranPage(requestedPage);
  } else {
    const lastPage = parseInt(localStorage.getItem('last_read_page'), 10);
    const bookmark = getSavedBookmark();
    fetchQuranPage(lastPage || bookmark.page || 1);
  }
});