import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";
import { Button } from "../components/Button";
import { SITE_IMAGES } from "../lib/siteImagery";

export function AboutSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]" });

  return (
    <section id="homeo" className="section section--sand split-section about-section" aria-labelledby="about-clinic-title">
      <div className="shell split-section__grid" ref={ref}>
        <div className="split-section__visual" data-reveal-item>
          <div className="split-section__photo about-section__photo">
            <img src={SITE_IMAGES.aboutFounder} alt={t("home.aboutClinic.imageAlt")} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="split-section__content">
          <p className="section-head__kicker" data-reveal-item>
            {t("home.aboutClinic.label")}
          </p>
          <h2 id="about-clinic-title" className="section-head__title" data-reveal-item>
            {t("home.aboutClinic.title")}
          </h2>
          <p className="split-section__lede" data-reveal-item>
            {t("home.aboutClinic.text")}
          </p>
          <Button as="a" href="#contact" data-reveal-item>
            {t("btn.bookAppointment")}
          </Button>
        </div>
      </div>
    </section>
  );
}
