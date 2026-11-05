/* =========================================================
   Prime Detail Studio — script.js (JavaScript puro)
   Configure o contato apenas em SITE_CONFIG.
   ========================================================= */
const SITE_CONFIG = {
  companyName: "Prime Detail Studio",
  // Número com DDI + DDD, só dígitos. Exemplo de formato: "5562900000000".
  // Deixe vazio ("") enquanto o contato for demonstrativo.
  whatsappNumber: "",
  // URL completa do Instagram. Exemplo de formato: "https://www.instagram.com/usuario/". Vazio = demonstrativo.
  instagramUrl: "",
  whatsappMessage: "Olá! Conheci o site e gostaria de solicitar informações sobre os serviços de estética automotiva."
};

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Aviso acessível ---------- */
  const toast = document.getElementById("toast");
  let toastTimer;
  function showNotice(message) {
    if (!toast) return;
    toast.hidden = true;           // reinicia para o leitor de tela anunciar de novo
    toast.textContent = message;
    window.requestAnimationFrame(function () {
      toast.hidden = false;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.hidden = true; }, 7000);
    });
  }

  /* ---------- Contato centralizado ---------- */
  function getWhatsAppUrl() {
    const digits = String(SITE_CONFIG.whatsappNumber || "").replace(/\D/g, "");
    if (digits.length < 12 || digits.length > 15) return null; // DDI + DDD + número
    return "https://wa.me/" + digits + "?text=" + encodeURIComponent(SITE_CONFIG.whatsappMessage);
  }

  function getInstagramUrl() {
    try {
      const url = new URL(String(SITE_CONFIG.instagramUrl || ""));
      return url.protocol === "https:" ? url.href : null;
    } catch (e) { return null; }
  }

  function openExternal(url) {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url; // pop-up bloqueado
  }

  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      const url = getWhatsAppUrl();
      if (url) { openExternal(url); return; }
      showNotice("Contato demonstrativo: este site é um projeto fictício e ainda não há um WhatsApp configurado.");
    });
  });

  document.querySelectorAll("[data-instagram]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      const url = getInstagramUrl();
      if (url) { openExternal(url); return; }
      showNotice("Contato demonstrativo: este site é um projeto fictício e ainda não há um Instagram configurado.");
    });
  });

  /* ---------- Menu mobile ---------- */
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("menu");
  const desktop = window.matchMedia("(min-width: 960px)");

  function setMenu(open, returnFocus) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    if (!open && returnFocus) toggle.focus();
  }

  function syncMenuForViewport() {
    if (desktop.matches) {
      nav.removeAttribute("inert");
      setMenu(false);
    } else if (toggle.getAttribute("aria-expanded") !== "true") {
      nav.setAttribute("inert", ""); // links ocultos não entram na ordem de tabulação
    }
  }

  toggle.addEventListener("click", function () {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    if (open) nav.removeAttribute("inert");
    setMenu(open);
    if (!open && !desktop.matches) nav.setAttribute("inert", "");
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a") && !desktop.matches) {
      setMenu(false);
      nav.setAttribute("inert", "");
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false, true);
      nav.setAttribute("inert", "");
    }
  });

  document.addEventListener("click", function (event) {
    if (toggle.getAttribute("aria-expanded") === "true" && !header.contains(event.target)) {
      setMenu(false);
      nav.setAttribute("inert", "");
    }
  });

  desktop.addEventListener("change", syncMenuForViewport);
  syncMenuForViewport();

  /* ---------- Cabeçalho: transparente sobre o hero, sólido ao rolar ---------- */
  function syncHeader() { header.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", syncHeader, { passive: true });
  syncHeader();

  /* ---------- Foto ausente: mostra bloco liso com o nome do arquivo esperado ---------- */
  document.querySelectorAll(".photo img").forEach(function (img) {
    function markMissing() {
      const box = img.closest(".photo");
      box.classList.add("img-missing");
      box.setAttribute("data-file", (img.getAttribute("src") || "").split("/").pop());
    }
    img.addEventListener("error", markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  });

  /* ---------- Animação de entrada ao rolar ---------- */
  const revealTargets = document.querySelectorAll(".service, .steps li, .about-grid > *, .section-head, .g, .contact-grid > *");
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Galeria ampliada (<dialog>) ---------- */
  const dialog = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbCap = document.getElementById("lightbox-cap");
  const items = Array.prototype.slice.call(document.querySelectorAll(".g-btn"));
  let current = 0;
  let opener = null;

  if (dialog && typeof dialog.showModal === "function") {
    const show = function (i) {
      current = (i + items.length) % items.length;
      const data = items[current].dataset;
      lbImg.src = data.full;
      lbImg.alt = data.alt || "";
      lbCap.textContent = data.caption || "";
    };
    items.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        opener = btn;
        show(i);
        dialog.showModal();
      });
    });
    document.getElementById("lb-close").addEventListener("click", function () { dialog.close(); });
    document.getElementById("lb-prev").addEventListener("click", function () { show(current - 1); });
    document.getElementById("lb-next").addEventListener("click", function () { show(current + 1); });
    dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });
    dialog.addEventListener("close", function () { if (opener) opener.focus(); });
  } else {
    items.forEach(function (btn) { btn.style.cursor = "default"; });
  }

})();
