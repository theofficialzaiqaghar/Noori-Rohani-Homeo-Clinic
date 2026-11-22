/**
 * Inject official clinic address, hours, phone, email into en.json / ur.json (synced to public/).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CLINIC_NAME,
  CLINIC_ADDRESS_EN,
  CLINIC_ADDRESS_UR,
  CLINIC_HOURS_EN,
  CLINIC_HOURS_UR,
  CLINIC_HOURS_TOPBAR_EN,
  CLINIC_HOURS_TOPBAR_UR,
  CLINIC_PHONE_DISPLAY,
} from "../src/lib/clinicInfo.js";
import { HOME_SERVICES_COPY } from "./home-services-copy.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const EN = {
  metaDescription: `${CLINIC_NAME} — Roohani ilaj, homeopathy, and herbal care in Surjani Town, Karachi. ${CLINIC_HOURS_SHORT_EN_PHRASE()}`,
  topbarPhone: CLINIC_PHONE_DISPLAY,
  topbarHours: CLINIC_HOURS_TOPBAR_EN,
  footerPhone: CLINIC_PHONE_DISPLAY,
  footerWhatsapp: CLINIC_PHONE_DISPLAY,
  footerEmail: "",
  footerAddress: CLINIC_ADDRESS_EN,
  footerHours: CLINIC_HOURS_EN,
  contactAsideAddress: CLINIC_ADDRESS_EN,
  contactAsideHours: CLINIC_HOURS_EN,
  mapNote: `Find us at ${CLINIC_ADDRESS_EN} Open in Google Maps for directions. Call or WhatsApp ${CLINIC_PHONE_DISPLAY} before your visit.`,
  phonePlaceholder: CLINIC_PHONE_DISPLAY,
};

const UR = {
  metaDescription:
    "نوری روحانی ہومیو کلینک، سرجانی ٹاؤن کراچی — روحانی علاج، ہومیوپathic اور جڑی بوٹیاں۔ اتوار–جمعرات شام 7–9 بجے۔",
  topbarPhone: CLINIC_PHONE_DISPLAY,
  topbarHours: CLINIC_HOURS_TOPBAR_UR,
  footerPhone: CLINIC_PHONE_DISPLAY,
  footerWhatsapp: CLINIC_PHONE_DISPLAY,
  footerEmail: "",
  footerAddress: CLINIC_ADDRESS_UR,
  footerHours: CLINIC_HOURS_UR,
  contactAsideAddress: CLINIC_ADDRESS_UR,
  contactAsideHours: CLINIC_HOURS_UR,
  mapNote:
    "پتہ مندرجہ بالا۔ گوگل میپس سے راستہ دیکھیں۔ آنے سے پہلے فون کر کے تصدیق کر لیں۔",
  phonePlaceholder: CLINIC_PHONE_DISPLAY,
};

function CLINIC_HOURS_SHORT_EN_PHRASE() {
  return "Evening consultations Sunday–Thursday, 7–9 PM. Friday & Saturday closed.";
}

function patch(file, lang) {
  const data = JSON.parse(readFileSync(file, "utf8"));
  const copy = lang === "en" ? EN : UR;

  data.meta.description = copy.metaDescription;
  data.meta.ogDescription = copy.metaDescription;
  if (data.topbar) {
    data.topbar.phone = copy.topbarPhone;
    data.topbar.hours = copy.topbarHours;
  }
  if (data.footer?.contact) {
    data.footer.contact.address = copy.footerAddress;
    data.footer.contact.hours = copy.footerHours;
    data.footer.contact.phone = copy.footerPhone;
    data.footer.contact.whatsapp = copy.footerWhatsapp;
    delete data.footer.contact.email;
  }
  if (data.footer) {
    data.footer.disclaimer = "";
  }
  if (data.home?.contact?.aside) {
    data.home.contact.aside.address = copy.contactAsideAddress;
    data.home.contact.aside.hours = copy.contactAsideHours;
    data.home.contact.aside.phone =
      lang === "en" ? `Phone: ${copy.footerPhone}` : `فون: ${copy.footerPhone}`;
    data.home.contact.aside.whatsapp =
      lang === "en" ? `WhatsApp: ${copy.footerWhatsapp}` : `واٹس ایپ: ${copy.footerWhatsapp}`;
    delete data.home.contact.aside.email;
  }
  data.page = data.page || {};
  data.page.about = data.page.about || {};
  data.page.about.documentTitle =
    lang === "en"
      ? `About the clinic | ${CLINIC_NAME}`
      : `کلینک کے بارے میں | ${CLINIC_NAME}`;
  data.page.about.metaDescription =
    lang === "en"
      ? `Learn about ${CLINIC_NAME} in Surjani Town, Karachi — homeopathy, Roohani ilaj, and herbal care.`
      : `سرجانی ٹاؤن — ${CLINIC_NAME}، ہومیو اور روحانی علاج۔`;

  data.page.contact = data.page.contact || {};
  if (data.page.contact) {
    data.page.contact.mapNote = copy.mapNote;
    data.page.contact.clinicName = CLINIC_NAME;
    data.page.contact.openMaps = lang === "en" ? "Open in Google Maps" : "گوگل میپس کھولیں";
    data.page.contact.metaDescription =
      lang === "en"
        ? `Contact ${CLINIC_NAME} in Surjani Town, Karachi. Phone / WhatsApp ${CLINIC_PHONE_DISPLAY}.`
        : `سرجانی ٹاؤن — ${CLINIC_NAME}۔ رابطہ: ${CLINIC_PHONE_DISPLAY}`;
  }
  if (data.home?.form) {
    data.home.form.phonePlaceholder = copy.phonePlaceholder;
    delete data.home.form.emailValue;
  }

  data.home = data.home || {};
  data.home.services = HOME_SERVICES_COPY[lang];

  if (data.home?.contact?.lead) {
    data.home.contact.lead =
      lang === "en"
        ? `Message or call ${CLINIC_NAME} during clinic hours (${CLINIC_HOURS_TOPBAR_EN}). For urgent spiritual matters, please phone rather than wait on a reply.`
        : "شام کے اوقات میں رابطہ کریں۔ فوری روحانی معاملے میں فون کریں۔";
  }

  data.errors = data.errors || {};
  data.errors.notFound = {
    kicker: lang === "en" ? "Page not found" : "صفحہ نہیں ملا",
    title: lang === "en" ? "We could not find that page" : "ہم وہ صفحہ نہیں ڈھونڈ سکے",
    lede:
      lang === "en"
        ? "The link may be outdated. Return home or contact the clinic during evening hours."
        : "لنک پرانا ہو سکتا ہے۔ ہوم پر واپس جائیں یا کلینک سے رابطہ کریں۔",
    home: lang === "en" ? "Back to home" : "ہوم پر واپس",
  };

  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

patch(join(root, "assets", "i18n", "en.json"), "en");
patch(join(root, "assets", "i18n", "ur.json"), "ur");
console.log("Clinic address, hours, phone & WhatsApp patched in i18n.");
