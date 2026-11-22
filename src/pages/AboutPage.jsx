import { PublicLayout } from "../layout/PublicLayout";
import { useI18n } from "../providers/I18nProvider";
import { useReveal } from "../hooks/useReveal";
import { usePageMeta } from "../hooks/usePageMeta";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { InnerPageHero } from "../components/InnerPageHero";
import { SectionVisual } from "../components/SectionVisual";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { FOUNDER, RESEARCH_COUNCIL } from "../lib/founderProfile";

function FounderList({ title, items }) {
  if (!items?.length) return null;
  return (
    <section className="founder-block" data-reveal-item>
      <h3 className="founder-block__title">{title}</h3>
      <ul className="founder-block__list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function AboutPage() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.05 });

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
        <InnerPageHero
          kicker="Founder"
          title={FOUNDER.name}
          lead={FOUNDER.title}
          chips={["Ph.D. Islamic Studies", "DHMS", "Homeopathic Council", "Research Council", "Sheikh-e-Tareeqat"]}
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
                <SectionVisual imageKey="aboutFounder" alt={t("home.aboutClinic.imageAlt")} className="inner-page__visual" />
                <div className="founder-card" data-reveal-item>
                  <p className="founder-card__kicker">Personal information</p>
                  <p>
                    <strong>{FOUNDER.personal.address}</strong>
                  </p>
                  <p>Domicile: {FOUNDER.personal.domicile}</p>
                  <p>
                    Gender: {FOUNDER.personal.gender} · DOB: {FOUNDER.personal.dateOfBirth} ·{" "}
                    {FOUNDER.personal.nationality}
                  </p>
                </div>
              </div>
              <div className="detail-article__body">
                <section data-reveal-item>
                  <h2>About the founder</h2>
                  <p>{FOUNDER.homeBlurb}</p>
                </section>
                <FounderList title="Current roles & responsibilities" items={FOUNDER.roles} />
                <FounderList title="Work experience" items={FOUNDER.workExperience} />
                <FounderList title="Educational qualification" items={FOUNDER.education} />
                <FounderList title="Personal certificates & diplomas" items={FOUNDER.certificates} />
                <FounderList title="Media discourses delivered" items={FOUNDER.media} />
                <FounderList title="Literary achievements" items={FOUNDER.literary} />
                <FounderList title="Publications" items={FOUNDER.publications} />
                <FounderList title="Special recognition" items={FOUNDER.highlights} />
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

        <section className="section section--sand research-council" aria-labelledby="research-council-title">
          <div className="shell research-council__inner" data-reveal-item>
            <p className="section-head__kicker">{RESEARCH_COUNCIL.title}</p>
            <h2 id="research-council-title" className="section-head__title">
              {RESEARCH_COUNCIL.person}
            </h2>
            <p className="research-council__role">{RESEARCH_COUNCIL.role}</p>
            {RESEARCH_COUNCIL.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="research-council__text">
                {p}
              </p>
            ))}
            <Button as={Link} to="/services/spiritual/international-research-center">
              View International Research Council
            </Button>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
