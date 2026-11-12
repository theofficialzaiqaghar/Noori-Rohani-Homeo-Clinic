import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";
import { SPIRITUAL_SERVICE_SLUGS } from "../lib/spiritualServiceData";
import { Icon } from "../components/Icon";
import { SectionVisual } from "../components/SectionVisual";
import { Button } from "../components/Button";

const PREVIEW = SPIRITUAL_SERVICE_SLUGS.slice(0, 6);

export function SpiritualServicesHubSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.04 });

  return (
    <section id="spiritual-services" className="section section--sand" aria-labelledby="spiritual-services-title">
      <div className="shell spiritual-hub-section" ref={ref}>
        <div className="spiritual-hub-section__intro">
          <header className="section-head section-head--wide">
            <p className="section-head__kicker" data-reveal-item>
              {t("home.spiritualHub.label")}
            </p>
            <h2 id="spiritual-services-title" className="section-head__title" data-reveal-item>
              {t("home.spiritualHub.title")}
            </h2>
            <p className="section-head__lede" data-reveal-item>
              {t("home.spiritualHub.lead")}
            </p>
            <Button as={Link} to="/services/spiritual" data-reveal-item>
              {t("home.spiritualHub.viewAll")}
            </Button>
          </header>
          <div className="spiritual-hub-section__visual" data-reveal-item>
            <SectionVisual imageKey="rohani" alt={t("home.spiritualHub.imageAlt")} className="split-section__photo" />
          </div>
        </div>
        <ul className="spiritual-hub-section__grid">
          {PREVIEW.map((slug) => (
            <li key={slug} data-reveal-item>
              <Link to={`/services/spiritual/${slug}`} className="spiritual-hub-section__card">
                <span className="spiritual-hub-section__icon" aria-hidden="true">
                  <Icon name="icon-star" />
                </span>
                <h3 className="spiritual-hub-section__card-title">{t(`pages.spiritual.items.${slug}.title`)}</h3>
                <p className="spiritual-hub-section__card-desc">{t(`pages.spiritual.items.${slug}.summary`)}</p>
                <span className="spiritual-hub-section__card-link">
                  {t("home.services.learnMore")}
                  <Icon name="icon-arrow-right" className="service-card__arrow" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
