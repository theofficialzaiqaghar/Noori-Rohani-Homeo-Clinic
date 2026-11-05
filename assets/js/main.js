/**
 * Site shell: i18n, sticky header, mobile menu (focus trap), nav dropdowns.
 */

import { initI18n, setLanguage } from "./i18n.js";
import { initFooter, initBackToTop } from "./footer.js";
import { initScrollReveal, initContactForm } from "./home.js";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initLanguageSwitcher() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (lang) {
        setLanguage(lang);
      }
    });
  });
}

function getFocusables(container) {
  return [...container.querySelectorAll(FOCUSABLE)].filter(
    (el) => !el.hasAttribute("disabled") && el.offsetParent !== null
  );
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.querySelector(".mobile-nav");
  const panel = document.querySelector(".mobile-nav__panel");
  const closeBtn = document.querySelector(".mobile-nav__close");
  const backdrop = document.querySelector(".mobile-nav__backdrop");

  if (!toggle || !drawer || !panel) return;

  let previouslyFocused = null;

  const open = () => {
    previouslyFocused = document.activeElement;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    const focusables = getFocusables(panel);
    (focusables[0] || closeBtn)?.focus();
  };

  const close = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (previouslyFocused && typeof previouslyFocused.focus === "function") {
      previouslyFocused.focus();
    }
  };

  toggle.addEventListener("click", () => {
    if (drawer.classList.contains("is-open")) {
      close();
    } else {
      open();
    }
  });

  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);

  panel.querySelectorAll("a.mobile-nav__link").forEach((link) => {
    link.addEventListener("click", close);
  });

  drawer.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== "Tab" || !drawer.classList.contains("is-open")) return;

    const focusables = getFocusables(panel);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function initNavDropdowns() {
  document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
    const trigger = dropdown.querySelector(".nav-dropdown__trigger");
    const panel = dropdown.querySelector(".nav-dropdown__panel");
    if (!trigger || !panel) return;

    const links = [...panel.querySelectorAll("a")];
    let open = false;

    const setOpen = (next) => {
      open = next;
      dropdown.classList.toggle("is-open", open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
    };

    const openMenu = () => {
      setOpen(true);
      if (links[0]) links[0].focus();
    };

    const closeMenu = () => {
      setOpen(false);
    };

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      setOpen(!open);
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        openMenu();
      } else if (event.key === "Escape") {
        closeMenu();
      }
    });

    panel.addEventListener("keydown", (event) => {
      const index = links.indexOf(document.activeElement);
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        trigger.focus();
      } else if (event.key === "ArrowDown" && index < links.length - 1) {
        event.preventDefault();
        links[index + 1].focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (index > 0) {
          links[index - 1].focus();
        } else {
          closeMenu();
          trigger.focus();
        }
      }
    });

    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) {
        closeMenu();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await initFooter();
  await initI18n();
  initLanguageSwitcher();
  initStickyHeader();
  initMobileNav();
  initNavDropdowns();
  initBackToTop();
  initScrollReveal();
  initContactForm();
});
