import { SITE_URL as DEFAULT_SITE_URL } from "./clinicInfo.js";

/** Production site URL (no trailing slash). Set VITE_SITE_URL in .env to override. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
