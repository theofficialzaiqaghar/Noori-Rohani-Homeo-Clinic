import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";

const ITEMS = ["one", "two", "three"];

export function TestimonialsSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]" });

  return (
    <section className="section section--paper section--intro" aria-labelledby="voices-title">
      <div className="shell section--intro__inner" ref={ref}>
        <header className="section-head section-head--center">
          <p className="section-head__kicker" data-reveal-item>
            {t("home.testimonials.label")}
          </p>
          <h2 id="voices-title" className="section-head__title" data-reveal-item>
            {t("home.testimonials.title")}
          </h2>
        </header>
        <div className="voice-cards voice-cards--center">
          {ITEMS.map((key) => (
            <figure key={key} className="voice-card" data-reveal-item>
              <blockquote>{t(`home.testimonials.${key}.quote`)}</blockquote>
              <figcaption>
                <strong>{t(`home.testimonials.${key}.name`)}</strong>
                <span>{t(`home.testimonials.${key}.place`)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
