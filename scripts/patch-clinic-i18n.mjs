/**
 * Inject official clinic address & hours into en.json / ur.json (and public copy on sync).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const EN = {
  metaDescription:
    "Rohani ilaj, homeopathy, and herbal care at Noori Roohani Homeo Clinic, Surjani Town, Karachi. Evening consultations Sun–Thu.",
  topbarHours: "Sun–Thu: 7:00 PM – 9:00 PM",
  footerAddress:
    "Plot No. CI-05, Moon Arcade, Flat, Sector L-1, Near Makkah Hotel, Surjani Town, Karachi, Pakistan.",
  footerHours: "Sun–Thu: 7:00 PM – 9:00 PM · Fri & Sat: Closed",
  contactAsideAddress:
    "Plot No. CI-05, Moon Arcade, Sector L-1, Near Makkah Hotel, Surjani Town, Karachi",
  contactAsideHours: "Sun–Thu: 7:00 PM – 9:00 PM (Fri & Sat closed)",
  mapNote: "We are in Moon Arcade, Surjani Town — near Makkah Hotel. Call before your visit to confirm availability.",
};

const UR = {
  metaDescription:
    "نوری روحانی ہومیو کلینک، سرجانی ٹاؤن کراچی — روحانی علاج، ہومیوپathic اور جڑی بوٹیاں۔ اتوار سے جمعرات شام 7 سے 9 بجے۔",
  topbarHours: "اتوار–جمعرات: شام 7:00 سے 9:00",
  footerAddress:
    "پلاٹ نمبر CI-05، مون آرکیڈ، فلیٹ، سیکٹر L-1، مکہ ہوٹل کے قریب، سرجانی ٹاؤن، کراچی، پاکستان۔",
  footerHours: "اتوار تا جمعرات: شام 7:00 سے 9:00 · جمعہ و ہفتہ: بند",
  contactAsideAddress:
    "پلاٹ CI-05، مون آرکیڈ، سیکٹر L-1، مکہ ہوٹل کے قریب، سرجانی ٹاؤن، کراچی",
  contactAsideHours: "اتوار–جمعرات: شام 7–9 (جمعہ و ہفتہ بند)",
  mapNote: "مون آرکیڈ، سرجانی ٹاؤن — مکہ ہوٹل کے قریب۔ آنے سے پہلے فون کر کے تصدیق کر لیں۔",
};

function patch(file, lang) {
  const data = JSON.parse(readFileSync(file, "utf8"));
  const copy = lang === "en" ? EN : UR;

  data.meta.description = copy.metaDescription;
  data.meta.ogDescription = copy.metaDescription;
  data.topbar.hours = copy.topbarHours;
  data.footer.contact.address = copy.footerAddress;
  data.footer.contact.hours = copy.footerHours;
  data.home.contact.aside.address = copy.contactAsideAddress;
  data.home.contact.aside.hours = copy.contactAsideHours;
  data.page.contact.mapNote = copy.mapNote;
  data.page.contact.metaDescription =
    lang === "en"
      ? "Contact Noori Roohani Homeo Clinic in Surjani Town, Karachi. Evening hours Sun–Thu 7–9 PM. Phone, WhatsApp, or appointment form."
      : "سرجانی ٹاؤن کراچی، نوری روحانی ہومیو کلینک — رابطہ۔ اتوار سے جمعرات شام 7–9 بجے۔ فون، واٹس ایپ یا فارم۔";

  if (data.home?.contact?.lead) {
    data.home.contact.lead =
      lang === "en"
        ? "Message or call during evening clinic hours (Sun–Thu, 7–9 PM). For urgent spiritual matters, please phone rather than wait on a reply."
        : "شام کے اوقات (اتوار–جمعرات، 7–9 بجے) میں رابطہ کریں۔ فوری روحانی معاملے میں پیغام کی بجائے فون کریں۔";
  }

  data.errors = data.errors || {};
  data.errors.notFound = {
    kicker: lang === "en" ? "Page not found" : "صفحہ نہیں ملا",
    title: lang === "en" ? "We could not find that page" : "ہم وہ صفحہ نہیں ڈھونڈ سکے",
    lede:
      lang === "en"
        ? "The link may be outdated. Return home or contact the clinic during evening hours."
        : "لنک پرانا ہو سکتا ہے۔ ہوم پر جائیں یا شام کے اوقات میں کلینک سے رابطہ کریں۔",
    home: lang === "en" ? "Back to home" : "ہوم پر واپس",
  };

  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

patch(join(root, "assets", "i18n", "en.json"), "en");
patch(join(root, "assets", "i18n", "ur.json"), "ur");
console.log("Clinic address & hours patched in i18n.");
