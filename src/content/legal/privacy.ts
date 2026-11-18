import type { LegalPageContent } from "./types";

/** Owner-supplied Privacy Policy (After 6:30 Website Policies, 18 Nov 2026). */
export const privacyPolicy: LegalPageContent = {
  title: "Privacy Policy",
  intro:
    "How After630 collects, uses, stores and protects your information when you visit our website, enquire about a trip or make a booking.",
  lastUpdated: "18 November 2026",
  sections: [
    {
      id: "overview",
      heading: "Overview",
      blocks: [
        {
          type: "p",
          text: "At After630, we value your privacy and are committed to protecting the personal information you share with us while exploring our travel experiences and services. This Privacy Policy explains how we collect, use, store and protect your information when you visit our website, enquire about our services or make a booking.",
        },
      ],
    },
    {
      id: "information-we-collect",
      heading: "1. Information we collect",
      blocks: [
        { type: "p", text: "We may collect the following information:" },
        {
          type: "list",
          items: [
            "Full name and contact details.",
            "Email address and mobile number.",
            "Age and date of birth, where required for travel arrangements.",
            "Emergency contact details.",
            "Government identification details, where necessary for bookings or travel compliance.",
            "Travel preferences, destination preferences and special requests.",
            "Payment transaction details and booking history.",
            "Information shared through website forms, WhatsApp, email or other communication channels.",
          ],
        },
      ],
    },
    {
      id: "how-we-use",
      heading: "2. How we use your information",
      blocks: [
        { type: "p", text: "Your information may be used to:" },
        {
          type: "list",
          items: [
            "Process and confirm travel bookings.",
            "Share itineraries, schedules and travel updates.",
            "Coordinate accommodation, transport and activities.",
            "Respond to enquiries and customer support requests.",
            "Share important announcements about your trip.",
            "Improve our website, services and customer experience.",
            "Send promotional offers and travel updates where permitted.",
          ],
        },
      ],
    },
    {
      id: "sharing",
      heading: "3. Sharing of information",
      blocks: [
        {
          type: "p",
          text: "We do not sell your personal information. However, we may share certain information with trusted third parties when it's necessary to deliver our services, including:",
        },
        {
          type: "list",
          items: [
            "Hotels, homestays and accommodation providers.",
            "Transport and travel partners.",
            "Activity organisers and local experience providers.",
            "Payment gateways and financial service providers.",
            "Technology and website service providers.",
            "Government authorities or legal agencies when required by applicable law.",
          ],
        },
        { type: "p", text: "We aim to share only the information reasonably necessary for the relevant purpose." },
      ],
    },
    {
      id: "payment-security",
      heading: "4. Payment security",
      blocks: [
        {
          type: "p",
          text: "Payments may be processed through third-party payment gateways or authorised payment service providers. After630 does not intend to collect or store your complete card numbers, CVV or banking passwords. Payment processing is subject to the respective payment provider's privacy and security practices.",
        },
      ],
    },
    {
      id: "cookies",
      heading: "5. Cookies and website information",
      blocks: [
        {
          type: "p",
          text: "Our website may use cookies and similar technologies to improve website functionality, understand visitor behaviour and enhance user experience. You can manage cookies through your browser settings. Disabling certain cookies may affect some website features.",
        },
      ],
    },
    {
      id: "security",
      heading: "6. Data protection and security",
      blocks: [
        {
          type: "p",
          text: "We take reasonable technical and organisational measures to protect your personal information against unauthorised access, misuse, alteration, disclosure or loss. However, no internet-based transmission or electronic storage system can be guaranteed to be completely secure.",
        },
      ],
    },
    {
      id: "retention",
      heading: "7. Data retention",
      blocks: [
        {
          type: "p",
          text: "We keep personal information only for as long as reasonably necessary to fulfil the purposes for which it was collected, meet legal and regulatory requirements, resolve disputes and maintain business records.",
        },
      ],
    },
    {
      id: "your-rights",
      heading: "8. Your privacy rights",
      blocks: [
        { type: "p", text: "Subject to applicable laws, you may:" },
        {
          type: "list",
          items: [
            "Request access to your personal information.",
            "Request correction of inaccurate information.",
            "Request deletion of personal information where legally permissible.",
            "Withdraw consent for activities based on consent.",
            "Opt out of promotional communications.",
            "Raise concerns about how your information is handled.",
          ],
        },
      ],
    },
    {
      id: "third-party-sites",
      heading: "9. Third-party websites",
      blocks: [
        {
          type: "p",
          text: "Our website may contain links to third-party websites or services, such as WhatsApp and Instagram. We are not responsible for their privacy practices, content or security policies, and we encourage you to review their privacy policies.",
        },
      ],
    },
    {
      id: "children",
      heading: "10. Children's privacy",
      blocks: [
        {
          type: "p",
          text: "Our travel services are primarily intended for adults. We do not knowingly collect personal information from children independently without appropriate parental or legal guardian involvement and consent where required.",
        },
      ],
    },
    {
      id: "changes",
      heading: "11. Changes to this policy",
      blocks: [
        {
          type: "p",
          text: "We may update this Privacy Policy from time to time. Any changes will be published on this page with an updated revision date.",
        },
      ],
    },
    {
      id: "contact",
      heading: "12. Contact us",
      blocks: [
        {
          type: "p",
          text: "For privacy-related questions, requests or concerns, contact us through the official contact details on our Contact page.",
        },
      ],
    },
  ],
};
