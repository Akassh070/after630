/**
 * Trip data model — matches handoff/ux/After630_Phase1_UX_Implementation_Spec.md §4,
 * extended with the display fields the ported UI needs (category, tagline,
 * region, featured flag). This is the only shape trip data is allowed to take;
 * do not add ad-hoc fields to components instead of here.
 */

export type TripStatus =
  | "draft"
  | "coming-soon"
  | "published"
  | "sold-out"
  | "postponed"
  | "cancelled"
  | "completed";

export type TripCategory = "mountain" | "road" | "weekend" | "culture";

export type TripRegion = "north" | "south" | "east" | "west";

export type DepartureStatus = "available" | "sold-out" | "postponed" | "cancelled";

export type TripPackage = {
  id: string;
  name: string;
  /** INR, whole rupees. Omit entirely when not confirmed — never default to 0. */
  priceINR?: number;
  inclusions?: string[];
};

export type TripOrigin = {
  city: string;
  packages: TripPackage[];
};

export type TripDeparture = {
  id: string;
  /** Start date in YYYY-MM-DD format. */
  localDate: string;
  /** End date in YYYY-MM-DD format when the full date range is published. */
  endDate?: string;
  status: DepartureStatus;
  origins: TripOrigin[];
};

export type TripImage = {
  src: string;
  alt: string;
  licensedForUse: boolean;
  fit?: "contain";
  /** CSS object-position focal point, carried over from the image manifest. */
  position?: string;
};

/** A short silent clip from the real trip/stay — build with `video(key)` from src/lib/images.ts. */
export type TripVideo = {
  src: string;
  poster: string;
  alt: string;
  caption?: string;
};

export type TripItineraryDay = {
  day: number;
  title: string;
  description: string;
};

export type TripFaqItem = {
  question: string;
  answer: string;
};

export type Trip = {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  /**
   * Descriptive second line of the trip page's H1 (e.g. "A 5-Day Himachal
   * Group Trip from Chandigarh"). `title` stays the short brand name used in
   * cards and WhatsApp messages; this carries the search keywords.
   */
  subtitle?: string;
  /** <title> for the trip page (the site appends " — After630"). Falls back to `title`. */
  seoTitle?: string;
  /** Meta description for the trip page. Falls back to `blurb`. */
  seoDescription?: string;
  /** "Who this trip is for" bullets shown in the overview. */
  audience?: string[];
  region?: TripRegion;
  destinations: string[];
  place: string;
  category: TripCategory;
  tone: string;
  status: TripStatus;
  duration?: { days?: number; nights?: number };
  description?: string;
  blurb: string;
  images: TripImage[];
  /** Real clips shown in the "Real moments" section; omit when there are none. */
  videos?: TripVideo[];
  /** Local fallback art shown if the remote image fails or is disabled. */
  fallbackImage: string;
  itinerary?: TripItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  travelStay?: { label: string; value: string }[];
  /** "What to pack" groups, shown under the travel & stay details. */
  packing?: { label: string; value: string }[];
  /** Short note under the packing list, e.g. about snow or trek readiness. */
  packingNote?: string;
  faq?: TripFaqItem[];
  departures: TripDeparture[];
  policyUrls?: { terms?: string; cancellation?: string };
  published: boolean;
  featured?: boolean;
};
