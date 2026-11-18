/**
 * Manifest of every photo used on the site (logos, favicon and the local
 * SVG fallback illustrations are not here — see IMPLEMENTATION_REPORT.md).
 *
 * Each entry is uploaded to Cloudinary once by
 * `npm run images:upload` (scripts/upload-images-to-cloudinary.mjs), which
 * reads this file as its source of truth. `img(key)` (src/lib/images.ts)
 * is how components read an entry; never hard-code a Cloudinary URL in a
 * component.
 *
 * Provide either `sourceUrl` (Cloudinary fetches remotely) or `localPath`
 * (upload-only — file is NOT served from the repo). Paths are resolved
 * against AFTER630_LOCAL_IMAGES_DIR (or AFTER630_HOMEPAGE_IMAGES_DIR) when
 * set, otherwise the repo root. Once an asset is on Cloudinary, localPath
 * can be omitted; the site only needs publicId.
 */

export type ImageManifestEntry = {
  /** Cloudinary public ID (folder/name, no extension). */
  publicId: string;
  alt: string;
  /** Original remote URL Cloudinary should fetch. */
  sourceUrl?: string;
  /** Repo-relative path to a local image file to upload. */
  localPath?: string;
};

export const imageManifest = {
  /* ---- Homepage pack (AI brand illustrations, Nov 2026) ---- */
  "homepage-hero": {
    publicId: "after630/homepage/hero",
    alt: "Blue-hour Himachal valley with layered mountain ridges",
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

  /* ---- Remaining pages pack (AI brand illustrations, Nov 2026) ---- */
  "pages-trips-hero-01": {
    publicId: "after630/pages/trips-hero-01",
    alt: "Forested Himalayan valley in soft winter morning haze",
  },
  "pages-trips-hero-02": {
    publicId: "after630/pages/trips-hero-02",
    alt: "Himalayan foothill ridges under a blue-hour sky",
  },
  "pages-trips-hero-03": {
    publicId: "after630/pages/trips-hero-03",
    alt: "Mountain pass road bending through cedar forest at dusk",
  },
  "pages-live-trip-15-strangers": {
    publicId: "after630/pages/live-trip-15-strangers",
    alt: "Travellers walking a forested mountain meadow trail",
  },
  "pages-archive-01-gathering": {
    publicId: "after630/pages/archive-01-gathering",
    alt: "Illustrative cafe courtyard storytelling gathering",
  },
  "pages-archive-02-shared-table": {
    publicId: "after630/pages/archive-02-shared-table",
    alt: "Illustrative friends sharing chai at a cafe table",
  },
  "pages-experiences-riverside": {
    publicId: "after630/pages/experiences-riverside",
    alt: "Peaceful Himalayan riverside pool surrounded by forest",
  },
  "pages-about-hero-main": {
    publicId: "after630/pages/about-hero-main",
    alt: "Illustrative cafe storytelling evening in a leafy courtyard",
  },
  "pages-about-hero-inset": {
    publicId: "after630/pages/about-hero-inset",
    alt: "Quiet mountain river flowing between forested banks",
  },
  "pages-about-chapter-01": {
    publicId: "after630/pages/about-chapter-01",
    alt: "Illustrative friends chatting on a rooftop terrace at dusk",
  },
  "pages-about-chapter-02": {
    publicId: "after630/pages/about-chapter-02",
    alt: "Open winding Himalayan road toward forested mountains",
  },
} as const satisfies Record<string, ImageManifestEntry>;

export type ImageKey = keyof typeof imageManifest;
