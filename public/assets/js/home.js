/**
 * Home page: scroll reveal, contact form validation, honeypot.
 */

const WHATSAPP_NUMBER = "923000000000";
const CLINIC_EMAIL = "info@example.com";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (prefersReducedMotion()) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

export function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const honeypot = form.querySelector("[data-honeypot]");
  const status = form.querySelector("[data-form-status]");
  const mailFallback = form.querySelector("[data-mailto-fallback]");

  const showError = (field, message) => {
    const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
    if (errorEl) {
      errorEl.textContent = message;
    }
    field.setAttribute("aria-invalid", "true");
  };

  const clearErrors = () => {
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
    form.querySelectorAll("[data-error-for]").forEach((el) => {
      el.textContent = "";
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    if (honeypot && honeypot.value.trim() !== "") {
      return;
    }

    const name = form.elements.namedItem("name");
    const phone = form.elements.namedItem("phone");
    const service = form.elements.namedItem("service");
    const message = form.elements.namedItem("message");

    let valid = true;

    if (!(name instanceof HTMLInputElement) || name.value.trim().length < 2) {
      valid = false;
      if (name instanceof HTMLInputElement) {
        showError(name, form.dataset.errorName || "Please enter your name.");
      }
    }

    if (!(phone instanceof HTMLInputElement) || phone.value.trim().length < 7) {
      valid = false;
      if (phone instanceof HTMLInputElement) {
        showError(phone, form.dataset.errorPhone || "Please enter a valid phone number.");
      }
    }

    if (!(service instanceof HTMLSelectElement) || !service.value) {
      valid = false;
      if (service instanceof HTMLSelectElement) {
        showError(service, form.dataset.errorService || "Please choose a service.");
      }
    }

    if (!valid) {
      if (status) {
        status.textContent = form.dataset.errorSummary || "Please fix the highlighted fields.";
        status.classList.add("is-error");
      }
      return;
    }

    const serviceLabel =
      service instanceof HTMLSelectElement
        ? service.options[service.selectedIndex]?.textContent?.trim() || service.value
        : "";

    const text = [
      "Assalam-o-Alaikum,",
      `Name: ${name instanceof HTMLInputElement ? name.value.trim() : ""}`,
      `Phone: ${phone instanceof HTMLInputElement ? phone.value.trim() : ""}`,
      `Service: ${serviceLabel}`,
      message instanceof HTMLTextAreaElement && message.value.trim()
        ? `Message: ${message.value.trim()}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    const subject = encodeURIComponent("Appointment request — Noori Roohani Homeo Clinic");
    const body = encodeURIComponent(text);

    if (mailFallback instanceof HTMLAnchorElement) {
      mailFallback.href = `mailto:${CLINIC_EMAIL}?subject=${subject}&body=${body}`;
    }

    window.open(waUrl, "_blank", "noopener,noreferrer");

    if (status) {
      status.textContent = form.dataset.successMessage || "Opening WhatsApp. You can also use email if needed.";
      status.classList.remove("is-error");
      status.classList.add("is-success");
    }

    form.reset();
  });
}
