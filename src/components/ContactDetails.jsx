import { useI18n } from "../providers/I18nProvider";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { CLINIC_EMAIL, CLINIC_PHONE_DISPLAY, CLINIC_PHONE_E164, CLINIC_WHATSAPP } from "../lib/contactInfo";

export function ContactDetails({ variant = "compact" }) {
  const { t } = useI18n();
  const isPage = variant === "page";

  if (!isPage) {
    return (
      <ul className="contact-grid__meta">
        <li>{t("home.contact.aside.phone")}</li>
        <li>{t("home.contact.aside.address")}</li>
        <li>{t("home.contact.aside.hours")}</li>
      </ul>
    );
  }

  const items = [
    {
      icon: "icon-phone",
      label: t("footer.contact.phoneLabel"),
      value: t("footer.contact.phone"),
      href: `tel:${CLINIC_PHONE_E164.replace(/\s/g, "")}`,
    },
    {
      icon: "icon-whatsapp",
      label: t("footer.contact.whatsappLabel"),
      value: CLINIC_PHONE_DISPLAY,
      href: `https://wa.me/${CLINIC_WHATSAPP}`,
      external: true,
    },
    {
      icon: "icon-email",
      label: t("footer.contact.emailLabel"),
      value: t("footer.contact.email"),
      href: `mailto:${CLINIC_EMAIL}`,
    },
    {
      icon: "icon-location",
      label: t("footer.contact.addressLabel"),
      value: t("footer.contact.address"),
    },
    {
      icon: "icon-clock",
      label: t("footer.contact.hoursLabel"),
      value: t("footer.contact.hours"),
    },
  ];

  return (
    <div className="contact-details">
      <ul className="contact-details__list">
        {items.map((item) => (
          <li key={item.label} className="contact-details__item">
            <span className="contact-details__icon" aria-hidden="true">
              <Icon name={item.icon} />
            </span>
            <div>
              <p className="contact-details__label">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="contact-details__value"
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  {item.value}
                </a>
              ) : (
                <p className="contact-details__value">{item.value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="contact-details__actions">
        <Button as="a" href={`tel:${CLINIC_PHONE_E164.replace(/\s/g, "")}`}>
          {t("footer.cta.callNow")}
        </Button>
        <Button as="a" variant="ghost" href={`https://wa.me/${CLINIC_WHATSAPP}`} rel="noopener noreferrer">
          {t("footer.cta.whatsapp")}
        </Button>
      </div>
    </div>
  );
}
