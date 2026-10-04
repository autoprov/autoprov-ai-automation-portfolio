
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

// =========================================
// AutoProv Interactive Q&A
// =========================================

const askInput = document.getElementById("askInput");
const askButton = document.getElementById("askButton");
const autoProvChat = document.getElementById("autoProvChat");
const promptButtons = document.querySelectorAll(".prompt-btn");

function addChatMessage(type, content) {
  const message = document.createElement("div");

  message.className = `chat-message ${type}`;

  message.innerHTML = `
    <div class="chat-label mono">
      ${type === "user" ? "YOU" : "AUTOPROV"}
    </div>

    <p>${content}</p>
  `;

  autoProvChat.appendChild(message);

  autoProvChat.scrollTop = autoProvChat.scrollHeight;
}


function getAutoProvResponse(question) {

  const q = question.toLowerCase();


  // =========================================
  // 1. DENTAL / AI RECEPTIONIST / LEAD LOGGER
  // =========================================

  if (
    q.includes("dental") ||
    q.includes("dentist") ||
    q.includes("dental clinic") ||
    q.includes("ai receptionist") ||
    (q.includes("virtual assistant") && q.includes("lead"))
  ) {

    return `
      <strong>Yes — this is a strong use case for AI automation.</strong>

      <br><br>

      For a dental clinic, AutoProv could design an AI virtual
      assistant that handles initial patient inquiries, identifies
      intent, collects lead information, and routes qualified
      requests to the clinic team.

      <br><br>

      <strong>Possible automation flow:</strong>

      <div class="flow-preview">
        <span>Patient</span>
        <b>→</b>
        <span>Messenger / Website</span>
        <b>→</b>
        <span>AI Assistant</span>
        <b>→</b>
        <span>Intent Detection</span>
        <b>→</b>
        <span>Lead Qualification</span>
        <b>→</b>
        <span>Lead Logger</span>
        <b>→</b>
        <span>Staff Notification</span>
      </div>

      <br>

      The assistant could answer common inquiries, identify
      appointment intent, collect contact details, qualify the
      inquiry, and automatically log the lead for follow-up.

      <br><br>

      <strong>Let's talk</strong> and dive deeper into the problem
      you want to automate.

      <br><br>

      <a
        class="ask-cta"
        href="mailto:autoprovph@gmail.com?subject=Automation%20Project%20Inquiry"
      >
        Let's Talk →
      </a>
    `;
  }


  // =========================================
  // 2. REAL ESTATE LEAD QUALIFICATION
  // =========================================

  if (
    q.includes("real estate") ||
    q.includes("realtor") ||
    q.includes("property") ||
    q.includes("realty")
  ) {

    return `
      <strong>Absolutely — lead qualification is a great candidate
      for automation in real estate.</strong>

      <br><br>

      AutoProv could design a system that receives inquiries,
      asks qualifying questions, scores the lead, and sends the
      right prospects to the sales team.

      <br><br>

      <strong>Possible automation flow:</strong>

      <div class="flow-preview">
        <span>Prospect</span>
        <b>→</b>
        <span>Chat / Form</span>
        <b>→</b>
        <span>AI Qualification</span>
        <b>→</b>
        <span>Lead Score</span>
        <b>→</b>
        <span>CRM</span>
        <b>→</b>
        <span>Sales Follow-up</span>
      </div>

      <br>

      The workflow could capture budget, preferred property type,
      location, timeline, and other qualifying information before
      routing the lead to the appropriate sales process.

      <br><br>

      <strong>Let's talk</strong> and dive deeper into the problem
      you want to automate.

      <br><br>

      <a
        class="ask-cta"
        href="mailto:autoprovph@gmail.com?subject=Automation%20Project%20Inquiry"
      >
        Let's Talk →
      </a>
    `;
  }


  // =========================================
  // 3. MESSENGER / CUSTOMER SUPPORT
  // =========================================

  if (
    q.includes("messenger") ||
    q.includes("facebook") ||
    q.includes("customer support") ||
    q.includes("chatbot") ||
    q.includes("facebook inquiries")
  ) {

    return `
      <strong>This can be turned into an automated customer
      support workflow.</strong>

      <br><br>

      AutoProv could connect Messenger with an AI support agent
      that understands incoming questions, uses business
      knowledge, captures leads, and escalates conversations
      when human assistance is needed.

      <br><br>

      <strong>Possible automation flow:</strong>

      <div class="flow-preview">
        <span>Customer</span>
        <b>→</b>
        <span>Messenger</span>
        <b>→</b>
        <span>AI Agent</span>
        <b>→</b>
        <span>Business Knowledge</span>
        <b>→</b>
        <span>Intent Detection</span>
        <b>→</b>
        <span>Lead Capture</span>
        <b>→</b>
        <span>Human Escalation</span>
      </div>

      <br>

      This can help businesses respond faster while keeping
      important conversations organized for follow-up.

      <br><br>

      <strong>Let's talk</strong> and dive deeper into the problem
      you want to automate.

      <br><br>

      <a
        class="ask-cta"
        href="mailto:autoprovph@gmail.com?subject=Automation%20Project%20Inquiry"
      >
        Let's Talk →
      </a>
    `;
  }


  // =========================================
  // 4. APPOINTMENT / BOOKING AUTOMATION
  // =========================================

  if (
    q.includes("appointment") ||
    q.includes("booking") ||
    q.includes("bookings") ||
    q.includes("schedule") ||
    q.includes("scheduling")
  ) {

    return `
      <strong>Yes — appointment inquiries can be streamlined
      with an automated workflow.</strong>

      <br><br>

      Instead of manually handling every initial request,
      an AI assistant could collect the information needed
      before the request reaches the business team.

      <br><br>

      <strong>Possible automation flow:</strong>

      <div class="flow-preview">
        <span>Customer</span>
        <b>→</b>
        <span>Chat</span>
        <b>→</b>
        <span>AI Assistant</span>
        <b>→</b>
        <span>Intent Detection</span>
        <b>→</b>
        <span>Appointment Request</span>
        <b>→</b>
        <span>Calendar / Staff</span>
      </div>

      <br>

      The final workflow could be connected to the business's
      scheduling system, availability rules, and notification
      process.

      <br><br>

      <strong>Let's talk</strong> and dive deeper into the problem
      you want to automate.

      <br><br>

      <a
        class="ask-cta"
        href="mailto:autoprovph@gmail.com?subject=Automation%20Project%20Inquiry"
      >
        Let's Talk →
      </a>
    `;
  }


  // =========================================
  // 5. RECEIPT → INVENTORY AUTOMATION
  // =========================================

  if (
    q.includes("receipt") ||
    q.includes("inventory") ||
    q.includes("stock") ||
    q.includes("receiving") ||
    q.includes("inventory update")
  ) {

    return `
      <strong>Yes — this is a great candidate for document
      processing and inventory automation.</strong>

      <br><br>

      AutoProv could design a workflow that reads receipt images,
      extracts the important information using OCR and AI,
      matches products, and updates inventory automatically.

      <br><br>

      <strong>Possible automation flow:</strong>

      <div class="flow-preview">
        <span>Receipt Image</span>
        <b>→</b>
        <span>OCR</span>
        <b>→</b>
        <span>AI Extraction</span>
        <b>→</b>
        <span>Product Matching</span>
        <b>→</b>
        <span>Inventory Update</span>
        <b>→</b>
        <span>Audit Log</span>
      </div>

      <br>

      The workflow could also include duplicate protection,
      approval steps, error handling, manual review for uncertain
      matches, and inventory audit records.

      <br><br>

      <strong>Let's talk</strong> and dive deeper into the process
      you want to automate.

      <br><br>

      <a
        class="ask-cta"
        href="mailto:autoprovph@gmail.com?subject=Automation%20Project%20Inquiry"
      >
        Let's Talk →
      </a>
    `;
  }


  // =========================================
  // 6. GENERIC AUTOMATION
  // =========================================

  return `
    <strong>That sounds like a process we can explore for
    automation.</strong>

    <br><br>

    A possible starting architecture could be:

    <div class="flow-preview">
      <span>Trigger</span>
      <b>→</b>
      <span>AI / Logic</span>
      <b>→</b>
      <span>Data Processing</span>
      <b>→</b>
      <span>Action</span>
      <b>→</b>
      <span>Notification / Output</span>
    </div>

    <br>

    The actual workflow would depend on your current process,
    tools, business rules, and the result you want to achieve.

    <br><br>

    <strong>Let's talk</strong> and dive deeper into the problem
    you want to automate.

    <br><br>

    <a
      class="ask-cta"
      href="mailto:autoprovph@gmail.com?subject=Automation%20Project%20Inquiry"
    >
      Let's Talk →
    </a>
  `;
}

function askAutoProv(question) {

  question = question.trim();

  if (!question) return;

  addChatMessage("user", question);

  const response = getAutoProvResponse(question);

  setTimeout(() => {

    addChatMessage("ai", response);

  }, 350);

  askInput.value = "";
}


// =========================================
// ASK BUTTON
// =========================================

askButton.addEventListener("click", () => {

  askAutoProv(askInput.value);

});


// =========================================
// ENTER KEY
// =========================================

askInput.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {

    askAutoProv(askInput.value);

  }

});


// =========================================
// EXAMPLE PROMPTS
// =========================================

promptButtons.forEach(button => {

  button.addEventListener("click", () => {

    const question = button.dataset.question;

    askInput.value = question;

    askAutoProv(question);

  });

});
