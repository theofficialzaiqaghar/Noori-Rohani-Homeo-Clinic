/** Slugs — copy: i18n pages.spiritual.items.{slug} */
export const SPIRITUAL_SERVICE_SLUGS = [
  "rohani-ilaj",
  "istikhara",
  "quran-teaching",
  "madarsa",
  "nikah-khawan",
  "free-schooling-education",
  "nazim-e-ala-ulama-mashaikh",
  "international-research-center",
];

export const SPIRITUAL_SERVICES = SPIRITUAL_SERVICE_SLUGS.map((slug) => ({
  slug,
  icon: "icon-star",
  imageKey: "rohani",
}));
