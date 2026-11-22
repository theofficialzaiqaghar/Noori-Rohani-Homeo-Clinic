import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE_URL,
  CLINIC_ADDRESS_EN,
  CLINIC_PHONE_DISPLAY,
} from "../src/lib/clinicInfo.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.env.VITE_SITE_URL || SITE_URL).replace(/\/$/, "");

const body = `# Noori Roohani Homeo Clinic

> Roohani ilaj, homeopathic consultations, herbal products, Quran teaching, and community education in Karachi, Pakistan.

## Business

- Name: Noori Roohani Homeo Clinic
- Website: ${base}/
- Address: ${CLINIC_ADDRESS_EN}
- Phone / WhatsApp: ${CLINIC_PHONE_DISPLAY}
- Hours: Sunday–Thursday 7:00 PM – 9:00 PM; Friday and Saturday closed

## Main pages

- Home: ${base}/
- About: ${base}/about
- Contact: ${base}/contact
- All services: ${base}/services
- Homeopathic services: ${base}/services/homeopathy
- Islamic & spiritual services: ${base}/services/spiritual
- Products: ${base}/products
- Monthly Mehfil: ${base}/events/mehfil
- Umrah Package: ${base}/umrah

## Note

See ${base}/sitemap.xml for all public routes.
`;

writeFileSync(join(root, "public", "llms.txt"), body);
console.log(`llms.txt → ${base}`);
