import { BRAND_OG_IMAGE_PATH } from "./brandAssets.js";
import { SITE_URL, absoluteUrl } from "./siteConfig.js";

function upsertMeta(attr, key, content) {
  if (content == null || content === "") return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href, extra = {}) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

const SITE_NAME = "Noori Roohani Homeo Clinic";

/**
 * @param {{
 *   title: string,
 *   description: string,
 *   pathname?: string,
 *   type?: string,
 *   robots?: string,
 *   locale?: string,
 *   breadcrumb?: { name: string, item?: string }[],
 *   noindex?: boolean,
 * }} opts
 */
export function applyPageSeo(opts) {
  const {
    title,
    description,
    pathname = typeof window !== "undefined" ? window.location.pathname : "/",
    type = "website",
    locale = document.documentElement.lang === "ur" ? "ur_PK" : "en_PK",
    breadcrumb,
    noindex = false,
  } = opts;

  const path = pathname.split("?")[0] || "/";
  const canonical = absoluteUrl(path === "/" ? "/" : path);
  const ogImage = absoluteUrl(BRAND_OG_IMAGE_PATH);

  if (title) document.title = title;

  upsertMeta("name", "description", description);
  upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");

  upsertLink("canonical", canonical);

  upsertMeta("property", "og:type", type);
  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("property", "og:url", canonical);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:image", ogImage);
  upsertMeta("property", "og:image:secure_url", ogImage);
  upsertMeta("property", "og:locale", locale);

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", ogImage);

  upsertJsonLd("nrhc-webpage", {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#clinic` },
    inLanguage: document.documentElement.lang || "en",
  });

  if (breadcrumb?.length) {
    upsertJsonLd("nrhc-breadcrumbs", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        ...(crumb.item ? { item: absoluteUrl(crumb.item) } : {}),
      })),
    });
  } else {
    const el = document.getElementById("nrhc-breadcrumbs");
    if (el) el.remove();
  }
}
