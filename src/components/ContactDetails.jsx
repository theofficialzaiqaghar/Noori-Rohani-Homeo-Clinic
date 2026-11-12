import { useI18n } from "../providers/I18nProvider";
import { Icon } from "./Icon";
import { Button } from "./Button";
import {
  CLINIC_ADDRESS_EN,
  CLINIC_ADDRESS_UR,
  CLINIC_EMAIL,
  CLINIC_HOURS_EN,
  CLINIC_HOURS_UR,
  CLINIC_MAP_URL,
  CLINIC_NAME,
  CLINIC_PHONE_DISPLAY,
  CLINIC_PHONE_E164,
  CLINIC_WHATSAPP,
} from "../lib/clinicInfo";

export function ContactDetails({ variant = "compact" }) {
  const { t, lang } = useI18n();
  const isPage = variant === "page";
  const address = lang === "ur" ? CLINIC_ADDRESS_UR : CLINIC_ADDRESS_EN;
  const hours = lang === "ur" ? CLINIC_HOURS_UR : CLINIC_HOURS_EN;
  const telHref = `tel:${CLINIC_PHONE_E164.replace(/\s/g, "")}`;

  const items = [
    {
      icon: "icon-building",
      label: lang === "ur" ? "کلینک" : "Clinic",
      value: CLINIC_NAME,
    },
    {
      icon: "icon-phone",
      label: t("footer.contact.phoneLabel"),
      value: CLINIC_PHONE_DISPLAY,
      href: telHref,
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
      value: CLINIC_EMAIL,
      href: `mailto:${CLINIC_EMAIL}`,
    },
    {
      icon: "icon-location",
      label: t("footer.contact.addressLabel"),
      value: address,
      href: CLINIC_MAP_URL,
      external: true,
      linkLabel: lang === "ur" ? "گوگل میپس" : "Google Maps",
    },
    {
      icon: "icon-clock",
      label: t("footer.contact.hoursLabel"),
      value: hours,
    },
  ];

  if (!isPage) {
    return (
      <ul className={`contact-grid__meta contact-grid__meta--rich${isPage ? "" : ""}`}>
        {items.map((item) => (
          <li key={item.label} className="contact-grid__meta-item">
            <strong>{item.label}:</strong>{" "}
            {item.href ? (
              <a
                href={item.href}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="contact-grid__meta-link"
              >
                {item.linkLabel || item.value}
              </a>
            ) : (
              <span>{item.value}</span>
            )}
          </li>
        ))}
      </ul>
    );
  }

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
                  {item.linkLabel ? `${item.value} — ${item.linkLabel}` : item.value}
                </a>
              ) : (
                <p className="contact-details__value">{item.value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="contact-details__actions">
        <Button as="a" href={telHref}>
          {t("footer.cta.callNow")}
        </Button>
        <Button as="a" variant="ghost" href={`https://wa.me/${CLINIC_WHATSAPP}`} rel="noopener noreferrer">
          {t("footer.cta.whatsapp")}
        </Button>
        <Button as="a" variant="ghost" href={CLINIC_MAP_URL} rel="noopener noreferrer">
          {lang === "ur" ? "نقشہ کھولیں" : "Open map"}
        </Button>
      </div>
    </div>
  );
}
