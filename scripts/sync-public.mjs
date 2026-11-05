import { cpSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dest = join(root, "public", "assets");

mkdirSync(dest, { recursive: true });
cpSync(join(root, "assets"), dest, { recursive: true, force: true });
