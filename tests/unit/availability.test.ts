import { describe, expect, it } from "vitest";
import { formatPriceINR, getEnquiryMode, getStartingPriceINR } from "@/lib/trips/availability";
import type { Trip } from "@/lib/trips/types";

function makeTrip(overrides: Partial<Trip>): Trip {
  return {
    id: "t1",
    slug: "t1",
    title: "Test Trip",
    destinations: [],
    place: "Somewhere",
    category: "mountain",
    tone: "Tone",
    status: "coming-soon",
    blurb: "Blurb",
    images: [],
    fallbackImage: "/images/fallback/jibhi.svg",
    departures: [],
    published: true,
    isDemo: true,
    ...overrides,
  };
}

describe("getEnquiryMode", () => {
  it("is future-dates for a trip with no departures at all", () => {
    expect(getEnquiryMode(makeTrip({ status: "coming-soon" }))).toBe("future-dates");
    expect(getEnquiryMode(makeTrip({ status: "published" }))).toBe("future-dates");
  });

  it("is enquire only when published AND at least one available departure exists", () => {
    const trip = makeTrip({
      status: "published",
      departures: [{ id: "d1", localDate: "2027-01-01", status: "available", origins: [] }],
    });
    expect(getEnquiryMode(trip)).toBe("enquire");
  });

  it("a published trip whose only departure is sold-out is future-dates, not enquire", () => {
    const trip = makeTrip({
      status: "published",
      departures: [{ id: "d1", localDate: "2027-01-01", status: "sold-out", origins: [] }],
    });
    expect(getEnquiryMode(trip)).toBe("future-dates");
  });

  it("trip-level status always wins over departure data", () => {
    const trip = makeTrip({
      status: "sold-out",
      departures: [{ id: "d1", localDate: "2027-01-01", status: "available", origins: [] }],
    });
    expect(getEnquiryMode(trip)).toBe("sold-out");
  });

  it.each(["postponed", "cancelled", "completed"] as const)("maps trip status %s directly", (status) => {
    expect(getEnquiryMode(makeTrip({ status }))).toBe(status);
  });
});

describe("formatPriceINR", () => {
  it("never shows a fabricated zero/default — missing price reads as enquiry", () => {
    expect(formatPriceINR(undefined)).toBe("Price on enquiry");
  });

  it("formats a real price in INR", () => {
    expect(formatPriceINR(9999)).toContain("9,999");
  });
});

describe("getStartingPriceINR", () => {
  it("is undefined when no available departure has a priced package", () => {
    const trip = makeTrip({ departures: [{ id: "d1", localDate: "2027-01-01", status: "sold-out", origins: [{ city: "Delhi", packages: [{ id: "p1", name: "Basic", priceINR: 5000 }] }] }] });
    expect(getStartingPriceINR(trip)).toBeUndefined();
  });

  it("picks the cheapest package price across available departures/origins", () => {
    const trip = makeTrip({
      departures: [
        {
          id: "d1",
          localDate: "2027-01-01",
          status: "available",
          origins: [
            { city: "Delhi", packages: [{ id: "p1", name: "Basic", priceINR: 9999 }] },
            { city: "Mumbai", packages: [{ id: "p2", name: "Basic", priceINR: 7999 }] },
          ],
        },
      ],
    });
    expect(getStartingPriceINR(trip)).toBe(7999);
  });
});
