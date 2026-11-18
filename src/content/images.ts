/**
 * Manifest of every photo used on the site (logos, favicon and the local
 * SVG fallback illustrations are not here — see IMPLEMENTATION_REPORT.md).
 *
 * Each entry is uploaded to Cloudinary once by
 * `npm run images:upload` (scripts/upload-images-to-cloudinary.mjs), which
 * reads this file as its source of truth. `img(key)` (src/lib/images.ts)
 * is how components read an entry; never hard-code a Cloudinary URL or an
 * Unsplash URL in a component.
 *
 * Provide either `sourceUrl` (Cloudinary fetches remotely) or `localPath`
 * (upload-only — file is NOT served from the repo). Paths are resolved
 * against AFTER630_HOMEPAGE_IMAGES_DIR when set, otherwise the repo root.
 * Once an asset is on Cloudinary, localPath can be omitted; the site only
 * needs publicId.
 */

export type ImageManifestEntry = {
  /** Cloudinary public ID (folder/name, no extension). */
  publicId: string;
  alt: string;
  /** Original remote URL Cloudinary should fetch (e.g. Unsplash). */
  sourceUrl?: string;
  /** Repo-relative path to a local image file to upload. */
  localPath?: string;
};

export const imageManifest = {
  "people-gathered-together-for-a": {
    publicId: "after630/people/people-gathered-together-for-a",
    alt: "People gathered together for a shared evening",
    sourceUrl: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf",
  },
  "calm-riverside-waters-surrounded-by": {
    publicId: "after630/scenes/calm-riverside-waters-surrounded-by",
    alt: "Calm riverside waters surrounded by forest",
    sourceUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
  },
  "people-connecting-at-a-shared": {
    publicId: "after630/people/people-connecting-at-a-shared",
    alt: "People connecting at a shared gathering",
    sourceUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865",
  },
  "open-highway-stretching-toward-distant": {
    publicId: "after630/scenes/open-highway-stretching-toward-distant",
    alt: "Open highway stretching toward distant mountains",
    sourceUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
  },
  "people-celebrating-together-at-an": {
    publicId: "after630/people/people-celebrating-together-at-an",
    alt: "People celebrating together at an evening gathering",
    sourceUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
  },
  "friends-sharing-a-meal-and": {
    publicId: "after630/people/friends-sharing-a-meal-and",
    alt: "Friends sharing a meal and conversation around a table",
    sourceUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
  },
  "atmospheric-mountain-landscape-representing-adventure": {
    publicId: "after630/scenes/atmospheric-mountain-landscape-representing-adventure",
    alt: "Atmospheric mountain landscape representing adventure travel",
    sourceUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  "travellers-on-an-outdoor-adventure": {
    publicId: "after630/scenes/travellers-on-an-outdoor-adventure",
    alt: "Travellers on an outdoor adventure",
    sourceUrl: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
  },
  "green-forest-and-mountain-landscape": {
    publicId: "after630/scenes/green-forest-and-mountain-landscape",
    alt: "Green forest and mountain landscape preview",
    sourceUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306",
  },
  "alpine-trail-with-clear-mountain": {
    publicId: "after630/scenes/alpine-trail-with-clear-mountain",
    alt: "Alpine trail with clear mountain air",
    sourceUrl: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99",
  },
  "mountain-valley-with-evergreen-forest": {
    publicId: "after630/scenes/mountain-valley-with-evergreen-forest",
    alt: "Mountain valley with evergreen forest",
    sourceUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606",
  },
  "night-sky-over-mountain-silhouettes": {
    publicId: "after630/scenes/night-sky-over-mountain-silhouettes",
    alt: "Night sky over mountain silhouettes",
    sourceUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  "scenic-road-through-a-beautiful": {
    publicId: "after630/scenes/scenic-road-through-a-beautiful",
    alt: "Scenic road through a beautiful landscape",
    sourceUrl: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
  },
  "mountain-pass-and-open-sky": {
    publicId: "after630/scenes/mountain-pass-and-open-sky",
    alt: "Mountain pass and open sky near the hills",
    sourceUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
  },
  "hill-viewpoint-overlooking-water-and": {
    publicId: "after630/scenes/hill-viewpoint-overlooking-water-and",
    alt: "Hill viewpoint overlooking water and trees",
    sourceUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  "lakeside-resort-atmosphere-at-golden": {
    publicId: "after630/scenes/lakeside-resort-atmosphere-at-golden",
    alt: "Lakeside resort atmosphere at golden hour",
    sourceUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
  },
  "dramatic-mountain-peaks-under-open": {
    publicId: "after630/scenes/dramatic-mountain-peaks-under-open",
    alt: "Dramatic mountain peaks under open sky",
    sourceUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  },
  "desert-road-trip-under-a": {
    publicId: "after630/scenes/desert-road-trip-under-a",
    alt: "Desert road trip under a wide sky",
    sourceUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
  },
  "car-on-a-coastal-road": {
    publicId: "after630/scenes/car-on-a-coastal-road",
    alt: "Car on a coastal road at golden hour",
    sourceUrl: "https://images.unsplash.com/photo-1493238792000-8113da705763",
  },
  "quiet-beach-getaway-with-turquoise": {
    publicId: "after630/scenes/quiet-beach-getaway-with-turquoise",
    alt: "Quiet beach getaway with turquoise water",
    sourceUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  "cozy-cabin-weekend-escape-in": {
    publicId: "after630/scenes/cozy-cabin-weekend-escape-in",
    alt: "Cozy cabin weekend escape in the woods",
    sourceUrl: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
  },
  /* ---- Homepage pack (AI brand illustrations, Nov 2026) ---- */
  "homepage-hero": {
    publicId: "after630/homepage/hero",
    alt: "Blue-hour Himachal valley with layered mountain ridges",
  },
  "homepage-upcoming-trip": {
    publicId: "after630/homepage/upcoming-trip",
    alt: "Mountain homestay among deodar pines with travellers walking a meadow path",
  },
  "homepage-people-a-01": {
    publicId: "after630/homepage/people-a-01",
    alt: "Travellers walking a deodar woodland trail",
  },
  "homepage-people-a-02": {
    publicId: "after630/homepage/people-a-02",
    alt: "Friends sharing chai on a mountain veranda",
  },
  "homepage-people-a-03": {
    publicId: "after630/homepage/people-a-03",
    alt: "Travellers sharing dinner at a mountain homestay table",
  },
  "homepage-people-a-04": {
    publicId: "after630/homepage/people-a-04",
    alt: "Friends talking beside a campfire in a mountain clearing",
  },
  "homepage-people-a-05": {
    publicId: "after630/homepage/people-a-05",
    alt: "Green Himachal forest valley in soft morning haze",
  },
  "homepage-people-b-01": {
    publicId: "after630/homepage/people-b-01",
    alt: "Misty deodar forest footpath",
  },
  "homepage-people-b-02": {
    publicId: "after630/homepage/people-b-02",
    alt: "Hill viewpoint over a winding mountain lake",
  },
  "homepage-people-b-03": {
    publicId: "after630/homepage/people-b-03",
    alt: "Quiet Himalayan panorama with layered foothills",
  },
  "homepage-people-b-04": {
    publicId: "after630/homepage/people-b-04",
    alt: "Scenic mountain highway through the hills",
  },
  "homepage-people-b-05": {
    publicId: "after630/homepage/people-b-05",
    alt: "Calm mountain stream with stones and woodland",
  },
  "homepage-way-01": {
    publicId: "after630/homepage/way-01",
    alt: "Sunlit forest clearing and walking trail in Himachal",
  },
  "homepage-way-02": {
    publicId: "after630/homepage/way-02",
    alt: "Travellers at a mountain tea stall overlooking the hills",
  },
  "homepage-way-03": {
    publicId: "after630/homepage/way-03",
    alt: "Curving mountain road through cedar forest",
  },
  "homepage-way-04": {
    publicId: "after630/homepage/way-04",
    alt: "Traveller at a grassy lake overlook in the mountains",
  },
  "homepage-way-05": {
    publicId: "after630/homepage/way-05",
    alt: "Clear shallow river over stones with forest reflections",
  },
  "homepage-beginning-01": {
    publicId: "after630/homepage/beginning-01",
    alt: "Community storytelling evening in a small cafe",
  },
  "homepage-beginning-02": {
    publicId: "after630/homepage/beginning-02",
    alt: "Relaxed courtyard gathering among plants",
  },
  "homepage-beginning-03": {
    publicId: "after630/homepage/beginning-03",
    alt: "Friends talking in a cafe, candid environmental view",
  },
  "homepage-beginning-04": {
    publicId: "after630/homepage/beginning-04",
    alt: "Shared table of chai and snacks with friends",
  },
  "homepage-beginning-05": {
    publicId: "after630/homepage/beginning-05",
    alt: "Rooftop storytelling gathering at dusk",
  },
  "homepage-closing": {
    publicId: "after630/homepage/closing",
    alt: "Expansive Himalayan valley at twilight",
  },
} as const satisfies Record<string, ImageManifestEntry>;

export type ImageKey = keyof typeof imageManifest;
