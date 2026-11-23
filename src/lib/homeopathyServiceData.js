/** Slugs — copy: i18n pages.homeopathy.items.{slug} */
export const HOMEOPATHY_SERVICE_SLUGS = [
  "mens-health",
  "sexual-health",
  "skin-scalp-concerns",
  "hair-problems",
  "womens-health",
  "childrens-health",
  "kidney-problems",
  "digestive-problems",
  "joint-muscular-problems",
  "psychological-mental-health",
  "male-female-infertility",
  "allergies",
  "asthma-respiratory",
  "migraine-headache",
  "diabetes-support",
  "blood-pressure",
  "thyroid-concerns",
  "obesity-weight",
  "sleep-insomnia",
  "back-pain",
  "arthritis",
  "acne-skin",
  "eczema-psoriasis",
  "sinusitis",
  "liver-problems",
  "urinary-problems",
  "piles-constipation",
  "prostate-concerns",
  "pcos-support",
  "general-weakness",
  "immunity-support",
  "gout",
  "varicose-veins",
  "fever-flu",
  "anxiety-stress",
];

/** Filter categories — a service can appear in multiple categories */
export const HOMEOPATHY_CATEGORIES = [
  { id: "mens", label: "Men's problems", labelUr: "مردانہ مسائل" },
  { id: "womens", label: "Women's health", labelUr: "خواتین کی صحت" },
  { id: "children", label: "Children", labelUr: "بچے" },
  { id: "pain", label: "Pain & joints", labelUr: "درد اور جوڑ" },
  { id: "skin", label: "Skin & hair", labelUr: "جلد اور بال" },
  { id: "digestion", label: "Digestion", labelUr: "ہاضمہ" },
  { id: "mind", label: "Mind & sleep", labelUr: "ذہن اور نیند" },
  { id: "chronic", label: "Chronic care", labelUr: "طویل مدتی دیکھ بھال" },
  { id: "respiratory", label: "Allergy & breathing", labelUr: "الرجی اور سانس" },
  { id: "general", label: "General health", labelUr: "عام صحت" },
];

const HOMEOPATHY_CATEGORY_MAP = {
  "mens-health": ["mens", "general"],
  "sexual-health": ["mens", "womens"],
  "prostate-concerns": ["mens"],
  "male-female-infertility": ["mens", "womens"],
  "womens-health": ["womens"],
  "pcos-support": ["womens"],
  "childrens-health": ["children"],
  "joint-muscular-problems": ["pain"],
  "back-pain": ["pain"],
  arthritis: ["pain", "chronic"],
  gout: ["pain", "chronic"],
  "migraine-headache": ["pain", "mind"],
  "skin-scalp-concerns": ["skin"],
  "hair-problems": ["skin"],
  "acne-skin": ["skin"],
  "eczema-psoriasis": ["skin"],
  "digestive-problems": ["digestion"],
  "piles-constipation": ["digestion"],
  "liver-problems": ["digestion", "chronic"],
  "psychological-mental-health": ["mind"],
  "sleep-insomnia": ["mind"],
  "anxiety-stress": ["mind"],
  "diabetes-support": ["chronic"],
  "blood-pressure": ["chronic"],
  "thyroid-concerns": ["chronic"],
  "obesity-weight": ["chronic", "general"],
  "kidney-problems": ["chronic", "general"],
  "urinary-problems": ["mens", "womens", "general"],
  allergies: ["respiratory"],
  "asthma-respiratory": ["respiratory"],
  sinusitis: ["respiratory"],
  "fever-flu": ["respiratory", "general"],
  "general-weakness": ["general"],
  "immunity-support": ["general"],
  "varicose-veins": ["general", "chronic"],
};

/** tube = topical cream | dropper = liquid remedy | pills = tablets/globules */
const HOMEOPATHY_IMAGE_KEY = {
  "skin-scalp-concerns": "homeoTube",
  "hair-problems": "homeoTube",
  "acne-skin": "homeoTube",
  "eczema-psoriasis": "homeoTube",
  "varicose-veins": "homeoTube",
  arthritis: "homeoTube",
  gout: "homeoTube",

  "mens-health": "homeoDropper",
  "sexual-health": "homeoDropper",
  "womens-health": "homeoDropper",
  "childrens-health": "homeoDropper",
  "psychological-mental-health": "homeoDropper",
  "male-female-infertility": "homeoDropper",
  "sleep-insomnia": "homeoDropper",
  "anxiety-stress": "homeoDropper",
  allergies: "homeoDropper",
  "asthma-respiratory": "homeoDropper",
  "migraine-headache": "homeoDropper",
  "pcos-support": "homeoDropper",
  "prostate-concerns": "homeoDropper",
  sinusitis: "homeoDropper",
  "fever-flu": "homeoDropper",
  "general-weakness": "homeoDropper",
  "immunity-support": "homeoDropper",

  "kidney-problems": "homeoPills",
  "digestive-problems": "homeoPills",
  "joint-muscular-problems": "homeoPills",
  "diabetes-support": "homeoPills",
  "blood-pressure": "homeoPills",
  "thyroid-concerns": "homeoPills",
  "obesity-weight": "homeoPills",
  "back-pain": "homeoPills",
  "liver-problems": "homeoPills",
  "urinary-problems": "homeoPills",
  "piles-constipation": "homeoPills",
};

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
  imageKey: HOMEOPATHY_IMAGE_KEY[slug] || "homeoDropper",
  categories: HOMEOPATHY_CATEGORY_MAP[slug] || ["general"],
}));

export function filterHomeopathyServices(selectedCategoryIds = []) {
  if (!selectedCategoryIds.length) return HOMEOPATHY_SERVICES;
  const selected = new Set(selectedCategoryIds);
  return HOMEOPATHY_SERVICES.filter((item) => item.categories.some((c) => selected.has(c)));
}

export function groupHomeopathyByCategory(services = HOMEOPATHY_SERVICES, categoryIds = null) {
  const cats = categoryIds?.length
    ? HOMEOPATHY_CATEGORIES.filter((c) => categoryIds.includes(c.id))
    : HOMEOPATHY_CATEGORIES;
  return cats
    .map((cat) => ({
      ...cat,
      items: services.filter((s) => s.categories.includes(cat.id)),
    }))
    .filter((group) => group.items.length > 0);
}
