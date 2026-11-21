/**
 * FAQ copy, based on the owner-supplied After 6:30 Website Policies
 * (18 Nov 2026), plus site-specific answers on age, home cities and
 * WhatsApp booking. Keep answers consistent with src/content/legal/*.
 */
export type FaqCategory = "About" | "Booking & Payments" | "During the Trip" | "Cancellations";

export const faqCategories: FaqCategory[] = ["About", "Booking & Payments", "During the Trip", "Cancellations"];

export const faqItems: { category: FaqCategory; question: string; answer: string }[] = [
  // About
  {
    category: "About",
    question: "What is After630?",
    answer:
      "After630 is a travel and experience company for people who want to step away from their everyday routine and explore something different. We curate group trips, mountain escapes, unique stays and travel experiences that bring people, places and stories together.",
  },
  {
    category: "About",
    question: "Who can travel with After630?",
    answer:
      "Our trips are designed for working professionals, solo travellers, friends, couples and anyone who enjoys exploring new places and meeting new people. They're planned with travellers aged 20 to 40 in mind. Any specific age requirements are listed on each trip page.",
  },
  {
    category: "About",
    question: "Can I join a trip alone?",
    answer:
      "Absolutely. Our group trips are designed for people travelling on their own, and the experiences are built to help you connect, make new friends and create memories together.",
  },
  {
    category: "About",
    question: "Are your trips suitable for couples and friends?",
    answer:
      "Yes. You can join on your own, as a couple or with a group of friends, subject to availability and the trip's booking conditions.",
  },
  {
    category: "About",
    question: "I don't live near the departure city. Can I still join?",
    answer:
      "Yes. Travellers can join from anywhere, including Ahmedabad, Delhi, Jaipur, Mumbai, Pune and Bengaluru. Each trip starts from a set meeting point (Chandigarh for our Himachal trip), and you plan your own travel there. If you're coming from far away, arriving the day before is the easiest option.",
  },

  // Booking & Payments
  {
    category: "Booking & Payments",
    question: "How can I book a trip?",
    answer:
      "Open the trip you like and tap Enquire on WhatsApp. WhatsApp opens with your trip details filled in. Send it, and our team will share the payment details and confirm your seat.",
  },
  {
    category: "Booking & Payments",
    question: "When is my seat reserved?",
    answer:
      "As soon as your payment is received. Tap Enquire on WhatsApp on the trip page, send the WhatsApp message, and our team will share the payment details and confirm your seat in writing.",
  },
  {
    category: "Booking & Payments",
    question: "How do I confirm my booking?",
    answer:
      "Your booking is confirmed only after the required payment has been received and After630 has shared your confirmation. Keep your payment acknowledgement until it arrives.",
  },
  {
    category: "Booking & Payments",
    question: "What is included in the package price?",
    answer:
      "Inclusions vary from trip to trip. Accommodation, transport, meals, activities and experiences are listed clearly on each trip page. Travel to the trip's meeting point is usually not included.",
  },
  {
    category: "Booking & Payments",
    question: "Are taxes included in the price?",
    answer:
      "All prices are communicated before your booking is confirmed. Any applicable taxes, extra charges and payment conditions will be specified wherever they apply.",
  },
  {
    category: "Booking & Payments",
    question: "Can I customise a trip?",
    answer:
      "Yes. We can help with customised travel experiences and private group trips, depending on the destination, availability and your requirements. Message us on WhatsApp to discuss it.",
  },

  // During the Trip
  {
    category: "During the Trip",
    question: "Will I receive a detailed itinerary?",
    answer:
      "Yes. Confirmed travellers receive the trip information they need, including travel schedules, accommodation details, inclusions, important instructions and any updates.",
  },
  {
    category: "During the Trip",
    question: "What should I carry?",
    answer:
      "We share a recommended packing list before departure. It usually includes comfortable clothing, suitable footwear, personal essentials, ID documents and items specific to the destination.",
  },
  {
    category: "During the Trip",
    question: "What happens if the weather affects the trip?",
    answer:
      "Mountain trips, treks and outdoor activities can be affected by weather, road conditions or local authorities. Safety comes first, so we may modify, replace or cancel an activity when necessary.",
  },
  {
    category: "During the Trip",
    question: "Do you provide travel insurance?",
    answer:
      "Travel insurance is not included unless a trip's inclusions say so. We strongly recommend arranging suitable travel insurance before departure.",
  },
  {
    category: "During the Trip",
    question: "How can I contact the team during the trip?",
    answer:
      "Confirmed travellers receive the trip coordinator's contact details and emergency communication information before departure.",
  },

  // Cancellations
  {
    category: "Cancellations",
    question: "Can I cancel my booking?",
    answer:
      "Yes. Send your cancellation request in writing through our official WhatsApp number. Refunds depend on how far ahead you cancel: 90% of the package amount at 30 days or more before departure, 50% at 15–29 days, 25% at 7–14 days, and no refund within 7 days. See Cancellation & Refunds for the full policy.",
  },
  {
    category: "Cancellations",
    question: "Can I transfer my booking to someone else?",
    answer:
      "Transfers may be allowed with prior written approval from After630, subject to availability, supplier requirements and any applicable charges.",
  },
  {
    category: "Cancellations",
    question: "What if After630 cancels a trip?",
    answer:
      "If we cancel a confirmed trip, we'll inform you and offer either a refund of the amount received or an alternative trip or date, if you agree to it.",
  },
  {
    category: "Cancellations",
    question: "How long do refunds take?",
    answer:
      "Approved refunds are ordinarily initiated within 7–10 business days, usually to your original payment method. The time it takes to reach your account depends on your bank or payment provider.",
  },
  {
    category: "Cancellations",
    question: "How can I get more information?",
    answer:
      "For bookings, trip details and help, message us on our official WhatsApp number or visit the Contact page.",
  },
];

/** Shorter list shown on the homepage "Good to know" section. */
export const homeFaqItems = [
  {
    question: "Can I join an After630 trip solo?",
    answer:
      "Yes. Our group trips are designed for people travelling on their own and are planned for travellers aged 20 to 40. You're also welcome to come with a friend, a partner or a group.",
  },
  {
    question: "How do I book a trip?",
    answer:
      "Pick a trip and tap Enquire on WhatsApp. WhatsApp opens with your trip details filled in. Send it, and we'll share the payment details. Your seat is confirmed as soon as payment is received.",
  },
  {
    question: "I'm not from Chandigarh. Can I still join?",
    answer:
      "Yes. You can join from Ahmedabad, Delhi, Jaipur, Mumbai, Pune, Bengaluru or anywhere else. Each trip has a set meeting point, and you plan your own travel to reach it.",
  },
  {
    question: "What's included in the trip price?",
    answer:
      "Each trip page lists exactly what's included and what's not, covering transport, stay, meals and activities. Travel insurance isn't included unless a trip says so.",
  },
  {
    question: "What about cancellation or refunds?",
    answer:
      "Cancel in writing on WhatsApp. You'll get 90% back at 30+ days before departure, 50% at 15–29 days, 25% at 7–14 days, and no refund within 7 days. The full Cancellation & Refunds policy has the details.",
  },
];
