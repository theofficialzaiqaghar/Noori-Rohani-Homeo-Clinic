import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";

const REASONS = ["one", "two", "three", "four"];

export function WhySection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]" });

  return (
    <section className="section section--sand section--intro" aria-labelledby="why-title">
      <div className="shell section--intro__inner" ref={ref}>
        <header className="section-head section-head--center">
          <p className="section-head__kicker" data-reveal-item>
            {t("home.why.label")}
          </p>
          <h2 id="why-title" className="section-head__title" data-reveal-item>
            {t("home.why.title")}
          </h2>
        </header>
        <ul className="reason-stack reason-stack--center">
          {REASONS.map((key, index) => (
            <li key={key} className="reason-stack__item" data-reveal-item>
              <span className="reason-stack__num">{index + 1}</span>
              <div>
                <h3>{t(`home.why.items.${key}.title`)}</h3>
                <p>{t(`home.why.items.${key}.text`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
