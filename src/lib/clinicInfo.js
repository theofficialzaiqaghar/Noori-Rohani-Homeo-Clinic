/** Official clinic details — single source of truth for UI, i18n sync, SEO, and scripts. */
export const CLINIC_NAME = "Noori Roohani Homeo Clinic";

/** Canonical public site URL (no trailing slash). Override at build with VITE_SITE_URL. */
export const SITE_URL = "https://nooriroohanihomeoclinic.com";

export const CLINIC_ADDRESS_EN =
  "Plot No. CI-05, Moon Arcade, Flat, Sector L-1, Makkah Hotel, Chai Chowrangi, Surjani Town, Karachi, Pakistan.";

export const CLINIC_ADDRESS_UR =
  "پلاٹ نمبر CI-05، مون آرکیڈ، فلیٹ، سیکٹر L-1، مکہ ہوٹل، چائے چورنگی، سرجانی ٹاؤن، کراچی، پاکستان۔";

/** Day-by-day clinic hours (English). */
export const CLINIC_HOURS_DAYS_EN = [
  { day: "Sunday", hours: "7:00 PM – 9:00 PM" },
  { day: "Monday", hours: "7:00 PM – 9:00 PM" },
  { day: "Tuesday", hours: "7:00 PM – 9:00 PM" },
  { day: "Wednesday", hours: "7:00 PM – 9:00 PM" },
  { day: "Thursday", hours: "7:00 PM – 9:00 PM" },
  { day: "Friday", hours: "Closed" },
  { day: "Saturday", hours: "Closed" },
];

export const CLINIC_HOURS_DAYS_UR = [
  { day: "اتوار", hours: "شام 7:00 – 9:00" },
  { day: "پیر", hours: "شام 7:00 – 9:00" },
  { day: "منگل", hours: "شام 7:00 – 9:00" },
  { day: "بدھ", hours: "شام 7:00 – 9:00" },
  { day: "جمعرات", hours: "شام 7:00 – 9:00" },
  { day: "جمعہ", hours: "بند" },
  { day: "ہفتہ", hours: "بند" },
];

export const CLINIC_HOURS_EN = CLINIC_HOURS_DAYS_EN.map((d) => `${d.day}: ${d.hours}`).join(" · ");

export const CLINIC_HOURS_UR = CLINIC_HOURS_DAYS_UR.map((d) => `${d.day}: ${d.hours}`).join(" · ");

/** Shorter line for topbar */
export const CLINIC_HOURS_TOPBAR_EN = "Sun–Thu: 7:00 PM – 9:00 PM · Fri & Sat: Closed";
export const CLINIC_HOURS_TOPBAR_UR = "اتوار–جمعرات: شام 7:00 سے 9:00 · جمعہ و ہفتہ: بند";

export const CLINIC_HOURS_SHORT_EN = "Sun–Thu 7–9 PM";
export const CLINIC_HOURS_SHORT_UR = "اتوار–جمعرات 7–9 شام";

export const CLINIC_CITY = "Karachi";
export const CLINIC_AREA = "Surjani Town";

export const CLINIC_PHONE_E164 = "+923141000717";
export const CLINIC_PHONE_DISPLAY = "0314-1000717";
export const CLINIC_WHATSAPP = "923141000717";
/** Email removed from public site — WhatsApp-only contact. Kept empty for legacy imports. */
export const CLINIC_EMAIL = "";

export const CLINIC_MAP_QUERY =
  "Plot CI-05 Moon Arcade Sector L-1 Chai Chowrangi Surjani Town Karachi Makkah Hotel";

export const CLINIC_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_MAP_QUERY)}`;

export const CLINIC_SOCIAL_FACEBOOK = "https://www.facebook.com/share/1CKiMegiXf/";
export const CLINIC_SOCIAL_YOUTUBE = "https://www.youtube.com/@nooriroohaniclinic";
export const CLINIC_SOCIAL_INSTAGRAM = "https://www.instagram.com/nooriroohanihomeoclinic/";
