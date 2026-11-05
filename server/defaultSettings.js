export const DEFAULT_SETTINGS = {
  brand: {
    primaryColor: "#0b1f2a",
    secondaryColor: "#b8941f",
    backgroundColor: "#f7f5f0",
    surfaceColor: "#ffffff",
    textColor: "#0b1f2a",
    mutedTextColor: "#4a5c66",
    logoMediaId: null,
    faviconMediaId: null,
  },
  typography: {
    primaryFont: "Plus Jakarta Sans",
    headingFont: "Plus Jakarta Sans",
    headingWeight: "600",
    bodyWeight: "400",
    baseFontSizePx: 16,
    scaleRatio: 1.2,
    lineHeight: 1.6,
    letterSpacingHeading: "-0.02em",
    letterSpacingBody: "0",
  },
  footer: {
    socialFacebook: "https://facebook.com/",
    socialYoutube: "https://youtube.com/",
    socialInstagram: "https://instagram.com/",
    socialWhatsapp: "https://wa.me/923000000000",
  },
  slots: {
    "hero.main": null,
    "hero.background": null,
    "brand.logo": null,
    "brand.favicon": null,
  },
};

export const MEDIA_CATEGORIES = [
  "hero",
  "feature",
  "background",
  "gallery",
  "brand",
  "general",
];

export const IMAGE_SLOTS = [
  { key: "hero.main", label: "Hero main image", category: "hero" },
  { key: "hero.background", label: "Hero background", category: "background" },
  { key: "brand.logo", label: "Site logo", category: "brand" },
  { key: "brand.favicon", label: "Favicon", category: "brand" },
];
