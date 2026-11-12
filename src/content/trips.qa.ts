/**
 * QA-ONLY fixtures — never shown outside automated tests / local QA.
 *
 * These exist solely to exercise the departure → origin → package selector,
 * the WhatsApp enquiry message builder, and the sold-out/postponed/cancelled/
 * completed states end-to-end, since the real demo trips (trips.demo.ts) are
 * intentionally all "coming-soon" with zero departures. Only loaded when
 * AFTER630_TRIP_SOURCE=qa (see src/lib/config.ts). Prices/dates here are
 * fictional test data, not After630 inventory.
 */
import type { Trip } from "@/lib/trips/types";
import { img } from "@/lib/images";

export const qaTrips: Trip[] = [
  {
    id: "qa-published",
    slug: "qa-published-trip",
    title: "[QA] Published Test Trip",
    region: "north",
    destinations: ["Test Hills"],
    place: "Test Hills, Test State",
    category: "mountain",
    tone: "QA Fixture",
    status: "published",
    duration: { days: 3, nights: 2 },
    blurb: "QA fixture with a bookable departure, used only in automated tests.",
    images: [
      { ...img("atmospheric-mountain-landscape-representing-adventure"), licensedForUse: false },
    ],
    fallbackImage: "/images/fallback/jibhi.svg",
    itinerary: [
      { day: 1, title: "Arrival", description: "QA fixture day one." },
      { day: 2, title: "Activities", description: "QA fixture day two." },
      { day: 3, title: "Departure", description: "QA fixture day three." },
    ],
    inclusions: ["QA inclusion A", "QA inclusion B"],
    exclusions: ["QA exclusion A"],
    travelStay: [{ label: "Departure city", value: "Test City" }],
    faq: [{ question: "Is this real?", answer: "No, this is a QA fixture." }],
    departures: [
      {
        id: "dep-1",
        localDate: "2027-03-14",
        status: "available",
        origins: [
          {
            city: "Test City A",
            packages: [
              { id: "pkg-basic", name: "Basic", priceINR: 9999, inclusions: ["Stay", "Transport"] },
              { id: "pkg-premium", name: "Premium", priceINR: 14999, inclusions: ["Stay", "Transport", "Meals"] },
            ],
          },
          {
            city: "Test City B",
            packages: [{ id: "pkg-basic-b", name: "Basic", priceINR: 10999 }],
          },
        ],
      },
      {
        id: "dep-2",
        localDate: "2027-04-02",
        status: "sold-out",
        origins: [{ city: "Test City A", packages: [{ id: "pkg-basic-2", name: "Basic", priceINR: 9999 }] }],
      },
    ],
    policyUrls: { terms: "/terms", cancellation: "/cancellation-refunds" },
    published: true,
    isDemo: true,
  },
  {
    id: "qa-sold-out",
    slug: "qa-sold-out-trip",
    title: "[QA] Sold Out Test Trip",
    region: "south",
    destinations: ["Test Valley"],
    place: "Test Valley, Test State",
    category: "weekend",
    tone: "QA Fixture",
    status: "sold-out",
    duration: { days: 2, nights: 1 },
    blurb: "QA fixture for the sold-out state.",
    images: [
      { ...img("travellers-on-an-outdoor-adventure"), licensedForUse: false },
    ],
    fallbackImage: "/images/fallback/lonavala.svg",
    departures: [
      {
        id: "dep-1",
        localDate: "2027-02-10",
        status: "sold-out",
        origins: [{ city: "Test City", packages: [{ id: "pkg-1", name: "Standard", priceINR: 7999 }] }],
      },
    ],
    published: true,
    isDemo: true,
  },
  {
    id: "qa-postponed",
    slug: "qa-postponed-trip",
    title: "[QA] Postponed Test Trip",
    region: "west",
    destinations: ["Test Coast"],
    place: "Test Coast, Test State",
    category: "culture",
    tone: "QA Fixture",
    status: "postponed",
    duration: { days: 4, nights: 3 },
    blurb: "QA fixture for the postponed state.",
    images: [
      { ...img("kutch-gujarat"), licensedForUse: false },
    ],
    fallbackImage: "/images/fallback/kutch.svg",
    departures: [],
    published: true,
    isDemo: true,
  },
];
