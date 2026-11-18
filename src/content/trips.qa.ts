/**
 * QA-ONLY fixtures — never shown outside automated tests / local QA.
 *
 * These exercise the departure selector, photo gallery, and availability states
 * when AFTER630_TRIP_SOURCE=qa. Their details and prices are fictional.
 */
import type { Trip } from "@/lib/trips/types";
import { img } from "@/lib/images";

const fallbackImage = "/brand/after630-og-square.png";

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
      { ...img("pages-trips-hero-01"), licensedForUse: false },
      { ...img("pages-trips-hero-02"), licensedForUse: false },
      { ...img("pages-trips-hero-03"), licensedForUse: false },
      { ...img("pages-live-trip-15-strangers"), licensedForUse: false },
    ],
    fallbackImage,
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
      { ...img("homepage-people-a-01"), licensedForUse: false },
    ],
    fallbackImage,
    departures: [
      {
        id: "dep-1",
        localDate: "2027-02-10",
        status: "sold-out",
        origins: [{ city: "Test City", packages: [{ id: "pkg-1", name: "Standard", priceINR: 7999 }] }],
      },
    ],
    published: true,
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
      { ...img("homepage-way-03"), licensedForUse: false },
    ],
    fallbackImage,
    departures: [],
    published: true,
  },
  {
    id: "qa-future",
    slug: "qa-future-trip",
    title: "[QA] Future Test Trip",
    region: "west",
    destinations: ["Test Trail"],
    place: "Test Trail, Test State",
    category: "road",
    tone: "QA Fixture",
    status: "coming-soon",
    duration: { days: 3, nights: 2 },
    blurb: "QA fixture for trips without confirmed departures.",
    images: [{ ...img("pages-about-chapter-02"), licensedForUse: false }],
    fallbackImage,
    departures: [],
    published: true,
  },
];
