import { Link } from "react-router-dom";
import { useI18n } from "../providers/I18nProvider";

export function Breadcrumbs({ items }) {
  const { t } = useI18n();
  if (!items?.length) return null;

  return (
    <nav className="breadcrumbs" aria-label={t("a11y.breadcrumbs")}>
      <ol className="breadcrumbs__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="breadcrumbs__item">
              {isLast || !item.href ? (
                <span className="breadcrumbs__current" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="breadcrumbs__link">
                  {item.label}
                </Link>
              )}
              {!isLast && <span className="breadcrumbs__sep" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
