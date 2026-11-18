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
  /**
   * Focal point as a CSS object-position (e.g. "28% 50%"), for photos whose
   * subject isn't centred. Every frame crops with object-fit: cover, and on
   * phones a landscape photo in a tall frame (or a portrait one in a wide
   * card) otherwise loses its subject. Omit for centred subjects.
   */
  position?: string;
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
    position: "26% 50%", // the group on the veranda, left of the blue pillar
    alt: "Friends sharing chai on a mountain veranda",
  },
  "homepage-people-a-03": {
    publicId: "after630/homepage/people-a-03",
    position: "32% 50%",
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

  /* ---- Himachal trip: real photos from the After630 Mountain House (Nov 2026) ----
   * Shot on iPhone. Uploaded as metadata-free JPEGs (GPS/EXIF stripped before
   * upload) because the stay's exact location is only shared with confirmed
   * travellers. */
  "himachal-mountain-house-sign": {
    publicId: "after630/trips/himachal/mountain-house-sign",
    position: "50% 64%", // the sign sits in the lower third of this portrait shot
    alt: "After6.30 Mountain House wooden sign on a boulder in a Himalayan meadow",
  },
  "himachal-stay-exterior": {
    publicId: "after630/trips/himachal/stay-exterior",
    alt: "The two-storey mountain stay among deodar trees, with the group's SUV parked outside",
  },
  "himachal-village-trail": {
    publicId: "after630/trips/himachal/village-trail",
    alt: "Stone footpath past a village cottage, with mountain ridges and a cloudy blue sky",
  },
  "himachal-traditional-house": {
    publicId: "after630/trips/himachal/traditional-house",
    alt: "Traditional Himachali house with a slate roof and a marigold-lined garden path",
  },
  "himachal-hillside-village": {
    publicId: "after630/trips/himachal/hillside-village",
    alt: "Hillside village with haystacks, small farms and pine forest",
  },
  "himachal-log-wall-sign": {
    publicId: "after630/trips/himachal/log-wall-sign",
    alt: "After6.30 Mountain House sign hanging on a rustic log wall",
  },
} as const satisfies Record<string, ImageManifestEntry>;

export type ImageKey = keyof typeof imageManifest;

export type VideoManifestEntry = {
  /** Cloudinary public ID (folder/name, no extension), stored as a video resource. */
  publicId: string;
  /** Short description, used as the video's accessible label. */
  alt: string;
  /** Local video file to upload (resolved like image `localPath`). */
  localPath?: string;
};

/**
 * Short real-trip clips. Uploaded by the same `npm run images:upload` script
 * (as Cloudinary video resources); read through `video(key)` in
 * src/lib/images.ts — never hard-code a Cloudinary video URL in a component.
 */
export const videoManifest = {
  "himachal-sunset-dog": {
    publicId: "after630/trips/himachal/sunset-dog",
    alt: "A white mountain dog watching the valley at sunset",
  },
  "himachal-meadow-dogs": {
    publicId: "after630/trips/himachal/meadow-dogs",
    alt: "Playing with friendly mountain dogs in a sunny meadow below snow peaks",
  },
} as const satisfies Record<string, VideoManifestEntry>;

export type VideoKey = keyof typeof videoManifest;
