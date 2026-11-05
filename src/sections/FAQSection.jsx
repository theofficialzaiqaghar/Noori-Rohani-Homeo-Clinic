import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";

const FAQ_KEYS = ["one", "two", "three", "four", "five", "six"];

export function FAQSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: ".faq-item" });

  return (
    <section className="section section--sand" aria-labelledby="faq-title">
      <div className="shell faq-shell">
        <header className="section-head section-head--compact">
          <p className="section-head__kicker">{t("home.faq.label")}</p>
          <h2 id="faq-title" className="section-head__title">
            {t("home.faq.title")}
          </h2>
        </header>
        <div className="faq-list" ref={ref}>
          {FAQ_KEYS.map((key) => (
            <details key={key} className="faq-item" data-reveal-item>
              <summary>{t(`home.faq.${key}.q`)}</summary>
              <p>{t(`home.faq.${key}.a`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
