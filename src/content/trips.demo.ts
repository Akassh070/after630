/**
 * Prototype/demo trip content, ported from handoff/ui/after630_explore_trips_v1.html
 * (the `TRIPS` array) and handoff/ui/after630_trip_details_v1.html (Jibhi detail
 * content). Every trip here is `status: "coming-soon"` and has zero departures
 * on purpose — they exist to prove the listing/filters/detail UI works, not to
 * imply a bookable trip. `isDemo: true` marks non-production inventory in data.
 *
 * Sample names, places, durations and copy are illustrative UI content, not
 * verified After630 inventory (see handoff/ui/README.md).
 */
import type { Trip } from "@/lib/trips/types";
import { img } from "@/lib/images";

export const demoTrips: Trip[] = [
  {
    id: "jibhi",
    slug: "jibhi-slow-mountains",
    title: "Jibhi & the Slow Mountains",
    tagline: "A slower kind of mountain adventure",
    region: "north",
    destinations: ["Jibhi, Himachal Pradesh"],
    place: "Jibhi, Himachal Pradesh, India",
    category: "mountain",
    tone: "Mountain Escape",
    status: "coming-soon",
    duration: { days: 4, nights: 3 },
    blurb:
      "Forest cabins, quiet mornings and the kind of mountain air that makes everything slow down.",
    description:
      "Imagine trading the familiar rush for forest trails, mountain air and conversations that last longer than the drive. This sample journey imagines a quieter side of Himachal — designed around exploring together, not rushing through a checklist.",
    images: [
      { ...img("atmospheric-mountain-landscape-representing-adventure"), licensedForUse: false },
      { ...img("green-forest-and-mountain-landscape"), licensedForUse: false },
      { ...img("alpine-trail-with-clear-mountain"), licensedForUse: false },
      { ...img("mountain-valley-with-evergreen-forest"), licensedForUse: false },
      { ...img("night-sky-over-mountain-silhouettes"), licensedForUse: false },
    ],
    fallbackImage: "/images/fallback/jibhi.svg",
    itinerary: [
      {
        day: 1,
        title: "Arrive, settle in & meet your people",
        description:
          "Arrive in the Jibhi area, settle into your stay and get acquainted with the group. Enjoy a relaxed evening with time to explore the local surroundings. Transport and check-in arrangements will depend on the confirmed package.",
      },
      {
        day: 2,
        title: "Forest trails & mountain viewpoints",
        description:
          "A day inspired by the region's forest scenery, viewpoints and beautiful walking routes. Exact activities will be selected according to road conditions, accessibility and the final itinerary.",
      },
      {
        day: 3,
        title: "Village scenes, cafés & unhurried time",
        description:
          "Explore nearby places at a comfortable pace, enjoy local experiences and leave room for the spontaneous moments that make group travel memorable. Meal arrangements are not yet set.",
      },
      {
        day: 4,
        title: "One last mountain morning & departure",
        description:
          "Make the most of your last morning before checking out and departing according to the final transport schedule. Departure city, time and transfer details will be published for actual trips.",
      },
    ],
    inclusions: [
      "Listed accommodation for package nights",
      "Transport on specified routes",
      "Group coordination as described",
      "Activities expressly listed in the itinerary",
    ],
    exclusions: [
      "Personal shopping and expenses",
      "Meals not expressly listed",
      "Optional activities or upgrades",
      "Costs arising from itinerary changes, as governed by final terms",
    ],
    travelStay: [
      { label: "Departure city", value: "To be announced" },
      { label: "Travel mode", value: "To be announced" },
      { label: "Accommodation", value: "To be announced" },
      { label: "Meals & extras", value: "To be announced" },
    ],
    faq: [
      {
        question: "Is this trip currently available to book?",
        answer:
          "Departures for this journey are not confirmed yet. You can ask about future dates via WhatsApp — an enquiry is not a reservation.",
      },
      {
        question: "Can I join After630 trips as a solo traveller?",
        answer:
          "Yes, you can enquire as a solo traveller. Any trip-specific joining conditions will be shared when a departure is published.",
      },
      {
        question: "How does WhatsApp booking work?",
        answer:
          "Send an enquiry on WhatsApp. Our team confirms availability and payment instructions, then sends confirmation after verification. An enquiry alone is not a reservation.",
      },
      {
        question: "Will I see exact prices and departure dates?",
        answer:
          "Yes. Once a departure is published, the trip page will show dates, origin-city packages, prices and other requirements. Until then, details are listed as to be announced.",
      },
      {
        question: "What happens if a trip is cancelled?",
        answer:
          "Cancellation, refund and rescheduling terms are shared before you pay, and also appear on our Cancellation & Refunds page.",
      },
    ],
    departures: [],
    policyUrls: { terms: "/terms", cancellation: "/cancellation-refunds" },
    published: true,
    featured: true,
    isDemo: true,
  },
  {
    id: "rishikesh",
    slug: "rishikesh-riverside-escape",
    title: "The Riverside Escape",
    region: "north",
    destinations: ["Rishikesh, Uttarakhand"],
    place: "Rishikesh, Uttarakhand",
    category: "weekend",
    tone: "Weekend Getaway",
    status: "coming-soon",
    duration: { days: 3, nights: 2 },
    blurb:
      "A weekend built around the river, open-air cafés and the kind of pace that resets you.",
    images: [
      { ...img("scenic-road-through-a-beautiful"), licensedForUse: false },
      { ...img("river-rafting-atmosphere-near-mountain"), licensedForUse: false },
      { ...img("mountain-pass-and-open-sky"), licensedForUse: false },
      { ...img("calm-riverside-waters-surrounded-by"), licensedForUse: false },
      { ...img("open-highway-stretching-toward-distant"), licensedForUse: false },
    ],
    fallbackImage: "/images/fallback/rishikesh.svg",
    departures: [],
    published: true,
    isDemo: true,
  },
  {
    id: "udaipur",
    slug: "udaipur-lakeside",
    title: "Lakeside in Udaipur",
    region: "west",
    destinations: ["Udaipur, Rajasthan"],
    place: "Udaipur, Rajasthan",
    category: "culture",
    tone: "City & Culture",
    status: "coming-soon",
    duration: { days: 3, nights: 2 },
    blurb:
      "Lake-facing havelis, old-city lanes and golden-hour views worth slowing down for.",
    images: [
      { ...img("hill-viewpoint-overlooking-water-and"), licensedForUse: false },
      { ...img("lakeside-resort-atmosphere-at-golden"), licensedForUse: false },
      { ...img("historic-palace-architecture-against-blue"), licensedForUse: false },
      { ...img("old-city-lanes-and-warm"), licensedForUse: false },
      { ...img("lake-view-with-boats-near"), licensedForUse: false },
    ],
    fallbackImage: "/images/fallback/udaipur.svg",
    departures: [],
    published: true,
    isDemo: true,
  },
  {
    id: "coorg",
    slug: "coorg-into-the-green",
    title: "Into the Green",
    region: "south",
    destinations: ["Coorg, Karnataka"],
    place: "Coorg, Karnataka",
    category: "weekend",
    tone: "Weekend Getaway",
    status: "coming-soon",
    duration: { days: 3, nights: 2 },
    blurb:
      "Coffee estates, waterfalls and misty hill roads for a slow-travel weekend.",
    images: [
      { ...img("atmospheric-mountain-landscape-representing-adventure"), licensedForUse: false },
      { ...img("misty-forest-path-through-evergreen"), licensedForUse: false },
      { ...img("dramatic-mountain-peaks-under-open"), licensedForUse: false },
      { ...img("fog-rolling-over-forested-hills"), licensedForUse: false },
      { ...img("waterfall-cascade-in-the-western"), licensedForUse: false },
    ],
    fallbackImage: "/images/fallback/coorg.svg",
    departures: [],
    published: true,
    isDemo: true,
  },
  {
    id: "spiti",
    slug: "spiti-high-road",
    title: "The High Road to Spiti",
    region: "north",
    destinations: ["Spiti Valley, Himachal Pradesh"],
    place: "Spiti Valley, Himachal Pradesh",
    category: "road",
    tone: "Road Trip",
    status: "coming-soon",
    duration: { days: 7, nights: 6 },
    blurb:
      "High-altitude roads, stark valleys and monasteries perched above the clouds.",
    images: [
      { ...img("spiti-valley-himachal-pradesh"), licensedForUse: false },
      { ...img("mountain-pass-and-open-sky"), licensedForUse: false },
      { ...img("atmospheric-mountain-landscape-representing-adventure"), licensedForUse: false },
      { ...img("alpine-trail-with-clear-mountain"), licensedForUse: false },
      { ...img("mountain-valley-with-evergreen-forest"), licensedForUse: false },
    ],
    fallbackImage: "/images/fallback/spiti.svg",
    departures: [],
    published: true,
    isDemo: true,
  },
  {
    id: "kutch",
    slug: "kutch-desert-afterglow",
    title: "Desert Afterglow",
    region: "west",
    destinations: ["Kutch, Gujarat"],
    place: "Kutch, Gujarat",
    category: "culture",
    tone: "City & Culture",
    status: "coming-soon",
    duration: { days: 4, nights: 3 },
    blurb:
      "White desert sunsets, handicraft villages and a horizon that goes on forever.",
    images: [
      { ...img("kutch-gujarat"), licensedForUse: false },
      { ...img("desert-dunes-under-warm-evening"), licensedForUse: false },
      { ...img("vast-arid-landscape-at-sunset"), licensedForUse: false },
      { ...img("golden-desert-horizon-at-dusk"), licensedForUse: false },
      { ...img("open-highway-stretching-toward-distant"), licensedForUse: false },
    ],
    fallbackImage: "/images/fallback/kutch.svg",
    departures: [],
    published: true,
    isDemo: true,
  },
  {
    id: "mcleod",
    slug: "mcleod-ganj-mountain-trails",
    title: "Mountain Trails & Chai",
    region: "north",
    destinations: ["McLeod Ganj, Himachal Pradesh"],
    place: "McLeod Ganj, Himachal Pradesh",
    category: "mountain",
    tone: "Mountain Escape",
    status: "coming-soon",
    duration: { days: 4, nights: 3 },
    blurb:
      "Prayer flags, cedar forests and cafés with a view, at a gentler mountain pace.",
    images: [
      { ...img("green-forest-and-mountain-landscape"), licensedForUse: false },
      { ...img("atmospheric-mountain-landscape-representing-adventure"), licensedForUse: false },
      { ...img("alpine-trail-with-clear-mountain"), licensedForUse: false },
      { ...img("night-sky-over-mountain-silhouettes"), licensedForUse: false },
      { ...img("hill-viewpoint-overlooking-water-and"), licensedForUse: false },
    ],
    fallbackImage: "/images/fallback/mcleod.svg",
    departures: [],
    published: true,
    isDemo: true,
  },
  {
    id: "lonavala",
    slug: "lonavala-weekend-reset",
    title: "The Weekend Reset",
    region: "west",
    destinations: ["Lonavala, Maharashtra"],
    place: "Lonavala, Maharashtra",
    category: "weekend",
    tone: "Weekend Getaway",
    status: "coming-soon",
    duration: { days: 2, nights: 1 },
    blurb:
      "A short escape into the Sahyadris — waterfalls, viewpoints and good company.",
    images: [
      { ...img("travellers-on-an-outdoor-adventure"), licensedForUse: false },
      { ...img("hill-viewpoint-overlooking-water-and"), licensedForUse: false },
      { ...img("misty-forest-path-through-evergreen"), licensedForUse: false },
      { ...img("waterfall-cascade-in-the-western"), licensedForUse: false },
      { ...img("fog-rolling-over-forested-hills"), licensedForUse: false },
    ],
    fallbackImage: "/images/fallback/lonavala.svg",
    departures: [],
    published: true,
    isDemo: true,
  },
];
