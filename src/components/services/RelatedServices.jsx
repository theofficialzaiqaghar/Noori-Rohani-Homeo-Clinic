import { Link } from "react-router-dom";
import { useI18n } from "../../providers/I18nProvider";

/**
 * @param {{ items: { href: string, titleKey: string, summaryKey?: string }[], heading: string, className?: string }} props
 */
export function RelatedServices({ items, heading, className = "related-cards" }) {
  const { t } = useI18n();
  if (!items.length) return null;

  return (
    <section className={className} data-reveal-item aria-labelledby="related-services-heading">
      <h3 id="related-services-heading">{heading}</h3>
      <ul className="related-cards__list related-cards__list--rich">
        {items.map((item) => (
          <li key={item.href}>
            <Link to={item.href} className="related-cards__tile">
              <span className="related-cards__tile-title">{t(item.titleKey)}</span>
              {item.summaryKey ? <span className="related-cards__tile-desc">{t(item.summaryKey)}</span> : null}
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
