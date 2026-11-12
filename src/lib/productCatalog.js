import { SITE_IMAGES } from "./siteImagery.js";

export const HERBAL_PRODUCTS = [
  { id: "attar-perfumes", slug: "attar-perfumes", icon: "icon-leaf", imageKey: "herbal" },
  { id: "hair-oil", slug: "hair-oil", icon: "icon-leaf", imageKey: "herbal" },
  { id: "ban-child-bam-bam", slug: "ban-child-bam-bam", icon: "icon-leaf", imageKey: "herbal" },
  { id: "winter-lotion", slug: "winter-lotion", icon: "icon-leaf", imageKey: "herbal" },
  { id: "herbal-soap", slug: "herbal-soap", icon: "icon-leaf", imageKey: "herbal" },
  { id: "acne-whitening-cream", slug: "acne-whitening-cream", icon: "icon-leaf", imageKey: "herbal" },
  { id: "majoon-e-khas", slug: "majoon-e-khas", icon: "icon-leaf", imageKey: "herbal" },
];

export function getProductBySlug(slug) {
  return HERBAL_PRODUCTS.find((p) => p.slug === slug) || null;
}

export function getRelatedProducts(slug, count = 3) {
  return HERBAL_PRODUCTS.filter((p) => p.slug !== slug).slice(0, count);
}

export function productImageSrc(item) {
  return SITE_IMAGES[item?.imageKey] || SITE_IMAGES.herbal;
}
