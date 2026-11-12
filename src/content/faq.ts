/** Ported verbatim from handoff/ui/after630_faq_v1.html. */
export type FaqCategory = "Booking" | "Trip Details" | "Payments" | "Changes" | "Safety";

export const faqCategories: FaqCategory[] = ["Booking", "Trip Details", "Payments", "Changes", "Safety"];

export const faqItems: { category: FaqCategory; question: string; answer: string }[] = [
  {
    category: "Booking",
    question: "Can I join an After630 trip solo?",
    answer:
      "You can enquire as a solo traveller. Joining rules, age requirements (if any) and other restrictions will be shown on each confirmed trip page.",
  },
  {
    category: "Booking",
    question: "How does booking work?",
    answer:
      "Choose a trip and departure, then send an enquiry on WhatsApp. Our team verifies availability, shares confirmed package and payment details, and sends a booking confirmation after payment verification.",
  },
  {
    category: "Booking",
    question: "Does sending a WhatsApp message reserve my seat?",
    answer:
      "No. An enquiry is not a reservation. Your place is confirmed only after our team verifies availability and the required payment and sends confirmation.",
  },
  {
    category: "Trip Details",
    question: "What is included in the trip price?",
    answer:
      "Each published trip will have its own inclusions and exclusions. Please check the specific package for travel, accommodation, meals, activities and any applicable additional charges.",
  },
  {
    category: "Trip Details",
    question: "Where can I see departure points and dates?",
    answer:
      "Confirmed dates, origin cities and pickup details will be shown on the individual trip page and reconfirmed by our team during booking.",
  },
  {
    category: "Trip Details",
    question: "Are the itineraries fixed?",
    answer:
      "The published itinerary is the current plan. Weather, local restrictions, transport or safety needs may require changes; applicable trip terms will clarify how those are handled.",
  },
  {
    category: "Payments",
    question: "How can I pay for a trip?",
    answer:
      "Once availability and terms are confirmed, the team will share approved payment instructions. No direct online checkout is included in the first website release.",
  },
  {
    category: "Payments",
    question: "Will I get confirmation after payment?",
    answer:
      "A booking confirmation will be shared after the team verifies the applicable payment and reservation details. Keep your payment acknowledgement until confirmation arrives.",
  },
  {
    category: "Changes",
    question: "Can I cancel or reschedule?",
    answer:
      "Cancellation or rescheduling depends on the specific trip, suppliers and the policy shared before you pay. See Cancellation & Refunds for the general framework.",
  },
  {
    category: "Changes",
    question: "What happens if a trip cannot operate?",
    answer:
      "If a departure is postponed or cannot operate, our team will share the available options under the confirmed terms for that trip.",
  },
  {
    category: "Safety",
    question: "Are there fitness or age requirements?",
    answer:
      "Some destinations or activities may have physical or age restrictions. These are stated in the relevant trip details when a departure is published.",
  },
  {
    category: "Safety",
    question: "What should I pack?",
    answer:
      "Joining instructions will include packing guidance appropriate to the trip, destination, weather and activities before departure.",
  },
];

/** Shorter list shown on the homepage "Good to know" section. */
export const homeFaqItems = [
  {
    question: "Can I join an After630 trip solo?",
    answer:
      "You can enquire as a solo traveller. Each trip page will specify joining requirements and any applicable restrictions once the real trip details are confirmed.",
  },
  {
    question: "How do I book a trip?",
    answer:
      "Select a trip, review the details and contact us on WhatsApp. Our team will confirm availability, explain payment and provide your booking confirmation once verified.",
  },
  {
    question: "What's included in the trip price?",
    answer:
      "Every confirmed package will have a breakdown of inclusions and exclusions, including any applicable transport, stay, meals and activities.",
  },
  {
    question: "What about cancellation or refunds?",
    answer:
      "The cancellation and refund terms for each booking will be shared before payment and made accessible in the website's policies section.",
  },
];
