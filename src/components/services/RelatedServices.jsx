import { Link } from "react-router-dom";
import { useI18n } from "../../providers/I18nProvider";
import { Icon } from "../Icon";

/**
 * @param {{ items: { href: string, titleKey: string, summaryKey?: string }[], heading: string, className?: string }} props
 */
export function RelatedServices({ items, heading, className = "related-cards" }) {
  const { t } = useI18n();
  if (!items.length) return null;

  return (
    <section className={`${className} related-cards--highlight`} data-reveal-item aria-labelledby="related-services-heading">
      <header className="related-cards__head">
        <p className="related-cards__kicker">Explore more</p>
        <h3 id="related-services-heading" className="related-cards__heading">
          {heading}
        </h3>
      </header>
      <ul className="related-cards__list related-cards__list--rich">
        {items.map((item) => (
          <li key={item.href}>
            <Link to={item.href} className="related-cards__tile">
              <span className="related-cards__tile-copy">
                <strong className="related-cards__tile-title">{t(item.titleKey)}</strong>
                {item.summaryKey ? <span className="related-cards__tile-desc">{t(item.summaryKey)}</span> : null}
              </span>
              <span className="related-cards__tile-arrow" aria-hidden="true">
                <Icon name="icon-arrow-right" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="related-cards__back">
        <Link to="/services">{t("pages.services.index.backToAll")}</Link>
      </p>
    </section>
  );
}
