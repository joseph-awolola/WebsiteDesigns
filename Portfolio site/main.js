const el = document.getElementById('target');
  const text = el.textContent;
  
  function buildLetters() {
    el.innerHTML = '';
    [...text].forEach(ch => {
      const span = document.createElement('span');
      span.className = 'letter' + (ch === ' ' ? ' space' : '');
      span.textContent = ch === ' ' ? '\u00A0' : ch;

      // Each letter gets its own random delay and duration,
      // so they don't all "warm up" in lockstep.
      const delay = (Math.random() * 1.1).toFixed(2);       // 0s - 1.1s
      const duration = (0.6 + Math.random() * 1.2).toFixed(2); // 0.6s - 1.8s

      span.style.animationDelay = delay + 's';
      span.style.animationDuration = duration + 's';

      el.appendChild(span);
    });
  }

  function replay() {
    // Restart CSS animations by forcing reflow
    buildLetters();
  }

//   document.getElementById('replay').addEventListener('click', replay);
  buildLetters();