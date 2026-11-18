import type { Trip } from "@/lib/trips/types";
import { img, video } from "@/lib/images";

// Real photos from the After630 Mountain House. The first four fill the trip
// page's gallery grid; all of them rotate in the trip-card slideshows.
const himachalPhotos = [
  img("himachal-village-trail"),
  img("himachal-mountain-house-sign"),
  img("himachal-stay-exterior"),
  img("himachal-traditional-house"),
  img("himachal-hillside-village"),
  img("himachal-log-wall-sign"),
];

export const realTrips: Trip[] = [
  {
    id: "15-strangers-and-stories",
    slug: "15-strangers-and-stories",
    title: "15 Strangers & Stories",
    tagline: "The Himachal Experience",
    subtitle: "A 5-Day Himachal Group Trip from Chandigarh",
    seoTitle: "Himachal Group Trip from Chandigarh · 12–16 Dec",
    seoDescription:
      "Join a 5-day, solo-friendly group trip to a secret Himachal village, 12–16 Dec. Meadow treks, a waterfall, bonfire nights and up to 15 travellers. From ₹15,999.",
    audience: [
      "Solo travellers who'd rather go with a group than plan everything alone. Come on your own or bring a friend.",
      "Travellers aged 20 to 40 who want to meet new people through shared activities, not just sightseeing.",
      "Anyone who wants mountain air without a tough expedition. The longest planned trek takes about 2 to 2½ hours, and outdoor activities are optional.",
      "People travelling from Delhi, Jaipur, Ahmedabad, Mumbai, Pune or Bengaluru who can reach Chandigarh for the group departure.",
    ],
    destinations: ["Himachal Pradesh"],
    place: "Himachal Pradesh · Secret destination",
    category: "mountain",
    region: "north",
    tone: "Mountain group trip",
    status: "published",
    duration: { days: 5, nights: 4 },
    blurb: "Five days in the Himachal mountains with up to 15 fellow travellers. We leave together from Chandigarh for meadow treks, a waterfall, village challenges and bonfire evenings. Come solo or bring a friend.",
    description:
      "This is a 5-day, 4-night group trip from Chandigarh to a quiet village in Himachal Pradesh, with no more than 15 travellers. It's built for people coming on their own, so you won't be the only one who doesn't know anyone.\n\nThe days are planned but unhurried: a short meadow trek to a sound healing session, an afternoon at a waterfall, team challenges in a mountain village and a trek to a 360° viewpoint. Evenings bring bonfires, live music, a screening of Tamasha and a final-night party.\n\nYou'll stay at the After630 Mountain House, four travellers to a room with a separate bed each. Group transport, four nights' stay, breakfasts, dinners and every planned activity are included. Confirmed travellers receive the exact village, stay and essential safety details privately before departure.",
    images: himachalPhotos.map((photo) => ({ ...photo, licensedForUse: true })),
    videos: [
      { ...video("himachal-sunset-dog"), caption: "Sunset from the meadow" },
      { ...video("himachal-meadow-dogs"), caption: "Morning with the mountain dogs" },
    ],
    fallbackImage: "/brand/after630-og-square.png",
    itinerary: [
      {
        day: 1,
        title: "12 December · Chandigarh to the mountains, bonfire and live music",
        description:
          "Meet at Chandigarh Railway Station by 9:30 am for the 10:00 am departure. Expect to reach the mountain stay around 5:00–6:00 pm, depending on road and traffic conditions. Settle in with tea and refreshments, then have dinner by the bonfire with live music.",
      },
      {
        day: 2,
        title: "13 December · Meadow trek, sound healing and a waterfall",
        description:
          "After breakfast, take a short trek to a meadow for a sound healing session. Return to the stay around lunchtime. Explore a waterfall in the afternoon, then head back for dinner and a screening of Tamasha.",
      },
      {
        day: 3,
        title: "14 December · Village challenges in the Himachal hills",
        description:
          "After breakfast, explore a nearby mountain village through team tasks and local discovery challenges. Return to the stay for dinner.",
      },
      {
        day: 4,
        title: "15 December · 360° viewpoint trek and the farewell party",
        description:
          "After breakfast, trek across scenic meadows to a 360° viewpoint. Return to the stay to recharge before an evening of music, dancing, a group party and dinner.",
      },
      {
        day: 5,
        title: "16 December · Breakfast, then back to Chandigarh",
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
        question: "Can I join this Himachal trip solo?",
        answer: "Yes. The trip is designed for people coming on their own, and the group is capped at 15 travellers so it's easy to get to know everyone. You're also welcome to come with a friend.",
      },
      {
        question: "Who is this trip for?",
        answer: "It's planned for travellers aged 20 to 40 who enjoy the outdoors and meeting new people. You don't need trekking experience. The longest planned trek takes about 2 to 2½ hours.",
      },
      {
        question: "Where does the trip start and end?",
        answer: "At Chandigarh Railway Station. Arrive by 9:30 am on 12 December for the 10:00 am departure. We return there on 16 December, arriving in the afternoon or evening depending on road conditions.",
      },
      {
        question: "I live in Delhi, Mumbai, Bengaluru or another city. How do I join?",
        answer: "Plan your own travel to Chandigarh Railway Station so you arrive by 9:30 am on 12 December. If you're coming from far away, consider reaching Chandigarh the day before. For the return, book onward travel from Chandigarh no earlier than the evening of 16 December. Your travel to and from Chandigarh isn't included in the price.",
      },
      {
        question: "Why is the destination a secret?",
        answer: "The trip goes to a quiet mountain village. We share the exact village and stay privately with confirmed travellers before departure, along with the essential safety details.",
      },
      {
        question: "Will there be snow in December?",
        answer: "Snowfall is possible but not guaranteed. Pack warm layers, rain protection and shoes with good grip.",
      },
      {
        question: "What does ₹15,999 cover?",
        answer: "It covers everything in the inclusions list: return group transport from Chandigarh, four nights' stay, four breakfasts, four dinners and all planned activities. Lunches, personal expenses, travel insurance and travel to Chandigarh are extra. The team confirms the final amount, including any applicable taxes, before you pay.",
      },
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
        answer: "Your seat is confirmed only after the required payment has been received and the After630 team has sent you a written confirmation.",
      },
      {
        question: "What is the cancellation policy?",
        answer: "Send your cancellation in writing on WhatsApp. Refunds depend on how far ahead of the 12 December departure you cancel: 90% of the package amount at 30 days or more, 50% at 15–29 days, 25% at 7–14 days, and no refund within 7 days or for no-shows. Non-refundable third-party and payment gateway charges, if any, may be deducted. Full details are on the Cancellation & Refunds page.",
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
  },
];
