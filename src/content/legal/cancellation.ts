import type { LegalPageContent } from "./types";

/** Owner-supplied Cancellation & Refund Policy (After 6:30 Website Policies, 18 Nov 2026). */
export const cancellationRefundPolicy: LegalPageContent = {
  title: "Cancellation & Refunds",
  intro:
    "How cancellations, refunds, no-shows and booking transfers work for After630 trips. Please read this policy before you confirm your booking.",
  lastUpdated: "18 November 2026",
  sections: [
    {
      id: "overview",
      heading: "Overview",
      blocks: [
        {
          type: "p",
          text: "At After630, we understand that travel plans can change. We aim to keep cancellations transparent and fair while managing the advance commitments we make with accommodation providers, transport partners and other service providers.",
        },
      ],
    },
    {
      id: "by-traveller",
      heading: "1. Cancellation by traveller",
      blocks: [
        {
          type: "p",
          text: "To cancel your booking, send a written cancellation request through our official WhatsApp number. Your cancellation date is the date we receive your written request.",
        },
        {
          type: "table",
          head: ["Cancellation before departure", "Refund of package amount"],
          rows: [
            ["30 days or more", "90%"],
            ["15–29 days", "50%"],
            ["7–14 days", "25%"],
            ["Less than 7 days", "No refund"],
          ],
        },
        {
          type: "note",
          text: "Non-refundable third-party charges and payment gateway charges, if any, will be deducted where permitted and disclosed.",
        },
      ],
    },
    {
      id: "by-after630",
      heading: "2. Cancellation by After630",
      blocks: [
        {
          type: "p",
          text: "If After630 cancels a confirmed trip for operational reasons or because too few people have booked, we will inform affected travellers. Depending on the circumstances, you will be offered:",
        },
        {
          type: "list",
          items: [
            "A refund of the amount received for the cancelled trip; or",
            "An alternative trip or rescheduled date, if you agree to it.",
          ],
        },
        { type: "p", text: "Any alternative arrangement will be explained clearly before you confirm it." },
      ],
    },
    {
      id: "weather",
      heading: "3. Weather and unforeseen circumstances",
      blocks: [
        {
          type: "p",
          text: "Mountain travel and outdoor experiences can be affected by unpredictable weather, road conditions, natural events and government restrictions. In these situations:",
        },
        {
          type: "list",
          items: [
            "Activities may be modified, postponed or replaced.",
            "Alternative experiences may be arranged wherever reasonably possible.",
            "If the entire trip cannot go ahead, the team will explain the available refund or rescheduling arrangements, based on the circumstances and applicable law.",
          ],
        },
      ],
    },
    {
      id: "no-show",
      heading: "4. No-show policy",
      blocks: [
        {
          type: "p",
          text: "If you don't arrive at the departure point, or don't join the trip, without cancelling in writing beforehand, your booking is treated as a no-show. No refund is ordinarily provided for no-shows.",
        },
      ],
    },
    {
      id: "late-arrival",
      heading: "5. Late arrival and missed transport",
      blocks: [
        {
          type: "p",
          text: "You are responsible for reaching the departure point by the reporting time we share. If you miss the scheduled transport because of late arrival or personal reasons, any other transport arrangements and their costs are your responsibility.",
        },
      ],
    },
    {
      id: "transfers",
      heading: "6. Booking transfers",
      blocks: [
        {
          type: "p",
          text: "Requests to transfer a booking to another person must be made in advance and need written approval from After630. Transfers depend on availability, identification requirements and any extra supplier charges.",
        },
      ],
    },
    {
      id: "processing",
      heading: "7. Refund processing time",
      blocks: [
        { type: "p", text: "Once a refund has been approved:" },
        {
          type: "list",
          items: [
            "Refunds are ordinarily initiated within 7–10 business days.",
            "Refunds are generally made to the original payment method wherever possible.",
            "The time it takes to reach your account may depend on your bank or payment provider.",
          ],
        },
      ],
    },
    {
      id: "unused-services",
      heading: "8. Partial refunds and unused services",
      blocks: [
        {
          type: "p",
          text: "There is no automatic refund for meals, accommodation nights, activities or other services you choose to skip during a trip. Any exception will be considered based on the circumstances, supplier conditions and applicable law.",
        },
      ],
    },
    {
      id: "special-conditions",
      heading: "9. Special booking conditions",
      blocks: [
        {
          type: "p",
          text: "Some trips, promotional offers, festival packages, customised itineraries and group bookings may have different cancellation conditions. Where special conditions apply, we will tell you before you pay, and they will take precedence for that booking to the extent legally permissible.",
        },
      ],
    },
    {
      id: "contact",
      heading: "10. Contact for cancellations and refunds",
      blocks: [
        {
          type: "p",
          text: "For cancellation requests, refund enquiries or help, contact After630 through the official WhatsApp number listed on our website.",
        },
      ],
    },
  ],
};
