/**
 * Sync index.html static SEO URLs with clinic SITE_URL (build-time fallback before runtime meta).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL } from "../src/lib/clinicInfo.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.env.VITE_SITE_URL || SITE_URL).replace(/\/$/, "");

const indexPath = join(root, "index.html");
let html = readFileSync(indexPath, "utf8");

html = html.replaceAll("https://www.example.com", base);
writeFileSync(indexPath, html);

function patchRobots(filePath) {
  let robots = readFileSync(filePath, "utf8");
  robots = robots.replace(/Sitemap:.*$/m, `Sitemap: ${base}/sitemap.xml`);
  writeFileSync(filePath, robots);
}

patchRobots(join(root, "public", "robots.txt"));
try {
  patchRobots(join(root, "robots.txt"));
} catch {
  /* optional root copy */
}

let legacy = join(root, "index.legacy.html");
try {
  let htmlLegacy = readFileSync(legacy, "utf8");
  htmlLegacy = htmlLegacy.replaceAll("https://www.example.com", base);
  writeFileSync(legacy, htmlLegacy);
} catch {
  /* optional */
}

console.log(`index.html + robots.txt → ${base}`);
