const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }

  });
}, { threshold: .1 }); // 0.1 = trigger when 10% of element is on screen

document.querySelectorAll('.content-box div').forEach(el => observer.observe(el));
