/* MercyLand Parish — shared client JS. No dependencies.
   Functions: mobile nav toggle, next-service computation, form validation,
   single authored reveal-on-scroll moment (reduced-motion safe). */
(function () {
  "use strict";

  /* ---- mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ---- next service calculator ----
     Sunday services inside 7:00-12:00 window (editable placeholders).
     Midweek Tue & Thu 18:30-20:00. Adjust START/TIMES here when church confirms. */
  var SERVICES = [
    { dow: 0, label: "Sunday Service", times: ["07:30", "10:00"] }, // Sunday
    { dow: 2, label: "Midweek Service", times: ["18:30"] },        // Tuesday
    { dow: 4, label: "Midweek Service", times: ["18:30"] }         // Thursday
  ];
  function nextService() {
    var now = new Date();
    for (var d = 0; d < 14; d++) {
      var day = new Date(now);
      day.setDate(now.getDate() + d);
      day.setSeconds(0, 0);
      var match = SERVICES.filter(function (s) { return s.dow === day.getDay(); });
      if (!match.length) continue;
      for (var i = 0; i < match[0].times.length; i++) {
        var t = match[0].times[i].split(":");
        var cand = new Date(day);
        cand.setHours(+t[0], +t[1], 0, 0);
        if (cand >= now) {
          return {
            label: match[0].label,
            time: match[0].times[i],
            date: cand,
            rel: relativeDay(cand, now)
          };
        }
      }
    }
    return null;
  }
  function relativeDay(date, now) {
    var diff = Math.round((date.setHours(0,0,0,0) - new Date(now).setHours(0,0,0,0)) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return date.toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "short" });
  }
  function renderNextService() {
    var ns = document.querySelectorAll("[data-next-service]");
    if (!ns.length) return;
    var info = nextService();
    var html;
    if (info) {
      html =
        '<span class="ns-label">Next service</span>' +
        '<span class="ns-time">' + info.rel + " &middot; " + info.time + "</span>" +
        '<span class="muted" style="color:#d8cabd">' + info.label + "</span>" +
        '<a class="btn btn--primary ns-cta" href="service-times.html">Plan your visit</a>';
    } else {
      html = '<span class="ns-label">Services</span><span class="ns-time">See schedule</span>' +
        '<a class="btn btn--primary ns-cta" href="service-times.html">Service times</a>';
    }
    ns.forEach(function (el) { el.innerHTML = html; });
  }
  renderNextService();

  /* ---- forms (no backend): validate + mailto fallback ---- */
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        if (status) { status.className = "form-status err"; status.textContent = "Please fill in the required fields."; }
        form.reportValidity();
        return;
      }
      var name = form.querySelector("[name=name]");
      var email = form.querySelector("[name=email]");
      var msg = form.querySelector("[name=message]") || form.querySelector("[name=request]");
      var subject = form.getAttribute("data-subject") || "MercyLand Parish message";
      var body = "";
      if (name && name.value) body += "Name: " + name.value + "\n";
      if (email && email.value) body += "Email: " + email.value + "\n";
      if (msg && msg.value) body += "\n" + msg.value;
      // Config slot: replace with Formspree/email later. mailto is the zero-backend default.
      var mail = "mailto:hello@mercylandparish.org?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      if (status) { status.className = "form-status ok"; status.textContent = "Thank you — your message is ready to send. (Connect email/Formspree to send automatically.)"; }
      window.location.href = mail;
    });
  });

  /* ---- single authored reveal moment ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("in"); });
  }
})();
