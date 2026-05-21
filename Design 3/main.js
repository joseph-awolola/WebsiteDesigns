const observer = new IntersectionObserver((entries, action) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 1. Add the class to start the animation
      entry.target.classList.add("visible");
      console.log(action)
      
      // 2. Tell the observer to permanently stop watching this element
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1 
});

// Start watching your elements
const elements = document.querySelectorAll('.option_box');
elements.forEach(el => observer.observe(el));

// const animateHerp = document.querySelector("")

 const track = document.getElementById('track');
    const dotsContainer = document.getElementById('dots');
    const slides = track.querySelectorAll('img');
    const total = slides.length;
    let current = 0;
    let autoTimer;

    // Build dots
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      // Wrap around
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      document.querySelectorAll('.dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );
    }

    function move(dir) {
      goTo(current + dir);
      resetAuto(); // restart timer on manual click
    }

    // Auto-scroll every 3 seconds
    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 3000);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    startAuto();