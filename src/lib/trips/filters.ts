import type { Trip, TripCategory, TripRegion } from "./types";

export type DurationBucket = "all" | "short" | "medium" | "long";
export type SortOption = "curated" | "alpha" | "short" | "long";

export type TripFilterState = {
  q: string;
  category: TripCategory | "all";
  duration: DurationBucket;
  region: TripRegion | "all";
  /** "all" or an ISO "YYYY-MM" derived from real departure dates — never invented. */
  month: string;
  sort: SortOption;
};

export const DEFAULT_FILTER_STATE: TripFilterState = {
  q: "",
  category: "all",
  duration: "all",
  region: "all",
  month: "all",
  sort: "curated",
};

const CATEGORIES: TripCategory[] = ["mountain", "road", "weekend", "culture"];
const REGIONS: TripRegion[] = ["north", "south", "east", "west"];
const DURATIONS: DurationBucket[] = ["all", "short", "medium", "long"];
const SORTS: SortOption[] = ["curated", "alpha", "short", "long"];

/** Reads + validates filter state from URL search params. Unknown/invalid values fall back to defaults instead of erroring. */
export function parseFilterState(params: URLSearchParams): TripFilterState {
  const category = params.get("category");
  const duration = params.get("duration");
  const region = params.get("region");
  const month = params.get("month");
  const sort = params.get("sort");
  const q = params.get("q");

  return {
    q: typeof q === "string" ? q.slice(0, 120) : DEFAULT_FILTER_STATE.q,
    category: isCategory(category) ? category : DEFAULT_FILTER_STATE.category,
    duration: isDurationBucket(duration) ? duration : DEFAULT_FILTER_STATE.duration,
    region: isRegion(region) ? region : DEFAULT_FILTER_STATE.region,
    month: month && /^\d{4}-\d{2}$/.test(month) ? month : DEFAULT_FILTER_STATE.month,
    sort: isSort(sort) ? sort : DEFAULT_FILTER_STATE.sort,
  };
}

/** Only writes keys that differ from the default, so the URL stays clean. */
export function serializeFilterState(state: TripFilterState): URLSearchParams {
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  if (state.category !== DEFAULT_FILTER_STATE.category) params.set("category", state.category);
  if (state.duration !== DEFAULT_FILTER_STATE.duration) params.set("duration", state.duration);
  if (state.region !== DEFAULT_FILTER_STATE.region) params.set("region", state.region);
  if (state.month !== DEFAULT_FILTER_STATE.month) params.set("month", state.month);
  if (state.sort !== DEFAULT_FILTER_STATE.sort) params.set("sort", state.sort);
  return params;
}

function isCategory(v: string | null): v is TripCategory {
  return !!v && (CATEGORIES as string[]).includes(v);
}
function isRegion(v: string | null): v is TripRegion {
  return !!v && (REGIONS as string[]).includes(v);
}
function isDurationBucket(v: string | null): v is DurationBucket {
  return !!v && (DURATIONS as string[]).includes(v);
}
function isSort(v: string | null): v is SortOption {
  return !!v && (SORTS as string[]).includes(v);
}

function matchesDuration(trip: Trip, bucket: DurationBucket): boolean {
  const days = trip.duration?.days;
  if (bucket === "all" || typeof days !== "number") return bucket === "all";
  if (bucket === "short") return days <= 3;
  if (bucket === "medium") return days >= 4 && days <= 5;
  return days >= 6;
}

function monthKeysForTrip(trip: Trip): string[] {
  return trip.departures
    .filter((d) => d.status !== "cancelled")
    .map((d) => d.localDate.slice(0, 7))
    .filter(Boolean);
}

export function filterTrips(trips: Trip[], state: TripFilterState): Trip[] {
  const q = state.q.trim().toLowerCase();
  return trips.filter((trip) => {
    if (state.category !== "all" && trip.category !== state.category) return false;
    if (!matchesDuration(trip, state.duration)) return false;
    if (state.region !== "all" && trip.region !== state.region) return false;
    if (state.month !== "all" && !monthKeysForTrip(trip).includes(state.month)) return false;
    if (q) {
      const haystack = [trip.title, trip.place, trip.tone, trip.blurb, trip.category]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function sortTrips(trips: Trip[], sort: SortOption): Trip[] {
  const copy = [...trips];
  if (sort === "alpha") return copy.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "short") return copy.sort((a, b) => (a.duration?.days ?? 0) - (b.duration?.days ?? 0));
  if (sort === "long") return copy.sort((a, b) => (b.duration?.days ?? 0) - (a.duration?.days ?? 0));
  return copy; // "curated" — keep repository order
}

export type FacetOptions = {
  categories: TripCategory[];
  regions: TripRegion[];
  months: { key: string; label: string }[];
};

/** Derives the available filter options strictly from the trips actually present — never a hardcoded list that could imply unpublished inventory. */
export function getFacetOptions(trips: Trip[]): FacetOptions {
  const categories = unique(trips.map((t) => t.category));
  const regions = unique(trips.map((t) => t.region).filter((r): r is TripRegion => !!r));
  const monthKeys = unique(trips.flatMap(monthKeysForTrip)).sort();
  const months = monthKeys.map((key) => ({ key, label: formatMonthLabel(key) }));
  return { categories, regions, months };
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function formatMonthLabel(key: string): string {
  const [year, month] = key.split("-").map(Number);
  try {
    return new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(
      new Date(year, (month ?? 1) - 1, 1),
    );
  } catch {
    return key;
  }
}

export const CATEGORY_LABELS: Record<TripCategory, string> = {
  mountain: "Mountains",
  road: "Road Trips",
  weekend: "Weekend Getaways",
  culture: "Culture & Discovery",
};

export const REGION_LABELS: Record<TripRegion, string> = {
  north: "North India",
  south: "South India",
  east: "East India",
  west: "West India",
};

export const DURATION_LABELS: Record<DurationBucket, string> = {
  all: "Any duration",
  short: "2–3 days",
  medium: "4–5 days",
  long: "6+ days",
};

export const SORT_LABELS: Record<SortOption, string> = {
  curated: "Curated order",
  alpha: "Name A–Z",
  short: "Shortest trip",
  long: "Longest trip",
};
