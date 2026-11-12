import type { LegalPageContent } from "./types";

/** Draft customer-facing privacy copy — requires legal review before publishing. */
export const privacyPolicy: LegalPageContent = {
  title: "Privacy Policy",
  intro:
    "How After630 handles information you share when you enquire about a trip, and how you can reach us about your data.",
  sections: [
    {
      id: "sec1",
      heading: "01. Overview",
      body: "After630 is a WhatsApp-first group travel brand. This policy explains what we collect when you get in touch, why we need it, and how you can ask about your information.",
    },
    {
      id: "sec2",
      heading: "02. Information you provide",
      body: "When you enquire about a trip, you may share your name, WhatsApp number, trip preference, preferred dates, traveller count and any other details you include in your message.",
    },
    {
      id: "sec3",
      heading: "03. How we use information",
      body: "We use your details to respond to enquiries, explain availability and packages, verify bookings, arrange travel logistics and provide customer support. We will not use your information for unrelated marketing without a clear notice and your consent.",
    },
    {
      id: "sec4",
      heading: "04. WhatsApp and third-party tools",
      body: "Trip enquiries open through WhatsApp Business. WhatsApp and any analytics or support tools we use may process information under their own policies. We only connect services needed to run the enquiry and booking process.",
    },
    {
      id: "sec5",
      heading: "05. Cookies and analytics",
      body: "If we use analytics, advertising pixels or cookies, we will describe their purpose, retention and your controls on this page. Until then, assume only essential site operation applies.",
    },
    {
      id: "sec6",
      heading: "06. Retention and security",
      body: "Enquiry and booking records are kept only as long as needed to support your trip and meet legal or financial requirements. Access is limited to the After630 team and trusted partners who help deliver the journey.",
    },
    {
      id: "sec7",
      heading: "07. Your choices and contact",
      body: "You can ask us about the information we hold, request corrections, or raise a privacy question through our contact page or WhatsApp channel.",
    },
    {
      id: "sec8",
      heading: "08. Policy updates",
      body: "We may update this policy as our practices evolve. Material changes will be reflected on this page with a revised effective date once the policy is formally published.",
    },
  ],
};
