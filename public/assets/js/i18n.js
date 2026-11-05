/**
 * Lightweight i18n: fetch JSON bundles, apply data-i18n / data-i18n-attr, RTL for Urdu.
 */

const STORAGE_KEY = "nrhc-lang";
const DEFAULT_LANG = "en";
const SUPPORTED = ["en", "ur"];

/** @type {Record<string, object>} */
const bundleCache = {};

/**
 * @param {string} lang
 * @returns {Promise<object>}
 */
export async function loadBundle(lang) {
  const code = SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
  if (bundleCache[code]) {
    return bundleCache[code];
  }
  const response = await fetch(`assets/i18n/${code}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load language bundle: ${code}`);
  }
  const data = await response.json();
  bundleCache[code] = data;
  return data;
}

/**
 * @param {object} obj
 * @param {string} path
 * @returns {string | undefined}
 */
export function t(obj, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return acc[key];
    }
    return undefined;
  }, obj);
}

/**
 * @returns {string}
 */
export function detectInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get("lang");
  if (queryLang && SUPPORTED.includes(queryLang)) {
    return queryLang;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) {
    return stored;
  }
  const browser = (navigator.language || navigator.userLanguage || "").toLowerCase();
  if (browser.startsWith("ur")) {
    return "ur";
  }
  return DEFAULT_LANG;
}

/**
 * @param {string} lang
 * @param {object} bundle
 */
const URDU_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500&display=swap";

function setMetaContent(selector, content) {
  if (!content) return;
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute("content", content);
  }
}

function syncUrduFont(lang) {
  const id = "nrhc-font-urdu";
  let link = document.getElementById(id);
  if (lang === "ur") {
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = URDU_FONT_HREF;
      document.head.appendChild(link);
    }
  } else if (link) {
    link.remove();
  }
}

export function applyDocumentLanguage(lang, bundle) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ur" ? "rtl" : "ltr";

  const title = t(bundle, "meta.title");
  const description = t(bundle, "meta.description");
  const ogTitle = t(bundle, "meta.ogTitle") || title;
  const ogDescription = t(bundle, "meta.ogDescription") || description;

  if (title) {
    document.title = title;
  }
  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', ogTitle);
  setMetaContent('meta[property="og:description"]', ogDescription);
  setMetaContent('meta[name="twitter:title"]', ogTitle);
  setMetaContent('meta[name="twitter:description"]', ogDescription);
  setMetaContent('meta[property="og:locale"]', lang === "ur" ? "ur_PK" : "en_PK");

  syncUrduFont(lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const value = t(bundle, key);
    if (typeof value === "string") {
      el.textContent = value.replace(/\{year\}/g, String(new Date().getFullYear()));
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const spec = el.getAttribute("data-i18n-attr");
    if (!spec) return;
    spec.split(",").forEach((pair) => {
      const [attr, key] = pair.trim().split(":").map((s) => s.trim());
      if (!attr || !key) return;
      const value = t(bundle, key);
      if (typeof value === "string") {
        el.setAttribute(attr, value);
      }
    });
  });

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    const btnLang = btn.getAttribute("data-lang");
    btn.setAttribute("aria-pressed", btnLang === lang ? "true" : "false");
  });

  localStorage.setItem(STORAGE_KEY, lang);

  try {
    const url = new URL(window.location.href);
    if (lang === DEFAULT_LANG) {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", lang);
    }
    window.history.replaceState({}, "", url);
  } catch {
    /* ignore */
  }
}

/**
 * @param {string} lang
 * @param {(lang: string) => void} [onChange]
 */
export async function setLanguage(lang, onChange) {
  const code = SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
  const bundle = await loadBundle(code);
  applyDocumentLanguage(code, bundle);
  if (onChange) {
    onChange(code);
  }
}

/**
 * @param {(lang: string) => void} [onChange]
 */
export async function initI18n(onChange) {
  const initial = detectInitialLanguage();
  await loadBundle(DEFAULT_LANG);
  if (initial !== DEFAULT_LANG) {
    await loadBundle(initial);
  }
  await setLanguage(initial, onChange);
}

export { SUPPORTED, STORAGE_KEY };
