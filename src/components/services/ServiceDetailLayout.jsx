import { Link } from "react-router-dom";
import { useI18n } from "../../providers/I18nProvider";
import { useReveal } from "../../hooks/useReveal";
import { Breadcrumbs } from "../Breadcrumbs";
import { SectionVisual } from "../SectionVisual";
import { Button } from "../Button";
import { AppointmentCTA } from "./AppointmentCTA";
import { PageFAQ } from "./PageFAQ";
import { RelatedServices } from "./RelatedServices";
import { SERVICES_BREADCRUMB_INDEX } from "../../lib/servicesCatalog";

/**
 * Shared layout for homeopathy and spiritual service detail pages.
 *
 * @param {{
 *   category: 'homeopathy' | 'spiritual',
 *   slug: string,
 *   imageKey: string,
 *   relatedItems: { href: string, titleKey: string, summaryKey?: string }[],
 * }} props
 */
export function ServiceDetailLayout({ category, slug, imageKey, relatedItems }) {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.05 });
  const item = `pages.${category}.items.${slug}`;
  const detail = `pages.${category}.detail`;
  const hubHref = `/services/${category}`;
  const hubLabel =
    category === "homeopathy"
      ? t("pages.homeopathy.hub.breadcrumbCurrent")
      : t("pages.spiritual.hub.breadcrumbCurrent");

  const faqPrefix = `${item}.faq`;

  return (
    <article className="section section--paper detail-article detail-article--full" ref={ref}>
      <div className="shell detail-article__inner">
        <Breadcrumbs
          items={[
            { label: t("nav.home"), href: "/" },
            { label: t(SERVICES_BREADCRUMB_INDEX.labelKey), href: SERVICES_BREADCRUMB_INDEX.href },
            { label: hubLabel, href: hubHref },
            { label: t(`${item}.title`) },
          ]}
        />
        <div className="detail-article__layout">
          <div className="detail-article__media" data-reveal-item>
            <SectionVisual imageKey={imageKey} alt={t(`${item}.imageAlt`)} className="inner-page__visual" />
          </div>
          <div className="detail-article__body">
            <section data-reveal-item>
              <h2>{t(`${detail}.overviewHeading`)}</h2>
              <p>{t(`${item}.overview`)}</p>
            </section>
            <section data-reveal-item>
              <h3>{t(`${detail}.whoBenefitsHeading`)}</h3>
              <p>{t(`${item}.whoBenefits`)}</p>
            </section>
            <section data-reveal-item>
              <h3>{category === "homeopathy" ? t(`${detail}.approachHeading`) : t(`${detail}.whatHeading`)}</h3>
              <p>{category === "homeopathy" ? t(`${item}.approach`) : t(`${item}.whatToExpect`)}</p>
            </section>
            <section data-reveal-item>
              <h3>{t(`${detail}.benefitsHeading`)}</h3>
              <p>{t(`${item}.benefits`)}</p>
            </section>
            <section data-reveal-item>
              <h3>{category === "homeopathy" ? t(`${detail}.consultHeading`) : t(`${detail}.contactHeading`)}</h3>
              <p>{category === "homeopathy" ? t(`${item}.consult`) : t(`${item}.contactNote`)}</p>
              <div className="detail-article__cta-row">
                <Button as={Link} to="/contact" className="detail-article__cta">
                  {category === "homeopathy" ? t("btn.bookAppointment") : t(`${detail}.contactCta`)}
                </Button>
                <Button as={Link} to={hubHref} variant="ghost">
                  {t("pages.services.index.backToCategory").replace("{category}", hubLabel)}
                </Button>
              </div>
            </section>
            <RelatedServices items={relatedItems} heading={t(`${detail}.relatedHeading`)} />
          </div>
        </div>
        <PageFAQ
          prefix={faqPrefix}
          keys={["one", "two", "three"]}
          title={t(`${detail}.faqHeading`)}
          kicker={t(`${detail}.faqLabel`)}
          id={`faq-${category}-${slug}`}
          className="section section--line detail-article__faq"
        />
        <AppointmentCTA
          title={t(`${detail}.finalCtaTitle`)}
          lede={t(`${detail}.finalCtaLede`)}
          className="inner-page__cta-panel services-cta-panel services-cta-panel--compact"
        />
      </div>
    </article>
  );
}
