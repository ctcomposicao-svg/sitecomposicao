/* ============================================
   COMPOSIÇÃO — Site Institucional
   JavaScript vanilla — comportamento
============================================ */

(function () {
  "use strict";

  /* ---- Menu mobile ---- */
  var menuToggle = document.querySelector(".menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");

  function closeMobileMenu() {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openMobileMenu() {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      var expanded = menuToggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  /* ---- Header sombra ao rolar ---- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll ---- */
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var revealElements = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(function (el) {
      el.classList.add("visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- Fechar menu ao redimensionar para desktop ---- */
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 640) {
        closeMobileMenu();
      }
    }, 150);
  });

  /* ---- Escape fecha o menu mobile ---- */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  });
})();
