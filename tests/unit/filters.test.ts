import { describe, expect, it } from "vitest";
import {
  DEFAULT_FILTER_STATE,
  filterTrips,
  getFacetOptions,
  parseFilterState,
  serializeFilterState,
  sortTrips,
} from "@/lib/trips/filters";
import type { Trip } from "@/lib/trips/types";

function makeTrip(overrides: Partial<Trip>): Trip {
  return {
    id: overrides.id ?? "t1",
    slug: overrides.slug ?? "t1",
    title: overrides.title ?? "Test Trip",
    destinations: [],
    place: "Somewhere",
    category: overrides.category ?? "mountain",
    tone: "Tone",
    status: "coming-soon",
    blurb: "Blurb",
    images: [],
    fallbackImage: "/brand/after630-og-square.png",
    departures: overrides.departures ?? [],
    published: true,
    ...overrides,
  };
}

describe("parseFilterState", () => {
  it("falls back to defaults for invalid/unknown values", () => {
    const params = new URLSearchParams("category=not-real&duration=whatever&sort=nope");
    expect(parseFilterState(params)).toEqual(DEFAULT_FILTER_STATE);
  });

  it("reads valid values", () => {
    const params = new URLSearchParams("category=mountain&duration=short&region=north&month=2027-03&sort=alpha&q=alpine");
    expect(parseFilterState(params)).toEqual({
      q: "alpine",
      category: "mountain",
      duration: "short",
      region: "north",
      month: "2027-03",
      sort: "alpha",
    });
  });
});

describe("serializeFilterState", () => {
  it("omits keys equal to their default", () => {
    const params = serializeFilterState({ ...DEFAULT_FILTER_STATE, category: "mountain" });
    expect(params.toString()).toBe("category=mountain");
  });

  it("round-trips through parseFilterState", () => {
    const state = { q: "x", category: "road", duration: "long", region: "west", month: "2027-01", sort: "short" } as const;
    const params = serializeFilterState(state);
    expect(parseFilterState(params)).toEqual(state);
  });
});

describe("filterTrips", () => {
  const trips = [
    makeTrip({ id: "a", category: "mountain", region: "north", duration: { days: 2 } }),
    makeTrip({ id: "b", category: "road", region: "south", duration: { days: 7 } }),
    makeTrip({ id: "c", category: "mountain", region: "west", title: "Alpine Escape", duration: { days: 4 } }),
  ];

  it("filters by category", () => {
    const result = filterTrips(trips, { ...DEFAULT_FILTER_STATE, category: "road" });
    expect(result.map((t) => t.id)).toEqual(["b"]);
  });

  it("filters by duration bucket", () => {
    expect(filterTrips(trips, { ...DEFAULT_FILTER_STATE, duration: "long" }).map((t) => t.id)).toEqual(["b"]);
    expect(filterTrips(trips, { ...DEFAULT_FILTER_STATE, duration: "medium" }).map((t) => t.id)).toEqual(["c"]);
  });

  it("filters by region", () => {
    expect(filterTrips(trips, { ...DEFAULT_FILTER_STATE, region: "west" }).map((t) => t.id)).toEqual(["c"]);
  });

  it("filters by free-text search across title", () => {
    expect(filterTrips(trips, { ...DEFAULT_FILTER_STATE, q: "alpine" }).map((t) => t.id)).toEqual(["c"]);
  });

  it("combines filters with AND semantics", () => {
    expect(filterTrips(trips, { ...DEFAULT_FILTER_STATE, category: "mountain", region: "west" }).map((t) => t.id)).toEqual([
      "c",
    ]);
  });
});

describe("sortTrips", () => {
  const trips = [
    makeTrip({ id: "a", title: "Zebra", duration: { days: 5 } }),
    makeTrip({ id: "b", title: "Alpha", duration: { days: 1 } }),
  ];

  it("sorts alphabetically", () => {
    expect(sortTrips(trips, "alpha").map((t) => t.id)).toEqual(["b", "a"]);
  });

  it("sorts by shortest/longest duration", () => {
    expect(sortTrips(trips, "short").map((t) => t.id)).toEqual(["b", "a"]);
    expect(sortTrips(trips, "long").map((t) => t.id)).toEqual(["a", "b"]);
  });

  it("keeps original order for curated", () => {
    expect(sortTrips(trips, "curated").map((t) => t.id)).toEqual(["a", "b"]);
  });
});

describe("getFacetOptions", () => {
  it("never invents a month that has no real departure", () => {
    const trips = [makeTrip({ departures: [] })];
    expect(getFacetOptions(trips).months).toEqual([]);
  });

  it("derives months only from available/postponed departures, not cancelled", () => {
    const trips = [
      makeTrip({
        departures: [
          { id: "d1", localDate: "2027-03-14", status: "available", origins: [] },
          { id: "d2", localDate: "2027-05-01", status: "cancelled", origins: [] },
        ],
      }),
    ];
    expect(getFacetOptions(trips).months.map((m) => m.key)).toEqual(["2027-03"]);
  });
});
