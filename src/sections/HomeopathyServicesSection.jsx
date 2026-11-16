import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";
import { HOMEOPATHY_SERVICES } from "../lib/homeopathyServiceData";
import { Icon } from "../components/Icon";
import { SectionVisual } from "../components/SectionVisual";
import { Button } from "../components/Button";

const PREVIEW = HOMEOPATHY_SERVICES.slice(0, 6);

export function HomeopathyServicesSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.04 });

  return (
    <section id="homeopathy-services" className="section section--paper" aria-labelledby="homeopathy-services-title">
      <div className="shell homeopathy-services" ref={ref}>
        <div className="homeopathy-services__intro">
          <header className="section-head section-head--split">
            <p className="section-head__kicker" data-reveal-item>
              {t("home.homeopathySection.label")}
            </p>
            <h2 id="homeopathy-services-title" className="section-head__title" data-reveal-item>
              {t("home.homeopathySection.title")}
            </h2>
            <p className="section-head__lede" data-reveal-item>
              {t("home.homeopathySection.lead")}
            </p>
            <Button as={Link} to="/services/homeopathy" data-reveal-item>
              {t("home.homeopathySection.viewAll")}
            </Button>
          </header>
          <div className="homeopathy-services__visual" data-reveal-item>
            <SectionVisual imageKey="homeopathy" alt={t("home.homeopathySection.imageAlt")} className="split-section__photo" />
          </div>
        </div>
        <ul className="homeopathy-services__grid">
          {PREVIEW.map((item) => (
            <li key={item.slug} data-reveal-item>
              <Link to={`/services/homeopathy/${item.slug}`} className="homeopathy-services__card">
                <span className="homeopathy-services__icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <h3 className="homeopathy-services__card-title">{t(`pages.homeopathy.items.${item.slug}.title`)}</h3>
                <p className="homeopathy-services__card-desc">{t(`pages.homeopathy.items.${item.slug}.summary`)}</p>
                <span className="homeopathy-services__card-link">
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
