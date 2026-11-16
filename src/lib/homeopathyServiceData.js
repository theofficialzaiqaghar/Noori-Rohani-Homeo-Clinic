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

const HOMEOPATHY_ICONS = {
  "kidney-problems": "icon-droplet",
  "skin-scalp-concerns": "icon-sparkles",
  "hair-problems": "icon-scissors",
  "male-female-infertility": "icon-heart-hand",
  "sexual-health": "icon-heart",
  "psychological-mental-health": "icon-brain",
  "digestive-problems": "icon-stomach",
  "joint-muscular-problems": "icon-bone",
  "womens-health": "icon-flower",
  "mens-health": "icon-shield",
  "childrens-health": "icon-child",
};

export const HOMEOPATHY_SERVICES = HOMEOPATHY_SERVICE_SLUGS.map((slug) => ({
  slug,
  icon: HOMEOPATHY_ICONS[slug] || "icon-flask",
  imageKey: "homeopathy",
}));
