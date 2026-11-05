import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_LANG,
  SUPPORTED,
  applyMeta,
  detectInitialLanguage,
  t as translate,
} from "../lib/i18nCore";

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG);
  const [bundle, setBundle] = useState(null);
  const [ready, setReady] = useState(false);

  const loadBundle = useCallback(async (code) => {
    const res = await fetch(`/assets/i18n/${code}.json`);
    if (!res.ok) throw new Error(`i18n load failed: ${code}`);
    return res.json();
  }, []);

  const setLanguage = useCallback(
    async (next) => {
      const code = SUPPORTED.includes(next) ? next : DEFAULT_LANG;
      const data = await loadBundle(code);
      setBundle(data);
      setLangState(code);
      applyMeta(data, code);
    },
    [loadBundle]
  );

  useEffect(() => {
    const initial = detectInitialLanguage();
    setLanguage(initial).finally(() => setReady(true));
  }, [setLanguage]);

  const t = useCallback(
    (key, vars) => {
      let value = translate(bundle, key);
      if (typeof value !== "string") return value;
      value = value.replace(/\{year\}/g, String(new Date().getFullYear()));
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          value = value.replace(new RegExp(`\\{${k}\\}`, "g"), v);
        });
      }
      return value;
    },
    [bundle]
  );

  const value = useMemo(
    () => ({ lang, bundle, ready, t, setLanguage }),
    [lang, bundle, ready, t, setLanguage]
  );

  if (!ready) {
    return (
      <div className="boot-screen" aria-live="polite">
        <span className="boot-screen__mark" aria-hidden="true" />
      </div>
    );
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
