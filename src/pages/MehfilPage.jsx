import { Link } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { MEHFIL_SCHEDULE } from "../lib/mehfilEvent";
import { CLINIC_WHATSAPP } from "../lib/contactInfo";
import { SITE_IMAGES } from "../lib/siteImagery";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InnerPageHero } from "../components/InnerPageHero";
import { Button } from "../components/Button";

export default function MehfilPage() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.05 });

  usePageMeta({
    title: t("pages.mehfil.documentTitle"),
    description: t("pages.mehfil.metaDescription"),
    pathname: "/events/mehfil",
    breadcrumb: [
      { name: t("nav.home"), item: "/" },
      { name: t("pages.mehfil.breadcrumbCurrent") },
    ],
  });

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page">
        <InnerPageHero kicker={t("pages.mehfil.kicker")} title={t("pages.mehfil.title")} lead={t("pages.mehfil.lead")} />
        <article className="section section--paper detail-article" ref={ref}>
          <div className="shell detail-article__inner">
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("pages.mehfil.breadcrumbCurrent") },
              ]}
            />
            <div className="detail-article__layout">
              <div className="detail-article__media" data-reveal-item>
                <div className="product-detail__figure">
                  <img src={SITE_IMAGES.education} alt={t("pages.mehfil.imageAlt")} loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="detail-article__body">
                <section data-reveal-item>
                  <h2>{t("pages.mehfil.scheduleHeading")}</h2>
                  <p>
                    {t("pages.mehfil.scheduleText", {
                      week: String(MEHFIL_SCHEDULE.weekOfMonth),
                    })}
                  </p>
                  <p className="mehfil-date-placeholder">{t("pages.mehfil.upcomingDate")}</p>
                </section>
                <section data-reveal-item>
                  <h3>{t("pages.mehfil.aboutHeading")}</h3>
                  <p>{t("pages.mehfil.aboutText")}</p>
                </section>
                <section data-reveal-item>
                  <h3>{t("pages.mehfil.participateHeading")}</h3>
                  <p>{t("pages.mehfil.participateText")}</p>
                  <div className="product-detail__actions">
                    <Button as={Link} to="/contact">
                      {t("pages.mehfil.cta")}
                    </Button>
                    <Button as="a" variant="ghost" href={`https://wa.me/${CLINIC_WHATSAPP}`} rel="noopener noreferrer">
                      {t("home.hero.whatsapp")}
                    </Button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </article>
      </main>
    </PublicLayout>
  );
}
