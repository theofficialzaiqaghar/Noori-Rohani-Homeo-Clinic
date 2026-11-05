export const STORAGE_KEY = "nrhc-lang";
export const DEFAULT_LANG = "en";
export const SUPPORTED = ["en", "ur"];

export function t(bundle, path) {
  if (!bundle || !path) return undefined;
  return path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) return acc[key];
    return undefined;
  }, bundle);
}

export function detectInitialLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get("lang");
  if (queryLang && SUPPORTED.includes(queryLang)) return queryLang;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED.includes(stored)) return stored;

  const browser = (navigator.language || "").toLowerCase();
  if (browser.startsWith("ur")) return "ur";
  return DEFAULT_LANG;
}

export function applyMeta(bundle, lang) {
  const title = t(bundle, "meta.title");
  const description = t(bundle, "meta.description");
  const ogTitle = t(bundle, "meta.ogTitle") || title;
  const ogDescription = t(bundle, "meta.ogDescription") || description;

  if (title) document.title = title;

  const set = (selector, value) => {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.setAttribute("content", value);
  };

  set('meta[name="description"]', description);
  set('meta[property="og:title"]', ogTitle);
  set('meta[property="og:description"]', ogDescription);
  set('meta[name="twitter:title"]', ogTitle);
  set('meta[name="twitter:description"]', ogDescription);
  set('meta[property="og:locale"]', lang === "ur" ? "ur_PK" : "en_PK");

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";

  const urduFontId = "nrhc-font-urdu";
  let link = document.getElementById(urduFontId);
  if (lang === "ur") {
    if (!link) {
      link = document.createElement("link");
      link.id = urduFontId;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500&display=swap";
      document.head.appendChild(link);
    }
  } else if (link) {
    link.remove();
  }

  try {
    const url = new URL(window.location.href);
    if (lang === DEFAULT_LANG) url.searchParams.delete("lang");
    else url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url);
  } catch {
    /* noop */
  }

  localStorage.setItem(STORAGE_KEY, lang);
}
