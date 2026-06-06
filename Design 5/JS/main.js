const slideUp = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slideUp');
    }

  });
}, { threshold: .1 }); // 0.1 = trigger when 10% of element is on screen

const slideRight = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slideRight');
    }

  });
}, { threshold: .1 }); // 0.1 = trigger when 10% of element is on screen

const slideLeft = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slideLeft');
    }

  });
}, { threshold: .1 }); // 0.1 = trigger when 10% of element is on screen

const appear = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slideLeft');
    }

  });
}, { threshold: .1 }); // 0.1 = trigger when 10% of element is on screen

document.querySelectorAll(".explanation").forEach(el => slideLeft.observe(el));
// appear.observe(document.querySelector(".timeline-section"));
document.querySelectorAll('.about ul li').forEach(el => slideLeft.observe(el));

document.querySelectorAll('.content-box div').forEach(el => slideUp.observe(el));
// slideUp.observe(document.querySelector("#metrics"));
slideUp.observe(document.querySelector(".timeline_text h2"));
slideUp.observe(document.querySelector(".timeline_text p"));

const expandBtn = document.querySelectorAll('.expand');

expandBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.parentElement;
    parent.classList.toggle('expanded');
})});



slideUp.observe(document.querySelector(".lineGrap_container canvas"));
const canvas = document.getElementById('lineGraph');
const ctx = canvas.getContext('2d');

// Responsive sizing — fill the container
function resizeCanvas() {
  const container = canvas.parentElement;
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  drawChart(rect.width, rect.height);
}

function drawChart(cssWidth, cssHeight) {
  const padding = { top: 30, right: 30, bottom: 40, left: 50 };
  const data   = [30, 80, 45, 90, 60, 120, 75, 100, 85, 95, 70, 110];
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug', 'Sep', 'Oct', 'Nov','Dec' ];

  const w = cssWidth  - padding.left - padding.right;
  const h = cssHeight - padding.top  - padding.bottom;
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  const range  = maxVal - minVal;

  const getX = i   => padding.left + (i / (data.length - 1)) * w;
  const getY = val => padding.top  + h - ((val - minVal) / range) * h;

  ctx.clearRect(0, 0, cssWidth, cssHeight);

  // --- Grid lines (themed) ---
  ctx.strokeStyle = '#194d4466';
  ctx.lineWidth = 1;
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const y   = padding.top + (i / steps) * h;
    const val = Math.round(maxVal - (i / steps) * range);

    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + w, y);
    ctx.stroke();

    ctx.fillStyle = '#3ba392';
    ctx.font = '12px Aldrich, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(val, padding.left - 8, y + 4);
  }

  // --- X labels ---
  labels.forEach((label, i) => {
    ctx.fillStyle = '#3ba392';
    ctx.textAlign = 'center';
    ctx.fillText(label, getX(i), padding.top + h + 24);
  });

  // --- Smooth gradient fill ---
  const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top + h);
  grad.addColorStop(0,   'rgba(59, 163, 146, 0.35)');
  grad.addColorStop(1,   'rgba(59, 163, 146, 0.02)');

  ctx.beginPath();
  ctx.moveTo(getX(0), getY(data[0]));
  for (let i = 1; i < data.length; i++) {
    const cpX = (getX(i - 1) + getX(i)) / 2;
    ctx.bezierCurveTo(cpX, getY(data[i-1]), cpX, getY(data[i]), getX(i), getY(data[i]));
  }
  ctx.lineTo(getX(data.length - 1), padding.top + h);
  ctx.lineTo(getX(0), padding.top + h);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // --- Smooth line ---
  ctx.beginPath();
  ctx.moveTo(getX(0), getY(data[0]));
  for (let i = 1; i < data.length; i++) {
    const cpX = (getX(i - 1) + getX(i)) / 2;
    ctx.bezierCurveTo(cpX, getY(data[i-1]), cpX, getY(data[i]), getX(i), getY(data[i]));
  }
  ctx.strokeStyle = '#3ba392';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // --- Dots on data points ---
  data.forEach((val, i) => {
    ctx.beginPath();
    ctx.arc(getX(i), getY(val), 4, 0, Math.PI * 2);
    ctx.fillStyle = '#3ba392';
    ctx.fill();
    ctx.strokeStyle = '#0A221E';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

resizeCanvas();
window.addEventListener('resize', () => {
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform before redraw
  resizeCanvas();
});

//timeline js
const tlSteps = [
      { label: 'Connect',  desc: 'Link your tools and data sources' },
      { label: 'Define',   desc: 'Set triggers, and actions' },
      { label: 'Automate', desc: 'Let the workflow run on its own' },
      { label: 'Monitor',  desc: 'Track every run in real time' },
      { label: 'Scale',    desc: 'Handle millions of events with ease' },
    ];

    let tlCurrent = -1;
    let tlTimer   = null;

    function tlBuild() {
      document.getElementById('tl-nodes').innerHTML = tlSteps.map((s, i) => `
        <div class="tl-node ${i % 2 === 0 ? 'above' : ''}" id="tl-node-${i}">
          <div class="tl-text" id="tl-text-${i}">
            <p class="tl-label">${s.label}</p>
            <p class="tl-desc">${s.desc}</p>
          </div>
          <div class="tl-connector" id="tl-conn-${i}"></div>
          <div class="tl-dot" id="tl-dot-${i}">${i + 1}</div>
        </div>
      `).join('');
    }

    function tlAdvance() {
      tlCurrent++;
      if (tlCurrent >= tlSteps.length) { clearInterval(tlTimer); return; }

      if (tlCurrent > 0) {
        const prev = document.getElementById(`tl-dot-${tlCurrent - 1}`);
        prev.className = 'tl-dot done';
        prev.innerHTML = '<i class="fa-solid fa-check"></i>';
      }

      document.getElementById(`tl-dot-${tlCurrent}`).className = 'tl-dot active';
      document.getElementById(`tl-dot-${tlCurrent}`).textContent = tlCurrent + 1;
      document.getElementById(`tl-text-${tlCurrent}`).classList.add('visible');
      document.getElementById(`tl-conn-${tlCurrent}`).classList.add('lit');

      const pct = tlCurrent > 0 ? (tlCurrent / (tlSteps.length - 1)) * 100 : 0;
      document.getElementById('tl-fill').style.width = pct + '%';
    }

    function tlStart() {
      tlAdvance();
      tlTimer = setInterval(tlAdvance, 1300);
    }

    function tlRestart() {
      clearInterval(tlTimer);
      tlCurrent = -1;
      tlBuild();
      document.getElementById('tl-fill').style.width = '0%';
      setTimeout(tlStart, 300);
    }

    tlBuild();
    setTimeout(tlStart, 600);


// count increment animation
const el = document.querySelector('.count');
const target = parseInt(el.dataset.target);
let current = 0;

const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    animate();
    observer.disconnect();
  }
});

observer.observe(el);

function animate() {
  current += (target - current) * 0.05;
  if (target - current < 0.5) {
    el.textContent = target.toLocaleString();
    return;
  }
  el.textContent = Math.round(current).toLocaleString();
  requestAnimationFrame(animate);
}

document.querySelectorAll('.count').forEach(el => {
  const target = parseInt(el.dataset.target);
  let current = 0;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      animate();
      observer.disconnect();
    }
  });

  observer.observe(el);

  function animate() {
    current += (target - current) * 0.05;
    if (target - current < 0.5) {
      el.textContent = target.toLocaleString();
      return;
    }
    el.textContent = Math.round(current).toLocaleString();
    requestAnimationFrame(animate);
  }
});