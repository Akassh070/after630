export type TicketType = {
  id: string;
  label: string;
  price: number;
  description: string;
  available: boolean;
  razorpayLink?: string;
};

export type EventLineupItem = {
  time: string;
  act: string;
  type: string;
};

export type After630Event = {
  slug: string;
  title: string;
  tagline: string;
  category: 'music' | 'storytelling' | 'comedy' | 'networking';
  categoryLabel: string;
  categoryIcon: string;
  date: string;          // e.g. "22 Mar 2026"
  day: string;           // e.g. "22"
  month: string;         // e.g. "Mar"
  year: string;          // e.g. "2026"
  dayOfWeek: string;     // e.g. "Sunday"
  time: string;          // e.g. "7:00 PM – 10:00 PM"
  venue: string;
  venueArea: string;     // e.g. "SG Highway"
  city: string;
  capacity: number;
  spotsLeft: number;
  image: string;         // public path
  shortDesc: string;
  fullDesc: string;
  lineup: EventLineupItem[];
  ticketTypes: TicketType[];
  isSoldOut: boolean;
  isFeatured: boolean;
};

export const events: After630Event[] = [
  {
    slug: 'strangers-and-stories',
    title: 'Strangers & Stories',
    tagline: 'An evening where strangers turn into stories.',
    category: 'storytelling',
    categoryLabel: 'Storytelling Night',
    categoryIcon: '📖',
    date: '05 Apr 2026',
    day: '05',
    month: 'Apr',
    year: '2026',
    dayOfWeek: 'Sunday',
    time: '7:30 PM – 10:00 PM',
    venue: 'Monkey Café',
    venueArea: 'Ahmedabad',
    city: 'Ahmedabad',
    capacity: 40,
    spotsLeft: 10,
    image: '/gallery_storytelling.png',
    shortDesc: 'An evening where strangers turn into stories. Real conversations. Unexpected connections. And moments you didn’t know you needed.',
    fullDesc: `Strangers & Stories is an intimate evening designed to break the monotony of after-office routines and turn ordinary nights into something unforgettable.
    
In a city that’s always moving, we rarely pause to truly connect. This experience is built around one simple idea everyone you meet has a story worth hearing. And maybe, just maybe, it’s a story you didn’t know you needed.

Expect a night filled with real conversations, playful interactions, and unexpected connections. No awkward networking, no forced introductions just a space where you can be yourself, meet new people, and enjoy the moment.

To set the vibe, the evening features live music that keeps the energy flowing, along with a complimentary drink to help you relax, open up, and truly be part of the experience.

Come alone or bring a friend either way, you won’t leave as strangers.

You’ll leave with stories. ❤️`,
    lineup: [
      { time: '7:30 PM', act: 'Arrival & Welcome', type: 'networking' },
      { time: '8:00 PM', act: 'The Icebreaker Beyond Small Talk', type: 'interaction' },
      { time: '8:30 PM', act: 'Strangers & Stories Sharing Circles', type: 'storytelling' },
      { time: '9:00 PM', act: 'Game start with live music', type: 'music' },
      { time: '9:45 PM', act: 'Closing Moments', type: 'outro' },
    ],
    ticketTypes: [
      {
        id: 'early-bird',
        label: 'Early Bird',
        price: 399,
        description: 'Includes entry + specialty drink.',
        available: true,
        razorpayLink: 'https://rzp.io/l/after630-strangers-early',
      },
      {
        id: 'regular',
        label: 'Regular Admission',
        price: 549,
        description: 'Includes entry + specialty drink + curated journal.',
        available: true,
        razorpayLink: 'https://rzp.io/l/after630-strangers-regular',
      },
    ],
    isSoldOut: false,
    isFeatured: true,
  },
];

export function getEventBySlug(slug: string): After630Event | undefined {
  return events.find((e) => e.slug === slug);
}

export function getFeaturedEvents(): After630Event[] {
  return events.filter((e) => e.isFeatured);
}

export function getEventsByCategory(category: string): After630Event[] {
  if (category === 'all') return events;
  return events.filter((e) => e.category === category);
}
