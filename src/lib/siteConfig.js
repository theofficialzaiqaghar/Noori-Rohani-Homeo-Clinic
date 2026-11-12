/** Production site URL (no trailing slash). Set VITE_SITE_URL in .env for live domain. */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://www.example.com"
).replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
