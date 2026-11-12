import { I18nProvider } from "../providers/I18nProvider";
import { SmoothScrollProvider } from "../providers/SmoothScrollProvider";
import { SiteSettingsProvider } from "../providers/SiteSettingsProvider";

/** Single app shell — avoids re-loading i18n and Lenis on every route change. */
export function AppProviders({ children }) {
  return (
    <I18nProvider>
      <SiteSettingsProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </SiteSettingsProvider>
    </I18nProvider>
  );
}
