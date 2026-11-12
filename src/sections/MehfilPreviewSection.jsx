import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { useI18n } from "../providers/I18nProvider";
import { MEHFIL_SCHEDULE } from "../lib/mehfilEvent";
import { SectionVisual } from "../components/SectionVisual";
import { Button } from "../components/Button";

export function MehfilPreviewSection() {
  const { t } = useI18n();
  const ref = useReveal({ childSelector: "[data-reveal-item]", stagger: 0.05 });

  return (
    <section id="mehfil-preview" className="section section--paper mehfil-preview" aria-labelledby="mehfil-preview-title">
      <div className="shell mehfil-preview__inner" ref={ref}>
        <div className="mehfil-preview__visual" data-reveal-item>
          <SectionVisual imageKey="education" alt={t("home.mehfilPreview.imageAlt")} className="split-section__photo" />
        </div>
        <div className="mehfil-preview__content">
          <p className="section-head__kicker" data-reveal-item>
            {t("home.mehfilPreview.label")}
          </p>
          <h2 id="mehfil-preview-title" className="section-head__title" data-reveal-item>
            {t("home.mehfilPreview.title")}
          </h2>
          <p className="split-section__lede" data-reveal-item>
            {t("home.mehfilPreview.lead", { week: String(MEHFIL_SCHEDULE.weekOfMonth) })}
          </p>
          <p className="mehfil-preview__date" data-reveal-item>
            {t("home.mehfilPreview.dateNote")}
          </p>
          <div className="mehfil-preview__actions" data-reveal-item>
            <Button as={Link} to="/events/mehfil">
              {t("home.mehfilPreview.cta")}
            </Button>
            <Button as={Link} to="/contact" variant="ghost">
              {t("home.mehfilPreview.contactCta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
