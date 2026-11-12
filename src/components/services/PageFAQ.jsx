import { useI18n } from "../../providers/I18nProvider";
import { useReveal } from "../../hooks/useReveal";

/**
 * @param {{ prefix: string, keys?: string[], title?: string, kicker?: string, id?: string, className?: string }} props
 */
export function PageFAQ({
  prefix,
  keys = ["one", "two", "three"],
  title,
  kicker,
  id = "service-faq",
  className = "section section--sand",
}) {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: ".faq-item" });
  const heading = title ?? t(`${prefix}.title`);
  const label = kicker ?? t(`${prefix}.label`);

  return (
    <section className={className} aria-labelledby={id}>
      <div className="shell faq-shell">
        <header className="section-head section-head--compact">
          <p className="section-head__kicker">{label}</p>
          <h2 id={id} className="section-head__title">
            {heading}
          </h2>
        </header>
        <div className="faq-list" ref={ref}>
          {keys.map((key) => (
            <details key={key} className="faq-item" data-reveal-item>
              <summary>{t(`${prefix}.${key}.q`)}</summary>
              <p>{t(`${prefix}.${key}.a`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
