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



document.querySelectorAll('.content-box div').forEach(el => slideUp.observe(el));

slideRight.observe(document.querySelector(".lineGrap_container canvas"));

const canvas = document.getElementById('lineGraph');
const ctx = canvas.getContext('2d');

const dpr = window.devicePixelRatio || 1;
const cssWidth = 800;
const cssHeight = 400;

canvas.width = cssWidth * dpr;
canvas.height = cssHeight * dpr;
canvas.style.width = cssWidth + 'px';
canvas.style.height = cssHeight + 'px';
ctx.scale(dpr, dpr);  // Scale all drawing operations

// --- Config ---
const padding = 50;
const data = [30, 80, 45, 90, 60, 120, 75, 100];
const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];

const width = canvas.width - padding * 2;
const height = canvas.height - padding * 2;
const maxVal = Math.max(...data);

// --- Helpers ---
function getX(i) {
  return padding + (i / (data.length - 1)) * width;
}
function getY(val) {
  return padding + height - (val / maxVal) * height;
}

// --- Draw Grid & Axes ---
ctx.strokeStyle = '#ddd';
ctx.lineWidth = 1;

// Horizontal grid lines
for (let i = 0; i <= 5; i++) {
  const y = padding + (i / 5) * height;
  ctx.beginPath();
  ctx.moveTo(padding, y);
  ctx.lineTo(padding + width, y);
  ctx.stroke();

  // Y-axis labels
  const val = Math.round(maxVal - (i / 5) * maxVal);
  ctx.fillStyle = '#666';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(val, padding - 8, y + 4);
}

// X-axis labels
labels.forEach((label, i) => {
  ctx.fillStyle = '#666';
  ctx.textAlign = 'center';
  ctx.fillText(label, getX(i), padding + height + 20);
});

// Axes
ctx.strokeStyle = '#999';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(padding, padding);
ctx.lineTo(padding, padding + height);       // Y-axis
ctx.lineTo(padding + width, padding + height); // X-axis
ctx.stroke();

// --- Draw Shaded Area ---
ctx.beginPath();
ctx.moveTo(getX(0), getY(data[0]));
data.forEach((val, i) => ctx.lineTo(getX(i), getY(val)));
ctx.lineTo(getX(data.length - 1), padding + height);
ctx.lineTo(getX(0), padding + height);
ctx.closePath();
ctx.fillStyle = '#12393282';
ctx.fill();

// --- Draw Line ---
ctx.beginPath();
ctx.moveTo(getX(0), getY(data[0]));
data.forEach((val, i) => ctx.lineTo(getX(i), getY(val)));
ctx.strokeStyle = '#3ba392';
ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.stroke();
