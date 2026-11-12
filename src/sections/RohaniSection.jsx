import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";
import { Button } from "../components/Button";
import { SectionVisual } from "../components/SectionVisual";

const ITEMS = ["nazar", "jadu", "bandish", "rishton", "beAulaadi", "berozgari", "asraat"];

export function RohaniSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]" });

  return (
    <section id="rohani" className="section section--ink split-section split-section--dark" aria-labelledby="rohani-title">
      <div className="shell split-section__grid split-section__grid--reverse" ref={ref}>
        <div className="split-section__visual" data-reveal-item>
          <SectionVisual imageKey="rohani" alt="" className="split-section__photo split-section__photo--glow" />
        </div>
        <div className="split-section__content">
          <p className="section-head__kicker section-head__kicker--light" data-reveal-item>
            {t("home.rohani.label")}
          </p>
          <h2 id="rohani-title" className="section-head__title section-head__title--light" data-reveal-item>
            {t("home.rohani.title")}
          </h2>
          <p className="split-section__lede split-section__lede--light" data-reveal-item>
            {t("home.rohani.text")}
          </p>
          <ul className="topic-list topic-list--light">
            {ITEMS.map((key) => (
              <li key={key} data-reveal-item>
                {t(`home.rohani.items.${key}`)}
              </li>
            ))}
          </ul>
          <Button as={Link} to="/contact" variant="light" data-reveal-item>
            {t("home.rohani.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
