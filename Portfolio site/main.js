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

const targets = document.querySelectorAll('.roles div');
const descriptions = document.querySelectorAll('.sec_cont .sec');
const certificates = document.querySelectorAll('.certificate-box div');

const projects = [
  {
    title: 'Portfolio Showcase',
    description: 'A modern portfolio experience with animated sections, responsive layout, and a selectable project preview panel.',
    tech: 'HTML • CSS • JavaScript',
    link: '#',
    image: 'Images/projects.jpg',
  },
  {
    title: 'E-commerce Store',
    description: 'A product storefront concept with dynamic filtering, responsive cards, and checkout-ready layout ideas.',
    tech: 'React • CSS Grid • Stripe',
    link: '#',
    image: 'Images/Screenshot 2026-05-17 124202.png',
  },
  {
    title: 'Admin Dashboard',
    description: 'A dashboard design focused on metrics, charts, and clean data presentation for business applications.',
    tech: 'JavaScript • Chart.js • CSS',
    link: '#',
    image: 'Images/Screenshot 2026-05-26 135104.png',
  },
  {
    title: 'Landing Experience',
    description: 'A brand-first landing page concept built for conversion, featuring strong typography and clear calls to action.',
    tech: 'HTML • CSS • UI/UX',
    link: '#',
    image: 'Images/background.jpg',
  },
];

const projectDisplay = document.getElementById('project-display');
const projectPreview = document.getElementById('project-preview');
const projectTitle = document.getElementById('project-title');
const projectDescription = document.getElementById('project-description');
const projectTech = document.getElementById('project-tech');
const projectLink = document.getElementById('project-link');
const projectButtons = document.querySelectorAll('.project-widget');

function setProject(index) {
  const project = projects[index] || projects[0];

  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;
  projectTech.textContent = project.tech;
  projectLink.href = project.link;
  projectLink.textContent = project.link === '#' ? 'View project' : 'View live';
  projectPreview.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.78)), url('${project.image}')`;
  projectPreview.style.backgroundSize = 'cover';
  projectPreview.style.backgroundPosition = 'center';

  projectButtons.forEach((button, idx) => {
    button.classList.toggle('active', idx === index);
  });
}

projectButtons.forEach(button => {
  button.addEventListener('click', () => {
    const index = Number(button.dataset.project);
    setProject(index);
  });
});

setProject(0);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // stop watching once triggered
        }
    });
}, {
    threshold: 0.5 // fires when 20% of the element is visible
});

targets.forEach(el => observer.observe(el));
descriptions.forEach(el => observer.observe(el));
certificates.forEach(el => observer.observe(el));

const menuBtn = document.querySelector('.menu');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
    mobileMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// close after tapping a link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});