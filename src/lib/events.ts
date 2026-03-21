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
    slug: 'unplugged-sessions-vol-4',
    title: 'Unplugged Sessions Vol. 4',
    tagline: 'Raw voices. Real music. No filters.',
    category: 'music',
    categoryLabel: 'Live Music',
    categoryIcon: '🎸',
    date: '22 Mar 2026',
    day: '22',
    month: 'Mar',
    year: '2026',
    dayOfWeek: 'Sunday',
    time: '7:00 PM – 10:00 PM',
    venue: 'The Attic',
    venueArea: 'SG Highway',
    city: 'Ahmedabad',
    capacity: 60,
    spotsLeft: 12,
    image: '/gallery_music.png',
    shortDesc: 'Intimate acoustic sets and full-band performances by corporate professionals who live for music.',
    fullDesc: `After 6:30 presents Unplugged Sessions Vol. 4 — our most anticipated music night of the season.

This is not a concert. This is your colleague from the next cubicle, finally letting the world hear the music that's been living in their heart during every boring Monday meeting.

Expect acoustic guitars, soulful voices, harmonica solos, and the kind of music that makes you forget you have a standup call at 9 AM tomorrow.

Come for the music. Stay for the conversations. Leave with new friends.`,
    lineup: [
      { time: '7:00 PM', act: 'Doors Open + Welcome Chai', type: 'networking' },
      { time: '7:30 PM', act: 'Rohan Mehta – Acoustic Guitar', type: 'music' },
      { time: '8:00 PM', act: 'Priya Shah – Indie Vocals', type: 'music' },
      { time: '8:30 PM', act: 'Open Jam Session', type: 'music' },
      { time: '9:15 PM', act: 'Ankit Patel – Sitar + Fusion', type: 'music' },
      { time: '9:45 PM', act: 'Coffee Circle & Conversations', type: 'networking' },
    ],
    ticketTypes: [
      {
        id: 'early-bird',
        label: 'Early Bird',
        price: 299,
        description: 'Limited seats. First come, first served.',
        available: true,
        razorpayLink: 'https://rzp.io/l/after630-unplugged-early',
      },
      {
        id: 'regular',
        label: 'Regular',
        price: 499,
        description: 'Includes entry + welcome drink.',
        available: true,
        razorpayLink: 'https://rzp.io/l/after630-unplugged-regular',
      },
    ],
    isSoldOut: false,
    isFeatured: true,
  },
  {
    slug: 'tell-me-something-true',
    title: 'Tell Me Something True',
    tagline: 'Real stories. No script. No filters.',
    category: 'storytelling',
    categoryLabel: 'Storytelling Night',
    categoryIcon: '📖',
    date: '29 Mar 2026',
    day: '29',
    month: 'Mar',
    year: '2026',
    dayOfWeek: 'Sunday',
    time: '7:30 PM – 9:30 PM',
    venue: 'Café Noir',
    venueArea: 'CG Road',
    city: 'Ahmedabad',
    capacity: 40,
    spotsLeft: 8,
    image: '/gallery_storytelling.png',
    shortDesc: 'Unscripted, raw, and deeply personal — real stories from real professionals.',
    fullDesc: `Tell Me Something True is After 6:30's storytelling night where real people share real stories.

No slides. No scripts. Just a mic, a spotlight, and the courage to speak your truth.

Every story at After 6:30 starts the same way: "You know, there's something I've never told anyone at work..."

Previous topics have included: quitting a 7-figure job, falling in love at a conference call, and the time someone cried in the office bathroom for 3 hours.

This is your chance to finally say what you've been holding back.`,
    lineup: [
      { time: '7:30 PM', act: 'Welcome + Rules of the Night', type: 'intro' },
      { time: '7:45 PM', act: 'Story 1 – "The Day I Almost Quit"', type: 'storytelling' },
      { time: '8:05 PM', act: 'Story 2 – "My Secret Double Life"', type: 'storytelling' },
      { time: '8:25 PM', act: 'Story 3 – "Falling Apart at 28"', type: 'storytelling' },
      { time: '8:45 PM', act: 'Open Floor – Walk-in Stories', type: 'storytelling' },
      { time: '9:15 PM', act: 'Reflection Circle + Coffee', type: 'networking' },
    ],
    ticketTypes: [
      {
        id: 'early-bird',
        label: 'Early Bird',
        price: 299,
        description: 'Limited seats. First 15 only.',
        available: true,
        razorpayLink: 'https://rzp.io/l/after630-stories-early',
      },
      {
        id: 'regular',
        label: 'Regular',
        price: 499,
        description: 'Includes entry + curated journal.',
        available: true,
        razorpayLink: 'https://rzp.io/l/after630-stories-regular',
      },
    ],
    isSoldOut: false,
    isFeatured: false,
  },
  {
    slug: 'open-mic-night',
    title: 'Open Mic Night',
    tagline: 'Your colleagues are funnier than you think.',
    category: 'comedy',
    categoryLabel: 'Stand-up Comedy',
    categoryIcon: '🎤',
    date: '05 Apr 2026',
    day: '05',
    month: 'Apr',
    year: '2026',
    dayOfWeek: 'Sunday',
    time: '8:00 PM – 10:30 PM',
    venue: 'The Comedy Factory',
    venueArea: 'Navrangpura',
    city: 'Ahmedabad',
    capacity: 80,
    spotsLeft: 20,
    image: '/gallery_comedy.png',
    shortDesc: 'A stage where your colleagues prove they\'ve been holding back their best material in Excel cells.',
    fullDesc: `After 6:30 Open Mic Night is back — and this time, we've got 10 corporate professionals ready to make you question your entire career choice.

Every performer here has a day job. But between those Teams calls and KPI reviews, they've been cooking up gold.

Expect sharp observational comedy about WFH culture, passive-aggressive emails, LinkedIn influencers, and the existential crisis that hits at 35.

Warning: You will cry laughing. You will also cry a little existentially. That's the After 6:30 guarantee.`,
    lineup: [
      { time: '8:00 PM', act: 'Doors + Pre-show vibes', type: 'networking' },
      { time: '8:20 PM', act: 'MC Intro + Warmup Bits', type: 'comedy' },
      { time: '8:35 PM', act: '4 x Performers (5 mins each)', type: 'comedy' },
      { time: '9:15 PM', act: 'Intermission + Chai break', type: 'break' },
      { time: '9:35 PM', act: '4 x Performers (5 mins each)', type: 'comedy' },
      { time: '10:15 PM', act: 'Headliner Set (10 mins)', type: 'comedy' },
    ],
    ticketTypes: [
      {
        id: 'early-bird',
        label: 'Early Bird',
        price: 299,
        description: 'First 30 tickets only.',
        available: true,
        razorpayLink: 'https://rzp.io/l/after630-comedy-early',
      },
      {
        id: 'regular',
        label: 'Regular',
        price: 499,
        description: 'Entry + complimentary drink.',
        available: true,
        razorpayLink: 'https://rzp.io/l/after630-comedy-regular',
      },
    ],
    isSoldOut: false,
    isFeatured: true,
  },
  {
    slug: 'coffee-conversations-april',
    title: 'Coffee & Conversations',
    tagline: 'Meet strangers. Make friends. Change your Monday.',
    category: 'networking',
    categoryLabel: 'Coffee & Networking',
    categoryIcon: '☕',
    date: '12 Apr 2026',
    day: '12',
    month: 'Apr',
    year: '2026',
    dayOfWeek: 'Sunday',
    time: '10:00 AM – 12:30 PM',
    venue: 'Sleepy Owl Café',
    venueArea: 'Prahlad Nagar',
    city: 'Ahmedabad',
    capacity: 30,
    spotsLeft: 24,
    image: '/gallery_networking.png',
    shortDesc: 'Curated conversations over specialty coffee. Where passion meets profession in the most human way.',
    fullDesc: `After 6:30 Coffee & Conversations is a structured morning session where 30 corporate professionals meet, talk, and genuinely connect — no small talk, no pitch decks.

Each table gets a conversation card with deep questions. By the end of 2.5 hours, you'll have had real conversations with at least 6 different people.

Past topics have included: "What would you do if your salary stayed the same but you could change your job title to anything?" and "What's one thing your manager will never understand about you?"

Coffee included. Connections guaranteed.`,
    lineup: [
      { time: '10:00 AM', act: 'Registration + Coffee', type: 'networking' },
      { time: '10:20 AM', act: 'Icebreaker Round (5 mins/person)', type: 'networking' },
      { time: '10:50 AM', act: 'Table Conversations – Round 1', type: 'conversation' },
      { time: '11:20 AM', act: 'Table Shuffle + Coffee Refills', type: 'break' },
      { time: '11:35 AM', act: 'Table Conversations – Round 2', type: 'conversation' },
      { time: '12:10 PM', act: 'Open Circle + Reflection', type: 'networking' },
    ],
    ticketTypes: [
      {
        id: 'early-bird',
        label: 'Early Bird',
        price: 199,
        description: 'First 15 tickets only.',
        available: true,
        razorpayLink: 'https://rzp.io/l/after630-coffee-early',
      },
      {
        id: 'regular',
        label: 'Regular',
        price: 349,
        description: 'Includes specialty coffee + brunch bites.',
        available: true,
        razorpayLink: 'https://rzp.io/l/after630-coffee-regular',
      },
    ],
    isSoldOut: false,
    isFeatured: false,
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
