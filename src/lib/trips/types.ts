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
  /** ISO date string, e.g. "2027-03-14". */
  localDate: string;
  status: DepartureStatus;
  origins: TripOrigin[];
};

export type TripImage = {
  src: string;
  alt: string;
  licensedForUse: boolean;
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
  /** Local fallback art shown if the remote image fails or is disabled. */
  fallbackImage: string;
  itinerary?: TripItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
  travelStay?: { label: string; value: string }[];
  faq?: TripFaqItem[];
  departures: TripDeparture[];
  policyUrls?: { terms?: string; cancellation?: string };
  published: boolean;
  featured?: boolean;
  /** True for prototype/demo content — never real inventory. Drives the DemoBanner + badges. */
  isDemo: boolean;
};
