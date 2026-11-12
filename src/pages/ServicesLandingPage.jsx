import { Link } from "react-router-dom";
import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { InnerPageHero } from "../components/InnerPageHero";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SectionVisual } from "../components/SectionVisual";
import { Button } from "../components/Button";
import { ServiceGrid } from "../components/services/ServiceGrid";
import { AppointmentCTA } from "../components/services/AppointmentCTA";
import { PageFAQ } from "../components/services/PageFAQ";
import { CLINICAL_SERVICES, SERVICE_HUB_LINKS } from "../lib/servicesCatalog";

const PROCESS_STEPS = ["one", "two", "three"];
const WHY_KEYS = ["one", "two", "three", "four"];

export default function ServicesLandingPage() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.04 });
  const processRef = useReveal({ childSelector: "[data-reveal-item]" });
  const whyRef = useReveal({ childSelector: "[data-reveal-item]" });

  usePageMeta({
    title: t("pages.services.index.documentTitle"),
    description: t("pages.services.index.metaDescription"),
    pathname: "/services",
    breadcrumb: [
      { name: t("nav.home"), item: "/" },
      { name: t("pages.services.index.breadcrumbCurrent") },
    ],
  });

  const clinicalCards = CLINICAL_SERVICES.map((item) => ({
    id: item.id,
    href: item.href,
    icon: item.icon,
    title: t(item.titleKey),
    description: t(item.summaryKey),
  }));

  const hubCards = SERVICE_HUB_LINKS.map((item) => ({
    id: item.id,
    href: item.href,
    icon: item.icon,
    title: t(item.titleKey),
    description: t(item.summaryKey),
  }));

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page services-landing">
        <InnerPageHero
          kicker={t("pages.services.index.kicker")}
          title={t("pages.services.index.title")}
          lead={t("pages.services.index.lead")}
          actions={
            <>
              <Button as={Link} to="/contact">
                {t("btn.bookAppointment")}
              </Button>
              <Button as={Link} to="/services/homeopathy" variant="ghost">
                {t("pages.services.index.heroSecondary")}
              </Button>
            </>
          }
        />

        <section className="section section--paper" aria-labelledby="services-intro-title">
          <div className="shell services-landing__intro" ref={ref}>
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("pages.services.index.breadcrumbCurrent") },
              ]}
            />
            <div className="services-landing__intro-grid">
              <div data-reveal-item>
                <p className="section-head__kicker">{t("pages.services.index.intro.label")}</p>
                <h2 id="services-intro-title" className="section-head__title">
                  {t("pages.services.index.intro.title")}
                </h2>
                <p className="split-section__lede">{t("pages.services.index.intro.lede")}</p>
                <p>{t("pages.services.index.intro.body")}</p>
              </div>
              <SectionVisual
                imageKey="homeopathy"
                alt={t("pages.services.index.intro.imageAlt")}
                className="inner-page__visual services-landing__visual"
                data-reveal-item
              />
            </div>
          </div>
        </section>

        <section className="section section--sand" aria-labelledby="services-hubs-title">
          <div className="shell">
            <header className="section-head section-head--center section-head--wide" data-reveal-item>
              <p className="section-head__kicker">{t("pages.services.index.hubs.label")}</p>
              <h2 id="services-hubs-title" className="section-head__title">
                {t("pages.services.index.hubs.title")}
              </h2>
              <p className="section-head__lede section-head__lede--center">{t("pages.services.index.hubs.lede")}</p>
            </header>
            <div ref={ref}>
              <ServiceGrid
                items={hubCards}
                learnMore={t("home.services.learnMore")}
                className="services-grid services-grid--hub"
              />
            </div>
          </div>
        </section>

        <section className="section section--paper" aria-labelledby="services-all-title">
          <div className="shell">
            <header className="section-head section-head--center section-head--wide" data-reveal-item>
              <p className="section-head__kicker">{t("pages.services.index.catalog.label")}</p>
              <h2 id="services-all-title" className="section-head__title">
                {t("pages.services.index.catalog.title")}
              </h2>
              <p className="section-head__lede section-head__lede--center">{t("pages.services.index.catalog.lede")}</p>
            </header>
            <div ref={ref}>
              <ServiceGrid
                items={clinicalCards}
                learnMore={t("home.services.learnMore")}
                className="services-grid services-grid--dense"
              />
            </div>
          </div>
        </section>

        <section className="section section--ink why-choose-band" aria-labelledby="why-choose-title">
          <div className="shell" ref={whyRef}>
            <header className="section-head section-head--center" data-reveal-item>
              <p className="section-head__kicker section-head__kicker--light">{t("pages.services.index.why.label")}</p>
              <h2 id="why-choose-title" className="section-head__title section-head__title--light">
                {t("pages.services.index.why.title")}
              </h2>
              <p className="section-head__lede section-head__lede--center section-head__lede--light">
                {t("pages.services.index.why.lede")}
              </p>
            </header>
            <ul className="why-choose-grid">
              {WHY_KEYS.map((key) => (
                <li key={key} className="why-choose-card" data-reveal-item>
                  <h3>{t(`pages.services.index.why.items.${key}.title`)}</h3>
                  <p>{t(`pages.services.index.why.items.${key}.text`)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section--line process-band" aria-labelledby="services-process-title">
          <div className="process-band__bg" aria-hidden="true" />
          <div className="shell process-band__inner" ref={processRef}>
            <header className="section-head section-head--center" data-reveal-item>
              <p className="section-head__kicker">{t("pages.services.index.process.label")}</p>
              <h2 id="services-process-title" className="section-head__title">
                {t("pages.services.index.process.title")}
              </h2>
            </header>
            <div className="process-steps">
              {PROCESS_STEPS.map((key, index) => (
                <article key={key} className="process-steps__item" data-reveal-item>
                  <span className="process-steps__num">{index + 1}</span>
                  <h3>{t(`pages.services.index.process.steps.${key}.title`)}</h3>
                  <p>{t(`pages.services.index.process.steps.${key}.text`)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PageFAQ prefix="pages.services.index.faq" keys={["one", "two", "three", "four", "five"]} id="services-faq-title" />

        <section className="section section--paper">
          <div className="shell">
            <AppointmentCTA />
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
