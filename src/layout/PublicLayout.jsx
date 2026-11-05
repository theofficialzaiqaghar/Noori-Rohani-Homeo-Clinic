import { SkipLink } from "../components/SkipLink";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { BackToTop } from "../components/BackToTop";
import { I18nProvider } from "../providers/I18nProvider";
import { SmoothScrollProvider } from "../providers/SmoothScrollProvider";
import { SiteSettingsProvider } from "../providers/SiteSettingsProvider";

export function PublicLayout({ children, headerOverlay = false }) {
  return (
    <I18nProvider>
      <SiteSettingsProvider>
        <SmoothScrollProvider>
          <SkipLink />
          <SiteHeader overlay={headerOverlay} />
          {children}
          <SiteFooter />
          <BackToTop />
        </SmoothScrollProvider>
      </SiteSettingsProvider>
    </I18nProvider>
  );
}
