import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_E164, CLINIC_WHATSAPP } from "./clinicInfo.js";

/** 20 Days Umrah Package — Noor e Qosayn Travel & Tour (hosted on clinic site). */
export const UMRAH_OPERATOR = "Noor e Qosayn Travel & Tour";

export const UMRAH_PACKAGE = {
  slug: "20-days",
  title: "20 Days Umrah Package",
  travelDate: "26 November 2026",
  returnDate: "15 December 2026",
  duration: "20 Days / 19 Nights",
  departure: "Karachi to Jeddah – Direct Flight",
  breakfastNote: "Hotels Without Breakfast",
  makkah: {
    city: "Makkah",
    nights: "12 Nights",
    shuttle: "Shuttle Service Available",
    distance: "Approximately 1500 meters from Haram",
  },
  madinah: {
    city: "Madinah",
    nights: "7 Nights",
    shuttle: "Shuttle Service Available",
    distance: "Approximately 1100 meters from Masjid-e-Nabvi",
  },
  includes: [
    "Umrah Visa",
    "Travel Insurance",
    "Return Air Ticket",
    "Hotel Accommodation",
    "Hotels Without Breakfast",
    "Air-Conditioned Transport",
    "Makkah Ziarat",
    "Madinah Ziarat",
  ],
  pricing: {
    adult: "PKR 215,000",
    adultLabel: "Adult — Per Person",
    child: "PKR 182,000",
    childLabel: "Child — Per Person",
  },
};

export function umrahWhatsAppHref(extraLines = []) {
  const text = [
    "Assalam-o-Alaikum,",
    `I want to inquire about the ${UMRAH_PACKAGE.title}.`,
    `Operator: ${UMRAH_OPERATOR}`,
    `Travel date: ${UMRAH_PACKAGE.travelDate}`,
    `Return date: ${UMRAH_PACKAGE.returnDate}`,
    `Duration: ${UMRAH_PACKAGE.duration}`,
    ...extraLines,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function umrahTelHref() {
  return `tel:${CLINIC_PHONE_E164.replace(/\s/g, "")}`;
}

export { CLINIC_PHONE_DISPLAY, CLINIC_WHATSAPP };
