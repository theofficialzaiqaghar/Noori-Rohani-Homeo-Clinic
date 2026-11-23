import { useI18n } from "../providers/I18nProvider";
import { usePageMeta } from "../hooks/usePageMeta";
import { PublicLayout } from "../layout/PublicLayout";
import { ContactForm } from "../components/ContactForm";
import { ContactDetails } from "../components/ContactDetails";
import { useReveal } from "../hooks/useReveal";
import { CLINIC_MAP_EMBED_SRC, CLINIC_MAP_URL, CLINIC_NAME } from "../lib/clinicInfo";
import { Button } from "../components/Button";

export default function ContactPage() {
  return (
    <PublicLayout>
      <ContactPageMain />
    </PublicLayout>
  );
}

function ContactPageMain() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]" });

  usePageMeta({
    title: t("page.contact.documentTitle"),
    description: t("page.contact.metaDescription") || t("meta.description"),
    pathname: "/contact",
    type: "website",
    breadcrumb: [
      { name: t("nav.home"), item: "/" },
      { name: t("nav.contact") },
    ],
  });

  return (
    <main id="main" tabIndex={-1} className="contact-page">
      <section className="contact-page-hero" aria-labelledby="contact-page-title">
        <div className="shell contact-page-hero__inner">
          <p className="contact-page-hero__kicker">{t("page.contact.heroKicker")}</p>
          <h1 id="contact-page-title">{t("page.contact.heroTitle")}</h1>
          <p className="contact-page-hero__clinic">{CLINIC_NAME}</p>
          <p className="contact-page-hero__lede">{t("page.contact.heroLead")}</p>
        </div>
      </section>

      <section className="section section--paper contact-page__body" aria-labelledby="contact-form-heading">
        <div className="shell contact-page__grid" ref={ref}>
          <div className="contact-page__info" data-reveal-item>
            <h2 id="contact-form-heading" className="contact-page__heading">
              {t("home.contact.title")}
            </h2>
            <p className="contact-page__intro">{t("home.contact.lead")}</p>
            <ContactDetails variant="page" />
            <p className="contact-page__map-note">{t("page.contact.mapNote")}</p>
            <div className="contact-page__map-actions">
              <Button as="a" href={CLINIC_MAP_URL} rel="noopener noreferrer" variant="ghost">
                {t("page.contact.openMaps")}
              </Button>
            </div>
          </div>
          <div className="contact-page__form-wrap" data-reveal-item>
            <ContactForm idPrefix="contact-page-" className="contact-form--page" />
          </div>
        </div>
      </section>

      <section className="section section--sand contact-page__map-section" aria-labelledby="contact-map-heading">
        <div className="shell">
          <header className="contact-page__map-head" data-reveal-item>
            <h2 id="contact-map-heading" className="section-head__title">
              Find us on Google Maps
            </h2>
            <p className="split-section__lede">{t("page.contact.mapNote")}</p>
          </header>
          <div className="contact-page__map-embed" data-reveal-item>
            <iframe
              title={`${CLINIC_NAME} location on Google Maps`}
              src={CLINIC_MAP_EMBED_SRC}
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="contact-page__map-actions contact-page__map-actions--below">
            <Button as="a" href={CLINIC_MAP_URL} rel="noopener noreferrer">
              {t("page.contact.openMaps")}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
