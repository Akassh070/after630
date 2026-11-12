import type { LegalPageContent } from "./types";

/** Draft customer-facing cancellation copy — requires legal review before publishing. */
export const cancellationRefundPolicy: LegalPageContent = {
  title: "Cancellation & Refunds",
  intro:
    "What happens if plans change — on your side or ours — once a trip and its terms are confirmed.",
  sections: [
    {
      id: "sec1",
      heading: "01. Read this before paying",
      body: "Cancellation and refund terms for each departure are confirmed before you pay. Trip-specific deadlines and charges may apply depending on suppliers and package timing.",
    },
    {
      id: "sec2",
      heading: "02. Customer-initiated cancellation",
      body: "If you need to cancel, tell us as early as possible. Applicable charges depend on how close the departure is and any non-refundable supplier commitments for that package.",
    },
    {
      id: "sec3",
      heading: "03. Rescheduling and name changes",
      body: "Date changes or passenger substitutions may be possible when suppliers allow it. Fees and deadlines, if any, will be explained for that trip before you confirm.",
    },
    {
      id: "sec4",
      heading: "04. If After630 changes or cancels a trip",
      body: "If a departure is postponed, materially changed or cannot operate, we will contact you with the available options, which may include an alternate date, credit or refund as applicable.",
    },
    {
      id: "sec5",
      heading: "05. Refund process",
      body: "Eligible refunds are returned to the original payment method after we confirm your booking reference and payment details. Processing time depends on the payment channel used.",
    },
    {
      id: "sec6",
      heading: "06. Weather and unexpected events",
      body: "Severe weather, road closures or other disruptions may affect the itinerary. We will share alternate arrangements or refund options based on what is possible for that departure.",
    },
    {
      id: "sec7",
      heading: "07. How to submit a request",
      body: "Send cancellation or refund requests through WhatsApp or the contact page, including your booking reference and payment proof so we can help quickly.",
    },
    {
      id: "sec8",
      heading: "08. Trip-specific exceptions",
      body: "Some trips may include additional supplier terms. Those will be shown with the package before you pay and apply alongside this policy.",
    },
  ],
};
