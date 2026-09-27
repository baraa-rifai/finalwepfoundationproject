const ALL_SURAHS_DATA = [
  { no: 1, name: "سورة الفاتحة", page: 1 },
  { no: 2, name: "سورة البقرة", page: 2 },
  { no: 3, name: "سورة آل عمران", page: 50 },
  { no: 4, name: "سورة النساء", page: 77 },
  { no: 5, name: "سورة المائدة", page: 106 },
  { no: 6, name: "سورة الأنعام", page: 128 },
  { no: 7, name: "سورة الأعراف", page: 151 },
  { no: 8, name: "سورة الأنفال", page: 177 },
  { no: 9, name: "سورة التوبة", page: 187 },
  { no: 10, name: "سورة يونس", page: 208 },
  { no: 11, name: "سورة هود", page: 221 },
  { no: 12, name: "سورة يوسف", page: 235 },
  { no: 13, name: "سورة الرعد", page: 249 },
  { no: 14, name: "سورة إبراهيم", page: 255 },
  { no: 15, name: "سورة الحجر", page: 262 },
  { no: 16, name: "سورة النحل", page: 267 },
  { no: 17, name: "سورة الإسراء", page: 282 },
  { no: 18, name: "سورة الكهف", page: 293 },
  { no: 19, name: "سورة مريم", page: 305 },
  { no: 20, name: "سورة طه", page: 312 },
  { no: 21, name: "سورة الأنبياء", page: 322 },
  { no: 22, name: "سورة الحج", page: 332 },
  { no: 23, name: "سورة المؤمنون", page: 342 },
  { no: 24, name: "سورة النور", page: 350 },
  { no: 25, name: "سورة الفرقان", page: 359 },
  { no: 26, name: "سورة الشعراء", page: 367 },
  { no: 27, name: "سورة النمل", page: 377 },
  { no: 28, name: "سورة القصص", page: 385 },
  { no: 29, name: "سورة العنكبوت", page: 396 },
  { no: 30, name: "سورة الروم", page: 404 },
  { no: 31, name: "سورة لقمان", page: 411 },
  { no: 32, name: "سورة السجدة", page: 415 },
  { no: 33, name: "سورة الأحزاب", page: 418 },
  { no: 34, name: "سورة سبأ", page: 428 },
  { no: 35, name: "سورة فاطر", page: 434 },
  { no: 36, name: "سورة يس", page: 440 },
  { no: 37, name: "سورة الصافات", page: 446 },
  { no: 38, name: "سورة ص", page: 453 },
  { no: 39, name: "سورة الزمر", page: 458 },
  { no: 40, name: "سورة غافر", page: 467 },
  { no: 41, name: "سورة فصلت", page: 477 },
  { no: 42, name: "سورة الشورى", page: 483 },
  { no: 43, name: "سورة الزخرف", page: 489 },
  { no: 44, name: "سورة الدخان", page: 496 },
  { no: 45, name: "سورة الجاثية", page: 499 },
  { no: 46, name: "سورة الأحقاف", page: 502 },
  { no: 47, name: "سورة محمد", page: 507 },
  { no: 48, name: "سورة الفتح", page: 511 },
  { no: 49, name: "سورة الحجرات", page: 515 },
  { no: 50, name: "سورة ق", page: 518 },
  { no: 51, name: "سورة الذاريات", page: 520 },
  { no: 52, name: "سورة الطور", page: 523 },
  { no: 53, name: "سورة النجم", page: 526 },
  { no: 54, name: "سورة القمر", page: 528 },
  { no: 55, name: "سورة الرحمن", page: 531 },
  { no: 56, name: "سورة الواقعة", page: 534 },
  { no: 57, name: "سورة الحديد", page: 537 },
  { no: 58, name: "سورة المجادلة", page: 542 },
  { no: 59, name: "سورة الحشر", page: 545 },
  { no: 60, name: "سورة الممتحنة", page: 549 },
  { no: 61, name: "سورة الصف", page: 551 },
  { no: 62, name: "سورة الجمعة", page: 553 },
  { no: 63, name: "سورة المنافقون", page: 554 },
  { no: 64, name: "سورة التغابن", page: 556 },
  { no: 65, name: "سورة الطلاق", page: 558 },
  { no: 66, name: "سورة التحريم", page: 560 },
  { no: 67, name: "سورة الملك", page: 562 },
  { no: 68, name: "سورة القلم", page: 564 },
  { no: 69, name: "سورة الحاقة", page: 566 },
  { no: 70, name: "سورة المعارج", page: 568 },
  { no: 71, name: "سورة نوح", page: 570 },
  { no: 72, name: "سورة الجن", page: 572 },
  { no: 73, name: "سورة المزمل", page: 574 },
  { no: 74, name: "سورة المدثر", page: 575 },
  { no: 75, name: "سورة القيامة", page: 577 },
  { no: 76, name: "سورة الإنسان", page: 578 },
  { no: 77, name: "سورة المرسلات", page: 580 },
  { no: 78, name: "سورة النبأ", page: 582 },
  { no: 79, name: "سورة النازعات", page: 583 },
  { no: 80, name: "سورة عبس", page: 585 },
  { no: 81, name: "سورة التكوير", page: 586 },
  { no: 82, name: "سورة الانفطار", page: 587 },
  { no: 83, name: "سورة المطففين", page: 587 },
  { no: 84, name: "سورة الانشقاق", page: 589 },
  { no: 85, name: "سورة البروج", page: 590 },
  { no: 86, name: "سورة الطارق", page: 591 },
  { no: 87, name: "سورة الأعلى", page: 591 },
  { no: 88, name: "سورة الغاشية", page: 592 },
  { no: 89, name: "سورة الفجر", page: 593 },
  { no: 90, name: "سورة البلد", page: 594 },
  { no: 91, name: "سورة الشمس", page: 595 },
  { no: 92, name: "سورة الليل", page: 595 },
  { no: 93, name: "سورة الضحى", page: 596 },
  { no: 94, name: "سورة الشرح", page: 596 },
  { no: 95, name: "سورة التين", page: 597 },
  { no: 96, name: "سورة العلق", page: 597 },
  { no: 97, name: "سورة القدر", page: 598 },
  { no: 98, name: "سورة البينة", page: 598 },
  { no: 99, name: "سورة الزلزلة", page: 599 },
  { no: 100, name: "سورة العاديات", page: 599 },
  { no: 101, name: "سورة القارعة", page: 600 },
  { no: 102, name: "سورة التكاثر", page: 600 },
  { no: 103, name: "سورة العصر", page: 601 },
  { no: 104, name: "سورة الهمزة", page: 601 },
  { no: 105, name: "سورة الفيل", page: 601 },
  { no: 106, name: "سورة قريش", page: 602 },
  { no: 107, name: "سورة الماعون", page: 602 },
  { no: 108, name: "سورة الكوثر", page: 602 },
  { no: 109, name: "سورة الكافرون", page: 603 },
  { no: 110, name: "سورة النصر", page: 603 },
  { no: 111, name: "سورة المسد", page: 603 },
  { no: 112, name: "سورة الإخلاص", page: 604 },
  { no: 113, name: "سورة الفلق", page: 604 },
  { no: 114, name: "سورة الناس", page: 604 }
];

const FRIDAY_DAWN = [
  { id: 'dawn_1', name: "سورة السجدة", page: 415, note: "ركعة الفجر الأولى" },
  { id: 'dawn_2', name: "سورة الإنسان", page: 578, note: "ركعة الفجر الثانية" }
];

const FRIDAY_DAY = [
  { id: 'day_1', name: "سورة الكهف", page: 293, note: "نور ما بين الجمعتين" }
];

const INITIAL_CUSTOM_SURAHS = [
  { id: 'c_1', name: "سورة الملك", page: 562 },
  { id: 'c_2', name: "سورة يس", page: 440 },
  { id: 'c_3', name: "سورة الواقعة", page: 534 }
];

let activeWirdCurrentPage = 1;
let activeWirdId = null;

function getCustomSurahs() {
  const saved = localStorage.getItem('user_custom_surahs');
  if (saved) return JSON.parse(saved);
  localStorage.setItem('user_custom_surahs', JSON.stringify(INITIAL_CUSTOM_SURAHS));
  return INITIAL_CUSTOM_SURAHS;
}

function toggleDone(id) {
  const isDone = localStorage.getItem(`status_${id}`) === 'true';
  localStorage.setItem(`status_${id}`, (!isDone).toString());
  renderAllSections();
}

function createSurahCard(surah, isCustom = false) {
  const isDone = localStorage.getItem(`status_${surah.id}`) === 'true';

  return `
    <div class="col-12 col-md-6">
      <div class="p-3 rounded-3 border d-flex align-items-center justify-content-between ${isDone ? 'bg-light opacity-75' : 'bg-white shadow-sm'}">
        <div>
          <h6 class="fw-bold mb-1 ${isDone ? 'text-decoration-line-through text-muted' : 'text-brand'}">
            ${surah.name}
          </h6>
          ${surah.note ? `<span class="text-muted small">${surah.note}</span>` : ''}
          <span class="badge bg-light text-dark border ms-1 font-monospace">صـ ${surah.page}</span>
        </div>

        <div class="d-flex align-items-center gap-2">
          ${isCustom ? `
            <button class="btn btn-sm text-danger opacity-75 p-0 me-1" onclick="deleteCustomSurah('${surah.id}')" title="حذف السورة">
              <i class="bi bi-x-circle"></i>
            </button>
          ` : ''}
          <button class="btn btn-sm ${isDone ? 'btn-success' : 'btn-outline-secondary'} rounded-circle p-2" 
                  onclick="toggleDone('${surah.id}')" title="${isDone ? 'تمت القراءة' : 'تحديد كمقروء'}">
            <i class="bi ${isDone ? 'bi-check-lg' : 'bi-circle'}"></i>
          </button>
          <button class="btn btn-sm btn-brand rounded-pill px-3" 
                  onclick="openWirdModal('${surah.id}', '${surah.name}', ${surah.page})">
            قراءة <i class="bi bi-arrow-left"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function populateSurahSelect() {
  const select = document.getElementById('customSurahSelect');
  if (!select) return;

  select.innerHTML = '<option value="" disabled selected>-- اختر السورة --</option>' +
    ALL_SURAHS_DATA.map(s => `<option value="${s.name}" data-page="${s.page}">${s.no}. ${s.name} (صـ ${s.page})</option>`).join('');
}

function renderAllSections() {
  const dawnBox = document.getElementById('fridayDawnContainer');
  if (dawnBox) {
    dawnBox.innerHTML = FRIDAY_DAWN.map(s => createSurahCard(s)).join('');
  }

  const dayBox = document.getElementById('fridayDayContainer');
  if (dayBox) {
    dayBox.innerHTML = FRIDAY_DAY.map(s => createSurahCard(s)).join('');
  }

  const customBox = document.getElementById('customWirdsContainer');
  if (customBox) {
    const list = getCustomSurahs();
    if (list.length === 0) {
      customBox.innerHTML = '<div class="col-12 text-center text-muted small py-3">لم تضف أي سور مخصصة لوردك بعد.</div>';
    } else {
      customBox.innerHTML = list.map(s => createSurahCard(s, true)).join('');
    }
  }
}

function addCustomSurah(e) {
  e.preventDefault();
  const select = document.getElementById('customSurahSelect');
  const selectedName = select.value;
  const selectedOption = select.options[select.selectedIndex];
  const page = selectedOption ? parseInt(selectedOption.getAttribute('data-page'), 10) : 1;

  if (!selectedName) return;

  const currentList = getCustomSurahs();
  currentList.push({
    id: 'c_' + Date.now(),
    name: selectedName,
    page: page
  });

  localStorage.setItem('user_custom_surahs', JSON.stringify(currentList));
  select.selectedIndex = 0;
  renderAllSections();
}

function deleteCustomSurah(id) {
  let currentList = getCustomSurahs();
  currentList = currentList.filter(item => item.id !== id);
  localStorage.setItem('user_custom_surahs', JSON.stringify(currentList));
  renderAllSections();
}

function openWirdModal(id, title, page) {
  activeWirdId = id;
  activeWirdCurrentPage = parseInt(page, 10);
  
  const titleEl = document.getElementById('wirdModalTitle');
  if (titleEl) titleEl.textContent = title;

  loadWirdPageData(activeWirdCurrentPage);

  const modalEl = document.getElementById('wirdReaderModal');
  const modalInstance = new bootstrap.Modal(modalEl);
  modalInstance.show();
}

async function loadWirdPageData(pageNumber) {
  if (pageNumber < 1) pageNumber = 1;
  if (pageNumber > 604) pageNumber = 604;
  activeWirdCurrentPage = pageNumber;

  const badgeEl = document.getElementById('wirdPageBadge');
  if (badgeEl) badgeEl.textContent = `صـ ${activeWirdCurrentPage}`;

  const container = document.getElementById('wirdQuranTextContainer');
  const loader = document.getElementById('wirdPageLoader');

  if (loader) loader.classList.remove('d-none');
  if (container) container.innerHTML = '';

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/page/${activeWirdCurrentPage}/quran-uthmani`);
    const data = await res.json();

    if (data.code === 200 && data.data.ayahs.length > 0) {
      let html = '';
      data.data.ayahs.forEach((a) => {
        let text = a.text;
        if (a.numberInSurah === 1 && a.surah.number !== 1 && a.surah.number !== 9) {
          html += `
            <div class="surah-title-header my-3 p-2 rounded-3 text-center shadow-sm">
              <h5 class="fw-bold mb-0 text-white font-amiri">سورة ${a.surah.name}</h5>
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
      container.innerHTML = '<p class="text-danger my-4">تعذر تحميل الصفحة. يرجى التحقق من اتصالك بالإنترنت.</p>';
    }
  } finally {
    if (loader) loader.classList.add('d-none');
  }
}

function nextWirdPage() {
  if (activeWirdCurrentPage < 604) {
    loadWirdPageData(activeWirdCurrentPage + 1);
  }
}

function prevWirdPage() {
  if (activeWirdCurrentPage > 1) {
    loadWirdPageData(activeWirdCurrentPage - 1);
  }
}

function finishCurrentWird() {
  if (activeWirdId) {
    localStorage.setItem(`status_${activeWirdId}`, 'true');
    renderAllSections();
  }
  const modalEl = document.getElementById('wirdReaderModal');
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();
}

document.addEventListener('DOMContentLoaded', () => {
  populateSurahSelect();
  renderAllSections();
});