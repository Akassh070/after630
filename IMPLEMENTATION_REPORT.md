# After630 Phase 1 — Implementation Report

**Date:** 12 November 2026
**Source:** Built from `handoff/ui` (11 HTML prototypes, approved visual direction) and
`handoff/ux` (UX implementation spec + development prompt).
**Status:** Pre-deploy QA passed (12 Nov 2026) — ready to deploy. Demo trips and draft legal text still in place (see §7).

## 1. Routes implemented

All 11 required routes exist, build, and pass automated checks:

| Route | Notes |
|---|---|
| `/` | Hero, category tiles → `/trips?category=`, upcoming trips (real data, honestly labeled TBA/Coming soon), manifesto, experience grid, how-it-works, story, FAQ accordion, closing CTA |
| `/trips` | Search, category chips, duration/region/month filters, sort, URL-driven state (Back/Forward/reload-safe), active-filter chips, empty state, mobile filter sheet |
| `/trips/[slug]` | Gallery + keyboard lightbox, overview, itinerary accordion, inclusions/exclusions, travel & stay, trip FAQ, enquiry card (full state machine below), related trips, mobile sticky bar, end CTA. 8 demo slugs statically generated. |
| `/about` | Company story, two "chapters," beliefs |
| `/experiences` | Archive placeholders, clearly labeled as not-yet-real |
| `/contact` | Interactive enquiry composer (mirrors the trip detail message builder), contact methods |
| `/faq` | Search + category filter + accordion, 12 ported Q&As |
| `/privacy`, `/terms`, `/cancellation-refunds` | Shared `LegalPage` component, "design draft" notice, `noindex` until `NEXT_PUBLIC_LEGAL_APPROVED=true` |
| 404 (`not-found.tsx`) | Real links home / to trips |
| `sitemap.xml`, `robots.txt` | `robots.txt` disallows everything by default until `NEXT_PUBLIC_ALLOW_INDEXING=true` |

## 2. Core journey — what's real vs. honest-placeholder

- Homepage → `/trips` → `/trips/[slug]` are real routes end to end; no preview modals anywhere (the prototype's Explore Trips modal and "coming soon" dialogs were removed and replaced with real navigation).
- The enquiry card (`src/components/trip/EnquirySection.tsx`) implements the full state machine from the UX spec:
  - **enquire** (published trip with ≥1 available departure): departure → origin → package → traveller count (1–12), each step unlocking the next; sold-out departures are simply never offered (not shown-then-disabled); CTA disabled until the combination is complete.
  - **future-dates** (no confirmed departures — true for all 8 demo trips): "Ask About Future Dates," no price/date pretending to be real.
  - **sold-out / postponed / cancelled**: prominent status, no booking-style CTA as the primary action, a secondary "ask about other dates" option, and a clear "Explore other trips" path.
  - **completed**: status only, links to Past Experiences / Explore Trips.
  - Every state's WhatsApp message explicitly states it's an enquiry, not a booking (verified in `tests/unit/whatsapp.test.ts`).
- `NEXT_PUBLIC_AFTER630_WHATSAPP_NUMBER` is unset by default. With no number, every "enquire" action opens a **preview-and-copy dialog** instead of a dead or fake link; a `DemoBanner` surfaces this state site-wide. Never a fabricated number.
- Demo trips (`src/content/trips.demo.ts`) are the 8 prototype concepts, all `status: "coming-soon"`, zero departures — they can never appear bookable. QA-only fixtures with fake departures/prices exist solely for the Playwright suite (`AFTER630_TRIP_SOURCE=qa`) and are excluded from `demo`/`live`.

## 3. Deviations from the prototypes (intentional)

- **Unified navigation/footer.** The 11 prototypes each had a different header/nav set (homepage used only `#anchor` links, Explore Trips had its own set, Trip Details another). One real, coherent set is used everywhere: Home · Explore Trips · Past Experiences · Our Story · FAQs, plus a WhatsApp Enquiry link to `/contact`.
- **Color/contrast pass.** An axe-core scan of all 11 routes found the prototypes' muted gray-blue text (≈30 slightly different shades, e.g. `#627985`, `#6b8b9a`, `#7a949f`) failing WCAG AA (4.5:1) against the light backgrounds they sat on, and the base "eyebrow" label blue (`#257c9d`) failing at 4.4–4.49 almost everywhere it appeared. Fixed by: (a) darkening the shared `--color-blue-dark` token for all label/kicker/link text, keeping `--color-blue` for buttons/accents; (b) consolidating every failing muted gray into one verified-AA tone (`--color-muted`/`--color-body`, `#4f6b77`). Re-scanned clean on all 11 routes (`tests/e2e/accessibility.spec.ts`).
- **Homepage "Upcoming Trips" highlight card layout.** The prototype's featured-trip card used a fixed min-height with the title/description/actions absolutely positioned over the photo. With this app's actual (longer, real) button/meta content, that overflowed and overlapped the top badges at mobile widths. Rebuilt as a flex column where the image is pinned behind and the text block sizes naturally — same visual result, can't overlap regardless of content length.
- **Full-width page shell.** The prototypes boxed every page in a 1440px "review canvas" with a shadow, which left grey side strips on wider monitors. The shell is now full-bleed; section content is still capped by the 1260px `.container`.
- **Trip cards are real links**, not the prototype's `tripDialog`/`previewDialog` modals.

## 3a. Brand assets

Owner-supplied logo pack (vector SVG + PNG), saved in `public/brand/`:

| File | Use |
|---|---|
| `after630-logo-ink.svg` | Header — pack's `currentcolor` SVG with fill set to brand ink `#142b3b` |
| `after630-logo-white.svg` | Footer (dark background) — pack's white SVG |
| `after630-og-square.png` | Social share / Open Graph image — pack's square white-on-black 1024px |
| `src/app/favicon.ico`, `icon.svg`, `apple-icon.png`, `manifest.ts` + `public/android-chrome-*.png` | Browser/app icons — pack's favicon set (wordmark on black square) |


## 3b. Image hosting (Cloudinary)

All 37 unique photos used across the site (trip galleries, Hero/Manifesto/Story/ExperienceGrid/TripsHero slideshows, the Closing/End CTAs, About and Past Experiences) were moved off Unsplash and onto the owner's Cloudinary account (`idavlcrv`), delivered through a custom `next/image` loader instead of Next's own Image Optimization API.

- **Why a custom loader.** This Next.js version's `next/image` only supports `images.loader: "custom"` for an external CDN — the legacy `"cloudinary"` string loader exists only on `next/legacy/image`. `src/lib/cloudinary-loader.ts` builds `f_auto,q_auto,c_limit,w_<size>` delivery URLs; local assets (the logo) pass through unchanged.
- **Single source of truth.** `src/content/images.ts` lists every photo once (key, Cloudinary `publicId`, `alt`, and the original `sourceUrl` it was fetched from). Components call `img("key")` (`src/lib/images.ts`) — never a hard-coded URL. `npm run images:upload` (`scripts/upload-images-to-cloudinary.mjs`) uploads anything in that manifest not already on Cloudinary (checked via the Admin API first, so reruns are instant no-ops) and verifies every delivery URL with a HEAD request afterward.
- **What stayed local, and why:** the logo (`public/brand/`) and browser/app icons — the owner's instruction — plus the 8 SVG fallback illustrations (`public/images/fallback/`), which must keep working even if Cloudinary is ever down, since they're exactly what covers for a failed photo load (`ImageSlideshow`/`SmartImage`'s `onError` → local SVG). Verified by temporarily pointing one manifest entry at a non-existent Cloudinary resource: that one slide fell back to its SVG while the rest of the gallery kept loading normally.
- **Secrets.** `CLOUDINARY_API_KEY`/`CLOUDINARY_API_SECRET` (used only by the upload script) live in `.env.local`, never `.env.example`; `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is the one exception that's meant to be public — it appears in every delivery URL the browser requests anyway. Confirmed the key/secret never reach the client bundle: `grep`-ed the built `.next/` output for both literal values after `npm run build` (no hits), and `tests/unit/images.test.ts` asserts no source file reads the key/secret via a `NEXT_PUBLIC_` name.
- Rebuilt `.env.example`'s Cloudinary block as empty placeholders with explanatory comments, and added `!.env.example` to `.gitignore` (the blanket `.env*` rule was otherwise hiding the one env file meant to be shared).

## 4. Accessibility & interaction details

- Native `<dialog>` for all modals (lightbox, enquiry preview) — free focus handling, `Escape`-to-close, `::backdrop`.
- Mobile filter sheet: focus moves in on open, Tab/Shift+Tab is trapped, `Escape` closes and returns focus to the trigger, body scroll is locked while open.
- Accordions (itinerary, inclusions FAQ, trip FAQ, home FAQ, site FAQ) use real `aria-expanded`/`aria-controls`/`role="region"`, keyboard-operable buttons, and an "Expand all" control on the itinerary.
- Gallery lightbox: arrow keys navigate, a document-level listener (not a locally-scoped one) so arrow keys work regardless of which element the native dialog auto-focused.
- All interactive controls are real `<button>`/`<a>` elements with ≥44px touch targets; no `href="#"` placeholders, no inert-looking controls.
- `prefers-reduced-motion` respected globally; focus-visible ring on every interactive element.

### Hover feedback

Every clickable element site-wide gives hover feedback; nothing that isn't clickable does (no hover on the "After630 Way" rows, How-it-works steps, About beliefs, or Contact method/next-step cards — hovering them would imply they do something when they don't). Rules:

- Every `:hover` rule is wrapped in `@media (hover: hover) and (pointer: fine)`, so touch devices never get a "stuck" hover after a tap (verified in `tests/e2e/hover.spec.ts`).
- Cards lift 3–4px with a soft shadow; real-link photos (trip cards, the explore-trips feature card, gallery photos, related-trip photos) zoom ~4%. Buttons, chips, form fields and accordion triggers shift background/border/color. Tokens: `--hover-lift`, `--hover-lift-lg`, `--hover-zoom`, `--shadow-hover` in `src/styles/tokens.css`.
- Card-level lift/zoom was only added where the card (or its photo) is itself a real link — e.g. the homepage category tiles and the explore-trips cards. Where a "card" is just a static grouping around one small link (the homepage's upcoming-trips mini cards, related-trip cards), only that link gets hover, matching the approved prototypes.
- Under `prefers-reduced-motion: reduce`, hover transforms are disabled globally (color/border feedback still works) so a lift/zoom doesn't visibly "jump" for anyone who asked for reduced motion.
- Incidental fix: `.relatedBottom small` used a hardcoded `#8298a2` that failed WCAG AA contrast (3.01:1) — replaced with `var(--color-muted)`, caught by the accessibility test suite while verifying this work.

### Dropdown opening in the wrong place (DevTools only)

Reported: the Contact page's "What can we help you with?" dropdown opened near the top-left of the screen, over the header, instead of under the field. The screenshot showed the **macOS desktop Chrome menu** inside Chrome DevTools' mobile emulation (with the Next.js dev indicator visible), not a phone's native picker — iOS shows a wheel/list picker and Android a bottom sheet, both positioned by the OS. Chrome mis-positions native `<select>` menus when the DevTools device view is zoomed/scaled away from 100%; it isn't caused by the site. Verify on a real phone (or DevTools at 100% zoom).

A first, wrong guess blamed `overflow: clip` on the `.site` wrapper; that was removed. Keeping it removed is harmless (it was a leftover safety net; 0 horizontal overflow / 0 clipped content re-verified across 9 routes × 8 widths), but it was not the cause.

### Responsive pass (owner-edit review, 12 Nov 2026)

Verified on 10 routes × 320/375/390/430/600/768/820/1024/1280/1440px with an automated audit (page overflow, content cut off by the `overflow: clip` shell, touch targets) plus visual review of screenshots.

- **Clipped content fixed.** Two-column grids defined in percentages (`43% 57%`, `56% 44%`…) plus a `gap` added up to more than 100%, cutting off the homepage Manifesto photos (1024–1280px) and the Past Experiences archive blocks (768–1280px). All converted to `minmax(0, Nfr)` columns.
- **Touch targets.** Header nav/logo, footer links, breadcrumb, trip subnav, enquiry policy links and the legal table of contents now meet ≥32px (most ≥44px) on touch widths.
- **Phones.** No iOS zoom-on-focus (form fields are 16px under 760px); CTA rows go full-width when they wrap; the Manifesto photos stay side by side; How-it-works steps become left-aligned rows; the footer uses two link columns; the FAQ "ask the team" box follows the answers; the gallery shows an "All photos" badge on its third tile (the 4th is hidden on phones).
- **Tablet.** Enquiry-card copy/CTA always take a full row; the related-trips grid drops its orphaned 3rd card between 651–840px.
- **Consistency.** The breadcrumb sits at the top of every hero with the same spacing (Experiences, Contact, FAQ and legal pages had a large empty band above it); form controls inherit the brand font (the textarea was falling back to monospace).
- **Also fixed while reviewing:** one demo photo URL returned 404 (replaced and visually checked); `ImageSlideshow` now drops photos that fail to load and falls back to the trip's bundled illustration; the trip subnav only links to sections that exist (7 of 8 demo trips have no itinerary/inclusions/FAQ); search fields regained a visible keyboard focus ring; the mobile sticky bar no longer says "Enquire" on sold-out/postponed/cancelled trips.
- `tests/e2e/responsive.spec.ts` now covers 9 routes × 8 widths and fails if any content is cut off, not only on page-level horizontal scroll.

## 5. Automated test results (all passing at time of writing)

```
npm run typecheck   → clean
npm run lint        → clean
npm run test:unit   → 57/57 (Vitest: filter parse/serialize/filter/sort, availability
                       state machine per status, WhatsApp message builders incl. URL
                       encoding of &, emoji, newlines, and the "missing number → null
                       link" guarantee; Cloudinary loader URL shape, every img("key")
                       call resolves, no unused manifest entries, no leftover Unsplash
                       URLs, no NEXT_PUBLIC_ secret leakage)
npm run test:e2e    → 125/125 (Playwright, chromium):
  navigation.spec.ts        — home → trips → detail, category pre-filter, Back
                              restores filters, 404 (route + unknown slug)
  explore-trips.spec.ts     — search debounce + URL, filter/sort + reload persistence,
                              clear-all, empty state, mobile sheet focus/scroll-lock
  trip-details.spec.ts      — gallery keyboard nav, itinerary accordion + expand-all,
                              future-dates vs. enquire vs. sold-out/postponed states,
                              exact WhatsApp message/link content for a real selection,
                              sold-out departure never offered as an option
  accessibility.spec.ts     — axe (wcag2a/wcag2aa) on all 11 routes, 0 serious/critical
  responsive.spec.ts        — 320–1440px × 9 routes: 0 horizontal overflow, 0 clipped
                              content; full-page screenshots saved to ./screenshots/
  hover.spec.ts             — touch devices never get a "stuck" hover; reduced-motion
  whatsapp.spec.ts          — floating button, header/footer/contact links, enquiry
                              previews and Instagram
```

Also manually verified after `npm run build && npm run start`: every photo request in the rendered HTML/network panel goes to `res.cloudinary.com/.../f_auto,q_auto,c_limit,w_<size>/...` — zero `images.unsplash.com` or `/_next/image` requests; the logo and icons still serve from `/public` unchanged; full-page screenshots of Home/Trips/Trip-detail/About/Past-Experiences at 390px and 1440px.

## 5a. Pre-deploy QA (12 Nov 2026)

Checks run: typecheck, lint, 52 unit tests, 124 Playwright tests (incl. axe on all routes), `npm audit`, a production build **with no env file** (as a git-based deploy would have), and a crawl of 14 routes × desktop/mobile collecting console errors, failed requests, broken images, broken internal links, titles/descriptions/h1, and `target=_blank` safety.

Found and fixed:
- **Build failed without `.env.local` (deploy blocker).** The Cloudinary loader required `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, which only lived in the gitignored `.env.local` → prerender error on `/about`. The cloud name (public by design) is now built in via `src/content/site.ts`; env var only overrides. The API key/secret remain local-only (upload script).
- **Canonical, sitemap and link-share image pointed at `http://localhost:3000`.** Domain `https://after630.club` (owner-confirmed) is now built in.
- **Indexing turned on** (owner decision). Draft legal pages stay `noindex` and are kept out of `sitemap.xml` until `NEXT_PUBLIC_LEGAL_APPROVED=true`.
- `.env.example` set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` and `NEXT_PUBLIC_ALLOW_INDEXING=false`, which would silently override the new defaults if copied to a server `.env` — now blank, documented as optional overrides.
- Security headers added (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) and `X-Powered-By` removed. No CSP yet (needs nonces for Next's inline scripts — a deliberate follow-up).
- `npm audit`: 0 production vulnerabilities; 7 moderate dev-only (ESLint tooling) advisories cleared with `npm audit fix`.

Crawl result: 0 JS errors, 0 failed requests, 0 broken images, 0 broken internal links (20 unique), unique title + description and exactly one `<h1>` on every page, all new-tab links carry `rel="noopener"`, unknown routes and trip slugs return HTTP 404.

## 5b. Meta Pixel (ready, switched off)

`src/components/analytics/MetaPixel.tsx` + `src/lib/meta-pixel.ts`, loaded from the root layout only when `metaPixelId` (`src/content/site.ts`, env override `NEXT_PUBLIC_META_PIXEL_ID`) holds a numeric ID — currently empty, so nothing loads. Events: `PageView` on every pathname change (root-layout scripts only run on a full load and this site navigates client-side, so this is done manually; query-string changes such as `/trips` filters aren't counted as new pages), `ViewContent` on trip pages, `Contact` on any WhatsApp link click. Verified with a fake ID in a real browser (Facebook network blocked): `init` + `PageView` on load, `PageView` on client navigation, `ViewContent` on a trip, `Contact` on the WhatsApp CTA — each exactly once. **Before enabling:** the draft Privacy Policy §05 says no pixels are used and must be updated; a consent prompt is advisable.

## 6. Manual QA path

1. `/` → "Explore Experiences" → `/trips`.
2. Filter by Mountains, search "Jibhi", open the trip.
3. Expand itinerary days, open the gallery, try arrow keys / Escape.
4. Scroll to the enquiry card — it correctly shows "Ask About Future Dates" (no real departures exist yet). Click it: with no `NEXT_PUBLIC_AFTER630_WHATSAPP_NUMBER` set, a preview dialog opens with a copyable message; with the number set, it opens a real `wa.me` link in a new tab.
5. `/contact` → fill the enquiry composer → "Send on WhatsApp".
6. Visit an unknown route and an unknown trip slug → both 404 with real links back.

## 7. Items the owner must still supply (launch blockers)

Unchanged from `handoff/ux/After630_Phase1_UX_Implementation_Spec.md` §9 — restated
against what's now wired to receive them:

- ~~Verified WhatsApp Business number~~ — **done**: +91 70166 17715 is built in (`src/content/site.ts`). Floating chat button on every page (steps aside on phone trip pages where the sticky enquiry bar is), header "WhatsApp Enquiry", mobile-menu button, footer number, Contact page card, every "Ask on WhatsApp" button, trip enquiries and the message-preview dialog all open `wa.me/917016617715` with a pre-filled message that states it's an enquiry, not a booking. `NEXT_PUBLIC_AFTER630_WHATSAPP_NUMBER` only overrides it (the e2e suite uses a test number).
- **Real trips** (names, destinations, dates, origin cities, packages, prices, itineraries, inclusions, licensed photos) → add to `src/content/trips.ts`, then set `AFTER630_TRIP_SOURCE=live`.
- **Real prior After630 event details and photos** for `/experiences` and `/about`.
- **Approved legal text** for Privacy/Terms/Cancellation → replace `src/content/legal/*.ts`, then set `NEXT_PUBLIC_LEGAL_APPROVED=true`.
- The footer and Contact page link to the [After630 Instagram profile](https://www.instagram.com/after630club). The Contact composer opens a prefilled WhatsApp message.
- ~~Deploy/hosting approval, domain, indexing~~ — **done**: domain `https://after630.club` and indexing (on) are built in; see README §Deploying. No env vars are required on the server.

## 8. Defaults chosen (documented, easy to change)

- npm, CSS Modules (no Tailwind/UI kit) — matches the prototypes' plain CSS approach.
- Unified header/footer uses the "secondary page" nav set from the prototypes rather than the homepage's own, since it was the more complete/coherent one.
- Demo trips are all `coming-soon`; the bookable-selector path is proven via QA-only fixtures instead, so nothing demo-labeled can ever look purchasable.
- Indexing and legal-page indexing are both off by default — safe for a pre-launch prototype.
- Cloudinary `publicId`s are grouped into `after630/trips/`, `after630/people/` or `after630/scenes/` by what the photo shows, not by which page uses it (several photos are reused across pages) — a readable default, easy to reorganize later since nothing in code depends on the folder name beyond the full `publicId` stored in `src/content/images.ts`.
