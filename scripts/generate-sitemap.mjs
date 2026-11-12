import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL as DEFAULT_SITE_URL } from "../src/lib/clinicInfo.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const SITE_URL = (process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");

const HOMEOPATHY = [
  "kidney-problems",
  "skin-scalp-concerns",
  "hair-problems",
  "male-female-infertility",
  "sexual-health",
  "psychological-mental-health",
  "digestive-problems",
  "joint-muscular-problems",
  "womens-health",
  "childrens-health",
  "mens-health",
];

const SPIRITUAL = [
  "rohani-ilaj",
  "istikhara",
  "quran-teaching",
  "madarsa",
  "nikah-khawan",
  "free-schooling-education",
  "nazim-e-ala-ulama-mashaikh",
  "international-research-center",
];

const PRODUCTS = [
  "attar-perfumes",
  "hair-oil",
  "ban-child-bam-bam",
  "winter-lotion",
  "herbal-soap",
  "acne-whitening-cream",
  "majoon-e-khas",
];

const PATHS = [
  "/",
  "/about",
  "/contact",
  "/services",
  "/services/homeopathy",
  ...HOMEOPATHY.map((s) => `/services/homeopathy/${s}`),
  "/services/spiritual",
  ...SPIRITUAL.map((s) => `/services/spiritual/${s}`),
  "/products",
  ...PRODUCTS.map((s) => `/products/${s}`),
  "/events/mehfil",
];

function urlEntry(path, priority) {
  const loc = `${SITE_URL}${path === "/" ? "/" : path}`;
  const langQuery = path === "/" ? "?lang=ur" : `${path}?lang=ur`;
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${loc}"/>
    <xhtml:link rel="alternate" hreflang="ur" href="${SITE_URL}${langQuery}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>
  </url>`;
}

const body = PATHS.map((p) => urlEntry(p, p === "/" ? "1.0" : p.includes("/") && p.split("/").length > 3 ? "0.7" : "0.85")).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), xml);
try {
  writeFileSync(join(root, "sitemap.xml"), xml);
} catch {
  /* optional root copy */
}
console.log(`sitemap.xml — ${PATHS.length} URLs → ${SITE_URL}`);
