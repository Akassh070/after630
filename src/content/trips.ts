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
      "Join a 5-day, solo-friendly group trip to Himachal's Sainj Valley, 12–16 Dec. Meadow treks, Pundrik Rishi Lake, a waterfall and bonfire nights. From ₹15,999.",
    audience: [
      "Solo travellers who'd rather go with a group than plan everything alone. Come on your own or bring a friend.",
      "Travellers aged 20 to 40 who want to meet new people through shared activities, not just sightseeing.",
      "Anyone who wants mountain air without a tough expedition. The longest planned trek takes about 2 to 2½ hours, and outdoor activities are optional.",
      "People travelling from Delhi, Jaipur, Ahmedabad, Mumbai, Pune or Bengaluru who can reach Chandigarh for the group departure.",
    ],
    destinations: ["Sainj Valley", "Himachal Pradesh"],
    place: "Sainj Valley, Himachal Pradesh · Secret stay",
    category: "mountain",
    region: "north",
    tone: "Mountain group trip",
    status: "published",
    duration: { days: 5, nights: 4 },
    blurb: "Come solo. Meet strangers. Make memories. Five days in Himachal's Sainj Valley with up to 15 fellow explorers: meadow treks, a lake trek, a waterfall, bonfire nights and a DJ party.",
    description:
      "Not just a getaway. A mountain experience. This is a 5-day, 4-night group trip from Chandigarh to a secret mountain stay in Sainj Valley, Himachal Pradesh, with a limited group of 15 explorers. It's built for people coming on their own, so you won't be the only one who doesn't know anyone.\n\nThe days are planned but unhurried: a short meadow trek to a sound healing session, an afternoon at a waterfall, team challenges in the villages of Shenshar and Deori, a trek to Pundrik Rishi Lake and a meadow walk to a 360° viewpoint. Evenings bring bonfires, live music, a Tamasha movie night and a DJ party on the last night.\n\nYou'll stay at the After630 Mountain House, four travellers to a room with a separate bed each. Bus transport from Chandigarh and back, four nights' stay, breakfasts, dinners and every planned activity are included. The exact village and stay are kept private: confirmed travellers receive the meeting, stay and safety details before departure.",
    images: himachalPhotos.map((photo) => ({ ...photo, licensedForUse: true })),
    videos: [
      { ...video("himachal-sunset-dog"), caption: "Sunset from the meadow" },
      { ...video("himachal-meadow-dogs"), caption: "Morning with the mountain dogs" },
    ],
    fallbackImage: "/brand/after630-og-square.png",
    itinerary: [
      {
        day: 1,
        title: "12 December · The journey begins: Chandigarh to Sainj Valley",
        description:
          "Meet at Chandigarh Railway Station by 9:30 am for the 10:00 am departure. Our group of 15 explorers travels by bus to the secret mountain stay in Sainj Valley, arriving around 5:00–6:00 pm depending on road and traffic conditions. Settle in with tea and refreshments, followed by dinner, live music and a bonfire.",
      },
      {
        day: 2,
        title: "13 December · Meadows, sound healing and a waterfall",
        description:
          "After breakfast, take a short trek to a scenic meadow for a peaceful sound healing session. Return to the stay for a lunch break (lunch is not included), then head out to explore a waterfall. Back by late evening for dinner, a Tamasha movie night, live music and a bonfire.",
      },
      {
        day: 3,
        title: "14 December · Village discovery and the Pundrik Rishi Lake trek",
        description:
          "After breakfast, explore the villages of Shenshar and Deori in Sainj Valley through fun team challenges and discovery tasks, and take an approximately 2–2.5 hour trek to Pundrik Rishi Lake. Spend the day discovering local life and nature, then return to the stay for dinner, live music and a bonfire.",
      },
      {
        day: 4,
        title: "15 December · Mountain views and DJ night",
        description:
          "After breakfast, set out on a scenic meadow trek to a panoramic 360° viewpoint. Return to the stay to relax and recharge. In the evening, enjoy a DJ party, dancing and celebration, followed by dinner, live music and a bonfire.",
      },
      {
        day: 5,
        title: "16 December · Until the next journey",
        description:
          "Enjoy breakfast, check out in the morning and begin the return trip. Drop-off is at Chandigarh Railway Station, arriving in the afternoon or evening depending on road, traffic and weather conditions.",
      },
    ],
    inclusions: [
      "Round-trip group bus transport from Chandigarh Railway Station to the Himachal stay and back.",
      "4 nights' accommodation at the mountain stay.",
      "4 breakfasts (13–16 December) and 4 dinners (12–15 December).",
      "Planned group experiences: meadow trek, sound healing session, waterfall visit, village exploration challenges, panoramic viewpoint visit, bonfire, live music, movie night and group party.",
      "On-trip coordination by the After630 team.",
    ],
    exclusions: [
      "Lunch on all trip days.",
      "Personal expenses, snacks, beverages and shopping.",
      "Any activity, service or expense not specifically listed under inclusions.",
      "Medical expenses, travel insurance and emergency evacuation costs.",
      "Your travel to and from Chandigarh.",
    ],
    travelStay: [
      { label: "Meeting point", value: "Chandigarh Railway Station, 12 December. Arrive by 9:30 am, at least 30 minutes before the 10:00 am departure. Late arrival may mean missing the bus; no separate transfer is provided." },
      { label: "Drop-off", value: "Chandigarh Railway Station on 16 December, arriving in the afternoon or evening depending on road and weather conditions." },
      { label: "Transport", value: "Group bus from Chandigarh to the stay and back." },
      { label: "Room sharing", value: "Each room is shared by 4 travellers, and every traveller has their own separate bed." },
      { label: "Meals", value: "4 breakfasts and 4 dinners. Menus and timings may vary. Lunch, snacks and personal beverages are not included." },
      { label: "Group size", value: "A limited group of 15 explorers." },
      { label: "Stay details", value: "The exact village and stay are kept private. Confirmed travellers receive the meeting, stay and safety details before departure." },
    ],
    packing: [
      { label: "Warm layers", value: "Thermal wear, fleece or sweater, warm jacket, cap, gloves and warm socks." },
      { label: "Rain protection", value: "Raincoat or poncho, plus a waterproof cover for your backpack and phone." },
      { label: "Footwear", value: "Comfortable, sturdy trekking shoes with good grip. Avoid new or slippery shoes." },
      { label: "Personal essentials", value: "Reusable water bottle, personal medicines, toiletries, power bank and valid photo ID." },
    ],
    packingNote:
      "Snowfall is possible but not guaranteed, and mountain weather can change quickly. Keep a warm layer and rain protection handy.",
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
        question: "Where exactly are we going?",
        answer: "To Sainj Valley in Himachal Pradesh. The exact village and stay name are kept private in public listings, and confirmed travellers receive the meeting, stay and safety details before departure.",
      },
      {
        question: "Will there be snow in December?",
        answer: "Snowfall is possible in Himachal at this time of year, but it can't be predicted or guaranteed. Come prepared for cold, possible rain and changing mountain weather: warm winter clothing, rain protection and shoes with good grip.",
      },
      {
        question: "What does ₹15,999 cover?",
        answer: "It covers everything in the inclusions list: return group bus transport from Chandigarh, four nights' stay, four breakfasts, four dinners and all planned activities. Lunches, personal expenses, travel insurance and travel to Chandigarh are extra. The team confirms the final amount, including any applicable taxes, before you pay.",
      },
      {
        question: "How long are the treks?",
        answer: "The longest planned trek, to Pundrik Rishi Lake, takes approximately 2 to 2.5 hours. The other walks are shorter meadow treks. You'll need comfortable trekking shoes with good grip, suitable clothing, water and a reasonable level of walking fitness. The actual route and duration may vary with conditions, and outdoor activities are voluntary.",
      },
      {
        question: "What happens if the weather changes?",
        answer: "Safety comes first. If heavy rain, snow, slippery trails, road conditions or any other safety concern makes a trek or outdoor activity risky, the team may cancel or modify it. A suitable alternative will be planned wherever reasonably possible, though it may differ from the original plan.",
      },
      {
        question: "Is there first aid on the trip?",
        answer: "The team carries a basic first-aid kit for minor cuts, scrapes and routine needs, and may have a limited supply of common over-the-counter medicines for things like a cold, fever, headache or vomiting. These aren't a substitute for medical care, availability isn't guaranteed, and medicines are only given with your knowledge and consent. Please bring your own prescribed medicines. In an emergency, the group may need local medical help; those medical and transport costs aren't included.",
      },
      {
        question: "What health information should I share?",
        answer: "Before booking or departure, tell the team about any serious medical condition, allergy, mobility limitation, ongoing treatment, medication requirement or other health concern that could affect your participation.",
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
    // Owner-supplied itinerary PDF (DEC HIMACHAL TRIP 2026.pdf, 18 Nov 2026),
    // published as-is at the owner's request.
    brochure: {
      href: "/downloads/after630-himachal-15-strangers-and-stories-dec-2026.pdf",
      fileName: "After630 - 15 Strangers & Stories - Himachal Dec 2026.pdf",
      sizeLabel: "1.9 MB",
    },
    published: true,
    featured: true,
  },
];
