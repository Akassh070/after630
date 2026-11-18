import type { LegalPageContent } from "./types";

/**
 * Owner-supplied Terms & Conditions (After 6:30 Website Policies, 18 Nov 2026).
 * Section 15: the source left the court city as a placeholder. Until the owner
 * names it, the clause refers to competent courts in India without a city.
 */
export const termsConditions: LegalPageContent = {
  title: "Terms & Conditions",
  intro:
    "The terms that apply when you use the After630 website, enquire about our travel services or book a trip. Please read them carefully before confirming any booking.",
  lastUpdated: "18 November 2026",
  sections: [
    {
      id: "overview",
      heading: "Overview",
      blocks: [
        {
          type: "p",
          text: "Welcome to After630. By accessing our website, enquiring about our travel services or making a booking, you agree to the following Terms & Conditions. Please read them carefully before confirming any booking.",
        },
      ],
    },
    {
      id: "services",
      heading: "1. About our services",
      blocks: [
        {
          type: "p",
          text: "After630 provides curated travel experiences, group trips, customised travel arrangements, accommodation experiences and related travel services. Each trip may have different itineraries, inclusions, exclusions, pricing and participation requirements. The details in the trip description apply to that particular booking.",
        },
      ],
    },
    {
      id: "booking",
      heading: "2. Booking and confirmation",
      blocks: [
        {
          type: "list",
          items: [
            "All bookings are subject to availability.",
            "A booking is confirmed only after the required payment has been received and confirmation has been issued.",
            "Travellers must provide accurate and complete information when registering.",
            "Incorrect or incomplete information may affect travel arrangements.",
            "After630 reserves the right to decline bookings where necessary for capacity, safety or operational reasons.",
          ],
        },
      ],
    },
    {
      id: "payments",
      heading: "3. Payments and pricing",
      blocks: [
        {
          type: "list",
          items: [
            "All prices will be communicated before booking confirmation.",
            "Applicable taxes, additional charges and payment conditions will be specified wherever relevant.",
            "Any optional services or personal expenses not included in the package are paid by the traveller.",
            "Bookings must be paid according to the payment schedule communicated for the trip.",
            "Failure to complete payment within the specified timeline may result in cancellation of the booking.",
          ],
        },
      ],
    },
    {
      id: "responsibilities",
      heading: "4. Traveller responsibilities",
      blocks: [
        { type: "p", text: "Travellers are responsible for:" },
        {
          type: "list",
          items: [
            "Carrying valid identification and necessary travel documents.",
            "Following the itinerary and instructions shared by the trip coordinator.",
            "Respecting local communities, culture, traditions and the environment.",
            "Maintaining appropriate conduct throughout the trip.",
            "Informing the team about relevant medical, dietary or mobility requirements before departure.",
            "Taking care of personal belongings and valuables.",
          ],
        },
      ],
    },
    {
      id: "health-safety",
      heading: "5. Health and safety",
      blocks: [
        {
          type: "p",
          text: "Travel may involve activities such as trekking, hiking, road journeys, outdoor exploration and exposure to changing weather. Travellers must assess their own physical fitness and take part responsibly. After630 reserves the right to restrict participation in an activity if it reasonably believes the activity may pose a safety risk to the traveller or other participants. Travellers are responsible for their personal health, prescribed medication and medical requirements.",
        },
      ],
    },
    {
      id: "itinerary-changes",
      heading: "6. Itinerary changes",
      blocks: [
        { type: "p", text: "Itineraries are planned in advance but may change because of:" },
        {
          type: "list",
          items: [
            "Weather conditions.",
            "Road closures or transport disruptions.",
            "Government restrictions or local authority instructions.",
            "Natural events or unforeseen circumstances.",
            "Accommodation or supplier availability.",
            "Safety and operational requirements.",
          ],
        },
        { type: "p", text: "We will make reasonable efforts to provide suitable alternatives wherever possible." },
      ],
    },
    {
      id: "stay-transport",
      heading: "7. Accommodation and transport",
      blocks: [
        {
          type: "p",
          text: "Accommodation categories, room-sharing arrangements, transport details and other facilities are communicated as part of each trip package. Special requests are subject to availability and confirmation.",
        },
      ],
    },
    {
      id: "belongings",
      heading: "8. Personal belongings",
      blocks: [
        {
          type: "p",
          text: "Travellers are responsible for their personal belongings throughout the journey. After630 is not responsible for loss, theft or damage to personal belongings, except where liability cannot legally be excluded.",
        },
      ],
    },
    {
      id: "conduct",
      heading: "9. Behaviour and code of conduct",
      blocks: [
        {
          type: "p",
          text: "We aim to create a safe, respectful and welcoming travel environment. Harassment, discrimination, abusive behaviour, illegal activities, property damage or conduct that compromises the safety or comfort of other travellers will not be tolerated. After630 reserves the right to take appropriate action, including removal from an activity or trip, where reasonably necessary and permitted by law. No refund is automatically due if a traveller is removed because of their own misconduct, subject to applicable law and the circumstances.",
        },
      ],
    },
    {
      id: "third-parties",
      heading: "10. Third-party service providers",
      blocks: [
        {
          type: "p",
          text: "Some services may be delivered by independent hotels, transport operators, activity organisers and other providers, and their own operating conditions may apply. After630 will make reasonable efforts to coordinate reliable services and address concerns, but cannot guarantee the performance of independent providers beyond its legal responsibilities.",
        },
      ],
    },
    {
      id: "photography",
      heading: "11. Photography and media",
      blocks: [
        {
          type: "p",
          text: "Photos and videos may be taken during our trips for memories and promotional purposes. Any use of identifiable traveller images in public promotional content is subject to appropriate consent. You can tell our team your preferences before the trip.",
        },
      ],
    },
    {
      id: "liability",
      heading: "12. Limitation of liability",
      blocks: [
        {
          type: "p",
          text: "To the extent permitted by applicable law, After630 is not responsible for indirect or consequential losses arising from circumstances beyond its reasonable control. Nothing in these terms excludes liability for fraud, wilful misconduct, negligence where liability cannot legally be excluded, or any other liability that cannot be limited under applicable law.",
        },
      ],
    },
    {
      id: "force-majeure",
      heading: "13. Force majeure",
      blocks: [
        {
          type: "p",
          text: "After630 is not in breach of its obligations to the extent that performance is prevented or materially affected by circumstances beyond reasonable control, including natural disasters, extreme weather, government restrictions, civil disturbances, epidemics, road closures or major transport disruptions. We will communicate relevant changes and reasonable alternative arrangements wherever possible.",
        },
      ],
    },
    {
      id: "intellectual-property",
      heading: "14. Intellectual property",
      blocks: [
        {
          type: "p",
          text: "All website content, branding, logos, photographs, videos, designs, written material and other intellectual property belonging to After630 may not be copied, reproduced or used commercially without prior written permission.",
        },
      ],
    },
    {
      id: "governing-law",
      heading: "15. Governing law and jurisdiction",
      blocks: [
        {
          type: "p",
          text: "These Terms & Conditions are governed by the laws of India. Any disputes are subject to the competent courts in India having jurisdiction, subject to applicable law.",
        },
      ],
    },
    {
      id: "contact",
      heading: "16. Contact information",
      blocks: [
        {
          type: "p",
          text: "For questions about these Terms & Conditions, contact After630 through the official contact details on our Contact page.",
        },
      ],
    },
  ],
};
