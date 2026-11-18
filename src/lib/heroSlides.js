import { SITE_IMAGES } from "./siteImagery";

/** Hero carousel — content keys: home.hero.slides.{id}.* */
export const HERO_SLIDES = [
  {
    id: "spiritual",
    layout: "serene",
    image: SITE_IMAGES.slideSpiritual,
    imageAltKey: "home.hero.slides.spiritual.imageAlt",
    primaryHref: "/services/spiritual",
    secondaryHref: "/contact",
  },
  {
    id: "homeopathy",
    layout: "clinical",
    image: SITE_IMAGES.slideHomeopathy,
    imageAltKey: "home.hero.slides.homeopathy.imageAlt",
    primaryHref: "/services",
    secondaryHref: "/contact",
  },
  {
    id: "herbal",
    layout: "product",
    image: SITE_IMAGES.slideHerbal,
    imageAltKey: "home.hero.slides.herbal.imageAlt",
    primaryHref: "/products",
    secondaryHref: "/contact",
  },
  {
    id: "professor",
    layout: "editorial",
    image: SITE_IMAGES.slideProfessor,
    imageAltKey: "home.hero.slides.professor.imageAlt",
    primaryHref: "/contact",
    secondaryHref: "https://wa.me/923141000717",
  },
];
