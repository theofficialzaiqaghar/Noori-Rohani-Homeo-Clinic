# SEO & launch checklist — Noori Roohani Homeo Clinic

Replace every placeholder before go-live. Run `npm run qa` to verify i18n key parity.

## Domain & URLs (critical)

| Item | File(s) | Placeholder |
|------|---------|-------------|
| Canonical URL | `index.html` `<link rel="canonical">` | `https://www.example.com/` |
| Open Graph URL | `index.html` `og:url` | same |
| `hreflang` links | `index.html` | `en`, `ur` (`/?lang=ur`), `x-default` |
| JSON-LD `@id` / URLs | `index.html` `<script type="application/ld+json">` | `https://www.example.com/` |
| Sitemap | `sitemap.xml` | all `<loc>` values |
| Robots sitemap line | `robots.txt` | Sitemap URL |

### hreflang structure (recommended)

This site uses **one HTML URL** with client-side language switching (`localStorage` + `?lang=ur`).

- **Good for users:** fast toggle, single page to maintain.
- **Limitation:** crawlers primarily index the default English HTML; Urdu content in JSON may not rank as a separate URL.
- **Best long-term SEO:** publish **`/en/`** and **`/ur/`** (or `/ur/index.html`) with the same content baked in each language, each with its own canonical, and keep `hreflang` pairs between them. Use `x-default` → English URL.
- Current setup documents Urdu at `/?lang=ur` for consistency with the language switcher; update sitemap/hreflang when you split URLs.

## Business details

| Item | Where |
|------|--------|
| Phone (display + E.164) | i18n `topbar.phone`, footer, contact section, JSON-LD `telephone` |
| Email | footer, form mailto, JSON-LD |
| Full address | footer, contact, JSON-LD `address` |
| Geo coordinates | JSON-LD `geo` `[LAT]` / `[LNG]` |
| Opening hours | topbar, footer, JSON-LD (must match reality) |
| City name | meta description `[City]`, JSON-LD `addressLocality` |

## Images & social

| Item | Action |
|------|--------|
| OG image | Export **`assets/img/og-image.svg`** to **1200×630 JPG** → `assets/img/og-image.jpg`; update `og:image` / `twitter:image` (currently `.jpg` in meta) |
| Hero | Add `hero.webp` / `hero.avif` optional; keep SVG fallback |
| Product photos | Replace SVG placeholders under `assets/img/products/` |
| Favicon PNG | Export **192×192** and **512×512** → `assets/icons/icon-192.png`, `icon-512.png` |
| Apple touch icon | **180×180** PNG → `assets/icons/apple-touch-icon.png` |
| Real clinic photos | Improves trust and LCP if optimized (WebP/AVIF, explicit dimensions) |

## Content to replace

- [ ] Testimonials (marked sample in HTML comment)
- [ ] Education counter numbers (`data-counter-value`)
- [ ] Social profile URLs (footer + JSON-LD `sameAs`)
- [ ] Google Business Profile / map embed (add near contact section when ready)
- [ ] Privacy Policy & Terms pages (`#privacy`, `#terms` currently hash-only)

## Target keywords (use naturally in copy — no stuffing)

Primary (site-wide):

- homeopathic clinic
- rohani ilaj
- nazar-e-bad ilaj

Secondary:

- herbal hair oil
- Quran teaching
- madrasa
- istikhara
- nikkah services

### Suggested local SEO list — `[City]` placeholder

Replace `[City]` with your city (e.g. Lahore, Faisalabad, Multan):

1. homeopathic clinic in [City]
2. rohani ilaj [City]
3. nazar e bad ka ilaj [City]
4. best homeo doctor in [City]
5. herbal hair oil [City]
6. Quran teacher near me [City]
7. madrasa admission [City]
8. istikhara service [City]
9. nikkah services [City]
10. ruqyah center [City]
11. spiritual healer [City] (use carefully — prefer “rohani ilaj” in Urdu markets)
12. free school education charity [City]

Add city + neighbourhood names in footer address and JSON-LD when confirmed.

## Performance workflow

```bash
npm install
npm run build    # outputs /dist with inlined critical CSS + minified app.min.css / app.min.js
npm run qa       # i18n key parity
```

Deploy **`dist/`** to production (or configure host to build on deploy).

- **Apache:** use `.htaccess` (compression, cache, 404).
- **Netlify:** copy `_headers` rules into `netlify.toml` or keep `_headers` at publish root.
- **Vercel:** `vercel.json` cache headers (configure 404 in dashboard to `404.html`).

Goals: LCP &lt; 2s (hero preload + critical CSS), TBT ≈ 0 (deferred module JS), CLS ≈ 0 (width/height on images, reserved card space).

No service worker (skipped — static assets already cache well with headers).

## Accessibility verified

- Skip link → `#main` (focusable with `tabindex="-1"`)
- Focus-visible styles on interactive elements
- Landmarks: `header`, `nav`, `main`, `footer`
- Form labels, `aria-invalid`, error regions
- `prefers-reduced-motion` in CSS and scroll behavior
- Urdu: RTL via `dir`, logical CSS, Nastaliq font loaded only when Urdu selected

## Pre-launch QA checklist

- [ ] Lighthouse mobile: Performance, Accessibility, Best Practices, SEO → target 100
- [ ] Test EN / UR toggle and `/?lang=ur` deep link
- [ ] 320px width: no horizontal scroll ( `overflow-x: clip` on body )
- [ ] Console: no failed fetches for i18n JSON
- [ ] FAQ text matches JSON-LD FAQPage exactly (English)
- [ ] Single H1 on home (hero title)
- [ ] Validate structured data: [Google Rich Results Test](https://search.google.com/test/rich-results)

## Title & description length (English)

- **Title:** `Noori Roohani Homeo Clinic | Rohani Ilaj & Homeo` (~48 characters)
- **Description:** under 160 characters (see `assets/i18n/en.json` → `meta.description`)

Urdu equivalents in `ur.json` → `meta.title` / `meta.description` (updated by `i18n.js` on switch).
