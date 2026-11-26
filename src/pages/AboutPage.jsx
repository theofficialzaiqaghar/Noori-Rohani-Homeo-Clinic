import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InnerPageHero } from "../components/InnerPageHero";
import { SectionVisual } from "../components/SectionVisual";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { FOUNDER } from "../lib/founderProfile";

export default function AboutPage() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.05 });

  usePageMeta({
    title: `${FOUNDER.name} | Noori Roohani Homeo Clinic`,
    description: FOUNDER.homeBlurb,
    pathname: "/about",
    breadcrumb: [
      { name: t("nav.home"), item: "/" },
      { name: t("nav.about") },
    ],
  });

  return (
    <PublicLayout>
      <main id="main" tabIndex={-1} className="inner-page">
        <InnerPageHero
          kicker="Founder"
          title={FOUNDER.name}
          lead={FOUNDER.title}
          chips={FOUNDER.chips}
        />
        <section className="section section--paper detail-article">
          <div className="shell detail-article__inner" ref={ref}>
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("nav.about") },
              ]}
            />
            <div className="detail-article__layout founder-layout">
              <div className="detail-article__media" data-reveal-item>
                <SectionVisual imageKey="aboutFounder" alt={FOUNDER.name} className="inner-page__visual" />
              </div>
              <div className="detail-article__body founder-bio">
                <section data-reveal-item>
                  <h2>{FOUNDER.journeyTitle}</h2>
                  {FOUNDER.intro.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </section>

                {FOUNDER.sections.map((section) => (
                  <section key={section.title} className="founder-block" data-reveal-item>
                    <h3 className="founder-block__title">{section.title}</h3>
                    {section.paragraphs.map((p) => (
                      <p key={p.slice(0, 48)} className="founder-block__text">
                        {p}
                      </p>
                    ))}
                  </section>
                ))}

                <div className="detail-article__cta-row" data-reveal-item>
                  <Button as={Link} to="/contact">
                    {t("btn.bookAppointment")}
                  </Button>
                  <Button as={Link} to="/services" variant="ghost">
                    View services
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
