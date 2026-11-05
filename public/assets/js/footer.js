/**
 * Reusable site footer: fetch partial, inject into [data-site-footer], back-to-top.
 */

const FOOTER_PARTIAL = "assets/partials/footer.html";

const BACK_TO_TOP_HTML = `
<button type="button" class="back-to-top" data-back-to-top data-i18n-attr="aria-label:a11y.backToTop">
  <svg class="icon icon--md" aria-hidden="true"><use href="assets/icons/sprite.svg#icon-arrow-up"></use></svg>
</button>`;

/** @type {string | null} */
let footerTemplateCache = null;

/**
 * @returns {Promise<string>}
 */
async function loadFooterTemplate() {
  if (footerTemplateCache) {
    return footerTemplateCache;
  }
  const response = await fetch(FOOTER_PARTIAL);
  if (!response.ok) {
    throw new Error("Failed to load footer partial");
  }
  footerTemplateCache = await response.text();
  return footerTemplateCache;
}

export async function initFooter() {
  const mount = document.querySelector("[data-site-footer]");
  if (!mount) {
    return;
  }

  const html = await loadFooterTemplate();
  mount.innerHTML = html;

  if (!document.querySelector("[data-back-to-top]")) {
    document.body.insertAdjacentHTML("beforeend", BACK_TO_TOP_HTML);
  }
}

export function initBackToTop() {
  const button = document.querySelector("[data-back-to-top]");
  if (!button) {
    return;
  }

  const threshold = 320;

  const update = () => {
    button.classList.toggle("is-visible", window.scrollY > threshold);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });

  button.addEventListener("click", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
}
