import { Link } from "react-router-dom";
import { useI18n } from "../../providers/I18nProvider";
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_E164, CLINIC_WHATSAPP } from "../../lib/clinicInfo";
import { Button } from "../Button";

/**
 * @param {{ title?: string, lede?: string, className?: string }} props
 */
export function AppointmentCTA({ title, lede, className = "inner-page__cta-panel services-cta-panel" }) {
  const { t } = useI18n();
  const telHref = `tel:${CLINIC_PHONE_E164.replace(/\s/g, "")}`;
  const waHref = `https://wa.me/${CLINIC_WHATSAPP}`;
  const heading = title ?? t("pages.services.index.cta.title");
  const text = lede ?? t("pages.services.index.cta.lede");

  return (
    <div className={className} data-reveal-item>
      <div className="services-cta-panel__copy">
        <h2 className="section-head__title">{heading}</h2>
        <p className="split-section__lede">{text}</p>
        <p className="services-cta-panel__phone">
          <a href={telHref}>{CLINIC_PHONE_DISPLAY}</a>
        </p>
      </div>
      <div className="services-cta-panel__actions">
        <Button as={Link} to="/contact">
          {t("btn.bookAppointment")}
        </Button>
        <Button as="a" variant="ghost" href={waHref} rel="noopener noreferrer">
          {t("footer.cta.whatsapp")}
        </Button>
      </div>
    </div>
  );
}
