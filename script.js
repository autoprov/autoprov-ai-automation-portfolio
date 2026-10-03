
/* AutoProv project image carousels */
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const prev = carousel.querySelector('.carousel-prev');
  const next = carousel.querySelector('.carousel-next');
  const counter = carousel.querySelector('.carousel-counter');
  let current = 0;

  const showSlide = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  };

  if (slides.length <= 1) {
    if (prev) prev.hidden = true;
    if (next) next.hidden = true;
    if (counter) counter.hidden = true;
  } else {
    prev?.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      showSlide(current - 1);
    });

    next?.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      showSlide(current + 1);
    });

    carousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showSlide(current - 1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showSlide(current + 1);
      }
    });

    let touchStartX = null;
    carousel.addEventListener('touchstart', event => {
      touchStartX = event.changedTouches[0].clientX;
    }, {passive:true});
    carousel.addEventListener('touchend', event => {
      if (touchStartX === null) return;
      const dx = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 45) showSlide(current + (dx < 0 ? 1 : -1));
      touchStartX = null;
    }, {passive:true});
  }

  carousel.tabIndex = 0;
  showSlide(0);
});

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const cases = {
  inbox: {
    label: '01 / CUSTOMER OPERATIONS',
    title: 'AI Business Inbox',
    body: `<p><b>Goal:</b> turn incoming customer messages into structured, prioritized conversations without losing important leads or support requests.</p>
    <ul><li>Meta/business messaging enters an n8n workflow.</li><li>Duplicate message protection prevents repeated processing.</li><li>AI detects intent and identifies lead/support/action requests.</li><li>Lead information is captured and logged.</li><li>Human handoff can be used when automation should not make the final decision.</li></ul>`
  },
  messenger: {
    label: '02 / CUSTOMER EXPERIENCE',
    title: '24/7 AI Messenger Agent',
    body: `<p><b>Goal:</b> give businesses a practical first-line customer support agent on Facebook Messenger.</p>
    <ul><li>Receives Messenger webhook events.</li><li>Parses customer messages and detects intent.</li><li>Uses generic business knowledge that can be customized per client.</li><li>Captures qualified leads into a structured Google Sheets log.</li><li>Responds naturally while supporting multilingual/Taglish conversations.</li></ul>`
  },
  inventory: {
    label: '03 / OPERATIONS AUTOMATION',
    title: 'Receipt → Inventory',
    body: `<p><b>Goal:</b> remove repetitive receipt encoding and reduce inventory update errors.</p>
    <ul><li>Receipt image enters the workflow.</li><li>OCR extracts the receipt text.</li><li>AI converts the receipt into structured line items.</li><li>Products are matched against the inventory system.</li><li>Duplicate protection, approval controls, status tracking, error handling and audit logs protect the process.</li></ul>`
  },
};
document.querySelectorAll('[data-modal]').forEach(btn => btn.addEventListener('click', () => {
  const item = cases[btn.dataset.modal];
  modalContent.innerHTML = `<div class="eyebrow">${item.label}</div><h2>${item.title}</h2>${item.body}`;
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
}));
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  if(window.innerWidth <= 800) document.querySelector('.nav nav').style.display='';
}));
