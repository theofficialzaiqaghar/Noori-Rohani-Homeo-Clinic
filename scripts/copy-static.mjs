import { cpSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const files = ["robots.txt", "sitemap.xml", "404.html", "site.webmanifest", ".htaccess"];

for (const file of files) {
  const src = join(root, "public", file);
  const alt = join(root, file);
  const from = existsSync(src) ? src : alt;
  if (existsSync(from)) {
    cpSync(from, join(dist, file));
  }
}
