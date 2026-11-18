import type { Trip } from "@/lib/trips/types";

const himachalArtwork = "/images/trips/15-strangers-and-stories.webp";

export const realTrips: Trip[] = [
  {
    id: "15-strangers-and-stories",
    slug: "15-strangers-and-stories",
    title: "15 Strangers & Stories",
    tagline: "The Himachal Experience",
    destinations: ["Himachal Pradesh"],
    place: "Himachal Pradesh · Secret destination",
    category: "mountain",
    region: "north",
    tone: "Mountain group trip",
    status: "published",
    duration: { days: 5, nights: 4 },
    blurb: "Five days from Chandigarh to a secret Himachal destination, with meadow treks, a waterfall visit and time to get to know your fellow explorers.",
    description:
      "Come solo and spend five days in the mountains with a group of up to 15 travellers. The plan includes meadow treks, a sound healing session, a waterfall visit, village challenges, bonfire evenings and a final-night celebration. Confirmed travellers receive the village, stay and essential safety details privately before departure.",
    images: [
      {
        src: himachalArtwork,
        alt: "15 Strangers & Stories: The Himachal Experience trip artwork",
        licensedForUse: true,
        fit: "contain",
      },
    ],
    fallbackImage: himachalArtwork,
    itinerary: [
      {
        day: 1,
        title: "12 December · The journey begins",
        description:
          "Meet at Chandigarh Railway Station by 9:30 am for the 10:00 am departure. Expect to reach the mountain stay around 5:00–6:00 pm, depending on road and traffic conditions. Settle in with tea and refreshments, then have dinner by the bonfire with live music.",
      },
      {
        day: 2,
        title: "13 December · Meadow trek and waterfall",
        description:
          "After breakfast, take a short trek to a meadow for a sound healing session. Return to the stay around lunchtime. Explore a waterfall in the afternoon, then head back for dinner and a screening of Tamasha.",
      },
      {
        day: 3,
        title: "14 December · Mountain village exploration",
        description:
          "After breakfast, explore a nearby mountain village through team tasks and local discovery challenges. Return to the stay for dinner.",
      },
      {
        day: 4,
        title: "15 December · Panoramic views and celebration",
        description:
          "After breakfast, trek across scenic meadows to a 360° viewpoint. Return to the stay to recharge before an evening of music, dancing, a group party and dinner.",
      },
      {
        day: 5,
        title: "16 December · Return to Chandigarh",
        description:
          "Have breakfast, check out and travel back to Chandigarh Railway Station. Expect to arrive in the afternoon or evening, depending on road and traffic conditions.",
      },
    ],
    inclusions: [
      "Round-trip group transport from Chandigarh Railway Station to the mountain stay.",
      "Four nights at the mountain stay.",
      "Four breakfasts (13–16 December) and four dinners (12–15 December).",
      "Planned treks, sound healing, waterfall visit, village challenges, viewpoint visit, bonfire, live music, movie night and group party.",
      "On-trip coordination by the After630 team.",
    ],
    exclusions: [
      "Lunch on all trip days.",
      "Personal expenses, snacks, beverages and shopping.",
      "Activities and services outside the listed inclusions.",
      "Medical expenses, travel insurance and emergency evacuation.",
    ],
    travelStay: [
      { label: "Meeting point", value: "Chandigarh Railway Station. Arrive by 9:30 am on 12 December for the 10:00 am departure." },
      { label: "Drop-off", value: "Chandigarh Railway Station on 16 December. Afternoon or evening arrival, subject to road and weather conditions." },
      { label: "Room sharing", value: "Four travellers per room, with a separate bed for each traveller." },
      { label: "Group size", value: "Up to 15 travellers." },
      { label: "Stay details", value: "The organiser shares the exact village and stay privately with confirmed travellers before departure." },
      { label: "What to pack", value: "Warm layers, rain protection, sturdy trekking shoes, a water bottle, personal medicines, toiletries, a power bank and valid photo ID." },
    ],
    faq: [
      {
        question: "How long are the treks?",
        answer: "One planned trek may take roughly 2 to 2½ hours. The route and duration depend on conditions. Bring shoes with good grip, layers and water. Outdoor activities are optional.",
      },
      {
        question: "What happens if the weather changes?",
        answer: "Snowfall is possible. The team may change or cancel outdoor activities if weather, roads or trails become unsafe. They will plan an alternative where possible.",
      },
      {
        question: "What health information should I share?",
        answer: "Tell the team before booking or departure about any health condition, allergy, mobility limitation or medication requirement that could affect your participation. The team carries a basic first-aid kit. Bring your own prescribed medicines.",
      },
      {
        question: "When is my booking confirmed?",
        answer: "The After630 team confirms your seat in writing after receiving payment. Ask the team for the written cancellation, rescheduling and refund terms before paying.",
      },
    ],
    departures: [
      {
        id: "himachal-december-2026",
        localDate: "2026-12-12",
        endDate: "2026-12-16",
        status: "available",
        origins: [
          {
            city: "Chandigarh",
            packages: [{ id: "himachal-package", name: "Himachal Experience", priceINR: 15_999 }],
          },
        ],
      },
    ],
    published: true,
    featured: true,
    isDemo: false,
  },
];
