import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL } from "../src/lib/clinicInfo.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.env.VITE_SITE_URL || SITE_URL).replace(/\/$/, "");

const body = `# Noori Roohani Homeo Clinic

> Rohani ilaj, homeopathic consultations, herbal products, Quran teaching, and community education in Karachi, Pakistan.

## Business

- Name: Noori Roohani Homeo Clinic
- Website: ${base}/
- Address: Plot No. CI-05, Moon Arcade, Flat, Sector L-1, Near Makkah Hotel, Surjani Town, Karachi, Pakistan
- Phone: 0314-1000717
- Email: nooriroohaniclinic@gmail.com
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

## Note

See ${base}/sitemap.xml for all public routes.
`;

writeFileSync(join(root, "public", "llms.txt"), body);
console.log(`llms.txt → ${base}`);
