/** Slugs — copy: i18n pages.homeopathy.items.{slug} */
export const HOMEOPATHY_SERVICE_SLUGS = [
  "kidney-problems",
  "skin-scalp-concerns",
  "hair-problems",
  "male-female-infertility",
  "sexual-health",
  "psychological-mental-health",
  "digestive-problems",
  "joint-muscular-problems",
  "womens-health",
  "mens-health",
  "childrens-health",
];

export const HOMEOPATHY_SERVICES = HOMEOPATHY_SERVICE_SLUGS.map((slug) => ({
  slug,
  icon: "icon-flask",
  imageKey: "homeopathy",
}));
