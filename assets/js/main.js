/* MercyLand Parish — shared client JS. No dependencies.
   Functions: Retractable sidebar drawer nav, next-service computation, form validation,
   reveal-on-scroll animations (reduced-motion safe). */
(function () {
  "use strict";

  /* =====================================================================
     RETRACTABLE SIDE BAR DRAWER NAVIGATION
     ===================================================================== */
  const menuBtns = document.querySelectorAll(".nav-menu-btn");
  const sideDrawer = document.getElementById("sideDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const closeBtns = document.querySelectorAll(".drawer-close-btn");

  function openDrawer() {
    if (!sideDrawer) return;
    sideDrawer.classList.add("open");
    if (drawerBackdrop) drawerBackdrop.classList.add("active");
    document.body.classList.add("drawer-open");
    menuBtns.forEach(b => b.setAttribute("aria-expanded", "true"));
    
    // Focus first link in drawer for keyboard accessibility
    const firstLink = sideDrawer.querySelector("a, button");
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    if (!sideDrawer) return;
    sideDrawer.classList.remove("open");
    if (drawerBackdrop) drawerBackdrop.classList.remove("active");
    document.body.classList.remove("drawer-open");
    menuBtns.forEach(b => b.setAttribute("aria-expanded", "false"));
  }

  menuBtns.forEach(btn => {
    btn.addEventListener("click", openDrawer);
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", closeDrawer);
  });

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", closeDrawer);
  }

  // Close on link click inside drawer
  if (sideDrawer) {
    sideDrawer.addEventListener("click", e => {
      if (e.target.closest("a")) {
        closeDrawer();
      }
    });
  }

  // Close on Escape key press
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && sideDrawer && sideDrawer.classList.contains("open")) {
      closeDrawer();
    }
  });

  /* =====================================================================
     NEXT SERVICE CALCULATOR
     ===================================================================== */
  const SERVICES = [
    { dow: 0, label: "Sunday Worship Celebration", times: ["07:15", "09:30"] },
    { dow: 2, label: "Digging Deep (Bible Study)", times: ["18:30"] },
    { dow: 4, label: "Faith Clinic (Prayer)", times: ["18:30"] }
  ];

  function nextService() {
    const now = new Date();
    for (let d = 0; d < 14; d++) {
      const day = new Date(now);
      day.setDate(now.getDate() + d);
      day.setSeconds(0, 0);
      const match = SERVICES.filter(s => s.dow === day.getDay());
      if (!match.length) continue;
      for (let i = 0; i < match[0].times.length; i++) {
        const t = match[0].times[i].split(":");
        const cand = new Date(day);
        cand.setHours(+t[0], +t[1], 0, 0);
        if (cand >= now) {
          return {
            label: match[0].label,
            time: formatTime(match[0].times[i]),
            date: cand,
            rel: relativeDay(cand, now)
          };
        }
      }
    }
    return null;
  }

  function formatTime(t24) {
    const parts = t24.split(":");
    let h = parseInt(parts[0], 10);
    const m = parts[1];
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  }

  function relativeDay(date, now) {
    const diff = Math.round((new Date(date).setHours(0,0,0,0) - new Date(now).setHours(0,0,0,0)) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return date.toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "short" });
  }

  function renderNextService() {
    const ns = document.querySelectorAll("[data-next-service]");
    if (!ns.length) return;
    const info = nextService();
    let html;
    if (info) {
      html = `
        <span class="ns-label">Next Service</span>
        <span class="ns-time">${info.rel} · ${info.time}</span>
        <span class="muted" style="color:#CBD5E1">${info.label}</span>
        <a class="btn btn--primary ns-cta" href="service-times.html">Plan Your Visit</a>
      `;
    } else {
      html = `
        <span class="ns-label">Services</span>
        <span class="ns-time">See Weekly Schedule</span>
        <a class="btn btn--primary ns-cta" href="service-times.html">Service Times</a>
      `;
    }
    ns.forEach(el => { el.innerHTML = html; });
  }
  renderNextService();

  /* =====================================================================
     FORMS: VALIDATION & MAILTO / CUSTOM SUBMIT
     ===================================================================== */
  document.querySelectorAll("form[data-form]").forEach(form => {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", e => {
      e.preventDefault();
      if (!form.checkValidity()) {
        if (status) {
          status.className = "form-status err";
          status.textContent = "Please fill in the required fields.";
          status.style.display = "block";
        }
        form.reportValidity();
        return;
      }
      const name = form.querySelector("[name=name]");
      const email = form.querySelector("[name=email]");
      const phone = form.querySelector("[name=phone]");
      const msg = form.querySelector("[name=message]") || form.querySelector("[name=request]");
      const subject = form.getAttribute("data-subject") || "MercyLand Parish Message";
      
      let body = "";
      if (name && name.value) body += `Name: ${name.value}\n`;
      if (email && email.value) body += `Email: ${email.value}\n`;
      if (phone && phone.value) body += `Phone: ${phone.value}\n`;
      if (msg && msg.value) body += `\nMessage:\n${msg.value}`;

      const mail = `mailto:info@mercylandparish.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (status) {
        status.className = "form-status ok";
        status.textContent = "Opening your email app to send your message...";
        status.style.display = "block";
      }
      window.location.href = mail;
    });
  });

  /* =====================================================================
     REVEAL ON SCROLL
     ===================================================================== */
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const els = document.querySelectorAll(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => { io.observe(el); });
  } else {
    els.forEach(el => { el.classList.add("in"); });
  }
})();
