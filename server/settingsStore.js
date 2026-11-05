import { store } from "./store.js";
import { DEFAULT_SETTINGS } from "./defaultSettings.js";

function deepMerge(base, patch) {
  const out = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    if (value && typeof value === "object" && !Array.isArray(value) && base[key]) {
      out[key] = deepMerge(base[key], value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

export function getSettings() {
  const raw = store.getState().site_settings.site;
  if (!raw) {
    setSettings(DEFAULT_SETTINGS);
    return structuredClone(DEFAULT_SETTINGS);
  }
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return deepMerge(DEFAULT_SETTINGS, parsed);
  } catch {
    return structuredClone(DEFAULT_SETTINGS);
  }
}

export function setSettings(partial) {
  const current = getSettings();
  const next = deepMerge(current, partial);
  store.getState().site_settings.site = JSON.stringify(next);
  store.save();
  return next;
}

export function replaceSettings(next) {
  store.getState().site_settings.site = JSON.stringify(deepMerge(DEFAULT_SETTINGS, next));
  store.save();
  return getSettings();
}
