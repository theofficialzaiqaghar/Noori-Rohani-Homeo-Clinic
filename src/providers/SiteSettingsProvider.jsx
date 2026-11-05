import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

const SiteSettingsContext = createContext(null);

const FONT_MAP = {
  Inter: "Inter:wght@400;500;600",
  Geist: "Inter:wght@400;500;600",
  Manrope: "Manrope:wght@400;500;600;700",
  "Plus Jakarta Sans": "Plus+Jakarta+Sans:wght@400;500;600;700",
};

function loadGoogleFont(family) {
  if (!family || !FONT_MAP[family]) return;
  const id = `font-${family.replace(/\s+/g, "-").toLowerCase()}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${FONT_MAP[family]}&display=swap`;
  document.head.appendChild(link);
}

function applyTheme({ settings, slots }) {
  if (!settings) return;
  const root = document.documentElement;
  const { brand, typography } = settings;

  loadGoogleFont(typography.primaryFont);
  loadGoogleFont(typography.headingFont);

  root.style.setProperty("--brand-primary", brand.primaryColor);
  root.style.setProperty("--brand-secondary", brand.secondaryColor);
  root.style.setProperty("--brand-bg", brand.backgroundColor);
  root.style.setProperty("--brand-surface", brand.surfaceColor);
  root.style.setProperty("--brand-text", brand.textColor);
  root.style.setProperty("--brand-muted", brand.mutedTextColor);

  root.style.setProperty("--font-body-custom", `"${typography.primaryFont}", system-ui, sans-serif`);
  root.style.setProperty("--font-display-custom", `"${typography.headingFont}", system-ui, sans-serif`);
  root.style.setProperty("--weight-heading-custom", typography.headingWeight);
  root.style.setProperty("--weight-body-custom", typography.bodyWeight);
  root.style.setProperty("--leading-body-custom", String(typography.lineHeight));
  root.style.setProperty("--tracking-heading-custom", typography.letterSpacingHeading);
  root.style.setProperty("--text-base-size", `${typography.baseFontSizePx}px`);
  root.style.setProperty("--leading-body", String(typography.lineHeight));
  root.style.setProperty("--heading-scale", String(typography.scaleRatio));
  const r = typography.scaleRatio || 1.2;
  root.style.setProperty("--scale-step-2", String(r * r));
  root.style.setProperty("--scale-step-3", String(r ** 3));
  root.style.setProperty("--scale-step-hero", String(r ** 3.2));
  root.style.setProperty("--tracking-heading", typography.letterSpacingHeading);
  root.style.setProperty("--tracking-body", typography.letterSpacingBody);

  const favicon = slots?.["brand.favicon"]?.url;
  if (favicon) {
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = favicon;
  }
}

export function SiteSettingsProvider({ children }) {
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const data = await api.getPublicSite();
      setPayload(data);
      applyTheme(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    refresh();
    const id = window.setInterval(refresh, 30000);
    return () => window.clearInterval(id);
  }, [refresh]);

  const value = useMemo(
    () => ({
      settings: payload?.settings,
      slots: payload?.slots || {},
      media: payload?.media || [],
      error,
      refresh,
      getSlot: (key) => payload?.slots?.[key] || null,
    }),
    [payload, error, refresh]
  );

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
