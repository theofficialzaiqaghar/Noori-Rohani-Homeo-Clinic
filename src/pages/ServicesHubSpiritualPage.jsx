import { Link } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { SPIRITUAL_SERVICES } from "../lib/spiritualServiceData";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InnerPageHero } from "../components/InnerPageHero";
import { Icon } from "../components/Icon";
import { SectionVisual } from "../components/SectionVisual";
import { Button } from "../components/Button";

export default function ServicesHubSpiritualPage() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.04 });

  usePageMeta({
    title: t("pages.spiritual.hub.documentTitle"),
    description: t("pages.spiritual.hub.metaDescription"),
    pathname: "/services/spiritual",
    breadcrumb: [
      { name: t("nav.home"), item: "/" },
      { name: t("pages.services.index.breadcrumbCurrent"), item: "/services" },
      { name: t("pages.spiritual.hub.breadcrumbCurrent") },
    ],
  });

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page">
        <InnerPageHero
          kicker={t("pages.spiritual.hub.kicker")}
          title={t("pages.spiritual.hub.title")}
          lead={t("pages.spiritual.hub.lead")}
        />
        <section className="section section--paper" aria-labelledby="spiritual-hub-title">
          <div className="shell" ref={ref}>
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("pages.services.index.breadcrumbCurrent"), href: "/services" },
                { label: t("pages.spiritual.hub.breadcrumbCurrent") },
              ]}
            />
            <h2 id="spiritual-hub-title" className="visually-hidden">
              {t("pages.spiritual.hub.gridHeading")}
            </h2>
            <div className="services-grid services-grid--hub">
              {SPIRITUAL_SERVICES.map((item) => (
                <Link
                  key={item.slug}
                  to={`/services/spiritual/${item.slug}`}
                  className="service-card service-card--hub"
                  data-reveal-item
                >
                  <span className="service-card__icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <h3 className="service-card__title">{t(`pages.spiritual.items.${item.slug}.title`)}</h3>
                  <p className="service-card__desc">{t(`pages.spiritual.items.${item.slug}.summary`)}</p>
                  <span className="service-card__link">
                    {t("home.services.learnMore")}
                    <Icon name="icon-arrow-right" className="service-card__arrow" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="inner-page__cta-panel inner-page__cta-panel--reverse" data-reveal-item>
              <div>
                <h2 className="section-head__title">{t("pages.spiritual.hub.noteTitle")}</h2>
                <p className="split-section__lede">{t("pages.spiritual.hub.noteText")}</p>
                <Button as={Link} to="/contact">
                  {t("pages.spiritual.hub.cta")}
                </Button>
              </div>
              <SectionVisual imageKey="rohani" alt={t("pages.spiritual.hub.visualAlt")} className="inner-page__visual" />
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
