let count = 0;
let target = 33;
let total = parseInt(localStorage.getItem('tasbeeh_total')) || 0;
let rounds = parseInt(localStorage.getItem('tasbeeh_rounds')) || 0;

const defaultAzkar = ["سُبْحَانَ اللَّهِ", "الْحَمْدُ لِلَّهِ", "اللَّهُ أَكْبَرُ"];
let customZekrList = JSON.parse(localStorage.getItem('my_azkar')) || [];

const tasbeehBtn = document.getElementById('tasbeeh-btn');
const countText = document.getElementById('countText');
const totalText = document.getElementById('totalText');
const roundsText = document.getElementById('roundsText');
const targetStatusText = document.getElementById('targetStatusText');
const zekrList = document.getElementById('zekrList');
const zekrTitle = document.getElementById('zekrTitle');
const resetBtn = document.getElementById('resetBtn');
const resetAllBtn = document.getElementById('resetAllBtn');
const customZekrInput = document.getElementById('customZekrInput');
const addZekrBtn = document.getElementById('addZekrBtn');
const editZekrBtn = document.getElementById('editZekrBtn');
const deleteZekrBtn = document.getElementById('deleteZekrBtn');
const targetBtns = document.querySelectorAll('.target-btn');

function updateUI() {
  if (countText) countText.textContent = count;
  if (totalText) totalText.textContent = total;
  if (roundsText) roundsText.textContent = rounds;

  if (targetStatusText) {
    if (target === 0) {
      targetStatusText.textContent = "الهدف: غير محدود";
    } else {
      targetStatusText.textContent = `الهدف: ${target}`;
    }
  }
}

function handleCount() {
  count++;
  total++;

  if (target > 0 && count === target) {
    rounds++;
    if (navigator.vibrate) {
      navigator.vibrate([150, 50, 150]);
    }
    count = 0;
  } else {
    if (navigator.vibrate) {
      navigator.vibrate(40);
    }
  }

  localStorage.setItem('tasbeeh_total', total);
  localStorage.setItem('tasbeeh_rounds', rounds);

  updateUI();
}

function resetCounter() {
  count = 0;
  updateUI();
}

function resetAll() {
  if (confirm("هل تريد تصفير جميع العدادات؟")) {
    count = 0;
    total = 0;
    rounds = 0;
    localStorage.removeItem('tasbeeh_total');
    localStorage.removeItem('tasbeeh_rounds');
    updateUI();
  }
}

function renderZekrOptions() {
  if (!zekrList) return;
  const currentVal = zekrList.value || defaultAzkar[0];
  zekrList.innerHTML = '';

  defaultAzkar.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item;
    opt.textContent = item;
    zekrList.appendChild(opt);
  });

  customZekrList.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item;
    opt.textContent = item;
    zekrList.appendChild(opt);
  });

  if ([...defaultAzkar, ...customZekrList].includes(currentVal)) {
    zekrList.value = currentVal;
  } else {
    zekrList.value = defaultAzkar[0];
  }

  if (zekrTitle) zekrTitle.textContent = zekrList.value;
}

function addNewZekr() {
  if (!customZekrInput || !zekrList) return;
  const text = customZekrInput.value.trim();
  if (text === "") return;

  if (defaultAzkar.includes(text) || customZekrList.includes(text)) {
    alert("هذا الذكر موجود بالفعل!");
    return;
  }

  customZekrList.push(text);
  localStorage.setItem('my_azkar', JSON.stringify(customZekrList));

  customZekrInput.value = "";
  renderZekrOptions();
  zekrList.value = text;
  if (zekrTitle) zekrTitle.textContent = text;
  resetCounter();
}

function editCurrentZekr() {
  const currentVal = zekrList.value;

  if (defaultAzkar.includes(currentVal)) {
    alert("لا يمكن تعديل الأذكار الأساسية الافتراضية.");
    return;
  }

  const newText = prompt("قم بتعديل نص الذكر:", currentVal);
  if (!newText || newText.trim() === "" || newText.trim() === currentVal) return;

  const trimmed = newText.trim();
  const index = customZekrList.indexOf(currentVal);
  if (index !== -1) {
    customZekrList[index] = trimmed;
    localStorage.setItem('my_azkar', JSON.stringify(customZekrList));
    renderZekrOptions();
    zekrList.value = trimmed;
    if (zekrTitle) zekrTitle.textContent = trimmed;
  }
}

function deleteCurrentZekr() {
  const currentVal = zekrList.value;

  if (defaultAzkar.includes(currentVal)) {
    alert("لا يمكن حذف الأذكار الأساسية الافتراضية.");
    return;
  }

  if (confirm(`هل أنت متأكد من حذف الذكر: "${currentVal}"؟`)) {
    customZekrList = customZekrList.filter(item => item !== currentVal);
    localStorage.setItem('my_azkar', JSON.stringify(customZekrList));
    renderZekrOptions();
    resetCounter();
  }
}

if (tasbeehBtn) tasbeehBtn.addEventListener('click', handleCount);
if (resetBtn) resetBtn.addEventListener('click', resetCounter);
if (resetAllBtn) resetAllBtn.addEventListener('click', resetAll);
if (addZekrBtn) addZekrBtn.addEventListener('click', addNewZekr);
if (editZekrBtn) editZekrBtn.addEventListener('click', editCurrentZekr);
if (deleteZekrBtn) deleteZekrBtn.addEventListener('click', deleteCurrentZekr);

if (customZekrInput) {
  customZekrInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addNewZekr();
    }
  });
}

if (zekrList) {
  zekrList.addEventListener('change', (e) => {
    if (zekrTitle) zekrTitle.textContent = e.target.value;
    resetCounter();
  });
}

targetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    targetBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    target = parseInt(btn.dataset.target);
    resetCounter();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    return;
  }

  if (e.code === 'Space') {
    e.preventDefault();
    handleCount();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderZekrOptions();
  updateUI();
});