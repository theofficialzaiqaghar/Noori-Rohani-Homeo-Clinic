import { CmsImage } from "./CmsImage";
import { SITE_IMAGES } from "../lib/siteImagery";

export function SectionVisual({ slot, imageKey, alt = "", className = "section-visual", eager = false }) {
  const fallback = (imageKey && SITE_IMAGES[imageKey]) || SITE_IMAGES.services;

  if (slot) {
    return <CmsImage slot={slot} fallbackSrc={fallback} alt={alt} className={className} eager={eager} />;
  }

  return (
    <div className={className}>
      <img src={fallback} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}
