import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";

const STEPS = ["one", "two", "three"];

export function ProcessSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]" });

  return (
    <section className="section section--line process-band" aria-labelledby="process-title">
      <div className="process-band__bg" aria-hidden="true" />
      <div className="shell process-band__inner">
        <header className="section-head section-head--center" data-reveal-item>
          <p className="section-head__kicker">{t("home.steps.label")}</p>
          <h2 id="process-title" className="section-head__title">
            {t("home.steps.title")}
          </h2>
        </header>
        <div className="process-steps" ref={ref}>
          {STEPS.map((key, index) => (
            <article key={key} className="process-steps__item" data-reveal-item>
              <span className="process-steps__num">{index + 1}</span>
              <h3>{t(`home.steps.${key}.title`)}</h3>
              <p>{t(`home.steps.${key}.text`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
