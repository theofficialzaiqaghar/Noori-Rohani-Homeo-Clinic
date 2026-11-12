# Noori Roohani Homeo Clinic

Full-stack clinic website: React (Vite) public site with GSAP, Lenis, and Framer Motion; Express + JSON file store (`data/clinic.json`) CMS at `/admin` for media, typography, and brand settings.

## Commands

```bash
npm install
npm run dev       # Vite :5173 + API :3001 (proxy /api and /uploads)
npm run build     # Production bundle in /dist
npm start         # Serve dist + API + uploads (set NODE_ENV=production)
npm run qa        # en.json / ur.json key parity
```

Copy `.env.example` to `.env` and set `SESSION_SECRET`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD`. Optional: `VITE_SITE_URL=https://nooriroohanihomeoclinic.com` (default is in `src/lib/clinicInfo.js`; sitemap, robots, and `index.html` SEO URLs refresh on `npm run build`). Admin password is bcrypt-hashed on first server start; credentials are never exposed to the browser.

## Admin

- URL: [http://localhost:5173/admin](http://localhost:5173/admin) (dev) or `/admin` on your production host
- Login uses server-side sessions (`nrhc.sid` cookie)
- Media uploads persist under `uploads/`; settings in `data/clinic.json`

## Architecture

| Area | Path |
|------|------|
| Public UI | `src/PublicApp.jsx`, `src/sections/` |
| Admin UI | `src/admin/` |
| API | `server/` |
| i18n source | `assets/i18n/` (synced to `public/assets` on dev/build) |
| Legacy static site | `index.legacy.html` |

Public site loads `/api/public/site` for theme, typography CSS variables, image slots, and footer social links.

## Design

- **Typography:** Plus Jakarta Sans by default (configurable in admin); controlled heading scale via CSS variables
- **Motion:** GSAP + ScrollTrigger, Lenis, Framer Motion
- **Palette:** brand colors from admin / `src/styles/tokens.css`

See `SEO-NOTES.md` for launch checklist.
