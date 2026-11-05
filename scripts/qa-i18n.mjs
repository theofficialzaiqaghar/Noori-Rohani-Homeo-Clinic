import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const i18nDir = join(root, "assets", "i18n");

function flatten(obj, prefix = "") {
  /** @type {string[]} */
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flatten(value, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

const en = JSON.parse(readFileSync(join(i18nDir, "en.json"), "utf8"));
const ur = JSON.parse(readFileSync(join(i18nDir, "ur.json"), "utf8"));

const enKeys = new Set(flatten(en));
const urKeys = new Set(flatten(ur));

const missingInUr = [...enKeys].filter((k) => !urKeys.has(k)).sort();
const missingInEn = [...urKeys].filter((k) => !enKeys.has(k)).sort();

let exitCode = 0;

if (missingInUr.length) {
  exitCode = 1;
  console.error("Missing in ur.json:", missingInUr.join(", "));
}
if (missingInEn.length) {
  exitCode = 1;
  console.error("Missing in en.json:", missingInEn.join(", "));
}

if (!exitCode) {
  console.log(`i18n OK — ${enKeys.size} keys matched in en.json and ur.json`);
}

process.exit(exitCode);
