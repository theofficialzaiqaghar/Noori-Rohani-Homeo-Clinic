import { Link } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { HOMEOPATHY_SERVICES } from "../lib/homeopathyServiceData";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InnerPageHero } from "../components/InnerPageHero";
import { Icon } from "../components/Icon";
import { SectionVisual } from "../components/SectionVisual";
import { Button } from "../components/Button";

export default function ServicesHubHomeopathyPage() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.04 });

  usePageMeta({
    title: t("pages.homeopathy.hub.documentTitle"),
    description: t("pages.homeopathy.hub.metaDescription"),
    pathname: "/services/homeopathy",
    breadcrumb: [
      { name: t("nav.home"), item: "/" },
      { name: t("pages.services.index.breadcrumbCurrent"), item: "/services" },
      { name: t("pages.homeopathy.hub.breadcrumbCurrent") },
    ],
  });

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page">
        <InnerPageHero
          kicker={t("pages.homeopathy.hub.kicker")}
          title={t("pages.homeopathy.hub.title")}
          lead={t("pages.homeopathy.hub.lead")}
        />
        <section className="section section--paper" aria-labelledby="homeopathy-hub-grid-title">
          <div className="shell" ref={ref}>
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("pages.services.index.breadcrumbCurrent"), href: "/services" },
                { label: t("pages.homeopathy.hub.breadcrumbCurrent") },
              ]}
            />
            <h2 id="homeopathy-hub-grid-title" className="visually-hidden">
              {t("pages.homeopathy.hub.gridHeading")}
            </h2>
            <div className="services-grid services-grid--hub">
              {HOMEOPATHY_SERVICES.map((item) => (
                <Link
                  key={item.slug}
                  to={`/services/homeopathy/${item.slug}`}
                  className="service-card service-card--hub"
                  data-reveal-item
                >
                  <span className="service-card__icon" aria-hidden="true">
                    <Icon name={item.icon} />
                  </span>
                  <h3 className="service-card__title">{t(`pages.homeopathy.items.${item.slug}.title`)}</h3>
                  <p className="service-card__desc">{t(`pages.homeopathy.items.${item.slug}.summary`)}</p>
                  <span className="service-card__link">
                    {t("home.services.learnMore")}
                    <Icon name="icon-arrow-right" className="service-card__arrow" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="inner-page__cta-panel" data-reveal-item>
              <SectionVisual imageKey="homeopathy" alt={t("pages.homeopathy.hub.visualAlt")} className="inner-page__visual" />
              <div>
                <h2 className="section-head__title">{t("pages.homeopathy.hub.approachTitle")}</h2>
                <p className="split-section__lede">{t("pages.homeopathy.hub.approachText")}</p>
                <Button as={Link} to="/contact">
                  {t("btn.bookAppointment")}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
