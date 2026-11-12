import { SkipLink } from "../components/SkipLink";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { BackToTop } from "../components/BackToTop";

export function PublicLayout({ children, headerOverlay = false }) {
  return (
    <>
      <SkipLink />
      <SiteHeader overlay={headerOverlay} />
      {children}
      <SiteFooter />
      <BackToTop />
    </>
  );
}
