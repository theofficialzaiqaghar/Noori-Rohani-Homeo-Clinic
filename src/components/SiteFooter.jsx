import { Link } from "react-router-dom";
import { useI18n } from "../providers/I18nProvider";
import { CLINIC_EMAIL, CLINIC_PHONE_E164, CLINIC_WHATSAPP } from "../lib/contactInfo";
import { BRAND_LOGO_SRC } from "../lib/brandAssets";
import { useSiteSettings } from "../providers/SiteSettingsProvider";
import { Icon } from "./Icon";
import { Button } from "./Button";

export function SiteFooter() {
  const { t } = useI18n();
  const { settings, getSlot } = useSiteSettings() || {};
  const social = settings?.footer || {};
  const cmsLogo = getSlot?.("brand.logo");
  const logoSrc = cmsLogo?.url || BRAND_LOGO_SRC;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label={t("footer.aria")}>
      <section className="footer-cta" aria-labelledby="footer-cta-title">
        <div className="shell">
          <div className="footer-cta__panel">
            <div className="footer-cta__copy">
              <p className="footer-cta__kicker">{t("footer.cta.kicker")}</p>
              <h2 id="footer-cta-title">{t("footer.cta.title")}</h2>
              <p className="footer-cta__lede">{t("footer.cta.lede")}</p>
            </div>
            <div className="footer-cta__aside">
              <a className="footer-cta__phone" href={`tel:${CLINIC_PHONE_E164.replace(/\s/g, "")}`}>
                {t("topbar.phone")}
              </a>
              <div className="footer-cta__actions">
                <Button as="a" href={`tel:${CLINIC_PHONE_E164.replace(/\s/g, "")}`} variant="light" aria-label={t("footer.cta.callNowAria")}>
                  {t("footer.cta.callNow")}
                </Button>
                <Button
                  as="a"
                  variant="ghost"
                  href={`https://wa.me/${CLINIC_WHATSAPP}`}
                  rel="noopener noreferrer"
                  className="footer-cta__btn-ghost"
                  aria-label={t("footer.cta.whatsappAria")}
                >
                  {t("footer.cta.whatsapp")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="shell footer-grid">
        <div className="footer-grid__brand">
          <Link className="brand brand--footer brand--with-logo" to="/" aria-label={t("logo.aria")}>
            <span className="brand__sigil brand__sigil--official" aria-hidden="true">
              <img
                src={logoSrc}
                alt=""
                className="brand__logo-img brand__logo-img--official"
                width={160}
                height={54}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="visually-hidden">
              {t("logo.name")} — {t("logo.subtitle")}
            </span>
          </Link>
          <p>{t("footer.about.line1")}</p>
          <p>{t("footer.about.line2")}</p>
          <ul className="footer-social" aria-label={t("footer.social.label")}>
            <li>
              <a href={social.socialFacebook || "https://facebook.com/"} rel="noopener noreferrer" aria-label={t("footer.social.facebook")}>
                <Icon name="icon-facebook" />
              </a>
            </li>
            <li>
              <a href={social.socialYoutube || "https://youtube.com/"} rel="noopener noreferrer" aria-label={t("footer.social.youtube")}>
                <Icon name="icon-youtube" />
              </a>
            </li>
            <li>
              <a href={social.socialWhatsapp || "https://wa.me/923000000000"} rel="noopener noreferrer" aria-label={t("footer.social.whatsapp")}>
                <Icon name="icon-whatsapp" />
              </a>
            </li>
            <li>
              <a href={social.socialInstagram || "https://instagram.com/"} rel="noopener noreferrer" aria-label={t("footer.social.instagram")}>
                <Icon name="icon-instagram" />
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label={t("footer.nav.quickLinks")}>
          <h3>{t("footer.quickLinks.title")}</h3>
          <Link to="/">{t("nav.home")}</Link>
          <Link to="/about">{t("nav.about")}</Link>
          <Link to="/services/homeopathy">{t("footer.quickLinks.homeopathy")}</Link>
          <Link to="/services/spiritual">{t("footer.quickLinks.spiritual")}</Link>
          <Link to="/products">{t("nav.products")}</Link>
          <Link to="/events/mehfil">{t("footer.quickLinks.mehfil")}</Link>
          <Link to="/contact">{t("nav.contact")}</Link>
        </nav>

        <nav aria-label={t("footer.nav.services")}>
          <h3>{t("footer.services.title")}</h3>
          <Link to="/services/spiritual/rohani-ilaj">{t("footer.services.rohani")}</Link>
          <Link to="/services/homeopathy">{t("footer.services.homeo")}</Link>
          <Link to="/products">{t("footer.services.herbal")}</Link>
          <Link to="/services/spiritual/istikhara">{t("footer.services.istikhara")}</Link>
          <Link to="/services/spiritual/quran-teaching">{t("footer.services.quranTeaching")}</Link>
          <Link to="/services/spiritual/madarsa">{t("footer.services.madrasa")}</Link>
          <Link to="/services/spiritual/nikah-khawan">{t("footer.services.nikkah")}</Link>
          <Link to="/services/spiritual/free-schooling-education">{t("footer.services.freeSchool")}</Link>
          <Link to="/services/spiritual/madarsa">{t("footer.services.darUlUloom")}</Link>
        </nav>

        <address className="footer-contact">
          <h3>{t("footer.contact.title")}</h3>
          <p>{t("footer.contact.addressLabel")}: {t("footer.contact.address")}</p>
          <p>
            {t("footer.contact.phoneLabel")}:{" "}
            <a href={`tel:${CLINIC_PHONE_E164.replace(/\s/g, "")}`}>{t("footer.contact.phone")}</a>
          </p>
          <p>
            {t("footer.contact.emailLabel")}: <a href={`mailto:${CLINIC_EMAIL}`}>{t("footer.contact.email")}</a>
          </p>
          <p>
            {t("footer.contact.hoursLabel")}: {t("footer.contact.hours")}
          </p>
        </address>
      </div>

      <div className="footer-legal">
        <div className="shell footer-bar">
          <p>{t("footer.legal.copyright").replace("{year}", String(year))}</p>
          <nav aria-label={t("footer.nav.legal")}>
            <a href="/contact">{t("footer.legal.privacy")}</a>
            <a href="/contact">{t("footer.legal.terms")}</a>
          </nav>
        </div>
        <p className="shell footer-disclaimer">{t("footer.disclaimer")}</p>
      </div>
    </footer>
  );
}
