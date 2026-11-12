import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "../providers/I18nProvider";
import { useSiteSettings } from "../providers/SiteSettingsProvider";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_E164, CLINIC_WHATSAPP } from "../lib/clinicInfo";
import { BRAND_LOGO_SRC } from "../lib/brandAssets";

const SERVICE_LINKS = [
  { href: "/services", key: "nav.servicesMenu.all", route: true },
  { href: "/services/spiritual/rohani-ilaj", key: "nav.servicesMenu.rohani", route: true },
  { href: "/services/homeopathy", key: "nav.servicesMenu.homeo", route: true },
  { href: "/products", key: "nav.servicesMenu.herbal", route: true },
  { href: "/services/spiritual/quran-teaching", key: "nav.servicesMenu.quran", route: true },
  { href: "/services/spiritual/nikah-khawan", key: "nav.servicesMenu.nikkah", route: true },
  { href: "/services/spiritual", key: "nav.servicesMenu.spiritualAll", route: true },
  { href: "/events/mehfil", key: "nav.servicesMenu.mehfilNav", route: true },
];

export function SiteHeader({ overlay = false, className = "" }) {
  const { t, lang, setLanguage } = useI18n();
  const { getSlot } = useSiteSettings() || {};
  const cmsLogo = getSlot?.("brand.logo");
  const logoSrc = cmsLogo?.url || BRAND_LOGO_SRC;
  const [solid, setSolid] = useState(!overlay);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (!overlay) {
      setSolid(true);
      return;
    }

    const applyScroll = (y) => setSolid(y > 0);

    const onScroll = () => {
      applyScroll(window.scrollY || document.documentElement.scrollTop || 0);
    };

    const onSiteScroll = (event) => {
      applyScroll(event.detail?.y ?? 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("site-scroll", onSiteScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("site-scroll", onSiteScroll);
    };
  }, [overlay]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const mastClass = [
    "masthead",
    overlay ? (solid ? "is-solid" : "is-overlay") : "is-solid",
    open ? "is-open" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const topbarClass = ["topbar", solid ? "topbar--solid" : "topbar--overlay"].join(" ");

  const chromeClass = ["site-chrome", overlay ? "site-chrome--overlay" : "", solid ? "site-chrome--solid" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={chromeClass}>
      <div className={topbarClass}>
        <div className="shell topbar__inner">
          <div className="topbar__group">
            <a className="topbar__link" href={`tel:${CLINIC_PHONE_E164.replace(/\s/g, "")}`} aria-label={t("topbar.phoneAria")}>
              <Icon name="icon-phone" />
              <span>{CLINIC_PHONE_DISPLAY}</span>
            </a>
            <a
              className="topbar__link"
              href={`https://wa.me/${CLINIC_WHATSAPP}`}
              rel="noopener noreferrer"
              aria-label={t("topbar.whatsappAria")}
            >
              <Icon name="icon-whatsapp" />
              <span>{t("topbar.whatsapp")}</span>
            </a>
          </div>
          <div className="topbar__group">
            <span className="topbar__hours">
              <Icon name="icon-clock" />
              {t("topbar.hours")}
            </span>
            <div className="lang" role="group" aria-label={t("lang.switcher")}>
              {["en", "ur"].map((code) => (
                <button
                  key={code}
                  type="button"
                  className="lang__btn"
                  aria-pressed={lang === code}
                  aria-label={t(code === "en" ? "lang.enAria" : "lang.urAria")}
                  onClick={() => setLanguage(code)}
                >
                  {t(code === "en" ? "lang.en" : "lang.ur")}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header className={mastClass}>
        <div className="shell masthead__inner">
          <Link className="brand brand--with-logo" to="/" aria-label={t("logo.aria")}>
            <span className="brand__sigil brand__sigil--official" aria-hidden="true">
              <img src={logoSrc} alt="" className="brand__logo-img brand__logo-img--official" width={140} height={48} decoding="async" />
            </span>
            <span className="visually-hidden">
              {t("logo.name")} — {t("logo.subtitle")}
            </span>
          </Link>

          <nav className="mastnav" aria-label={t("nav.label")}>
            <Link to="/about">{t("nav.about")}</Link>
            <div
              className="mastnav__drop"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="mastnav__trigger"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((v) => !v)}
              >
                {t("nav.services")}
                <Icon name="icon-chevron" />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    className="mastnav__panel"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.22 }}
                  >
                    {SERVICE_LINKS.map((item) =>
                      item.route ? (
                        <Link key={item.key} to={item.href} onClick={() => setServicesOpen(false)}>
                          {t(item.key)}
                        </Link>
                      ) : (
                        <a key={item.key} href={item.href} onClick={() => setServicesOpen(false)}>
                          {t(item.key)}
                        </a>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/products">{t("nav.products")}</Link>
            <Link to="/contact">{t("nav.contact")}</Link>
          </nav>

          <div className="masthead__actions">
            <Button
              as={Link}
              to="/contact"
              aria-label={t("btn.bookAppointmentAria")}
              className={`masthead__book-btn${solid ? "" : " btn--on-dark"}`}
            >
              {t("btn.bookAppointment")}
            </Button>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              aria-label={open ? t("mobile.closeMenu") : t("mobile.openMenu")}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "icon-close" : "icon-menu"} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            className="drawer"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="drawer__panel"
              initial={{ x: lang === "ur" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: lang === "ur" ? "-100%" : "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <div className="drawer__head">
                <p>{t("mobile.menuTitle")}</p>
                <button type="button" onClick={() => setOpen(false)} aria-label={t("mobile.closeMenu")}>
                  <Icon name="icon-close" />
                </button>
              </div>
              <nav className="drawer__nav">
                <Link to="/about" onClick={() => setOpen(false)}>
                  {t("nav.about")}
                </Link>
                <Link to="/services" onClick={() => setOpen(false)}>
                  {t("nav.servicesMenu.all")}
                </Link>
                <Link to="/services/homeopathy" onClick={() => setOpen(false)}>
                  {t("nav.drawer.homeopathy")}
                </Link>
                <Link to="/services/spiritual" onClick={() => setOpen(false)}>
                  {t("nav.drawer.spiritual")}
                </Link>
                <Link to="/products" onClick={() => setOpen(false)}>
                  {t("nav.products")}
                </Link>
                <Link to="/events/mehfil" onClick={() => setOpen(false)}>
                  {t("nav.drawer.mehfil")}
                </Link>
                <Link to="/contact" onClick={() => setOpen(false)}>
                  {t("nav.contact")}
                </Link>
              </nav>
              <Button as={Link} to="/contact" className="drawer__cta" onClick={() => setOpen(false)}>
                {t("btn.bookAppointment")}
              </Button>
            </motion.div>
            <button type="button" className="drawer__backdrop" aria-label={t("mobile.closeMenu")} onClick={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
