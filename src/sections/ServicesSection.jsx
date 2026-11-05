import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";
import { Icon } from "../components/Icon";
import { SERVICE_ITEMS } from "../lib/serviceItems";

export function ServicesSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.04 });

  return (
    <section id="about" className="section section--paper services-section" aria-labelledby="services-title">
      <div className="shell" ref={ref}>
        <header className="section-head section-head--center section-head--wide">
          <p className="section-head__kicker" data-reveal-item>
            {t("home.services.label")}
          </p>
          <h2 id="services-title" className="section-head__title" data-reveal-item>
            {t("home.services.title")}
          </h2>
          <p className="section-head__lede section-head__lede--center" data-reveal-item>
            {t("home.services.lead")}
          </p>
        </header>

        <div id="services" className="services-grid">
          {SERVICE_ITEMS.map((item) => (
            <a key={item.id} href={item.href} className="service-card" data-reveal-item>
              <span className="service-card__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <h3 className="service-card__title">{t(`home.services.items.${item.key}.title`)}</h3>
              <p className="service-card__desc">{t(`home.services.items.${item.key}.desc`)}</p>
              <span className="service-card__link">
                {t("home.services.learnMore")}
                <Icon name="icon-arrow-right" className="service-card__arrow" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
