# After630 — Phase 1 Website

A Next.js (App Router, TypeScript) implementation of After630's Phase 1 discovery
website: browse curated group trips and enquire on WhatsApp. The team confirms
availability, payment and booking manually — there is no checkout, login or
automated confirmation in this phase.

This project was built from the approved HTML/CSS/JS design handoff and the
UX implementation spec (see `../handoff/` in the parent directory for the
original source material and product boundaries).

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in real values when you have them — see below
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:unit` | Vitest — trip filters, availability state machine, WhatsApp message builders, image manifest/loader |
| `npm run test:e2e` | Playwright — navigation, filters, trip detail, accessibility, responsive (see below) |
| `npm run images:upload` | Uploads any new/changed entries in `src/content/images.ts` to Cloudinary (see below) |

## Configuration (`.env.local`)

Copy `.env.example` and fill in values as they become available. Nothing is
required to run the site locally — every missing value degrades to an honest
"not connected yet" UI state rather than a guess or a placeholder that looks
real. See `.env.example` for the full list and what each one controls
(WhatsApp number, trip data source, contact details, indexing, legal
approval).

### Trip data (`AFTER630_TRIP_SOURCE`)

- `live` — only `src/content/trips.ts` (empty until the owner adds real trips). This is what a real launch uses.
- `demo` (default) — adds the 8 illustrative concept trips ported from the design handoff. All of them are permanently `coming-soon` with zero departures, so the booking selector never has anything fake to show — they exist to prove out the listing/filter/detail UI, nothing more.
- `qa` — adds a few additional fixtures with fake departures/prices, used only by the Playwright suite to exercise the departure → origin → package selector and the sold-out/postponed states end to end.

## Adding a real trip

Add an entry to `realTrips` in `src/content/trips.ts`, following the `Trip`
type in `src/lib/trips/types.ts`. Leave `priceINR`/dates out entirely rather
than guessing — the UI shows "To be announced" / "Price on enquiry" for
anything unset, and never a fabricated value. Set `AFTER630_TRIP_SOURCE=live`
once real trips exist and demo content should no longer show.

## Images (Cloudinary)

Every photo on the site — trip galleries, hero/section backgrounds, the
About/Past Experiences pages — is hosted on Cloudinary and delivered through
a custom `next/image` loader (`src/lib/cloudinary-loader.ts`), not Next's
own Image Optimization API. The **logo** (`public/brand/`), the browser/app
**icons** (`src/app/icon.png`, `apple-icon.png`, `favicon.ico`) and the 8
local SVG **fallback illustrations** (`public/images/fallback/`, shown if a
Cloudinary photo fails to load) stay on our own server on purpose — the
fallback especially must not depend on Cloudinary being up.

**Adding or replacing a photo:**

1. Add an entry to `src/content/images.ts` (pick a unique key, a descriptive
   `publicId` under an `after630/<area>/` folder, an `alt`, and a
   `sourceUrl` Cloudinary should fetch the photo from — any public image
   URL works, not only Unsplash).
2. Run `npm run images:upload` (reads `.env.local` for Cloudinary
   credentials — copy `.env.example` and fill those three in first). It
   skips entries already on Cloudinary, so it's safe to re-run any time.
3. Reference it from a component with `img("your-key")` from
   `src/lib/images.ts` — never hard-code a Cloudinary or source URL in a
   component, and never read `imageManifest` directly.

Real trip photos (once the owner supplies them) go the same way, e.g.
`after630/trips/<slug>/01.jpg`.

**Cloudinary env vars**: none are needed to build or run the site — the
cloud name (public by design; it's in every image URL) is built in via
`src/content/site.ts`, and `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` only overrides
it. `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` are needed **only** to
run `npm run images:upload` locally; keep them in `.env.local`, never on the
web server, and never prefixed `NEXT_PUBLIC_` (a unit test in
`tests/unit/images.test.ts` guards against that mistake).

## Meta Pixel

Built in but **off** until an ID is added. To turn it on, paste the Pixel ID
(digits only, from Meta Events Manager) into `metaPixelId` in
`src/content/site.ts`, then rebuild/redeploy. Nothing else to change.

What it sends once on:

| Event | When |
|---|---|
| `PageView` | Every page, including in-app navigation (no full reload) |
| `ViewContent` | A trip detail page — trip slug, name and category |
| `Contact` | Someone clicks a WhatsApp or email link (`method: whatsapp/email`) — the site's real conversion |

With no ID, no Meta script loads and no request goes to Facebook
(`tests/e2e/meta-pixel.spec.ts`). Before switching it on, update the Privacy
Policy's "Cookies and analytics" section (it currently says no tracking is
used) and consider a cookie-consent prompt.

## Project structure

```
src/
  app/            Routes (App Router) — one folder per page, plus sitemap.ts/robots.ts
  components/
    layout/       Header, footer, skip link, demo banner
    ui/           Button, Dialog, Accordion, SmartImage, Notice, StatusBadge, Breadcrumb...
    home/ trips/ trip/ contact/ faq/ legal/   Page-specific sections
  lib/
    trips/        Trip types, repository (single read path), filters, availability state machine
    whatsapp.ts   Message builders + wa.me link construction — never fabricates a number
    config.ts     Validated env access
    images.ts     img() — the only way components read the image manifest
    cloudinary-loader.ts   Custom next/image loader (see "Images" above)
  content/        Site copy, nav, FAQ, legal text, demo/QA/real trip data, images.ts manifest
scripts/
  upload-images-to-cloudinary.mjs   `npm run images:upload`
tests/
  unit/           Vitest
  e2e/            Playwright (navigation, explore-trips, trip-details, accessibility, responsive)
```

## What's implemented

See `IMPLEMENTATION_REPORT.md` for the full route/feature list, test results,
visual notes versus the original design handoff, and what the owner still
needs to supply before a real launch.

## Deploying

The site builds and runs with **no env file at all** (WhatsApp, Instagram,
email and the Cloudinary cloud name are built in via `src/content/site.ts`).
On the server:

```bash
npm ci
npm run build
npm run start            # serves on port 3000 (use -p to change)
```

Nothing else needs configuring for launch: the domain (`https://after630.club`)
and search-engine indexing (on) are built in too. Optional overrides, set on
the host **before** `npm run build` (they're inlined at build time):

| Variable | Use |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | A different domain (e.g. a staging URL). |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` to block search engines (e.g. on staging). |
| `NEXT_PUBLIC_LEGAL_APPROVED` | `true` once Privacy/Terms/Cancellation text is legally approved — until then those 3 pages show a draft notice, are `noindex`, and are left out of `sitemap.xml`. |

Do **not** copy `.env.local` (it holds the Cloudinary API secret) to the
server — the site doesn't need it. See `IMPLEMENTATION_REPORT.md`
§"Launch blockers" for content still outstanding (real trips, legal copy).
