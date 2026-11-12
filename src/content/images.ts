/**
 * Manifest of every photo used on the site (logos, favicon and the local
 * SVG fallback illustrations are not here — see IMPLEMENTATION_REPORT.md).
 *
 * Each entry is uploaded to Cloudinary once by
 * `npm run images:upload` (scripts/upload-images-to-cloudinary.mjs), which
 * reads this file as its source of truth. `img(key)` (src/lib/images.ts)
 * is how components read an entry; never hard-code a Cloudinary URL or an
 * Unsplash URL in a component.
 */

export type ImageManifestEntry = {
  /** Cloudinary public ID (folder/name, no extension). */
  publicId: string;
  alt: string;
  /** Original source Unsplash photo the upload script fetched this from. */
  sourceUrl: string;
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
  "kutch-gujarat": {
    publicId: "after630/trips/kutch-gujarat",
    alt: "Kutch, Gujarat",
    sourceUrl: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
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
  "river-rafting-atmosphere-near-mountain": {
    publicId: "after630/scenes/river-rafting-atmosphere-near-mountain",
    alt: "River rafting atmosphere near mountain foothills",
    sourceUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
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
  "historic-palace-architecture-against-blue": {
    publicId: "after630/scenes/historic-palace-architecture-against-blue",
    alt: "Historic palace architecture against blue sky",
    sourceUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
  },
  "old-city-lanes-and-warm": {
    publicId: "after630/scenes/old-city-lanes-and-warm",
    alt: "Old city lanes and warm evening light",
    sourceUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
  },
  "lake-view-with-boats-near": {
    publicId: "after630/scenes/lake-view-with-boats-near",
    alt: "Lake view with boats near a city shore",
    sourceUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220",
  },
  "misty-forest-path-through-evergreen": {
    publicId: "after630/scenes/misty-forest-path-through-evergreen",
    alt: "Misty forest path through evergreen trees",
    sourceUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  },
  "dramatic-mountain-peaks-under-open": {
    publicId: "after630/scenes/dramatic-mountain-peaks-under-open",
    alt: "Dramatic mountain peaks under open sky",
    sourceUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  },
  "fog-rolling-over-forested-hills": {
    publicId: "after630/scenes/fog-rolling-over-forested-hills",
    alt: "Fog rolling over forested hills",
    sourceUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
  },
  "waterfall-cascade-in-the-western": {
    publicId: "after630/scenes/waterfall-cascade-in-the-western",
    alt: "Waterfall cascade in the Western Ghats",
    sourceUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9",
  },
  "spiti-valley-himachal-pradesh": {
    publicId: "after630/trips/spiti-valley-himachal-pradesh",
    alt: "Spiti Valley, Himachal Pradesh",
    sourceUrl: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73",
  },
  "desert-dunes-under-warm-evening": {
    publicId: "after630/scenes/desert-dunes-under-warm-evening",
    alt: "Desert dunes under warm evening light",
    sourceUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35",
  },
  "vast-arid-landscape-at-sunset": {
    publicId: "after630/scenes/vast-arid-landscape-at-sunset",
    alt: "Vast arid landscape at sunset",
    sourceUrl: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba",
  },
  "golden-desert-horizon-at-dusk": {
    publicId: "after630/scenes/golden-desert-horizon-at-dusk",
    alt: "Golden desert horizon at dusk",
    sourceUrl: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0",
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
  "friends-laughing-together-on-a": {
    publicId: "after630/people/friends-laughing-together-on-a",
    alt: "Friends laughing together on a trip",
    sourceUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
  },
  "friends-sharing-a-meal-and-2": {
    publicId: "after630/people/friends-sharing-a-meal-and-2",
    alt: "Friends sharing a meal and conversation",
    sourceUrl: "https://images.unsplash.com/photo-1478144592103-25e218a04891",
  },
  "people-sharing-an-evening-gathering": {
    publicId: "after630/people/people-sharing-an-evening-gathering",
    alt: "People sharing an evening gathering under string lights",
    sourceUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
  },
  "friends-enjoying-a-shared-outdoor": {
    publicId: "after630/people/friends-enjoying-a-shared-outdoor",
    alt: "Friends enjoying a shared outdoor moment",
    sourceUrl: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46",
  },
} as const satisfies Record<string, ImageManifestEntry>;

export type ImageKey = keyof typeof imageManifest;
