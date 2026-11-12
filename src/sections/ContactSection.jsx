import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";
import { ContactForm } from "../components/ContactForm";
import { ContactDetails } from "../components/ContactDetails";
import { Button } from "../components/Button";

export function ContactSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]" });

  return (
    <section id="contact" className="section section--ink contact-section" aria-labelledby="contact-title">
      <div className="shell contact-grid" ref={ref}>
        <div data-reveal-item>
          <p className="section-head__kicker section-head__kicker--light">{t("home.contact.label")}</p>
          <h2 id="contact-title" className="section-head__title section-head__title--light">
            {t("home.contact.title")}
          </h2>
          <p className="contact-grid__lede">{t("home.contact.lead")}</p>
          <ContactDetails variant="compact" />
          <Button as={Link} to="/contact" variant="light" className="contact-section__more">
            {t("page.contact.viewContactPage")}
          </Button>
        </div>

        <div data-reveal-item>
          <ContactForm idPrefix="home-" />
        </div>
      </div>
    </section>
  );
}
