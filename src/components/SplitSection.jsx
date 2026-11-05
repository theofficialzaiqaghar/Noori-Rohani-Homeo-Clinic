import { useReveal } from "../hooks/useReveal";
import { SectionVisual } from "./SectionVisual";

export function SplitSection({
  id,
  className = "",
  reverse = false,
  visualSlot,
  imageKey,
  imageAlt = "",
  kicker,
  title,
  lede,
  children,
  tone = "paper",
}) {
  const ref = useReveal({ childSelector: "[data-split-item]" });

  return (
    <section id={id} className={`section section--${tone} split-section ${className}`.trim()} aria-labelledby={title ? `${id}-title` : undefined}>
      <div className={`shell split-section__grid ${reverse ? "split-section__grid--reverse" : ""}`.trim()} ref={ref}>
        <div className="split-section__visual" data-split-item>
          <SectionVisual slot={visualSlot} imageKey={imageKey} alt={imageAlt} className="split-section__photo" />
        </div>
        <div className="split-section__content" data-split-item>
          {kicker && <p className="section-head__kicker">{kicker}</p>}
          {title && (
            <h2 id={`${id}-title`} className="section-head__title">
              {title}
            </h2>
          )}
          {lede && <p className="split-section__lede">{lede}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
