/**
 * Merges generated `pages.*` copy and UI extensions into assets/i18n/en.json and ur.json.
 * Run: node scripts/generate-pages-i18n.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const i18nDir = join(root, "assets", "i18n");

const HOMEOPATHY = [
  ["kidney-problems", "Kidney problems", "گردے کے مسائل"],
  ["skin-scalp-concerns", "Skin disorders & scalp concerns", "جلدی امراض اور کھوپڑی کے مسائل"],
  ["hair-problems", "Hair problems", "بالوں کے مسائل"],
  ["male-female-infertility", "Infertility (male & female)", "مردانہ و زنانہ بانجھ پن"],
  ["sexual-health", "Sexual health concerns", "جنسی صحت کے مسائل"],
  ["psychological-mental-health", "Psychological issues", "نفسیاتی مسائل"],
  ["digestive-problems", "Digestive problems", "معدے کے مسائل"],
  ["joint-muscular-problems", "Joint & muscular complaints", "جوڑوں اور عضلات کی شکایات"],
  ["womens-health", "Women's health", "خواتین کی صحت"],
  ["mens-health", "Men's health", "مردوں کی صحت"],
  ["childrens-health", "Children's health", "بچوں کی صحت"],
];

/** Clinic copy from official service list — general info only, not medical advice. */
const HOMEOPATHY_DETAIL = {
  "kidney-problems": {
    overview:
      "Homeopathic case-taking for kidney-related complaints. We discuss your symptoms, history, and reports you bring to the clinic.",
    approach: "Consultations are private. Remedy selection follows classical homeopathy with follow-up visits when needed.",
  },
  "skin-scalp-concerns": {
    overview:
      "Support for skin disorders and scalp concerns such as itching, rash, dryness, or recurring irritation.",
    approach: "Skin and scalp cases need careful history. We avoid online diagnosis — visit or call during clinic hours.",
  },
  "hair-problems": {
    overview: "Hair fall, thinning, dryness, and related scalp issues discussed in a structured consultation.",
    approach: "We note pattern, duration, and triggers before suggesting homeopathic support alongside lifestyle advice where helpful.",
  },
  "male-female-infertility": {
    overview:
      "Male and female infertility concerns are handled with discretion. Couples may attend together when comfortable.",
    approach: "We review medical history and prior tests you share. Treatment plans are adjusted at follow-up — no guaranteed outcomes.",
  },
  "sexual-health": {
    overview:
      "Sensitive sexual health matters for men and women. Sessions are confidential and conducted with adab.",
    approach: "Often linked with stress or general health — we take a whole-person history before any remedy plan.",
  },
  "psychological-mental-health": {
    overview:
      "Psychological and emotional difficulties such as anxiety, low mood, stress, or sleep disturbance.",
    approach: "Homeopathic support complements — not replaces — urgent psychiatric care. Seek emergency help when needed.",
  },
  "digestive-problems": {
    overview: "Stomach pain, acidity, bloating, irregular appetite, and other digestive complaints.",
    approach: "Diet and routine are reviewed along with symptoms. Follow-up helps track response over time.",
  },
  "joint-muscular-problems": {
    overview: "Joint stiffness, muscular aches, and mobility-related complaints.",
    approach: "We document pain pattern, aggravations, and relief factors typical of homeopathic case-taking.",
  },
  "womens-health": {
    overview: "Women's health issues across age groups — cycles, hormones, and general wellbeing.",
    approach: "Private consultations for female patients. Bring any recent lab reports if available.",
  },
  "mens-health": {
    overview: "Men's health including vitality, prostate-related symptoms, and general preventive care.",
    approach: "Evening appointments at the clinic. Referral to hospital care when symptoms need urgent attention.",
  },
  "childrens-health": {
    overview: "Children's acute and recurring complaints suitable for homeopathic assessment.",
    approach: "Parents attend with the child. We explain remedies and follow-up clearly before you leave.",
  },
};

const SPIRITUAL = [
  ["rohani-ilaj", "Rohani Ilaj", "روحانی علاج"],
  ["istikhara", "Istakhara", "استخارہ"],
  ["quran-teaching", "Quran teaching", "قرآن کی تعلیم"],
  ["madarsa", "Madarsa", "مدرسہ"],
  ["nikah-khawan", "Nikah Khawan (Nikkah services)", "نکاح خواں خدمات"],
  ["free-schooling-education", "Free schooling / education", "مفت تعلیم / سکولنگ"],
  ["nazim-e-ala-ulama-mashaikh", "Nazim-e-Aala Ulama & Mashaikh", "ناظم اعلیٰ علماء و مشائخ"],
  ["international-research-center", "International Research Council", "بین الاقوامی تحقیقی کونسل"],
];

const PRODUCTS = [
  ["attar-perfumes", "Perfume & attar", "پرفیوم و عطر"],
  ["hair-oil", "Hair oil", "بالوں کا تیل"],
  ["ban-child-bam-bam", "Child Bam Bam", "چائلڈ بم بم"],
  ["winter-lotion", "Winter lotion", "موسم سرما لوشن"],
  ["herbal-soap", "Herbal soap (acne & whitening)", "جڑی بوٹی صابن (مہاسوں و فیئرنس)"],
  ["acne-whitening-cream", "Acne & whitening cream", "مہاسوں و whitening کریم"],
  ["majoon-e-khas", "Majoon-e-Khas", "معجون خاص"],
];

const PRODUCT_DETAIL = {
  "attar-perfumes": {
    details: "Traditional attar and perfume available at the clinic. Ask for current stock and fragrances.",
    usage: "For external use only. Patch-test if you have sensitive skin.",
  },
  "hair-oil": {
    details: "Clinic-prepared hair oil for dry scalp and hair care. Ingredients and batch details at counter.",
    usage: "Apply as directed on the label. Avoid contact with eyes.",
  },
  "ban-child-bam-bam": {
    details: "Child Bam Bam herbal product — enquire availability and age-appropriate use at the clinic.",
    usage: "Use only as advised by staff. Keep out of reach of young children unless directed.",
  },
  "winter-lotion": {
    details: "Winter lotion for dry skin in cold weather. Moisturising herbal preparation.",
    usage: "Apply to clean skin. Discontinue if irritation occurs.",
  },
  "herbal-soap": {
    details: "Herbal soap formulated for acne and whitening support alongside regular skincare.",
    usage: "Use on face or body as labelled. Rinse well; avoid broken or irritated skin.",
  },
  "acne-whitening-cream": {
    details: "Acne and whitening cream from the clinic herbal range. Confirm suitability for your skin type.",
    usage: "Follow label directions. Sun protection is recommended when using whitening products.",
  },
  "majoon-e-khas": {
    details: "Majoon-e-Khas — specialised herbal majoon. Price and ingredients confirmed at clinic only.",
    usage: "Take only as prescribed by clinic staff. Not a substitute for medical treatment.",
  },
};

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    const val = source[key];
    if (val && typeof val === "object" && !Array.isArray(val)) {
      target[key] = target[key] && typeof target[key] === "object" ? target[key] : {};
      deepMerge(target[key], val);
    } else {
      target[key] = val;
    }
  }
  return target;
}

function faqBlockEn(topic) {
  return {
    one: {
      q: `How do I request ${topic}?`,
      a: "Call 0314-1000717, WhatsApp, or use the contact page. Clinic hours: Sunday–Thursday, 7:00–9:00 PM.",
    },
    two: {
      q: "Is this medical advice on the website?",
      a: "No. Pages share general clinic information only. The doctor assesses your case in person or by agreed contact.",
    },
    three: {
      q: "What should I bring to a visit?",
      a: "Bring any recent reports you have, a list of medicines you use, and arrive during published clinic hours.",
    },
  };
}

function faqBlockUr(topic) {
  return {
    one: {
      q: `${topic} کے لیے رابطہ کیسے کریں؟`,
      a: "0314-1000717، واٹس ایپ، یا رابطہ صفحہ۔ کلینک: اتوار–جمعرات شام 7–9 بجے۔",
    },
    two: {
      q: "کیا ویب سائٹ طبی مشورہ ہے؟",
      a: "نہیں — عام معلومات ہیں۔ معائنہ کلینک میں یا طے شدہ رابطے پر ہوتا ہے۔",
    },
    three: {
      q: "وزٹ پر کیا لائیں؟",
      a: "حالیہ رپورٹیں، ادویات کی فہرست، اور کلینک کے اوقات میں آئیں۔",
    },
  };
}

function homeoItem(slug, enTitle, urTitle) {
  const extra = HOMEOPATHY_DETAIL[slug] || {};
  const consultEn =
    "Book at Noori Roohani Homeo Clinic, Surjani Town — call 0314-1000717 or WhatsApp during Sun–Thu 7–9 PM.";
  const consultUr = "سرجانی ٹاؤن کلینک — 0314-1000717 پر فون یا واٹس ایپ (اتوار–جمعرات شام 7–9 بجے)۔";
  return {
    en: {
      title: enTitle,
      summary: `Homeopathic consultation for ${enTitle.toLowerCase()}. General information only — not medical advice.`,
      documentTitle: `${enTitle} — Homeopathy | Noori Roohani Homeo Clinic`,
      metaDescription: `${enTitle} at Noori Roohani Homeo Clinic, Surjani Town, Karachi. Evening consultations Sun–Thu, 7–9 PM.`,
      imageAlt: `${enTitle} — consultation at Noori Roohani Homeo Clinic`,
      overview: extra.overview || `Consultation for ${enTitle.toLowerCase()} at the clinic.`,
      approach: extra.approach || "History-led homeopathic care with follow-up when needed.",
      whoBenefits: `Adults and families seeking a private homeopathic consultation for ${enTitle.toLowerCase()}. Suitable when you want case-based care — not emergency treatment.`,
      benefits:
        "Private consultation at Surjani Town; history-led remedy selection; follow-up during clinic hours; clear guidance without online diagnosis.",
      consult: consultEn,
      faq: faqBlockEn(enTitle.toLowerCase()),
    },
    ur: {
      title: urTitle,
      summary: `${urTitle} کے لیے ہومیوopathic مشاورت۔ عمومی معلومات — طبی مشورے کی جگہ نہیں۔`,
      documentTitle: `${urTitle} — ہومیو | نوری روحانی ہومیو کلینک`,
      metaDescription: `نوری روحانی ہومیو کلینک، سرجانی ٹاؤن — ${urTitle}۔ شام 7–9 بجے مشاورت۔`,
      imageAlt: `${urTitle} — نوری روحانی ہومیو کلینک`,
      overview: extra.overview || `${urTitle} کے لیے کلینک میں مشاورت۔`,
      approach: extra.approach || "تاریخ اور فالو اپ کے ساتھ ہومیوopathic دیکھ بھال۔",
      whoBenefits: `${urTitle} کے لیے نجی ہومیوopathic مشاورت چاہنے والے مریض اور خاندان۔`,
      benefits: "سرجانی ٹاؤن پر نجی مشاورت؛ تاریخ پر مبنی علاج؛ فالو اپ۔",
      consult: consultUr,
      faq: faqBlockUr(urTitle),
    },
  };
}

function spiritualItem(slug, enTitle, urTitle) {
  const whoEn =
    slug === "rohani-ilaj"
      ? "Individuals seeking confidential Rohani guidance with adab — including concerns about nazar, jadu, or household unrest."
      : `Those who need ${enTitle.toLowerCase()} through the clinic's Islamic and community services.`;
  const whoUr =
    slug === "rohani-ilaj"
      ? "روحانی رہنمائی چاہنے والے — ناز، جادو، یا گھریلو پریشانی — ادب کے ساتھ۔"
      : `${urTitle} کے لیے کلینک کی اسلامی و کمیونٹی خدمات چاہنے والے۔`;
  return {
    en: {
      title: enTitle,
      summary: `${enTitle} at Noori Roohani Homeo Clinic with adab, privacy, and community care.`,
      documentTitle: `${enTitle} | Noori Roohani Homeo Clinic`,
      metaDescription: `${enTitle} in Surjani Town, Karachi. Contact 0314-1000717 — Sun–Thu 7–9 PM.`,
      imageAlt: `${enTitle} — Noori Roohani Homeo Clinic`,
      overview: `Our clinic provides ${enTitle.toLowerCase()} as part of Rohani and community services listed on the official schedule.`,
      whatToExpect: "Call ahead to confirm timing, requirements, and whether an appointment is needed.",
      whoBenefits: whoEn,
      benefits: "Handled with privacy and adab; clear next steps after you contact the clinic; no sensational claims online.",
      contactNote: "Phone 0314-1000717 or email nooriroohaniclinic@gmail.com during clinic hours.",
      faq: faqBlockEn(enTitle.toLowerCase()),
    },
    ur: {
      title: urTitle,
      summary: `${urTitle} — نوری روحانی ہومیو کلینک میں ادب اور رازداری کے ساتھ۔`,
      documentTitle: `${urTitle} | نوری روحانی ہومیو کلینک`,
      metaDescription: `${urTitle} — سرجانی ٹاؤن۔ رابطہ: 0314-1000717`,
      imageAlt: `${urTitle} — کلینک`,
      overview: `کلینک کی سرکاری فہرست کے مطابق ${urTitle} کی سہولت۔`,
      whatToExpect: "وقت اور ضروریات کے لیے پہلے فون کریں۔",
      whoBenefits: whoUr,
      benefits: "رازداری و ادب؛ رابطے کے بعد اگلے قدم؛ آن لائن کوئی دعوے نہیں۔",
      contactNote: "0314-1000717 یا nooriroohaniclinic@gmail.com",
      faq: faqBlockUr(urTitle),
    },
  };
}

function productItem(slug, enTitle, urTitle) {
  const extra = PRODUCT_DETAIL[slug] || {};
  return {
    en: {
      title: enTitle,
      short: `${enTitle} from the clinic herbal range — enquire stock and price on 0314-1000717.`,
      documentTitle: `${enTitle} | Noori Roohani Homeo Clinic`,
      metaDescription: `${enTitle} at Noori Roohani Homeo Clinic, Surjani Town. Confirm price and directions before use.`,
      imageAlt: `${enTitle} — Noori Roohani Homeo Clinic`,
      price: "Price: confirm at clinic or on WhatsApp 0314-1000717",
      details: extra.details || `${enTitle} — prepared herbal product. Ask staff for label details.`,
      usage: extra.usage || "Use as directed on the packaging. Stop use if irritation occurs.",
    },
    ur: {
      title: urTitle,
      short: `${urTitle} — کلینک کی جڑی بوٹی رینج؛ دستیابی 0314-1000717 پر پوچھیں۔`,
      documentTitle: `${urTitle} | نوری روحانی ہومیو کلینک`,
      metaDescription: `${urTitle} — نوری روحانی ہومیو کلینک، سرجانی ٹاؤن۔`,
      imageAlt: `${urTitle} — کلینک`,
      price: "قیمت: کلینک یا واٹس ایپ 0314-1000717 پر تصدیق کریں",
      details: extra.details || `${urTitle} — جڑی بوٹی مصنوع۔`,
      usage: extra.usage || "لیبل کے مطابق استعمال کریں۔",
    },
  };
}

function buildPages(lang) {
  const isEn = lang === "en";
  const homeoItems = {};
  for (const [slug, enT, urT] of HOMEOPATHY) {
    const pair = homeoItem(slug, enT, urT);
    homeoItems[slug] = isEn ? pair.en : pair.ur;
  }
  const spiritualItems = {};
  for (const [slug, enT, urT] of SPIRITUAL) {
    const pair = spiritualItem(slug, enT, urT);
    spiritualItems[slug] = isEn ? pair.en : pair.ur;
  }
  const productItems = {};
  for (const [slug, enT, urT] of PRODUCTS) {
    const pair = productItem(slug, enT, urT);
    productItems[slug] = isEn ? pair.en : pair.ur;
  }

  const hubHomeo = isEn
    ? {
        documentTitle: "Homeopathic services | Noori Roohani Homeo Clinic",
        metaDescription: "Browse homeopathic services and book a consultation.",
        kicker: "Services",
        title: "Homeopathic services",
        lead: "Individual pages for each area we support at the clinic.",
        breadcrumbCurrent: "Homeopathic services",
        gridHeading: "Homeopathic service list",
        visualAlt: "Homeopathy consultation",
        approachTitle: "How consultations work",
        approachText: "History-led care with follow-up. We do not promise outcomes online.",
      }
    : {
        documentTitle: "ہومیوopathic خدمات | نوری روحانی ہومیو کلینک",
        metaDescription: "ہومیوopathic خدمات اور اپائنٹمنٹ۔",
        kicker: "خدمات",
        title: "ہومیوopathic خدمات",
        lead: "ہر شعبے کی الگ صفحہ — کلینک کے مطابق ترمیم کریں۔",
        breadcrumbCurrent: "ہومیوopathic خدمات",
        gridHeading: "خدمات کی فہرست",
        visualAlt: "مشاورت",
        approachTitle: "مشاورت کا طریقہ",
        approachText: "تاریخ اور فالو اپ۔ آن لائن کوئی ضمانت نہیں۔",
      };

  const hubSpiritual = isEn
    ? {
        documentTitle: "Islamic & spiritual services | Noori Roohani Homeo Clinic",
        metaDescription: "Rohani ilaj, Quran teaching, madrasa, nikkah, and community programmes.",
        kicker: "Community",
        title: "Islamic & spiritual services",
        lead: "Educational and spiritual support with clear adab.",
        breadcrumbCurrent: "Islamic services",
        gridHeading: "Islamic service list",
        visualAlt: "Spiritual services",
        noteTitle: "Privacy and adab",
        noteText: "Sensitive cases are handled quietly. Confirm details with the clinic.",
        cta: "Contact for guidance",
      }
    : {
        documentTitle: "اسلامی و روحانی خدمات | نوری روحانی ہومیو کلینک",
        metaDescription: "روحانی علاج، قرآن، مدرسہ، نکاح و دیگر۔",
        kicker: "کمیونٹی",
        title: "اسلامی و روحانی خدمات",
        lead: "ادب کے ساتھ تعلیمی و روحانی خدمات۔",
        breadcrumbCurrent: "اسلامی خدمات",
        gridHeading: "خدمات کی فہرست",
        visualAlt: "روحانی خدمات",
        noteTitle: "رازداری و ادب",
        noteText: "حساس معاملات خاموشی سے۔ کلینک سے تصدیق کریں۔",
        cta: "رہنمائی کے لیے رابطہ",
      };

  const hubProducts = isEn
    ? {
        documentTitle: "Herbal products & perfumes | Noori Roohani Homeo Clinic",
        metaDescription: "Attar, oils, soaps, and herbal products — confirm price with clinic.",
        kicker: "Shop",
        title: "Herbal products & perfumes",
        lead: "Placeholder catalogue — replace images and copy when labels are ready.",
        breadcrumbCurrent: "Products",
        gridHeading: "Product catalogue",
        viewDetails: "View details",
        disclaimer: "Confirm price, ingredients, and directions at the clinic or on 0314-1000717 before use.",
        inquiryCta: "Product inquiry",
      }
    : {
        documentTitle: "جڑی بوٹی مصنوعات | نوری روحانی ہومیو کلینک",
        metaDescription: "عطر، تیل، صابن — قیمت کلینک سے۔",
        kicker: "دکان",
        title: "جڑی بوٹی مصنوعات و عطر",
        lead: "[PLACEHOLDER] تصاویر و متن درست کریں۔",
        breadcrumbCurrent: "مصنوعات",
        gridHeading: "مصنوعات کی فہرست",
        viewDetails: "تفصیل دیکھیں",
        disclaimer: "[PLACEHOLDER] لیبل کے مطابق قیمت و اجزا۔",
        inquiryCta: "مصنوع کی پوچھ گچھ",
      };

  const mehfil = isEn
    ? {
        documentTitle: "Monthly Mehfil | Noori Roohani Homeo Clinic",
        metaDescription: "Monthly mehfil in the second week of each month.",
        kicker: "Events",
        title: "Monthly Mehfil",
        lead: "Community gathering — exact dates confirmed monthly.",
        breadcrumbCurrent: "Monthly Mehfil",
        imageAlt: "Mehfil gathering",
        scheduleHeading: "Schedule",
        scheduleText: "Planned for the {week} week of each month. [PLACEHOLDER] Set your fixed day.",
        upcomingDate: "[PLACEHOLDER] Next event: [DATE]",
        aboutHeading: "About the gathering",
        aboutText: "[PLACEHOLDER] Describe adab, venue, and who may attend.",
        participateHeading: "Participate",
        participateText: "[PLACEHOLDER] RSVP or contact instructions.",
        cta: "Contact about Mehfil",
      }
    : {
        documentTitle: "ماہانہ محفل | نوری روحانی ہومیو کلینک",
        metaDescription: "ہر ماہ دوسرے ہفتے میں محفل۔",
        kicker: "تقریبات",
        title: "ماہانہ محفل",
        lead: "برادری کی محفل — تاریخیں ماہانہ طے ہوتی ہیں۔",
        breadcrumbCurrent: "ماہانہ محفل",
        imageAlt: "محفل",
        scheduleHeading: "شیڈول",
        scheduleText: "ہر ماہ کے {week} ہفتے میں منصوبہ۔ [PLACEHOLDER]",
        upcomingDate: "[PLACEHOLDER] اگلی تاریخ: [DATE]",
        aboutHeading: "محفل کے بارے میں",
        aboutText: "[PLACEHOLDER] تفصیل یہاں۔",
        participateHeading: "شرکت",
        participateText: "[PLACEHOLDER] رابطہ کی ہدایات۔",
        cta: "محفل کے بارے میں رابطہ",
      };

  const detailHomeo = isEn
    ? {
        kicker: "Homeopathic service",
        overviewHeading: "Overview",
        whoBenefitsHeading: "Who may benefit",
        approachHeading: "What to expect",
        benefitsHeading: "Key information",
        consultHeading: "Book a consultation",
        relatedHeading: "Related services",
        faqLabel: "Questions",
        faqHeading: "Service FAQs",
        finalCtaTitle: "Ready to book?",
        finalCtaLede: "Evening appointments at Surjani Town — call or message during clinic hours.",
      }
    : {
        kicker: "ہومیوopathic خدمت",
        overviewHeading: "خلاصہ",
        whoBenefitsHeading: "کس کے لیے موزوں",
        approachHeading: "کیا توقع رکھیں",
        benefitsHeading: "اہم معلومات",
        consultHeading: "مشاورت بک کریں",
        relatedHeading: "متعلقہ خدمات",
        faqLabel: "سوالات",
        faqHeading: "عام سوالات",
        finalCtaTitle: "بکنگ کے لیے تیار؟",
        finalCtaLede: "سرجانی ٹاؤن — کلینک کے اوقات میں رابطہ کریں۔",
      };

  const detailSpiritual = isEn
    ? {
        kicker: "Islamic service",
        overviewHeading: "Service overview",
        whoBenefitsHeading: "Who may benefit",
        whatHeading: "What to expect",
        benefitsHeading: "Key information",
        contactHeading: "Contact & next steps",
        contactCta: "Contact clinic",
        relatedHeading: "Related services",
        faqLabel: "Questions",
        faqHeading: "Service FAQs",
        finalCtaTitle: "Speak with the clinic",
        finalCtaLede: "Confirm timing and adab for this service before you visit.",
      }
    : {
        kicker: "اسلامی خدمت",
        overviewHeading: "خدمت کا تعارف",
        whoBenefitsHeading: "کس کے لیے",
        whatHeading: "کیا توقع رکھیں",
        benefitsHeading: "اہم معلومات",
        contactHeading: "رابطہ",
        contactCta: "کلینک سے رابطہ",
        relatedHeading: "متعلقہ خدمات",
        faqLabel: "سوالات",
        faqHeading: "عام سوالات",
        finalCtaTitle: "کلینک سے رابطہ",
        finalCtaLede: "آنے سے پہلے وقت اور ادب کی تصدیق کریں۔",
      };

  const detailProducts = isEn
    ? {
        kicker: "Product",
        detailsHeading: "Details",
        usageHeading: "How to use & safety",
        relatedHeading: "Related products",
        orderCta: "Order on WhatsApp",
        inquiryCta: "Ask on contact page",
      }
    : {
        kicker: "مصنوع",
        detailsHeading: "تفصیل",
        usageHeading: "استعمال و احتیاط",
        relatedHeading: "متعلقہ مصنوعات",
        orderCta: "واٹس ایپ پر آرڈر",
        inquiryCta: "رابطہ صفحہ پر پوچھیں",
      };

  const servicesIndex = isEn
    ? {
        documentTitle: "Clinic services | Noori Roohani Homeo Clinic",
        metaDescription:
          "Homeopathic consultations, Rohani ilaj, Quran teaching, herbal products, and community programmes in Surjani Town, Karachi.",
        breadcrumbCurrent: "Services",
        kicker: "Our services",
        title: "Complete clinic services",
        lead: "Homeopathy, Islamic support, herbal products, and community programmes — each with its own page and clear contact path.",
        heroSecondary: "Homeopathic services",
        viewAll: "View all services",
        backToAll: "← All services",
        backToCategory: "← Back to {category}",
        intro: {
          label: "At the clinic",
          title: "Care across body, spirit, and community",
          lede: "Noori Roohani Homeo Clinic combines evening homeopathic consultations with Rohani ilaj and education listed on the official schedule.",
          body: "Browse by category below or open any service for overview, who it may help, what to expect, and how to book. General information only — not medical advice online.",
          imageAlt: "Clinic consultation room",
        },
        hubs: {
          label: "Categories",
          title: "Start by service type",
          lede: "Four main areas — each hub links to detailed pages.",
        },
        catalog: {
          label: "Full list",
          title: "All consultation & community services",
          lede: "19 dedicated pages for homeopathic and Islamic services at this clinic.",
        },
        why: {
          label: "Why families choose us",
          title: "Professional, private, and local",
          lede: "Verified clinic details — no invented statistics.",
          items: {
            one: { title: "Evening appointments", text: "Sunday–Thursday, 7:00–9:00 PM at Surjani Town — easy for working families." },
            two: { title: "Clear contact", text: "Phone 0314-1000717, WhatsApp, and nooriroohaniclinic@gmail.com." },
            three: { title: "Adab in spiritual care", text: "Rohani and Islamic services handled with privacy — no sensational claims." },
            four: { title: "Follow-up care", text: "Homeopathic cases include follow-up visits when your doctor advises." },
          },
        },
        process: {
          label: "Your visit",
          title: "A simple, reassuring process",
          steps: {
            one: { title: "Contact or arrive", text: "Call, WhatsApp, or use the contact form during clinic hours." },
            two: { title: "Consultation", text: "Share history and concerns in a private setting with the clinic team." },
            three: { title: "Next steps", text: "Remedy plan, spiritual guidance, or product advice — with follow-up when needed." },
          },
        },
        faq: {
          label: "FAQ",
          title: "Common questions",
          one: { q: "Where is the clinic?", a: "Plot No. CI-05, Moon Arcade, Sector L-1, Near Makkah Hotel, Surjani Town, Karachi." },
          two: { q: "What are clinic hours?", a: "Sunday–Thursday, 7:00–9:00 PM. Friday and Saturday closed." },
          three: { q: "How do I book?", a: "Use the contact page, call 0314-1000717, or WhatsApp during open hours." },
          four: { q: "Are products sold online?", a: "Herbal products are listed for information — confirm price and stock by phone or at the clinic." },
          five: { q: "Is emergency care available here?", a: "This is an evening clinic. Use hospital emergency services for urgent medical emergencies." },
        },
        cta: {
          title: "Book your consultation",
          lede: "We respond during published hours. Bring any reports you already have.",
        },
      }
    : {
        documentTitle: "کلینک کی خدمات | نوری روحانی ہومیو کلینک",
        metaDescription: "ہومیو، روحانی علاج، قرآن، جڑی بوٹی — سرجانی ٹاؤن۔",
        breadcrumbCurrent: "خدمات",
        kicker: "ہماری خدمات",
        title: "مکمل کلینک خدمات",
        lead: "ہر شعبے کا الگ صفحہ — واضح رابطہ۔",
        heroSecondary: "ہومیوopathic خدمات",
        viewAll: "تمام خدمات",
        backToAll: "← تمام خدمات",
        backToCategory: "← {category}",
        intro: {
          label: "کلینک پر",
          title: "جسم، روح اور کمیونٹی",
          lede: "شام کی ہومیو مشاورت اور روحانی و تعلیمی خدمات۔",
          body: "نیچے زمرے یا ہر خدمت کا صفحہ کھولیں — عام معلومات، طبی مشورہ نہیں۔",
          imageAlt: "مشاورت",
        },
        hubs: {
          label: "زمرے",
          title: "قسم کے لحاظ سے",
          lede: "چار اہم شعبے — ہر ہب تفصیلی صفحات سے جڑا ہے۔",
        },
        catalog: {
          label: "مکمل فہرست",
          title: "تمام مشاورت و کمیونٹی خدمات",
          lede: "19 صفحات — ہومیو اور اسلامی خدمات۔",
        },
        why: {
          label: "اہلیت",
          title: "پیشہ ورانہ و مقامی",
          lede: "حقیقی کلینک تفصیلات۔",
          items: {
            one: { title: "شام کے اوقات", text: "اتوار–جمعرات 7–9 بجے، سرجانی ٹاؤن۔" },
            two: { title: "واضح رابطہ", text: "0314-1000717، واٹس ایپ، ای میل۔" },
            three: { title: "ادب", text: "روحانی خدمات بغیر دعوے کے۔" },
            four: { title: "فالو اپ", text: "ہومیو کیسز میں فالو اپ جب مشورہ دیا جائے۔" },
          },
        },
        process: {
          label: "آپ کا دورہ",
          title: "آسان عمل",
          steps: {
            one: { title: "رابطہ", text: "فون، واٹس ایپ، یا فارم — کلینک کے اوقات میں۔" },
            two: { title: "مشاورت", text: "نجی ماحول میں تاریخ اور مسائل۔" },
            three: { title: "اگلے قدم", text: "علاج، رہنمائی، یا مصنوع — ضرورت پر فالو اپ۔" },
          },
        },
        faq: {
          label: "سوالات",
          title: "عام سوالات",
          one: { q: "پتہ؟", a: "سرجانی ٹاؤن، سیکٹر L-1، نزد مکہ ہوٹل۔" },
          two: { q: "اوقات؟", a: "اتوار–جمعرات 7–9 شام۔ جمعہ و ہفتہ بند۔" },
          three: { q: "بکنگ؟", a: "رابطہ صفحہ، 0314-1000717، یا واٹس ایپ۔" },
          four: { q: "آن لائن مصنوعات؟", a: "قیمت و اسٹاک فون یا کلینک سے تصدیق کریں۔" },
          five: { q: "ایمرجنسی؟", a: "فوری طبی ایمرجنسی کے لیے ہسپتال جائیں۔" },
        },
        cta: {
          title: "مشاورت بک کریں",
          lede: "اوقات میں رابطہ کریں؛ رپورٹیں ساتھ لائیں۔",
        },
      };

  return {
    services: { index: servicesIndex },
    homeopathy: { hub: hubHomeo, detail: detailHomeo, items: homeoItems },
    spiritual: { hub: hubSpiritual, detail: detailSpiritual, items: spiritualItems },
    products: { hub: hubProducts, detail: detailProducts, items: productItems },
    mehfil,
  };
}

function buildUiExtension(lang) {
  const isEn = lang === "en";
  return {
    a11y: { breadcrumbs: isEn ? "Breadcrumb navigation" : "بریڈ کرمب نیویگیشن" },
    nav: {
      drawer: isEn
        ? { homeopathy: "Homeopathic services", spiritual: "Islamic & spiritual services", mehfil: "Monthly Mehfil" }
        : { homeopathy: "ہومیوopathic خدمات", spiritual: "اسلامی و روحانی خدمات", mehfil: "ماہانہ محفل" },
      servicesMenu: isEn
        ? {
            all: "All services",
            mehfilNav: "Monthly Mehfil",
            spiritualAll: "All Islamic services",
            nikkah: "Nikkah services",
          }
        : {
            all: "تمام خدمات",
            mehfilNav: "ماہانہ محفل",
            spiritualAll: "تمام اسلامی خدمات",
            nikkah: "نکاح کی خدمات",
          },
    },
    footer: {
      quickLinks: isEn
        ? { homeopathy: "Homeopathic services", spiritual: "Islamic & spiritual services", mehfil: "Monthly Mehfil" }
        : { homeopathy: "ہومیوopathic خدمات", spiritual: "اسلامی و روحانی خدمات", mehfil: "ماہانہ محفل" },
    },
    home: {
      hero: {
        slider: isEn
          ? {
              controlsAria: "Hero slides",
              prevAria: "Previous slide",
              nextAria: "Next slide",
              goToSlide: "Go to slide {n}",
              slideLabel: "Slide",
              thumbsAria: "Slide thumbnails",
            }
          : {
              controlsAria: "ہیرو سلائیڈز",
              prevAria: "پچھلی سلائیڈ",
              nextAria: "اگلی سلائیڈ",
              goToSlide: "سلائیڈ {n}",
              slideLabel: "سلائیڈ",
              thumbsAria: "سلائیڈ thumbnails",
            },
        slides: isEn
          ? {
              professor: {
                label: "Professor & specialist",
                title: "Experienced guidance for families",
                subtitle: "Consultation-led care across homeopathy, herbal support, and Rohani ilaj.",
                primaryCta: "Book appointment",
                secondaryCta: "WhatsApp us",
                imageAlt: "Clinic founder",
              },
              homeopathy: {
                label: "Homeopathy & clinic care",
                title: "Homeopathic consultations",
                subtitle: "Structured appointments for common health concerns with follow-up when needed.",
                primaryCta: "Browse services",
                secondaryCta: "Contact clinic",
                imageAlt: "Homeopathy consultation",
              },
              spiritual: {
                label: "Spiritual services",
                title: "Rohani ilaj & Islamic support",
                subtitle: "Confidential guidance with dua and adab — no sensational claims.",
                primaryCta: "Spiritual services",
                secondaryCta: "Ask a question",
                imageAlt: "Spiritual support",
              },
              herbal: {
                label: "Herbal & natural care",
                title: "Products made familiar",
                subtitle: "Attar, oils, creams, and soaps — confirm price with the clinic.",
                primaryCta: "View products",
                secondaryCta: "Product inquiry",
                imageAlt: "Herbal products",
              },
            }
          : {
              professor: {
                label: "پروفیسر و ماہر",
                title: "خاندانوں کے لیے تجربہ کار رہنمائی",
                subtitle: "ہومیو، جڑی بوٹی اور روحانی علاج — مشاورت پر مبنی۔",
                primaryCta: "اپائنٹمنٹ بک کریں",
                secondaryCta: "واٹس ایپ",
                imageAlt: "بانی",
              },
              homeopathy: {
                label: "ہومیوopathic علاج",
                title: "ہومیوopathic مشاورت",
                subtitle: "عام صحت کے مسائل کے لیے منظم مشاورت۔",
                primaryCta: "خدمات دیکھیں",
                secondaryCta: "رابطہ",
                imageAlt: "مشاورت",
              },
              spiritual: {
                label: "روحانی خدمات",
                title: "روحانی علاج و اسلامی تعاون",
                subtitle: "ادب اور رازداری — کوئی دعوے نہیں۔",
                primaryCta: "روحانی خدمات",
                secondaryCta: "سوال پوچھیں",
                imageAlt: "روحانی",
              },
              herbal: {
                label: "جڑی بوٹی و قدرتی علاج",
                title: "مانوس مصنوعات",
                subtitle: "عطر، تیل، کریم — قیمت کلینک سے۔",
                primaryCta: "مصنوعات",
                secondaryCta: "پوچھ گچھ",
                imageAlt: "مصنوعات",
              },
            },
      },
      productsSection: isEn
        ? {
            viewCatalog: "View all products",
            viewProduct: "View product",
            disclaimer: "Confirm price and directions with the clinic (0314-1000717) before use.",
          }
        : {
            viewCatalog: "تمام مصنوعات",
            viewProduct: "مصنوع دیکھیں",
            disclaimer: "[PLACEHOLDER] استعمال سے پہلے کلینک سے تصدیق کریں۔",
          },
      homeopathySection: isEn
        ? {
            label: "Homeopathic care",
            title: "Homeopathic services",
            lead: "Browse conditions we commonly support — edit each page with your clinic wording.",
            viewAll: "All homeopathic services",
            imageAlt: "Homeopathy consultation",
          }
        : {
            label: "ہومیوopathic علاج",
            title: "ہومیوopathic خدمات",
            lead: "عام شعبے — ہر صفحہ درست کریں۔",
            viewAll: "تمام خدمات",
            imageAlt: "مشاورت",
          },
      spiritualHub: isEn
        ? {
            label: "Islamic & spiritual",
            title: "Spiritual and educational services",
            lead: "Rohani ilaj, Quran, madrasa, nikkah, and community programmes.",
            viewAll: "All Islamic services",
            imageAlt: "Community services",
          }
        : {
            label: "اسلامی و روحانی",
            title: "روحانی و تعلیمی خدمات",
            lead: "روحانی علاج، قرآن، مدرسہ، نکاح و دیگر۔",
            viewAll: "تمام اسلامی خدمات",
            imageAlt: "کمیونٹی",
          },
      mehfilPreview: isEn
        ? {
            label: "Community",
            title: "Monthly Mehfil",
            lead: "Held in the second week of each month — {week}. Confirm dates with the clinic.",
            dateNote: "[PLACEHOLDER] Next date: confirm with clinic",
            cta: "Mehfil details",
            contactCta: "Contact to join",
            imageAlt: "Mehfil",
          }
        : {
            label: "کمیونٹی",
            title: "ماہانہ محفل",
            lead: "ہر ماہ دوسرے ہفتے — {week}۔ تاریخ کلینک سے۔",
            dateNote: "[PLACEHOLDER] اگلی تاریخ",
            cta: "محفل کی تفصیل",
            contactCta: "شرکت کے لیے رابطہ",
            imageAlt: "محفل",
          },
    },
  };
}

for (const lang of ["en", "ur"]) {
  const file = join(i18nDir, `${lang}.json`);
  const base = JSON.parse(readFileSync(file, "utf8"));
  deepMerge(base, { pages: buildPages(lang), ...buildUiExtension(lang) });
  writeFileSync(file, `${JSON.stringify(base, null, 2)}\n`);
  console.log(`Updated ${lang}.json`);
}
