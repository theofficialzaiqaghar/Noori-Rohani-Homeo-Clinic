import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InnerPageHero } from "../components/InnerPageHero";
import { SectionVisual } from "../components/SectionVisual";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export default function AboutPage() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.06 });

  usePageMeta({
    title: t("page.about.documentTitle"),
    description: t("page.about.metaDescription"),
    pathname: "/about",
    breadcrumb: [
      { name: t("nav.home"), item: "/" },
      { name: t("nav.about") },
    ],
  });

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page">
        <InnerPageHero kicker={t("home.aboutClinic.label")} title={t("home.aboutClinic.title")} lead={t("home.aboutClinic.text")} />
        <section className="section section--paper detail-article">
          <div className="shell detail-article__inner" ref={ref}>
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("nav.about") },
              ]}
            />
            <div className="detail-article__layout">
              <div className="detail-article__media" data-reveal-item>
                <SectionVisual imageKey="aboutFounder" alt={t("home.aboutClinic.imageAlt")} className="inner-page__visual" />
              </div>
              <div className="detail-article__body">
                <section data-reveal-item>
                  <h2>{t("home.homeo.title")}</h2>
                  <p>{t("home.homeo.text")}</p>
                </section>
                <section data-reveal-item>
                  <h2>{t("home.herbal.title")}</h2>
                  <p>{t("home.herbal.text")}</p>
                </section>
                <div className="detail-article__cta-row" data-reveal-item>
                  <Button as={Link} to="/contact">
                    {t("btn.bookAppointment")}
                  </Button>
                  <Button as={Link} to="/services/homeopathy" variant="ghost">
                    {t("home.homeopathySection.viewAll")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
