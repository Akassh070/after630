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
    fullDesc: `Strangers & Stories is an intimate evening designed to break the predictability of after-office routines. 

We believe that everyone you meet has a story worth hearing, and maybe, just maybe, they have a story that you need to hear too. 

Expect real conversations, unexpected connections, and the kind of moments that remind you why life in Ahmedabad is about more than just work. No scripts, no networking pressure, just genuine human interaction. 

Come alone or bring a friend — either way, you'll leave with a story.`,
    lineup: [
      { time: '7:30 PM', act: 'Arrival + Welcome Coffee', type: 'networking' },
      { time: '7:50 PM', act: 'The Icebreaker – Beyond Small Talk', type: 'interaction' },
      { time: '8:20 PM', act: 'Sharing Circles – Real Stories', type: 'storytelling' },
      { time: '9:15 PM', act: 'Unstructured Conversations', type: 'networking' },
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
