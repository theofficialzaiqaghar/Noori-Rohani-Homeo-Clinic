import { SITE_IMAGES } from "./siteImagery";

/** Hero carousel — same layout as single hero; content keys: home.hero.slides.{id}.* */
/** layout drives per-slide hero composition (CSS modifier on banner) */
export const HERO_SLIDES = [
  {
    id: "professor",
    layout: "editorial",
    image: SITE_IMAGES.aboutFounder,
    imageAltKey: "home.hero.slides.professor.imageAlt",
    primaryHref: "/contact",
    secondaryHref: "https://wa.me/923141000717",
  },
  {
    id: "homeopathy",
    layout: "clinical",
    image: SITE_IMAGES.homeopathy,
    imageAltKey: "home.hero.slides.homeopathy.imageAlt",
    primaryHref: "/services",
    secondaryHref: "/contact",
  },
  {
    id: "spiritual",
    layout: "serene",
    image: SITE_IMAGES.rohani,
    imageAltKey: "home.hero.slides.spiritual.imageAlt",
    primaryHref: "/services/spiritual",
    secondaryHref: "/contact",
  },
  {
    id: "herbal",
    layout: "product",
    image: SITE_IMAGES.herbal,
    imageAltKey: "home.hero.slides.herbal.imageAlt",
    primaryHref: "/products",
    secondaryHref: "/contact",
  },
];
