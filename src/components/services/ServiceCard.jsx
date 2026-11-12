import { Link } from "react-router-dom";
import { Icon } from "../Icon";

/**
 * @param {{ to: string, icon?: string, title: string, description: string, learnMore: string, className?: string }} props
 */
export function ServiceCard({ to, icon, title, description, learnMore, className = "", ...rest }) {
  const classes = ["service-card", className].filter(Boolean).join(" ");
  return (
    <Link to={to} className={classes} {...rest}>
      {icon ? (
        <span className="service-card__icon" aria-hidden="true">
          <Icon name={icon} />
        </span>
      ) : null}
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{description}</p>
      <span className="service-card__link">
        {learnMore}
        <Icon name="icon-arrow-right" className="service-card__arrow" />
      </span>
    </Link>
  );
}
