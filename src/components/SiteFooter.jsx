import { useI18n } from "../providers/I18nProvider";
import { useSiteSettings } from "../providers/SiteSettingsProvider";
import { Icon } from "./Icon";
import { Button } from "./Button";

export function SiteFooter() {
  const { t } = useI18n();
  const { settings, getSlot } = useSiteSettings() || {};
  const social = settings?.footer || {};
  const logo = getSlot?.("brand.logo");
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
              <a className="footer-cta__phone" href="tel:+923000000000">
                {t("topbar.phone")}
              </a>
              <div className="footer-cta__actions">
                <Button as="a" href="tel:+923000000000" variant="light" aria-label={t("footer.cta.callNowAria")}>
                  {t("footer.cta.callNow")}
                </Button>
                <Button
                  as="a"
                  variant="ghost"
                  href="https://wa.me/923000000000"
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
          <a className="brand brand--footer" href="/" aria-label={t("logo.aria")}>
            <span className="brand__sigil" aria-hidden="true">
              {logo ? <img src={logo.url} alt="" className="brand__logo-img" /> : <Icon name="icon-mark" />}
            </span>
            <span className="brand__copy">
              <span className="brand__name">{t("logo.name")}</span>
              <span className="brand__role">{t("logo.subtitle")}</span>
            </span>
          </a>
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
          <a href="#about">{t("nav.home")}</a>
          <a href="#about">{t("nav.about")}</a>
          <a href="#services">{t("nav.services")}</a>
          <a href="#products">{t("nav.products")}</a>
          <a href="/contact">{t("nav.contact")}</a>
        </nav>

        <nav aria-label={t("footer.nav.services")}>
          <h3>{t("footer.services.title")}</h3>
          <a href="#rohani">{t("footer.services.rohani")}</a>
          <a href="#homeo">{t("footer.services.homeo")}</a>
          <a href="#products">{t("footer.services.herbal")}</a>
          <a href="#contact">{t("footer.services.istikhara")}</a>
          <a href="#education">{t("footer.services.quranTeaching")}</a>
          <a href="#education">{t("footer.services.madrasa")}</a>
          <a href="#education">{t("footer.services.nikkah")}</a>
          <a href="#education">{t("footer.services.freeSchool")}</a>
          <a href="#education">{t("footer.services.darUlUloom")}</a>
        </nav>

        <address className="footer-contact">
          <h3>{t("footer.contact.title")}</h3>
          <p>{t("footer.contact.addressLabel")}: {t("footer.contact.address")}</p>
          <p>
            {t("footer.contact.phoneLabel")}: <a href="tel:+923000000000">{t("footer.contact.phone")}</a>
          </p>
          <p>
            {t("footer.contact.emailLabel")}: <a href="mailto:info@example.com">{t("footer.contact.email")}</a>
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
            <a href="#privacy">{t("footer.legal.privacy")}</a>
            <a href="#terms">{t("footer.legal.terms")}</a>
          </nav>
        </div>
        <p className="shell footer-disclaimer">{t("footer.disclaimer")}</p>
      </div>
    </footer>
  );
}
