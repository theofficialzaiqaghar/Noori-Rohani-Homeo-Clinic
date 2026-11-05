import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";
import { SectionVisual } from "../components/SectionVisual";

const ITEMS = ["quran", "madrasa", "freeSchool", "darUlUloom", "nikkah", "mehfil"];
const COUNTERS = [
  { value: "450", key: "students" },
  { value: "18", key: "years" },
  { value: "12", key: "teachers" },
  { value: "6", key: "programmes" },
];

export function EducationSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]" });

  return (
    <section id="education" className="section section--sand split-section" aria-labelledby="education-title">
      <div className="shell split-section__grid" ref={ref}>
        <div className="split-section__visual" data-reveal-item>
          <SectionVisual imageKey="education" alt="" className="split-section__photo" />
          <aside className="stats-panel stats-panel--overlay" data-reveal-item>
            <p className="stats-panel__note">{t("home.counters.note")}</p>
            <dl className="stats-panel__grid">
              {COUNTERS.map((counter) => (
                <div key={counter.key}>
                  <dt className="stats-panel__value">{counter.value}</dt>
                  <dd>{t(`home.counters.${counter.key}`)}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
        <div className="split-section__content">
          <p className="section-head__kicker" data-reveal-item>
            {t("home.education.label")}
          </p>
          <h2 id="education-title" className="section-head__title" data-reveal-item>
            {t("home.education.title")}
          </h2>
          <p className="split-section__lede" data-reveal-item>
            {t("home.education.lead")}
          </p>
          <ol className="timeline timeline--compact">
            {ITEMS.map((key, index) => (
              <li key={key} className="timeline__item" data-reveal-item>
                <span className="timeline__index">{index + 1}</span>
                <div>
                  <h3>{t(`home.education.items.${key}.title`)}</h3>
                  <p>{t(`home.education.items.${key}.text`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
