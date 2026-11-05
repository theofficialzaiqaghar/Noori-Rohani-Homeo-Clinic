import { useSiteSettings } from "../providers/SiteSettingsProvider";

export function CmsImage({ slot, fallbackSrc, alt = "", className = "", width, height, eager = false }) {
  const { getSlot } = useSiteSettings() || {};
  const asset = getSlot?.(slot);
  const src = asset?.url || fallbackSrc;
  const webp = asset?.webpUrl;
  const focalX = (asset?.focalX ?? 0.5) * 100;
  const focalY = (asset?.focalY ?? 0.5) * 100;

  if (!src) return null;

  return (
    <picture className={className}>
      {webp && webp !== src && <source type="image/webp" srcSet={webp} />}
      <img
        src={src}
        alt={asset?.description || alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        style={{ objectPosition: `${focalX}% ${focalY}%` }}
      />
    </picture>
  );
}
