import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";
import { Icon } from "../components/Icon";
import { Button } from "../components/Button";
import { SERVICE_ITEMS } from "../lib/serviceItems";

function ServiceCardLink({ href, className, children, ...rest }) {
  const internal = href.startsWith("/") && !href.startsWith("//");
  if (internal) {
    return (
      <Link to={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

export function ServicesSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.04 });

  return (
    <section id="services" className="section section--paper services-section" aria-labelledby="services-title">
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

        <div className="services-grid">
          {SERVICE_ITEMS.map((item) => (
            <ServiceCardLink key={item.id} href={item.href} className="service-card" data-reveal-item>
              <span className="service-card__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
              <h3 className="service-card__title">{t(`home.services.items.${item.key}.title`)}</h3>
              <p className="service-card__desc">{t(`home.services.items.${item.key}.desc`)}</p>
              <span className="service-card__link">
                {t("home.services.learnMore")}
                <Icon name="icon-arrow-right" className="service-card__arrow" />
              </span>
            </ServiceCardLink>
          ))}
        </div>
        <p className="services-section__all" data-reveal-item>
          <Button as={Link} to="/services" variant="ghost">
            {t("pages.services.index.viewAll")}
          </Button>
        </p>
      </div>
    </section>
  );
}
