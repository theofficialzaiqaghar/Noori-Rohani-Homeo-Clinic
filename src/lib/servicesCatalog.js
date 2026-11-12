import { HOMEOPATHY_SERVICES } from "./homeopathyServiceData";
import { SPIRITUAL_SERVICES } from "./spiritualServiceData";

/** Unified catalog for /services hub, grids, and internal linking. */
export function mapClinicalService(category, item) {
  return {
    id: `${category}-${item.slug}`,
    category,
    slug: item.slug,
    href: `/services/${category}/${item.slug}`,
    icon: item.icon,
    imageKey: item.imageKey,
    titleKey: `pages.${category}.items.${item.slug}.title`,
    summaryKey: `pages.${category}.items.${item.slug}.summary`,
  };
}

export const CLINICAL_SERVICES = [
  ...HOMEOPATHY_SERVICES.map((item) => mapClinicalService("homeopathy", item)),
  ...SPIRITUAL_SERVICES.map((item) => mapClinicalService("spiritual", item)),
];

export const SERVICE_HUB_LINKS = [
  {
    id: "hub-homeopathy",
    category: "homeopathy",
    href: "/services/homeopathy",
    icon: "icon-flask",
    imageKey: "homeopathy",
    titleKey: "pages.homeopathy.hub.title",
    summaryKey: "pages.homeopathy.hub.lead",
  },
  {
    id: "hub-spiritual",
    category: "spiritual",
    href: "/services/spiritual",
    icon: "icon-star",
    imageKey: "rohani",
    titleKey: "pages.spiritual.hub.title",
    summaryKey: "pages.spiritual.hub.lead",
  },
  {
    id: "hub-products",
    category: "products",
    href: "/products",
    icon: "icon-leaf",
    imageKey: "herbal",
    titleKey: "pages.products.hub.title",
    summaryKey: "pages.products.hub.lead",
  },
  {
    id: "hub-mehfil",
    category: "events",
    href: "/events/mehfil",
    icon: "icon-book",
    imageKey: "mehfil",
    titleKey: "pages.mehfil.title",
    summaryKey: "pages.mehfil.lead",
  },
];

export const SERVICES_BREADCRUMB_INDEX = {
  labelKey: "pages.services.index.breadcrumbCurrent",
  href: "/services",
};
