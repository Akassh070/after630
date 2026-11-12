import type { LegalPageContent } from "./types";

/** Draft customer-facing terms — requires legal review before publishing. */
export const termsConditions: LegalPageContent = {
  title: "Terms & Conditions",
  intro:
    "The basics for enquiring about and joining an After630 group trip once a departure is published.",
  sections: [
    {
      id: "sec1",
      heading: "01. Scope of service",
      body: "After630 offers curated group travel experiences. Itinerary, departure details, suppliers and inclusions are set out separately for each confirmed trip.",
    },
    {
      id: "sec2",
      heading: "02. Trip information",
      body: "A published trip listing shows destinations, dates, duration, origin cities, package options and exclusions. Until those details are confirmed on the trip page, nothing should be treated as a sale or guaranteed departure.",
    },
    {
      id: "sec3",
      heading: "03. Enquiries and booking confirmation",
      body: "A WhatsApp enquiry is not a booking. Our team confirms availability, applicable terms and payment instructions. Your place is confirmed only after the required payment is verified.",
    },
    {
      id: "sec4",
      heading: "04. Traveller information",
      body: "We may ask for traveller details and identification needed for a specific trip. Please share accurate information by the deadlines we communicate for that departure.",
    },
    {
      id: "sec5",
      heading: "05. Payment and pricing",
      body: "Prices, taxes if applicable, payment deadlines, inclusions and exclusions are shared before you pay. The website does not process payment automatically — our team shares verified payment instructions.",
    },
    {
      id: "sec6",
      heading: "06. Itinerary changes and safety",
      body: "Weather, transport conditions or local rules may require itinerary adjustments. We will communicate material changes and any impact on your experience as soon as we can.",
    },
    {
      id: "sec7",
      heading: "07. Conduct and responsibility",
      body: "Travellers are expected to follow local laws, respect the group and look after personal belongings. Trip-specific participation rules will be shared before departure.",
    },
    {
      id: "sec8",
      heading: "08. Disputes and contact",
      body: "For questions or concerns, contact After630 through the channels on our contact page. Applicable jurisdiction and formal dispute terms will be confirmed with the published legal entity details.",
    },
  ],
};
