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

const SPIRITUAL_ICONS = {
  "rohani-ilaj": "icon-star",
  istikhara: "icon-moon",
  "quran-teaching": "icon-book",
  madarsa: "icon-building",
  "nikah-khawan": "icon-heart-hand",
  "free-schooling-education": "icon-graduation",
  "nazim-e-ala-ulama-mashaikh": "icon-users",
  "international-research-center": "icon-flask",
};

/** English banner chips per spiritual service */
export const SPIRITUAL_BANNER_CHIPS = {
  "rohani-ilaj": [
    "Spiritual guidance",
    "Nazar concerns",
    "Household peace",
    "Privacy-first care",
    "Respectful counsel",
  ],
  istikhara: [
    "Istakhara for Marriage",
    "Istakhara for Business",
    "Istakhara for Career",
    "Istakhara for Travel",
    "Istakhara for Family",
  ],
};

export const SPIRITUAL_SERVICES = SPIRITUAL_SERVICE_SLUGS.map((slug) => ({
  slug,
  icon: SPIRITUAL_ICONS[slug] || "icon-star",
  imageKey: "rohani",
  chips: SPIRITUAL_BANNER_CHIPS[slug] || [],
}));
