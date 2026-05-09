const toggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu when clicking a link (mobile)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});



/* =========================
   GE Accordion + Flipcards
   ========================= */

// Accordion
const accItems = document.querySelectorAll(".ge-acc-item");

accItems.forEach(item => {
  const btn = item.querySelector(".ge-acc-header");
  const panel = item.querySelector(".ge-acc-panel");

  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("is-open");

    // Close others (one open at a time)
    accItems.forEach(other => {
      if (other !== item) closeAccordion(other);
    });

    // Toggle current
    isOpen ? closeAccordion(item) : openAccordion(item);
  });

  function openAccordion(target){
    const b = target.querySelector(".ge-acc-header");
    const p = target.querySelector(".ge-acc-panel");

    target.classList.add("is-open");
    b.setAttribute("aria-expanded", "true");
    p.hidden = false;

    // Smooth height
    p.style.maxHeight = p.scrollHeight + "px";
  }

  function closeAccordion(target){
    const b = target.querySelector(".ge-acc-header");
    const p = target.querySelector(".ge-acc-panel");

    target.classList.remove("is-open");
    b.setAttribute("aria-expanded", "false");

    // Reset flipped cards when closing
    target.querySelectorAll(".ge-card.is-flipped").forEach(c => c.classList.remove("is-flipped"));

    // Smooth height close
    p.style.maxHeight = "0px";
    // hide after transition
    setTimeout(() => { p.hidden = true; }, 350);
  }
});

// Flipcards (tap/click) — ignore clicks on form elements / links
document.querySelectorAll(".ge-card").forEach(card => {
  card.addEventListener("click", (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (["a", "button", "input", "textarea", "label"].includes(tag)) return;
    card.classList.toggle("is-flipped");
  });

  // Keyboard
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.classList.toggle("is-flipped");
    }
    if (e.key === "Escape") {
      card.classList.remove("is-flipped");
    }
  });
});

// Register button demo
const geRegisterBtn = document.getElementById("geRegisterBtn");
if (geRegisterBtn) {
  geRegisterBtn.addEventListener("click", () => {
    alert("Thanks! We’ll contact you soon. (You can connect this to a form later.)");
  });
}

// Consultation form -> mailto (no backend)
const consultForm = document.getElementById("geConsultForm");
if (consultForm) {
  consultForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("geName").value.trim();
    const email = document.getElementById("geEmail").value.trim();
    const msg = document.getElementById("geMsg").value.trim();

    const subject = encodeURIComponent("Consultation Request - Growing Essentials");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}\n`);

    window.location.href = `mailto:growingessentialstt@gmail.com?subject=${subject}&body=${body}`;
  });
}