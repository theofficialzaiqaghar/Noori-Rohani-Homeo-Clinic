import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "data");
const dbPath = join(dataDir, "clinic.json");

mkdirSync(dataDir, { recursive: true });

const empty = () => ({
  admin_users: [],
  site_settings: {},
  media: [],
  _seq: { admin_users: 0 },
});

function load() {
  if (!existsSync(dbPath)) return empty();
  try {
    return { ...empty(), ...JSON.parse(readFileSync(dbPath, "utf8")) };
  } catch {
    return empty();
  }
}

let state = load();

function persist() {
  writeFileSync(dbPath, JSON.stringify(state, null, 2), "utf8");
}

export const store = {
  getState: () => state,
  save: persist,
  reload: () => {
    state = load();
  },
};

export function nextAdminId() {
  state._seq.admin_users += 1;
  return state._seq.admin_users;
}
