import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";
import { Button } from "../components/Button";
import { SITE_IMAGES } from "../lib/siteImagery";
import { FOUNDER } from "../lib/founderProfile";

export function AboutSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]" });

  return (
    <section id="about" className="section section--sand split-section about-section" aria-labelledby="about-clinic-title">
      <div className="shell split-section__grid" ref={ref}>
        <div className="split-section__visual" data-reveal-item>
          <div className="split-section__photo about-section__photo">
            <img src={SITE_IMAGES.aboutFounder} alt={FOUNDER.name} loading="eager" decoding="async" />
          </div>
        </div>
        <div className="split-section__content">
          <p className="section-head__kicker" data-reveal-item>
            Founder
          </p>
          <h2 id="about-clinic-title" className="section-head__title" data-reveal-item>
            {FOUNDER.name}
          </h2>
          <p className="about-section__role" data-reveal-item>
            <strong>{FOUNDER.title}</strong>
          </p>
          <p className="split-section__lede" data-reveal-item>
            {FOUNDER.homeBlurb}
          </p>
          <ul className="about-section__chips" data-reveal-item>
            {FOUNDER.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <div className="about-section__actions" data-reveal-item>
            <Button as={Link} to="/about">
              Read full biography
            </Button>
            <Button as={Link} to="/contact" variant="ghost">
              {t("btn.bookAppointment")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
