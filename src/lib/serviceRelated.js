import { HOMEOPATHY_SERVICE_SLUGS } from "./homeopathyServiceData";
import { SPIRITUAL_SERVICE_SLUGS } from "./spiritualServiceData";

const HOMEOPATHY_RELATED = {
  "kidney-problems": ["digestive-problems", "mens-health", "womens-health"],
  "skin-scalp-concerns": ["hair-problems", "digestive-problems", "psychological-mental-health"],
  "hair-problems": ["skin-scalp-concerns", "psychological-mental-health", "digestive-problems"],
  "male-female-infertility": ["sexual-health", "womens-health", "mens-health"],
  "sexual-health": ["psychological-mental-health", "male-female-infertility", "mens-health"],
  "psychological-mental-health": ["sexual-health", "digestive-problems", "childrens-health"],
  "digestive-problems": ["kidney-problems", "psychological-mental-health", "skin-scalp-concerns"],
  "joint-muscular-problems": ["mens-health", "womens-health", "psychological-mental-health"],
  "womens-health": ["male-female-infertility", "childrens-health", "psychological-mental-health"],
  "mens-health": ["sexual-health", "joint-muscular-problems", "kidney-problems"],
  "childrens-health": ["digestive-problems", "skin-scalp-concerns", "psychological-mental-health"],
};

const SPIRITUAL_RELATED = {
  "rohani-ilaj": ["istikhara", "quran-teaching", "madarsa"],
  istikhara: ["rohani-ilaj", "quran-teaching", "nikah-khawan"],
  "quran-teaching": ["madarsa", "free-schooling-education", "rohani-ilaj"],
  madarsa: ["quran-teaching", "free-schooling-education", "nazim-e-ala-ulama-mashaikh"],
  "nikah-khawan": ["istikhara", "rohani-ilaj", "quran-teaching"],
  "free-schooling-education": ["madarsa", "quran-teaching", "international-research-center"],
  "nazim-e-ala-ulama-mashaikh": ["international-research-center", "madarsa", "quran-teaching"],
  "international-research-center": ["nazim-e-ala-ulama-mashaikh", "madarsa", "free-schooling-education"],
};

function fallbackSlugs(category, slug, count) {
  const list = category === "homeopathy" ? HOMEOPATHY_SERVICE_SLUGS : SPIRITUAL_SERVICE_SLUGS;
  return list.filter((s) => s !== slug).slice(0, count);
}

/** @returns {{ href: string, titleKey: string, summaryKey: string }[]} */
export function getRelatedClinicalServices(category, slug, count = 4) {
  const map = category === "homeopathy" ? HOMEOPATHY_RELATED : SPIRITUAL_RELATED;
  const slugs = (map[slug] || fallbackSlugs(category, slug, count)).filter((s) => s !== slug).slice(0, count);
  return slugs.map((s) => ({
    href: `/services/${category}/${s}`,
    titleKey: `pages.${category}.items.${s}.title`,
    summaryKey: `pages.${category}.items.${s}.summary`,
  }));
}
